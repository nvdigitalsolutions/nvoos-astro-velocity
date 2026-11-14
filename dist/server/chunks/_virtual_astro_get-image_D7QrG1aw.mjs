import { t as createConsoleLogger } from "./console_ClfCadOL.mjs";
import { c as level } from "./consts_CH1N1oyO.mjs";
import { n as getImage$1 } from "./assets_rdBF-iG0.mjs";
// \0virtual:astro:get-image
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
var _astroLogger = createConsoleLogger({ level });
var _runtimeLogger = {
	info: (message) => _astroLogger.info(null, message),
	warn: (message) => _astroLogger.warn(null, message),
	error: (message) => _astroLogger.error(null, message)
};
var getImage = async (options) => await getImage$1(options, imageConfig, _runtimeLogger);
export { getImage };
