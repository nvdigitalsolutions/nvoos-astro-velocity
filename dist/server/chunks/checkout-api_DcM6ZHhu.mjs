import { z } from "zod";
// src/lib/commerce/checkout-api.ts
var checkoutAddressSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	company: z.string(),
	address1: z.string(),
	address2: z.string(),
	city: z.string(),
	state: z.string(),
	postcode: z.string(),
	country: z.string(),
	phone: z.string(),
	email: z.string()
});
var checkoutDocSchema = z.object({
	session: z.string(),
	orderId: z.number().int().nonnegative(),
	orderStatus: z.string(),
	items: z.array(z.object({
		key: z.string(),
		productId: z.number().int().positive(),
		name: z.string(),
		qty: z.number().int().nonnegative(),
		price: z.number()
	})),
	totals: z.object({
		totalItems: z.number().int().nonnegative(),
		totalPrice: z.string(),
		shippingTotal: z.string().optional(),
		taxTotal: z.string().optional()
	}),
	billingAddress: checkoutAddressSchema.nullable(),
	shippingAddress: checkoutAddressSchema.nullable(),
	paymentMethod: z.string(),
	shippingRates: z.array(z.object({
		packageId: z.string(),
		name: z.string(),
		rates: z.array(z.object({
			rateId: z.string(),
			name: z.string(),
			description: z.string(),
			price: z.string(),
			selected: z.boolean()
		}))
	})),
	needsShipping: z.boolean(),
	coupons: z.array(z.object({
		code: z.string(),
		discount: z.string()
	})),
	notices: z.array(z.object({
		type: z.string(),
		text: z.string()
	}))
});
var checkoutResultSchema = z.object({
	orderId: z.number().int().positive(),
	orderKey: z.string(),
	status: z.string(),
	paymentResult: z.object({
		paymentStatus: z.string(),
		redirectUrl: z.string(),
		paymentDetails: z.array(z.unknown())
	}),
	notices: z.array(z.object({
		type: z.string(),
		text: z.string()
	}))
});
/** Gateways whose payment collection happens inside hosted fields in the
*  storefront (Stripe Elements) — INV-1-compliant, no raw card inputs. */
var EMBEDDED_CARD_GATEWAY = "stripe";
/** Whether the embedded checkout is usable for this shop (108 §2 mode rule:
*  woo/both + a backend checkout URL, so the hosted page stays the
*  fail-open fallback). */
function canEmbedCheckout(shop) {
	return (shop.productsSource === "woo" || shop.productsSource === "both") && typeof shop.checkoutUrl === "string" && shop.checkoutUrl.length > 0;
}
/** Build the Woo Stripe gateway payment_data for the Store API checkout —
*  the key set WooCommerce documents for its Stripe gateway (developer
*  docs, "Payment Data"): the gateway reads `stripe_source` (a pm_/src_/
*  card_ token from Stripe.js), `paymentMethod: stripe`, the request type,
*  and billing keys. `billing` values come from the address the shopper
*  confirmed (Stripe requires them for 3DS/link flows). */
function buildStripePaymentData(paymentMethodId, billing, requestType) {
	return [
		{
			key: "stripe_source",
			value: paymentMethodId
		},
		{
			key: "paymentMethod",
			value: "stripe"
		},
		{
			key: "paymentRequestType",
			value: requestType
		},
		{
			key: "wc-stripe-new-payment-method",
			value: true
		},
		{
			key: "billing_first_name",
			value: billing.firstName
		},
		{
			key: "billing_last_name",
			value: billing.lastName
		},
		{
			key: "billing_email",
			value: billing.email
		}
	];
}
/** Where a placed order sends the shopper: the gateway's redirect (PayPal
*  et al) or the app's thanks route. Pure — unit-tested. The thanks route
*  reads the Woo-convention params (`order_id` / `order_key` — the same
*  names the 108 return-URL filter lands with). */
function postPaymentDestination(result) {
	const redirect = result.paymentResult.redirectUrl;
	if (typeof redirect === "string" && redirect.length > 0) return {
		type: "redirect",
		url: redirect
	};
	const params = new URLSearchParams();
	params.set("order_id", String(result.orderId));
	if (result.orderKey) params.set("order_key", result.orderKey);
	return {
		type: "thanks",
		url: `/checkout/thanks/?${params.toString()}`
	};
}
/** Validate the thanks-page query params (order_id digits, wc order-key
*  shape). Invalid input renders the generic confirmation — never echoed
*  unvalidated into the page. */
function parseThanksParams(search) {
	const rawId = search.get("order_id") ?? "";
	const rawKey = search.get("order_key") ?? "";
	return {
		orderId: /^\d{1,12}$/.test(rawId) ? Number(rawId) : null,
		orderKey: /^wc_order_[A-Za-z0-9]+$/.test(rawKey) ? rawKey : null
	};
}
var SESSION_HEADERS = (session) => ({
	accept: "application/json",
	"content-type": "application/json",
	"x-nvoos-cart-session": session
});
async function postJson(path, session, body) {
	return fetch(path, {
		method: "POST",
		headers: SESSION_HEADERS(session),
		body: JSON.stringify(body)
	});
}
async function parseCall(res, schema) {
	const payload = await res.json().catch(() => null);
	if (!res.ok) return {
		ok: false,
		error: typeof payload === "object" && payload !== null && typeof payload.message === "string" ? payload.message : `Checkout failed (${res.status}).`
	};
	const parsed = schema.safeParse(payload);
	if (!parsed.success) return {
		ok: false,
		error: "The checkout response was malformed."
	};
	return {
		ok: true,
		data: parsed.data
	};
}
/** GET the merged checkout doc for the session cart. */
async function getCheckout(session) {
	let res;
	try {
		res = await fetch("/api/checkout", { headers: {
			accept: "application/json",
			"x-nvoos-cart-session": session
		} });
	} catch {
		return {
			ok: false,
			error: "The checkout service is unreachable."
		};
	}
	return parseCall(res, checkoutDocSchema);
}
/** Validate the addresses Woo-side; totals + shipping rates recalculate. */
async function updateCheckoutCustomer(session, payload) {
	let res;
	try {
		res = await postJson("/api/checkout/customer", session, payload);
	} catch {
		return {
			ok: false,
			error: "The checkout service is unreachable."
		};
	}
	return parseCall(res, checkoutDocSchema);
}
/** Select one shipping rate for one package. */
async function selectShippingRate(session, packageId, rateId) {
	let res;
	try {
		res = await postJson("/api/checkout/shipping-rate", session, {
			packageId,
			rateId
		});
	} catch {
		return {
			ok: false,
			error: "The checkout service is unreachable."
		};
	}
	return parseCall(res, checkoutDocSchema);
}
/** Apply a coupon to the session cart. */
async function applyCheckoutCoupon(session, code) {
	let res;
	try {
		res = await postJson("/api/checkout/coupon", session, { code });
	} catch {
		return {
			ok: false,
			error: "The checkout service is unreachable."
		};
	}
	return parseCall(res, checkoutDocSchema);
}
/** Process the order and payment. */
async function submitCheckout(session, payload) {
	let res;
	try {
		res = await postJson("/api/checkout", session, {
			payment_method: payload.paymentMethod,
			billingAddress: payload.billingAddress,
			shippingAddress: payload.shippingAddress,
			...payload.paymentData ? { paymentData: payload.paymentData } : {},
			...payload.customerNote ? { customerNote: payload.customerNote } : {},
			...payload.createAccount ? { createAccount: true } : {},
			...payload.customerPassword ? { customerPassword: payload.customerPassword } : {},
			...payload.expectedTotal ? { expectedTotal: payload.expectedTotal } : {}
		});
	} catch {
		return {
			ok: false,
			error: "The checkout service is unreachable."
		};
	}
	return parseCall(res, checkoutResultSchema);
}
export { getCheckout as a, selectShippingRate as c, canEmbedCheckout as i, submitCheckout as l, applyCheckoutCoupon as n, parseThanksParams as o, buildStripePaymentData as r, postPaymentDestination as s, EMBEDDED_CARD_GATEWAY as t, updateCheckoutCustomer as u };
