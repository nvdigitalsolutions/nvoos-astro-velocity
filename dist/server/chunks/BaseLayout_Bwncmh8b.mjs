import { b as unescapeHTML, d as maybeRenderHead, f as renderHead, i as renderComponent, m as createRenderInstruction, p as addAttribute, s as renderSlot, t as createTransitionScope, u as renderTemplate } from "./server_Bp-6qVas.mjs";
import { t as createComponent } from "./astro-component_D398hF7X.mjs";
import { t as createAstro } from "./astro-global_Q8FhgS3w.mjs";
import "./compiler_D-8-28NN.mjs";
import { useEffect, useState } from "react";
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
var cartLines = map({});
var cartCount = atom(0);
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
// src/islands/CartBadge.tsx
function CartBadge() {
	const count = useStore(cartCount);
	useEffect(() => {
		loadCartFromStorage();
	}, []);
	return /* @__PURE__ */ jsxs("a", {
		href: "/cart/",
		className: "cart-badge",
		"aria-label": `Cart, ${count} item${count === 1 ? "" : "s"}`,
		children: [/* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			children: "Cart"
		}), count > 0 && /* @__PURE__ */ jsx("span", {
			className: "cart-badge__count",
			children: count
		})]
	});
}
// src/islands/ManageLink.tsx
var API_BASE = "/api";
var MANAGE_PATH = "/manage/";
function ManageLink() {
	const [href, setHref] = useState(null);
	useEffect(() => {
		let cancelled = false;
		fetch(`${API_BASE}/auth/me`, {
			headers: { accept: "application/json" },
			credentials: "include"
		}).then(async (res) => {
			if (!res.ok) return;
			const me = await res.json();
			if (cancelled || !me.canManage) return;
			setHref(MANAGE_PATH);
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
// src/components/ThemeToggle.astro
var $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch colour theme" data-astro-cid-l6lhmie6><span data-theme-label data-astro-cid-l6lhmie6>Theme</span></button>${renderScript($$result, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ThemeToggle.astro", void 0);
// src/layouts/BaseLayout.astro
createAstro("https://astro.nvoos.cloud");
var $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const { title, description, canonical, image, jsonld = [] } = Astro.props;
	return renderTemplate`<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>${title}</title>${description && renderTemplate`<meta name="description"${addAttribute(description, "content")}>`}${canonical && renderTemplate`<link rel="canonical"${addAttribute(canonical, "href")}>`}${image && renderTemplate`<meta property="og:image"${addAttribute(image, "content")}>`}${jsonld.map((block) => renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify(block))}<\/script>`)}<link rel="icon" href="/favicon.svg" type="image/svg+xml"><script>
			// ADS no-FOUC theme boot (Proposal 095): set data-theme before first
			// paint so dark/brand themes never flash (Starlight pattern).
			(function () {
				let stored = null;
				try {
					stored = localStorage.getItem('nvoos-theme');
				} catch { /* storage unavailable */ }
				const theme =
					stored ||
					(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
						? 'light'
						: 'dark');
				if (theme && theme !== 'light') {
					document.documentElement.setAttribute('data-theme', theme);
				}
			})();
		<\/script>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderScript($$result, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")}${renderSlot($$result, $$slots["head"])}${renderHead($$result)}</head><body><header class="site-header"><div class="container site-header__inner"><a class="site-header__brand" href="/">NV Store</a><nav class="site-nav" aria-label="Primary"><a href="/categories/">Categories</a><a href="/brands/">Brands</a><a href="/promotions/">Promotions</a><a href="/account/">Account</a></nav>${renderComponent($$result, "CartBadge", CartBadge, {
		"client:load": true,
		"data-astro-transition-persist": createTransitionScope($$result, "nfpogox7"),
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/islands/CartBadge.tsx",
		"client:component-export": "default"
	})}${renderComponent($$result, "ThemeToggle", $$ThemeToggle, {})}${renderComponent($$result, "ManageLink", ManageLink, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/islands/ManageLink.tsx",
		"client:component-export": "default"
	})}</div></header><main class="container">${renderSlot($$result, $$slots["default"])}</main><footer class="site-footer"><div class="container"><p>NV Store — an NV-authored, MIT-licensed Astro storefront (Proposal 092). <a href="/about">About</a> · <a href="/terms">Terms</a></p></div></footer></body></html>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/layouts/BaseLayout.astro", void 0);
export { removeFromCart as a, loadCartFromStorage as i, cartLines as n, setLineQty as o, clearCart as r, $$BaseLayout as t };
