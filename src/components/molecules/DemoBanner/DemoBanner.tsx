// Path: src/components/molecules/DemoBanner/DemoBanner.tsx
import { useState, useEffect } from "react";
import { X, FlaskConical } from "lucide-react";
import styles from "./DemoBanner.module.css";

interface DemoBannerProps {
  message?: string;
  storageKey?: string;
}

export function DemoBanner({
  message = "Demo Mode - Data is simulated for demonstration purposes",
  storageKey = "sentinel-demo-banner-dismissed",
}: DemoBannerProps) {
  const [isDismissed, setIsDismissed] = useState(true); // Start hidden to prevent flash

  useEffect(() => {
    // Check localStorage on mount
    const dismissed = localStorage.getItem(storageKey);
    setIsDismissed(dismissed === "true");
  }, [storageKey]);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem(storageKey, "true");
  };

  // Don't render if dismissed or not in demo mode
  if (isDismissed) {
    return null;
  }

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <FlaskConical className={styles.icon} size={14} />
        <span className={styles.message}>{message}</span>
      </div>
      <button
        className={styles.closeButton}
        onClick={handleDismiss}
        aria-label="Dismiss demo banner"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export default DemoBanner;
