import type { ComponentType } from "react";

import {
  defaultCoachSectionProps,
  parseCoachSectionProps,
} from "@/lib/sections/coach-defaults";
import { SectionCoach } from "@/webflow/sections2/SectionCoach";

export type SectionFieldDef =
  | { key: string; label: string; type: "text"; max?: number; required?: boolean }
  | { key: string; label: string; type: "textarea"; max?: number; required?: boolean }
  | {
      key: string;
      label: string;
      type: "image";
      required?: boolean;
    }
  | {
      key: string;
      label: string;
      type: "coach-grid";
      slots: number;
    };

export type SectionTypeDef = {
  type: string;
  name: string;
  description: string;
  category: string;
  fields: SectionFieldDef[];
  defaultProps: () => Record<string, unknown>;
  toDevLinkProps: (props: Record<string, unknown>) => Record<string, unknown>;
  Component: ComponentType<Record<string, unknown>>;
};

function coachToDevLink(props: Record<string, unknown>) {
  const { heading, coaches } = parseCoachSectionProps(props);
  const keys = [
    ["g1PlainText", "g1Image1"],
    ["g2H2", "g2Image2"],
    ["g3H3", "g3Image3"],
    ["g4H4", "g4Image4"],
    ["g5H5", "g5Image5"],
    ["g6H6", "g6Image6"],
    ["g7H7", "g7Image7"],
    ["g8H8", "g8Image8"],
    ["g9H9", "g9Image9"],
    ["g10H10", "g10Image10"],
  ] as const;
  const out: Record<string, unknown> = { heading };
  keys.forEach(([nameKey, imageKey], i) => {
    const slot = coaches[i];
    out[nameKey] = slot?.name ?? "";
    out[imageKey] = slot?.image ?? "";
  });
  return out;
}

const SECTION_COACH: SectionTypeDef = {
  type: "section-coach",
  name: "Coach grid",
  description: "Headline and ten coach portraits.",
  category: "Proof",
  fields: [
    { key: "heading", label: "Heading", type: "text", max: 120, required: true },
    {
      key: "coaches",
      label: "Coaches",
      type: "coach-grid",
      slots: 10,
    },
  ],
  defaultProps: () =>
    defaultCoachSectionProps() as unknown as Record<string, unknown>,
  toDevLinkProps: coachToDevLink,
  Component: SectionCoach as ComponentType<Record<string, unknown>>,
};

/** Add new DevLink sections here one at a time. */
export const SECTION_REGISTRY: Record<string, SectionTypeDef> = {
  [SECTION_COACH.type]: SECTION_COACH,
};

export const SECTION_LIBRARY: SectionTypeDef[] = Object.values(SECTION_REGISTRY);

export const SECTION_CATEGORIES = [
  "All",
  ...Array.from(new Set(SECTION_LIBRARY.map((s) => s.category))),
];

export function getSectionDef(type: string): SectionTypeDef | undefined {
  return SECTION_REGISTRY[type];
}
