// Path: src/pages/app/DashboardPage/DashboardPage.tsx
// FING 3.0 - Simple, Clean Dashboard

import { useMemo, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowRight, Briefcase, Newspaper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useNews } from '../../../hooks/useNews';
import { useIsMobile } from '../../../hooks/useBreakpoint';

// Store
import { usePortfolioStore } from '../../../store';

// Components
import { NewsCard } from '../../../components/molecules/fing/NewsCard';
import { PortfolioPerformance } from '../../../components/organisms/investor/PortfolioPerformance';

import styles from './DashboardPage.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA - Top Buys (stocks NOT in portfolio, recommended to buy)
// ─────────────────────────────────────────────────────────────────────────────

const TOP_BUYS = [
  { ticker: 'META', name: 'Meta Platforms Inc.', score: 94, change: 2.15, price: 505.75 },
  { ticker: 'AVGO', name: 'Broadcom Inc.', score: 91, change: 1.82, price: 168.45 },
  { ticker: 'CRM', name: 'Salesforce Inc.', score: 88, change: 1.35, price: 272.30 },
  { ticker: 'NFLX', name: 'Netflix Inc.', score: 86, change: 0.95, price: 478.20 },
  { ticker: 'ADBE', name: 'Adobe Inc.', score: 84, change: 1.10, price: 524.80 },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function DashboardPage() {
  const navigate = useNavigate();
  const { news } = useNews({ limit: 3 });
  const isMobile = useIsMobile();

  // Get real portfolio data
  const { holdings, fetchPortfolio } = usePortfolioStore();

  // Fetch portfolio on mount
  useEffect(() => {
    if (holdings.length === 0) {
      fetchPortfolio();
    }
  }, [holdings.length, fetchPortfolio]);

  // Top Sells = holdings sorted by worst daily performance (from actual portfolio)
  const topSells = useMemo(() => {
    return [...holdings]
      .sort((a, b) => a.dayChangePercent - b.dayChangePercent) // Worst performers first
      .slice(0, 5)
      .map(h => ({
        ticker: h.symbol,
        name: h.name,
        change: h.dayChangePercent,
        price: h.currentPrice,
      }));
  }, [holdings]);

  // Mobile shows only top 3
  const mobileTopBuys = TOP_BUYS.slice(0, 3);
  const mobileTopSells = topSells.slice(0, 3);

  // Calculate real portfolio totals
  const portfolioTotals = useMemo(() => {
    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
    const totalGain = holdings.reduce((sum, h) => sum + h.gain, 0);
    const totalCost = holdings.reduce((sum, h) => sum + h.costBasis, 0);
    const gainPercent = totalCost > 0 ? (totalGain / totalCost) * 100 : 0;
    return { totalValue, totalGain, gainPercent };
  }, [holdings]);

  // Mobile Layout
  if (isMobile) {
    return (
      <div className={styles.mobileContainer}>
        {/* Portfolio Value Card */}
        <div className={styles.mobileValueCard}>
          <div className={styles.mobileValueTop}>
            <Briefcase size={18} className={styles.mobileValueIcon} />
            <span className={styles.mobileValueLabel}>My Portfolio</span>
          </div>
          <div className={styles.mobileValueBottom}>
            <span className={styles.mobileValueAmount}>
              ${portfolioTotals.totalValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
            <span
              className={styles.mobileValueChange}
              data-positive={portfolioTotals.gainPercent >= 0}
            >
              {portfolioTotals.gainPercent >= 0 ? '+' : ''}
              {portfolioTotals.gainPercent.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Portfolio Performance */}
        <PortfolioPerformance />

        {/* Top Buys & Sells Grid */}
        <div className={styles.mobilePicksGrid}>
          {/* Top Buys */}
          <div className={styles.mobilePicksCard}>
            <div className={styles.mobilePicksHeader}>
              <TrendingUp size={16} className={styles.mobilePicksIcon} />
              <span className={styles.mobilePicksTitle}>Top Buys</span>
            </div>
            <div className={styles.mobilePicksList}>
              {mobileTopBuys.map((rec, index) => (
                <div key={rec.ticker} className={styles.mobilePickItemBuy}>
                  <span className={styles.mobilePickRank}>#{index + 1}</span>
                  <span className={styles.mobilePickTicker}>{rec.ticker}</span>
                  <span className={styles.mobilePickPrice}>${rec.price.toFixed(0)}</span>
                  <span
                    className={styles.mobilePickChange}
                    data-positive={rec.change >= 0}
                  >
                    {rec.change >= 0 ? '+' : ''}{rec.change.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Sells - From actual portfolio */}
          <div className={styles.mobilePicksCard} data-variant="sell">
            <div className={styles.mobilePicksHeader}>
              <TrendingDown size={16} className={styles.mobileSellsIcon} />
              <span className={styles.mobilePicksTitle}>Top Sells</span>
            </div>
            <div className={styles.mobilePicksList}>
              {mobileTopSells.map((rec, index) => (
                <div key={rec.ticker} className={styles.mobilePickItemSell}>
                  <span className={styles.mobilePickRank}>#{index + 1}</span>
                  <span className={styles.mobilePickTicker}>{rec.ticker}</span>
                  <span className={styles.mobilePickPrice}>${rec.price.toFixed(0)}</span>
                  <span
                    className={styles.mobilePickChange}
                    data-positive={rec.change >= 0}
                  >
                    {rec.change >= 0 ? '+' : ''}{rec.change.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* News Card */}
        <div
          className={styles.mobileNewsCard}
          onClick={() => navigate('/app/dashboard/news')}
        >
          <Newspaper size={18} className={styles.mobileNewsIcon} />
          <div className={styles.mobileNewsContent}>
            <span className={styles.mobileNewsTitle}>Latest News</span>
            <span className={styles.mobileNewsCount}>{news.length} articles</span>
          </div>
          <ArrowRight size={16} className={styles.mobileNewsArrow} />
        </div>
      </div>
    );
  }

  // Desktop Layout - Simple Two Column
  return (
    <div className={styles.container}>
      {/* Header Row */}
      <div className={styles.headerRow}>
        {/* Left side - Avatar + Title */}
        <div className={styles.headerLeft}>
          {/* Avatar - Raised circular with initials */}
          <div className={styles.headerAvatar}>
            <span className={styles.headerAvatarInitials}>PB</span>
          </div>

          {/* Text - Pillow soft 3D typography with raised frame */}
          <div className={styles.greetingFrame}>
            <h1 className={styles.headerTitle}>Welcome Pierpaolo</h1>
          </div>
        </div>

        {/* Portfolio Button - Right side */}
        <button
          onClick={() => navigate('/app/dashboard/portfolio')}
          className={styles.raisedButton}
        >
          Portfolio
          <span className={styles.buttonIconCircle}>
            <Briefcase size={12} className={styles.buttonIcon} />
          </span>
        </button>
      </div>

      {/* Balance Row - Pill + KPIs */}
      <div className={styles.balanceRow}>
        {/* Balance Pill Indicator */}
        <div className={styles.balancePill}>
          {/* Inset circle with portfolio icon */}
          <div className={styles.balancePillIcon}>
            <Briefcase
              size={24}
              className={styles.balancePillBriefcase}
            />
          </div>
          {/* Value and label */}
          <div className={styles.balancePillContent}>
            <div className={styles.balancePillValue}>
              ${portfolioTotals.totalValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
            <div className={styles.balancePillLabel}>TOTAL BALANCE</div>
          </div>
        </div>

        {/* KPI Indicators */}
        <div className={styles.balanceKpis}>
          <div className={styles.kpiMeter}>
            <div className={styles.kpiMeterInner}>
              <span className={styles.kpiValue}>87</span>
              <span className={styles.kpiLabel}>SCORE</span>
            </div>
          </div>
          <div className={styles.kpiMeter}>
            <div className={styles.kpiMeterInner}>
              <span className={styles.kpiValueWarning}>42</span>
              <span className={styles.kpiLabel}>RISK</span>
            </div>
          </div>
          <div className={styles.kpiMeter}>
            <div className={styles.kpiMeterInner}>
              <span className={styles.kpiValuePositive}>+16%</span>
              <span className={styles.kpiLabel}>YTD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Performance */}
      <PortfolioPerformance />

      {/* Bottom Grid - Two Cards */}
      <div className={styles.bottomGrid}>
        {/* Unified Recommendations Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--marble-base)',
                  boxShadow: 'inset 1.5px 1.5px 3px var(--shadow-dark), inset -1.5px -1.5px 3px var(--shadow-light)',
                }}
              >
                <TrendingUp
                  size={15}
                  style={{
                    color: 'var(--fing-accent-primary)',
                    filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))',
                  }}
                />
              </span>
              Recommendations
            </h3>
            {/* Pill Frame INSET → RAISED Button */}
            <div className={styles.pillFrameWrapperSm}>
              <button
                onClick={() => navigate('/app/dashboard/recommendations')}
                className={styles.pillFrameButtonSm}
              >
                View All
                <span className={styles.buttonIconCircleSm}>
                  <ArrowRight size={11} className={styles.buttonIcon} />
                </span>
              </button>
            </div>
          </div>

          {/* Data Tables Grid */}
          <div className={styles.dataTablesGrid}>
            {/* Top Buys Data Table */}
            <div className={styles.dataTableContainer}>
              <div className={styles.dataTableHeader}>
                <TrendingUp size={14} className={styles.dataTableIconBuy} />
                <span className={styles.dataTableTitle}>Top Buys</span>
              </div>
              <div className={styles.dataTableBody}>
                {TOP_BUYS.slice(0, 3).map((rec, index) => (
                  <div key={rec.ticker} className={styles.rowFrameInset}>
                    <div className={styles.dataTableRowBuy}>
                      <span className={styles.dataTableCellRank}>{index + 1}</span>
                      <span className={styles.dataTableCellTicker}>{rec.ticker}</span>
                      <span className={styles.dataTableCellPrice}>${rec.price.toFixed(0)}</span>
                      <span
                        className={styles.dataTableCellChange}
                        data-positive={rec.change >= 0}
                      >
                        {rec.change >= 0 ? '+' : ''}{rec.change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Sells Data Table */}
            <div className={styles.dataTableContainer}>
              <div className={styles.dataTableHeader}>
                <TrendingDown size={14} className={styles.dataTableIconSell} />
                <span className={styles.dataTableTitleSell}>Top Sells</span>
              </div>
              <div className={styles.dataTableBody}>
                {topSells.slice(0, 3).map((rec, index) => (
                  <div key={rec.ticker} className={styles.rowFrameInset}>
                    <div className={styles.dataTableRowSell}>
                      <span className={styles.dataTableCellRankSell}>{index + 1}</span>
                      <span className={styles.dataTableCellTicker}>{rec.ticker}</span>
                      <span className={styles.dataTableCellPrice}>${rec.price.toFixed(0)}</span>
                      <span
                        className={styles.dataTableCellChange}
                        data-positive={rec.change >= 0}
                      >
                        {rec.change >= 0 ? '+' : ''}{rec.change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Latest News */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--marble-base)',
                  boxShadow: 'inset 1.5px 1.5px 3px var(--shadow-dark), inset -1.5px -1.5px 3px var(--shadow-light)',
                }}
              >
                <Newspaper
                  size={15}
                  style={{
                    color: 'var(--fing-accent-primary)',
                    filter: 'drop-shadow(-0.5px -0.5px 0px rgba(255, 255, 255, 0.9)) drop-shadow(0.5px 0.5px 0px rgba(130, 140, 155, 0.4))',
                  }}
                />
              </span>
              Latest News
            </h3>
            {/* Pill Frame INSET → RAISED Button */}
            <div className={styles.pillFrameWrapperSm}>
              <button
                onClick={() => navigate('/app/dashboard/news')}
                className={styles.pillFrameButtonSm}
              >
                View All
                <span className={styles.buttonIconCircleSm}>
                  <ArrowRight size={11} className={styles.buttonIcon} />
                </span>
              </button>
            </div>
          </div>
          <div className={styles.newsList}>
            {news.slice(0, 3).map((item) => (
              <NewsCard key={item.id} {...item} compact />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
