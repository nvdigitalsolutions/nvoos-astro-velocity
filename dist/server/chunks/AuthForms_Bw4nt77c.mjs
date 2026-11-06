import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
// src/islands/AuthForms.tsx
var API_BASE = "/api";
function AuthForms({ onAuthed, loginOnly = false }) {
	const [mode, setMode] = useState("login");
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [busy, setBusy] = useState(false);
	const submit = async (event) => {
		event.preventDefault();
		setBusy(true);
		setError(null);
		try {
			const path = mode === "login" ? "login" : "register";
			const body = {
				email,
				password
			};
			if (mode === "register") {
				const nonceRes = await fetch(`${API_BASE}/auth/nonce`, { headers: { accept: "application/json" } });
				if (!nonceRes.ok) throw new Error("Could not start registration.");
				const { nonce } = await nonceRes.json();
				body.nonce = nonce;
				body.name = name;
			}
			const res = await fetch(`${API_BASE}/auth/${path}`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
					accept: "application/json"
				},
				credentials: "include",
				body: JSON.stringify(body)
			});
			if (!res.ok) {
				const payload = await res.json().catch(() => ({}));
				throw new Error(payload.message || "Authentication failed.");
			}
			onAuthed(await res.json());
		} catch (err) {
			setError(err instanceof Error ? err.message : "Authentication failed.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "auth",
		children: [!loginOnly && /* @__PURE__ */ jsxs("div", {
			role: "tablist",
			"aria-label": "Account form",
			children: [/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn--ghost",
				"aria-selected": mode === "login",
				onClick: () => {
					setMode("login");
					setError(null);
				},
				children: "Sign in"
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn--ghost",
				"aria-selected": mode === "register",
				onClick: () => {
					setMode("register");
					setError(null);
				},
				children: "Create account"
			})]
		}), /* @__PURE__ */ jsxs("form", {
			onSubmit: submit,
			className: "auth__form",
			children: [
				mode === "register" && /* @__PURE__ */ jsxs("div", {
					className: "field",
					children: [/* @__PURE__ */ jsx("label", {
						htmlFor: "auth-name",
						children: "Name"
					}), /* @__PURE__ */ jsx("input", {
						id: "auth-name",
						type: "text",
						value: name,
						onChange: (event) => setName(event.target.value),
						autoComplete: "name"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "field",
					children: [/* @__PURE__ */ jsx("label", {
						htmlFor: "auth-email",
						children: "Email"
					}), /* @__PURE__ */ jsx("input", {
						id: "auth-email",
						type: "email",
						required: true,
						value: email,
						onChange: (event) => setEmail(event.target.value),
						autoComplete: "email"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "field",
					children: [/* @__PURE__ */ jsx("label", {
						htmlFor: "auth-password",
						children: "Password"
					}), /* @__PURE__ */ jsx("input", {
						id: "auth-password",
						type: "password",
						required: true,
						minLength: 8,
						value: password,
						onChange: (event) => setPassword(event.target.value),
						autoComplete: mode === "login" ? "current-password" : "new-password"
					})]
				}),
				error && /* @__PURE__ */ jsx("p", {
					role: "alert",
					className: "promo-field__err",
					children: error
				}),
				/* @__PURE__ */ jsx("button", {
					type: "submit",
					className: "btn",
					disabled: busy,
					children: busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"
				})
			]
		})]
	});
}
export { AuthForms as t };
