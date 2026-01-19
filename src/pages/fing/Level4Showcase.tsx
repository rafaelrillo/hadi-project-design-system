// Path: src/pages/fing/Level4Showcase.tsx
// FING Design System - Glass-Neumorphism Level 4 Depth Components
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import {
  HistoricalDetailView,
  PeriodComparison,
  ModelInsights,
  CorrelationMatrix,
  PerformanceChart,
  BacktestResults,
} from '../../components/organisms/fing';
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
} from '../../components/organisms/fing';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const historicalPeriods: HistoricalPeriodDetail[] = [
  {
    id: '2019-rally', name: 'Pre-Pandemic Rally', startDate: '2019-01-01', endDate: '2020-02-19',
    similarity: 87, returnPercentage: 34.2, volatility: 12.5, duration: '414 days',
    keyEvents: [
      { id: 'e1', date: '2019-07-31', title: 'Fed Rate Cut', description: 'First rate cut since 2008', impact: 'neutral', magnitude: 'medium' },
      { id: 'e2', date: '2019-10-11', title: 'Trade Deal Progress', description: 'Phase 1 trade deal announced', impact: 'positive', magnitude: 'high' },
      { id: 'e3', date: '2020-01-03', title: 'Iran Tensions', description: 'Geopolitical uncertainty spike', impact: 'negative', magnitude: 'medium' },
    ],
  },
  {
    id: '2016-election', name: 'Election Cycle 2016', startDate: '2016-06-01', endDate: '2017-03-01',
    similarity: 71, returnPercentage: 18.1, volatility: 15.2, duration: '273 days',
    keyEvents: [
      { id: 'e4', date: '2016-06-23', title: 'Brexit Vote', description: 'UK votes to leave EU', impact: 'negative', magnitude: 'high' },
      { id: 'e5', date: '2016-11-08', title: 'US Election', description: 'Trump elected president', impact: 'neutral', magnitude: 'high' },
      { id: 'e6', date: '2016-12-14', title: 'Fed Rate Hike', description: 'Second rate hike post-2008', impact: 'neutral', magnitude: 'medium' },
    ],
  },
  {
    id: '2011-crisis', name: 'Debt Ceiling Crisis', startDate: '2011-07-01', endDate: '2011-12-31',
    similarity: 54, returnPercentage: -8.7, volatility: 32.4, duration: '184 days',
    keyEvents: [
      { id: 'e7', date: '2011-08-05', title: 'S&P Downgrade', description: 'US credit rating downgraded', impact: 'negative', magnitude: 'high' },
      { id: 'e8', date: '2011-08-08', title: 'Market Crash', description: 'S&P 500 drops 6.7%', impact: 'negative', magnitude: 'high' },
      { id: 'e9', date: '2011-10-27', title: 'EU Summit', description: 'Greece debt deal reached', impact: 'positive', magnitude: 'medium' },
    ],
  },
];

