import { defaultCoachSectionProps } from "@/lib/sections/coach-defaults";
import { newSectionId } from "@/lib/sections/ids";
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

export function buildSeedPages(): SeedPageInput[] {
  return [
    {
      id: "seed-pilot-coaches",
      name: "Pilot · Coach grid",
      slug: "pilot-coaches",
      theme: "dark",
      status: "published",
      sections: [
        {
          id: newSectionId(),
          type: "section-coach",
          props: defaultCoachSectionProps(),
        },
      ],
    },
    {
      id: "seed-retainer-draft",
      name: "Retainer (draft sample)",
      slug: "retainer-offer",
      theme: "dark",
      status: "draft",
      sections: [
        {
          id: newSectionId(),
          type: "section-coach",
          props: defaultCoachSectionProps(),
        },
      ],
    },
  ];
}
