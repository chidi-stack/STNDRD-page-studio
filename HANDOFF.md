# STNDRD Page Studio — engineering handoff

**Updated:** 6 November 2026  
**Repo:** [chidi-stack/STNDRD-page-studio](https://github.com/chidi-stack/STNDRD-page-studio) (`main`)  
**App root:** this directory (`stndrd-devlink-smoke`)

A marketer builds a landing page from Webflow sections, edits declared fields, previews desktop and mobile, and asks for review. An operator publishes it at `/[slug]` on the STNDRD domain, next to the existing Webflow site.

Product rules that override the older PRD: `product-boundaries.md` in the design handoff (`design_handoff_stndrd_page_studio`). The PRD is `stndrd-page-studio-prd.md` in that same folder. This file is the code status. `DEVLINK.md` covers the CSS export gap.

## Where we are

Roughly **late M1 / early M2** of the PRD delivery sequence. The coaching landing can be created, edited, saved, and rendered. Auth, real revisions, operator publish, and domain routing are not done.

| Milestone | Status |
|---|---|
| M0 — DevLink export + one section rendering in Next.js | Done locally. Public CSS still comes from the live Webflow stylesheet, not a complete DevLink bundle. Domain split (Page Studio vs Webflow on one host) is not proven. |
| M1 — Builder: create, pick sections, edit fields, reorder, preview | Done for the registered coaching sections. |
| M2 — Persistence: auth, media, save/reload, revisions, undo | Save/reload and image upload work. Undo is in-memory only. Revisions and auth do not persist. |
| M3 — Full pilot library + review gates | Library is the coaching landing set below. Review UI still checks the old prototype section types, so Request review does not match DevLink pages. |
| M4 — Real publish, slug lock, 301s, cache, unpublish/restore | Status strings can be saved. There is no auth, no published snapshot, no edge router, no 301 history. |
| M5 — Five-page pilot | Not started. |

## Run it

```bash
cp .env.example .env.local
# fill SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
npm install
npm run dev
```

- Editor: [http://localhost:3000/editor](http://localhost:3000/editor)
- Public page (published rows only): `http://localhost:3000/[slug]`
- DB smoke: `GET /api/health/db` → `{ "ok": true }`
- DevLink smoke (hard-coded coach section): `/coach-test`

Run `supabase/migrations/001_pages.sql` once in the Supabase SQL editor. Create a **public** Storage bucket named `page-studio-assets` (or set `SUPABASE_STORAGE_BUCKET`).

Vercel production needs `SITE_URL`, `SUPABASE_URL` (origin only, no `/rest/v1`), `SUPABASE_SERVICE_ROLE_KEY`, and `SUPABASE_STORAGE_BUCKET`. Redeploy after changing them. `.env.local` is gitignored. Do not commit the service role key.

## How the app is wired

```
Webflow Designer
  → npx webflow devlink export   (webflow.json)
  → webflow/**/*.tsx              (generated — do not hand-edit)
  → lib/sections/registry.ts      (fields, defaults, prop mapping)
  → PageRenderer                  (editor canvas + public /[slug])

Editor UI
  → handoff/components/PageStudio.jsx   (design prototype, now the real shell)
  → components/studio/PageStudioApp.tsx (routes + Supabase sync)
  → lib/actions/handoff-pages.ts        (save)
  → lib/pages/supabase-store.ts         (Postgres, service role)
```

| Route | What it does |
|---|---|
| `/` | Dev index with links. |
| `/editor` | Pages dashboard. Loads every row from `pages`. |
| `/editor/[pageId]` | Same shell, opened on that page. |
| `/editor/preview/frame` | 390px iframe so Webflow `@media` rules match a phone. Desktop preview stays inline at 1280px. |
| `/[slug]` | Published pages only. Drafts and in-review return 404. |
| `/coach-test` | One-off DevLink render. Reserved slug. |
| `/api/health/db` | Supabase connectivity. |

`components/editor/PageEditor.tsx` and `EditorDashboard.tsx` are an earlier editor. Routes do not mount them. Leave them until the handoff shell fully replaces their behavior, then delete them.

The role switch in the sidebar is local React state (`EditorRoleContext`). Anyone can flip Marketer / Operator. It is not Supabase Auth.

## Data

Table `public.pages` (`supabase/migrations/001_pages.sql`):

- `id`, `name`, `slug` (unique), `theme` (`dark` \| `light`)
- `status`: `draft` \| `in_review` \| `published` \| `unpublished`
- `sections` jsonb: `{ id, type, props }[]`
- `cta` jsonb: `{ mode: "external" \| "typeform", externalUrl?, typeformLiveId? }`
- `updated_at`

There is **no revisions table**. `dbPageToHandoff` always sets `revisions: []`. Save in the UI appends a revision in memory and then `syncHandoffPagesAction` writes name, slug, theme, status, and sections. Reload drops the revision list, `liveRev`, `reviewRev`, and author. Undo/redo die with the tab.

New pages are inserted with `starterSections()` from `lib/sections/starter.ts` (the coaching landing stack) and a default external CTA of `https://www.stndrdcoach.com/apply`. The page-level CTA is stored and is not yet applied to section buttons. Each section still has its own link field.

Slug rules live in `lib/slug.ts`: one lowercase segment, reserved app paths, and a static copy of Webflow slugs. That list can go stale. There is no slug history and no 301 when a live slug changes.

## Section library (registered)

Add a section by exporting it from DevLink, then adding one entry to `lib/sections/registry.ts`. `SECTION_LIBRARY` drives the picker. `LANDING_TEMPLATE_TYPES` in `lib/sections/starter.ts` is the stack inserted for a new page.

| Type | Component | In new-page template |
|---|---|---|
| `nav-coaching-apply` | `NavCoachingApply` | yes |
| `nav-protocol` | `NavProtocol` | picker only |
| `nav-logo` | `NavbarLogoOnly` | picker only |
| `header-offer` | `HeaderOffer` | yes |
| `header-precall` | `HeaderPrecall` | picker only |
| `header-protocol` | `HeaderProtocol` | picker only |
| `section-executives` | `SectionExecutives` | yes |
| `section-creators` | `SectionCreators` | yes |
| `section-coach` | `SectionCoach` | yes |
| `section-cta` | `SectionCta` | yes |
| `footer-regular` | `FooterRegular` | yes |

Field types in the registry: `text`, `textarea`, `image`, `coach-grid`. Images upload through `uploadPageStudioImageAction` (JPEG, PNG, WebP, GIF, 10 MB) into `pages/{pageId}/{sectionId}/{uuid}.ext`. Wistia is a media id string; the registry builds the embed. Marketers must not get a raw HTML field.

`webflow.json` export filter:

```
SectionCoach|NavCoachingApply|NavProtocol|NavbarLogoOnly|HeaderOffer|HeaderPrecall|HeaderProtocol|SectionExecutives|SectionCreators(?!2)|SectionCta|FooterRegular
```

`SectionCreators(?!2)` keeps the duplicate `SectionCreators2` out of the export.

### Exported but not registered

These files are already under `webflow/sections2/` from an earlier, wider export. They are not in the picker until someone maps fields in the registry and adds them to the `webflow.json` filter:

`SectionFaq`, `SectionFaq2`, `SectionGuarantee`, `SectionGuarantee2`, `SectionFeatures`, `SectionFeatures2`, `SectionGet`, `SectionGet2`, `SectionContents`, `SectionContents2`, `SectionCase`, `SectionCase2`, `SectionAbout2`, `SectionPrograms`, `SectionPhases`, `SectionSystem`, `SectionSkim`, `SectionAccepted`, `SectionProtocolHeader`, `SectionProtocolWho`, `SectionTransformations`, `TransformationsGallery`, `LogoMarquee`, `HeroVertical`, `FeaturesGridSection`.

`HeroVertical` uses an unsupported Lightbox Wrapper (see `DEVLINK.md`). Skip it or fix it in Designer before registering it.

### How to add the next section

1. Build or update the component in Webflow. Props should be text, images, and structured ids (Wistia), not marketer-authored embed HTML.
2. Add the component name to `webflow.json` → `devlink-export.components`.
3. `npx webflow devlink export`. Do not hand-edit files under `webflow/` except to re-export.
4. Add a `SectionTypeDef` in `lib/sections/registry.ts`: `type`, fields, `defaultProps`, `toDevLinkProps`, `Component`.
5. If it belongs on the coaching landing, append the type to `LANDING_TEMPLATE_TYPES`.
6. If the review gate should require it, teach `PageStudio.checks()` the new type (see the bug below). Pin header/footer in `bounds()` the same way, using the DevLink type names.
7. Re-pin `lib/webflow-published-css.ts` if a Webflow republish changes the shared CSS hash. Check the `<link rel="stylesheet">` on [stndrdcoach.com/protocol](https://www.stndrdcoach.com/protocol).

## What is left

Do these in order. The first item blocks a real review flow.

### 1. Make review match DevLink sections

`PageStudio.checks()` still requires prototype types `header`, `final-cta`, and `footer` from the design `LIB`. A coaching page uses `header-offer`, `section-cta`, and `footer-regular`, so Request review reports missing structure. `bounds()` only pins a section whose type is exactly `header` or `footer`, so the real nav and footer can be reordered.

Point those checks at the registry types (or at categories: one nav, one header, one CTA, one footer). Skip the prototype `LIB` when `useRegistryPicker` is set. The app always sets that prop.

### 2. Persist revisions

PRD: save creates an immutable revision; publish points at one revision; editing a live page does not change what is public until republish.

Today a status change to `published` is just a column on the same row, and `/[slug]` reads that row’s current `sections`. Add a `revisions` table (or jsonb history) with author, timestamp, sections, and CTA. Add `published_revision_id`. Load history back into the handoff `revisions` array so the existing revisions dialog is real.

### 3. Auth and roles

Supabase Auth, invited users, two roles. Marketer: create, edit, duplicate, save, request review. Operator: review, publish, unpublish, restore, change a live slug. Remove the client-side role toggle once auth exists. Lock the editor while status is `in_review` for marketers. The shell already has this lock; it keys off the fake role.

### 4. Publishing for real

- Operator confirms claim fields before publish. The coaching registry has no `claim` fields yet. The prototype testimonial/metrics confirms are still in `PageStudio.jsx` `LIB` and are unused.
- Publish dialog steps should verify the live URL, not only animate.
- Unpublish keeps the slug reserved and returns 404. It must not fall through to Webflow later.
- Failed publish leaves the previous live revision up.
- Page CTA: one mode per page, external URL or Typeform live id. Wire it so section buttons do not each store their own destination, matching `product-boundaries.md` §6. Typeform modal is not built.
- Slug locks after first publish except for an operator change that writes a 301 from the old slug.

### 5. Domain routing (M0 still open)

Next.js on Vercel for `/editor` and published `/[slug]`. A Cloudflare Worker (or equivalent) sends Page Studio slugs to the app, everything else to Webflow, and unpublished Page Studio slugs to 404. Prove this on a test domain before any production DNS change. See PRD §9. Do not add a new Vercel project per slug.

### 6. CSS

`app/(site)/layout.tsx` and the editor layout load DevLink `webflow/css/global.css` plus the published Webflow shared CSS (`lib/webflow-published-css.ts`). Export CSS still omits site classes such as `.coach-grid`. Keep the published stylesheet until a DevLink export actually contains those rules, then drop the external URL so production does not depend on a Webflow republish hash.

### 7. Pilot library and cleanup

Register only the sections a real offer brief needs. Do not register all of `sections2/` up front. After review works, delete the unused `PageEditor` path if nothing imports it. `buildSeedPages()` returns `[]` on purpose; pages come from the template, not from seed rows.

### Explicitly out of scope

AI copy or layout, freeform canvas, writing content back into Webflow Designer, multi-client workspaces, native lead forms, checkout, CRM, A/B tests, arbitrary HTML fields, video file upload.

## Design reference

The clickable prototype is `reference/Page Studio v3.dc.html` in the design handoff. `handoff/` in this repo is that prototype copied in and then patched (`registryBridge.ts`, `useRegistryPicker`, persist callbacks). When the prototype and the registry disagree, follow `product-boundaries.md` and `lib/sections/registry.ts`.
