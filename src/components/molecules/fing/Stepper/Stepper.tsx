// Path: src/components/molecules/fing/Stepper/Stepper.tsx

import { Check } from 'lucide-react';
import styles from './Stepper.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface Step {
  /** Unique step identifier */
  id: string;
  /** Step label */
  label: string;
  /** Optional description */
  description?: string;
  /** Optional icon component */
  icon?: React.ReactNode;
}

export interface StepperProps {
  /** Array of steps */
  steps: Step[];
  /** Current active step index (0-based) */
  currentStep: number;
  /** Callback when a step is clicked (if clickable) */
  onStepClick?: (stepIndex: number) => void;
  /** Whether completed steps are clickable */
  clickableCompleted?: boolean;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show step numbers */
  showNumbers?: boolean;
  /** Show description */
  showDescription?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function Stepper({
  steps,
  currentStep,
  onStepClick,
  clickableCompleted = true,
  orientation = 'horizontal',
  size = 'md',
  showNumbers = true,
  showDescription = false,
}: StepperProps) {
  const handleStepClick = (index: number) => {
    if (!onStepClick) return;

    // Only allow clicking on completed steps
    if (clickableCompleted && index < currentStep) {
      onStepClick(index);
    }
  };

  const getStepStatus = (index: number): 'completed' | 'active' | 'pending' => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'pending';
  };

  // Build container classes
  const containerClasses = [
    styles.container,
    styles[orientation],
    styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
  ].join(' ');

  return (
    <div className={containerClasses} role="navigation" aria-label="Progress steps">
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isClickable = clickableCompleted && status === 'completed' && onStepClick;
        const isLast = index === steps.length - 1;

        const stepClasses = [
          styles.step,
          styles[status],
          isClickable && styles.clickable,
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div key={step.id} className={stepClasses}>
            {/* Step Indicator */}
            <button
              type="button"
              className={styles.indicator}
              onClick={() => handleStepClick(index)}
              disabled={!isClickable}
              aria-current={status === 'active' ? 'step' : undefined}
              aria-label={`Step ${index + 1}: ${step.label}${status === 'completed' ? ' (completed)' : status === 'active' ? ' (current)' : ''}`}
            >
              {status === 'completed' ? (
                <Check size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />
              ) : showNumbers ? (
                <span className={styles.number}>{index + 1}</span>
              ) : step.icon ? (
                step.icon
              ) : (
                <span className={styles.dot} />
              )}
            </button>

            {/* Step Content */}
            <div className={styles.content}>
              <span className={styles.label}>{step.label}</span>
              {showDescription && step.description && (
                <span className={styles.description}>{step.description}</span>
              )}
            </div>

            {/* Connector Line */}
            {!isLast && (
              <div
                className={`${styles.connector} ${index < currentStep ? styles.connectorCompleted : ''}`}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
