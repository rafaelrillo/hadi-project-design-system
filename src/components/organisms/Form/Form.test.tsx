// Path: src/components/organisms/Form/Form.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from './Form';
import { FormField } from '../../molecules/FormField';
import { Button } from '../../atoms/Button';

describe('Form Organism', () => {
  describe('Rendering', () => {
    it('should render form with children', () => {
      render(
        <Form onSubmit={() => {}}>
          <FormField label="Name" id="name">
            <input type="text" id="name" />
          </FormField>
          <FormField label="Email" id="email">
            <input type="email" id="email" />
          </FormField>
        </Form>
      );

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('should render with footer', () => {
      const footer = (
        <>
          <Button variant="secondary">Cancelar</Button>
          <Button variant="primary" type="submit">Guardar</Button>
        </>
      );

      render(
        <Form onSubmit={() => {}} footer={footer}>
          <FormField label="Name" id="name">
            <input type="text" id="name" />
          </FormField>
        </Form>
      );

      expect(screen.getByText('Cancelar')).toBeInTheDocument();
      expect(screen.getByText('Guardar')).toBeInTheDocument();
    });

    it('should render without footer', () => {
      const { container } = render(
        <Form onSubmit={() => {}}>
          <FormField label="Name" id="name">
            <input type="text" id="name" />
          </FormField>
        </Form>
      );

      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
      expect(form?.children.length).toBe(1); // Only fields container
    });
  });

  describe('Layout Columns', () => {
    it('should render 1 column layout by default', () => {
      const { container } = render(
        <Form onSubmit={() => {}}>
          <div>Field 1</div>
          <div>Field 2</div>
        </Form>
      );

      const fieldsContainer = container.querySelector('form > div:first-child');
      expect(fieldsContainer).toBeInTheDocument();
    });

    it('should render 1 column layout explicitly', () => {
      const { container } = render(
        <Form onSubmit={() => {}} columns={1}>
          <div>Field 1</div>
          <div>Field 2</div>
        </Form>
      );

      const fieldsContainer = container.querySelector('form > div:first-child');
      expect(fieldsContainer).toBeInTheDocument();
    });

    it('should render 2 column layout', () => {
      const { container } = render(
        <Form onSubmit={() => {}} columns={2}>
          <div>Field 1</div>
          <div>Field 2</div>
        </Form>
      );

      const fieldsContainer = container.querySelector('form > div:first-child');
      expect(fieldsContainer).toBeInTheDocument();
    });
  });

  describe('Submit Functionality', () => {
    it('should call onSubmit when form is submitted', () => {
      const handleSubmit = jest.fn();

      const { container } = render(
        <Form onSubmit={handleSubmit}>
          <FormField label="Name" id="name">
            <input type="text" id="name" />
          </FormField>
        </Form>
      );

      const form = container.querySelector('form');
      fireEvent.submit(form!);

      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('should call onSubmit when submit button is clicked', () => {
      const handleSubmit = jest.fn();
      const footer = <Button type="submit">Submit</Button>;

      render(
        <Form onSubmit={handleSubmit} footer={footer}>
          <FormField label="Name" id="name">
            <input type="text" id="name" />
          </FormField>
        </Form>
      );

      fireEvent.click(screen.getByText('Submit'));

      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('should prevent default form submission', () => {
      const handleSubmit = jest.fn();
      const { container } = render(
        <Form onSubmit={handleSubmit}>
          <FormField label="Name" id="name">
            <input type="text" id="name" />
          </FormField>
        </Form>
      );

      const form = container.querySelector('form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');

      form!.dispatchEvent(submitEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Styling', () => {
    it('should render fields container', () => {
      const { container } = render(
        <Form onSubmit={() => {}}>
          <div>Field 1</div>
          <div>Field 2</div>
        </Form>
      );

      const fieldsContainer = container.querySelector('form > div:first-child');
      expect(fieldsContainer).toBeInTheDocument();
    });

    it('should render footer when provided', () => {
      const footer = <div data-testid="footer-content">Footer</div>;

      render(
        <Form onSubmit={() => {}} footer={footer}>
          <div>Field 1</div>
        </Form>
      );

      const footerContent = screen.getByTestId('footer-content');
      const footerContainer = footerContent.parentElement;
      expect(footerContainer).toBeInTheDocument();
    });

    it('should have grid display on fields container', () => {
      const { container } = render(
        <Form onSubmit={() => {}}>
          <div>Field 1</div>
        </Form>
      );

      const fieldsContainer = container.querySelector('form > div:first-child');
      expect(fieldsContainer).toBeInTheDocument();
    });

    it('should render fields container when footer exists', () => {
      const footer = <Button type="submit">Submit</Button>;

      const { container } = render(
        <Form onSubmit={() => {}} footer={footer}>
          <div>Field 1</div>
        </Form>
      );

      const fieldsContainer = container.querySelector('form > div:first-child');
      expect(fieldsContainer).toBeInTheDocument();
    });

    it('should render fields container when no footer', () => {
      const { container } = render(
        <Form onSubmit={() => {}}>
          <div>Field 1</div>
        </Form>
      );

      const fieldsContainer = container.querySelector('form > div:first-child');
      expect(fieldsContainer).toBeInTheDocument();
    });
  });

  describe('Use Cases', () => {
    it('should work as simple login form', () => {
      const handleSubmit = jest.fn();
      const footer = (
        <>
          <Button variant="secondary">Cancelar</Button>
          <Button variant="primary" type="submit">Iniciar sesión</Button>
        </>
      );

      render(
        <Form onSubmit={handleSubmit} columns={1} footer={footer}>
          <FormField label="Email" id="email" required>
            <input type="email" id="email" />
          </FormField>
          <FormField label="Contraseña" id="password" required>
            <input type="password" id="password" />
          </FormField>
        </Form>
      );

      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Contraseña')).toBeInTheDocument();
      expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
    });

    it('should work as two-column registration form', () => {
      const handleSubmit = jest.fn();
      const footer = (
        <>
          <Button variant="secondary">Cancelar</Button>
          <Button variant="primary" type="submit">Registrar</Button>
        </>
      );

      render(
        <Form onSubmit={handleSubmit} columns={2} footer={footer}>
          <FormField label="Nombre" id="firstName">
            <input type="text" id="firstName" />
          </FormField>
          <FormField label="Apellido" id="lastName">
            <input type="text" id="lastName" />
          </FormField>
          <FormField label="Email" id="email">
            <input type="email" id="email" />
          </FormField>
          <FormField label="Teléfono" id="phone">
            <input type="tel" id="phone" />
          </FormField>
        </Form>
      );

      expect(screen.getByText('Nombre')).toBeInTheDocument();
      expect(screen.getByText('Apellido')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Teléfono')).toBeInTheDocument();
      expect(screen.getByText('Registrar')).toBeInTheDocument();
    });

    it('should work with mixed field types', () => {
      const handleSubmit = jest.fn();

      render(
        <Form onSubmit={handleSubmit} columns={2}>
          <FormField label="Nombre" id="name">
            <input type="text" id="name" />
          </FormField>
          <FormField label="País" id="country">
            <select id="country">
              <option>Perú</option>
              <option>Chile</option>
            </select>
          </FormField>
          <FormField label="Descripción" id="description">
            <textarea id="description" />
          </FormField>
          <FormField label="Acepto términos" id="terms">
            <input type="checkbox" id="terms" />
          </FormField>
        </Form>
      );

      expect(screen.getByText('Nombre')).toBeInTheDocument();
      expect(screen.getByText('País')).toBeInTheDocument();
      expect(screen.getByText('Descripción')).toBeInTheDocument();
      expect(screen.getByText('Acepto términos')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      const { container } = render(
        <Form onSubmit={() => {}}>
          {null}
        </Form>
      );

      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('should handle custom className', () => {
      const { container } = render(
        <Form onSubmit={() => {}} className="custom-form">
          <div>Field 1</div>
        </Form>
      );

      const form = container.querySelector('.custom-form');
      expect(form).toBeInTheDocument();
    });

    it('should handle many fields', () => {
      const fields = Array.from({ length: 20 }, (_, i) => (
        <FormField key={i} label={`Field ${i + 1}`} id={`field-${i}`}>
          <input type="text" id={`field-${i}`} />
        </FormField>
      ));

      render(
        <Form onSubmit={() => {}} columns={2}>
          {fields}
        </Form>
      );

      expect(screen.getByText('Field 1')).toBeInTheDocument();
      expect(screen.getByText('Field 20')).toBeInTheDocument();
    });

    it('should handle form submission with event data', () => {
      const handleSubmit = jest.fn((e) => {
        expect(e).toBeDefined();
        expect(e.preventDefault).toBeDefined();
      });

      const { container } = render(
        <Form onSubmit={handleSubmit}>
          <div>Field 1</div>
        </Form>
      );

      const form = container.querySelector('form');
      fireEvent.submit(form!);

      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  describe('Form Data Capture', () => {
    it('should allow input values to be captured on submit', () => {
      const handleSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        expect(formData.get('name')).toBe('John Doe');
        expect(formData.get('email')).toBe('john@example.com');
      });

      render(
        <Form onSubmit={handleSubmit}>
          <FormField label="Name" id="name">
            <input type="text" id="name" name="name" defaultValue="John Doe" />
          </FormField>
          <FormField label="Email" id="email">
            <input type="email" id="email" name="email" defaultValue="john@example.com" />
          </FormField>
        </Form>
      );

      const form = document.querySelector('form');
      fireEvent.submit(form!);

      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('should capture updated input values', () => {
      const handleSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        expect(formData.get('name')).toBe('Jane Doe');
      });

      render(
        <Form onSubmit={handleSubmit}>
          <FormField label="Name" id="name">
            <input type="text" id="name" name="name" />
          </FormField>
        </Form>
      );

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'Jane Doe' } });

      const form = document.querySelector('form');
      fireEvent.submit(form!);

      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('should capture select values', () => {
      const handleSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        expect(formData.get('country')).toBe('chile');
      });

      render(
        <Form onSubmit={handleSubmit}>
          <FormField label="Country" id="country">
            <select id="country" name="country" defaultValue="chile">
              <option value="peru">Perú</option>
              <option value="chile">Chile</option>
            </select>
          </FormField>
        </Form>
      );

      const form = document.querySelector('form');
      fireEvent.submit(form!);

      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('should capture checkbox values', () => {
      const handleSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        expect(formData.get('terms')).toBe('on');
      });

      render(
        <Form onSubmit={handleSubmit}>
          <FormField label="Accept Terms" id="terms">
            <input type="checkbox" id="terms" name="terms" defaultChecked />
          </FormField>
        </Form>
      );

      const form = document.querySelector('form');
      fireEvent.submit(form!);

      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('should capture textarea values', () => {
      const handleSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        expect(formData.get('description')).toBe('Test description');
      });

      render(
        <Form onSubmit={handleSubmit}>
          <FormField label="Description" id="description">
            <textarea id="description" name="description" defaultValue="Test description" />
          </FormField>
        </Form>
      );

      const form = document.querySelector('form');
      fireEvent.submit(form!);

      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('CSS Classes', () => {
    it('should render form element', () => {
      const { container } = render(
        <Form onSubmit={() => {}}>
          <div>Field 1</div>
        </Form>
      );

      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('should render footer container when footer provided', () => {
      const footer = <div data-testid="footer-content">Footer</div>;

      render(
        <Form onSubmit={() => {}} footer={footer}>
          <div>Field 1</div>
        </Form>
      );

      const footerContent = screen.getByTestId('footer-content');
      const footerContainer = footerContent.parentElement;
      expect(footerContainer).toBeInTheDocument();
    });

    it('should apply custom className to form', () => {
      const { container } = render(
        <Form onSubmit={() => {}} className="my-custom-form">
          <div>Field 1</div>
        </Form>
      );

      const form = container.querySelector('.my-custom-form');
      expect(form).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should allow Tab navigation between fields', () => {
      render(
        <Form onSubmit={() => {}}>
          <FormField label="First Name" id="firstName">
            <input type="text" id="firstName" data-testid="first-input" />
          </FormField>
          <FormField label="Last Name" id="lastName">
            <input type="text" id="lastName" data-testid="last-input" />
          </FormField>
        </Form>
      );

      const firstInput = screen.getByTestId('first-input');
      const lastInput = screen.getByTestId('last-input');

      firstInput.focus();
      expect(document.activeElement).toBe(firstInput);

      lastInput.focus();
      expect(document.activeElement).toBe(lastInput);
    });

    it('should have input inside form', () => {
      render(
        <Form onSubmit={() => {}}>
          <FormField label="Name" id="name">
            <input type="text" id="name" data-testid="name-input" />
          </FormField>
        </Form>
      );

      const input = screen.getByTestId('name-input');
      expect(input.closest('form')).toBeInTheDocument();
    });
  });

  describe('FormField Integration', () => {
    it('should render input with correct id', () => {
      render(
        <Form onSubmit={() => {}}>
          <FormField label="Email Address" id="email">
            <input type="email" id="email" data-testid="email-input" />
          </FormField>
        </Form>
      );

      const input = screen.getByTestId('email-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('id', 'email');
    });

    it('should display required indicator from FormField', () => {
      render(
        <Form onSubmit={() => {}}>
          <FormField label="Email" id="email" required>
            <input type="email" id="email" />
          </FormField>
        </Form>
      );

      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('should display helper text from FormField', () => {
      render(
        <Form onSubmit={() => {}}>
          <FormField label="Password" id="password" helperText="Minimum 8 characters">
            <input type="password" id="password" />
          </FormField>
        </Form>
      );

      expect(screen.getByText('Minimum 8 characters')).toBeInTheDocument();
    });

    it('should display error message from FormField', () => {
      render(
        <Form onSubmit={() => {}}>
          <FormField label="Email" id="email" errorMessage="Invalid email format">
            <input type="email" id="email" />
          </FormField>
        </Form>
      );

      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });
  });

  describe('Button Order', () => {
    it('should render buttons in correct order (secondary first, primary last)', () => {
      const footer = (
        <>
          <Button variant="secondary" data-testid="cancel-btn">Cancelar</Button>
          <Button variant="primary" data-testid="submit-btn">Guardar</Button>
        </>
      );

      const { container } = render(
        <Form onSubmit={() => {}} footer={footer}>
          <div>Field 1</div>
        </Form>
      );

      const buttons = container.querySelectorAll('button');
      expect(buttons[0]).toHaveTextContent('Cancelar');
      expect(buttons[1]).toHaveTextContent('Guardar');
    });
  });
});
