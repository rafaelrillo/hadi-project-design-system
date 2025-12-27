// Path: src/components/organisms/sentinel/HistoricalDetailView/HistoricalDetailView.tsx
import { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import styles from './HistoricalDetailView.module.css';

/* ═══════════════════════════════════════════════════════════════════════════════
   HISTORICAL DETAIL VIEW - Level 4 Depth Component
   Expanded view for deep historical analysis with timeline and metrics
   ═══════════════════════════════════════════════════════════════════════════════ */

export interface HistoricalDataPoint {
  date: string;
  value: number;
  change?: number;
  volume?: number;
  annotation?: string;
}

export interface HistoricalEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  magnitude: 'low' | 'medium' | 'high';
}

export interface HistoricalPeriodDetail {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  similarity: number;
  returnPercentage: number;
  volatility: number;
  duration: string;
  keyEvents: HistoricalEvent[];
  dataPoints?: HistoricalDataPoint[];
}

export interface HistoricalDetailViewProps {
  periods: HistoricalPeriodDetail[];
  currentPeriodLabel?: string;
  title?: string;
  subtitle?: string;
  onPeriodSelect?: (periodId: string) => void;
  selectedPeriodId?: string;
  showTimeline?: boolean;
  showMetrics?: boolean;
  maxEvents?: number;
}

export function HistoricalDetailView({
  periods,
  currentPeriodLabel = 'Current Market Conditions',
  title = 'Historical Analysis',
  subtitle,
  onPeriodSelect,
  selectedPeriodId,
  showTimeline = true,
  showMetrics = true,
  maxEvents = 3,
}: HistoricalDetailViewProps) {
  const [expandedPeriod, setExpandedPeriod] = useState<string | null>(
    selectedPeriodId || (periods.length > 0 ? periods[0].id : null)
  );

  const handlePeriodClick = (periodId: string) => {
    setExpandedPeriod(expandedPeriod === periodId ? null : periodId);
    onPeriodSelect?.(periodId);
  };

  const getImpactIcon = (impact: HistoricalEvent['impact']) => {
    switch (impact) {
      case 'positive':
        return <TrendingUp size={14} />;
      case 'negative':
        return <TrendingDown size={14} />;
      default:
        return <Minus size={14} />;
    }
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  const getSimilarityLevel = (similarity: number): string => {
    if (similarity >= 80) return 'high';
    if (similarity >= 60) return 'medium';
    return 'low';
  };

  return (
    <div className={styles.container} role="region" aria-label={title}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <div className={styles.currentPeriod}>
          <Calendar size={14} />
          <span>{currentPeriodLabel}</span>
        </div>
      </header>

      {/* Periods List */}
      <div className={styles.periodsList}>
        {periods.map((period, index) => {
          const isExpanded = expandedPeriod === period.id;
          const similarityLevel = getSimilarityLevel(period.similarity);

          return (
            <article
              key={period.id}
              className={`${styles.periodCard} ${isExpanded ? styles.expanded : ''}`}
              data-similarity={similarityLevel}
            >
              {/* Period Header - Clickable */}
              <button
                type="button"
                className={styles.periodHeader}
                onClick={() => handlePeriodClick(period.id)}
                aria-expanded={isExpanded}
                aria-controls={`period-content-${period.id}`}
              >
                <div className={styles.periodRank}>
                  <span className={styles.rankNumber}>{index + 1}</span>
                </div>

                <div className={styles.periodInfo}>
                  <h3 className={styles.periodName}>{period.name}</h3>
                  <span className={styles.periodDates}>
                    {period.startDate} — {period.endDate}
                  </span>
                </div>

                <div className={styles.periodMetrics}>
                  <div className={styles.similarityBadge} data-level={similarityLevel}>
                    <span className={styles.similarityValue}>{period.similarity}%</span>
                    <span className={styles.similarityLabel}>match</span>
                  </div>

                  {showMetrics && (
                    <div
                      className={styles.returnBadge}
                      data-positive={period.returnPercentage >= 0}
                    >
                      {formatPercentage(period.returnPercentage)}
                    </div>
                  )}
                </div>

                <span className={styles.expandIcon}>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>

              {/* Expanded Content */}
              <div
                id={`period-content-${period.id}`}
                className={styles.periodContent}
                hidden={!isExpanded}
              >
                {/* Metrics Grid */}
                {showMetrics && (
                  <div className={styles.metricsGrid}>
                    <div className={styles.metricItem}>
                      <span className={styles.metricLabel}>Duration</span>
                      <span className={styles.metricValue}>{period.duration}</span>
                    </div>
                    <div className={styles.metricItem}>
                      <span className={styles.metricLabel}>Return</span>
                      <span
                        className={styles.metricValue}
                        data-positive={period.returnPercentage >= 0}
                      >
                        {formatPercentage(period.returnPercentage)}
                      </span>
                    </div>
                    <div className={styles.metricItem}>
                      <span className={styles.metricLabel}>Volatility</span>
                      <span className={styles.metricValue}>{period.volatility.toFixed(1)}%</span>
                    </div>
                    <div className={styles.metricItem}>
                      <span className={styles.metricLabel}>Pattern Match</span>
                      <span className={styles.metricValue}>{period.similarity}%</span>
                    </div>
                  </div>
                )}

                {/* Timeline */}
                {showTimeline && period.keyEvents.length > 0 && (
                  <div className={styles.timeline}>
                    <h4 className={styles.timelineTitle}>Key Events</h4>
                    <div className={styles.timelineList}>
                      {period.keyEvents.slice(0, maxEvents).map((event) => (
                        <div
                          key={event.id}
                          className={styles.timelineEvent}
                          data-impact={event.impact}
                          data-magnitude={event.magnitude}
                        >
                          <div className={styles.eventMarker}>
                            {getImpactIcon(event.impact)}
                          </div>
                          <div className={styles.eventContent}>
                            <div className={styles.eventHeader}>
                              <span className={styles.eventDate}>{event.date}</span>
                              <span className={styles.eventMagnitude}>{event.magnitude}</span>
                            </div>
                            <h5 className={styles.eventTitle}>{event.title}</h5>
                            <p className={styles.eventDescription}>{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Footer Note */}
      <footer className={styles.footer}>
        <p className={styles.disclaimer}>
          Pattern matching based on price action, volume, and macroeconomic indicators.
          Past performance does not guarantee future results.
        </p>
      </footer>
    </div>
  );
}

export default HistoricalDetailView;
