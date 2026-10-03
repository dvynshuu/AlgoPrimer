import { problems } from "@/content/problems";
import { Problem } from "@/types/content";

export interface SheetCategory {
  title: string;
  description: string;
  problems: Problem[];
}

export interface SheetInfo {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  targetAudience: string;
  estimatedWeeks: number;
  featured: boolean;
  totalProblems: number;
  categories: SheetCategory[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const sheetsData: SheetInfo[] = [
  {
    id: "sheet-blind-75",
    slug: "blind-75",
    title: "Blind 75 Coding Interview Sheet",
    tagline: "The definitive 75-problem list with 3-tier quad-lingual solutions",
    description:
      "The canonical Blind 75 curated problem set covering all fundamental data structures and algorithmic patterns required for top-tier software engineering interviews.",
    targetAudience: "Engineers preparing for FAANG, Big Tech, and top product startup interviews within a 4-8 week timeframe.",
    estimatedWeeks: 6,
    featured: true,
    totalProblems: 65, // Maps to our curated company bank
    categories: [
      {
        title: "Arrays & Two Pointers",
        description: "Contiguous sequences, boundary pointers, and hash table lookup optimization.",
        problems: problems.filter((p) => p.topicSlug === "arrays" && !p.pattern.toLowerCase().includes("interval")),
      },
      {
        title: "Sliding Window & Substrings",
        description: "Dynamic and fixed-size contiguous subarrays and frequency window tracking.",
        problems: problems.filter((p) => p.topicSlug === "strings" || p.pattern.toLowerCase().includes("sliding window")),
      },
      {
        title: "Binary Search",
        description: "Logarithmic search space reduction and binary search on optimization answers.",
        problems: problems.filter((p) => p.topicSlug === "binary-search"),
      },
      {
        title: "Linked Lists & In-Place Pointers",
        description: "Pointer redirection, dummy heads, and fast/slow cycle detection.",
        problems: problems.filter((p) => p.topicSlug === "linked-list"),
      },
      {
        title: "Trees & Binary Search Trees",
        description: "Hierarchical recursion, depth-first search, and level-order traversals.",
        problems: problems.filter((p) => p.topicSlug === "trees" || p.topicSlug === "bst"),
      },
      {
        title: "Heaps & Top-K Elements",
        description: "Priority queues, streaming minimum/maximum, and median tracking.",
        problems: problems.filter((p) => p.topicSlug === "heap"),
      },
      {
        title: "Graphs & Topological Sort",
        description: "Adjacency traversals, cycle detection (Kahn's), and connected components.",
        problems: problems.filter((p) => p.topicSlug === "graphs"),
      },
      {
        title: "Dynamic Programming & Optimization",
        description: "Memoization, state transitions, subproblem recurrence, and knapsack variants.",
        problems: problems.filter((p) => p.topicSlug === "dynamic-programming"),
      },
      {
        title: "Intervals & Scheduling",
        description: "Overlapping intervals, merging, and greedy interval selection.",
        problems: problems.filter((p) => p.topicSlug === "greedy" || p.pattern.toLowerCase().includes("interval")),
      },
      {
        title: "Stacks, Queues & Monotonic Patterns",
        description: "LIFO/FIFO disciplines and next greater element patterns.",
        problems: problems.filter((p) => p.topicSlug === "stack" || p.topicSlug === "queue"),
      },
      {
        title: "Backtracking & Exhaustive Search",
        description: "Combinatorial decision trees, candidate pruning, and state exploration.",
        problems: problems.filter((p) => p.topicSlug === "backtracking"),
      },
      {
        title: "Bit Manipulation",
        description: "XOR cancellations, bitwise shifts, and two's complement mechanics.",
        problems: problems.filter((p) => p.topicSlug === "bit-manipulation"),
      },
    ],
    faqs: [
      {
        question: "Why is the Blind 75 sheet so effective for coding interviews?",
        answer:
          "Blind 75 strips away redundant LeetCode variations and focuses exclusively on pattern recognition. Mastering these 75 core problems provides the algorithmic intuition to solve over 90% of technical interview questions.",
      },
      {
        question: "How should I practice the Blind 75 sheet on AlgoPrimer?",
        answer:
          "Solve 2-3 problems per day by pattern. For each problem, study the Brute Force first, inspect the step-by-step dry run, and understand why the Optimal solution reaches its asymptotic lower bound in Java, C++, Python, or JavaScript.",
      },
      {
        question: "How long does it take to complete the Blind 75?",
        answer:
          "A consistent schedule of 10-12 hours per week allows most candidates to comfortably complete the Blind 75 in 6 to 8 weeks with deep understanding.",
      },
    ],
  },
  {
    id: "sheet-top-50-faang",
    slug: "top-50-faang",
    title: "Top 50 FAANG Coding Interview Problems",
    tagline: "High-frequency interview questions asked at Google, Meta, Amazon & Microsoft",
    description:
      "A concentrated 50-problem sheet calibrated specifically against verified hiring rounds at Amazon, Google, Meta, Microsoft, and Apple.",
    targetAudience: "Candidates with an upcoming technical interview in 2-4 weeks needing maximum yield per practice hour.",
    estimatedWeeks: 4,
    featured: true,
    totalProblems: 50,
    categories: [
      {
        title: "High-Frequency Arrays & Strings",
        description: "The most recurring array and string interview questions in FAANG screens.",
        problems: problems
          .filter((p) => (p.topicSlug === "arrays" || p.topicSlug === "strings") && (p.companies || []).some((c) => ["Google", "Meta", "Amazon", "Microsoft"].includes(c)))
          .slice(0, 15),
      },
      {
        title: "Core Trees & Graph Algorithms",
        description: "High-yield tree DFS/BFS and graph cycle detection problems.",
        problems: problems
          .filter((p) => p.topicSlug === "trees" || p.topicSlug === "graphs" || p.topicSlug === "bst")
          .slice(0, 12),
      },
      {
        title: "Dynamic Programming & Optimization Essentials",
        description: "Key DP problems frequently asked in Google and Amazon onsite rounds.",
        problems: problems.filter((p) => p.topicSlug === "dynamic-programming").slice(0, 10),
      },
      {
        title: "Heaps, Intervals & Linked Lists",
        description: "Essential data structure design and pointer manipulation problems.",
        problems: problems
          .filter((p) => p.topicSlug === "heap" || p.topicSlug === "linked-list" || p.topicSlug === "greedy" || p.pattern.toLowerCase().includes("interval"))
          .slice(0, 12),
      },
      {
        title: "Binary Search, Stacks & Bitwise Tricks",
        description: "High-yield search space reduction, monotonic stacks, and bitwise tricks.",
        problems: problems
          .filter((p) => p.topicSlug === "binary-search" || p.topicSlug === "stack" || p.topicSlug === "bit-manipulation")
          .slice(0, 11),
      },
    ],
    faqs: [
      {
        question: "What makes FAANG coding interview problems different?",
        answer:
          "FAANG interviewers evaluate more than just code execution: they grade communication clarity, time and space complexity trade-offs, modular structure, and handling of tricky edge cases under time pressure.",
      },
      {
        question: "Can I crack FAANG interviews by only solving these 50 problems?",
        answer:
          "Yes, provided you understand the underlying patterns (Two Pointers, Sliding Window, BFS/DFS, Dynamic Programming) rather than memorizing specific code.",
      },
    ],
  },
];

export function getAllSheets(): SheetInfo[] {
  return sheetsData;
}

export function getSheetBySlug(slug: string): SheetInfo | undefined {
  const norm = slug.trim().toLowerCase();
  return sheetsData.find((s) => s.slug === norm);
}
