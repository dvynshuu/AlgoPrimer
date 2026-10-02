import { Lesson } from "@/types/content";
import { foundationsLessons } from "./lessons/foundations";
import { searchingSortingLessons } from "./lessons/searchingSorting";
import { linearStructuresLessons } from "./lessons/linearStructures";
import { treesAndGraphsLessons } from "./lessons/treesAndGraphs";
import { advancedAlgorithmsLessons } from "./lessons/advancedAlgorithms";

export const dsaLessons: Lesson[] = [
  ...foundationsLessons,
  ...searchingSortingLessons,
  ...linearStructuresLessons,
  ...treesAndGraphsLessons,
  ...advancedAlgorithmsLessons,
];
