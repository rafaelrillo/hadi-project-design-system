// Path: src/pages/app/DashboardPage/DashboardPage.tsx
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Lightbulb,
  TrendingUp,
  LineChart as LineChartIcon,
  LogOut,
  User,
  Loader2,
} from "lucide-react";

// Stores
import { useAuthStore } from "../../../store";
import { useMarketStore } from "../../../store";
import { usePortfolioStore } from "../../../store";

// Chart data helpers
import { getStocksBySectorTreeMap, generateHistoricalPrices } from "../../../services/mockData/stocks";

// Hooks
import {
  useMarketStatus,
  useLastUpdateString,
} from "../../../hooks";

// SENTINEL Components - Atoms
import {
  AtmosphericBackground,
  DataReveal,
} from "../../../components/atoms/sentinel";

// SENTINEL Components - Organisms (Level 1 Core)
import {
  MarketStateIndicator,
  RiskGauge,
  ConfidenceLevel,
  SystemPulse,
} from "../../../components/organisms/sentinel";

// SENTINEL Components - Molecules (Levels 2 & 3)
import {
  FactorWeight,
  TrendIndicator,
  CyclePosition,
  RecommendationCard,
  AllocationSummary,
} from "../../../components/molecules/sentinel";

// Base Components
import { Button } from "../../../components/atoms/Button";
import { Modal } from "../../../components/organisms/Modal";
import { Tabs } from "../../../components/molecules/Tabs";
import { MetricCard } from "../../../components/molecules/MetricCard";
import { ToastProvider, useToast } from "../../../components/organisms/Toast";
import { InputText, InputDropdown } from "../../../components/atoms/Input";

// Charts
import { FinancialLineChart, TreeMap } from "../../../components/charts";

import styles from "./DashboardPage.module.css";

type TabId = "overview" | "portfolio" | "recommendations" | "market" | "analysis";

interface TradeModalState {
  isOpen: boolean;
  symbol: string;
  name: string;
  price: number;
  action: "buy" | "sell";
}

