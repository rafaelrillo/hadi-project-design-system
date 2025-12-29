# SENTINEL Dashboard - Documento de Diseño v1.0

## Para: Claude Code
## Proyecto: Rediseño completo del Dashboard SENTINEL
## Fecha: Diciembre 2024

---

## 1. VISIÓN GENERAL

### 1.1 Qué es SENTINEL
SENTINEL es una plataforma de análisis y gestión de inversiones con estética "observatorio nocturno". La app permite a usuarios crear portfolios de acciones reales, recibir recomendaciones diarias de compra/venta, y operar en modo simulado (paper trading).

### 1.2 Módulos a Implementar

| Módulo | Descripción | Estado |
|--------|-------------|--------|
| **Portfolio Builder** | Crear y gestionar portfolios con 3-20 acciones | Core |
| **Daily Recommendations** | Top 5 buy + Top 5 sell con noticias | Core |
| **Wallet (Paper Trading)** | Compra/venta simulada de acciones | Core |
| **Fondos Administrados** | FCIs con rendimientos | Fase 2 (futuro) |

### 1.3 Modelo de Negocio (Features por Plan)

```
┌─────────────────────────────────────────────────────────────┐
│ PLAN FREE (Demo)                                            │
├─────────────────────────────────────────────────────────────┤
│ ✓ Ver recomendaciones diarias (limitado a 3)                │
│ ✓ Buscar acciones                                           │
│ ✓ Ver noticias generales                                    │
│ ✗ Crear portfolio                                           │
│ ✗ Paper trading                                             │
├─────────────────────────────────────────────────────────────┤
│ PLAN B2C ($5/mes)                                           │
├─────────────────────────────────────────────────────────────┤
│ ✓ Todo de Free                                              │
│ ✓ Crear 1 portfolio (3-20 acciones)                         │
│ ✓ Ver todas las recomendaciones (top 5 + top 5)             │
│ ✓ Noticias personalizadas por portfolio                     │
│ ✓ Paper trading                                             │
│ ✓ Chat con IA (mock)                                        │
├─────────────────────────────────────────────────────────────┤
│ PLAN B2B ($20/mes)                                          │
├─────────────────────────────────────────────────────────────┤
│ ✓ Todo de B2C                                               │
│ ✓ Múltiples portfolios                                      │
│ ✓ Informes avanzados                                        │
│ ✓ Calibración automática (futuro)                           │
│ ✓ Trading bots (futuro)                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. FUENTE DE DATOS: TIINGO API

### 2.1 Endpoints a Utilizar

```typescript
// Base URL
const TIINGO_BASE = 'https://api.tiingo.com';

// Endpoints necesarios
const endpoints = {
  // Metadata de ticker (nombre, exchange, descripción)
  tickerMeta: '/tiingo/daily/<ticker>',
  
  // Precios EOD (open, high, low, close, volume, adjClose)
  tickerPrice: '/tiingo/daily/<ticker>/prices',
  
  // Lista de todos los tickers disponibles
  tickerList: '/tiingo/daily/tickers',
  
  // Noticias (filtradas por ticker o generales)
  news: '/tiingo/news',
  
  // Precios intraday (IEX)
  iexLatest: '/iex/<ticker>',
};

// Headers requeridos
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Token ${TIINGO_API_KEY}`
};
```

### 2.2 Estructuras de Datos de Tiingo

```typescript
// Metadata de un ticker
interface TiingoTickerMeta {
  ticker: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  exchangeCode: string;
}

// Precio EOD
interface TiingoPriceEOD {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjOpen: number;
  adjHigh: number;
  adjLow: number;
  adjClose: number;
  adjVolume: number;
  divCash: number;
  splitFactor: number;
}

// Noticia
interface TiingoNews {
  id: number;
  title: string;
  url: string;
  description: string;
  publishedDate: string;
  tickers: string[];
  tags: string[];
  source: string;
}

// Precio IEX (intraday)
interface TiingoIEXPrice {
  ticker: string;
  timestamp: string;
  lastPrice: number;
  lastSize: number;
  bidPrice: number;
  bidSize: number;
  askPrice: number;
  askSize: number;
  prevClose: number;
}
```

### 2.3 Servicio Tiingo (a crear)

```typescript
// src/services/tiingo/tiingoService.ts

export const tiingoService = {
  // Buscar tickers (para el buscador)
  searchTickers: async (query: string): Promise<TiingoTickerMeta[]>,
  
  // Obtener metadata de un ticker
  getTickerMeta: async (ticker: string): Promise<TiingoTickerMeta>,
  
  // Obtener precio actual
  getCurrentPrice: async (ticker: string): Promise<TiingoIEXPrice>,
  
  // Obtener precios históricos
  getHistoricalPrices: async (
    ticker: string, 
    startDate: string, 
    endDate: string
  ): Promise<TiingoPriceEOD[]>,
  
  // Obtener precios de múltiples tickers
  getBatchPrices: async (tickers: string[]): Promise<TiingoIEXPrice[]>,
  
  // Obtener noticias
  getNews: async (params: {
    tickers?: string[];
    tags?: string[];
    limit?: number;
    startDate?: string;
  }): Promise<TiingoNews[]>,
  
  // Obtener lista de tickers populares (pre-filtrada)
  getPopularTickers: async (): Promise<TiingoTickerMeta[]>,
};
```

---

## 3. ARQUITECTURA DE VISTAS

### 3.1 Mapa de Navegación

```
┌─────────────────────────────────────────────────────────────┐
│                        SENTINEL APP                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────┐    ┌─────────────────────────────────────┐    │
│  │         │    │                                     │    │
│  │ SIDEBAR │    │            MAIN CONTENT             │    │
│  │         │    │                                     │    │
│  │ ○ Home  │───▶│  /dashboard                         │    │
│  │ ○ Port. │───▶│  /dashboard/portfolio               │    │
│  │ ○ Recom.│───▶│  /dashboard/recommendations         │    │
│  │ ○ Wallet│───▶│  /dashboard/wallet                  │    │
│  │ ○ News  │───▶│  /dashboard/news                    │    │
│  │ ○ Chat  │───▶│  /dashboard/chat                    │    │
│  │         │    │                                     │    │
│  │─────────│    │                                     │    │
│  │ Settings│───▶│  /dashboard/settings                │    │
│  │         │    │                                     │    │
│  └─────────┘    └─────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Rutas de la Aplicación

```typescript
// src/routes/dashboardRoutes.tsx

