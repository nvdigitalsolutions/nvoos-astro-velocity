import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { A as MissingGetFontFileRequestUrl, t as AstroError } from "./errors_CKgTI0I0.mjs";
import { c as isParentDirectory, l as isRemotePath, m as removeQueryString } from "./path_CFJuBWeb.mjs";
import { t as createAstro } from "./astro-global_CZt7TqFY.mjs";
import { t as createConsoleLogger } from "./console_ClfCadOL.mjs";
import { t as isRemoteAllowed } from "./remote_Z-Z8LuKO.mjs";
import { c as level } from "./consts_Cp4nT5DG.mjs";
import { a as fetchWithRedirects, s as inferSourceFormat, t as getConfiguredImageService } from "./assets_Bynfgjf9.mjs";
import "./compiler_CWCzah9E.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as mime from "mrmime";
import { readFile } from "node:fs/promises";
// node_modules/astro/components/Image.astro
createAstro("https://astro.nvoos.cloud");
// node_modules/astro/components/Picture.astro
createAstro("https://astro.nvoos.cloud");
// node_modules/astro/components/Font.astro
createAstro("https://astro.nvoos.cloud");
// node_modules/astro/dist/assets/fonts/infra/ssr-runtime-font-file-url-resolver.js
/**
* During SSR, we don't know ahead of time where the server is located.
* We rely on `requestUrl` (provided by the user) to construct the URL.
*/
var SsrRuntimeFontFileUrlResolver = class {
	#urls;
	constructor({ urls }) {
		this.#urls = urls;
	}
	resolve(url, requestUrl) {
		if (!this.#urls.has(url)) return null;
		if (!url.startsWith("/")) return url;
		if (!requestUrl) throw new AstroError(MissingGetFontFileRequestUrl);
		return `${requestUrl.origin}${url}`;
	}
};
new SsrRuntimeFontFileUrlResolver({ urls: /* @__PURE__ */ new Set([]) });
createConsoleLogger({ level });
var imageConfig = {
	"endpoint": {
		"entrypoint": "astro/assets/endpoint/node",
		"route": "/_image/"
	},
	"service": {
		"entrypoint": "astro/assets/services/sharp",
		"config": {}
	},
	"dangerouslyProcessSVG": false,
	"domains": ["astro.nvoos.cloud"],
	"remotePatterns": [],
	"responsiveStyles": false
};
Object.defineProperties(imageConfig, {
	assetQueryParams: {
		value: void 0,
		enumerable: false,
		configurable: true
	},
	staticImageConfig: {
		value: {
			"base": "/",
			"assetsDir": "_astro"
		},
		enumerable: false,
		configurable: true
	}
});
var outDir = /* #__PURE__ */ new URL("file:///home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/dist/client/");
var serverDir = /* #__PURE__ */ new URL("file:///home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/dist/server/");
// node_modules/astro/dist/assets/utils/etag.js
/**
* FNV-1a Hash implementation
* @author Travis Webb (tjwebb) <me@traviswebb.com>
*
* Ported from https://github.com/tjwebb/fnv-plus/blob/master/index.js
* License https://github.com/tjwebb/fnv-plus#license
*
* Simplified, optimized and add modified for 52 bit, which provides a larger hash space
* and still making use of JavaScript's 53-bit integer space.
*/
var fnv1a52 = (str) => {
	const len = str.length;
	let i = 0, t0 = 0, v0 = 8997, t1 = 0, v1 = 33826, t2 = 0, v2 = 40164, t3 = 0, v3 = 52210;
	while (i < len) {
		v0 ^= str.charCodeAt(i++);
		t0 = v0 * 435;
		t1 = v1 * 435;
		t2 = v2 * 435;
		t3 = v3 * 435;
		t2 += v0 << 8;
		t3 += v1 << 8;
		t1 += t0 >>> 16;
		v0 = t0 & 65535;
		t2 += t1 >>> 16;
		v1 = t1 & 65535;
		v3 = t3 + (t2 >>> 16) & 65535;
		v2 = t2 & 65535;
	}
	return (v3 & 15) * 281474976710656 + v2 * 4294967296 + v1 * 65536 + (v0 ^ v3 >> 4);
};
var etag = (payload, weak = false) => {
	return (weak ? "W/\"" : "\"") + fnv1a52(payload).toString(36) + payload.length.toString(36) + "\"";
};
// node_modules/astro/dist/assets/endpoint/shared.js
var isLocal = (url) => {
	const hostname = new URL(url).hostname;
	return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
};
async function loadRemoteImage(src) {
	try {
		const res = await fetchWithRedirects({
			url: src,
			imageConfig
		});
		if (!isRemoteAllowed(res.url, imageConfig) && !isLocal(res.url)) return;
		if (!res.ok) return;
		return Buffer.from(await res.arrayBuffer());
	} catch {
		return;
	}
}
var handleImageRequest = async ({ request, loadLocalImage, logger }) => {
	const imageService = await getConfiguredImageService();
	if (!("transform" in imageService)) throw new Error("Configured image service is not a local service");
	const url = new URL(request.url);
	const transform = await imageService.parseURL(url, imageConfig, logger);
	if (!transform?.src) return new Response("Invalid request", { status: 400 });
	if (transform.format === "svg") {
		if (inferSourceFormat(transform.src) !== "svg") return new Response("Cannot convert non-SVG source to SVG format", { status: 403 });
	}
	let inputBuffer = void 0;
	if (isRemotePath(transform.src)) {
		if (!isRemoteAllowed(transform.src, imageConfig)) return new Response("Forbidden", { status: 403 });
		inputBuffer = await loadRemoteImage(new URL(transform.src));
	} else {
		const result = await loadLocalImage(removeQueryString(transform.src), url);
		switch (result.kind) {
			case "invalid-path": return new Response("Invalid request", { status: 400 });
			case "not-found": return new Response("Not Found", { status: 404 });
			case "failed": return new Response("Internal Server Error", { status: 500 });
			case "loaded": inputBuffer = result.buffer;
		}
	}
	if (!inputBuffer) return new Response("Internal Server Error", { status: 500 });
	const { data, format } = await imageService.transform(inputBuffer, transform, imageConfig, logger);
	return new Response(data, {
		status: 200,
		headers: {
			"Content-Type": mime.lookup(format) ?? `image/${format}`,
			"Cache-Control": "public, max-age=31536000",
			ETag: etag(data.toString()),
			Date: (/* @__PURE__ */ new Date()).toUTCString()
		}
	});
};
// node_modules/astro/dist/assets/endpoint/node.js
var node_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
async function loadLocalImage(src, url) {
	const outDirURL = resolveOutDir();
	const idx = url.pathname.indexOf("/_image");
	if (idx > 0) src = src.slice(idx);
	let fileUrl;
	try {
		if (!URL.canParse("." + src, outDirURL)) return { kind: "invalid-path" };
		fileUrl = new URL("." + src, outDirURL);
		if (fileUrl.protocol !== "file:" || !isParentDirectory(fileURLToPath(outDirURL), fileURLToPath(fileUrl))) return { kind: "invalid-path" };
	} catch {
		return { kind: "invalid-path" };
	}
	try {
		return {
			kind: "loaded",
			buffer: await readFile(fileUrl)
		};
	} catch (error) {
		if (error instanceof Error && "code" in error && (error.code === "ENOENT" || error.code === "ENOTDIR" || error.code === "EISDIR")) return { kind: "not-found" };
		return { kind: "failed" };
	}
}
/**
* Endpoint used in dev and SSR to serve optimized images by the base image services
*/
var GET = async ({ request, logger }) => {
	try {
		return await handleImageRequest({
			request,
			loadLocalImage,
			logger
		});
	} catch (err) {
		logger.error(`Could not process image request: ${err}`);
		return new Response("Internal Server Error", { status: 500 });
	}
};
function resolveOutDir() {
	const serverDirPath = fileURLToPath(serverDir);
	const rel = path.relative(serverDirPath, fileURLToPath(outDir));
	const serverFolder = path.basename(serverDirPath);
	let serverEntryFolderURL = path.dirname(import.meta.url);
	while (!serverEntryFolderURL.endsWith(serverFolder)) serverEntryFolderURL = path.dirname(serverEntryFolderURL);
	const serverEntryURL = serverEntryFolderURL + "/entry.mjs";
	return new URL(appendForwardSlash(rel), serverEntryURL);
}
function appendForwardSlash(pth) {
	return pth.endsWith("/") ? pth : pth + "/";
}
// \0virtual:astro:page:node_modules/astro/dist/assets/endpoint/node@_@js
var page = () => node_exports;
export { page };
