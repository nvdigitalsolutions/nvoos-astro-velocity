// src/lib/commerce/publish.ts
function isPublished(doc) {
	return doc.status === void 0 || doc.status === "publish";
}
export { isPublished as t };
