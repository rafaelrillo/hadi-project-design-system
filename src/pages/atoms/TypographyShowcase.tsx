// Path: src/pages/atoms/TypographyShowcase.tsx
// SENTINEL Design System
import type { CSSProperties } from 'react';
import { Heading1, Heading2, Heading3, Heading4, Paragraph, Label, ProductKey } from '../../components/atoms/Typography';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function TypographyShowcase() {
  const pageHeaderStyles: CSSProperties = {
    marginBottom: '32px'
  };

  const titleStyles: CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--primary)',
    marginBottom: '8px',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    textShadow: '0 0 15px var(--accent-glow)'
  };

  const descStyles: CSSProperties = {
    fontSize: '14px',
    color: 'var(--foreground-muted)',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em'
  };

  return (
    <div>
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Typography_</h1>
        <p style={descStyles}>
          // Sistema tipográfico con componentes semánticos
        </p>
      </header>

      {/* Headings */}
      <ShowcaseSection
        title="Headings"
        description="Jerarquía de títulos - Todos con JetBrains Mono"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            <Heading1>Heading 1 - 18px Bold</Heading1>
            <Heading2>Heading 2 - 16px Bold</Heading2>
            <Heading3>Heading 3 - 16px Semibold</Heading3>
            <Heading4>Heading 4 - 14px Semibold</Heading4>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Body Text */}
      <ShowcaseSection
        title="Body Text"
        description="Paragraph - 14px Regular para contenido de texto"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '600px' }}>
            <Paragraph>
              Este es un párrafo de ejemplo. El componente Paragraph usa 14px Regular con line-height 1.2.
              Ideal para contenido de texto general en la aplicación.
            </Paragraph>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua.
            </Paragraph>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Labels */}
      <ShowcaseSection
        title="Label"
        description="Label - 12px Regular para etiquetas de formularios"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px' }}>
            <div>
              <Label htmlFor="example-input-1">Nombre completo</Label>
              <input
                id="example-input-1"
                type="text"
                placeholder="Juan Pérez"
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '8px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  fontSize: '14px',
                  marginTop: '4px',
                  backgroundColor: 'var(--background-secondary)',
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-mono)'
                }}
              />
            </div>
            <div>
              <Label htmlFor="example-input-2">Correo electrónico</Label>
              <input
                id="example-input-2"
                type="email"
                placeholder="correo@ejemplo.com"
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '8px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  fontSize: '14px',
                  marginTop: '4px',
                  backgroundColor: 'var(--background-secondary)',
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-mono)'
                }}
              />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ProductKey */}
      <ShowcaseSection
        title="ProductKey"
        description="ProductKey - 24px Bold, Color accent para branding"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <ProductKey>SENTINEL</ProductKey>
            <ProductKey>Design System v2.0.0</ProductKey>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ProductKey>SNT</ProductKey>
              <Paragraph>Investment Observatory</Paragraph>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Typography Hierarchy */}
      <ShowcaseSection
        title="Jerarquía Completa"
        description="Todos los componentes tipográficos juntos"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '700px' }}>
            <div>
              <ProductKey>SENTINEL</ProductKey>
              <Paragraph style={{ marginTop: '8px', color: 'var(--foreground-muted)' }}>Design System v2.0.0</Paragraph>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
              <Heading1>Introducción al Sistema</Heading1>
              <Paragraph style={{ marginTop: '12px' }}>
                Este es un sistema de diseño completo que incluye componentes atómicos, moleculares y organismos.
              </Paragraph>
            </div>

            <div>
              <Heading2>Componentes Principales</Heading2>
              <Paragraph style={{ marginTop: '12px' }}>
                Los componentes están organizados siguiendo la metodología Atomic Design.
              </Paragraph>
            </div>

            <div>
              <Heading3>Átomos y Moléculas</Heading3>
              <Paragraph style={{ marginTop: '12px' }}>
                Los átomos son los elementos más básicos, mientras que las moléculas combinan varios átomos.
              </Paragraph>
            </div>

            <div>
              <Heading4>Especificaciones Técnicas</Heading4>
              <Paragraph style={{ marginTop: '12px' }}>
                Todos los componentes siguen las guías de estilo definidas en el design system.
              </Paragraph>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Font-family:</strong> JetBrains Mono (var(--font-mono))</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Line-height:</strong> 1.2</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Color base:</strong> var(--foreground)</p>
          <p style={{ marginTop: '12px' }}><strong style={{ color: 'var(--primary)' }}>Tamaños y pesos:</strong></p>
          <p>✓ Heading1: 18px, 700 (Bold)</p>
          <p>✓ Heading2: 16px, 700 (Bold)</p>
          <p>✓ Heading3: 16px, 600 (Semibold)</p>
          <p>✓ Heading4: 14px, 600 (Semibold)</p>
          <p>✓ Paragraph: 14px, 400 (Regular)</p>
          <p>✓ Label: 12px, 400 (Regular)</p>
          <p>✓ ProductKey: 24px, 700 (Bold), color var(--primary)</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
