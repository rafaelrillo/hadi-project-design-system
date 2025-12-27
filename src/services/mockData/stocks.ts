// Path: src/services/mockData/stocks.ts

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
  pe: number;
  weekHigh52: number;
  weekLow52: number;
}

export const stocksData: Stock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 189.45,
    change: 2.34,
    changePercent: 1.25,
    volume: 52_340_000,
    marketCap: 2_980_000_000_000,
    sector: "Technology",
    pe: 29.5,
    weekHigh52: 199.62,
    weekLow52: 164.08,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 378.92,
    change: 4.56,
    changePercent: 1.22,
    volume: 21_450_000,
    marketCap: 2_810_000_000_000,
    sector: "Technology",
    pe: 35.2,
    weekHigh52: 384.3,
    weekLow52: 309.45,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 142.65,
    change: -1.23,
    changePercent: -0.86,
    volume: 18_920_000,
    marketCap: 1_780_000_000_000,
    sector: "Technology",
    pe: 25.8,
    weekHigh52: 153.78,
    weekLow52: 115.83,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 178.34,
    change: 3.21,
    changePercent: 1.83,
    volume: 42_100_000,
    marketCap: 1_860_000_000_000,
    sector: "Consumer Discretionary",
    pe: 62.4,
    weekHigh52: 189.77,
    weekLow52: 118.35,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 495.22,
    change: 12.45,
    changePercent: 2.58,
    volume: 38_560_000,
    marketCap: 1_220_000_000_000,
    sector: "Technology",
    pe: 65.3,
    weekHigh52: 505.48,
    weekLow52: 222.97,
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 356.78,
    change: 5.67,
    changePercent: 1.61,
    volume: 15_780_000,
    marketCap: 920_000_000_000,
    sector: "Technology",
    pe: 28.9,
    weekHigh52: 384.33,
    weekLow52: 274.38,
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 248.92,
    change: -4.56,
    changePercent: -1.8,
    volume: 98_450_000,
    marketCap: 790_000_000_000,
    sector: "Consumer Discretionary",
    pe: 72.1,
    weekHigh52: 299.29,
    weekLow52: 152.37,
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    price: 172.34,
    change: 1.89,
    changePercent: 1.11,
    volume: 8_920_000,
    marketCap: 498_000_000_000,
    sector: "Financial",
    pe: 11.2,
    weekHigh52: 178.92,
    weekLow52: 135.19,
  },
  {
    symbol: "V",
    name: "Visa Inc.",
    price: 267.45,
    change: 2.12,
    changePercent: 0.8,
    volume: 6_340_000,
    marketCap: 545_000_000_000,
    sector: "Financial",
    pe: 29.8,
    weekHigh52: 275.34,
    weekLow52: 221.68,
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    price: 156.78,
    change: -0.45,
    changePercent: -0.29,
    volume: 5_670_000,
    marketCap: 378_000_000_000,
    sector: "Healthcare",
    pe: 15.6,
    weekHigh52: 175.97,
    weekLow52: 150.58,
  },
  {
    symbol: "UNH",
    name: "UnitedHealth Group",
    price: 528.34,
    change: 6.78,
    changePercent: 1.3,
    volume: 3_450_000,
    marketCap: 487_000_000_000,
    sector: "Healthcare",
    pe: 22.4,
    weekHigh52: 558.1,
    weekLow52: 436.38,
  },
  {
    symbol: "PG",
    name: "Procter & Gamble",
    price: 152.67,
    change: 0.89,
    changePercent: 0.59,
    volume: 4_890_000,
    marketCap: 359_000_000_000,
    sector: "Consumer Staples",
    pe: 25.3,
    weekHigh52: 165.35,
    weekLow52: 141.45,
  },
  {
    symbol: "XOM",
    name: "Exxon Mobil Corporation",
    price: 104.56,
    change: -1.23,
    changePercent: -1.16,
    volume: 12_340_000,
    marketCap: 418_000_000_000,
    sector: "Energy",
    pe: 10.8,
    weekHigh52: 120.7,
    weekLow52: 95.77,
  },
  {
    symbol: "LLY",
    name: "Eli Lilly and Company",
    price: 598.45,
    change: 8.92,
    changePercent: 1.51,
    volume: 4_120_000,
    marketCap: 568_000_000_000,
    sector: "Healthcare",
    pe: 95.2,
    weekHigh52: 629.97,
    weekLow52: 368.27,
  },
  {
    symbol: "MA",
    name: "Mastercard Incorporated",
    price: 423.78,
    change: 3.45,
    changePercent: 0.82,
    volume: 2_890_000,
    marketCap: 395_000_000_000,
    sector: "Financial",
    pe: 34.6,
    weekHigh52: 445.37,
    weekLow52: 344.24,
  },
  {
    symbol: "AVGO",
    name: "Broadcom Inc.",
    price: 945.23,
    change: 15.67,
    changePercent: 1.69,
    volume: 2_340_000,
    marketCap: 392_000_000_000,
    sector: "Technology",
    pe: 27.8,
    weekHigh52: 988.23,
    weekLow52: 618.18,
  },
];

