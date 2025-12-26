// Path: src/components/organisms/sentinel/SystemPulse/SystemPulse.tsx
import styles from './SystemPulse.module.css';

export type SystemStatus = 'active' | 'processing' | 'idle' | 'offline';

export interface SystemPulseProps {
  status: SystemStatus;
  label?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const statusLabels: Record<SystemStatus, string> = {
  active: 'Active',
  processing: 'Processing',
  idle: 'Idle',
  offline: 'Offline',
};

export function SystemPulse({
  status,
  label,
  showLabel = true,
  size = 'md',
}: SystemPulseProps) {
  const displayLabel = label ?? statusLabels[status];

  const containerClasses = [
    styles.container,
    styles[size],
    styles[status],
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      role="status"
      aria-label={`System status: ${displayLabel}`}
    >
      {/* Pulse indicator */}
      <div className={styles.pulseContainer}>
        {/* Outer pulse ring (for active/processing states) */}
        {(status === 'active' || status === 'processing') && (
          <div className={styles.pulseRing} />
        )}

        {/* Core dot */}
        <div className={styles.dot}>
          {/* Inner glow */}
          <div className={styles.dotCore} />
        </div>
      </div>

      {/* Label */}
      {showLabel && (
        <span className={styles.label}>{displayLabel}</span>
      )}
    </div>
  );
}

export default SystemPulse;
