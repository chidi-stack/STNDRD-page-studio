export type PageStatus = "draft" | "in_review" | "published" | "unpublished";

export type PageTheme = "dark" | "light";

export type CtaConfig = {
  mode: "external" | "typeform";
  externalUrl?: string;
  typeformLiveId?: string;
};

export type PageSection = {
  id: string;
  type: string;
  props: Record<string, unknown>;
};

export type PageRecord = {
  id: string;
  name: string;
  slug: string;
  theme: PageTheme;
  status: PageStatus;
  sections: PageSection[];
  cta: CtaConfig;
  updatedAt: string;
};

export type PageSummary = Pick<
  PageRecord,
  "id" | "name" | "slug" | "theme" | "status" | "updatedAt"
>;
