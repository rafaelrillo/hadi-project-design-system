// Path: src/components/showcase/ShowcaseSection.tsx
import React from 'react';
import styles from './ShowcaseSection.module.css';

export interface ShowcaseSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const getClassName = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(' ');

export function ShowcaseSection({
  title,
  description,
  children,
  className
}: ShowcaseSectionProps) {
  return (
    <section className={getClassName(styles.section, className)}>
      <h2 className={getClassName(styles.title, description && styles.titleWithDescription)}>
        {title}
      </h2>
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </section>
  );
}
