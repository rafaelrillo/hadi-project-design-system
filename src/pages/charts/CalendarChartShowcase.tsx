// Path: src/pages/charts/CalendarChartShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Calendar Chart
import React, { useMemo } from 'react';
import { ShowcaseSection } from '../../components/showcase';
import { CalendarChart } from '../../components/charts/echarts';
import type { CalendarDataPoint } from '../../components/charts/echarts';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────────────────────────────────────

function generateCalendarData(year: number, type: 'activity' | 'performance' = 'activity'): CalendarDataPoint[] {
  const data: CalendarDataPoint[] = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();
    const baseValue = dayOfWeek === 0 || dayOfWeek === 6 ? 0.3 : 1;

    if (type === 'activity') {
      const value = Math.floor(Math.random() * 10 * baseValue);
      if (value > 0 || Math.random() > 0.3) {
        data.push({ date: d.toISOString().split('T')[0], value });
      }
    } else {
      const value = Number(((Math.random() - 0.45) * 5).toFixed(2));
      data.push({ date: d.toISOString().split('T')[0], value });
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

function CalendarChartContent() {
  const { lightAngle } = useLightEngine();

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const LIGHT = {
    base: '#e0e5ec',
    shadowDark: 'hsl(220 15% 72%)',
    shadowLight: 'hsl(0 0% 100%)',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}`;
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px', padding: '24px', background: LIGHT.base, borderRadius: '15px',
    boxShadow: getNeuPanelShadow(20, 60), transition: 'box-shadow 50ms linear',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px', fontWeight: 700, color: 'var(--sentinel-accent-primary)', marginBottom: '8px',
    fontFamily: 'var(--sentinel-font-display)', textTransform: 'uppercase', letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px', color: 'var(--sentinel-text-secondary)', fontFamily: 'var(--sentinel-font-mono)',
    textTransform: 'uppercase', letterSpacing: '0.03em',
  };

  const chartContainerStyles: React.CSSProperties = {
    padding: '24px', background: LIGHT.base, borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24), transition: 'box-shadow 50ms linear',
  };

  const tableContainerStyles: React.CSSProperties = {
    padding: '20px', borderRadius: '15px', boxShadow: getNeuInsetShadow(5, 15),
    background: LIGHT.base, overflowX: 'auto', transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; CalendarChart_</h1>
        <p style={descStyles}>// Heatmap calendario para visualizar datos diarios</p>
      </header>

      <ShowcaseSection title="Activity Calendar" description="Trading activity heatmap">
        <div style={chartContainerStyles}>
          <CalendarChart data={activityData2024} year={2024} title="Trading Activity 2024" height={200} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Performance Calendar" description="Daily returns with diverging colors">
        <div style={chartContainerStyles}>
          <CalendarChart data={performanceData2024} year={2024} title="Daily Returns 2024" height={200} colorScheme="diverging" formatValue={(v) => `${v > 0 ? '+' : ''}${v}%`} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Multiple Years" description="Compare activity across years">
        <div style={chartContainerStyles}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <CalendarChart data={activityData2024} year={2024} title="2024" height={180} />
            <CalendarChart data={activityData2023} year={2023} title="2023" height={180} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Vertical Layout" description="Vertical calendar orientation">
        <div style={chartContainerStyles}>
          <div style={{ width: '100%', maxWidth: '200px', margin: '0 auto' }}>
            <CalendarChart data={activityData2024} year={2024} height={900} orient="vertical" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Compact" description="Smaller calendar for dashboards">
        <div style={chartContainerStyles}>
          <CalendarChart data={activityData2024} year={2024} height={150} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={tableContainerStyles}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'var(--sentinel-font-mono)' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--sentinel-accent-primary)', fontWeight: 600 }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--sentinel-accent-primary)', fontWeight: 600 }}>Type</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--sentinel-accent-primary)', fontWeight: 600 }}>Default</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--sentinel-accent-primary)', fontWeight: 600 }}>Description</th>
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
                <tr key={i}>
                  <td style={{ padding: '12px 16px', color: '#2D3436' }}>{row.prop}</td>
                  <td style={{ padding: '12px 16px', color: '#636E72' }}>{row.type}</td>
                  <td style={{ padding: '12px 16px', color: '#636E72' }}>{row.default}</td>
                  <td style={{ padding: '12px 16px', color: '#636E72' }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function CalendarChartShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <CalendarChartContent />
    </LightEngineProvider>
  );
}

export default CalendarChartShowcase;
