import type Database from "better-sqlite3";

import { insertPage } from "./pages";
import { defaultCoachSectionProps } from "@/lib/sections/coach-defaults";
import { newSectionId } from "@/lib/sections/ids";

export function seedDatabaseIfEmpty(db: Database.Database): void {
  const row = db.prepare(`SELECT COUNT(*) AS n FROM pages`).get() as { n: number };
  if (row.n > 0) return;

  insertPage(db, {
    id: "seed-pilot-coaches",
    name: "Pilot · Coach grid",
    slug: "pilot-coaches",
    theme: "dark",
    sections: [
      {
        id: newSectionId(),
        type: "section-coach",
        props: defaultCoachSectionProps(),
      },
    ],
  });

  db.prepare(
    `UPDATE pages SET status = 'published', updated_at = @updated_at WHERE id = 'seed-pilot-coaches'`,
  ).run({ updated_at: new Date().toISOString() });

  insertPage(db, {
    id: "seed-retainer-draft",
    name: "Retainer (draft sample)",
    slug: "retainer-offer",
    theme: "dark",
    sections: [
      {
        id: newSectionId(),
        type: "section-coach",
        props: defaultCoachSectionProps(),
      },
    ],
  });
}
