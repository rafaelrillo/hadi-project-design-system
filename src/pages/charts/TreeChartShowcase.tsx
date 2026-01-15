// Path: src/pages/charts/TreeChartShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { TreeChart } from '../../components/charts/echarts';
import type { TreeNode } from '../../components/charts/echarts';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

const organizationTree: TreeNode = {
  name: 'Portfolio',
  children: [
    {
      name: 'Equities',
      children: [
        {
          name: 'US Large Cap',
          children: [
            { name: 'AAPL', value: 15 },
            { name: 'MSFT', value: 12 },
            { name: 'GOOGL', value: 10 },
          ],
        },
        {
          name: 'US Small Cap',
          children: [
            { name: 'ROKU', value: 3 },
            { name: 'SQ', value: 4 },
          ],
        },
        {
          name: 'International',
          children: [
            { name: 'TSM', value: 5 },
            { name: 'ASML', value: 4 },
          ],
        },
      ],
    },
    {
      name: 'Fixed Income',
      children: [
        { name: 'Treasury', value: 15 },
        { name: 'Corporate', value: 10 },
        { name: 'Municipal', value: 5 },
      ],
    },
    {
      name: 'Alternatives',
      children: [
        { name: 'Real Estate', value: 8 },
        { name: 'Commodities', value: 5 },
        { name: 'Crypto', value: 4 },
      ],
    },
  ],
};

const sectorHierarchy: TreeNode = {
  name: 'Market',
  children: [
    {
      name: 'Technology',
      children: [
        { name: 'Software' },
        { name: 'Hardware' },
        { name: 'Semiconductors' },
        { name: 'Cloud' },
      ],
    },
    {
      name: 'Healthcare',
      children: [
        { name: 'Pharma' },
        { name: 'Biotech' },
        { name: 'Medical Devices' },
      ],
    },
    {
      name: 'Finance',
      children: [
        { name: 'Banks' },
        { name: 'Insurance' },
        { name: 'Fintech' },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function TreeChartShowcase() {
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
          Tree Chart
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          Hierarchical tree visualization with expandable nodes. Supports orthogonal
          and radial layouts with multiple orientation options.
        </p>
      </header>

      {/* Left to Right */}
      <ShowcaseSection
        title="Left to Right"
        description="Default horizontal tree layout"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <TreeChart data={organizationTree} title="Portfolio Structure" height={500} orient="LR" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Top to Bottom */}
      <ShowcaseSection
        title="Top to Bottom"
        description="Vertical tree layout"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <TreeChart data={sectorHierarchy} title="Market Sectors" height={450} orient="TB" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Radial Layout */}
      <ShowcaseSection
        title="Radial Layout"
        description="Circular tree arrangement"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <TreeChart data={organizationTree} title="Portfolio Overview" height={550} layout="radial" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Right to Left */}
      <ShowcaseSection
        title="Right to Left"
        description="Reversed horizontal tree"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <TreeChart data={sectorHierarchy} height={400} orient="RL" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Without Labels */}
      <ShowcaseSection
        title="Without Labels"
        description="Compact tree without text"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', width: '100%' }}>
            <div>
              <TreeChart data={sectorHierarchy} height={350} showLabels={false} />
            </div>
            <div>
              <TreeChart data={sectorHierarchy} height={350} layout="radial" showLabels={false} />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Roam */}
      <ShowcaseSection
        title="With Pan & Zoom"
        description="Enable interactive navigation"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <TreeChart data={organizationTree} height={450} roam />
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
                { prop: 'data', type: 'TreeNode', default: 'required', desc: 'Root node with name, children, optional value' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '500', desc: 'Chart height in pixels' },
                { prop: 'layout', type: "'orthogonal' | 'radial'", default: "'orthogonal'", desc: 'Tree layout style' },
                { prop: 'orient', type: "'LR' | 'RL' | 'TB' | 'BT'", default: "'LR'", desc: 'Tree direction (orthogonal only)' },
                { prop: 'showLabels', type: 'boolean', default: 'true', desc: 'Show node labels' },
                { prop: 'roam', type: 'boolean', default: 'true', desc: 'Enable pan and zoom' },
                { prop: 'initialExpandLevel', type: 'number', default: '3', desc: 'Initial tree depth' },
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

export default TreeChartShowcase;
