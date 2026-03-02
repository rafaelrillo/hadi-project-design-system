// ─────────────────────────────────────────────────────────────────────────────
// TICKER DIRECTORY — Static list of popular US stocks for autocomplete
// ─────────────────────────────────────────────────────────────────────────────

export interface TickerEntry {
  symbol: string;
  name: string;
}

export const TICKER_DIRECTORY: TickerEntry[] = [
  // ── Mega Cap Technology ─────────────────────────────────────────────────
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'AVGO', name: 'Broadcom Inc.' },
  { symbol: 'ORCL', name: 'Oracle Corporation' },
  { symbol: 'CRM', name: 'Salesforce Inc.' },
  { symbol: 'ADBE', name: 'Adobe Inc.' },
  { symbol: 'AMD', name: 'Advanced Micro Devices Inc.' },
  { symbol: 'INTC', name: 'Intel Corporation' },
  { symbol: 'CSCO', name: 'Cisco Systems Inc.' },
  { symbol: 'QCOM', name: 'Qualcomm Inc.' },
  { symbol: 'TXN', name: 'Texas Instruments Inc.' },
  { symbol: 'IBM', name: 'International Business Machines' },
  { symbol: 'NOW', name: 'ServiceNow Inc.' },
  { symbol: 'INTU', name: 'Intuit Inc.' },
  { symbol: 'AMAT', name: 'Applied Materials Inc.' },
  { symbol: 'MU', name: 'Micron Technology Inc.' },
  { symbol: 'PANW', name: 'Palo Alto Networks Inc.' },
  { symbol: 'SNPS', name: 'Synopsys Inc.' },
  { symbol: 'CDNS', name: 'Cadence Design Systems' },
  { symbol: 'NFLX', name: 'Netflix Inc.' },

  // ── Financial ───────────────────────────────────────────────────────────
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { symbol: 'V', name: 'Visa Inc.' },
  { symbol: 'MA', name: 'Mastercard Incorporated' },
  { symbol: 'BAC', name: 'Bank of America Corporation' },
  { symbol: 'WFC', name: 'Wells Fargo & Company' },
  { symbol: 'GS', name: 'Goldman Sachs Group Inc.' },
  { symbol: 'MS', name: 'Morgan Stanley' },
  { symbol: 'AXP', name: 'American Express Company' },
  { symbol: 'C', name: 'Citigroup Inc.' },
  { symbol: 'BLK', name: 'BlackRock Inc.' },
  { symbol: 'SCHW', name: 'Charles Schwab Corporation' },
  { symbol: 'BX', name: 'Blackstone Inc.' },
  { symbol: 'PYPL', name: 'PayPal Holdings Inc.' },

  // ── Healthcare ──────────────────────────────────────────────────────────
  { symbol: 'UNH', name: 'UnitedHealth Group' },
  { symbol: 'JNJ', name: 'Johnson & Johnson' },
  { symbol: 'LLY', name: 'Eli Lilly and Company' },
  { symbol: 'PFE', name: 'Pfizer Inc.' },
  { symbol: 'ABBV', name: 'AbbVie Inc.' },
  { symbol: 'MRK', name: 'Merck & Co. Inc.' },
  { symbol: 'TMO', name: 'Thermo Fisher Scientific' },
  { symbol: 'ABT', name: 'Abbott Laboratories' },
  { symbol: 'DHR', name: 'Danaher Corporation' },
  { symbol: 'BMY', name: 'Bristol-Myers Squibb' },
  { symbol: 'AMGN', name: 'Amgen Inc.' },
  { symbol: 'GILD', name: 'Gilead Sciences Inc.' },
  { symbol: 'ISRG', name: 'Intuitive Surgical Inc.' },
  { symbol: 'VRTX', name: 'Vertex Pharmaceuticals' },
  { symbol: 'MDT', name: 'Medtronic plc' },

  // ── Consumer Discretionary ──────────────────────────────────────────────
  { symbol: 'HD', name: 'The Home Depot Inc.' },
  { symbol: 'MCD', name: "McDonald's Corporation" },
  { symbol: 'NKE', name: 'NIKE Inc.' },
  { symbol: 'SBUX', name: 'Starbucks Corporation' },
  { symbol: 'LOW', name: "Lowe's Companies Inc." },
  { symbol: 'TJX', name: 'TJX Companies Inc.' },
  { symbol: 'BKNG', name: 'Booking Holdings Inc.' },
  { symbol: 'CMG', name: 'Chipotle Mexican Grill' },

  // ── Consumer Staples ────────────────────────────────────────────────────
  { symbol: 'PG', name: 'Procter & Gamble' },
  { symbol: 'KO', name: 'The Coca-Cola Company' },
  { symbol: 'PEP', name: 'PepsiCo Inc.' },
  { symbol: 'COST', name: 'Costco Wholesale Corporation' },
  { symbol: 'WMT', name: 'Walmart Inc.' },
  { symbol: 'PM', name: 'Philip Morris International' },
  { symbol: 'CL', name: 'Colgate-Palmolive Company' },

  // ── Industrials ─────────────────────────────────────────────────────────
  { symbol: 'CAT', name: 'Caterpillar Inc.' },
  { symbol: 'GE', name: 'GE Aerospace' },
  { symbol: 'HON', name: 'Honeywell International' },
  { symbol: 'UNP', name: 'Union Pacific Corporation' },
  { symbol: 'RTX', name: 'RTX Corporation' },
  { symbol: 'BA', name: 'The Boeing Company' },
  { symbol: 'DE', name: 'Deere & Company' },
  { symbol: 'LMT', name: 'Lockheed Martin Corporation' },
  { symbol: 'UPS', name: 'United Parcel Service Inc.' },

  // ── Energy ──────────────────────────────────────────────────────────────
  { symbol: 'XOM', name: 'Exxon Mobil Corporation' },
  { symbol: 'CVX', name: 'Chevron Corporation' },
  { symbol: 'COP', name: 'ConocoPhillips' },
  { symbol: 'SLB', name: 'Schlumberger Limited' },
  { symbol: 'EOG', name: 'EOG Resources Inc.' },

  // ── Communication Services ──────────────────────────────────────────────
  { symbol: 'GOOG', name: 'Alphabet Inc. Class C' },
  { symbol: 'DIS', name: 'The Walt Disney Company' },
  { symbol: 'CMCSA', name: 'Comcast Corporation' },
  { symbol: 'T', name: 'AT&T Inc.' },
  { symbol: 'VZ', name: 'Verizon Communications' },
  { symbol: 'TMUS', name: 'T-Mobile US Inc.' },

  // ── Materials ───────────────────────────────────────────────────────────
  { symbol: 'LIN', name: 'Linde plc' },
  { symbol: 'APD', name: 'Air Products & Chemicals' },
  { symbol: 'SHW', name: 'Sherwin-Williams Company' },
  { symbol: 'FCX', name: 'Freeport-McMoRan Inc.' },
  { symbol: 'NEM', name: 'Newmont Corporation' },

  // ── Real Estate ─────────────────────────────────────────────────────────
  { symbol: 'AMT', name: 'American Tower Corporation' },
  { symbol: 'PLD', name: 'Prologis Inc.' },
  { symbol: 'CCI', name: 'Crown Castle Inc.' },

  // ── Utilities ───────────────────────────────────────────────────────────
  { symbol: 'NEE', name: 'NextEra Energy Inc.' },
  { symbol: 'DUK', name: 'Duke Energy Corporation' },
  { symbol: 'SO', name: 'Southern Company' },

  // ── ETFs / Benchmarks ───────────────────────────────────────────────────
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust' },
  { symbol: 'IWM', name: 'iShares Russell 2000 ETF' },
  { symbol: 'DIA', name: 'SPDR Dow Jones Industrial ETF' },
  { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF' },
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF' },
  { symbol: 'EEM', name: 'iShares MSCI Emerging Markets ETF' },
  { symbol: 'GLD', name: 'SPDR Gold Shares' },
  { symbol: 'TLT', name: 'iShares 20+ Year Treasury Bond ETF' },
  { symbol: 'XLF', name: 'Financial Select Sector SPDR Fund' },
  { symbol: 'XLK', name: 'Technology Select Sector SPDR Fund' },
  { symbol: 'XLE', name: 'Energy Select Sector SPDR Fund' },
];

/**
 * Search tickers by symbol or company name.
 * Excludes already-selected tickers, returns up to `limit` results.
 * Prioritizes symbol matches over name-only matches.
 */
export function searchTickers(
  query: string,
  exclude: string[] = [],
  limit = 8,
): TickerEntry[] {
  if (!query.trim()) return [];

  const q = query.trim().toUpperCase();
  const available = TICKER_DIRECTORY.filter((t) => !exclude.includes(t.symbol));

  // Exact symbol prefix matches first, then name matches
  const symbolMatches: TickerEntry[] = [];
  const nameMatches: TickerEntry[] = [];

  for (const t of available) {
    if (t.symbol.startsWith(q)) {
      symbolMatches.push(t);
    } else if (
      t.symbol.includes(q) ||
      t.name.toUpperCase().includes(q)
    ) {
      nameMatches.push(t);
    }
  }

  return [...symbolMatches, ...nameMatches].slice(0, limit);
}
