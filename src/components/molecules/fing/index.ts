// Path: src/components/molecules/fing/index.ts
// ═══════════════════════════════════════════════════════════════════════════════
// FING CONTEXT & ACTION COMPONENTS
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

// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO BUILDER COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

// StockSearchResult - Search result item with add action
export { StockSearchResult } from './StockSearchResult';
export type { StockSearchResultProps } from './StockSearchResult';

// SelectedStockCard - Card for selected stocks with remove action
export { SelectedStockCard } from './SelectedStockCard';
export type { SelectedStockCardProps } from './SelectedStockCard';

// AllocationSlider - Slider for allocation percentage
export { AllocationSlider } from './AllocationSlider';
export type { AllocationSliderProps } from './AllocationSlider';

// Stepper - Multi-step progress indicator
export { Stepper } from './Stepper';
export type { StepperProps, Step } from './Stepper';

// NewsCard - News article card with sentiment
export { NewsCard } from './NewsCard';
export type { NewsCardProps } from './NewsCard';

// TradeModal - Modal for executing trades
export { TradeModal } from './TradeModal';
export type { TradeModalProps, TradeOrder, TradeType, OrderType, AmountType } from './TradeModal';

// PositionRow - Portfolio position row
export { PositionRow } from './PositionRow';
export type { PositionRowProps } from './PositionRow';

// TransactionRow - Transaction history row
export { TransactionRow } from './TransactionRow';
export type { TransactionRowProps, TransactionType, TransactionStatus } from './TransactionRow';

// DateRangePicker - Date range selection component
export { DateRangePicker } from './DateRangePicker';
export type { DateRangePickerProps, DateRange, DatePreset } from './DateRangePicker';

// ═══════════════════════════════════════════════════════════════════════════════
// FING 3.0 - STOCK MARKET MOLECULES
// ═══════════════════════════════════════════════════════════════════════════════

// PriceDisplay - Value with change indicator and flash effect
export { PriceDisplay } from './PriceDisplay';
export type { PriceDisplayProps } from './PriceDisplay';
