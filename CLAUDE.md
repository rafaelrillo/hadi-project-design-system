# SENTINEL Design System

## Descripcion del Proyecto

**SENTINEL** es una plataforma de analisis de inversiones y recomendaciones del mercado de valores. El design system utiliza **Stone Marble Neumorphism**: superficies con aspecto de marmol pulido, usando una jerarquia estricta de elevaciones e insets.

**Branch actual**: `redesign/stock-market-ui`

### Proposito de la App

1. **Dashboard Principal**: Vista general del portfolio vs benchmarks (S&P 500, NASDAQ, Gold, Bonds)
2. **Portfolio View**: Gestion de holdings con tabla y TreeMap de allocations
3. **Portfolio Simulator**: Herramienta what-if de 5 pasos para crear portfolios hipoteticos
4. **Recommendations (Calibrate)**: Señales de compra/venta generadas por IA con analisis
5. **News View**: Feed de noticias del mercado con analisis de sentimiento
6. **Component Showcase**: Documentacion viva del design system en `/showcase`

---

## FING Brand Identity

### Origen del Nombre

**FING** = **FIN** (fīnis) + **ING** (ingenium)

- **FINIS → FINANCE**: Del latin "fīnis" — resolver, concluir. El significado original no era sobre dinero, sino sobre **completar lo pendiente**: saldar deudas, cumplir compromisos, alcanzar objetivos.
- **INGENIUM → ENGINE**: Del latin "ingenium" — "lo que nace dentro". Antes de significar "maquina", engine significaba **ingenio**: la capacidad humana de crear dispositivos que resuelven problemas.

**Sintesis**: El motor de conclusiones. Inteligencia que no especula — resuelve.

### Personalidad de Marca

FING encarna el arquetipo del **Senior Analyst** — alguien que ha visto ciclos completos, que no se impresiona por el ruido diario, que solo habla cuando hay algo que valga la pena decir.

| Trait | Descripcion |
|-------|-------------|
| **Silent** | Habla poco, pero con peso |
| **Patient** | Observa el largo plazo |
| **Precise** | Cada palabra cuenta |
| **Institutional** | Serio, profesional |
| **Intelligent** | Sofisticado, no pretencioso |

### Taglines Oficiales

- **"Quiet intelligence"** — La personalidad
- **"Resolve"** — La accion
- **"The long view"** — La paciencia

### Voz de Marca

**Decimos:**
- "The market shows signs of consolidation"
- "We observe a moderate risk level"
- "Analysis suggests a neutral position"

**NO decimos:**
- "BUY NOW! Don't miss this opportunity!"
- "We guarantee 20% returns"
- "ALERT: Market crash imminent!"

### Logo y Simbolo

El logo consiste en dos formas organicas que representan **dualidad** (riesgo/retorno), **balance** y **dialogo**. Se superponen creando profundidad.

**4 Variantes:**
1. **Dark** (fondos oscuros): `--fing-logo-slate-1`, `--fing-logo-slate-2`
2. **Stone** (fondos marble): `--fing-logo-marble-1`, `--fing-logo-marble-2`
3. **White** (fondos de acento teal)
4. **Light** (fondos blancos): `--fing-logo-light-1`, `--fing-logo-light-2`

### FING Emblem — Radar Symbol

El emblema de FING es un **simbolo de radar/pulso** (punto central + 3 aros concentricos) tallado con efecto sutil dentro de un **contenedor circular hundido (inset)**. Representa "quiet intelligence" — escaneando, analizando, resolviendo.

#### Componente

```tsx
import { FingEmblem, FingLockupHorizontal, FingLockupVertical } from '@atoms/FingEmblem';

// Emblema basico
<FingEmblem size={100} animation="ripple" />

// Lockup horizontal (emblema + wordmark)
<FingLockupHorizontal size={70} animation="ripple" />

// Lockup vertical
<FingLockupVertical size={80} />
```

#### Props

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `size` | `number` | `100` | Tamaño del contenedor en px |
| `animation` | `'none' | 'breathe' | 'pulse' | 'glow' | 'ripple' | 'rotate' | 'heartbeat'` | `'none'` | Animacion |
| `showWordmark` | `boolean` | `false` | Mostrar wordmark |
| `wordmarkPosition` | `'right' | 'bottom'` | `'right'` | Posicion del wordmark |

#### Animaciones

| Animacion | Descripcion | Uso recomendado |
|-----------|-------------|-----------------|
| `breathe` | Expansion/contraccion sutil del SVG | Loading states |
| `pulse` | Opacity en cascada de los aros | Status activo |
| `glow` | Brillo teal que pulsa en el contenedor | Highlight/focus |
| `ripple` | Ondas que emanan del centro | Default, navigation |
| `rotate` | Giro muy lento (30s/vuelta) | Background ambient |
| `heartbeat` | Cascada de opacity rapida | Alertas sutiles |

#### Tokens CSS

