// Path: src/services/recommendations/recommendationEngine.ts

import type {
  StockRecommendation,
  DailyRecommendations,
  RecommendationFactor,
  RecommendationAction,
  ConfidenceLevel,
  RecommendationFilters,
} from './recommendationTypes';

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_STOCKS = [
  { ticker: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', sector: 'Technology' },
  { ticker: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', sector: 'Technology' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', sector: 'Technology' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ', sector: 'Consumer Cyclical' },
  { ticker: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', sector: 'Technology' },
  { ticker: 'META', name: 'Meta Platforms Inc.', exchange: 'NASDAQ', sector: 'Technology' },
  { ticker: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ', sector: 'Consumer Cyclical' },
  { ticker: 'JPM', name: 'JPMorgan Chase & Co.', exchange: 'NYSE', sector: 'Financial' },
  { ticker: 'V', name: 'Visa Inc.', exchange: 'NYSE', sector: 'Financial' },
  { ticker: 'JNJ', name: 'Johnson & Johnson', exchange: 'NYSE', sector: 'Healthcare' },
  { ticker: 'UNH', name: 'UnitedHealth Group', exchange: 'NYSE', sector: 'Healthcare' },
  { ticker: 'PG', name: 'Procter & Gamble Co.', exchange: 'NYSE', sector: 'Consumer Defensive' },
  { ticker: 'HD', name: 'The Home Depot Inc.', exchange: 'NYSE', sector: 'Consumer Cyclical' },
  { ticker: 'MA', name: 'Mastercard Inc.', exchange: 'NYSE', sector: 'Financial' },
  { ticker: 'DIS', name: 'Walt Disney Co.', exchange: 'NYSE', sector: 'Communication' },
];

const FACTOR_TEMPLATES: Omit<RecommendationFactor, 'signal'>[] = [
  { name: 'Technical Momentum', weight: 0.25, description: 'Price momentum and trend analysis' },
  { name: 'Fundamental Value', weight: 0.20, description: 'P/E ratio and earnings growth' },
  { name: 'Market Sentiment', weight: 0.15, description: 'News and social media sentiment' },
  { name: 'Volume Analysis', weight: 0.15, description: 'Trading volume patterns' },
  { name: 'Sector Rotation', weight: 0.15, description: 'Sector strength relative to market' },
  { name: 'Risk Metrics', weight: 0.10, description: 'Volatility and drawdown analysis' },
];

const BUY_RATIONALES = [
  'Strong technical breakout with increasing volume and positive momentum indicators.',
  'Undervalued relative to peers with improving fundamentals and earnings outlook.',
  'Positive sector rotation with institutional accumulation detected.',
  'Breaking above key resistance levels with bullish divergence on RSI.',
  'Strong earnings beat expectations with raised guidance for next quarter.',
];

const SELL_RATIONALES = [
  'Technical breakdown below support with increasing selling pressure.',
  'Overvalued relative to historical averages with deteriorating margins.',
  'Negative sentiment shift with insider selling activity detected.',
  'Breaking below key support levels with bearish momentum indicators.',
  'Earnings miss with lowered guidance, suggesting near-term weakness.',
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getConfidenceLevel(score: number): ConfidenceLevel {
  if (score >= 75) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}

function generateFactors(isBuy: boolean): RecommendationFactor[] {
  return FACTOR_TEMPLATES.map((template) => ({
    ...template,
    signal: isBuy
      ? randomInRange(0.2, 1.0)
      : randomInRange(-1.0, -0.2),
  }));
}

function generateMockPrice(): { price: number; change: number; changePercent: number } {
  const price = randomInRange(50, 500);
  const changePercent = randomInRange(-5, 5);
  const change = price * (changePercent / 100);
  return {
    price: Math.round(price * 100) / 100,
    change: Math.round(change * 100) / 100,
    changePercent: Math.round(changePercent * 100) / 100,
  };
}

function generateRecommendation(
  stock: typeof MOCK_STOCKS[0],
  action: RecommendationAction
): StockRecommendation {
  const isBuy = action === 'buy';
  const { price, change, changePercent } = generateMockPrice();
  const score = isBuy
    ? Math.round(randomInRange(65, 95))
    : Math.round(randomInRange(15, 45));

  const expectedReturn = isBuy
    ? randomInRange(5, 25)
    : randomInRange(-25, -5);

  return {
    ticker: stock.ticker,
    name: stock.name,
    exchange: stock.exchange,
    currentPrice: price,
    priceChange: change,
    priceChangePercent: changePercent,
    action,
    score,
    confidence: getConfidenceLevel(isBuy ? score : 100 - score),
    priceTarget: {
      price: Math.round(price * (1 + expectedReturn / 100) * 100) / 100,
      expectedReturn: Math.round(expectedReturn * 10) / 10,
      timeHorizon: randomChoice(['short', 'medium', 'long']),
      stopLoss: isBuy
        ? Math.round(price * 0.92 * 100) / 100
        : Math.round(price * 1.08 * 100) / 100,
    },
    factors: generateFactors(isBuy),
    rationale: randomChoice(isBuy ? BUY_RATIONALES : SELL_RATIONALES),
    generatedAt: new Date().toISOString(),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE
// ─────────────────────────────────────────────────────────────────────────────

export const recommendationEngine = {
  /**
   * Generate daily recommendations (top 5 buys + top 5 sells)
   */
  async getDailyRecommendations(): Promise<DailyRecommendations> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const shuffledStocks = shuffleArray(MOCK_STOCKS);
    const buyStocks = shuffledStocks.slice(0, 5);
    const sellStocks = shuffledStocks.slice(5, 10);

    const topBuys = buyStocks
      .map((stock) => generateRecommendation(stock, 'buy'))
      .sort((a, b) => b.score - a.score);

    const topSells = sellStocks
      .map((stock) => generateRecommendation(stock, 'sell'))
      .sort((a, b) => a.score - b.score);

    const marketStates = ['bullish', 'bearish', 'neutral', 'volatile'] as const;
    const marketState = randomChoice([...marketStates]);

    return {
      date: new Date().toISOString().split('T')[0],
      marketSummary: {
        state: marketState,
        riskLevel: Math.round(randomInRange(20, 80)),
        description: getMarketDescription(marketState),
      },
      topBuys,
      topSells,
      generatedAt: new Date().toISOString(),
    };
  },

  /**
   * Get recommendation for a specific ticker
   */
  async getTickerRecommendation(ticker: string): Promise<StockRecommendation | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const stock = MOCK_STOCKS.find(
      (s) => s.ticker.toLowerCase() === ticker.toLowerCase()
    );

    if (!stock) return null;

    const action = randomChoice(['buy', 'sell', 'hold'] as RecommendationAction[]);
    return generateRecommendation(stock, action);
  },

  /**
   * Filter recommendations
   */
  filterRecommendations(
    recommendations: StockRecommendation[],
    filters: RecommendationFilters
  ): StockRecommendation[] {
    let filtered = [...recommendations];

    if (filters.action) {
      filtered = filtered.filter((r) => r.action === filters.action);
    }

    if (filters.minScore !== undefined) {
      filtered = filtered.filter((r) => r.score >= filters.minScore!);
    }

    if (filters.minConfidence) {
      const confidenceLevels: ConfidenceLevel[] = ['low', 'medium', 'high'];
      const minIndex = confidenceLevels.indexOf(filters.minConfidence);
      filtered = filtered.filter(
        (r) => confidenceLevels.indexOf(r.confidence) >= minIndex
      );
    }

    if (filters.tickers && filters.tickers.length > 0) {
      const tickerSet = new Set(filters.tickers.map((t) => t.toUpperCase()));
      filtered = filtered.filter((r) => tickerSet.has(r.ticker));
    }

    return filtered;
  },

  /**
   * Get available stocks for recommendations
   */
  getAvailableStocks() {
    return MOCK_STOCKS;
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// MARKET DESCRIPTIONS
// ─────────────────────────────────────────────────────────────────────────────

function getMarketDescription(
  state: 'bullish' | 'bearish' | 'neutral' | 'volatile'
): string {
  const descriptions = {
    bullish:
      'Markets showing strong upward momentum with broad-based buying. Technology and growth sectors leading gains.',
    bearish:
      'Markets under pressure with defensive rotation. Consider reducing exposure and focusing on quality names.',
    neutral:
      'Markets trading in a range-bound pattern. Mixed signals suggest waiting for clearer direction.',
    volatile:
      'High volatility environment with rapid sentiment shifts. Exercise caution and consider position sizing.',
  };
  return descriptions[state];
}

export default recommendationEngine;
