import { newSectionId } from "@/lib/sections/ids";
import { getSectionDef } from "@/lib/sections/registry";
import type { PageSection } from "@/lib/types/page";

/** Coaching landing: navbar through proof, CTA, and footer. */
export const LANDING_TEMPLATE_TYPES = [
  "nav-coaching-apply",
  "header-offer",
  "section-executives",
  "section-creators",
  "section-coach",
  "section-cta",
  "footer-regular",
] as const;

export const LANDING_TEMPLATE = {
  name: "Coaching landing",
  description:
    "Nav, offer header, executives, creators, coach grid, CTA, and footer.",
  stack: "Nav · Header · Executives · Creators · Coach grid · CTA · Footer",
};

export function starterSections(): PageSection[] {
  return LANDING_TEMPLATE_TYPES.map((type) => {
    const def = getSectionDef(type);
    if (!def) throw new Error(`Unknown starter section: ${type}`);
    return {
      id: newSectionId(),
      type,
      props: def.defaultProps(),
    };
  });
}
