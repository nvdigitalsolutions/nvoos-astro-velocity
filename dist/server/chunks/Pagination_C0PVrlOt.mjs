import { d as maybeRenderHead, p as addAttribute, u as renderTemplate } from "./server_Bp-6qVas.mjs";
import { t as createComponent } from "./astro-component_D398hF7X.mjs";
import { t as createAstro } from "./astro-global_Q8FhgS3w.mjs";
import "./compiler_D-8-28NN.mjs";
// src/components/Pagination.astro
createAstro("https://astro.nvoos.cloud");
var $$Pagination = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Pagination;
	const { page, totalPages, baseUrl } = Astro.props;
	const pageHref = (target) => {
		const url = new URL(baseUrl, "https://nvoos.invalid/");
		url.searchParams.set("page", String(target));
		return `${url.pathname}${url.search ? `?${url.search}` : ""}`;
	};
	return renderTemplate`${totalPages > 1 && renderTemplate`${maybeRenderHead($$result)}<nav class="pagination" aria-label="Pagination">${page > 1 && renderTemplate`<a class="btn btn--ghost"${addAttribute(pageHref(page - 1), "href")} rel="prev">Previous</a>`}<span aria-current="page">Page ${page} of ${totalPages}</span>${page < totalPages && renderTemplate`<a class="btn btn--ghost"${addAttribute(pageHref(page + 1), "href")} rel="next">Next</a>`}</nav>`}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/Pagination.astro", void 0);
export { $$Pagination as t };
