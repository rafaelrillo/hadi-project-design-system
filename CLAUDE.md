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

### Colores de Marca

```css
/* Logo Colors - Dark Variant */
--fing-logo-slate-1: #3a3a42;
--fing-logo-slate-2: #44444c;

/* Logo Colors - Stone Variant */
--fing-logo-marble-1: #eceef2;
--fing-logo-marble-2: #f0f2f5;

/* Logo Colors - Light Variant */
--fing-logo-light-1: #e8e8ec;
--fing-logo-light-2: #ededf0;

/* Brand Accent */
--fing-teal: #4A9A9C;
--fing-teal-light: #6fb3b5;
--fing-teal-dark: #3a7a7c;

/* Semantic Colors (Conservadores - voz "Senior Analyst") */
--fing-positive: #4a9a7c;    /* Verde desaturado */
--fing-negative: #c98a8a;    /* Coral suave */
--fing-warning: #c9a87a;     /* Ambar conservador */

/* Text Colors */
--fing-text-light: #f0f0f2;
--fing-text-muted: #8a8f96;
--fing-text-dark: #1a1a1e;
```

### Tipografia de Marca

| Fuente | Uso | Variable |
|--------|-----|----------|
| **DM Sans** | UI general, titulos, cuerpo | `--sentinel-font-primary` |
| **IBM Plex Mono** | Datos financieros, tickers | `--sentinel-font-mono` |
| **Libre Baskerville** | Display, headlines elegantes | `--sentinel-font-display` |

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

---

## DECISIONES TOMADAS

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
