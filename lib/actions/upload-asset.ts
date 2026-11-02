"use server";

import { createSupabaseAdmin, getStorageBucketName } from "@/lib/supabase/admin";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export type UploadImageResult =
  | { ok: true; url: string; path: string }
  | { ok: false; error: string };

function sanitizeSegment(raw: string, fallback: string): string {
  const s = raw.replace(/[^a-zA-Z0-9-_]/g, "-").replace(/-+/g, "-");
  return s.slice(0, 64) || fallback;
}

export async function uploadPageStudioImageAction(
  formData: FormData,
): Promise<UploadImageResult> {
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { ok: false, error: "No file provided." };
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return {
      ok: false,
      error: "Use JPEG, PNG, WebP, or GIF.",
    };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: "Image must be 10 MB or smaller." };
  }

  const pageId = sanitizeSegment(String(formData.get("pageId") ?? ""), "draft");
  const sectionId = sanitizeSegment(
    String(formData.get("sectionId") ?? ""),
    "section",
  );
  const ext =
    EXT_BY_TYPE[file.type] ||
    file.name.split(".").pop()?.toLowerCase() ||
    "jpg";
  const path = `pages/${pageId}/${sectionId}/${crypto.randomUUID()}.${ext}`;

  try {
    const supabase = createSupabaseAdmin();
    const bucket = getStorageBucketName();
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage.from(bucket).upload(path, buffer, {
      contentType: file.type,
      upsert: false,
      cacheControl: "31536000",
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    if (!data.publicUrl) {
      return { ok: false, error: "Upload succeeded but public URL is missing." };
    }

    return { ok: true, url: data.publicUrl, path };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload failed.";
    return { ok: false, error: message };
  }
}
