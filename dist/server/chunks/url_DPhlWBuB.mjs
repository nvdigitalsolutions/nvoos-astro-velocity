// src/lib/url.ts
/** Slugify a name for URL suffixes. */
function slugify(name) {
	return name.toLowerCase().trim().replace(/['\u2019]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "item";
}
function productPath(id, name) {
	return `/products/${id}/${slugify(name)}/`;
}
function categoryPath(id, name) {
	return `/categories/${id}/${slugify(name)}/`;
}
function brandPath(id, name) {
	return `/brands/${id}/${slugify(name)}/`;
}
function colorPath(id, name) {
	return `/colors/${id}/${slugify(name)}/`;
}
/** Absolute canonical URL on the configured site host. */
function absoluteUrl(site, path) {
	return `${(typeof site === "string" ? site : site.toString()).replace(/\/+$/, "")}${path}`;
}
export { productPath as a, colorPath as i, brandPath as n, categoryPath as r, absoluteUrl as t };
