// Path: src/components/charts/echarts/TreeMap.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { sentinelColors, chartPalette, tooltipFormatters } from './sentinelTheme';
import type { TreeMapNode, BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface TreeMapProps extends BaseChartProps {
  data: TreeMapNode[];
  title?: string;
  colors?: string[];
  formatValue?: (value: number) => string;
  showBreadcrumb?: boolean;
  roam?: boolean | 'scale' | 'move';
  leafDepth?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function calculateTotal(nodes: TreeMapNode[]): number {
  return nodes.reduce((sum, node) => {
    if (node.children) {
      return sum + calculateTotal(node.children);
    }
    return sum + (node.value || 0);
  }, 0);
}

function assignColors(nodes: TreeMapNode[], colors: string[], depth = 0): TreeMapNode[] {
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

export function TreeMap({
  data,
  height = 400,
  title,
  colors = chartPalette,
  formatValue = tooltipFormatters.financial,
  showBreadcrumb = true,
  roam = false,
  leafDepth = 1,
  className,
  animate = true,
  loading = false,
}: TreeMapProps) {
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
            treePathInfo: Array<{ name: string }>;
            color: string;
          };
          const percent = ((p.value / total) * 100).toFixed(1);
          const path = p.treePathInfo.map((item) => item.name).join(' > ');

          return `
            <div style="font-family: 'Inter', sans-serif; font-size: 12px;">
              <div style="color: ${sentinelColors.textTertiary}; font-size: 10px; margin-bottom: 8px;">${path}</div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="width: 10px; height: 10px; border-radius: 2px; background: ${p.color};"></span>
                <span style="font-weight: 500;">${p.name}</span>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 24px;">
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
          type: 'treemap',
          data: coloredData,
          roam,
          leafDepth,
          width: '100%',
          height: title ? '90%' : '100%',
          top: title ? 40 : 0,
          label: {
            show: true,
            position: 'insideTopLeft',
            formatter: (params: unknown) => {
              const p = params as { name: string; value: number };
              const percent = ((p.value / total) * 100).toFixed(1);
              return `{name|${p.name}}\n{value|${formatValue(p.value)}} {percent|(${percent}%)}`;
            },
            rich: {
              name: {
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                color: sentinelColors.textPrimary,
                lineHeight: 20,
              },
              value: {
                fontSize: 11,
                fontFamily: "'Space Mono', monospace",
                color: sentinelColors.textSecondary,
              },
              percent: {
                fontSize: 10,
                fontFamily: "'Space Mono', monospace",
                color: sentinelColors.textTertiary,
              },
            },
          },
          upperLabel: {
            show: true,
            height: 24,
            color: sentinelColors.textSecondary,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12,
          },
          itemStyle: {
            borderColor: sentinelColors.bgBase,
            borderWidth: 2,
            gapWidth: 2,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0, 0, 0, 0.4)',
            },
          },
          breadcrumb: showBreadcrumb
            ? {
                show: true,
                bottom: 10,
                left: 10,
                itemStyle: {
                  color: sentinelColors.bgSubtle,
                  borderColor: sentinelColors.borderDefault,
                  textStyle: {
                    color: sentinelColors.textSecondary,
                    fontSize: 11,
                  },
                },
                emphasis: {
                  itemStyle: {
                    color: sentinelColors.bgInteractive,
                  },
                },
              }
            : { show: false },
          levels: [
            {
              itemStyle: {
                borderWidth: 0,
                gapWidth: 4,
              },
            },
            {
              itemStyle: {
                borderWidth: 2,
                gapWidth: 2,
              },
            },
            {
              itemStyle: {
                borderWidth: 1,
                gapWidth: 1,
              },
            },
          ],
          animationDuration: 700,
          animationEasing: 'cubicOut',
        },
      ],
    };
  }, [data, title, colors, formatValue, showBreadcrumb, roam, leafDepth]);

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

export default TreeMap;
