import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { _ as addAttribute, h as maybeRenderHead, m as renderTemplate, s as renderComponent } from "./server_oTayxuEg.mjs";
import { t as createComponent } from "./astro-component_DkgBvFJz.mjs";
import { t as createAstro } from "./astro-global_CZt7TqFY.mjs";
import { t as $$BaseLayout } from "./BaseLayout_B1AMrDC3.mjs";
import "./compiler_CWCzah9E.mjs";
import { n as getAllCategories } from "./client_TtS43Z5n.mjs";
import { r as categoryPath } from "./url_C-9WkiDw.mjs";
import { n as pageTitle, r as plainExcerpt } from "./meta_BE8QV8yn.mjs";
// src/pages/categories/index.astro
var categories_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.nvoos.cloud");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	Astro.response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
	const categories = await getAllCategories(Astro.url);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": pageTitle("Categories"),
		"description": plainExcerpt("Browse all product categories.")
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1>Categories</h1><p><a href="/products/">Browse all products</a></p><ul>${categories.map((category) => renderTemplate`<li><a${addAttribute(categoryPath(category.id, category.name), "href")}>${category.name} (${category.productsCount})</a></li>`)}</ul>` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/categories/index.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/categories/index.astro";
var $$url = "/categories/";
// \0virtual:astro:page:src/pages/categories/index@_@astro
var page = () => categories_exports;
export { page };
