import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { getAllSheets } from "@/content/sheets";
import { getHomePath, getSheetsPath, getSheetPath } from "@/lib/routes";
import {
  createPageMetadata,
  createBreadcrumbJsonLd,
  createItemListJsonLd,
  createFaqJsonLd,
} from "@/lib/seo";
import { SeoFaqAccordion } from "@/components/seo/SeoFaqAccordion";
import { ArrowRight, BookOpen } from "lucide-react";
import styles from "./sheets.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Curated Coding Interview Sheets — Blind 75 & Top 50 FAANG (2026)",
  description:
    "Master high-yield coding interview sheets with canonical 3-tier solutions across Java, C++, Python, and JavaScript. Blind 75, Top 50 FAANG, and core algorithmic pattern sheets.",
  path: getSheetsPath(),
  keywords: [
    "Blind 75 sheet",
    "Blind 75 alternative",
    "Top 50 FAANG problems",
    "coding interview sheets",
    "best DSA sheet 2026",
    "NeetCode 150 alternative",
    "Striver SDE sheet alternative",
    "LeetCode pattern sheet",
  ],
});

export default function SheetsHubPage() {
  const sheets = getAllSheets();
  const breadcrumbs = [
    { label: "Home", href: getHomePath() },
    { label: "Sheets" },
  ];

  const breadcrumbJsonLd = createBreadcrumbJsonLd(breadcrumbs);
  const itemListJsonLd = createItemListJsonLd({
    name: "Curated Coding Interview Sheets",
    description: "High-yield problem sheets for technical placement interviews.",
    path: getSheetsPath(),
    items: sheets.map((s) => ({
      name: s.title,
      path: getSheetPath(s.slug),
      description: s.description,
    })),
  });

  const faqs = [
    {
      question: "What is the difference between Blind 75 and Top 50 FAANG?",
      answer:
        "Blind 75 is a balanced curriculum that covers all 12 major algorithmic patterns for broad technical readiness. Top 50 FAANG is a hyper-concentrated sheet calibrated for candidates with upcoming interviews at Google, Meta, Amazon, and Microsoft in 2-4 weeks.",
    },
    {
      question: "Are solutions provided in multiple programming languages?",
      answer:
        "Yes, every problem across our sheets includes full code implementations in Java, C++, Python, and JavaScript across Brute Force, Better, and Optimal approaches with complete dry runs.",
    },
    {
      question: "How long does it take to complete the Blind 75 sheet?",
      answer:
        "With 1-2 hours of daily focused study, most students and engineers finish the Blind 75 sheet within 6 to 8 weeks.",
    },
  ];

  const faqJsonLd = createFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbs} />

        <header className={styles.header}>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
            <Badge variant="level">HIGH-YIELD PRACTICE SHEETS</Badge>
            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Pattern-Based Progression
            </span>
          </div>
          <h1 className={styles.title}>Curated Coding Interview Sheets</h1>
          <p className={styles.desc}>
            Eliminate tutorial fatigue and solve the exact problem sets that matter. Our curated sheets
            condense hundreds of random questions into tightly organized pattern roadmaps with quad-lingual 3-tier solutions.
          </p>
        </header>

        <div className={styles.sheetsGrid}>
          {sheets.map((sheet) => (
            <Link
              key={sheet.slug}
              href={getSheetPath(sheet.slug)}
              className={styles.sheetCard}
            >
              <div>
                <Badge variant="pattern">~{sheet.estimatedWeeks} WEEKS TIMELINE</Badge>
                <h2 className={styles.sheetTitle}>{sheet.title}</h2>
                <div className={styles.sheetTagline}>{sheet.tagline}</div>
                <p className={styles.sheetDesc}>{sheet.description}</p>
                <div style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", marginBottom: "var(--space-4)" }}>
                  <strong>Target:</strong> {sheet.targetAudience}
                </div>
              </div>

              <div className={styles.sheetMeta}>
                <span>
                  <BookOpen size={12} style={{ display: "inline", marginRight: "4px" }} />
                  {sheet.totalProblems} Curated Questions
                </span>
                <span className={styles.arrowLink}>
                  Start Sheet <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <SeoFaqAccordion
          title="Interview Sheet FAQs"
          subtitle="How to use curated DSA sheets to maximize problem-solving retention and speed."
          items={faqs}
        />
      </div>
    </>
  );
}
