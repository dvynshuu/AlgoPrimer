import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { getAllSheets, getSheetBySlug } from "@/content/sheets";
import { getHomePath, getSheetsPath, getSheetPath, getProblemPath } from "@/lib/routes";
import {
  createPageMetadata,
  createBreadcrumbJsonLd,
  createItemListJsonLd,
  createCourseJsonLd,
  createFaqJsonLd,
} from "@/lib/seo";
import { SeoAnswerCapsule } from "@/components/seo/SeoAnswerCapsule";
import { SeoFaqAccordion } from "@/components/seo/SeoFaqAccordion";
import styles from "./sheetPage.module.css";

interface PageProps {
  params: Promise<{ sheet: string }>;
}

export async function generateStaticParams() {
  const sheets = getAllSheets();
  return sheets.map((s) => ({
    sheet: s.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sheet: slug } = await params;
  const sheet = getSheetBySlug(slug);
  if (!sheet) return {};

  return createPageMetadata({
    title: `${sheet.title} — 3-Tier Quad-Lingual Solutions (2026)`,
    description: `${sheet.description} Complete implementations in Java, C++, Python, and JavaScript with step-by-step dry runs and complexity bounds.`,
    path: getSheetPath(sheet.slug),
    keywords: [
      sheet.title,
      `${sheet.title} solutions`,
      "Blind 75 sheet",
      "Blind 75 alternative",
      "coding interview sheet",
      "DSA patterns",
      "technical interview preparation 2026",
    ],
  });
}

export default async function SheetDetailPage({ params }: PageProps) {
  const { sheet: slug } = await params;
  const sheet = getSheetBySlug(slug);

  if (!sheet) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: getHomePath() },
    { label: "Sheets", href: getSheetsPath() },
    { label: sheet.title },
  ];

  const allProblems = sheet.categories.flatMap((c) => c.problems);

  const breadcrumbJsonLd = createBreadcrumbJsonLd(breadcrumbs);
  const courseJsonLd = createCourseJsonLd({
    name: sheet.title,
    description: sheet.description,
    path: getSheetPath(sheet.slug),
    courseCode: `SHEET-${sheet.slug.toUpperCase()}`,
  });
  const itemListJsonLd = createItemListJsonLd({
    name: `${sheet.title} Problems`,
    description: sheet.description,
    path: getSheetPath(sheet.slug),
    items: allProblems.map((p) => ({
      name: p.title,
      path: getProblemPath(p.slug),
      description: `${p.difficulty} in ${p.topic} (${p.pattern})`,
    })),
  });
  const faqJsonLd = createFaqJsonLd(sheet.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
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
            <Badge variant="level">CANONICAL CURATION</Badge>
            <span style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
              ~{sheet.estimatedWeeks} Weeks Timeline &bull; {allProblems.length} Problems
            </span>
          </div>

          <h1 className={styles.title}>{sheet.title}</h1>
          <div className={styles.tagline}>{sheet.tagline}</div>
          <p className={styles.desc}>{sheet.description}</p>
        </header>

        {/* Direct Answer Summary for AI Searchers & Featured Snippets */}
        <SeoAnswerCapsule
          title={`How to Master the ${sheet.title}`}
          summary={`The ${sheet.title} is designed for pattern recognition rather than memorization. Spend 1-2 hours daily solving problems grouped by algorithmic technique. Every problem provides 3-tier solutions (Brute Force, Better, Optimal) in Java, C++, Python, and JavaScript.`}
          metrics={[
            { label: "Target Timeline", value: `~${sheet.estimatedWeeks} Weeks` },
            { label: "Core Categories", value: `${sheet.categories.length} Topics` },
            { label: "Solutions", value: "Java, C++, Python, JS" },
            { label: "Progression", value: "Brute to Optimal" },
          ]}
          takeaway="Focus on the underlying pattern: understanding one optimal pattern unlocks 5+ interview variations."
          badgeText="SHEET STUDY STRATEGY"
        />

        {/* Categories & Problem Lists */}
        {sheet.categories.map((category) => (
          <section key={category.title} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              <p className={styles.categoryDesc}>{category.description}</p>
            </div>

            <div className={styles.problemsGrid}>
              {category.problems.map((problem) => (
                <Link
                  key={problem.id}
                  href={getProblemPath(problem.slug)}
                  className={styles.problemCard}
                >
                  <div>
                    <div className={styles.probTop}>
                      <h3 className={styles.probTitle}>{problem.title}</h3>
                      <Badge variant={problem.difficulty === "Easy" ? "easy" : problem.difficulty === "Medium" ? "medium" : "hard"}>
                        {problem.difficulty}
                      </Badge>
                    </div>
                    <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)" }}>
                      Pattern: {problem.pattern}
                    </span>
                  </div>

                  <div className={styles.probMeta}>
                    <span>{problem.topic}</span>
                    <span style={{ color: "var(--color-primary)", display: "inline-flex", alignItems: "center", gap: "2px" }}>
                      Solution &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <SeoFaqAccordion
          title={`${sheet.title} FAQs`}
          subtitle="Frequently asked questions about studying and completing this practice sheet."
          items={sheet.faqs}
        />
      </div>
    </>
  );
}
