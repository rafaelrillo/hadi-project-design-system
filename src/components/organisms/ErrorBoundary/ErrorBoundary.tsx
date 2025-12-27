// Path: src/components/organisms/ErrorBoundary/ErrorBoundary.tsx
import React, { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "../../atoms/Button";
import styles from "./ErrorBoundary.module.css";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  showDetails?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleGoHome = (): void => {
    window.location.href = "/app/dashboard";
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.iconContainer}>
              <AlertTriangle className={styles.icon} size={48} />
            </div>

            <h2 className={styles.title}>Something went wrong</h2>
            <p className={styles.description}>
              We encountered an unexpected error. This has been logged and
              we&apos;ll look into it.
            </p>

            {this.props.showDetails && this.state.error && (
              <div className={styles.details}>
                <p className={styles.errorName}>{this.state.error.name}</p>
                <p className={styles.errorMessage}>{this.state.error.message}</p>
              </div>
            )}

            <div className={styles.actions}>
              <Button
                variant="primary"
                onClick={this.handleRetry}
                className={styles.retryButton}
              >
                <RefreshCw size={16} />
                Try again
              </Button>

              <Button
                variant="secondary"
                onClick={this.handleGoHome}
                className={styles.homeButton}
              >
                <Home size={16} />
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Functional wrapper for easier use with hooks
interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  title?: string;
  description?: string;
}

export function ErrorFallback({
  error,
  resetError,
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
}: ErrorFallbackProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <AlertTriangle className={styles.icon} size={48} />
        </div>

        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>

        {error && import.meta.env.DEV && (
          <div className={styles.details}>
            <p className={styles.errorMessage}>{error.message}</p>
          </div>
        )}

        {resetError && (
          <div className={styles.actions}>
            <Button variant="primary" onClick={resetError}>
              <RefreshCw size={16} />
              Try again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ErrorBoundary;
