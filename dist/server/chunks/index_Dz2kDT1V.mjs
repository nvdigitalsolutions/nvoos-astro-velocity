import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { h as maybeRenderHead, m as renderTemplate, s as renderComponent } from "./server_oTayxuEg.mjs";
import { t as createComponent } from "./astro-component_DkgBvFJz.mjs";
import { t as createAstro } from "./astro-global_CZt7TqFY.mjs";
import { a as cartLines, c as loadCartFromStorage, o as clearCart, p as setLineQty, s as getCartSessionId, t as $$BaseLayout, u as removeFromCart } from "./BaseLayout_B1AMrDC3.mjs";
import "./compiler_CWCzah9E.mjs";
import { g as getShop } from "./client_TtS43Z5n.mjs";
import { n as pageTitle } from "./meta_BE8QV8yn.mjs";
import { t as formatPrice } from "./money_D3wLOywT.mjs";
import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { jsx, jsxs } from "react/jsx-runtime";
import { z } from "zod";
// src/lib/commerce/checkout.ts
/** Build the Woo checkout URL from the cart lines (106 §4). */
function buildCheckoutUrl(shop, lines) {
	const simpleIds = [];
	let variantCount = 0;
	for (const line of lines) if (line.variantId === void 0 || line.variantId === null) simpleIds.push(line.productId);
	else variantCount += 1;
	const base = shop.checkoutUrl ?? "";
	if (!base || simpleIds.length === 0) return {
		url: null,
		simpleIds,
		variantCount
	};
	return {
		url: `${base}${base.includes("?") ? "&" : "?"}add-to-cart=${simpleIds.join(",")}`,
		simpleIds,
		variantCount
	};
}
// src/lib/commerce/cart-api.ts
/** The normalized server-cart shape the bridge returns (108 §2). */
var serverCartSchema = z.object({
	session: z.string(),
	items: z.array(z.object({
		key: z.string(),
		productId: z.number().int().positive(),
		name: z.string(),
		qty: z.number().int().nonnegative(),
		price: z.number()
	})),
	totals: z.object({
		totalItems: z.number().int().nonnegative(),
		totalPrice: z.string()
	}),
	notices: z.array(z.object({
		type: z.string(),
		text: z.string()
	}))
});
/** POST the local cart lines to the bridge cart proxy.
*
*  @param session The client cart-session id (localStorage UUID).
*  @param lines   The local cart lines (variants carry attributes).
*  @param coupon  Optional coupon code to apply server-side.
*/
async function syncServerCart(session, lines, coupon = null) {
	let res;
	try {
		res = await fetch("/api/cart/sync", {
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
				"x-nvoos-cart-session": session
			},
			body: JSON.stringify({
				lines: lines.map((line) => ({
					productId: line.productId,
					qty: line.qty,
					attributes: line.attributes ?? []
				})),
				...coupon ? { coupon } : {}
			})
		});
	} catch {
		return {
			ok: false,
			error: "The server cart is unreachable."
		};
	}
	const payload = await res.json().catch(() => null);
	if (!res.ok) return {
		ok: false,
		error: typeof payload === "object" && payload !== null && typeof payload.message === "string" ? payload.message : `Cart sync failed (${res.status}).`
	};
	const parsed = serverCartSchema.safeParse(payload);
	if (!parsed.success) return {
		ok: false,
		error: "The server cart response was malformed."
	};
	return {
		ok: true,
		cart: parsed.data
	};
}
// src/islands/CartView.tsx
function CartView({ shop }) {
	const lines = useStore(cartLines);
	const [syncState, setSyncState] = useState("idle");
	const [syncError, setSyncError] = useState("");
	useEffect(() => {
		loadCartFromStorage();
		document.querySelector("[data-cart-root]")?.setAttribute("data-hydrated", "true");
	}, []);
	const entries = Object.values(lines);
	const plan = buildCheckoutUrl(shop, entries);
	const usesServerCart = (shop.productsSource === "woo" || shop.productsSource === "both") && typeof shop.checkoutUrl === "string" && shop.checkoutUrl.length > 0;
	/** Hand the cart to Woo — the 108 §2 analytics seam fires either way. */
	const emitHandoff = (mode) => {
		window.dispatchEvent(new CustomEvent("nvoos:checkout-handoff", { detail: {
			mode,
			lines: entries.length,
			variants: entries.filter((line) => line.variantId != null).length
		} }));
	};
	const handleCheckout = async (event) => {
		if (!usesServerCart) {
			emitHandoff("url-form");
			clearCart();
			return;
		}
		event.preventDefault();
		if (syncState === "syncing") return;
		setSyncState("syncing");
		setSyncError("");
		const session = getCartSessionId();
		if (!session) {
			setSyncError("The server cart is unavailable in this browser.");
			setSyncState("error");
			return;
		}
		const result = await syncServerCart(session, entries);
		if (result.ok) {
			emitHandoff("embedded");
			clearCart();
			window.location.assign("/checkout/");
			return;
		}
		setSyncError(result.error);
		setSyncState("error");
	};
	if (entries.length === 0) return /* @__PURE__ */ jsxs("div", {
		className: "cart",
		"data-cart-root": true,
		children: [/* @__PURE__ */ jsx("p", { children: "Your cart is empty." }), /* @__PURE__ */ jsx("button", {
			type: "button",
			className: "btn",
			disabled: true,
			"data-cart-checkout": true,
			children: "Checkout on WooCommerce"
		})]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "cart",
		"data-cart-root": true,
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
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "cart__line-name",
									children: line.name
								}),
								line.attributes && line.attributes.length > 0 && /* @__PURE__ */ jsx("span", {
									className: "cart__line-variant",
									children: line.attributes.map((attribute) => attribute.value).join(" / ")
								}),
								/* @__PURE__ */ jsx("span", { children: formatPrice(line.price) })
							]
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
			usesServerCart && syncState !== "error" ? /* @__PURE__ */ jsx("a", {
				className: "btn",
				href: "/checkout/",
				"data-cart-checkout": true,
				"aria-disabled": syncState === "syncing",
				onClick: handleCheckout,
				children: syncState === "syncing" ? "Syncing cart…" : "Checkout"
			}) : plan.url ? /* @__PURE__ */ jsx("a", {
				className: "btn",
				href: plan.url,
				rel: "noopener noreferrer",
				"data-cart-checkout": true,
				onClick: () => {
					emitHandoff("url-form");
					clearCart();
				},
				children: "Checkout on WooCommerce"
			}) : /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn",
				disabled: true,
				"data-cart-checkout": true,
				children: "Checkout on WooCommerce"
			}),
			syncState === "error" && syncError !== "" && /* @__PURE__ */ jsxs("p", {
				className: "cart__note",
				"data-cart-sync-error": true,
				children: [
					"Server cart sync failed — ",
					syncError,
					" Falling back to the direct checkout link."
				]
			}),
			plan.variantCount > 0 && (!usesServerCart || syncState === "error") && /* @__PURE__ */ jsx("p", {
				className: "cart__note",
				"data-cart-variant-note": true,
				children: "Variant items are excluded from this checkout — variant checkout opens in the next release."
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn--ghost",
				onClick: clearCart,
				children: "Clear cart"
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
createAstro("https://astro.nvoos.cloud");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const shop = await getShop(Astro.url);
	Astro.response.headers.set("Cache-Control", "no-store");
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": pageTitle("Cart") }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1>Cart</h1>${renderComponent($$result, "CartView", CartView, {
		"client:load": true,
		"shop": shop,
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
