import { z } from "zod";
import sanitizeHtml from "sanitize-html";
// src/lib/content/portable-text.ts
/** A standard Portable Text mark definition (strong/em/link). */
var markSchema = z.object({
	_type: z.literal("span"),
	text: z.string(),
	marks: z.array(z.string()).default([])
});
/** A standard Portable Text mark definition (link-only allowlist). */
var linkMarkDefSchema = z.object({
	_key: z.string().min(1),
	_type: z.literal("link"),
	href: z.string().min(1)
});
/** A standard Portable Text block (one style + inline spans). */
var blockSchema = z.object({
	_type: z.literal("block"),
	style: z.enum([
		"normal",
		"h2",
		"h3"
	]).default("normal"),
	children: z.array(markSchema).min(1),
	markDefs: z.array(linkMarkDefSchema).default([])
});
var heroSchema = z.object({
	_type: z.literal("hero"),
	title: z.string().min(1).max(120),
	lede: z.string().max(500).optional()
});
var imageSchema = z.object({
	_type: z.literal("image"),
	src: z.string().min(1),
	alt: z.string().max(300)
});
var productGridSchema = z.object({
	_type: z.literal("productGrid"),
	ids: z.array(z.number().int().positive()).min(1).max(24)
});
var promotionSchema = z.object({
	_type: z.literal("promotion"),
	promotionId: z.number().int().positive()
});
var testimonialSchema = z.object({
	_type: z.literal("testimonial"),
	quote: z.string().min(1).max(600),
	author: z.string().max(120).optional()
});
var faqSchema = z.object({
	_type: z.literal("faq"),
	question: z.string().min(1).max(300),
	answer: z.string().min(1).max(1e3)
});
var statSchema = z.object({
	_type: z.literal("stat"),
	value: z.string().min(1).max(40),
	label: z.string().max(120)
});
/**
* Comparison block (Proposal 136 §4.1) — a labelled fact table. The renderer
* emits a real <table> with scoped headers, so this is a row/column contract,
* not free markup. `values` aligns to `columns`.
*/
var comparisonSchema = z.object({
	_type: z.literal("comparison"),
	caption: z.string().max(200).optional(),
	columns: z.array(z.string().min(1).max(80)).min(2).max(6),
	rows: z.array(z.object({
		label: z.string().min(1).max(120),
		values: z.array(z.string().max(200)).min(1).max(6)
	})).min(1).max(20)
});
/** Steps block (136 §4.1) — an ORDERED process; the order is the information. */
var stepsSchema = z.object({
	_type: z.literal("steps"),
	items: z.array(z.object({
		title: z.string().min(1).max(120),
		body: z.string().max(600).optional()
	})).min(2).max(12)
});
/** Team block (136 §4.1) — people and their roles. */
var teamSchema = z.object({
	_type: z.literal("team"),
	people: z.array(z.object({
		name: z.string().min(1).max(80),
		role: z.string().max(80).optional(),
		photo: z.string().min(1).optional()
	})).min(2).max(12)
});
/**
* Tabs custom block schema (108 Phase 1.3) — the adopted WAI-ARIA tabs
* components as a Portable Text type. Tab content is nested Portable Text
* (recursive via z.lazy — declared before portableTextItemSchema,
* resolved lazily).
*/
var tabsSchema = z.object({
	_type: z.literal("tabs"),
	_key: z.string().min(1).max(120).optional(),
	tabs: z.array(z.object({
		title: z.string().min(1).max(120),
		blocks: z.lazy(() => z.array(portableTextItemSchema).min(1).max(20))
	})).min(1).max(6)
});
/** One Portable Text top-level item (standard block or custom type). */
var portableTextItemSchema = z.discriminatedUnion("_type", [blockSchema, ...[
	heroSchema,
	imageSchema,
	productGridSchema,
	promotionSchema,
	testimonialSchema,
	faqSchema,
	statSchema,
	comparisonSchema,
	stepsSchema,
	teamSchema,
	tabsSchema
]]);
var portableTextSchema = z.array(portableTextItemSchema).max(100, "a document carries at most 100 blocks");
/**
* Validate a blocks payload — the content_validate gate and the render
* boundary. Unknown types fail loudly with the offending index named;
* link markDefs ride a second-pass scheme check (belt and braces on top of
* the schema — javascript:/data: hrefs are rejected before render). The
* walk recurses into nested content (tabs tab blocks) — every link in the
* tree is checked, not just the top level (108 Phase 1.3).
*/
function parsePortableText(input) {
	const result = portableTextSchema.safeParse(input);
	if (!result.success) {
		const issues = result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
		throw new Error(`[portable-text] invalid blocks — ${issues}`);
	}
	for (const item of result.data) assertSafeLinks(item);
	return result.data;
}
/** Recurse a parsed item tree, rejecting unsafe link hrefs loudly. */
function assertSafeLinks(item) {
	if (item._type === "block") {
		for (const def of item.markDefs ?? []) if (!isSafeHref(def.href)) throw new Error(`[portable-text] unsafe link href rejected — "${def.href}"`);
		return;
	}
	if (item._type === "tabs") for (const tab of item.tabs) for (const nested of tab.blocks) assertSafeLinks(nested);
}
/**
* Raw-HTML sanitizer (D2) — the ONLY path agent-authored HTML may take.
* Explicit tag/attribute allowlist; scripts, inline handlers and data: URIs
* are stripped. Legacy WP-authored `contentRendered` may bypass this (it is
* trusted upstream content, rendered exactly as today).
*/
var SANITIZE_OPTIONS = {
	allowedTags: [
		"p",
		"br",
		"strong",
		"em",
		"b",
		"i",
		"u",
		"a",
		"ul",
		"ol",
		"li",
		"h2",
		"h3",
		"h4",
		"blockquote",
		"code",
		"pre",
		"img",
		"figure",
		"figcaption"
	],
	allowedAttributes: {
		a: [
			"href",
			"title",
			"rel",
			"target"
		],
		img: [
			"src",
			"alt",
			"title",
			"width",
			"height"
		],
		code: ["class"]
	},
	allowedSchemes: [
		"http",
		"https",
		"mailto"
	],
	allowedSchemesByTag: { img: ["http", "https"] },
	transformTags: { a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }) }
};
/** Sanitize raw HTML from an agent-authored content field. */
function sanitizeContentHtml(html) {
	return sanitizeHtml(html, SANITIZE_OPTIONS);
}
/** Reject javascript:/data: hrefs in link marks — belts and braces (D3). */
function isSafeHref(href) {
	try {
		const url = new URL(href, "https://invalid.local");
		return url.protocol === "https:" || url.protocol === "http:" || url.protocol === "mailto:";
	} catch {
		return false;
	}
}
export { parsePortableText as n, sanitizeContentHtml as r, isSafeHref as t };
