// Path: src/components/molecules/Tabs/Tabs.tsx
import React from "react";
import type { LucideIcon } from "lucide-react";
import styles from "./Tabs.module.css";

export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: "default" | "pills";
  size?: "sm" | "md" | "lg";
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = "default",
  size = "md",
}: TabsProps) {
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    const enabledTabs = tabs.filter((t) => !t.disabled);
    const currentIndex = enabledTabs.findIndex((t) => t.id === activeTab);

    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const direction = e.key === "ArrowLeft" ? -1 : 1;
      const newIndex =
        (currentIndex + direction + enabledTabs.length) % enabledTabs.length;
      onChange(enabledTabs[newIndex].id);
    }
  };

  return (
    <div
      className={`${styles.tabs} ${styles[variant]} ${styles[size]}`}
      role="tablist"
      aria-orientation="horizontal"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-disabled={tab.disabled}
            tabIndex={isActive ? 0 : -1}
            disabled={tab.disabled}
            className={`${styles.tab} ${isActive ? styles.active : ""} ${
              tab.disabled ? styles.disabled : ""
            }`}
            onClick={() => !tab.disabled && onChange(tab.id)}
            onKeyDown={handleKeyDown}
          >
            {Icon && <Icon className={styles.icon} size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />}
            <span className={styles.label}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
