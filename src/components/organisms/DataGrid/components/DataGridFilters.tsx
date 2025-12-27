// Path: src/components/organisms/DataGrid/components/DataGridFilters.tsx
import React, { useState, useCallback } from 'react';
import { Search, X, Filter, ChevronDown } from 'lucide-react';
import type { DataGridColumn, FilterType } from '../types';
import styles from '../DataGrid.module.css';

/* ═══════════════════════════════════════════════════════════════════════════════
   DataGridFilters Component
   Renders filter controls for each column
   ═══════════════════════════════════════════════════════════════════════════════ */

interface DataGridFiltersProps<T> {
  columns: DataGridColumn<T>[];
  filters: Record<string, unknown>;
  onFilterChange: (columnId: string, value: unknown) => void;
  onClearFilter: (columnId: string) => void;
  onClearAllFilters: () => void;
  hasActiveFilters: boolean;
}

export function DataGridFilters<T>({
  columns,
  filters,
  onFilterChange,
  onClearFilter,
  onClearAllFilters,
  hasActiveFilters,
}: DataGridFiltersProps<T>) {
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  const filterableColumns = columns.filter(
    (col) => col.filterable && !col.hidden
  );

  if (filterableColumns.length === 0) return null;

  const toggleFilter = (columnId: string) => {
    setExpandedFilter((prev) => (prev === columnId ? null : columnId));
  };

  const handleFilterChange = (columnId: string, value: unknown) => {
    onFilterChange(columnId, value);
  };

  const getFilterValue = (columnId: string): unknown => {
    return filters[columnId];
  };

  const hasFilterValue = (columnId: string): boolean => {
    const value = filters[columnId];
    return value !== undefined && value !== null && value !== '';
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <div className={styles.filtersTitle}>
          <Filter size={16} />
          <span>Filtros</span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className={styles.filtersClearAll}
            onClick={onClearAllFilters}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className={styles.filtersGrid}>
        {filterableColumns.map((column) => (
          <FilterControl
            key={column.id}
            column={column}
            value={getFilterValue(column.id)}
            hasValue={hasFilterValue(column.id)}
            isExpanded={expandedFilter === column.id}
            onToggle={() => toggleFilter(column.id)}
            onChange={(value) => handleFilterChange(column.id, value)}
            onClear={() => onClearFilter(column.id)}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   FilterControl Component
   Individual filter control based on filter type
   ═══════════════════════════════════════════════════════════════════════════════ */

interface FilterControlProps<T> {
  column: DataGridColumn<T>;
  value: unknown;
  hasValue: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (value: unknown) => void;
  onClear: () => void;
}

function FilterControl<T>({
  column,
  value,
  hasValue,
  isExpanded,
  onToggle,
  onChange,
  onClear,
}: FilterControlProps<T>) {
  const filterType = column.filter?.type || 'text';
  const label = typeof column.header === 'string' ? column.header : column.id;

  return (
    <div className={styles.filterControl}>
      <button
        type="button"
        className={`${styles.filterButton} ${hasValue ? styles.filterButtonActive : ''}`}
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <span className={styles.filterButtonLabel}>{label}</span>
        {hasValue && (
          <span
            className={styles.filterButtonClear}
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            role="button"
            aria-label="Limpiar filtro"
          >
            <X size={12} />
          </span>
        )}
        <ChevronDown
          size={14}
          className={`${styles.filterButtonChevron} ${isExpanded ? styles.filterButtonChevronOpen : ''}`}
        />
      </button>

      {isExpanded && (
        <div className={styles.filterDropdown}>
          <FilterInput
            type={filterType}
            value={value}
            options={column.filter?.options}
            placeholder={column.filter?.placeholder}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   FilterInput Component
   Renders the appropriate input based on filter type
   ═══════════════════════════════════════════════════════════════════════════════ */

interface FilterInputProps {
  type: FilterType;
  value: unknown;
  options?: { value: string; label: string }[];
  placeholder?: string;
  onChange: (value: unknown) => void;
}

function FilterInput({
  type,
  value,
  options,
  placeholder,
  onChange,
}: FilterInputProps) {
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value || undefined);
    },
    [onChange]
  );

  const handleNumberRangeChange = useCallback(
    (field: 'min' | 'max', val: string) => {
      const currentValue = (value as { min?: number; max?: number }) || {};
      onChange({
        ...currentValue,
        [field]: val ? Number(val) : undefined,
      });
    },
    [value, onChange]
  );

  const handleDateRangeChange = useCallback(
    (field: 'start' | 'end', val: string) => {
      const currentValue = (value as { start?: string; end?: string }) || {};
      onChange({
        ...currentValue,
        [field]: val || undefined,
      });
    },
    [value, onChange]
  );

  const handleBooleanChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value;
      if (val === '') {
        onChange(undefined);
      } else {
        onChange(val === 'true');
      }
    },
    [onChange]
  );

  switch (type) {
    case 'text':
      return (
        <div className={styles.filterInputWrapper}>
          <Search size={14} className={styles.filterInputIcon} />
          <input
            type="text"
            className={styles.filterInput}
            value={(value as string) || ''}
            onChange={handleTextChange}
            placeholder={placeholder || 'Buscar...'}
          />
        </div>
      );

    case 'select':
      return (
        <select
          className={styles.filterSelect}
          value={(value as string) || ''}
          onChange={handleSelectChange}
        >
          <option value="">Todos</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );

    case 'number':
      const numValue = value as { min?: number; max?: number } | undefined;
      return (
        <div className={styles.filterRangeInputs}>
          <input
            type="number"
            className={styles.filterInput}
            value={numValue?.min ?? ''}
            onChange={(e) => handleNumberRangeChange('min', e.target.value)}
            placeholder="Mín"
          />
          <span className={styles.filterRangeSeparator}>-</span>
          <input
            type="number"
            className={styles.filterInput}
            value={numValue?.max ?? ''}
            onChange={(e) => handleNumberRangeChange('max', e.target.value)}
            placeholder="Máx"
          />
        </div>
      );

    case 'date':
      return (
        <input
          type="date"
          className={styles.filterInput}
          value={(value as string) || ''}
          onChange={handleTextChange}
        />
      );

    case 'dateRange':
      const dateValue = value as { start?: string; end?: string } | undefined;
      return (
        <div className={styles.filterRangeInputs}>
          <input
            type="date"
            className={styles.filterInput}
            value={dateValue?.start ?? ''}
            onChange={(e) => handleDateRangeChange('start', e.target.value)}
          />
          <span className={styles.filterRangeSeparator}>-</span>
          <input
            type="date"
            className={styles.filterInput}
            value={dateValue?.end ?? ''}
            onChange={(e) => handleDateRangeChange('end', e.target.value)}
          />
        </div>
      );

    case 'boolean':
      return (
        <select
          className={styles.filterSelect}
          value={value === undefined ? '' : String(value)}
          onChange={handleBooleanChange}
        >
          <option value="">Todos</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      );

    default:
      return null;
  }
}
