# SENTINEL - Estructura Actual Post-Adaptación Mobile

**Fecha:** 2025-12-31
**Versión:** Post-mobile responsive adaptation

Este documento describe la estructura completa de SENTINEL después de la adaptación mobile, para ser usado como referencia en el rediseño visual hacia estética de "stock market screens".

---

## 1. ESTRUCTURA DE DIRECTORIOS

```
src/
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── components/
│   ├── animations/        # Componentes de animación (FadeIn, Parallax, etc.)
│   ├── atoms/             # Componentes base
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Checkbox/
│   │   ├── Dropdown/
│   │   ├── Input/
│   │   ├── LoadingScreen/
│   │   ├── Skeleton/
│   │   ├── Slider/
│   │   ├── Tooltip/
│   │   ├── Typography/
│   │   └── sentinel/      # Átomos específicos SENTINEL
│   │       ├── AtmosphericBackground/
│   │       ├── DataReveal/
│   │       └── DepthLayer/
│   ├── charts/            # Componentes de visualización
│   │   ├── FinancialLineChart/
│   │   ├── TreeMap/
│   │   ├── RadarChart/
│   │   ├── HeatMap/
│   │   └── ... (15+ tipos de charts)
│   ├── molecules/
│   │   ├── Card/
│   │   ├── MetricCard/
│   │   ├── FormField/
│   │   └── sentinel/      # Moléculas específicas SENTINEL
│   │       ├── NewsCard/
│   │       ├── RecommendationCard/
│   │       ├── RiskProfileSelector/
│   │       ├── AllocationSlider/
│   │       ├── TrendIndicator/
│   │       └── ... (15+ componentes)
│   └── organisms/
│       ├── BottomNavigation/   # ⭐ NUEVO: Nav móvil
│       ├── MobileHeader/       # ⭐ NUEVO: Header móvil
│       ├── MoreMenu/           # ⭐ NUEVO: Menú hamburguesa
│       ├── Modal/
│       ├── Sidebar/
│       ├── Table/
│       ├── Toast/
│       └── sentinel/      # Organismos específicos SENTINEL
│           ├── MarketStateIndicator/
│           ├── RiskGauge/
│           ├── ConfidenceLevel/
│           ├── SystemPulse/
│           └── ... (10+ componentes)
├── hooks/
│   ├── useBreakpoint.ts   # ⭐ CLAVE: Detección responsive
│   ├── useNews.ts
│   └── ...
├── layouts/
│   ├── DashboardLayout/   # ⭐ Layout principal con lógica mobile/desktop
│   └── ShowcaseLayout/
├── pages/
│   ├── app/
│   │   ├── DashboardPage/     # Home del dashboard
│   │   ├── PortfolioView/
│   │   ├── PortfolioBuilder/
│   │   ├── RecommendationsView/
│   │   ├── NewsView/
│   │   ├── LoginPage/
│   │   └── PlaceholderPage/   # Para páginas del menú
│   ├── Landing/               # Landing page pública
│   └── sentinel/              # Showcases
├── store/                     # Zustand stores
│   ├── authStore.ts
│   ├── marketStore.ts
│   ├── newsStore.ts
│   ├── portfolioStore.ts
│   ├── recommendationsStore.ts
│   └── walletStore.ts
└── styles/
    └── theme.css              # ⭐ Tokens del design system
```

---

## 2. ARQUITECTURA DEL DASHBOARD

### 2.1 Layout Principal (DashboardLayout)

El componente `DashboardLayout` maneja la navegación responsive:

```tsx
// src/layouts/DashboardLayout/DashboardLayout.tsx

export function DashboardLayout() {
  const isMobile = useIsMobile();  // Hook clave para responsive
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // MOBILE: Header + Content + BottomNav
  if (isMobile) {
    return (
      <>
        <AtmosphericBackground variant="subtle" animated />
        <div className={styles.mobileLayout}>
          <MobileHeader onMenuClick={() => setIsMoreMenuOpen(true)} />
          <main className={styles.mobileContent}>
            <Outlet />
          </main>
          <BottomNavigation items={mobileNavItems} onMoreClick={() => setIsMoreMenuOpen(true)} />
          <MoreMenu isOpen={isMoreMenuOpen} onClose={() => setIsMoreMenuOpen(false)} onLogout={handleLogout} />
        </div>
      </>
    );
  }

  // DESKTOP: Sidebar + Header + Content
  return (
    <>
      <AtmosphericBackground variant="subtle" animated />
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          {/* Logo + NavItems + Footer con Settings/Profile/Logout */}
        </aside>
        <main className={styles.main}>
          <header className={styles.header}>
            {/* Icono + Título de sección actual */}
          </header>
          <div className={styles.content}>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
```

