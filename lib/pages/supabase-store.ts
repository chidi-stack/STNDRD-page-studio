import "server-only";

import { getSectionDef } from "@/lib/sections/registry";
import { starterSections } from "@/lib/sections/starter";
import { newSectionId } from "@/lib/sections/ids";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import type {
  CtaConfig,
  PageRecord,
  PageSection,
  PageStatus,
  PageSummary,
  PageTheme,
} from "@/lib/types/page";

import { rowToPageRecord, rowToPageSummary, type SupabasePageRow } from "./row-map";
import { buildSeedPages } from "./seed-data";

let ready: Promise<void> | null = null;

function supabaseQueryError(context: string, message: string): never {
  throw new Error(`${context}: ${message}`);
}

async function ensureReady(): Promise<void> {
  if (!ready) {
    ready = bootstrap();
  }
  await ready;
}

async function bootstrap(): Promise<void> {
  await seedDatabaseIfEmpty();
  await pruneUnregisteredSections();
}

async function seedDatabaseIfEmpty(): Promise<void> {
  const supabase = createSupabaseAdmin();
  const { count, error: countError } = await supabase
    .from("pages")
    .select("*", { count: "exact", head: true });
  if (countError) {
    supabaseQueryError("Supabase seed count", countError.message);
  }
  if (count && count > 0) return;

  const now = new Date().toISOString();
  const defaultCta: CtaConfig = {
    mode: "external",
    externalUrl: "https://www.stndrdcoach.com/apply",
  };

  const rows = buildSeedPages().map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    theme: p.theme,
    status: p.status ?? "draft",
    sections: p.sections,
    cta: defaultCta,
    updated_at: now,
  }));

  if (!rows.length) return;

  const { error } = await supabase.from("pages").insert(rows);
  if (error) supabaseQueryError("Supabase seed insert", error.message);
}

async function pruneUnregisteredSections(): Promise<void> {
  const pages = await listAllPagesInternal();
  for (const page of pages) {
    const filtered = page.sections.filter((s) => getSectionDef(s.type));
    if (filtered.length === page.sections.length) continue;
    await updatePageInternal(page.id, { sections: filtered });
  }
}

async function listAllPagesInternal(): Promise<PageRecord[]> {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) supabaseQueryError("listAllPages", error.message);
  return (data as SupabasePageRow[]).map(rowToPageRecord);
}

async function updatePageInternal(
  id: string,
  patch: {
    name?: string;
    slug?: string;
    theme?: PageTheme;
    sections?: PageSection[];
    cta?: CtaConfig;
    status?: PageStatus;
  },
): Promise<PageRecord | null> {
  const existing = await getPageByIdInternal(id);
  if (!existing) return null;

  const next = {
    name: patch.name ?? existing.name,
    slug: patch.slug ?? existing.slug,
    theme: patch.theme ?? existing.theme,
    sections: patch.sections ?? existing.sections,
    cta: patch.cta ?? existing.cta,
    status: patch.status ?? existing.status,
    updated_at: new Date().toISOString(),
  };

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("pages")
    .update({
      name: next.name,
      slug: next.slug,
      theme: next.theme,
      status: next.status,
      sections: next.sections,
      cta: next.cta,
      updated_at: next.updated_at,
    })
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) supabaseQueryError("updatePage", error.message);
  return data ? rowToPageRecord(data as SupabasePageRow) : null;
}

async function getPageByIdInternal(id: string): Promise<PageRecord | null> {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) supabaseQueryError("getPageById", error.message);
  return data ? rowToPageRecord(data as SupabasePageRow) : null;
}

export async function listAllPages(): Promise<PageRecord[]> {
  await ensureReady();
  return listAllPagesInternal();
}

export async function listPageSummaries(): Promise<PageSummary[]> {
  await ensureReady();
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("pages")
    .select("id, name, slug, theme, status, updated_at")
    .order("updated_at", { ascending: false });
  if (error) supabaseQueryError("listPageSummaries", error.message);
  return (data as SupabasePageRow[]).map(rowToPageSummary);
}

export async function listAllSlugs(): Promise<string[]> {
  await ensureReady();
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.from("pages").select("slug");
  if (error) supabaseQueryError("listAllSlugs", error.message);
  return (data ?? []).map((r) => r.slug as string);
}

export async function getPageById(id: string): Promise<PageRecord | null> {
  await ensureReady();
  return getPageByIdInternal(id);
}

export async function getPublishedPageBySlug(
  slug: string,
): Promise<PageRecord | null> {
  await ensureReady();
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) supabaseQueryError("getPublishedPageBySlug", error.message);
  return data ? rowToPageRecord(data as SupabasePageRow) : null;
}

export async function insertPage(input: {
  id: string;
  name: string;
  slug: string;
  theme: PageTheme;
  sections?: PageSection[];
}): Promise<PageRecord> {
  await ensureReady();
  const now = new Date().toISOString();
  const sections = input.sections ?? starterSections();
  const cta: CtaConfig = {
    mode: "external",
    externalUrl: "https://www.stndrdcoach.com/apply",
  };

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("pages")
    .insert({
      id: input.id,
      name: input.name,
      slug: input.slug,
      theme: input.theme,
      status: "draft",
      sections,
      cta,
      updated_at: now,
    })
    .select("*")
    .single();

  if (error) supabaseQueryError("insertPage", error.message);
  return rowToPageRecord(data as SupabasePageRow);
}

export async function updatePage(
  id: string,
  patch: {
    name?: string;
    slug?: string;
    theme?: PageTheme;
    sections?: PageSection[];
    cta?: CtaConfig;
    status?: PageStatus;
  },
): Promise<PageRecord | null> {
  await ensureReady();
  return updatePageInternal(id, patch);
}

export async function duplicatePage(
  sourceId: string,
  newId: string,
  newSlug: string,
  newName: string,
): Promise<PageRecord | null> {
  await ensureReady();
  const source = await getPageByIdInternal(sourceId);
  if (!source) return null;
  const sections = source.sections.map((s) => ({
    ...s,
    id: newSectionId(),
    props: JSON.parse(JSON.stringify(s.props)) as Record<string, unknown>,
  }));
  await insertPage({
    id: newId,
    name: newName,
    slug: newSlug,
    theme: source.theme,
    sections,
  });
  return updatePage(newId, { cta: source.cta });
}

/** Postgres unique violation on slug */
export function isSlugConflictError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return error.message.includes("duplicate key") || error.message.includes("23505");
}
