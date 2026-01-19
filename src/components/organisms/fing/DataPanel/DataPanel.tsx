// Path: src/components/organisms/fing/DataPanel/DataPanel.tsx

import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronUp, type LucideIcon } from 'lucide-react';
import styles from './DataPanel.module.css';

export interface DataPanelProps {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  headerActions?: ReactNode;
  variant?: 'default' | 'compact' | 'transparent';
  className?: string;
}

export function DataPanel({
  title,
  icon: Icon,
  children,
  collapsible = false,
  defaultExpanded = true,
  headerActions,
  variant = 'default',
  className = '',
}: DataPanelProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const containerClasses = [
    styles.panel,
    styles[variant],
    !isExpanded ? styles.collapsed : '',
    className,
  ].filter(Boolean).join(' ');

  const handleToggle = () => {
    if (collapsible) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={containerClasses}>
      <header
        className={styles.header}
        onClick={handleToggle}
        role={collapsible ? 'button' : undefined}
        aria-expanded={collapsible ? isExpanded : undefined}
        tabIndex={collapsible ? 0 : undefined}
        onKeyDown={(e) => {
          if (collapsible && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <div className={styles.headerLeft}>
          {Icon && <Icon size={16} className={styles.headerIcon} />}
          <h3 className={styles.title}>{title}</h3>
        </div>

        <div className={styles.headerRight}>
          {headerActions && (
            <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
              {headerActions}
            </div>
          )}

          {collapsible && (
            <button
              className={styles.toggleButton}
              aria-label={isExpanded ? 'Collapse panel' : 'Expand panel'}
              onClick={(e) => {
                e.stopPropagation();
                handleToggle();
              }}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>
      </header>

      {isExpanded && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
}

export default DataPanel;