```css
/* Emblem base */
--fing-marble-base: #d5d8dc;
--fing-shadow-light: rgba(255, 255, 255, 0.95);
--fing-shadow-dark: rgba(147, 157, 170, 0.55);
--fing-teal-glow: rgba(58, 106, 114, 0.5);  /* Petrol glow */

/* Radar symbol */
--fing-symbol-fill: #babec4;
--fing-symbol-stroke: #b2b6bc;

/* Carve effect */
--fing-carve-light: rgba(255, 255, 255, 0.92);
--fing-carve-dark: rgba(140, 150, 165, 0.65);
```

#### Ubicacion

- Archivo: `src/components/atoms/FingEmblem/`
- Showcase: `/showcase/styles/brand` (seccion "FING Emblem — Radar Symbol")

### FING Wordmark — Inset Typography System

El wordmark de FING utiliza **Cormorant Garamond Light** con 12 variaciones de efecto inset/cavado que se alinean con la filosofia Stone Marble.

#### Tipografia

| Propiedad | Valor |
|-----------|-------|
| Font | Cormorant Garamond |
| Weight | 300 (Light) |
| Letter Spacing | 0.06em |

#### Componente

```tsx
import { FingWordmark, FingWordmarkText } from '@atoms/FingWordmark';

// Con contenedor (default)
<FingWordmark variant="carved" size={72} />

// Solo texto (sin contenedor)
<FingWordmarkText variant="carved" size={72} />
```

#### Props

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `variant` | `FingWordmarkVariant` | `'carved'` | Variacion de inset |
| `size` | `number` | `72` | Tamaño de fuente en px |
| `showContainer` | `boolean` | `true` | Mostrar contenedor |
| `containerPadding` | `number` | `32` | Padding del contenedor |
| `containerRadius` | `number` | `16` | Border radius del contenedor |

#### 12 Variaciones

| # | Variante | Descripcion | Uso recomendado |
|---|----------|-------------|-----------------|
| 1 | `whisper` | Casi plano, muy sutil | Minimo efecto |
| 2 | `soft` | Suave estandar | Equilibrio visibilidad/sutileza |
| 3 | `medium` | Moderado, equilibrado | Mayoria de usos |
| 4 | `deep` | Profundo, mas sombra | Mas presencia |
| 5 | `carved` ⭐ | Tallado invertido | **Logo/Wordmark (recomendado)** |
| 6 | `pressed` ⭐ | Presionado con gradiente | **Alternativa recomendada** |
| 7 | `bowl` | Cuenco con gradiente radial | Depresion suave |
| 8 | `channel` | Canal/ranura horizontal | Efecto de ranura |
| 9 | `etched` | Grabado con borde interior | Definicion extra |
| 10 | `crater` | Crater profundo direccional | Hero/Display |
| 11 | `pillow` | Almohadilla diagonal | Efecto suave |
| 12 | `sharp` | Bordes definidos | Tecnico/preciso |

#### Tokens CSS

```css
/* Wordmark Font */
--fing-wordmark-font: 'Cormorant Garamond', serif;
--fing-wordmark-weight: 300;
--fing-wordmark-tracking: 0.06em;

/* Recomendado: Carved */
--fing-wm-inset-carved: inset 5px 5px 10px rgba(130, 140, 155, 0.55),
                        inset -5px -5px 10px rgba(255, 255, 255, 0.9);
--fing-wm-text-carved: -1px -1px 0px rgba(255, 255, 255, 0.9),
                       1px 1px 2px rgba(130, 140, 155, 0.6);

/* Recomendado: Pressed */
--fing-wm-inset-pressed: inset 8px 8px 16px rgba(115, 125, 140, 0.65),
                         inset -8px -8px 16px rgba(255, 255, 255, 0.85);
--fing-wm-text-pressed: -1.5px -1.5px 1px rgba(255, 255, 255, 0.8),
                        1.5px 1.5px 2px rgba(115, 125, 140, 0.7);
--fing-wm-bg-pressed: linear-gradient(145deg, #caced3, #dce0e5);
```

#### Ubicacion

- Archivo: `src/components/atoms/FingWordmark/`
- Showcase: `/showcase/styles/wordmark`

### Colores de Marca — Natural Mineral Palette

Todos los colores semanticos derivan de materiales naturales: minerales, piedras, metales y tierra.

