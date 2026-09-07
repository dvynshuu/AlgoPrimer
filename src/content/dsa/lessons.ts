import { Lesson } from "@/types/content";

export const dsaLessons: Lesson[] = [
  {
    id: "dsa-complexity-lesson",
    slug: "complexity",
    title: "Understanding Time and Space Complexity",
    track: "dsa",
    topicSlug: "complexity",
    topicTitle: "Time & Space Complexity",
    order: 1,
    estimatedMinutes: 35,
    oneSentence:
      "Time complexity measures how the execution steps of an algorithm scale as input size N grows towards infinity, independent of computer hardware speed.",
    whyDoWeNeedIt: {
      problem:
        "Measuring code speed with a stopwatch (seconds or milliseconds) depends entirely on CPU clock frequency, operating system background load, and programming language. We need an objective, hardware-independent mathematical metric.",
      realWorldAnalogy:
        "Evaluating an airplane vs a bicycle. An airplane takes time to taxi and fuel up, but across 1,000 miles it vastly outperforms a bicycle. Big-O evaluates performance over large distances (large N).",
    },
    visualIntuition: `Big-O Growth Hierarchy (Fastest to Slowest):
O(1)        Constant Time       [ Instant lookup ]
O(log n)    Logarithmic Time    [ Binary Search: cuts space in half ]
O(n)        Linear Time         [ Single loop over N elements ]
O(n log n)  Linearithmic Time   [ Merge Sort, Quick Sort ]
O(n^2)      Quadratic Time      [ Nested loops over N x N ]
O(2^n)      Exponential Time    [ Exploring all subsets / brute recursion ]
O(n!)       Factorial Time      [ Generating all permutations ]`,
    syntax: {
      ruleOfThumb: "1 second in Online Assessments (LeetCode/Codeforces) ~ 10^8 operations.\nIf N = 10^5, an O(n^2) solution does 10^10 operations -> TLE (Time Limit Exceeded)!\nYou must find an O(n log n) or O(n) approach.",
    },
    example: {
      title: "Comparing O(n) vs O(1) sum of first N numbers",
      language: "java",
      code: `// Approach A: O(n) time, O(1) space
long sumLinear(int n) {
    long sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Approach B: O(1) time, O(1) space (Gauss Formula)
long sumConstant(int n) {
    return (long) n * (n + 1) / 2;
}`,
      explanation:
        "If n = 1,000,000,000, `sumLinear` requires one billion iterations and several seconds. `sumConstant` calculates the exact same result in three CPU instructions (~1 nanosecond).",
    },
    howItWorks: [
      {
        step: 1,
        title: "Count Operations as a Function of N",
        description: "Express total operations as a polynomial, e.g. T(N) = 3N^2 + 5N + 12.",
      },
      {
        step: 2,
        title: "Drop Constant Factors",
        description: "As N approaches 10^9, whether an operation takes 3 cycles or 1 cycle is negligible compared to N^2.",
      },
      {
        step: 3,
        title: "Keep Dominant Term",
        description: "3N^2 + 5N + 12 simplifies strictly to O(N^2).",
      },
    ],
    commonMistakes: [
      {
        mistake: "Assuming two consecutive loops mean O(n^2)",
        why: "Consecutive loops add: O(n) + O(n) = O(2n) = O(n). Only nested loops multiply: O(n) * O(n) = O(n^2).",
        correct: "for (int i = 0; i < n; i++) { ... } for (int j = 0; j < n; j++) { ... } is O(n).",
      },
      {
        mistake: "Ignoring space used by recursion stack",
        why: "Every recursive call allocates a stack frame. A recursion of depth N takes O(N) auxiliary space even if no arrays are allocated.",
        correct: "Always factor call stack depth into space complexity analysis.",
      },
    ],
    complexity: {
      time: "Reference Framework",
      space: "Auxiliary space: Extra memory allocated by your algorithm, excluding input storage.",
      explanation: "Interviewers strictly evaluate auxiliary memory.",
    },
    tryItYourself: {
      prompt: "What is the time complexity of a loop that halves its counter each step: `for (int i = n; i > 0; i /= 2)`?",
      hint: "How many times can you divide N by 2 until reaching 1? That is the definition of logarithm base 2.",
      solutionSnippet: `Time Complexity: O(log n)`,
    },
    placementConnection:
      "Before writing a single line of code in any interview, you must state your proposed time and space complexity and ask the interviewer if that meets their target threshold.",
    quickRevision: [
      "Drop constants and lower-order terms.",
      "10^8 operations is the hard limit for 1-second execution in Online Assessments.",
      "Auxiliary space does not count memory used to store the problem's input.",
      "Binary search cuts the search domain in half at each step, yielding O(log n).",
    ],
  },
  {
    id: "dsa-arrays-lesson",
    slug: "arrays",
    title: "Arrays: Contiguity, Operations, and Memory Layout",
    track: "dsa",
    topicSlug: "arrays",
    topicTitle: "Arrays & Dynamic Arrays",
    order: 2,
    estimatedMinutes: 40,
    oneSentence:
      "Arrays are contiguous memory structures where elements are stored in back-to-back memory addresses, giving O(1) random access but O(N) insertions and deletions.",
    whyDoWeNeedIt: {
      problem:
        "CPUs fetch data in cache lines (typically 64 contiguous bytes). Because arrays are contiguous, reading element 0 automatically loads elements 1, 2, and 3 into the L1 CPU cache, making arrays orders of magnitude faster than pointer-based structures like Linked Lists.",
      realWorldAnalogy:
        "A printed book vs separate sheets of paper scattered across different rooms. Turning to page 45 is instantaneous; gathering loose sheets requires following footsteps.",
    },
    visualIntuition: `CPU Cache Line (64 bytes):
Memory: [ arr[0] ][ arr[1] ][ arr[2] ][ arr[3] ][ arr[4] ] ...
             |
             v (Fetched in a single memory cycle into CPU Cache)
L1 Cache: [ Instant O(1) read for sequential elements ]`,
    syntax: {
      operations: "Access: arr[i] -> O(1)\nSearch (unsorted): O(N)\nInsertion at end: O(1) amortized\nInsertion at beginning: O(N) (shifts all elements)",
    },
    example: {
      title: "Inserting into an array requires element shifting",
      language: "java",
      code: `public class ArrayInsert {
    // Insert element 'val' at index 'idx' in an array with current size 'n'
    public static void insertAt(int[] arr, int n, int idx, int val) {
        // Shift elements to the right starting from the end
        for (int i = n - 1; i >= idx; i--) {
            arr[i + 1] = arr[i];
        }
        arr[idx] = val;
    }
}`,
      explanation:
        "To make room for the new element at index `idx`, every element from `idx` to the end must move one position to the right, requiring O(N) operations.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Contiguous Allocation",
        description: "Operating system reserves a single uninterrupted slice of RAM.",
      },
      {
        step: 2,
        title: "Index Pointer Math",
        description: "CPU computes target byte address via `Base + (Index * ElementSize)` in a single hardware cycle.",
      },
      {
        step: 3,
        title: "Cache Locality",
        description: "Pre-fetchers recognize the linear access pattern and stream subsequent elements into high-speed L1/L2 cache.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Shifting left-to-right when inserting: arr[i+1] = arr[i]",
        why: "If you shift from index idx upward, you overwrite the subsequent element before moving it, duplicating the first value across the array.",
        correct: "Always shift backward from the last element when inserting: for (int i = n - 1; i >= idx; i--).",
      },
      {
        mistake: "Assuming ArrayList or std::vector never does reallocation",
        why: "When capacity is exceeded, dynamic arrays allocate a brand new array with 2x size and copy all N elements over.",
        correct: "Pre-size collections when the element count is known: new ArrayList<>(10000).",
      },
    ],
    complexity: {
      time: "Read: O(1), Search: O(N), Insert/Delete: O(N)",
      space: "O(N) contiguous memory",
      explanation: "Contiguity gives peak read performance at the cost of expensive element shifts on modification.",
    },
    tryItYourself: {
      prompt: "Implement a function that rotates an array to the left by 1 position (first element moves to the end).",
      hint: "Store arr[0] in a temp variable, shift everything left by 1, then place temp at arr[arr.length - 1].",
      solutionSnippet: `int temp = arr[0];
for (int i = 0; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1];
}
arr[arr.length - 1] = temp;`,
    },
    placementConnection:
      "Array fundamentals underpin almost every data structure in production systems: Hash tables use array buckets; heaps use array representations of binary trees; vectors and strings are dynamic arrays.",
    quickRevision: [
      "Arrays are physically contiguous in RAM.",
      "Index access is O(1) via base address arithmetic.",
      "Insertions and deletions at arbitrary positions take O(N) due to element shifting.",
      "Spatial locality makes array traversals significantly faster than linked list node traversals.",
    ],
  },
  {
    id: "dsa-two-pointers-lesson",
    slug: "two-pointers",
    title: "The Two Pointers Technique",
    track: "dsa",
    topicSlug: "arrays",
    topicTitle: "Arrays & Dynamic Arrays",
    order: 3,
    estimatedMinutes: 35,
    oneSentence:
      "The Two Pointers technique uses two index markers that traverse a sequence synchronously or in opposing directions to eliminate redundant nested loops.",
    whyDoWeNeedIt: {
      problem:
        "Brute force checks all pairs (i, j) using nested loops, taking O(N^2) time. When data is sorted or elements can be partitioned, two pointers exploit monotonicity to reduce time from O(N^2) to O(N).",
      realWorldAnalogy:
        "Two people walking towards each other from opposite ends of a bridge to meet in the middle, inspecting planks as they converge.",
    },
    visualIntuition: `Opposing Pointers (e.g. Sorted Array Search):
Initial:
[ 1,  3,  4,  7,  9,  11 ]
  ^                   ^
 left                right

If (nums[left] + nums[right] > target):
  right-- (Sum is too large, move right pointer inward to smaller values)

If (nums[left] + nums[right] < target):
  left++  (Sum is too small, move left pointer inward to larger values)`,
    syntax: {
      converging: `int left = 0, right = arr.length - 1;
while (left < right) {
    if (condition) {
        left++;
    } else {
        right--;
    }
}`,
    },
    example: {
      title: "Checking if a string is a palindrome using two pointers",
      language: "java",
      code: `public class PalindromeChecker {
    public static boolean isPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false; // Characters mismatch
            }
            left++;
            right--;
        }
        return true;
    }
}`,
      explanation:
        "Instead of reversing the entire string (which takes O(N) extra space), two pointers verify symmetry in-place with O(1) auxiliary space.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Initialization",
        description: "Place `left` at index 0 and `right` at index `n - 1` (or slow/fast pointers at index 0).",
      },
      {
        step: 2,
        title: "Evaluate Invariant",
        description: "Inspect the elements at `arr[left]` and `arr[right]`.",
      },
      {
        step: 3,
        title: "Directional Step",
        description: "Based on sorted properties, definitively rule out one index and increment `left` or decrement `right`.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using while (left <= right) when comparing distinct pairs",
        why: "If left equals right, you are pairing an element with itself, which is invalid when pairs must consist of two different indices.",
        correct: "Use while (left < right) for distinct pair problems.",
      },
      {
        mistake: "Applying sorted two-pointer logic on an unsorted array",
        why: "Opposing two pointers require monotonicity. If the array is not sorted, decreasing `right` does not guarantee a smaller sum!",
        correct: "Sort the array first if indices do not need to be preserved, or use a Hash Map.",
      },
    ],
    complexity: {
      time: "O(N) single pass",
      space: "O(1) auxiliary pointers",
      explanation: "Each step moves either left forward or right backward. Together they make at most N total steps.",
    },
    tryItYourself: {
      prompt: "Given a sorted array, determine if there exists a pair with sum equal to target.",
      hint: "Use left = 0, right = n - 1. If sum > target, right--; if sum < target, left++; if equal, return true.",
      solutionSnippet: `int left = 0, right = nums.length - 1;
while (left < right) {
    int sum = nums[left] + nums[right];
    if (sum == target) return true;
    else if (sum < target) left++;
    else right--;
}
return false;`,
    },
    placementConnection:
      "Two Pointers is the #1 foundational pattern in technical interviews. It directly unlocks: Two Sum II, 3Sum, Container With Most Water, Trapping Rain Water, and Dutch National Flag.",
    quickRevision: [
      "Three pointer variations: Opposing (left/right), Fast/Slow (cycle detection), and Running Window (sliding window).",
      "Opposing two pointers require sorted data or monotonic properties.",
      "Time complexity is strictly O(N) because pointers only move in one direction.",
      "Space complexity is strictly O(1).",
    ],
  },
];
