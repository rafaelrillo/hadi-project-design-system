# SENTINEL Design System

## Descripcion del Proyecto

**SENTINEL** es una plataforma de analisis de inversiones y recomendaciones del mercado de valores. El design system utiliza **Glass-Neumorphism**: una combinacion de superficies neumorficas claras con elementos de cristal (glassmorphism) flotando sobre ellas.

**Branch actual**: `redesign/stock-market-ui`

### Proposito de la App

1. **Dashboard Principal**: Vista general del portfolio vs benchmarks (S&P 500, NASDAQ, Gold, Bonds)
2. **Portfolio View**: Gestion de holdings con tabla y TreeMap de allocations
3. **Portfolio Simulator**: Herramienta what-if de 5 pasos para crear portfolios hipoteticos
4. **Recommendations (Calibrate)**: Señales de compra/venta generadas por IA con analisis
5. **News View**: Feed de noticias del mercado con analisis de sentimiento
6. **Component Showcase**: Documentacion viva del design system en `/showcase`

---

## Stack Tecnologico

| Categoria | Tecnologia | Version | Notas |
|-----------|------------|---------|-------|
| Framework | React | 19 | Con Suspense y lazy loading |
| Lenguaje | TypeScript | Strict mode | |
| Build | Vite | | Path aliases configurados |
| State | Zustand | | 6 stores: auth, market, portfolio, wallet, news, recommendations |
| Charts | **ECharts** | 5.6.0 | 24 tipos de gráficos + tema SENTINEL |
| Animaciones | Framer Motion | | Transiciones suaves |
| Iconos | Lucide React | | |
| Routing | React Router DOM | v6 | Lazy loading por ruta |
| Testing | Jest + Cypress | | Unit + E2E |
| Estilos | CSS Modules | | Variables en theme.css |

---

## Sistema de Diseño - Glass-Neumorphism

### Filosofia de Diseño

El design system combina dos estilos visuales complementarios:

1. **Neumorphism (Base/Container)**: Superficies que parecen "extruidas" del fondo con sombras suaves
2. **Glassmorphism (Items/Elements)**: Elementos de cristal semitransparente flotando sobre la superficie

### Paleta de Colores - Light Neumorphism

```css
/* ═══════════════════════════════════════════════════════════════════════════
   NEUMORPHISM BASE - Superficie clara extruida
   ═══════════════════════════════════════════════════════════════════════════ */

--neu-base: #e0e5ec;              /* Fondo principal neumórfico */
--neu-shadow-dark: #a3b1c6;       /* Sombra oscura (abajo-derecha) */
--neu-shadow-light: #ffffff;      /* Sombra clara (arriba-izquierda) */

/* ═══════════════════════════════════════════════════════════════════════════
   GLASSMORPHISM - Elementos de cristal
   ═══════════════════════════════════════════════════════════════════════════ */

--glass-bg: rgba(255, 255, 255, 0.25);           /* Fondo cristal base */
--glass-bg-hover: rgba(255, 255, 255, 0.45);     /* Fondo cristal hover */
--glass-bg-active: rgba(255, 255, 255, 0.55);    /* Fondo cristal activo */
--glass-border: rgba(255, 255, 255, 0.6);        /* Borde cristal principal */
--glass-border-subtle: rgba(255, 255, 255, 0.3); /* Borde cristal sutil */

/* ═══════════════════════════════════════════════════════════════════════════
   TEXT COLORS - Sobre fondo claro
   ═══════════════════════════════════════════════════════════════════════════ */

--text-primary: #2d3748;      /* Texto principal oscuro */
--text-secondary: #5a6578;    /* Texto secundario */
--text-muted: #8896a6;        /* Texto deshabilitado/hints */

/* ═══════════════════════════════════════════════════════════════════════════
   ACCENT COLORS
   ═══════════════════════════════════════════════════════════════════════════ */

--sentinel-accent-primary: #4a9a9c;              /* Teal institucional */
--sentinel-accent-secondary: #5ba3a5;
--accent-glow: rgba(74, 154, 156, 0.4);          /* Glow para focus states */

/* ═══════════════════════════════════════════════════════════════════════════
   STATUS COLORS (Conservadores)
   ═══════════════════════════════════════════════════════════════════════════ */

--sentinel-status-positive: #4a9a7c;   /* Verde desaturado */
--sentinel-status-negative: #b85c5c;   /* Rojo tenue */
--sentinel-status-warning: #c4a35a;    /* Ambar suave */
--sentinel-status-info: #5a8fb8;       /* Azul neutral */
```

