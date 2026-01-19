// Path: src/components/charts/echarts/TreeChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { fingColors, chartPalette } from './fingTheme';
import type { BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface TreeNode {
  name: string;
  value?: number;
  children?: TreeNode[];
  collapsed?: boolean;
  itemStyle?: {
    color?: string;
    borderColor?: string;
  };
  lineStyle?: {
    color?: string;
    width?: number;
  };
  label?: {
    show?: boolean;
  };
}

export type TreeLayout = 'orthogonal' | 'radial';
export type TreeOrient = 'LR' | 'RL' | 'TB' | 'BT';

export interface TreeChartProps extends BaseChartProps {
  data: TreeNode;
  title?: string;
  layout?: TreeLayout;
  orient?: TreeOrient;
  colors?: string[];
  symbolSize?: number;
  initialExpandLevel?: number;
  roam?: boolean | 'scale' | 'move';
  showLabels?: boolean;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom' | 'inside';
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function assignColors(node: TreeNode, colors: string[], depth = 0): TreeNode {
  return {
    ...node,
    itemStyle: {
      ...node.itemStyle,
      color: node.itemStyle?.color || colors[depth % colors.length],
      borderColor: node.itemStyle?.borderColor || colors[depth % colors.length],
    },
    children: node.children?.map((child) => assignColors(child, colors, depth + 1)),
  };
}

function setExpandLevel(node: TreeNode, level: number, currentDepth = 0): TreeNode {
  return {
    ...node,
    collapsed: currentDepth >= level,
    children: node.children?.map((child) => setExpandLevel(child, level, currentDepth + 1)),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function TreeChart({
  data,
  height = 500,
  title,
  layout = 'orthogonal',
  orient = 'LR',
  colors = chartPalette,
  symbolSize = 10,
  initialExpandLevel = 3,
  roam = true,
  showLabels = true,
  labelPosition = 'right',
  className,
  animate = true,
  loading = false,
}: TreeChartProps) {
  const option = useMemo<EChartsOption>(() => {
    if (!data.name) return {};

    // Apply colors and expand level
    let processedData = assignColors(data, colors);
    processedData = setExpandLevel(processedData, initialExpandLevel);

    // Calculate label position based on orient
    const getLabelPosition = (): 'left' | 'right' | 'top' | 'bottom' | 'inside' => {
      if (layout === 'radial') return 'right'; // Radial uses 'right' as default
      if (labelPosition !== 'right' && labelPosition !== 'left') return labelPosition;

      switch (orient) {
        case 'LR':
          return 'right';
        case 'RL':
          return 'left';
        case 'TB':
          return 'bottom';
        case 'BT':
          return 'top';
        default:
          return labelPosition;
      }
    };

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
            data: TreeNode;
            color: string;
            treeAncestors: Array<{ name: string }>;
          };

          const path = p.treeAncestors
            .map((a) => a.name)
            .filter((n) => n)
            .reverse()
            .join(' > ');

          let html = `<div style="font-family: 'Inter', sans-serif; font-size: 12px;">`;

          if (path && path !== p.name) {
            html += `<div style="color: ${fingColors.textTertiary}; font-size: 10px; margin-bottom: 8px;">${path}</div>`;
          }

          html += `<div style="display: flex; align-items: center; gap: 8px; font-weight: 500;">`;
          html += `<span style="width: 10px; height: 10px; border-radius: 50%; background: ${p.color};"></span>`;
          html += `${p.name}</div>`;

          if (p.data.value !== undefined) {
            html += `
              <div style="margin-top: 8px; display: flex; justify-content: space-between; gap: 16px;">
                <span style="color: ${fingColors.textTertiary};">Value</span>
                <span style="font-family: 'Space Mono', monospace; font-weight: 500;">${p.data.value}</span>
              </div>
            `;
          }

          const childCount = p.data.children?.length || 0;
          if (childCount > 0) {
            html += `
              <div style="display: flex; justify-content: space-between; gap: 16px;">
                <span style="color: ${fingColors.textTertiary};">Children</span>
                <span style="font-family: 'Space Mono', monospace;">${childCount}</span>
              </div>
            `;
          }

          html += '</div>';
          return html;
        },
      },
      series: [
        {
          type: 'tree',
          data: [processedData],
          layout,
          orient: layout === 'orthogonal' ? orient : undefined,
          roam,
          symbol: 'circle',
          symbolSize,
          initialTreeDepth: initialExpandLevel,
          top: title ? 60 : 30,
          bottom: 30,
          left: layout === 'radial' ? '15%' : orient === 'RL' ? 100 : 60,
          right: layout === 'radial' ? '15%' : orient === 'LR' ? 100 : 60,
          label: showLabels
            ? {
                show: true,
                position: getLabelPosition(),
                verticalAlign: 'middle',
                fontSize: 11,
                fontFamily: "'Inter', sans-serif",
                color: fingColors.textSecondary,
                distance: 8,
              }
            : { show: false },
          leaves: {
            label: showLabels
              ? {
                  show: true,
                  position: getLabelPosition(),
                  fontSize: 11,
                  fontFamily: "'Inter', sans-serif",
                  color: fingColors.textTertiary,
                }
              : { show: false },
          },
          lineStyle: {
            color: fingColors.borderDefault,
            width: 1.5,
            curveness: 0.5,
          },
          emphasis: {
            focus: 'descendant',
            lineStyle: {
              color: fingColors.accentPrimary,
              width: 2,
            },
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
          animationEasing: 'cubicOut',
        },
      ],
    };
  }, [data, title, layout, orient, colors, symbolSize, initialExpandLevel, roam, showLabels, labelPosition]);

  return (
    <EChart
      option={option}
      height={height}
      className={className}
      animate={animate}
      loading={loading}
      empty={!data.name}
    />
  );
}

export default TreeChart;
