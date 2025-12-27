// Path: src/services/mockData/recommendations.ts

export type RecommendationType = "buy" | "hold" | "sell" | "watch";
export type Priority = "high" | "medium" | "low";
export type RiskLevel = "low" | "moderate" | "elevated" | "high" | "severe";

export interface RecommendationFactor {
  name: string;
  impact: "positive" | "negative" | "neutral";
  weight: number;
  description: string;
}

export interface Recommendation {
  id: string;
  type: RecommendationType;
  symbol: string;
  name: string;
  assetClass: string;
  title: string;
  rationale: string;
  confidence: number;
  timeframe: string;
  priority: Priority;
  currentPrice: number;
  targetPrice?: number;
  stopLoss?: number;
  expectedReturn?: number;
  riskLevel: RiskLevel;
  factors: RecommendationFactor[];
  createdAt: string;
  expiresAt?: string;
}

export const recommendations: Recommendation[] = [
  {
    id: "rec1",
    type: "buy",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    assetClass: "Equities",
    title: "AI Infrastructure Leadership",
    rationale:
      "NVIDIA maintains dominant position in AI accelerator market with 80%+ market share. Data center revenue growth exceeds 200% YoY. New Blackwell architecture provides significant performance uplift. Cloud providers continue aggressive CapEx spending on AI infrastructure. Sovereign AI initiatives creating additional demand vector.",
    confidence: 87,
    timeframe: "6-12 months",
    priority: "high",
    currentPrice: 495.22,
    targetPrice: 650.0,
    stopLoss: 420.0,
    expectedReturn: 31.2,
    riskLevel: "moderate",
    factors: [
      {
        name: "Market Position",
        impact: "positive",
        weight: 95,
        description:
          "Dominant 80%+ share in AI accelerators with significant competitive moat",
      },
      {
        name: "Revenue Growth",
        impact: "positive",
        weight: 92,
        description:
          "Data center revenue growing 200%+ YoY with strong forward visibility",
      },
      {
        name: "Valuation",
        impact: "neutral",
        weight: 55,
        description:
          "Premium valuation at 65x P/E reflects growth expectations",
      },
      {
        name: "Competition",
        impact: "negative",
        weight: 35,
        description:
          "AMD and custom silicon (Google TPU, Amazon Trainium) gaining traction",
      },
    ],
    createdAt: "2024-12-20",
    expiresAt: "2025-06-20",
  },
  {
    id: "rec2",
    type: "buy",
    symbol: "LLY",
    name: "Eli Lilly and Company",
    assetClass: "Equities",
    title: "GLP-1 Market Dominance",
    rationale:
      "Eli Lilly leads the transformative GLP-1 drug category with Mounjaro and Zepbound. Obesity treatment market projected to reach $100B+ by 2030. Supply constraints gradually resolving with new manufacturing capacity. Pipeline includes additional indications for cardiovascular and metabolic conditions. Premium to peers justified by superior efficacy data.",
    confidence: 82,
    timeframe: "12-18 months",
    priority: "high",
    currentPrice: 598.45,
    targetPrice: 780.0,
    stopLoss: 520.0,
    expectedReturn: 30.3,
    riskLevel: "moderate",
    factors: [
      {
        name: "Market Opportunity",
        impact: "positive",
        weight: 94,
        description:
          "GLP-1 obesity market projected to exceed $100B annually by 2030",
      },
      {
        name: "Product Pipeline",
        impact: "positive",
        weight: 88,
        description:
          "Strong pipeline with multiple indications and next-gen formulations",
      },
      {
        name: "Manufacturing",
        impact: "neutral",
        weight: 60,
        description:
          "Supply constraints improving but still limiting near-term revenue",
      },
      {
        name: "Competition",
        impact: "negative",
        weight: 42,
        description:
          "Novo Nordisk and emerging competitors intensifying market rivalry",
      },
    ],
    createdAt: "2024-12-19",
    expiresAt: "2025-12-19",
  },
  {
    id: "rec3",
    type: "hold",
    symbol: "AAPL",
    name: "Apple Inc.",
    assetClass: "Equities",
    title: "Await AI Catalyst",
    rationale:
      "Apple's AI strategy with Apple Intelligence is progressing but impact on hardware upgrade cycle remains uncertain. iPhone 16 cycle showing modest improvement over iPhone 15. Services revenue continues steady growth at 14% YoY. Vision Pro adoption slower than expected but establishes spatial computing foundation. Maintaining position while awaiting clearer AI monetization signals.",
    confidence: 72,
    timeframe: "6-9 months",
    priority: "medium",
    currentPrice: 189.45,
    targetPrice: 210.0,
    expectedReturn: 10.8,
    riskLevel: "low",
    factors: [
      {
        name: "Services Growth",
        impact: "positive",
        weight: 85,
        description:
          "Services segment growing 14% YoY with expanding margins and recurring revenue",
      },
      {
        name: "AI Integration",
        impact: "neutral",
        weight: 50,
        description:
          "Apple Intelligence rollout underway but upgrade cycle impact unclear",
      },
      {
        name: "China Risk",
        impact: "negative",
        weight: 38,
        description:
          "Market share pressure in China from Huawei and local competitors",
      },
      {
        name: "Valuation",
        impact: "neutral",
        weight: 55,
        description: "Trading near fair value at 30x P/E with limited upside catalysts",
      },
    ],
    createdAt: "2024-12-18",
  },
  {
    id: "rec4",
    type: "watch",
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    assetClass: "Equities",
    title: "Monitor Rate Environment",
    rationale:
      "JPMorgan demonstrates strong execution across all business lines but faces headwinds from potential Fed rate cuts impacting net interest income. Investment banking fees recovering from 2023 lows. Credit quality remains solid with manageable charge-offs. Trading revenues benefiting from volatility. Adding to watchlist pending Fed guidance clarity.",
    confidence: 65,
    timeframe: "3-6 months",
    priority: "medium",
    currentPrice: 172.34,
    targetPrice: 195.0,
    expectedReturn: 13.1,
    riskLevel: "moderate",
    factors: [
      {
        name: "Business Execution",
        impact: "positive",
        weight: 88,
        description:
          "Industry-leading ROE and consistent outperformance across segments",
      },
      {
        name: "Credit Quality",
        impact: "positive",
        weight: 75,
        description:
          "Manageable charge-offs and strong reserve coverage ratio",
      },
      {
        name: "NII Pressure",
        impact: "negative",
        weight: 45,
        description:
          "Net interest income likely to decline with Fed rate cuts in 2025",
      },
      {
        name: "Regulatory",
        impact: "negative",
        weight: 40,
        description:
          "Basel III endgame implementation may pressure capital ratios",
      },
    ],
    createdAt: "2024-12-17",
  },
  {
    id: "rec5",
    type: "sell",
    symbol: "XOM",
    name: "Exxon Mobil Corporation",
    assetClass: "Equities",
    title: "Energy Sector Rotation",
    rationale:
      "Exxon faces structural headwinds as energy transition accelerates. Oil demand growth slowing with EV adoption exceeding projections. Refining margins normalizing from 2022-2023 peaks. Capital allocation increasingly questioned with Pioneer acquisition. Recommend rotating exposure to renewable infrastructure or technology sectors with better secular growth profiles.",
    confidence: 71,
    timeframe: "3-6 months",
    priority: "medium",
    currentPrice: 104.56,
    targetPrice: 92.0,
    stopLoss: 115.0,
    expectedReturn: -12.0,
    riskLevel: "elevated",
    factors: [
      {
        name: "Demand Outlook",
        impact: "negative",
        weight: 72,
        description:
          "Peak oil demand thesis gaining traction with accelerating EV adoption",
      },
      {
        name: "Margin Compression",
        impact: "negative",
        weight: 65,
        description:
          "Refining margins returning to mid-cycle levels after elevated 2022-2023",
      },
      {
        name: "Capital Allocation",
        impact: "negative",
        weight: 58,
        description:
          "Pioneer acquisition strategic rationale questioned by some investors",
      },
      {
        name: "Dividend",
        impact: "positive",
        weight: 80,
        description:
          "Attractive 3.5% yield provides downside support and income",
      },
    ],
    createdAt: "2024-12-16",
    expiresAt: "2025-03-16",
  },
  {
    id: "rec6",
    type: "buy",
    symbol: "AVGO",
    name: "Broadcom Inc.",
    assetClass: "Equities",
    title: "AI ASIC Opportunity",
    rationale:
      "Broadcom positioned to capture AI custom silicon demand from hyperscalers. Google TPU partnership provides visibility into next-gen AI accelerator designs. VMware acquisition creating enterprise software recurring revenue. Networking semiconductor leadership benefits from AI datacenter buildouts. Conservative guidance provides upside potential.",
    confidence: 79,
    timeframe: "9-12 months",
    priority: "high",
    currentPrice: 945.23,
    targetPrice: 1200.0,
    stopLoss: 850.0,
    expectedReturn: 27.0,
    riskLevel: "moderate",
    factors: [
      {
        name: "AI ASIC Design",
        impact: "positive",
        weight: 90,
        description:
          "Leading position in custom AI accelerator design for hyperscalers",
      },
      {
        name: "VMware Integration",
        impact: "positive",
        weight: 78,
        description:
          "VMware acquisition adding recurring software revenue and enterprise exposure",
      },
      {
        name: "Networking",
        impact: "positive",
        weight: 82,
        description:
          "AI datacenter buildouts driving demand for high-speed networking silicon",
      },
      {
        name: "Customer Concentration",
        impact: "negative",
        weight: 45,
        description:
          "Significant revenue concentration with top hyperscaler customers",
      },
    ],
    createdAt: "2024-12-15",
    expiresAt: "2025-09-15",
  },
];

export function getRecommendationsByType(
  type: RecommendationType
): Recommendation[] {
  return recommendations.filter((r) => r.type === type);
}

export function getHighPriorityRecommendations(): Recommendation[] {
  return recommendations.filter((r) => r.priority === "high");
}

export function getRecommendationStats() {
  const buyCount = recommendations.filter((r) => r.type === "buy").length;
  const holdCount = recommendations.filter((r) => r.type === "hold").length;
  const sellCount = recommendations.filter((r) => r.type === "sell").length;
  const watchCount = recommendations.filter((r) => r.type === "watch").length;

  const avgConfidence =
    recommendations.reduce((sum, r) => sum + r.confidence, 0) /
    recommendations.length;

  return {
    total: recommendations.length,
    buyCount,
    holdCount,
    sellCount,
    watchCount,
    avgConfidence: Math.round(avgConfidence),
  };
}
