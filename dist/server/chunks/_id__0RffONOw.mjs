import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { n as semantic } from "./tokens.generated_Ci1Wc5Hv.mjs";
import { f as getProduct } from "./client_TtS43Z5n.mjs";
import { t as isPublished } from "./publish_DHIf2m0M.mjs";
import { t as formatPrice } from "./money_D3wLOywT.mjs";
import { createRequire } from "node:module";
import React from "react";
import { readFileSync } from "node:fs";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
// src/lib/seo/og.ts
/** The semantic layer, coerced for the card (generated values are strings). */
function ogCardTokens() {
	const tokens = semantic;
	return {
		ink: tokens.ink ?? "#1a1a1a",
		muted: tokens.muted ?? "#6b6b6b",
		surface: tokens.surface ?? "#ffffff",
		accent: tokens.accent ?? "#0f6b4f",
		"accent-ink": tokens["accent-ink"] ?? "#ffffff",
		line: tokens.line ?? "#e4e4e2"
	};
}
/** The React element satori renders (unit-tested for product fields). */
function ogCardElement(product, tokens) {
	const price = formatPrice(product.price);
	const subtitle = [product.brand?.name, product.category?.name].filter(Boolean).join(" · ");
	return React.createElement("div", { style: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		width: "100%",
		height: "100%",
		background: tokens.surface,
		padding: "64px",
		fontFamily: "Inter",
		border: `1px solid ${tokens.line}`
	} }, React.createElement("div", { style: {
		display: "flex",
		flexDirection: "column",
		flexGrow: 1,
		justifyContent: "flex-end"
	} }, React.createElement("div", { style: {
		display: "flex",
		alignItems: "center",
		gap: "16px"
	} }, React.createElement("div", { style: {
		display: "flex",
		background: tokens.accent,
		color: tokens["accent-ink"],
		fontSize: "24px",
		fontWeight: 700,
		borderRadius: "8px",
		padding: "8px 20px"
	} }, "NV Store"), subtitle ? React.createElement("div", { style: {
		display: "flex",
		color: tokens.muted,
		fontSize: "24px"
	} }, subtitle) : null), React.createElement("div", { style: {
		display: "flex",
		color: tokens.ink,
		fontSize: "64px",
		fontWeight: 700,
		marginTop: "24px"
	} }, product.name), React.createElement("div", { style: {
		display: "flex",
		color: tokens.accent,
		fontSize: "40px",
		fontWeight: 700,
		marginTop: "12px"
	} }, price)));
}
// src/pages/og/product/[id].png.ts
var _id__png_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var require = createRequire(import.meta.url);
var FONT_REGULAR = readFileSync(require.resolve("@fontsource/inter/files/inter-latin-400-normal.woff"));
var FONT_BOLD = readFileSync(require.resolve("@fontsource/inter/files/inter-latin-700-normal.woff"));
var GET = async ({ params, url, cache, redirect }) => {
	const id = Number(params.id ?? 0);
	if (!Number.isInteger(id) || id <= 0) return new Response("Not found", { status: 404 });
	const raw = await getProduct(id, url);
	if (!raw || !isPublished(raw)) return new Response("Product not found", { status: 404 });
	if (cache.enabled) cache.set({
		maxAge: 86400,
		swr: 86400,
		tags: ["products", `product-${id}`]
	});
	try {
		const svg = await satori(ogCardElement(raw, ogCardTokens()), {
			width: 1200,
			height: 630,
			fonts: [{
				name: "Inter",
				data: FONT_REGULAR,
				weight: 400,
				style: "normal"
			}, {
				name: "Inter",
				data: FONT_BOLD,
				weight: 700,
				style: "normal"
			}]
		});
		const png = new Resvg(svg, { fitTo: {
			mode: "width",
			value: 1200
		} }).render().asPng();
		return new Response(new Uint8Array(png), {
			status: 200,
			headers: {
				"content-type": "image/png",
				"cache-control": "public, s-maxage=86400, stale-while-revalidate=86400"
			}
		});
	} catch (error) {
		console.error(`[og] card render failed for product ${id}:`, error);
		const image = raw.image;
		if (image) return redirect(image, 302);
		return new Response("Not found", { status: 404 });
	}
};
// \0virtual:astro:page:src/pages/og/product/[id].png@_@ts
var page = () => _id__png_exports;
export { page };
