// Path: src/services/recommendations/recommendationTypes.ts

// ─────────────────────────────────────────────────────────────────────────────
// RECOMMENDATION TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type RecommendationAction = 'buy' | 'sell' | 'hold';
export type ConfidenceLevel = 'low' | 'medium' | 'high';
export type TimeHorizon = 'short' | 'medium' | 'long';

export interface RecommendationFactor {
  /** Factor name */
  name: string;
  /** Factor weight (0-1) */
  weight: number;
  /** Factor signal (-1 to 1) */
  signal: number;
  /** Brief description */
  description: string;
}

export interface PriceTarget {
  /** Target price */
  price: number;
  /** Expected return percentage */
  expectedReturn: number;
  /** Time horizon */
  timeHorizon: TimeHorizon;
  /** Stop loss price */
  stopLoss?: number;
}

export interface StockRecommendation {
  /** Stock ticker */
  ticker: string;
  /** Company name */
  name: string;
  /** Current price */
  currentPrice: number;
  /** Price change today */
  priceChange: number;
  /** Price change percentage */
  priceChangePercent: number;
  /** Recommendation action */
  action: RecommendationAction;
  /** Overall score (0-100) */
  score: number;
  /** Confidence level */
  confidence: ConfidenceLevel;
  /** Price target info */
  priceTarget?: PriceTarget;
  /** Factors contributing to recommendation */
  factors: RecommendationFactor[];
  /** Brief rationale */
  rationale: string;
  /** Related news IDs */
  relatedNewsIds?: string[];
  /** Generated timestamp */
  generatedAt: string;
  /** Exchange code */
  exchange?: string;
}

export interface DailyRecommendations {
  /** Date of recommendations */
  date: string;
  /** Market state summary */
  marketSummary: {
    state: 'bullish' | 'bearish' | 'neutral' | 'volatile';
    riskLevel: number; // 0-100
    description: string;
  };
  /** Top buy recommendations */
  topBuys: StockRecommendation[];
  /** Top sell recommendations */
  topSells: StockRecommendation[];
  /** Stocks to hold/watch */
  holds?: StockRecommendation[];
  /** Generated timestamp */
  generatedAt: string;
}

export interface RecommendationFilters {
  /** Filter by action type */
  action?: RecommendationAction;
  /** Minimum score */
  minScore?: number;
  /** Minimum confidence */
  minConfidence?: ConfidenceLevel;
  /** Specific tickers */
  tickers?: string[];
  /** Sector filter */
  sector?: string;
}
