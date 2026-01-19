// Path: src/components/atoms/LoadingScreen/LoadingScreen.tsx
import { FingEmblem } from "../FingEmblem";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  message?: string;
  showLogo?: boolean;
}

export function LoadingScreen({
  message = "Initializing",
  showLogo = true,
}: LoadingScreenProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {showLogo && (
          <div className={styles.logoContainer}>
            <FingEmblem size={80} animation="ripple" />
          </div>
        )}

        <h1 className={styles.title}>FING</h1>

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
