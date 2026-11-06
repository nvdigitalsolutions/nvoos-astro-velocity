import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { h as maybeRenderHead, m as renderTemplate, s as renderComponent } from "./server_oTayxuEg.mjs";
import { t as createComponent } from "./astro-component_DkgBvFJz.mjs";
import { t as createAstro } from "./astro-global_CZt7TqFY.mjs";
import { t as $$BaseLayout } from "./BaseLayout_B1AMrDC3.mjs";
import "./compiler_CWCzah9E.mjs";
import { n as pageTitle } from "./meta_BE8QV8yn.mjs";
import { o as parseThanksParams } from "./checkout-api_DcM6ZHhu.mjs";
// src/pages/checkout/thanks.astro
var thanks_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Thanks,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.nvoos.cloud");
var $$Thanks = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Thanks;
	const { orderId, orderKey } = parseThanksParams(Astro.url.searchParams);
	Astro.response.headers.set("Cache-Control", "no-store");
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": pageTitle("Order received"),
		"description": "Your order is confirmed — keep shopping on the NV Store.",
		"data-astro-cid-7how65dx": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<article class="thanks" data-astro-cid-7how65dx><h1 data-thanks-heading data-astro-cid-7how65dx>Thank you for your order</h1><p class="lede" data-thanks-order data-astro-cid-7how65dx>Your order is confirmed. A confirmation email is on its way from the store.</p>${orderId !== null && renderTemplate`<p class="ref" data-astro-cid-7how65dx>Order reference: <strong data-astro-cid-7how65dx>#${orderId}</strong>${orderKey !== null && renderTemplate`<span class="ref__key" data-astro-cid-7how65dx> · ${orderKey.slice(0, 8)}…</span>`}</p>`}<p data-astro-cid-7how65dx><a class="btn" href="/products/" data-astro-cid-7how65dx>Continue shopping</a>${" "}<a href="/account/" data-astro-cid-7how65dx>Manage your account</a></p></article>` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/checkout/thanks.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/checkout/thanks.astro";
var $$url = "/checkout/thanks/";
// \0virtual:astro:page:src/pages/checkout/thanks@_@astro
var page = () => thanks_exports;
export { page };
