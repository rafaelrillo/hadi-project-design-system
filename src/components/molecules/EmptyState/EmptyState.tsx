// Path: src/components/molecules/EmptyState/EmptyState.tsx
import type { ReactNode } from "react";
import { Inbox, Search, FileQuestion, TrendingUp, Wallet } from "lucide-react";
import { Button } from "../../atoms/Button";
import styles from "./EmptyState.module.css";

type EmptyStateVariant = "default" | "search" | "data" | "portfolio" | "recommendations";

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const defaultIcons: Record<EmptyStateVariant, ReactNode> = {
  default: <Inbox size={48} />,
  search: <Search size={48} />,
  data: <FileQuestion size={48} />,
  portfolio: <Wallet size={48} />,
  recommendations: <TrendingUp size={48} />,
};

export function EmptyState({
  variant = "default",
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  const displayIcon = icon || defaultIcons[variant];

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.iconContainer}>{displayIcon}</div>

      <h3 className={styles.title}>{title}</h3>

      {description && (
        <p className={styles.description}>{description}</p>
      )}

      {action && (
        <Button
          variant="secondary"
          onClick={action.onClick}
          className={styles.actionButton}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}

// Preset empty states for common use cases
export function NoDataEmptyState({ onRetry }: { onRetry?: () => void }) {
  return (
    <EmptyState
      variant="data"
      title="No data available"
      description="We couldn't load the data. Please try again."
      action={onRetry ? { label: "Retry", onClick: onRetry } : undefined}
    />
  );
}

export function NoResultsEmptyState({ query }: { query?: string }) {
  return (
    <EmptyState
      variant="search"
      title="No results found"
      description={
        query
          ? `No results for "${query}". Try adjusting your search.`
          : "Try adjusting your filters or search criteria."
      }
    />
  );
}

export function EmptyPortfolioState({ onAddHolding }: { onAddHolding?: () => void }) {
  return (
    <EmptyState
      variant="portfolio"
      title="Your portfolio is empty"
      description="Start building your portfolio by adding your first investment."
      action={onAddHolding ? { label: "Add holding", onClick: onAddHolding } : undefined}
    />
  );
}

export function NoRecommendationsState() {
  return (
    <EmptyState
      variant="recommendations"
      title="No recommendations yet"
      description="Our analysis is still processing. Check back soon for personalized recommendations."
    />
  );
}

export default EmptyState;
