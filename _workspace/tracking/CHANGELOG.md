# QUAFI Design System - Tracking Changelog

> Session tracking for claude-dev-starter integration.

**Note**: Historical changes are documented in `/CHANGELOG.md` (root level).

---

## 2026-03-02 (Session 4)

### Session: Complete FING/SENTINEL → QUAFI Rebrand

**Focus**: Rename all internal references from FING/SENTINEL to QUAFI across the entire codebase.

**Branch**: `feature/quafi-modules`

**Scope**:
- ~8,000 CSS variable occurrences (`--fing-*` → `--quafi-*`)
- ~600 CSS variable occurrences (`--sentinel-*` → `--quafi-*`)
- Component directories and files
- ECharts theme
- Animation classes
- Storage keys
- GitHub repository name

**Files Modified (378 total)**:

| Category | Count | Examples |
|----------|-------|----------|
| CSS in src/styles/ | 15 | colors.css, typography.css, shadows.css, etc. |
| ECharts theme | 1 | fingTheme.ts → quafiTheme.ts |
| Component directories | 6 | FingEmblem/, FingWordmark/, fing/, FingHome/, etc. |
| Component CSS modules | 100+ | All *.module.css files |
| TSX files | 150+ | All components using CSS variables |
| Documentation | 3 | CLAUDE.md, README.md, DESIGN_SYSTEM_PLAN.md |

**Key Renames**:

| Before | After |
|--------|-------|
| `--fing-*` | `--quafi-*` |
| `--sentinel-*` | `--quafi-*` |
| `fingTheme.ts` | `quafiTheme.ts` |
| `fingColors` | `quafiColors` |
| `FingEmblem` | `QuafiEmblem` |
| `FingWordmark` | `QuafiWordmark` |
| `atoms/fing/` | `atoms/quafi/` |
| `molecules/fing/` | `molecules/quafi/` |
| `organisms/fing/` | `organisms/quafi/` |
| `pages/FingHome/` | `pages/QuafiHome/` |
| `layouts/FingDashboard/` | `layouts/QuafiDashboard/` |
| `.fing-animate-*` | `.quafi-animate-*` |
| `fing-auth` | `quafi-auth` |
| `hadi-project-design-system` | `quafi-design-system` |

**Build Fixes**:
1. Import path `atoms/fing` → `atoms/quafi` in Watchlist.tsx
2. "Fingerprint" icon incorrectly renamed to "Quafierprint" — reverted
3. Import path `organisms/fing` → `organisms/quafi` in Level4Showcase.tsx

**Commit**: `refactor: complete FING/SENTINEL to QUAFI rebrand` (378 files)

**Repository Rename**:
- GitHub: `gh repo rename quafi-design-system`
- Local folder: `mv hadi-project-design-system quafi-design-system`
- Remote URL updated automatically by gh CLI

---

## 2026-03-02 (Session 3)

### Session: Coming Soon + Deploy + Product Documentation

**Focus**: Create Coming Soon page for quafi.io and document the product.

**Branch**: `feature/quafi-modules`

**Files Created**:

| File | Purpose |
|------|---------|
| `coming-soon/index.html` | Static coming soon page |
| `coming-soon/styles.css` | Stone Marble styles + animations |
| `docs/QUAFI_PRODUCT.md` | Product definition (source of truth) |
| `docs/QUAFI_UNIFIED_VISION.md` | Synthesis of all documentation |
| `docs/CLOUDFLARE_DEPLOY.md` | Deploy documentation |
| `.github/workflows/deploy-coming-soon.yml` | Auto-deploy workflow |

**Deployed**: quafi.io LIVE via Cloudflare Pages

**Auto-deploy**: GitHub Actions with Wrangler CLI

---

## 2026-02-11 (Session 3)

### Session: Quafi Modules + FING->Quafi Rebrand

**Focus**: Implement 3 financial modules from Facu's PDF specs. All modules consume Hadi backend (2 endpoints only), advanced math runs in frontend.

**Branch**: `feature/quafi-modules` (from `redesign/stock-market-ui`)

**Specs Read (4 PDFs in `facus-files/`)**:
- `Spec_Calibrar.pdf` — Calibration (Basic rebalancing + Pro market scan)
- `Spec_Simular.pdf` — Simulation (3-step wizard: configure -> results -> execute)
- `spec_reporte_v4.pdf` — Reports (4-page financial report: Pulse, Market Race, Engine, Harvest)
- `Spec_Reporte_Matemáticas.pdf` — Math specs (TWR GIPS, Fisher, Pearson, Beta, Drawdown, Monte Carlo GBM)

