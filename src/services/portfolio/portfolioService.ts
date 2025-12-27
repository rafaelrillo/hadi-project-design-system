// Path: src/services/portfolio/portfolioService.ts

import { apiClient, ENDPOINTS } from "../api";
import { config } from "../../config/env";
import {
  portfolioHoldings,
  allocations,
  portfolioSummary,
  portfolioPerformance,
  recentTransactions,
  calculatePortfolioTotals,
  type PortfolioHolding,
  type Allocation,
  type PortfolioSummary,
  type PerformanceDataPoint,
  type Transaction,
} from "../mockData/portfolio";

export interface TradeOrder {
  symbol: string;
  name: string;
  type: "buy" | "sell";
  shares: number;
  price: number;
  orderType: "market" | "limit";
  limitPrice?: number;
}

export interface TradeResult {
  success: boolean;
  trade: TradeOrder;
  executedPrice: number;
  total: number;
  message: string;
  transactionId: string;
}

export interface PortfolioData {
  holdings: PortfolioHolding[];
  allocations: Allocation[];
  summary: PortfolioSummary;
  performance: PerformanceDataPoint[];
  transactions: Transaction[];
}

export interface PortfolioServiceConfig {
  useMock?: boolean;
}

class PortfolioService {
  private useMock: boolean;

  constructor(serviceConfig: PortfolioServiceConfig = {}) {
    this.useMock = serviceConfig.useMock ?? true;
  }

  setUseMock(value: boolean): void {
    this.useMock = value;
  }

  async getPortfolio(): Promise<PortfolioData> {
    if (this.useMock || config.api.useMock) {
      await this.simulateDelay(500);
      return {
        holdings: [...portfolioHoldings],
        allocations: [...allocations],
        summary: { ...portfolioSummary },
        performance: [...portfolioPerformance],
        transactions: [...recentTransactions],
      };
    }

    const [holdingsRes, allocationsRes, summaryRes, performanceRes, transactionsRes] =
      await Promise.all([
        apiClient.get<PortfolioHolding[]>(ENDPOINTS.PORTFOLIO.HOLDINGS),
        apiClient.get<Allocation[]>(ENDPOINTS.PORTFOLIO.ALLOCATIONS),
        apiClient.get<PortfolioSummary>(ENDPOINTS.PORTFOLIO.SUMMARY),
        apiClient.get<PerformanceDataPoint[]>(ENDPOINTS.PORTFOLIO.PERFORMANCE),
        apiClient.get<Transaction[]>(ENDPOINTS.PORTFOLIO.TRANSACTIONS),
      ]);

    return {
      holdings: holdingsRes.data,
      allocations: allocationsRes.data,
      summary: summaryRes.data,
      performance: performanceRes.data,
      transactions: transactionsRes.data,
    };
  }

  async getHoldings(): Promise<PortfolioHolding[]> {
    if (this.useMock || config.api.useMock) {
      await this.simulateDelay(300);
      return [...portfolioHoldings];
    }

    const response = await apiClient.get<PortfolioHolding[]>(
      ENDPOINTS.PORTFOLIO.HOLDINGS
    );
    return response.data;
  }

  async getSummary(): Promise<PortfolioSummary> {
    if (this.useMock || config.api.useMock) {
      await this.simulateDelay(200);
      return { ...portfolioSummary };
    }

    const response = await apiClient.get<PortfolioSummary>(
      ENDPOINTS.PORTFOLIO.SUMMARY
    );
    return response.data;
  }

  async getAllocations(): Promise<Allocation[]> {
    if (this.useMock || config.api.useMock) {
      await this.simulateDelay(200);
      return [...allocations];
    }

    const response = await apiClient.get<Allocation[]>(
      ENDPOINTS.PORTFOLIO.ALLOCATIONS
    );
    return response.data;
  }

  async getPerformance(): Promise<PerformanceDataPoint[]> {
    if (this.useMock || config.api.useMock) {
      await this.simulateDelay(300);
      return [...portfolioPerformance];
    }

    const response = await apiClient.get<PerformanceDataPoint[]>(
      ENDPOINTS.PORTFOLIO.PERFORMANCE
    );
    return response.data;
  }

  async getTransactions(limit = 20): Promise<Transaction[]> {
    if (this.useMock || config.api.useMock) {
      await this.simulateDelay(200);
      return recentTransactions.slice(0, limit);
    }

    const response = await apiClient.get<Transaction[]>(
      ENDPOINTS.PORTFOLIO.TRANSACTIONS,
      { limit: String(limit) }
    );
    return response.data;
  }

  async executeTrade(order: TradeOrder): Promise<TradeResult> {
    if (this.useMock || config.api.useMock) {
      await this.simulateDelay(600);
      return this.simulateTrade(order);
    }

    const response = await apiClient.post<TradeResult>(
      ENDPOINTS.TRADING.EXECUTE,
      order
    );
    return response.data;
  }

  async cancelOrder(orderId: string): Promise<{ success: boolean; message: string }> {
    if (this.useMock || config.api.useMock) {
      await this.simulateDelay(300);
      return {
        success: true,
        message: `Order ${orderId} cancelled successfully`,
      };
    }

    const response = await apiClient.post<{ success: boolean; message: string }>(
      ENDPOINTS.TRADING.CANCEL_ORDER(orderId)
    );
    return response.data;
  }

  // Calculate updated portfolio summary based on holdings
  calculateTotals(holdings: PortfolioHolding[]): PortfolioSummary {
    return calculatePortfolioTotals(holdings);
  }

  // Simulate trade execution (mock mode only)
  private simulateTrade(order: TradeOrder): TradeResult {
    const executedPrice =
      order.orderType === "market"
        ? order.price * (1 + (Math.random() - 0.5) * 0.002) // Slight slippage
        : order.limitPrice || order.price;

    const total = executedPrice * order.shares;

    // Basic validation
    if (order.type === "buy") {
      // Check if enough buying power (simplified check)
      if (total > portfolioSummary.buyingPower) {
        return {
          success: false,
          trade: order,
          executedPrice: 0,
          total: 0,
          message: "Insufficient buying power",
          transactionId: "",
        };
      }
    } else {
      // Check if enough shares to sell
      const holding = portfolioHoldings.find((h) => h.symbol === order.symbol);
      if (!holding || holding.shares < order.shares) {
        return {
          success: false,
          trade: order,
          executedPrice: 0,
          total: 0,
          message: "Insufficient shares",
          transactionId: "",
        };
      }
    }

    return {
      success: true,
      trade: order,
      executedPrice: Math.round(executedPrice * 100) / 100,
      total: Math.round(total * 100) / 100,
      message: `${order.type === "buy" ? "Purchased" : "Sold"} ${order.shares} shares of ${order.symbol} at $${executedPrice.toFixed(2)}`,
      transactionId: `t${Date.now()}`,
    };
  }

  private simulateDelay(ms = 300): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Singleton instance
export const portfolioService = new PortfolioService({
  useMock: config.api.useMock,
});

export default portfolioService;