```css
/* Primary Black - Charcoal (burned wood carbon) */
--fing-black: #252528;
--fing-black-rgb: 37, 37, 40;

/* Logo Colors - Dark Variant */
--fing-logo-slate-1: #3a3a42;
--fing-logo-slate-2: #44444c;

/* Logo Colors - Stone Variant */
--fing-logo-marble-1: #eceef2;
--fing-logo-marble-2: #f0f2f5;

/* Logo Colors - Light Variant */
--fing-logo-light-1: #e8e8ec;
--fing-logo-light-2: #ededf0;

/* Brand Accent - Petrol (petroleum deposits) */
--fing-accent: #3a6a72;
--fing-accent-light: #4a7a82;
--fing-accent-dark: #2a5a62;

/* Text Accent - Steel (refined iron alloy) */
--fing-text-accent: #4a6a7a;

/* Semantic Colors - Natural Minerals */
--fing-positive: #4a7a6a;       /* Jade (green stone) */
--fing-positive-light: #5a8a7a;
--fing-positive-dark: #3a6a5a;

--fing-warning: #a08a4a;        /* Gold (pure metal) */
--fing-warning-light: #b09a5a;
--fing-warning-dark: #8a7a3a;

--fing-negative: #8a5a4a;       /* Rust (iron oxide) */
--fing-negative-light: #9a6a5a;
--fing-negative-dark: #7a4a3a;

--fing-info: #4a6a7a;           /* Steel (same as text accent) */
--fing-info-light: #5a7a8a;
--fing-info-dark: #3a5a6a;

/* Text Colors */
--fing-text-primary: var(--fing-black);
--fing-text-light: #f0f0f2;
--fing-text-muted: #8a8f96;
--fing-text-dark: var(--fing-black);
```

| Token | Name | Hex | Natural Origin |
|-------|------|-----|----------------|
| `--fing-black` | Charcoal | #252528 | Burned wood carbon |
| `--fing-accent` | Petrol | #3a6a72 | Petroleum deposits |
| `--fing-text-accent` | Steel | #4a6a7a | Refined iron alloy |
| `--fing-positive` | Jade | #4a7a6a | Jade stone |
| `--fing-warning` | Gold | #a08a4a | Pure gold metal |
| `--fing-negative` | Rust | #8a5a4a | Iron oxide |
| `--fing-info` | Steel | #4a6a7a | Refined iron alloy |
| `--marble-base` | Marble | #d5d8dc | Natural stone |

### Letterpress Text Shadows

Para texto coloreado sobre fondo marble, usar este patron:

```css
/* Positive - Jade */
.text-positive {
  color: var(--fing-positive);
  text-shadow:
    0.5px 0.5px 0px rgba(255, 255, 255, 0.9),
    -0.5px -0.5px 0px rgba(74, 122, 106, 0.25);
}

/* Warning - Gold */
.text-warning {
  color: var(--fing-warning);
  text-shadow:
    0.5px 0.5px 0px rgba(255, 255, 255, 0.9),
    -0.5px -0.5px 0px rgba(160, 138, 74, 0.25);
}

/* Negative - Rust */
.text-negative {
  color: var(--fing-negative);
  text-shadow:
    0.5px 0.5px 0px rgba(255, 255, 255, 0.9),
    -0.5px -0.5px 0px rgba(138, 90, 74, 0.25);
}

/* Primary - Charcoal */
.text-primary,
.text-charcoal {
  color: var(--fing-black);
  text-shadow:
    0.5px 0.5px 0px rgba(255, 255, 255, 0.9),
    -0.5px -0.5px 0px rgba(37, 37, 40, 0.2);
}

/* Primary Strong - Charcoal (for larger text) */
.text-primary-strong {
  color: var(--fing-black);
  text-shadow:
    1px 1px 0px rgba(255, 255, 255, 0.9),
    -1px -1px 0px rgba(37, 37, 40, 0.25);
}
```

### CSS Variables for Letterpress

```css
/* Semantic Colors */
--lp-positive: 0.5px 0.5px 0px rgba(255,255,255,0.9), -0.5px -0.5px 0px rgba(74,122,106,0.25);
--lp-warning: 0.5px 0.5px 0px rgba(255,255,255,0.9), -0.5px -0.5px 0px rgba(160,138,74,0.25);
--lp-negative: 0.5px 0.5px 0px rgba(255,255,255,0.9), -0.5px -0.5px 0px rgba(138,90,74,0.25);
--lp-info: 0.5px 0.5px 0px rgba(255,255,255,0.9), -0.5px -0.5px 0px rgba(74,106,122,0.25);
--lp-accent: 0.5px 0.5px 0px rgba(255,255,255,0.9), -0.5px -0.5px 0px rgba(58,106,114,0.25);

/* Primary Text - Charcoal */
--lp-primary: 0.5px 0.5px 0px rgba(255,255,255,0.9), -0.5px -0.5px 0px rgba(37,37,40,0.2);
--lp-primary-strong: 1px 1px 0px rgba(255,255,255,0.9), -1px -1px 0px rgba(37,37,40,0.25);
```

### Tipografia de Marca

| Fuente | Uso | Variable |
|--------|-----|----------|
| **DM Sans** | UI general, titulos, cuerpo | `--sentinel-font-primary` |
| **IBM Plex Mono** | Datos financieros, tickers | `--sentinel-font-mono` |
| **Libre Baskerville** | Display, headlines elegantes | `--sentinel-font-display` |
| **Cormorant Garamond** | Wordmark FING | `--fing-wordmark-font` |

