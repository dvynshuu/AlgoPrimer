import { MetadataRoute } from "next";
import { javaLessons } from "@/content/languages/java";
import { cppLessons } from "@/content/languages/cpp";
import { pythonLessons } from "@/content/languages/python";
import { javascriptLessons } from "@/content/languages/javascript";
import { dsaTopics } from "@/content/dsa/topics";
import { dsaLessons } from "@/content/dsa/lessons";
import { problems } from "@/content/problems";
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
} from "@/lib/routes";
import { getCanonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: getCanonicalUrl(getHomePath()), changeFrequency: "daily", priority: 1.0 },
    { url: getCanonicalUrl(getLearnPath()), changeFrequency: "weekly", priority: 0.9 },
    { url: getCanonicalUrl(getLanguagesPath()), changeFrequency: "weekly", priority: 0.9 },
    { url: getCanonicalUrl(getLanguagePath("java")), changeFrequency: "weekly", priority: 0.8 },
    { url: getCanonicalUrl(getLanguagePath("cpp")), changeFrequency: "weekly", priority: 0.8 },
    { url: getCanonicalUrl(getLanguagePath("python")), changeFrequency: "weekly", priority: 0.8 },
    { url: getCanonicalUrl(getLanguagePath("javascript")), changeFrequency: "weekly", priority: 0.8 },
    { url: getCanonicalUrl(getDsaPath()), changeFrequency: "weekly", priority: 0.9 },
    { url: getCanonicalUrl(getProblemsPath()), changeFrequency: "daily", priority: 0.9 },
    { url: getCanonicalUrl(getRoadmapPath()), changeFrequency: "monthly", priority: 0.8 },
    { url: getCanonicalUrl(getRevisionPath()), changeFrequency: "weekly", priority: 0.8 },
    { url: getCanonicalUrl(getInterviewPath()), changeFrequency: "monthly", priority: 0.8 },
  ];

  const javaUrls: MetadataRoute.Sitemap = javaLessons.map((l) => ({
    url: getCanonicalUrl(getLanguageLessonPath("java", l.slug)),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const cppUrls: MetadataRoute.Sitemap = cppLessons.map((l) => ({
    url: getCanonicalUrl(getLanguageLessonPath("cpp", l.slug)),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const pythonUrls: MetadataRoute.Sitemap = pythonLessons.map((l) => ({
    url: getCanonicalUrl(getLanguageLessonPath("python", l.slug)),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const javascriptUrls: MetadataRoute.Sitemap = javascriptLessons.map((l) => ({
    url: getCanonicalUrl(getLanguageLessonPath("javascript", l.slug)),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const dsaTopicUrls: MetadataRoute.Sitemap = dsaTopics.map((t) => ({
    url: getCanonicalUrl(getDsaTopicPath(t.slug)),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const dsaLessonUrls: MetadataRoute.Sitemap = dsaLessons.map((l) => ({
    url: getCanonicalUrl(getDsaLessonPath(l.topicSlug, l.slug)),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const problemUrls: MetadataRoute.Sitemap = problems.map((p) => ({
    url: getCanonicalUrl(getProblemPath(p.slug)),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...javaUrls,
    ...cppUrls,
    ...pythonUrls,
    ...javascriptUrls,
    ...dsaTopicUrls,
    ...dsaLessonUrls,
    ...problemUrls,
  ];
}
