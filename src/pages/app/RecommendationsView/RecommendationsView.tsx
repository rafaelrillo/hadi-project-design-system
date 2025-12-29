// Path: src/pages/app/RecommendationsView/RecommendationsView.tsx

import { useState, useEffect, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  RefreshCw,
  Filter,
  ChevronDown,
  ChevronUp,
  Target,
  Shield,
  Zap,
} from 'lucide-react';
import { NewsCard } from '@/components/molecules/sentinel/NewsCard';
import { Button } from '@/components/atoms/Button';
import { recommendationEngine } from '@/services/recommendations';
import { useNews } from '@/hooks/useNews';
import type {
  DailyRecommendations,
  StockRecommendation,
} from '@/services/recommendations';
import styles from './RecommendationsView.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function RecommendationsView() {
  const [recommendations, setRecommendations] = useState<DailyRecommendations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');

  // Fetch news from Tiingo (with mock fallback)
  const { news, loading: newsLoading } = useNews({
    limit: 6,
    autoRefresh: true,
    refreshInterval: 300000, // 5 minutes
  });

  // Fetch recommendations
  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await recommendationEngine.getDailyRecommendations();
      setRecommendations(data);
    } catch (err) {
      setError('Failed to load recommendations. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  // Get market state styling
  const marketStateInfo = useMemo(() => {
    const defaultState = { icon: Target, className: 'neutral' as const };
    if (!recommendations) return defaultState;

    const { state } = recommendations.marketSummary;
    const stateMap: Record<string, { icon: typeof TrendingUp; className: 'positive' | 'negative' | 'neutral' | 'warning' }> = {
      bullish: { icon: TrendingUp, className: 'positive' },
      bearish: { icon: TrendingDown, className: 'negative' },
      neutral: { icon: Target, className: 'neutral' },
      volatile: { icon: Zap, className: 'warning' },
    };
    return stateMap[state] || defaultState;
  }, [recommendations]);

  const MarketIcon = marketStateInfo.icon;

  // Toggle card expansion
  const toggleCard = (ticker: string) => {
    setExpandedCard(expandedCard === ticker ? null : ticker);
  };

  // Render recommendation card
  const renderRecommendationCard = (rec: StockRecommendation) => {
    const isExpanded = expandedCard === rec.ticker;
    const isBuy = rec.action === 'buy';
    const isPositive = rec.priceChangePercent >= 0;

    return (
      <div
        key={rec.ticker}
        className={`${styles.recCard} ${isBuy ? styles.buyCard : styles.sellCard}`}
      >
        {/* Card Header */}
        <div className={styles.cardHeader} onClick={() => toggleCard(rec.ticker)}>
          <div className={styles.cardLeft}>
            <div className={styles.tickerInfo}>
              <span className={styles.ticker}>{rec.ticker}</span>
              <span className={styles.exchange}>{rec.exchange}</span>
            </div>
            <span className={styles.companyName}>{rec.name}</span>
          </div>

          <div className={styles.cardCenter}>
            <span className={styles.price}>${rec.currentPrice.toFixed(2)}</span>
            <span className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
              {isPositive ? '+' : ''}{rec.priceChangePercent.toFixed(2)}%
            </span>
          </div>

          <div className={styles.cardRight}>
            <div className={styles.scoreWrapper}>
              <span className={styles.scoreLabel}>Score</span>
              <span className={`${styles.score} ${isBuy ? styles.buyScore : styles.sellScore}`}>
                {rec.score}
              </span>
            </div>
            <span className={`${styles.confidence} ${styles[rec.confidence]}`}>
              {rec.confidence}
            </span>
          </div>

          <button className={styles.expandButton} aria-label={isExpanded ? 'Collapse' : 'Expand'}>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className={styles.cardExpanded}>
            {/* Price Target */}
            {rec.priceTarget && (
              <div className={styles.priceTarget}>
                <div className={styles.targetRow}>
                  <Target size={16} />
                  <span className={styles.targetLabel}>Price Target</span>
                  <span className={styles.targetValue}>
                    ${rec.priceTarget.price.toFixed(2)}
                    <span className={isBuy ? styles.positive : styles.negative}>
                      ({isBuy ? '+' : ''}{rec.priceTarget.expectedReturn.toFixed(1)}%)
                    </span>
                  </span>
                </div>
                {rec.priceTarget.stopLoss && (
                  <div className={styles.targetRow}>
                    <Shield size={16} />
                    <span className={styles.targetLabel}>Stop Loss</span>
                    <span className={styles.targetValue}>
                      ${rec.priceTarget.stopLoss.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Rationale */}
            <div className={styles.rationale}>
              <h4 className={styles.rationaleTitle}>Analysis</h4>
              <p className={styles.rationaleText}>{rec.rationale}</p>
            </div>

            {/* Factors */}
            <div className={styles.factors}>
              <h4 className={styles.factorsTitle}>Contributing Factors</h4>
              <div className={styles.factorsList}>
                {rec.factors.map((factor) => (
                  <div
                    key={factor.name}
                    className={`${styles.factorItem} ${factor.signal > 0 ? styles.factorPositive : factor.signal < 0 ? styles.factorNegative : styles.factorNeutral}`}
                  >
                    <span className={styles.factorName}>{factor.name}</span>
                    <div className={styles.factorBar}>
                      <div
                        className={styles.factorFill}
                        style={{ width: `${Math.abs(factor.signal) * 100}%` }}
                      />
                    </div>
                    <span className={styles.factorSignal}>
                      {factor.signal > 0 ? '+' : ''}{(factor.signal * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className={styles.cardActions}>
              <Button variant={isBuy ? 'primary' : 'destructive'}>
                {isBuy ? 'Add to Watchlist' : 'View Details'}
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <RefreshCw size={32} className={styles.spinner} />
          <p>Loading recommendations...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !recommendations) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <AlertCircle size={32} />
          <p>{error || 'Something went wrong'}</p>
          <Button variant="secondary" onClick={fetchRecommendations}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerTitle}>
            <TrendingUp size={24} className={styles.headerIcon} />
            <div>
              <h1 className={styles.title}>Daily Recommendations</h1>
              <p className={styles.subtitle}>
                Generated {new Date(recommendations.generatedAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            onClick={fetchRecommendations}
            icon={<RefreshCw size={16} />}
          >
            Refresh
          </Button>
        </div>

        {/* Market Summary */}
        <div className={styles.marketSummary}>
          <div className={`${styles.marketState} ${styles[marketStateInfo.className]}`}>
            <MarketIcon size={20} />
            <span className={styles.marketLabel}>
              Market: <strong>{recommendations.marketSummary.state}</strong>
            </span>
          </div>
          <div className={styles.riskLevel}>
            <span className={styles.riskLabel}>Risk Level</span>
            <div className={styles.riskBar}>
              <div
                className={styles.riskFill}
                style={{ width: `${recommendations.marketSummary.riskLevel}%` }}
              />
            </div>
            <span className={styles.riskValue}>{recommendations.marketSummary.riskLevel}%</span>
          </div>
        </div>

        <p className={styles.marketDescription}>
          {recommendations.marketSummary.description}
        </p>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Recommendations Section */}
        <section className={styles.recommendationsSection}>
          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'buy' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('buy')}
            >
              <TrendingUp size={16} />
              Top 5 Buys
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'sell' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('sell')}
            >
              <TrendingDown size={16} />
              Top 5 Sells
            </button>
          </div>

          {/* Recommendation Cards */}
          <div className={styles.recList}>
            {activeTab === 'buy'
              ? recommendations.topBuys.map(renderRecommendationCard)
              : recommendations.topSells.map(renderRecommendationCard)}
          </div>
        </section>

        {/* News Section */}
        <section className={styles.newsSection}>
          <div className={styles.newsSectionHeader}>
            <h2 className={styles.sectionTitle}>Related News</h2>
            <button className={styles.filterButton}>
              <Filter size={16} />
              Filter
            </button>
          </div>
          <div className={styles.newsList}>
            {newsLoading ? (
              <div className={styles.loadingState}>
                <RefreshCw size={20} className={styles.spinner} />
                <p>Loading news...</p>
              </div>
            ) : news.length > 0 ? (
              news.map((item) => (
                <NewsCard
                  key={item.id}
                  {...item}
                  compact
                />
              ))
            ) : (
              <p className={styles.noNews}>No news available</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
