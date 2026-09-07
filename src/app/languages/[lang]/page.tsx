import React from "react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { javaLessons } from "@/content/languages/java";
import { cppLessons } from "@/content/languages/cpp";
import { pythonLessons } from "@/content/languages/python";
import { javascriptLessons } from "@/content/languages/javascript";
import { Lesson } from "@/types/content";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import styles from "./langHub.module.css";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return [{ lang: "java" }, { lang: "cpp" }, { lang: "python" }, { lang: "javascript" }];
}

export default async function LanguageHubPage({ params }: PageProps) {
  const { lang } = await params;

  let title = "";
  let description = "";
  let lessons: Lesson[] = javaLessons;

  if (lang === "java") {
    title = "Java Programming Curriculum";
    description = "From JVM architecture and primitive types to Collections, Concurrency, and placement-focused concepts.";
    lessons = javaLessons;
  } else if (lang === "cpp") {
    title = "C++ Programming Curriculum";
    description = "From direct memory, pointers, and RAII to the Standard Template Library (STL) and modern move semantics.";
    lessons = cppLessons;
  } else if (lang === "python") {
    title = "Python Programming Curriculum";
    description = "From object references, dynamic typing, and collections to heapq, bisect, and interview Big-O complexities.";
    lessons = pythonLessons;
  } else if (lang === "javascript") {
    title = "JavaScript Programming Curriculum";
    description = "From V8 engine internals, closures, and prototypal OOP to the Event Loop, Promises, and rate-limiting patterns.";
    lessons = javascriptLessons;
  } else {
    notFound();
  }

  // Group lessons by module topicTitle
  const moduleMap = new Map<string, Lesson[]>();
  for (const l of lessons) {
    const list = moduleMap.get(l.topicTitle) || [];
    list.push(l);
    moduleMap.set(l.topicTitle, list);
  }

  return (
    <div className={styles.container}>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Languages", href: "/languages" },
          { label: lang.toUpperCase() },
        ]}
      />

      <div className={styles.header}>
        <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
          <Badge variant="level">{lang.toUpperCase()} TRACK</Badge>
          <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            {lessons.length} In-Depth Lessons Across {moduleMap.size} Modules
          </span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.desc}>{description}</p>
      </div>

      <div className={styles.modulesContainer}>
        {Array.from(moduleMap.entries()).map(([moduleTitle, moduleLessons], modIdx) => (
          <div key={moduleTitle} className={styles.moduleSection}>
            <div className={styles.moduleHeader}>
              <div className={styles.moduleBadge}>
                <BookOpen size={14} />
                <span>Module {modIdx + 1}</span>
              </div>
              <h2 className={styles.moduleTitle}>{moduleTitle}</h2>
              <span className={styles.moduleCount}>{moduleLessons.length} lessons</span>
            </div>

            <div className={styles.lessonList}>
              {moduleLessons.map((lesson) => (
                <div key={lesson.id} className={styles.lessonCard}>
                  <div style={{ flex: 1, minWidth: "260px" }}>
                    <div className={styles.lessonMeta}>
                      <span>Lesson #{lesson.order}</span>
                      <span>&bull;</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={12} /> {lesson.estimatedMinutes} mins
                      </span>
                    </div>
                    <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                    <p className={styles.lessonSummary}>{lesson.oneSentence}</p>
                  </div>
                  <div className={styles.cardActions}>
                    <Button
                      href={`/languages/${lang}/${lesson.slug}`}
                      variant="primary"
                      size="sm"
                      icon={<ArrowRight size={14} />}
                    >
                      Read Lesson
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
