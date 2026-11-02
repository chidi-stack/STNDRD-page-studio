-- Page Studio: run in Supabase SQL editor (or via CLI migrate).
create table if not exists public.pages (
  id text primary key,
  name text not null,
  slug text not null unique,
  theme text not null default 'dark',
  check (theme in ('dark', 'light')),
  status text not null default 'draft',
  check (status in ('draft', 'in_review', 'published', 'unpublished')),
  sections jsonb not null default '[]'::jsonb,
  cta jsonb not null default '{"mode":"external","externalUrl":""}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists pages_status_idx on public.pages (status);
create index if not exists pages_slug_idx on public.pages (slug);
