import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { f as renderHead, i as renderComponent, u as renderTemplate } from "./server_Bp-6qVas.mjs";
import { t as createComponent } from "./astro-component_D398hF7X.mjs";
import "./compiler_D-8-28NN.mjs";
import { t as AuthForms } from "./AuthForms_Bw4nt77c.mjs";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
// src/lib/manage-config.ts
/**
* Build the admin bundle config for a confirmed manager session.
*/
function buildAdminConfig(customer, nonce, apiBase) {
	return {
		root: apiBase,
		mediaBase: "/media/",
		nonce,
		user: {
			canManage: customer?.canManage ?? false,
			capabilities: customer?.capabilities ?? [],
			readOnlyCollections: customer?.readOnlyCollections ?? []
		}
	};
}
// src/islands/ManageGate.tsx
var API_BASE = "/api";
var BUNDLE_SRC = "/manage-assets/astro-admin.js";
function ManageGate() {
	const [me, setMe] = useState({
		loading: true,
		customer: null
	});
	useEffect(() => {
		fetch(`${API_BASE}/auth/me`, {
			headers: { accept: "application/json" },
			credentials: "include"
		}).then(async (res) => {
			if (res.ok) setMe({
				loading: false,
				customer: await res.json()
			});
			else setMe({
				loading: false,
				customer: null
			});
		}).catch(() => setMe({
			loading: false,
			customer: null
		}));
	}, []);
	useEffect(() => {
		if (me.loading || !me.customer?.canManage) return;
		let cancelled = false;
		const boot = async () => {
			let nonce = "";
			try {
				const nonceRes = await fetch(`${API_BASE}/auth/nonce`, {
					headers: { accept: "application/json" },
					credentials: "include"
				});
				if (nonceRes.ok) nonce = (await nonceRes.json()).nonce || "";
			} catch {}
			if (cancelled) return;
			window.AstroAdminConfig = buildAdminConfig(me.customer, nonce, API_BASE);
			window.wpApiSettings = {
				root: API_BASE,
				nonce
			};
			const script = document.createElement("script");
			script.src = BUNDLE_SRC;
			script.defer = true;
			document.body.appendChild(script);
		};
		boot();
		return () => {
			cancelled = true;
		};
	}, [me]);
	if (me.loading) return /* @__PURE__ */ jsx("p", {
		className: "manage__state",
		children: "Loading…"
	});
	if (!me.customer) return /* @__PURE__ */ jsxs("div", {
		className: "manage__auth",
		children: [/* @__PURE__ */ jsx("h1", { children: "Manage store" }), /* @__PURE__ */ jsx(AuthForms, {
			loginOnly: true,
			onAuthed: (customer) => setMe({
				loading: false,
				customer
			})
		})]
	});
	if (!me.customer.canManage) return /* @__PURE__ */ jsxs("div", {
		className: "manage__state",
		children: [
			/* @__PURE__ */ jsx("h1", { children: "Manage store" }),
			/* @__PURE__ */ jsx("p", {
				role: "alert",
				children: "Your account does not have permission to manage this store."
			}),
			/* @__PURE__ */ jsx("a", {
				className: "btn",
				href: "/",
				children: "Back to the store"
			})
		]
	});
	return /* @__PURE__ */ jsx("div", {
		className: "manage",
		children: /* @__PURE__ */ jsx("div", { id: "astro-admin-root" })
	});
}
// src/pages/manage/index.astro
var manage_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="robots" content="noindex, nofollow"><title>Manage store — NV Store</title><link rel="stylesheet" href="/manage-assets/astro-admin.css">${renderHead($$result)}</head><body>${renderComponent($$result, "ManageGate", ManageGate, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/islands/ManageGate.tsx",
		"client:component-export": "default"
	})}</body></html>`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/manage/index.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/manage/index.astro";
var $$url = "/manage/";
// \0virtual:astro:page:src/pages/manage/index@_@astro
var page = () => manage_exports;
export { page };
