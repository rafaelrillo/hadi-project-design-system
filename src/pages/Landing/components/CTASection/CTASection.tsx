// Path: src/pages/Landing/components/CTASection/CTASection.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { InputText } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import styles from './CTASection.module.css';

export function CTASection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <section id="pricing" className={styles.section}>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>READY TO SEE CLEARLY?</h2>
          <p className={styles.subtitle}>Request access to the FING system.</p>

          {!isSubmitted ? (
            <motion.form
              className={styles.form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={styles.inputWrapper}>
                <InputText
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ariaLabel="Email address"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Request Early Access'}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              className={styles.successMessage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className={styles.checkmark}>✓</span>
              <p>Request received. We'll be in touch soon.</p>
            </motion.div>
          )}

          <p className={styles.disclaimer}>
            No credit card required. Early access is by invitation only.
          </p>
        </motion.div>
      </div>

      {/* Decorative glow */}
      <div className={styles.glowOrb} />
    </section>
  );
}

export default CTASection;
