import React from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { revisionCards } from "@/content/revision";
import { Check, AlertTriangle, Lightbulb } from "lucide-react";
import styles from "./revision.module.css";
import { getHomePath, getRevisionPath } from "@/lib/routes";
import { createPageMetadata, createBreadcrumbJsonLd } from "@/lib/seo";
import { getRevisionCount } from "@/lib/contentCounts";

export const metadata: Metadata = createPageMetadata({
  title: "High-Yield Revision Cards — Rapid Technical Review",
  description: `Rapid 5-minute technical review cards covering memory layouts, complexity boundaries, core idioms, and pitfalls across ${getRevisionCount()} essential topics.`,
  path: getRevisionPath(),
  keywords: [
    "DSA revision cards",
    "cheat sheet",
    "coding interview review",
    "algorithm complexity cheat sheet",
    "quick revision",
  ],
});

export default function RevisionPage() {
  const breadcrumbs = [
    { label: "Home", href: getHomePath() },
    { label: "Revision" },
  ];

  const breadcrumbJsonLd = createBreadcrumbJsonLd(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbs} />

        <div className={styles.header}>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
            <Badge variant="level">SPACED REPETITION FOUNDATION</Badge>
            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              {revisionCards.length} High-Yield Cards
            </span>
          </div>
          <h1 className={styles.title}>High-Yield Revision Cards</h1>
          <p className={styles.desc}>
            Designed for rapid 5-minute review before technical assessments and interview rounds.
            Review core memory layouts, time boundaries, beginner pitfalls, and code idioms.
          </p>
        </div>

        <div className={styles.cardGrid}>
          {revisionCards.map((card) => (
            <div key={card.id} id={card.id} className={styles.revCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{card.title}</h2>
                <Badge variant="pattern">{card.category}</Badge>
              </div>

              {/* Remember */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionLabel} style={{ color: "#60a5fa" }}>
                  <Check size={14} /> Remember
                </div>
                <ul className={styles.list}>
                  {card.rememberPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>

              {/* Common Mistakes */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionLabel} style={{ color: "#f87171" }}>
                  <AlertTriangle size={14} /> Common Pitfalls
                </div>
                <ul className={styles.list}>
                  {card.commonMistakes.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>

              {/* Key Patterns */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionLabel} style={{ color: "#c084fc" }}>
                  <Lightbulb size={14} /> Important Patterns
                </div>
                <ul className={styles.list}>
                  {card.importantPatterns.map((pat, i) => (
                    <li key={i}>{pat}</li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet if provided */}
              {card.codeSnippet && (
                <div style={{ marginTop: "var(--space-4)" }}>
                  <div style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: "4px" }}>
                    Key Implementation Idiom:
                  </div>
                  <pre className={styles.codeSnippet}>
                    <code>{card.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
