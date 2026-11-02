import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageRenderer } from "@/components/PageRenderer";
import { getDb } from "@/lib/db";
import { getPublishedPageBySlug } from "@/lib/db/pages";
import { RESERVED_SLUGS } from "@/lib/slug";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if ((RESERVED_SLUGS as readonly string[]).includes(slug)) {
    return { title: "Not found" };
  }
  const db = getDb();
  const page = getPublishedPageBySlug(db, slug);
  if (!page) return { title: "Not found" };
  return {
    title: page.name,
    description: `${page.name} · STNDRD Page Studio`,
  };
}

export default async function PublicLandingPage({ params }: Props) {
  const { slug } = await params;
  if ((RESERVED_SLUGS as readonly string[]).includes(slug)) {
    notFound();
  }
  const db = getDb();
  const page = getPublishedPageBySlug(db, slug);
  if (!page) {
    notFound();
  }
  return <PageRenderer sections={page.sections} theme={page.theme} />;
}
