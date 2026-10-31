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
	return "http://localhost:8123/wp-json/nvoos-commerce/v1".replace(/\/+$/, "");
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
/** Strict envelope validation — loud failure on contract drift (P5). */
function assertEnvelope(data, collection) {
	if (!data || typeof data !== "object") throw new Error(`[${collection}] envelope is not an object`);
	const d = data;
	if (!Array.isArray(d.docs)) throw new Error(`[${collection}] envelope missing docs array`);
	if (typeof d.totalDocs !== "number" || typeof d.totalPages !== "number" || typeof d.page !== "number") throw new Error(`[${collection}] envelope missing pagination fields`);
	return data;
}
var memo = /* @__PURE__ */ new Map();
/** Fetch one page of a collection. */
async function getCollection(collection, requestUrl, params = {}) {
	const query = buildCollectionQuery(params);
	const suffix = query ? `?${query}` : "";
	const url = joinPath(resolveBase(requestUrl), collection) + suffix;
	const hit = memo.get(url);
	if (hit) return hit;
	const validated = assertEnvelope(await fetchJson(url), collection);
	memo.set(url, validated);
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
/** Fetch all products for getStaticPaths (build-time, hermetic fixtures). */
var getAllProducts = (requestUrl, params = {}) => getAll("products", requestUrl, params);
var getAllCategories = (requestUrl) => getAll("categories", requestUrl);
var getAllBrands = (requestUrl) => getAll("brands", requestUrl);
var getAllColors = (requestUrl) => getAll("colors", requestUrl);
export { getGlobal as a, getPromotions as c, getAllProducts as i, getAllCategories as n, getProducts as o, getAllColors as r, getPromocodes as s, getAllBrands as t };
