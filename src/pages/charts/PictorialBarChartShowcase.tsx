// Path: src/pages/charts/PictorialBarChartShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { PictorialBarChart, pictorialSymbols } from '../../components/charts/echarts';
import type { PictorialBarDataPoint } from '../../components/charts/echarts';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const investorData: PictorialBarDataPoint[] = [
  { name: 'Retail', value: 35 },
  { name: 'Institutional', value: 45 },
  { name: 'Hedge Funds', value: 12 },
  { name: 'Banks', value: 8 },
];

const growthData: PictorialBarDataPoint[] = [
  { name: 'Q1', value: 15, color: '#4a9a7c' },
  { name: 'Q2', value: 22, color: '#5ba3a5' },
  { name: 'Q3', value: 18, color: '#7ecbcc' },
  { name: 'Q4', value: 28, color: '#5ba3a5' },
];

const comparisonData: PictorialBarDataPoint[] = [
  { name: 'Tech', value: 85 },
  { name: 'Health', value: 72 },
  { name: 'Finance', value: 65 },
  { name: 'Energy', value: 45 },
  { name: 'Consumer', value: 55 },
];

const walletData: PictorialBarDataPoint[] = [
  { name: 'Stocks', value: 60 },
  { name: 'Bonds', value: 25 },
  { name: 'Cash', value: 10 },
  { name: 'Crypto', value: 5 },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function PictorialBarChartShowcase() {
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
          PictorialBar Chart
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          Bar chart with custom symbols. Use built-in shapes or custom SVG paths
          to create visually engaging data representations.
        </p>
      </header>

      {/* Default - Round Rect */}
      <ShowcaseSection
        title="Default (Round Rectangle)"
        description="Basic pictorial bar with rounded rectangle symbols - bars fill based on value"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <PictorialBarChart
              data={investorData}
              title="Investor Distribution"
              height={350}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Circle */}
      <ShowcaseSection
        title="Circle Symbol"
        description="Circular symbols scale by value while maintaining aspect ratio"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <PictorialBarChart
              data={growthData}
              title="Quarterly Growth (%)"
              height={350}
              symbol={pictorialSymbols.circle}
              symbolSize={50}
              formatValue={(v) => `${v}%`}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Diamond */}
      <ShowcaseSection
        title="Diamond Symbol"
        description="Diamond shapes scale proportionally to data values"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <PictorialBarChart
              data={walletData}
              title="Portfolio Allocation"
              height={350}
              symbol={pictorialSymbols.diamond}
              symbolSize={50}
              formatValue={(v) => `${v}%`}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Horizontal */}
      <ShowcaseSection
        title="Horizontal"
        description="Horizontal orientation with bar fill"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <PictorialBarChart
              data={comparisonData}
              title="Sector Ratings"
              height={350}
              horizontal
              symbol={pictorialSymbols.roundRect}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Symbol Repeat */}
      <ShowcaseSection
        title="Symbol Repeat"
        description="Repeat symbols to show quantity (isotype visualization)"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <PictorialBarChart
              data={[
                { name: 'Jan', value: 5 },
                { name: 'Feb', value: 8 },
                { name: 'Mar', value: 6 },
                { name: 'Apr', value: 10 },
              ]}
              title="Monthly Trades"
              height={350}
              symbol={pictorialSymbols.rect}
              symbolRepeat
              symbolSize={[25, 25]}
              maxValue={12}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Triangle */}
      <ShowcaseSection
        title="Triangle Symbol"
        description="Triangle pointing up for growth metrics"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <PictorialBarChart
              data={growthData}
              title="Growth Indicators"
              height={350}
              symbol={pictorialSymbols.triangle}
              symbolSize={45}
              formatValue={(v) => `${v}%`}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Arrow */}
      <ShowcaseSection
        title="Arrow Symbol"
        description="Arrow symbols for directional data"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <PictorialBarChart
              data={investorData}
              title="Market Direction"
              height={350}
              symbol={pictorialSymbols.arrow}
              symbolSize={50}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Pin */}
      <ShowcaseSection
        title="Pin Symbol"
        description="Pin/marker style symbols"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <PictorialBarChart
              data={walletData}
              title="Asset Markers"
              height={350}
              symbol={pictorialSymbols.pin}
              symbolSize={55}
              formatValue={(v) => `${v}%`}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* All Basic Shapes Comparison */}
      <ShowcaseSection
        title="Shape Comparison"
        description="All built-in geometric shapes side by side - symbols scale by value"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', width: '100%' }}>
            <div>
              <PictorialBarChart
                data={walletData.slice(0, 3)}
                height={220}
                symbol={pictorialSymbols.circle}
                symbolSize={40}
                showLabels={false}
              />
              <p style={{ textAlign: 'center', color: 'var(--sentinel-text-tertiary)', fontSize: '12px', marginTop: '8px' }}>Circle</p>
            </div>
            <div>
              <PictorialBarChart
                data={walletData.slice(0, 3)}
                height={220}
                symbol={pictorialSymbols.diamond}
                symbolSize={40}
                showLabels={false}
              />
              <p style={{ textAlign: 'center', color: 'var(--sentinel-text-tertiary)', fontSize: '12px', marginTop: '8px' }}>Diamond</p>
            </div>
            <div>
              <PictorialBarChart
                data={walletData.slice(0, 3)}
                height={220}
                symbol={pictorialSymbols.roundRect}
                showLabels={false}
              />
              <p style={{ textAlign: 'center', color: 'var(--sentinel-text-tertiary)', fontSize: '12px', marginTop: '8px' }}>Round Rect</p>
            </div>
            <div>
              <PictorialBarChart
                data={walletData.slice(0, 3)}
                height={220}
                symbol={pictorialSymbols.triangle}
                symbolSize={40}
                showLabels={false}
              />
              <p style={{ textAlign: 'center', color: 'var(--sentinel-text-tertiary)', fontSize: '12px', marginTop: '8px' }}>Triangle</p>
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
                { prop: 'data', type: 'PictorialBarDataPoint[]', default: 'required', desc: 'Array of name/value pairs' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '350', desc: 'Chart height in pixels' },
                { prop: 'symbol', type: 'string', default: "'roundRect'", desc: 'Symbol shape (see pictorialSymbols)' },
                { prop: 'symbolSize', type: 'number | [w, h]', default: '30', desc: 'Symbol size in pixels' },
                { prop: 'symbolRepeat', type: 'boolean | number', default: 'false', desc: 'Repeat symbols (isotype)' },
                { prop: 'horizontal', type: 'boolean', default: 'false', desc: 'Horizontal orientation' },
                { prop: 'showLabels', type: 'boolean', default: 'true', desc: 'Show value labels' },
                { prop: 'showBackground', type: 'boolean', default: 'true', desc: 'Show ghost background bar' },
                { prop: 'maxValue', type: 'number', default: 'auto', desc: 'Maximum axis value' },
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

        {/* Available Symbols */}
        <div style={{ marginTop: '24px' }}>
          <h4 style={{ color: 'var(--sentinel-text-primary)', marginBottom: '12px', fontSize: '14px' }}>Available Symbols (pictorialSymbols)</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {Object.keys(pictorialSymbols).map((key) => (
              <span key={key} style={{
                padding: '4px 12px',
                background: 'var(--sentinel-bg-subtle)',
                borderRadius: 'var(--sentinel-radius-sm)',
                fontSize: '12px',
                fontFamily: 'var(--sentinel-font-mono)',
                color: 'var(--sentinel-text-secondary)',
              }}>
                {key}
              </span>
            ))}
          </div>
          <p style={{
            marginTop: '12px',
            fontSize: '12px',
            color: 'var(--sentinel-text-tertiary)',
            fontStyle: 'italic'
          }}>
            Note: Basic shapes (circle, rect, roundRect, triangle, diamond, pin, arrow) work best.
            Custom SVG path symbols (person, dollar, chart, growth, star) may require specific symbolSize tuning.
          </p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export default PictorialBarChartShowcase;
