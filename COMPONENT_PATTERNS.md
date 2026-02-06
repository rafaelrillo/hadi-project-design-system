# SENTINEL Design System - Component Patterns

> Patrones de implementacion extraidos de FingHome y DashboardPage.
> Usar como referencia para construir nuevas pantallas.

---

## Regla Fundamental: Stone Marble Hierarchy

```
FONDO (marble-base) → RAISED → INSET → GLASS
```

**Reglas de anidamiento:**

| Contenedor | Puede contener | NO puede contener |
|------------|----------------|-------------------|
| FONDO | RAISED | INSET, GLASS |
| RAISED | INSET | RAISED, GLASS directamente |
| INSET | GLASS, RAISED | INSET |
| GLASS | Contenido final | Nada mas |

**Ejemplo correcto:**
```
Page (FONDO)
└── Card (RAISED-3)
    └── Section (INSET-2)
        └── Item (GLASS)
```

**Ejemplo INCORRECTO:**
```
Page (FONDO)
└── Card (RAISED-3)
    └── Another Card (RAISED-2)  ← ERROR: RAISED dentro de RAISED
```

---

## Regla de Tipografia Neumorfica

| Contenedor | Tipografia | Efecto | Variable |
|------------|------------|--------|----------|
| RAISED | INSET | Debossed/Engraved | `--lp-*` |
| INSET | RAISED | Embossed | `--lp-embossed-*` |
| GLASS | Hereda del padre | Sutil | Reducir intensidad |

**Ejemplo en codigo:**

```css
/* Texto en contenedor RAISED - usar INSET/debossed */
.titleInRaisedCard {
  color: var(--fing-accent);
  text-shadow: var(--lp-petrol);  /* o --lp-primary, --lp-positive, etc */
}

/* Texto en contenedor INSET - usar RAISED/embossed */
.titleInInsetSection {
  color: var(--fing-accent);
  text-shadow: var(--lp-embossed-petrol);
}
```

---

## Letterpress Variables

### Para contenedores RAISED (texto debossed/inset)

| Variable | Color | Uso |
|----------|-------|-----|
| `--lp-primary` | Charcoal | Texto principal oscuro |
| `--lp-petrol` | Petrol | Titulos brand, CTAs |
| `--lp-petrol-whisper` | Petrol sutil | Hero text, grandes titulos |
| `--lp-positive` | Jade | Valores positivos (+%) |
| `--lp-warning` | Gold | Alertas, warnings |
| `--lp-negative` | Rust | Valores negativos (-%) |
| `--lp-steel` | Steel | Labels, metadata |
| `--lp-muted` | Muted | Texto secundario, hints |

### Para contenedores INSET (texto embossed/raised)

| Variable | Color | Uso |
|----------|-------|-----|
| `--lp-embossed` | Neutral | Texto general en inset |
| `--lp-embossed-subtle` | Neutral sutil | Texto secundario |
| `--lp-embossed-petrol` | Petrol | Titulos brand en inset |
| `--lp-embossed-petrol-sm` | Petrol pequeno | Labels en inset |
| `--lp-embossed-sm` | Neutral pequeno | Metadata en inset |

---

## Patron: Card (RAISED)

Card elevada con borde luminoso superior.

```css
.card {
  background: var(--marble-base);
  border-radius: var(--fing-radius-lg);  /* 20px */
  padding: 16px;
  box-shadow: var(--raised-2);  /* o raised-3 para mas prominencia */
  position: relative;
  overflow: hidden;
}

/* Borde luminoso superior */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.65),
    rgba(255, 255, 255, 0.5),
    transparent
  );
  pointer-events: none;
}

/* Titulo - INSET typography (en RAISED container) */
.cardTitle {
  font-family: var(--fing-font-primary);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--fing-accent);
  text-shadow: var(--lp-petrol);
}
```

**Niveles de elevacion:**
- `--raised-2`: Cards secundarias, items
- `--raised-3`: Cards principales, panels
- `--raised-4`: Cards destacadas, mobile hero

---

## Patron: Section Inset (dentro de Card)

Area hundida dentro de una card para contenido.

