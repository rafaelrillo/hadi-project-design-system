// Path: src/components/charts/echarts/RadarChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { sentinelColors, chartPalette } from './sentinelTheme';
import type { RadarIndicator, RadarSeriesData, BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface RadarChartProps extends BaseChartProps {
  indicators: RadarIndicator[];
  data: RadarSeriesData[];
  title?: string;
  colors?: string[];
  shape?: 'polygon' | 'circle';
  showLegend?: boolean;
  fillOpacity?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function RadarChart({
  indicators,
  data,
  height = 300,
  title,
  colors = chartPalette,
  shape = 'polygon',
  showLegend = true,
  fillOpacity = 0.3,
  className,
  animate = true,
  loading = false,
}: RadarChartProps) {
  const option = useMemo<EChartsOption>(() => {
    if (!indicators.length || !data.length) return {};

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
            name: string;
            value: number[];
            color: string;
          };
          let html = `<div style="font-family: 'Inter', sans-serif; font-size: 12px;">`;
          html += `<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-weight: 500;">`;
          html += `<span style="width: 10px; height: 10px; border-radius: 50%; background: ${p.color};"></span>`;
          html += `${p.name}</div>`;
          indicators.forEach((ind, i) => {
            html += `
              <div style="display: flex; justify-content: space-between; gap: 16px; margin-bottom: 4px;">
                <span style="color: ${sentinelColors.textTertiary};">${ind.name}</span>
                <span style="font-family: 'Space Mono', monospace;">${p.value[i]}</span>
              </div>
            `;
          });
          html += '</div>';
          return html;
        },
      },
      legend: showLegend
        ? {
            data: data.map((d) => d.name),
            top: title ? 30 : 0,
            right: 0,
            textStyle: {
              color: sentinelColors.textSecondary,
              fontSize: 11,
            },
          }
        : undefined,
      radar: {
        shape,
        center: ['50%', '55%'],
        radius: '65%',
        indicator: indicators.map((ind) => ({
          name: ind.name,
          max: ind.max,
          min: ind.min,
        })),
        axisName: {
          color: sentinelColors.textSecondary,
          fontSize: 11,
          fontFamily: "'Inter', sans-serif",
        },
        axisLine: {
          lineStyle: {
            color: sentinelColors.borderDefault,
          },
        },
        splitLine: {
          lineStyle: {
            color: sentinelColors.borderSubtle,
          },
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['transparent', sentinelColors.bgSubtle],
          },
        },
      },
      series: [
        {
          type: 'radar',
          data: data.map((series, index) => {
            const color = series.color || colors[index % colors.length];
            return {
              name: series.name,
              value: series.value,
              symbol: 'circle',
              symbolSize: 6,
              lineStyle: {
                width: 2,
                color,
              },
              itemStyle: {
                color,
              },
              areaStyle: {
                color,
                opacity: fillOpacity,
              },
            };
          }),
          animationDuration: 700,
          animationEasing: 'cubicOut',
        },
      ],
    };
  }, [indicators, data, title, colors, shape, showLegend, fillOpacity]);

  return (
    <EChart
      option={option}
      height={height}
      className={className}
      animate={animate}
      loading={loading}
      empty={!indicators.length || !data.length}
    />
  );
}

export default RadarChart;
