// Path: src/components/charts/echarts/BarChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { sentinelColors, chartPalette, tooltipFormatters } from './sentinelTheme';
import type { BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface BarDataPoint {
  category: string;
  value: number;
  color?: string;
}

export interface BarSeriesData {
  name: string;
  data: number[];
  color?: string;
}

export interface BarChartProps extends BaseChartProps {
  categories: string[];
  data: BarDataPoint[] | BarSeriesData[];
  title?: string;
  colors?: string[];
  horizontal?: boolean;
  stacked?: boolean;
  showPositiveNegative?: boolean;
  formatValue?: (value: number) => string;
  barWidth?: number | string;
  showDataZoom?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function isSeriesData(data: BarDataPoint[] | BarSeriesData[]): data is BarSeriesData[] {
  return data.length > 0 && 'data' in data[0] && Array.isArray((data[0] as BarSeriesData).data);
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function BarChart({
  categories,
  data,
  height = 300,
  title,
  colors = chartPalette,
  horizontal = false,
  stacked = false,
  showPositiveNegative = false,
  formatValue = tooltipFormatters.financial,
  barWidth = '60%',
  showDataZoom = false,
  className,
  animate = true,
  loading = false,
}: BarChartProps) {
  const option = useMemo<EChartsOption>(() => {
    if (!categories.length || !data.length) return {};

    // Handle single series (BarDataPoint[])
    if (!isSeriesData(data)) {
      const values = data.map((d) => d.value);
      const itemColors = data.map((d, i) => {
        if (d.color) return d.color;
        if (showPositiveNegative) {
          return d.value >= 0 ? sentinelColors.positive : sentinelColors.negative;
        }
        return colors[i % colors.length];
      });

      const categoryAxis = {
        type: 'category' as const,
        data: categories,
        axisLine: { lineStyle: { color: sentinelColors.borderSubtle } },
        axisLabel: {
          color: sentinelColors.textTertiary,
          fontSize: 11,
          fontFamily: "'Inter', sans-serif",
          rotate: horizontal ? 0 : categories.length > 10 ? 45 : 0,
        },
      };

      const valueAxis = {
        type: 'value' as const,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: sentinelColors.textTertiary,
          fontSize: 10,
          fontFamily: "'Space Mono', monospace",
          formatter: (value: number) => formatValue(value),
        },
        splitLine: {
          lineStyle: { color: sentinelColors.borderSubtle },
        },
      };

      return {
        title: title ? { text: title, left: 0 } : undefined,
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: (params: unknown) => {
            const p = (params as Array<{ name: string; value: number; color: string }>)[0];
            return `
              <div style="font-family: 'Inter', sans-serif; font-size: 12px;">
                <div style="margin-bottom: 8px; font-weight: 500;">${p.name}</div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="width: 10px; height: 10px; border-radius: 2px; background: ${p.color};"></span>
                  <span style="font-family: 'Space Mono', monospace; font-weight: 600;">${formatValue(p.value)}</span>
                </div>
              </div>
            `;
          },
        },
        grid: {
          left: 60,
          right: 20,
          top: title ? 50 : 20,
          bottom: showDataZoom ? 60 : 40,
        },
        xAxis: horizontal ? valueAxis : categoryAxis,
        yAxis: horizontal ? categoryAxis : valueAxis,
        dataZoom: showDataZoom
          ? [
              { type: 'inside', start: 0, end: 100 },
              { type: 'slider', start: 0, end: 100, bottom: 10, height: 20 },
            ]
          : [],
        series: [
          {
            type: 'bar',
            data: values.map((v, i) => ({
              value: v,
              itemStyle: { color: itemColors[i] },
            })),
            barWidth,
            itemStyle: {
              borderRadius: horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0],
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.3)',
              },
            },
          },
        ],
      };
    }

    // Handle multi-series (BarSeriesData[])
    const categoryAxis = {
      type: 'category' as const,
      data: categories,
      axisLine: { lineStyle: { color: sentinelColors.borderSubtle } },
      axisLabel: {
        color: sentinelColors.textTertiary,
        fontSize: 11,
        fontFamily: "'Inter', sans-serif",
      },
    };

    const valueAxis = {
      type: 'value' as const,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: sentinelColors.textTertiary,
        fontSize: 10,
        fontFamily: "'Space Mono', monospace",
        formatter: (value: number) => formatValue(value),
      },
      splitLine: {
        lineStyle: { color: sentinelColors.borderSubtle },
      },
    };

    return {
      title: title ? { text: title, left: 0 } : undefined,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: unknown) => {
          const paramArray = params as Array<{
            name: string;
            seriesName: string;
            value: number;
            color: string;
          }>;
          let html = `<div style="font-family: 'Inter', sans-serif; font-size: 12px;">`;
          html += `<div style="margin-bottom: 8px; font-weight: 500;">${paramArray[0].name}</div>`;
          paramArray.forEach((p) => {
            html += `
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span style="width: 10px; height: 10px; border-radius: 2px; background: ${p.color};"></span>
                <span style="color: ${sentinelColors.textSecondary};">${p.seriesName}</span>
                <span style="font-family: 'Space Mono', monospace; font-weight: 500; margin-left: auto;">${formatValue(p.value)}</span>
              </div>
            `;
          });
          html += '</div>';
          return html;
        },
      },
      legend: {
        show: data.length > 1,
        data: data.map((s) => s.name),
        top: title ? 30 : 0,
        right: 0,
        textStyle: {
          color: sentinelColors.textSecondary,
          fontSize: 11,
        },
      },
      grid: {
        left: 60,
        right: 20,
        top: title ? (data.length > 1 ? 60 : 50) : data.length > 1 ? 40 : 20,
        bottom: showDataZoom ? 60 : 40,
      },
      xAxis: horizontal ? valueAxis : categoryAxis,
      yAxis: horizontal ? categoryAxis : valueAxis,
      dataZoom: showDataZoom
        ? [
            { type: 'inside', start: 0, end: 100 },
            { type: 'slider', start: 0, end: 100, bottom: 10, height: 20 },
          ]
        : [],
      series: data.map((series, index) => ({
        name: series.name,
        type: 'bar',
        data: series.data,
        stack: stacked ? 'total' : undefined,
        barWidth: stacked ? barWidth : undefined,
        itemStyle: {
          color: series.color || colors[index % colors.length],
          borderRadius: horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0],
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
          },
        },
      })),
    };
  }, [categories, data, title, colors, horizontal, stacked, showPositiveNegative, formatValue, barWidth, showDataZoom]);

  return (
    <EChart
      option={option}
      height={height}
      className={className}
      animate={animate}
      loading={loading}
      empty={!categories.length || !data.length}
    />
  );
}

export default BarChart;
