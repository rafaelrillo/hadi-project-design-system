# FING Design System Consolidation

**Fecha Inicio:** 2026-01-27
**Última Actualización:** 2026-02-05
**Branch:** `redesign/stock-market-ui`

---

## Resumen Ejecutivo

Se realizó una auditoría profunda del design system FING/SENTINEL y una consolidación completa de los tokens CSS. El objetivo fue establecer una **única fuente de verdad** para tipografía, colores, sombras, letterpress, animaciones, wordmark y botones.

### Estado Actual

| Métrica | Antes | Después |
|---------|-------|---------|
| `theme.css` | ~84KB (~1500 líneas) | ~780 líneas |
| Archivos CSS modulares | 1 | **8** |
| Valores hardcodeados | 23+ letterpress | 0 |
| Showcases | 10 | **13** |
| Archivos experimentales en prod | 2 | 0 |

---

## Arquitectura CSS Final

```
src/styles/
│
├── index.css              ← PUNTO DE ENTRADA (importar solo este)
│
├── [DESIGN SYSTEM OFICIAL - Orden de cascada]
│   ├── globals.css        ← Reset y base styles
│   ├── colors.css         ← Paleta Natural Mineral + RGB companions
│   ├── typography.css     ← Familias, tamaños, pesos, tracking
│   ├── shadows.css        ← Sistema RAISED/INSET/GLASS (5 niveles cada uno)
│   ├── letterpress.css    ← Text-shadows neumórficos + utility classes
│   ├── animations.css     ← Keyframes + scroll-triggered + stagger
│   ├── wordmark.css       ← 12 variantes inset para FING wordmark
│   ├── buttons.css        ← Glass colors + sizes + transitions
│   ├── theme.css          ← Legacy (consolidándose)
│   └── responsive.css     ← Breakpoints y helpers responsive
│
├── typography/
│   └── fing.css           ← Estilos tipográficos específicos FING
│
└── lab/                   ← [EXPERIMENTAL - NO importar en main.tsx]
    ├── README.md
    ├── light-engine.css   ← Sistema de iluminación dinámica
    ├── textures.css       ← Texturas para Material Theming
    └── legacy/            ← Variables deprecadas
```

---

## Archivos CSS Creados

### 1. `colors.css` - Paleta Natural Mineral (~200 líneas)

**Propósito:** Centralizar todos los colores del sistema.

**Contenido:**
- Colores base del mármol (`--marble-base: #d5d8dc`, `--marble-light`, `--marble-dark`, `--marble-deeper`)
- Negro primario Charcoal (`--fing-black: #252528`)
- Acento Petrol (`--fing-accent: #3a6a72`)
- Colores semánticos con RGB companions:
  - Jade (`--fing-positive: #4a7a6a`) - positivo/éxito
  - Gold (`--fing-warning: #a08a4a`) - advertencia
  - Rust (`--fing-negative: #8a5a4a`) - negativo/error
  - Steel (`--fing-info: #4a6a7a`) - información

---

### 2. `typography.css` - Sistema Tipográfico (~120 líneas)

**Propósito:** Definir fuentes, tamaños, pesos y espaciados.

**Contenido:**
- Font families: DM Sans (UI), IBM Plex Mono (datos), Libre Baskerville (display), Cormorant Garamond (wordmark)
- Escala rem (0.75rem - 3.75rem) para UI
- Escala px (10px - 48px) para datos financieros
- Pesos: 300, 400, 500, 600, 700
- Letter-spacing: -0.02em a 0.25em
- Line-heights: 1 a 2

---

### 3. `shadows.css` - Sistema Neumórfico (~100 líneas)

**Propósito:** Definir la jerarquía visual RAISED → INSET → GLASS.

**Contenido:**
```css
/* 5 niveles RAISED (elementos elevados) */
--raised-1 a --raised-5

/* 5 niveles INSET (elementos hundidos) */
--inset-1 a --inset-5

/* GLASS (transparencia para items en insets) */
--glass-bg, --glass-bg-hover, --glass-bg-active, --glass-border
```

**Regla Crítica:**
```
NUNCA anidar mismo nivel (RAISED dentro de RAISED)
NUNCA saltar niveles (FONDO directo a GLASS)
SIEMPRE alternar: RAISED → INSET → GLASS
```

