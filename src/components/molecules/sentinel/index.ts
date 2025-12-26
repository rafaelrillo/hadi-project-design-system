// Path: src/components/molecules/sentinel/index.ts
// ═══════════════════════════════════════════════════════════════════════════════
// SENTINEL CONTEXT & ACTION COMPONENTS
//
// Level 2 (Context) - "Why is the market this way?"
// Level 3 (Action) - "What should I do?"
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXT COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

// FactorWeight - Shows which factors weigh most in analysis
export { FactorWeight } from './FactorWeight';
export type { FactorWeightProps, Factor } from './FactorWeight';

// TrendIndicator - Simple trend display for metrics
export { TrendIndicator } from './TrendIndicator';
export type { TrendIndicatorProps, TrendDirection } from './TrendIndicator';

// HistoricalAlignment - Compare current state with historical patterns
export { HistoricalAlignment } from './HistoricalAlignment';
export type { HistoricalAlignmentProps, HistoricalPeriod } from './HistoricalAlignment';

// CyclePosition - Economic cycle position indicator
export { CyclePosition } from './CyclePosition';
export type { CyclePositionProps, CyclePhase } from './CyclePosition';

// ─────────────────────────────────────────────────────────────────────────────
// ACTION COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

// RecommendationCard - Primary investment recommendation
export { RecommendationCard } from './RecommendationCard';
export type {
  RecommendationCardProps,
  RecommendationType,
  AssetClass,
  Priority,
} from './RecommendationCard';

// StockSuggestion - Individual stock/asset suggestion
export { StockSuggestion } from './StockSuggestion';
export type { StockSuggestionProps, StockAction } from './StockSuggestion';

// RiskProfileSelector - User risk profile selection
export { RiskProfileSelector } from './RiskProfileSelector';
export type { RiskProfileSelectorProps, RiskProfile } from './RiskProfileSelector';

// AllocationSummary - Portfolio allocation breakdown
export { AllocationSummary } from './AllocationSummary';
export type { AllocationSummaryProps, AllocationItem } from './AllocationSummary';
