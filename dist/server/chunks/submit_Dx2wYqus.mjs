import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { createHash } from "node:crypto";
// src/lib/mail.ts
/** Trim and collapse a header-ish value (no CR/LF injection). */
function clean(value) {
	return (value ?? "").replace(/[\r\n]+/g, " ").trim();
}
/** Brevo transactional endpoint + JSON body. */
function brevoRequest(config, message) {
	const body = {
		sender: {
			email: clean(config.from),
			...config.fromName ? { name: clean(config.fromName) } : {}
		},
		to: [{ email: clean(config.to) }],
		subject: clean(config.subject),
		textContent: message.text,
		...message.replyTo ? { replyTo: { email: clean(message.replyTo) } } : {},
		...message.idempotencyKey ? { headers: { "idempotencyKey": message.idempotencyKey } } : {}
	};
	return {
		url: "https://api.brevo.com/v3/smtp/email",
		headers: {
			"api-key": config.brevoKey ?? "",
			"content-type": "application/json",
			accept: "application/json"
		},
		body: JSON.stringify(body)
	};
}
/** Mailjet v3.1 send endpoint + JSON body. */
function mailjetRequest(config, message) {
	const body = { Messages: [{
		From: {
			Email: clean(config.from),
			...config.fromName ? { Name: clean(config.fromName) } : {}
		},
		To: [{ Email: clean(config.to) }],
		Subject: clean(config.subject),
		TextPart: message.text,
		...message.replyTo ? { ReplyTo: { Email: clean(message.replyTo) } } : {}
	}] };
	return {
		url: "https://api.mailjet.com/v3.1/send",
		headers: {
			authorization: `Basic ${Buffer.from(`${config.mailjetKey ?? ""}:${config.mailjetSecret ?? ""}`).toString("base64")}`,
			"content-type": "application/json"
		},
		body: JSON.stringify(body)
	};
}
/** Build the provider request for the configured provider. */
function buildMailRequest(config, message) {
	return config.provider === "mailjet" ? mailjetRequest(config, message) : brevoRequest(config, message);
}
/**
* The missing-secret message for a provider — surfaced at request time (never
* at build time, so a scaffold never needs the key to succeed).
*/
function missingSecret(config) {
	if (config.provider === "mailjet") return config.mailjetKey && config.mailjetSecret ? void 0 : "MAILJET_API_KEY and MAILJET_SECRET_KEY must be set for provider \"mailjet\".";
	return config.brevoKey ? void 0 : "BREVO_API_KEY must be set for provider \"brevo\".";
}
/** Read the provider config from the environment (secrets never from disk). */
function readMailConfig(env) {
	return {
		provider: env.MAIL_PROVIDER === "mailjet" ? "mailjet" : "brevo",
		from: clean(env.MAIL_FROM),
		fromName: env.MAIL_FROM_NAME,
		to: clean(env.MAIL_TO),
		subject: clean(env.MAIL_SUBJECT) || "New website enquiry",
		brevoKey: env.BREVO_API_KEY,
		mailjetKey: env.MAILJET_API_KEY,
		mailjetSecret: env.MAILJET_SECRET_KEY
	};
}
/**
* The environment at REQUEST time.
*
* `import.meta.env` is a BUILD-time snapshot: Vite inlines what it can see, so
* a secret injected into the running process after the build — the managed
* tier's normal delivery mechanism — is invisible to it. Read `process.env`
* first and fall back to the build-time object so `astro dev` with a `.env`
* file still works. Runtime wins on conflict.
*/
function runtimeEnv() {
	const build = Object.assign({
		"ASSETS_PREFIX": void 0,
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SITE": "https://astro.nvoos.cloud",
		"SSR": true
	}, { _: "/opt/hostedtoolcache/node/22.23.4/x64/bin/npm" }) ?? {};
	const runtime = typeof process !== "undefined" && process.env ? process.env : {};
	return {
		...build,
		...runtime
	};
}
/** Send through the provider. Returns the HTTP status (never throws). */
async function sendMail(config, message, fetchImpl = fetch) {
	const secret = missingSecret(config);
	if (secret) return {
		ok: false,
		status: 500,
		detail: secret
	};
	if (!config.from || !config.to) return {
		ok: false,
		status: 500,
		detail: "MAIL_FROM and MAIL_TO must be set."
	};
	const request = buildMailRequest(config, message);
	try {
		const response = await fetchImpl(request.url, {
			method: "POST",
			headers: request.headers,
			body: request.body
		});
		if (response.ok) return {
			ok: true,
			status: response.status
		};
		const detail = await response.text().catch(() => "");
		return {
			ok: false,
			status: response.status,
			detail: detail.slice(0, 300)
		};
	} catch (error) {
		return {
			ok: false,
			status: 502,
			detail: error instanceof Error ? error.message : String(error)
		};
	}
}
var RATE_WINDOW_MS = 6e5;
/** Fields the form itself owns — never echoed into the email. */
var INTERNAL_FIELDS = /* @__PURE__ */ new Set([
	"honeypot",
	"timestamp",
	"_redirect",
	"form",
	"post_id"
]);
/**
* Normalise a JSON or urlencoded payload to string pairs.
*
* Returns undefined for an oversized, unparseable or non-object body. The
* declared length is checked first (cheap) and then measured, because
* content-length is advisory and absent on a chunked body.
*/
async function readFields(request) {
	if (Number(request.headers.get("content-length") ?? 0) > 65536) return;
	const raw = await request.text();
	if (Buffer.byteLength(raw, "utf8") > 65536) return;
	const type = request.headers.get("content-type") ?? "";
	try {
		if (type.includes("application/json")) {
			const parsed = JSON.parse(raw);
			if (parsed === null || typeof parsed !== "object") return;
			const out = {};
			for (const [key, value] of Object.entries(parsed)) if (typeof value === "string" || typeof value === "number") out[key] = String(value);
			return out;
		}
		const form = await new Response(raw, { headers: { "content-type": type } }).formData();
		const out = {};
		for (const [key, value] of form.entries()) if (typeof value === "string") out[key] = value;
		return out;
	} catch {
		return;
	}
}
/**
* A filled honeypot, or a submit too fast for a human.
*
* `now` is injectable so the tests do not have to sleep. A missing timestamp
* is NOT treated as a bot: some clients drop hidden fields, and a false
* positive here would silently discard a real enquiry.
*/
function isBot(fields, now = Date.now()) {
	if ((fields.honeypot ?? "").trim() !== "") return true;
	const stamp = Number(fields.timestamp ?? 0);
	const elapsed = (now - stamp) / 1e3;
	return stamp > 0 && elapsed >= 0 && elapsed < 2;
}
/** How many addresses the throttle will remember before it prunes. */
var MAX_TRACKED_IPS = 5e3;
/** A bare IPv4/IPv6 literal — X-Forwarded-For is attacker-adjacent text. */
function isIpAddress(value) {
	if (value.includes(":")) return /^[0-9a-f:.]+$/i.test(value);
	const parts = value.split(".");
	return parts.length === 4 && parts.every((part) => /^[0-9]{1,3}$/.test(part) && Number(part) <= 255);
}
/** Loopback / RFC1918 / link-local — i.e. something is proxying for us. */
function isLocalPeer(address) {
	if (!isIpAddress(address)) return false;
	const mapped = address.startsWith("::ffff:") ? address.slice(7) : address;
	if (mapped.includes(":")) return mapped === "::1" || mapped === "::" || /^(?:fc|fd|fe[89ab])/i.test(mapped);
	const [a, b] = mapped.split(".").map(Number);
	return a === 10 || a === 127 || a === 192 && b === 168 || a === 172 && b >= 16 && b <= 31 || a === 169 && b === 254;
}
/**
* The visitor's address, for the per-IP throttle.
*
* Behind a reverse proxy (Cloudways nginx, the managed tier) the socket peer is
* the PROXY, so keying the throttle on `clientAddress` alone silently becomes
* one site-wide bucket: the sixth enquiry in ten minutes from anybody is
* refused. That is not hypothetical — it was measured on a managed deploy
* (2026-11-15).
*
* The proxy APPENDS the address it saw to X-Forwarded-For, so the RIGHTMOST hop
* is the value a client cannot forge: a visitor-supplied header is prepended,
* never replaced. Trust that hop only when the peer is itself loopback/private
* (proof a proxy is in front); otherwise the peer IS the visitor.
*/
function clientIp(request, clientAddress) {
	const peer = (clientAddress ?? "").trim();
	if (peer !== "" && !isLocalPeer(peer)) return peer;
	const hops = (request.headers.get("x-forwarded-for") ?? "").split(",").map((hop) => hop.trim()).filter((hop) => hop !== "");
	const rightmost = hops.length > 0 ? hops[hops.length - 1] : "";
	return isIpAddress(rightmost) ? rightmost : peer || "unknown";
}
/**
* Per-IP fixed-window throttle.
*
* A closure rather than module state so each caller — and each test — owns its
* own buckets. In production one managed site runs one Node process, so this
* is the app layer; a CDN/WAF rate rule is the real edge.
*/
function createThrottle(limit = 5, windowMs = RATE_WINDOW_MS) {
	const hits = /* @__PURE__ */ new Map();
	return (ip, now = Date.now()) => {
		const recent = (hits.get(ip) ?? []).filter((at) => now - at < windowMs);
		recent.push(now);
		if (recent.length > limit + 1) recent.splice(0, recent.length - (limit + 1));
		hits.set(ip, recent);
		if (hits.size > MAX_TRACKED_IPS) {
			for (const [key, stamps] of hits) if (stamps.every((at) => now - at >= windowMs)) hits.delete(key);
		}
		return recent.length > limit;
	};
}
/** `key: value` lines for the fields the form does not own. */
function visibleRows(fields) {
	return Object.entries(fields).filter(([key]) => !INTERNAL_FIELDS.has(key)).map(([key, value]) => `${key}: ${value.slice(0, 2e3)}`);
}
/**
* The same payload inside one bucket is one email, so a double-click or a
* retried request cannot deliver twice.
*/
function idempotencyKey(rows) {
	return createHash("sha256").update(rows.join("\n")).digest("hex").slice(0, 32);
}
/** Plain-text body. A text part always beats HTML-only for deliverability. */
function buildText(rows) {
	return `${rows.join("\n")}\n\n--\nSent from a form on the website.`;
}
/** The visitor's address, when they left a usable one. */
function replyToOf(fields) {
	const value = (fields.email ?? fields["e-mail"] ?? "").trim();
	return value.includes("@") ? value : void 0;
}
// src/pages/forms/submit.ts
var submit_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var throttled = createThrottle();
var RETURN_PATH = "/contact/";
/** 303 so the browser follows with a GET and the POST is not replayed. */
function seeOther(origin, path) {
	return new Response(null, {
		status: 303,
		headers: {
			location: new URL(path, origin).toString(),
			"cache-control": "no-store"
		}
	});
}
function wantsDocument(request) {
	return (request.headers.get("accept") ?? "").includes("text/html");
}
var POST = async ({ request, clientAddress, url }) => {
	const asDocument = wantsDocument(request);
	const fail = (reason, status) => {
		console.error(`[forms] ${reason}`);
		return asDocument ? seeOther(url.origin, `${RETURN_PATH}?error=1`) : new Response("Delivery failed", { status });
	};
	const fields = await readFields(request);
	if (!fields) return asDocument ? seeOther(url.origin, `${RETURN_PATH}?error=1`) : new Response("Bad request", { status: 400 });
	if (isBot(fields)) return asDocument ? seeOther(url.origin, `${RETURN_PATH}?sent=1`) : Response.json({ ok: true });
	if (throttled(clientIp(request, clientAddress))) return asDocument ? seeOther(url.origin, `${RETURN_PATH}?error=1`) : new Response("Too many requests", { status: 429 });
	const rows = visibleRows(fields);
	if (rows.length === 0) return asDocument ? seeOther(url.origin, `${RETURN_PATH}?error=1`) : new Response("Empty submission", { status: 400 });
	const result = await sendMail(readMailConfig(runtimeEnv()), {
		text: buildText(rows),
		replyTo: replyToOf(fields),
		idempotencyKey: idempotencyKey(rows)
	});
	if (!result.ok) return fail(`delivery failed (${result.status}): ${result.detail ?? ""}`, 502);
	return asDocument ? seeOther(url.origin, `${RETURN_PATH}?sent=1`) : Response.json({ ok: true });
};
// \0virtual:astro:page:src/pages/forms/submit@_@ts
var page = () => submit_exports;
export { page };
