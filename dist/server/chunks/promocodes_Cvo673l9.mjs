import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Bp-6qVas.mjs";
import { t as createComponent } from "./astro-component_D398hF7X.mjs";
import { t as createAstro } from "./astro-global_Q8FhgS3w.mjs";
import { t as $$BaseLayout } from "./BaseLayout_Bwncmh8b.mjs";
import "./compiler_D-8-28NN.mjs";
import { n as plainExcerpt, t as pageTitle } from "./meta_BHXnqtiS.mjs";
import { s as getPromocodes } from "./client_DyXLDCkM.mjs";
// src/pages/promocodes.astro
var promocodes_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Promocodes,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.nvoos.cloud");
var $$Promocodes = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Promocodes;
	Astro.response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
	const { docs: promocodes } = await getPromocodes(Astro.url, {
		page: 1,
		limit: 50,
		sort: "date"
	});
	const active = promocodes.filter((promocode) => promocode.isActive);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": pageTitle("Promo codes"),
		"description": plainExcerpt("Active promo codes.")
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1>Promo codes</h1>${active.length === 0 ? renderTemplate`<p>No active promo codes right now.</p>` : renderTemplate`<ul>${active.map((promocode) => renderTemplate`<li><strong>${promocode.code}</strong> — ${promocode.discount}% off${promocode.expiresAt ? ` until ${promocode.expiresAt}` : ""}</li>`)}</ul>`}` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/promocodes.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/promocodes.astro";
var $$url = "/promocodes/";
// \0virtual:astro:page:src/pages/promocodes@_@astro
var page = () => promocodes_exports;
export { page };
