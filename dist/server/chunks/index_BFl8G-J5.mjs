import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { h as maybeRenderHead, m as renderTemplate, s as renderComponent } from "./server_COcTL13r.mjs";
import { t as createComponent } from "./astro-component_DeSnnQc7.mjs";
import "./compiler_tBncm0O6.mjs";
import { t as $$BaseLayout } from "./BaseLayout_Cztu7urN.mjs";
import { a as $$ComparisonBlock, c as $$TestimonialBlock, i as $$StepsBlock, l as $$ImageBlock, n as $$TabsBlock, o as $$StatBlock, r as $$TeamBlock, s as $$FaqBlock, u as $$HeroBlock } from "./components_BrWdxXEh.mjs";
// src/lib/content/section-kinds.ts
/**
* Portable Text type → emitted kind. Every block type maps to exactly one
* kind; `stat` → `stats` is the only name that changes. Live-data blocks
* (productGrid, promotion) are included — they render only when their
* upstream resolves, but the mapping is unconditional.
*/
var BLOCK_TYPE_TO_KIND = {
	hero: "hero",
	image: "image",
	testimonial: "testimonial",
	faq: "faq",
	stat: "stats",
	comparison: "comparison",
	steps: "steps",
	team: "team",
	tabs: "tabs",
	productGrid: "product-grid",
	promotion: "promotion"
};
// src/pages/components/blocks/index.astro
var blocks_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const title = "Content blocks";
	const description = "Every Portable Text block type the storefront renders, with the data-section kind each one emits.";
	const vocabulary = Object.entries(BLOCK_TYPE_TO_KIND);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": title,
		"description": description,
		"data-astro-cid-rj2gsxjf": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<article class="gallery" data-astro-cid-rj2gsxjf><p class="crumb" data-astro-cid-rj2gsxjf><a href="/components/" data-astro-cid-rj2gsxjf>← Component library evaluation</a></p><h1 data-astro-cid-rj2gsxjf>Content blocks</h1><p class="lede" data-astro-cid-rj2gsxjf>The Portable Text block types a page or post body can carry, rendered from fixtures. Each block's root element carries${" "}<code data-astro-cid-rj2gsxjf>data-section="&lt;kind&gt;"</code> — a structural label agents and tests can select on, independent of CSS class names. The kind is advisory; identity, where it exists, stays <code data-astro-cid-rj2gsxjf>data-section-id</code>.</p><section class="demo-section" data-astro-cid-rj2gsxjf><h2 data-astro-cid-rj2gsxjf>Vocabulary</h2><p class="hint" data-astro-cid-rj2gsxjf>The emitted value is the <em data-astro-cid-rj2gsxjf>kind</em>, not the authoring type name.<code data-astro-cid-rj2gsxjf>stat</code> → <code data-astro-cid-rj2gsxjf>stats</code> is the only rename.</p><div class="scroll" data-astro-cid-rj2gsxjf><table class="vocab" data-astro-cid-rj2gsxjf><thead data-astro-cid-rj2gsxjf><tr data-astro-cid-rj2gsxjf><th scope="col" data-astro-cid-rj2gsxjf>Authoring type</th><th scope="col" data-astro-cid-rj2gsxjf>Emits</th></tr></thead><tbody data-astro-cid-rj2gsxjf>${vocabulary.map(([type, kind]) => renderTemplate`<tr data-astro-cid-rj2gsxjf><td data-astro-cid-rj2gsxjf><code data-astro-cid-rj2gsxjf>${type}</code></td><td data-astro-cid-rj2gsxjf>${type === kind ? renderTemplate`<span class="same" data-astro-cid-rj2gsxjf>same</span>` : renderTemplate`<code data-astro-cid-rj2gsxjf>${kind}</code>`}</td></tr>`)}</tbody></table></div><p class="hint" data-astro-cid-rj2gsxjf>Source of truth: <code data-astro-cid-rj2gsxjf>src/lib/content/section-kinds.ts</code>. A unit test fails if a block ships without an in-vocabulary kind, or if a kind has no block.</p></section><section class="demo-section" data-astro-cid-rj2gsxjf><h2 data-astro-cid-rj2gsxjf>Structural blocks</h2><h3 data-astro-cid-rj2gsxjf><code data-astro-cid-rj2gsxjf>hero</code></h3>${renderComponent($$result, "HeroBlock", $$HeroBlock, {
		"node": {
			_type: "hero",
			title: "A headline that opens the body",
			lede: "An optional lede sits beneath it. Both are plain text — the hero is a band, not a place for markup."
		},
		"data-astro-cid-rj2gsxjf": true
	})}<h3 data-astro-cid-rj2gsxjf><code data-astro-cid-rj2gsxjf>image</code></h3><p class="hint" data-astro-cid-rj2gsxjf>A self-contained placeholder: site-root static files are not guaranteed to ship to every host, so the demo carries its own bytes.</p>${renderComponent($$result, "ImageBlock", $$ImageBlock, {
		"node": {
			_type: "image",
			src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='200' viewBox='0 0 480 200'%3E%3Crect width='480' height='200' fill='%23111827'/%3E%3Ccircle cx='240' cy='100' r='46' fill='none' stroke='%236b7280' stroke-width='3'/%3E%3Cpath d='M214 100h52M240 74v52' stroke='%236b7280' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E",
			alt: "A placeholder graphic with a plus symbol in a circle"
		},
		"data-astro-cid-rj2gsxjf": true
	})}<h3 data-astro-cid-rj2gsxjf><code data-astro-cid-rj2gsxjf>testimonial</code></h3>${renderComponent($$result, "TestimonialBlock", $$TestimonialBlock, {
		"node": {
			_type: "testimonial",
			quote: "The blocks rendered exactly as reviewed, with no surprises in production.",
			author: "A customer"
		},
		"data-astro-cid-rj2gsxjf": true
	})}<h3 data-astro-cid-rj2gsxjf><code data-astro-cid-rj2gsxjf>stats</code> — authored as <code data-astro-cid-rj2gsxjf>stat</code></h3><div class="stat-row" data-astro-cid-rj2gsxjf>${renderComponent($$result, "StatBlock", $$StatBlock, {
		"node": {
			_type: "stat",
			value: "3",
			label: "new section kinds"
		},
		"data-astro-cid-rj2gsxjf": true
	})}${renderComponent($$result, "StatBlock", $$StatBlock, {
		"node": {
			_type: "stat",
			value: "11",
			label: "block types"
		},
		"data-astro-cid-rj2gsxjf": true
	})}${renderComponent($$result, "StatBlock", $$StatBlock, {
		"node": {
			_type: "stat",
			value: "0",
			label: "scripts required"
		},
		"data-astro-cid-rj2gsxjf": true
	})}</div><h3 data-astro-cid-rj2gsxjf><code data-astro-cid-rj2gsxjf>comparison</code></h3>${renderComponent($$result, "ComparisonBlock", $$ComparisonBlock, {
		"node": {
			_type: "comparison",
			caption: "Draft-first publication",
			columns: ["Draft", "Published"],
			rows: [
				{
					label: "Visible to shoppers",
					values: ["No", "Yes"]
				},
				{
					label: "Indexed",
					values: ["No", "Yes"]
				},
				{
					label: "Preview link",
					values: ["Yes", "Not needed"]
				}
			]
		},
		"data-astro-cid-rj2gsxjf": true
	})}<h3 data-astro-cid-rj2gsxjf><code data-astro-cid-rj2gsxjf>steps</code></h3>${renderComponent($$result, "StepsBlock", $$StepsBlock, {
		"node": {
			_type: "steps",
			items: [
				{
					title: "Write the body",
					body: "Compose blocks in the editor; nothing publishes yet."
				},
				{
					title: "Preview it",
					body: "A signed preview link renders the draft to a real browser."
				},
				{
					title: "Publish",
					body: "The page enters the sitemap and the catalog index."
				}
			]
		},
		"data-astro-cid-rj2gsxjf": true
	})}<h3 data-astro-cid-rj2gsxjf><code data-astro-cid-rj2gsxjf>team</code></h3>${renderComponent($$result, "TeamBlock", $$TeamBlock, {
		"node": {
			_type: "team",
			people: [{
				name: "Ada Lovelace",
				role: "Editorial lead"
			}, {
				name: "Grace Hopper",
				role: "Operations"
			}]
		},
		"data-astro-cid-rj2gsxjf": true
	})}<h3 data-astro-cid-rj2gsxjf><code data-astro-cid-rj2gsxjf>tabs</code></h3>${renderComponent($$result, "TabsBlock", $$TabsBlock, {
		"node": {
			_type: "tabs",
			_key: "gallery-tabs",
			tabs: [{
				title: "Render",
				blocks: [{
					_type: "block",
					style: "normal",
					markDefs: [],
					children: [{
						_type: "span",
						text: "Tab bodies are nested Portable Text — any allowlisted block can live inside one.",
						marks: []
					}]
				}]
			}, {
				title: "Access",
				blocks: [{
					_type: "block",
					style: "normal",
					markDefs: [],
					children: [{
						_type: "span",
						text: "Arrow keys, Home and End move between tabs; selection follows focus.",
						marks: []
					}]
				}]
			}]
		},
		"data-astro-cid-rj2gsxjf": true
	})}<h3 data-astro-cid-rj2gsxjf><code data-astro-cid-rj2gsxjf>faq</code></h3>${renderComponent($$result, "FaqBlock", $$FaqBlock, {
		"node": {
			_type: "faq",
			question: "Why details/summary?",
			answer: "The native element gives keyboard, screen-reader and reduced-motion behaviour with no script. A shared name attribute makes consecutive FAQ blocks behave as one exclusive accordion."
		},
		"data-astro-cid-rj2gsxjf": true
	})}${renderComponent($$result, "FaqBlock", $$FaqBlock, {
		"node": {
			_type: "faq",
			question: "Is FAQ schema emitted?",
			answer: "No. Google retired the FAQ rich result, so the visible accordion is the whole feature."
		},
		"data-astro-cid-rj2gsxjf": true
	})}</section><section class="demo-section" data-astro-cid-rj2gsxjf><h2 data-astro-cid-rj2gsxjf>Live-data blocks</h2><p data-astro-cid-rj2gsxjf>Two block types resolve against the catalog at render time, so they are listed rather than demoed here:</p><ul class="plain" data-astro-cid-rj2gsxjf><li data-astro-cid-rj2gsxjf><code data-astro-cid-rj2gsxjf>productGrid</code> → <code data-astro-cid-rj2gsxjf>data-section="product-grid"</code> — a live product pick by id.</li><li data-astro-cid-rj2gsxjf><code data-astro-cid-rj2gsxjf>promotion</code> → <code data-astro-cid-rj2gsxjf>data-section="promotion"</code> — an active promotion card by id.</li></ul><p class="hint" data-astro-cid-rj2gsxjf>Both omit the band entirely when the upstream does not resolve, which is why a fixture gallery would show nothing.</p></section></article>` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/components/blocks/index.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/components/blocks/index.astro";
var $$url = "/components/blocks/";
// \0virtual:astro:page:src/pages/components/blocks/index@_@astro
var page = () => blocks_exports;
export { page };
