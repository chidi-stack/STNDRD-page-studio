import type Database from "better-sqlite3";

import type {
  CtaConfig,
  PageRecord,
  PageSection,
  PageStatus,
  PageSummary,
  PageTheme,
} from "@/lib/types/page";
import { starterSections } from "@/lib/sections/starter";
import { newSectionId } from "@/lib/sections/ids";

type PageRow = {
  id: string;
  name: string;
  slug: string;
  theme: string;
  status: string;
  sections: string;
  cta: string;
  updated_at: string;
};

function parseRow(row: PageRow): PageRecord {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    theme: row.theme as PageTheme,
    status: row.status as PageStatus,
    sections: JSON.parse(row.sections) as PageSection[],
    cta: JSON.parse(row.cta) as CtaConfig,
    updatedAt: row.updated_at,
  };
}

export function listAllPages(db: Database.Database): PageRecord[] {
  const rows = db
    .prepare(`SELECT * FROM pages ORDER BY updated_at DESC`)
    .all() as PageRow[];
  return rows.map(parseRow);
}

export function listPageSummaries(db: Database.Database): PageSummary[] {
  const rows = db
    .prepare(
      `SELECT id, name, slug, theme, status, updated_at AS updatedAt FROM pages ORDER BY updated_at DESC`,
    )
    .all() as Array<{
    id: string;
    name: string;
    slug: string;
    theme: string;
    status: string;
    updatedAt: string;
  }>;
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    theme: r.theme as PageTheme,
    status: r.status as PageStatus,
    updatedAt: r.updatedAt,
  }));
}

export function listAllSlugs(db: Database.Database): string[] {
  const rows = db.prepare(`SELECT slug FROM pages`).all() as { slug: string }[];
  return rows.map((r) => r.slug);
}

export function getPageById(
  db: Database.Database,
  id: string,
): PageRecord | null {
  const row = db.prepare(`SELECT * FROM pages WHERE id = ?`).get(id) as
    | PageRow
    | undefined;
  return row ? parseRow(row) : null;
}

export function getPublishedPageBySlug(
  db: Database.Database,
  slug: string,
): PageRecord | null {
  const row = db
    .prepare(`SELECT * FROM pages WHERE slug = ? AND status = 'published'`)
    .get(slug) as PageRow | undefined;
  return row ? parseRow(row) : null;
}

export function insertPage(
  db: Database.Database,
  input: {
    id: string;
    name: string;
    slug: string;
    theme: PageTheme;
    sections?: PageSection[];
  },
): PageRecord {
  const now = new Date().toISOString();
  const sections = input.sections ?? starterSections();
  const cta: CtaConfig = {
    mode: "external",
    externalUrl: "https://www.stndrdcoach.com/apply",
  };
  db.prepare(
    `INSERT INTO pages (id, name, slug, theme, status, sections, cta, updated_at)
     VALUES (@id, @name, @slug, @theme, 'draft', @sections, @cta, @updated_at)`,
  ).run({
    id: input.id,
    name: input.name,
    slug: input.slug,
    theme: input.theme,
    sections: JSON.stringify(sections),
    cta: JSON.stringify(cta),
    updated_at: now,
  });
  return getPageById(db, input.id)!;
}

export function updatePage(
  db: Database.Database,
  id: string,
  patch: {
    name?: string;
    slug?: string;
    theme?: PageTheme;
    sections?: PageSection[];
    cta?: CtaConfig;
    status?: PageStatus;
  },
): PageRecord | null {
  const existing = getPageById(db, id);
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
  db.prepare(
    `UPDATE pages SET name = @name, slug = @slug, theme = @theme, status = @status,
     sections = @sections, cta = @cta, updated_at = @updated_at WHERE id = @id`,
  ).run({
    id,
    name: next.name,
    slug: next.slug,
    theme: next.theme,
    status: next.status,
    sections: JSON.stringify(next.sections),
    cta: JSON.stringify(next.cta),
    updated_at: next.updated_at,
  });
  return getPageById(db, id);
}

export function duplicatePage(
  db: Database.Database,
  sourceId: string,
  newId: string,
  newSlug: string,
  newName: string,
): PageRecord | null {
  const source = getPageById(db, sourceId);
  if (!source) return null;
  const sections = source.sections.map((s) => ({
    ...s,
    id: newSectionId(),
    props: JSON.parse(JSON.stringify(s.props)) as Record<string, unknown>,
  }));
  insertPage(db, {
    id: newId,
    name: newName,
    slug: newSlug,
    theme: source.theme,
    sections,
  });
  updatePage(db, newId, { cta: source.cta });
  return getPageById(db, newId);
}
