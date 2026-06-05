// ──────────────────────────────────────────────────────────────────
// Chifa Wok — Customer App
// Editorial premium, mobile-first, light warm bg + serif accents.
// ──────────────────────────────────────────────────────────────────

const { useState, useEffect, useMemo, useRef } = React;

// ── Design tokens ─────────────────────────────────────────────────
const TOKENS = {
  bg: '#f7f2ea',
  bgDeep: '#efe7da',
  surface: '#ffffff',
  ink: '#161616',
  muted: '#8a8276',
  mutedSoft: '#c2b9a9',
  border: '#ece1cc',
  borderSoft: '#f1e8d6',
  red: '#e63946',
  redDark: '#c01f2b',
  gold: '#e2a83a',
  goldSoft: '#f5d99a'
};

const FONTS = {
  serif: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
  sans: '"DM Sans", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", "SF Mono", monospace'
};

// ── Currency ──────────────────────────────────────────────────────
function formatARS(n) {
  return '$' + n.toLocaleString('es-AR', { minimumFractionDigits: 0 });
}

// ── Brand mark (drawn) ────────────────────────────────────────────
function BrandMark({ size = 46, mono = false }) {
  // Inspired by the logo: half-moon yellow disc + wordmark
  return (
    <svg width={size} height={size * 0.78} viewBox="0 0 120 94" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="cw-moon" cx="0.35" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#fff3c8" />
          <stop offset="0.5" stopColor={TOKENS.gold} />
          <stop offset="1" stopColor="#a37a1d" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="120" height="94" fill={mono ? 'transparent' : TOKENS.ink} rx="2" />
      <path d="M 28 47 a 22 22 0 0 0 0 -1 a 22 22 0 0 0 -22 -22 v 46 a 22 22 0 0 0 22 -22 z"
      fill="url(#cw-moon)" />
      <text x="38" y="40" fontFamily={FONTS.serif} fontWeight="700" fontStyle="italic"
      fontSize="22" fill="#fff" letterSpacing="0.5">CHIFA</text>
      <text x="38" y="64" fontFamily={FONTS.serif} fontWeight="700" fontStyle="italic"
      fontSize="22" fill={TOKENS.red} letterSpacing="0.5">WOK</text>
      <text x="6" y="86" fontFamily={FONTS.serif} fontStyle="italic" fontSize="9"
      fill="#fff" letterSpacing="0.4">Fusión China · Peruana</text>
    </svg>);

}

// ── Reusable bits ─────────────────────────────────────────────────
function Glyph({ ch, size = 56, tone = 'gold', soft = false }) {
  const bg = soft ? tone === 'red' ? '#fbe6e8' : '#fbf2dc' : 'transparent';
  const fg = tone === 'red' ? TOKENS.red : TOKENS.gold;
  return (
    <div style={{
      width: size, height: size, borderRadius: size,
      background: bg, color: fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: FONTS.serif, fontSize: size * 0.55, fontWeight: 500,
      letterSpacing: -1, lineHeight: 1, flexShrink: 0,
      border: soft ? 'none' : `0.5px solid ${TOKENS.border}`
    }}>
      {ch}
    </div>);

}

function Tag({ label, color = 'red' }) {
  const map = {
    red: { bg: '#fbe6e8', fg: TOKENS.redDark },
    gold: { bg: '#faf0d4', fg: '#8a6517' },
    ink: { bg: '#222', fg: '#fff' },
    new: { bg: TOKENS.ink, fg: '#fff' }
  };
  const c = map[color] || map.red;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: c.bg, color: c.fg,
      fontFamily: FONTS.sans, fontWeight: 600, fontSize: 9.5,
      letterSpacing: 1.2, textTransform: 'uppercase',
      padding: '3px 8px', borderRadius: 99
    }}>{label}</span>);

}

function Divider({ ornament = false }) {
  if (!ornament) return <div style={{ height: 0.5, background: TOKENS.border, width: '100%' }} />;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: TOKENS.mutedSoft, padding: '4px 0' }}>
      <div style={{ flex: 1, height: 0.5, background: TOKENS.border }} />
      <span style={{ fontFamily: FONTS.serif, fontSize: 14 }}>◆</span>
      <div style={{ flex: 1, height: 0.5, background: TOKENS.border }} />
    </div>);

}

function PrimaryButton({ children, onClick, dark = true, full = true, sub, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...{
        width: full ? '100%' : 'auto',
        padding: '15px 22px',
        background: disabled ? '#cdc4b3' : dark ? TOKENS.ink : TOKENS.red,
        color: '#fff', border: 'none', borderRadius: 0,
        fontFamily: FONTS.sans, fontWeight: 600, fontSize: 14,
        letterSpacing: 1.5, textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 10, cursor: disabled ? 'not-allowed' : 'pointer'
      }, background: "rgb(255, 255, 255)", color: "rgb(0, 0, 0)" }}>
      <span>{children}</span>
      {sub && <span style={{ opacity: 0.55, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>{sub}</span>}
    </button>);

}

function GhostButton({ children, onClick, icon }) {
  return (
    <button onClick={onClick} style={{
      background: 'transparent', border: `0.5px solid ${TOKENS.ink}`,
      color: TOKENS.ink, padding: '11px 16px',
      fontFamily: FONTS.sans, fontWeight: 500, fontSize: 12,
      letterSpacing: 1.4, textTransform: 'uppercase',
      cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8
    }}>
      {icon}{children}
    </button>);

}

function IconChev({ dir = 'right', size = 12, color = TOKENS.ink }) {
  const r = { right: 0, down: 90, left: 180, up: 270 }[dir];
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" style={{ transform: `rotate(${r}deg)` }}>
      <path d="M4 2 L8 6 L4 10" fill="none" stroke={color} strokeWidth="1.2" />
    </svg>);

}

function IconBag({ size = 18, color = TOKENS.ink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 8 H19 L18 21 H6 L5 8 Z M9 8 V6 a3 3 0 0 1 6 0 V8" stroke={color} strokeWidth="1.3" />
    </svg>);

}

function IconPlus({ size = 14, color = TOKENS.ink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14">
      <path d="M7 2 V12 M2 7 H12" stroke={color} strokeWidth="1.4" fill="none" />
    </svg>);

}

function IconMinus({ size = 14, color = TOKENS.ink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14">
      <path d="M2 7 H12" stroke={color} strokeWidth="1.4" fill="none" />
    </svg>);

}

function IconWhatsapp({ size = 16, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.2 8.2 0 1 1 6.9 3.8zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-.7-.3-1.4-.8-2-1.5a8 8 0 0 1-1.2-1.5c-.1-.2 0-.4.1-.5l.4-.5.3-.4c.1-.2 0-.4 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.7.7-1 1.6-1 2.5a5 5 0 0 0 1 2.8c.7 1 2.5 3.8 6 5.2.8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.2z" />
    </svg>);

}

Object.assign(window, {
  TOKENS, FONTS, formatARS, BrandMark, Glyph, Tag, Divider,
  PrimaryButton, GhostButton, IconChev, IconBag, IconPlus, IconMinus, IconWhatsapp
});