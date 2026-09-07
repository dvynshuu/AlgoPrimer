import React from "react";
import styles from "./ComplexityTable.module.css";

export interface ComplexityRow {
  approach: string;
  time: string;
  space: string;
  notes?: string;
  isOptimal?: boolean;
}

interface ComplexityTableProps {
  rows: ComplexityRow[];
}

export const ComplexityTable: React.FC<ComplexityTableProps> = ({ rows }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Approach</th>
            <th>Time Complexity</th>
            <th>Space Complexity</th>
            <th>Reasoning</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>
                <strong>{row.approach}</strong>
                {row.isOptimal && <span className={styles.optimalBadge}>[Optimal]</span>}
              </td>
              <td>
                <code className={styles.complexityVal}>{row.time}</code>
              </td>
              <td>
                <code className={styles.complexityVal}>{row.space}</code>
              </td>
              <td>{row.notes || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
