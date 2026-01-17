// Path: src/components/atoms/Button/ButtonGroup.tsx

import type { ButtonGroupProps } from './Button.types';
import styles from './Button.module.css';

/**
 * Container for grouping related buttons.
 *
 * @example
 * <ButtonGroup variant="neu">
 *   <Button variant="neu-flat" size="sm">Cancel</Button>
 *   <Button variant="neu-accent" size="sm">Confirm</Button>
 * </ButtonGroup>
 *
 * @example
 * // Toolbar with icon buttons
 * <ButtonGroup variant="neu" orientation="horizontal">
 *   <IconButton icon={<Bold />} variant="neu-flat" aria-label="Bold" />
 *   <IconButton icon={<Italic />} variant="neu-flat" aria-label="Italic" />
 *   <IconButton icon={<Underline />} variant="neu-flat" aria-label="Underline" />
 * </ButtonGroup>
 */
export function ButtonGroup({
  children,
  variant = 'neu',
  orientation = 'horizontal',
  gap = 4,
  className,
}: ButtonGroupProps) {
  const classNames = [
    styles.buttonGroup,
    orientation === 'horizontal'
      ? styles.buttonGroupHorizontal
      : styles.buttonGroupVertical,
    variant === 'neu' ? styles.buttonGroupNeu : styles.buttonGroupGlass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={{ gap: `${gap}px` }} role="group">
      {children}
    </div>
  );
}

export default ButtonGroup;
