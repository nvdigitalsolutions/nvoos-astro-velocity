import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as maybeRenderHead, i as renderComponent, s as renderSlot, u as renderTemplate } from "./server_Bp-6qVas.mjs";
import { t as createComponent } from "./astro-component_D398hF7X.mjs";
import { t as createAstro } from "./astro-global_Q8FhgS3w.mjs";
import { t as $$BaseLayout } from "./BaseLayout_Bwncmh8b.mjs";
import "./compiler_D-8-28NN.mjs";
import { i as colorPath, t as absoluteUrl } from "./url_DPhlWBuB.mjs";
import { n as plainExcerpt, t as pageTitle } from "./meta_BHXnqtiS.mjs";
import { t as $$ProductGrid } from "./ProductGrid_C2tsuFY7.mjs";
import { t as $$Pagination } from "./Pagination_C0PVrlOt.mjs";
import { o as getProducts, r as getAllColors } from "./client_DyXLDCkM.mjs";
import { n as normalizeProductMedia } from "./normalize_c6l1Y4uw.mjs";
import { t as breadcrumbJsonLd } from "./jsonld_CZ8iFPOr.mjs";
// src/pages/colors/[id]/[...slug].astro
var ____slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Component,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.nvoos.cloud");
var $$Component = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Component;
	Astro.response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
	const colorId = Number(Astro.params.id ?? 0);
	if (!Number.isInteger(colorId) || colorId <= 0) return new Response("Not found", { status: 404 });
	const color = (await getAllColors(Astro.url)).find((item) => item.id === colorId);
	if (!color) return new Response("Color not found", { status: 404 });
	const url = Astro.url;
	const sort = url.searchParams.get("sort") ?? "date";
	const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
	const where = { colors: { equals: colorId } };
	const data = await getProducts(Astro.url, {
		page,
		limit: 24,
		where,
		sort
	});
	const products = data.docs.map(normalizeProductMedia);
	const hasFilters = page > 1;
	const canonical = absoluteUrl(Astro.site ?? new URL("https://store.nvoos.cloud"), colorPath(color.id, color.name));
	const baseHref = `${url.pathname}?${url.searchParams.toString()}`;
	const site = Astro.site ?? new URL("https://store.nvoos.cloud");
	const jsonld = [breadcrumbJsonLd([{
		name: "Home",
		url: absoluteUrl(site, "/")
	}, {
		name: color.name,
		url: canonical
	}])];
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": pageTitle(color.name),
		"description": plainExcerpt(`Browse all ${color.name} products.`),
		"canonical": canonical,
		"jsonld": jsonld
	}, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["head"], renderTemplate`${hasFilters && renderTemplate`<meta name="robots" content="noindex, follow">`}`)}${maybeRenderHead($$result)}<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> ${" / "} <span>${color.name}</span></nav><h1>${color.name}</h1>${renderComponent($$result, "ProductGrid", $$ProductGrid, { "products": products })}${renderComponent($$result, "Pagination", $$Pagination, {
		"page": page,
		"totalPages": data.totalPages,
		"baseUrl": baseHref
	})}` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/colors/[id]/[...slug].astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/colors/[id]/[...slug].astro";
var $$url = "/colors/[id]/[...slug]/";
// \0virtual:astro:page:src/pages/colors/[id]/[...slug]@_@astro
var page = () => ____slug__exports;
export { page };