**New Files Created (14)**:
| File | Purpose |
|------|---------|
| `src/services/hadi/mathEngine.ts` | 9 pure math functions: TWR, Fisher, Volatility, LogReturns, Pearson Correlation, Beta, MaxDrawdown, Monte Carlo GBM, Sharpe |
| `src/services/hadi/riskProfiles.ts` | 3 risk profiles (low/medium/high) x 3 terms (short/medium/long), ticker universes, radar chart data, ~50 approximate prices |
| `src/store/simulationStore.ts` | Zustand store: risk profile, term, amount, 3 steps, 2 scenarios (Buy vs Substitute), separate metrics per scenario |
| `src/store/reportStore.ts` | Zustand store: tickers, optimize + benchmarks (Promise.allSettled), derived metrics with NaN guards, deterministic correlation matrix, Monte Carlo projection |
| `src/pages/app/SimulateView/SimulateView.tsx` | 3-step wizard: Configure (risk/term/amount/radar) -> Results (metrics/pie/table) -> Decision (2 scenario cards with Use as Portfolio) |
| `src/pages/app/SimulateView/SimulateView.module.css` | Neumorphic CSS: step indicators, config grid, option buttons, scenario cards, loading overlay |
| `src/pages/app/SimulateView/index.ts` | Barrel export |
| `src/pages/app/ReportsView/ReportsView.tsx` | 4 tabbed sections: Pulse (KPIs + LineChart + holdings), Market Race (benchmark LineChart + comparison table), Engine (PieChart + HeatMap), Harvest (Monte Carlo + projection table) |
| `src/pages/app/ReportsView/ReportsView.module.css` | Neumorphic CSS: section tabs, ticker bar, comparison table, heatmap, projection table |
| `src/pages/app/ReportsView/index.ts` | Barrel export |

**Files Modified (9)**:
| File | Change |
|------|--------|
| `src/store/calibrationStore.ts` | Extended: Market Scan (~49 tickers), opportunities/rotation lists, orders with APPROX_PRICES, activeTab (basic/pro), investmentCapital, recalculateWithSelections with Set dedup |
| `src/pages/app/RecommendationsView/RecommendationsView.tsx` | Complete rewrite: Basic tab (existing flow + orders table) + Pro tab (Market Scan, checkboxes, recalculate). Fixed non-null assertion with optional chaining |
| `src/pages/app/RecommendationsView/RecommendationsView.module.css` | Complete rewrite v4.0: tab toggle, capital input, orders table, scan prompt, scan list, recalculate bar |
| `src/pages/app/DashboardPage/DashboardPage.tsx` | Connected to calibrationStore: auto-runs optimization on mount if tickers exist. KPIs (Score/Risk/YTD) from real data. Top Buys from market scan or optimize weights. Loading state ("...") |
| `src/routes/appRoutes.tsx` | Added lazy imports + routes: `/app/dashboard/simulate`, `/app/dashboard/reports` |
| `src/layouts/DashboardLayout/DashboardLayout.tsx` | Added 2 nav items: Simulate (PlayCircle icon), Reports (FileText icon). Total: 6 items |
| `src/pages/app/index.ts` | Added SimulateView and ReportsView exports |
| `src/store/index.ts` | Added simulationStore and reportStore exports |
| `src/services/hadi/index.ts` | Added mathEngine and riskProfiles exports |

**Bug Fixes (8 issues found via audit, all fixed)**:
1. Calibrate: Deduplicated tickers in `recalculateWithSelections` with `new Set()`
2. Calibrate: Replaced non-null assertion `!` with optional chaining `?.` + `?? 0`
3. Simulate: Differentiated Scenario A (pure BUY with new capital) from Scenario B (SELL_ALL old + BUY new with turnover penalty)
4. Simulate: Created separate `metricsAfterBuy` and `metricsAfterSub` objects (were identical)
5. Simulate: Step 3 Scenario B now shows Sell Orders and Buy Orders as separate sections
6. Reports: Replaced `Promise.all` with `Promise.allSettled` for benchmark fetches (partial failure resilience)
7. Reports: Added `safeNum()` helper — NaN/Infinity guards on all metric values
8. Reports: Replaced `Math.random()` correlation noise with deterministic sin-based dispersion (golden angle seed per ticker index)

**Cross-Module Integration (2 connections)**:
1. **Simulate -> Calibrate**: "Use as Portfolio" button copies `targetTickers` + `amount` to `calibrationStore`, clears old results, navigates to `/app/dashboard/recommendations`
2. **Home auto-populate**: DashboardPage checks calibrationStore on mount — if tickers >= 2 and no results, auto-runs `checkBackend()` + `runFullAnalysis()`. KPIs and Top Buys update with real data from Hadi

**Build Verification**:
- 5 unused import errors found and fixed during initial build
- All subsequent builds pass clean (`tsc && vite build` in ~5s)
- No TypeScript errors

**Key Decisions**:
- All math runs in frontend (mathEngine.ts) — backend only has 2 endpoints
- Correlation matrix uses deterministic pseudo-noise (not random) for reproducibility
- Scenario B has 0.3% turnover penalty and 0.5% utility discount vs Scenario A
- Home shows "..." while auto-optimization runs, falls back to hardcoded defaults if no data
- Risk profiles map to curated ticker lists (not dynamic from any API)
- Reports uses Promise.allSettled so a failed SPY benchmark doesn't kill the whole report

### FING -> Quafi Rebrand (User-visible text only)

