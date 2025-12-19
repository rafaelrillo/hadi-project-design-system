// Path: src/components/molecules/SearchBar/SearchBar.test.tsx
import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

// Controlled component wrapper for testing
function ControlledSearchBar(props: { onSearch?: (value: string) => void }) {
  const [value, setValue] = useState('');
  return (
    <SearchBar
      value={value}
      onChange={setValue}
      onSearch={props.onSearch}
    />
  );
}

describe('SearchBar Component', () => {
  describe('Rendering', () => {
    it('should render search input', () => {
      render(<SearchBar />);
      const input = screen.getByLabelText('Buscar');
      expect(input).toBeInTheDocument();
    });

    it('should render with default placeholder', () => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText('Buscar...');
      expect(input).toBeInTheDocument();
    });

    it('should render with custom placeholder', () => {
      render(<SearchBar placeholder="Buscar productos..." />);
      const input = screen.getByPlaceholderText('Buscar productos...');
      expect(input).toBeInTheDocument();
    });

    it('should render search icon', () => {
      const { container } = render(<SearchBar />);
      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('should render with custom aria-label', () => {
      render(<SearchBar ariaLabel="Buscar usuario" />);
      const input = screen.getByLabelText('Buscar usuario');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Uncontrolled Mode', () => {
    it('should update value when typing in uncontrolled mode', () => {
      render(<SearchBar />);
      const input = screen.getByLabelText('Buscar') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'test query' } });
      expect(input.value).toBe('test query');
    });

    it('should start with empty value in uncontrolled mode', () => {
      render(<SearchBar />);
      const input = screen.getByLabelText('Buscar') as HTMLInputElement;
      expect(input.value).toBe('');
    });
  });

  describe('Controlled Mode', () => {
    it('should use controlled value when provided', () => {
      const { rerender } = render(<SearchBar value="controlled" onChange={() => {}} />);
      const input = screen.getByLabelText('Buscar') as HTMLInputElement;
      expect(input.value).toBe('controlled');

      rerender(<SearchBar value="updated" onChange={() => {}} />);
      expect(input.value).toBe('updated');
    });

    it('should call onChange when typing in controlled mode', () => {
      const handleChange = jest.fn();
      render(<SearchBar value="" onChange={handleChange} />);
      const input = screen.getByLabelText('Buscar');

      fireEvent.change(input, { target: { value: 'new value' } });
      expect(handleChange).toHaveBeenCalledWith('new value');
    });

    it('should work with controlled component wrapper', () => {
      render(<ControlledSearchBar />);
      const input = screen.getByLabelText('Buscar') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'test' } });
      expect(input.value).toBe('test');
    });
  });

  describe('Search Functionality', () => {
    it('should call onSearch when Enter key is pressed', () => {
      const handleSearch = jest.fn();
      render(<SearchBar onSearch={handleSearch} />);
      const input = screen.getByLabelText('Buscar');

      fireEvent.change(input, { target: { value: 'search term' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(handleSearch).toHaveBeenCalledWith('search term');
    });

    it('should not call onSearch for other keys', () => {
      const handleSearch = jest.fn();
      render(<SearchBar onSearch={handleSearch} />);
      const input = screen.getByLabelText('Buscar');

      fireEvent.change(input, { target: { value: 'search term' } });
      fireEvent.keyDown(input, { key: 'a' });
      fireEvent.keyDown(input, { key: 'Escape' });

      expect(handleSearch).not.toHaveBeenCalled();
    });

    it('should call onSearch with controlled value on Enter', () => {
      const handleSearch = jest.fn();
      render(<ControlledSearchBar onSearch={handleSearch} />);
      const input = screen.getByLabelText('Buscar');

      fireEvent.change(input, { target: { value: 'controlled search' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(handleSearch).toHaveBeenCalledWith('controlled search');
    });
  });

  describe('Clear Button', () => {
    it('should show clear button when there is text', () => {
      render(<SearchBar value="text" onChange={() => {}} />);
      const clearButton = screen.getByLabelText('Limpiar búsqueda');
      expect(clearButton).toBeInTheDocument();
    });

    it('should not show clear button when input is empty', () => {
      render(<SearchBar value="" onChange={() => {}} />);
      const clearButton = screen.queryByLabelText('Limpiar búsqueda');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('should hide clear button when showClearButton is false', () => {
      render(<SearchBar value="text" onChange={() => {}} showClearButton={false} />);
      const clearButton = screen.queryByLabelText('Limpiar búsqueda');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('should clear input when clear button is clicked', () => {
      const handleChange = jest.fn();
      render(<SearchBar value="text" onChange={handleChange} />);
      const clearButton = screen.getByLabelText('Limpiar búsqueda');

      fireEvent.click(clearButton);
      expect(handleChange).toHaveBeenCalledWith('');
    });

    it('should call onSearch with empty string when cleared', () => {
      const handleSearch = jest.fn();
      render(<SearchBar value="text" onChange={() => {}} onSearch={handleSearch} />);
      const clearButton = screen.getByLabelText('Limpiar búsqueda');

      fireEvent.click(clearButton);
      expect(handleSearch).toHaveBeenCalledWith('');
    });

    it('should clear uncontrolled input when clear button is clicked', () => {
      render(<SearchBar />);
      const input = screen.getByLabelText('Buscar') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'test' } });
      expect(input.value).toBe('test');

      const clearButton = screen.getByLabelText('Limpiar búsqueda');
      fireEvent.click(clearButton);
      expect(input.value).toBe('');
    });

    it('should not show clear button when disabled', () => {
      render(<SearchBar value="text" onChange={() => {}} disabled />);
      const clearButton = screen.queryByLabelText('Limpiar búsqueda');
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should render as disabled when disabled prop is true', () => {
      render(<SearchBar disabled />);
      const input = screen.getByLabelText('Buscar') as HTMLInputElement;
      expect(input).toBeDisabled();
    });

    it('should have className when disabled', () => {
      render(<SearchBar disabled />);
      const input = screen.getByLabelText('Buscar');
      expect(input).toHaveAttribute('class');
    });

    it('should not call onChange when disabled', () => {
      const handleChange = jest.fn();
      render(<SearchBar disabled onChange={handleChange} />);
      const input = screen.getByLabelText('Buscar');

      fireEvent.change(input, { target: { value: 'test' } });
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Styling', () => {
    it('should have className attribute on input', () => {
      render(<SearchBar />);
      const input = screen.getByLabelText('Buscar');
      expect(input).toHaveAttribute('class');
    });
  });

  describe('Use Cases', () => {
    it('should work as product search', () => {
      const handleSearch = jest.fn();
      render(<SearchBar placeholder="Buscar productos..." onSearch={handleSearch} />);
      const input = screen.getByPlaceholderText('Buscar productos...');

      fireEvent.change(input, { target: { value: 'iPhone 15' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(handleSearch).toHaveBeenCalledWith('iPhone 15');
    });

    it('should work as user search', () => {
      const handleSearch = jest.fn();
      render(<SearchBar placeholder="Buscar usuarios..." onSearch={handleSearch} />);
      const input = screen.getByPlaceholderText('Buscar usuarios...');

      fireEvent.change(input, { target: { value: 'Juan Pérez' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(handleSearch).toHaveBeenCalledWith('Juan Pérez');
    });

    it('should work as document search', () => {
      const handleSearch = jest.fn();
      render(<SearchBar placeholder="Buscar documentos..." onSearch={handleSearch} />);
      const input = screen.getByPlaceholderText('Buscar documentos...');

      fireEvent.change(input, { target: { value: 'contrato.pdf' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(handleSearch).toHaveBeenCalledWith('contrato.pdf');
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle rapid typing and clearing', () => {
      render(<SearchBar />);
      const input = screen.getByLabelText('Buscar') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'first' } });
      expect(input.value).toBe('first');

      fireEvent.change(input, { target: { value: 'second' } });
      expect(input.value).toBe('second');

      const clearButton = screen.getByLabelText('Limpiar búsqueda');
      fireEvent.click(clearButton);
      expect(input.value).toBe('');
    });

    it('should handle all callbacks together', () => {
      const handleChange = jest.fn();
      const handleSearch = jest.fn();
      render(<SearchBar onChange={handleChange} onSearch={handleSearch} />);
      const input = screen.getByLabelText('Buscar');

      fireEvent.change(input, { target: { value: 'test' } });
      expect(handleChange).toHaveBeenCalledWith('test');

      fireEvent.keyDown(input, { key: 'Enter' });
      expect(handleSearch).toHaveBeenCalledWith('test');

      const clearButton = screen.getByLabelText('Limpiar búsqueda');
      fireEvent.click(clearButton);
      expect(handleChange).toHaveBeenCalledWith('');
      expect(handleSearch).toHaveBeenCalledWith('');
    });

    it('should maintain controlled value through interactions', () => {
      const { rerender } = render(<SearchBar value="initial" onChange={() => {}} />);
      const input = screen.getByLabelText('Buscar') as HTMLInputElement;
      expect(input.value).toBe('initial');

      rerender(<SearchBar value="updated" onChange={() => {}} />);
      expect(input.value).toBe('updated');

      rerender(<SearchBar value="" onChange={() => {}} />);
      expect(input.value).toBe('');
    });
  });

  describe('Accessibility', () => {
    it('should have proper input type', () => {
      render(<SearchBar />);
      const input = screen.getByLabelText('Buscar');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should have aria-label', () => {
      render(<SearchBar />);
      const input = screen.getByLabelText('Buscar');
      expect(input).toHaveAttribute('aria-label', 'Buscar');
    });

    it('should have accessible clear button', () => {
      render(<SearchBar value="text" onChange={() => {}} />);
      const clearButton = screen.getByLabelText('Limpiar búsqueda');
      expect(clearButton).toHaveAttribute('aria-label', 'Limpiar búsqueda');
      expect(clearButton).toHaveAttribute('type', 'button');
    });

    it('should be keyboard accessible', () => {
      const handleSearch = jest.fn();
      render(<SearchBar onSearch={handleSearch} />);
      const input = screen.getByLabelText('Buscar');

      fireEvent.change(input, { target: { value: 'keyboard test' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(handleSearch).toHaveBeenCalledWith('keyboard test');
    });
  });
});
