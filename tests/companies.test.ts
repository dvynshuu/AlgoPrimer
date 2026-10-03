import { describe, it, expect } from "vitest";
import { getAllCompanies, getCompanyBySlug, getProblemsForCompany } from "@/content/companies";
import { getCompanyPath, getCompaniesPath } from "@/lib/routes";

describe("High-Intent Company Pages Integrity", () => {
  const companies = getAllCompanies();

  it("verifies companies list is non-empty and has unique slugs", () => {
    expect(companies.length).toBeGreaterThanOrEqual(10);
    const slugs = new Set<string>();

    for (const company of companies) {
      expect(slugs.has(company.slug), `Duplicate company slug: ${company.slug}`).toBe(false);
      slugs.add(company.slug);
      expect(company.slug).toMatch(/^[a-z0-9-]+$/);
      expect(company.name.length).toBeGreaterThan(0);
      expect(company.overview.length).toBeGreaterThan(20);
      expect(company.keyPatterns.length).toBeGreaterThan(0);
      expect(company.tips.length).toBeGreaterThan(0);
      expect(company.hiringProcess.rounds.length).toBeGreaterThan(0);
    }
  });

  it("verifies getCompanyBySlug resolves correctly", () => {
    const amazon = getCompanyBySlug("amazon");
    expect(amazon).toBeDefined();
    expect(amazon?.name).toBe("Amazon");

    const google = getCompanyBySlug("google");
    expect(google).toBeDefined();
    expect(google?.name).toBe("Google");

    const nonExistent = getCompanyBySlug("non-existent-corp");
    expect(nonExistent).toBeUndefined();
  });

  it("verifies every company has mapped curated problems", () => {
    for (const company of companies) {
      const companyProblems = getProblemsForCompany(company.name);
      expect(
        companyProblems.length,
        `Company ${company.name} should have curated problems`
      ).toBeGreaterThan(0);
    }
  });

  it("verifies route helper returns canonical paths", () => {
    expect(getCompaniesPath()).toBe("/companies");
    expect(getCompanyPath("amazon")).toBe("/companies/amazon");
    expect(getCompanyPath("google")).toBe("/companies/google");
  });
});
