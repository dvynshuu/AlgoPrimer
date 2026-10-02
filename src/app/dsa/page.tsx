import React from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { dsaTopics } from "@/content/dsa/topics";
import { getHomePath, getDsaPath, getDsaTopicPath } from "@/lib/routes";
import { createPageMetadata, createBreadcrumbJsonLd } from "@/lib/seo";
import { ArrowRight, Clock } from "lucide-react";
import styles from "./dsa.module.css";

export const metadata = createPageMetadata({
  title: "Data Structures & Algorithms Roadmap — 20 Pedagogical Topics",
  description:
    "A sequenced 20-topic DSA roadmap teaching algorithmic intuition and pattern recognition from first principles to technical interview mastery.",
  path: getDsaPath(),
  keywords: [
    "DSA roadmap",
    "data structures and algorithms",
    "coding interview prep",
    "algorithm patterns",
    "technical interview preparation",
  ],
});

export default function DSARoadmapPage() {
  const breadcrumbs = [{ label: "Home", href: getHomePath() }, { label: "DSA Roadmap" }];
  const breadcrumbJsonLd = createBreadcrumbJsonLd(breadcrumbs);

  return (
    <div className={styles.container}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Breadcrumbs items={breadcrumbs} />

      <header className={styles.header}>
        <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
          <Badge variant="level">MASTER CURRICULUM</Badge>
          <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            20 Pedagogical Topic Areas &bull; Complete From Zero
          </span>
        </div>
        <h1 className={styles.title}>Data Structures & Algorithms</h1>
        <p className={styles.desc}>
          The AlgoPrimer DSA curriculum is sequenced so every data structure and technique builds on the previous.
          Understand why a structure exists in physical RAM, how it is implemented, and how its patterns solve complex interview problems.
        </p>
      </header>

      <div className={styles.topicsGrid}>
        {dsaTopics.map((topic) => (
          <div key={topic.id} className={styles.topicCard}>
            <div>
              <div className={styles.cardTopRow}>
                <span className={styles.orderBadge}>Topic #{topic.order}</span>
                <span className={styles.hoursMeta}>
                  <Clock size={12} /> ~{topic.estimatedHours} hrs &bull; {topic.lessons.length} Lesson{topic.lessons.length > 1 ? "s" : ""}
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
              <Button
                href={getDsaTopicPath(topic.slug)}
                variant="secondary"
                size="sm"
                icon={<ArrowRight size={13} />}
              >
                Explore Topic
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
