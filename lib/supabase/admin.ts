import "server-only";

import { createClient } from "@supabase/supabase-js";

/** Project URL only — strip accidental `/rest/v1` suffix from dashboard copy-paste. */
export function getSupabaseProjectUrl(): string {
  const raw =
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return "";
  return raw.replace(/\/rest\/v1\/?$/i, "").replace(/\/$/, "");
}

export function createSupabaseAdmin() {
  const url = getSupabaseProjectUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. See .env.example.",
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function getStorageBucketName(): string {
  return process.env.SUPABASE_STORAGE_BUCKET?.trim() || "page-studio-assets";
}
