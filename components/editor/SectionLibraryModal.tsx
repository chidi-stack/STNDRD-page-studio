"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/studio/StudioUI";
import {
  SECTION_CATEGORIES,
  SECTION_LIBRARY,
  type SectionTypeDef,
} from "@/lib/sections/registry";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (type: string) => void;
  title?: string;
};

export function SectionLibraryModal({
  open,
  onClose,
  onSelect,
  title = "Add section",
}: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [preview, setPreview] = useState<SectionTypeDef | null>(
    SECTION_LIBRARY[0] ?? null,
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SECTION_LIBRARY.filter((s) => {
      if (category !== "All" && s.category !== category) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  if (!open) return null;

  return (
    <div className="studio-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="studio-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="section-library-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="studio-modal-header">
          <h2 id="section-library-title">{title}</h2>
          <button type="button" className="studio-modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="studio-modal-toolbar">
          <input
            className="studio-input"
            placeholder="Search sections…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="studio-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {SECTION_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="studio-library-split">
          <ul className="studio-library-list">
            {filtered.map((s) => (
              <li key={s.type}>
                <button
                  type="button"
                  className={
                    preview?.type === s.type
                      ? "studio-library-item studio-library-item-active"
                      : "studio-library-item"
                  }
                  onMouseEnter={() => setPreview(s)}
                  onFocus={() => setPreview(s)}
                  onClick={() => setPreview(s)}
                >
                  <span className="studio-library-item-cat">{s.category}</span>
                  <span className="studio-library-item-name">{s.name}</span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="studio-muted">No sections match.</li>
            )}
          </ul>
          <div className="studio-library-preview">
            {preview ? (
              <>
                <h3>{preview.name}</h3>
                <p className="studio-muted">{preview.description}</p>
                <p className="studio-muted">
                  {preview.fields.length} editable field
                  {preview.fields.length === 1 ? "" : "s"}
                </p>
                <Button
                  variant="primary"
                  onClick={() => {
                    onSelect(preview.type);
                    onClose();
                  }}
                >
                  Add to page
                </Button>
              </>
            ) : (
              <p className="studio-muted">Select a section to preview.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
