"use client";

import { SectionFieldEditor } from "@/components/editor/SectionFieldEditor";
import type { PageSection } from "@/lib/types/page";

type Props = {
  section: PageSection;
  readOnly?: boolean;
  pageId?: string | null;
  onChange: (props: Record<string, unknown>) => void;
};

/** DevLink section fields for Page Studio (registry-driven). */
export default function StudioRegistryFields({
  section,
  readOnly,
  pageId,
  onChange,
}: Props) {
  return (
    <SectionFieldEditor
      section={section}
      readOnly={readOnly}
      pageId={pageId}
      onChange={(next) => onChange(next.props)}
    />
  );
}
