// Path: src/components/charts/echarts/FunnelChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { fingColors, chartPalette, tooltipFormatters } from './fingTheme';
import type { FunnelDataPoint, BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type FunnelSort = 'descending' | 'ascending' | 'none';
export type FunnelLabelPosition = 'left' | 'right' | 'inside' | 'inner' | 'outer' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom' | 'center';

export interface FunnelChartProps extends BaseChartProps {
  data: FunnelDataPoint[];
  title?: string;
  colors?: string[];
  sort?: FunnelSort;
  orient?: 'horizontal' | 'vertical';
  gap?: number;
  formatValue?: (value: number) => string;
  showPercent?: boolean;
  labelPosition?: FunnelLabelPosition;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function FunnelChart({
  data,
  height = 350,
  title,
  colors = chartPalette,
  sort = 'descending',
  orient = 'vertical',
  gap = 4,
  formatValue = tooltipFormatters.financial,
  showPercent = true,
  labelPosition = 'outer',
  className,
  animate = true,
  loading = false,
}: FunnelChartProps) {
  const option = useMemo<EChartsOption>(() => {
    if (!data.length) return {};

    const maxValue = Math.max(...data.map((d) => d.value));
    const coloredData = data.map((item, index) => ({
      ...item,
      itemStyle: {
        color: item.color || colors[index % colors.length],
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
          const p = params as {
            name: string;
            value: number;
            color: string;
            percent: number;
          };
          const percent = ((p.value / maxValue) * 100).toFixed(1);

          return `
            <div style="font-family: 'Inter', sans-serif; font-size: 12px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="width: 10px; height: 10px; border-radius: 2px; background: ${p.color};"></span>
                <span style="font-weight: 500;">${p.name}</span>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 24px; margin-bottom: 4px;">
                <span style="color: ${fingColors.textTertiary};">Value</span>
                <span style="font-family: 'Space Mono', monospace; font-weight: 600;">${formatValue(p.value)}</span>
              </div>
              ${
                showPercent
                  ? `
              <div style="display: flex; justify-content: space-between; gap: 24px;">
                <span style="color: ${fingColors.textTertiary};">Rate</span>
                <span style="font-family: 'Space Mono', monospace; font-weight: 600;">${percent}%</span>
              </div>
              `
                  : ''
              }
            </div>
          `;
        },
      },
      legend: {
        show: true,
        data: data.map((d) => d.name),
        orient: 'vertical',
        right: 10,
        top: 'center',
        textStyle: {
          color: fingColors.textSecondary,
          fontSize: 11,
        },
      },
      series: [
        {
          type: 'funnel',
          data: coloredData,
          sort,
          orient,
          gap,
          left: labelPosition === 'left' ? 100 : 60,
          right: 120,
          top: title ? 50 : 20,
          bottom: 20,
          width: orient === 'horizontal' ? undefined : '60%',
          minSize: '10%',
          maxSize: '80%',
          label: {
            show: true,
            position: labelPosition,
            color: fingColors.textSecondary,
            fontSize: 11,
            fontFamily: "'Inter', sans-serif",
            formatter: (params: unknown) => {
              const p = params as { name: string; value: number };
              if (showPercent) {
                const percent = ((p.value / maxValue) * 100).toFixed(0);
                return `${p.name} (${percent}%)`;
              }
              return p.name;
            },
          },
          labelLine: {
            show: labelPosition === 'outer',
            length: 10,
            lineStyle: {
              color: fingColors.borderDefault,
            },
          },
          itemStyle: {
            borderColor: fingColors.bgBase,
            borderWidth: 1,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
          },
          animationDuration: 700,
          animationEasing: 'cubicOut',
        },
      ],
    };
  }, [data, title, colors, sort, orient, gap, formatValue, showPercent, labelPosition]);

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

export default FunnelChart;
