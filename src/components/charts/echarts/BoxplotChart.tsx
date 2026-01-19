// Path: src/components/charts/echarts/BoxplotChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { fingColors, chartPalette } from './fingTheme';
import type { BoxplotData, BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface BoxplotChartProps extends BaseChartProps {
  data: BoxplotData[];
  title?: string;
  colors?: string[];
  horizontal?: boolean;
  showOutliers?: boolean;
  formatValue?: (value: number) => string;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function BoxplotChart({
  data,
  height = 350,
  title,
  colors = chartPalette,
  horizontal = false,
  showOutliers = true,
  formatValue = (v) => v.toFixed(2),
  className,
  animate = true,
  loading = false,
}: BoxplotChartProps) {
  const option = useMemo<EChartsOption>(() => {
    if (!data.length) return {};

    const categories = data.map((d) => d.name);
    // BoxplotData.value is [min, Q1, median, Q3, max]
    const boxData = data.map((d) => d.value);

    const categoryAxis = {
      type: 'category' as const,
      data: categories,
      boundaryGap: true,
      axisLine: { lineStyle: { color: fingColors.borderSubtle } },
      axisLabel: {
        color: fingColors.textTertiary,
        fontSize: 11,
        fontFamily: "'Inter', sans-serif",
      },
      axisTick: { show: false },
    };

    const valueAxis = {
      type: 'value' as const,
      scale: true,
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
      },
    };

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
        axisPointer: { type: 'shadow' },
        formatter: (params: unknown) => {
          const p = params as {
            name: string;
            data: [number, number, number, number, number];
            color: string;
          };
          const [min, q1, median, q3, max] = p.data;

          return `
            <div style="font-family: 'Inter', sans-serif; font-size: 12px;">
              <div style="font-weight: 500; margin-bottom: 12px;">${p.name}</div>
              <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px 16px;">
                <span style="color: ${fingColors.textTertiary};">Max</span>
                <span style="font-family: 'Space Mono', monospace; text-align: right;">${formatValue(max)}</span>
                <span style="color: ${fingColors.textTertiary};">Q3</span>
                <span style="font-family: 'Space Mono', monospace; text-align: right;">${formatValue(q3)}</span>
                <span style="color: ${fingColors.accentPrimary}; font-weight: 500;">Median</span>
                <span style="font-family: 'Space Mono', monospace; text-align: right; font-weight: 600;">${formatValue(median)}</span>
                <span style="color: ${fingColors.textTertiary};">Q1</span>
                <span style="font-family: 'Space Mono', monospace; text-align: right;">${formatValue(q1)}</span>
                <span style="color: ${fingColors.textTertiary};">Min</span>
                <span style="font-family: 'Space Mono', monospace; text-align: right;">${formatValue(min)}</span>
              </div>
              <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid ${fingColors.borderSubtle};">
                <span style="color: ${fingColors.textTertiary};">IQR</span>
                <span style="font-family: 'Space Mono', monospace; margin-left: 16px;">${formatValue(q3 - q1)}</span>
              </div>
            </div>
          `;
        },
      },
      grid: {
        left: 60,
        right: 30,
        top: title ? 50 : 20,
        bottom: 40,
      },
      xAxis: horizontal ? valueAxis : categoryAxis,
      yAxis: horizontal ? categoryAxis : valueAxis,
      series: [
        {
          type: 'boxplot',
          data: boxData,
          itemStyle: {
            color: fingColors.bgSubtle,
            borderColor: colors[0],
            borderWidth: 2,
          },
          emphasis: {
            itemStyle: {
              borderColor: fingColors.accentPrimary,
              borderWidth: 3,
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
          },
          boxWidth: ['40%', '70%'],
        },
        ...(showOutliers
          ? [
              {
                type: 'scatter' as const,
                data: [] as number[][], // Outliers would be calculated separately if needed
                itemStyle: {
                  color: fingColors.warning,
                },
                symbolSize: 6,
              },
            ]
          : []),
      ],
    };
  }, [data, title, colors, horizontal, showOutliers, formatValue]);

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

export default BoxplotChart;
