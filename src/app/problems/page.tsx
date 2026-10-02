import React from "react";
import type { Metadata } from "next";
import { ProblemsClient } from "@/components/problems/ProblemsClient";
import { createPageMetadata, createBreadcrumbJsonLd } from "@/lib/seo";
import { getHomePath, getProblemsPath } from "@/lib/routes";
import { getProblemCount } from "@/lib/contentCounts";

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
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { label: "Home", href: getHomePath() },
    { label: "Problems", href: getProblemsPath() },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProblemsClient />
    </>
  );
}
