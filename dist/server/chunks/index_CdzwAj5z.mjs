import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { d as renderSlot, h as maybeRenderHead, m as renderTemplate, s as renderComponent, t as spreadAttributes, x as addAttribute } from "./server_COcTL13r.mjs";
import { t as createComponent } from "./astro-component_DeSnnQc7.mjs";
import { t as createAstro } from "./astro-global_CY5q3Xj5.mjs";
import "./compiler_tBncm0O6.mjs";
import { t as $$BaseLayout } from "./BaseLayout_Cztu7urN.mjs";
import { a as $$UiAccordionItem, i as $$UiTabs, n as $$UiTabsTab, o as $$UiAccordion, r as $$UiTabsList, t as $$UiTabsPanel } from "./UiTabsPanel_shUPEsIF.mjs";
import { useEffect, useId, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import * as dialog from "@zag-js/dialog";
import { normalizeProps, useMachine } from "@zag-js/react";
import * as combobox from "@zag-js/combobox";
// src/components/ui/UiBreadcrumbs.astro
createAstro("https://astro.nvoos.cloud");
var $$UiBreadcrumbs = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$UiBreadcrumbs;
	const { class: className, ariaLabel = "Breadcrumbs", ...rest } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<nav${addAttribute(["ui-breadcrumbs", className], "class:list")}${addAttribute(ariaLabel, "aria-label")}${spreadAttributes(rest)} data-astro-cid-6vn3cjin><ol class="ui-breadcrumbs-list" data-astro-cid-6vn3cjin>${renderSlot($$result, $$slots["default"])}</ol></nav>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ui/UiBreadcrumbs.astro", void 0);
// src/components/ui/UiBreadcrumbsItem.astro
createAstro("https://astro.nvoos.cloud");
var $$UiBreadcrumbsItem = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$UiBreadcrumbsItem;
	const { class: className, label = "Breadcrumb", href, currentPage = false, ...rest } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<li${addAttribute(["ui-breadcrumbs-item", className], "class:list")}${spreadAttributes(rest)} data-astro-cid-veac4swt>${currentPage ? renderTemplate`<span aria-current="page" class="ui-breadcrumbs-current" data-astro-cid-veac4swt>${label}</span>` : renderTemplate`<a${addAttribute(href, "href")} class="ui-breadcrumbs-link" data-astro-cid-veac4swt>${label}</a>`}</li>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ui/UiBreadcrumbsItem.astro", void 0);
// src/islands/UiDialog.tsx
function UiDialog({ triggerLabel = "Open dialog", title = "Dialog", children }) {
	const [open, setOpen] = useState(false);
	const [hydrated, setHydrated] = useState(false);
	useEffect(() => {
		setHydrated(true);
	}, []);
	const service = useMachine(dialog.machine, {
		id: useId(),
		open,
		onOpenChange: (details) => setOpen(details.open)
	});
	const api = dialog.connect(service, normalizeProps);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx("button", {
			...api.getTriggerProps(),
			className: "btn",
			"data-hydrated": hydrated ? "" : void 0,
			children: triggerLabel
		}),
		/* @__PURE__ */ jsx("div", {
			...api.getBackdropProps(),
			className: "ui-dialog-backdrop"
		}),
		/* @__PURE__ */ jsx("div", {
			...api.getPositionerProps(),
			className: "ui-dialog-positioner",
			children: /* @__PURE__ */ jsxs("div", {
				...api.getContentProps(),
				className: "ui-dialog-content",
				"aria-label": title,
				children: [
					/* @__PURE__ */ jsx("h2", {
						...api.getTitleProps(),
						className: "ui-dialog-title",
						children: title
					}),
					/* @__PURE__ */ jsx("div", {
						...api.getDescriptionProps(),
						className: "ui-dialog-description",
						children: children ?? /* @__PURE__ */ jsx("p", { children: "This dialog is rendered by the Zag.js dialog machine: focus is trapped while open, Escape and backdrop clicks close it, and focus returns to the trigger on close." })
					}),
					/* @__PURE__ */ jsx("button", {
						...api.getCloseTriggerProps(),
						className: "btn",
						children: "Close"
					})
				]
			})
		})
	] });
}
// src/islands/UiCombobox.tsx
var ALL_OPTIONS = [
	"Acacia",
	"Maple",
	"Oak",
	"Teak",
	"Walnut"
];
function UiCombobox({ label = "Wood", placeholder = "Choose a wood…" }) {
	const [items, setItems] = useState(ALL_OPTIONS);
	const [hydrated, setHydrated] = useState(false);
	useEffect(() => {
		setHydrated(true);
	}, []);
	const service = useMachine(combobox.machine, {
		id: useId(),
		composite: false,
		collection: combobox.collection({ items }),
		onInputValueChange: ({ inputValue }) => {
			const needle = inputValue.toLowerCase();
			setItems(ALL_OPTIONS.filter((option) => option.toLowerCase().includes(needle)));
		}
	});
	const api = combobox.connect(service, normalizeProps);
	return /* @__PURE__ */ jsxs("div", {
		...api.getRootProps(),
		className: "ui-combobox",
		"data-hydrated": hydrated ? "" : void 0,
		children: [
			/* @__PURE__ */ jsx("label", {
				...api.getLabelProps(),
				className: "ui-combobox-label",
				children: label
			}),
			/* @__PURE__ */ jsxs("div", {
				...api.getControlProps(),
				className: "ui-combobox-control",
				children: [/* @__PURE__ */ jsx("input", {
					...api.getInputProps(),
					placeholder,
					className: "ui-combobox-input"
				}), /* @__PURE__ */ jsx("button", {
					...api.getTriggerProps(),
					className: "ui-combobox-trigger",
					"aria-hidden": "true",
					children: "▾"
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				...api.getPositionerProps(),
				className: "ui-combobox-positioner",
				children: /* @__PURE__ */ jsx("div", {
					...api.getContentProps(),
					className: "ui-combobox-content",
					children: /* @__PURE__ */ jsx("ul", {
						...api.getListProps(),
						className: "ui-combobox-list",
						children: items.map((item) => /* @__PURE__ */ jsx("li", {
							...api.getItemProps({ item }),
							className: "ui-combobox-item",
							children: item
						}, item))
					})
				})
			})
		]
	});
}
// src/pages/components/index.astro
var components_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Component library evaluation",
		"description": "Adapted accessible-astro-components and headless Zag.js components, re-themed onto the ADS token system.",
		"data-astro-cid-yxmzz6sn": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<article class="gallery" data-astro-cid-yxmzz6sn><h1 data-astro-cid-yxmzz6sn>Component library evaluation</h1><p class="lede" data-astro-cid-yxmzz6sn>Two adoption approaches for accessible UI components — adapted Incluud components (behavior preserved, styling re-tokenized onto ADS) and headless Zag.js state machines in our own islands. Evaluation record:${" "}<a href="https://github.com/nvdigitalsolutions/mcp-ai-wpoos/blob/alpha-working/docs/project/proposals/107-storefront-content-surface-gap-analysis.md" data-astro-cid-yxmzz6sn>Proposal 107 gap analysis §10</a>.</p><p class="lede" data-astro-cid-yxmzz6sn>This page answers the <em data-astro-cid-yxmzz6sn>adoption</em> question — which component library, and on what terms. The Portable Text content blocks the storefront renders are documented separately:${" "}<a href="/components/blocks/" data-astro-cid-yxmzz6sn>content blocks →</a>.</p><section class="demo-section" data-astro-cid-yxmzz6sn><h2 data-astro-cid-yxmzz6sn>Adapted — accessible-astro-components (MIT)</h2><h3 data-astro-cid-yxmzz6sn>Accordion (native details/summary)</h3>${renderComponent($$result, "UiAccordion", $$UiAccordion, { "data-astro-cid-yxmzz6sn": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "UiAccordionItem", $$UiAccordionItem, {
		"title": "What is the ADS token system?",
		"data-astro-cid-yxmzz6sn": true
	}, { "default": ($$result) => renderTemplate`<p data-astro-cid-yxmzz6sn>A DTCG-sourced, three-layer token system (core → semantic → component) with light/dark theming and a drift-gated generator. These demo components bind the <code data-astro-cid-yxmzz6sn>--nv-*</code> aliases.</p>` })}${renderComponent($$result, "UiAccordionItem", $$UiAccordionItem, {
		"title": "Why keep the native details element?",
		"open": true,
		"data-astro-cid-yxmzz6sn": true
	}, { "default": ($$result) => renderTemplate`<p data-astro-cid-yxmzz6sn>The native <code data-astro-cid-yxmzz6sn>details</code>/<code data-astro-cid-yxmzz6sn>summary</code> pattern gives keyboard, screen-reader, and reduced-motion behavior for free — no script, no ARIA to hand-roll. The <code data-astro-cid-yxmzz6sn>name</code> attribute also enables exclusive accordions.</p>` })}` })}<h3 data-astro-cid-yxmzz6sn>Tabs (WAI-ARIA tabs pattern)</h3>${renderComponent($$result, "UiTabs", $$UiTabs, { "data-astro-cid-yxmzz6sn": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "UiTabsList", $$UiTabsList, { "data-astro-cid-yxmzz6sn": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "UiTabsTab", $$UiTabsTab, {
		"id": "tab-design",
		"controls": "panel-design",
		"selected": true,
		"data-astro-cid-yxmzz6sn": true
	}, { "default": ($$result) => renderTemplate`Design` })}${renderComponent($$result, "UiTabsTab", $$UiTabsTab, {
		"id": "tab-content",
		"controls": "panel-content",
		"data-astro-cid-yxmzz6sn": true
	}, { "default": ($$result) => renderTemplate`Content` })}${renderComponent($$result, "UiTabsTab", $$UiTabsTab, {
		"id": "tab-ops",
		"controls": "panel-ops",
		"data-astro-cid-yxmzz6sn": true
	}, { "default": ($$result) => renderTemplate`Ops` })}` })}${renderComponent($$result, "UiTabsPanel", $$UiTabsPanel, {
		"id": "panel-design",
		"labelledby": "tab-design",
		"selected": true,
		"data-astro-cid-yxmzz6sn": true
	}, { "default": ($$result) => renderTemplate`<p data-astro-cid-yxmzz6sn>The design slice: tokens, themes, WCAG contrast checks.</p>` })}${renderComponent($$result, "UiTabsPanel", $$UiTabsPanel, {
		"id": "panel-content",
		"labelledby": "tab-content",
		"data-astro-cid-yxmzz6sn": true
	}, { "default": ($$result) => renderTemplate`<p data-astro-cid-yxmzz6sn>The content slice: draft-first pages and posts with preview links.</p>` })}${renderComponent($$result, "UiTabsPanel", $$UiTabsPanel, {
		"id": "panel-ops",
		"labelledby": "tab-ops",
		"data-astro-cid-yxmzz6sn": true
	}, { "default": ($$result) => renderTemplate`<p data-astro-cid-yxmzz6sn>Ops: site status, previews, rebuild triggers.</p>` })}` })}<h3 data-astro-cid-yxmzz6sn>Breadcrumbs</h3>${renderComponent($$result, "UiBreadcrumbs", $$UiBreadcrumbs, { "data-astro-cid-yxmzz6sn": true }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "UiBreadcrumbsItem", $$UiBreadcrumbsItem, {
		"label": "Home",
		"href": "/",
		"data-astro-cid-yxmzz6sn": true
	})}${renderComponent($$result, "UiBreadcrumbsItem", $$UiBreadcrumbsItem, {
		"label": "Components",
		"href": "/components/",
		"data-astro-cid-yxmzz6sn": true
	})}${renderComponent($$result, "UiBreadcrumbsItem", $$UiBreadcrumbsItem, {
		"label": "Evaluation",
		"currentPage": true,
		"data-astro-cid-yxmzz6sn": true
	})}` })}</section><section class="demo-section" data-astro-cid-yxmzz6sn><h2 data-astro-cid-yxmzz6sn>Headless — Zag.js (MIT)</h2><p data-astro-cid-yxmzz6sn>Zag owns the interaction state machines (focus trap, Escape handling, ARIA wiring); the markup and ADS-token styling are ours.</p><h3 data-astro-cid-yxmzz6sn>Dialog (focus trap)</h3>${renderComponent($$result, "UiDialog", UiDialog, {
		"client:load": true,
		"title": "Zag dialog demo",
		"data-astro-cid-yxmzz6sn": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/islands/UiDialog.tsx",
		"client:component-export": "default"
	})}<p class="hint" data-astro-cid-yxmzz6sn>Open the dialog, then Tab — focus cycles inside. Escape or the backdrop closes it and focus returns to the trigger.</p><h3 data-astro-cid-yxmzz6sn>Combobox (autocomplete)</h3>${renderComponent($$result, "UiCombobox", UiCombobox, {
		"client:load": true,
		"data-astro-cid-yxmzz6sn": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/islands/UiCombobox.tsx",
		"client:component-export": "default"
	})}<p class="hint" data-astro-cid-yxmzz6sn>Type to filter; ArrowUp/Down highlight; Enter selects.</p></section></article>` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/components/index.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/components/index.astro";
var $$url = "/components/";
// \0virtual:astro:page:src/pages/components/index@_@astro
var page = () => components_exports;
export { page };
