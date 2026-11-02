import "server-only";

import fs from "fs";
import path from "path";

import Database from "better-sqlite3";

import { seedDatabaseIfEmpty } from "./seed";
import { pruneUnregisteredSections } from "./prune-sections";

const globalForDb = globalThis as unknown as { pageStudioDb?: Database.Database };

function dbPath(): string {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return path.join(dir, "page-studio.db");
}

function migrate(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS pages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      theme TEXT NOT NULL DEFAULT 'dark',
      status TEXT NOT NULL DEFAULT 'draft',
      sections TEXT NOT NULL DEFAULT '[]',
      cta TEXT NOT NULL DEFAULT '{"mode":"external","externalUrl":""}',
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS pages_status_idx ON pages(status);
    CREATE INDEX IF NOT EXISTS pages_slug_idx ON pages(slug);
  `);
}

export function getDb(): Database.Database {
  if (globalForDb.pageStudioDb) {
    return globalForDb.pageStudioDb;
  }
  const db = new Database(dbPath());
  db.pragma("journal_mode = WAL");
  migrate(db);
  seedDatabaseIfEmpty(db);
  pruneUnregisteredSections(db);
  globalForDb.pageStudioDb = db;
  return db;
}
