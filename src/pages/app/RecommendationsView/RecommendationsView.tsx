// Path: src/pages/app/RecommendationsView/RecommendationsView.tsx

import { useState, useEffect, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Target,
  Zap,
  Crosshair,
  Percent,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { AddToPortfolioModal, StockToAdd } from '@/components/organisms/AddToPortfolioModal';
import { recommendationEngine } from '@/services/recommendations';
import { useIsMobile } from '@/hooks/useBreakpoint';
import type {
  DailyRecommendations,
  StockRecommendation,
} from '@/services/recommendations';
import styles from './RecommendationsView.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function RecommendationsView() {
  const isMobile = useIsMobile();
  const [recommendations, setRecommendations] = useState<DailyRecommendations | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockToAdd | null>(null);

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

  // Open add to portfolio modal
  const handleAddToPortfolio = (rec: StockRecommendation) => {
    setSelectedStock({
      ticker: rec.ticker,
      name: rec.name,
      currentPrice: rec.currentPrice,
      score: rec.score,
      expectedReturn: rec.priceTarget?.expectedReturn ?? 15,
    });
    setIsModalOpen(true);
  };

  // Handle portfolio investment confirmation
  const handleConfirmInvestment = (portfolioId: string, amount: number) => {
    console.log(`Adding ${selectedStock?.ticker} to portfolio ${portfolioId} with $${amount}`);
    // Here you would call your API to add the stock to the portfolio
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
            {/* Left: Info | Right: Action */}
            <div className={styles.expandedLayout}>
              {/* Left Column - Info */}
              <div className={styles.expandedInfo}>
                {/* Metrics Row */}
                <div className={styles.metricsRow}>
                  {rec.priceTarget && (
                    <>
                      <div className={styles.metric}>
                        <span className={styles.metricLabel}>Target Price</span>
                        <span className={styles.metricValue}>${rec.priceTarget.price.toFixed(2)}</span>
                      </div>
                      <div className={styles.metric}>
                        <span className={styles.metricLabel}>Expected Return</span>
                        <span className={`${styles.metricValue} ${isBuy ? styles.positive : styles.negative}`}>
                          {isBuy ? '+' : ''}{rec.priceTarget.expectedReturn.toFixed(1)}%
                        </span>
                      </div>
                      {rec.priceTarget.stopLoss && (
                        <div className={styles.metric}>
                          <span className={styles.metricLabel}>Stop Loss</span>
                          <span className={styles.metricValue}>${rec.priceTarget.stopLoss.toFixed(2)}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Rationale */}
                <p className={styles.rationaleText}>{rec.rationale}</p>

                {/* Signals */}
                <div className={styles.signalsList}>
                  {rec.factors.slice(0, 3).map((factor) => (
                    <div key={factor.name} className={styles.signalItem}>
                      <span className={styles.signalName}>{factor.name}</span>
                      <span className={`${styles.signalValue} ${factor.signal > 0 ? styles.positive : styles.negative}`}>
                        {factor.signal > 0 ? '+' : ''}{(factor.signal * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Action */}
              <div className={styles.expandedAction} onClick={(e) => e.stopPropagation()}>
                <Button
                  variant={isBuy ? 'primary' : 'destructive'}
                  onClick={() => handleAddToPortfolio(rec)}
                >
                  {isBuy ? 'Add to Portfolio' : 'View Details'}
                </Button>
              </div>
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

  // Mobile Layout
  if (isMobile) {
    return (
      <div className={styles.mobileContainer}>
        {/* Tabs */}
        <div className={styles.mobileTabs}>
          <button
            className={`${styles.mobileTab} ${activeTab === 'buy' ? styles.mobileTabActive : ''}`}
            onClick={() => setActiveTab('buy')}
          >
            <TrendingUp size={14} />
            Top Buys
          </button>
          <button
            className={`${styles.mobileTab} ${activeTab === 'sell' ? styles.mobileTabActive : ''}`}
            onClick={() => setActiveTab('sell')}
          >
            <TrendingDown size={14} />
            Top Sells
          </button>
        </div>

        {/* Recommendation Cards - Accordion */}
        <div className={styles.mobileRecList}>
          {(activeTab === 'buy' ? recommendations.topBuys : recommendations.topSells).map((rec) => {
            const isExpanded = expandedCard === rec.ticker;
            const isBuy = rec.action === 'buy';
            const isPositive = rec.priceChangePercent >= 0;

            return (
              <div
                key={rec.ticker}
                className={`${styles.mobileRecCard} ${isBuy ? styles.mobileRecCardBuy : styles.mobileRecCardSell} ${isExpanded ? styles.mobileRecCardExpanded : ''}`}
              >
                {/* Card Header - Always visible */}
                <div className={styles.mobileRecRow} onClick={() => toggleCard(rec.ticker)}>
                  <div className={styles.mobileRecInfo}>
                    <span className={styles.mobileRecTicker}>{rec.ticker}</span>
                    <span className={styles.mobileRecName}>{rec.name}</span>
                  </div>
                  <div className={styles.mobileRecPrice}>
                    <span className={styles.mobileRecPriceValue}>${rec.currentPrice.toFixed(2)}</span>
                    <span className={`${styles.mobileRecChange} ${isPositive ? styles.positive : styles.negative}`}>
                      {isPositive ? '+' : ''}{rec.priceChangePercent.toFixed(2)}%
                    </span>
                  </div>
                  <div className={styles.mobileRecScore}>
                    <span className={`${styles.mobileRecScoreValue} ${isBuy ? styles.buyScore : styles.sellScore}`}>
                      {rec.score}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`${styles.mobileRecChevron} ${isExpanded ? styles.mobileRecChevronOpen : ''}`}
                  />
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className={styles.mobileRecExpanded}>
                    {/* Metrics Row */}
                    {rec.priceTarget && (
                      <div className={styles.mobileRecMetrics}>
                        <div className={styles.mobileRecMetric}>
                          <div className={styles.mobileRecMetricHeader}>
                            <Crosshair size={12} className={styles.mobileRecMetricIcon} />
                            <span className={styles.mobileRecMetricLabel}>Target</span>
                          </div>
                          <span className={styles.mobileRecMetricValue}>${rec.priceTarget.price.toFixed(2)}</span>
                        </div>
                        <div className={styles.mobileRecMetric}>
                          <div className={styles.mobileRecMetricHeader}>
                            <Percent size={12} className={`${styles.mobileRecMetricIcon} ${isBuy ? styles.positive : styles.negative}`} />
                            <span className={styles.mobileRecMetricLabel}>Return</span>
                          </div>
                          <span className={`${styles.mobileRecMetricValue} ${isBuy ? styles.positive : styles.negative}`}>
                            {isBuy ? '+' : ''}{rec.priceTarget.expectedReturn.toFixed(1)}%
                          </span>
                        </div>
                        {rec.priceTarget.stopLoss && (
                          <div className={styles.mobileRecMetric}>
                            <div className={styles.mobileRecMetricHeader}>
                              <ShieldAlert size={12} className={styles.mobileRecMetricIconWarning} />
                              <span className={styles.mobileRecMetricLabel}>Stop</span>
                            </div>
                            <span className={styles.mobileRecMetricValue}>${rec.priceTarget.stopLoss.toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      variant={isBuy ? 'primary' : 'destructive'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToPortfolio(rec);
                      }}
                      className={styles.mobileRecButton}
                    >
                      {isBuy ? 'Add to Portfolio' : 'Sell'}
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Market Summary - Bottom */}
        <div className={styles.mobileMarketCard}>
          <div className={styles.mobileMarketRow}>
            <div className={`${styles.mobileMarketState} ${styles[marketStateInfo.className]}`}>
              <MarketIcon size={14} />
              <span>{recommendations.marketSummary.state}</span>
            </div>
            <div className={styles.mobileMarketRisk}>
              <span className={styles.mobileMarketRiskLabel}>Risk</span>
              <div className={styles.mobileMarketRiskBar}>
                <div
                  className={styles.mobileMarketRiskFill}
                  data-risk-level={
                    recommendations.marketSummary.riskLevel < 35 ? 'low' :
                    recommendations.marketSummary.riskLevel < 65 ? 'medium' : 'high'
                  }
                  style={{ width: `${recommendations.marketSummary.riskLevel}%` }}
                />
              </div>
              <span className={styles.mobileMarketRiskValue}>{recommendations.marketSummary.riskLevel}%</span>
            </div>
          </div>
        </div>

        {/* Add to Portfolio Modal */}
        <AddToPortfolioModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          stock={selectedStock}
          onConfirm={handleConfirmInvestment}
        />
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className={styles.container}>
      {/* Actions Bar */}
      <div className={styles.actionsBar}>
        <span className={styles.generatedTime}>
          Generated {new Date(recommendations.generatedAt).toLocaleTimeString()}
        </span>
        <Button
          variant="secondary"
          onClick={fetchRecommendations}
          icon={<RefreshCw size={16} />}
        >
          Refresh
        </Button>
      </div>

      {/* Market Summary */}
      <div className={styles.marketSummaryCard}>
        <div className={styles.marketSummaryTop}>
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
      </div>

      {/* Main Content */}
      <div className={styles.main}>
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
      </div>

      {/* Add to Portfolio Modal */}
      <AddToPortfolioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stock={selectedStock}
        onConfirm={handleConfirmInvestment}
      />
    </div>
  );
}
