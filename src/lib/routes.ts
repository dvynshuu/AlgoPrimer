import { dsaTopics } from "@/content/dsa/topics";
import { dsaLessons } from "@/content/dsa/lessons";
import { problems } from "@/content/problems";
import type { TopicMetadata, Lesson, Problem } from "@/types/content";

/**
 * AlgoPrimer Centralized Route & Canonical Content Manifest
 * Guarantees zero hardcoded path concatenations and uniform breadcrumb/URL resolution.
 */

export const ROUTES = {
  home: "/",
  learn: "/learn",
  languages: "/languages",
  dsa: "/dsa",
  problems: "/problems",
  roadmap: "/roadmap",
  revision: "/revision",
  interview: "/interview",
  profile: "/profile",
  search: "/search",
} as const;

export function getHomePath(): string {
  return ROUTES.home;
}

export function getLearnPath(): string {
  return ROUTES.learn;
}

export function getLanguagesPath(): string {
  return ROUTES.languages;
}

export function getLanguagePath(languageSlug: string): string {
  return `/languages/${languageSlug.toLowerCase()}`;
}

export function getLanguageLessonPath(languageSlug: string, lessonSlug: string): string {
  return `/languages/${languageSlug.toLowerCase()}/${lessonSlug.toLowerCase()}`;
}

export function getDsaPath(): string {
  return ROUTES.dsa;
}

export function getDsaTopicPath(topicSlug: string): string {
  return `/dsa/${topicSlug.toLowerCase()}`;
}

export function getDsaLessonPath(topicSlug: string, lessonSlug: string): string {
  return `/dsa/${topicSlug.toLowerCase()}/${lessonSlug.toLowerCase()}`;
}

export function getProblemsPath(): string {
  return ROUTES.problems;
}

export function getProblemPath(problemSlug: string): string {
  return `/problems/${problemSlug.toLowerCase()}`;
}

export function getRevisionPath(cardId?: string): string {
  return cardId ? `/revision#${cardId}` : ROUTES.revision;
}

export function getRoadmapPath(): string {
  return ROUTES.roadmap;
}

export function getInterviewPath(): string {
  return ROUTES.interview;
}

export function getProfilePath(): string {
  return ROUTES.profile;
}

export function getSearchPath(): string {
  return ROUTES.search;
}

// -------------------------------------------------------------
// Canonical Content Resolvers
// -------------------------------------------------------------

export function getDsaTopicBySlug(slug: string): TopicMetadata | undefined {
  const normalized = slug.trim().toLowerCase();
  return dsaTopics.find((t) => t.slug === normalized);
}

export function getDsaLessonsForTopic(topicSlug: string): Lesson[] {
  const normalized = topicSlug.trim().toLowerCase();
  return dsaLessons.filter((l) => l.topicSlug === normalized);
}

export function getDsaLesson(topicSlug: string, lessonSlug: string): Lesson | undefined {
  const normTopic = topicSlug.trim().toLowerCase();
  const normLesson = lessonSlug.trim().toLowerCase();
  return dsaLessons.find((l) => l.topicSlug === normTopic && l.slug === normLesson);
}

export function getAdjacentDsaLessons(topicSlug: string, lessonSlug: string): {
  prev?: Lesson;
  next?: Lesson;
} {
  const lessons = getDsaLessonsForTopic(topicSlug);
  const index = lessons.findIndex((l) => l.slug === lessonSlug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? lessons[index - 1] : undefined,
    next: index < lessons.length - 1 ? lessons[index + 1] : undefined,
  };
}

export function getProblemsForDsaTopic(topicSlug: string): Problem[] {
  const normTopic = topicSlug.trim().toLowerCase();
  return problems.filter((p) => p.topicSlug === normTopic);
}

/**
 * Legacy DSA Route Resolver.
 * Maps previous pre-rearchitecture URLs (e.g., `/dsa/two-pointers`) to canonical targets.
 */
export function resolveLegacyDsaPath(slug: string): string | null {
  const normalized = slug.trim().toLowerCase();

  // If slug is a lesson under arrays like two-pointers
  if (normalized === "two-pointers") {
    return getDsaLessonPath("arrays", "two-pointers");
  }

  // If slug was an old standalone lesson slug that now lives under a topic
  const lesson = dsaLessons.find((l) => l.slug === normalized);
  if (lesson) {
    return getDsaLessonPath(lesson.topicSlug, lesson.slug);
  }

  return null;
}

// -------------------------------------------------------------
// Breadcrumb Builders
// -------------------------------------------------------------

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function getDsaTopicBreadcrumbs(topic: TopicMetadata): BreadcrumbItem[] {
  return [
    { label: "Home", href: getHomePath() },
    { label: "DSA", href: getDsaPath() },
    { label: topic.title },
  ];
}

export function getDsaLessonBreadcrumbs(topic: TopicMetadata, lesson: Lesson): BreadcrumbItem[] {
  return [
    { label: "Home", href: getHomePath() },
    { label: "DSA", href: getDsaPath() },
    { label: topic.title, href: getDsaTopicPath(topic.slug) },
    { label: lesson.title },
  ];
}

export function getLanguageBreadcrumbs(langName: string): BreadcrumbItem[] {
  return [
    { label: "Home", href: getHomePath() },
    { label: "Languages", href: getLanguagesPath() },
    { label: `${langName} Track` },
  ];
}

export function getLanguageLessonBreadcrumbs(
  langName: string,
  langSlug: string,
  lessonTitle: string
): BreadcrumbItem[] {
  return [
    { label: "Home", href: getHomePath() },
    { label: "Languages", href: getLanguagesPath() },
    { label: `${langName} Track`, href: getLanguagePath(langSlug) },
    { label: lessonTitle },
  ];
}

export function getProblemBreadcrumbs(problem: Problem, topicMeta?: TopicMetadata): BreadcrumbItem[] {
  return [
    { label: "Home", href: getHomePath() },
    { label: "Problems", href: getProblemsPath() },
    {
      label: topicMeta ? topicMeta.title : problem.topic,
      href: getDsaTopicPath(problem.topicSlug),
    },
    { label: problem.title },
  ];
}