```css
.section {
  background: var(--marble-dark);  /* Variante oscura para profundidad */
  border-radius: var(--fing-radius-md);  /* 15px */
  padding: 16px;
  box-shadow: var(--inset-1);  /* o inset-2 para mas profundidad */
}

/* Titulo - RAISED typography (en INSET container) */
.sectionTitle {
  color: var(--fing-accent);
  text-shadow: var(--lp-embossed-petrol);
}
```

**Niveles de profundidad:**
- `--inset-1`: Secciones sutiles, contenido
- `--inset-2`: Secciones marcadas, formularios
- `--inset-3`: Secciones profundas, KPI meters
- `--inset-5`: Muy profundo, decorativo

---

## Patron: KPI Meter (RAISED + INSET concentricos)

Indicador circular con numero central.

```css
/* Outer circle - RAISED */
.kpiMeter {
  width: 100px;
  height: 100px;
  background: var(--marble-base);
  border-radius: 50%;
  box-shadow: var(--raised-3);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Inner circle - INSET */
.kpiMeterInner {
  width: 75px;
  height: 75px;
  background: var(--marble-base);
  border-radius: 50%;
  box-shadow: var(--inset-3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Value - INSET typography colored */
.kpiValue {
  font-family: var(--fing-font-mono);
  font-size: 22px;
  font-weight: 700;
  color: var(--fing-accent);
  text-shadow:
    1px 1px 0px rgba(255, 255, 255, 0.8),
    -1px -1px 0px rgba(58, 106, 114, 0.4);
}

/* Label - RAISED typography (en INSET) */
.kpiLabel {
  font-family: var(--fing-font-primary);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fing-accent);
  text-shadow:
    -0.5px -0.5px 0px rgba(255, 255, 255, 0.9),
    0.5px 0.5px 0px rgba(58, 106, 114, 0.4);
}
```

**Variantes de color:**
- Teal/Petrol: `rgba(58, 106, 114, 0.4)` - Score, default
- Jade/Positive: `rgba(74, 154, 124, 0.4)` - YTD, gains
- Gold/Warning: `rgba(196, 163, 90, 0.4)` - Risk, alerts

---

## Patron: Ridge Frame Row (INSET wrapper + RAISED content)

Fila de datos con doble borde interior.

```css
/* INSET wrapper */
.rowFrameInset {
  padding: 4px;
  border-radius: 16px;
  background: var(--marble-base);
  box-shadow: var(--inset-1);
}

/* RAISED row inside */
.dataRow {
  display: grid;
  grid-template-columns: 32px 1fr 70px 70px;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  background: var(--marble-base);
  border-radius: 12px;

  /* Ridge Frame - double inner border + raised */
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.8),
    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
    2px 2px 4px rgba(147, 157, 170, 0.5),
    -2px -2px 4px rgba(255, 255, 255, 0.9);

  transition: box-shadow 0.15s ease;
}

/* Hover - teal accent */
.dataRow:hover {
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.9),
    inset 0 0 0 2px rgba(58, 106, 114, 0.2),
    2px 2px 5px rgba(147, 157, 170, 0.5),
    -2px -2px 5px rgba(255, 255, 255, 0.85);
}
```

---

## Patron: Rank Badge (mini INSET circle)

Numero de ranking en circulo hundido.

```css
.rankBadge {
  font-family: var(--fing-font-mono);
  font-size: 12px;
  font-weight: 700;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--marble-base);
  border-radius: 50%;

  /* Mini INSET */
  box-shadow:
    inset 1.5px 1.5px 3px rgba(147, 157, 170, 0.5),
    inset -1.5px -1.5px 3px rgba(255, 255, 255, 0.9);

  /* RAISED typography - Teal */
  color: var(--fing-accent);
  text-shadow:
    -0.5px -0.5px 0px rgba(255, 255, 255, 0.9),
    0.5px 0.5px 0px rgba(58, 106, 114, 0.35);
}
```

---

## Patron: Button RAISED (standalone)

Boton que vive directamente sobre contenedor RAISED.

