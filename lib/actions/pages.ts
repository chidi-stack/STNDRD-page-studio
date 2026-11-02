"use server";

import { revalidatePath } from "next/cache";

import { getDb } from "@/lib/db";
import {
  duplicatePage,
  getPageById,
  insertPage,
  listAllSlugs,
  listPageSummaries,
  updatePage,
} from "@/lib/db/pages";
import { newPageId, newSectionId } from "@/lib/sections/ids";
import { slugifyName, validateSlug } from "@/lib/slug";
import type {
  CtaConfig,
  PageRecord,
  PageSection,
  PageStatus,
  PageSummary,
  PageTheme,
} from "@/lib/types/page";

/** DB-only reads — keep separate from section registry (DevLink client components). */
export async function fetchPages(): Promise<PageSummary[]> {
  const db = getDb();
  return listPageSummaries(db);
}

export async function fetchPage(id: string): Promise<PageRecord | null> {
  const db = getDb();
  return getPageById(db, id);
}

export async function createPageAction(input: {
  name: string;
  slug: string;
  theme: PageTheme;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const db = getDb();
  const slug = input.slug.trim() || slugifyName(input.name);
  const err = validateSlug(slug, { usedSlugs: listAllSlugs(db) });
  if (err) return { ok: false, error: err };
  if (!input.name.trim()) return { ok: false, error: "Enter a page name." };

  const id = newPageId();
  insertPage(db, {
    id,
    name: input.name.trim(),
    slug,
    theme: input.theme,
  });
  revalidatePath("/editor");
  return { ok: true, id };
}

export async function savePageAction(input: {
  id: string;
  name: string;
  slug: string;
  theme: PageTheme;
  sections: PageSection[];
  cta: CtaConfig;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const db = getDb();
  const existing = getPageById(db, input.id);
  if (!existing) return { ok: false, error: "Page not found." };

  const slug = input.slug.trim();
  const err = validateSlug(slug, {
    existingSlug: existing.slug,
    usedSlugs: listAllSlugs(db),
  });
  if (err) return { ok: false, error: err };
  if (!input.name.trim()) return { ok: false, error: "Enter a page name." };

  updatePage(db, input.id, {
    name: input.name.trim(),
    slug,
    theme: input.theme,
    sections: input.sections,
    cta: input.cta,
  });
  revalidatePath("/editor");
  revalidatePath(`/editor/${input.id}`);
  revalidatePath(`/${existing.slug}`);
  if (slug !== existing.slug) revalidatePath(`/${slug}`);
  return { ok: true };
}

export async function setPageStatusAction(input: {
  id: string;
  status: PageStatus;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const db = getDb();
  const existing = getPageById(db, input.id);
  if (!existing) return { ok: false, error: "Page not found." };

  updatePage(db, input.id, { status: input.status });
  revalidatePath("/editor");
  revalidatePath(`/editor/${input.id}`);
  revalidatePath(`/${existing.slug}`);
  return { ok: true };
}

export async function addSectionAction(input: {
  pageId: string;
  sectionType: string;
}): Promise<{ ok: true; section: PageSection } | { ok: false; error: string }> {
  const { getSectionDef } = await import("@/lib/sections/registry");
  const def = getSectionDef(input.sectionType);
  if (!def) return { ok: false, error: "Unknown section type." };
  const db = getDb();
  const page = getPageById(db, input.pageId);
  if (!page) return { ok: false, error: "Page not found." };

  const section: PageSection = {
    id: newSectionId(),
    type: def.type,
    props: def.defaultProps(),
  };
  updatePage(db, input.pageId, {
    sections: [...page.sections, section],
  });
  revalidatePath(`/editor/${input.pageId}`);
  return { ok: true, section };
}

export async function duplicatePageAction(
  id: string,
): Promise<{ ok: true; newId: string } | { ok: false; error: string }> {
  const db = getDb();
  const source = getPageById(db, id);
  if (!source) return { ok: false, error: "Page not found." };

  let candidate = `${source.slug}-copy`;
  let n = 2;
  while (validateSlug(candidate, { usedSlugs: listAllSlugs(db) }) !== null) {
    candidate = `${source.slug}-copy-${n}`;
    n += 1;
  }

  const newId = newPageId();
  const dup = duplicatePage(
    db,
    id,
    newId,
    candidate,
    `${source.name} (copy)`,
  );
  if (!dup) return { ok: false, error: "Could not duplicate page." };
  revalidatePath("/editor");
  return { ok: true, newId };
}
