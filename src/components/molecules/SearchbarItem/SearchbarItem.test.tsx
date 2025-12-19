// Path: src/components/molecules/SearchbarItem/SearchbarItem.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchbarItem } from './SearchbarItem';

describe('SearchbarItem Component', () => {
  describe('Rendering', () => {
    it('should render with default placeholder', () => {
      render(<SearchbarItem />);
      expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
    });

    it('should render with custom placeholder', () => {
      render(<SearchbarItem placeholder="Buscar productos..." />);
      expect(screen.getByPlaceholderText('Buscar productos...')).toBeInTheDocument();
    });

    it('should render search icon', () => {
      render(<SearchbarItem />);
      const searchButton = screen.getByLabelText('Buscar');
      expect(searchButton).toBeInTheDocument();
      expect(searchButton.querySelector('svg')).toBeInTheDocument();
    });

    it('should render input field', () => {
      render(<SearchbarItem />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should not render clear button when value is empty', () => {
      render(<SearchbarItem value="" />);
      expect(screen.queryByLabelText('Limpiar búsqueda')).not.toBeInTheDocument();
    });

    it('should render clear button when value is not empty', () => {
      render(<SearchbarItem value="test" />);
      expect(screen.getByLabelText('Limpiar búsqueda')).toBeInTheDocument();
    });

    it('should not render clear button when showClearButton is false', () => {
      render(<SearchbarItem value="test" showClearButton={false} />);
      expect(screen.queryByLabelText('Limpiar búsqueda')).not.toBeInTheDocument();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('should work as uncontrolled component', () => {
      render(<SearchbarItem />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'test' } });

      expect(input.value).toBe('test');
    });

    it('should work as controlled component', () => {
      const { rerender } = render(<SearchbarItem value="initial" />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      expect(input.value).toBe('initial');

      rerender(<SearchbarItem value="updated" />);
      expect(input.value).toBe('updated');
    });

    it('should call onChange when typing in uncontrolled mode', () => {
      const handleChange = jest.fn();
      render(<SearchbarItem onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: 'test' } });

      expect(handleChange).toHaveBeenCalledWith('test');
    });

    it('should call onChange when typing in controlled mode', () => {
      const handleChange = jest.fn();
      render(<SearchbarItem value="" onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: 'test' } });

      expect(handleChange).toHaveBeenCalledWith('test');
    });
  });

  describe('Search Functionality', () => {
    it('should call onSearch when Enter key is pressed', () => {
      const handleSearch = jest.fn();
      render(<SearchbarItem value="search term" onSearch={handleSearch} />);
      const input = screen.getByRole('textbox');

      fireEvent.keyDown(input, { key: 'Enter' });

      expect(handleSearch).toHaveBeenCalledWith('search term');
    });

    it('should call onSearch when search icon is clicked', () => {
      const handleSearch = jest.fn();
      render(<SearchbarItem value="search term" onSearch={handleSearch} />);
      const searchButton = screen.getByLabelText('Buscar');

      fireEvent.click(searchButton);

      expect(handleSearch).toHaveBeenCalledWith('search term');
    });

    it('should not call onSearch when other keys are pressed', () => {
      const handleSearch = jest.fn();
      render(<SearchbarItem value="test" onSearch={handleSearch} />);
      const input = screen.getByRole('textbox');

      fireEvent.keyDown(input, { key: 'a' });
      fireEvent.keyDown(input, { key: 'Tab' });
      fireEvent.keyDown(input, { key: 'Escape' });

      expect(handleSearch).not.toHaveBeenCalled();
    });

    it('should work without onSearch handler', () => {
      render(<SearchbarItem value="test" />);
      const input = screen.getByRole('textbox');

      expect(() => {
        fireEvent.keyDown(input, { key: 'Enter' });
      }).not.toThrow();
    });

    it('should not call onSearch when disabled', () => {
      const handleSearch = jest.fn();
      render(<SearchbarItem value="test" onSearch={handleSearch} disabled />);
      const searchButton = screen.getByLabelText('Buscar');

      fireEvent.click(searchButton);

      expect(handleSearch).not.toHaveBeenCalled();
    });
  });

  describe('Clear Functionality', () => {
    it('should call onClear when clear button is clicked', () => {
      const handleClear = jest.fn();
      render(<SearchbarItem value="test" onClear={handleClear} />);
      const clearButton = screen.getByLabelText('Limpiar búsqueda');

      fireEvent.click(clearButton);

      expect(handleClear).toHaveBeenCalled();
    });

    it('should call onChange with empty string when clear button is clicked', () => {
      const handleChange = jest.fn();
      render(<SearchbarItem value="test" onChange={handleChange} />);
      const clearButton = screen.getByLabelText('Limpiar búsqueda');

      fireEvent.click(clearButton);

      expect(handleChange).toHaveBeenCalledWith('');
    });

    it('should clear internal value in uncontrolled mode', () => {
      render(<SearchbarItem />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'test' } });
      expect(input.value).toBe('test');

      const clearButton = screen.getByLabelText('Limpiar búsqueda');
      fireEvent.click(clearButton);

      expect(input.value).toBe('');
    });

    it('should not clear when disabled', () => {
      const handleClear = jest.fn();
      render(<SearchbarItem value="test" onClear={handleClear} disabled />);
      const clearButton = screen.getByLabelText('Limpiar búsqueda');

      fireEvent.click(clearButton);

      expect(handleClear).not.toHaveBeenCalled();
    });
  });

  describe('Disabled State', () => {
    it('should disable input when disabled', () => {
      render(<SearchbarItem disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('should disable search button when disabled', () => {
      render(<SearchbarItem disabled />);
      expect(screen.getByLabelText('Buscar')).toBeDisabled();
    });

    it('should disable clear button when disabled', () => {
      render(<SearchbarItem value="test" disabled />);
      expect(screen.getByLabelText('Limpiar búsqueda')).toBeDisabled();
    });

    it('should have className when disabled', () => {
      const { container } = render(<SearchbarItem disabled />);
      const searchContainer = container.firstChild as HTMLElement;
      expect(searchContainer).toHaveAttribute('class');
    });
  });

  describe('Styling', () => {
    it('should have className on container', () => {
      const { container } = render(<SearchbarItem />);
      const searchContainer = container.firstChild as HTMLElement;
      expect(searchContainer).toHaveAttribute('class');
    });

    it('should render input element', () => {
      render(<SearchbarItem />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('should have search icon with correct size', () => {
      render(<SearchbarItem />);
      const searchButton = screen.getByLabelText('Buscar');
      const svg = searchButton.querySelector('svg');

      expect(svg).toHaveAttribute('width', '18');
      expect(svg).toHaveAttribute('height', '18');
    });

    it('should have clear icon with correct size', () => {
      render(<SearchbarItem value="test" />);
      const clearButton = screen.getByLabelText('Limpiar búsqueda');
      const svg = clearButton.querySelector('svg');

      expect(svg).toHaveAttribute('width', '16');
      expect(svg).toHaveAttribute('height', '16');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible label for input', () => {
      render(<SearchbarItem placeholder="Buscar productos" />);
      expect(screen.getByLabelText('Buscar productos')).toBeInTheDocument();
    });

    it('should have accessible label for search button', () => {
      render(<SearchbarItem />);
      expect(screen.getByLabelText('Buscar')).toBeInTheDocument();
    });

    it('should have accessible label for clear button', () => {
      render(<SearchbarItem value="test" />);
      expect(screen.getByLabelText('Limpiar búsqueda')).toBeInTheDocument();
    });

    it('should have button type for search button', () => {
      render(<SearchbarItem />);
      const searchButton = screen.getByLabelText('Buscar');
      expect(searchButton).toHaveAttribute('type', 'button');
    });

    it('should have button type for clear button', () => {
      render(<SearchbarItem value="test" />);
      const clearButton = screen.getByLabelText('Limpiar búsqueda');
      expect(clearButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Use Cases', () => {
    it('should work for simple search', () => {
      const handleSearch = jest.fn();
      render(<SearchbarItem onSearch={handleSearch} />);
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: 'laptop' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(handleSearch).toHaveBeenCalledWith('laptop');
    });

    it('should work for product search', () => {
      const handleSearch = jest.fn();
      render(<SearchbarItem placeholder="Buscar productos..." onSearch={handleSearch} />);
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: 'iPhone' } });
      const searchButton = screen.getByLabelText('Buscar');
      fireEvent.click(searchButton);

      expect(handleSearch).toHaveBeenCalledWith('iPhone');
    });

    it('should work for user search', () => {
      const handleChange = jest.fn();
      render(<SearchbarItem placeholder="Buscar usuarios..." onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: 'john' } });

      expect(handleChange).toHaveBeenCalledWith('john');
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle typing, searching, and clearing', () => {
      const handleSearch = jest.fn();
      const handleClear = jest.fn();
      render(<SearchbarItem onSearch={handleSearch} onClear={handleClear} />);
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: 'test' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(handleSearch).toHaveBeenCalledWith('test');

      const clearButton = screen.getByLabelText('Limpiar búsqueda');
      fireEvent.click(clearButton);
      expect(handleClear).toHaveBeenCalled();
    });

    it('should handle controlled state changes', () => {
      const { rerender } = render(<SearchbarItem value="" />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      expect(input.value).toBe('');
      expect(screen.queryByLabelText('Limpiar búsqueda')).not.toBeInTheDocument();

      rerender(<SearchbarItem value="test" />);
      expect(input.value).toBe('test');
      expect(screen.getByLabelText('Limpiar búsqueda')).toBeInTheDocument();

      rerender(<SearchbarItem value="" />);
      expect(input.value).toBe('');
      expect(screen.queryByLabelText('Limpiar búsqueda')).not.toBeInTheDocument();
    });

    it('should handle focus, type, and search sequence', () => {
      const handleSearch = jest.fn();
      render(<SearchbarItem onSearch={handleSearch} />);
      const input = screen.getByRole('textbox');

      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'query' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      fireEvent.blur(input);

      expect(handleSearch).toHaveBeenCalledWith('query');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty search', () => {
      const handleSearch = jest.fn();
      render(<SearchbarItem value="" onSearch={handleSearch} />);
      const input = screen.getByRole('textbox');

      fireEvent.keyDown(input, { key: 'Enter' });

      expect(handleSearch).toHaveBeenCalledWith('');
    });

    it('should handle very long search terms', () => {
      const longText = 'a'.repeat(500);
      render(<SearchbarItem value={longText} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      expect(input.value).toBe(longText);
    });

    it('should handle special characters', () => {
      const specialText = 'test@#$%^&*()';
      render(<SearchbarItem value={specialText} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      expect(input.value).toBe(specialText);
    });

    it('should handle rapid typing', () => {
      const handleChange = jest.fn();
      render(<SearchbarItem onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: 'a' } });
      fireEvent.change(input, { target: { value: 'ab' } });
      fireEvent.change(input, { target: { value: 'abc' } });

      expect(handleChange).toHaveBeenCalledTimes(3);
      expect(handleChange).toHaveBeenLastCalledWith('abc');
    });

    it('should handle multiple clear operations', () => {
      render(<SearchbarItem />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'test1' } });
      let clearButton = screen.getByLabelText('Limpiar búsqueda');
      fireEvent.click(clearButton);
      expect(input.value).toBe('');

      fireEvent.change(input, { target: { value: 'test2' } });
      clearButton = screen.getByLabelText('Limpiar búsqueda');
      fireEvent.click(clearButton);
      expect(input.value).toBe('');
    });
  });
});
