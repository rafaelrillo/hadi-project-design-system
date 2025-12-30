// Path: src/pages/app/DashboardPage/DashboardPage.tsx
// Overview/Home page for the SENTINEL Dashboard

import { useMemo } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useNews } from '../../../hooks/useNews';

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

  // Performance comparison chart data - Your Portfolio vs SENTINEL Recommendations
  const performanceComparisonData = useMemo(() => {
    const months = 12;
    const startValue = 10000;

    const yourPortfolioData: Array<{ x: string; y: number }> = [];
    const sentinelData: Array<{ x: string; y: number }> = [];

    let yourValue = startValue;
    let sentinelValue = startValue;

    for (let i = 0; i < months; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - (months - 1 - i));
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

      const yourMonthlyReturn = (Math.random() - 0.35) * 0.05 + 0.008;
      yourValue = yourValue * (1 + yourMonthlyReturn);

      const sentinelMonthlyReturn = (Math.random() - 0.3) * 0.04 + 0.012;
      sentinelValue = sentinelValue * (1 + sentinelMonthlyReturn);

      yourPortfolioData.push({ x: dateStr, y: Math.round(yourValue) });
      sentinelData.push({ x: dateStr, y: Math.round(sentinelValue) });
    }

    return [
      { id: 'Your Portfolio', data: yourPortfolioData },
      { id: 'SENTINEL Strategy', data: sentinelData },
    ];
  }, []);

  // Calculate performance metrics
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

  return (
    <div className={styles.container}>
      {/* Main Chart - Full Width */}
      <div className={styles.mainChart}>
        <div className={styles.chartHeader}>
          <div>
            <h2 className={styles.chartTitle}>Portfolio Performance</h2>
            <p className={styles.chartSubtitle}>
              Your investments vs SENTINEL recommended strategy
            </p>
          </div>
          {performanceMetrics && (
            <div className={styles.metricsRow}>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Your Portfolio</span>
                <span
                  className={styles.metricValue}
                  data-positive={parseFloat(performanceMetrics.yourReturn) >= 0}
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
                  data-positive={parseFloat(performanceMetrics.sentinelReturn) >= 0}
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
                  data-positive={parseFloat(performanceMetrics.difference) >= 0}
                >
                  {parseFloat(performanceMetrics.difference) >= 0 ? '+' : ''}
                  {performanceMetrics.difference}%
                </span>
              </div>
            </div>
          )}
        </div>
        <FinancialLineChart
          data={performanceComparisonData}
          height={320}
          enableArea={true}
          enablePoints={true}
          showZeroLine={false}
          yAxisLabel="Portfolio Value ($)"
          formatValue={(value) => `$${value.toLocaleString()}`}
          colors={['#F5A623', '#5BA3A5']}
        />
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
