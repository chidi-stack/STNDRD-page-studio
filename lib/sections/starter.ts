import { defaultCoachSectionProps } from "@/lib/sections/coach-defaults";
import { newSectionId } from "@/lib/sections/ids";
import type { PageSection } from "@/lib/types/page";

/** Default page: single coach grid section. */
export function starterSections(): PageSection[] {
  return [
    {
      id: newSectionId(),
      type: "section-coach",
      props: defaultCoachSectionProps() as unknown as Record<string, unknown>,
    },
  ];
}
