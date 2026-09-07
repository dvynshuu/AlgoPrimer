import { Lesson } from "@/types/content";
import { cppFoundationsLessons } from "./foundations";
import { cppCoreLessons } from "./core";
import { cppOopLessons } from "./oop";
import { cppStlLessons } from "./stl";
import { cppAdvancedLessons } from "./advanced";

export const cppLessons: Lesson[] = [
  ...cppFoundationsLessons,
  ...cppCoreLessons,
  ...cppOopLessons,
  ...cppStlLessons,
  ...cppAdvancedLessons,
];
