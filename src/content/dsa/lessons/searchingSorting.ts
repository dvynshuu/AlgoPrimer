import { Lesson } from "@/types/content";

export const searchingSortingLessons: Lesson[] = [
  {
    id: "dsa-searching-lesson",
    slug: "searching",
    title: "Linear & Binary Search: Invariants, Predicates & Search Space",
    track: "dsa",
    topicSlug: "searching",
    topicTitle: "Linear & Binary Search",
    order: 4,
    estimatedMinutes: 40,
    oneSentence:
      "Binary search is an optimal divide-and-conquer strategy that evaluates a monotonic predicate to halve the candidate search space at each iteration, reducing search time from O(N) to O(log N).",
    whyDoWeNeedIt: {
      problem:
        "Linear search inspects every element one by one in O(N) time. In a database with 1 billion records (e.g. Google Search index or credit card authorizations), linear search would require 1,000,000,000 operations (~10 seconds). Binary search locates any record in at most 30 comparisons (~30 nanoseconds), because 2^30 > 1,000,000,000.",
      realWorldAnalogy:
        "Guessing a secret number between 1 and 100 with higher/lower feedback. If you guess 50 and hear 'Higher', you immediately eliminate all 50 numbers from 1 to 50 in a single guess. You never test 1, 2, 3... linearly.",
    },
    visualIntuition: `Binary Search Space Reduction Invariant:
-------------------------------------------------------------------------
Initial: Search for Target = 23 in sorted array of size 8:
Indices:  0    1    2    3    4    5    6    7
Array:  [ 2,   5,   8,  12,  16,  23,  38,  56 ]
          ^              ^                   ^
         low            mid                 high
low = 0, high = 7  =>  mid = 0 + (7 - 0)/2 = 3
Value at mid = 12.
Since 12 < 23 and array is sorted:
ALL elements at indices 0, 1, 2, 3 are <= 12 < 23!
Search space permanently collapses from [0..7] to [4..7]!
low = mid + 1 = 4.

Step 2:
Indices:  0    1    2    3    4    5    6    7
Array:  [ 2,   5,   8,  12,  16,  23,  38,  56 ]
                              ^    ^         ^
                             low  mid       high
low = 4, high = 7  =>  mid = 4 + (7 - 4)/2 = 5
Value at mid = 23 == Target!
Match found in only 2 comparisons!`,
    syntax: {
      canonicalTemplate: `// Standard Canonical Binary Search Template
int low = 0, high = arr.length - 1;
while (low <= high) {
    // Avoid signed integer overflow (low + high can exceed 2^31 - 1)!
    int mid = low + (high - low) / 2;

    if (arr[mid] == target) {
        return mid; // Element found
    } else if (arr[mid] < target) {
        low = mid + 1; // Discard left half
    } else {
        high = mid - 1; // Discard right half
    }
}
return -1; // Element does not exist`,
      lowerBoundTemplate: `// Lower Bound (First index where arr[i] >= target)
int low = 0, high = arr.length;
while (low < high) {
    int mid = low + (high - low) / 2;
    if (arr[mid] >= target) {
        high = mid; // Candidate found, look further left
    } else {
        low = mid + 1;
    }
}
return low;`,
    },
    example: {
      title: "Finding First and Last Occurrence of a Target in Sorted Array",
      language: "java",
      code: `public class FirstLastPosition {
    public static int findBound(int[] nums, int target, boolean isFirst) {
        int low = 0, high = nums.length - 1;
        int result = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                result = mid; // Candidate stored
                if (isFirst) {
                    high = mid - 1; // Continue searching left
                } else {
                    low = mid + 1;  // Continue searching right
                }
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return result;
    }
}`,
      explanation:
        "Standard binary search terminates immediately upon finding the target. To find the FIRST or LAST occurrence among duplicates, when `nums[mid] == target`, we record `result = mid` and deliberately contract the boundary (`high = mid - 1` for first, `low = mid + 1` for last) to search adjacent indices in O(log N) time.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Verify Monotonicity Condition",
        description:
          "Binary search requires a monotonic function: an invariant that splits the search domain into two contiguous partitions: [False, False, ..., True, True].",
      },
      {
        step: 2,
        title: "Compute Overflow-Safe Midpoint",
        description:
          "Use `mid = low + (high - low) / 2` instead of `(low + high) / 2`. When `low + high > 2,147,483,647`, naive addition overflows to a negative number, causing ArrayIndexOutOfBoundsException.",
      },
      {
        step: 3,
        title: "Strictly Shrink the Search Range",
        description:
          "Update `low = mid + 1` or `high = mid - 1`. Ensuring that `mid` is excluded from the subsequent range prevents infinite loops when `low + 1 == high`.",
      },
      {
        step: 4,
        title: "Post-Condition Verification",
        description:
          "Upon loop termination (`low > high`), the search space is empty. Either the element was returned or it is guaranteed absent from the array.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Integer overflow in midpoint calculation: (low + high) / 2",
        why: "In 32-bit signed integers, if low and high are both ~1.5 * 10^9, their sum overflows to -1.2 * 10^9, leading to an immediate crash.",
        correct: "Always write `int mid = low + (high - low) / 2;`.",
      },
      {
        mistake: "Infinite loop with wrong boundary adjustment: high = mid or low = mid",
        why: "When low and high are adjacent (e.g. low=2, high=3), integer division produces mid=2. If low = mid, low never increases and the while loop never terminates.",
        correct:
          "With `while (low <= high)`, always use `low = mid + 1` and `high = mid - 1`.",
      },
      {
        mistake: "Applying binary search on unsorted data without a monotonic predicate",
        why: "Binary search cannot rule out either half if elements are randomly ordered.",
        correct:
          "Ensure data is sorted, or define a monotonic predicate function f(x) -> boolean.",
      },
    ],
    complexity: {
      time: "O(log N) worst and average case | O(1) best case",
      space: "O(1) auxiliary memory for iterative implementation",
      explanation:
        "The search space N is divided by 2 at each step: N, N/2, N/4, ..., 1. The maximum number of comparisons is ceil(log2(N + 1)).",
    },
    tryItYourself: {
      prompt:
        "Given a sorted array of distinct integers and a target, return the index if the target is found. If not, return the index where it would be if it were inserted in order (Search Insert Position).",
      hint: "Use canonical binary search. When the loop terminates without finding target, what is the value of 'low'?",
      solutionSnippet: `int low = 0, high = nums.length - 1;
while (low <= high) {
    int mid = low + (high - low) / 2;
    if (nums[mid] == target) return mid;
    else if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
}
return low; // 'low' is the exact insertion index!`,
    },
    placementConnection:
      "Binary search is evaluated in 80%+ of Google coding interviews. Interviewers test whether you can recognize hidden binary search spaces (Search on Answer, e.g. Koko Eating Bananas, Capacity to Ship Packages) and whether your implementation is free of off-by-one errors and integer overflows.",
    quickRevision: [
      "Always compute midpoint safely: `mid = low + (high - low) / 2`.",
      "With `while (low <= high)`, boundaries update strictly via `mid + 1` and `mid - 1`.",
      "Binary search does not just apply to arrays; it applies to any monotonic decision predicate f(x).",
      "When target is absent, `low` points to the exact insertion index maintaining sorted order.",
    ],
  },
  {
    id: "dsa-sorting-lesson",
    slug: "sorting",
    title: "Sorting Fundamentals: Merge Sort, Quick Sort & Stability",
    track: "dsa",
    topicSlug: "sorting",
    topicTitle: "Sorting Fundamentals",
    order: 5,
    estimatedMinutes: 50,
    oneSentence:
      "Sorting orders elements according to a comparator; comparison-based sorts are mathematically bounded by Ω(N log N), while non-comparison sorts (Counting, Radix) achieve O(N) by exploiting key properties.",
    whyDoWeNeedIt: {
      problem:
        "Searching, deduplication, finding medians, and identifying intersections in unsorted data requires O(N^2) brute force. Once sorted, search drops to O(log N) and two-pointer operations execute in O(N). Production engines (e.g. database query optimizers, MapReduce shuffles) spend a large fraction of total CPU cycles sorting records.",
      realWorldAnalogy:
        "Organizing a messy drawer of receipts by date. Searching for a specific tax receipt in an unsorted pile requires inspecting every single paper; when sorted chronologically, you can jump directly to March 2024 in seconds.",
    },
    visualIntuition: `Divide & Conquer Merge Sort Tree (N = 8):
-------------------------------------------------------------------------
Split Phase:
Level 0:                 [ 38, 27, 43, 3, 9, 82, 10, 19 ]
                                /              \\
Level 1:          [ 38, 27, 43, 3 ]          [ 9, 82, 10, 19 ]
                      /        \\                /        \\
Level 2:         [ 38, 27 ]   [ 43, 3 ]     [ 9, 82 ]   [ 10, 19 ]
                   /    \\       /   \\        /   \\        /   \\
Level 3:        [38]   [27]   [43]  [3]     [9]   [82]   [10]  [19]

Merge Phase (Zipper merge two sorted halves in O(N) at each level):
Level 2:         [ 27, 38 ]   [ 3, 43 ]     [ 9, 82 ]   [ 10, 19 ]  -> N ops
Level 1:          [ 3, 27, 38, 43 ]          [ 9, 10, 19, 82 ]      -> N ops
Level 0:                 [ 3, 9, 10, 19, 27, 38, 43, 82 ]           -> N ops

Total Levels = log2(N) levels. Work per level = O(N).
Total Time = O(N * log N) GUARANTEED!`,
    syntax: {
      sortingAlgorithmsComparison: `// Comparison Matrix of Core Sorting Algorithms:
// Algorithm       Best Time     Avg Time      Worst Time    Space     Stable?
// Merge Sort      O(N log N)    O(N log N)    O(N log N)    O(N)      YES
// Quick Sort      O(N log N)    O(N log N)    O(N^2)        O(log N)  NO
// Heap Sort       O(N log N)    O(N log N)    O(N log N)    O(1)      NO
// TimSort (Java)  O(N)          O(N log N)    O(N log N)    O(N)      YES
// Counting Sort   O(N + K)      O(N + K)      O(N + K)      O(K)      YES`,
    },
    example: {
      title: "Merge Sort Implementation with Two-Way Zipper Merge",
      language: "java",
      code: `public class MergeSort {
    public static void sort(int[] arr, int left, int right) {
        if (left >= right) return; // Base case: 1 element

        int mid = left + (right - left) / 2;
        sort(arr, left, mid);        // Sort left half
        sort(arr, mid + 1, right);   // Sort right half
        merge(arr, left, mid, right); // Combine both halves
    }

    private static void merge(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;

        // Zipper merge comparing heads of both subarrays
        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) { // '<=' maintains stability!
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];

        // Copy back to original array
        System.arraycopy(temp, 0, arr, left, temp.length);
    }
}`,
      explanation:
        "Notice the comparison `arr[i] <= arr[j]`. By taking from the left subarray when values are equal, Merge Sort preserves the original relative order of duplicate elements, making it a STABLE sorting algorithm. Its recursion tree depth is log2(N), with O(N) work at each level.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Mathematical Lower Bound Ω(N log N)",
        description:
          "Any comparison-based sort can be modeled as a decision tree with N! leaves (all possible permutations). The minimum height of a binary tree with N! leaves is log2(N!) >= N log2(N) - N log2(e) = Ω(N log N). No comparison sort can ever beat this limit.",
      },
      {
        step: 2,
        title: "Divide & Conquer (Merge Sort)",
        description:
          "Divide array in half, recursively sort each half, and merge the two sorted halves using two pointers in O(N) auxiliary space. Guarantees O(N log N) even in the worst case.",
      },
      {
        step: 3,
        title: "Partitioning Invariant (Quick Sort)",
        description:
          "Select a pivot, partition elements into (< pivot, == pivot, > pivot), and recursively sort left and right partitions. Average case is O(N log N) with excellent CPU cache locality.",
      },
      {
        step: 4,
        title: "Non-Comparison Sorting (Counting & Radix)",
        description:
          "When elements are integers within a bounded range K (e.g. 0 to 10^5), Counting Sort counts element frequencies and computes cumulative sums to place elements directly in O(N + K) time, bypassing the Ω(N log N) comparison barrier.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Picking first or last element as pivot in Quick Sort",
        why: "If the input array is already sorted or reverse-sorted, picking arr[0] creates an unbalanced recursion tree of depth N, degrading Quick Sort to O(N^2) time.",
        correct:
          "Use randomized pivot selection or median-of-three (first, middle, last).",
      },
      {
        mistake: "Violating stability by using `<` instead of `<=` in Merge Sort",
        why: "Using `<` causes the right element to be chosen before the left element when values match, destroying the original relative order of duplicates.",
        correct: "Always use `if (arr[i] <= arr[j])` to preserve stability.",
      },
      {
        mistake: "Allocating a new auxiliary array on every recursive call in Merge Sort",
        why: "Allocating small arrays repeatedly inside recursion creates heavy GC pressure and memory fragmentation.",
        correct:
          "Allocate a single global `temp` buffer of size N once, and pass it through recursive calls.",
      },
    ],
    complexity: {
      time: "Merge Sort: O(N log N) guaranteed | Quick Sort: O(N log N) avg, O(N^2) worst",
      space: "Merge Sort: O(N) auxiliary | Quick Sort: O(log N) stack frames",
      explanation:
        "Java's `Arrays.sort()` uses Dual-Pivot QuickSort for primitives (maximizing cache locality) and TimSort (adaptive merge sort) for objects (guaranteeing stability).",
    },
    tryItYourself: {
      prompt:
        "Sort an array of 0s, 1s, and 2s in-place in a single pass (Dutch National Flag problem).",
      hint: "Use three pointers: low, mid, high. Swap arr[mid] with arr[low] if 0, increment mid if 1, swap arr[mid] with arr[high] if 2.",
      solutionSnippet: `int low = 0, mid = 0, high = nums.length - 1;
while (mid <= high) {
    if (nums[mid] == 0) {
        int t = nums[low]; nums[low] = nums[mid]; nums[mid] = t;
        low++; mid++;
    } else if (nums[mid] == 1) {
        mid++;
    } else {
        int t = nums[mid]; nums[mid] = nums[high]; nums[high] = t;
        high--;
    }
}`,
    },
    placementConnection:
      "Google interviewers evaluate whether you understand when to use QuickSort vs MergeSort (Cache locality vs Worst-case guarantee & stability). You will also be asked to implement custom Comparators: sorting intervals by start time, sorting strings by frequency, and 3-way partitioning.",
    quickRevision: [
      "Comparison sorting has a proven mathematical lower bound of Ω(N log N).",
      "Merge Sort guarantees O(N log N) worst-case and is stable, but requires O(N) auxiliary RAM.",
      "Quick Sort has O(N log N) average time and O(1) space, but O(N^2) worst case without random pivot.",
      "Stable sorting preserves the relative order of records with identical comparison keys.",
    ],
  },
  {
    id: "dsa-binary-search-lesson",
    slug: "binary-search",
    title: "Advanced Binary Search: Answer Spaces, Rotated Arrays & 2D Matrices",
    track: "dsa",
    topicSlug: "binary-search",
    topicTitle: "Advanced Binary Search",
    order: 11,
    estimatedMinutes: 50,
    oneSentence:
      "Advanced binary search generalizes beyond sorted arrays by searching across continuous or discrete 'answer spaces' using a monotonic feasibility check function f(x) -> {true, false}.",
    whyDoWeNeedIt: {
      problem:
        "Many high-frequency interview problems do not provide a sorted array to search through. Instead, they ask: 'What is the minimum capacity needed to ship packages within D days?' or 'What is the maximum speed Koko can eat bananas within H hours?' Checking all candidate speeds from 1 to 10^9 linearly takes O(N * MaxVal) time and times out. Binary Search on Answer tests speeds logarithmically in O(N * log(MaxVal)) time.",
      realWorldAnalogy:
        "Tuning the water pressure of an industrial pipe. Instead of testing pressures 1 psi, 2 psi, 3 psi up to 10,000 psi, you test 5,000 psi. If the pipe bursts, every pressure >= 5,000 psi is impossible. You immediately restrict your test to the lower half.",
    },
    visualIntuition: `Binary Search on Answer Space: Monotonic Feasibility Function:
-------------------------------------------------------------------------
Problem: Find MINIMUM speed 'v' such that Koko finishes bananas within H hours:
Feasible Function: canFinish(v) returns true/false.

Speed 'v':      1      2      3      4      5      6      7      8 ...
canFinish(v): False  False  False  True   True   True   True   True
                |                    ^
         Impossible zone      First VALID answer (Optimal Target!)

Binary Search Invariant:
low = 1, high = max(bananas)
If canFinish(mid) == true:
  Speed 'mid' works! But can we go even slower?
  Record ans = mid, high = mid - 1 (Search left for a smaller valid speed).
If canFinish(mid) == false:
  Speed 'mid' is too slow!
  low = mid + 1 (Must increase speed).

Complexity: log2(10^9) ~ 30 iterations * O(N) check = 30 * N operations (Blazing fast!).`,
    syntax: {
      searchOnAnswerTemplate: `// Universal Binary Search on Answer Template
int low = minPossibleAnswer, high = maxPossibleAnswer;
int bestAnswer = high;

while (low <= high) {
    int mid = low + (high - low) / 2;
    if (isValidFeasible(mid)) {
        bestAnswer = mid; // Feasible, try to optimize further
        high = mid - 1;   // If minimizing, look left; if maximizing, low = mid + 1
    } else {
        low = mid + 1;    // Infeasible, must relax constraint
    }
}
return bestAnswer;`,
    },
    example: {
      title: "Binary Search in a Rotated Sorted Array (Pivot Invariant)",
      language: "java",
      code: `public class RotatedSortedSearch {
    public static int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;

            // Invariant: At least one half MUST be strictly sorted!
            if (nums[low] <= nums[mid]) {
                // Left half is sorted
                if (target >= nums[low] && target < nums[mid]) {
                    high = mid - 1; // Target lies within sorted left half
                } else {
                    low = mid + 1;  // Target must be in right half
                }
            } else {
                // Right half is sorted
                if (target > nums[mid] && target <= nums[high]) {
                    low = mid + 1;  // Target lies within sorted right half
                } else {
                    high = mid - 1; // Target must be in left half
                }
            }
        }
        return -1;
    }
}`,
      explanation:
        "Even when rotated (e.g. [4, 5, 6, 7, 0, 1, 2]), dividing at `mid` splits the array into one normally sorted half and one rotated half. By testing whether `target` falls between `nums[low]` and `nums[mid]`, we can deterministically discard half of the array at every step, preserving O(log N) time.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Identify Monotonicity in the Problem",
        description:
          "Formulate a boolean condition: 'If answer X is valid, is X + 1 also guaranteed to be valid?' If yes, monotonicity holds and Binary Search on Answer applies.",
      },
      {
        step: 2,
        title: "Establish Lower and Upper Search Bounds",
        description:
          "Determine the minimum conceivable answer (e.g. `low = 1` or `low = max(arr)`) and maximum conceivable answer (e.g. `high = sum(arr)`).",
      },
      {
        step: 3,
        title: "Implement the O(N) Greedy Feasibility Check",
        description:
          "Write a helper function `boolean canFulfill(int candidate)` that tests whether the candidate constraint can be satisfied using a greedy scan.",
      },
      {
        step: 4,
        title: "Contract the Answer Space Logarithmically",
        description:
          "If valid, store the current candidate and narrow the range toward the optimal direction until `low > high`.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Setting incorrect search bounds (low or high too tight)",
        why: "If `high` is initialized to an underestimate (e.g. max element instead of sum of elements in Split Array Largest Sum), the optimal answer is excluded from the search space.",
        correct:
          "Carefully define bounds: low must be smallest possible answer, high must be guaranteed upper bound.",
      },
      {
        mistake: "Failing to check both halves in rotated array when duplicates exist",
        why: "When `nums[low] == nums[mid] == nums[high]`, it is impossible to determine which half is sorted without incrementing `low++` and decrementing `high--`.",
        correct:
          "In duplicate problems (Search in Rotated Sorted Array II), handle the equality case by shrinking both ends.",
      },
    ],
    complexity: {
      time: "O(CheckCost * log(Range)) e.g. O(N * log(Max - Min))",
      space: "O(1) auxiliary space",
      explanation:
        "Even if the answer range is 10^14, log2(10^14) is only ~47 iterations, turning an impossible brute-force search into milliseconds of CPU time.",
    },
    tryItYourself: {
      prompt:
        "Given an integer x, compute and return the integer square root of x (i.e. floor(sqrt(x))) without using built-in sqrt functions.",
      hint: "Search space is [1, x]. If mid * mid <= x, record mid and search right (low = mid + 1); else search left (high = mid - 1). Watch out for 64-bit integer overflow on mid * mid!",
      solutionSnippet: `if (x == 0 || x == 1) return x;
long low = 1, high = x, ans = 0;
while (low <= high) {
    long mid = low + (high - low) / 2;
    if (mid * mid <= x) {
        ans = mid;
        low = mid + 1;
    } else {
        high = mid - 1;
    }
}
return (int) ans;`,
    },
    placementConnection:
      "Search on Answer is Google's favorite variation of binary search. Core problems asked in Google L4/L5 onsite rounds: Koko Eating Bananas, Split Array Largest Sum, Capacity to Ship Packages Within D Days, Painter's Partition, and Aggressive Cows.",
    quickRevision: [
      "Binary search applies whenever a problem exhibits monotonic feasibility: [F, F, ..., T, T].",
      "In Rotated Arrays, at least one half of the array is always normally sorted at every step.",
      "Always watch for integer overflow in `mid * mid` or `mid + (high - low) / 2` using 64-bit `long`.",
      "Complexity is O(N * log(Range)), converting exponential search into linearithmic bounds.",
    ],
  },
];
