import type { SectionFieldDef } from "@/lib/sections/registry";
import { getSectionDef } from "@/lib/sections/registry";
import type { PageSection } from "@/lib/types/page";

export type FieldIssue = { sectionId: string; sectionName: string; text: string };

function fieldError(
  field: SectionFieldDef,
  props: Record<string, unknown>,
): string | null {
  if (field.type === "coach-grid") {
    return null;
  }
  const val = props[field.key];
  if (field.type === "text" || field.type === "textarea") {
    const s = typeof val === "string" ? val : "";
    if (field.required !== false && !s.trim()) {
      return `${field.label} is required.`;
    }
    if (field.max && s.length > field.max) {
      return `${field.label} is over the ${field.max}-character limit.`;
    }
  }
  return null;
}

export function validatePageSections(sections: PageSection[]): FieldIssue[] {
  const issues: FieldIssue[] = [];
  if (sections.length === 0) {
    issues.push({
      sectionId: "_page",
      sectionName: "Page",
      text: "Add at least one section.",
    });
    return issues;
  }
  for (const section of sections) {
    const def = getSectionDef(section.type);
    if (!def) {
      issues.push({
        sectionId: section.id,
        sectionName: section.type,
        text: "Unknown section type.",
      });
      continue;
    }
    for (const field of def.fields) {
      const err = fieldError(field, section.props);
      if (err) {
        issues.push({
          sectionId: section.id,
          sectionName: def.name,
          text: err,
        });
      }
    }
  }
  return issues;
}
