import { PageStudioApp } from "@/components/studio/PageStudioApp";
import { getDb } from "@/lib/db";
import { getPageById, listAllPages } from "@/lib/db/pages";
import { dbPagesToHandoff } from "@/lib/handoff/map-pages";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ pageId: string }> };

export const dynamic = "force-dynamic";

export default async function EditorPageRoute({ params }: Props) {
  const { pageId } = await params;
  const db = getDb();
  if (!getPageById(db, pageId)) notFound();
  const pages = dbPagesToHandoff(listAllPages(db));
  return <PageStudioApp initialPages={pages} pageId={pageId} />;
}
