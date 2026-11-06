import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { _ as addAttribute, d as renderSlot, h as maybeRenderHead, m as renderTemplate, s as renderComponent } from "./server_oTayxuEg.mjs";
import { t as createComponent } from "./astro-component_DkgBvFJz.mjs";
import { t as createAstro } from "./astro-global_CZt7TqFY.mjs";
import { t as $$BaseLayout } from "./BaseLayout_B1AMrDC3.mjs";
import "./compiler_CWCzah9E.mjs";
import { p as getProducts } from "./client_TtS43Z5n.mjs";
import { n as pageTitle, r as plainExcerpt } from "./meta_BE8QV8yn.mjs";
import { n as normalizeProductMedia } from "./normalize_Uj83xBMQ.mjs";
import { t as $$ProductGrid } from "./ProductGrid_8gCC8mbZ.mjs";
import { t as $$Pagination } from "./Pagination_rjbO-3f_.mjs";
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