### Brand Showcase

Ruta: `/showcase/styles/brand`

Archivo: `src/pages/styles/BrandShowcase.tsx`

---

## Stack Tecnologico

| Categoria | Tecnologia | Version | Notas |
|-----------|------------|---------|-------|
| Framework | React | 19 | Con Suspense y lazy loading |
| Lenguaje | TypeScript | Strict mode | |
| Build | Vite | | Path aliases configurados |
| State | Zustand | | 6 stores: auth, market, portfolio, wallet, news, recommendations |
| Charts | **ECharts** | 5.6.0 | 24 tipos de graficos + tema SENTINEL |
| Animaciones | Framer Motion | | Transiciones suaves |
| Iconos | Lucide React | | |
| Routing | React Router DOM | v6 | Lazy loading por ruta |
| Testing | Jest + Cypress | | Unit + E2E |
| Estilos | CSS Modules | | Variables en theme.css |

---

## Sistema de Diseno - Stone Marble Neumorphism

### Filosofia de Diseno

El design system se basa en una estetica de **marmol pulido** con una jerarquia visual estricta:

1. **Fondo Base**: Superficie de marmol fria (#d5d8dc)
2. **Raised (Elevado)**: Elementos que "flotan" sobre la superficie con sombras externas
3. **Inset (Hundido)**: Cavidades talladas en la superficie con sombras internas
4. **Glass**: Elementos semitransparentes flotando sobre insets

### Jerarquia Stone Marble (REGLA CRITICA)

```
FONDO (#d5d8dc) → RAISED → INSET → GLASS
```

**Reglas de Anidamiento:**
- NUNCA anidar mismo nivel (RAISED dentro de RAISED)
- NUNCA saltar niveles (FONDO directo a GLASS)
- SIEMPRE alternar: RAISED contiene INSET, INSET contiene GLASS
- Los containers principales son RAISED
- Las secciones internas son INSET
- Los items interactivos son GLASS

**Regla de Tipografia Neumórfica (CRITICA):**
- Contenedor **RAISED** → Tipografía **INSET** (cavada/debossed/engraved)
- Contenedor **INSET** → Tipografía **RAISED** (elevada/embossed)

```css
/* Tipografia en contenedor RAISED - usar efecto INSET */
.titleInRaisedContainer {
  color: var(--marble-dark);
  text-shadow:
    0.75px 0.75px 0px rgba(255, 255, 255, 0.7),
    -0.75px -0.75px 0px rgba(130, 140, 155, 0.5);
}

/* Tipografia en contenedor INSET - usar efecto RAISED */
.titleInInsetContainer {
  color: var(--marble-base);
  text-shadow:
    -1.5px -1.5px 0px rgba(255, 255, 255, 0.95),
    1.5px 1.5px 0px rgba(147, 157, 170, 0.55);
}
```

### Paleta de Colores - Stone Marble

```css
/* ═══════════════════════════════════════════════════════════════════════════
   MARBLE BASE - Superficie de marmol frio
   ═══════════════════════════════════════════════════════════════════════════ */

--marble-base: #d5d8dc;           /* Fondo principal - marmol pulido */
--marble-light: #dfe2e6;          /* Variante clara (+5% luminosidad) */
--marble-dark: #c8cbd0;           /* Variante oscura (-5% luminosidad) */
--marble-deeper: #bbbec3;         /* Para profundidad extra */

/* ═══════════════════════════════════════════════════════════════════════════
   SHADOW COLORS - Sombras del marmol
   ═══════════════════════════════════════════════════════════════════════════ */

--shadow-light: #ffffff;          /* Highlight (borde superior-izquierdo) */
--shadow-dark: #a8acb3;           /* Sombra (borde inferior-derecho) */

/* ═══════════════════════════════════════════════════════════════════════════
   RAISED PRESETS - Elementos elevados (5 niveles)
   ═══════════════════════════════════════════════════════════════════════════ */

--raised-1: 2px 2px 4px var(--shadow-dark), -2px -2px 4px var(--shadow-light);
--raised-2: 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light);
--raised-3: 6px 6px 12px var(--shadow-dark), -6px -6px 12px var(--shadow-light);
--raised-4: 8px 8px 16px var(--shadow-dark), -8px -8px 16px var(--shadow-light);
--raised-5: 10px 10px 20px var(--shadow-dark), -10px -10px 20px var(--shadow-light);

/* ═══════════════════════════════════════════════════════════════════════════
   INSET PRESETS - Elementos hundidos (5 niveles)
   ═══════════════════════════════════════════════════════════════════════════ */

--inset-1: inset 2px 2px 4px var(--shadow-dark), inset -2px -2px 4px var(--shadow-light);
--inset-2: inset 3px 3px 6px var(--shadow-dark), inset -3px -3px 6px var(--shadow-light);
--inset-3: inset 4px 4px 8px var(--shadow-dark), inset -4px -4px 8px var(--shadow-light);
--inset-4: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light);
--inset-5: inset 6px 6px 12px var(--shadow-dark), inset -6px -6px 12px var(--shadow-light);

/* ═══════════════════════════════════════════════════════════════════════════
   GLASS - Elementos semitransparentes (para items dentro de insets)
   ═══════════════════════════════════════════════════════════════════════════ */

--glass-bg: rgba(255, 255, 255, 0.25);
--glass-bg-hover: rgba(255, 255, 255, 0.4);
--glass-bg-active: rgba(255, 255, 255, 0.55);
--glass-border: rgba(255, 255, 255, 0.5);

/* ═══════════════════════════════════════════════════════════════════════════
   TEXT COLORS - Sobre fondo marmol
   ═══════════════════════════════════════════════════════════════════════════ */

--text-primary: #2d3748;          /* Texto principal oscuro */
--text-secondary: #5a6578;        /* Texto secundario */
--text-muted: #8896a6;            /* Texto deshabilitado/hints */

/* ═══════════════════════════════════════════════════════════════════════════
   ACCENT COLORS
   ═══════════════════════════════════════════════════════════════════════════ */

--sentinel-accent-primary: #4a9a9c;   /* Teal institucional */
--sentinel-accent-secondary: #5ba3a5;
--accent-glow: rgba(74, 154, 156, 0.4);

/* ═══════════════════════════════════════════════════════════════════════════
   STATUS COLORS (Conservadores)
   ═══════════════════════════════════════════════════════════════════════════ */

--sentinel-status-positive: #4a9a7c;   /* Verde desaturado */
--sentinel-status-negative: #b85c5c;   /* Rojo tenue */
--sentinel-status-warning: #c4a35a;    /* Ambar suave */
--sentinel-status-info: #5a8fb8;       /* Azul neutral */
```

### Uso de Sombras

```css
/* Container principal (RAISED) */
.panel {
  background: var(--marble-base);
  box-shadow: var(--raised-3);
  border-radius: 20px;
}

/* Seccion interna (INSET dentro de RAISED) */
.section {
  background: var(--marble-base);
  box-shadow: var(--inset-2);
  border-radius: 15px;
}

/* Item interactivo (GLASS dentro de INSET) */
.item {
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
}

.item:hover {
  background: var(--glass-bg-hover);
}
```

### Border Radius Estandar

```css
--border-radius-sm: 8px;      /* Elementos pequenos */
--border-radius-md: 12px;     /* Items, inputs */
--border-radius-lg: 15px;     /* Cards, sections */
--border-radius-xl: 20px;     /* Containers, panels */
```

### Transiciones

```css
--transition-fast: 150ms ease;
--transition-normal: 200ms ease;
--transition-shadow: 50ms linear;  /* Para sombras dinamicas */
```

---

## Light Engine - Sombras Dinamicas

### LightEngineContext

Sistema de iluminacion dinamica que calcula sombras basadas en un angulo de luz global.

```tsx
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// Envolver la app o seccion
<LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
  <MyComponent />
</LightEngineProvider>

// Usar en componente
function MyComponent() {
  const { lightAngle, shadows } = useLightEngine();

  // shadows.getNeuPanelShadow(distance, blur) - Sombra elevada
  // shadows.getNeuInsetShadow(distance, blur) - Sombra hundida

  return (
    <div style={{ boxShadow: shadows.getNeuPanelShadow(8, 20) }}>
      Content
    </div>
  );
}
```

### Patron de Uso en Showcases

```tsx
function MyShowcaseContent() {
  const { lightAngle } = useLightEngine();

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const MARBLE = {
    base: '#d5d8dc',
    shadowDark: '#a8acb3',
    shadowLight: '#ffffff',
  };

  const getRaisedShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}, ${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}`;
  };

  const getInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}`;
  };

  return (
    <div style={{ background: MARBLE.base, boxShadow: getRaisedShadow(8, 16) }}>
      Content
    </div>
  );
}

export function MyShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <MyShowcaseContent />
    </LightEngineProvider>
  );
}
```

