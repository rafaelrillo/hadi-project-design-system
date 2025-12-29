// Path: src/pages/app/WalletView/WalletView.tsx

import { useState, useEffect, useCallback } from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  History,
  Plus,
  RefreshCw,
  Search,
} from 'lucide-react';
import { PositionRow } from '@/components/molecules/sentinel/PositionRow';
import { TransactionRow } from '@/components/molecules/sentinel/TransactionRow';
import { TradeModal } from '@/components/molecules/sentinel/TradeModal';
import { Button } from '@/components/atoms/Button';
import { paperTradingService } from '@/services/paperTrading';
import type { Position, Transaction, WalletSummary, TradeOrder } from '@/services/paperTrading';
import styles from './WalletView.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function WalletView() {
  const [summary, setSummary] = useState<WalletSummary | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<'positions' | 'history'>('positions');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Trade modal state
  const [tradeModal, setTradeModal] = useState<{
    isOpen: boolean;
    ticker: string;
    name: string;
    price: number;
    sharesOwned: number;
    initialType: 'buy' | 'sell';
  } | null>(null);

  // Load data
  const loadData = useCallback(() => {
    setSummary(paperTradingService.getSummary());
    setPositions(paperTradingService.getPositions());
    setTransactions(paperTradingService.getTransactions(50));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    loadData();
    setIsRefreshing(false);
  };

  // Open trade modal
  const openTradeModal = (
    ticker: string,
    name: string,
    price: number,
    sharesOwned: number,
    type: 'buy' | 'sell'
  ) => {
    setTradeModal({
      isOpen: true,
      ticker,
      name,
      price,
      sharesOwned,
      initialType: type,
    });
  };

  // Handle trade execution
  const handleTrade = async (order: TradeOrder) => {
    const result = await paperTradingService.executeTrade(order);
    if (!result.success) {
      throw new Error(result.error);
    }
    loadData();
  };

  // Close trade modal
  const closeTradeModal = () => {
    setTradeModal(null);
  };

  // Filter positions by search
  const filteredPositions = positions.filter((p) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.ticker.toLowerCase().includes(query) ||
      p.name.toLowerCase().includes(query)
    );
  });

  // Filter transactions by search
  const filteredTransactions = transactions.filter((t) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      t.ticker.toLowerCase().includes(query) ||
      t.name.toLowerCase().includes(query)
    );
  });

  if (!summary) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <RefreshCw size={32} className={styles.spinner} />
          <p>Loading wallet...</p>
        </div>
      </div>
    );
  }

  const isPositive = summary.totalGainLoss >= 0;
  const isDayPositive = summary.dayChange >= 0;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerTitle}>
            <Wallet size={24} className={styles.headerIcon} />
            <div>
              <h1 className={styles.title}>Paper Trading Wallet</h1>
              <p className={styles.subtitle}>Practice trading with virtual money</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <Button
              variant="secondary"
              onClick={handleRefresh}
              disabled={isRefreshing}
              icon={<RefreshCw size={16} className={isRefreshing ? styles.spinner : ''} />}
            >
              Refresh
            </Button>
            <Button
              variant="primary"
              onClick={() => openTradeModal('AAPL', 'Apple Inc.', 178.72, 0, 'buy')}
              icon={<Plus size={16} />}
            >
              New Trade
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryIcon}>
              <DollarSign size={20} />
            </div>
            <div className={styles.summaryContent}>
              <span className={styles.summaryLabel}>Total Value</span>
              <span className={styles.summaryValue}>
                ${summary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={`${styles.summaryIcon} ${isPositive ? styles.positive : styles.negative}`}>
              {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            </div>
            <div className={styles.summaryContent}>
              <span className={styles.summaryLabel}>Total Gain/Loss</span>
              <span className={`${styles.summaryValue} ${isPositive ? styles.positive : styles.negative}`}>
                {isPositive ? '+' : ''}${summary.totalGainLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                <span className={styles.summaryPercent}>
                  ({isPositive ? '+' : ''}{summary.totalGainLossPercent.toFixed(2)}%)
                </span>
              </span>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={`${styles.summaryIcon} ${isDayPositive ? styles.positive : styles.negative}`}>
              {isDayPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            </div>
            <div className={styles.summaryContent}>
              <span className={styles.summaryLabel}>Today's Change</span>
              <span className={`${styles.summaryValue} ${isDayPositive ? styles.positive : styles.negative}`}>
                {isDayPositive ? '+' : ''}${summary.dayChange.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                <span className={styles.summaryPercent}>
                  ({isDayPositive ? '+' : ''}{summary.dayChangePercent.toFixed(2)}%)
                </span>
              </span>
            </div>
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.summaryIcon}>
              <PieChart size={20} />
            </div>
            <div className={styles.summaryContent}>
              <span className={styles.summaryLabel}>Cash Available</span>
              <span className={styles.summaryValue}>
                ${summary.cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Tabs & Search */}
        <div className={styles.toolbar}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'positions' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('positions')}
            >
              <PieChart size={16} />
              Positions ({summary.positionCount})
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'history' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <History size={16} />
              History ({transactions.length})
            </button>
          </div>

          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {activeTab === 'positions' ? (
            <div className={styles.positionsSection}>
              {filteredPositions.length === 0 ? (
                <div className={styles.emptyState}>
                  <PieChart size={48} className={styles.emptyIcon} />
                  <h3>No positions yet</h3>
                  <p>Start trading to build your portfolio</p>
                  <Button
                    variant="primary"
                    onClick={() => openTradeModal('AAPL', 'Apple Inc.', 178.72, 0, 'buy')}
                    icon={<Plus size={16} />}
                  >
                    Make Your First Trade
                  </Button>
                </div>
              ) : (
                <div className={styles.positionsList}>
                  <div className={styles.listHeader}>
                    <span>Stock</span>
                    <span>Shares</span>
                    <span>Price</span>
                    <span>Value</span>
                    <span>Return</span>
                    <span>Actions</span>
                  </div>
                  {filteredPositions.map((position) => (
                    <PositionRow
                      key={position.ticker}
                      {...position}
                      onTrade={(type) =>
                        openTradeModal(
                          position.ticker,
                          position.name,
                          position.currentPrice,
                          position.shares,
                          type
                        )
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className={styles.historySection}>
              {filteredTransactions.length === 0 ? (
                <div className={styles.emptyState}>
                  <History size={48} className={styles.emptyIcon} />
                  <h3>No transactions yet</h3>
                  <p>Your trading history will appear here</p>
                </div>
              ) : (
                <div className={styles.transactionsList}>
                  {filteredTransactions.map((transaction) => (
                    <TransactionRow
                      key={transaction.id}
                      {...transaction}
                      status={transaction.status === 'filled' ? 'completed' : transaction.status as 'pending' | 'failed' | 'cancelled'}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Trade Modal */}
      {tradeModal && (
        <TradeModal
          isOpen={tradeModal.isOpen}
          onClose={closeTradeModal}
          ticker={tradeModal.ticker}
          name={tradeModal.name}
          currentPrice={tradeModal.price}
          availableCash={summary.cashBalance}
          sharesOwned={tradeModal.sharesOwned}
          onTrade={handleTrade}
          initialType={tradeModal.initialType}
        />
      )}
    </div>
  );
}