```css
.raisedButton {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--marble-base);
  border-radius: 24px;
  border: none;
  cursor: pointer;
  font-family: var(--fing-font-primary);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;

  /* RAISED with inner border */
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.8),
    inset 0 0 0 2px rgba(168, 172, 179, 0.3),
    4px 4px 8px rgba(147, 157, 170, 0.55),
    -4px -4px 8px rgba(255, 255, 255, 0.95);

  /* INSET typography */
  color: var(--fing-accent);
  text-shadow:
    1px 1px 0px rgba(255, 255, 255, 0.85),
    -1px -1px 0px rgba(58, 106, 114, 0.3);

  transition: all 150ms ease;
}

.raisedButton:hover {
  background: linear-gradient(135deg, rgba(58, 106, 114, 0.08) 0%, rgba(58, 106, 114, 0.04) 100%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.9),
    inset 0 0 0 2px rgba(58, 106, 114, 0.25),
    6px 6px 12px rgba(147, 157, 170, 0.6),
    -6px -6px 12px rgba(255, 255, 255, 0.95),
    0 0 16px rgba(58, 106, 114, 0.15);
}

.raisedButton:active {
  box-shadow:
    inset 2px 2px 4px rgba(147, 157, 170, 0.5),
    inset -2px -2px 4px rgba(255, 255, 255, 0.9);
}
```

---

## Patron: Button Pill Frame (INSET wrapper + RAISED button)

Boton dentro de contenedor inset para cards y formularios.

```css
/* INSET wrapper */
.pillFrameWrapper {
  padding: 4px;
  border-radius: 28px;
  background: var(--marble-base);
  box-shadow: var(--inset-1);
}

/* RAISED button inside */
.pillFrameButton {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 24px;
  background: var(--marble-base);
  border-radius: 24px;
  border: none;
  cursor: pointer;

  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.8),
    inset 0 0 0 2px rgba(168, 172, 179, 0.25),
    2px 2px 4px rgba(147, 157, 170, 0.55),
    -2px -2px 4px rgba(255, 255, 255, 0.95);

  color: var(--fing-accent);
  text-shadow:
    1px 1px 0px rgba(255, 255, 255, 0.85),
    -1px -1px 0px rgba(58, 106, 114, 0.3);

  transition: all 200ms ease;
}
```

**Tamanos:**
- Large: padding 12px 24px, font-size 13px
- Small: padding 8px 16px, font-size 12px

---

## Patron: Icon Circle (INSET container for icons)

Icono dentro de circulo hundido.

```css
.iconCircle {
  width: 28px;
  height: 28px;
  background: var(--marble-base);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow:
    inset 1.5px 1.5px 3px var(--shadow-dark),
    inset -1.5px -1.5px 3px var(--shadow-light);
}

.iconCircle svg {
  color: var(--fing-accent);
  filter:
    drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9))
    drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4));
}
```

---

## Patron: Glass Item (dentro de INSET)

Item semitransparente para listas.

```css
.glassItem {
  padding: 12px 14px;

  /* Teal brand glass */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(58, 106, 114, 0.12) 100%
  );
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border: 1px solid rgba(58, 106, 114, 0.25);
  border-radius: 12px;

  box-shadow:
    0 4px 16px rgba(58, 106, 114, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);

  transition: all 0.15s ease;
}

/* Subtle top edge glow */
.glassItem::after {
  content: '';
  position: absolute;
  top: 0;
  left: 20%;
  right: 20%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(58, 106, 114, 0.3),
    rgba(58, 106, 114, 0.4),
    rgba(58, 106, 114, 0.3),
    transparent
  );
  pointer-events: none;
}

.glassItem:active {
  transform: scale(0.98);
  box-shadow:
    0 2px 8px rgba(58, 106, 114, 0.08),
    inset 0 2px 4px rgba(0, 0, 0, 0.05);
}
```

---

## Patron: Pill Balance (RAISED horizontal)

Contenedor horizontal para balance/valor principal.

```css
.balancePill {
  background: var(--marble-base);
  border-radius: 40px;
  padding: 12px 24px 12px 12px;
  box-shadow: var(--raised-3);
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Icon container - INSET circle */
.balancePillIcon {
  width: 56px;
  height: 56px;
  background: var(--marble-base);
  border-radius: 50%;
  box-shadow: var(--inset-2);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Value - debossed dark */
.balancePillValue {
  font-family: var(--fing-font-mono);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  text-shadow:
    1px 1px 0px rgba(255, 255, 255, 0.8),
    -1px -1px 0px rgba(130, 140, 155, 0.4);
}

/* Label - letterpress petrol */
.balancePillLabel {
  font-family: var(--fing-font-primary);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--fing-accent);
  text-shadow: var(--lp-petrol);
}
```

