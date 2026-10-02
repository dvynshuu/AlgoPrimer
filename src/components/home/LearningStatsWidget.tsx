"use client";

import React from "react";
import { useProgress } from "@/lib/progress/ProgressContext";
import styles from "./homeWidgets.module.css";

interface LearningStatsWidgetProps {
  totalDsaTopics: number;
}

export function LearningStatsWidget({ totalDsaTopics }: LearningStatsWidgetProps) {
  const { completedLessons, solvedProblems, isLoaded } = useProgress();

  return (
    <div className={styles.statsOverview}>
      <div className={styles.statCard}>
        <div className={styles.statVal} suppressHydrationWarning>
          {isLoaded ? completedLessons.length : 0}
        </div>
        <div className={styles.statLabel}>Lessons Completed</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statVal} suppressHydrationWarning>
          {isLoaded ? solvedProblems.length : 0}
        </div>
        <div className={styles.statLabel}>Problems Solved</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statVal}>{totalDsaTopics}</div>
        <div className={styles.statLabel}>DSA Roadmap Topics</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statVal}>Level 1 &rarr; 5</div>
        <div className={styles.statLabel}>Progression Depth</div>
      </div>
    </div>
  );
}
