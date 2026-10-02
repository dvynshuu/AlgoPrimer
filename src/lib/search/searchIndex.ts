import { javaLessons } from "@/content/languages/java";
import { cppLessons } from "@/content/languages/cpp";
import { pythonLessons } from "@/content/languages/python";
import { javascriptLessons } from "@/content/languages/javascript";
import { dsaLessons } from "@/content/dsa/lessons";
import { dsaTopics } from "@/content/dsa/topics";
import { problems } from "@/content/problems";
import { revisionCards } from "@/content/revision";
import {
  getLanguageLessonPath,
  getDsaTopicPath,
  getDsaLessonPath,
  getProblemPath,
  getRevisionPath,
  getInterviewPath,
} from "@/lib/routes";

export type SearchCategory =
  | "Language"
  | "DSA Topic"
  | "DSA Lesson"
  | "Problem"
  | "Revision"
  | "Interview";

export interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  context: string;
  url: string;
  tags: string[];
  relevanceScore?: number;
}

let cachedIndex: SearchResultItem[] | null = null;

/**
 * Builds the lightweight search index ONCE.
 * Does not include code bodies, dry runs, or large curriculum objects.
 */
export function getSearchIndex(): SearchResultItem[] {
  if (cachedIndex) return cachedIndex;

  const items: SearchResultItem[] = [];

  // 1. Language Programming Lessons
  for (const lesson of javaLessons) {
    items.push({
      id: lesson.id,
      title: lesson.title,
      description: lesson.oneSentence,
      category: "Language",
      context: `Java Track: ${lesson.oneSentence}`,
      url: getLanguageLessonPath("java", lesson.slug),
      tags: ["java", "programming", lesson.slug, "oop", "jvm"],
    });
  }

  for (const lesson of cppLessons) {
    items.push({
      id: lesson.id,
      title: lesson.title,
      description: lesson.oneSentence,
      category: "Language",
      context: `C++ Track: ${lesson.oneSentence}`,
      url: getLanguageLessonPath("cpp", lesson.slug),
      tags: ["cpp", "c++", "memory", "pointers", "stl", lesson.slug],
    });
  }

  for (const lesson of pythonLessons) {
    items.push({
      id: lesson.id,
      title: lesson.title,
      description: lesson.oneSentence,
      category: "Language",
      context: `Python Track: ${lesson.oneSentence}`,
      url: getLanguageLessonPath("python", lesson.slug),
      tags: ["python", "dynamic", "iteration", "comprehensions", lesson.slug],
    });
  }

  for (const lesson of javascriptLessons) {
    items.push({
      id: lesson.id,
      title: lesson.title,
      description: lesson.oneSentence,
      category: "Language",
      context: `JavaScript Track: ${lesson.oneSentence}`,
      url: getLanguageLessonPath("javascript", lesson.slug),
      tags: ["javascript", "js", "v8", "event-loop", "async", "promises", "closures", lesson.slug],
    });
  }

  // 2. DSA Topics
  for (const topic of dsaTopics) {
    items.push({
      id: topic.id,
      title: topic.title,
      description: topic.description,
      category: "DSA Topic",
      context: `Roadmap Topic #${topic.order}: ${topic.description}`,
      url: getDsaTopicPath(topic.slug),
      tags: [topic.slug, "roadmap", "topic", "data structures", "algorithms"],
    });
  }

  // 3. DSA Lessons (canonical /dsa/[topic]/[lesson])
  for (const lesson of dsaLessons) {
    items.push({
      id: lesson.id,
      title: lesson.title,
      description: lesson.oneSentence,
      category: "DSA Lesson",
      context: `DSA ${lesson.topicTitle}: ${lesson.oneSentence}`,
      url: getDsaLessonPath(lesson.topicSlug, lesson.slug),
      tags: [lesson.slug, lesson.topicSlug, "algorithm", "complexity", "pattern"],
    });
  }

  // 4. Problems
  for (const prob of problems) {
    const companyStr =
      prob.companies && prob.companies.length > 0 ? ` • ${prob.companies.slice(0, 3).join(", ")}` : "";
    items.push({
      id: prob.id,
      title: prob.title,
      description: prob.understandTheProblem,
      category: "Problem",
      context: `[${prob.difficulty}] Pattern: ${prob.pattern} (${prob.topic})${companyStr}`,
      url: getProblemPath(prob.slug),
      tags: [
        ...prob.tags,
        prob.pattern.toLowerCase(),
        prob.difficulty.toLowerCase(),
        prob.topic.toLowerCase(),
        prob.topicSlug,
        prob.subtopic.toLowerCase(),
        ...(prob.companies ? prob.companies.map((c) => c.toLowerCase()) : []),
      ],
    });
  }

  // 5. Revision Cards
  for (const card of revisionCards) {
    items.push({
      id: card.id,
      title: `${card.title} Cheat Sheet`,
      description: `Key takeaways, common pitfalls, and patterns for ${card.topic}.`,
      category: "Revision",
      context: `Revision card: Key takeaways, common pitfalls, and patterns for ${card.topic}.`,
      url: getRevisionPath(card.id),
      tags: [card.topic.toLowerCase(), "revision", "cheat sheet"],
    });
  }

  // 6. Interview Hub
  items.push({
    id: "interview-prep-guide",
    title: "Interview Rounds & Placement Guide",
    description: "Comprehensive guide to Online Assessments (OA), technical interviews, and core CS subjects.",
    category: "Interview",
    context: "Comprehensive breakdown of OA rounds, technical interviews, and core CS subjects.",
    url: getInterviewPath(),
    tags: ["interview", "placement", "oa", "hr", "rounds", "cs subjects"],
  });

  cachedIndex = items;
  return cachedIndex;
}

export function buildSearchIndex(): SearchResultItem[] {
  return getSearchIndex();
}

/**
 * Searches the lightweight index with word-boundary and relevance scoring.
 */
export function searchContent(query: string, category?: string): SearchResultItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const index = getSearchIndex();
  const words = trimmed.split(/\s+/).filter(Boolean);

  const matched: SearchResultItem[] = [];

  for (const item of index) {
    if (category && category !== "All" && item.category !== category) {
      continue;
    }

    const titleLower = item.title.toLowerCase();
    const contextLower = item.context.toLowerCase();
    const descLower = item.description.toLowerCase();

    let score = 0;

    // Exact title match gets highest score
    if (titleLower === trimmed) {
      score += 120;
    } else if (titleLower.startsWith(trimmed)) {
      score += 70;
    } else if (titleLower.includes(trimmed)) {
      score += 50;
    }

    // Tokenized word matching
    for (const word of words) {
      if (titleLower.includes(word)) score += 25;
      if (item.tags.some((t) => t.includes(word))) score += 15;
      if (descLower.includes(word)) score += 8;
      if (contextLower.includes(word)) score += 5;
    }

    if (score > 0) {
      matched.push({ ...item, relevanceScore: score });
    }
  }

  return matched.sort((a, b) => (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0));
}