const dashboardRoutes = [
  {
    path: '/dashboard',
    element: <DashboardHome />,
    name: 'Home',
    icon: 'LayoutDashboard',
    showInNav: true,
  },
  {
    path: '/dashboard/portfolio',
    element: <PortfolioView />,
    name: 'Portfolio',
    icon: 'PieChart',
    showInNav: true,
    requiredPlan: 'b2c', // Solo B2C y B2B
  },
  {
    path: '/dashboard/portfolio/builder',
    element: <PortfolioBuilder />,
    name: 'Portfolio Builder',
    showInNav: false,
    requiredPlan: 'b2c',
  },
  {
    path: '/dashboard/recommendations',
    element: <RecommendationsView />,
    name: 'Recommendations',
    icon: 'TrendingUp',
    showInNav: true,
  },
  {
    path: '/dashboard/wallet',
    element: <WalletView />,
    name: 'Wallet',
    icon: 'Wallet',
    showInNav: true,
    requiredPlan: 'b2c',
  },
  {
    path: '/dashboard/news',
    element: <NewsView />,
    name: 'News',
    icon: 'Newspaper',
    showInNav: true,
  },
  {
    path: '/dashboard/chat',
    element: <ChatView />,
    name: 'AI Assistant',
    icon: 'MessageSquare',
    showInNav: true,
    requiredPlan: 'b2c',
  },
  {
    path: '/dashboard/settings',
    element: <SettingsView />,
    name: 'Settings',
    icon: 'Settings',
    showInNav: true,
  },
];
```

---

## 4. ESPECIFICACIÓN DE VISTAS

### 4.1 DASHBOARD HOME (`/dashboard`)

**Propósito:** Vista general del estado del mercado y resumen del usuario.

**Layout:**
```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER: SystemPulse + SearchBar + UserMenu                       │
├────────┬─────────────────────────────────────────────────────────┤
│        │                                                         │
│        │  ┌─────────────────────────────────────────────────┐   │
│        │  │ HERO: Market State + Risk + Confidence          │   │
│ SIDE   │  │ [MarketStateIndicator] [RiskGauge] [Confidence] │   │
│ BAR    │  └─────────────────────────────────────────────────┘   │
│        │                                                         │
│        │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│        │  │ MetricCard   │ │ MetricCard   │ │ MetricCard   │   │
│        │  │ Portfolio    │ │ Day P&L      │ │ Cash Balance │   │
│        │  │ Value        │ │              │ │              │   │
│        │  └──────────────┘ └──────────────┘ └──────────────┘   │
│        │                                                         │
│        │  ┌─────────────────────┐ ┌─────────────────────────┐   │
│        │  │ TOP RECOMMENDATIONS │ │ LATEST NEWS             │   │
│        │  │                     │ │                         │   │
│        │  │ [StockSuggestion]   │ │ [NewsCard]              │   │
│        │  │ [StockSuggestion]   │ │ [NewsCard]              │   │
│        │  │ [StockSuggestion]   │ │ [NewsCard]              │   │
│        │  │                     │ │                         │   │
│        │  │ [View All →]        │ │ [View All →]            │   │
│        │  └─────────────────────┘ └─────────────────────────┘   │
│        │                                                         │
└────────┴─────────────────────────────────────────────────────────┘
```

**Componentes utilizados:**
```tsx
// src/pages/dashboard/DashboardHome.tsx

import { AtmosphericBackground, DepthLayer, DataReveal } from '@/components/atoms/sentinel';
import { MarketStateIndicator, RiskGauge, ConfidenceLevel, SystemPulse } from '@/components/organisms/sentinel';
import { MetricCard, StockSuggestion } from '@/components/molecules/sentinel';
import { Sidebar, Searchbar } from '@/components/organisms';

// Componentes nuevos necesarios:
// - NewsCard (molecule)
// - QuickActions (molecule)
```

**Estado/Data:**
```typescript
interface DashboardHomeState {
  marketIndicators: {
    state: 'bullish' | 'bearish' | 'neutral' | 'uncertain';
    riskLevel: 'low' | 'moderate' | 'elevated' | 'high' | 'severe';
    riskValue: number;
    confidence: 'high' | 'medium' | 'low';
    confidencePercent: number;
  };
  portfolioSummary: {
    totalValue: number;
    dayPL: number;
    dayPLPercent: number;
    cashBalance: number;
  };
  topRecommendations: StockRecommendation[]; // limitado a 3
  latestNews: TiingoNews[]; // limitado a 5
}
```

---

### 4.2 PORTFOLIO VIEW (`/dashboard/portfolio`)

**Propósito:** Ver y gestionar el portfolio del usuario.

**Layout:**
```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER                                                           │
├────────┬─────────────────────────────────────────────────────────┤
│        │                                                         │
│        │  ┌─────────────────────────────────────────────────┐   │
│        │  │ PORTFOLIO HEADER                                │   │
│        │  │ "My Portfolio" + [Edit] + [Optimize]            │   │
│ SIDE   │  │ Created: Dec 15, 2024 | 12 holdings             │   │
│ BAR    │  └─────────────────────────────────────────────────┘   │
│        │                                                         │
│        │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│        │  │ Total Value  │ │ Total Return │ │ Day Change   │   │
│        │  │ $12,450.32   │ │ +$1,234.50   │ │ +$89.20      │   │
│        │  │              │ │ (+11.02%)    │ │ (+0.72%)     │   │
│        │  └──────────────┘ └──────────────┘ └──────────────┘   │
│        │                                                         │
│        │  ┌─────────────────────────────────────────────────┐   │
│        │  │ PERFORMANCE CHART                               │   │
│        │  │ [DateRangePicker: 1D | 1W | 1M | 3M | 1Y | ALL] │   │
│        │  │                                                 │   │
│        │  │ [FinancialLineChart - 300px height]             │   │
│        │  │                                                 │   │
│        │  └─────────────────────────────────────────────────┘   │
│        │                                                         │
│        │  ┌─────────────────────┐ ┌─────────────────────────┐   │
│        │  │ ALLOCATION          │ │ HOLDINGS TABLE          │   │
│        │  │ [TreeMap]           │ │ [DataGrid]              │   │
│        │  │                     │ │ Symbol | Shares | Price │   │
│        │  │                     │ │ Value | P&L | %         │   │
│        │  │                     │ │ [Click to trade]        │   │
│        │  └─────────────────────┘ └─────────────────────────┘   │
│        │                                                         │
└────────┴─────────────────────────────────────────────────────────┘
```

**Estado sin portfolio (Empty State):**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    📊                                       │
│                                                             │
│           You don't have a portfolio yet                    │
│                                                             │
│     Create your first portfolio to start tracking           │
│     your investments and receive personalized               │
│     recommendations.                                        │
│                                                             │
│              [Create Portfolio]                             │
│                                                             │
│     Requirements:                                           │
│     • Minimum 3 stocks                                      │
│     • Maximum 20 stocks                                     │
│     • Minimum investment: $100                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Componentes:**
```tsx
// Existentes
import { MetricCard, AllocationSummary } from '@/components/molecules/sentinel';
import { DataGrid } from '@/components/organisms';
import { FinancialLineChart, TreeMap } from '@/components/charts';

