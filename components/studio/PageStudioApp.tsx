"use client";

import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";

import PageStudio from "@/handoff/components/PageStudio.jsx";
import { syncHandoffPagesAction } from "@/lib/actions/handoff-pages";
import type { HandoffPage } from "@/lib/handoff/map-pages";

type Props = {
  initialPages: HandoffPage[];
  pageId?: string;
};

export function PageStudioApp({ initialPages, pageId }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const onOpenPage = useCallback(
    (id: string) => {
      router.push(`/editor/${id}`);
    },
    [router],
  );

  const onPersistPages = useCallback((pages: HandoffPage[]) => {
    startTransition(async () => {
      await syncHandoffPagesAction(pages);
    });
  }, []);

  return (
    <PageStudio
      embedded={false}
      start="dashboard"
      initialPages={initialPages}
      pageId={pageId}
      onOpenPage={onOpenPage}
      onPersistPages={onPersistPages}
      useRegistryPicker
    />
  );
}
