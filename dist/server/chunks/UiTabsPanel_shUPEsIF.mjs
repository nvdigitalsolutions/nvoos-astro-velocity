import { c as Fragment, d as renderSlot, h as maybeRenderHead, m as renderTemplate, s as renderComponent, t as spreadAttributes, x as addAttribute } from "./server_COcTL13r.mjs";
import { t as createComponent } from "./astro-component_DeSnnQc7.mjs";
import { t as createAstro } from "./astro-global_CY5q3Xj5.mjs";
import { m as renderScript } from "./BaseLayout_Cztu7urN.mjs";
import "./compiler_tBncm0O6.mjs";
// src/components/ui/UiAccordion.astro
createAstro("https://astro.nvoos.cloud");
var $$UiAccordion = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$UiAccordion;
	const { class: className, ...rest } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<ul${addAttribute(["ui-accordion", className], "class:list")}${spreadAttributes(rest)} data-astro-cid-kw7umhya>${renderSlot($$result, $$slots["default"])}</ul>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ui/UiAccordion.astro", void 0);
// src/components/ui/UiAccordionItem.astro
createAstro("https://astro.nvoos.cloud");
var $$UiAccordionItem = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$UiAccordionItem;
	const { class: className, title, name, headingLevel = "h3", variant = "default", open = false, ...rest } = Astro.props;
	const HeadingTag = headingLevel;
	return renderTemplate`${maybeRenderHead($$result)}<li${addAttribute(["ui-accordion-item", className], "class:list")}${spreadAttributes(rest)} data-astro-cid-6v2tbcqj><details${addAttribute(["ui-accordion-wrapper", `ui-accordion-variant-${variant}`], "class:list")}${addAttribute(name, "name")}${spreadAttributes(open ? { open } : {})} data-astro-cid-6v2tbcqj><summary class="ui-accordion-title" data-astro-cid-6v2tbcqj>${renderComponent($$result, "HeadingTag", HeadingTag, {
		"class": "ui-accordion-heading",
		"data-astro-cid-6v2tbcqj": true
	}, { "default": ($$result) => renderTemplate`${variant === "chevron" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${title}<span class="ui-accordion-icon-chevron" data-astro-cid-6v2tbcqj><svg aria-hidden="true" width="12" height="8" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-6v2tbcqj><path d="M1.4 1.6L6 6.2l4.6-4.6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-6v2tbcqj></path></svg></span>` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<span class="ui-accordion-icon-plus" data-astro-cid-6v2tbcqj><svg aria-hidden="true" width="20" height="2" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-6v2tbcqj><path fill="currentColor" d="M20 .5v1H0v-1z" data-astro-cid-6v2tbcqj></path></svg><svg width="2" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-6v2tbcqj><path fill="currentColor" d="M1.5 20h-1V0h1z" data-astro-cid-6v2tbcqj></path></svg></span>${title}` })}`}` })}</summary><div class="ui-accordion-content" data-astro-cid-6v2tbcqj>${renderSlot($$result, $$slots["default"])}</div></details></li>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ui/UiAccordionItem.astro", void 0);
// src/components/ui/UiTabs.astro
createAstro("https://astro.nvoos.cloud");
var $$UiTabs = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$UiTabs;
	const { class: className, ...rest } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["ui-tabs", className], "class:list")}${spreadAttributes(rest)}>${renderSlot($$result, $$slots["default"])}</div>${renderScript($$result, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ui/UiTabs.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ui/UiTabs.astro", void 0);
// src/components/ui/UiTabsList.astro
createAstro("https://astro.nvoos.cloud");
var $$UiTabsList = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$UiTabsList;
	const { class: className, ...rest } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["ui-tabs-list", className], "class:list")} role="tablist"${spreadAttributes(rest)} data-astro-cid-kafw6sck>${renderSlot($$result, $$slots["default"])}</div>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ui/UiTabsList.astro", void 0);
// src/components/ui/UiTabsTab.astro
createAstro("https://astro.nvoos.cloud");
var $$UiTabsTab = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$UiTabsTab;
	const { class: className, id, controls, selected = false, ...rest } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<button${addAttribute(id, "id")} role="tab"${addAttribute(["ui-tabs-tab", className], "class:list")}${addAttribute(controls, "aria-controls")}${addAttribute(selected, "aria-selected")}${addAttribute(selected ? 0 : -1, "tabindex")}${spreadAttributes(rest)} data-astro-cid-btentysz>${renderSlot($$result, $$slots["default"])}</button>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ui/UiTabsTab.astro", void 0);
// src/components/ui/UiTabsPanel.astro
createAstro("https://astro.nvoos.cloud");
var $$UiTabsPanel = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$UiTabsPanel;
	const { class: className, id, labelledby, selected = false, ...rest } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["ui-tabs-panel", className], "class:list")} role="tabpanel"${addAttribute(id, "id")}${addAttribute(labelledby, "aria-labelledby")}${addAttribute(!selected, "aria-hidden")}${spreadAttributes(rest)} data-astro-cid-jstighkk>${renderSlot($$result, $$slots["default"])}</div>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ui/UiTabsPanel.astro", void 0);
export { $$UiAccordionItem as a, $$UiTabs as i, $$UiTabsTab as n, $$UiAccordion as o, $$UiTabsList as r, $$UiTabsPanel as t };
