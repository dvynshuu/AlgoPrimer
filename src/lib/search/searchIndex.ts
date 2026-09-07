import { javaLessons } from "@/content/languages/java";
import { cppLessons } from "@/content/languages/cpp";
import { pythonLessons } from "@/content/languages/python";
import { javascriptLessons } from "@/content/languages/javascript";
import { dsaLessons } from "@/content/dsa/lessons";
import { dsaTopics } from "@/content/dsa/topics";
import { problems } from "@/content/problems";
import { revisionCards } from "@/content/revision";

export interface SearchResultItem {
  id: string;
  title: string;
  category: "Language" | "DSA Topic" | "DSA Lesson" | "Problem" | "Revision" | "Interview";
  context: string;
  url: string;
  matchedTags?: string[];
  relevanceScore?: number;
}

export function buildSearchIndex(): SearchResultItem[] {
  const items: SearchResultItem[] = [];

  // 1. Language Lessons
  for (const lesson of javaLessons) {
    items.push({
      id: lesson.id,
      title: lesson.title,
      category: "Language",
      context: `Java Foundations: ${lesson.oneSentence}`,
      url: `/languages/java/${lesson.slug}`,
      matchedTags: ["java", "programming", lesson.slug, "primitives"],
    });
  }

  for (const lesson of cppLessons) {
    items.push({
      id: lesson.id,
      title: lesson.title,
      category: "Language",
      context: `C++ Foundations: ${lesson.oneSentence}`,
      url: `/languages/cpp/${lesson.slug}`,
      matchedTags: ["cpp", "c++", "memory", "pointers", "references"],
    });
  }

  for (const lesson of pythonLessons) {
    items.push({
      id: lesson.id,
      title: lesson.title,
      category: "Language",
      context: `Python Foundations: ${lesson.oneSentence}`,
      url: `/languages/python/${lesson.slug}`,
      matchedTags: ["python", "dynamic", "iteration", "comprehensions"],
    });
  }

  for (const lesson of javascriptLessons) {
    items.push({
      id: lesson.id,
      title: lesson.title,
      category: "Language",
      context: `JavaScript Mastery: ${lesson.oneSentence}`,
      url: `/languages/javascript/${lesson.slug}`,
      matchedTags: ["javascript", "js", "v8", "event-loop", "async", "promises", "closures", lesson.slug],
    });
  }

  // 2. DSA Topics
  for (const topic of dsaTopics) {
    items.push({
      id: topic.id,
      title: topic.title,
      category: "DSA Topic",
      context: `Roadmap Topic #${topic.order}: ${topic.description}`,
      url: `/dsa/${topic.slug}`,
      matchedTags: [topic.slug, "roadmap", "topic"],
    });
  }

  // 3. DSA Lessons
  for (const lesson of dsaLessons) {
    items.push({
      id: lesson.id,
      title: lesson.title,
      category: "DSA Lesson",
      context: `DSA: ${lesson.oneSentence}`,
      url: `/dsa/${lesson.slug}`,
      matchedTags: [lesson.slug, "algorithm", "complexity"],
    });
  }

  // 4. Problems
  for (const prob of problems) {
    const companyStr = prob.companies && prob.companies.length > 0 ? ` • ${prob.companies.slice(0, 3).join(", ")}` : "";
    items.push({
      id: prob.id,
      title: prob.title,
      category: "Problem",
      context: `[${prob.difficulty}] Pattern: ${prob.pattern} (${prob.topic})${companyStr}`,
      url: `/problems/${prob.slug}`,
      matchedTags: [
        ...prob.tags,
        prob.pattern.toLowerCase(),
        prob.difficulty.toLowerCase(),
        prob.topic.toLowerCase(),
        prob.subtopic.toLowerCase(),
        ...(prob.companies ? prob.companies.map((c) => c.toLowerCase()) : []),
        ...(prob.companies || []),
      ],
    });
  }

  // 5. Revision Cards
  for (const card of revisionCards) {
    items.push({
      id: card.id,
      title: `${card.title} Cheat Sheet`,
      category: "Revision",
      context: `Revision card: Key takeaways, common pitfalls, and patterns for ${card.topic}.`,
      url: `/revision#${card.id}`,
      matchedTags: [card.topic.toLowerCase(), "revision", "cheat sheet"],
    });
  }

  // 6. Interview Hub
  items.push({
    id: "interview-prep-guide",
    title: "Placement Interview Roadmap & Rounds",
    category: "Interview",
    context: "Comprehensive breakdown of OA rounds, technical interviews, and core CS subjects.",
    url: "/interview",
    matchedTags: ["interview", "placement", "oa", "hr", "rounds"],
  });

  return items;
}

export function searchContent(query: string): SearchResultItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const index = buildSearchIndex();
  const words = trimmed.split(/\s+/);

  const scored = index.map((item) => {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const contextLower = item.context.toLowerCase();

    // Exact title match gets highest score
    if (titleLower === trimmed) {
      score += 100;
    } else if (titleLower.includes(trimmed)) {
      score += 50;
    }

    // Word matches in title
    for (const word of words) {
      if (titleLower.includes(word)) score += 20;
      if (contextLower.includes(word)) score += 5;
      if (item.matchedTags?.some((t) => t.toLowerCase().includes(word))) {
        score += 15;
      }
    }

    return { ...item, relevanceScore: score };
  });

  return scored
    .filter((item) => (item.relevanceScore ?? 0) > 0)
    .sort((a, b) => (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0));
}
