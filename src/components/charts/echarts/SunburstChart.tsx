// Path: src/components/charts/echarts/SunburstChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { sentinelColors, chartPalette, tooltipFormatters } from './sentinelTheme';
import type { SunburstNode, BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface SunburstChartProps extends BaseChartProps {
  data: SunburstNode[];
  title?: string;
  colors?: string[];
  formatValue?: (value: number) => string;
  showLabels?: boolean;
  highlightPolicy?: 'descendant' | 'ancestor' | 'self' | 'none';
  innerRadius?: string;
  outerRadius?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function calculateTotal(nodes: SunburstNode[]): number {
  return nodes.reduce((sum, node) => {
    if (node.children && node.children.length > 0) {
      return sum + calculateTotal(node.children);
    }
    return sum + (node.value || 0);
  }, 0);
}

function assignColors(nodes: SunburstNode[], colors: string[], depth = 0): SunburstNode[] {
  return nodes.map((node, index) => ({
    ...node,
    itemStyle: {
      ...node.itemStyle,
      color: node.itemStyle?.color || colors[index % colors.length],
    },
    children: node.children ? assignColors(node.children, colors, depth + 1) : undefined,
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function SunburstChart({
  data,
  height = 400,
  title,
  colors = chartPalette,
  formatValue = tooltipFormatters.financial,
  showLabels = true,
  highlightPolicy = 'descendant',
  innerRadius = '15%',
  outerRadius = '85%',
  className,
  animate = true,
  loading = false,
}: SunburstChartProps) {
  const option = useMemo<EChartsOption>(() => {
    if (!data.length) return {};

    const total = calculateTotal(data);
    const coloredData = assignColors(data, colors);

    return {
      title: title
        ? {
            text: title,
            left: 0,
            top: 0,
          }
        : undefined,
      tooltip: {
        formatter: (params: unknown) => {
          const p = params as {
            name: string;
            value: number;
            treePathInfo: Array<{ name: string; value: number }>;
            color: string;
          };
          const percent = ((p.value / total) * 100).toFixed(1);
          const path = p.treePathInfo
            .filter((item) => item.name)
            .map((item) => item.name)
            .join(' > ');

          return `
            <div style="font-family: 'Inter', sans-serif; font-size: 12px;">
              ${
                path
                  ? `<div style="color: ${sentinelColors.textTertiary}; font-size: 10px; margin-bottom: 8px;">${path}</div>`
                  : ''
              }
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="width: 10px; height: 10px; border-radius: 2px; background: ${p.color};"></span>
                <span style="font-weight: 500;">${p.name}</span>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 24px; margin-bottom: 4px;">
                <span style="color: ${sentinelColors.textTertiary};">Value</span>
                <span style="font-family: 'Space Mono', monospace; font-weight: 600;">${formatValue(p.value)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 24px;">
                <span style="color: ${sentinelColors.textTertiary};">Share</span>
                <span style="font-family: 'Space Mono', monospace; font-weight: 600;">${percent}%</span>
              </div>
            </div>
          `;
        },
      },
      series: [
        {
          type: 'sunburst',
          data: coloredData,
          radius: [innerRadius, outerRadius],
          center: ['50%', '55%'],
          sort: undefined, // Keep original order
          emphasis: {
            focus: highlightPolicy,
          },
          label: showLabels
            ? {
                show: true,
                rotate: 'radial',
                color: sentinelColors.textPrimary,
                fontSize: 10,
                fontFamily: "'Inter', sans-serif",
                minAngle: 15,
                formatter: '{b}',
              }
            : { show: false },
          itemStyle: {
            borderColor: sentinelColors.bgBase,
            borderWidth: 2,
          },
          levels: [
            {},
            {
              r0: innerRadius,
              r: '45%',
              itemStyle: {
                borderWidth: 2,
              },
              label: {
                fontSize: 11,
                fontWeight: 500,
              },
            },
            {
              r0: '45%',
              r: '65%',
              itemStyle: {
                borderWidth: 1,
              },
              label: {
                fontSize: 10,
              },
            },
            {
              r0: '65%',
              r: outerRadius,
              itemStyle: {
                borderWidth: 1,
              },
              label: {
                fontSize: 9,
                position: 'outside',
              },
            },
          ],
          animationDuration: 700,
          animationEasing: 'cubicOut',
        },
      ],
    };
  }, [data, title, colors, formatValue, showLabels, highlightPolicy, innerRadius, outerRadius]);

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

export default SunburstChart;
