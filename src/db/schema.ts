import {
  pgTable,
  text,
  varchar,
  timestamp,
  integer,
  boolean,
  jsonb,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

// 1. Users table (Supabase Auth reference)
export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 2. Profiles table
export const profiles = pgTable(
  "profiles",
  {
    userId: varchar("user_id", { length: 36 })
      .primaryKey()
      .references(() => users.id, { onDelete: "cascade" }),
    fullName: text("full_name"),
    collegeName: text("college_name"),
    graduationYear: integer("graduation_year"),
    targetRole: text("target_role"),
    preferredLanguage: varchar("preferred_language", { length: 20 }).default("java"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);

// 3. Courses / Tracks table (e.g. Java Track, DSA Track)
export const courses = pgTable("courses", {
  id: varchar("id", { length: 50 }).primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  order: integer("order").notNull().default(0),
  isPublished: boolean("is_published").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 4. Modules table (e.g. Foundations, OOP, Collections)
export const modules = pgTable(
  "modules",
  {
    id: varchar("id", { length: 50 }).primaryKey(),
    courseId: varchar("course_id", { length: 50 })
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    order: integer("order").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("modules_course_order_idx").on(table.courseId, table.order)]
);

// 5. Topics table (e.g. Variables, Arrays, Two Pointers)
export const topics = pgTable(
  "topics",
  {
    id: varchar("id", { length: 50 }).primaryKey(),
    moduleId: varchar("module_id", { length: 50 })
      .notNull()
      .references(() => modules.id, { onDelete: "cascade" }),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    title: text("title").notNull(),
    description: text("description"),
    order: integer("order").notNull().default(0),
    estimatedMinutes: integer("estimated_minutes").default(30),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("topics_module_order_idx").on(table.moduleId, table.order)]
);

// 6. Lessons table
export const lessons = pgTable(
  "lessons",
  {
    id: varchar("id", { length: 50 }).primaryKey(),
    topicId: varchar("topic_id", { length: 50 })
      .notNull()
      .references(() => topics.id, { onDelete: "cascade" }),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    title: text("title").notNull(),
    oneSentence: text("one_sentence").notNull(),
    order: integer("order").notNull().default(0),
    content: jsonb("content").notNull(), // structured pedagogical blocks
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("lessons_topic_order_idx").on(table.topicId, table.order)]
);

// 7. Problems table
export const problems = pgTable(
  "problems",
  {
    id: varchar("id", { length: 50 }).primaryKey(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    title: text("title").notNull(),
    topic: varchar("topic", { length: 50 }).notNull(),
    subtopic: varchar("subtopic", { length: 50 }),
    difficulty: varchar("difficulty", { length: 20 }).notNull(), // Easy, Medium, Hard
    progressionLevel: varchar("progression_level", { length: 50 }), // Level 1 to 5
    statement: text("statement").notNull(),
    understandTheProblem: text("understand_the_problem"),
    constraints: jsonb("constraints"),
    pattern: varchar("pattern", { length: 50 }),
    order: integer("order").default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("problems_topic_idx").on(table.topic),
    index("problems_difficulty_idx").on(table.difficulty),
    index("problems_pattern_idx").on(table.pattern),
  ]
);

// 8. Problem Solutions table (Brute Force, Better, Optimal)
export const problemSolutions = pgTable(
  "problem_solutions",
  {
    id: varchar("id", { length: 50 }).primaryKey(),
    problemId: varchar("problem_id", { length: 50 })
      .notNull()
      .references(() => problems.id, { onDelete: "cascade" }),
    approachType: varchar("approach_type", { length: 20 }).notNull(), // bruteForce, better, optimal
    title: text("title").notNull(),
    intuition: text("intuition").notNull(),
    codeJava: text("code_java"),
    codeCpp: text("code_cpp"),
    codePython: text("code_python"),
    timeComplexity: varchar("time_complexity", { length: 50 }),
    spaceComplexity: varchar("space_complexity", { length: 50 }),
    explanation: text("explanation"),
    order: integer("order").default(0),
  },
  (table) => [index("solutions_problem_idx").on(table.problemId)]
);

// 9. Problem Attempts table
export const problemAttempts = pgTable(
  "problem_attempts",
  {
    id: varchar("id", { length: 50 }).primaryKey(),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    problemId: varchar("problem_id", { length: 50 })
      .notNull()
      .references(() => problems.id, { onDelete: "cascade" }),
    status: varchar("status", { length: 20 }).notNull(), // attempted, solved
    languageUsed: varchar("language_used", { length: 20 }),
    codeSubmitted: text("code_submitted"),
    attemptedAt: timestamp("attempted_at").defaultNow().notNull(),
  },
  (table) => [
    index("attempts_user_problem_idx").on(table.userId, table.problemId),
    index("attempts_status_idx").on(table.status),
  ]
);

// 10. User Progress table
export const userProgress = pgTable(
  "user_progress",
  {
    id: varchar("id", { length: 50 }).primaryKey(),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonId: varchar("lesson_id", { length: 50 })
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    status: varchar("status", { length: 20 }).notNull(), // in_progress, completed
    completedAt: timestamp("completed_at"),
    lastAccessedAt: timestamp("last_accessed_at").defaultNow().notNull(),
  },
  (table) => [index("user_progress_user_lesson_idx").on(table.userId, table.lessonId)]
);

// 11. Bookmarks table
export const bookmarks = pgTable(
  "bookmarks",
  {
    id: varchar("id", { length: 50 }).primaryKey(),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    itemType: varchar("item_type", { length: 20 }).notNull(), // lesson, problem, revision
    itemId: varchar("item_id", { length: 50 }).notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("bookmarks_user_item_idx").on(table.userId, table.itemType, table.itemId)]
);

// 12. Revision Items table
export const revisionItems = pgTable(
  "revision_items",
  {
    id: varchar("id", { length: 50 }).primaryKey(),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    topic: varchar("topic", { length: 50 }).notNull(),
    cardTitle: text("card_title").notNull(),
    confidenceLevel: integer("confidence_level").default(1), // 1 to 5
    nextRevisionDue: timestamp("next_revision_due"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("revision_user_due_idx").on(table.userId, table.nextRevisionDue)]
);

// 13. Tags table
export const tags = pgTable("tags", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  category: varchar("category", { length: 50 }),
});

// 14. Topic Tags (many-to-many)
export const topicTags = pgTable(
  "topic_tags",
  {
    topicId: varchar("topic_id", { length: 50 })
      .notNull()
      .references(() => topics.id, { onDelete: "cascade" }),
    tagId: varchar("tag_id", { length: 50 })
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.topicId, table.tagId] })]
);

// 15. Problem Tags (many-to-many)
export const problemTags = pgTable(
  "problem_tags",
  {
    problemId: varchar("problem_id", { length: 50 })
      .notNull()
      .references(() => problems.id, { onDelete: "cascade" }),
    tagId: varchar("tag_id", { length: 50 })
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.problemId, table.tagId] })]
);
