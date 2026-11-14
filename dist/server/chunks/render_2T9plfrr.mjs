import { n as parsePortableText, r as sanitizeContentHtml } from "./portable-text_BD10ftzh.mjs";
// src/lib/content/render.ts
/** Decide what a content doc renders (blocks-first). Loud failure on
*  malformed blocks — a doc that declares blocks must validate. */
function contentBody(doc) {
	if (Array.isArray(doc.blocks) && doc.blocks.length > 0) return {
		blocks: parsePortableText(doc.blocks),
		html: ""
	};
	if (doc.contentRendered) return {
		blocks: null,
		html: doc.contentRendered
	};
	if (doc.content) return {
		blocks: null,
		html: sanitizeContentHtml(doc.content)
	};
	return {
		blocks: null,
		html: ""
	};
}
export { contentBody as t };
