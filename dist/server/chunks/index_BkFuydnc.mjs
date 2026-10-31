import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as maybeRenderHead, i as renderComponent, p as addAttribute, u as renderTemplate } from "./server_Bp-6qVas.mjs";
import { t as createComponent } from "./astro-component_D398hF7X.mjs";
import { t as createAstro } from "./astro-global_Q8FhgS3w.mjs";
import { t as $$BaseLayout } from "./BaseLayout_Bwncmh8b.mjs";
import "./compiler_D-8-28NN.mjs";
import { n as brandPath } from "./url_DPhlWBuB.mjs";
import { n as plainExcerpt, t as pageTitle } from "./meta_BHXnqtiS.mjs";
import { t as getAllBrands } from "./client_DyXLDCkM.mjs";
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1>Brands</h1><ul>${brands.map((brand) => renderTemplate`<li><a${addAttribute(brandPath(brand.id, brand.name), "href")}>${brand.name}</a></li>`)}</ul>` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/brands/index.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/brands/index.astro";
var $$url = "/brands/";
// \0virtual:astro:page:src/pages/brands/index@_@astro
var page = () => brands_exports;
export { page };
