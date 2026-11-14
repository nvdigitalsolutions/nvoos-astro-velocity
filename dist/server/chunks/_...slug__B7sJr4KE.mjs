import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { p as getProduct } from "./client_DhvHaxQG.mjs";
import { t as isPublished } from "./publish_DHIf2m0M.mjs";
import { r as textFromHtml } from "./llms_DOSoAIvo.mjs";
// src/pages/products/[id]/[...slug]/index.md.ts
var index_md_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ params, url }) => {
	const product = await getProduct(Number(params.id), url);
	if (!product || !isPublished(product)) return new Response("Product not found", { status: 404 });
	const parts = [`# ${product.name}`];
	if (product.description) parts.push(textFromHtml(product.description).trim());
	if (product.price) {
		const was = product.oldPrice !== null && product.oldPrice !== void 0 ? ` (was ${product.oldPrice})` : "";
		parts.push(`**Price:** ${product.price}${was}`);
	}
	return new Response(`${parts.filter(Boolean).join("\n\n").trim()}\n`, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
};
// \0virtual:astro:page:src/pages/products/[id]/[...slug]/index.md@_@ts
var page = () => index_md_exports;
export { page };
