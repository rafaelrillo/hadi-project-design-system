// Path: src/pages/charts/BoxplotChartShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { BoxplotChart } from '../../components/charts/echarts';
import type { BoxplotData } from '../../components/charts/echarts';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const returnDistribution: BoxplotData[] = [
  { name: 'AAPL', value: [-8, -2, 3, 8, 15] },
  { name: 'MSFT', value: [-5, 0, 4, 10, 18] },
  { name: 'GOOGL', value: [-10, -4, 2, 7, 14] },
  { name: 'AMZN', value: [-12, -3, 5, 12, 22] },
  { name: 'META', value: [-15, -5, 0, 8, 18] },
];

const sectorComparison: BoxplotData[] = [
  { name: 'Tech', value: [-8, 2, 8, 15, 25] },
  { name: 'Healthcare', value: [-5, 0, 4, 8, 12] },
  { name: 'Finance', value: [-10, -2, 3, 8, 15] },
  { name: 'Energy', value: [-20, -8, 0, 10, 25] },
  { name: 'Utilities', value: [-3, 1, 3, 5, 8] },
];

const monthlyVolatility: BoxplotData[] = [
  { name: 'Jan', value: [5, 10, 15, 22, 30] },
  { name: 'Feb', value: [8, 12, 18, 25, 35] },
  { name: 'Mar', value: [10, 15, 22, 30, 45] },
  { name: 'Apr', value: [6, 10, 14, 20, 28] },
  { name: 'May', value: [4, 8, 12, 16, 22] },
  { name: 'Jun', value: [5, 9, 13, 18, 25] },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function BoxplotChartShowcase() {
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
          Boxplot Chart
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          Statistical distribution visualization showing median, quartiles, and outliers.
          Ideal for comparing return distributions, volatility ranges, and risk analysis.
        </p>
      </header>

      {/* Return Distribution */}
      <ShowcaseSection
        title="Return Distribution"
        description="Stock return distributions with outliers"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <BoxplotChart
              data={returnDistribution}
              title="Annual Return Distribution (%)"
              height={400}
              formatValue={(v) => `${v}%`}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Sector Comparison */}
      <ShowcaseSection
        title="Sector Comparison"
        description="Compare distributions across sectors"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <BoxplotChart
              data={sectorComparison}
              title="Sector Performance Spread"
              height={400}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Horizontal */}
      <ShowcaseSection
        title="Horizontal"
        description="Horizontal orientation for long labels"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <BoxplotChart
              data={returnDistribution}
              title="Return Distribution"
              height={400}
              horizontal
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Monthly Volatility */}
      <ShowcaseSection
        title="Time Series"
        description="Monthly volatility distribution"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <BoxplotChart
              data={monthlyVolatility}
              title="Monthly Volatility (VIX)"
              height={350}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Compact */}
      <ShowcaseSection
        title="Compact"
        description="Smaller boxplot for dashboard widgets"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', width: '100%' }}>
            <div>
              <BoxplotChart data={sectorComparison.slice(0, 4)} height={250} />
            </div>
            <div>
              <BoxplotChart data={monthlyVolatility.slice(0, 4)} height={250} />
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
                { prop: 'data', type: 'BoxplotData[]', default: 'required', desc: 'Array of boxplot data with values [min, Q1, median, Q3, max]' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'horizontal', type: 'boolean', default: 'false', desc: 'Horizontal orientation' },
                { prop: 'colors', type: 'string[]', default: 'chartPalette', desc: 'Custom color palette' },
                { prop: 'formatValue', type: '(v: number) => string', default: '-', desc: 'Value formatter' },
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

export default BoxplotChartShowcase;
