import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { C as unescapeHTML, h as maybeRenderHead, m as renderTemplate, s as renderComponent } from "./server_COcTL13r.mjs";
import { t as createComponent } from "./astro-component_DeSnnQc7.mjs";
import { t as createAstro } from "./astro-global_CY5q3Xj5.mjs";
import "./compiler_tBncm0O6.mjs";
import { t as $$BaseLayout } from "./BaseLayout_Cztu7urN.mjs";
import { d as getPost, v as getThemePolicy } from "./client_DhvHaxQG.mjs";
import { t as isPublished } from "./publish_DHIf2m0M.mjs";
import { i as toIsoDate } from "./normalize_3P-o4l4k.mjs";
import { t as getCollection } from "./_astro_content_OSRRZ3II.mjs";
import { t as localBySlug } from "./merge_AONWuXeE.mjs";
import { t as contentBody } from "./render_2T9plfrr.mjs";
import { n as hasPreviewSession } from "./preview_BQRjBAqE.mjs";
import { t as $$Blocks } from "./Blocks_UMTGQmu6.mjs";
import { n as breadcrumbJsonLd, t as blogPostingJsonLd } from "./jsonld_kjDNXr83.mjs";
import { n as pageTitle, r as plainExcerpt } from "./meta_BE8QV8yn.mjs";
import { t as absoluteUrl } from "./url_C-9WkiDw.mjs";
// src/pages/blog/[id]/[...slug].astro
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
	const NOT_FOUND = (body) => new Response(body, {
		status: 404,
		headers: { "cache-control": "private, no-store" }
	});
	const envelope = Number.isInteger(id) && id > 0 ? await getPost(id, Astro.url, previewActive ? {
		status: "any",
		cookie: visitorCookie
	} : {}) : null;
	if (envelope && !previewActive && !isPublished(envelope)) return NOT_FOUND("Post not found");
	if (envelope && requestedSlug !== envelope.slug) return Astro.redirect(`/blog/${id}/${envelope.slug}/`, 301);
	if (previewActive && !envelope) return NOT_FOUND("Post not found");
	const localPosts = await getCollection("posts", (entry) => !entry.data.draft);
	const local = envelope ? null : localBySlug(localPosts, requestedSlug);
	if (!envelope && !local) return NOT_FOUND("Post not found");
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
			tags: ["content", "posts"],
			etag: policy.updatedAt
		});
	}
	const title = envelope ? envelope.seoTitle || pageTitle(envelope.title) : pageTitle(local?.data.title ?? requestedSlug);
	const description = envelope ? envelope.seoDescription || plainExcerpt(envelope.excerpt || envelope.contentRendered) : local?.data.description ?? "";
	const canonical = envelope ? absoluteUrl(site, `/blog/${id}/${envelope.slug}/`) : absoluteUrl(site, `/blog/0/${local?.id ?? requestedSlug}/`);
	const body = envelope ? contentBody(envelope) : {
		blocks: null,
		html: local?.rendered?.html ?? ""
	};
	const draftPreview = previewActive && envelope !== null && envelope.status !== void 0 && envelope.status !== "publish";
	const datePublished = envelope ? toIsoDate(envelope.createdAt) ?? void 0 : local?.data.date?.toISOString();
	const dateModified = envelope ? toIsoDate(envelope.updatedAt) ?? void 0 : void 0;
	const jsonld = [blogPostingJsonLd({
		title: envelope ? envelope.title : local?.data.title ?? "",
		url: canonical,
		description: plainExcerpt(envelope ? envelope.excerpt || envelope.contentRendered : description, 300),
		datePublished,
		dateModified,
		image: envelope?.featuredImage ?? void 0
	}), breadcrumbJsonLd([
		{
			name: "Home",
			url: absoluteUrl(site, "/")
		},
		{
			name: "Blog",
			url: absoluteUrl(site, "/blog/")
		},
		{
			name: envelope ? envelope.title : local?.data.title ?? "",
			url: canonical
		}
	])];
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": title,
		"description": description,
		"canonical": canonical,
		"markdownHref": canonical ? `${canonical.replace(/\/+$/, "")}/index.md` : void 0,
		"jsonld": jsonld,
		"data-astro-cid-t6fhkzaa": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<nav class="breadcrumbs" aria-label="Breadcrumb" data-astro-cid-t6fhkzaa><a href="/" data-astro-cid-t6fhkzaa>Home</a> ${" / "} <a href="/blog/" data-astro-cid-t6fhkzaa>Blog</a> ${" / "}${" "}<span data-astro-cid-t6fhkzaa>${envelope ? envelope.title : local?.data.title}</span></nav><article data-astro-cid-t6fhkzaa><h1 data-astro-cid-t6fhkzaa>${envelope ? envelope.title : local?.data.title}</h1>${draftPreview && renderTemplate`<div class="preview-banner" role="status" data-astro-cid-t6fhkzaa>Draft preview — not publicly visible</div>`}${body.blocks ? renderTemplate`${renderComponent($$result, "Blocks", $$Blocks, {
		"blocks": body.blocks,
		"data-astro-cid-t6fhkzaa": true
	})}` : renderTemplate`<div class="content-body" data-astro-cid-t6fhkzaa>${unescapeHTML(body.html)}</div>`}</article>` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/blog/[id]/[...slug].astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/blog/[id]/[...slug].astro";
var $$url = "/blog/[id]/[...slug]/";
// \0virtual:astro:page:src/pages/blog/[id]/[...slug]@_@astro
var page = () => ____slug__exports;
export { page };
