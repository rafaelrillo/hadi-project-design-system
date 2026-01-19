// Path: src/components/molecules/fing/TradeModal/TradeModal.tsx

import { useState, useCallback, useMemo } from 'react';
import { X, TrendingUp, TrendingDown, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import styles from './TradeModal.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type TradeType = 'buy' | 'sell';
export type OrderType = 'market' | 'limit';
export type AmountType = 'shares' | 'dollars';

export interface TradeModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Stock ticker symbol */
  ticker: string;
  /** Company name */
  name: string;
  /** Current market price */
  currentPrice: number;
  /** Available cash balance */
  availableCash: number;
  /** Current shares owned (for selling) */
  sharesOwned?: number;
  /** Callback when trade is executed */
  onTrade: (trade: TradeOrder) => Promise<void>;
  /** Initial trade type */
  initialType?: TradeType;
}

export interface TradeOrder {
  ticker: string;
  name: string;
  type: TradeType;
  orderType: OrderType;
  amount: number;
  amountType: AmountType;
  limitPrice?: number;
  estimatedTotal: number;
  estimatedShares: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function TradeModal({
  isOpen,
  onClose,
  ticker,
  name,
  currentPrice,
  availableCash,
  sharesOwned = 0,
  onTrade,
  initialType = 'buy',
}: TradeModalProps) {
  const [tradeType, setTradeType] = useState<TradeType>(initialType);
  const [orderType, setOrderType] = useState<OrderType>('market');
  const [amountType, setAmountType] = useState<AmountType>('dollars');
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate estimated values
  const estimates = useMemo(() => {
    const amountNum = parseFloat(amount) || 0;
    const price = orderType === 'limit' ? (parseFloat(limitPrice) || currentPrice) : currentPrice;

    if (amountType === 'dollars') {
      const shares = amountNum / price;
      return {
        shares: Math.floor(shares * 10000) / 10000, // 4 decimal places
        total: amountNum,
      };
    } else {
      const total = amountNum * price;
      return {
        shares: amountNum,
        total: Math.round(total * 100) / 100,
      };
    }
  }, [amount, amountType, orderType, limitPrice, currentPrice]);

  // Validation
  const validation = useMemo(() => {
    const { shares, total } = estimates;

    if (!amount || parseFloat(amount) <= 0) {
      return { valid: false, message: 'Enter an amount' };
    }

    if (orderType === 'limit' && (!limitPrice || parseFloat(limitPrice) <= 0)) {
      return { valid: false, message: 'Enter a limit price' };
    }

    if (tradeType === 'buy') {
      if (total > availableCash) {
        return { valid: false, message: `Insufficient funds. Available: $${availableCash.toFixed(2)}` };
      }
    } else {
      if (shares > sharesOwned) {
        return { valid: false, message: `Insufficient shares. Owned: ${sharesOwned}` };
      }
    }

    return { valid: true, message: null };
  }, [estimates, amount, orderType, limitPrice, tradeType, availableCash, sharesOwned]);

  // Quick amount buttons
  const quickAmounts = useMemo(() => {
    if (tradeType === 'buy') {
      return [
        { label: '25%', value: availableCash * 0.25 },
        { label: '50%', value: availableCash * 0.50 },
        { label: '75%', value: availableCash * 0.75 },
        { label: 'Max', value: availableCash },
      ];
    } else {
      const maxValue = amountType === 'shares' ? sharesOwned : sharesOwned * currentPrice;
      return [
        { label: '25%', value: maxValue * 0.25 },
        { label: '50%', value: maxValue * 0.50 },
        { label: '75%', value: maxValue * 0.75 },
        { label: 'All', value: maxValue },
      ];
    }
  }, [tradeType, availableCash, sharesOwned, amountType, currentPrice]);

  // Handle trade submission
  const handleSubmit = useCallback(async () => {
    if (!validation.valid) return;

    setLoading(true);
    setError(null);

    try {
      const order: TradeOrder = {
        ticker,
        name,
        type: tradeType,
        orderType,
        amount: parseFloat(amount),
        amountType,
        limitPrice: orderType === 'limit' ? parseFloat(limitPrice) : undefined,
        estimatedTotal: estimates.total,
        estimatedShares: estimates.shares,
      };

      await onTrade(order);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Trade failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [validation.valid, ticker, name, tradeType, orderType, amount, amountType, limitPrice, estimates, onTrade, onClose]);

  // Handle quick amount click
  const handleQuickAmount = (value: number) => {
    if (amountType === 'dollars') {
      setAmount(value.toFixed(2));
    } else {
      setAmount(Math.floor(value).toString());
    }
  };

  // Reset on type change
  const handleTypeChange = (type: TradeType) => {
    setTradeType(type);
    setAmount('');
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerInfo}>
            <span className={styles.ticker}>{ticker}</span>
            <span className={styles.name}>{name}</span>
          </div>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        {/* Price Info */}
        <div className={styles.priceInfo}>
          <span className={styles.priceLabel}>Current Price</span>
          <span className={styles.price}>${currentPrice.toFixed(2)}</span>
        </div>

        {/* Trade Type Tabs */}
        <div className={styles.typeTabs}>
          <button
            className={`${styles.typeTab} ${tradeType === 'buy' ? styles.buyActive : ''}`}
            onClick={() => handleTypeChange('buy')}
          >
            <TrendingUp size={16} />
            Buy
          </button>
          <button
            className={`${styles.typeTab} ${tradeType === 'sell' ? styles.sellActive : ''}`}
            onClick={() => handleTypeChange('sell')}
            disabled={sharesOwned === 0}
          >
            <TrendingDown size={16} />
            Sell
          </button>
        </div>

        {/* Order Type */}
        <div className={styles.section}>
          <label className={styles.label}>Order Type</label>
          <div className={styles.orderTypeButtons}>
            <button
              className={`${styles.orderTypeBtn} ${orderType === 'market' ? styles.active : ''}`}
              onClick={() => setOrderType('market')}
            >
              Market
            </button>
            <button
              className={`${styles.orderTypeBtn} ${orderType === 'limit' ? styles.active : ''}`}
              onClick={() => setOrderType('limit')}
            >
              Limit
            </button>
          </div>
        </div>

        {/* Limit Price (if limit order) */}
        {orderType === 'limit' && (
          <div className={styles.section}>
            <label className={styles.label}>Limit Price</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputPrefix}>$</span>
              <input
                type="number"
                className={styles.input}
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                placeholder={currentPrice.toFixed(2)}
                min="0.01"
                step="0.01"
              />
            </div>
          </div>
        )}

        {/* Amount Type Toggle */}
        <div className={styles.section}>
          <label className={styles.label}>Amount In</label>
          <div className={styles.amountTypeButtons}>
            <button
              className={`${styles.amountTypeBtn} ${amountType === 'dollars' ? styles.active : ''}`}
              onClick={() => {
                setAmountType('dollars');
                setAmount('');
              }}
            >
              Dollars
            </button>
            <button
              className={`${styles.amountTypeBtn} ${amountType === 'shares' ? styles.active : ''}`}
              onClick={() => {
                setAmountType('shares');
                setAmount('');
              }}
            >
              Shares
            </button>
          </div>
        </div>

        {/* Amount Input */}
        <div className={styles.section}>
          <label className={styles.label}>
            {amountType === 'dollars' ? 'Amount ($)' : 'Shares'}
          </label>
          <div className={styles.inputWrapper}>
            {amountType === 'dollars' && <span className={styles.inputPrefix}>$</span>}
            <input
              type="number"
              className={styles.input}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              min="0"
              step={amountType === 'dollars' ? '0.01' : '1'}
            />
          </div>

          {/* Quick Amount Buttons */}
          <div className={styles.quickAmounts}>
            {quickAmounts.map(({ label, value }) => (
              <button
                key={label}
                className={styles.quickAmountBtn}
                onClick={() => handleQuickAmount(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Estimates */}
        <div className={styles.estimates}>
          <div className={styles.estimateRow}>
            <span className={styles.estimateLabel}>Est. Shares</span>
            <span className={styles.estimateValue}>{estimates.shares.toFixed(4)}</span>
          </div>
          <div className={styles.estimateRow}>
            <span className={styles.estimateLabel}>Est. Total</span>
            <span className={styles.estimateValue}>${estimates.total.toFixed(2)}</span>
          </div>
          {tradeType === 'buy' && (
            <div className={styles.estimateRow}>
              <span className={styles.estimateLabel}>Available</span>
              <span className={styles.estimateValue}>${availableCash.toFixed(2)}</span>
            </div>
          )}
          {tradeType === 'sell' && sharesOwned > 0 && (
            <div className={styles.estimateRow}>
              <span className={styles.estimateLabel}>Shares Owned</span>
              <span className={styles.estimateValue}>{sharesOwned}</span>
            </div>
          )}
        </div>

        {/* Error Message */}
        {(error || !validation.valid) && (
          <div className={styles.error}>
            <AlertCircle size={16} />
            <span>{error || validation.message}</span>
          </div>
        )}

        {/* Submit Button */}
        <Button
          variant={tradeType === 'buy' ? 'primary' : 'destructive'}
          onClick={handleSubmit}
          disabled={!validation.valid || loading}
          className={styles.submitButton}
        >
          {loading ? (
            <>
              <Loader2 size={16} className={styles.spinner} />
              Processing...
            </>
          ) : (
            <>
              {tradeType === 'buy' ? 'Buy' : 'Sell'} {ticker}
            </>
          )}
        </Button>

        {/* Disclaimer */}
        <p className={styles.disclaimer}>
          Paper trading only. No real money involved.
        </p>
      </div>
    </div>
  );
}
