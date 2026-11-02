"use client";

import type { PageSection, PageTheme } from "@/lib/types/page";
import { getSectionDef } from "@/lib/sections/registry";

type PageRendererProps = {
  sections: PageSection[];
  theme?: PageTheme;
  preview?: boolean;
};

export function PageRenderer({
  sections,
  theme = "dark",
  preview = false,
}: PageRendererProps) {
  return (
    <main
      className={theme === "dark" ? "offer" : undefined}
      style={{ minHeight: preview ? "auto" : "100vh" }}
    >
      {sections.map((section) => {
        const def = getSectionDef(section.type);
        if (!def) {
          return (
            <div
              key={section.id}
              style={{
                padding: "2rem",
                background: "#fee",
                color: "#900",
              }}
            >
              Unknown section type: {section.type}
            </div>
          );
        }
        const { Component } = def;
        const devlinkProps = def.toDevLinkProps(section.props);
        return <Component key={section.id} {...devlinkProps} />;
      })}
    </main>
  );
}
