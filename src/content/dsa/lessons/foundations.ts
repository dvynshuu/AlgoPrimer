import { Lesson } from "@/types/content";

export const foundationsLessons: Lesson[] = [
  {
    id: "dsa-complexity-lesson",
    slug: "complexity",
    title: "Understanding Time and Space Complexity (Big-O)",
    track: "dsa",
    topicSlug: "complexity",
    topicTitle: "Time & Space Complexity",
    order: 1,
    estimatedMinutes: 35,
    oneSentence:
      "Time complexity measures how the fundamental operation count of an algorithm scales as input size N grows towards infinity, evaluated independently of hardware clock frequency.",
    whyDoWeNeedIt: {
      problem:
        "Wall-clock execution time varies wildly across machines due to CPU clock frequency, OS background thread scheduling, memory bandwidth, and compiler optimizations. Without an asymptotic metric, you cannot objectively prove whether an algorithm will scale to 100 million production users or crash with a Timeout in an Online Assessment.",
      realWorldAnalogy:
        "Evaluating an airplane vs a bicycle. A bicycle starts rolling instantly with zero taxi time; an airplane requires fueling, runway taxiing, and air-traffic clearance. However, across a 1,000-mile journey, the airplane outperforms the bicycle by orders of magnitude. Big-O evaluates performance over long distances (as N -> infinity).",
    },
    visualIntuition: `Asymptotic Growth Hierarchy (Fastest to Slowest):
-------------------------------------------------------------------------
O(1)        Constant Time       Instant array index lookup / hash table read
O(log n)    Logarithmic Time    Binary Search: halves search space each step
O(n)        Linear Time         Single loop iterating over N elements
O(n log n)  Linearithmic Time   Merge Sort, Quick Sort (average), Heap Sort
O(n^2)      Quadratic Time      Nested loops checking all pairs (i, j)
O(2^n)      Exponential Time    Generating all subsets / brute-force branching
O(n!)       Factorial Time      Generating all permutations of N items
-------------------------------------------------------------------------
Hardware Rule of Thumb for Google Online Assessments:
1 CPU core executes ~10^8 operations per second.
- N = 10^5  ->  O(n^2) = 10^10 ops  =>  100 seconds  =>  Time Limit Exceeded (TLE)!
- N = 10^5  ->  O(n log n) = ~1.7 * 10^6 ops  =>  0.02 seconds  =>  PASS!`,
    syntax: {
      operationThresholds: `// Quick reference table for maximum allowed complexity based on input constraint N:
// N <= 12      : O(N!) or O(2^N * N)  -> Permutations, Traveling Salesperson
// N <= 25      : O(2^N)               -> Subset generation, Backtracking
// N <= 500     : O(N^3)               -> Floyd-Warshall, Matrix Multiplication
// N <= 5,000   : O(N^2)               -> Bubble/Insertion sort, nested loops
// N <= 10^6    : O(N log N) or O(N)   -> Merge sort, Two pointers, Hashing
// N >= 10^9    : O(log N) or O(1)     -> Binary Search, Gauss math formula`,
      asymptoticNotations: `// Big-O (O)       : Upper bound (Worst-case guarantee)
// Big-Omega (Ω)   : Lower bound (Best-case guarantee)
// Big-Theta (Θ)   : Tight bound (Both upper and lower bound match asymptotically)`,
    },
    example: {
      title: "Comparing O(n) Linear Sum vs O(1) Closed-Form Gauss Sum",
      language: "java",
      code: `public class SumComparison {
    // Approach A: O(n) time, O(1) auxiliary space
    public static long sumLinear(int n) {
        long sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += i; // Executes exactly N times
        }
        return sum;
    }

    // Approach B: O(1) time, O(1) auxiliary space (Carl Friedrich Gauss formula)
    public static long sumConstant(int n) {
        // Direct arithmetic formula computed in 3 machine CPU instructions:
        return (long) n * (n + 1) / 2;
    }
}`,
      explanation:
        "For N = 1,000,000,000, `sumLinear` requires one billion loop cycles and ~1.5 seconds of CPU time. `sumConstant` calculates the exact same result in ~1 nanosecond regardless of whether N is ten or ten billion.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Express Steps as a Function T(N)",
        description:
          "Count elementary CPU operations (assignments, comparisons, additions) as an algebraic polynomial, e.g. T(N) = 4N^2 + 7N + 18.",
      },
      {
        step: 2,
        title: "Drop Constant Factors",
        description:
          "As N approaches 10^8, the difference between 4N^2 and N^2 is a negligible constant factor compared to the massive growth rate of N^2 itself.",
      },
      {
        step: 3,
        title: "Identify the Dominant Term",
        description:
          "Discard all lower-order terms (7N + 18) because as N grows large, N^2 completely eclipses linear and constant terms. 4N^2 + 7N + 18 simplifies strictly to O(N^2).",
      },
      {
        step: 4,
        title: "Evaluate Auxiliary Memory vs Total Space",
        description:
          "Distinguish between space required to hold the problem input vs auxiliary memory allocated by your algorithm (hash maps, recursion stack frames, temporary buffers). Interviewers evaluate auxiliary space.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Assuming two consecutive loops yield O(n^2)",
        why: "Consecutive loops add their complexities: O(n) + O(n) = O(2n) = O(n). Only nested loops multiply: O(n) * O(n) = O(n^2).",
        correct:
          "for (int i = 0; i < n; i++) { ... } for (int j = 0; j < n; j++) { ... } runs in O(n) total time.",
      },
      {
        mistake: "Ignoring the Call Stack depth in recursive algorithms",
        why: "Every recursive call allocates a stack frame containing local variables and return addresses. Deep recursion of depth N consumes O(N) auxiliary space even if no arrays are created.",
        correct:
          "Always count the maximum depth of the recursion tree when analyzing space complexity.",
      },
      {
        mistake: "Assuming String concatenation in a loop is O(1)",
        why: "In languages with immutable strings (Java, Python, JS), `s += c` allocates a new string and copies all previous characters, turning an N-step loop into an O(N^2) bottleneck.",
        correct:
          "Use mutable buffers like `StringBuilder` in Java or `''.join(list)` in Python to maintain true O(N) time.",
      },
    ],
    complexity: {
      time: "Evaluated per algorithm (Target: O(N) or O(N log N))",
      space: "Auxiliary space: Extra RAM consumed beyond the input",
      explanation:
        "In Google interviews, always state time and space complexity BEFORE writing code, and explicitly clarify worst-case vs amortized average-case behavior.",
    },
    tryItYourself: {
      prompt:
        "What is the time complexity of the following loop: `for (int i = n; i > 0; i /= 2)`?",
      hint: "How many times can you divide N by 2 until you reach 1? That is the exact definition of the binary logarithm log2(N).",
      solutionSnippet: `Time Complexity: O(log n)
Each iteration divides the counter by 2: N, N/2, N/4, ..., 1.
The total number of steps k satisfies 2^k = N  =>  k = log2(N).`,
    },
    placementConnection:
      "At Google, interviewers explicitly test your understanding of Amortized Analysis (e.g. ArrayList doubling takes O(1) amortized, O(N) worst-case) and expect you to derive recurrence relations using the Master Theorem: T(N) = aT(N/b) + O(N^d).",
    quickRevision: [
      "10^8 operations per second is the threshold for 1.0s time limit in Online Assessments.",
      "Drop lower-order terms and multiplicative constants when taking asymptotic bounds.",
      "Binary search cuts the remaining search domain in half at each step, yielding O(log N).",
      "Auxiliary space measures additional memory allocated by the algorithm, excluding input storage.",
    ],
  },
  {
    id: "dsa-arrays-lesson",
    slug: "arrays",
    title: "Arrays: Contiguity, Memory Layout, and Cache Locality",
    track: "dsa",
    topicSlug: "arrays",
    topicTitle: "Arrays & Dynamic Arrays",
    order: 2,
    estimatedMinutes: 40,
    oneSentence:
      "Arrays are contiguous blocks of computer memory where elements are stored in adjacent memory addresses, enabling O(1) random access via direct pointer arithmetic but requiring O(N) shifts for arbitrary insertions.",
    whyDoWeNeedIt: {
      problem:
        "Modern CPUs do not fetch single bytes from RAM; they fetch 64-byte chunks called cache lines into ultra-fast L1/L2 hardware caches (~1 nanosecond latency vs ~100 nanoseconds for main RAM). Because array elements sit back-to-back in memory, reading element 0 automatically pre-loads elements 1, 2, and 3 into the CPU cache, making arrays orders of magnitude faster than pointer-chasing structures like linked lists.",
      realWorldAnalogy:
        "A printed encyclopedia volume vs individual index cards scattered across random shelves in a multi-story library. Flipping through consecutive pages in the book is instantaneous; gathering scattered cards requires walking miles.",
    },
    visualIntuition: `Hardware Memory Layout & 64-Byte CPU Cache Line:
-------------------------------------------------------------------------
RAM Address: 0x1000   0x1004   0x1008   0x100C   0x1010   0x1014
Element:    [ arr[0] ][ arr[1] ][ arr[2] ][ arr[3] ][ arr[4] ][ arr[5] ]
                 |
                 v (Hardware Pre-fetcher streams entire block in 1 cycle)
L1 CPU Cache: [ [0], [1], [2], [3], [4], [5] ] -> Instantaneous 1ns reads!

Random Access Formula:
Address of arr[i] = BaseAddress + (i * sizeof(DataType))
Example (32-bit int = 4 bytes):
arr[3] = 0x1000 + (3 * 4) = 0x100C (Computed in 1 single CPU instruction!)`,
    syntax: {
      operationsSummary: `// Operation Complexity Summary:
// - Access by index: arr[i]         -> O(1) time
// - Search (unsorted): scan all      -> O(N) time
// - Search (sorted): binary search  -> O(log N) time
// - Append at end (Dynamic Array)    -> O(1) amortized
// - Insert at beginning/middle       -> O(N) time (must shift elements right)
// - Delete at beginning/middle       -> O(N) time (must shift elements left)`,
      resizingCost: `// Dynamic Array Amortization (std::vector / ArrayList):
// When array capacity C fills up:
// 1. Allocate new memory block of size 2 * C
// 2. Copy all N existing elements to the new block
// 3. Deallocate old memory block
// Amortized cost per append across N insertions = O(1)!`,
    },
    example: {
      title: "Inserting into an array with boundary shifting",
      language: "java",
      code: `public class ArrayInsertion {
    // Inserts 'val' at 'index' for an array of capacity with current count 'n'
    public static void insertAt(int[] arr, int n, int index, int val) {
        if (index < 0 || index > n) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        // Shift all elements from index to n-1 one position to the right
        // Must iterate backwards to prevent overwriting values!
        for (int i = n - 1; i >= index; i--) {
            arr[i + 1] = arr[i];
        }
        arr[index] = val; // Place new element in freed slot
    }
}`,
      explanation:
        "Notice the backwards traversal `for (int i = n - 1; i >= index; i--)`. If you traverse forward from index, you would overwrite `arr[i+1]` before copying it, duplicating `arr[index]` across the entire array.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Contiguous Memory Reservation",
        description:
          "The operating system memory manager allocates a single uninterrupted slice of virtual address space.",
      },
      {
        step: 2,
        title: "Base Pointer Calculation",
        description:
          "The CPU computes target byte addresses via `BaseAddress + (index * ElementSize)` in a single hardware cycle without traversing preceding elements.",
      },
      {
        step: 3,
        title: "Hardware Spatial Pre-fetching",
        description:
          "CPU pre-fetchers identify sequential access patterns and preemptively stream subsequent cache lines into L1 cache before the code explicitly asks for them.",
      },
      {
        step: 4,
        title: "Dynamic Capacity Doubling",
        description:
          "When capacity is exceeded in an ArrayList or std::vector, a new array of $2\\times$ size is allocated, copying all $N$ elements. Because doubling occurs exponentially rarely ($1, 2, 4, 8, 16...$), the amortized insertion time remains strictly $O(1)$.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Forward shifting when inserting: arr[i + 1] = arr[i]",
        why: "Shifting left-to-right immediately clobbers the value at index + 1, resulting in the inserted value being duplicated across the rest of the array.",
        correct:
          "Always shift backward from the last element: for (int i = n - 1; i >= index; i--) arr[i + 1] = arr[i];",
      },
      {
        mistake: "Unchecked dynamic array growth in tight loops",
        why: "Repeatedly resizing dynamic arrays from capacity 1 causes multiple memory allocations and copying overhead ($1 + 2 + 4 + ... + N$).",
        correct:
          "Pre-size collections whenever the element count is known in advance: `new ArrayList<>(expectedSize)` or `vec.reserve(expectedSize)`.",
      },
      {
        mistake: "Assuming array variable assignment clones the contents",
        why: "In Java, Python, and JavaScript, `int[] b = a` copies only the memory reference pointer. Modifying `b[0]` modifies `a[0]`.",
        correct:
          "Use explicit cloning methods: `Arrays.copyOf(a, a.length)`, `a.slice()`, or `list(a)`.",
      },
    ],
    complexity: {
      time: "Read: O(1) | Search: O(N) | Insertion/Deletion at index: O(N)",
      space: "O(N) contiguous memory",
      explanation:
        "Contiguity provides unrivaled cache read speed and O(1) random indexing, balanced by the cost of element shifting on middle insertions.",
    },
    tryItYourself: {
      prompt:
        "Write an algorithm to rotate an array to the left by 1 position in-place (e.g. [1, 2, 3, 4] becomes [2, 3, 4, 1]).",
      hint: "Store arr[0] in a temporary variable, shift elements 1 through n-1 one position to the left, and assign the temporary variable to arr[n - 1].",
      solutionSnippet: `int temp = arr[0];
for (int i = 0; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1];
}
arr[arr.length - 1] = temp;`,
    },
    placementConnection:
      "Array fundamentals are the building blocks of almost every advanced data structure in Google interviews: Hash table buckets are arrays; binary heaps are array-represented complete binary trees; circular ring buffers are arrays with modulo arithmetic.",
    quickRevision: [
      "Physical RAM layout is contiguous: Address = Base + Index * ElementSize.",
      "Index access is instantaneous O(1) via base address arithmetic.",
      "Insertions and deletions require O(N) element shifts in the worst case.",
      "Spatial locality makes array traversals significantly faster than linked list pointer chasing.",
    ],
  },
  {
    id: "dsa-two-pointers-lesson",
    slug: "two-pointers",
    title: "The Two Pointers Technique: Monotonicity & Invariants",
    track: "dsa",
    topicSlug: "arrays",
    topicTitle: "Arrays & Dynamic Arrays",
    order: 3,
    estimatedMinutes: 35,
    oneSentence:
      "The Two Pointers technique coordinates two index markers that traverse a sequence synchronously or in opposing directions to eliminate redundant nested loops by exploiting sorted or monotonic invariants.",
    whyDoWeNeedIt: {
      problem:
        "A naive brute-force search over all pairs (i, j) in an array takes O(N^2) time. When data is sorted or possesses a directional property, checking every pair is wasteful because many pairs can be mathematically proven impossible. Two pointers eliminate entire sub-problems at each step, collapsing O(N^2) to O(N).",
      realWorldAnalogy:
        "Two inspectors starting from opposite ends of a bridge and walking towards the center. Instead of inspecting every pair of planks, they compare measurements as they converge, cutting the inspection distance in half.",
    },
    visualIntuition: `Opposing Pointers Invariant on a Sorted Array (Target Sum = 11):
-------------------------------------------------------------------------
Initial:
[ 1,   3,   5,   7,   9,   12 ]
  ^                         ^
left (0)                 right (5)
Sum = 1 + 12 = 13.
Since 13 > 11 and array is sorted:
Any pair using right=12 with left > 0 would have a sum even GREATER than 13!
Therefore, right=12 can be PERMANENTLY RULED OUT.
Action: right--

Step 2:
[ 1,   3,   5,   7,   9,   12 ]
  ^                   ^
left                 right
Sum = 1 + 9 = 10 < 11.
Any pair using left=1 with right < 4 would have a sum even SMALLER than 10!
Action: left++

Step 3:
[ 1,   3,   5,   7,   9,   12 ]
       ^              ^
      left           right
Sum = 3 + 9 = 12 > 11  =>  right--

Step 4:
[ 1,   3,   5,   7,   9,   12 ]
       ^         ^
      left      right
Sum = 3 + 7 = 10 < 11  =>  left++

Step 5:
[ 1,   3,   5,   7,   9,   12 ]
            ^    ^
           left right
Sum = 5 + 7 = 12 > 11  =>  right--

Convergence: left == right. Terminate in O(N) total pointer steps!`,
    syntax: {
      opposingTemplate: `// Opposing Two-Pointers (Convergence)
int left = 0, right = arr.length - 1;
while (left < right) {
    int sum = arr[left] + arr[right];
    if (sum == target) return new int[]{left, right};
    else if (sum < target) left++;   // Need larger sum
    else right--;                   // Need smaller sum
}`,
      fastSlowTemplate: `// Fast & Slow Pointers (Floyd's Tortoise and Hare / In-place compaction)
int slow = 0;
for (int fast = 0; fast < arr.length; fast++) {
    if (condition(arr[fast])) {
        arr[slow++] = arr[fast];
    }
}`,
    },
    example: {
      title: "Validating Palindrome String In-Place with Two Pointers",
      language: "java",
      code: `public class PalindromeVerification {
    public static boolean isPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            // Skip non-alphanumeric characters if evaluating clean string
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }

            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false; // Mismatch found
            }
            left++;
            right--;
        }
        return true;
    }
}`,
      explanation:
        "Instead of reversing the string (which allocates O(N) auxiliary space for a reversed copy), the converging two-pointer technique verifies symmetry in-place with strictly O(1) auxiliary space.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Define the Search Space & Invariant",
        description:
          "Identify the invariant condition (e.g. sorted order, monotonicity) that guarantees which pointer must move when a condition is violated.",
      },
      {
        step: 2,
        title: "Initialize Boundary Pointers",
        description:
          "Place `left = 0` and `right = n - 1` for opposing convergence, or `slow = 0` and `fast = 0` for sequence compaction and cycle detection.",
      },
      {
        step: 3,
        title: "Rule Out Elements Deterministically",
        description:
          "At each iteration, evaluate the current state. Based on the monotonic invariant, definitively rule out one of the candidates and advance the pointer.",
      },
      {
        step: 4,
        title: "Termination Guarantee",
        description:
          "Because every step strictly increases `left` or decreases `right`, the pointers meet in at most N total iterations, guaranteeing O(N) runtime.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using while (left <= right) when comparing distinct pairs",
        why: "When left equals right, you are pairing an element with itself, which is invalid if the problem requires two distinct items (e.g. Two Sum).",
        correct: "Use `while (left < right)` for distinct element pairs.",
      },
      {
        mistake: "Applying sorted two-pointer logic on an unsorted input",
        why: "Opposing two pointers rely on monotonicity. In an unsorted array, decrementing `right` does not guarantee a smaller sum, making the algorithm produce incorrect answers.",
        correct:
          "Sort the array first if original indices are not required, or use a Hash Map.",
      },
      {
        mistake: "Forgetting to skip duplicates in 3Sum problems",
        why: "Failing to increment/decrement pointers past identical values produces duplicate triplets in the output.",
        correct:
          "while (left < right && nums[left] == nums[left + 1]) left++; while (left < right && nums[right] == nums[right - 1]) right--;",
      },
    ],
    complexity: {
      time: "O(N) single pass",
      space: "O(1) auxiliary memory",
      explanation:
        "Each step advances either left or right. The total number of pointer movements across the entire execution is strictly bounded by N.",
    },
    tryItYourself: {
      prompt:
        "Given a sorted array of unique integers, return true if there exists a pair with difference equal to k (arr[j] - arr[i] == k).",
      hint: "Use two pointers moving in the SAME direction: i = 0, j = 1. If arr[j] - arr[i] < k, increment j; if > k, increment i.",
      solutionSnippet: `int i = 0, j = 1;
while (i < n && j < n) {
    if (i != j && arr[j] - arr[i] == k) return true;
    else if (arr[j] - arr[i] < k) j++;
    else i++;
}
return false;`,
    },
    placementConnection:
      "Two Pointers is the single most tested pattern at Google, Meta, and Amazon. It is the core mechanism behind: Two Sum II, 3Sum, 4Sum, Container With Most Water, Trapping Rain Water, Dutch National Flag (3-way partition), and Floyd's Cycle Finding.",
    quickRevision: [
      "Three archetypes: Opposing (left & right), Fast/Slow (cycle detection), and Directional (difference).",
      "Opposing two pointers require sorted data or monotonic property.",
      "Total pointer movements sum to at most N, guaranteeing linear O(N) runtime.",
      "Strictly O(1) auxiliary space requirement.",
    ],
  },
  {
    id: "dsa-strings-lesson",
    slug: "strings",
    title: "Strings & Pattern Matching: Immutability, Encodings & Algorithms",
    track: "dsa",
    topicSlug: "strings",
    topicTitle: "Strings & Pattern Matching",
    order: 4,
    estimatedMinutes: 45,
    oneSentence:
      "Strings are contiguous sequences of characters whose memory immutability in modern runtimes demands specialized pattern matching algorithms (KMP, Rabin-Karp) and mutable buffers to prevent O(N^2) memory reallocations.",
    whyDoWeNeedIt: {
      problem:
        "In Java, Python, and JavaScript, strings are immutable for security, thread-safety, and String Constant Pool deduplication. Appending characters in a naive loop creates a brand new string at every iteration, leading to an accidental O(N^2) time and memory explosion. Furthermore, naive substring search takes O(N * M) time, which fails on large DNA sequences or search engine indexing.",
      realWorldAnalogy:
        "A printed engraved stone tablet vs a whiteboard. An immutable string is like an engraved tablet: to change a single letter, you cannot erase; you must carve an entirely new tablet. A StringBuilder is a whiteboard where you can append, erase, and edit characters in-place.",
    },
    visualIntuition: `String Immutability & Reallocation Pitfall:
-------------------------------------------------------------------------
Naive loop: String s = ""; for (int i = 0; i < N; i++) s += "a";
Iter 1: [ "a" ]                       Allocates 1 byte
Iter 2: [ "aa" ]                      Copies 1 byte + allocates 2 bytes
Iter 3: [ "aaa" ]                     Copies 2 bytes + allocates 3 bytes
...
Iter N: [ "aaa...a" ]                 Copies (N-1) bytes + allocates N bytes
Total bytes copied = 1 + 2 + 3 + ... + N = N(N + 1) / 2  =>  O(N^2) DISASTER!

Solution: StringBuilder / list.append()
Maintains dynamic buffer with 2x doubling:
Capacity: [ _ _ _ _ ] -> [ a _ _ _ ] -> [ a a _ _ ] -> [ a a a _ ]
Amortized append time = O(1)! Total time = O(N).

KMP Prefix Function (LPS Array) Intuition:
Pattern: "A B A B C"
LPS:     [ 0, 0, 1, 2, 0 ]
When mismatch occurs after "ABAB", LPS tells us "AB" is both a prefix and suffix,
so we jump directly to index 2 without re-checking the first two characters!`,
    syntax: {
      idiomaticBuffers: `// Java: Use StringBuilder for in-place appends
StringBuilder sb = new StringBuilder();
for (char c : s.toCharArray()) sb.append(c);
String result = sb.toString();

// Python: Use list append and join
chars = []
for c in s: chars.append(c)
result = "".join(chars)

// C++: std::string is mutable in-place!
std::string s = "";
s.reserve(N); // Avoid reallocations
s.push_back('a');`,
    },
    example: {
      title: "Building the Longest Prefix Suffix (LPS) Array for KMP",
      language: "java",
      code: `public class KMPPrecomputation {
    // Computes the LPS (Longest Proper Prefix which is also a Suffix) array
    public static int[] computeLPS(String pattern) {
        int m = pattern.length();
        int[] lps = new int[m];
        int len = 0; // Length of the previous longest prefix suffix
        int i = 1;

        while (i < m) {
            if (pattern.charAt(i) == pattern.charAt(len)) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    // Fall back to previous longest prefix length
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        return lps;
    }
}`,
      explanation:
        "The LPS array pre-computes repetitive patterns inside the needle string in O(M) time. During search across a text of length N, whenever a mismatch occurs, the LPS value informs the matcher how many characters can be safely skipped without back-tracking the text pointer, achieving optimal O(N + M) search time.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Character Encoding & Memory Storage",
        description:
          "Characters are stored as numeric code points (ASCII 0-127, UTF-8 variable 1-4 bytes, or UTF-16). In Java, strings use byte arrays (`byte[]`) with Latin-1 compact strings optimization.",
      },
      {
        step: 2,
        title: "Avoid Quadratic Concatenation",
        description:
          "Always use mutable character buffers (`StringBuilder`, `std::string`, or list of strings in Python) to accumulate substrings in O(N) rather than O(N^2).",
      },
      {
        step: 3,
        title: "Frequency Counting with Fixed Arrays",
        description:
          "For problems involving anagrams or character counts with lowercase English letters ('a'-'z'), allocate a fixed `int[26]` frequency array instead of an expensive `HashMap<Character, Integer>` to gain 10x cache speedup.",
      },
      {
        step: 4,
        title: "Linear Pattern Matching (KMP & Rolling Hash)",
        description:
          "KMP utilizes the LPS array to prevent retreating the text pointer. Rabin-Karp computes a polynomial rolling hash in O(1) per sliding window step to match patterns in O(N + M) average time.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using `+` concatenation inside loops",
        why: "In Java/Python, string concatenation allocates a new object and copies all previous characters on every iteration, leading to O(N^2) runtime.",
        correct:
          "Use `StringBuilder` in Java, `''.join()` in Python, or pre-reserved `std::string` in C++.",
      },
      {
        mistake: "Using `==` to compare strings in Java",
        why: "`==` tests reference identity (whether both pointers point to the exact same memory address), not character sequence equality.",
        correct:
          "Always use `s1.equals(s2)` for value comparison in Java.",
      },
      {
        mistake: "Using HashMap for character frequencies when domain is known",
        why: "HashMaps have boxing/unboxing overhead, node pointer traversal, and hash collision checks.",
        correct:
          "Use a direct index array `int[] count = new int[26]` and access via `count[c - 'a']`.",
      },
    ],
    complexity: {
      time: "KMP Search: O(N + M) | Anagram Check: O(N) | String building: O(N)",
      space: "O(M) for pattern preprocessing (LPS table)",
      explanation:
        "Proper algorithmic string processing reduces naive O(N * M) substring comparisons down to strictly linear O(N + M) time.",
    },
    tryItYourself: {
      prompt:
        "Determine if two strings s and t are valid anagrams of each other using an O(1) auxiliary space array.",
      hint: "Use an int[26] array. Increment count for chars in s, decrement for chars in t. If all counts are zero, they are anagrams.",
      solutionSnippet: `if (s.length() != t.length()) return false;
int[] freq = new int[26];
for (int i = 0; i < s.length(); i++) {
    freq[s.charAt(i) - 'a']++;
    freq[t.charAt(i) - 'a']--;
}
for (int count : freq) {
    if (count != 0) return false;
}
return true;`,
    },
    placementConnection:
      "Google and top-tier tech firms frequently test string processing problems: Longest Substring Without Repeating Characters, Group Anagrams, Minimum Window Substring, String to Integer (atoi), and Text Justification. Interviewers look closely for correct handling of ASCII/Unicode boundaries and avoidance of O(N^2) string copies.",
    quickRevision: [
      "Strings are immutable in Java, Python, and JavaScript; always use mutable buffers in loops.",
      "Use `int[26]` or `int[128]` frequency arrays instead of HashMaps for fixed alphabets.",
      "KMP achieves O(N + M) pattern matching by using the LPS array to skip redundant comparisons.",
      "Rabin-Karp uses polynomial rolling hash `H = (H * BASE + char) % MOD` in sliding windows.",
    ],
  },
];