### 2.2 Items de Navegación

```tsx
const navItems: NavItem[] = [
  { path: '/app/dashboard', icon: Home, label: 'Home', end: true },
  { path: '/app/dashboard/portfolio', icon: Briefcase, label: 'Portfolio' },
  { path: '/app/dashboard/recommendations', icon: TrendingUp, label: 'Recommendations' },
  { path: '/app/dashboard/news', icon: Newspaper, label: 'News' },
];

// Mobile muestra "Recs" en vez de "Recommendations" (más corto)
const mobileNavItems = [
  { id: 'home', label: 'Home', icon: <Home size={22} />, path: '/app/dashboard' },
  { id: 'portfolio', label: 'Portfolio', icon: <Briefcase size={22} />, path: '/app/dashboard/portfolio' },
  { id: 'recommendations', label: 'Recs', icon: <TrendingUp size={22} />, path: '/app/dashboard/recommendations' },
  { id: 'news', label: 'News', icon: <Newspaper size={22} />, path: '/app/dashboard/news' },
];
```

### 2.3 Breakpoints

```tsx
// src/hooks/useBreakpoint.ts

const breakpoints = {
  xs: 375,
  sm: 480,
  md: 768,   // ⭐ Punto de corte mobile/desktop
  lg: 1024,
  xl: 1200,
  '2xl': 1440,
};

// useIsMobile() retorna true si width < 768px
export function useIsMobile(): boolean {
  const breakpoint = useBreakpoint();
  return breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md';
}
```

---

## 3. COMPONENTES DE NAVEGACIÓN MOBILE

### 3.1 MobileHeader

```tsx
// Props
interface MobileHeaderProps {
  title?: string;           // Título opcional de sección
  showBack?: boolean;       // Mostrar flecha back
  onBack?: () => void;
  onMenuClick?: () => void; // Handler menú hamburguesa
}

// Estructura visual:
// [Logo/Back] -------- [Title] -------- [Menu ☰]
```

### 3.2 BottomNavigation

```tsx
// Estructura visual:
// [Home] [Portfolio] [Recs] [News] [More ...]

// El botón "More" abre el MoreMenu con opciones adicionales:
// - Profile
// - Settings
// - Notifications
// - Security
// - Help
// - Logout
```

### 3.3 CSS Variables Mobile

```css
/* En theme.css */
--sentinel-mobile-header-height: 56px;
--sentinel-mobile-bottom-nav-height: 64px;
--sentinel-touch-target-min: 44px;
--sentinel-touch-target-comfortable: 48px;
--sentinel-safe-area-top: env(safe-area-inset-top, 0px);
--sentinel-safe-area-bottom: env(safe-area-inset-bottom, 0px);
```

---

## 4. SISTEMA DE TOKENS CSS

### 4.1 Colores de Fondo (Tema Oscuro)

```css
--sentinel-bg-void: #05060a;        /* Negro más profundo */
--sentinel-bg-base: #0a0b10;        /* Fondo principal app */
--sentinel-bg-elevated: #10121a;    /* Cards, paneles */
--sentinel-bg-overlay: #161822;     /* Modales */
--sentinel-bg-subtle: #1c1e2a;      /* Hover states */
--sentinel-bg-glass: rgba(10, 11, 16, 0.85);  /* Glassmorphism */
```

### 4.2 Acento (Teal Institucional)

```css
--sentinel-accent-primary: #5ba3a5;     /* Acento principal */
--sentinel-accent-secondary: #4a8a8c;   /* Hover/pressed */
--sentinel-accent-glow: rgba(91, 163, 165, 0.3);  /* Efectos glow */
```

### 4.3 Estados Semánticos

```css
/* NO alarmistas - colores desaturados */
--sentinel-status-positive: #4a9a7c;   /* Verde institucional */
--sentinel-status-negative: #b85c5c;   /* Rojo apagado */
--sentinel-status-warning: #c4a35a;    /* Ámbar suave */
--sentinel-status-info: #5a8fb8;       /* Azul neutro */
```

### 4.4 Niveles de Riesgo

