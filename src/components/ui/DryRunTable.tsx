import React from "react";
import styles from "./DryRunTable.module.css";

export interface DryRunStep {
  stepNumber: number;
  state: string;
  action: string;
  result: string;
}

interface DryRunTableProps {
  sampleInput: string;
  steps: DryRunStep[];
}

export const DryRunTable: React.FC<DryRunTableProps> = ({ sampleInput, steps }) => {
  return (
    <div className={styles.container}>
      <div style={{ padding: "var(--space-2) var(--space-4)", borderBottom: "1px solid var(--border-subtle)", fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
        Walkthrough on input: <code>{sampleInput}</code>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Step</th>
            <th>State (Variables / Pointers)</th>
            <th>Action Taken</th>
            <th>Updated State / Output</th>
          </tr>
        </thead>
        <tbody>
          {steps.map((step) => (
            <tr key={step.stepNumber}>
              <td className={styles.stepNum}>#{step.stepNumber}</td>
              <td className={styles.state}><code>{step.state}</code></td>
              <td className={styles.action}>{step.action}</td>
              <td className={styles.result}>{step.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
