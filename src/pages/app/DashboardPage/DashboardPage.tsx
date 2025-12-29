// Path: src/pages/app/DashboardPage/DashboardPage.tsx
// Overview/Home page for the SENTINEL Dashboard

import { useEffect, useMemo } from 'react';

// Stores
import { useMarketStore } from '../../../store';
import { usePortfolioStore } from '../../../store';

// Chart data helpers
import { getStocksBySectorTreeMap, generateHistoricalPrices } from '../../../services/mockData/stocks';

// Hooks
import { useMarketStatus } from '../../../hooks';

// SENTINEL Components - Atoms
import { DataReveal } from '../../../components/atoms/sentinel';

// SENTINEL Components - Molecules (Levels 2 & 3)
import {
  FactorWeight,
  TrendIndicator,
  CyclePosition,
  RecommendationCard,
  AllocationSummary,
} from '../../../components/molecules/sentinel';

// Charts
import { FinancialLineChart, TreeMap } from '../../../components/charts';

import styles from './DashboardPage.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function DashboardPage() {
  // Market data
  const {
    stocks,
    recommendations,
    factors,
    trends,
    cycle,
    sectorPerformance,
    fetchStocks,
    startLiveUpdates,
    stopLiveUpdates,
  } = useMarketStore();

  // Portfolio data
  const { allocations, fetchPortfolio } = usePortfolioStore();

  // Market status
  const { marketState, riskLevel, confidencePercent } = useMarketStatus();

  // Fetch data on mount
  useEffect(() => {
    fetchStocks();
    fetchPortfolio();
  }, [fetchStocks, fetchPortfolio]);

  // Start live updates
  useEffect(() => {
    if (stocks.length > 0) {
      startLiveUpdates();
    }
    return () => stopLiveUpdates();
  }, [stocks.length, startLiveUpdates, stopLiveUpdates]);

  // Prepare data for FactorWeight component
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

  // Performance comparison chart data - Your Portfolio vs SENTINEL Recommendations
  const performanceComparisonData = useMemo(() => {
    // Generate 12 months of data
    const months = 12;
    const startValue = 10000; // Starting investment of $10,000

    const yourPortfolioData: Array<{ x: string; y: number }> = [];
    const sentinelData: Array<{ x: string; y: number }> = [];

    let yourValue = startValue;
    let sentinelValue = startValue;

    for (let i = 0; i < months; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - (months - 1 - i));
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

      // Your portfolio - decent returns, slightly more volatile
      const yourMonthlyReturn = (Math.random() - 0.35) * 0.05 + 0.008; // ~0.8% avg monthly return
      yourValue = yourValue * (1 + yourMonthlyReturn);

      // SENTINEL recommendations - steadier, slightly higher returns
      const sentinelMonthlyReturn = (Math.random() - 0.3) * 0.04 + 0.012; // ~1.2% avg monthly return
      sentinelValue = sentinelValue * (1 + sentinelMonthlyReturn);

      yourPortfolioData.push({ x: dateStr, y: Math.round(yourValue) });
      sentinelData.push({ x: dateStr, y: Math.round(sentinelValue) });
    }

    return [
      { id: 'Your Portfolio', data: yourPortfolioData },
      { id: 'SENTINEL Strategy', data: sentinelData },
    ];
  }, []);

  // Calculate performance metrics for the comparison
  const performanceMetrics = useMemo(() => {
    if (performanceComparisonData.length < 2) return null;

    const yourData = performanceComparisonData[0].data;
    const sentinelData = performanceComparisonData[1].data;

    const yourStart = yourData[0]?.y || 10000;
    const yourEnd = yourData[yourData.length - 1]?.y || 10000;
    const sentinelStart = sentinelData[0]?.y || 10000;
    const sentinelEnd = sentinelData[sentinelData.length - 1]?.y || 10000;

    const yourReturn = ((yourEnd - yourStart) / yourStart) * 100;
    const sentinelReturn = ((sentinelEnd - sentinelStart) / sentinelStart) * 100;
    const difference = sentinelReturn - yourReturn;

    return {
      yourReturn: yourReturn.toFixed(1),
      sentinelReturn: sentinelReturn.toFixed(1),
      difference: difference.toFixed(1),
      yourValue: yourEnd.toLocaleString(),
      sentinelValue: sentinelEnd.toLocaleString(),
    };
  }, [performanceComparisonData]);

  // Chart data - generate realistic historical data based on current stock prices
  const stocksChartData = useMemo(() => {
    if (stocks.length === 0) return [];

    const topSymbols = ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'AMZN'];

    return topSymbols
      .map((symbol) => {
        const stock = stocks.find((s) => s.symbol === symbol);
        if (!stock) return null;

        const history = generateHistoricalPrices(stock, 14, stock.price);

        return {
          id: symbol,
          data: history.map((h) => ({
            x: h.date,
            y: h.price,
          })),
        };
      })
      .filter(Boolean) as Array<{ id: string; data: Array<{ x: string; y: number }> }>;
  }, [stocks]);

  const treeMapData = useMemo(() => {
    return getStocksBySectorTreeMap();
  }, []);

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Market Overview</h2>
        <p className={styles.pageSubtitle}>
          Market state: <strong>{marketState}</strong> | Risk: <strong>{riskLevel}</strong> |
          Confidence: <strong>{confidencePercent}%</strong>
        </p>
      </div>

      {/* Performance Comparison Chart - Your Portfolio vs SENTINEL */}
      <DataReveal delay={0}>
        <div className={styles.comparisonCard}>
          <div className={styles.comparisonHeader}>
            <div>
              <h3 className={styles.comparisonTitle}>Portfolio Performance Comparison</h3>
              <p className={styles.comparisonSubtitle}>
                See how your investments compare to SENTINEL's recommended strategy
              </p>
            </div>
            {performanceMetrics && (
              <div className={styles.metricsRow}>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Your Portfolio</span>
                  <span
                    className={styles.metricValue}
                    style={{
                      color:
                        parseFloat(performanceMetrics.yourReturn) >= 0
                          ? 'var(--sentinel-status-positive)'
                          : 'var(--sentinel-status-negative)',
                    }}
                  >
                    {parseFloat(performanceMetrics.yourReturn) >= 0 ? '+' : ''}
                    {performanceMetrics.yourReturn}%
                  </span>
                  <span className={styles.metricSubvalue}>${performanceMetrics.yourValue}</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>SENTINEL Strategy</span>
                  <span
                    className={styles.metricValue}
                    style={{
                      color:
                        parseFloat(performanceMetrics.sentinelReturn) >= 0
                          ? 'var(--sentinel-status-positive)'
                          : 'var(--sentinel-status-negative)',
                    }}
                  >
                    {parseFloat(performanceMetrics.sentinelReturn) >= 0 ? '+' : ''}
                    {performanceMetrics.sentinelReturn}%
                  </span>
                  <span className={styles.metricSubvalue}>${performanceMetrics.sentinelValue}</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricLabel}>Difference</span>
                  <span
                    className={styles.metricValue}
                    style={{
                      color:
                        parseFloat(performanceMetrics.difference) >= 0
                          ? 'var(--sentinel-status-positive)'
                          : 'var(--sentinel-status-negative)',
                    }}
                  >
                    {parseFloat(performanceMetrics.difference) >= 0 ? '+' : ''}
                    {performanceMetrics.difference}%
                  </span>
                  <span className={styles.metricSubvalue}>potential gain</span>
                </div>
              </div>
            )}
          </div>
          <FinancialLineChart
            data={performanceComparisonData}
            height={280}
            enableArea={true}
            enablePoints={true}
            showZeroLine={false}
            yAxisLabel="Portfolio Value ($)"
            formatValue={(value) => `$${value.toLocaleString()}`}
            colors={['#F5A623', '#00D4AA']}
          />
        </div>
      </DataReveal>

      {/* Overview Grid */}
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
                rationale={recommendations[0].rationale.slice(0, 150) + '...'}
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
                          ? 'var(--sentinel-status-positive)'
                          : 'var(--sentinel-status-negative)',
                    }}
                  >
                    {sector.dayChange >= 0 ? '+' : ''}
                    {sector.dayChange.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </DataReveal>
      </div>

      {/* Charts Section */}
      <div className={styles.chartsSection}>
        <DataReveal delay={600}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Stock Price Trends (14 Days)</h3>
            <p className={styles.chartSubtitle}>Top 5 stocks by market cap</p>
            <FinancialLineChart
              data={stocksChartData}
              height={300}
              enableArea={true}
              enablePoints={false}
              showZeroLine={false}
              yAxisLabel="Price ($)"
              formatValue={(value) => `$${value.toFixed(0)}`}
            />
          </div>
        </DataReveal>

        <DataReveal delay={700}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Market Cap by Sector</h3>
            <p className={styles.chartSubtitle}>Size represents market cap in billions</p>
            <TreeMap
              data={treeMapData}
              height={300}
              tile="squarify"
              enableLabels={true}
              enableParentLabel={true}
            />
          </div>
        </DataReveal>
      </div>
    </div>
  );
}
