import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { C as unescapeHTML, c as Fragment$2, h as maybeRenderHead, m as renderTemplate, s as renderComponent, x as addAttribute } from "./server_COcTL13r.mjs";
import { t as createComponent } from "./astro-component_DeSnnQc7.mjs";
import { t as createAstro } from "./astro-global_CY5q3Xj5.mjs";
import "./compiler_tBncm0O6.mjs";
import { o as clearCart, s as getCartSessionId, t as $$BaseLayout } from "./BaseLayout_Cztu7urN.mjs";
import { t as formatPrice } from "./money_D3wLOywT.mjs";
import { a as getCheckout, c as selectShippingRate, i as canEmbedCheckout, l as submitCheckout, n as applyCheckoutCoupon, r as buildStripePaymentData, s as postPaymentDestination, u as updateCheckoutCustomer } from "./checkout-api_DcM6ZHhu.mjs";
import { _ as getShop } from "./client_DhvHaxQG.mjs";
import { n as pageTitle } from "./meta_BE8QV8yn.mjs";
import { useEffect, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { randomBytes } from "node:crypto";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// src/islands/CheckoutView.tsx
/** An empty address (country defaults to US). */
var emptyAddress = () => ({
	firstName: "",
	lastName: "",
	company: "",
	address1: "",
	address2: "",
	city: "",
	state: "",
	postcode: "",
	country: "US",
	phone: "",
	email: ""
});
/** Format a Woo minor-unit string with the shop currency. */
function formatMinor(totalPrice) {
	const numeric = Number(totalPrice);
	return formatPrice(Number.isFinite(numeric) ? numeric / 100 : 0);
}
/** The analytics seam (108 §2 extended) — one event per checkout milestone. */
function emitCheckoutEvent(name, detail) {
	window.dispatchEvent(new CustomEvent(name, { detail }));
}
var stripePromises = /* @__PURE__ */ new Map();
function stripeFor(key) {
	let promise = stripePromises.get(key);
	if (!promise) {
		promise = loadStripe(key);
		stripePromises.set(key, promise);
	}
	return promise;
}
function StripeSection({ collector }) {
	const stripe = useStripe();
	const elements = useElements();
	useEffect(() => {
		collector.current = { collect: async (billing) => {
			if (!stripe || !elements) return { error: "Card payments are not ready yet." };
			const submit = await elements.submit();
			if (submit.error) return { error: submit.error.message ?? "The card details could not be validated." };
			const created = await stripe.createPaymentMethod({ elements });
			if (created.error) return { error: created.error.message ?? "The card could not be processed." };
			return { paymentData: buildStripePaymentData(created.paymentMethod.id, {
				email: billing.email,
				firstName: billing.firstName,
				lastName: billing.lastName
			}, "cc") };
		} };
		return () => {
			collector.current = null;
		};
	}, [
		stripe,
		elements,
		collector
	]);
	return /* @__PURE__ */ jsx("div", {
		className: "checkout__stripe",
		"data-checkout-stripe": true,
		children: /* @__PURE__ */ jsx(PaymentElement, {
			options: {
				fields: { billingDetails: "never" },
				wallets: {
					applePay: "never",
					googlePay: "never"
				}
			},
			onLoadError: (event) => {
				collector.current = { collect: async () => ({ error: event.error.message ?? "The card form failed to load." }) };
			}
		})
	});
}
function CheckoutView({ shop }) {
	const [phase, setPhase] = useState("loading");
	const [doc, setDoc] = useState(null);
	const [error, setError] = useState("");
	const [advanced, setAdvanced] = useState(false);
	const [billing, setBilling] = useState(emptyAddress);
	const [shipping, setShipping] = useState(emptyAddress);
	const [sameAsBilling, setSameAsBilling] = useState(true);
	const [paymentMethod, setPaymentMethod] = useState("");
	const [couponCode, setCouponCode] = useState("");
	const [createAccount, setCreateAccount] = useState(false);
	const [password, setPassword] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const sessionRef = useRef("");
	const stripeCollector = useRef(null);
	const stripeKey = shop.stripePublishableKey ?? "";
	const stripeEnabled = canEmbedCheckout(shop) && stripeKey !== "" && (shop.paymentMethods ?? []).some((method) => method.id === "stripe");
	const guestAllowed = shop.guestCheckout === true;
	const setAddressField = (setter) => (field) => (event) => {
		const value = event.target.value;
		setter((current) => ({
			...current,
			[field]: value
		}));
	};
	useEffect(() => {
		document.querySelector("[data-checkout-root]")?.setAttribute("data-hydrated", "true");
	}, []);
	useEffect(() => {
		let cancelled = false;
		const boot = async () => {
			const session = getCartSessionId();
			if (!session) {
				setPhase("unavailable");
				return;
			}
			sessionRef.current = session;
			const result = await getCheckout(session);
			if (cancelled) return;
			if (!result.ok) {
				setError(result.error);
				setPhase("error");
				return;
			}
			const checkout = result.data;
			setDoc(checkout);
			if (checkout.billingAddress) setBilling(checkout.billingAddress);
			if (checkout.shippingAddress) setShipping(checkout.shippingAddress);
			if (checkout.paymentMethod) setPaymentMethod(checkout.paymentMethod);
			else {
				const first = (shop.paymentMethods ?? [])[0];
				setPaymentMethod(first ? first.id : "");
			}
			if (checkout.totals.totalItems === 0) {
				setPhase("empty");
				return;
			}
			setPhase("ready");
		};
		boot();
		return () => {
			cancelled = true;
		};
	}, []);
	/** Address step → Woo validates, totals + rates recalculate. */
	const handleContinue = async (event) => {
		event.preventDefault();
		if (submitting || !doc) return;
		setSubmitting(true);
		setError("");
		const result = await updateCheckoutCustomer(sessionRef.current, {
			billingAddress: billing,
			shippingAddress: sameAsBilling ? billing : shipping
		});
		setSubmitting(false);
		if (!result.ok) {
			setError(result.error);
			return;
		}
		setDoc(result.data);
		setAdvanced(true);
	};
	/** Shipping rate change → Woo re-totals. */
	const handleRateChange = async (rateId) => {
		if (!doc) return;
		const pkg = doc.shippingRates[0];
		if (!pkg) return;
		setError("");
		const result = await selectShippingRate(sessionRef.current, pkg.packageId, rateId);
		if (!result.ok) {
			setError(result.error);
			return;
		}
		setDoc(result.data);
	};
	/** Coupon apply. */
	const handleCoupon = async () => {
		if (!doc || couponCode.trim() === "") return;
		setError("");
		const result = await applyCheckoutCoupon(sessionRef.current, couponCode.trim());
		if (!result.ok) {
			setError(result.error);
			return;
		}
		setDoc(result.data);
		setCouponCode("");
	};
	/** The shared place-order tail: submit → route → clear. */
	const placeOrder = async (paymentData, express = false) => {
		if (!doc) return;
		setSubmitting(true);
		setError("");
		emitCheckoutEvent("nvoos:checkout-submitted", {
			method: paymentMethod,
			items: doc.items.length,
			express
		});
		const result = await submitCheckout(sessionRef.current, {
			paymentMethod,
			billingAddress: billing,
			shippingAddress: sameAsBilling ? billing : shipping,
			...paymentData ? { paymentData } : {},
			...createAccount ? {
				createAccount: true,
				customerPassword: password
			} : {},
			...doc.totals.totalPrice && !express ? { expectedTotal: doc.totals.totalPrice } : {}
		});
		if (!result.ok) {
			setSubmitting(false);
			setError(result.error);
			emitCheckoutEvent("nvoos:checkout-failed", {
				method: paymentMethod,
				reason: result.error
			});
			if (/total|price|changed/i.test(result.error)) {
				const refreshed = await getCheckout(sessionRef.current);
				if (refreshed.ok) setDoc(refreshed.data);
			}
			return;
		}
		emitCheckoutEvent("nvoos:checkout-succeeded", {
			method: paymentMethod,
			orderId: result.data.orderId
		});
		clearCart();
		const destination = postPaymentDestination(result.data);
		if (destination.type === "redirect") {
			emitCheckoutEvent("nvoos:checkout-redirect", {
				method: paymentMethod,
				orderId: result.data.orderId
			});
			window.location.assign(destination.url);
			return;
		}
		window.location.assign(destination.url);
	};
	/** The standard place-order handler (card via hosted fields included). */
	const handlePlaceOrder = async (event) => {
		event.preventDefault();
		if (submitting || !doc) return;
		if (paymentMethod === "stripe" && stripeEnabled) {
			const collector = stripeCollector.current;
			if (!collector) {
				setError("Card payments are not ready yet.");
				return;
			}
			const collected = await collector.collect(billing);
			if ("error" in collected) {
				setError(collected.error);
				return;
			}
			await placeOrder(collected.paymentData);
			return;
		}
		await placeOrder();
	};
	const hostedCheckout = shop.checkoutUrl;
	if (phase === "loading") return /* @__PURE__ */ jsx("div", {
		className: "cart",
		"data-checkout-root": true,
		"data-checkout-phase": "loading",
		children: /* @__PURE__ */ jsx("p", { children: "Loading your order…" })
	});
	if (phase === "unavailable") return /* @__PURE__ */ jsxs("div", {
		className: "cart",
		"data-checkout-root": true,
		"data-checkout-phase": "unavailable",
		children: [/* @__PURE__ */ jsx("p", { children: "The secure checkout is unavailable in this browser." }), hostedCheckout ? /* @__PURE__ */ jsx("a", {
			className: "btn",
			href: hostedCheckout,
			rel: "noopener noreferrer",
			"data-checkout-hosted": true,
			children: "Checkout on WooCommerce"
		}) : /* @__PURE__ */ jsx("a", {
			className: "btn",
			href: "/cart/",
			children: "Return to cart"
		})]
	});
	if (phase === "error") return /* @__PURE__ */ jsxs("div", {
		className: "cart",
		"data-checkout-root": true,
		"data-checkout-phase": "error",
		children: [/* @__PURE__ */ jsxs("p", { children: ["The checkout could not be loaded — ", error] }), hostedCheckout ? /* @__PURE__ */ jsx("a", {
			className: "btn",
			href: hostedCheckout,
			rel: "noopener noreferrer",
			"data-checkout-hosted": true,
			children: "Checkout on WooCommerce"
		}) : /* @__PURE__ */ jsx("a", {
			className: "btn",
			href: "/cart/",
			children: "Return to cart"
		})]
	});
	if (phase === "empty" || !doc) return /* @__PURE__ */ jsxs("div", {
		className: "cart",
		"data-checkout-root": true,
		"data-checkout-phase": "empty",
		children: [/* @__PURE__ */ jsx("p", { children: "Your order summary is empty." }), /* @__PURE__ */ jsx("a", {
			className: "btn",
			href: "/cart/",
			"data-checkout-back": true,
			children: "Return to cart"
		})]
	});
	const rates = doc.shippingRates.flatMap((pkg) => pkg.rates);
	const selectedRate = rates.find((rate) => rate.selected);
	const totals = doc.totals;
	return /* @__PURE__ */ jsxs("div", {
		className: "cart checkout",
		"data-checkout-root": true,
		"data-checkout-phase": "ready",
		children: [
			error !== "" && /* @__PURE__ */ jsx("p", {
				className: "cart__note",
				"data-checkout-notice": true,
				children: error
			}),
			!guestAllowed && /* @__PURE__ */ jsxs("p", {
				className: "cart__note",
				"data-checkout-account-note": true,
				children: [
					"This store requires an account to check out.",
					" ",
					hostedCheckout ? /* @__PURE__ */ jsx("a", {
						href: hostedCheckout,
						rel: "noopener noreferrer",
						"data-checkout-hosted": true,
						children: "Sign in at the hosted checkout"
					}) : null
				]
			}),
			/* @__PURE__ */ jsx("form", {
				onSubmit: handleContinue,
				children: /* @__PURE__ */ jsxs("section", { children: [
					/* @__PURE__ */ jsx("h2", { children: "Contact & shipping" }),
					/* @__PURE__ */ jsx(AddressFields, {
						prefix: "billing",
						legend: "Billing & contact",
						address: billing,
						onChange: setAddressField(setBilling),
						includeEmail: true
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "checkout__inline",
						children: [/* @__PURE__ */ jsx("input", {
							type: "checkbox",
							checked: sameAsBilling,
							onChange: (event) => setSameAsBilling(event.target.checked),
							"data-checkout-same-billing": true
						}), "Ship to the same address"]
					}),
					!sameAsBilling && /* @__PURE__ */ jsx(AddressFields, {
						prefix: "shipping",
						legend: "Shipping address",
						address: shipping,
						onChange: setAddressField(setShipping)
					}),
					/* @__PURE__ */ jsx("button", {
						type: "submit",
						className: "btn",
						disabled: submitting,
						"data-checkout-continue": true,
						children: submitting ? "Validating…" : "Continue to shipping"
					})
				] })
			}),
			advanced && /* @__PURE__ */ jsxs("form", {
				onSubmit: handlePlaceOrder,
				children: [
					doc.needsShipping && rates.length > 0 && /* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", { children: "Shipping method" }), rates.map((rate) => /* @__PURE__ */ jsxs("label", {
						className: "checkout__inline",
						children: [
							/* @__PURE__ */ jsx("input", {
								type: "radio",
								name: "shipping-rate",
								value: rate.rateId,
								checked: selectedRate?.rateId === rate.rateId,
								onChange: () => {
									handleRateChange(rate.rateId);
								},
								"data-shipping-rate": true
							}),
							rate.name,
							" — ",
							formatMinor(rate.price)
						]
					}, rate.rateId))] }),
					/* @__PURE__ */ jsxs("section", { children: [
						/* @__PURE__ */ jsx("h2", { children: "Coupon" }),
						/* @__PURE__ */ jsxs("div", {
							className: "checkout__inline",
							children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "checkout-coupon",
									className: "sr-only",
									children: "Coupon code"
								}),
								/* @__PURE__ */ jsx("input", {
									id: "checkout-coupon",
									type: "text",
									value: couponCode,
									onChange: (event) => setCouponCode(event.target.value),
									"data-checkout-coupon-input": true
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									className: "btn btn--ghost",
									onClick: () => {
										handleCoupon();
									},
									"data-checkout-coupon-apply": true,
									children: "Apply"
								})
							]
						}),
						doc.coupons.map((coupon) => /* @__PURE__ */ jsxs("p", {
							"data-checkout-coupon": true,
							children: [
								"Coupon ",
								coupon.code,
								" applied."
							]
						}, coupon.code))
					] }),
					/* @__PURE__ */ jsxs("section", { children: [
						/* @__PURE__ */ jsx("h2", { children: "Payment" }),
						(shop.paymentMethods ?? []).map((method) => /* @__PURE__ */ jsxs("label", {
							className: "checkout__inline",
							children: [/* @__PURE__ */ jsx("input", {
								type: "radio",
								name: "payment-method",
								value: method.id,
								checked: paymentMethod === method.id,
								onChange: (event) => setPaymentMethod(event.target.value),
								"data-payment-method": true
							}), method.title]
						}, method.id)),
						paymentMethod === "stripe" && stripeEnabled ? /* @__PURE__ */ jsx(Elements, {
							stripe: stripeFor(stripeKey),
							options: {
								mode: "payment",
								currency: shop.currency.toLowerCase(),
								amount: Number(totals.totalPrice) || 0
							},
							children: /* @__PURE__ */ jsx(StripeSection, { collector: stripeCollector })
						}) : null,
						paymentMethod === "stripe" && !stripeEnabled ? /* @__PURE__ */ jsx("p", {
							className: "cart__note",
							"data-checkout-stripe-unavailable": true,
							children: "Card payments are not available on this store yet."
						}) : null,
						guestAllowed && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("label", {
							className: "checkout__inline",
							children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: createAccount,
								onChange: (event) => setCreateAccount(event.target.checked),
								"data-checkout-create-account": true
							}), "Create an account for faster checkout next time"]
						}), createAccount && /* @__PURE__ */ jsxs("label", { children: ["Password", /* @__PURE__ */ jsx("input", {
							type: "password",
							autoComplete: "new-password",
							value: password,
							onChange: (event) => setPassword(event.target.value),
							"data-checkout-password": true
						})] })] })
					] }),
					/* @__PURE__ */ jsxs("section", {
						className: "checkout__review",
						"data-checkout-summary": true,
						children: [
							/* @__PURE__ */ jsx("h2", { children: "Review" }),
							/* @__PURE__ */ jsx("ul", { children: doc.items.map((item) => /* @__PURE__ */ jsxs("li", {
								"data-checkout-line": true,
								children: [
									item.name,
									" × ",
									item.qty,
									" — ",
									formatPrice(item.price * item.qty)
								]
							}, item.key || String(item.productId))) }),
							/* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("strong", { children: [
								"Total: ",
								formatMinor(totals.totalPrice),
								" ",
								/* @__PURE__ */ jsx("span", {
									"data-checkout-total": true,
									hidden: true,
									children: totals.totalPrice
								})
							] }) }),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								className: "btn",
								disabled: submitting || !guestAllowed,
								"data-checkout-submit": true,
								children: submitting ? "Placing order…" : "Place order"
							}),
							hostedCheckout && /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", {
								href: hostedCheckout,
								rel: "noopener noreferrer",
								"data-checkout-hosted": true,
								children: "Prefer the hosted checkout?"
							}) })
						]
					})
				]
			})
		]
	});
}
var COUNTRIES = [
	["US", "United States"],
	["GB", "United Kingdom"],
	["CA", "Canada"],
	["AU", "Australia"],
	["DE", "Germany"],
	["FR", "France"],
	["NL", "Netherlands"],
	["ZA", "South Africa"],
	["AE", "United Arab Emirates"],
	["SG", "Singapore"]
];
function AddressFields({ prefix, legend, address, onChange, includeEmail = false }) {
	const id = (field) => `${prefix}-${field}`;
	return /* @__PURE__ */ jsxs("fieldset", {
		className: "checkout__fields",
		children: [
			/* @__PURE__ */ jsx("legend", { children: legend }),
			/* @__PURE__ */ jsxs("label", {
				htmlFor: id("firstName"),
				children: ["First name", /* @__PURE__ */ jsx("input", {
					id: id("firstName"),
					type: "text",
					autoComplete: "given-name",
					required: true,
					value: address.firstName,
					onChange: onChange("firstName"),
					"data-checkout-address-field": id("firstName")
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				htmlFor: id("lastName"),
				children: ["Last name", /* @__PURE__ */ jsx("input", {
					id: id("lastName"),
					type: "text",
					autoComplete: "family-name",
					required: true,
					value: address.lastName,
					onChange: onChange("lastName"),
					"data-checkout-address-field": id("lastName")
				})]
			}),
			includeEmail && /* @__PURE__ */ jsxs("label", {
				htmlFor: id("email"),
				children: ["Email", /* @__PURE__ */ jsx("input", {
					id: id("email"),
					type: "email",
					autoComplete: "email",
					required: true,
					value: address.email,
					onChange: onChange("email"),
					"data-checkout-address-field": id("email")
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				htmlFor: id("company"),
				children: ["Company (optional)", /* @__PURE__ */ jsx("input", {
					id: id("company"),
					type: "text",
					autoComplete: "organization",
					value: address.company,
					onChange: onChange("company"),
					"data-checkout-address-field": id("company")
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				htmlFor: id("address1"),
				children: ["Address", /* @__PURE__ */ jsx("input", {
					id: id("address1"),
					type: "text",
					autoComplete: "address-line1",
					required: true,
					value: address.address1,
					onChange: onChange("address1"),
					"data-checkout-address-field": id("address1")
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				htmlFor: id("address2"),
				children: ["Apartment, suite (optional)", /* @__PURE__ */ jsx("input", {
					id: id("address2"),
					type: "text",
					autoComplete: "address-line2",
					value: address.address2,
					onChange: onChange("address2"),
					"data-checkout-address-field": id("address2")
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				htmlFor: id("city"),
				children: ["City", /* @__PURE__ */ jsx("input", {
					id: id("city"),
					type: "text",
					autoComplete: "address-level2",
					required: true,
					value: address.city,
					onChange: onChange("city"),
					"data-checkout-address-field": id("city")
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				htmlFor: id("state"),
				children: ["State / Province", /* @__PURE__ */ jsx("input", {
					id: id("state"),
					type: "text",
					autoComplete: "address-level1",
					value: address.state,
					onChange: onChange("state"),
					"data-checkout-address-field": id("state")
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				htmlFor: id("postcode"),
				children: ["Postcode", /* @__PURE__ */ jsx("input", {
					id: id("postcode"),
					type: "text",
					autoComplete: "postal-code",
					required: true,
					value: address.postcode,
					onChange: onChange("postcode"),
					"data-checkout-address-field": id("postcode")
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				htmlFor: id("country"),
				children: ["Country", /* @__PURE__ */ jsx("select", {
					id: id("country"),
					autoComplete: "country-name",
					value: address.country,
					onChange: onChange("country"),
					"data-checkout-address-field": id("country"),
					children: COUNTRIES.map(([code, name]) => /* @__PURE__ */ jsx("option", {
						value: code,
						children: name
					}, code))
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				htmlFor: id("phone"),
				children: ["Phone (optional)", /* @__PURE__ */ jsx("input", {
					id: id("phone"),
					type: "tel",
					autoComplete: "tel",
					value: address.phone,
					onChange: onChange("phone"),
					"data-checkout-address-field": id("phone")
				})]
			})
		]
	});
}
// src/pages/checkout/index.astro
var checkout_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.nvoos.cloud");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const shop = await getShop(Astro.url);
	const embedded = canEmbedCheckout(shop);
	const cspNonce = embedded ? randomBytes(16).toString("base64") : "";
	Astro.response.headers.set("Cache-Control", "no-store");
	if (embedded) Astro.response.headers.set("x-nvoos-csp-payment", "1");
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": pageTitle("Checkout") }, {
		"default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1>Checkout</h1>${embedded ? renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate`<noscript><p>Checkout requires JavaScript. Open the${" "}<a${addAttribute(shop.checkoutUrl || "/cart/", "href")} rel="noopener noreferrer">hosted checkout</a>${" "}instead.</p></noscript>${renderComponent($$result, "CheckoutView", CheckoutView, {
			"client:load": true,
			"shop": shop,
			"client:component-hydration": "load",
			"client:component-path": "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/islands/CheckoutView.tsx",
			"client:component-export": "default"
		})}` })}` : renderTemplate`<div class="cart" data-checkout-hosted-panel><p>This storefront is in native catalog mode, so checkout happens on the hosted WooCommerce checkout page.</p>${shop.checkoutUrl ? renderTemplate`<a class="btn"${addAttribute(shop.checkoutUrl, "href")} rel="noopener noreferrer" data-checkout-hosted>Continue to checkout</a>` : renderTemplate`<a class="btn" href="/cart/">Return to cart</a>`}</div>`}`,
		"head": ($$result) => renderTemplate`${embedded && renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, { "slot": "head" }, { "default": async ($$result) => renderTemplate`${unescapeHTML(`<meta property="csp-nonce" nonce="${cspNonce}">`)}` })}`}`
	})}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/checkout/index.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/checkout/index.astro";
var $$url = "/checkout/";
// \0virtual:astro:page:src/pages/checkout/index@_@astro
var page = () => checkout_exports;
export { page };
