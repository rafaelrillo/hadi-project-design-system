// Path: src/pages/charts/EffectScatterChartShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { EffectScatterChart } from '../../components/charts/echarts';
import type { EffectScatterDataPoint, EffectScatterSeriesData } from '../../components/charts/echarts';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const highlightData: EffectScatterDataPoint[] = [
  { x: 15, y: 25, value: 5, name: 'AAPL - Strong Buy' },
  { x: 45, y: 35, value: 3, name: 'NVDA - Momentum' },
  { x: 75, y: 55, value: 4, name: 'TSLA - Breakout' },
  { x: 30, y: 65, value: 2, name: 'MSFT - Support Level' },
];

const alertPoints: EffectScatterDataPoint[] = [
  { x: 20, y: 80, value: 5, name: 'Overbought Alert' },
  { x: 80, y: 20, value: 5, name: 'Oversold Alert' },
  { x: 50, y: 50, value: 3, name: 'Breakout Signal' },
];

const multiSeriesData: EffectScatterSeriesData[] = [
  {
    name: 'Strong Signals',
    data: [
      { x: 10, y: 85 },
      { x: 25, y: 90 },
      { x: 40, y: 88 },
    ],
    color: '#4a9a7c',
    showEffect: true,
  },
  {
    name: 'Moderate Signals',
    data: [
      { x: 50, y: 60 },
      { x: 65, y: 55 },
      { x: 80, y: 65 },
    ],
    color: '#c4a35a',
    showEffect: true,
  },
  {
    name: 'Weak Signals',
    data: [
      { x: 30, y: 25 },
      { x: 55, y: 20 },
      { x: 75, y: 30 },
    ],
    color: '#b85c5c',
    showEffect: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function EffectScatterChartShowcase() {
  return (
    <div>
      {/* Page Header */}
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 600,
          color: 'var(--sentinel-text-primary)',
          marginBottom: '8px',
          fontFamily: 'var(--sentinel-font-display)',
        }}>
          EffectScatter Chart
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          Scatter chart with animated ripple effects. Perfect for highlighting important
          data points, alerts, signals, and attention-drawing visualizations.
        </p>
      </header>

      {/* Trading Signals */}
      <ShowcaseSection
        title="Trading Signals"
        description="Highlight important trading signals with ripple effect"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <EffectScatterChart
              data={highlightData}
              title="Signal Alerts"
              xAxisLabel="RSI"
              yAxisLabel="Volume Score"
              height={400}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Alert Points */}
      <ShowcaseSection
        title="Alert Points"
        description="Overbought/oversold alerts"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <EffectScatterChart
              data={alertPoints}
              title="Market Alerts"
              xAxisLabel="Time"
              yAxisLabel="Price Level"
              height={400}
              rippleScale={5}
              ripplePeriod={2}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Multi-Series */}
      <ShowcaseSection
        title="Multi-Series with Selective Effects"
        description="Different series with varying effect visibility"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <EffectScatterChart
              data={multiSeriesData}
              title="Signal Strength Analysis"
              xAxisLabel="Confidence"
              yAxisLabel="Signal Strength"
              height={450}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Emphasis Only */}
      <ShowcaseSection
        title="Effect on Hover Only"
        description="Ripple effect shows only on emphasis/hover"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <EffectScatterChart
              data={highlightData}
              title="Hover for Effect"
              height={350}
              showAllEffects={false}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Custom Ripple */}
      <ShowcaseSection
        title="Custom Ripple Settings"
        description="Adjust ripple scale and period"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', width: '100%' }}>
            <div>
              <EffectScatterChart
                data={alertPoints}
                height={300}
                rippleScale={2}
                ripplePeriod={4}
              />
              <p style={{ textAlign: 'center', color: 'var(--sentinel-text-tertiary)', fontSize: '12px', marginTop: '8px' }}>Scale: 2, Period: 4s</p>
            </div>
            <div>
              <EffectScatterChart
                data={alertPoints}
                height={300}
                rippleScale={6}
                ripplePeriod={1.5}
              />
              <p style={{ textAlign: 'center', color: 'var(--sentinel-text-tertiary)', fontSize: '12px', marginTop: '8px' }}>Scale: 6, Period: 1.5s</p>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* API Reference */}
      <ShowcaseSection title="API Reference">
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
            fontFamily: 'var(--sentinel-font-mono)',
          }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--sentinel-border-default)' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--sentinel-text-secondary)' }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--sentinel-text-secondary)' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--sentinel-text-secondary)' }}>Default</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--sentinel-text-secondary)' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prop: 'data', type: 'EffectScatterDataPoint[] | EffectScatterSeriesData[]', default: 'required', desc: 'Single or multi-series data' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'xAxisLabel', type: 'string', default: '-', desc: 'X-axis label' },
                { prop: 'yAxisLabel', type: 'string', default: '-', desc: 'Y-axis label' },
                { prop: 'effectType', type: "'ripple' | 'none'", default: "'ripple'", desc: 'Animation effect type' },
                { prop: 'rippleScale', type: 'number', default: '3', desc: 'Ripple scale multiplier' },
                { prop: 'ripplePeriod', type: 'number', default: '3', desc: 'Ripple animation period in seconds' },
                { prop: 'showAllEffects', type: 'boolean', default: 'true', desc: 'Show effects on render vs hover' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--sentinel-border-subtle)' }}>
                  <td style={{ padding: '12px 16px', color: 'var(--sentinel-accent-primary)' }}>{row.prop}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--sentinel-text-tertiary)' }}>{row.type}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--sentinel-text-tertiary)' }}>{row.default}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--sentinel-text-secondary)' }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export default EffectScatterChartShowcase;
