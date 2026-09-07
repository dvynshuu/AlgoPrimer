import { Lesson } from "@/types/content";
import { javaFoundationsLessons } from "./foundations";
import { javaCoreLessons } from "./core";
import { javaOopLessons } from "./oop";
import { javaCollectionsLessons } from "./collections";
import { javaAdvancedLessons } from "./advanced";

export const javaLessons: Lesson[] = [
  ...javaFoundationsLessons,
  ...javaCoreLessons,
  ...javaOopLessons,
  ...javaCollectionsLessons,
  ...javaAdvancedLessons,
];
