"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { useEditorRole } from "@/components/studio/EditorRoleContext";

export function AppShell({
  sidebar,
  topbar,
  children,
}: {
  sidebar: ReactNode;
  topbar?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="studio-shell">
      {sidebar}
      <div className="studio-main">
        {topbar}
        <div className="studio-scroll">{children}</div>
      </div>
    </div>
  );
}

export function StudioSidebar() {
  const { role, setRole } = useEditorRole();

  return (
    <aside className="studio-sidebar">
      <div className="studio-brand">
        <div className="studio-brand-mark">S</div>
        <div>
          <div className="studio-brand-title">STNDRD</div>
          <div className="studio-brand-sub">Page Studio</div>
        </div>
      </div>
      <nav className="studio-nav">
        <Link href="/editor" className="studio-nav-item studio-nav-item-active">
          Pages
        </Link>
      </nav>
      <div className="studio-sidebar-card">
        <div className="studio-sidebar-card-label">STNDRD workspace</div>
        <p className="studio-sidebar-card-text">
          Pages publish on your Vercel URL until Cloudflare routes www slugs.
        </p>
      </div>
      <div className="studio-sidebar-footer">
        <div className="studio-role-toggle">
          <button
            type="button"
            className={role === "marketer" ? "studio-role-btn studio-role-btn-on" : "studio-role-btn"}
            onClick={() => setRole("marketer")}
          >
            Marketer
          </button>
          <button
            type="button"
            className={role === "operator" ? "studio-role-btn studio-role-btn-on" : "studio-role-btn"}
            onClick={() => setRole("operator")}
          >
            Operator
          </button>
        </div>
        <div className="studio-user">
          <div className="studio-user-avatar">YO</div>
          <div>
            <div className="studio-user-name">You</div>
            <div className="studio-user-org">STNDRD Coach</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function StudioTopBar({
  title,
  actions,
}: {
  title: string;
  actions?: ReactNode;
}) {
  const { role } = useEditorRole();
  return (
    <header className="studio-topbar">
      <div className="studio-topbar-titles">
        <h1 className="studio-topbar-title">{title}</h1>
        <p className="studio-topbar-sub">STNDRD Coach / {role === "operator" ? "Operator" : "Marketer"}</p>
      </div>
      {actions && <div className="studio-topbar-actions">{actions}</div>}
    </header>
  );
}