Renamed all user-visible brand text from "FING" to "Quafi" across 10 files:
- `index.html` — title + meta description
- `package.json` — name + description
- `FingWordmark.tsx` — both render variants: "fing" -> "quafi"
- `FingEmblem.tsx` — wordmark text: "fing" -> "quafi"
- `LoginPage.tsx` — subtitle "Investment engine.", placeholder "@quafi.io"
- `FingHome.tsx` — descriptor, voice headline, footer
- `LandingNav.tsx` — logo text
- `LandingHero.tsx` — brand name h1, philosophy text
- `LandingFooter.tsx` — logo "Q"+"QUAFI", copyright

Not renamed (intentionally at that time): component/file names, CSS variables (--fing-*), store persistence keys, showcase pages, comments.

---

## 2026-02-11 (Session 2)

### Session: Hadi Backend Integration — MVP Calibrate

**Focus**: Connect Hadi backend (FastAPI portfolio optimization by Agustin) to Sentinel frontend. Build a Calibrate page where users can simulate portfolios, adjust behavioral parameters, and compare against benchmarks.

**Key Rule**: Hadi repo (GitHub clone) is READ-ONLY. All work happens in Sentinel.

**Hadi Backend**: `https://github.com/maudrani/Hadi.git` — cloned to `projects/Hadi/`
- FastAPI, Python 3.13, port 8000
- Agustin's asymmetric behavioral utility algorithm (alpha_1=3.73, alpha_2=5.22, beta=0.9965)
- Endpoints: `POST /quick/execute` (optimize), `POST /quick/benchmark` (benchmark vs SPY)
- Branch `integration/monorepo-prep` created (read-only, no changes made)

**Files Created (5)**:
| File | Purpose |
|------|---------|
| `src/services/hadi/types.ts` | TypeScript interfaces matching Hadi's Pydantic models |
| `src/services/hadi/hadiService.ts` | HTTP client: optimize(), benchmark(), healthCheck() |
| `src/services/hadi/index.ts` | Barrel exports |
| `src/services/hadi/tickerDirectory.ts` | Static list of ~100 popular US stocks + searchTickers() |
| `src/store/calibrationStore.ts` | Zustand store: params, results, API actions |

**Files Modified (5)**:
| File | Change |
|------|--------|
| `src/config/env.ts` | Added `hadiUrl` to api config |
| `src/services/index.ts` | Added hadi service exports |
| `src/store/index.ts` | Added calibrationStore export |
| `src/pages/app/RecommendationsView/RecommendationsView.tsx` | Complete rewrite to Calibrate UI |
| `src/pages/app/RecommendationsView/RecommendationsView.module.css` | Complete rewrite — glass-neumorphism calibrate layout |

**Calibrate Page Features**:
- Two-column layout: config panel (left) + results panel (right)
- Ticker search with autocomplete dropdown (~100 stocks, filters by symbol + company name)
- 3 parameter sliders: Loss Aversion (alpha_1), Risk Aversion (alpha_2), Time Decay (beta)
- Benchmark selector: SPY, QQQ, IWM, DIA
- Date range inputs
- Results: LineChart (cumulative returns), 4 MetricCards, PieChart (allocation), convergence info
- Backend status indicator (green/red dot)
- Responsive: single-column on mobile

---

## 2026-02-11 (Session 1)

### Session: Monorepo Preparation (8 Phases)

**Focus**: Prepare Sentinel for monorepo architecture so external business logic can connect

**Phases Completed**:
1. Phase 0: Fixed build — removed 6 unused imports (4 files)
2. Phase 1: Created barrel exports — `atoms/index.ts` (19), `molecules/index.ts` (12+)
3. Phase 2: Types research — DEFERRED (found duplicates across stores/services)
4. Phase 3: Decoupled `portfolioStore` from `marketStore` (parameter injection)
5. Phase 4: Vite library mode — `vite.config.lib.ts`, `tsconfig.lib.json`, 301 `.d.ts`
6. Phase 5: Split routing — `App.tsx` 280 -> 25 lines, `appRoutes.tsx` + `showcaseRoutes.tsx`
7. Phase 6: Extracted 4 pure engines (`tradingEngine`, `portfolioEngine`, `recommendationEngine`, `indicatorEngine`) + refactored 3 stores
8. Phase 7: Scaffolded monorepo — pnpm + Turborepo, 5 packages + 2 apps, 7/7 build

---

## 2026-02-05

### Session: Design System Consolidation (Phases 7-8)
- Phase 7: Created `animations.css`, `buttons.css`, `wordmark.css`
- Phase 8: Reduced `theme.css` 65KB to 41KB, migrated 20+ components
- Commit: `6e50182` — 49 files, +4493/-1317 lines

---

## 2026-02-04

### Session: claude-dev-starter Integration
- Added _workspace/ tracking structure
- Added .claude/commands and .claude/skills
- Initialized STATUS.md with current project state

---

## Historical Reference

See `/CHANGELOG.md` for complete project history including:
- Design System Consolidation (2026-01-27)
- Natural Mineral Color Palette (2026-01-19)
- QUAFI Wordmark System (2026-01-19)
- QUAFI Emblem (2026-01-18)
- Stone Marble Design System (2026-01-17)
