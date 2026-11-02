"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";

import { EditorPreviewPane } from "@/components/editor/EditorPreviewPane";
import { SectionFieldEditor } from "@/components/editor/SectionFieldEditor";
import { SectionLibraryModal } from "@/components/editor/SectionLibraryModal";
import { StudioTopBar } from "@/components/studio/AppShell";
import { useEditorRole } from "@/components/studio/EditorRoleContext";
import { Button, StatusPill } from "@/components/studio/StudioUI";
import {
  savePageAction,
  setPageStatusAction,
} from "@/lib/actions/pages";
import { getSectionDef } from "@/lib/sections/registry";
import { newSectionId } from "@/lib/sections/ids";
import { publicPageUrl } from "@/lib/public-url";
import { validatePageSections } from "@/lib/validation/sections";
import type {
  CtaConfig,
  PageRecord,
  PageSection,
  PageTheme,
} from "@/lib/types/page";

type Snapshot = {
  name: string;
  slug: string;
  theme: PageTheme;
  sections: PageSection[];
  cta: CtaConfig;
};

type Props = { initialPage: PageRecord };

function cloneSnapshot(s: Snapshot): Snapshot {
  return JSON.parse(JSON.stringify(s)) as Snapshot;
}

export function PageEditor({ initialPage }: Props) {
  const router = useRouter();
  const { role } = useEditorRole();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationIssues, setValidationIssues] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [libraryMode, setLibraryMode] = useState<"add" | "replace">("add");
  const [replaceSectionId, setReplaceSectionId] = useState<string | null>(null);

  const [name, setName] = useState(initialPage.name);
  const [slug, setSlug] = useState(initialPage.slug);
  const [theme, setTheme] = useState<PageTheme>(initialPage.theme);
  const [sections, setSections] = useState<PageSection[]>(initialPage.sections);
  const [cta, setCta] = useState<CtaConfig>(initialPage.cta);
  const [status, setStatus] = useState(initialPage.status);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    initialPage.sections[0]?.id ?? null,
  );

  const undoStack = useRef<Snapshot[]>([]);
  const [canUndo, setCanUndo] = useState(false);

  const readOnly =
    status === "in_review" && role === "marketer";

  const activeSection = useMemo(
    () => sections.find((s) => s.id === activeSectionId) ?? sections[0],
    [sections, activeSectionId],
  );

  const liveUrl =
    status === "published" ? publicPageUrl(slug) : null;

  const pushUndo = useCallback(() => {
    undoStack.current.push(
      cloneSnapshot({ name, slug, theme, sections, cta }),
    );
    if (undoStack.current.length > 40) {
      undoStack.current.shift();
    }
    setCanUndo(true);
  }, [name, slug, theme, sections, cta]);

  function undo() {
    const prev = undoStack.current.pop();
    if (!prev) return;
    setName(prev.name);
    setSlug(prev.slug);
    setTheme(prev.theme);
    setSections(prev.sections);
    setCta(prev.cta);
    setCanUndo(undoStack.current.length > 0);
    setMessage("Undid last change.");
  }

  function openLibrary(mode: "add" | "replace", sectionId?: string) {
    setLibraryMode(mode);
    setReplaceSectionId(sectionId ?? null);
    setLibraryOpen(true);
  }

  function applySectionType(type: string) {
    const def = getSectionDef(type);
    if (!def) return;
    pushUndo();
    if (libraryMode === "replace" && replaceSectionId) {
      setSections((prev) =>
        prev.map((s) =>
          s.id === replaceSectionId
            ? { ...s, type: def.type, props: def.defaultProps() }
            : s,
        ),
      );
    } else {
      const section: PageSection = {
        id: newSectionId(),
        type: def.type,
        props: def.defaultProps(),
      };
      setSections((prev) => [...prev, section]);
      setActiveSectionId(section.id);
    }
  }

  function save() {
    setError(null);
    setMessage(null);
    setValidationIssues([]);
    startTransition(async () => {
      const result = await savePageAction({
        id: initialPage.id,
        name,
        slug,
        theme,
        sections,
        cta,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setMessage("Saved.");
      router.refresh();
    });
  }

  function tryPublish() {
    const issues = validatePageSections(sections);
    if (issues.length > 0) {
      setValidationIssues(issues.map((i) => `${i.sectionName}: ${i.text}`));
      setError("Fix validation errors before publishing.");
      return;
    }
    setValidationIssues([]);
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const saved = await savePageAction({
        id: initialPage.id,
        name,
        slug,
        theme,
        sections,
        cta,
      });
      if (!saved.ok) {
        setError(saved.error);
        return;
      }
      const pub = await setPageStatusAction({
        id: initialPage.id,
        status: "published",
      });
      if (!pub.ok) {
        setError(pub.error);
        return;
      }
      setStatus("published");
      setMessage("Published.");
      router.refresh();
    });
  }

  function requestReview() {
    const issues = validatePageSections(sections);
    if (issues.length > 0) {
      setValidationIssues(issues.map((i) => `${i.sectionName}: ${i.text}`));
      setError("Fix validation errors before requesting review.");
      return;
    }
    setValidationIssues([]);
    startTransition(async () => {
      const saved = await savePageAction({
        id: initialPage.id,
        name,
        slug,
        theme,
        sections,
        cta,
      });
      if (!saved.ok) {
        setError(saved.error);
        return;
      }
      const rev = await setPageStatusAction({
        id: initialPage.id,
        status: "in_review",
      });
      if (!rev.ok) {
        setError(rev.error);
        return;
      }
      setStatus("in_review");
      setMessage("Sent to operator for review.");
      router.refresh();
    });
  }

  function unpublish() {
    startTransition(async () => {
      const result = await setPageStatusAction({
        id: initialPage.id,
        status: "unpublished",
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setStatus("unpublished");
      setMessage("Unpublished (public URL returns 404).");
      router.refresh();
    });
  }

  function removeSection(id: string) {
    pushUndo();
    setSections((prev) => prev.filter((s) => s.id !== id));
    if (activeSectionId === id) {
      setActiveSectionId(sections.find((s) => s.id !== id)?.id ?? null);
    }
  }

  function duplicateSection(id: string) {
    const source = sections.find((s) => s.id === id);
    if (!source) return;
    pushUndo();
    const copy: PageSection = {
      id: newSectionId(),
      type: source.type,
      props: JSON.parse(JSON.stringify(source.props)),
    };
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });
    setActiveSectionId(copy.id);
  }

  function moveSection(id: string, dir: -1 | 1) {
    pushUndo();
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx < 0) return prev;
      const next = idx + dir;
      if (next < 0 || next >= prev.length) return prev;
      const copy = [...prev];
      const [item] = copy.splice(idx, 1);
      copy.splice(next, 0, item);
      return copy;
    });
  }

  const topActions = (
    <>
      <Button variant="ghost" disabled={readOnly || !canUndo} onClick={undo}>
        Undo
      </Button>
      <Button variant="secondary" disabled={pending || readOnly} onClick={save}>
        Save
      </Button>
      {role === "operator" ? (
        status === "published" ? (
          <Button variant="secondary" disabled={pending} onClick={unpublish}>
            Unpublish
          </Button>
        ) : (
          <Button variant="primary" disabled={pending || readOnly} onClick={tryPublish}>
            Publish
          </Button>
        )
      ) : (
        status !== "in_review" &&
        status !== "published" && (
          <Button variant="primary" disabled={pending || readOnly} onClick={requestReview}>
            Request review
          </Button>
        )
      )}
    </>
  );

  return (
    <>
      <StudioTopBar title={name || "Untitled"} actions={topActions} />
      <div className="studio-content">
        {readOnly && (
          <p className="studio-panel studio-muted" style={{ marginBottom: 16 }}>
            This page is in review. Switch to Operator role to edit or publish.
          </p>
        )}

        <section className="studio-panel">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <StatusPill status={status} />
            {liveUrl && (
              <a href={liveUrl} className="studio-page-url" target="_blank" rel="noreferrer">
                {liveUrl}
              </a>
            )}
            <Link href="/editor" className="studio-muted">
              ← All pages
            </Link>
          </div>
          <h2 className="studio-panel-title">Page settings</h2>
          <div className="studio-form">
            <div className="studio-field">
              <label htmlFor="edit-name">Name</label>
              <input
                id="edit-name"
                className="studio-input"
                disabled={readOnly}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="studio-field">
              <label htmlFor="edit-slug">Direct slug</label>
              <input
                id="edit-slug"
                className="studio-input"
                disabled={readOnly || status === "published"}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div className="studio-field" style={{ maxWidth: 140, flex: "none" }}>
              <label htmlFor="edit-theme">Theme</label>
              <select
                id="edit-theme"
                className="studio-input"
                disabled={readOnly}
                value={theme}
                onChange={(e) => setTheme(e.target.value as PageTheme)}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
          </div>
          <div className="studio-form" style={{ marginTop: 12 }}>
            <div className="studio-field">
              <label htmlFor="cta-url">Page CTA URL (external)</label>
              <input
                id="cta-url"
                className="studio-input"
                disabled={readOnly}
                value={cta.externalUrl ?? ""}
                onChange={(e) =>
                  setCta({ mode: "external", externalUrl: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        <div className="studio-editor-grid">
          <section className="studio-panel">
            <h2 className="studio-panel-title">Sections</h2>
            {!readOnly && (
              <Button variant="primary" onClick={() => openLibrary("add")}>
                Browse library
              </Button>
            )}
            <ul className="studio-section-list">
              {sections.map((section, index) => {
                const def = getSectionDef(section.type);
                return (
                  <li
                    key={section.id}
                    className={
                      activeSection?.id === section.id
                        ? "studio-section-item studio-section-item-active"
                        : "studio-section-item"
                    }
                    onClick={() => setActiveSectionId(section.id)}
                  >
                    <strong>{def?.name ?? section.type}</strong>
                    {!readOnly && (
                      <div
                        className="studio-section-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="secondary"
                          disabled={index === 0}
                          onClick={() => moveSection(section.id, -1)}
                        >
                          Up
                        </Button>
                        <Button
                          variant="secondary"
                          disabled={index === sections.length - 1}
                          onClick={() => moveSection(section.id, 1)}
                        >
                          Down
                        </Button>
                        <Button variant="secondary" onClick={() => duplicateSection(section.id)}>
                          Duplicate
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => openLibrary("replace", section.id)}
                        >
                          Replace
                        </Button>
                        <Button variant="secondary" onClick={() => removeSection(section.id)}>
                          Remove
                        </Button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            {activeSection && (
              <>
                <h3 className="studio-panel-title">Fields</h3>
                <SectionFieldEditor
                  section={activeSection}
                  readOnly={readOnly}
                  onChange={(next) =>
                    setSections((prev) =>
                      prev.map((s) => (s.id === next.id ? next : s)),
                    )
                  }
                />
              </>
            )}
          </section>

          <section className="studio-panel">
            <h2 className="studio-panel-title">Preview</h2>
            <div className="studio-preview-toolbar">
              <button
                type="button"
                className={
                  previewMode === "desktop"
                    ? "studio-preview-toggle studio-preview-toggle-on"
                    : "studio-preview-toggle"
                }
                onClick={() => setPreviewMode("desktop")}
              >
                Desktop
              </button>
              <button
                type="button"
                className={
                  previewMode === "mobile"
                    ? "studio-preview-toggle studio-preview-toggle-on"
                    : "studio-preview-toggle"
                }
                onClick={() => setPreviewMode("mobile")}
              >
                Mobile
              </button>
            </div>
            <EditorPreviewPane
              sections={sections}
              theme={theme}
              previewMode={previewMode}
            />
          </section>
        </div>

        {message && <p className="studio-muted">{message}</p>}
        {error && <p className="studio-error">{error}</p>}
        {validationIssues.length > 0 && (
          <ul className="studio-validation-list">
            {validationIssues.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </div>

      <SectionLibraryModal
        open={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onSelect={applySectionType}
        title={libraryMode === "replace" ? "Replace section" : "Add section"}
      />
    </>
  );
}
