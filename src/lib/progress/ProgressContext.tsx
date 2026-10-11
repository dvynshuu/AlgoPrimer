"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { z } from "zod";

export const LastVisitedSchema = z.object({
  title: z.string(),
  url: z.string(),
  timestamp: z.number(),
});
export type LastVisited = z.infer<typeof LastVisitedSchema>;

export const ProgressStateSchema = z.object({
  completedLessons: z.array(z.string()).default([]),
  solvedProblems: z.array(z.string()).default([]),
  attemptedProblems: z.array(z.string()).default([]),
  bookmarkedItems: z.array(z.string()).default([]),
  weakTopics: z.array(z.string()).default([]),
  notes: z.record(z.string(), z.string()).default({}),
  lastVisited: LastVisitedSchema.nullable().default(null),
});
export type ProgressState = z.infer<typeof ProgressStateSchema>;

interface ProgressContextValue extends ProgressState {
  isLoaded: boolean;
  toggleLessonCompleted: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  markProblemSolved: (problemId: string) => void;
  markProblemAttempted: (problemId: string) => void;
  isProblemSolved: (problemId: string) => boolean;
  toggleBookmark: (itemId: string) => void;
  isBookmarked: (itemId: string) => boolean;
  toggleWeakTopic: (topic: string) => void;
  isWeakTopic: (topic: string) => boolean;
  saveNote: (itemId: string, note: string) => void;
  recordVisit: (title: string, url: string) => void;
  getOverallStats: () => {
    lessonsCompleted: number;
    problemsSolved: number;
    bookmarksCount: number;
  };
}

export const STORAGE_KEY = "algoprimer_progress_v1";
export const LEGACY_STORAGE_KEY = "placement_prep_progress_v1";

