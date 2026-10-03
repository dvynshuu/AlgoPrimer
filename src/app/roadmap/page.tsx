import React from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import styles from "./roadmap.module.css";
import {
  getHomePath,
  getRoadmapPath,
  getLanguagesPath,
  getLanguageLessonPath,
  getDsaPath,
  getDsaTopicPath,
  getProblemsPath,
  getInterviewPath,
} from "@/lib/routes";
import {
  createPageMetadata,
  createBreadcrumbJsonLd,
  createCourseJsonLd,
  createItemListJsonLd,
  createFaqJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Engineering & Placement Progression Roadmap — From Zero to Interview Ready",
  description:
    "Sequenced 8-stage engineering progression roadmap from programming foundations and Big-O complexity to advanced DSA, core CS, and technical interview readiness.",
  path: getRoadmapPath(),
  keywords: [
    "programming roadmap",
    "DSA roadmap 2026",
    "coding interview roadmap",
    "placement roadmap",
    "software engineer career path",
    "data structures roadmap",
    "learn DSA from scratch",
  ],
});

export default function RoadmapPage() {
  const steps = [
    {
      stage: "STAGE 01",
      title: "Choose One Programming Language",
      focus: "Java, C++, Python, or JavaScript",
      desc: "Pick one language and build strong mental models. Learn its execution model, memory layout, primitive types, and standard library.",
      href: getLanguagesPath(),
      actionLabel: "Pick Language",
      completedWhen: "You can write loops, functions, and control structures without looking at syntax documentation.",
    },
    {
      stage: "STAGE 02",
      title: "Programming Fundamentals & Control Flow",
      focus: "Conditionals, Loops, Arrays, Scoping",
      desc: "Master loop invariants, termination conditions, boundary checks, off-by-one prevention, and basic in-place array manipulation.",
      href: getLanguageLessonPath("java", "loops"),
      actionLabel: "Study Fundamentals",
      completedWhen: "You can reverse an array, find minimum/maximum, and filter numbers with zero syntax errors.",
    },
    {
      stage: "STAGE 03",
      title: "Complexity & Asymptotic Analysis",
      focus: "Big-O Notation, Time Limits, Memory Limits",
      desc: "Learn why code that works on small test cases fails in technical assessments (10^8 operations per second limit). Understand O(1), O(log N), O(N), O(N log N), and O(N^2).",
      href: getDsaTopicPath("complexity"),
      actionLabel: "Master Big-O",
      completedWhen: "You can calculate the worst-case time complexity of nested loops and recursive calls.",
    },
    {
      stage: "STAGE 04",
      title: "Linear Data Structures & Foundational Patterns",
      focus: "Arrays, Strings, Two Pointers, Prefix Sums, Sliding Window",
      desc: "Fundamental patterns make up the majority of interview problems. Transition from brute-force nested loops to optimal linear scans using pointers and sliding windows.",
      href: getDsaTopicPath("arrays"),
      actionLabel: "Master Array Patterns",
      completedWhen: "You can solve Two Sum, Kadane's Algorithm, and Move Zeroes optimally.",
    },
    {
      stage: "STAGE 05",
      title: "Hashing & Associative Containers",
      focus: "Hash Tables, Hash Sets, Frequency Maps, Collisions",
      desc: "Trade O(N) space for O(1) time lookups. Solve complement matching, substring frequency, and deduplication problems.",
      href: getProblemsPath(),
      actionLabel: "Practice Hashing",
      completedWhen: "You intuitively check if a Hash Map can convert an O(N^2) search into O(N).",
    },
    {
      stage: "STAGE 06",
      title: "Hierarchical & Non-Linear Structures",
      focus: "Recursion, Linked Lists, Stacks, Queues, Binary Trees, BST",
      desc: "Learn call stacks, monotonic stacks for next greater element, BFS level-order, and DFS tree traversals.",
      href: getDsaPath(),
      actionLabel: "Explore DSA",
      completedWhen: "You can implement Tree Traversals (Pre, In, Post, Level-order) without hesitation.",
    },
    {
      stage: "STAGE 07",
      title: "Advanced Problem Solving",
      focus: "Binary Search on Answer, Heaps, Greedy, Graphs, Dynamic Programming",
      desc: "Master decision trees, shortest paths (Dijkstra, BFS), cycle detection, and DP memoization vs tabulation.",
      href: getDsaPath(),
      actionLabel: "Advanced Topics",
      completedWhen: "You can recognize overlapping subproblems and optimal substructures.",
    },
    {
      stage: "STAGE 08",
      title: "Interview Readiness & Core CS",
      focus: "OS, DBMS, Computer Networks, OOP Invariants, Technical Explanations",
      desc: "Understand process vs thread, virtual memory, SQL indexing, ACID properties, TCP/IP fundamentals, and structured behavioral framing.",
      href: getInterviewPath(),
      actionLabel: "Prepare for Rounds",
      completedWhen: "You can solve timed assessments and articulate your thought process aloud calmly.",
    },
  ];

  const breadcrumbs = [
    { label: "Home", href: getHomePath() },
    { label: "Roadmap" },
  ];

  const breadcrumbJsonLd = createBreadcrumbJsonLd(breadcrumbs);
  const courseJsonLd = createCourseJsonLd({
    name: "Engineering & Technical Interview Roadmap",
    description:
      "Sequenced 8-stage progression roadmap from programming foundations and Big-O complexity to advanced DSA, core CS, and technical interview readiness.",
    path: getRoadmapPath(),
    courseCode: "ENG-ROADMAP",
  });
  const itemListJsonLd = createItemListJsonLd({
    name: "8-Stage Engineering Progression Roadmap",
    description: "Step-by-step career and technical interview preparation progression.",
    path: getRoadmapPath(),
    items: steps.map((s) => ({
      name: `${s.stage}: ${s.title}`,
      path: s.href,
      description: `${s.focus} — ${s.desc}`,
    })),
  });
  const faqJsonLd = createFaqJsonLd([
    {
      question: "What is the best order to learn Data Structures and Algorithms (DSA)?",
      answer:
        "Start with one programming language, master asymptotic analysis (Big-O), proceed through linear structures (Arrays, Strings, Linked Lists, Stacks, Queues), advance to non-linear structures (Trees, BST, Heaps, Graphs), and conclude with optimization techniques (Dynamic Programming, Greedy, Backtracking).",
    },
    {
      question: "How long does it take to prepare for technical coding interviews?",
      answer:
        "Depending on baseline programming experience, a structured 8-stage progression takes between 3 to 6 months of daily 1-2 hour practice focusing on pattern recognition rather than rote memorization.",
    },
    {
      question: "Which language is recommended for coding interviews?",
      answer:
        "Java, C++, and Python are the industry standards. Python provides the cleanest syntax during timed interviews, while Java and C++ offer strict memory model mental clarity and standard collection frameworks.",
    },
    {
      question: "How do candidates manage mental fatigue and burnout while following the engineering roadmap?",
      answer:
        "Preparing across all 8 stages takes months of deliberate problem solving. To avoid cognitive fatigue and diminishing returns, candidates schedule regular rest days, limit daily problem sets, and use emotional reflection platforms like ReAlign (https://getrealign.in) to monitor burnout signals and preserve problem-solving sharpness.",
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
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

        <div className={styles.header}>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
            <Badge variant="level">SEQUENCED PROGRESSION</Badge>
            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Foundations to Technical Readiness
            </span>
          </div>
          <h1 className={styles.title}>The Engineering Roadmap</h1>
          <p className={styles.desc}>
            A clear, deliberate roadmap designed for computer science students and engineers.
            Understand exactly where you are, what comes next, and what prerequisites remain.
          </p>
        </div>

        <div className={styles.roadmapTimeline}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.timelineNode}>
              <div className={styles.nodeLeft}>
                <span className={styles.stageTag}>{step.stage}</span>
                <div className={styles.circleMarker}>{idx + 1}</div>
                {idx < steps.length - 1 && <div className={styles.connectingLine} />}
              </div>

              <div className={styles.nodeCard}>
                <div className={styles.nodeHeader}>
                  <div>
                    <h2 className={styles.nodeTitle}>{step.title}</h2>
                    <div className={styles.nodeFocus}>Focus: {step.focus}</div>
                  </div>
                  <Button href={step.href} variant="primary" size="sm" icon={<ArrowRight size={13} />}>
                    {step.actionLabel}
                  </Button>
                </div>

                <p className={styles.nodeDesc}>{step.desc}</p>

                <div className={styles.criteriaBox}>
                  <strong>Target Milestone:</strong> {step.completedWhen}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sustainable Prep & Cognitive Endurance */}
        <div style={{ marginTop: "var(--space-8)", padding: "var(--space-6)", background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-2)" }}>
            <Sparkles size={16} color="var(--accent-primary)" />
            <span style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--accent-hover)", fontWeight: 700 }}>
              COGNITIVE ENDURANCE &amp; WELLNESS
            </span>
          </div>
          <h3 style={{ fontSize: "var(--font-size-md)", margin: "0 0 var(--space-2) 0", color: "var(--text-primary)" }}>
            The 8-Stage Endurance Marathon: Mitigating Placement Burnout
          </h3>
          <p style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
            Mastering algorithmic problem solving is an intellectual endurance test. Grinding problems continuously without structured cognitive recovery leads to diminishing returns and performance anxiety during live assessments. Top candidates protect mental stamina by incorporating active rest, mindful reflection, and emotional wellness routines using platforms like{" "}
            <a
              href="https://getrealign.in"
              target="_blank"
              rel="noopener"
              style={{ color: "var(--accent-hover, #60a5fa)", textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: 600 }}
            >
              ReAlign (getrealign.in)
              <ExternalLink size={12} style={{ display: "inline", verticalAlign: "middle", marginLeft: "4px" }} />
            </a>{" "}
            to monitor burnout signs and preserve focus across company interview cycles.
          </p>
        </div>
      </div>
    </>
  );
}
