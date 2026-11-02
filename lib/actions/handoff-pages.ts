"use server";

import {
  getPageById,
  listAllPages,
  listAllSlugs,
  updatePage,
} from "@/lib/pages/store";
import {
  dbPagesToHandoff,
  handoffPageToDbPatch,
  type HandoffPage,
} from "@/lib/handoff/map-pages";
import { validateSlug } from "@/lib/slug";

export async function loadHandoffPages(): Promise<HandoffPage[]> {
  return dbPagesToHandoff(await listAllPages());
}

export async function syncHandoffPagesAction(
  pages: HandoffPage[],
): Promise<{ ok: true } | { ok: false; error: string }> {
  const slugs = await listAllSlugs();

  for (const page of pages) {
    const existing = await getPageById(page.id);
    if (!existing) continue;
    const patch = handoffPageToDbPatch(page);
    const err = validateSlug(patch.slug, {
      existingSlug: existing.slug,
      usedSlugs: slugs,
    });
    if (err) return { ok: false, error: err };
    await updatePage(page.id, patch);
  }
  return { ok: true };
}
