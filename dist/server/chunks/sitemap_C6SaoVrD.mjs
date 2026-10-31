import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { a as productPath, i as colorPath, n as brandPath, r as categoryPath, t as absoluteUrl } from "./url_DPhlWBuB.mjs";
import { i as getAllProducts, n as getAllCategories, r as getAllColors, t as getAllBrands } from "./client_DyXLDCkM.mjs";
import { i as toIsoDate } from "./normalize_c6l1Y4uw.mjs";
// src/pages/sitemap.xml.ts
var sitemap_xml_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ site, url }) => {
	const base = site ?? new URL("https://store.nvoos.cloud");
	const [products, categories, brands, colors] = await Promise.all([
		getAllProducts(url),
		getAllCategories(url),
		getAllBrands(url),
		getAllColors(url)
	]);
	const xml = [
		"<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
		"<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
		...[
			{ loc: absoluteUrl(base, "/") },
			{ loc: absoluteUrl(base, "/about/") },
			{ loc: absoluteUrl(base, "/terms/") },
			{ loc: absoluteUrl(base, "/promotions/") },
			{ loc: absoluteUrl(base, "/promocodes/") },
			{ loc: absoluteUrl(base, "/categories/") },
			{ loc: absoluteUrl(base, "/brands/") },
			{ loc: absoluteUrl(base, "/colors/") },
			...categories.map((category) => ({ loc: absoluteUrl(base, categoryPath(category.id, category.name)) })),
			...brands.map((brand) => ({ loc: absoluteUrl(base, brandPath(brand.id, brand.name)) })),
			...colors.map((color) => ({ loc: absoluteUrl(base, colorPath(color.id, color.name)) })),
			...products.map((product) => ({
				loc: absoluteUrl(base, productPath(product.id, product.name)),
				lastmod: toIsoDate(product.updatedAt) ?? void 0
			}))
		].map((entry) => {
			const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : "";
			return `  <url>\n    <loc>${entry.loc}</loc>${lastmod}\n  </url>`;
		}),
		"</urlset>"
	].join("\n");
	return new Response(xml, {
		status: 200,
		headers: {
			"content-type": "application/xml; charset=utf-8",
			"cache-control": "public, s-maxage=3600, stale-while-revalidate=86400"
		}
	});
};
// \0virtual:astro:page:src/pages/sitemap.xml@_@ts
var page = () => sitemap_xml_exports;
export { page };
