# Terminal & Charts Implementation Guide

Guía de implementación para componentes de gráficos y efectos terminal.

---

## Tabla de Contenidos

1. [Gráficos Nivo](#gráficos-nivo)
2. [Efectos PowerGlitch](#efectos-powerglitch)
3. [Efectos Type Animation](#efectos-type-animation)
4. [Animaciones Framer Motion](#animaciones-framer-motion)
5. [Quick Reference](#quick-reference)

---

## Gráficos Nivo

**Librería:** `@nivo/*` v0.99.0
**Docs:** [nivo.rocks](https://nivo.rocks/)

### Implementados Actualmente
- ✅ LineChart
- ✅ StatCard

---

### 1. HeatMap

Matriz de intensidad con colores que representan valores.

**Instalación:**
```bash
npm install @nivo/heatmap
```

**Características:**
- Gradientes de color personalizables (negro → naranja → blanco)
- Tooltips interactivos
- Ejes X/Y configurables
- Soporte para datos temporales

**Casos de uso:**
- Monitoreo de CPU/memoria por hora del día
- Actividad de usuarios por día/hora
- Distribución de errores por servicio
- Latencia de red por nodo

**Ejemplo básico:**
```tsx
import { ResponsiveHeatMap } from '@nivo/heatmap';

const data = [
  { id: 'Server 1', data: [{ x: '00:00', y: 45 }, { x: '01:00', y: 23 }] },
  { id: 'Server 2', data: [{ x: '00:00', y: 78 }, { x: '01:00', y: 56 }] },
];

<ResponsiveHeatMap
  data={data}
  colors={{ type: 'sequential', scheme: 'oranges' }}
  theme={terminalChartTheme}
/>
```

---

### 2. Radar Chart

Comparación multi-variable en ejes radiales.

**Instalación:**
```bash
npm install @nivo/radar
```

**Características:**
- Múltiples series superpuestas
- Áreas con transparencia
- Puntos en vértices
- Grid circular con niveles

**Casos de uso:**
- Performance de servidores (CPU, RAM, Disco, Red, I/O)
- Comparación de skills/stats de robots
- Métricas de calidad de código
- Benchmark de sistemas

**Ejemplo básico:**
```tsx
import { ResponsiveRadar } from '@nivo/radar';

const data = [
  { metric: 'CPU', server1: 80, server2: 65 },
  { metric: 'RAM', server1: 70, server2: 85 },
  { metric: 'Disk', server1: 45, server2: 50 },
  { metric: 'Network', server1: 90, server2: 75 },
  { metric: 'I/O', server1: 60, server2: 70 },
];

<ResponsiveRadar
  data={data}
  keys={['server1', 'server2']}
  indexBy="metric"
  colors={['#FF6600', '#00FF41']}
  theme={terminalChartTheme}
/>
```

---

### 3. Sankey Diagram

Flujos entre nodos con ancho proporcional al valor.

**Instalación:**
```bash
npm install @nivo/sankey
```

**Características:**
- Nodos arrastrables
- Colores por categoría
- Labels en nodos y enlaces
- Orientación horizontal/vertical

**Casos de uso:**
- Flujo de datos entre servicios
- Pipeline de CI/CD
- Distribución de tráfico de red
- Proceso de requests HTTP

**Ejemplo básico:**
```tsx
import { ResponsiveSankey } from '@nivo/sankey';

const data = {
  nodes: [
    { id: 'API Gateway' },
    { id: 'Auth Service' },
    { id: 'User Service' },
    { id: 'Database' },
  ],
  links: [
    { source: 'API Gateway', target: 'Auth Service', value: 100 },
    { source: 'API Gateway', target: 'User Service', value: 80 },
    { source: 'Auth Service', target: 'Database', value: 60 },
    { source: 'User Service', target: 'Database', value: 70 },
  ],
};

<ResponsiveSankey
  data={data}
  colors={terminalChartColors}
  theme={terminalChartTheme}
/>
```

---

### 4. Calendar Heatmap

Calendario con días coloreados por intensidad.

**Instalación:**
```bash
npm install @nivo/calendar
```

**Características:**
- Vista anual o mensual
- Colores por rango de valores
- Tooltips con fecha y valor
- Orientación configurable

**Casos de uso:**
- Commits por día (estilo GitHub)
- Uptime/downtime de servicios
- Actividad de sistema por día
- Logs de errores diarios

**Ejemplo básico:**
```tsx
import { ResponsiveCalendar } from '@nivo/calendar';

const data = [
  { day: '2024-01-01', value: 5 },
  { day: '2024-01-02', value: 12 },
  { day: '2024-01-03', value: 8 },
];

<ResponsiveCalendar
  data={data}
  from="2024-01-01"
  to="2024-12-31"
  colors={['#1a1a1a', '#FF6600']}
  theme={terminalChartTheme}
/>
```

---

### 5. TreeMap

Rectángulos jerárquicos con tamaño proporcional al valor.

**Instalación:**
```bash
npm install @nivo/treemap
```

**Características:**
- Múltiples niveles de jerarquía
- Zoom interactivo
- Colores por categoría o valor
- Labels anidados

**Casos de uso:**
- Uso de disco por carpeta
- Memoria por proceso
- Dependencias de paquetes npm
- Estructura de codebase

**Ejemplo básico:**
```tsx
import { ResponsiveTreeMap } from '@nivo/treemap';

const data = {
  name: 'root',
  children: [
    { name: 'src', value: 1200 },
    { name: 'node_modules', value: 8500 },
    { name: 'public', value: 300 },
  ],
};

<ResponsiveTreeMap
  data={data}
  colors={terminalChartColors}
  theme={terminalChartTheme}
/>
```

---

### 6. Bump Chart

Rankings que cambian a lo largo del tiempo.

**Instalación:**
```bash
npm install @nivo/bump
```

**Características:**
- Líneas que cruzan posiciones
- Puntos en cada período
- Colores por entidad
- Área opcional bajo líneas

**Casos de uso:**
- Ranking de servidores por performance
- Posiciones en leaderboard
- Popularidad de endpoints
- Prioridad de procesos

**Ejemplo básico:**
```tsx
import { ResponsiveBump } from '@nivo/bump';

const data = [
  { id: 'Server A', data: [{ x: 'Jan', y: 1 }, { x: 'Feb', y: 2 }, { x: 'Mar', y: 1 }] },
  { id: 'Server B', data: [{ x: 'Jan', y: 2 }, { x: 'Feb', y: 1 }, { x: 'Mar', y: 3 }] },
  { id: 'Server C', data: [{ x: 'Jan', y: 3 }, { x: 'Feb', y: 3 }, { x: 'Mar', y: 2 }] },
];

<ResponsiveBump
  data={data}
  colors={terminalChartColors}
  theme={terminalChartTheme}
/>
```

---

### 7. ScatterPlot

Puntos en coordenadas X/Y para correlaciones.

**Instalación:**
```bash
npm install @nivo/scatterplot
```

**Características:**
- Tamaño de punto por valor
- Colores por categoría
- Zoom y pan
- Líneas de regresión

**Casos de uso:**
- Latencia vs throughput
- Memoria vs CPU usage
- Tiempo de respuesta vs tamaño de request
- Correlación de métricas

**Ejemplo básico:**
```tsx
import { ResponsiveScatterPlot } from '@nivo/scatterplot';

const data = [
  {
    id: 'Requests',
    data: [
      { x: 100, y: 45 },
      { x: 200, y: 78 },
      { x: 300, y: 120 },
    ],
  },
];

<ResponsiveScatterPlot
  data={data}
  colors={['#FF6600']}
  theme={terminalChartTheme}
/>
```

---

### 8. Radial Bar

Barras circulares desde el centro hacia afuera.

**Instalación:**
```bash
npm install @nivo/radial-bar
```

**Características:**
- Múltiples anillos concéntricos
- Ángulo máximo configurable
- Labels en centro o extremos
- Tracks de fondo

**Casos de uso:**
- Progreso de tareas/jobs
- Cuotas de recursos (80% CPU usado)
- KPIs con targets
- Completitud de procesos

**Ejemplo básico:**
```tsx
import { ResponsiveRadialBar } from '@nivo/radial-bar';

const data = [
  { id: 'CPU', data: [{ x: 'usage', y: 75 }] },
  { id: 'RAM', data: [{ x: 'usage', y: 60 }] },
  { id: 'Disk', data: [{ x: 'usage', y: 45 }] },
];

<ResponsiveRadialBar
  data={data}
  colors={terminalChartColors}
  theme={terminalChartTheme}
/>
```

---

### 9. Network Graph

Nodos conectados por enlaces.

**Instalación:**
```bash
npm install @nivo/network
```

**Características:**
- Física de simulación (repulsión/atracción)
- Nodos arrastrables
- Tamaño por importancia
- Direccionalidad de enlaces

**Casos de uso:**
- Topología de red
- Dependencias entre microservicios
- Conexiones de base de datos
- Arquitectura de sistema

**Ejemplo básico:**
```tsx
import { ResponsiveNetwork } from '@nivo/network';

const data = {
  nodes: [
    { id: 'API', radius: 12 },
    { id: 'DB', radius: 10 },
    { id: 'Cache', radius: 8 },
  ],
  links: [
    { source: 'API', target: 'DB', distance: 80 },
    { source: 'API', target: 'Cache', distance: 60 },
  ],
};

<ResponsiveNetwork
  data={data}
  nodeColor="#FF6600"
  linkColor="#333333"
  theme={terminalChartTheme}
/>
```

---

### 10. Stream Chart

Áreas apiladas con flujo orgánico.

**Instalación:**
```bash
npm install @nivo/stream
```

**Características:**
- Curvas suavizadas
- Offset configurable (wiggle, silhouette)
- Colores por categoría
- Tooltips por capa

**Casos de uso:**
- Uso de recursos en el tiempo
- Distribución de tráfico por servicio
- Tipos de requests por hora
- Carga de trabajo por worker

**Ejemplo básico:**
```tsx
import { ResponsiveStream } from '@nivo/stream';

const data = [
  { API: 10, DB: 20, Cache: 5 },
  { API: 15, DB: 25, Cache: 8 },
  { API: 12, DB: 18, Cache: 10 },
];

<ResponsiveStream
  data={data}
  keys={['API', 'DB', 'Cache']}
  colors={terminalChartColors}
  theme={terminalChartTheme}
/>
```

---

### 11. Chord Diagram

Relaciones circulares entre entidades.

**Instalación:**
```bash
npm install @nivo/chord
```

**Características:**
- Arcos proporcionales
- Ribbons conectando arcos
- Colores por entidad
- Interactividad hover

**Casos de uso:**
- Comunicación entre servicios
- Transferencia de datos entre nodos
- Dependencias mutuas
- Flujo de información

**Ejemplo básico:**
```tsx
import { ResponsiveChord } from '@nivo/chord';

const matrix = [
  [0, 50, 30, 20],
  [50, 0, 40, 10],
  [30, 40, 0, 25],
  [20, 10, 25, 0],
];

<ResponsiveChord
  matrix={matrix}
  keys={['API', 'Auth', 'User', 'DB']}
  colors={terminalChartColors}
  theme={terminalChartTheme}
/>
```

---

### 12. Bullet Chart

Comparación de valor actual vs objetivo.

**Instalación:**
```bash
npm install @nivo/bullet
```

**Características:**
- Rangos de fondo (malo/regular/bueno)
- Marcador de target
- Barra de valor actual
- Orientación horizontal/vertical

**Casos de uso:**
- SLAs (actual vs objetivo)
- Performance vs benchmark
- Uso de cuota
- Métricas vs thresholds

**Ejemplo básico:**
```tsx
import { ResponsiveBullet } from '@nivo/bullet';

const data = [
  {
    id: 'Response Time',
    ranges: [0, 100, 200, 300],
    measures: [150],
    markers: [200],
  },
];

<ResponsiveBullet
  data={data}
  rangeColors={['#1a1a1a', '#333333', '#444444']}
  measureColors={['#FF6600']}
  markerColors={['#00FF41']}
  theme={terminalChartTheme}
/>
```

---

### Resumen de Prioridad - Gráficos

| Prioridad | Gráfico | Complejidad | Impacto Visual |
|-----------|---------|-------------|----------------|
| 🔥 Alta | HeatMap | Media | Alto |
| 🔥 Alta | Radar | Baja | Alto |
| 🔥 Alta | Radial Bar | Baja | Alto |
| ⭐ Media | Sankey | Alta | Muy Alto |
| ⭐ Media | TreeMap | Media | Alto |
| ⭐ Media | Calendar | Media | Alto |
| ⭐ Media | Bump | Baja | Medio |
| 💡 Baja | ScatterPlot | Baja | Medio |
| 💡 Baja | Network | Alta | Muy Alto |
| 💡 Baja | Stream | Media | Alto |
| 💡 Baja | Chord | Alta | Muy Alto |
| 💡 Baja | Bullet | Baja | Medio |

---

## Efectos PowerGlitch

**Librería:** `react-powerglitch` v1.1.0
**Docs:** [github.com/7PH/react-powerglitch](https://github.com/7PH/react-powerglitch)

### Implementado Actualmente
- ✅ GlitchText con intensidades (low, medium, high)

---

### 1. Glitch on Hover

Efecto glitch activado solo al pasar el mouse.

**Configuración:**
```tsx
const glitch = useGlitch({
  playMode: "hover",
  timing: { duration: 500 }
});

<span ref={glitch.ref}>Hover me</span>
```

**Características:**
- Sin animación en estado idle
- Activa glitch instantáneamente al hover
- Se detiene al salir del elemento
- Menor consumo de recursos

**Casos de uso:**
- Botones de acción (Delete, Execute)
- Links de navegación
- Iconos interactivos
- Cards seleccionables

---

### 2. Glitch Manual/Triggered

Control programático del efecto glitch.

**Configuración:**
```tsx
const glitch = useGlitch({
  playMode: "manual"
});

// Trigger programáticamente
const handleError = () => {
  glitch.startGlitch();
  setTimeout(() => glitch.stopGlitch(), 2000);
};

<span ref={glitch.ref}>System Status</span>
```

**Características:**
- Inicio/parada bajo demanda
- Sincronizable con eventos del sistema
- Control total del timing
- Integrable con state management

**Casos de uso:**
- Alertas de seguridad (breach detected)
- Errores críticos del sistema
- Notificaciones importantes
- Estados de conexión perdida

---

### 3. Glitch con Hue Rotation

Rotación de color en los slices del glitch.

**Configuración:**
```tsx
const glitch = useGlitch({
  glitchTimeSpan: { start: 0.5, end: 0.7 },
  slice: {
    count: 6,
    velocity: 15,
    hueRotate: true
  }
});
```

**Características:**
- Efecto RGB/cromático
- Colores que cambian en cada slice
- Aspecto más "corrupto"
- Estilo CRT/retro

**Casos de uso:**
- Títulos principales
- Estados de error con énfasis
- Efectos de "hackeo"
- Transiciones dramáticas

---

### 4. Glitch con CSS Filters

Filtros CSS personalizados en slices.

**Configuración:**
```tsx
const glitch = useGlitch({
  slice: {
    count: 8,
    velocity: 20,
    cssFilters: "blur(2px) brightness(1.2) contrast(1.5)"
  }
});
```

**Filtros disponibles:**
- `blur(Xpx)` - Efecto borroso
- `brightness(X)` - Brillo (1 = normal)
- `contrast(X)` - Contraste
- `saturate(X)` - Saturación de color
- `invert(X)` - Inversión de colores

**Casos de uso:**
- Efecto de interferencia
- Simulación de señal débil
- Distorsión de datos
- Loading states especiales

---

### 5. Glitch Only Once

Efecto que se ejecuta una sola vez.

**Configuración:**
```tsx
const glitch = useGlitch({
  timing: {
    duration: 1000,
    iterations: 1
  },
  glitchTimeSpan: { start: 0, end: 1 }
});
```

**Características:**
- Un solo ciclo de animación
- Ideal para transiciones
- No consume recursos después
- Sincronizable con otras animaciones

**Casos de uso:**
- Entrada de elementos
- Revelación de texto
- Feedback de acciones
- Transiciones entre vistas

---

### 6. Micro Glitch (Sutil)

Glitch casi imperceptible para ambiente.

**Configuración:**
```tsx
const glitch = useGlitch({
  glitchTimeSpan: { start: 0.9, end: 0.95 },
  shake: {
    velocity: 5,
    amplitudeX: 0.02,
    amplitudeY: 0.01
  },
  slice: {
    count: 2,
    velocity: 5,
    minHeight: 0.01,
    maxHeight: 0.03
  },
  timing: { duration: 4000 }
});
```

**Características:**
- Muy corta duración
- Amplitud mínima
- Pocos slices
- Background noise visual

**Casos de uso:**
- Texto de terminal siempre visible
- Ambiente cyberpunk sutil
- Headers de secciones
- Elementos decorativos

---

### 7. Extreme Glitch (Caótico)

Glitch intenso y disruptivo.

**Configuración:**
```tsx
const glitch = useGlitch({
  glitchTimeSpan: { start: 0.1, end: 0.9 },
  shake: {
    velocity: 50,
    amplitudeX: 0.5,
    amplitudeY: 0.3
  },
  slice: {
    count: 15,
    velocity: 30,
    minHeight: 0.1,
    maxHeight: 0.4,
    hueRotate: true
  },
  timing: { duration: 500 }
});
```

**Características:**
- Alta frecuencia
- Muchos slices grandes
- Shake agresivo
- Muy visible

**Casos de uso:**
- Errores críticos
- Game over / System failure
- Easter eggs
- Momentos de impacto

---

### 8. Image Glitch

Aplicar glitch a imágenes o elementos visuales.

**Configuración:**
```tsx
const glitch = useGlitch({
  playMode: "hover",
  slice: { count: 4, hueRotate: true }
});

<img ref={glitch.ref} src="/avatar.png" alt="Avatar" />
```

**Características:**
- Funciona con cualquier elemento
- Imágenes, SVGs, videos
- Canvas elements
- Componentes React completos

**Casos de uso:**
- Avatares con efecto
- Iconos de estado
- Thumbnails
- Logos animados

---

## Efectos Type Animation

**Librería:** `react-type-animation` v3.2.0
**Docs:** [react-type-animation.netlify.app](https://react-type-animation.netlify.app/)

### Implementado Actualmente
- ✅ TypewriterText básico

---

### 1. Sequence con Delays

Múltiples textos con pausas controladas.

**Configuración:**
```tsx
import { TypeAnimation } from 'react-type-animation';

<TypeAnimation
  sequence={[
    'Initializing system...',
    1000,
    'Loading modules...',
    500,
    'Connecting to database...',
    800,
    'System ready.',
    2000,
  ]}
  repeat={Infinity}
  speed={50}
/>
```

**Características:**
- Delays en milisegundos
- Múltiples strings
- Transiciones automáticas
- Loop opcional

**Casos de uso:**
- Boot sequences
- Status updates
- Narrativas paso a paso
- Tutoriales guiados

---

### 2. Sequence con Callbacks

Ejecutar funciones en puntos específicos.

**Configuración:**
```tsx
const [status, setStatus] = useState('idle');
const [progress, setProgress] = useState(0);

<TypeAnimation
  sequence={[
    () => setStatus('scanning'),
    'Scanning network...',
    () => setProgress(25),
    1000,
    'Found 3 devices',
    () => setProgress(50),
    1000,
    'Analysis complete',
    () => { setProgress(100); setStatus('done'); },
  ]}
  speed={40}
/>
```

**Características:**
- Funciones inline
- Sincronización con state
- Trigger de animaciones
- Control de UI

**Casos de uso:**
- Progress bars sincronizados
- Cambios de color/estado
- Sonidos/efectos
- Navegación automática

---

### 3. Word-Level Typing

Tipeo palabra por palabra (estilo ChatGPT).

**Configuración:**
```tsx
<TypeAnimation
  sequence={[
    'This is a longer response that types word by word instead of character by character for a more natural feel.',
  ]}
  splitter={(str) => str.split(/(?= )/)}
  speed={{ type: 'keyStrokeDelayInMs', value: 80 }}
/>
```

**Características:**
- Más rápido que character-level
- Más natural para texto largo
- Mejor para respuestas AI
- Espacios preservados

**Casos de uso:**
- Respuestas de chatbot
- Descripciones largas
- Documentación inline
- Mensajes del sistema

---

### 4. Sin Animación de Borrado

Reemplazar texto sin efecto de delete.

**Configuración:**
```tsx
<TypeAnimation
  sequence={[
    'Status: Online',
    2000,
    'Status: Syncing',
    2000,
    'Status: Complete',
    2000,
  ]}
  omitDeletionAnimation={true}
  repeat={Infinity}
/>
```

**Características:**
- Transición instantánea
- Sin backspace visual
- Más limpio
- Mejor para estados

**Casos de uso:**
- Indicadores de estado
- Contadores/métricas
- Títulos que cambian
- Rotación de mensajes

---

### 5. Custom Wrapper Elements

Diferentes elementos HTML como contenedor.

**Configuración:**
```tsx
// Como título principal
<TypeAnimation
  sequence={['SYSTEM TERMINAL', 1000]}
  wrapper="h1"
  className={styles.terminalTitle}
/>

// Como párrafo
<TypeAnimation
  sequence={['Processing request...', 1000]}
  wrapper="p"
  className={styles.terminalOutput}
/>
```

**Wrappers disponibles:**
- `span` - Inline (default)
- `div` - Block
- `p` - Párrafo
- `h1`, `h2`, `h3` - Headings

**Casos de uso:**
- Títulos principales (h1)
- Párrafos de terminal (p)
- Inline text (span)
- Subtítulos (h2, h3)

---

### 6. Cursor Personalizado

Diferentes estilos de cursor.

**Configuración:**
```tsx
<TypeAnimation
  sequence={['Terminal input', 1000]}
  cursor={true}
  className="terminal-cursor"
/>
```

**CSS para estilos de cursor:**
```css
/* Pipe cursor (default) */
.terminal-cursor::after {
  content: '|';
}

/* Block cursor */
.terminal-cursor::after {
  content: '█';
}

/* Underscore cursor */
.terminal-cursor::after {
  content: '_';
}

/* Blinking animation */
.terminal-cursor::after {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}
```

**Casos de uso:**
- Terminal clásico (underscore)
- Editor moderno (pipe)
- Retro (block)
- Branded (custom)

---

### 7. Pre-rendered para SSR

Texto visible antes de hydration.

**Configuración:**
```tsx
<TypeAnimation
  preRenderFirstString={true}
  sequence={[
    'Welcome to Robot Resources',
    1000,
    'Initializing interface...',
    1000,
  ]}
/>
```

**Características:**
- SEO optimizado
- No flash de contenido vacío
- Mejor LCP
- Accesible sin JS

**Casos de uso:**
- Landing pages
- Headers principales
- Contenido crítico
- SEO-sensitive text

---

### 8. Repeat Controlado

Número específico de repeticiones.

**Configuración:**
```tsx
// Loop infinito
<TypeAnimation
  sequence={['Alert: Check system', 2000]}
  repeat={Infinity}
/>

// Solo 3 veces
<TypeAnimation
  sequence={['Warning!', 1000]}
  repeat={3}
/>

// Una sola vez (default)
<TypeAnimation
  sequence={['Welcome', 1000]}
  repeat={0}
/>
```

**Características:**
- Finito o infinito
- Callback en cada ciclo
- Pausa entre ciclos
- Estado de completado

**Casos de uso:**
- Alertas temporales (3 veces)
- Loops infinitos de status
- Demos/showcases
- Onboarding steps

---

## Animaciones Framer Motion

**Librería:** `framer-motion` v12.23.25
**Docs:** [motion.dev](https://motion.dev/)

---

### 1. Hover Animations

Efectos al pasar el mouse sobre elementos.

**Configuración:**
```tsx
import { motion } from 'framer-motion';

<motion.div
  className={styles.card}
  whileHover={{
    scale: 1.02,
    borderColor: "#FF6600",
    boxShadow: "0 0 20px rgba(255,102,0,0.3)"
  }}
  transition={{ duration: 0.2 }}
>
  Terminal Card
</motion.div>
```

**Propiedades animables:**
- `scale`, `rotate`, `x`, `y`
- `opacity`
- `backgroundColor`, `borderColor`
- `boxShadow`

**Casos de uso:**
- Cards interactivas
- Botones con feedback
- Items de lista
- Links con énfasis

---

### 2. Tap/Click Animations

Feedback visual al hacer click.

**Configuración:**
```tsx
<motion.button
  className={styles.button}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Execute Command
</motion.button>
```

**Características:**
- Respuesta inmediata
- Sensación táctil
- Spring physics
- Combinable con hover

**Casos de uso:**
- Botones de acción
- Toggles
- Checkboxes custom
- Touch interfaces

---

### 3. Drag & Drop

Elementos arrastrables con constraints.

**Configuración:**
```tsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300, top: 0, bottom: 200 }}
  dragElastic={0.2}
  dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
  whileDrag={{ scale: 1.1, cursor: "grabbing" }}
>
  Drag me
</motion.div>
```

**Opciones de drag:**
- `drag="x"` - Solo horizontal
- `drag="y"` - Solo vertical
- `drag={true}` - Ambos ejes

**Casos de uso:**
- Reordenar listas
- Paneles redimensionables
- Sliders custom
- Kanban boards

---

### 4. Scroll Progress

Barra de progreso vinculada al scroll.

**Configuración:**
```tsx
import { motion, useScroll } from 'framer-motion';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={styles.progressBar}
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "left"
      }}
    />
  );
}
```

**Valores disponibles:**
- `scrollY` - Pixels scrolleados
- `scrollYProgress` - Progreso 0-1
- `scrollX`, `scrollXProgress` - Horizontal

**Casos de uso:**
- Progress bar en header
- Indicador de lectura
- Parallax effects
- Scroll-triggered reveals

---

### 5. Viewport Entry Animations

Animar elementos al entrar en vista.

**Configuración:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.5 }}
>
  Appears on scroll
</motion.div>
```

**Opciones de viewport:**
- `once: true` - Anima solo la primera vez
- `amount: 0.3` - 30% visible para trigger
- `margin` - Offset del viewport

**Casos de uso:**
- Lazy reveal de contenido
- Log entries apareciendo
- Secciones de página
- Galleries

---

### 6. Staggered Children

Animación secuencial de hijos.

**Configuración:**
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

<motion.ul
  variants={containerVariants}
  initial="hidden"
  animate="show"
>
  {logs.map((log, i) => (
    <motion.li key={i} variants={itemVariants}>
      {log}
    </motion.li>
  ))}
</motion.ul>
```

**Características:**
- Delay entre elementos
- Orden controlable
- Propagación automática
- Reversible

**Casos de uso:**
- Listas de comandos
- Menús de navegación
- Grid de items
- Terminal log entries

---

### 7. Layout Animations

Transiciones automáticas entre layouts.

**Configuración:**
```tsx
<motion.div layout className={styles.panel}>
  <motion.h2 layout="position">Panel Title</motion.h2>
  {isExpanded && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Expanded content here
    </motion.div>
  )}
</motion.div>
```

**Opciones de layout:**
- `layout={true}` - Anima size y position
- `layout="position"` - Solo position
- `layout="size"` - Solo size

**Casos de uso:**
- Accordions
- Expandable cards
- Filtros con reorder
- Dynamic grids

---

### 8. Shared Element Transitions

Elementos que "vuelan" entre componentes.

**Configuración:**
```tsx
// En la lista
<motion.div layoutId={`card-${item.id}`}>
  <h3>{item.title}</h3>
</motion.div>

// En el modal/detalle
<AnimatePresence>
  {selectedItem && (
    <motion.div layoutId={`card-${selectedItem.id}`}>
      <h3>{selectedItem.title}</h3>
      <p>{selectedItem.description}</p>
    </motion.div>
  )}
</AnimatePresence>
```

**Características:**
- Mismo layoutId = transición
- Cross-component
- Morphing de forma
- Muy visual

**Casos de uso:**
- Lista → Detalle
- Thumbnail → Fullscreen
- Tab transitions
- Modal opens

---

### 9. Exit Animations (AnimatePresence)

Animar elementos al desmontarse.

**Configuración:**
```tsx
import { AnimatePresence, motion } from 'framer-motion';

<AnimatePresence mode="wait">
  {notifications.map((notif) => (
    <motion.div
      key={notif.id}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      {notif.message}
    </motion.div>
  ))}
</AnimatePresence>
```

**Modos disponibles:**
- `mode="sync"` - Default, simultáneo
- `mode="wait"` - Espera exit antes de enter
- `mode="popLayout"` - Para layout animations

**Casos de uso:**
- Toasts/notifications
- Modals
- Route transitions
- Conditional content

---

### 10. Spring Physics

Animaciones con física de resorte.

**Configuración:**
```tsx
<motion.div
  animate={{ x: 100, rotate: 180 }}
  transition={{
    type: "spring",
    stiffness: 260,
    damping: 20,
    mass: 1
  }}
/>
```

**Parámetros de spring:**
- `stiffness` - Rigidez (default: 100)
- `damping` - Amortiguación (default: 10)
- `mass` - Masa del objeto (default: 1)
- `velocity` - Velocidad inicial

**Presets comunes:**
```tsx
// Bouncy
{ stiffness: 300, damping: 10 }

// Smooth
{ stiffness: 100, damping: 20 }

// Snappy
{ stiffness: 400, damping: 30 }
```

**Casos de uso:**
- Botones con rebote
- Notificaciones que llegan
- Drag and drop
- Toggles animados

---

## Quick Reference

### PowerGlitch Presets

```tsx
// Error crítico
const criticalErrorGlitch = {
  playMode: "manual",
  slice: { count: 10, hueRotate: true },
  shake: { velocity: 40, amplitudeX: 0.4 },
  timing: { duration: 500 }
};

// Sutil ambiente
const subtleGlitch = {
  glitchTimeSpan: { start: 0.9, end: 0.95 },
  shake: { velocity: 5, amplitudeX: 0.02 },
  slice: { count: 2 },
  timing: { duration: 4000 }
};

// Hover interactivo
const hoverGlitch = {
  playMode: "hover",
  timing: { duration: 500 }
};

// Con filtros
const filterGlitch = {
  slice: {
    count: 6,
    cssFilters: "blur(1px) brightness(1.1)"
  }
};
```

### Type Animation Presets

```tsx
// Boot sequence
const bootSequence = [
  '[BOOT]',
  500,
  'Initializing...',
  1000,
  'Loading kernel...',
  800,
  'System ready.',
  () => onBootComplete()
];

// Status rotator
const statusRotator = {
  sequence: ['Online', 2000, 'Syncing...', 2000, 'Updated', 2000],
  repeat: Infinity,
  omitDeletionAnimation: true
};

// Word-level AI response
const aiResponse = {
  sequence: ['Your request has been processed successfully.'],
  splitter: (s: string) => s.split(/(?= )/),
  speed: { type: 'keyStrokeDelayInMs', value: 60 }
};

// Command + output
const commandOutput = [
  '$ npm run build',
  500,
  '\n✓ Build completed in 2.3s',
  1000
];
```

### Framer Motion Presets

```tsx
// Terminal card hover
const cardHover = {
  whileHover: {
    borderColor: "#FF6600",
    boxShadow: "0 0 15px rgba(255,102,0,0.2)"
  },
  transition: { duration: 0.2 }
};

// Log entry reveal
const logEntryReveal = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.3 }
};

// Stagger container
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

// Stagger item
const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

// Exit animation
const exitAnimation = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.2 }
};

// Spring button
const springButton = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
};
```

---

## Resumen por Librería

| Librería | Implementado | No Utilizado | Prioridad |
|----------|--------------|--------------|-----------|
| **Nivo Charts** | Line, Pie, StatCard | 28 tipos de gráficos | Alta |
| **PowerGlitch** | 3 intensidades | Hover, Manual, Filters, Hue | Media |
| **Type Animation** | Básico | Sequences, Callbacks, Word-level | Media |
| **Framer Motion** | Minimal | Gestures, Scroll, Layout, Exit | Alta |

---

## Checklist de Implementación

### Fase 1 - Quick Wins
- [ ] Radar Chart
- [ ] HeatMap
- [ ] Radial Bar
- [ ] Glitch on Hover
- [ ] Word-level TypewriterText
- [ ] Scroll progress bar

### Fase 2 - Medium Effort
- [ ] Sankey Diagram
- [ ] Calendar Heatmap
- [ ] TreeMap
- [ ] Triggered Glitch effects
- [ ] Type sequences con callbacks
- [ ] Staggered list animations

### Fase 3 - Advanced
- [ ] Network Graph
- [ ] Chord Diagram
- [ ] Custom CSS filters para glitch
- [ ] Layout transitions
- [ ] Shared element transitions
- [ ] Exit animations con AnimatePresence
