// Path: src/components/organisms/Table/Table.tsx
import { useState, Fragment, type ReactNode, type CSSProperties } from 'react';
import { LucideIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Checkbox } from '../../atoms/Checkbox';
import { useLightEngineOptional } from '@contexts/LightEngineContext';
import styles from './Table.module.css';

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: TableRow) => ReactNode;
}

export interface TableRow {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  actions?: TableAction[];
  expandedContent?: ReactNode;
}

export interface TableAction {
  icon: LucideIcon;
  label: string;
  onClick: (row: TableRow) => void;
  variant?: 'default' | 'destructive';
}

export type TableStyle = 'default' | 'neuPanel';

export interface TableProps {
  columns: TableColumn[];
  data: TableRow[];
  rowHeight?: 'standard' | 'compact';
  selectable?: boolean;
  selectedRows?: string[];
  onRowSelect?: (rowIds: string[]) => void;
  expandable?: boolean;
  onRowClick?: (row: TableRow) => void;
  /** Visual style for table container */
  tableStyle?: TableStyle;
  /** Enable dynamic shadows from Light Engine */
  dynamicShadows?: boolean;
  className?: string;
}

const getClassName = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(' ');

export function Table({
  columns,
  data,
  rowHeight = 'standard',
  selectable = false,
  selectedRows = [],
  onRowSelect,
  expandable = false,
  onRowClick,
  tableStyle = 'default',
  dynamicShadows = true,
  className,
}: TableProps) {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [focusedRow, setFocusedRow] = useState<string | null>(null);

  // Get light engine context (optional)
  const lightEngine = useLightEngineOptional();

  const columnCount = columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0);

  // Determine border style based on column count
  const getBorderStyle = (): 'full' | 'bottom' | 'none' => {
    if (columnCount >= 8) return 'full';
    if (columnCount >= 4) return 'bottom';
    return 'none';
  };

  const borderStyle = getBorderStyle();

  const handleSelectAll = () => {
    if (!onRowSelect) return;

    if (selectedRows.length === data.length) {
      onRowSelect([]);
    } else {
      onRowSelect(data.map(row => row.id));
    }
  };

  const handleRowSelect = (rowId: string) => {
    if (!onRowSelect) return;

    if (selectedRows.includes(rowId)) {
      onRowSelect(selectedRows.filter(id => id !== rowId));
    } else {
      onRowSelect([...selectedRows, rowId]);
    }
  };

  const toggleRowExpansion = (rowId: string) => {
    if (expandedRows.includes(rowId)) {
      setExpandedRows(expandedRows.filter(id => id !== rowId));
    } else {
      setExpandedRows([...expandedRows, rowId]);
    }
  };

  const isRowSelected = (rowId: string) => selectedRows.includes(rowId);
  const isRowExpanded = (rowId: string) => expandedRows.includes(rowId);

  const getTableClassName = () => {
    return getClassName(
      styles.table,
      rowHeight === 'compact' && styles.tableCompact,
      borderStyle === 'full' && styles.tableFull,
      className
    );
  };

  const getAlignClassName = (align?: 'left' | 'center' | 'right') => {
    if (align === 'center') return styles.alignCenter;
    if (align === 'right') return styles.alignRight;
    return undefined; // left is default in CSS
  };

  const getHeaderCellClassName = (options?: { fixedWidth?: boolean; align?: 'left' | 'center' | 'right' }) => {
    return getClassName(
      styles.th,
      borderStyle === 'full' && styles.thFull,
      borderStyle === 'bottom' && styles.thBottom,
      borderStyle === 'none' && styles.thNone,
      options?.fixedWidth && styles.thFixedWidth,
      getAlignClassName(options?.align)
    );
  };

  const getRowClassName = (row: TableRow, index: number, _isLastRow: boolean) => {
    const isSelected = isRowSelected(row.id);
    const isHovered = hoveredRow === row.id;
    const isFocused = focusedRow === row.id;

    return getClassName(
      styles.tr,
      isSelected && styles.trSelected,
      isHovered && !isSelected && styles.trHovered,
      borderStyle === 'none' && index % 2 === 1 && !isSelected && !isHovered && styles.trAlternate,
      borderStyle === 'none' && styles.trRounded,
      borderStyle === 'none' && isSelected && styles.trSelectedIndicator,
      onRowClick && styles.trClickable,
      isFocused && styles.trFocused
    );
  };

  const getCellClassName = (isLastRow: boolean, options?: { fixedWidth?: boolean; align?: 'left' | 'center' | 'right' }) => {
    return getClassName(
      styles.td,
      borderStyle === 'full' && styles.tdFull,
      borderStyle === 'bottom' && !isLastRow && styles.tdBottom,
      options?.fixedWidth && styles.tdFixedWidth,
      getAlignClassName(options?.align)
    );
  };

  // Get wrapper className for neuPanel style
  const getWrapperClassName = (): string => {
    const classes = [styles.tableWrapper];
    if (tableStyle === 'neuPanel') classes.push(styles.neuPanel);
    if (dynamicShadows && lightEngine && tableStyle === 'neuPanel') {
      classes.push(styles.dynamicShadows);
    }
    return classes.join(' ');
  };

  // Get dynamic styles for neuPanel
  const getDynamicStyles = (): CSSProperties | undefined => {
    if (tableStyle !== 'neuPanel' || !dynamicShadows || !lightEngine) return undefined;

    const { shadows } = lightEngine;
    return {
      boxShadow: `${shadows.getNeuPanelShadow(8, 16)}, inset 0 1px 0 rgba(255, 255, 255, 0.7)`,
    };
  };

  const tableElement = (
    <table className={getTableClassName()}>
      <thead>
        <tr>
          {selectable && (
            <th className={getHeaderCellClassName({ fixedWidth: true })}>
              <Checkbox
                checked={selectedRows.length === data.length && data.length > 0}
                onChange={handleSelectAll}
                ariaLabel="Seleccionar todas las filas"
              />
            </th>
          )}
          {expandable && (
            <th className={getHeaderCellClassName({ fixedWidth: true })} />
          )}
          {columns.map((column) => (
            <th
              key={column.key}
              className={getHeaderCellClassName({ align: column.align })}
              style={column.width ? { width: column.width } : undefined}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => {
          const isLastRow = rowIndex === data.length - 1;
          const isExpanded = isRowExpanded(row.id);

          return (
            <Fragment key={row.id}>
              <tr
                className={getRowClassName(row, rowIndex, isLastRow)}
                onMouseEnter={() => setHoveredRow(row.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onFocus={() => setFocusedRow(row.id)}
                onBlur={() => setFocusedRow(null)}
                onClick={() => onRowClick?.(row)}
                tabIndex={onRowClick ? 0 : -1}
                aria-selected={isRowSelected(row.id)}
              >
                {selectable && (
                  <td
                    className={getCellClassName(isLastRow, { fixedWidth: true })}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={isRowSelected(row.id)}
                      onChange={() => handleRowSelect(row.id)}
                      ariaLabel={`Seleccionar fila ${row.id}`}
                    />
                  </td>
                )}
                {expandable && (
                  <td className={getCellClassName(isLastRow, { fixedWidth: true })}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRowExpansion(row.id);
                      }}
                      className={styles.expandButton}
                      aria-label={isExpanded ? 'Contraer fila' : 'Expandir fila'}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={getCellClassName(isLastRow, { align: column.align })}
                  >
                    {column.render ? column.render(row[column.key], row) : row[column.key]}

                    {/* Render actions if this is the last column and row has actions */}
                    {column.key === columns[columns.length - 1].key && row.actions && (
                      <div className={styles.actionsContainer}>
                        {row.actions.map((action, actionIndex) => {
                          const Icon = action.icon;
                          return (
                            <button
                              key={actionIndex}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                action.onClick(row);
                              }}
                              className={getClassName(
                                styles.actionButton,
                                action.variant === 'destructive' && styles.actionButtonDestructive
                              )}
                              aria-label={action.label}
                              title={action.label}
                            >
                              <Icon size={16} />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
              {/* Expanded content row */}
              {expandable && isExpanded && row.expandedContent && (
                <tr>
                  <td
                    colSpan={columnCount}
                    className={getClassName(
                      styles.expandedCell,
                      borderStyle === 'bottom' && styles.expandedCellBorder
                    )}
                  >
                    {row.expandedContent}
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );

  // Wrap in container for neuPanel style
  if (tableStyle === 'neuPanel') {
    return (
      <div className={getWrapperClassName()} style={getDynamicStyles()}>
        {tableElement}
      </div>
    );
  }

  return tableElement;
}
