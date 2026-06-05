// ──────────────────────────────────────────────────────────────────
// Chifa Wok — Web shell (responsive layout for PC + móvil)
// ──────────────────────────────────────────────────────────────────

const { useState: useStateW, useEffect: useEffectW, useMemo: useMemoW, useRef: useRefW } = React;

// ── Top nav (sticky, responsive) ──────────────────────────────────
// Decorative gold line dragon for the header (faces right; mirror with .right)
function HeaderDragon({ side }) {
  return (
    <svg className={`cw-hd-dragon ${side}`} viewBox="0 0 1180 240" preserveAspectRatio="xMinYMid meet" aria-hidden="true">
      <g fill="none" stroke="#f3d089" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 150 C 130 70, 215 215, 320 150 S 500 70, 620 150 S 830 220, 940 150" />
        <path d="M40 150 C 130 86, 215 199, 320 150 S 500 86, 620 150 S 830 204, 940 150" strokeWidth="1.4" opacity="0.55" />
        <path d="M120 118 l-6 -16 M180 132 l-5 -16 M250 168 l5 17 M315 152 l-6 -17 M390 116 l-5 -17 M470 112 l0 -18 M545 118 l-6 -17 M620 150 l-6 -17 M700 168 l5 17 M780 180 l5 17 M850 172 l5 16" />
        <path d="M905 132 q-18 -10 -34 2 M912 120 q-20 -14 -40 -6 M922 150 q-20 6 -34 22" strokeWidth="2" opacity="0.8" />
        <path d="M940 150 q30 -8 52 -2 q22 4 36 -8 q18 -14 14 -34 q-2 -16 -18 -22" />
        <path d="M992 148 q22 8 40 0 q16 -8 12 -26" strokeWidth="2.4" />
        <path d="M1024 84 q14 -10 8 -26 q12 10 8 26" />
        <path d="M1010 92 q24 -22 18 -54 q14 24 6 52" />
        <path d="M1040 120 q42 -16 78 -2 M1034 138 q40 4 60 26" strokeWidth="2" opacity="0.85" />
        <circle cx="998" cy="116" r="4.5" fill="#f3d089" stroke="none" />
        <path d="M650 165 q-4 28 -24 42 M626 207 l-13 -4 M626 207 l-3 -14 M626 207 l11 -2" />
        <path d="M40 150 q-22 -8 -30 -28 q18 6 26 16 q-6 -20 4 -36 q10 16 6 34" strokeWidth="2.2" />
      </g>
    </svg>);
}

function HeaderLantern({ side }) {
  return (
    <svg className={`cw-hd-lantern ${side}`} viewBox="0 0 34 102" aria-hidden="true">
      <line x1="17" y1="0" x2="17" y2="40" stroke="#f5d99a" strokeWidth="1" opacity="0.45" />
      <rect x="11" y="40" width="12" height="5" rx="1" fill="#e7c25a" />
      <ellipse cx="17" cy="66" rx="15" ry="21" fill="#9b121f" />
      <ellipse cx="17" cy="66" rx="15" ry="21" fill="none" stroke="#f5d99a" strokeWidth="0.6" opacity="0.6" />
      <path d="M9 50 Q5 66 9 82 M17 47 Q14 66 17 85 M25 50 Q29 66 25 82" fill="none" stroke="#f5d99a" strokeWidth="0.8" opacity="0.5" />
      <rect x="11" y="86" width="12" height="5" rx="1" fill="#e7c25a" />
      <path d="M13 91 v8 M17 91 v11 M21 91 v8" stroke="#f5d99a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>);
}

function SiteHeader({ screen, go, cart, onOpenCart, onHowTo }) {
  const count = cart.reduce((s, it) => s + it.qty, 0);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const close = () => setMenuOpen(false);
  return (
    <header className="cw-header">
      <div className="cw-header-inner">
        <div className="cw-header-deco" aria-hidden="true">
          <HeaderDragon side="left" />
          <HeaderDragon side="right" />
          <HeaderLantern side="l" />
          <HeaderLantern side="r" />
        </div>

        <button onClick={() => { go('home'); close(); }} className="cw-brand-mini" aria-label="Inicio">
          <span className="cw-brand-mini-square"/>
          <span className="cw-brand-word">Chifa Wok</span>
        </button>

        <nav className="cw-nav">
          <button onClick={() => go('home')} className={`cw-nav-link ${screen === 'home' ? 'on' : ''}`}>Carta</button>
          <button onClick={onHowTo} className="cw-nav-link">Cómo hacer pedido</button>
          <button onClick={() => go('contact')} className={`cw-nav-link ${screen === 'contact' ? 'on' : ''}`}>Contacto</button>
        </nav>

        <div className="cw-header-right">
          <button onClick={onOpenCart} className="cw-cart-btn" aria-label="Carrito">
            <IconBag size={18} />
            {count > 0 && <span className="cw-cart-count">{count}</span>}
          </button>
          <button
            className="cw-hamburger"
            aria-label="Menú"
            onClick={() => setMenuOpen(o => !o)}>
            <span className={`cw-ham-bar ${menuOpen ? 'open' : ''}`}/>
            <span className={`cw-ham-bar ${menuOpen ? 'open' : ''}`}/>
            <span className={`cw-ham-bar ${menuOpen ? 'open' : ''}`}/>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="cw-mobile-menu" onClick={close}>
          <button onClick={() => { go('home'); }} className={`cw-mob-link ${screen === 'home' ? 'on' : ''}`}>Carta</button>
          <button onClick={() => { onHowTo(); }} className="cw-mob-link">Cómo hacer pedido</button>
          <button onClick={() => { go('contact'); }} className={`cw-mob-link ${screen === 'contact' ? 'on' : ''}`}>Contacto</button>
        </div>
      )}
    </header>);

}

