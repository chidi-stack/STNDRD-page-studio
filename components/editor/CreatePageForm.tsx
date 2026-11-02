"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { createPageAction } from "@/lib/actions/pages";
import type { PageTheme } from "@/lib/types/page";
import { slugifyName } from "@/lib/slug";
import { Button } from "@/components/studio/StudioUI";

export function CreatePageForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [theme, setTheme] = useState<PageTheme>("dark");
  const [error, setError] = useState<string | null>(null);

  function onNameChange(value: string) {
    setName(value);
    if (!slugTouched) {
      setSlug(slugifyName(value));
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await createPageAction({ name, slug, theme });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push(`/editor/${result.id}`);
    });
  }

  return (
    <form className="studio-form" onSubmit={submit}>
      <div className="studio-field">
        <label htmlFor="page-name">Page name</label>
        <input
          id="page-name"
          className="studio-input"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Executive retainer"
          required
        />
      </div>
      <div className="studio-field">
        <label htmlFor="page-slug">Direct slug</label>
        <input
          id="page-slug"
          className="studio-input"
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          placeholder="executive-retainer"
          required
        />
      </div>
      <div className="studio-field" style={{ maxWidth: 140, flex: "none" }}>
        <label htmlFor="page-theme">Theme</label>
        <select
          id="page-theme"
          className="studio-input"
          value={theme}
          onChange={(e) => setTheme(e.target.value as PageTheme)}
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>
      <Button variant="dark" type="submit" disabled={pending}>
        {pending ? "Creating…" : "Create page"}
      </Button>
      {error && <p className="studio-error">{error}</p>}
    </form>
  );
}
