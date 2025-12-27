// Path: src/components/organisms/DataGrid/components/DataGridEmpty.tsx
import React from 'react';
import { Inbox, SearchX, AlertCircle } from 'lucide-react';
import styles from '../DataGrid.module.css';

/* ═══════════════════════════════════════════════════════════════════════════════
   DataGridEmpty Component
   Renders empty, error, and loading states
   ═══════════════════════════════════════════════════════════════════════════════ */

interface DataGridEmptyProps {
  type: 'empty' | 'no-results' | 'error';
  message?: string;
  description?: string;
  action?: React.ReactNode;
}

export function DataGridEmpty({
  type,
  message,
  description,
  action,
}: DataGridEmptyProps) {
  const getIcon = () => {
    switch (type) {
      case 'empty':
        return <Inbox size={48} />;
      case 'no-results':
        return <SearchX size={48} />;
      case 'error':
        return <AlertCircle size={48} />;
      default:
        return <Inbox size={48} />;
    }
  };

  const getDefaultMessage = () => {
    switch (type) {
      case 'empty':
        return 'No hay datos';
      case 'no-results':
        return 'Sin resultados';
      case 'error':
        return 'Error al cargar datos';
      default:
        return 'No hay datos';
    }
  };

  const getDefaultDescription = () => {
    switch (type) {
      case 'empty':
        return 'No hay registros disponibles para mostrar.';
      case 'no-results':
        return 'No se encontraron resultados con los filtros aplicados.';
      case 'error':
        return 'Ocurrió un error al cargar los datos. Intenta de nuevo.';
      default:
        return '';
    }
  };

  return (
    <div className={styles.emptyState}>
      <div
        className={`${styles.emptyIcon} ${
          type === 'error' ? styles.emptyIconError : ''
        }`}
      >
        {getIcon()}
      </div>
      <h3 className={styles.emptyTitle}>{message || getDefaultMessage()}</h3>
      {(description || getDefaultDescription()) && (
        <p className={styles.emptyDescription}>
          {description || getDefaultDescription()}
        </p>
      )}
      {action && <div className={styles.emptyAction}>{action}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   DataGridLoading Component
   Renders loading skeleton
   ═══════════════════════════════════════════════════════════════════════════════ */

interface DataGridLoadingProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}

export function DataGridLoading({
  rows = 5,
  columns = 5,
  showHeader = true,
}: DataGridLoadingProps) {
  return (
    <div className={styles.loadingContainer}>
      {showHeader && (
        <div className={styles.loadingHeader}>
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className={styles.loadingCell}>
              <div className={styles.loadingSkeleton} style={{ width: '80%' }} />
            </div>
          ))}
        </div>
      )}
      <div className={styles.loadingBody}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className={styles.loadingRow}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className={styles.loadingCell}>
                <div
                  className={styles.loadingSkeleton}
                  style={{
                    width: `${60 + Math.random() * 30}%`,
                    animationDelay: `${(rowIndex + colIndex) * 0.05}s`,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   DataGridLoadingOverlay Component
   Renders loading overlay on top of existing content
   ═══════════════════════════════════════════════════════════════════════════════ */

interface DataGridLoadingOverlayProps {
  message?: string;
}

export function DataGridLoadingOverlay({
  message = 'Cargando...',
}: DataGridLoadingOverlayProps) {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingSpinner} />
      <span className={styles.loadingMessage}>{message}</span>
    </div>
  );
}
