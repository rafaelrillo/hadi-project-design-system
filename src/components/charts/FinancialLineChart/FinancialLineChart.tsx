// Path: src/components/charts/FinancialLineChart/FinancialLineChart.tsx
import { ResponsiveLine } from '@nivo/line';
import type { LineSeries, SliceTooltipProps, Point } from '@nivo/line';
import { sentinelChartTheme, sentinelChartColors, sentinelColors } from '../theme';
import styles from './FinancialLineChart.module.css';

export interface ChartMarker {
  value: number | string;
  label: string;
  type?: 'event' | 'threshold' | 'target';
  axis?: 'x' | 'y';
}

export interface FinancialLineChartProps {
  data: LineSeries[];
  height?: number;
  enableArea?: boolean;
  enablePoints?: boolean;
  showZeroLine?: boolean;
  markers?: ChartMarker[];
  formatValue?: (value: number) => string;
  formatLabel?: (label: string | number) => string;
  yAxisLabel?: string;
  xAxisLabel?: string;
  className?: string;
  animate?: boolean;
}

// Default financial number formatter
const defaultFormatValue = (value: number): string => {
  if (Math.abs(value) >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B`;
  }
  if (Math.abs(value) >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }
  if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toFixed(2);
};

// Custom tooltip component with monospace numbers
function FinancialTooltip({
  slice,
  formatValue,
}: SliceTooltipProps<LineSeries> & { formatValue: (value: number) => string }) {
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipHeader}>
        {String(slice.points[0]?.data.x ?? '')}
      </div>
      <div className={styles.tooltipContent}>
        {slice.points.map((point: Point<LineSeries>) => (
          <div key={point.id} className={styles.tooltipRow}>
            <span
              className={styles.tooltipColor}
              style={{ backgroundColor: point.seriesColor }}
            />
            <span className={styles.tooltipLabel}>{String(point.seriesId)}</span>
            <span className={styles.tooltipValue}>
              {formatValue(Number(point.data.y) || 0)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FinancialLineChart({
  data,
  height = 300,
  enableArea = true,
  enablePoints = false,
  showZeroLine = true,
  markers = [],
  formatValue = defaultFormatValue,
  formatLabel,
  yAxisLabel,
  xAxisLabel,
  className = '',
  animate = true,
}: FinancialLineChartProps) {
  const containerClasses = [styles.container, className].filter(Boolean).join(' ');

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className={containerClasses} style={{ height: `${height}px` }}>
        <div className={styles.emptyState}>No data available</div>
      </div>
    );
  }

  // Calculate min/max for Y axis to include zero if needed
  let yMin: number | 'auto' = 'auto';
  let yMax: number | 'auto' = 'auto';

  if (showZeroLine) {
    const allValues = data.flatMap((series) =>
      series.data.map((d) => Number(d.y) || 0)
    );
    const dataMin = Math.min(...allValues);
    const dataMax = Math.max(...allValues);

    // Ensure zero is included
    yMin = Math.min(0, dataMin);
    yMax = Math.max(0, dataMax);

    // Add padding
    const range = yMax - yMin;
    const padding = range * 0.1;
    yMin = yMin - (yMin < 0 ? padding : 0);
    yMax = yMax + padding;
  }

  // Build Nivo markers array
  const nivoMarkers = [
    // Zero line marker
    ...(showZeroLine
      ? [
          {
            axis: 'y' as const,
            value: 0,
            lineStyle: {
              stroke: sentinelColors.borderDefault,
              strokeWidth: 1,
              strokeDasharray: '4 4',
            },
          },
        ]
      : []),
    // Custom markers
    ...markers.map((marker) => ({
      axis: marker.axis || ('y' as const),
      value: marker.value,
      legend: marker.label,
      legendOrientation: 'horizontal' as const,
      legendPosition: 'top-right' as const,
      lineStyle: {
        stroke:
          marker.type === 'threshold'
            ? sentinelColors.warning
            : marker.type === 'target'
            ? sentinelColors.positive
            : sentinelColors.accentPrimary,
        strokeWidth: 1,
        strokeDasharray: marker.type === 'event' ? '2 2' : '4 4',
      },
      textStyle: {
        fill: sentinelColors.textSecondary,
        fontSize: 10,
      },
    })),
  ];

  return (
    <div className={containerClasses} style={{ height: `${height}px` }}>
      <ResponsiveLine
        data={data}
        colors={sentinelChartColors}
        margin={{
          top: 20,
          right: 30,
          bottom: xAxisLabel ? 60 : 40,
          left: yAxisLabel ? 70 : 55,
        }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: yMin,
          max: yMax,
          stacked: false,
        }}
        curve="monotoneX"
        lineWidth={2}
        axisBottom={{
          tickSize: 0,
          tickPadding: 12,
          tickRotation: 0,
          legend: xAxisLabel,
          legendOffset: 45,
          legendPosition: 'middle',
          format: formatLabel,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 12,
          tickRotation: 0,
          legend: yAxisLabel,
          legendOffset: -55,
          legendPosition: 'middle',
          format: (value) => formatValue(value as number),
        }}
        enableGridX={false}
        enableGridY={true}
        theme={sentinelChartTheme}
        pointSize={enablePoints ? 6 : 0}
        pointColor={sentinelColors.bgElevated}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enableArea={enableArea}
        areaOpacity={0.08}
        areaBaselineValue={showZeroLine ? 0 : undefined}
        useMesh={true}
        enableSlices="x"
        sliceTooltip={(props) => (
          <FinancialTooltip {...props} formatValue={formatValue} />
        )}
        markers={nivoMarkers}
        animate={animate}
        motionConfig="gentle"
        defs={[
          {
            id: 'areaGradient',
            type: 'linearGradient',
            colors: [
              { offset: 0, color: 'inherit', opacity: 0.2 },
              { offset: 100, color: 'inherit', opacity: 0 },
            ],
          },
        ]}
        fill={[{ match: '*', id: 'areaGradient' }]}
        crosshairType="cross"
      />
    </div>
  );
}

export default FinancialLineChart;