```css
--sentinel-risk-low: #4a9a7c;       /* Verde teal */
--sentinel-risk-moderate: #5ba3a5;  /* Cyan (acento) */
--sentinel-risk-elevated: #c4a35a;  /* Ámbar */
--sentinel-risk-high: #c47a5a;      /* Terracota */
--sentinel-risk-severe: #b85c5c;    /* Coral apagado */
```

### 4.5 Tipografía

```css
--sentinel-font-primary: 'Inter', -apple-system, sans-serif;
--sentinel-font-mono: 'JetBrains Mono', 'SF Mono', monospace;

/* Escala */
--sentinel-text-xs: 0.75rem;   /* 12px */
--sentinel-text-sm: 0.875rem;  /* 14px */
--sentinel-text-base: 1rem;    /* 16px */
--sentinel-text-lg: 1.125rem;  /* 18px */
--sentinel-text-xl: 1.25rem;   /* 20px */
--sentinel-text-2xl: 1.5rem;   /* 24px */
```

### 4.6 Animaciones

```css
/* Duraciones largas - Sentinel es atmosférico, nunca brusco */
--sentinel-duration-fast: 200ms;
--sentinel-duration-normal: 400ms;
--sentinel-duration-slow: 700ms;
--sentinel-duration-ambient: 8000ms;  /* Animaciones de fondo */

/* Easing suave */
--sentinel-ease-smooth: cubic-bezier(0.45, 0, 0.15, 1);
```

---

## 5. COMPONENTES SENTINEL

### 5.1 Átomos (`atoms/sentinel/`)

| Componente | Descripción |
|------------|-------------|
| `AtmosphericBackground` | Fondo animado con gradientes sutiles |
| `DataReveal` | Animación de revelación de datos |
| `DepthLayer` | Capa de profundidad parallax |

### 5.2 Moléculas (`molecules/sentinel/`)

| Componente | Descripción |
|------------|-------------|
| `NewsCard` | Card de noticia con sentiment |
| `RecommendationCard` | Card de recomendación con score |
| `RiskProfileSelector` | Selector de perfil de riesgo |
| `AllocationSlider` | Slider para asignación de % |
| `TrendIndicator` | Indicador de tendencia |
| `FactorWeight` | Peso de factor en análisis |
| `CyclePosition` | Posición en ciclo de mercado |
| `StockSuggestion` | Sugerencia de acción |
| `PositionRow` | Fila de posición en portfolio |
| `TransactionRow` | Fila de transacción |

### 5.3 Organismos (`organisms/sentinel/`)

| Componente | Descripción |
|------------|-------------|
| `MarketStateIndicator` | Estado del mercado (Bull/Bear/Neutral) |
| `RiskGauge` | Gauge visual de nivel de riesgo |
| `ConfidenceLevel` | Nivel de confianza del sistema |
| `SystemPulse` | Indicador de "latido" del sistema |
| `PerformanceChart` | Chart de rendimiento |
| `CorrelationMatrix` | Matriz de correlación |
| `BacktestResults` | Resultados de backtesting |
| `ModelInsights` | Insights del modelo |

---

## 6. RUTAS DE LA APLICACIÓN

```tsx
// App.tsx - Estructura de rutas

<Routes>
  {/* Landing pública */}
  <Route path="/" element={<Landing />} />

  {/* App principal */}
  <Route path="/app" element={<AppLayout />}>
    <Route path="login" element={<LoginPage />} />

    {/* Dashboard con navegación */}
    <Route path="dashboard" element={<DashboardLayout />}>
      <Route index element={<DashboardPage />} />           {/* Home */}
      <Route path="portfolio" element={<PortfolioView />} />
      <Route path="portfolio/builder" element={<PortfolioBuilder />} />
      <Route path="recommendations" element={<RecommendationsView />} />
      <Route path="news" element={<NewsView />} />

      {/* Páginas del menú hamburguesa */}
      <Route path="profile" element={<PlaceholderPage icon={User} />} />
      <Route path="settings" element={<PlaceholderPage icon={Settings} />} />
      <Route path="notifications" element={<PlaceholderPage icon={Bell} />} />
      <Route path="security" element={<PlaceholderPage icon={Shield} />} />
      <Route path="help" element={<PlaceholderPage icon={HelpCircle} />} />
    </Route>
  </Route>

  {/* Showcase (solo desktop) */}
  <Route path="/showcase" element={<ShowcaseLayout />}>
    {/* ... rutas de showcase */}
  </Route>
</Routes>
```