const comparisonPeriods: ComparisonPeriod[] = [
  {
    id: 'current', name: 'Current Period', dateRange: 'Jan 2024 - Dec 2024', isCurrent: true,
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
    id: 'benchmark', name: 'S&P 500', dateRange: 'Jan 2024 - Dec 2024',
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
    id: 'lastyear', name: 'Previous Year', dateRange: 'Jan 2023 - Dec 2023',
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

const modelMetadata: ModelMetadata = {
  name: 'FING Alpha Model', version: { version: '2.4.1', releaseDate: '2024-12-20', changes: ['Improved sentiment analysis accuracy', 'Added options flow signals', 'Enhanced regime detection'] },
  accuracy: 78.5, lastTrainedDate: '2024-12-15', dataPoints: 1250000, updateFrequency: 'Daily',
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
  { rowId: 'spy', colId: 'qqq', value: 0.92 }, { rowId: 'spy', colId: 'iwm', value: 0.88 },
  { rowId: 'spy', colId: 'efa', value: 0.78 }, { rowId: 'spy', colId: 'eem', value: 0.68 },
  { rowId: 'spy', colId: 'gld', value: 0.12 }, { rowId: 'spy', colId: 'tlt', value: -0.35 },
  { rowId: 'qqq', colId: 'iwm', value: 0.82 }, { rowId: 'qqq', colId: 'efa', value: 0.72 },
  { rowId: 'qqq', colId: 'eem', value: 0.62 }, { rowId: 'qqq', colId: 'gld', value: 0.08 },
  { rowId: 'qqq', colId: 'tlt', value: -0.42 }, { rowId: 'iwm', colId: 'efa', value: 0.75 },
  { rowId: 'iwm', colId: 'eem', value: 0.72 }, { rowId: 'iwm', colId: 'gld', value: 0.15 },
  { rowId: 'iwm', colId: 'tlt', value: -0.28 }, { rowId: 'efa', colId: 'eem', value: 0.82 },
  { rowId: 'efa', colId: 'gld', value: 0.22 }, { rowId: 'efa', colId: 'tlt', value: -0.18 },
  { rowId: 'eem', colId: 'gld', value: 0.28 }, { rowId: 'eem', colId: 'tlt', value: -0.12 },
  { rowId: 'gld', colId: 'tlt', value: 0.45 },
];

const generatePerformanceData = (startValue: number, volatility: number, trend: number): { date: string; value: number }[] => {
  const data = [];
  let value = startValue;
  const startDate = new Date('2023-01-01');
  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    value = value * (1 + (Math.random() - 0.5) * volatility + trend);
    data.push({ date: date.toISOString().split('T')[0], value: Math.round(value * 100) / 100 });
  }
  return data;
};

const performanceSeries: PerformanceSeries[] = [
  { id: 'portfolio', name: 'Portfolio', data: generatePerformanceData(100000, 0.02, 0.0003) },
  { id: 'benchmark', name: 'S&P 500', data: generatePerformanceData(100000, 0.015, 0.00025), isBenchmark: true },
];

const backtestSummary: BacktestSummary = {
  totalReturn: 48750, totalReturnPercent: 48.75, annualizedReturn: 22.4, sharpeRatio: 1.85,
  maxDrawdown: 12.3, winRate: 64.2, totalTrades: 127, profitFactor: 2.14,
  averageWin: 1250, averageLoss: -580, startDate: '2022-01-01', endDate: '2024-12-26',
  initialCapital: 100000, finalCapital: 148750,
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

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function Level4ShowcaseContent() {
  const { lightAngle } = useLightEngine();

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const MARBLE = {
    base: '#d5d8dc',
    shadowDark: '#a8acb3',
    shadowLight: '#ffffff',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}`;
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px', padding: '24px', background: MARBLE.base, borderRadius: '15px',
    boxShadow: getNeuPanelShadow(20, 60), transition: 'box-shadow 50ms linear',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px', fontWeight: 700, color: 'var(--fing-accent-primary)', marginBottom: '8px',
    fontFamily: 'var(--fing-font-display)', textTransform: 'uppercase', letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px', color: 'var(--fing-text-secondary)', fontFamily: 'var(--fing-font-mono)',
    textTransform: 'uppercase', letterSpacing: '0.03em',
  };

  const sectionHeaderStyles: React.CSSProperties = {
    fontSize: '14px', fontWeight: 600, color: 'var(--fing-accent-primary)', marginTop: '48px',
    marginBottom: '24px', fontFamily: 'var(--fing-font-mono)', letterSpacing: '0.05em',
    textTransform: 'uppercase', paddingBottom: '12px',
  };

  const contentContainerStyles: React.CSSProperties = {
    padding: '24px', background: MARBLE.base, borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear',
  };

  const insetContainerStyles: React.CSSProperties = {
    padding: '20px', borderRadius: '15px', boxShadow: getNeuInsetShadow(5, 15),
    background: MARBLE.base, transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Level_4:_Depth_Components_</h1>
        <p style={descStyles}>// Componentes avanzados para análisis profundo de datos</p>
      </header>

      {/* HISTORICAL ANALYSIS */}
      <h2 style={sectionHeaderStyles}>&gt; Historical_Analysis</h2>

      <ShowcaseSection title="HistoricalDetailView" description="Expanded historical analysis with timeline events and period metrics">
        <div style={contentContainerStyles}>
          <HistoricalDetailView periods={historicalPeriods} title="Historical Pattern Analysis" subtitle="Comparing current conditions to similar historical periods" showTimeline showMetrics onPeriodSelect={(id) => console.log('Period selected:', id)} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="PeriodComparison" description="Side-by-side comparison table with delta calculations">
        <div style={contentContainerStyles}>
          <PeriodComparison periods={comparisonPeriods} title="Period Comparison" subtitle="Compare performance metrics across different time periods" showDelta highlightWinner />
        </div>
      </ShowcaseSection>

      {/* MODEL TRANSPARENCY */}
      <h2 style={sectionHeaderStyles}>&gt; Model_Transparency</h2>

      <ShowcaseSection title="ModelInsights" description="Technical model details, inputs, outputs, and methodology">
        <div style={contentContainerStyles}>
          <ModelInsights metadata={modelMetadata} inputs={modelInputs} outputs={modelOutputs} methodology="The FING Alpha Model uses a multi-factor approach combining technical, fundamental, and alternative data sources. Each factor is weighted based on its historical predictive power and current regime relevance." limitations={['Model accuracy decreases during regime changes and black swan events', 'Alternative data sources may have varying latency (15min to 24hr)', 'Backtested performance may not reflect future results', 'Model has limited exposure to illiquid or small-cap assets']} />
        </div>
      </ShowcaseSection>

      {/* CORRELATION & PERFORMANCE */}
      <h2 style={sectionHeaderStyles}>&gt; Correlation_&_Performance</h2>

      <ShowcaseSection title="CorrelationMatrix" description="Heatmap-style matrix showing correlations between assets">
        <div style={contentContainerStyles}>
          <CorrelationMatrix items={matrixItems} correlations={correlations} title="Asset Correlation Matrix" subtitle="Rolling 252-day correlations between major asset classes" showValues highlightThreshold={0.7} size="md" onCellClick={(row, col, value) => console.log(`Clicked: ${row} x ${col} = ${value}`)} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="PerformanceChart" description="Historical performance visualization with time range selection">
        <div style={contentContainerStyles}>
          <PerformanceChart series={performanceSeries} title="Portfolio Performance" subtitle="Cumulative returns vs benchmark" height={350} normalized metrics={[{ label: 'Total Return', value: '+48.7%', trend: 'up' }, { label: 'Alpha', value: '+4.2%', trend: 'up' }, { label: 'Volatility', value: '15.2%', trend: 'down' }, { label: 'Sharpe', value: '1.85', trend: 'up' }]} />
        </div>
      </ShowcaseSection>

      {/* BACKTESTING */}
      <h2 style={sectionHeaderStyles}>&gt; Backtesting</h2>

      <ShowcaseSection title="BacktestResults" description="Comprehensive backtesting results with trade history">
        <div style={contentContainerStyles}>
          <BacktestResults summary={backtestSummary} statistics={backtestStatistics} trades={backtestTrades} strategyName="FING Momentum Strategy" benchmarkName="S&P 500" benchmarkReturn={32.5} showTrades maxTradesVisible={5} onTradeClick={(trade) => console.log('Trade clicked:', trade)} />
        </div>
      </ShowcaseSection>

      {/* COMPONENT REFERENCE */}
      <h2 style={sectionHeaderStyles}>&gt; Component_Reference</h2>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={insetContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', fontSize: '13px', color: '#636E72', lineHeight: '2', fontFamily: 'var(--fing-font-mono)' }}>
            <div>
              <p style={{ color: 'var(--fing-accent-primary)', fontWeight: 600 }}>Historical Analysis</p>
              <p>• HistoricalDetailView - Expanded historical analysis with timeline</p>
              <p>• PeriodComparison - Side-by-side period comparison table</p>
            </div>
            <div>
              <p style={{ color: 'var(--fing-accent-primary)', fontWeight: 600 }}>Model Transparency</p>
              <p>• ModelInsights - Technical model details and methodology</p>
            </div>
            <div>
              <p style={{ color: 'var(--fing-accent-primary)', fontWeight: 600 }}>Correlation & Performance</p>
              <p>• CorrelationMatrix - Asset correlation heatmap</p>
              <p>• PerformanceChart - Historical performance visualization</p>
            </div>
            <div>
              <p style={{ color: 'var(--fing-accent-primary)', fontWeight: 600 }}>Backtesting</p>
              <p>• BacktestResults - Backtesting results display</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function Level4Showcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <Level4ShowcaseContent />
    </LightEngineProvider>
  );
}

export default Level4Showcase;
