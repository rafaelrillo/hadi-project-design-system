// Path: src/pages/molecules/MetricCardShowcase.tsx
// SENTINEL Design System
import { MetricCard } from '../../components/molecules/MetricCard';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { DollarSign, Users, TrendingUp, ShoppingCart, Activity, Percent } from 'lucide-react';

export function MetricCardShowcase() {
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

  // Sample sparkline data
  const sparklineData = [10, 15, 12, 18, 22, 19, 25, 28, 24, 30, 35, 32];

  return (
    <div>
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; MetricCard_</h1>
        <p style={descStyles}>
          // Card versátil para mostrar KPIs con contexto, tendencias y visualizaciones
        </p>
      </header>

      {/* Basic MetricCard */}
      <ShowcaseSection
        title="MetricCard Básico"
        description="Card simple con título y valor"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <MetricCard title="Revenue" value={45320} format="currency" />
            <MetricCard title="Users" value={1284} format="number" />
            <MetricCard title="Growth" value={12.5} format="percentage" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Icons */}
      <ShowcaseSection
        title="Con Iconos"
        description="MetricCards con iconos para identificación rápida"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <MetricCard
              title="Revenue"
              value={45320}
              format="currency"
              icon={<DollarSign size={20} />}
            />
            <MetricCard
              title="Users"
              value={1284}
              format="number"
              icon={<Users size={20} />}
            />
            <MetricCard
              title="Orders"
              value={342}
              format="number"
              icon={<ShoppingCart size={20} />}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Trends */}
      <ShowcaseSection
        title="Con Tendencias"
        description="Indicadores de tendencia con dirección y sentimiento"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <MetricCard
              title="Revenue"
              value={45320}
              format="currency"
              icon={<DollarSign size={20} />}
              trend={{
                value: 12.5,
                direction: 'up',
                label: 'vs last month'
              }}
            />
            <MetricCard
              title="Bounce Rate"
              value={32.4}
              format="percentage"
              icon={<Activity size={20} />}
              trend={{
                value: 5.2,
                direction: 'down',
                sentiment: 'positive', // Down is good for bounce rate
                label: 'vs last week'
              }}
            />
            <MetricCard
              title="Costs"
              value={12500}
              format="currency"
              icon={<TrendingUp size={20} />}
              trend={{
                value: 8.3,
                direction: 'up',
                sentiment: 'negative', // Up is bad for costs
                label: 'vs budget'
              }}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Sparkline */}
      <ShowcaseSection
        title="Con Sparkline"
        description="Mini gráfico de tendencia histórica"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <MetricCard
              title="Weekly Revenue"
              value={125000}
              format="currency"
              sparkline={sparklineData}
              trend={{
                value: 15.3,
                direction: 'up'
              }}
            />
            <MetricCard
              title="Active Users"
              value={8542}
              format="number"
              sparkline={[50, 45, 55, 52, 48, 60, 58, 65, 62, 70, 68, 75]}
              trend={{
                value: 8.7,
                direction: 'up'
              }}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Progress */}
      <ShowcaseSection
        title="Con Barra de Progreso"
        description="Progreso hacia una meta u objetivo"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <MetricCard
              title="Sales Target"
              value="$75,000"
              icon={<DollarSign size={20} />}
              progress={{
                value: 75000,
                max: 100000,
                showLabel: true
              }}
            />
            <MetricCard
              title="Quota Reached"
              value="85%"
              icon={<Percent size={20} />}
              progress={{
                value: 85,
                max: 100,
                showLabel: true
              }}
              status="success"
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Distribution */}
      <ShowcaseSection
        title="Con Distribución"
        description="Visualización de segmentos o categorías"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <MetricCard
              title="Portfolio"
              value="$125,000"
              distribution={{
                segments: [
                  { value: 60, label: 'Stocks', color: 'var(--sentinel-chart-1)' },
                  { value: 25, label: 'Bonds', color: 'var(--sentinel-chart-3)' },
                  { value: 15, label: 'Cash', color: 'var(--sentinel-chart-5)' }
                ]
              }}
            />
            <MetricCard
              title="Traffic Sources"
              value="125,432"
              distribution={{
                segments: [
                  { value: 45, label: 'Organic', color: 'var(--sentinel-chart-1)' },
                  { value: 30, label: 'Direct', color: 'var(--sentinel-chart-2)' },
                  { value: 15, label: 'Social', color: 'var(--sentinel-chart-4)' },
                  { value: 10, label: 'Referral', color: 'var(--sentinel-chart-6)' }
                ]
              }}
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* With Comparison */}
      <ShowcaseSection
        title="Con Comparación"
        description="Comparación con otro valor de referencia"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <MetricCard
              title="Current Revenue"
              value={45320}
              format="currency"
              comparison={{
                label: 'Target',
                value: '$40,000',
                difference: 13.3
              }}
              status="success"
            />
            <MetricCard
              title="Q4 Sales"
              value={180000}
              format="currency"
              comparison={{
                label: 'Q3 Sales',
                value: '$195,000',
                difference: -7.7
              }}
              status="warning"
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Sizes */}
      <ShowcaseSection
        title="Tamaños"
        description="Diferentes tamaños para distintos contextos"
      >
        <ComponentPreview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ fontSize: '12px', color: 'var(--foreground-muted)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>Size: sm</p>
              <div style={{ maxWidth: '200px' }}>
                <MetricCard title="Users" value={1284} size="sm" />
              </div>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: 'var(--foreground-muted)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>Size: md (default)</p>
              <div style={{ maxWidth: '240px' }}>
                <MetricCard title="Users" value={1284} size="md" />
              </div>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: 'var(--foreground-muted)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>Size: lg</p>
              <div style={{ maxWidth: '300px' }}>
                <MetricCard title="Users" value={1284} size="lg" />
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Variants */}
      <ShowcaseSection
        title="Variantes"
        description="Diferentes estilos visuales"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <MetricCard
              title="Default"
              value={1284}
              variant="default"
            />
            <MetricCard
              title="Outlined"
              value={1284}
              variant="outlined"
            />
            <MetricCard
              title="Filled"
              value={1284}
              variant="filled"
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Status Colors */}
      <ShowcaseSection
        title="Estados de Color"
        description="Indicadores visuales de estado"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <MetricCard title="On Track" value={95} format="percentage" status="success" />
            <MetricCard title="Needs Attention" value={72} format="percentage" status="warning" />
            <MetricCard title="Critical" value={45} format="percentage" status="error" />
            <MetricCard title="Information" value={88} format="percentage" status="info" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Interactive */}
      <ShowcaseSection
        title="Interactivo"
        description="Cards con acciones y enlaces"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <MetricCard
              title="Clickable Card"
              value={1284}
              onClick={() => alert('Card clicked!')}
              actionLabel="View Details"
              onActionClick={() => alert('Action clicked!')}
            />
            <MetricCard
              title="Link Card"
              value={45320}
              format="currency"
              href="#"
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Loading and Error States */}
      <ShowcaseSection
        title="Estados de Carga y Error"
        description="Estados para feedback al usuario"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <MetricCard
              title="Loading..."
              value={0}
              loading
            />
            <MetricCard
              title="Error State"
              value={0}
              error="Failed to load data"
            />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* Technical Specifications */}
      <ShowcaseSection title="Especificaciones Técnicas">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '1.8', fontFamily: 'var(--font-mono)' }}>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Sizes:</strong> sm, md, lg</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Variants:</strong> default, outlined, filled</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Status:</strong> default, success, warning, error, info</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Format:</strong> number, currency, percentage, custom</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Trend:</strong> up, down, stable con sentiment configurable</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Sparkline:</strong> Array de números para mini-gráfico</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Progress:</strong> Barra de progreso con value/max</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Distribution:</strong> Segmentos con colores y labels</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Comparison:</strong> Valor de referencia con diferencia</p>
          <p>✓ <strong style={{ color: 'var(--primary)' }}>Interactive:</strong> onClick, href, actionLabel</p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
