# SENTINEL Design System

## Descripcion del Proyecto

**SENTINEL** es una plataforma de analisis de inversiones y recomendaciones del mercado de valores. Diseñada con una estetica oscura, futurista y data-driven inspirada en un "observatorio nocturno" - profesional, calma y sin colores estridentes.

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
| Animaciones | Framer Motion | | Transiciones suaves, no glowing |
| Iconos | Lucide React | | |
| Routing | React Router DOM | v6 | Lazy loading por ruta |
| Testing | Jest + Cypress | | Unit + E2E |
| Estilos | CSS Modules | | Variables en theme.css |

### Dependencias de Charts (ECharts)
```
echarts, echarts-for-react
```
*Nota: Nivo fue removido completamente en la migración a ECharts (Enero 2025)*

---

## Estructura del Proyecto

```
src/
├── assets/                  # Fonts (DotMatrix), iconos, imagenes
├── components/
│   ├── atoms/              # 22 componentes base (Button, Input, Badge, etc.)
│   │   └── sentinel/       # 5 atomos especificos (DataMatrixBackground, Sparkline)
│   ├── molecules/          # 12 compuestos (Card, MetricCard, Tabs, Pagination)
│   │   └── sentinel/       # 17 moleculas de mercado (TrendIndicator, NewsCard, etc.)
│   ├── organisms/          # 14 secciones (Sidebar, Table, Modal, DataGrid, Toast)
│   │   └── sentinel/       # 13 organismos (Watchlist, TickerTape, RiskGauge, etc.)
│   ├── charts/             # 24+ componentes ECharts + tema SENTINEL
│   ├── animations/         # 7 componentes (FadeIn, ScrollReveal, StaggerList, etc.)
│   └── showcase/           # Componentes de documentacion
├── config/
│   └── env.ts              # Config multi-proveedor (Finnhub, Tiingo, Mock)
├── hooks/
│   ├── useSimulatedMarket.ts   # Bridge entre marketStore y portfolioStore
│   ├── useKeyboardShortcuts.ts
│   ├── useApi.ts
│   ├── useNews.ts
│   └── useBreakpoint.ts
├── layouts/
│   ├── DashboardLayout/    # Layout principal con sidebar
│   ├── MobileLayout/       # Layout responsivo mobile
│   └── ShowcaseLayout.tsx  # Layout del showcase
├── pages/
│   ├── app/                # Paginas principales (12)
│   │   ├── DashboardPage/
│   │   ├── PortfolioView/
│   │   ├── PortfolioSimulator/
│   │   ├── RecommendationsView/
│   │   ├── NewsView/
│   │   └── LoginPage/
│   ├── Landing/            # Landing page publica
│   └── [showcase pages]    # 47 paginas de showcase por categoria
├── routes/
│   └── dashboardRoutes.tsx # Configuracion de rutas
├── services/
│   ├── adapters/           # Patrón adapter (Mock, Finnhub, Tiingo)
│   ├── api/                # Cliente HTTP
│   ├── auth/
│   ├── market/
│   ├── portfolio/
│   ├── recommendations/
│   ├── paperTrading/
│   ├── tiingo/             # Integracion Tiingo API
│   └── mockData/           # Datos mock (stocks, portfolio, recommendations)
├── store/                  # 6 Zustand stores
│   ├── authStore.ts        # Autenticacion (persistido)
│   ├── marketStore.ts      # Datos de mercado + live updates
│   ├── portfolioStore.ts   # Holdings y trades
│   ├── walletStore.ts      # Wallet avanzado (persistido)
│   ├── newsStore.ts        # Noticias con filtros
│   └── recommendationsStore.ts  # Señales de trading
├── styles/
│   ├── theme.css           # 670+ lineas de design tokens
│   ├── globals.css         # Reset + utilidades
│   ├── fonts.css           # DotMatrix fonts
│   ├── responsive.css      # Utilidades responsive
│   └── typography/
│       └── sentinel.css    # Sistema tipografico
├── types/
│   └── css-modules.d.ts
└── utils/                  # (vacio, usar para helpers)
```

---

## Sistema de Diseño Actual

### Paleta de Colores - "Observatorio Nocturno"

**Filosofia**: Colores desaturados, profesionales, sin alarmas visuales. El mercado de valores no necesita colores brillantes.

```css
/* Backgrounds (Dark Theme) */
--sentinel-bg-void: #05060a       /* Negro profundo */
--sentinel-bg-base: #0a0b10       /* Fondo principal */
--sentinel-bg-elevated: #10121a   /* Cards, paneles */
--sentinel-bg-overlay: #161822    /* Modales */
--sentinel-bg-subtle: #1c1e2a     /* Hover states */

/* Accent - Teal Institucional */
--sentinel-accent-primary: #5ba3a5
--sentinel-accent-secondary: #4a8a8c
--sentinel-accent-subtle: rgba(91, 163, 165, 0.15)

/* Status (Conservadores, no alarma) */
--sentinel-status-positive: #4a9a7c   /* Verde desaturado */
--sentinel-status-negative: #b85c5c   /* Rojo tenue */
--sentinel-status-warning: #c4a35a    /* Ambar suave */
--sentinel-status-info: #5a8fb8       /* Azul neutral */

/* Text */
--sentinel-text-primary: #e8eaed
--sentinel-text-secondary: #9aa0a6
--sentinel-text-tertiary: #5f6368
```

