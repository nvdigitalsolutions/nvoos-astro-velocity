import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Bp-6qVas.mjs";
import { t as createComponent } from "./astro-component_D398hF7X.mjs";
import { a as removeFromCart, i as loadCartFromStorage, n as cartLines, o as setLineQty, r as clearCart, t as $$BaseLayout } from "./BaseLayout_Bwncmh8b.mjs";
import "./compiler_D-8-28NN.mjs";
import { t as pageTitle } from "./meta_BHXnqtiS.mjs";
import { t as formatPrice } from "./money_DMMYxaSG.mjs";
import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { jsx, jsxs } from "react/jsx-runtime";
// src/islands/CartView.tsx
function CartView() {
	const lines = useStore(cartLines);
	useEffect(() => {
		loadCartFromStorage();
	}, []);
	const entries = Object.values(lines);
	if (entries.length === 0) return /* @__PURE__ */ jsx("p", { children: "Your cart is empty." });
	return /* @__PURE__ */ jsxs("div", {
		className: "cart",
		children: [
			/* @__PURE__ */ jsx("ul", {
				className: "cart__lines",
				children: entries.map((line) => /* @__PURE__ */ jsxs("li", {
					className: "cart__line",
					children: [
						line.image && /* @__PURE__ */ jsx("img", {
							src: line.image,
							alt: "",
							width: "72",
							height: "90",
							loading: "lazy"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "cart__line-info",
							children: [/* @__PURE__ */ jsx("span", {
								className: "cart__line-name",
								children: line.name
							}), /* @__PURE__ */ jsx("span", { children: formatPrice(line.price) })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "cart__line-qty",
							children: [/* @__PURE__ */ jsx("label", {
								htmlFor: `qty-${line.productId}`,
								className: "sr-only",
								children: "Quantity"
							}), /* @__PURE__ */ jsx("input", {
								id: `qty-${line.productId}`,
								type: "number",
								min: "1",
								value: line.qty,
								onChange: (event) => setLineQty(line.productId, Number(event.target.value))
							})]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn btn--ghost",
							onClick: () => removeFromCart(line.productId),
							children: "Remove"
						})
					]
				}, line.productId))
			}),
			/* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("strong", { children: [
				"Total:",
				" ",
				formatPrice(entries.reduce((sum, line) => sum + line.price * line.qty, 0))
			] }) }),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn--ghost",
				onClick: clearCart,
				children: "Clear cart"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "cart__note",
				children: "Checkout is not available in this store yet — the cart is display-only."
			})
		]
	});
}
// src/pages/cart/index.astro
var cart_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": pageTitle("Cart") }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1>Cart</h1>${renderComponent($$result, "CartView", CartView, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/islands/CartView.tsx",
		"client:component-export": "default"
	})}` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/cart/index.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/cart/index.astro";
var $$url = "/cart/";
// \0virtual:astro:page:src/pages/cart/index@_@astro
var page = () => cart_exports;
export { page };