---

### 4. `letterpress.css` - Efectos de Texto (~180 líneas)

**Propósito:** Text-shadows que crean efecto "tallado" o "elevado".

**Variables para contenedores RAISED (texto hundido):**
```css
--lp-primary        /* Charcoal */
--lp-positive       /* Jade */
--lp-warning        /* Gold */
--lp-negative       /* Rust */
--lp-info           /* Steel */
--lp-accent         /* Petrol */
--lp-primary-strong /* Charcoal fuerte (para títulos grandes) */
```

**Variables para contenedores INSET (texto elevado):**
```css
--lp-embossed           /* Estándar */
--lp-embossed-subtle    /* Sutil */
--lp-embossed-petrol    /* Con tinte petrol */
```

**Escala de profundidades (9 niveles):**
```css
--lp-depth-whisper     /* 0.3px - casi plano */
--lp-depth-feather     /* 0.4px */
--lp-depth-subtle      /* 0.5px */
--lp-depth-soft        /* 0.75px */
--lp-depth-medium      /* 1px - estándar */
--lp-depth-defined     /* 1.25px */
--lp-depth-deep        /* 1.5px */
--lp-depth-bold        /* 2px */
--lp-depth-monumental  /* 2.5px - para display */
```

**Utility Classes:**
```css
.text-positive, .text-jade     /* Verde con letterpress */
.text-warning, .text-gold      /* Dorado con letterpress */
.text-negative, .text-rust     /* Rojo con letterpress */
.text-info, .text-steel        /* Azul con letterpress */
.text-accent, .text-petrol     /* Petrol con letterpress */
.text-primary, .text-charcoal  /* Negro con letterpress */
.text-primary-strong           /* Negro fuerte */
```

---

### 5. `animations.css` - Sistema de Animaciones (~350 líneas)

**Propósito:** Keyframes, scroll-triggered animations, y stagger system.

**Tokens de animación:**
```css
--fing-duration-instant: 100ms
--fing-duration-fast: 200ms
--fing-duration-normal: 300ms
--fing-duration-slow: 500ms
--fing-duration-slower: 700ms

--fing-ease-out: cubic-bezier(0.16, 1, 0.3, 1)
--fing-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)
--fing-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)
```

**Keyframes disponibles (17+):**

| Categoría | Animaciones |
|-----------|-------------|
| **Atmosféricas** | `fing-breathe`, `fing-pulse-subtle`, `fing-glow` |
| **Entrada** | `fing-emerge`, `fing-fade-in`, `fing-scale-in`, `fing-slide-up` |
| **Efectos** | `fing-shimmer`, `fing-ripple`, `fing-bounce-subtle` |
| **Stock Market** | `fing-ticker-positive`, `fing-ticker-negative`, `fing-chart-draw` |

**Scroll-Triggered Animations:**
```html
<!-- Se activa cuando entra en viewport -->
<div data-animate="fade-in">Content</div>

<!-- Con stagger para listas -->
<div data-animate="slide-up" data-animate-stagger>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**Soporte para reduced motion:**
```css
@media (prefers-reduced-motion: reduce) {
  /* Todas las animaciones se desactivan automáticamente */
}
```

---

### 6. `wordmark.css` - FING Wordmark Inset System (~193 líneas)

**Propósito:** 12 variaciones de efecto tallado para el wordmark FING.

**Tipografía:**
```css
--fing-wordmark-font: 'Cormorant Garamond', serif
--fing-wordmark-weight: 300
--fing-wordmark-tracking: 0.06em
```

**12 Variaciones:**

| # | Variante | Descripción | Uso |
|---|----------|-------------|-----|
| 1 | `whisper` | Casi plano, muy sutil | Mínimo efecto |
| 2 | `soft` | Suave estándar | Equilibrio |
| 3 | `medium` | Moderado, equilibrado | Mayoría de usos |
| 4 | `deep` | Profundo, más sombra | Más presencia |
| 5 | `carved` ⭐ | Tallado invertido | **RECOMENDADO** |
| 6 | `pressed` ⭐ | Presionado con gradiente | **ALTERNATIVA** |
| 7 | `bowl` | Cuenco con gradiente radial | Depresión suave |
| 8 | `channel` | Canal/ranura horizontal | Efecto de ranura |
| 9 | `etched` | Grabado con borde interior | Definición extra |
| 10 | `crater` | Cráter profundo direccional | Hero/Display |
| 11 | `pillow` | Almohadilla diagonal | Efecto suave |
| 12 | `sharp` | Bordes definidos | Técnico/preciso |

**Tokens por variante:**
```css
/* Container inset shadow */
--fing-wm-inset-carved: inset 5px 5px 10px rgba(...), inset -5px -5px 10px rgba(...);

