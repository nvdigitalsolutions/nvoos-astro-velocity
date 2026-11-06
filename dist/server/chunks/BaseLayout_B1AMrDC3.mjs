import { T as unescapeHTML, _ as addAttribute, c as Fragment$2, d as renderSlot, g as renderHead, h as maybeRenderHead, m as renderTemplate, n as createTransitionScope, s as renderComponent, v as createRenderInstruction } from "./server_oTayxuEg.mjs";
import { t as createComponent } from "./astro-component_DkgBvFJz.mjs";
import { t as createAstro } from "./astro-global_CZt7TqFY.mjs";
import "./compiler_CWCzah9E.mjs";
import { n as semantic, t as adsThemeNames } from "./tokens.generated_Ci1Wc5Hv.mjs";
import { _ as getThemePolicy, v as resolvePolicyTheme } from "./client_TtS43Z5n.mjs";
import { useEffect, useState } from "react";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { useStore } from "@nanostores/react";
import { atom, map } from "nanostores";
import { jsx, jsxs } from "react/jsx-runtime";
// node_modules/astro/dist/runtime/server/render/script.js
/**
* Relies on the `renderScript: true` compiler option
* @experimental
*/
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
// node_modules/astro/components/ClientRouter.astro
createAstro("https://astro.nvoos.cloud");
var $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ClientRouter;
	const { fallback = "animate" } = Astro.props;
	return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/node_modules/astro/components/ClientRouter.astro", void 0);
// src/lib/store/cart.ts
var STORAGE_KEY = "nvoos-cart-v1";
var SELECTION_STORAGE_KEY = "nvoos-selected-variants";
var SESSION_STORAGE_KEY = "nvoos-cart-session";
var cartLines = map({});
var cartCount = atom(0);
/** Per-product selected variants — survives client-side navigation. */
var selectedVariants = atom({});
/** The client cart-session id (108 Phase 2) — an unguessable per-browser
*  UUID that keys the server-side Woo cart session. Generates once and
*  persists; the same trust level as the Store API's own guest token. */
function getCartSessionId() {
	if (typeof localStorage === "undefined") return "";
	try {
		let session = localStorage.getItem(SESSION_STORAGE_KEY);
		if (!session) {
			session = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
			localStorage.setItem(SESSION_STORAGE_KEY, session);
		}
		return session;
	} catch {
		return "";
	}
}
function recalculate() {
	let count = 0;
	const lines = cartLines.get();
	for (const line of Object.values(lines)) count += line.qty;
	cartCount.set(count);
}
function persist() {
	if (typeof localStorage !== "undefined") try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(cartLines.get()));
	} catch {}
}
function addToCart(line, qty = 1) {
	const existing = cartLines.get()[line.productId];
	if (existing) cartLines.setKey(line.productId, {
		...existing,
		qty: existing.qty + qty
	});
	else cartLines.setKey(line.productId, {
		...line,
		qty
	});
	recalculate();
	persist();
}
function removeFromCart(productId) {
	const next = { ...cartLines.get() };
	delete next[productId];
	cartLines.set(next);
	recalculate();
	persist();
}
function setLineQty(productId, qty) {
	const existing = cartLines.get()[productId];
	if (!existing) return;
	if (qty <= 0) {
		removeFromCart(productId);
		return;
	}
	cartLines.setKey(productId, {
		...existing,
		qty
	});
	recalculate();
	persist();
}
function clearCart() {
	cartLines.set({});
	recalculate();
	persist();
}
/** Restore cart from localStorage — called from islands on mount. */
function loadCartFromStorage() {
	if (typeof localStorage === "undefined") return;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return;
		const parsed = JSON.parse(raw);
		cartLines.set(parsed);
		recalculate();
	} catch {
		clearCart();
	}
}
function persistSelection() {
	if (typeof localStorage !== "undefined") try {
		localStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(selectedVariants.get()));
	} catch {}
}
function selectVariant(productId, selection) {
	selectedVariants.set({
		...selectedVariants.get(),
		[productId]: selection
	});
	persistSelection();
}
/** Restore variant selections from localStorage — called from islands. */
function loadSelectedVariantsFromStorage() {
	if (typeof localStorage === "undefined") return;
	try {
		const raw = localStorage.getItem(SELECTION_STORAGE_KEY);
		if (!raw) return;
		selectedVariants.set(JSON.parse(raw));
	} catch {
		selectedVariants.set({});
	}
}
// src/islands/CartBadge.tsx
function CartBadge() {
	const count = useStore(cartCount);
	useEffect(() => {
		loadCartFromStorage();
	}, []);
	return /* @__PURE__ */ jsxs("a", {
		href: "/cart/",
		className: "cart-badge",
		children: [
			/* @__PURE__ */ jsx("span", { children: "Cart" }),
			count > 0 && /* @__PURE__ */ jsx("span", {
				className: "cart-badge__count",
				children: count
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "sr-only",
				children: ["item", count === 1 ? "" : "s"]
			})
		]
	});
}
// src/islands/ManageLink.tsx
var API_BASE = "/api";
var MANAGE_PATH = "/manage/";
var CACHE_KEY = "nvoos-can-manage";
function ManageLink() {
	const [href, setHref] = useState(null);
	useEffect(() => {
		let cancelled = false;
		try {
			if (sessionStorage.getItem(CACHE_KEY) === "1") setHref(MANAGE_PATH);
		} catch {}
		fetch(`${API_BASE}/auth/me`, {
			headers: { accept: "application/json" },
			credentials: "include"
		}).then(async (res) => {
			const canManage = (res.ok ? await res.json() : null)?.canManage === true;
			if (cancelled) return;
			setHref(canManage ? MANAGE_PATH : null);
			try {
				sessionStorage.setItem(CACHE_KEY, canManage ? "1" : "0");
			} catch {}
		}).catch(() => {});
		return () => {
			cancelled = true;
		};
	}, []);
	if (!href) return null;
	return /* @__PURE__ */ jsx("a", {
		className: "site-nav__manage",
		href,
		children: "Manage store"
	});
}
// src/lib/theme/registry.ts
var ALL_THEMES = adsThemeNames;
// src/components/ThemeToggle.astro
var $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
	const cycleOnly = ALL_THEMES.length <= 3;
	return renderTemplate`${maybeRenderHead($$result)}<div class="theme-toggle" data-theme-toggle-root data-astro-cid-l6lhmie6><button type="button" data-theme-toggle aria-pressed="false"${addAttribute(cycleOnly ? void 0 : "menu", "aria-haspopup")} data-astro-cid-l6lhmie6><span data-theme-label data-astro-cid-l6lhmie6>Theme</span></button>${!cycleOnly && renderTemplate`<ul class="theme-toggle__menu" role="menu" aria-label="Colour theme" hidden data-theme-menu data-astro-cid-l6lhmie6>${ALL_THEMES.map((theme) => renderTemplate`<li role="none" data-astro-cid-l6lhmie6><button type="button" role="menuitemradio" aria-checked="false"${addAttribute(theme, "data-theme-choice")} data-astro-cid-l6lhmie6>${theme}</button></li>`)}</ul>`}<span class="theme-toggle__note" data-theme-forced-note hidden data-astro-cid-l6lhmie6>Theme is set by the store</span></div>${renderScript($$result, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ThemeToggle.astro", void 0);
// src/components/ContrastToggle.astro
var $$ContrastToggle = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="contrast-toggle-root" data-astro-cid-pvu3hltf><button class="contrast-toggle" type="button" data-contrast-toggle aria-label="Toggle high contrast" aria-pressed="false" data-astro-cid-pvu3hltf><span data-contrast-label data-astro-cid-pvu3hltf>Contrast</span></button><span class="contrast-toggle__note" data-contrast-forced-note hidden data-astro-cid-pvu3hltf>Contrast is set by the store</span></div>${renderScript($$result, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ContrastToggle.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ContrastToggle.astro", void 0);
// src/components/ThemeBadge.astro
createAstro("https://astro.nvoos.cloud");
var $$ThemeBadge = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ThemeBadge;
	const { versions } = Astro.props;
	const payload = JSON.stringify(versions);
	return renderTemplate`<script type="application/json" data-theme-versions>${unescapeHTML(payload)}<\/script>${maybeRenderHead($$result)}<span class="theme-badge" data-theme-badge>Theme: light</span><script>
	(function () {
		const readVersions = () => {
			try {
				const node = document.querySelector('script[data-theme-versions]');
				return node ? JSON.parse(node.textContent || '{}') : {};
			} catch {
				/* malformed payload */
			}
			return {};
		};
		const sync = () => {
			const name = document.documentElement.getAttribute('data-theme') || 'light';
			const version = readVersions()[name];
			const badge = document.querySelector('[data-theme-badge]');
			if (badge) {
				badge.textContent =
					'Theme: ' + name + (typeof version === 'string' && version ? ' v' + version : '');
			}
		};
		let observer = null;
		const attach = () => {
			sync();
			if (observer) {
				observer.disconnect();
			}
			// The ClientRouter replaces <html> — the observer dies with the old
			// element, so re-attach after every swap (the 104 Defect A pattern).
			observer = new MutationObserver(sync);
			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ['data-theme'],
			});
		};
		attach();
		document.addEventListener('astro:after-swap', attach);
	})();
