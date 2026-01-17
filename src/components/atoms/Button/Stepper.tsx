// Path: src/components/atoms/Button/Stepper.tsx

import { Minus, Plus } from 'lucide-react';
import type { StepperProps } from './Button.types';
import styles from './Button.module.css';

/**
 * Numeric stepper with increment/decrement buttons.
 *
 * @example
 * const [quantity, setQuantity] = useState(1);
 *
 * <Stepper
 *   value={quantity}
 *   onChange={setQuantity}
 *   min={1}
 *   max={99}
 *   variant="neu"
 *   size="md"
 * />
 */
export function Stepper({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  variant = 'neu',
  size = 'md',
  disabled = false,
  className,
}: StepperProps) {
  const containerClasses = [
    styles.stepper,
    styles[size],
    variant === 'neu' ? styles.stepperNeu : styles.stepperGlass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleDecrement = () => {
    const newValue = value - step;
    if (newValue >= min) {
      onChange(newValue);
    }
  };

  const handleIncrement = () => {
    const newValue = value + step;
    if (newValue <= max) {
      onChange(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;

  return (
    <div className={containerClasses}>
      <button
        type="button"
        className={styles.stepperButton}
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        aria-label="Decrease value"
      >
        <Minus size={iconSize} />
      </button>
      <input
        type="number"
        className={styles.stepperValue}
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        aria-label="Current value"
      />
      <button
        type="button"
        className={styles.stepperButton}
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        aria-label="Increase value"
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
}

export default Stepper;
