import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { t as getAll } from "./client_DhvHaxQG.mjs";
import { t as composeLlmsTxt } from "./llms_DOSoAIvo.mjs";
// src/pages/llms.txt.ts
var llms_txt_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
/** Load a collection, degrading to [] on any failure. */
async function safeLoad(load) {
	try {
		return await load();
	} catch {
		return [];
	}
}
var GET = async ({ url, site }) => {
	const origin = (site?.origin ?? url.origin).replace(/\/+$/, "");
	const products = await safeLoad(() => getAll("products", url));
	const pages = await safeLoad(() => getAll("content/pages", url));
	const posts = await safeLoad(() => getAll("content/posts", url));
	const body = composeLlmsTxt({
		name: "Storefront",
		summary: "A storefront: products, categories, brands and editorial pages.",
		origin,
		products: products.filter((product) => product.slug).map((product) => ({
			path: `/products/${product.id}/${product.slug}/`,
			title: product.name ?? String(product.id),
			note: product.shortDescription
		})),
		pages: pages.filter((page) => page.slug).map((page) => ({
			path: `/pages/${page.id}/${page.slug}/`,
			title: page.title ?? String(page.id),
			note: page.excerpt
		})),
		posts: posts.filter((post) => post.slug).map((post) => ({
			path: `/blog/${post.id}/${post.slug}/`,
			title: post.title ?? String(post.id),
			note: post.excerpt
		})),
		optional: [
			{
				path: "/products/",
				title: "All products"
			},
			{
				path: "/blog/",
				title: "Blog"
			},
			{
				path: "/search/",
				title: "Search"
			}
		],
		variant: "markdown"
	});
	return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
// \0virtual:astro:page:src/pages/llms.txt@_@ts
var page = () => llms_txt_exports;
export { page };
