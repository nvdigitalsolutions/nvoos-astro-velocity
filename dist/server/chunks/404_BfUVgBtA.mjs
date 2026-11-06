import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { h as maybeRenderHead, m as renderTemplate, s as renderComponent } from "./server_oTayxuEg.mjs";
import { t as createComponent } from "./astro-component_DkgBvFJz.mjs";
import { t as $$BaseLayout } from "./BaseLayout_B1AMrDC3.mjs";
import "./compiler_CWCzah9E.mjs";
import { n as pageTitle } from "./meta_BE8QV8yn.mjs";
// src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": pageTitle("Page not found") }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1>Page not found</h1><p>The page you are looking for does not exist.</p><p><a href="/" class="btn">Back to the store</a></p>` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/404.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/404.astro";
var $$url = "/404/";
// \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
export { page };
