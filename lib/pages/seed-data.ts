import { defaultCoachSectionProps } from "@/lib/sections/coach-defaults";
import { newSectionId } from "@/lib/sections/ids";
import { getSectionDef } from "@/lib/sections/registry";
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

function seededSection(type: string) {
  const def = getSectionDef(type);
  if (!def) throw new Error(`Unknown seed section: ${type}`);
  return {
    id: newSectionId(),
    type,
    props: def.defaultProps(),
  };
}

export function buildSeedPages(): SeedPageInput[] {
  return [
    {
      id: "seed-pilot-coaches",
      name: "Pilot · Coach grid",
      slug: "pilot-coaches",
      theme: "dark",
      status: "published",
      sections: [
        seededSection("nav-coaching-apply"),
        seededSection("header-offer"),
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
