"use client";

import { useId, useRef, useState } from "react";

import { uploadPageStudioImageAction } from "@/lib/actions/upload-asset";

export type ImageFieldValue = { src: string; alt: string };

type Props = {
  label?: string;
  required?: boolean;
  readOnly?: boolean;
  /** URL string or `{ src, alt }` for sections that store alt text. */
  value: string | ImageFieldValue;
  onChange: (value: string | ImageFieldValue) => void;
  showAlt?: boolean;
  compact?: boolean;
  /** Required for Supabase upload (editor page id). */
  pageId?: string | null;
  /** Groups files under `pages/{pageId}/{sectionId}/…` */
  sectionId?: string | null;
};

function normalize(
  value: string | ImageFieldValue,
): ImageFieldValue {
  if (typeof value === "string") {
    return { src: value, alt: "" };
  }
  return { src: value.src ?? "", alt: value.alt ?? "" };
}

function displayName(src: string): string {
  if (!src.trim()) return "No image yet";
  try {
    const path = new URL(src, "https://placeholder.local").pathname;
    const base = path.split("/").pop() || src;
    return decodeURIComponent(base.replace(/\+/g, " "));
  } catch {
    return src.length > 48 ? `${src.slice(0, 45)}…` : src;
  }
}

export function ImageField({
  label,
  required,
  readOnly,
  value,
  onChange,
  showAlt = false,
  compact = false,
  pageId,
  sectionId,
}: Props) {
  const id = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const { src, alt } = normalize(value);
  const hasSrc = !!src.trim();
  const [urlOpen, setUrlOpen] = useState(!hasSrc);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const canUpload = Boolean(pageId && !readOnly);

  const emit = (next: ImageFieldValue) => {
    if (typeof value === "string") {
      onChange(next.src);
    } else {
      onChange(next);
    }
  };

  const openFilePicker = () => {
    if (!canUpload || uploading) return;
    fileRef.current?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !pageId) return;

    setUploading(true);
    setUploadError(null);
    const formData = new FormData();
    formData.set("file", file);
    formData.set("pageId", pageId);
    formData.set("sectionId", sectionId || "asset");

    const result = await uploadPageStudioImageAction(formData);
    setUploading(false);

    if (!result.ok) {
      setUploadError(result.error);
      return;
    }

    emit({ src: result.url, alt });
    setUrlOpen(false);
  };

  const remove = () => {
    if (readOnly) return;
    emit({ src: "", alt: "" });
    setUrlOpen(true);
    setUploadError(null);
  };

  return (
    <div
      className={`studio-image-field${compact ? " studio-image-field--compact" : ""}`}
    >
      {label && (
        <label className="studio-image-field-label" htmlFor={`${id}-url`}>
          {label}
          {required ? (
            <span className="studio-image-field-req"> *</span>
          ) : null}
        </label>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="studio-image-field-file"
        tabIndex={-1}
        aria-hidden
        onChange={onFileChange}
      />
      <div className="studio-image-field-card">
        <div
          className={`studio-image-field-thumb${hasSrc ? " studio-image-field-thumb--filled" : ""}`}
          aria-hidden
        >
          {hasSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt="" className="studio-image-field-thumb-img" />
          ) : null}
        </div>
        <div className="studio-image-field-meta">
          <div className="studio-image-field-name">
            {uploading ? "Uploading…" : displayName(src)}
          </div>
          <div className="studio-image-field-hint">
            JPEG, PNG, WebP or GIF · up to 10 MB
          </div>
        </div>
        {!readOnly && (
          <div className="studio-image-field-actions">
            <button
              type="button"
              className="studio-btn studio-btn-ghost studio-image-field-btn"
              disabled={!canUpload || uploading}
              onClick={openFilePicker}
            >
              {hasSrc ? "Replace" : "Upload"}
            </button>
            <button
              type="button"
              className="studio-btn studio-btn-ghost studio-image-field-btn studio-image-field-btn-muted"
              disabled={uploading}
              onClick={() => setUrlOpen((v) => !v)}
            >
              {urlOpen ? "Hide link" : "Paste URL"}
            </button>
            {hasSrc && (
              <button
                type="button"
                className="studio-btn studio-btn-ghost studio-image-field-btn studio-image-field-btn-muted"
                disabled={uploading}
                onClick={remove}
              >
                Remove
              </button>
            )}
          </div>
        )}
      </div>
      {uploadError && (
        <p className="studio-image-field-error" role="alert">
          {uploadError}
        </p>
      )}
      {!canUpload && !readOnly && (
        <p className="studio-image-field-url-note">
          Open a saved page in the editor to enable uploads.
        </p>
      )}
      {urlOpen && !readOnly && (
        <div className="studio-image-field-url-wrap">
          <input
            id={`${id}-url`}
            className="studio-input studio-image-field-url"
            type="url"
            inputMode="url"
            placeholder="https://…"
            value={src}
            disabled={uploading}
            onChange={(e) => emit({ src: e.target.value, alt })}
          />
          <p className="studio-image-field-url-note">
            Or upload a file — stored in Supabase and saved as a public URL on
            this page.
          </p>
        </div>
      )}
      {showAlt && hasSrc && (
        <div className="studio-field" style={{ marginTop: 8, marginBottom: 0 }}>
          <label htmlFor={`${id}-alt`}>Alt text</label>
          <input
            id={`${id}-alt`}
            className="studio-input"
            disabled={readOnly}
            value={alt}
            placeholder="Describe the image for screen readers"
            onChange={(e) => emit({ src, alt: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}