---

## Patron: Etymology/Feature Card

Card informativa con titulo destacado.

```css
.featureCard {
  background: var(--marble-base);
  border-radius: 20px;
  padding: 24px;
  box-shadow: var(--raised-3);
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* Luminous top edge */
.featureCard::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.75),
    rgba(255, 255, 255, 0.6),
    transparent
  );
  pointer-events: none;
}

/* Root/Label - Steel letterpress */
.featureCardLabel {
  font-family: var(--fing-font-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--fing-text-accent);
  text-shadow: var(--lp-steel);
}

/* Title - Petrol whisper */
.featureCardTitle {
  font-family: var(--fing-font-display);
  font-size: 24px;
  font-style: italic;
  color: var(--fing-accent);
  text-shadow: var(--lp-petrol-whisper);
}

/* Description - Muted */
.featureCardDesc {
  font-size: 13px;
  line-height: 1.4;
  color: var(--fing-text-muted);
  text-shadow: var(--lp-muted);
}
```

---

## Patron: Synthesis Card (INSET informativo)

Card hundida para sintesis o formulas.

```css
.synthesisCard {
  background: var(--marble-base);
  border-radius: 20px;
  padding: 20px 32px;
  box-shadow: var(--inset-3);
  text-align: center;
}

/* Formula - RAISED/embossed */
.synthesisFormula {
  font-family: var(--fing-font-mono);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--marble-base);
  text-shadow: var(--lp-embossed-subtle);
}

/* Highlight - RAISED petrol */
.synthesisHighlight {
  color: var(--fing-accent);
  text-shadow: var(--lp-embossed-petrol);
}
```

---

## Patron: Vertical Groove (decorativo)

Linea vertical hundida como conector.

```css
.verticalGroove {
  width: 6px;
  height: 60px;
  margin: 24px 0;
  background: var(--marble-base);
  border-radius: 3px;
  box-shadow: var(--inset-2);
}
```

---

## Patron: Data Change Cell (colored letterpress)

Celda con cambio porcentual coloreado.

```css
.changeCell {
  font-family: var(--fing-font-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
}

/* Positive - Jade */
.changeCell[data-positive="true"] {
  color: var(--fing-status-positive);
  text-shadow:
    0.75px 0.75px 0px rgba(255, 255, 255, 0.8),
    -0.75px -0.75px 0px rgba(74, 154, 124, 0.35);
}

/* Negative - Rust */
.changeCell[data-positive="false"] {
  color: var(--fing-status-negative);
  text-shadow:
    0.75px 0.75px 0px rgba(255, 255, 255, 0.8),
    -0.75px -0.75px 0px rgba(184, 92, 92, 0.35);
}
```

---

## LO QUE NO HACER

### 1. RAISED dentro de RAISED

```css
/* INCORRECTO */
.outerCard {
  box-shadow: var(--raised-3);
}
.innerCard {
  box-shadow: var(--raised-2);  /* ERROR */
}

/* CORRECTO */
.outerCard {
  box-shadow: var(--raised-3);
}
.innerSection {
  box-shadow: var(--inset-2);  /* Alternar a INSET */
}
```

### 2. Saltar niveles (FONDO directo a GLASS)

```css
/* INCORRECTO */
.page {
  background: var(--marble-base);  /* FONDO */
}
.directGlass {
  background: var(--glass-bg);  /* ERROR: salto de FONDO a GLASS */
}

/* CORRECTO */
.page {
  background: var(--marble-base);  /* FONDO */
}
.card {
  box-shadow: var(--raised-3);  /* RAISED primero */
}
.cardSection {
  box-shadow: var(--inset-2);  /* INSET segundo */
}
.glassItem {
  background: var(--glass-bg);  /* GLASS tercero */
}
```

### 3. Tipografia sin letterpress

```css
/* INCORRECTO */
.title {
  color: var(--fing-accent);
  /* Sin text-shadow - se ve plano */
}

/* CORRECTO */
.title {
  color: var(--fing-accent);
  text-shadow: var(--lp-petrol);  /* Letterpress siempre */
}
```

### 4. Usar rgba hardcodeado para letterpress

