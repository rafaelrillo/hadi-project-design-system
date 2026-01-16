// Path: src/pages/atoms/CheckboxShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Checkboxes
import React, { useState, useMemo } from 'react';
import { Checkbox } from '../../components/atoms/Checkbox';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function CheckboxContent() {
  const { lightAngle } = useLightEngine();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const LIGHT = {
    base: '#e0e5ec',
    shadowDark: 'hsl(220 15% 72%)',
    shadowLight: 'hsl(0 0% 100%)',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${LIGHT.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${LIGHT.shadowLight}`;
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(20, 60),
    transition: 'box-shadow 50ms linear',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--sentinel-accent-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--sentinel-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--sentinel-text-secondary)',
    fontFamily: 'var(--sentinel-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  const checkboxContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '24px',
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  const labelStyles: React.CSSProperties = {
    fontSize: '14px',
    cursor: 'pointer',
    color: '#2D3436',
    fontFamily: 'var(--sentinel-font-mono)',
  };

  const disabledLabelStyles: React.CSSProperties = {
    ...labelStyles,
    color: '#9BA4B0',
    cursor: 'not-allowed',
  };

  return (
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Checkbox_</h1>
        <p style={descStyles}>// Componente de selección múltiple</p>
      </header>

      <ShowcaseSection
        title="Checkbox Básico"
        description="Estados checked y unchecked"
      >
        <div style={checkboxContainerStyles}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Checkbox
              checked={checked1}
              onChange={setChecked1}
              id="checkbox-1"
            />
            <label htmlFor="checkbox-1" style={labelStyles}>
              Opción 1 (no seleccionada)
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Checkbox
              checked={checked2}
              onChange={setChecked2}
              id="checkbox-2"
            />
            <label htmlFor="checkbox-2" style={labelStyles}>
              Opción 2 (seleccionada)
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Checkbox
              checked={checked3}
              onChange={setChecked3}
              id="checkbox-3"
            />
            <label htmlFor="checkbox-3" style={labelStyles}>
              Opción 3
            </label>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Checkbox Deshabilitado"
        description="Estados disabled con opacidad reducida"
      >
        <div style={checkboxContainerStyles}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Checkbox
              checked={false}
              onChange={() => {}}
              disabled={true}
              id="checkbox-disabled-1"
            />
            <label htmlFor="checkbox-disabled-1" style={disabledLabelStyles}>
              Checkbox deshabilitado (no seleccionado)
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Checkbox
              checked={true}
              onChange={() => {}}
              disabled={true}
              id="checkbox-disabled-2"
            />
            <label htmlFor="checkbox-disabled-2" style={disabledLabelStyles}>
              Checkbox deshabilitado (seleccionado)
            </label>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Caso de Uso: Lista de Opciones"
        description="Ejemplo de múltiples checkboxes en un formulario"
      >
        <div style={{
          padding: '24px',
          background: LIGHT.base,
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          maxWidth: '400px',
          transition: 'box-shadow 50ms linear',
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '20px',
            color: '#2D3436',
            fontFamily: 'var(--sentinel-font-display)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Selecciona tus intereses:
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {['Deportes', 'Tecnología', 'Música', 'Arte', 'Viajes'].map((interest, index) => {
              const [checked, setChecked] = useState(false);
              return (
                <div key={interest} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  background: LIGHT.base,
                  borderRadius: '15px',
                  boxShadow: checked ? getNeuInsetShadow(3, 8) : getNeuPanelShadow(4, 12),
                  transition: 'box-shadow 150ms ease',
                }}>
                  <Checkbox
                    checked={checked}
                    onChange={setChecked}
                    id={`interest-${index}`}
                  />
                  <label htmlFor={`interest-${index}`} style={labelStyles}>
                    {interest}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: LIGHT.base,
          fontSize: '12px',
          fontFamily: 'var(--sentinel-font-mono)',
          color: '#636E72',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Tamaño:</strong> 20x20px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Border radius:</strong> 6px (redondeado)</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Sombra unchecked:</strong> Elevado neumórfico</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Sombra checked:</strong> Inset neumórfico</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Accent color:</strong> var(--sentinel-accent-primary)</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function CheckboxShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <CheckboxContent />
    </LightEngineProvider>
  );
}
