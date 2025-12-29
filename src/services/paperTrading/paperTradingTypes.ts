// Path: src/services/paperTrading/paperTradingTypes.ts

// ─────────────────────────────────────────────────────────────────────────────
// PAPER TRADING TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type TradeType = 'buy' | 'sell';
export type OrderType = 'market' | 'limit';
export type OrderStatus = 'pending' | 'filled' | 'cancelled' | 'failed';

export interface Position {
  /** Stock ticker */
  ticker: string;
  /** Company name */
  name: string;
  /** Number of shares owned */
  shares: number;
  /** Average cost per share */
  avgCost: number;
  /** Current market price */
  currentPrice: number;
  /** Total market value */
  marketValue: number;
  /** Total gain/loss in dollars */
  gainLoss: number;
  /** Gain/loss percentage */
  gainLossPercent: number;
  /** Today's change */
  dayChange: number;
  /** Today's change percentage */
  dayChangePercent: number;
  /** Portfolio allocation percentage */
  allocation: number;
}

export interface Transaction {
  /** Unique transaction ID */
  id: string;
  /** Transaction type */
  type: TradeType;
  /** Stock ticker */
  ticker: string;
  /** Company name */
  name: string;
  /** Number of shares */
  shares: number;
  /** Price per share */
  price: number;
  /** Total transaction value */
  total: number;
  /** Transaction fee */
  fee: number;
  /** Transaction status */
  status: OrderStatus;
  /** Transaction timestamp */
  timestamp: string;
  /** Order type */
  orderType: OrderType;
  /** Limit price (if limit order) */
  limitPrice?: number;
}

export interface TradeOrder {
  /** Stock ticker */
  ticker: string;
  /** Company name */
  name: string;
  /** Trade type */
  type: TradeType;
  /** Order type */
  orderType: OrderType;
  /** Number of shares or dollar amount */
  amount: number;
  /** Whether amount is in shares or dollars */
  amountType: 'shares' | 'dollars';
  /** Limit price (for limit orders) */
  limitPrice?: number;
}

export interface TradeResult {
  /** Whether the trade was successful */
  success: boolean;
  /** Transaction details (if successful) */
  transaction?: Transaction;
  /** Error message (if failed) */
  error?: string;
}

export interface WalletSummary {
  /** Total portfolio value (positions + cash) */
  totalValue: number;
  /** Cash balance */
  cashBalance: number;
  /** Total invested in positions */
  investedValue: number;
  /** Total gain/loss */
  totalGainLoss: number;
  /** Total gain/loss percentage */
  totalGainLossPercent: number;
  /** Today's change */
  dayChange: number;
  /** Today's change percentage */
  dayChangePercent: number;
  /** Number of positions */
  positionCount: number;
}

export interface PaperTradingState {
  /** User's cash balance */
  cashBalance: number;
  /** User's positions */
  positions: Position[];
  /** Transaction history */
  transactions: Transaction[];
  /** Last updated timestamp */
  lastUpdated: string;
}
