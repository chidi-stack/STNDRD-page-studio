"use client";

import { Providers } from "@/app/providers";
import { PageRenderer } from "@/components/PageRenderer";
import type { PageSection, PageTheme } from "@/lib/types/page";

import "@/webflow/css/global.css";
import "@/app/(site)/published.css";

type Props = {
  sections: PageSection[];
  theme: PageTheme;
  previewMode: "desktop" | "mobile";
};

/** DevLink + site CSS only inside the preview pane (not the whole /editor route). */
export function EditorPreviewPane({ sections, theme, previewMode }: Props) {
  return (
    <Providers>
      <div
        className={
          previewMode === "mobile"
            ? "studio-preview-frame studio-preview-frame-mobile"
            : "studio-preview-frame"
        }
      >
        <PageRenderer sections={sections} theme={theme} preview />
      </div>
    </Providers>
  );
}
