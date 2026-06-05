// ──────────────────────────────────────────────────────────────────
// Chifa Wok — App shell (state, routing, prototype container)
// ──────────────────────────────────────────────────────────────────

const { useState: useState_, useMemo: useMemo_ } = React;

function ChifaWokApp({ initialScreen = 'home', initialCat = 'chaufa', prefillCart = false, prefillCheckout = false, instanceId = 'main' }) {
  const [screen, setScreen] = useState_(initialScreen);
  const [catFocus, setCatFocus] = useState_(initialCat);
  const [openedItem, setOpenedItem] = useState_(null);

  // Seed cart for some demo states
  const seed = () => {
    if (!prefillCart) return [];
    const ids = ['chn-kum', 'chn-tkl', 'ent-gyo'];
    return ids.map((id, i) => {
      const it = MENU_ITEMS.find(x => x.id === id);
      const cat = MENU_CATEGORIES.find(c => c.id === it.cat);
      return {
        lineId: `${instanceId}-${i}-${id}`,
        id: it.id, name: it.name, price: it.price,
        glyph: cat.glyph, qty: i === 0 ? 2 : 1, note: i === 1 ? 'Sin cebolla' : '',
      };
    });
  };
  const [cart, setCart] = useState_(seed);
  const [checkout, setCheckout] = useState_(() => prefillCheckout ? {
    mode: 'delivery', name: 'Pepe', phone: '261 555 1234',
    address: 'Benito 123, Mendoza', pickupTime: '',
    payment: 'Mercado Pago', notes: 'Sin cebolla',
  } : { mode: 'delivery', name: '', phone: '', address: '', pickupTime: '', payment: '', notes: '', isGated: false, gatedName: '', gatedFamily: '', gatedBlock: '' });

  const addToCart = (item, qty = 1, note = '') => {
    const cat = MENU_CATEGORIES.find(c => c.id === item.cat);
    setCart(prev => {
      // Try to merge if no note and existing line with same item+no-note
      if (!note) {
        const idx = prev.findIndex(l => l.id === item.id && !l.note);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + qty };
          return next;
        }
      }
      return [...prev, {
        lineId: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,
        id: item.id, name: item.name, price: item.price,
        glyph: cat?.glyph || '料', qty, note,
      }];
    });
  };

  const updateQty = (lineId, qty) => {
    setCart(prev => qty <= 0
      ? prev.filter(l => l.lineId !== lineId)
      : prev.map(l => l.lineId === lineId ? { ...l, qty } : l)
    );
  };

  const go = (target, catId) => {
    if (catId) setCatFocus(catId);
    setScreen(target);
  };

  const openItem = (item) => setOpenedItem(item);
  const closeItem = () => setOpenedItem(null);

  const resetOrder = () => {
    setCart([]);
    setCheckout({ mode: 'delivery', name: '', phone: '', address: '', pickupTime: '', payment: '', notes: '', isGated: false, gatedName: '', gatedFamily: '', gatedBlock: '' });
  };

  let body;
  if (openedItem) {
    const cat = MENU_CATEGORIES.find(c => c.id === openedItem.cat);
    body = <ItemDetailScreen item={openedItem} cat={cat} cart={cart} onClose={closeItem} onAdd={addToCart}/>;
  } else if (screen === 'home') {
    body = <HomeScreen go={go} cart={cart} onOpenCart={() => go('cart')}/>;
  } else if (screen === 'menu') {
    body = <MenuScreen go={go} cart={cart} addToCart={addToCart} openItem={openItem} initialCat={catFocus}/>;
  } else if (screen === 'cart') {
    body = <CartScreen go={go} cart={cart} updateQty={updateQty}/>;
  } else if (screen === 'checkout') {
    body = <CheckoutScreen go={go} cart={cart} checkout={checkout} setCheckout={setCheckout} onSubmit={() => go('confirm')}/>;
  } else if (screen === 'confirm') {
    body = <ConfirmScreen go={go} cart={cart} checkout={checkout} resetOrder={resetOrder}/>;
  }

  return (
    <div style={{
      width: '100%', height: '100%', overflowY: 'auto',
      background: TOKENS.bg,
      fontFamily: FONTS.sans,
    }}>
      {body}
    </div>
  );
}

Object.assign(window, { ChifaWokApp });
