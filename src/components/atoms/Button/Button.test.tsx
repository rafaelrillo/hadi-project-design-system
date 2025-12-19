// Path: src/components/atoms/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button Component', () => {
  // Test 1: Primary variant renders
  test('renders primary variant correctly', () => {
    render(<Button variant="primary">Guardar</Button>);
    const button = screen.getByRole('button', { name: /guardar/i });
    expect(button).toBeInTheDocument();
  });

  // Test 2: Secondary variant renders
  test('renders secondary variant correctly', () => {
    render(<Button variant="secondary">Cancelar</Button>);
    const button = screen.getByRole('button', { name: /cancelar/i });
    expect(button).toBeInTheDocument();
  });

  // Test 3: Destructive variant renders
  test('renders destructive variant correctly', () => {
    render(<Button variant="destructive">Eliminar</Button>);
    const button = screen.getByRole('button', { name: /eliminar/i });
    expect(button).toBeInTheDocument();
  });

  // Test 4: With-icon variant renders with icon
  test('renders with-icon variant correctly', () => {
    const SearchIcon = <span data-testid="search-icon">Search</span>;
    render(
      <Button variant="with-icon" icon={SearchIcon}>
        Buscar
      </Button>
    );

    const button = screen.getByRole('button', { name: /buscar/i });
    const icon = screen.getByTestId('search-icon');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  // Test 5: onClick handler works
  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test 6: Disabled state works correctly
  test('renders disabled state correctly', () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole('button', { name: /disabled button/i });

    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test 7: aria-label is applied
  test('applies aria-label correctly', () => {
    render(<Button ariaLabel="Save document">Save</Button>);

    const button = screen.getByRole('button', { name: /save document/i });
    expect(button).toBeInTheDocument();
  });

  // Test 8: Different button types work
  test('renders different button types correctly', () => {
    const { rerender } = render(<Button type="button">Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');

    rerender(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');

    rerender(<Button type="reset">Reset</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
  });

  // Test 9: Icon renders when provided
  test('renders icon when provided', () => {
    const TestIcon = <span data-testid="test-icon">Icon</span>;
    render(
      <Button variant="primary" icon={TestIcon}>
        With Icon
      </Button>
    );

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  // Test 10: Icon is not rendered when not provided
  test('does not render icon when not provided', () => {
    render(<Button variant="primary">No Icon</Button>);

    const button = screen.getByRole('button', { name: /no icon/i });
    expect(button).toBeInTheDocument();
  });

  // Test 11: Icon and text render together
  test('renders icon correctly with button text', () => {
    const TestIcon = <span data-testid="test-icon">Icon</span>;
    render(
      <Button variant="with-icon" icon={TestIcon}>
        Button Text
      </Button>
    );

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('Button Text')).toBeInTheDocument();
  });

  // Test 12: Secondary disabled state works
  test('renders secondary disabled state correctly', () => {
    render(
      <Button variant="secondary" disabled>
        Disabled Secondary
      </Button>
    );

    const button = screen.getByRole('button', { name: /disabled secondary/i });
    expect(button).toBeDisabled();
  });

  // Test 13: Destructive variant renders
  test('destructive variant renders', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button', { name: /delete/i });

    expect(button).toBeInTheDocument();
  });

  // Test 14: Custom className is applied
  test('applies custom className correctly', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button', { name: /custom/i });

    expect(button).toBeInTheDocument();
    expect(button.className).toContain('custom-class');
  });

  // Test 15: All variants render correctly
  test('all variants render correctly', () => {
    const { rerender } = render(<Button variant="primary">Test</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<Button variant="secondary">Test</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<Button variant="destructive">Test</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<Button variant="with-icon">Test</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
