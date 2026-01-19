// Path: src/pages/organisms/ToastShowcase.tsx
// FING Design System - Glass-Neumorphism Toasts
import { ToastProvider, useToast } from '../../components/organisms/Toast';
import { ShowcaseSection } from '../../components/showcase';
import { Button } from '../../components/atoms/Button';
import { CheckCircle, AlertCircle, AlertTriangle, Info, Wifi, Download, Mail, Trash2, Sparkles } from 'lucide-react';
import { LightEngineProvider } from '@/contexts/LightEngineContext';

// Glass toast demo component
function GlassToastDemo() {
  const { success, error, warning, info } = useToast();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      <Button
        variant="glass"
        icon={<Sparkles size={16} />}
        onClick={() => success('Success glass toast', { description: 'Con sombras dinámicas' })}
      >
        Success Glass
      </Button>
      <Button
        variant="glass"
        icon={<AlertCircle size={16} />}
        onClick={() => error('Error glass toast', { description: 'Colores semánticos' })}
      >
        Error Glass
      </Button>
      <Button
        variant="glass"
        icon={<AlertTriangle size={16} />}
        onClick={() => warning('Warning glass toast', { description: 'Estilo glassmorphism' })}
      >
        Warning Glass
      </Button>
      <Button
        variant="glass"
        icon={<Info size={16} />}
        onClick={() => info('Info glass toast', { description: 'Light Engine integrado' })}
      >
        Info Glass
      </Button>
    </div>
  );
}

