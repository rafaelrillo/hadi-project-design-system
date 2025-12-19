// src/components/charts/StatCard/StatCard.tsx
import { LucideIcon } from 'lucide-react';
import styles from './StatCard.module.css';

export interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function StatCard({
  label,
  value,
  change,
  icon: Icon,
  trend,
  className = ''
}: StatCardProps) {
  const getClassName = (): string => {
    const classes = [styles.card];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  const getChangeClassName = (): string => {
    const classes = [styles.change];
    if (trend === 'up' || (change && change > 0)) classes.push(styles.positive);
    if (trend === 'down' || (change && change < 0)) classes.push(styles.negative);
    return classes.join(' ');
  };

  const formatChange = (val: number): string => {
    const sign = val > 0 ? '+' : '';
    return `${sign}${val}%`;
  };

  return (
    <div className={getClassName()}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {Icon && <Icon className={styles.icon} size={20} />}
      </div>
      <div className={styles.value}>{value}</div>
      {change !== undefined && (
        <div className={getChangeClassName()}>
          {formatChange(change)}
        </div>
      )}
    </div>
  );
}
