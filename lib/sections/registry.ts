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
import { FooterRegular } from "@/webflow/FooterRegular";
import { SectionCta } from "@/webflow/sections2/SectionCta";
import { SectionCreators } from "@/webflow/sections2/SectionCreators";
import { SectionExecutives } from "@/webflow/SectionExecutives";

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

function imageSrc(value: unknown, fallback: string) {
  const src = typeof value === "string" ? value.trim() : "";
  return src || fallback;
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

const EXEC_IMAGES = [
  "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/69f901e10e59383c6d47f914_Frame%202147227827.png",
  "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/69f901e10e59383c6d47f918_Frame%202147227821.png",
  "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/69f901e10e59383c6d47f91c_Frame%202147227823.png",
  "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/69f901e10e59383c6d47f920_Frame%2021472278321.png",
  "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/69f901e10e59383c6d47f924_Frame%202147227824.png",
  "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/69f901e10e59383c6d47f928_Frame%202147227822.png",
  "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/69f901e10e59383c6d47f92c_Frame%202147227828.png",
  "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/69f901e10e59383c6d47f930_Frame%202147227831.png",
  "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/69f901e10e59383c6d47f934_Frame%202147227830.png",
] as const;

const SECTION_EXECUTIVES: SectionTypeDef = {
  type: "section-executives",
  name: "Executives",
  description: "Headline, nine executive photos, and results caption.",
  category: "Proof",
  fields: [
    { key: "title1", label: "Heading", type: "textarea", max: 160, required: true },
    { key: "title2", label: "Caption", type: "text", max: 120, required: true },
    { key: "image1", label: "Photo 1", type: "image" },
    { key: "image2", label: "Photo 2", type: "image" },
    { key: "image3", label: "Photo 3", type: "image" },
    { key: "image4", label: "Photo 4", type: "image" },
    { key: "image5", label: "Photo 5", type: "image" },
    { key: "image6", label: "Photo 6", type: "image" },
    { key: "image7", label: "Photo 7", type: "image" },
    { key: "image8", label: "Photo 8", type: "image" },
    { key: "image9", label: "Photo 9", type: "image" },
  ],
  defaultProps: () => ({
    title1: "Real executives. \nReal numbers. 12 months.",
    title2: "Results In as Little as The First 6 Weeks",
    image1: EXEC_IMAGES[0],
    image2: EXEC_IMAGES[1],
    image3: EXEC_IMAGES[2],
    image4: EXEC_IMAGES[3],
    image5: EXEC_IMAGES[4],
    image6: EXEC_IMAGES[5],
    image7: EXEC_IMAGES[6],
    image8: EXEC_IMAGES[7],
    image9: EXEC_IMAGES[8],
  }),
  toDevLinkProps: (props) => ({
    title1: lineBreakNodes(props.title1),
    title2: props.title2,
    image1: imageSrc(props.image1, EXEC_IMAGES[0]),
    image2: imageSrc(props.image2, EXEC_IMAGES[1]),
    image3: imageSrc(props.image3, EXEC_IMAGES[2]),
    image4: imageSrc(props.image4, EXEC_IMAGES[3]),
    image5: imageSrc(props.image5, EXEC_IMAGES[4]),
    image6: imageSrc(props.image6, EXEC_IMAGES[5]),
    image7: imageSrc(props.image7, EXEC_IMAGES[6]),
    image8: imageSrc(props.image8, EXEC_IMAGES[7]),
    image9: imageSrc(props.image9, EXEC_IMAGES[8]),
  }),
  Component: SectionExecutives as ComponentType<Record<string, unknown>>,
};

const CREATOR_IMAGES = [
  "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/69f901e10e59383c6d47f8f4_Image%20Container1.png",
  "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/69f901e10e59383c6d47f8fa_Image%20Container3.png",
] as const;

const SECTION_CREATORS: SectionTypeDef = {
  type: "section-creators",
  name: "Creators",
  description: "Justin and Chris bios with photos and quote.",
  category: "Proof",
  fields: [
    { key: "title1", label: "Heading", type: "textarea", max: 160, required: true },
    { key: "image1", label: "Justin photo", type: "image" },
    { key: "title2", label: "Justin name", type: "text", max: 80, required: true },
    { key: "text3", label: "Justin role", type: "text", max: 40, required: true },
    { key: "text4", label: "Justin bio", type: "textarea", max: 800, required: true },
    { key: "text1", label: "Quote", type: "textarea", max: 200, required: true },
    { key: "text2", label: "Quote name", type: "text", max: 80, required: true },
    { key: "image2", label: "Chris photo", type: "image" },
    { key: "title3", label: "Chris name", type: "text", max: 80, required: true },
    { key: "text5", label: "Chris role", type: "text", max: 40, required: true },
    { key: "text6", label: "Chris bio", type: "textarea", max: 800, required: true },
  ],
  defaultProps: () => ({
    title1: "Meet the Creators of the Higher Standard Transformation System",
    image1: CREATOR_IMAGES[0],
    title2: "justin king",
    text3: "Co Founder",
    text4:
      'Justin is becoming known as the person you go to when you want "life transformative results". The STNDRD Coaching System is his brain child - a mix of 100\'s of years of experience, contextualized into the most result producing, high performer transformation system in the world. He\'s been trusted by 1,000\'s to deliver such results, 100+ pro athletes, and his goal is to continue shaping the cultural shift to create better and stronger men who\'s standard they build in the gym, bleed over into every area o their lives.',
    text1: "Justin is one of one in this space.",
    text2: "Chris Bumstead",
    image2: CREATOR_IMAGES[1],
    title3: "Chris Bumstead",
    text5: "Co Founder",
    text6:
      "Chris is the total embodiment of a high performer who seemingly carries the world on his shoulders. A husband, father, owner of a robust 9 figure portfolio, endless travel and event calendar - and on top of all of that, a X6 Mr. Olympia Champion, Chris has built a framework that proves you can have the mind, the body, the family, the output, and the success! All by a singular system of raising your standard and refusing to slide backwards into comfort. He believes this framework will change a generation of men and all it takes is showing up.",
  }),
  toDevLinkProps: (props) => ({
    title1: props.title1,
    image1: imageSrc(props.image1, CREATOR_IMAGES[0]),
    title2: props.title2,
    text3: props.text3,
    text4: props.text4,
    text1: props.text1,
    text2: props.text2,
    image2: imageSrc(props.image2, CREATOR_IMAGES[1]),
    title3: props.title3,
    text5: props.text5,
    text6: props.text6,
  }),
  Component: SectionCreators as ComponentType<Record<string, unknown>>,
};

const CTA_IMAGE =
  "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/69f901e10e59383c6d47f8ed_Image.png";
const CTA_ARROW =
  "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/69f901e10e59383c6d47f8f1_68a82fc786d59ffe72dd7cbe_arrow-black.svg.png";

const SECTION_CTA: SectionTypeDef = {
  type: "section-cta",
  name: "CTA",
  description: "Headline, body, apply button, and photo.",
  category: "CTA",
  fields: [
    { key: "title", label: "Heading", type: "text", max: 160, required: true },
    { key: "text1", label: "Body", type: "textarea", max: 400, required: true },
    { key: "text2", label: "Button label", type: "text", max: 40, required: true },
    { key: "applyUrl", label: "Button link", type: "text", required: true },
    { key: "image2", label: "Photo", type: "image" },
  ],
  defaultProps: () => ({
    title: "Make your body match your balance sheet.",
    text1: "Apply in 5 minutes. If we can't help you, we'll tell you straight.",
    text2: "Claim Your Seat",
    applyUrl: "#",
    image2: CTA_IMAGE,
  }),
  toDevLinkProps: (props) => ({
    title: props.title,
    text1: props.text1,
    text2: props.text2,
    link: linkProp(props.applyUrl, "#"),
    image1: CTA_ARROW,
    image2: imageSrc(props.image2, CTA_IMAGE),
  }),
  Component: SectionCta as ComponentType<Record<string, unknown>>,
};

const FOOTER_LOGO =
  "https://cdn.prod.website-files.com/68a822ab60d65fba371458e2/69f901e10e59383c6d47f8ea_STNDRD%20COACHING%201.svg";

const FOOTER_REGULAR: SectionTypeDef = {
  type: "footer-regular",
  name: "Footer",
  description: "Logo, privacy, terms, and copyright.",
  category: "Footer",
  fields: [
    { key: "image", label: "Logo", type: "image" },
    { key: "privacyLabel", label: "Privacy label", type: "text", max: 40, required: true },
    { key: "privacyUrl", label: "Privacy link", type: "text", required: true },
    { key: "termsLabel", label: "Terms label", type: "text", max: 40, required: true },
    { key: "termsUrl", label: "Terms link", type: "text", required: true },
    { key: "copyright", label: "Copyright", type: "text", max: 80, required: true },
  ],
  defaultProps: () => ({
    image: FOOTER_LOGO,
    privacyLabel: "Privacy policy",
    privacyUrl: "/privacy-policy",
    termsLabel: "Terms & Conditions",
    termsUrl: "/terms-conditions",
    copyright: "© 2026 STNRD APP LLC",
  }),
  toDevLinkProps: (props) => ({
    image: imageSrc(props.image, FOOTER_LOGO),
    text1: "Careers",
    link1: { href: "#" },
    text2: props.privacyLabel,
    link2: linkProp(props.privacyUrl, "/privacy-policy"),
    text3: props.termsLabel,
    link3: linkProp(props.termsUrl, "/terms-conditions"),
    text4: props.copyright,
  }),
  Component: FooterRegular as ComponentType<Record<string, unknown>>,
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
  [SECTION_EXECUTIVES.type]: SECTION_EXECUTIVES,
  [SECTION_CREATORS.type]: SECTION_CREATORS,
  [SECTION_CTA.type]: SECTION_CTA,
  [FOOTER_REGULAR.type]: FOOTER_REGULAR,
};

export const SECTION_LIBRARY: SectionTypeDef[] = Object.values(SECTION_REGISTRY);

export const SECTION_CATEGORIES = [
  "All",
  ...Array.from(new Set(SECTION_LIBRARY.map((s) => s.category))),
];

export function getSectionDef(type: string): SectionTypeDef | undefined {
  return SECTION_REGISTRY[type];
}
