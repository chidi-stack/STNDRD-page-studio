import type { PageTheme } from "@/lib/types/page";

export type SeedPageInput = {
  id: string;
  name: string;
  slug: string;
  theme: PageTheme;
  status?: "draft" | "published";
  sections: Array<{
    id: string;
    type: string;
    props: Record<string, unknown>;
  }>;
};

/** New workspaces start empty. Pages come from the coaching landing template. */
export function buildSeedPages(): SeedPageInput[] {
  return [];
}
