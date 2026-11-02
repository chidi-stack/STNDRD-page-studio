"use client";

import Link from "next/link";

import { Button, Card, StatusPill } from "@/components/studio/StudioUI";
import { publicPageUrl } from "@/lib/public-url";
import type { PageSummary } from "@/lib/types/page";

export function PageListRow({
  page,
  onDuplicate,
  duplicating,
}: {
  page: PageSummary;
  onDuplicate: () => void;
  duplicating?: boolean;
}) {
  const dark = page.theme === "dark";
  const live = page.status === "published";
  const url = publicPageUrl(page.slug);

  return (
    <Card className="studio-page-row">
      <Link
        href={`/editor/${page.id}`}
        className="studio-page-thumb"
        style={{
          background: dark ? "#0b0b0b" : "#fff",
        }}
        aria-label={`Open ${page.name}`}
      />
      <div className="studio-page-row-body">
        <div className="studio-page-row-title-line">
          <Link href={`/editor/${page.id}`} className="studio-page-row-title">
            {page.name}
          </Link>
          <StatusPill status={page.status} />
        </div>
        {live ? (
          <a href={url} className="studio-page-url" target="_blank" rel="noreferrer">
            {url.replace(/^https?:\/\//, "")}
          </a>
        ) : (
          <span className="studio-page-url studio-page-url-muted">
            /{page.slug}
          </span>
        )}
        <span className="studio-page-meta">
          Updated {new Date(page.updatedAt).toLocaleString("en-GB")} ·{" "}
          {dark ? "Dark" : "Light"} theme
        </span>
      </div>
      <div className="studio-page-row-actions">
        <Link href={`/editor/${page.id}`}>
          <Button variant="secondary">Edit</Button>
        </Link>
        <Button variant="secondary" disabled={duplicating} onClick={onDuplicate}>
          Duplicate
        </Button>
      </div>
    </Card>
  );
}
