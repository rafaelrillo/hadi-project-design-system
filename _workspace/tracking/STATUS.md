# SENTINEL Design System - Status

> Current state of the SENTINEL Design System project.

**Last Updated**: 2026-02-11
**Last Checkpoint**: 2026-02-11 (Quafi Modules + FING->Quafi Rebrand)
**Active Instance**: Current
**Branch**: `feature/quafi-modules`

---

## Current Work

| Item | Status | Notes |
|------|--------|-------|
| FING -> Quafi Rebrand | COMPLETE | All user-visible text renamed |
| Project structure setup | Done | claude-dev-starter tracking added |
| Design System Audit | Done | Found duplications in theme.css |
| Design System Consolidation v2 | COMPLETE | All 8 phases, 82KB to 41KB (50% reduction) |
| Monorepo Preparation | COMPLETE | All 8 phases (0-7) done |
| Hadi Backend Integration | COMPLETE | MVP Calibrate page working end-to-end |
| **Quafi Modules** | **COMPLETE** | 3 modules: Calibrate (rewrite), Simulate (new), Reports (new) |

---

## Quafi Modules (2026-02-11, Session 3)

### Overview
Implemented 3 financial modules based on Facu's PDF specs (`facus-files/`). All modules consume the Hadi backend (only 2 endpoints: `POST /quick/execute` and `POST /quick/benchmark`). All advanced calculations run 100% in frontend via a new `mathEngine`.

### Branch
`feature/quafi-modules` (from `redesign/stock-market-ui`)

### Architecture

```
                      ┌─────────────────────────────────────┐
                      │           Hadi Backend (:8000)       │
                      │  POST /quick/execute  (Alg1 + Alg2) │
                      │  POST /quick/benchmark               │
                      │  GET /health                          │
                      └──────────────┬──────────────────────┘
                                     │ HTTP
    ┌────────────────────────────────┼────────────────────────────────┐
    │                    Sentinel Frontend (:5173)                    │
    │                                                                 │
    │  Services                                                       │
    │  ├── hadi/hadiService.ts      HTTP client                      │
    │  ├── hadi/mathEngine.ts       Pure math (TWR, Beta, MC, etc.)  │
    │  ├── hadi/riskProfiles.ts     Risk → ticker universe mapping   │
    │  └── hadi/tickerDirectory.ts  ~100 US stocks + search          │
    │                                                                 │
    │  Stores (Zustand)                                               │
    │  ├── calibrationStore.ts      Calibrate state + Market Scan    │
    │  ├── simulationStore.ts       Simulate wizard state            │
    │  └── reportStore.ts           Reports state + metrics          │
    │                                                                 │
    │  Pages                                                          │
    │  ├── RecommendationsView/     Calibrate (Basic + Pro)          │
    │  ├── SimulateView/            Simulate (3-step wizard)         │
    │  ├── ReportsView/             Reports (4 sections)             │
    │  └── DashboardPage/           Home (auto-populates from data)  │
    │                                                                 │
    │  Navigation: 6 items                                            │
    │  Home | Portfolio | Calibrate | Simulate | Reports | News      │
    └─────────────────────────────────────────────────────────────────┘
```

### Module 1: Calibrate (Rewrite of RecommendationsView)

**Route**: `/app/dashboard/recommendations`

Rewritten from scratch with two flows:

**Basic Tab**: Select tickers, adjust params (alpha_1, alpha_2, beta), run optimization + benchmark. Results: cumulative returns LineChart, MetricCards (Return, Volatility, Sharpe, Alpha), PieChart allocation, orders table with quantities and dollar amounts.

**Pro Tab (Market Scan)**: Scans ~49 tickers across the market. Shows:
- Opportunities: top tickers NOT in portfolio with high utility score (checkboxes to add)
- Rotation: tickers IN portfolio with low utility score (checkboxes to remove)
- Recalculate button: re-optimizes with modified universe
- Updated charts, allocation, and orders table

**Files**:
- `src/store/calibrationStore.ts` — extended with Market Scan, opportunities/rotation, orders, activeTab
- `src/pages/app/RecommendationsView/RecommendationsView.tsx` — complete rewrite
- `src/pages/app/RecommendationsView/RecommendationsView.module.css` — complete rewrite (v4.0)

