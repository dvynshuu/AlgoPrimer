"use client";

import React from "react";
import { Problem } from "@/types/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ComplexityTable, ComplexityRow } from "@/components/ui/ComplexityTable";
import { DryRunTable } from "@/components/ui/DryRunTable";
import { TableOfContents, TocItem } from "@/components/layout/TableOfContents";
import { useProgress } from "@/lib/progress/ProgressContext";
import { CheckCircle2, Bookmark, Building2 } from "lucide-react";
import styles from "./ProblemViewer.module.css";

interface ProblemViewerProps {
  problem: Problem;
}

export const ProblemViewer: React.FC<ProblemViewerProps> = ({ problem }) => {
  const { isProblemSolved, markProblemSolved, isBookmarked, toggleBookmark } = useProgress();

  const solved = isProblemSolved(problem.id);
  const bookmarked = isBookmarked(problem.id);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Problems", href: "/problems" },
    { label: problem.topic, href: `/dsa/${problem.topic.toLowerCase()}` },
    { label: problem.title },
  ];

  const tocItems: TocItem[] = [
    { id: "problem-statement", label: "Problem Statement" },
    { id: "understand-the-problem", label: "Understand in Plain Words" },
    { id: "examples", label: "Examples & Constraints" },
    { id: "approach-1-brute-force", label: "Approach 1: Brute Force" },
    ...(problem.betterSolution ? [{ id: "approach-2-better", label: "Approach 2: Better" }] : []),
    { id: "approach-3-optimal", label: "Approach 3: Optimal" },
    { id: "pattern-and-complexity", label: "Pattern & Complexity" },
    { id: "dry-run", label: "Step-by-Step Dry Run" },
    { id: "common-mistakes", label: "Common Mistakes" },
    { id: "variations-and-practice", label: "Variations & Practice" },
  ];

  const complexityRows: ComplexityRow[] = [
    {
      approach: "Brute Force",
      time: problem.bruteForce.timeComplexity,
      space: problem.bruteForce.spaceComplexity,
      notes: "Baseline naive implementation.",
    },
    ...(problem.betterSolution
      ? [
          {
            approach: "Better",
            time: problem.betterSolution.timeComplexity,
            space: problem.betterSolution.spaceComplexity,
            notes: "Intermediate optimization.",
          },
        ]
      : []),
    {
      approach: "Optimal",
      time: problem.optimalSolution.timeComplexity,
      space: problem.optimalSolution.spaceComplexity,
      notes: problem.optimalSolution.whyOptimal,
      isOptimal: true,
    },
  ];

  const getBadgeVariant = (diff: string): "easy" | "medium" | "hard" => {
    if (diff === "Easy") return "easy";
    if (diff === "Medium") return "medium";
    return "hard";
  };

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <Breadcrumbs items={breadcrumbs} />

        <div className={styles.headerArea}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{problem.title}</h1>
            <div className={styles.actions}>
              <Button
                variant={bookmarked ? "primary" : "secondary"}
                size="sm"
                onClick={() => toggleBookmark(problem.id)}
                icon={<Bookmark size={14} />}
              >
                {bookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
              <Button
                variant={solved ? "secondary" : "primary"}
                size="sm"
                onClick={() => markProblemSolved(problem.id)}
                icon={<CheckCircle2 size={14} />}
              >
                {solved ? "Solved" : "Mark as Solved"}
              </Button>
            </div>
          </div>

          <div className={styles.metaRow}>
            <Badge variant={getBadgeVariant(problem.difficulty)}>{problem.difficulty}</Badge>
            <Badge variant="level">{problem.progressionLevel}</Badge>
            <Badge variant="pattern">Pattern: {problem.pattern}</Badge>
            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Topic: {problem.topic} &bull; {problem.subtopic}
            </span>
          </div>

          {problem.companies && problem.companies.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginTop: "var(--space-3)", flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                <Building2 size={13} style={{ color: "var(--accent-primary)" }} />
                Asked at:
              </span>
              {problem.companies.map((company) => (
                <span key={company} className={styles.companyBadge}>
                  {company}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Problem Statement */}
        <section id="problem-statement" className={styles.section}>
          <h2 className={styles.sectionHeading}>Problem Statement</h2>
          <p style={{ fontSize: "var(--font-size-md)", color: "var(--text-primary)", lineHeight: 1.65 }}>
            {problem.statement}
          </p>
        </section>

        {/* Understand the problem */}
        <section id="understand-the-problem" className={styles.section}>
          <h2 className={styles.sectionHeading}>Understand the Problem (In Plain English)</h2>
          <div className={styles.understandBox}>
            <p style={{ margin: 0 }}>{problem.understandTheProblem}</p>
          </div>
        </section>

        {/* Examples & Constraints */}
        <section id="examples" className={styles.section}>
          <h2 className={styles.sectionHeading}>Examples & Constraints</h2>
          {problem.examples.map((ex, i) => (
            <div key={i} className={styles.exampleCard}>
              <div className={styles.exampleRow}>
                <span className={styles.exampleLabel}>Input:</span>
                <code>{ex.input}</code>
              </div>
              <div className={styles.exampleRow}>
                <span className={styles.exampleLabel}>Output:</span>
                <code>{ex.output}</code>
              </div>
              <div style={{ color: "var(--text-secondary)", marginTop: "var(--space-2)" }}>
                <strong>Explanation:</strong> {ex.explanation}
              </div>
            </div>
          ))}

          <h3 style={{ marginTop: "var(--space-6)" }}>Constraints</h3>
          <ul style={{ fontFamily: "var(--font-mono)", fontSize: "var(--font-size-xs)" }}>
            {problem.constraints.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </section>

        {/* Approach 1 — Brute Force */}
        <section id="approach-1-brute-force" className={styles.section}>
          <div className={styles.approachCard}>
            <div className={styles.approachHeader}>
              <h2 className={styles.approachTitle}>{problem.bruteForce.title}</h2>
              <Badge variant="default">Time: {problem.bruteForce.timeComplexity}</Badge>
            </div>
            <p>{problem.bruteForce.intuition}</p>
            <CodeBlock code={problem.bruteForce.code} />
            <div style={{ fontSize: "var(--font-size-sm)", color: "var(--text-secondary)", marginTop: "var(--space-3)" }}>
              <p><strong>Complexity:</strong> Time: <code>{problem.bruteForce.timeComplexity}</code> | Space: <code>{problem.bruteForce.spaceComplexity}</code></p>
              <p><strong>Limitations:</strong> {problem.bruteForce.explanation}</p>
            </div>
          </div>
        </section>

        {/* Approach 2 — Better Solution if available */}
        {problem.betterSolution && (
          <section id="approach-2-better" className={styles.section}>
            <div className={styles.approachCard}>
              <div className={styles.approachHeader}>
                <h2 className={styles.approachTitle}>{problem.betterSolution.title}</h2>
                <Badge variant="default">Time: {problem.betterSolution.timeComplexity}</Badge>
              </div>
              <p>{problem.betterSolution.intuition}</p>
              <CodeBlock code={problem.betterSolution.code} />
              <div style={{ fontSize: "var(--font-size-sm)", color: "var(--text-secondary)", marginTop: "var(--space-3)" }}>
                <p><strong>Complexity:</strong> Time: <code>{problem.betterSolution.timeComplexity}</code> | Space: <code>{problem.betterSolution.spaceComplexity}</code></p>
                <p><strong>Optimization:</strong> {problem.betterSolution.explanation}</p>
              </div>
            </div>
          </section>
        )}

        {/* Approach 3 — Optimal Solution */}
        <section id="approach-3-optimal" className={styles.section}>
          <div className={`${styles.approachCard}`} style={{ borderColor: "rgba(59, 130, 246, 0.4)", background: "rgba(59, 130, 246, 0.02)" }}>
            <div className={styles.approachHeader}>
              <h2 className={styles.approachTitle} style={{ color: "#60a5fa" }}>{problem.optimalSolution.title}</h2>
              <Badge variant="easy">Optimal: {problem.optimalSolution.timeComplexity}</Badge>
            </div>
            <p>{problem.optimalSolution.intuition}</p>
            <CodeBlock code={problem.optimalSolution.code} />
            <div style={{ fontSize: "var(--font-size-sm)", color: "var(--text-secondary)", marginTop: "var(--space-3)" }}>
              <p><strong>Why this is optimal:</strong> {problem.optimalSolution.whyOptimal}</p>
            </div>
          </div>
        </section>

        {/* Pattern & Complexity */}
        <section id="pattern-and-complexity" className={styles.section}>
          <h2 className={styles.sectionHeading}>Pattern & Complexity Comparison</h2>
          <Callout type="intuition" title={`Algorithmic Pattern: ${problem.pattern}`}>
            Mastering this pattern enables solving dozens of similar problems in interview rounds.
          </Callout>
          <ComplexityTable rows={complexityRows} />
        </section>

        {/* Step-by-Step Dry Run */}
        <section id="dry-run" className={styles.section}>
          <h2 className={styles.sectionHeading}>Step-by-Step Dry Run</h2>
          <DryRunTable
            sampleInput={problem.dryRun.sampleInput}
            steps={problem.dryRun.steps}
          />
        </section>

        {/* Common Mistakes */}
        <section id="common-mistakes" className={styles.section}>
          <h2 className={styles.sectionHeading}>Common Beginner Pitfalls</h2>
          {problem.commonMistakes.map((m, i) => (
            <div key={i} className={styles.mistakeRow}>
              <div style={{ color: "var(--error)", fontWeight: 600, fontSize: "var(--font-size-sm)", marginBottom: "var(--space-1)" }}>
                Pitfall #{i + 1}: {m.mistake}
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-sm)" }}>
                <strong>How to avoid:</strong> {m.fix}
              </div>
            </div>
          ))}
        </section>

        {/* Variations and Practice */}
        <section id="variations-and-practice" className={styles.section}>
          <h2 className={styles.sectionHeading}>Variations & Practice Progression</h2>
          <p>Once you are confident with this problem, attempt these variations in sequence:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "var(--space-3)", margin: "var(--space-4) 0" }}>
            {problem.practice.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--bg-surface)",
                  padding: "var(--space-3) var(--space-4)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "var(--font-size-sm)", fontWeight: 500 }}>{item.title}</span>
                <Badge variant={getBadgeVariant(item.difficulty)}>{item.difficulty}</Badge>
              </div>
            ))}
          </div>

          {problem.companies && problem.companies.length > 0 && (
            <div style={{ marginTop: "var(--space-6)" }}>
              <span style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                Frequently Asked At:
              </span>
              <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginTop: "var(--space-2)" }}>
                {problem.companies.map((c) => (
                  <span
                    key={c}
                    style={{
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--border-subtle)",
                      fontSize: "var(--font-size-xs)",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "var(--radius-xs)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <TableOfContents items={tocItems} />
    </div>
  );
};
