import React from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { dsaTopics } from "@/content/dsa/topics";
import { ArrowRight, Clock } from "lucide-react";
import styles from "./dsa.module.css";

export const metadata = {
  title: "Data Structures & Algorithms Roadmap — CampusPrep",
  description: "20 pedagogical DSA topics ordered from fundamentals to advanced interview patterns.",
};

export default function DSARoadmapPage() {
  return (
    <div className={styles.container}>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "DSA Roadmap" }]} />

      <div className={styles.header}>
        <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
          <Badge variant="level">MASTER CURRICULUM</Badge>
          <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            20 Pedagogical Topic Areas
          </span>
        </div>
        <h1 className={styles.title}>Data Structures & Algorithms</h1>
        <p className={styles.desc}>
          The DSA section is not merely a list of 500 questions. It is a structured system teaching
          problem-solving patterns from zero, showing how naive solutions evolve into optimal solutions.
        </p>
      </div>

      <div className={styles.topicsGrid}>
        {dsaTopics.map((topic) => (
          <div key={topic.id} className={styles.topicCard}>
            <div>
              <div className={styles.cardTopRow}>
                <span className={styles.orderBadge}>Topic #{topic.order}</span>
                <span className={styles.hoursMeta}>
                  <Clock size={12} /> ~{topic.estimatedHours} hrs
                </span>
              </div>
              <h2 className={styles.topicTitle}>{topic.title}</h2>
              <p className={styles.topicDesc}>{topic.description}</p>
            </div>

            <div className={styles.cardBottom}>
              <div className={styles.prereqRow}>
                <span>Prerequisites:</span>
                <span style={{ color: "var(--text-secondary)" }}>{topic.prerequisites.join(", ")}</span>
              </div>
              <Button href={`/dsa/${topic.slug}`} variant="secondary" size="sm" icon={<ArrowRight size={13} />}>
                Explore Topic
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
