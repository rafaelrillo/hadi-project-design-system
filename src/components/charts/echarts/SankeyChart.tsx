// Path: src/components/charts/echarts/SankeyChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { fingColors, chartPalette, tooltipFormatters } from './fingTheme';
import type { SankeyData, BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface SankeyChartProps extends BaseChartProps {
  data: SankeyData;
  title?: string;
  colors?: string[];
  formatValue?: (value: number) => string;
  orient?: 'horizontal' | 'vertical';
  nodeWidth?: number;
  nodeGap?: number;
  draggable?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function SankeyChart({
  data,
  height = 400,
  title,
  colors = chartPalette,
  formatValue = tooltipFormatters.financial,
  orient = 'horizontal',
  nodeWidth = 20,
  nodeGap = 12,
  draggable = false,
  className,
  animate = true,
  loading = false,
}: SankeyChartProps) {
  const option = useMemo<EChartsOption>(() => {
    if (!data.nodes.length || !data.links.length) return {};

    // Assign colors to nodes
    const coloredNodes = data.nodes.map((node, index) => ({
      ...node,
      itemStyle: node.itemStyle || {
        color: colors[index % colors.length],
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
        triggerOn: 'mousemove',
        formatter: (params: unknown) => {
          const p = params as {
            dataType: 'node' | 'edge';
            name: string;
            data: { source?: string; target?: string; value?: number };
            value: number;
            color: string;
          };

          if (p.dataType === 'node') {
            return `
              <div style="font-family: 'Inter', sans-serif; font-size: 12px;">
                <div style="display: flex; align-items: center; gap: 8px; font-weight: 500;">
                  <span style="width: 10px; height: 10px; border-radius: 2px; background: ${p.color};"></span>
                  ${p.name}
                </div>
              </div>
            `;
          }

          // Edge/Link tooltip
          return `
            <div style="font-family: 'Inter', sans-serif; font-size: 12px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="color: ${fingColors.textSecondary};">${p.data.source}</span>
                <span style="color: ${fingColors.textTertiary};">→</span>
                <span style="color: ${fingColors.textSecondary};">${p.data.target}</span>
              </div>
              <div style="font-family: 'Space Mono', monospace; font-weight: 600; font-size: 14px;">
                ${formatValue(p.value)}
              </div>
            </div>
          `;
        },
      },
      series: [
        {
          type: 'sankey',
          data: coloredNodes,
          links: data.links,
          orient,
          nodeWidth,
          nodeGap,
          draggable,
          left: 40,
          right: 40,
          top: title ? 50 : 20,
          bottom: 20,
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              opacity: 0.5,
            },
          },
          lineStyle: {
            color: 'gradient',
            curveness: 0.5,
            opacity: 0.3,
          },
          label: {
            show: true,
            position: orient === 'horizontal' ? 'right' : 'bottom',
            color: fingColors.textSecondary,
            fontSize: 11,
            fontFamily: "'Inter', sans-serif",
            formatter: '{b}',
          },
          itemStyle: {
            borderWidth: 0,
          },
          animationDuration: 700,
          animationEasing: 'cubicOut',
        },
      ],
    };
  }, [data, title, colors, formatValue, orient, nodeWidth, nodeGap, draggable]);

  return (
    <EChart
      option={option}
      height={height}
      className={className}
      animate={animate}
      loading={loading}
      empty={!data.nodes.length || !data.links.length}
    />
  );
}

export default SankeyChart;
