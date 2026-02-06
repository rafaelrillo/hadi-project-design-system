// Path: src/pages/molecules/NotificationCardShowcase.tsx
// FING Design System - Glass-Neumorphism Notification Cards
import React, { useState, useMemo } from 'react';
import { NotificationCard } from '../../components/molecules/NotificationCard';
import { ShowcaseSection } from '../../components/showcase';
import { LightEngineProvider, useLightEngine } from '@/contexts/LightEngineContext';
import { showcase } from '../showcaseStyles';

function NotificationCardContent() {
  const { lightAngle } = useLightEngine();
  const [showSuccess, setShowSuccess] = useState(true);
  const [showError, setShowError] = useState(true);
  const [showWarning, setShowWarning] = useState(true);
  const [showInfo, setShowInfo] = useState(true);

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const getNeuPanelShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `${-x * distance}px ${-y * distance}px ${blur}px var(--shadow-light), ${x * distance}px ${y * distance}px ${blur}px var(--shadow-dark)`;
  };

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px var(--shadow-dark), inset ${-x * distance}px ${-y * distance}px ${blur}px var(--shadow-light)`;
  };

  const notifContainerStyles: React.CSSProperties = {
    maxWidth: '500px',
    width: '100%',
    padding: '20px',
    background: 'var(--marble-base)',
    borderRadius: '20px',
    boxShadow: getNeuPanelShadow(8, 24),
    transition: 'box-shadow 50ms linear',
  };

  return (
    <div style={{ background: 'var(--marble-base)', minHeight: '100%', padding: '24px' }}>
      <header style={showcase.header.container}>
        <h1 style={showcase.header.title}>&gt; NotificationCard_</h1>
        <p style={showcase.header.description}>// Tarjeta de notificacion con variantes semanticas</p>
      </header>

      <ShowcaseSection
        title="Success Notification"
        description="Para estados exitosos o completados"
      >
        <div style={notifContainerStyles}>
          <NotificationCard
            variant="success"
            title="Operación exitosa"
            message="Los cambios se guardaron correctamente en el sistema."
            onClose={() => console.log('Cerrado')}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Error Notification"
        description="Para estados de error o fallas"
      >
        <div style={notifContainerStyles}>
          <NotificationCard
            variant="error"
            title="Error en la operación"
            message="No se pudieron guardar los cambios. Por favor intenta nuevamente."
            onClose={() => console.log('Cerrado')}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Warning Notification"
        description="Para advertencias o atención requerida"
      >
        <div style={notifContainerStyles}>
          <NotificationCard
            variant="warning"
            title="Advertencia importante"
            message="Algunos campos requieren tu atención antes de continuar."
            onClose={() => console.log('Cerrado')}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Info Notification"
        description="Para información general"
      >
        <div style={notifContainerStyles}>
          <NotificationCard
            variant="info"
            title="Información"
            message="Hay una nueva actualización disponible. Te recomendamos instalarla."
            onClose={() => console.log('Cerrado')}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sin Ícono"
        description="Notificaciones minimalistas sin ícono"
      >
        <div style={{ ...notifContainerStyles, display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
      </ShowcaseSection>

      <ShowcaseSection
        title="Notificaciones Interactivas"
        description="Click en X para cerrar las notificaciones"
      >
        <div style={{
          maxWidth: '500px',
          width: '100%',
          padding: '20px',
          background: 'var(--marble-base)',
          borderRadius: '20px',
          boxShadow: getNeuInsetShadow(5, 15),
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          transition: 'box-shadow 50ms linear',
        }}>
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
            <div style={{
              padding: '20px',
              textAlign: 'center',
              color: 'var(--fing-text-muted)',
              fontSize: '14px',
              background: 'var(--marble-base)',
              borderRadius: '20px',
              boxShadow: getNeuPanelShadow(4, 12),
              fontFamily: 'var(--fing-font-mono)',
            }}>
              Todas las notificaciones fueron cerradas.
            </div>
          )}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Tecnicas">
        <div style={{
          padding: '20px',
          borderRadius: '20px',
          boxShadow: getNeuInsetShadow(5, 15),
          background: 'var(--marble-base)',
          fontSize: '12px',
          fontFamily: 'var(--fing-font-mono)',
          color: 'var(--fing-text-muted)',
          lineHeight: '1.8',
          transition: 'box-shadow 50ms linear',
        }}>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Padding:</strong> 15px</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Border-left:</strong> 4px solid (color según variante)</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Border-radius:</strong> 15px</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Gap:</strong> 12px entre ícono y contenido</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Ícono:</strong> 20px, color según variante</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Título:</strong> 14px Semibold</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Mensaje:</strong> 12px Regular</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function NotificationCardShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <NotificationCardContent />
    </LightEngineProvider>
  );
}
