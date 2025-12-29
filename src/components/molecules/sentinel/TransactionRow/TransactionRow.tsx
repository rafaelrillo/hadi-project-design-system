// Path: src/components/molecules/sentinel/TransactionRow/TransactionRow.tsx

import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import styles from './TransactionRow.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type TransactionType = 'buy' | 'sell';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface TransactionRowProps {
  /** Transaction ID */
  id: string;
  /** Transaction type */
  type: TransactionType;
  /** Stock ticker symbol */
  ticker: string;
  /** Company name */
  name: string;
  /** Number of shares */
  shares: number;
  /** Price per share */
  price: number;
  /** Total transaction value */
  total: number;
  /** Transaction status */
  status: TransactionStatus;
  /** Transaction timestamp */
  timestamp: string | Date;
  /** Transaction fee (if any) */
  fee?: number;
  /** Callback when row is clicked */
  onClick?: () => void;
  /** Show compact version */
  compact?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function TransactionRow({
  type,
  ticker,
  name,
  shares,
  price,
  total,
  status,
  timestamp,
  fee,
  onClick,
  compact = false,
}: TransactionRowProps) {
  const isBuy = type === 'buy';

  const StatusIcon = {
    pending: Clock,
    completed: CheckCircle,
    failed: XCircle,
    cancelled: AlertCircle,
  }[status];

  const containerClasses = [
    styles.container,
    compact && styles.compact,
    onClick && styles.clickable,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses} onClick={onClick}>
      {/* Type Icon */}
      <div className={`${styles.typeIcon} ${isBuy ? styles.buy : styles.sell}`}>
        {isBuy ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
      </div>

      {/* Transaction Info */}
      <div className={styles.transactionInfo}>
        <div className={styles.mainInfo}>
          <span className={styles.typeLabel}>{isBuy ? 'Bought' : 'Sold'}</span>
          <span className={styles.ticker}>{ticker}</span>
        </div>
        <span className={styles.name}>{name}</span>
      </div>

      {/* Shares & Price */}
      {!compact && (
        <div className={styles.details}>
          <span className={styles.shares}>{shares} shares</span>
          <span className={styles.price}>@ ${price.toFixed(2)}</span>
        </div>
      )}

      {/* Total */}
      <div className={styles.totalInfo}>
        <span className={`${styles.total} ${isBuy ? styles.negative : styles.positive}`}>
          {isBuy ? '-' : '+'}${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        {fee !== undefined && fee > 0 && (
          <span className={styles.fee}>Fee: ${fee.toFixed(2)}</span>
        )}
      </div>

      {/* Status */}
      <div className={`${styles.status} ${styles[status]}`}>
        <StatusIcon size={14} />
        <span className={styles.statusLabel}>{status}</span>
      </div>

      {/* Timestamp */}
      <div className={styles.timestamp}>
        <span className={styles.date}>{formatDate(timestamp)}</span>
        <span className={styles.time}>{formatTime(timestamp)}</span>
      </div>
    </div>
  );
}
