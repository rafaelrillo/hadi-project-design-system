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

export interface Portfolio {
  id: string;
  name: string;
  totalValue: number;
}

export interface AddToPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: StockToAdd | null;
  onConfirm: (portfolioId: string, amount: number) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK PORTFOLIOS
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_PORTFOLIOS: Portfolio[] = [
  { id: '1', name: 'Main Portfolio', totalValue: 25000 },
  { id: '2', name: 'Growth Portfolio', totalValue: 15000 },
  { id: '3', name: 'Conservative Portfolio', totalValue: 10000 },
];

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
  const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);

  // Calculate recommended investment (5-10% of portfolio)
  const selectedPortfolioData = MOCK_PORTFOLIOS.find((p) => p.id === selectedPortfolio);
  const recommendedAmount = useMemo(() => {
    if (!selectedPortfolioData || !stock) return 0;
    // Recommend 5-8% based on stock score
    const percentage = 0.05 + (stock.score / 100) * 0.03;
    return Math.round(selectedPortfolioData.totalValue * percentage);
  }, [selectedPortfolioData, stock]);

  // Calculate benefits
  const benefits = useMemo(() => {
    if (!stock || !selectedPortfolioData || investmentAmount <= 0) return null;

    const shares = Math.floor(investmentAmount / stock.currentPrice);
    const actualInvestment = shares * stock.currentPrice;
    const newAllocation = (actualInvestment / (selectedPortfolioData.totalValue + actualInvestment)) * 100;
    const expectedGain = actualInvestment * (stock.expectedReturn / 100);

    return {
      shares,
      actualInvestment,
      newAllocation,
      expectedGain,
      diversificationImpact: stock.score > 70 ? 'high' : stock.score > 50 ? 'medium' : 'low',
      riskReduction: Math.round(Math.random() * 5 + 2), // Mock: 2-7%
    };
  }, [stock, selectedPortfolioData, investmentAmount]);

  // Reset state when modal closes
  const handleClose = () => {
    setCurrentStep(1);
    setSelectedPortfolio(null);
    setInvestmentAmount(0);
    onClose();
  };

  // Handle confirm
  const handleConfirm = () => {
    if (selectedPortfolio && investmentAmount > 0) {
      onConfirm(selectedPortfolio, investmentAmount);
      handleClose();
    }
  };

  // Set recommended amount when portfolio is selected
  const handlePortfolioSelect = (portfolioId: string) => {
    setSelectedPortfolio(portfolioId);
    const portfolio = MOCK_PORTFOLIOS.find((p) => p.id === portfolioId);
    if (portfolio && stock) {
      const percentage = 0.05 + (stock.score / 100) * 0.03;
      setInvestmentAmount(Math.round(portfolio.totalValue * percentage));
    }
  };

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
              disabled={currentStep === 1 && (!selectedPortfolio || investmentAmount <= 0)}
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

      {/* Step 1: Select Portfolio & Amount */}
      {currentStep === 1 && (
        <div className={styles.stepContent}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Select Portfolio</h3>
            <div className={styles.portfolioList}>
              {MOCK_PORTFOLIOS.map((portfolio) => (
                <button
                  key={portfolio.id}
                  className={`${styles.portfolioOption} ${
                    selectedPortfolio === portfolio.id ? styles.selected : ''
                  }`}
                  onClick={() => handlePortfolioSelect(portfolio.id)}
                >
                  <div className={styles.portfolioInfo}>
                    <span className={styles.portfolioName}>{portfolio.name}</span>
                    <span className={styles.portfolioValue}>
                      ${portfolio.totalValue.toLocaleString()}
                    </span>
                  </div>
                  <div className={styles.portfolioCheck}>
                    {selectedPortfolio === portfolio.id && <Check size={16} />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedPortfolio && (
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
                  max={selectedPortfolioData?.totalValue}
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
              {investmentAmount > 0 && stock && (
                <div className={styles.sharesPreview}>
                  ≈ {Math.floor(investmentAmount / stock.currentPrice)} shares
                </div>
              )}
            </div>
          )}
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
                <span className={styles.confirmLabel}>Portfolio</span>
                <span className={styles.confirmValue}>{selectedPortfolioData?.name}</span>
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