### Tipografia

- **UI General**: Inter (300-700)
- **Display/Titulos**: Space Grotesk
- **Monospace/Datos**: Space Mono, JetBrains Mono
- **Numeros LED**: DotMatrix (self-hosted en `/public/fonts/`)

### Animaciones

**Filosofia**: Transiciones lentas (400-2000ms) que crean calma. NO glowing effects.

```css
--sentinel-transition-fast: 200ms
--sentinel-transition-normal: 400ms
--sentinel-transition-slow: 700ms
--sentinel-transition-atmosphere: 2000ms
```

### Espaciado

Base de 4px: `4, 8, 12, 16, 20, 24, 32, 48, 64px`

---

## Gráficos (ECharts)

### Estructura de Charts

```
src/components/charts/
├── echarts/                    # Componentes ECharts
│   ├── EChart.tsx              # Wrapper base con tema
│   ├── sentinelTheme.ts        # Tema SENTINEL completo
│   ├── types.ts                # TypeScript interfaces
│   ├── index.ts                # Exports
│   ├── BarChart.tsx
│   ├── BoxplotChart.tsx
│   ├── CalendarChart.tsx
│   ├── CandlestickChart.tsx
│   ├── EffectScatterChart.tsx
│   ├── FunnelChart.tsx
│   ├── GaugeChart.tsx
│   ├── GraphChart.tsx
│   ├── HeatMap.tsx
│   ├── LineChart.tsx
│   ├── ParallelChart.tsx
│   ├── PictorialBarChart.tsx
│   ├── PieChart.tsx
│   ├── RadarChart.tsx
│   ├── SankeyChart.tsx
│   ├── ScatterChart.tsx
│   ├── SunburstChart.tsx
│   ├── ThemeRiverChart.tsx
│   ├── TreeChart.tsx
│   └── TreeMap.tsx
├── LightweightChart/           # TradingView (candlestick especializado)
├── CandlestickChart/           # Wrapper simplificado
├── BarChart/                   # Wrapper para OHLC bars
├── BaselineChart/              # Chart con línea base
├── HistogramChart/             # Histogram de volumen
├── FinancialLineChart/         # Performance financiero
├── StatCard/                   # Tarjeta de estadísticas
├── index.ts                    # Re-exports
└── theme.ts                    # Paleta de colores
```

### Componentes ECharts (24)

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

### Theme SENTINEL para ECharts

Definido en `src/components/charts/echarts/sentinelTheme.ts`:
- Paleta de 8 colores para series (`chartPalette`)
- Colores secuenciales (gradient teal)
- Colores divergentes (negativo → positivo)
- Colores de riesgo (5 niveles)
- Tooltip oscuro con bordes sutiles
- Ejes y grids minimalistas
- Tipografías: Inter, Space Grotesk, Space Mono
- Animaciones suaves (700ms, cubicOut)

---

## Patrones de Arquitectura

### Atomic Design
```
Atoms → Molecules → Organisms → Layouts → Pages
```

Cada componente en su carpeta:
```
src/components/atoms/Button/
├── Button.tsx
├── Button.module.css
└── index.ts
```

### Convencion de Archivo
Primera linea de cada componente:
```tsx
// Path: src/components/atoms/Button/Button.tsx
```

### CSS Modules
```tsx
import styles from './Button.module.css';

<button className={`${styles.button} ${styles.primary}`}>
```

### State Management (Zustand)
```tsx
// Patron estandar
const useStore = create<State & Actions>((set, get) => ({
  // state
  items: [],
  isLoading: false,

  // actions
  fetchItems: async () => {
    set({ isLoading: true });
    const data = await api.getItems();
    set({ items: data, isLoading: false });
  }
}));
```

### Stores con Persistencia
- `authStore`: `localStorage` key `sentinel-auth`
- `walletStore`: `localStorage` key `sentinel-wallet`

---

## Comandos

```bash
npm run dev           # Desarrollo (puerto 5173)
npm run build         # Build produccion
npm run test          # Jest tests
npm run test:watch    # Tests en modo watch
npm run test:coverage # Coverage report
npm run test:e2e      # Cypress
npm run lint          # ESLint
```

---

## Path Aliases (Vite + TS)

