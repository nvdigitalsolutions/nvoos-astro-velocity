import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { _ as addAttribute, d as renderSlot, h as maybeRenderHead, m as renderTemplate, s as renderComponent } from "./server_oTayxuEg.mjs";
import { t as createComponent } from "./astro-component_DkgBvFJz.mjs";
import { t as createAstro } from "./astro-global_CZt7TqFY.mjs";
import { t as $$BaseLayout } from "./BaseLayout_B1AMrDC3.mjs";
import "./compiler_CWCzah9E.mjs";
import { _ as getThemePolicy, n as getAllCategories, p as getProducts, r as getAllColors, t as getAllBrands } from "./client_TtS43Z5n.mjs";
import { t as absoluteUrl } from "./url_C-9WkiDw.mjs";
import { n as pageTitle, r as plainExcerpt } from "./meta_BE8QV8yn.mjs";
import { n as normalizeProductMedia } from "./normalize_Uj83xBMQ.mjs";
import { t as $$ProductGrid } from "./ProductGrid_8gCC8mbZ.mjs";
import { r as collectionPageJsonLd } from "./jsonld_kjDNXr83.mjs";
import { t as $$Pagination } from "./Pagination_rjbO-3f_.mjs";
// src/pages/products/index.astro
var products_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.nvoos.cloud");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	Astro.response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
	const policy = await getThemePolicy(Astro.url);
	if (Astro.cache.enabled) Astro.cache.set({
		maxAge: 300,
		swr: 60,
		tags: ["products"],
		etag: policy.updatedAt
	});
	const categories = await getAllCategories(Astro.url);
	const colors = await getAllColors(Astro.url);
	const brands = await getAllBrands(Astro.url);
	const url = Astro.url;
	const selectedCategory = Number(url.searchParams.get("category")) || null;
	const selectedColors = url.searchParams.getAll("color").map(Number).filter(Boolean);
	const selectedBrand = Number(url.searchParams.get("brand")) || null;
	const sort = url.searchParams.get("sort") ?? "date";
	const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
	const q = url.searchParams.get("q")?.trim() ?? "";
	const where = {};
	if (selectedCategory) where.category = { equals: selectedCategory };
	if (selectedColors.length > 0) where.colors = { in: selectedColors };
	if (selectedBrand) where.brand = { equals: selectedBrand };
	if (q) where.name = { like: q };
	const data = await getProducts(Astro.url, {
		page,
		limit: 24,
		where,
		sort
	});
	const products = data.docs.map(normalizeProductMedia);
	const hasFilters = selectedCategory !== null || selectedColors.length > 0 || selectedBrand !== null || page > 1 || q !== "";
	const site = Astro.site ?? new URL("https://store.nvoos.cloud");
	const canonical = absoluteUrl(site, "/products/");
	const baseHref = `${url.pathname}?${url.searchParams.toString()}`;
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": pageTitle("All products", q ? `Search: ${q}` : void 0),
		"description": plainExcerpt("Browse the full product catalog."),
		"canonical": canonical,
		"jsonld": [collectionPageJsonLd({
			name: "All products",
			url: canonical,
			breadcrumb: [{
				name: "Home",
				url: absoluteUrl(site, "/")
			}]
		})]
	}, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["head"], renderTemplate`${hasFilters && renderTemplate`<meta name="robots" content="noindex, follow">`}`)}${maybeRenderHead($$result)}<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> ${" / "} <span>Products</span></nav><h1>All products</h1><div class="plp"><aside class="filters" aria-label="Filters"><form method="get"${addAttribute(url.pathname, "action")}><div class="field"><label for="plp-category">Category</label><select name="category" id="plp-category"><option value="">All categories</option>${categories.map((category) => renderTemplate`<option${addAttribute(category.id, "value")}${addAttribute(selectedCategory === category.id, "selected")}>${category.name}</option>`)}</select></div><div class="field"><label for="plp-brand">Brand</label><select name="brand" id="plp-brand"><option value="">All brands</option>${brands.map((brand) => renderTemplate`<option${addAttribute(brand.id, "value")}${addAttribute(selectedBrand === brand.id, "selected")}>${brand.name}</option>`)}</select></div><fieldset class="field"><legend>Filter by colour</legend>${colors.map((color) => renderTemplate`<label class="filter-chip"><input type="checkbox" name="color"${addAttribute(color.id, "value")}${addAttribute(selectedColors.includes(color.id), "checked")}><span class="swatch"${addAttribute(`background:${color.hexCode || "#ccc"}`, "style")}></span>${color.name}</label>`)}</fieldset><div class="field"><label for="plp-sort">Sort</label><select name="sort" id="plp-sort"><option value="date"${addAttribute(sort === "date", "selected")}>Newest</option><option value="-price"${addAttribute(sort === "-price", "selected")}>Price: low to high</option><option value="price"${addAttribute(sort === "price", "selected")}>Price: high to low</option><option value="-rating"${addAttribute(sort === "-rating", "selected")}>Top rated</option><option value="name"${addAttribute(sort === "name", "selected")}>Name A–Z</option></select></div><div class="field"><label for="plp-q">Search</label><input type="search" name="q" id="plp-q"${addAttribute(q, "value")}></div><button type="submit" class="btn">Apply</button></form></aside><section>${renderComponent($$result, "ProductGrid", $$ProductGrid, { "products": products })}${renderComponent($$result, "Pagination", $$Pagination, {
		"page": page,
		"totalPages": data.totalPages,
		"baseUrl": baseHref
	})}</section></div>` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/products/index.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/products/index.astro";
var $$url = "/products/";
// \0virtual:astro:page:src/pages/products/index@_@astro
var page = () => products_exports;
export { page };
