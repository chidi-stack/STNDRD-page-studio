// Section — exported from "Section v2.dc.html". Generated JSX; inline styles are the source of truth.
import React from 'react';

const THEMES = {
  dark: { bg: '#0b0b0b', surface: '#161615', fg: '#f5f3ee', muted: '#a8a59d', accent: '#ffd21f', accentText: '#ffd21f', accentFg: '#0b0b0b', accentOn: '#ffd21f', accentSoft: 'rgba(255,210,31,0.12)', line: 'rgba(255,255,255,0.12)', stripeA: '#232320', stripeB: '#1b1b19', labelColor: '#8f8b80' },
  light: { bg: '#ffffff', surface: '#f4f4f2', fg: '#0b0b0b', muted: '#5c5a55', accent: '#ffd21f', accentText: '#0b0b0b', accentFg: '#0b0b0b', accentOn: '#ffd21f', accentSoft: '#fff4c2', line: '#e4e2dc', stripeA: '#ebeae6', stripeB: '#f2f1ee', labelColor: '#6f6c66' }
};
const SIZES = {
  desktop: { padX: 72, padY: 88, h1: 76, h2: 46, h3: 21, body: 18, bodySm: 16, small: 12, stat: 60, quote: 30, card: 52, cols2: '1.1fr 1fr', cols4: 'repeat(auto-fit, minmax(200px, 1fr))', colsAuto: 'repeat(auto-fit, minmax(220px, 1fr))', colsFaq: '1fr 2fr', gap: 64 },
  mobile: { padX: 20, padY: 52, h1: 44, h2: 32, h3: 17, body: 16, bodySm: 15, small: 11, stat: 44, quote: 22, card: 26, cols2: '1fr', cols4: '1fr 1fr', colsAuto: '1fr', colsFaq: '1fr', gap: 28 }
};
export default class Section extends React.Component {
  renderVals() {
    const sec = this.props.section || { type: 'hero-split', v: {}, items: [] };
    const c = THEMES[this.props.theme] || THEMES.dark;
    const device = this.props.device === 'mobile' ? 'mobile' : 'desktop';
    const v = sec.v || {};
    const t = sec.type;
    let img = null, missingLabel = '';
    if (t === 'hero-split') { img = v.image; missingLabel = 'Image required'; }
    if (t === 'hero-video') { img = v.video ? { src: v.video } : null; missingLabel = 'Video link required'; }
    if (t === 'testimonial') { img = v.photo; }
    const has = !!(img && img.src);
    const media = {
      has,
      bg: `repeating-linear-gradient(135deg, ${c.stripeA} 0 12px, ${c.stripeB} 12px 24px)`,
      border: has ? 'none' : `2px dashed ${c.line}`,
      label: has ? (t === 'hero-video' ? (v.poster && v.poster.src ? v.poster.src + ' · ' : '') + v.video : img.src) : missingLabel,
      labelColor: c.labelColor
    };
    if (!has && t !== 'testimonial') media.bg = 'transparent';
    const items = (sec.items || []).map((it, i) => ({ ...it, num: String(i + 1).padStart(2, '0') }));
    return {
      c, s: SIZES[device], v, items, media, desktop: device === 'desktop', hasNotice: !!v.notice,
      is: { header: t === 'header', heroSplit: t === 'hero-split', heroVideo: t === 'hero-video', metrics: t === 'metrics', testimonial: t === 'testimonial', process: t === 'process', offer: t === 'offer', faq: t === 'faq', finalCta: t === 'final-cta', footer: t === 'footer' }
    };
  }

