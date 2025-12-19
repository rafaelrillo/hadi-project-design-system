// Path: src/pages/atoms/InputShowcase.tsx
// Terminal Theme Version
import React, { useState } from 'react';
import { InputText, InputDropdown, Textarea, DropdownOption } from '../../components/atoms/Input';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function InputShowcase() {
  const [textValue, setTextValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

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

  const dropdownOptions: DropdownOption[] = [
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3' },
    { value: 'option4', label: 'Opción 4' }
  ];

  return (
    <div>
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Input_</h1>
        <p style={descStyles}>
          // Componentes de entrada de datos
        </p>
      </header>

      {/* Input Text */}
      <ShowcaseSection
        title="Input Text"
        description="Campo de texto básico con soporte para diferentes tipos"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px' }}>
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
        </ComponentPreview>
      </ShowcaseSection>

      {/* Input States */}
      <ShowcaseSection
        title="Estados del Input"
        description="Input con estados error y disabled"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px' }}>
            <div>
              <div style={{ fontSize: '12px', marginBottom: '4px', color: 'var(--destructive)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Campo con error</div>
              <InputText
                placeholder="Campo requerido"
                value={errorValue}
                onChange={(e) => setErrorValue(e.target.value)}
                error={true}
              />
            </div>
            <div>
              <div style={{ fontSize: '12px', marginBottom: '4px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Campo deshabilitado</div>
              <InputText
                placeholder="Campo deshabilitado"
                value="No editable"
                disabled={true}
              />
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Input Dropdown */}
      <ShowcaseSection
        title="Input Dropdown"
        description="Selector con opciones y navegación por teclado"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px' }}>
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
        </ComponentPreview>
      </ShowcaseSection>

      {/* Textarea */}
      <ShowcaseSection
        title="Textarea"
        description="Campo de texto multilínea con contador opcional"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '500px' }}>
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
        </ComponentPreview>
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p><strong style={{ color: 'var(--primary)' }}>InputText & InputDropdown:</strong></p>
          <p>✓ <strong>Altura:</strong> 40px</p>
          <p>✓ <strong>Padding:</strong> 8px 12px</p>
          <p>✓ <strong>Border:</strong> 1px solid var(--border) | var(--primary) (focus)</p>
          <p>✓ <strong>Background:</strong> var(--background-secondary)</p>
          <p>✓ <strong>Glow en focus:</strong> var(--shadow-glow-sm)</p>
          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--primary)' }}>Textarea:</strong></p>
          <p>✓ <strong>Min-height:</strong> 80px</p>
          <p>✓ <strong>Contador:</strong> 12px, color var(--foreground-subtle)</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
