// Path: src/components/charts/echarts/ThemeRiverChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { sentinelColors, chartPalette } from './sentinelTheme';
import type { BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface ThemeRiverDataPoint {
  date: string;
  value: number;
  name: string;
}

export interface ThemeRiverChartProps extends BaseChartProps {
  data: ThemeRiverDataPoint[];
  title?: string;
  colors?: string[];
  formatValue?: (value: number) => string;
  singleAxis?: boolean;
  boundaryGap?: [string, string];
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function ThemeRiverChart({
  data,
  height = 350,
  title,
  colors = chartPalette,
  formatValue = (v) => v.toLocaleString(),
  singleAxis = true,
  boundaryGap = ['5%', '5%'],
  className,
  animate = true,
  loading = false,
}: ThemeRiverChartProps) {
  const option = useMemo<EChartsOption>(() => {
    if (!data.length) return {};

    // Get unique names for legend
    const names = [...new Set(data.map((d) => d.name))];

    // Format data for ECharts: [date, value, name]
    const formattedData: [string, number, string][] = data.map((d) => [d.date, d.value, d.name]);

    return {
      title: title
        ? {
            text: title,
            left: 0,
            top: 0,
          }
        : undefined,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: sentinelColors.accentPrimary,
            width: 1,
            type: 'dashed',
          },
        },
        formatter: (params: unknown) => {
          const paramArray = params as Array<{
            name: string;
            data: [string, number, string];
            color: string;
          }>;

          if (!paramArray.length) return '';
          const date = paramArray[0].data[0];

          let html = `<div style="font-family: 'Inter', sans-serif; font-size: 12px;">`;
          html += `<div style="color: ${sentinelColors.textTertiary}; margin-bottom: 8px;">${date}</div>`;

          paramArray.forEach((p) => {
            const value = p.data[1];
            const name = p.data[2];
            html += `
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span style="width: 10px; height: 10px; border-radius: 2px; background: ${p.color};"></span>
                <span style="color: ${sentinelColors.textSecondary};">${name}</span>
                <span style="font-family: 'Space Mono', monospace; font-weight: 500; margin-left: auto;">${formatValue(value)}</span>
              </div>
            `;
          });

          html += '</div>';
          return html;
        },
      },
      legend: {
        show: true,
        data: names,
        top: title ? 30 : 0,
        right: 0,
        textStyle: {
          color: sentinelColors.textSecondary,
          fontSize: 11,
        },
      },
      singleAxis: singleAxis
        ? {
            type: 'time',
            top: title ? 80 : 50,
            bottom: 50,
            left: 60,
            right: 60,
            axisLine: {
              lineStyle: {
                color: sentinelColors.borderSubtle,
              },
            },
            axisLabel: {
              color: sentinelColors.textTertiary,
              fontSize: 10,
              fontFamily: "'Space Mono', monospace",
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          }
        : undefined,
      series: [
        {
          type: 'themeRiver',
          data: formattedData,
          boundaryGap,
          label: {
            show: false,
          },
          emphasis: {
            focus: 'self',
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
          },
          itemStyle: {
            borderColor: sentinelColors.bgBase,
            borderWidth: 1,
          },
          color: colors,
        },
      ],
    };
  }, [data, title, colors, formatValue, singleAxis, boundaryGap]);

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

export default ThemeRiverChart;
