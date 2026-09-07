"use client";

import React from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import styles from "./learn.module.css";

export default function LearnPage() {

  const tracks = [
    {
      id: "java",
      title: "Java Programming Track",
      desc: "Statically-typed fundamentals, OOP, JVM memory model, and Collections.",
      href: "/languages/java",
      lessonCount: 4,
      tag: "Recommended for Campus",
    },
    {
      id: "cpp",
      title: "C++ Programming Track",
      desc: "Hardware-level memory, pointers, references, and the Standard Template Library (STL).",
      href: "/languages/cpp",
      lessonCount: 3,
      tag: "Ideal for OAs & Speed",
    },
    {
      id: "python",
      title: "Python Programming Track",
      desc: "Dynamic typing, object references, list comprehensions, and interview patterns.",
      href: "/languages/python",
      lessonCount: 3,
      tag: "Fast Prototyping",
    },
    {
      id: "dsa",
      title: "Data Structures & Algorithms (DSA)",
      desc: "20-topic pedagogical roadmap from Complexity and Arrays to Graphs and Dynamic Programming.",
      href: "/dsa",
      lessonCount: 3,
      tag: "Core Placement Subject",
    },
  ];

  return (
    <div className={styles.container}>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Learn" }]} />

      <div className={styles.header}>
        <h1 className={styles.title}>The Learning Model</h1>
        <p className={styles.desc}>
          CampusPrep is organized strictly around a 7-stage learning hierarchy:
          <br />
          <strong>TRACK &rarr; MODULE &rarr; TOPIC &rarr; LESSON &rarr; EXAMPLES &rarr; PRACTICE &rarr; REVISION</strong>
        </p>
      </div>

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
          How to Study on CampusPrep
        </h2>
        <div className={styles.stepsGrid}>
          <div className={styles.stepBox}>
            <div className={styles.stepNum}>01</div>
            <h3>Master One Language</h3>
            <p>Don&apos;t jump between languages. Pick Java or C++ and understand its memory layout, scoping, and standard library inside-out.</p>
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
