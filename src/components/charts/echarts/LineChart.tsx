// Path: src/components/charts/echarts/LineChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { fingColors, chartPalette, tooltipFormatters } from './fingTheme';
import type { SeriesData, TimeSeriesDataPoint, BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface LineChartProps extends BaseChartProps {
  data: SeriesData[] | TimeSeriesDataPoint[];
  enableArea?: boolean;
  areaOpacity?: number;
  smooth?: boolean;
  showSymbol?: boolean;
  title?: string;
  colors?: string[];
  formatValue?: (value: number) => string;
  minimal?: boolean; // Hide axes and grid for sparklines
  showDataZoom?: boolean;
  stacked?: boolean;
  showLegend?: boolean; // Show/hide legend (defaults to true for multi-series when not minimal)
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function isSeriesData(data: SeriesData[] | TimeSeriesDataPoint[]): data is SeriesData[] {
  return data.length > 0 && 'id' in data[0];
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function LineChart({
  data,
  height = 300,
  enableArea = false,
  areaOpacity = 0.3,
  smooth = false,
  showSymbol = false,
  title,
  colors = chartPalette,
  formatValue = tooltipFormatters.financial,
  minimal = false,
  showDataZoom = false,
  stacked = false,
  showLegend,
  className,
  animate = true,
  loading = false,
}: LineChartProps) {
  // Determine if legend should be shown
  const shouldShowLegend = showLegend !== undefined
    ? showLegend
    : (!minimal && isSeriesData(data) && data.length > 1);
  const option = useMemo<EChartsOption>(() => {
    if (!data.length) return {};

    // Handle single series (TimeSeriesDataPoint[])
    if (!isSeriesData(data)) {
      const times = data.map((d) => d.time);
      const values = data.map((d) => d.value);

      return {
        title: title ? { text: title, left: 0 } : undefined,
        tooltip: minimal
          ? { show: false }
          : {
              trigger: 'axis',
              formatter: (params: unknown) => {
                const paramArray = params as Array<{ axisValue: string; value: number }>;
                const point = paramArray[0];
                return `
                  <div style="font-family: 'Space Mono', monospace; font-size: 11px;">
                    <div style="color: ${fingColors.textTertiary}; margin-bottom: 4px;">${point.axisValue}</div>
                    <div style="color: ${fingColors.textPrimary}; font-weight: 600;">${formatValue(point.value)}</div>
                  </div>
                `;
              },
            },
        grid: minimal
          ? { left: 0, right: 0, top: 0, bottom: 0 }
          : { left: 60, right: 20, top: title ? 50 : 20, bottom: showDataZoom ? 60 : 30 },
        xAxis: {
          type: 'category',
          data: times,
          show: !minimal,
          axisLine: { lineStyle: { color: fingColors.borderSubtle } },
          axisLabel: {
            color: fingColors.textTertiary,
            fontSize: 10,
            fontFamily: "'Space Mono', monospace",
          },
        },
        yAxis: {
          type: 'value',
          show: !minimal,
          scale: true, // Auto-scale based on data range, don't force 0
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: fingColors.textTertiary,
            fontSize: 10,
            fontFamily: "'Space Mono', monospace",
            formatter: (value: number) => formatValue(value),
          },
          splitLine: {
            lineStyle: { color: fingColors.borderSubtle },
            show: !minimal,
          },
        },
        dataZoom: showDataZoom
          ? [
              { type: 'inside', start: 0, end: 100 },
              {
                type: 'slider',
                start: 0,
                end: 100,
                bottom: 10,
                height: 20,
              },
            ]
          : [],
        series: [
          {
            type: 'line',
            data: values,
            smooth,
            showSymbol,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              width: 2,
              color: colors[0],
            },
            itemStyle: {
              color: colors[0],
            },
            areaStyle: enableArea
              ? {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      { offset: 0, color: `${colors[0]}${Math.round(areaOpacity * 255).toString(16).padStart(2, '0')}` },
                      { offset: 1, color: `${colors[0]}00` },
                    ],
                  },
                }
              : undefined,
          },
        ],
      };
    }

    // Handle multi-series (SeriesData[])
    const allTimes = [...new Set(data.flatMap((s) => s.data.map((d) => d.x)))].sort();

    return {
      title: title ? { text: title, left: 0 } : undefined,
      tooltip: minimal
        ? { show: false }
        : {
            trigger: 'axis',
            formatter: (params: unknown) => {
              const paramArray = params as Array<{
                axisValue: string;
                seriesName: string;
                value: number;
                color: string;
              }>;
              let html = `<div style="font-family: 'Space Mono', monospace; font-size: 11px;">`;
              html += `<div style="color: ${fingColors.textTertiary}; margin-bottom: 8px;">${paramArray[0].axisValue}</div>`;
              paramArray.forEach((p) => {
                html += `
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                    <span style="width: 8px; height: 8px; border-radius: 50%; background: ${p.color};"></span>
                    <span style="color: ${fingColors.textSecondary};">${p.seriesName}</span>
                    <span style="color: ${fingColors.textPrimary}; font-weight: 500; margin-left: auto;">${formatValue(p.value)}</span>
                  </div>
                `;
              });
              html += '</div>';
              return html;
            },
          },
      legend: {
        show: shouldShowLegend,
        data: data.map((s) => s.name),
        top: title ? 30 : 0,
        right: 0,
        textStyle: {
          color: fingColors.textSecondary,
          fontSize: 11,
        },
      },
      grid: minimal
        ? { left: 0, right: 0, top: 0, bottom: 0 }
        : {
            left: 60,
            right: 20,
            top: title ? (shouldShowLegend ? 70 : 50) : shouldShowLegend ? 40 : 20,
            bottom: showDataZoom ? 60 : 30,
          },
      xAxis: {
        type: 'category',
        data: allTimes,
        show: !minimal,
        axisLine: { lineStyle: { color: fingColors.borderSubtle } },
        axisLabel: {
          color: fingColors.textTertiary,
          fontSize: 10,
          fontFamily: "'Space Mono', monospace",
        },
      },
      yAxis: {
        type: 'value',
        show: !minimal,
        scale: true, // Auto-scale based on data range, don't force 0
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: fingColors.textTertiary,
          fontSize: 10,
          fontFamily: "'Space Mono', monospace",
          formatter: (value: number) => formatValue(value),
        },
        splitLine: {
          lineStyle: { color: fingColors.borderSubtle },
          show: !minimal,
        },
      },
      dataZoom: showDataZoom
        ? [
            { type: 'inside', start: 0, end: 100 },
            { type: 'slider', start: 0, end: 100, bottom: 10, height: 20 },
          ]
        : [],
      series: data.map((series, index) => {
        const color = series.color || colors[index % colors.length];
        const seriesValues = allTimes.map((time) => {
          const point = series.data.find((d) => d.x === time);
          return point ? point.y : null;
        });

        return {
          name: series.name,
          type: 'line',
          data: seriesValues,
          smooth,
          showSymbol,
          symbol: 'circle',
          symbolSize: 6,
          stack: stacked ? 'total' : undefined,
          lineStyle: {
            width: 2,
            color,
          },
          itemStyle: {
            color,
          },
          areaStyle:
            enableArea
              ? {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      { offset: 0, color: `${color}${Math.round(areaOpacity * 255).toString(16).padStart(2, '0')}` },
                      { offset: 1, color: `${color}00` },
                    ],
                  },
                }
              : stacked
                ? {
                    opacity: areaOpacity,
                  }
                : undefined,
        };
      }),
    };
  }, [data, enableArea, areaOpacity, smooth, showSymbol, title, colors, formatValue, minimal, showDataZoom, stacked, shouldShowLegend]);

  const isEmpty = !data.length || (isSeriesData(data) && data.every((s) => !s.data.length));

  return (
    <EChart
      option={option}
      height={height}
      className={className}
      animate={animate}
      loading={loading}
      empty={isEmpty}
    />
  );
}

export default LineChart;
