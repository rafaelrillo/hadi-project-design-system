// Path: src/components/organisms/Searchbar/Searchbar.tsx
import { type FormEvent, type CSSProperties } from 'react';
import { Search } from 'lucide-react';
import { InputDropdown, DropdownOption } from '../../atoms/Input/InputDropdown';
import { InputText } from '../../atoms/Input/InputText';
import { Button } from '../../atoms/Button';
import { useLightEngineOptional } from '@contexts/LightEngineContext';
import styles from './Searchbar.module.css';

export type SearchbarStyle = 'default' | 'neuInset';

export interface SearchbarFilter {
  type: 'dropdown' | 'text';
  placeholder: string;
  options?: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  width?: string;
}

export interface SearchbarProps {
  productName: string;
  version: string;
  filters?: SearchbarFilter[];
  onSearch: () => void;
  searchButtonText?: string;
  disabled?: boolean;
  /** Visual style variant */
  searchbarStyle?: SearchbarStyle;
  /** Enable dynamic shadows from Light Engine */
  dynamicShadows?: boolean;
}

export function Searchbar({
  productName,
  version,
  filters = [],
  onSearch,
  searchButtonText = 'Buscar',
  disabled = false,
  searchbarStyle = 'default',
  dynamicShadows = true,
}: SearchbarProps) {
  // Get light engine context (optional)
  const lightEngine = useLightEngineOptional();

  // Get container className
  const getContainerClassName = (): string => {
    const classes = [styles.container];
    if (searchbarStyle === 'neuInset') {
      classes.push(styles.neuInset);
      if (dynamicShadows && lightEngine) classes.push(styles.dynamicShadows);
    }
    return classes.join(' ');
  };

  // Get container dynamic styles
  const getContainerDynamicStyles = (): CSSProperties | undefined => {
    if (searchbarStyle !== 'neuInset' || !dynamicShadows || !lightEngine) return undefined;

    const { shadows } = lightEngine;
    return {
      boxShadow: shadows.getNeuInsetShadow(4, 10),
    };
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!disabled) {
      onSearch();
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={getContainerClassName()}
      style={getContainerDynamicStyles()}
    >
      {/* Product Key */}
      <div className={styles.productKeyContainer}>
        <div className={styles.productName}>{productName}</div>
        <div className={styles.version}>{version}</div>
      </div>

      {/* Filters */}
      {filters.length > 0 && (
        <div className={styles.filtersContainer}>
          {filters.map((filter, index) => {
            if (filter.type === 'dropdown' && filter.options) {
              return (
                <div
                  key={index}
                  className={styles.dropdownContainer}
                  style={filter.width ? { width: filter.width } : undefined}
                >
                  <InputDropdown
                    options={filter.options}
                    value={filter.value}
                    onChange={filter.onChange}
                    placeholder={filter.placeholder}
                    disabled={disabled}
                    ariaLabel={filter.placeholder}
                  />
                </div>
              );
            }

            if (filter.type === 'text') {
              return (
                <div
                  key={index}
                  className={styles.textInputContainer}
                  style={filter.width ? { width: filter.width } : undefined}
                >
                  <InputText
                    placeholder={filter.placeholder}
                    value={filter.value || ''}
                    onChange={(e) => filter.onChange?.(e.target.value)}
                    disabled={disabled}
                    ariaLabel={filter.placeholder}
                  />
                </div>
              );
            }

            return null;
          })}
        </div>
      )}

      {/* Search Button */}
      <Button
        type="submit"
        variant="primary"
        disabled={disabled}
        icon={<Search size={24} />}
        ariaLabel="Buscar"
        className={styles.searchButton}
      >
        {searchButtonText}
      </Button>
    </form>
  );
}
