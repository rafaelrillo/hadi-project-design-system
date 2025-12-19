// Path: src/components/molecules/FormField/FormField.test.tsx
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';

// Mock input component for testing
const MockInput = () => <input type="text" placeholder="Test input" />;

describe('FormField Component', () => {
  describe('Rendering', () => {
    it('should render label and children', () => {
      render(
        <FormField label="Username">
          <MockInput />
        </FormField>
      );
      expect(screen.getByText('Username')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
    });

    it('should render with any children element', () => {
      render(
        <FormField label="Description">
          <textarea placeholder="Enter description" />
        </FormField>
      );
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument();
    });
  });

  describe('Required Field', () => {
    it('should not show asterisk when not required', () => {
      render(
        <FormField label="Optional Field">
          <MockInput />
        </FormField>
      );
      const label = screen.getByText('Optional Field');
      expect(label.textContent).toBe('Optional Field ');
    });

    it('should show asterisk when required', () => {
      render(
        <FormField label="Required Field" required>
          <MockInput />
        </FormField>
      );
      expect(screen.getByText('Required Field')).toBeInTheDocument();
      const asterisk = screen.getByText('*');
      expect(asterisk).toBeInTheDocument();
    });
  });

  describe('Helper Text', () => {
    it('should render helper text when provided', () => {
      render(
        <FormField label="Email" helperText="Enter a valid email address">
          <MockInput />
        </FormField>
      );
      expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();
    });

    it('should not render helper text when not provided', () => {
      render(
        <FormField label="Email">
          <MockInput />
        </FormField>
      );
      expect(screen.queryByText(/Enter/)).not.toBeInTheDocument();
    });

    it('should render helper text element', () => {
      render(
        <FormField label="Field" helperText="Helper text">
          <MockInput />
        </FormField>
      );
      const helperText = screen.getByText('Helper text');
      expect(helperText).toBeInTheDocument();
    });
  });

  describe('Error Message', () => {
    it('should render error message when provided', () => {
      render(
        <FormField label="Email" errorMessage="Email is required">
          <MockInput />
        </FormField>
      );
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    it('should not render error message when not provided', () => {
      render(
        <FormField label="Email">
          <MockInput />
        </FormField>
      );
      expect(screen.queryByText(/required/)).not.toBeInTheDocument();
    });

    it('should render error message element', () => {
      render(
        <FormField label="Field" errorMessage="Error message">
          <MockInput />
        </FormField>
      );
      const errorMessage = screen.getByText('Error message');
      expect(errorMessage).toBeInTheDocument();
    });

    it('should hide helper text when error message is present', () => {
      render(
        <FormField
          label="Email"
          helperText="This is helper text"
          errorMessage="This is an error"
        >
          <MockInput />
        </FormField>
      );
      expect(screen.getByText('This is an error')).toBeInTheDocument();
      expect(screen.queryByText('This is helper text')).not.toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should render container element', () => {
      const { container } = render(
        <FormField label="Test">
          <MockInput />
        </FormField>
      );
      const formField = container.firstChild as HTMLElement;
      expect(formField).toBeInTheDocument();
    });

    it('should render label element', () => {
      render(
        <FormField label="Test Label">
          <MockInput />
        </FormField>
      );
      const label = screen.getByText('Test Label');
      expect(label).toBeInTheDocument();
    });
  });

  describe('HTML For Attribute', () => {
    it('should support htmlFor attribute on label', () => {
      render(
        <FormField label="Username" htmlFor="username-input">
          <input id="username-input" type="text" />
        </FormField>
      );
      const label = screen.getByText('Username');
      expect(label).toHaveAttribute('for', 'username-input');
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle all props together', () => {
      render(
        <FormField
          label="Password"
          required
          helperText="Must be at least 8 characters"
          htmlFor="password"
        >
          <input id="password" type="password" />
        </FormField>
      );
      expect(screen.getByText('Password')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
      expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
    });

    it('should prioritize error message over helper text', () => {
      const { rerender } = render(
        <FormField label="Email" helperText="Enter your email">
          <MockInput />
        </FormField>
      );
      expect(screen.getByText('Enter your email')).toBeInTheDocument();

      rerender(
        <FormField
          label="Email"
          helperText="Enter your email"
          errorMessage="Email is invalid"
        >
          <MockInput />
        </FormField>
      );
      expect(screen.getByText('Email is invalid')).toBeInTheDocument();
      expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
    });

    it('should work with different input types', () => {
      const { rerender } = render(
        <FormField label="Text Input">
          <input type="text" />
        </FormField>
      );
      expect(screen.getByText('Text Input')).toBeInTheDocument();

      rerender(
        <FormField label="Select Input">
          <select><option>Option 1</option></select>
        </FormField>
      );
      expect(screen.getByText('Select Input')).toBeInTheDocument();

      rerender(
        <FormField label="Textarea Input">
          <textarea />
        </FormField>
      );
      expect(screen.getByText('Textarea Input')).toBeInTheDocument();
    });
  });

  describe('Use Cases', () => {
    it('should render a complete form field with all elements', () => {
      render(
        <FormField
          label="Full Name"
          required
          helperText="Enter your first and last name"
          htmlFor="fullname"
        >
          <input id="fullname" type="text" placeholder="John Doe" />
        </FormField>
      );
      expect(screen.getByText('Full Name')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
      expect(screen.getByText('Enter your first and last name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
    });

    it('should render an error state', () => {
      render(
        <FormField
          label="Email Address"
          required
          errorMessage="Please enter a valid email"
          htmlFor="email"
        >
          <input id="email" type="email" aria-invalid="true" />
        </FormField>
      );
      expect(screen.getByText('Email Address')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });
  });
});
