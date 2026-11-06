import { createHmac, timingSafeEqual } from "node:crypto";
// src/lib/content/preview.ts
var DEFAULT_PREVIEW_TTL_MS = 18e5;
var PREVIEW_COOKIE = "nvoos-preview";
function previewTtlMs() {
	const ttl = Number(process.env.NVOOS_PREVIEW_TTL_MS);
	return Number.isFinite(ttl) && ttl > 0 ? ttl : DEFAULT_PREVIEW_TTL_MS;
}
function previewSecret() {
	return process.env.NVOOS_PREVIEW_SECRET || "nvoos-dev-preview-secret";
}
/** Constant-time token verification — expiry then HMAC. */
function verifyPreviewToken(type, id, token) {
	const parts = token.split(".");
	if (parts.length !== 2 || !/^\d+$/.test(parts[0])) return false;
	const expiry = Number(parts[0]);
	if (expiry < Date.now()) return false;
	const payload = `${type}:${id}:${expiry}`;
	const expected = createHmac("sha256", previewSecret()).update(payload).digest("base64url");
	const a = Buffer.from(parts[1]);
	const b = Buffer.from(expected);
	return a.length === b.length && timingSafeEqual(a, b);
}
/** Whether the request carries an active preview session cookie. */
function hasPreviewSession(cookieHeader) {
	return new RegExp(`(?:^|;\\s*)${PREVIEW_COOKIE}=1\\b`).test(cookieHeader ?? "");
}
export { verifyPreviewToken as i, hasPreviewSession as n, previewTtlMs as r, PREVIEW_COOKIE as t };
