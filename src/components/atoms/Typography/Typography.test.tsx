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
      render(<ProductKey>FING</ProductKey>);
      const productKey = screen.getByText('FING');
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
});
