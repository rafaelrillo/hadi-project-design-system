// Path: src/services/index.ts

// API Client
export * from "./api";

// Adapters
export * from "./adapters";

// Services
export { marketService } from "./market";
export type { MarketServiceConfig } from "./market";

export { portfolioService } from "./portfolio";
export type { TradeOrder, TradeResult, PortfolioData, PortfolioServiceConfig } from "./portfolio";

export { authService } from "./auth";
export type { LoginCredentials, LoginResponse, AuthServiceConfig } from "./auth";

// Mock Data (for development)
export * from "./mockData";
