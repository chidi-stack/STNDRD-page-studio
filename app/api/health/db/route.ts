import { createSupabaseAdmin } from "@/lib/supabase/admin";
import {
  resolveSupabaseProjectUrl,
  resolveSupabaseServiceRoleKey,
  supabaseEnvPresence,
} from "@/lib/supabase/resolve-env";

export const dynamic = "force-dynamic";

/** Quick Supabase connectivity check (no secrets in response). */
export async function GET() {
  const url = resolveSupabaseProjectUrl();
  const key = resolveSupabaseServiceRoleKey();
  if (!url || !key) {
    return Response.json(
      {
        ok: false,
        stage: "config",
        env: supabaseEnvPresence(),
        hint: "Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY for Production on Vercel, then redeploy.",
      },
      { status: 503 },
    );
  }

  try {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from("pages").select("id").limit(1);
    if (error) {
      return Response.json(
        {
          ok: false,
          stage: "query",
          message: error.message,
          code: error.code,
        },
        { status: 503 },
      );
    }
    return Response.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return Response.json({ ok: false, stage: "exception", message }, { status: 503 });
  }
}
