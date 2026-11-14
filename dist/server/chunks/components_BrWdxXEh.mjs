import { C as unescapeHTML, d as renderSlot, h as maybeRenderHead, m as renderTemplate, s as renderComponent, t as spreadAttributes, x as addAttribute } from "./server_COcTL13r.mjs";
import { t as createComponent } from "./astro-component_DeSnnQc7.mjs";
import { t as createAstro } from "./astro-global_CY5q3Xj5.mjs";
import "./compiler_tBncm0O6.mjs";
import { t as $$ProductGrid } from "./ProductGrid_qWo21neP.mjs";
import { g as getPromotions, p as getProduct } from "./client_DhvHaxQG.mjs";
import { a as $$UiAccordionItem, i as $$UiTabs, n as $$UiTabsTab, o as $$UiAccordion, r as $$UiTabsList, t as $$UiTabsPanel } from "./UiTabsPanel_shUPEsIF.mjs";
import { t as isSafeHref } from "./portable-text_BD10ftzh.mjs";
import { LIST_NEST_MODE_HTML, buildMarksTree, isPortableTextBlock, isPortableTextListItemBlock, isPortableTextToolkitList, isPortableTextToolkitSpan, isPortableTextToolkitTextNode, nestLists } from "@portabletext/toolkit";
// node_modules/@portabletext/astro/lib/internal.ts
/**
* Returns true if `it` is component
*/
function isComponent(it) {
	return typeof it === "function";
}
/**
* Merges two {@link SomePortableTextComponents} objects, giving priority to overrides.
*
* This function combines two component objects used in Portable Text rendering.
* If both objects have the same key, the value from `overrides` takes precedence.
* This is useful for customizing the rendering of specific components while keeping
* the default behavior for others.
*
* @typeParam Components - The type of the base components object.
* @typeParam Overrides - The type of the overrides components object.
*
* @param components - The base components object.
* @param overrides - The overrides components object.
*
* @returns A new object with the merged components.
*/
function mergeComponents(components, overrides) {
	const cmps = { ...components };
	for (const [key, override] of Object.entries(overrides)) {
		const current = components[key];
		cmps[key] = !current || isComponent(override) || isComponent(current) ? override : {
			...current,
			...override
		};
	}
	return cmps;
}
/**
* Builds the name of the slot that renders the given node type, optionally
* scoped to a specific `type` such as a block style or a mark type.
* @internal
*/
function toSlotName(nodeType, type) {
	return type ? `${nodeType}:${type}` : nodeType;
}
var nodeComponentsMap = /* @__PURE__ */ new WeakMap();
/**
* Binds the resolved components to a specific node object.
* @internal
*
* @remarks
* This uses the node's _object reference_ as the key. This enables the `Context` API via
* `usePortableText` to look up which components were assigned to this specific node during rendering.
*
* @param node - The node object to be used as the key.
* @param Default - The resolved default component for this node.
* @param Unknown - The resolved fallback (unknown) component for this node.
*/
function setNodeComponents(node, Default, Unknown) {
	nodeComponentsMap.set(node, {
		Default,
		Unknown
	});
}
/**
* Retrieves the components bound to a specific node object.
* @internal
*
* @param node - The node object to look up (by reference).
* @returns The component pair, or `undefined` if this exact node object was not registered.
*/
function getNodeComponents(node) {
	return nodeComponentsMap.get(node);
}
// node_modules/@portabletext/astro/lib/warnings.ts
var getTemplate = (prop, type) => `PortableText [components.${prop}] is missing "${type}"`;
var unknownTypeWarning = (type) => getTemplate("type", type);
var unknownMarkWarning = (markType) => getTemplate("mark", markType);
var unknownBlockWarning = (style) => getTemplate("block", style);
var unknownListWarning = (listItem) => getTemplate("list", listItem);
var unknownListItemWarning = (listStyle) => getTemplate("listItem", listStyle);
var getWarningMessage = (nodeType, type) => {
	return {
		block: unknownBlockWarning,
		list: unknownListWarning,
		listItem: unknownListItemWarning,
		mark: unknownMarkWarning,
		type: unknownTypeWarning
	}[nodeType](type);
};
function printWarning(message) {
	console.warn(message);
}
// node_modules/@portabletext/astro/lib/context.ts
var key = Symbol("@portabletext/astro");
/**
* This function returns rendering utility functions within a Portable Text tree. It should
* only be used within an Astro component that has been passed into the PortableText `components` prop.
* It follows a naming convention similar to React hooks, though it is not a hook as such.
*
* @param node - The Portable Text node that was passed into the Astro component
* @returns Rendering utility functions
*/
function usePortableText(node) {
	if (!(key in globalThis)) throw new Error(`PortableText "context" has not been initialised`);
	return globalThis[key](node);
}
// node_modules/@portabletext/astro/components/Block.astro
createAstro("https://astro.nvoos.cloud");
var $$Block = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Block;
	const props = Astro.props;
	const { node, index, isInline, ...attrs } = props;
	const styleIs = (style) => style === node.style;
	const { getUnknownComponent } = usePortableText(node);
	const UnknownStyle = getUnknownComponent();
	return renderTemplate`${styleIs("h1") ? renderTemplate`${maybeRenderHead($$result)}<h1${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h1>` : styleIs("h2") ? renderTemplate`<h2${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h2>` : styleIs("h3") ? renderTemplate`<h3${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h3>` : styleIs("h4") ? renderTemplate`<h4${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h4>` : styleIs("h5") ? renderTemplate`<h5${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h5>` : styleIs("h6") ? renderTemplate`<h6${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h6>` : styleIs("blockquote") ? renderTemplate`<blockquote${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</blockquote>` : styleIs("normal") ? renderTemplate`<p${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</p>` : renderTemplate`${renderComponent($$result, "UnknownStyle", UnknownStyle, { ...props }, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}`}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/node_modules/@portabletext/astro/components/Block.astro", void 0);
// node_modules/@portabletext/astro/components/HardBreak.astro
var $$HardBreak = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<br>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/node_modules/@portabletext/astro/components/HardBreak.astro", void 0);
// node_modules/@portabletext/astro/components/List.astro
createAstro("https://astro.nvoos.cloud");
var $$List = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$List;
	const { node, index, isInline, ...attrs } = Astro.props;
	const listItemIs = (listItem) => listItem === node.listItem;
	return renderTemplate`${listItemIs("menu") ? renderTemplate`${maybeRenderHead($$result)}<menu${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</menu>` : listItemIs("number") ? renderTemplate`<ol${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</ol>` : renderTemplate`<ul${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</ul>`}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/node_modules/@portabletext/astro/components/List.astro", void 0);
// node_modules/@portabletext/astro/components/ListItem.astro
createAstro("https://astro.nvoos.cloud");
var $$ListItem = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ListItem;
	const { node, index, isInline, ...attrs } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<li${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</li>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/node_modules/@portabletext/astro/components/ListItem.astro", void 0);
// node_modules/@portabletext/astro/components/Mark.astro
createAstro("https://astro.nvoos.cloud");
var $$Mark = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Mark;
	const props = Astro.props;
	const { node, index, isInline, ...attrs } = props;
	const markTypeIs = (markType) => markType === node.markType;
	const { getUnknownComponent } = usePortableText(node);
	const UnknownMarkType = getUnknownComponent();
	return renderTemplate`${markTypeIs("code") ? renderTemplate`${maybeRenderHead($$result)}<code${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</code>` : markTypeIs("em") ? renderTemplate`<em${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</em>` : markTypeIs("link") ? renderTemplate`<a${addAttribute(node.markDef.href, "href")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</a>` : markTypeIs("strike-through") ? renderTemplate`<del${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</del>` : markTypeIs("strong") ? renderTemplate`<strong${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</strong>` : markTypeIs("underline") ? renderTemplate`<span style="text-decoration: underline;"${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</span>` : renderTemplate`${renderComponent($$result, "UnknownMarkType", UnknownMarkType, { ...props }, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}`}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/node_modules/@portabletext/astro/components/Mark.astro", void 0);
// node_modules/@portabletext/astro/components/Text.astro
createAstro("https://astro.nvoos.cloud");
var $$Text = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Text;
	const { node } = Astro.props;
	return renderTemplate`${node.text}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/node_modules/@portabletext/astro/components/Text.astro", void 0);
// node_modules/@portabletext/astro/components/UnknownBlock.astro
var $$UnknownBlock = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<p data-portabletext-unknown="block">${renderSlot($$result, $$slots["default"])}</p>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/node_modules/@portabletext/astro/components/UnknownBlock.astro", void 0);
// node_modules/@portabletext/astro/components/UnknownList.astro
var $$UnknownList = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<ul data-portabletext-unknown="list">${renderSlot($$result, $$slots["default"])}</ul>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/node_modules/@portabletext/astro/components/UnknownList.astro", void 0);
// node_modules/@portabletext/astro/components/UnknownListItem.astro
var $$UnknownListItem = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<li data-portabletext-unknown="listitem">${renderSlot($$result, $$slots["default"])}</li>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/node_modules/@portabletext/astro/components/UnknownListItem.astro", void 0);
// node_modules/@portabletext/astro/components/UnknownMark.astro
var $$UnknownMark = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<span data-portabletext-unknown="mark">${renderSlot($$result, $$slots["default"])}</span>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/node_modules/@portabletext/astro/components/UnknownMark.astro", void 0);
// node_modules/@portabletext/astro/components/UnknownType.astro
createAstro("https://astro.nvoos.cloud");
var $$UnknownType = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$UnknownType;
	const { node, isInline } = Astro.props;
	const warning = getWarningMessage("type", node._type);
	return renderTemplate`${isInline ? renderTemplate`${maybeRenderHead($$result)}<span style="display:none" data-portabletext-unknown="type">${warning}</span>` : renderTemplate`<div style="display:none" data-portabletext-unknown="type">${warning}</div>`}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/node_modules/@portabletext/astro/components/UnknownType.astro", void 0);
// node_modules/@portabletext/astro/components/PortableText.astro
createAstro("https://astro.nvoos.cloud");
var $$PortableText = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PortableText;
	const { value, components: componentOverrides = {}, listNestingMode = LIST_NEST_MODE_HTML, onMissingComponent = true } = Astro.props;
	const components = mergeComponents({
		type: {},
		unknownType: $$UnknownType,
		block: {
			h1: $$Block,
			h2: $$Block,
			h3: $$Block,
			h4: $$Block,
			h5: $$Block,
			h6: $$Block,
			blockquote: $$Block,
			normal: $$Block
		},
		unknownBlock: $$UnknownBlock,
		list: {
			bullet: $$List,
			number: $$List,
			menu: $$List
		},
		unknownList: $$UnknownList,
		listItem: {
			bullet: $$ListItem,
			number: $$ListItem,
			menu: $$ListItem
		},
		unknownListItem: $$UnknownListItem,
		mark: {
			code: $$Mark,
			em: $$Mark,
			link: $$Mark,
			"strike-through": $$Mark,
			strong: $$Mark,
			underline: $$Mark
		},
		unknownMark: $$UnknownMark,
		text: $$Text,
		hardBreak: $$HardBreak
	}, componentOverrides);
	const noop = () => {};
	const missingComponentHandler = ((handler) => {
		if (typeof handler === "function") return handler;
		return !handler ? noop : printWarning;
	})(onMissingComponent);
	const asComponentProps = (node, index, isInline) => ({
		node,
		index,
		isInline
	});
	const provideComponent = (nodeType, type, fallbackComponent) => {
		const component = ((entry) => {
			return entry[type] || entry;
		})(components[nodeType]);
		if (isComponent(component)) return component;
		missingComponentHandler(getWarningMessage(nodeType, type), {
			nodeType,
			type
		});
		return fallbackComponent;
	};
	let fallbackRenderOptions;
	const portableTextRender = (options, isInline) => {
		if (!fallbackRenderOptions) throw new Error("[PortableText portableTextRender] fallbackRenderOptions is undefined");
		const renderChildren = (children, inline = false) => {
			return children?.map(portableTextRender(options, inline)) ?? [];
		};
		const renderOptions = {
			...fallbackRenderOptions,
			...options
		};
		return function renderNode(node, index) {
			function run({ nodeType, type, handler, resolveComponent, props, children }) {
				let component;
				const handlerProps = {
					get Component() {
						return component ??= resolveComponent();
					},
					props,
					children
				};
				const slotRenderer = provideSlot(nodeType, type);
				if (slotRenderer) return slotRenderer([handlerProps]);
				if (!isComponent(handler)) throw new Error(`[PortableText render] No handler found for node type ${node._type}.`);
				return handler(handlerProps);
			}
			if (isPortableTextToolkitList(node)) {
				const listType = node.listItem;
				const UnknownComponent = components.unknownList ?? $$UnknownList;
				setNodeComponents(node, $$List, UnknownComponent);
				return run({
					nodeType: "list",
					type: listType,
					handler: renderOptions.list,
					resolveComponent: () => provideComponent("list", listType, UnknownComponent),
					props: asComponentProps(node, index, false),
					children: renderChildren(node.children, false)
				});
			}
			if (isPortableTextListItemBlock(node)) {
				const { listItem, ...blockNode } = node;
				const isStyled = node.style && node.style !== "normal";
				node.children = isStyled ? renderNode(blockNode, index) : buildMarksTree(node);
				const UnknownComponent = components.unknownListItem ?? $$UnknownListItem;
				setNodeComponents(node, $$ListItem, UnknownComponent);
				return run({
					nodeType: "listItem",
					type: listItem,
					handler: renderOptions.listItem,
					resolveComponent: () => provideComponent("listItem", listItem, UnknownComponent),
					props: asComponentProps(node, index, false),
					children: isStyled ? node.children : renderChildren(node.children, true)
				});
			}
			if (isPortableTextToolkitSpan(node)) {
				const markType = node.markType;
				const UnknownComponent = components.unknownMark ?? $$UnknownMark;
				setNodeComponents(node, $$Mark, UnknownComponent);
				return run({
					nodeType: "mark",
					type: markType,
					handler: renderOptions.mark,
					resolveComponent: () => provideComponent("mark", markType, UnknownComponent),
					props: asComponentProps(node, index, true),
					children: renderChildren(node.children, true)
				});
			}
			if (isPortableTextBlock(node)) {
				node.style ??= "normal";
				node.children = buildMarksTree(node);
				const style = node.style;
				const UnknownComponent = components.unknownBlock ?? $$UnknownBlock;
				setNodeComponents(node, $$Block, UnknownComponent);
				return run({
					nodeType: "block",
					type: style,
					handler: renderOptions.block,
					resolveComponent: () => provideComponent("block", style, UnknownComponent),
					props: asComponentProps(node, index, false),
					children: renderChildren(node.children, true)
				});
			}
			if (isPortableTextToolkitTextNode(node)) {
				const isHardBreak = "\n" === node.text;
				const props = asComponentProps(node, index, true);
				if (isHardBreak) return run({
					nodeType: "hardBreak",
					handler: renderOptions.hardBreak,
					resolveComponent: () => isComponent(components.hardBreak) ? components.hardBreak : $$HardBreak,
					props
				});
				return run({
					nodeType: "text",
					handler: renderOptions.text,
					resolveComponent: () => isComponent(components.text) ? components.text : $$Text,
					props
				});
			}
			const customType = node._type;
			const UnknownComponent = components.unknownType ?? $$UnknownType;
			return run({
				nodeType: "type",
				type: customType,
				handler: renderOptions.type,
				resolveComponent: () => provideComponent("type", customType, UnknownComponent),
				props: asComponentProps(node, index, isInline ?? false)
			});
		};
	};
	globalThis[key] = (node) => ({
		getDefaultComponent: provideDefaultComponent.bind(null, node),
		getUnknownComponent: provideUnknownComponent.bind(null, node),
		render: (options) => node.children?.map(portableTextRender(options))
	});
	const provideDefaultComponent = (node) => {
		const DefaultComponent = getNodeComponents(node)?.Default;
		if (DefaultComponent) return DefaultComponent;
		if (isPortableTextToolkitList(node)) return $$List;
		if (isPortableTextListItemBlock(node)) return $$ListItem;
		if (isPortableTextToolkitSpan(node)) return $$Mark;
		if (isPortableTextBlock(node)) return $$Block;
		if (isPortableTextToolkitTextNode(node)) return "\n" === node.text ? $$HardBreak : $$Text;
		return $$UnknownType;
	};
	const provideUnknownComponent = (node) => {
		const UnknownComponent = getNodeComponents(node)?.Unknown;
		if (UnknownComponent) return UnknownComponent;
		if (isPortableTextToolkitList(node)) return components.unknownList ?? $$UnknownList;
		if (isPortableTextListItemBlock(node)) return components.unknownListItem ?? $$UnknownListItem;
		if (isPortableTextToolkitSpan(node)) return components.unknownMark ?? $$UnknownMark;
		if (isPortableTextBlock(node)) return components.unknownBlock ?? $$UnknownBlock;
		if (!isPortableTextToolkitTextNode(node)) return components.unknownType ?? $$UnknownType;
		throw new Error(`[PortableText getUnknownComponent] Unable to provide component with node type ${node._type}`);
	};
	const nodes = nestLists(Array.isArray(value) ? value : value ? [value] : [], listNestingMode);
	const render = (options) => {
		fallbackRenderOptions = options;
		return portableTextRender(options);
	};
	const createSlotRenderer = (slotName) => Astro.slots.render.bind(Astro.slots, slotName);
	const slotRenderers = /* @__PURE__ */ new Map();
	const provideSlotRenderer = (slotName) => {
		if (!slotRenderers.has(slotName)) slotRenderers.set(slotName, Astro.slots.has(slotName) ? createSlotRenderer(slotName) : void 0);
		return slotRenderers.get(slotName);
	};
	const provideSlot = (nodeType, type) => (type ? provideSlotRenderer(toSlotName(nodeType, type)) : void 0) ?? provideSlotRenderer(nodeType);
	return renderTemplate`${(() => {
		const renderNode = ({ Component, props, children }) => renderTemplate`${renderComponent($$result, "Component", Component, { ...props }, { "default": ($$result) => renderTemplate`${children}` })}`;
		return nodes.map(render({
			type: renderNode,
			block: renderNode,
			list: renderNode,
			listItem: renderNode,
			mark: renderNode,
			text: renderNode,
			hardBreak: renderNode
		}));
	})()}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/node_modules/@portabletext/astro/components/PortableText.astro", void 0);
// src/components/blocks/HeroBlock.astro
createAstro("https://astro.nvoos.cloud");
var $$HeroBlock = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HeroBlock;
	const { node } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section class="block-hero" data-section="hero" data-astro-cid-fsitonhv><h2 data-astro-cid-fsitonhv>${node.title}</h2>${node.lede && renderTemplate`<p class="block-hero__lede" data-astro-cid-fsitonhv>${node.lede}</p>`}</section>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/blocks/HeroBlock.astro", void 0);
// src/components/blocks/ImageBlock.astro
createAstro("https://astro.nvoos.cloud");
var $$ImageBlock = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ImageBlock;
	const { node } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<figure class="block-image" data-section="image" data-astro-cid-lwhdxrkg><img${addAttribute(node.src, "src")}${addAttribute(node.alt, "alt")} loading="lazy" decoding="async" data-astro-cid-lwhdxrkg></figure>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/blocks/ImageBlock.astro", void 0);
// src/components/blocks/ProductGridBlock.astro
createAstro("https://astro.nvoos.cloud");
var $$ProductGridBlock = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductGridBlock;
	const { node } = Astro.props;
	const products = (await Promise.all(node.ids.map((id) => getProduct(id, Astro.url)))).filter((product) => product !== null);
	return renderTemplate`${products.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section class="block-products" data-section="product-grid" aria-label="Products in this story" data-astro-cid-l3oa5w25>${renderComponent($$result, "ProductGrid", $$ProductGrid, {
		"products": products,
		"data-astro-cid-l3oa5w25": true
	})}</section>`}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/blocks/ProductGridBlock.astro", void 0);
// src/components/blocks/PromotionBlock.astro
createAstro("https://astro.nvoos.cloud");
var $$PromotionBlock = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PromotionBlock;
	const { node } = Astro.props;
	const promotion = (await getPromotions(Astro.url, {
		page: 1,
		limit: 100
	})).docs.find((item) => item.id === node.promotionId);
	return renderTemplate`${promotion?.active && renderTemplate`${maybeRenderHead($$result)}<aside class="block-promotion" data-section="promotion" data-astro-cid-2z5ah4ps><h2 data-astro-cid-2z5ah4ps>${promotion.title}</h2><div data-astro-cid-2z5ah4ps>${unescapeHTML(promotion.description)}</div><a class="btn" href="/promotions/" data-astro-cid-2z5ah4ps>View promotions</a></aside>`}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/blocks/PromotionBlock.astro", void 0);
// src/components/blocks/TestimonialBlock.astro
createAstro("https://astro.nvoos.cloud");
var $$TestimonialBlock = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TestimonialBlock;
	const { node } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<figure class="block-testimonial" data-section="testimonial" data-astro-cid-e3v5ztty><blockquote data-astro-cid-e3v5ztty>${node.quote}</blockquote>${node.author && renderTemplate`<figcaption data-astro-cid-e3v5ztty>${node.author}</figcaption>`}</figure>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/blocks/TestimonialBlock.astro", void 0);
// src/components/blocks/FaqBlock.astro
createAstro("https://astro.nvoos.cloud");
var $$FaqBlock = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FaqBlock;
	const { node } = Astro.props;
	const ACCORDION_NAME = "nvoos-content-faq";
	return renderTemplate`${renderComponent($$result, "UiAccordion", $$UiAccordion, {
		"class": "block-faq",
		"data-section": "faq",
		"data-astro-cid-ngymibku": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "UiAccordionItem", $$UiAccordionItem, {
		"title": node.question,
		"name": ACCORDION_NAME,
		"headingLevel": "h3",
		"data-astro-cid-ngymibku": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<p class="block-faq__answer" data-astro-cid-ngymibku>${node.answer}</p>` })}` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/blocks/FaqBlock.astro", void 0);
// src/components/blocks/StatBlock.astro
createAstro("https://astro.nvoos.cloud");
var $$StatBlock = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$StatBlock;
	const { node } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="block-stat" data-section="stats" data-astro-cid-lsvrfrfe><span class="block-stat__value" data-astro-cid-lsvrfrfe>${node.value}</span><span class="block-stat__label" data-astro-cid-lsvrfrfe>${node.label}</span></div>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/blocks/StatBlock.astro", void 0);
// src/components/blocks/ComparisonBlock.astro
createAstro("https://astro.nvoos.cloud");
var $$ComparisonBlock = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ComparisonBlock;
	const { node } = Astro.props;
	const caption = node.caption;
	return renderTemplate`${maybeRenderHead($$result)}<div class="block-comparison" data-section="comparison" data-astro-cid-3im6qq23><div class="block-comparison__scroll" role="region"${addAttribute(caption ?? "Comparison", "aria-label")} tabindex="0" data-astro-cid-3im6qq23><table data-astro-cid-3im6qq23>${caption && renderTemplate`<caption data-astro-cid-3im6qq23>${caption}</caption>`}<thead data-astro-cid-3im6qq23><tr data-astro-cid-3im6qq23><td data-astro-cid-3im6qq23></td>${node.columns.map((column) => renderTemplate`<th scope="col" data-astro-cid-3im6qq23>${column}</th>`)}</tr></thead><tbody data-astro-cid-3im6qq23>${node.rows.map((row) => renderTemplate`<tr data-astro-cid-3im6qq23><th scope="row" data-astro-cid-3im6qq23>${row.label}</th>${row.values.map((value) => renderTemplate`<td data-astro-cid-3im6qq23>${value}</td>`)}</tr>`)}</tbody></table></div></div>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/blocks/ComparisonBlock.astro", void 0);
// src/components/blocks/StepsBlock.astro
createAstro("https://astro.nvoos.cloud");
var $$StepsBlock = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$StepsBlock;
	const { node } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<ol class="block-steps" data-section="steps" data-astro-cid-5ia6jd6b>${node.items.map((step) => renderTemplate`<li class="block-steps__item" data-astro-cid-5ia6jd6b><h3 class="block-steps__title" data-astro-cid-5ia6jd6b>${step.title}</h3>${step.body && renderTemplate`<p class="block-steps__body" data-astro-cid-5ia6jd6b>${step.body}</p>`}</li>`)}</ol>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/blocks/StepsBlock.astro", void 0);
// src/components/blocks/TeamBlock.astro
createAstro("https://astro.nvoos.cloud");
var $$TeamBlock = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TeamBlock;
	const { node } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<ul class="block-team" data-section="team" role="list" data-astro-cid-soytm642>${node.people.map((person) => renderTemplate`<li class="block-team__member" data-astro-cid-soytm642><figure data-astro-cid-soytm642>${person.photo && renderTemplate`<img${addAttribute(person.photo, "src")}${addAttribute(person.name, "alt")} width="320" height="320" loading="lazy" decoding="async" data-astro-cid-soytm642>`}<figcaption data-astro-cid-soytm642><span class="block-team__name" data-astro-cid-soytm642>${person.name}</span>${person.role && renderTemplate`<span class="block-team__role" data-astro-cid-soytm642>${person.role}</span>`}</figcaption></figure></li>`)}</ul>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/blocks/TeamBlock.astro", void 0);
// src/components/blocks/TabsBlock.astro
createAstro("https://astro.nvoos.cloud");
var $$TabsBlock = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TabsBlock;
	const { node } = Astro.props;
	function hash(input) {
		let h = 5381;
		for (let i = 0; i < input.length; i += 1) h = (h << 5) + h + input.charCodeAt(i) | 0;
		return (h >>> 0).toString(36);
	}
	const id = `tabs-${node._key && node._key.length > 0 ? node._key : hash(JSON.stringify(node))}`;
	return renderTemplate`${renderComponent($$result, "UiTabs", $$UiTabs, {
		"class": "block-tabs",
		"data-section": "tabs",
		"data-astro-cid-xcqndulr": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "UiTabsList", $$UiTabsList, { "data-astro-cid-xcqndulr": true }, { "default": ($$result) => renderTemplate`${node.tabs.map((tab, index) => renderTemplate`${renderComponent($$result, "UiTabsTab", $$UiTabsTab, {
		"id": `${id}-tab-${index}`,
		"controls": `${id}-panel-${index}`,
		"selected": index === 0,
		"data-astro-cid-xcqndulr": true
	}, { "default": ($$result) => renderTemplate`${tab.title}` })}`)}` })}${node.tabs.map((tab, index) => renderTemplate`${renderComponent($$result, "UiTabsPanel", $$UiTabsPanel, {
		"id": `${id}-panel-${index}`,
		"labelledby": `${id}-tab-${index}`,
		"selected": index === 0,
		"data-astro-cid-xcqndulr": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PortableText", $$PortableText, {
		"value": tab.blocks,
		"components": PORTABLE_TEXT_COMPONENTS,
		"data-astro-cid-xcqndulr": true
	})}` })}`)}` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/blocks/TabsBlock.astro", void 0);
// src/components/blocks/LinkMark.astro
createAstro("https://astro.nvoos.cloud");
var $$LinkMark = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LinkMark;
	const { node } = Astro.props;
	const href = typeof node.markDef?.href === "string" ? node.markDef.href : "";
	const safe = isSafeHref(href);
	return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(safe ? href : "#", "href")} rel="noopener noreferrer">${renderSlot($$result, $$slots["default"])}</a>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/blocks/LinkMark.astro", void 0);
var PORTABLE_TEXT_COMPONENTS = {
	type: {
		hero: $$HeroBlock,
		image: $$ImageBlock,
		productGrid: $$ProductGridBlock,
		promotion: $$PromotionBlock,
		testimonial: $$TestimonialBlock,
		faq: $$FaqBlock,
		stat: $$StatBlock,
		comparison: $$ComparisonBlock,
		steps: $$StepsBlock,
		team: $$TeamBlock,
		tabs: $$TabsBlock
	},
	mark: { link: $$LinkMark }
};
export { $$ComparisonBlock as a, $$TestimonialBlock as c, $$PortableText as d, $$StepsBlock as i, $$ImageBlock as l, $$TabsBlock as n, $$StatBlock as o, $$TeamBlock as r, $$FaqBlock as s, PORTABLE_TEXT_COMPONENTS as t, $$HeroBlock as u };
