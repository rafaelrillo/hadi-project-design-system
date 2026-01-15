// Path: src/pages/charts/PieChartShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { PieChart } from '../../components/charts/echarts';
import type { PieDataPoint } from '../../components/charts/echarts';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const allocationData: PieDataPoint[] = [
  { name: 'US Stocks', value: 45 },
  { name: 'International', value: 20 },
  { name: 'Bonds', value: 20 },
  { name: 'Real Estate', value: 10 },
  { name: 'Cash', value: 5 },
];

const sectorData: PieDataPoint[] = [
  { name: 'Technology', value: 32, color: '#5ba3a5' },
  { name: 'Healthcare', value: 18, color: '#7ecbcc' },
  { name: 'Finance', value: 15, color: '#4a9a7c' },
  { name: 'Consumer', value: 12, color: '#5a8fb8' },
  { name: 'Energy', value: 10, color: '#c4a35a' },
  { name: 'Materials', value: 8, color: '#8b7ec7' },
  { name: 'Other', value: 5, color: '#c47a5a' },
];

const simpleData: PieDataPoint[] = [
  { name: 'Stocks', value: 60 },
  { name: 'Bonds', value: 30 },
  { name: 'Cash', value: 10 },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function PieChartShowcase() {
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
          Pie Chart
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          Circular charts for displaying proportions. Supports pie, donut, and rose variants
          with customizable labels and legends.
        </p>
      </header>

      {/* Default Pie */}
      <ShowcaseSection
        title="Default Pie"
        description="Basic pie chart"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <PieChart data={allocationData} title="Portfolio Allocation" height={400} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Donut */}
      <ShowcaseSection
        title="Donut"
        description="Pie with inner radius for center content"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <PieChart data={allocationData} title="Asset Allocation" height={400} variant="donut" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Rose */}
      <ShowcaseSection
        title="Rose (Nightingale)"
        description="Radius varies by value for emphasis"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <PieChart data={sectorData} title="Sector Distribution" height={400} variant="rose" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Inner Label */}
      <ShowcaseSection
        title="Donut with Center Label"
        description="Display aggregate value in center"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <PieChart
              data={simpleData}
              title="Allocation"
              height={400}
              variant="donut"
              centerLabel="Total"
              centerValue="$125,000"
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Custom Colors */}
      <ShowcaseSection
        title="Custom Colors"
        description="Per-segment custom coloring"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <PieChart data={sectorData} title="Sector Breakdown" height={400} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* No Labels */}
      <ShowcaseSection
        title="Without Labels"
        description="Clean look without slice labels"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <PieChart data={allocationData} height={350} showLabels={false} />
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
            <div style={{ width: '200px' }}>
              <PieChart data={simpleData} height={200} showLabels={false} />
            </div>
            <div style={{ width: '200px' }}>
              <PieChart data={simpleData} height={200} variant="donut" showLabels={false} />
            </div>
            <div style={{ width: '200px' }}>
              <PieChart data={simpleData} height={200} variant="rose" showLabels={false} />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Side by Side Comparison */}
      <ShowcaseSection
        title="Variants Comparison"
        description="All three variants side by side"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', width: '100%' }}>
            <div>
              <PieChart data={allocationData} title="Pie" height={300} variant="pie" />
            </div>
            <div>
              <PieChart data={allocationData} title="Donut" height={300} variant="donut" />
            </div>
            <div>
              <PieChart data={allocationData} title="Rose" height={300} variant="rose" />
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
                { prop: 'data', type: 'PieDataPoint[]', default: 'required', desc: 'Array of segments with name and value' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '350', desc: 'Chart height in pixels' },
                { prop: 'variant', type: "'pie' | 'donut' | 'rose'", default: "'pie'", desc: 'Chart variant style' },
                { prop: 'showLabels', type: 'boolean', default: 'true', desc: 'Show segment labels' },
                { prop: 'centerLabel', type: 'string', default: '-', desc: 'Center label (donut only)' },
                { prop: 'centerValue', type: 'string', default: '-', desc: 'Center value (donut only)' },
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

export default PieChartShowcase;
