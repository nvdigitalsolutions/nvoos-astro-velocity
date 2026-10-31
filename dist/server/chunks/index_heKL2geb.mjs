import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as maybeRenderHead, i as renderComponent, p as addAttribute, u as renderTemplate } from "./server_Bp-6qVas.mjs";
import { t as createComponent } from "./astro-component_D398hF7X.mjs";
import { t as createAstro } from "./astro-global_Q8FhgS3w.mjs";
import { t as $$BaseLayout } from "./BaseLayout_Bwncmh8b.mjs";
import "./compiler_D-8-28NN.mjs";
import { t as absoluteUrl } from "./url_DPhlWBuB.mjs";
import { t as pageTitle } from "./meta_BHXnqtiS.mjs";
import { n as fixedImage, r as renderOrigin, t as $$ProductGrid } from "./ProductGrid_C2tsuFY7.mjs";
import { a as getGlobal, o as getProducts } from "./client_DyXLDCkM.mjs";
import { n as normalizeProductMedia, t as normalizeMediaUrl } from "./normalize_c6l1Y4uw.mjs";
import { n as organizationJsonLd, r as webSiteJsonLd } from "./jsonld_CZ8iFPOr.mjs";
// src/components/Banner.astro
createAstro("https://astro.nvoos.cloud");
var $$Banner = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Banner;
	const { banner } = Astro.props;
	const origin = renderOrigin(Astro.url, Astro.site);
	const image = banner?.image ? fixedImage(origin, banner.image, 1200, 300) : null;
	return renderTemplate`${banner && (banner.image || banner.promotion) && renderTemplate`${maybeRenderHead($$result)}<section class="banner" data-astro-cid-uljtwisc>${image && renderTemplate`<img${addAttribute(image.src, "src")}${addAttribute(image.srcset, "srcset")}${addAttribute(image.width, "width")}${addAttribute(image.height, "height")} alt="" loading="eager" decoding="async" data-astro-cid-uljtwisc>`}${banner.promotion?.active && renderTemplate`<p class="banner__promo" data-astro-cid-uljtwisc><a href="/promotions/" data-astro-cid-uljtwisc><strong data-astro-cid-uljtwisc>${banner.promotion.title}</strong></a></p>`}</section>`}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/Banner.astro", void 0);
// src/components/Carousel.astro
createAstro("https://astro.nvoos.cloud");
var $$Carousel = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Carousel;
	const carousel = await getGlobal("carousel", Astro.url);
	const origin = renderOrigin(Astro.url, Astro.site);
	const slides = (carousel?.carousel ?? []).map((slide) => ({
		...slide,
		image: slide.image ? fixedImage(origin, normalizeMediaUrl(slide.image), 560, 315) : null
	}));
	return renderTemplate`${slides.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section class="carousel" aria-label="Featured promotions" data-astro-cid-oulirr76>${slides.map((slide) => renderTemplate`<figure data-astro-cid-oulirr76>${slide.image && renderTemplate`<img${addAttribute(slide.image.src, "src")}${addAttribute(slide.image.srcset, "srcset")}${addAttribute(slide.image.width, "width")}${addAttribute(slide.image.height, "height")} alt="" loading="lazy" decoding="async" data-astro-cid-oulirr76>`}${slide.promotion && renderTemplate`<figcaption data-astro-cid-oulirr76>${slide.promotion.title}</figcaption>`}</figure>`)}</section>`}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/Carousel.astro", void 0);
// src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
createAstro("https://astro.nvoos.cloud");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	Astro.response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
	const [banner, newest, topRated] = await Promise.all([
		getGlobal("banner", Astro.url),
		getProducts(Astro.url, {
			page: 1,
			limit: 50,
			sort: "date"
		}),
		getProducts(Astro.url, {
			page: 1,
			limit: 50,
			sort: "-rating"
		})
	]);
	const normalizeList = (list) => list.map(normalizeProductMedia);
	const featured = normalizeList(newest.docs.filter((p) => p.isFeatured).slice(0, 8));
	const bestsellers = normalizeList(topRated.docs.filter((p) => p.isBestseller).slice(0, 8));
	const fallback = normalizeList(newest.docs.slice(0, 8));
	const site = Astro.site ?? new URL("https://store.nvoos.cloud");
	const bannerData = banner;
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": pageTitle(),
		"description": "NV Store — the NV-authored headless storefront.",
		"canonical": absoluteUrl(site, "/"),
		"jsonld": [organizationJsonLd("NV Store", site), webSiteJsonLd("NV Store", site)]
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Banner", $$Banner, { "banner": bannerData })}${renderComponent($$result, "Carousel", $$Carousel, {})}${maybeRenderHead($$result)}<section><h2>Featured</h2>${renderComponent($$result, "ProductGrid", $$ProductGrid, { "products": featured.length > 0 ? featured : fallback })}</section><section><h2>Bestsellers</h2>${renderComponent($$result, "ProductGrid", $$ProductGrid, { "products": bestsellers.length > 0 ? bestsellers : fallback })}</section>` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/index.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/index.astro";
// \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
export { page };
