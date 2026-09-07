import React from "react";
import { notFound } from "next/navigation";
import { LessonViewer } from "@/components/content/LessonViewer";
import { TopicSidebar, SidebarSection } from "@/components/layout/TopicSidebar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { dsaLessons } from "@/content/dsa/lessons";
import { dsaTopics } from "@/content/dsa/topics";
import { problems } from "@/content/problems";
import { ArrowRight } from "lucide-react";
import styles from "./topicPage.module.css";

interface PageProps {
  params: Promise<{ topic: string }>;
}

export default async function DSATopicPage({ params }: PageProps) {
  const { topic: topicSlug } = await params;

  // Check if topic is a direct lesson
  const directLesson = dsaLessons.find((l) => l.slug === topicSlug);

  const sidebarSections: SidebarSection[] = [
    {
      title: "DSA Roadmap (20 Topics)",
      items: dsaTopics.map((t) => ({
        id: t.id,
        title: `${t.order}. ${t.title}`,
        href: `/dsa/${t.slug}`,
      })),
    },
  ];

  if (directLesson) {
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "DSA", href: "/dsa" },
      { label: directLesson.title },
    ];

    return (
      <div style={{ minHeight: "calc(100vh - var(--header-height))", width: "100%", position: "relative" }}>
        <TopicSidebar sections={sidebarSections} />
        <LessonViewer lesson={directLesson} breadcrumbItems={breadcrumbs} />
      </div>
    );
  }

  // Otherwise find in dsaTopics
  const topicMeta = dsaTopics.find((t) => t.slug === topicSlug);
  if (!topicMeta) notFound();

  // Find related problems
  const relatedProblems = problems.filter(
    (p) => p.topic.toLowerCase().includes(topicSlug) || topicSlug.includes(p.topic.toLowerCase())
  );

  return (
    <div style={{ minHeight: "calc(100vh - var(--header-height))", width: "100%", position: "relative" }}>
      <TopicSidebar sections={sidebarSections} />
      <main className={styles.mainArea}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "DSA", href: "/dsa" },
            { label: topicMeta.title },
          ]}
        />

        <div className={styles.header}>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
            <Badge variant="level">TOPIC #{topicMeta.order}</Badge>
            <span style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
              Estimated: ~{topicMeta.estimatedHours} hours
            </span>
          </div>
          <h1 className={styles.title}>{topicMeta.title}</h1>
          <p className={styles.desc}>{topicMeta.description}</p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Prerequisites</h2>
          <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", margin: "var(--space-2) 0" }}>
            {topicMeta.prerequisites.map((p) => (
              <span key={p} className={styles.prereqBadge}>{p}</span>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5-Level Progression Structure</h2>
          <div className={styles.levelGrid}>
            <div className={styles.levelBox}>
              <span className={styles.levelNum}>Level 1</span>
              <h4>Concept Understanding</h4>
              <p>Why this data structure exists, spatial layout in memory, and fundamental operations.</p>
            </div>
            <div className={styles.levelBox}>
              <span className={styles.levelNum}>Level 2</span>
              <h4>Basic Implementation</h4>
              <p>Direct traversals, insertion/deletion mechanisms, and clean boundary check handling.</p>
            </div>
            <div className={styles.levelBox}>
              <span className={styles.levelNum}>Level 3</span>
              <h4>Pattern Recognition</h4>
              <p>Identifying when this topic applies to an unfamiliar problem statement.</p>
            </div>
            <div className={styles.levelBox}>
              <span className={styles.levelNum}>Level 4</span>
              <h4>Optimization</h4>
              <p>Eliminating redundant traversals and reducing space/time bounds to optimal asymptotic limits.</p>
            </div>
            <div className={styles.levelBox}>
              <span className={styles.levelNum}>Level 5</span>
              <h4>Interview Variations</h4>
              <p>Solving tricky variations commonly asked in top-tier company Online Assessments.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Topic Problems & Practice</h2>
          {relatedProblems.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", margin: "var(--space-3) 0" }}>
              {relatedProblems.map((prob) => (
                <div key={prob.id} className={styles.probCard}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "4px" }}>
                      <Badge variant={prob.difficulty === "Easy" ? "easy" : "medium"}>{prob.difficulty}</Badge>
                      <span style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                        Pattern: {prob.pattern}
                      </span>
                    </div>
                    <div style={{ fontSize: "var(--font-size-md)", fontWeight: 600, color: "var(--text-primary)" }}>
                      {prob.title}
                    </div>
                  </div>
                  <Button href={`/problems/${prob.slug}`} variant="primary" size="sm" icon={<ArrowRight size={13} />}>
                    Solve Problem
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyNote}>
              <p>Practice problems for {topicMeta.title} are being curated following our 5-level progression system.</p>
              <Button href="/problems" variant="secondary" size="sm">
                Browse Full Problem Bank
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
