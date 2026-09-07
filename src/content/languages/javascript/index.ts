import { Lesson } from "@/types/content";
import { javascriptFoundationsLessons } from "./foundations";
import { javascriptCoreLessons } from "./core";
import { javascriptOopLessons } from "./oop";
import { javascriptAsyncLessons } from "./async";
import { javascriptPlacementLessons } from "./placement";

export const javascriptLessons: Lesson[] = [
  ...javascriptFoundationsLessons,
  ...javascriptCoreLessons,
  ...javascriptOopLessons,
  ...javascriptAsyncLessons,
  ...javascriptPlacementLessons,
];
