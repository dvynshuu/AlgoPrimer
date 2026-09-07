import { Problem } from "@/types/content";
import { arrayProblems } from "./arrays";
import { twoPointersSlidingWindowProblems } from "./twoPointersSlidingWindow";
import { stringProblems } from "./strings";
import { linkedListProblems } from "./linkedList";
import { binarySearchProblems } from "./binarySearch";
import { stackProblems } from "./stacks";
import { treeGraphProblems } from "./treesGraphs";
import { dpProblems } from "./dp";

export const problems: Problem[] = [
  ...arrayProblems,
  ...twoPointersSlidingWindowProblems,
  ...stringProblems,
  ...linkedListProblems,
  ...binarySearchProblems,
  ...stackProblems,
  ...treeGraphProblems,
  ...dpProblems,
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
