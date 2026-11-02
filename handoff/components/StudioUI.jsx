// STNDRD Page Studio — app-chrome primitives. Requires tokens/tokens.css.
import React from 'react';
import { TAGS } from './sectionLibrary.js';

const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
export const Icons = {
  pages: <><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 13H8" /><path d="M16 17H8" /></>,
  review: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
  plus: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
  edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
  copy: <><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></>,
  back: <path d="m15 18-6-6 6-6" />,
  undo: <><path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" /></>,
  redo: <><path d="m15 14 5-5-5-5" /><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13" /></>,
  history: <><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></>
};
export { Icon };

/* Button — variants: primary (yellow), dark, secondary (white + border), ghost, icon */
const BTN = {
  primary: { background: 'var(--color-accent)', color: 'var(--color-text)', border: '1px solid transparent', hover: 'var(--color-accent-500)' },
  dark: { background: 'var(--color-text)', color: '#fff', border: '1px solid transparent', hover: '#33312d' },
  secondary: { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-divider)', hover: 'var(--color-neutral-100)' },
  ghost: { background: 'transparent', color: 'var(--color-text)', border: '1px solid transparent', hover: 'var(--color-neutral-200)' }
};
export function Button({ variant = 'secondary', icon, iconOnly, children, style, ...rest }) {
  const v = BTN[variant];
  const [hov, setHov] = React.useState(false);
  return (
    <button {...rest} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-start', gap: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, lineHeight: 1.2, cursor: rest.disabled ? 'not-allowed' : 'pointer', opacity: rest.disabled ? 0.45 : 1, borderRadius: 'var(--radius-sm)', padding: iconOnly ? 0 : '8px 12px', width: iconOnly ? 36 : undefined, height: iconOnly ? 36 : undefined, justifyContent: iconOnly ? 'center' : 'flex-start', background: hov && !rest.disabled ? v.hover : v.background, color: v.color, border: v.border, ...style }}>
      {icon && <Icon d={icon} size={iconOnly ? 17 : 16} />}{children}
    </button>
  );
}

/* Status pill — Draft / In review / Published / Unpublished */
export function StatusPill({ status }) {
  const t = TAGS[status] || TAGS.Draft;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, padding: '4px 9px', borderRadius: 999, background: t.bg, color: t.fg, border: `1px solid ${t.bd}` }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />{status}
    </span>
  );
}
export function FlagPill({ children }) {
  return <span style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, padding: '3px 8px', borderRadius: 999, background: 'var(--color-accent)', color: 'var(--color-text)' }}>{children}</span>;
}

export function Card({ children, style }) {
  return <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-md)', ...style }}>{children}</div>;
}

export function Eyebrow({ children, style }) {
  return <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, ...style }}>{children}</div>;
}

/* KPI tile — label, value, delta (green up / danger down), note */
export function KpiCard({ label, value, delta, up, note }) {
  return (
    <Card style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 12, color: 'var(--color-neutral-700)' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 28, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
        {delta && <div style={{ fontSize: 12, fontWeight: 600, color: up ? 'var(--color-success)' : 'var(--color-danger)' }}>{delta}</div>}
      </div>
      {note && <div style={{ fontSize: 11, color: 'var(--color-neutral-600)' }}>{note}</div>}
    </Card>
  );
}

