import { t as __exportAll } from "./rolldown-runtime_BJohB4LM.mjs";
import { h as maybeRenderHead, m as renderTemplate, s as renderComponent, x as addAttribute } from "./server_COcTL13r.mjs";
import { t as createComponent } from "./astro-component_DeSnnQc7.mjs";
import { t as createAstro } from "./astro-global_CY5q3Xj5.mjs";
import "./compiler_tBncm0O6.mjs";
import { m as renderScript, t as $$BaseLayout } from "./BaseLayout_Cztu7urN.mjs";
import { n as pageTitle, r as plainExcerpt } from "./meta_BE8QV8yn.mjs";
// src/components/ContactForm.astro
createAstro("https://astro.nvoos.cloud");
var $$ContactForm = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ContactForm;
	const { action = "/forms/submit", sent = false, error = false } = Astro.props;
	const stamp = Date.now();
	return renderTemplate`${maybeRenderHead($$result)}<section class="contact-form" data-astro-cid-vekgkm42>${sent && renderTemplate`<p class="contact-form__notice" role="status" data-astro-cid-vekgkm42>Thanks — your message is on its way.</p>`}${error && renderTemplate`<p class="contact-form__notice contact-form__notice--error" role="alert" data-astro-cid-vekgkm42>That did not send. Please try again.</p>`}<form method="post"${addAttribute(action, "action")} data-contact-form data-astro-cid-vekgkm42><input type="hidden" name="timestamp"${addAttribute(stamp, "value")} data-astro-cid-vekgkm42><div hidden data-astro-cid-vekgkm42><label for="contact-website" data-astro-cid-vekgkm42>Website</label><input id="contact-website" type="text" name="honeypot" tabindex="-1" autocomplete="off" data-astro-cid-vekgkm42></div><label class="contact-form__field" data-astro-cid-vekgkm42><span data-astro-cid-vekgkm42>Name</span><input type="text" name="name" autocomplete="name" required data-astro-cid-vekgkm42></label><label class="contact-form__field" data-astro-cid-vekgkm42><span data-astro-cid-vekgkm42>Email</span><input type="email" name="email" autocomplete="email" required data-astro-cid-vekgkm42></label><label class="contact-form__field" data-astro-cid-vekgkm42><span data-astro-cid-vekgkm42>Message</span><textarea name="message" rows="6" required data-astro-cid-vekgkm42></textarea></label><button type="submit" class="contact-form__submit" data-astro-cid-vekgkm42>Send message</button><p class="contact-form__status" role="status" aria-live="polite" data-contact-status data-astro-cid-vekgkm42></p></form></section>${renderScript($$result, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ContactForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/components/ContactForm.astro", void 0);
// src/pages/contact.astro
var contact_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Contact,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.nvoos.cloud");
var $$Contact = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Contact;
	Astro.response.headers.set("Cache-Control", "no-store");
	const sent = Astro.url.searchParams.get("sent") === "1";
	const error = Astro.url.searchParams.get("error") === "1";
	const email = "hello@example.com";
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": pageTitle("Contact"),
		"description": plainExcerpt("Questions about an order, a product, or a partnership? Send us a message.")
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1>Contact</h1><p class="lede">Questions about an order, a product, or a partnership? Send a message and a person will reply. Prefer email? Write to <a${addAttribute(`mailto:${email}`, "href")}>${email}</a>.</p>${renderComponent($$result, "ContactForm", $$ContactForm, {
		"sent": sent,
		"error": error
	})}` })}`;
}, "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/contact.astro", void 0);
var $$file = "/home/runner/work/mcp-ai-wpoos/mcp-ai-wpoos/examples/nvoos-astro-velocity/src/pages/contact.astro";
var $$url = "/contact/";
// \0virtual:astro:page:src/pages/contact@_@astro
var page = () => contact_exports;
export { page };
