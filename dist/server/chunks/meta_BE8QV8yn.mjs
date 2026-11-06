import { t as absoluteUrl } from "./url_C-9WkiDw.mjs";
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
function metaForProduct(product, site) {
	const canonical = absoluteUrl(site, `/products/${product.id}/`);
	const description = plainExcerpt(product.description);
	const title = pageTitle(product.name);
	return {
		title,
		description,
		canonical,
		og: {
			type: "product",
			title,
			description,
			image: absoluteUrl(site, product.image),
			url: canonical
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			image: absoluteUrl(site, product.image)
		}
	};
}
export { pageTitle as n, plainExcerpt as r, metaForProduct as t };
