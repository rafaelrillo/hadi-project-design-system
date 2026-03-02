# 🧠 Quafi Math Engine (Core) v1.0

**Estado:** Final / Aprobado  
**Estándar:** GIPS Compliant (Global Investment Performance Standards)  
**Propósito:** Librería central de cálculo financiero desacoplada de la interfaz de usuario.

---

## 1. Módulo de Rendimiento (Performance)

Este módulo calcula el "Track Record" del usuario.

### 1.1. Retorno Ponderado por Tiempo (TWR - Time Weighted Return)
**Objetivo:** Calcular la rentabilidad de la gestión aislando las distorsiones provocadas por los flujos de dinero (aportes/retiros) del cliente.
**Método:** Se fragmenta el periodo total en sub-periodos cada vez que ocurre un flujo de caja externo.

**Fórmula General:**
$$R_{TWR} = [(1 + r_1) \times (1 + r_2) \times ... \times (1 + r_n)] - 1$$

**Fórmula del Sub-periodo ($r_i$):**
$$r_i = \frac{V_{fin} - CF_{ext}}{V_{ini}} - 1$$

**Diccionario de Variables:**
* **$r_i$ (Float):** Retorno del sub-periodo $i$.
* **$V_{fin}$ (Currency):** Valor total de mercado de la cartera al **final** del sub-periodo, *incluyendo* el flujo de caja ocurrido ese día.
* **$V_{ini}$ (Currency):** Valor total de mercado de la cartera al **inicio** del sub-periodo (inmediatamente después del flujo del periodo anterior).
* **$CF_{ext}$ (Currency, Signed):** Flujo de Caja Externo (External Cash Flow).
    * Es **Positivo (+)** si es un **Depósito** (aporte de capital fresco).
    * Es **Negativo (-)** si es un **Retiro** (extracción de capital hacia fuera de la app).
    * *Nota:* Dividendos o cupones cobrados **NO** son $CF_{ext}$ (son flujos internos); por lo tanto, no ajustan el denominador, solo aumentan $V_{fin}$.

---

### 1.2. Rendimiento Real (Inflation Adjusted)
**Objetivo:** Mostrar cuánto ganó el usuario en poder adquisitivo real, descontando el efecto inflacionario.

**Fórmula (Fisher):**
$$R_{real} = \frac{1 + R_{nom}}{1 + i_{infl}} - 1$$

**Diccionario de Variables:**
* **$R_{real}$ (Float):** El retorno depurado. Si es positivo ($>0$), el usuario ganó poder de compra.
* **$R_{nom}$ (Float):** El retorno nominal calculado previamente (TWR).
* **$i_{infl}$ (Float):** La tasa de inflación acumulada para exactamente el mismo periodo de tiempo que $R_{nom}$.
    * *Fuente:* Variación porcentual del índice IPC, CER o UVA entre `Fecha_Inicio` y `Fecha_Fin`.

---

## 2. Módulo de Riesgo (Risk Engine)

Este módulo evalúa la estructura y la exposición de la cartera.

### 2.1. Matriz de Covarianza (Core del Heatmap)
**Objetivo:** Calcular la interdependencia matemática entre todos los pares de activos del universo seleccionado.

**Fórmula de Covarianza:**
$$Cov(X, Y) = \frac{\sum_{i=1}^{N} (R_{x,i} - \bar{R}_x)(R_{y,i} - \bar{R}_y)}{N-1}$$

**Fórmula de Correlación (Normalizada para Visualización):**
$$\rho_{X,Y} = \frac{Cov(X, Y)}{\sigma_X \sigma_Y}$$

**Diccionario de Variables:**
* **$X, Y$ (Assets):** Dos activos distintos (ej. "Acción de Apple" y "Bono del Tesoro").
* **$R_{x,i}, R_{y,i}$ (Float):** El retorno logarítmico diario del activo X e Y en el día $i$.
    * Cálculo: $ln(\frac{Precio_i}{Precio_{i-1}})$.
* **$\bar{R}_x, \bar{R}_y$ (Float):** El promedio (media aritmética) de los retornos diarios de X e Y durante el periodo.
* **$N$ (Integer):** Número total de días de la muestra (Estándar: 252 días bursátiles).
* **$\sigma_X, \sigma_Y$ (Float):** Desviación estándar de los retornos diarios de X e Y.

