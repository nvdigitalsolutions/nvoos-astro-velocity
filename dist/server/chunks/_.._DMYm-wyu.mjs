import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { T as unescapeHTML, h as maybeRenderHead, m as renderTemplate, s as renderComponent } from "./server_oTayxuEg.mjs";
import { t as createComponent } from "./astro-component_DkgBvFJz.mjs";
import { t as createAstro } from "./astro-global_CZt7TqFY.mjs";
import { t as $$BaseLayout } from "./BaseLayout_B1AMrDC3.mjs";
import "./compiler_CWCzah9E.mjs";
import { _ as getThemePolicy, l as getPage } from "./client_TtS43Z5n.mjs";
import { t as absoluteUrl } from "./url_C-9WkiDw.mjs";
import { n as pageTitle, r as plainExcerpt } from "./meta_BE8QV8yn.mjs";
import { t as isPublished } from "./publish_DHIf2m0M.mjs";
import { t as getCollection } from "./_astro_content_CVJtriY_.mjs";
import { t as localBySlug } from "./merge_AONWuXeE.mjs";
import { n as contentBody, t as $$Blocks } from "./Blocks_Dj6h2fF5.mjs";
import { n as hasPreviewSession } from "./preview_BQRjBAqE.mjs";
import { o as webPageJsonLd } from "./jsonld_kjDNXr83.mjs";
// src/pages/pages/[id]/[...slug].astro
var ____slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Component,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.nvoos.cloud");
var $$Component = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Component;
	const id = Number(Astro.params.id ?? 0);
	const requestedSlug = String(Astro.params.slug ?? "").replace(/\/+$/, "");
	const previewActive = hasPreviewSession(Astro.request.headers.get("cookie"));
	const visitorCookie = Astro.request.headers.get("cookie");
	const site = Astro.site ?? new URL("https://store.nvoos.cloud");
	const home = {
		name: "Home",
		url: absoluteUrl(site, "/")
	};
	const NOT_FOUND = (body) => new Response(body, {
		status: 404,
		headers: { "cache-control": "private, no-store" }
	});
	const envelope = Number.isInteger(id) && id > 0 ? await getPage(id, Astro.url, previewActive ? {
		status: "any",
		cookie: visitorCookie
	} : {}) : null;
	if (envelope && !previewActive && !isPublished(envelope)) return NOT_FOUND("Page not found");
	if (envelope && requestedSlug !== envelope.slug) return Astro.redirect(`/pages/${id}/${envelope.slug}/`, 301);
	if (previewActive && !envelope) return NOT_FOUND("Page not found");
	const localPages = await getCollection("pages", (entry) => !entry.data.draft);
	const local = envelope ? null : localBySlug(localPages, requestedSlug);
	if (!envelope && !local) return NOT_FOUND("Page not found");
	if (previewActive) {
		await Astro.cache.invalidate({ path: Astro.url.pathname });
		Astro.response.headers.set("Cache-Control", "private, no-store");
		Astro.response.headers.set("X-Robots-Tag", "noindex");
	} else {
		Astro.response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
		const policy = await getThemePolicy(Astro.url);
		if (Astro.cache.enabled) Astro.cache.set({
			maxAge: 300,
			swr: 600,
			tags: ["content", "pages"],
			etag: policy.updatedAt
		});
	}
	const title = envelope ? envelope.seoTitle || pageTitle(envelope.title) : pageTitle(local?.data.title ?? requestedSlug);
	const description = envelope ? envelope.seoDescription || plainExcerpt(envelope.excerpt || envelope.contentRendered) : local?.data.description ?? "";
	const canonical = envelope ? absoluteUrl(site, `/pages/${id}/${envelope.slug}/`) : absoluteUrl(site, `/pages/0/${local?.id ?? requestedSlug}/`);
	const body = envelope ? contentBody(envelope) : {
		blocks: null,
		html: local?.rendered?.html ?? ""
	};
	const draftPreview = previewActive && envelope !== null && envelope.status !== void 0 && envelope.status !== "publish";
	const jsonld = [webPageJsonLd({
		name: envelope ? envelope.title : local?.data.title ?? "",
		url: canonical,
		description: plainExcerpt(envelope ? envelope.excerpt || envelope.contentRendered : description, 300),
		breadcrumb: [home, {
			name: envelope ? envelope.title : local?.data.title ?? "",
			url: canonical
		}]
	})];
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": title,
		"description": description,
		"canonical": canonical,
		"jsonld": jsonld,
		"data-astro-cid-zlyipiqs": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<nav class="breadcrumbs" aria-label="Breadcrumb" data-astro-cid-zlyipiqs><a href="/" data-astro-cid-zlyipiqs>Home</a> ${" / "} <span data-astro-cid-zlyipiqs>${envelope ? envelope.title : local?.data.title}</span></nav><article data-astro-cid-zlyipiqs><h1 data-astro-cid-zlyipiqs>${envelope ? envelope.title : local?.data.title}</h1>${draftPreview && renderTemplate`<div class="preview-banner" role="status" data-astro-cid-zlyipiqs>Draft preview — not publicly visible</div>`}${body.blocks ? renderTemplate`${renderComponent($$result, "Blocks", $$Blocks, {
		"blocks": body.blocks,
		"data-astro-cid-zlyipiqs": true
	})}` : renderTemplate`<div class="content-body" data-astro-cid-zlyipiqs>${unescapeHTML(body.html)}</div>`}</article>` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/pages/[id]/[...slug].astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/pages/[id]/[...slug].astro";
var $$url = "/pages/[id]/[...slug]/";
// \0virtual:astro:page:src/pages/pages/[id]/[...slug]@_@astro
var page = () => ____slug__exports;
export { page };
