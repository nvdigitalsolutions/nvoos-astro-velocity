import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
// src/pages/robots.txt.ts
var robots_txt_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = ({ site }) => {
	const body = [
		"User-agent: *",
		"Allow: /",
		"",
		`Sitemap: ${(site ?? new URL("https://store.nvoos.cloud")).toString().replace(/\/+$/, "")}/sitemap.xml`,
		""
	].join("\n");
	return new Response(body, {
		status: 200,
		headers: {
			"content-type": "text/plain; charset=utf-8",
			"cache-control": "public, s-maxage=3600"
		}
	});
};
// \0virtual:astro:page:src/pages/robots.txt@_@ts
var page = () => robots_txt_exports;
export { page };
