// Path: src/components/organisms/Toast/ToastContext.tsx
import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import type { Toast, ToastInput, ToastContextValue, ToastProviderProps } from './types';
import { ToastContainer } from './ToastContainer';

/* ═══════════════════════════════════════════════════════════════════════════════
   TOAST CONTEXT
   Provides toast functionality throughout the application
   ═══════════════════════════════════════════════════════════════════════════════ */

// Default values
const DEFAULT_DURATION = 5000;
const DEFAULT_MAX_VISIBLE = 5;
const DEFAULT_POSITION = 'bottom-right';

// Create context
const ToastContext = createContext<ToastContextValue | null>(null);

// Generate unique ID
let toastCounter = 0;
function generateId(): string {
  return `toast-${Date.now()}-${++toastCounter}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// TOAST PROVIDER
// ─────────────────────────────────────────────────────────────────────────────

export function ToastProvider({
  children,
  position = DEFAULT_POSITION,
  maxVisible = DEFAULT_MAX_VISIBLE,
  defaultDuration = DEFAULT_DURATION,
  gap = 12,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Clear timer for a toast
  const clearTimer = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  // Start timer for auto-dismiss
  const startTimer = useCallback(
    (id: string, duration: number) => {
      if (duration <= 0) return;

      clearTimer(id);

      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        timersRef.current.delete(id);
      }, duration);

      timersRef.current.set(id, timer);
    },
    [clearTimer]
  );

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  // Add a toast
  const toast = useCallback(
    (options: ToastInput): string => {
      const id = generateId();
      const duration = options.duration ?? defaultDuration;

      const newToast: Toast = {
        ...options,
        id,
        type: options.type ?? 'default',
        dismissible: options.dismissible ?? true,
        createdAt: Date.now(),
      };

      setToasts((prev) => {
        // Remove oldest toasts if exceeding maxVisible
        const newToasts = [...prev, newToast];
        if (newToasts.length > maxVisible) {
          const toRemove = newToasts.slice(0, newToasts.length - maxVisible);
          toRemove.forEach((t) => clearTimer(t.id));
          return newToasts.slice(-maxVisible);
        }
        return newToasts;
      });

      // Start auto-dismiss timer
      if (duration > 0) {
        startTimer(id, duration);
      }

      return id;
    },
    [defaultDuration, maxVisible, startTimer, clearTimer]
  );

  // Shorthand methods
  const success = useCallback(
    (title: string, options?: Partial<ToastInput>): string => {
      return toast({ title, type: 'success', ...options });
    },
    [toast]
  );

  const error = useCallback(
    (title: string, options?: Partial<ToastInput>): string => {
      return toast({ title, type: 'error', duration: 0, ...options }); // Errors persist by default
    },
    [toast]
  );

  const warning = useCallback(
    (title: string, options?: Partial<ToastInput>): string => {
      return toast({ title, type: 'warning', ...options });
    },
    [toast]
  );

  const info = useCallback(
    (title: string, options?: Partial<ToastInput>): string => {
      return toast({ title, type: 'info', ...options });
    },
    [toast]
  );

  // Dismiss a toast
  const dismiss = useCallback(
    (id: string) => {
      clearTimer(id);
      setToasts((prev) => prev.filter((t) => t.id !== id));
    },
    [clearTimer]
  );

  // Dismiss all toasts
  const dismissAll = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  // Update a toast
  const update = useCallback(
    (id: string, options: Partial<ToastInput>) => {
      setToasts((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t;

          // If duration changed, restart timer
          if (options.duration !== undefined && options.duration !== t.duration) {
            clearTimer(id);
            if (options.duration > 0) {
              startTimer(id, options.duration);
            }
          }

          return { ...t, ...options };
        })
      );
    },
    [clearTimer, startTimer]
  );

  // Context value
  const contextValue: ToastContextValue = {
    toasts,
    toast,
    success,
    error,
    warning,
    info,
    dismiss,
    dismissAll,
    update,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer
        toasts={toasts}
        onDismiss={dismiss}
        position={position}
        gap={gap}
      />
    </ToastContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// USE TOAST HOOK
// ─────────────────────────────────────────────────────────────────────────────

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}
