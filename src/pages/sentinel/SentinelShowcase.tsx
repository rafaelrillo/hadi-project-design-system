// Path: src/pages/sentinel/SentinelShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Showcase
import React, { useState, useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import {
  MarketStateIndicator,
  RiskGauge,
  ConfidenceLevel,
  SystemPulse,
} from '../../components/organisms/sentinel';
import {
  AtmosphericBackground,
  DepthLayer,
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
import { LineChart } from '../../components/charts/echarts/LineChart';
import type { MarketState, RiskLevel } from '../../components/organisms/sentinel';
import type { RiskProfile } from '../../components/molecules/sentinel';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const financialData = [
  {
    id: 'portfolio-value',
    name: 'Portfolio Value',
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

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function SentinelShowcaseContent() {
  const [riskProfile, setRiskProfile] = useState<RiskProfile>('balanced');
  const { lightAngle } = useLightEngine();

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const MARBLE = {
    base: '#d5d8dc',
    shadowDark: '#a8acb3',
    shadowLight: '#ffffff',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}`;
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px', padding: '24px', background: MARBLE.base, borderRadius: '15px',
    boxShadow: getNeuPanelShadow(20, 60), transition: 'box-shadow 50ms linear',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px', fontWeight: 700, color: 'var(--sentinel-accent-primary)', marginBottom: '8px',
    fontFamily: 'var(--sentinel-font-display)', textTransform: 'uppercase', letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px', color: 'var(--sentinel-text-secondary)', fontFamily: 'var(--sentinel-font-mono)',
    textTransform: 'uppercase', letterSpacing: '0.03em',
  };

  const sectionHeaderStyles: React.CSSProperties = {
    fontSize: '14px', fontWeight: 600, color: 'var(--sentinel-accent-primary)', marginTop: '48px',
    marginBottom: '24px', fontFamily: 'var(--sentinel-font-mono)', letterSpacing: '0.05em',
    textTransform: 'uppercase', paddingBottom: '12px',
  };

  const contentContainerStyles: React.CSSProperties = {
    padding: '24px', background: MARBLE.base, borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear',
  };

  const insetContainerStyles: React.CSSProperties = {
    padding: '20px', borderRadius: '15px', boxShadow: getNeuInsetShadow(5, 15),
    background: MARBLE.base, transition: 'box-shadow 50ms linear',
  };

  const lightEngineBoxBase: React.CSSProperties = {
    width: '120px', height: '120px', backgroundColor: MARBLE.base, borderRadius: '15px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
    gap: '6px', boxShadow: getNeuPanelShadow(6, 18), transition: 'box-shadow 50ms linear, transform 200ms ease',
  };

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; SENTINEL_Components_</h1>
        <p style={descStyles}>// Librería completa de componentes para análisis de inversiones</p>
      </header>

      {/* LIGHT ENGINE DEMONSTRATION */}
      <h2 style={sectionHeaderStyles}>&gt; Light_Engine_System</h2>

      <ShowcaseSection title="Unified Light Source" description="All shadows share the same light direction with consistent offset ratios">
        <div style={contentContainerStyles}>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={lightEngineBoxBase}>
                <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--sentinel-text-primary)' }}>Layered</span>
                <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '10px', color: '#636E72' }}>5 capas</span>
              </div>
              <p style={{ marginTop: '8px', fontSize: '11px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>Cards, Panels</p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ ...lightEngineBoxBase, boxShadow: getNeuInsetShadow(4, 12) }}>
                <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--sentinel-text-primary)' }}>Inset</span>
                <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '10px', color: '#636E72' }}>recessed</span>
              </div>
              <p style={{ marginTop: '8px', fontSize: '11px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>Inputs, Wells</p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ ...lightEngineBoxBase, background: 'rgba(91, 163, 165, 0.1)', border: '1px solid rgba(91, 163, 165, 0.2)' }}>
                <span style={{ fontFamily: 'var(--sentinel-font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--sentinel-text-primary)' }}>Glass</span>
                <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '10px', color: '#636E72' }}>+ reflection</span>
              </div>
              <p style={{ marginTop: '8px', fontSize: '11px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)' }}>Overlays, Modals</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* LEVEL 1: CORE INDICATORS */}
      <h2 style={sectionHeaderStyles}>&gt; Level_1:_Core_Indicators</h2>

      <ShowcaseSection title="MarketStateIndicator" description="Visual representation of current market outlook">
        <div style={contentContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {marketStates.map((state) => (
              <div key={state} style={{ padding: '16px', borderRadius: '12px', boxShadow: getNeuPanelShadow(4, 12), background: MARBLE.base }}>
                <MarketStateIndicator state={state} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="RiskGauge" description="Segmented gauge showing systemic risk levels">
        <div style={contentContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {riskLevels.map((level, index) => (
              <div key={level} style={{ padding: '12px', borderRadius: '12px', boxShadow: getNeuPanelShadow(4, 12), background: MARBLE.base }}>
                <RiskGauge level={level} value={(index + 1) * 20 - 10} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="ConfidenceLevel & SystemPulse" description="System confidence and operational status indicators">
        <div style={contentContainerStyles}>
          <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <ConfidenceLevel level="high" percentage={92} showPercentage size="sm" />
            <ConfidenceLevel level="medium" percentage={65} showPercentage size="sm" />
            <div style={{ display: 'flex', gap: '24px' }}>
              <SystemPulse status="active" />
              <SystemPulse status="processing" />
              <SystemPulse status="idle" />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* LEVEL 2: CONTEXT COMPONENTS */}
      <h2 style={sectionHeaderStyles}>&gt; Level_2:_Context_Components</h2>

      <ShowcaseSection title="FactorWeight" description="Shows which factors weigh most in the current analysis">
        <div style={contentContainerStyles}>
          <div style={{ maxWidth: '500px' }}>
            <FactorWeight factors={sampleFactors} maxVisible={4} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="TrendIndicator" description="Simple trend display for specific metrics">
        <div style={contentContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', borderRadius: '12px', boxShadow: getNeuPanelShadow(4, 12), background: MARBLE.base }}>
              <TrendIndicator label="S&P 500" value="4,892.31" trend="up" change="+1.2%" period="vs yesterday" />
            </div>
            <div style={{ padding: '16px', borderRadius: '12px', boxShadow: getNeuPanelShadow(4, 12), background: MARBLE.base }}>
              <TrendIndicator label="NASDAQ" value="15,628.95" trend="down" change="-0.8%" period="vs yesterday" />
            </div>
            <div style={{ padding: '16px', borderRadius: '12px', boxShadow: getNeuPanelShadow(4, 12), background: MARBLE.base }}>
              <TrendIndicator label="VIX" value="18.42" trend="stable" change="+0.1%" period="vs last week" />
            </div>
            <div style={{ padding: '16px', borderRadius: '12px', boxShadow: getNeuPanelShadow(4, 12), background: MARBLE.base }}>
              <TrendIndicator label="10Y Treasury" value="4.25%" trend="up" change="+0.05%" />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="HistoricalAlignment" description="Compare current state with historical patterns">
        <div style={contentContainerStyles}>
          <div style={{ maxWidth: '500px' }}>
            <HistoricalAlignment periods={historicalPeriods} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="CyclePosition" description="Shows position in the economic cycle">
        <div style={contentContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            <div style={{ padding: '16px', borderRadius: '12px', boxShadow: getNeuPanelShadow(4, 12), background: MARBLE.base }}>
              <CyclePosition currentPhase="expansion" confidence={78} />
            </div>
            <div style={{ padding: '16px', borderRadius: '12px', boxShadow: getNeuPanelShadow(4, 12), background: MARBLE.base }}>
              <CyclePosition currentPhase="peak" confidence={65} description="Approaching maximum output, prepare for transition" />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* LEVEL 3: ACTION COMPONENTS */}
      <h2 style={sectionHeaderStyles}>&gt; Level_3:_Action_Components</h2>

      <ShowcaseSection title="RecommendationCard" description="Primary investment recommendation cards">
        <div style={contentContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            <div style={{ padding: '16px', borderRadius: '12px', boxShadow: getNeuPanelShadow(4, 12), background: MARBLE.base }}>
              <RecommendationCard type="buy" assetClass="stocks" title="Increase Equity Exposure" rationale="Market conditions favor growth stocks with strong fundamentals. Consider increasing allocation by 5-10%." confidence={78} timeframe="3-6 months" priority="high" />
            </div>
            <div style={{ padding: '16px', borderRadius: '12px', boxShadow: getNeuPanelShadow(4, 12), background: MARBLE.base }}>
              <RecommendationCard type="hold" assetClass="bonds" title="Maintain Bond Position" rationale="Current yield curve suggests stability. No immediate action required." confidence={65} timeframe="6-12 months" priority="medium" />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="StockSuggestion" description="Individual stock/asset suggestions">
        <div style={contentContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div style={{ padding: '12px', borderRadius: '12px', boxShadow: getNeuPanelShadow(4, 12), background: MARBLE.base }}>
              <StockSuggestion symbol="AAPL" name="Apple Inc." action="buy" currentPrice={178.23} targetPrice={195.00} confidence={72} sector="Technology" reasoning="Strong iPhone sales and services growth." />
            </div>
            <div style={{ padding: '12px', borderRadius: '12px', boxShadow: getNeuPanelShadow(4, 12), background: MARBLE.base }}>
              <StockSuggestion symbol="MSFT" name="Microsoft Corp." action="hold" currentPrice={378.91} targetPrice={390.00} confidence={68} sector="Technology" />
            </div>
            <div style={{ padding: '12px', borderRadius: '12px', boxShadow: getNeuPanelShadow(4, 12), background: MARBLE.base }}>
              <StockSuggestion symbol="NVDA" name="NVIDIA Corp." action="buy" currentPrice={495.22} targetPrice={550.00} confidence={81} sector="Semiconductors" reasoning="AI demand continues to drive growth." />
            </div>
            <div style={{ padding: '12px', borderRadius: '12px', boxShadow: getNeuPanelShadow(4, 12), background: MARBLE.base }}>
              <StockSuggestion symbol="XOM" name="Exxon Mobil" action="sell" currentPrice={104.56} targetPrice={95.00} confidence={62} sector="Energy" />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="RiskProfileSelector" description="User risk profile selection">
        <div style={contentContainerStyles}>
          <div style={{ maxWidth: '600px' }}>
            <RiskProfileSelector value={riskProfile} onChange={setRiskProfile} showDescriptions />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="AllocationSummary" description="Portfolio allocation breakdown">
        <div style={contentContainerStyles}>
          <div style={{ maxWidth: '500px' }}>
            <AllocationSummary allocations={sampleAllocations} showChanges />
          </div>
        </div>
      </ShowcaseSection>

      {/* ATMOSPHERIC COMPONENTS */}
      <h2 style={sectionHeaderStyles}>&gt; Atmospheric_Components</h2>

      <ShowcaseSection title="DepthLayer" description="Z-axis depth containers with 5 elevation levels">
        <div style={contentContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {([1, 2, 3, 4, 5] as const).map((depth) => (
              <div key={depth} style={{ padding: '8px', borderRadius: '12px', boxShadow: getNeuPanelShadow(depth * 2, depth * 6), background: MARBLE.base }}>
                <DepthLayer depth={depth}>
                  <div style={{ padding: '24px', textAlign: 'center' }}>
                    <span style={{ fontFamily: 'var(--sentinel-font-mono)', fontSize: '12px', color: '#636E72' }}>Depth {depth}</span>
                  </div>
                </DepthLayer>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="AtmosphericBackground" description="Full-page atmospheric layer with gradient effects">
        <div style={contentContainerStyles}>
          <div style={{ width: '100%', height: '200px', borderRadius: '12px', overflow: 'hidden', boxShadow: getNeuInsetShadow(5, 15) }}>
            <AtmosphericBackground variant="intense" contained>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#636E72', fontSize: '14px', fontFamily: 'var(--sentinel-font-mono)' }}>
                Atmospheric Background (Intense Variant)
              </div>
            </AtmosphericBackground>
          </div>
        </div>
      </ShowcaseSection>

      {/* FINANCIAL CHARTS */}
      <h2 style={sectionHeaderStyles}>&gt; Financial_Charts</h2>

      <ShowcaseSection title="LineChart (ECharts)" description="Investment-focused line chart with financial formatting">
        <div style={contentContainerStyles}>
          <LineChart data={financialData} height={300} enableArea smooth formatValue={(v) => `$${(v / 1000).toFixed(0)}K`} />
        </div>
      </ShowcaseSection>

      {/* COMPONENT REFERENCE */}
      <h2 style={sectionHeaderStyles}>&gt; Component_Reference</h2>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={insetContainerStyles}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', fontSize: '13px', color: '#636E72', lineHeight: '2', fontFamily: 'var(--sentinel-font-mono)' }}>
            <div>
              <p style={{ color: 'var(--sentinel-accent-primary)', fontWeight: 600 }}>Level 1: Core</p>
              <p>• MarketStateIndicator</p>
              <p>• RiskGauge</p>
              <p>• ConfidenceLevel</p>
              <p>• SystemPulse</p>
            </div>
            <div>
              <p style={{ color: 'var(--sentinel-accent-primary)', fontWeight: 600 }}>Level 2: Context</p>
              <p>• FactorWeight</p>
              <p>• TrendIndicator</p>
              <p>• HistoricalAlignment</p>
              <p>• CyclePosition</p>
            </div>
            <div>
              <p style={{ color: 'var(--sentinel-accent-primary)', fontWeight: 600 }}>Level 3: Action</p>
              <p>• RecommendationCard</p>
              <p>• StockSuggestion</p>
              <p>• RiskProfileSelector</p>
              <p>• AllocationSummary</p>
            </div>
            <div>
              <p style={{ color: 'var(--sentinel-accent-primary)', fontWeight: 600 }}>Atmospheric</p>
              <p>• AtmosphericBackground</p>
              <p>• DepthLayer</p>
              <p>• DataReveal</p>
            </div>
            <div>
              <p style={{ color: 'var(--sentinel-accent-primary)', fontWeight: 600 }}>Charts</p>
              <p>• FinancialLineChart</p>
              <p>• RadarChart</p>
              <p>• RadialBar</p>
              <p>• HeatMap</p>
            </div>
            <div>
              <p style={{ color: 'var(--sentinel-accent-primary)', fontWeight: 600 }}>Animations</p>
              <p>• FadeIn</p>
              <p>• StaggerList</p>
              <p>• MotionCard</p>
              <p>• ScrollReveal</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function SentinelShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <SentinelShowcaseContent />
    </LightEngineProvider>
  );
}

export default SentinelShowcase;
