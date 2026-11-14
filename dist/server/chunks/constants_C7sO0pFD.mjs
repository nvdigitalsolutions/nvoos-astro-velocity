var ASTRO_GENERATOR = `Astro v7.4.12`;
/**
* Set by internal handlers (e.g. PagesHandler) to signal that a
* response should be replaced with the corresponding error page.
*/
var ASTRO_ERROR_HEADER = "X-Astro-Error";
/**
* The value of the `component` field of the default 404 page, which is used when there is no user-provided 404.astro page.
*/
var DEFAULT_404_COMPONENT = "astro-default-404.astro";
/**
* A response with one of these status codes will create a redirect response.
*/
var REDIRECT_STATUS_CODES = [
	301,
	302,
	303,
	307,
	308,
	300,
	304
];
/**
* A response with one of these status codes will be rewritten
* with the result of rendering the respective error page.
*/
var REROUTABLE_STATUS_CODES = [404, 500];
/**
* Pages Astro serves for an HTTP status rather than for their own URL.
*
* They are always written as `<name>.html`, never as `<name>/index.html`,
* whatever `build.format` says, because a host reaches them by status code and
* needs them at a predictable file path. Being status pages rather than site
* content, they are also skipped by i18n routing.
*/
var STATUS_CODE_PAGES = /* @__PURE__ */ new Set([
	"/404",
	"/500",
	"/3xx"
]);
/**
* The symbol which is used as a field on the request object to store the client address.
* The clientAddress provided by the adapter (or the dev server) is stored on this field.
*/
var clientAddressSymbol = Symbol.for("astro.clientAddress");
/**
* Use this symbol to set and retrieve the original pathname of a request. This is useful when working with redirects and rewrites
*/
var originPathnameSymbol = Symbol.for("astro.originPathname");
/**
* Use this symbol to stash the active `FetchState` on an `APIContext`
* (or `ActionAPIContext`). Consumed by internal shims that need access
* to per-request state without appearing in the public context shape
* — e.g. the manual-strategy i18n middleware wrapper in
* `src/i18n/middleware.ts`.
*/
var fetchStateSymbol = Symbol.for("astro.fetchState");
/**
* The symbol used as a field on the request object to store a cleanup callback associated with aborting the request when the underlying socket closes.
*/
var nodeRequestAbortControllerCleanupSymbol = Symbol.for("astro.nodeRequestAbortControllerCleanup");
/**
* The symbol used as a field on the response object to keep track of streaming.
*
* It is set when the `<head>` element has been completely generated, rendered, and the response object has been passed onto the adapter.
*
* Used to provide helpful errors and warnings when headers or cookies are added during streaming, after the response has already been sent.
*/
var responseSentSymbol = Symbol.for("astro.responseSent");
export { REROUTABLE_STATUS_CODES as a, fetchStateSymbol as c, responseSentSymbol as d, REDIRECT_STATUS_CODES as i, nodeRequestAbortControllerCleanupSymbol as l, ASTRO_GENERATOR as n, STATUS_CODE_PAGES as o, DEFAULT_404_COMPONENT as r, clientAddressSymbol as s, ASTRO_ERROR_HEADER as t, originPathnameSymbol as u };
