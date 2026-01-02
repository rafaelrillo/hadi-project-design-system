// Path: src/components/organisms/AddToPortfolioModal/AddToPortfolioModal.tsx

import { useState, useMemo } from 'react';
import {
  Check,
  ChevronRight,
  TrendingUp,
  Shield,
  PieChart,
  DollarSign,
  Target,
  Sparkles,
} from 'lucide-react';
import { Modal } from '@/components/organisms/Modal';
import { Button } from '@/components/atoms/Button';
import { usePortfolioStore } from '@/store';
import styles from './AddToPortfolioModal.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface StockToAdd {
  ticker: string;
  name: string;
  currentPrice: number;
  score: number;
  expectedReturn: number;
}

export interface AddToPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: StockToAdd | null;
  onConfirm: (amount: number, shares: number) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function AddToPortfolioModal({
  isOpen,
  onClose,
  stock,
  onConfirm,
}: AddToPortfolioModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);

  // Get real portfolio data from store
  const { summary, holdings } = usePortfolioStore();
  const portfolioValue = holdings.reduce((sum, h) => sum + h.value, 0);
  const cashBalance = summary.cashBalance;

  // Calculate recommended investment (5-10% of portfolio)
  const recommendedAmount = useMemo(() => {
    if (!stock || portfolioValue === 0) return 0;
    // Recommend 5-8% based on stock score
    const percentage = 0.05 + (stock.score / 100) * 0.03;
    return Math.min(Math.round(portfolioValue * percentage), cashBalance);
  }, [portfolioValue, stock, cashBalance]);

  // Calculate benefits
  const benefits = useMemo(() => {
    if (!stock || portfolioValue === 0 || investmentAmount <= 0) return null;

    const shares = Math.floor(investmentAmount / stock.currentPrice);
    const actualInvestment = shares * stock.currentPrice;
    const newAllocation = (actualInvestment / (portfolioValue + actualInvestment)) * 100;
    const expectedGain = actualInvestment * (stock.expectedReturn / 100);

    return {
      shares,
      actualInvestment,
      newAllocation,
      expectedGain,
      diversificationImpact: stock.score > 70 ? 'high' : stock.score > 50 ? 'medium' : 'low',
      riskReduction: Math.round(Math.random() * 5 + 2), // Mock: 2-7%
    };
  }, [stock, portfolioValue, investmentAmount]);

  // Reset state when modal closes
  const handleClose = () => {
    setCurrentStep(1);
    setInvestmentAmount(0);
    onClose();
  };

  // Handle confirm
  const handleConfirm = () => {
    if (investmentAmount > 0 && benefits) {
      onConfirm(benefits.actualInvestment, benefits.shares);
      handleClose();
    }
  };

  // Set initial recommended amount when modal opens
  useMemo(() => {
    if (isOpen && stock && investmentAmount === 0) {
      setInvestmentAmount(recommendedAmount);
    }
  }, [isOpen, stock, recommendedAmount, investmentAmount]);

  if (!stock) return null;

  const steps = [
    { number: 1, label: 'Investment' },
    { number: 2, label: 'Benefits' },
    { number: 3, label: 'Confirm' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Add ${stock.ticker} to Portfolio`}
      maxWidth="600px"
      footer={
        <div className={styles.footer}>
          {currentStep > 1 && (
            <Button variant="secondary" onClick={() => setCurrentStep(currentStep - 1)}>
              Back
            </Button>
          )}
          {currentStep < 3 ? (
            <Button
              variant="primary"
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={currentStep === 1 && (investmentAmount <= 0 || investmentAmount > cashBalance)}
              icon={<ChevronRight size={16} />}
            >
              Continue
            </Button>
          ) : (
            <Button variant="primary" onClick={handleConfirm} icon={<Check size={16} />}>
              Confirm Investment
            </Button>
          )}
        </div>
      }
    >
      {/* Steps Indicator */}
      <div className={styles.stepsIndicator}>
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`${styles.step} ${currentStep >= step.number ? styles.active : ''} ${
              currentStep > step.number ? styles.completed : ''
            }`}
          >
            <div className={styles.stepNumber}>
              {currentStep > step.number ? <Check size={14} /> : step.number}
            </div>
            <span className={styles.stepLabel}>{step.label}</span>
            {index < steps.length - 1 && <div className={styles.stepLine} />}
          </div>
        ))}
      </div>

      {/* Stock Info Header */}
      <div className={styles.stockHeader}>
        <div className={styles.stockInfo}>
          <span className={styles.stockTicker}>{stock.ticker}</span>
          <span className={styles.stockName}>{stock.name}</span>
        </div>
        <div className={styles.stockPrice}>
          <span className={styles.priceLabel}>Current Price</span>
          <span className={styles.priceValue}>${stock.currentPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Step 1: Investment Amount */}
      {currentStep === 1 && (
        <div className={styles.stepContent}>
          {/* Portfolio Info */}
          <div className={styles.section}>
            <div className={styles.portfolioSummary}>
              <div className={styles.portfolioInfo}>
                <span className={styles.portfolioName}>My Portfolio</span>
                <span className={styles.portfolioValue}>
                  ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                </span>
              </div>
              <div className={styles.cashInfo}>
                <span className={styles.cashLabel}>Available Cash</span>
                <span className={styles.cashValue}>
                  ${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Investment Amount</h3>
            <div className={styles.amountInput}>
              <span className={styles.currencySymbol}>$</span>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className={styles.input}
                min={0}
                max={cashBalance}
              />
            </div>
            <div className={styles.recommendedAmount}>
              <Sparkles size={14} />
              <span>
                Recommended: <strong>${recommendedAmount.toLocaleString()}</strong>
              </span>
              <button
                className={styles.useRecommended}
                onClick={() => setInvestmentAmount(recommendedAmount)}
              >
                Use
              </button>
            </div>
            {investmentAmount > cashBalance && (
              <div className={styles.errorMessage}>
                Insufficient funds. Max available: ${cashBalance.toLocaleString()}
              </div>
            )}
            {investmentAmount > 0 && investmentAmount <= cashBalance && stock && (
              <div className={styles.sharesPreview}>
                ≈ {Math.floor(investmentAmount / stock.currentPrice)} shares
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Benefits */}
      {currentStep === 2 && benefits && (
        <div className={styles.stepContent}>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <DollarSign size={20} />
              </div>
              <div className={styles.benefitContent}>
                <span className={styles.benefitLabel}>Investment</span>
                <span className={styles.benefitValue}>
                  ${benefits.actualInvestment.toLocaleString()}
                </span>
                <span className={styles.benefitDetail}>{benefits.shares} shares</span>
              </div>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <Target size={20} />
              </div>
              <div className={styles.benefitContent}>
                <span className={styles.benefitLabel}>Expected Return</span>
                <span className={`${styles.benefitValue} ${styles.positive}`}>
                  +${benefits.expectedGain.toFixed(2)}
                </span>
                <span className={styles.benefitDetail}>+{stock.expectedReturn}%</span>
              </div>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <PieChart size={20} />
              </div>
              <div className={styles.benefitContent}>
                <span className={styles.benefitLabel}>New Allocation</span>
                <span className={styles.benefitValue}>{benefits.newAllocation.toFixed(1)}%</span>
                <span className={styles.benefitDetail}>of portfolio</span>
              </div>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <Shield size={20} />
              </div>
              <div className={styles.benefitContent}>
                <span className={styles.benefitLabel}>Risk Reduction</span>
                <span className={`${styles.benefitValue} ${styles.positive}`}>
                  -{benefits.riskReduction}%
                </span>
                <span className={styles.benefitDetail}>diversification benefit</span>
              </div>
            </div>
          </div>

          <div className={styles.impactSummary}>
            <TrendingUp size={20} />
            <div className={styles.impactText}>
              <strong>Portfolio Impact:</strong> Adding {stock.ticker} will improve your portfolio's
              diversification with a{' '}
              <span className={styles.highlight}>{benefits.diversificationImpact}</span> impact on
              overall risk-adjusted returns.
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {currentStep === 3 && benefits && (
        <div className={styles.stepContent}>
          <div className={styles.confirmationCard}>
            <div className={styles.confirmHeader}>
              <Check size={32} className={styles.confirmIcon} />
              <h3 className={styles.confirmTitle}>Ready to Invest</h3>
            </div>

            <div className={styles.confirmDetails}>
              <div className={styles.confirmRow}>
                <span className={styles.confirmLabel}>Stock</span>
                <span className={styles.confirmValue}>
                  {stock.ticker} - {stock.name}
                </span>
              </div>
              <div className={styles.confirmRow}>
                <span className={styles.confirmLabel}>Amount</span>
                <span className={styles.confirmValue}>
                  ${benefits.actualInvestment.toLocaleString()}
                </span>
              </div>
              <div className={styles.confirmRow}>
                <span className={styles.confirmLabel}>Shares</span>
                <span className={styles.confirmValue}>{benefits.shares}</span>
              </div>
              <div className={styles.confirmRow}>
                <span className={styles.confirmLabel}>Price per Share</span>
                <span className={styles.confirmValue}>${stock.currentPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.confirmFooter}>
              <span className={styles.expectedReturn}>
                Expected Return: <strong className={styles.positive}>+{stock.expectedReturn}%</strong>
              </span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
