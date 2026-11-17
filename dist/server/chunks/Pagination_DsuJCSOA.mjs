import { h as maybeRenderHead, m as renderTemplate, x as addAttribute } from "./server_COcTL13r.mjs";
import { t as createComponent } from "./astro-component_DeSnnQc7.mjs";
import { t as createAstro } from "./astro-global_CY5q3Xj5.mjs";
import "./compiler_tBncm0O6.mjs";
// src/components/Pagination.astro
createAstro("https://astro.nvoos.cloud");
var $$Pagination = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Pagination;
	const { page, totalPages, baseUrl } = Astro.props;
	const pageHref = (target) => {
		const url = new URL(baseUrl, "https://nvoos.invalid/");
		url.searchParams.set("page", String(target));
		return `${url.pathname}${url.search}`;
	};
	return renderTemplate`${totalPages > 1 && renderTemplate`${maybeRenderHead($$result)}<nav class="pagination" aria-label="Pagination">${page > 1 && renderTemplate`<a class="btn btn--ghost"${addAttribute(pageHref(page - 1), "href")} rel="prev">Previous</a>`}<span aria-current="page">Page ${page} of ${totalPages}</span>${page < totalPages && renderTemplate`<a class="btn btn--ghost"${addAttribute(pageHref(page + 1), "href")} rel="next">Next</a>`}</nav>`}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/Pagination.astro", void 0);
export { $$Pagination as t };
