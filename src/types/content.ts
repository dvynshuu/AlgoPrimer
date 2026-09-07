import { z } from "zod";

export const CodeByLanguageSchema = z.object({
  java: z.string(),
  cpp: z.string(),
  python: z.string(),
  javascript: z.string().optional(),
});
export type CodeByLanguage = z.infer<typeof CodeByLanguageSchema>;

export const LessonSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  track: z.enum(["java", "cpp", "python", "javascript", "dsa"]),
  topicSlug: z.string(),
  topicTitle: z.string(),
  order: z.number(),
  estimatedMinutes: z.number(),
  oneSentence: z.string(),
  whyDoWeNeedIt: z.object({
    problem: z.string(),
    realWorldAnalogy: z.string(),
  }),
  visualIntuition: z.string(),
  syntax: z.record(z.string(), z.string()),
  example: z.object({
    title: z.string(),
    code: z.string(),
    language: z.string(),
    explanation: z.string(),
  }),
  howItWorks: z.array(
    z.object({
      step: z.number(),
      title: z.string(),
      description: z.string(),
    })
  ),
  commonMistakes: z.array(
    z.object({
      mistake: z.string(),
      why: z.string(),
      correct: z.string(),
    })
  ),
  complexity: z
    .object({
      time: z.string(),
      space: z.string(),
      explanation: z.string(),
    })
    .optional(),
  tryItYourself: z.object({
    prompt: z.string(),
    hint: z.string(),
    solutionSnippet: z.string(),
  }),
  placementConnection: z.string(),
  quickRevision: z.array(z.string()),
});
export type Lesson = z.infer<typeof LessonSchema>;

export const ProblemApproachSchema = z.object({
  title: z.string(),
  intuition: z.string(),
  code: CodeByLanguageSchema,
  timeComplexity: z.string(),
  spaceComplexity: z.string(),
  explanation: z.string().optional(),
  whyOptimal: z.string().optional(),
});
export type ProblemApproach = z.infer<typeof ProblemApproachSchema>;

export const ProblemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  topic: z.string(),
  subtopic: z.string(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  progressionLevel: z.enum([
    "Level 1: Concept Understanding",
    "Level 2: Basic Implementation",
    "Level 3: Pattern Recognition",
    "Level 4: Optimization",
    "Level 5: Interview Variation",
  ]),
  statement: z.string(),
  understandTheProblem: z.string(),
  constraints: z.array(z.string()),
  examples: z.array(
    z.object({
      input: z.string(),
      output: z.string(),
      explanation: z.string(),
    })
  ),
  hints: z.array(z.string()),
  bruteForce: ProblemApproachSchema,
  betterSolution: ProblemApproachSchema.optional(),
  optimalSolution: ProblemApproachSchema,
  pattern: z.string(),
  complexitySummary: z.object({
    time: z.string(),
    space: z.string(),
  }),
  dryRun: z.object({
    sampleInput: z.string(),
    steps: z.array(
      z.object({
        stepNumber: z.number(),
        state: z.string(),
        action: z.string(),
        result: z.string(),
      })
    ),
  }),
  commonMistakes: z.array(
    z.object({
      mistake: z.string(),
      why: z.string().optional(),
      fix: z.string(),
    })
  ),
  variations: z.array(z.string()),
  practice: z.array(
    z.object({
      title: z.string(),
      difficulty: z.enum(["Easy", "Medium", "Hard"]),
      link: z.string().optional(),
    })
  ),
  tags: z.array(z.string()),
  companies: z.array(z.string()).optional(),
});
export type Problem = z.infer<typeof ProblemSchema>;

export const RevisionCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  topic: z.string(),
  category: z.string(),
  rememberPoints: z.array(z.string()),
  commonMistakes: z.array(z.string()),
  importantPatterns: z.array(z.string()),
  codeSnippet: z.string().optional(),
});
export type RevisionCard = z.infer<typeof RevisionCardSchema>;

export interface TopicMetadata {
  id: string;
  slug: string;
  title: string;
  order: number;
  description: string;
  estimatedHours: number;
  levelCount: number;
  prerequisites: string[];
}
