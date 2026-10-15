import { Problem } from "@/types/content";
import { arrayProblems } from "./arrays";
import { twoPointersSlidingWindowProblems } from "./twoPointersSlidingWindow";
import { stringProblems } from "./strings";
import { linkedListProblems } from "./linkedList";
import { binarySearchProblems } from "./binarySearch";
import { stackProblems } from "./stacks";
import { treeGraphProblems } from "./treesGraphs";
import { dpProblems } from "./dp";
import { heapProblems } from "./heaps";
import { intervalProblems } from "./intervals";
import { backtrackingProblems } from "./backtracking";
import { bitManipulationProblems } from "./bitManipulation";

export const problems: Problem[] = [
  ...arrayProblems,
  ...twoPointersSlidingWindowProblems,
  ...stringProblems,
  ...linkedListProblems,
  ...binarySearchProblems,
  ...stackProblems,
  ...treeGraphProblems,
  ...dpProblems,
  ...heapProblems,
  ...intervalProblems,
  ...backtrackingProblems,
  ...bitManipulationProblems,
];


export function getProblemBySlug(slug: string): Problem | undefined {
  return problems.find((p) => p.slug === slug);
}

export function getProblemsByTopic(topic: string): Problem[] {
  return problems.filter((p) => p.topic.toLowerCase() === topic.toLowerCase());
}

export function getProblemsByCompany(company: string): Problem[] {
  return problems.filter((p) =>
    p.companies?.some((c) => c.toLowerCase() === company.toLowerCase())
  );
}

export interface ProblemSummary {
  id: string;
  slug: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  subtopic: string;
  pattern: string;
  progressionLevel: string;
  companies?: string[];
}

export function getProblemSummaries(): ProblemSummary[] {
  return problems.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    difficulty: p.difficulty,
    topic: p.topic,
    subtopic: p.subtopic,
    pattern: p.pattern,
    progressionLevel: p.progressionLevel,
    companies: p.companies,
  }));
}
