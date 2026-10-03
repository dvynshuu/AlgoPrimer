import type { Metadata } from "next";
import type { TopicMetadata, Lesson, Problem } from "@/types/content";
import {
  getDsaTopicPath,
  getDsaLessonPath,
  getLanguagePath,
  getLanguageLessonPath,
  getProblemPath,
  BreadcrumbItem,
} from "./routes";

export const SITE_NAME = "AlgoPrimer";
export const SITE_TAGLINE = "Programming, DSA & Coding Interview Preparation";
export const DEFAULT_DESCRIPTION =
  "Teach programming and problem solving from first principles, then progressively move users toward technical interview readiness. Free, fast, and developer-native.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://algoprimer.com";

export const GOOGLE_SITE_VERIFICATION = "C7RGjFrYsUnM3ckmCj77KPP_s_VpjPo2n4zD59DUCFM";

export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath === "/" ? "" : cleanPath.replace(/\/$/, "")}`;
}

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = getCanonicalUrl(path);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords || [
      "programming",
      "data structures",
      "algorithms",
      "coding interview",
      "software engineer",
      "Java",
      "C++",
      "Python",
      "JavaScript",
      "DSA roadmap",
    ],
    authors: [{ name: `${SITE_NAME} Editorial Team` }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    verification: {
      google: GOOGLE_SITE_VERIFICATION,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export function createDsaTopicMetadata(topic: TopicMetadata): Metadata {
  const path = getDsaTopicPath(topic.slug);
  return createPageMetadata({
    title: `${topic.title} in DSA — Concepts, Patterns & Problems`,
    description: `Master ${topic.title} from first principles. Explores ${topic.description.toLowerCase()} with pedagogical progression and interview practice.`,
    path,
    keywords: [
      topic.title,
      `${topic.title} DSA`,
      `${topic.title} tutorial`,
      `${topic.title} data structure`,
      `${topic.title} coding interview`,
      "data structures and algorithms",
      "interview preparation",
      "DSA roadmap 2026",
    ],
  });
}

export function createDsaLessonMetadata(topic: TopicMetadata, lesson: Lesson): Metadata {
  const path = getDsaLessonPath(topic.slug, lesson.slug);
  return createPageMetadata({
    title: `${lesson.title} — ${topic.title}`,
    description: lesson.oneSentence,
    path,
    keywords: [
      lesson.title,
      topic.title,
      "DSA lesson",
      "coding interview",
      "time complexity",
      "data structures and algorithms",
    ],
  });
}

export function createProblemMetadata(problem: Problem): Metadata {
  const path = getProblemPath(problem.slug);
  const companyKeywords = problem.companies
    ? problem.companies.map((c) => `${c} coding interview`)
    : [];

  return createPageMetadata({
    title: `${problem.title} Solution (${problem.pattern}) — Java, C++, Python, JS`,
    description: `Step-by-step 3-tier solution (Brute Force, Better, Optimal) for ${problem.title} in Java, C++, Python, and JavaScript with complete dry runs and complexity bounds.`,
    path,
    keywords: [
      problem.title,
      `${problem.title} solution`,
      `${problem.title} leetcode`,
      `${problem.title} python`,
      `${problem.title} java`,
      `${problem.title} c++`,
      `${problem.title} javascript`,
      problem.pattern,
      `${problem.pattern} pattern`,
      problem.topic,
      "coding interview problem",
      ...companyKeywords,
      ...(problem.companies || []),
    ],
  });
}

export function createLanguageMetadata(langName: string, langSlug: string, desc: string): Metadata {
  const path = getLanguagePath(langSlug);
  return createPageMetadata({
    title: `${langName} Programming Curriculum — Syntax, Memory & Standard Library`,
    description: desc,
    path,
    keywords: [
      `${langName} programming`,
      `learn ${langName}`,
      `${langName} for DSA`,
      `${langName} interview questions`,
      `${langName} standard library`,
      `${langName} cheat sheet`,
    ],
  });
}

export function createLanguageLessonMetadata(
  langName: string,
  langSlug: string,
  lesson: Lesson
): Metadata {
  const path = getLanguageLessonPath(langSlug, lesson.slug);
  return createPageMetadata({
    title: `${lesson.title} — ${langName} Foundations`,
    description: lesson.oneSentence,
    path,
    keywords: [
      lesson.title,
      langName,
      `${langName} tutorial`,
      "programming fundamentals",
      `${langName} interview prep`,
    ],
  });
}

// -------------------------------------------------------------
// JSON-LD Structured Data
// -------------------------------------------------------------

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: DEFAULT_DESCRIPTION,
    sameAs: [
      "https://github.com/algoprimer",
      "https://twitter.com/algoprimer",
    ],
  };
}

export function createWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? getCanonicalUrl(item.href) : undefined,
    })),
  };
}

export function createTechArticleJsonLd({
  headline,
  description,
  path,
  datePublished = "2026-01-01T00:00:00Z",
}: {
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    url: getCanonicalUrl(path),
    datePublished,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
  };
}

export function createFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function createProblemJsonLd(problem: Problem) {
  const url = getCanonicalUrl(getProblemPath(problem.slug));
  const mistakesSummary = problem.commonMistakes
    ?.map((m) => `${m.mistake} (Fix: ${m.fix})`)
    .join("; ") || "";

  const faqs = [
    {
      question: `What is the optimal time and space complexity for ${problem.title}?`,
      answer: `The optimal solution for ${problem.title} runs in ${problem.optimalSolution.timeComplexity} time complexity and ${problem.optimalSolution.spaceComplexity} auxiliary space. ${problem.optimalSolution.whyOptimal}`,
    },
    {
      question: `Which algorithmic pattern solves ${problem.title}?`,
      answer: `${problem.title} is solved using the ${problem.pattern} pattern in ${problem.topic}. Key intuition: ${problem.optimalSolution.intuition}`,
    },
    ...(mistakesSummary
      ? [
          {
            question: `What are common pitfalls when implementing ${problem.title}?`,
            answer: mistakesSummary,
          },
        ]
      : []),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        headline: `${problem.title} Solution (${problem.pattern})`,
        description: `Complete step-by-step 3-tier solution for ${problem.title} in Java, C++, Python, and JavaScript with dry runs and complexity analysis.`,
        url,
        inLanguage: "en",
        author: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logo.svg`,
          },
        },
        about: [
          { "@type": "Thing", name: problem.topic },
          { "@type": "Thing", name: problem.pattern },
          ...(problem.companies || []).map((c) => ({ "@type": "Thing", name: c })),
        ],
      },
      {
        "@type": "Question",
        "@id": `${url}#question`,
        name: `${problem.title} — Technical Interview Problem`,
        text: problem.statement,
        answerCount: problem.betterSolution ? 3 : 2,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Optimal Solution (${problem.optimalSolution.timeComplexity} time, ${problem.optimalSolution.spaceComplexity} space): ${problem.optimalSolution.whyOptimal || ""}. Intuition: ${problem.optimalSolution.intuition}`,
          url: `${url}#approach-3-optimal`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
    ],
  };
}

export function createCourseJsonLd({
  name,
  description,
  path,
  courseCode,
}: {
  name: string;
  description: string;
  path: string;
  courseCode?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    courseCode: courseCode || name.toLowerCase().replace(/\s+/g, "-"),
    url: getCanonicalUrl(path),
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    educationalCredentialAwarded: "Interview Readiness Certification",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "Self-paced",
    },
  };
}

export function createItemListJsonLd({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string; description?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    url: getCanonicalUrl(path),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      description: item.description,
      url: getCanonicalUrl(item.path),
    })),
  };
}
