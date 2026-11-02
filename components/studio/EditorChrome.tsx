"use client";

import { EditorRoleProvider } from "@/components/studio/EditorRoleContext";
import { AppShell, StudioSidebar } from "@/components/studio/AppShell";

export function EditorChrome({ children }: { children: React.ReactNode }) {
  return (
    <EditorRoleProvider>
      <AppShell sidebar={<StudioSidebar />}>{children}</AppShell>
    </EditorRoleProvider>
  );
}
