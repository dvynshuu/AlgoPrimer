"use client";

import React from "react";
import { useProgress } from "@/lib/progress/ProgressContext";
import { Button } from "@/components/ui/Button";
import { getLanguageLessonPath } from "@/lib/routes";
import { ArrowRight } from "lucide-react";
import styles from "./homeWidgets.module.css";

export function ContinueLearningWidget() {
  const { lastVisited, isLoaded } = useProgress();

  const defaultUrl = getLanguageLessonPath("java", "variables");
  const defaultTitle = "Variables & Data Types — Java Memory Models";

  return (
    <div className={styles.continueBox}>
      <div>
        <div className={styles.continueLabel}>
          CONTINUE LEARNING
        </div>
        <div className={styles.continueTitle} suppressHydrationWarning>
          {isLoaded && lastVisited ? lastVisited.title : defaultTitle}
        </div>
        <div className={styles.continueSub} suppressHydrationWarning>
          {isLoaded && lastVisited
            ? "Jump straight back into your active session."
            : "Recommended starting point to build fundamentals from zero."}
        </div>
      </div>
      <Button
        href={isLoaded && lastVisited ? lastVisited.url : defaultUrl}
        variant="primary"
        size="md"
        icon={<ArrowRight size={14} />}
      >
        {isLoaded && lastVisited ? "Resume Learning" : "Start from Zero"}
      </Button>
    </div>
  );
}
