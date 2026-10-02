import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonViewer } from "@/components/content/LessonViewer";
import { TopicSidebar, SidebarSection } from "@/components/layout/TopicSidebar";
import { javaLessons } from "@/content/languages/java";
import { cppLessons } from "@/content/languages/cpp";
import { pythonLessons } from "@/content/languages/python";
import { javascriptLessons } from "@/content/languages/javascript";
import { Lesson } from "@/types/content";
import {
  getLanguageLessonBreadcrumbs,
  getLanguageLessonPath,
} from "@/lib/routes";
import {
  createLanguageLessonMetadata,
  createBreadcrumbJsonLd,
  createTechArticleJsonLd,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ lang: string; lesson: string }>;
}

const LANG_NAMES: Record<string, string> = {
  java: "Java",
  cpp: "C++",
  python: "Python",
  javascript: "JavaScript",
};

function getLessonsForLang(lang: string): Lesson[] | null {
  if (lang === "java") return javaLessons;
  if (lang === "cpp") return cppLessons;
  if (lang === "python") return pythonLessons;
  if (lang === "javascript") return javascriptLessons;
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, lesson: lessonSlug } = await params;
  const allLessons = getLessonsForLang(lang);
  if (!allLessons) return {};

  const lesson = allLessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return {};

  const langName = LANG_NAMES[lang] || lang.toUpperCase();
  return createLanguageLessonMetadata(langName, lang, lesson);
}

export function generateStaticParams() {
  const tracks = [
    { lang: "java", lessons: javaLessons },
    { lang: "cpp", lessons: cppLessons },
    { lang: "python", lessons: pythonLessons },
    { lang: "javascript", lessons: javascriptLessons },
  ];

  return tracks.flatMap(({ lang, lessons }) =>
    lessons.map((l) => ({
      lang,
      lesson: l.slug,
    }))
  );
}

export default async function LanguageLessonPage({ params }: PageProps) {
  const { lang, lesson: lessonSlug } = await params;

  const allLessons = getLessonsForLang(lang);
  if (!allLessons) notFound();

  const currentLesson = allLessons.find((l) => l.slug === lessonSlug);
  if (!currentLesson) notFound();

  const langName = LANG_NAMES[lang] || lang.toUpperCase();

  // Group lessons by module topicTitle
  const sectionMap = new Map<string, Lesson[]>();
  for (const l of allLessons) {
    const list = sectionMap.get(l.topicTitle) || [];
    list.push(l);
    sectionMap.set(l.topicTitle, list);
  }

  const sidebarSections: SidebarSection[] = Array.from(sectionMap.entries()).map(
    ([moduleTitle, items]) => ({
      title: moduleTitle,
      items: items.map((l) => ({
        id: l.id,
        title: l.title,
        href: getLanguageLessonPath(lang, l.slug),
      })),
    })
  );

  const breadcrumbItems = getLanguageLessonBreadcrumbs(langName, lang, currentLesson.title);
  const breadcrumbJsonLd = createBreadcrumbJsonLd(breadcrumbItems);
  const articleJsonLd = createTechArticleJsonLd({
    headline: `${currentLesson.title} — ${langName}`,
    description: currentLesson.oneSentence,
    path: getLanguageLessonPath(lang, currentLesson.slug),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div style={{ minHeight: "calc(100vh - var(--header-height))", width: "100%", position: "relative" }}>
        <TopicSidebar sections={sidebarSections} />
        <LessonViewer lesson={currentLesson} breadcrumbItems={breadcrumbItems} />
      </div>
    </>
  );
}
