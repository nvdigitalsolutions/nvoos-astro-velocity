import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { b as unescapeHTML, d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Bp-6qVas.mjs";
import { t as createComponent } from "./astro-component_D398hF7X.mjs";
import { t as createAstro } from "./astro-global_Q8FhgS3w.mjs";
import { t as $$BaseLayout } from "./BaseLayout_Bwncmh8b.mjs";
import "./compiler_D-8-28NN.mjs";
import { n as plainExcerpt, t as pageTitle } from "./meta_BHXnqtiS.mjs";
import { c as getPromotions } from "./client_DyXLDCkM.mjs";
import { r as sanitizeDescription } from "./normalize_c6l1Y4uw.mjs";
// src/pages/promotions.astro
var promotions_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Promotions,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.nvoos.cloud");
var $$Promotions = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Promotions;
	Astro.response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
	const { docs: promotions } = await getPromotions(Astro.url, {
		page: 1,
		limit: 50,
		sort: "date"
	});
	const active = promotions.filter((promotion) => promotion.active);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": pageTitle("Promotions"),
		"description": plainExcerpt("Current promotions and special offers.")
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1>Promotions</h1>${active.length === 0 ? renderTemplate`<p>No active promotions right now — check back soon.</p>` : renderTemplate`<ul>${active.map((promotion) => renderTemplate`<li><h2>${promotion.title}</h2><div>${unescapeHTML(sanitizeDescription(promotion.description))}</div></li>`)}</ul>`}` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/promotions.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/promotions.astro";
var $$url = "/promotions/";
// \0virtual:astro:page:src/pages/promotions@_@astro
var page = () => promotions_exports;
export { page };
