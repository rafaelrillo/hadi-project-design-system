// Path: src/components/charts/echarts/ParallelChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { fingColors, chartPalette } from './fingTheme';
import type { BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface ParallelDimension {
  name: string;
  min?: number;
  max?: number;
  type?: 'value' | 'category';
  data?: string[]; // For category type
}

export interface ParallelSeriesData {
  name: string;
  value: (number | string)[];
  color?: string;
  lineStyle?: {
    width?: number;
    opacity?: number;
  };
}

export interface ParallelChartProps extends BaseChartProps {
  dimensions: ParallelDimension[];
  data: ParallelSeriesData[];
  title?: string;
  colors?: string[];
  showLegend?: boolean;
  lineWidth?: number;
  lineOpacity?: number;
  smooth?: boolean;
  realtime?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function ParallelChart({
  dimensions,
  data,
  height = 400,
  title,
  colors = chartPalette,
  showLegend = true,
  lineWidth = 2,
  lineOpacity = 0.6,
  smooth = false,
  realtime = false,
  className,
  animate = true,
  loading = false,
}: ParallelChartProps) {
  const option = useMemo<EChartsOption>(() => {
    if (!dimensions.length || !data.length) return {};

    // Build parallel axis
    const parallelAxis = dimensions.map((dim, index) => ({
      dim: index,
      name: dim.name,
      type: dim.type || 'value',
      min: dim.min,
      max: dim.max,
      data: dim.data,
      nameLocation: 'end' as const,
      nameGap: 20,
      nameTextStyle: {
        color: fingColors.textSecondary,
        fontSize: 11,
        fontFamily: "'Inter', sans-serif",
      },
      axisLine: {
        lineStyle: {
          color: fingColors.borderDefault,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: fingColors.textTertiary,
        fontSize: 10,
        fontFamily: "'Space Mono', monospace",
      },
      splitLine: {
        show: false,
      },
    }));

    // Build series
    const series = data.map((item, index) => ({
      type: 'parallel' as const,
      name: item.name,
      lineStyle: {
        width: item.lineStyle?.width || lineWidth,
        opacity: item.lineStyle?.opacity || lineOpacity,
        color: item.color || colors[index % colors.length],
      },
      emphasis: {
        lineStyle: {
          width: (item.lineStyle?.width || lineWidth) + 1,
          opacity: 1,
        },
      },
      smooth,
      realtime,
      data: [item.value],
    }));

    return {
      title: title
        ? {
            text: title,
            left: 0,
            top: 0,
          }
        : undefined,
      tooltip: {
        trigger: 'item',
        formatter: (params: unknown) => {
          const p = params as {
            seriesName: string;
            data: (number | string)[];
            color: string;
          };

          let html = `<div style="font-family: 'Inter', sans-serif; font-size: 12px;">`;
          html += `<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px; font-weight: 500;">`;
          html += `<span style="width: 10px; height: 10px; border-radius: 2px; background: ${p.color};"></span>`;
          html += `${p.seriesName}</div>`;

          dimensions.forEach((dim, i) => {
            const value = p.data[i];
            html += `
              <div style="display: flex; justify-content: space-between; gap: 16px; margin-bottom: 4px;">
                <span style="color: ${fingColors.textTertiary};">${dim.name}</span>
                <span style="font-family: 'Space Mono', monospace;">${typeof value === 'number' ? value.toFixed(2) : value}</span>
              </div>
            `;
          });

          html += '</div>';
          return html;
        },
      },
      legend: showLegend
        ? {
            show: true,
            data: data.map((d) => d.name),
            top: title ? 30 : 0,
            right: 0,
            textStyle: {
              color: fingColors.textSecondary,
              fontSize: 11,
            },
          }
        : undefined,
      parallelAxis,
      parallel: {
        left: 60,
        right: 60,
        top: title ? (showLegend ? 80 : 50) : showLegend ? 50 : 30,
        bottom: 40,
        parallelAxisDefault: {
          type: 'value',
          nameLocation: 'end',
          nameGap: 20,
          nameTextStyle: {
            color: fingColors.textSecondary,
            fontSize: 11,
          },
          axisLine: {
            lineStyle: {
              color: fingColors.borderDefault,
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: fingColors.textTertiary,
            fontSize: 10,
          },
        },
      },
      series,
    };
  }, [dimensions, data, title, colors, showLegend, lineWidth, lineOpacity, smooth, realtime]);

  return (
    <EChart
      option={option}
      height={height}
      className={className}
      animate={animate}
      loading={loading}
      empty={!dimensions.length || !data.length}
    />
  );
}

export default ParallelChart;