/* Text shadow */
--fing-wm-text-carved: -1px -1px 0px rgba(...), 1px 1px 2px rgba(...);

/* Background gradient (para pressed, bowl, crater, pillow) */
--fing-wm-bg-pressed: linear-gradient(145deg, #caced3, #dce0e5);
```

---

### 7. `buttons.css` - Sistema de Botones (~177 líneas)

**Propósito:** Tokens completos para botones neumórficos y glass.

**Neumorphism Shadows:**
```css
--fing-btn-neu-light: rgba(255, 255, 255, 0.7)
--fing-btn-neu-dark: rgba(var(--fing-border-base-rgb), 0.6)
```

**Glass Base:**
```css
--fing-btn-glass-blur: 16px
--fing-btn-glass-shine: rgba(255, 255, 255, 0.5)
```

**8 Glass Colors:**

| Color | Uso | Variables |
|-------|-----|-----------|
| Petrol | Accent/Primary | `--fing-glass-petrol-*` |
| Gold | Warning | `--fing-glass-gold-*` |
| Rust | Negative/Danger | `--fing-glass-rust-*` |
| Jade | Positive/Success | `--fing-glass-jade-*` |
| Violet | Special | `--fing-glass-violet-*` |
| Steel | Info | `--fing-glass-steel-*` |
| Smoke | Neutral | `--fing-glass-smoke-*` |
| Frost | Subtle | `--fing-glass-frost-*` |

Cada color tiene: `-bg`, `-bg-hover`, `-border`, `-glow`, `-text`

**5 Tamaños:**
```css
--fing-btn-height-xs: 30px   --fing-btn-padding-xs: 0 12px   --fing-btn-font-xs: 11px
--fing-btn-height-sm: 36px   --fing-btn-padding-sm: 0 14px   --fing-btn-font-sm: 12px
--fing-btn-height-md: 44px   --fing-btn-padding-md: 0 20px   --fing-btn-font-md: 13px
--fing-btn-height-lg: 52px   --fing-btn-padding-lg: 0 26px   --fing-btn-font-lg: 14px
--fing-btn-height-xl: 60px   --fing-btn-padding-xl: 0 32px   --fing-btn-font-xl: 15px
```

**Border Radius:**
```css
--fing-btn-radius: 12px
--fing-btn-radius-sm: 10px
--fing-btn-radius-pill: 9999px
```

**Transitions:**
```css
--fing-btn-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)
--fing-btn-transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1)
```

---

## Showcases Creados/Actualizados

### Nuevos Showcases

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/showcase/styles/letterpress` | `LetterpressShowcase.tsx` | Escala de profundidades, RAISED vs INSET, utility classes |
| `/showcase/styles/css-animations` | `CSSAnimationsShowcase.tsx` | Todas las animaciones con scroll-triggered demos |

### Contenido de LetterpressShowcase

1. **Escala de Profundidades** - 9 niveles de whisper a monumental
2. **RAISED vs INSET** - Comparación lado a lado
3. **Por Familia Tipográfica** - Display, Primary, Mono
4. **Matriz Color × Profundidad** - 5 colores × 3 profundidades
5. **Utility Classes** - KPI Cards, Stock Table, Alerts

### Contenido de CSSAnimationsShowcase

1. **Atmosféricas** - breathe, pulse-subtle, glow (infinite)
2. **Entrada** - emerge, fade-in, scale-in, slide-up (one-time)
3. **Efectos** - shimmer, ripple, bounce-subtle
4. **Stock Market** - ticker-positive, ticker-negative, chart-draw
5. **Scroll-Triggered** - Demos con Intersection Observer
6. **Stagger** - Animaciones secuenciales para listas

---

## Archivos Modificados

### `index.css` - Imports Centralizados

