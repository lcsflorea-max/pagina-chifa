// ──────────────────────────────────────────────────────────────────
// Chifa Wok — Menú completo
// Extraído de "CARTA CHIFA 2025"
// ──────────────────────────────────────────────────────────────────

const MENU_CATEGORIES = [
  { id: 'chaufa',    label: 'Chaufa',         glyph: '飯', tagline: 'Arroz salteado al wok' },
  { id: 'tallarin',  label: 'Tallarín',       glyph: '麺', tagline: 'Fideos al wok' },
  { id: 'chinos',    label: 'Platos Chinos',  glyph: '中', tagline: 'Clásicos del chifa' },
  { id: 'entrantes', label: 'Dumplings',      glyph: '餃', tagline: 'Para empezar' },
  { id: 'peruanos',  label: 'Platos Peruanos',glyph: '秘', tagline: 'Tradición de Lima' },
  { id: 'nuevos',    label: 'Platos Nuevos',  glyph: '新', tagline: 'Recién llegados' },
  { id: 'postres',   label: 'Postres',        glyph: '甜', tagline: 'Para cerrar' },
  { id: 'tragos',    label: 'Tragos',         glyph: '酒', tagline: 'Cocteles y aperitivos' },
  { id: 'cervezas',  label: 'Cervezas',       glyph: '啤', tagline: '' },
  { id: 'vinos',     label: 'Vinos',          glyph: '葡', tagline: 'Selección mendocina' },
  { id: 'bebidas',   label: 'Sin alcohol',    glyph: '茶', tagline: 'Aguas y gaseosas' },
];

