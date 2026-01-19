// Path: src/components/charts/echarts/ScatterChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { fingColors, chartPalette } from './fingTheme';
import type { ScatterDataPoint, ScatterSeriesData, BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface ScatterChartProps extends BaseChartProps {
  data: ScatterDataPoint[] | ScatterSeriesData[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  colors?: string[];
  showRegression?: boolean;
  symbolSize?: number | ((data: number[]) => number);
  formatValue?: (value: number) => string;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function isSeriesData(data: ScatterDataPoint[] | ScatterSeriesData[]): data is ScatterSeriesData[] {
  return data.length > 0 && 'data' in data[0] && Array.isArray((data[0] as ScatterSeriesData).data);
}

function calculateRegression(points: number[][]): { slope: number; intercept: number } {
  const n = points.length;
  if (n < 2) return { slope: 0, intercept: 0 };

  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumXX = 0;

  points.forEach(([x, y]) => {
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
  });

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function ScatterChart({
  data,
  height = 350,
  title,
  xAxisLabel,
  yAxisLabel,
  colors = chartPalette,
  showRegression = false,
  symbolSize = 10,
  formatValue = (v) => v.toFixed(2),
  className,
  animate = true,
  loading = false,
}: ScatterChartProps) {
  const option = useMemo<EChartsOption>(() => {
    if (!data.length) return {};

    const series: EChartsOption['series'] = [];
    let allPoints: number[][] = [];

    // Handle single series (ScatterDataPoint[])
    if (!isSeriesData(data)) {
      const points = data.map((d) => [d.x, d.y, d.size || 1, d.name || '']);
      allPoints = points.map((p) => [p[0] as number, p[1] as number]);

      series.push({
        type: 'scatter',
        data: points,
        symbolSize:
          typeof symbolSize === 'function'
            ? symbolSize
            : (dataItem: number[]) => {
                const size = dataItem[2] || 1;
                return typeof symbolSize === 'number' ? symbolSize * size : 10 * size;
              },
        itemStyle: {
          color: colors[0],
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
          },
        },
      });
    } else {
      // Handle multi-series (ScatterSeriesData[])
      data.forEach((seriesData, index) => {
        const points = seriesData.data.map((d) => [d.x, d.y, d.size || 1, d.name || '']);
        allPoints = [...allPoints, ...points.map((p) => [p[0] as number, p[1] as number])];

        series.push({
          name: seriesData.name,
          type: 'scatter',
          data: points,
          symbolSize:
            typeof symbolSize === 'function'
              ? symbolSize
              : (dataItem: number[]) => {
                  const size = dataItem[2] || 1;
                  return typeof symbolSize === 'number' ? symbolSize * size : 10 * size;
                },
          itemStyle: {
            color: seriesData.color || colors[index % colors.length],
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
          },
        });
      });
    }

    // Add regression line if requested
    if (showRegression && allPoints.length >= 2) {
      const { slope, intercept } = calculateRegression(allPoints);
      const xValues = allPoints.map((p) => p[0]);
      const minX = Math.min(...xValues);
      const maxX = Math.max(...xValues);

      series.push({
        type: 'line',
        data: [
          [minX, slope * minX + intercept],
          [maxX, slope * maxX + intercept],
        ],
        lineStyle: {
          color: fingColors.accentPrimary,
          width: 2,
          type: 'dashed',
        },
        symbol: 'none',
        silent: true,
      });
    }

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
            data: [number, number, number, string];
            color: string;
          };
          const [x, y, , name] = p.data;

          return `
            <div style="font-family: 'Inter', sans-serif; font-size: 12px;">
              ${
                name
                  ? `<div style="margin-bottom: 8px; font-weight: 500;">${name}</div>`
                  : isSeriesData(data)
                    ? `<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="width: 10px; height: 10px; border-radius: 50%; background: ${p.color};"></span>
                  <span style="font-weight: 500;">${p.seriesName}</span>
                </div>`
                    : ''
              }
              <div style="display: flex; justify-content: space-between; gap: 16px; margin-bottom: 4px;">
                <span style="color: ${fingColors.textTertiary};">X</span>
                <span style="font-family: 'Space Mono', monospace;">${formatValue(x)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 16px;">
                <span style="color: ${fingColors.textTertiary};">Y</span>
                <span style="font-family: 'Space Mono', monospace;">${formatValue(y)}</span>
              </div>
            </div>
          `;
        },
      },
      legend: isSeriesData(data)
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
      grid: {
        left: 60,
        right: 30,
        top: title ? 60 : 40,
        bottom: xAxisLabel ? 50 : 40,
      },
      xAxis: {
        type: 'value',
        name: xAxisLabel,
        nameLocation: 'middle',
        nameGap: 30,
        nameTextStyle: {
          color: fingColors.textSecondary,
          fontSize: 11,
          fontFamily: "'Inter', sans-serif",
        },
        axisLine: { lineStyle: { color: fingColors.borderSubtle } },
        axisTick: { show: false },
        axisLabel: {
          color: fingColors.textTertiary,
          fontSize: 10,
          fontFamily: "'Space Mono', monospace",
        },
        splitLine: {
          lineStyle: { color: fingColors.borderSubtle },
        },
      },
      yAxis: {
        type: 'value',
        name: yAxisLabel,
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
          color: fingColors.textSecondary,
          fontSize: 11,
          fontFamily: "'Inter', sans-serif",
        },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: fingColors.textTertiary,
          fontSize: 10,
          fontFamily: "'Space Mono', monospace",
        },
        splitLine: {
          lineStyle: { color: fingColors.borderSubtle },
        },
      },
      series,
    };
  }, [data, title, xAxisLabel, yAxisLabel, colors, showRegression, symbolSize, formatValue]);

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

export default ScatterChart;
