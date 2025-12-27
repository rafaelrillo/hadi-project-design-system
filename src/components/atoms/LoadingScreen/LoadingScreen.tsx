// Path: src/components/atoms/LoadingScreen/LoadingScreen.tsx
import { AtmosphericBackground } from "../sentinel/AtmosphericBackground";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  message?: string;
  showLogo?: boolean;
}

export function LoadingScreen({
  message = "Initializing system",
  showLogo = true,
}: LoadingScreenProps) {
  return (
    <div className={styles.container}>
      <AtmosphericBackground variant="subtle" animated />

      <div className={styles.content}>
        {showLogo && (
          <div className={styles.logoContainer}>
            <svg
              className={styles.logo}
              width="80"
              height="80"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer ring */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="var(--sentinel-accent-primary)"
                strokeWidth="2"
                strokeDasharray="8 4"
                className={styles.outerRing}
              />
              {/* Middle ring */}
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="var(--sentinel-accent-secondary)"
                strokeWidth="1.5"
                className={styles.middleRing}
              />
              {/* Inner circle */}
              <circle
                cx="50"
                cy="50"
                r="20"
                fill="var(--sentinel-accent-subtle)"
                stroke="var(--sentinel-accent-primary)"
                strokeWidth="2"
              />
              {/* Center dot */}
              <circle
                cx="50"
                cy="50"
                r="8"
                fill="var(--sentinel-accent-primary)"
                className={styles.centerDot}
              />
              {/* Scan line */}
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="5"
                stroke="var(--sentinel-accent-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                className={styles.scanLine}
              />
            </svg>
          </div>
        )}

        <h1 className={styles.title}>SENTINEL</h1>

        <div className={styles.messageContainer}>
          <span className={styles.message}>{message}</span>
          <span className={styles.dots}>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
          </span>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressFill} />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
