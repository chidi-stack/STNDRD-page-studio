import type { ComponentType, ReactNode } from "react";
import { createElement } from "react";

import {
  defaultCoachSectionProps,
  parseCoachSectionProps,
} from "@/lib/sections/coach-defaults";
import { wistiaEmbedHtml } from "@/lib/sections/wistia-embed";
import { HeaderOffer } from "@/webflow/header/HeaderOffer";
import { HeaderPrecall } from "@/webflow/header/HeaderPrecall";
import { HeaderProtocol } from "@/webflow/header/HeaderProtocol";
import { NavCoachingApply } from "@/webflow/navbar/NavCoachingApply";
import { NavbarLogoOnly } from "@/webflow/navbar/NavbarLogoOnly";
import { NavProtocol } from "@/webflow/navbar/NavProtocol";
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

function linkProp(value: unknown, fallback: string) {
  const href = typeof value === "string" && value.trim() ? value.trim() : fallback;
  return { href };
}

function wistiaId(value: unknown, fallback: string) {
  const id = typeof value === "string" ? value.trim() : "";
  return /^[a-z0-9]+$/i.test(id) ? id : fallback;
}

function paragraphNodes(value: unknown): ReactNode {
  const text = typeof value === "string" ? value : "";
  const parts = text.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  if (parts.length <= 1) return text;
  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [createElement("br", { key: `br-a-${i}` }), createElement("br", { key: `br-b-${i}` }), part],
  );
}

function lineBreakNodes(value: unknown): ReactNode {
  const text = typeof value === "string" ? value : "";
  const parts = text.split("\n");
  if (parts.length <= 1) return text;
  return parts.flatMap((part, i) =>
    i === 0 ? [part] : [createElement("br", { key: `br-${i}` }), part],
  );
}

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

const NAV_COACHING_APPLY: SectionTypeDef = {
  type: "nav-coaching-apply",
  name: "Nav · applications open",
  description: "Logo, applications badge, and Apply.",
  category: "Navigation",
  fields: [
    { key: "badgeText", label: "Badge", type: "text", max: 40, required: true },
    { key: "applyLabel", label: "Apply label", type: "text", max: 24, required: true },
    { key: "applyUrl", label: "Apply link", type: "text", required: true },
    { key: "logoUrl", label: "Logo link", type: "text", required: true },
  ],
  defaultProps: () => ({
    badgeText: "APPLICATIONS OPEN NOW",
    applyLabel: "Apply",
    applyUrl: "#",
    logoUrl: "https://www.stndrdcoach.com/",
  }),
  toDevLinkProps: (props) => ({
    badgeText: props.badgeText,
    applyLabel: props.applyLabel,
    applyLink: linkProp(props.applyUrl, "#"),
    logoLink: linkProp(props.logoUrl, "https://www.stndrdcoach.com/"),
  }),
  Component: NavCoachingApply as ComponentType<Record<string, unknown>>,
};

const NAV_PROTOCOL: SectionTypeDef = {
  type: "nav-protocol",
  name: "Nav · protocol",
  description: "Wordmark and protocol title.",
  category: "Navigation",
  fields: [
    { key: "title", label: "Title", type: "text", max: 80, required: true },
    { key: "logoUrl", label: "Logo link", type: "text", required: true },
  ],
  defaultProps: () => ({
    title: "STNDRD 90-Day Protocol",
    logoUrl: "https://www.stndrdcoach.com/",
  }),
  toDevLinkProps: (props) => ({
    title: props.title,
    logoLink: linkProp(props.logoUrl, "https://www.stndrdcoach.com/"),
  }),
  Component: NavProtocol as ComponentType<Record<string, unknown>>,
};

const NAV_LOGO: SectionTypeDef = {
  type: "nav-logo",
  name: "Nav · logo",
  description: "Centered STNDRD Coaching lockup.",
  category: "Navigation",
  fields: [],
  defaultProps: () => ({}),
  toDevLinkProps: () => ({}),
  Component: NavbarLogoOnly as ComponentType<Record<string, unknown>>,
};

const HEADER_OFFER: SectionTypeDef = {
  type: "header-offer",
  name: "Header · offer",
  description: "Offer headline, Wistia embed, body copy, and apply button.",
  category: "Hero",
  fields: [
    { key: "heading", label: "Heading", type: "text", max: 160, required: true },
    { key: "paragraph", label: "Body", type: "textarea", max: 800, required: true },
    { key: "buttonLabel", label: "Button label", type: "text", max: 40, required: true },
    { key: "applyUrl", label: "Button link", type: "text", required: true },
    { key: "wistiaMediaId", label: "Wistia id", type: "text", max: 40, required: true },
  ],
  defaultProps: () => ({
    heading: "The Only 1:1 Executive Health Program That Guarantees Visible Abs",
    paragraph:
      "Made for the busiest schedules on Earth, with a 99% transformation rate.\n\nGet visible abs in under 12 months, zero chronic pain, and higher energy than you've had in a decade, guaranteed, or we coach you for free until we get there.",
    buttonLabel: "Apply for Q3 cohort",
    applyUrl: "#",
    wistiaMediaId: "vecxw9227g",
  }),
  toDevLinkProps: (props) => ({
    heading: props.heading,
    paragraph: paragraphNodes(props.paragraph),
    buttonLabel: props.buttonLabel,
    link: linkProp(props.applyUrl, "#"),
    videoEmbed: wistiaEmbedHtml(wistiaId(props.wistiaMediaId, "vecxw9227g")),
  }),
  Component: HeaderOffer as ComponentType<Record<string, unknown>>,
};