---

## Componentes Principales

### Sidebar

Container neumorfilo elevado con secciones inset y items glass.

```tsx
import { Sidebar } from '@organisms/Sidebar';
import type { SidebarSection } from '@organisms/Sidebar';

const sections: SidebarSection[] = [
  {
    title: 'Projects',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', isActive: true, badge: 3 },
      { icon: Library, label: 'Library' },
    ],
  },
];

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  avatarUrl: '/avatar.jpg',
};

<Sidebar
  productLogo={<Logo />}
  sections={sections}
  user={user}
  collapsed={false}           // true = modo iconos solamente
  onSearch={(v) => console.log(v)}
  onUserClick={() => console.log('user clicked')}
/>
```

**Props:**
- `collapsed`: boolean - Modo colapsado (solo iconos, 80px ancho)
- `onUserClick`: callback cuando se hace click en el perfil de usuario

**Dimensiones:**
- Expanded: 280px
- Collapsed: 80px
- Border radius: 24px

---

## Estructura del Proyecto

```
src/
├── contexts/
│   └── LightEngineContext.tsx   # Sistema de iluminacion dinamica
├── hooks/
│   └── useDynamicShadows.ts     # Hook para sombras dinamicas
├── components/
│   ├── atoms/              # Componentes base
│   │   └── sentinel/       # Componentes Stone Marble (InsetContainer, etc.)
│   ├── molecules/          # Componentes compuestos
│   ├── organisms/          # Secciones completas
│   │   └── Sidebar/        # Sidebar con Stone Marble
│   ├── charts/             # ECharts components
│   │   └── echarts/        # 24 tipos de graficos
│   └── animations/         # Componentes de animacion
├── pages/
│   └── styles/             # Showcases del design system
│       └── StoneMarbleShowcase.tsx
└── styles/
    └── theme.css           # Variables CSS globales
```

