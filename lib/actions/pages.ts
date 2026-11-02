"use server";

import { revalidatePath } from "next/cache";

import {
  duplicatePage,
  getPageById,
  insertPage,
  isSlugConflictError,
  listAllSlugs,
  listPageSummaries,
  updatePage,
} from "@/lib/pages/store";
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
  return listPageSummaries();
}

export async function fetchPage(id: string): Promise<PageRecord | null> {
  return getPageById(id);
}

export async function createPageAction(input: {
  name: string;
  slug: string;
  theme: PageTheme;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const slug = input.slug.trim() || slugifyName(input.name);
  const usedSlugs = await listAllSlugs();
  const err = validateSlug(slug, { usedSlugs });
  if (err) return { ok: false, error: err };
  if (!input.name.trim()) return { ok: false, error: "Enter a page name." };

  const id = newPageId();
  try {
    await insertPage({
      id,
      name: input.name.trim(),
      slug,
      theme: input.theme,
    });
  } catch (e) {
    if (isSlugConflictError(e)) {
      return { ok: false, error: "That slug is already in use." };
    }
    throw e;
  }
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
  const existing = await getPageById(input.id);
  if (!existing) return { ok: false, error: "Page not found." };

  const slug = input.slug.trim();
  const usedSlugs = await listAllSlugs();
  const err = validateSlug(slug, {
    existingSlug: existing.slug,
    usedSlugs,
  });
  if (err) return { ok: false, error: err };
  if (!input.name.trim()) return { ok: false, error: "Enter a page name." };

  try {
    await updatePage(input.id, {
      name: input.name.trim(),
      slug,
      theme: input.theme,
      sections: input.sections,
      cta: input.cta,
    });
  } catch (e) {
    if (isSlugConflictError(e)) {
      return { ok: false, error: "That slug is already in use." };
    }
    throw e;
  }
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
  const existing = await getPageById(input.id);
  if (!existing) return { ok: false, error: "Page not found." };

  await updatePage(input.id, { status: input.status });
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
  const page = await getPageById(input.pageId);
  if (!page) return { ok: false, error: "Page not found." };

  const section: PageSection = {
    id: newSectionId(),
    type: def.type,
    props: def.defaultProps(),
  };
  await updatePage(input.pageId, {
    sections: [...page.sections, section],
  });
  revalidatePath(`/editor/${input.pageId}`);
  return { ok: true, section };
}

export async function duplicatePageAction(
  id: string,
): Promise<{ ok: true; newId: string } | { ok: false; error: string }> {
  const source = await getPageById(id);
  if (!source) return { ok: false, error: "Page not found." };

  let candidate = `${source.slug}-copy`;
  let n = 2;
  const usedSlugs = await listAllSlugs();
  while (validateSlug(candidate, { usedSlugs }) !== null) {
    candidate = `${source.slug}-copy-${n}`;
    n += 1;
  }

  const newId = newPageId();
  const dup = await duplicatePage(
    id,
    newId,
    candidate,
    `${source.name} (copy)`,
  );
  if (!dup) return { ok: false, error: "Could not duplicate page." };
  revalidatePath("/editor");
  return { ok: true, newId };
}
