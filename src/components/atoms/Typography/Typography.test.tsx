// Path: src/components/atoms/Typography/Typography.test.tsx
import { render, screen } from '@testing-library/react';
import { Heading1, Heading2, Heading3, Heading4, Paragraph, Label, ProductKey } from './Typography';

describe('Typography Components', () => {
  describe('Heading1', () => {
    it('should render as h1 element', () => {
      render(<Heading1>Test Heading 1</Heading1>);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
    });

    it('should render children content', () => {
      render(<Heading1>Main Title</Heading1>);
      expect(screen.getByText('Main Title')).toBeInTheDocument();
    });
  });

  describe('Heading2', () => {
    it('should render as h2 element', () => {
      render(<Heading2>Test Heading 2</Heading2>);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('should render children content', () => {
      render(<Heading2>Subtitle</Heading2>);
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
    });
  });

  describe('Heading3', () => {
    it('should render as h3 element', () => {
      render(<Heading3>Test Heading 3</Heading3>);
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H3');
    });

    it('should render children content', () => {
      render(<Heading3>Section Title</Heading3>);
      expect(screen.getByText('Section Title')).toBeInTheDocument();
    });
  });

  describe('Heading4', () => {
    it('should render as h4 element', () => {
      render(<Heading4>Test Heading 4</Heading4>);
      const heading = screen.getByRole('heading', { level: 4 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H4');
    });

    it('should render children content', () => {
      render(<Heading4>Small Heading</Heading4>);
      expect(screen.getByText('Small Heading')).toBeInTheDocument();
    });
  });

  describe('Paragraph', () => {
    it('should render as p element', () => {
      render(<Paragraph>Test paragraph</Paragraph>);
      const paragraph = screen.getByText('Test paragraph');
      expect(paragraph).toBeInTheDocument();
      expect(paragraph.tagName).toBe('P');
    });

    it('should render children content', () => {
      render(<Paragraph>This is a paragraph with some text.</Paragraph>);
      expect(screen.getByText('This is a paragraph with some text.')).toBeInTheDocument();
    });
  });

  describe('Label', () => {
    it('should render as label element', () => {
      render(<Label>Test label</Label>);
      const label = screen.getByText('Test label');
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
    });

    it('should support htmlFor attribute', () => {
      render(<Label htmlFor="input-id">Label text</Label>);
      const label = screen.getByText('Label text');
      expect(label).toHaveAttribute('for', 'input-id');
    });

    it('should render children content', () => {
      render(<Label>Form Label</Label>);
      expect(screen.getByText('Form Label')).toBeInTheDocument();
    });
  });

  describe('ProductKey', () => {
    it('should render as span element', () => {
      render(<ProductKey>QUAFI</ProductKey>);
      const productKey = screen.getByText('QUAFI');
      expect(productKey).toBeInTheDocument();
      expect(productKey.tagName).toBe('SPAN');
    });

    it('should render children content', () => {
      render(<ProductKey>Product Name</ProductKey>);
      expect(screen.getByText('Product Name')).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('should allow custom className on Heading1', () => {
      render(<Heading1 className="custom-class">Custom</Heading1>);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('custom-class');
    });

    it('should allow custom className on Paragraph', () => {
      render(<Paragraph className="custom-class">Custom</Paragraph>);
      const paragraph = screen.getByText('Custom');
      expect(paragraph).toHaveClass('custom-class');
    });

    it('should allow custom className on ProductKey', () => {
      render(<ProductKey className="custom-class">Custom</ProductKey>);
      const productKey = screen.getByText('Custom');
      expect(productKey).toHaveClass('custom-class');
    });
  });

  describe('Semantic HTML', () => {
    it('should render proper heading hierarchy', () => {
      render(
        <div>
          <Heading1>Level 1</Heading1>
          <Heading2>Level 2</Heading2>
          <Heading3>Level 3</Heading3>
          <Heading4>Level 4</Heading4>
        </div>
      );
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
    });
  });

  describe('Text Effects', () => {
    it('should render Heading1 with carved effect without errors', () => {
      render(<Heading1 effect="carved">Carved Text</Heading1>);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText('Carved Text')).toBeInTheDocument();
    });

    it('should render Paragraph with embossed effect without errors', () => {
      render(<Paragraph effect="embossed">Embossed Text</Paragraph>);
      expect(screen.getByText('Embossed Text')).toBeInTheDocument();
    });

    it('should render all carved standard variants without errors', () => {
      const { container } = render(
        <div>
          <Heading1 effect="carved">A</Heading1>
          <Heading2 effect="carved-strong">B</Heading2>
          <Heading3 effect="carved-petrol">C</Heading3>
          <Heading4 effect="carved-steel">D</Heading4>
          <Paragraph effect="carved-muted">E</Paragraph>
          <Label effect="carved-positive">F</Label>
          <ProductKey effect="carved-accent">G</ProductKey>
        </div>
      );
      expect(container.querySelectorAll('h1, h2, h3, h4, p, label, span')).toHaveLength(7);
    });

    it('should render carved intensity variants without errors', () => {
      const { container } = render(
        <div>
          <Heading1 effect="carved-whisper">A</Heading1>
          <Heading2 effect="carved-positive-strong">B</Heading2>
          <Heading3 effect="carved-warning-strong">C</Heading3>
          <Heading4 effect="carved-negative-strong">D</Heading4>
          <Paragraph effect="carved-info-strong">E</Paragraph>
          <Label effect="carved-accent-strong">F</Label>
          <ProductKey effect="carved-petrol-md">G</ProductKey>
        </div>
      );
      expect(container.querySelectorAll('h1, h2, h3, h4, p, label, span')).toHaveLength(7);
    });

    it('should render carved medium semantic variants without errors', () => {
      const { container } = render(
        <div>
          <Heading1 effect="carved-positive-md">A</Heading1>
          <Heading2 effect="carved-warning-md">B</Heading2>
          <Heading3 effect="carved-negative-md">C</Heading3>
        </div>
      );
      expect(container.querySelectorAll('h1, h2, h3')).toHaveLength(3);
    });

    it('should render all embossed standard variants without errors', () => {
      const { container } = render(
        <div>
          <Heading1 effect="embossed">A</Heading1>
          <Heading2 effect="embossed-subtle">B</Heading2>
          <Heading3 effect="embossed-strong">C</Heading3>
          <Heading4 effect="embossed-petrol">D</Heading4>
          <Paragraph effect="embossed-positive">E</Paragraph>
          <Label effect="embossed-warning">F</Label>
          <ProductKey effect="embossed-info">G</ProductKey>
        </div>
      );
      expect(container.querySelectorAll('h1, h2, h3, h4, p, label, span')).toHaveLength(7);
    });

    it('should render embossed small semantic variants without errors', () => {
      const { container } = render(
        <div>
          <Heading1 effect="embossed-petrol-sm">A</Heading1>
          <Heading2 effect="embossed-positive-sm">B</Heading2>
          <Heading3 effect="embossed-warning-sm">C</Heading3>
          <Heading4 effect="embossed-negative-sm">D</Heading4>
          <Paragraph effect="embossed-info-sm">E</Paragraph>
        </div>
      );
      expect(container.querySelectorAll('h1, h2, h3, h4, p')).toHaveLength(5);
    });

    it('should render glow variants without errors', () => {
      const { container } = render(
        <div>
          <Heading1 effect="glow-petrol">A</Heading1>
          <Heading2 effect="glow-positive">B</Heading2>
          <Heading3 effect="glow-negative">C</Heading3>
        </div>
      );
      expect(container.querySelectorAll('h1, h2, h3')).toHaveLength(3);
    });

    it('should preserve custom className when effect is applied', () => {
      render(<Paragraph effect="carved" className="my-custom">Combined</Paragraph>);
      expect(screen.getByText('Combined')).toHaveClass('my-custom');
    });

    it('should preserve htmlFor on Label with effect', () => {
      render(<Label effect="carved-muted" htmlFor="test-input">Label</Label>);
      expect(screen.getByText('Label')).toHaveAttribute('for', 'test-input');
    });
  });
});
