// Path: src/pages/app/PortfolioSimulator/PortfolioSimulator.tsx

import { useState, useMemo, useCallback } from 'react';
import { Search, ArrowLeft, ArrowRight, Check, FlaskConical, GitCompare } from 'lucide-react';
import { Stepper, Step } from '@/components/molecules/sentinel/Stepper';
import { StockSearchResult } from '@/components/molecules/sentinel/StockSearchResult';
import { SelectedStockCard } from '@/components/molecules/sentinel/SelectedStockCard';
import { AllocationSlider } from '@/components/molecules/sentinel/AllocationSlider';
import { RiskProfileSelector, RiskProfile } from '@/components/molecules/sentinel/RiskProfileSelector';
import { Button } from '@/components/atoms/Button';
import { RadarChart } from '@/components/charts/RadarChart';
import styles from './PortfolioSimulator.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface Stock {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  exchange: string;
}

interface SelectedStock extends Stock {
  allocation: number;
}

interface PortfolioConfig {
  name: string;
  riskProfile: RiskProfile;
  investmentAmount: number;
  stocks: SelectedStock[];
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_STOCKS: Stock[] = [
  { ticker: 'AAPL', name: 'Apple Inc.', price: 178.72, change: 2.45, changePercent: 1.39, exchange: 'NASDAQ' },
  { ticker: 'MSFT', name: 'Microsoft Corporation', price: 378.91, change: 4.12, changePercent: 1.10, exchange: 'NASDAQ' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 141.80, change: -0.89, changePercent: -0.62, exchange: 'NASDAQ' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', price: 178.25, change: 3.21, changePercent: 1.83, exchange: 'NASDAQ' },
  { ticker: 'NVDA', name: 'NVIDIA Corporation', price: 495.22, change: 12.45, changePercent: 2.58, exchange: 'NASDAQ' },
  { ticker: 'META', name: 'Meta Platforms Inc.', price: 505.95, change: 8.33, changePercent: 1.67, exchange: 'NASDAQ' },
  { ticker: 'TSLA', name: 'Tesla Inc.', price: 248.48, change: -5.67, changePercent: -2.23, exchange: 'NASDAQ' },
  { ticker: 'JPM', name: 'JPMorgan Chase & Co.', price: 195.46, change: 1.23, changePercent: 0.63, exchange: 'NYSE' },
];

// Current portfolio for comparison
const CURRENT_PORTFOLIO = [
  { ticker: 'AAPL', name: 'Apple Inc.', allocation: 22.34, value: 4468 },
  { ticker: 'MSFT', name: 'Microsoft Corporation', allocation: 22.73, value: 4547 },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', allocation: 21.27, value: 4254 },
  { ticker: 'NVDA', name: 'NVIDIA Corporation', allocation: 19.81, value: 3962 },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', allocation: 13.37, value: 2674 },
];

const STEPS: Step[] = [
  { id: 'profile', label: 'Profile', description: 'Set your risk tolerance' },
  { id: 'select', label: 'Select Stocks', description: 'Choose your investments' },
  { id: 'allocate', label: 'Allocate', description: 'Set percentages' },
  { id: 'compare', label: 'Compare', description: 'Compare with current' },
  { id: 'review', label: 'Review', description: 'Confirm your portfolio' },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function PortfolioSimulator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [config, setConfig] = useState<PortfolioConfig>({
    name: '',
    riskProfile: 'moderate',
    investmentAmount: 10000,
    stocks: [],
  });

  // Filter stocks based on search
  const filteredStocks = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_STOCKS;
    const query = searchQuery.toLowerCase();
    return MOCK_STOCKS.filter(
      (stock) =>
        stock.ticker.toLowerCase().includes(query) ||
        stock.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Check if stock is selected
  const isStockSelected = useCallback(
    (ticker: string) => config.stocks.some((s) => s.ticker === ticker),
    [config.stocks]
  );

  // Add stock to selection
  const handleAddStock = useCallback((stock: Stock) => {
    setConfig((prev) => ({
      ...prev,
      stocks: [
        ...prev.stocks,
        { ...stock, allocation: 0 },
      ],
    }));
  }, []);

  // Remove stock from selection
  const handleRemoveStock = useCallback((ticker: string) => {
    setConfig((prev) => ({
      ...prev,
      stocks: prev.stocks.filter((s) => s.ticker !== ticker),
    }));
  }, []);

  // Update stock allocation
  const handleAllocationChange = useCallback((ticker: string, allocation: number) => {
    setConfig((prev) => ({
      ...prev,
      stocks: prev.stocks.map((s) =>
        s.ticker === ticker ? { ...s, allocation } : s
      ),
    }));
  }, []);

  // Update risk profile
  const handleRiskProfileChange = useCallback((profile: RiskProfile) => {
    setConfig((prev) => ({ ...prev, riskProfile: profile }));
  }, []);

  // Update investment amount
  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setConfig((prev) => ({ ...prev, investmentAmount: value }));
  }, []);

  // Navigation
  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 0: // Profile
        return true;
      case 1: // Select
        return config.stocks.length >= 1;
      case 2: // Allocate
        const totalAllocation = config.stocks.reduce((sum, s) => sum + s.allocation, 0);
        return Math.abs(totalAllocation - 100) < 0.1;
      case 3: // Compare
        return true;
      case 4: // Review
        return true;
      default:
        return false;
    }
  }, [currentStep, config.stocks]);

  const handleNext = () => {
    if (canProceed && currentStep < STEPS.length - 1) {
      // Auto-distribute allocation if entering allocate step
      if (currentStep === 1 && config.stocks.length > 0) {
        const equalAllocation = 100 / config.stocks.length;
        setConfig((prev) => ({
          ...prev,
          stocks: prev.stocks.map((s) => ({ ...s, allocation: equalAllocation })),
        }));
      }
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const handleSubmit = () => {
    console.log('Portfolio created:', config);
    // TODO: Integrate with wallet store
  };

  // Calculate totals
  const totalAllocation = config.stocks.reduce((sum, s) => sum + s.allocation, 0);
  const remainingAllocation = 100 - totalAllocation;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <FlaskConical size={24} className={styles.headerIcon} />
          <div>
            <h1 className={styles.title}>Portfolio Simulator</h1>
            <p className={styles.subtitle}>Simulate changes and compare with your current portfolio</p>
          </div>
        </div>
      </header>

      {/* Stepper */}
      <div className={styles.stepperWrapper}>
        <Stepper
          steps={STEPS}
          currentStep={currentStep}
          onStepClick={handleStepClick}
          showDescription
          size="md"
        />
      </div>

      {/* Content */}
      <main className={styles.content}>
        {/* Step 0: Risk Profile */}
        {currentStep === 0 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Set Your Risk Profile</h2>
            <p className={styles.stepDescription}>
              Select your investment style and risk tolerance to help us tailor recommendations.
            </p>

            <div className={styles.profileSection}>
              <RiskProfileSelector
                value={config.riskProfile}
                onChange={handleRiskProfileChange}
              />

              <div className={styles.amountSection}>
                <label className={styles.amountLabel}>Investment Amount</label>
                <div className={styles.amountInput}>
                  <span className={styles.currencySymbol}>$</span>
                  <input
                    type="number"
                    value={config.investmentAmount}
                    onChange={handleAmountChange}
                    min={100}
                    step={100}
                    className={styles.amountField}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Select Stocks */}
        {currentStep === 1 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Select Your Stocks</h2>
            <p className={styles.stepDescription}>
              Search and add stocks to your portfolio. You can add up to 10 stocks.
            </p>

            <div className={styles.selectLayout}>
              {/* Search Section */}
              <div className={styles.searchSection}>
                <div className={styles.searchBox}>
                  <Search size={18} className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search by ticker or company name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>

                <div className={styles.searchResults}>
                  {filteredStocks.map((stock) => (
                    <StockSearchResult
                      key={stock.ticker}
                      {...stock}
                      isSelected={isStockSelected(stock.ticker)}
                      onAdd={() => handleAddStock(stock)}
                      disabled={config.stocks.length >= 10}
                    />
                  ))}
                </div>
              </div>

              {/* Selected Section */}
              <div className={styles.selectedSection}>
                <h3 className={styles.selectedTitle}>
                  Selected ({config.stocks.length}/10)
                </h3>
                <div className={styles.selectedList}>
                  {config.stocks.length === 0 ? (
                    <p className={styles.emptyState}>
                      No stocks selected. Add stocks from the search results.
                    </p>
                  ) : (
                    config.stocks.map((stock, index) => (
                      <SelectedStockCard
                        key={stock.ticker}
                        ticker={stock.ticker}
                        name={stock.name}
                        price={stock.price}
                        index={index}
                        onRemove={() => handleRemoveStock(stock.ticker)}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Allocate */}
        {currentStep === 2 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Set Allocations</h2>
            <p className={styles.stepDescription}>
              Adjust the percentage allocation for each stock. Total must equal 100%.
            </p>

            <div className={styles.allocationHeader}>
              <span className={styles.allocationTotal}>
                Total: {totalAllocation.toFixed(1)}%
              </span>
              <span
                className={`${styles.allocationRemaining} ${
                  Math.abs(remainingAllocation) < 0.1 ? styles.complete : ''
                }`}
              >
                {remainingAllocation > 0
                  ? `${remainingAllocation.toFixed(1)}% remaining`
                  : remainingAllocation < -0.1
                  ? `${Math.abs(remainingAllocation).toFixed(1)}% over`
                  : 'Allocation complete'}
              </span>
            </div>

            <div className={styles.allocationList}>
              {config.stocks.map((stock) => (
                <AllocationSlider
                  key={stock.ticker}
                  ticker={stock.ticker}
                  name={stock.name}
                  value={stock.allocation}
                  onChange={(value) => handleAllocationChange(stock.ticker, value)}
                  price={stock.price}
                  dollarAmount={(config.investmentAmount * stock.allocation) / 100}
                  max={100}
                  step={0.5}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Compare */}
        {currentStep === 3 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Compare Portfolios</h2>
            <p className={styles.stepDescription}>
              See how your new portfolio compares to your current holdings.
            </p>

            <div className={styles.comparisonContainer}>
              {/* Radar Chart Comparison */}
              <div className={styles.radarChartSection}>
                <h3 className={styles.chartSectionTitle}>Portfolio Analysis</h3>
                <RadarChart
                  data={[
                    { metric: 'Performance', 'Current Portfolio': 72, 'New Portfolio': config.riskProfile === 'aggressive' ? 85 : config.riskProfile === 'moderate' ? 78 : 65 },
                    { metric: 'Risk Level', 'Current Portfolio': 55, 'New Portfolio': config.riskProfile === 'aggressive' ? 80 : config.riskProfile === 'moderate' ? 55 : 30 },
                    { metric: 'Diversification', 'Current Portfolio': 68, 'New Portfolio': Math.min(config.stocks.length * 15, 90) },
                    { metric: 'Growth Potential', 'Current Portfolio': 70, 'New Portfolio': config.riskProfile === 'aggressive' ? 90 : config.riskProfile === 'moderate' ? 75 : 55 },
                    { metric: 'Stability', 'Current Portfolio': 75, 'New Portfolio': config.riskProfile === 'aggressive' ? 45 : config.riskProfile === 'moderate' ? 70 : 90 },
                  ]}
                  keys={['Current Portfolio', 'New Portfolio']}
                  indexBy="metric"
                  height={350}
                  fillOpacity={0.3}
                />
              </div>

              {/* Comparison Chart */}
              <div className={styles.comparisonChart}>
                <div className={styles.chartHeader}>
                  <span className={styles.chartLegend}>
                    <span className={styles.legendDot} data-type="current" />
                    Current Portfolio
                  </span>
                  <span className={styles.chartLegend}>
                    <span className={styles.legendDot} data-type="new" />
                    New Portfolio
                  </span>
                </div>
                <div className={styles.barChart}>
                  {/* Get all unique tickers from both portfolios */}
                  {(() => {
                    const allTickers = new Set([
                      ...CURRENT_PORTFOLIO.map(p => p.ticker),
                      ...config.stocks.map(s => s.ticker)
                    ]);
                    return Array.from(allTickers).map(ticker => {
                      const current = CURRENT_PORTFOLIO.find(p => p.ticker === ticker);
                      const newStock = config.stocks.find(s => s.ticker === ticker);
                      const currentAlloc = current?.allocation || 0;
                      const newAlloc = newStock?.allocation || 0;
                      const maxAlloc = Math.max(currentAlloc, newAlloc, 30);

                      return (
                        <div key={ticker} className={styles.barRow}>
                          <span className={styles.barLabel}>{ticker}</span>
                          <div className={styles.barGroup}>
                            <div className={styles.barWrapper}>
                              <div
                                className={styles.bar}
                                data-type="current"
                                style={{ width: `${(currentAlloc / maxAlloc) * 100}%` }}
                              />
                              <span className={styles.barValue}>{currentAlloc.toFixed(1)}%</span>
                            </div>
                            <div className={styles.barWrapper}>
                              <div
                                className={styles.bar}
                                data-type="new"
                                style={{ width: `${(newAlloc / maxAlloc) * 100}%` }}
                              />
                              <span className={styles.barValue}>{newAlloc.toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Summary Comparison */}
              <div className={styles.comparisonSummary}>
                <div className={styles.summaryColumn}>
                  <h3 className={styles.summaryTitle}>Current Portfolio</h3>
                  <div className={styles.summaryStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Stocks</span>
                      <span className={styles.statValue}>{CURRENT_PORTFOLIO.length}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Total Value</span>
                      <span className={styles.statValue}>$20,000</span>
                    </div>
                  </div>
                </div>
                <div className={styles.summaryDivider}>
                  <GitCompare size={20} />
                </div>
                <div className={styles.summaryColumn}>
                  <h3 className={styles.summaryTitle}>New Portfolio</h3>
                  <div className={styles.summaryStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Stocks</span>
                      <span className={styles.statValue}>{config.stocks.length}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Investment</span>
                      <span className={styles.statValue}>${config.investmentAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Review Your Portfolio</h2>
            <p className={styles.stepDescription}>
              Review your selections before creating your portfolio.
            </p>

            <div className={styles.reviewSection}>
              <div className={styles.reviewCard}>
                <h3 className={styles.reviewLabel}>Risk Profile</h3>
                <p className={styles.reviewValue}>{config.riskProfile}</p>
              </div>

              <div className={styles.reviewCard}>
                <h3 className={styles.reviewLabel}>Investment Amount</h3>
                <p className={styles.reviewValue}>
                  ${config.investmentAmount.toLocaleString()}
                </p>
              </div>

              <div className={styles.reviewCard}>
                <h3 className={styles.reviewLabel}>Number of Stocks</h3>
                <p className={styles.reviewValue}>{config.stocks.length}</p>
              </div>
            </div>

            <div className={styles.reviewStocks}>
              <h3 className={styles.reviewStocksTitle}>Portfolio Composition</h3>
              {config.stocks.map((stock) => (
                <div key={stock.ticker} className={styles.reviewStock}>
                  <div className={styles.reviewStockInfo}>
                    <span className={styles.reviewTicker}>{stock.ticker}</span>
                    <span className={styles.reviewName}>{stock.name}</span>
                  </div>
                  <div className={styles.reviewStockValues}>
                    <span className={styles.reviewAllocation}>
                      {stock.allocation.toFixed(1)}%
                    </span>
                    <span className={styles.reviewAmount}>
                      ${((config.investmentAmount * stock.allocation) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer Navigation */}
      <footer className={styles.footer}>
        <Button
          variant="secondary"
          onClick={handleBack}
          disabled={currentStep === 0}
          icon={<ArrowLeft size={16} />}
        >
          Back
        </Button>

        {currentStep < STEPS.length - 1 ? (
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!canProceed}
            icon={<ArrowRight size={16} />}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleSubmit}
            icon={<Check size={16} />}
          >
            Create Portfolio
          </Button>
        )}
      </footer>
    </div>
  );
}
