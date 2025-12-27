// Path: src/components/atoms/Skeleton/Skeleton.tsx
import styles from "./Skeleton.module.css";

export interface SkeletonProps {
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "shimmer" | "none";
  className?: string;
  lines?: number; // For text variant - number of lines
}

export function Skeleton({
  variant = "rectangular",
  width,
  height,
  animation = "shimmer",
  className = "",
  lines = 1,
}: SkeletonProps) {
  const getStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {};

    if (width) {
      style.width = typeof width === "number" ? `${width}px` : width;
    }

    if (height) {
      style.height = typeof height === "number" ? `${height}px` : height;
    }

    return style;
  };

  const classNames = [
    styles.skeleton,
    styles[variant],
    styles[animation],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // For text variant with multiple lines
  if (variant === "text" && lines > 1) {
    return (
      <div className={styles.textContainer}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={classNames}
            style={{
              ...getStyle(),
              width: i === lines - 1 ? "70%" : getStyle().width,
            }}
          />
        ))}
      </div>
    );
  }

  return <div className={classNames} style={getStyle()} />;
}

// Preset skeletons for common use cases
export function IndicatorSkeleton() {
  return (
    <div className={styles.indicatorSkeleton}>
      <Skeleton variant="text" width={80} height={12} />
      <Skeleton variant="text" width={120} height={24} />
      <Skeleton variant="text" width={60} height={10} />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className={styles.cardSkeleton}>
      <div className={styles.cardHeader}>
        <Skeleton variant="circular" width={40} height={40} />
        <div className={styles.cardHeaderText}>
          <Skeleton variant="text" width={120} height={14} />
          <Skeleton variant="text" width={80} height={10} />
        </div>
      </div>
      <Skeleton variant="text" lines={3} height={12} />
      <div className={styles.cardFooter}>
        <Skeleton variant="rectangular" width={60} height={24} />
        <Skeleton variant="rectangular" width={80} height={24} />
      </div>
    </div>
  );
}

export function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div className={styles.chartSkeleton} style={{ height }}>
      <div className={styles.chartHeader}>
        <Skeleton variant="text" width={150} height={16} />
        <Skeleton variant="rectangular" width={100} height={28} />
      </div>
      <div className={styles.chartArea}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <div className={styles.tableRowSkeleton}>
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === 1 ? "60%" : "80%"}
          height={14}
        />
      ))}
    </div>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className={styles.metricCardSkeleton}>
      <Skeleton variant="text" width={100} height={12} />
      <Skeleton variant="text" width={80} height={28} />
      <div className={styles.metricTrend}>
        <Skeleton variant="rectangular" width={50} height={16} />
        <Skeleton variant="text" width={40} height={10} />
      </div>
    </div>
  );
}

export default Skeleton;
