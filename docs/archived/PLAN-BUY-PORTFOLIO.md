# Plan: Connected App Architecture

## Vision
La app está completamente conectada:
1. **Portfolio** → Tu cartera de acciones (después de elegir uno de 3 portfolios)
2. **Recommendations** → Comprar/vender modifica tu portfolio directamente
3. **News** → Solo noticias de empresas en tu portfolio

## Current Architecture

### portfolioStore.ts
- `holdings[]` - Acciones que posees
- `executeTrade(trade)` - Compra/vende acciones (ya implementado!)
- `updateHoldingsWithMarketData()` - Actualiza precios

### recommendationsStore.ts
- Genera recomendaciones buy/sell
- Actualmente desconectado del portfolio

### newsStore.ts
- `filterByTickers(tickers)` - YA PUEDE filtrar por tickers!
- Solo necesita conectarse al portfolio

## Implementation Plan

### Phase 1: Portfolio Templates & Selection
**Objetivo**: Usuario elige 1 de 3 portfolios recomendados

1. **Agregar a portfolioStore**:
   ```typescript
   // Nuevos estados
   availablePortfolios: PortfolioTemplate[]  // 3 portfolios
   selectedPortfolioId: string | null        // Portfolio elegido

   // Nuevas acciones
   selectPortfolio(id: string)               // "Comprar" portfolio
   ```

2. **Crear PortfolioTemplate type**:
   ```typescript
   interface PortfolioTemplate {
     id: string;
     name: string;
     description: string;
     riskLevel: 'conservative' | 'moderate' | 'aggressive';
     expectedReturn: number;
     holdings: PortfolioHolding[];  // Acciones pre-armadas
   }
   ```

3. **UI Flow**:
   - Si `selectedPortfolioId === null` → Mostrar selección
   - Si `selectedPortfolioId !== null` → Mostrar portfolio actual

### Phase 2: Connect Recommendations → Portfolio
**Objetivo**: Buy/Sell recomendaciones modifican el portfolio

1. **Modificar RecommendationsView**:
   - Botón "Add to Portfolio" → llama `executeTrade()`
   - Trade ya implementado en portfolioStore

2. **Modificar AddToPortfolioModal**:
   - Conectar con `usePortfolioStore().executeTrade()`
   - Usar cash disponible del portfolio

### Phase 3: Connect News → Portfolio
**Objetivo**: News solo muestra noticias de acciones en portfolio

1. **Agregar hook usePortfolioTickers()**:
   ```typescript
   const tickers = usePortfolioStore(s => s.holdings.map(h => h.symbol));
   ```

2. **Modificar NewsView**:
   - Al cargar, filtrar por tickers del portfolio
   - `newsStore.filterByTickers(portfolioTickers)`

## Files to Modify

| File | Changes |
|------|---------|
| `src/store/portfolioStore.ts` | Add templates, selection |
| `src/pages/app/DashboardPage` | Portfolio selection UI |
| `src/pages/app/RecommendationsView` | Connect to executeTrade |
| `src/pages/app/NewsView` | Filter by portfolio tickers |
| `src/components/organisms/AddToPortfolioModal` | Use real trade |

## Mock Data: 3 Portfolio Templates

1. **Conservative Growth**
   - Risk: Low | Expected: 6-8%
   - Heavy: JNJ, PG, KO, VZ, T

2. **Balanced Growth**
   - Risk: Moderate | Expected: 10-12%
   - Mix: AAPL, MSFT, GOOGL, JNJ, PG

3. **Aggressive Growth**
   - Risk: High | Expected: 15-20%
   - Tech: NVDA, TSLA, AMD, META, AMZN
