"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  PS_PREVIEW_HEIGHT,
  PS_PREVIEW_READY,
  PS_PREVIEW_SELECT,
  PS_PREVIEW_UPDATE,
  type PreviewSection,
} from "@/lib/studio/preview-messages";

type Props = {
  sections: PreviewSection[];
  theme: string;
  pageBg: string;
  selectedId: string | null;
  onSelectSection: (id: string) => void;
};

const FRAME_PATH = "/editor/preview/frame";

export default function MobileCanvasPreview({
  sections,
  theme,
  pageBg,
  selectedId,
  onSelectSection,
}: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(640);

  const pushUpdate = useCallback(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(
      {
        type: PS_PREVIEW_UPDATE,
        payload: { sections, theme, pageBg, selectedId },
      },
      window.location.origin,
    );
  }, [sections, theme, pageBg, selectedId]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== iframeRef.current?.contentWindow) return;

      if (event.data?.type === PS_PREVIEW_READY) {
        pushUpdate();
      }
      if (event.data?.type === PS_PREVIEW_HEIGHT) {
        setHeight(Math.max(320, Number(event.data.height) || 640));
      }
      if (event.data?.type === PS_PREVIEW_SELECT && event.data.id) {
        onSelectSection(String(event.data.id));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onSelectSection, pushUpdate]);

  useEffect(() => {
    pushUpdate();
  }, [pushUpdate]);

  return (
    <iframe
      ref={iframeRef}
      title="Mobile page preview"
      src={FRAME_PATH}
      style={{
        width: "100%",
        height,
        border: 0,
        display: "block",
        background: pageBg,
      }}
    />
  );
}
