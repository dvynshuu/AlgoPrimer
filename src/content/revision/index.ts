import { RevisionCard } from "@/types/content";

export const revisionCards: RevisionCard[] = [
  {
    id: "rev-arrays",
    title: "Arrays & Contiguous Memory",
    topic: "Arrays",
    category: "DSA Fundamentals",
    rememberPoints: [
      "Physical RAM layout is contiguous: Address(i) = BaseAddress + i * sizeof(type).",
      "Direct random access is O(1); unsorted search is O(N).",
      "Insertions and deletions at arbitrary positions require O(N) element shifts.",
      "Hardware spatial locality makes array iteration significantly faster than pointer hopping.",
    ],
    commonMistakes: [
      "Off-by-one error on boundaries (< vs <= arr.length).",
      "Shifting elements from left to right during insertion, which overwrites values.",
      "Assuming dynamic arrays (ArrayList/std::vector) never incur reallocation costs.",
    ],
    importantPatterns: [
      "Two Pointers (converging, fast/slow).",
      "Prefix Sum (range sum queries in O(1)).",
      "Sliding Window (fixed and variable size subarrays).",
      "Kadane's Algorithm (maximum contiguous subarray in O(N)).",
    ],
    codeSnippet: `// Two-Pointer in-place reversal
int l = 0, r = arr.length - 1;
while (l < r) {
    int tmp = arr[l]; arr[l] = arr[r]; arr[r] = tmp;
    l++; r--;
}`,
  },
  {
    id: "rev-complexity",
    title: "Time & Space Complexity (Big-O)",
    topic: "Complexity",
    category: "DSA Fundamentals",
    rememberPoints: [
      "Big-O measures asymptotic scaling as N -> infinity, independent of hardware clock speed.",
      "10^8 operations per second is the threshold for 1-second execution in Online Assessments.",
      "When N = 10^5: O(N^2) = 10^10 operations (TLE!), requires O(N log N) or O(N).",
      "Auxiliary space measures extra memory, excluding input allocation.",
    ],
    commonMistakes: [
      "Confusing consecutive loops (O(N) + O(N) = O(N)) with nested loops (O(N) * O(N) = O(N^2)).",
      "Ignoring recursive call stack depth in space complexity.",
      "Assuming string slicing or array concatenation is O(1) (usually O(K) where K is slice length).",
    ],
    importantPatterns: [
      "Binary search cuts the domain in half -> O(log N).",
      "Divide and Conquer with merge step -> O(N log N).",
      "Hash table lookup / insertion -> O(1) average.",
    ],
  },
  {
    id: "rev-two-pointers",
    title: "Two Pointers Technique",
    topic: "Two Pointers",
    category: "Problem Solving Patterns",
    rememberPoints: [
      "Reduces brute force O(N^2) pairs down to O(N) by exploiting sorted order or partitioning.",
      "Pointers only advance in one direction, ensuring total steps <= N.",
      "Strictly O(1) auxiliary space.",
    ],
    commonMistakes: [
      "Applying opposing two pointers on unsorted data without verifying monotonicity.",
      "Using while (l <= r) when comparing distinct pairs (results in self-pairing).",
      "Missing duplicate skipping logic in problems like 3Sum.",
    ],
    importantPatterns: [
      "Opposing Pointers: Left from 0, Right from N-1 (Two Sum II, Palindromes).",
      "Slow/Fast Pointers: Cycle detection (Floyd's algorithm) or in-place deduplication.",
      "Sliding Window: Expanding right pointer and shrinking left pointer.",
    ],
    codeSnippet: `// Deduplicating sorted array in-place
int i = 0;
for (int j = 1; j < n; j++) {
    if (nums[j] != nums[i]) {
        nums[++i] = nums[j];
    }
}
return i + 1;`,
  },
  {
    id: "rev-java-memory",
    title: "Java Memory & Primitives",
    topic: "Java",
    category: "Language Core",
    rememberPoints: [
      "8 primitive types live directly on the thread stack.",
      "Objects and arrays are allocated on the JVM heap; variables on stack hold references.",
      "Local variables must be explicitly initialized before use.",
      "String objects are immutable and stored in the String Constant Pool.",
    ],
    commonMistakes: [
      "Using '==' to compare Strings or Objects (compares addresses, not value contents).",
      "Integer overflow: 2 * 10^9 fits in 'int', but 10^10 requires 'long'.",
      "Array assignment `b = a` copies reference, not array data.",
    ],
    importantPatterns: [
      "Always use `.equals()` for object and string value comparison.",
      "Use `StringBuilder` instead of `+` in loops to prevent O(N^2) string allocations.",
      "Use `Math.max` and `Math.min` instead of manual branches for cleaner code.",
    ],
  },
  {
    id: "rev-prefix-sum",
    title: "Prefix Sum & Hash Map Technique",
    topic: "Arrays",
    category: "Problem Solving Patterns",
    rememberPoints: [
      "PrefixSum[i] = nums[0] + nums[1] + ... + nums[i].",
      "Subarray sum between i and j is: PrefixSum[j] - PrefixSum[i - 1].",
      "To find subarray sum == k: PrefixSum[j] - PrefixSum[i] = k  =>  PrefixSum[i] = PrefixSum[j] - k.",
      "Must initialize frequency map with (0 -> 1) to count subarrays starting from index 0.",
    ],
    commonMistakes: [
      "Using sliding window when array contains negative numbers (breaks monotonicity).",
      "Forgetting the base case: prefix sum of 0 has occurred 1 time initially.",
    ],
    importantPatterns: [
      "Subarray Sum Equals K.",
      "Contiguous Array with equal 0s and 1s (replace 0 with -1 and find subarray sum 0).",
      "Range sum query 1D and 2D matrices.",
    ],
    codeSnippet: `Map<Integer, Integer> map = new HashMap<>();
map.put(0, 1);
int sum = 0, count = 0;
for (int x : nums) {
    sum += x;
    count += map.getOrDefault(sum - k, 0);
    map.put(sum, map.getOrDefault(sum, 0) + 1);
}`,
  },
];
