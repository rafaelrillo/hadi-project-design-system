// Path: src/pages/charts/ChartsShowcase.tsx
// Terminal Theme Version - Complete Charts Showcase
import React from 'react';
import { StatCard } from '../../components/charts/StatCard';
import { LineChart } from '../../components/charts/LineChart';
import { RadarChart } from '../../components/charts/RadarChart';
import { RadialBar } from '../../components/charts/RadialBar';
import { HeatMap } from '../../components/charts/HeatMap';
import { SankeyDiagram } from '../../components/charts/SankeyDiagram';
import { CalendarHeatmap } from '../../components/charts/CalendarHeatmap';
import { TreeMap } from '../../components/charts/TreeMap';
import { BumpChart } from '../../components/charts/BumpChart';
import { NetworkGraph } from '../../components/charts/NetworkGraph';
import { ChordDiagram } from '../../components/charts/ChordDiagram';
import { StreamChart } from '../../components/charts/StreamChart';
import { ScatterPlot } from '../../components/charts/ScatterPlot';
import { BulletChart } from '../../components/charts/BulletChart';
import { ShowcaseSection, ComponentPreview } from '../../components/showcase';
import { TrendingDown, Users, DollarSign, Activity, ShoppingCart } from 'lucide-react';

export function ChartsShowcase() {
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

  const sectionHeaderStyles: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--primary)',
    marginTop: '48px',
    marginBottom: '24px',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '8px'
  };

  // ============================================
  // SAMPLE DATA
  // ============================================

  // LineChart data
  const lineChartData = [
    {
      id: 'ventas',
      data: [
        { x: 'Ene', y: 120 }, { x: 'Feb', y: 150 }, { x: 'Mar', y: 180 },
        { x: 'Abr', y: 140 }, { x: 'May', y: 200 }, { x: 'Jun', y: 250 },
        { x: 'Jul', y: 230 }, { x: 'Ago', y: 280 }
      ]
    }
  ];

  const multiLineData = [
    {
      id: 'producto-a',
      data: [
        { x: 'Ene', y: 100 }, { x: 'Feb', y: 130 }, { x: 'Mar', y: 160 },
        { x: 'Abr', y: 120 }, { x: 'May', y: 180 }, { x: 'Jun', y: 200 }
      ]
    },
    {
      id: 'producto-b',
      data: [
        { x: 'Ene', y: 80 }, { x: 'Feb', y: 110 }, { x: 'Mar', y: 90 },
        { x: 'Abr', y: 150 }, { x: 'May', y: 130 }, { x: 'Jun', y: 170 }
      ]
    }
  ];

  // RadarChart data
  const radarData = [
    { metric: 'CPU', server1: 80, server2: 65 },
    { metric: 'RAM', server1: 70, server2: 85 },
    { metric: 'Disco', server1: 45, server2: 50 },
    { metric: 'Red', server1: 90, server2: 75 },
    { metric: 'I/O', server1: 60, server2: 70 }
  ];

  // RadialBar data
  const radialBarData = [
    { id: 'CPU', data: [{ x: 'usage', y: 75 }] },
    { id: 'RAM', data: [{ x: 'usage', y: 60 }] },
    { id: 'Disco', data: [{ x: 'usage', y: 45 }] },
    { id: 'Red', data: [{ x: 'usage', y: 88 }] }
  ];

  // HeatMap data
  const heatMapData = [
    {
      id: 'Server 1',
      data: [
        { x: '00:00', y: 45 }, { x: '04:00', y: 23 }, { x: '08:00', y: 78 },
        { x: '12:00', y: 92 }, { x: '16:00', y: 85 }, { x: '20:00', y: 56 }
      ]
    },
    {
      id: 'Server 2',
      data: [
        { x: '00:00', y: 32 }, { x: '04:00', y: 18 }, { x: '08:00', y: 65 },
        { x: '12:00', y: 88 }, { x: '16:00', y: 72 }, { x: '20:00', y: 41 }
      ]
    },
    {
      id: 'Server 3',
      data: [
        { x: '00:00', y: 55 }, { x: '04:00', y: 35 }, { x: '08:00', y: 82 },
        { x: '12:00', y: 95 }, { x: '16:00', y: 78 }, { x: '20:00', y: 62 }
      ]
    }
  ];

  // Sankey data
  const sankeyData = {
    nodes: [
      { id: 'API Gateway' },
      { id: 'Auth Service' },
      { id: 'User Service' },
      { id: 'Database' },
      { id: 'Cache' }
    ],
    links: [
      { source: 'API Gateway', target: 'Auth Service', value: 100 },
      { source: 'API Gateway', target: 'User Service', value: 80 },
      { source: 'Auth Service', target: 'Database', value: 60 },
      { source: 'User Service', target: 'Database', value: 70 },
      { source: 'User Service', target: 'Cache', value: 30 }
    ]
  };

  // Calendar data
  const calendarData = [
    { day: '2024-01-01', value: 5 }, { day: '2024-01-02', value: 12 },
    { day: '2024-01-03', value: 8 }, { day: '2024-01-04', value: 15 },
    { day: '2024-01-05', value: 3 }, { day: '2024-01-08', value: 20 },
    { day: '2024-01-09', value: 18 }, { day: '2024-01-10', value: 25 },
    { day: '2024-01-11', value: 10 }, { day: '2024-01-12', value: 8 },
    { day: '2024-01-15', value: 30 }, { day: '2024-01-16', value: 22 },
    { day: '2024-01-17', value: 15 }, { day: '2024-01-18', value: 28 },
    { day: '2024-01-19', value: 12 }, { day: '2024-01-22', value: 35 },
    { day: '2024-01-23', value: 40 }, { day: '2024-01-24', value: 18 },
    { day: '2024-01-25', value: 25 }, { day: '2024-01-26', value: 20 },
    { day: '2024-01-29', value: 45 }, { day: '2024-01-30', value: 38 },
    { day: '2024-01-31', value: 42 }
  ];

  // TreeMap data
  const treeMapData = {
    name: 'root',
    children: [
      {
        name: 'src',
        children: [
          { name: 'components', value: 1200 },
          { name: 'pages', value: 800 },
          { name: 'utils', value: 400 }
        ]
      },
      { name: 'node_modules', value: 8500 },
      { name: 'public', value: 300 },
      { name: 'docs', value: 200 }
    ]
  };

  // Bump data
  const bumpData = [
    { id: 'Server A', data: [{ x: 'Ene', y: 1 }, { x: 'Feb', y: 2 }, { x: 'Mar', y: 1 }, { x: 'Abr', y: 3 }] },
    { id: 'Server B', data: [{ x: 'Ene', y: 2 }, { x: 'Feb', y: 1 }, { x: 'Mar', y: 3 }, { x: 'Abr', y: 1 }] },
    { id: 'Server C', data: [{ x: 'Ene', y: 3 }, { x: 'Feb', y: 3 }, { x: 'Mar', y: 2 }, { x: 'Abr', y: 2 }] }
  ];

  // Network data - Complex microservices architecture
  const networkData = {
    nodes: [
      // Core services (naranja)
      { id: 'API Gateway', radius: 20, color: '#FF6600' },
      { id: 'Load Balancer', radius: 18, color: '#FF6600' },
      // Auth cluster (cyan)
      { id: 'Auth Service', radius: 14, color: '#00BFFF' },
      { id: 'OAuth Provider', radius: 10, color: '#00BFFF' },
      { id: 'Session Store', radius: 10, color: '#00BFFF' },
      // Business services (verde)
      { id: 'User Service', radius: 14, color: '#00FF41' },
      { id: 'Order Service', radius: 14, color: '#00FF41' },
      { id: 'Payment Service', radius: 12, color: '#00FF41' },
      { id: 'Notification', radius: 10, color: '#00FF41' },
      // Data layer (amarillo)
      { id: 'PostgreSQL', radius: 14, color: '#FFB800' },
      { id: 'MongoDB', radius: 12, color: '#FFB800' },
      { id: 'Redis Cache', radius: 12, color: '#FF3333' },
      { id: 'Elasticsearch', radius: 10, color: '#FFB800' },
      // Messaging (morado)
      { id: 'RabbitMQ', radius: 12, color: '#9D4EDD' },
      { id: 'Kafka', radius: 12, color: '#9D4EDD' }
    ],
    links: [
      // Gateway connections
      { source: 'Load Balancer', target: 'API Gateway', distance: 60 },
      { source: 'API Gateway', target: 'Auth Service', distance: 80 },
      { source: 'API Gateway', target: 'User Service', distance: 80 },
      { source: 'API Gateway', target: 'Order Service', distance: 80 },
      // Auth cluster
      { source: 'Auth Service', target: 'OAuth Provider', distance: 50 },
      { source: 'Auth Service', target: 'Session Store', distance: 50 },
      { source: 'Auth Service', target: 'Redis Cache', distance: 60 },
      // User service connections
      { source: 'User Service', target: 'PostgreSQL', distance: 70 },
      { source: 'User Service', target: 'Redis Cache', distance: 60 },
      { source: 'User Service', target: 'Elasticsearch', distance: 70 },
      // Order service connections
      { source: 'Order Service', target: 'MongoDB', distance: 70 },
      { source: 'Order Service', target: 'Payment Service', distance: 60 },
      { source: 'Order Service', target: 'RabbitMQ', distance: 60 },
      // Payment connections
      { source: 'Payment Service', target: 'PostgreSQL', distance: 70 },
      { source: 'Payment Service', target: 'Kafka', distance: 60 },
      // Messaging connections
      { source: 'RabbitMQ', target: 'Notification', distance: 50 },
      { source: 'Kafka', target: 'Elasticsearch', distance: 60 },
      { source: 'Kafka', target: 'Notification', distance: 60 }
    ]
  };

  // Chord data
  const chordMatrix = [
    [0, 50, 30, 20],
    [50, 0, 40, 10],
    [30, 40, 0, 25],
    [20, 10, 25, 0]
  ];
  const chordKeys = ['API', 'Auth', 'User', 'DB'];

  // Stream data
  const streamData = [
    { API: 10, DB: 20, Cache: 5 },
    { API: 15, DB: 25, Cache: 8 },
    { API: 12, DB: 18, Cache: 10 },
    { API: 20, DB: 30, Cache: 12 },
    { API: 18, DB: 22, Cache: 15 },
    { API: 25, DB: 35, Cache: 18 },
    { API: 22, DB: 28, Cache: 20 }
  ];

  // Scatter data
  const scatterData = [
    {
      id: 'Requests',
      data: [
        { x: 100, y: 45 }, { x: 200, y: 78 }, { x: 300, y: 120 },
        { x: 150, y: 60 }, { x: 250, y: 95 }, { x: 350, y: 140 },
        { x: 180, y: 72 }, { x: 280, y: 110 }
      ]
    },
    {
      id: 'Errors',
      data: [
        { x: 120, y: 15 }, { x: 220, y: 25 }, { x: 320, y: 35 },
        { x: 170, y: 20 }, { x: 270, y: 30 }
      ]
    }
  ];

  // Bullet data
  const bulletData = [
    { id: 'Response Time', title: 'Response', subtitle: 'ms', ranges: [0, 100, 200, 300], measures: [150], markers: [200] },
    { id: 'Throughput', title: 'Throughput', subtitle: 'req/s', ranges: [0, 500, 1000, 1500], measures: [800], markers: [1000] },
    { id: 'Error Rate', title: 'Errors', subtitle: '%', ranges: [0, 2, 5, 10], measures: [1.5], markers: [2] }
  ];

  return (
    <div>
      {/* Page Header */}
      <header style={pageHeaderStyles}>
        <h1 style={titleStyles}>&gt; Charts_</h1>
        <p style={descStyles}>
          // 14 componentes de visualización de datos con tema terminal
        </p>
      </header>

      {/* ============================================ */}
      {/* STAT CARDS */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// StatCards</h2>

      <ShowcaseSection
        title="StatCard - Con Tendencias"
        description="Tarjetas de métricas con iconos y cambio porcentual"
      >
        <ComponentPreview>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', width: '100%' }}>
            <StatCard label="Usuarios" value="12,543" icon={Users} change={12.5} trend="up" />
            <StatCard label="Ingresos" value="$23,450" icon={DollarSign} change={8.2} trend="up" />
            <StatCard label="Rebote" value="32%" icon={TrendingDown} change={-5.3} trend="down" />
            <StatCard label="Actividad" value="89%" icon={Activity} change={5.7} trend="up" />
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ============================================ */}
      {/* LINE CHARTS */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// Line Charts</h2>

      <ShowcaseSection
        title="LineChart - Básico"
        description="Gráfico de líneas con área y puntos"
      >
        <div style={{ width: '100%', height: '300px' }}>
          <LineChart data={lineChartData} height={300} enableArea={true} enablePoints={true} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="LineChart - Múltiples Series"
        description="Comparación de múltiples conjuntos de datos"
      >
        <div style={{ width: '100%', height: '300px' }}>
          <LineChart data={multiLineData} height={300} enableArea={true} enablePoints={true} />
        </div>
      </ShowcaseSection>

      {/* ============================================ */}
      {/* COMPARISON CHARTS */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// Comparison Charts</h2>

      <ShowcaseSection
        title="RadarChart - Métricas de Servidores"
        description="Comparación multi-variable en ejes radiales"
      >
        <div style={{ width: '100%', height: '400px' }}>
          <RadarChart data={radarData} keys={['server1', 'server2']} indexBy="metric" height={400} fillOpacity={0.3} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="BumpChart - Ranking de Servidores"
        description="Posiciones que cambian a lo largo del tiempo"
      >
        <div style={{ width: '100%', height: '350px' }}>
          <BumpChart data={bumpData} height={350} />
        </div>
      </ShowcaseSection>

      {/* ============================================ */}
      {/* PROGRESS CHARTS */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// Progress Charts</h2>

      <ShowcaseSection
        title="RadialBar - Uso de Recursos"
        description="Barras circulares para mostrar porcentajes"
      >
        <div style={{ width: '100%', height: '350px' }}>
          <RadialBar data={radialBarData} height={350} endAngle={270} innerRadius={0.3} padding={0.3} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="BulletChart - KPIs vs Targets"
        description="Comparación de valor actual vs objetivo"
      >
        <div style={{ width: '100%', height: '280px' }}>
          <BulletChart data={bulletData} height={280} spacing={40} />
        </div>
      </ShowcaseSection>

      {/* ============================================ */}
      {/* DISTRIBUTION CHARTS */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// Distribution Charts</h2>

      <ShowcaseSection
        title="HeatMap - Carga de Servidores"
        description="Matriz de intensidad con colores"
      >
        <div style={{ width: '100%', height: '300px' }}>
          <HeatMap data={heatMapData} height={300} colorScheme="oranges" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="CalendarHeatmap - Actividad Diaria"
        description="Calendario con días coloreados por intensidad (estilo GitHub)"
      >
        <div style={{ width: '100%', height: '300px' }}>
          <CalendarHeatmap data={calendarData} from="2024-01-01" to="2024-01-31" height={300} colorScheme="greens" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="TreeMap - Uso de Disco"
        description="Rectángulos jerárquicos proporcionales al valor"
      >
        <div style={{ width: '100%', height: '350px' }}>
          <TreeMap data={treeMapData} height={350} />
        </div>
      </ShowcaseSection>

      {/* ============================================ */}
      {/* FLOW CHARTS */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// Flow Charts</h2>

      <ShowcaseSection
        title="SankeyDiagram - Flujo de Datos"
        description="Flujos entre servicios con ancho proporcional"
      >
        <div style={{ width: '100%', height: '400px' }}>
          <SankeyDiagram data={sankeyData} height={400} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="ChordDiagram - Comunicación entre Servicios"
        description="Relaciones circulares entre entidades"
      >
        <div style={{ width: '100%', height: '450px' }}>
          <ChordDiagram matrix={chordMatrix} keys={chordKeys} height={450} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="NetworkGraph - Arquitectura de Microservicios"
        description="Topología compleja con 15 nodos coloreados por tipo"
      >
        <div style={{ width: '100%', height: '500px' }}>
          <NetworkGraph data={networkData} height={500} repulsivity={12} linkColor="#555555" />
        </div>
      </ShowcaseSection>

      {/* ============================================ */}
      {/* CORRELATION CHARTS */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// Correlation Charts</h2>

      <ShowcaseSection
        title="StreamChart - Distribución Temporal"
        description="Áreas apiladas con flujo orgánico"
      >
        <div style={{ width: '100%', height: '350px' }}>
          <StreamChart data={streamData} keys={['API', 'DB', 'Cache']} height={350} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="ScatterPlot - Latencia vs Throughput"
        description="Puntos en coordenadas X/Y para correlaciones"
      >
        <div style={{ width: '100%', height: '350px' }}>
          <ScatterPlot data={scatterData} height={350} axisBottomLabel="Requests" axisLeftLabel="Response Time (ms)" />
        </div>
      </ShowcaseSection>

      {/* ============================================ */}
      {/* DASHBOARD EXAMPLE */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// Dashboard Example</h2>

      <ShowcaseSection
        title="Panel de Control Completo"
        description="Combinación de múltiples gráficos"
      >
        <ComponentPreview>
          <div style={{
            width: '100%',
            padding: '24px',
            backgroundColor: 'var(--background-secondary)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '20px',
              color: 'var(--foreground)',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase'
            }}>
              System Monitor
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <StatCard label="Usuarios" value="12,543" icon={Users} change={12.5} trend="up" />
              <StatCard label="Ingresos" value="$45,230" icon={DollarSign} change={8.2} trend="up" />
              <StatCard label="Pedidos" value="234" icon={ShoppingCart} change={-3.1} trend="down" />
              <StatCard label="Actividad" value="89%" icon={Activity} change={5.7} trend="up" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
              <div style={{
                backgroundColor: 'var(--background-tertiary)',
                borderRadius: 'var(--radius)',
                padding: '16px',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  Tendencia de Ventas
                </h4>
                <div style={{ height: '200px' }}>
                  <LineChart data={lineChartData} height={200} />
                </div>
              </div>

              <div style={{
                backgroundColor: 'var(--background-tertiary)',
                borderRadius: 'var(--radius)',
                padding: '16px',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: 'var(--foreground)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  Uso de Recursos
                </h4>
                <div style={{ height: '200px' }}>
                  <RadialBar data={radialBarData} height={200} endAngle={270} />
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </ShowcaseSection>

      {/* ============================================ */}
      {/* TECHNICAL SPECS */}
      {/* ============================================ */}
      <h2 style={sectionHeaderStyles}>// Technical Specs</h2>

      <ShowcaseSection title="Componentes Disponibles">
        <div style={{ fontSize: '12px', color: 'var(--foreground)', lineHeight: '2', fontFamily: 'var(--font-mono)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            <div>
              <p><strong style={{ color: 'var(--primary)' }}>Base Charts:</strong></p>
              <p>✓ StatCard - Métricas con iconos y tendencias</p>
              <p>✓ LineChart - Series temporales</p>
              <p>✓ RadarChart - Comparación multi-variable</p>
              <p>✓ RadialBar - Porcentajes circulares</p>
              <p>✓ HeatMap - Matrices de intensidad</p>
            </div>
            <div>
              <p><strong style={{ color: 'var(--primary)' }}>Flow Charts:</strong></p>
              <p>✓ SankeyDiagram - Flujos de datos</p>
              <p>✓ ChordDiagram - Relaciones circulares</p>
              <p>✓ NetworkGraph - Topología de red</p>
              <p>✓ TreeMap - Jerarquías</p>
              <p>✓ BumpChart - Rankings temporales</p>
            </div>
            <div>
              <p><strong style={{ color: 'var(--primary)' }}>Time Charts:</strong></p>
              <p>✓ CalendarHeatmap - Actividad diaria</p>
              <p>✓ StreamChart - Distribución temporal</p>
            </div>
            <div>
              <p><strong style={{ color: 'var(--primary)' }}>Analysis Charts:</strong></p>
              <p>✓ ScatterPlot - Correlaciones</p>
              <p>✓ BulletChart - KPIs vs targets</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
