"use client";

import { ImageField } from "@/components/editor/ImageField";
import {
  getSectionDef,
  SECTION_LIBRARY,
  type SectionFieldDef,
} from "@/lib/sections/registry";
import { parseCoachSectionProps } from "@/lib/sections/coach-defaults";
import type { PageSection } from "@/lib/types/page";

type Props = {
  section: PageSection;
  onChange: (next: PageSection) => void;
  readOnly?: boolean;
  pageId?: string | null;
};

export function SectionFieldEditor({ section, onChange, readOnly, pageId }: Props) {
  const def = getSectionDef(section.type);
  if (!def) {
    return <p className="studio-muted">Unknown section: {section.type}</p>;
  }

  function patchProps(partial: Record<string, unknown>) {
    if (readOnly) return;
    onChange({
      ...section,
      props: { ...section.props, ...partial },
    });
  }

  return (
    <div>
      <p className="studio-muted" style={{ marginTop: 0 }}>
        {def.description}
      </p>
      {def.fields.map((field) => (
        <FieldControl
          key={field.key}
          field={field}
          props={section.props}
          sectionId={section.id}
          pageId={pageId}
          onPatch={patchProps}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
}

function FieldControl({
  field,
  props,
  sectionId,
  pageId,
  onPatch,
  readOnly,
}: {
  field: SectionFieldDef;
  props: Record<string, unknown>;
  sectionId: string;
  pageId?: string | null;
  onPatch: (partial: Record<string, unknown>) => void;
  readOnly?: boolean;
}) {
  if (field.type === "coach-grid") {
    const { coaches } = parseCoachSectionProps(props);
    return (
      <div className="studio-field" style={{ marginBottom: "1rem" }}>
        <label>{field.label}</label>
        <div className="studio-coach-grid">
          {coaches.map((slot, i) => (
            <div key={i} className="studio-coach-slot">
              <div className="studio-coach-slot-index">Coach {i + 1}</div>
              <div className="studio-field" style={{ marginBottom: 0 }}>
                <label>Name</label>
                <input
                  className="studio-input"
                  disabled={readOnly}
                  value={slot.name}
                  placeholder={`Coach ${i + 1} name`}
                  onChange={(e) => {
                    const next = coaches.map((c, j) =>
                      j === i ? { ...c, name: e.target.value } : c,
                    );
                    onPatch({ coaches: next });
                  }}
                />
              </div>
              <ImageField
                compact
                label="Photo"
                readOnly={readOnly}
                pageId={pageId}
                sectionId={`${sectionId}-coach-${i + 1}`}
                value={slot.image}
                onChange={(image) => {
                  const url = typeof image === "string" ? image : image.src;
                  const next = coaches.map((c, j) =>
                    j === i ? { ...c, image: url } : c,
                  );
                  onPatch({ coaches: next });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "image") {
    const raw = props[field.key];
    const value =
      raw && typeof raw === "object" && "src" in raw
        ? (raw as { src: string; alt?: string })
        : typeof raw === "string"
          ? { src: raw, alt: "" }
          : { src: "", alt: "" };
    return (
      <ImageField
        label={field.label}
        required={field.required}
        readOnly={readOnly}
        showAlt
        pageId={pageId}
        sectionId={`${sectionId}-${field.key}`}
        value={{ src: value.src, alt: value.alt ?? "" }}
        onChange={(next) => {
          if (typeof next === "string") {
            onPatch({ [field.key]: { src: next, alt: value.alt } });
          } else {
            onPatch({ [field.key]: next });
          }
        }}
      />
    );
  }

  const value = (props[field.key] as string) ?? "";

  if (field.type === "textarea") {
    return (
      <div className="studio-field" style={{ marginBottom: "0.75rem" }}>
        <label>{field.label}</label>
        <textarea
          className="studio-input"
          disabled={readOnly}
          value={value}
          maxLength={field.max}
          onChange={(e) => onPatch({ [field.key]: e.target.value })}
        />
      </div>
    );
  }

  return (
    <div className="studio-field" style={{ marginBottom: "0.75rem" }}>
      <label>{field.label}</label>
      <input
        className="studio-input"
        disabled={readOnly}
        value={value}
        maxLength={field.max}
        onChange={(e) => onPatch({ [field.key]: e.target.value })}
      />
    </div>
  );
}

export { SECTION_LIBRARY };
