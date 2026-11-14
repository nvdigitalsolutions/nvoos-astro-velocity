import { t as absoluteUrl } from "./url_C-9WkiDw.mjs";
// src/lib/seo/jsonld.ts
/** The one builder every route calls. */
function jsonLdFor(kind) {
	if (kind.type === "Product") return [productJsonLd(kind.product, kind.site, kind.currency), breadcrumbJsonLd(kind.breadcrumb)];
	return [{
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: kind.name,
		url: kind.url,
		breadcrumb: {
			"@type": "BreadcrumbList",
			itemListElement: kind.breadcrumb.map((item, index) => ({
				"@type": "ListItem",
				position: index + 1,
				name: item.name,
				item: item.url
			}))
		}
	}];
}
/** Thin wrapper for PLP call sites. */
function collectionPageJsonLd(args) {
	return jsonLdFor({
		type: "CollectionPage",
		...args
	})[0];
}
/** Product + Offer (+ AggregateRating when the contract provides a rating).
*  Variable products (106 §1.1) emit an Offer[] over the variants instead of
*  the single base-price offer — schema-dts-typed so vocabulary drift fails
*  `astro check`. */
function productJsonLd(product, site, currency) {
	const canonical = absoluteUrl(site, `/products/${product.id}/`);
	const images = [product.image, ...product.images].filter(Boolean);
	const offer = {
		"@type": "Offer",
		price: String(product.price),
		priceCurrency: currency,
		availability: "https://schema.org/InStock",
		url: canonical
	};
	if (product.oldPrice !== null && product.oldPrice > product.price) offer.priceValidUntil = new Date(Date.now() + 2592e6).toISOString().slice(0, 10);
	const data = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: product.name,
		description: stripHtml(product.description).slice(0, 300),
		url: canonical,
		offers: product.variants && product.variants.length > 0 ? product.variants.map((variant) => variantOfferJsonLd(variant, canonical, currency)) : offer
	};
	if (images.length > 0) data.image = images;
	if (product.brand) data.brand = {
		"@type": "Brand",
		name: product.brand.name
	};
	if (product.rating !== null) data.aggregateRating = {
		"@type": "AggregateRating",
		ratingValue: String(product.rating),
		bestRating: "5"
	};
	return data;
}
/** One variant offer (106 §1.1) — schema-dts `Offer` vocabulary. */
function variantOfferJsonLd(variant, canonical, currency) {
	const typed = {
		"@type": "Offer",
		price: String(variant.price),
		priceCurrency: currency,
		sku: variant.sku,
		availability: `https://schema.org/${(variant.stock ?? 0) > 0 ? "InStock" : "OutOfStock"}`,
		url: `${canonical}?variant=${variant.id}`
	};
	if (variant.oldPrice !== null && variant.oldPrice > variant.price) typed.priceValidUntil = new Date(Date.now() + 2592e6).toISOString().slice(0, 10);
	return typed;
}
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
/** WebPage — CMS pages (106 §2, schema-dts vocabulary like CollectionPage). */
function webPageJsonLd(args) {
	return {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: args.name,
		url: args.url,
		...args.description ? { description: args.description } : {},
		breadcrumb: {
			"@type": "BreadcrumbList",
			itemListElement: args.breadcrumb.map((item, index) => ({
				"@type": "ListItem",
				position: index + 1,
				name: item.name,
				item: item.url
			}))
		}
	};
}
/** BlogPosting — blog posts (106 §2). Dates are ISO-8601 strings or omitted. */
function blogPostingJsonLd(args) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: args.title,
		url: args.url,
		mainEntityOfPage: args.url,
		...args.description ? { description: args.description } : {},
		...args.datePublished ? { datePublished: args.datePublished } : {},
		...args.dateModified ? { dateModified: args.dateModified } : {},
		...args.image ? { image: args.image } : {},
		author: {
			"@type": "Organization",
			name: "NV Store"
		}
	};
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
/** Strip tags for schema text fields. */
function stripHtml(html) {
	return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
export { organizationJsonLd as a, jsonLdFor as i, breadcrumbJsonLd as n, webPageJsonLd as o, collectionPageJsonLd as r, webSiteJsonLd as s, blogPostingJsonLd as t };
