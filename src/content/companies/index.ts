import { problems } from "@/content/problems";
import { Problem } from "@/types/content";

export interface CompanyInfo {
  name: string;
  slug: string;
  ticker?: string;
  category: "FAANG / Big Tech" | "Finance & FinTech" | "Enterprise & Cloud" | "Indian IT & Service";
  difficulty: "Very High" | "High" | "Medium";
  hiringProcess: {
    rounds: {
      name: string;
      description: string;
      focus: string;
    }[];
    barRaiserNote: string;
  };
  overview: string;
  keyPatterns: string[];
  tips: string[];
}

export const companiesData: CompanyInfo[] = [
  {
    name: "Amazon",
    slug: "amazon",
    ticker: "AMZN",
    category: "FAANG / Big Tech",
    difficulty: "High",
    overview:
      "Amazon technical interviews prioritize medium-to-hard algorithmic problem solving, clean code readability, and strict adherence to the 16 Leadership Principles (LPs).",
    hiringProcess: {
      rounds: [
        {
          name: "Round 1: Online Assessment (OA)",
          description: "2 algorithmic problems on HackerRank (70 mins) followed by a 20-min Work Style Assessment and work simulation.",
          focus: "Arrays, Strings, Hash Maps, Priority Queues (Top-K), and BFS.",
        },
        {
          name: "Round 2: Technical Phone Screen",
          description: "45-60 min live coding session with an Amazon engineer using Amazon Chime / LiveCode.",
          focus: "Data structures, time complexity optimization, and 1 LP behavioral question.",
        },
        {
          name: "Round 3-6: Onsite Loop (4-5 rounds)",
          description: "Full-day panel: 2-3 DSA rounds, 1 System Design (for L5+), and 1 dedicated Bar Raiser round.",
          focus: "Trees, Graphs, DP, Intervals, Two Pointers, and deep LP behavioral probe using the STAR method.",
        },
      ],
      barRaiserNote:
        "The Bar Raiser is an independent interviewer who evaluates whether the candidate raises the bar of the current team, focusing heavily on Customer Obsession and Ownership.",
    },
    keyPatterns: ["Two Pointers", "Sliding Window", "BFS/DFS Graphs", "Priority Queue / Top-K", "Dynamic Programming"],
    tips: [
      "Always state your brute force approach first before jumping into optimal O(N) or O(N log N) solutions.",
      "Frame all behavioral answers in the STAR format (Situation, Task, Action, Result) mapped to Amazon Leadership Principles.",
      "Write production-quality code: use meaningful variable names and handle edge cases (null inputs, empty arrays, integer overflows).",
    ],
  },
  {
    name: "Google",
    slug: "google",
    ticker: "GOOGL",
    category: "FAANG / Big Tech",
    difficulty: "Very High",
    overview:
      "Google coding interviews evaluate algorithmic intuition, rigorous complexity analysis, and mathematical creativity. Questions often feature novel twists rather than standard LeetCode copies.",
    hiringProcess: {
      rounds: [
        {
          name: "Round 1: Technical Phone Screen",
          description: "45-minute live coding session on Google Docs or an internal coding sandbox.",
          focus: "Algorithms, Trees, Graphs, and asymptotic trade-offs.",
        },
        {
          name: "Round 2-5: Virtual Onsite (4-5 rounds)",
          description: "4 technical coding rounds (45 mins each) evaluating DSA, scalable problem solving, and 1 'Googliness & Leadership' round.",
          focus: "Hard Graph algorithms (Dijkstra, Topological Sort), Dynamic Programming, Binary Search on Answer, and Disjoint Set Union.",
        },
      ],
      barRaiserNote:
        "Google uses centralized hiring committees. Your interviewers only write feedback rubrics; the final hiring decision is made by an independent committee reviewing your code correctness, speed, and analytical rigor.",
    },
    keyPatterns: ["Binary Search on Answer", "Graph Traversals (BFS/DFS)", "Dynamic Programming", "Trie & Prefix Trees", "Union Find"],
    tips: [
      "Ask clarifying questions about input bounds (N <= 10^5 vs N <= 10^9 determines if O(N) or O(log N) is expected).",
      "Think out loud constantly: Google interviewers grade your thought process and how you navigate edge cases.",
      "Dry run your code on a non-trivial test case before telling the interviewer you are finished.",
    ],
  },
  {
    name: "Microsoft",
    slug: "microsoft",
    ticker: "MSFT",
    category: "FAANG / Big Tech",
    difficulty: "High",
    overview:
      "Microsoft technical interviews focus on solid computer science fundamentals, clear communication, Linked Lists, Trees, String manipulation, and modular software engineering practices.",
    hiringProcess: {
      rounds: [
        {
          name: "Round 1: Codility / Mettl OA",
          description: "2-3 coding problems (60-90 mins) focusing on array manipulation, strings, and recursion.",
          focus: "Correctness on edge cases and optimal time bounds.",
        },
        {
          name: "Round 2: Technical Screening",
          description: "45-min live session covering core data structures and past project deep dives.",
          focus: "Linked Lists, Binary Trees, and Hash Maps.",
        },
        {
          name: "Round 3-6: Virtual Onsite Loop (4 rounds)",
          description: "3 technical DSA / Low-Level Design rounds and 1 round with a Partner or Engineering Director (AA / As Appropriate).",
          focus: "Trees, Graphs, Recursion, Stack patterns, and architectural trade-offs.",
        },
      ],
      barRaiserNote:
        "The 'As Appropriate' (AA) interviewer evaluates team culture fit, growth mindset, and engineering excellence across Microsoft products.",
    },
    keyPatterns: ["Linked Lists & Pointers", "Binary Trees & BST", "Two Pointers", "Backtracking", "Hash Maps"],
    tips: [
      "Write modular, clean code: split helper functions if logic gets complex.",
      "Be prepared to explain memory trade-offs (e.g. recursion call stack space vs iterative pointers).",
      "Demonstrate a Growth Mindset: be receptive to hints and incorporate interviewer feedback quickly.",
    ],
  },
  {
    name: "Meta",
    slug: "meta",
    ticker: "META",
    category: "FAANG / Big Tech",
    difficulty: "Very High",
    overview:
      "Meta technical interviews are known for high speed and precision: candidates are expected to solve 2 full algorithmic problems with working, bug-free code in a single 45-minute round.",
    hiringProcess: {
      rounds: [
        {
          name: "Round 1: Technical Screen",
          description: "45 minutes: 2 coding questions on CoderPad. Aim for 20 minutes per question including testing.",
          focus: "High-frequency LeetCode Mediums: Arrays, Two Pointers, Trees, Intervals.",
        },
        {
          name: "Round 2-5: Full Virtual Onsite",
          description: "2 Coding rounds (2 problems each), 1 System Design (E4+), and 1 Behavioral round.",
          focus: "Speed, accuracy, graph cycle detection, binary search, and sliding window.",
        },
      ],
      barRaiserNote:
        "Meta coding rounds require fast typing and immediate pattern recognition. Lingering on brute force for more than 3 minutes reduces time needed for the second problem.",
    },
    keyPatterns: ["Sliding Window", "Interval Merging", "Tree DFS/BFS", "Binary Search", "Two Pointers"],
    tips: [
      "Practice solving LeetCode Mediums in under 15 minutes with complete syntax accuracy.",
      "Verify constraints early to select the optimal pattern without hesitating.",
      "Test your code manually line-by-line with edge cases: empty lists, single element, negative numbers.",
    ],
  },
  {
    name: "Apple",
    slug: "apple",
    ticker: "AAPL",
    category: "FAANG / Big Tech",
    difficulty: "High",
    overview:
      "Apple interview loops are highly team-specific. They value deep low-level understanding, memory efficiency, clean algorithmic problem solving, and domain expertise.",
    hiringProcess: {
      rounds: [
        {
          name: "Round 1: Recruiter & Phone Screen",
          description: "45-60 min technical screen with the hiring manager or senior engineer.",
          focus: "Core CS, data structures, and past technical challenges.",
        },
        {
          name: "Round 2-6: Team Onsite Panel (5-6 rounds)",
          description: "Intensive 1-on-1 rounds with team members evaluating DSA, systems programming, and cultural alignment.",
          focus: "Arrays, Bit Manipulation, Stacks, Trees, and concurrency/memory management.",
        },
      ],
      barRaiserNote:
        "Apple interviewers focus heavily on craftsmanship, attention to detail, and deep understanding of how code interacts with underlying hardware and memory.",
    },
    keyPatterns: ["Bit Manipulation", "Arrays & Strings", "Linked Lists", "Binary Search", "Stacks & Queues"],
    tips: [
      "Understand memory allocation: stack vs heap, pointer mechanics, and cache locality.",
      "Explain time and space complexity with exact constant factors when asked.",
      "Show passion for user experience and performance optimization.",
    ],
  },
  {
    name: "Bloomberg",
    slug: "bloomberg",
    ticker: "BBG",
    category: "Finance & FinTech",
    difficulty: "High",
    overview:
      "Bloomberg engineering interviews heavily test real-time systems intuition, Hash Maps, Two Pointers, Linked Lists, LRU Cache variants, and asynchronous event processing.",
    hiringProcess: {
      rounds: [
        {
          name: "Round 1: First Round Phone Interview",
          description: "45-60 min coding on HackerRank / CodePair with 2 Bloomberg engineers.",
          focus: "String parsing, Two Pointers, Stacks, and Hash Map frequency tracking.",
        },
        {
          name: "Round 2-4: Onsite Loop",
          description: "3 technical coding/system design rounds plus 1 HR & Senior Manager round.",
          focus: "LRU Cache, Trees, Graphs, Sorting, and low-latency performance.",
        },
      ],
      barRaiserNote:
        "Bloomberg places strong emphasis on why you want Bloomberg specifically, your interest in financial markets technology, and real-time reliability.",
    },
    keyPatterns: ["LRU Cache & Design", "Hash Maps & Heaps", "Two Pointers", "String Manipulation", "Stacks"],
    tips: [
      "Master LRU Cache ($O(1)$ get and put using Doubly Linked List + Hash Map); it is one of Bloomberg's most iconic interview questions.",
      "Be prepared to answer why financial data streams require strict latency guarantees.",
      "Demonstrate clean object-oriented class design alongside algorithmic problem solving.",
    ],
  },
  {
    name: "Goldman Sachs",
    slug: "goldman-sachs",
    ticker: "GS",
    category: "Finance & FinTech",
    difficulty: "High",
    overview:
      "Goldman Sachs interviews focus on mathematical foundations, dynamic programming, two pointers, arrays, and string algorithms for high-throughput financial computing.",
    hiringProcess: {
      rounds: [
        {
          name: "Round 1: HackerRank OA",
          description: "2 coding questions (Math/Array/DP) + computer science multiple-choice questions (OS, DBMS, OOP).",
          focus: "Number theory, Prefix sums, and Subarray optimization.",
        },
        {
          name: "Round 2: CoderPad Screen",
          description: "60-min live session: 1-2 coding problems with executable test cases.",
          focus: "Two Pointers, Strings, Hash Maps, and Recursion.",
        },
        {
          name: "Round 3-6: Superday Panel (4-5 rounds)",
          description: "Back-to-back 45-min rounds covering Algorithms, Core CS, System Design, and Behavioral alignment.",
          focus: "DP, Heaps, Matrix operations, and SQL/DBMS queries.",
        },
      ],
      barRaiserNote:
        "Goldman Sachs Superday interviewers evaluate how you handle edge cases and stress testing under financial risk constraints.",
    },
    keyPatterns: ["Prefix Sums & Arrays", "Dynamic Programming", "Math & Number Theory", "Two Pointers", "Heaps"],
    tips: [
      "Review Big-O complexity of standard library sorting and hashing collections in Java / C++.",
      "Be strong on Core CS fundamentals (OS threads vs processes, ACID properties, DBMS indexing).",
      "Pay attention to extreme test cases: negative numbers, very large inputs causing integer overflow ($> 2^{31}-1$).",
    ],
  },
  {
    name: "Uber",
    slug: "uber",
    ticker: "UBER",
    category: "FAANG / Big Tech",
    difficulty: "Very High",
    overview:
      "Uber coding interviews focus on graph algorithms, routing, spatial indexing, intervals, sliding window, and concurrent rate-limiting patterns.",
    hiringProcess: {
      rounds: [
        {
          name: "Round 1: Online Assessment",
          description: "CodeSignal General Coding Assessment (70 mins, 4 questions).",
          focus: "Speed, matrix traversal, and simulation.",
        },
        {
          name: "Round 2: Phone Screen",
          description: "45-60 min live coding round on CodePair.",
          focus: "Graphs (BFS/DFS), Intervals, and Sliding Window.",
        },
        {
          name: "Round 3-6: Virtual Onsite Panel",
          description: "2 DSA coding rounds, 1 System Architecture round, and 1 Culture/Collaboration round.",
          focus: "Shortest path algorithms, Topological Sort, Heaps, and rate limiting.",
        },
      ],
      barRaiserNote:
        "Uber interviewers value candidates who can bridge theoretical graph algorithms with real-world geospatial dispatch problems.",
    },
    keyPatterns: ["Graph BFS & DFS", "Interval Scheduling", "Sliding Window", "Heaps & Top-K", "Trie"],
    tips: [
      "Know how to model real-world routing problems as weighted or unweighted directed graphs.",
      "Practice interval merging and insertion problems thoroughly.",
      "Write clean, modular code with clear separation of algorithmic helpers.",
    ],
  },
  {
    name: "Adobe",
    slug: "adobe",
    ticker: "ADBE",
    category: "Enterprise & Cloud",
    difficulty: "High",
    overview:
      "Adobe technical interviews emphasize Linked Lists, Binary Trees, Dynamic Programming, Strings, and memory-efficient data structures for digital media and cloud services.",
    hiringProcess: {
      rounds: [
        {
          name: "Round 1: HackerRank OA",
          description: "2 coding questions + aptitude and CS fundamental MCQs.",
          focus: "Arrays, Strings, and DP.",
        },
        {
          name: "Round 2-4: Technical Rounds",
          description: "In-depth live coding focusing on Trees, Pointers, and Recursion.",
          focus: "Binary Tree traversals, Linked List manipulation, and Palindrome patterns.",
        },
      ],
      barRaiserNote:
        "Adobe evaluates mathematical aptitude, recursion depth awareness, and object-oriented architectural clarity.",
    },
    keyPatterns: ["Binary Trees", "Linked Lists", "Dynamic Programming", "Strings & Palindromes", "Backtracking"],
    tips: [
      "Master pointer manipulation without auxiliary space.",
      "Be prepared for deep OOP questions (design patterns like Factory, Singleton, Observer).",
      "Explain time-space trade-offs clearly before writing code.",
    ],
  },
  {
    name: "TCS",
    slug: "tcs",
    ticker: "TCS",
    category: "Indian IT & Service",
    difficulty: "Medium",
    overview:
      "TCS National Qualifier Test (NQT) and Digital/Prime coding rounds test foundational problem solving, arrays, strings, basic dynamic programming, and core CS fundamentals.",
    hiringProcess: {
      rounds: [
        {
          name: "Round 1: TCS NQT (National Qualifier Test)",
          description: "Foundation section (Aptitude, Reasoning, Verbal) + Advanced Cognitive & 2 Coding Problems (45 mins).",
          focus: "Arrays, Strings, Math, and Basic Recursion.",
        },
        {
          name: "Round 2: Technical Interview (TR)",
          description: "30-45 min interview evaluating code written in NQT, OOP, DBMS, OS, and projects.",
          focus: "Array operations, Sorting algorithms, String reversal, and SQL queries.",
        },
        {
          name: "Round 3: Managerial & HR Interview (MR/HR)",
          description: "Assessment of communication, adaptability, and company culture fit.",
          focus: "Situational questions, relocation willingness, and learning goals.",
        },
      ],
      barRaiserNote:
        "TCS Digital and Prime bands offer higher compensation packages based on top performance in the advanced coding section of NQT.",
    },
    keyPatterns: ["Arrays & Searching", "Strings & Palindromes", "Basic Dynamic Programming", "Math & Prime Numbers", "Sorting"],
    tips: [
      "Master basic coding in Java or C++ with zero syntax errors.",
      "Prepare standard sorting algorithms (Bubble, Insertion, Merge, Quick) and their complexities.",
      "Be ready to explain every project listed on your resume and write basic SQL queries.",
    ],
  },
  {
    name: "Infosys",
    slug: "infosys",
    ticker: "INFY",
    category: "Indian IT & Service",
    difficulty: "Medium",
    overview:
      "Infosys hiring assessments (HackWithInfy, InfyTQ, and DSE/SP placement drives) feature algorithmic challenges ranging from greedy algorithms to dynamic programming and graph basics.",
    hiringProcess: {
      rounds: [
        {
          name: "Round 1: Online Assessment / HackWithInfy",
          description: "3 coding problems (3 hours) of varying difficulty for System Engineer, DSE, or Specialist Programmer roles.",
          focus: "Arrays, Strings, Greedy, and Dynamic Programming.",
        },
        {
          name: "Round 2: Technical Interview",
          description: "45-min interview testing data structures, algorithms, Java/Python fundamentals, and DBMS.",
          focus: "Linked Lists, Recursion, Trees, and SQL joins.",
        },
        {
          name: "Round 3: HR Interview",
          description: "Behavioral and verification round.",
          focus: "Communication skills, relocation, and career aspirations.",
        },
      ],
      barRaiserNote:
        "Specialist Programmer (SP) and Digital Specialist Engineer (DSE) roles require solving hard DP and Graph problems with optimal time complexity.",
    },
    keyPatterns: ["Greedy Algorithms", "Dynamic Programming", "Arrays & Strings", "Binary Search", "Trees"],
    tips: [
      "Practice solving multi-testcase problems within strict time limits.",
      "Understand time complexity limits (10^8 ops per second rule for 1-second limit).",
      "Be confident in core OOP principles and database normalization.",
    ],
  },
];

export function getAllCompanies(): CompanyInfo[] {
  return companiesData;
}

export function getCompanyBySlug(slug: string): CompanyInfo | undefined {
  const norm = slug.trim().toLowerCase();
  return companiesData.find((c) => c.slug === norm);
}

export function getProblemsForCompany(companyName: string): Problem[] {
  const norm = companyName.trim().toLowerCase();
  return problems.filter((p) =>
    (p.companies || []).some((c) => c.toLowerCase() === norm || norm.includes(c.toLowerCase()) || c.toLowerCase().includes(norm))
  );
}
