// PageStudio — exported from "Page Studio v3.dc.html". Generated JSX; inline styles are the source of truth.
import React from 'react';
import Section from './StudioSectionBridge.tsx';
import StudioRegistryFields from './StudioRegistryFields.tsx';
import MobileCanvasPreview from '@/components/studio/MobileCanvasPreview.tsx';
import { getRegistryDef, LANDING_TEMPLATE, mkLandingTemplate, mkRegistrySection, REGISTRY_CATS, REGISTRY_PICKER_LIB, registrySampleSection, registrySectionMeta } from './registryBridge.ts';

const F = (k, l, t, o) => Object.assign({ k, l, t }, o || {});
const LIB = [
  { type: 'header', cat: 'Header', name: 'Site header', desc: 'Logo, main navigation and one button. Pinned to the top of the page.', pin: 'top', single: 1,
    fields: [F('notice', 'Announcement', 'text', { max: 32 }), F('cta', 'Button label', 'text', { req: 1, max: 22 })], def: { notice: 'Applications now open', cta: 'Apply' } },
  { type: 'hero-split', cat: 'Hero', name: 'Hero · split image', desc: 'Headline, supporting copy and one button beside a portrait or product image.',
    fields: [F('eyebrow', 'Eyebrow', 'text', { max: 40 }), F('headline', 'Headline', 'textarea', { req: 1, max: 80 }), F('sub', 'Supporting copy', 'textarea', { max: 200 }), F('cta', 'Button label', 'text', { req: 1, max: 22 }), F('image', 'Image', 'image', { req: 1, sample: 'coach-portrait.jpg' })],
    def: { eyebrow: 'Executive retainer', headline: 'A standing coach for leaders who carry the room.', sub: 'Monthly one-to-one sessions, support between them when decisions can’t wait, and a quarterly review with your manager or board.', cta: 'Apply for a place', image: { src: '', alt: '' } } },
  { type: 'hero-video', cat: 'Hero', name: 'Hero · video', desc: 'Headline above an embedded Vimeo video with an optional poster image.',
    fields: [F('headline', 'Headline', 'textarea', { req: 1, max: 80 }), F('sub', 'Supporting copy', 'textarea', { max: 200 }), F('video', 'Video link', 'video', { req: 1 }), F('poster', 'Poster image', 'image', { sample: 'session-poster.jpg' })],
    def: { headline: 'See how a retainer session runs.', sub: 'A ten-minute walkthrough of a real session, shared with the client’s permission.', video: '', poster: { src: '', alt: '' } } },
  { type: 'metrics', cat: 'Proof', name: 'Metrics band', desc: 'Two to four outcome figures with a required source line.',
    fields: [F('heading', 'Heading', 'text', { max: 60 }), F('source', 'Claim source', 'text', { req: 1, max: 120, claim: 1, help: 'Shown as a footnote. The operator checks it before publishing.' })],
    items: { l: 'Metric', pl: 'Metrics', min: 2, max: 4, fields: [F('value', 'Figure', 'text', { req: 1, max: 8 }), F('label', 'Label', 'text', { req: 1, max: 48 })], blank: { value: '', label: '' } },
    def: { heading: 'What clients report after twelve months', source: '' },
    defItems: [{ value: '87%', label: 'promoted or given a larger remit' }, { value: '4.9', label: 'average session rating out of 5' }, { value: '140+', label: 'executives coached since 2019' }] },
  { type: 'testimonial', cat: 'Proof', name: 'Testimonial', desc: 'One client quote with name, role and an optional photo.',
    fields: [F('quote', 'Quote', 'textarea', { req: 1, max: 280 }), F('name', 'Name', 'text', { req: 1, max: 40 }), F('role', 'Role and company', 'text', { max: 60 }), F('photo', 'Photo', 'image', { sample: 'dana-whitfield.jpg' }), F('permission', 'Client approval', 'confirm', { req: 1, claim: 1, text: 'The client approved this quote for publication.' })],
    def: { quote: 'Having a coach on retainer changed how I prepare for hard conversations. I stopped rehearsing them alone at midnight.', name: 'Dana Whitfield', role: 'COO, Northline Health', photo: { src: '', alt: '' }, permission: false } },
  { type: 'process', cat: 'Process', name: 'Numbered steps', desc: 'Two to five numbered steps explaining how the engagement works.',
    fields: [F('heading', 'Heading', 'text', { req: 1, max: 60 }), F('intro', 'Intro', 'textarea', { max: 200 })],
    items: { l: 'Step', pl: 'Steps', min: 2, max: 5, fields: [F('title', 'Title', 'text', { req: 1, max: 40 }), F('body', 'Description', 'textarea', { req: 1, max: 180 })], blank: { title: '', body: '' } },
    def: { heading: 'How the retainer works', intro: 'Twelve months, one coach, and a fixed rhythm you can plan around.' },
    defItems: [{ title: 'Intake and goals', body: 'A 90-minute session to agree three outcomes and how we’ll measure them.' }, { title: 'Monthly sessions', body: 'Sixty minutes each month, plus messaging support for time-sensitive decisions.' }, { title: 'Quarterly review', body: 'A three-way review with your manager or board chair to check progress.' }] },
  { type: 'offer', cat: 'Offer', name: 'Offer card', desc: 'Price, what’s included and one button.',
    fields: [F('heading', 'Heading', 'text', { req: 1, max: 50 }), F('price', 'Price', 'text', { req: 1, max: 16 }), F('note', 'Price note', 'text', { max: 60 }), F('cta', 'Button label', 'text', { req: 1, max: 22 })],
    items: { l: 'Inclusion', pl: 'Inclusions', min: 1, max: 8, fields: [F('text', 'Inclusion', 'text', { req: 1, max: 80 })], blank: { text: '' } },
    def: { heading: 'Executive retainer', price: '£2,400', note: 'per month · 12-month term', cta: 'Apply for a place' },
    defItems: [{ text: '12 monthly one-to-one sessions' }, { text: 'Messaging support on working days' }, { text: 'Four quarterly stakeholder reviews' }, { text: '360° feedback at the start and end' }] },
  { type: 'faq', cat: 'FAQ', name: 'FAQ list', desc: 'Questions and answers. Every answer stays visible on desktop and mobile.',
    fields: [F('heading', 'Heading', 'text', { max: 40 })],
    items: { l: 'Question', pl: 'Questions', min: 1, max: 12, fields: [F('q', 'Question', 'text', { req: 1, max: 120 }), F('a', 'Answer', 'textarea', { req: 1, max: 600 })], blank: { q: '', a: '' } },
    def: { heading: 'Questions' },
    defItems: [{ q: 'Who is the retainer for?', a: 'Senior leaders in their first two years in a role, or anyone preparing for a larger remit.' }, { q: 'Can my employer pay?', a: 'Yes. We invoice companies directly and can sign a standard supplier agreement.' }, { q: 'What if I need to pause?', a: 'You can pause once for up to two months without extending your term.' }] },
  { type: 'final-cta', cat: 'Final CTA', name: 'Final call to action', desc: 'Closing headline and button. The button links to the workspace CTA destination.', single: 1,
    fields: [F('headline', 'Headline', 'textarea', { req: 1, max: 80 }), F('body', 'Supporting copy', 'textarea', { max: 200 }), F('cta', 'Button label', 'text', { req: 1, max: 22 })],
    def: { headline: 'Places open each quarter.', body: 'Tell us about your role and we’ll reply within two working days.', cta: 'Apply for a place' } },
  { type: 'footer', cat: 'Footer', name: 'Legal footer', desc: 'Company details and legal links set by the operator. Pinned to the bottom of the page.', pin: 'bottom', single: 1, fields: [], def: {} }
];
const BY = Object.fromEntries(LIB.map(l => [l.type, l]));
const CATS = ['All', 'Header', 'Hero', 'Proof', 'Process', 'Offer', 'FAQ', 'Final CTA', 'Footer'];
const RESERVED = ['admin', 'api', 'editor', 'studio', 'login', 'assets', 'static', '_next', 'robots.txt', 'sitemap.xml', 'favicon.ico'];
const WEBFLOW = ['about', 'coaching', 'contact', 'blog', 'programs', 'team', 'insights', 'privacy', 'terms', 'cookies'];
const STEPS = ['Validate saved revision', 'Record publication snapshot', 'Register path at the edge', 'Invalidate cached pages', 'Live check on public URL'];
const clone = o => JSON.parse(JSON.stringify(o));
let UID = 1;
const nid = () => 's' + (UID++);
function mk(type, fill) {
  const d = BY[type];
  const s = { id: nid(), type, v: clone(d.def || {}), items: clone(d.defItems || []) };
  if (fill) {
    if (s.v.image) s.v.image = { src: 'coach-portrait.jpg', alt: 'Coach seated at a desk, facing the camera' };
    if (type === 'metrics') s.v.source = 'STNDRD client survey, Jan–Jun 2026 (n = 62)';
    if (type === 'testimonial') s.v.permission = true;
    if (type === 'hero-video') s.v.video = 'vimeo.com/824411903';
  }
  return s;
}
const SAMPLE = Object.fromEntries(LIB.map(l => [l.type, mk(l.type, true)]));
function fieldError(f, val) {
  if (f.t === 'text' || f.t === 'textarea') {
    const s = val || '';
    if (f.req && !s.trim()) return 'Required';
    if (f.max && s.length > f.max) return `Over the ${f.max}-character limit`;
  }
  if (f.t === 'image') {
    const im = val || {};
    if (f.req && !im.src) return 'Image required';
    if (im.src && !(im.alt || '').trim()) return 'Alt text required';
  }
  if (f.t === 'video') {
    if (f.req && !val) return 'Video link required';
    if (val && !/^(https?:\/\/)?(www\.)?vimeo\.com\/\d+/.test(val)) return 'Use a Vimeo link, e.g. vimeo.com/123456789';
  }
  if (f.t === 'confirm' && f.req && !val) return 'Confirmation required';
  return null;
}
function libDef(type) {
  const reg = registrySectionMeta(type);
  if (reg) return { name: reg.name, cat: reg.cat, pin: null, single: false, fields: [{ k: '_registry' }], items: null, isRegistry: true };
  return BY[type] || { name: type.replace(/^section-/, 'Section · '), cat: 'Section', pin: null, single: false, fields: [], items: null };
}
function sectionIssues(s) {
  const d = BY[s.type], out = [];
  if (!d) return out;
  d.fields.forEach(f => { const e = fieldError(f, s.v[f.k]); if (e) out.push({ f, key: f.k, text: `${f.l}: ${e}` }); });
  if (d.items) {
    if (s.items.length < d.items.min) out.push({ key: '_items', text: `Add at least ${d.items.min} ${d.items.pl.toLowerCase()}` });
    s.items.forEach((it, i) => d.items.fields.forEach(f => { const e = fieldError(f, it[f.k]); if (e) out.push({ key: '_items', text: `${d.items.l} ${i + 1} · ${f.l}: ${e}` }); }));
  }
  return out;
}
function validateSlug(slug, pages, selfId) {
  if (!slug) return 'Enter a slug.';
  if (/\//.test(slug)) return 'Use one path segment. Slashes aren’t allowed.';
  if (/%/.test(slug)) return 'Encoded characters aren’t allowed.';
  if (/\./.test(slug)) return 'Dots aren’t allowed.';
  if (/[A-Z]/.test(slug)) return 'Use lowercase letters only.';
  if (/\s/.test(slug)) return 'Use hyphens instead of spaces.';
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return 'Use letters, numbers and single hyphens, with no hyphen at either end.';
  if (RESERVED.includes(slug)) return `/${slug} is reserved by the system.`;
  if (WEBFLOW.includes(slug)) return `/${slug} is an existing Webflow page.`;
  const p = pages.find(p => p.slug === slug && p.id !== selfId);
  if (p) return `/${slug} is already used by “${p.name}”.`;
  return null;
}
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
function fullPage(fill, theme) {
  return ['header', 'hero-split', 'metrics', 'process', 'testimonial', 'offer', 'faq', 'final-cta', 'footer'].map(t => mk(t, fill));
}
function starterPage() {
  return ['header', 'hero-split', 'final-cta', 'footer'].map(t => mk(t, false));
}
const ANALYTICS = {
  p1: { visits: 4812, prev: 4296, clicks: 308, prevClicks: 262, conv: 118, prevConv: 97 },
  p4: { visits: 1204, prev: 2380, clicks: 37, prevClicks: 81, conv: 14, prevConv: 31, note: 'Until 28 Sep' }
};
const fmtN = n => n.toLocaleString('en-GB');
const pct = (a, b) => b ? (a / b * 100).toFixed(1) + '%' : '—';
const delta = (a, b) => { const d = (a - b) / b * 100; return (d >= 0 ? '+' : '−') + Math.abs(d).toFixed(0) + '%'; };
function seedPages() {
  const exec = fullPage(true);
  exec[1].v.eyebrow = 'Executive coaching'; exec[1].v.headline = 'Coaching for the decisions only you can make.';
  const ret = fullPage(false);
  const lead = ['header', 'hero-video', 'process', 'metrics', 'faq', 'final-cta', 'footer'].map(t => mk(t, true));
  lead[1].v.headline = 'Two days to reset how your team leads.'; lead[2].v.heading = 'The intensive, day by day';
  const team = ['header', 'hero-split', 'offer', 'final-cta', 'footer'].map(t => mk(t, true));
  team[1].v.eyebrow = 'Team workshops'; team[1].v.headline = 'Half-day workshops for leadership teams.';
  const revs = (secs, list) => list.map(r => Object.assign({ sections: clone(secs) }, r));
  return [
    { id: 'p1', name: 'Executive Coaching', slug: 'executive-coaching', theme: 'dark', status: 'Published', updated: 'Today, 09:41', by: 'Maya R.', liveRev: 7, sections: exec,
      revisions: revs(exec, [{ n: 7, time: 'Today, 09:41', by: 'Maya R.' }, { n: 6, time: 'Fri 2 Oct, 15:10', by: 'Maya R.' }, { n: 5, time: 'Thu 1 Oct, 11:32', by: 'You' }]) },
    { id: 'p2', name: 'Retainer', slug: 'retainer', theme: 'dark', status: 'Draft', updated: 'Yesterday, 17:20', by: 'You', sections: ret,
      revisions: revs(ret, [{ n: 3, time: 'Yesterday, 17:20', by: 'You' }, { n: 2, time: 'Yesterday, 16:02', by: 'You' }, { n: 1, time: 'Mon 5 Oct, 10:15', by: 'You' }]) },
    { id: 'p3', name: 'Leadership Intensive', slug: 'leadership-intensive', theme: 'light', status: 'In review', updated: 'Mon 5 Oct, 11:02', by: 'Sam K.', reviewRev: 4, submitted: 'Mon 5 Oct, 11:02', sections: lead,
      revisions: revs(lead, [{ n: 4, time: 'Mon 5 Oct, 11:02', by: 'Sam K.' }, { n: 3, time: 'Mon 5 Oct, 09:47', by: 'Sam K.' }]) },
    { id: 'p4', name: 'Team Workshops', slug: 'team-workshops', theme: 'light', status: 'Unpublished', updated: '28 Sep, 16:45', by: 'Maya R.', liveRev: 2, wasLive: 2, sections: team,
      revisions: revs(team, [{ n: 2, time: '21 Sep, 10:05', by: 'Maya R.' }, { n: 1, time: '20 Sep, 14:30', by: 'Maya R.' }]) }
  ];
}
const TAGS = {
  'Draft': { bg: 'var(--color-neutral-200)', fg: 'var(--color-neutral-800)', bd: 'var(--color-neutral-200)' },
  'In review': { bg: '#e6edff', fg: '#2a4cc0', bd: '#e6edff' },
  'Published': { bg: '#e2f5e8', fg: '#1d7444', bd: '#e2f5e8' },
  'Unpublished': { bg: 'var(--color-surface)', fg: 'var(--color-neutral-700)', bd: 'var(--color-divider)' }
};
const ON = { bg: 'var(--color-text)', fg: '#ffffff' }, OFF = { bg: 'transparent', fg: 'var(--color-text)' };

export default class PageStudio extends React.Component {
  state = this.initial();

  initial() {
    const start = this.props.start || 'dashboard';
    const pages = this.props.initialPages ? clone(this.props.initialPages) : seedPages();
    const base = { screen: 'dashboard', role: 'marketer', pages, pageId: null, sections: [], selectedId: null, device: 'desktop', dirty: false, undo: [], redo: [], dialog: null, create: null, picker: null, publishStep: 0, showErrors: false, focusKey: null, toast: null, claimsOk: {}, returnNote: '', panel: 'outline', frameW: 900, confirm: null };
    const open = (id, extra) => { const p = pages.find(x => x.id === id); if (!p) return Object.assign({}, base, extra); return Object.assign({}, base, { screen: 'editor', pageId: id, sections: clone(p.sections) }, extra); };
    if (this.props.pageId) {
      const opened = open(this.props.pageId, { selectedId: pages.find(x => x.id === this.props.pageId)?.sections?.[0]?.id, panel: 'fields' });
      if (opened.pageId) return opened;
    }
    const blank = () => { pages.push({ id: 'p5', name: 'Retainer 2027', slug: 'retainer-2027', theme: 'dark', status: 'Draft', updated: 'Just now', by: 'You', sections: starterPage(), revisions: [] }); return open('p5'); };
    const demoPage = () => pages.find(p => p.id === 'p2') || pages.find(p => (p.sections || []).length > 1) || pages[0];
    const demoHeroId = p => (p?.sections || []).find(s => s.type === 'hero-split')?.id || p?.sections?.[1]?.id || p?.sections?.[0]?.id || null;
    switch (start) {
      case 'create': return Object.assign(base, { dialog: 'create', create: { name: 'Retainer 2027', slug: 'retainer-2027', theme: 'dark', touched: false, from: null, check: 'done' } });
      case 'create-error': return Object.assign(base, { dialog: 'create', create: { name: 'About the retainer', slug: 'about', theme: 'dark', touched: true, from: null, check: 'done' } });
      case 'duplicate': return Object.assign(base, { dialog: 'create', create: { name: 'Executive Coaching (copy)', slug: 'executive-coaching-copy', theme: 'dark', touched: false, from: 'p1', check: 'done' } });
      case 'editor-empty': return blank();
      case 'picker-panel': case 'picker-modal': { const s = blank(); s.dialog = 'picker'; s.pickerStyle = start === 'picker-panel' ? 'panel' : 'modal'; s.picker = { q: '', cat: 'All', preview: 'hero-split', insertAt: 0, mode: 'add' }; return s; }
      case 'editor': { const p = demoPage(); return open(p?.id || 'p2', { selectedId: demoHeroId(p), panel: 'fields' }); }
      case 'editor-mobile': { const p = demoPage(); return open(p?.id || 'p2', { selectedId: demoHeroId(p), panel: 'fields', device: 'mobile' }); }
      case 'revisions': { const p = demoPage(); return open(p?.id || 'p2', { selectedId: demoHeroId(p), panel: 'fields', dialog: 'revisions' }); }
      case 'issues': { const p = demoPage(); return open(p?.id || 'p2', { selectedId: demoHeroId(p), panel: 'fields', dialog: 'issues', showErrors: true }); }
      case 'in-review': { const ret = demoPage(); if (ret) { ret.status = 'In review'; ret.reviewRev = 3; ret.submitted = 'Today, 10:02'; ret.sections = fullPage(true); } return open(ret?.id || 'p2', { selectedId: demoHeroId(ret), panel: 'fields' }); }
      case 'operator': return Object.assign(base, { role: 'operator', screen: 'review', pageId: 'p3', sections: clone(pages[2].sections), claimsOk: {} });
      case 'publishing': { const s = Object.assign(base, { role: 'operator', screen: 'review', pageId: 'p3', sections: clone(pages[2].sections), dialog: 'publish', publishStep: 3 }); s.claimsOk = Object.fromEntries(pages[2].sections.map(x => [x.id, true])); return s; }
      case 'published': { const p = pages[2]; p.status = 'Published'; p.liveRev = 4; p.updated = 'Just now'; p.by = 'Operator'; return Object.assign(base, { role: 'operator', toast: 'Live at https://www.stndrdcoach.com/leadership-intensive' }); }
      default: return base;
    }
  }

  componentDidMount() {
    if (this.props.embedded) return;
    this._key = e => {
      if (this.state.screen !== 'editor' || this.isLocked()) return;
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? this.redo() : this.undo(); }
      if (mod && e.key.toLowerCase() === 's') { e.preventDefault(); this.save(); }
    };
    window.addEventListener('keydown', this._key);
  }
  componentWillUnmount() {
    if (this._key) window.removeEventListener('keydown', this._key);
    clearInterval(this._pt); clearTimeout(this._ct); clearTimeout(this._tt);
    if (this._ro) this._ro.disconnect();
  }

  canvasRef = el => {
    if (this._ro) { this._ro.disconnect(); this._ro = null; }
    if (!el) return;
    this._ro = new ResizeObserver(() => { const w = el.clientWidth; if (w && Math.abs(w - this.state.frameW) > 1) this.setState({ frameW: w }); });
    this._ro.observe(el);
  };

  page() { return this.state.pages.find(p => p.id === this.state.pageId); }
  isLocked() { const p = this.page(); return !!p && this.state.role === 'marketer' && p.status === 'In review'; }
  updatePage(fn) { this.setState(st => ({ pages: st.pages.map(p => p.id === st.pageId ? fn(p) : p) })); }
  toast(msg) { clearTimeout(this._tt); this.setState({ toast: msg }); this._tt = setTimeout(() => this.setState({ toast: null }), 3200); }

  commit(next, sel) {
    this._lastKey = null;
    this.setState(st => ({ undo: [...st.undo.slice(-60), st.sections], redo: [], sections: next, dirty: true, selectedId: sel === undefined ? st.selectedId : sel }));
  }
  editSection(id, fn, key) {
    const now = Date.now();
    const coalesce = key && this._lastKey === key && now - this._lastT < 1200;
    this._lastKey = key; this._lastT = now;
    this.setState(st => {
      const next = st.sections.map(s => s.id === id ? fn(clone(s)) : s);
      return coalesce ? { sections: next, dirty: true } : { undo: [...st.undo.slice(-60), st.sections], redo: [], sections: next, dirty: true };
    });
  }
  undo() { this.setState(st => st.undo.length ? { sections: st.undo[st.undo.length - 1], undo: st.undo.slice(0, -1), redo: [...st.redo, st.sections], dirty: true } : null); this._lastKey = null; }
  redo() { this.setState(st => st.redo.length ? { sections: st.redo[st.redo.length - 1], redo: st.redo.slice(0, -1), undo: [...st.undo, st.sections], dirty: true } : null); this._lastKey = null; }

  bounds(S) { const lo = S[0] && S[0].type === 'header' ? 1 : 0; const hi = S.length - (S.length && S[S.length - 1].type === 'footer' ? 1 : 0); return { lo, hi }; }
  move(id, dir) {
    const S = [...this.state.sections], i = S.findIndex(s => s.id === id), j = i + dir, { lo, hi } = this.bounds(S);
    if (libDef(S[i].type).pin || j < lo || j >= hi) return;
    [S[i], S[j]] = [S[j], S[i]]; this.commit(S, id);
  }
  duplicate(id) {
    const S = [...this.state.sections], i = S.findIndex(s => s.id === id);
    if (libDef(S[i].type).single) return;
    const c = clone(S[i]); c.id = nid(); S.splice(i + 1, 0, c); this.commit(S, c.id); this.toast(`Duplicated ${libDef(c.type).name}`);
  }
  remove(id) {
    const S = this.state.sections.filter(s => s.id !== id), name = libDef(this.state.sections.find(s => s.id === id).type).name;
    this.commit(S, null); this.setState({ panel: 'outline' }); this.toast(`Removed ${name}. Undo with Ctrl+Z.`);
  }
  pickerLib() { return this.props.useRegistryPicker ? REGISTRY_PICKER_LIB : LIB; }
  openPicker(o) {
    const S = this.state.sections, { lo, hi } = this.bounds(S);
    const PL = this.pickerLib();
    let at = o.insertAt;
    if (at === undefined) { const i = S.findIndex(s => s.id === this.state.selectedId); at = i >= 0 ? i + 1 : hi; }
    at = Math.max(lo, Math.min(hi, at));
    const cat = o.cat || 'All';
    const first = o.preview || (PL.find(l => (cat === 'All' || l.cat === cat) && !this.unavailable(l.type)) || PL[0]).type;
    this.setState({ dialog: 'picker', picker: { q: '', cat, preview: first, insertAt: at, mode: o.mode || 'add', replaceId: o.replaceId } });
  }
  unavailable(type) {
    if (this.props.useRegistryPicker && getRegistryDef(type)) return false;
    const d = BY[type];
    return d && d.single && this.state.sections.some(s => s.type === type) && !(this.state.picker && this.state.picker.mode === 'replace');
  }
  addFromPicker() {
    const pk = this.state.picker, type = pk.preview;
    if (this.props.useRegistryPicker && getRegistryDef(type)) {
      const ns = mkRegistrySection(type, nid);
      if (!ns) return;
      let S = [...this.state.sections];
      if (pk.mode === 'replace') {
        const i = S.findIndex(s => s.id === pk.replaceId);
        ns.id = S[i].id;
        S[i] = ns;
        this.commit(S, ns.id);
        this.setState({ dialog: null, panel: 'fields' });
        this.toast(`Replaced with ${getRegistryDef(type).name}.`);
        return;
      }
      const { lo, hi } = this.bounds(S);
      S.splice(Math.max(lo, Math.min(hi, pk.insertAt)), 0, ns);
      this.commit(S, ns.id);
      this.setState({ dialog: null, panel: 'fields' });
      this.toast(`Added ${getRegistryDef(type).name}.`);
      return;
    }
    const d = BY[type];
    if (!d) return;
    let S = [...this.state.sections];
    if (pk.mode === 'replace') {
      const i = S.findIndex(s => s.id === pk.replaceId), old = S[i], ns = mk(type);
      const oldKeys = Object.fromEntries(BY[old.type].fields.map(f => [f.k, f.t]));
      d.fields.forEach(f => { if (oldKeys[f.k] === f.t && old.v[f.k] !== undefined) ns.v[f.k] = clone(old.v[f.k]); });
      if (d.items && BY[old.type].items && d.items.fields.map(f => f.k).join() === BY[old.type].items.fields.map(f => f.k).join()) ns.items = clone(old.items);
      S[i] = ns; this.commit(S, ns.id); this.setState({ dialog: null, panel: 'fields' }); this.toast(`Replaced with ${d.name}. Matching fields kept.`); return;
    }
    if (this.unavailable(type)) return;
    const ns = mk(type), { lo, hi } = this.bounds(S);
    if (d.pin === 'top') S.unshift(ns); else if (d.pin === 'bottom') S.push(ns); else S.splice(Math.max(lo, Math.min(hi, pk.insertAt)), 0, ns);
    this.commit(S, ns.id); this.setState({ dialog: null, panel: 'fields' });
  }
  save() {
    if (!this.state.dirty) return;
    let n = 0;
    this.setState(st => {
      const pages = st.pages.map(p => {
        if (p.id !== st.pageId) return p;
        n = ((p.revisions[0] || {}).n || 0) + 1;
        return Object.assign({}, p, {
          sections: clone(st.sections),
          updated: 'Just now',
          by: 'You',
          revisions: [{ n, time: 'Just now', by: 'You', sections: clone(st.sections) }, ...p.revisions],
        });
      });
      return { dirty: false, pages };
    }, () => {
      this.toast(`Saved as revision ${n}`);
      if (this.props.onPersistPages) this.props.onPersistPages(this.state.pages);
    });
  }
  checks() {
    const S = this.state.sections, out = [], has = t => S.some(s => s.type === t);
    if (this.state.dirty) out.push({ kind: 'Unsaved', where: 'Revision', text: 'Save first. Review applies to a saved revision.', fixLabel: 'Save', fix: () => this.save() });
    [['header'], ['final-cta'], ['footer']].forEach(([t]) => { if (!has(t)) out.push({ kind: 'Structure', where: 'Page', text: `${BY[t].name} is required.`, fixLabel: 'Add', fix: () => this.openPicker({ cat: BY[t].cat, preview: t }) }); });
    if (!S.some(s => { const d = BY[s.type]; return d && !d.single; })) out.push({ kind: 'Structure', where: 'Page', text: 'Add at least one content section.', fixLabel: 'Add', fix: () => this.openPicker({}) });
    S.forEach(s => sectionIssues(s).forEach(is => out.push({
      kind: is.f && is.f.claim ? 'Claim' : (is.f && (is.f.t === 'image' || is.f.t === 'video')) ? 'Media' : 'Field',
      where: libDef(s.type).name, text: is.text, fixLabel: 'Fix',
      fix: () => this.setState({ dialog: null, selectedId: s.id, panel: 'fields', showErrors: true, focusKey: is.key })
    })));
    return out;
  }
  requestReview() {
    const issues = this.checks();
    if (issues.length) { this.setState({ dialog: 'issues', showErrors: true }); return; }
    const p = this.page(), n = (p.revisions[0] || {}).n;
    this.updatePage(pp => Object.assign({}, pp, { status: 'In review', reviewRev: n, submitted: 'Just now', note: null }));
    this.setState({ dialog: 'reviewSent' });
  }
  openPage(id) {
    const p = this.state.pages.find(x => x.id === id);
    if (!p) return;
    if (this.props.onOpenPage) this.props.onOpenPage(id);
    clearTimeout(this._tt);
    const base = { pageId: id, sections: clone(p.sections), selectedId: null, undo: [], redo: [], dirty: false, dialog: null, showErrors: false, focusKey: null, panel: 'outline', toast: null };
    if (this.state.role === 'operator') this.setState(Object.assign(base, { screen: 'review', claimsOk: {} }));
    else this.setState(Object.assign(base, { screen: 'editor' }));
  }
  setCreate(patch) {
    this.setState(st => ({ create: Object.assign({}, st.create, patch, { check: 'checking' }) }));
    clearTimeout(this._ct); this._ct = setTimeout(() => this.setState(st => st.create ? { create: Object.assign({}, st.create, { check: 'done' }) } : null), 450);
  }
  createPage() {
    const c = this.state.create; if (!c || validateSlug(c.slug, this.state.pages)) return;
    if (!c.name || !String(c.name).trim()) {
      this.setState(st => ({ create: st.create ? Object.assign({}, st.create, { error: 'Enter a page name.' }) : null }));
      return;
    }
    const from = c.from && this.state.pages.find(p => p.id === c.from);
    if (this.props.onCreatePage && !from) {
      if (this.state.creating) return;
      this.setState({ creating: true });
      this.props.onCreatePage({ name: String(c.name).trim(), slug: c.slug, theme: c.theme }).then((result) => {
        this.setState({ creating: false });
        if (!result || !result.ok) {
          this.setState(st => ({ create: st.create ? Object.assign({}, st.create, { error: (result && result.error) || 'Could not create page.' }) : null }));
          return;
        }
        this.setState({ dialog: null, create: null });
        if (this.props.onOpenPage) this.props.onOpenPage(result.id);
      });
      return;
    }
    const secs = from ? clone(from.sections).map(s => Object.assign(s, { id: nid() })) : (this.props.useRegistryPicker ? mkLandingTemplate(nid) : starterPage());
    const id = 'p' + Date.now();
    const page = { id, name: c.name || 'Untitled page', slug: c.slug, theme: c.theme, status: 'Draft', updated: 'Just now', by: 'You', sections: secs, revisions: from ? [{ n: 1, time: 'Just now', by: 'You', sections: clone(secs) }] : [] };
    this.setState(st => ({ pages: [...st.pages, page], pageId: id, screen: 'editor', sections: clone(secs), selectedId: null, undo: [], redo: [], dirty: false, dialog: null, create: null, panel: 'outline', showErrors: false }),
      () => from && this.toast(`Duplicated from “${from.name}”`));
  }
  startPublish = () => {
    this.setState({ dialog: 'publish', publishStep: 0 });
    clearInterval(this._pt);
    this._pt = setInterval(() => {
      this.setState(st => {
        const step = st.publishStep + 1;
        if (step >= STEPS.length) {
          clearInterval(this._pt);
          return { publishStep: step, pages: st.pages.map(p => p.id === st.pageId ? Object.assign({}, p, { status: 'Published', liveRev: p.reviewRev || (p.revisions[0] || {}).n, updated: 'Just now', by: 'Operator' }) : p) };
        }
        return { publishStep: step };
      });
    }, 850);
  };

  fieldView(f, val, onVal, o) {
    const isStr = f.t === 'text' || f.t === 'textarea' || f.t === 'video';
    const s = isStr ? (val || '') : '';
    const err = fieldError(f, val);
    const lenErr = !!(f.max && s.length > f.max);
    const show = !!err && (o.showErrors || lenErr || (f.t === 'video' && !!s) || (f.t === 'image' && val && val.src));
    const img = f.t === 'image' ? (val || { src: '', alt: '' }) : null;
    return {
      label: f.l, reqMark: f.req ? ' *' : '', isText: f.t === 'text', isTextarea: f.t === 'textarea', isImage: f.t === 'image', isVideo: f.t === 'video', isConfirm: f.t === 'confirm',
      value: s, onChange: e => onVal(e.target.value), disabled: o.locked,
      count: f.max ? `${s.length}/${f.max}` : '', countColor: lenErr ? 'var(--color-danger)' : 'var(--color-neutral-600)',
      hasError: show, error: err || '', borderColor: show ? 'var(--color-accent)' : 'var(--color-divider)',
      focusBg: o.focus ? 'var(--color-accent-100)' : 'transparent', help: f.help || '', hasHelp: !!f.help,
      hasImg: !!(img && img.src), imgName: img ? (img.src || (f.req ? 'No image yet' : 'No image · area hidden on the page')) : '',
      thumbBg: img && img.src ? 'repeating-linear-gradient(135deg, var(--color-neutral-400) 0 6px, var(--color-neutral-300) 6px 12px)' : 'transparent',
      thumbBorder: img && img.src ? '0' : '2px dashed var(--color-neutral-500)',
      alt: img ? img.alt || '' : '', onAlt: e => onVal(Object.assign({}, img, { alt: e.target.value })),
      onUpload: () => onVal({ src: f.sample, alt: img.alt || '' }), onRemoveImg: () => onVal({ src: '', alt: '' }),
      canRemoveImg: !!(img && img.src && !f.req), uploadLabel: img && img.src ? 'Replace' : 'Upload',
      checked: !!val, onCheck: e => onVal(e.target.checked), confirmText: f.text || ''
    };
  }

  renderVals() {
    const st = this.state, p = this.page(), locked = this.isLocked();
    const layoutB = (this.props.layout || 'A') === 'B';
    const pickerStyle = st.pickerStyle || this.props.pickerStyle || 'modal';
    const S = st.sections, { lo, hi } = this.bounds(S);
    const theme = p ? p.theme : 'dark';
    const url = s => `stndrdcoach.com/${s}`;
    const pg = p ? { name: p.name, status: p.status, tag: TAGS[p.status], url: url(p.slug), revLabel: `Revision ${p.reviewRev || p.liveRev || ((p.revisions[0] || {}).n || 1)}` } : { tag: TAGS.Draft };
    const issueMap = {};
    S.forEach(s => { issueMap[s.id] = sectionIssues(s); });

    const A = Object.values(ANALYTICS).reduce((s, a) => ({ v: s.v + a.visits, pv: s.pv + a.prev, c: s.c + a.clicks, pc: s.pc + a.prevClicks, k: s.k + a.conv, pk: s.pk + a.prevConv }), { v: 0, pv: 0, c: 0, pc: 0, k: 0, pk: 0 });
    const up = 'oklch(0.52 0.13 150)', down = 'var(--color-danger)';
    const dc = (a, b) => a >= b ? up : down;
    const rateDelta = (a, b) => { const d = a - b; return (d >= 0 ? '+' : '−') + Math.abs(d).toFixed(1) + ' pts'; };
    const ctrNow = A.c / A.v * 100, ctrPrev = A.pc / A.pv * 100, crNow = A.k / A.v * 100, crPrev = A.pk / A.pv * 100;
    const kpis = [
      { label: 'Visits', value: fmtN(A.v), delta: delta(A.v, A.pv), deltaColor: dc(A.v, A.pv), note: 'Unique sessions landing on a page' },
      { label: 'CTA click-through rate', value: ctrNow.toFixed(1) + '%', delta: rateDelta(ctrNow, ctrPrev), deltaColor: dc(ctrNow, ctrPrev), note: fmtN(A.c) + ' clicks on the primary button' },
      { label: 'Applications', value: fmtN(A.k), delta: delta(A.k, A.pk), deltaColor: dc(A.k, A.pk), note: 'Completed application forms' },
      { label: 'Conversion rate', value: crNow.toFixed(1) + '%', delta: rateDelta(crNow, crPrev), deltaColor: dc(crNow, crPrev), note: 'Applications ÷ visits' }
    ];
    const pagesView = st.pages.map(pp => { const a = ANALYTICS[pp.id]; return {
      visits: a ? fmtN(a.visits) : '—', ctr: a ? pct(a.clicks, a.visits) : '—', conv: a ? fmtN(a.conv) : '—',
      trend: a ? (a.note || delta(a.visits, a.prev)) : 'No traffic', trendColor: a ? (a.note ? 'var(--color-neutral-600)' : dc(a.visits, a.prev)) : 'var(--color-neutral-600)',
      mColor: a ? 'var(--color-text)' : 'var(--color-neutral-500)',
      name: pp.name, status: pp.status, tag: TAGS[pp.status], url: url(pp.slug), isLive: pp.status === 'Published', notLive: pp.status !== 'Published',
      hasChanges: pp.status === 'Published' && (pp.revisions[0] || {}).n > pp.liveRev, thumbInk: pp.theme === 'dark' ? '#f4f2ec' : '#0f0f0e',
      revLine: pp.status === 'Published' ? `live r${pp.liveRev}` + ((pp.revisions[0] || {}).n > pp.liveRev ? ` · draft r${pp.revisions[0].n}` : '') : pp.status === 'In review' ? `r${pp.reviewRev} · awaiting operator` : pp.status === 'Unpublished' ? `was live r${pp.wasLive || pp.liveRev}` : pp.revisions.length ? `r${pp.revisions[0].n} · private draft` : 'not saved yet',
      urlNote: pp.status === 'Published' ? 'Live' : pp.status === 'Unpublished' ? 'Returns 404 · path reserved' : 'Not live',
      themeLabel: pp.theme === 'dark' ? 'Dark' : 'Light', sw1: pp.theme === 'dark' ? '#0f0f0e' : '#ffffff', sw2: '#ffd21f',
      updated: `${pp.updated} · ${pp.by}`, canDuplicate: st.role === 'marketer',
      openLabel: st.role === 'operator' ? (pp.status === 'In review' ? 'Review' : 'View') : (pp.status === 'In review' ? 'View' : 'Edit'),
      onOpen: () => this.openPage(pp.id),
      onDuplicate: () => this.setState({ dialog: 'create', create: { name: `${pp.name} (copy)`, slug: `${pp.slug}-copy`, theme: pp.theme, touched: false, from: pp.id, check: 'done' } })
    }; });

    // create
    let cr = {};
    if (st.dialog === 'create' && st.create) {
      const c = st.create, err = validateSlug(c.slug, st.pages), checking = c.check === 'checking';
      const from = c.from && st.pages.find(x => x.id === c.from);
      cr = {
        title: from ? 'Duplicate page' : 'Create landing page', isDuplicate: !!from, fromName: from ? from.name : '', cta: this.state.creating ? 'Creating…' : (from ? 'Duplicate page' : 'Create page'),
        templateNote: from ? '' : `Starts with ${LANDING_TEMPLATE.name}: ${LANDING_TEMPLATE.stack}.`,
        error: c.error || '',
        name: c.name, slug: c.slug,
        onName: e => { const name = e.target.value; this.setCreate(c.touched ? { name } : { name, slug: slugify(name) }); },
        onSlug: e => this.setCreate({ slug: e.target.value, touched: true }),
        msg: checking ? 'Checking availability…' : err || 'Available',
        msgColor: checking ? 'var(--color-neutral-700)' : err ? 'var(--color-danger)' : 'var(--color-text)',
        dot: checking ? 'var(--color-neutral-400)' : err ? 'var(--color-accent)' : 'var(--color-text)',
        slugBd: !checking && err ? 'var(--color-accent)' : 'var(--color-divider)',
        fullUrl: `https://www.stndrdcoach.com/${c.slug || '…'}`,
        darkBd: c.theme === 'dark' ? 'var(--color-accent)' : 'var(--color-divider)', lightBd: c.theme === 'light' ? 'var(--color-accent)' : 'var(--color-divider)',
        setDark: () => this.setState({ create: Object.assign({}, c, { theme: 'dark' }) }), setLight: () => this.setState({ create: Object.assign({}, c, { theme: 'light' }) }),
        cannot: checking || !!err || !!this.state.creating, onCreate: () => this.createPage()
      };
    }

    // canvas
    const device = st.device;
    const zoom = device === 'desktop' ? st.frameW / 1280 : 1;
    const editable = st.screen === 'editor' && !locked;
    const canvas = S.map((s, i) => {
      const d = libDef(s.type), active = s.id === st.selectedId, noUp = !!d.pin || i - 1 < lo, noDown = !!d.pin || i + 1 >= hi;
      return {
        sec: s, label: d.name, active, tools: editable,
        ring: active ? '2px solid var(--color-accent)' : '0',
        onSelect: () => this.setState({ selectedId: s.id, panel: 'fields', focusKey: null }),
        noUp, noDown, upOpacity: noUp ? 0.35 : 1, downOpacity: noDown ? 0.35 : 1,
        onUp: e => { e.stopPropagation(); this.move(s.id, -1); }, onDown: e => { e.stopPropagation(); this.move(s.id, 1); },
        onAddAfter: e => { e.stopPropagation(); this.openPicker({ insertAt: i + 1 }); },
        seam: editable && s.type !== 'footer' && i < S.length - 1 && !(S[i + 1] && S[i + 1].type === 'footer' && false)
      };
    });
    const outline = S.map((s, i) => {
      const d = libDef(s.type), active = s.id === st.selectedId, pinned = !!d.pin;
      return {
        num: String(i + 1).padStart(2, '0'), name: d.name, cat: d.cat,
        meta: pinned ? `${d.cat} · pinned ${d.pin}` : d.items ? `${d.cat} · ${s.items.length} ${d.items.pl.toLowerCase()}` : d.cat,
        bg: active ? 'var(--color-accent-100)' : 'transparent', bar: active ? 'var(--color-accent)' : 'transparent',
        hasIssue: st.showErrors && issueMap[s.id].length > 0, pinned, movable: !pinned && !locked,
        noUp: i - 1 < lo, noDown: i + 1 >= hi,
        onSelect: () => this.setState({ selectedId: s.id, panel: 'fields', focusKey: null }),
        onUp: e => { e.stopPropagation(); this.move(s.id, -1); }, onDown: e => { e.stopPropagation(); this.move(s.id, 1); },
        onKey: e => { if (locked) return; if (e.altKey && e.key === 'ArrowUp') { e.preventDefault(); this.move(s.id, -1); } if (e.altKey && e.key === 'ArrowDown') { e.preventDefault(); this.move(s.id, 1); } if (e.key === 'Enter') this.setState({ selectedId: s.id, panel: 'fields' }); }
      };
    });

    // selected section fields
    const selSec = S.find(s => s.id === st.selectedId);
    let sel = {};
    if (selSec) {
      const d = libDef(selSec.type), idx = S.indexOf(selSec);
      const regDef = getRegistryDef(selSec.type);
      const o = k => ({ locked, showErrors: st.showErrors, focus: st.focusKey === k });
      const fields = regDef ? [] : d.fields.map(f => this.fieldView(f, selSec.v[f.k], val => this.editSection(selSec.id, s => { s.v[f.k] = val; return s; }, f.t === 'text' || f.t === 'textarea' || f.t === 'video' ? selSec.id + f.k : null), o(f.k)));
      let itemList = [];
      if (d.items) {
        const n = selSec.items.length;
        itemList = selSec.items.map((it, j) => ({
          title: `${d.items.l} ${j + 1}`, noUp: locked || j === 0, noDown: locked || j === n - 1, noRemove: locked || n <= d.items.min,
          onUp: () => this.editSection(selSec.id, s => { [s.items[j - 1], s.items[j]] = [s.items[j], s.items[j - 1]]; return s; }),
          onDown: () => this.editSection(selSec.id, s => { [s.items[j + 1], s.items[j]] = [s.items[j], s.items[j + 1]]; return s; }),
          onRemove: () => this.editSection(selSec.id, s => { s.items.splice(j, 1); return s; }),
          fields: d.items.fields.map(f => this.fieldView(f, it[f.k], val => this.editSection(selSec.id, s => { s.items[j][f.k] = val; return s; }, selSec.id + j + f.k), { locked, showErrors: st.showErrors, focus: false }))
        }));
      }
      const n = selSec.items.length;
      sel = {
        name: d.name, cat: d.cat, num: idx + 1, fields, noFields: !regDef && !d.fields.length && !d.items,
        showRegistryFields: !!regDef,
        registrySection: regDef ? { id: selSec.id, type: selSec.type, props: selSec.v || {} } : null,
        pageId: st.pageId,
        onRegistryChange: regDef ? props => this.editSection(selSec.id, s => { s.v = props; return s; }) : null,
        noReplace: regDef ? REGISTRY_PICKER_LIB.filter(l => l.cat === d.cat).length < 2 : !!d.single && LIB.filter(l => l.cat === d.cat).length < 2, noDuplicate: !!d.single && !regDef,
        onReplace: () => this.openPicker({ cat: d.cat, mode: 'replace', replaceId: selSec.id, preview: regDef ? (REGISTRY_PICKER_LIB.find(l => l.cat === d.cat && l.type !== selSec.type) || REGISTRY_PICKER_LIB[0]).type : (LIB.find(l => l.cat === d.cat && l.type !== d.type) || d).type }),
        onDuplicate: () => this.duplicate(selSec.id), onRemove: () => this.remove(selSec.id),
        hasItems: !!d.items, itemList, itemsLabel: d.items ? d.items.pl : '',
        itemsCount: d.items ? `${n} of ${d.items.min}–${d.items.max}` : '', itemsCountColor: d.items && n < d.items.min ? 'var(--color-danger)' : 'var(--color-neutral-700)',
        noAddItem: locked || !d.items || n >= d.items.max, addItemLabel: d.items ? `Add ${d.items.l.toLowerCase()}` : '',
        onAddItem: () => this.editSection(selSec.id, s => { s.items.push(clone(d.items.blank)); return s; })
      };
    }

    // picker
    let pk = {};
    if (st.dialog === 'picker' && st.picker) {
      const P = st.picker, isRep = P.mode === 'replace', q = P.q.trim().toLowerCase();
      const PL = this.pickerLib();
      const catList = this.props.useRegistryPicker ? REGISTRY_CATS : CATS;
      const match = l => !q || (l.name + ' ' + l.desc + ' ' + l.cat).toLowerCase().includes(q);
      const list = PL.filter(l => (P.cat === 'All' || l.cat === P.cat) && match(l)).map(l => {
        const un = this.unavailable(l.type), cur = isRep && S.find(s => s.id === P.replaceId).type === l.type;
        const sample = this.props.useRegistryPicker ? registrySampleSection(l.type) : SAMPLE[l.type];
        return { name: l.name, cat: l.cat, sample, note: un ? 'On page' : cur ? 'Current' : l.pin ? `Pinned ${l.pin}` : '', bd: P.preview === l.type ? 'var(--color-accent)' : 'transparent', opacity: un ? 0.45 : 1, onClick: () => this.setState({ picker: Object.assign({}, P, { preview: l.type }) }) };
      });
      const pdReg = getRegistryDef(P.preview);
      const pdLib = BY[P.preview];
      const pd = pdReg || pdLib;
      const before = S[P.insertAt - 1];
      const beforeMeta = before ? libDef(before.type) : null;
      const insertLabel = isRep ? `Replacing ${libDef(S.find(s => s.id === P.replaceId).type).name}. Fields with the same name keep their content.`
        : pdReg ? `Inserts at position ${P.insertAt + 1}${beforeMeta ? `, after ${beforeMeta.name}` : ''}.`
        : pd && pdLib && pdLib.pin ? `${pdLib.name} is always placed at the ${pdLib.pin}.` : `Inserts at position ${P.insertAt + 1}${beforeMeta ? `, after ${beforeMeta.name}` : ''}.`;
      const cats = catList.map(c => {
        const active = P.cat === c, disabled = isRep && c !== P.cat;
        return { label: c, count: c === 'All' ? PL.length : PL.filter(l => l.cat === c).length, disabled, opacity: disabled ? 0.4 : 1,
          bg: active ? 'var(--color-text)' : 'transparent', fg: active ? 'var(--color-bg)' : 'var(--color-text)', bd: active ? 'var(--color-text)' : 'var(--color-divider)',
          bar: active ? 'var(--color-accent)' : 'transparent', rowBg: active ? 'var(--color-accent-100)' : 'transparent',
          onClick: () => this.setState({ picker: Object.assign({}, P, { cat: c }) }) };
      });
      const prevDisabled = pd ? (this.unavailable(pdReg ? pdReg.type : pdLib.type) || (isRep && S.find(s => s.id === P.replaceId).type === (pdReg ? pdReg.type : pdLib.type))) : true;
      pk = {
        title: isRep ? 'Replace section' : 'Add a section', insertLabel, q: P.q, onQ: e => this.setState({ picker: Object.assign({}, P, { q: e.target.value }) }),
        cats, list, empty: list.length === 0, hasPrev: !!pd,
        prev: pd ? { name: pdReg ? pdReg.name : pdLib.name, cat: pdReg ? pdReg.category : pdLib.cat, desc: pdReg ? pdReg.description : pdLib.desc, sample: pdReg ? registrySampleSection(P.preview) : SAMPLE[P.preview], disabled: prevDisabled, fieldList: pdReg ? pdReg.fields.map(f => f.label).join(', ') : [...pdLib.fields.map(f => f.l), ...(pdLib.items ? [`${pdLib.items.pl} (${pdLib.items.min}–${pdLib.items.max})`] : [])].join(', ') || 'None. Managed by the operator.' } : {},
        addLabel: isRep ? 'Replace' : prevDisabled ? 'Already on page' : 'Add section', onAdd: () => this.addFromPicker(),
        prevZoom: 0.55, modalZoom: 0.5
      };
    }

    // issues
    const issues = st.dialog === 'issues' ? this.checks() : [];
    const iss = {
      list: issues.map(i => ({ kind: i.kind, where: i.where, text: i.text, fixLabel: i.fixLabel, onFix: i.fix })),
      clear: issues.length === 0, blocked: issues.length > 0,
      title: issues.length ? `${issues.length} ${issues.length === 1 ? 'issue blocks' : 'issues block'} review` : 'Ready for review',
      sub: issues.length ? 'Fix these and request review again. The list updates as you go.' : 'All checks pass on the saved revision.'
    };

    // revisions
    const revList = p ? p.revisions.map((r, i) => {
      const tag = p.liveRev === r.n && p.status === 'Published' ? 'Live' : p.reviewRev === r.n && p.status === 'In review' ? 'In review' : (i === 0 && !st.dirty ? 'Current' : '');
      return { n: r.n, time: r.time, by: r.by, tag, hasTag: !!tag, dot: i === 0 ? 'var(--color-text)' : 'var(--color-neutral-400)', canRestore: !locked && !(i === 0 && !st.dirty),
        onRestore: () => { this.commit(clone(r.sections), null); this.setState({ dialog: null, panel: 'outline' }); this.toast(`Revision ${r.n} loaded as unsaved changes`); } };
    }) : [];

    // operator review
    let rv = {};
    if (st.screen === 'review' && p) {
      const claims = [];
      S.forEach(s => {
        if (s.type === 'metrics') claims.push({ id: s.id, title: `Metrics: ${s.items.map(i => i.value).join(', ')}`, detail: `Source: ${s.v.source || 'none given'}` });
        if (s.type === 'testimonial') claims.push({ id: s.id, title: `Quote from ${s.v.name}`, detail: 'Marketer confirmed the client approved publication.' });
      });
      const inReview = p.status === 'In review';
      const okAll = claims.every(c => st.claimsOk[c.id]);
      const media = [];
      S.forEach(s => BY[s.type].fields.forEach(f => { const v = s.v[f.k]; if (f.t === 'image' && v && v.src) media.push({ name: v.src, alt: v.alt || 'missing' }); if (f.t === 'video' && v) media.push({ name: v, alt: 'video link' }); }));
      rv = {
        inReview, isLive: p.status === 'Published', isOff: p.status === 'Unpublished', noPublish: !okAll,
        submitted: inReview ? `Submitted by ${p.by} · ${p.submitted || p.updated} · revision ${p.reviewRev}` : `${p.status} · last change ${p.updated} by ${p.by}`,
        checks: ['Required fields complete', 'Required media present with alt text', 'Header, final CTA and footer in place', `Slug /${p.slug} is free on Webflow`],
        claims: claims.map(c => ({ title: c.title, detail: c.detail, checked: !!st.claimsOk[c.id] || !inReview, disabled: !inReview, bd: st.claimsOk[c.id] || !inReview ? 'var(--color-surface)' : 'var(--color-accent-300)',
          onToggle: e => this.setState(s2 => ({ claimsOk: Object.assign({}, s2.claimsOk, { [c.id]: e.target.checked }) })) })),
        claimCount: `${claims.filter(c => st.claimsOk[c.id] || !inReview).length} of ${claims.length} verified`,
        media, publishHint: okAll ? `Publishing makes revision ${p.reviewRev} live at https://www.stndrdcoach.com/${p.slug}. The slug locks after the first publication.` : 'Verify each claim to enable Publish.'
      };
    }
    const pubDone = st.publishStep >= STEPS.length;
    const pub = {
      done: pubDone, notDone: !pubDone, url: p ? `https://www.stndrdcoach.com/${p.slug}` : '',
      title: pubDone ? 'Published' : 'Publishing…', sub: pubDone ? 'The live check confirmed the approved revision is being served.' : 'The previous live version stays in place if any step fails.',
      steps: STEPS.map((l, i) => { const done = i < st.publishStep, active = i === st.publishStep; return { label: l, done, state: active ? 'In progress' : '', color: done || active ? 'var(--color-text)' : 'var(--color-neutral-600)', boxBg: done ? 'var(--color-text)' : 'transparent', boxBd: done ? 'var(--color-text)' : active ? 'var(--color-accent)' : 'var(--color-neutral-400)' }; })
    };
    let cf = {};
    if (st.dialog === 'confirm' && st.confirm === 'unpublish' && p) cf = { title: 'Unpublish this page?', body: `/${p.slug} will return a 404. The path stays reserved for this page, so no Webflow page can appear there. Drafts and history are kept.`, cta: 'Unpublish', onConfirm: () => { this.updatePage(pp => Object.assign({}, pp, { status: 'Unpublished', updated: 'Just now', by: 'Operator' })); this.setState({ dialog: null }); this.toast(`Unpublished. /${p.slug} now returns 404.`); } };
    if (st.dialog === 'confirm' && st.confirm === 'restore' && p) cf = { title: 'Restore publication?', body: `Revision ${p.wasLive || p.liveRev} was the last approved version of /${p.slug}. Restoring makes it live again without changing the current draft.`, cta: 'Restore', onConfirm: () => { this.updatePage(pp => Object.assign({}, pp, { status: 'Published', updated: 'Just now', by: 'Operator' })); this.setState({ dialog: null }); this.toast(`Revision ${p.wasLive || p.liveRev} restored at /${p.slug}`); } };

    const reviewCount = st.pages.filter(x => x.status === 'In review').length;
    const isEditor = st.screen === 'editor';
    return {
      rootHeight: this.props.embedded ? '100%' : '100vh',
      isDashboard: st.screen === 'dashboard', isEditor, isReview: st.screen === 'review',
      isMarketer: st.role === 'marketer', isOperator: st.role === 'operator', isShell: !isEditor,
      userName: st.role === 'operator' ? 'Operator' : 'Maya R. · Marketer', roleLabel: st.role === 'operator' ? 'Operator' : 'Marketer',
      shellTitle: st.screen === 'review' ? 'Review and publish' : 'Pages', pageCount: String(st.pages.length).padStart(2, '0'),
      dashSub: st.role === 'operator' ? 'Review submitted pages and publish them to stndrdcoach.com.' : 'Build, review and publish STNDRD Coach landing pages.', initials: st.role === 'operator' ? 'OP' : 'MR',
      roleTabs: { mBg: st.role === 'marketer' ? '#f2f1ec' : 'transparent', mFg: st.role === 'marketer' ? '#161614' : '#c9c7bf', oBg: st.role === 'operator' ? '#f2f1ec' : 'transparent', oFg: st.role === 'operator' ? '#161614' : '#c9c7bf' },
      setMarketer: () => this.setState({ role: 'marketer', screen: 'dashboard', dialog: null }),
      setOperator: () => this.setState({ role: 'operator', screen: 'dashboard', dialog: null }),
      reviewCountLabel: reviewCount ? `${reviewCount} ${reviewCount === 1 ? 'page' : 'pages'} waiting for review` : 'Nothing waiting for review',
      reviewCount: String(reviewCount), pagesView, kpis,
      landingTemplate: {
        name: LANDING_TEMPLATE.name,
        stack: LANDING_TEMPLATE.stack,
        description: LANDING_TEMPLATE.description,
        onStart: () => this.setState({ dialog: 'create', create: { name: '', slug: '', theme: 'dark', touched: false, from: null, check: 'done' } }),
      },
      onCreate: () => this.setState({ dialog: 'create', create: { name: '', slug: '', theme: 'dark', touched: false, from: null, check: 'done' } }),
      goDashboard: () => { clearInterval(this._pt); this.setState({ screen: 'dashboard', dialog: null, pageId: null }); },
      pg, dirty: st.dirty, locked, unlocked: !locked,
      lockText: p ? `Revision ${p.reviewRev} was sent on ${p.submitted}. Editing is locked until an operator publishes it or returns it to you.` : '',
      hasReturnNote: isEditor && !!(p && p.note), returnNoteText: p && p.note ? p.note : '', dismissNote: () => this.updatePage(pp => Object.assign({}, pp, { note: null })),
      undoDisabled: locked || !st.undo.length, redoDisabled: locked || !st.redo.length, saveDisabled: locked || !st.dirty,
      onUndo: () => this.undo(), onRedo: () => this.redo(), onSave: () => this.save(), onRequestReview: () => this.requestReview(),
      openRevisions: () => this.setState({ dialog: 'revisions' }),
      devTabs: { dBg: device === 'desktop' ? ON.bg : OFF.bg, dFg: device === 'desktop' ? ON.fg : OFF.fg, mBg: device === 'mobile' ? ON.bg : OFF.bg, mFg: device === 'mobile' ? ON.fg : OFF.fg },
      setDesktop: () => this.setState({ device: 'desktop' }), setMobile: () => this.setState({ device: 'mobile' }),
      layoutB, showRightOutline: !layoutB, showRailOutline: layoutB && !(selSec && st.panel === 'fields'),
      showFields: !!selSec && (!layoutB || st.panel === 'fields'), showNoSelection: !layoutB && !selSec,
      noSelectionText: S.length ? 'Click a section on the page or in the outline to edit its fields.' : 'Add a section to start. Its fields will appear here.',
      backToOutline: () => this.setState({ panel: 'outline', selectedId: null }),
      sel, sectionCount: S.length, outline, canvas, hasSections: S.length > 0, noSections: S.length === 0,
      canvasCaption: device === 'desktop' ? `Desktop preview · 1280 px shown at ${Math.round(zoom * 100)}%` : 'Mobile preview · 390 px',
      canvasRef: this.canvasRef, frameWidth: device === 'desktop' ? '100%' : '390px', innerWidth: device === 'desktop' ? '1280px' : '100%', zoom, device, theme,
      pageBg: theme === 'dark' ? '#0f0f0e' : '#ffffff',
      openPickerEnd: () => this.openPicker({ insertAt: hi }),
      dlgCreate: st.dialog === 'create', cr,
      pickerPanel: st.dialog === 'picker' && pickerStyle === 'panel', pickerModal: st.dialog === 'picker' && pickerStyle === 'modal', pk,
      dlgRevisions: st.dialog === 'revisions', revList, noRevisions: revList.length === 0,
      dlgIssues: st.dialog === 'issues', iss,
      dlgReviewSent: st.dialog === 'reviewSent', reviewSentText: p ? `Revision ${p.reviewRev} of ${p.name} is with the operator. Editing is locked until they publish it at stndrdcoach.com/${p.slug} or return it with notes.` : '',
      rv, openReturn: () => this.setState({ dialog: 'return', returnNote: '' }),
      dlgReturn: st.dialog === 'return', returnNote: st.returnNote, onReturnNote: e => this.setState({ returnNote: e.target.value }), returnDisabled: !st.returnNote.trim(),
      confirmReturn: () => { const note = st.returnNote; this.updatePage(pp => Object.assign({}, pp, { status: 'Draft', note, updated: 'Just now', by: 'Operator' })); this.setState({ dialog: null, screen: 'dashboard' }); this.toast('Returned to the marketer with your note'); },
      openUnpublish: () => this.setState({ dialog: 'confirm', confirm: 'unpublish' }), openRestore: () => this.setState({ dialog: 'confirm', confirm: 'restore' }),
      dlgConfirm: st.dialog === 'confirm', cf,
      startPublish: this.startPublish, dlgPublish: st.dialog === 'publish', pub,
      finishPublish: () => { const u = pub.url; this.setState({ dialog: null, screen: 'dashboard' }); this.toast(`Live at ${u}`); },
      closeDialog: () => this.setState({ dialog: null }),
      hasToast: !!st.toast, toast: st.toast || '',
      mobilePreview: device === 'mobile' && S.length > 0,
      previewSections: S,
      previewSelectedId: st.selectedId,
      onPreviewSelect: id => this.setState({ selectedId: id, panel: 'fields', focusKey: null }),
    };
  }

  render() {
    const vals = { ...this.props, ...this.renderVals() };
    const { backToOutline, canvas, canvasCaption, canvasRef, cf, closeDialog, confirmReturn, cr, dashSub, devTabs, device, dirty, dismissNote, dlgConfirm, dlgCreate, dlgIssues, dlgPublish, dlgReturn, dlgReviewSent, dlgRevisions, finishPublish, frameWidth, goDashboard, hasReturnNote, hasSections, hasToast, initials, innerWidth, isDashboard, isEditor, isMarketer, isOperator, isReview, isShell, iss, kpis, landingTemplate, layoutB, lockText, locked, mobilePreview, noRevisions, noSections, noSelectionText, onCreate, onPreviewSelect, onRedo, onRequestReview, onReturnNote, onSave, onUndo, openPickerEnd, openRestore, openReturn, openRevisions, openUnpublish, outline, pageBg, pageCount, pagesView, pg, pickerModal, pickerPanel, pk, previewSections, previewSelectedId, pub, redoDisabled, returnDisabled, returnNote, returnNoteText, revList, reviewCount, reviewSentText, roleLabel, roleTabs, rootHeight, rv, saveDisabled, sectionCount, sel, setDesktop, setMarketer, setMobile, setOperator, shellTitle, showFields, showNoSelection, showRailOutline, showRightOutline, startPublish, theme, toast, undoDisabled, unlocked, userName, zoom } = vals;
    return (
      <>
      <div style={{ position: "relative", height: rootHeight, display: "flex", flexDirection: "row", overflow: "hidden", background: "var(--color-bg)", color: "var(--color-text)", fontFamily: "var(--font-body)", fontSize: "14px" }}>
        {isShell && (
          <>
            <div style={{ width: "228px", flex: "none", background: "#1b1b19", color: "#f2f1ec", display: "flex", flexDirection: "column", padding: "18px 14px", gap: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 6px" }}>
                <div style={{ width: "30px", height: "30px", borderRadius: "7px", background: "var(--color-accent)", color: "var(--color-text)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: "700", fontSize: "16px" }}>
                  S
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "15px", letterSpacing: "0.02em" }}>
                    STNDRD
                  </div>
                  <div style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9c9a92" }}>
                    Page Studio
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <button onClick={goDashboard} style={{ font: "inherit", fontSize: "13px", display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", border: "0", borderRadius: "8px", cursor: "pointer", textAlign: "left", background: "#2c2c29", color: "#ffffff" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M10 13H8" />
                    <path d="M16 17H8" />
                  </svg>
                  Pages
                </button>
                {isOperator && (
                  <>
                    <div style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", color: "#c9c7bf" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 11l3 3L22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                      <span style={{ marginRight: "auto" }}>
                        Review queue
                      </span>
                      <span style={{ minWidth: "20px", height: "20px", borderRadius: "10px", background: "var(--color-accent)", color: "var(--color-text)", fontSize: "11px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {reviewCount}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div style={{ background: "#262624", border: "1px solid #34342f", borderRadius: "10px", padding: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent)", fontWeight: "600" }}>
                  STNDRD workspace
                </div>
                <div style={{ fontSize: "12px", lineHeight: "1.45", color: "#b8b6ae", textWrap: "pretty" }}>
                  stndrdcoach.com · Pages publish alongside the Webflow site.
                </div>
              </div>
              <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", background: "#262624", borderRadius: "8px", padding: "3px" }}>
                  <button onClick={setMarketer} style={{ font: "inherit", fontSize: "12px", flex: "1", padding: "6px 8px", border: "0", borderRadius: "6px", cursor: "pointer", textAlign: "left", background: roleTabs.mBg, color: roleTabs.mFg }}>
                    Marketer
                  </button>
                  <button onClick={setOperator} style={{ font: "inherit", fontSize: "12px", flex: "1", padding: "6px 8px", border: "0", borderRadius: "6px", cursor: "pointer", textAlign: "left", background: roleTabs.oBg, color: roleTabs.oFg }}>
                    Operator
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 4px" }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#3a3a36", color: "#f2f1ec", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "600", fontSize: "11px" }}>
                    {initials}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                    <div style={{ fontSize: "12px", fontWeight: "600" }}>
                      {userName}
                    </div>
                    <div style={{ fontSize: "11px", color: "#9c9a92" }}>
                      STNDRD Coach
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", minHeight: "0" }}>
          {isShell && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "0 28px", height: "56px", flex: "none", background: "var(--color-surface)", borderBottom: "1px solid var(--color-divider)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginRight: "auto" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "15px" }}>
                    {shellTitle}
                  </div>
                  <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-neutral-600)" }}>
                    STNDRD Coach / {roleLabel}
                  </div>
                </div>
                {isDashboard && (
                  <>
                    {isMarketer && (
                      <>
                        <button onClick={onCreate} style={{ padding: "9px 14px", justifyContent: "flex-start", background: "var(--color-accent)", color: "var(--color-text)", borderRadius: "8px" }} className="btn ps-h1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                          Create page
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </>
          )}
          {isDashboard && (
            <>
              <div style={{ flex: "1", overflow: "auto" }}>
                <div style={{ maxWidth: "1240px", padding: "32px 32px 80px", display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "24px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginRight: "auto" }}>
                      <h1 style={{ margin: "0", fontSize: "34px", letterSpacing: "-0.02em" }}>
                        Landing pages
                      </h1>
                      <div style={{ fontSize: "14px", color: "var(--color-neutral-700)" }}>
                        {dashSub}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "22px", fontWeight: "500" }}>
                        {pageCount}
                      </div>
                      <div style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-neutral-600)" }}>
                        Pages
                      </div>
                    </div>
                  </div>
                  {isMarketer && landingTemplate && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: "600" }}>
                        Starter template
                      </div>
                      <button
                        type="button"
                        onClick={landingTemplate.onStart}
                        style={{ font: "inherit", textAlign: "left", cursor: "pointer", padding: "16px 18px", display: "flex", gap: "16px", alignItems: "center", background: "var(--color-surface)", border: "1px solid var(--color-divider)", color: "var(--color-text)", borderRadius: "10px" }}
                      >
                        <div style={{ width: "132px", height: "76px", flex: "none", borderRadius: "6px", background: "#0f0f0e", border: "1px solid var(--color-divider)", padding: "10px 8px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                          <div style={{ height: "6px", width: "70%", background: "#f4f2ec", borderRadius: "2px" }} />
                          <div style={{ height: "4px", width: "100%", background: "#3a3a36", borderRadius: "1px" }} />
                          <div style={{ height: "4px", width: "88%", background: "#3a3a36", borderRadius: "1px" }} />
                          <div style={{ height: "8px", width: "36%", background: "#ffd21f", borderRadius: "2px" }} />
                          <div style={{ height: "4px", width: "50%", background: "#2a2a26", borderRadius: "1px" }} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
                          <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "16px" }}>
                            {landingTemplate.name}
                          </div>
                          <div style={{ fontSize: "13px", color: "var(--color-neutral-700)" }}>
                            {landingTemplate.description}
                          </div>
                          <div style={{ fontSize: "11px", color: "var(--color-neutral-600)" }}>
                            {landingTemplate.stack}
                          </div>
                        </div>
                      </button>
                    </div>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {(pagesView || []).map((p, $index) => (
                      <React.Fragment key={p?.id ?? $index}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 18px", alignItems: "center", padding: "10px 14px 10px 10px", background: "var(--color-surface)", border: "1px solid var(--color-divider)", borderRadius: "10px" }}>
                          <button onClick={p.onOpen} title="Open" style={{ flex: "none", width: "112px", height: "64px", borderRadius: "6px", border: "1px solid var(--color-divider)", padding: "10px", cursor: "pointer", background: p.sw1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "5px" }}>
                            <div style={{ width: "70%", height: "6px", borderRadius: "2px", background: p.thumbInk }} />
                            <div style={{ width: "45%", height: "6px", borderRadius: "2px", background: p.thumbInk }} />
                            <div style={{ width: "30%", height: "8px", borderRadius: "2px", background: p.sw2 }} />
                          </button>
                          <div style={{ flex: "2 1 220px", display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                              <button onClick={p.onOpen} style={{ font: "inherit", textAlign: "left", background: "none", border: "0", padding: "0", cursor: "pointer", fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "15px", color: "var(--color-text)" }}>
                                {p.name}
                              </button>
                              {p.hasChanges && (
                                <>
                                  <span style={{ fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: "600", padding: "3px 8px", borderRadius: "999px", background: "var(--color-accent)", color: "var(--color-text)" }}>
                                    Unpublished changes
                                  </span>
                                </>
                              )}
                            </div>
                            {p.isLive && (
                              <>
                                <a href="#" style={{ fontFamily: "var(--font-mono)", fontSize: "12px", overflowWrap: "anywhere", color: "var(--color-text)" }}>
                                  {p.url}
                                </a>
                              </>
                            )}
                            {p.notLive && (
                              <>
                                <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--color-neutral-700)", overflowWrap: "anywhere" }}>
                                  {p.url}
                                </div>
                              </>
                            )}
                            <div style={{ fontSize: "11px", color: "var(--color-neutral-600)" }}>
                              Updated {p.updated} · {p.themeLabel} theme
                            </div>
                          </div>
                          <div style={{ display: "flex", flex: "0 0 120px" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: "600", padding: "4px 9px", borderRadius: "999px", background: p.tag.bg, color: p.tag.fg, border: `1px solid ${p.tag.bd ?? ""}` }}>
                              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "currentColor" }} />
                              {p.status}
                            </span>
                          </div>
                          <div style={{ flex: "1 1 150px", display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}>
                              {p.revLine}
                            </div>
                            <div style={{ fontSize: "11px", color: "var(--color-neutral-600)" }}>
                              {p.urlNote}
                            </div>
                          </div>
                          <div style={{ flex: "1 1 200px", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "10px", fontVariantNumeric: "tabular-nums" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                              <div style={{ fontSize: "13px", fontWeight: "600", color: p.mColor }}>
                                {p.visits}
                              </div>
                              <div style={{ fontSize: "10px", color: p.trendColor }}>
                                {p.trend}
                              </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                              <div style={{ fontSize: "13px", fontWeight: "600", color: p.mColor }}>
                                {p.ctr}
                              </div>
                              <div style={{ fontSize: "10px", color: "var(--color-neutral-600)" }}>
                                CTR
                              </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                              <div style={{ fontSize: "13px", fontWeight: "600", color: p.mColor }}>
                                {p.conv}
                              </div>
                              <div style={{ fontSize: "10px", color: "var(--color-neutral-600)" }}>
                                Conv.
                              </div>
                            </div>
                          </div>
                          <div style={{ flex: "none", marginLeft: "auto", display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                            <button onClick={p.onOpen} style={{ padding: "7px 11px", justifyContent: "flex-start" }} className="btn btn-secondary">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                              </svg>
                              {p.openLabel}
                            </button>
                            {p.canDuplicate && (
                              <>
                                <button onClick={p.onDuplicate} style={{ padding: "7px 11px", justifyContent: "flex-start" }} className="btn btn-secondary">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="14" height="14" x="8" y="8" rx="2" />
                                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                  </svg>
                                  Duplicate
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                  {isMarketer && !(pagesView || []).length && (
                    <div style={{ fontSize: "13px", color: "var(--color-neutral-600)" }}>
                      No pages yet. Use the starter template to create one.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {isEditor && (
            <>
              <div style={{ flex: "1", display: "flex", flexDirection: "column", minHeight: "0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 16px", flex: "none", borderBottom: "1px solid var(--color-divider)" }}>
                  <button onClick={goDashboard} title="Back to pages" className="btn btn-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <div style={{ display: "flex", flexDirection: "column", minWidth: "0", marginRight: "auto" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "16px" }}>
                        {pg.name}
                      </div>
                      <span style={{ fontSize: "11px", padding: "2px 8px", background: pg.tag.bg, color: pg.tag.fg, border: `1px solid ${pg.tag.bd ?? ""}`, borderRadius: "10px" }}>
                        {pg.status}
                      </span>
                      {dirty && (
                        <>
                          <span style={{ fontSize: "12px", color: "var(--color-neutral-700)" }}>
                            Unsaved changes
                          </span>
                        </>
                      )}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--color-neutral-700)" }}>
                      {pg.url}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "2px" }}>
                    <button onClick={onUndo} disabled={undoDisabled} title="Undo (Ctrl+Z)" className="btn btn-icon">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                        <path d="M9 14 4 9l5-5" />
                        <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
                      </svg>
                    </button>
                    <button onClick={onRedo} disabled={redoDisabled} title="Redo" className="btn btn-icon">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                        <path d="m15 14 5-5-5-5" />
                        <path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13" />
                      </svg>
                    </button>
                    <button onClick={openRevisions} title="Revision history" className="btn btn-icon">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                        <path d="M12 7v5l4 2" />
                      </svg>
                    </button>
                  </div>
                  <div style={{ display: "flex", border: "1px solid var(--color-divider)", borderRadius: "10px" }}>
                    <button onClick={setDesktop} title="Desktop preview" style={{ display: "flex", alignItems: "center", gap: "6px", font: "inherit", fontSize: "12px", padding: "7px 10px", border: "0", cursor: "pointer", background: devTabs.dBg, color: devTabs.dFg }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="20" height="14" x="2" y="3" />
                        <path d="M8 21h8" />
                        <path d="M12 17v4" />
                      </svg>
                      Desktop
                    </button>
                    <button onClick={setMobile} title="Mobile preview" style={{ display: "flex", alignItems: "center", gap: "6px", font: "inherit", fontSize: "12px", padding: "7px 10px", border: "0", borderLeft: "1px solid var(--color-divider)", cursor: "pointer", background: devTabs.mBg, color: devTabs.mFg }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="14" height="20" x="5" y="2" />
                        <path d="M12 18h.01" />
                      </svg>
                      Mobile
                    </button>
                  </div>
                  <button onClick={onSave} disabled={saveDisabled} style={{ minWidth: "72px", justifyContent: "flex-start" }} className="btn btn-secondary">
                    Save
                  </button>
                  <button onClick={onRequestReview} disabled={locked} style={{ minWidth: "140px", justifyContent: "flex-start" }} className="btn btn-primary">
                    Request review
                  </button>
                </div>
                {locked && (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 20px", background: "var(--color-text)", color: "var(--color-bg)", fontSize: "13px", flex: "none" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="18" height="11" x="3" y="11" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <div>
                        <strong>
                          In review.
                        </strong>
                        {lockText}
                      </div>
                    </div>
                  </>
                )}
                {hasReturnNote && (
                  <>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "12px", padding: "10px 20px", background: "var(--color-accent-100)", color: "var(--color-accent-900)", fontSize: "13px", flex: "none", borderBottom: "1px solid var(--color-accent-300)" }}>
                      <strong style={{ flex: "none" }}>
                        Returned by operator
                      </strong>
                      <div style={{ marginRight: "auto" }}>
                        {returnNoteText}
                      </div>
                      <button onClick={dismissNote} style={{ color: "var(--color-accent-800)" }} className="btn btn-ghost">
                        Dismiss
                      </button>
                    </div>
                  </>
                )}
                <div style={{ flex: "1", display: "flex", minHeight: "0", position: "relative" }}>
                  <div style={{ width: "360px", flex: "none", borderRight: "1px solid var(--color-divider)", display: "flex", flexDirection: "column", minHeight: "0", background: "var(--color-bg)" }}>
                    {showRailOutline && (
                      <>
                        <div style={{ flex: "1", overflow: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
                          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                            <div style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
                              Sections · {sectionCount}
                            </div>
                            <div style={{ fontSize: "11px", color: "var(--color-neutral-600)" }}>
                              Alt + ↑↓ to move
                            </div>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--color-divider)" }}>
                            {(outline || []).map((o, $index) => (
                              <React.Fragment key={o?.id ?? $index}>
                                <div tabIndex="0" onKeyDown={o.onKey} onClick={o.onSelect} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 8px", borderBottom: "1px solid var(--color-divider)", cursor: "pointer", background: o.bg }} className="ps-h2">
                                  <div style={{ width: "22px", fontSize: "11px", color: "var(--color-neutral-600)", flex: "none" }}>
                                    {o.num}
                                  </div>
                                  <div style={{ display: "flex", flexDirection: "column", flex: "1", minWidth: "0" }}>
                                    <div style={{ fontWeight: "600", fontSize: "13px" }}>
                                      {o.name}
                                    </div>
                                    <div style={{ fontSize: "11px", color: "var(--color-neutral-700)" }}>
                                      {o.meta}
                                    </div>
                                  </div>
                                  {o.hasIssue && (
                                    <>
                                      <div title="Needs attention" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-danger)", flex: "none" }} />
                                    </>
                                  )}
                                  {o.pinned && (
                                    <>
                                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-600)" strokeWidth="2">
                                        <rect width="18" height="11" x="3" y="11" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                      </svg>
                                    </>
                                  )}
                                  {o.movable && (
                                    <>
                                      <div style={{ display: "flex" }}>
                                        <button onClick={o.onUp} disabled={o.noUp} title="Move up" style={{ width: "26px", height: "26px" }} className="btn btn-icon">
                                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square">
                                            <path d="m5 12 7-7 7 7" />
                                            <path d="M12 19V5" />
                                          </svg>
                                        </button>
                                        <button onClick={o.onDown} disabled={o.noDown} title="Move down" style={{ width: "26px", height: "26px" }} className="btn btn-icon">
                                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square">
                                            <path d="M12 5v14" />
                                            <path d="m19 12-7 7-7-7" />
                                          </svg>
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </React.Fragment>
                            ))}
                          </div>
                          {unlocked && (
                            <>
                              <button onClick={openPickerEnd} style={{ padding: "10px 12px" }} className="btn btn-secondary btn-block">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square">
                                  <path d="M5 12h14" />
                                  <path d="M12 5v14" />
                                </svg>
                                Add section
                              </button>
                            </>
                          )}
                        </div>
                      </>
                    )}
                    {showFields && (
                      <>
                        <div style={{ flex: "1", overflow: "auto", display: "flex", flexDirection: "column" }}>
                          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-divider)", display: "flex", flexDirection: "column", gap: "10px", position: "sticky", top: "0", background: "var(--color-bg)", zIndex: "2" }}>
                            {layoutB && (
                              <>
                                <button onClick={backToOutline} style={{ alignSelf: "flex-start", marginLeft: "-4px", color: "var(--color-text)" }} className="btn btn-ghost">
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                                    <path d="m15 18-6-6 6-6" />
                                  </svg>
                                  All sections
                                </button>
                              </>
                            )}
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                              <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
                                {sel.cat} · Section {sel.num}
                              </div>
                              <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "18px" }}>
                                {sel.name}
                              </div>
                            </div>
                            {unlocked && (
                              <>
                                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                  <button onClick={sel.onReplace} disabled={sel.noReplace} style={{ padding: "6px 10px", fontSize: "12px" }} className="btn btn-secondary">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square">
                                      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                                      <path d="M21 3v5h-5" />
                                      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                                      <path d="M8 16H3v5" />
                                    </svg>
                                    Replace
                                  </button>
                                  <button onClick={sel.onDuplicate} disabled={sel.noDuplicate} style={{ padding: "6px 10px", fontSize: "12px" }} className="btn btn-secondary">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25">
                                      <rect width="14" height="14" x="8" y="8" />
                                      <path d="M4 16V4h12" />
                                    </svg>
                                    Duplicate
                                  </button>
                                  <button onClick={sel.onRemove} style={{ padding: "6px 10px", fontSize: "12px" }} className="btn btn-secondary">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square">
                                      <path d="M3 6h18" />
                                      <path d="M19 6v15H5V6" />
                                      <path d="M8 6V3h8v3" />
                                    </svg>
                                    Remove
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                          <div style={{ padding: "16px 20px 40px", display: "flex", flexDirection: "column", gap: "6px" }}>
                            {sel.showRegistryFields && sel.registrySection && (
                              <>
                                <StudioRegistryFields
                                  section={sel.registrySection}
                                  pageId={sel.pageId}
                                  readOnly={locked}
                                  onChange={sel.onRegistryChange}
                                />
                              </>
                            )}
                            {sel.noFields && !sel.showRegistryFields && (
                              <>
                                <div style={{ fontSize: "13px", color: "var(--color-neutral-700)", padding: "8px 0" }}>
                                  The operator manages this section’s content. There are no fields to edit.
                                </div>
                              </>
                            )}
                            {(sel.fields || []).map((f, $index) => (
                              <React.Fragment key={f?.id ?? $index}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "6px", padding: "10px 12px", margin: "0 -12px", background: f.focusBg }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", fontSize: "12px" }}>
                                    <div style={{ color: "var(--color-neutral-800)" }}>
                                      {f.label}
                                      <span style={{ color: "var(--color-danger)" }}>
                                        {f.reqMark}
                                      </span>
                                    </div>
                                    <div style={{ color: f.countColor }}>
                                      {f.count}
                                    </div>
                                  </div>
                                  {f.isText && (
                                    <>
                                      <input value={f.value} onChange={f.onChange} disabled={f.disabled} style={{ borderColor: f.borderColor }} className="input" />
                                    </>
                                  )}
                                  {f.isTextarea && (
                                    <>
                                      <textarea value={f.value} onChange={f.onChange} disabled={f.disabled} rows="3" style={{ minHeight: "72px", borderColor: f.borderColor }} className="input" />
                                    </>
                                  )}
                                  {f.isVideo && (
                                    <>
                                      <input value={f.value} onChange={f.onChange} disabled={f.disabled} placeholder="vimeo.com/123456789" style={{ borderColor: f.borderColor }} className="input" />
                                      <div style={{ fontSize: "11px", color: "var(--color-neutral-600)" }}>
                                        Vimeo links only. Paste the page URL, not embed code.
                                      </div>
                                    </>
                                  )}
                                  {f.isImage && (
                                    <>
                                      <div style={{ display: "flex", gap: "12px", alignItems: "center", padding: "8px", background: "var(--color-surface)", border: `1px solid ${f.borderColor ?? ""}`, borderRadius: "10px" }}>
                                        <div style={{ width: "52px", height: "52px", flex: "none", background: f.thumbBg, border: f.thumbBorder, borderRadius: "10px" }} />
                                        <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: "1", minWidth: "0" }}>
                                          <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: "12px", overflowWrap: "anywhere" }}>
                                            {f.imgName}
                                          </div>
                                          <div style={{ fontSize: "11px", color: "var(--color-neutral-600)" }}>
                                            JPEG, PNG or WebP · up to 10 MB
                                          </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                                          <button onClick={f.onUpload} disabled={f.disabled} style={{ fontSize: "12px" }} className="btn btn-ghost">
                                            {f.uploadLabel}
                                          </button>
                                          {f.canRemoveImg && (
                                            <>
                                              <button onClick={f.onRemoveImg} disabled={f.disabled} style={{ fontSize: "12px", color: "var(--color-neutral-700)" }} className="btn btn-ghost">
                                                Remove
                                              </button>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                      {f.hasImg && (
                                        <>
                                          <input value={f.alt} onChange={f.onAlt} disabled={f.disabled} placeholder="Alt text: describe the image for screen readers" style={{ fontSize: "13px" }} className="input" />
                                        </>
                                      )}
                                    </>
                                  )}
                                  {f.isConfirm && (
                                    <>
                                      <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "13px", cursor: "pointer", padding: "10px", background: "var(--color-surface)", border: `1px solid ${f.borderColor ?? ""}`, borderRadius: "10px" }}>
                                        <input type="checkbox" checked={f.checked} onChange={f.onCheck} disabled={f.disabled} style={{ accentColor: "var(--color-accent)", width: "16px", height: "16px", margin: "1px 0 0" }} />
                                        <span>
                                          {f.confirmText}
                                        </span>
                                      </label>
                                    </>
                                  )}
                                  {f.hasHelp && (
                                    <>
                                      <div style={{ fontSize: "11px", color: "var(--color-neutral-600)" }}>
                                        {f.help}
                                      </div>
                                    </>
                                  )}
                                  {f.hasError && (
                                    <>
                                      <div style={{ fontSize: "12px", color: "var(--color-danger)", fontWeight: "600" }}>
                                        {f.error}
                                      </div>
                                    </>
                                  )}
                                </div>
                              </React.Fragment>
                            ))}
                            {sel.hasItems && (
                              <>
                                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px", paddingTop: "14px", borderTop: "1px solid var(--color-divider)" }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "14px" }}>
                                      {sel.itemsLabel}
                                    </div>
                                    <div style={{ fontSize: "12px", color: sel.itemsCountColor }}>
                                      {sel.itemsCount}
                                    </div>
                                  </div>
                                  {(sel.itemList || []).map((it, $index) => (
                                    <React.Fragment key={it?.id ?? $index}>
                                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "10px 12px 12px", background: "var(--color-surface)" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                          <div style={{ fontSize: "12px", fontWeight: "600", marginRight: "auto" }}>
                                            {it.title}
                                          </div>
                                          <button onClick={it.onUp} disabled={it.noUp} title="Move up" style={{ width: "26px", height: "26px" }} className="btn btn-icon">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square">
                                              <path d="m5 12 7-7 7 7" />
                                              <path d="M12 19V5" />
                                            </svg>
                                          </button>
                                          <button onClick={it.onDown} disabled={it.noDown} title="Move down" style={{ width: "26px", height: "26px" }} className="btn btn-icon">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square">
                                              <path d="M12 5v14" />
                                              <path d="m19 12-7 7-7-7" />
                                            </svg>
                                          </button>
                                          <button onClick={it.onRemove} disabled={it.noRemove} title="Remove" style={{ width: "26px", height: "26px" }} className="btn btn-icon">
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square">
                                              <path d="M18 6 6 18" />
                                              <path d="m6 6 12 12" />
                                            </svg>
                                          </button>
                                        </div>
                                        {(it.fields || []).map((f, $index) => (
                                          <React.Fragment key={f?.id ?? $index}>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                                                <div style={{ color: "var(--color-neutral-800)" }}>
                                                  {f.label}
                                                  <span style={{ color: "var(--color-danger)" }}>
                                                    {f.reqMark}
                                                  </span>
                                                </div>
                                                <div style={{ color: f.countColor }}>
                                                  {f.count}
                                                </div>
                                              </div>
                                              {f.isText && (
                                                <>
                                                  <input value={f.value} onChange={f.onChange} disabled={f.disabled} style={{ background: "var(--color-bg)", borderColor: f.borderColor }} className="input" />
                                                </>
                                              )}
                                              {f.isTextarea && (
                                                <>
                                                  <textarea value={f.value} onChange={f.onChange} disabled={f.disabled} rows="2" style={{ minHeight: "56px", background: "var(--color-bg)", borderColor: f.borderColor }} className="input" />
                                                </>
                                              )}
                                              {f.hasError && (
                                                <>
                                                  <div style={{ fontSize: "12px", color: "var(--color-danger)", fontWeight: "600" }}>
                                                    {f.error}
                                                  </div>
                                                </>
                                              )}
                                            </div>
                                          </React.Fragment>
                                        ))}
                                      </div>
                                    </React.Fragment>
                                  ))}
                                  <button onClick={sel.onAddItem} disabled={sel.noAddItem} style={{ marginTop: "0" }} className="btn btn-secondary btn-block">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square">
                                      <path d="M5 12h14" />
                                      <path d="M12 5v14" />
                                    </svg>
                                    {sel.addItemLabel}
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    {showNoSelection && (
                      <>
                        <div style={{ flex: "1", padding: "24px 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                          <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "16px" }}>
                            No section selected
                          </div>
                          <div style={{ fontSize: "13px", color: "var(--color-neutral-700)", textWrap: "pretty" }}>
                            {noSelectionText}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div style={{ flex: "1", minWidth: "0", overflow: "auto", background: "var(--color-neutral-300)", padding: "28px 32px 64px" }}>
                    <div ref={canvasRef} style={{ margin: "0 auto", width: frameWidth, maxWidth: "100%", background: pageBg, boxShadow: "var(--shadow-md)", borderRadius: "14px" }}>
                      {noSections && (
                        <>
                          <div style={{ padding: "48px", display: "flex", flexDirection: "column", gap: "20px", background: "var(--color-bg)" }}>
                            <div style={{ border: "2px dashed var(--color-neutral-500)", padding: "56px 40px", display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start", borderRadius: "10px" }}>
                              <div style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
                                Blank page
                              </div>
                              <h2 style={{ margin: "0" }}>
                                Add your first section.
                              </h2>
                              <div style={{ fontSize: "14px", color: "var(--color-neutral-700)", maxWidth: "34em", textWrap: "pretty" }}>
                                Sections come from the STNDRD library. A page needs a site header, a final call to action and a legal footer before it can go to review. The header and footer pin themselves to the top and bottom.
                              </div>
                              <button onClick={openPickerEnd} style={{ marginTop: "8px", padding: "12px 16px", minWidth: "200px", justifyContent: "flex-start" }} className="btn btn-primary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square">
                                  <path d="M5 12h14" />
                                  <path d="M12 5v14" />
                                </svg>
                                Browse sections
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                      {mobilePreview ? (
                        <>
                          <MobileCanvasPreview
                            sections={previewSections}
                            theme={theme}
                            pageBg={pageBg}
                            selectedId={previewSelectedId}
                            onSelectSection={onPreviewSelect}
                          />
                        </>
                      ) : (canvas || []).map((cs, $index) => (
                        <React.Fragment key={cs?.id ?? $index}>
                          <div style={{ position: "relative" }}>
                            <div onClick={cs.onSelect} style={{ position: "relative", cursor: "pointer" }} className="ps-h3">
                              <div style={{ zoom: zoom, pointerEvents: "none" }}>
                                <div style={{ width: innerWidth }}>
                                  <Section section={cs.sec} theme={theme} device={device} />
                                </div>
                              </div>
                              <div style={{ position: "absolute", inset: "0", pointerEvents: "none", border: cs.ring }} />
                            </div>
                            {cs.active && (
                              <>
                                <div style={{ position: "absolute", top: "0", left: "0", background: "var(--color-accent)", color: "var(--color-text)", fontSize: "11px", fontWeight: "600", padding: "4px 8px", zIndex: "3" }}>
                                  {cs.label}
                                </div>
                                {cs.tools && (
                                  <>
                                    <div style={{ position: "absolute", top: "0", right: "0", display: "flex", background: "var(--color-text)", zIndex: "3" }}>
                                      <button onClick={cs.onUp} disabled={cs.noUp} title="Move up" style={{ width: "30px", height: "28px", border: "0", background: "none", color: "var(--color-bg)", cursor: "pointer", opacity: cs.upOpacity, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square">
                                          <path d="m5 12 7-7 7 7" />
                                          <path d="M12 19V5" />
                                        </svg>
                                      </button>
                                      <button onClick={cs.onDown} disabled={cs.noDown} title="Move down" style={{ width: "30px", height: "28px", border: "0", background: "none", color: "var(--color-bg)", cursor: "pointer", opacity: cs.downOpacity, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square">
                                          <path d="M12 5v14" />
                                          <path d="m19 12-7 7-7-7" />
                                        </svg>
                                      </button>
                                      <button onClick={cs.onAddAfter} title="Add section below" style={{ width: "30px", height: "28px", border: "0", background: "var(--color-accent)", color: "var(--color-text)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                                          <path d="M5 12h14" />
                                          <path d="M12 5v14" />
                                        </svg>
                                      </button>
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                            {cs.seam && (
                              <>
                                <button onClick={cs.onAddAfter} style={{ position: "absolute", left: "0", right: "0", bottom: "-7px", height: "14px", zIndex: "4", border: "0", padding: "0", font: "inherit", fontSize: "11px", fontWeight: "600", cursor: "pointer", background: "transparent", color: "transparent", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "12px" }} className="ps-h4">
                                  + Add section here
                                </button>
                              </>
                            )}
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                    {hasSections && (
                      <>
                        <div style={{ margin: "14px auto 0", width: frameWidth, maxWidth: "100%", fontSize: "12px", color: "var(--color-neutral-700)" }}>
                          {canvasCaption}
                        </div>
                      </>
                    )}
                  </div>
                  {showRightOutline && (
                    <>
                      <div style={{ width: "248px", flex: "none", borderLeft: "1px solid var(--color-divider)", overflow: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", background: "var(--color-bg)" }}>
                        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                          <div style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-neutral-700)" }}>
                            Outline · {sectionCount}
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--color-divider)" }}>
                          {(outline || []).map((o, $index) => (
                            <React.Fragment key={o?.id ?? $index}>
                              <div tabIndex="0" onKeyDown={o.onKey} onClick={o.onSelect} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 4px 8px 8px", borderBottom: "1px solid var(--color-divider)", cursor: "pointer", background: o.bg, borderLeft: `3px solid ${o.bar ?? ""}` }} className="ps-h5">
                                <div style={{ display: "flex", flexDirection: "column", flex: "1", minWidth: "0" }}>
                                  <div style={{ fontWeight: "600", fontSize: "12px" }}>
                                    {o.name}
                                  </div>
                                  <div style={{ fontSize: "11px", color: "var(--color-neutral-700)" }}>
                                    {o.cat}
                                  </div>
                                </div>
                                {o.hasIssue && (
                                  <>
                                    <div title="Needs attention" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--color-danger)", flex: "none" }} />
                                  </>
                                )}
                                {o.pinned && (
                                  <>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-600)" strokeWidth="2">
                                      <rect width="18" height="11" x="3" y="11" />
                                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                  </>
                                )}
                                {o.movable && (
                                  <>
                                    <div style={{ display: "flex" }}>
                                      <button onClick={o.onUp} disabled={o.noUp} title="Move up" style={{ width: "24px", height: "24px" }} className="btn btn-icon">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square">
                                          <path d="m5 12 7-7 7 7" />
                                          <path d="M12 19V5" />
                                        </svg>
                                      </button>
                                      <button onClick={o.onDown} disabled={o.noDown} title="Move down" style={{ width: "24px", height: "24px" }} className="btn btn-icon">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square">
                                          <path d="M12 5v14" />
                                          <path d="m19 12-7 7-7-7" />
                                        </svg>
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                        {unlocked && (
                          <>
                            <button onClick={openPickerEnd} style={{ marginTop: "0" }} className="btn btn-secondary btn-block">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square">
                                <path d="M5 12h14" />
                                <path d="M12 5v14" />
                              </svg>
                              Add section
                            </button>
                          </>
                        )}
                        <div style={{ fontSize: "11px", color: "var(--color-neutral-600)" }}>
                          Focus a row and press Alt + ↑ / ↓ to move it.
                        </div>
                      </div>
                    </>
                  )}
                  {pickerPanel && (
                    <>
                      <div onClick={closeDialog} style={{ position: "absolute", inset: "0", background: "color-mix(in srgb, var(--color-neutral-900) 30%, transparent)", zIndex: "20" }} />
                      <div style={{ position: "absolute", top: "0", left: "0", bottom: "0", width: "420px", zIndex: "21", background: "var(--color-bg)", boxShadow: "var(--shadow-lg)", display: "flex", flexDirection: "column", borderRight: "1px solid var(--color-divider)", borderRadius: "10px" }}>
                        <div style={{ padding: "16px 16px 12px", display: "flex", flexDirection: "column", gap: "12px", borderBottom: "1px solid var(--color-divider)" }}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ display: "flex", flexDirection: "column", marginRight: "auto" }}>
                              <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "18px" }}>
                                {pk.title}
                              </div>
                              <div style={{ fontSize: "12px", color: "var(--color-neutral-700)" }}>
                                {pk.insertLabel}
                              </div>
                            </div>
                            <button onClick={closeDialog} title="Close" className="btn btn-icon">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                            </button>
                          </div>
                          <div style={{ position: "relative" }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-600)" strokeWidth="2" style={{ position: "absolute", left: "10px", top: "11px" }}>
                              <circle cx="11" cy="11" r="8" />
                              <path d="m21 21-4.3-4.3" />
                            </svg>
                            <input value={pk.q} onChange={pk.onQ} placeholder="Search sections" style={{ paddingLeft: "32px" }} className="input" />
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                            {(pk.cats || []).map((ct, $index) => (
                              <React.Fragment key={ct?.id ?? $index}>
                                <button onClick={ct.onClick} disabled={ct.disabled} style={{ font: "inherit", fontSize: "12px", padding: "4px 9px", cursor: "pointer", border: `1px solid ${ct.bd ?? ""}`, background: ct.bg, color: ct.fg, opacity: ct.opacity, borderRadius: "10px" }}>
                                  {ct.label}
                                </button>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        <div style={{ flex: "1", overflow: "auto", padding: "12px 16px 24px", display: "flex", flexDirection: "column", gap: "10px" }}>
                          {pk.empty && (
                            <>
                              <div style={{ fontSize: "13px", color: "var(--color-neutral-700)", padding: "12px 0" }}>
                                No sections match “{pk.q}”.
                              </div>
                            </>
                          )}
                          {(pk.list || []).map((li, $index) => (
                            <React.Fragment key={li?.id ?? $index}>
                              <button onClick={li.onClick} style={{ font: "inherit", textAlign: "left", padding: "0", cursor: "pointer", background: "var(--color-surface)", border: `2px solid ${li.bd ?? ""}`, display: "flex", flexDirection: "column", color: "var(--color-text)", borderRadius: "10px" }}>
                                <div style={{ height: "132px", overflow: "hidden", width: "100%", opacity: li.opacity }}>
                                  <div style={{ zoom: "0.28", width: "1280px", pointerEvents: "none" }}>
                                    <Section section={li.sample} theme={theme} device="desktop" />
                                  </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", padding: "8px 10px", width: "100%" }}>
                                  <div style={{ fontWeight: "600", fontSize: "13px", marginRight: "auto" }}>
                                    {li.name}
                                  </div>
                                  <div style={{ fontSize: "11px", color: "var(--color-neutral-700)" }}>
                                    {li.note}
                                  </div>
                                </div>
                              </button>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                      {pk.hasPrev && (
                        <>
                          <div style={{ position: "absolute", top: "24px", left: "444px", right: "24px", maxWidth: "760px", bottom: "24px", zIndex: "21", background: "var(--color-bg)", boxShadow: "var(--shadow-lg)", display: "flex", flexDirection: "column", borderRadius: "14px" }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "16px 20px", borderBottom: "1px solid var(--color-divider)" }}>
                              <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginRight: "auto", minWidth: "0" }}>
                                <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
                                  {pk.prev.cat}
                                </div>
                                <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "20px" }}>
                                  {pk.prev.name}
                                </div>
                                <div style={{ fontSize: "13px", color: "var(--color-neutral-700)", maxWidth: "40em" }}>
                                  {pk.prev.desc}
                                </div>
                              </div>
                              <button onClick={pk.onAdd} disabled={pk.prev.disabled} style={{ padding: "11px 16px", minWidth: "120px", justifyContent: "flex-start", flex: "none" }} className="btn btn-primary">
                                {pk.addLabel}
                              </button>
                            </div>
                            <div style={{ flex: "1", overflow: "auto", background: "var(--color-neutral-300)", padding: "20px" }}>
                              <div style={{ zoom: pk.prevZoom, width: "1280px", pointerEvents: "none", boxShadow: "var(--shadow-md)", borderRadius: "10px" }}>
                                <Section section={pk.prev.sample} theme={theme} device="desktop" />
                              </div>
                            </div>
                            <div style={{ padding: "12px 20px", fontSize: "12px", color: "var(--color-neutral-700)", borderTop: "1px solid var(--color-divider)" }}>
                              Editable fields: {pk.prev.fieldList}
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                  {dlgRevisions && (
                    <>
                      <div onClick={closeDialog} style={{ position: "absolute", inset: "0", background: "color-mix(in srgb, var(--color-neutral-900) 30%, transparent)", zIndex: "20" }} />
                      <div style={{ position: "absolute", top: "0", right: "0", bottom: "0", width: "380px", zIndex: "21", background: "var(--color-bg)", boxShadow: "var(--shadow-lg)", borderLeft: "1px solid var(--color-divider)", display: "flex", flexDirection: "column", borderRadius: "14px" }}>
                        <div style={{ display: "flex", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid var(--color-divider)" }}>
                          <div style={{ display: "flex", flexDirection: "column", marginRight: "auto" }}>
                            <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "18px" }}>
                              Revision history
                            </div>
                            <div style={{ fontSize: "12px", color: "var(--color-neutral-700)" }}>
                              Each Save creates a revision. Restoring loads it as unsaved changes.
                            </div>
                          </div>
                          <button onClick={closeDialog} title="Close" className="btn btn-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                          </button>
                        </div>
                        <div style={{ flex: "1", overflow: "auto", padding: "0 20px" }}>
                          {dirty && (
                            <>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 0", borderBottom: "1px solid var(--color-divider)" }}>
                                <div style={{ width: "10px", height: "10px", border: "2px solid var(--color-accent)", flex: "none", borderRadius: "10px" }} />
                                <div style={{ display: "flex", flexDirection: "column", marginRight: "auto" }}>
                                  <div style={{ fontWeight: "600" }}>
                                    Unsaved changes
                                  </div>
                                  <div style={{ fontSize: "12px", color: "var(--color-neutral-700)" }}>
                                    Not yet a revision
                                  </div>
                                </div>
                                <button onClick={onSave} style={{ fontSize: "12px", padding: "6px 10px" }} className="btn btn-secondary">
                                  Save
                                </button>
                              </div>
                            </>
                          )}
                          {(revList || []).map((r, $index) => (
                            <React.Fragment key={r?.id ?? $index}>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 0", borderBottom: "1px solid var(--color-divider)" }}>
                                <div style={{ width: "10px", height: "10px", background: r.dot, flex: "none" }} />
                                <div style={{ display: "flex", flexDirection: "column", marginRight: "auto", minWidth: "0" }}>
                                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                    <div style={{ fontWeight: "600" }}>
                                      Revision {r.n}
                                    </div>
                                    {r.hasTag && (
                                      <>
                                        <span style={{ padding: "1px 7px", fontSize: "10px" }} className="tag tag-accent">
                                          {r.tag}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                  <div style={{ fontSize: "12px", color: "var(--color-neutral-700)" }}>
                                    {r.time} · {r.by}
                                  </div>
                                </div>
                                {r.canRestore && (
                                  <>
                                    <button onClick={r.onRestore} style={{ fontSize: "12px" }} className="btn btn-ghost">
                                      Restore
                                    </button>
                                  </>
                                )}
                              </div>
                            </React.Fragment>
                          ))}
                          {noRevisions && (
                            <>
                              <div style={{ fontSize: "13px", color: "var(--color-neutral-700)", padding: "16px 0" }}>
                                No revisions yet. Save to create the first one.
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
          {isReview && (
            <>
              <div style={{ flex: "1", display: "flex", flexDirection: "column", minHeight: "0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 16px", flex: "none", borderBottom: "1px solid var(--color-divider)" }}>
                  <button onClick={goDashboard} title="Back to pages" className="btn btn-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <div style={{ display: "flex", flexDirection: "column", minWidth: "0", marginRight: "auto" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "16px" }}>
                        {pg.name}
                      </div>
                      <span style={{ fontSize: "11px", padding: "2px 8px", background: pg.tag.bg, color: pg.tag.fg, border: `1px solid ${pg.tag.bd ?? ""}`, borderRadius: "10px" }}>
                        {pg.status}
                      </span>
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--color-neutral-700)" }}>
                      {pg.url} · {pg.revLabel}
                    </div>
                  </div>
                  <div style={{ display: "flex", border: "1px solid var(--color-divider)", borderRadius: "10px" }}>
                    <button onClick={setDesktop} style={{ font: "inherit", fontSize: "12px", padding: "7px 10px", border: "0", cursor: "pointer", background: devTabs.dBg, color: devTabs.dFg }}>
                      Desktop
                    </button>
                    <button onClick={setMobile} style={{ font: "inherit", fontSize: "12px", padding: "7px 10px", border: "0", borderLeft: "1px solid var(--color-divider)", cursor: "pointer", background: devTabs.mBg, color: devTabs.mFg }}>
                      Mobile
                    </button>
                  </div>
                  {rv.inReview && (
                    <>
                      <button onClick={openReturn} style={{ minWidth: "120px", justifyContent: "flex-start" }} className="btn btn-secondary">
                        Return to marketer
                      </button>
                      <button onClick={startPublish} disabled={rv.noPublish} style={{ minWidth: "110px", justifyContent: "flex-start" }} className="btn btn-primary">
                        Publish
                      </button>
                    </>
                  )}
                  {rv.isLive && (
                    <>
                      <button onClick={openUnpublish} style={{ minWidth: "110px", justifyContent: "flex-start" }} className="btn btn-secondary">
                        Unpublish
                      </button>
                    </>
                  )}
                  {rv.isOff && (
                    <>
                      <button onClick={openRestore} style={{ minWidth: "160px", justifyContent: "flex-start" }} className="btn btn-primary">
                        Restore publication
                      </button>
                    </>
                  )}
                </div>
                <div style={{ flex: "1", display: "flex", minHeight: "0" }}>
                  <div style={{ width: "360px", flex: "none", borderRight: "1px solid var(--color-divider)", overflow: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>
                        Review
                      </div>
                      <div style={{ fontSize: "13px", color: "var(--color-neutral-700)" }}>
                        {rv.submitted}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "14px" }}>
                        Automated checks
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--color-divider)" }}>
                        {(rv.checks || []).map((ck, $index) => (
                          <React.Fragment key={ck?.id ?? $index}>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--color-divider)", fontSize: "13px" }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2.5" strokeLinecap="square">
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                              {ck}
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "14px" }}>
                          Claims to verify
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--color-neutral-700)" }}>
                          {rv.claimCount}
                        </div>
                      </div>
                      {(rv.claims || []).map((cl, $index) => (
                        <React.Fragment key={cl?.id ?? $index}>
                          <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "12px", background: "var(--color-surface)", cursor: "pointer", border: `1px solid ${cl.bd ?? ""}`, borderRadius: "10px" }}>
                            <input type="checkbox" checked={cl.checked} onChange={cl.onToggle} disabled={cl.disabled} style={{ accentColor: "var(--color-accent)", width: "16px", height: "16px", margin: "2px 0 0" }} />
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                              <div style={{ fontWeight: "600", fontSize: "13px" }}>
                                {cl.title}
                              </div>
                              <div style={{ fontSize: "12px", color: "var(--color-neutral-800)" }}>
                                {cl.detail}
                              </div>
                            </div>
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "14px" }}>
                        Media
                      </div>
                      {(rv.media || []).map((m, $index) => (
                        <React.Fragment key={m?.id ?? $index}>
                          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <div style={{ width: "40px", height: "40px", flex: "none", background: "repeating-linear-gradient(135deg, var(--color-neutral-300) 0 6px, var(--color-neutral-200) 6px 12px)" }} />
                            <div style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
                              <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: "12px", overflowWrap: "anywhere" }}>
                                {m.name}
                              </div>
                              <div style={{ fontSize: "12px", color: "var(--color-neutral-700)" }}>
                                Alt: {m.alt}
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                    {rv.inReview && (
                      <>
                        <div style={{ fontSize: "12px", color: "var(--color-neutral-700)" }}>
                          {rv.publishHint}
                        </div>
                      </>
                    )}
                  </div>
                  <div style={{ flex: "1", minWidth: "0", overflow: "auto", background: "var(--color-neutral-300)", padding: "28px 32px 64px" }}>
                    <div ref={canvasRef} style={{ margin: "0 auto", width: frameWidth, maxWidth: "100%", background: pageBg, boxShadow: "var(--shadow-md)", borderRadius: "14px" }}>
                      {mobilePreview ? (
                        <>
                          <MobileCanvasPreview
                            sections={previewSections}
                            theme={theme}
                            pageBg={pageBg}
                            selectedId={previewSelectedId}
                            onSelectSection={onPreviewSelect}
                          />
                        </>
                      ) : (canvas || []).map((cs, $index) => (
                        <React.Fragment key={cs?.id ?? $index}>
                          <div style={{ zoom: zoom }}>
                            <div style={{ width: innerWidth }}>
                              <Section section={cs.sec} theme={theme} device={device} />
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {dlgCreate && (
          <>
            <div style={{ position: "absolute", inset: "0", zIndex: "40", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", background: "color-mix(in srgb, var(--color-neutral-900) 50%, transparent)" }}>
              <div style={{ width: "min(540px, 100%)", maxHeight: "100%", overflow: "auto", display: "flex", flexDirection: "column", gap: "20px", padding: "24px", background: "var(--color-bg)", boxShadow: "var(--shadow-lg)", borderRadius: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "22px" }}>
                    {cr.title}
                  </div>
                  {cr.isDuplicate && (
                    <>
                      <div style={{ fontSize: "13px", color: "var(--color-neutral-700)" }}>
                        Copies every section and its content from “{cr.fromName}”. The copy starts as a draft.
                      </div>
                    </>
                  )}
                  {!cr.isDuplicate && cr.templateNote && (
                    <div style={{ fontSize: "13px", color: "var(--color-neutral-700)" }}>
                      {cr.templateNote}
                    </div>
                  )}
                </div>
                <div className="field">
                  <label>
                    Page name
                  </label>
                  <input value={cr.name} onChange={cr.onName} placeholder="e.g. Retainer" className="input" />
                </div>
                <div className="field">
                  <label>
                    Slug
                  </label>
                  <div style={{ display: "flex", border: `1px solid ${cr.slugBd ?? ""}`, background: "var(--color-surface)", borderRadius: "10px" }}>
                    <div style={{ padding: "8px 2px 8px 10px", fontSize: "14px", color: "var(--color-neutral-700)", whiteSpace: "nowrap" }}>
                      stndrdcoach.com/
                    </div>
                    <input value={cr.slug} onChange={cr.onSlug} style={{ flex: "1", minWidth: "0", border: "0", background: "transparent", font: "inherit", fontSize: "14px", padding: "8px 10px 8px 0", color: "var(--color-text)", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginTop: "8px", fontSize: "13px", color: cr.msgColor }}>
                    <div style={{ width: "8px", height: "8px", marginTop: "6px", flex: "none", background: cr.dot }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <div style={{ fontWeight: "600" }}>
                        {cr.msg}
                      </div>
                      <div style={{ color: "var(--color-neutral-700)" }}>
                        {cr.fullUrl}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label>
                    Theme
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <button onClick={cr.setDark} style={{ font: "inherit", textAlign: "left", cursor: "pointer", padding: "10px", display: "flex", flexDirection: "column", gap: "10px", background: "var(--color-bg)", border: `2px solid ${cr.darkBd ?? ""}`, color: "var(--color-text)", borderRadius: "10px" }}>
                      <div style={{ height: "52px", background: "#0f0f0e", display: "flex", alignItems: "flex-end", padding: "8px", gap: "6px" }}>
                        <div style={{ width: "40%", height: "8px", background: "#f4f2ec" }} />
                        <div style={{ width: "18%", height: "8px", background: "#ffd21f" }} />
                      </div>
                      <div style={{ fontSize: "13px", fontWeight: "600" }}>
                        Dark / yellow
                      </div>
                    </button>
                    <button onClick={cr.setLight} style={{ font: "inherit", textAlign: "left", cursor: "pointer", padding: "10px", display: "flex", flexDirection: "column", gap: "10px", background: "var(--color-bg)", border: `2px solid ${cr.lightBd ?? ""}`, color: "var(--color-text)", borderRadius: "10px" }}>
                      <div style={{ height: "52px", background: "#ffffff", display: "flex", alignItems: "flex-end", padding: "8px", gap: "6px", border: "1px solid #dbe1ea", borderRadius: "10px" }}>
                        <div style={{ width: "40%", height: "8px", background: "#0f1a2e" }} />
                        <div style={{ width: "18%", height: "8px", background: "#ffd21f" }} />
                      </div>
                      <div style={{ fontSize: "13px", fontWeight: "600" }}>
                        Light / yellow
                      </div>
                    </button>
                  </div>
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-neutral-700)" }}>
                  The slug locks after the page is first published.
                </div>
                {cr.error && (
                  <div style={{ fontSize: "13px", color: "var(--color-danger)" }}>
                    {cr.error}
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                  <button onClick={closeDialog} style={{ minWidth: "90px", justifyContent: "flex-start" }} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button onClick={cr.onCreate} disabled={cr.cannot} style={{ minWidth: "130px", justifyContent: "flex-start" }} className="btn btn-primary">
                    {cr.cta}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {pickerModal && (
          <>
            <div style={{ position: "absolute", inset: "0", zIndex: "40", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "color-mix(in srgb, var(--color-neutral-900) 50%, transparent)" }}>
              <div style={{ width: "min(1180px, 100%)", height: "min(760px, 100%)", maxHeight: "100%", display: "flex", flexDirection: "column", background: "var(--color-bg)", boxShadow: "var(--shadow-lg)", borderRadius: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 20px", borderBottom: "1px solid var(--color-divider)" }}>
                  <div style={{ display: "flex", flexDirection: "column", marginRight: "auto" }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "20px" }}>
                      {pk.title}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--color-neutral-700)" }}>
                      {pk.insertLabel}
                    </div>
                  </div>
                  <div style={{ position: "relative", width: "300px" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-600)" strokeWidth="2" style={{ position: "absolute", left: "10px", top: "11px" }}>
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <input value={pk.q} onChange={pk.onQ} placeholder="Search sections" style={{ paddingLeft: "32px" }} className="input" />
                  </div>
                  <button onClick={closeDialog} title="Close" className="btn btn-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
                <div style={{ flex: "1", display: "flex", minHeight: "0" }}>
                  <div style={{ width: "170px", flex: "none", borderRight: "1px solid var(--color-divider)", padding: "12px 0", display: "flex", flexDirection: "column" }}>
                    {(pk.cats || []).map((ct, $index) => (
                      <React.Fragment key={ct?.id ?? $index}>
                        <button onClick={ct.onClick} disabled={ct.disabled} style={{ font: "inherit", textAlign: "left", fontSize: "13px", padding: "8px 16px", cursor: "pointer", border: "0", borderLeft: `3px solid ${ct.bar ?? ""}`, background: ct.rowBg, color: "var(--color-text)", opacity: ct.opacity, display: "flex", justifyContent: "space-between" }}>
                          <span>
                            {ct.label}
                          </span>
                          <span style={{ color: "var(--color-neutral-600)" }}>
                            {ct.count}
                          </span>
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                  <div style={{ width: "300px", flex: "none", overflow: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: "10px", borderRight: "1px solid var(--color-divider)" }}>
                    {pk.empty && (
                      <>
                        <div style={{ fontSize: "13px", color: "var(--color-neutral-700)" }}>
                          No sections match “{pk.q}”.
                        </div>
                      </>
                    )}
                    {(pk.list || []).map((li, $index) => (
                      <React.Fragment key={li?.id ?? $index}>
                        <button onClick={li.onClick} style={{ font: "inherit", textAlign: "left", padding: "0", cursor: "pointer", background: "var(--color-surface)", border: `2px solid ${li.bd ?? ""}`, display: "flex", flexDirection: "column", color: "var(--color-text)", borderRadius: "10px" }}>
                          <div style={{ height: "120px", overflow: "hidden", width: "100%", opacity: li.opacity }}>
                            <div style={{ zoom: "0.2125", width: "1280px", pointerEvents: "none" }}>
                              <Section section={li.sample} theme={theme} device="desktop" />
                            </div>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", padding: "8px 10px", width: "100%" }}>
                            <div style={{ fontWeight: "600", fontSize: "13px" }}>
                              {li.name}
                            </div>
                            <div style={{ fontSize: "11px", color: "var(--color-neutral-700)" }}>
                              {li.cat} · {li.note}
                            </div>
                          </div>
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                  <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column" }}>
                    {pk.hasPrev && (
                      <>
                        <div style={{ flex: "1", overflow: "auto", background: "var(--color-neutral-300)", padding: "20px" }}>
                          <div style={{ zoom: pk.modalZoom, width: "1280px", pointerEvents: "none", boxShadow: "var(--shadow-md)", borderRadius: "10px" }}>
                            <Section section={pk.prev.sample} theme={theme} device="desktop" />
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "16px 20px", borderTop: "1px solid var(--color-divider)" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginRight: "auto", minWidth: "0" }}>
                            <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "18px" }}>
                              {pk.prev.name}
                            </div>
                            <div style={{ fontSize: "13px", color: "var(--color-neutral-700)" }}>
                              {pk.prev.desc}
                            </div>
                            <div style={{ fontSize: "12px", color: "var(--color-neutral-700)" }}>
                              Editable fields: {pk.prev.fieldList}
                            </div>
                          </div>
                          <button onClick={pk.onAdd} disabled={pk.prev.disabled} style={{ padding: "11px 16px", minWidth: "120px", justifyContent: "flex-start", flex: "none" }} className="btn btn-primary">
                            {pk.addLabel}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {dlgIssues && (
          <>
            <div style={{ position: "absolute", inset: "0", zIndex: "40", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", background: "color-mix(in srgb, var(--color-neutral-900) 50%, transparent)" }}>
              <div style={{ width: "min(600px, 100%)", maxHeight: "calc(100% - 32px)", display: "flex", flexDirection: "column", background: "var(--color-bg)", boxShadow: "var(--shadow-lg)", borderRadius: "10px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "20px 24px 16px", borderBottom: "1px solid var(--color-divider)" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginRight: "auto" }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "22px" }}>
                      {iss.title}
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--color-neutral-700)" }}>
                      {iss.sub}
                    </div>
                  </div>
                  <button onClick={closeDialog} title="Close" className="btn btn-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
                <div style={{ flex: "1", overflow: "auto", padding: "0 24px" }}>
                  {(iss.list || []).map((is, $index) => (
                    <React.Fragment key={is?.id ?? $index}>
                      <div style={{ display: "grid", gridTemplateColumns: "76px minmax(0, 1fr) auto", gap: "12px", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--color-divider)" }}>
                        <span style={{ fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 0", color: "var(--color-danger)", fontWeight: "600" }}>
                          {is.kind}
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
                          <div style={{ fontSize: "12px", color: "var(--color-neutral-700)" }}>
                            {is.where}
                          </div>
                          <div style={{ fontSize: "14px" }}>
                            {is.text}
                          </div>
                        </div>
                        <button onClick={is.onFix} style={{ fontSize: "12px", padding: "6px 10px", minWidth: "60px", justifyContent: "flex-start" }} className="btn btn-secondary">
                          {is.fixLabel}
                        </button>
                      </div>
                    </React.Fragment>
                  ))}
                  {iss.clear && (
                    <>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center", padding: "20px 0", fontSize: "14px" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2.5" strokeLinecap="square">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        Required fields, media, final call to action and claims are all in order.
                      </div>
                    </>
                  )}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", padding: "16px 24px", borderTop: "1px solid var(--color-divider)" }}>
                  <button onClick={closeDialog} style={{ minWidth: "90px", justifyContent: "flex-start" }} className="btn btn-secondary">
                    Close
                  </button>
                  <button onClick={onRequestReview} disabled={iss.blocked} style={{ minWidth: "140px", justifyContent: "flex-start" }} className="btn btn-primary">
                    Request review
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {dlgReviewSent && (
          <>
            <div style={{ position: "absolute", inset: "0", zIndex: "40", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", background: "color-mix(in srgb, var(--color-neutral-900) 50%, transparent)" }}>
              <div style={{ width: "min(460px, 100%)", display: "flex", flexDirection: "column", gap: "14px", padding: "24px", background: "var(--color-bg)", boxShadow: "var(--shadow-lg)", borderRadius: "10px" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "22px" }}>
                  Sent for review
                </div>
                <div style={{ fontSize: "14px", color: "var(--color-neutral-800)", textWrap: "pretty" }}>
                  {reviewSentText}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "6px" }}>
                  <button onClick={closeDialog} style={{ minWidth: "110px", justifyContent: "flex-start" }} className="btn btn-secondary">
                    Stay on page
                  </button>
                  <button onClick={goDashboard} style={{ minWidth: "130px", justifyContent: "flex-start" }} className="btn btn-primary">
                    Back to pages
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {dlgReturn && (
          <>
            <div style={{ position: "absolute", inset: "0", zIndex: "40", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", background: "color-mix(in srgb, var(--color-neutral-900) 50%, transparent)" }}>
              <div style={{ width: "min(480px, 100%)", display: "flex", flexDirection: "column", gap: "14px", padding: "24px", background: "var(--color-bg)", boxShadow: "var(--shadow-lg)", borderRadius: "10px" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "22px" }}>
                  Return to marketer
                </div>
                <div style={{ fontSize: "14px", color: "var(--color-neutral-800)" }}>
                  The page goes back to Draft and the marketer can edit again. Your note appears at the top of their editor.
                </div>
                <div className="field">
                  <label>
                    Note
                  </label>
                  <textarea value={returnNote} onChange={onReturnNote} placeholder="What needs to change?" className="input" />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                  <button onClick={closeDialog} style={{ minWidth: "90px", justifyContent: "flex-start" }} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button onClick={confirmReturn} disabled={returnDisabled} style={{ minWidth: "120px", justifyContent: "flex-start" }} className="btn btn-primary">
                    Return page
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {dlgConfirm && (
          <>
            <div style={{ position: "absolute", inset: "0", zIndex: "40", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", background: "color-mix(in srgb, var(--color-neutral-900) 50%, transparent)" }}>
              <div style={{ width: "min(480px, 100%)", display: "flex", flexDirection: "column", gap: "14px", padding: "24px", background: "var(--color-bg)", boxShadow: "var(--shadow-lg)", borderRadius: "10px" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "22px" }}>
                  {cf.title}
                </div>
                <div style={{ fontSize: "14px", color: "var(--color-neutral-800)", textWrap: "pretty" }}>
                  {cf.body}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "6px" }}>
                  <button onClick={closeDialog} style={{ minWidth: "90px", justifyContent: "flex-start" }} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button onClick={cf.onConfirm} style={{ minWidth: "130px", justifyContent: "flex-start" }} className="btn btn-primary">
                    {cf.cta}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {dlgPublish && (
          <>
            <div style={{ position: "absolute", inset: "0", zIndex: "40", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", background: "color-mix(in srgb, var(--color-neutral-900) 50%, transparent)" }}>
              <div style={{ width: "min(520px, 100%)", display: "flex", flexDirection: "column", gap: "18px", padding: "24px", background: "var(--color-bg)", boxShadow: "var(--shadow-lg)", borderRadius: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "22px" }}>
                    {pub.title}
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--color-neutral-700)" }}>
                    {pub.sub}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--color-divider)" }}>
                  {(pub.steps || []).map((st, $index) => (
                    <React.Fragment key={st?.id ?? $index}>
                      <div style={{ display: "flex", gap: "12px", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--color-divider)", fontSize: "14px", color: st.color }}>
                        <div style={{ width: "18px", height: "18px", flex: "none", display: "flex", alignItems: "center", justifyContent: "center", background: st.boxBg, border: `2px solid ${st.boxBd ?? ""}`, color: "var(--color-bg)", borderRadius: "10px" }}>
                          {st.done && (
                            <>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            </>
                          )}
                        </div>
                        <div style={{ flex: "1" }}>
                          {st.label}
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--color-accent-700)" }}>
                          {st.state}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                {pub.done && (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "14px", background: "var(--color-surface)" }}>
                      <div style={{ fontSize: "12px", color: "var(--color-neutral-700)" }}>
                        Live and confirmed
                      </div>
                      <a href="#" style={{ fontFamily: "var(--font-heading)", fontWeight: "600", fontSize: "16px", overflowWrap: "anywhere" }}>
                        {pub.url}
                      </a>
                    </div>
                  </>
                )}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={finishPublish} disabled={pub.notDone} style={{ minWidth: "130px", justifyContent: "flex-start" }} className="btn btn-primary">
                    Back to pages
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {hasToast && (
          <>
            <div style={{ position: "absolute", left: "20px", bottom: "20px", zIndex: "50", background: "var(--color-text)", color: "var(--color-bg)", padding: "12px 16px", fontSize: "13px", boxShadow: "var(--shadow-lg)", maxWidth: "520px", borderRadius: "14px" }}>
              {toast}
            </div>
          </>
        )}
      </div>
      </>
    );
  }
}
