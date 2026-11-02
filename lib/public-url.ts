/** Base URL for published page links (Vercel or local). */
export function getPublicSiteOrigin(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export function publicPageUrl(slug: string): string {
  return `${getPublicSiteOrigin()}/${slug}`;
}
