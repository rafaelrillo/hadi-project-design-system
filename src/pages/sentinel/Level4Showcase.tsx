// Path: src/pages/sentinel/Level4Showcase.tsx
import { type CSSProperties } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import {
  HistoricalDetailView,
  PeriodComparison,
  ModelInsights,
  CorrelationMatrix,
  PerformanceChart,
  BacktestResults,
} from '../../components/organisms/sentinel';
import { DepthLayer } from '../../components/atoms/sentinel';
import { FadeIn, ScrollReveal } from '../../components/animations';
import type {
  HistoricalPeriodDetail,
  ComparisonPeriod,
  ModelMetadata,
  ModelInput,
  ModelOutput,
  CorrelationPair,
  MatrixItem,
  PerformanceSeries,
  BacktestSummary,
  BacktestStatistic,
  BacktestTrade,
} from '../../components/organisms/sentinel';

export function Level4Showcase() {
  // Page styles
  const pageHeaderStyles: CSSProperties = {
    marginBottom: '48px',
  };

  const titleStyles: CSSProperties = {
    fontSize: '32px',
    fontWeight: 300,
    color: 'var(--sentinel-text-primary)',
    marginBottom: '12px',
    fontFamily: 'var(--sentinel-font-primary)',
    letterSpacing: '-0.02em',
  };

  const descStyles: CSSProperties = {
    fontSize: '14px',
    color: 'var(--sentinel-text-secondary)',
    fontFamily: 'var(--sentinel-font-primary)',
    fontWeight: 400,
    maxWidth: '700px',
    lineHeight: 1.6,
  };

  const sectionHeaderStyles: CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--sentinel-accent-primary)',
    marginTop: '64px',
    marginBottom: '24px',
    fontFamily: 'var(--sentinel-font-primary)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    borderBottom: '1px solid var(--sentinel-border-subtle)',
    paddingBottom: '12px',
  };

  // Sample data for HistoricalDetailView
  const historicalPeriods: HistoricalPeriodDetail[] = [
    {
      id: '2019-rally',
      name: 'Pre-Pandemic Rally',
      startDate: '2019-01-01',
      endDate: '2020-02-19',
      similarity: 87,
      returnPercentage: 34.2,
      volatility: 12.5,
      duration: '414 days',
      keyEvents: [
        { id: 'e1', date: '2019-07-31', title: 'Fed Rate Cut', description: 'First rate cut since 2008', impact: 'neutral', magnitude: 'medium' },
        { id: 'e2', date: '2019-10-11', title: 'Trade Deal Progress', description: 'Phase 1 trade deal announced', impact: 'positive', magnitude: 'high' },
        { id: 'e3', date: '2020-01-03', title: 'Iran Tensions', description: 'Geopolitical uncertainty spike', impact: 'negative', magnitude: 'medium' },
      ],
    },
    {
      id: '2016-election',
      name: 'Election Cycle 2016',
      startDate: '2016-06-01',
      endDate: '2017-03-01',
      similarity: 71,
      returnPercentage: 18.1,
      volatility: 15.2,
      duration: '273 days',
      keyEvents: [
        { id: 'e4', date: '2016-06-23', title: 'Brexit Vote', description: 'UK votes to leave EU', impact: 'negative', magnitude: 'high' },
        { id: 'e5', date: '2016-11-08', title: 'US Election', description: 'Trump elected president', impact: 'neutral', magnitude: 'high' },
        { id: 'e6', date: '2016-12-14', title: 'Fed Rate Hike', description: 'Second rate hike post-2008', impact: 'neutral', magnitude: 'medium' },
      ],
    },
    {
      id: '2011-crisis',
      name: 'Debt Ceiling Crisis',
      startDate: '2011-07-01',
      endDate: '2011-12-31',
      similarity: 54,
      returnPercentage: -8.7,
      volatility: 32.4,
      duration: '184 days',
      keyEvents: [
        { id: 'e7', date: '2011-08-05', title: 'S&P Downgrade', description: 'US credit rating downgraded', impact: 'negative', magnitude: 'high' },
        { id: 'e8', date: '2011-08-08', title: 'Market Crash', description: 'S&P 500 drops 6.7%', impact: 'negative', magnitude: 'high' },
        { id: 'e9', date: '2011-10-27', title: 'EU Summit', description: 'Greece debt deal reached', impact: 'positive', magnitude: 'medium' },
      ],
    },
  ];

  // Sample data for PeriodComparison
  const comparisonPeriods: ComparisonPeriod[] = [
    {
      id: 'current',
      name: 'Current Period',
      dateRange: 'Jan 2024 - Dec 2024',
      isCurrent: true,
      metrics: [
        { id: 'return', label: 'Total Return', value: 24.8, format: 'percentage' },
        { id: 'volatility', label: 'Volatility', value: 15.2, format: 'percentage' },
        { id: 'sharpe', label: 'Sharpe Ratio', value: 1.42, format: 'number', higherIsBetter: true },
        { id: 'maxdd', label: 'Max Drawdown', value: -8.3, format: 'percentage', higherIsBetter: false },
        { id: 'trades', label: 'Total Trades', value: 47, format: 'number' },
        { id: 'winrate', label: 'Win Rate', value: 62.5, format: 'percentage', higherIsBetter: true },
      ],
    },
    {
      id: 'benchmark',
      name: 'S&P 500',
      dateRange: 'Jan 2024 - Dec 2024',
      metrics: [
        { id: 'return', label: 'Total Return', value: 22.1, format: 'percentage' },
        { id: 'volatility', label: 'Volatility', value: 14.8, format: 'percentage' },
        { id: 'sharpe', label: 'Sharpe Ratio', value: 1.28, format: 'number', higherIsBetter: true },
        { id: 'maxdd', label: 'Max Drawdown', value: -10.2, format: 'percentage', higherIsBetter: false },
        { id: 'trades', label: 'Total Trades', value: 0, format: 'number' },
        { id: 'winrate', label: 'Win Rate', value: 0, format: 'percentage', higherIsBetter: true },
      ],
    },
    {
      id: 'lastyear',
      name: 'Previous Year',
      dateRange: 'Jan 2023 - Dec 2023',
      metrics: [
        { id: 'return', label: 'Total Return', value: 18.4, format: 'percentage' },
        { id: 'volatility', label: 'Volatility', value: 17.8, format: 'percentage' },
        { id: 'sharpe', label: 'Sharpe Ratio', value: 0.98, format: 'number', higherIsBetter: true },
        { id: 'maxdd', label: 'Max Drawdown', value: -12.1, format: 'percentage', higherIsBetter: false },
        { id: 'trades', label: 'Total Trades', value: 52, format: 'number' },
        { id: 'winrate', label: 'Win Rate', value: 58.2, format: 'percentage', higherIsBetter: true },
      ],
    },
  ];

  // Sample data for ModelInsights
  const modelMetadata: ModelMetadata = {
    name: 'SENTINEL Alpha Model',
    version: {
      version: '2.4.1',
      releaseDate: '2024-12-20',
      changes: [
        'Improved sentiment analysis accuracy',
        'Added options flow signals',
        'Enhanced regime detection',
      ],
    },
    accuracy: 78.5,
    lastTrainedDate: '2024-12-15',
    dataPoints: 1250000,
    updateFrequency: 'Daily',
  };

  const modelInputs: ModelInput[] = [
    { id: '1', name: 'Price Momentum', category: 'Technical', weight: 0.22, status: 'active', description: '20/50/200 day moving average crossovers and RSI signals', lastUpdate: '2024-12-26T09:00:00Z' },
    { id: '2', name: 'Earnings Revision', category: 'Fundamental', weight: 0.18, status: 'active', description: 'Analyst estimate changes over 30/60/90 day windows', lastUpdate: '2024-12-26T06:00:00Z' },
    { id: '3', name: 'Sector Rotation', category: 'Technical', weight: 0.15, status: 'active', description: 'Relative strength of sectors vs S&P 500 benchmark' },
    { id: '4', name: 'Macro Indicators', category: 'Macro', weight: 0.14, status: 'active', description: 'PMI, employment, inflation, and Fed policy signals' },
    { id: '5', name: 'Sentiment Analysis', category: 'Alternative', weight: 0.12, status: 'degraded', description: 'News sentiment and social media signal aggregation', lastUpdate: '2024-12-25T18:00:00Z' },
    { id: '6', name: 'Options Flow', category: 'Alternative', weight: 0.10, status: 'active', description: 'Unusual options activity and put/call ratios' },
    { id: '7', name: 'Volatility Regime', category: 'Technical', weight: 0.09, status: 'active', description: 'VIX term structure and realized volatility analysis' },
  ];

  const modelOutputs: ModelOutput[] = [
    { id: '1', name: 'Market Direction', value: 'Bullish', confidence: 78, trend: 'improving' },
    { id: '2', name: 'Recommended Allocation', value: '65% Equity', confidence: 72, trend: 'stable' },
    { id: '3', name: 'Risk Assessment', value: 'Moderate', confidence: 85, trend: 'stable' },
    { id: '4', name: 'Sector Preference', value: 'Technology', confidence: 68, trend: 'improving' },
  ];

  // Sample data for CorrelationMatrix
  const matrixItems: MatrixItem[] = [
    { id: 'spy', label: 'S&P 500', shortLabel: 'SPY' },
    { id: 'qqq', label: 'NASDAQ 100', shortLabel: 'QQQ' },
    { id: 'iwm', label: 'Russell 2000', shortLabel: 'IWM' },
    { id: 'efa', label: 'Developed Markets', shortLabel: 'EFA' },
    { id: 'eem', label: 'Emerging Markets', shortLabel: 'EEM' },
    { id: 'gld', label: 'Gold', shortLabel: 'GLD' },
    { id: 'tlt', label: 'Long-Term Bonds', shortLabel: 'TLT' },
  ];

  const correlations: CorrelationPair[] = [
    { rowId: 'spy', colId: 'qqq', value: 0.92 },
    { rowId: 'spy', colId: 'iwm', value: 0.88 },
    { rowId: 'spy', colId: 'efa', value: 0.78 },
    { rowId: 'spy', colId: 'eem', value: 0.68 },
    { rowId: 'spy', colId: 'gld', value: 0.12 },
    { rowId: 'spy', colId: 'tlt', value: -0.35 },
    { rowId: 'qqq', colId: 'iwm', value: 0.82 },
    { rowId: 'qqq', colId: 'efa', value: 0.72 },
    { rowId: 'qqq', colId: 'eem', value: 0.62 },
    { rowId: 'qqq', colId: 'gld', value: 0.08 },
    { rowId: 'qqq', colId: 'tlt', value: -0.42 },
    { rowId: 'iwm', colId: 'efa', value: 0.75 },
    { rowId: 'iwm', colId: 'eem', value: 0.72 },
    { rowId: 'iwm', colId: 'gld', value: 0.15 },
    { rowId: 'iwm', colId: 'tlt', value: -0.28 },
    { rowId: 'efa', colId: 'eem', value: 0.82 },
    { rowId: 'efa', colId: 'gld', value: 0.22 },
    { rowId: 'efa', colId: 'tlt', value: -0.18 },
    { rowId: 'eem', colId: 'gld', value: 0.28 },
    { rowId: 'eem', colId: 'tlt', value: -0.12 },
    { rowId: 'gld', colId: 'tlt', value: 0.45 },
  ];

  // Sample data for PerformanceChart
  const generatePerformanceData = (startValue: number, volatility: number, trend: number): { date: string; value: number }[] => {
    const data = [];
    let value = startValue;
    const startDate = new Date('2023-01-01');

    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      value = value * (1 + (Math.random() - 0.5) * volatility + trend);
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.round(value * 100) / 100,
      });
    }
    return data;
  };

  const performanceSeries: PerformanceSeries[] = [
    { id: 'portfolio', name: 'Portfolio', data: generatePerformanceData(100000, 0.02, 0.0003) },
    { id: 'benchmark', name: 'S&P 500', data: generatePerformanceData(100000, 0.015, 0.00025), isBenchmark: true },
  ];

  // Sample data for BacktestResults
  const backtestSummary: BacktestSummary = {
    totalReturn: 48750,
    totalReturnPercent: 48.75,
    annualizedReturn: 22.4,
    sharpeRatio: 1.85,
    maxDrawdown: 12.3,
    winRate: 64.2,
    totalTrades: 127,
    profitFactor: 2.14,
    averageWin: 1250,
    averageLoss: -580,
    startDate: '2022-01-01',
    endDate: '2024-12-26',
    initialCapital: 100000,
    finalCapital: 148750,
  };

  const backtestStatistics: BacktestStatistic[] = [
    { id: '1', label: 'Calmar Ratio', value: '1.82', category: 'risk', benchmark: '1.45', isBetter: true },
    { id: '2', label: 'Sortino Ratio', value: '2.41', category: 'risk', benchmark: '1.92', isBetter: true },
    { id: '3', label: 'Beta', value: '0.85', category: 'risk', description: 'Lower market sensitivity' },
    { id: '4', label: 'Alpha', value: '+4.2%', category: 'returns', benchmark: '0%', isBetter: true },
    { id: '5', label: 'Information Ratio', value: '0.92', category: 'efficiency' },
    { id: '6', label: 'Avg Trade Duration', value: '14.2 days', category: 'trades' },
    { id: '7', label: 'Max Consecutive Wins', value: '8', category: 'trades' },
    { id: '8', label: 'Max Consecutive Losses', value: '4', category: 'trades' },
  ];

  const backtestTrades: BacktestTrade[] = [
    { id: '1', symbol: 'AAPL', type: 'long', entryDate: '2024-12-10', exitDate: '2024-12-20', entryPrice: 242.50, exitPrice: 255.80, quantity: 50, pnl: 665, pnlPercent: 5.48, holdingDays: 10 },
    { id: '2', symbol: 'NVDA', type: 'long', entryDate: '2024-12-05', exitDate: '2024-12-18', entryPrice: 138.20, exitPrice: 134.50, quantity: 100, pnl: -370, pnlPercent: -2.68, holdingDays: 13 },
    { id: '3', symbol: 'MSFT', type: 'long', entryDate: '2024-11-28', exitDate: '2024-12-12', entryPrice: 428.30, exitPrice: 445.60, quantity: 30, pnl: 519, pnlPercent: 4.04, holdingDays: 14 },
    { id: '4', symbol: 'GOOGL', type: 'long', entryDate: '2024-11-20', exitDate: '2024-12-05', entryPrice: 175.40, exitPrice: 192.30, quantity: 80, pnl: 1352, pnlPercent: 9.64, holdingDays: 15 },
    { id: '5', symbol: 'AMZN', type: 'long', entryDate: '2024-11-15', exitDate: '2024-11-28', entryPrice: 198.50, exitPrice: 205.20, quantity: 60, pnl: 402, pnlPercent: 3.37, holdingDays: 13 },
    { id: '6', symbol: 'META', type: 'long', entryDate: '2024-11-08', exitDate: '2024-11-22', entryPrice: 558.20, exitPrice: 542.80, quantity: 25, pnl: -385, pnlPercent: -2.76, holdingDays: 14 },
  ];

  return (
    <div style={{ padding: '32px' }}>
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>Level 4: Depth Components</h1>
        <p style={descStyles}>
          Advanced analysis components for deep exploration of data. These components
          provide detailed views when users want to dive deeper into historical patterns,
          model behavior, correlations, performance, and backtesting results.
        </p>
      </header>

      {/* ============================================ */}
      {/* HISTORICAL ANALYSIS */}
      {/* ============================================ */}
      <FadeIn direction="up" delay={0.1}>
        <h2 style={sectionHeaderStyles}>Historical Analysis</h2>
      </FadeIn>

      <ScrollReveal>
        <ShowcaseSection
          title="HistoricalDetailView"
          description="Expanded historical analysis with timeline events and period metrics"
        >
          <FadeIn direction="up" delay={0.1}>
            <HistoricalDetailView
              periods={historicalPeriods}
              title="Historical Pattern Analysis"
              subtitle="Comparing current conditions to similar historical periods"
              showTimeline
              showMetrics
              onPeriodSelect={(id) => console.log('Period selected:', id)}
            />
          </FadeIn>
        </ShowcaseSection>
      </ScrollReveal>

      <ScrollReveal>
        <ShowcaseSection
          title="PeriodComparison"
          description="Side-by-side comparison table with delta calculations"
        >
          <FadeIn direction="up" delay={0.1}>
            <PeriodComparison
              periods={comparisonPeriods}
              title="Period Comparison"
              subtitle="Compare performance metrics across different time periods"
              showDelta
              highlightWinner
            />
          </FadeIn>
        </ShowcaseSection>
      </ScrollReveal>

      {/* ============================================ */}
      {/* MODEL INSIGHTS */}
      {/* ============================================ */}
      <FadeIn direction="up" delay={0.1}>
        <h2 style={sectionHeaderStyles}>Model Transparency</h2>
      </FadeIn>

      <ScrollReveal>
        <ShowcaseSection
          title="ModelInsights"
          description="Technical model details, inputs, outputs, and methodology"
        >
          <FadeIn direction="up" delay={0.1}>
            <ModelInsights
              metadata={modelMetadata}
              inputs={modelInputs}
              outputs={modelOutputs}
              methodology="The SENTINEL Alpha Model uses a multi-factor approach combining technical, fundamental, and alternative data sources. Each factor is weighted based on its historical predictive power and current regime relevance. The model employs ensemble learning techniques and is recalibrated monthly to adapt to changing market conditions."
              limitations={[
                'Model accuracy decreases during regime changes and black swan events',
                'Alternative data sources may have varying latency (15min to 24hr)',
                'Backtested performance may not reflect future results',
                'Model has limited exposure to illiquid or small-cap assets',
              ]}
            />
          </FadeIn>
        </ShowcaseSection>
      </ScrollReveal>

      {/* ============================================ */}
      {/* CORRELATION & PERFORMANCE */}
      {/* ============================================ */}
      <FadeIn direction="up" delay={0.1}>
        <h2 style={sectionHeaderStyles}>Correlation & Performance</h2>
      </FadeIn>

      <ScrollReveal>
        <ShowcaseSection
          title="CorrelationMatrix"
          description="Heatmap-style matrix showing correlations between assets"
        >
          <FadeIn direction="up" delay={0.1}>
            <CorrelationMatrix
              items={matrixItems}
              correlations={correlations}
              title="Asset Correlation Matrix"
              subtitle="Rolling 252-day correlations between major asset classes"
              showValues
              highlightThreshold={0.7}
              size="md"
              onCellClick={(row, col, value) => console.log(`Clicked: ${row} x ${col} = ${value}`)}
            />
          </FadeIn>
        </ShowcaseSection>
      </ScrollReveal>

      <ScrollReveal>
        <ShowcaseSection
          title="PerformanceChart"
          description="Historical performance visualization with time range selection"
        >
          <FadeIn direction="up" delay={0.1}>
            <PerformanceChart
              series={performanceSeries}
              title="Portfolio Performance"
              subtitle="Cumulative returns vs benchmark"
              height={350}
              normalized
              metrics={[
                { label: 'Total Return', value: '+48.7%', trend: 'up' },
                { label: 'Alpha', value: '+4.2%', trend: 'up' },
                { label: 'Volatility', value: '15.2%', trend: 'down' },
                { label: 'Sharpe', value: '1.85', trend: 'up' },
              ]}
            />
          </FadeIn>
        </ShowcaseSection>
      </ScrollReveal>

      {/* ============================================ */}
      {/* BACKTESTING */}
      {/* ============================================ */}
      <FadeIn direction="up" delay={0.1}>
        <h2 style={sectionHeaderStyles}>Backtesting</h2>
      </FadeIn>

      <ScrollReveal>
        <ShowcaseSection
          title="BacktestResults"
          description="Comprehensive backtesting results with trade history"
        >
          <FadeIn direction="up" delay={0.1}>
            <BacktestResults
              summary={backtestSummary}
              statistics={backtestStatistics}
              trades={backtestTrades}
              strategyName="SENTINEL Momentum Strategy"
              benchmarkName="S&P 500"
              benchmarkReturn={32.5}
              showTrades
              maxTradesVisible={5}
              onTradeClick={(trade) => console.log('Trade clicked:', trade)}
            />
          </FadeIn>
        </ShowcaseSection>
      </ScrollReveal>

      {/* ============================================ */}
      {/* COMPONENT REFERENCE */}
      {/* ============================================ */}
      <FadeIn direction="up" delay={0.1}>
        <h2 style={sectionHeaderStyles}>Component Reference</h2>
      </FadeIn>

      <ScrollReveal>
        <ShowcaseSection title="Level 4 Components Summary">
          <FadeIn direction="up" delay={0.1}>
            <DepthLayer depth={2}>
              <div style={{ padding: '24px', fontSize: '13px', color: 'var(--sentinel-text-secondary)', lineHeight: '2', fontFamily: 'var(--sentinel-font-primary)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
                  <div>
                    <p style={{ color: 'var(--sentinel-accent-primary)', fontWeight: 500 }}>Historical Analysis</p>
                    <p>• HistoricalDetailView - Expanded historical analysis with timeline</p>
                    <p>• PeriodComparison - Side-by-side period comparison table</p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--sentinel-accent-primary)', fontWeight: 500 }}>Model Transparency</p>
                    <p>• ModelInsights - Technical model details and methodology</p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--sentinel-accent-primary)', fontWeight: 500 }}>Correlation & Performance</p>
                    <p>• CorrelationMatrix - Asset correlation heatmap</p>
                    <p>• PerformanceChart - Historical performance visualization</p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--sentinel-accent-primary)', fontWeight: 500 }}>Backtesting</p>
                    <p>• BacktestResults - Backtesting results display</p>
                  </div>
                </div>
              </div>
            </DepthLayer>
          </FadeIn>
        </ShowcaseSection>
      </ScrollReveal>
    </div>
  );
}

export default Level4Showcase;