// Nuevos necesarios
// - DateRangePicker (molecule)
// - PortfolioHeader (molecule)
// - HoldingRow (molecule) - para DataGrid
```

**Estado/Data:**
```typescript
interface PortfolioViewState {
  portfolio: {
    id: string;
    name: string;
    createdAt: Date;
    holdings: PortfolioHolding[];
    initialInvestment: number;
  } | null;
  performance: {
    totalValue: number;
    totalReturn: number;
    totalReturnPercent: number;
    dayChange: number;
    dayChangePercent: number;
  };
  chartData: PerformanceDataPoint[];
  selectedDateRange: '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';
}

interface PortfolioHolding {
  ticker: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  value: number;
  gainLoss: number;
  gainLossPercent: number;
  allocation: number; // porcentaje del portfolio
}
```

---

### 4.3 PORTFOLIO BUILDER (`/dashboard/portfolio/builder`)

**Propósito:** Crear o editar un portfolio seleccionando acciones.

**Layout - Paso 1 (Búsqueda y Selección):**
```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER: "Create Portfolio" - Step 1 of 3                        │
├────────┬─────────────────────────────────────────────────────────┤
│        │                                                         │
│        │  ┌─────────────────────────────────────────────────┐   │
│        │  │ SEARCH STOCKS                                   │   │
│        │  │ [🔍 Search by name or ticker... ]               │   │
│ SIDE   │  └─────────────────────────────────────────────────┘   │
│ BAR    │                                                         │
│        │  ┌─────────────────────┐ ┌─────────────────────────┐   │
│        │  │ SEARCH RESULTS      │ │ SELECTED STOCKS (5/20)  │   │
│        │  │                     │ │                         │   │
│        │  │ [StockSearchResult] │ │ [SelectedStockCard]     │   │
│        │  │ AAPL - Apple Inc    │ │ AAPL    $150.32  [x]    │   │
│        │  │ $189.50 +1.2%  [+]  │ │ GOOGL   $142.65  [x]    │   │
│        │  │                     │ │ MSFT    $378.91  [x]    │   │
│        │  │ [StockSearchResult] │ │ NVDA    $495.22  [x]    │   │
│        │  │ AMZN - Amazon       │ │ AMZN    $153.42  [x]    │   │
│        │  │ $153.42 +0.8%  [+]  │ │                         │   │
│        │  │                     │ │ ─────────────────────   │   │
│        │  │ ...                 │ │ Min: 3 | Max: 20        │   │
│        │  │                     │ │                         │   │
│        │  │ [Load More]         │ │ [Continue →]            │   │
│        │  └─────────────────────┘ └─────────────────────────┘   │
│        │                                                         │
└────────┴─────────────────────────────────────────────────────────┘
```

**Layout - Paso 2 (Asignación de Pesos):**
```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER: "Create Portfolio" - Step 2 of 3                        │
├────────┬─────────────────────────────────────────────────────────┤
│        │                                                         │
│        │  ┌─────────────────────────────────────────────────┐   │
│        │  │ INVESTMENT AMOUNT                               │   │
│        │  │ [$|      1,000.00                          ]    │   │
│ SIDE   │  │ Minimum: $100                                   │   │
│ BAR    │  └─────────────────────────────────────────────────┘   │
│        │                                                         │
│        │  ┌─────────────────────────────────────────────────┐   │
│        │  │ ALLOCATION METHOD                               │   │
│        │  │ ○ Equal Weight (20% each)                       │   │
│        │  │ ● Custom Allocation                             │   │
│        │  │ ○ AI Optimized (coming soon)                    │   │
│        │  └─────────────────────────────────────────────────┘   │
│        │                                                         │
│        │  ┌─────────────────────────────────────────────────┐   │
│        │  │ SET ALLOCATIONS                    Total: 100%  │   │
│        │  │                                                 │   │
│        │  │ AAPL  [████████████░░░░░░░] 25%   $250.00       │   │
│        │  │ GOOGL [████████░░░░░░░░░░░] 20%   $200.00       │   │
│        │  │ MSFT  [████████░░░░░░░░░░░] 20%   $200.00       │   │
│        │  │ NVDA  [██████░░░░░░░░░░░░░] 15%   $150.00       │   │
│        │  │ AMZN  [████████░░░░░░░░░░░] 20%   $200.00       │   │
│        │  │                                                 │   │
│        │  │ [← Back]                      [Continue →]      │   │
│        │  └─────────────────────────────────────────────────┘   │
│        │                                                         │
└────────┴─────────────────────────────────────────────────────────┘
```

**Layout - Paso 3 (Confirmación):**
```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER: "Create Portfolio" - Step 3 of 3                        │
├────────┬─────────────────────────────────────────────────────────┤
│        │                                                         │
│        │  ┌─────────────────────────────────────────────────┐   │
│        │  │ PORTFOLIO SUMMARY                               │   │
│        │  │                                                 │   │
│        │  │ Name: [My First Portfolio          ]            │   │
│        │  │                                                 │   │
│        │  │ Total Investment: $1,000.00                     │   │
│ SIDE   │  │ Number of Holdings: 5                           │   │
│ BAR    │  │                                                 │   │
│        │  │ ┌─────────────────────────────────────────┐     │   │
│        │  │ │ [TreeMap Preview]                       │     │   │
│        │  │ │                                         │     │   │
│        │  │ │   AAPL 25%  │  GOOGL 20% │ MSFT 20%    │     │   │
│        │  │ │             │            │             │     │   │
│        │  │ │   NVDA 15%  │  AMZN 20%  │             │     │   │
│        │  │ └─────────────────────────────────────────┘     │   │
│        │  │                                                 │   │
│        │  │ Holdings Detail:                                │   │
│        │  │ ┌──────────────────────────────────────────┐   │   │
│        │  │ │ Symbol │ Shares │ Price  │ Value │ %    │   │   │
│        │  │ │ AAPL   │ 1.32   │ $189.50│ $250  │ 25%  │   │   │
│        │  │ │ GOOGL  │ 1.40   │ $142.65│ $200  │ 20%  │   │   │
│        │  │ │ ...    │        │        │       │      │   │   │
│        │  │ └──────────────────────────────────────────┘   │   │
│        │  │                                                 │   │
│        │  │ [← Back]                 [Create Portfolio]     │   │
│        │  └─────────────────────────────────────────────────┘   │
│        │                                                         │
└────────┴─────────────────────────────────────────────────────────┘
```

**Componentes nuevos necesarios:**
```tsx
// Nuevos componentes a crear:

