# 📘 Especificación Técnica: Módulo Calibrar

**Dependencias:** `Alg1_Selector`, `Alg2_Optimizer`, `Quafi_Market_Normalizer`, `Quafi_Math_Engine`.

---

## 1. Visión General
El módulo **Calibrar** es el centro de operaciones para el mantenimiento de la cartera. Su objetivo es llevar la cartera actual del usuario ($P_{actual}$) hacia una frontera eficiente ($P_{target}$) mediante la ejecución de un plan de rebalanceo preciso.

*Calibrar* gestiona la realidad operativa, calculando órdenes de compra/venta exactas (Nominales) y el flujo de caja neto necesario para ejecutar la optimización.

---

## 2. Arquitectura de Flujos Convergentes

El módulo opera bajo dos flujos posibles
Flujo 1 (2.1): Optimizar los pesos de los activos que el usuario YA posee. (funcionalidad pensada para MVP)
Flujo 2 (2.2): Mejorar la calidad de la cartera mediante sugerencias de oportunidades de compra (si el cliente no posee un ticker bien ranqueado) o venta (si el cliente posee un ticker mal ranqueado) `Alg1 Selector`. (funcionalidad PRO)

### 2.1. Flujo 1: Rebalanceo Interno (Core)
* **Objetivo:** Optimizar los pesos de los activos que el usuario YA posee.
* **Lógica:** Si un activo ha subido mucho de precio, ocupa más % del deseado $\rightarrow$ El sistema sugiere VENDER el excedente para comprar los activos rezagados.
* **Modulos:** Alg2 Calibrate, Market Normalizer y Math Engine.

### 2.2. Flujo 2: Market Intelligence (Alpha & Detox)
* **Objetivo:** Mejorar la calidad de la cartera mediante sugerencias de `Alg1 Selector`.
* **Entradas:**
    * **Oportunidades (Alpha):** Tickers no poseídos con alto ranking. (Acción: `AGREGAR`).
    * **Lastres (Toxic):** Tickers poseídos con bajo ranking. (Acción: `VENDER TODO`).
* **Interacción:** El usuario activa/desactiva "Switches". Estos cambios no se ejecutan inmediatamente, se encolan hasta presionar "Aplicar Cambios".
* **Modulos:** Alg1 Selector, Alg2 Calibrate, Market Normalizer y Math Engine.

---

## 3. Lógica del Motor de Cálculo (Backend)

La ejecución se dispara únicamente al llamar a `run_calibration_engine()`.

### Paso A: Definición del Universo Activo
Se construye la lista de activos que participarán en la nueva cartera:
$$U_{target} = U_{actual} + \{Seleccionados\_Alg1\} - \{Descartados\_Alg1\}$$

### Paso B: Asignación de Pesos (Alg2 Optimizer)
Se ejecuta `Alg2` sobre $U_{target}$.
* **Regla de Suma Cero:** La suma de los pesos objetivo ($W_{target}$) debe ser estrictamente **100%**.
* *Nota:* Si se elimina un activo, su peso se redistribuye proporcionalmente entre los restantes.

### Paso C: Normalización Operativa (Market Normalizer)
Cruzamos los pesos ideales con el capital total ($K$) y los precios de mercado ($P$).

Para cada activo $i$ en $U_{target}$:
1.  **Tenencia Target ($Q_{tgt}$):**
    $$Q_{tgt, i} = \lfloor \frac{K \times W_{target, i}}{P_i} \rfloor$$
2.  **Operación ($\Delta Q$):**
    $$\Delta Q_i = Q_{tgt, i} - Q_{actual, i}$$
3.  **Monto Estimado ($\Delta \$ $):**
    $$\Delta \$ = \Delta Q_i \times P_i$$

### Paso D: Impacto Financiero (Math Engine)
Se calculan las métricas comparativas:
* **Antes:** Métricas de la cartera $Q_{actual}$.
* **Después:** Métricas de la cartera simulada $Q_{tgt}$.
* **Neto de Caja (The Ticket):** Sumatoria de todos los $\Delta \$ $.
    * Si $\sum > 0$: El usuario debe **PAGAR** (Inversión Adicional).
    * Si $\sum < 0$: El usuario **RECIBE** (Sobrante/Retiro).

---

## 4. Interfaz de Usuario: Matriz de Rebalanceo

La tabla central es el corazón del módulo. Debe contener estrictamente las siguientes **7 Columnas**:

| Columna | Definición Técnica | Visualización UI |
| :--- | :--- | :--- |
| **1. Activo** | `Ticker` + `MarketPrice` | Texto principal + Subtexto precio. |
| **2. % Actual** | $(Val_{actual} / K_{total})$ | Barra de progreso **Gris** + Texto %. |
| **3. % Target** | Output de `Alg2` | Barra de progreso **Color Primario** + Texto %. |
| **4. T. Actual** | `Qty_Held` (DB) | Badge Gris (`10 u.`). |
| **5. T. Target** | `Qty_Calc` (Normalizer) | Badge Azul/Outline (`15 u.`). |
| **6. Operación** | $\Delta Q$ | Texto coloreado: `+5` (Verde) / `-2` (Rojo). |
| **7. Monto ($)** | $\Delta Q \times Price$ | `-$2,250` (Alineado a derecha). |

---

## 5. Contrato de API (Data Structures)

### Request: `POST /api/v1/calibrate/calculate`
```json
{
  "portfolio_id": "usr_55a",
  "total_equity": 10000.00,
  "flow_2_modifiers": {
    "add_tickers": ["NVDA", "GLD"],
    "remove_tickers": ["KO"] // Tickers que el usuario decidió liquidar
  }
}