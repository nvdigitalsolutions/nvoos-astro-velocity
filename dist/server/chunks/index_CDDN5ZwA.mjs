import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as maybeRenderHead, i as renderComponent, p as addAttribute, u as renderTemplate } from "./server_Bp-6qVas.mjs";
import { t as createComponent } from "./astro-component_D398hF7X.mjs";
import { t as createAstro } from "./astro-global_Q8FhgS3w.mjs";
import { t as $$BaseLayout } from "./BaseLayout_Bwncmh8b.mjs";
import "./compiler_D-8-28NN.mjs";
import { r as categoryPath } from "./url_DPhlWBuB.mjs";
import { n as plainExcerpt, t as pageTitle } from "./meta_BHXnqtiS.mjs";
import { n as getAllCategories } from "./client_DyXLDCkM.mjs";
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1>Categories</h1><ul>${categories.map((category) => renderTemplate`<li><a${addAttribute(categoryPath(category.id, category.name), "href")}>${category.name} (${category.productsCount})</a></li>`)}</ul>` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/categories/index.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/categories/index.astro";
var $$url = "/categories/";
// \0virtual:astro:page:src/pages/categories/index@_@astro
var page = () => categories_exports;
export { page };
