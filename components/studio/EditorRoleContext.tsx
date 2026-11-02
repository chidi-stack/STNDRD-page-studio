"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type EditorRole = "marketer" | "operator";

const EditorRoleContext = createContext<{
  role: EditorRole;
  setRole: (role: EditorRole) => void;
} | null>(null);

export function EditorRoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<EditorRole>("marketer");
  return (
    <EditorRoleContext.Provider value={{ role, setRole }}>
      {children}
    </EditorRoleContext.Provider>
  );
}

export function useEditorRole() {
  const ctx = useContext(EditorRoleContext);
  if (!ctx) {
    throw new Error("useEditorRole must be used within EditorRoleProvider");
  }
  return ctx;
}
