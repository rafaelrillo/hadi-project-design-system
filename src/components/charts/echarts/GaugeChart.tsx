// Path: src/components/charts/echarts/GaugeChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { quafiColors } from './quafiTheme';
import type { GaugeData, BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type GaugeVariant = 'default' | 'risk' | 'progress' | 'score';

export interface GaugeChartProps extends BaseChartProps {
  data: GaugeData;
  variant?: GaugeVariant;
  title?: string;
  min?: number;
  max?: number;
  formatValue?: (value: number) => string;
  unit?: string;
  thresholds?: Array<{ value: number; color: string }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// PRESET COLORS
// ─────────────────────────────────────────────────────────────────────────────

const variantColors = {
  default: [
    [0.3, quafiColors.positive],
    [0.7, quafiColors.warning],
    [1, quafiColors.negative],
  ],
  risk: [
    [0.2, quafiColors.riskLow],
    [0.4, quafiColors.riskModerate],
    [0.6, quafiColors.riskElevated],
    [0.8, quafiColors.riskHigh],
    [1, quafiColors.riskSevere],
  ],
  progress: [
    [0.5, quafiColors.warning],
    [0.8, quafiColors.accentPrimary],
    [1, quafiColors.positive],
  ],
  score: [
    [0.4, quafiColors.negative],
    [0.7, quafiColors.warning],
    [1, quafiColors.positive],
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function GaugeChart({
  data,
  height = 250,
  variant = 'default',
  title,
  min = 0,
  max = 100,
  formatValue,
  unit = '',
  thresholds,
  className,
  animate = true,
  loading = false,
}: GaugeChartProps) {
  const option = useMemo<EChartsOption>(() => {
    const normalizedValue = Math.max(min, Math.min(max, data.value));
    const colorStops = thresholds
      ? thresholds.map((t) => [(t.value - min) / (max - min), t.color] as [number, string])
      : (variantColors[variant] as [number, string][]);

    return {
      title: title
        ? {
            text: title,
            left: 'center',
            top: 0,
          }
        : undefined,
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          radius: '85%',
          min,
          max,
          startAngle: 200,
          endAngle: -20,
          progress: {
            show: true,
            width: 12,
          },
          pointer: {
            show: true,
            length: '60%',
            width: 6,
            itemStyle: {
              color: 'auto',
            },
          },
          axisLine: {
            lineStyle: {
              width: 12,
              color: colorStops,
            },
          },
          axisTick: {
            show: true,
            distance: -18,
            length: 4,
            lineStyle: {
              color: quafiColors.textTertiary,
              width: 1,
            },
          },
          splitLine: {
            show: true,
            distance: -22,
            length: 8,
            lineStyle: {
              color: quafiColors.textTertiary,
              width: 1,
            },
          },
          axisLabel: {
            show: true,
            distance: 28,
            color: quafiColors.textTertiary,
            fontSize: 10,
            fontFamily: "'Space Mono', monospace",
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 16,
            itemStyle: {
              borderWidth: 4,
              borderColor: quafiColors.bgOverlay,
              color: 'auto',
            },
          },
          detail: {
            valueAnimation: true,
            offsetCenter: [0, '30%'],
            fontSize: 28,
            fontWeight: 600,
            fontFamily: "'Space Mono', monospace",
            color: 'inherit',
            formatter: (value: number) => {
              const formatted = formatValue ? formatValue(value) : value.toFixed(0);
              return `${formatted}${unit}`;
            },
          },
          title: data.name
            ? {
                show: true,
                offsetCenter: [0, '55%'],
                fontSize: 12,
                fontFamily: "'Inter', sans-serif",
                color: quafiColors.textSecondary,
              }
            : { show: false },
          data: [
            {
              value: normalizedValue,
              name: data.name || '',
            },
          ],
          animationDuration: 1000,
          animationEasing: 'cubicOut',
        },
      ],
    };
  }, [data, variant, title, min, max, formatValue, unit, thresholds]);

  return (
    <EChart
      option={option}
      height={height}
      className={className}
      animate={animate}
      loading={loading}
      empty={data.value === undefined}
    />
  );
}

export default GaugeChart;
