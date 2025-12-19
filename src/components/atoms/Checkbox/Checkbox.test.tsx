// Path: src/components/atoms/Checkbox/Checkbox.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox Atom', () => {
  describe('Rendering', () => {
    it('should render checkbox', () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          ariaLabel="Test checkbox"
        />
      );

      const checkbox = screen.getByLabelText('Test checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('type', 'checkbox');
    });

    it('should render checked checkbox', () => {
      render(
        <Checkbox
          checked={true}
          onChange={() => {}}
          ariaLabel="Test checkbox"
        />
      );

      const checkbox = screen.getByLabelText('Test checkbox');
      expect(checkbox).toBeChecked();
    });

    it('should render unchecked checkbox', () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          ariaLabel="Test checkbox"
        />
      );

      const checkbox = screen.getByLabelText('Test checkbox');
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('Functionality', () => {
    it('should call onChange when clicked', () => {
      const handleChange = jest.fn();

      render(
        <Checkbox
          checked={false}
          onChange={handleChange}
          ariaLabel="Test checkbox"
        />
      );

      const checkbox = screen.getByLabelText('Test checkbox');
      fireEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('should call onChange with false when unchecking', () => {
      const handleChange = jest.fn();

      render(
        <Checkbox
          checked={true}
          onChange={handleChange}
          ariaLabel="Test checkbox"
        />
      );

      const checkbox = screen.getByLabelText('Test checkbox');
      fireEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('should not call onChange when disabled', () => {
      const handleChange = jest.fn();

      render(
        <Checkbox
          checked={false}
          onChange={handleChange}
          disabled={true}
          ariaLabel="Test checkbox"
        />
      );

      const checkbox = screen.getByLabelText('Test checkbox');
      fireEvent.click(checkbox);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Disabled State', () => {
    it('should render disabled checkbox', () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          disabled={true}
          ariaLabel="Test checkbox"
        />
      );

      const checkbox = screen.getByLabelText('Test checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('should have className attribute when disabled', () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          disabled={true}
          ariaLabel="Test checkbox"
        />
      );

      const checkbox = screen.getByLabelText('Test checkbox');
      expect(checkbox).toHaveAttribute('class');
    });
  });

  describe('Styling', () => {
    it('should have className attribute applied', () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          ariaLabel="Test checkbox"
        />
      );

      const checkbox = screen.getByLabelText('Test checkbox');
      expect(checkbox).toHaveAttribute('class');
    });

    it('should render as input type checkbox', () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          ariaLabel="Test checkbox"
        />
      );

      const checkbox = screen.getByLabelText('Test checkbox');
      expect(checkbox).toHaveAttribute('type', 'checkbox');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label', () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          ariaLabel="Select item"
        />
      );

      const checkbox = screen.getByLabelText('Select item');
      expect(checkbox).toBeInTheDocument();
    });

    it('should have aria-describedby', () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          ariaLabel="Test"
          ariaDescribedby="description-id"
        />
      );

      const checkbox = screen.getByLabelText('Test');
      expect(checkbox).toHaveAttribute('aria-describedby', 'description-id');
    });

    it('should have custom id', () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          ariaLabel="Test"
          id="custom-checkbox-id"
        />
      );

      const checkbox = screen.getByLabelText('Test');
      expect(checkbox).toHaveAttribute('id', 'custom-checkbox-id');
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid clicks', () => {
      const handleChange = jest.fn();

      render(
        <Checkbox
          checked={false}
          onChange={handleChange}
          ariaLabel="Test checkbox"
        />
      );

      const checkbox = screen.getByLabelText('Test checkbox');
      fireEvent.click(checkbox);
      fireEvent.click(checkbox);
      fireEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(3);
    });

    it('should work without optional props', () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
        />
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should accept custom className', () => {
      render(
        <Checkbox
          checked={false}
          onChange={() => {}}
          className="custom-class"
          ariaLabel="Test"
        />
      );

      const checkbox = screen.getByLabelText('Test');
      expect(checkbox).toHaveClass('custom-class');
    });
  });
});
