// Path: src/pages/charts/GaugeChartShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { GaugeChart } from '../../components/charts/echarts';
import type { GaugeData } from '../../components/charts/echarts';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const riskScore: GaugeData = { value: 65, name: 'Risk Score' };
const lowRisk: GaugeData = { value: 25, name: 'Conservative' };
const highRisk: GaugeData = { value: 85, name: 'Aggressive' };
const performance: GaugeData = { value: 78, name: 'Performance' };
const completion: GaugeData = { value: 92, name: 'Completion' };

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function GaugeChartShowcase() {
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
          Gauge Chart
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          Radial gauge for KPIs and progress indicators. Multiple variants available
          including basic, progress, and grade styles with customizable color ranges.
        </p>
      </header>

      {/* Default */}
      <ShowcaseSection
        title="Default"
        description="Basic gauge with standard styling"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <GaugeChart data={riskScore} title="Risk Assessment" height={350} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Progress Variant */}
      <ShowcaseSection
        title="Progress"
        description="Simplified progress indicator"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <GaugeChart data={completion} title="Portfolio Diversification" height={350} variant="progress" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Score Variant */}
      <ShowcaseSection
        title="Score"
        description="Color-coded score sections"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <GaugeChart data={performance} title="Health Score" height={350} variant="score" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Risk Levels */}
      <ShowcaseSection
        title="Risk Levels"
        description="Different risk score visualizations"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', width: '100%' }}>
            <div>
              <GaugeChart data={lowRisk} title="Low Risk" height={280} variant="score" />
            </div>
            <div>
              <GaugeChart data={riskScore} title="Medium Risk" height={280} variant="score" />
            </div>
            <div>
              <GaugeChart data={highRisk} title="High Risk" height={280} variant="score" />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Custom Range */}
      <ShowcaseSection
        title="Custom Range"
        description="Gauge with custom min/max values"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <GaugeChart
              data={{ value: 750, name: 'Credit Score' }}
              title="Credit Rating"
              height={350}
              min={300}
              max={850}
              variant="score"
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Compact Dashboard */}
      <ShowcaseSection
        title="Compact Dashboard"
        description="Multiple compact gauges for dashboards"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', width: '100%' }}>
            <div>
              <GaugeChart data={{ value: 45, name: 'Volatility' }} height={180} variant="progress" />
            </div>
            <div>
              <GaugeChart data={{ value: 72, name: 'Sharpe' }} height={180} variant="progress" />
            </div>
            <div>
              <GaugeChart data={{ value: 88, name: 'Alpha' }} height={180} variant="progress" />
            </div>
            <div>
              <GaugeChart data={{ value: 35, name: 'Beta' }} height={180} variant="progress" />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Custom Format */}
      <ShowcaseSection
        title="Custom Format"
        description="Custom value formatting"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ width: '280px' }}>
              <GaugeChart
                data={{ value: 12.5, name: 'Return' }}
                height={280}
                variant="progress"
                formatValue={(v) => `${v}%`}
              />
            </div>
            <div style={{ width: '280px' }}>
              <GaugeChart
                data={{ value: 1.25, name: 'Sharpe Ratio' }}
                height={280}
                min={0}
                max={3}
                variant="score"
                formatValue={(v) => v.toFixed(2)}
              />
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
                { prop: 'data', type: 'GaugeData', default: 'required', desc: 'Value and name to display' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '300', desc: 'Chart height in pixels' },
                { prop: 'variant', type: "'default' | 'risk' | 'progress' | 'score'", default: "'default'", desc: 'Gauge style variant' },
                { prop: 'min', type: 'number', default: '0', desc: 'Minimum value' },
                { prop: 'max', type: 'number', default: '100', desc: 'Maximum value' },
                { prop: 'formatValue', type: '(v: number) => string', default: '-', desc: 'Value formatter function' },
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

export default GaugeChartShowcase;
