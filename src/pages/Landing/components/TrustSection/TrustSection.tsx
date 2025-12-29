// Path: src/pages/Landing/components/TrustSection/TrustSection.tsx
import { motion } from 'framer-motion';
import { StatCounter } from '@/components/atoms/StatCounter';
import styles from './TrustSection.module.css';

const stats = [
  {
    value: '$2.4B',
    label: 'Assets Under Analysis',
  },
  {
    value: 847,
    suffix: '+',
    label: 'Active Analysts',
  },
  {
    value: 99.7,
    suffix: '%',
    label: 'System Uptime',
  },
];

export function TrustSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>BY THE NUMBERS</h2>
          <p className={styles.subtitle}>Trusted by institutional investors worldwide</p>
        </motion.div>

        <motion.div
          className={styles.statsGrid}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={styles.statCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <StatCounter
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default TrustSection;