---

## 7. STORES (ZUSTAND)

| Store | Propósito |
|-------|-----------|
| `authStore` | Autenticación y sesión |
| `marketStore` | Datos de mercado (Finnhub API) |
| `newsStore` | Noticias financieras |
| `portfolioStore` | Gestión de portfolios |
| `recommendationsStore` | Recomendaciones del sistema |
| `walletStore` | Wallet y transacciones |

---

## 8. DESCRIPCIÓN VISUAL

### 8.1 Desktop

```
┌────────────────────────────────────────────────────────────────┐
│ ┌──────┐ ┌──────────────────────────────────────────────────┐ │
│ │      │ │ [Icon] Section Title                             │ │
│ │  🔵  │ ├──────────────────────────────────────────────────┤ │
│ │ Home │ │                                                  │ │
│ │      │ │           CONTENIDO DE LA PÁGINA                 │ │
│ │ 📁   │ │                                                  │ │
│ │Port. │ │  ┌─────────────────────────────────────────┐     │ │
│ │      │ │  │  Cards, Charts, Tables, etc.            │     │ │
│ │ 📈   │ │  │                                         │     │ │
│ │ Recs │ │  └─────────────────────────────────────────┘     │ │
│ │      │ │                                                  │ │
│ │ 📰   │ │                                                  │ │
│ │ News │ │                                                  │ │
│ │      │ │                                                  │ │
│ ├──────┤ │                                                  │ │
│ │ ⚙️ 👤 │ │                                                  │ │
│ │ 🚪   │ │                                                  │ │
│ └──────┘ └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
   64px                        Resto del viewport
  Sidebar                      (margin-left: 64px)
```

### 8.2 Mobile

```
┌─────────────────────────────┐
│ [Logo]              [☰]    │ ← MobileHeader (56px)
├─────────────────────────────┤
│                             │
│     CONTENIDO DE PÁGINA     │
│                             │
│  ┌───────────────────────┐  │
│  │  Cards apiladas       │  │
│  │  verticalmente        │  │
│  └───────────────────────┘  │
│                             │
│  Scroll vertical            │
│                             │
├─────────────────────────────┤
│ [🏠] [📁] [📈] [📰] [...]  │ ← BottomNavigation (64px)
│ Home Port  Recs News More   │
└─────────────────────────────┘
```

---

## 9. CAMBIOS SIGNIFICATIVOS POST-MOBILE

### 9.1 Navegación Condicional

- **Antes:** Solo sidebar desktop
- **Ahora:** `useIsMobile()` decide qué navegación mostrar

### 9.2 Layouts de Páginas

Cada página (DashboardPage, PortfolioView, etc.) tiene:
```tsx
if (isMobile) {
  return <MobileLayout />;
}
return <DesktopLayout />;
```

### 9.3 Nuevos Componentes

- `BottomNavigation` - Barra inferior móvil
- `MobileHeader` - Header con logo y menú
- `MoreMenu` - Menú deslizable con opciones extra

### 9.4 CSS Variables Nuevas

```css
--sentinel-mobile-header-height: 56px;
--sentinel-mobile-bottom-nav-height: 64px;
--sentinel-safe-area-top/bottom: env(safe-area-inset-*);
```

### 9.5 Landing Page

- Botón "Explore Design System" **deshabilitado en mobile** con hint "Desktop only"
- Botón "Open App" navega a `/app/dashboard`

---

## 10. DEPENDENCIAS PRINCIPALES

```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "zustand": "^4.x",
  "framer-motion": "^10.x",
  "@nivo/line": "^0.87.x",
  "@nivo/treemap": "^0.87.x",
  "lucide-react": "^0.x",
  "vite": "^5.x"
}
```

---

## 11. PRÓXIMOS PASOS SUGERIDOS

Para el rediseño visual hacia "stock market screens":

1. **Charts más densos** - Tipo Bloomberg/Reuters terminal
2. **Ticker tape** - Cinta de precios en movimiento
3. **Multi-panel layout** - Dividir pantalla en cuadrantes
4. **Real-time indicators** - Parpadeo sutil en datos que cambian
5. **Color coding** - Rojo/verde más prominente para cambios de precio
6. **Tablas de datos** - Estilo terminal financiero
7. **Watchlists** - Listas de seguimiento con sparklines

---

*Documento generado automáticamente para transferencia de contexto entre sesiones de Claude.*
