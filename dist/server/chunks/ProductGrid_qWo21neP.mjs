import { h as maybeRenderHead, m as renderTemplate, s as renderComponent } from "./server_COcTL13r.mjs";
import { t as createComponent } from "./astro-component_DeSnnQc7.mjs";
import { t as createAstro } from "./astro-global_CY5q3Xj5.mjs";
import "./compiler_tBncm0O6.mjs";
import { t as $$ProductCard } from "./ProductCard_D3Ry8Isb.mjs";
// src/components/ProductGrid.astro
createAstro("https://astro.nvoos.cloud");
var $$ProductGrid = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductGrid;
	const { products } = Astro.props;
	return renderTemplate`${products.length > 0 ? renderTemplate`${maybeRenderHead($$result)}<div class="product-grid">${products.map((product) => renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, { "product": product })}`)}</div>` : renderTemplate`<p>No products found.</p>`}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ProductGrid.astro", void 0);
export { $$ProductGrid as t };
