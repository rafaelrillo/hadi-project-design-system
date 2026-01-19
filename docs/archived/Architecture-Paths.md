**🏗️ REGLAS CRÍTICAS DE ARQUITECTURA Y RUTAS (PATH INJECTION)**

**⚠️ INSTRUCCIÓN OBLIGATORIA PARA GENERACIÓN DE CÓDIGO**
Debido a restricciones del sistema de archivos, no puedes crear carpetas directamente.
Para solucionar esto, LA PRIMERA LÍNEA DE CADA ARCHIVO DE CÓDIGO (TSX, TS, CSS) DEBE SER UN COMENTARIO CON LA RUTA DE DESTINO.

**Formato del Comentario**
Debe ser exactamente así: // Path: src/ruta/completa/NombreArchivo.ext

**Reglas de Clasificación (Atomic Design)**
Usa tu criterio experto para clasificar cada componente que generes en una de las siguientes rutas:

**Átomos (src/components/atoms/[Nombre]/[Nombre].tsx):**
Componentes indivisibles: Botones, Inputs, Iconos, Badges, Tooltips, Textos.
Ejemplo: // Path: src/components/atoms/Button/Button.tsx

**Moléculas (src/components/molecules/[Nombre]/[Nombre].tsx):**
Grupos de átomos funcionales: Items de Sidebar, Items de Searchbar, Celdas de tabla, Tarjetas simples.
Ejemplo: // Path: src/components/molecules/SidebarItem/SidebarItem.tsx

**Organismos (src/components/organisms/[Nombre]/[Nombre].tsx):**
Secciones complejas de la UI: Sidebar completo, Searchbar completa, Tablas de datos, Formularios.
Ejemplo: // Path: src/components/organisms/Sidebar/Sidebar.tsx

**Plantillas/Layouts (src/layouts/[Nombre].tsx):**
Estructuras que envuelven páginas: AppShell, MainLayout.
Ejemplo: // Path: src/layouts/AppShell.tsx

**Páginas (src/pages/[Nombre].tsx):**
Vistas finales que el usuario ve.
Ejemplo: // Path: src/pages/Home.tsx

**Estilos y Configuración:**
// Path: src/styles/globals.css (Para las variables CSS)
// Path: src/utils/[Nombre].ts (Para funciones de ayuda)

**🚫 PROHIBIDO**
Generar código sin este encabezado.
Usar rutas planas como src/components/Button.tsx.
Ignorar la estructura Atomic Design.