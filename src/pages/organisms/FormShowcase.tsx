// Path: src/pages/organisms/FormShowcase.tsx
// SENTINEL Design System
import React, { useState } from 'react';
import { Form } from '../../components/organisms/Form';
import { FormField } from '../../components/molecules/FormField';
import { InputText, InputDropdown, Textarea, DropdownOption } from '../../components/atoms/Input';
import { Checkbox } from '../../components/atoms/Checkbox';
import { Button } from '../../components/atoms/Button';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function FormShowcase() {
  const [terms, setTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

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
        <h1 style={titleStyles}>&gt; Form_</h1>
        <p style={descStyles}>
          // Contenedor de formulario con layout en 1 o 2 columnas
        </p>
      </header>

      {/* Single Column Form */}
      <ShowcaseSection
        title="Formulario de 1 Columna"
        description="Layout vertical con gap de 20px entre campos"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '500px', width: '100%' }}>
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
        </ComponentPreview>
      </ShowcaseSection>

      {/* Two Column Form */}
      <ShowcaseSection
        title="Formulario de 2 Columnas"
        description="Layout en grid con 2 columnas, gap de 20px"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '800px', width: '100%' }}>
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
        </ComponentPreview>
      </ShowcaseSection>

      {/* Without Footer */}
      <ShowcaseSection
        title="Sin Footer"
        description="Formulario sin botones en el footer"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '500px', width: '100%' }}>
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
        </ComponentPreview>
      </ShowcaseSection>

      {/* Complex Form */}
      <ShowcaseSection
        title="Formulario Completo de Registro"
        description="Ejemplo de formulario complejo con múltiples tipos de campos"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '800px', width: '100%', padding: '24px', backgroundColor: 'var(--background-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--foreground)' }}>Crear Nueva Cuenta</h2>
            <p style={{ fontSize: '14px', color: 'var(--foreground-muted)', marginBottom: '24px', fontFamily: 'var(--font-mono)' }}>
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
                      <label htmlFor="terms" style={{ fontSize: '14px', cursor: 'pointer', fontFamily: 'var(--font-mono)', color: 'var(--foreground)' }}>
                        Acepto los términos y condiciones *
                      </label>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Checkbox checked={newsletter} onChange={setNewsletter} id="newsletter" />
                      <label htmlFor="newsletter" style={{ fontSize: '14px', cursor: 'pointer', fontFamily: 'var(--font-mono)', color: 'var(--foreground)' }}>
                        Quiero recibir novedades por email
                      </label>
                    </div>
                  </div>
                </FormField>
              </div>
            </Form>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Width:</strong> 100% (se adapta al contenedor)</p>
          <p>✓ <strong>Layout:</strong> CSS Grid</p>
          <p>✓ <strong>Columns:</strong> 1 o 2 (prop columns)</p>
          <p>✓ <strong>Gap:</strong> 20px entre campos</p>
          <p>✓ <strong>Footer margin-top:</strong> 20px</p>
          <p>✓ <strong>Footer layout:</strong> flex, gap 20px, justify-content flex-end</p>
          <p>✓ <strong>onSubmit:</strong> Automáticamente ejecuta e.preventDefault()</p>
          <p>✓ <strong>Submit button:</strong> Debe tener type="submit" para activar onSubmit</p>
          <p>✓ <strong>Campos full-width:</strong> Usar style gridColumn: '1 / -1' en el campo</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
