import { z } from "zod";
// src/lib/theme/policy.ts
/** The default (auto) doc — used when no backend policy exists (105 §3). */
var DEFAULT_POLICY_DOC = {
	policy: "auto",
	contrast: "auto",
	defaultTheme: "dark",
	updatedAt: "",
	$extensions: {}
};
var BRAND_SLUG_RE = /^brand:[a-z0-9-]+$/;
var POLICY_VALUES = [
	"auto",
	"light",
	"dark"
];
var CONTRAST_VALUES = [
	"auto",
	"standard",
	"high"
];
var DEFAULT_THEME_VALUES = ["light", "dark"];
function isRecord(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
/**
* Lenient but typed parse (plan §3): every field falls back to the default
* doc on an invalid value — a malformed backend doc must never break a page.
*/
function parsePolicyDoc(json) {
	if (!isRecord(json)) return { ...DEFAULT_POLICY_DOC };
	const rawPolicy = json.policy;
	return {
		policy: typeof rawPolicy === "string" && (POLICY_VALUES.includes(rawPolicy) || BRAND_SLUG_RE.test(rawPolicy)) ? rawPolicy : DEFAULT_POLICY_DOC.policy,
		contrast: CONTRAST_VALUES.includes(json.contrast) ? json.contrast : DEFAULT_POLICY_DOC.contrast,
		defaultTheme: DEFAULT_THEME_VALUES.includes(json.defaultTheme) ? json.defaultTheme : DEFAULT_POLICY_DOC.defaultTheme,
		updatedAt: typeof json.updatedAt === "string" ? json.updatedAt : "",
		$extensions: isRecord(json.$extensions) ? json.$extensions : {}
	};
}
/** Auto-ladder step 3: stored → media → defaultTheme. */
function resolveAuto(stored, mediaMatches, defaultTheme, registry) {
	if (stored !== null && (stored === "light" || registry.includes(stored))) return stored;
	if (mediaMatches !== null) return mediaMatches ? "light" : "dark";
	return defaultTheme;
}
/**
* The ladder from plan §3, as a pure function.
*
* `storedContrast` is an additive 5th parameter (defaults to null) so the
* contrast axis can be resolved against its own storage key — the bridge
* contract keeps the two axes independent (104 ContrastToggle).
*/
function resolvePolicyTheme(policy, stored, mediaMatches, registry, storedContrast = null) {
	let theme;
	let forced = false;
	if (policy.policy.startsWith("brand:")) {
		const slug = policy.policy.slice(6);
		if (registry.includes(slug)) {
			theme = slug;
			forced = true;
		} else theme = resolveAuto(stored, mediaMatches, policy.defaultTheme, registry);
	} else if (policy.policy === "light" || policy.policy === "dark") {
		theme = policy.policy;
		forced = true;
	} else theme = resolveAuto(stored, mediaMatches, policy.defaultTheme, registry);
	const contrastForced = policy.contrast === "standard" || policy.contrast === "high";
	const contrast = policy.contrast === "standard" || policy.contrast === "high" ? policy.contrast : storedContrast === "high" ? "high" : "standard";
	return {
		theme,
		contrast,
		forced,
		contrastForced
	};
}
// src/lib/theme/policy.generated.ts
var generatedPolicyDoc = {
	policy: "auto",
	contrast: "auto",
	defaultTheme: "dark",
	updatedAt: "",
	$extensions: {}
};
/** Resolve the base URL.
*
* Precedence (highest first):
* - NVOOS_SSR_API_ORIGIN (set by scripts/serve.mjs to
*   `http://127.0.0.1:<PORT>`) — the SSR render self-fetches the in-process
*   BFF listener instead of the public URL. On Velocity the public self-
*   request fails at the network layer (~1s TLS/DNS error, incident
*   2026-10-29 #2) even though x-forwarded-* headers are present.
* - Runtime SSR: the request URL — the same-origin /api/* proxy. A
*   build-time NVOOS_API_BASE (the hermetic fixture server) is baked into
*   the mirror dist and MUST be ignored at runtime, otherwise every SSR
*   render fetches localhost:8123 and 500s (incident 2026-10-29).
* - Build time (getStaticPaths): no request URL, so NVOOS_API_BASE applies.
*/
function resolveBase(requestUrl) {
	const ssrOrigin = process.env.NVOOS_SSR_API_ORIGIN;
	if (ssrOrigin) return `${ssrOrigin.replace(/\/+$/, "")}/api`;
	if (requestUrl) return new URL("/api", requestUrl).toString().replace(/\/+$/, "");
	throw new Error("Commerce client needs a request URL (runtime) or NVOOS_API_BASE (build).");
}
function joinPath(base, path) {
	return `${base}/${path}`;
}
/** Serialize a where clause into Payload-style query params (bridge B2). */
function buildWhereParams(where) {
	const params = new URLSearchParams();
	for (const [field, operators] of Object.entries(where)) for (const [operator, value] of Object.entries(operators)) {
		if (value === void 0 || value === null || value === "") continue;
		const values = Array.isArray(value) ? value : [value];
		for (const item of values) params.append(`where[${field}][${operator}]`, String(item));
	}
	return params.toString();
}
/** Build a collection query string. */
function buildCollectionQuery(params = {}) {
	const q = new URLSearchParams();
	if (params.page && params.page > 1) q.set("page", String(params.page));
	if (params.limit) q.set("limit", String(Math.min(params.limit, 100)));
	if (params.sort) q.set("sort", params.sort);
	if (params.status && params.status !== "publish") q.set("status", params.status);
	const where = buildWhereParams(params.where ?? {});
	return where ? `${q.toString()}&${where}` : q.toString();
}
async function fetchJson(url) {
	const res = await fetch(url, { headers: { accept: "application/json" } });
	if (!res.ok) throw new Error(`Commerce API ${res.status} for ${url}`);
	return res.json();
}
/** Strict envelope validation — loud failure on contract drift (P5).
*  zod v4 parse (D3): typed narrowing at call sites, prefixed errors that
*  name the collection — a malformed response is a loud error, never a
*  silently empty catalog. */
var envelopeSchema = z.object({
	docs: z.array(z.unknown()),
	totalDocs: z.number(),
	totalPages: z.number(),
	page: z.number()
});
function assertEnvelope(data, collection) {
	const result = envelopeSchema.safeParse(data);
	if (!result.success) {
		const issues = result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
		throw new Error(`[${collection}] envelope invalid — ${issues}`);
	}
	return data;
}
var memo = /* @__PURE__ */ new Map();
/** Module-memo TTL — see above. 10 s covers any single render comfortably. */
var MEMO_TTL_MS = 1e4;
/** Fetch one page of a collection. */
async function getCollection(collection, requestUrl, params = {}) {
	const query = buildCollectionQuery(params);
	const suffix = query ? `?${query}` : "";
	const url = joinPath(resolveBase(requestUrl), collection) + suffix;
	const hit = memo.get(url);
	if (hit) {
		if (hit.expires > Date.now()) return hit.data;
		memo.delete(url);
	}
	const validated = assertEnvelope(await fetchJson(url), collection);
	memo.set(url, {
		data: validated,
		expires: Date.now() + MEMO_TTL_MS
	});
	return validated;
}
/** Accumulate ALL pages of a collection (getStaticPaths use). */
async function getAll(collection, requestUrl, params = {}) {
	const first = await getCollection(collection, requestUrl, {
		page: 1,
		limit: 100,
		...params
	});
	if (first.totalPages <= 1) return first.docs;
	const rest = await Promise.all(Array.from({ length: first.totalPages - 1 }, (_, i) => getCollection(collection, requestUrl, {
		page: i + 2,
		limit: 100,
		...params
	})));
	return [...first.docs, ...rest.flatMap((p) => p.docs)];
}
/** Fetch one page of a collection, degrading a 404 to null.
*
* For AUXILIARY reads only (the home-page stat counts): a 404 here means
* the backend predates this collection (deployment version skew — e.g. the
* bridge plugin on the backend lacks a newer endpoint). An absent stat must
* not fail the whole render. Malformed envelopes and other statuses still
* throw loudly (P5 discipline is untouched). Null results are not memoized
* so a later backend deploy becomes visible on the next render.
*/
async function getCollectionOrNull(collection, requestUrl, params = {}) {
	const query = buildCollectionQuery(params);
	const suffix = query ? `?${query}` : "";
	const url = joinPath(resolveBase(requestUrl), collection) + suffix;
	const hit = memo.get(url);
	if (hit) {
		if (hit.expires > Date.now()) return hit.data;
		memo.delete(url);
	}
	const res = await fetch(url, { headers: { accept: "application/json" } });
	if (res.status === 404) return null;
	if (!res.ok) throw new Error(`Commerce API ${res.status} for ${url}`);
	const validated = assertEnvelope(await res.json(), collection);
	memo.set(url, {
		data: validated,
		expires: Date.now() + MEMO_TTL_MS
	});
	return validated;
}
/** Fetch a single product by ID (SSR fallback + 404 handling). */
async function getProduct(id, requestUrl) {
	const url = joinPath(resolveBase(requestUrl), `products/${id}`);
	const res = await fetch(url, { headers: { accept: "application/json" } });
	if (res.status === 404) return null;
	if (!res.ok) throw new Error(`Commerce API ${res.status} for ${url}`);
	return await res.json();
}
var getProducts = (requestUrl, params = {}) => getCollection("products", requestUrl, params);
var getPromotions = (requestUrl, params = {}) => getCollection("promotions", requestUrl, params);
var getPromocodes = (requestUrl, params = {}) => getCollection("promocodes", requestUrl, params);
/** Fetch a global singleton (banner/carousel). */
async function getGlobal(slug, requestUrl) {
	const url = joinPath(resolveBase(requestUrl), `globals/${slug}`);
	const res = await fetch(url, { headers: { accept: "application/json" } });
	if (!res.ok) return null;
	return await res.json();
}
/** Runtime TTL override (seconds; ≤ 0 disables the memo) — the e2e seam that
*  makes PATCH→render deterministic in a single long-lived process. Default
*  60 s (105 §3). Read per call so a serve.mjs env change applies live. */
function policyTtlMs() {
	const value = Number(process.env.NVOOS_THEME_POLICY_TTL);
	if (Number.isFinite(value) && value >= 0) return value * 1e3;
	return 6e4;
}
var globalsMemo = /* @__PURE__ */ new Map();
/** Fetch the theme-policy doc (105 §1) through the resolved base, 60 s TTL,
*  default doc on failure. */
async function getThemePolicy(requestUrl) {
	const now = Date.now();
	let base;
	try {
		base = resolveBase(requestUrl);
	} catch {
		return generatedPolicyDoc;
	}
	const key = `${base}/globals/theme`;
	const hit = globalsMemo.get(key);
	if (hit && hit.expires > now) return hit.doc;
	try {
		const res = await fetch(key, { headers: { accept: "application/json" } });
		if (!res.ok) throw new Error(`Commerce API ${res.status} for ${key}`);
		const doc = parsePolicyDoc(await res.json());
		globalsMemo.set(key, {
			doc,
			expires: now + policyTtlMs()
		});
		return doc;
	} catch {
		return generatedPolicyDoc;
	}
}
/** Fallback shop doc — fail closed: an empty checkoutUrl disables the
*  handoff link in the cart (106 §4); the missing source mode resolves to
*  `native` so legacy backends keep the URL handoff (108 §2). */
var DEFAULT_SHOP_DOC = {
	checkoutUrl: "",
	cartUrl: "",
	returnUrl: "",
	currency: "USD",
	currencySymbol: "$",
	updatedAt: "",
	productsSource: "native",
	paymentMethods: [],
	stripePublishableKey: "",
	guestCheckout: false
};
/** Fetch the shop globals doc (106 §1.3) through the resolved base, 60 s TTL,
*  default doc on failure. */
async function getShop(requestUrl) {
	const now = Date.now();
	let base;
	try {
		base = resolveBase(requestUrl);
	} catch {
		return DEFAULT_SHOP_DOC;
	}
	const key = `${base}/globals/shop`;
	const hit = globalsMemo.get(key);
	if (hit && hit.expires > now) return hit.doc;
	try {
		const res = await fetch(key, { headers: { accept: "application/json" } });
		if (!res.ok) throw new Error(`Commerce API ${res.status} for ${key}`);
		const raw = await res.json();
		const doc = {
			checkoutUrl: typeof raw.checkoutUrl === "string" ? raw.checkoutUrl : "",
			cartUrl: typeof raw.cartUrl === "string" ? raw.cartUrl : "",
			returnUrl: typeof raw.returnUrl === "string" ? raw.returnUrl : "",
			currency: typeof raw.currency === "string" ? raw.currency : "USD",
			currencySymbol: typeof raw.currencySymbol === "string" ? raw.currencySymbol : "$",
			updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : "",
			productsSource: raw.productsSource === "woo" || raw.productsSource === "both" ? raw.productsSource : "native",
			paymentMethods: Array.isArray(raw.paymentMethods) ? raw.paymentMethods.filter((m) => typeof m === "object" && m !== null && typeof m.id === "string" && typeof m.title === "string") : [],
			stripePublishableKey: typeof raw.stripePublishableKey === "string" ? raw.stripePublishableKey : "",
			guestCheckout: typeof raw.guestCheckout === "boolean" ? raw.guestCheckout : false
		};
		globalsMemo.set(key, {
			doc,
			expires: now + 6e4
		});
		return doc;
	} catch {
		return DEFAULT_SHOP_DOC;
	}
}
var getPosts = (requestUrl, params = {}) => getCollection("content/posts", requestUrl, params);
var getAllPages = (requestUrl) => getAll("content/pages", requestUrl);
var getAllPosts = (requestUrl) => getAll("content/posts", requestUrl);
/** Fetch a single page by ID (SSR + 404 handling — the getProduct pattern).
*
* Preview reads (Proposal 107 §3.2) pass `status: 'any'` plus the visitor's
* cookie header: the backend then serves drafts to managers only (fail-closed
* 404 otherwise). Preview reads never touch the memo cache — cookie-dependent
* responses must not leak across renders. */
async function getPage(id, requestUrl, opts = {}) {
	const q = opts.status === "any" ? "?status=any" : "";
	const url = joinPath(resolveBase(requestUrl), `content/pages/${id}`) + q;
	const res = await fetch(url, { headers: {
		accept: "application/json",
		...opts.cookie ? { cookie: opts.cookie } : {}
	} });
	if (res.status === 404) return null;
	if (!res.ok) throw new Error(`Commerce API ${res.status} for ${url}`);
	return await res.json();
}
/** Fetch a single post by ID (SSR + 404 handling; preview opts — see getPage). */
async function getPost(id, requestUrl, opts = {}) {
	const q = opts.status === "any" ? "?status=any" : "";
	const url = joinPath(resolveBase(requestUrl), `content/posts/${id}`) + q;
	const res = await fetch(url, { headers: {
		accept: "application/json",
		...opts.cookie ? { cookie: opts.cookie } : {}
	} });
	if (res.status === 404) return null;
	if (!res.ok) throw new Error(`Commerce API ${res.status} for ${url}`);
	return await res.json();
}
/** Fetch all products for getStaticPaths (build-time, hermetic fixtures). */
var getAllProducts = (requestUrl, params = {}) => getAll("products", requestUrl, params);
var getAllCategories = (requestUrl) => getAll("categories", requestUrl);
var getAllBrands = (requestUrl) => getAll("brands", requestUrl);
var getAllColors = (requestUrl) => getAll("colors", requestUrl);
export { getThemePolicy as _, getAllPosts as a, getGlobal as c, getPosts as d, getProduct as f, getShop as g, getPromotions as h, getAllPages as i, getPage as l, getPromocodes as m, getAllCategories as n, getAllProducts as o, getProducts as p, getAllColors as r, getCollectionOrNull as s, getAllBrands as t, getPost as u, resolvePolicyTheme as v };
