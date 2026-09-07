"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface ProgressState {
  completedLessons: string[];
  solvedProblems: string[];
  attemptedProblems: string[];
  bookmarkedItems: string[];
  weakTopics: string[];
  notes: Record<string, string>;
  lastVisited: { title: string; url: string; timestamp: number } | null;
}

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

const STORAGE_KEY = "placement_prep_progress_v1";

const defaultState: ProgressState = {
  completedLessons: [],
  solvedProblems: [],
  attemptedProblems: [],
  bookmarkedItems: [],
  weakTopics: ["Recursion", "Binary Search"],
  notes: {},
  lastVisited: null,
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [state, setState] = useState<ProgressState>(defaultState);

  // Load from localStorage only after mount to guarantee identical server and initial client render
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore
    }
    setIsHydrated(true);
  }, []);

  // Sync to localStorage on updates (only after initial load has finished)
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state, isHydrated]);

  const toggleLessonCompleted = (lessonId: string) => {
    setState((prev) => {
      const exists = prev.completedLessons.includes(lessonId);
      return {
        ...prev,
        completedLessons: exists
          ? prev.completedLessons.filter((id) => id !== lessonId)
          : [...prev.completedLessons, lessonId],
      };
    });
  };

  const isLessonCompleted = (lessonId: string) => {
    return state.completedLessons.includes(lessonId);
  };

  const markProblemSolved = (problemId: string) => {
    setState((prev) => {
      if (prev.solvedProblems.includes(problemId)) return prev;
      return {
        ...prev,
        solvedProblems: [...prev.solvedProblems, problemId],
        attemptedProblems: prev.attemptedProblems.filter((id) => id !== problemId),
      };
    });
  };

  const markProblemAttempted = (problemId: string) => {
    setState((prev) => {
      if (prev.solvedProblems.includes(problemId) || prev.attemptedProblems.includes(problemId)) {
        return prev;
      }
      return {
        ...prev,
        attemptedProblems: [...prev.attemptedProblems, problemId],
      };
    });
  };

  const isProblemSolved = (problemId: string) => {
    return state.solvedProblems.includes(problemId);
  };

  const toggleBookmark = (itemId: string) => {
    setState((prev) => {
      const exists = prev.bookmarkedItems.includes(itemId);
      return {
        ...prev,
        bookmarkedItems: exists
          ? prev.bookmarkedItems.filter((id) => id !== itemId)
          : [...prev.bookmarkedItems, itemId],
      };
    });
  };

  const isBookmarked = (itemId: string) => {
    return state.bookmarkedItems.includes(itemId);
  };

  const toggleWeakTopic = (topic: string) => {
    setState((prev) => {
      const exists = prev.weakTopics.includes(topic);
      return {
        ...prev,
        weakTopics: exists
          ? prev.weakTopics.filter((t) => t !== topic)
          : [...prev.weakTopics, topic],
      };
    });
  };

  const isWeakTopic = (topic: string) => {
    return state.weakTopics.includes(topic);
  };

  const saveNote = (itemId: string, note: string) => {
    setState((prev) => ({
      ...prev,
      notes: { ...prev.notes, [itemId]: note },
    }));
  };

  const recordVisit = (title: string, url: string) => {
    setState((prev) => ({
      ...prev,
      lastVisited: { title, url, timestamp: Date.now() },
    }));
  };

  const getOverallStats = () => {
    return {
      lessonsCompleted: state.completedLessons.length,
      problemsSolved: state.solvedProblems.length,
      bookmarksCount: state.bookmarkedItems.length,
    };
  };

  return (
    <ProgressContext.Provider
      value={{
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
      }}
    >
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
