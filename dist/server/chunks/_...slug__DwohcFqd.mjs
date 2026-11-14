import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { d as getPost } from "./client_DhvHaxQG.mjs";
import { t as contentBody } from "./render_2T9plfrr.mjs";
import { n as markdownFromPortableText, r as textFromHtml } from "./llms_DOSoAIvo.mjs";
// src/pages/blog/[id]/[...slug]/index.md.ts
var index_md_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ params, url }) => {
	const post = await getPost(Number(params.id), url);
	if (!post) return new Response("Post not found", { status: 404 });
	const body = contentBody(post);
	const content = body.blocks ? markdownFromPortableText(body.blocks) : textFromHtml(body.html);
	const parts = [`# ${post.title}`, content.trim()];
	return new Response(`${parts.filter(Boolean).join("\n\n").trim()}\n`, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
};
// \0virtual:astro:page:src/pages/blog/[id]/[...slug]/index.md@_@ts
var page = () => index_md_exports;
export { page };
