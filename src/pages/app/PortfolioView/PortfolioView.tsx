// Path: src/pages/app/PortfolioView/PortfolioView.tsx

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  MoreVertical,
  Plus,
  Check,
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { TreeMap } from '@/components/charts';
import { useIsMobile } from '@/hooks/useBreakpoint';
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

interface Portfolio {
  id: string;
  name: string;
  description: string;
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  positions: Position[];
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_PORTFOLIOS: Portfolio[] = [
  {
    id: 'growth',
    name: 'Growth Portfolio',
    description: 'High-growth tech stocks',
    totalValue: 20000.00,
    totalGainLoss: 1479.57,
    totalGainLossPercent: 7.99,
    positions: [
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
    ],
  },
  {
    id: 'dividend',
    name: 'Dividend Income',
    description: 'Stable dividend stocks',
    totalValue: 15000.00,
    totalGainLoss: 892.30,
    totalGainLossPercent: 6.32,
    positions: [
      {
        ticker: 'JNJ',
        name: 'Johnson & Johnson',
        shares: 20,
        avgCost: 152.00,
        currentPrice: 158.45,
        marketValue: 3169.00,
        gainLoss: 129.00,
        gainLossPercent: 4.24,
        allocation: 21.13,
        dayChange: 15.80,
        dayChangePercent: 0.50,
      },
      {
        ticker: 'PG',
        name: 'Procter & Gamble',
        shares: 18,
        avgCost: 145.00,
        currentPrice: 156.32,
        marketValue: 2813.76,
        gainLoss: 203.76,
        gainLossPercent: 7.81,
        allocation: 18.76,
        dayChange: 22.40,
        dayChangePercent: 0.80,
      },
      {
        ticker: 'KO',
        name: 'Coca-Cola Company',
        shares: 50,
        avgCost: 58.00,
        currentPrice: 62.15,
        marketValue: 3107.50,
        gainLoss: 207.50,
        gainLossPercent: 7.16,
        allocation: 20.72,
        dayChange: -12.30,
        dayChangePercent: -0.39,
      },
      {
        ticker: 'VZ',
        name: 'Verizon Communications',
        shares: 75,
        avgCost: 38.50,
        currentPrice: 41.28,
        marketValue: 3096.00,
        gainLoss: 208.50,
        gainLossPercent: 7.22,
        allocation: 20.64,
        dayChange: 18.75,
        dayChangePercent: 0.61,
      },
      {
        ticker: 'T',
        name: 'AT&T Inc.',
        shares: 150,
        avgCost: 17.20,
        currentPrice: 18.76,
        marketValue: 2814.00,
        gainLoss: 234.00,
        gainLossPercent: 9.07,
        allocation: 18.76,
        dayChange: 30.00,
        dayChangePercent: 1.08,
      },
    ],
  },
  {
    id: 'balanced',
    name: 'Balanced Mix',
    description: 'Diversified portfolio',
    totalValue: 12500.00,
    totalGainLoss: -215.40,
    totalGainLossPercent: -1.69,
    positions: [
      {
        ticker: 'SPY',
        name: 'SPDR S&P 500 ETF',
        shares: 10,
        avgCost: 480.00,
        currentPrice: 472.50,
        marketValue: 4725.00,
        gainLoss: -75.00,
        gainLossPercent: -1.56,
        allocation: 37.80,
        dayChange: 23.60,
        dayChangePercent: 0.50,
      },
      {
        ticker: 'QQQ',
        name: 'Invesco QQQ Trust',
        shares: 8,
        avgCost: 410.00,
        currentPrice: 398.75,
        marketValue: 3190.00,
        gainLoss: -90.00,
        gainLossPercent: -2.74,
        allocation: 25.52,
        dayChange: -15.92,
        dayChangePercent: -0.50,
      },
      {
        ticker: 'BND',
        name: 'Vanguard Total Bond',
        shares: 30,
        avgCost: 74.00,
        currentPrice: 72.85,
        marketValue: 2185.50,
        gainLoss: -34.50,
        gainLossPercent: -1.55,
        allocation: 17.48,
        dayChange: 6.55,
        dayChangePercent: 0.30,
      },
      {
        ticker: 'GLD',
        name: 'SPDR Gold Shares',
        shares: 12,
        avgCost: 198.00,
        currentPrice: 200.00,
        marketValue: 2400.00,
        gainLoss: 24.00,
        gainLossPercent: 1.01,
        allocation: 19.20,
        dayChange: -12.00,
        dayChangePercent: -0.50,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function PortfolioView() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string>(MOCK_PORTFOLIOS[0].id);
  const [sortBy, setSortBy] = useState<'allocation' | 'gainLoss' | 'dayChange'>('allocation');

  // Get selected portfolio
  const selectedPortfolio = useMemo(() => {
    return MOCK_PORTFOLIOS.find((p) => p.id === selectedPortfolioId) || MOCK_PORTFOLIOS[0];
  }, [selectedPortfolioId]);

  // Sort positions
  const sortedPositions = useMemo(() => {
    return [...selectedPortfolio.positions].sort((a, b) => {
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
  }, [selectedPortfolio, sortBy]);

  // TreeMap data
  const treemapData = useMemo(() => {
    return {
      name: selectedPortfolio.name,
      children: selectedPortfolio.positions.map((p) => ({
        name: p.ticker,
        value: p.marketValue,
      })),
    };
  }, [selectedPortfolio]);

  // Mobile Layout
  if (isMobile) {
    const isPositive = selectedPortfolio.totalGainLoss >= 0;

    return (
      <div className={styles.mobileContainer}>
        {/* Mobile Header - Portfolio Value + New Button */}
        <div className={styles.mobileHeader}>
          <div className={styles.mobileHeaderTop}>
            <span className={styles.mobileHeaderLabel}>
              <Briefcase size={16} />
              {selectedPortfolio.name}
            </span>
            <Button
              variant="primary"
              size="sm"
              icon={<Plus size={14} />}
              onClick={() => navigate('/app/dashboard/portfolio/builder')}
            >
              New
            </Button>
          </div>
          <div className={styles.mobileHeaderValues}>
            <span className={styles.mobileValue}>
              ${selectedPortfolio.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className={`${styles.mobileChange} ${isPositive ? styles.positive : styles.negative}`}>
              {isPositive ? '+' : ''}{selectedPortfolio.totalGainLossPercent.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Large TreeMap - No card container */}
        <div className={styles.mobileTreemapLarge}>
          <TreeMap
            data={treemapData}
            height={200}
            tile="squarify"
            innerPadding={3}
            outerPadding={0}
            enableLabels={true}
            enableParentLabel={false}
            labelSkipSize={30}
          />
        </div>

        {/* Mobile Holdings List */}
        <div className={styles.mobileHoldingsSection}>
          <h3 className={styles.mobileHoldingsTitle}>Holdings</h3>
          <div className={styles.mobileHoldings}>
            {sortedPositions.map((position) => {
              const isPosPositive = position.gainLoss >= 0;

              return (
                <div key={position.ticker} className={styles.mobileHoldingCard}>
                  <div className={styles.mobileHoldingLeft}>
                    <span className={styles.mobileHoldingTicker}>{position.ticker}</span>
                    <span className={styles.mobileHoldingAllocation}>{position.allocation.toFixed(1)}%</span>
                  </div>
                  <div className={styles.mobileHoldingRight}>
                    <span className={styles.mobileHoldingValue}>
                      ${position.marketValue.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                    </span>
                    <span className={`${styles.mobileHoldingChange} ${isPosPositive ? styles.positive : styles.negative}`}>
                      {isPosPositive ? '+' : ''}{position.gainLossPercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className={styles.container}>
      {/* Main Layout: Sidebar + Table */}
      <div className={styles.mainLayout}>
        {/* Portfolio Selector Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>My Portfolios</h2>
            <Button
              variant="primary"
              icon={<Plus size={14} />}
              onClick={() => navigate('/app/dashboard/portfolio/builder')}
            >
              New
            </Button>
          </div>

          <div className={styles.portfolioList}>
            {MOCK_PORTFOLIOS.map((portfolio) => {
              const isSelected = portfolio.id === selectedPortfolioId;
              const isPositive = portfolio.totalGainLoss >= 0;

              return (
                <button
                  key={portfolio.id}
                  className={`${styles.portfolioCard} ${isSelected ? styles.selected : ''}`}
                  onClick={() => setSelectedPortfolioId(portfolio.id)}
                >
                  <div className={styles.portfolioCardHeader}>
                    <div className={styles.portfolioIcon}>
                      <Briefcase size={18} />
                    </div>
                    {isSelected && (
                      <div className={styles.selectedBadge}>
                        <Check size={12} />
                      </div>
                    )}
                  </div>
                  <div className={styles.portfolioCardContent}>
                    <h3 className={styles.portfolioName}>{portfolio.name}</h3>
                    <p className={styles.portfolioDescription}>{portfolio.description}</p>
                  </div>
                  <div className={styles.portfolioCardFooter}>
                    <span className={styles.portfolioValue}>
                      ${portfolio.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <span className={`${styles.portfolioChange} ${isPositive ? styles.positive : styles.negative}`}>
                      {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {isPositive ? '+' : ''}{portfolio.totalGainLossPercent.toFixed(2)}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Holdings Table */}
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderLeft}>
              <h2 className={styles.sectionTitle}>{selectedPortfolio.name}</h2>
              <span className={styles.holdingsCount}>
                {selectedPortfolio.positions.length} holdings
              </span>
            </div>
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
            <div className={styles.tableHeaderRow}>
              <span>Symbol</span>
              <span>Shares</span>
              <span>Price</span>
              <span>Market Value</span>
              <span>Total Return</span>
              <span>Allocation</span>
              <span></span>
            </div>

            <div className={styles.tableBody}>
              {sortedPositions.map((position) => {
                const isPosPositive = position.gainLoss >= 0;

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
          </div>

          {/* Portfolio Summary Footer */}
          <div className={styles.summaryFooter}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total Value</span>
              <span className={styles.summaryValue}>
                ${selectedPortfolio.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total Gain/Loss</span>
              <span className={`${styles.summaryValue} ${selectedPortfolio.totalGainLoss >= 0 ? styles.positive : styles.negative}`}>
                {selectedPortfolio.totalGainLoss >= 0 ? '+' : ''}
                ${Math.abs(selectedPortfolio.totalGainLoss).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                <span className={styles.summaryPercent}>
                  ({selectedPortfolio.totalGainLoss >= 0 ? '+' : ''}{selectedPortfolio.totalGainLossPercent.toFixed(2)}%)
                </span>
              </span>
            </div>
          </div>

          {/* TreeMap - Allocation Visualization */}
          <div className={styles.treemapSection}>
            <h3 className={styles.treemapTitle}>Allocation Distribution</h3>
            <TreeMap
              data={treemapData}
              height={140}
              tile="squarify"
              innerPadding={2}
              outerPadding={4}
              enableLabels={true}
              enableParentLabel={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
