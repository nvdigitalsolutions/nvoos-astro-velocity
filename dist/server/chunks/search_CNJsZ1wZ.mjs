import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as maybeRenderHead, i as renderComponent, p as addAttribute, s as renderSlot, u as renderTemplate } from "./server_Bp-6qVas.mjs";
import { t as createComponent } from "./astro-component_D398hF7X.mjs";
import { t as createAstro } from "./astro-global_Q8FhgS3w.mjs";
import { t as $$BaseLayout } from "./BaseLayout_Bwncmh8b.mjs";
import "./compiler_D-8-28NN.mjs";
import { n as plainExcerpt, t as pageTitle } from "./meta_BHXnqtiS.mjs";
import { t as $$ProductGrid } from "./ProductGrid_C2tsuFY7.mjs";
import { t as $$Pagination } from "./Pagination_C0PVrlOt.mjs";
import { o as getProducts } from "./client_DyXLDCkM.mjs";
import { n as normalizeProductMedia } from "./normalize_c6l1Y4uw.mjs";
// src/pages/search.astro
var search_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Search,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.nvoos.cloud");
var $$Search = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Search;
	Astro.response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
	const url = Astro.url;
	const q = url.searchParams.get("q")?.trim() ?? "";
	const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
	const sort = url.searchParams.get("sort") ?? "date";
	const where = q ? { name: { like: q } } : {};
	const data = q ? await getProducts(Astro.url, {
		page,
		limit: 24,
		where,
		sort
	}) : {
		docs: [],
		totalDocs: 0,
		limit: 24,
		totalPages: 1,
		page: 1,
		hasNextPage: false,
		hasPrevPage: false
	};
	const products = data.docs.map(normalizeProductMedia);
	const baseHref = `${url.pathname}?${url.searchParams.toString()}`;
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": pageTitle(q ? `Search: ${q}` : "Search"),
		"description": plainExcerpt("Search the catalog.")
	}, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["head"], renderTemplate`<meta name="robots" content="noindex, follow">`)}${maybeRenderHead($$result)}<h1>Search</h1><form method="get" action="/search/" class="field"><label for="q" class="sr-only">Search</label><input id="q" type="search" name="q"${addAttribute(q, "value")} placeholder="Search products…"><button type="submit" class="btn">Search</button></form>${q && renderTemplate`<p>${data.totalDocs} result${data.totalDocs === 1 ? "" : "s"} for “${q}”.</p>`}${renderComponent($$result, "ProductGrid", $$ProductGrid, { "products": products })}${renderComponent($$result, "Pagination", $$Pagination, {
		"page": page,
		"totalPages": data.totalPages,
		"baseUrl": baseHref
	})}` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/search.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/search.astro";
var $$url = "/search/";
// \0virtual:astro:page:src/pages/search@_@astro
var page = () => search_exports;
export { page };