// 1. StockSearchResult (molecule)
interface StockSearchResultProps {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  onAdd: () => void;
  disabled?: boolean; // si ya está seleccionado
}

// 2. SelectedStockCard (molecule)
interface SelectedStockCardProps {
  ticker: string;
  name: string;
  price: number;
  onRemove: () => void;
}

// 3. AllocationSlider (molecule)
interface AllocationSliderProps {
  ticker: string;
  name: string;
  allocation: number; // 0-100
  amount: number; // USD
  onChange: (value: number) => void;
}

// 4. Stepper (molecule) - para los pasos
interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

// 5. CurrencyInput (atom)
interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  currency?: string;
}
```

**Estado/Data:**
```typescript
interface PortfolioBuilderState {
  currentStep: 1 | 2 | 3;
  
  // Paso 1
  searchQuery: string;
  searchResults: TiingoTickerMeta[];
  selectedStocks: SelectedStock[];
  
  // Paso 2
  investmentAmount: number;
  allocationMethod: 'equal' | 'custom' | 'optimized';
  allocations: { [ticker: string]: number }; // porcentajes
  
  // Paso 3
  portfolioName: string;
  
  // UI
  isSearching: boolean;
  isCreating: boolean;
  errors: ValidationError[];
}

interface SelectedStock {
  ticker: string;
  name: string;
  currentPrice: number;
  exchange: string;
}

// Validaciones
const validations = {
  minStocks: 3,
  maxStocks: 20,
  minInvestment: 100,
  minAllocation: 1, // 1% mínimo por stock
};
```

---

### 4.4 RECOMMENDATIONS VIEW (`/dashboard/recommendations`)

**Propósito:** Ver recomendaciones diarias de compra/venta con noticias de soporte.

**Layout:**
```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER                                                           │
├────────┬─────────────────────────────────────────────────────────┤
│        │                                                         │
│        │  ┌─────────────────────────────────────────────────┐   │
│        │  │ MARKET OVERVIEW                                 │   │
│        │  │ [MarketStateIndicator] [RiskGauge] [Confidence] │   │
│ SIDE   │  │ Last updated: 2 min ago                         │   │
│ BAR    │  └─────────────────────────────────────────────────┘   │
│        │                                                         │
│        │  ┌───────────────────────┐ ┌───────────────────────┐   │
│        │  │ 📈 TOP 5 BUY          │ │ 📉 TOP 5 SELL         │   │
│        │  │                       │ │                       │   │
│        │  │ [RecommendationCard]  │ │ [RecommendationCard]  │   │
│        │  │ NVDA - BUY            │ │ XOM - SELL            │   │
│        │  │ Confidence: 87%       │ │ Confidence: 82%       │   │
│        │  │ Target: $520 (+5%)    │ │ Target: $95 (-8%)     │   │
│        │  │ [Show Reasoning ▼]    │ │ [Show Reasoning ▼]    │   │
│        │  │                       │ │                       │   │
│        │  │ [RecommendationCard]  │ │ [RecommendationCard]  │   │
│        │  │ ...                   │ │ ...                   │   │
│        │  │                       │ │                       │   │
│        │  └───────────────────────┘ └───────────────────────┘   │
│        │                                                         │
│        │  ┌─────────────────────────────────────────────────┐   │
│        │  │ 📰 SUPPORTING NEWS                              │   │
│        │  │                                                 │   │
│        │  │ Filtered by: [All ▼] [Technology ▼] [Today ▼]   │   │
│        │  │                                                 │   │
│        │  │ [NewsCard] [NewsCard] [NewsCard]                │   │
│        │  │ [NewsCard] [NewsCard] [NewsCard]                │   │
│        │  │                                                 │   │
│        │  │ [Load More]                                     │   │
│        │  └─────────────────────────────────────────────────┘   │
│        │                                                         │
└────────┴─────────────────────────────────────────────────────────┘
```

**Componente RecommendationCard expandido:**
```
┌─────────────────────────────────────────┐
│ 📈 BUY                    Confidence 87%│
│ ────────────────────────────────────────│
│ NVDA                                    │
│ NVIDIA Corporation                      │
│                                         │
│ Current: $495.22                        │
│ Target:  $520.00 (+5.0%)                │
│                                         │
│ Timeframe: 1-2 weeks                    │
│                                         │
│ [▼ Show Reasoning]                      │
├─────────────────────────────────────────┤
│ Reasoning (expanded):                   │
│                                         │
│ • Strong earnings beat expectations     │
│ • AI demand continues to accelerate     │
│ • Technical breakout above $490         │
│ • Institutional buying increased 12%    │
│                                         │
│ Related News:                           │
│ • "NVIDIA announces new AI chip..."     │
│ • "Data center revenue up 200%..."      │
│                                         │
│ [Trade Now]                             │
└─────────────────────────────────────────┘
```

**Componentes:**
```tsx
// Existentes
import { MarketStateIndicator, RiskGauge, ConfidenceLevel } from '@/components/organisms/sentinel';
import { RecommendationCard, StockSuggestion } from '@/components/molecules/sentinel';

