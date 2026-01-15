// Path: src/pages/charts/ThemeRiverChartShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { ThemeRiverChart } from '../../components/charts/echarts';
import type { ThemeRiverDataPoint } from '../../components/charts/echarts';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

function generateRiverData(): ThemeRiverDataPoint[] {
  const data: ThemeRiverDataPoint[] = [];
  const categories = ['Tech', 'Healthcare', 'Finance', 'Energy', 'Consumer'];
  const now = new Date();

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    categories.forEach((cat, idx) => {
      // Create flowing wave patterns
      const base = 20 + idx * 10;
      const wave = Math.sin((i + idx * 2) * 0.3) * 10;
      const value = Math.max(5, base + wave + Math.random() * 5);

      data.push({
        date: dateStr,
        value: Number(value.toFixed(1)),
        name: cat,
      });
    });
  }

  return data;
}

function generateMarketData(): ThemeRiverDataPoint[] {
  const data: ThemeRiverDataPoint[] = [];
  const now = new Date();

  for (let i = 60; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    // Simulate shifting market sentiment
    const phase = i / 20;
    const bullish = 40 + Math.sin(phase) * 20 + Math.random() * 10;
    const bearish = 30 - Math.sin(phase) * 15 + Math.random() * 10;
    const neutral = 100 - bullish - bearish;

    data.push({ date: dateStr, value: Number(bullish.toFixed(1)), name: 'Bullish' });
    data.push({ date: dateStr, value: Number(neutral.toFixed(1)), name: 'Neutral' });
    data.push({ date: dateStr, value: Number(bearish.toFixed(1)), name: 'Bearish' });
  }

  return data;
}

const sectorFlowData = generateRiverData();
const sentimentData = generateMarketData();

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function ThemeRiverChartShowcase() {
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
          ThemeRiver Chart
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          Stream graph showing proportions over time. Categories flow and expand/contract
          based on their relative values, creating a visual river effect.
        </p>
      </header>

      {/* Sector Flow */}
      <ShowcaseSection
        title="Sector Flow"
        description="Sector allocation changes over time"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <ThemeRiverChart data={sectorFlowData} title="Sector Allocation Flow" height={400} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Market Sentiment */}
      <ShowcaseSection
        title="Market Sentiment"
        description="Shifting sentiment proportions"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <ThemeRiverChart
              data={sentimentData}
              title="Market Sentiment Flow"
              height={350}
              colors={['#4a9a7c', '#5a8fb8', '#b85c5c']}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Custom Colors */}
      <ShowcaseSection
        title="Custom Colors"
        description="Theme-matched color palette"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <ThemeRiverChart
              data={sectorFlowData}
              title="Portfolio Distribution"
              height={350}
              colors={['#5ba3a5', '#7ecbcc', '#4a9a7c', '#c4a35a', '#8b7ec7']}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Compact */}
      <ShowcaseSection
        title="Compact"
        description="Smaller river chart for dashboards"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <ThemeRiverChart data={sentimentData} height={250} />
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
                { prop: 'data', type: 'ThemeRiverDataPoint[]', default: 'required', desc: 'Array of date, value, name data points' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '350', desc: 'Chart height in pixels' },
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

export default ThemeRiverChartShowcase;
