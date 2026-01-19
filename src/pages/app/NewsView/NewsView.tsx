// Path: src/pages/app/NewsView/NewsView.tsx

import { useState, useMemo } from 'react';
import {
  RefreshCw,
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Grid,
  List,
  Newspaper,
  Clock,
  ExternalLink,
  Flame,
  Zap,
} from 'lucide-react';
import { NewsCard } from '@/components/molecules/fing/NewsCard';
import { Button } from '@/components/atoms/Button';
import { Dropdown } from '@/components/atoms/Dropdown';
import { useNews } from '@/hooks/useNews';
import { useIsMobile } from '@/hooks/useBreakpoint';
import styles from './NewsView.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type SentimentFilter = 'all' | 'bullish' | 'bearish' | 'neutral';
type ViewMode = 'grid' | 'list';

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function NewsView() {
  const { news, loading, refresh } = useNews({ limit: 8 });
  const [searchQuery, setSearchQuery] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState<SentimentFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isMobile = useIsMobile();

  // Filter news
  const filteredNews = useMemo(() => {
    let filtered = [...news];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tickers.some((t) => t.toLowerCase().includes(query)) ||
          item.source.toLowerCase().includes(query)
      );
    }

    // Sentiment filter
    if (sentimentFilter !== 'all') {
      filtered = filtered.filter((item) => {
        const sentiment = item.sentiment ?? 0;
        switch (sentimentFilter) {
          case 'bullish':
            return sentiment > 0.2;
          case 'bearish':
            return sentiment < -0.2;
          case 'neutral':
            return sentiment >= -0.2 && sentiment <= 0.2;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [news, searchQuery, sentimentFilter]);

  // Stats
  const stats = useMemo(() => {
    const bullish = news.filter((n) => (n.sentiment ?? 0) > 0.2).length;
    const bearish = news.filter((n) => (n.sentiment ?? 0) < -0.2).length;
    const neutral = news.length - bullish - bearish;
    return { total: news.length, bullish, bearish, neutral };
  }, [news]);

  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  };

  // Mobile news - limit to fit screen without scroll
  const mobileNewsLimit = 4;
  const mobileNews = filteredNews.slice(0, mobileNewsLimit);

  // Get sentiment info
  const getSentimentInfo = (sentiment: number) => {
    if (sentiment > 0.2) return { label: 'Bullish', type: 'bullish' as const, icon: TrendingUp };
    if (sentiment < -0.2) return { label: 'Bearish', type: 'bearish' as const, icon: TrendingDown };
    return { label: 'Neutral', type: 'neutral' as const, icon: Minus };
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <div className={styles.mobileContainer}>
        {/* Header with search */}
        <div className={styles.mobileHeader}>
          <div className={styles.mobileSearchBar}>
            <Search size={16} className={styles.mobileSearchIcon} />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.mobileSearchInput}
            />
          </div>
        </div>

        {/* News List */}
        <div className={styles.mobileNewsList}>
          {loading ? (
            <div className={styles.mobileLoading}>
              <RefreshCw size={24} className={styles.spinner} />
            </div>
          ) : mobileNews.length === 0 ? (
            <div className={styles.mobileEmpty}>
              <Newspaper size={32} />
              <span>No news found</span>
            </div>
          ) : (
            mobileNews.map((item, index) => {
              const sentimentInfo = getSentimentInfo(item.sentiment ?? 0);
              const SentimentIcon = sentimentInfo.icon;
              const isHot = index === 0; // First item is "hot"

              return (
                <div key={item.id} className={styles.mobileNewsCard}>
                  {/* Left accent bar based on sentiment */}
                  <div
                    className={styles.mobileNewsAccent}
                    data-sentiment={sentimentInfo.type}
                  />

                  <div className={styles.mobileNewsBody}>
                    {/* Top row: Source + badges */}
                    <div className={styles.mobileNewsTopRow}>
                      <div className={styles.mobileNewsSourceRow}>
                        <span className={styles.mobileNewsSource}>{item.source}</span>
                        {isHot && (
                          <span className={styles.mobileNewsHot}>
                            <Flame size={10} />
                            Hot
                          </span>
                        )}
                      </div>
                      <div
                        className={styles.mobileNewsSentimentBadge}
                        data-sentiment={sentimentInfo.type}
                      >
                        <SentimentIcon size={11} />
                        <span>{sentimentInfo.label}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className={styles.mobileNewsTitle}>{item.title}</h4>

                    {/* Description */}
                    <p className={styles.mobileNewsDesc}>{item.description}</p>

                    {/* Bottom row: Time, tickers, link */}
                    <div className={styles.mobileNewsBottomRow}>
                      <div className={styles.mobileNewsMetaLeft}>
                        <span className={styles.mobileNewsTime}>
                          <Clock size={10} />
                          {item.publishedDate}
                        </span>
                        {item.tickers.length > 0 && (
                          <div className={styles.mobileNewsTickers}>
                            {item.tickers.slice(0, 3).map((ticker) => (
                              <span key={ticker} className={styles.mobileNewsTicker}>
                                <Zap size={8} />
                                {ticker}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button className={styles.mobileNewsLink}>
                        <ExternalLink size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Stats Bar - Bottom */}
        <div className={styles.mobileStatsBar}>
          <div className={styles.mobileStat}>
            <Newspaper size={14} />
            <span className={styles.mobileStatValue}>{stats.total}</span>
            <span className={styles.mobileStatLabel}>News</span>
          </div>
          <div className={styles.mobileStatDivider} />
          <div className={`${styles.mobileStat} ${styles.bullish}`}>
            <TrendingUp size={14} />
            <span className={styles.mobileStatValue}>{stats.bullish}</span>
          </div>
          <div className={`${styles.mobileStat} ${styles.bearish}`}>
            <TrendingDown size={14} />
            <span className={styles.mobileStatValue}>{stats.bearish}</span>
          </div>
          <div className={`${styles.mobileStat} ${styles.neutralStat}`}>
            <Minus size={14} />
            <span className={styles.mobileStatValue}>{stats.neutral}</span>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className={styles.container}>
      {/* Actions Bar */}
      <div className={styles.actionsBar}>
        {/* Stats Card */}
        <div className={styles.statsCard}>
          <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{stats.total}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
          <div className={`${styles.statItem} ${styles.bullish}`}>
            <TrendingUp size={16} />
            <span className={styles.statValue}>{stats.bullish}</span>
            <span className={styles.statLabel}>Bullish</span>
          </div>
          <div className={`${styles.statItem} ${styles.bearish}`}>
            <TrendingDown size={16} />
            <span className={styles.statValue}>{stats.bearish}</span>
            <span className={styles.statLabel}>Bearish</span>
          </div>
          <div className={`${styles.statItem} ${styles.neutral}`}>
            <Minus size={16} />
            <span className={styles.statValue}>{stats.neutral}</span>
            <span className={styles.statLabel}>Neutral</span>
          </div>
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={handleRefresh}
          disabled={isRefreshing || loading}
          icon={<RefreshCw size={16} className={isRefreshing ? styles.spinner : ''} />}
        >
          Refresh
        </Button>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        {/* Search */}
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search news, tickers, sources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <Dropdown
            value={sentimentFilter}
            onChange={(value) => setSentimentFilter(value as SentimentFilter)}
            options={[
              { value: 'all', label: 'All Sentiment' },
              { value: 'bullish', label: 'Bullish' },
              { value: 'bearish', label: 'Bearish' },
              { value: 'neutral', label: 'Neutral' },
            ]}
          />

          {/* View Mode Toggle */}
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <Grid size={16} />
            </button>
            <button
              className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.main}>
        {loading ? (
          <div className={styles.loadingState}>
            <RefreshCw size={32} className={styles.spinner} />
            <p>Loading news...</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className={styles.emptyState}>
            <Newspaper size={48} className={styles.emptyIcon} />
            <h3>No news found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={`${styles.newsGrid} ${styles[viewMode]}`}>
            {filteredNews.map((item) => (
              <NewsCard
                key={item.id}
                {...item}
                compact={viewMode === 'list'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