### Module 2: Simulate (New)

**Route**: `/app/dashboard/simulate`

3-step wizard for building a portfolio from scratch:

**Step 1 — Configure**: Risk profile selector (Conservative/Balanced/Aggressive), investment term (Short/Medium/Long), amount input with presets, RadarChart preview of profile characteristics.

**Step 2 — Results**: MetricCards (Expected Return, Volatility, Sharpe, Utility), PieChart allocation, ticker table with weights/quantities/values.

**Step 3 — Decision**: Two scenario cards side by side:
- Scenario A (Buy): Inject new capital, all BUY orders
- Scenario B (Substitute): Sell hypothetical current holdings + buy optimized portfolio, penalized by turnover cost
- Both scenarios have a "Use as Portfolio" button that copies tickers + capital to calibrationStore and navigates to Calibrate

**Files**:
- `src/store/simulationStore.ts` — Zustand store with risk profiles, scenarios, orders
- `src/pages/app/SimulateView/SimulateView.tsx` — 3-step wizard component
- `src/pages/app/SimulateView/SimulateView.module.css` — full neumorphic CSS
- `src/pages/app/SimulateView/index.ts` — barrel export

### Module 3: Reports (New)

**Route**: `/app/dashboard/reports`

4 tabbed sections (financial report visualization):

**Section 1 — The Pulse** (Executive Summary): MetricCards (Portfolio Value, TWR, Real Return, Sharpe), LineChart portfolio evolution, PieChart + top 10 holdings table.

**Section 2 — The Market Race** (Benchmarking): LineChart portfolio vs SPY vs QQQ, comparison table (Return, Spread, Beat/Behind badges), MetricCards (Beta, Max Drawdown, Volatility).

**Section 3 — The Engine** (Composition & Risk): Large PieChart with labels + legend, HeatMap correlation matrix with color-coded values.

**Section 4 — The Harvest** (Projection): Monte Carlo GBM LineChart (optimistic/base/pessimistic cones), projection summary table at 3/6/12 months.

**Files**:
- `src/store/reportStore.ts` — Zustand store with benchmarks, metrics, correlation, Monte Carlo
- `src/pages/app/ReportsView/ReportsView.tsx` — 4-section tabbed report
- `src/pages/app/ReportsView/ReportsView.module.css` — full neumorphic CSS
- `src/pages/app/ReportsView/index.ts` — barrel export

### Shared Infrastructure

**Math Engine** (`src/services/hadi/mathEngine.ts`):
Pure functions for financial calculations:
- `calculateTWR()` — Time-Weighted Return (GIPS 2.A.2)
- `calculateRealReturn()` — Fisher equation (inflation-adjusted)
- `calculateVolatility()` — Annualized standard deviation
- `toLogReturns()` — Price series to log returns
- `calculateCorrelationMatrix()` — Pearson correlation for HeatMap
- `calculateBeta()` — Systematic risk vs benchmark
- `calculateMaxDrawdown()` — Peak-to-trough decline
- `calculateMonteCarloProjection()` — Parametric GBM (base + 95% CI)
- `calculateSharpe()` — Sharpe ratio

**Risk Profiles** (`src/services/hadi/riskProfiles.ts`):
- 3 profiles: Low (bonds/ETFs), Medium (mix), High (growth/tech)
- 3 terms: Short (8 tickers), Medium (12), Long (18)
- `getTickerUniverse(profile, term)` — filtered ticker list
- `getProfileRadarData(profile)` — radar chart data
- `APPROX_PRICES` — ~50 approximate prices for order calculations

### Cross-Module Integration

**Simulate -> Calibrate**: "Use as Portfolio" button in Step 3 copies optimized tickers + capital to calibrationStore and navigates to `/app/dashboard/recommendations`.

**Calibrate -> Home**: DashboardPage auto-runs optimization on mount if calibrationStore has tickers but no results. KPIs update with real data:
- SCORE: Sharpe ratio scaled 0-100
- RISK: Annualized volatility as integer
- YTD: Total cumulative return
- Top Buys: From market scan opportunities or top-weighted tickers

