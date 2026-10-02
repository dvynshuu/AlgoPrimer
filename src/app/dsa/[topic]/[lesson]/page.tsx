import React from "react";
import { notFound } from "next/navigation";
import { LessonViewer } from "@/components/content/LessonViewer";
import { TopicSidebar, SidebarSection } from "@/components/layout/TopicSidebar";
import { dsaLessons } from "@/content/dsa/lessons";
import { dsaTopics } from "@/content/dsa/topics";
import {
  getDsaTopicBySlug,
  getDsaLesson,
  getDsaLessonsForTopic,
  getProblemsForDsaTopic,
  getDsaLessonPath,
  getDsaTopicPath,
  getDsaLessonBreadcrumbs,
} from "@/lib/routes";
import {
  createDsaLessonMetadata,
  createBreadcrumbJsonLd,
  createTechArticleJsonLd,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ topic: string; lesson: string }>;
}

export async function generateStaticParams() {
  return dsaLessons.map((l) => ({
    topic: l.topicSlug,
    lesson: l.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { topic: rawTopic, lesson: rawLesson } = await params;
  const topicSlug = rawTopic.toLowerCase();
  const lessonSlug = rawLesson.toLowerCase();

  const topic = getDsaTopicBySlug(topicSlug);
  const lesson = getDsaLesson(topicSlug, lessonSlug);

  if (!topic || !lesson) return {};
  return createDsaLessonMetadata(topic, lesson);
}

export default async function DSALessonPage({ params }: PageProps) {
  const { topic: rawTopic, lesson: rawLesson } = await params;
  const topicSlug = rawTopic.toLowerCase();
  const lessonSlug = rawLesson.toLowerCase();

  const topic = getDsaTopicBySlug(topicSlug);
  const lesson = getDsaLesson(topicSlug, lessonSlug);

  if (!topic || !lesson) {
    notFound();
  }

  const topicLessons = getDsaLessonsForTopic(topic.slug);
  const relatedProblems = getProblemsForDsaTopic(topic.slug);
  const breadcrumbs = getDsaLessonBreadcrumbs(topic, lesson);

  const breadcrumbJsonLd = createBreadcrumbJsonLd(breadcrumbs);
  const articleJsonLd = createTechArticleJsonLd({
    headline: lesson.title,
    description: lesson.oneSentence,
    path: getDsaLessonPath(topic.slug, lesson.slug),
  });

  const sidebarSections: SidebarSection[] = [
    {
      title: `${topic.title} Lessons`,
      items: topicLessons.map((l) => ({
        id: l.id,
        title: l.title,
        href: getDsaLessonPath(topic.slug, l.slug),
      })),
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <TopicSidebar sections={sidebarSections} />
      <LessonViewer
        lesson={lesson}
        breadcrumbItems={breadcrumbs}
        relatedProblems={relatedProblems}
      />
    </div>
  );
}
