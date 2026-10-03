import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProblemViewer } from "@/components/content/ProblemViewer";
import { problems } from "@/content/problems";
import {
  createProblemMetadata,
  createBreadcrumbJsonLd,
  createProblemJsonLd,
} from "@/lib/seo";
import { getProblemBreadcrumbs, getDsaTopicBySlug } from "@/lib/routes";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return problems.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const problem = problems.find((p) => p.slug === slug);
  if (!problem) return {};

  return createProblemMetadata(problem);
}

export default async function ProblemDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const problem = problems.find((p) => p.slug === slug);

  if (!problem) {
    notFound();
  }

  const topicMeta = getDsaTopicBySlug(problem.topicSlug);
  const breadcrumbItems = getProblemBreadcrumbs(problem, topicMeta);
  const breadcrumbJsonLd = createBreadcrumbJsonLd(breadcrumbItems);
  const problemJsonLd = createProblemJsonLd(problem);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(problemJsonLd) }}
      />
      <ProblemViewer problem={problem} />
    </>
  );
}
