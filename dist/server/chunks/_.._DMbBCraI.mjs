import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { C as unescapeHTML, c as Fragment$2, h as maybeRenderHead, m as renderTemplate, s as renderComponent, x as addAttribute } from "./server_COcTL13r.mjs";
import { t as createComponent } from "./astro-component_DeSnnQc7.mjs";
import { t as createAstro } from "./astro-global_CY5q3Xj5.mjs";
import "./compiler_tBncm0O6.mjs";
import { d as selectVariant, f as selectedVariants, i as addToCart, l as loadSelectedVariantsFromStorage, t as $$BaseLayout } from "./BaseLayout_Cztu7urN.mjs";
import { n as resolveCurrency, t as formatPrice } from "./money_D3wLOywT.mjs";
import { i as responsiveImage, n as fixedImage, r as renderOrigin, t as $$ProductCard } from "./ProductCard_D3Ry8Isb.mjs";
import { m as getProducts, p as getProduct, v as getThemePolicy } from "./client_DhvHaxQG.mjs";
import { t as isPublished } from "./publish_DHIf2m0M.mjs";
import { n as normalizeProductMedia, r as sanitizeDescription } from "./normalize_3P-o4l4k.mjs";
import { a as productPath, o as slugify, r as categoryPath, t as absoluteUrl } from "./url_C-9WkiDw.mjs";
import { i as jsonLdFor } from "./jsonld_kjDNXr83.mjs";
import { t as metaForProduct } from "./meta_BE8QV8yn.mjs";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
// src/islands/GalleryLightbox.tsx
function GalleryLightbox({ entries, alt }) {
	const [active, setActive] = useState(0);
	const [open, setOpen] = useState(false);
	if (entries.length === 0) return null;
	const current = entries[active];
	const hasMany = entries.length > 1;
	return /* @__PURE__ */ jsxs("div", {
		className: "gallery",
		children: [
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "gallery__main",
				onClick: () => setOpen(true),
				"aria-label": "Open image fullscreen",
				children: /* @__PURE__ */ jsx("img", {
					src: current.full.src,
					srcSet: current.full.srcset,
					sizes: current.full.sizes,
					width: current.full.width,
					height: current.full.height,
					alt
				})
			}),
			hasMany && /* @__PURE__ */ jsx("div", {
				className: "gallery__thumbs",
				role: "tablist",
				"aria-label": "Product images",
				children: entries.map((entry, index) => /* @__PURE__ */ jsx("button", {
					type: "button",
					className: index === active ? "gallery__thumb is-active" : "gallery__thumb",
					onClick: () => setActive(index),
					role: "tab",
					"aria-selected": index === active,
					"aria-label": `Show image ${index + 1} of ${entries.length}`,
					children: /* @__PURE__ */ jsx("img", {
						src: entry.thumb.src,
						alt: "",
						loading: "lazy",
						width: entry.thumb.width,
						height: entry.thumb.height
					})
				}, entry.thumb.src))
			}),
			open && /* @__PURE__ */ jsxs("div", {
				className: "gallery__overlay",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": alt,
				onClick: () => setOpen(false),
				children: [/* @__PURE__ */ jsx("img", {
					src: current.full.src,
					alt
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "gallery__close",
					onClick: () => setOpen(false),
					"aria-label": "Close",
					children: "Close"
				})]
			})
		]
	});
}
// src/islands/AddToCartButton.tsx
function AddToCartButton({ productId, name, price, image }) {
	const [added, setAdded] = useState(false);
	useEffect(() => {
		loadSelectedVariantsFromStorage();
	}, []);
	const add = () => {
		const selection = selectedVariants.get()[productId];
		addToCart({
			productId,
			name,
			price: selection ? selection.price : price,
			image,
			...selection ? {
				variantId: selection.variantId,
				attributes: selection.attributes
			} : {}
		});
		setAdded(true);
		window.setTimeout(() => setAdded(false), 2e3);
	};
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		className: "btn",
		onClick: add,
		children: added ? "Added to cart ✓" : "Add to cart"
	});
}
// src/lib/commerce/variants.ts
/** Group the variant attributes by name, preserving option order. */
function variantGroups(variants) {
	const groups = [];
	const seen = /* @__PURE__ */ new Map();
	for (const variant of variants) for (const attribute of variant.attributes) {
		let group = seen.get(attribute.name);
		if (!group) {
			group = /* @__PURE__ */ new Set();
			seen.set(attribute.name, group);
			groups.push({
				name: attribute.name,
				values: []
			});
		}
		if (!group.has(attribute.value)) {
			group.add(attribute.value);
			groups.find((item) => item.name === attribute.name)?.values.push(attribute.value);
		}
	}
	return groups;
}
/** A value is sold out when every variant carrying it has no stock. */
function isVariantValueSoldOut(variants, name, value) {
	const carriers = variants.filter((variant) => variant.attributes.some((attribute) => attribute.name === name && attribute.value === value));
	return carriers.length > 0 && carriers.every((variant) => (variant.stock ?? 0) <= 0);
}
/** Resolve the unique variant matching EVERY selected value, or null when the
*  selection is incomplete or contradictory. */
function resolveVariant(variants, selection) {
	const entries = Object.entries(selection);
	if (entries.length === 0) return null;
	return variants.find((variant) => {
		const map = new Map(variant.attributes.map((attribute) => [attribute.name, attribute.value]));
		return entries.every(([name, value]) => map.get(name) === value);
	}) ?? null;
}
/** Serialize the attributes for the cart line-item shape (106 §1.1). */
function variantAttributes(variant) {
	return variant.attributes.map((attribute) => ({ ...attribute }));
}
// src/islands/VariantSelector.tsx
/** Serialize the JSON-LD block for one variant (the server emits the full
*  Offer[]; the selector narrows it to the selection). */
function applyJsonLdOffer(productId, variant) {
	if (!variant) return;
	const productBlock = Array.from(document.querySelectorAll("script[type=\"application/ld+json\"]")).find((script) => (script.textContent ?? "").includes("\"@type\":\"Product\""));
	if (!productBlock) return;
	try {
		const parsed = JSON.parse(productBlock.textContent ?? "{}");
		parsed.offers = [{
			"@type": "Offer",
			price: String(variant.price),
			priceCurrency: resolveCurrency(),
			sku: variant.sku,
			availability: `https://schema.org/${(variant.stock ?? 0) > 0 ? "InStock" : "OutOfStock"}`,
			url: new URL(`/products/${productId}/?variant=${variant.id}`, window.location.origin).toString()
		}];
		productBlock.textContent = JSON.stringify(parsed);
	} catch {}
}
/** Update the server-rendered price block outside the island root. */
function applyPrice(basePrice, baseOldPrice, variant) {
	const priceNode = document.querySelector("[data-variant-price]");
	const oldPriceNode = document.querySelector("[data-variant-old-price]");
	if (priceNode) priceNode.textContent = formatPrice(variant ? variant.price : basePrice);
	if (oldPriceNode) {
		const oldPrice = variant ? variant.oldPrice : baseOldPrice;
		const price = variant ? variant.price : basePrice;
		if (oldPrice !== null && oldPrice > price) {
			oldPriceNode.textContent = formatPrice(oldPrice);
			oldPriceNode.removeAttribute("hidden");
		} else oldPriceNode.setAttribute("hidden", "");
	}
}
function VariantSelector({ productId, basePrice, baseOldPrice, variants }) {
	const [selection, setSelection] = useState({});
	const resolved = resolveVariant(variants, selection);
	useEffect(() => {
		loadSelectedVariantsFromStorage();
		const restored = selectedVariants.get()[productId];
		if (restored) {
			const restoredSelection = {};
			for (const attribute of restored.attributes) restoredSelection[attribute.name] = attribute.value;
			setSelection(restoredSelection);
		}
		document.querySelector(`[data-variant-root="${productId}"]`)?.setAttribute("data-hydrated", "true");
	}, [productId]);
	useEffect(() => {
		applyPrice(basePrice, baseOldPrice, resolved);
		applyJsonLdOffer(productId, resolved);
	}, [
		basePrice,
		baseOldPrice,
		productId,
		resolved
	]);
	const choose = (name, value) => {
		const next = {
			...selection,
			[name]: value
		};
		const variant = resolveVariant(variants, next);
		if (!variant) return;
		setSelection(next);
		selectVariant(productId, {
			variantId: variant.id,
			price: variant.price,
			attributes: variantAttributes(variant)
		});
	};
	return /* @__PURE__ */ jsx("div", {
		className: "variant-selector",
		"data-variant-root": productId,
		children: variantGroups(variants).map((group) => /* @__PURE__ */ jsxs("fieldset", {
			className: "variant-group",
			children: [/* @__PURE__ */ jsx("legend", { children: group.name }), /* @__PURE__ */ jsx("div", {
				className: "variant-options",
				children: group.values.map((value) => {
					const soldOut = isVariantValueSoldOut(variants, group.name, value);
					const checked = selection[group.name] === value;
					return /* @__PURE__ */ jsxs("label", {
						className: `variant-option${checked ? " is-selected" : ""}${soldOut ? " is-sold-out" : ""}`,
						children: [/* @__PURE__ */ jsx("input", {
							type: "radio",
							name: `variant-${productId}-${group.name.toLowerCase()}`,
							value,
							checked,
							disabled: soldOut,
							onChange: () => choose(group.name, value)
						}), /* @__PURE__ */ jsxs("span", { children: [value, soldOut ? " (sold out)" : ""] })]
					}, value);
				})
			})]
		}, group.name))
	});
}
// src/islands/PromoCodeField.tsx
var API_BASE = "/api";
function PromoCodeField() {
	const [code, setCode] = useState("");
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	const [busy, setBusy] = useState(false);
	const [hydrated, setHydrated] = useState(false);
	useEffect(() => {
		setHydrated(true);
	}, []);
	const validate = async () => {
		const trimmed = code.trim();
		if (!trimmed) return;
		setBusy(true);
		setError(null);
		setResult(null);
		try {
			const res = await fetch(`${API_BASE}/promocodes/validate?code=${encodeURIComponent(trimmed)}`, { headers: { accept: "application/json" } });
			if (res.ok) setResult(await res.json());
			else setError(res.status === 404 ? "Promo code not found." : "This promo code cannot be used.");
		} catch {
			setError("Could not reach the store. Try again.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "promo-field",
		"data-hydrated": hydrated ? "true" : "false",
		children: [
			/* @__PURE__ */ jsx("label", {
				htmlFor: "promo-code",
				children: "Promo code"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "promo-field__row",
				children: [/* @__PURE__ */ jsx("input", {
					id: "promo-code",
					type: "text",
					value: code,
					onChange: (event) => setCode(event.target.value),
					placeholder: "e.g. SUMMER10"
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "btn btn--ghost",
					onClick: validate,
					disabled: busy,
					children: busy ? "Checking…" : "Apply"
				})]
			}),
			result && /* @__PURE__ */ jsxs("p", {
				className: "promo-field__ok",
				role: "status",
				children: [
					result.code,
					" applied — ",
					result.discount,
					"% off",
					result.expiresAt ? ` until ${result.expiresAt}` : "",
					"."
				]
			}),
			error && /* @__PURE__ */ jsx("p", {
				className: "promo-field__err",
				role: "alert",
				children: error
			})
		]
	});
}
// src/pages/products/[id]/[...slug].astro
var ____slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Component,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.nvoos.cloud");
var $$Component = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Component;
	Astro.response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
	const id = Number(Astro.params.id ?? 0);
	if (!Number.isInteger(id) || id <= 0) return new Response("Not found", { status: 404 });
	const raw = await getProduct(id, Astro.url);
	if (!raw || !isPublished(raw)) return new Response("Product not found", { status: 404 });
	if (String(Astro.params.slug ?? "").replace(/\/+$/, "") !== slugify(raw.name)) return Astro.redirect(productPath(id, raw.name), 301);
	const policy = await getThemePolicy(Astro.url);
	if (Astro.cache.enabled) Astro.cache.set({
		maxAge: 300,
		swr: 600,
		tags: ["products", `product-${id}`],
		etag: policy.updatedAt
	});
	const product = normalizeProductMedia(raw);
	const site = Astro.site ?? new URL("https://store.nvoos.cloud");
	const meta = metaForProduct(product, site);
	const ogImage = absoluteUrl(site, `/og/product/${product.id}.png`);
	const breadcrumbs = [{
		name: "Home",
		url: absoluteUrl(site, "/")
	}, ...product.category ? [{
		name: product.category.name,
		url: absoluteUrl(site, categoryPath(product.category.id, product.category.name))
	}] : []];
	const related = product.category ? (await getProducts(Astro.url, {
		page: 1,
		limit: 8,
		where: { category: { equals: product.category.id } },
		sort: "-date"
	})).docs.filter((candidate) => candidate.id !== product.id && isPublished(candidate)).map(normalizeProductMedia) : [];
	const jsonld = jsonLdFor({
		type: "Product",
		product,
		site,
		currency: resolveCurrency(),
		breadcrumb: breadcrumbs
	});
	const origin = renderOrigin(Astro.url, Astro.site);
	const gallery = [product.image, ...product.images].filter(Boolean).map((src) => ({
		full: responsiveImage(origin, src, {
			width: 600,
			height: 750,
			widths: [600, 1200],
			sizes: "(min-width: 800px) 600px, 100vw"
		}),
		thumb: fixedImage(origin, src, 80, 100)
	}));
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": meta.title,
		"description": meta.description,
		"canonical": meta.canonical,
		"markdownHref": meta.canonical ? `${meta.canonical.replace(/\/+$/, "")}/index.md` : void 0,
		"image": ogImage,
		"jsonld": jsonld
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a>${product.category && renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate`${" / "}<a${addAttribute(categoryPath(product.category.id, product.category.name), "href")}>${product.category.name}</a>` })}`}${" / "}<span>${product.name}</span></nav><article class="pdp"><div>${renderComponent($$result, "GalleryLightbox", GalleryLightbox, {
		"entries": gallery,
		"alt": product.name,
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/islands/GalleryLightbox.tsx",
		"client:component-export": "default"
	})}</div><div><h1>${product.name}</h1>${product.brand && renderTemplate`<p>Brand:${" "}<a${addAttribute(`/brands/${product.brand.id}/${slugify(product.brand.name)}/`, "href")}>${product.brand.name}</a></p>`}${product.rating !== null && renderTemplate`<p>Rating: ${product.rating.toFixed(1)} / 5</p>`}<p class="pdp__price" data-price-root><span data-variant-price>${formatPrice(product.price)}</span><span class="pdp__old-price" data-variant-old-price${addAttribute(product.oldPrice === null || product.oldPrice <= product.price, "hidden")}>${product.oldPrice !== null && product.oldPrice > product.price ? formatPrice(product.oldPrice) : ""}</span></p>${product.colors.length > 0 && renderTemplate`<p>${product.colors.map((color) => renderTemplate`<span class="swatch"${addAttribute(color.name, "title")}${addAttribute(`background:${color.hexCode || "#ccc"}`, "style")}></span>`)}</p>`}${product.variants && product.variants.length > 0 && renderTemplate`${renderComponent($$result, "VariantSelector", VariantSelector, {
		"productId": product.id,
		"basePrice": product.price,
		"baseOldPrice": product.oldPrice,
		"variants": product.variants,
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/islands/VariantSelector.tsx",
		"client:component-export": "default"
	})}`}${renderComponent($$result, "AddToCartButton", AddToCartButton, {
		"productId": product.id,
		"name": product.name,
		"price": product.price,
		"image": product.image,
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/islands/AddToCartButton.tsx",
		"client:component-export": "default"
	})}${renderComponent($$result, "PromoCodeField", PromoCodeField, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/islands/PromoCodeField.tsx",
		"client:component-export": "default"
	})}<section><h2>Description</h2><div>${unescapeHTML(sanitizeDescription(product.description))}</div></section></div></article>${related.length > 0 && renderTemplate`<section><h2>You may also like</h2><div class="product-grid">${related.map((item) => renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, { "product": item })}`)}</div></section>`}` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/products/[id]/[...slug].astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/products/[id]/[...slug].astro";
var $$url = "/products/[id]/[...slug]/";
// \0virtual:astro:page:src/pages/products/[id]/[...slug]@_@astro
var page = () => ____slug__exports;
export { page };
