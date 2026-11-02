/** Reserved paths — keep in sync with product-boundaries / sectionLibrary.js */
export const RESERVED_SLUGS = [
  "admin",
  "api",
  "editor",
  "studio",
  "login",
  "assets",
  "static",
  "_next",
  "robots.txt",
  "sitemap.xml",
  "favicon.ico",
  "coach-test",
] as const;

/** Webflow collision slugs — sync with design handoff webflow-slugs.csv */
export const WEBFLOW_SLUGS = [
  "90-day-protocol",
  "checkout",
  "cbum",
  "downsell",
  "ehc",
  "health",
  "jking",
  "join",
  "new-pre-call",
  "new-vsl",
  "offer",
  "old-pre-call",
  "order-confirmation",
  "pain",
  "pain-pre-call",
  "paypal-checkout",
  "pre-call",
  "privacy-policy",
  "protocol",
  "resources",
  "submission",
  "submission-s",
  "terms-conditions",
  "untitled",
  "vsl",
  "vsl-for-collective",
  "vsl-s",
  "watch-this-video",
  "webinar",
] as const;

export function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function validateSlug(
  slug: string,
  options: { existingSlug?: string; usedSlugs: string[] },
): string | null {
  if (!slug) return "Enter a slug.";
  if (/\//.test(slug)) return "Use one path segment. Slashes aren't allowed.";
  if (/%/.test(slug)) return "Encoded characters aren't allowed.";
  if (/\./.test(slug)) return "Dots aren't allowed.";
  if (/[A-Z]/.test(slug)) return "Use lowercase letters only.";
  if (/\s/.test(slug)) return "Use hyphens instead of spaces.";
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    return "Use letters, numbers and single hyphens, with no hyphen at either end.";
  }
  if ((RESERVED_SLUGS as readonly string[]).includes(slug)) {
    return `/${slug} is reserved by the system.`;
  }
  if ((WEBFLOW_SLUGS as readonly string[]).includes(slug)) {
    return `/${slug} is an existing Webflow page.`;
  }
  if (
    options.usedSlugs.some(
      (s) => s === slug && s !== options.existingSlug,
    )
  ) {
    return `/${slug} is already used by another page.`;
  }
  return null;
}
