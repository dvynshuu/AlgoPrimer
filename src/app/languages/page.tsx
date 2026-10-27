import React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import styles from "./languages.module.css";
import { javaLessons } from "@/content/languages/java";
import { cppLessons } from "@/content/languages/cpp";
import { pythonLessons } from "@/content/languages/python";
import { javascriptLessons } from "@/content/languages/javascript";
import {
  getHomePath,
  getLanguagesPath,
  getLanguagePath,
  getLanguageLessonPath,
} from "@/lib/routes";
import { createPageMetadata, createBreadcrumbJsonLd, createItemListJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Programming Language Tracks — Java, C++, Python, JavaScript",
  description:
    "Comprehensive, student-first language tracks for Java, C++, Python, and JavaScript covering memory models, syntax, OOP, standard libraries, and interview patterns.",
  path: getLanguagesPath(),
  keywords: [
    "programming languages",
    "Java track",
    "C++ track",
    "Python track",
    "JavaScript track",
    "coding interview languages",
  ],
});

export default function LanguagesPage() {
  const breadcrumbs = [{ label: "Home", href: getHomePath() }, { label: "Languages" }];
  const breadcrumbJsonLd = createBreadcrumbJsonLd(breadcrumbs);

  const itemListJsonLd = createItemListJsonLd({
    name: "Programming Language Curricula for Technical Interviews",
    description: "Deep computer science language tracks covering execution models, memory layouts, and standard collections.",
    path: getLanguagesPath(),
    items: [
      {
        name: "Java Programming Track",
        path: getLanguagePath("java"),
        description: `JVM internals, memory models, OOP invariants, and Collections Framework (${javaLessons.length} lessons).`,
      },
      {
        name: "C++ Programming Track",
        path: getLanguagePath("cpp"),
        description: `Direct memory layout, pointers, references, RAII, and Standard Template Library (${cppLessons.length} lessons).`,
      },
      {
        name: "Python Programming Track",
        path: getLanguagePath("python"),
        description: `Dynamic typing, object references, list comprehensions, and placement standard library (${pythonLessons.length} lessons).`,
      },
      {
        name: "JavaScript Track",
        path: getLanguagePath("javascript"),
        description: `V8 engine internals, closures, event loop, Promises, and prototypal inheritance (${javascriptLessons.length} lessons).`,
      },
    ],
  });

  return (
    <div className={styles.container}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Breadcrumbs items={breadcrumbs} />

      <header className={styles.header}>
        <h1 className={styles.title}>Programming Language Tracks</h1>
        <p className={styles.desc}>
          Master language syntax, execution models, memory layouts, and standard collections.
          Choose the language you plan to use for your coding rounds and technical interviews.
        </p>
      </header>

      <div className={styles.trackList}>
        {/* Java Track */}
        <div className={styles.trackCard}>
          <div className={styles.cardTop}>
            <div>
              <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
                <Badge variant="level">Enterprise & Campus Favorite</Badge>
                <span className={styles.lessonCount}>{javaLessons.length} Lessons Available</span>
              </div>
              <h2 className={styles.trackTitle}>Java Track</h2>
            </div>
            <Button href={getLanguagePath("java")} variant="primary" size="sm" icon={<ArrowRight size={14} />}>
              Open Java Track
            </Button>
          </div>
          <p className={styles.trackSummary}>
            Covers JVM architecture (JDK/JRE/JVM), stack vs heap memory models, object-oriented design invariants (Encapsulation, Polymorphism, Interfaces), and the Java Collections Framework (ArrayList, HashMap, HashSet).
          </p>
          <div className={styles.lessonPreview}>
            <strong>Curriculum Modules:</strong>
            <div className={styles.previewLinks}>
              {javaLessons.map((l) => (
                <Link key={l.id} href={getLanguageLessonPath("java", l.slug)}>
                  {l.title} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* C++ Track */}
        <div className={styles.trackCard}>
          <div className={styles.cardTop}>
            <div>
              <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
                <Badge variant="level">Online Assessment Speed</Badge>
                <span className={styles.lessonCount}>{cppLessons.length} Lessons Available</span>
              </div>
              <h2 className={styles.trackTitle}>C++ Track</h2>
            </div>
            <Button href={getLanguagePath("cpp")} variant="primary" size="sm" icon={<ArrowRight size={14} />}>
              Open C++ Track
            </Button>
          </div>
          <p className={styles.trackSummary}>
            Covers direct memory layouts, pointers vs references (`&`), pass-by-value vs pass-by-reference semantics, memory management, and deep coverage of the Standard Template Library (vector, map, set, algorithms).
          </p>
          <div className={styles.lessonPreview}>
            <strong>Curriculum Modules:</strong>
            <div className={styles.previewLinks}>
              {cppLessons.map((l) => (
                <Link key={l.id} href={getLanguageLessonPath("cpp", l.slug)}>
                  {l.title} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Python Track */}
        <div className={styles.trackCard}>
          <div className={styles.cardTop}>
            <div>
              <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
                <Badge variant="level">Rapid Prototyping</Badge>
                <span className={styles.lessonCount}>{pythonLessons.length} Lessons Available</span>
              </div>
              <h2 className={styles.trackTitle}>Python Track</h2>
            </div>
            <Button href={getLanguagePath("python")} variant="primary" size="sm" icon={<ArrowRight size={14} />}>
              Open Python Track
            </Button>
          </div>
          <p className={styles.trackSummary}>
            Covers dynamic typing, object references, mutability vs immutability, list/dict comprehensions, enumerate/zip protocols, and placement-focused standard libraries (`collections`, `heapq`).
          </p>
          <div className={styles.lessonPreview}>
            <strong>Curriculum Modules:</strong>
            <div className={styles.previewLinks}>
              {pythonLessons.map((l) => (
                <Link key={l.id} href={getLanguageLessonPath("python", l.slug)}>
                  {l.title} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* JavaScript Track */}
        <div className={styles.trackCard}>
          <div className={styles.cardTop}>
            <div>
              <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
                <Badge variant="level">Fullstack & Web SDE</Badge>
                <span className={styles.lessonCount}>{javascriptLessons.length} Lessons Available</span>
              </div>
              <h2 className={styles.trackTitle}>JavaScript Track</h2>
            </div>
            <Button href={getLanguagePath("javascript")} variant="primary" size="sm" icon={<ArrowRight size={14} />}>
              Open JavaScript Track
            </Button>
          </div>
          <p className={styles.trackSummary}>
            Covers V8 internals, execution context, closures, prototypal inheritance, ES6 classes, the Event Loop (microtasks vs macrotasks), Promises, async/await, and interview coding patterns.
          </p>
          <div className={styles.lessonPreview}>
            <strong>Curriculum Modules:</strong>
            <div className={styles.previewLinks}>
              {javascriptLessons.map((l) => (
                <Link key={l.id} href={getLanguageLessonPath("javascript", l.slug)}>
                  {l.title} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
