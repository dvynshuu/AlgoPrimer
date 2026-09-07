import { describe, it, expect } from "vitest";

describe("Progress Storage Logic", () => {
  it("stores and parses progress states correctly", () => {
    const memoryStore: Record<string, string> = {};
    const mockStorage = {
      setItem: (k: string, v: string) => {
        memoryStore[k] = v;
      },
      getItem: (k: string) => memoryStore[k] || null,
    };

    const testState = {
      completedLessons: ["java-variables", "java-loops"],
      solvedProblems: ["two-sum", "move-zeroes"],
      attemptedProblems: ["maximum-subarray"],
      bookmarkedItems: ["java-arrays"],
      weakTopics: ["Binary Search"],
      notes: { "two-sum": "Remember Hash Map complement pattern" },
      lastVisited: { title: "Two Sum", url: "/problems/two-sum", timestamp: 123456 },
    };

    mockStorage.setItem("placement_prep_progress_v1", JSON.stringify(testState));
    const retrieved = JSON.parse(mockStorage.getItem("placement_prep_progress_v1") || "{}");

    expect(retrieved.completedLessons).toContain("java-variables");
    expect(retrieved.solvedProblems).toContain("two-sum");
    expect(retrieved.notes["two-sum"]).toBe("Remember Hash Map complement pattern");
  });
});