/* Dark left sidebar */
export function Sidebar({ role, onRole, reviewCount = 0, user = { name: 'You', initials: 'YO' }, active = 'pages', onNav }) {
  const item = on => ({ font: 'inherit', fontSize: 13, display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', border: 0, borderRadius: 8, cursor: 'pointer', textAlign: 'left', background: on ? 'var(--sidebar-item-active)' : 'transparent', color: on ? '#fff' : '#c9c7bf' });
  const seg = on => ({ font: 'inherit', fontSize: 12, flex: 1, padding: '6px 8px', border: 0, borderRadius: 6, cursor: 'pointer', textAlign: 'left', background: on ? 'var(--color-accent)' : 'transparent', color: on ? 'var(--color-text)' : '#c9c7bf' });
  return (
    <aside style={{ width: 'var(--sidebar-width)', flex: 'none', background: 'var(--sidebar-bg)', color: 'var(--sidebar-fg)', display: 'flex', flexDirection: 'column', padding: '18px 14px', gap: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px' }}>
        <div style={{ width: 30, height: 30, borderRadius: 7, background: 'var(--color-accent)', color: 'var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 16 }}>S</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 15, letterSpacing: '0.02em' }}>STNDRD</div>
          <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sidebar-muted)' }}>Page Studio</div>
        </div>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <button style={item(active === 'pages')} onClick={() => onNav?.('pages')}><Icon d={Icons.pages} />Pages</button>
        {role === 'operator' && (
          <button style={item(active === 'review')} onClick={() => onNav?.('review')}><Icon d={Icons.review} /><span style={{ marginRight: 'auto' }}>Review queue</span>
            <span style={{ minWidth: 20, height: 20, borderRadius: 10, background: 'var(--color-accent)', color: 'var(--color-text)', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{reviewCount}</span>
          </button>
        )}
      </nav>
      <div style={{ background: 'var(--sidebar-card-bg)', border: '1px solid var(--sidebar-card-border)', borderRadius: 10, padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 600 }}>STNDRD workspace</div>
        <div style={{ fontSize: 12, lineHeight: 1.45, color: '#b8b6ae' }}>stndrdcoach.com · Pages publish alongside the Webflow site.</div>
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', background: 'var(--sidebar-card-bg)', borderRadius: 8, padding: 3 }}>
          <button style={seg(role === 'marketer')} onClick={() => onRole('marketer')}>Marketer</button>
          <button style={seg(role === 'operator')} onClick={() => onRole('operator')}>Operator</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 4px' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--sidebar-avatar)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 11 }}>{user.initials}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{user.name}</div>
            <div style={{ fontSize: 11, color: 'var(--sidebar-muted)' }}>STNDRD Coach</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* Thin white top bar */
export function TopBar({ title, roleLabel, actions }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 28px', height: 'var(--topbar-height)', flex: 'none', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-divider)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 'auto' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 15 }}>{title}</div>
        <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-neutral-600)' }}>STNDRD Coach / {roleLabel}</div>
      </div>
      {actions}
    </div>
  );
}

/* One row in the Pages list */
export function PageRow({ page, metrics, onOpen, onDuplicate, openLabel = 'Edit', canDuplicate = true }) {
  const dark = page.theme === 'dark';
  const live = page.status === 'Published';
  const url = `stndrdcoach.com/${page.slug}`;
  return (
    <Card style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 18px', alignItems: 'center', padding: '10px 14px 10px 10px' }}>
      <button onClick={onOpen} title="Open" style={{ flex: 'none', width: 112, height: 64, borderRadius: 6, border: '1px solid var(--color-divider)', padding: 10, cursor: 'pointer', background: dark ? '#0b0b0b' : '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 5 }}>
        <div style={{ width: '70%', height: 6, borderRadius: 2, background: dark ? '#f5f3ee' : '#0b0b0b' }} />
        <div style={{ width: '45%', height: 6, borderRadius: 2, background: dark ? '#f5f3ee' : '#0b0b0b' }} />
        <div style={{ width: '30%', height: 8, borderRadius: 2, background: '#ffd21f' }} />
      </button>
      <div style={{ flex: '2 1 220px', display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={onOpen} style={{ font: 'inherit', background: 'none', border: 0, padding: 0, cursor: 'pointer', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 15, color: 'var(--color-text)' }}>{page.name}</button>
          {page.hasChanges && <FlagPill>Unpublished changes</FlagPill>}
        </div>
        {live ? <a href={`https://www.${url}`} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-text)' }}>{url}</a>
              : <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-neutral-700)' }}>{url}</div>}
        <div style={{ fontSize: 11, color: 'var(--color-neutral-600)' }}>Updated {page.updated} · {dark ? 'Dark' : 'Light'} theme</div>
      </div>
      <div style={{ display: 'flex', flex: '0 0 120px' }}><StatusPill status={page.status} /></div>
      <div style={{ flex: '1 1 200px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10, fontVariantNumeric: 'tabular-nums' }}>
        {[['visits', metrics?.trend || 'Visits'], ['ctr', 'CTR'], ['conv', 'Conv.']].map(([k, l]) => (
          <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: metrics ? 'var(--color-text)' : 'var(--color-neutral-500)' }}>{metrics?.[k] ?? '—'}</div>
            <div style={{ fontSize: 10, color: 'var(--color-neutral-600)' }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 'none', marginLeft: 'auto', display: 'flex', gap: 6 }}>
        <Button icon={Icons.edit} onClick={onOpen}>{openLabel}</Button>
        {canDuplicate && <Button icon={Icons.copy} onClick={onDuplicate}>Duplicate</Button>}
      </div>
    </Card>
  );
}

/* App shell */
export function AppShell({ sidebar, topbar, children }) {
  return (
    <div style={{ height: '100vh', display: 'flex', overflow: 'hidden', background: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
      {sidebar}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {topbar}
        <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
      </div>
    </div>
  );
}
