// Path: src/pages/app/DashboardPage/DashboardPage.tsx
// SENTINEL 3.0 - Simple, Clean Dashboard

import { useMemo, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowRight, Briefcase, Newspaper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useNews } from '../../../hooks/useNews';
import { useIsMobile } from '../../../hooks/useBreakpoint';

// Store
import { usePortfolioStore } from '../../../store';

// Components
import { Button } from '../../../components/atoms/Button';
import { NewsCard } from '../../../components/molecules/sentinel/NewsCard';
import { FinancialLineChart } from '../../../components/charts';

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

  // Performance comparison chart data - SENTINEL vs alternatives
  const performanceComparisonData = useMemo(() => {
    const months = 12;
    const startValue = 10000;

    const sentinelData: Array<{ x: string; y: number }> = [];
    const sp500Data: Array<{ x: string; y: number }> = [];
    const nasdaqData: Array<{ x: string; y: number }> = [];
    const bondsData: Array<{ x: string; y: number }> = [];
    const goldData: Array<{ x: string; y: number }> = [];

    const sentinelReturns = [0.018, 0.012, 0.022, 0.008, 0.015, 0.019, 0.011, 0.016, 0.014, 0.020, 0.013, 0.017];
    const sp500Returns = [0.010, 0.005, 0.012, -0.003, 0.008, 0.011, 0.004, 0.009, 0.006, 0.010, 0.007, 0.008];
    const nasdaqReturns = [0.012, 0.007, 0.014, -0.005, 0.010, 0.013, 0.005, 0.011, 0.008, 0.012, 0.009, 0.010];
    const bondsReturns = [0.003, 0.002, 0.004, 0.001, 0.003, 0.002, 0.003, 0.002, 0.004, 0.003, 0.002, 0.003];
    const goldReturns = [0.004, 0.001, 0.005, 0.002, 0.002, 0.003, 0.001, 0.004, 0.002, 0.003, 0.001, 0.002];

    let sentinelValue = startValue;
    let sp500Value = startValue;
    let nasdaqValue = startValue;
    let bondsValue = startValue;
    let goldValue = startValue;

    for (let i = 0; i < months; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - (months - 1 - i));
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

      sentinelValue = sentinelValue * (1 + sentinelReturns[i]);
      sp500Value = sp500Value * (1 + sp500Returns[i]);
      nasdaqValue = nasdaqValue * (1 + nasdaqReturns[i]);
      bondsValue = bondsValue * (1 + bondsReturns[i]);
      goldValue = goldValue * (1 + goldReturns[i]);

      sentinelData.push({ x: dateStr, y: Math.round(sentinelValue) });
      sp500Data.push({ x: dateStr, y: Math.round(sp500Value) });
      nasdaqData.push({ x: dateStr, y: Math.round(nasdaqValue) });
      bondsData.push({ x: dateStr, y: Math.round(bondsValue) });
      goldData.push({ x: dateStr, y: Math.round(goldValue) });
    }

    return [
      { id: 'SENTINEL', data: sentinelData },
      { id: 'NASDAQ', data: nasdaqData },
      { id: 'S&P 500', data: sp500Data },
      { id: 'Gold', data: goldData },
      { id: 'Bonds', data: bondsData },
    ];
  }, []);

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

        {/* Chart Card */}
        <div className={styles.mobileChartCard}>
          <div className={styles.mobileChartWrapper}>
            <FinancialLineChart
              data={performanceComparisonData}
              height={160}
              enableArea={true}
              areaSeriesIndex={0}
              enablePoints={false}
              showZeroLine={false}
              formatValue={(value) => `$${value.toLocaleString()}`}
              colors={['#5BA3A5', '#9b8ab8', '#7a99b8', '#b8a07a', '#a89878']}
              minimal={true}
            />
          </div>
          <div className={styles.mobileLegend}>
            <div className={styles.mobileLegendItem}>
              <img src="/sentinel-favicon.svg" alt="" className={styles.mobileLegendLogo} />
              <span>SENTINEL</span>
            </div>
            <div className={styles.mobileLegendItem}>
              <span className={styles.mobileLegendDot} style={{ background: '#9b8ab8' }} />
              <span>NASDAQ</span>
            </div>
            <div className={styles.mobileLegendItem}>
              <span className={styles.mobileLegendDot} style={{ background: '#7a99b8' }} />
              <span>S&P 500</span>
            </div>
            <div className={styles.mobileLegendItem}>
              <span className={styles.mobileLegendDot} style={{ background: '#b8a07a' }} />
              <span>Gold</span>
            </div>
            <div className={styles.mobileLegendItem}>
              <span className={styles.mobileLegendDot} style={{ background: '#a89878' }} />
              <span>Bonds</span>
            </div>
          </div>
        </div>

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
                <div key={rec.ticker} className={styles.mobilePickItem}>
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
                <div key={rec.ticker} className={styles.mobilePickItem}>
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
      {/* Main Chart - Full Width */}
      <div className={styles.mainChart}>
        <div className={styles.chartHeader}>
          <div className={styles.chartHeaderLeft}>
            <h2 className={styles.chartTitle}>
              <Briefcase size={14} />
              My Portfolio
            </h2>
            <div className={styles.chartMetrics}>
              <span className={styles.chartMetricValue}>
                ${portfolioTotals.totalValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
              <span
                className={styles.chartMetricChange}
                data-positive={portfolioTotals.gainPercent >= 0}
              >
                {portfolioTotals.gainPercent >= 0 ? '+' : ''}
                {portfolioTotals.gainPercent.toFixed(1)}%
              </span>
            </div>
          </div>
          {/* Legend - Top Right */}
          <div className={styles.chartLegend}>
            <div className={styles.chartLegendItem}>
              <img src="/sentinel-favicon.svg" alt="" className={styles.chartLegendLogo} />
              <span>SENTINEL</span>
            </div>
            <div className={styles.chartLegendItem}>
              <span className={styles.chartLegendDot} style={{ background: '#9b8ab8' }} />
              <span>NASDAQ</span>
            </div>
            <div className={styles.chartLegendItem}>
              <span className={styles.chartLegendDot} style={{ background: '#7a99b8' }} />
              <span>S&P 500</span>
            </div>
            <div className={styles.chartLegendItem}>
              <span className={styles.chartLegendDot} style={{ background: '#b8a07a' }} />
              <span>Gold</span>
            </div>
            <div className={styles.chartLegendItem}>
              <span className={styles.chartLegendDot} style={{ background: '#a89878' }} />
              <span>Bonds</span>
            </div>
          </div>
        </div>
        <div className={styles.chartWrapper}>
          <FinancialLineChart
            data={performanceComparisonData}
            height={240}
            enableArea={true}
            areaSeriesIndex={0}
            enablePoints={false}
            showZeroLine={false}
            formatValue={(value) => `$${value.toLocaleString()}`}
            colors={['#5BA3A5', '#9b8ab8', '#7a99b8', '#b8a07a', '#a89878']}
            minimal={true}
          />
        </div>
      </div>

      {/* Bottom Grid - Three Cards */}
      <div className={styles.bottomGrid}>
        {/* Top Buys */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <TrendingUp size={18} />
              Top Buys
            </h3>
            <Button
              variant="secondary"
              onClick={() => navigate('/app/dashboard/recommendations')}
              icon={<ArrowRight size={14} />}
            >
              View All
            </Button>
          </div>
          <div className={styles.recommendationsList}>
            {TOP_BUYS.map((rec, index) => (
              <div key={rec.ticker} className={styles.recommendationItem}>
                <span className={styles.recRank}>#{index + 1}</span>
                <div className={styles.recInfo}>
                  <span className={styles.recTicker}>{rec.ticker}</span>
                </div>
                <span className={styles.recPriceValue}>${rec.price.toFixed(0)}</span>
                <span
                  className={styles.recChange}
                  data-positive={rec.change >= 0}
                >
                  {rec.change >= 0 ? '+' : ''}{rec.change.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Sells - From actual portfolio */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitleSell}>
              <TrendingDown size={18} />
              Top Sells
            </h3>
            <Button
              variant="secondary"
              onClick={() => navigate('/app/dashboard/portfolio')}
              icon={<ArrowRight size={14} />}
            >
              View Portfolio
            </Button>
          </div>
          <div className={styles.recommendationsList}>
            {topSells.map((rec, index) => (
              <div key={rec.ticker} className={styles.recommendationItem}>
                <span className={styles.recRankSell}>#{index + 1}</span>
                <div className={styles.recInfo}>
                  <span className={styles.recTicker}>{rec.ticker}</span>
                </div>
                <span className={styles.recPriceValue}>${rec.price.toFixed(0)}</span>
                <span
                  className={styles.recChange}
                  data-positive={rec.change >= 0}
                >
                  {rec.change >= 0 ? '+' : ''}{rec.change.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Latest News */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Newspaper size={18} />
              Latest News
            </h3>
            <Button
              variant="secondary"
              onClick={() => navigate('/app/dashboard/news')}
              icon={<ArrowRight size={14} />}
            >
              View All
            </Button>
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
