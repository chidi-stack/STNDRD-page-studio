import "server-only";

/** Which env keys are present (for logs only — never log values). */
export function supabaseEnvPresence(): Record<string, boolean> {
  return {
    SUPABASE_URL: Boolean(process.env.SUPABASE_URL?.trim()),
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()),
  };
}

export function resolveSupabaseProjectUrl(): string {
  const raw =
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return "";
  return raw.replace(/\/rest\/v1\/?$/i, "").replace(/\/$/, "");
}

export function resolveSupabaseServiceRoleKey(): string {
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";
}

export function assertSupabaseServerConfig(): { url: string; serviceRoleKey: string } {
  const url = resolveSupabaseProjectUrl();
  const serviceRoleKey = resolveSupabaseServiceRoleKey();
  if (!url || !serviceRoleKey) {
    console.error("[supabase] missing server env", supabaseEnvPresence());
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on Vercel (Production), then redeploy. See .env.example.",
    );
  }
  return { url, serviceRoleKey };
}
