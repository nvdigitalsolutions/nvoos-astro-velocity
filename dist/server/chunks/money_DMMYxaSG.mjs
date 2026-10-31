// src/lib/commerce/money.ts
var DEFAULT_CURRENCY = "USD";
function resolveCurrency() {
	return DEFAULT_CURRENCY;
}
var formatterCache = null;
function formatter() {
	if (!formatterCache) formatterCache = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: resolveCurrency()
	});
	return formatterCache;
}
/** Format a price with the deployment currency. */
function formatPrice(price) {
	return formatter().format(price);
}
export { formatPrice as t };
