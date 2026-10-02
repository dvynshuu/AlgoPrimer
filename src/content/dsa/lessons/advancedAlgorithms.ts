import { Lesson } from "@/types/content";

export const advancedAlgorithmsLessons: Lesson[] = [
  {
    id: "dsa-greedy-lesson",
    slug: "greedy",
    title: "Greedy Algorithms: Local Choices, Invariants & Exchange Arguments",
    track: "dsa",
    topicSlug: "greedy",
    topicTitle: "Greedy Algorithms",
    order: 15,
    estimatedMinutes: 45,
    oneSentence:
      "A greedy algorithm builds a solution piece-by-piece, always selecting the locally optimal choice in the mathematical hope that these decisions lead to a globally optimal solution.",
    whyDoWeNeedIt: {
      problem:
        "Exploring all subsets or permutations using Dynamic Programming or Backtracking often takes exponential O(2^N) or polynomial O(N^2) time. When a problem satisfies the Greedy Choice Property, we can make irreversible decisions at each step in O(1) or O(N log N) time, drastically reducing compute and memory costs.",
      realWorldAnalogy:
        "Giving change with standard currency coins ($0.25, $0.10, $0.05, $0.01). To make $0.41 with the minimum number of coins, you greedily take the largest possible coin ($0.25), then the next largest ($0.10), then one penny, yielding an optimal coin count without testing all combinations.",
    },
    visualIntuition: `Greedy Choice Property: Interval Scheduling:
-------------------------------------------------------------------------
Given N meeting requests: [ start, end ]. Maximize non-overlapping meetings!

Strategy A (Naive): Pick earliest start time.
Meeting 1: [ 8:00 AM ---------- 5:00 PM ]  <-- Blocks the entire day!
Meeting 2: [ 9:00 AM - 10:00 AM ]
Meeting 3: [ 10:30 AM - 11:30 AM ]
Result: Only 1 meeting scheduled. (FAILED!)

Strategy B (Greedy Optimal): Sort strictly by EARLIEST FINISH TIME!
Meeting 1: [ 9:00 AM - 10:00 AM ]  (Finishes at 10:00 AM)
Meeting 2: [ 10:30 AM - 11:30 AM ] (Finishes at 11:30 AM)
Meeting 3: [ 1:00 PM - 2:00 PM ]   (Finishes at 2:00 PM)
Result: 3 meetings scheduled. (OPTIMAL!)

Mathematical Exchange Argument Proof:
Suppose an optimal schedule OPT does not pick the meeting that finishes first (call it m*).
We can replace the first meeting in OPT with m* without creating any overlap,
because m* finishes earlier than or at the same time as OPT's first meeting.
Therefore, a greedy choice is always at least as good as any alternative!`,
    syntax: {
      sortingComparator: `// Standard Greedy Pattern: Sort Intervals by End Time
Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));

int count = 0;
int lastEndTime = Integer.MIN_VALUE;

for (int[] interval : intervals) {
    if (interval[0] >= lastEndTime) {
        count++;
        lastEndTime = interval[1]; // Greedily select this interval
    }
}`,
    },
    example: {
      title: "Jump Game I (Greedy Reachability in O(N) Time)",
      language: "java",
      code: `public class JumpGame {
    public static boolean canJump(int[] nums) {
        int maxReachable = 0;
        int n = nums.length;

        for (int i = 0; i < n; i++) {
            // If current index is beyond our maximum reach, we are stuck!
            if (i > maxReachable) {
                return false;
            }
            // Greedily extend maximum reachable index
            maxReachable = Math.max(maxReachable, i + nums[i]);

            // Early exit if end is already reachable
            if (maxReachable >= n - 1) {
                return true;
            }
        }
        return true;
    }
}`,
      explanation:
        "Instead of recursive backtracking (testing every jump distance from 1 to nums[i], which takes O(2^N)), we track a single variable `maxReachable`. At each index `i`, we update `maxReachable = max(maxReachable, i + nums[i])`. If `i` ever exceeds `maxReachable`, the end cannot be reached. Solves the problem in a single O(N) pass with O(1) space.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Verify Optimal Substructure",
        description:
          "An optimal solution to the overall problem must contain optimal solutions to its subproblems.",
      },
      {
        step: 2,
        title: "Prove the Greedy Choice Property",
        description:
          "Use the Exchange Argument: prove that swapping the first decision of an arbitrary optimal solution with our greedy choice never degrades the solution quality.",
      },
      {
        step: 3,
        title: "Sort by Comparator",
        description:
          "Greedy algorithms almost always require sorting the input beforehand (e.g. by end time, profit/weight ratio, or start time), taking O(N log N) time.",
      },
      {
        step: 4,
        title: "Single Pass Execution",
        description:
          "Iterate linearly through the sorted elements, committing to choices irrevocably without backtracking.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Applying greedy when decisions have non-local future dependencies",
        why: "In 0/1 Knapsack, greedy by value/weight fails because items cannot be divided fractionally. A high ratio item might leave unused capacity that could hold two better items.",
        correct:
          "Use Dynamic Programming when subproblems overlap and greedy choices cannot be mathematically proven.",
      },
      {
        mistake: "Sorting intervals by start time instead of end time for activity selection",
        why: "An interval starting early could be extremely long, blocking dozens of shorter compatible intervals.",
        correct: "Sort by earliest finish time: `(a, b) -> a[1] - b[1]`.",
      },
    ],
    complexity: {
      time: "O(N log N) due to initial sorting + O(N) linear scan",
      space: "O(1) auxiliary memory (or O(log N) for sorting stack)",
      explanation:
        "Greedy algorithms are among the fastest in computer science because they make irrevocable decisions without exploring alternate branches.",
    },
    tryItYourself: {
      prompt:
        "Given an array of meeting time intervals [start, end], return the minimum number of conference rooms required (Meeting Rooms II).",
      hint: "Separate start times and end times into two arrays and sort both. Use two pointers: when start[i] < end[j], a new room is needed (rooms++, i++); else a room is freed (j++, i++).",
      solutionSnippet: `int n = intervals.length;
int[] starts = new int[n], ends = new int[n];
for (int i = 0; i < n; i++) {
    starts[i] = intervals[i][0];
    ends[i] = intervals[i][1];
}
Arrays.sort(starts); Arrays.sort(ends);
int rooms = 0, endIdx = 0;
for (int i = 0; i < n; i++) {
    if (starts[i] < ends[endIdx]) rooms++;
    else endIdx++;
}
return rooms;`,
    },
    placementConnection:
      "Greedy questions are staple Google interviews: Non-overlapping Intervals, Gas Station, Minimum Number of Arrows to Burst Balloons, Jump Game I & II, and Task Scheduler. Interviewers will push you: 'Can you PROVE why this greedy choice is always optimal?'",
    quickRevision: [
      "Greedy choices must satisfy the Greedy Choice Property and Optimal Substructure.",
      "Prove greedy correctness using an Exchange Argument against a hypothetical optimal solution.",
      "Interval scheduling problems require sorting by finish time (`interval[1]`).",
      "When greedy fails due to state dependencies, transition to Dynamic Programming.",
    ],
  },
  {
    id: "dsa-backtracking-lesson",
    slug: "backtracking",
    title: "Backtracking: State Space Trees, Pruning & Constraint Satisfaction",
    track: "dsa",
    topicSlug: "backtracking",
    topicTitle: "Backtracking",
    order: 16,
    estimatedMinutes: 50,
    oneSentence:
      "Backtracking is an algorithmic technique for solving constraint satisfaction problems by incrementally building candidates and abandoning ('backtracking') branches as soon as they are determined incapable of completing a valid solution.",
    whyDoWeNeedIt: {
      problem:
        "Many combinatorial problems (Sudoku solving, N-Queens, generating all valid subsets/permutations) have immense search spaces (e.g. 9^81 for Sudoku). Brute force testing every combination would take trillions of years. Backtracking prunes invalid branches immediately, reducing the search space by 99.999%.",
      realWorldAnalogy:
        "Navigating a labyrinth maze. At each fork, you pick a path and leave chalk marks. If you hit a dead end, you backtrack to the last fork, erase your temporary path, and try the next direction.",
    },
    visualIntuition: `State Space Tree & Branch Pruning for Subsets of [1, 2, 3]:
-------------------------------------------------------------------------
Root: []
  |
  +-- Pick 1: [1]
  |     |
  |     +-- Pick 2: [1, 2]
  |     |     |
  |     |     +-- Pick 3: [1, 2, 3] (Leaf)
  |     |     |   Backtrack: remove 3
  |     |
  |     +-- Pick 3: [1, 3] (Leaf)
  |           Backtrack: remove 3
  |     Backtrack: remove 1
  |
  +-- Pick 2: [2]
  |     |
  |     +-- Pick 3: [2, 3]
  |     Backtrack: remove 2
  |
  +-- Pick 3: [3]

The 3-Step Backtracking Cycle:
1. CHOOSE: Add candidate element to current state.
2. EXPLORE: Recurse deeper down the decision tree.
3. UNCHOOSE (Backtrack): Revert state back to previous form!`,
    syntax: {
      universalBacktrackTemplate: `// The Universal Canonical Backtracking Template
public void backtrack(State state, int start, List<Result> results) {
    if (isGoal(state)) {
        results.add(new Result(state)); // Must deep-copy state!
        return;
    }

    for (int i = start; i < choices.length; i++) {
        if (!isValid(choices[i], state)) continue; // PRUNE BRANCH!

        state.add(choices[i]);              // 1. CHOOSE
        backtrack(state, i + 1, results);    // 2. EXPLORE
        state.remove(state.size() - 1);     // 3. UNCHOOSE (BACKTRACK)
    }
}`,
    },
    example: {
      title: "Generating All Subsets (Power Set) in Lexicographical Order",
      language: "java",
      code: `public class Subsets {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }

    private static void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {
        // Every state in the power set tree is a valid subset:
        result.add(new ArrayList<>(current)); // Deep-copy current path!

        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);                  // 1. Choose
            backtrack(nums, i + 1, current, result); // 2. Explore
            current.remove(current.size() - 1);    // 3. Unchoose (Backtrack)
        }
    }
}`,
      explanation:
        "Notice line 10: `result.add(new ArrayList<>(current))`. Because `current` is a single mutable list modified across recursive calls, storing `current` directly would result in all elements being empty when the function completes. Deep-copying captures the snapshot of the path.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Define the State Representation",
        description:
          "Identify how the partial solution is represented (e.g. `List<Integer>` for subsets, 2D array for Sudoku, boolean bitmasks for visited rows/columns).",
      },
      {
        step: 2,
        title: "Identify Base/Goal Condition",
        description:
          "Define when a path has reached a full solution and should be saved to the results list.",
      },
      {
        step: 3,
        title: "Enforce Early Pruning (Constraint Checks)",
        description:
          "Check constraints BEFORE recursing. If adding a number violates a Sudoku rule or N-Queens diagonal, skip the branch immediately.",
      },
      {
        step: 4,
        title: "State Restoration (Unchoose)",
        description:
          "After returning from recursion, undo the state change to restore the environment for the next iteration of the loop.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Adding the mutable state reference directly to results: result.add(current)",
        why: "In Java/Python/JS, objects are passed by reference. When backtracking empties `current`, all saved entries in `result` become empty lists `[]`.",
        correct: "Always create a clone: `result.add(new ArrayList<>(current))` or `result.append(list(current))`.",
      },
      {
        mistake: "Forgetting to sort input array when handling duplicate elements (Subsets II / Permutations II)",
        why: "To skip duplicate branches with `if (i > start && nums[i] == nums[i - 1]) continue;`, identical elements must be adjacent.",
        correct: "Always call `Arrays.sort(nums)` before running backtracking with duplicates.",
      },
    ],
    complexity: {
      time: "Subsets: O(2^N) | Permutations: O(N!) | Combinations: O(C(N, K))",
      space: "O(N) auxiliary space on call stack (depth equals number of decision levels)",
      explanation:
        "The call stack depth never exceeds N, providing compact O(N) memory even when generating millions of combinations.",
    },
    tryItYourself: {
      prompt:
        "Generate all permutations of a collection of distinct integers [nums].",
      hint: "Instead of a start index, use a boolean[] used array. In the loop from 0 to n-1: if (used[i]) continue. Mark used[i] = true, recurse, then unmark used[i] = false.",
      solutionSnippet: `List<List<Integer>> res = new ArrayList<>();
boolean[] used = new boolean[nums.length];
backtrack(nums, used, new ArrayList<>(), res);
return res;

void backtrack(int[] nums, boolean[] used, List<Integer> curr, List<List<Integer>> res) {
    if (curr.size() == nums.length) {
        res.add(new ArrayList<>(curr));
        return;
    }
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        used[i] = true; curr.add(nums[i]);
        backtrack(nums, used, curr, res);
        curr.remove(curr.size() - 1); used[i] = false;
    }
}`,
    },
    placementConnection:
      "Google interviewers evaluate backtracking when testing exhaustive search under constraints: N-Queens, Sudoku Solver, Word Search I & II (Trie + Backtracking), Combination Sum, and Palindrome Partitioning.",
    quickRevision: [
      "The 3-Step Cycle: Choose, Explore, Unchoose (Backtrack).",
      "Always deep-copy mutable states when adding to final results (`new ArrayList<>(curr)`).",
      "Prune invalid branches early to avoid exponential search space explosion.",
      "Sort the input first if you need to skip duplicate subsets or permutations.",
    ],
  },
  {
    id: "dsa-dynamic-programming-lesson",
    slug: "dynamic-programming",
    title: "Dynamic Programming: Memoization, Tabulation & Space Optimization",
    track: "dsa",
    topicSlug: "dynamic-programming",
    topicTitle: "Dynamic Programming (DP)",
    order: 18,
    estimatedMinutes: 60,
    oneSentence:
      "Dynamic Programming solves optimization problems by breaking them into overlapping subproblems with optimal substructure, caching intermediate results to prevent exponential re-computation.",
    whyDoWeNeedIt: {
      problem:
        "Naive recursive solutions to problems like Longest Common Subsequence or 0/1 Knapsack evaluate identical sub-states billions of times, resulting in exponential O(2^N) time complexity. By storing solutions to subproblems in a cache (memoization table or DP array), DP collapses the computation into polynomial time (e.g. O(N * W)).",
      realWorldAnalogy:
        "Writing down '1 + 1 + 1 + 1 = 4' on a piece of paper. If someone adds another '+ 1' at the end, how do you know the new answer is 5? You don't recount from the beginning; you remember that the previous sum was 4, and add 1. Dynamic Programming is remembering the past to solve the future.",
    },
    visualIntuition: `Overlapping Subproblems: Recursion Tree for fib(5):
-------------------------------------------------------------------------
                     fib(5)
                   /        \\
              fib(4)          fib(3)  <-- Duplicate computation!
             /      \\        /      \\
         fib(3)    fib(2)  fib(2)   fib(1)
         /    \\
      fib(2)  fib(1)
Notice: fib(3) is computed TWICE; fib(2) is computed THREE TIMES!
Total calls without DP = 2^N.
With DP Memoization: First time fib(3) finishes, store cache[3] = 2.
Subsequent calls return cache[3] in O(1) instant time!
Total calls with DP = Strictly N steps!

The 4-Step Dynamic Programming Framework:
1. STATE DEFINITION: What does dp[i][j] represent in plain English?
2. RECURRENCE RELATION: Express dp[i] as a function of previous states dp[i-1], dp[i-2]...
3. BASE CASES: Initialize trivial starting points (e.g. dp[0] = 1, dp[1] = 1).
4. COMPUTATION ORDER & SPACE OPTIMIZATION: Bottom-up iteration; reduce 2D table to 1D array!`,
    syntax: {
      memoizationTopDown: `// Top-Down Memoization Template
int[] memo = new int[n + 1];
Arrays.fill(memo, -1);

public int solve(int i) {
    if (i <= 1) return i; // Base case
    if (memo[i] != -1) return memo[i]; // Cache hit!
    return memo[i] = solve(i - 1) + solve(i - 2); // Store and return
}`,
      tabulationBottomUp: `// Bottom-Up Tabulation Template with O(1) Space Optimization
public int fib(int n) {
    if (n <= 1) return n;
    int prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
    },
    example: {
      title: "0/1 Knapsack Problem with 1D Space Optimization",
      language: "java",
      code: `public class Knapsack {
    public static int knapsack(int W, int[] weights, int[] values, int n) {
        // dp[w] stores the maximum value obtainable with capacity w
        int[] dp = new int[W + 1];

        for (int i = 0; i < n; i++) {
            // Traverse BACKWARDS so each item is used at most ONCE (0/1 Knapsack)!
            for (int w = W; w >= weights[i]; w--) {
                dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
            }
        }
        return dp[W];
    }
}`,
      explanation:
        "The standard 2D recurrence is `dp[i][w] = max(dp[i-1][w], values[i] + dp[i-1][w - weights[i]])`. Since state `i` only depends on the previous row `i - 1`, we compress the 2D table into a 1D array. By iterating `w` BACKWARDS from `W` down to `weights[i]`, `dp[w - weights[i]]` still contains values from the previous item `i - 1`, preventing the same item from being chosen multiple times.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Identify Two Core Preconditions",
        description:
          "Verify: (1) Overlapping Subproblems (identical states are evaluated multiple times); (2) Optimal Substructure (optimal solution to problem incorporates optimal solutions to subproblems).",
      },
      {
        step: 2,
        title: "Define Exact Semantic Meaning of DP State",
        description:
          "State precision is critical: e.g. 'dp[i] represents the length of the Longest Increasing Subsequence ending at index i'.",
      },
      {
        step: 3,
        title: "Formulate Recurrence Relation",
        description:
          "Express the transition between subproblems algebraically based on the decisions available at state `i`.",
      },
      {
        step: 4,
        title: "Rolling Array Space Optimization",
        description:
          "If `dp[i]` only depends on `dp[i - 1]`, compress from O(N * W) space to O(W) space by keeping only the previous row or rolling variables.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Traversing forwards in 1D array for 0/1 Knapsack",
        why: "If you iterate forward (`for int w = weights[i]; w <= W; w++`), you use the updated value of `dp[w - weights[i]]` from the CURRENT item, which turns 0/1 Knapsack into Unbounded Knapsack (item reused infinitely).",
        correct:
          "Always iterate backwards `for (int w = W; w >= weights[i]; w--)` for 0/1 Knapsack.",
      },
      {
        mistake: "Off-by-one errors in table size (+1 required)",
        why: "To store states from index 0 to N inclusive (representing 0 elements to N elements), the array must be allocated with size `N + 1`.",
        correct: "Allocate `new int[N + 1][W + 1]`.",
      },
    ],
    complexity: {
      time: "O(Number of States * Time per State Transition) e.g. O(N * W)",
      space: "O(Number of States) -> optimizable to O(State Dimension) with rolling arrays",
      explanation:
        "DP converts exponential branching trees into a dense matrix of subproblem evaluations.",
    },
    tryItYourself: {
      prompt:
        "Given an integer array nums, return the length of the longest strictly increasing subsequence (LIS).",
      hint: "Let dp[i] be the length of LIS ending at nums[i]. For every j < i where nums[j] < nums[i], dp[i] = max(dp[i], dp[j] + 1). Return the maximum value in dp.",
      solutionSnippet: `int[] dp = new int[nums.length];
Arrays.fill(dp, 1);
int maxLen = 1;
for (int i = 1; i < nums.length; i++) {
    for (int j = 0; j < i; j++) {
        if (nums[j] < nums[i]) {
            dp[i] = Math.max(dp[i], dp[j] + 1);
        }
    }
    maxLen = Math.max(maxLen, dp[i]);
}
return maxLen;`,
    },
    placementConnection:
      "Dynamic Programming is the most feared and respected topic in Google interviews: Coin Change, Longest Increasing Subsequence (O(N log N) patience sorting), Edit Distance, Maximal Square, Word Break, and House Robber. Interviewers expect you to first state the recurrence relation cleanly, then optimize auxiliary space.",
    quickRevision: [
      "DP applies when problems have Overlapping Subproblems and Optimal Substructure.",
      "Top-Down = Recursion + Memoization; Bottom-Up = Iteration + Tabulation.",
      "In 0/1 Knapsack 1D space optimization, iterate capacity backwards from W down to weight.",
      "Always verify base cases (e.g. index 0) and check if space can be reduced with rolling variables.",
    ],
  },
  {
    id: "dsa-bit-manipulation-lesson",
    slug: "bit-manipulation",
    title: "Bit Manipulation: Binary Arithmetic, Two's Complement & Bitmasks",
    track: "dsa",
    topicSlug: "bit-manipulation",
    topicTitle: "Bit Manipulation",
    order: 19,
    estimatedMinutes: 40,
    oneSentence:
      "Bit manipulation operates directly on binary digits (bits) of integers at the CPU hardware register level, providing O(1) ultra-fast mathematical operations and compact exponential state representations.",
    whyDoWeNeedIt: {
      problem:
        "Tracking visited states for a set of 20 items in a Graph or DP problem naively requires an array or HashSet, consuming megabytes of RAM and slow object allocations. A single 32-bit integer acts as a bitmask where the i-th bit represents presence or absence of the i-th item, enabling instant O(1) bitwise set operations in 4 bytes of memory.",
      realWorldAnalogy:
        "A panel of 8 toggle light switches. Instead of writing down a 8-page status report on paper, you represent the entire room's lights with a single byte: 10100101 (where 1 is ON and 0 is OFF). Reading or flipping a switch takes 1 CPU clock cycle.",
    },
    visualIntuition: `Bitwise Operators & Two's Complement:
-------------------------------------------------------------------------
A = 12 (binary: 1100)
B = 10 (binary: 1010)

AND  (&) : 1000 (8)  - Both bits must be 1
OR   (|) : 1110 (14) - Either bit is 1
XOR  (^) : 0110 (6)  - Bits must differ (Crucial XOR properties: x ^ x = 0, x ^ 0 = x)
NOT  (~) : Inverts all bits (~0 = -1 in Two's Complement)
LEFT SHIFT  (<<): Multiply by 2^k: (1 << 3) = 8
RIGHT SHIFT (>>): Divide by 2^k (Sign-extending arithmetic shift)
UNSIGNED RIGHT SHIFT (>>>): Zero-fills left side (Logical shift)

Brian Kernighan's Algorithm: n & (n - 1)
Clears the LOWEST SET BIT in a number:
n       = 12 = 1 1 0 0
n - 1   = 11 = 1 0 1 1
n & n-1 =      1 0 0 0 (The lowest set bit at index 2 was CLEARED in 1 operation!)
Counts set bits in O(Count of 1s), NOT O(32)!`,
    syntax: {
      bitTricksSummary: `// Core Bit Manipulation Idioms:
// 1. Check if i-th bit is set:
boolean isSet = (n & (1 << i)) != 0;

// 2. Set the i-th bit:
n = n | (1 << i);

// 3. Clear the i-th bit:
n = n & ~(1 << i);

// 4. Toggle the i-th bit:
n = n ^ (1 << i);

// 5. Isolate the lowest set bit:
int lowestBit = n & (-n);

// 6. Check if n is a power of 2:
boolean isPowerOfTwo = (n > 0) && ((n & (n - 1)) == 0);`,
    },
    example: {
      title: "Finding the Single Non-Duplicate Number using XOR Invariance",
      language: "java",
      code: `public class SingleNumber {
    public static int singleNumber(int[] nums) {
        int xorSum = 0;
        // Exploit XOR algebraic properties:
        // 1. Associative & Commutative: order of XOR does not matter
        // 2. x ^ x = 0 (every paired number cancels itself out to 0!)
        // 3. 0 ^ unique = unique
        for (int num : nums) {
            xorSum ^= num;
        }
        return xorSum; // Only the unique element remains!
    }
}`,
      explanation:
        "In an array where every element appears twice except one, naive hashing takes O(N) time and O(N) memory. By XOR-ing all elements together, all duplicate numbers cancel out to zero (`x ^ x = 0`). The final result is the unique number, achieved in O(N) time and strictly O(1) auxiliary space.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Two's Complement Representation",
        description:
          "In modern computer systems, negative numbers are stored in Two's Complement: `-x = ~x + 1`. This mathematical symmetry means `x & (-x)` isolates the lowest set bit in a single CPU instruction.",
      },
      {
        step: 2,
        title: "Bitmask Subsets Generation",
        description:
          "An integer mask from 0 to (2^N - 1) uniquely encodes all 2^N subsets of N items. If `(mask & (1 << i)) != 0`, item `i` is included in the subset.",
      },
      {
        step: 3,
        title: "Hardware Register Execution",
        description:
          "Bitwise operations (`AND`, `OR`, `XOR`, `SHIFTS`) execute in 1 single CPU cycle inside the ALU, significantly outperforming multiplication and division.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Operator precedence pitfall: if (n & 1 == 0)",
        why: "In Java/C++/JS, the equality operator `==` has HIGHER precedence than bitwise `&`! So `n & 1 == 0` evaluates as `n & (1 == 0)` => `n & 0` => `0` (false).",
        correct: "Always use parentheses: `if ((n & 1) == 0)`.",
      },
      {
        mistake: "Shift overflow with 32-bit integers: 1 << 35",
        why: "In Java, shifting an `int` masks the shift distance to 5 bits (`35 % 32 = 3`), resulting in `1 << 3 = 8` instead of 2^35.",
        correct: "Cast to 64-bit long: `1L << 35`.",
      },
    ],
    complexity: {
      time: "O(1) per bitwise operation",
      space: "O(1) auxiliary memory",
      explanation:
        "Bitwise operations are executed directly by machine instructions in the CPU register file.",
    },
    tryItYourself: {
      prompt:
        "Count the number of 1 bits in an unsigned integer (Hamming Weight / Population Count).",
      hint: "Use Brian Kernighan's algorithm: while (n != 0), n = n & (n - 1) and count++.",
      solutionSnippet: `int count = 0;
while (n != 0) {
    n = n & (n - 1); // Clears the lowest set bit
    count++;
}
return count;`,
    },
    placementConnection:
      "Bit manipulation is heavily tested in Google and systems engineering interviews: Single Number I, II & III, Counting Bits, Reverse Bits, Subsets using Bitmask, Bitwise AND of Numbers Range, and Traveling Salesperson Problem with Bitmask DP.",
    quickRevision: [
      "`n & (n - 1)` clears the lowest set bit; `n & (-n)` isolates the lowest set bit.",
      "XOR properties: `x ^ x = 0`, `x ^ 0 = x`, order does not matter.",
      "Check if power of two: `(n > 0) && ((n & (n - 1)) == 0)`.",
      "Always wrap bitwise expressions in parentheses due to operator precedence: `(n & (1 << i)) != 0`.",
    ],
  },
  {
    id: "dsa-advanced-patterns-lesson",
    slug: "advanced-patterns",
    title: "Advanced Interview Patterns: Trie (Prefix Tree), Segment Tree & DSU",
    track: "dsa",
    topicSlug: "advanced-patterns",
    topicTitle: "Advanced Interview Patterns",
    order: 20,
    estimatedMinutes: 60,
    oneSentence:
      "Advanced patterns solve specialized query and prefix workloads: Tries provide O(L) string prefix lookups; Segment Trees answer range queries and point updates in O(log N); and Disjoint Set Union (DSU) tracks connected partitions in O(α(N)).",
    whyDoWeNeedIt: {
      problem:
        "Google processes billions of search autocomplete queries per second. Storing 100 million dictionary words in a HashMap allows exact match in O(L), but searching for all words starting with prefix 'goog' requires scanning the entire dictionary in O(N * L). A Trie (Prefix Tree) finds all prefix matches in O(PrefixLength) independent of dictionary size.",
      realWorldAnalogy:
        "A multi-level company phone directory tree. Dialing '4' narrows down to all departments starting with 4; dialing '4-1' narrows down further. You don't read every phone number in the book; each keypress navigates one branch deeper in the tree.",
    },
    visualIntuition: `Trie (Prefix Tree) Structure for Words: ["cat", "cap", "car", "dog"]:
-------------------------------------------------------------------------
                     (Root)
                    /      \\
                  'c'      'd'
                   |        |
                  'a'      'o'
                 / | \\      |
               't' 'p' 'r' 'g'
                *   *   *   *  (* denotes isEndOfWord = true)

Prefix Lookup for "ca":
Root -> 'c' -> 'a' -> [ Returns sub-branches: 't' (cat), 'p' (cap), 'r' (car) ]
Time complexity: Strictly O(L) where L is length of prefix, independent of 100M total words!

Segment Tree Range Query & Point Update:
Array: [ 1, 3, 5, 7, 9, 11 ]
A binary tree where each node stores the aggregate (e.g. SUM or MIN) of its interval [L, R]:
Root: [0..5] (Sum = 36)
Left: [0..2] (Sum = 9)        Right: [3..5] (Sum = 27)
Range sum query in [1..4] decomposes into O(log N) tree nodes!
Point update: Modifying 1 element updates only log2(N) ancestor nodes!`,
    syntax: {
      trieNodeDefinition: `// Standard Trie Node
public class TrieNode {
    TrieNode[] children = new TrieNode[26]; // 26 lowercase English letters
    boolean isEndOfWord = false;
}`,
      dsuTemplate: `// Disjoint Set Union (Union-Find) with Path Compression & Rank
class DSU {
    int[] parent, rank;
    DSU(int n) {
        parent = new int[n]; rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression!
    }
    boolean union(int i, int j) {
        int rootI = find(i), rootJ = find(j);
        if (rootI == rootJ) return false; // Already connected (Cycle!)
        if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
        else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
        else { parent[rootJ] = rootI; rank[rootI]++; }
        return true;
    }
}`,
    },
    example: {
      title: "Implementing a Prefix Tree (Trie) with Insert, Search & StartsWith",
      language: "java",
      code: `public class Trie {
    private static class Node {
        Node[] children = new Node[26];
        boolean isEnd = false;
    }

    private final Node root = new Node();

    // Inserts word into trie in O(L) time
    public void insert(String word) {
        Node curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) {
                curr.children[idx] = new Node();
            }
            curr = curr.children[idx];
        }
        curr.isEnd = true;
    }

    // Returns true if word is in trie in O(L) time
    public boolean search(String word) {
        Node node = getNode(word);
        return node != null && node.isEnd;
    }

    // Returns true if there is any word starting with prefix in O(P) time
    public boolean startsWith(String prefix) {
        return getNode(prefix) != null;
    }

    private Node getNode(String s) {
        Node curr = root;
        for (char c : s.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return null;
            curr = curr.children[idx];
        }
        return curr;
    }
}`,
      explanation:
        "Each node has an array of 26 child references. Inserting or searching a word of length L requires traversing exactly L pointers, which is completely independent of how many millions of words are stored in the Trie. This powers search auto-complete and spell checkers.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Trie (Prefix Tree) Character Pointer Graph",
        description:
          "Words sharing common prefixes share common ancestor nodes in memory, enabling prefix matching in O(Length) and Bitwise Trie maximum XOR queries in O(32).",
      },
      {
        step: 2,
        title: "Disjoint Set Union (DSU / Union-Find)",
        description:
          "Maintains partitions of elements into disjoint sets. Path compression flattens tree depth during `find()`, while Union by Rank attaches smaller trees under larger roots, achieving inverse Ackermann O(α(N)) near-constant runtime.",
      },
      {
        step: 3,
        title: "Segment Tree Range & Update Queries",
        description:
          "A static binary tree of size 4N where each node stores the associative aggregate (sum, min, max, gcd) of a subarray. Querying any range [L, R] takes O(log N) time, and updating a single value takes O(log N) time.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Allocating 26 child nodes eagerly in TrieNode constructor",
        why: "In a sparse Trie with millions of words, pre-allocating large arrays or objects for every child node consumes hundreds of megabytes of empty references.",
        correct:
          "Initialize child references on-demand when letters actually appear: `if (curr.children[idx] == null) curr.children[idx] = new Node();`.",
      },
      {
        mistake: "Missing Path Compression in Disjoint Set Union find()",
        why: "Without path compression (`parent[i] = find(parent[i])`), the DSU tree can degrade into a linear chain of depth N, slowing union and find operations to O(N).",
        correct:
          "Always implement path compression: `return parent[i] = find(parent[i]);`.",
      },
    ],
    complexity: {
      time: "Trie Insert/Search: O(L) | DSU Union/Find: O(α(N)) ≈ O(1) | Segment Tree Query: O(log N)",
      space: "Trie: O(Total Characters) | DSU: O(N) arrays | Segment Tree: O(4N) array",
      explanation:
        "Advanced data structures achieve optimal logarithmic or near-constant asymptotic bounds for complex multi-dimensional queries.",
    },
    tryItYourself: {
      prompt:
        "Given an array of strings words, find the maximum XOR of any two elements using a Bitwise Trie.",
      hint: "Insert the 32-bit binary representations of all numbers into a Trie with 2 children (0 and 1). For each number, greedily navigate down the OPPOSITE bit (1 ^ 0 = 1) to maximize the result.",
      solutionSnippet: `// Maximum XOR of Two Numbers in an Array
// 1. Insert numbers into binary trie (bit 31 down to 0)
// 2. For each number, greedily take opposite bit if child exists to maximize XOR sum
// Achieves optimal O(32 * N) = O(N) runtime!`,
    },
    placementConnection:
      "Advanced patterns are the differentiator between L3 and L4/L5 offers at Google: Implement Trie (Prefix Tree), Word Search II, Redundant Connection (DSU), Maximum XOR of Two Numbers in an Array, and Range Sum Query - Mutable (Segment Tree).",
    quickRevision: [
      "Trie enables O(L) prefix search and autocomplete, independent of dictionary size.",
      "DSU with Path Compression and Union by Rank achieves amortized O(α(N)) near-constant time.",
      "Segment Trees support range queries and point updates in O(log N) time using 4N array space.",
      "Bitwise Tries solve Maximum XOR problems in linear O(32 * N) = O(N) time.",
    ],
  },
];