---

## Patrones de Arquitectura

### Atomic Design
```
Atoms → Molecules → Organisms → Layouts → Pages
```

### Convencion de Archivo
```tsx
// Path: src/components/atoms/Button/Button.tsx
```

### CSS Modules + Variables Dinamicas
```tsx
import styles from './Component.module.css';

// CSS estatico en .module.css
// Valores dinamicos (sombras) en style prop
<div
  className={styles.container}
  style={{ boxShadow: getRaisedShadow(8, 16) }}
>
```

---

## Graficos (ECharts)

### 24 Tipos de Graficos

| Categoria | Graficos |
|-----------|----------|
| **Financieros** | CandlestickChart, LineChart, BarChart |
| **Circulares** | PieChart, GaugeChart, SunburstChart |
| **Comparacion** | RadarChart, ParallelChart, BoxplotChart |
| **Distribucion** | TreeMap, HeatMap, CalendarChart |
| **Flujo** | SankeyChart, FunnelChart, ThemeRiverChart |
| **Relaciones** | GraphChart, ScatterChart, EffectScatterChart |
| **Jerarquia** | TreeChart, TreeMap, SunburstChart |
| **Especiales** | PictorialBarChart |

### Tema SENTINEL

Definido en `src/components/charts/echarts/sentinelTheme.ts`:
- Paleta de 8 colores para series
- Tooltip con estilo Stone Marble
- Animaciones suaves (700ms, cubicOut)

---

## Comandos

```bash
npm run dev           # Desarrollo (puerto 5173)
npm run build         # Build produccion
npm run test          # Jest tests
npm run lint          # ESLint
```

---

## Path Aliases

```tsx
@/           → src/
@components/ → src/components/
@atoms/      → src/components/atoms/
@molecules/  → src/components/molecules/
@organisms/  → src/components/organisms/
@contexts/   → src/contexts/
@hooks/      → src/hooks/
@layouts/    → src/layouts/
@pages/      → src/pages/
@services/   → src/services/
@store/      → src/store/
@styles/     → src/styles/
```

---

## Rutas del Showcase

```
/showcase/styles/brand          → FING Brand Guidelines
/showcase/styles/wordmark       → FING Wordmark Inset Variations
/showcase/styles/colors         → Paleta de colores
/showcase/styles/typography     → Sistema tipografico
/showcase/styles/spacing        → Espaciado
/showcase/styles/shadows        → Sombras y elevaciones
/showcase/styles/stone-marble   → Showcase Stone Marble
/showcase/styles/icons          → Iconografia
/showcase/atoms/*               → Componentes atomicos
/showcase/molecules/*           → Componentes moleculares
/showcase/organisms/*           → Organismos (Sidebar, Modal, etc.)
/showcase/charts/*              → Graficos ECharts
/showcase/animations/*          → Animaciones
/showcase/sentinel/*            → Componentes SENTINEL
```

---

## Reglas para Claude

### DO (Hacer)

1. **Usar Stone Marble Hierarchy**: RAISED → INSET → GLASS
2. **Usar LightEngineContext**: Para sombras dinamicas
3. **Seguir el patron de showcases**: Con `LightEngineProvider` wrapper
4. **Usar variables CSS**: `--marble-base`, `--raised-*`, `--inset-*`, `--glass-*`
5. **Border radius**: 20px containers, 15px sections, 12px items
6. **Transiciones suaves**: `50ms linear` para sombras

### DON'T (No hacer)

1. **No anidar mismo nivel**: RAISED dentro de RAISED esta PROHIBIDO
2. **No saltar niveles**: FONDO directo a GLASS esta PROHIBIDO
3. **No usar #e0e5ec**: Usar #d5d8dc (marble-base) en su lugar
4. **No hardcodear sombras**: Usar funciones dinamicas o variables
5. **No olvidar backdrop-filter**: Es clave para el efecto glass

---

## TAREAS COMPLETADAS

