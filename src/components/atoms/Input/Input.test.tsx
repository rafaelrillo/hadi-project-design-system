// Path: src/components/atoms/Input/Input.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InputText } from './InputText';
import { InputDropdown } from './InputDropdown';
import { Textarea } from './Textarea';

// ==================== InputText Tests ====================
describe('InputText Component', () => {
  // Test 1: Renders correctly with CSS class
  test('renders with className attribute', () => {
    render(<InputText placeholder="Enter text" ariaLabel="text input" />);
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('class');
  });

  // Test 2: Displays placeholder correctly
  test('displays placeholder text', () => {
    render(<InputText placeholder="Enter your name" ariaLabel="name input" />);
    const input = screen.getByPlaceholderText('Enter your name');

    expect(input).toBeInTheDocument();
  });

  // Test 3: Handles value changes
  test('handles value changes', () => {
    const handleChange = jest.fn();
    render(<InputText value="" onChange={handleChange} ariaLabel="text input" />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  // Test 4: Error state adds error CSS class
  test('shows error state with aria-invalid', () => {
    render(<InputText error ariaLabel="error input" />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('class');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  // Test 5: Disabled state works correctly
  test('renders disabled state correctly', () => {
    render(<InputText disabled ariaLabel="disabled input" />);
    const input = screen.getByRole('textbox');

    expect(input).toBeDisabled();
  });

  // Test 6: Different input types work
  test('renders different input types correctly', () => {
    const { rerender } = render(<InputText type="email" ariaLabel="email input" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<InputText type="password" ariaLabel="password input" />);
    expect(screen.getByLabelText('password input')).toHaveAttribute('type', 'password');

    rerender(<InputText type="tel" ariaLabel="tel input" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');
  });

  // Test 7: aria-describedby works
  test('applies aria-describedby correctly', () => {
    render(<InputText ariaLabel="described input" ariaDescribedBy="helper-text" />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('aria-describedby', 'helper-text');
  });

  // Test 8: Container wraps input
  test('has wrapper container', () => {
    render(<InputText ariaLabel="container input" />);
    const input = screen.getByRole('textbox');
    const container = input.parentElement;

    expect(container).toBeInTheDocument();
  });
});

// ==================== InputDropdown Tests ====================
describe('InputDropdown Component', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  // Test 1: Renders correctly with CSS class
  test('renders with className attribute', () => {
    render(<InputDropdown options={mockOptions} ariaLabel="dropdown" />);
    const button = screen.getByRole('button', { name: 'dropdown' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('class');
  });

  // Test 2: Displays placeholder correctly
  test('displays placeholder text', () => {
    render(
      <InputDropdown
        options={mockOptions}
        placeholder="Select an option"
        ariaLabel="dropdown with placeholder"
      />
    );
    const placeholder = screen.getByText('Select an option');

    expect(placeholder).toBeInTheDocument();
  });

  // Test 3: Renders all options when opened
  test('renders all options', () => {
    render(<InputDropdown options={mockOptions} ariaLabel="dropdown with options" />);
    const button = screen.getByRole('button', { name: 'dropdown with options' });

    // Click to open dropdown
    fireEvent.click(button);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  // Test 4: Handles value changes
  test('handles value changes', () => {
    const handleChange = jest.fn();
    render(
      <InputDropdown
        options={mockOptions}
        value=""
        onChange={handleChange}
        ariaLabel="dropdown with change"
      />
    );
    const button = screen.getByRole('button', { name: 'dropdown with change' });

    // Click to open dropdown
    fireEvent.click(button);

    // Click on an option
    const option2 = screen.getByText('Option 2');
    fireEvent.click(option2);

    expect(handleChange).toHaveBeenCalledWith('option2');
  });

  // Test 5: Disabled state works correctly
  test('renders disabled state correctly', () => {
    render(<InputDropdown options={mockOptions} disabled ariaLabel="disabled dropdown" />);
    const button = screen.getByRole('button', { name: 'disabled dropdown' });

    expect(button).toBeDisabled();
  });

  // Test 6: Open state with aria-expanded
  test('updates aria-expanded when opened', () => {
    render(<InputDropdown options={mockOptions} ariaLabel="open dropdown" />);
    const button = screen.getByRole('button', { name: 'open dropdown' });

    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  // Test 7: ChevronDown icon is present
  test('renders ChevronDown icon', () => {
    render(<InputDropdown options={mockOptions} ariaLabel="icon dropdown" />);
    const svg = document.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  // Test 8: Shows placeholder text when no value selected
  test('shows placeholder text when no value selected', () => {
    const { rerender } = render(
      <InputDropdown options={mockOptions} placeholder="Select..." ariaLabel="placeholder dropdown" />
    );
    let button = screen.getByRole('button', { name: 'placeholder dropdown' });

    expect(button).toHaveTextContent('Select...');

    rerender(
      <InputDropdown options={mockOptions} value="option1" ariaLabel="placeholder dropdown" />
    );
    button = screen.getByRole('button', { name: 'placeholder dropdown' });
    expect(button).toHaveTextContent('Option 1');
  });

  // Test 9: Option aria-selected attribute
  test('options have correct aria-selected attribute', () => {
    render(<InputDropdown options={mockOptions} value="option1" ariaLabel="options dropdown" />);
    const button = screen.getByRole('button', { name: 'options dropdown' });

    fireEvent.click(button);

    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
    expect(options[1]).toHaveAttribute('aria-selected', 'false');
  });

  // Test 10: Container wraps button
  test('has wrapper container', () => {
    render(<InputDropdown options={mockOptions} ariaLabel="container dropdown" />);
    const button = screen.getByRole('button', { name: 'container dropdown' });
    const container = button.parentElement;

    expect(container).toBeInTheDocument();
  });
});

// ==================== Textarea Tests ====================
describe('Textarea Component', () => {
  // Test 1: Renders correctly with CSS class
  test('renders with className attribute', () => {
    render(<Textarea placeholder="Enter text" ariaLabel="textarea" />);
    const textarea = screen.getByRole('textbox');

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('class');
  });

  // Test 2: Displays placeholder correctly
  test('displays placeholder text', () => {
    render(<Textarea placeholder="Enter your message" ariaLabel="message textarea" />);
    const textarea = screen.getByPlaceholderText('Enter your message');

    expect(textarea).toBeInTheDocument();
  });

  // Test 3: Handles value changes
  test('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Textarea value="" onChange={handleChange} ariaLabel="change textarea" />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'test value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  // Test 4: Error state with aria-invalid
  test('shows error state with aria-invalid', () => {
    render(<Textarea error ariaLabel="error textarea" />);
    const textarea = screen.getByRole('textbox');

    expect(textarea).toHaveAttribute('class');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  // Test 5: Disabled state works correctly
  test('renders disabled state correctly', () => {
    render(<Textarea disabled ariaLabel="disabled textarea" />);
    const textarea = screen.getByRole('textbox');

    expect(textarea).toBeDisabled();
  });

  // Test 6: Character counter with maxLength
  test('shows character counter when maxLength is provided', () => {
    render(<Textarea maxLength={100} value="Hello" onChange={() => {}} ariaLabel="counter textarea" />);
    const counter = screen.getByText('5/100');

    expect(counter).toBeInTheDocument();
  });

  // Test 7: Character counter updates on change
  test('character counter updates with value changes', () => {
    const { rerender } = render(
      <Textarea maxLength={100} value="" onChange={() => {}} ariaLabel="update counter textarea" />
    );

    expect(screen.getByText('0/100')).toBeInTheDocument();

    rerender(<Textarea maxLength={100} value="Hello World" onChange={() => {}} ariaLabel="update counter textarea" />);
    expect(screen.getByText('11/100')).toBeInTheDocument();
  });

  // Test 8: No counter without maxLength
  test('does not show counter without maxLength', () => {
    render(<Textarea ariaLabel="no counter textarea" />);

    expect(screen.queryByText(/\/\d+/)).not.toBeInTheDocument();
  });

  // Test 9: maxLength attribute is applied
  test('applies maxLength attribute correctly', () => {
    render(<Textarea maxLength={200} ariaLabel="maxlength textarea" />);
    const textarea = screen.getByRole('textbox');

    expect(textarea).toHaveAttribute('maxLength', '200');
  });

  // Test 10: textarea works with maxLength
  test('accepts maxLength prop', () => {
    render(<Textarea maxLength={100} ariaLabel="counter class textarea" />);
    const textarea = screen.getByRole('textbox');

    expect(textarea).toHaveAttribute('maxLength', '100');
  });

  // Test 11: Container wraps textarea
  test('has wrapper container', () => {
    render(<Textarea ariaLabel="container textarea" />);
    const textarea = screen.getByRole('textbox');
    const container = textarea.parentElement;

    expect(container).toBeInTheDocument();
  });
});