```css
/* 1. RESET & BASE */
@import './globals.css';

/* 2. DESIGN TOKENS (Source of Truth) */
@import './colors.css';
@import './typography.css';
@import './shadows.css';
@import './letterpress.css';
@import './animations.css';
@import './wordmark.css';
@import './buttons.css';

/* 3. LEGACY THEME (Being Consolidated) */
@import './theme.css';

/* 4. RESPONSIVE UTILITIES */
@import './responsive.css';

/* 5. COMPONENT-SPECIFIC */
@import './typography/fing.css';
```

### `ShowcaseLayout.tsx` - Sidebar Reorganizado

```
├── Home
├── FING Components
│
├── Design System        ← OFICIAL
│   ├── Brand
│   ├── Wordmark
│   ├── Colors
│   ├── Typography
│   ├── Shadows
│   ├── Letterpress
│   ├── CSS Animations   ← NUEVO
│   ├── Text Catalog
│   ├── Spacing
│   ├── Border Radius
│   ├── Icons
│   └── Buttons
│
├── Atoms
├── Molecules
├── Organisms
├── Charts
├── Animations
│
└── Lab                  ← EXPERIMENTAL (separado visualmente)
    ├── Stone Marble
    └── Light Engine
```

### `App.tsx` - Rutas Añadidas

```tsx
const LetterpressShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.LetterpressShowcase })));
const CSSAnimationsShowcase = lazy(() => import('./pages/styles').then(m => ({ default: m.CSSAnimationsShowcase })));

// Routes:
<Route path="styles/letterpress" element={<LetterpressShowcase />} />
<Route path="styles/css-animations" element={<CSSAnimationsShowcase />} />
```

---

## Trabajo Pendiente

### Inmediato
- [ ] Evaluar ~780 líneas restantes de `theme.css`
- [ ] Identificar variables legacy que pueden deprecarse
- [ ] Crear showcase para `buttons.css`

### Corto Plazo
- [ ] Migrar variables `--sentinel-*` legacy a `lab/legacy/`
- [ ] Revisar 56 hardcoded fonts en charts (Inter, Space Mono)
- [ ] Documentar uso de cada archivo CSS

### Mediano Plazo
- [ ] Reducir `theme.css` a <500 líneas
- [ ] Evaluar promoción de `light-engine.css` a producción
- [ ] Tests visuales de regresión

---

## Cómo Usar el Sistema

### Importar CSS

```tsx
// En main.tsx - SOLO importar index.css
import '@/styles/index.css';
```

### Texto en contenedor RAISED

```css
.myTitle {
  color: var(--fing-accent);
  text-shadow: var(--lp-petrol);
}
```

### Texto en contenedor INSET

```css
.myTitle {
  color: var(--marble-dark);
  text-shadow: var(--lp-embossed);
}
```

### Sombras neumórficas

```css
.card {
  background: var(--marble-base);
  box-shadow: var(--raised-3);
}

.cardContent {
  box-shadow: var(--inset-2);
}

.item {
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
}
```

### Scroll-triggered animation

```html
<div data-animate="fade-in">Aparece al hacer scroll</div>
```

### Glass button

```css
.button {
  background: var(--fing-glass-petrol-bg);
  border: 1px solid var(--fing-glass-petrol-border);
  color: var(--fing-glass-petrol-text);
  height: var(--fing-btn-height-md);
  padding: var(--fing-btn-padding-md);
  border-radius: var(--fing-btn-radius);
  transition: var(--fing-btn-transition);
}

.button:hover {
  background: var(--fing-glass-petrol-bg-hover);
  box-shadow: 0 0 12px var(--fing-glass-petrol-glow);
}
```

---

## Conclusión

La consolidación ha reducido `theme.css` de ~84KB a ~780 líneas, extrayendo tokens a 7 archivos CSS modulares y bien documentados. El sistema ahora tiene:

1. **Una única fuente de verdad** - Cada tipo de token en su archivo
2. **Documentación viva** - Showcases para cada sistema
3. **Separación clara** - Producción vs Lab
4. **Scroll animations** - Sistema completo con Intersection Observer
5. **Utility classes** - Para uso rápido de letterpress

El próximo paso es continuar evaluando `theme.css` para identificar más tokens que puedan extraerse o deprecarse.