```tsx
import { Button } from '@atoms/Button';
import { usePortfolioStore } from '@store/portfolioStore';

// Configurados en vite.config.ts y tsconfig.json
@/           → src/
@components/ → src/components/
@atoms/      → src/components/atoms/
@molecules/  → src/components/molecules/
@organisms/  → src/components/organisms/
@hooks/      → src/hooks/
@layouts/    → src/layouts/
@pages/      → src/pages/
@services/   → src/services/
@store/      → src/store/
@styles/     → src/styles/
@assets/     → src/assets/
```

---

## Rutas de la App

```
/                           → Landing page (publica)
/app/login                  → Login (demo: cualquier credencial)
/app/dashboard              → Dashboard principal
/app/dashboard/portfolio    → Vista de portfolio
/app/dashboard/portfolio/simulator → Simulador what-if
/app/dashboard/recommendations → Señales de compra/venta
/app/dashboard/news         → Feed de noticias
/showcase/*                 → Design system docs
```

---

## Reglas para Claude

### DO (Hacer)

1. **Seguir Atomic Design**: Crear componentes en la categoria correcta
2. **Usar CSS Modules**: No inline styles excepto valores dinamicos
3. **Usar variables de theme.css**: `var(--sentinel-bg-base)`, no colores hardcoded
4. **Usar TypeScript estricto**: Interfaces para todos los props
5. **Componentes en carpetas**: `ComponentName/ComponentName.tsx`
6. **Agregar comentario de path**: `// Path: src/...` en primera linea
7. **Respetar la paleta desaturada**: Colores calmos, profesionales

### DON'T (No hacer)

1. **No crear archivos en rutas planas**: `src/components/Button.tsx` ❌
2. **No usar colores brillantes/saturados**: Mantener el tono "observatorio"
3. **No agregar glowing effects**: Transiciones suaves, no neon
4. **No animaciones rapidas**: Minimo 400ms para transiciones
5. **No ignorar estados de loading/error**: Siempre manejarlos
6. **No hardcodear colores**: Usar variables CSS
7. **No crear archivos .md sin pedirlo**: Solo si el usuario lo solicita

---

## TAREAS PENDIENTES

### En Progreso
<!-- Tareas actuales -->

### Proximas
- [ ] Rediseñar design system completo
- [ ] Nuevo theme y paleta de colores
- [ ] Actualizar todos los estilos

### Completadas
- [x] Cambiar libreria de charts (de Nivo a ECharts) ✅
- [x] Implementar Light Engine con sombras dinamicas ✅

### Backlog
<!-- Ideas futuras -->

---

## DECISIONES TOMADAS

**[2025-01-15] Light Engine - Sistema de Iluminación Dinámica**
- **Decisión**: Implementar un motor de iluminación unificado basado en los principios de Josh W. Comeau
- **Inspiración**: https://www.joshwcomeau.com/css/designing-shadows/
- **Filosofía**:
  - UNA sola fuente de luz global para todos los elementos
  - Ratio consistente: offset-y = 2x offset-x
  - Sombras en capas (layered) para profundidad realista
  - Color-matched shadows (nunca negro puro)
- **Archivos creados**:
  - `src/styles/light-engine.css` - Sistema CSS con variables y utility classes
  - `src/pages/styles/LightEngineShowcase.tsx` - Documentación interactiva
- **Características**:
  - 5 niveles de elevación layered (`--elevation-1` a `--elevation-5`)
  - 5 niveles neumórficos (`--neu-elevation-1` a `--neu-elevation-5`)
  - 4 niveles glass (`--glass-elevation-1` a `--glass-elevation-4`)
  - Sombras color-matched por contexto (positive, negative, warning, accent, info)
  - Clases interactivas (`.elevation-interactive`, `.neu-interactive`, `.glass-interactive`)
- **Demo dinámica** en Home.tsx:
  - Luz animada orbitando la página
  - Controles de velocidad y ángulo manual
  - Todas las sombras responden en tiempo real usando trigonometría
  - Fórmulas: `shadowX = cos(angle) × distance`, `shadowY = sin(angle) × distance`
- **Border radius unificado**: 15px en todos los contenedores

**[2025-01-14] Migración de Nivo a ECharts**
- **Decisión**: Reemplazar completamente Nivo por ECharts como librería de gráficos
- **Razón**:
  - ECharts ofrece mejor rendimiento con grandes datasets
  - Más tipos de gráficos disponibles (24 vs 15)
  - Mejor control sobre el tema y estilos
  - Soporte nativo para gráficos financieros
  - Menor bundle size al usar una sola librería
- **Cambios realizados**:
  - Eliminados 14 componentes Nivo (BulletChart, BumpChart, CalendarHeatmap, etc.)
  - Creados 24 componentes ECharts con tema SENTINEL
  - Creadas 20 páginas showcase individuales por tipo de gráfico
  - Actualizado ChartsShowcase.tsx como hub central
  - Removidas todas las dependencias @nivo/*

---

## NOTAS DE SESION

<!-- Notas temporales - limpiar periodicamente -->
