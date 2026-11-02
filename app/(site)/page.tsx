import Link from "next/link";

import { getDb } from "@/lib/db";
import { getPublishedPageBySlug } from "@/lib/db/pages";
import { publicPageUrl } from "@/lib/public-url";

/** SQLite reads — do not prerender at build time. */
export const dynamic = "force-dynamic";

export default function Home() {
  const db = getDb();
  const sample = getPublishedPageBySlug(db, "pilot-coaches");
  const sampleUrl = sample ? publicPageUrl(sample.slug) : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
        padding: "3rem 1.5rem",
        maxWidth: 640,
        margin: "0 auto",
      }}
    >
      <p
        style={{
          fontSize: "0.75rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#666",
        }}
      >
        STNDRD Page Studio
      </p>
      <h1 style={{ fontSize: "2rem", fontWeight: 650 }}>Dev app</h1>
      <p style={{ color: "#444", lineHeight: 1.6 }}>
        Local SQLite storage · public pages at{" "}
        <code style={{ background: "#f0f0eb", padding: "0.1rem 0.35rem" }}>
          /[slug]
        </code>{" "}
        · editor at{" "}
        <code style={{ background: "#f0f0eb", padding: "0.1rem 0.35rem" }}>
          /editor
        </code>
        .
      </p>
      <ul style={{ lineHeight: 2 }}>
        <li>
          <Link href="/editor">Open editor</Link>
        </li>
        {sampleUrl && (
          <li>
            <Link href="/pilot-coaches">Published sample · /pilot-coaches</Link>
          </li>
        )}
        <li>
          <Link href="/coach-test">DevLink smoke · /coach-test</Link>
        </li>
      </ul>
    </div>
  );
}