export const sectors = [...new Set(stocksData.map((s) => s.sector))];

export function getStocksBySector(sector: string): Stock[] {
  return stocksData.filter((stock) => stock.sector === sector);
}

export function getStockBySymbol(symbol: string): Stock | undefined {
  return stocksData.find((stock) => stock.symbol === symbol);
}

export function getTopGainers(limit = 5): Stock[] {
  return [...stocksData]
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, limit);
}

export function getTopLosers(limit = 5): Stock[] {
  return [...stocksData]
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, limit);
}

// Historical price data point
export interface HistoricalPrice {
  date: string;
  price: number;
}

/**
 * Realistic stock price simulation using Geometric Brownian Motion (GBM)
 * This is the same model used in financial engineering (Black-Scholes, Monte Carlo, etc.)
 */

// Volatility profiles by sector (annualized)
const sectorVolatility: Record<string, number> = {
  "Technology": 0.35,      // Tech is more volatile
  "Consumer Discretionary": 0.30,
  "Healthcare": 0.25,
  "Financials": 0.28,
  "Energy": 0.40,          // Energy very volatile
  "Industrials": 0.22,
  "Materials": 0.26,
  "Utilities": 0.15,       // Utilities are stable
  "Real Estate": 0.20,
  "Consumer Staples": 0.15,
  "Communication Services": 0.30,
};

// Seeded random for reproducible results per symbol
function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

// Box-Muller transform for normal distribution
function normalRandom(rng: () => number): number {
  const u1 = rng();
  const u2 = rng();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

// Generate historical prices for a stock (last N days)
export function generateHistoricalPrices(
  stock: Stock,
  days = 30,
  endPrice?: number // Optional: use real current price
): HistoricalPrice[] {
  // Use symbol as seed for consistent data per stock
  const seed = stock.symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rng = seededRandom(seed + new Date().toDateString().length); // Changes daily

  const targetPrice = endPrice || stock.price;
  const annualVolatility = sectorVolatility[stock.sector] || 0.25;

  // Amplified daily volatility for visible chart movement (3x normal)
  const dailyVolatility = (annualVolatility / Math.sqrt(252)) * 3;

  const history: HistoricalPrice[] = [];

  // Start 5-12% away from current price (random direction for variety)
  const direction = rng() > 0.5 ? 1 : -1;
  const startOffset = 0.05 + rng() * 0.07;
  const startPrice = targetPrice * (1 + direction * startOffset);

  let price = startPrice;

  // Count trading days first
  let tradingDays = 0;
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    const dow = date.getDay();
    if (dow !== 0 && dow !== 6) tradingDays++;
  }

  let currentDay = 0;

  // Generate dynamic price path
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));

    // Skip weekends
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    currentDay++;

    if (currentDay === tradingDays) {
      // Last day = exact current price
      price = targetPrice;
    } else {
      // Calculate needed drift to reach target
      const remaining = tradingDays - currentDay;
      const neededReturn = (targetPrice - price) / price;
      const driftPerDay = neededReturn / remaining * 0.3;

      // Random shock - can overshoot significantly
      const shock = dailyVolatility * normalRandom(rng);

      // Apply movement
      price = price * (1 + driftPerDay + shock);

      // Wide bounds for dramatic movement
      price = Math.max(targetPrice * 0.80, Math.min(targetPrice * 1.20, price));
    }

    history.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      price: Math.round(price * 100) / 100,
    });
  }

  return history;
}

// Get historical data for multiple stocks formatted for FinancialLineChart
export function getStocksHistoricalData(symbols: string[], days = 30) {
  return symbols.map((symbol) => {
    const stock = getStockBySymbol(symbol);
    if (!stock) return null;

    const history = generateHistoricalPrices(stock, days);
    return {
      id: symbol,
      data: history.map((h) => ({
        x: h.date,
        y: h.price,
      })),
    };
  }).filter(Boolean);
}

// Get stocks grouped by sector for TreeMap
export function getStocksBySectorTreeMap() {
  const sectorGroups = sectors.reduce((acc, sector) => {
    const sectorStocks = getStocksBySector(sector);
    acc[sector] = sectorStocks.map((stock) => ({
      name: stock.symbol,
      value: stock.marketCap / 1_000_000_000, // Convert to billions
      change: stock.changePercent,
    }));
    return acc;
  }, {} as Record<string, { name: string; value: number; change: number }[]>);

  return {
    name: "Market",
    children: Object.entries(sectorGroups).map(([sector, stocks]) => ({
      name: sector,
      children: stocks,
    })),
  };
}
