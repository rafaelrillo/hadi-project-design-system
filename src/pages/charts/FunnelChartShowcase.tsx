// Path: src/pages/charts/FunnelChartShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { FunnelChart } from '../../components/charts/echarts';
import type { FunnelDataPoint } from '../../components/charts/echarts';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const investmentFunnel: FunnelDataPoint[] = [
  { name: 'Prospects', value: 1000 },
  { name: 'Qualified Leads', value: 600 },
  { name: 'Proposals', value: 300 },
  { name: 'Negotiations', value: 150 },
  { name: 'Closed Deals', value: 80 },
];

const screeningProcess: FunnelDataPoint[] = [
  { name: 'Universe', value: 5000 },
  { name: 'Market Cap Filter', value: 2500 },
  { name: 'Liquidity Filter', value: 1200 },
  { name: 'Fundamental Screen', value: 400 },
  { name: 'Technical Screen', value: 150 },
  { name: 'Final Selection', value: 50 },
];

const portfolioFunnel: FunnelDataPoint[] = [
  { name: 'Total AUM', value: 100 },
  { name: 'Active Strategies', value: 75 },
  { name: 'Core Holdings', value: 50 },
  { name: 'Top Performers', value: 25 },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function FunnelChartShowcase() {
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
          Funnel Chart
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          Progressive narrowing visualization for conversion funnels, screening processes,
          and any sequential filtering of data.
        </p>
      </header>

      {/* Default */}
      <ShowcaseSection
        title="Default"
        description="Standard descending funnel"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <FunnelChart data={investmentFunnel} title="Sales Funnel" height={400} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Screening Process */}
      <ShowcaseSection
        title="Screening Process"
        description="Stock screening filter visualization"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <FunnelChart data={screeningProcess} title="Stock Screening" height={450} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Ascending Sort */}
      <ShowcaseSection
        title="Ascending Sort"
        description="Inverted funnel (pyramid)"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <FunnelChart data={portfolioFunnel} title="Portfolio Structure" height={350} sort="ascending" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* No Sort */}
      <ShowcaseSection
        title="No Sort"
        description="Maintain original data order"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <FunnelChart
              data={[
                { name: 'Step 1', value: 60 },
                { name: 'Step 2', value: 80 },
                { name: 'Step 3', value: 40 },
                { name: 'Step 4', value: 70 },
                { name: 'Step 5', value: 30 },
              ]}
              title="Process Steps"
              height={350}
              sort="none"
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Labels Inside */}
      <ShowcaseSection
        title="Labels Inside"
        description="Position labels inside the funnel segments"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <FunnelChart data={investmentFunnel} height={350} labelPosition="inside" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Custom Format */}
      <ShowcaseSection
        title="Custom Format"
        description="Format values as currency or percentage"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', width: '100%' }}>
            <div>
              <FunnelChart
                data={investmentFunnel}
                title="Revenue Funnel"
                height={350}
                formatValue={(v) => `$${v}K`}
              />
            </div>
            <div>
              <FunnelChart
                data={portfolioFunnel}
                title="Allocation %"
                height={350}
                formatValue={(v) => `${v}%`}
              />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Compact */}
      <ShowcaseSection
        title="Compact"
        description="Smaller funnel for dashboards"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ width: '250px' }}>
              <FunnelChart data={portfolioFunnel} height={250} labelPosition="inside" />
            </div>
            <div style={{ width: '250px' }}>
              <FunnelChart data={portfolioFunnel} height={250} sort="ascending" labelPosition="inside" />
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
                { prop: 'data', type: 'FunnelDataPoint[]', default: 'required', desc: 'Array of name/value pairs' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '400', desc: 'Chart height in pixels' },
                { prop: 'sort', type: "'descending' | 'ascending' | 'none'", default: "'descending'", desc: 'Sort order' },
                { prop: 'labelPosition', type: 'string', default: "'outer'", desc: 'Label position (inside/outer)' },
                { prop: 'showPercent', type: 'boolean', default: 'true', desc: 'Show percentage in labels' },
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

export default FunnelChartShowcase;
