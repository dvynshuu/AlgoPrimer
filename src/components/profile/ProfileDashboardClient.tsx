"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useProgress } from "@/lib/progress/ProgressContext";
import { problems } from "@/content/problems";
import { javaLessons } from "@/content/languages/java";
import { cppLessons } from "@/content/languages/cpp";
import { pythonLessons } from "@/content/languages/python";
import { javascriptLessons } from "@/content/languages/javascript";
import { dsaLessons } from "@/content/dsa/lessons";
import {
  getHomePath,
  getDsaPath,
  getDsaLessonPath,
  getLanguageLessonPath,
  getProblemPath,
  getRevisionPath,
} from "@/lib/routes";
import { ArrowRight, RotateCw, AlertCircle, Bookmark } from "lucide-react";
import styles from "@/app/profile/profile.module.css";

export function ProfileDashboardClient() {
  const {
    completedLessons,
    solvedProblems,
    bookmarkedItems,
    weakTopics,
    lastVisited,
  } = useProgress();

  const javaProgress = useMemo(() => {
    if (javaLessons.length === 0) return 0;
    const completedJava = completedLessons.filter((id) => id.startsWith("java")).length;
    return Math.round((completedJava / javaLessons.length) * 100);
  }, [completedLessons]);

  const dsaProgress = useMemo(() => {
    if (problems.length === 0) return 0;
    return Math.round((solvedProblems.length / problems.length) * 100);
  }, [solvedProblems.length]);

  // Recommend next problem
  const nextProblem = useMemo(() => {
    const solvedSet = new Set(solvedProblems);
    return problems.find((p) => !solvedSet.has(p.id)) || problems[0];
  }, [solvedProblems]);

  // Resolve human-readable details for bookmarked items
  const bookmarkDetails = useMemo(() => {
    return bookmarkedItems.map((id) => {
      const problem = problems.find((p) => p.id === id || p.slug === id);
      if (problem) {
        return {
          id,
          title: problem.title,
          url: getProblemPath(problem.slug),
          badge: problem.difficulty,
        };
      }
      const dsaLesson = dsaLessons.find((l) => l.id === id || l.slug === id);
      if (dsaLesson) {
        return {
          id,
          title: dsaLesson.title,
          url: getDsaLessonPath(dsaLesson.topicSlug, dsaLesson.slug),
          badge: dsaLesson.topicTitle,
        };
      }
      const jLesson = javaLessons.find((l) => l.id === id || l.slug === id);
      if (jLesson) {
        return {
          id,
          title: jLesson.title,
          url: getLanguageLessonPath("java", jLesson.slug),
          badge: "Java",
        };
      }
      const cLesson = cppLessons.find((l) => l.id === id || l.slug === id);
      if (cLesson) {
        return {
          id,
          title: cLesson.title,
          url: getLanguageLessonPath("cpp", cLesson.slug),
          badge: "C++",
        };
      }
      const pyLesson = pythonLessons.find((l) => l.id === id || l.slug === id);
      if (pyLesson) {
        return {
          id,
          title: pyLesson.title,
          url: getLanguageLessonPath("python", pyLesson.slug),
          badge: "Python",
        };
      }
      const jsLesson = javascriptLessons.find((l) => l.id === id || l.slug === id);
      if (jsLesson) {
        return {
          id,
          title: jsLesson.title,
          url: getLanguageLessonPath("javascript", jsLesson.slug),
          badge: "JavaScript",
        };
      }
      const formatted = id
        .replace(/^prob-/, "")
        .replace(/^dsa-/, "")
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      return {
        id,
        title: formatted,
        url: `/problems/${id.replace(/^prob-/, "")}`,
        badge: undefined,
      };
    });
  }, [bookmarkedItems]);

  return (
    <div className={styles.container}>
      <Breadcrumbs items={[{ label: "Home", href: getHomePath() }, { label: "Student Dashboard" }]} />

      <div className={styles.greetingHeader}>
        <div className={styles.timeGreeting}>Good day, engineer.</div>
        <h1 className={styles.dashboardTitle}>Your Daily Placement Dispatch</h1>
        <p className={styles.dashboardSubtitle}>
          Answers the questions that matter: Where did you leave off? What should you study today?
          And what concepts need revision before your next assessment?
        </p>
      </div>

      {/* 1. Continue Where You Stopped */}
      <section className={styles.continueSection}>
        <div className={styles.sectionHeadingSmall}>WHERE YOU STOPPED</div>
        <div className={styles.continueCard}>
          <div>
            <div style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--accent-primary)", marginBottom: "4px" }}>
              ACTIVE SESSION
            </div>
            <h2 style={{ fontSize: "var(--font-size-lg)", margin: "0 0 4px 0", color: "var(--text-primary)" }} suppressHydrationWarning>
              {lastVisited ? lastVisited.title : "Arrays — Two Pointers Technique"}
            </h2>
            <p style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)", margin: 0 }} suppressHydrationWarning>
              {lastVisited ? "Recorded from your recent browser session." : "Recommended next topic in your placement track."}
            </p>
          </div>
          <Button
            href={lastVisited ? lastVisited.url : getDsaLessonPath("arrays", "two-pointers")}
            variant="primary"
            size="md"
            icon={<ArrowRight size={14} />}
          >
            Resume Now
          </Button>
        </div>
      </section>

      {/* 2. Today's Targets & What to Solve Next */}
      <div className={styles.grid2}>
        <div className={styles.card}>
          <div className={styles.sectionHeadingSmall}>RECOMMENDED TODAY</div>
          <h3 className={styles.cardHeader}>Daily Study Plan</h3>
          <ul className={styles.targetList}>
            <li>
              <span className={styles.targetNumber}>1</span>
              <div>
                <strong>1 Lesson:</strong>{" "}
                <Link href={getLanguageLessonPath("java", "arrays")} style={{ color: "var(--accent-hover)" }}>
                  Arrays in Java
                </Link>
              </div>
            </li>
            <li>
              <span className={styles.targetNumber}>2</span>
              <div>
                <strong>Next Problem:</strong>{" "}
                <Link href={getProblemPath(nextProblem.slug)} style={{ color: "var(--accent-hover)" }}>
                  {nextProblem.title}
                </Link>{" "}
                <Badge variant={nextProblem.difficulty === "Easy" ? "easy" : "medium"}>
                  {nextProblem.difficulty}
                </Badge>
              </div>
            </li>
            <li>
              <span className={styles.targetNumber}>3</span>
              <div>
                <strong>1 Revision Card:</strong>{" "}
                <Link href={`${getRevisionPath()}#rev-arrays`} style={{ color: "var(--accent-hover)" }}>
                  Arrays &amp; Memory Cheat Sheet
                </Link>
              </div>
            </li>
          </ul>
        </div>

        {/* 3. Progress Overview */}
        <div className={styles.card}>
          <div className={styles.sectionHeadingSmall}>CURRICULUM COMPLETION</div>
          <h3 className={styles.cardHeader}>Milestone Progress</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginTop: "var(--space-3)" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--font-size-xs)", marginBottom: "4px" }}>
                <span>Java Fundamentals</span>
                <span style={{ fontFamily: "var(--font-mono)" }}>{javaProgress}%</span>
              </div>
              <ProgressBar value={javaProgress} showPercent={false} />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--font-size-xs)", marginBottom: "4px" }}>
                <span>DSA Core Problem Bank</span>
                <span style={{ fontFamily: "var(--font-mono)" }}>{solvedProblems.length} / {problems.length} Solved</span>
              </div>
              <ProgressBar value={dsaProgress} showPercent={false} />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Weak Areas & Bookmarks */}
      <div className={styles.grid2} style={{ marginTop: "var(--space-6)" }}>
        {/* Weak Areas */}
        <div className={styles.card}>
          <div className={styles.sectionHeadingSmall}>AREAS REQUIRING ATTENTION</div>
          <h3 className={styles.cardHeader}>Identified Weak Areas</h3>
          <p style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)", marginBottom: "var(--space-3)" }}>
            Topics where problems were re-attempted or flagged for extra practice.
          </p>

          {weakTopics.length > 0 ? (
            <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
              {weakTopics.map((topic) => (
                <span
                  key={topic}
                  style={{
                    background: "rgba(239, 68, 68, 0.08)",
                    border: "1px solid rgba(239, 68, 68, 0.25)",
                    color: "#f87171",
                    fontSize: "var(--font-size-xs)",
                    padding: "0.25rem 0.6rem",
                    borderRadius: "var(--radius-xs)",
                    fontFamily: "var(--font-mono)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <AlertCircle size={12} /> {topic}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", margin: "var(--space-2) 0" }}>
              No weak areas identified yet. As you solve problems and review concepts, targeted recommendations will appear here.
            </p>
          )}

          <div style={{ marginTop: "var(--space-4)" }}>
            <Button href={getDsaPath()} variant="secondary" size="sm">
              Review Foundations
            </Button>
          </div>
        </div>

        {/* Bookmarks */}
        <div className={styles.card}>
          <div className={styles.sectionHeadingSmall}>SAVED FOR QUICK REFERENCE</div>
          <h3 className={styles.cardHeader}>Bookmarked Items ({bookmarkedItems.length})</h3>

          {bookmarkDetails.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0, margin: "var(--space-2) 0", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              {bookmarkDetails.map((item) => (
                <li
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.4rem 0.6rem",
                    background: "var(--bg-secondary)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "var(--font-size-xs)",
                  }}
                >
                  <Link
                    href={item.url}
                    style={{
                      color: "var(--accent-hover)",
                      fontWeight: 500,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Bookmark size={12} style={{ color: "var(--accent-primary)" }} />
                    {item.title}
                  </Link>
                  {item.badge && (
                    <Badge variant={item.badge === "Easy" ? "easy" : item.badge === "Medium" ? "medium" : item.badge === "Hard" ? "hard" : "default"}>
                      {item.badge}
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", margin: "var(--space-3) 0" }}>
              No items bookmarked yet. Click the &ldquo;Bookmark&rdquo; button on any lesson or problem to store it here.
            </p>
          )}

          <div style={{ marginTop: "auto" }}>
            <Button href={getRevisionPath()} variant="secondary" size="sm" icon={<RotateCw size={12} />}>
              Open Revision Library
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
