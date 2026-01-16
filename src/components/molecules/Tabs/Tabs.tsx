// Path: src/components/molecules/Tabs/Tabs.tsx
import { type KeyboardEvent, type CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { useLightEngineOptional } from "@contexts/LightEngineContext";
import styles from "./Tabs.module.css";

export type TabsVariant = "default" | "pills" | "neuInset";

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
  variant?: TabsVariant;
  size?: "sm" | "md" | "lg";
  /** Enable dynamic shadows from Light Engine */
  dynamicShadows?: boolean;
}

// Glass hue for active tab
const GLASS_TAB = {
  hue: 175,
  sat: 35,
};

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = "default",
  size = "md",
  dynamicShadows = true,
}: TabsProps) {
  // Get light engine context (optional)
  const lightEngine = useLightEngineOptional();

  // Get dynamic styles for container (neuInset variant)
  const getContainerDynamicStyles = (): CSSProperties | undefined => {
    if (variant !== "neuInset" || !dynamicShadows || !lightEngine) return undefined;

    const { shadows } = lightEngine;
    return {
      boxShadow: shadows.getNeuInsetShadow(4, 10),
    };
  };

  // Get dynamic styles for active tab (glass)
  const getActiveTabDynamicStyles = (): CSSProperties | undefined => {
    if (variant !== "neuInset" || !dynamicShadows || !lightEngine) return undefined;

    const { shadows } = lightEngine;
    return {
      boxShadow: `${shadows.getNeuPanelShadow(3, 6)}, inset 0 1px 0 rgba(255, 255, 255, 0.7)`,
      background: shadows.getGlassBackground(GLASS_TAB.hue, GLASS_TAB.sat),
    };
  };

  // Get container className
  const getContainerClassName = (): string => {
    const classes = [styles.tabs, styles[variant], styles[size]];
    if (variant === "neuInset" && dynamicShadows && lightEngine) {
      classes.push(styles.dynamicShadows);
    }
    return classes.join(" ");
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>
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
      className={getContainerClassName()}
      style={getContainerDynamicStyles()}
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
            style={isActive ? getActiveTabDynamicStyles() : undefined}
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
