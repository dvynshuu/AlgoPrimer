import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { getAllCompanies, getProblemsForCompany } from "@/content/companies";
import { getHomePath, getCompaniesPath, getCompanyPath } from "@/lib/routes";
import {
  createPageMetadata,
  createBreadcrumbJsonLd,
  createItemListJsonLd,
  createFaqJsonLd,
} from "@/lib/seo";
import { SeoFaqAccordion } from "@/components/seo/SeoFaqAccordion";
import { ArrowRight, Briefcase } from "lucide-react";
import styles from "./companies.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Top Tech Company Coding Interview Questions & DSA Sheets (2026)",
  description:
    "Prepare for technical coding interviews at Amazon, Google, Microsoft, Meta, Apple, Bloomberg, Goldman Sachs, and more. Verified interview rounds, DSA sheets, and 3-tier solutions.",
  path: getCompaniesPath(),
  keywords: [
    "company coding interview questions",
    "Amazon coding interview questions",
    "Google DSA sheet",
    "Microsoft OA leetcode",
    "Meta interview questions",
    "FAANG coding preparation 2026",
    "Goldman Sachs coderpad problems",
    "Bloomberg technical interview",
  ],
});

export default function CompaniesHubPage() {
  const companies = getAllCompanies();
  const breadcrumbs = [
    { label: "Home", href: getHomePath() },
    { label: "Companies" },
  ];

  const breadcrumbJsonLd = createBreadcrumbJsonLd(breadcrumbs);
  const itemListJsonLd = createItemListJsonLd({
    name: "Top Tech Companies Coding Interview Sheets",
    description: "Curated technical interview sheets and hiring round breakdowns by company.",
    path: getCompaniesPath(),
    items: companies.map((c) => ({
      name: `${c.name} Coding Interview Sheet`,
      path: getCompanyPath(c.slug),
      description: `${c.name} technical hiring process and problem set (${getProblemsForCompany(c.name).length} questions).`,
    })),
  });

  const faqs = [
    {
      question: "Which company has the hardest coding interview?",
      answer:
        "Google and Meta are generally recognized as having the most rigorous coding assessments. Google emphasizes novel mathematical algorithms and deep graph traversals, while Meta requires candidates to solve two LeetCode Medium problems bug-free within 45 minutes.",
    },
    {
      question: "How should I prepare for company-specific Online Assessments (OAs)?",
      answer:
        "Focus on the primary patterns favored by that company: Amazon tests Two Pointers and Priority Queues; Microsoft emphasizes Linked Lists and Trees; Meta tests Sliding Window and Intervals; Bloomberg asks LRU Cache variants.",
    },
    {
      question: "Are the solutions provided across multiple programming languages?",
      answer:
        "Yes, every problem linked in our company sheets includes full implementations in Java, C++, Python, and JavaScript with complete step-by-step dry runs and complexity bounds.",
    },
  ];

  const faqJsonLd = createFaqJsonLd(faqs);

  const getDifficultyVariant = (diff: string): "easy" | "medium" | "hard" => {
    if (diff === "Medium") return "medium";
    if (diff === "High") return "hard";
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

      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbs} />

        <header className={styles.header}>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
            <Badge variant="level">VERIFIED HIRING PROCESSES</Badge>
            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              {companies.length} Top Tech & Placement Companies
            </span>
          </div>
          <h1 className={styles.title}>Company Coding Interview Sheets</h1>
          <p className={styles.desc}>
            Target your dream company with precision. Study the exact evaluation rubrics, hiring loop breakdowns,
            Online Assessment (OA) formats, and curated problem banks asked by real engineering interview panels.
          </p>
        </header>

        <div className={styles.grid}>
          {companies.map((company) => {
            const companyProblems = getProblemsForCompany(company.name);

            return (
              <Link
                key={company.slug}
                href={getCompanyPath(company.slug)}
                className={styles.companyCard}
              >
                <div>
                  <div className={styles.cardHeader}>
                    <div>
                      <h2 className={styles.companyName}>{company.name}</h2>
                      {company.ticker && <span className={styles.ticker}>{company.ticker}</span>}
                    </div>
                    <Badge variant={getDifficultyVariant(company.difficulty)}>
                      {company.difficulty}
                    </Badge>
                  </div>

                  <p className={styles.companyOverview}>{company.overview}</p>

                  <div className={styles.keyPatterns}>
                    {company.keyPatterns.slice(0, 4).map((p) => (
                      <span key={p} className={styles.patternPill}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.metaRow}>
                  <span>
                    <Briefcase size={12} style={{ display: "inline", marginRight: "4px" }} />
                    {companyProblems.length} Curated Problem{companyProblems.length !== 1 ? "s" : ""}
                  </span>
                  <span className={styles.arrowLink}>
                    View Sheet <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <SeoFaqAccordion
          title="Company Coding Interview FAQs"
          subtitle="Everything you need to know about preparing for top tech placement drives and engineering rounds."
          items={faqs}
        />
      </div>
    </>
  );
}
