import { describe, it, expect } from "vitest";
import { ProgressStateSchema, INITIAL_STATE } from "@/lib/progress/ProgressContext";

describe("Progress Storage & Schema Validation", () => {
  it("defaults initial state with no fabricated weak topics", () => {
    expect(INITIAL_STATE.weakTopics).toEqual([]);
    expect(INITIAL_STATE.completedLessons).toEqual([]);
    expect(INITIAL_STATE.solvedProblems).toEqual([]);
    expect(INITIAL_STATE.lastVisited).toBeNull();
  });

  it("successfully validates and parses valid state", () => {
    const raw = {
      completedLessons: ["java-variables", "java-loops"],
      solvedProblems: ["two-sum", "move-zeroes"],
      attemptedProblems: ["maximum-subarray"],
      bookmarkedItems: ["java-arrays"],
      weakTopics: [],
      notes: { "two-sum": "Remember Hash Map complement pattern" },
      lastVisited: { title: "Two Sum", url: "/problems/two-sum", timestamp: 123456 },
    };

    const parsed = ProgressStateSchema.safeParse(raw);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.completedLessons).toHaveLength(2);
      expect(parsed.data.solvedProblems).toContain("two-sum");
      expect(parsed.data.notes["two-sum"]).toBe("Remember Hash Map complement pattern");
    }
  });

  it("gracefully falls back when corrupted data is encountered", () => {
    const corrupted = {
      completedLessons: "not-an-array",
      solvedProblems: 12345,
      weakTopics: null,
    };

    const parsed = ProgressStateSchema.safeParse(corrupted);
    expect(parsed.success).toBe(false);
  });
});
