import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { d as renderSlot, h as maybeRenderHead, m as renderTemplate, s as renderComponent, x as addAttribute } from "./server_COcTL13r.mjs";
import { t as createComponent } from "./astro-component_DeSnnQc7.mjs";
import { t as createAstro } from "./astro-global_CY5q3Xj5.mjs";
import "./compiler_tBncm0O6.mjs";
import { m as renderScript, t as $$BaseLayout } from "./BaseLayout_Cztu7urN.mjs";
import { t as $$ProductGrid } from "./ProductGrid_qWo21neP.mjs";
import { t as $$Pagination } from "./Pagination_DsuJCSOA.mjs";
import { i as getAllColors, m as getProducts, n as getAllBrands, r as getAllCategories } from "./client_DhvHaxQG.mjs";
import { n as normalizeProductMedia } from "./normalize_3P-o4l4k.mjs";
import { r as categoryPath, t as absoluteUrl } from "./url_C-9WkiDw.mjs";
import { r as collectionPageJsonLd } from "./jsonld_kjDNXr83.mjs";
import { n as pageTitle, r as plainExcerpt } from "./meta_BE8QV8yn.mjs";
// src/pages/categories/[id]/[...slug].astro
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
	const categoryId = Number(Astro.params.id ?? 0);
	if (!Number.isInteger(categoryId) || categoryId <= 0) return new Response("Not found", { status: 404 });
	const category = (await getAllCategories(Astro.url)).find((item) => item.id === categoryId);
	if (!category) return new Response("Category not found", { status: 404 });
	const colors = await getAllColors(Astro.url);
	const brands = await getAllBrands(Astro.url);
	const url = Astro.url;
	const selectedColors = url.searchParams.getAll("color").map(Number).filter(Boolean);
	const selectedBrand = Number(url.searchParams.get("brand")) || null;
	const sort = url.searchParams.get("sort") ?? "date";
	const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
	const q = url.searchParams.get("q")?.trim() ?? "";
	const where = { category: { equals: categoryId } };
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
	const hasFilters = selectedColors.length > 0 || selectedBrand !== null || page > 1 || q !== "";
	const canonical = absoluteUrl(Astro.site ?? new URL("https://store.nvoos.cloud"), categoryPath(category.id, category.name));
	const baseHref = `${url.pathname}?${url.searchParams.toString()}`;
	const site = Astro.site ?? new URL("https://store.nvoos.cloud");
	const jsonld = [collectionPageJsonLd({
		name: category.name,
		url: canonical,
		breadcrumb: [{
			name: "Home",
			url: absoluteUrl(site, "/")
		}]
	})];
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": pageTitle(category.name, q ? `Search: ${q}` : void 0),
		"description": plainExcerpt(`Browse ${category.name} — ${category.productsCount} products.`),
		"canonical": canonical,
		"jsonld": jsonld
	}, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["head"], renderTemplate`${hasFilters && renderTemplate`<meta name="robots" content="noindex, follow">`}`)}${maybeRenderHead($$result)}<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> ${" / "} <span>${category.name}</span></nav><h1>${category.name}</h1><div class="plp"><aside class="filters" aria-label="Filters"><form method="get"${addAttribute(url.pathname, "action")}><div class="field"><label for="plp-brand">Brand</label><select name="brand" id="plp-brand" data-auto-submit><option value="">All brands</option>${brands.map((brand) => renderTemplate`<option${addAttribute(brand.id, "value")}${addAttribute(selectedBrand === brand.id, "selected")}>${brand.name}</option>`)}</select></div><fieldset class="field"><legend>Filter by colour</legend>${colors.map((color) => renderTemplate`<label class="filter-chip"><input type="checkbox" name="color"${addAttribute(color.id, "value")}${addAttribute(selectedColors.includes(color.id), "checked")} data-auto-submit><span class="swatch"${addAttribute(`background:${color.hexCode || "#ccc"}`, "style")}></span>${color.name}</label>`)}</fieldset><div class="field"><label for="plp-sort">Sort</label><select name="sort" id="plp-sort" data-auto-submit><option value="date"${addAttribute(sort === "date", "selected")}>Newest</option><option value="-price"${addAttribute(sort === "-price", "selected")}>Price: low to high</option><option value="price"${addAttribute(sort === "price", "selected")}>Price: high to low</option><option value="-rating"${addAttribute(sort === "-rating", "selected")}>Top rated</option><option value="name"${addAttribute(sort === "name", "selected")}>Name A–Z</option></select></div><noscript><button type="submit" class="btn">Apply</button></noscript></form></aside><section>${renderComponent($$result, "ProductGrid", $$ProductGrid, { "products": products })}${renderComponent($$result, "Pagination", $$Pagination, {
		"page": page,
		"totalPages": data.totalPages,
		"baseUrl": baseHref
	})}</section></div>` })}${renderScript($$result, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/categories/[id]/[...slug].astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/categories/[id]/[...slug].astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/categories/[id]/[...slug].astro";
var $$url = "/categories/[id]/[...slug]/";
// \0virtual:astro:page:src/pages/categories/[id]/[...slug]@_@astro
var page = () => ____slug__exports;
export { page };
