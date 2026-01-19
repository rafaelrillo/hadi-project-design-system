// Path: src/pages/Landing/components/LiveDemoWidget/LiveDemoWidget.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, TrendingDown, BarChart2, Zap } from 'lucide-react';
import { useMarketStore } from '@/store';
import styles from './LiveDemoWidget.module.css';

interface MiniStock {
  symbol: string;
  price: number;
  change: number;
}

export function LiveDemoWidget() {
  const { stocks, indicators } = useMarketStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get top 5 stocks for display
  const topStocks: MiniStock[] = stocks
    .slice(0, 5)
    .map((stock) => ({
      symbol: stock.symbol,
      price: stock.price,
      change: stock.changePercent,
    }));

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  // Calculate derived values from indicators
  const fearGreed = indicators.state === 'bullish' ? 70 : indicators.state === 'bearish' ? 30 : 50;
  const volatility = indicators.riskValue * 0.4; // Approximate volatility from risk
  const momentum = indicators.state === 'bullish' ? 15 : indicators.state === 'bearish' ? -10 : 2;

  return (
    <section className={styles.section} id="demo">
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>LIVE DEMO</span>
          <h2 className={styles.title}>Experience FING</h2>
          <p className={styles.subtitle}>
            Real-time market intelligence, right now
          </p>
        </motion.div>

        {/* Widget */}
        <motion.div
          className={styles.widget}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Widget Header */}
          <div className={styles.widgetHeader}>
            <div className={styles.widgetTitle}>
              <span className={styles.pulse} />
              <span>FING LIVE</span>
            </div>
            <span className={styles.timestamp}>{formatTime(currentTime)}</span>
          </div>

          {/* Widget Content */}
          <div className={styles.widgetContent}>
            {/* Market State Card */}
            <div className={styles.stateCard}>
              <div className={styles.stateHeader}>
                <Activity size={16} />
                <span>Market State</span>
              </div>
              <div className={styles.stateValue}>
                <span
                  className={styles.stateBadge}
                  data-state={indicators.state}
                >
                  {indicators.state.toUpperCase()}
                </span>
              </div>
              <div className={styles.stateMeta}>
                <Zap size={12} />
                <span>Confidence: {indicators.confidencePercent}%</span>
              </div>
            </div>

            {/* Indicators Grid */}
            <div className={styles.indicatorsGrid}>
              <div className={styles.indicatorCard}>
                <span className={styles.indicatorLabel}>Fear & Greed</span>
                <span
                  className={styles.indicatorValue}
                  data-sentiment={
                    fearGreed > 60
                      ? 'greed'
                      : fearGreed < 40
                        ? 'fear'
                        : 'neutral'
                  }
                >
                  {fearGreed}
                </span>
              </div>
              <div className={styles.indicatorCard}>
                <span className={styles.indicatorLabel}>Volatility</span>
                <span
                  className={styles.indicatorValue}
                  data-level={
                    volatility > 30
                      ? 'high'
                      : volatility < 15
                        ? 'low'
                        : 'medium'
                  }
                >
                  {volatility.toFixed(1)}%
                </span>
              </div>
              <div className={styles.indicatorCard}>
                <span className={styles.indicatorLabel}>Momentum</span>
                <span
                  className={styles.indicatorValue}
                  data-direction={momentum > 0 ? 'up' : 'down'}
                >
                  {momentum > 0 ? '+' : ''}
                  {momentum.toFixed(1)}
                </span>
              </div>
              <div className={styles.indicatorCard}>
                <span className={styles.indicatorLabel}>Risk Level</span>
                <span
                  className={styles.indicatorValue}
                  data-risk={
                    indicators.riskValue > 70
                      ? 'high'
                      : indicators.riskValue < 30
                        ? 'low'
                        : 'medium'
                  }
                >
                  {indicators.riskValue}
                </span>
              </div>
            </div>

            {/* Stock Ticker */}
            <div className={styles.tickerSection}>
              <div className={styles.tickerHeader}>
                <BarChart2 size={14} />
                <span>Live Prices</span>
              </div>
              <div className={styles.ticker}>
                {topStocks.map((stock) => (
                  <div key={stock.symbol} className={styles.tickerItem}>
                    <span className={styles.tickerSymbol}>{stock.symbol}</span>
                    <span className={styles.tickerPrice}>
                      ${stock.price.toFixed(2)}
                    </span>
                    <span
                      className={styles.tickerChange}
                      data-direction={stock.change >= 0 ? 'up' : 'down'}
                    >
                      {stock.change >= 0 ? (
                        <TrendingUp size={12} />
                      ) : (
                        <TrendingDown size={12} />
                      )}
                      {stock.change >= 0 ? '+' : ''}
                      {stock.change.toFixed(2)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Widget Footer */}
          <div className={styles.widgetFooter}>
            <span>Data refreshes every second</span>
            <a href="/app" className={styles.ctaLink}>
              Open Full Dashboard →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default LiveDemoWidget;
