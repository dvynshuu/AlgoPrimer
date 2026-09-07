"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useProgress } from "@/lib/progress/ProgressContext";
import { ArrowRight, BookOpen, Code2, Compass, RotateCw } from "lucide-react";
import styles from "./page.module.css";
import { dsaTopics } from "@/content/dsa/topics";
import { problems } from "@/content/problems";

export default function HomePage() {
  const { completedLessons, solvedProblems, lastVisited } = useProgress();

  return (
    <div className={styles.container}>
      {/* 1. Clear Product Introduction & 2. CTA */}
      <section className={styles.hero}>
        <div className={styles.badgeTag}>Open Learning Coding Platform For Everyone</div>
        <h1 className={styles.headline}>
          Master programming, computer science, and problem solving from first principles.
        </h1>
        <p className={styles.subheadline}>
          Forge is an open learning platform built for everyone — from complete beginners writing their first line of code to engineers preparing for technical interviews. Zero marketing fluff, zero paywalls. Just clear first-principles explanations, hands-on language tracks, deep mental models, and curated algorithmic practice.
        </p>

        <div className={styles.ctaRow}>
          <Button href="/languages/java/variables" variant="primary" size="lg" icon={<ArrowRight size={16} />}>
            Start from Zero (Java)
          </Button>
          <Button href="/dsa" variant="secondary" size="lg" icon={<Compass size={16} />}>
            Explore DSA Roadmap
          </Button>
          <Button href="/problems" variant="secondary" size="lg" icon={<Code2 size={16} />}>
            Problem Bank
          </Button>
        </div>
      </section>

      {/* 3. Continue Learning Section (Local Storage sync) */}
      <section className={styles.section}>
        <div className={styles.continueBox}>
          <div>
            <div style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--accent-primary)", marginBottom: "4px" }}>
              CONTINUE LEARNING
            </div>
            <div style={{ fontSize: "var(--font-size-md)", fontWeight: 600, color: "var(--text-primary)" }} suppressHydrationWarning>
              {lastVisited ? lastVisited.title : "Arrays — Contiguity, Operations & Two Pointers"}
            </div>
            <div style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)", marginTop: "4px" }} suppressHydrationWarning>
              {lastVisited ? "Jump straight back into your last session." : "Next recommended lesson in your curriculum."}
            </div>
          </div>
          <Button
            href={lastVisited ? lastVisited.url : "/dsa/arrays"}
            variant="primary"
            size="md"
            icon={<ArrowRight size={14} />}
          >
            Resume Lesson
          </Button>
        </div>
      </section>

      {/* 4. Programming Languages Tracks */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Language Mastery Tracks</h2>
        <p className={styles.sectionDesc}>
          Pick one core language and master its foundations, memory architecture, and standard library.
          Every track builds mental models from absolute zero.
        </p>

        <div className={styles.grid3}>
          <Link href="/languages/java" className={styles.trackCard}>
            <div>
              <div className={styles.trackHeader}>
                <span className={styles.trackName}>Java</span>
                <span className={styles.trackMeta}>Tier 1 Choice</span>
              </div>
              <p className={styles.trackDesc}>
                Strong static typing, JVM stack vs heap memory models, OOP invariants, and Java Collections Framework.
              </p>
            </div>
            <div className={styles.trackTopicsList}>
              Foundations &bull; OOP &bull; Collections &bull; Interview Concepts
            </div>
          </Link>

          <Link href="/languages/cpp" className={styles.trackCard}>
            <div>
              <div className={styles.trackHeader}>
                <span className={styles.trackName}>C++</span>
                <span className={styles.trackMeta}>Competitive / OA</span>
              </div>
              <p className={styles.trackDesc}>
                Direct hardware control, pointers, references, pass-by-reference semantics, and deep Standard Template Library (STL).
              </p>
            </div>
            <div className={styles.trackTopicsList}>
              Pointers &bull; References &bull; STL Containers & Algorithms
            </div>
          </Link>

          <Link href="/languages/python" className={styles.trackCard}>
            <div>
              <div className={styles.trackHeader}>
                <span className={styles.trackName}>Python</span>
                <span className={styles.trackMeta}>Rapid Prototyping</span>
              </div>
              <p className={styles.trackDesc}>
                Dynamic typing, object references, list comprehensions, idiomatic iteration, and placement-focused standard libraries.
              </p>
            </div>
            <div className={styles.trackTopicsList}>
              Object References &bull; Comprehensions &bull; Interview Idioms
            </div>
          </Link>
        </div>
      </section>

      {/* 5. DSA Roadmap Preview */}
      <section className={styles.section}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-2)" }}>
          <h2 className={styles.sectionTitle} style={{ margin: 0 }}>2. Pedagogical DSA Roadmap</h2>
          <Link href="/dsa" style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)" }}>
            View all 20 topics &rarr;
          </Link>
        </div>
        <p className={styles.sectionDesc}>
          Strictly sequenced so each concept builds on the previous. You will never encounter a problem requiring techniques you haven&apos;t learned.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "var(--space-3)" }}>
          {dsaTopics.slice(0, 8).map((topic) => (
            <Link
              key={topic.id}
              href={`/dsa/${topic.slug}`}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                padding: "var(--space-3) var(--space-4)",
                textDecoration: "none",
                display: "block",
              }}
            >
              <div style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                Topic #{topic.order}
              </div>
              <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, color: "var(--text-primary)", marginTop: "2px" }}>
                {topic.title}
              </div>
              <div style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)", marginTop: "4px" }}>
                {topic.description.slice(0, 70)}...
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Problem-Solving Progression */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. 5-Level Problem Progression</h2>
        <p className={styles.sectionDesc}>
          Every topic progresses systematically through 5 levels. A student never jumps blindly into hard interview questions.
        </p>

        <div className={styles.progressionRow}>
          <div className={styles.levelCard}>
            <div className={styles.levelNumber}>LEVEL 1</div>
            <div className={styles.levelTitle}>Concept Understanding</div>
            <div className={styles.levelDesc}>Build visual intuition and understand why the data structure exists.</div>
          </div>
          <div className={styles.levelCard}>
            <div className={styles.levelNumber}>LEVEL 2</div>
            <div className={styles.levelTitle}>Basic Implementation</div>
            <div className={styles.levelDesc}>Write clean, error-free code for core operations and traversals.</div>
          </div>
          <div className={styles.levelCard}>
            <div className={styles.levelNumber}>LEVEL 3</div>
            <div className={styles.levelTitle}>Pattern Recognition</div>
            <div className={styles.levelDesc}>Identify reusable techniques (Two Pointers, Prefix Sum, Kadane).</div>
          </div>
          <div className={styles.levelCard}>
            <div className={styles.levelNumber}>LEVEL 4</div>
            <div className={styles.levelTitle}>Optimization</div>
            <div className={styles.levelDesc}>Transform brute force O(n^2) or O(n^3) into optimal O(n) or O(log n).</div>
          </div>
          <div className={styles.levelCard}>
            <div className={styles.levelNumber}>LEVEL 5</div>
            <div className={styles.levelTitle}>Interview Variations</div>
            <div className={styles.levelDesc}>Tackle tricky edge cases, constraints, and company OA variations.</div>
          </div>
        </div>
      </section>

      {/* 7. Representative Problem Bank */}
      <section className={styles.section}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-2)" }}>
          <h2 className={styles.sectionTitle} style={{ margin: 0 }}>4. Problem Bank: 3-Tier Solutions</h2>
          <Link href="/problems" style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)" }}>
            View all {problems.length} problems &rarr;
          </Link>
        </div>
        <p className={styles.sectionDesc}>
          Each problem features Brute Force, Better, and Optimal solutions in Java, C++, Python, and JavaScript with line-by-line dry runs.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {problems.slice(0, 5).map((prob) => (
            <Link
              key={prob.id}
              href={`/problems/${prob.slug}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "var(--space-3) var(--space-4)",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                textDecoration: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                <span style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, color: "var(--text-primary)" }}>
                  {prob.title}
                </span>
                <Badge variant={prob.difficulty === "Easy" ? "easy" : "medium"}>{prob.difficulty}</Badge>
                <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  Pattern: {prob.pattern}
                </span>
              </div>
              <span style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>
                Solve &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. Placement & Revision Overview */}
      <section className={styles.section}>
        <div className={styles.grid3}>
          <div className={styles.trackCard}>
            <div>
              <div className={styles.trackHeader}>
                <span className={styles.trackName}>Interview Guide</span>
                <BookOpen size={16} />
              </div>
              <p className={styles.trackDesc}>
                Understand how campus placement works: Online Assessment (OA) scoring, technical interview rounds, core CS subjects (OS, DBMS, CN), and HR expectations.
              </p>
            </div>
            <Link href="/interview" style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)" }}>
              Read Interview Breakdown &rarr;
            </Link>
          </div>

          <div className={styles.trackCard}>
            <div>
              <div className={styles.trackHeader}>
                <span className={styles.trackName}>High-Yield Revision</span>
                <RotateCw size={16} />
              </div>
              <p className={styles.trackDesc}>
                Concise cheat sheets for quick revision before coding rounds. Review key properties, time bounds, common pitfalls, and code snippets in 5 minutes.
              </p>
            </div>
            <Link href="/revision" style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)" }}>
              Open Revision Cards &rarr;
            </Link>
          </div>

          <div className={styles.trackCard}>
            <div>
              <div className={styles.trackHeader}>
                <span className={styles.trackName}>Day 1 to Placement</span>
                <Compass size={16} />
              </div>
              <p className={styles.trackDesc}>
                A clear, visual sequence showing where you currently stand, what prerequisites remain, and what you need to master next.
              </p>
            </div>
            <Link href="/roadmap" style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)" }}>
              Inspect Progression Roadmap &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Simple Progress Overview */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Learning Overview</h2>
        <p className={styles.sectionDesc}>
          Non-gamified progress tracking synced directly to your browser storage. No account required to start.
        </p>

        <div className={styles.statsOverview}>
          <div className={styles.statCard}>
            <div className={styles.statVal}>{completedLessons.length}</div>
            <div className={styles.statLabel}>Lessons Completed</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statVal}>{solvedProblems.length}</div>
            <div className={styles.statLabel}>Problems Solved</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statVal}>{dsaTopics.length}</div>
            <div className={styles.statLabel}>DSA Topics Mapped</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statVal}>Level 1 &rarr; 5</div>
            <div className={styles.statLabel}>Pedagogical Depth</div>
          </div>
        </div>
      </section>
    </div>
  );
}
