// Path: src/pages/app/PortfolioView/PortfolioView.tsx

import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  MoreVertical,
  PieChart,
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { TreeMap } from '@/components/charts';
import { useIsMobile } from '@/hooks/useBreakpoint';
import { usePortfolioStore } from '@/store';
import styles from './PortfolioView.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function PortfolioView() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sortBy, setSortBy] = useState<'allocation' | 'gainLoss' | 'dayChange'>('allocation');

  const { holdings, summary, fetchPortfolio, isLoading } = usePortfolioStore();

  // Fetch portfolio on mount
  useEffect(() => {
    if (holdings.length === 0) {
      fetchPortfolio();
    }
  }, [holdings.length, fetchPortfolio]);

  // Calculate totals from holdings
  const portfolioTotals = useMemo(() => {
    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
    const totalGain = holdings.reduce((sum, h) => sum + h.gain, 0);
    const totalCost = holdings.reduce((sum, h) => sum + h.costBasis, 0);
    const gainPercent = totalCost > 0 ? (totalGain / totalCost) * 100 : 0;

    return {
      totalValue,
      totalGain,
      gainPercent,
    };
  }, [holdings]);

  // Sort positions
  const sortedPositions = useMemo(() => {
    return [...holdings].sort((a, b) => {
      switch (sortBy) {
        case 'allocation':
          return b.allocation - a.allocation;
        case 'gainLoss':
          return b.gainPercent - a.gainPercent;
        case 'dayChange':
          return b.dayChangePercent - a.dayChangePercent;
        default:
          return 0;
      }
    });
  }, [holdings, sortBy]);

  // TreeMap data
  const treemapData = useMemo(() => {
    return {
      name: 'Portfolio',
      children: holdings.map((h) => ({
        name: h.symbol,
        value: h.value,
      })),
    };
  }, [holdings]);

  const isPositive = portfolioTotals.totalGain >= 0;

  // Loading state
  if (isLoading && holdings.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>Loading portfolio...</div>
      </div>
    );
  }

  // Mobile Layout
  if (isMobile) {
    return (
      <div className={styles.mobileContainer}>
        {/* Mobile Header - Portfolio Value + Simulate Button */}
        <div className={styles.mobileHeader}>
          <div className={styles.mobileHeaderTop}>
            <span className={styles.mobileHeaderLabel}>
              <Briefcase size={16} />
              My Portfolio
            </span>
            <Button
              variant="primary"
              icon={<PieChart size={14} />}
              onClick={() => navigate('/app/dashboard/portfolio/simulator')}
            >
              Simulate Portfolio
            </Button>
          </div>
          <div className={styles.mobileHeaderValues}>
            <span className={styles.mobileValue}>
              ${portfolioTotals.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className={`${styles.mobileChange} ${isPositive ? styles.positive : styles.negative}`}>
              {isPositive ? '+' : ''}{portfolioTotals.gainPercent.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* TreeMap - Fixed height */}
        {holdings.length > 0 && (
          <div className={styles.mobileTreemapLarge}>
            <TreeMap
              data={treemapData}
              height={180}
              tile="squarify"
              innerPadding={3}
              outerPadding={0}
              enableLabels={true}
              enableParentLabel={false}
            />
          </div>
        )}

        {/* Mobile Holdings List */}
        <div className={styles.mobileHoldingsSection}>
          <h3 className={styles.mobileHoldingsTitle}>Holdings ({holdings.length})</h3>
          <div className={styles.mobileHoldings}>
            {sortedPositions.map((position) => {
              const isPosPositive = position.gain >= 0;

              return (
                <div key={position.symbol} className={styles.mobileHoldingCard}>
                  <div className={styles.mobileHoldingLeft}>
                    <span className={styles.mobileHoldingTicker}>{position.symbol}</span>
                    <span className={styles.mobileHoldingAllocation}>{position.allocation.toFixed(1)}%</span>
                  </div>
                  <div className={styles.mobileHoldingRight}>
                    <span className={styles.mobileHoldingValue}>
                      ${position.value.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                    </span>
                    <span className={`${styles.mobileHoldingChange} ${isPosPositive ? styles.positive : styles.negative}`}>
                      {isPosPositive ? '+' : ''}{position.gainPercent.toFixed(2)}%
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

  // Desktop Layout - Single Portfolio View
  return (
    <div className={styles.container}>
      {/* Card 1: Portfolio Summary */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderLeft}>
            <div className={styles.cardIcon}>
              <Briefcase size={20} />
            </div>
            <h2 className={styles.cardTitle}>My Portfolio</h2>
            <span className={styles.cardBadge}>{holdings.length} holdings</span>
          </div>
          <Button
            variant="primary"
            icon={<PieChart size={16} />}
            onClick={() => navigate('/app/dashboard/portfolio/simulator')}
          >
            Simulate Portfolio
          </Button>
        </div>
        <div className={styles.summaryContent}>
          <div className={styles.summaryMain}>
            <span className={styles.summaryLabel}>Total Value</span>
            <span className={styles.summaryValue}>
              ${portfolioTotals.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className={styles.summaryStats}>
            <div className={styles.summaryStat}>
              <span className={styles.summaryStatLabel}>Total Gain/Loss</span>
              <span className={`${styles.summaryStatValue} ${isPositive ? styles.positive : styles.negative}`}>
                {isPositive ? '+' : ''}${Math.abs(portfolioTotals.totalGain).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                <span className={styles.summaryStatPercent}>
                  ({isPositive ? '+' : ''}{portfolioTotals.gainPercent.toFixed(2)}%)
                </span>
              </span>
            </div>
            <div className={styles.summaryStat}>
              <span className={styles.summaryStatLabel}>Cash Balance</span>
              <span className={styles.summaryStatValue}>
                ${summary.cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Holdings Table */}
      <div className={styles.card}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderLeft}>
              <h2 className={styles.sectionTitle}>Holdings</h2>
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
                const isPosPositive = position.gain >= 0;

                return (
                  <div key={position.symbol} className={styles.tableRow}>
                    <div className={styles.colSymbol}>
                      <span className={styles.ticker}>{position.symbol}</span>
                      <span className={styles.name}>{position.name}</span>
                    </div>
                    <span className={styles.colShares}>{position.shares}</span>
                    <span className={styles.colPrice}>
                      ${position.currentPrice.toFixed(2)}
                    </span>
                    <span className={styles.colValue}>
                      ${position.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <span className={`${styles.colReturn} ${isPosPositive ? styles.positive : styles.negative}`}>
                      {isPosPositive ? '+' : ''}${position.gain.toFixed(2)}
                      <span className={styles.percent}>
                        ({isPosPositive ? '+' : ''}{position.gainPercent.toFixed(2)}%)
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
      </div>

      {/* Card 3: Allocation Distribution */}
      {holdings.length > 0 && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Allocation Distribution</h2>
          </div>
          <div className={styles.treemapContent}>
            <TreeMap
              data={treemapData}
              height={200}
              tile="squarify"
              innerPadding={2}
              outerPadding={4}
              enableLabels={true}
              enableParentLabel={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
