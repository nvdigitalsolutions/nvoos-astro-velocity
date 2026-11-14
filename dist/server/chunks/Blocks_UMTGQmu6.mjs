import { h as maybeRenderHead, m as renderTemplate, s as renderComponent } from "./server_COcTL13r.mjs";
import { t as createComponent } from "./astro-component_DeSnnQc7.mjs";
import { t as createAstro } from "./astro-global_CY5q3Xj5.mjs";
import "./compiler_tBncm0O6.mjs";
import { d as $$PortableText, t as PORTABLE_TEXT_COMPONENTS } from "./components_BrWdxXEh.mjs";
// src/components/blocks/Blocks.astro
createAstro("https://astro.nvoos.cloud");
var $$Blocks = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Blocks;
	const { blocks } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="blocks" data-astro-cid-tpzcqkev>${renderComponent($$result, "PortableText", $$PortableText, {
		"value": blocks,
		"components": PORTABLE_TEXT_COMPONENTS,
		"data-astro-cid-tpzcqkev": true
	})}</div>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/blocks/Blocks.astro", void 0);
export { $$Blocks as t };
