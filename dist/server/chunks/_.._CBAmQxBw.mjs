import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { d as renderSlot, h as maybeRenderHead, m as renderTemplate, s as renderComponent } from "./server_oTayxuEg.mjs";
import { t as createComponent } from "./astro-component_DkgBvFJz.mjs";
import { t as createAstro } from "./astro-global_CZt7TqFY.mjs";
import { t as $$BaseLayout } from "./BaseLayout_B1AMrDC3.mjs";
import "./compiler_CWCzah9E.mjs";
import { p as getProducts, t as getAllBrands } from "./client_TtS43Z5n.mjs";
import { n as brandPath, t as absoluteUrl } from "./url_C-9WkiDw.mjs";
import { n as pageTitle, r as plainExcerpt } from "./meta_BE8QV8yn.mjs";
import { n as normalizeProductMedia } from "./normalize_Uj83xBMQ.mjs";
import { t as $$ProductGrid } from "./ProductGrid_8gCC8mbZ.mjs";
import { r as collectionPageJsonLd } from "./jsonld_kjDNXr83.mjs";
import { t as $$Pagination } from "./Pagination_rjbO-3f_.mjs";
// src/pages/brands/[id]/[...slug].astro
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
	const brandId = Number(Astro.params.id ?? 0);
	if (!Number.isInteger(brandId) || brandId <= 0) return new Response("Not found", { status: 404 });
	const brand = (await getAllBrands(Astro.url)).find((item) => item.id === brandId);
	if (!brand) return new Response("Brand not found", { status: 404 });
	const url = Astro.url;
	const sort = url.searchParams.get("sort") ?? "date";
	const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
	const where = { brand: { equals: brandId } };
	const data = await getProducts(Astro.url, {
		page,
		limit: 24,
		where,
		sort
	});
	const products = data.docs.map(normalizeProductMedia);
	const hasFilters = page > 1;
	const canonical = absoluteUrl(Astro.site ?? new URL("https://store.nvoos.cloud"), brandPath(brand.id, brand.name));
	const baseHref = `${url.pathname}?${url.searchParams.toString()}`;
	const site = Astro.site ?? new URL("https://store.nvoos.cloud");
	const jsonld = [collectionPageJsonLd({
		name: brand.name,
		url: canonical,
		breadcrumb: [{
			name: "Home",
			url: absoluteUrl(site, "/")
		}]
	})];
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": pageTitle(brand.name),
		"description": plainExcerpt(`Browse all ${brand.name} products.`),
		"canonical": canonical,
		"jsonld": jsonld
	}, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["head"], renderTemplate`${hasFilters && renderTemplate`<meta name="robots" content="noindex, follow">`}`)}${maybeRenderHead($$result)}<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> ${" / "} <span>${brand.name}</span></nav><h1>${brand.name}</h1>${renderComponent($$result, "ProductGrid", $$ProductGrid, { "products": products })}${renderComponent($$result, "Pagination", $$Pagination, {
		"page": page,
		"totalPages": data.totalPages,
		"baseUrl": baseHref
	})}` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/brands/[id]/[...slug].astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/brands/[id]/[...slug].astro";
var $$url = "/brands/[id]/[...slug]/";
// \0virtual:astro:page:src/pages/brands/[id]/[...slug]@_@astro
var page = () => ____slug__exports;
export { page };
