import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { t as createComponent } from "./astro-component_DkgBvFJz.mjs";
import { t as createAstro } from "./astro-global_CZt7TqFY.mjs";
import "./compiler_CWCzah9E.mjs";
import { l as getPage, u as getPost } from "./client_TtS43Z5n.mjs";
import { i as verifyPreviewToken, r as previewTtlMs, t as PREVIEW_COOKIE } from "./preview_BQRjBAqE.mjs";
// src/pages/preview/[type]/[id].astro
var _id__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Id,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.nvoos.cloud");
var $$Id = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Id;
	const type = String(Astro.params.type ?? "");
	const id = Number(Astro.params.id ?? 0);
	const token = String(Astro.url.searchParams.get("token") ?? "");
	if (type !== "page" && type !== "post") return new Response("Not found", { status: 404 });
	if (!Number.isInteger(id) || id <= 0 || !verifyPreviewToken(type, id, token)) return new Response("Invalid or expired preview link", { status: 401 });
	const visitorCookie = Astro.request.headers.get("cookie");
	const doc = type === "page" ? await getPage(id, Astro.url, {
		status: "any",
		cookie: visitorCookie
	}) : await getPost(id, Astro.url, {
		status: "any",
		cookie: visitorCookie
	});
	if (!doc || !doc.slug) return new Response("Not found", { status: 404 });
	const ttlMs = previewTtlMs();
	const forwardedProto = (Astro.request.headers.get("x-forwarded-proto") ?? "").split(",")[0].trim();
	const secure = forwardedProto ? forwardedProto === "https" : Astro.url.protocol === "https:";
	Astro.cookies.set(PREVIEW_COOKIE, "1", {
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		maxAge: Math.max(1, Math.floor(ttlMs / 1e3)),
		secure
	});
	const target = type === "page" ? `/pages/${id}/${doc.slug}/` : `/blog/${id}/${doc.slug}/`;
	return Astro.redirect(target, 302);
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/preview/[type]/[id].astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/preview/[type]/[id].astro";
var $$url = "/preview/[type]/[id]/";
// \0virtual:astro:page:src/pages/preview/[type]/[id]@_@astro
var page = () => _id__exports;
export { page };
