// Path: src/pages/charts/SunburstChartShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { SunburstChart } from '../../components/charts/echarts';
import type { SunburstNode } from '../../components/charts/echarts';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const portfolioHierarchy: SunburstNode = {
  name: 'Portfolio',
  children: [
    {
      name: 'Equities',
      value: 60,
      children: [
        {
          name: 'US Large Cap',
          value: 25,
          children: [
            { name: 'AAPL', value: 8 },
            { name: 'MSFT', value: 7 },
            { name: 'GOOGL', value: 5 },
            { name: 'AMZN', value: 5 },
          ],
        },
        {
          name: 'US Mid Cap',
          value: 15,
          children: [
            { name: 'SQ', value: 5 },
            { name: 'ROKU', value: 5 },
            { name: 'SNAP', value: 5 },
          ],
        },
        {
          name: 'International',
          value: 20,
          children: [
            { name: 'Developed', value: 12 },
            { name: 'Emerging', value: 8 },
          ],
        },
      ],
    },
    {
      name: 'Fixed Income',
      value: 30,
      children: [
        { name: 'Treasury', value: 15 },
        { name: 'Corporate', value: 10 },
        { name: 'Municipal', value: 5 },
      ],
    },
    {
      name: 'Alternatives',
      value: 10,
      children: [
        { name: 'Real Estate', value: 5 },
        { name: 'Commodities', value: 3 },
        { name: 'Crypto', value: 2 },
      ],
    },
  ],
};

const sectorData: SunburstNode = {
  name: 'Market',
  children: [
    {
      name: 'Technology',
      value: 35,
      children: [
        { name: 'Software', value: 15 },
        { name: 'Hardware', value: 10 },
        { name: 'Semiconductors', value: 10 },
      ],
    },
    {
      name: 'Healthcare',
      value: 20,
      children: [
        { name: 'Pharma', value: 12 },
        { name: 'Biotech', value: 8 },
      ],
    },
    {
      name: 'Finance',
      value: 18,
      children: [
        { name: 'Banks', value: 10 },
        { name: 'Insurance', value: 8 },
      ],
    },
    {
      name: 'Consumer',
      value: 15,
    },
    {
      name: 'Energy',
      value: 12,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function SunburstChartShowcase() {
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
          Sunburst Chart
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          Hierarchical data visualization in a radial layout. Perfect for showing
          portfolio breakdowns, organizational structures, and nested categories.
        </p>
      </header>

      {/* Default */}
      <ShowcaseSection
        title="Default"
        description="Basic sunburst with hierarchical data"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '550px', margin: '0 auto' }}>
            <SunburstChart data={[portfolioHierarchy]} title="Portfolio Breakdown" height={450} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Sector Breakdown */}
      <ShowcaseSection
        title="Sector Breakdown"
        description="Market sector hierarchy"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '550px', margin: '0 auto' }}>
            <SunburstChart data={[sectorData]} title="Market Sectors" height={450} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Without Labels */}
      <ShowcaseSection
        title="Without Labels"
        description="Clean view without text labels"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <SunburstChart data={[portfolioHierarchy]} height={400} showLabels={false} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Custom Radius */}
      <ShowcaseSection
        title="Custom Inner Radius"
        description="Adjusted inner radius for different looks"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ width: '300px' }}>
              <SunburstChart data={[sectorData]} height={300} innerRadius="10%" showLabels={false} />
              <p style={{ textAlign: 'center', color: 'var(--sentinel-text-tertiary)', fontSize: '12px', marginTop: '8px' }}>Inner: 10%</p>
            </div>
            <div style={{ width: '300px' }}>
              <SunburstChart data={[sectorData]} height={300} innerRadius="30%" showLabels={false} />
              <p style={{ textAlign: 'center', color: 'var(--sentinel-text-tertiary)', fontSize: '12px', marginTop: '8px' }}>Inner: 30%</p>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Compact Dashboard */}
      <ShowcaseSection
        title="Compact"
        description="Smaller charts for dashboard widgets"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ width: '220px' }}>
              <SunburstChart data={[portfolioHierarchy]} height={220} showLabels={false} />
            </div>
            <div style={{ width: '220px' }}>
              <SunburstChart data={[sectorData]} height={220} showLabels={false} />
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
                { prop: 'data', type: 'SunburstNode', default: 'required', desc: 'Hierarchical data with name, value, children' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'showLabels', type: 'boolean', default: 'true', desc: 'Show segment labels' },
                { prop: 'innerRadius', type: 'string', default: "'20%'", desc: 'Inner radius percentage' },
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

export default SunburstChartShowcase;
