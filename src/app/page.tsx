import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ContinueLearningWidget } from "@/components/home/ContinueLearningWidget";
import { LearningStatsWidget } from "@/components/home/LearningStatsWidget";
import { dsaTopics } from "@/content/dsa/topics";
import { problems } from "@/content/problems";
import {
  getLanguageLessonCount,
  getProblemCount,
  getDsaTopicCount,
} from "@/lib/contentCounts";
import {
  getLanguagePath,
  getLanguageLessonPath,
  getDsaPath,
  getDsaTopicPath,
  getProblemsPath,
  getProblemPath,
  getInterviewPath,
  getRevisionPath,
  getRoadmapPath,
} from "@/lib/routes";
import { createPageMetadata, createWebSiteJsonLd } from "@/lib/seo";
import { ArrowRight, BookOpen, Code2, Compass, RotateCw } from "lucide-react";
import styles from "./page.module.css";

export const metadata = createPageMetadata({
  title: "AlgoPrimer — Programming, DSA & Coding Interview Preparation",
  description:
    "Teach programming and problem solving from first principles, then progressively move users toward technical interview readiness. Free, fast, and developer-native.",
  path: "/",
});

export default function HomePage() {
  const javaCount = getLanguageLessonCount("java");
  const cppCount = getLanguageLessonCount("cpp");
  const pythonCount = getLanguageLessonCount("python");
  const jsCount = getLanguageLessonCount("javascript");
  const totalProblems = getProblemCount();
  const totalTopics = getDsaTopicCount();
  const websiteJsonLd = createWebSiteJsonLd();

  return (
    <div className={styles.container}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* 1. Hero / Product Identity */}
      <section className={styles.hero}>
        <div className={styles.badgeTag}>Programming, DSA & Interview Prep</div>
        <h1 className={styles.headline}>
          Master programming, computer science, and problem solving from first principles.
        </h1>
        <p className={styles.subheadline}>
          AlgoPrimer is a developer-native educational platform built for everyone — from beginners writing their first line of code to engineers preparing for technical interviews. Zero marketing fluff, zero paywalls. Just clear mental models, hands-on language tracks, structured DSA progression, and 3-tier solutions.
        </p>

        <div className={styles.ctaRow}>
          <Button
            href={getLanguageLessonPath("java", "variables")}
            variant="primary"
            size="lg"
            icon={<ArrowRight size={16} />}
          >
            Start from Zero (Java)
          </Button>
          <Button
            href={getDsaPath()}
            variant="secondary"
            size="lg"
            icon={<Compass size={16} />}
          >
            Explore DSA Roadmap
          </Button>
          <Button
            href={getProblemsPath()}
            variant="secondary"
            size="lg"
            icon={<Code2 size={16} />}
          >
            Problem Bank ({totalProblems})
          </Button>
        </div>
      </section>

      {/* 2. Continue Learning Section (Client Island) */}
      <section className={styles.section}>
        <ContinueLearningWidget />
      </section>

      {/* 3. Programming Languages Tracks (Java, C++, Python, JavaScript) */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Language Mastery Tracks</h2>
        <p className={styles.sectionDesc}>
          Pick one core language and master its foundations, memory architecture, and standard library.
          Every track builds mental models from absolute zero with code examples and common pitfalls.
        </p>

        <div className={styles.grid4}>
          <Link href={getLanguagePath("java")} className={styles.trackCard}>
            <div>
              <div className={styles.trackHeader}>
                <span className={styles.trackName}>Java</span>
                <span className={styles.trackMeta}>{javaCount} Lessons</span>
              </div>
              <p className={styles.trackDesc}>
                Static typing, JVM stack vs heap memory models, OOP invariants, and Java Collections Framework.
              </p>
            </div>
            <div className={styles.trackTopicsList}>
              Foundations &bull; OOP &bull; Collections &bull; Memory Models
            </div>
          </Link>

          <Link href={getLanguagePath("cpp")} className={styles.trackCard}>
            <div>
              <div className={styles.trackHeader}>
                <span className={styles.trackName}>C++</span>
                <span className={styles.trackMeta}>{cppCount} Lessons</span>
              </div>
              <p className={styles.trackDesc}>
                Direct memory control, pointers, references, value vs reference semantics, and the Standard Template Library (STL).
              </p>
            </div>
            <div className={styles.trackTopicsList}>
              Pointers &bull; References &bull; STL Containers & Algorithms
            </div>
          </Link>

          <Link href={getLanguagePath("python")} className={styles.trackCard}>
            <div>
              <div className={styles.trackHeader}>
                <span className={styles.trackName}>Python</span>
                <span className={styles.trackMeta}>{pythonCount} Lessons</span>
              </div>
              <p className={styles.trackDesc}>
                Dynamic typing, object references, list comprehensions, idiomatic iteration, and placement standard libraries.
              </p>
            </div>
            <div className={styles.trackTopicsList}>
              Object References &bull; Comprehensions &bull; Interview Idioms
            </div>
          </Link>

          <Link href={getLanguagePath("javascript")} className={styles.trackCard}>
            <div>
              <div className={styles.trackHeader}>
                <span className={styles.trackName}>JavaScript</span>
                <span className={styles.trackMeta}>{jsCount} Lessons</span>
              </div>
              <p className={styles.trackDesc}>
                V8 runtime internals, event loop, closures, prototypal inheritance, promises, async/await, and modern ES6+.
              </p>
            </div>
            <div className={styles.trackTopicsList}>
              Event Loop &bull; Closures &bull; Promises &bull; OOP &bull; Async
            </div>
          </Link>
        </div>
      </section>

      {/* 4. DSA Roadmap Preview */}
      <section className={styles.section}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-2)" }}>
          <h2 className={styles.sectionTitle} style={{ margin: 0 }}>2. Pedagogical DSA Roadmap</h2>
          <Link href={getDsaPath()} style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)" }}>
            View all {totalTopics} topics &rarr;
          </Link>
        </div>
        <p className={styles.sectionDesc}>
          Strictly sequenced so each concept builds on the previous. You will never encounter a problem requiring techniques you haven&apos;t learned.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "var(--space-3)" }}>
          {dsaTopics.slice(0, 8).map((topic) => (
            <Link
              key={topic.id}
              href={getDsaTopicPath(topic.slug)}
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
                Topic #{topic.order} &bull; {topic.lessons.length} Lesson{topic.lessons.length > 1 ? "s" : ""}
              </div>
              <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, color: "var(--text-primary)", marginTop: "2px" }}>
                {topic.title}
              </div>
              <div style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)", marginTop: "4px" }}>
                {topic.description.slice(0, 75)}...
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Problem-Solving Progression */}
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

      {/* 6. Problem Bank Preview */}
      <section className={styles.section}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-2)" }}>
          <h2 className={styles.sectionTitle} style={{ margin: 0 }}>4. Problem Bank: 3-Tier Solutions</h2>
          <Link href={getProblemsPath()} style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)" }}>
            View all {totalProblems} problems &rarr;
          </Link>
        </div>
        <p className={styles.sectionDesc}>
          Each problem features Brute Force, Better, and Optimal solutions in Java, C++, Python, and JavaScript with line-by-line dry runs.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {problems.slice(0, 5).map((prob) => (
            <Link
              key={prob.id}
              href={getProblemPath(prob.slug)}
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
                  Pattern: {prob.pattern} &bull; {prob.topic}
                </span>
              </div>
              <span style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>
                Solve &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Placement & Revision Overview */}
      <section className={styles.section}>
        <div className={styles.grid3}>
          <div className={styles.trackCard}>
            <div>
              <div className={styles.trackHeader}>
                <span className={styles.trackName}>Interview Guide</span>
                <BookOpen size={16} />
              </div>
              <p className={styles.trackDesc}>
                Understand how technical hiring works: Online Assessment (OA) scoring, technical interview rounds, core CS subjects (OS, DBMS, CN), and behavioral expectations.
              </p>
            </div>
            <Link href={getInterviewPath()} style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)" }}>
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
            <Link href={getRevisionPath()} style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)" }}>
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
            <Link href={getRoadmapPath()} style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)" }}>
              Inspect Progression Roadmap &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Simple Progress Overview (Client Island) */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Learning Overview</h2>
        <p className={styles.sectionDesc}>
          Non-gamified progress tracking synced directly to your browser storage. No account required to start.
        </p>

        <LearningStatsWidget totalDsaTopics={totalTopics} />
      </section>
    </div>
  );
}