### Sombras Neumórficas

```css
/* Sombra elevada (elemento "flotando" sobre superficie) */
.neu-panel {
  box-shadow:
    8px 8px 20px var(--neu-shadow-dark),
    -8px -8px 20px var(--neu-shadow-light);
}

/* Sombra inset (elemento "hundido" en superficie) */
.neu-inset {
  box-shadow:
    inset 5px 5px 15px var(--neu-shadow-dark),
    inset -5px -5px 15px var(--neu-shadow-light);
}
```

### Estilos Glassmorphism

```css
/* Item de cristal básico */
.glass-item {
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
}

/* Item de cristal hover */
.glass-item:hover {
  background: var(--glass-bg-hover);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* Item de cristal activo */
.glass-item-active {
  background: var(--glass-bg-active);
  backdrop-filter: blur(12px);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}
```

### Border Radius Estandar

```css
--border-radius-sm: 8px;      /* Elementos pequeños */
--border-radius-md: 12px;     /* Items, inputs */
--border-radius-lg: 15px;     /* Cards, sections */
--border-radius-xl: 20px;     /* Containers, panels */
```

### Transiciones

```css
--transition-fast: 150ms ease;
--transition-normal: 200ms ease;
--transition-shadow: 50ms linear;  /* Para sombras dinámicas */
```

---

## Light Engine - Sombras Dinámicas

### LightEngineContext

Sistema de iluminación dinámica que calcula sombras basadas en un ángulo de luz global.

```tsx
// Importar el contexto
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// Envolver la app o sección
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

### Cálculo de Sombras

```tsx
// Fórmula para calcular offsets basados en ángulo de luz
const shadowOffsets = useMemo(() => {
  const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
  return {
    x: Math.cos(shadowAngle),
    y: Math.sin(shadowAngle)
  };
}, [lightAngle]);

// Función para generar sombra neumórfica elevada
const getNeuPanelShadow = (distance: number, blur: number): string => {
  const { x, y } = shadowOffsets;
  return `${-x * distance}px ${-y * distance}px ${blur}px #ffffff, ${x * distance}px ${y * distance}px ${blur}px #a3b1c6`;
};

// Función para generar sombra neumórfica hundida
const getNeuInsetShadow = (distance: number, blur: number): string => {
  const { x, y } = shadowOffsets;
  return `inset ${x * distance}px ${y * distance}px ${blur}px #a3b1c6, inset ${-x * distance}px ${-y * distance}px ${blur}px #ffffff`;
};
```

### Patrón de Uso en Showcases

```tsx
function MyShowcaseContent() {
  const { lightAngle } = useLightEngine();

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const LIGHT = {
    base: '#e0e5ec',
    shadowDark: 'hsl(220 15% 72%)',
    shadowLight: 'hsl(0 0% 100%)',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}`;
  };

  // Estilos con sombras dinámicas
  const panelStyles: React.CSSProperties = {
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  return <div style={panelStyles}>Content</div>;
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

### Sidebar (Expanded Style)

Combina icon rail oscuro + panel neumórfico con items de cristal.

```tsx
import { Sidebar } from '@organisms/Sidebar';
import type { SidebarSection } from '@organisms/Sidebar';

// Secciones con items agrupados
const sections: SidebarSection[] = [
  {
    title: 'Projects',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', isActive: true, badge: 3 },
      { icon: Library, label: 'Library' },
    ],
  },
  {
    title: 'Status',
    items: [
      { icon: CircleDot, label: 'New', badge: 5 },
    ],
  },
];

// Usuario
const user = {
  name: 'John Doe',
  email: 'john@example.com',
  avatarUrl: '/avatar.jpg',
};

