# DevLink smoke test notes

## Status

- **Components:** `npx webflow devlink export` exports React components (e.g. `sections2/SectionCoach.tsx`) with correct markup and props.
- **CSS gap:** `webflow/css/global.css` only imports `fonts.css`, `normalize.css`, and `defaults.css`. It does **not** include STNDRD site classes (`.coach-grid`, `.section_coach`, `.heading-style-h1-4`, etc.).
- **`body.offer`:** Wrapping the section in `className="offer"` does not fix layout if those class rules are missing from the page.

## Interim (this repo)

`app/layout.tsx` loads the **published** Webflow shared stylesheet (same URL as on [stndrdcoach.com](https://www.stndrdcoach.com/protocol)) so `/coach-test` can match Designer fidelity while export CSS is incomplete.

Update the URL in `lib/webflow-published-css.ts` after a site republish if the hash changes.

## Production Page Studio (target)

- DevLink `global.css` (or its imports) must include class rules for exported components, **or**
- Pin a versioned site CSS artifact as part of deploy when operator publishes Webflow.
- Section layout should not depend on page `body` classes; scope styles on the component root.

## Export config (`webflow.json`)

- Component group folder: `sections2` (not `sections`).
- If export reports **0 components**, widen filters: `"components": ".*"`, `"componentGroups": "sections2"`.
- Prefer `"cssScopes": true` and re-export after changing.

## Page Studio app (this repo)

- **UI:** Design handoff v3 **`PageStudio`** (`handoff/components/PageStudio.jsx`) — dashboard, create dialog, editor toolbar, section picker, review/publish flows from `design_handoff_stndrd_page_studio 3/screens`.
- **Tokens/CSS:** `handoff/tokens/tokens.css`, `handoff/components/page-studio.css`.
- **Canvas:** Handoff `Section.jsx` for library types (hero-split, FAQ, etc.); **DevLink** sections render via `StudioSectionBridge.tsx` + `PageRenderer`. **Registered sections:** `section-coach` only for now — add more in `lib/sections/registry.ts` when ready. **Mobile** toolbar mode uses a **390px iframe** (`/editor/preview/frame`) so Webflow `@media` breakpoints match a real phone viewport; **Desktop** keeps the scaled 1280px inline canvas.
- **Fields:** DevLink sections use `lib/sections/registry.ts` + `SectionFieldEditor` in the Page Studio sidebar (`StudioRegistryFields.tsx`). Section picker lists registry types when `useRegistryPicker` is set on `PageStudio`. Images use `ImageField` with **Supabase Storage** upload (`uploadPageStudioImageAction`) or paste URL.
- **Image uploads:** Server action `lib/actions/upload-asset.ts` writes to bucket `SUPABASE_STORAGE_BUCKET` (default `page-studio-assets`) under `pages/{pageId}/{sectionId}/{uuid}.ext`. Requires `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`. Create the bucket in Supabase → Storage, mark **public** (or add a public read policy) so published pages can load images.
- **Page data:** Supabase Postgres via `lib/pages/store.ts` (service role on the server). Run `supabase/migrations/001_pages.sql` once in the Supabase SQL editor.
- **Save:** Editor syncs via `syncHandoffPagesAction`.
- **Routes:** `/editor`, `/editor/[pageId]`.
- **Public:** `/[slug]` — published pages only (DevLink renderer).
- **Deploy:** Copy `.env.example` → `.env.local`. On Vercel ( **Production** scope): `SITE_URL`, `SUPABASE_URL` (base URL, no `/rest/v1`), `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_STORAGE_BUCKET`. **Redeploy** after changing env. Smoke test: `GET /api/health/db` → `{ "ok": true }`.

## Known export warning

- `HeroVertical`: unsupported Lightbox Wrapper — fix in Designer or exclude from library.
