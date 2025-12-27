// Path: src/services/api/endpoints.ts

/**
 * API Endpoints Configuration
 * Centralized endpoint definitions for all API calls
 */

export const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
  },

  // Market Data
  MARKET: {
    STOCKS: "/market/stocks",
    STOCK_DETAIL: (symbol: string) => `/market/stocks/${symbol}`,
    STOCK_HISTORY: (symbol: string) => `/market/stocks/${symbol}/history`,
    STOCK_QUOTE: (symbol: string) => `/market/stocks/${symbol}/quote`,
    INDICATORS: "/market/indicators",
    SECTORS: "/market/sectors",
    TRENDING: "/market/trending",
  },

  // Portfolio
  PORTFOLIO: {
    HOLDINGS: "/portfolio/holdings",
    SUMMARY: "/portfolio/summary",
    ALLOCATIONS: "/portfolio/allocations",
    PERFORMANCE: "/portfolio/performance",
    TRANSACTIONS: "/portfolio/transactions",
  },

  // Trading
  TRADING: {
    EXECUTE: "/trading/execute",
    ORDERS: "/trading/orders",
    ORDER_STATUS: (orderId: string) => `/trading/orders/${orderId}`,
    CANCEL_ORDER: (orderId: string) => `/trading/orders/${orderId}/cancel`,
  },

  // Recommendations (AI-powered)
  RECOMMENDATIONS: {
    LIST: "/recommendations",
    DETAIL: (id: string) => `/recommendations/${id}`,
    FACTORS: "/recommendations/factors",
    GENERATE: "/recommendations/generate",
  },

  // User Settings
  USER: {
    PREFERENCES: "/user/preferences",
    NOTIFICATIONS: "/user/notifications",
    WATCHLIST: "/user/watchlist",
  },
} as const;
