// Path: src/components/charts/echarts/EffectScatterChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { sentinelColors, chartPalette } from './sentinelTheme';
import type { BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface EffectScatterDataPoint {
  x: number;
  y: number;
  value?: number;
  name?: string;
  color?: string;
}

export interface EffectScatterSeriesData {
  name: string;
  data: EffectScatterDataPoint[];
  color?: string;
  showEffect?: boolean;
}

export type EffectType = 'ripple' | 'none';

export interface EffectScatterChartProps extends BaseChartProps {
  data: EffectScatterDataPoint[] | EffectScatterSeriesData[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  colors?: string[];
  symbolSize?: number | ((value: number[]) => number);
  effectType?: EffectType;
  rippleScale?: number;
  ripplePeriod?: number;
  showAllEffects?: boolean;
  formatValue?: (value: number) => string;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function isSeriesData(
  data: EffectScatterDataPoint[] | EffectScatterSeriesData[]
): data is EffectScatterSeriesData[] {
  return data.length > 0 && 'data' in data[0] && Array.isArray((data[0] as EffectScatterSeriesData).data);
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function EffectScatterChart({
  data,
  height = 400,
  title,
  xAxisLabel,
  yAxisLabel,
  colors = chartPalette,
  symbolSize = 15,
  effectType = 'ripple',
  rippleScale = 3,
  ripplePeriod = 3,
  showAllEffects = true,
  formatValue = (v) => v.toFixed(2),
  className,
  animate = true,
  loading = false,
}: EffectScatterChartProps) {
  const option = useMemo<EChartsOption>(() => {
    if (!data.length) return {};

    const series: EChartsOption['series'] = [];

    // Handle single series (EffectScatterDataPoint[])
    if (!isSeriesData(data)) {
      const points = data.map((d) => [d.x, d.y, d.value || 1, d.name || '']);

      series.push({
        type: 'effectScatter',
        data: points,
        symbolSize:
          typeof symbolSize === 'function'
            ? symbolSize
            : (dataItem: number[]) => {
                const val = dataItem[2] || 1;
                return typeof symbolSize === 'number' ? symbolSize * Math.sqrt(val) : 15;
              },
        showEffectOn: showAllEffects ? 'render' : 'emphasis',
        rippleEffect: effectType === 'ripple'
          ? {
              scale: rippleScale,
              period: ripplePeriod,
              brushType: 'stroke',
              color: colors[0],
            }
          : undefined,
        itemStyle: {
          color: colors[0],
          shadowBlur: 10,
          shadowColor: `${colors[0]}40`,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: colors[0],
          },
        },
      });
    } else {
      // Handle multi-series (EffectScatterSeriesData[])
      data.forEach((seriesData, index) => {
        const color = seriesData.color || colors[index % colors.length];
        const points = seriesData.data.map((d) => [d.x, d.y, d.value || 1, d.name || '']);
        const showEffect = seriesData.showEffect !== false;

        series.push({
          name: seriesData.name,
          type: 'effectScatter',
          data: points,
          symbolSize:
            typeof symbolSize === 'function'
              ? symbolSize
              : (dataItem: number[]) => {
                  const val = dataItem[2] || 1;
                  return typeof symbolSize === 'number' ? symbolSize * Math.sqrt(val) : 15;
                },
          showEffectOn: showAllEffects && showEffect ? 'render' : 'emphasis',
          rippleEffect: effectType === 'ripple' && showEffect
            ? {
                scale: rippleScale,
                period: ripplePeriod,
                brushType: 'stroke',
                color,
              }
            : undefined,
          itemStyle: {
            color,
            shadowBlur: 10,
            shadowColor: `${color}40`,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowColor: color,
            },
          },
        });
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
          const [x, y, value, name] = p.data;

          let html = `<div style="font-family: 'Inter', sans-serif; font-size: 12px;">`;

          if (name) {
            html += `<div style="margin-bottom: 8px; font-weight: 500;">${name}</div>`;
          } else if (isSeriesData(data)) {
            html += `
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="width: 10px; height: 10px; border-radius: 50%; background: ${p.color};"></span>
                <span style="font-weight: 500;">${p.seriesName}</span>
              </div>
            `;
          }

          html += `
            <div style="display: grid; grid-template-columns: auto 1fr; gap: 4px 16px;">
              <span style="color: ${sentinelColors.textTertiary};">X</span>
              <span style="font-family: 'Space Mono', monospace; text-align: right;">${formatValue(x)}</span>
              <span style="color: ${sentinelColors.textTertiary};">Y</span>
              <span style="font-family: 'Space Mono', monospace; text-align: right;">${formatValue(y)}</span>
              ${
                value > 1
                  ? `
                <span style="color: ${sentinelColors.textTertiary};">Value</span>
                <span style="font-family: 'Space Mono', monospace; text-align: right;">${formatValue(value)}</span>
              `
                  : ''
              }
            </div>
          `;

          html += '</div>';
          return html;
        },
      },
      legend: isSeriesData(data)
        ? {
            show: true,
            data: data.map((d) => d.name),
            top: title ? 30 : 0,
            right: 0,
            textStyle: {
              color: sentinelColors.textSecondary,
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
          color: sentinelColors.textSecondary,
          fontSize: 11,
          fontFamily: "'Inter', sans-serif",
        },
        axisLine: { lineStyle: { color: sentinelColors.borderSubtle } },
        axisTick: { show: false },
        axisLabel: {
          color: sentinelColors.textTertiary,
          fontSize: 10,
          fontFamily: "'Space Mono', monospace",
        },
        splitLine: {
          lineStyle: { color: sentinelColors.borderSubtle },
        },
      },
      yAxis: {
        type: 'value',
        name: yAxisLabel,
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
          color: sentinelColors.textSecondary,
          fontSize: 11,
          fontFamily: "'Inter', sans-serif",
        },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: sentinelColors.textTertiary,
          fontSize: 10,
          fontFamily: "'Space Mono', monospace",
        },
        splitLine: {
          lineStyle: { color: sentinelColors.borderSubtle },
        },
      },
      series,
    };
  }, [data, title, xAxisLabel, yAxisLabel, colors, symbolSize, effectType, rippleScale, ripplePeriod, showAllEffects, formatValue]);

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

export default EffectScatterChart;