// Inner component that uses toast hook
function ToastDemoContent() {
  const { toast, success, error, warning, info, dismissAll } = useToast();

  const pageHeaderStyles: React.CSSProperties = {
    marginBottom: '32px',
    padding: '24px',
    background: 'var(--neu-base)',
    borderRadius: '15px',
    boxShadow: '-20px -20px 60px var(--neu-shadow-light), 20px 20px 60px var(--neu-shadow-dark)',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--fing-accent-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--fing-font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  };

  const descStyles: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--fing-text-secondary)',
    fontFamily: 'var(--fing-font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  };

  const specTextStyles: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--fing-text-secondary)',
    lineHeight: '1.8',
    fontFamily: 'var(--fing-font-mono)',
  };

  const codeBlockStyles: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--fing-text-secondary)',
    lineHeight: '1.6',
    fontFamily: 'var(--fing-font-mono)',
    backgroundColor: 'var(--neu-base)',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid rgba(0,0,0,0.05)',
    boxShadow: 'inset 3px 3px 8px var(--neu-shadow-dark), inset -3px -3px 8px var(--neu-shadow-light)',
  };

  return (
    <div style={{ background: 'var(--neu-base)', minHeight: '100%', padding: '24px' }}>
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Toast_</h1>
        <p style={descStyles}>
          // Sistema de notificaciones toast con múltiples tipos, posiciones y acciones
        </p>
      </header>

      {/* Basic Toast Types */}
      <ShowcaseSection
        title="Tipos de Toast"
        description="Success, error, warning, info y default"
      >
        <div>
          <Button
            onClick={() => success('Operación completada exitosamente')}
            variant="success"
            icon={<CheckCircle size={16} />}
          >
            Success Toast
          </Button>
          <Button
            onClick={() => error('Ha ocurrido un error inesperado')}
            variant="destructive"
            icon={<AlertCircle size={16} />}
          >
            Error Toast
          </Button>
          <Button
            onClick={() => warning('Atención: acción requerida')}
            variant="secondary"
            icon={<AlertTriangle size={16} />}
          >
            Warning Toast
          </Button>
          <Button
            onClick={() => info('Nueva actualización disponible')}
            variant="primary"
            icon={<Info size={16} />}
          >
            Info Toast
          </Button>
          <Button
            onClick={() => toast({ title: 'Notificación neutral' })}
            variant="secondary"
          >
            Default Toast
          </Button>
        </div>
      </ShowcaseSection>

      {/* With Description */}
      <ShowcaseSection
        title="Con Descripción"
        description="Toasts con título y descripción detallada"
      >
        <div>
          <Button
            onClick={() => success('Archivo guardado', {
              description: 'Tu documento ha sido guardado exitosamente en la nube.'
            })}
            variant="secondary"
          >
            Con descripción corta
          </Button>
          <Button
            onClick={() => error('Error de conexión', {
              description: 'No se pudo establecer conexión con el servidor. Por favor, verifica tu conexión a internet e intenta nuevamente.'
            })}
            variant="secondary"
          >
            Con descripción larga
          </Button>
        </div>
      </ShowcaseSection>

      {/* With Actions */}
      <ShowcaseSection
        title="Con Acciones"
        description="Toasts con botones de acción"
      >
        <div>
          <Button
            onClick={() => toast({
              title: '¿Descartar cambios?',
              description: 'Perderás todos los cambios no guardados.',
              type: 'warning',
              duration: 0,
              action: {
                label: 'Descartar',
                onClick: () => console.log('Descartado')
              }
            })}
            variant="secondary"
          >
            Con una acción
          </Button>
          <Button
            onClick={() => toast({
              title: 'Elemento eliminado',
              description: 'El archivo ha sido movido a la papelera.',
              type: 'default',
              action: {
                label: 'Deshacer',
                onClick: () => console.log('Deshecho')
              }
            })}
            variant="secondary"
            icon={<Trash2 size={16} />}
          >
            Undo action
          </Button>
        </div>
      </ShowcaseSection>

      {/* With Icons */}
      <ShowcaseSection
        title="Con Iconos Personalizados"
        description="Toasts con iconos custom"
      >
        <div>
          <Button
            onClick={() => toast({
              title: 'Conectado',
              description: 'Conexión establecida con el servidor.',
              type: 'success',
              icon: <Wifi size={18} />
            })}
            variant="secondary"
            icon={<Wifi size={16} />}
          >
            WiFi conectado
          </Button>
          <Button
            onClick={() => toast({
              title: 'Descarga completa',
              description: 'Tu archivo está listo.',
              type: 'success',
              icon: <Download size={18} />
            })}
            variant="secondary"
            icon={<Download size={16} />}
          >
            Descarga
          </Button>
          <Button
            onClick={() => toast({
              title: 'Nuevo mensaje',
              description: 'Tienes 3 mensajes sin leer.',
              type: 'info',
              icon: <Mail size={18} />
            })}
            variant="secondary"
            icon={<Mail size={16} />}
          >
            Email
          </Button>
        </div>
      </ShowcaseSection>

      {/* Duration Control */}
      <ShowcaseSection
        title="Control de Duración"
        description="Toasts con diferentes tiempos de auto-dismiss"
      >
        <div>
          <Button
            onClick={() => success('Desaparece en 2 segundos', { duration: 2000 })}
            variant="secondary"
          >
            2 segundos
          </Button>
          <Button
            onClick={() => info('Desaparece en 5 segundos', { duration: 5000 })}
            variant="secondary"
          >
            5 segundos
          </Button>
          <Button
            onClick={() => warning('Desaparece en 10 segundos', { duration: 10000 })}
            variant="secondary"
          >
            10 segundos
          </Button>
          <Button
            onClick={() => error('Toast persistente (manual)', { duration: 0 })}
            variant="secondary"
          >
            Persistente
          </Button>
        </div>
      </ShowcaseSection>

      {/* Non-dismissible */}
      <ShowcaseSection
        title="No Descartable"
        description="Toasts que no se pueden cerrar manualmente"
      >
        <div>
          <Button
            onClick={() => toast({
              title: 'Procesando...',
              description: 'Este toast desaparecerá automáticamente.',
              type: 'info',
              dismissible: false,
              duration: 3000
            })}
            variant="secondary"
          >
            Sin botón de cerrar
          </Button>
        </div>
      </ShowcaseSection>

      {/* Multiple Toasts */}
      <ShowcaseSection
        title="Múltiples Toasts"
        description="Stack de toasts y control de grupo"
      >
        <div>
          <Button
            onClick={() => {
              success('Toast 1 de 5');
              setTimeout(() => info('Toast 2 de 5'), 200);
              setTimeout(() => warning('Toast 3 de 5'), 400);
              setTimeout(() => error('Toast 4 de 5'), 600);
              setTimeout(() => toast({ title: 'Toast 5 de 5' }), 800);
            }}
            variant="secondary"
          >
            Mostrar 5 toasts
          </Button>
          <Button
            onClick={dismissAll}
            variant="secondary"
          >
            Dismiss All
          </Button>
        </div>
      </ShowcaseSection>

      {/* Glass Style Toasts - Light Engine */}
      <ShowcaseSection
        title="Glass Style (Light Engine)"
        description="Toasts con estilo glassmorphism y sombras dinámicas"
      >
        <div style={{ width: '100%' }}>
          <ToastProvider position="top-right" maxVisible={3} toastStyle="glass" dynamicShadows>
            <GlassToastDemo />
          </ToastProvider>
          <p style={{
            marginTop: '16px',
            fontSize: '12px',
            color: 'var(--fing-text-tertiary)',
            fontFamily: 'var(--fing-font-mono)',
          }}>
            Los toasts glass aparecen en la esquina superior derecha con sombras dinámicas del Light Engine
          </p>
        </div>
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={specTextStyles}>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Types:</strong> default, success, error, warning, info</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Positions:</strong> top-left, top-center, top-right, bottom-left, bottom-center, bottom-right</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Duration:</strong> Configurable, 0 para persistente</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Actions:</strong> Botón de acción opcional con callback</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Icons:</strong> Iconos por defecto según tipo o custom</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Animations:</strong> Entrada/salida animada con reduced motion support</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>API:</strong> useToast hook con toast(), success(), error(), warning(), info()</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Control:</strong> dismiss(id), dismissAll(), update(id, options)</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Max Visible:</strong> Configurable, auto-remove de los más antiguos</p>
          <p>✓ <strong style={{ color: 'var(--fing-accent-primary)' }}>Accessibility:</strong> role="alert", aria-live, keyboard dismissible</p>
        </div>
      </ShowcaseSection>

      {/* Code Example */}
      <ShowcaseSection title="Uso Básico">
        <div style={codeBlockStyles}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`// En App.tsx o layout principal
import { ToastProvider } from '@/components/organisms/Toast';

function App() {
  return (
    <ToastProvider position="bottom-right" maxVisible={5}>
      <YourApp />
    </ToastProvider>
  );
}

// En cualquier componente
import { useToast } from '@/components/organisms/Toast';

function MyComponent() {
  const { success, error, toast } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      success('Guardado correctamente');
    } catch (err) {
      error('Error al guardar');
    }
  };

  return <Button onClick={handleSave}>Guardar</Button>;
}`}</pre>
        </div>
      </ShowcaseSection>
    </div>
  );
}

// Main showcase component with provider
export function ToastShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <ToastProvider position="bottom-right" maxVisible={5}>
        <ToastDemoContent />
      </ToastProvider>
    </LightEngineProvider>
  );
}
