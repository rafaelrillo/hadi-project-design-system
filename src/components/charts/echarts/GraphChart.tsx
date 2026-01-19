// Path: src/components/charts/echarts/GraphChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { fingColors, chartPalette } from './fingTheme';
import type { GraphData, BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type GraphLayout = 'force' | 'circular' | 'none';

export interface GraphChartProps extends BaseChartProps {
  data: GraphData;
  title?: string;
  colors?: string[];
  layout?: GraphLayout;
  draggable?: boolean;
  symbolSize?: number;
  showLabels?: boolean;
  roam?: boolean | 'scale' | 'move';
  edgeSymbol?: [string, string];
  repulsion?: number;
  gravity?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function GraphChart({
  data,
  height = 400,
  title,
  colors = chartPalette,
  layout = 'force',
  draggable = true,
  symbolSize = 30,
  showLabels = true,
  roam = true,
  edgeSymbol = ['circle', 'arrow'],
  repulsion = 500,
  gravity = 0.1,
  className,
  animate = true,
  loading = false,
}: GraphChartProps) {
  const option = useMemo<EChartsOption>(() => {
    if (!data.nodes.length) return {};

    // Prepare nodes with styling
    const nodes = data.nodes.map((node, index) => {
      const categoryColor = node.category !== undefined ? colors[node.category % colors.length] : colors[index % colors.length];

      return {
        ...node,
        symbolSize: node.symbolSize || (node.value ? Math.max(20, Math.min(symbolSize, node.value)) : symbolSize),
        itemStyle: {
          color: categoryColor,
        },
        label: showLabels
          ? {
              show: true,
              position: 'bottom' as const,
              formatter: '{b}',
              color: fingColors.textSecondary,
              fontSize: 10,
              fontFamily: "'Inter', sans-serif",
            }
          : { show: false },
      };
    });

    // Prepare links
    const links = data.links.map((link) => ({
      ...link,
      lineStyle: {
        color: fingColors.borderDefault,
        width: link.value ? Math.max(1, Math.min(5, link.value / 10)) : 1,
        curveness: 0.2,
      },
    }));

    // Prepare categories if provided
    const categories = data.categories?.map((cat, index) => ({
      name: cat.name,
      itemStyle: {
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
        formatter: (params: unknown) => {
          const p = params as {
            dataType: 'node' | 'edge';
            name: string;
            data: {
              source?: string;
              target?: string;
              value?: number;
            };
            color: string;
          };

          if (p.dataType === 'edge') {
            return `
              <div style="font-family: 'Inter', sans-serif; font-size: 12px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="color: ${fingColors.textSecondary};">${p.data.source}</span>
                  <span style="color: ${fingColors.textTertiary};">→</span>
                  <span style="color: ${fingColors.textSecondary};">${p.data.target}</span>
                </div>
                ${
                  p.data.value
                    ? `<div style="font-family: 'Space Mono', monospace; margin-top: 8px;">${p.data.value}</div>`
                    : ''
                }
              </div>
            `;
          }

          return `
            <div style="font-family: 'Inter', sans-serif; font-size: 12px;">
              <div style="display: flex; align-items: center; gap: 8px; font-weight: 500;">
                <span style="width: 10px; height: 10px; border-radius: 50%; background: ${p.color};"></span>
                ${p.name}
              </div>
              ${
                p.data.value
                  ? `<div style="font-family: 'Space Mono', monospace; margin-top: 8px;">${p.data.value}</div>`
                  : ''
              }
            </div>
          `;
        },
      },
      legend: categories
        ? {
            show: true,
            data: categories.map((c) => c.name),
            top: title ? 30 : 0,
            right: 0,
            textStyle: {
              color: fingColors.textSecondary,
              fontSize: 11,
            },
          }
        : undefined,
      series: [
        {
          type: 'graph',
          layout,
          data: nodes,
          links,
          categories,
          roam,
          draggable,
          edgeSymbol,
          edgeSymbolSize: [4, 10],
          force: layout === 'force'
            ? {
                repulsion,
                gravity,
                edgeLength: [100, 200],
                layoutAnimation: true,
              }
            : undefined,
          circular: layout === 'circular'
            ? {
                rotateLabel: true,
              }
            : undefined,
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 3,
            },
          },
          lineStyle: {
            opacity: 0.6,
          },
          animationDuration: 1000,
          animationEasingUpdate: 'quinticInOut',
        },
      ],
    };
  }, [data, title, colors, layout, draggable, symbolSize, showLabels, roam, edgeSymbol, repulsion, gravity]);

  return (
    <EChart
      option={option}
      height={height}
      className={className}
      animate={animate}
      loading={loading}
      empty={!data.nodes.length}
    />
  );
}

export default GraphChart;
