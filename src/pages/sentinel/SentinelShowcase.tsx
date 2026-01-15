// Path: src/pages/sentinel/SentinelShowcase.tsx
import { useState, type CSSProperties } from 'react';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import {
  MarketStateIndicator,
  RiskGauge,
  ConfidenceLevel,
  SystemPulse,
} from '../../components/organisms/sentinel';
import {
  AtmosphericBackground,
  DepthLayer,
  DataReveal,
} from '../../components/atoms/sentinel';
import {
  FactorWeight,
  TrendIndicator,
  HistoricalAlignment,
  CyclePosition,
  RecommendationCard,
  StockSuggestion,
  RiskProfileSelector,
  AllocationSummary,
} from '../../components/molecules/sentinel';
import { FinancialLineChart } from '../../components/charts/FinancialLineChart';
import { FadeIn, StaggerList, MotionCard, ScrollReveal } from '../../components/animations';
import type { MarketState, RiskLevel } from '../../components/organisms/sentinel';
import type { RiskProfile } from '../../components/molecules/sentinel';

export function SentinelShowcase() {
  const [riskProfile, setRiskProfile] = useState<RiskProfile>('balanced');

  // Page styles
  const pageHeaderStyles: CSSProperties = {
    marginBottom: '48px',
  };

  const titleStyles: CSSProperties = {
    fontSize: '32px',
    fontWeight: 300,
    color: 'var(--sentinel-text-primary)',
    marginBottom: '12px',
    fontFamily: 'var(--sentinel-font-display)',
    letterSpacing: '-0.02em',
  };

  const descStyles: CSSProperties = {
    fontSize: '14px',
    color: 'var(--sentinel-text-secondary)',
    fontFamily: 'var(--sentinel-font-primary)',
    fontWeight: 400,
    maxWidth: '700px',
    lineHeight: 1.7,
  };

  const sectionHeaderStyles: CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--sentinel-accent-primary)',
    marginTop: '64px',
    marginBottom: '24px',
    fontFamily: 'var(--sentinel-font-primary)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    borderBottom: '1px solid var(--sentinel-border-subtle)',
    paddingBottom: '12px',
  };

  // Light Engine demo box styles
  const lightEngineBoxBase: CSSProperties = {
    width: '120px',
    height: '120px',
    backgroundColor: 'var(--sentinel-bg-surface)',
    borderRadius: 'var(--sentinel-radius-lg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '6px',
    transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
  };

  // Sample data - using YYYY-MM-DD format for lightweight-charts
  const financialData = [
    {
      id: 'Portfolio Value',
      data: [
        { x: '2024-01-01', y: 100000 },
        { x: '2024-02-01', y: 105000 },
        { x: '2024-03-01', y: 98000 },
        { x: '2024-04-01', y: 112000 },
        { x: '2024-05-01', y: 108000 },
        { x: '2024-06-01', y: 125000 },
      ],
    },
  ];

  const sampleFactors = [
    { id: '1', name: 'Interest Rates', weight: 78, impact: 'positive' as const, trend: 'up' as const },
    { id: '2', name: 'Inflation Data', weight: 62, impact: 'negative' as const, trend: 'down' as const },
    { id: '3', name: 'Employment', weight: 54, impact: 'neutral' as const, trend: 'stable' as const },
    { id: '4', name: 'Consumer Sentiment', weight: 41, impact: 'positive' as const },
    { id: '5', name: 'GDP Growth', weight: 38, impact: 'positive' as const, trend: 'up' as const },
    { id: '6', name: 'Trade Balance', weight: 25, impact: 'negative' as const },
  ];

  const historicalPeriods = [
    { year: 2019, label: 'Pre-Pandemic Rally', similarity: 87, outcome: 'Recovery in 14 months' },
    { year: 2016, label: 'Election Cycle', similarity: 71, outcome: 'Volatility normalized in 6 months' },
    { year: 2011, label: 'Debt Ceiling Crisis', similarity: 54, outcome: 'Markets recovered in 3 months' },
  ];

  const sampleAllocations = [
    { assetClass: 'Stocks', percentage: 60, change: 5 },
    { assetClass: 'Bonds', percentage: 25, change: -3 },
    { assetClass: 'Cash', percentage: 10, change: -2 },
    { assetClass: 'Other', percentage: 5, change: 0 },
  ];

  const marketStates: MarketState[] = ['bullish', 'bearish', 'neutral', 'uncertain'];
  const riskLevels: RiskLevel[] = ['low', 'moderate', 'elevated', 'high', 'severe'];

  return (
    <div style={{ padding: '32px' }}>
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>SENTINEL Components</h1>
        <p style={descStyles}>
          Complete component library for the SENTINEL investment analysis interface.
          Powered by the Light Engine - a unified shadow system based on Josh Comeau's principles.
          One light source, consistent ratios, layered depth.
        </p>
      </header>

      {/* ============================================ */}
      {/* LIGHT ENGINE DEMONSTRATION */}
      {/* ============================================ */}
      <FadeIn direction="up" delay={0.1}>
        <h2 style={sectionHeaderStyles}>Light Engine System</h2>
      </FadeIn>

      <ScrollReveal>
        <ShowcaseSection
          title="Unified Light Source"
          description="All shadows share the same light direction (top-left) with consistent offset ratios. Hover to see interactive states."
        >
          <ComponentPreview>
            <div style={{
              backgroundColor: 'var(--sentinel-bg-base)',
              padding: '48px',
              borderRadius: 'var(--sentinel-radius-xl)',
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {/* Layered Shadows */}
              <div style={{ textAlign: 'center' }}>
                <div className="elevation-interactive" style={lightEngineBoxBase}>
                  <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--sentinel-text-primary)' }}>
                    Layered
                  </span>
                  <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '10px', color: 'var(--sentinel-text-tertiary)' }}>
                    5 capas
                  </span>
                </div>
                <p style={{ marginTop: '8px', fontSize: '11px', color: 'var(--sentinel-text-tertiary)' }}>Cards, Panels</p>
              </div>

              {/* Neumorphic */}
              <div style={{ textAlign: 'center' }}>
                <div className="neu-interactive" style={{ ...lightEngineBoxBase, backgroundColor: 'var(--sentinel-bg-base)' }}>
                  <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--sentinel-text-primary)' }}>
                    Neumorphic
                  </span>
                  <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '10px', color: 'var(--sentinel-text-tertiary)' }}>
                    dual shadow
                  </span>
                </div>
                <p style={{ marginTop: '8px', fontSize: '11px', color: 'var(--sentinel-text-tertiary)' }}>Buttons, Controls</p>
              </div>

              {/* Glass */}
              <div style={{ textAlign: 'center' }}>
                <div className="glass-interactive" style={{
                  ...lightEngineBoxBase,
                  backgroundColor: 'var(--sentinel-glass-bg)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--sentinel-glass-border)',
                }}>
                  <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--sentinel-text-primary)' }}>
                    Glass
                  </span>
                  <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '10px', color: 'var(--sentinel-text-tertiary)' }}>
                    + reflection
                  </span>
                </div>
                <p style={{ marginTop: '8px', fontSize: '11px', color: 'var(--sentinel-text-tertiary)' }}>Overlays, Modals</p>
              </div>

              {/* Inset */}
              <div style={{ textAlign: 'center' }}>
                <div className="neu-inset-2" style={{ ...lightEngineBoxBase, backgroundColor: 'var(--sentinel-bg-base)' }}>
                  <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--sentinel-text-primary)' }}>
                    Inset
                  </span>
                  <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '10px', color: 'var(--sentinel-text-tertiary)' }}>
                    recessed
                  </span>
                </div>
                <p style={{ marginTop: '8px', fontSize: '11px', color: 'var(--sentinel-text-tertiary)' }}>Inputs, Wells</p>
              </div>
            </div>
          </ComponentPreview>
        </ShowcaseSection>
      </ScrollReveal>

      <ScrollReveal>
        <ShowcaseSection
          title="Color-Matched Shadows"
          description="Shadows inherit the hue of their context, never pure black. This prevents the 'grey fog' effect."
        >
          <ComponentPreview>
            <div style={{
              backgroundColor: 'var(--sentinel-bg-base)',
              padding: '48px',
              borderRadius: 'var(--sentinel-radius-xl)',
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <div className="shadow-positive" style={{
                ...lightEngineBoxBase,
                backgroundColor: 'var(--sentinel-status-positive-subtle)',
                border: '1px solid var(--sentinel-status-positive-border)',
              }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sentinel-status-positive-text)' }}>Positive</span>
              </div>

              <div className="shadow-negative" style={{
                ...lightEngineBoxBase,
                backgroundColor: 'var(--sentinel-status-negative-subtle)',
                border: '1px solid var(--sentinel-status-negative-border)',
              }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sentinel-status-negative-text)' }}>Negative</span>
              </div>

              <div className="shadow-warning" style={{
                ...lightEngineBoxBase,
                backgroundColor: 'var(--sentinel-status-warning-subtle)',
                border: '1px solid var(--sentinel-status-warning-border)',
              }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sentinel-status-warning-text)' }}>Warning</span>
              </div>

              <div className="shadow-accent" style={{
                ...lightEngineBoxBase,
                backgroundColor: 'var(--sentinel-accent-subtle)',
                border: '1px solid var(--sentinel-border-accent)',
              }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sentinel-accent-primary)' }}>Accent</span>
              </div>

              <div className="shadow-info" style={{
                ...lightEngineBoxBase,
                backgroundColor: 'var(--sentinel-status-info-subtle)',
                border: '1px solid var(--sentinel-status-info-border)',
              }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sentinel-status-info-text)' }}>Info</span>
              </div>
            </div>
          </ComponentPreview>
        </ShowcaseSection>
      </ScrollReveal>

      {/* ============================================ */}
      {/* LEVEL 1: CORE INDICATORS (with animations) */}
      {/* ============================================ */}
      <FadeIn direction="up" delay={0.1}>
        <h2 style={sectionHeaderStyles}>Level 1: Core Indicators</h2>
      </FadeIn>

      <ScrollReveal>
        <ShowcaseSection
          title="MarketStateIndicator"
          description="Visual representation of current market outlook with staggered reveal"
        >
          <ComponentPreview>
            <StaggerList as="div" speed="normal" direction="up" className="grid grid-cols-4 gap-6 w-full">
              {marketStates.map((state) => (
                <MotionCard key={state} variant="glow">
                  <MarketStateIndicator state={state} size="sm" />
                </MotionCard>
              ))}
            </StaggerList>
          </ComponentPreview>
        </ShowcaseSection>
      </ScrollReveal>

      <ScrollReveal>
        <ShowcaseSection
          title="RiskGauge"
          description="Segmented gauge showing systemic risk levels with hover effects"
        >
          <ComponentPreview>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px', width: '100%' }}>
              {riskLevels.map((level, index) => (
                <FadeIn key={level} direction="scale" delay={index * 0.1}>
                  <MotionCard variant="scale">
                    <RiskGauge level={level} value={(index + 1) * 20 - 10} size="sm" />
                  </MotionCard>
                </FadeIn>
              ))}
            </div>
          </ComponentPreview>
        </ShowcaseSection>
      </ScrollReveal>

      <ScrollReveal>
        <ShowcaseSection
          title="ConfidenceLevel & SystemPulse"
          description="System confidence and operational status indicators with animations"
        >
          <ComponentPreview>
            <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
              <FadeIn direction="left" delay={0}>
                <ConfidenceLevel level="high" percentage={92} showPercentage size="sm" />
              </FadeIn>
              <FadeIn direction="up" delay={0.1}>
                <ConfidenceLevel level="medium" percentage={65} showPercentage size="sm" />
              </FadeIn>
              <FadeIn direction="right" delay={0.2}>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <SystemPulse status="active" />
                  <SystemPulse status="processing" />
                  <SystemPulse status="idle" />
                </div>
              </FadeIn>
            </div>
          </ComponentPreview>
        </ShowcaseSection>
      </ScrollReveal>

      {/* ============================================ */}
      {/* LEVEL 2: CONTEXT COMPONENTS */}
      {/* ============================================ */}
      <FadeIn direction="up" delay={0.1}>
        <h2 style={sectionHeaderStyles}>Level 2: Context Components</h2>
      </FadeIn>

      <ScrollReveal>
        <ShowcaseSection
          title="FactorWeight"
          description="Shows which factors weigh most in the current analysis"
        >
          <FadeIn direction="left" delay={0.1}>
            <MotionCard variant="default">
              <div style={{ maxWidth: '500px' }}>
                <FactorWeight factors={sampleFactors} maxVisible={4} />
              </div>
            </MotionCard>
          </FadeIn>
        </ShowcaseSection>
      </ScrollReveal>

      <ScrollReveal>
        <ShowcaseSection
          title="TrendIndicator"
          description="Simple trend display for specific metrics with staggered animation"
        >
          <ComponentPreview>
            <StaggerList as="div" speed="fast" direction="left" className="grid grid-cols-4 gap-4 w-full">
              <MotionCard variant="glow">
                <TrendIndicator label="S&P 500" value="4,892.31" trend="up" change="+1.2%" period="vs yesterday" />
              </MotionCard>
              <MotionCard variant="glow">
                <TrendIndicator label="NASDAQ" value="15,628.95" trend="down" change="-0.8%" period="vs yesterday" />
              </MotionCard>
              <MotionCard variant="glow">
                <TrendIndicator label="VIX" value="18.42" trend="stable" change="+0.1%" period="vs last week" />
              </MotionCard>
              <MotionCard variant="glow">
                <TrendIndicator label="10Y Treasury" value="4.25%" trend="up" change="+0.05%" />
              </MotionCard>
            </StaggerList>
          </ComponentPreview>
        </ShowcaseSection>
      </ScrollReveal>

      <ScrollReveal>
        <ShowcaseSection
          title="HistoricalAlignment"
          description="Compare current state with historical patterns"
        >
          <FadeIn direction="up" delay={0.2}>
            <div style={{ maxWidth: '500px' }}>
              <HistoricalAlignment periods={historicalPeriods} />
            </div>
          </FadeIn>
        </ShowcaseSection>
      </ScrollReveal>

      <ScrollReveal>
        <ShowcaseSection
          title="CyclePosition"
          description="Shows position in the economic cycle with hover interaction"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            <FadeIn direction="left" delay={0}>
              <MotionCard variant="scale">
                <CyclePosition currentPhase="expansion" confidence={78} />
              </MotionCard>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <MotionCard variant="scale">
                <CyclePosition currentPhase="peak" confidence={65} description="Approaching maximum output, prepare for transition" />
              </MotionCard>
            </FadeIn>
          </div>
        </ShowcaseSection>
      </ScrollReveal>

      {/* ============================================ */}
      {/* LEVEL 3: ACTION COMPONENTS */}
      {/* ============================================ */}
      <FadeIn direction="up" delay={0.1}>
        <h2 style={sectionHeaderStyles}>Level 3: Action Components</h2>
      </FadeIn>

      <ScrollReveal>
        <ShowcaseSection
          title="RecommendationCard"
          description="Primary investment recommendation cards with interactive hover"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            <FadeIn direction="left" delay={0}>
              <MotionCard variant="glow">
                <RecommendationCard
                  type="buy"
                  assetClass="stocks"
                  title="Increase Equity Exposure"
                  rationale="Market conditions favor growth stocks with strong fundamentals. Consider increasing allocation by 5-10%."
                  confidence={78}
                  timeframe="3-6 months"
                  priority="high"
                />
              </MotionCard>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <MotionCard variant="glow">
                <RecommendationCard
                  type="hold"
                  assetClass="bonds"
                  title="Maintain Bond Position"
                  rationale="Current yield curve suggests stability. No immediate action required."
                  confidence={65}
                  timeframe="6-12 months"
                  priority="medium"
                />
              </MotionCard>
            </FadeIn>
          </div>
        </ShowcaseSection>
      </ScrollReveal>

      <ScrollReveal>
        <ShowcaseSection
          title="StockSuggestion"
          description="Individual stock/asset suggestions with staggered reveal"
        >
          <StaggerList as="div" speed="fast" direction="up" className="grid grid-cols-2 gap-4">
            <MotionCard variant="scale">
              <StockSuggestion
                symbol="AAPL"
                name="Apple Inc."
                action="buy"
                currentPrice={178.23}
                targetPrice={195.00}
                confidence={72}
                sector="Technology"
                reasoning="Strong iPhone sales and services growth. Expanding AI capabilities with Apple Intelligence."
              />
            </MotionCard>
            <MotionCard variant="scale">
              <StockSuggestion
                symbol="MSFT"
                name="Microsoft Corp."
                action="hold"
                currentPrice={378.91}
                targetPrice={390.00}
                confidence={68}
                sector="Technology"
              />
            </MotionCard>
            <MotionCard variant="scale">
              <StockSuggestion
                symbol="NVDA"
                name="NVIDIA Corp."
                action="buy"
                currentPrice={495.22}
                targetPrice={550.00}
                confidence={81}
                sector="Semiconductors"
                reasoning="AI demand continues to drive unprecedented growth. Data center revenue exceeding expectations."
              />
            </MotionCard>
            <MotionCard variant="scale">
              <StockSuggestion
                symbol="XOM"
                name="Exxon Mobil"
                action="sell"
                currentPrice={104.56}
                targetPrice={95.00}
                confidence={62}
                sector="Energy"
              />
            </MotionCard>
          </StaggerList>
        </ShowcaseSection>
      </ScrollReveal>

      <ScrollReveal>
        <ShowcaseSection
          title="RiskProfileSelector"
          description="User risk profile selection with animation"
        >
          <FadeIn direction="up" delay={0.1}>
            <div style={{ maxWidth: '600px' }}>
              <RiskProfileSelector
                value={riskProfile}
                onChange={setRiskProfile}
                showDescriptions
              />
            </div>
          </FadeIn>
        </ShowcaseSection>
      </ScrollReveal>

      <ScrollReveal>
        <ShowcaseSection
          title="AllocationSummary"
          description="Portfolio allocation breakdown"
        >
          <FadeIn direction="left" delay={0.1}>
            <MotionCard variant="default">
              <div style={{ maxWidth: '500px' }}>
                <AllocationSummary allocations={sampleAllocations} showChanges />
              </div>
            </MotionCard>
          </FadeIn>
        </ShowcaseSection>
      </ScrollReveal>

      {/* ============================================ */}
      {/* ATMOSPHERIC COMPONENTS */}
      {/* ============================================ */}
      <FadeIn direction="up" delay={0.1}>
        <h2 style={sectionHeaderStyles}>Atmospheric Components</h2>
      </FadeIn>

      <ScrollReveal>
        <ShowcaseSection
          title="DepthLayer"
          description="Z-axis depth containers with 5 elevation levels and hover effects"
        >
          <ComponentPreview>
            <StaggerList as="div" speed="fast" direction="up" className="grid grid-cols-5 gap-4 w-full">
              {([1, 2, 3, 4, 5] as const).map((depth) => (
                <MotionCard key={depth} variant="scale">
                  <DepthLayer depth={depth}>
                    <div style={{ padding: '24px', textAlign: 'center' }}>
                      <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '12px', color: 'var(--sentinel-text-secondary)' }}>
                        Depth {depth}
                      </span>
                    </div>
                  </DepthLayer>
                </MotionCard>
              ))}
            </StaggerList>
          </ComponentPreview>
        </ShowcaseSection>
      </ScrollReveal>

      <ScrollReveal>
        <ShowcaseSection
          title="DataReveal"
          description="Staggered reveal animation for data elements"
        >
          <ComponentPreview>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', width: '100%' }}>
              {[0, 100, 200, 300].map((delay) => (
                <DataReveal key={delay} delay={delay} direction="up">
                  <MotionCard variant="glow">
                    <DepthLayer depth={2}>
                      <div style={{ padding: '24px', textAlign: 'center' }}>
                        <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '12px', color: 'var(--sentinel-text-secondary)' }}>
                          Delay: {delay}ms
                        </span>
                      </div>
                    </DepthLayer>
                  </MotionCard>
                </DataReveal>
              ))}
            </div>
          </ComponentPreview>
        </ShowcaseSection>
      </ScrollReveal>

      <ScrollReveal>
        <ShowcaseSection
          title="AtmosphericBackground"
          description="Full-page atmospheric layer with gradient effects"
        >
          <FadeIn direction="scale" delay={0.1}>
            <div style={{ width: '100%', height: '200px', borderRadius: 'var(--sentinel-radius-md)', overflow: 'hidden', border: '1px solid var(--sentinel-border-subtle)' }}>
              <AtmosphericBackground variant="intense" contained>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--sentinel-text-secondary)', fontSize: '14px' }}>
                  Atmospheric Background (Intense Variant)
                </div>
              </AtmosphericBackground>
            </div>
          </FadeIn>
        </ShowcaseSection>
      </ScrollReveal>

      {/* ============================================ */}
      {/* FINANCIAL CHARTS & ANALYTICS */}
      {/* ============================================ */}
      <FadeIn direction="up" delay={0.1}>
        <h2 style={sectionHeaderStyles}>Financial Charts & Analytics</h2>
      </FadeIn>

      <ScrollReveal>
        <ShowcaseSection
          title="FinancialLineChart"
          description="Investment-focused line chart with financial formatting"
        >
          <FadeIn direction="up" delay={0.1}>
            <DepthLayer depth={2}>
              <div style={{ padding: '24px' }}>
                <FinancialLineChart
                  data={financialData}
                  height={300}
                  enableArea
                  formatValue={(v) => `$${(v / 1000).toFixed(0)}K`}
                />
              </div>
            </DepthLayer>
          </FadeIn>
        </ShowcaseSection>
      </ScrollReveal>

      {/* ============================================ */}
      {/* INTEGRATED DASHBOARD EXAMPLE */}
      {/* ============================================ */}
      <FadeIn direction="up" delay={0.1}>
        <h2 style={sectionHeaderStyles}>Integrated Dashboard Example</h2>
      </FadeIn>

      <ScrollReveal>
        <ShowcaseSection
          title="SENTINEL Dashboard Preview"
          description="All components working together with full animation integration"
        >
          <FadeIn direction="up" delay={0.1}>
            <DepthLayer depth={3}>
              <div style={{ padding: '24px' }}>
                {/* Core Indicators Bar */}
                <div style={{ borderBottom: '1px solid var(--sentinel-border-subtle)', paddingBottom: '20px', marginBottom: '20px' }}>
                <StaggerList as="div" speed="fast" direction="left" className="flex items-center gap-6">
                  <MotionCard variant="glow">
                    <SystemPulse status="active" size="sm" />
                  </MotionCard>
                  <MotionCard variant="glow">
                    <MarketStateIndicator state="bullish" size="sm" />
                  </MotionCard>
                  <MotionCard variant="glow">
                    <RiskGauge level="moderate" value={35} size="sm" />
                  </MotionCard>
                  <MotionCard variant="glow">
                    <ConfidenceLevel level="high" percentage={88} size="sm" />
                  </MotionCard>
                </StaggerList>
                </div>

                {/* Main Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                  {/* Left Column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <FadeIn direction="left" delay={0.2}>
                      <FinancialLineChart
                        data={financialData}
                        height={250}
                        enableArea
                        formatValue={(v) => `$${(v / 1000).toFixed(0)}K`}
                      />
                    </FadeIn>
                    <FadeIn direction="left" delay={0.3}>
                      <MotionCard variant="glow">
                        <RecommendationCard
                          type="buy"
                          assetClass="stocks"
                          title="Increase Equity Exposure"
                          rationale="Market conditions favor growth. Consider 5-10% increase."
                          confidence={78}
                          timeframe="3-6 months"
                          priority="high"
                        />
                      </MotionCard>
                    </FadeIn>
                  </div>

                  {/* Right Column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <FadeIn direction="right" delay={0.2}>
                      <MotionCard variant="default">
                        <FactorWeight factors={sampleFactors.slice(0, 4)} maxVisible={4} />
                      </MotionCard>
                    </FadeIn>
                    <FadeIn direction="right" delay={0.3}>
                      <MotionCard variant="default">
                        <AllocationSummary allocations={sampleAllocations} />
                      </MotionCard>
                    </FadeIn>
                  </div>
                </div>
              </div>
            </DepthLayer>
          </FadeIn>
        </ShowcaseSection>
      </ScrollReveal>

      {/* ============================================ */}
      {/* COMPONENT REFERENCE */}
      {/* ============================================ */}
      <FadeIn direction="up" delay={0.1}>
        <h2 style={sectionHeaderStyles}>Component Reference</h2>
      </FadeIn>

      <ScrollReveal>
        <ShowcaseSection title="Available Components">
          <FadeIn direction="up" delay={0.1}>
            <DepthLayer depth={2}>
              <div style={{ padding: '24px', fontSize: '13px', color: 'var(--sentinel-text-secondary)', lineHeight: '2', fontFamily: 'var(--sentinel-font-primary)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                  <div>
                    <p style={{ color: 'var(--sentinel-accent-primary)', fontWeight: 500 }}>Level 1: Core</p>
                    <p>• MarketStateIndicator</p>
                    <p>• RiskGauge</p>
                    <p>• ConfidenceLevel</p>
                    <p>• SystemPulse</p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--sentinel-accent-primary)', fontWeight: 500 }}>Level 2: Context</p>
                    <p>• FactorWeight</p>
                    <p>• TrendIndicator</p>
                    <p>• HistoricalAlignment</p>
                    <p>• CyclePosition</p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--sentinel-accent-primary)', fontWeight: 500 }}>Level 3: Action</p>
                    <p>• RecommendationCard</p>
                    <p>• StockSuggestion</p>
                    <p>• RiskProfileSelector</p>
                    <p>• AllocationSummary</p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--sentinel-accent-primary)', fontWeight: 500 }}>Atmospheric</p>
                    <p>• AtmosphericBackground</p>
                    <p>• DepthLayer</p>
                    <p>• DataReveal</p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--sentinel-accent-primary)', fontWeight: 500 }}>Charts</p>
                    <p>• FinancialLineChart</p>
                    <p>• RadarChart</p>
                    <p>• RadialBar</p>
                    <p>• HeatMap</p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--sentinel-accent-primary)', fontWeight: 500 }}>Animations</p>
                    <p>• FadeIn</p>
                    <p>• StaggerList</p>
                    <p>• MotionCard</p>
                    <p>• ScrollReveal</p>
                  </div>
                </div>
              </div>
            </DepthLayer>
          </FadeIn>
        </ShowcaseSection>
      </ScrollReveal>
    </div>
  );
}

export default SentinelShowcase;
