// Path: src/components/molecules/NotificationCard/NotificationCard.tsx
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import styles from './NotificationCard.module.css';

export interface NotificationCardProps {
  title: string;
  message: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  showIcon?: boolean;
}

const getClassName = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export function NotificationCard({
  title,
  message,
  variant = 'info',
  onClose,
  showIcon = true
}: NotificationCardProps) {
  const variantConfig = {
    success: {
      className: styles.variantSuccess,
      iconColor: '#0B7329'
    },
    error: {
      className: styles.variantError,
      iconColor: '#B50000'
    },
    warning: {
      className: styles.variantWarning,
      iconColor: '#FAB400'
    },
    info: {
      className: styles.variantInfo,
      iconColor: '#006081'
    }
  };

  const config = variantConfig[variant];

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckCircle size={20} color={config.iconColor} />;
      case 'error':
        return <AlertCircle size={20} color={config.iconColor} />;
      case 'warning':
        return <AlertCircle size={20} color={config.iconColor} />;
      case 'info':
        return <Info size={20} color={config.iconColor} />;
    }
  };

  return (
    <div className={getClassName(styles.container, config.className)}>
      {showIcon && (
        <div className={styles.iconContainer}>
          {getIcon()}
        </div>
      )}
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.message}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Cerrar notificación"
        >
          <X size={16} color="#222222" />
        </button>
      )}
    </div>
  );
}
