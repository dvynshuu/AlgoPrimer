import React from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import styles from "./roadmap.module.css";

export const metadata = {
  title: "Placement Progression Roadmap — CampusPrep",
  description: "Minimal, pedagogical roadmap from first line of code to placement readiness.",
};

export default function RoadmapPage() {
  const steps = [
    {
      stage: "STAGE 01",
      title: "Choose One Programming Language",
      focus: "Java, C++, or Python",
      desc: "Pick one language and stick with it. Learn its compiler/runtime execution model, data types, primitive sizes in memory, and standard I/O.",
      href: "/languages",
      actionLabel: "Pick Language",
      completedWhen: "You can write loops and functions without looking at syntax documentation.",
    },
    {
      stage: "STAGE 02",
      title: "Programming Fundamentals & Control Flow",
      focus: "Conditionals, Loops, Arrays, Scoping",
      desc: "Master loop invariants, termination conditions, boundary checks (< vs <=), off-by-one prevention, and basic in-place array manipulation.",
      href: "/languages/java/loops",
      actionLabel: "Study Fundamentals",
      completedWhen: "You can reverse an array, find minimum/maximum, and filter numbers with zero syntax errors.",
    },
    {
      stage: "STAGE 03",
      title: "Complexity & Asymptotic Analysis",
      focus: "Big-O Notation, Time Limits, Memory Limits",
      desc: "Learn why code that works on small test cases fails in Online Assessments (10^8 operations per second limit). Understand O(1), O(log N), O(N), O(N log N), O(N^2).",
      href: "/dsa/complexity",
      actionLabel: "Master Big-O",
      completedWhen: "You can calculate the worst-case time complexity of nested loops and recursive calls.",
    },
    {
      stage: "STAGE 04",
      title: "Linear Data Structures & Foundational Patterns",
      focus: "Arrays, Strings, Two Pointers, Prefix Sums, Sliding Window",
      desc: "60% of all interview problems are array and string problems. Transition from brute-force nested loops to optimal linear scans using pointers and prefix sums.",
      href: "/dsa/arrays",
      actionLabel: "Master Array Patterns",
      completedWhen: "You can solve Two Sum, Kadane's Algorithm, and Move Zeroes optimally.",
    },
    {
      stage: "STAGE 05",
      title: "Hashing & Associative Containers",
      focus: "Hash Tables, Hash Sets, Frequency Maps, Collisions",
      desc: "Trade O(N) space for O(1) time lookups. Solve complement matching, substring frequency, and deduplication problems.",
      href: "/problems",
      actionLabel: "Practice Hashing",
      completedWhen: "You intuitively check if a Hash Map can convert an O(N^2) search into O(N).",
    },
    {
      stage: "STAGE 06",
      title: "Hierarchical & Non-Linear Structures",
      focus: "Recursion, Linked Lists, Stacks, Queues, Binary Trees, BST",
      desc: "Learn call stacks, monotonic stacks for next greater element, BFS level-order, and DFS tree traversals.",
      href: "/dsa",
      actionLabel: "Explore DSA",
      completedWhen: "You can implement Tree Traversals (Pre, In, Post, Level-order) without hesitation.",
    },
    {
      stage: "STAGE 07",
      title: "Advanced Problem Solving",
      focus: "Binary Search on Answer, Heaps, Greedy, Graphs, Dynamic Programming",
      desc: "Master decision trees, shortest path (Dijkstra, BFS), cycle detection, and DP memoization vs tabulation.",
      href: "/dsa",
      actionLabel: "Advanced Topics",
      completedWhen: "You can recognize overlapping subproblems and optimal substructures.",
    },
    {
      stage: "STAGE 08",
      title: "Interview Readiness & Core CS",
      focus: "OS, DBMS, Computer Networks, OOP Invariants, Mock Interviews",
      desc: "Understand process vs thread, virtual memory, SQL indexing, ACID properties, TCP/IP handshake, and HR round behavioral framing.",
      href: "/interview",
      actionLabel: "Prepare for Rounds",
      completedWhen: "You pass timed 60-minute Online Assessments and explain your thoughts aloud calmly.",
    },
  ];

  return (
    <div className={styles.container}>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Roadmap" }]} />

      <div className={styles.header}>
        <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
          <Badge variant="level">SEQUENCED PROGRESSION</Badge>
          <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            Day 1 to Placement Day
          </span>
        </div>
        <h1 className={styles.title}>The Engineering Roadmap</h1>
        <p className={styles.desc}>
          A clear, deliberate roadmap designed for first-year college students.
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
    </div>
  );
}
