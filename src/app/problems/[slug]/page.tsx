import React from "react";
import { notFound } from "next/navigation";
import { ProblemViewer } from "@/components/content/ProblemViewer";
import { problems } from "@/content/problems";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return problems.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const problem = problems.find((p) => p.slug === slug);
  if (!problem) return {};

  return {
    title: `${problem.title} — CampusPrep Problem Bank`,
    description: `3-tier solution (Brute Force, Better, Optimal) in Java, C++, and Python for ${problem.title}.`,
  };
}

export default async function ProblemDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const problem = problems.find((p) => p.slug === slug);

  if (!problem) {
    notFound();
  }

  return <ProblemViewer problem={problem} />;
}