- [x] Migracion de Nivo a ECharts
- [x] Implementar Light Engine con sombras dinamicas
- [x] Rediseno Glass-Neumorphism completo
- [x] Migracion tipografica completa (IBM Plex Sans, Libre Baskerville, IBM Plex Mono)
- [x] Rediseno completo del Sidebar v5.0
- [x] **Stone Marble Design System** (2026-01-17)
  - [x] Nueva paleta de colores (#d5d8dc base)
  - [x] Sistema de jerarquia RAISED → INSET → GLASS
  - [x] Variables CSS para 5 niveles de sombras
  - [x] InsetContainer component
  - [x] StoneMarbleShowcase
- [x] **FING Brand Integration** (2026-01-18)
  - [x] Variables CSS para colores de logo (slate, marble, light)
  - [x] Colores semanticos conservadores (--fing-positive, --fing-negative, --fing-warning)
  - [x] Migracion tipografica a DM Sans
  - [x] BrandShowcase.tsx con guidelines completas
  - [x] Documentacion en CLAUDE.md
- [x] **FING Emblem — Radar Symbol** (2026-01-18)
  - [x] FingEmblem component con 6 animaciones (breathe, pulse, glow, ripple, rotate, heartbeat)
  - [x] Contenedor inset circular con efecto de tallado SVG
  - [x] Lockups horizontal y vertical con wordmark
  - [x] Tokens CSS para emblem (--fing-symbol-fill, --fing-symbol-stroke, --fing-carve-*)
  - [x] Integracion en DashboardLayout, LandingHero, SidebarShowcase, ShowcaseLayout
  - [x] Seccion en BrandShowcase con demos de tamaños y animaciones
- [x] **Natural Mineral Color Palette** (2026-01-19)
  - [x] Nuevo sistema de colores basado en materiales naturales
  - [x] Primary Black: Charcoal (#252528) - carbon de madera quemada
  - [x] Accent: Teal → Petrol (#3a6a72)
  - [x] Positive: Verde → Jade (#4a7a6a)
  - [x] Warning: Amber → Gold (#a08a4a)
  - [x] Negative: Coral → Rust (#8a5a4a)
  - [x] Info: Blue → Steel (#4a6a7a)
  - [x] Actualizados 45+ archivos CSS/TSX
  - [x] Letterpress text shadow utilities (.text-positive, .text-warning, .text-primary, etc.)
  - [x] CSS variables para letterpress (--lp-positive, --lp-warning, --lp-primary, etc.)
  - [x] Documentacion actualizada en CLAUDE.md
- [x] **FING Wordmark — Inset Typography System** (2026-01-19)
  - [x] Cormorant Garamond Light (300) como fuente del wordmark
  - [x] 12 variaciones de efecto inset/cavado
  - [x] FingWordmark y FingWordmarkText components
  - [x] Variables CSS para containers (--fing-wm-inset-*) y texto (--fing-wm-text-*)
  - [x] 4 gradientes especiales (pressed, bowl, crater, pillow)
  - [x] WordmarkShowcase con demos de todas las variaciones
  - [x] Ruta: `/showcase/styles/wordmark`

---

## DECISIONES TOMADAS

**[2026-01-19] FING Wordmark — Inset Typography System**
- **Decision**: Crear sistema de wordmark con 12 variaciones inset usando Cormorant Garamond
- **Cambios principales**:
  - Tipografia: Cormorant Garamond Light (weight 300, letter-spacing 0.06em)
  - 12 variaciones: whisper, soft, medium, deep, carved, pressed, bowl, channel, etched, crater, pillow, sharp
  - Variaciones recomendadas: **CARVED** (tallado invertido) y **PRESSED** (gradiente direccional)
  - Componentes: FingWordmark (con contenedor) y FingWordmarkText (solo texto)
- **Archivos clave**:
  - `/src/components/atoms/FingWordmark/FingWordmark.tsx`
  - `/src/components/atoms/FingWordmark/FingWordmark.module.css`
  - `/src/styles/theme.css` (tokens --fing-wm-*, --fing-wordmark-*)
  - `/src/pages/styles/WordmarkShowcase.tsx`
  - `/index.html` (import Cormorant Garamond)
- **Variables CSS agregadas**:
  - Font: `--fing-wordmark-font`, `--fing-wordmark-weight`, `--fing-wordmark-tracking`
  - Containers: `--fing-wm-inset-whisper` a `--fing-wm-inset-sharp`
  - Text shadows: `--fing-wm-text-whisper` a `--fing-wm-text-sharp`
  - Gradientes: `--fing-wm-bg-pressed`, `--fing-wm-bg-bowl`, `--fing-wm-bg-crater`, `--fing-wm-bg-pillow`
- **Razon**: El wordmark necesita un efecto "carved in stone" que se alinee con la estetica Stone Marble

**[2026-01-19] Natural Mineral Color Palette**
- **Decision**: Migrar toda la paleta de colores a materiales naturales
- **Cambios principales**:
  - Primary Black: Charcoal (#252528) - carbon de madera quemada
  - Accent: Teal (#4A9A9C) → Petrol (#3a6a72) - depositos de petroleo
  - Positive: Verde (#4a9a7c) → Jade (#4a7a6a) - piedra de jade
  - Warning: Amber (#c9a87a) → Gold (#a08a4a) - oro puro
  - Negative: Coral (#c98a8a) → Rust (#8a5a4a) - oxido de hierro
  - Info: Blue → Steel (#4a6a7a) - aleacion de hierro refinado
  - Letterpress text shadows para cada color semantico
- **Archivos clave**:
  - `/src/styles/theme.css` - Variables CSS actualizadas
  - 45+ archivos CSS modules y TSX actualizados
  - `/src/components/charts/echarts/sentinelTheme.ts` - Tema de graficos
- **Utilities agregados**:
  - Clases CSS: `.text-positive`, `.text-warning`, `.text-negative`, `.text-info`, `.text-accent`, `.text-primary`, `.text-charcoal`, `.text-primary-strong`
  - Variables: `--lp-positive`, `--lp-warning`, `--lp-negative`, `--lp-info`, `--lp-accent`, `--lp-primary`, `--lp-primary-strong`
- **Razon**: Todos los colores ahora tienen un origen natural (minerales, piedras, metales, tierra, carbon) para coherencia con la estetica Stone Marble

**[2026-01-18] FING Emblem — Radar Symbol**
- **Decision**: Crear nuevo emblema combinando el logo de SENTINEL con FING
- **Cambios principales**:
  - Componente FingEmblem: punto central + 3 aros concentricos en contenedor inset
  - 6 animaciones CSS: breathe, pulse, glow, ripple, rotate, heartbeat
  - Efecto de tallado SVG usando filtros (feOffset, feGaussianBlur, feMerge)
  - Lockups con wordmark en posicion horizontal y vertical
- **Archivos clave**:
  - `/src/components/atoms/FingEmblem/FingEmblem.tsx`
  - `/src/components/atoms/FingEmblem/FingEmblem.module.css`
  - `/src/styles/theme.css` (tokens --fing-symbol-*, --fing-carve-*)
- **Integracion**:
  - DashboardLayout: Sidebar logo con animation="ripple"
  - LandingHero: Hero logo size=120 con animation="ripple"
  - ShowcaseLayout: Sidebar logo size=36 con animation="breathe"
  - SidebarShowcase: Demos con animation="ripple"

**[2026-01-18] FING Brand Integration**
- **Decision**: Integrar el branding de FING al design system SENTINEL
- **Cambios principales**:
  - Tipografia primaria: IBM Plex Sans → DM Sans
  - Colores semanticos conservadores alineados con voz "Senior Analyst"
  - Variables CSS para colores del logo (4 variantes)
  - BrandShowcase con guidelines completas
- **Archivos clave**:
  - `/src/styles/theme.css` (nuevas variables --fing-*)
  - `/src/pages/styles/BrandShowcase.tsx`
  - `/index.html` (import DM Sans)

**[2026-01-17] Stone Marble Design System**
- **Decision**: Evolucion del Glass-Neumorphism a Stone Marble
- **Cambios principales**:
  - Base color: #e0e5ec → #d5d8dc (mas frio, aspecto marmol)
  - Jerarquia estricta: RAISED → INSET → GLASS
  - Variables predefinidas: --raised-1 a --raised-5, --inset-1 a --inset-5
  - Regla critica: NUNCA anidar mismo nivel
- **Archivos clave**:
  - `/src/pages/styles/StoneMarbleShowcase.tsx`
  - `/src/components/atoms/sentinel/InsetContainer/`

**[2026-01-16] Sidebar v5.0 - Full Neumorphic Redesign**
- **Decision**: Rediseno completo del Sidebar
- **Arquitectura visual**:
  - Container: Superficie elevada (RAISED)
  - Secciones: Areas cavadas (INSET)
  - Items: Glassmorphism (GLASS)
- **API simplificada**:
  - Removido: `sidebarStyle`, `userIcon`, `showIconRail`, `showExpandedPanel`
  - Agregado: `collapsed`, `onUserClick`
- **Dimensiones**: 280px expanded, 80px collapsed

**[2026-01-16] Typography Migration - New Font Stack**
- **Decision**: Migrar sistema tipografico completo
- **Nuevas fuentes**:
  - IBM Plex Sans: UI primaria
  - Libre Baskerville: Display/headlines
  - IBM Plex Mono: Datos financieros

**[2025-01-15] Light Engine - Sistema de Iluminacion Dinamica**
- **Decision**: Motor de iluminacion basado en Josh W. Comeau
- **Archivos**: `src/contexts/LightEngineContext.tsx`

**[2025-01-14] Migracion de Nivo a ECharts**
- **Decision**: Reemplazar Nivo por ECharts
- **Razon**: Mejor rendimiento, mas tipos de graficos