<\/script>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ThemeBadge.astro", void 0);
var bundle_generated_default = {
	groups: {
		"component": {
			"$comment": "Proposal 095 — component layer. Consumed by .btn/.card/.field etc. Values reference the semantic layer.",
			"btn": {
				"background": {
					"$type": "color",
					"$value": "{semantic.accent}"
				},
				"color": {
					"$type": "color",
					"$value": "{semantic.accent-ink}"
				},
				"border": {
					"$type": "color",
					"$value": "{semantic.accent}"
				},
				"radius": {
					"$type": "dimension",
					"$value": "{semantic.radius}"
				},
				"padding-y": {
					"$type": "dimension",
					"$value": "0.5rem"
				},
				"padding-x": {
					"$type": "dimension",
					"$value": "1rem"
				}
			},
			"card": {
				"gap": {
					"$type": "dimension",
					"$value": "0.4rem"
				},
				"radius": {
					"$type": "dimension",
					"$value": "{semantic.radius}"
				}
			},
			"field": {
				"border": {
					"$type": "color",
					"$value": "{semantic.line-strong}"
				},
				"radius": {
					"$type": "dimension",
					"$value": "{semantic.radius}"
				},
				"padding-y": {
					"$type": "dimension",
					"$value": "0.5rem"
				}
			}
		},
		"core": {
			"$comment": "Proposal 095 — NV oOS Astro Design System (ADS) core layer. Primitives only: palette, radii, spacing scale, typography. Keep in sync with src/lib/tokens/dtcg.ts validation rules.",
			"palette": {
				"ink": {
					"$type": "color",
					"$value": "#1a1a1a",
					"$description": "Near-black ink (matches the legacy --nv-ink)"
				},
				"muted": {
					"$type": "color",
					"$value": "#6b6b6b",
					"$description": "Muted text (matches the legacy --nv-muted)"
				},
				"surface": {
					"$type": "color",
					"$value": "#ffffff",
					"$description": "Primary surface (matches the legacy --nv-surface)"
				},
				"surface-alt": {
					"$type": "color",
					"$value": "#f5f5f4",
					"$description": "Alternate surface (matches the legacy --nv-surface-alt)"
				},
				"line": {
					"$type": "color",
					"$value": "#e4e4e2",
					"$description": "Hairline/border (matches the legacy --nv-line)"
				},
				"line-strong": {
					"$type": "color",
					"$value": "#767676",
					"$description": "Strong border for form fields (SC 1.4.11 3:1). Additive — not referenced by legacy aliases, so the 092 look is preserved."
				},
				"accent": {
					"$type": "color",
					"$value": "#0f6b4f",
					"$description": "Brand accent (matches the legacy --nv-accent)"
				},
				"accent-ink": {
					"$type": "color",
					"$value": "#ffffff",
					"$description": "Text on accent (matches the legacy --nv-accent-ink)"
				},
				"danger": {
					"$type": "color",
					"$value": "#b3261e",
					"$description": "Danger/promo (matches the legacy --nv-danger)"
				}
			},
			"radius": {
				"sm": {
					"$type": "dimension",
					"$value": "4px"
				},
				"md": {
					"$type": "dimension",
					"$value": "8px",
					"$description": "Matches the legacy --nv-radius"
				}
			},
			"space": {
				"xs": {
					"$type": "dimension",
					"$value": "0.25rem"
				},
				"sm": {
					"$type": "dimension",
					"$value": "0.5rem"
				},
				"md": {
					"$type": "dimension",
					"$value": "1rem",
					"$description": "Matches the legacy --nv-space"
				},
				"lg": {
					"$type": "dimension",
					"$value": "1.5rem"
				},
				"xl": {
					"$type": "dimension",
					"$value": "2rem"
				},
				"xxl": {
					"$type": "dimension",
					"$value": "3rem"
				},
				"gutter-fluid": {
					"$type": "dimension",
					"$value": "clamp(1rem, 0.5rem + 2vw, 2rem)",
					"$description": "Fluid page gutter (Utopia-style clamp). Additive — not referenced by legacy aliases, so the 092 look is preserved."
				}
			},
			"type": {
				"family-body": {
					"$type": "fontFamily",
					"$value": [
						"system-ui",
						"-apple-system",
						"'Segoe UI'",
						"Roboto",
						"sans-serif"
					],
					"$description": "Matches the legacy --nv-font"
				},
				"size-xs": {
					"$type": "dimension",
					"$value": "0.75rem"
				},
				"size-sm": {
					"$type": "dimension",
					"$value": "0.9rem"
				},
				"size-md": {
					"$type": "dimension",
					"$value": "1rem"
				},
				"size-lg": {
					"$type": "dimension",
					"$value": "1.15rem"
				},
				"size-xl": {
					"$type": "dimension",
					"$value": "1.6rem"
				},
				"size-fluid-display": {
					"$type": "dimension",
					"$value": "clamp(1.75rem, 1.2rem + 2.5vw, 2.75rem)",
					"$description": "Fluid display size. Additive — not referenced by legacy aliases."
				},
				"leading-body": {
					"$type": "dimension",
					"$value": "1.6",
					"$description": "Unitless line-height (matches the legacy body line-height)"
				}
			}
		},
		"semantic": {
			"$comment": "Proposal 095 — semantic layer. Components may only reference THIS layer. Values are DTCG references into the core layer (cross-file references are a documented ADS extension) or literal values.",
			"ink": {
				"$type": "color",
				"$value": "{core.palette.ink}"
			},
			"muted": {
				"$type": "color",
				"$value": "{core.palette.muted}"
			},
			"surface": {
				"$type": "color",
				"$value": "{core.palette.surface}"
			},
			"surface-alt": {
				"$type": "color",
				"$value": "{core.palette.surface-alt}"
			},
			"line": {
				"$type": "color",
				"$value": "{core.palette.line}"
			},
			"line-strong": {
				"$type": "color",
				"$value": "{core.palette.line-strong}",
				"$description": "Strong form-field border (SC 1.4.11). Additive."
			},
			"accent": {
				"$type": "color",
				"$value": "{core.palette.accent}"
			},
			"accent-ink": {
				"$type": "color",
				"$value": "{core.palette.accent-ink}"
			},
			"danger": {
				"$type": "color",
				"$value": "{core.palette.danger}"
			},
			"radius": {
				"$type": "dimension",
				"$value": "{core.radius.md}"
			},
			"font": {
				"$type": "fontFamily",
				"$value": "{core.type.family-body}"
			},
			"space": {
				"$type": "dimension",
				"$value": "{core.space.md}"
			},
			"focus-ring": {
				"$type": "dimension",
				"$value": "0 0 0 2px {core.palette.surface}, 0 0 0 4px {core.palette.accent}",
				"$description": "Accessible focus outline (shadow-based). Additive."
			}
		}
	},
	themes: {
		"default": {
			"$comment": "Proposal 095 — default theme: light + dark modes. Mode values override the semantic layer. Dark values are additive (no legacy alias changes, so 092 visuals are unchanged in light mode).",
			"light": {
				"ink": "#1a1a1a",
				"muted": "#6b6b6b",
				"surface": "#ffffff",
				"surface-alt": "#f5f5f4",
				"line": "#e4e4e2",
				"line-strong": "#767676",
				"accent": "#0f6b4f",
				"accent-ink": "#ffffff",
				"danger": "#b3261e"
			},
			"dark": {
				"ink": "#f5f5f4",
				"muted": "#a3a3a3",
				"surface": "#141414",
				"surface-alt": "#1f1f1f",
				"line": "#2e2e2e",
				"line-strong": "#8a8a8a",
				"accent": "#3d9c7d",
				"accent-ink": "#0b0f0d",
				"danger": "#ff6b5e"
			}
		},
		"example-brand": {
			"$comment": "Proposal 095 — example brand theme. Brand themes override semantic tokens only (the 092 Phase 4 rebrand primitive). Applied via data-theme=\"example-brand\".",
			"name": "example-brand",
			"version": "1.0.0",
			"description": "Example brand theme — override semantic tokens only.",
			"tokens": {
				"accent": "#1d4ed8",
				"accent-ink": "#ffffff",
				"surface-alt": "#f0f4ff"
			}
		}
	},
	_resolved: {
		"core": {
			"$comment": "Proposal 095 — NV oOS Astro Design System (ADS) core layer. Primitives only: palette, radii, spacing scale, typography. Keep in sync with src/lib/tokens/dtcg.ts validation rules.",
			"palette": {
				"ink": {
					"$type": "color",
					"$value": "#1a1a1a",
					"$description": "Near-black ink (matches the legacy --nv-ink)"
				},
				"muted": {
					"$type": "color",
					"$value": "#6b6b6b",
					"$description": "Muted text (matches the legacy --nv-muted)"
				},
				"surface": {
					"$type": "color",
					"$value": "#ffffff",
					"$description": "Primary surface (matches the legacy --nv-surface)"
				},
				"surface-alt": {
					"$type": "color",
					"$value": "#f5f5f4",
					"$description": "Alternate surface (matches the legacy --nv-surface-alt)"
				},
				"line": {
					"$type": "color",
					"$value": "#e4e4e2",
					"$description": "Hairline/border (matches the legacy --nv-line)"
				},
				"line-strong": {
					"$type": "color",
					"$value": "#767676",
					"$description": "Strong border for form fields (SC 1.4.11 3:1). Additive — not referenced by legacy aliases, so the 092 look is preserved."
				},
				"accent": {
					"$type": "color",
					"$value": "#0f6b4f",
					"$description": "Brand accent (matches the legacy --nv-accent)"
				},
				"accent-ink": {
					"$type": "color",
					"$value": "#ffffff",
					"$description": "Text on accent (matches the legacy --nv-accent-ink)"
				},
				"danger": {
					"$type": "color",
					"$value": "#b3261e",
					"$description": "Danger/promo (matches the legacy --nv-danger)"
				}
			},
			"radius": {
				"sm": {
					"$type": "dimension",
					"$value": "4px"
				},
				"md": {
					"$type": "dimension",
					"$value": "8px",
					"$description": "Matches the legacy --nv-radius"
				}
			},
			"space": {
				"xs": {
					"$type": "dimension",
					"$value": "0.25rem"
				},
				"sm": {
					"$type": "dimension",
					"$value": "0.5rem"
				},
				"md": {
					"$type": "dimension",
					"$value": "1rem",
					"$description": "Matches the legacy --nv-space"
				},
				"lg": {
					"$type": "dimension",
					"$value": "1.5rem"
				},
				"xl": {
					"$type": "dimension",
					"$value": "2rem"
				},
				"xxl": {
					"$type": "dimension",
					"$value": "3rem"
				},
				"gutter-fluid": {
					"$type": "dimension",
					"$value": "clamp(1rem, 0.5rem + 2vw, 2rem)",
					"$description": "Fluid page gutter (Utopia-style clamp). Additive — not referenced by legacy aliases, so the 092 look is preserved."
				}
			},
			"type": {
				"family-body": {
					"$type": "fontFamily",
					"$value": [
						"system-ui",
						"-apple-system",
						"'Segoe UI'",
						"Roboto",
						"sans-serif"
					],
					"$description": "Matches the legacy --nv-font"
				},
				"size-xs": {
					"$type": "dimension",
					"$value": "0.75rem"
				},
				"size-sm": {
					"$type": "dimension",
					"$value": "0.9rem"
				},
				"size-md": {
					"$type": "dimension",
					"$value": "1rem"
				},
				"size-lg": {
					"$type": "dimension",
					"$value": "1.15rem"
				},
				"size-xl": {
					"$type": "dimension",
					"$value": "1.6rem"
				},
				"size-fluid-display": {
					"$type": "dimension",
					"$value": "clamp(1.75rem, 1.2rem + 2.5vw, 2.75rem)",
					"$description": "Fluid display size. Additive — not referenced by legacy aliases."
				},
				"leading-body": {
					"$type": "dimension",
					"$value": "1.6",
					"$description": "Unitless line-height (matches the legacy body line-height)"
				}
			}
		},
		"semantic": {
			"$comment": "Proposal 095 — semantic layer. Components may only reference THIS layer. Values are DTCG references into the core layer (cross-file references are a documented ADS extension) or literal values.",
			"ink": {
				"$type": "color",
				"$value": "#1a1a1a"
			},
			"muted": {
				"$type": "color",
				"$value": "#6b6b6b"
			},
			"surface": {
				"$type": "color",
				"$value": "#ffffff"
			},
			"surface-alt": {
				"$type": "color",
				"$value": "#f5f5f4"
			},
			"line": {
				"$type": "color",
				"$value": "#e4e4e2"
			},
			"line-strong": {
				"$type": "color",
				"$value": "#767676",
				"$description": "Strong form-field border (SC 1.4.11). Additive."
			},
			"accent": {
				"$type": "color",
				"$value": "#0f6b4f"
			},
			"accent-ink": {
				"$type": "color",
				"$value": "#ffffff"
			},
			"danger": {
				"$type": "color",
				"$value": "#b3261e"
			},
			"radius": {
				"$type": "dimension",
				"$value": "8px"
			},
			"font": {
				"$type": "fontFamily",
				"$value": [
					"system-ui",
					"-apple-system",
					"'Segoe UI'",
					"Roboto",
					"sans-serif"
				]
			},
			"space": {
				"$type": "dimension",
				"$value": "1rem"
			},
			"focus-ring": {
				"$type": "dimension",
				"$value": "#ffffff #0f6b4f",
				"$description": "Accessible focus outline (shadow-based). Additive."
			}
		},
		"component": {
			"$comment": "Proposal 095 — component layer. Consumed by .btn/.card/.field etc. Values reference the semantic layer.",
			"btn": {
				"background": {
					"$type": "color",
					"$value": "#0f6b4f"
				},
				"color": {
					"$type": "color",
					"$value": "#ffffff"
				},
				"border": {
					"$type": "color",
					"$value": "#0f6b4f"
				},
				"radius": {
					"$type": "dimension",
					"$value": "8px"
				},
				"padding-y": {
					"$type": "dimension",
					"$value": "0.5rem"
				},
				"padding-x": {
					"$type": "dimension",
					"$value": "1rem"
				}
			},
			"card": {
				"gap": {
					"$type": "dimension",
					"$value": "0.4rem"
				},
				"radius": {
					"$type": "dimension",
					"$value": "8px"
				}
			},
			"field": {
				"border": {
					"$type": "color",
					"$value": "#767676"
				},
				"radius": {
					"$type": "dimension",
					"$value": "8px"
				},
				"padding-y": {
					"$type": "dimension",
					"$value": "0.5rem"
				}
			}
		}
	}
};
// src/lib/tokens/dtcg.ts
var TOKEN_TYPE_VALIDATORS = {
	color: (value) => {
		if (typeof value !== "string") return false;
		if (/^#[0-9a-fA-F]{3,8}$/.test(value)) return true;
		if (/^rgba?\(\s*[\d.\s,%/-]+\)$/.test(value)) return true;
		if (/^hsla?\(\s*[\d.\s,%/-]+(deg)?\)$/.test(value)) return true;
		return false;
	},
	dimension: (value) => {
		if (typeof value !== "string") return false;
		if (/^-?\d*\.?\d+$/.test(value)) return true;
		if (/^-?\d*\.?\d+(px|rem|em|ch|vw|vh|%)$/.test(value)) return true;
		if (/^clamp\([^;{}()]+\)$/.test(value) && !/[;{}]/.test(value)) return true;
		return false;
	},
	fontFamily: (value) => {
		if (!Array.isArray(value) || value.length === 0 || value.length > 8) return false;
		return value.every((entry) => typeof entry === "string" && entry.length > 0 && entry.length <= 128 && !/[;{}()]/.test(entry) && !/url\s*\(/i.test(entry));
	}
};
var MAX_FILE_BYTES = 262144;
var MAX_TOKENS = 2e3;
function findReferences(value) {
	if (typeof value !== "string") return [];
	const found = [];
	const re = /\{([a-z0-9._-]+)\}/g;
	let match;
	while ((match = re.exec(value)) !== null) found.push(match[1]);
	return found;
}
function validateGroups(groups, report) {
	let count = 0;
	const walk = (node, path) => {
		if (Array.isArray(node)) {
			node.forEach((entry, i) => walk(entry, `${path}[${i}]`));
			return;
		}
		if (node === null || typeof node !== "object") return;
		if (typeof node.$type === "string") {
			const token = node;
			count++;
			if (count > 2e3) {
				report.errors.push(`token count exceeds ${MAX_TOKENS} (found more at ${path})`);
				return;
			}
			const validator = TOKEN_TYPE_VALIDATORS[token.$type];
			if (!validator) {
				report.warnings.push(`unknown $type "${token.$type}" at ${path} — skipped by generators`);
				return;
			}
			if (findReferences(token.$value).length === 0 && !validator(token.$value)) report.errors.push(`invalid $type "${token.$type}" value at ${path}: ${JSON.stringify(token.$value)}`);
			return;
		}
		for (const [key, child] of Object.entries(node)) {
			if (key.startsWith("$")) continue;
			walk(child, `${path}.${key}`);
		}
	};
	for (const [groupName, tree] of Object.entries(groups)) walk(tree, groupName);
}
function validateThemes(themes, semantic, report) {
	for (const [themeName, theme] of Object.entries(themes)) {
		if (themeName === "default") {
			const modes = theme;
			for (const [mode, tokens] of Object.entries(modes)) {
				if (mode.startsWith("$")) continue;
				if (!tokens || typeof tokens !== "object" || Array.isArray(tokens)) {
					report.errors.push(`theme default.${mode} must be an object`);
					continue;
				}
				for (const [name, value] of Object.entries(tokens)) {
					if (name.startsWith("$")) continue;
					if (!(name in semantic)) report.warnings.push(`theme default.${mode}.${name} overrides an unknown semantic token`);
					if (typeof value !== "string" && !Array.isArray(value)) report.errors.push(`theme default.${mode}.${name} must be a string or fontFamily array`);
				}
			}
			continue;
		}
		const tokens = theme.tokens;
		if (!tokens || typeof tokens !== "object" || Array.isArray(tokens)) {
			report.errors.push(`theme "${themeName}" must have a "tokens" object`);
			continue;
		}
		for (const [name, value] of Object.entries(tokens)) {
			if (name.startsWith("$")) continue;
			if (!(name in semantic)) report.warnings.push(`theme ${themeName}.${name} overrides an unknown semantic token`);
			const type = semantic[name]?.$type;
			if (type && !TOKEN_TYPE_VALIDATORS[type](value) && findReferences(value).length === 0) report.errors.push(`theme ${themeName}.${name} invalid for $type "${type}": ${JSON.stringify(value)}`);
		}
	}
}
// src/lib/tokens/persistence.ts
function isPlainObject(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
/**
* Read + parse the persisted design state. Returns null on ANY failure
* (missing file, invalid JSON, wrong shape) — callers fall back to defaults.
*/
function loadDesignState(path) {
	try {
		const parsed = JSON.parse(readFileSync(path, "utf8"));
		if (!isPlainObject(parsed)) return null;
		const overrides = parsed.overrides;
		const activeTheme = parsed.activeTheme;
		const runtimeThemes = parsed.runtimeThemes;
		const snapshots = parsed.snapshots;
		if (!isPlainObject(overrides) || typeof activeTheme !== "string" || !isPlainObject(runtimeThemes) || !Array.isArray(snapshots)) return null;
		for (const value of Object.values(overrides)) if (typeof value !== "string") return null;
		for (const value of Object.values(runtimeThemes)) if (!isPlainObject(value)) return null;
		for (const entry of snapshots) if (!isPlainObject(entry)) return null;
		return {
			overrides,
			activeTheme,
			runtimeThemes,
			snapshots
		};
	} catch {
		return null;
	}
}
/**
* Persist the design state atomically: write `${path}.tmp` then rename over
* the target (same directory, so the rename stays on one volume). Failures
* are warned and swallowed — persistence is best-effort and must never
* surface as a failed tool call.
*/
function saveDesignState(path, state) {
	try {
		mkdirSync(dirname(path), { recursive: true });
		writeFileSync(`${path}.tmp`, JSON.stringify(state, null, "	"));
		renameSync(`${path}.tmp`, path);
	} catch (error) {
		console.warn(`[tokens] failed to persist design state to ${path}: ${error.message}`);
	}
}
// src/lib/tokens/service.ts
function cloneBundle() {
	return JSON.parse(JSON.stringify(bundle_generated_default));
}
function semanticTokensOf(bundleData) {
	const tree = bundleData._resolved.semantic ?? bundleData.groups.semantic ?? {};
	const out = {};
	const walk = (node, parts) => {
		if (node === null || typeof node !== "object") return;
		const token = node;
		if (typeof token.$value === "string" || Array.isArray(token.$value)) {
			out[parts.join(".")] = Array.isArray(token.$value) ? token.$value.join(", ") : token.$value;
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
function hexToRgb(hex) {
	const cleaned = hex.replace("#", "");
	const full = cleaned.length === 3 ? cleaned.split("").map((c) => c + c).join("") : cleaned.length === 6 ? cleaned : "";
	if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
	return [
		parseInt(full.slice(0, 2), 16),
		parseInt(full.slice(2, 4), 16),
		parseInt(full.slice(4, 6), 16)
	];
}
function luminance(hex) {
	const rgb = hexToRgb(hex);
	if (!rgb) return null;
	const [r, g, b] = rgb.map((c) => {
		const s = c / 255;
		return s <= .03928 ? s / 12.92 : Math.pow((s + .055) / 1.055, 2.4);
	});
	return .2126 * r + .7152 * g + .0722 * b;
}
function contrastRatio(fg, bg) {
	const l1 = luminance(fg);
	const l2 = luminance(bg);
	if (l1 === null || l2 === null) return null;
	const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
	return (hi + .05) / (lo + .05);
}
function contrastCheck(fg, bg) {
	const ratio = contrastRatio(fg, bg);
	if (ratio === null) return null;
	return {
		ratio: Math.round(ratio * 100) / 100,
		aaNormal: ratio >= 4.5,
		aaLarge: ratio >= 3,
		aaaNormal: ratio >= 7
	};
}
/**
* The runtime token service. The static generated bundle is immutable; MCP
* writes land in an override layer (snapshotted, rollback-able) that is
* merged over the bundle when resolving the active semantic set.
*/
var TokenService = class {
	bundle;
	persistPath;
	overrides = {};
	activeTheme = "light";
	runtimeThemes = {};
	snapshots = [];
	constructor(bundleData, options) {
		this.bundle = bundleData ?? cloneBundle();
		this.persistPath = options?.persistPath ?? process.env.NVOOS_MCP_STATE_FILE ?? null;
		if (this.persistPath) {
			const persisted = loadDesignState(this.persistPath);
			if (persisted) this.hydrate(persisted);
		}
	}
	/**
	* Adopt persisted state — only the fields the loaded shape carries.
	* Runtime themes hydrate before the active theme so the theme gate can
	* verify it still resolves; snapshots keep the same 50-entry cap as
	* takeSnapshot.
	*/
	hydrate(persisted) {
		if (persisted.overrides && typeof persisted.overrides === "object") this.overrides = { ...persisted.overrides };
		if (persisted.runtimeThemes && typeof persisted.runtimeThemes === "object") this.runtimeThemes = JSON.parse(JSON.stringify(persisted.runtimeThemes));
		if (Array.isArray(persisted.snapshots)) {
			this.snapshots = JSON.parse(JSON.stringify(persisted.snapshots));
			if (this.snapshots.length > 50) this.snapshots = this.snapshots.slice(-50);
		}
		if (typeof persisted.activeTheme === "string" && this.themeDescriptor(persisted.activeTheme)) this.activeTheme = persisted.activeTheme;
	}
	/**
	* Persist the current design state (best-effort). Called only after a
	* successful mutation — rejected writes and dry runs never reach here.
	* Snapshot entries mirror takeSnapshot's shape (overrides, activeTheme,
	* runtimeThemes, takenAt, id).
	*/
	persist() {
		if (!this.persistPath) return;
		saveDesignState(this.persistPath, {
			overrides: { ...this.overrides },
			activeTheme: this.activeTheme,
			runtimeThemes: JSON.parse(JSON.stringify(this.runtimeThemes)),
			snapshots: this.snapshots.map((snapshot) => JSON.parse(JSON.stringify(snapshot)))
		});
	}
	groups() {
		return this.bundle.groups;
	}
	/** Resolved group trees (reference-free) — what /tokens and MCP display. */
	resolvedGroups() {
		return this.bundle._resolved ?? this.bundle.groups;
	}
	themes() {
		return this.bundle.themes;
	}
	listThemes() {
		return [
			"light",
			"dark",
			...Object.keys(this.bundle.themes).filter((n) => n !== "default"),
			...Object.keys(this.runtimeThemes)
		];
	}
	getActiveTheme() {
		return this.activeTheme;
	}
	themeDescriptor(name) {
		if (name === "light" || name === "dark") return {
			name,
			tokens: (this.bundle.themes.default ?? {})[name] ?? {}
		};
		const staticTheme = this.bundle.themes[name];
		if (staticTheme?.tokens) return {
			name,
			description: staticTheme.description,
			version: typeof staticTheme.version === "string" ? staticTheme.version : void 0,
			tokens: staticTheme.tokens
		};
		return this.runtimeThemes[name] ?? null;
	}
	/**
	* Resolved semantic values for the active theme + override layer.
	*/
	resolveActiveSemantic() {
		const base = semanticTokensOf(this.bundle);
		const themeTokens = this.themeDescriptor(this.activeTheme)?.tokens ?? {};
		return {
			...base,
			...themeTokens,
			...this.overrides
		};
	}
	applyOverrides(changes, dryRun = false) {
		const semantic = this.bundle.groups.semantic ?? {};
		const report = {
			errors: [],
			warnings: []
		};
		const diff = [];
		const next = { ...this.overrides };
		for (const [name, value] of Object.entries(changes)) {
			const semanticToken = semantic[name];
			if (!semanticToken?.$type) {
				report.errors.push(`unknown semantic token: ${name}`);
				continue;
			}
			const type = semanticToken.$type;
			if (!validateGroupValue(type, value) && findReferences(value).length === 0) {
				report.errors.push(`invalid value for ${name} ($type "${type}"): ${JSON.stringify(value)}`);
				continue;
			}
			const before = this.resolveActiveSemantic()[name] ?? "";
			diff.push({
				name,
				before,
				after: value
			});
			next[name] = value;
		}
		if (report.errors.length > 0) return {
			applied: false,
			report,
			diff: []
		};
		if (dryRun) return {
			applied: false,
			report,
			diff
		};
		const snapshotId = this.takeSnapshot();
		this.overrides = next;
		this.persist();
		return {
			applied: true,
			report,
			diff,
			snapshotId
		};
	}
	importDTCG(input, dryRun = false) {
		const report = {
			errors: [],
			warnings: []
		};
		let parsed;
		try {
			parsed = typeof input === "string" ? JSON.parse(input) : input;
		} catch (error) {
			report.errors.push(`invalid JSON: ${error.message}`);
			return {
				applied: false,
				report,
				diff: []
			};
		}
		if (JSON.stringify(parsed).length > 262144) {
			report.errors.push(`import exceeds ${MAX_FILE_BYTES} bytes`);
			return {
				applied: false,
				report,
				diff: []
			};
		}
		const groups = parsed.groups && typeof parsed.groups === "object" ? parsed.groups : parsed;
		validateGroups(groups, report);
		validateThemes(parsed.themes && typeof parsed.themes === "object" ? parsed.themes : {}, groups.semantic ?? {}, report);
		if (report.errors.length > 0) return {
			applied: false,
			report,
			diff: [],
			parsed
		};
		const semanticTree = groups.semantic ?? {};
		const changes = {};
		const walk = (node, parts) => {
			if (node === null || typeof node !== "object") return;
			const token = node;
			if (typeof token.$value === "string") {
				changes[parts.join(".")] = token.$value;
				return;
			}
			for (const [key, child] of Object.entries(node)) {
				if (key.startsWith("$")) continue;
				walk(child, [...parts, key]);
			}
		};
		walk(semanticTree, []);
		return {
			...this.applyOverrides(changes, dryRun),
			parsed
		};
	}
	takeSnapshot() {
		const id = `snap-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
		this.snapshots.push({
			id,
			takenAt: (/* @__PURE__ */ new Date()).toISOString(),
			overrides: { ...this.overrides },
			activeTheme: this.activeTheme,
			runtimeThemes: JSON.parse(JSON.stringify(this.runtimeThemes))
		});
		if (this.snapshots.length > 50) this.snapshots.shift();
		return id;
	}
	listSnapshots() {
		return [...this.snapshots].reverse();
	}
	rollback(snapshotId) {
		const target = snapshotId ? this.snapshots.find((s) => s.id === snapshotId) : this.snapshots[this.snapshots.length - 1];
		if (!target) return {
			ok: false,
			message: "no snapshot to roll back to"
		};
		this.overrides = { ...target.overrides };
		this.activeTheme = target.activeTheme;
		this.runtimeThemes = JSON.parse(JSON.stringify(target.runtimeThemes));
		this.persist();
		return {
			ok: true,
			message: `rolled back to ${target.id}`
		};
	}
	applyTheme(name) {
		if (!this.themeDescriptor(name)) return {
			ok: false,
			message: `unknown theme: ${name}`
		};
		const snapshotId = this.takeSnapshot();
		this.activeTheme = name;
		this.persist();
		return {
			ok: true,
			message: `active theme is now ${name}`,
			snapshotId
		};
	}
	createTheme(descriptor) {
		const report = {
			errors: [],
			warnings: []
		};
		if (!/^[a-z0-9-]+$/.test(descriptor.name) || ["light", "dark"].includes(descriptor.name)) {
			report.errors.push(`invalid theme name: ${descriptor.name}`);
			return {
				applied: false,
				report,
				diff: []
			};
		}
		validateThemes({ [descriptor.name]: { tokens: descriptor.tokens } }, this.bundle.groups.semantic ?? {}, report);
		if (report.errors.length > 0) return {
			applied: false,
			report,
			diff: []
		};
		const snapshotId = this.takeSnapshot();
		this.runtimeThemes[descriptor.name] = descriptor;
		this.persist();
		return {
			applied: true,
			report,
			diff: [],
			snapshotId
		};
	}
	deleteTheme(name) {
		if (name in (this.bundle.themes ?? {})) return {
			ok: false,
			message: `static theme "${name}" cannot be deleted at runtime`
		};
		if (!(name in this.runtimeThemes)) return {
			ok: false,
			message: `unknown theme: ${name}`
		};
		const snapshotId = this.takeSnapshot();
		delete this.runtimeThemes[name];
		if (this.activeTheme === name) this.activeTheme = "light";
		this.persist();
		return {
			ok: true,
			message: `theme "${name}" deleted`,
			snapshotId
		};
	}
};
function validateGroupValue(type, value) {
	const validator = TOKEN_TYPE_VALIDATORS[type];
	return validator ? validator(value) : false;
}
var defaultTokenService = new TokenService();
// src/lib/version.ts
var APP_VERSION = "0.4.2";
// src/lib/webfonts.ts
/** Families that render locally — never worth a Google Fonts request. */
var SYSTEM_FONT_RE = /^(system-ui|ui-sans-serif|ui-serif|ui-monospace|sans-serif|serif|monospace|cursive|fantasy|arial|helvetica|georgia|times|garamond|courier|verdana|tahoma|trebuchet|segoe|menlo|consolas|impact)$/i;
/** Collect the distinct named (non-system) families from token values.
*  CSS stacks ("a, b") are skipped — they are fallback lists, not a single
*  harvestable family. */
function webfontFamilies(values) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const entry of values) {
		const list = Array.isArray(entry) ? entry : entry ? [entry] : [];
		for (const raw of list) {
			const family = (raw ?? "").trim().replace(/^['"]|['"]$/g, "");
			if (!family || family.includes(",") || SYSTEM_FONT_RE.test(family)) continue;
			const key = family.toLowerCase();
			if (!seen.has(key)) {
				seen.add(key);
				out.push(family);
			}
		}
	}
	return out;
}
/** The Google Fonts CSS2 URL for the given families, or undefined when
*  there is nothing to load (the hermetic default: system stacks). */
function googleFontsUrl(families, weights = [
	300,
	400,
	500,
	600,
	700
]) {
	if (families.length === 0) return;
	return `https://fonts.googleapis.com/css2?${families.map((family) => `family=${encodeURIComponent(family)}:wght@${weights.join(";")}`).join("&")}&display=swap`;
}
// src/layouts/BaseLayout.astro
createAstro("https://astro.nvoos.cloud");
var $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const { title, description, canonical, image, jsonld = [] } = Astro.props;
	const policyDoc = await getThemePolicy(Astro.url);
	const resolved = resolvePolicyTheme(policyDoc, null, null, ALL_THEMES);
	const policyPayload = JSON.stringify({
		doc: policyDoc,
		resolved,
		registry: ALL_THEMES
	});
	const themeVersions = {};
	for (const name of defaultTokenService.listThemes()) {
		const descriptor = defaultTokenService.themeDescriptor(name);
		themeVersions[name] = typeof descriptor?.version === "string" ? descriptor.version : null;
	}
	const webfontUrl = googleFontsUrl(webfontFamilies([semantic.font]));
	return renderTemplate`<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>${title}</title>${description && renderTemplate`<meta name="description"${addAttribute(description, "content")}>`}${canonical && renderTemplate`<link rel="canonical"${addAttribute(canonical, "href")}>`}${image && renderTemplate`<meta property="og:image"${addAttribute(image, "content")}>`}${jsonld.map((block) => renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify(block))}<\/script>`)}<link rel="icon" href="/favicon.svg" type="image/svg+xml">${webfontUrl && renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate`<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet"${addAttribute(webfontUrl, "href")}>` })}`}<!-- Theme-policy payload (105 §3): JSON data block, no event handlers —
		     the boot script and the toggles read it via [data-theme-policy]. --><script type="application/json" data-theme-policy>${unescapeHTML(policyPayload)}<\/script><script>
			// ADS no-FOUC theme boot (Proposal 095/104/105): resolve the theme
			// + contrast axes before first paint, then RE-APPLY on every
			// client-side navigation — Astro's ClientRouter swaps the <html>
			// element (attributes included) and head scripts run only once,
			// so without the after-swap listener the theme resets to light on
			// page 2 (Proposal 104 Defect A; Astro docs' dark-mode pattern).
			//
			// Policy ladder (105 §3): a FORCED policy theme wins over storage;
			// auto keeps the 104 ladder (storage → media → defaultTheme).
			// Contrast mirrors it (forced axis or stored → standard).
			(function () {
				const KEY = 'nvoos-theme';
				const CKEY = 'nvoos-contrast';
				const stored = (key) => {
					try {
						return localStorage.getItem(key);
					} catch { /* storage unavailable */ }
					return null;
				};
				const readPolicy = () => {
					try {
						const node = document.querySelector('script[data-theme-policy]');
						return node ? JSON.parse(node.textContent || 'null') : null;
					} catch { /* malformed policy payload */ }
					return null;
				};
				const apply = () => {
					const policy = readPolicy();
					const doc = policy && policy.doc ? policy.doc : { defaultTheme: 'dark', contrast: 'auto' };
					const resolved = policy && policy.resolved ? policy.resolved : null;
					const registry = policy && Array.isArray(policy.registry) ? policy.registry : [];
					let theme = null;
					if (resolved && resolved.forced) {
						theme = resolved.theme;
					} else {
						const saved = stored(KEY);
						if (saved === 'light' || registry.indexOf(saved) !== -1) {
							theme = saved;
						}
					}
					if (!theme) {
						const media = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)');
						theme = media ? (media.matches ? 'light' : 'dark') : (doc.defaultTheme || 'dark');
					}
					if (theme === 'light') {
						document.documentElement.removeAttribute('data-theme');
					} else {
						document.documentElement.setAttribute('data-theme', theme);
					}
					document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
					const contrast =
						resolved && resolved.contrastForced
							? resolved.contrast
							: stored(CKEY) === 'high'
								? 'high'
								: 'standard';
					if (contrast === 'high') {
						document.documentElement.setAttribute('data-contrast', 'high');
					} else {
						document.documentElement.removeAttribute('data-contrast');
					}
				};
				apply();
				// document survives the swap; the element does not.
				document.addEventListener('astro:after-swap', apply);
			})();
		<\/script>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderScript($$result, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")}${renderSlot($$result, $$slots["head"])}${renderHead($$result)}</head><body><header class="site-header"><div class="container site-header__inner"><a class="site-header__brand" href="/">NV Store</a><nav class="site-nav" aria-label="Primary"><a href="/products/">Products</a><a href="/categories/">Categories</a><a href="/brands/">Brands</a><a href="/blog/">Blog</a><a href="/promotions/">Promotions</a><a href="/account/">Account</a></nav>${renderComponent($$result, "CartBadge", CartBadge, {
		"client:load": true,
		"data-astro-transition-persist": createTransitionScope($$result, "nfpogox7"),
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/islands/CartBadge.tsx",
		"client:component-export": "default"
	})}${renderComponent($$result, "ThemeToggle", $$ThemeToggle, {})}${renderComponent($$result, "ContrastToggle", $$ContrastToggle, {})}${renderComponent($$result, "ManageLink", ManageLink, {
		"client:load": true,
		"data-astro-transition-persist": createTransitionScope($$result, "wugk46rw"),
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/islands/ManageLink.tsx",
		"client:component-export": "default"
	})}</div></header><main class="container">${renderSlot($$result, $$slots["default"])}</main><footer class="site-footer"><div class="container"><p>NV Store v${APP_VERSION} — an NV-authored, MIT-licensed Astro storefront (Proposal 092). <a href="/about">About</a> · <a href="/terms">Terms</a>${" "}·${" "}<a href="https://github.com/nvdigitalsolutions/nvoos-astro-velocity" rel="noopener noreferrer">Source</a>${" "}· ${renderComponent($$result, "ThemeBadge", $$ThemeBadge, { "versions": themeVersions })}</p></div></footer></body></html>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/layouts/BaseLayout.astro", void 0);
export { cartLines as a, loadCartFromStorage as c, selectVariant as d, selectedVariants as f, addToCart as i, loadSelectedVariantsFromStorage as l, renderScript as m, TokenService as n, clearCart as o, setLineQty as p, contrastCheck as r, getCartSessionId as s, $$BaseLayout as t, removeFromCart as u };
