# Quafi - Product Definition

> Fuente de verdad del producto. Qué es, qué hace, para quién, y hacia dónde vamos.

**Última actualización:** 2026-03-02
**Responsable:** Equipo Quafi

---

## 1. Qué es Quafi

**Quafi es un servicio de optimización de portfolios de inversión.**

Dado un conjunto de acciones (o un perfil de riesgo), Quafi calcula:
- **Qué acciones tener** (selección)
- **Cuánto de cada una** (ponderación)
- **Qué ajustes hacer** si ya tenés un portfolio (rebalanceo)

---

## 2. Qué lo hace diferente

### El problema con los métodos tradicionales

Los optimizadores tradicionales (Markowitz, mean-variance) asumen que el inversor es "racional":
- Pérdida de $100 = Ganancia de $100 (matemáticamente equivalentes)

**Esto no refleja la realidad.** Los humanos sentimos las pérdidas más intensamente que las ganancias.

### La solución de Quafi

El algoritmo de Quafi (desarrollado por Agustín Shehadi, PhD Economics) incorpora **behavioral economics**:

- **Loss aversion:** Las pérdidas pesan 1.4x más que las ganancias equivalentes
- **Habit formation:** El portfolio tiene inercia (no cambia todo de golpe)
- **Parámetros calibrados:** Basados en investigación académica (Kahneman & Tversky)

### Resultado

Portfolios que:
1. Rinden bien financieramente
2. Se ajustan a cómo los humanos realmente perciben el riesgo
3. Son más estables (menos rotación innecesaria)

**Validación:** 15 años de backtesting (2009-2024). Outperforms S&P500.

---

## 3. Cómo funciona (técnico)

### Los dos algoritmos

```
┌─────────────────────────────────────────────────────────────┐
│                        QUAFI ENGINE                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐         ┌─────────────────┐           │
│  │   ALGORITMO 1   │         │   ALGORITMO 2   │           │
│  │   (Selección)   │         │  (Ponderación)  │           │
│  ├─────────────────┤         ├─────────────────┤           │
│  │ Input:          │         │ Input:          │           │
│  │ - Universo de   │         │ - Lista de      │           │
│  │   acciones      │         │   acciones      │           │
│  │ - Datos de      │         │ - Capital       │           │
│  │   mercado       │         │ - Parámetros    │           │
│  │                 │         │   de riesgo     │           │
│  ├─────────────────┤         ├─────────────────┤           │
│  │ Output:         │         │ Output:         │           │
│  │ - Ranking de    │         │ - Peso óptimo   │           │
│  │   acciones por  │         │   para cada     │           │
│  │   utilidad      │         │   acción (%)    │           │
│  │ - Score de      │         │ - Métricas      │           │
│  │   cada una      │         │   (retorno,     │           │
│  │                 │         │   volatilidad,  │           │
│  │                 │         │   Sharpe)       │           │
│  └─────────────────┘         └─────────────────┘           │
│                                                             │
│  Alg1 responde: ¿QUÉ acciones?                             │
│  Alg2 responde: ¿CUÁNTO de cada una?                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Flujo típico

```
1. Usuario tiene $10,000 y quiere invertir
   ↓
2. Alg1 escanea mercado → Top 15 acciones recomendadas
   ↓
3. Alg2 calcula pesos → AAPL 12%, MSFT 10%, NVDA 8%, ...
   ↓
