// Path: src/components/molecules/sentinel/SelectedStockCard/SelectedStockCard.tsx

import { X, GripVertical } from 'lucide-react';
import styles from './SelectedStockCard.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface SelectedStockCardProps {
  /** Stock ticker symbol */
  ticker: string;
  /** Company name */
  name: string;
  /** Current price */
  price: number;
  /** Callback when remove button is clicked */
  onRemove: () => void;
  /** Whether the card is draggable */
  draggable?: boolean;
  /** Index in the list (for display) */
  index?: number;
  /** Allocation percentage (optional) */
  allocation?: number;
  /** Whether removal is disabled */
  disabled?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function SelectedStockCard({
  ticker,
  name,
  price,
  onRemove,
  draggable = false,
  index,
  allocation,
  disabled = false,
}: SelectedStockCardProps) {
  const containerClasses = [
    styles.container,
    draggable && styles.draggable,
    disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(' ');

  const handleRemove = () => {
    if (!disabled) {
      onRemove();
    }
  };

  return (
    <div className={containerClasses}>
      {/* Drag Handle */}
      {draggable && (
        <div className={styles.dragHandle} aria-hidden="true">
          <GripVertical size={16} />
        </div>
      )}

      {/* Index Badge */}
      {index !== undefined && (
        <span className={styles.index}>{index + 1}</span>
      )}

      {/* Stock Info */}
      <div className={styles.stockInfo}>
        <span className={styles.ticker}>{ticker}</span>
        <span className={styles.name}>{name}</span>
      </div>

      {/* Price & Allocation */}
      <div className={styles.values}>
        <span className={styles.price}>${price.toFixed(2)}</span>
        {allocation !== undefined && (
          <span className={styles.allocation}>{allocation.toFixed(1)}%</span>
        )}
      </div>

      {/* Remove Button */}
      <button
        type="button"
        className={styles.removeButton}
        onClick={handleRemove}
        disabled={disabled}
        aria-label={`Remove ${ticker} from selection`}
      >
        <X size={14} />
      </button>
    </div>
  );
}
