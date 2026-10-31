import sanitizeHtmlLib from "sanitize-html";
// src/lib/commerce/normalize.ts
var UPLOADS_PREFIX = "/wp-content/uploads";
/**
* Rewrite a backend media URL to the same-origin /media/* path.
* Keeps the path (minus the uploads base) and query string.
*/
function normalizeMediaUrl(url) {
	if (!url) return "";
	try {
		const parsed = new URL(url);
		let path = parsed.pathname;
		if (path.startsWith(UPLOADS_PREFIX)) path = path.slice(19) || "/";
		return `/media${path}${parsed.search}`;
	} catch {
		return url;
	}
}
var SANITIZE_OPTIONS = {
	allowedTags: [
		"p",
		"br",
		"strong",
		"em",
		"ul",
		"ol",
		"li",
		"h2",
		"h3",
		"h4",
		"a",
		"blockquote",
		"code"
	],
	allowedAttributes: { a: [
		"href",
		"target",
		"rel"
	] },
	allowedSchemes: ["http", "https"]
};
/**
* Sanitize product description HTML before render.
* (Upstream content is wp_kses_post-filtered by the bridge; this is the
* second gate at the render boundary — defense in depth.)
*/
function sanitizeDescription(html) {
	return sanitizeHtmlLib(html, SANITIZE_OPTIONS);
}
/** Parse a contract date to ISO, or null when invalid (sitemap safety). */
function toIsoDate(value) {
	if (!value) return null;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return null;
	return date.toISOString();
}
/** Normalize every media field on a product (used at the fetch edge). */
function normalizeProductMedia(product) {
	return {
		...product,
		image: normalizeMediaUrl(product.image),
		images: product.images.map(normalizeMediaUrl)
	};
}
export { toIsoDate as i, normalizeProductMedia as n, sanitizeDescription as r, normalizeMediaUrl as t };
