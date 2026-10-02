import { describe, it, expect } from "vitest";
import {
  getHomePath,
  getLearnPath,
  getLanguagesPath,
  getLanguagePath,
  getLanguageLessonPath,
  getDsaPath,
  getDsaTopicPath,
  getDsaLessonPath,
  getProblemsPath,
  getProblemPath,
  getRoadmapPath,
  getRevisionPath,
  getInterviewPath,
  getProfilePath,
  getSearchPath,
  resolveLegacyDsaPath,
} from "@/lib/routes";

describe("Centralized Route Manifest", () => {
  it("generates clean, lowercase, canonical paths with no trailing slashes", () => {
    expect(getHomePath()).toBe("/");
    expect(getLearnPath()).toBe("/learn");
    expect(getLanguagesPath()).toBe("/languages");
    expect(getLanguagePath("java")).toBe("/languages/java");
    expect(getLanguageLessonPath("java", "arrays")).toBe("/languages/java/arrays");
    expect(getDsaPath()).toBe("/dsa");
    expect(getDsaTopicPath("arrays")).toBe("/dsa/arrays");
    expect(getDsaLessonPath("arrays", "two-pointers")).toBe("/dsa/arrays/two-pointers");
    expect(getProblemsPath()).toBe("/problems");
    expect(getProblemPath("two-sum")).toBe("/problems/two-sum");
    expect(getRoadmapPath()).toBe("/roadmap");
    expect(getRevisionPath()).toBe("/revision");
    expect(getInterviewPath()).toBe("/interview");
    expect(getProfilePath()).toBe("/profile");
    expect(getSearchPath()).toBe("/search");
  });

  it("handles case-insensitivity in parameter slugs", () => {
    expect(getLanguagePath("JAVA")).toBe("/languages/java");
    expect(getDsaTopicPath("Binary-Search")).toBe("/dsa/binary-search");
    expect(getDsaLessonPath("ARRAYS", "Two-Pointers")).toBe("/dsa/arrays/two-pointers");
    expect(getProblemPath("Two-Sum")).toBe("/problems/two-sum");
  });

  it("resolves legacy DSA flat routes to new hierarchical paths", () => {
    // Legacy route: /dsa/two-pointers -> /dsa/arrays/two-pointers
    expect(resolveLegacyDsaPath("two-pointers")).toBe("/dsa/arrays/two-pointers");
    expect(resolveLegacyDsaPath("linear-and-binary-search")).toBe("/dsa/searching/linear-and-binary-search");
    expect(resolveLegacyDsaPath("call-stack-and-trees")).toBe("/dsa/recursion/call-stack-and-trees");
    expect(resolveLegacyDsaPath("non-existent-topic")).toBeNull();
  });
});
