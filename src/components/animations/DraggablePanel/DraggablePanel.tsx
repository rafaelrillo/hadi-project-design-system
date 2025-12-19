// src/components/animations/DraggablePanel/DraggablePanel.tsx
import { ReactNode, useRef } from 'react';
import { motion, useDragControls, PanInfo } from 'framer-motion';

export interface DraggablePanelProps {
  children: ReactNode;
  /** Drag axis constraint */
  axis?: 'x' | 'y' | 'both';
  /** Drag constraints - can be a ref or pixel values */
  constraints?: { top?: number; right?: number; bottom?: number; left?: number } | React.RefObject<HTMLElement | null>;
  /** Whether to use elastic constraints */
  elastic?: boolean | number;
  /** Momentum after drag */
  momentum?: boolean;
  /** Callback when drag starts */
  onDragStart?: () => void;
  /** Callback when drag ends */
  onDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  /** Callback during drag */
  onDrag?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  /** Additional className */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Show drag handle */
  showHandle?: boolean;
  /** Handle position */
  handlePosition?: 'top' | 'left';
}

export function DraggablePanel({
  children,
  axis = 'both',
  constraints,
  elastic = 0.5,
  momentum = true,
  onDragStart,
  onDragEnd,
  onDrag,
  className = '',
  style,
  showHandle = true,
  handlePosition = 'top'
}: DraggablePanelProps) {
  const dragControls = useDragControls();

  const dragAxis = axis === 'both' ? undefined : axis;

  const handleStyles: React.CSSProperties = {
    width: handlePosition === 'top' ? '40px' : '6px',
    height: handlePosition === 'top' ? '6px' : '40px',
    backgroundColor: 'var(--foreground-muted)',
    borderRadius: '3px',
    cursor: 'grab',
    opacity: 0.5,
    transition: 'opacity 0.2s',
    position: 'absolute',
    ...(handlePosition === 'top'
      ? { top: '8px', left: '50%', transform: 'translateX(-50%)' }
      : { left: '8px', top: '50%', transform: 'translateY(-50%)' }
    )
  };

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    touchAction: 'none',
    ...style
  };

  return (
    <motion.div
      drag={dragAxis === undefined ? true : dragAxis}
      dragControls={dragControls}
      dragConstraints={constraints}
      dragElastic={elastic}
      dragMomentum={momentum}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrag={onDrag}
      whileDrag={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
      className={className}
      style={containerStyles}
    >
      {showHandle && (
        <div
          style={handleStyles}
          onPointerDown={(e) => dragControls.start(e)}
        />
      )}
      {children}
    </motion.div>
  );
}

// Sortable list item with drag reordering
export interface DraggableItemProps {
  children: ReactNode;
  /** Unique ID for reordering */
  id: string;
  /** Callback when reorder occurs */
  onReorder?: (id: string, newIndex: number) => void;
  /** Current index */
  index: number;
  /** Additional className */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export function DraggableItem({
  children,
  id,
  index,
  className = '',
  style
}: DraggableItemProps) {
  return (
    <motion.div
      layout
      layoutId={id}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.1}
      whileDrag={{
        scale: 1.02,
        boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
        zIndex: 100
      }}
      className={className}
      style={{
        position: 'relative',
        cursor: 'grab',
        ...style
      }}
      data-index={index}
    >
      {children}
    </motion.div>
  );
}

// Container with drag constraints
export interface DragConstraintsContainerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function DragConstraintsContainer({
  children,
  className = '',
  style
}: DragConstraintsContainerProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={constraintsRef}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {children}
    </div>
  );
}
