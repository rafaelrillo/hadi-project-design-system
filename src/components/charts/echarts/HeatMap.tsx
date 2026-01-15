// Path: src/components/charts/echarts/HeatMap.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { sentinelColors, sequentialColors, divergingColors } from './sentinelTheme';
import type { HeatMapDataPoint, BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type ColorScheme = 'sequential' | 'diverging' | 'custom';

export interface HeatMapProps extends BaseChartProps {
  data: HeatMapDataPoint[];
  xCategories: string[];
  yCategories: string[];
  title?: string;
  colorScheme?: ColorScheme;
  customColors?: string[];
  showValues?: boolean;
  minValue?: number;
  maxValue?: number;
  formatValue?: (value: number) => string;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function HeatMap({
  data,
  xCategories,
  yCategories,
  height = 400,
  title,
  colorScheme = 'sequential',
  customColors,
  showValues = true,
  minValue,
  maxValue,
  formatValue = (v) => v.toFixed(2),
  className,
  animate = true,
  loading = false,
}: HeatMapProps) {
  const option = useMemo<EChartsOption>(() => {
    if (!data.length || !xCategories.length || !yCategories.length) return {};

    // Calculate min/max if not provided
    const values = data.map((d) => d.value);
    const min = minValue ?? Math.min(...values);
    const max = maxValue ?? Math.max(...values);

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

    // Format data for ECharts: [xIndex, yIndex, value]
    const formattedData = data.map((d) => {
      const xIndex = typeof d.x === 'string' ? xCategories.indexOf(d.x) : d.x;
      const yIndex = typeof d.y === 'string' ? yCategories.indexOf(d.y) : d.y;
      return [xIndex, yIndex, d.value];
    });

    return {
      title: title
        ? {
            text: title,
            left: 0,
            top: 0,
          }
        : undefined,
      tooltip: {
        position: 'top',
        formatter: (params: unknown) => {
          const p = params as { data: [number, number, number] };
          const [xIdx, yIdx, value] = p.data;
          return `
            <div style="font-family: 'Inter', sans-serif; font-size: 12px;">
              <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                <span style="color: ${sentinelColors.textTertiary};">${xCategories[xIdx]}</span>
                <span style="color: ${sentinelColors.textTertiary};">×</span>
                <span style="color: ${sentinelColors.textTertiary};">${yCategories[yIdx]}</span>
              </div>
              <div style="font-family: 'Space Mono', monospace; font-weight: 600; font-size: 14px;">
                ${formatValue(value)}
              </div>
            </div>
          `;
        },
      },
      grid: {
        left: 100,
        right: 60,
        top: title ? 50 : 20,
        bottom: 60,
      },
      xAxis: {
        type: 'category',
        data: xCategories,
        splitArea: { show: true },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: sentinelColors.textTertiary,
          fontSize: 10,
          fontFamily: "'Inter', sans-serif",
          rotate: xCategories.length > 10 ? 45 : 0,
        },
      },
      yAxis: {
        type: 'category',
        data: yCategories,
        splitArea: { show: true },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: sentinelColors.textTertiary,
          fontSize: 10,
          fontFamily: "'Inter', sans-serif",
        },
      },
      visualMap: {
        min,
        max,
        calculable: true,
        orient: 'vertical',
        right: 10,
        top: 'center',
        inRange: {
          color: inRangeColors,
        },
        textStyle: {
          color: sentinelColors.textSecondary,
          fontSize: 10,
          fontFamily: "'Space Mono', monospace",
        },
      },
      series: [
        {
          type: 'heatmap',
          data: formattedData,
          label: showValues
            ? {
                show: true,
                color: sentinelColors.textPrimary,
                fontSize: 10,
                fontFamily: "'Space Mono', monospace",
                formatter: (params: unknown) => {
                  const p = params as { data: [number, number, number] };
                  return formatValue(p.data[2]);
                },
              }
            : { show: false },
          itemStyle: {
            borderColor: sentinelColors.bgBase,
            borderWidth: 1,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }, [data, xCategories, yCategories, title, colorScheme, customColors, showValues, minValue, maxValue, formatValue]);

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

export default HeatMap;