  render() {
    const vals = { ...this.props, ...this.renderVals() };
    const { c, desktop, hasNotice, is, items, media, s, v } = vals;
    return (
      <>
      <div style={{ fontFamily: "'Manrope', system-ui, sans-serif", background: c.bg, color: c.fg, width: "100%", WebkitFontSmoothing: "antialiased" }}>
        {is.header && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "24px", padding: `18px ${s.padX ?? ""}px`, borderBottom: `1px solid ${c.line ?? ""}` }}>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: "0.95", marginRight: "auto", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase" }}>
                <div style={{ fontWeight: "700", fontSize: "22px", letterSpacing: "0.08em" }}>
                  STNDRD
                </div>
                <div style={{ fontWeight: "500", fontSize: "9px", letterSpacing: "0.42em", color: c.muted }}>
                  Coaching
                </div>
              </div>
              {hasNotice && (
                <>
                  {desktop && (
                    <>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "7px 14px", border: `1px solid ${c.line ?? ""}`, borderRadius: "999px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: c.accent }} />
                        {v.notice}
                      </div>
                    </>
                  )}
                </>
              )}
              <div style={{ background: c.accent, color: c.accentFg, padding: "11px 20px", borderRadius: "6px", fontFamily: "'Oswald', sans-serif", fontWeight: "600", fontSize: "14px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {v.cta}
              </div>
            </div>
          </>
        )}
        {is.heroSplit && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: s.cols2, gap: `${s.gap ?? ""}px`, padding: `${s.padY ?? ""}px ${s.padX ?? ""}px`, alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px", minWidth: "0" }}>
                {v.eyebrow && (
                  <>
                    <div style={{ display: "flex" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "7px 14px", borderRadius: "999px", background: c.accentSoft, color: c.accentText, fontSize: `${s.small ?? ""}px`, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: "700" }}>
                        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: c.accent }} />
                        {v.eyebrow}
                      </div>
                    </div>
                  </>
                )}
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: `${s.h1 ?? ""}px`, lineHeight: "1.0", fontWeight: "700", textTransform: "uppercase", letterSpacing: "-0.005em", textWrap: "balance", overflowWrap: "anywhere" }}>
                  {v.headline}
                </div>
                <div style={{ fontSize: `${s.body ?? ""}px`, lineHeight: "1.55", color: c.muted, maxWidth: "32em", textWrap: "pretty" }}>
                  {v.sub}
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", background: c.accent, color: c.accentFg, padding: "16px 26px", borderRadius: "6px", fontFamily: "'Oswald', sans-serif", fontWeight: "600", fontSize: "17px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {v.cta}
                    <span style={{ fontFamily: "'Manrope', sans-serif" }}>
                      →
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ aspectRatio: "4 / 5", minWidth: "0", position: "relative", borderRadius: "14px", overflow: "hidden", background: media.bg, border: media.border, display: "flex", alignItems: "flex-end", padding: "16px" }}>
                <div style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: "13px", color: media.labelColor }}>
                  {media.label}
                </div>
              </div>
            </div>
          </>
        )}
        {is.heroVideo && (
          <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "26px", padding: `${s.padY ?? ""}px ${s.padX ?? ""}px` }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: `${s.h1 ?? ""}px`, lineHeight: "1.0", fontWeight: "700", textTransform: "uppercase", maxWidth: "15em", textWrap: "balance", overflowWrap: "anywhere" }}>
                {v.headline}
              </div>
              <div style={{ fontSize: `${s.body ?? ""}px`, lineHeight: "1.55", color: c.muted, maxWidth: "36em" }}>
                {v.sub}
              </div>
              <div style={{ width: "100%", aspectRatio: "16 / 9", position: "relative", borderRadius: "14px", overflow: "hidden", background: media.bg, border: media.border, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "76px", height: "76px", borderRadius: "50%", background: c.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: "0", height: "0", borderLeft: `22px solid ${c.accentFg ?? ""}`, borderTop: "14px solid transparent", borderBottom: "14px solid transparent", marginLeft: "6px" }} />
                </div>
                <div style={{ position: "absolute", left: "16px", bottom: "14px", fontFamily: "ui-monospace, Menlo, monospace", fontSize: "13px", color: media.labelColor }}>
                  {media.label}
                </div>
              </div>
            </div>
          </>
        )}
        {is.metrics && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "36px", padding: `${s.padY ?? ""}px ${s.padX ?? ""}px` }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: `${s.h2 ?? ""}px`, fontWeight: "700", textTransform: "uppercase", lineHeight: "1.05", maxWidth: "18em" }}>
                {v.heading}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: s.cols4, gap: "16px" }}>
                {(items || []).map((it, $index) => (
                  <React.Fragment key={it?.id ?? $index}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "26px", background: c.surface, border: `1px solid ${c.line ?? ""}`, borderRadius: "14px" }}>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: `${s.stat ?? ""}px`, fontWeight: "700", lineHeight: "1", color: c.accentText }}>
                        {it.value}
                      </div>
                      <div style={{ fontSize: `${s.body ?? ""}px`, color: c.muted, lineHeight: "1.4" }}>
                        {it.label}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              {v.source && (
                <>
                  <div style={{ fontSize: "13px", color: c.muted }}>
                    Source: {v.source}
                  </div>
                </>
              )}
            </div>
          </>
        )}
        {is.testimonial && (
          <>
            <div style={{ padding: `${s.padY ?? ""}px ${s.padX ?? ""}px` }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "28px", padding: `${s.card ?? ""}px`, background: c.surface, border: `1px solid ${c.line ?? ""}`, borderRadius: "18px" }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "64px", lineHeight: "0.6", color: c.accentText, height: "28px" }}>
                  “
                </div>
                <div style={{ fontSize: `${s.quote ?? ""}px`, lineHeight: "1.3", fontWeight: "600", letterSpacing: "-0.01em", maxWidth: "26em", textWrap: "pretty", overflowWrap: "anywhere" }}>
                  {v.quote}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  {media.has && (
                    <>
                      <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: media.bg }} />
                    </>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: "600", fontSize: "17px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      {v.name}
                    </div>
                    <div style={{ fontSize: "14px", color: c.muted }}>
                      {v.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {is.process && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "36px", padding: `${s.padY ?? ""}px ${s.padX ?? ""}px` }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: `${s.h2 ?? ""}px`, fontWeight: "700", textTransform: "uppercase", lineHeight: "1.05" }}>
                  {v.heading}
                </div>
                <div style={{ fontSize: `${s.body ?? ""}px`, color: c.muted, maxWidth: "36em", lineHeight: "1.55" }}>
                  {v.intro}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: s.colsAuto, gap: "16px" }}>
                {(items || []).map((it, $index) => (
                  <React.Fragment key={it?.id ?? $index}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px", padding: "26px", background: c.surface, border: `1px solid ${c.line ?? ""}`, borderRadius: "14px" }}>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "44px", fontWeight: "700", lineHeight: "1", color: c.accentText }}>
                        {it.num}
                      </div>
                      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: `${s.h3 ?? ""}px`, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: "1.15" }}>
                        {it.title}
                      </div>
                      <div style={{ fontSize: `${s.bodySm ?? ""}px`, color: c.muted, lineHeight: "1.55" }}>
                        {it.body}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </>
        )}
        {is.offer && (
          <>
            <div style={{ padding: `${s.padY ?? ""}px ${s.padX ?? ""}px` }}>
              <div style={{ display: "grid", gridTemplateColumns: s.cols2, gap: `${s.gap ?? ""}px`, background: c.surface, border: `1px solid ${c.line ?? ""}`, borderRadius: "18px", padding: `${s.card ?? ""}px` }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: `${s.h2 ?? ""}px`, fontWeight: "700", textTransform: "uppercase", lineHeight: "1.05" }}>
                    {v.heading}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: `${s.stat ?? ""}px`, fontWeight: "700", color: c.accentText }}>
                      {v.price}
                    </div>
                    <div style={{ fontSize: "15px", color: c.muted }}>
                      {v.note}
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", background: c.accent, color: c.accentFg, padding: "16px 26px", borderRadius: "6px", fontFamily: "'Oswald', sans-serif", fontWeight: "600", fontSize: "17px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      {v.cta}
                      <span style={{ fontFamily: "'Manrope', sans-serif" }}>
                        →
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {(items || []).map((it, $index) => (
                    <React.Fragment key={it?.id ?? $index}>
                      <div style={{ display: "flex", gap: "16px", alignItems: "baseline", padding: "15px 0", borderBottom: `1px solid ${c.line ?? ""}`, fontSize: `${s.bodySm ?? ""}px` }}>
                        <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: "600", fontSize: "14px", color: c.accentText, flex: "none" }}>
                          {it.num}
                        </div>
                        <div>
                          {it.text}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {is.faq && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: s.colsFaq, gap: `${s.gap ?? ""}px`, padding: `${s.padY ?? ""}px ${s.padX ?? ""}px` }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: `${s.h2 ?? ""}px`, fontWeight: "700", textTransform: "uppercase", lineHeight: "1.05" }}>
                {v.heading}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {(items || []).map((it, $index) => (
                  <React.Fragment key={it?.id ?? $index}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "20px 24px", background: c.surface, border: `1px solid ${c.line ?? ""}`, borderRadius: "12px" }}>
                      <div style={{ display: "flex", gap: "16px", alignItems: "baseline" }}>
                        <div style={{ fontSize: `${s.h3 ?? ""}px`, fontWeight: "700", lineHeight: "1.3", marginRight: "auto" }}>
                          {it.q}
                        </div>
                        <div style={{ fontSize: "20px", color: c.accentText, lineHeight: "1" }}>
                          −
                        </div>
                      </div>
                      <div style={{ fontSize: `${s.bodySm ?? ""}px`, color: c.muted, lineHeight: "1.55" }}>
                        {it.a}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </>
        )}
        {is.finalCta && (
          <>
            <div style={{ padding: `${s.padY ?? ""}px ${s.padX ?? ""}px` }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "22px", padding: `${s.card ?? ""}px`, borderRadius: "18px", background: c.accent, color: c.accentFg }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: `${s.h1 ?? ""}px`, lineHeight: "1.0", fontWeight: "700", textTransform: "uppercase", maxWidth: "14em", textWrap: "balance", overflowWrap: "anywhere" }}>
                  {v.headline}
                </div>
                <div style={{ fontSize: `${s.body ?? ""}px`, lineHeight: "1.55", maxWidth: "34em" }}>
                  {v.body}
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", background: c.accentFg, color: c.accentOn, padding: "16px 26px", borderRadius: "6px", fontFamily: "'Oswald', sans-serif", fontWeight: "600", fontSize: "17px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {v.cta}
                    <span style={{ fontFamily: "'Manrope', sans-serif" }}>
                      →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {is.footer && (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 32px", alignItems: "center", padding: `32px ${s.padX ?? ""}px`, fontSize: "13px", color: c.muted, borderTop: `1px solid ${c.line ?? ""}` }}>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: "0.95", fontFamily: "'Oswald', sans-serif", textTransform: "uppercase", color: c.fg }}>
                <div style={{ fontWeight: "700", fontSize: "18px", letterSpacing: "0.08em" }}>
                  STNDRD
                </div>
                <div style={{ fontWeight: "500", fontSize: "8px", letterSpacing: "0.42em", color: c.muted }}>
                  Coaching
                </div>
              </div>
              <div style={{ display: "flex", gap: "22px", marginRight: "auto", marginLeft: "24px" }}>
                <span>
                  Careers
                </span>
                <span>
                  Privacy policy
                </span>
                <span>
                  Terms &amp; Conditions
                </span>
              </div>
              <div>
                © 2026 STNDRD APP LLC
              </div>
            </div>
          </>
        )}
      </div>
      </>
    );
  }
}
