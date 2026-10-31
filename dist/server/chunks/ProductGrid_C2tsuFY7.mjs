import { d as maybeRenderHead, i as renderComponent, p as addAttribute, u as renderTemplate } from "./server_Bp-6qVas.mjs";
import { t as createComponent } from "./astro-component_D398hF7X.mjs";
import { t as createAstro } from "./astro-global_Q8FhgS3w.mjs";
import "./compiler_D-8-28NN.mjs";
import { a as productPath } from "./url_DPhlWBuB.mjs";
import { t as formatPrice } from "./money_DMMYxaSG.mjs";
// src/lib/images.ts
function endpointHref(origin, src, width, format, quality) {
	const params = new URLSearchParams();
	params.set("href", new URL(src, origin).toString());
	params.set("w", String(width));
	params.set("f", format);
	if (quality) params.set("q", String(quality));
	return `/_image/?${params.toString()}`;
}
/**
* Build a responsive, runtime-optimized image descriptor.
*
* `origin` is the render origin (Astro.site for prerendered pages,
* Astro.url.origin for SSR) — the endpoint fetches the href server-side
* through the same-origin BFF /media proxy.
*/
function responsiveImage(origin, src, options) {
	const { width, height, widths = [width], sizes = `${width}px`, format = "webp", quality } = options;
	const unique = [...new Set(widths)].sort((a, b) => a - b);
	const srcset = unique.map((w) => `${endpointHref(origin, src, w, format, quality)} ${w}w`).join(", ");
	return {
		src: endpointHref(origin, src, unique[0], format, quality),
		srcset,
		sizes,
		width,
		height
	};
}
/** Fixed-size optimized image (thumbnails, banner). */
function fixedImage(origin, src, width, height, format = "webp") {
	return responsiveImage(origin, src, {
		width,
		height,
		widths: [width],
		format
	});
}
/** The render origin: configured site first, request origin fallback. */
function renderOrigin(url, site) {
	return site ? site.origin : url ? url.origin : "http://localhost:4321";
}
// src/components/ProductCard.astro
createAstro("https://astro.nvoos.cloud");
var $$ProductCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductCard;
	const { product } = Astro.props;
	const href = productPath(product.id, product.name);
	const hasPromo = product.promotion !== null && product.promotion.active && product.oldPrice !== null && product.oldPrice > product.price;
	const origin = renderOrigin(Astro.url, Astro.site);
	const image = product.image ? responsiveImage(origin, product.image, {
		width: 400,
		height: 500,
		widths: [400, 800],
		sizes: "(min-width: 800px) 400px, 100vw"
	}) : null;
	return renderTemplate`${maybeRenderHead($$result)}<a class="product-card"${addAttribute(href, "href")}><div class="product-card__media">${hasPromo && renderTemplate`<span class="promo-badge">Sale</span>`}${image && renderTemplate`<img${addAttribute(image.src, "src")}${addAttribute(image.srcset, "srcset")}${addAttribute(image.sizes, "sizes")}${addAttribute(image.width, "width")}${addAttribute(image.height, "height")}${addAttribute(product.name, "alt")} loading="lazy" decoding="async">`}</div><span class="product-card__name">${product.name}</span><span class="product-card__price">${formatPrice(product.price)}${product.oldPrice !== null && product.oldPrice > product.price && renderTemplate`<span class="product-card__old-price">${formatPrice(product.oldPrice)}</span>`}</span></a>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ProductCard.astro", void 0);
// src/components/ProductGrid.astro
createAstro("https://astro.nvoos.cloud");
var $$ProductGrid = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductGrid;
	const { products } = Astro.props;
	return renderTemplate`${products.length > 0 ? renderTemplate`${maybeRenderHead($$result)}<div class="product-grid">${products.map((product) => renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, { "product": product })}`)}</div>` : renderTemplate`<p>No products found.</p>`}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ProductGrid.astro", void 0);
export { fixedImage as n, renderOrigin as r, $$ProductGrid as t };
