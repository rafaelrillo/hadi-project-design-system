// Path: src/components/charts/echarts/EChart.tsx
import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import * as echarts from 'echarts';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { motion } from 'framer-motion';
import './sentinelTheme'; // Register theme on import
import styles from './EChart.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface EChartProps {
  option: echarts.EChartsOption;
  height?: number | string;
  loading?: boolean;
  empty?: boolean;
  emptyMessage?: string;
  className?: string;
  animate?: boolean;
  animationDelay?: number;
  onChartReady?: (chart: echarts.ECharts) => void;
  onEvents?: Record<string, (params: unknown) => void>;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  showLoading?: boolean;
  opts?: {
    renderer?: 'canvas' | 'svg';
    devicePixelRatio?: number;
    width?: number | 'auto';
    height?: number | 'auto';
    locale?: string;
  };
}

export interface EChartRef {
  getEchartsInstance: () => echarts.ECharts | undefined;
  resize: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number], // --sentinel-ease-default
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export const EChart = forwardRef<EChartRef, EChartProps>(
  (
    {
      option,
      height = 300,
      loading = false,
      empty = false,
      emptyMessage = 'No data available',
      className = '',
      animate = true,
      animationDelay = 0,
      onChartReady,
      onEvents,
      notMerge = false,
      lazyUpdate = false,
      showLoading = false,
      opts = { renderer: 'canvas' },
    },
    ref
  ) => {
    const chartRef = useRef<ReactEChartsCore>(null);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      getEchartsInstance: () => chartRef.current?.getEchartsInstance(),
      resize: () => chartRef.current?.getEchartsInstance()?.resize(),
    }));

    // Handle resize
    useEffect(() => {
      const handleResize = () => {
        chartRef.current?.getEchartsInstance()?.resize();
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Notify when chart is ready
    useEffect(() => {
      if (onChartReady && chartRef.current) {
        const instance = chartRef.current.getEchartsInstance();
        if (instance) {
          onChartReady(instance);
        }
      }
    }, [onChartReady]);

    const containerClasses = `${styles.container} ${className}`.trim();
    const heightValue = typeof height === 'number' ? `${height}px` : height;

    // Loading state
    if (loading) {
      return (
        <div className={containerClasses} style={{ height: heightValue }}>
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner} />
            <span className={styles.loadingText}>Loading...</span>
          </div>
        </div>
      );
    }

    // Empty state
    if (empty) {
      return (
        <div className={containerClasses} style={{ height: heightValue }}>
          <div className={styles.emptyState}>{emptyMessage}</div>
        </div>
      );
    }

    // Chart content
    const chartContent = (
      <ReactEChartsCore
        ref={chartRef}
        echarts={echarts}
        option={option}
        theme="sentinel"
        style={{ height: heightValue, width: '100%' }}
        notMerge={notMerge}
        lazyUpdate={lazyUpdate}
        showLoading={showLoading}
        onEvents={onEvents}
        opts={opts}
      />
    );

    // With or without animation wrapper
    if (animate) {
      return (
        <motion.div
          className={containerClasses}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: animationDelay }}
        >
          {chartContent}
        </motion.div>
      );
    }

    return <div className={containerClasses}>{chartContent}</div>;
  }
);

EChart.displayName = 'EChart';

export default EChart;
