# 📘 Especificación Técnica: Módulo Simular

**Dependencias:** `Alg1_Selector`, `Alg2_Optimizer`, `Quafi_Market_Normalizer`, `Quafi_Math_Engine`.

---

## 1. Visión General y Arquitectura

El módulo **Simular** es el orquestador principal del onboarding de inversión. No realiza cálculos financieros *per se*, sino que coordina la ejecución secuencial de los motores matemáticos y lógicos de Quafi para presentar una propuesta de inversión viable al usuario.

### Diagrama de Secuencia de Ejecución
El flujo de datos debe respetar estrictamente el siguiente orden sincrónico:

1.  **Input Usuario:** `Monto`, `Riesgo`, `Plazo`.
2.  **Alg1 (Selector):** Filtra el universo de activos $\rightarrow$ Devuelve `List<Ticker>`.
3.  **Alg2 (Optimizer):** Calcula la Frontera Eficiente $\rightarrow$ Devuelve `Target_Weights %`.
4.  **Market Normalizer:** Cruza pesos con precios reales y capital $\rightarrow$ Devuelve `Nominales_Enteros` y `Warnings`.
5.  **Math Engine:** Proyecta flujos futuros sobre la cartera normalizada $\rightarrow$ Devuelve `Curvas Monte Carlo`.

---

## 2. Desarrollo Paso a Paso (Flujo de Pantallas)

### 🖥️ Paso 1: Definición de Parámetros (Input)

**Objetivo:** Capturar variables mandatorias para iniciar los algoritmos.

* **Layout UI:** Tarjeta central con formulario neumórfico.
* **Inputs:**
    1.  **Monto a Invertir (`capital`):** Input numérico. *Validación:* > 0.
    2.  **Perfil de Riesgo (`risk`):** Selector [Conservador, Moderado, Agresivo].
    3.  **Plazo (`horizon`):** Selector [Corto (1y), Medio (3y), Largo (5y+)].
* **Acción:** Botón "Analizar Mercado".
    * *Transición:* Debe mostrar una animación de carga (Overlay con Blur) con el texto: *"Ejecutando Quafi Engine IA..."* mientras el backend procesa la cadena de algoritmos (Selector, Optimizer, Market Normalizer, Math Engine).

---

### 🖥️ Paso 2: Normalización de Mercado (The Reality Check)

**Objetivo:** Mostrar la cartera "real" (ajustada a nominales enteros) y validar la suficiencia del capital.

**Lógica de Renderizado:**
Recibe el JSON del Backend (`Market Normalizer Output`) y renderiza:

1.  **Caja de Alerta (Warning Box):**
    * **Visibilidad:** Se muestra SOLO si el backend retorna `status: INSUFFICIENT_FUNDS` o `has_exclusions: true`.
    * **Contenido:** "Capital insuficiente. El mínimo requerido es **$X** determinado por el activo **Y**."
    * *Comportamiento:* Si la falta de capital es crítica (no se puede comprar nada), bloquear el botón "Siguiente".

2.  **Tabla de Activos (Grid):**
    * Columnas: Ticker, Peso Ideal (%), Precio Unitario, **Nominales (Q)**, Subtotal ($).
    * *Estilo:* Si `Nominales == 0`, resaltar la fila o el texto en rojo.

3.  **Footer Financiero:**
    * **Total Invertido:** Suma de `(Q * Precio)`.
    * **Remanente (Cash Drag):** `Capital_Usuario - Total_Invertido`. (Color Verde).

**Lógica Reactiva (Cliente/Servidor):**
* **Evento:** Usuario elimina un activo (clic en "X") o agrega un activo.
* **Proceso:**
    1.  Eliminar o agregar Ticker de la lista.
    2.  **Redistribución:** Se vuelve a llamar a `Alg2_Optimizer`.
    3.  **Re-Ejecución:** Se vuelve a llamar a `Quafi_Market_Normalizer` con los nuevos pesos.
    4.  **Update UI:** Se refrescan los nominales y el remanente en la tabla sin recargar la página.

---

### 🖥️ Paso 3: Dual Path (La Decisión)

**Objetivo:** Comparar métricas financieras proyectadas entre dos decisiones estratégicas.

**Renderizado de Tarjetas (Card A vs Card B):**

#### Opción A: Inyección (Complementar)
* **Definición:** El usuario mantiene su cartera actual y solo compra los activos nuevos con el dinero ingresado.
* **Cálculo de Caja (Neto):** `Monto a Invertir` (Paso 1) pasado por Market Normalizer.
* **Métricas Math Engine:** Se calculan simulando la cartera compuesta `(Holdings_Actuales + Nuevos_Nominales)` y se muestra comparación de kpi Ante`(cartera vieja)`->Después`(cartera simulada opcion A)`.

#### Opción B: Sustitución (Rotación - Recomendada)
* **Definición:** El usuario vende todo lo que tiene y compra la cartera óptima desde cero.
* **Cálculo de Caja (Neto):** $$Neto = Costo\_Nueva\_Cartera - (Valor\_Venta\_Cartera\_Vieja \times 0.99)$$
    *(El 0.99 simula un 1% de spread/costo de salida).*
* **Métricas Math Engine:** Se calculan simulando solo la `Cartera_Optima_Normalizada` y se muestra comparación de kpi Ante`(cartera vieja)`->Después`(cartera simulada opcion B)`.

---

## 3. Especificación Técnica del Algoritmo: Market Normalizer

Este módulo debe residir en el Backend y ser consumido por la UI del Paso 2.

**Nombre Módulo:** `MOD_NORM_01`

**Entradas (Inputs):**
* `K`: Capital del Usuario.
* `W_map`: Mapa de {Ticker: Peso_Objetivo} (Salida de Alg2).
* `P_map`: Mapa de {Ticker: Precio_Mercado}.

**Lógica del Algoritmo (Pseudocódigo):**

```python
def run_normalizer(K, W_map, P_map):
    portfolio = []
    total_invested = 0
    max_min_cap = 0
    constraint_asset = None
    
    # 1. Determinar Barreras de Entrada
    for ticker, weight in W_map:
        price = P_map[ticker]
        
        # Capital Mínimo para respetar el peso de este activo
        min_cap_asset = price / weight 
        
        if min_cap_asset > max_min_cap:
            max_min_cap = min_cap_asset
            constraint_asset = ticker

    # 2. Asignación de Nominales (Floor)
    for ticker, weight in W_map:
        price = P_map[ticker]
        
        # Cuánto dinero teórico corresponde
        theoretical_amt = K * weight
        
        # Nominales enteros (piso)
        qty = floor(theoretical_amt / price)
        
        real_amt = qty * price
        portfolio.append({
            ticker: ticker,
            qty: qty,
            amount: real_amt,
            is_excluded: (qty == 0 and weight > 0.05) # Warning flag
        })
        total_invested += real_amt

    # 3. Respuesta
    return {
        "portfolio": portfolio,
        "viability": {
            "min_capital_required": max_min_cap,
            "constraint_asset": constraint_asset,
            "is_sufficient": (K >= max_min_cap)
        },
        "financials": {
            "total_invested": total_invested,
            "cash_remnant": K - total_invested
        }
    }