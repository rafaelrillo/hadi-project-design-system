// Path: src/pages/Landing/components/FeatureShowcase/FeatureShowcase.tsx
import { motion } from 'framer-motion';
import { MarketStateIndicator, RiskGauge } from '@/components/organisms/fing';
import { RecommendationCard, HistoricalAlignment } from '@/components/molecules/fing';
import type { AssetClass } from '@/components/molecules/fing/RecommendationCard/RecommendationCard';
import { useMarketStore } from '@/store';
import styles from './FeatureShowcase.module.css';

const features = [
  {
    number: '01',
    title: 'Market State Analysis',
    description:
      'Real-time market condition assessment using proprietary algorithms that analyze momentum, volatility, and trend strength across multiple timeframes.',
    component: 'marketState',
  },
  {
    number: '02',
    title: 'Risk Assessment',
    description:
      'Dynamic risk quantification that adapts to changing market conditions. Visual gauge provides instant understanding of current exposure levels.',
    component: 'riskGauge',
  },
  {
    number: '03',
    title: 'AI Recommendations',
    description:
      'Machine learning models trained on 60 years of market data generate actionable recommendations with confidence scores and rationale.',
    component: 'recommendation',
  },
  {
    number: '04',
    title: 'Historical Alignment',
    description:
      'Pattern matching engine identifies similar historical periods to provide context and probability-weighted outcome scenarios.',
    component: 'historical',
  },
];

export function FeatureShowcase() {
  const { indicators, recommendations } = useMarketStore();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.45, 0, 0.15, 1] as const,
      },
    },
  };

  const itemVariantsRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.45, 0, 0.15, 1] as const,
      },
    },
  };

  const renderComponent = (type: string) => {
    switch (type) {
      case 'marketState':
        return <MarketStateIndicator state={indicators.state} size="md" />;
      case 'riskGauge':
        return <RiskGauge level={indicators.riskLevel} value={indicators.riskValue} size="md" />;
      case 'recommendation': {
        const rec = recommendations[0];
        if (!rec) return null;
        // Map assetClass from store format to component format
        const assetClassMap: Record<string, AssetClass> = {
          'Equities': 'stocks',
          'Fixed Income': 'bonds',
          'Commodities': 'commodities',
          'Cash': 'cash',
          'Crypto': 'crypto',
        };
        return (
          <RecommendationCard
            type={rec.type}
            assetClass={assetClassMap[rec.assetClass] || 'stocks'}
            title={rec.title}
            rationale={rec.rationale}
            confidence={rec.confidence}
            timeframe={rec.timeframe}
            priority={rec.priority}
          />
        );
      }
      case 'historical':
        return (
          <HistoricalAlignment
            periods={[
              { year: 2008, label: 'Financial Crisis', similarity: 32, outcome: 'Similar volatility patterns' },
              { year: 2020, label: 'COVID Recovery', similarity: 78, outcome: 'Strong rebound signals' },
            ]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section id="features" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>CORE CAPABILITIES</h2>
          <p className={styles.subtitle}>
            Institutional-grade analysis tools designed for clarity
          </p>
        </motion.div>

        <motion.div
          className={styles.features}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.number}
              className={`${styles.featureRow} ${index % 2 === 1 ? styles.reverse : ''}`}
              variants={index % 2 === 0 ? itemVariants : itemVariantsRight}
            >
              <div className={styles.featureContent}>
                <span className={styles.featureNumber}>{feature.number}</span>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
              <div className={styles.featureDemo}>
                <div className={styles.demoCard}>
                  {renderComponent(feature.component)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FeatureShowcase;
