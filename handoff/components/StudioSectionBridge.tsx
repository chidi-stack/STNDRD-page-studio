"use client";

import { Providers } from "@/app/providers";
import { PageRenderer } from "@/components/PageRenderer";
import type { PageSection } from "@/lib/types/page";

import Section from "./Section.jsx";

type Props = {
  section: {
    id?: string;
    type: string;
    v?: Record<string, unknown>;
    items?: unknown[];
  };
  theme: string;
  device: string;
};

/** Renders handoff Section types or DevLink sections in the Page Studio canvas. */
export default function StudioSectionBridge({ section, theme, device }: Props) {
  const type = section?.type || "";

  if (type.startsWith("section-")) {
    const pageSection: PageSection = {
      id: section.id || type,
      type,
      props: { ...(section.v || {}) },
    };
    const pageTheme = theme === "light" ? "light" : "dark";
    return (
      <Providers>
        <PageRenderer sections={[pageSection]} theme={pageTheme} preview />
      </Providers>
    );
  }

  return <Section section={section} theme={theme} device={device} />;
}
