import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageRenderer } from "@/components/PageRenderer";
import { getPublishedPageBySlug } from "@/lib/pages/store";
import { RESERVED_SLUGS } from "@/lib/slug";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if ((RESERVED_SLUGS as readonly string[]).includes(slug)) {
    return { title: "Not found" };
  }
  const page = await getPublishedPageBySlug(slug);
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
  const page = await getPublishedPageBySlug(slug);
  if (!page) {
    notFound();
  }
  return <PageRenderer sections={page.sections} theme={page.theme} />;
}
