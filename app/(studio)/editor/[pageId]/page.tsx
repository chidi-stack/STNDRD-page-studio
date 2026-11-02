import { notFound } from "next/navigation";

import { PageStudioApp } from "@/components/studio/PageStudioApp";
import { dbPagesToHandoff } from "@/lib/handoff/map-pages";
import { getPageById, listAllPages } from "@/lib/pages/store";

type Props = { params: Promise<{ pageId: string }> };

export const dynamic = "force-dynamic";

export default async function EditorPageRoute({ params }: Props) {
  const { pageId } = await params;
  if (!(await getPageById(pageId))) notFound();
  const pages = dbPagesToHandoff(await listAllPages());
  return <PageStudioApp initialPages={pages} pageId={pageId} />;
}
