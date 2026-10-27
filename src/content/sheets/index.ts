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
          .slice(0, 14),
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
          .slice(0, 10),
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
  {
    id: "sheet-sde-core-45",
    slug: "sde-core-45",
    title: "SDE Core 45 Placement Sheet",
    tagline: "Essential 45-problem curriculum for campus placement drives & SDE-1 off-campus hiring",
    description:
      "A razor-sharp 45-problem curriculum covering the most frequent data structures and algorithmic patterns tested during technical rounds, designed for complete mastery within 4 weeks.",
    targetAudience:
      "Pre-final and final year college students, freshers, and early-career software engineers targeting SDE-1 roles.",
    estimatedWeeks: 4,
    featured: true,
    totalProblems: 45,
    categories: [
      {
        title: "Arrays & Two Pointers Core",
        description: "Contiguous arrays, convergence pointers, and Kadane's maximum subarray algorithm.",
        problems: problems
          .filter((p) => p.topicSlug === "arrays" && !p.pattern.toLowerCase().includes("interval"))
          .slice(0, 8),
      },
      {
        title: "Strings & Sliding Window",
        description: "Dynamic window expansion, frequency tracking, and substring invariants.",
        problems: problems
          .filter((p) => p.topicSlug === "strings" || p.pattern.toLowerCase().includes("sliding window"))
          .slice(0, 8),
      },
      {
        title: "Linked Lists & Fast-Slow Pointers",
        description: "In-place pointer reversal, cycle detection, and composite cache architectures.",
        problems: problems.filter((p) => p.topicSlug === "linked-list").slice(0, 7),
      },
      {
        title: "Binary Trees & BST Essentials",
        description: "Subtree recursion, post-order aggregations, and bounded range BST validations.",
        problems: problems
          .filter((p) => p.topicSlug === "trees" || p.topicSlug === "bst")
          .slice(0, 8),
      },
      {
        title: "Graphs & Topological Sort",
        description: "Adjacency traversals, cycle detection, and prerequisite compilation.",
        problems: problems.filter((p) => p.topicSlug === "graphs").slice(0, 7),
      },
      {
        title: "Dynamic Programming & Optimization",
        description: "State transition formulas, memoization, and 1D rolling array space compression.",
        problems: problems.filter((p) => p.topicSlug === "dynamic-programming").slice(0, 7),
      },
    ],
    faqs: [
      {
        question: "How is the SDE Core 45 sheet tailored for campus placements?",
        answer:
          "Campus placement drives (both on-campus and off-campus) typically feature 2-3 standard-to-medium problems per test. The SDE Core 45 focuses strictly on high-yield archetypes that recur across 85% of company screening tests, stripping away low-probability obscure puzzles.",
      },
      {
        question: "What is the recommended weekly pace for this sheet?",
        answer:
          "Complete 11-12 problems per week: spend 2 days on linear structures (Arrays/Strings/LinkedLists), 2 days on hierarchical structures (Trees/Graphs), and 2 days on optimization (DP/Greedy), reserving the 7th day for mock tests and dry-run reviews.",
      },
      {
        question: "Should I memorize code templates before the interview?",
        answer:
          "Never memorize raw code syntax blindly. Instead, memorize the fundamental state invariants: e.g., how the left pointer moves in a dynamic sliding window, or why Floyd's fast pointer catches slow in at most C steps. Derive the syntax from these first principles.",
      },
    ],
  },
  {
    id: "sheet-service-to-product",
    slug: "service-to-product",
    title: "Service-to-Product Transition Sheet",
    tagline: "Structured high-ROI bridge roadmap from IT services (TCS, Infosys, Wipro) to Product MNCs",
    description:
      "Calibrated specifically for engineers at IT services, system integrators, and consulting firms who want to break into product-based engineering teams like Amazon, Microsoft, Flipkart, and Uber.",
    targetAudience:
      "Engineers with 1-5 years of experience in service companies transitioning to product engineering roles.",
    estimatedWeeks: 6,
    featured: true,
    totalProblems: 40,
    categories: [
      {
        title: "Fundamental Arrays & Hash Lookups",
        description: "Eliminating nested O(N^2) loops using HashMap lookups and prefix arrays.",
        problems: problems
          .filter(
            (p) =>
              (p.topicSlug === "arrays" || p.topicSlug === "strings") &&
              ["Easy", "Medium"].includes(p.difficulty)
          )
          .slice(0, 8),
      },
      {
        title: "Linear Data Structures & Cache Mechanics",
        description: "Reversals, monotonic stacks, and foundational LRU cache architectures.",
        problems: problems
          .filter((p) => p.topicSlug === "linked-list" || p.topicSlug === "stack")
          .slice(0, 8),
      },
      {
        title: "Tree Recursion & Traversals",
        description: "Overcoming fear of recursion with post-order traversal and binary search spaces.",
        problems: problems
          .filter((p) => p.topicSlug === "trees" || p.topicSlug === "binary-search")
          .slice(0, 8),
      },
      {
        title: "Standard Graph Traversal & Matrix BFS",
        description: "Grid connectivity, level-order shortest path, and island counting.",
        problems: problems
          .filter((p) => p.topicSlug === "graphs" || p.topicSlug === "backtracking")
          .slice(0, 8),
      },
      {
        title: "High-Yield Dynamic Programming & Greedy",
        description: "Transforming exponential recursion into polynomial runtime via memoization.",
        problems: problems
          .filter(
            (p) =>
              p.topicSlug === "dynamic-programming" ||
              p.topicSlug === "greedy" ||
              p.pattern.toLowerCase().includes("interval")
          )
          .slice(0, 8),
      },
    ],
    faqs: [
      {
        question: "How do I overcome the 90-day notice period barrier in Indian IT service companies?",
        answer:
          "Target tier-1 product companies and startups that routinely buy out notice periods or actively hire engineers serving their notice period. Begin interviewing in the second month of your notice period when you have 30-45 days remaining.",
      },
      {
        question: "What is the biggest difference in expectations between Service and Product interviews?",
        answer:
          "Service interviews often focus on language syntax trivia (e.g., 'What is final vs finally in Java?'). Product companies evaluate problem-solving ability from first principles: deriving time and space complexity, handling edge cases, writing clean modular code, and explaining architectural trade-offs.",
      },
      {
        question: "How should I position client project experience on my resume for product companies?",
        answer:
          "Reframe client maintenance bullets around engineering impact: quantify performance optimizations (e.g. 'reduced API latency by 40%'), highlight architectural choices (concurrency, database indexing, caching), and showcase high code quality rather than generic maintenance tasks.",
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
