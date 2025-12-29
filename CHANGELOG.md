# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2025-12-29

### Fixed

#### Dashboard Loading State
- **Problem**: The dashboard navbar displayed "LOADING..." indefinitely when the Finnhub API was slow or rate-limited (60 requests/minute limit)
- **Solution**: Added a 10-second timeout to `fetchStocks` in `src/store/marketStore.ts`
- **File**: `src/store/marketStore.ts:85-122`
- **Details**:
  - Implemented `Promise.race` between the API call and a timeout promise
  - If the API doesn't respond within 10 seconds, the app gracefully falls back to cached mock data
  - The error state now shows "Mock (cached)" as the data source

```typescript
// Create timeout promise (10 seconds max)
const timeoutPromise = new Promise<never>((_, reject) =>
  setTimeout(() => reject(new Error("API request timeout")), 10000)
);

// Race between actual fetch and timeout
const stocks = await Promise.race([
  marketService.getStocks(),
  timeoutPromise,
]);
```

#### Market Section Charts Not Displaying Data
- **Problem**: The Stock Price Trends chart and Market Capitalization TreeMap in the Market tab showed "No data available"
- **Cause**: The chart data was initialized as an empty array `[]` and only populated via `useEffect`, causing a timing issue where the first render showed empty state
- **Solution**: Changed from `useState + useEffect` to `useMemo` for immediate data computation
- **File**: `src/pages/app/DashboardPage/DashboardPage.tsx:222-244`
- **Details**:
  - Chart data is now computed synchronously using `useMemo`
  - Uses the mock data already initialized in the store
  - Charts display immediately on first render

```typescript
// Before (caused empty state on first render)
const [stocksChartData, setStocksChartData] = useState([]);
useEffect(() => {
  if (stocks.length === 0) return;
  // ... generate data
  setStocksChartData(chartData);
}, [stocks]);

// After (immediate data on render)
const stocksChartData = useMemo(() => {
  if (stocks.length === 0) return [];
  // ... generate data
  return chartData;
}, [stocks]);
```

#### Recommendations Section Responsive Layout
- **Problem**: CSS media query used `flex-direction: column` on a grid layout element
- **Solution**: Fixed to use `grid-template-columns: 1fr` for proper responsive behavior
- **File**: `src/pages/app/DashboardPage/DashboardPage.module.css:665-671`

```css
/* Before */
.recommendationItem {
  flex-direction: column; /* Wrong - element uses grid */
}

/* After */
.recommendationItem {
  grid-template-columns: 1fr; /* Correct - single column grid */
}

.tradePanel {
  order: -1; /* Show trade panel first on mobile */
}
```

### Changed

#### Landing Page CTA Button
- **Change**: Updated the primary CTA button on the landing page hero section
- **Before**: "Access Dashboard" → navigated to `/app/login`
- **After**: "Explore Design System" → navigates to `/showcase`
- **File**: `src/pages/Landing/components/LandingHero/LandingHero.tsx:146-151`
- **Reason**: The button now leads users directly to the design system showcase where all components are documented

### Summary of Modified Files

| File | Changes |
|------|---------|
| `src/store/marketStore.ts` | Added 10-second timeout to prevent infinite loading |
| `src/pages/app/DashboardPage/DashboardPage.tsx` | Changed chart data from useState to useMemo |
| `src/pages/app/DashboardPage/DashboardPage.module.css` | Fixed responsive grid layout for recommendations |
| `src/pages/Landing/components/LandingHero/LandingHero.tsx` | Changed CTA button to link to design system |

### Technical Notes

#### Finnhub API Rate Limiting
The Finnhub free tier allows 60 API calls per minute. With 16 stocks and potential company info calls, fetching can take 30+ seconds sequentially. The timeout ensures the UI remains responsive.

#### Data Flow Architecture
```
Store (mock data) → useMemo (chart data) → Chart Component
         ↓
    API fetch (async, with timeout)
         ↓
    Update store → useMemo recalculates → Chart updates
```

This architecture ensures:
1. Immediate UI render with mock data
2. Background API fetch with timeout protection
3. Seamless update when real data arrives
