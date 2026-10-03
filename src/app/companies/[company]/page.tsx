import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { getAllCompanies, getCompanyBySlug, getProblemsForCompany } from "@/content/companies";
import { getHomePath, getCompaniesPath, getCompanyPath, getProblemPath } from "@/lib/routes";
import {
  createPageMetadata,
  createBreadcrumbJsonLd,
  createItemListJsonLd,
  createFaqJsonLd,
  createTechArticleJsonLd,
} from "@/lib/seo";
import { SeoAnswerCapsule } from "@/components/seo/SeoAnswerCapsule";
import { SeoFaqAccordion } from "@/components/seo/SeoFaqAccordion";
import styles from "./companyPage.module.css";

interface PageProps {
  params: Promise<{ company: string }>;
}

export async function generateStaticParams() {
  const companies = getAllCompanies();
  return companies.map((c) => ({
    company: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { company: slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) return {};

  const problems = getProblemsForCompany(company.name);

  return createPageMetadata({
    title: `${company.name} Coding Interview Questions & DSA Sheet (2026)`,
    description: `Crack the ${company.name} software engineering interview. ${problems.length} verified high-frequency coding questions, complete hiring loop breakdown (OA to Onsite), and 3-tier quad-lingual solutions.`,
    path: getCompanyPath(company.slug),
    keywords: [
      `${company.name} coding interview questions`,
      `${company.name} leetcode`,
      `${company.name} OA questions`,
      `${company.name} DSA sheet`,
      `${company.name} interview experience`,
      `${company.name} technical interview 2026`,
      ...company.keyPatterns.map((p) => `${company.name} ${p.toLowerCase()}`),
    ],
  });
}

export default async function CompanyDetailPage({ params }: PageProps) {
  const { company: slug } = await params;
  const company = getCompanyBySlug(slug);

  if (!company) {
    notFound();
  }

  const companyProblems = getProblemsForCompany(company.name);
  const breadcrumbs = [
    { label: "Home", href: getHomePath() },
    { label: "Companies", href: getCompaniesPath() },
    { label: company.name },
  ];

  const breadcrumbJsonLd = createBreadcrumbJsonLd(breadcrumbs);
  const itemListJsonLd = createItemListJsonLd({
    name: `${company.name} Coding Interview Problems`,
    description: `Top verified coding interview questions asked at ${company.name}.`,
    path: getCompanyPath(company.slug),
    items: companyProblems.map((p) => ({
      name: p.title,
      path: getProblemPath(p.slug),
      description: `${p.difficulty} problem in ${p.topic} using the ${p.pattern} pattern.`,
    })),
  });

  const faqs = [
    {
      question: `What are the most common DSA patterns asked in ${company.name} interviews?`,
      answer: `The most recurring patterns at ${company.name} include: ${company.keyPatterns.join(", ")}. Prioritize these patterns when preparing.`,
    },
    {
      question: `How many interview rounds does ${company.name} typically conduct?`,
      answer: `${company.name} typically conducts ${company.hiringProcess.rounds.length} main evaluation stages: ${company.hiringProcess.rounds.map((r) => r.name).join(", ")}.`,
    },
    {
      question: `What is the evaluation bar at ${company.name}?`,
      answer: `${company.overview} Key focus: ${company.hiringProcess.barRaiserNote}`,
    },
  ];

  const faqJsonLd = createFaqJsonLd(faqs);
  const articleJsonLd = createTechArticleJsonLd({
    headline: `${company.name} Coding Interview Guide & Questions`,
    description: company.overview,
    path: getCompanyPath(company.slug),
  });

  const getDifficultyVariant = (diff: string): "easy" | "medium" | "hard" => {
    if (diff === "Medium") return "medium";
    return "hard";
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbs} />

        <header className={styles.header}>
          <div className={styles.topBadgeRow}>
            <Badge variant="level">{company.category.toUpperCase()}</Badge>
            <Badge variant={getDifficultyVariant(company.difficulty)}>
              BAR: {company.difficulty.toUpperCase()}
            </Badge>
            {company.ticker && (
              <span style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                Ticker: {company.ticker}
              </span>
            )}
          </div>

          <h1 className={styles.title}>{company.name} Coding Interview Sheet</h1>
          <p className={styles.desc}>{company.overview}</p>
        </header>

        {/* Direct Answer Summary for Google AI Overviews & Searchers */}
        <SeoAnswerCapsule
          title={`How to Crack the ${company.name} Technical Interview`}
          summary={`Candidates interviewing at ${company.name} must master ${company.keyPatterns.slice(0, 3).join(", ")}. Focus on writing bug-free production code, explaining time-space trade-offs clearly, and testing edge cases before submitting.`}
          metrics={[
            { label: "Curated Problems", value: `${companyProblems.length} Problems` },
            { label: "Hiring Bar", value: company.difficulty },
            { label: "Top Pattern", value: company.keyPatterns[0] || "Two Pointers" },
            { label: "Interview Rounds", value: `${company.hiringProcess.rounds.length} Stages` },
          ]}
          takeaway={company.tips[0] || "Always articulate your thought process aloud before writing code."}
          badgeText={`${company.name.toUpperCase()} INTERVIEW STRATEGY`}
        />

        {/* Hiring Rounds Breakdown */}
        <section className={styles.roundsSection}>
          <h2 className={styles.sectionTitle}>The {company.name} Hiring Process & Evaluation Rubric</h2>
          <div className={styles.roundsTimeline}>
            {company.hiringProcess.rounds.map((round) => (
              <div key={round.name} className={styles.roundCard}>
                <div className={styles.roundHeader}>
                  <span className={styles.roundName}>{round.name}</span>
                  <span className={styles.roundFocus}>{round.focus}</span>
                </div>
                <p className={styles.roundDesc}>{round.description}</p>
              </div>
            ))}
          </div>

          <div className={styles.barRaiserCallout}>
            <strong>Evaluation Bar Note:</strong> {company.hiringProcess.barRaiserNote}
          </div>
        </section>

        {/* Curated Company Problems */}
        <section className={styles.problemsSection}>
          <h2 className={styles.sectionTitle}>
            Verified {company.name} Coding Questions ({companyProblems.length})
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--font-size-sm)", marginBottom: "var(--space-4)" }}>
            Every problem features 3-tier solutions (Brute Force, Better, Optimal) across Java, C++, Python, and JavaScript with complete dry runs.
          </p>

          <div className={styles.problemsGrid}>
            {companyProblems.map((problem) => (
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

        {/* Interview Tips */}
        <section style={{ margin: "var(--space-8) 0", padding: "var(--space-5)", background: "var(--surface-card)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)" }}>
          <h2 className={styles.sectionTitle}>Insider Tips for {company.name}</h2>
          <ul style={{ paddingLeft: "var(--space-4)", color: "var(--text-secondary)", fontSize: "var(--font-size-sm)", lineHeight: 1.8 }}>
            {company.tips.map((tip, idx) => (
              <li key={idx} style={{ marginBottom: "var(--space-2)" }}>{tip}</li>
            ))}
          </ul>
        </section>

        {/* FAQs */}
        <SeoFaqAccordion
          title={`${company.name} Interview FAQs`}
          subtitle={`Frequently asked questions about technical assessments and hiring rounds at ${company.name}.`}
          items={faqs}
        />
      </div>
    </>
  );
}
