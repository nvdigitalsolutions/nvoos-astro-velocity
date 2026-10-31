import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as maybeRenderHead, i as renderComponent, p as addAttribute, u as renderTemplate } from "./server_Bp-6qVas.mjs";
import { t as createComponent } from "./astro-component_D398hF7X.mjs";
import { t as createAstro } from "./astro-global_Q8FhgS3w.mjs";
import { t as $$BaseLayout } from "./BaseLayout_Bwncmh8b.mjs";
import "./compiler_D-8-28NN.mjs";
import { i as colorPath } from "./url_DPhlWBuB.mjs";
import { n as plainExcerpt, t as pageTitle } from "./meta_BHXnqtiS.mjs";
import { r as getAllColors } from "./client_DyXLDCkM.mjs";
// src/pages/colors/index.astro
var colors_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.nvoos.cloud");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	Astro.response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
	const colors = await getAllColors(Astro.url);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": pageTitle("Colors"),
		"description": plainExcerpt("Browse products by color.")
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1>Colors</h1><ul>${colors.map((color) => renderTemplate`<li><a class="filter-chip"${addAttribute(colorPath(color.id, color.name), "href")}><span class="swatch"${addAttribute(`background:${color.hexCode || "#ccc"}`, "style")}></span>${color.name}</a></li>`)}</ul>` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/colors/index.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/colors/index.astro";
var $$url = "/colors/";
// \0virtual:astro:page:src/pages/colors/index@_@astro
var page = () => colors_exports;
export { page };