const WA_NUMBER = '5492613431904';
const WA_DISPLAY = '261 343 1904';
const IG_USER = 'chifa_wok__';
const IG_URL = `https://instagram.com/${IG_USER}`;

function IconInstagram({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill={color} stroke="none" />
    </svg>);
}

function SiteFooter() {
  return (
    <footer className="cw-footer">
      <div className="cw-foot-cta">
        <div className="cw-foot-cta-glyph" aria-hidden="true">飯</div>
        <div className="cw-foot-cta-inner">
          <div>
            <div className="cw-foot-cta-eyebrow">¿Listo para pedir?</div>
            <h2 className="cw-foot-cta-h">Armá tu pedido y te lo confirmamos por WhatsApp.</h2>
          </div>
          <a className="cw-foot-cta-btn" href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer">
            <IconWhatsapp size={20} color="#25d366" /> Escribinos · {WA_DISPLAY}
          </a>
        </div>
      </div>

      <div className="cw-foot-info">
        <div className="cw-footer-col">
          <div className="cw-foot-title">Chifa Wok</div>
          <div className="cw-foot-tagline">Fusión china · peruana<br />Mendoza, Argentina</div>
        </div>
        <div className="cw-footer-col">
          <div className="cw-foot-h">Horario</div>
          <div className="cw-foot-row">Miércoles a Sábado<br />20:00 — 23:30</div>
        </div>
        <div className="cw-footer-col">
          <div className="cw-foot-h">Modalidad</div>
          <div className="cw-foot-row">Delivery · Take away<br />Reservas · Pre-orden</div>
        </div>
        <div className="cw-foot-social">
          <a className="cw-foot-soc-btn" href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer">
            <IconWhatsapp size={18} color="#25d366" /> {WA_DISPLAY}
          </a>
          <a className="cw-foot-soc-btn" href={IG_URL} target="_blank" rel="noreferrer">
            <IconInstagram size={18} color="#e7decd" /> @{IG_USER}
          </a>
        </div>
      </div>

      <div className="cw-footer-bot">
        <span>© 2025 Chifa Wok</span>
        <span>Diseñado con ♥ en Mendoza</span>
      </div>
    </footer>);

}

// ── Contact screen ────────────────────────────────────────────────
function ContactScreen({ go, cart, onOpenCart }) {
  return (
    <div className="cw-page" style={{ paddingTop: 60, paddingBottom: 80 }}>
      <div className="cw-container-narrow">
        <div style={{
          fontFamily: FONTS.sans, fontSize: 11, color: TOKENS.red,
          letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14
        }}>Visitanos · pedinos</div>
        <h1 style={{
          fontFamily: FONTS.serif, fontStyle: 'italic', fontSize: 'clamp(40px, 7vw, 64px)',
          color: TOKENS.ink, lineHeight: 1, margin: '0 0 24px', letterSpacing: -1, fontWeight: 500
        }}>Hablemos.</h1>

        <div className="cw-contact-grid">
          <div className="cw-contact-card">
            <div className="cw-contact-glyph">電</div>
            <div className="cw-contact-label">Reservas y pedidos</div>
            <div className="cw-contact-val">261 343 1904</div>
            <a href="https://wa.me/5492613431904" target="_blank" rel="noreferrer" className="cw-contact-cta">
              <IconWhatsapp size={12} color="#fff" /> Abrir WhatsApp
            </a>
          </div>
          <div className="cw-contact-card">
            <div className="cw-contact-glyph">時</div>
            <div className="cw-contact-label">Horario</div>
            <div className="cw-contact-val" style={{ fontSize: 22 }}>Miércoles<br />a Sábado</div>
            <div style={{ fontFamily: FONTS.sans, fontSize: 13, color: TOKENS.muted, marginTop: 8 }}>20:00 — 23:30 hs</div>
          </div>
          <div className="cw-contact-card">
            <div className="cw-contact-glyph">送</div>
            <div className="cw-contact-label">Envíos</div>
            <div className="cw-contact-val" style={{ fontSize: 18 }}>Coordinamos por<br />PedidosYa / Uber Envíos</div>
            <div style={{ fontFamily: FONTS.sans, fontStyle: 'italic', fontSize: 12, color: TOKENS.muted, marginTop: 8 }}>
              El costo lo consultás al hacer el pedido.
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <PrimaryButton onClick={() => go('menu')}>Ver la carta</PrimaryButton>
        </div>
      </div>
    </div>);

}

