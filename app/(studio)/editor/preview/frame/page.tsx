"use client";

import { useCallback, useEffect, useState } from "react";

import { Providers } from "@/app/providers";
import Section from "@/handoff/components/StudioSectionBridge";
import {
  PS_PREVIEW_HEIGHT,
  PS_PREVIEW_READY,
  PS_PREVIEW_SELECT,
  PS_PREVIEW_UPDATE,
  type PreviewPayload,
} from "@/lib/studio/preview-messages";

export default function PreviewFramePage() {
  const [payload, setPayload] = useState<PreviewPayload | null>(null);

  const postHeight = useCallback(() => {
    const height = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    );
    window.parent.postMessage(
      { type: PS_PREVIEW_HEIGHT, height },
      window.location.origin,
    );
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== PS_PREVIEW_UPDATE) return;
      setPayload(event.data.payload as PreviewPayload);
    };
    window.addEventListener("message", onMessage);
    window.parent.postMessage(
      { type: PS_PREVIEW_READY },
      window.location.origin,
    );
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (!payload) return;
    postHeight();
    const ro = new ResizeObserver(() => postHeight());
    ro.observe(document.body);
    return () => ro.disconnect();
  }, [payload, postHeight]);

  if (!payload) {
    return (
      <div
        style={{
          padding: 24,
          fontFamily: "system-ui, sans-serif",
          fontSize: 13,
          color: "#888",
        }}
      >
        Loading preview…
      </div>
    );
  }

  return (
    <Providers>
      <div style={{ background: payload.pageBg, minHeight: "100vh" }}>
        {payload.sections.map((sec) => {
          const active = sec.id === payload.selectedId;
          return (
            <div
              key={sec.id}
              role="button"
              tabIndex={0}
              onClick={() =>
                window.parent.postMessage(
                  { type: PS_PREVIEW_SELECT, id: sec.id },
                  window.location.origin,
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  window.parent.postMessage(
                    { type: PS_PREVIEW_SELECT, id: sec.id },
                    window.location.origin,
                  );
                }
              }}
              style={{
                cursor: "pointer",
                outline: active ? "2px solid #ffd21f" : "none",
                outlineOffset: -2,
              }}
            >
              <Section section={sec} theme={payload.theme} device="mobile" />
            </div>
          );
        })}
      </div>
    </Providers>
  );
}
