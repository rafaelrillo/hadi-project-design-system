// Path: src/components/atoms/Button/ToggleButton.tsx

import type { ToggleButtonProps } from './Button.types';
import styles from './Button.module.css';

/**
 * Neumorphic toggle switch component.
 *
 * @example
 * const [darkMode, setDarkMode] = useState(false);
 *
 * <ToggleButton
 *   isOn={darkMode}
 *   onToggle={() => setDarkMode(!darkMode)}
 *   size="md"
 *   aria-label="Toggle dark mode"
 * />
 */
export function ToggleButton({
  isOn,
  onToggle,
  size = 'md',
  disabled = false,
  'aria-label': ariaLabel,
  className,
}: ToggleButtonProps) {
  const trackClasses = [
    styles.toggleTrack,
    styles[size],
    isOn && styles.on,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      role="switch"
      className={trackClasses}
      disabled={disabled}
      onClick={onToggle}
      aria-checked={isOn}
      aria-label={ariaLabel}
    >
      <span className={styles.toggleKnob} />
    </button>
  );
}

export default ToggleButton;
