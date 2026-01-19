// Path: src/components/molecules/fing/DateRangePicker/DateRangePicker.tsx

import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, X } from 'lucide-react';
import styles from './DateRangePicker.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  presets?: DatePreset[];
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export interface DatePreset {
  label: string;
  getValue: () => DateRange;
}

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT PRESETS
// ─────────────────────────────────────────────────────────────────────────────

const getDefaultPresets = (): DatePreset[] => [
  {
    label: 'Today',
    getValue: () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return { start: today, end: today };
    },
  },
  {
    label: 'Yesterday',
    getValue: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      return { start: yesterday, end: yesterday };
    },
  },
  {
    label: 'Last 7 days',
    getValue: () => {
      const end = new Date();
      end.setHours(0, 0, 0, 0);
      const start = new Date(end);
      start.setDate(start.getDate() - 6);
      return { start, end };
    },
  },
  {
    label: 'Last 30 days',
    getValue: () => {
      const end = new Date();
      end.setHours(0, 0, 0, 0);
      const start = new Date(end);
      start.setDate(start.getDate() - 29);
      return { start, end };
    },
  },
  {
    label: 'This month',
    getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date();
      end.setHours(0, 0, 0, 0);
      return { start, end };
    },
  },
  {
    label: 'Last month',
    getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return { start, end };
    },
  },
  {
    label: 'This year',
    getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date();
      end.setHours(0, 0, 0, 0);
      return { start, end };
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatDisplayValue = (range: DateRange): string => {
  if (!range.start && !range.end) return '';
  if (range.start && range.end) {
    if (range.start.getTime() === range.end.getTime()) {
      return formatDate(range.start);
    }
    return `${formatDate(range.start)} - ${formatDate(range.end)}`;
  }
  return formatDate(range.start || range.end);
};

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function DateRangePicker({
  value,
  onChange,
  presets = getDefaultPresets(),
  minDate,
  maxDate,
  placeholder = 'Select date range',
  disabled = false,
  className = '',
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');
  const [tempRange, setTempRange] = useState<DateRange>(value);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset temp range when opened
  useEffect(() => {
    if (isOpen) {
      setTempRange(value);
      setSelecting('start');
    }
  }, [isOpen, value]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange({ start: null, end: null });
    setIsOpen(false);
  };

  const handlePresetClick = (preset: DatePreset) => {
    const range = preset.getValue();
    onChange(range);
    setIsOpen(false);
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    clickedDate.setHours(0, 0, 0, 0);

    if (selecting === 'start') {
      setTempRange({ start: clickedDate, end: null });
      setSelecting('end');
    } else {
      if (tempRange.start && clickedDate < tempRange.start) {
        setTempRange({ start: clickedDate, end: tempRange.start });
      } else {
        setTempRange({ ...tempRange, end: clickedDate });
      }
      onChange({
        start: tempRange.start && clickedDate < tempRange.start ? clickedDate : tempRange.start,
        end: tempRange.start && clickedDate < tempRange.start ? tempRange.start : clickedDate,
      });
      setIsOpen(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isDateDisabled = (day: number): boolean => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateInRange = (day: number): boolean => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const start = tempRange.start;
    const end = tempRange.end;
    if (!start || !end) return false;
    return date >= start && date <= end;
  };

  const isDateSelected = (day: number): boolean => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    const start = tempRange.start;
    const end = tempRange.end;
    if (start && date.getTime() === start.getTime()) return true;
    if (end && date.getTime() === end.getTime()) return true;
    return false;
  };

  const isToday = (day: number): boolean => {
    const today = new Date();
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Calendar grid
  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const days: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const displayValue = formatDisplayValue(value);

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.open : ''} ${disabled ? styles.disabled : ''}`}
        onClick={handleToggle}
        disabled={disabled}
      >
        <Calendar size={16} className={styles.icon} />
        <span className={displayValue ? styles.value : styles.placeholder}>
          {displayValue || placeholder}
        </span>
        {displayValue ? (
          <button type="button" className={styles.clearBtn} onClick={handleClear}>
            <X size={14} />
          </button>
        ) : (
          <ChevronDown size={16} className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`} />
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className={styles.dropdown}>
          {/* Presets */}
          <div className={styles.presets}>
            <span className={styles.presetsLabel}>Quick Select</span>
            {presets.map((preset, index) => (
              <button
                key={index}
                type="button"
                className={styles.presetBtn}
                onClick={() => handlePresetClick(preset)}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Calendar */}
          <div className={styles.calendar}>
            {/* Calendar Header */}
            <div className={styles.calendarHeader}>
              <button type="button" className={styles.navBtn} onClick={handlePrevMonth}>
                &lt;
              </button>
              <span className={styles.monthLabel}>
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button type="button" className={styles.navBtn} onClick={handleNextMonth}>
                &gt;
              </button>
            </div>

            {/* Weekdays */}
            <div className={styles.weekdays}>
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <span key={day} className={styles.weekday}>
                  {day}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className={styles.daysGrid}>
              {days.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  className={`
                    ${styles.dayBtn}
                    ${day === null ? styles.empty : ''}
                    ${day && isDateDisabled(day) ? styles.disabled : ''}
                    ${day && isDateSelected(day) ? styles.selected : ''}
                    ${day && isDateInRange(day) && !isDateSelected(day) ? styles.inRange : ''}
                    ${day && isToday(day) ? styles.today : ''}
                  `}
                  onClick={() => day && !isDateDisabled(day) && handleDayClick(day)}
                  disabled={!day || isDateDisabled(day)}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Selection hint */}
            <div className={styles.hint}>
              {selecting === 'start' ? 'Select start date' : 'Select end date'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
