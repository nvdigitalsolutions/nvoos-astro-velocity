import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { T as unescapeHTML, m as renderTemplate, s as renderComponent } from "./server_oTayxuEg.mjs";
import { t as createComponent } from "./astro-component_DkgBvFJz.mjs";
import { t as $$BaseLayout } from "./BaseLayout_B1AMrDC3.mjs";
// src/pages/terms.md
var terms_exports = /* @__PURE__ */ __exportAll({
	Content: () => Content,
	compiledContent: () => compiledContent,
	default: () => Content,
	file: () => file,
	frontmatter: () => frontmatter,
	getHeadings: () => getHeadings,
	rawContent: () => rawContent,
	url: () => url
});
var html = () => "<h1 id=\"terms\">Terms</h1>\n<p>This storefront is a demonstration surface for the NV commerce contract.\nProducts, prices and promotions shown here are illustrative. No payment is\ncollected by this storefront in its current version.</p>\n";
var frontmatter = {
	"layout": "../layouts/BaseLayout.astro",
	"title": "Terms",
	"description": "Terms of use for the NV Store."
};
var file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/terms.md";
var url = "/terms/";
function rawContent() {
	return "   \n                                   \n            \n                                           \n   \n\n# Terms\n\nThis storefront is a demonstration surface for the NV commerce contract.\nProducts, prices and promotions shown here are illustrative. No payment is\ncollected by this storefront in its current version.\n";
}
async function compiledContent() {
	return await html();
}
function getHeadings() {
	return [{
		"depth": 1,
		"slug": "terms",
		"text": "Terms"
	}];
}
var Content = createComponent((result, _props, slots) => {
	const { layout, ...content } = frontmatter;
	content.file = file;
	content.url = url;
	return renderTemplate`${renderComponent(result, "Layout", $$BaseLayout, {
		file,
		url,
		content,
		frontmatter: content,
		headings: getHeadings(),
		rawContent,
		compiledContent,
		"server:root": true
	}, { "default": () => renderTemplate`${unescapeHTML(html())}` })}`;
});
// \0virtual:astro:page:src/pages/terms@_@md
var page = () => terms_exports;
export { page };
