// Path: src/components/organisms/Searchbar/Searchbar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Searchbar, SearchbarFilter } from './Searchbar';

describe('Searchbar Organism', () => {
  describe('Rendering', () => {
    it('should render product name and version', () => {
      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={() => {}}
        />
      );
      expect(screen.getByText('CV')).toBeInTheDocument();
      expect(screen.getByText('v1.0.0')).toBeInTheDocument();
    });

    it('should render search button', () => {
      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={() => {}}
        />
      );
      expect(screen.getByLabelText('Buscar')).toBeInTheDocument();
      expect(screen.getByText('Buscar')).toBeInTheDocument();
    });

    it('should render custom search button text', () => {
      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={() => {}}
          searchButtonText="Filtrar"
        />
      );
      expect(screen.getByText('Filtrar')).toBeInTheDocument();
    });

    it('should render without filters', () => {
      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={() => {}}
        />
      );
      expect(screen.getByText('CV')).toBeInTheDocument();
      expect(screen.getByLabelText('Buscar')).toBeInTheDocument();
    });

    it('should render with dropdown filter', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'dropdown',
          placeholder: 'Seleccionar país',
          options: [
            { value: 'pe', label: 'Perú' },
            { value: 'cl', label: 'Chile' }
          ]
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
        />
      );

      expect(screen.getByLabelText('Seleccionar país')).toBeInTheDocument();
    });

    it('should render with text filter', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'text',
          placeholder: 'Buscar por nombre...'
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
        />
      );

      expect(screen.getByPlaceholderText('Buscar por nombre...')).toBeInTheDocument();
    });

    it('should render with multiple filters', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'dropdown',
          placeholder: 'País',
          options: [{ value: 'pe', label: 'Perú' }]
        },
        {
          type: 'text',
          placeholder: 'Buscar...'
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
        />
      );

      expect(screen.getByLabelText('País')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('should call onSearch when search button is clicked', () => {
      const handleSearch = jest.fn();
      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={handleSearch}
        />
      );

      fireEvent.click(screen.getByLabelText('Buscar'));

      expect(handleSearch).toHaveBeenCalledTimes(1);
    });

    it('should call onSearch when form is submitted', () => {
      const handleSearch = jest.fn();
      const { container } = render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={handleSearch}
        />
      );

      const form = container.querySelector('form');
      fireEvent.submit(form!);

      expect(handleSearch).toHaveBeenCalledTimes(1);
    });

    it('should not call onSearch when disabled', () => {
      const handleSearch = jest.fn();
      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={handleSearch}
          disabled
        />
      );

      fireEvent.click(screen.getByLabelText('Buscar'));

      expect(handleSearch).not.toHaveBeenCalled();
    });

    it('should prevent default form submission', () => {
      const handleSearch = jest.fn();
      const { container } = render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={handleSearch}
        />
      );

      const form = container.querySelector('form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');

      form!.dispatchEvent(submitEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Filter Functionality', () => {
    it('should call onChange when dropdown value changes', () => {
      const handleChange = jest.fn();
      const filters: SearchbarFilter[] = [
        {
          type: 'dropdown',
          placeholder: 'País',
          options: [
            { value: 'pe', label: 'Perú' },
            { value: 'cl', label: 'Chile' }
          ],
          onChange: handleChange
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
        />
      );

      const dropdownButton = screen.getByLabelText('País');
      fireEvent.click(dropdownButton); // Open dropdown

      const option = screen.getByText('Perú');
      fireEvent.click(option); // Select option

      expect(handleChange).toHaveBeenCalledWith('pe');
    });

    it('should call onChange when text input changes', () => {
      const handleChange = jest.fn();
      const filters: SearchbarFilter[] = [
        {
          type: 'text',
          placeholder: 'Buscar...',
          onChange: handleChange
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
        />
      );

      const input = screen.getByPlaceholderText('Buscar...');
      fireEvent.change(input, { target: { value: 'test' } });

      expect(handleChange).toHaveBeenCalledWith('test');
    });

    it('should display dropdown options', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'dropdown',
          placeholder: 'País',
          options: [
            { value: 'pe', label: 'Perú' },
            { value: 'cl', label: 'Chile' },
            { value: 'co', label: 'Colombia' }
          ]
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
        />
      );

      const dropdownButton = screen.getByLabelText('País');
      fireEvent.click(dropdownButton); // Open dropdown

      expect(screen.getByText('Perú')).toBeInTheDocument();
      expect(screen.getByText('Chile')).toBeInTheDocument();
      expect(screen.getByText('Colombia')).toBeInTheDocument();
    });

    it('should work without onChange handler', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'text',
          placeholder: 'Buscar...'
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
        />
      );

      const input = screen.getByPlaceholderText('Buscar...');

      expect(() => {
        fireEvent.change(input, { target: { value: 'test' } });
      }).not.toThrow();
    });
  });

  describe('Disabled State', () => {
    it('should disable search button when disabled', () => {
      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={() => {}}
          disabled
        />
      );

      expect(screen.getByLabelText('Buscar')).toBeDisabled();
    });

    it('should disable dropdown filters when disabled', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'dropdown',
          placeholder: 'País',
          options: [{ value: 'pe', label: 'Perú' }]
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
          disabled
        />
      );

      expect(screen.getByLabelText('País')).toBeDisabled();
    });

    it('should disable text filters when disabled', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'text',
          placeholder: 'Buscar...'
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
          disabled
        />
      );

      expect(screen.getByPlaceholderText('Buscar...')).toBeDisabled();
    });

    it('should have disabled styles on search button', () => {
      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={() => {}}
          disabled
        />
      );

      const button = screen.getByLabelText('Buscar');
      expect(button).toBeDisabled();
    });
  });

  describe('Styling', () => {
    it('should render container', () => {
      const { container } = render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={() => {}}
        />
      );

      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('should render product name', () => {
      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={() => {}}
        />
      );

      const productName = screen.getByText('CV');
      expect(productName).toBeInTheDocument();
    });

    it('should render version', () => {
      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={() => {}}
        />
      );

      const version = screen.getByText('v1.0.0');
      expect(version).toBeInTheDocument();
    });

    it('should render search button', () => {
      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={() => {}}
        />
      );

      const button = screen.getByLabelText('Buscar');
      expect(button).toBeInTheDocument();
    });

    it('should render search icon with correct size', () => {
      const { container } = render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={() => {}}
        />
      );

      const icon = container.querySelector('svg');
      expect(icon).toHaveAttribute('width', '24');
      expect(icon).toHaveAttribute('height', '24');
    });
  });

  describe('Hover States', () => {
    it('should render button that can be hovered', () => {
      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={() => {}}
        />
      );

      const button = screen.getByLabelText('Buscar');
      expect(button).toBeInTheDocument();
    });

    it('should render disabled button', () => {
      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={() => {}}
          disabled
        />
      );

      const button = screen.getByLabelText('Buscar');
      expect(button).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible label for search button', () => {
      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={() => {}}
        />
      );

      expect(screen.getByLabelText('Buscar')).toBeInTheDocument();
    });

    it('should have accessible labels for filters', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'dropdown',
          placeholder: 'Seleccionar país',
          options: [{ value: 'pe', label: 'Perú' }]
        },
        {
          type: 'text',
          placeholder: 'Buscar productos'
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
        />
      );

      expect(screen.getByLabelText('Seleccionar país')).toBeInTheDocument();
      expect(screen.getByLabelText('Buscar productos')).toBeInTheDocument();
    });

    it('should have button type submit', () => {
      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={() => {}}
        />
      );

      expect(screen.getByLabelText('Buscar')).toHaveAttribute('type', 'submit');
    });
  });

  describe('Custom Widths', () => {
    it('should apply custom width to dropdown filter', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'dropdown',
          placeholder: 'País',
          options: [{ value: 'pe', label: 'Perú' }],
          width: '250px'
        }
      ];

      const { container } = render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
        />
      );

      const dropdownContainer = container.querySelector('div[style*="width: 250px"]');
      expect(dropdownContainer).toBeInTheDocument();
    });

    it('should apply custom width to text filter', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'text',
          placeholder: 'Buscar...',
          width: '400px'
        }
      ];

      const { container } = render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
        />
      );

      const inputWrapper = container.querySelector('div[style*="width: 400px"]');
      expect(inputWrapper).toBeInTheDocument();
    });
  });

  describe('Use Cases', () => {
    it('should work as simple search bar', () => {
      const handleSearch = jest.fn();
      render(
        <Searchbar
          productName="MF"
          version="v2.0.0"
          onSearch={handleSearch}
        />
      );

      fireEvent.click(screen.getByLabelText('Buscar'));
      expect(handleSearch).toHaveBeenCalled();
    });

    it('should work with filters and search', () => {
      const handleSearch = jest.fn();
      const handleCountryChange = jest.fn();
      const filters: SearchbarFilter[] = [
        {
          type: 'dropdown',
          placeholder: 'País',
          options: [{ value: 'pe', label: 'Perú' }],
          onChange: handleCountryChange
        },
        {
          type: 'text',
          placeholder: 'Buscar...'
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={handleSearch}
        />
      );

      const dropdownButton = screen.getByLabelText('País');
      fireEvent.click(dropdownButton); // Open dropdown

      const option = screen.getByText('Perú');
      fireEvent.click(option); // Select option

      fireEvent.click(screen.getByLabelText('Buscar'));

      expect(handleCountryChange).toHaveBeenCalledWith('pe');
      expect(handleSearch).toHaveBeenCalled();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should allow focusing on text filter input', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'text',
          placeholder: 'Buscar...'
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
        />
      );

      const input = screen.getByPlaceholderText('Buscar...');
      input.focus();
      expect(document.activeElement).toBe(input);
    });

    it('should disable text filter when searchbar is disabled', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'text',
          placeholder: 'Buscar...'
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
          disabled
        />
      );

      const input = screen.getByPlaceholderText('Buscar...');
      expect(input).toBeDisabled();
    });

    it('should have focusable search button', () => {
      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          onSearch={() => {}}
        />
      );

      const button = screen.getByLabelText('Buscar');
      button.focus();
      expect(document.activeElement).toBe(button);
    });

    it('should have focusable text input', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'text',
          placeholder: 'Buscar...'
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
        />
      );

      const input = screen.getByPlaceholderText('Buscar...');
      input.focus();
      expect(document.activeElement).toBe(input);
    });

    it('should have focusable dropdown button', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'dropdown',
          placeholder: 'País',
          options: [{ value: 'pe', label: 'Perú' }]
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
        />
      );

      const dropdown = screen.getByLabelText('País');
      dropdown.focus();
      expect(document.activeElement).toBe(dropdown);
    });

    it('should not focus disabled elements', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'text',
          placeholder: 'Buscar...'
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
          disabled
        />
      );

      const input = screen.getByPlaceholderText('Buscar...');
      const button = screen.getByLabelText('Buscar');

      expect(input).toBeDisabled();
      expect(button).toBeDisabled();
    });
  });

  describe('Filter Value Persistence', () => {
    it('should display controlled text filter value', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'text',
          placeholder: 'Buscar...',
          value: 'valor inicial'
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
        />
      );

      const input = screen.getByPlaceholderText('Buscar...') as HTMLInputElement;
      expect(input.value).toBe('valor inicial');
    });

    it('should display controlled dropdown value', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'dropdown',
          placeholder: 'País',
          options: [
            { value: 'pe', label: 'Perú' },
            { value: 'cl', label: 'Chile' }
          ],
          value: 'pe'
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
        />
      );

      expect(screen.getByText('Perú')).toBeInTheDocument();
    });

    it('should update text filter value on rerender', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'text',
          placeholder: 'Buscar...',
          value: 'valor inicial'
        }
      ];

      const { rerender } = render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
        />
      );

      const updatedFilters: SearchbarFilter[] = [
        {
          type: 'text',
          placeholder: 'Buscar...',
          value: 'valor actualizado'
        }
      ];

      rerender(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={updatedFilters}
          onSearch={() => {}}
        />
      );

      const input = screen.getByPlaceholderText('Buscar...') as HTMLInputElement;
      expect(input.value).toBe('valor actualizado');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty filters array', () => {
      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={[]}
          onSearch={() => {}}
        />
      );

      expect(screen.getByText('CV')).toBeInTheDocument();
      expect(screen.getByLabelText('Buscar')).toBeInTheDocument();
    });

    it('should handle filter without options (dropdown)', () => {
      const filters: SearchbarFilter[] = [
        {
          type: 'dropdown',
          placeholder: 'Sin opciones',
          options: []
        }
      ];

      render(
        <Searchbar
          productName="CV"
          version="v1.0.0"
          filters={filters}
          onSearch={() => {}}
        />
      );

      expect(screen.getByLabelText('Sin opciones')).toBeInTheDocument();
    });

    it('should handle very long product name', () => {
      render(
        <Searchbar
          productName="VERYLONGPRODUCTNAME"
          version="v1.0.0"
          onSearch={() => {}}
        />
      );

      expect(screen.getByText('VERYLONGPRODUCTNAME')).toBeInTheDocument();
    });
  });
});
