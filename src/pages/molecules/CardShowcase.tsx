// Path: src/pages/molecules/CardShowcase.tsx
// SENTINEL Design System
import { Card } from '../../components/molecules/Card';
import { Button } from '../../components/atoms/Button';
import { Badge } from '../../components/atoms/Badge';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { Eye, Edit, Users, TrendingUp, ShoppingCart, Bell, CheckCircle, AlertCircle, Calendar, Download } from 'lucide-react';

export function CardShowcase() {
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
        <h1 style={titleStyles}>&gt; Card_</h1>
        <p style={descStyles}>
          // Contenedor flexible para información relacionada con header, footer y contenido
        </p>
      </header>

      {/* Basic Card */}
      <ShowcaseSection
        title="Card Básico"
        description="Card con solo contenido, sin header ni footer"
      >
        <ComponentPreview>
          <Card>
            <div style={{ padding: '8px 0' }}>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
                Este es un card básico con contenido simple. Perfecto para mostrar información sin estructura compleja.
              </p>
            </div>
          </Card>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Card with Header */}
      <ShowcaseSection
        title="Card con Header"
        description="Card con título y acciones en el header"
      >
        <ComponentPreview>
          <Card
            header={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>Información del Usuario</h3>
                <Badge variant="success">Activo</Badge>
              </div>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
              <div>
                <strong style={{ color: 'var(--primary)' }}>Nombre:</strong> Juan Pérez
              </div>
              <div>
                <strong style={{ color: 'var(--primary)' }}>Email:</strong> juan.perez@example.com
              </div>
              <div>
                <strong style={{ color: 'var(--primary)' }}>Rol:</strong> Administrador
              </div>
            </div>
          </Card>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Card with Footer */}
      <ShowcaseSection
        title="Card con Footer"
        description="Card con botones de acción en el footer"
      >
        <ComponentPreview>
          <Card
            header={<h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>Proyecto en Curso</h3>}
            footer={
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <Button variant="secondary" icon={<Eye size={20} />}>Ver</Button>
                <Button variant="primary" icon={<Edit size={20} />}>Editar</Button>
              </div>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                Desarrollo del nuevo módulo de reportes para el sistema de gestión.
              </p>
              <div>
                <strong style={{ color: 'var(--primary)' }}>Progreso:</strong> 75%
              </div>
              <div>
                <strong style={{ color: 'var(--primary)' }}>Fecha límite:</strong> 31 Dic 2024
              </div>
            </div>
          </Card>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Stats Cards */}
      <ShowcaseSection
        title="Cards de Estadísticas"
        description="Cards para mostrar métricas y KPIs importantes"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '12px', backgroundColor: 'var(--background-tertiary)', borderRadius: 'var(--radius)', display: 'flex' }}>
                  <Users size={32} color="var(--primary)" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Total Usuarios</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>1,284</p>
                </div>
              </div>
            </Card>

            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '12px', backgroundColor: 'var(--background-tertiary)', borderRadius: 'var(--radius)', display: 'flex' }}>
                  <TrendingUp size={32} color="var(--success)" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Ingresos</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 700, color: 'var(--success)', fontFamily: 'var(--font-mono)' }}>$45,320</p>
                </div>
              </div>
            </Card>

            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '12px', backgroundColor: 'var(--background-tertiary)', borderRadius: 'var(--radius)', display: 'flex' }}>
                  <ShoppingCart size={32} color="var(--destructive)" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Pedidos</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 700, color: 'var(--destructive)', fontFamily: 'var(--font-mono)' }}>342</p>
                </div>
              </div>
            </Card>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Product Card */}
      <ShowcaseSection
        title="Card de Producto"
        description="Card para mostrar información de productos o items"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '350px' }}>
            <Card
              header={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>iPhone 15 Pro</h3>
                  <Badge variant="success">En Stock</Badge>
                </div>
              }
              footer={
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>$999</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button variant="secondary">Ver</Button>
                    <Button variant="primary">Comprar</Button>
                  </div>
                </div>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground-muted)', lineHeight: '1.6', fontFamily: 'var(--font-mono)' }}>
                  Titanio. Tan resistente. Tan ligero. Tan Pro.
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Badge variant="info">128GB</Badge>
                  <Badge variant="neutral">Titanio Natural</Badge>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>
                  ⭐⭐⭐⭐⭐ 4.8 (1,234 reviews)
                </div>
              </div>
            </Card>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Notification Cards */}
      <ShowcaseSection
        title="Cards de Notificación"
        description="Cards para alertas, mensajes y notificaciones"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Card>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ padding: '8px', backgroundColor: 'var(--background-tertiary)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle size={24} color="var(--success)" />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>Operación Exitosa</h4>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground-muted)', lineHeight: '1.6', fontFamily: 'var(--font-mono)' }}>
                    El archivo se ha subido correctamente al servidor.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ padding: '8px', backgroundColor: 'var(--background-tertiary)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <AlertCircle size={24} color="var(--destructive)" />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>Acción Requerida</h4>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground-muted)', lineHeight: '1.6', fontFamily: 'var(--font-mono)' }}>
                    Tu suscripción vence en 3 días. Renueva ahora para mantener el acceso.
                  </p>
                </div>
                <Button variant="destructive">Renovar</Button>
              </div>
            </Card>

            <Card>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ padding: '8px', backgroundColor: 'var(--background-tertiary)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bell size={24} color="var(--primary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>Nueva Notificación</h4>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground-muted)', lineHeight: '1.6', fontFamily: 'var(--font-mono)' }}>
                    Juan Pérez ha comentado en tu publicación hace 5 minutos.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Event Card */}
      <ShowcaseSection
        title="Card de Evento"
        description="Card para mostrar información de eventos o citas"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '400px' }}>
            <Card
              header={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Calendar size={20} color="var(--primary)" />
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>Reunión de Equipo</h3>
                  </div>
                  <Badge variant="warning">Próximo</Badge>
                </div>
              }
              footer={
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <Button variant="secondary">Cancelar</Button>
                  <Button variant="primary">Confirmar Asistencia</Button>
                </div>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', fontFamily: 'var(--font-mono)', color: 'var(--foreground)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--foreground-muted)' }}>Fecha:</span>
                  <strong style={{ color: 'var(--primary)' }}>15 Diciembre 2024</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--foreground-muted)' }}>Hora:</span>
                  <strong style={{ color: 'var(--primary)' }}>10:00 AM - 11:30 AM</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--foreground-muted)' }}>Ubicación:</span>
                  <strong style={{ color: 'var(--primary)' }}>Sala de Conferencias A</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--foreground-muted)' }}>Participantes:</span>
                  <strong style={{ color: 'var(--primary)' }}>12 personas</strong>
                </div>
              </div>
            </Card>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Action Card */}
      <ShowcaseSection
        title="Card de Acción Rápida"
        description="Card con acciones destacadas y llamadas a la acción"
      >
        <ComponentPreview>
          <div style={{ maxWidth: '450px' }}>
            <Card>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ padding: '16px', backgroundColor: 'var(--primary)', borderRadius: 'var(--radius)', display: 'flex' }}>
                  <Download size={40} color="var(--background)" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>Descargar Reporte Mensual</h3>
                  <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>
                    Reporte de actividades y métricas del mes de Noviembre 2024
                  </p>
                  <Button variant="primary" icon={<Download size={20} />}>Descargar PDF</Button>
                </div>
              </div>
            </Card>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Grid Layout */}
      <ShowcaseSection
        title="Grid de Cards"
        description="Layout de múltiples cards en grid responsive"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            <Card
              header={<h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>Card 1</h4>}
            >
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>
                Contenido del primer card en un layout de grid responsive.
              </p>
            </Card>
            <Card
              header={<h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>Card 2</h4>}
            >
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>
                Contenido del segundo card en un layout de grid responsive.
              </p>
            </Card>
            <Card
              header={<h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>Card 3</h4>}
            >
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>
                Contenido del tercer card en un layout de grid responsive.
              </p>
            </Card>
            <Card
              header={<h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>Card 4</h4>}
            >
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--foreground-muted)', fontFamily: 'var(--font-mono)' }}>
                Contenido del cuarto card en un layout de grid responsive.
              </p>
            </Card>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Padding:</strong> 20px</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Border radius:</strong> var(--radius)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Border:</strong> 1px solid var(--border)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Header:</strong> Padding 20px, border-bottom 1px solid var(--border)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Footer:</strong> Padding 20px, border-top 1px solid var(--border)</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Background:</strong> var(--background-secondary)</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
