import limax from "limax";
// src/lib/url.ts
/** Slugify a name for URL suffixes.
*
* limax (D4 — AstroWind's own slugger) transliterates per Unicode, so
* international product names get correct ASCII slugs (`Café Crème` →
* `cafe-creme`) where the old regex dropped diacritics entirely. Apostrophes
* are dropped (not separated) to keep historical URLs stable; the 80-char
* cap and the `'item'` fallback are preserved from the original contract.
*/
function slugify(name) {
	return limax(name, {
		separator: "-",
		separateApostrophes: false
	}).slice(0, 80) || "item";
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
export { productPath as a, colorPath as i, brandPath as n, slugify as o, categoryPath as r, absoluteUrl as t };
