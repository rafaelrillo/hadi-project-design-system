// Path: src/pages/atoms/InputShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Inputs
import React, { useState, useMemo } from 'react';
import { InputText, InputDropdown, Textarea, DropdownOption } from '../../components/atoms/Input';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function InputContent() {
  const { lightAngle } = useLightEngine();
  const [textValue, setTextValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

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

  const inputContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    maxWidth: '400px',
    padding: '24px',
    background: LIGHT.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  const dropdownOptions: DropdownOption[] = [
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3' },
    { value: 'option4', label: 'Opción 4' }
  ];

  return (
    <div style={{ background: LIGHT.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Input_</h1>
        <p style={descStyles}>// Componentes de entrada de datos</p>
      </header>

      <ShowcaseSection
        title="Input Text"
        description="Campo de texto básico con soporte para diferentes tipos"
      >
        <div style={inputContainerStyles}>
          <InputText
            placeholder="Nombre completo"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <InputText
            type="email"
            placeholder="correo@ejemplo.com"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <InputText
            type="password"
            placeholder="Contraseña"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estados del Input"
        description="Input con estados error y disabled"
      >
        <div style={inputContainerStyles}>
          <div>
            <div style={{ fontSize: '12px', marginBottom: '8px', color: 'var(--sentinel-status-negative)', fontFamily: 'var(--sentinel-font-mono)', textTransform: 'uppercase' }}>
              Campo con error
            </div>
            <InputText
              placeholder="Campo requerido"
              value={errorValue}
              onChange={(e) => setErrorValue(e.target.value)}
              error={true}
            />
          </div>
          <div>
            <div style={{ fontSize: '12px', marginBottom: '8px', color: '#636E72', fontFamily: 'var(--sentinel-font-mono)', textTransform: 'uppercase' }}>
              Campo deshabilitado
            </div>
            <InputText
              placeholder="Campo deshabilitado"
              value="No editable"
              disabled={true}
            />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Input Dropdown"
        description="Selector con opciones y navegación por teclado"
      >
        <div style={inputContainerStyles}>
          <InputDropdown
            options={dropdownOptions}
            placeholder="Seleccionar una opción"
            value={dropdownValue}
            onChange={setDropdownValue}
          />
          <InputDropdown
            options={dropdownOptions}
            placeholder="Dropdown deshabilitado"
            disabled={true}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Textarea"
        description="Campo de texto multilínea con contador opcional"
      >
        <div style={{
          ...inputContainerStyles,
          maxWidth: '500px',
        }}>
          <Textarea
            placeholder="Escribe tu mensaje aquí..."
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
          <Textarea
            placeholder="Máximo 200 caracteres"
            maxLength={200}
          />
          <Textarea
            placeholder="Textarea deshabilitado"
            value="No editable"
            disabled={true}
          />
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
          <p><strong style={{ color: 'var(--sentinel-accent-primary)' }}>InputText & InputDropdown:</strong></p>
          <p>✓ <strong>Altura:</strong> 40px</p>
          <p>✓ <strong>Padding:</strong> 8px 12px</p>
          <p>✓ <strong>Border radius:</strong> 15px (neumórfico)</p>
          <p>✓ <strong>Background:</strong> var(--neu-base)</p>
          <p>✓ <strong>Sombra inset:</strong> Para efecto cavado</p>
          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--sentinel-accent-primary)' }}>Textarea:</strong></p>
          <p>✓ <strong>Min-height:</strong> 80px</p>
          <p>✓ <strong>Contador:</strong> 12px, color #9BA4B0</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function InputShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <InputContent />
    </LightEngineProvider>
  );
}
