// Path: src/pages/atoms/CheckboxShowcase.tsx
// Terminal Theme Version
import React, { useState } from 'react';
import { Checkbox } from '../../components/atoms/Checkbox';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function CheckboxShowcase() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--primary)',
    marginBottom: '8px',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    textShadow: '0 0 15px var(--accent-glow)'
  };

  const descStyles: React.CSSProperties = {
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
        <h1 style={titleStyles}>&gt; Checkbox_</h1>
        <p style={descStyles}>
          // Componente de selección múltiple
        </p>
      </header>

      {/* Basic Checkbox */}
      <ShowcaseSection
        title="Checkbox Básico"
        description="Estados checked y unchecked"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox
                checked={checked1}
                onChange={setChecked1}
                id="checkbox-1"
              />
              <label htmlFor="checkbox-1" style={{ fontSize: '14px', cursor: 'pointer', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
                Opción 1 (no seleccionada)
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox
                checked={checked2}
                onChange={setChecked2}
                id="checkbox-2"
              />
              <label htmlFor="checkbox-2" style={{ fontSize: '14px', cursor: 'pointer', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
                Opción 2 (seleccionada)
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox
                checked={checked3}
                onChange={setChecked3}
                id="checkbox-3"
              />
              <label htmlFor="checkbox-3" style={{ fontSize: '14px', cursor: 'pointer', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
                Opción 3
              </label>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Disabled Checkbox */}
      <ShowcaseSection
        title="Checkbox Deshabilitado"
        description="Estados disabled con opacidad reducida"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox
                checked={false}
                onChange={() => {}}
                disabled={true}
                id="checkbox-disabled-1"
              />
              <label htmlFor="checkbox-disabled-1" style={{ fontSize: '14px', color: 'var(--foreground-subtle)', fontFamily: 'var(--font-mono)' }}>
                Checkbox deshabilitado (no seleccionado)
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Checkbox
                checked={true}
                onChange={() => {}}
                disabled={true}
                id="checkbox-disabled-2"
              />
              <label htmlFor="checkbox-disabled-2" style={{ fontSize: '14px', color: 'var(--foreground-subtle)', fontFamily: 'var(--font-mono)' }}>
                Checkbox deshabilitado (seleccionado)
              </label>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Use Case */}
      <ShowcaseSection
        title="Caso de Uso: Lista de Opciones"
        description="Ejemplo de múltiples checkboxes en un formulario"
      >
        <ComponentPreview>
          <div style={{ padding: '16px', backgroundColor: 'var(--background-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', maxWidth: '400px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Selecciona tus intereses:</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Deportes', 'Tecnología', 'Música', 'Arte', 'Viajes'].map((interest, index) => {
                const [checked, setChecked] = useState(false);
                return (
                  <div key={interest} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Checkbox
                      checked={checked}
                      onChange={setChecked}
                      id={`interest-${index}`}
                    />
                    <label htmlFor={`interest-${index}`} style={{ fontSize: '14px', cursor: 'pointer', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
                      {interest}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Tamaño:</strong> 16x16px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Border:</strong> 1px solid var(--border)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Border radius:</strong> 2px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Accent color:</strong> var(--primary) (checked)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Glow en hover:</strong> var(--shadow-glow-sm)</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
