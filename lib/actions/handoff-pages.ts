"use server";

import { getDb } from "@/lib/db";
import { getPageById, listAllSlugs, updatePage } from "@/lib/db/pages";
import {
  dbPagesToHandoff,
  handoffPageToDbPatch,
  type HandoffPage,
} from "@/lib/handoff/map-pages";
import { validateSlug } from "@/lib/slug";

export async function loadHandoffPages(): Promise<HandoffPage[]> {
  const db = getDb();
  const { listAllPages } = await import("@/lib/db/pages");
  return dbPagesToHandoff(listAllPages(db));
}

export async function syncHandoffPagesAction(
  pages: HandoffPage[],
): Promise<{ ok: true } | { ok: false; error: string }> {
  const db = getDb();
  const slugs = listAllSlugs(db);

  for (const page of pages) {
    const existing = getPageById(db, page.id);
    if (!existing) continue;
    const patch = handoffPageToDbPatch(page);
    const err = validateSlug(patch.slug, {
      existingSlug: existing.slug,
      usedSlugs: slugs,
    });
    if (err) return { ok: false, error: err };
    updatePage(db, page.id, patch);
  }
  return { ok: true };
}