export const defaultState: ProgressState = {
  completedLessons: [],
  solvedProblems: [],
  attemptedProblems: [],
  bookmarkedItems: [],
  weakTopics: [], // Never start a new user with fabricated weak topics
  notes: {},
  lastVisited: null,
};
export const INITIAL_STATE: ProgressState = defaultState;

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [state, setState] = useState<ProgressState>(defaultState);

  // Load and validate from localStorage only after mount
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const stored =
        window.localStorage.getItem(STORAGE_KEY) ||
        window.localStorage.getItem(LEGACY_STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);
        const validated = ProgressStateSchema.safeParse(parsed);

        if (validated.success) {
          setState(validated.data);
        } else {
          // Graceful partial recovery from malformed or older schema versions
          const recovered: ProgressState = {
            completedLessons: Array.isArray(parsed?.completedLessons)
              ? parsed.completedLessons.filter((s: unknown): s is string => typeof s === "string")
              : [],
            solvedProblems: Array.isArray(parsed?.solvedProblems)
              ? parsed.solvedProblems.filter((s: unknown): s is string => typeof s === "string")
              : [],
            attemptedProblems: Array.isArray(parsed?.attemptedProblems)
              ? parsed.attemptedProblems.filter((s: unknown): s is string => typeof s === "string")
              : [],
            bookmarkedItems: Array.isArray(parsed?.bookmarkedItems)
              ? parsed.bookmarkedItems.filter((s: unknown): s is string => typeof s === "string")
              : [],
            weakTopics: Array.isArray(parsed?.weakTopics)
              ? parsed.weakTopics.filter((s: unknown): s is string => typeof s === "string")
              : [],
            notes:
              typeof parsed?.notes === "object" && parsed.notes !== null && !Array.isArray(parsed.notes)
                ? (parsed.notes as Record<string, string>)
                : {},
            lastVisited:
              parsed?.lastVisited &&
              typeof parsed.lastVisited.title === "string" &&
              typeof parsed.lastVisited.url === "string"
                ? {
                    title: parsed.lastVisited.title,
                    url: parsed.lastVisited.url,
                    timestamp: Number(parsed.lastVisited.timestamp) || Date.now(),
                  }
                : null,
          };
          setState(recovered);
        }
      }
    } catch {
      // Graceful fallback to default state on storage failure
      setState(defaultState);
    }
    setIsHydrated(true);
  }, []);

  // Sync to localStorage on updates (only after initial load has finished)
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota or security exceptions in restricted browser environments
    }
  }, [state, isHydrated]);

  // Memoized Sets for O(1) membership lookups
  const completedLessonsSet = useMemo(() => new Set(state.completedLessons), [state.completedLessons]);
  const solvedProblemsSet = useMemo(() => new Set(state.solvedProblems), [state.solvedProblems]);
  const bookmarkedItemsSet = useMemo(() => new Set(state.bookmarkedItems), [state.bookmarkedItems]);
  const weakTopicsSet = useMemo(() => new Set(state.weakTopics), [state.weakTopics]);

  const toggleLessonCompleted = useCallback((lessonId: string) => {
    setState((prev) => {
      const exists = prev.completedLessons.includes(lessonId);
      return {
        ...prev,
        completedLessons: exists
          ? prev.completedLessons.filter((id) => id !== lessonId)
          : [...prev.completedLessons, lessonId],
      };
    });
  }, []);

  const isLessonCompleted = useCallback(
    (lessonId: string) => completedLessonsSet.has(lessonId),
    [completedLessonsSet]
  );

  const markProblemSolved = useCallback((problemId: string) => {
    setState((prev) => {
      if (prev.solvedProblems.includes(problemId)) return prev;
      return {
        ...prev,
        solvedProblems: [...prev.solvedProblems, problemId],
        attemptedProblems: prev.attemptedProblems.filter((id) => id !== problemId),
      };
    });
  }, []);

  const markProblemAttempted = useCallback((problemId: string) => {
    setState((prev) => {
      if (prev.solvedProblems.includes(problemId) || prev.attemptedProblems.includes(problemId)) {
        return prev;
      }
      return {
        ...prev,
        attemptedProblems: [...prev.attemptedProblems, problemId],
      };
    });
  }, []);

  const isProblemSolved = useCallback(
    (problemId: string) => solvedProblemsSet.has(problemId),
    [solvedProblemsSet]
  );

  const toggleBookmark = useCallback((itemId: string) => {
    setState((prev) => {
      const exists = prev.bookmarkedItems.includes(itemId);
      return {
        ...prev,
        bookmarkedItems: exists
          ? prev.bookmarkedItems.filter((id) => id !== itemId)
          : [...prev.bookmarkedItems, itemId],
      };
    });
  }, []);

  const isBookmarked = useCallback(
    (itemId: string) => bookmarkedItemsSet.has(itemId),
    [bookmarkedItemsSet]
  );

  const toggleWeakTopic = useCallback((topic: string) => {
    setState((prev) => {
      const exists = prev.weakTopics.includes(topic);
      return {
        ...prev,
        weakTopics: exists
          ? prev.weakTopics.filter((t) => t !== topic)
          : [...prev.weakTopics, topic],
      };
    });
  }, []);

  const isWeakTopic = useCallback(
    (topic: string) => weakTopicsSet.has(topic),
    [weakTopicsSet]
  );

  const saveNote = useCallback((itemId: string, note: string) => {
    setState((prev) => ({
      ...prev,
      notes: { ...prev.notes, [itemId]: note },
    }));
  }, []);

  const recordVisit = useCallback((title: string, url: string) => {
    setState((prev) => {
      // Only update if URL or title changed to avoid unnecessary re-renders
      if (prev.lastVisited?.url === url && prev.lastVisited?.title === title) {
        return prev;
      }
      return {
        ...prev,
        lastVisited: { title, url, timestamp: Date.now() },
      };
    });
  }, []);

  const getOverallStats = useCallback(() => {
    return {
      lessonsCompleted: state.completedLessons.length,
      problemsSolved: state.solvedProblems.length,
      bookmarksCount: state.bookmarkedItems.length,
    };
  }, [state.completedLessons.length, state.solvedProblems.length, state.bookmarkedItems.length]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      ...state,
      isLoaded: isHydrated,
      toggleLessonCompleted,
      isLessonCompleted,
      markProblemSolved,
      markProblemAttempted,
      isProblemSolved,
      toggleBookmark,
      isBookmarked,
      toggleWeakTopic,
      isWeakTopic,
      saveNote,
      recordVisit,
      getOverallStats,
    }),
    [
      state,
      isHydrated,
      toggleLessonCompleted,
      isLessonCompleted,
      markProblemSolved,
      markProblemAttempted,
      isProblemSolved,
      toggleBookmark,
      isBookmarked,
      toggleWeakTopic,
      isWeakTopic,
      saveNote,
      recordVisit,
      getOverallStats,
    ]
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};
