// Path: src/components/organisms/sentinel/BacktestResults/BacktestResults.tsx
import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart2,
  Target,
  AlertTriangle,
  Check,
  X,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import styles from './BacktestResults.module.css';

/* ═══════════════════════════════════════════════════════════════════════════════
   BACKTEST RESULTS - Level 4 Depth Component
   Backtesting results display with SENTINEL aesthetic
   ═══════════════════════════════════════════════════════════════════════════════ */

export interface BacktestTrade {
  id: string;
  symbol: string;
  type: 'long' | 'short';
  entryDate: string;
  exitDate: string;
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  pnl: number;
  pnlPercent: number;
  holdingDays: number;
}

export interface BacktestStatistic {
  id: string;
  label: string;
  value: string;
  category: 'returns' | 'risk' | 'efficiency' | 'trades';
  description?: string;
  benchmark?: string;
  isBetter?: boolean;
}

export interface BacktestSummary {
  totalReturn: number;
  totalReturnPercent: number;
  annualizedReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  totalTrades: number;
  profitFactor: number;
  averageWin: number;
  averageLoss: number;
  startDate: string;
  endDate: string;
  initialCapital: number;
  finalCapital: number;
}

export interface BacktestResultsProps {
  summary: BacktestSummary;
  statistics?: BacktestStatistic[];
  trades?: BacktestTrade[];
  strategyName?: string;
  benchmarkName?: string;
  benchmarkReturn?: number;
  showTrades?: boolean;
  maxTradesVisible?: number;
  onTradeClick?: (trade: BacktestTrade) => void;
}

