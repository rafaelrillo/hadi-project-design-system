// Path: src/pages/charts/SankeyChartShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { SankeyChart } from '../../components/charts/echarts';
import type { SankeyData } from '../../components/charts/echarts';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const capitalFlowData: SankeyData = {
  nodes: [
    { name: 'Savings' },
    { name: 'Salary' },
    { name: 'Investments' },
    { name: 'Stocks' },
    { name: 'Bonds' },
    { name: 'Real Estate' },
    { name: 'Crypto' },
    { name: 'Dividends' },
    { name: 'Interest' },
  ],
  links: [
    { source: 'Salary', target: 'Savings', value: 3000 },
    { source: 'Salary', target: 'Investments', value: 5000 },
    { source: 'Savings', target: 'Investments', value: 2000 },
    { source: 'Investments', target: 'Stocks', value: 4000 },
    { source: 'Investments', target: 'Bonds', value: 2000 },
    { source: 'Investments', target: 'Real Estate', value: 500 },
    { source: 'Investments', target: 'Crypto', value: 500 },
    { source: 'Stocks', target: 'Dividends', value: 800 },
    { source: 'Bonds', target: 'Interest', value: 400 },
  ],
};

const portfolioRebalance: SankeyData = {
  nodes: [
    { name: 'Tech Stocks' },
    { name: 'Healthcare' },
    { name: 'Finance' },
    { name: 'Rebalance Pool' },
    { name: 'US Large Cap' },
    { name: 'International' },
    { name: 'Bonds' },
    { name: 'Cash' },
  ],
  links: [
    { source: 'Tech Stocks', target: 'Rebalance Pool', value: 5000 },
    { source: 'Healthcare', target: 'Rebalance Pool', value: 2000 },
    { source: 'Finance', target: 'Rebalance Pool', value: 1500 },
    { source: 'Rebalance Pool', target: 'US Large Cap', value: 3500 },
    { source: 'Rebalance Pool', target: 'International', value: 2500 },
    { source: 'Rebalance Pool', target: 'Bonds', value: 2000 },
    { source: 'Rebalance Pool', target: 'Cash', value: 500 },
  ],
};

const simpleFlow: SankeyData = {
  nodes: [
    { name: 'Income' },
    { name: 'Expenses' },
    { name: 'Savings' },
    { name: 'Investment' },
  ],
  links: [
    { source: 'Income', target: 'Expenses', value: 4000 },
    { source: 'Income', target: 'Savings', value: 2000 },
    { source: 'Savings', target: 'Investment', value: 1500 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function SankeyChartShowcase() {
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
          Sankey Chart
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          Flow diagram showing quantities between nodes. Perfect for capital flows,
          portfolio rebalancing, and any source-to-destination data relationships.
        </p>
      </header>

      {/* Capital Flow */}
      <ShowcaseSection
        title="Capital Flow"
        description="Track money flow from income to investments"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <SankeyChart data={capitalFlowData} title="Capital Flow" height={450} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Portfolio Rebalance */}
      <ShowcaseSection
        title="Portfolio Rebalance"
        description="Visualize asset reallocation"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <SankeyChart data={portfolioRebalance} title="Rebalancing Flow" height={400} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Vertical Orientation */}
      <ShowcaseSection
        title="Vertical Orientation"
        description="Top-to-bottom flow direction"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <SankeyChart data={simpleFlow} title="Budget Flow" height={450} orient="vertical" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Simple Flow */}
      <ShowcaseSection
        title="Simple Flow"
        description="Basic three-level flow"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <SankeyChart data={simpleFlow} height={300} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Custom Value Format */}
      <ShowcaseSection
        title="Custom Value Format"
        description="Format values as currency"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <SankeyChart
              data={capitalFlowData}
              title="Monthly Cash Flow"
              height={400}
              formatValue={(v) => `$${v.toLocaleString()}`}
            />
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
                { prop: 'data', type: 'SankeyData', default: 'required', desc: 'Object with nodes and links arrays' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'orient', type: "'horizontal' | 'vertical'", default: "'horizontal'", desc: 'Flow direction' },
                { prop: 'colors', type: 'string[]', default: 'chartPalette', desc: 'Custom color palette' },
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

export default SankeyChartShowcase;