---

### 2.2. Ratio de Sharpe (Eficiencia)
**Objetivo:** Determinar si el retorno obtenido justifica el riesgo asumido (Rentabilidad ajustada al riesgo).

**Fórmula:**
$$Sharpe = \frac{R_p - R_f}{\sigma_p}$$

**Diccionario de Variables:**
* **$R_p$ (Float):** Retorno Anualizado de la Cartera (CAGR).
* **$R_f$ (Float):** Tasa Libre de Riesgo (Risk-Free Rate).
    * *Proxy:* Rendimiento del Bono del Tesoro USA a 10 años (T-Bill 10Y) o Tasa de Referencia local si la cartera es 100% moneda local.
* **$\sigma_p$ (Float):** Volatilidad Anualizada de la Cartera.
    * Cálculo: Desviación estándar de los retornos diarios multiplicada por $\sqrt{252}$.

---

### 2.3. Drawdown (Caída desde Máximos)
**Objetivo:** Medir la pérdida máxima virtual que ha sufrido la cartera desde su punto más alto (High Watermark).

**Fórmula:**
$$DD_t = \frac{V_t - V_{pico}}{V_{pico}}$$

**Diccionario de Variables:**
* **$V_t$ (Currency):** Valor de la cartera en el día $t$ (día actual o de cierre).
* **$V_{pico}$ (Currency):** El valor máximo histórico que la cartera alcanzó en cualquier momento *antes* del día $t$.
    * *Lógica:* Si $V_t > V_{pico\_anterior}$, entonces $DD_t = 0$ y se establece un nuevo pico máximo.

---

## 3. Módulo de Proyección (Forecasting)

Este módulo estima escenarios futuros para la toma de decisiones.

### 3.1. Proyección Monte Carlo Paramétrica (Movimiento Browniano)
**Objetivo:** Generar el cono de incertidumbre futura (Bandas Optimista, Esperada y Pesimista). Se utiliza el modelo log-normal de precios.

**Fórmula de Valor Esperado (Media):**
$$V_{t} = V_0 \times e^{(\mu - \frac{\sigma^2}{2})t}$$

**Fórmula de Bandas de Confianza (Superior/Inferior):**
$$V_{banda} = V_0 \times e^{(\mu - \frac{\sigma^2}{2})t \pm Z \times \sigma \sqrt{t}}$$

**Diccionario de Variables:**
* **$V_t$ / $V_{banda}$ (Currency):** Valor proyectado de la cartera en el futuro ($t$).
* **$V_0$ (Currency):** Valor actual de la inversión inicial (Monto ingresado por usuario o NAV actual).
* **$e$ (Constante):** Número de Euler (aprox. 2.71828).
* **$\mu$ (Mu - Float):** Drift o Retorno Esperado Anualizado.
    * Cálculo: Promedio histórico de retornos logarítmicos diarios $\times 252$.
* **$\sigma$ (Sigma - Float):** Volatilidad Anualizada Histórica.
* **$t$ (Float):** Horizonte de proyección en años (Ej: 6 meses = 0.5, 1 año = 1.0).
* **$Z$ (Float):** Z-Score para el intervalo de confianza.
    * Para 95% confianza: $Z = 1.96$.

---

### 3.2. Cashflow Engine (Flujos de Fondos Proyectados)
**Objetivo:** Calcular la liquidez futura generada por los activos (Yield).

**Fórmula:**
$$CF_{total} = \sum_{k=1}^{M} (Q_k \times VR_k \times Tasa_k)$$

**Diccionario de Variables:**
* **$CF_{total}$ (Currency):** Monto total a cobrar en una fecha específica (ej. 30/Junio).
* **$M$ (Integer):** Cantidad de activos en cartera que pagan renta en esa fecha.
* **$Q_k$ (Integer/Float):** "Quantity". Cantidad de nominales poseídos del activo $k$.
* **$VR_k$ (Float):** "Valor Residual" del activo $k$.
    * *Acciones:* 1.0.
    * *Bonos Amortizables:* % del capital que aún no ha sido devuelto (ej. 0.80).
* **$Tasa_k$ (Float):** Tasa del cupón o dividendo a pagar (ej. 0.04 para 4%).

---
*Documentación generada para Quafi - Confidential.*