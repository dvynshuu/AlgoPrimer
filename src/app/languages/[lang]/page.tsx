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
import {
  getLanguageLessonPath,
  getLanguageBreadcrumbs,
  getLanguagePath,
} from "@/lib/routes";
import {
  createLanguageMetadata,
  createBreadcrumbJsonLd,
  createCourseJsonLd,
  createItemListJsonLd,
  createFaqJsonLd,
} from "@/lib/seo";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import styles from "./langHub.module.css";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return [{ lang: "java" }, { lang: "cpp" }, { lang: "python" }, { lang: "javascript" }];
}

function getLangData(lang: string) {
  if (lang === "java") {
    return {
      name: "Java",
      title: "Java Programming Curriculum",
      description: "From JVM architecture and primitive types to Collections, Concurrency, and placement-focused concepts.",
      lessons: javaLessons,
    };
  }
  if (lang === "cpp") {
    return {
      name: "C++",
      title: "C++ Programming Curriculum",
      description: "From direct memory, pointers, and RAII to the Standard Template Library (STL) and modern move semantics.",
      lessons: cppLessons,
    };
  }
  if (lang === "python") {
    return {
      name: "Python",
      title: "Python Programming Curriculum",
      description: "From object references, dynamic typing, and collections to heapq, bisect, and interview Big-O complexities.",
      lessons: pythonLessons,
    };
  }
  if (lang === "javascript") {
    return {
      name: "JavaScript",
      title: "JavaScript Programming Curriculum",
      description: "From V8 engine internals, closures, and prototypal OOP to the Event Loop, Promises, and rate-limiting patterns.",
      lessons: javascriptLessons,
    };
  }
  return null;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const data = getLangData(lang.toLowerCase());
  if (!data) return {};
  return createLanguageMetadata(data.name, lang.toLowerCase(), data.description);
}

export default async function LanguageHubPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = rawLang.toLowerCase();
  const data = getLangData(lang);

  if (!data) {
    notFound();
  }

  const { name, title, description, lessons } = data;

  // Group lessons by module topicTitle
  const moduleMap = new Map<string, Lesson[]>();
  for (const l of lessons) {
    const list = moduleMap.get(l.topicTitle) || [];
    list.push(l);
    moduleMap.set(l.topicTitle, list);
  }

  const breadcrumbs = getLanguageBreadcrumbs(name);
  const breadcrumbJsonLd = createBreadcrumbJsonLd(breadcrumbs);
  const courseJsonLd = createCourseJsonLd({
    name: `${name} Programming Curriculum`,
    description,
    path: getLanguagePath(lang),
    courseCode: `LANG-${lang.toUpperCase()}`,
  });
  const itemListJsonLd = createItemListJsonLd({
    name: `${name} Lessons Curriculum`,
    description,
    path: getLanguagePath(lang),
    items: lessons.map((l) => ({
      name: l.title,
      path: getLanguageLessonPath(lang, l.slug),
      description: l.oneSentence,
    })),
  });
  const faqJsonLd = createFaqJsonLd([
    {
      question: `Is ${name} good for Data Structures and Algorithms (DSA)?`,
      answer: `${name} is widely supported across all technical interview platforms and major tech company coding assessments. This track teaches language mechanics, collections, and interview idioms from first principles.`,
    },
    {
      question: `What is covered in the AlgoPrimer ${name} curriculum?`,
      answer: `The curriculum covers ${lessons.length} lessons spanning memory models, type systems, execution internals, standard collections, and interview-critical patterns.`,
    },
    {
      question: `Is the ${name} curriculum beginner friendly?`,
      answer: `Yes, each topic begins with zero-assumption mental models and progresses to performance characteristics, memory layouts, and interview problem applications.`,
    },
  ]);

  return (
    <div className={styles.container}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumbs items={breadcrumbs} />

      <header className={styles.header}>
        <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
          <Badge variant="level">{name.toUpperCase()} TRACK</Badge>
          <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            {lessons.length} In-Depth Lessons Across {moduleMap.size} Modules
          </span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.desc}>{description}</p>
      </header>

      <div className={styles.modulesContainer}>
        {Array.from(moduleMap.entries()).map(([moduleTitle, moduleLessons], modIdx) => (
          <section key={moduleTitle} className={styles.moduleSection}>
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
                      href={getLanguageLessonPath(lang, lesson.slug)}
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
          </section>
        ))}
      </div>
    </div>
  );
}
