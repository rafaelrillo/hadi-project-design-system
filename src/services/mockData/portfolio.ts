// Path: src/services/mockData/portfolio.ts

export interface PortfolioHolding {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  value: number;
  costBasis: number;
  gain: number;
  gainPercent: number;
  dayChange: number;
  dayChangePercent: number;
  allocation: number;
  sector: string;
}

export interface Allocation {
  id: string;
  category: string;
  percentage: number;
  value: number;
  change: number;
  target: number;
  color: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalCost: number;
  totalGain: number;
  totalGainPercent: number;
  dayChange: number;
  dayChangePercent: number;
  cashBalance: number;
  buyingPower: number;
}

export interface PerformanceDataPoint {
  date: string;
  value: number;
  benchmark: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: "buy" | "sell" | "dividend";
  symbol: string;
  shares: number;
  price: number;
  total: number;
  status: "completed" | "pending" | "cancelled";
}

export const portfolioHoldings: PortfolioHolding[] = [
  {
    id: "h1",
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 150,
    avgCost: 165.2,
    currentPrice: 189.45,
    value: 28417.5,
    costBasis: 24780,
    gain: 3637.5,
    gainPercent: 14.68,
    dayChange: 351,
    dayChangePercent: 1.25,
    allocation: 14.2,
    sector: "Technology",
  },
  {
    id: "h2",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    shares: 85,
    avgCost: 320.5,
    currentPrice: 378.92,
    value: 32208.2,
    costBasis: 27242.5,
    gain: 4965.7,
    gainPercent: 18.23,
    dayChange: 387.6,
    dayChangePercent: 1.22,
    allocation: 16.1,
    sector: "Technology",
  },
  {
    id: "h3",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    shares: 60,
    avgCost: 380.0,
    currentPrice: 495.22,
    value: 29713.2,
    costBasis: 22800,
    gain: 6913.2,
    gainPercent: 30.32,
    dayChange: 747,
    dayChangePercent: 2.58,
    allocation: 14.86,
    sector: "Technology",
  },
  {
    id: "h4",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    shares: 120,
    avgCost: 125.8,
    currentPrice: 142.65,
    value: 17118,
    costBasis: 15096,
    gain: 2022,
    gainPercent: 13.39,
    dayChange: -147.6,
    dayChangePercent: -0.86,
    allocation: 8.56,
    sector: "Technology",
  },
  {
    id: "h5",
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    shares: 100,
    avgCost: 148.5,
    currentPrice: 172.34,
    value: 17234,
    costBasis: 14850,
    gain: 2384,
    gainPercent: 16.05,
    dayChange: 189,
    dayChangePercent: 1.11,
    allocation: 8.62,
    sector: "Financial",
  },
  {
    id: "h6",
    symbol: "V",
    name: "Visa Inc.",
    shares: 55,
    avgCost: 235.0,
    currentPrice: 267.45,
    value: 14709.75,
    costBasis: 12925,
    gain: 1784.75,
    gainPercent: 13.81,
    dayChange: 116.6,
    dayChangePercent: 0.8,
    allocation: 7.35,
    sector: "Financial",
  },
  {
    id: "h7",
    symbol: "UNH",
    name: "UnitedHealth Group",
    shares: 30,
    avgCost: 485.0,
    currentPrice: 528.34,
    value: 15850.2,
    costBasis: 14550,
    gain: 1300.2,
    gainPercent: 8.94,
    dayChange: 203.4,
    dayChangePercent: 1.3,
    allocation: 7.93,
    sector: "Healthcare",
  },
  {
    id: "h8",
    symbol: "LLY",
    name: "Eli Lilly and Company",
    shares: 25,
    avgCost: 520.0,
    currentPrice: 598.45,
    value: 14961.25,
    costBasis: 13000,
    gain: 1961.25,
    gainPercent: 15.09,
    dayChange: 223,
    dayChangePercent: 1.51,
    allocation: 7.48,
    sector: "Healthcare",
  },
  {
    id: "h9",
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    shares: 70,
    avgCost: 155.0,
    currentPrice: 178.34,
    value: 12483.8,
    costBasis: 10850,
    gain: 1633.8,
    gainPercent: 15.06,
    dayChange: 224.7,
    dayChangePercent: 1.83,
    allocation: 6.24,
    sector: "Consumer Discretionary",
  },
  {
    id: "h10",
    symbol: "PG",
    name: "Procter & Gamble",
    shares: 60,
    avgCost: 142.0,
    currentPrice: 152.67,
    value: 9160.2,
    costBasis: 8520,
    gain: 640.2,
    gainPercent: 7.51,
    dayChange: 53.4,
    dayChangePercent: 0.59,
    allocation: 4.58,
    sector: "Consumer Staples",
  },
];

