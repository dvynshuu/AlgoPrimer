import { Problem } from "@/types/content";

export const dpProblems: Problem[] = [
  {
    id: "climbing-stairs",
    slug: "climbing-stairs",
    title: "Climbing Stairs",
    topic: "Dynamic Programming",
    subtopic: "1D State Transition / Fibonacci Pattern",
    difficulty: "Easy",
    progressionLevel: "Level 1: Concept Understanding",
    statement:
      "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?",
    understandTheProblem:
      "To reach step `n`, your very last step was either from step `n - 1` (a 1-step hop) or from step `n - 2` (a 2-step hop). Therefore, `ways(n) = ways(n - 1) + ways(n - 2)`. This is mathematically identical to the Fibonacci sequence.",
    constraints: [
      "1 <= n <= 45",
    ],
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps.",
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways: 1. 1+1+1, 2. 1+2, 3. 2+1.",
      },
    ],
    hints: [
      "How many ways to reach step 1? Exactly 1 (take 1 step).",
      "How many ways to reach step 2? Exactly 2 (1+1 or 2).",
      "For step 3: you can reach it from step 2 (2 ways) or from step 1 (1 way). Total = 1 + 2 = 3.",
      "You only ever need the previous two values to compute the current step.",
    ],
    bruteForce: {
      title: "Approach 1 — Pure Recursion",
      intuition:
        "Define `climb(n) = climb(n - 1) + climb(n - 2)` with base cases `climb(1) = 1` and `climb(2) = 2`.",
      code: {
        java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        return climbStairs(n - 1) + climbStairs(n - 2);
    }
}`,
        cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        return climbStairs(n - 1) + climbStairs(n - 2);
    }
};`,
        python: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        return self.climbStairs(n - 1) + self.climbStairs(n - 2)`,
        javascript: `var climbStairs = function(n) {
    if (n <= 2) return n;
    return climbStairs(n - 1) + climbStairs(n - 2);
};`,
      },
      timeComplexity: "O(2^n)",
      spaceComplexity: "O(n) recursion call stack",
      explanation:
        "The recursive tree duplicates subproblems exponentially. For n = 45, 2^45 operations exceeds 3.5 * 10^13, which takes hours to finish without memoization.",
    },
    optimalSolution: {
      title: "Approach 2 — Iterative DP with O(1) Space Variables",
      intuition:
        "Since `dp[i]` depends only on `dp[i - 1]` and `dp[i - 2]`, we don't need to store the entire array of size `n`. Maintain two variables `prev2` and `prev1`. At each step, compute `curr = prev1 + prev2`, then shift forward.",
      code: {
        java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;

        int prev2 = 1; // ways(1)
        int prev1 = 2; // ways(2)

        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }

        return prev1;
    }
}`,
        cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;

        int prev2 = 1;
        int prev1 = 2;

        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }

        return prev1;
    }
};`,
        python: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n

        prev2, prev1 = 1, 2
        for _ in range(3, n + 1):
            curr = prev1 + prev2
            prev2 = prev1
            prev1 = curr

        return prev1`,
        javascript: `var climbStairs = function(n) {
    if (n <= 2) return n;

    let prev2 = 1;
    let prev1 = 2;

    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      whyOptimal:
        "Takes exactly n - 2 iterations in a simple loop using only two primitive integer variables.",
    },
    pattern: "Dynamic Programming (Fibonacci Transition)",
    complexitySummary: {
      time: "O(n)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "n = 4",
      steps: [
        {
          stepNumber: 1,
          state: "n=4. prev2=1 (step 1), prev1=2 (step 2)",
          action: "i=3: curr = 1 + 2 = 3. prev2=2, prev1=3.",
          result: "ways(3) = 3",
        },
        {
          stepNumber: 2,
          state: "prev2=2, prev1=3",
          action: "i=4: curr = 3 + 2 = 5. prev2=3, prev1=5.",
          result: "ways(4) = 5",
        },
        {
          stepNumber: 3,
          state: "Loop ends",
          action: "Return prev1 = 5.",
          result: "5 distinct ways",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Allocating a full DP array of size n when only the previous 2 values are required",
        fix: "Reduce O(n) space to O(1) space using two rolling variables.",
      },
      {
        mistake: "Edge case n=1 causing index out of bounds or loop skips",
        fix: "Check `if (n <= 2) return n;` before starting the loop from 3.",
      },
    ],
    variations: [
      "Min Cost Climbing Stairs",
      "House Robber",
      "Fibonacci Number",
    ],
    practice: [
      { title: "Min Cost Climbing Stairs", difficulty: "Easy" },
      { title: "House Robber", difficulty: "Medium" },
    ],
    tags: ["Math", "Dynamic Programming", "Memoization"],
    companies: ["Amazon", "TCS", "Infosys", "Adobe", "Apple"],
  },
  {
    id: "coin-change",
    slug: "coin-change",
    title: "Coin Change",
    topic: "Dynamic Programming",
    subtopic: "Unbounded Knapsack / Minimum Cost Formulation",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`. You may assume that you have an infinite number of each kind of coin.",
    understandTheProblem:
      "We want to form exact sum `amount` using the minimum total quantity of coins. Each coin value can be chosen multiple times (unbounded knapsack).",
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4",
    ],
    examples: [
      {
        input: "coins = [1,2,5], amount = 11",
        output: "3",
        explanation: "11 = 5 + 5 + 1 (3 coins).",
      },
      {
        input: "coins = [2], amount = 3",
        output: "-1",
        explanation: "Cannot make odd amount 3 with only coin 2.",
      },
      {
        input: "coins = [1], amount = 0",
        output: "0",
        explanation: "Amount 0 requires 0 coins.",
      },
    ],
    hints: [
      "Why doesn't greedy (taking largest coin first) work? Consider coins = [1, 3, 4] and amount = 6. Greedy takes 4 + 1 + 1 (3 coins), but optimal is 3 + 3 (2 coins).",
      "Let dp[a] be the minimum coins needed to make amount a.",
      "For each coin c: if a >= c, dp[a] = min(dp[a], dp[a - c] + 1).",
    ],
    bruteForce: {
      title: "Approach 1 — Greedy (Incorrect, but common intuition)",
      intuition:
        "Sort coins in descending order and repeatedly pick the largest coin that does not exceed the remaining amount.",
      code: {
        java: `// NOTE: This greedy approach FAILS on cases like coins=[1,3,4], amount=6
class Solution {
    public int coinChange(int[] coins, int amount) {
        java.util.Arrays.sort(coins);
        int count = 0;
        for (int i = coins.length - 1; i >= 0; i--) {
            if (amount >= coins[i]) {
                int num = amount / coins[i];
                count += num;
                amount -= num * coins[i];
            }
        }
        return amount == 0 ? count : -1;
    }
}`,
        cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        sort(coins.rbegin(), coins.rend());
        int count = 0;
        for (int c : coins) {
            if (amount >= c) {
                int num = amount / c;
                count += num;
                amount -= num * c;
            }
        }
        return amount == 0 ? count : -1;
    }
};`,
        python: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        coins.sort(reverse=True)
        count = 0
        for c in coins:
            if amount >= c:
                num = amount // c
                count += num
                amount -= num * c
        return count if amount == 0 else -1`,
        javascript: `// NOTE: This greedy approach FAILS on cases like coins=[1,3,4], amount=6
var coinChange = function(coins, amount) {
    coins.sort((a, b) => b - a);
    let count = 0;
    for (const c of coins) {
        if (amount >= c) {
            const num = Math.floor(amount / c);
            count += num;
            amount -= num * c;
        }
    }
    return amount === 0 ? count : -1;
};`,
      },
      timeComplexity: "O(n log n) but mathematically incorrect",
      spaceComplexity: "O(1)",
      explanation:
        "Fails because the coin system is not canonical. Dynamic programming is required to explore all valid combinations.",
    },
    optimalSolution: {
      title: "Approach 2 — Bottom-Up Dynamic Programming (1D Array)",
      intuition:
        "Create an array `dp` of size `amount + 1` initialized to a sentinel value `amount + 1` (impossible max). Set `dp[0] = 0`. For each sum `a` from 1 to `amount`, and for each coin `c`: if `a >= c`, `dp[a] = Math.min(dp[a], dp[a - c] + 1)`. If `dp[amount] > amount`, return -1, otherwise return `dp[amount]`.",
      code: {
        java: `import java.util.Arrays;

class Solution {
    public int coinChange(int[] coins, int amount) {
        int max = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, max);
        dp[0] = 0;

        for (int a = 1; a <= amount; a++) {
            for (int c : coins) {
                if (a >= c) {
                    dp[a] = Math.min(dp[a], dp[a - c] + 1);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
        cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        int maxVal = amount + 1;
        vector<int> dp(amount + 1, maxVal);
        dp[0] = 0;

        for (int a = 1; a <= amount; a++) {
            for (int c : coins) {
                if (a >= c) {
                    dp[a] = min(dp[a], dp[a - c] + 1);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
        python: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0

        for a in range(1, amount + 1):
            for c in coins:
                if a >= c:
                    dp[a] = min(dp[a], dp[a - c] + 1)

        return dp[amount] if dp[amount] != float('inf') else -1`,
        javascript: `var coinChange = function(coins, amount) {
    const maxVal = amount + 1;
    const dp = new Array(amount + 1).fill(maxVal);
    dp[0] = 0;

    for (let a = 1; a <= amount; a++) {
        for (const c of coins) {
            if (a >= c) {
                dp[a] = Math.min(dp[a], dp[a - c] + 1);
            }
        }
    }

    return dp[amount] > amount ? -1 : dp[amount];
};`,
      },
      timeComplexity: "O(amount * n) where n is number of coins",
      spaceComplexity: "O(amount)",
      whyOptimal:
        "Solves each subproblem from 1 to `amount` exactly once. For `amount = 10^4` and 12 coins, total operations is only ~1.2 * 10^5, executing in just 5-10ms.",
    },
    pattern: "Dynamic Programming (Unbounded Knapsack / Min Cost)",
    complexitySummary: {
      time: "O(amount * n)",
      space: "O(amount)",
    },
    dryRun: {
      sampleInput: "coins = [1, 2, 5], amount = 6",
      steps: [
        {
          stepNumber: 1,
          state: "dp[0]=0, dp[1..6]=7 (sentinel)",
          action: "a=1: coin 1 -> dp[1] = min(7, dp[0] + 1) = 1.",
          result: "dp[1] = 1",
        },
        {
          stepNumber: 2,
          state: "a=2: coin 1 gives dp[1]+1=2. coin 2 gives dp[0]+1=1.",
          action: "dp[2] = min(2, 1) = 1.",
          result: "dp[2] = 1",
        },
        {
          stepNumber: 3,
          state: "a=5: coin 5 gives dp[0]+1=1.",
          action: "dp[5] = 1.",
          result: "dp[5] = 1",
        },
        {
          stepNumber: 4,
          state: "a=6: coin 5 gives dp[1]+1=2. coin 2 gives dp[4]+1=3. coin 1 gives dp[5]+1=2.",
          action: "dp[6] = 2.",
          result: "return dp[6] = 2 (coins 5 + 1)",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Initializing dp array with Integer.MAX_VALUE and causing integer overflow on + 1",
        fix: "Initialize with `amount + 1` since maximum possible coins for any amount is `amount` (all 1s).",
      },
      {
        mistake: "Assuming greedy works for all coin sets",
        fix: "Greedy only works for canonical coin systems (like standard US/Indian currency). Arbitrary sets require Dynamic Programming.",
      },
    ],
    variations: [
      "Coin Change II (number of combinations to make up amount)",
      "Perfect Squares",
      "Combination Sum IV",
    ],
    practice: [
      { title: "Coin Change II", difficulty: "Medium" },
      { title: "Perfect Squares", difficulty: "Medium" },
    ],
    tags: ["Array", "Dynamic Programming", "Breadth-First Search"],
    companies: ["Amazon", "Microsoft", "Meta", "Google", "Bloomberg"],
  },
  {
    id: "longest-increasing-subsequence",
    slug: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    topic: "Dynamic Programming",
    subtopic: "Patience Sorting / Binary Search Optimization",
    difficulty: "Medium",
    progressionLevel: "Level 4: Optimization",
    statement:
      "Given an integer array `nums`, return the length of the longest strictly increasing subsequence. A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.",
    understandTheProblem:
      "Pick a subset of elements in the same relative left-to-right order such that every chosen number is strictly greater than the previous chosen number. Find the maximum possible count of elements.",
    constraints: [
      "1 <= nums.length <= 2500",
      "-10^4 <= nums[i] <= 10^4",
    ],
    examples: [
      {
        input: "nums = [10,9,2,5,3,7,101,18]",
        output: "4",
        explanation: "The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4. Another valid LIS is [2, 5, 7, 101].",
      },
      {
        input: "nums = [0,1,0,3,2,3]",
        output: "4",
        explanation: "LIS is [0, 1, 2, 3], length is 4.",
      },
      {
        input: "nums = [7,7,7,7,7,7,7]",
        output: "1",
        explanation: "Elements must be strictly increasing. Length is 1.",
      },
    ],
    hints: [
      "Classic O(n^2) DP: let dp[i] be the length of the longest increasing subsequence ending at index i.",
      "For each j < i: if nums[i] > nums[j], dp[i] = max(dp[i], dp[j] + 1).",
      "Can you do it in O(n log n) using Patience Sorting / Binary Search?",
    ],
    bruteForce: {
      title: "Approach 1 — O(n^2) Dynamic Programming",
      intuition:
        "Maintain `dp[i]` as the length of the LIS ending at index `i`. For each `i`, look back at all previous indices `j < i`. If `nums[i] > nums[j]`, candidate length is `dp[j] + 1`.",
      code: {
        java: `import java.util.Arrays;

class Solution {
    public int lengthOfLIS(int[] nums) {
        if (nums.length == 0) return 0;
        int n = nums.length;
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        int maxLIS = 1;

        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            maxLIS = Math.max(maxLIS, dp[i]);
        }

        return maxLIS;
    }
}`,
        cpp: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        if (nums.empty()) return 0;
        int n = nums.size();
        vector<int> dp(n, 1);
        int maxLIS = 1;

        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    dp[i] = max(dp[i], dp[j] + 1);
                }
            }
            maxLIS = max(maxLIS, dp[i]);
        }

        return maxLIS;
    }
};`,
        python: `class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        if not nums:
            return 0
        n = len(nums)
        dp = [1] * n

        for i in range(1, n):
            for j in range(i):
                if nums[i] > nums[j]:
                    dp[i] = max(dp[i], dp[j] + 1)

        return max(dp)`,
        javascript: `var lengthOfLIS = function(nums) {
    if (!nums || nums.length === 0) return 0;
    const n = nums.length;
    const dp = new Array(n).fill(1);
    let maxLIS = 1;

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLIS = Math.max(maxLIS, dp[i]);
    }

    return maxLIS;
};`,
      },
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(n)",
      explanation:
        "Nested loops inspect all pairs (j, i) with j < i.",
    },
    optimalSolution: {
      title: "Approach 2 — Patience Sorting with Binary Search (O(n log n))",
      intuition:
        "Maintain a list `tails` where `tails[i]` stores the smallest tail of all increasing subsequences of length `i + 1`. For each number `x` in `nums`: binary search for `x` in `tails`. If `x` is larger than all elements in `tails`, append `x` (extending the LIS length). Otherwise, replace the first element in `tails` that is `>= x` with `x`. The length of `tails` is the length of the LIS.",
      code: {
        java: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {
    public int lengthOfLIS(int[] nums) {
        List<Integer> tails = new ArrayList<>();

        for (int x : nums) {
            int idx = Collections.binarySearch(tails, x);
            if (idx < 0) {
                idx = -(idx + 1); // insertion point
            }

            if (idx == tails.size()) {
                tails.add(x);
            } else {
                tails.set(idx, x);
            }
        }

        return tails.size();
    }
}`,
        cpp: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails;

        for (int x : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end()) {
                tails.push_back(x);
            } else {
                *it = x;
            }
        }

        return tails.size();
    }
};`,
        python: `import bisect