**Flow**: Simulate -> Use as Portfolio -> Calibrate -> Home (auto-populates)

### Bug Fixes Applied

After initial implementation, audited all 3 modules and fixed:

1. **Calibrate**: Deduplicated tickers in `recalculateWithSelections` using `new Set()`. Fixed non-null assertion with optional chaining.
2. **Simulate**: Differentiated Scenario A (pure BUY) from Scenario B (SELL_ALL + BUY with turnover penalty). Separate `metricsAfterBuy` and `metricsAfterSub` objects. Step 3 shows sell/buy sections separately for Scenario B.
3. **Reports**: Replaced `Promise.all` with `Promise.allSettled` for benchmark calls (partial failure resilience). Added `safeNum()` NaN/Infinity guards on all metrics. Replaced `Math.random()` correlation noise with deterministic sin-based dispersion (reproducible results). SPY benchmark lookup by `.symbol` instead of array index.

### Routing & Navigation Changes

**Modified**:
- `src/routes/appRoutes.tsx` — added lazy imports + routes for SimulateView and ReportsView
- `src/layouts/DashboardLayout/DashboardLayout.tsx` — added Simulate (PlayCircle) and Reports (FileText) to nav (6 total items)
- `src/pages/app/index.ts` — added SimulateView and ReportsView exports
- `src/store/index.ts` — added simulationStore and reportStore exports
- `src/services/hadi/index.ts` — added mathEngine and riskProfiles exports
- `src/pages/app/DashboardPage/DashboardPage.tsx` — connected to calibrationStore for live KPIs

### Design System Components Used

| Component | Used In | Purpose |
|-----------|---------|---------|
| LineChart | Calibrate, Reports | Cumulative returns, evolution, Monte Carlo |
| PieChart | Calibrate, Simulate, Reports | Allocation weights |
| RadarChart | Simulate | Risk profile visualization |
| HeatMap | Reports | Correlation matrix |
| MetricCard | All modules | KPI display |
| Button | All modules | Actions |
| Slider | Calibrate | Parameter adjustment |

### FING -> Quafi Rebrand

Renamed all user-visible "FING"/"Fing"/"fing" text to "Quafi"/"quafi" across the app.

**What changed (10 files)**:
| File | Change |
|------|--------|
| `index.html` | `<title>Quafi</title>`, meta description |
| `package.json` | name: `quafi-design-system`, description updated |
| `src/components/atoms/FingWordmark/FingWordmark.tsx` | Both render outputs: "fing" -> "quafi" |
| `src/components/atoms/FingEmblem/FingEmblem.tsx` | Wordmark text: "fing" -> "quafi" |
| `src/pages/app/LoginPage/LoginPage.tsx` | Subtitle "Investment engine.", placeholder "@quafi.io" |
| `src/pages/FingHome/FingHome.tsx` | Descriptor, voice headline ("Quafi is the senior analyst"), footer |
| `src/pages/Landing/components/LandingNav/LandingNav.tsx` | Logo text: "quafi" |
| `src/pages/Landing/components/LandingHero/LandingHero.tsx` | Brand name h1, philosophy text |
| `src/pages/Landing/components/LandingFooter/LandingFooter.tsx` | Logo "Q"+"QUAFI", copyright |

**What was NOT changed (intentionally)**:
- Component/file names (FingWordmark, FingEmblem, FingHome, FingDashboard) — would break imports everywhere
- CSS variable names (--fing-*) — internal, not visible to users
- Store persistence names ("fing-auth", "fing-wallet") — localStorage keys
- Showcase/brand documentation pages — separate concern, can be updated later
- Comments — internal only

---

### How to Run

```bash
# Terminal 1: Hadi backend
cd projects/Hadi/backend
./venv/bin/python -m uvicorn app.main:app --port 8000

# Terminal 2: Sentinel frontend
cd projects/hadi-project-design-system
npm run dev

# Routes
http://localhost:5173/app/dashboard                  # Home (auto-populates)
http://localhost:5173/app/dashboard/recommendations  # Calibrate
http://localhost:5173/app/dashboard/simulate          # Simulate
http://localhost:5173/app/dashboard/reports            # Reports
```

