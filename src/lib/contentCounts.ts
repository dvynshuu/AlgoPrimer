import { javaLessons } from "@/content/languages/java";
import { cppLessons } from "@/content/languages/cpp";
import { pythonLessons } from "@/content/languages/python";
import { javascriptLessons } from "@/content/languages/javascript";
import { dsaLessons } from "@/content/dsa/lessons";
import { dsaTopics } from "@/content/dsa/topics";
import { problems } from "@/content/problems";
import { revisionCards } from "@/content/revision";

export function getLanguageLessonCount(lang?: "java" | "cpp" | "python" | "javascript"): number {
  if (lang === "java") return javaLessons.length;
  if (lang === "cpp") return cppLessons.length;
  if (lang === "python") return pythonLessons.length;
  if (lang === "javascript") return javascriptLessons.length;
  return javaLessons.length + cppLessons.length + pythonLessons.length + javascriptLessons.length;
}

export function getDsaLessonCount(topicSlug?: string): number {
  if (topicSlug) {
    return dsaLessons.filter((l) => l.topicSlug === topicSlug).length;
  }
  return dsaLessons.length;
}

export function getDsaTopicCount(): number {
  return dsaTopics.length;
}

export function getProblemCount(topicSlug?: string): number {
  if (topicSlug) {
    return problems.filter((p) => p.topicSlug === topicSlug).length;
  }
  return problems.length;
}

export function getRevisionCount(): number {
  return revisionCards.length;
}

export function getCurriculumSummary() {
  return {
    totalLanguages: 4,
    totalLanguageLessons: getLanguageLessonCount(),
    totalDsaTopics: getDsaTopicCount(),
    totalDsaLessons: getDsaLessonCount(),
    totalProblems: getProblemCount(),
    totalRevisionCards: getRevisionCount(),
  };
}
