"use client";

import type { PageStatus } from "@/lib/types/page";

const TAGS: Record<
  PageStatus,
  { label: string; bg: string; fg: string }
> = {
  draft: { label: "Draft", bg: "var(--color-neutral-200)", fg: "var(--color-neutral-700)" },
  in_review: { label: "In review", bg: "var(--color-info-100)", fg: "var(--color-info)" },
  published: { label: "Published", bg: "var(--color-success-100)", fg: "var(--color-success)" },
  unpublished: { label: "Unpublished", bg: "var(--color-neutral-100)", fg: "var(--color-neutral-700)" },
};

export function StatusPill({ status }: { status: PageStatus }) {
  const t = TAGS[status];
  return (
    <span
      className="studio-status-pill"
      style={{ background: t.bg, color: t.fg }}
    >
      {t.label}
    </span>
  );
}

type BtnVariant = "primary" | "dark" | "secondary" | "ghost";

const variantClass: Record<BtnVariant, string> = {
  primary: "studio-btn studio-btn-primary",
  dark: "studio-btn studio-btn-dark",
  secondary: "studio-btn studio-btn-secondary",
  ghost: "studio-btn studio-btn-ghost",
};

export function Button({
  variant = "secondary",
  children,
  className,
  type = "button",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: BtnVariant;
}) {
  return (
    <button
      type={type}
      className={[variantClass[variant], className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={["studio-card", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
