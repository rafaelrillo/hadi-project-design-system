// Path: src/components/charts/echarts/CandlestickChart.tsx
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import { EChart } from './EChart';
import { sentinelColors, tooltipFormatters } from './sentinelTheme';
import type { OHLCData, BaseChartProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface CandlestickChartProps extends BaseChartProps {
  data: OHLCData[];
  showVolume?: boolean;
  showDataZoom?: boolean;
  upColor?: string;
  downColor?: string;
  title?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function CandlestickChart({
  data,
  height = 400,
  showVolume = true,
  showDataZoom = true,
  upColor = sentinelColors.positive,
  downColor = sentinelColors.negative,
  title,
  className,
  animate = true,
  loading = false,
}: CandlestickChartProps) {
  const option = useMemo<EChartsOption>(() => {
    if (!data.length) return {};

    const dates = data.map((d) => d.time);
    const ohlcData = data.map((d) => [d.open, d.close, d.low, d.high]);
    const volumeData = data.map((d) => ({
      value: d.volume || 0,
      itemStyle: {
        color: d.close >= d.open ? `${upColor}80` : `${downColor}80`,
      },
    }));

    const gridHeight = showVolume ? '55%' : '75%';
    const volumeGridTop = showVolume ? '68%' : '100%';

    return {
      title: title
        ? {
            text: title,
            left: 0,
          }
        : undefined,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        formatter: (params: unknown) => {
          const paramArray = params as Array<{
            axisValue: string;
            data: number[];
            seriesName: string;
          }>;
          const candleData = paramArray.find((p) => p.seriesName === 'OHLC');
          if (!candleData) return '';

          const [open, close, low, high] = candleData.data;
          return `
            <div style="font-family: 'Space Mono', monospace; font-size: 11px;">
              <div style="margin-bottom: 8px; color: ${sentinelColors.textTertiary};">${candleData.axisValue}</div>
              ${tooltipFormatters.ohlc({ open, high, low, close })}
            </div>
          `;
        },
      },
      axisPointer: {
        link: [{ xAxisIndex: 'all' }],
      },
      grid: [
        {
          left: 60,
          right: 20,
          top: title ? 50 : 20,
          height: gridHeight,
        },
        ...(showVolume
          ? [
              {
                left: 60,
                right: 20,
                top: volumeGridTop,
                height: '18%',
              },
            ]
          : []),
      ],
      xAxis: [
        {
          type: 'category',
          data: dates,
          boundaryGap: true,
          axisLine: { lineStyle: { color: sentinelColors.borderSubtle } },
          axisLabel: {
            color: sentinelColors.textTertiary,
            fontSize: 10,
            fontFamily: "'Space Mono', monospace",
          },
          min: 'dataMin',
          max: 'dataMax',
        },
        ...(showVolume
          ? [
              {
                type: 'category' as const,
                gridIndex: 1,
                data: dates,
                boundaryGap: true,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                min: 'dataMin',
                max: 'dataMax',
              },
            ]
          : []),
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          splitNumber: 5,
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
        ...(showVolume
          ? [
              {
                type: 'value' as const,
                gridIndex: 1,
                scale: true,
                splitNumber: 2,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                splitLine: { show: false },
              },
            ]
          : []),
      ],
      dataZoom: showDataZoom
        ? [
            {
              type: 'inside',
              xAxisIndex: showVolume ? [0, 1] : [0],
              start: 0,
              end: 100,
            },
            {
              type: 'slider',
              xAxisIndex: showVolume ? [0, 1] : [0],
              start: 0,
              end: 100,
              bottom: 10,
              height: 20,
              backgroundColor: sentinelColors.bgSubtle,
              borderColor: sentinelColors.borderSubtle,
              fillerColor: sentinelColors.accentSubtle,
              handleStyle: {
                color: sentinelColors.accentPrimary,
              },
              textStyle: {
                color: sentinelColors.textTertiary,
                fontSize: 10,
              },
            },
          ]
        : [],
      series: [
        {
          name: 'OHLC',
          type: 'candlestick',
          data: ohlcData,
          itemStyle: {
            color: upColor,
            color0: downColor,
            borderColor: upColor,
            borderColor0: downColor,
          },
        },
        ...(showVolume
          ? [
              {
                name: 'Volume',
                type: 'bar' as const,
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: volumeData,
                barMaxWidth: 20,
              },
            ]
          : []),
      ],
    };
  }, [data, showVolume, showDataZoom, upColor, downColor, title]);

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

export default CandlestickChart;
