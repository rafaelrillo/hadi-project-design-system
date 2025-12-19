// Terminal Theme Version
import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';

interface LogEntry {
  timestamp: string;
  description: string;
}

interface LogsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogsModal({ isOpen, onClose }: LogsModalProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Generate 25 mock logs
  const logs: LogEntry[] = Array.from({ length: 25 }, (_, i) => {
    const hours = 10;
    const minutes = i;
    const timestamp = `${hours}:${minutes.toString().padStart(2, '0')}:00`;
    return {
      timestamp,
      description: 'Item del historial de Logs'
    };
  });

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(message);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  };

  const copyAllLogs = () => {
    const allLogsText = logs
      .map(log => `[${log.timestamp}] ${log.description}`)
      .join('\n');
    copyToClipboard(allLogsText, 'Todos los logs copiados al portapapeles');
  };

  const copySingleLog = (log: LogEntry) => {
    const logText = `[${log.timestamp}] ${log.description}`;
    copyToClipboard(logText, 'Log copiado al portapapeles');
  };

  if (!isOpen) return null;

  const overlayStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 40,
    animation: 'fadeIn 300ms ease-out',
    fontFamily: 'var(--font-mono)'
  };

  const modalStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: '56px',
    width: '40%',
    minWidth: '400px',
    height: '100vh',
    backgroundColor: 'var(--background-secondary)',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideInLeft 300ms ease-out',
    fontFamily: 'var(--font-mono)',
    border: '1px solid var(--border)'
  };

  const headerStyles: React.CSSProperties = {
    padding: '16px 20px',
    borderBottom: '1px solid var(--border)',
    backgroundColor: 'var(--background-secondary)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--primary)',
    fontFamily: 'var(--font-mono)',
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    textShadow: '0 0 10px var(--accent-glow)'
  };

  const copyButtonStyles: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--foreground-muted)',
    transition: 'color 200ms'
  };

  const logsContainerStyles: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: 'var(--background-secondary)'
  };

  const logItemStyles = (index: number, isHovered: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    backgroundColor: isHovered ? 'var(--background-tertiary)' : index % 2 === 0 ? 'var(--background-secondary)' : 'var(--background)',
    transition: 'background-color 200ms',
    fontFamily: 'var(--font-mono)'
  });

  const timestampStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--primary)',
    fontFamily: 'var(--font-mono)',
    width: '80px',
    flexShrink: 0
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--foreground)',
    flexGrow: 1,
    fontFamily: 'var(--font-mono)'
  };

  const toastStyles: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'var(--background-tertiary)',
    color: 'var(--foreground)',
    padding: '12px 24px',
    borderRadius: 'var(--radius)',
    fontSize: '14px',
    fontFamily: 'var(--font-mono)',
    zIndex: 100,
    animation: 'fadeIn 200ms ease-out',
    opacity: showToast ? 1 : 0,
    pointerEvents: showToast ? 'auto' : 'none',
    transition: 'opacity 200ms',
    border: '1px solid var(--border)'
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideInLeft {
            from {
              transform: translateX(-100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>

      {/* Overlay */}
      <div
        style={overlayStyles}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logs-modal-title"
      />

      {/* Modal */}
      <div style={modalStyles}>
        {/* Header */}
        <div style={headerStyles}>
          <h2 id="logs-modal-title" style={titleStyles}>GDM</h2>
          <button
            type="button"
            onClick={copyAllLogs}
            style={copyButtonStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--foreground-muted)';
            }}
            aria-label="Copiar todos los logs"
          >
            <Copy size={20} />
          </button>
        </div>

        {/* Logs List */}
        <div style={logsContainerStyles}>
          {logs.map((log, index) => (
            <div
              key={index}
              style={logItemStyles(index, hoveredIndex === index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span style={timestampStyles}>{log.timestamp}</span>
              <span style={descriptionStyles}>{log.description}</span>
              <button
                type="button"
                onClick={() => copySingleLog(log)}
                style={copyButtonStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--foreground-muted)';
                }}
                aria-label={`Copiar log ${log.timestamp}`}
              >
                <Copy size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div style={toastStyles}>
          {toastMessage}
        </div>
      )}
    </>
  );
}
