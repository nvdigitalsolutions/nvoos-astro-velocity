import { t as absoluteUrl } from "./url_DPhlWBuB.mjs";
// src/lib/seo/jsonld.ts
/** BreadcrumbList — Home → (Category) → Product. */
function breadcrumbJsonLd(items) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url
		}))
	};
}
/** Organization — site-wide, rendered once in the base layout. */
function organizationJsonLd(name, site, logoUrl) {
	const data = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name,
		url: absoluteUrl(site, "/")
	};
	if (logoUrl) data.logo = logoUrl;
	return data;
}
/** WebSite (+ SearchAction) — home page only. */
function webSiteJsonLd(name, site) {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name,
		url: absoluteUrl(site, "/"),
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${absoluteUrl(site, "/").replace(/\/+$/, "")}/search?q={search_term_string}`
			},
			"query-input": "required name=search_term_string"
		}
	};
}
export { organizationJsonLd as n, webSiteJsonLd as r, breadcrumbJsonLd as t };
