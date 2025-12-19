// Path: src/pages/molecules/NotificationCardShowcase.tsx
// Terminal Theme Version
import React, { useState } from 'react';
import { NotificationCard } from '../../components/molecules/NotificationCard';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';

export function NotificationCardShowcase() {
  const [showSuccess, setShowSuccess] = useState(true);
  const [showError, setShowError] = useState(true);
  const [showWarning, setShowWarning] = useState(true);
  const [showInfo, setShowInfo] = useState(true);

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
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; NotificationCard_</h1>
        <p style={descStyles}>
          // Tarjeta de notificación con variantes success, error, warning, info
        </p>
      </header>

      <ShowcaseSection
        title="Success Notification"
        description="Background #CEE6C6, border-left #0B7329, ícono CheckCircle"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <NotificationCard
              variant="success"
              title="Operación exitosa"
              message="Los cambios se guardaron correctamente en el sistema."
              onClose={() => console.log('Cerrado')}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Error Notification"
        description="Background #FFD4D4, border-left #B50000, ícono AlertCircle"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <NotificationCard
              variant="error"
              title="Error en la operación"
              message="No se pudieron guardar los cambios. Por favor intenta nuevamente."
              onClose={() => console.log('Cerrado')}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Warning Notification"
        description="Background #FFFCE0, border-left #FAB400, ícono AlertCircle"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <NotificationCard
              variant="warning"
              title="Advertencia importante"
              message="Algunos campos requieren tu atención antes de continuar."
              onClose={() => console.log('Cerrado')}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Info Notification"
        description="Background #D4F7FF, border-left #006081, ícono Info"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <NotificationCard
              variant="info"
              title="Información"
              message="Hay una nueva actualización disponible. Te recomendamos instalarla."
              onClose={() => console.log('Cerrado')}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sin Ícono"
        description="Notificaciones sin ícono (showIcon={false})"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '500px', width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <NotificationCard
              variant="success"
              title="Cambios guardados"
              message="Todo listo."
              showIcon={false}
            />
            <NotificationCard
              variant="info"
              title="Recordatorio"
              message="Tienes 3 tareas pendientes para hoy."
              showIcon={false}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection
        title="Notificaciones Interactivas"
        description="Click en X para cerrar las notificaciones"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '500px', width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {showSuccess && (
              <NotificationCard
                variant="success"
                title="Archivo subido"
                message="El archivo se subió correctamente al servidor."
                onClose={() => setShowSuccess(false)}
              />
            )}
            {showError && (
              <NotificationCard
                variant="error"
                title="Error de conexión"
                message="No se pudo conectar con el servidor. Verifica tu conexión."
                onClose={() => setShowError(false)}
              />
            )}
            {showWarning && (
              <NotificationCard
                variant="warning"
                title="Espacio limitado"
                message="Solo te quedan 100MB de espacio disponible."
                onClose={() => setShowWarning(false)}
              />
            )}
            {showInfo && (
              <NotificationCard
                variant="info"
                title="Nueva función"
                message="Ahora puedes exportar tus datos en formato CSV."
                onClose={() => setShowInfo(false)}
              />
            )}
            {!showSuccess && !showError && !showWarning && !showInfo && (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--foreground-muted)', fontSize: '14px', border: '1px dashed var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)' }}>
                Todas las notificaciones fueron cerradas. Recarga para verlas nuevamente.
              </div>
            )}
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Padding:</strong> 15px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Border-left:</strong> 4px solid (color según variante)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Border-radius:</strong> var(--radius-sm)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Shadow:</strong> var(--shadow-sm)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Gap:</strong> 12px entre ícono y contenido</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Ícono:</strong> 20px, color según variante</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Título:</strong> 14px Semibold (600)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Mensaje:</strong> 12px Regular (400), line-height 1.4</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Botón cerrar:</strong> absolute top-right, X icon 16px</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
