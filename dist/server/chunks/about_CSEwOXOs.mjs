import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { b as unescapeHTML, i as renderComponent, u as renderTemplate } from "./server_Bp-6qVas.mjs";
import { t as createComponent } from "./astro-component_D398hF7X.mjs";
import { t as $$BaseLayout } from "./BaseLayout_Bwncmh8b.mjs";
// src/pages/about.md
var about_exports = /* @__PURE__ */ __exportAll({
	Content: () => Content,
	compiledContent: () => compiledContent,
	default: () => Content,
	file: () => file,
	frontmatter: () => frontmatter,
	getHeadings: () => getHeadings,
	rawContent: () => rawContent,
	url: () => url
});
var html = () => "<h1 id=\"about\">About</h1>\n<p>The NV Store is an <strong>NV-authored, MIT-licensed headless storefront</strong> built\nwith Astro (Proposal 092). It renders server-side for search engines and\nhuman visitors alike, hydrates only small interactive islands, and binds to\none stable commerce contract.</p>\n<p>The storefront is backend-agnostic by construction: it speaks the\nPayload-shaped REST envelope served by the NV commerce contract, whether that\ncontract is served by WordPress today or by another backend tomorrow.</p>\n";
var frontmatter = {
	"layout": "../layouts/BaseLayout.astro",
	"title": "About",
	"description": "About the NV Store — an NV-authored, MIT-licensed Astro storefront."
};
var file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/about.md";
var url = "/about/";
function rawContent() {
	return "   \n                                   \n            \n                                                                                \n   \n\n# About\n\nThe NV Store is an **NV-authored, MIT-licensed headless storefront** built\nwith Astro (Proposal 092). It renders server-side for search engines and\nhuman visitors alike, hydrates only small interactive islands, and binds to\none stable commerce contract.\n\nThe storefront is backend-agnostic by construction: it speaks the\nPayload-shaped REST envelope served by the NV commerce contract, whether that\ncontract is served by WordPress today or by another backend tomorrow.\n";
}
async function compiledContent() {
	return await html();
}
function getHeadings() {
	return [{
		"depth": 1,
		"slug": "about",
		"text": "About"
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
// \0virtual:astro:page:src/pages/about@_@md
var page = () => about_exports;
export { page };
