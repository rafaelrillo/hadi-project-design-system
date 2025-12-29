// Path: src/pages/app/PortfolioView/PortfolioView.tsx

import { useState, useMemo } from 'react';
import {
  Briefcase,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { AllocationSummary } from '@/components/molecules/sentinel/AllocationSummary';
import { Button } from '@/components/atoms/Button';
import styles from './PortfolioView.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface Position {
  ticker: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  marketValue: number;
  gainLoss: number;
  gainLossPercent: number;
  allocation: number;
  dayChange: number;
  dayChangePercent: number;
}

interface PortfolioSummary {
  totalValue: number;
  totalCost: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  dayChange: number;
  dayChangePercent: number;
  cashBalance: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_POSITIONS: Position[] = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    shares: 25,
    avgCost: 165.50,
    currentPrice: 178.72,
    marketValue: 4468.00,
    gainLoss: 330.50,
    gainLossPercent: 7.99,
    allocation: 22.34,
    dayChange: 61.25,
    dayChangePercent: 1.39,
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 12,
    avgCost: 350.00,
    currentPrice: 378.91,
    marketValue: 4546.92,
    gainLoss: 346.92,
    gainLossPercent: 8.26,
    allocation: 22.73,
    dayChange: 49.44,
    dayChangePercent: 1.10,
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    shares: 30,
    avgCost: 138.25,
    currentPrice: 141.80,
    marketValue: 4254.00,
    gainLoss: 106.50,
    gainLossPercent: 2.57,
    allocation: 21.27,
    dayChange: -26.70,
    dayChangePercent: -0.62,
  },
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    shares: 8,
    avgCost: 420.00,
    currentPrice: 495.22,
    marketValue: 3961.76,
    gainLoss: 601.76,
    gainLossPercent: 17.90,
    allocation: 19.81,
    dayChange: 99.60,
    dayChangePercent: 2.58,
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    shares: 15,
    avgCost: 172.00,
    currentPrice: 178.25,
    marketValue: 2673.75,
    gainLoss: 93.75,
    gainLossPercent: 3.63,
    allocation: 13.37,
    dayChange: 48.15,
    dayChangePercent: 1.83,
  },
];

