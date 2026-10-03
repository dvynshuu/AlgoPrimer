"use client";

import React, { useState } from "react";
import styles from "./ComplexityMatrix.module.css";

interface DsRow {
  name: string;
  accessAvg: string;
  searchAvg: string;
  insertAvg: string;
  deleteAvg: string;
  spaceWorst: string;
}

interface SortingRow {
  name: string;
  timeBest: string;
  timeAvg: string;
  timeWorst: string;
  spaceWorst: string;
  stable: string;
}

const dsData: DsRow[] = [
  { name: "Array", accessAvg: "O(1)", searchAvg: "O(N)", insertAvg: "O(N)", deleteAvg: "O(N)", spaceWorst: "O(N)" },
  { name: "Dynamic Array", accessAvg: "O(1)", searchAvg: "O(N)", insertAvg: "O(1)*", deleteAvg: "O(N)", spaceWorst: "O(N)" },
  { name: "Singly Linked List", accessAvg: "O(N)", searchAvg: "O(N)", insertAvg: "O(1)", deleteAvg: "O(1)*", spaceWorst: "O(N)" },
  { name: "Doubly Linked List", accessAvg: "O(N)", searchAvg: "O(N)", insertAvg: "O(1)", deleteAvg: "O(1)", spaceWorst: "O(N)" },
  { name: "Stack", accessAvg: "O(N)", searchAvg: "O(N)", insertAvg: "O(1)", deleteAvg: "O(1)", spaceWorst: "O(N)" },
  { name: "Queue", accessAvg: "O(N)", searchAvg: "O(N)", insertAvg: "O(1)", deleteAvg: "O(1)", spaceWorst: "O(N)" },
  { name: "Hash Table (Map)", accessAvg: "N/A", searchAvg: "O(1)", insertAvg: "O(1)", deleteAvg: "O(1)", spaceWorst: "O(N)" },
  { name: "Binary Search Tree", accessAvg: "O(log N)", searchAvg: "O(log N)", insertAvg: "O(log N)", deleteAvg: "O(log N)", spaceWorst: "O(N)" },
  { name: "Red-Black Tree (AVL)", accessAvg: "O(log N)", searchAvg: "O(log N)", insertAvg: "O(log N)", deleteAvg: "O(log N)", spaceWorst: "O(N)" },
  { name: "Binary Heap (Min/Max)", accessAvg: "N/A", searchAvg: "O(N)", insertAvg: "O(log N)", deleteAvg: "O(log N)", spaceWorst: "O(N)" },
  { name: "Trie (Prefix Tree)", accessAvg: "N/A", searchAvg: "O(L)", insertAvg: "O(L)", deleteAvg: "O(L)", spaceWorst: "O(N*L)" },
];

const sortingData: SortingRow[] = [
  { name: "Quicksort", timeBest: "O(N log N)", timeAvg: "O(N log N)", timeWorst: "O(N^2)", spaceWorst: "O(log N)", stable: "No" },
  { name: "Mergesort", timeBest: "O(N log N)", timeAvg: "O(N log N)", timeWorst: "O(N log N)", spaceWorst: "O(N)", stable: "Yes" },
  { name: "Heapsort", timeBest: "O(N log N)", timeAvg: "O(N log N)", timeWorst: "O(N log N)", spaceWorst: "O(1)", stable: "No" },
  { name: "Insertion Sort", timeBest: "O(N)", timeAvg: "O(N^2)", timeWorst: "O(N^2)", spaceWorst: "O(1)", stable: "Yes" },
  { name: "Counting Sort", timeBest: "O(N + K)", timeAvg: "O(N + K)", timeWorst: "O(N + K)", spaceWorst: "O(K)", stable: "Yes" },
];

function getBadgeClass(val: string) {
  if (val.includes("O(1)")) return styles.badgeO1;
  if (val.includes("O(log N)") || val.includes("O(L)")) return styles.badgeOLogN;
  if (val.includes("O(N log N)")) return styles.badgeONLogN;
  if (val.includes("O(N^2)")) return styles.badgeON2;
  if (val.includes("O(N)")) return styles.badgeON;
  return styles.badge;
}

export const ComplexityMatrix: React.FC = () => {
  const [tab, setTab] = useState<"ds" | "sorting">("ds");
  const [query, setQuery] = useState("");

  const filteredDs = dsData.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));
  const filteredSort = sortingData.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className={styles.matrixContainer}>
      <div className={styles.topRow}>
        <div>
          <h2 className={styles.title}>Interactive Big-O Complexity Matrix</h2>
          <p className={styles.subtitle}>
            Instant asymptotic lookup for data structure operations and sorting algorithms.
          </p>
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={`${styles.tabBtn} ${tab === "ds" ? styles.tabBtnActive : ""}`}
            onClick={() => setTab("ds")}
          >
            Data Structures
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${tab === "sorting" ? styles.tabBtnActive : ""}`}
            onClick={() => setTab("sorting")}
          >
            Sorting Algorithms
          </button>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search structure or algorithm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableWrapper}>
        {tab === "ds" ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Data Structure</th>
                <th>Access (Avg)</th>
                <th>Search (Avg)</th>
                <th>Insert (Avg)</th>
                <th>Delete (Avg)</th>
                <th>Space (Worst)</th>
              </tr>
            </thead>
            <tbody>
              {filteredDs.map((row) => (
                <tr key={row.name}>
                  <td className={styles.nameCell}>{row.name}</td>
                  <td><span className={`${styles.badge} ${getBadgeClass(row.accessAvg)}`}>{row.accessAvg}</span></td>
                  <td><span className={`${styles.badge} ${getBadgeClass(row.searchAvg)}`}>{row.searchAvg}</span></td>
                  <td><span className={`${styles.badge} ${getBadgeClass(row.insertAvg)}`}>{row.insertAvg}</span></td>
                  <td><span className={`${styles.badge} ${getBadgeClass(row.deleteAvg)}`}>{row.deleteAvg}</span></td>
                  <td><span className={`${styles.badge} ${getBadgeClass(row.spaceWorst)}`}>{row.spaceWorst}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Algorithm</th>
                <th>Time (Best)</th>
                <th>Time (Average)</th>
                <th>Time (Worst)</th>
                <th>Space (Worst)</th>
                <th>Stable</th>
              </tr>
            </thead>
            <tbody>
              {filteredSort.map((row) => (
                <tr key={row.name}>
                  <td className={styles.nameCell}>{row.name}</td>
                  <td><span className={`${styles.badge} ${getBadgeClass(row.timeBest)}`}>{row.timeBest}</span></td>
                  <td><span className={`${styles.badge} ${getBadgeClass(row.timeAvg)}`}>{row.timeAvg}</span></td>
                  <td><span className={`${styles.badge} ${getBadgeClass(row.timeWorst)}`}>{row.timeWorst}</span></td>
                  <td><span className={`${styles.badge} ${getBadgeClass(row.spaceWorst)}`}>{row.spaceWorst}</span></td>
                  <td>{row.stable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
