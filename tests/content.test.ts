import { describe, it, expect } from "vitest";
import { javaLessons } from "@/content/languages/java";
import { cppLessons } from "@/content/languages/cpp";
import { pythonLessons } from "@/content/languages/python";
import { javascriptLessons } from "@/content/languages/javascript";
import { dsaLessons } from "@/content/dsa/lessons";
import { dsaTopics } from "@/content/dsa/topics";
import { problems } from "@/content/problems";
import { revisionCards } from "@/content/revision";
import { LessonSchema, ProblemSchema, RevisionCardSchema } from "@/types/content";

describe("Curriculum Content Integrity", () => {
  it("validates all Java lessons against LessonSchema", () => {
    expect(javaLessons.length).toBeGreaterThanOrEqual(4);
    for (const lesson of javaLessons) {
      const parsed = LessonSchema.safeParse(lesson);
      expect(parsed.success, `Java lesson ${lesson.id} failed validation: ${parsed.error?.message}`).toBe(true);
      expect(lesson.howItWorks.length).toBeGreaterThan(0);
      expect(lesson.commonMistakes.length).toBeGreaterThan(0);
      expect(lesson.quickRevision.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("validates all C++ lessons against LessonSchema", () => {
    expect(cppLessons.length).toBeGreaterThanOrEqual(3);
    for (const lesson of cppLessons) {
      const parsed = LessonSchema.safeParse(lesson);
      expect(parsed.success, `C++ lesson ${lesson.id} failed validation: ${parsed.error?.message}`).toBe(true);
    }
  });

  it("validates all Python lessons against LessonSchema", () => {
    expect(pythonLessons.length).toBeGreaterThanOrEqual(3);
    for (const lesson of pythonLessons) {
      const parsed = LessonSchema.safeParse(lesson);
      expect(parsed.success, `Python lesson ${lesson.id} failed validation: ${parsed.error?.message}`).toBe(true);
    }
  });

  it("validates all JavaScript lessons against LessonSchema with all 11-step requirements", () => {
    expect(javascriptLessons.length).toBe(25);
    for (const lesson of javascriptLessons) {
      const parsed = LessonSchema.safeParse(lesson);
      expect(parsed.success, `JavaScript lesson ${lesson.id} failed validation: ${parsed.error?.message}`).toBe(true);
      expect(lesson.howItWorks.length).toBeGreaterThan(0);
      expect(lesson.commonMistakes.length).toBeGreaterThan(0);
      expect(lesson.quickRevision.length).toBeGreaterThanOrEqual(3);
      expect(lesson.example.code.length).toBeGreaterThan(0);
      expect(lesson.whyDoWeNeedIt.problem.length).toBeGreaterThan(0);
      expect(lesson.tryItYourself.solutionSnippet.length).toBeGreaterThan(0);
    }
  });

  it("validates all DSA lessons against LessonSchema with all pedagogical requirements", () => {
    expect(dsaLessons.length).toBeGreaterThanOrEqual(20);
    for (const lesson of dsaLessons) {
      const parsed = LessonSchema.safeParse(lesson);
      expect(parsed.success, `DSA lesson ${lesson.id} failed validation: ${parsed.error?.message}`).toBe(true);
      expect(lesson.howItWorks.length).toBeGreaterThan(0);
      expect(lesson.commonMistakes.length).toBeGreaterThan(0);
      expect(lesson.quickRevision.length).toBeGreaterThanOrEqual(3);
      expect(lesson.whyDoWeNeedIt.problem.length).toBeGreaterThan(0);
      expect(lesson.tryItYourself.solutionSnippet.length).toBeGreaterThan(0);
    }
  });

  it("ensures every topic in the 20-topic DSA roadmap has an implemented lesson", () => {
    expect(dsaTopics.length).toBe(20);
    const lessonSlugs = new Set(dsaLessons.map((l) => l.slug));
    for (const topic of dsaTopics) {
      expect(lessonSlugs.has(topic.slug), `Missing DSA lesson for topic slug: ${topic.slug}`).toBe(true);
    }
  });

  it("validates all high-yield revision cards against RevisionCardSchema", () => {
    expect(revisionCards.length).toBeGreaterThanOrEqual(15);
    for (const card of revisionCards) {
      const parsed = RevisionCardSchema.safeParse(card);
      expect(parsed.success, `Revision card ${card.id} failed validation: ${parsed.error?.message}`).toBe(true);
      expect(card.rememberPoints.length).toBeGreaterThanOrEqual(3);
      expect(card.commonMistakes.length).toBeGreaterThanOrEqual(2);
      expect(card.importantPatterns.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("validates all 65 curated company problems have Brute Force and Optimal solutions in Java, C++, Python, and JavaScript with company tags", () => {
    expect(problems.length).toBe(65);



    for (const prob of problems) {
      const parsed = ProblemSchema.safeParse(prob);
      expect(parsed.success, `Problem ${prob.id} failed validation: ${parsed.error?.message}`).toBe(true);

      // Verify company tags exist
      expect(prob.companies, `Problem ${prob.id} is missing company tags`).toBeDefined();
      expect(prob.companies!.length, `Problem ${prob.id} has empty company tags`).toBeGreaterThan(0);

      // Verify all 4 languages are implemented in brute force
      expect(prob.bruteForce.code.java.trim().length).toBeGreaterThan(0);
      expect(prob.bruteForce.code.cpp.trim().length).toBeGreaterThan(0);
      expect(prob.bruteForce.code.python.trim().length).toBeGreaterThan(0);
      expect(prob.bruteForce.code.javascript, `Problem ${prob.id} bruteForce missing JS`).toBeDefined();
      expect(prob.bruteForce.code.javascript!.trim().length).toBeGreaterThan(0);

      // Verify all 4 languages are implemented in optimal solution
      expect(prob.optimalSolution.code.java.trim().length).toBeGreaterThan(0);
      expect(prob.optimalSolution.code.cpp.trim().length).toBeGreaterThan(0);
      expect(prob.optimalSolution.code.python.trim().length).toBeGreaterThan(0);
      expect(prob.optimalSolution.code.javascript, `Problem ${prob.id} optimalSolution missing JS`).toBeDefined();
      expect(prob.optimalSolution.code.javascript!.trim().length).toBeGreaterThan(0);

      // Verify step-by-step dry run exists
      expect(prob.dryRun.steps.length).toBeGreaterThan(0);
      expect(prob.dryRun.sampleInput.length).toBeGreaterThan(0);
    }
  });
});
