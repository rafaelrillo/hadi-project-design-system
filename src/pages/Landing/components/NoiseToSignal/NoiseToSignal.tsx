// Path: src/pages/Landing/components/NoiseToSignal/NoiseToSignal.tsx
import { motion } from 'framer-motion';
import styles from './NoiseToSignal.module.css';

const noiseWords = [
  'VOLATILITY', 'UNCERTAINTY', 'FEAR', 'GREED', 'RUMORS',
  'PANIC', 'FOMO', 'NOISE', 'CHAOS', 'OVERLOAD',
  'SPECULATION', 'HYPE', 'CRASH', 'BUBBLE', 'CRISIS',
];

const signalPoints = [
  { label: 'Pattern Recognition', value: '99.2%' },
  { label: 'Signal Clarity', value: '847+' },
  { label: 'Noise Filtered', value: '94.7%' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function NoiseToSignal() {
  return (
    <section className={styles.section} id="transformation">
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.label}>THE TRANSFORMATION</span>
          <h2 className={styles.title}>From Noise to Signal</h2>
          <p className={styles.subtitle}>
            Markets generate infinite noise. FING extracts the signal.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className={styles.columns}>
          {/* Noise Column */}
          <motion.div
            className={styles.noiseColumn}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className={styles.columnTitle}>
              <span className={styles.columnIcon}>✕</span>
              Raw Market Data
            </h3>
            <div className={styles.noiseGrid}>
              {noiseWords.map((word, index) => (
                <motion.span
                  key={word}
                  className={styles.noiseWord}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            className={styles.arrowContainer}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={styles.arrow}>
              <span className={styles.arrowText}>FING</span>
              <span className={styles.arrowIcon}>→</span>
            </div>
          </motion.div>

          {/* Signal Column */}
          <motion.div
            className={styles.signalColumn}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className={styles.columnTitle}>
              <span className={styles.columnIconSuccess}>✓</span>
              Actionable Intelligence
            </h3>
            <div className={styles.signalGrid}>
              {signalPoints.map((point) => (
                <motion.div
                  key={point.label}
                  className={styles.signalCard}
                  variants={itemVariants}
                >
                  <span className={styles.signalValue}>{point.value}</span>
                  <span className={styles.signalLabel}>{point.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.blockquote
          className={styles.quote}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p>"In the chaos of markets, clarity is the ultimate edge."</p>
        </motion.blockquote>
      </div>
    </section>
  );
}

export default NoiseToSignal;
