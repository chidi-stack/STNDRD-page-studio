import { PageStudioApp } from "@/components/studio/PageStudioApp";
import { dbPagesToHandoff } from "@/lib/handoff/map-pages";
import { listAllPages } from "@/lib/pages/store";

export const dynamic = "force-dynamic";

export default async function EditorDashboardPage() {
  const pages = dbPagesToHandoff(await listAllPages());
  return <PageStudioApp initialPages={pages} />;
}
