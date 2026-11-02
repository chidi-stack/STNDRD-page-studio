// STNDRD Page Studio — section library, validation and seed data.
// Extracted verbatim from "Page Studio v3.dc.html". Framework-agnostic.
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
function sectionIssues(s) {
  const d = BY[s.type], out = [];
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

export { LIB, BY, CATS, RESERVED, WEBFLOW, STEPS, mk, SAMPLE, fieldError, sectionIssues, validateSlug, slugify, fullPage, starterPage, ANALYTICS, fmtN, pct, delta, seedPages, TAGS };
