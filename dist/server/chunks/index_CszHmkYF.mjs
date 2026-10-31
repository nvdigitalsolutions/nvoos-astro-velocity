import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { d as maybeRenderHead, i as renderComponent, p as addAttribute, u as renderTemplate } from "./server_Bp-6qVas.mjs";
import { t as createComponent } from "./astro-component_D398hF7X.mjs";
import { t as $$BaseLayout } from "./BaseLayout_Bwncmh8b.mjs";
import "./compiler_D-8-28NN.mjs";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
var bundle_generated_default = {
	groups: {
		"component": {
			"$comment": "Proposal 095 — component layer. Consumed by .btn/.card/.field etc. Values reference the semantic layer.",
			"btn": {
				"background": {
					"$type": "color",
					"$value": "{semantic.accent}"
				},
				"color": {
					"$type": "color",
					"$value": "{semantic.accent-ink}"
				},
				"border": {
					"$type": "color",
					"$value": "{semantic.accent}"
				},
				"radius": {
					"$type": "dimension",
					"$value": "{semantic.radius}"
				},
				"padding-y": {
					"$type": "dimension",
					"$value": "0.5rem"
				},
				"padding-x": {
					"$type": "dimension",
					"$value": "1rem"
				}
			},
			"card": {
				"gap": {
					"$type": "dimension",
					"$value": "0.4rem"
				},
				"radius": {
					"$type": "dimension",
					"$value": "{semantic.radius}"
				}
			},
			"field": {
				"border": {
					"$type": "color",
					"$value": "{semantic.line-strong}"
				},
				"radius": {
					"$type": "dimension",
					"$value": "{semantic.radius}"
				},
				"padding-y": {
					"$type": "dimension",
					"$value": "0.5rem"
				}
			}
		},
		"core": {
			"$comment": "Proposal 095 — NV oOS Astro Design System (ADS) core layer. Primitives only: palette, radii, spacing scale, typography. Keep in sync with src/lib/tokens/dtcg.ts validation rules.",
			"palette": {
				"ink": {
					"$type": "color",
					"$value": "#1a1a1a",
					"$description": "Near-black ink (matches the legacy --nv-ink)"
				},
				"muted": {
					"$type": "color",
					"$value": "#6b6b6b",
					"$description": "Muted text (matches the legacy --nv-muted)"
				},
				"surface": {
					"$type": "color",
					"$value": "#ffffff",
					"$description": "Primary surface (matches the legacy --nv-surface)"
				},
				"surface-alt": {
					"$type": "color",
					"$value": "#f5f5f4",
					"$description": "Alternate surface (matches the legacy --nv-surface-alt)"
				},
				"line": {
					"$type": "color",
					"$value": "#e4e4e2",
					"$description": "Hairline/border (matches the legacy --nv-line)"
				},
				"line-strong": {
					"$type": "color",
					"$value": "#767676",
					"$description": "Strong border for form fields (SC 1.4.11 3:1). Additive — not referenced by legacy aliases, so the 092 look is preserved."
				},
				"accent": {
					"$type": "color",
					"$value": "#0f6b4f",
					"$description": "Brand accent (matches the legacy --nv-accent)"
				},
				"accent-ink": {
					"$type": "color",
					"$value": "#ffffff",
					"$description": "Text on accent (matches the legacy --nv-accent-ink)"
				},
				"danger": {
					"$type": "color",
					"$value": "#b3261e",
					"$description": "Danger/promo (matches the legacy --nv-danger)"
				}
			},
			"radius": {
				"sm": {
					"$type": "dimension",
					"$value": "4px"
				},
				"md": {
					"$type": "dimension",
					"$value": "8px",
					"$description": "Matches the legacy --nv-radius"
				}
			},
			"space": {
				"xs": {
					"$type": "dimension",
					"$value": "0.25rem"
				},
				"sm": {
					"$type": "dimension",
					"$value": "0.5rem"
				},
				"md": {
					"$type": "dimension",
					"$value": "1rem",
					"$description": "Matches the legacy --nv-space"
				},
				"lg": {
					"$type": "dimension",
					"$value": "1.5rem"
				},
				"xl": {
					"$type": "dimension",
					"$value": "2rem"
				},
				"xxl": {
					"$type": "dimension",
					"$value": "3rem"
				},
				"gutter-fluid": {
					"$type": "dimension",
					"$value": "clamp(1rem, 0.5rem + 2vw, 2rem)",
					"$description": "Fluid page gutter (Utopia-style clamp). Additive — not referenced by legacy aliases, so the 092 look is preserved."
				}
			},
			"type": {
				"family-body": {
					"$type": "fontFamily",
					"$value": [
						"system-ui",
						"-apple-system",
						"'Segoe UI'",
						"Roboto",
						"sans-serif"
					],
					"$description": "Matches the legacy --nv-font"
				},
				"size-xs": {
					"$type": "dimension",
					"$value": "0.75rem"
				},
				"size-sm": {
					"$type": "dimension",
					"$value": "0.9rem"
				},
				"size-md": {
					"$type": "dimension",
					"$value": "1rem"
				},
				"size-lg": {
					"$type": "dimension",
					"$value": "1.15rem"
				},
				"size-xl": {
					"$type": "dimension",
					"$value": "1.6rem"
				},
				"size-fluid-display": {
					"$type": "dimension",
					"$value": "clamp(1.75rem, 1.2rem + 2.5vw, 2.75rem)",
					"$description": "Fluid display size. Additive — not referenced by legacy aliases."
				},
				"leading-body": {
					"$type": "dimension",
					"$value": "1.6",
					"$description": "Unitless line-height (matches the legacy body line-height)"
				}
			}
		},
		"semantic": {
			"$comment": "Proposal 095 — semantic layer. Components may only reference THIS layer. Values are DTCG references into the core layer (cross-file references are a documented ADS extension) or literal values.",
			"ink": {
				"$type": "color",
				"$value": "{core.palette.ink}"
			},
			"muted": {
				"$type": "color",
				"$value": "{core.palette.muted}"
			},
			"surface": {
				"$type": "color",
				"$value": "{core.palette.surface}"
			},
			"surface-alt": {
				"$type": "color",
				"$value": "{core.palette.surface-alt}"
			},
			"line": {
				"$type": "color",
				"$value": "{core.palette.line}"
			},
			"line-strong": {
				"$type": "color",
				"$value": "{core.palette.line-strong}",
				"$description": "Strong form-field border (SC 1.4.11). Additive."
			},
			"accent": {
				"$type": "color",
				"$value": "{core.palette.accent}"
			},
			"accent-ink": {
				"$type": "color",
				"$value": "{core.palette.accent-ink}"
			},
			"danger": {
				"$type": "color",
				"$value": "{core.palette.danger}"
			},
			"radius": {
				"$type": "dimension",
				"$value": "{core.radius.md}"
			},
			"font": {
				"$type": "fontFamily",
				"$value": "{core.type.family-body}"
			},
			"space": {
				"$type": "dimension",
				"$value": "{core.space.md}"
			},
			"focus-ring": {
				"$type": "dimension",
				"$value": "0 0 0 2px {core.palette.surface}, 0 0 0 4px {core.palette.accent}",
				"$description": "Accessible focus outline (shadow-based). Additive."
			}
		}
	},
	themes: {
		"default": {
			"$comment": "Proposal 095 — default theme: light + dark modes. Mode values override the semantic layer. Dark values are additive (no legacy alias changes, so 092 visuals are unchanged in light mode).",
			"light": {
				"ink": "#1a1a1a",
				"muted": "#6b6b6b",
				"surface": "#ffffff",
				"surface-alt": "#f5f5f4",
				"line": "#e4e4e2",
				"line-strong": "#767676",
				"accent": "#0f6b4f",
				"accent-ink": "#ffffff",
				"danger": "#b3261e"
			},
			"dark": {
				"ink": "#f5f5f4",
				"muted": "#a3a3a3",
				"surface": "#141414",
				"surface-alt": "#1f1f1f",
				"line": "#2e2e2e",
				"line-strong": "#8a8a8a",
				"accent": "#3d9c7d",
				"accent-ink": "#0b0f0d",
				"danger": "#ff6b5e"
			}
		},
		"example-brand": {
			"$comment": "Proposal 095 — example brand theme. Brand themes override semantic tokens only (the 092 Phase 4 rebrand primitive). Applied via data-theme=\"example-brand\".",
			"name": "example-brand",
			"description": "Example brand theme — override semantic tokens only.",
			"tokens": {
				"accent": "#1d4ed8",
				"accent-ink": "#ffffff",
				"surface-alt": "#f0f4ff"
			}
		}
	},
	_resolved: {
		"core": {
			"$comment": "Proposal 095 — NV oOS Astro Design System (ADS) core layer. Primitives only: palette, radii, spacing scale, typography. Keep in sync with src/lib/tokens/dtcg.ts validation rules.",
			"palette": {
				"ink": {
					"$type": "color",
					"$value": "#1a1a1a",
					"$description": "Near-black ink (matches the legacy --nv-ink)"
				},
				"muted": {
					"$type": "color",
					"$value": "#6b6b6b",
					"$description": "Muted text (matches the legacy --nv-muted)"
				},
				"surface": {
					"$type": "color",
					"$value": "#ffffff",
					"$description": "Primary surface (matches the legacy --nv-surface)"
				},
				"surface-alt": {
					"$type": "color",
					"$value": "#f5f5f4",
					"$description": "Alternate surface (matches the legacy --nv-surface-alt)"
				},
				"line": {
					"$type": "color",
					"$value": "#e4e4e2",
					"$description": "Hairline/border (matches the legacy --nv-line)"
				},
				"line-strong": {
					"$type": "color",
					"$value": "#767676",
					"$description": "Strong border for form fields (SC 1.4.11 3:1). Additive — not referenced by legacy aliases, so the 092 look is preserved."
				},
				"accent": {
					"$type": "color",
					"$value": "#0f6b4f",
					"$description": "Brand accent (matches the legacy --nv-accent)"
				},
				"accent-ink": {
					"$type": "color",
					"$value": "#ffffff",
					"$description": "Text on accent (matches the legacy --nv-accent-ink)"
				},
				"danger": {
					"$type": "color",
					"$value": "#b3261e",
					"$description": "Danger/promo (matches the legacy --nv-danger)"
				}
			},
			"radius": {
				"sm": {
					"$type": "dimension",
					"$value": "4px"
				},
				"md": {
					"$type": "dimension",
					"$value": "8px",
					"$description": "Matches the legacy --nv-radius"
				}
			},
			"space": {
				"xs": {
					"$type": "dimension",
					"$value": "0.25rem"
				},
				"sm": {
					"$type": "dimension",
					"$value": "0.5rem"
				},
				"md": {
					"$type": "dimension",
					"$value": "1rem",
					"$description": "Matches the legacy --nv-space"
				},
				"lg": {
					"$type": "dimension",
					"$value": "1.5rem"
				},
				"xl": {
					"$type": "dimension",
					"$value": "2rem"
				},
				"xxl": {
					"$type": "dimension",
					"$value": "3rem"
				},
				"gutter-fluid": {
					"$type": "dimension",
					"$value": "clamp(1rem, 0.5rem + 2vw, 2rem)",
					"$description": "Fluid page gutter (Utopia-style clamp). Additive — not referenced by legacy aliases, so the 092 look is preserved."
				}
			},
			"type": {
				"family-body": {
					"$type": "fontFamily",
					"$value": [
						"system-ui",
						"-apple-system",
						"'Segoe UI'",
						"Roboto",
						"sans-serif"
					],
					"$description": "Matches the legacy --nv-font"
				},
				"size-xs": {
					"$type": "dimension",
					"$value": "0.75rem"
				},
				"size-sm": {
					"$type": "dimension",
					"$value": "0.9rem"
				},
				"size-md": {
					"$type": "dimension",
					"$value": "1rem"
				},
				"size-lg": {
					"$type": "dimension",
					"$value": "1.15rem"
				},
				"size-xl": {
					"$type": "dimension",
					"$value": "1.6rem"
				},
				"size-fluid-display": {
					"$type": "dimension",
					"$value": "clamp(1.75rem, 1.2rem + 2.5vw, 2.75rem)",
					"$description": "Fluid display size. Additive — not referenced by legacy aliases."
				},
				"leading-body": {
					"$type": "dimension",
					"$value": "1.6",
					"$description": "Unitless line-height (matches the legacy body line-height)"
				}
			}
		},
		"semantic": {
			"$comment": "Proposal 095 — semantic layer. Components may only reference THIS layer. Values are DTCG references into the core layer (cross-file references are a documented ADS extension) or literal values.",
			"ink": {
				"$type": "color",
				"$value": "#1a1a1a"
			},
			"muted": {
				"$type": "color",
				"$value": "#6b6b6b"
			},
			"surface": {
				"$type": "color",
				"$value": "#ffffff"
			},
			"surface-alt": {
				"$type": "color",
				"$value": "#f5f5f4"
			},
			"line": {
				"$type": "color",
				"$value": "#e4e4e2"
			},
			"line-strong": {
				"$type": "color",
				"$value": "#767676",
				"$description": "Strong form-field border (SC 1.4.11). Additive."
			},
			"accent": {
				"$type": "color",
				"$value": "#0f6b4f"
			},
			"accent-ink": {
				"$type": "color",
				"$value": "#ffffff"
			},
			"danger": {
				"$type": "color",
				"$value": "#b3261e"
			},
			"radius": {
				"$type": "dimension",
				"$value": "8px"
			},
			"font": {
				"$type": "fontFamily",
				"$value": [
					"system-ui",
					"-apple-system",
					"'Segoe UI'",
					"Roboto",
					"sans-serif"
				]
			},
			"space": {
				"$type": "dimension",
				"$value": "1rem"
			},
			"focus-ring": {
				"$type": "dimension",
				"$value": "#ffffff #0f6b4f",
				"$description": "Accessible focus outline (shadow-based). Additive."
			}
		},
		"component": {
			"$comment": "Proposal 095 — component layer. Consumed by .btn/.card/.field etc. Values reference the semantic layer.",
			"btn": {
				"background": {
					"$type": "color",
					"$value": "#0f6b4f"
				},
				"color": {
					"$type": "color",
					"$value": "#ffffff"
				},
				"border": {
					"$type": "color",
					"$value": "#0f6b4f"
				},
				"radius": {
					"$type": "dimension",
					"$value": "8px"
				},
				"padding-y": {
					"$type": "dimension",
					"$value": "0.5rem"
				},
				"padding-x": {
					"$type": "dimension",
					"$value": "1rem"
				}
			},
			"card": {
				"gap": {
					"$type": "dimension",
					"$value": "0.4rem"
				},
				"radius": {
					"$type": "dimension",
					"$value": "8px"
				}
			},
			"field": {
				"border": {
					"$type": "color",
					"$value": "#767676"
				},
				"radius": {
					"$type": "dimension",
					"$value": "8px"
				},
				"padding-y": {
					"$type": "dimension",
					"$value": "0.5rem"
				}
			}
		}
	}
};
// src/lib/tokens/dtcg.ts
var TOKEN_TYPE_VALIDATORS = {
	color: (value) => {
		if (typeof value !== "string") return false;
		if (/^#[0-9a-fA-F]{3,8}$/.test(value)) return true;
		if (/^rgba?\(\s*[\d.\s,%/-]+\)$/.test(value)) return true;
		if (/^hsla?\(\s*[\d.\s,%/-]+(deg)?\)$/.test(value)) return true;
		return false;
	},
	dimension: (value) => {
		if (typeof value !== "string") return false;
		if (/^-?\d*\.?\d+$/.test(value)) return true;
		if (/^-?\d*\.?\d+(px|rem|em|ch|vw|vh|%)$/.test(value)) return true;
		if (/^clamp\([^;{}()]+\)$/.test(value) && !/[;{}]/.test(value)) return true;
		return false;
	},
	fontFamily: (value) => {
		if (!Array.isArray(value) || value.length === 0 || value.length > 8) return false;
		return value.every((entry) => typeof entry === "string" && entry.length > 0 && entry.length <= 128 && !/[;{}()]/.test(entry) && !/url\s*\(/i.test(entry));
	}
};
var MAX_FILE_BYTES = 262144;
var MAX_TOKENS = 2e3;
function findReferences(value) {
	if (typeof value !== "string") return [];
	const found = [];
	const re = /\{([a-z0-9._-]+)\}/g;
	let match;
	while ((match = re.exec(value)) !== null) found.push(match[1]);
	return found;
}
function validateGroups(groups, report) {
	let count = 0;
	const walk = (node, path) => {
		if (Array.isArray(node)) {
			node.forEach((entry, i) => walk(entry, `${path}[${i}]`));
			return;
		}
		if (node === null || typeof node !== "object") return;
		if (typeof node.$type === "string") {
			const token = node;
			count++;
			if (count > 2e3) {
				report.errors.push(`token count exceeds ${MAX_TOKENS} (found more at ${path})`);
				return;
			}
			const validator = TOKEN_TYPE_VALIDATORS[token.$type];
			if (!validator) {
				report.warnings.push(`unknown $type "${token.$type}" at ${path} — skipped by generators`);
				return;
			}
			if (findReferences(token.$value).length === 0 && !validator(token.$value)) report.errors.push(`invalid $type "${token.$type}" value at ${path}: ${JSON.stringify(token.$value)}`);
			return;
		}
		for (const [key, child] of Object.entries(node)) {
			if (key.startsWith("$")) continue;
			walk(child, `${path}.${key}`);
		}
	};
	for (const [groupName, tree] of Object.entries(groups)) walk(tree, groupName);
}
function validateThemes(themes, semantic, report) {
	for (const [themeName, theme] of Object.entries(themes)) {
		if (themeName === "default") {
			const modes = theme;
			for (const [mode, tokens] of Object.entries(modes)) {
				if (mode.startsWith("$")) continue;
				if (!tokens || typeof tokens !== "object" || Array.isArray(tokens)) {
					report.errors.push(`theme default.${mode} must be an object`);
					continue;
				}
				for (const [name, value] of Object.entries(tokens)) {
					if (name.startsWith("$")) continue;
					if (!(name in semantic)) report.warnings.push(`theme default.${mode}.${name} overrides an unknown semantic token`);
					if (typeof value !== "string" && !Array.isArray(value)) report.errors.push(`theme default.${mode}.${name} must be a string or fontFamily array`);
				}
			}
			continue;
		}
		const tokens = theme.tokens;
		if (!tokens || typeof tokens !== "object" || Array.isArray(tokens)) {
			report.errors.push(`theme "${themeName}" must have a "tokens" object`);
			continue;
		}
		for (const [name, value] of Object.entries(tokens)) {
			if (name.startsWith("$")) continue;
			if (!(name in semantic)) report.warnings.push(`theme ${themeName}.${name} overrides an unknown semantic token`);
			const type = semantic[name]?.$type;
			if (type && !TOKEN_TYPE_VALIDATORS[type](value) && findReferences(value).length === 0) report.errors.push(`theme ${themeName}.${name} invalid for $type "${type}": ${JSON.stringify(value)}`);
		}
	}
}
// src/lib/tokens/persistence.ts
function isPlainObject(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
/**
* Read + parse the persisted design state. Returns null on ANY failure
* (missing file, invalid JSON, wrong shape) — callers fall back to defaults.
*/
function loadDesignState(path) {
	try {
		const parsed = JSON.parse(readFileSync(path, "utf8"));
		if (!isPlainObject(parsed)) return null;
		const overrides = parsed.overrides;
		const activeTheme = parsed.activeTheme;
		const runtimeThemes = parsed.runtimeThemes;
		const snapshots = parsed.snapshots;
		if (!isPlainObject(overrides) || typeof activeTheme !== "string" || !isPlainObject(runtimeThemes) || !Array.isArray(snapshots)) return null;
		for (const value of Object.values(overrides)) if (typeof value !== "string") return null;
		for (const value of Object.values(runtimeThemes)) if (!isPlainObject(value)) return null;
		for (const entry of snapshots) if (!isPlainObject(entry)) return null;
		return {
			overrides,
			activeTheme,
			runtimeThemes,
			snapshots
		};
	} catch {
		return null;
	}
}
/**
* Persist the design state atomically: write `${path}.tmp` then rename over
* the target (same directory, so the rename stays on one volume). Failures
* are warned and swallowed — persistence is best-effort and must never
* surface as a failed tool call.
*/
function saveDesignState(path, state) {
	try {
		mkdirSync(dirname(path), { recursive: true });
		writeFileSync(`${path}.tmp`, JSON.stringify(state, null, "	"));
		renameSync(`${path}.tmp`, path);
	} catch (error) {
		console.warn(`[tokens] failed to persist design state to ${path}: ${error.message}`);
	}
}
// src/lib/tokens/service.ts
function cloneBundle() {
	return JSON.parse(JSON.stringify(bundle_generated_default));
}
function semanticTokensOf(bundleData) {
	const tree = bundleData._resolved.semantic ?? bundleData.groups.semantic ?? {};
	const out = {};
	const walk = (node, parts) => {
		if (node === null || typeof node !== "object") return;
		const token = node;
		if (typeof token.$value === "string" || Array.isArray(token.$value)) {
			out[parts.join(".")] = Array.isArray(token.$value) ? token.$value.join(", ") : token.$value;
			return;
		}
		for (const [key, child] of Object.entries(node)) {
			if (key.startsWith("$")) continue;
			walk(child, [...parts, key]);
		}
	};
	walk(tree, []);
	return out;
}
function hexToRgb(hex) {
	const cleaned = hex.replace("#", "");
	const full = cleaned.length === 3 ? cleaned.split("").map((c) => c + c).join("") : cleaned.length === 6 ? cleaned : "";
	if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
	return [
		parseInt(full.slice(0, 2), 16),
		parseInt(full.slice(2, 4), 16),
		parseInt(full.slice(4, 6), 16)
	];
}
function luminance(hex) {
	const rgb = hexToRgb(hex);
	if (!rgb) return null;
	const [r, g, b] = rgb.map((c) => {
		const s = c / 255;
		return s <= .03928 ? s / 12.92 : Math.pow((s + .055) / 1.055, 2.4);
	});
	return .2126 * r + .7152 * g + .0722 * b;
}
function contrastRatio(fg, bg) {
	const l1 = luminance(fg);
	const l2 = luminance(bg);
	if (l1 === null || l2 === null) return null;
	const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
	return (hi + .05) / (lo + .05);
}
function contrastCheck(fg, bg) {
	const ratio = contrastRatio(fg, bg);
	if (ratio === null) return null;
	return {
		ratio: Math.round(ratio * 100) / 100,
		aaNormal: ratio >= 4.5,
		aaLarge: ratio >= 3,
		aaaNormal: ratio >= 7
	};
}
/**
* The runtime token service. The static generated bundle is immutable; MCP
* writes land in an override layer (snapshotted, rollback-able) that is
* merged over the bundle when resolving the active semantic set.
*/
var TokenService = class {
	bundle;
	persistPath;
	overrides = {};
	activeTheme = "light";
	runtimeThemes = {};
	snapshots = [];
	constructor(bundleData, options) {
		this.bundle = bundleData ?? cloneBundle();
		this.persistPath = options?.persistPath ?? process.env.NVOOS_MCP_STATE_FILE ?? null;
		if (this.persistPath) {
			const persisted = loadDesignState(this.persistPath);
			if (persisted) this.hydrate(persisted);
		}
	}
	/**
	* Adopt persisted state — only the fields the loaded shape carries.
	* Runtime themes hydrate before the active theme so the theme gate can
	* verify it still resolves; snapshots keep the same 50-entry cap as
	* takeSnapshot.
	*/
	hydrate(persisted) {
		if (persisted.overrides && typeof persisted.overrides === "object") this.overrides = { ...persisted.overrides };
		if (persisted.runtimeThemes && typeof persisted.runtimeThemes === "object") this.runtimeThemes = JSON.parse(JSON.stringify(persisted.runtimeThemes));
		if (Array.isArray(persisted.snapshots)) {
			this.snapshots = JSON.parse(JSON.stringify(persisted.snapshots));
			if (this.snapshots.length > 50) this.snapshots = this.snapshots.slice(-50);
		}
		if (typeof persisted.activeTheme === "string" && this.themeDescriptor(persisted.activeTheme)) this.activeTheme = persisted.activeTheme;
	}
	/**
	* Persist the current design state (best-effort). Called only after a
	* successful mutation — rejected writes and dry runs never reach here.
	* Snapshot entries mirror takeSnapshot's shape (overrides, activeTheme,
	* runtimeThemes, takenAt, id).
	*/
	persist() {
		if (!this.persistPath) return;
		saveDesignState(this.persistPath, {
			overrides: { ...this.overrides },
			activeTheme: this.activeTheme,
			runtimeThemes: JSON.parse(JSON.stringify(this.runtimeThemes)),
			snapshots: this.snapshots.map((snapshot) => JSON.parse(JSON.stringify(snapshot)))
		});
	}
	groups() {
		return this.bundle.groups;
	}
	/** Resolved group trees (reference-free) — what /tokens and MCP display. */
	resolvedGroups() {
		return this.bundle._resolved ?? this.bundle.groups;
	}
	themes() {
		return this.bundle.themes;
	}
	listThemes() {
		return [
			"light",
			"dark",
			...Object.keys(this.bundle.themes).filter((n) => n !== "default"),
			...Object.keys(this.runtimeThemes)
		];
	}
	getActiveTheme() {
		return this.activeTheme;
	}
	themeDescriptor(name) {
		if (name === "light" || name === "dark") return {
			name,
			tokens: (this.bundle.themes.default ?? {})[name] ?? {}
		};
		const staticTheme = this.bundle.themes[name];
		if (staticTheme?.tokens) return {
			name,
			description: staticTheme.description,
			tokens: staticTheme.tokens
		};
		return this.runtimeThemes[name] ?? null;
	}
	/**
	* Resolved semantic values for the active theme + override layer.
	*/
	resolveActiveSemantic() {
		const base = semanticTokensOf(this.bundle);
		const themeTokens = this.themeDescriptor(this.activeTheme)?.tokens ?? {};
		return {
			...base,
			...themeTokens,
			...this.overrides
		};
	}
	applyOverrides(changes, dryRun = false) {
		const semantic = this.bundle.groups.semantic ?? {};
		const report = {
			errors: [],
			warnings: []
		};
		const diff = [];
		const next = { ...this.overrides };
		for (const [name, value] of Object.entries(changes)) {
			const semanticToken = semantic[name];
			if (!semanticToken?.$type) {
				report.errors.push(`unknown semantic token: ${name}`);
				continue;
			}
			const type = semanticToken.$type;
			if (!validateGroupValue(type, value) && findReferences(value).length === 0) {
				report.errors.push(`invalid value for ${name} ($type "${type}"): ${JSON.stringify(value)}`);
				continue;
			}
			const before = this.resolveActiveSemantic()[name] ?? "";
			diff.push({
				name,
				before,
				after: value
			});
			next[name] = value;
		}
		if (report.errors.length > 0) return {
			applied: false,
			report,
			diff: []
		};
		if (dryRun) return {
			applied: false,
			report,
			diff
		};
		const snapshotId = this.takeSnapshot();
		this.overrides = next;
		this.persist();
		return {
			applied: true,
			report,
			diff,
			snapshotId
		};
	}
	importDTCG(input, dryRun = false) {
		const report = {
			errors: [],
			warnings: []
		};
		let parsed;
		try {
			parsed = typeof input === "string" ? JSON.parse(input) : input;
		} catch (error) {
			report.errors.push(`invalid JSON: ${error.message}`);
			return {
				applied: false,
				report,
				diff: []
			};
		}
		if (JSON.stringify(parsed).length > 262144) {
			report.errors.push(`import exceeds ${MAX_FILE_BYTES} bytes`);
			return {
				applied: false,
				report,
				diff: []
			};
		}
		const groups = parsed.groups && typeof parsed.groups === "object" ? parsed.groups : parsed;
		validateGroups(groups, report);
		validateThemes(parsed.themes && typeof parsed.themes === "object" ? parsed.themes : {}, groups.semantic ?? {}, report);
		if (report.errors.length > 0) return {
			applied: false,
			report,
			diff: [],
			parsed
		};
		const semanticTree = groups.semantic ?? {};
		const changes = {};
		const walk = (node, parts) => {
			if (node === null || typeof node !== "object") return;
			const token = node;
			if (typeof token.$value === "string") {
				changes[parts.join(".")] = token.$value;
				return;
			}
			for (const [key, child] of Object.entries(node)) {
				if (key.startsWith("$")) continue;
				walk(child, [...parts, key]);
			}
		};
		walk(semanticTree, []);
		return {
			...this.applyOverrides(changes, dryRun),
			parsed
		};
	}
	takeSnapshot() {
		const id = `snap-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
		this.snapshots.push({
			id,
			takenAt: (/* @__PURE__ */ new Date()).toISOString(),
			overrides: { ...this.overrides },
			activeTheme: this.activeTheme,
			runtimeThemes: JSON.parse(JSON.stringify(this.runtimeThemes))
		});
		if (this.snapshots.length > 50) this.snapshots.shift();
		return id;
	}
	listSnapshots() {
		return [...this.snapshots].reverse();
	}
	rollback(snapshotId) {
		const target = snapshotId ? this.snapshots.find((s) => s.id === snapshotId) : this.snapshots[this.snapshots.length - 1];
		if (!target) return {
			ok: false,
			message: "no snapshot to roll back to"
		};
		this.overrides = { ...target.overrides };
		this.activeTheme = target.activeTheme;
		this.runtimeThemes = JSON.parse(JSON.stringify(target.runtimeThemes));
		this.persist();
		return {
			ok: true,
			message: `rolled back to ${target.id}`
		};
	}
	applyTheme(name) {
		if (!this.themeDescriptor(name)) return {
			ok: false,
			message: `unknown theme: ${name}`
		};
		const snapshotId = this.takeSnapshot();
		this.activeTheme = name;
		this.persist();
		return {
			ok: true,
			message: `active theme is now ${name}`,
			snapshotId
		};
	}
	createTheme(descriptor) {
		const report = {
			errors: [],
			warnings: []
		};
		if (!/^[a-z0-9-]+$/.test(descriptor.name) || ["light", "dark"].includes(descriptor.name)) {
			report.errors.push(`invalid theme name: ${descriptor.name}`);
			return {
				applied: false,
				report,
				diff: []
			};
		}
		validateThemes({ [descriptor.name]: { tokens: descriptor.tokens } }, this.bundle.groups.semantic ?? {}, report);
		if (report.errors.length > 0) return {
			applied: false,
			report,
			diff: []
		};
		const snapshotId = this.takeSnapshot();
		this.runtimeThemes[descriptor.name] = descriptor;
		this.persist();
		return {
			applied: true,
			report,
			diff: [],
			snapshotId
		};
	}
	deleteTheme(name) {
		if (name in (this.bundle.themes ?? {})) return {
			ok: false,
			message: `static theme "${name}" cannot be deleted at runtime`
		};
		if (!(name in this.runtimeThemes)) return {
			ok: false,
			message: `unknown theme: ${name}`
		};
		const snapshotId = this.takeSnapshot();
		delete this.runtimeThemes[name];
		if (this.activeTheme === name) this.activeTheme = "light";
		this.persist();
		return {
			ok: true,
			message: `theme "${name}" deleted`,
			snapshotId
		};
	}
};
function validateGroupValue(type, value) {
	const validator = TOKEN_TYPE_VALIDATORS[type];
	return validator ? validator(value) : false;
}
new TokenService();
// src/pages/tokens/index.astro
var tokens_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const service = new TokenService();
	const themes = service.listThemes();
	const activeTheme = service.getActiveTheme();
	const semantic = service.resolveActiveSemantic();
	function flattenGroup(tree, groupName) {
		const out = [];
		const walk = (node, parts) => {
			if (node === null || typeof node !== "object") return;
			const token = node;
			if ((typeof token.$value === "string" || Array.isArray(token.$value)) && typeof token.$type === "string") {
				out.push({
					name: `${groupName}.${parts.join(".")}`,
					value: Array.isArray(token.$value) ? token.$value.join(", ") : token.$value,
					type: token.$type
				});
				return;
			}
			for (const [key, child] of Object.entries(node)) {
				if (key.startsWith("$")) continue;
				walk(child, [...parts, key]);
			}
		};
		walk(tree, []);
		return out;
	}
	const groups = service.resolvedGroups();
	const coreTokens = flattenGroup(groups.core ?? {}, "core");
	const semanticTokens = flattenGroup(groups.semantic ?? {}, "semantic");
	const componentTokens = flattenGroup(groups.component ?? {}, "component");
	const contrastSamples = [
		[
			"ink on surface",
			semantic.ink,
			semantic.surface
		],
		[
			"muted on surface",
			semantic.muted,
			semantic.surface
		],
		[
			"accent-ink on accent",
			semantic["accent-ink"],
			semantic.accent
		],
		[
			"danger on surface-alt",
			semantic.danger,
			semantic["surface-alt"]
		]
	].map(([label, fg, bg]) => ({
		label,
		fg,
		bg,
		result: contrastCheck(fg, bg)
	}));
	const isColor = (token) => token.type === "color" && /^#|^rgb|^hsl/.test(token.value);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Design Tokens — ADS",
		"description": "NV oOS Astro Design System token browser (Proposal 095)",
		"data-astro-cid-z7qoyrnk": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1 data-astro-cid-z7qoyrnk>Design Tokens</h1><p data-astro-cid-z7qoyrnk>Active theme: <strong data-astro-cid-z7qoyrnk>${activeTheme}</strong> — themes: ${themes.join(", ")}. Source of truth: <code data-astro-cid-z7qoyrnk>src/tokens/*.json</code> (DTCG 2025.10).</p><h2 data-astro-cid-z7qoyrnk>Contrast (WCAG 2.2)</h2><table class="tokens-table" data-astro-cid-z7qoyrnk><thead data-astro-cid-z7qoyrnk><tr data-astro-cid-z7qoyrnk><th data-astro-cid-z7qoyrnk>Pair</th><th data-astro-cid-z7qoyrnk>FG</th><th data-astro-cid-z7qoyrnk>BG</th><th data-astro-cid-z7qoyrnk>Ratio</th><th data-astro-cid-z7qoyrnk>AA</th><th data-astro-cid-z7qoyrnk>AAA</th></tr></thead><tbody data-astro-cid-z7qoyrnk>${contrastSamples.map((sample) => renderTemplate`<tr data-astro-cid-z7qoyrnk><td data-astro-cid-z7qoyrnk>${sample.label}</td><td data-astro-cid-z7qoyrnk><span class="swatch"${addAttribute(`background:${sample.fg}`, "style")} data-astro-cid-z7qoyrnk></span> ${sample.fg}</td><td data-astro-cid-z7qoyrnk><span class="swatch"${addAttribute(`background:${sample.bg}`, "style")} data-astro-cid-z7qoyrnk></span> ${sample.bg}</td><td data-astro-cid-z7qoyrnk>${sample.result ? sample.result.ratio : "n/a"}</td><td data-astro-cid-z7qoyrnk>${sample.result ? sample.result.aaNormal ? "✓" : "✗" : "—"}</td><td data-astro-cid-z7qoyrnk>${sample.result ? sample.result.aaaNormal ? "✓" : "✗" : "—"}</td></tr>`)}</tbody></table><h2 data-astro-cid-z7qoyrnk>Semantic layer (resolved, theme: ${activeTheme})</h2><table class="tokens-table" data-astro-cid-z7qoyrnk><thead data-astro-cid-z7qoyrnk><tr data-astro-cid-z7qoyrnk><th data-astro-cid-z7qoyrnk>Token</th><th data-astro-cid-z7qoyrnk>Type</th><th data-astro-cid-z7qoyrnk>Value</th><th data-astro-cid-z7qoyrnk>Preview</th></tr></thead><tbody data-astro-cid-z7qoyrnk>${semanticTokens.map((token) => renderTemplate`<tr data-astro-cid-z7qoyrnk><td data-astro-cid-z7qoyrnk><code data-astro-cid-z7qoyrnk>${token.name}</code></td><td data-astro-cid-z7qoyrnk>${token.type}</td><td data-astro-cid-z7qoyrnk><code data-astro-cid-z7qoyrnk>${token.value}</code></td><td data-astro-cid-z7qoyrnk>${isColor(token) ? renderTemplate`<span class="swatch swatch--lg"${addAttribute(`background:${token.value}`, "style")} data-astro-cid-z7qoyrnk></span>` : "—"}</td></tr>`)}</tbody></table><h2 data-astro-cid-z7qoyrnk>Core layer</h2><table class="tokens-table" data-astro-cid-z7qoyrnk><thead data-astro-cid-z7qoyrnk><tr data-astro-cid-z7qoyrnk><th data-astro-cid-z7qoyrnk>Token</th><th data-astro-cid-z7qoyrnk>Type</th><th data-astro-cid-z7qoyrnk>Value</th></tr></thead><tbody data-astro-cid-z7qoyrnk>${coreTokens.map((token) => renderTemplate`<tr data-astro-cid-z7qoyrnk><td data-astro-cid-z7qoyrnk><code data-astro-cid-z7qoyrnk>${token.name}</code></td><td data-astro-cid-z7qoyrnk>${token.type}</td><td data-astro-cid-z7qoyrnk><code data-astro-cid-z7qoyrnk>${token.value}</code></td></tr>`)}</tbody></table><h2 data-astro-cid-z7qoyrnk>Component layer</h2><table class="tokens-table" data-astro-cid-z7qoyrnk><thead data-astro-cid-z7qoyrnk><tr data-astro-cid-z7qoyrnk><th data-astro-cid-z7qoyrnk>Token</th><th data-astro-cid-z7qoyrnk>Type</th><th data-astro-cid-z7qoyrnk>Value</th></tr></thead><tbody data-astro-cid-z7qoyrnk>${componentTokens.map((token) => renderTemplate`<tr data-astro-cid-z7qoyrnk><td data-astro-cid-z7qoyrnk><code data-astro-cid-z7qoyrnk>${token.name}</code></td><td data-astro-cid-z7qoyrnk>${token.type}</td><td data-astro-cid-z7qoyrnk><code data-astro-cid-z7qoyrnk>${token.value}</code></td></tr>`)}</tbody></table>` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/tokens/index.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/tokens/index.astro";
var $$url = "/tokens/";
// \0virtual:astro:page:src/pages/tokens/index@_@astro
var page = () => tokens_exports;
export { page };
