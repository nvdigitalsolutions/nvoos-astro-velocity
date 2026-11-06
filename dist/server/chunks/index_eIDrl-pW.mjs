import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { _ as addAttribute, d as renderSlot, h as maybeRenderHead, m as renderTemplate, s as renderComponent } from "./server_oTayxuEg.mjs";
import { t as createComponent } from "./astro-component_DkgBvFJz.mjs";
import { t as createAstro } from "./astro-global_CZt7TqFY.mjs";
import { t as $$BaseLayout } from "./BaseLayout_B1AMrDC3.mjs";
import "./compiler_CWCzah9E.mjs";
import { _ as getThemePolicy, d as getPosts } from "./client_TtS43Z5n.mjs";
import { t as absoluteUrl } from "./url_C-9WkiDw.mjs";
import { n as pageTitle, r as plainExcerpt } from "./meta_BE8QV8yn.mjs";
import { t as isPublished } from "./publish_DHIf2m0M.mjs";
import { t as getCollection } from "./_astro_content_CVJtriY_.mjs";
import { n as mergePostsDesc } from "./merge_AONWuXeE.mjs";
import { r as collectionPageJsonLd } from "./jsonld_kjDNXr83.mjs";
import { t as $$Pagination } from "./Pagination_rjbO-3f_.mjs";
// src/pages/blog/index.astro
var blog_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.nvoos.cloud");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	Astro.response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
	const BLOG_PAGE_SIZE = 2;
	const site = Astro.site ?? new URL("https://store.nvoos.cloud");
	const policy = await getThemePolicy(Astro.url);
	if (Astro.cache.enabled) Astro.cache.set({
		maxAge: 300,
		swr: 60,
		tags: ["content", "posts"],
		etag: policy.updatedAt
	});
	const url = Astro.url;
	const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
	const envelope = await getPosts(Astro.url, {
		page,
		limit: BLOG_PAGE_SIZE
	});
	const published = envelope.docs.filter(isPublished);
	const localEntries = page === 1 ? await getCollection("posts", (entry) => !entry.data.draft) : [];
	const envelopeItems = published.map((post) => ({
		slug: post.slug,
		date: post.createdAt,
		href: `/blog/${post.id}/${post.slug}/`,
		title: post.title,
		excerpt: plainExcerpt(post.excerpt || post.contentRendered, 200)
	}));
	const localItems = localEntries.map((entry) => ({
		slug: entry.id,
		date: entry.data.date?.toISOString() ?? "",
		href: `/blog/0/${entry.id}/`,
		title: entry.data.title,
		excerpt: entry.data.description ?? ""
	}));
	const items = mergePostsDesc(envelopeItems, localItems);
	const canonical = absoluteUrl(site, "/blog/");
	const baseHref = `${url.pathname}?${url.searchParams.toString()}`;
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": pageTitle("Blog"),
		"description": plainExcerpt("Store news, lookbooks and care guides."),
		"canonical": canonical,
		"jsonld": [collectionPageJsonLd({
			name: "Blog",
			url: canonical,
			breadcrumb: [{
				name: "Home",
				url: absoluteUrl(site, "/")
			}]
		})]
	}, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["head"], renderTemplate`${page > 1 && renderTemplate`<meta name="robots" content="noindex, follow">`}`)}${maybeRenderHead($$result)}<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> ${" / "} <span>Blog</span></nav><h1>Blog</h1>${items.length === 0 && renderTemplate`<p>No posts yet — check back soon.</p>`}<ul class="blog-list">${items.map((item) => renderTemplate`<li><a${addAttribute(item.href, "href")}><h2>${item.title}</h2></a><p>${item.excerpt}</p></li>`)}</ul>${renderComponent($$result, "Pagination", $$Pagination, {
		"page": page,
		"totalPages": envelope.totalPages,
		"baseUrl": baseHref
	})}` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/blog/index.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/blog/index.astro";
var $$url = "/blog/";
// \0virtual:astro:page:src/pages/blog/index@_@astro
var page = () => blog_exports;
export { page };
