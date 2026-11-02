import "server-only";

import { createClient } from "@supabase/supabase-js";

import {
  assertSupabaseServerConfig,
  resolveSupabaseProjectUrl,
} from "./resolve-env";

/** @deprecated use resolveSupabaseProjectUrl */
export function getSupabaseProjectUrl(): string {
  return resolveSupabaseProjectUrl();
}

export function createSupabaseAdmin() {
  const { url, serviceRoleKey } = assertSupabaseServerConfig();
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function getStorageBucketName(): string {
  return process.env.SUPABASE_STORAGE_BUCKET?.trim() || "page-studio-assets";
}