// Nuevos necesarios
// - NewsCard (molecule)
// - NewsFilter (molecule)
// - RecommendationDetail (organism) - versión expandida
```

**Estado/Data:**
```typescript
interface RecommendationsViewState {
  marketState: MarketIndicators;
  buyRecommendations: StockRecommendation[];
  sellRecommendations: StockRecommendation[];
  news: TiingoNews[];
  
  // Filtros
  newsFilter: {
    sector: string | null;
    dateRange: 'today' | 'week' | 'month';
    tickers: string[];
  };
  
  isLoading: boolean;
  lastUpdated: Date;
}

interface StockRecommendation {
  id: string;
  ticker: string;
  name: string;
  action: 'buy' | 'sell';
  currentPrice: number;
  targetPrice: number;
  confidence: number; // 0-100
  timeframe: string;
  reasoning: string[];
  relatedNews: TiingoNews[];
  sector: string;
  generatedAt: Date;
}
```

**Lógica de Recomendaciones (Mock/Simulada):**
```typescript
// src/services/recommendations/mockRecommendationEngine.ts

// Por ahora las recomendaciones son simuladas basadas en:
// 1. Cambio de precio reciente (momentum)
// 2. Volumen relativo
// 3. Noticias recientes (sentiment simulado)

export function generateMockRecommendations(
  stocks: TiingoIEXPrice[],
  news: TiingoNews[]
): { buy: StockRecommendation[], sell: StockRecommendation[] } {
  // Algoritmo simple:
  // - Top 5 con mayor % positivo + volumen alto = BUY
  // - Top 5 con mayor % negativo + volumen alto = SELL
  // - Confidence basada en consistencia del movimiento
  // - Reasoning generado con templates
}
```

---

### 4.5 WALLET VIEW (`/dashboard/wallet`)

**Propósito:** Paper trading - compra/venta simulada de acciones.

**Layout:**
```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER                                                           │
├────────┬─────────────────────────────────────────────────────────┤
│        │                                                         │
│        │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│        │  │ Cash Balance │ │ Buying Power │ │ Total Value  │   │
│        │  │ $5,432.10    │ │ $5,432.10    │ │ $17,882.42   │   │
│ SIDE   │  └──────────────┘ └──────────────┘ └──────────────┘   │
│ BAR    │                                                         │
│        │  ┌─────────────────────────────────────────────────┐   │
│        │  │ QUICK TRADE                                     │   │
│        │  │                                                 │   │
│        │  │ [🔍 Search stock to trade...]                   │   │
│        │  │                                                 │   │
│        │  │ Popular: AAPL  GOOGL  MSFT  NVDA  AMZN         │   │
│        │  └─────────────────────────────────────────────────┘   │
│        │                                                         │
│        │  ┌─────────────────────────────────────────────────┐   │
│        │  │ POSITIONS                                       │   │
│        │  │                                                 │   │
│        │  │ [DataGrid]                                      │   │
│        │  │ Symbol | Shares | Avg Cost | Current | P&L     │   │
│        │  │ AAPL   | 10.5   | $180.00  | $189.50 | +$99.75 │   │
│        │  │ GOOGL  | 5.2    | $140.00  | $142.65 | +$13.78 │   │
│        │  │        |        |          | [Trade] | [Close] │   │
│        │  └─────────────────────────────────────────────────┘   │
│        │                                                         │
│        │  ┌─────────────────────────────────────────────────┐   │
│        │  │ TRANSACTION HISTORY                             │   │
│        │  │                                                 │   │
│        │  │ [Tabs: All | Buys | Sells | Pending]            │   │
│        │  │                                                 │   │
│        │  │ [TransactionRow] BUY AAPL 5 @ $189.50 ✓        │   │
│        │  │ [TransactionRow] SELL MSFT 2 @ $378.91 ✓       │   │
│        │  │ ...                                             │   │
│        │  └─────────────────────────────────────────────────┘   │
│        │                                                         │
└────────┴─────────────────────────────────────────────────────────┘
```

**Modal de Trading:**
```
┌─────────────────────────────────────────────────────────────┐
│ Trade AAPL                                           [X]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Apple Inc.                                                 │
│  Current Price: $189.50                                     │
│  Day Change: +$2.35 (+1.26%)                               │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [  BUY  ]  [  SELL  ]                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Order Type: [Market Order ▼]                               │
│                                                             │
│  Amount:                                                    │
│  ○ Shares    [ 10        ]  = $1,895.00                    │
│  ● Dollars   [ $500.00   ]  ≈ 2.64 shares                  │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Order Summary:                                             │
│  Buy 2.64 shares of AAPL                                   │
│  Estimated Cost: $500.00                                   │
│  Available Cash: $5,432.10                                 │
│                                                             │
│  ⚠️ This is a simulated trade (Paper Trading)              │
│                                                             │
│  [Cancel]                              [Execute Trade]      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Componentes nuevos necesarios:**
```tsx
// 1. TradeModal (organism)
interface TradeModalProps {
  ticker: string;
  tickerInfo: TiingoTickerMeta;
  currentPrice: number;
  onTrade: (order: TradeOrder) => void;
  onClose: () => void;
  cashBalance: number;
  currentPosition?: Position;
}

// 2. PositionRow (molecule)
interface PositionRowProps {
  position: Position;
  onTrade: () => void;
  onClose: () => void;
}

// 3. TransactionRow (molecule)
interface TransactionRowProps {
  transaction: Transaction;
}

// 4. QuickTradeSearch (molecule)
interface QuickTradeSearchProps {
  onSelectStock: (ticker: string) => void;
  popularStocks: string[];
}
```

**Estado/Data:**
```typescript
interface WalletViewState {
  balance: {
    cash: number;
    buyingPower: number;
    portfolioValue: number;
    totalValue: number;
  };
  positions: Position[];
  transactions: Transaction[];
  
  // UI
  selectedTicker: string | null;
  isTradeModalOpen: boolean;
  transactionFilter: 'all' | 'buys' | 'sells' | 'pending';
}

interface Position {
  ticker: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  marketValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  ticker: string;
  shares: number;
  price: number;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
  timestamp: Date;
}

interface TradeOrder {
  ticker: string;
  type: 'buy' | 'sell';
  orderType: 'market' | 'limit';
  amount: number;
  amountType: 'shares' | 'dollars';
  limitPrice?: number;
}
```

