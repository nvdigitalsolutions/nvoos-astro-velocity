import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { createHash, timingSafeEqual } from "node:crypto";
// src/pages/internal/revalidate.ts
var revalidate_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var DEFAULT_TAGS = ["products"];
function tokenMatches(provided, expected) {
	const a = createHash("sha256").update(provided).digest();
	const b = createHash("sha256").update(expected).digest();
	return timingSafeEqual(a, b);
}
var POST = async ({ request, cache }) => {
	const token = process.env.NVOOS_REVALIDATE_TOKEN;
	if (!token) return new Response("revalidation disabled", { status: 503 });
	const auth = request.headers.get("authorization") ?? "";
	const provided = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
	if (!provided || !tokenMatches(provided, token)) return new Response("unauthorized", { status: 401 });
	if (!cache.enabled) return new Response("route cache disabled", { status: 503 });
	let tags = [];
	try {
		const body = await request.json();
		if (Array.isArray(body?.tags)) tags = body.tags.map((tag) => String(tag));
	} catch {}
	const purge = tags.length > 0 ? tags : DEFAULT_TAGS;
	await cache.invalidate({ tags: purge });
	return new Response(JSON.stringify({ purged: purge }), {
		status: 200,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"cache-control": "no-store"
		}
	});
};
// \0virtual:astro:page:src/pages/internal/revalidate@_@ts
var page = () => revalidate_exports;
export { page };
