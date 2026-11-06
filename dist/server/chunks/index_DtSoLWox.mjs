import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { _ as addAttribute, h as maybeRenderHead, m as renderTemplate, s as renderComponent } from "./server_oTayxuEg.mjs";
import { t as createComponent } from "./astro-component_DkgBvFJz.mjs";
import { t as createAstro } from "./astro-global_CZt7TqFY.mjs";
import { t as $$BaseLayout } from "./BaseLayout_B1AMrDC3.mjs";
import "./compiler_CWCzah9E.mjs";
import { t as getAllBrands } from "./client_TtS43Z5n.mjs";
import { n as brandPath } from "./url_C-9WkiDw.mjs";
import { n as pageTitle, r as plainExcerpt } from "./meta_BE8QV8yn.mjs";
// src/pages/brands/index.astro
var brands_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.nvoos.cloud");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	Astro.response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
	const brands = await getAllBrands(Astro.url);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": pageTitle("Brands"),
		"description": plainExcerpt("Browse all brands.")
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1>Brands</h1><p><a href="/products/">Browse all products</a></p><ul>${brands.map((brand) => renderTemplate`<li><a${addAttribute(brandPath(brand.id, brand.name), "href")}>${brand.name}</a></li>`)}</ul>` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/brands/index.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/brands/index.astro";
var $$url = "/brands/";
// \0virtual:astro:page:src/pages/brands/index@_@astro
var page = () => brands_exports;
export { page };
