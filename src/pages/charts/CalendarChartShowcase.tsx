// Path: src/pages/charts/CalendarChartShowcase.tsx
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { CalendarChart } from '../../components/charts/echarts';
import type { CalendarDataPoint } from '../../components/charts/echarts';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

function generateCalendarData(year: number, type: 'activity' | 'performance' = 'activity'): CalendarDataPoint[] {
  const data: CalendarDataPoint[] = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();
    // Weekends have less activity
    const baseValue = dayOfWeek === 0 || dayOfWeek === 6 ? 0.3 : 1;

    if (type === 'activity') {
      // Random activity level 0-10
      const value = Math.floor(Math.random() * 10 * baseValue);
      if (value > 0 || Math.random() > 0.3) {
        data.push({
          date: d.toISOString().split('T')[0],
          value,
        });
      }
    } else {
      // Performance: -5% to +5%
      const value = Number(((Math.random() - 0.45) * 5).toFixed(2));
      data.push({
        date: d.toISOString().split('T')[0],
        value,
      });
    }
  }

  return data;
}

const activityData2024 = generateCalendarData(2024, 'activity');
const performanceData2024 = generateCalendarData(2024, 'performance');
const activityData2023 = generateCalendarData(2023, 'activity');

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function CalendarChartShowcase() {
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
          Calendar Chart
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--sentinel-text-secondary)',
          fontFamily: 'var(--sentinel-font-sans)',
          maxWidth: '600px',
        }}>
          Heatmap calendar view for visualizing daily data across a year. Perfect for
          trading activity, performance tracking, and contribution patterns.
        </p>
      </header>

      {/* Default Activity */}
      <ShowcaseSection
        title="Activity Calendar"
        description="Trading activity heatmap"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <CalendarChart
              data={activityData2024}
              year={2024}
              title="Trading Activity 2024"
              height={200}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Performance Calendar */}
      <ShowcaseSection
        title="Performance Calendar"
        description="Daily returns with diverging colors"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <CalendarChart
              data={performanceData2024}
              year={2024}
              title="Daily Returns 2024"
              height={200}
              colorScheme="diverging"
              formatValue={(v) => `${v > 0 ? '+' : ''}${v}%`}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Multiple Years */}
      <ShowcaseSection
        title="Multiple Years"
        description="Compare activity across years"
      >
        <ComponentPreview>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <CalendarChart data={activityData2024} year={2024} title="2024" height={180} />
            <CalendarChart data={activityData2023} year={2023} title="2023" height={180} />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Vertical Orientation */}
      <ShowcaseSection
        title="Vertical Layout"
        description="Vertical calendar orientation"
      >
        <ComponentPreview>
          <div style={{ width: '100%', maxWidth: '200px' }}>
            <CalendarChart
              data={activityData2024}
              year={2024}
              height={900}
              orient="vertical"
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Compact */}
      <ShowcaseSection
        title="Compact"
        description="Smaller calendar for dashboards"
      >
        <ComponentPreview>
          <div style={{ width: '100%' }}>
            <CalendarChart data={activityData2024} year={2024} height={150} />
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
                { prop: 'data', type: 'CalendarDataPoint[]', default: 'required', desc: 'Array of date/value pairs' },
                { prop: 'year', type: 'number', default: 'current', desc: 'Year to display' },
                { prop: 'title', type: 'string', default: '-', desc: 'Chart title' },
                { prop: 'height', type: 'number', default: '180', desc: 'Chart height in pixels' },
                { prop: 'colorScheme', type: "'sequential' | 'diverging'", default: "'sequential'", desc: 'Color scale type' },
                { prop: 'orient', type: "'horizontal' | 'vertical'", default: "'horizontal'", desc: 'Calendar orientation' },
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

export default CalendarChartShowcase;