function DashboardContent() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { toast } = useToast();

  // Market data
  const {
    stocks,
    recommendations,
    indicators,
    factors,
    trends,
    cycle,
    sectorPerformance,
    isLive,
    isLoading,
    dataSource,
    fetchStocks,
    startLiveUpdates,
    stopLiveUpdates,
  } = useMarketStore();

  // Portfolio data
  const { holdings, allocations, summary, fetchPortfolio } =
    usePortfolioStore();

  // Market status
  const { marketState, riskLevel, riskValue, confidencePercent } =
    useMarketStatus();
  const lastUpdateStr = useLastUpdateString();

  // Toggle live updates
  const toggleLive = () => {
    if (isLive) {
      stopLiveUpdates();
    } else {
      startLiveUpdates();
    }
  };

  // State
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [tradeModal, setTradeModal] = useState<TradeModalState>({
    isOpen: false,
    symbol: "",
    name: "",
    price: 0,
    action: "buy",
  });
  const [tradeShares, setTradeShares] = useState("1");
  const [tradeOrderType, setTradeOrderType] = useState<"market" | "limit">("market");
  const [isExecuting, setIsExecuting] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    fetchStocks();
    fetchPortfolio();
  }, [fetchStocks, fetchPortfolio]);

  // Start live updates after initial fetch
  useEffect(() => {
    if (!isLoading && stocks.length > 0) {
      startLiveUpdates();
    }
    return () => stopLiveUpdates();
  }, [isLoading, stocks.length, startLiveUpdates, stopLiveUpdates]);

  const handleLogout = () => {
    logout();
    navigate("/app/login");
  };

  const openTradeModal = (
    symbol: string,
    name: string,
    price: number,
    action: "buy" | "sell"
  ) => {
    setTradeModal({ isOpen: true, symbol, name, price, action });
    setTradeShares("1");
    setTradeOrderType("market");
  };

  const closeTradeModal = () => {
    setTradeModal({ ...tradeModal, isOpen: false });
  };

  const executeTrade = async () => {
    setIsExecuting(true);
    const { executeTrade: execute } = usePortfolioStore.getState();
    const result = await execute({
      symbol: tradeModal.symbol,
      name: tradeModal.name,
      type: tradeModal.action,
      shares: parseInt(tradeShares) || 1,
      price: tradeModal.price,
      orderType: tradeOrderType,
    });

    setIsExecuting(false);

    if (result.success) {
      toast({
        title: "Trade Executed",
        description: result.message,
        type: "success",
      });
    } else {
      toast({
        title: "Trade Failed",
        description: result.message,
        type: "error",
      });
    }

    closeTradeModal();
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "portfolio", label: "Portfolio", icon: Wallet },
    { id: "recommendations", label: "Recommendations", icon: Lightbulb },
    { id: "market", label: "Market", icon: TrendingUp },
    { id: "analysis", label: "Analysis", icon: LineChartIcon },
  ];

  // Prepare data for FactorWeight component (needs id)
  const factorWeightData = factors.map((f, idx) => ({
    id: f.id || `factor-${idx}`,
    name: f.name,
    weight: f.weight,
    impact: f.impact,
    trend: f.trend,
  }));

  // Prepare data for AllocationSummary component
  const allocationData = allocations.map((a) => ({
    assetClass: a.category,
    percentage: a.percentage,
    color: a.color,
    change: a.change,
  }));

  // System status mapping
  const systemStatusMap: Record<string, "active" | "processing" | "idle"> = {
    active: "active",
    processing: "processing",
    idle: "idle",
    error: "idle",
  };
  const systemStatus = systemStatusMap[indicators.systemStatus] || "idle";

  // Chart data - fetch real historical data from API
  const [stocksChartData, setStocksChartData] = useState<Array<{
    id: string;
    data: Array<{ x: string; y: number }>;
  }>>([]);

  // Generate realistic chart data using real current prices from Finnhub
  useEffect(() => {
    if (stocks.length === 0) return;

    const topSymbols = ["AAPL", "MSFT", "NVDA", "GOOGL", "AMZN"];

    // Use real prices from store to anchor the simulated historical data
    const chartData = topSymbols.map(symbol => {
      const realStock = stocks.find(s => s.symbol === symbol);
      if (!realStock) return null;

      // Generate realistic GBM-based historical data ending at real current price
      const history = generateHistoricalPrices(realStock, 14, realStock.price);

      return {
        id: symbol,
        data: history.map((h) => ({
          x: h.date,
          y: h.price,
        })),
      };
    }).filter(Boolean) as Array<{ id: string; data: Array<{ x: string; y: number }> }>;

    setStocksChartData(chartData);
  }, [stocks]);

  const treeMapData = useMemo(() => {
    return getStocksBySectorTreeMap();
  }, []);

  return (
    <div className={styles.dashboard}>
      <AtmosphericBackground variant="subtle" animated />

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoText}>S</span>
        </div>

        <nav className={styles.sidebarNav}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ""}`}
                onClick={() => setActiveTab(tab.id as TabId)}
                title={tab.label}
              >
                <Icon size={20} />
              </button>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.navItem} title="Profile">
            <User size={20} />
          </button>
          <button className={styles.navItem} onClick={handleLogout} title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>SENTINEL</h1>
            <span className={styles.version}>v2.0.0</span>
          </div>

          <div className={styles.headerCenter}>
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={(id) => setActiveTab(id as TabId)}
              size="sm"
            />
          </div>

          <div className={styles.headerRight}>
            <div className={styles.liveIndicator} onClick={toggleLive}>
              <span className={`${styles.liveDot} ${isLive ? styles.live : ""}`} />
              <span className={styles.liveText}>
                {isLoading ? "LOADING..." : isLive ? "LIVE" : "PAUSED"}
              </span>
            </div>
            <span className={`${styles.dataSource} ${dataSource !== 'mock' && dataSource !== 'Mock' ? styles.realApi : ''}`}>
              {dataSource.toUpperCase()}
            </span>
            <SystemPulse status={systemStatus} size="sm" />
            <span className={styles.lastUpdate}>{lastUpdateStr}</span>
          </div>
        </header>

        {/* Indicators Bar */}
        <div className={styles.indicatorsBar}>
          <DataReveal delay={0}>
            <MarketStateIndicator state={marketState} size="sm" />
          </DataReveal>
          <DataReveal delay={100}>
            <RiskGauge level={riskLevel} value={riskValue} size="sm" />
          </DataReveal>
          <DataReveal delay={200}>
            <ConfidenceLevel level={indicators.confidenceLevel} percentage={confidencePercent} size="sm" />
          </DataReveal>
        </div>

        {/* Content Area */}
        <div className={styles.content}>
          {activeTab === "overview" && (
            <div className={styles.overviewGrid}>
              <DataReveal delay={0}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Key Factors</h3>
                  <FactorWeight factors={factorWeightData} maxVisible={6} />
                </div>
              </DataReveal>

              <DataReveal delay={100}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Portfolio Allocation</h3>
                  <AllocationSummary allocations={allocationData} showChanges />
                </div>
              </DataReveal>

              <DataReveal delay={200}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Economic Cycle</h3>
                  <CyclePosition
                    currentPhase={cycle.currentPhase}
                    confidence={cycle.confidence}
                    description={cycle.description}
                  />
                </div>
              </DataReveal>

              <DataReveal delay={300}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Top Recommendation</h3>
                  {recommendations[0] && (
                    <RecommendationCard
                      type={recommendations[0].type}
                      title={recommendations[0].title}
                      rationale={recommendations[0].rationale.slice(0, 150) + "..."}
                      assetClass="stocks"
                      confidence={recommendations[0].confidence}
                      timeframe={recommendations[0].timeframe}
                      priority={recommendations[0].priority}
                    />
                  )}
                </div>
              </DataReveal>

              <DataReveal delay={400}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Market Trends</h3>
                  <div className={styles.trendsGrid}>
                    {trends.slice(0, 4).map((trend) => (
                      <TrendIndicator
                        key={trend.label}
                        label={trend.label}
                        value={trend.value}
                        trend={trend.trend}
                        change={String(trend.change)}
                        period={trend.period}
                      />
                    ))}
                  </div>
                </div>
              </DataReveal>

              <DataReveal delay={500}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Sector Performance</h3>
                  <div className={styles.sectorGrid}>
                    {sectorPerformance.slice(0, 6).map((sector) => (
                      <div key={sector.sector} className={styles.sectorItem}>
                        <span className={styles.sectorName}>{sector.sector}</span>
                        <span
                          className={styles.sectorChange}
                          style={{
                            color:
                              sector.dayChange >= 0
                                ? "var(--sentinel-status-positive)"
                                : "var(--sentinel-status-negative)",
                          }}
                        >
                          {sector.dayChange >= 0 ? "+" : ""}
                          {sector.dayChange.toFixed(2)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </DataReveal>
            </div>
          )}

          {activeTab === "portfolio" && (
            <div className={styles.portfolioView}>
              <DataReveal delay={0}>
                <div className={styles.metricsRow}>
                  <MetricCard
                    title="Total Value"
                    value={`$${summary.totalValue.toLocaleString()}`}
                    trend={{
                      direction: summary.dayChange >= 0 ? "up" : "down",
                      value: summary.dayChangePercent,
                      label: "Today",
                    }}
                  />
                  <MetricCard
                    title="Day Change"
                    value={`${summary.dayChange >= 0 ? "+" : ""}$${summary.dayChange.toLocaleString()}`}
                    trend={{
                      direction: summary.dayChange >= 0 ? "up" : "down",
                      value: summary.dayChangePercent,
                      label: "%",
                    }}
                  />
                  <MetricCard
                    title="Total Gain"
                    value={`${summary.totalGain >= 0 ? "+" : ""}$${summary.totalGain.toLocaleString()}`}
                    trend={{
                      direction: summary.totalGain >= 0 ? "up" : "down",
                      value: summary.totalGainPercent,
                      label: "All time",
                    }}
                  />
                  <MetricCard
                    title="Cash Balance"
                    value={`$${summary.cashBalance.toLocaleString()}`}
                  />
                </div>
              </DataReveal>

              <DataReveal delay={100}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Holdings</h3>
                  <div className={styles.holdingsTable}>
                    <div className={styles.tableHeader}>
                      <span>Symbol</span>
                      <span>Name</span>
                      <span>Shares</span>
                      <span>Price</span>
                      <span>Value</span>
                      <span>Gain/Loss</span>
                    </div>
                    {holdings.map((holding) => (
                      <div key={holding.id} className={styles.tableRow}>
                        <span className={styles.symbol}>{holding.symbol}</span>
                        <span className={styles.name}>{holding.name}</span>
                        <span>{holding.shares}</span>
                        <span>${holding.currentPrice.toFixed(2)}</span>
                        <span>${holding.value.toLocaleString()}</span>
                        <span
                          style={{
                            color:
                              holding.gainPercent >= 0
                                ? "var(--sentinel-status-positive)"
                                : "var(--sentinel-status-negative)",
                          }}
                        >
                          {holding.gainPercent >= 0 ? "+" : ""}
                          {holding.gainPercent.toFixed(2)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </DataReveal>
            </div>
          )}

          {activeTab === "recommendations" && (
            <div className={styles.recommendationsView}>
              {recommendations.map((rec, index) => (
                <DataReveal key={rec.id} delay={index * 100}>
                  <div className={styles.recommendationItem}>
                    <div className={styles.recommendationCard}>
                      <RecommendationCard
                        type={rec.type}
                        title={rec.title}
                        rationale={rec.rationale}
                        assetClass="stocks"
                        confidence={rec.confidence}
                        timeframe={rec.timeframe}
                        priority={rec.priority}
                      />
                    </div>
                    <div className={styles.recommendationMeta}>
                      <div className={styles.stockInfo}>
                        <span className={styles.stockSymbol}>{rec.symbol}</span>
                        <span className={styles.stockName}>{rec.name}</span>
                        <span className={styles.stockPrice}>
                          ${rec.currentPrice.toFixed(2)}
                          {rec.targetPrice && (
                            <span className={styles.targetPrice}>
                              {" "}Target: ${rec.targetPrice.toFixed(2)}
                            </span>
                          )}
                        </span>
                      </div>
                      {(rec.type === "buy" || rec.type === "sell") && (
                        <Button
                          variant="primary"
                          onClick={() =>
                            openTradeModal(
                              rec.symbol,
                              rec.name,
                              rec.currentPrice,
                              rec.type as "buy" | "sell"
                            )
                          }
                        >
                          Execute Trade
                        </Button>
                      )}
                    </div>
                  </div>
                </DataReveal>
              ))}
            </div>
          )}

          {activeTab === "market" && (
            <div className={styles.marketView}>
              <DataReveal delay={0}>
                <div className={styles.metricsRow}>
                  {trends.slice(0, 4).map((trend) => (
                    <MetricCard
                      key={trend.label}
                      title={trend.label}
                      value={trend.value}
                      trend={{
                        direction: trend.trend,
                        value: trend.change,
                        label: trend.period,
                      }}
                    />
                  ))}
                </div>
              </DataReveal>

              {/* Stock Price Chart */}
              <DataReveal delay={100}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Stock Price Trends (14 Days)</h3>
                  <p className={styles.chartSubtitle}>Top 5 stocks by market cap</p>
                  <FinancialLineChart
                    data={stocksChartData}
                    height={350}
                    enableArea={true}
                    enablePoints={false}
                    showZeroLine={false}
                    yAxisLabel="Price ($)"
                    formatValue={(value) => `$${value.toFixed(0)}`}
                  />
                </div>
              </DataReveal>

              {/* Market TreeMap */}
              <DataReveal delay={200}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Market Capitalization by Sector</h3>
                  <p className={styles.chartSubtitle}>Size represents market cap in billions</p>
                  <TreeMap
                    data={treeMapData}
                    height={400}
                    tile="squarify"
                    enableLabels={true}
                    enableParentLabel={true}
                  />
                </div>
              </DataReveal>

              {/* Stocks Table */}
              <DataReveal delay={300}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>All Stocks</h3>
                  <div className={styles.stocksTable}>
                    <div className={styles.tableHeader}>
                      <span>Symbol</span>
                      <span>Name</span>
                      <span>Price</span>
                      <span>Change</span>
                      <span>Volume</span>
                      <span>Market Cap</span>
                      <span>Sector</span>
                    </div>
                    {stocks.map((stock) => (
                      <div key={stock.symbol} className={styles.tableRow}>
                        <span className={styles.symbol}>{stock.symbol}</span>
                        <span className={styles.name}>{stock.name}</span>
                        <span className={styles.price}>${stock.price.toFixed(2)}</span>
                        <span
                          className={styles.change}
                          style={{
                            color:
                              stock.changePercent >= 0
                                ? "var(--sentinel-status-positive)"
                                : "var(--sentinel-status-negative)",
                          }}
                        >
                          {stock.changePercent >= 0 ? "+" : ""}
                          {stock.changePercent.toFixed(2)}%
                        </span>
                        <span className={styles.volume}>
                          {(stock.volume / 1_000_000).toFixed(1)}M
                        </span>
                        <span className={styles.marketCap}>
                          ${(stock.marketCap / 1_000_000_000).toFixed(0)}B
                        </span>
                        <span className={styles.sector}>{stock.sector}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </DataReveal>

              {/* Sector Performance */}
              <DataReveal delay={400}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Sector Performance</h3>
                  <div className={styles.sectorGrid}>
                    {sectorPerformance.map((sector) => (
                      <div key={sector.sector} className={styles.sectorItem}>
                        <span className={styles.sectorName}>{sector.sector}</span>
                        <span
                          className={styles.sectorChange}
                          style={{
                            color:
                              sector.dayChange >= 0
                                ? "var(--sentinel-status-positive)"
                                : "var(--sentinel-status-negative)",
                          }}
                        >
                          {sector.dayChange >= 0 ? "+" : ""}
                          {sector.dayChange.toFixed(2)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </DataReveal>
            </div>
          )}

          {activeTab === "analysis" && (
            <div className={styles.analysisView}>
              <DataReveal delay={0}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Analysis</h3>
                  <p className={styles.analysisText}>
                    SENTINEL analyzes {indicators.indicatorCount} market indicators to provide investment recommendations.
                    Current market state is <strong>{marketState}</strong> with{" "}
                    <strong>{riskLevel}</strong> risk level and{" "}
                    <strong>{confidencePercent}%</strong> confidence.
                  </p>
                  <div className={styles.analysisFactors}>
                    <h4>Key Factors Driving Analysis</h4>
                    <FactorWeight factors={factorWeightData} maxVisible={8} />
                  </div>
                </div>
              </DataReveal>

              <DataReveal delay={100}>
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Economic Cycle Position</h3>
                  <CyclePosition
                    currentPhase={cycle.currentPhase}
                    confidence={cycle.confidence}
                    description={cycle.description}
                  />
                  <div className={styles.cycleDetails}>
                    <p>Time in current phase: {cycle.timeInPhase}</p>
                    <p>Estimated duration: {cycle.estimatedDuration}</p>
                    <p>Historical average return: {cycle.historicalAvgReturn}%</p>
                  </div>
                </div>
              </DataReveal>
            </div>
          )}
        </div>
      </main>

      {/* Trade Modal */}
      <Modal
        isOpen={tradeModal.isOpen}
        onClose={closeTradeModal}
        title={`${tradeModal.action === "buy" ? "Buy" : "Sell"} ${tradeModal.symbol}`}
      >
        <div className={styles.tradeModal}>
          <div className={styles.tradeInfo}>
            <p className={styles.tradeName}>{tradeModal.name}</p>
            <p className={styles.tradePrice}>
              Current Price: <strong>${tradeModal.price.toFixed(2)}</strong>
            </p>
          </div>

          <div className={styles.tradeForm}>
            <div className={styles.tradeField}>
              <label>Order Type</label>
              <InputDropdown
                value={tradeOrderType}
                onChange={(value) =>
                  setTradeOrderType(value as "market" | "limit")
                }
                options={[
                  { value: "market", label: "Market Order" },
                  { value: "limit", label: "Limit Order" },
                ]}
              />
            </div>

            <div className={styles.tradeField}>
              <label>Shares</label>
              <InputText
                type="number"
                value={tradeShares}
                onChange={(e) => setTradeShares(e.target.value)}
                placeholder="Number of shares"
              />
            </div>

            <div className={styles.tradeTotal}>
              <span>Estimated Total</span>
              <strong>
                ${(tradeModal.price * (parseInt(tradeShares) || 0)).toLocaleString()}
              </strong>
            </div>
          </div>

          <div className={styles.tradeActions}>
            <Button variant="secondary" onClick={closeTradeModal}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={executeTrade}
              disabled={!tradeShares || parseInt(tradeShares) < 1 || isExecuting}
            >
              {isExecuting ? (
                <>
                  <Loader2 className={styles.spinner} size={16} />
                  Processing...
                </>
              ) : (
                `Confirm ${tradeModal.action === "buy" ? "Purchase" : "Sale"}`
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function DashboardPage() {
  return (
    <ToastProvider>
      <DashboardContent />
    </ToastProvider>
  );
}
