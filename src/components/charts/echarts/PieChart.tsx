// Path: src/components/charts/echarts/PieChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { sentinelColors, chartPalette, tooltipFormatters } from './sentinelTheme';
import type { PieDataPoint, BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type PieVariant = 'pie' | 'donut' | 'rose' | 'half';

export interface PieChartProps extends BaseChartProps {
  data: PieDataPoint[];
  variant?: PieVariant;
  title?: string;
  colors?: string[];
  showLabels?: boolean;
  showLegend?: boolean;
  formatValue?: (value: number) => string;
  innerRadius?: string; // For donut, e.g., "40%"
  centerLabel?: string; // Text in center for donut
  centerValue?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function PieChart({
  data,
  height = 300,
  variant = 'pie',
  title,
  colors = chartPalette,
  showLabels = true,
  showLegend = true,
  formatValue = tooltipFormatters.financial,
  innerRadius = '50%',
  centerLabel,
  centerValue,
  className,
  animate = true,
  loading = false,
}: PieChartProps) {
  const option = useMemo<EChartsOption>(() => {
    if (!data.length) return {};

    const total = data.reduce((sum, d) => sum + d.value, 0);

    // Determine radius based on variant
    let radius: [string, string] | string = '70%';
    let startAngle = 90;
    let endAngle = 450;
    let roseType: 'radius' | 'area' | false = false;

    switch (variant) {
      case 'donut':
        radius = [innerRadius, '70%'];
        break;
      case 'rose':
        radius = ['20%', '70%'];
        roseType = 'radius';
        break;
      case 'half':
        radius = ['40%', '70%'];
        startAngle = 180;
        endAngle = 360;
        break;
      default:
        radius = '70%';
    }

    const seriesData = data.map((d, i) => ({
      name: d.name,
      value: d.value,
      itemStyle: {
        color: d.color || colors[i % colors.length],
      },
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
          const p = params as { name: string; value: number; percent: number; color: string };
          return `
            <div style="font-family: 'Inter', sans-serif; font-size: 12px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="width: 10px; height: 10px; border-radius: 50%; background: ${p.color};"></span>
                <span style="font-weight: 500;">${p.name}</span>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 24px;">
                <span style="color: ${sentinelColors.textTertiary};">Value</span>
                <span style="font-family: 'Space Mono', monospace; font-weight: 600;">${formatValue(p.value)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 24px;">
                <span style="color: ${sentinelColors.textTertiary};">Share</span>
                <span style="font-family: 'Space Mono', monospace; font-weight: 600;">${p.percent.toFixed(1)}%</span>
              </div>
            </div>
          `;
        },
      },
      legend: showLegend
        ? {
            orient: 'vertical',
            right: 10,
            top: 'center',
            data: data.map((d) => d.name),
            textStyle: {
              color: sentinelColors.textSecondary,
              fontSize: 11,
            },
            formatter: (name: string) => {
              const item = data.find((d) => d.name === name);
              if (!item) return name;
              const percent = ((item.value / total) * 100).toFixed(1);
              return `${name}  ${percent}%`;
            },
          }
        : undefined,
      graphic:
        (variant === 'donut' || variant === 'half') && (centerLabel || centerValue)
          ? [
              {
                type: 'group',
                left: 'center',
                top: variant === 'half' ? '60%' : 'center',
                children: [
                  ...(centerValue
                    ? [
                        {
                          type: 'text',
                          style: {
                            text: centerValue,
                            fill: sentinelColors.textPrimary,
                            font: "600 28px 'Space Mono', monospace",
                            textAlign: 'center',
                          },
                          top: centerLabel ? -10 : 0,
                        },
                      ]
                    : []),
                  ...(centerLabel
                    ? [
                        {
                          type: 'text',
                          style: {
                            text: centerLabel,
                            fill: sentinelColors.textTertiary,
                            font: "400 12px 'Inter', sans-serif",
                            textAlign: 'center',
                          },
                          top: centerValue ? 20 : 0,
                        },
                      ]
                    : []),
                ],
              },
            ]
          : undefined,
      series: [
        {
          type: 'pie',
          radius,
          center: showLegend ? ['40%', '50%'] : ['50%', '50%'],
          startAngle,
          endAngle: endAngle !== 450 ? endAngle : undefined,
          roseType: roseType || undefined,
          data: seriesData,
          label: showLabels
            ? {
                show: true,
                color: sentinelColors.textSecondary,
                fontSize: 11,
                fontFamily: "'Inter', sans-serif",
                formatter: '{b}',
              }
            : { show: false },
          labelLine: showLabels
            ? {
                show: true,
                lineStyle: {
                  color: sentinelColors.borderDefault,
                },
              }
            : { show: false },
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.4)',
            },
            label: {
              show: true,
              fontSize: 12,
              fontWeight: 600,
            },
          },
          itemStyle: {
            borderColor: sentinelColors.bgBase,
            borderWidth: 2,
            borderRadius: 4,
          },
          animationType: 'scale',
          animationEasing: 'cubicOut',
          animationDuration: 700,
        },
      ],
    };
  }, [data, variant, title, colors, showLabels, showLegend, formatValue, innerRadius, centerLabel, centerValue]);

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

export default PieChart;