// ── How to order — editorial + WhatsApp chat mockup (opción 2) ────
// ── Chinese graphic helpers (chopsticks, wok, lantern, dragon, bag) ──
function GfxLantern({ className }) {
  return (
    <svg className={className} width="30" height="116" viewBox="0 0 34 132" aria-hidden="true">
      <line x1="17" y1="0" x2="17" y2="46" stroke="#e2a83a" strokeWidth="1" opacity="0.5" />
      <rect x="11" y="46" width="12" height="5" rx="1" fill="#caa233" />
      <ellipse cx="17" cy="74" rx="16" ry="23" fill="#d6312f" />
      <ellipse cx="17" cy="74" rx="16" ry="23" fill="none" stroke="#a01f1c" strokeWidth="0.6" />
      <path d="M9 56 Q5 74 9 92 M17 53 Q14 74 17 95 M25 56 Q29 74 25 92" fill="none" stroke="#a01f1c" strokeWidth="0.8" opacity="0.8" />
      <rect x="11" y="96" width="12" height="5" rx="1" fill="#caa233" />
      <path d="M13 101 v9 M17 101 v12 M21 101 v9" stroke="#e2a83a" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="17" cy="116" r="1.6" fill="#e2a83a" />
    </svg>);
}
function GfxDragon({ className }) {
  return (
    <svg className={className} viewBox="0 0 1100 360" aria-hidden="true">
      <g fill="none" stroke="#e2a83a" strokeWidth="3" strokeLinecap="round">
        <path d="M40 250 C 120 180, 180 320, 270 250 S 420 170, 520 250 S 690 330, 800 250 S 960 180, 1050 250" />
        <path d="M800 250 q40 -34 86 -20 q-22 -34 -64 -28 q26 -40 78 -28" />
        <circle cx="900" cy="214" r="7" fill="#e2a83a" stroke="none" />
        <path d="M150 250 l-14 -26 M270 250 l0 -30 M400 235 l8 -30 M520 250 l0 -32 M650 238 l-8 -30 M270 250 l-14 24 M400 250 l14 22 M520 250 l-14 24" />
      </g>
    </svg>);
}
function GfxWok({ className }) {
  return (
    <svg className={className} viewBox="0 0 152 108" aria-hidden="true">
      <path d="M56 28 q-9 -12 2 -24 M76 24 q-9 -12 2 -24 M96 28 q-9 -12 2 -24" fill="none" stroke="#e2a83a" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="60" cy="52" r="4.2" fill="#e2a83a" opacity="0.85" />
      <circle cx="78" cy="55" r="3.4" fill="#f5d99a" opacity="0.85" />
      <circle cx="93" cy="52" r="4.2" fill="#e2a83a" opacity="0.85" />
      <ellipse cx="76" cy="52" rx="52" ry="13" fill="none" stroke="#f5d99a" strokeWidth="2.4" />
      <path d="M24 52 Q76 118 128 52" fill="none" stroke="#e2a83a" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M24 51 q-15 -2 -19 5 M128 51 q15 -2 19 5" fill="none" stroke="#e2a83a" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M63 94 q4 -10 12 -6 q-2 -9 6 -11 q9 8 2 17" fill="none" stroke="#e63946" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
    </svg>);
}
function GfxChopMini() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ verticalAlign: 'middle' }}>
      <line x1="20" y1="4" x2="6" y2="19" stroke="#e2a83a" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="7" x2="9" y2="21" stroke="#e2a83a" strokeWidth="2" strokeLinecap="round" />
    </svg>);
}
function GfxChopsticks() {
  return (
    <svg width="42" height="40" viewBox="0 0 64 58" aria-hidden="true">
      <line x1="50" y1="6" x2="14" y2="48" stroke="#f5d99a" strokeWidth="3.2" strokeLinecap="round" />
      <line x1="56" y1="12" x2="20" y2="52" stroke="#e2a83a" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M9 40 a11 9 0 0 0 22 0 q-11 5 -22 0z" fill="none" stroke="#e2a83a" strokeWidth="2" />
      <path d="M12 41 q9 4 16 0 M15 38 l2 3 M20 38 l1 3.4 M25 38 l-1 3.4" stroke="#e2a83a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>);
}
function GfxWokIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M19 12 q-4 -5 1 -10 M27 11 q-4 -5 1 -10" fill="none" stroke="#e2a83a" strokeWidth="1.7" strokeLinecap="round" opacity="0.6" />
      <ellipse cx="24" cy="22" rx="16" ry="4.5" fill="none" stroke="#e2a83a" strokeWidth="2.1" />
      <path d="M9 22 Q24 42 39 22" fill="none" stroke="#e2a83a" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M9 21.5 q-5 -1 -6.5 2.5 M39 21.5 q5 -1 6.5 2.5" fill="none" stroke="#e2a83a" strokeWidth="2.1" strokeLinecap="round" />
    </svg>);
}
function GfxBag() {
  return (
    <svg width="42" height="42" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M13 17 h22 l-2 22 h-18z" fill="none" stroke="#e2a83a" strokeWidth="2.1" strokeLinejoin="round" />
      <path d="M18 17 a6 6 0 0 1 12 0" fill="none" stroke="#e2a83a" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M18 24 h12" stroke="#e2a83a" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
    </svg>);
}

