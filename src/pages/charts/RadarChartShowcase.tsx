// Path: src/pages/charts/RadarChartShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { RadarChart } from '../../components/charts/echarts';
import type { RadarIndicator, RadarSeriesData } from '../../components/charts/echarts';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const riskIndicators: RadarIndicator[] = [
  { name: 'Volatility', max: 100 },
  { name: 'Liquidity', max: 100 },
  { name: 'Concentration', max: 100 },
  { name: 'Beta', max: 100 },
  { name: 'Drawdown', max: 100 },
  { name: 'Correlation', max: 100 },
];

const singleSeries: RadarSeriesData[] = [
  { name: 'Current Portfolio', value: [75, 85, 45, 60, 55, 70] },
];

const multiSeries: RadarSeriesData[] = [
  { name: 'Your Portfolio', value: [75, 85, 45, 60, 55, 70], color: '#5ba3a5' },
  { name: 'Benchmark', value: [60, 70, 60, 50, 65, 55], color: '#c4a35a' },
];

const stockIndicators: RadarIndicator[] = [
  { name: 'P/E Ratio', max: 50 },
  { name: 'P/B Ratio', max: 10 },
  { name: 'ROE', max: 40 },
  { name: 'Debt/Equity', max: 2 },
  { name: 'Revenue Growth', max: 30 },
  { name: 'Margin', max: 50 },
];

const stockComparison: RadarSeriesData[] = [
  { name: 'AAPL', value: [28, 35, 25, 1.2, 8, 25], color: '#5ba3a5' },
  { name: 'MSFT', value: [32, 12, 35, 0.4, 12, 35], color: '#7ecbcc' },
  { name: 'GOOGL', value: [25, 6, 28, 0.1, 15, 28], color: '#c4a35a' },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function RadarChartShowcase() {
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
          Radar Chart
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          Multi-dimensional comparison chart. Perfect for risk profiles,
          performance metrics, and comparative analysis across multiple axes.
        </p>
      </header>

      {/* Single Series */}
      <ShowcaseSection
        title="Single Series"
        description="Basic radar with one data series"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <RadarChart
              indicators={riskIndicators}
              data={singleSeries}
              title="Risk Profile"
              height={400}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Comparison */}
      <ShowcaseSection
        title="Comparison"
        description="Compare two or more data series"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <RadarChart
              indicators={riskIndicators}
              data={multiSeries}
              title="Portfolio vs Benchmark"
              height={400}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Multiple Stocks */}
      <ShowcaseSection
        title="Stock Comparison"
        description="Compare multiple stocks across metrics"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '550px', margin: '0 auto' }}>
            <RadarChart
              indicators={stockIndicators}
              data={stockComparison}
              title="Fundamental Analysis"
              height={450}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Area Fill */}
      <ShowcaseSection
        title="With Area Fill"
        description="Filled area for better visualization"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <RadarChart
              indicators={riskIndicators}
              data={singleSeries}
              title="Risk Assessment"
              height={400}
              fillOpacity={0.4}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Circle Shape */}
      <ShowcaseSection
        title="Circle Shape"
        description="Circular radar instead of polygon"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <RadarChart
              indicators={riskIndicators}
              data={multiSeries}
              title="Circular Comparison"
              height={400}
              shape="circle"
              fillOpacity={0.4}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Compact */}
      <ShowcaseSection
        title="Compact Size"
        description="Smaller charts for dashboards"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ width: '250px' }}>
              <RadarChart
                indicators={riskIndicators}
                data={singleSeries}
                height={250}
                fillOpacity={0.4}
              />
            </div>
            <div style={{ width: '250px' }}>
              <RadarChart
                indicators={riskIndicators}
                data={multiSeries}
                height={250}
                shape="circle"
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
                { prop: 'indicators', type: 'RadarIndicator[]', default: 'required', desc: 'Axis definitions with name and max value' },
                { prop: 'data', type: 'RadarSeriesData[]', default: 'required', desc: 'Array of data series' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'fillOpacity', type: 'number', default: '0.3', desc: 'Opacity of area fill' },
                { prop: 'shape', type: "'polygon' | 'circle'", default: "'polygon'", desc: 'Grid shape' },
                { prop: 'colors', type: 'string[]', default: 'chartPalette', desc: 'Custom color palette' },
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

export default RadarChartShowcase;
