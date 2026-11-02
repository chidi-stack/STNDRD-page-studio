import type {
  CtaConfig,
  PageRecord,
  PageSection,
  PageStatus,
  PageSummary,
  PageTheme,
} from "@/lib/types/page";

export type SupabasePageRow = {
  id: string;
  name: string;
  slug: string;
  theme: string;
  status: string;
  sections: PageSection[] | string;
  cta: CtaConfig | string;
  updated_at: string;
};

function parseJsonField<T>(value: T | string): T {
  if (typeof value === "string") return JSON.parse(value) as T;
  return value;
}

export function rowToPageRecord(row: SupabasePageRow): PageRecord {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    theme: row.theme as PageTheme,
    status: row.status as PageStatus,
    sections: parseJsonField<PageSection[]>(row.sections),
    cta: parseJsonField<CtaConfig>(row.cta),
    updatedAt: row.updated_at,
  };
}

export function rowToPageSummary(row: SupabasePageRow): PageSummary {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    theme: row.theme as PageTheme,
    status: row.status as PageStatus,
    updatedAt: row.updated_at,
  };
}
