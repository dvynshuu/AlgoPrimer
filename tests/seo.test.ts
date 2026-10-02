import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import {
  SITE_NAME,
  SITE_URL,
  createPageMetadata,
  createBreadcrumbJsonLd,
  createTechArticleJsonLd,
  createWebSiteJsonLd,
} from "@/lib/seo";

describe("SEO & Sitemap Architecture", () => {
  it("enforces canonical domain https://algoprimer.com", () => {
    expect(SITE_URL).toBe("https://algoprimer.com");
    expect(SITE_NAME).toBe("AlgoPrimer");
  });

  it("creates page metadata with canonical URLs and OpenGraph", () => {
    const meta = createPageMetadata({
      title: "Test Page",
      description: "Test Description",
      path: "/dsa",
    });
    expect(meta.title).toBe("Test Page | AlgoPrimer");
    expect(meta.description).toBe("Test Description");
    expect(meta.alternates?.canonical).toBe("https://algoprimer.com/dsa");
  });

  it("generates a canonical, complete sitemap", () => {
    const map = sitemap();
    expect(map.length).toBeGreaterThan(200);

    // Verify root & hub pages
    const urls = map.map((entry) => entry.url);
    expect(urls).toContain("https://algoprimer.com");
    expect(urls).toContain("https://algoprimer.com/dsa");
    expect(urls).toContain("https://algoprimer.com/problems");
    expect(urls).toContain("https://algoprimer.com/languages");
    expect(urls).toContain("https://algoprimer.com/roadmap");
    expect(urls).toContain("https://algoprimer.com/revision");
    expect(urls).toContain("https://algoprimer.com/interview");

    // Verify canonical DSA topic and lesson paths
    expect(urls).toContain("https://algoprimer.com/dsa/arrays");
    expect(urls).toContain("https://algoprimer.com/dsa/arrays/two-pointers");
    expect(urls).toContain("https://algoprimer.com/dsa/binary-search/patterns");

    // Verify language lesson paths
    expect(urls).toContain("https://algoprimer.com/languages/java/arrays");
    expect(urls).toContain("https://algoprimer.com/languages/javascript/closures");

    // Verify problem paths
    expect(urls).toContain("https://algoprimer.com/problems/two-sum");

    // Verify excluded private/utility pages
    expect(urls).not.toContain("https://algoprimer.com/search");
    expect(urls).not.toContain("https://algoprimer.com/profile");

    // Verify no entries have artificial lastModified timestamps
    for (const entry of map) {
      expect(entry.lastModified).toBeUndefined();
    }
  });

  it("configures robots.txt properly", () => {
    const r = robots();
    expect(r.sitemap).toBe("https://algoprimer.com/sitemap.xml");

    const rules = Array.isArray(r.rules) ? r.rules[0] : r.rules;
    expect(rules.disallow).toContain("/search");
    expect(rules.disallow).toContain("/profile");
  });

  it("creates valid JSON-LD schemas", () => {
    const websiteLd = createWebSiteJsonLd();
    expect(websiteLd["@context"]).toBe("https://schema.org");
    expect(websiteLd["@type"]).toBe("WebSite");
    expect(websiteLd.name).toBe("AlgoPrimer");

    const breadcrumbLd = createBreadcrumbJsonLd([
      { label: "Home", href: "/" },
      { label: "DSA", href: "/dsa" },
      { label: "Arrays" },
    ]);
    expect(breadcrumbLd["@type"]).toBe("BreadcrumbList");
    expect(breadcrumbLd.itemListElement).toHaveLength(3);
    expect(breadcrumbLd.itemListElement[0].name).toBe("Home");
    expect(breadcrumbLd.itemListElement[0].item).toBe("https://algoprimer.com");
    expect(breadcrumbLd.itemListElement[2].name).toBe("Arrays");
    expect(breadcrumbLd.itemListElement[2].item).toBeUndefined();

    const techArticleLd = createTechArticleJsonLd({
      headline: "Two Pointers Technique",
      description: "Learn two pointers",
      path: "/dsa/arrays/two-pointers",
    });
    expect(techArticleLd["@type"]).toBe("TechArticle");
    expect(techArticleLd.url).toBe("https://algoprimer.com/dsa/arrays/two-pointers");
  });
});