---

## Files Created/Modified (This Session)

### New Files (14)
| File | Purpose |
|------|---------|
| `src/services/hadi/mathEngine.ts` | Pure math engine (TWR, Beta, MC, etc.) |
| `src/services/hadi/riskProfiles.ts` | Risk profile -> ticker universe mapping |
| `src/store/simulationStore.ts` | Zustand store for Simulate module |
| `src/store/reportStore.ts` | Zustand store for Reports module |
| `src/pages/app/SimulateView/SimulateView.tsx` | 3-step wizard component |
| `src/pages/app/SimulateView/SimulateView.module.css` | Simulate styles |
| `src/pages/app/SimulateView/index.ts` | Barrel export |
| `src/pages/app/ReportsView/ReportsView.tsx` | 4-section report component |
| `src/pages/app/ReportsView/ReportsView.module.css` | Reports styles |
| `src/pages/app/ReportsView/index.ts` | Barrel export |

### Modified Files (8)
| File | Change |
|------|--------|
| `src/store/calibrationStore.ts` | Added Market Scan, opportunities, rotation, orders, Pro tab |
| `src/pages/app/RecommendationsView/RecommendationsView.tsx` | Complete rewrite — Basic + Pro tabs |
| `src/pages/app/RecommendationsView/RecommendationsView.module.css` | Complete rewrite v4.0 |
| `src/pages/app/DashboardPage/DashboardPage.tsx` | Connected to calibrationStore, auto-run, live KPIs |
| `src/routes/appRoutes.tsx` | Added SimulateView + ReportsView routes |
| `src/layouts/DashboardLayout/DashboardLayout.tsx` | Added 2 nav items (6 total) |
| `src/pages/app/index.ts` | Added SimulateView + ReportsView exports |
| `src/store/index.ts` | Added simulationStore + reportStore exports |
| `src/services/hadi/index.ts` | Added mathEngine + riskProfiles exports |

---

## Session State

```yaml
session:
  started: 2026-02-11
  last_checkpoint: "2026-02-11 Quafi Modules — 3 modules complete + cross-module integration"
  branch: feature/quafi-modules
  focus: "Implement Calibrate + Simulate + Reports modules from Facu's specs"

  completed_this_session:
    - "Read and analyzed 4 PDFs from facus-files/"
    - "Created mathEngine.ts (9 pure math functions)"
    - "Created riskProfiles.ts (3 profiles, 3 terms, ~50 tickers)"
    - "Created simulationStore.ts (Zustand, 3-step wizard state)"
    - "Created reportStore.ts (Zustand, 4-section report state)"
    - "Created SimulateView (TSX + CSS + index)"
    - "Created ReportsView (TSX + CSS + index)"
    - "Rewrote calibrationStore (Market Scan, Pro tab, orders)"
    - "Rewrote RecommendationsView (Basic + Pro tabs)"
    - "Updated routing (2 new routes) + nav (6 items)"
    - "Audited all 3 modules, found and fixed 8 bugs"
    - "Connected Simulate -> Calibrate (Use as Portfolio button)"
    - "Connected Calibrate -> Home (auto-run, live KPIs)"
    - "Build passes clean (tsc + vite)"

  pending:
    - "Commit all changes to feature/quafi-modules branch"
    - "UI polish: loading states, error edge cases"
    - "Phase 2 (centralized types) — still deferred"
    - "Move files to @fing/* monorepo packages"
    - "Tests for mathEngine + stores"

  blockers: []
```

---

## Previous Sessions

### Session 2 (2026-02-11): Hadi Backend Integration
- Connected Hadi backend to Sentinel
- Created hadiService, calibrationStore, tickerDirectory
- Built initial Calibrate page (MVP)
- See CHANGELOG.md for details

### Session 1 (2026-02-11): Monorepo Preparation
- 8 phases: barrel exports, routing split, engines, library mode, monorepo scaffold
- See CHANGELOG.md for details
