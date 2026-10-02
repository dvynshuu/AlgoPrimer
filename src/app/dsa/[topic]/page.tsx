import React from "react";
import Link from "next/link";
import { notFound, redirect, RedirectType } from "next/navigation";
import { TopicSidebar, SidebarSection } from "@/components/layout/TopicSidebar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { dsaTopics } from "@/content/dsa/topics";
import {
  getDsaTopicBySlug,
  getDsaLessonsForTopic,
  getProblemsForDsaTopic,
  getDsaLessonPath,
  getDsaTopicBreadcrumbs,
  resolveLegacyDsaPath,
  getProblemPath,
  getProblemsPath,
  getDsaTopicPath,
} from "@/lib/routes";
import { createDsaTopicMetadata, createBreadcrumbJsonLd } from "@/lib/seo";
import { ArrowRight, Clock } from "lucide-react";
import styles from "./topicPage.module.css";

interface PageProps {
  params: Promise<{ topic: string }>;
}

export async function generateStaticParams() {
  return dsaTopics.map((t) => ({
    topic: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { topic: topicSlug } = await params;
  const topic = getDsaTopicBySlug(topicSlug);
  if (!topic) return {};
  return createDsaTopicMetadata(topic);
}

export default async function DSATopicPage({ params }: PageProps) {
  const { topic: rawTopicSlug } = await params;
  const topicSlug = rawTopicSlug.toLowerCase();

  // Legacy route check: If this was an old direct lesson route (e.g. /dsa/two-pointers), redirect permanently
  const legacyTarget = resolveLegacyDsaPath(topicSlug);
  if (legacyTarget) {
    redirect(legacyTarget, RedirectType.replace);
  }

  const topicMeta = getDsaTopicBySlug(topicSlug);
  if (!topicMeta) {
    notFound();
  }

  const lessons = getDsaLessonsForTopic(topicMeta.slug);
  const relatedProblems = getProblemsForDsaTopic(topicMeta.slug);
  const breadcrumbs = getDsaTopicBreadcrumbs(topicMeta);
  const breadcrumbJsonLd = createBreadcrumbJsonLd(breadcrumbs);

  const sidebarSections: SidebarSection[] = [
    {
      title: "DSA Roadmap (20 Topics)",
      items: dsaTopics.map((t) => ({
        id: t.id,
        title: `${t.order}. ${t.title}`,
        href: getDsaTopicPath(t.slug),
      })),
    },
  ];

  return (
    <div style={{ minHeight: "calc(100vh - var(--header-height))", width: "100%", position: "relative" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TopicSidebar sections={sidebarSections} />
      <main className={styles.mainArea}>
        <Breadcrumbs items={breadcrumbs} />

        <header className={styles.header}>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
            <Badge variant="level">TOPIC #{topicMeta.order}</Badge>
            <span style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
              Estimated: ~{topicMeta.estimatedHours} hours &bull; {lessons.length} Lesson{lessons.length > 1 ? "s" : ""}
            </span>
          </div>
          <h1 className={styles.title}>{topicMeta.title}</h1>
          <p className={styles.desc}>{topicMeta.description}</p>
        </header>

        {/* Prerequisites */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Prerequisites</h2>
          <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", margin: "var(--space-2) 0" }}>
            {topicMeta.prerequisites.map((p) => {
              const matchedTopic = dsaTopics.find(
                (t) => t.title.toLowerCase().includes(p.toLowerCase()) || p.toLowerCase().includes(t.title.toLowerCase())
              );
              if (matchedTopic) {
                return (
                  <Link
                    key={p}
                    href={getDsaTopicPath(matchedTopic.slug)}
                    className={styles.prereqBadge}
                    style={{ textDecoration: "none" }}
                  >
                    {p} &rarr;
                  </Link>
                );
              }
              return (
                <span key={p} className={styles.prereqBadge}>
                  {p}
                </span>
              );
            })}
          </div>
        </section>

        {/* Lessons in this Topic */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Topic Curriculum & Lessons</h2>
          <p className={styles.desc} style={{ marginBottom: "var(--space-4)" }}>
            Each lesson builds mental models, provides multi-language code implementations, highlights common pitfalls, and connects directly to technical interview patterns.
          </p>

          <div className={styles.lessonGrid}>
            {lessons.map((lesson, idx) => (
              <Link
                key={lesson.id}
                href={getDsaLessonPath(topicMeta.slug, lesson.slug)}
                className={styles.lessonCard}
              >
                <div>
                  <div className={styles.lessonMeta}>
                    <Badge variant="pattern">Lesson {idx + 1}</Badge>
                    <span className={styles.lessonTime}>
                      <Clock size={12} /> {lesson.estimatedMinutes} mins
                    </span>
                  </div>
                  <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                  <p className={styles.lessonDesc}>{lesson.oneSentence}</p>
                </div>
                <Button
                  href={getDsaLessonPath(topicMeta.slug, lesson.slug)}
                  variant="primary"
                  size="sm"
                  icon={<ArrowRight size={13} />}
                >
                  Start Lesson
                </Button>
              </Link>
            ))}
          </div>
        </section>

        {/* 5-Level Progression Structure */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5-Level Problem Progression</h2>
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

        {/* Topic Practice Problems */}
        <section className={styles.section}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "var(--space-2)" }}>
            <h2 className={styles.sectionTitle} style={{ border: "none", margin: 0, padding: 0 }}>
              Curated Interview Problems ({relatedProblems.length})
            </h2>
            <Link href={getProblemsPath()} style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)" }}>
              View all problems &rarr;
            </Link>
          </div>

          {relatedProblems.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", margin: "var(--space-3) 0" }}>
              {relatedProblems.map((prob) => (
                <div key={prob.id} className={styles.probCard}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "4px" }}>
                      <Badge variant={prob.difficulty === "Easy" ? "easy" : "medium"}>{prob.difficulty}</Badge>
                      <span style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                        Pattern: {prob.pattern} &bull; {prob.subtopic}
                      </span>
                    </div>
                    <div style={{ fontSize: "var(--font-size-md)", fontWeight: 600, color: "var(--text-primary)" }}>
                      {prob.title}
                    </div>
                  </div>
                  <Button href={getProblemPath(prob.slug)} variant="primary" size="sm" icon={<ArrowRight size={13} />}>
                    Solve Problem
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyNote}>
              <p>Practice problems for {topicMeta.title} are being curated following our 5-level progression system.</p>
              <Button href={getProblemsPath()} variant="secondary" size="sm">
                Browse Full Problem Bank
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