<Sidebar
  productLogo={<Logo />}
  menuItems={railItems}          // Items para icon rail
  sections={sections}            // Grupos para panel expandido
  user={user}                    // Perfil de usuario
  sidebarStyle="expanded"        // Nuevo estilo Glass-Neu
  showIconRail={true}            // Mostrar barra de iconos
  showExpandedPanel={true}       // Mostrar panel expandido
  onSearch={(v) => console.log(v)}
  position="relative"
/>
```

### Estilos de Sidebar

| Style | Descripción |
|-------|-------------|
| `expanded` | **Nuevo**: Icon rail + panel neumórfico con items glass |
| `dark` | Legacy: Sidebar oscuro |
| `neuPanel` | Legacy: Sidebar neumórfico claro |

---

## Estructura del Proyecto

```
src/
├── contexts/
│   └── LightEngineContext.tsx   # Sistema de iluminación dinámica
├── hooks/
│   └── useDynamicShadows.ts     # Hook para sombras dinámicas
├── components/
│   ├── atoms/              # Componentes base
│   ├── molecules/          # Componentes compuestos
│   ├── organisms/          # Secciones completas
│   │   └── Sidebar/        # Sidebar con Glass-Neumorphism
│   ├── charts/             # 24+ componentes ECharts
│   └── animations/         # Componentes de animación
├── pages/
│   └── [showcases]         # Documentación viva del design system
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

### CSS Modules + Variables Dinámicas
```tsx
import styles from './Component.module.css';

// CSS estático en .module.css
// Valores dinámicos (sombras) en style prop
<div
  className={styles.container}
  style={{ boxShadow: getNeuPanelShadow(8, 20) }}
>
```

---

## Gráficos (ECharts)

### 24 Tipos de Gráficos

| Categoría | Gráficos |
|-----------|----------|
| **Financieros** | CandlestickChart, LineChart, BarChart |
| **Circulares** | PieChart, GaugeChart, SunburstChart |
| **Comparación** | RadarChart, ParallelChart, BoxplotChart |
| **Distribución** | TreeMap, HeatMap, CalendarChart |
| **Flujo** | SankeyChart, FunnelChart, ThemeRiverChart |
| **Relaciones** | GraphChart, ScatterChart, EffectScatterChart |
| **Jerarquía** | TreeChart, TreeMap, SunburstChart |
| **Especiales** | PictorialBarChart |

### Tema SENTINEL