**Lógica de Paper Trading:**
```typescript
// src/services/wallet/paperTradingService.ts

export const paperTradingService = {
  // Ejecutar una orden (simulada)
  executeOrder: async (order: TradeOrder): Promise<Transaction> => {
    // Validaciones:
    // - Mínimo $1 por transacción
    // - Suficiente cash para compras
    // - Suficientes shares para ventas
    // - Precio de mercado actual
    
    // Simular ejecución inmediata para market orders
    // Guardar en localStorage o store
  },
  
  // Obtener balance
  getBalance: (): Balance => {...},
  
  // Obtener posiciones
  getPositions: (): Position[] => {...},
  
  // Obtener historial
  getTransactions: (): Transaction[] => {...},
  
  // Reset (para demo)
  resetAccount: (initialCash: number): void => {...},
};
```

---

### 4.6 NEWS VIEW (`/dashboard/news`)

**Propósito:** Feed de noticias financieras de Tiingo.

**Layout:**
```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER                                                           │
├────────┬─────────────────────────────────────────────────────────┤
│        │                                                         │
│        │  ┌─────────────────────────────────────────────────┐   │
│        │  │ FILTERS                                         │   │
│        │  │ [🔍 Search news...   ]                          │   │
│ SIDE   │  │                                                 │   │
│ BAR    │  │ Source: [All ▼]  Sector: [All ▼]  Date: [Today]│   │
│        │  │                                                 │   │
│        │  │ [My Portfolio] [Recommendations] [General]      │   │
│        │  └─────────────────────────────────────────────────┘   │
│        │                                                         │
│        │  ┌─────────────────────────────────────────────────┐   │
│        │  │                                                 │   │
│        │  │ [NewsCard - Featured]                           │   │
│        │  │ ┌───────────────────────────────────────────┐   │   │
│        │  │ │ 🏷️ NVDA AAPL                              │   │   │
│        │  │ │                                           │   │   │
│        │  │ │ Tech Giants Report Strong AI Revenue      │   │   │
│        │  │ │                                           │   │   │
│        │  │ │ Major technology companies reported...    │   │   │
│        │  │ │                                           │   │   │
│        │  │ │ Reuters • 2 hours ago                     │   │   │
│        │  │ └───────────────────────────────────────────┘   │   │
│        │  │                                                 │   │
│        │  │ ┌─────────────────┐ ┌─────────────────┐         │   │
│        │  │ │ [NewsCard]      │ │ [NewsCard]      │         │   │
│        │  │ │ Fed Signals...  │ │ Oil Prices...   │         │   │
│        │  │ │ WSJ • 3h ago    │ │ Bloomberg • 4h  │         │   │
│        │  │ └─────────────────┘ └─────────────────┘         │   │
│        │  │                                                 │   │
│        │  │ [Load More]                                     │   │
│        │  └─────────────────────────────────────────────────┘   │
│        │                                                         │
└────────┴─────────────────────────────────────────────────────────┘
```

**NewsCard Component:**
```tsx
// src/components/molecules/NewsCard/NewsCard.tsx

interface NewsCardProps {
  id: number;
  title: string;
  description: string;
  source: string;
  publishedDate: Date;
  url: string;
  tickers: string[];
  tags: string[];
  featured?: boolean;
  onTickerClick?: (ticker: string) => void;
}
```

---

### 4.7 CHAT VIEW (`/dashboard/chat`)

**Propósito:** Asistente de IA para consultas (mock por ahora).

**Layout:**
```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER                                                           │
├────────┬─────────────────────────────────────────────────────────┤
│        │                                                         │
│        │  ┌─────────────────────────────────────────────────┐   │
│        │  │ SENTINEL AI Assistant                           │   │
│        │  │                                                 │   │
│ SIDE   │  │ ┌───────────────────────────────────────────┐   │   │
│ BAR    │  │ │ 🤖 Hello! I'm SENTINEL's AI assistant.   │   │   │
│        │  │ │    How can I help you with your          │   │   │
│        │  │ │    investments today?                    │   │   │
│        │  │ └───────────────────────────────────────────┘   │   │
│        │  │                                                 │   │
│        │  │ ┌───────────────────────────────────────────┐   │   │
│        │  │ │ 👤 What do you think about NVDA?         │   │   │
│        │  │ └───────────────────────────────────────────┘   │   │
│        │  │                                                 │   │
│        │  │ ┌───────────────────────────────────────────┐   │   │
│        │  │ │ 🤖 Based on current market data, NVDA    │   │   │
│        │  │ │    shows strong momentum...              │   │   │
│        │  │ │                                          │   │   │
│        │  │ │    📊 Current Price: $495.22            │   │   │
│        │  │ │    📈 Day Change: +2.3%                 │   │   │
│        │  │ │    🎯 SENTINEL Rating: BUY              │   │   │
│        │  │ │                                          │   │   │
│        │  │ │    [View Full Analysis]                  │   │   │
│        │  │ └───────────────────────────────────────────┘   │   │
│        │  │                                                 │   │
│        │  │                                                 │   │
│        │  └─────────────────────────────────────────────────┘   │
│        │                                                         │
│        │  ┌─────────────────────────────────────────────────┐   │
│        │  │ [Type your question...                    ] [→] │   │
│        │  │                                                 │   │
│        │  │ Suggestions:                                    │   │
│        │  │ [Analyze my portfolio] [Market outlook]         │   │
│        │  │ [Compare AAPL vs MSFT] [Risk assessment]        │   │
│        │  └─────────────────────────────────────────────────┘   │
│        │                                                         │
└────────┴─────────────────────────────────────────────────────────┘
```

**Mock AI Responses:**
```typescript
// src/services/chat/mockChatService.ts

const mockResponses: { [pattern: string]: ResponseTemplate } = {
  'think about {ticker}': {
    template: `Based on current market data, {ticker} shows {sentiment} momentum...
    
    📊 Current Price: {price}
    📈 Day Change: {change}
    🎯 SENTINEL Rating: {rating}
    
    Key factors:
    • {factor1}
    • {factor2}
    • {factor3}`,
    requiresData: ['ticker_price', 'recommendation'],
  },
  'portfolio': {
    template: `Your portfolio is currently {status}.
    
    📈 Total Value: {totalValue}
    💰 Day P&L: {dayPL}
    
    Top performers: {topPerformers}
    Needs attention: {needsAttention}`,
    requiresData: ['portfolio'],
  },
  // ... más templates
};
```

