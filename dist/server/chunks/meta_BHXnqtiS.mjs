// src/lib/seo/meta.ts
var SITE_NAME = "NV Store";
function pageTitle(...parts) {
	const tail = parts.filter(Boolean).join(" — ");
	return tail ? `${tail} | ${SITE_NAME}` : SITE_NAME;
}
/** Plain-text excerpt for meta descriptions (and schema text). */
function plainExcerpt(html, max = 160) {
	const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
	if (text.length <= max) return text;
	return `${text.slice(0, max - 1).trimEnd()}\u2026`;
}
export { plainExcerpt as n, pageTitle as t };
