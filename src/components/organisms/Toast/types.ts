// Path: src/components/organisms/Toast/types.ts

/* ═══════════════════════════════════════════════════════════════════════════════
   TOAST SYSTEM TYPES
   TypeScript interfaces for the Toast notification system
   ═══════════════════════════════════════════════════════════════════════════════ */

import React from 'react';

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface Toast {
  /** Unique identifier */
  id: string;
  /** Toast title */
  title: string;
  /** Optional description/message */
  description?: string;
  /** Toast type for styling */
  type?: ToastType;
  /** Duration in ms (0 for persistent) */
  duration?: number;
  /** Action button */
  action?: ToastAction;
  /** Whether toast can be dismissed */
  dismissible?: boolean;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Timestamp when toast was created */
  createdAt: number;
}

export type ToastInput = Omit<Toast, 'id' | 'createdAt'>;

export interface ToastContextValue {
  toasts: Toast[];
  toast: (options: ToastInput) => string;
  success: (title: string, options?: Partial<ToastInput>) => string;
  error: (title: string, options?: Partial<ToastInput>) => string;
  warning: (title: string, options?: Partial<ToastInput>) => string;
  info: (title: string, options?: Partial<ToastInput>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  update: (id: string, options: Partial<ToastInput>) => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Position of toast container */
  position?: ToastPosition;
  /** Maximum number of visible toasts */
  maxVisible?: number;
  /** Default duration in ms */
  defaultDuration?: number;
  /** Gap between toasts */
  gap?: number;
}

export interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
  position: ToastPosition;
}
