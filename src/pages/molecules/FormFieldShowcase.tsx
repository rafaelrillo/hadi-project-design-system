// Path: src/pages/molecules/FormFieldShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Form Fields
import React, { useState, useMemo } from 'react';
import { FormField } from '../../components/molecules/FormField';
import { InputText, Textarea, InputDropdown, DropdownOption } from '../../components/atoms/Input';
import { Checkbox } from '../../components/atoms/Checkbox';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function FormFieldContent() {
  const { lightAngle } = useLightEngine();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [country, setCountry] = useState('');
  const [terms, setTerms] = useState(false);

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const MARBLE = {
    base: '#d5d8dc',
    shadowDark: '#a8acb3',
    shadowLight: '#ffffff',
  };

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}, ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px ${MARBLE.shadowDark}, inset ${-x * distance}px ${-y * distance}px ${blur}px ${MARBLE.shadowLight}`;
  };

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: MARBLE.base,
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

  const formContainerStyles: React.CSSProperties = {
    maxWidth: '400px',
    width: '100%',
    padding: '24px',
    background: MARBLE.base,
    borderRadius: '15px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  const countryOptions: DropdownOption[] = [
    { value: 'ar', label: 'Argentina' },
    { value: 'br', label: 'Brasil' },
    { value: 'cl', label: 'Chile' },
    { value: 'co', label: 'Colombia' },
    { value: 'mx', label: 'México' }
  ];

  return (
    <div style={{ background: MARBLE.base, minHeight: '100%', padding: '24px' }}>
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; FormField_</h1>
        <p style={descStyles}>// Contenedor para campos con label, helper text y errores</p>
      </header>

      <ShowcaseSection
        title="FormField Básico"
        description="Campo de formulario con label y campo de texto"
      >
        <div style={formContainerStyles}>
          <FormField label="Nombre completo" htmlFor="name-input">
            <InputText
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Juan Pérez"
            />
          </FormField>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Helper Text"
        description="Campo con texto de ayuda debajo del input"
      >
        <div style={formContainerStyles}>
          <FormField
            label="Correo electrónico"
            htmlFor="email-input"
            helperText="Usaremos este correo para contactarte"
          >
            <InputText
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </FormField>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Mensaje de Error"
        description="Campo que muestra un mensaje de error"
      >
        <div style={formContainerStyles}>
          <FormField
            label="Correo electrónico"
            htmlFor="email-error"
            errorMessage="Por favor ingresa un correo válido"
          >
            <InputText
              type="email"
              error={true}
              placeholder="correo@ejemplo.com"
            />
          </FormField>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Campo Requerido"
        description="Campo marcado como requerido con asterisco"
      >
        <div style={formContainerStyles}>
          <FormField
            label="Nombre completo"
            htmlFor="name-required"
            required={true}
            helperText="Este campo es obligatorio"
          >
            <InputText placeholder="Juan Pérez" />
          </FormField>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Textarea"
        description="FormField con campo de texto multilínea"
      >
        <div style={{ ...formContainerStyles, maxWidth: '500px' }}>
          <FormField
            label="Mensaje"
            htmlFor="message-input"
            helperText="Máximo 500 caracteres"
          >
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              maxLength={500}
            />
          </FormField>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Formulario Completo"
        description="Ejemplo de múltiples FormFields en un formulario"
      >
        <div style={{
          maxWidth: '500px',
          width: '100%',
          padding: '24px',
          background: MARBLE.base,
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          transition: 'box-shadow 50ms linear',
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            margin: 0,
            color: 'var(--sentinel-text-primary)',
            fontFamily: 'var(--sentinel-font-display)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Formulario de Contacto
          </h3>

          <FormField label="Nombre completo" required={true} htmlFor="form-name">
            <InputText placeholder="Juan Pérez" />
          </FormField>

          <FormField label="Correo electrónico" required={true} htmlFor="form-email" helperText="Nunca compartiremos tu correo">
            <InputText type="email" placeholder="correo@ejemplo.com" />
          </FormField>

          <FormField label="País" required={true} htmlFor="form-country">
            <InputDropdown
              options={countryOptions}
              value={country}
              onChange={setCountry}
              placeholder="Selecciona un país"
            />
          </FormField>

          <FormField label="Mensaje" htmlFor="form-message" helperText="Cuéntanos cómo podemos ayudarte">
            <Textarea placeholder="Tu mensaje..." maxLength={500} />
          </FormField>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            background: MARBLE.base,
            borderRadius: '15px',
            boxShadow: terms ? getNeuInsetShadow(3, 8) : getNeuPanelShadow(4, 12),
            transition: 'box-shadow 150ms ease',
          }}>
            <Checkbox checked={terms} onChange={setTerms} id="terms-checkbox" />
            <label htmlFor="terms-checkbox" style={{ fontSize: '14px', cursor: 'pointer', color: 'var(--sentinel-text-primary)', fontFamily: 'var(--sentinel-font-mono)' }}>
              Acepto los términos y condiciones
            </label>
          </div>

          <div style={{ marginTop: '8px', display: 'flex', gap: '12px' }}>
            <button style={{
              padding: '12px 24px',
              background: MARBLE.base,
              border: 'none',
              borderRadius: '15px',
              boxShadow: getNeuPanelShadow(6, 18),
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--sentinel-accent-primary)',
              fontFamily: 'var(--sentinel-font-mono)',
              transition: 'box-shadow 150ms ease',
            }}>
              Enviar
            </button>
            <button style={{
              padding: '12px 24px',
              background: MARBLE.base,
              border: 'none',
              borderRadius: '15px',
              boxShadow: getNeuPanelShadow(4, 12),
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              color: '#636E72',
              fontFamily: 'var(--sentinel-font-mono)',
              transition: 'box-shadow 150ms ease',
            }}>
              Cancelar
            </button>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{
          padding: '20px',
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: MARBLE.base,
          fontSize: '12px',
          fontFamily: 'var(--sentinel-font-mono)',
          color: '#636E72',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Display:</strong> flex, flex-direction column</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Gap:</strong> 8px entre elementos</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Label:</strong> 12px, color #252528</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Required:</strong> asterisco color var(--sentinel-status-negative)</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Helper/Error:</strong> 11px, color #636E72 / negative</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function FormFieldShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <FormFieldContent />
    </LightEngineProvider>
  );
}