4. Sistema genera órdenes → Comprar 5 AAPL, 3 MSFT, 2 NVDA...
```

---

## 4. Módulos de la aplicación

### 4.1 Calibrate (Calibrar)

**Propósito:** Optimizar un portfolio existente.

**Input:**
- Portfolio actual del usuario (acciones y cantidades)
- Capital disponible

**Output:**
- Órdenes de compra/venta para llegar al portfolio óptimo
- Métricas antes vs después

**Dos modos:**

| Modo | Qué hace |
|------|----------|
| **Básico** | Rebalancea solo las acciones que ya tenés |
| **Pro (Market Scan)** | Sugiere agregar nuevas acciones (oportunidades) y sacar las de bajo rendimiento (rotación) |

---

### 4.2 Simulate (Simular)

**Propósito:** Crear un portfolio desde cero.

**Input:**
- Perfil de riesgo (Conservador / Moderado / Agresivo)
- Plazo (Corto / Mediano / Largo)
- Monto a invertir

**Output:**
- Portfolio óptimo completo
- Lista de órdenes de compra
- Métricas proyectadas

---

### 4.3 Reports (Reportes)

**Propósito:** Analizar un portfolio existente.

**Secciones:**

| Sección | Contenido |
|---------|-----------|
| **The Pulse** | Resumen ejecutivo: valor total, retorno, Sharpe |
| **The Market Race** | Comparación vs benchmarks (S&P500, QQQ) |
| **The Engine** | Composición, correlación entre activos |
| **The Harvest** | Proyección a futuro (Monte Carlo) |

---

## 5. Modelo de negocio

### Estructura

```
┌─────────────────────────────────────────────────────────────┐
│                      QUAFI BUSINESS                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    B2B (Principal)                   │   │
│  │                                                      │   │
│  │  Clientes: Fintech, Brokers, Asesores financieros   │   │
│  │  Producto: API de optimización                      │   │
│  │  Modelo: Por llamada o suscripción mensual          │   │
│  │                                                      │   │
│  │  Ejemplo de uso:                                     │   │
│  │  - Broker integra Quafi en su app                   │   │
│  │  - Usuario del broker pide "optimizar mi portfolio" │   │
│  │  - Broker llama a Quafi API                         │   │
│  │  - Quafi devuelve recomendaciones                   │   │
│  │  - Broker muestra resultados al usuario             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  B2C (Secundario)                    │   │
│  │                                                      │   │
│  │  Clientes: Inversores individuales (pocos)          │   │
│  │  Producto: App web Quafi                            │   │
│  │  Modelo: Freemium o suscripción                     │   │
│  │                                                      │   │
│  │  Propósito:                                          │   │
│  │  - Validar el producto con usuarios reales          │   │
│  │  - Showcase para vender B2B                         │   │
│  │  - No es el foco principal de revenue               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Revenue streams (futuro)

| Canal | Modelo | Target |
|-------|--------|--------|
| API | Por llamada ($0.01-0.10) o mensual ($100-1000) | Fintech, brokers |
| White-label | Licencia + customización | Institucionales |
| B2C App | Suscripción ($10-50/mes) | Inversores individuales |

---

## 6. Roadmap

### MVP (Actual)

**Objetivo:** Validar que el producto funciona end-to-end.

**Alcance:**
- App web funcional (Calibrate, Simulate, Reports)
- Conectada al backend Hadi
- Para uso interno del equipo

**NO incluye:**
- Autenticación de usuarios reales
- Conexión a brokers
- Ejecución automática de órdenes
- API pública

---

### Fase 1: B2C Beta (3-6 meses)

**Objetivo:** Validar con usuarios reales.

**Alcance:**
- Autenticación básica
- Usuarios ingresan portfolio manualmente
- Recomendaciones (sin ejecución automática)
- Feedback loop

---

### Fase 2: API + B2B (6-12 meses)

**Objetivo:** Monetización.

**Alcance:**
- API documentada y pública
- Dashboard para clientes B2B
- Pricing y billing
- Primeros clientes pagos

---

### Fase 3: Scale (12+ meses)

**Objetivo:** Crecimiento.

**Alcance:**
- Conexión directa a brokers (ejecución automática)
- Más asset classes (bonds, crypto, ETFs)
- Multi-mercado (no solo US)

---

## 7. Equipo

| Rol | Persona | Responsabilidad |
|-----|---------|-----------------|
| Algoritmo / Research | Agustín | Creador del engine, validación matemática |
| Engineering / Product | Mauricio | Backend, arquitectura, producto |
| UX / UI / Frontend | Rafa | Design system, interfaz, branding |
| PM / Specs | Facu | Especificaciones de módulos |

---

## 8. Glosario

| Término | Significado |
|---------|-------------|
| **Portfolio** | Conjunto de acciones que posee un inversor |
| **Rebalanceo** | Ajustar las cantidades para volver a los pesos óptimos |
| **Weight / Peso** | Porcentaje del portfolio en cada acción |
| **Sharpe Ratio** | Métrica de retorno ajustado por riesgo |
| **Loss Aversion** | Tendencia humana a sentir más las pérdidas que las ganancias |
| **Behavioral Economics** | Economía que incorpora psicología humana real |
| **Alg1** | Algoritmo de selección (qué acciones) |
| **Alg2** | Algoritmo de ponderación (cuánto de cada una) |

---

## 9. Links

| Documento | Ubicación |
|-----------|-----------|
| Backend (Hadi) | `/Hadi/` |
| Frontend (Design System) | `/hadi-project-design-system/` |
| Specs de Facu | `facus-files/` |
| Paper académico | `/Hadi/docs/paper.pdf` |

---

## 10. Changelog

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-03-02 | Documento inicial | Rafa + Claude |

