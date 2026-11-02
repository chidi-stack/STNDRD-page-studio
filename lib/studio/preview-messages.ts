/** postMessage protocol between Page Studio and /editor/preview/frame */

export type PreviewSection = {
  id: string;
  type: string;
  v?: Record<string, unknown>;
  items?: unknown[];
};

export type PreviewPayload = {
  sections: PreviewSection[];
  theme: string;
  pageBg: string;
  selectedId: string | null;
};

export const PS_PREVIEW_READY = "ps-preview-ready";
export const PS_PREVIEW_UPDATE = "ps-preview-update";
export const PS_PREVIEW_HEIGHT = "ps-preview-height";
export const PS_PREVIEW_SELECT = "ps-preview-select";

export type PreviewUpdateMessage = {
  type: typeof PS_PREVIEW_UPDATE;
  payload: PreviewPayload;
};

export type PreviewHeightMessage = {
  type: typeof PS_PREVIEW_HEIGHT;
  height: number;
};

export type PreviewSelectMessage = {
  type: typeof PS_PREVIEW_SELECT;
  id: string;
};

export type PreviewReadyMessage = {
  type: typeof PS_PREVIEW_READY;
};
