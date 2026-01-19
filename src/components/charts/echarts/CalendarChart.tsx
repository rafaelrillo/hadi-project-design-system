// Path: src/components/charts/echarts/CalendarChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { fingColors, sequentialColors, divergingColors } from './fingTheme';
import type { CalendarDataPoint, BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type CalendarColorScheme = 'sequential' | 'diverging' | 'custom';

export interface CalendarChartProps extends BaseChartProps {
  data: CalendarDataPoint[];
  year?: number;
  title?: string;
  colorScheme?: CalendarColorScheme;
  customColors?: string[];
  formatValue?: (value: number) => string;
  cellSize?: number | [number, number];
  orient?: 'horizontal' | 'vertical';
  monthLabel?: boolean;
  dayLabel?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getYearFromData(data: CalendarDataPoint[]): number {
  if (!data.length) return new Date().getFullYear();
  const firstDate = data[0].date;
  return parseInt(firstDate.split('-')[0], 10);
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function CalendarChart({
  data,
  year,
  height = 180,
  title,
  colorScheme = 'sequential',
  customColors,
  formatValue = (v) => v.toString(),
  cellSize = 12,
  orient = 'horizontal',
  monthLabel = true,
  dayLabel = true,
  className,
  animate = true,
  loading = false,
}: CalendarChartProps) {
  const option = useMemo<EChartsOption>(() => {
    if (!data.length) return {};

    const targetYear = year || getYearFromData(data);
    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);

    // Get color palette
    let inRangeColors: string[];
    switch (colorScheme) {
      case 'diverging':
        inRangeColors = divergingColors;
        break;
      case 'custom':
        inRangeColors = customColors || sequentialColors;
        break;
      default:
        inRangeColors = sequentialColors;
    }

    // Format data for ECharts: [date, value]
    const formattedData = data.map((d) => [d.date, d.value]);

    return {
      title: title
        ? {
            text: title,
            left: 0,
            top: 0,
          }
        : undefined,
      tooltip: {
        formatter: (params: unknown) => {
          const p = params as { data: [string, number] };
          const [date, value] = p.data;
          const dateObj = new Date(date);
          const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });

          return `
            <div style="font-family: 'Inter', sans-serif; font-size: 12px;">
              <div style="color: ${fingColors.textTertiary}; margin-bottom: 8px;">${formattedDate}</div>
              <div style="font-family: 'Space Mono', monospace; font-weight: 600; font-size: 14px;">
                ${formatValue(value)}
              </div>
            </div>
          `;
        },
      },
      visualMap: {
        min,
        max,
        calculable: true,
        orient: orient === 'horizontal' ? 'horizontal' : 'vertical',
        left: orient === 'horizontal' ? 'center' : 'right',
        bottom: orient === 'horizontal' ? 0 : undefined,
        top: orient === 'horizontal' ? undefined : 'center',
        inRange: {
          color: inRangeColors,
        },
        textStyle: {
          color: fingColors.textSecondary,
          fontSize: 10,
          fontFamily: "'Space Mono', monospace",
        },
      },
      calendar: {
        orient,
        top: title ? 50 : 30,
        left: dayLabel ? 40 : 20,
        right: orient === 'vertical' ? 80 : 20,
        bottom: orient === 'horizontal' ? 40 : 20,
        cellSize,
        range: targetYear,
        yearLabel: {
          show: false,
        },
        monthLabel: monthLabel
          ? {
              show: true,
              color: fingColors.textSecondary,
              fontSize: 10,
              fontFamily: "'Inter', sans-serif",
              nameMap: 'en',
            }
          : { show: false },
        dayLabel: dayLabel
          ? {
              show: true,
              firstDay: 0,
              color: fingColors.textTertiary,
              fontSize: 9,
              fontFamily: "'Inter', sans-serif",
              nameMap: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            }
          : { show: false },
        itemStyle: {
          color: fingColors.bgSubtle,
          borderColor: fingColors.bgBase,
          borderWidth: 2,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: fingColors.borderSubtle,
            width: 1,
          },
        },
      },
      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: formattedData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
          },
        },
      ],
    };
  }, [data, year, title, colorScheme, customColors, formatValue, cellSize, orient, monthLabel, dayLabel]);

  return (
    <EChart
      option={option}
      height={height}
      className={className}
      animate={animate}
      loading={loading}
      empty={!data.length}
    />
  );
}

export default CalendarChart;
