// Path: src/config/env.ts

/**
 * Environment configuration
 * All environment variables are typed and validated here
 */

export type MarketApiProvider = 'finnhub' | 'alphavantage' | 'polygon' | 'twelvedata' | 'tiingo' | 'mock';

export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
    useMock: import.meta.env.VITE_USE_MOCK !== "false", // Default to mock
    wsUrl: import.meta.env.VITE_WS_URL || "ws://localhost:3001/ws",
  },

  financialApis: {
    primary: (import.meta.env.VITE_PRIMARY_MARKET_API || 'mock') as MarketApiProvider,

    finnhub: {
      apiKey: import.meta.env.VITE_FINNHUB_API_KEY || '',
      baseUrl: 'https://finnhub.io/api/v1',
      wsUrl: 'wss://ws.finnhub.io',
      rateLimit: 60, // calls per minute
    },

    alphaVantage: {
      apiKey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || '',
      baseUrl: 'https://www.alphavantage.co/query',
      rateLimit: 5, // calls per minute
    },

    polygon: {
      apiKey: import.meta.env.VITE_POLYGON_API_KEY || '',
      baseUrl: 'https://api.polygon.io',
      rateLimit: 5, // calls per minute
    },

    twelveData: {
      apiKey: import.meta.env.VITE_TWELVE_DATA_API_KEY || '',
      baseUrl: 'https://api.twelvedata.com',
      rateLimit: 8, // calls per minute
    },

    tiingo: {
      apiKey: import.meta.env.VITE_TIINGO_API_KEY || '',
      baseUrl: import.meta.env.VITE_TIINGO_BASE_URL || '/api/tiingo', // Uses proxy to avoid CORS
      directBaseUrl: 'https://api.tiingo.com',
      rateLimit: 500, // requests per hour
    },
  },

  features: {
    realTime: import.meta.env.VITE_ENABLE_REAL_TIME !== "false",
    pollingInterval: parseInt(
      import.meta.env.VITE_POLLING_INTERVAL || "15000",
      10
    ),
    useWebSocket: import.meta.env.VITE_USE_WEBSOCKET === "true",
    cacheTTL: parseInt(
      import.meta.env.VITE_CACHE_TTL || "30000",
      10
    ),
  },

  // Environment flags
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;

// Helper to check if running in demo mode
export const isDemoMode = (): boolean => {
  return config.api.useMock || !hasValidApiKey();
};

// Helper to check if real-time updates are enabled
export const isRealTimeEnabled = (): boolean => {
  return config.features.realTime;
};

// Helper to check if any API key is configured
export const hasValidApiKey = (): boolean => {
  const { primary, finnhub, alphaVantage, polygon, twelveData, tiingo } = config.financialApis;

  switch (primary) {
    case 'finnhub':
      return !!finnhub.apiKey;
    case 'alphavantage':
      return !!alphaVantage.apiKey;
    case 'polygon':
      return !!polygon.apiKey;
    case 'twelvedata':
      return !!twelveData.apiKey;
    case 'tiingo':
      return !!tiingo.apiKey;
    default:
      return false;
  }
};

// Get the active API configuration
export const getActiveApiConfig = () => {
  const { primary, finnhub, alphaVantage, polygon, twelveData, tiingo } = config.financialApis;

  switch (primary) {
    case 'finnhub':
      return finnhub;
    case 'alphavantage':
      return alphaVantage;
    case 'polygon':
      return polygon;
    case 'twelvedata':
      return twelveData;
    case 'tiingo':
      return tiingo;
    default:
      return null;
  }
};