export function BacktestResults({
  summary,
  statistics = [],
  trades = [],
  strategyName = 'Strategy',
  benchmarkName = 'S&P 500',
  benchmarkReturn,
  showTrades = true,
  maxTradesVisible = 10,
  onTradeClick,
}: BacktestResultsProps) {
  const [showAllTrades, setShowAllTrades] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['returns', 'risk'])
  );

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number): string => {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const categorizedStats = statistics.reduce((acc, stat) => {
    if (!acc[stat.category]) {
      acc[stat.category] = [];
    }
    acc[stat.category].push(stat);
    return acc;
  }, {} as Record<string, BacktestStatistic[]>);

  const categoryLabels: Record<string, string> = {
    returns: 'Return Metrics',
    risk: 'Risk Metrics',
    efficiency: 'Efficiency Metrics',
    trades: 'Trade Statistics',
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    returns: <TrendingUp size={14} />,
    risk: <AlertTriangle size={14} />,
    efficiency: <Target size={14} />,
    trades: <BarChart2 size={14} />,
  };

  const visibleTrades = showAllTrades ? trades : trades.slice(0, maxTradesVisible);
  const hasMoreTrades = trades.length > maxTradesVisible;

  const isPositiveReturn = summary.totalReturnPercent > 0;
  const beatsReference = benchmarkReturn !== undefined && summary.totalReturnPercent > benchmarkReturn;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.strategyInfo}>
            <Activity size={20} className={styles.strategyIcon} />
            <div>
              <h2 className={styles.strategyName}>{strategyName}</h2>
              <p className={styles.period}>
                {formatDate(summary.startDate)} — {formatDate(summary.endDate)}
              </p>
            </div>
          </div>
          <div className={styles.overallResult}>
            <span
              className={`${styles.resultValue} ${
                isPositiveReturn ? styles.positive : styles.negative
              }`}
            >
              {formatPercent(summary.totalReturnPercent)}
            </span>
            {beatsReference !== undefined && (
              <span
                className={`${styles.benchmarkComparison} ${
                  beatsReference ? styles.beating : styles.trailing
                }`}
              >
                {beatsReference ? <Check size={12} /> : <X size={12} />}
                {beatsReference ? 'Beats' : 'Trails'} {benchmarkName}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <span className={styles.cardLabel}>Total Return</span>
          <span
            className={`${styles.cardValue} ${
              isPositiveReturn ? styles.positive : styles.negative
            }`}
          >
            {formatCurrency(summary.totalReturn)}
          </span>
          <span className={styles.cardSubtext}>
            {formatCurrency(summary.initialCapital)} → {formatCurrency(summary.finalCapital)}
          </span>
        </div>

        <div className={styles.summaryCard}>
          <span className={styles.cardLabel}>Annualized Return</span>
          <span
            className={`${styles.cardValue} ${
              summary.annualizedReturn > 0 ? styles.positive : styles.negative
            }`}
          >
            {formatPercent(summary.annualizedReturn)}
          </span>
          <span className={styles.cardSubtext}>CAGR</span>
        </div>

        <div className={styles.summaryCard}>
          <span className={styles.cardLabel}>Sharpe Ratio</span>
          <span
            className={`${styles.cardValue} ${
              summary.sharpeRatio >= 1 ? styles.positive : summary.sharpeRatio >= 0.5 ? '' : styles.negative
            }`}
          >
            {summary.sharpeRatio.toFixed(2)}
          </span>
          <span className={styles.cardSubtext}>
            {summary.sharpeRatio >= 2 ? 'Excellent' : summary.sharpeRatio >= 1 ? 'Good' : 'Fair'}
          </span>
        </div>

        <div className={styles.summaryCard}>
          <span className={styles.cardLabel}>Max Drawdown</span>
          <span className={`${styles.cardValue} ${styles.negative}`}>
            {formatPercent(-Math.abs(summary.maxDrawdown))}
          </span>
          <span className={styles.cardSubtext}>Peak to trough</span>
        </div>

        <div className={styles.summaryCard}>
          <span className={styles.cardLabel}>Win Rate</span>
          <span
            className={`${styles.cardValue} ${
              summary.winRate >= 50 ? styles.positive : styles.negative
            }`}
          >
            {summary.winRate.toFixed(1)}%
          </span>
          <span className={styles.cardSubtext}>
            {summary.totalTrades} total trades
          </span>
        </div>

        <div className={styles.summaryCard}>
          <span className={styles.cardLabel}>Profit Factor</span>
          <span
            className={`${styles.cardValue} ${
              summary.profitFactor >= 1.5 ? styles.positive : summary.profitFactor >= 1 ? '' : styles.negative
            }`}
          >
            {summary.profitFactor.toFixed(2)}
          </span>
          <span className={styles.cardSubtext}>
            Avg Win: {formatCurrency(summary.averageWin)}
          </span>
        </div>
      </div>

      {/* Detailed Statistics */}
      {Object.keys(categorizedStats).length > 0 && (
        <div className={styles.statisticsSection}>
          <h3 className={styles.sectionTitle}>Detailed Statistics</h3>
          <div className={styles.categoriesList}>
            {Object.entries(categorizedStats).map(([category, stats]) => (
              <div key={category} className={styles.categoryBlock}>
                <button
                  type="button"
                  className={styles.categoryHeader}
                  onClick={() => toggleCategory(category)}
                  aria-expanded={expandedCategories.has(category)}
                >
                  <span className={styles.categoryIcon}>
                    {categoryIcons[category] || <BarChart2 size={14} />}
                  </span>
                  <span className={styles.categoryLabel}>
                    {categoryLabels[category] || category}
                  </span>
                  <span className={styles.statsCount}>{stats.length}</span>
                  <span className={styles.expandIcon}>
                    {expandedCategories.has(category) ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </span>
                </button>

                {expandedCategories.has(category) && (
                  <div className={styles.statsGrid}>
                    {stats.map((stat) => (
                      <div key={stat.id} className={styles.statItem}>
                        <div className={styles.statHeader}>
                          <span className={styles.statLabel}>{stat.label}</span>
                          {stat.isBetter !== undefined && (
                            <span
                              className={`${styles.comparisonBadge} ${
                                stat.isBetter ? styles.better : styles.worse
                              }`}
                            >
                              {stat.isBetter ? (
                                <TrendingUp size={10} />
                              ) : (
                                <TrendingDown size={10} />
                              )}
                            </span>
                          )}
                        </div>
                        <span className={styles.statValue}>{stat.value}</span>
                        {stat.benchmark && (
                          <span className={styles.statBenchmark}>
                            vs {stat.benchmark}
                          </span>
                        )}
                        {stat.description && (
                          <span className={styles.statDescription}>
                            {stat.description}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trade History */}
      {showTrades && trades.length > 0 && (
        <div className={styles.tradesSection}>
          <div className={styles.tradesSectionHeader}>
            <h3 className={styles.sectionTitle}>Trade History</h3>
            <span className={styles.tradesCount}>{trades.length} trades</span>
          </div>

          <div className={styles.tradesTable}>
            <div className={styles.tableHeader}>
              <span className={styles.headerCell}>Symbol</span>
              <span className={styles.headerCell}>Type</span>
              <span className={styles.headerCell}>Entry</span>
              <span className={styles.headerCell}>Exit</span>
              <span className={styles.headerCell}>Days</span>
              <span className={styles.headerCell}>P&L</span>
              <span className={styles.headerCell}>Return</span>
            </div>

            <div className={styles.tableBody}>
              {visibleTrades.map((trade) => (
                <button
                  key={trade.id}
                  type="button"
                  className={styles.tableRow}
                  onClick={() => onTradeClick?.(trade)}
                >
                  <span className={styles.cellSymbol}>{trade.symbol}</span>
                  <span
                    className={`${styles.cellType} ${
                      trade.type === 'long' ? styles.long : styles.short
                    }`}
                  >
                    {trade.type.toUpperCase()}
                  </span>
                  <span className={styles.cellPrice}>
                    ${trade.entryPrice.toFixed(2)}
                    <span className={styles.cellDate}>
                      {formatDate(trade.entryDate)}
                    </span>
                  </span>
                  <span className={styles.cellPrice}>
                    ${trade.exitPrice.toFixed(2)}
                    <span className={styles.cellDate}>
                      {formatDate(trade.exitDate)}
                    </span>
                  </span>
                  <span className={styles.cellDays}>{trade.holdingDays}d</span>
                  <span
                    className={`${styles.cellPnl} ${
                      trade.pnl >= 0 ? styles.positive : styles.negative
                    }`}
                  >
                    {trade.pnl >= 0 ? '+' : ''}
                    {formatCurrency(trade.pnl)}
                  </span>
                  <span
                    className={`${styles.cellReturn} ${
                      trade.pnlPercent >= 0 ? styles.positive : styles.negative
                    }`}
                  >
                    {formatPercent(trade.pnlPercent)}
                  </span>
                </button>
              ))}
            </div>

            {hasMoreTrades && (
              <button
                type="button"
                className={styles.showMoreButton}
                onClick={() => setShowAllTrades(!showAllTrades)}
              >
                {showAllTrades
                  ? 'Show Less'
                  : `Show ${trades.length - maxTradesVisible} More Trades`}
                <ChevronDown
                  size={14}
                  className={showAllTrades ? styles.rotated : ''}
                />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInfo}>
          <AlertTriangle size={12} />
          <span>
            Past performance does not guarantee future results. Backtest results
            may differ from live trading.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default BacktestResults;