---

## 5. COMPONENTES NUEVOS A CREAR

### 5.1 Prioridad Alta (Bloquean funcionalidad core)

| Componente | Tipo | Ubicación | Dependencias |
|------------|------|-----------|--------------|
| `NewsCard` | Molecule | `molecules/NewsCard/` | Badge, Typography |
| `StockSearchResult` | Molecule | `molecules/sentinel/StockSearchResult/` | Badge, Button, TrendIndicator |
| `SelectedStockCard` | Molecule | `molecules/sentinel/SelectedStockCard/` | Button, Typography |
| `AllocationSlider` | Molecule | `molecules/sentinel/AllocationSlider/` | Slider (nuevo), Typography |
| `TradeModal` | Organism | `organisms/sentinel/TradeModal/` | Modal, Form, Button, CurrencyInput |
| `DateRangePicker` | Molecule | `molecules/DateRangePicker/` | Button |
| `CurrencyInput` | Atom | `atoms/Input/CurrencyInput/` | InputText |
| `Slider` | Atom | `atoms/Slider/` | - |

### 5.2 Prioridad Media

| Componente | Tipo | Ubicación |
|------------|------|-----------|
| `Stepper` | Molecule | `molecules/Stepper/` |
| `PositionRow` | Molecule | `molecules/sentinel/PositionRow/` |
| `TransactionRow` | Molecule | `molecules/sentinel/TransactionRow/` |
| `QuickTradeSearch` | Molecule | `molecules/sentinel/QuickTradeSearch/` |
| `ChatMessage` | Molecule | `molecules/sentinel/ChatMessage/` |
| `ChatInput` | Molecule | `molecules/sentinel/ChatInput/` |

### 5.3 Prioridad Baja (Nice to have)

| Componente | Tipo | Ubicación |
|------------|------|-----------|
| `NewsFilter` | Molecule | `molecules/NewsFilter/` |
| `SuggestionChips` | Molecule | `molecules/SuggestionChips/` |
| `PortfolioHeader` | Molecule | `molecules/sentinel/PortfolioHeader/` |

---

## 6. STORES Y SERVICIOS

### 6.1 Stores a Crear/Modificar

```typescript
// src/store/index.ts

// 1. userStore - Estado del usuario y plan
interface UserState {
  user: User | null;
  plan: 'free' | 'b2c' | 'b2b';
  isAuthenticated: boolean;
  preferences: UserPreferences;
}

// 2. portfolioStore - Portfolio del usuario
interface PortfolioState {
  portfolio: Portfolio | null;
  holdings: PortfolioHolding[];
  performance: PerformanceData;
  isLoading: boolean;
}

// 3. walletStore - Paper trading
interface WalletState {
  balance: Balance;
  positions: Position[];
  transactions: Transaction[];
  pendingOrders: Order[];
}

// 4. marketStore - Datos de mercado (ya existe, extender)
interface MarketState {
  // ... existente ...
  watchlist: string[];
  searchResults: TiingoTickerMeta[];
}

// 5. recommendationsStore - Recomendaciones
interface RecommendationsState {
  buyRecommendations: StockRecommendation[];
  sellRecommendations: StockRecommendation[];
  lastGenerated: Date;
  isLoading: boolean;
}

// 6. newsStore - Noticias
interface NewsState {
  articles: TiingoNews[];
  filters: NewsFilters;
  isLoading: boolean;
  hasMore: boolean;
}

// 7. chatStore - Chat con IA
interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
}
```

### 6.2 Servicios a Crear

```typescript
// src/services/

// 1. tiingoService.ts - API de Tiingo
export const tiingoService = {
  searchTickers,
  getTickerMeta,
  getCurrentPrice,
  getHistoricalPrices,
  getBatchPrices,
  getNews,
  getPopularTickers,
};

// 2. portfolioService.ts - Gestión de portfolio
export const portfolioService = {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getPortfolioPerformance,
  calculateAllocations,
};

// 3. paperTradingService.ts - Paper trading
export const paperTradingService = {
  executeOrder,
  getBalance,
  getPositions,
  getTransactions,
  resetAccount,
};

// 4. recommendationEngine.ts - Generador de recomendaciones
export const recommendationEngine = {
  generateDailyRecommendations,
  getRecommendationForTicker,
  refreshRecommendations,
};

// 5. mockChatService.ts - Chat mock
export const mockChatService = {
  sendMessage,
  getResponse,
  getSuggestions,
};
```

---

## 7. FLUJOS DE USUARIO

### 7.1 Flujo: Crear Portfolio

```
1. Usuario navega a /dashboard/portfolio
2. Ve EmptyState con botón "Create Portfolio"
3. Click → /dashboard/portfolio/builder
4. PASO 1: Buscar y seleccionar stocks
   - Busca en SearchBar
   - Ve resultados de Tiingo API
   - Agrega stocks (mín 3, máx 20)
   - Click "Continue"
5. PASO 2: Configurar inversión
   - Ingresa monto ($100 mín)
   - Selecciona método de allocation
   - Ajusta sliders si es custom
   - Click "Continue"
6. PASO 3: Confirmar
   - Ve resumen con TreeMap
   - Ingresa nombre del portfolio
   - Click "Create Portfolio"
7. Redirect a /dashboard/portfolio con portfolio creado
```

### 7.2 Flujo: Ejecutar Trade

```
1. Usuario navega a /dashboard/wallet
2. Busca stock en QuickTradeSearch o click en posición
3. Abre TradeModal
4. Selecciona BUY o SELL
5. Ingresa cantidad (shares o dollars)
   - Mínimo $1
   - Valida contra balance/posición
6. Ve resumen de orden
7. Click "Execute Trade"
8. Toast de confirmación
9. Posiciones y transacciones actualizadas
```

### 7.3 Flujo: Ver Recomendaciones

```
1. Usuario navega a /dashboard/recommendations
2. Ve indicadores de mercado (estado, riesgo, confianza)
3. Ve Top 5 BUY y Top 5 SELL
4. Click en una recomendación → expande detalles
5. Ve reasoning y noticias relacionadas
6. Click "Trade Now" → abre TradeModal
```

---

## 8. CONFIGURACIÓN DE API

### 8.1 Variables de Entorno

