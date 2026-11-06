"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { CreatePageForm } from "@/components/editor/CreatePageForm";
import { PageListRow } from "@/components/studio/PageListRow";
import { StudioTopBar } from "@/components/studio/AppShell";
import { duplicatePageAction } from "@/lib/actions/pages";
import type { PageSummary } from "@/lib/types/page";

export function EditorDashboard({ pages }: { pages: PageSummary[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [dupId, setDupId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function duplicate(id: string) {
    setError(null);
    setDupId(id);
    startTransition(async () => {
      const result = await duplicatePageAction(id);
      setDupId(null);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push(`/editor/${result.newId}`);
    });
  }

  return (
    <>
      <StudioTopBar title="Landing pages" />
      <div className="studio-content">
        <section className="studio-panel">
          <h2 className="studio-panel-title">Create landing page</h2>
          <p className="studio-muted studio-panel-lead">
            Starts with the coaching landing template: nav through proof, CTA, and footer.
          </p>
          <CreatePageForm />
        </section>

        <section className="studio-panel">
          <h2 className="studio-panel-title">All pages</h2>
          {pages.length === 0 ? (
            <p className="studio-muted">No pages yet.</p>
          ) : (
            <div className="studio-page-list">
              {pages.map((page) => (
                <PageListRow
                  key={page.id}
                  page={page}
                  onDuplicate={() => duplicate(page.id)}
                  duplicating={pending && dupId === page.id}
                />
              ))}
            </div>
          )}
        </section>
        {error && <p className="studio-error">{error}</p>}
      </div>
    </>
  );
}
