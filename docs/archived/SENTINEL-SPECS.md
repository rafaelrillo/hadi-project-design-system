# SENTINEL Design System - Especificaciones Tecnicas v1.0

## Indice

1. [Inventario de Componentes](#1-inventario-de-componentes)
2. [Design Tokens Completos](#2-design-tokens-completos)
3. [Mapeo Componentes -> Funcionalidades](#3-mapeo-componentes--funcionalidades)
4. [Capacidades de Charts](#4-capacidades-de-charts)
5. [Patrones de Composicion](#5-patrones-de-composicion)
6. [Servicios, Hooks y Stores](#6-servicios-hooks-y-stores)
7. [Gaps Identificados](#7-gaps-identificados)

---

## 1. INVENTARIO DE COMPONENTES

### 1.1 ATOMS (Componentes Atomicos)

#### Atoms Base

| Componente | Ubicacion | Props | Variantes | Uso Sugerido |
|------------|-----------|-------|-----------|--------------|
| **Button** | `atoms/Button/` | `children`, `variant`, `onClick`, `disabled`, `type`, `icon`, `ariaLabel`, `className` | `primary`, `secondary`, `destructive`, `with-icon` | CTAs, acciones de trading, confirmaciones |
| **Badge** | `atoms/Badge/` | `children`, `variant`, `ariaLabel` | `success`, `error`, `warning`, `info`, `neutral` | Estados de ordenes, indicadores de cambio, tags de sector |
| **Typography** | `atoms/Typography/` | `variant`, `children`, `className`, `as` | Escala tipografica completa | Titulos, labels, valores financieros |
| **Icon** | `atoms/Icon/` | `name`, `size`, `color`, `className` | Multiples tamanios | Iconografia de UI |
| **Checkbox** | `atoms/Checkbox/` | `checked`, `onChange`, `label`, `disabled` | checked/unchecked | Seleccion de stocks, filtros |
| **Tooltip** | `atoms/Tooltip/` | `content`, `children`, `position` | Posiciones multiples | Ayuda contextual, explicaciones |
| **Skeleton** | `atoms/Skeleton/` | `width`, `height`, `variant` | `text`, `circular`, `rectangular` | Estados de carga |
| **LoadingScreen** | `atoms/LoadingScreen/` | `message` | - | Carga inicial de app |

#### Atoms Input

| Componente | Ubicacion | Props | Uso Sugerido |
|------------|-----------|-------|--------------|
| **InputText** | `atoms/Input/` | `value`, `onChange`, `placeholder`, `type`, `disabled`, `error` | Busqueda, montos de trading |
| **InputDropdown** | `atoms/Input/` | `options`, `value`, `onChange`, `placeholder` | Seleccion de timeframes, sectores |
| **Textarea** | `atoms/Input/` | `value`, `onChange`, `rows`, `placeholder` | Notas, consultas LLM |

#### Atoms Landing/Marketing

| Componente | Ubicacion | Props | Uso Sugerido |
|------------|-----------|-------|--------------|
| **ParallaxLayer** | `atoms/ParallaxLayer/` | `speed`, `children`, `className` | Efectos visuales en landing |
| **ScrollProgress** | `atoms/ScrollProgress/` | `color`, `height` | Indicador de scroll en landing |
| **StatCounter** | `atoms/StatCounter/` | `value`, `label`, `prefix`, `suffix`, `duration` | Metricas animadas en landing |

#### Atoms SENTINEL (Atmosfericos)

| Componente | Ubicacion | Props | Variantes | Uso Sugerido |
|------------|-----------|-------|-----------|--------------|
| **AtmosphericBackground** | `atoms/sentinel/AtmosphericBackground/` | `variant`, `animated`, `contained`, `children` | `default`, `subtle`, `intense` | **Fondo base del dashboard**, crea profundidad visual |
| **DepthLayer** | `atoms/sentinel/DepthLayer/` | `depth` (1-5), `children`, `className`, `as` | 5 niveles de profundidad | **Contenedores con jerarquia visual**, cards elevadas |
| **DataReveal** | `atoms/sentinel/DataReveal/` | `delay`, `duration`, `direction`, `threshold`, `once`, `children` | `up`, `down`, `left`, `right` | **Animacion de entrada de datos**, reveal progresivo |

---

### 1.2 MOLECULES (Componentes Compuestos)

#### Molecules Base

| Componente | Ubicacion | Props Principales | Uso Sugerido |
|------------|-----------|-------------------|--------------|
| **Card** | `molecules/Card/` | `title`, `children`, `footer`, `variant` | Contenedor generico |
| **MetricCard** | `molecules/MetricCard/` | `title`, `value`, `trend`, `sparkline`, `progress`, `distribution`, `format`, `size`, `status` | **KPIs financieros**, metricas de portfolio, rendimientos |
| **FormField** | `molecules/FormField/` | `label`, `error`, `children`, `required` | Formularios de trading |
| **MenuItem** | `molecules/MenuItem/` | `icon`, `label`, `active`, `onClick` | Navegacion sidebar |
| **NotificationCard** | `molecules/NotificationCard/` | `type`, `title`, `message`, `timestamp` | Alertas de mercado, confirmaciones |
| **SearchBar** | `molecules/SearchBar/` | `value`, `onChange`, `placeholder`, `onSearch` | Busqueda de stocks |
| **SearchbarItem** | `molecules/SearchbarItem/` | `symbol`, `name`, `price`, `change` | Resultados de busqueda |
| **SidebarItem** | `molecules/SidebarItem/` | `icon`, `label`, `active`, `collapsed` | Items de navegacion |
| **Pagination** | `molecules/Pagination/` | `currentPage`, `totalPages`, `onPageChange` | Tablas paginadas |
| **Tabs** | `molecules/Tabs/` | `tabs`, `activeTab`, `onChange` | Navegacion por secciones |
| **EmptyState** | `molecules/EmptyState/` | `icon`, `title`, `description`, `action` | Estados vacios |
| **DemoBanner** | `molecules/DemoBanner/` | `message`, `onDismiss` | Banner modo demo |

#### Molecules SENTINEL (Especificas de Inversion)

| Componente | Ubicacion | Props | Tipos | Uso Sugerido |
|------------|-----------|-------|-------|--------------|
| **TrendIndicator** | `molecules/sentinel/TrendIndicator/` | `label`, `value`, `trend`, `change`, `period`, `size` | `up`, `down`, `stable` | **Indicadores de tendencia**, cambios de precio |
| **FactorWeight** | `molecules/sentinel/FactorWeight/` | `factor`, `weight`, `impact` | - | Visualizar factores del modelo IA |
| **HistoricalAlignment** | `molecules/sentinel/HistoricalAlignment/` | `period`, `alignment`, `description` | - | Comparacion con periodos historicos |
| **CyclePosition** | `molecules/sentinel/CyclePosition/` | `phase`, `position`, `description` | - | Posicion en ciclo economico |
| **RecommendationCard** | `molecules/sentinel/RecommendationCard/` | `type`, `assetClass`, `title`, `rationale`, `confidence`, `timeframe`, `priority` | type: `buy`, `hold`, `sell`, `watch` / assetClass: `stocks`, `bonds`, `commodities`, `cash`, `crypto` | **Recomendaciones de IA**, tarjetas de accion |
| **StockSuggestion** | `molecules/sentinel/StockSuggestion/` | `symbol`, `name`, `action`, `currentPrice`, `targetPrice`, `confidence`, `sector`, `reasoning` | action: `buy`, `hold`, `sell` | **Sugerencias de stocks individuales** |
| **AllocationSummary** | `molecules/sentinel/AllocationSummary/` | `allocations[]`, `title`, `showChanges` | - | **Resumen de asignacion de activos** |
| **RiskProfileSelector** | `molecules/sentinel/RiskProfileSelector/` | `value`, `onChange`, `options` | - | Seleccion de perfil de riesgo |

---

### 1.3 ORGANISMS (Componentes Complejos)

#### Organisms Base

| Componente | Ubicacion | Props Principales | Uso Sugerido |
|------------|-----------|-------------------|--------------|
| **DataGrid** | `organisms/DataGrid/` | `data`, `columns`, `selectable`, `sortable`, `pagination`, `filterable`, `virtualized`, `exportable` | **Tablas de holdings**, transacciones, watchlist |
| **Table** | `organisms/Table/` | `data`, `columns`, `onRowClick` | Tablas simples |
| **PaginatedTable** | `organisms/PaginatedTable/` | `data`, `columns`, `pageSize` | Tablas con paginacion |
| **Form** | `organisms/Form/` | `onSubmit`, `children`, `validation` | Formularios de trading |
| **Modal** | `organisms/Modal/` | `isOpen`, `onClose`, `title`, `children` | Confirmaciones, detalles |
| **Sidebar** | `organisms/Sidebar/` | `items`, `collapsed`, `onToggle` | Navegacion principal |
| **Searchbar** | `organisms/Searchbar/` | `onSearch`, `results`, `onSelect` | Busqueda global |
| **Toast** | `organisms/Toast/` | Via `ToastContext` | Notificaciones transitorias |
| **ErrorBoundary** | `organisms/ErrorBoundary/` | `fallback`, `children` | Manejo de errores |

#### Organisms SENTINEL (Dashboard de Inversiones)

| Componente | Ubicacion | Props | Uso Sugerido |
|------------|-----------|-------|--------------|
| **MarketStateIndicator** | `organisms/sentinel/MarketStateIndicator/` | `state`, `label`, `description`, `lastUpdated`, `animated`, `size` | **Estado del mercado** (bullish/bearish/neutral/uncertain) - Hero visual del dashboard |
| **RiskGauge** | `organisms/sentinel/RiskGauge/` | `level`, `value`, `label`, `showScale`, `animated`, `size` | **Indicador de riesgo sistemico** - 5 niveles (low/moderate/elevated/high/severe) |
| **ConfidenceLevel** | `organisms/sentinel/ConfidenceLevel/` | `level`, `percentage`, `label`, `showPercentage`, `animated`, `size` | **Nivel de confianza del sistema** en sus predicciones |
| **SystemPulse** | `organisms/sentinel/SystemPulse/` | `status`, `label`, `showLabel`, `size` | **Estado operativo** del sistema (active/processing/idle/offline) |
| **PerformanceChart** | `organisms/sentinel/PerformanceChart/` | `data`, `height`, `showBenchmark` | Grafico de rendimiento del portfolio |
| **HistoricalDetailView** | `organisms/sentinel/HistoricalDetailView/` | `period`, `data`, `onPeriodChange` | Vista detallada de periodos historicos |
| **PeriodComparison** | `organisms/sentinel/PeriodComparison/` | `currentPeriod`, `comparisonPeriod`, `metrics` | Comparacion entre periodos |
| **ModelInsights** | `organisms/sentinel/ModelInsights/` | `factors`, `weights`, `lastUpdated` | Insights del modelo de IA |
| **CorrelationMatrix** | `organisms/sentinel/CorrelationMatrix/` | `assets`, `correlations` | Matriz de correlaciones entre activos |
| **BacktestResults** | `organisms/sentinel/BacktestResults/` | `results`, `period`, `benchmark` | Resultados de backtesting |

---

### 1.4 CHARTS (Visualizaciones Nivo)

| Chart | Ubicacion | Props Principales | Metrica Financiera |
|-------|-----------|-------------------|-------------------|
| **FinancialLineChart** | `charts/FinancialLineChart/` | `data`, `height`, `enableArea`, `markers`, `formatValue` | **Precios historicos**, rendimiento de portfolio, NAV |
| **LineChart** | `charts/LineChart/` | `data`, `height`, `curve`, `enablePoints` | Series temporales genericas |
| **RadarChart** | `charts/RadarChart/` | `data`, `keys`, `indexBy`, `fillOpacity` | **Perfil de riesgo**, diversificacion por factor |
| **TreeMap** | `charts/TreeMap/` | `data`, `tile`, `enableLabels` | **Composicion de portfolio** por sector/activo |
| **HeatMap** | `charts/HeatMap/` | `data`, `colorScheme`, `enableLabels` | **Correlaciones**, rendimiento por periodo/sector |
| **SankeyDiagram** | `charts/SankeyDiagram/` | `data` (nodes, links), `layout` | **Flujos de capital**, origen/destino de inversiones |
| **RadialBar** | `charts/RadialBar/` | `data`, `innerRadius` | Progreso de objetivos, allocaciones |
| **ScatterPlot** | `charts/ScatterPlot/` | `data`, `xScale`, `yScale` | **Riesgo vs Retorno**, analisis de activos |
| **BumpChart** | `charts/BumpChart/` | `data`, `interpolation` | **Rankings temporales** de activos |
| **StreamChart** | `charts/StreamChart/` | `data`, `keys`, `offsetType` | Evolucion de composicion en el tiempo |
| **CalendarHeatmap** | `charts/CalendarHeatmap/` | `data`, `from`, `to` | **Rendimiento diario**, patrones estacionales |
| **BulletChart** | `charts/BulletChart/` | `data`, `ranges`, `markers` | KPIs con objetivos, metas de inversion |
| **NetworkGraph** | `charts/NetworkGraph/` | `data` (nodes, links) | Relaciones entre activos/sectores |
| **ChordDiagram** | `charts/ChordDiagram/` | `data`, `keys` | Flujos entre categorias |
| **StatCard** | `charts/StatCard/` | `title`, `value`, `change`, `icon` | Metricas puntuales con contexto |

---

### 1.5 ANIMATIONS

| Componente | Ubicacion | Props | Uso |
|------------|-----------|-------|-----|
| **FadeIn** | `animations/FadeIn/` | `delay`, `duration`, `children` | Entrada suave |
| **ScrollReveal** | `animations/ScrollReveal/` | `threshold`, `children` | Reveal al scroll |
| **StaggerList** | `animations/StaggerList/` | `staggerDelay`, `children` | Listas animadas |
| **MotionCard** | `animations/MotionCard/` | `whileHover`, `children` | Cards interactivas |
| **Parallax** | `animations/Parallax/` | `speed`, `children` | Efecto parallax |
| **LayoutTransition** | `animations/LayoutTransition/` | `layoutId`, `children` | Transiciones de layout |
| **DraggablePanel** | `animations/DraggablePanel/` | `constraints`, `children` | Paneles arrastrables |

---

## 2. DESIGN TOKENS COMPLETOS

### 2.1 Colores

#### Superficies y Fondos
```css
--sentinel-bg-void: #05060a           /* Fondo mas profundo */
--sentinel-bg-base: #0a0b10           /* Fondo principal app */
--sentinel-bg-elevated: #10121a       /* Cards, paneles */
--sentinel-bg-overlay: #161822        /* Modales, overlays */
--sentinel-bg-subtle: #1c1e2a         /* Hover states */
--sentinel-bg-interactive: #22253a    /* Elementos interactivos */
--sentinel-bg-glass: rgba(10,11,16,0.85)   /* Vidrio */
--sentinel-bg-scrim: rgba(5,6,10,0.7)      /* Scrim */
```

#### Texto
```css
--sentinel-text-primary: #e8eaed      /* Texto principal */
--sentinel-text-secondary: #9aa0a6    /* Labels, secundario */
--sentinel-text-tertiary: #5f6368     /* Hints, placeholders */
--sentinel-text-disabled: #3c4043     /* Deshabilitado */
--sentinel-text-inverse: #0a0b10      /* Sobre fondos de acento */
--sentinel-text-link: #7ecbcc         /* Links */
```

#### Bordes
```css
--sentinel-border-subtle: rgba(255,255,255,0.06)
--sentinel-border-default: rgba(255,255,255,0.1)
--sentinel-border-strong: rgba(255,255,255,0.16)
--sentinel-border-focus: #5ba3a5
```

#### Acento (Teal Institucional)
```css
--sentinel-accent-primary: #5ba3a5    /* Acento principal */
--sentinel-accent-secondary: #4a8a8c  /* Hover/pressed */
--sentinel-accent-tertiary: #3a7072   /* Terciario */
--sentinel-accent-subtle: rgba(91,163,165,0.15)
--sentinel-accent-glow: rgba(91,163,165,0.3)
--sentinel-accent-muted: rgba(91,163,165,0.6)
```

#### Estados Semanticos
```css
/* Positivo/Ganancia */
--sentinel-status-positive: #4a9a7c
--sentinel-status-positive-subtle: rgba(74,154,124,0.15)
--sentinel-status-positive-text: #6bb89a

/* Negativo/Perdida */
--sentinel-status-negative: #b85c5c
--sentinel-status-negative-subtle: rgba(184,92,92,0.15)
--sentinel-status-negative-text: #d17878

/* Advertencia */
--sentinel-status-warning: #c4a35a
--sentinel-status-warning-subtle: rgba(196,163,90,0.15)
--sentinel-status-warning-text: #d9bc78

/* Informativo */
--sentinel-status-info: #5a8fb8
--sentinel-status-info-subtle: rgba(90,143,184,0.15)
--sentinel-status-info-text: #78a8cc

/* Neutral */
--sentinel-status-neutral: #6b7280
```

#### Niveles de Riesgo
```css
--sentinel-risk-low: #4a9a7c          /* Verde teal */
--sentinel-risk-moderate: #5ba3a5     /* Cyan (acento) */
--sentinel-risk-elevated: #c4a35a     /* Ambar */
--sentinel-risk-high: #c47a5a         /* Terracota */
--sentinel-risk-severe: #b85c5c       /* Coral */

/* Fondos sutiles por nivel */
--sentinel-risk-low-bg: rgba(74,154,124,0.1)
--sentinel-risk-moderate-bg: rgba(91,163,165,0.1)
--sentinel-risk-elevated-bg: rgba(196,163,90,0.1)
--sentinel-risk-high-bg: rgba(196,122,90,0.1)
--sentinel-risk-severe-bg: rgba(184,92,92,0.1)
```

#### Confianza del Sistema
```css
--sentinel-confidence-high: #5ba3a5
--sentinel-confidence-medium: #7a8a8c
--sentinel-confidence-low: #5f6368
```

#### Estados del Mercado
```css
--sentinel-market-bull: #4a9a7c       /* Alcista */
--sentinel-market-bear: #b85c5c       /* Bajista */
--sentinel-market-neutral: #5ba3a5    /* Neutral */
--sentinel-market-uncertain: #6b7280  /* Incertidumbre */
```

#### Paleta de Charts (8 colores)
```css
--sentinel-chart-1: #5ba3a5   /* Teal (acento) */
--sentinel-chart-2: #7ecbcc   /* Teal claro */
--sentinel-chart-3: #4a9a7c   /* Verde */
--sentinel-chart-4: #5a8fb8   /* Azul */
--sentinel-chart-5: #8b7ec7   /* Purpura */
--sentinel-chart-6: #c4a35a   /* Ambar */
--sentinel-chart-7: #c47a5a   /* Terracota */
--sentinel-chart-8: #b85c5c   /* Coral */

--sentinel-chart-grid: rgba(255,255,255,0.06)
--sentinel-chart-axis: #5f6368
--sentinel-chart-tooltip-bg: #1c1e2a
--sentinel-chart-crosshair: rgba(91,163,165,0.5)
```

### 2.2 Tipografia

#### Familias
```css
--sentinel-font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif
--sentinel-font-display: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif
--sentinel-font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace
```

#### Escala de Tamanios
```css
--sentinel-text-xs: 0.75rem    /* 12px */
--sentinel-text-sm: 0.875rem   /* 14px */
--sentinel-text-base: 1rem     /* 16px */
--sentinel-text-lg: 1.125rem   /* 18px */
--sentinel-text-xl: 1.25rem    /* 20px */
--sentinel-text-2xl: 1.5rem    /* 24px */
--sentinel-text-3xl: 1.875rem  /* 30px */
--sentinel-text-4xl: 2.25rem   /* 36px */
--sentinel-text-5xl: 3rem      /* 48px */
--sentinel-text-6xl: 3.75rem   /* 60px */
```

#### Pesos
```css
--sentinel-font-light: 300
--sentinel-font-regular: 400
--sentinel-font-medium: 500
--sentinel-font-semibold: 600
--sentinel-font-bold: 700
```

#### Line Heights
```css
--sentinel-leading-none: 1
--sentinel-leading-tight: 1.25
--sentinel-leading-snug: 1.375
--sentinel-leading-normal: 1.5
--sentinel-leading-relaxed: 1.625
--sentinel-leading-loose: 2
```

#### Letter Spacing
```css
--sentinel-tracking-tighter: -0.05em
--sentinel-tracking-tight: -0.025em
--sentinel-tracking-normal: 0
--sentinel-tracking-wide: 0.025em
--sentinel-tracking-wider: 0.05em
--sentinel-tracking-widest: 0.1em
```

### 2.3 Espaciado

```css
--sentinel-space-0: 0
--sentinel-space-px: 1px
--sentinel-space-0-5: 0.125rem   /* 2px */
--sentinel-space-1: 0.25rem      /* 4px */
--sentinel-space-2: 0.5rem       /* 8px */
--sentinel-space-3: 0.75rem      /* 12px */
--sentinel-space-4: 1rem         /* 16px */
--sentinel-space-5: 1.25rem      /* 20px */
--sentinel-space-6: 1.5rem       /* 24px */
--sentinel-space-8: 2rem         /* 32px */
--sentinel-space-10: 2.5rem      /* 40px */
--sentinel-space-12: 3rem        /* 48px */
--sentinel-space-16: 4rem        /* 64px */
--sentinel-space-20: 5rem        /* 80px */
--sentinel-space-24: 6rem        /* 96px */

/* Semantico */
--sentinel-space-component: var(--sentinel-space-4)
--sentinel-space-card: var(--sentinel-space-6)
--sentinel-space-section: var(--sentinel-space-10)
--sentinel-space-page: var(--sentinel-space-8)
```

### 2.4 Bordes y Radios

```css
--sentinel-radius-none: 0
--sentinel-radius-sm: 4px
--sentinel-radius-md: 6px
--sentinel-radius-lg: 8px
--sentinel-radius-xl: 12px
--sentinel-radius-2xl: 16px
--sentinel-radius-3xl: 24px
--sentinel-radius-full: 9999px
```

### 2.5 Sombras

```css
--sentinel-shadow-xs: 0 1px 2px 0 rgba(0,0,0,0.3)
--sentinel-shadow-sm: 0 1px 3px 0 rgba(0,0,0,0.4)
--sentinel-shadow-md: 0 4px 6px -1px rgba(0,0,0,0.4)
--sentinel-shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.4)
--sentinel-shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.4)
--sentinel-shadow-2xl: 0 25px 50px -12px rgba(0,0,0,0.5)
--sentinel-shadow-inner: inset 0 2px 4px 0 rgba(0,0,0,0.3)

/* Glow */
--sentinel-shadow-glow-sm: 0 0 10px var(--sentinel-accent-glow)
--sentinel-shadow-glow-md: 0 0 20px var(--sentinel-accent-glow)
--sentinel-shadow-glow-lg: 0 0 30px var(--sentinel-accent-glow)

/* Componentes */
--sentinel-shadow-card: 0 4px 20px rgba(0,0,0,0.3)
--sentinel-shadow-modal: 0 25px 50px -12px rgba(0,0,0,0.6)
--sentinel-shadow-dropdown: 0 10px 40px rgba(0,0,0,0.5)
```

### 2.6 Transiciones y Animaciones

#### Duraciones
```css
--sentinel-duration-instant: 100ms
--sentinel-duration-fast: 200ms
--sentinel-duration-normal: 400ms
--sentinel-duration-slow: 700ms
--sentinel-duration-slower: 1000ms
--sentinel-duration-slowest: 2000ms    /* Fondos */
--sentinel-duration-glacial: 4000ms    /* Gradientes */
--sentinel-duration-ambient: 8000ms    /* Atmosferico */
```

#### Easings
```css
--sentinel-ease-default: cubic-bezier(0.4, 0, 0.2, 1)
--sentinel-ease-in: cubic-bezier(0.4, 0, 1, 1)
--sentinel-ease-out: cubic-bezier(0, 0, 0.2, 1)
--sentinel-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--sentinel-ease-smooth: cubic-bezier(0.45, 0, 0.15, 1)
--sentinel-ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)
--sentinel-ease-spring: cubic-bezier(0.155, 1.105, 0.295, 1.12)
```

#### Keyframes Disponibles
```css
@keyframes sentinel-breathe       /* Respiracion sutil */
@keyframes sentinel-pulse-subtle  /* Pulso elementos activos */
@keyframes sentinel-system-pulse  /* Indicador sistema */
@keyframes sentinel-gradient-shift /* Gradiente lento */
@keyframes sentinel-emerge        /* Fade in desde abajo */
@keyframes sentinel-fade-in       /* Fade in simple */
@keyframes sentinel-scale-in      /* Fade con escala */
@keyframes sentinel-glow-pulse    /* Glow pulsante */
@keyframes sentinel-shimmer       /* Loading shimmer */
@keyframes sentinel-rotate-slow   /* Rotacion lenta */
@keyframes sentinel-blink         /* Blink sutil */
@keyframes sentinel-float         /* Float sutil */
```

### 2.7 Z-Index

```css
--sentinel-z-behind: -1
--sentinel-z-base: 0
--sentinel-z-elevated: 10
--sentinel-z-dropdown: 50
--sentinel-z-sticky: 100
--sentinel-z-overlay: 200
--sentinel-z-modal: 300
--sentinel-z-popover: 400
--sentinel-z-tooltip: 500
--sentinel-z-notification: 600
--sentinel-z-max: 9999
```

### 2.8 Componentes Especificos

```css
/* Input/Button heights */
--sentinel-input-height-sm: 32px
--sentinel-input-height-md: 40px
--sentinel-input-height-lg: 48px

/* Sidebar */
--sentinel-sidebar-width: 64px
--sentinel-sidebar-width-expanded: 240px

/* Searchbar */
--sentinel-searchbar-height: 40px

/* Grid */
--sentinel-grid-columns: 12
--sentinel-grid-gap: var(--sentinel-space-6)

/* Icons */
--sentinel-icon-xs: 12px
--sentinel-icon-sm: 16px
--sentinel-icon-md: 20px
--sentinel-icon-lg: 24px
--sentinel-icon-xl: 32px
--sentinel-icon-2xl: 40px
```

---

## 3. MAPEO COMPONENTES -> FUNCIONALIDADES

### 3.1 FEATURE BASICO (Tablero de Visualizacion)

| Funcionalidad | Componentes Sugeridos |
|---------------|----------------------|
| **Vista general portfolio** | `AtmosphericBackground` + `DepthLayer` + `MetricCard` (total value, P&L, day change) |
| **Tabla de holdings** | `DataGrid` con columnas: symbol, shares, price, value, change, allocation |
| **Grafico de rendimiento** | `FinancialLineChart` con area habilitada |
| **Distribucion por sector** | `TreeMap` o `RadialBar` |
| **Noticias de mercado** | `Card` + lista con `NotificationCard` |
| **Estado del sistema** | `SystemPulse` en header |

### 3.2 SELECTOR DE PORTFOLIO (IA Recomienda Stocks)

| Funcionalidad | Componentes Sugeridos |
|---------------|----------------------|
| **Estado del mercado** | `MarketStateIndicator` (hero visual) |
| **Nivel de riesgo** | `RiskGauge` con escala de 5 niveles |
| **Confianza del modelo** | `ConfidenceLevel` con porcentaje |
| **Recomendaciones de IA** | `RecommendationCard` (multiples) |
| **Stocks sugeridos** | `StockSuggestion` con accion y target |
| **Allocation propuesta** | `AllocationSummary` |
| **Factores del modelo** | `ModelInsights` + `FactorWeight` |
| **Posicion en ciclo** | `CyclePosition` |
| **Comparacion historica** | `HistoricalAlignment` + `PeriodComparison` |
| **Consultas LLM** | `Textarea` + `Card` para respuestas |
| **Noticias relevantes** | Lista de `NotificationCard` tipo info |
| **Informes B2B** | `Modal` con `FinancialLineChart` + `DataGrid` |

### 3.3 WALLET (Compra/Venta de Stocks)

| Funcionalidad | Componentes Sugeridos |
|---------------|----------------------|
| **Formulario de orden** | `Form` + `InputText` (cantidad) + `InputDropdown` (tipo orden) + `Button` |
| **Precio actual** | `TrendIndicator` con cambio |
| **Holdings actuales** | `DataGrid` selectable para elegir posicion |
| **Historial transacciones** | `PaginatedTable` con `Badge` para status |
| **Confirmacion trade** | `Modal` con resumen |
| **Notificaciones** | `Toast` para confirmacion/error |
| **Resumen portfolio** | `MetricCard` con sparkline |
| **B2B: Multi-portfolio** | `Tabs` + `DataGrid` por portfolio |
| **B2B: Trading bots** | `Card` + `SystemPulse` para estado bot + `MetricCard` para performance |
| **B2B: Informe calibracion** | `Modal` + `FinancialLineChart` + `BacktestResults` |

### 3.4 FONDOS DE RENTABILIDAD SUSTENTADA (FCIs)

| Funcionalidad | Componentes Sugeridos |
|---------------|----------------------|
| **Lista de fondos** | `DataGrid` con columnas: nombre, tasa, riesgo, minimo, plazo |
| **Detalle de fondo** | `Card` + `RadarChart` (perfil riesgo) + `FinancialLineChart` (NAV historico) |
| **Nivel de riesgo fondo** | `RiskGauge` |
| **Cuotapartes propias** | `MetricCard` (valor actual, rendimiento) |
| **Suscripcion/Rescate** | `Form` + `InputText` + `Button` |
| **Comparador fondos** | `ScatterPlot` (riesgo vs retorno) |
| **B2B: FCIs personalizados** | `Form` complejo + `TreeMap` para composicion + `AllocationSummary` |

---

## 4. CAPACIDADES DE CHARTS

### 4.1 Charts por Caso de Uso Financiero

| Metrica Financiera | Chart Recomendado | Alternativa |
|-------------------|-------------------|-------------|
| Precio historico (1D-5Y) | `FinancialLineChart` | `LineChart` |
| Rendimiento portfolio | `FinancialLineChart` con benchmark | - |
| NAV de fondo | `FinancialLineChart` | - |
| Composicion portfolio | `TreeMap` | `RadialBar` |
| Correlacion activos | `HeatMap` | `CorrelationMatrix` (organism) |
| Riesgo vs Retorno | `ScatterPlot` | - |
| Flujos de capital | `SankeyDiagram` | `ChordDiagram` |
| Rankings temporales | `BumpChart` | - |
| Evolucion allocation | `StreamChart` | - |
| Rendimiento diario/anual | `CalendarHeatmap` | - |
| KPIs con objetivo | `BulletChart` | `MetricCard` con progress |
| Perfil de riesgo multi-factor | `RadarChart` | - |
| Relaciones entre sectores | `NetworkGraph` | `ChordDiagram` |

### 4.2 Configuracion del Theme de Charts

```typescript
import { sentinelChartTheme, sentinelChartColors } from 'components/charts/theme';

// Aplicar a cualquier chart Nivo:
<ResponsiveLine
  theme={sentinelChartTheme}
  colors={sentinelChartColors}
  ...
/>
```

### 4.3 Esquemas de Color Disponibles

```typescript
sentinelChartColors       // 8 colores para series
sentinelSequentialColors  // Escala de teal (light->dark)
sentinelDivergingColors   // Negativo->Neutral->Positivo
sentinelRiskColors        // 5 niveles de riesgo
sentinelMarketColors      // bull/bear/neutral/uncertain
```

---

## 5. PATRONES DE COMPOSICION

### 5.1 Jerarquia Visual SENTINEL

```
NUCLEO (Datos clave)
  |
  +-- CONTEXTO (Indicadores de estado)
        |
        +-- ACCION (Controles interactivos)
              |
              +-- PROFUNDIDAD (Detalles expandibles)
```

### 5.2 Uso de Capas Atmosfericas

```tsx
// Estructura base de cualquier vista del dashboard
<AtmosphericBackground variant="default" animated>
  <div className="dashboard-layout">

    {/* Capa 1: Hero indicators */}
    <DepthLayer depth={1}>
      <MarketStateIndicator state={marketState} />
      <RiskGauge level={riskLevel} />
      <ConfidenceLevel level={confidence} />
    </DepthLayer>

    {/* Capa 2: Contenido principal */}
    <DepthLayer depth={2}>
      <DataReveal direction="up" delay={100}>
        <MetricCard title="Portfolio Value" value={totalValue} />
      </DataReveal>
      <DataReveal direction="up" delay={200}>
        <FinancialLineChart data={performanceData} />
      </DataReveal>
    </DepthLayer>

    {/* Capa 3: Detalles y tablas */}
    <DepthLayer depth={3}>
      <DataReveal direction="up" delay={300}>
        <DataGrid data={holdings} columns={holdingColumns} />
      </DataReveal>
    </DepthLayer>

  </div>
</AtmosphericBackground>
```

### 5.3 Patron de Reveal Progresivo

```tsx
// Revelar datos en cascada segun scroll
<DataReveal direction="up" delay={0} duration={600}>
  <MetricCard title="Total Value" value="$125,430" />
</DataReveal>

<DataReveal direction="up" delay={150} duration={600}>
  <MetricCard title="Day Change" value="+$1,234" trend={{...}} />
</DataReveal>

<DataReveal direction="up" delay={300} duration={600}>
  <MetricCard title="YTD Return" value="+12.5%" />
</DataReveal>
```

### 5.4 Ejemplo Layout Dashboard Completo

```tsx
function SentinelDashboard() {
  return (
    <AtmosphericBackground variant="default">
      <div className={styles.layout}>

        {/* Header con estado del sistema */}
        <header className={styles.header}>
          <SystemPulse status="active" />
          <Searchbar onSearch={handleSearch} />
        </header>

        {/* Sidebar */}
        <Sidebar items={navItems} />

        {/* Main content */}
        <main className={styles.main}>

          {/* Hero Section: Indicadores clave */}
          <section className={styles.heroSection}>
            <DepthLayer depth={1}>
              <div className={styles.heroGrid}>
                <MarketStateIndicator
                  state={indicators.state}
                  description={indicators.stateDescription}
                />
                <RiskGauge
                  level={indicators.riskLevel}
                  value={indicators.riskValue}
                />
                <ConfidenceLevel
                  level={indicators.confidenceLevel}
                  percentage={indicators.confidencePercent}
                />
              </div>
            </DepthLayer>
          </section>

          {/* Portfolio Overview */}
          <section className={styles.portfolioSection}>
            <DepthLayer depth={2}>
              <div className={styles.metricsRow}>
                <DataReveal delay={100}>
                  <MetricCard
                    title="Portfolio Value"
                    value={summary.totalValue}
                    format="currency"
                    trend={summary.dayTrend}
                  />
                </DataReveal>
                <DataReveal delay={200}>
                  <MetricCard
                    title="Day P&L"
                    value={summary.dayPL}
                    format="currency"
                    status={summary.dayPL >= 0 ? 'success' : 'error'}
                  />
                </DataReveal>
              </div>

              <DataReveal delay={300}>
                <FinancialLineChart
                  data={performanceData}
                  height={300}
                  enableArea
                />
              </DataReveal>
            </DepthLayer>
          </section>

          {/* Holdings Grid */}
          <section className={styles.holdingsSection}>
            <DepthLayer depth={3}>
              <DataReveal delay={400}>
                <DataGrid
                  data={holdings}
                  columns={holdingColumns}
                  sortable
                  pagination
                />
              </DataReveal>
            </DepthLayer>
          </section>

          {/* AI Recommendations */}
          <section className={styles.recommendationsSection}>
            <DepthLayer depth={2}>
              <h2>Recomendaciones</h2>
              <div className={styles.recommendationsGrid}>
                {recommendations.map((rec, i) => (
                  <DataReveal key={rec.id} delay={500 + i * 100}>
                    <RecommendationCard {...rec} />
                  </DataReveal>
                ))}
              </div>
            </DepthLayer>
          </section>

        </main>

      </div>
    </AtmosphericBackground>
  );
}
```

---

## 6. SERVICIOS, HOOKS Y STORES

### 6.1 Stores (Zustand)

#### marketStore
```typescript
// src/store/marketStore.ts
interface MarketStoreState {
  stocks: Stock[];
  recommendations: Recommendation[];
  indicators: MarketIndicators;
  factors: Factor[];
  trends: TrendData[];
  historicalPeriods: HistoricalPeriod[];
  cycle: CycleData;
  sectorPerformance: SectorPerformance[];
  isLive: boolean;
  isLoading: boolean;
  error: string | null;
  dataSource: string;
}

// Acciones
fetchStocks(): Promise<void>
startLiveUpdates(): void
stopLiveUpdates(): void
updateIndicators(): void
refreshData(): Promise<void>

// Selectores
selectStockBySymbol(state, symbol)
selectTopGainers(state, limit)
selectTopLosers(state, limit)
selectHighPriorityRecommendations(state)
```

#### portfolioStore
```typescript
// src/store/portfolioStore.ts
interface PortfolioState {
  holdings: PortfolioHolding[];
  allocations: Allocation[];
  summary: PortfolioSummary;
  performance: PerformanceDataPoint[];
  transactions: Transaction[];
}

// Acciones
fetchPortfolio(): Promise<void>
executeTrade(trade: Trade): Promise<TradeResult>
updateHoldingsWithMarketData(): void
refreshAllocations(): void

// Selectores
selectHoldingBySymbol(state, symbol)
selectTopHoldings(state, limit)
selectTotalGainLoss(state)
```

#### authStore
```typescript
// src/store/authStore.ts
// Manejo de autenticacion
```

### 6.2 Hooks

#### useApi
```typescript
// Hook generico para llamadas API con cache
const { data, isLoading, error, execute, reset } = useApi(fetcher, {
  immediate: true,
  cacheDuration: 60000,
  onSuccess: (data) => {},
  onError: (error) => {},
});
```

#### usePaginatedApi
```typescript
// Para datos paginados
const { data, page, hasMore, loadMore, refresh } = usePaginatedApi(fetcher, {
  pageSize: 20,
});
```

#### useMutation
```typescript
// Para operaciones POST/PUT/DELETE
const { mutate, isLoading, error } = useMutation(mutationFn, {
  onSuccess: (data) => {},
  onError: (error) => {},
});
```

#### useSimulatedMarket
```typescript
// Simulacion de datos de mercado en tiempo real
const { startSimulation, stopSimulation } = useSimulatedMarket();
```

#### useKeyboardShortcuts
```typescript
// Atajos de teclado globales
useKeyboardShortcuts({
  'ctrl+k': openSearch,
  'escape': closeModal,
});
```

### 6.3 Servicios

#### marketService
```typescript
// src/services/market/
getStocks(): Promise<Stock[]>
getStockQuote(symbol): Promise<Quote>
subscribeToUpdates(symbols, callback): unsubscribe
getAdapterName(): string
```

#### portfolioService
```typescript
// src/services/portfolio/
getPortfolio(): Promise<PortfolioData>
executeTrade(order: TradeOrder): Promise<TradeResult>
```

#### authService
```typescript
// src/services/auth/
login(credentials): Promise<LoginResponse>
logout(): Promise<void>
refreshToken(): Promise<void>
```

### 6.4 Adapters (Patron Adapter para APIs)

```typescript
// src/services/adapters/
BaseAdapter       // Clase base abstracta
MockAdapter       // Datos simulados
FinnhubAdapter    // API real de Finnhub
AdapterFactory    // Factory para seleccionar adapter
```

### 6.5 Mock Data

```typescript
// src/services/mockData/
stocksData        // Lista de stocks con precios
portfolioHoldings // Holdings del portfolio
allocations       // Allocaciones por sector
portfolioSummary  // Resumen del portfolio
recommendations   // Recomendaciones de IA
marketIndicators  // Estado del mercado, riesgo, confianza
keyFactors        // Factores del modelo
trendIndicators   // Indicadores de tendencia
historicalPeriods // Periodos historicos
cycleData         // Datos del ciclo economico
sectorPerformance // Performance por sector
```

---

## 7. GAPS IDENTIFICADOS

### 7.1 Componentes Faltantes para FEATURE BASICO

| Componente Necesario | Descripcion | Prioridad |
|---------------------|-------------|-----------|
| **WatchlistCard** | Card para items de watchlist con quick actions | Alta |
| **NewsCard** | Card optimizada para noticias con imagen y timestamp | Media |
| **MarketOverview** | Resumen de indices principales (S&P, Nasdaq, etc.) | Alta |

### 7.2 Componentes Faltantes para SELECTOR DE PORTFOLIO

| Componente Necesario | Descripcion | Prioridad |
|---------------------|-------------|-----------|
| **ChatInterface** | UI para consultas al LLM con historial | Alta |
| **AIResponseCard** | Card formateada para respuestas de IA | Alta |
| **ComparisonTable** | Tabla para comparar multiples stocks lado a lado | Media |
| **InsightPanel** | Panel lateral con insights contextuales | Media |
| **FundamentalsCard** | Card con datos fundamentales (P/E, Market Cap, etc.) | Alta (B2B) |
| **TechnicalIndicators** | Visualizacion de indicadores tecnicos (RSI, MACD) | Media (B2B) |

### 7.3 Componentes Faltantes para WALLET

| Componente Necesario | Descripcion | Prioridad |
|---------------------|-------------|-----------|
| **OrderForm** | Formulario completo de orden (market, limit, stop) | Alta |
| **OrderBook** | Visualizacion del libro de ordenes | Media |
| **PositionCard** | Card detallada de posicion con P&L en tiempo real | Alta |
| **TradeConfirmation** | Modal de confirmacion pre-trade con fees | Alta |
| **FractionalSharesInput** | Input especializado para fracciones de acciones | Media |
| **PortfolioOptimizer** | UI para ajustar ponderaciones con drag | Media |
| **BotStatusCard** | Estado y metricas de trading bot (B2B) | Alta (B2B) |
| **CalibrationReport** | Reporte post-calibracion de bot (B2B) | Alta (B2B) |
| **MultiPortfolioSwitcher** | Selector de portfolio activo (B2B) | Alta (B2B) |

### 7.4 Componentes Faltantes para FONDOS

| Componente Necesario | Descripcion | Prioridad |
|---------------------|-------------|-----------|
| **FundCard** | Card de fondo con KPIs principales | Alta |
| **FundComparison** | Comparador visual de fondos | Media |
| **SubscriptionForm** | Formulario de suscripcion con calculo automatico | Alta |
| **RedemptionForm** | Formulario de rescate con preview | Alta |
| **FundFactSheet** | Documento visual con caracteristicas del fondo | Media |
| **YieldCalculator** | Calculadora interactiva de rendimientos | Media |
| **RiskDisclosure** | Componente de disclaimers de riesgo | Alta |
| **CustomFundBuilder** | Constructor de fondo personalizado (B2B) | Alta (B2B) |

### 7.5 Componentes de Utilidad General Faltantes

| Componente Necesario | Descripcion | Prioridad |
|---------------------|-------------|-----------|
| **DateRangePicker** | Selector de rango de fechas (1D, 1W, 1M, 3M, 1Y, 5Y, ALL) | Alta |
| **CurrencyInput** | Input con formato de moneda | Alta |
| **PercentageInput** | Input con formato de porcentaje | Media |
| **Drawer** | Panel lateral deslizable para detalles | Media |
| **Dropdown** | Menu desplegable generico | Alta |
| **Select** | Select nativo estilizado | Alta |
| **Switch** | Toggle switch para configuraciones | Media |
| **Slider** | Slider para rangos (riesgo, allocation) | Media |
| **Stepper** | Wizard multi-paso para flujos complejos | Media |
| **ConfirmDialog** | Dialogo de confirmacion reutilizable | Alta |
| **CopyToClipboard** | Boton para copiar texto/valores | Baja |

### 7.6 Prioridades de Desarrollo

**Fase 1 - MVP Dashboard:**
- DateRangePicker
- OrderForm
- PositionCard
- TradeConfirmation
- FundCard
- MarketOverview

**Fase 2 - Selector de Portfolio:**
- ChatInterface
- AIResponseCard
- InsightPanel
- FundamentalsCard (B2B)

**Fase 3 - Wallet Avanzado:**
- FractionalSharesInput
- PortfolioOptimizer
- BotStatusCard (B2B)
- MultiPortfolioSwitcher (B2B)

**Fase 4 - Fondos:**
- SubscriptionForm
- RedemptionForm
- FundComparison
- CustomFundBuilder (B2B)

---

## Apendice A: Importaciones Comunes

```typescript
// Atoms
import { Button, Badge, Checkbox, Tooltip, Skeleton } from '@/components/atoms';
import { InputText, InputDropdown, Textarea } from '@/components/atoms/Input';
import { AtmosphericBackground, DepthLayer, DataReveal } from '@/components/atoms/sentinel';

// Molecules
import { Card, MetricCard, Tabs, SearchBar, EmptyState } from '@/components/molecules';
import {
  RecommendationCard,
  StockSuggestion,
  AllocationSummary,
  TrendIndicator,
  FactorWeight
} from '@/components/molecules/sentinel';

// Organisms
import { DataGrid, Modal, Form, Sidebar, Toast } from '@/components/organisms';
import {
  MarketStateIndicator,
  RiskGauge,
  ConfidenceLevel,
  SystemPulse,
  PerformanceChart,
  ModelInsights,
  BacktestResults
} from '@/components/organisms/sentinel';

// Charts
import {
  FinancialLineChart,
  TreeMap,
  RadarChart,
  HeatMap,
  SankeyDiagram,
  ScatterPlot,
  BumpChart,
  CalendarHeatmap,
  BulletChart
} from '@/components/charts';
import { sentinelChartTheme, sentinelChartColors } from '@/components/charts/theme';

// Stores
import { useMarketStore, usePortfolioStore } from '@/store';

// Hooks
import { useApi, useMutation, usePaginatedApi } from '@/hooks';

// Services
import { marketService, portfolioService } from '@/services';
```

---

*Documento generado para SENTINEL Design System v1.0*
*Plataforma de inversiones B2C/B2B*
