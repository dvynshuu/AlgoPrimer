import { Problem } from "@/types/content";

export const dpProblems: Problem[] = [
  {
    id: "climbing-stairs",
    slug: "climbing-stairs",
    title: "Climbing Stairs",
    topic: "Dynamic Programming",
    topicSlug: "dynamic-programming",
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
    topicSlug: "dynamic-programming",
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
    topicSlug: "dynamic-programming",
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
  {
    id: "house-robber",
    slug: "house-robber",
    title: "House Robber",
    topic: "Dynamic Programming",
    topicSlug: "dynamic-programming",
    subtopic: "1D State Transition / Non-Adjacent Choice",
    difficulty: "Medium",
    progressionLevel: "Level 2: Basic Implementation",
    statement:
      "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
    understandTheProblem:
      "At every house `i`, you must make a binary choice: rob it or skip it. If you rob house `i`, you cannot rob house `i - 1`, meaning your total is `nums[i] + optimal(i - 2)`. If you skip house `i`, your total is `optimal(i - 1)`. The optimal solution at house `i` is `max(optimal(i - 1), nums[i] + optimal(i - 2))`.",
    constraints: [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 400",
    ],
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "4",
        explanation: "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.",
      },
      {
        input: "nums = [2,7,9,3,1]",
        output: "12",
        explanation: "Rob house 1 (money = 2), rob house 3 (money = 9), and rob house 5 (money = 1). Total = 2 + 9 + 1 = 12.",
      },
    ],
    hints: [
      "Find the recurrence relation: at each house i, you either take nums[i] + max profit from i-2, or skip nums[i] and keep max profit from i-1.",
      "Notice that to compute dp[i], you only ever need dp[i-1] and dp[i-2].",
      "You can reduce the space complexity from O(N) to O(1) using two variables: `prev1` and `prev2`.",
    ],
    bruteForce: {
      title: "Approach 1 — Recursive Backtracking",
      intuition:
        "For every house from 0 to N-1, branch into two recursive calls: rob current house and jump to index + 2, or skip and jump to index + 1.",
      code: {
        java: `class Solution {
    public int rob(int[] nums) {
        return robHelper(nums, 0);
    }

    private int robHelper(int[] nums, int i) {
        if (i >= nums.length) return 0;
        int robCurrent = nums[i] + robHelper(nums, i + 2);
        int skipCurrent = robHelper(nums, i + 1);
        return Math.max(robCurrent, skipCurrent);
    }
}`,
        cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        return robHelper(nums, 0);
    }

private:
    int robHelper(const vector<int>& nums, int i) {
        if (i >= (int)nums.size()) return 0;
        int robCurrent = nums[i] + robHelper(nums, i + 2);
        int skipCurrent = robHelper(nums, i + 1);
        return max(robCurrent, skipCurrent);
    }
};`,
        python: `class Solution:
    def rob(self, nums: List[int]) -> int:
        def helper(i: int) -> int:
            if i >= len(nums):
                return 0
            return max(nums[i] + helper(i + 2), helper(i + 1))
        return helper(0)`,
        javascript: `var rob = function(nums) {
    function helper(i) {
        if (i >= nums.length) return 0;
        return Math.max(nums[i] + helper(i + 2), helper(i + 1));
    }
    return helper(0);
};`,
      },
      timeComplexity: "O(2^N) — Tree branches exponentially with height N.",
      spaceComplexity: "O(N) — Call stack depth up to N frames.",
      explanation: "Explores all 2^N subsets of non-adjacent elements without caching overlapping subproblems.",
    },
    optimalSolution: {
      title: "Approach 2 — Constant Space Dynamic Programming (Rolling State)",
      intuition:
        "Maintain two rolling variables: `prev1` (max loot up to house i-1) and `prev2` (max loot up to house i-2). For current house `x`, `curr = max(prev1, prev2 + x)`. Then shift: `prev2 = prev1`, `prev1 = curr`.",
      code: {
        java: `class Solution {
    public int rob(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        int prev2 = 0; // dp[i-2]
        int prev1 = 0; // dp[i-1]

        for (int num : nums) {
            int current = Math.max(prev1, prev2 + num);
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
}`,
        cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        int prev2 = 0;
        int prev1 = 0;

        for (int num : nums) {
            int current = max(prev1, prev2 + num);
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
};`,
        python: `class Solution:
    def rob(self, nums: List[int]) -> int:
        prev2, prev1 = 0, 0
        for num in nums:
            current = max(prev1, prev2 + num)
            prev2 = prev1
            prev1 = current
        return prev1`,
        javascript: `var rob = function(nums) {
    let prev2 = 0;
    let prev1 = 0;

    for (const num of nums) {
        const current = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
};`,
      },
      timeComplexity: "O(N) — Single linear scan through the array.",
      spaceComplexity: "O(1) — Only two integer variables maintained.",
      explanation: "Computes the optimal loot in a single pass without maintaining a full DP table.",
      whyOptimal: "Achieves optimal O(N) runtime with minimal possible O(1) auxiliary space.",
    },
    pattern: "1D Dynamic Programming / State Machine",
    complexitySummary: {
      time: "O(N)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "nums = [2, 7, 9, 3, 1]",
      steps: [
        {
          stepNumber: 1,
          state: "num = 2, prev2 = 0, prev1 = 0",
          action: "curr = max(0, 0 + 2) = 2. Update prev2 = 0, prev1 = 2.",
          result: "Max profit up to index 0 is 2.",
        },
        {
          stepNumber: 2,
          state: "num = 7, prev2 = 0, prev1 = 2",
          action: "curr = max(2, 0 + 7) = 7. Update prev2 = 2, prev1 = 7.",
          result: "Max profit up to index 1 is 7.",
        },
        {
          stepNumber: 3,
          state: "num = 9, prev2 = 2, prev1 = 7",
          action: "curr = max(7, 2 + 9) = 11. Update prev2 = 7, prev1 = 11.",
          result: "Max profit up to index 2 is 11.",
        },
        {
          stepNumber: 4,
          state: "num = 3, prev2 = 7, prev1 = 11",
          action: "curr = max(11, 7 + 3) = 11. Update prev2 = 11, prev1 = 11.",
          result: "Max profit up to index 3 is 11.",
        },
        {
          stepNumber: 5,
          state: "num = 1, prev2 = 11, prev1 = 11",
          action: "curr = max(11, 11 + 1) = 12. Update prev2 = 11, prev1 = 12.",
          result: "Final answer is 12.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Greedily picking the highest value house first",
        fix: "Local greedy choice fails because taking a large value locks out two adjacent neighbors whose combined sum could be strictly larger (e.g., [2, 1, 1, 2] -> greedy might choose 2, leaving 1+2=3, but optimal takes 2+2=4).",
      },
      {
        mistake: "Allocating an O(N) DP table when only 2 values are needed",
        fix: "Since `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`, condense the state to two scalar variables.",
      },
    ],
    variations: [
      "House Robber II (houses arranged in a circle)",
      "House Robber III (houses arranged in a binary tree)",
      "Delete and Earn (transform into House Robber problem)",
    ],
    practice: [
      { title: "House Robber II", difficulty: "Medium" },
      { title: "House Robber III", difficulty: "Medium" },
      { title: "Delete and Earn", difficulty: "Medium" },
    ],
    tags: ["Array", "Dynamic Programming"],
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple"],
  },
  {
    id: "longest-common-subsequence",
    slug: "longest-common-subsequence",
    title: "Longest Common Subsequence",
    topic: "Dynamic Programming",
    topicSlug: "dynamic-programming",
    subtopic: "2D Grid DP / String Alignment",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0. A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters. A common subsequence of two strings is a subsequence that is common to both strings.",
    understandTheProblem:
      "We want to find the length of the longest subsequence present in both strings. If `text1[i] == text2[j]`, that character extends the longest common subsequence of the prefixes `text1[0...i-1]` and `text2[0...j-1]` by 1. Otherwise, we take the maximum by either skipping `text1[i]` or skipping `text2[j]`.",
    constraints: [
      "1 <= text1.length, text2.length <= 1000",
      "text1 and text2 consist of only lowercase English characters.",
    ],
    examples: [
      {
        input: 'text1 = "abcde", text2 = "ace"',
        output: "3",
        explanation: 'The longest common subsequence is "ace" and its length is 3.',
      },
      {
        input: 'text1 = "abc", text2 = "abc"',
        output: "3",
        explanation: 'The longest common subsequence is "abc" and its length is 3.',
      },
      {
        input: 'text1 = "abc", text2 = "def"',
        output: "0",
        explanation: "There is no such common subsequence, so the result is 0.",
      },
    ],
    hints: [
      "Consider subproblems: let dp[i][j] be the LCS length for text1[0...i-1] and text2[0...j-1].",
      "If text1[i-1] == text2[j-1], then dp[i][j] = 1 + dp[i-1][j-1].",
      "If text1[i-1] != text2[j-1], then dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
      "Notice each row only depends on the previous row, so space can be compressed to O(min(M, N)).",
    ],
    bruteForce: {
      title: "Approach 1 — Naive Recursion",
      intuition:
        "Check character by character from the back. If characters match, add 1 and recurse on both prefixes. If they differ, recurse on both subproblems and take the maximum.",
      code: {
        java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        return helper(text1, text2, text1.length(), text2.length());
    }

    private int helper(String s1, String s2, int m, int n) {
        if (m == 0 || n == 0) return 0;
        if (s1.charAt(m - 1) == s2.charAt(n - 1)) {
            return 1 + helper(s1, s2, m - 1, n - 1);
        }
        return Math.max(helper(s1, s2, m - 1, n), helper(s1, s2, m, n - 1));
    }
}`,
        cpp: `#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        return helper(text1, text2, text1.size(), text2.size());
    }

private:
    int helper(const string& s1, const string& s2, int m, int n) {
        if (m == 0 || n == 0) return 0;
        if (s1[m - 1] == s2[n - 1]) {
            return 1 + helper(s1, s2, m - 1, n - 1);
        }
        return max(helper(s1, s2, m - 1, n), helper(s1, s2, m, n - 1));
    }
};`,
        python: `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        def helper(i: int, j: int) -> int:
            if i == len(text1) or j == len(text2):
                return 0
            if text1[i] == text2[j]:
                return 1 + helper(i + 1, j + 1)
            return max(helper(i + 1, j), helper(i, j + 1))
        return helper(0, 0)`,
        javascript: `var longestCommonSubsequence = function(text1, text2) {
    function helper(i, j) {
        if (i === text1.length || j === text2.length) return 0;
        if (text1[i] === text2[j]) {
            return 1 + helper(i + 1, j + 1);
        }
        return Math.max(helper(i + 1, j), helper(i, j + 1));
    }
    return helper(0, 0);
};`,
      },
      timeComplexity: "O(2^(M+N)) — Exponential recursion tree with massive overlapping computations.",
      spaceComplexity: "O(M + N) — Recursion stack depth.",
      explanation: "Explores all possible character matching branches without memoization.",
    },
    optimalSolution: {
      title: "Approach 2 — Space-Optimized 1D Row Dynamic Programming",
      intuition:
        "Notice that computing row `i` only requires values from row `i - 1`. By keeping only the current and previous rows (or a single 1D array with a temporary variable for the top-left diagonal value), auxiliary space drops from O(M * N) to O(min(M, N)).",
      code: {
        java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        if (text1.length() < text2.length()) {
            return longestCommonSubsequence(text2, text1);
        }
        int m = text1.length(), n = text2.length();
        int[] dp = new int[n + 1];

        for (int i = 1; i <= m; i++) {
            int prevDiagonal = 0;
            for (int j = 1; j <= n; j++) {
                int temp = dp[j];
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[j] = 1 + prevDiagonal;
                } else {
                    dp[j] = Math.max(dp[j], dp[j - 1]);
                }
                prevDiagonal = temp;
            }
        }

        return dp[n];
    }
}`,
        cpp: `#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        if (text1.size() < text2.size()) swap(text1, text2);
        int m = text1.size(), n = text2.size();
        vector<int> dp(n + 1, 0);

        for (int i = 1; i <= m; i++) {
            int prevDiagonal = 0;
            for (int j = 1; j <= n; j++) {
                int temp = dp[j];
                if (text1[i - 1] == text2[j - 1]) {
                    dp[j] = 1 + prevDiagonal;
                } else {
                    dp[j] = max(dp[j], dp[j - 1]);
                }
                prevDiagonal = temp;
            }
        }

        return dp[n];
    }
};`,
        python: `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        if len(text1) < len(text2):
            text1, text2 = text2, text1
        m, n = len(text1), len(text2)
        dp = [0] * (n + 1)

        for i in range(1, m + 1):
            prev_diag = 0
            for j in range(1, n + 1):
                temp = dp[j]
                if text1[i - 1] == text2[j - 1]:
                    dp[j] = 1 + prev_diag
                else:
                    dp[j] = max(dp[j], dp[j - 1])
                prev_diag = temp

        return dp[n]`,
        javascript: `var longestCommonSubsequence = function(text1, text2) {
    if (text1.length < text2.length) {
        return longestCommonSubsequence(text2, text1);
    }
    const m = text1.length;
    const n = text2.length;
    const dp = new Array(n + 1).fill(0);

    for (let i = 1; i <= m; i++) {
        let prevDiag = 0;
        for (let j = 1; j <= n; j++) {
            const temp = dp[j];
            if (text1[i - 1] === text2[j - 1]) {
                dp[j] = 1 + prevDiag;
            } else {
                dp[j] = Math.max(dp[j], dp[j - 1]);
            }
            prevDiag = temp;
        }
    }

    return dp[n];
};`,
      },
      timeComplexity: "O(M * N) — Double loop visiting each pair of characters exactly once.",
      spaceComplexity: "O(min(M, N)) — Memory reduced to a single 1D array of the shorter string.",
      explanation: "Compresses the 2D matrix into a rolling 1D buffer while tracking the previous diagonal value in a scalar variable.",
      whyOptimal: "Computes the exact LCS length in minimal O(min(M, N)) auxiliary space.",
    },
    pattern: "2D Dynamic Programming / String Alignment",
    complexitySummary: {
      time: "O(M * N)",
      space: "O(min(M, N))",
    },
    dryRun: {
      sampleInput: 'text1 = "abcde", text2 = "ace"',
      steps: [
        {
          stepNumber: 1,
          state: 'Row i=1 (\'a\') vs "ace"',
          action: "text1[0]=='a' matches text2[0]=='a'. dp[1]=1. Others match: dp=[0, 1, 1, 1].",
          result: "dp = [0, 1, 1, 1]",
        },
        {
          stepNumber: 2,
          state: 'Row i=2 (\'b\') vs "ace"',
          action: "'b' matches nothing. Values carry over: dp=[0, 1, 1, 1].",
          result: "dp = [0, 1, 1, 1]",
        },
        {
          stepNumber: 3,
          state: 'Row i=3 (\'c\') vs "ace"',
          action: "'c' matches text2[1]=='c'. dp[2] = 1 + dp_prev[1] = 2. dp[3] becomes 2.",
          result: "dp = [0, 1, 2, 2]",
        },
        {
          stepNumber: 4,
          state: 'Row i=5 (\'e\') vs "ace"',
          action: "'e' matches text2[2]=='e'. dp[3] = 1 + dp_prev[2] = 1 + 2 = 3.",
          result: "dp[3] = 3. Final LCS length is 3.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Confusing substring with subsequence",
        fix: "Substrings must be contiguous in memory; subsequences can skip characters as long as order is preserved.",
      },
      {
        mistake: "Overwriting the top-left diagonal value before reading it in 1D array",
        fix: "Always save `dp[j]` into a temporary variable before updating `dp[j]` so `prevDiagonal` is preserved for the next step.",
      },
    ],
    variations: [
      "Edit Distance (insert, delete, replace operations)",
      "Shortest Common Supersequence",
      "Delete Operation for Two Strings",
    ],
    practice: [
      { title: "Edit Distance", difficulty: "Medium" },
      { title: "Shortest Common Supersequence", difficulty: "Hard" },
      { title: "Delete Operation for Two Strings", difficulty: "Medium" },
    ],
    tags: ["String", "Dynamic Programming"],
    companies: ["Google", "Amazon", "Microsoft", "Apple", "DoorDash"],
  },
  {
    id: "word-break",
    slug: "word-break",
    title: "Word Break",
    topic: "Dynamic Programming",
    topicSlug: "dynamic-programming",
    subtopic: "1D String Partitioning DP",
    difficulty: "Medium",
    progressionLevel: "Level 4: Optimization",
    statement:
      "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. Note that the same word in the dictionary may be reused multiple times in the segmentation.",
    understandTheProblem:
      "Can we split string `s` into consecutive substrings such that each substring is present in `wordDict`? Let `dp[i]` be true if prefix `s[0...i-1]` can be segmented. Then `dp[i]` is true if there exists some `j < i` such that `dp[j]` is true AND `s[j...i-1]` is in `wordDict`.",
    constraints: [
      "1 <= s.length <= 300",
      "1 <= wordDict.length <= 1000",
      "1 <= wordDict[i].length <= 20",
      "s and wordDict[i] consist of only lowercase English letters.",
      "All the strings of wordDict are unique.",
    ],
    examples: [
      {
        input: 's = "leetcode", wordDict = ["leet","code"]',
        output: "true",
        explanation: 'Return true because "leetcode" can be segmented as "leet code".',
      },
      {
        input: 's = "applepenapple", wordDict = ["apple","pen"]',
        output: "true",
        explanation: 'Return true because "applepenapple" can be segmented as "apple pen apple". Note that words can be reused.',
      },
      {
        input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]',
        output: "false",
        explanation: 'No segmentation exists where all words belong to the dictionary.',
      },
    ],
    hints: [
      "Define dp[i] as a boolean indicating whether the prefix s[0...i-1] can be segmented.",
      "Base case: dp[0] = true (empty string is trivially valid).",
      "For each index i, look back at previous valid split points j where dp[j] == true.",
      "Optimization: dictionary words have a maximum length (e.g. 20). You only need to check j in range [max(0, i - maxLen), i).",
    ],
    bruteForce: {
      title: "Approach 1 — Recursive Prefix Matching",
      intuition:
        "Check every prefix of `s`. If the prefix exists in `wordDict`, recursively check if the remainder of the string can be segmented.",
      code: {
        java: `import java.util.List;
import java.util.HashSet;
import java.util.Set;

class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        return canBreak(s, new HashSet<>(wordDict), 0);
    }

    private boolean canBreak(String s, Set<String> dict, int start) {
        if (start == s.length()) return true;
        for (int end = start + 1; end <= s.length(); end++) {
            if (dict.contains(s.substring(start, end)) && canBreak(s, dict, end)) {
                return true;
            }
        }
        return false;
    }
}`,
        cpp: `#include <string>
#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        return canBreak(s, dict, 0);
    }

private:
    bool canBreak(const string& s, const unordered_set<string>& dict, int start) {
        if (start == (int)s.size()) return true;
        for (int end = start + 1; end <= (int)s.size(); end++) {
            if (dict.count(s.substr(start, end - start)) && canBreak(s, dict, end)) {
                return true;
            }
        }
        return false;
    }
};`,
        python: `class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        words = set(wordDict)
        def can_break(start: int) -> bool:
            if start == len(s):
                return True
            for end in range(start + 1, len(s) + 1):
                if s[start:end] in words and can_break(end):
                    return True
            return False
        return can_break(0)`,
        javascript: `var wordBreak = function(s, wordDict) {
    const dict = new Set(wordDict);
    function canBreak(start) {
        if (start === s.length) return true;
        for (let end = start + 1; end <= s.length; end++) {
            if (dict.has(s.slice(start, end)) && canBreak(end)) {
                return true;
            }
        }
        return false;
    }
    return canBreak(0);
};`,
      },
      timeComplexity: "O(2^N) — Exponential recursion due to overlapping subproblem branching.",
      spaceComplexity: "O(N) — Recursion stack depth.",
      explanation: "Explores all possible prefix splits without memoizing already-failed suffixes.",
    },
    optimalSolution: {
      title: "Approach 2 — 1D Dynamic Programming with Max-Word-Length Pruning",
      intuition:
        "Store dictionary in a Hash Set and compute `maxLen` (the maximum length of any word in `wordDict`). Create `dp` array where `dp[i]` is true if `s[0...i-1]` is valid. For each `i`, only check `j` from `i - 1` down to `max(0, i - maxLen)`. If `dp[j]` is true and substring `s[j...i-1]` is in the set, set `dp[i] = true` and break early.",
      code: {
        java: `import java.util.List;
import java.util.HashSet;
import java.util.Set;

class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> wordSet = new HashSet<>(wordDict);
        int maxLen = 0;
        for (String w : wordDict) {
            maxLen = Math.max(maxLen, w.length());
        }

        int n = s.length();
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;

        for (int i = 1; i <= n; i++) {
            for (int j = i - 1; j >= Math.max(0, i - maxLen); j--) {
                if (dp[j] && wordSet.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }

        return dp[n];
    }
}`,
        cpp: `#include <string>
#include <vector>
#include <unordered_set>
#include <algorithm>
using namespace std;

class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> wordSet(wordDict.begin(), wordDict.end());
        int maxLen = 0;
        for (const string& w : wordDict) {
            maxLen = max(maxLen, (int)w.size());
        }

        int n = s.size();
        vector<bool> dp(n + 1, false);
        dp[0] = true;

        for (int i = 1; i <= n; i++) {
            for (int j = i - 1; j >= max(0, i - maxLen); j--) {
                if (dp[j] && wordSet.count(s.substr(j, i - j))) {
                    dp[i] = true;
                    break;
                }
            }
        }

        return dp[n];
    }
};`,
        python: `class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        word_set = set(wordDict)
        max_len = max(len(w) for w in wordDict) if wordDict else 0
        n = len(s)
        dp = [False] * (n + 1)
        dp[0] = True

        for i in range(1, n + 1):
            for j in range(i - 1, max(-1, i - max_len - 1), -1):
                if dp[j] and s[j:i] in word_set:
                    dp[i] = True
                    break

        return dp[n]`,
        javascript: `var wordBreak = function(s, wordDict) {
    const wordSet = new Set(wordDict);
    let maxLen = 0;
    for (const w of wordDict) {
        maxLen = Math.max(maxLen, w.length);
    }

    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i <= n; i++) {
        for (let j = i - 1; j >= Math.max(0, i - maxLen); j--) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[n];
};`,
      },
      timeComplexity: "O(N * L) where N is length of s and L is max length of words in wordDict — Pruning bounds the inner loop to at most L iterations.",
      spaceComplexity: "O(N + M) where N is string length and M is total character count of wordDict.",
      explanation: "Iterates through the string evaluating prefixes. Limiting the lookback window to max word length guarantees linear scaling with string length.",
      whyOptimal: "Prunes unnecessary substring operations, achieving optimal practical and asymptotic performance.",
    },
    pattern: "1D Dynamic Programming / String Segmentation",
    complexitySummary: {
      time: "O(N * L)",
      space: "O(N + M)",
    },
    dryRun: {
      sampleInput: 's = "leetcode", wordDict = ["leet", "code"]',
      steps: [
        {
          stepNumber: 1,
          state: "dp[0] = true (empty prefix)",
          action: "Initialize dp array of length 9.",
          result: "dp = [T, F, F, F, F, F, F, F, F]",
        },
        {
          stepNumber: 2,
          state: "i = 4, substring s[0...3] = 'leet'",
          action: "dp[0]==true and 'leet' is in wordSet.",
          result: "dp[4] = true.",
        },
        {
          stepNumber: 3,
          state: "i = 8, substring s[4...7] = 'code'",
          action: "dp[4]==true and 'code' is in wordSet.",
          result: "dp[8] = true.",
        },
        {
          stepNumber: 4,
          state: "Reached end of string",
          action: "Inspect dp[8].",
          result: "Returns true.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Checking all j from 0 to i without max word length limit",
        fix: "If a dictionary only contains words of length up to 20, checking substrings longer than 20 creates unnecessary O(N^2) overhead.",
      },
      {
        mistake: "Using a List instead of a Hash Set for dictionary lookup",
        fix: "List contains() is O(W) per lookup; HashSet contains() is O(L) where L is the length of the string being hashed.",
      },
    ],
    variations: [
      "Word Break II (return all possible sentence reconstructions)",
      "Concatenated Words",
      "Palindrome Partitioning",
    ],
    practice: [
      { title: "Word Break II", difficulty: "Hard" },
      { title: "Concatenated Words", difficulty: "Hard" },
    ],
    tags: ["Hash Table", "String", "Dynamic Programming", "Trie"],
    companies: ["Google", "Meta", "Amazon", "Bloomberg", "Uber"],
  },
];

