// ──────────────────────────────────────────────────────────────────
// Chifa Wok — Screens
// All depend on globals from app-shared.jsx and menu-data.jsx
// ──────────────────────────────────────────────────────────────────

const { useState: useS, useEffect: useE, useMemo: useM, useRef: useR } = React;

// ── Status pill (top, scroll progress + cart) ─────────────────────
function ScreenChrome({ title, onBack, cart, onOpenCart, transparent = false, subtitle }) {
  const total = cart.reduce((s, it) => s + it.qty, 0);
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 5,
      background: transparent ? 'transparent' : TOKENS.bg,
      borderBottom: transparent ? 'none' : `0.5px solid ${TOKENS.border}`,
      padding: '12px 18px 12px',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      {onBack ? (
        <button onClick={onBack} aria-label="Volver" style={{
          background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, marginLeft: -6,
          display: 'flex', alignItems: 'center',
        }}>
          <IconChev dir="left" size={14}/>
        </button>
      ) : <div style={{ width: 14 }}/>}
      <div style={{ flex: 1, textAlign: 'center', minWidth: 0 }}>
        <div style={{
          fontFamily: FONTS.serif, fontSize: 18, fontStyle: 'italic',
          color: TOKENS.ink, letterSpacing: 0.5, lineHeight: 1,
        }}>{title}</div>
        {subtitle && <div style={{
          fontFamily: FONTS.sans, fontSize: 10, color: TOKENS.muted,
          letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 4,
        }}>{subtitle}</div>}
      </div>
      <button onClick={onOpenCart} aria-label="Carrito" style={{
        background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative',
        padding: 6, marginRight: -6,
      }}>
        <IconBag size={20}/>
        {total > 0 && (
          <span style={{
            position: 'absolute', top: 0, right: 0,
            minWidth: 16, height: 16, padding: '0 4px',
            background: TOKENS.red, color: '#fff', borderRadius: 16,
            fontFamily: FONTS.sans, fontWeight: 700, fontSize: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{total}</span>
        )}
      </button>
    </div>
  );
}

// ── Sticky cart pill at bottom ────────────────────────────────────
function CartPill({ cart, onClick }) {
  const total = cart.reduce((s, it) => s + it.qty * it.price, 0);
  const count = cart.reduce((s, it) => s + it.qty, 0);
  if (count === 0) return null;
  return (
    <div style={{
      position: 'sticky', bottom: 18, zIndex: 4,
      margin: '0 18px',
      animation: 'cw-rise 0.3s ease-out',
    }}>
      <button onClick={onClick} style={{
        width: '100%', background: TOKENS.ink, color: '#fff',
        border: 'none', padding: '14px 18px',
        display: 'flex', alignItems: 'center', gap: 14,
        cursor: 'pointer',
        boxShadow: '0 12px 30px rgba(26,22,18,0.28)',
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: 26, background: TOKENS.red,
          color: '#fff', fontFamily: FONTS.sans, fontWeight: 700, fontSize: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{count}</div>
        <div style={{
          flex: 1, textAlign: 'left',
          fontFamily: FONTS.sans, fontWeight: 600, fontSize: 13,
          letterSpacing: 1.5, textTransform: 'uppercase',
        }}>Ver pedido</div>
        <div style={{ fontFamily: FONTS.serif, fontSize: 18, fontWeight: 500 }}>
          {formatARS(total)}
        </div>
      </button>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// SCREEN: Home
// ──────────────────────────────────────────────────────────────────
function HomeScreen({ go, cart, onOpenCart }) {
  return (
    <div style={{ background: TOKENS.bg, minHeight: '100%', paddingBottom: 30 }}>
      {/* Top bar */}
      <div style={{
        padding: '14px 18px 0',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          fontFamily: FONTS.sans, fontSize: 10, color: TOKENS.muted,
          letterSpacing: 1.8, textTransform: 'uppercase',
        }}>Mendoza · AR</div>
        <button onClick={onOpenCart} style={{
          background: 'transparent', border: 'none', position: 'relative', cursor: 'pointer',
        }}>
          <IconBag size={20}/>
          {cart.length > 0 && <span style={{
            position: 'absolute', top: -2, right: -2,
            background: TOKENS.red, color: '#fff', width: 14, height: 14,
            borderRadius: 14, fontSize: 9, fontWeight: 700, fontFamily: FONTS.sans,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{cart.reduce((s, x) => s + x.qty, 0)}</span>}
        </button>
      </div>

      {/* Hero */}
      <div style={{ padding: '30px 22px 36px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            fontFamily: FONTS.serif, fontStyle: 'italic',
            fontSize: 13, color: TOKENS.red, letterSpacing: 6,
            textTransform: 'uppercase', marginBottom: 22,
          }}>est. mendoza</div>

          <div style={{ position: 'relative', marginBottom: 22 }}>
            <div style={{
              fontFamily: FONTS.serif, fontSize: 64, fontStyle: 'italic',
              color: TOKENS.ink, lineHeight: 0.92, letterSpacing: -1, fontWeight: 500,
            }}>Chifa</div>
            <div style={{
              fontFamily: FONTS.serif, fontSize: 64, fontStyle: 'italic',
              color: TOKENS.red, lineHeight: 0.92, letterSpacing: -1, fontWeight: 500,
              marginTop: -4,
            }}>Wok.</div>
            {/* Moon ornament */}
            <div style={{
              position: 'absolute', left: -36, top: -12, width: 32, height: 32,
              borderRadius: 32,
              background: `radial-gradient(circle at 35% 30%, #fff3c8, ${TOKENS.gold} 55%, #a37a1d)`,
              boxShadow: `inset -4px -3px 0 0 ${TOKENS.bg}`,
            }}/>
          </div>

          <div style={{
            fontFamily: FONTS.serif, fontSize: 14, color: TOKENS.muted,
            letterSpacing: 3, textTransform: 'uppercase', marginBottom: 2,
          }}>Fusión</div>
          <div style={{
            fontFamily: FONTS.serif, fontStyle: 'italic', fontSize: 18,
            color: TOKENS.ink, letterSpacing: 1,
          }}>china · peruana</div>
        </div>
      </div>

      {/* CTA stack */}
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <PrimaryButton onClick={() => go('menu')}>Ver la carta</PrimaryButton>
        <button onClick={() => go('menu', 'nuevos')} style={{
          background: 'transparent', border: `0.5px solid ${TOKENS.ink}`,
          color: TOKENS.ink, padding: '15px 22px',
          fontFamily: FONTS.sans, fontWeight: 500, fontSize: 13,
          letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span>Platos nuevos</span>
          <span style={{ fontFamily: FONTS.serif, fontStyle: 'italic', textTransform: 'none', letterSpacing: 0, fontSize: 14 }}>新 ·  4</span>
        </button>
      </div>

      {/* Info strip */}
      <div style={{ padding: '40px 22px 0' }}>
        <Divider ornament/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '24px 0' }}>
          <InfoCell label="Horario" value="Mié — Sáb" sub="20:00 — 23:30"/>
          <InfoCell label="Modalidad" value="Delivery" sub="& take away"/>
          <InfoCell label="Reservas" value="261 343 1904" sub="WhatsApp"/>
          <InfoCell label="Pre-orden" value="Hasta 1 día" sub="antes"/>
        </div>
        <Divider ornament/>
      </div>

      {/* Promo callout */}
      <div style={{ padding: '24px 18px 0' }}>
        <div style={{
          background: TOKENS.ink, color: '#fff', padding: '22px 20px 20px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -14, top: -10,
            fontFamily: FONTS.serif, fontSize: 110, color: TOKENS.gold,
            opacity: 0.18, lineHeight: 1,
          }}>夜</div>
          <div style={{
            fontFamily: FONTS.sans, fontSize: 10, color: TOKENS.gold,
            letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 8,
          }}>Combo destacado</div>
          <div style={{
            fontFamily: FONTS.serif, fontStyle: 'italic', fontSize: 32,
            lineHeight: 1, marginBottom: 6, letterSpacing: -0.5,
          }}>Noche Chifa</div>
          <div style={{
            fontFamily: FONTS.sans, fontSize: 12, color: '#c9bfa9',
            lineHeight: 1.5, marginBottom: 16, maxWidth: 240,
          }}>
            Plato chino + entrada + postre + copa de Malbec.
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <div style={{ fontFamily: FONTS.serif, fontSize: 28 }}>{formatARS(48000)}</div>
            <div style={{ fontFamily: FONTS.sans, fontSize: 12, color: '#7a705c', textDecoration: 'line-through' }}>{formatARS(55000)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCell({ label, value, sub }) {
  return (
    <div>
      <div style={{
        fontFamily: FONTS.sans, fontSize: 9.5, color: TOKENS.muted,
        letterSpacing: 1.8, textTransform: 'uppercase', marginBottom: 6,
      }}>{label}</div>
      <div style={{ fontFamily: FONTS.serif, fontSize: 18, color: TOKENS.ink, lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontFamily: FONTS.sans, fontSize: 11, color: TOKENS.muted, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// SCREEN: Menu
// ──────────────────────────────────────────────────────────────────
function MenuScreen({ go, cart, addToCart, openItem, initialCat = 'chaufa' }) {
  const [active, setActive] = useS(initialCat);

  // Refs to scroll between categories
  const refs = useR({});
  const scrollTo = (id) => {
    setActive(id);
    const el = refs.current[id];
    const parent = el && el.parentElement && el.parentElement.parentElement;
    if (el && parent) {
      // Scroll within app container
      const top = el.offsetTop - 100;
      parent.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ background: TOKENS.bg, minHeight: '100%' }}>
      <ScreenChrome title="La carta" subtitle="Carta 2025" cart={cart} onOpenCart={() => go('cart')} onBack={() => go('home')}/>

      {/* Category tabs */}
      <div style={{
        position: 'sticky', top: 53, zIndex: 4,
        background: TOKENS.bg, borderBottom: `0.5px solid ${TOKENS.border}`,
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        <div style={{ display: 'flex', gap: 0, padding: '0 14px', minWidth: 'min-content' }}>
          {MENU_CATEGORIES.map(c => (
            <button key={c.id} onClick={() => scrollTo(c.id)} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: '14px 12px', position: 'relative',
              fontFamily: FONTS.sans, fontWeight: active === c.id ? 600 : 500,
              fontSize: 11, color: active === c.id ? TOKENS.ink : TOKENS.muted,
              letterSpacing: 1.4, textTransform: 'uppercase', whiteSpace: 'nowrap',
            }}>
              {c.label}
              {active === c.id && <div style={{
                position: 'absolute', bottom: 0, left: 12, right: 12,
                height: 1.5, background: TOKENS.red,
              }}/>}
            </button>
          ))}
        </div>
      </div>

      {/* Category sections */}
      <div style={{ padding: '6px 0 90px' }}>
        {MENU_CATEGORIES.map(cat => {
          const items = MENU_ITEMS.filter(it => it.cat === cat.id);
          if (items.length === 0) return null;
          return (
            <div key={cat.id} ref={el => refs.current[cat.id] = el} style={{ padding: '24px 0 8px' }}>
              <div style={{ padding: '0 22px 14px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <Glyph ch={cat.glyph} size={44} tone="gold" soft/>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: FONTS.serif, fontStyle: 'italic', fontSize: 26,
                    color: TOKENS.ink, lineHeight: 1, letterSpacing: -0.3,
                  }}>{cat.label}</div>
                  {cat.tagline && <div style={{
                    fontFamily: FONTS.sans, fontSize: 10, color: TOKENS.muted,
                    letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 4,
                  }}>{cat.tagline}</div>}
                </div>
                <div style={{ fontFamily: FONTS.sans, fontSize: 10, color: TOKENS.mutedSoft }}>
                  {String(items.length).padStart(2, '0')}
                </div>
              </div>

              <div>
                {items.map((it, i) => (
                  <MenuRow key={it.id} item={it} cat={cat}
                    onTap={() => openItem(it)}
                    onAdd={() => addToCart(it, 1)}
                    last={i === items.length - 1}/>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <CartPill cart={cart} onClick={() => go('cart')}/>
    </div>
  );
}

function MenuRow({ item, cat, onTap, onAdd, last }) {
  return (
    <div onClick={onTap} style={{
      padding: '18px 22px',
      borderTop: `0.5px solid ${TOKENS.borderSoft}`,
      borderBottom: last ? `0.5px solid ${TOKENS.borderSoft}` : 'none',
      display: 'flex', gap: 14, cursor: 'pointer',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          {item.tag && <Tag label={item.tag} color={item.tag === 'Nuevo' ? 'new' : item.tag === 'Picante' ? 'red' : 'gold'}/>}
          {item.veg && <Tag label="Veg" color="gold"/>}
        </div>
        <div style={{
          fontFamily: FONTS.serif, fontSize: 17, color: TOKENS.ink,
          lineHeight: 1.15, letterSpacing: -0.2, marginBottom: 4,
        }}>{item.name}</div>
        {item.desc && <div style={{
          fontFamily: FONTS.sans, fontSize: 11.5, color: TOKENS.muted,
          lineHeight: 1.4,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{item.desc}</div>}
        <div style={{
          fontFamily: FONTS.serif, fontSize: 17, color: TOKENS.ink,
          marginTop: 8, fontWeight: 500,
        }}>{formatARS(item.price)}</div>
      </div>

      <div style={{
        width: 70, height: 70, flexShrink: 0,
        background: TOKENS.bgDeep,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          fontFamily: FONTS.serif, fontSize: 44, color: TOKENS.gold,
          opacity: 0.55, lineHeight: 1, fontWeight: 500,
        }}>{cat.glyph}</div>
        <button onClick={(e) => { e.stopPropagation(); onAdd(); }} style={{
          position: 'absolute', bottom: 4, right: 4,
          width: 24, height: 24, borderRadius: 24,
          background: TOKENS.ink, color: '#fff',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        }}><IconPlus size={11} color="#fff"/></button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// SCREEN: Product Detail (modal-ish full screen)
// ──────────────────────────────────────────────────────────────────
function ItemDetailScreen({ item, cat, onClose, onAdd, cart }) {
  const [qty, setQty] = useS(1);
  const [note, setNote] = useS('');
  if (!item) return null;

  return (
    <div style={{ background: TOKENS.bg, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <ScreenChrome title={cat?.label || 'Plato'} cart={cart} onOpenCart={onClose} onBack={onClose}/>

      {/* Hero glyph area */}
      <div style={{
        background: TOKENS.bgDeep,
        height: 260, position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          fontFamily: FONTS.serif, fontSize: 240, color: TOKENS.gold,
          opacity: 0.5, lineHeight: 0.9, fontWeight: 500, letterSpacing: -10,
        }}>{cat?.glyph}</div>
        <div style={{
          position: 'absolute', bottom: 12, right: 16,
          fontFamily: FONTS.sans, fontSize: 9.5, color: TOKENS.muted,
          letterSpacing: 1.8, textTransform: 'uppercase',
        }}>foto próximamente</div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '24px 22px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {item.tag && <Tag label={item.tag} color={item.tag === 'Nuevo' ? 'new' : item.tag === 'Picante' ? 'red' : 'gold'}/>}
          {item.veg && <Tag label="Vegetariano" color="gold"/>}
        </div>
        <div style={{
          fontFamily: FONTS.serif, fontStyle: 'italic', fontSize: 30,
          color: TOKENS.ink, lineHeight: 1.05, letterSpacing: -0.3, marginBottom: 10,
        }}>{item.name}</div>
        <div style={{
          fontFamily: FONTS.serif, fontSize: 24, color: TOKENS.red, marginBottom: 18,
        }}>{formatARS(item.price)}</div>
        {item.desc && <div style={{
          fontFamily: FONTS.sans, fontSize: 13.5, color: TOKENS.ink,
          lineHeight: 1.55, marginBottom: 22, opacity: 0.78,
        }}>{item.desc}</div>}

        <Divider/>

        {/* Notes */}
        <div style={{ padding: '20px 0 4px' }}>
          <div style={{
            fontFamily: FONTS.sans, fontSize: 10, color: TOKENS.muted,
            letterSpacing: 1.8, textTransform: 'uppercase', marginBottom: 10,
          }}>Notas para la cocina</div>
          <textarea
            value={note} onChange={e => setNote(e.target.value)}
            placeholder="Sin cebolla, picante extra…"
            style={{
              width: '100%', minHeight: 60, border: `0.5px solid ${TOKENS.border}`,
              background: 'transparent', padding: '12px 14px', resize: 'none',
              fontFamily: FONTS.sans, fontSize: 13, color: TOKENS.ink,
              outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* Bottom add bar */}
      <div style={{
        position: 'sticky', bottom: 0,
        background: TOKENS.bg, borderTop: `0.5px solid ${TOKENS.border}`,
        padding: '14px 18px 18px',
        display: 'flex', gap: 12, alignItems: 'center',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          border: `0.5px solid ${TOKENS.ink}`,
        }}>
          <button onClick={() => setQty(Math.max(1, qty - 1))} style={{
            width: 42, height: 46, background: 'transparent', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><IconMinus/></button>
          <div style={{
            width: 30, textAlign: 'center',
            fontFamily: FONTS.serif, fontSize: 18, color: TOKENS.ink,
          }}>{qty}</div>
          <button onClick={() => setQty(qty + 1)} style={{
            width: 42, height: 46, background: 'transparent', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><IconPlus/></button>
        </div>
        <button onClick={() => { onAdd(item, qty, note); onClose(); }} style={{
          flex: 1, height: 46, background: TOKENS.ink, color: '#fff',
          border: 'none', cursor: 'pointer',
          fontFamily: FONTS.sans, fontWeight: 600, fontSize: 12,
          letterSpacing: 1.5, textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 18px',
        }}>
          <span>Agregar</span>
          <span style={{ fontFamily: FONTS.serif, fontSize: 17, textTransform: 'none', letterSpacing: 0 }}>
            {formatARS(item.price * qty)}
          </span>
        </button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// SCREEN: Cart
// ──────────────────────────────────────────────────────────────────
function CartScreen({ go, cart, updateQty, removeItem }) {
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);

  if (cart.length === 0) {
    return (
      <div style={{ background: TOKENS.bg, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        <ScreenChrome title="Tu pedido" cart={cart} onOpenCart={() => {}} onBack={() => go('menu')}/>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
          <div style={{ fontFamily: FONTS.serif, fontSize: 100, color: TOKENS.gold, opacity: 0.3, lineHeight: 1 }}>空</div>
          <div style={{ fontFamily: FONTS.serif, fontStyle: 'italic', fontSize: 24, color: TOKENS.ink, marginTop: 12 }}>Carrito vacío</div>
          <div style={{ fontFamily: FONTS.sans, fontSize: 13, color: TOKENS.muted, marginTop: 8, lineHeight: 1.5 }}>
            Elegí algo de la carta para empezar tu pedido.
          </div>
          <div style={{ marginTop: 24, width: '100%', maxWidth: 220 }}>
            <PrimaryButton onClick={() => go('menu')}>Ir al menú</PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: TOKENS.bg, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <ScreenChrome title="Tu pedido" subtitle={`${cart.reduce((s,i)=>s+i.qty,0)} ítems`} cart={cart} onOpenCart={() => {}} onBack={() => go('menu')}/>

      <div style={{ flex: 1 }}>
        {cart.map((it, i) => (
          <div key={it.lineId} style={{
            padding: '18px 22px',
            borderTop: i === 0 ? 'none' : `0.5px solid ${TOKENS.borderSoft}`,
            display: 'flex', gap: 14,
          }}>
            <div style={{
              width: 56, height: 56, flexShrink: 0, background: TOKENS.bgDeep,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: FONTS.serif, fontSize: 32, color: TOKENS.gold, opacity: 0.6 }}>{it.glyph}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: FONTS.serif, fontSize: 15, color: TOKENS.ink, lineHeight: 1.15,
              }}>{it.name}</div>
              {it.note && <div style={{
                fontFamily: FONTS.sans, fontStyle: 'italic', fontSize: 11, color: TOKENS.muted,
                marginTop: 4,
              }}>"{it.note}"</div>}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: `0.5px solid ${TOKENS.border}` }}>
                  <button onClick={() => updateQty(it.lineId, it.qty - 1)} style={{
                    width: 28, height: 28, background: 'transparent', border: 'none', cursor: 'pointer',
                  }}><IconMinus size={12}/></button>
                  <div style={{ width: 24, textAlign: 'center', fontFamily: FONTS.sans, fontSize: 13, fontWeight: 500 }}>{it.qty}</div>
                  <button onClick={() => updateQty(it.lineId, it.qty + 1)} style={{
                    width: 28, height: 28, background: 'transparent', border: 'none', cursor: 'pointer',
                  }}><IconPlus size={12}/></button>
                </div>
                <div style={{ fontFamily: FONTS.serif, fontSize: 16, color: TOKENS.ink }}>
                  {formatARS(it.price * it.qty)}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div style={{ padding: '24px 22px 16px' }}>
          <button onClick={() => go('menu')} style={{
            background: 'transparent', border: `0.5px dashed ${TOKENS.mutedSoft}`,
            color: TOKENS.muted, padding: '12px 18px', width: '100%',
            fontFamily: FONTS.sans, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
            cursor: 'pointer',
          }}>+ agregar más</button>
        </div>

        {/* Totals */}
        <div style={{ padding: '8px 22px 22px' }}>
          <Divider/>
          <div style={{ padding: '18px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Row label="Subtotal" value={formatARS(subtotal)}/>
            <Row label="Envío" value="A coordinar" muted/>
            <div style={{ height: 8 }}/>
            <Row label="Total" value={formatARS(subtotal)} big/>
            <div style={{
              fontFamily: FONTS.sans, fontSize: 10.5, color: TOKENS.muted,
              fontStyle: 'italic', marginTop: 4, lineHeight: 1.4,
            }}>
              El envío se coordina por WhatsApp con PedidosYa o Uber Envíos.
            </div>
          </div>
        </div>
      </div>

      {/* Checkout CTA */}
      <div style={{ padding: '0 18px 18px', background: TOKENS.bg }}>
        <PrimaryButton onClick={() => go('checkout')}>Continuar</PrimaryButton>
      </div>
    </div>
  );
}

function Row({ label, value, muted, big }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <div style={{
        fontFamily: big ? FONTS.serif : FONTS.sans,
        fontSize: big ? 16 : 12,
        color: muted ? TOKENS.muted : TOKENS.ink,
        letterSpacing: big ? 0 : 1.4,
        textTransform: big ? 'none' : 'uppercase',
        fontStyle: big ? 'italic' : 'normal',
      }}>{label}</div>
      <div style={{
        fontFamily: FONTS.serif, fontSize: big ? 24 : 15,
        color: muted ? TOKENS.muted : TOKENS.ink,
        fontWeight: big ? 500 : 400,
      }}>{value}</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// SCREEN: Checkout
// ──────────────────────────────────────────────────────────────────
function CheckoutScreen({ go, cart, checkout, setCheckout, onSubmit }) {
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const gatedOk = !checkout.isGated || (checkout.gatedName && checkout.gatedFamily && checkout.gatedBlock);
  const ready = checkout.name && (checkout.mode === 'pickup' || checkout.address) && checkout.payment && gatedOk;

  return (
    <div style={{ background: TOKENS.bg, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <ScreenChrome title="Datos del pedido" cart={cart} onOpenCart={() => go('cart')} onBack={() => go('cart')}/>

      <div style={{ flex: 1, padding: '4px 0 16px' }}>
        {/* Mode */}
        <Section label="Modalidad">
          <SegControl
            value={checkout.mode}
            onChange={v => setCheckout({ ...checkout, mode: v })}
            options={[
              { v: 'delivery', label: 'Delivery', sub: 'a coordinar' },
              { v: 'pickup',   label: 'Retiro',   sub: 'en local' },
            ]}/>
        </Section>

        {/* Customer */}
        <Section label="Tus datos">
          <Field label="Nombre" value={checkout.name} onChange={v => setCheckout({...checkout, name: v})} placeholder="Pepe"/>
          <Field label="Teléfono" value={checkout.phone} onChange={v => setCheckout({...checkout, phone: v})} placeholder="261 ..." type="tel"/>
          {checkout.mode === 'delivery' && (
            <>
              <Field label="Dirección" value={checkout.address} onChange={v => setCheckout({...checkout, address: v})} placeholder="Calle 123, piso 2 — referencia"/>

              {/* Barrio privado toggle */}
              <div
                onClick={() => setCheckout({ ...checkout, isGated: !checkout.isGated, gatedName: '', gatedFamily: '', gatedBlock: '' })}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  margin: '4px 22px 6px', cursor: 'pointer', userSelect: 'none',
                }}
              >
                <div style={{
                  width: 18, height: 18, border: `1.5px solid ${checkout.isGated ? TOKENS.red : TOKENS.muted}`,
                  borderRadius: 4, background: checkout.isGated ? TOKENS.red : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  transition: 'all .15s',
                }}>
                  {checkout.isGated && <span style={{ color: '#fff', fontSize: 11, lineHeight: 1, fontWeight: 700 }}>✓</span>}
                </div>
                <div style={{ fontFamily: FONTS.sans, fontSize: 12.5, color: TOKENS.ink }}>
                  Es barrio privado / country
                </div>
              </div>

              {/* Sub-formulario barrio privado */}
              {checkout.isGated && (
                <div style={{
                  margin: '4px 22px 10px',
                  padding: '16px',
                  background: '#fbf2dc',
                  border: `0.5px solid ${TOKENS.goldSoft}`,
                  borderRadius: 4,
                }}>
                  <div style={{
                    fontFamily: FONTS.sans, fontSize: 9.5, color: '#8a6517',
                    letterSpacing: 1.8, textTransform: 'uppercase', marginBottom: 14,
                  }}>Datos del barrio</div>

                  {/* Nombre del barrio */}
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontFamily: FONTS.sans, fontSize: 9.5, color: '#8a6517', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 5 }}>Nombre del barrio</div>
                    <input
                      value={checkout.gatedName || ''}
                      onChange={e => setCheckout({ ...checkout, gatedName: e.target.value })}
                      placeholder="Ej: Los Alamos"
                      style={{
                        width: '100%', border: `0.5px solid #d4b56a`, borderRadius: 4,
                        padding: '10px 12px', fontFamily: FONTS.sans, fontSize: 13,
                        background: '#fff', color: TOKENS.ink, outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {/* Nombre de la familia */}
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontFamily: FONTS.sans, fontSize: 9.5, color: '#8a6517', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 5 }}>Nombre de la familia</div>
                    <input
                      value={checkout.gatedFamily || ''}
                      onChange={e => setCheckout({ ...checkout, gatedFamily: e.target.value })}
                      placeholder="Ej: García"
                      style={{
                        width: '100%', border: `0.5px solid #d4b56a`, borderRadius: 4,
                        padding: '10px 12px', fontFamily: FONTS.sans, fontSize: 13,
                        background: '#fff', color: TOKENS.ink, outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {/* Manzana */}
                  <div>
                    <div style={{ fontFamily: FONTS.sans, fontSize: 9.5, color: '#8a6517', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 5 }}>Manzana</div>
                    <input
                      value={checkout.gatedBlock || ''}
                      onChange={e => setCheckout({ ...checkout, gatedBlock: e.target.value })}
                      placeholder="Ej: B — Lote 14"
                      style={{
                        width: '100%', border: `0.5px solid #d4b56a`, borderRadius: 4,
                        padding: '10px 12px', fontFamily: FONTS.sans, fontSize: 13,
                        background: '#fff', color: TOKENS.ink, outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
              )}
            </>
          )}
          {checkout.mode === 'pickup' && (
            <Field label="Día/Hora de retiro" value={checkout.pickupTime} onChange={v => setCheckout({...checkout, pickupTime: v})} placeholder="Hoy 21:00 — A coordinar"/>
          )}
        </Section>

        {/* Payment */}
        <Section label="Método de pago">
          <PaymentList
            value={checkout.payment}
            onChange={v => setCheckout({...checkout, payment: v})}/>
          {checkout.payment === 'Transferencia' && (
            <div style={{
              margin: '12px 22px 0', padding: '14px 16px',
              background: '#fbf2dc', border: `0.5px solid ${TOKENS.goldSoft}`,
            }}>
              <div style={{ fontFamily: FONTS.sans, fontSize: 10, color: '#8a6517', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Datos Mercado Pago</div>
              <div style={{ fontFamily: FONTS.sans, fontSize: 13, color: TOKENS.ink, lineHeight: 1.5 }}>
                Alias: <b>fusionchinaperuana</b><br/>
                Titular: <b>Alicia Ríos Seminario</b>
              </div>
              <div style={{ fontFamily: FONTS.sans, fontStyle: 'italic', fontSize: 11, color: '#8a6517', marginTop: 8, lineHeight: 1.4 }}>
                Coordiná el horario por WhatsApp antes de transferir.
              </div>
            </div>
          )}
        </Section>

        {/* Notes */}
        <Section label="Observaciones">
          <textarea
            value={checkout.notes}
            onChange={e => setCheckout({...checkout, notes: e.target.value})}
            placeholder="Algo extra que tengamos que saber…"
            style={{
              width: 'calc(100% - 44px)', margin: '0 22px', minHeight: 60,
              border: `0.5px solid ${TOKENS.border}`, background: 'transparent',
              padding: '12px 14px', resize: 'none',
              fontFamily: FONTS.sans, fontSize: 13, color: TOKENS.ink, outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </Section>

        {/* Mini-resumen */}
        <Section label="Resumen">
          <div style={{ padding: '0 22px' }}>
            {cart.map(it => (
              <div key={it.lineId} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontFamily: FONTS.sans, fontSize: 13 }}>
                <div style={{ color: TOKENS.muted }}>{it.qty}× <span style={{ color: TOKENS.ink }}>{it.name}</span></div>
                <div style={{ fontFamily: FONTS.serif, color: TOKENS.ink }}>{formatARS(it.price * it.qty)}</div>
              </div>
            ))}
            <div style={{ marginTop: 10 }}><Divider/></div>
            <div style={{ padding: '14px 0' }}>
              <Row label="Total" value={formatARS(subtotal)} big/>
            </div>
          </div>
        </Section>
      </div>

      <div style={{ padding: '0 18px 18px', background: TOKENS.bg, borderTop: `0.5px solid ${TOKENS.border}` , paddingTop: 14}}>
        <PrimaryButton onClick={() => ready && onSubmit()} disabled={!ready}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconWhatsapp size={14}/> Enviar por WhatsApp
          </span>
        </PrimaryButton>
        <div style={{
          fontFamily: FONTS.sans, fontSize: 10, color: TOKENS.muted,
          textAlign: 'center', marginTop: 8, lineHeight: 1.5,
        }}>
          Al continuar se abrirá WhatsApp con el pedido pre-armado.
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div style={{ padding: '20px 0 4px' }}>
      <div style={{
        fontFamily: FONTS.sans, fontSize: 10, color: TOKENS.muted,
        letterSpacing: 1.8, textTransform: 'uppercase',
        padding: '0 22px 12px',
      }}>{label}</div>
      <div>{children}</div>
    </div>
  );
}

function SegControl({ value, onChange, options }) {
  return (
    <div style={{ display: 'flex', padding: '0 22px', gap: 0 }}>
      {options.map(o => {
        const active = value === o.v;
        return (
          <button key={o.v} onClick={() => onChange(o.v)} style={{
            flex: 1, padding: '14px 8px',
            background: active ? TOKENS.ink : 'transparent',
            color: active ? '#fff' : TOKENS.ink,
            border: `0.5px solid ${active ? TOKENS.ink : TOKENS.border}`,
            cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          }}>
            <span style={{
              fontFamily: FONTS.sans, fontWeight: 600, fontSize: 12,
              letterSpacing: 1.5, textTransform: 'uppercase',
            }}>{o.label}</span>
            <span style={{
              fontFamily: FONTS.serif, fontStyle: 'italic', fontSize: 11,
              opacity: active ? 0.7 : 0.55,
            }}>{o.sub}</span>
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label style={{ display: 'block', padding: '0 22px 14px' }}>
      <div style={{
        fontFamily: FONTS.sans, fontSize: 9.5, color: TOKENS.muted,
        letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6,
      }}>{label}</div>
      <input
        type={type} value={value || ''} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '10px 0 8px',
          border: 'none', borderBottom: `0.5px solid ${TOKENS.ink}`,
          background: 'transparent', outline: 'none',
          fontFamily: FONTS.serif, fontSize: 17, color: TOKENS.ink,
        }}
      />
    </label>
  );
}

function PaymentList({ value, onChange }) {
  const ops = [
    { v: 'Efectivo',      desc: 'Al recibir' },
    { v: 'Mercado Pago',  desc: 'Transferencia · alias fusionchinaperuana' },
    { v: 'Transferencia', desc: 'Bancaria' },
    { v: 'Débito',        desc: 'En local' },
    { v: 'Crédito',       desc: 'En local' },
  ];
  return (
    <div style={{ padding: '0 22px' }}>
      {ops.map((o, i) => (
        <button key={o.v} onClick={() => onChange(o.v)} style={{
          width: '100%', textAlign: 'left',
          background: 'transparent', border: 'none',
          borderTop: `0.5px solid ${TOKENS.borderSoft}`,
          borderBottom: i === ops.length - 1 ? `0.5px solid ${TOKENS.borderSoft}` : 'none',
          padding: '14px 0', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 18, height: 18, borderRadius: 18,
            border: `1px solid ${value === o.v ? TOKENS.red : TOKENS.mutedSoft}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {value === o.v && <div style={{ width: 9, height: 9, borderRadius: 9, background: TOKENS.red }}/>}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONTS.serif, fontSize: 16, color: TOKENS.ink }}>{o.v}</div>
            <div style={{ fontFamily: FONTS.sans, fontSize: 11, color: TOKENS.muted, marginTop: 2 }}>{o.desc}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
// SCREEN: Confirmation / WhatsApp preview
// ──────────────────────────────────────────────────────────────────
function buildWhatsappMessage(cart, checkout) {
  // Emojis via String.fromCodePoint — evita problemas de encoding con Babel standalone
  var E_NOODLE    = String.fromCodePoint(0x1F35C);
  var E_PERSON    = String.fromCodePoint(0x1F464);
  var E_PHONE     = String.fromCodePoint(0x1F4DE);
  var E_PIN       = String.fromCodePoint(0x1F4CD);
  var E_HOUSE     = String.fromCodePoint(0x1F3D8, 0xFE0F);
  var E_CLIPBOARD = String.fromCodePoint(0x1F4CB);
  var E_MEMO      = String.fromCodePoint(0x1F4DD);
  var E_CARD      = String.fromCodePoint(0x1F4B3);
  var E_MONEY     = String.fromCodePoint(0x1F4B0);
  var E_HOME      = String.fromCodePoint(0x1F3E0);
  var E_CLOCK     = String.fromCodePoint(0x1F552);
  var E_WARN      = String.fromCodePoint(0x26A0);
  var DASH        = '\u2014';
  var BULL        = '\u2022';

  var subtotal = cart.reduce(function(s, it) { return s + it.price * it.qty; }, 0);
  var lines = [];

  lines.push(E_NOODLE + ' *Nuevo pedido - Chifa Wok*');
  lines.push('');
  lines.push(E_PERSON + ' *Cliente:* ' + (checkout.name || DASH));
  lines.push(E_PHONE  + ' *Telefono:* ' + (checkout.phone || DASH));

  if (checkout.mode === 'delivery') {
    lines.push(E_PIN + ' *Direccion:* ' + (checkout.address || DASH));
    if (checkout.isGated) {
      lines.push(E_HOUSE + ' *Barrio privado:*');
      lines.push(BULL + ' Barrio: '  + (checkout.gatedName   || DASH));
      lines.push(BULL + ' Familia: ' + (checkout.gatedFamily || DASH));
      lines.push(BULL + ' Manzana: ' + (checkout.gatedBlock  || DASH));
    }
  } else {
    lines.push(E_HOME + ' *Modalidad:* Retiro en local');
    if (checkout.pickupTime) lines.push(E_CLOCK + ' *Horario:* ' + checkout.pickupTime);
  }

  lines.push('');
  lines.push(E_CLIPBOARD + ' *Pedido:*');
  cart.forEach(function(it) {
    lines.push(BULL + ' ' + it.qty + 'x ' + it.name + ' - ' + formatARS(it.price * it.qty));
    if (it.note) lines.push('   ' + it.note);
  });
  lines.push('');

  if (checkout.notes) {
    lines.push(E_MEMO + ' *Observaciones:*');
    lines.push(checkout.notes);
    lines.push('');
  }

  lines.push(E_CARD + ' *Forma de pago:* ' + (checkout.payment || DASH));
  if (checkout.payment === 'Transferencia') {
    lines.push('   Alias: fusionchinaperuana (Mercado Pago)');
    lines.push('   Titular: Alicia Rios Seminario');
  }
  lines.push('');
  lines.push(E_MONEY + ' *TOTAL: ' + formatARS(subtotal) + '*');
  lines.push('');
  lines.push(E_WARN + ' Por favor confirma el pedido y coordina el horario de entrega por este chat.');
  return lines.join('\n');
}

function ConfirmScreen({ go, cart, checkout, resetOrder }) {
  const msg = buildWhatsappMessage(cart, checkout);
  const number = '5492613431904';
  const url = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;

  return (
    <div style={{ background: TOKENS.bg, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <ScreenChrome title="Listo para enviar" cart={cart} onOpenCart={() => {}} onBack={() => go('checkout')}/>

      <div style={{ flex: 1, padding: '24px 22px 16px' }}>
        <div style={{
          fontFamily: FONTS.serif, fontSize: 100, color: TOKENS.gold,
          opacity: 0.4, lineHeight: 0.9, textAlign: 'center', marginBottom: 8,
        }}>✓</div>
        <div style={{
          fontFamily: FONTS.serif, fontStyle: 'italic', fontSize: 26,
          color: TOKENS.ink, textAlign: 'center', lineHeight: 1.1, marginBottom: 8,
        }}>Tu pedido está armado</div>
        <div style={{
          fontFamily: FONTS.sans, fontSize: 12.5, color: TOKENS.muted,
          textAlign: 'center', lineHeight: 1.5, marginBottom: 24,
        }}>
          Vamos a abrir WhatsApp con este mensaje<br/>para que lo envíes a Chifa Wok.
        </div>

        {/* Message preview */}
        <div style={{
          background: '#ECE5DD', padding: '14px 16px', borderRadius: 2,
          border: `0.5px solid ${TOKENS.border}`,
          position: 'relative', marginBottom: 16,
        }}>
          <div style={{
            background: '#fff', padding: '10px 14px', borderRadius: 8,
            boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
            fontFamily: FONTS.mono, fontSize: 11, color: '#3a3a3a',
            whiteSpace: 'pre-wrap', lineHeight: 1.55,
            maxHeight: 260, overflowY: 'auto',
          }}>{msg.replace(/\*(.+?)\*/g, '$1').replace(/_(.+?)_/g, '$1')}</div>
        </div>

        <div style={{
          fontFamily: FONTS.sans, fontStyle: 'italic', fontSize: 11, color: TOKENS.muted,
          textAlign: 'center', lineHeight: 1.5, padding: '0 8px',
        }}>
          Enviando a +54 9 261 343 1904
        </div>
      </div>

      <div style={{ padding: '0 18px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          onClick={() => window.open(url, '_blank')}
          style={{
            width: '100%', background: '#25D366', color: '#fff',
            border: 'none', padding: '15px 22px', cursor: 'pointer',
            fontFamily: FONTS.sans, fontWeight: 600, fontSize: 14,
            letterSpacing: 1.5, textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
          <IconWhatsapp size={16}/> Abrir WhatsApp
        </button>
        <button onClick={() => { resetOrder(); go('home'); }} style={{
          width: '100%', background: 'transparent', border: 'none',
          color: TOKENS.muted, padding: '8px',
          fontFamily: FONTS.sans, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
          cursor: 'pointer',
        }}>Empezar nuevo pedido</button>
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenChrome, CartPill,
  HomeScreen, MenuScreen, ItemDetailScreen, CartScreen, CheckoutScreen, ConfirmScreen,
  buildWhatsappMessage,
});
