import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { _ as addAttribute, c as Fragment$2, h as maybeRenderHead, m as renderTemplate, s as renderComponent } from "./server_oTayxuEg.mjs";
import { t as createComponent } from "./astro-component_DkgBvFJz.mjs";
import { t as createAstro } from "./astro-global_CZt7TqFY.mjs";
import { t as $$BaseLayout } from "./BaseLayout_B1AMrDC3.mjs";
import "./compiler_CWCzah9E.mjs";
import { c as getGlobal, p as getProducts, s as getCollectionOrNull } from "./client_TtS43Z5n.mjs";
import { t as absoluteUrl } from "./url_C-9WkiDw.mjs";
import { n as pageTitle } from "./meta_BE8QV8yn.mjs";
import { n as normalizeProductMedia, t as normalizeMediaUrl } from "./normalize_Uj83xBMQ.mjs";
import { n as fixedImage, r as renderOrigin } from "./ProductCard_-syNoHgs.mjs";
import { t as $$ProductGrid } from "./ProductGrid_8gCC8mbZ.mjs";
import { a as organizationJsonLd, s as webSiteJsonLd } from "./jsonld_kjDNXr83.mjs";
import { useEffect, useId, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
// src/components/Banner.astro
createAstro("https://astro.nvoos.cloud");
var $$Banner = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Banner;
	const { banner } = Astro.props;
	const origin = renderOrigin(Astro.url, Astro.site);
	const image = banner?.image ? fixedImage(origin, banner.image, 1200, 300) : null;
	return renderTemplate`${banner && (banner.image || banner.promotion) && renderTemplate`${maybeRenderHead($$result)}<section class="banner" data-astro-cid-uljtwisc>${image && renderTemplate`<img${addAttribute(image.src, "src")}${addAttribute(image.srcset, "srcset")}${addAttribute(image.width, "width")}${addAttribute(image.height, "height")} alt="" loading="eager" decoding="async" data-astro-cid-uljtwisc>`}${banner.promotion?.active && renderTemplate`<p class="banner__promo" data-astro-cid-uljtwisc><a href="/promotions/" data-astro-cid-uljtwisc><strong data-astro-cid-uljtwisc>${banner.promotion.title}</strong></a></p>`}</section>`}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/Banner.astro", void 0);
// src/components/Carousel.astro
createAstro("https://astro.nvoos.cloud");
var $$Carousel = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Carousel;
	const carousel = await getGlobal("carousel", Astro.url);
	const origin = renderOrigin(Astro.url, Astro.site);
	const slides = (carousel?.carousel ?? []).map((slide) => ({
		...slide,
		image: slide.image ? fixedImage(origin, normalizeMediaUrl(slide.image), 560, 315) : null
	}));
	return renderTemplate`${slides.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section class="carousel" aria-label="Featured promotions" data-astro-cid-oulirr76>${slides.map((slide) => renderTemplate`<figure data-astro-cid-oulirr76>${slide.image && renderTemplate`<img${addAttribute(slide.image.src, "src")}${addAttribute(slide.image.srcset, "srcset")}${addAttribute(slide.image.width, "width")}${addAttribute(slide.image.height, "height")} alt="" loading="lazy" decoding="async" data-astro-cid-oulirr76>`}${slide.promotion && renderTemplate`<figcaption data-astro-cid-oulirr76>${slide.promotion.title}</figcaption>`}</figure>`)}</section>`}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/Carousel.astro", void 0);
// src/islands/HomeStats.tsx
var STATS = [
	{
		key: "products",
		label: "Products"
	},
	{
		key: "categories",
		label: "Categories"
	},
	{
		key: "brands",
		label: "Brands"
	},
	{
		key: "posts",
		label: "Journal posts"
	}
];
function HomeStats({ counts }) {
	const [hydrated, setHydrated] = useState(false);
	useEffect(() => {
		setHydrated(true);
	}, []);
	return /* @__PURE__ */ jsx("dl", {
		className: "home-stats",
		"data-hydrated": hydrated ? "true" : "false",
		"aria-label": "Live store stats",
		children: STATS.map(({ key, label }) => /* @__PURE__ */ jsx(StatItem, {
			label,
			target: counts[key]
		}, key))
	});
}
function StatItem({ label, target }) {
	const [value, setValue] = useState(target);
	useEffect(() => {
		if (target === null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		setValue(0);
		let raf = 0;
		const start = performance.now();
		const duration = 900;
		const tick = (now) => {
			const progress = Math.min(1, (now - start) / duration);
			const eased = 1 - Math.pow(1 - progress, 3);
			setValue(Math.round(target * eased));
			if (progress < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [target]);
	return /* @__PURE__ */ jsxs("div", {
		className: "home-stats__item",
		children: [/* @__PURE__ */ jsx("dt", { children: label }), /* @__PURE__ */ jsx("dd", {
			"data-count": target === null ? void 0 : target,
			children: value === null ? "—" : value.toLocaleString("en-US")
		})]
	});
}
// src/islands/StackExplorer.tsx
var API_BASE = "/api";
var TABS = [
	{
		id: "frontend",
		label: "Frontend"
	},
	{
		id: "contract",
		label: "Commerce contract"
	},
	{
		id: "design",
		label: "Design system"
	},
	{
		id: "ai",
		label: "AI control"
	}
];
/** Read the active theme axes from <html> — data-theme is absent for light. */
function readTheme() {
	const root = document.documentElement;
	return {
		theme: root.getAttribute("data-theme") || "light",
		contrast: root.getAttribute("data-contrast") === "high" ? "high" : "standard"
	};
}
function StackExplorer() {
	const uid = useId();
	const contractStarted = useRef(false);
	const [hydrated, setHydrated] = useState(false);
	const [active, setActive] = useState("frontend");
	const [contract, setContract] = useState({ status: "idle" });
	const [theme, setTheme] = useState({
		theme: "light",
		contrast: "standard"
	});
	useEffect(() => {
		setHydrated(true);
		const syncTheme = () => setTheme(readTheme());
		syncTheme();
		document.addEventListener("astro:after-swap", syncTheme);
		return () => document.removeEventListener("astro:after-swap", syncTheme);
	}, []);
	useEffect(() => {
		if (active !== "contract" || contractStarted.current) return;
		contractStarted.current = true;
		let cancelled = false;
		setContract({ status: "loading" });
		fetch(`${API_BASE}/products?limit=1`, { headers: { accept: "application/json" } }).then(async (res) => {
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = await res.json();
			const count = typeof data.totalDocs === "number" ? data.totalDocs : 0;
			if (!cancelled) setContract({
				status: "ok",
				count
			});
		}).catch(() => {
			if (!cancelled) setContract({ status: "error" });
		});
		return () => {
			cancelled = true;
		};
	}, [active]);
	const activate = (id) => {
		setActive(id);
		document.getElementById(`${uid}-tab-${id}`)?.focus();
	};
	const onKeyDown = (event) => {
		const index = TABS.findIndex((tab) => tab.id === active);
		let next = -1;
		if (event.key === "ArrowRight") next = (index + 1) % TABS.length;
		else if (event.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
		else if (event.key === "Home") next = 0;
		else if (event.key === "End") next = TABS.length - 1;
		if (next === -1) return;
		event.preventDefault();
		activate(TABS[next].id);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "stack-explorer",
		"data-hydrated": hydrated ? "true" : "false",
		children: [
			/* @__PURE__ */ jsx("div", {
				role: "tablist",
				"aria-label": "Explore the stack",
				children: TABS.map((tab) => /* @__PURE__ */ jsx("button", {
					type: "button",
					role: "tab",
					id: `${uid}-tab-${tab.id}`,
					"aria-selected": active === tab.id,
					"aria-controls": `${uid}-panel-${tab.id}`,
					tabIndex: active === tab.id ? 0 : -1,
					onClick: () => activate(tab.id),
					onKeyDown,
					children: tab.label
				}, tab.id))
			}),
			/* @__PURE__ */ jsx("div", {
				role: "tabpanel",
				id: `${uid}-panel-frontend`,
				"aria-labelledby": `${uid}-tab-frontend`,
				tabIndex: 0,
				hidden: active !== "frontend",
				children: /* @__PURE__ */ jsx("p", { children: "Every route is rendered on the server: complete HTML arrives before any JavaScript runs, so search engines, screen readers, and slow connections all get the real page. A handful of React islands hydrate only where interactivity is needed, and View Transitions make navigation feel instant." })
			}),
			/* @__PURE__ */ jsxs("div", {
				role: "tabpanel",
				id: `${uid}-panel-contract`,
				"aria-labelledby": `${uid}-tab-contract`,
				tabIndex: 0,
				hidden: active !== "contract",
				children: [
					/* @__PURE__ */ jsxs("p", { children: [
						"The storefront speaks one stable, Payload-shaped REST envelope (",
						/* @__PURE__ */ jsx("code", { children: "nvoos-commerce/v1" }),
						") through the same-origin",
						" ",
						/* @__PURE__ */ jsx("code", { children: "/api/*" }),
						" proxy. WordPress and WooCommerce serve that envelope today; replacing the backend tomorrow would not touch a single line of frontend code."
					] }),
					contract.status === "loading" && /* @__PURE__ */ jsx("p", {
						className: "stack-live",
						role: "status",
						children: "Checking the contract…"
					}),
					contract.status === "ok" && /* @__PURE__ */ jsxs("p", {
						className: "stack-live",
						role: "status",
						children: [contract.count.toLocaleString("en-US"), " products served by the contract right now."]
					}),
					contract.status === "error" && /* @__PURE__ */ jsx("p", {
						className: "stack-live",
						role: "status",
						children: "Could not reach the contract right now."
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				role: "tabpanel",
				id: `${uid}-panel-design`,
				"aria-labelledby": `${uid}-tab-design`,
				tabIndex: 0,
				hidden: active !== "design",
				children: [/* @__PURE__ */ jsx("p", { children: "Colors, radii, type, and spacing all flow from a DTCG design-token layer with light, dark, and high-contrast modes — and runtime brand themes that apply instantly with no rebuild. Every token pair is audited against WCAG 2.2 contrast thresholds, and an optional server-side theme policy can pin one brand fleet-wide." }), /* @__PURE__ */ jsxs("p", {
					className: "stack-live",
					children: [
						"This page renders in the ",
						theme.theme,
						" theme with ",
						theme.contrast,
						" ",
						"contrast."
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				role: "tabpanel",
				id: `${uid}-panel-ai`,
				"aria-labelledby": `${uid}-tab-ai`,
				tabIndex: 0,
				hidden: active !== "ai",
				children: [/* @__PURE__ */ jsxs("p", { children: [
					"An MCP endpoint (",
					/* @__PURE__ */ jsx("code", { children: "/mcp" }),
					") exposes 35 tools across five slices — design (14), CMS (6), content (8), ops (5), and shop (2) — so an AI assistant can browse the catalog, publish posts, re-theme the store, audit contrast, and configure checkout through the same surface a human manager uses. Every write is fail-closed and authenticated."
				] }), /* @__PURE__ */ jsxs("p", { children: [
					"From ",
					/* @__PURE__ */ jsx("code", { children: "design_analyze" }),
					" (import a site's design language) to ",
					/* @__PURE__ */ jsx("code", { children: "content_preview_url" }),
					" (signed draft previews) and",
					" ",
					/* @__PURE__ */ jsx("code", { children: "shop_update" }),
					" (checkout globals) — an MCP client lists the full registry live at ",
					/* @__PURE__ */ jsx("code", { children: "/mcp" }),
					"."
				] })]
			})
		]
	});
}
// src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
createAstro("https://astro.nvoos.cloud");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	Astro.response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
	const [banner, newest, topRated, categoryMeta, brandMeta, postMeta] = await Promise.all([
		getGlobal("banner", Astro.url),
		getProducts(Astro.url, {
			page: 1,
			limit: 50,
			sort: "date"
		}),
		getProducts(Astro.url, {
			page: 1,
			limit: 50,
			sort: "-rating"
		}),
		getCollectionOrNull("categories", Astro.url, {
			page: 1,
			limit: 1
		}),
		getCollectionOrNull("brands", Astro.url, {
			page: 1,
			limit: 1
		}),
		getCollectionOrNull("content/posts", Astro.url, {
			page: 1,
			limit: 1
		})
	]);
	const normalizeList = (list) => list.map(normalizeProductMedia);
	const featured = normalizeList(newest.docs.filter((p) => p.isFeatured).slice(0, 8));
	const bestsellers = normalizeList(topRated.docs.filter((p) => p.isBestseller).slice(0, 8));
	const fallback = normalizeList(newest.docs.slice(0, 8));
	const liveCounts = {
		products: newest.totalDocs,
		categories: categoryMeta?.totalDocs ?? null,
		brands: brandMeta?.totalDocs ?? null,
		posts: postMeta?.totalDocs ?? null
	};
	const site = Astro.site ?? new URL("https://store.nvoos.cloud");
	const bannerData = banner;
	const hasCatalog = newest.totalDocs > 0;
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": pageTitle(),
		"description": "NV Store — the NV-authored, MIT-licensed headless storefront: server-rendered Astro, one stable commerce contract, and live design themes.",
		"canonical": absoluteUrl(site, "/"),
		"jsonld": [organizationJsonLd("NV Store", site), webSiteJsonLd("NV Store", site)]
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="hero reveal reveal--fade-up"><h1 class="hero__title">NV Store</h1><p class="hero__lede">An open-source, headless storefront demo: Astro renders the pages, WordPress and WooCommerce feed one stable contract, and a live design system re-themes the whole store — even from an AI assistant over MCP.</p><div class="hero__cta"><a class="btn" href="/products/">Browse products</a><a class="btn btn--ghost" href="#what-is-this-app">How it works</a><a class="btn btn--ghost" href="#tour">Take the tour</a></div></section>${renderComponent($$result, "Banner", $$Banner, { "banner": bannerData })}${renderComponent($$result, "Carousel", $$Carousel, {})}<section class="about" id="what-is-this-app" aria-labelledby="about-heading"><h2 id="about-heading">What is this app?</h2><div class="about-grid"><article class="about-card reveal reveal--fade-up"><h3>Headless &amp; server-rendered</h3><p>Astro renders every page on the server and ships minimal JavaScript: complete HTML for crawlers and slow connections, tiny interactive islands for everyone else.</p></article><article class="about-card"><h3>One contract, two backends</h3><p>A Payload-shaped REST envelope (<code>nvoos-commerce/v1</code>) feeds the whole storefront through the same-origin${" "}<code>/api/*</code> proxy — WordPress and WooCommerce catalogs today, any backend tomorrow.</p></article><article class="about-card"><h3>Themed by design tokens</h3><p>A DTCG token layer drives every color and type decision, with light, dark, high-contrast, and runtime brand themes — plus an optional server-side theme policy for fleet-wide control.</p></article><article class="about-card"><h3>A component library</h3><p>An accessibility-first UI kit — accordion, dialog, combobox, tabs — styled from the same tokens, with a living gallery at${" "}<a href="/components/">/components/</a>.</p></article><article class="about-card"><h3>Content, posts &amp; pages</h3><p>A governed content engine: blog posts and pages with Portable Text blocks, SEO fields, scheduled publishing, and signed preview links for drafts.</p></article><article class="about-card"><h3>Controllable by AI</h3><p>The built-in <code>/mcp</code> surface (35 tools) lets an AI assistant manage the catalog, publish content, re-theme the store, and configure checkout — audited and fail-closed.</p></article></div></section><section aria-labelledby="stats-heading"><h2 id="stats-heading" class="sr-only">Live store stats</h2>${renderComponent($$result, "HomeStats", HomeStats, {
		"counts": liveCounts,
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/islands/HomeStats.tsx",
		"client:component-export": "default"
	})}</section><section class="explore" aria-labelledby="explore-heading"><h2 id="explore-heading">Explore the stack</h2>${renderComponent($$result, "StackExplorer", StackExplorer, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/islands/StackExplorer.tsx",
		"client:component-export": "default"
	})}</section><section class="tour" id="tour" aria-labelledby="tour-heading"><h2 id="tour-heading">Take the tour</h2><ul class="tour-grid"><li class="tour-card"><a href="/components/"><h3>Component library</h3><p>The accessibility-first UI kit in a living gallery.</p></a></li><li class="tour-card"><a href="/tokens/"><h3>Design tokens</h3><p>The full DTCG token reference — colors, type, spacing.</p></a></li><li class="tour-card"><a href="/blog/"><h3>Blog &amp; content</h3><p>Posts and pages served by the content engine.</p></a></li><li class="tour-card"><a href="/manage/"><h3>Astro CMS</h3><p>The standalone admin — catalog, content, and design.</p></a></li></ul></section>${hasCatalog && renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate`<section><h2>Featured</h2>${renderComponent($$result, "ProductGrid", $$ProductGrid, { "products": featured.length > 0 ? featured : fallback })}</section><section><h2>Bestsellers</h2>${renderComponent($$result, "ProductGrid", $$ProductGrid, { "products": bestsellers.length > 0 ? bestsellers : fallback })}</section>` })}`}` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/index.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/index.astro";
// \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
export { page };
