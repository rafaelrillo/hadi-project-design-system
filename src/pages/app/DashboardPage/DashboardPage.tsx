// Path: src/pages/app/DashboardPage/DashboardPage.tsx
// Overview/Home page for the SENTINEL Dashboard

import { useMemo } from 'react';
import { TrendingUp, ArrowRight, Briefcase, Newspaper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useNews } from '../../../hooks/useNews';
import { useIsMobile } from '../../../hooks/useBreakpoint';

// Components
import { Button } from '../../../components/atoms/Button';
import { NewsCard } from '../../../components/molecules/sentinel/NewsCard';
import { FinancialLineChart } from '../../../components/charts';

import styles from './DashboardPage.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA - Top 5 Recommendations
// ─────────────────────────────────────────────────────────────────────────────

const TOP_RECOMMENDATIONS = [
  { ticker: 'NVDA', name: 'NVIDIA Corporation', score: 94, change: 2.58, price: 495.22 },
  { ticker: 'MSFT', name: 'Microsoft Corporation', score: 92, change: 1.10, price: 378.91 },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', score: 89, change: -0.62, price: 141.80 },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', score: 87, change: 1.83, price: 178.25 },
  { ticker: 'AAPL', name: 'Apple Inc.', score: 85, change: 1.39, price: 178.72 },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function DashboardPage() {
  const navigate = useNavigate();
  const { news } = useNews({ limit: 3 });
  const isMobile = useIsMobile();

  // Performance comparison chart data - SENTINEL vs alternatives
  // Using seeded values to ensure SENTINEL is always on top
  const performanceComparisonData = useMemo(() => {
    const months = 12;
    const startValue = 10000;

    const sentinelData: Array<{ x: string; y: number }> = [];
    const sp500Data: Array<{ x: string; y: number }> = [];
    const bondsData: Array<{ x: string; y: number }> = [];

    // Predefined monthly returns to ensure consistent ordering
    const sentinelReturns = [0.018, 0.012, 0.022, 0.008, 0.015, 0.019, 0.011, 0.016, 0.014, 0.020, 0.013, 0.017];
    const sp500Returns = [0.010, 0.005, 0.012, -0.003, 0.008, 0.011, 0.004, 0.009, 0.006, 0.010, 0.007, 0.008];
    const bondsReturns = [0.003, 0.002, 0.004, 0.001, 0.003, 0.002, 0.003, 0.002, 0.004, 0.003, 0.002, 0.003];

    let sentinelValue = startValue;
    let sp500Value = startValue;
    let bondsValue = startValue;

    for (let i = 0; i < months; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - (months - 1 - i));
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

      sentinelValue = sentinelValue * (1 + sentinelReturns[i]);
      sp500Value = sp500Value * (1 + sp500Returns[i]);
      bondsValue = bondsValue * (1 + bondsReturns[i]);

      sentinelData.push({ x: dateStr, y: Math.round(sentinelValue) });
      sp500Data.push({ x: dateStr, y: Math.round(sp500Value) });
      bondsData.push({ x: dateStr, y: Math.round(bondsValue) });
    }

    return [
      { id: 'SENTINEL', data: sentinelData },
      { id: 'S&P 500', data: sp500Data },
      { id: 'Bonds', data: bondsData },
    ];
  }, []);

  // Calculate performance metrics
  const performanceMetrics = useMemo(() => {
    if (performanceComparisonData.length < 3) return null;

    const sentinelData = performanceComparisonData[0].data;
    const sp500Data = performanceComparisonData[1].data;

    const sentinelStart = sentinelData[0]?.y || 10000;
    const sentinelEnd = sentinelData[sentinelData.length - 1]?.y || 10000;
    const sp500Start = sp500Data[0]?.y || 10000;
    const sp500End = sp500Data[sp500Data.length - 1]?.y || 10000;

    const sentinelReturn = ((sentinelEnd - sentinelStart) / sentinelStart) * 100;
    const sp500Return = ((sp500End - sp500Start) / sp500Start) * 100;
    const difference = sentinelReturn - sp500Return;

    return {
      sentinelReturn: sentinelReturn.toFixed(1),
      sp500Return: sp500Return.toFixed(1),
      difference: difference.toFixed(1),
      sentinelValue: sentinelEnd.toLocaleString(),
    };
  }, [performanceComparisonData]);

  // Mobile Layout
  if (isMobile) {
    return (
      <div className={styles.mobileContainer}>
        {/* Mobile Chart Card - Sentinel Portfolio */}
        <div className={styles.mobileChartCard}>
          {/* Portfolio Header - Label left, values right */}
          {performanceMetrics && (
            <div className={styles.mobilePortfolioHeader}>
              <span className={styles.mobilePortfolioLabel}>
                <Briefcase size={16} />
                Sentinel Portfolio
              </span>
              <div className={styles.mobilePortfolioValues}>
                <span className={styles.mobilePortfolioValue}>${performanceMetrics.sentinelValue}</span>
                <span
                  className={styles.mobilePortfolioChange}
                  data-positive={parseFloat(performanceMetrics.sentinelReturn) >= 0}
                >
                  {parseFloat(performanceMetrics.sentinelReturn) >= 0 ? '+' : ''}
                  {performanceMetrics.sentinelReturn}%
                </span>
              </div>
            </div>
          )}

          {/* Chart */}
          <div className={styles.mobileChartWrapper}>
            <FinancialLineChart
              data={performanceComparisonData}
              height={130}
              enableArea={true}
              areaSeriesIndex={0}
              enablePoints={false}
              showZeroLine={false}
              formatValue={(value) => `$${value.toLocaleString()}`}
              colors={['#5BA3A5', '#6b7280', '#4b5563']}
              minimal={true}
            />
          </div>

          {/* Legend */}
          <div className={styles.mobileLegend}>
            <div className={styles.mobileLegendItem}>
              <img src="/sentinel-favicon.svg" alt="" className={styles.mobileLegendLogo} />
              <span>SENTINEL</span>
            </div>
            <div className={styles.mobileLegendItem}>
              <span className={styles.mobileLegendDot} style={{ background: '#6b7280' }} />
              <span>S&P 500</span>
            </div>
            <div className={styles.mobileLegendItem}>
              <span className={styles.mobileLegendDot} style={{ background: '#4b5563' }} />
              <span>Bonds</span>
            </div>
          </div>
        </div>

        {/* Mobile Recommendations */}
        <div className={styles.mobileSection}>
          <div className={styles.mobileSectionHeader}>
            <h3 className={styles.mobileSectionTitle}>
              <TrendingUp size={16} />
              Top Picks
            </h3>
          </div>
          <div className={styles.mobileRecommendations}>
            {TOP_RECOMMENDATIONS.map((rec) => (
              <div key={rec.ticker} className={styles.mobileRecCard}>
                <div className={styles.mobileRecLeft}>
                  <span className={styles.mobileRecTicker}>{rec.ticker}</span>
                  <span className={styles.mobileRecName}>{rec.name}</span>
                </div>
                <div className={styles.mobileRecRight}>
                  <span className={styles.mobileRecPrice}>${rec.price.toFixed(2)}</span>
                  <span
                    className={styles.mobileRecChange}
                    data-positive={rec.change >= 0}
                  >
                    {rec.change >= 0 ? '+' : ''}{rec.change.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News Preview Card */}
        <div
          className={styles.mobileNewsCard}
          onClick={() => navigate('/app/dashboard/news')}
        >
          <div className={styles.mobileNewsLeft}>
            <Newspaper size={18} />
            <div className={styles.mobileNewsContent}>
              <span className={styles.mobileNewsTitle}>Latest News</span>
              <span className={styles.mobileNewsCount}>{news.length} articles today</span>
            </div>
          </div>
          <ArrowRight size={16} className={styles.mobileNewsArrow} />
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className={styles.container}>
      {/* Main Chart - Full Width */}
      <div className={styles.mainChart}>
        <div className={styles.chartHeader}>
          <div className={styles.chartHeaderLeft}>
            <h2 className={styles.chartTitle}>Portfolio Performance</h2>
            {performanceMetrics && (
              <div className={styles.chartMetrics}>
                <span className={styles.chartMetricValue}>${performanceMetrics.sentinelValue}</span>
                <span
                  className={styles.chartMetricChange}
                  data-positive={parseFloat(performanceMetrics.sentinelReturn) >= 0}
                >
                  {parseFloat(performanceMetrics.sentinelReturn) >= 0 ? '+' : ''}
                  {performanceMetrics.sentinelReturn}%
                </span>
              </div>
            )}
          </div>
          {/* Legend - Top Right */}
          <div className={styles.chartLegend}>
            <div className={styles.chartLegendItem}>
              <img src="/sentinel-favicon.svg" alt="" className={styles.chartLegendLogo} />
              <span>SENTINEL</span>
            </div>
            <div className={styles.chartLegendItem}>
              <span className={styles.chartLegendDot} style={{ background: '#6b7280' }} />
              <span>S&P 500</span>
            </div>
            <div className={styles.chartLegendItem}>
              <span className={styles.chartLegendDot} style={{ background: '#4b5563' }} />
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
            colors={['#5BA3A5', '#6b7280', '#4b5563']}
            minimal={true}
          />
        </div>
      </div>

      {/* Bottom Grid - Two Cards */}
      <div className={styles.bottomGrid}>
        {/* Top 5 Recommendations */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <TrendingUp size={18} />
              Top Recommendations
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
            {TOP_RECOMMENDATIONS.map((rec, index) => (
              <div key={rec.ticker} className={styles.recommendationItem}>
                <span className={styles.recRank}>#{index + 1}</span>
                <div className={styles.recInfo}>
                  <span className={styles.recTicker}>{rec.ticker}</span>
                  <span className={styles.recName}>{rec.name}</span>
                </div>
                <div className={styles.recPrice}>
                  <span className={styles.recPriceValue}>${rec.price.toFixed(2)}</span>
                  <span
                    className={styles.recChange}
                    data-positive={rec.change >= 0}
                  >
                    {rec.change >= 0 ? '+' : ''}{rec.change.toFixed(2)}%
                  </span>
                </div>
                <div className={styles.recScore}>
                  <span className={styles.scoreValue}>{rec.score}</span>
                  <span className={styles.scoreLabel}>Score</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest News */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Latest News</h3>
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
