import { describe, it, expect } from "vitest";
import { searchContent, buildSearchIndex } from "@/lib/search/searchIndex";

describe("Global Search Indexing Engine", () => {
  it("builds an index spanning languages, DSA, problems, and revision cards", () => {
    const index = buildSearchIndex();
    expect(index.length).toBeGreaterThan(15);

    const categories = new Set(index.map((i) => i.category));
    expect(categories.has("Language")).toBe(true);
    expect(categories.has("DSA Topic")).toBe(true);
    expect(categories.has("DSA Lesson")).toBe(true);
    expect(categories.has("Problem")).toBe(true);
    expect(categories.has("Revision")).toBe(true);
    expect(categories.has("Interview")).toBe(true);
  });

  it("finds Two Sum when searching for 'Two Sum'", () => {
    const results = searchContent("Two Sum");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toBe("Two Sum");
    expect(results[0].category).toBe("Problem");
  });

  it("finds relevant items across categories when searching for 'arrays'", () => {
    const results = searchContent("arrays");
    expect(results.length).toBeGreaterThan(2);

    const hasProblem = results.some((r) => r.category === "Problem");
    const hasLesson = results.some((r) => r.category === "DSA Lesson" || r.category === "Language");
    expect(hasProblem).toBe(true);
    expect(hasLesson).toBe(true);
  });

  it("returns empty array for non-matching nonsense query", () => {
    const results = searchContent("xyzabc123499impossiblematch");
    expect(results.length).toBe(0);
  });

  it("finds problems tagged with company names when searching for that company", () => {
    const results = searchContent("Amazon");
    expect(results.length).toBeGreaterThan(0);
    const hasAmazonProblem = results.some((r) => r.category === "Problem");
    expect(hasAmazonProblem).toBe(true);

    const goldmanResults = searchContent("Goldman Sachs");
    expect(goldmanResults.length).toBeGreaterThan(0);
    const hasGoldmanProblem = goldmanResults.some((r) => r.category === "Problem");
    expect(hasGoldmanProblem).toBe(true);
  });
});

