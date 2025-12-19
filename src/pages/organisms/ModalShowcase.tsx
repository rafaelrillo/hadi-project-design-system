// Path: src/pages/organisms/ModalShowcase.tsx
// Terminal Theme Version
import React, { useState } from 'react';
import { Modal } from '../../components/organisms/Modal';
import { Button } from '../../components/atoms/Button';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { FormField } from '../../components/molecules/FormField';
import { InputText, Textarea } from '../../components/atoms/Input';

export function ModalShowcase() {
  const [centerModal, setCenterModal] = useState(false);
  const [drawerModal, setDrawerModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [largeModal, setLargeModal] = useState(false);

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
        <h1 style={titleStyles}>&gt; Modal_</h1>
        <p style={descStyles}>
          // Modal con dos variantes (center y drawer), título, contenido, footer opcional
        </p>
      </header>

      {/* Center Modal */}
      <ShowcaseSection
        title="Modal Center (Default)"
        description="Modal centrado con overlay rgba(0,0,0,0.5), animación fadeIn y border-radius 10px"
      >
        <ComponentPreview>
          <Button variant="primary" onClick={() => setCenterModal(true)}>
            Abrir Modal Center
          </Button>

          <Modal
            isOpen={centerModal}
            onClose={() => setCenterModal(false)}
            title="Modal Centrado"
          >
            <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Este es un modal centrado en la pantalla. Puedes cerrarlo presionando la tecla Escape,
              haciendo click en el botón X, o haciendo click fuera del modal en el overlay.
            </p>
            <p style={{ fontSize: '14px', lineHeight: '1.6', marginTop: '16px' }}>
              El contenido puede ser cualquier componente React que necesites mostrar.
            </p>
          </Modal>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Drawer Modal */}
      <ShowcaseSection
        title="Modal Drawer"
        description="Modal tipo drawer desde la derecha, overlay rgba(0,0,0,0.25), animación slideInRight"
      >
        <ComponentPreview>
          <Button variant="primary" onClick={() => setDrawerModal(true)}>
            Abrir Drawer Modal
          </Button>

          <Modal
            isOpen={drawerModal}
            onClose={() => setDrawerModal(false)}
            title="Drawer Modal"
            variant="drawer"
          >
            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Panel Lateral</h3>
              <p>
                El drawer modal ocupa el 50% de la pantalla (máx 960px) y se desliza desde la derecha.
                Perfecto para formularios extensos o paneles de configuración.
              </p>
              <div style={{ marginTop: '20px', padding: '16px', backgroundColor: 'var(--background-tertiary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Características:</h4>
                <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                  <li>Altura completa (100vh)</li>
                  <li>Ancho 50% (máx 960px)</li>
                  <li>Animación slideInRight</li>
                  <li>Overlay más sutil (25% opacidad)</li>
                </ul>
              </div>
            </div>
          </Modal>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Footer */}
      <ShowcaseSection
        title="Modal con Footer"
        description="Modal con botones de acción en el footer"
      >
        <ComponentPreview>
          <Button variant="primary" onClick={() => setFormModal(true)}>
            Abrir Modal con Footer
          </Button>

          <Modal
            isOpen={formModal}
            onClose={() => setFormModal(false)}
            title="Formulario de Usuario"
            footer={
              <>
                <Button variant="secondary" onClick={() => setFormModal(false)}>
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    alert('Usuario guardado');
                    setFormModal(false);
                  }}
                >
                  Guardar
                </Button>
              </>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <FormField label="Nombre completo" required={true}>
                <InputText placeholder="Juan Pérez" />
              </FormField>
              <FormField label="Correo electrónico" required={true}>
                <InputText type="email" placeholder="correo@ejemplo.com" />
              </FormField>
              <FormField label="Biografía">
                <Textarea placeholder="Cuéntanos sobre ti..." maxLength={200} />
              </FormField>
            </div>
          </Modal>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Confirmation Dialog */}
      <ShowcaseSection
        title="Modal de Confirmación"
        description="Ejemplo de modal para confirmar acciones destructivas"
      >
        <ComponentPreview>
          <Button variant="destructive" onClick={() => setConfirmModal(true)}>
            Eliminar Item
          </Button>

          <Modal
            isOpen={confirmModal}
            onClose={() => setConfirmModal(false)}
            title="Confirmar Eliminación"
            maxWidth="500px"
            footer={
              <>
                <Button variant="secondary" onClick={() => setConfirmModal(false)}>
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    alert('Item eliminado');
                    setConfirmModal(false);
                  }}
                >
                  Sí, Eliminar
                </Button>
              </>
            }
          >
            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 16px 0' }}>
                ¿Estás seguro que deseas eliminar este elemento?
              </p>
              <div style={{ padding: '12px', backgroundColor: 'var(--background-tertiary)', borderLeft: '4px solid var(--destructive)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <strong>Advertencia:</strong> Esta acción no se puede deshacer.
              </div>
            </div>
          </Modal>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Large Content Modal */}
      <ShowcaseSection
        title="Modal con Contenido Extenso"
        description="Modal con scroll interno cuando el contenido excede max-height 90vh"
      >
        <ComponentPreview>
          <Button variant="primary" onClick={() => setLargeModal(true)}>
            Abrir Modal Grande
          </Button>

          <Modal
            isOpen={largeModal}
            onClose={() => setLargeModal(false)}
            title="Términos y Condiciones"
            maxWidth="800px"
            footer={
              <>
                <Button variant="secondary" onClick={() => setLargeModal(false)}>
                  Rechazar
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    alert('Términos aceptados');
                    setLargeModal(false);
                  }}
                >
                  Aceptar
                </Button>
              </>
            }
          >
            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>1. Introducción</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>

              <h3 style={{ fontSize: '16px', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>2. Uso del Servicio</h3>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...</p>

              <h3 style={{ fontSize: '16px', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>3. Privacidad</h3>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...</p>

              <h3 style={{ fontSize: '16px', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>4. Limitación de Responsabilidad</h3>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...</p>

              <h3 style={{ fontSize: '16px', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>5. Modificaciones</h3>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...</p>

              <p style={{ marginTop: '24px', padding: '12px', backgroundColor: 'var(--background-tertiary)', borderLeft: '4px solid var(--primary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)' }}>
                El contenido del modal tiene scroll automático cuando excede el max-height de 90vh.
              </p>
            </div>
          </Modal>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p><strong style={{ color: 'var(--primary)' }}>Variante Center:</strong></p>
          <p>✓ <strong>Max-width:</strong> 600px (default), customizable</p>
          <p>✓ <strong>Width:</strong> 90% de viewport</p>
          <p>✓ <strong>Max-height:</strong> 90vh</p>
          <p>✓ <strong>Border-radius:</strong> 10px</p>
          <p>✓ <strong>Overlay:</strong> rgba(0,0,0,0.5)</p>
          <p>✓ <strong>Animation:</strong> fadeIn 200ms</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--primary)' }}>Variante Drawer:</strong></p>
          <p>✓ <strong>Width:</strong> 50%, max 960px</p>
          <p>✓ <strong>Height:</strong> 100vh</p>
          <p>✓ <strong>Position:</strong> flex-end (derecha)</p>
          <p>✓ <strong>Overlay:</strong> rgba(0,0,0,0.25)</p>
          <p>✓ <strong>Animation:</strong> slideInRight 200ms</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--primary)' }}>Estructura:</strong></p>
          <p>✓ <strong>Header:</strong> padding 10px 20px, border-bottom 2px solid #006081</p>
          <p>✓ <strong>Title:</strong> 18px Semibold (600)</p>
          <p>✓ <strong>Close button:</strong> X icon 16px, hover color #006081</p>
          <p>✓ <strong>Body:</strong> padding 20px, overflow-y auto</p>
          <p>✓ <strong>Footer:</strong> padding 0 20px 20px, gap 20px, justify-end</p>
          <p>✓ <strong>z-index:</strong> 1000</p>

          <p style={{ marginTop: '16px' }}><strong style={{ color: 'var(--primary)' }}>Interacciones:</strong></p>
          <p>✓ Click en overlay cierra el modal</p>
          <p>✓ Tecla Escape cierra el modal</p>
          <p>✓ Bloquea scroll del body cuando está abierto</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