const MENU_ITEMS = [
  // Chaufa
  { id:'chf-pollo',    cat:'chaufa', name:'Arroz Chaufa de Pollo',         price:19500, desc:'Arroz, salsa de soja, aceite de sésamo, verdeo, huevo batido, pollo.' },
  { id:'chf-cerdo',    cat:'chaufa', name:'Arroz Chaufa de Cerdo Asado',   price:19500, desc:'Arroz, salsa de soja, aceite de sésamo, verdeo, huevo batido, cerdo asado.' },
  { id:'chf-lomo',     cat:'chaufa', name:'Arroz Chaufa de Lomo Veteado',  price:24500, desc:'Arroz, salsa de soja, aceite de sésamo, verdeo, huevo batido, dados de lomo veteado.' },
  { id:'chf-lang',     cat:'chaufa', name:'Arroz Chaufa de Langostinos',   price:28500, desc:'Arroz, salsa de soja, aceite de sésamo, verdeo, huevo, langostino, salsa de ostión.' },
  { id:'chf-mar',      cat:'chaufa', name:'Arroz Chaufa de Mariscos',      price:28500, desc:'Arroz, soja, sésamo, verdeo, huevo, mix de mariscos, salsa de ostión.' },
  { id:'chf-esp',      cat:'chaufa', name:'Arroz Chaufa Especial',         price:27000, desc:'Arroz, soja, sésamo, verdeo, huevo, pollo, langostino, cerdo, carne.', tag:'Más pedido' },
  { id:'chf-veg',      cat:'chaufa', name:'Arroz Chaufa Vegetariano',      price:17500, desc:'Arroz, soja, sésamo, verdeo, huevo batido, mix de verduras.', veg:true },

  // Tallarines
  { id:'tll-veg',      cat:'tallarin', name:'Tallarín Saltado de Vegetales',  price:19500, desc:'Fideos, soja, canela china, jengibre, mix de verduras.', veg:true },
  { id:'tll-pollo',    cat:'tallarin', name:'Tallarín Saltado de Pollo',      price:22000, desc:'Fideos, soja, canela china, jengibre, mix de verduras, pollo.' },
  { id:'tll-lomo',     cat:'tallarin', name:'Tallarín Saltado de Lomo Veteado',price:26000,desc:'Fideos, soja, canela china, jengibre, mix de verduras, carne.' },
  { id:'tll-cerdo',    cat:'tallarin', name:'Tallarín Saltado de Cerdo Asado',price:22000, desc:'Fideos, soja, canela china, jengibre, mix de verduras, cerdo.' },
  { id:'tll-mar',      cat:'tallarin', name:'Tallarín Saltado de Mariscos',   price:29500, desc:'Fideos, soja, canela china, jengibre, verduras, mix de mariscos, ostión.' },
  { id:'tll-esp',      cat:'tallarin', name:'Tallarín Saltado Especial',      price:28500, desc:'Fideos, soja, canela china, jengibre, verduras, pollo, cerdo, camarones.' },

  // Platos Chinos
  { id:'chn-tam',      cat:'chinos', name:'Cerdo con Tamarindo',     price:23000, desc:'Cerdo asado, salsa de tamarindo, mix de verduras, guarnición de arroz blanco.' },
  { id:'chn-gru',      cat:'chinos', name:'Cerdo Gruyoc',            price:27500, desc:'Dados de cerdo crocante, salsa agridulce, ananá, durazno, mix de verduras, arroz.' },
  { id:'chn-kum',      cat:'chinos', name:'Pollo Kum Pao',           price:23000, desc:'Pollo, maní, vinagre de arroz, salsa de soja, mix de verduras, guarnición arroz.', tag:'Picante' },
  { id:'chn-tk',       cat:'chinos', name:'Pollo Tipa Kay',          price:25000, desc:'Pollo semi crocante, mix de vegetales y salsa agridulce, guarnición de arroz.' },
  { id:'chn-tkl',      cat:'chinos', name:'Tipa Kay de Langostinos', price:29000, desc:'Langostinos semi crocantes, mix de vegetales y salsa agridulce, arroz.' },
  { id:'chn-mong',     cat:'chinos', name:'Carne Mongoliana',        price:27000, desc:'Carne, ají picante, mix de vegetales, soja, miel, vino blanco, sésamo, arroz.', tag:'Picante' },
  { id:'chn-alm',      cat:'chinos', name:'Pollo con Almendras',     price:24000, desc:'Pollo, almendras, vino blanco, miel, soja, mix de verduras, arroz.' },

  // Dumplings
  { id:'ent-rol',      cat:'entrantes', name:'Rollitos Primavera x4', price:9500, desc:'Masa rellena de mix de vegetales, jengibre y salsa de soja.', veg:true },
  { id:'ent-wan',      cat:'entrantes', name:'Wantanes de Pollo x4',  price:9500, desc:'Masa rellena de pollo, jengibre, verdeo y salsa de soja.' },
  { id:'ent-gyo',      cat:'entrantes', name:'Gyosas x4',             price:9500, desc:'Masa frita rellena de cerdo sazonado.' },
  { id:'nv-siu',       cat:'entrantes', name:'Siu Kao x4',         price:9500,  desc:'Pasta rellena y frita con langostinos, brotes de soja, mix de vegetales y salsa hoisin.' },

  // Platos Peruanos
  { id:'per-cev',      cat:'peruanos', name:'Ceviche de Pescado Blanco', price:21000, desc:'Pescado blanco, limón, cebolla morada, ajo, jengibre, camote, choclo, canchita, ají (opcional).' },
  { id:'per-cev-esp',  cat:'peruanos', name:'Ceviche Especial',          price:25000, desc:'Pescado blanco, salmón rosado, camarones, mango, limón, cebolla morada, ajo, jengibre, camote, choclo.' },
  { id:'per-cau',      cat:'peruanos', name:'Causa Limeña',              price:17000, desc:'Puré de papa con limón, ají amarillo, tomate, palta, huevo, pollo, mayonesa.' },
  { id:'per-caul',     cat:'peruanos', name:'Causa de Langostino',       price:19500, desc:'Puré de papa con limón, ají amarillo, tomate, palta, huevo, langostino, mayonesa.' },
  { id:'per-rab',      cat:'peruanos', name:'Chicharrón de Calamar (Rabas)', price:26500, desc:'Aros de calamar crocante.' },
  { id:'per-jal',      cat:'peruanos', name:'Jalea de Mariscos',         price:30000, desc:'Mix de mariscos crocantes, papas fritas y sarsa criolla.' },
  { id:'per-lom',      cat:'peruanos', name:'Lomo Saltado',              price:27000, desc:'Lomo vetado en cubos, cebolla morada, pimientos, tomate, papas fritas, soja, arroz blanco.', tag:'Clásico' },
  { id:'per-aji',      cat:'peruanos', name:'Aji de Gallina',            price:20500, desc:'Pollo deshilachado, crema de ají amarillo, leche, queso, maní, papa, huevo, arroz blanco.' },
  { id:'per-arv',      cat:'peruanos', name:'Arroz Verde con Mariscos',  price:27000, desc:'Arroz cocido con un fondo de cilantro y espinaca acompañado de mix de mariscos.' },
  { id:'per-tag',      cat:'peruanos', name:'Tagliatelis con Lomo',      price:27500, desc:'Tagliatelis en salsa huancaina con dados de lomo veteado, cebolla morada, tomate, cilantro, soja.' },

  // Platos Nuevos
  { id:'nv-chi',       cat:'nuevos', name:'Chijaukay',          price:26000, desc:'Pollo semi crocante con salsa de ostión, canela china, sésamo, soja y guarnición de arroz salteado con verduras y pachikay.', tag:'Nuevo' },
  { id:'nv-hoi',       cat:'nuevos', name:'Pollo en Salsa Hoisin', price:26000, desc:'Dados de pollo salteado con jengibre, ajo, acusay, pimientos, cebolla morada, champiñones, salsa hoisin y arroz blanco.', tag:'Nuevo' },
  { id:'nv-kal',       cat:'nuevos', name:'Kalu Wantan',        price:27000, desc:'Dados de pollo, cerdo y langostinos salteados con vegetales, ananá, huevos de codorniz, salsa agridulce y wantanes.', tag:'Nuevo' },

  // Postres
  { id:'pos-sus',      cat:'postres', name:'Suspiro Limeño', price:8000, desc:'Postre tradicional peruano: manjar blanco y merengue al oporto.' },
  { id:'pos-3l',       cat:'postres', name:'Postre 3 Leches', price:8000, desc:'Bizcocho empapado en tres leches con crema y canela.' },

  // Tragos
  { id:'trg-ps',       cat:'tragos', name:'Pisco Sour',       price:9000, desc:'Pisco, jugo de limón, jarabe de goma y clara.', tag:'Insignia' },
  { id:'trg-mp',       cat:'tragos', name:'Machu Pichu',      price:9000, desc:'Pisco, menta, granadina y jugo de naranja.' },
  { id:'trg-ap',       cat:'tragos', name:'Aperol Spritz',    price:7000, desc:'Aperol, champagne, rodaja de naranja y soda.' },
  { id:'trg-fc',       cat:'tragos', name:'Fernet con Coca',  price:7000, desc:'Clásico argentino.' },

  // Cervezas
  { id:'cer-hei',      cat:'cervezas', name:'Heineken 473cc',          price:4500, desc:'Lata.' },
  { id:'cer-sta',      cat:'cervezas', name:'Stella Artois 473ml',     price:4500, desc:'Lata.' },
  { id:'cer-cor',      cat:'cervezas', name:'Corona 330cc',            price:4000, desc:'Botellín.' },

  // Vinos
  { id:'vin-kre-rose', cat:'vinos', name:'Familia Kretschmar — Malbec Rosé', price:19000, desc:'Rosado, frutal y fresco.' },
  { id:'vin-flo-sb',   cat:'vinos', name:'Finca La Florencia — Sauvignon Blanc', price:17000, desc:'Familia Cassone.' },
  { id:'vin-flo-mal',  cat:'vinos', name:'Finca La Florencia — Malbec', price:17000, desc:'Familia Cassone.' },
  { id:'vin-flo-cha',  cat:'vinos', name:'Finca La Florencia — Chardonnay', price:17000, desc:'Familia Cassone.' },
  { id:'vin-op-rose',  cat:'vinos', name:'Obra Prima Rosé',           price:17000, desc:'Familia Cassone.' },
  { id:'vin-op-res',   cat:'vinos', name:'Obra Prima Reserva Malbec', price:19000, desc:'Familia Cassone.' },
  { id:'vin-ac-mal',   cat:'vinos', name:'Acordeón Malbec',           price:14000, desc:'Finca Ferrer.' },
  { id:'vin-ac-cab',   cat:'vinos', name:'Acordeón Cabernet Sauvignon', price:14000, desc:'Finca Ferrer.' },
  { id:'vin-ac-ros',   cat:'vinos', name:'Acordeón Rosado',           price:14000, desc:'Finca Ferrer.' },
  { id:'vin-ac-cha',   cat:'vinos', name:'Acordeón Chardonnay',       price:14000, desc:'Finca Ferrer.' },

  // Bebidas
  { id:'beb-aq15',     cat:'bebidas', name:'Agua sin gas / con gas 1500cc', price:6500 },
  { id:'beb-aq5',      cat:'bebidas', name:'Agua sin gas / con gas 500cc',  price:2500 },
  { id:'beb-co15',     cat:'bebidas', name:'Línea Coca-Cola 1500cc',        price:6500, desc:'Coca, Sprite, Fanta.' },
  { id:'beb-co5',      cat:'bebidas', name:'Línea Coca-Cola 500cc',         price:2500, desc:'Coca, Sprite, Fanta.' },
  { id:'beb-lim',      cat:'bebidas', name:'Limonada natural en jarra',     price:6500, desc:'Limón natural con menta.' },
];

// Promo / combos (no estaban en la carta original — placeholders editables)
const MENU_PROMOS = [
  { id:'pr-duo',  name:'Combo Dúo',     price:36000, was:42000, desc:'2 platos principales + 1 bebida 500cc. Elegí cualquier chaufa o tallarín.', glyph:'雙' },
  { id:'pr-fam',  name:'Combo Familiar',price:64000, was:78000, desc:'Chaufa Especial + Tallarín Saltado + Pollo Kum Pao + 1 bebida 1500cc.', glyph:'家' },
  { id:'pr-noche',name:'Noche Chifa',   price:48000, was:55000, desc:'Cualquier plato chino + entrada + postre + copa de Malbec.', glyph:'夜' },
];

Object.assign(window, { MENU_CATEGORIES, MENU_ITEMS, MENU_PROMOS });
