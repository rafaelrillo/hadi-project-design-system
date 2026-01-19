// Path: src/components/organisms/investor/PortfolioPerformance/PortfolioPerformance.tsx
// Stone Marble Portfolio Performance Component

import { useState, useMemo } from 'react';
import { LineChart } from '@/components/charts/echarts';
import { FingEmblem } from '@/components/atoms/FingEmblem';
import { FingWordmarkText } from '@/components/atoms/FingWordmark';
import styles from './PortfolioPerformance.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface PortfolioPerformanceProps {
  className?: string;
}

type TimeRange = 'semanal' | 'mensual' | 'anual';

// ─────────────────────────────────────────────────────────────────────────────
// CHART DATA GENERATOR
// ─────────────────────────────────────────────────────────────────────────────

interface SeriesDataPoint {
  x: string;
  y: number;
}

interface SeriesData {
  id: string;
  name: string;
  color?: string;
  data: SeriesDataPoint[];
}

function generatePerformanceData(months: number): SeriesData[] {
  const startValue = 10000;

  const sentinelData: SeriesDataPoint[] = [];
  const sp500Data: SeriesDataPoint[] = [];
  const nasdaqData: SeriesDataPoint[] = [];
  const bondsData: SeriesDataPoint[] = [];
  const goldData: SeriesDataPoint[] = [];

  // Monthly returns (annualized patterns)
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

  const startMonth = 12 - months;

  for (let i = startMonth; i < 12; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (11 - i));
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;

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

  // Return as SeriesData[] format expected by LineChart
  return [
    { id: 'FING', name: 'FING', data: sentinelData, color: '#5BA3A5' },
    { id: 'NASDAQ', name: 'NASDAQ', data: nasdaqData, color: '#9b8ab8' },
    { id: 'S&P 500', name: 'S&P 500', data: sp500Data, color: '#7a99b8' },
    { id: 'Gold', name: 'Gold', data: goldData, color: '#b8a07a' },
    { id: 'Bonds', name: 'Bonds', data: bondsData, color: '#a89878' },
  ];
}

const timeRangeMonths: Record<TimeRange, number> = {
  semanal: 1,
  mensual: 3,
  anual: 12,
};

const timeRangeLabels: Record<TimeRange, string> = {
  semanal: 'Semanal',
  mensual: 'Mensual',
  anual: 'Anual',
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function PortfolioPerformance({ className }: PortfolioPerformanceProps) {
  const [activeTab, setActiveTab] = useState<TimeRange>('anual');

  // Generate chart data based on selected time range
  const chartData = useMemo(() => {
    return generatePerformanceData(timeRangeMonths[activeTab]);
  }, [activeTab]);

  return (
    <div className={`${styles.performanceCard} ${className || ''}`}>
      {/* Header con título y tabs */}
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>Portfolio Performance</h3>

        {/* Tab Group - contenedor INSET con items GLASS */}
        <div className={styles.tabGroup}>
          {(['semanal', 'mensual', 'anual'] as TimeRange[]).map((range) => (
            <button
              key={range}
              className={`${styles.tab} ${activeTab === range ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(range)}
            >
              {timeRangeLabels[range]}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container - INSET */}
      <div className={styles.chartContainer}>
        <LineChart
          data={chartData}
          height={200}
          enableArea={true}
          areaOpacity={0.25}
          smooth={true}
          formatValue={(value) => `$${value.toLocaleString()}`}
          showLegend={false}
        />
      </div>

      {/* Legend */}
      <div className={styles.legendWrapper}>
        {/* FING Indicator - Same as sidebar logo */}
        <div className={styles.fingIndicator}>
          <div className={styles.fingLogo}>
            <FingEmblem size={42} animation="rippleSlow" />
          </div>
          <FingWordmarkText
            variant="sharp"
            size={24}
            style={{
              color: 'var(--fing-accent)',
              textShadow: '0.5px 0.5px 0px rgba(255, 255, 255, 0.9), -0.5px -0.5px 0px rgba(58, 106, 114, 0.25)',
            }}
          />
        </div>

        {/* Other Indicators */}
        <div className={styles.legendRow}>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#9b8ab8' }} />
            <span className={styles.legendTextNasdaq}>NASDAQ</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#7a99b8' }} />
            <span className={styles.legendTextSp500}>S&P 500</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#b8a07a' }} />
            <span className={styles.legendTextGold}>Gold</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#a89878' }} />
            <span className={styles.legendTextBonds}>Bonds</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioPerformance;
