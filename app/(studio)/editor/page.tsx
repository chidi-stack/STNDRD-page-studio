import { PageStudioApp } from "@/components/studio/PageStudioApp";
import { getDb } from "@/lib/db";
import { listAllPages } from "@/lib/db/pages";
import { dbPagesToHandoff } from "@/lib/handoff/map-pages";

export const dynamic = "force-dynamic";

export default function EditorDashboardPage() {
  const pages = dbPagesToHandoff(listAllPages(getDb()));
  return <PageStudioApp initialPages={pages} />;
}
