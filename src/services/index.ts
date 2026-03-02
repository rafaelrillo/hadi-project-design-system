// Path: src/services/index.ts

// API Client
export * from "./api";

// Adapters
export * from "./adapters";

// Services
export { marketService } from "./market";
export type { MarketServiceConfig } from "./market";

export { portfolioService } from "./portfolio";
export type {
  TradeOrder,
  TradeResult,
  PortfolioData,
  PortfolioServiceConfig,
} from "./portfolio";

export { authService } from "./auth";
export type {
  LoginCredentials,
  LoginResponse,
  AuthServiceConfig,
} from "./auth";

// Tiingo Service
export {
  tiingoService,
  TiingoAdapter,
  TiingoError,
  POPULAR_TICKERS,
} from "./tiingo";
export type {
  TiingoTickerMeta,
  TiingoPriceEOD,
  TiingoIEXPrice,
  TiingoNews,
  TiingoNewsParams,
} from "./tiingo";

// Recommendation Engine
export { recommendationEngine } from "./recommendations";
export type {
  StockRecommendation,
  DailyRecommendations,
  RecommendationFactor,
  RecommendationAction,
  ConfidenceLevel,
  TimeHorizon,
  PriceTarget,
  RecommendationFilters,
} from "./recommendations";

// Paper Trading Service
export { paperTradingService } from "./paperTrading";
export type {
  Position,
  Transaction,
  TradeOrder as PaperTradeOrder,
  TradeResult as PaperTradeResult,
  WalletSummary,
  PaperTradingState,
  OrderStatus,
} from "./paperTrading";

// Pure Business Logic Engines
export {
  // Trading Engine
  validateBuyOrder,
  validateSellOrder,
  calculateTradeExecution,
  calculateBuyPositionUpdate,
  calculateSellPositionUpdate,
  calculateCostBasis,
  // Portfolio Engine
  calculateHoldingPnL,
  updateHoldingsWithMarketData,
  calculatePortfolioSummary,
  calculatePortfolioAllocations,
  updateHoldingAllocations,
  // Indicator Engine
  calculateRiskLevel,
  calculateMarketBreadth,
  calculateVolatility,
  calculateMarketConfidence,
  determineMarketState,
  getStateDescription,
  calculateIndicators,
} from "./engines";
export type {
  Trade as EngineTrade,
  TradeExecution,
  ValidationResult,
  PositionUpdate,
  RiskAssessment,
  BreadthIndicator,
} from "./engines";
// Re-export recommendation engine types with aliases to avoid conflict with mockData
export {
  generateFactors,
  calculateTargetPrice,
  calculateConfidence,
  determineRecommendationType,
  generateRecommendation,
  categorizeRecommendations,
} from "./engines";
export type { CategorizedRecommendations } from "./engines";

// Hadi Backend Integration
export { hadiService } from "./hadi";
export type {
  OptimizeRequest,
  OptimizeResponse,
  BenchmarkRequest,
  BenchmarkResponse,
  HadiPortfolioMetrics,
  BenchmarkMetrics,
} from "./hadi";

// Mock Data (for development)
export * from "./mockData";
