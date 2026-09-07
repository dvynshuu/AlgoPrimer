import { Lesson } from "@/types/content";
import { pythonFoundationsLessons } from "./foundations";
import { pythonCoreLessons } from "./core";
import { pythonOopLessons } from "./oop";
import { pythonPracticalLessons } from "./practical";
import { pythonPlacementLessons } from "./placement";

export const pythonLessons: Lesson[] = [
  ...pythonFoundationsLessons,
  ...pythonCoreLessons,
  ...pythonOopLessons,
  ...pythonPracticalLessons,
  ...pythonPlacementLessons,
];
