// Path: src/components/molecules/fing/RiskProfileSelector/RiskProfileSelector.tsx
import styles from './RiskProfileSelector.module.css';

export type RiskProfile = 'conservative' | 'moderate' | 'balanced' | 'growth' | 'aggressive';

export interface RiskProfileSelectorProps {
  value: RiskProfile;
  onChange: (profile: RiskProfile) => void;
  showDescriptions?: boolean;
  disabled?: boolean;
}

const profiles: RiskProfile[] = ['conservative', 'moderate', 'balanced', 'growth', 'aggressive'];

const profileLabels: Record<RiskProfile, string> = {
  conservative: 'Conservative',
  moderate: 'Moderate',
  balanced: 'Balanced',
  growth: 'Growth',
  aggressive: 'Aggressive',
};

const profileDescriptions: Record<RiskProfile, string> = {
  conservative: 'Prioritizes capital preservation over growth. Suitable for short-term goals or low risk tolerance.',
  moderate: 'Seeks steady growth with lower volatility. Good for medium-term horizons.',
  balanced: 'Seeks moderate growth with controlled volatility. Suitable for medium-term investment horizons.',
  growth: 'Accepts higher volatility for potentially greater returns. Suitable for long-term investors.',
  aggressive: 'Maximum growth potential with significant volatility. Only for long-term horizons and high risk tolerance.',
};

export function RiskProfileSelector({
  value,
  onChange,
  showDescriptions = true,
  disabled = false,
}: RiskProfileSelectorProps) {
  const containerClasses = [
    styles.container,
    disabled ? styles.disabled : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      role="radiogroup"
      aria-label="Risk profile selection"
    >
      {/* Header */}
      <header className={styles.header}>
        <h3 className={styles.title}>Your Risk Profile</h3>
      </header>

      {/* Options */}
      <div className={styles.options}>
        {profiles.map((profile) => (
          <label
            key={profile}
            className={`${styles.option} ${value === profile ? styles.selected : ''}`}
          >
            <input
              type="radio"
              name="riskProfile"
              value={profile}
              checked={value === profile}
              onChange={() => onChange(profile)}
              disabled={disabled}
              className={styles.radio}
            />
            <span className={styles.radioIndicator}>
              <span className={styles.radioInner} />
            </span>
            <span className={styles.label}>{profileLabels[profile]}</span>
          </label>
        ))}
      </div>

      {/* Description */}
      {showDescriptions && (
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>{profileDescriptions[value]}</p>
        </div>
      )}

      {/* Risk Scale Visual */}
      <div className={styles.riskScale} aria-hidden="true">
        <div className={styles.scaleTrack}>
          <div
            className={styles.scaleFill}
            style={{ width: `${(profiles.indexOf(value) + 1) * 20}%` }}
          />
          <div
            className={styles.scaleIndicator}
            style={{ left: `${(profiles.indexOf(value) + 0.5) * 20}%` }}
          />
        </div>
        <div className={styles.scaleLabels}>
          <span>Lower Risk</span>
          <span>Higher Risk</span>
        </div>
      </div>
    </div>
  );
}

export default RiskProfileSelector;
