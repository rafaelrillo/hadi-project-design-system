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
  Shield,
  Zap,
} from 'lucide-react';
import { NewsCard } from '@/components/molecules/sentinel/NewsCard';
import { Button } from '@/components/atoms/Button';
import { AddToPortfolioModal, StockToAdd } from '@/components/organisms/AddToPortfolioModal';
import { recommendationEngine } from '@/services/recommendations';
import type {
  DailyRecommendations,
  StockRecommendation,
} from '@/services/recommendations';
import styles from './RecommendationsView.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// MOCK NEWS PER TICKER
// ─────────────────────────────────────────────────────────────────────────────

interface MockNewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  publishedDate: string;
  url: string;
  tickers: string[];
  tags: string[];
  sentiment: number;
}

const NEWS_TEMPLATES = [
  {
    title: '{company} Reports Strong Quarterly Earnings, Beats Estimates',
    description: '{company} announced quarterly results that exceeded analyst expectations, with revenue growth driven by strong demand across key segments.',
    source: 'Bloomberg',
    tags: ['Earnings', 'Financial Results'],
    sentiment: 0.6,
  },
  {
    title: 'Analysts Upgrade {ticker} Following Product Launch Announcement',
    description: 'Multiple Wall Street analysts have raised their price targets for {company} after the company unveiled new products expected to drive future growth.',
    source: 'Reuters',
    tags: ['Analyst Ratings', 'Product Launch'],
    sentiment: 0.5,
  },
  {
    title: '{company} Expands Market Share in Key Growth Sectors',
    description: 'Recent market data shows {company} gaining significant market share, positioning the company well for continued growth in the coming quarters.',
    source: 'Financial Times',
    tags: ['Market Analysis', 'Growth'],
    sentiment: 0.4,
  },
];

function generateMockNewsForTicker(ticker: string, companyName: string): MockNewsItem[] {
  return NEWS_TEMPLATES.map((template, index) => ({
    id: `${ticker}-news-${index}`,
    title: template.title.replace('{company}', companyName).replace('{ticker}', ticker),
    description: template.description.replace('{company}', companyName).replace('{ticker}', ticker),
    source: template.source,
    publishedDate: new Date(Date.now() - (index + 1) * 3 * 60 * 60 * 1000).toISOString(),
    url: '#',
    tickers: [ticker],
    tags: template.tags,
    sentiment: template.sentiment,
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function RecommendationsView() {
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

    // Generate mock news for this ticker
    const tickerNews = generateMockNewsForTicker(rec.ticker, rec.name);

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
              <Button
                variant={isBuy ? 'primary' : 'destructive'}
                onClick={() => handleAddToPortfolio(rec)}
              >
                {isBuy ? 'Add to Portfolio' : 'View Details'}
              </Button>
            </div>

            {/* Related News for this ticker */}
            <div className={styles.cardNews}>
              <h4 className={styles.cardNewsTitle}>Related News</h4>
              <div className={styles.cardNewsList}>
                {tickerNews.map((item) => (
                  <NewsCard key={item.id} {...item} compact />
                ))}
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