// ── How to order — opción 2 (pasos + chat) con gráficos chinos ────
function HowToOrder({ go }) {
  const steps = [
    { ic: <GfxChopsticks />, t: 'Armá el carrito', d: 'Elegí tus platos desde la carta y ajustá cantidades.' },
    { ic: <GfxWokIcon />, t: 'Tocá "Pedir por WhatsApp"', d: 'Generamos el mensaje con tu pedido y el total, listo para enviar.' },
    { ic: <GfxBag />, t: 'Confirmás y coordinás', d: 'Nos decís nombre, horario y si es retiro o delivery. Listo.' },
  ];
  return (
    <section className="cw-hto2">
      <div className="cw-hto2-deco" aria-hidden="true">
        <GfxDragon className="cw-hto2-dragon" />
        <GfxWok className="cw-hto2-wok" />
        <GfxLantern className="cw-hto2-lantern" />
      </div>
      <div className="cw-container cw-hto2-grid">
        <div className="cw-hto2-left">
          <div className="cw-hto2-eyebrow"><GfxChopMini /> En 3 pasos</div>
          <h2 className="cw-hto2-title">Cómo hacer<br />tu pedido</h2>

          <div className="cw-hto2-steps">
            {steps.map((s, i) =>
            <div key={i} className="cw-hto2-step">
                <div className="cw-hto2-step-ic">{s.ic}</div>
                <div>
                  <div className="cw-hto2-step-t">{s.t}</div>
                  <div className="cw-hto2-step-d">{s.d}</div>
                </div>
              </div>
            )}
          </div>

          <button className="cw-hto2-cta" onClick={() => go('menu')}>Empezá tu pedido</button>
        </div>

        <div className="cw-phone">
          <div className="cw-phone-screen">
            <div className="cw-phone-top">
              <div className="cw-phone-av"><span /></div>
              <div>
                <div className="cw-phone-name">Chifa Wok</div>
                <div className="cw-phone-status">en línea</div>
              </div>
            </div>
            <div className="cw-phone-body">
              <div className="cw-bub">
                ¡Hola Chifa Wok! 🥢 Quiero hacer un pedido:
                <div className="cw-bub-li"><span>Chaufa Especial ×1</span><b>$25.500</b></div>
                <div className="cw-bub-li"><span>Siu Kao x4 ×1</span><b>$9.500</b></div>
                <div className="cw-bub-li"><span>Pisco Sour ×1</span><b>$9.000</b></div>
                <div className="cw-bub-li cw-bub-tot"><span>Total</span><span>$44.000</span></div>
                <div className="cw-bub-meta">Nombre: Caro · Entrega: Delivery 🛵</div>
                <span className="cw-bub-time">21:04 ✓✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
}

// ── Back-to-top button — arrow drawn as two chopsticks ────────────
function BackToTop() {
  const [show, setShow] = useStateW(false);
  useEffectW(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={`cw-top ${show ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver al inicio">
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <line x1="5" y1="20" x2="14" y2="4" stroke="#f5d99a" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="21" y1="20" x2="12" y2="4" stroke="#e2a83a" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="14" cy="4" r="1.3" fill="#f5d99a" />
        <circle cx="12" cy="4" r="1.3" fill="#e2a83a" />
      </svg>
    </button>);
}

// ── Web wrappers around mobile screens (constrain max-width, etc.) ────
function WebHome({ go, cart, onOpenCart }) {
  return (
    <div className="cw-page">
      {/* Hero — black band */}
      <HeroBand />

      {/* Featured combo */}
      <section className="cw-section cw-featured">
        <div className="cw-container">
          <div className="cw-section-eyebrow">Combo destacado</div>
          <div className="cw-featured-card">
            <div className="cw-featured-text">
              <div className="cw-featured-name">Noche Chifa</div>
              <div className="cw-featured-desc">Plato chino + entrada + postre + copa de Malbec. Disponible toda la semana de servicio.</div>
              <div className="cw-featured-prices">
                <span className="cw-featured-now">{formatARS(48000)}</span>
                <span className="cw-featured-was">{formatARS(55000)}</span>
              </div>
              <PrimaryButton onClick={() => go('menu')}>Pedir ahora</PrimaryButton>
            </div>
            <div className="cw-featured-glyph">夜</div>
          </div>
        </div>
      </section>

      {/* Highlights grid */}
      <section className="cw-section">
        <div className="cw-container">
          <div className="cw-section-eyebrow">Lo que cocinamos</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            <h2 className="cw-h2">11 categorías,<br />más de 50 platos.</h2>
            <button onClick={() => go('menu')} className="cw-link-cta">
              Ver carta completa <IconChev size={10} />
            </button>
          </div>

          <div className="cw-cat-grid">
            {MENU_CATEGORIES.slice(0, 8).map((c) =>
            <button key={c.id} onClick={() => go('menu', c.id)} className="cw-cat-tile">
                <span className="cw-cat-bar" />
                <div className="cw-cat-name">{c.label}</div>
                {c.tagline && <div className="cw-cat-tag">{c.tagline}</div>}
                <div className="cw-cat-count">{String(MENU_ITEMS.filter((i) => i.cat === c.id).length).padStart(2, '0')} platos</div>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* How to order — festive graphic band */}
      <HowToOrder go={go} />
    </div>);

}

// ── Reusable hero band (black with serif wordmark) ────────────────
function HeroBand({ ctaPrimary, ctaSecondary, showCtas = false }) {
  return (
    <section className="cw-hero-band">
      <div className="cw-hero-band-inner">
        <h1 className="cw-hero-band-word">
          <span>Chifa</span> <span className="cw-hero-band-word-red">Wok</span>
        </h1>
        <div className="cw-hero-band-sub">Fusión China — Peruana · Mendoza</div>
        <div className="cw-hero-band-rule" />
        {showCtas &&
        <div className="cw-hero-band-ctas">
            {ctaPrimary &&
          <button onClick={ctaPrimary.onClick} className="cw-hero-band-cta-primary">{ctaPrimary.label}</button>
          }
            {ctaSecondary &&
          <button onClick={ctaSecondary.onClick} className="cw-hero-band-cta-ghost">{ctaSecondary.label}</button>
          }
          </div>
        }
      </div>
    </section>);

}

// ── Menu screen — pills filter + flat card grid ──────────────────
function WebMenu({ go, cart, addToCart, openItem, initialCat = 'all' }) {
  const [active, setActive] = useStateW(initialCat === 'chaufa' ? 'all' : initialCat || 'all');

  // "all" means show every category section
  const visibleCats = active === 'all' ?
  MENU_CATEGORIES :
  MENU_CATEGORIES.filter((c) => c.id === active);

  // Map current cart by item id → qty (only count lines with no note so the inline counter matches)
  const qtyById = useMemoW(() => {
    const map = {};
    for (const l of cart) {
      if (l.note) continue;
      map[l.id] = (map[l.id] || 0) + l.qty;
    }
    return map;
  }, [cart]);

  return (
    <div className="cw-page cw-menu-page">
      {/* Hero band on top of menu */}
      <HeroBand />

      {/* Pills */}
      <div className="cw-pills-wrap">
        <div className="cw-container">
          <PillsRow active={active} setActive={setActive} />
        </div>
      </div>

      {/* Sections */}
      <div className="cw-container" style={{ paddingTop: 36, paddingBottom: 100 }}>
        {visibleCats.map((cat) => {
          const items = MENU_ITEMS.filter((it) => it.cat === cat.id);
          if (items.length === 0) return null;
          return (
            <section key={cat.id} className="cw-cat-block">
              <h2 className="cw-cat-block-title">
                <span className="cw-cat-block-bar" />
                {cat.label.toUpperCase()}
              </h2>
              <div className="cw-flat-grid">
                {items.map((it) =>
                <FlatCard key={it.id} item={it}
                qty={qtyById[it.id] || 0}
                onAdd={() => addToCart(it, 1)}
                onRemove={() => {
                  // find line by id with no note and dec
                  const line = cart.find((l) => l.id === it.id && !l.note);
                  if (line) {
                    // dispatch via addToCart trick? we need a remove path.
                    // Use a global handler set on window via WebMenu prop
                    if (window.__cwUpdateQty) window.__cwUpdateQty(line.lineId, line.qty - 1);
                  }
                }} />

                )}
              </div>
            </section>);

        })}
      </div>

      {/* How to order — editorial + chat mockup */}
      <HowToOrder go={go} />

      {/* Instagram strip */}
      <InstagramStrip/>

      {/* Floating cart pill */}
      {cart.length > 0 &&
      <div className="cw-floating-cart">
          <button onClick={() => go('cart')} className="cw-floating-cart-btn">
            <span className="cw-fc-count">{cart.reduce((s, it) => s + it.qty, 0)}</span>
            <span className="cw-fc-label">Ver pedido</span>
            <span className="cw-fc-total">{formatARS(cart.reduce((s, it) => s + it.qty * it.price, 0))}</span>
          </button>
        </div>
      }
    </div>);

}

function PillButton({ children, on, onClick }) {
  return (
    <button onClick={onClick} className={`cw-pill ${on ? 'on' : ''}`}>{children}</button>
  );
}

function PillsRow({ active, setActive }) {
  const scrollerRef = useRefW(null);
  const [canL, setCanL] = useStateW(false);
  const [canR, setCanR] = useStateW(true);
  const update = () => {
    const el = scrollerRef.current;if (!el) return;
    setCanL(el.scrollLeft > 4);
    setCanR(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };
  useEffectW(() => {
    update();
    const el = scrollerRef.current;if (!el) return;
    const onScroll = () => update();
    el.addEventListener('scroll', onScroll);
    window.addEventListener('resize', update);
    return () => {el.removeEventListener('scroll', onScroll);window.removeEventListener('resize', update);};
  }, []);
  const scrollBy = (delta) => {
    const el = scrollerRef.current;if (!el) return;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };
  return (
    <div className="cw-pills-row">
      <button className={`cw-pills-arrow ${canL ? '' : 'off'}`} onClick={() => scrollBy(-260)} aria-label="Anterior" disabled={!canL}>
        <IconChev dir="left" size={12} color="#fff" />
      </button>
      <div className="cw-pills cw-scroll" ref={scrollerRef}>
        <PillButton on={active === 'all'} onClick={() => setActive('all')}>Todo</PillButton>
        {MENU_CATEGORIES.map((c) =>
        <PillButton key={c.id} on={active === c.id} onClick={() => setActive(c.id)}>
            {c.label}
          </PillButton>
        )}
      </div>
      <button className={`cw-pills-arrow ${canR ? '' : 'off'}`} onClick={() => scrollBy(260)} aria-label="Siguiente" disabled={!canR}>
        <IconChev dir="right" size={12} color="#fff" />
      </button>
    </div>);

}function FlatCard({ item, qty, onAdd, onRemove }) {
  return (
    <article className="cw-flat-card">
      <h3 className="cw-flat-name">{item.name}</h3>
      {item.desc && <p className="cw-flat-desc">{item.desc}</p>}
      <div className="cw-flat-tags">
        {item.tag && <Tag label={item.tag} color={item.tag === 'Nuevo' ? 'new' : item.tag === 'Picante' ? 'red' : 'gold'} />}
        {item.veg && <Tag label="Veg" color="gold" />}
      </div>
      <div className="cw-flat-foot">
        <div className="cw-flat-price">{formatARS(item.price)}</div>
        <div className="cw-flat-qty">
          <button onClick={onRemove} disabled={qty === 0} aria-label="Quitar">
            <IconMinus size={12} color="#fff" />
          </button>
          <div className="cw-flat-qty-num">{qty}</div>
          <button onClick={onAdd} aria-label="Agregar">
            <IconPlus size={12} color="#fff" />
          </button>
        </div>
      </div>
    </article>);

}

// ── Instagram strip ──────────────────────────────────────────────
function InstagramStrip() {
  const posts = [
    { id: 1, caption: 'Ceviche · Wantanes · Causa', src: 'assets/ig-ceviche-collage.jpg' },
    { id: 2, caption: 'Wantanes',                   src: 'assets/ig-wantanes.jpg' },
    { id: 3, caption: 'Causa Limeña',               src: 'assets/ig-causa.jpg' },
  ];
  return (
    <section className="cw-ig">
      <div className="cw-container">
        <div className="cw-ig-head">
          <div>
            <div className="cw-ig-eyebrow">Síguenos en Instagram</div>
            <h2 className="cw-ig-title">@chifa_wok__</h2>
          </div>
          <a href="https://instagram.com/chifa_wok__" target="_blank" rel="noreferrer" className="cw-ig-cta">
            Ver perfil
          </a>
        </div>
        <div className="cw-ig-grid">
          {posts.map(p => (
            <a key={p.id} href="https://instagram.com/chifa_wok__" target="_blank" rel="noreferrer" className="cw-ig-tile">
              <img src={p.src} alt={p.caption} loading="lazy"/>
              <div className="cw-ig-tile-overlay">
                <span className="cw-ig-tile-cap">{p.caption}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Item detail as a centered modal overlay ───────────────────────
function WebItemDetail({ item, cat, onClose, onAdd, cart }) {
  const [qty, setQty] = useStateW(1);
  const [note, setNote] = useStateW('');
  if (!item) return null;
  return (
    <div className="cw-modal-overlay" onClick={onClose}>
      <div className="cw-modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="cw-modal-close" aria-label="Cerrar">✕</button>
        <div className="cw-modal-hero">
          <div className="cw-modal-glyph">{cat?.glyph}</div>
          <div className="cw-modal-photo-note">foto próximamente</div>
        </div>
        <div className="cw-modal-body">
          <div className="cw-modal-tags">
            {item.tag && <Tag label={item.tag} color={item.tag === 'Nuevo' ? 'new' : item.tag === 'Picante' ? 'red' : 'gold'} />}
            {item.veg && <Tag label="Vegetariano" color="gold" />}
            <div className="cw-modal-cat">{cat?.label}</div>
          </div>
          <h2 className="cw-modal-name">{item.name}</h2>
          <div className="cw-modal-price">{formatARS(item.price)}</div>
          {item.desc && <p className="cw-modal-desc">{item.desc}</p>}
          <Divider />
          <div className="cw-modal-note-wrap">
            <div className="cw-modal-note-label">Notas para la cocina</div>
            <textarea value={note} onChange={(e) => setNote(e.target.value)}
            placeholder="Sin cebolla, picante extra…"
            className="cw-modal-note" />
          </div>
          <div className="cw-modal-add-row">
            <div className="cw-qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="−"><IconMinus /></button>
              <div>{qty}</div>
              <button onClick={() => setQty(qty + 1)} aria-label="+"><IconPlus /></button>
            </div>
            <button onClick={() => {onAdd(item, qty, note);onClose();}} className="cw-modal-add">
              <span>Agregar</span>
              <span style={{ fontFamily: FONTS.serif, fontSize: 18 }}>{formatARS(item.price * qty)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>);

}

// ── Cart / Checkout / Confirm — narrow centered ───────────────────
function WebCart({ go, cart, updateQty }) {
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  if (cart.length === 0) {
    return (
      <div className="cw-page">
        <div className="cw-container-narrow" style={{ padding: '80px 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: FONTS.serif, fontWeight: 600, textTransform: 'uppercase', fontSize: 28, letterSpacing: 3, color: TOKENS.ink, margin: '12px 0 8px' }}>Carrito vacío</h2>
          <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: TOKENS.muted, lineHeight: 1.5, margin: '0 0 24px' }}>
            Elegí algo de la carta para empezar tu pedido.
          </p>
          <div style={{ maxWidth: 240, margin: '0 auto' }}>
            <PrimaryButton onClick={() => go('menu')}>Ir a la carta</PrimaryButton>
          </div>
        </div>
      </div>);

  }
  return (
    <div className="cw-page">
      <div className="cw-cartA-wrap">
        <div className="cw-section-eyebrow">Tu pedido</div>
        <h1 className="cw-cartA-title">Tu carrito</h1>
        <div className="cw-cartA-meta">{cart.reduce((s, i) => s + i.qty, 0)} platos · Chifa Wok</div>

        <div className="cw-cartA-list">
          {cart.map((it) =>
          <div className="cw-cartA-card" key={it.lineId}>
              <div className="cw-cartA-thumb">
                {it.img ? <img src={it.img} alt={it.name}/> : <span>{it.glyph}</span>}
              </div>
              <div className="cw-cartA-mid">
                <div className="cw-cartA-name">{it.name}</div>
                <div className="cw-cartA-unit">{formatARS(it.price)} c/u</div>
                {it.note && <div className="cw-cart-note">"{it.note}"</div>}
                <button onClick={() => updateQty(it.lineId, 0)} className="cw-cartA-remove">Quitar</button>
              </div>
              <div className="cw-cartA-right">
                <div className="cw-cartA-line">{formatARS(it.price * it.qty)}</div>
                <div className="cw-cartA-stepper">
                  <button onClick={() => updateQty(it.lineId, it.qty - 1)} aria-label="Quitar uno"><IconMinus size={12}/></button>
                  <span className="n">{it.qty}</span>
                  <button onClick={() => updateQty(it.lineId, it.qty + 1)} aria-label="Agregar uno"><IconPlus size={12}/></button>
                </div>
              </div>
            </div>
          )}
        </div>

        <button onClick={() => go('menu')} className="cw-add-more">+ agregar más</button>
      </div>

      <div className="cw-cartA-foot">
        <div className="cw-cartA-frow"><span>Subtotal</span><span>{formatARS(subtotal)}</span></div>
        <div className="cw-cartA-frow"><span>Envío</span><span>A coordinar</span></div>
        <div className="cw-cartA-frow tot"><span>Total</span><span>{formatARS(subtotal)}</span></div>
        <div className="cw-cartA-note">El envío se coordina por WhatsApp con PedidosYa o Uber Envíos.</div>
        <button onClick={() => go('checkout')} className="cw-cartA-cta">Continuar al pedido</button>
      </div>
    </div>);

}

function WebCheckout({ go, cart, checkout, setCheckout, onSubmit }) {
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const gatedOk = !checkout.isGated || (checkout.gatedName && checkout.gatedFamily && checkout.gatedBlock);
  const ready = checkout.name && (checkout.mode === 'pickup' || checkout.address) && checkout.payment && gatedOk;
  return (
    <div className="cw-page">
      <div className="cw-ckA-wrap">
        <button onClick={() => go('cart')} className="cw-ckA-back">
          <IconChev dir="left" size={11} /> Volver al carrito
        </button>
        <div className="cw-section-eyebrow">Datos del pedido</div>
        <h1 className="cw-ckA-h">Casi listo</h1>

        {/* Modalidad */}
        <div className="cw-ckA-card">
          <h3 className="cw-ckA-cardh">Modalidad</h3>
          <div className="cw-ckA-seg">
            <button
              className={checkout.mode === 'delivery' ? 'on' : ''}
              onClick={() => setCheckout({ ...checkout, mode: 'delivery' })}>
              Delivery<small>a coordinar</small>
            </button>
            <button
              className={checkout.mode === 'pickup' ? 'on' : ''}
              onClick={() => setCheckout({ ...checkout, mode: 'pickup' })}>
              Retiro<small>en local</small>
            </button>
          </div>
        </div>

        {/* Tus datos */}
        <div className="cw-ckA-card">
          <h3 className="cw-ckA-cardh">Tus datos</h3>
          <BoxField label="Nombre" value={checkout.name} onChange={(v) => setCheckout({ ...checkout, name: v })} placeholder="Pepe" />
          <BoxField label="Teléfono" value={checkout.phone} onChange={(v) => setCheckout({ ...checkout, phone: v })} placeholder="261 …" type="tel" />
          {checkout.mode === 'delivery' ? (
            <>
              <BoxField label="Dirección" value={checkout.address} onChange={(v) => setCheckout({ ...checkout, address: v })} placeholder="Calle 123, piso 2 — referencia" />

              {/* Barrio privado toggle */}
              <div
                onClick={() => setCheckout({ ...checkout, isGated: !checkout.isGated, gatedName: '', gatedFamily: '', gatedBlock: '' })}
                className="cw-ckA-gated-toggle"
              >
                <div className={`cw-ckA-gated-check ${checkout.isGated ? 'on' : ''}`}>
                  {checkout.isGated && <span>✓</span>}
                </div>
                <span>Es barrio privado / country</span>
              </div>

              {/* Sub-formulario barrio privado */}
              {checkout.isGated && (
                <div className="cw-ckA-gated-box">
                  <div className="cw-ckA-gated-title">Datos del barrio</div>
                  <BoxField label="Nombre del barrio" value={checkout.gatedName} onChange={(v) => setCheckout({ ...checkout, gatedName: v })} placeholder="Ej: Los Alamos" gated />
                  <BoxField label="Nombre de la familia" value={checkout.gatedFamily} onChange={(v) => setCheckout({ ...checkout, gatedFamily: v })} placeholder="Ej: García" gated />
                  <BoxField label="Manzana" value={checkout.gatedBlock} onChange={(v) => setCheckout({ ...checkout, gatedBlock: v })} placeholder="Ej: B — Lote 14" gated last />
                </div>
              )}
            </>
          ) :
            <BoxField label="Día/Hora de retiro" value={checkout.pickupTime} onChange={(v) => setCheckout({ ...checkout, pickupTime: v })} placeholder="Hoy 21:00 — A coordinar" last />}
        </div>

        {/* Método de pago */}
        <div className="cw-ckA-card">
          <h3 className="cw-ckA-cardh">Método de pago</h3>
          <BoxPaymentList value={checkout.payment} onChange={(v) => setCheckout({ ...checkout, payment: v })} />
          {checkout.payment === 'Transferencia' &&
            <div className="cw-alias-card" style={{ marginTop: 12 }}>
              <div className="cw-alias-label">Datos para transferir (Mercado Pago)</div>
              <div className="cw-alias-body">
                Alias: <b>fusionchinaperuana</b><br />
                Titular: <b>Alicia Ríos Seminario</b>
              </div>
              <div className="cw-alias-warn">Coordiná el horario por WhatsApp antes de transferir.</div>
            </div>
          }
        </div>

        {/* Observaciones */}
        <div className="cw-ckA-card">
          <h3 className="cw-ckA-cardh">Observaciones</h3>
          <textarea
            value={checkout.notes}
            onChange={(e) => setCheckout({ ...checkout, notes: e.target.value })}
            placeholder="Algo extra que tengamos que saber…"
            className="cw-ckA-notes" />
        </div>

        {/* Resumen del pedido (de la propuesta C) */}
        <div className="cw-ckA-card cw-ckA-summary">
          <h3 className="cw-ckA-cardh">Tu pedido</h3>
          {cart.map((it) =>
            <div key={it.lineId} className="cw-ckA-sumrow">
              <span className="cw-ckA-sumname">{it.qty}× <b>{it.name}</b></span>
              <span className="cw-ckA-sumprice">{formatARS(it.price * it.qty)}</span>
            </div>
          )}
          <div className="cw-ckA-sumrow muted">
            <span className="cw-ckA-sumname">Envío</span>
            <span className="cw-ckA-sumprice">A coordinar</span>
          </div>
          <div className="cw-ckA-sumtot">
            <span>Total</span>
            <b>{formatARS(subtotal)}</b>
          </div>
        </div>

        <button
          className="cw-ckA-cta"
          disabled={!ready}
          onClick={() => ready && onSubmit()}>
          <IconWhatsapp size={15} /> Enviar por WhatsApp
        </button>
        <div className="cw-ckA-fineprint">
          {ready ? 'Al continuar se abrirá WhatsApp con el pedido pre-armado.' : 'Completá tus datos y el método de pago para continuar.'}
        </div>
      </div>
    </div>);

}

function BoxField({ label, value, onChange, placeholder, type = 'text', last }) {
  return (
    <div className="cw-ckA-fld" style={last ? { marginBottom: 0 } : null}>
      <div className="cw-ckA-lbl">{label}</div>
      <input type={type} value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="cw-ckA-input" />
    </div>);

}

function BoxPaymentList({ value, onChange }) {
  const ops = [
    { v: 'Transferencia', desc: 'A Mercado Pago · alias fusionchinaperuana' },
    { v: 'Efectivo', desc: 'Al recibir' },
    { v: 'Débito', desc: 'En local' },
    { v: 'Crédito', desc: 'En local' }];

  return (
    <div className="cw-ckA-pays">
      {ops.map((o) =>
        <button key={o.v} onClick={() => onChange(o.v)} className={`cw-ckA-pay ${value === o.v ? 'on' : ''}`}>
          <span className="cw-ckA-paydot" />
          <span className="cw-ckA-paytxt">
            <span className="cw-ckA-payname">{o.v}</span>
            <span className="cw-ckA-paydesc">{o.desc}</span>
          </span>
        </button>
      )}
    </div>);

}

function WebConfirm({ go, cart, checkout, resetOrder }) {
  const msg = buildWhatsappMessage(cart, checkout);
  const number = '5492613431904';
  const url = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
  return (
    <div className="cw-page">
      <div className="cw-container-narrow" style={{ padding: '40px 24px 80px', textAlign: 'center' }}>
        <div style={{ fontFamily: FONTS.serif, fontSize: 110, color: TOKENS.gold, opacity: 0.35, lineHeight: 1 }}>✓</div>
        <h1 style={{ fontFamily: FONTS.serif, fontStyle: 'italic', fontSize: 'clamp(28px, 5vw, 44px)', color: TOKENS.ink, margin: '8px 0 10px', lineHeight: 1.05 }}>Tu pedido está armado</h1>
        <p style={{ fontFamily: FONTS.sans, fontSize: 14, color: TOKENS.muted, lineHeight: 1.55, margin: '0 0 28px' }}>
          Al pulsar el botón vamos a abrir WhatsApp con este mensaje<br />para que se lo envíes a Chifa Wok.
        </p>

        <div className="cw-msg-preview">
          <div className="cw-msg-bubble">
            {msg.replace(/\*(.+?)\*/g, '$1').replace(/_(.+?)_/g, '$1')}
          </div>
        </div>

        <div style={{ fontFamily: FONTS.sans, fontSize: 11, color: TOKENS.muted, margin: '14px 0 24px', fontStyle: 'italic' }}>
          Enviando a +54 9 261 343 1904
        </div>

        <button className="cw-wa-btn" onClick={() => window.open(url, '_blank')}>
          <IconWhatsapp size={16} /> Abrir WhatsApp
        </button>
        <button onClick={() => {resetOrder();go('home');}} className="cw-link-quiet">
          Empezar nuevo pedido
        </button>
      </div>
    </div>);

}

// ── Top-level app ─────────────────────────────────────────────────
function ChifaWokWeb() {
  const [screen, setScreen] = useStateW('home');
  const [catFocus, setCatFocus] = useStateW('chaufa');
  const [openedItem, setOpenedItem] = useStateW(null);
  const [cart, setCart] = useStateW([]);
  const [checkout, setCheckout] = useStateW({ mode: 'delivery', name: '', phone: '', address: '', pickupTime: '', payment: '', notes: '', isGated: false, gatedName: '', gatedFamily: '', gatedBlock: '' });

  const go = (target, catId) => {
    if (catId) setCatFocus(catId);
    setScreen(target);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const addToCart = (item, qty = 1, note = '') => {
    const cat = MENU_CATEGORIES.find((c) => c.id === item.cat);
    setCart((prev) => {
      if (!note) {
        const idx = prev.findIndex((l) => l.id === item.id && !l.note);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + qty };
          return next;
        }
      }
      return [...prev, {
        lineId: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        id: item.id, name: item.name, price: item.price,
        glyph: cat?.glyph || '料', img: item.img || null, qty, note
      }];
    });
  };
  const updateQty = (lineId, qty) => setCart((prev) => qty <= 0 ? prev.filter((l) => l.lineId !== lineId) : prev.map((l) => l.lineId === lineId ? { ...l, qty } : l));
  // Expose for FlatCard inline minus button
  useEffectW(() => {window.__cwUpdateQty = updateQty;return () => {delete window.__cwUpdateQty;};}, [cart]);
  const resetOrder = () => {
    setCart([]);
    setCheckout({ mode: 'delivery', name: '', phone: '', address: '', pickupTime: '', payment: '', notes: '', isGated: false, gatedName: '', gatedFamily: '', gatedBlock: '' });
  };

  let body;
  if (screen === 'home') body = <WebMenu go={go} cart={cart} addToCart={addToCart} openItem={setOpenedItem} initialCat="all" />;else
  if (screen === 'menu') body = <WebMenu go={go} cart={cart} addToCart={addToCart} openItem={setOpenedItem} initialCat={catFocus} />;else
  if (screen === 'cart') body = <WebCart go={go} cart={cart} updateQty={updateQty} />;else
  if (screen === 'checkout') body = <WebCheckout go={go} cart={cart} checkout={checkout} setCheckout={setCheckout} onSubmit={() => go('confirm')} />;else
  if (screen === 'confirm') body = <WebConfirm go={go} cart={cart} checkout={checkout} resetOrder={resetOrder} />;else
  if (screen === 'contact') body = <ContactScreen go={go} cart={cart} onOpenCart={() => go('cart')} />;

  const cat = openedItem ? MENU_CATEGORIES.find((c) => c.id === openedItem.cat) : null;

  const goHowTo = () => {
    const doScroll = () => {
      const el = document.querySelector('.cw-hto2');
      if (!el) return;
      const start = window.scrollY;
      const target = el.getBoundingClientRect().top + window.scrollY - 72;
      const dist = target - start;
      const dur = 600;
      const t0 = Date.now();
      const ease = (p) => p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const id = setInterval(() => {
        const p = Math.min((Date.now() - t0) / dur, 1);
        window.scrollTo(0, start + dist * ease(p));
        if (p >= 1) clearInterval(id);
      }, 16);
    };
    if (screen !== 'home' && screen !== 'menu') { setScreen('home'); setTimeout(doScroll, 90); }
    else doScroll();
  };

  return (
    <div className="cw-app">
      <SiteHeader screen={screen} go={go} cart={cart} onOpenCart={() => go('cart')} onHowTo={goHowTo} />
      <main>{body}</main>
      <SiteFooter />
      <BackToTop />
      {openedItem &&
      <WebItemDetail item={openedItem} cat={cat} cart={cart}
      onClose={() => setOpenedItem(null)} onAdd={addToCart} />
      }
    </div>);

}

Object.assign(window, { ChifaWokWeb });