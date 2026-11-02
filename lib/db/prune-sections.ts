import type Database from "better-sqlite3";

import { getSectionDef } from "@/lib/sections/registry";
import type { PageSection } from "@/lib/types/page";

/** Drop sections whose type is not in SECTION_REGISTRY (e.g. after removing types). */
export function pruneUnregisteredSections(db: Database.Database): void {
  const rows = db.prepare(`SELECT id, sections FROM pages`).all() as Array<{
    id: string;
    sections: string;
  }>;
  const update = db.prepare(
    `UPDATE pages SET sections = @sections WHERE id = @id`,
  );
  for (const row of rows) {
    const sections = JSON.parse(row.sections) as PageSection[];
    const filtered = sections.filter((s) => getSectionDef(s.type));
    if (filtered.length === sections.length) continue;
    update.run({
      id: row.id,
      sections: JSON.stringify(filtered),
    });
  }
}
