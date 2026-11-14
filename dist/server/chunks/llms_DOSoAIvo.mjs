// src/lib/llms.ts
/** The canonical URL of a site path. */
function pageUrl(origin, path) {
	return `${origin.replace(/\/+$/, "")}${path.replace(/\/+$/, "")}/`;
}
/** The markdown variant of a site path (`/about/` → `<origin>/about/index.md`). */
function markdownUrl(origin, path) {
	return `${origin.replace(/\/+$/, "")}${path.replace(/\/+$/, "")}/index.md`;
}
function entryLine(entry, origin, variant) {
	const title = entry.title.trim();
	if (!title) return;
	const note = (entry.note ?? "").replace(/\s+/g, " ").trim();
	const clipped = note.length > 120 ? `${note.slice(0, 117).replace(/\s+\S*$/, "")}…` : note;
	const href = variant === "markdown" ? markdownUrl(origin, entry.path) : pageUrl(origin, entry.path);
	return `- [${title.replace(/[[\]]/g, "")}](${href})${clipped ? `: ${clipped}` : ""}`;
}
function section(heading, entries, origin, variant) {
	const lines = (entries ?? []).slice().sort((a, b) => a.path.localeCompare(b.path)).map((entry) => entryLine(entry, origin, variant)).filter((line) => Boolean(line));
	if (lines.length === 0) return "";
	return `## ${heading}\n\n${lines.join("\n")}\n`;
}
/** Compose an `llms.txt` document. Section order is fixed by the v2 format. */
function composeLlmsTxt(input) {
	const variant = input.variant ?? "html";
	return `${[
		`# ${input.name.trim()}\n`,
		`> ${input.summary.replace(/\s+/g, " ").trim()}\n`,
		input.extra ? `${input.extra.trim()}\n` : "",
		section("Pages", input.pages, input.origin, variant),
		section("Posts", input.posts, input.origin, variant),
		section("Products", input.products, input.origin, variant),
		...(input.extraSections ?? []).map((extra) => section(extra.heading, extra.entries, input.origin, variant)),
		section("Optional", input.optional, input.origin, variant)
	].filter(Boolean).join("\n")}`.replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}
/** One Portable Text block's spans → inline markdown (strong/em/link only). */
function spansToMarkdown(children, markDefs) {
	return children.map((span) => {
		let text = span.text ?? "";
		for (const mark of span.marks ?? []) if (mark === "strong") text = `**${text}**`;
		else if (mark === "em") text = `*${text}*`;
		else {
			const definition = markDefs.find((def) => def._key === mark);
			if (definition?.href) text = `[${text}](${definition.href})`;
		}
		return text;
	}).join("");
}
function gfmTable(columns, rows) {
	const escape = (cell) => cell.replace(/\|/g, "\\|");
	return [
		`| | ${columns.map(escape).join(" | ")} |`,
		`| --- | ${columns.map(() => "---").join(" | ")} |`,
		...rows.map((row) => `| **${escape(row.label)}** | ${row.values.map(escape).join(" | ")} |`)
	].join("\n");
}
/**
* Project Portable Text to markdown. Every allowlisted block type has an
* explicit projection — nothing is silently dropped except `promotion`, which
* is a rendered banner whose copy lives in the promotions collection, not in
* the block. `productGrid` keeps its ids (facts) rather than inventing names.
*/
function markdownFromPortableText(items) {
	const out = [];
	for (const raw of items) {
		const item = raw;
		const type = String(item._type ?? "");
		switch (type) {
			case "block": {
				const style = String(item.style ?? "normal");
				const text = spansToMarkdown(item.children ?? [], item.markDefs ?? []).trim();
				if (!text) break;
				out.push(style === "h2" ? `## ${text}` : style === "h3" ? `### ${text}` : text);
				break;
			}
			case "hero":
				if (item.title) out.push(`## ${String(item.title)}`);
				if (item.lede) out.push(String(item.lede));
				break;
			case "image":
				if (item.src) out.push(`![${String(item.alt ?? "")}](${String(item.src)})`);
				break;
			case "testimonial": {
				const author = item.author ? `\n\n— ${String(item.author)}` : "";
				out.push(`> ${String(item.quote ?? "")}${author}`);
				break;
			}
			case "faq":
				out.push(`**${String(item.question ?? "")}**\n\n${String(item.answer ?? "")}`);
				break;
			case "stat":
				out.push(`- **${String(item.value ?? "")}** — ${String(item.label ?? "")}`);
				break;
			case "comparison": {
				const columns = item.columns ?? [];
				const rows = item.rows ?? [];
				if (item.caption) out.push(`**${String(item.caption)}**`);
				if (columns.length > 0 && rows.length > 0) out.push(gfmTable(columns, rows));
				break;
			}
			case "steps": {
				const steps = item.items ?? [];
				out.push(steps.map((step, index) => `${index + 1}. **${step.title}**${step.body ? ` — ${step.body}` : ""}`).join("\n"));
				break;
			}
			case "team": {
				const people = item.people ?? [];
				out.push(people.map((person) => `- **${person.name}**${person.role ? ` — ${person.role}` : ""}`).join("\n"));
				break;
			}
			case "tabs": {
				const tabs = item.tabs ?? [];
				for (const tab of tabs) {
					out.push(`### ${tab.title}`);
					out.push(markdownFromPortableText(tab.blocks));
				}
				break;
			}
			case "productGrid": {
				const ids = item.ids ?? [];
				if (ids.length > 0) out.push(`**Featured products:** ${ids.join(", ")}`);
				break;
			}
			case "promotion": break;
			default: out.push(`_[unrendered block: ${type}]_`);
		}
	}
	return `${out.filter(Boolean).join("\n\n").replace(/\n{3,}/g, "\n\n").trim()}\n`;
}
/**
* Legacy WordPress HTML → paragraph-structured text. Structural markdown comes
* from Portable Text; this path keeps paragraph and list breaks and strips the
* markup, which is the honest ceiling for trusted-but-unstructured HTML.
*/
function textFromHtml(html) {
	if (!html) return "";
	return `${html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ").replace(/<br\s*\/?>/gi, "\n").replace(/<\/(p|div|li|h[1-6]|blockquote|tr)>/gi, "\n\n").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#0?39;/g, "'").replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").replace(/\n{3,}/g, "\n\n").trim()}\n`;
}
export { markdownFromPortableText as n, textFromHtml as r, composeLlmsTxt as t };
