import { MetadataRoute } from "next";
import { javaLessons } from "@/content/languages/java";
import { cppLessons } from "@/content/languages/cpp";
import { pythonLessons } from "@/content/languages/python";
import { javascriptLessons } from "@/content/languages/javascript";
import { dsaTopics } from "@/content/dsa/topics";
import { problems } from "@/content/problems";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://campusprep.dev";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/learn`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/languages`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/languages/java`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/languages/cpp`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/languages/python`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/languages/javascript`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/dsa`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/problems`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/roadmap`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/revision`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/interview`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
  ];

  const javaUrls: MetadataRoute.Sitemap = javaLessons.map((l) => ({
    url: `${baseUrl}/languages/java/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const cppUrls: MetadataRoute.Sitemap = cppLessons.map((l) => ({
    url: `${baseUrl}/languages/cpp/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const pythonUrls: MetadataRoute.Sitemap = pythonLessons.map((l) => ({
    url: `${baseUrl}/languages/python/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const javascriptUrls: MetadataRoute.Sitemap = javascriptLessons.map((l) => ({
    url: `${baseUrl}/languages/javascript/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const dsaUrls: MetadataRoute.Sitemap = dsaTopics.map((t) => ({
    url: `${baseUrl}/dsa/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const problemUrls: MetadataRoute.Sitemap = problems.map((p) => ({
    url: `${baseUrl}/problems/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...javaUrls, ...cppUrls, ...pythonUrls, ...javascriptUrls, ...dsaUrls, ...problemUrls];
}
