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
} from 'lucide-react';
import { NewsCard } from '@/components/molecules/sentinel/NewsCard';
import { Button } from '@/components/atoms/Button';
import { Dropdown } from '@/components/atoms/Dropdown';
import { useNews } from '@/hooks/useNews';
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
