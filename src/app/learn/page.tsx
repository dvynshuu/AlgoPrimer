import React from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  getHomePath,
  getLanguagePath,
  getDsaPath,
} from "@/lib/routes";
import {
  getLanguageLessonCount,
  getDsaLessonCount,
} from "@/lib/contentCounts";
import { createPageMetadata, createBreadcrumbJsonLd } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import styles from "./learn.module.css";

export const metadata = createPageMetadata({
  title: "The Learning Model — From First Principles to Placement Readiness",
  description:
    "AlgoPrimer is organized around a 7-stage learning hierarchy designed to build deep mental models, language mastery, and technical interview readiness.",
  path: "/learn",
});

export default function LearnPage() {
  const javaCount = getLanguageLessonCount("java");
  const cppCount = getLanguageLessonCount("cpp");
  const pythonCount = getLanguageLessonCount("python");
  const jsCount = getLanguageLessonCount("javascript");
  const dsaCount = getDsaLessonCount();

  const tracks = [
    {
      id: "java",
      title: "Java Programming Track",
      desc: "Statically-typed fundamentals, OOP invariants, JVM memory models (Stack vs Heap), and Collections Framework.",
      href: getLanguagePath("java"),
      lessonCount: javaCount,
      tag: "Enterprise & Campus Standard",
    },
    {
      id: "cpp",
      title: "C++ Programming Track",
      desc: "Hardware-level memory, pointers, references, value vs reference semantics, and deep Standard Template Library (STL).",
      href: getLanguagePath("cpp"),
      lessonCount: cppCount,
      tag: "OA Speed & Systems",
    },
    {
      id: "python",
      title: "Python Programming Track",
      desc: "Dynamic typing, object references, list comprehensions, idiomatic iteration, and placement standard libraries.",
      href: getLanguagePath("python"),
      lessonCount: pythonCount,
      tag: "Rapid Prototyping",
    },
    {
      id: "javascript",
      title: "JavaScript Track",
      desc: "V8 internals, event loop, asynchronous promises, closures, prototypal inheritance, and placement coding idioms.",
      href: getLanguagePath("javascript"),
      lessonCount: jsCount,
      tag: "Web & Full-Stack Core",
    },
    {
      id: "dsa",
      title: "Data Structures & Algorithms (DSA)",
      desc: "20-topic pedagogical roadmap from Complexity and Arrays to Graphs and Dynamic Programming.",
      href: getDsaPath(),
      lessonCount: dsaCount,
      tag: "Core Interview Subject",
    },
  ];

  const breadcrumbs = [{ label: "Home", href: getHomePath() }, { label: "Learn" }];
  const breadcrumbJsonLd = createBreadcrumbJsonLd(breadcrumbs);

  return (
    <div className={styles.container}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Breadcrumbs items={breadcrumbs} />

      <header className={styles.header}>
        <h1 className={styles.title}>The Learning Model</h1>
        <p className={styles.desc}>
          AlgoPrimer is organized strictly around a 7-stage learning hierarchy:
          <br />
          <strong>TRACK &rarr; MODULE &rarr; TOPIC &rarr; LESSON &rarr; EXAMPLES &rarr; PRACTICE &rarr; REVISION</strong>
        </p>
      </header>

      <div className={styles.tracksGrid}>
        {tracks.map((t) => (
          <div key={t.id} className={styles.trackCard}>
            <div className={styles.cardHeader}>
              <Badge variant="level">{t.tag}</Badge>
              <span className={styles.metaCount}>{t.lessonCount} Lessons</span>
            </div>
            <h2 className={styles.cardTitle}>{t.title}</h2>
            <p className={styles.cardDesc}>{t.desc}</p>
            <div className={styles.cardFooter}>
              <Button href={t.href} variant="primary" size="sm" icon={<ArrowRight size={14} />}>
                Enter Track
              </Button>
            </div>
          </div>
        ))}
      </div>

      <section className={styles.howToLearnSection}>
        <h2 style={{ fontSize: "var(--font-size-xl)", marginBottom: "var(--space-4)" }}>
          How to Study on AlgoPrimer
        </h2>
        <div className={styles.stepsGrid}>
          <div className={styles.stepBox}>
            <div className={styles.stepNum}>01</div>
            <h3>Master One Language</h3>
            <p>Don&apos;t jump between languages. Pick Java, C++, Python, or JavaScript and understand its memory layout, scoping, and standard library inside-out.</p>
          </div>
          <div className={styles.stepBox}>
            <div className={styles.stepNum}>02</div>
            <h3>Follow the DSA Roadmap</h3>
            <p>Do not jump directly into Dynamic Programming or Trees before mastering Two Pointers and Prefix Sums on Arrays.</p>
          </div>
          <div className={styles.stepBox}>
            <div className={styles.stepNum}>03</div>
            <h3>Learn Patterns, Not Solutions</h3>
            <p>Every problem belongs to a reusable pattern. When you solve a problem, identify the underlying pattern rather than memorizing the code.</p>
          </div>
          <div className={styles.stepBox}>
            <div className={styles.stepNum}>04</div>
            <h3>Revise with Cheat Sheets</h3>
            <p>Before any coding contest or interview, spend 10 minutes reviewing the revision cards for common pitfalls and time limits.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
