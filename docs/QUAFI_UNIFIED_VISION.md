# Quafi - Unified Product Vision

> Documento unificado que sintetiza la visión del producto desde todas las fuentes: Backend (Hadi), Specs de Facu, y Design System.

**Creado:** 2026-03-02
**Fuentes:**
- `/Hadi/docs/VISION.md` — Visión del engine
- `/Hadi/docs/CONTEXT.md` — Contexto técnico y algoritmo
- `/Hadi/docs/ARCHITECTURE.md` — Arquitectura técnica
- `facus-files/*.pdf` — Especificaciones de módulos
- `CLAUDE.md` — Design System y brand

---

## Qué ES Quafi (en una oración)

**Quafi es un motor de optimización de portfolios basado en behavioral economics que entiende cómo los humanos realmente sienten el riesgo.**

---

## La Diferencia Clave

### Robo-Advisors Tradicionales (Betterment, Wealthfront)
- Asumen inversores **racionales**
- Usan **mean-variance optimization** (Markowitz 1952)
- Tratan pérdidas y ganancias **igual**
- Resultado: Portfolios matemáticamente óptimos, pero que **no reflejan cómo te sentís**

### Quafi
- Asume inversores **humanos reales**
- Usa **behavioral economics** (Kahneman & Tversky 1979)
- Las pérdidas duelen **1.4x más** que las ganancias alegran
- Resultado: Portfolios optimizados para **cómo realmente invertís**

---

## El Algoritmo (El "Engine")

### Creador
**Agustín Shehadi** — PhD Economics, 15 años de investigación.

### Fundamento Académico
- Basado en **Prospect Theory** (Kahneman & Tversky, Nobel Prize 2002)
- Incorpora **Loss Aversion** (las pérdidas duelen más)
- Incorpora **Habit Formation** (inercia del portfolio)
- Publicado en tesis de maestría (2024)

### Resultados Probados
| Sector | Retorno vs Sharpe Tradicional | Volatilidad |
|--------|-------------------------------|-------------|
| Tech | +104% más retorno | +8% |
| Banking | +95% más retorno | +10% |
| Pharma | +52% más retorno | **-3%** ✨ |

**15 años de backtesting (2009-2024). Outperforms S&P500 consistentemente.**

*Esto NO es vaporware. Agustín lo usó para pagar su boda y el auto de su hermano.*

### La Fórmula (Behavioral Utility Function)
```
U(rt, σt) = {
    rt - (α₁/2)×σ²t + β×U(t-1)  si rt < 0  (pérdidas)
    rt + (α₂/2)×σ²t + β×U(t-1)  si rt ≥ 0  (ganancias)
}

Parámetros calibrados:
- α₁ = 3.73 (risk aversion)
- α₂ = 5.22 (loss aversion, λ=1.4)
- β = 1/1.0408 (temporal discount, basado en Treasury 10Y)
```

---

## Los Tres Módulos

### 1. Calibrate (Calibrar)
**Qué hace:** Optimiza tu portfolio actual.

**Flujo Básico:**
- Toma tus holdings actuales
- Corre Alg2 (ponderación)
- Te dice qué comprar/vender para optimizar

**Flujo Pro (Market Scan):**
- Escanea ~50 tickers del mercado (Alg1)
- Detecta **Oportunidades**: acciones que NO tenés pero deberías
- Detecta **Rotación**: acciones que tenés pero deberías vender
- Recalcula el portfolio óptimo

### 2. Simulate (Simular)
**Qué hace:** Crea un portfolio desde cero según tu perfil de riesgo.

**Flujo:**
1. Elegís perfil de riesgo (Conservative/Balanced/Aggressive)
2. Elegís plazo (Short/Medium/Long)
3. Ingresás monto a invertir
4. El sistema genera el portfolio óptimo
5. Dos escenarios: Comprar nuevo vs Sustituir existente

### 3. Reports (Reportes)
**Qué hace:** Analiza y proyecta tu portfolio.

**Secciones:**
- **The Pulse**: Resumen ejecutivo (TWR, Sharpe, valor total)
- **The Market Race**: Comparación vs SPY, QQQ
- **The Engine**: Composición y correlación
- **The Harvest**: Proyección Monte Carlo (3/6/12 meses)

---

## Visión a Futuro

### No es solo un optimizer
> "We're not building a portfolio optimizer. We're building a **financial product factory**."

### Composable Engine
El mismo motor puede crear:
- Robo-advisor para retail
- Newsletter semanal con recomendaciones
- API para asesores financieros
- Dashboard institucional
- Reportes de research

**Same engine, different products.**

### Roadmap
| Fase | Productos |
|------|-----------|
| 0-6 meses | Quafi App (Calibrate, Simulate, Reports) |
| 6-12 meses | API Marketplace, Advisor Platform |
| 12+ meses | Autonomous Trading, Multi-Asset Engine |

---

## Brand Identity

### Nombre
**Quafi** = Quiet + Qualify/Quantify

(Nota: Internamente el proyecto se llamaba FING = FINance + enGINe)

### Personalidad
El **Senior Analyst** — alguien que:
- Ha visto ciclos completos
- No se impresiona por el ruido diario
- Solo habla cuando hay algo que valga la pena decir

### Taglines
| Tagline | Qué comunica |
|---------|--------------|
| "Investment engine" | Qué es |
| "Quiet intelligence" | Personalidad |
| "The long view" | Filosofía |

### Voz
**Decimos:**
- "The market shows signs of consolidation"
- "We observe moderate risk"
- "Analysis suggests a neutral position"

**NO decimos:**
- "BUY NOW! Don't miss this!"
- "We guarantee 20% returns"
- "ALERT: Market crash imminent!"

---

## Para el Coming Soon

### La Propuesta de Valor en una Oración

**Opción A (Técnica):**
> "Portfolio optimization powered by behavioral economics."

**Opción B (Emocional):**
> "Portfolios optimized for how you actually feel about risk."

**Opción C (Diferenciación):**
> "Not just math. Human intelligence."

**Opción D (Resultado):**
> "Smarter portfolios. Quieter mind."

### Puntos Clave para Comunicar
1. **Basado en ciencia real** — behavioral economics, no especulación
2. **Probado** — 15 años de backtesting, outperforms S&P500
3. **Para humanos reales** — entiende que las pérdidas duelen más
4. **Simple** — solo decimos lo que importa

---

## Equipo

| Rol | Persona | Responsabilidad |
|-----|---------|-----------------|
| Algoritmo | Agustín | PhD, creador del engine, domain expertise |
| Engineering | Mauricio | CTO, arquitectura, producto |
| UX/UI | Rafa | Design system, frontend, branding |
| Specs/PM | Facu | Especificaciones de módulos |

---

## Links a Documentos Fuente

- **Engine Vision:** `/Hadi/docs/VISION.md`
- **Algorithm Context:** `/Hadi/docs/CONTEXT.md`
- **Architecture:** `/Hadi/docs/ARCHITECTURE.md`
- **Paper Original:** `/Hadi/docs/paper.pdf`
- **Spec Calibrar:** `facus-files/Spec_Calibrar.pdf`
- **Spec Simular:** `facus-files/Spec_Simular.pdf`
- **Spec Reportes:** `facus-files/spec_reporte_v4.pdf`
- **Design System:** `CLAUDE.md`

---

## Meta

- **Versión:** 1.0.0
- **Creado:** 2026-03-02
- **Actualizado:** 2026-03-02
- **Autor:** Claude (síntesis de fuentes existentes)
- **Próxima revisión:** Cuando se agregue nueva funcionalidad
