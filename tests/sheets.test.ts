import { describe, it, expect } from "vitest";
import { getAllSheets, getSheetBySlug } from "@/content/sheets";
import { getSheetsPath, getSheetPath } from "@/lib/routes";

describe("High-Intent Curated Sheets Integrity", () => {
  const sheets = getAllSheets();

  it("verifies all curated sheets have unique slugs and categories", () => {
    expect(sheets.length).toBeGreaterThanOrEqual(2);
    const slugs = new Set<string>();

    for (const sheet of sheets) {
      expect(slugs.has(sheet.slug), `Duplicate sheet slug: ${sheet.slug}`).toBe(false);
      slugs.add(sheet.slug);
      expect(sheet.title.length).toBeGreaterThan(0);
      expect(sheet.description.length).toBeGreaterThan(20);
      expect(sheet.categories.length).toBeGreaterThan(0);
      expect(sheet.faqs.length).toBeGreaterThan(0);

      const allSheetProblems = sheet.categories.flatMap((c) => c.problems);
      expect(allSheetProblems.length, `Sheet ${sheet.slug} has no problems`).toBeGreaterThan(0);

      // Verify NO category is empty
      for (const cat of sheet.categories) {
        expect(
          cat.problems.length,
          `Sheet ${sheet.slug} category "${cat.title}" has 0 problems`
        ).toBeGreaterThan(0);
      }
    }
  });

  it("verifies Blind 75 sheet contains core problem categories", () => {
    const blind75 = getSheetBySlug("blind-75");
    expect(blind75).toBeDefined();
    expect(blind75?.title).toContain("Blind 75");

    const categoryTitles = blind75?.categories.map((c) => c.title) || [];
    expect(categoryTitles).toContain("Arrays & Two Pointers");
    expect(categoryTitles).toContain("Trees & Binary Search Trees");
    expect(categoryTitles).toContain("Dynamic Programming & Optimization");
  });

  it("verifies Top 50 FAANG sheet resolves correctly", () => {
    const faang = getSheetBySlug("top-50-faang");
    expect(faang).toBeDefined();
    expect(faang?.title).toContain("Top 50 FAANG");
    expect(faang?.totalProblems).toBe(50);
  });

  it("verifies route helpers return canonical paths", () => {
    expect(getSheetsPath()).toBe("/sheets");
    expect(getSheetPath("blind-75")).toBe("/sheets/blind-75");
    expect(getSheetPath("top-50-faang")).toBe("/sheets/top-50-faang");
  });
});
