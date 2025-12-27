// Path: src/hooks/useKeyboardShortcuts.ts
import { useEffect, useCallback, useState } from "react";

export interface Shortcut {
  key: string;
  description: string;
  action: () => void;
  modifiers?: {
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
  };
}

interface UseKeyboardShortcutsOptions {
  enabled?: boolean;
  preventDefault?: boolean;
}

export function useKeyboardShortcuts(
  shortcuts: Record<string, () => void>,
  options: UseKeyboardShortcutsOptions = {}
) {
  const { enabled = true, preventDefault = true } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const key = event.key.toLowerCase();
      const shortcutFn = shortcuts[key];

      if (shortcutFn) {
        if (preventDefault) {
          event.preventDefault();
        }
        shortcutFn();
      }
    },
    [shortcuts, enabled, preventDefault]
  );

  useEffect(() => {
    if (enabled) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleKeyDown, enabled]);
}

// Hook for showing shortcuts help modal
export function useShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Listen for ? key to open help
  useKeyboardShortcuts(
    {
      "?": toggle,
      escape: close,
    },
    { enabled: true }
  );

  return { isOpen, open, close, toggle };
}

// Dashboard-specific shortcuts
export interface DashboardShortcuts {
  setActiveTab: (tab: string) => void;
  toggleLive: () => void;
  refresh: () => void;
}

export function useDashboardShortcuts({
  setActiveTab,
  toggleLive,
  refresh,
}: DashboardShortcuts) {
  const shortcuts = {
    "1": () => setActiveTab("overview"),
    "2": () => setActiveTab("portfolio"),
    "3": () => setActiveTab("recommendations"),
    "4": () => setActiveTab("market"),
    "5": () => setActiveTab("analysis"),
    r: refresh,
    l: toggleLive,
  };

  useKeyboardShortcuts(shortcuts);
}

// Shortcuts reference for help modal
export const DASHBOARD_SHORTCUTS: Shortcut[] = [
  { key: "1", description: "Go to Overview", action: () => {} },
  { key: "2", description: "Go to Portfolio", action: () => {} },
  { key: "3", description: "Go to Recommendations", action: () => {} },
  { key: "4", description: "Go to Market", action: () => {} },
  { key: "5", description: "Go to Analysis", action: () => {} },
  { key: "R", description: "Refresh data", action: () => {} },
  { key: "L", description: "Toggle live updates", action: () => {} },
  { key: "?", description: "Show keyboard shortcuts", action: () => {} },
  { key: "Esc", description: "Close modal", action: () => {} },
];
