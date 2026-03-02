// Path: src/pages/molecules/MetricCardShowcase.tsx
// QUAFI Design System - Glass-Neumorphism Metric Cards
import { useMemo } from "react";
import { MetricCard } from "../../components/molecules/MetricCard";
import { ShowcaseSection } from "../../components/showcase";
import {
  LightEngineProvider,
  useLightEngine,
} from "@/contexts/LightEngineContext";
import {
  DollarSign,
  Users,
  TrendingUp,
  ShoppingCart,
  Activity,
  Percent,
} from "lucide-react";
import { showcase } from "../showcaseStyles";

function MetricCardContent() {
  const { lightAngle } = useLightEngine();

  const shadowOffsets = useMemo(() => {
    const shadowAngle = (lightAngle + 180) * (Math.PI / 180);
    return { x: Math.cos(shadowAngle), y: Math.sin(shadowAngle) };
  }, [lightAngle]);

  const getNeuInsetShadow = (distance: number, blur: number): string => {
    const { x, y } = shadowOffsets;
    return `inset ${x * distance}px ${y * distance}px ${blur}px var(--shadow-dark), inset ${-x * distance}px ${-y * distance}px ${blur}px var(--shadow-light)`;
  };

  const sparklineData = [10, 15, 12, 18, 22, 19, 25, 28, 24, 30, 35, 32];

  return (
    <div
      style={{
        background: "var(--marble-base)",
        minHeight: "100%",
        padding: "24px",
      }}
    >
      <header style={showcase.header.container}>
        <h1 style={showcase.header.title}>&gt; MetricCard_</h1>
        <p style={showcase.header.description}>
          // Card versatil para KPIs con tendencias y visualizaciones
        </p>
      </header>

      <ShowcaseSection
        title="MetricCard Básico"
        description="Card simple con título y valor"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <MetricCard title="Revenue" value={45320} format="currency" />
          <MetricCard title="Users" value={1284} format="number" />
          <MetricCard title="Growth" value={12.5} format="percentage" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Iconos"
        description="MetricCards con iconos para identificación rápida"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
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
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Tendencias"
        description="Indicadores de tendencia con dirección y sentimiento"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          <MetricCard
            title="Revenue"
            value={45320}
            format="currency"
            icon={<DollarSign size={20} />}
            trend={{ value: 12.5, direction: "up", label: "vs last month" }}
          />
          <MetricCard
            title="Bounce Rate"
            value={32.4}
            format="percentage"
            icon={<Activity size={20} />}
            trend={{
              value: 5.2,
              direction: "down",
              sentiment: "positive",
              label: "vs last week",
            }}
          />
          <MetricCard
            title="Costs"
            value={12500}
            format="currency"
            icon={<TrendingUp size={20} />}
            trend={{
              value: 8.3,
              direction: "up",
              sentiment: "negative",
              label: "vs budget",
            }}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Sparkline"
        description="Mini gráfico de tendencia histórica"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          <MetricCard
            title="Weekly Revenue"
            value={125000}
            format="currency"
            sparkline={sparklineData}
            trend={{ value: 15.3, direction: "up" }}
          />
          <MetricCard
            title="Active Users"
            value={8542}
            format="number"
            sparkline={[50, 45, 55, 52, 48, 60, 58, 65, 62, 70, 68, 75]}
            trend={{ value: 8.7, direction: "up" }}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Con Barra de Progreso"
        description="Progreso hacia una meta u objetivo"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          <MetricCard
            title="Sales Target"
            value="$75,000"
            icon={<DollarSign size={20} />}
            progress={{ value: 75000, max: 100000, showLabel: true }}
          />
          <MetricCard
            title="Quota Reached"
            value="85%"
            icon={<Percent size={20} />}
            progress={{ value: 85, max: 100, showLabel: true }}
            status="success"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estados de Color"
        description="Indicadores visuales de estado"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          <MetricCard
            title="On Track"
            value={95}
            format="percentage"
            status="success"
          />
          <MetricCard
            title="Needs Attention"
            value={72}
            format="percentage"
            status="warning"
          />
          <MetricCard
            title="Critical"
            value={45}
            format="percentage"
            status="error"
          />
          <MetricCard
            title="Information"
            value={88}
            format="percentage"
            status="info"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Estados de Carga y Error"
        description="Estados para feedback al usuario"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <MetricCard title="Loading..." value={0} loading />
          <MetricCard
            title="Error State"
            value={0}
            error="Failed to load data"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Especificaciones Tecnicas">
        <div
          style={{
            padding: "20px",
            borderRadius: "20px",
            boxShadow: getNeuInsetShadow(5, 15),
            background: "var(--marble-base)",
            fontSize: "12px",
            fontFamily: "var(--quafi-font-mono)",
            color: "var(--quafi-text-muted)",
            lineHeight: "1.8",
            transition: "box-shadow 50ms linear",
          }}
        >
          <p>
            ✓{" "}
            <strong style={{ color: "var(--quafi-accent-primary)" }}>
              Sizes:
            </strong>{" "}
            sm, md, lg
          </p>
          <p>
            ✓{" "}
            <strong style={{ color: "var(--quafi-accent-primary)" }}>
              Variants:
            </strong>{" "}
            default, outlined, filled
          </p>
          <p>
            ✓{" "}
            <strong style={{ color: "var(--quafi-accent-primary)" }}>
              Status:
            </strong>{" "}
            default, success, warning, error, info
          </p>
          <p>
            ✓{" "}
            <strong style={{ color: "var(--quafi-accent-primary)" }}>
              Format:
            </strong>{" "}
            number, currency, percentage, custom
          </p>
          <p>
            ✓{" "}
            <strong style={{ color: "var(--quafi-accent-primary)" }}>
              Trend:
            </strong>{" "}
            up, down, stable con sentiment
          </p>
          <p>
            ✓{" "}
            <strong style={{ color: "var(--quafi-accent-primary)" }}>
              Sparkline:
            </strong>{" "}
            Array de números para mini-gráfico
          </p>
          <p>
            ✓{" "}
            <strong style={{ color: "var(--quafi-accent-primary)" }}>
              Progress:
            </strong>{" "}
            Barra con value/max
          </p>
        </div>
      </ShowcaseSection>
    </div>
  );
}

export function MetricCardShowcase() {
  return (
    <LightEngineProvider initialAnimating={true} initialSpeed={0.3}>
      <MetricCardContent />
    </LightEngineProvider>
  );
}
