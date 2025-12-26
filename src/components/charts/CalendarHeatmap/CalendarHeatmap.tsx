// Path: src/components/charts/CalendarHeatmap/CalendarHeatmap.tsx
import { ResponsiveCalendar } from '@nivo/calendar';
import { sentinelChartTheme } from '../theme';
import styles from './CalendarHeatmap.module.css';

export interface CalendarDatum {
  day: string;  // Format: YYYY-MM-DD
  value: number;
}

export interface CalendarHeatmapProps {
  data: CalendarDatum[];
  from: string;  // Start date: YYYY-MM-DD
  to: string;    // End date: YYYY-MM-DD
  height?: number;
  colorScheme?: 'oranges' | 'greens' | 'blues';
  emptyColor?: string;
  direction?: 'horizontal' | 'vertical';
  yearSpacing?: number;
  monthSpacing?: number;
  daySpacing?: number;
  className?: string;
}

const colorSchemes = {
  oranges: ['#1a1a1a', '#4d2600', '#993d00', '#cc5200', '#FF6600'],
  greens: ['#1a1a1a', '#003d00', '#006600', '#00b300', '#00FF41'],
  blues: ['#1a1a1a', '#003366', '#004d99', '#0080cc', '#00BFFF']
};

export function CalendarHeatmap({
  data,
  from,
  to,
  height = 300,
  colorScheme = 'oranges',
  emptyColor = '#1a1a1a',
  direction = 'horizontal',
  yearSpacing = 40,
  monthSpacing = 0,
  daySpacing = 4,
  className = ''
}: CalendarHeatmapProps) {
  const getClassName = (): string => {
    const classes = [styles.container];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  if (!data || data.length === 0) {
    return (
      <div className={getClassName()} style={{ height: `${height}px` }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'var(--sentinel-text-tertiary)',
          fontFamily: 'var(--sentinel-font-primary)',
          fontSize: '14px'
        }}>
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className={getClassName()} style={{ height: `${height}px` }}>
      <ResponsiveCalendar
        data={data}
        from={from}
        to={to}
        emptyColor={emptyColor}
        colors={colorSchemes[colorScheme]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        direction={direction}
        yearSpacing={yearSpacing}
        monthSpacing={monthSpacing}
        daySpacing={daySpacing}
        monthBorderColor="transparent"
        dayBorderWidth={1}
        dayBorderColor="#000000"
        theme={sentinelChartTheme}
      />
    </div>
  );
}
