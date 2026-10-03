import React from "react";
import { Sparkles } from "lucide-react";
import styles from "./SeoAnswerCapsule.module.css";

export interface SeoMetric {
  label: string;
  value: string;
}

export interface SeoAnswerCapsuleProps {
  title?: string;
  summary: string;
  metrics?: SeoMetric[];
  takeaway?: string;
  badgeText?: string;
}

export const SeoAnswerCapsule: React.FC<SeoAnswerCapsuleProps> = ({
  title = "Quick Answer & Algorithmic Summary",
  summary,
  metrics,
  takeaway,
  badgeText = "Direct Answer Summary",
}) => {
  return (
    <section className={styles.capsule} aria-label="Direct Answer Summary">
      <div className={styles.badgeRow}>
        <span className={styles.tag}>
          <Sparkles size={12} />
          {badgeText}
        </span>
      </div>

      <h2 className={styles.title}>{title}</h2>
      <p className={styles.summary}>{summary}</p>

      {metrics && metrics.length > 0 && (
        <div className={styles.metricsGrid}>
          {metrics.map((m) => (
            <div key={m.label} className={styles.metricCard}>
              <div className={styles.metricLabel}>{m.label}</div>
              <div className={styles.metricValue}>{m.value}</div>
            </div>
          ))}
        </div>
      )}

      {takeaway && (
        <div className={styles.takeaway}>
          <strong>Key Takeaway:</strong>
          {takeaway}
        </div>
      )}
    </section>
  );
};
