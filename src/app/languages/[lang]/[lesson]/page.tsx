import React from "react";
import { notFound } from "next/navigation";
import { LessonViewer } from "@/components/content/LessonViewer";
import { TopicSidebar, SidebarSection } from "@/components/layout/TopicSidebar";
import { javaLessons } from "@/content/languages/java";
import { cppLessons } from "@/content/languages/cpp";
import { pythonLessons } from "@/content/languages/python";
import { javascriptLessons } from "@/content/languages/javascript";
import { Lesson } from "@/types/content";

interface PageProps {
  params: Promise<{ lang: string; lesson: string }>;
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

  let allLessons: Lesson[] = [];
  if (lang === "java") allLessons = javaLessons;
  else if (lang === "cpp") allLessons = cppLessons;
  else if (lang === "python") allLessons = pythonLessons;
  else if (lang === "javascript") allLessons = javascriptLessons;
  else notFound();

  const currentLesson = allLessons.find((l) => l.slug === lessonSlug);
  if (!currentLesson) notFound();

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
        href: `/languages/${lang}/${l.slug}`,
      })),
    })
  );

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Languages", href: "/languages" },
    { label: lang.toUpperCase(), href: `/languages/${lang}` },
    { label: currentLesson.title },
  ];

  return (
    <div style={{ minHeight: "calc(100vh - var(--header-height))", width: "100%", position: "relative" }}>
      <TopicSidebar sections={sidebarSections} />
      <LessonViewer lesson={currentLesson} breadcrumbItems={breadcrumbItems} />
    </div>
  );
}