```env
# .env
VITE_TIINGO_API_KEY=your_tiingo_api_key_here
VITE_API_BASE_URL=https://api.tiingo.com
VITE_ENABLE_MOCK_DATA=false
VITE_PAPER_TRADING_INITIAL_BALANCE=10000
```

### 8.2 Configuración de Proxy (Vite)

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api/tiingo': {
        target: 'https://api.tiingo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tiingo/, ''),
        headers: {
          'Authorization': `Token ${process.env.VITE_TIINGO_API_KEY}`,
        },
      },
    },
  },
});
```

---

## 9. PERSISTENCIA DE DATOS

### 9.1 LocalStorage Keys

```typescript
// src/utils/storage.ts

const STORAGE_KEYS = {
  // Usuario
  USER_PREFERENCES: 'sentinel_user_preferences',
  USER_PLAN: 'sentinel_user_plan',
  
  // Portfolio
  PORTFOLIO: 'sentinel_portfolio',
  
  // Wallet (Paper Trading)
  WALLET_BALANCE: 'sentinel_wallet_balance',
  WALLET_POSITIONS: 'sentinel_wallet_positions',
  WALLET_TRANSACTIONS: 'sentinel_wallet_transactions',
  
  // Cache
  TICKER_CACHE: 'sentinel_ticker_cache',
  NEWS_CACHE: 'sentinel_news_cache',
  
  // Chat
  CHAT_HISTORY: 'sentinel_chat_history',
};
```

### 9.2 Inicialización de Demo

```typescript
// src/utils/initDemo.ts

export function initializeDemoAccount() {
  // Si no existe wallet, crear con balance inicial
  if (!localStorage.getItem(STORAGE_KEYS.WALLET_BALANCE)) {
    localStorage.setItem(STORAGE_KEYS.WALLET_BALANCE, JSON.stringify({
      cash: 10000,
      buyingPower: 10000,
    }));
  }
  
  // Plan demo = free
  if (!localStorage.getItem(STORAGE_KEYS.USER_PLAN)) {
    localStorage.setItem(STORAGE_KEYS.USER_PLAN, 'free');
  }
}
```

---

## 10. CONSIDERACIONES DE UI/UX

### 10.1 Estados de Carga

Todos los componentes que hacen fetch deben mostrar:
- `Skeleton` mientras cargan
- `EmptyState` si no hay datos
- `Toast` de error si falla

### 10.2 Responsive Design

- Sidebar colapsable en mobile
- Grid de cards responsivo (1-2-3 columnas)
- Modal fullscreen en mobile

### 10.3 Accesibilidad

- Focus states en todos los interactivos
- ARIA labels en iconos
- Keyboard navigation en DataGrid y modales
- `prefers-reduced-motion` respetado

### 10.4 Feedback Visual

- Animaciones `DataReveal` en carga de datos
- `SystemPulse` siempre visible indicando estado
- Colores semánticos consistentes (verde=positivo, rojo=negativo)
- Nunca usar colores saturados que "griten"

---

## 11. ORDEN DE IMPLEMENTACIÓN SUGERIDO

### Sprint 1: Fundación
1. ✅ Crear servicio Tiingo (`tiingoService.ts`)
2. ✅ Crear stores básicos (user, market, portfolio)
3. ✅ Crear componentes atómicos faltantes (CurrencyInput, Slider)
4. ✅ Configurar rutas del dashboard

### Sprint 2: Portfolio Builder
1. Crear `StockSearchResult` y `SelectedStockCard`
2. Crear `AllocationSlider` y `Stepper`
3. Implementar vista `PortfolioBuilder` (3 pasos)
4. Implementar `PortfolioView` con datos

### Sprint 3: Recommendations
1. Crear `NewsCard`
2. Crear `recommendationEngine` (mock)
3. Implementar vista `RecommendationsView`
4. Conectar con noticias de Tiingo

### Sprint 4: Wallet
1. Crear `TradeModal`
2. Crear `PositionRow` y `TransactionRow`
3. Implementar `paperTradingService`
4. Implementar vista `WalletView`

### Sprint 5: Polish
1. Implementar `NewsView`
2. Implementar `ChatView` (mock)
3. Agregar `DateRangePicker` donde falte
4. Testing y bug fixes

---

## 12. ARCHIVOS A CREAR (RESUMEN)

```
src/
├── services/
│   ├── tiingo/
│   │   ├── tiingoService.ts
│   │   ├── tiingoTypes.ts
│   │   └── index.ts
│   ├── portfolio/
│   │   ├── portfolioService.ts
│   │   └── index.ts
│   ├── wallet/
│   │   ├── paperTradingService.ts
│   │   └── index.ts
│   ├── recommendations/
│   │   ├── recommendationEngine.ts
│   │   └── index.ts
│   └── chat/
│       ├── mockChatService.ts
│       └── index.ts
│
├── store/
│   ├── userStore.ts
│   ├── portfolioStore.ts
│   ├── walletStore.ts
│   ├── recommendationsStore.ts
│   ├── newsStore.ts
│   └── chatStore.ts
│
├── components/
│   ├── atoms/
│   │   ├── Input/
│   │   │   └── CurrencyInput/
│   │   └── Slider/
│   │
│   ├── molecules/
│   │   ├── NewsCard/
│   │   ├── DateRangePicker/
│   │   ├── Stepper/
│   │   └── sentinel/
│   │       ├── StockSearchResult/
│   │       ├── SelectedStockCard/
│   │       ├── AllocationSlider/
│   │       ├── PositionRow/
│   │       ├── TransactionRow/
│   │       ├── QuickTradeSearch/
│   │       ├── ChatMessage/
│   │       └── ChatInput/
│   │
│   └── organisms/
│       └── sentinel/
│           └── TradeModal/
│
├── pages/
│   └── dashboard/
│       ├── DashboardHome.tsx
│       ├── PortfolioView.tsx
│       ├── PortfolioBuilder.tsx
│       ├── RecommendationsView.tsx
│       ├── WalletView.tsx
│       ├── NewsView.tsx
│       ├── ChatView.tsx
│       └── SettingsView.tsx
│
└── routes/
    └── dashboardRoutes.tsx
```

---

**FIN DEL DOCUMENTO DE DISEÑO**

Este documento debe ser la guía completa para implementar el dashboard de SENTINEL. Cualquier decisión de implementación no cubierta aquí debe seguir los principios establecidos en SENTINEL-SPECS.md y la documentación del design system.