// Path: src/pages/molecules/FormFieldShowcase.tsx
// Terminal Theme Version
import React, { useState } from 'react';
import { FormField } from '../../components/molecules/FormField';
import { InputText, Textarea, InputDropdown, DropdownOption } from '../../components/atoms/Input';
import { Checkbox } from '../../components/atoms/Checkbox';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function FormFieldShowcase() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [country, setCountry] = useState('');
  const [terms, setTerms] = useState(false);

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

  const countryOptions: DropdownOption[] = [
    { value: 'ar', label: 'Argentina' },
    { value: 'br', label: 'Brasil' },
    { value: 'cl', label: 'Chile' },
    { value: 'co', label: 'Colombia' },
    { value: 'mx', label: 'México' }
  ];

  return (
    <div>
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; FormField_</h1>
        <p style={descStyles}>
          // Contenedor para campos de formulario con label, helper text y mensajes de error
        </p>
      </header>

      {/* Basic FormField */}
      <ShowcaseSection
        title="FormField Básico"
        description="Campo de formulario con label y campo de texto"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <FormField label="Nombre completo" htmlFor="name-input">
              <InputText
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan Pérez"
              />
            </FormField>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Helper Text */}
      <ShowcaseSection
        title="Con Helper Text"
        description="Campo con texto de ayuda debajo del input"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '400px', width: '100%' }}>
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
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Error */}
      <ShowcaseSection
        title="Con Mensaje de Error"
        description="Campo que muestra un mensaje de error. El error reemplaza al helper text"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '400px', width: '100%' }}>
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
        </ComponentPreview>
      </ShowcaseSection>

      {/* Required Field */}
      <ShowcaseSection
        title="Campo Requerido"
        description="Campo marcado como requerido con asterisco (*) rojo"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <FormField
              label="Nombre completo"
              htmlFor="name-required"
              required={true}
              helperText="Este campo es obligatorio"
            >
              <InputText placeholder="Juan Pérez" />
            </FormField>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Textarea */}
      <ShowcaseSection
        title="Con Textarea"
        description="FormField con campo de texto multilínea"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '500px', width: '100%' }}>
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
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Dropdown */}
      <ShowcaseSection
        title="Con Dropdown"
        description="FormField con selector de opciones"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <FormField
              label="País"
              htmlFor="country-select"
              required={true}
              helperText="Selecciona tu país de residencia"
            >
              <InputDropdown
                options={countryOptions}
                value={country}
                onChange={setCountry}
                placeholder="Selecciona un país"
              />
            </FormField>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Checkbox */}
      <ShowcaseSection
        title="Con Checkbox"
        description="FormField con checkbox para términos y condiciones"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <FormField label="" htmlFor="terms-checkbox">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Checkbox
                  checked={terms}
                  onChange={setTerms}
                  id="terms-checkbox"
                />
                <label htmlFor="terms-checkbox" style={{ fontSize: '14px', cursor: 'pointer', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
                  Acepto los términos y condiciones *
                </label>
              </div>
            </FormField>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Complete Form */}
      <ShowcaseSection
        title="Formulario Completo"
        description="Ejemplo de múltiples FormFields en un formulario"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '500px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px', backgroundColor: 'var(--background-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0, marginBottom: '8px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Formulario de Contacto</h3>

            <FormField label="Nombre completo" required={true} htmlFor="form-name">
              <InputText placeholder="Juan Pérez" />
            </FormField>

            <FormField label="Correo electrónico" required={true} htmlFor="form-email" helperText="Nunca compartiremos tu correo">
              <InputText type="email" placeholder="correo@ejemplo.com" />
            </FormField>

            <FormField label="País" required={true} htmlFor="form-country">
              <InputDropdown
                options={countryOptions}
                placeholder="Selecciona un país"
              />
            </FormField>

            <FormField label="Mensaje" htmlFor="form-message" helperText="Cuéntanos cómo podemos ayudarte">
              <Textarea placeholder="Tu mensaje..." maxLength={500} />
            </FormField>

            <div style={{ marginTop: '8px', display: 'flex', gap: '12px' }}>
              <button style={{ padding: '10px 20px', backgroundColor: 'var(--primary)', color: 'var(--background)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                Enviar
              </button>
              <button style={{ padding: '10px 20px', backgroundColor: 'transparent', color: 'var(--primary)', border: '1px solid var(--primary)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                Cancelar
              </button>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Display:</strong> flex, flex-direction column</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Gap:</strong> 5px entre label, input y helper/error</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Width:</strong> 100% (se adapta al contenedor)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Label:</strong> 12px Regular (400)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Required asterisco:</strong> color var(--destructive)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Helper text:</strong> 12px Regular (400)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Error message:</strong> 12px Regular (400), color var(--destructive)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Prioridad:</strong> Error message oculta helper text cuando ambos están presentes</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