const MOCK_SUMMARY: PortfolioSummary = {
  totalValue: 20000.00,
  totalCost: 18520.43,
  totalGainLoss: 1479.57,
  totalGainLossPercent: 7.99,
  dayChange: 231.74,
  dayChangePercent: 1.17,
  cashBalance: 95.57,
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function PortfolioView() {
  const [selectedPeriod, setSelectedPeriod] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1D');
  const [sortBy, setSortBy] = useState<'allocation' | 'gainLoss' | 'dayChange'>('allocation');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sort positions
  const sortedPositions = useMemo(() => {
    return [...MOCK_POSITIONS].sort((a, b) => {
      switch (sortBy) {
        case 'allocation':
          return b.allocation - a.allocation;
        case 'gainLoss':
          return b.gainLossPercent - a.gainLossPercent;
        case 'dayChange':
          return b.dayChangePercent - a.dayChangePercent;
        default:
          return 0;
      }
    });
  }, [sortBy]);

  // Allocation data for summary
  const allocationData = MOCK_POSITIONS.map((p) => ({
    assetClass: p.ticker,
    percentage: p.allocation,
  }));

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const isPositive = MOCK_SUMMARY.totalGainLoss >= 0;
  const isDayPositive = MOCK_SUMMARY.dayChange >= 0;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerTitle}>
            <Briefcase size={24} className={styles.headerIcon} />
            <div>
              <h1 className={styles.title}>My Portfolio</h1>
              <p className={styles.subtitle}>Paper Trading Account</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <Button
              variant="secondary"
              onClick={handleRefresh}
              disabled={isRefreshing}
              icon={<RefreshCw size={16} className={isRefreshing ? styles.spinning : ''} />}
            >
              Refresh
            </Button>
            <Button variant="primary" icon={<Plus size={16} />}>
              Add Position
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryIcon}>
              <DollarSign size={20} />
            </div>
            <div className={styles.summaryContent}>
              <span className={styles.summaryLabel}>Total Value</span>
              <span className={styles.summaryValue}>
                ${MOCK_SUMMARY.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={`${styles.summaryIcon} ${isPositive ? styles.positive : styles.negative}`}>
              {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            </div>
            <div className={styles.summaryContent}>
              <span className={styles.summaryLabel}>Total Gain/Loss</span>
              <span className={`${styles.summaryValue} ${isPositive ? styles.positive : styles.negative}`}>
                {isPositive ? '+' : ''}${MOCK_SUMMARY.totalGainLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                <span className={styles.summaryPercent}>
                  ({isPositive ? '+' : ''}{MOCK_SUMMARY.totalGainLossPercent.toFixed(2)}%)
                </span>
              </span>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={`${styles.summaryIcon} ${isDayPositive ? styles.positive : styles.negative}`}>
              {isDayPositive ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
            </div>
            <div className={styles.summaryContent}>
              <span className={styles.summaryLabel}>Today's Change</span>
              <span className={`${styles.summaryValue} ${isDayPositive ? styles.positive : styles.negative}`}>
                {isDayPositive ? '+' : ''}${MOCK_SUMMARY.dayChange.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                <span className={styles.summaryPercent}>
                  ({isDayPositive ? '+' : ''}{MOCK_SUMMARY.dayChangePercent.toFixed(2)}%)
                </span>
              </span>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.summaryIcon}>
              <PieChart size={20} />
            </div>
            <div className={styles.summaryContent}>
              <span className={styles.summaryLabel}>Cash Balance</span>
              <span className={styles.summaryValue}>
                ${MOCK_SUMMARY.cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Allocation Chart */}
        <section className={styles.allocationSection}>
          <h2 className={styles.sectionTitle}>Allocation</h2>
          <AllocationSummary
            allocations={allocationData}
            title="Portfolio Allocation"
            showChanges={false}
          />
        </section>

        {/* Positions Table */}
        <section className={styles.positionsSection}>
          <div className={styles.positionsHeader}>
            <h2 className={styles.sectionTitle}>Holdings</h2>
            <div className={styles.sortControls}>
              <span className={styles.sortLabel}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className={styles.sortSelect}
              >
                <option value="allocation">Allocation</option>
                <option value="gainLoss">Total Return</option>
                <option value="dayChange">Day Change</option>
              </select>
            </div>
          </div>

          <div className={styles.positionsTable}>
            <div className={styles.tableHeader}>
              <span className={styles.colSymbol}>Symbol</span>
              <span className={styles.colShares}>Shares</span>
              <span className={styles.colPrice}>Price</span>
              <span className={styles.colValue}>Market Value</span>
              <span className={styles.colReturn}>Total Return</span>
              <span className={styles.colDayChange}>Day Change</span>
              <span className={styles.colAllocation}>Allocation</span>
              <span className={styles.colActions}></span>
            </div>

            {sortedPositions.map((position) => {
              const isPosPositive = position.gainLoss >= 0;
              const isDayPosPositive = position.dayChange >= 0;

              return (
                <div key={position.ticker} className={styles.tableRow}>
                  <div className={styles.colSymbol}>
                    <span className={styles.ticker}>{position.ticker}</span>
                    <span className={styles.name}>{position.name}</span>
                  </div>
                  <span className={styles.colShares}>{position.shares}</span>
                  <span className={styles.colPrice}>
                    ${position.currentPrice.toFixed(2)}
                  </span>
                  <span className={styles.colValue}>
                    ${position.marketValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className={`${styles.colReturn} ${isPosPositive ? styles.positive : styles.negative}`}>
                    {isPosPositive ? '+' : ''}${position.gainLoss.toFixed(2)}
                    <span className={styles.percent}>
                      ({isPosPositive ? '+' : ''}{position.gainLossPercent.toFixed(2)}%)
                    </span>
                  </span>
                  <span className={`${styles.colDayChange} ${isDayPosPositive ? styles.positive : styles.negative}`}>
                    {isDayPosPositive ? '+' : ''}${position.dayChange.toFixed(2)}
                    <span className={styles.percent}>
                      ({isDayPosPositive ? '+' : ''}{position.dayChangePercent.toFixed(2)}%)
                    </span>
                  </span>
                  <span className={styles.colAllocation}>
                    <span className={styles.allocationBar}>
                      <span
                        className={styles.allocationFill}
                        style={{ width: `${position.allocation}%` }}
                      />
                    </span>
                    <span className={styles.allocationPercent}>
                      {position.allocation.toFixed(1)}%
                    </span>
                  </span>
                  <button className={styles.actionButton} aria-label="More actions">
                    <MoreVertical size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Period Selector */}
        <div className={styles.periodSelector}>
          {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const).map((period) => (
            <button
              key={period}
              className={`${styles.periodButton} ${selectedPeriod === period ? styles.active : ''}`}
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