export const allocations: Allocation[] = [
  {
    id: "a1",
    category: "Technology",
    percentage: 53.72,
    value: 107456.9,
    change: 5.2,
    target: 50,
    color: "#5ba3a5",
  },
  {
    id: "a2",
    category: "Financial",
    percentage: 15.97,
    value: 31943.75,
    change: -2.3,
    target: 18,
    color: "#7ecbcc",
  },
  {
    id: "a3",
    category: "Healthcare",
    percentage: 15.41,
    value: 30811.45,
    change: 1.8,
    target: 15,
    color: "#4a7a6a",
  },
  {
    id: "a4",
    category: "Consumer",
    percentage: 10.82,
    value: 21644,
    change: 0.5,
    target: 12,
    color: "#c4a35a",
  },
  {
    id: "a5",
    category: "Cash",
    percentage: 4.08,
    value: 8143.9,
    change: -5.2,
    target: 5,
    color: "#6b7280",
  },
];

export const portfolioSummary: PortfolioSummary = {
  totalValue: 200000,
  totalCost: 164613.5,
  totalGain: 35386.5,
  totalGainPercent: 21.49,
  dayChange: 2348.1,
  dayChangePercent: 1.19,
  cashBalance: 8143.9,
  buyingPower: 8143.9,
};

export const portfolioPerformance: PerformanceDataPoint[] = [
  { date: "2024-01", value: 165000, benchmark: 160000 },
  { date: "2024-02", value: 168500, benchmark: 162500 },
  { date: "2024-03", value: 172000, benchmark: 165800 },
  { date: "2024-04", value: 169500, benchmark: 163200 },
  { date: "2024-05", value: 175800, benchmark: 168500 },
  { date: "2024-06", value: 180200, benchmark: 172000 },
  { date: "2024-07", value: 183500, benchmark: 175200 },
  { date: "2024-08", value: 178900, benchmark: 171800 },
  { date: "2024-09", value: 185400, benchmark: 178500 },
  { date: "2024-10", value: 192300, benchmark: 184200 },
  { date: "2024-11", value: 196800, benchmark: 188500 },
  { date: "2024-12", value: 200000, benchmark: 192000 },
];

export const recentTransactions: Transaction[] = [
  {
    id: "t1",
    date: "2024-12-20",
    type: "buy",
    symbol: "NVDA",
    shares: 10,
    price: 485.5,
    total: 4855,
    status: "completed",
  },
  {
    id: "t2",
    date: "2024-12-18",
    type: "dividend",
    symbol: "AAPL",
    shares: 0,
    price: 0.24,
    total: 36,
    status: "completed",
  },
  {
    id: "t3",
    date: "2024-12-15",
    type: "sell",
    symbol: "XOM",
    shares: 25,
    price: 108.2,
    total: 2705,
    status: "completed",
  },
  {
    id: "t4",
    date: "2024-12-12",
    type: "buy",
    symbol: "LLY",
    shares: 5,
    price: 575.3,
    total: 2876.5,
    status: "completed",
  },
  {
    id: "t5",
    date: "2024-12-10",
    type: "buy",
    symbol: "MSFT",
    shares: 15,
    price: 372.8,
    total: 5592,
    status: "completed",
  },
];

export function calculatePortfolioTotals(
  holdings: PortfolioHolding[]
): PortfolioSummary {
  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
  const totalCost = holdings.reduce((sum, h) => sum + h.costBasis, 0);
  const totalGain = totalValue - totalCost;
  const totalGainPercent = (totalGain / totalCost) * 100;
  const dayChange = holdings.reduce((sum, h) => sum + h.dayChange, 0);
  const dayChangePercent = (dayChange / (totalValue - dayChange)) * 100;

  return {
    totalValue,
    totalCost,
    totalGain,
    totalGainPercent,
    dayChange,
    dayChangePercent,
    cashBalance: 8143.9,
    buyingPower: 8143.9,
  };
}
