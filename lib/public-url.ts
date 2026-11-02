function serverSiteOrigin(): string {
  const fromEnv =
    process.env.SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

/** Base URL for published page links (server render and SSR). */
export function getPublicSiteOrigin(): string {
  return serverSiteOrigin();
}

/** Absolute public URL for a slug (works in Server Components and client). */
export function publicPageUrl(slug: string): string {
  const path = `/${slug.replace(/^\//, "")}`;
  if (typeof window !== "undefined") {
    return `${window.location.origin}${path}`;
  }
  return `${serverSiteOrigin()}${path}`;
}
