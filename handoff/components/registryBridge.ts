import {
  getSectionDef,
  SECTION_CATEGORIES,
  SECTION_LIBRARY,
  type SectionTypeDef,
} from "@/lib/sections/registry";

/** Picker rows aligned with handoff LIB shape. */
export type RegistryPickerRow = {
  type: string;
  cat: string;
  name: string;
  desc: string;
};

export const REGISTRY_PICKER_LIB: RegistryPickerRow[] = SECTION_LIBRARY.map(
  (s) => ({
    type: s.type,
    cat: s.category,
    name: s.name,
    desc: s.description,
  }),
);

export const REGISTRY_CATS = SECTION_CATEGORIES;

export function getRegistryDef(type: string): SectionTypeDef | undefined {
  return getSectionDef(type);
}

export function registrySampleSection(type: string) {
  const def = getSectionDef(type);
  if (!def) return null;
  return {
    type,
    v: def.defaultProps(),
    items: [] as unknown[],
  };
}

export function mkRegistrySection(
  type: string,
  newId: () => string,
): { id: string; type: string; v: Record<string, unknown>; items: unknown[] } | null {
  const def = getSectionDef(type);
  if (!def) return null;
  return {
    id: newId(),
    type,
    v: def.defaultProps(),
    items: [],
  };
}

export function registrySectionMeta(type: string): {
  name: string;
  cat: string;
} | null {
  const def = getSectionDef(type);
  if (!def) return null;
  return { name: def.name, cat: def.category };
}