```css
/* INCORRECTO */
.text {
  text-shadow:
    0.5px 0.5px 0px rgba(255, 255, 255, 0.9),
    -0.5px -0.5px 0px rgba(58, 106, 114, 0.25);
}

/* CORRECTO */
.text {
  text-shadow: var(--lp-petrol);  /* Usar variable */
}
```

### 5. Olvidar backdrop-filter en GLASS

```css
/* INCORRECTO */
.glassItem {
  background: rgba(255, 255, 255, 0.25);
  /* Sin backdrop-filter - no es glass real */
}

/* CORRECTO */
.glassItem {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);  /* Safari */
}
```

### 6. Tipografia RAISED en contenedor RAISED

```css
/* INCORRECTO - Contenedor RAISED con texto embossed */
.raisedCard {
  box-shadow: var(--raised-3);
}
.raisedCardTitle {
  text-shadow: var(--lp-embossed);  /* ERROR: embossed en RAISED */
}

/* CORRECTO - Contenedor RAISED con texto INSET/debossed */
.raisedCard {
  box-shadow: var(--raised-3);
}
.raisedCardTitle {
  text-shadow: var(--lp-petrol);  /* INSET/debossed en RAISED */
}
```

---

## Matriz de Decision: Shadows

| Contexto | Nivel | Variable |
|----------|-------|----------|
| Card principal | RAISED-3 | `var(--raised-3)` |
| Card secundaria | RAISED-2 | `var(--raised-2)` |
| Card hero/destacada | RAISED-4 | `var(--raised-4)` |
| Seccion interna sutil | INSET-1 | `var(--inset-1)` |
| Seccion interna marcada | INSET-2 | `var(--inset-2)` |
| KPI meter inner | INSET-3 | `var(--inset-3)` |
| Decorativo profundo | INSET-5 | `var(--inset-5)` |

---

## Matriz de Decision: Letterpress Colors

| Contenido | En RAISED usar | En INSET usar |
|-----------|----------------|---------------|
| Titulo brand | `--lp-petrol` | `--lp-embossed-petrol` |
| Titulo grande | `--lp-petrol-whisper` | `--lp-embossed-petrol` |
| Label/metadata | `--lp-steel` | `--lp-embossed-sm` |
| Texto secundario | `--lp-muted` | `--lp-embossed-subtle` |
| Valor positivo | `--lp-positive` | (usar rgba manual) |
| Valor negativo | `--lp-negative` | (usar rgba manual) |
| Valor warning | `--lp-warning` | (usar rgba manual) |

---

## Matriz de Decision: Border Radius

| Elemento | Radius | Variable |
|----------|--------|----------|
| Cards, panels | 20px | `var(--fing-radius-lg)` |
| Sections, forms | 15px | `var(--fing-radius-md)` |
| Items, inputs | 12px | `var(--fing-radius-sm)` |
| Pills, buttons | 24px+ | `border-radius: 50px` |
| Circles | 50% | `border-radius: 50%` |

---

## Matriz de Decision: Spacing

| Contexto | Variable | Valor |
|----------|----------|-------|
| Gap entre cards | `--fing-space-4` | 16px |
| Padding de card | `--fing-space-4` | 16px |
| Padding de section | `--fing-space-4` | 16px |
| Gap entre items | `--fing-space-2` | 8px |
| Gap interno pill | `--fing-space-4` | 16px |
| Margin section label | `--fing-space-6` | 24px |

---

## Fonts por Contexto

| Contexto | Font | Variable |
|----------|------|----------|
| UI general, titulos | DM Sans | `var(--fing-font-primary)` |
| Datos, tickers, valores | IBM Plex Mono | `var(--fing-font-mono)` |
| Display, headlines | Libre Baskerville | `var(--fing-font-display)` |
| Wordmark FING | Cormorant Garamond | `var(--fing-wordmark-font)` |

---

## Referencias

- **FingHome.module.css**: Landing page patterns
- **DashboardPage.module.css**: App dashboard patterns
- **src/styles/shadows.css**: Shadow tokens
- **src/styles/letterpress.css**: Letterpress tokens
- **src/styles/colors.css**: Color tokens

---

## Version

- **Created**: 2026-02-05
- **Based on**: FingHome, DashboardPage
- **Author**: Extracted by Claude from Rafa's implementations
