// src/lib/content/merge.ts
/**
* L2 merge: envelope docs keep their order and win collisions; local items
* whose slug is already present are dropped; the rest are appended in
* collection order.
*/
function mergeEnvelopeLocal(envelope, local) {
	const taken = new Set(envelope.map((doc) => doc.slug));
	const additions = local.filter((doc) => !taken.has(doc.slug));
	return [...envelope, ...additions];
}
/**
* Blog merge: envelope wins collisions, local fills gaps, then the whole
* list sorts date-descending (ISO strings compare lexicographically).
*/
function mergePostsDesc(envelope, local) {
	return mergeEnvelopeLocal(envelope, local).sort((a, b) => b.date.localeCompare(a.date));
}
/** Find the local doc for a slug, or null — the /pages fallback (O-4).
*  Astro collection entries key on `id` (the loader-generated slug), so the
*  lookup compares against `id` while envelope docs carry `slug`. */
function localBySlug(local, slug) {
	return local.find((doc) => doc.id === slug) ?? null;
}
export { mergePostsDesc as n, localBySlug as t };