const HEADER_PRECALL: SectionTypeDef = {
  type: "header-precall",
  name: "Header · precall",
  description: "Precall headline, Wistia embed, tagline, and confirmation copy.",
  category: "Hero",
  fields: [
    { key: "tagline", label: "Tagline", type: "text", max: 200, required: true },
    { key: "title", label: "Title", type: "textarea", max: 200, required: true },
    { key: "paragraph", label: "Body", type: "textarea", max: 400, required: true },
    { key: "wistiaMediaId", label: "Wistia id", type: "text", max: 40, required: true },
  ],
  defaultProps: () => ({
    tagline: "For CEO’s, Business Owners, & Busy Professionals Making $100k-$1M+ a Year",
    title: "Your Call is booked! \nPlease Complete The Steps below To Confirm Your time.",
    paragraph: "Chris Bumstead, 6x mr. Olympia Winner",
    wistiaMediaId: "0immrye6rf",
  }),
  toDevLinkProps: (props) => ({
    tagline: props.tagline,
    title: lineBreakNodes(props.title),
    paragraph: paragraphNodes(props.paragraph),
    videoEmbed: wistiaEmbedHtml(wistiaId(props.wistiaMediaId, "0immrye6rf")),
  }),
  Component: HeaderPrecall as ComponentType<Record<string, unknown>>,
};

const HEADER_PROTOCOL: SectionTypeDef = {
  type: "header-protocol",
  name: "Header · protocol",
  description: "Protocol headline, bullets, checkout button, and Wistia embed.",
  category: "Hero",
  fields: [
    { key: "headingTitle", label: "Heading", type: "text", max: 200, required: true },
    { key: "paragraphText", label: "Body", type: "textarea", max: 800, required: true },
    { key: "bullet1", label: "Bullet 1", type: "text", max: 200, required: true },
    { key: "bullet2", label: "Bullet 2", type: "text", max: 200, required: true },
    { key: "bullet3", label: "Bullet 3", type: "text", max: 200, required: true },
    { key: "buttonText", label: "Button label", type: "text", max: 60, required: true },
    { key: "wistiaMediaId", label: "Wistia id", type: "text", max: 40, required: true },
  ],
  defaultProps: () => ({
    headingTitle:
      "Gain visible muscle & lose fat in 90 days - or your coach works with you another 90 days, on us.",
    paragraphText:
      "A fully remote 90-day protocol built for founders, executives, and high-output professionals who want elite results without wrecking their schedule.",
    bullet1:
      "Visible muscle gained and fat lost in 90 days, tracked against your own data.",
    bullet2:
      "A protocol your coach builds specifically for you, not a generic template.",
    bullet3:
      "Option to continue into full 1-on-1 executive coaching once you see it work.",
    buttonText: "START YOUR 90 DAY PROTOCOL",
    wistiaMediaId: "y9p6r54vjc",
  }),
  toDevLinkProps: (props) => ({
    headingTitle: props.headingTitle,
    paragraphText: props.paragraphText,
    bullet1: props.bullet1,
    bullet2: props.bullet2,
    bullet3: props.bullet3,
    buttonText: props.buttonText,
    videoEmbed: wistiaEmbedHtml(wistiaId(props.wistiaMediaId, "y9p6r54vjc")),
    visibility: true,
  }),
  Component: HeaderProtocol as ComponentType<Record<string, unknown>>,
};

/** Add new DevLink sections here one at a time. */
export const SECTION_REGISTRY: Record<string, SectionTypeDef> = {
  [SECTION_COACH.type]: SECTION_COACH,
  [NAV_COACHING_APPLY.type]: NAV_COACHING_APPLY,
  [NAV_PROTOCOL.type]: NAV_PROTOCOL,
  [NAV_LOGO.type]: NAV_LOGO,
  [HEADER_OFFER.type]: HEADER_OFFER,
  [HEADER_PRECALL.type]: HEADER_PRECALL,
  [HEADER_PROTOCOL.type]: HEADER_PROTOCOL,
};

export const SECTION_LIBRARY: SectionTypeDef[] = Object.values(SECTION_REGISTRY);

export const SECTION_CATEGORIES = [
  "All",
  ...Array.from(new Set(SECTION_LIBRARY.map((s) => s.category))),
];

export function getSectionDef(type: string): SectionTypeDef | undefined {
  return SECTION_REGISTRY[type];
}
