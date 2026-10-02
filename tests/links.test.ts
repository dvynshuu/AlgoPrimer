import { describe, it, expect } from "vitest";
import { dsaTopics } from "@/content/dsa/topics";
import { dsaLessons } from "@/content/dsa/lessons";
import { problems } from "@/content/problems";
import { javaLessons } from "@/content/languages/java";
import { cppLessons } from "@/content/languages/cpp";
import { pythonLessons } from "@/content/languages/python";
import { javascriptLessons } from "@/content/languages/javascript";
import { revisionCards } from "@/content/revision";
import {
  getDsaLessonPath,
  getProblemPath,
  getLanguageLessonPath,
  getDsaTopicBySlug,
  getDsaLesson,
} from "@/lib/routes";

describe("Internal Link & Content Integrity Crawler", () => {
  const topicSlugSet = new Set(dsaTopics.map((t) => t.slug));
  const problemSlugSet = new Set(problems.map((p) => p.slug));

  it("verifies problem slugs are globally unique", () => {
    expect(problemSlugSet.size).toBe(problems.length);
  });

  it("verifies every DSA topic has valid lessons array and none are orphaned", () => {
    for (const topic of dsaTopics) {
      expect(topic.slug).toMatch(/^[a-z0-9-]+$/);
      expect(topic.lessons.length).toBeGreaterThan(0);

      // Verify all listed lessons exist in dsaLessons
      for (const lessonSlug of topic.lessons) {
        const found = getDsaLesson(topic.slug, lessonSlug);
        expect(
          found,
          `Topic ${topic.slug} lists lesson ${lessonSlug}, but it does not exist in dsaLessons`
        ).toBeDefined();
      }
    }
  });

  it("verifies every DSA lesson points to a valid parent topic and has a unique canonical slug", () => {
    for (const lesson of dsaLessons) {
      expect(
        topicSlugSet.has(lesson.topicSlug),
        `Lesson ${lesson.slug} points to unknown topicSlug: ${lesson.topicSlug}`
      ).toBe(true);

      // Verify lesson slug does NOT collide with its topic slug
      expect(
        lesson.slug !== lesson.topicSlug,
        `Topic/lesson collision detected: lesson slug '${lesson.slug}' equals topic slug '${lesson.topicSlug}'`
      ).toBe(true);

      // Verify route generation produces valid canonical path
      const path = getDsaLessonPath(lesson.topicSlug, lesson.slug);
      expect(path).toBe(`/dsa/${lesson.topicSlug}/${lesson.slug}`);
    }
  });

  it("verifies every Problem maps to a valid canonical DSA topic and unique slug", () => {
    for (const problem of problems) {
      expect(
        topicSlugSet.has(problem.topicSlug),
        `Problem '${problem.slug}' maps to invalid topicSlug '${problem.topicSlug}'`
      ).toBe(true);

      const topicMeta = getDsaTopicBySlug(problem.topicSlug);
      expect(topicMeta).toBeDefined();

      const path = getProblemPath(problem.slug);
      expect(path).toBe(`/problems/${problem.slug}`);
    }
  });

  it("verifies all language lessons have unique slugs per track and resolve canonical URLs", () => {
    const tracks = [
      { name: "java", lessons: javaLessons },
      { name: "cpp", lessons: cppLessons },
      { name: "python", lessons: pythonLessons },
      { name: "javascript", lessons: javascriptLessons },
    ];

    for (const { name, lessons } of tracks) {
      const slugs = new Set<string>();
      for (const l of lessons) {
        expect(slugs.has(l.slug), `Duplicate lesson slug '${l.slug}' in track '${name}'`).toBe(false);
        slugs.add(l.slug);

        const path = getLanguageLessonPath(name, l.slug);
        expect(path).toBe(`/languages/${name}/${l.slug}`);
      }
    }
  });

  it("verifies all revision cards have valid IDs and titles", () => {
    const cardIds = new Set<string>();
    for (const card of revisionCards) {
      expect(cardIds.has(card.id), `Duplicate revision card ID: ${card.id}`).toBe(false);
      cardIds.add(card.id);
      expect(card.title.length).toBeGreaterThan(3);
      expect(card.rememberPoints.length).toBeGreaterThan(0);
      expect(card.commonMistakes.length).toBeGreaterThan(0);
      expect(card.importantPatterns.length).toBeGreaterThan(0);
    }
  });
});
