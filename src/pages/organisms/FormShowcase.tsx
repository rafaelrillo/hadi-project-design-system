// Path: src/pages/organisms/FormShowcase.tsx
// SENTINEL Design System - Glass-Neumorphism Forms
import React, { useState, useMemo } from 'react';
import { Form } from '../../components/organisms/Form';
import { FormField } from '../../components/molecules/FormField';
import { InputText, InputDropdown, Textarea, DropdownOption } from '../../components/atoms/Input';
import { Checkbox } from '../../components/atoms/Checkbox';
import { Button } from '../../components/atoms/Button';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';

function FormContent() {
  const { lightAngle } = useLightEngine();
  const [terms, setTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

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
        <h1 style={titleStyles}>&gt; Form_</h1>
        <p style={descStyles}>
          // Contenedor de formulario con layout en 1 o 2 columnas
        </p>
      </header>

      <ShowcaseSection
        title="Formulario de 1 Columna"
        description="Layout vertical con gap de 20px entre campos"
      >
        <div style={{ ...formContainerStyles, maxWidth: '500px' }}>
          <Form
            columns={1}
            onSubmit={() => {
              console.log('Form submitted');
              alert('Formulario enviado!');
            }}
            footer={
              <>
                <Button variant="secondary">Cancelar</Button>
                <Button variant="primary" type="submit">Guardar</Button>
              </>
            }
          >
            <FormField label="Nombre completo" required={true}>
              <InputText placeholder="Juan Pérez" />
            </FormField>

            <FormField label="Correo electrónico" required={true} helperText="Nunca compartiremos tu correo">
              <InputText type="email" placeholder="correo@ejemplo.com" />
            </FormField>

            <FormField label="Teléfono">
              <InputText type="tel" placeholder="+54 11 1234-5678" />
            </FormField>

            <FormField label="Mensaje">
              <Textarea placeholder="Escribe tu mensaje aquí..." maxLength={500} />
            </FormField>
          </Form>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Formulario de 2 Columnas"
        description="Layout en grid con 2 columnas, gap de 20px"
      >
        <div style={{ ...formContainerStyles, maxWidth: '800px' }}>
          <Form
            columns={2}
            onSubmit={() => {
              console.log('Form submitted');
              alert('Registro completado!');
            }}
            footer={
              <>
                <Button variant="secondary">Limpiar</Button>
                <Button variant="primary" type="submit">Registrar</Button>
              </>
            }
          >
            <FormField label="Nombre" required={true}>
              <InputText placeholder="Juan" />
            </FormField>

            <FormField label="Apellido" required={true}>
              <InputText placeholder="Pérez" />
            </FormField>

            <FormField label="Email" required={true}>
              <InputText type="email" placeholder="juan@ejemplo.com" />
            </FormField>

            <FormField label="Teléfono">
              <InputText type="tel" placeholder="+54 11 1234-5678" />
            </FormField>

            <FormField label="País" required={true}>
              <InputDropdown options={countryOptions} placeholder="Selecciona tu país" />
            </FormField>

            <FormField label="Ciudad">
              <InputText placeholder="Buenos Aires" />
            </FormField>
          </Form>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sin Footer"
        description="Formulario sin botones en el footer"
      >
        <div style={{ ...formContainerStyles, maxWidth: '500px' }}>
          <Form
            columns={1}
            onSubmit={() => {
              console.log('Search submitted');
            }}
          >
            <FormField label="Buscar producto">
              <InputText placeholder="Nombre del producto..." />
            </FormField>

            <FormField label="Categoría">
              <InputDropdown
                options={[
                  { value: 'all', label: 'Todas' },
                  { value: 'electronics', label: 'Electrónica' },
                  { value: 'clothing', label: 'Ropa' }
                ]}
                placeholder="Selecciona categoría"
              />
            </FormField>

            <div>
              <Button variant="primary" type="submit">Buscar</Button>
            </div>
          </Form>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Formulario Completo de Registro"
        description="Ejemplo de formulario complejo con múltiples tipos de campos"
      >
        <div style={{
          maxWidth: '800px',
          width: '100%',
          padding: '24px',
          background: MARBLE.base,
          borderRadius: '15px',
          boxShadow: getNeuInsetShadow(5, 15),
          transition: 'box-shadow 50ms linear',
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '8px',
            fontFamily: 'var(--sentinel-font-display)',
            textTransform: 'uppercase',
            color: 'var(--sentinel-text-primary)',
          }}>
            Crear Nueva Cuenta
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#636E72',
            marginBottom: '24px',
            fontFamily: 'var(--sentinel-font-mono)',
          }}>
            Completa el formulario para registrarte en la plataforma
          </p>

          <Form
            columns={2}
            onSubmit={() => {
              if (!terms) {
                alert('Debes aceptar los términos y condiciones');
                return;
              }
              alert('¡Cuenta creada exitosamente!');
            }}
            footer={
              <>
                <Button variant="secondary">Cancelar</Button>
                <Button variant="primary" type="submit">Crear Cuenta</Button>
              </>
            }
          >
            <FormField label="Nombre" required={true}>
              <InputText placeholder="Tu nombre" />
            </FormField>

            <FormField label="Apellido" required={true}>
              <InputText placeholder="Tu apellido" />
            </FormField>

            <FormField label="Email" required={true} helperText="Usaremos este email para iniciar sesión">
              <InputText type="email" placeholder="correo@ejemplo.com" />
            </FormField>

            <FormField label="Confirmar Email" required={true}>
              <InputText type="email" placeholder="correo@ejemplo.com" />
            </FormField>

            <FormField label="Contraseña" required={true} helperText="Mínimo 8 caracteres">
              <InputText type="password" placeholder="••••••••" />
            </FormField>

            <FormField label="Confirmar Contraseña" required={true}>
              <InputText type="password" placeholder="••••••••" />
            </FormField>

            <FormField label="País" required={true}>
              <InputDropdown options={countryOptions} placeholder="Selecciona tu país" />
            </FormField>

            <FormField label="Teléfono">
              <InputText type="tel" placeholder="+54 11 1234-5678" />
            </FormField>

            <div style={{ gridColumn: '1 / -1' }}>
              <FormField label="Biografía (opcional)">
                <Textarea placeholder="Cuéntanos algo sobre ti..." maxLength={200} />
              </FormField>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <FormField label="">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Checkbox checked={terms} onChange={setTerms} id="terms" />
                    <label htmlFor="terms" style={{
                      fontSize: '14px',
                      cursor: 'pointer',
                      fontFamily: 'var(--sentinel-font-mono)',
                      color: 'var(--sentinel-text-primary)',
                    }}>
                      Acepto los términos y condiciones *
                    </label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Checkbox checked={newsletter} onChange={setNewsletter} id="newsletter" />
                    <label htmlFor="newsletter" style={{
                      fontSize: '14px',
                      cursor: 'pointer',
                      fontFamily: 'var(--sentinel-font-mono)',
                      color: 'var(--sentinel-text-primary)',
                    }}>
                      Quiero recibir novedades por email
                    </label>
                  </div>
                </div>
              </FormField>
            </div>
          </Form>
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
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Width:</strong> 100% (se adapta al contenedor)</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Layout:</strong> CSS Grid</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Columns:</strong> 1 o 2 (prop columns)</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Gap:</strong> 20px entre campos</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Footer margin-top:</strong> 20px</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Footer layout:</strong> flex, gap 20px, justify-content flex-end</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>onSubmit:</strong> Automáticamente ejecuta e.preventDefault()</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Submit button:</strong> Debe tener type="submit" para activar onSubmit</p>
          <p>✓ <strong style={{ color: 'var(--sentinel-accent-primary)' }}>Campos full-width:</strong> Usar style gridColumn: '1 / -1' en el campo</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function FormShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <FormContent />
    </LightEngineProvider>
  );
}
