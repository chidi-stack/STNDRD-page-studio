import type { PageRecord, PageSection, PageStatus } from "@/lib/types/page";

/** Handoff PageStudio page shape (subset). */
export type HandoffPage = {
  id: string;
  name: string;
  slug: string;
  theme: "dark" | "light";
  status: string;
  updated: string;
  by: string;
  sections: HandoffSection[];
  revisions: Array<{ n: number; time: string; by: string; sections: HandoffSection[] }>;
  liveRev?: number;
  reviewRev?: number;
  submitted?: string;
  hasChanges?: boolean;
};

export type HandoffSection = {
  id: string;
  type: string;
  v: Record<string, unknown>;
  items: unknown[];
};

const STATUS_TO_HANDOFF: Record<PageStatus, string> = {
  draft: "Draft",
  in_review: "In review",
  published: "Published",
  unpublished: "Unpublished",
};

const STATUS_FROM_HANDOFF: Record<string, PageStatus> = {
  Draft: "draft",
  "In review": "in_review",
  Published: "published",
  Unpublished: "unpublished",
};

function isDevLinkSection(type: string): boolean {
  return (
    type.startsWith("section-") ||
    type.startsWith("nav-") ||
    type.startsWith("header-")
  );
}

export function dbSectionToHandoff(section: PageSection): HandoffSection {
  if (isDevLinkSection(section.type)) {
    return {
      id: section.id,
      type: section.type,
      v: { ...section.props },
      items: [],
    };
  }
  const props = section.props as Record<string, unknown>;
  const items = (props.items as unknown[]) || [];
  const { items: _i, ...v } = props;
  return {
    id: section.id,
    type: section.type,
    v,
    items,
  };
}

export function handoffSectionToDb(section: HandoffSection): PageSection {
  if (isDevLinkSection(section.type)) {
    return {
      id: section.id,
      type: section.type,
      props: { ...section.v },
    };
  }
  return {
    id: section.id,
    type: section.type,
    props: {
      ...section.v,
      items: section.items || [],
    },
  };
}

export function dbPageToHandoff(page: PageRecord): HandoffPage {
  return {
    id: page.id,
    name: page.name,
    slug: page.slug,
    theme: page.theme,
    status: STATUS_TO_HANDOFF[page.status] ?? "Draft",
    updated: new Date(page.updatedAt).toLocaleString("en-GB"),
    by: "You",
    sections: page.sections.map(dbSectionToHandoff),
    revisions: [],
  };
}

export function handoffPageToDbPatch(page: HandoffPage): {
  name: string;
  slug: string;
  theme: "dark" | "light";
  status: PageStatus;
  sections: PageSection[];
} {
  return {
    name: page.name,
    slug: page.slug,
    theme: page.theme === "light" ? "light" : "dark",
    status: STATUS_FROM_HANDOFF[page.status] ?? "draft",
    sections: page.sections.map(handoffSectionToDb),
  };
}

export function dbPagesToHandoff(pages: PageRecord[]): HandoffPage[] {
  return pages.map(dbPageToHandoff);
}
