import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { _ as addAttribute, h as maybeRenderHead, m as renderTemplate, s as renderComponent } from "./server_oTayxuEg.mjs";
import { t as createComponent } from "./astro-component_DkgBvFJz.mjs";
import { n as TokenService, r as contrastCheck, t as $$BaseLayout } from "./BaseLayout_B1AMrDC3.mjs";
import "./compiler_CWCzah9E.mjs";
// src/pages/tokens/index.astro
var tokens_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const service = new TokenService();
	const themes = service.listThemes();
	const activeTheme = service.getActiveTheme();
	const semantic = service.resolveActiveSemantic();
	function flattenGroup(tree, groupName) {
		const out = [];
		const walk = (node, parts) => {
			if (node === null || typeof node !== "object") return;
			const token = node;
			if ((typeof token.$value === "string" || Array.isArray(token.$value)) && typeof token.$type === "string") {
				out.push({
					name: `${groupName}.${parts.join(".")}`,
					value: Array.isArray(token.$value) ? token.$value.join(", ") : token.$value,
					type: token.$type
				});
				return;
			}
			for (const [key, child] of Object.entries(node)) {
				if (key.startsWith("$")) continue;
				walk(child, [...parts, key]);
			}
		};
		walk(tree, []);
		return out;
	}
	const groups = service.resolvedGroups();
	const coreTokens = flattenGroup(groups.core ?? {}, "core");
	const semanticTokens = flattenGroup(groups.semantic ?? {}, "semantic");
	const componentTokens = flattenGroup(groups.component ?? {}, "component");
	const contrastSamples = [
		[
			"ink on surface",
			semantic.ink,
			semantic.surface
		],
		[
			"muted on surface",
			semantic.muted,
			semantic.surface
		],
		[
			"accent-ink on accent",
			semantic["accent-ink"],
			semantic.accent
		],
		[
			"danger on surface-alt",
			semantic.danger,
			semantic["surface-alt"]
		]
	].map(([label, fg, bg]) => ({
		label,
		fg,
		bg,
		result: contrastCheck(fg, bg)
	}));
	const isColor = (token) => token.type === "color" && /^#|^rgb|^hsl/.test(token.value);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Design Tokens — ADS",
		"description": "NV oOS Astro Design System token browser (Proposal 095)",
		"data-astro-cid-z7qoyrnk": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1 data-astro-cid-z7qoyrnk>Design Tokens</h1><p data-astro-cid-z7qoyrnk>Active theme: <strong data-astro-cid-z7qoyrnk>${activeTheme}</strong> — themes: ${themes.join(", ")}. Source of truth: <code data-astro-cid-z7qoyrnk>src/tokens/*.json</code> (DTCG 2025.10).</p><h2 data-astro-cid-z7qoyrnk>Contrast (WCAG 2.2)</h2><table class="tokens-table" data-astro-cid-z7qoyrnk><thead data-astro-cid-z7qoyrnk><tr data-astro-cid-z7qoyrnk><th data-astro-cid-z7qoyrnk>Pair</th><th data-astro-cid-z7qoyrnk>FG</th><th data-astro-cid-z7qoyrnk>BG</th><th data-astro-cid-z7qoyrnk>Ratio</th><th data-astro-cid-z7qoyrnk>AA</th><th data-astro-cid-z7qoyrnk>AAA</th></tr></thead><tbody data-astro-cid-z7qoyrnk>${contrastSamples.map((sample) => renderTemplate`<tr data-astro-cid-z7qoyrnk><td data-astro-cid-z7qoyrnk>${sample.label}</td><td data-astro-cid-z7qoyrnk><span class="swatch"${addAttribute(`background:${sample.fg}`, "style")} data-astro-cid-z7qoyrnk></span> ${sample.fg}</td><td data-astro-cid-z7qoyrnk><span class="swatch"${addAttribute(`background:${sample.bg}`, "style")} data-astro-cid-z7qoyrnk></span> ${sample.bg}</td><td data-astro-cid-z7qoyrnk>${sample.result ? sample.result.ratio : "n/a"}</td><td data-astro-cid-z7qoyrnk>${sample.result ? sample.result.aaNormal ? "✓" : "✗" : "—"}</td><td data-astro-cid-z7qoyrnk>${sample.result ? sample.result.aaaNormal ? "✓" : "✗" : "—"}</td></tr>`)}</tbody></table><h2 data-astro-cid-z7qoyrnk>Semantic layer (resolved, theme: ${activeTheme})</h2><table class="tokens-table" data-astro-cid-z7qoyrnk><thead data-astro-cid-z7qoyrnk><tr data-astro-cid-z7qoyrnk><th data-astro-cid-z7qoyrnk>Token</th><th data-astro-cid-z7qoyrnk>Type</th><th data-astro-cid-z7qoyrnk>Value</th><th data-astro-cid-z7qoyrnk>Preview</th></tr></thead><tbody data-astro-cid-z7qoyrnk>${semanticTokens.map((token) => renderTemplate`<tr data-astro-cid-z7qoyrnk><td data-astro-cid-z7qoyrnk><code data-astro-cid-z7qoyrnk>${token.name}</code></td><td data-astro-cid-z7qoyrnk>${token.type}</td><td data-astro-cid-z7qoyrnk><code data-astro-cid-z7qoyrnk>${token.value}</code></td><td data-astro-cid-z7qoyrnk>${isColor(token) ? renderTemplate`<span class="swatch swatch--lg"${addAttribute(`background:${token.value}`, "style")} data-astro-cid-z7qoyrnk></span>` : "—"}</td></tr>`)}</tbody></table><h2 data-astro-cid-z7qoyrnk>Core layer</h2><table class="tokens-table" data-astro-cid-z7qoyrnk><thead data-astro-cid-z7qoyrnk><tr data-astro-cid-z7qoyrnk><th data-astro-cid-z7qoyrnk>Token</th><th data-astro-cid-z7qoyrnk>Type</th><th data-astro-cid-z7qoyrnk>Value</th></tr></thead><tbody data-astro-cid-z7qoyrnk>${coreTokens.map((token) => renderTemplate`<tr data-astro-cid-z7qoyrnk><td data-astro-cid-z7qoyrnk><code data-astro-cid-z7qoyrnk>${token.name}</code></td><td data-astro-cid-z7qoyrnk>${token.type}</td><td data-astro-cid-z7qoyrnk><code data-astro-cid-z7qoyrnk>${token.value}</code></td></tr>`)}</tbody></table><h2 data-astro-cid-z7qoyrnk>Component layer</h2><table class="tokens-table" data-astro-cid-z7qoyrnk><thead data-astro-cid-z7qoyrnk><tr data-astro-cid-z7qoyrnk><th data-astro-cid-z7qoyrnk>Token</th><th data-astro-cid-z7qoyrnk>Type</th><th data-astro-cid-z7qoyrnk>Value</th></tr></thead><tbody data-astro-cid-z7qoyrnk>${componentTokens.map((token) => renderTemplate`<tr data-astro-cid-z7qoyrnk><td data-astro-cid-z7qoyrnk><code data-astro-cid-z7qoyrnk>${token.name}</code></td><td data-astro-cid-z7qoyrnk>${token.type}</td><td data-astro-cid-z7qoyrnk><code data-astro-cid-z7qoyrnk>${token.value}</code></td></tr>`)}</tbody></table>` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/tokens/index.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/tokens/index.astro";
var $$url = "/tokens/";
// \0virtual:astro:page:src/pages/tokens/index@_@astro
var page = () => tokens_exports;
export { page };
