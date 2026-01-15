// Path: src/components/charts/echarts/PictorialBarChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { sentinelColors, chartPalette } from './sentinelTheme';
import type { BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface PictorialBarDataPoint {
  name: string;
  value: number;
  symbol?: string;
  color?: string;
}

// Common symbols for ECharts pictorialBar
export const pictorialSymbols = {
  // Basic shapes (ECharts built-in)
  circle: 'circle',
  rect: 'rect',
  roundRect: 'roundRect',
  triangle: 'triangle',
  diamond: 'diamond',
  pin: 'pin',
  arrow: 'arrow',
  // Custom SVG paths
  person: 'path://M12,2A5,5,0,1,0,17,7,5,5,0,0,0,12,2Zm0,12c-5.33,0-8,2.67-8,8H20C20,16.67,17.33,14,12,14Z',
  dollar: 'path://M12,2V4.26A6,6,0,0,0,6,10c0,2.31,1.91,3.46,4.7,4.13,2.5.6,3,1.48,3,2.41,0,.69-.49,1.79-2.7,1.79a3.44,3.44,0,0,1-3-2.1H6a5.51,5.51,0,0,0,3.68,3.83V22h3V19.85c1.95-.37,3.5-1.5,3.5-3.55,0-2.84-2.43-3.81-4.7-4.4-2.27-.59-3-1.2-3-2.15,0-1.09,1-1.85,2.7-1.85,1.78,0,2.44.85,2.5,2.1h2.21a5.31,5.31,0,0,0-3.21-3.81V2Z',
  chart: 'path://M3,13H5v8H3ZM7,8H9V21H7ZM11,4h2V21H11ZM15,12h2v9H15Z',
  growth: 'path://M16,6l2.29,2.29-4.88,4.88-4-4L2,16.59,3.41,18l6-6,4,4,6.3-6.29L22,12V6Z',
  star: 'path://M12,17.27,18.18,21l-1.64-7L22,9.24l-7.19-.61L12,2,9.19,8.63,2,9.24l5.46,4.73L5.82,21Z',
};

// Shapes that should maintain 1:1 aspect ratio
const squareAspectSymbols = ['circle', 'diamond', 'triangle', 'pin', 'arrow', 'star'];

export interface PictorialBarChartProps extends BaseChartProps {
  data: PictorialBarDataPoint[];
  title?: string;
  colors?: string[];
  horizontal?: boolean;
  symbol?: string;
  symbolSize?: number | [number, number];
  symbolRepeat?: boolean | number;
  formatValue?: (value: number) => string;
  showLabels?: boolean;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right' | 'inside';
  maxValue?: number;
  barWidth?: number | string;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function PictorialBarChart({
  data,
  height = 350,
  title,
  colors = chartPalette,
  horizontal = false,
  symbol = 'roundRect',
  symbolSize = 30,
  symbolRepeat = false,
  formatValue = (v) => v.toLocaleString(),
  showLabels = true,
  labelPosition,
  maxValue,
  barWidth = '60%',
  className,
  animate = true,
  loading = false,
}: PictorialBarChartProps) {
  const option = useMemo<EChartsOption>(() => {
    if (!data.length) return {};

    const categories = data.map((d) => d.name);
    const max = maxValue ?? Math.max(...data.map((d) => d.value)) * 1.2;
    const dataMax = Math.max(...data.map((d) => d.value));

    // Check if this symbol should maintain square aspect ratio (no clipping)
    const isSquareAspect = squareAspectSymbols.includes(symbol) || symbol.startsWith('path://');

    // Auto-determine label position
    const effectiveLabelPosition = labelPosition ?? (horizontal ? 'right' : 'top');

    // For square-aspect symbols, we need to calculate size per data point
    // to avoid clipping distortion
    const seriesData = data.map((d, index) => {
      const itemSymbol = d.symbol || symbol;
      const itemIsSquare = squareAspectSymbols.includes(itemSymbol) || itemSymbol.startsWith('path://');

      // Calculate symbol size based on value ratio for square symbols
      let itemSymbolSize: number | [number, number] | [string, string];

      if (Array.isArray(symbolSize)) {
        itemSymbolSize = symbolSize;
      } else if (symbolRepeat) {
        // Repeat mode: fixed square size
        itemSymbolSize = [symbolSize, symbolSize];
      } else if (itemIsSquare) {
        // Square aspect: scale size based on value, maintaining aspect ratio
        // Use a minimum size and scale up based on value
        const minSize = symbolSize * 0.3;
        const valueRatio = dataMax > 0 ? d.value / dataMax : 1;
        const scaledSize = minSize + (symbolSize - minSize) * valueRatio;
        itemSymbolSize = [scaledSize, scaledSize];
      } else {
        // Rectangle symbols: use percentage to fill bar width
        if (horizontal) {
          itemSymbolSize = ['100%', '70%'];
        } else {
          itemSymbolSize = ['70%', '100%'];
        }
      }

      return {
        value: d.value,
        symbol: itemSymbol,
        symbolSize: itemSymbolSize,
        itemStyle: {
          color: d.color || colors[index % colors.length],
        },
      };
    });

    const categoryAxis = {
      type: 'category' as const,
      data: categories,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: sentinelColors.textSecondary,
        fontSize: 11,
        fontFamily: "'Inter', sans-serif",
        margin: 12,
      },
    };

    const valueAxis = {
      type: 'value' as const,
      max,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
    };

    // Determine if we should use clip mode (only for rect-like symbols)
    const useClipMode = !isSquareAspect && !symbolRepeat;

    return {
      title: title
        ? {
            text: title,
            left: 0,
            top: 0,
          }
        : undefined,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'none' },
        formatter: (params: unknown) => {
          const p = (params as Array<{ name: string; value: number; color: string }>)[0];
          if (!p) return '';
          return `
            <div style="font-family: 'Inter', sans-serif; font-size: 12px;">
              <div style="margin-bottom: 8px; font-weight: 500;">${p.name}</div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="width: 10px; height: 10px; border-radius: 2px; background: ${p.color};"></span>
                <span style="font-family: 'Space Mono', monospace; font-weight: 600;">${formatValue(p.value)}</span>
              </div>
            </div>
          `;
        },
      },
      grid: {
        left: horizontal ? 100 : 40,
        right: horizontal ? 80 : 40,
        top: title ? 60 : 30,
        bottom: horizontal ? 40 : 60,
        containLabel: false,
      },
      xAxis: horizontal ? valueAxis : categoryAxis,
      yAxis: horizontal ? categoryAxis : valueAxis,
      series: [
        {
          type: 'pictorialBar',
          data: seriesData,
          symbol,
          symbolRepeat: symbolRepeat ? (typeof symbolRepeat === 'number' ? symbolRepeat : true) : false,
          symbolClip: useClipMode,
          symbolMargin: symbolRepeat ? 4 : undefined,
          symbolPosition: 'start',
          barWidth,
          barCategoryGap: '40%',
          label: showLabels
            ? {
                show: true,
                position: effectiveLabelPosition,
                distance: 10,
                formatter: (params: unknown) => {
                  const p = params as { value: number };
                  return formatValue(p.value);
                },
                color: sentinelColors.textSecondary,
                fontSize: 12,
                fontFamily: "'Space Mono', monospace",
                fontWeight: 500,
              }
            : { show: false },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
          },
          animationDuration: 800,
          animationEasing: 'cubicOut',
        },
      ],
    };
  }, [data, title, colors, horizontal, symbol, symbolSize, symbolRepeat, formatValue, showLabels, labelPosition, maxValue, barWidth]);

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

export default PictorialBarChart;
