"use client";

import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";

import PageStudio from "@/handoff/components/PageStudio.jsx";
import { syncHandoffPagesAction } from "@/lib/actions/handoff-pages";
import { createPageAction } from "@/lib/actions/pages";
import type { HandoffPage } from "@/lib/handoff/map-pages";
import type { PageTheme } from "@/lib/types/page";

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

  const onCreatePage = useCallback(
    (input: { name: string; slug: string; theme: PageTheme }) =>
      createPageAction(input),
    [],
  );

  return (
    <PageStudio
      embedded={false}
      start="dashboard"
      initialPages={initialPages}
      pageId={pageId}
      onOpenPage={onOpenPage}
      onPersistPages={onPersistPages}
      onCreatePage={onCreatePage}
      useRegistryPicker
    />
  );
}
