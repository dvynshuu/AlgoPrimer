"use client";

import React, { useState, useEffect } from "react";
import { Lesson, Problem } from "@/types/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { TableOfContents, TocItem } from "@/components/layout/TableOfContents";
import { useProgress } from "@/lib/progress/ProgressContext";
import { getDsaLessonPath, getLanguageLessonPath } from "@/lib/routes";
import { CheckCircle2, Bookmark, Clock, ArrowRight } from "lucide-react";
import styles from "./LessonViewer.module.css";

interface LessonViewerProps {
  lesson: Lesson;
  breadcrumbItems: { label: string; href?: string }[];
  relatedProblems?: Problem[];
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  breadcrumbItems,
  relatedProblems,
}) => {
  const {
    isLessonCompleted,
    toggleLessonCompleted,
    isBookmarked,
    toggleBookmark,
    recordVisit,
  } = useProgress();
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    const url =
      lesson.track === "dsa"
        ? getDsaLessonPath(lesson.topicSlug, lesson.slug)
        : getLanguageLessonPath(lesson.track, lesson.slug);
    recordVisit(lesson.title, url);
  }, [lesson.title, lesson.track, lesson.topicSlug, lesson.slug, recordVisit]);

  const completed = isLessonCompleted(lesson.id);
  const bookmarked = isBookmarked(lesson.id);

  const tocItems: TocItem[] = [
    { id: "why-do-we-need-it", label: "Why do we need it?" },
    { id: "visual-intuition", label: "Visual Intuition" },
    { id: "syntax-and-examples", label: "Syntax & Example" },
    { id: "how-it-works", label: "How it works" },
    { id: "common-mistakes", label: "Common Mistakes" },
    ...(lesson.complexity ? [{ id: "complexity", label: "Complexity" }] : []),
    { id: "try-it-yourself", label: "Try it yourself" },
    { id: "placement-connection", label: "Placement Connection" },
    { id: "quick-revision", label: "Quick Revision" },
    ...(relatedProblems && relatedProblems.length > 0 ? [{ id: "related-problems", label: "Practice Problems" }] : []),
  ];

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <Breadcrumbs items={breadcrumbItems} />

        <div className={styles.headerArea}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{lesson.title}</h1>
            <div className={styles.actions}>
              <Button
                variant={bookmarked ? "primary" : "secondary"}
                size="sm"
                onClick={() => toggleBookmark(lesson.id)}
                icon={<Bookmark size={14} />}
              >
                {bookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
              <Button
                variant={completed ? "secondary" : "primary"}
                size="sm"
                onClick={() => toggleLessonCompleted(lesson.id)}
                icon={<CheckCircle2 size={14} />}
              >
                {completed ? "Completed" : "Mark as Completed"}
              </Button>
            </div>
          </div>

          <div className={styles.metaRow}>
            <span>Track: {lesson.track.toUpperCase()}</span>
            <span>&bull;</span>
            <span>Topic: {lesson.topicTitle}</span>
            <span>&bull;</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Clock size={13} /> {lesson.estimatedMinutes} mins
            </span>
          </div>
        </div>

        {/* In one sentence */}
        <div className={styles.oneSentenceBox}>
          <div className={styles.oneSentenceLabel}>In one sentence</div>
          <div>{lesson.oneSentence}</div>
        </div>

        {/* Why do we need it? */}
        <section id="why-do-we-need-it" className={styles.section}>
          <h2 className={styles.sectionHeading}>Why do we need it?</h2>
          <p>{lesson.whyDoWeNeedIt.problem}</p>
          <Callout type="why" title="Real-World Analogy">
            {lesson.whyDoWeNeedIt.realWorldAnalogy}
          </Callout>
        </section>

        {/* Visual intuition */}
        <section id="visual-intuition" className={styles.section}>
          <h2 className={styles.sectionHeading}>Visual Intuition</h2>
          <div className={styles.visualBox}>{lesson.visualIntuition}</div>
        </section>

        {/* Syntax & Example */}
        <section id="syntax-and-examples" className={styles.section}>
          <h2 className={styles.sectionHeading}>Syntax & Example</h2>
          {Object.entries(lesson.syntax).map(([key, val]) => (
            <div key={key} style={{ marginBottom: "var(--space-4)" }}>
              <p style={{ margin: "0 0 var(--space-2) 0", fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "capitalize" }}>
                {key.replace(/([A-Z])/g, " $1")}
              </p>
              <pre className={styles.syntaxPre}>
                <code>{val}</code>
              </pre>
            </div>
          ))}

          <h3 style={{ marginTop: "var(--space-6)" }}>{lesson.example.title}</h3>
          <CodeBlock
            code={lesson.example.code}
            singleLanguageLabel={lesson.example.language.toUpperCase()}
          />
          <p style={{ fontSize: "var(--font-size-sm)", color: "var(--text-secondary)", marginTop: "var(--space-2)" }}>
            {lesson.example.explanation}
          </p>
        </section>

        {/* How it works */}
        <section id="how-it-works" className={styles.section}>
          <h2 className={styles.sectionHeading}>How it works (Step-by-Step)</h2>
          <div className={styles.stepsList}>
            {lesson.howItWorks.map((step) => (
              <div key={step.step} className={styles.stepCard}>
                <div className={styles.stepNumber}>{step.step}</div>
                <div className={styles.stepBody}>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common mistakes */}
        <section id="common-mistakes" className={styles.section}>
          <h2 className={styles.sectionHeading}>Common Beginner Mistakes</h2>
          {lesson.commonMistakes.map((m, idx) => (
            <div key={idx} className={styles.mistakeCard}>
              <div className={styles.mistakeRow}>
                <span className={styles.mistakeBadge}>INCORRECT PATTERN</span>
                <pre className={styles.mistakeCode}>
                  <code>{m.mistake}</code>
                </pre>
              </div>
              <div className={styles.mistakeWhy}>
                <span className={styles.mistakeWhyLabel}>Why this fails:</span>
                <span>{m.why}</span>
              </div>
              <div className={styles.correctRow}>
                <span className={styles.correctBadge}>CORRECT APPROACH</span>
                <pre className={styles.correctCode}>
                  <code>{m.correct}</code>
                </pre>
              </div>
            </div>
          ))}
        </section>

        {/* Complexity if available */}
        {lesson.complexity && (
          <section id="complexity" className={styles.section}>
            <h2 className={styles.sectionHeading}>Time & Space Complexity</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)", margin: "var(--space-4) 0" }}>
              <div style={{ background: "var(--bg-surface)", padding: "var(--space-4)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                <span style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>Time Complexity</span>
                <div style={{ fontSize: "var(--font-size-md)", fontFamily: "var(--font-mono)", color: "#60a5fa", marginTop: "4px" }}>
                  {lesson.complexity.time}
                </div>
              </div>
              <div style={{ background: "var(--bg-surface)", padding: "var(--space-4)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                <span style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>Space Complexity</span>
                <div style={{ fontSize: "var(--font-size-md)", fontFamily: "var(--font-mono)", color: "#34d399", marginTop: "4px" }}>
                  {lesson.complexity.space}
                </div>
              </div>
            </div>
            <p style={{ fontSize: "var(--font-size-sm)" }}>{lesson.complexity.explanation}</p>
          </section>
        )}

        {/* Try it yourself */}
        <section id="try-it-yourself" className={styles.section}>
          <h2 className={styles.sectionHeading}>Try it yourself</h2>
          <div className={styles.tryItBox}>
            <p className={styles.tryItPrompt}>{lesson.tryItYourself.prompt}</p>
            <p className={styles.tryItHint}>
              <strong>Hint:</strong> {lesson.tryItYourself.hint}
            </p>
            <div style={{ marginTop: "var(--space-3)" }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowSolution((prev) => !prev)}
              >
                {showSolution ? "Hide Solution" : "Reveal Solution"}
              </Button>
            </div>
            {showSolution && (
              <div className={styles.solutionBox}>
                <code>{lesson.tryItYourself.solutionSnippet}</code>
              </div>
            )}
          </div>
        </section>

        {/* Placement connection */}
        <section id="placement-connection" className={styles.section}>
          <h2 className={styles.sectionHeading}>Placement Connection</h2>
          <Callout type="placement" title="How this appears in placement interviews">
            {lesson.placementConnection}
          </Callout>
        </section>

        {/* Quick revision */}
        <section id="quick-revision" className={styles.section}>
          <h2 className={styles.sectionHeading}>Quick Revision (Key Takeaways)</h2>
          <ul className={styles.revisionList}>
            {lesson.quickRevision.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </section>

        {/* Related Practice Problems */}
        {relatedProblems && relatedProblems.length > 0 && (
          <section id="related-problems" className={styles.section}>
            <h2 className={styles.sectionHeading}>Curated Company Practice Problems</h2>
            <p style={{ fontSize: "var(--font-size-sm)", color: "var(--text-secondary)", marginBottom: "var(--space-4)" }}>
              Test your understanding of {lesson.title} with high-frequency technical interview problems asked at top companies.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {relatedProblems.map((prob) => (
                <div
                  key={prob.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "var(--space-4)",
                    backgroundColor: "var(--bg-surface-2, #151923)",
                    border: "1px solid var(--border-default, rgba(255, 255, 255, 0.10))",
                    borderRadius: "8px",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "4px" }}>
                      <Badge variant={prob.difficulty === "Easy" ? "easy" : prob.difficulty === "Medium" ? "medium" : "hard"}>
                        {prob.difficulty}
                      </Badge>
                      <span style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                        Pattern: {prob.pattern}
                      </span>
                      {prob.companies && prob.companies.slice(0, 3).map((comp) => (
                        <span
                          key={comp}
                          style={{
                            fontSize: "11px",
                            fontFamily: "var(--font-mono)",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            background: "rgba(255, 255, 255, 0.05)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                    <div style={{ fontSize: "var(--font-size-md)", fontWeight: 600, color: "var(--text-primary)" }}>
                      {prob.title}
                    </div>
                  </div>
                  <Button href={`/problems/${prob.slug}`} variant="primary" size="sm" icon={<ArrowRight size={13} />}>
                    Solve Problem
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <TableOfContents items={tocItems} />
    </div>
  );
};
