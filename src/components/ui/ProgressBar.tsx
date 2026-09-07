import React from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showPercent?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showPercent = true,
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={styles.wrapper} aria-label={label || "Progress bar"}>
      {(label || showPercent) && (
        <div className={styles.labelRow}>
          {label && <span>{label}</span>}
          {showPercent && <span>{Math.round(clamped)}%</span>}
        </div>
      )}
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};
