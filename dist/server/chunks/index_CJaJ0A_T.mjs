import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Bp-6qVas.mjs";
import { t as createComponent } from "./astro-component_D398hF7X.mjs";
import { t as $$BaseLayout } from "./BaseLayout_Bwncmh8b.mjs";
import "./compiler_D-8-28NN.mjs";
import { t as pageTitle } from "./meta_BHXnqtiS.mjs";
import { t as AuthForms } from "./AuthForms_Bw4nt77c.mjs";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
// src/islands/AccountGate.tsx
var API_BASE = "/api";
function AccountGate() {
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
	if (me.loading) return /* @__PURE__ */ jsx("p", { children: "Loading account…" });
	if (me.customer) return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", { children: [
		"Signed in as ",
		/* @__PURE__ */ jsx("strong", { children: me.customer.name }),
		" (",
		me.customer.email,
		")."
	] }), /* @__PURE__ */ jsx(LogoutButton, {})] });
	return /* @__PURE__ */ jsx(AuthForms, { onAuthed: (customer) => setMe({
		loading: false,
		customer
	}) });
}
function LogoutButton() {
	const logout = async () => {
		await fetch(`${API_BASE}/auth/logout`, {
			method: "POST",
			credentials: "include"
		});
		window.location.reload();
	};
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		className: "btn btn--ghost",
		onClick: logout,
		children: "Sign out"
	});
}
// src/pages/account/index.astro
var account_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": pageTitle("Account") }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1>Account</h1>${renderComponent($$result, "AccountGate", AccountGate, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/islands/AccountGate.tsx",
		"client:component-export": "default"
	})}` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/account/index.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/account/index.astro";
var $$url = "/account/";
// \0virtual:astro:page:src/pages/account/index@_@astro
var page = () => account_exports;
export { page };