Definido en `src/components/charts/echarts/sentinelTheme.ts`:
- Paleta de 8 colores para series
- Tooltip con estilo Glass-Neumorphism
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
/showcase/styles/colors         → Paleta de colores
/showcase/styles/typography     → Sistema tipográfico
/showcase/styles/spacing        → Espaciado
/showcase/styles/shadows        → Sombras y elevaciones
/showcase/styles/icons          → Iconografía
/showcase/atoms/*               → Componentes atómicos
/showcase/molecules/*           → Componentes moleculares
/showcase/organisms/*           → Organismos (Sidebar, Modal, etc.)
/showcase/charts/*              → Gráficos ECharts
/showcase/animations/*          → Animaciones
/showcase/sentinel/*            → Componentes SENTINEL
```

---

## Reglas para Claude

### DO (Hacer)

1. **Usar Glass-Neumorphism**: Contenedores neumórficos + items de cristal
2. **Usar LightEngineContext**: Para sombras dinámicas
3. **Seguir el patrón de showcases**: Con `LightEngineProvider` wrapper
4. **Usar las variables CSS**: `--neu-base`, `--glass-bg`, etc.
5. **Border radius**: 15px para containers, 12px para items
6. **Transiciones suaves**: `50ms linear` para sombras

### DON'T (No hacer)

1. **No usar colores oscuros para fondos**: El tema es claro (#e0e5ec)
2. **No hardcodear sombras**: Usar funciones dinámicas
3. **No olvidar backdrop-filter**: Es clave para el efecto glass
4. **No usar border-radius inconsistentes**: Seguir el sistema

---

## TAREAS COMPLETADAS

- [x] Migración de Nivo a ECharts ✅
- [x] Implementar Light Engine con sombras dinámicas ✅
- [x] **Rediseño Glass-Neumorphism completo** ✅
  - [x] Actualizar todos los showcases (Styles, Atoms, Molecules, Organisms, Animations, Charts, Sentinel)
  - [x] Crear LightEngineContext
  - [x] Implementar nuevo Sidebar con Glass-Neumorphism
  - [x] Documentar el nuevo design system
- [x] **Migración tipográfica completa** ✅
  - [x] Inter → IBM Plex Sans (UI Primary)
  - [x] Space Grotesk → Libre Baskerville (Display/Headlines)
  - [x] Space Mono → IBM Plex Mono (Data/Numbers)
  - [x] DotMatrix eliminado completamente
- [x] **Rediseño completo del Sidebar v5.0** ✅
  - [x] Container neumórfico elevado (flota sobre la página)
  - [x] Secciones con cavados/inset shadows
  - [x] Items con glassmorphism
  - [x] Search input con inset
  - [x] User profile como glass card
  - [x] Modo colapsado (solo iconos)
  - [x] Dynamic shadows via Light Engine

---

## DECISIONES TOMADAS

**[2026-01-16] Sidebar v5.0 - Full Neumorphic Redesign**
- **Decisión**: Rediseño completo del Sidebar siguiendo Glass-Neumorphism
- **Arquitectura visual**:
  - **Container**: Superficie neumórfica elevada (#e0e5ec, shadow 10px 10px 30px)
  - **Secciones**: Áreas cavadas con inset shadows (agrupa items relacionados)
  - **Items**: Glassmorphism (hover/active states con backdrop-blur)
  - **Search**: Input con efecto inset (cavado en la superficie)
  - **User profile**: Glass card flotante
- **API simplificada**:
  - Removido: `sidebarStyle`, `userIcon`, `showIconRail`, `showExpandedPanel`
  - Agregado: `collapsed` (modo solo iconos), `onUserClick`
- **Dimensiones**: 280px expanded, 80px collapsed, 24px border-radius

**[2026-01-16] Typography Migration - New Font Stack**
- **Decisión**: Migrar sistema tipográfico completo
- **Nuevas fuentes**:
  - **IBM Plex Sans**: UI primaria (claridad profesional)
  - **Libre Baskerville**: Display/headlines h1-h3 (elegancia serif)
  - **IBM Plex Mono**: Datos financieros (precisión numérica)
- **Fuentes eliminadas**: Inter, Space Grotesk, Space Mono, DotMatrix
- **Consideraciones técnicas**:
  - Libre Baskerville: font-weight 700 para headings, `font-variant-numeric: lining-nums`
  - IBM Plex Mono: `font-variant-numeric: tabular-nums lining-nums` para alineación
  - Google Fonts CDN para todas las fuentes

**[2025-01-16] Glass-Neumorphism Design System**
- **Decisión**: Implementar design system combinando Neumorphism + Glassmorphism
- **Filosofía**:
  - Fondos claros neumórficos (#e0e5ec) como "superficie"
  - Elementos de cristal (glass) flotando sobre la superficie
  - Sombras dinámicas basadas en ángulo de luz global
- **Componentes actualizados**: 110+ archivos
- **Patrón clave**:
  ```
  Container: Neumorphism (elevado o hundido)
  Items: Glassmorphism (transparente con blur)
  ```
- **Sidebar nuevo**:
  - Icon Rail: Barra oscura vertical con iconos
  - Expanded Panel: Panel neumórfico con items de cristal
  - User Profile: Sección con efecto glass
  - Search: Input con efecto glass

**[2025-01-15] Light Engine - Sistema de Iluminación Dinámica**
- **Decisión**: Implementar motor de iluminación basado en Josh W. Comeau
- **Archivos**: `src/contexts/LightEngineContext.tsx`
- **Características**:
  - Una sola fuente de luz global
  - Sombras calculadas con trigonometría
  - Transiciones suaves (50ms)

**[2025-01-14] Migración de Nivo a ECharts**
- **Decisión**: Reemplazar Nivo por ECharts
- **Razón**: Mejor rendimiento, más tipos de gráficos, mejor control de tema
