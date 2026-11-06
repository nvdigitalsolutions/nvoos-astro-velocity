import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { a as getAllPosts, i as getAllPages, n as getAllCategories, o as getAllProducts, r as getAllColors, t as getAllBrands } from "./client_TtS43Z5n.mjs";
import { a as productPath, i as colorPath, n as brandPath, r as categoryPath, t as absoluteUrl } from "./url_C-9WkiDw.mjs";
import { t as isPublished } from "./publish_DHIf2m0M.mjs";
import { i as toIsoDate } from "./normalize_Uj83xBMQ.mjs";
import { t as getCollection } from "./_astro_content_CVJtriY_.mjs";
// src/pages/sitemap.xml.ts
var sitemap_xml_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ site, url }) => {
	const base = site ?? new URL("https://store.nvoos.cloud");
	const [products, categories, brands, colors, pages, posts, localPages, localPosts] = await Promise.all([
		getAllProducts(url),
		getAllCategories(url),
		getAllBrands(url),
		getAllColors(url),
		getAllPages(url),
		getAllPosts(url),
		getCollection("pages", (entry) => !entry.data.draft),
		getCollection("posts", (entry) => !entry.data.draft)
	]);
	const localPageSlugs = new Set(pages.filter(isPublished).map((page) => page.slug));
	const localPostSlugs = new Set(posts.filter(isPublished).map((post) => post.slug));
	const extraPages = localPages.filter((entry) => !localPageSlugs.has(entry.id));
	const extraPosts = localPosts.filter((entry) => !localPostSlugs.has(entry.id));
	const xml = [
		"<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
		"<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
		...[
			{ loc: absoluteUrl(base, "/") },
			{ loc: absoluteUrl(base, "/about/") },
			{ loc: absoluteUrl(base, "/terms/") },
			{ loc: absoluteUrl(base, "/promotions/") },
			{ loc: absoluteUrl(base, "/promocodes/") },
			{ loc: absoluteUrl(base, "/products/") },
			{ loc: absoluteUrl(base, "/categories/") },
			{ loc: absoluteUrl(base, "/brands/") },
			{ loc: absoluteUrl(base, "/colors/") },
			{ loc: absoluteUrl(base, "/blog/") },
			...categories.map((category) => ({ loc: absoluteUrl(base, categoryPath(category.id, category.name)) })),
			...brands.map((brand) => ({ loc: absoluteUrl(base, brandPath(brand.id, brand.name)) })),
			...colors.map((color) => ({ loc: absoluteUrl(base, colorPath(color.id, color.name)) })),
			...products.filter(isPublished).map((product) => ({
				loc: absoluteUrl(base, productPath(product.id, product.name)),
				lastmod: toIsoDate(product.updatedAt) ?? void 0
			})),
			...pages.filter(isPublished).map((page) => ({
				loc: absoluteUrl(base, `/pages/${page.id}/${page.slug}/`),
				lastmod: toIsoDate(page.updatedAt) ?? void 0
			})),
			...extraPages.map((entry) => ({
				loc: absoluteUrl(base, `/pages/0/${entry.id}/`),
				lastmod: entry.data.date?.toISOString()
			})),
			...posts.filter(isPublished).map((post) => ({
				loc: absoluteUrl(base, `/blog/${post.id}/${post.slug}/`),
				lastmod: toIsoDate(post.updatedAt) ?? void 0
			})),
			...extraPosts.map((entry) => ({
				loc: absoluteUrl(base, `/blog/0/${entry.id}/`),
				lastmod: entry.data.date?.toISOString()
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