class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        tails = []

        for x in nums:
            idx = bisect.bisect_left(tails, x)
            if idx == len(tails):
                tails.append(x)
            else:
                tails[idx] = x

        return len(tails)`,
        javascript: `var lengthOfLIS = function(nums) {
    const tails = [];

    for (const x of nums) {
        let low = 0;
        let high = tails.length;

        while (low < high) {
            const mid = Math.floor((low + high) / 2);
            if (tails[mid] < x) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        if (low === tails.length) {
            tails.push(x);
        } else {
            tails[low] = x;
        }
    }

    return tails.length;
};`,
      },
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      whyOptimal:
        "For each of the n numbers, we perform a binary search taking O(log n) time. n * log n operations for n = 2500 is ~28,000 steps, which is lightning fast.",
    },
    pattern: "Patience Sorting / Binary Search Optimization",
    complexitySummary: {
      time: "O(n log n)",
      space: "O(n)",
    },
    dryRun: {
      sampleInput: "nums = [10, 9, 2, 5, 3, 7]",
      steps: [
        {
          stepNumber: 1,
          state: "x=10, tails=[]",
          action: "tails is empty -> append 10.",
          result: "tails=[10]",
        },
        {
          stepNumber: 2,
          state: "x=9, tails=[10]",
          action: "9 < 10 -> replace 10 with 9.",
          result: "tails=[9]",
        },
        {
          stepNumber: 3,
          state: "x=2, tails=[9]",
          action: "2 < 9 -> replace 9 with 2.",
          result: "tails=[2]",
        },
        {
          stepNumber: 4,
          state: "x=5, tails=[2]",
          action: "5 > 2 -> append 5.",
          result: "tails=[2, 5]",
        },
        {
          stepNumber: 5,
          state: "x=3, tails=[2, 5]",
          action: "3 replaces 5.",
          result: "tails=[2, 3]",
        },
        {
          stepNumber: 6,
          state: "x=7, tails=[2, 3]",
          action: "7 > 3 -> append 7.",
          result: "tails=[2, 3, 7]. Length = 3.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Using bisect_right instead of bisect_left (handling duplicates)",
        fix: "Since subsequence must be strictly increasing, equal elements cannot extend the sequence. Use `lower_bound` / `bisect_left` to overwrite equal values.",
      },
      {
        mistake: "Assuming tails array represents the actual LIS elements",
        fix: "The `tails` array correctly tracks the length of the LIS, but elements in `tails` may not form a valid subsequence themselves. To reconstruct the sequence, store predecessor pointers.",
      },
    ],
    variations: [
      "Russian Doll Envelopes (2D LIS)",
      "Number of Longest Increasing Subsequence",
      "Maximum Length of Pair Chain",
    ],
    practice: [
      { title: "Russian Doll Envelopes", difficulty: "Hard" },
      { title: "Number of Longest Increasing Subsequence", difficulty: "Medium" },
    ],
    tags: ["Array", "Binary Search", "Dynamic Programming"],
    companies: ["Google", "Microsoft", "Amazon", "Meta"],
  },
];
