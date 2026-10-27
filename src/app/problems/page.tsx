import React from "react";
import type { Metadata } from "next";
import { ProblemsClient } from "@/components/problems/ProblemsClient";
import { createPageMetadata, createBreadcrumbJsonLd, createItemListJsonLd } from "@/lib/seo";
import { getHomePath, getProblemsPath, getProblemPath } from "@/lib/routes";
import { getProblemCount } from "@/lib/contentCounts";
import { getProblemSummaries } from "@/content/problems";

export const metadata: Metadata = createPageMetadata({
  title: "Coding Interview Problems — Patterns, Approaches & Solutions",
  description: `Master ${getProblemCount()}+ curated technical interview problems with 3-tier solutions (Brute Force, Better, Optimal) across Java, C++, Python, and JavaScript.`,
  path: getProblemsPath(),
  keywords: [
    "coding interview problems",
    "DSA practice",
    "leetcode patterns",
    "two sum",
    "algorithms practice",
    "technical interview preparation",
  ],
});

export default function ProblemsPage() {
  const problemSummaries = getProblemSummaries();
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { label: "Home", href: getHomePath() },
    { label: "Problems", href: getProblemsPath() },
  ]);

  const itemListJsonLd = createItemListJsonLd({
    name: "Curated Technical Interview Problems",
    description: "High-frequency coding interview problems with 3-tier quad-lingual solutions and step-by-step dry runs.",
    path: getProblemsPath(),
    items: problemSummaries.map((p) => ({
      name: `${p.title} (${p.difficulty})`,
      path: getProblemPath(p.slug),
      description: `Pattern: ${p.pattern} • Topic: ${p.topic}${p.companies && p.companies.length > 0 ? ` • Companies: ${p.companies.slice(0, 3).join(", ")}` : ""}`,
    })),
  });

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
      <ProblemsClient initialProblems={problemSummaries} />
    </>
  );
}
