import { Problem } from "@/types/content";

export const arrayProblems: Problem[] = [
  {
    id: "two-sum",
    slug: "two-sum",
    title: "Two Sum",
    topic: "Arrays",
    subtopic: "Hashing & Two Pointers",
    difficulty: "Easy",
    progressionLevel: "Level 1: Concept Understanding",
    statement:
      "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    understandTheProblem:
      "You are given a list of numbers and a target sum. Your job is to find two separate items in that list whose values add up exactly to the target number, and return their 0-based positions (indices).",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "Because nums[0] + nums[1] == 2 + 7 == 9, we return [0, 1].",
      },
      {
        input: "nums = [3, 2, 4], target = 6",
        output: "[1, 2]",
        explanation: "nums[1] + nums[2] == 2 + 4 == 6, so we return [1, 2].",
      },
      {
        input: "nums = [3, 3], target = 6",
        output: "[0, 1]",
        explanation: "nums[0] + nums[1] == 3 + 3 == 6, so we return [0, 1].",
      },
    ],
    hints: [
      "Can you calculate the exact number you need to find for any current number x? (target - x)",
      "Instead of scanning the whole array again for the complement, can you store previously seen numbers in a Hash Map for O(1) lookup?",
    ],
    bruteForce: {
      title: "Approach 1 — Brute Force (Nested Loops)",
      intuition:
        "Check every possible pair of elements (i, j) where j > i. If their sum equals target, return their indices [i, j].",
      code: {
        java: `public int[] twoSum(int[] nums, int target) {
    int n = nums.length;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] == target) {
                return new int[]{i, j};
            }
        }
    }
    return new int[]{};
}`,
        cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    int n = nums.size();
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }
    return {};
}`,
        python: `def twoSum(nums: list[int], target: int) -> list[int]:
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
        javascript: `var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
};`,
      },
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
      explanation:
        "We evaluate n * (n - 1) / 2 pairs. When n = 10^4, n^2 ~ 10^8 operations, which is close to the timeout limit.",
    },
    betterSolution: {
      title: "Approach 2 — Two-Pass Hash Table",
      intuition:
        "In the first pass, insert every number and its index into a Hash Map. In the second pass, check if (target - nums[i]) exists in the map and is not the element at index i itself.",
      code: {
        java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        map.put(nums[i], i);
    }
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement) && map.get(complement) != i) {
            return new int[]{i, map.get(complement)};
        }
    }
    return new int[]{};
}`,
        cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        map[nums[i]] = i;
    }
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.count(complement) && map[complement] != i) {
            return {i, map[complement]};
        }
    }
    return {};
}`,
        python: `def twoSum(nums: list[int], target: int) -> list[int]:
    lookup = {num: i for i, num in enumerate(nums)}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in lookup and lookup[complement] != i:
            return [i, lookup[complement]]
    return []`,
        javascript: `var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], i);
    }
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement) && map.get(complement) !== i) {
            return [i, map.get(complement)];
        }
    }
    return [];
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      explanation:
        "Reduces time complexity from quadratic to linear by spending O(n) memory on a hash table.",
    },
    optimalSolution: {
      title: "Approach 3 — One-Pass Hash Map (Optimal)",
      intuition:
        "While iterating through the array, calculate complement = target - nums[i]. Check if this complement already exists in our map. If it does, we have found our matching pair immediately! If not, insert nums[i] with index i and continue. This solves the problem in a single pass.",
      code: {
        java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (seen.containsKey(complement)) {
                return new int[]{seen.get(complement), i};
            }
            
            seen.put(nums[i], i);
        }
        
        return new int[]{};
    }
}`,
        cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            
            seen[nums[i]] = i;
        }
        
        return {};
    }
};`,
        python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
        javascript: `var twoSum = function(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      whyOptimal:
        "We visit each element at most once. Hash Map lookups and insertions operate in O(1) average time. This is strictly optimal because any algorithm must inspect each number at least once (Omega(n)).",
    },
    pattern: "Hashing / Complement Lookup",
    complexitySummary: {
      time: "O(n)",
      space: "O(n)",
    },
    dryRun: {
      sampleInput: "nums = [2, 7, 11, 15], target = 9",
      steps: [
        {
          stepNumber: 1,
          state: "i=0, num=2, map={}",
          action: "complement = 9 - 2 = 7. Is 7 in map? No.",
          result: "Insert 2 -> 0 into map. map={2: 0}",
        },
        {
          stepNumber: 2,
          state: "i=1, num=7, map={2: 0}",
          action: "complement = 9 - 7 = 2. Is 2 in map? Yes! Found at index 0.",
          result: "Return indices [0, 1]. Terminate immediately!",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Using the same element twice: returning [i, i]",
        fix: "Check that map.get(complement) != i, or use the single-pass approach where current element isn't in map yet.",
      },
      {
        mistake: "Sorting the array and losing original indices",
        fix: "If you sort, you must store original indices as pairs: (nums[i], originalIndex).",
      },
    ],
    variations: [
      "Two Sum II — Input Array Is Sorted (solve in O(1) auxiliary space using two pointers)",
      "Two Sum III — Data Structure Design",
      "3Sum (find triplets summing to 0)",
      "4Sum",
    ],
    practice: [
      { title: "Two Sum II - Input Array Is Sorted", difficulty: "Medium" },
      { title: "3Sum", difficulty: "Medium" },
      { title: "Subarray Sum Equals K", difficulty: "Medium" },
    ],
    tags: ["Array", "Hash Table"],
    companies: ["Amazon", "Google", "Microsoft", "Meta", "TCS", "Infosys", "Adobe"],
  },
  {
    id: "best-time-to-buy-and-sell-stock",
    slug: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    topic: "Arrays",
    subtopic: "Prefix Minimums & Greedy",
    difficulty: "Easy",
    progressionLevel: "Level 2: Basic Implementation",
    statement:
      "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    understandTheProblem:
      "You have stock prices over several days. You must pick one day to buy and a later day to sell. What is the maximum difference (sell price - buy price) you can achieve? If prices only go down, you make 0 profit.",
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4",
    ],
    examples: [
      {
        input: "prices = [7, 1, 5, 3, 6, 4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5. Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.",
      },
      {
        input: "prices = [7, 6, 4, 3, 1]",
        output: "0",
        explanation: "In this case, no transactions are done and the max profit = 0.",
      },
    ],
    hints: [
      "If you sell on day i, what is the best day to have bought? (The day with minimum price before day i).",
      "Can you maintain a running minimum price as you iterate?",
    ],
    bruteForce: {
      title: "Approach 1 — Brute Force (All Buy/Sell Pairs)",
      intuition:
        "Test every pair of days: buy on day i, sell on day j (where j > i). Track the maximum difference.",
      code: {
        java: `public int maxProfit(int[] prices) {
    int maxProfit = 0;
    for (int i = 0; i < prices.length; i++) {
        for (int j = i + 1; j < prices.length; j++) {
            int profit = prices[j] - prices[i];
            if (profit > maxProfit) {
                maxProfit = profit;
            }
        }
    }
    return maxProfit;
}`,
        cpp: `int maxProfit(vector<int>& prices) {
    int maxProfit = 0;
    for (size_t i = 0; i < prices.size(); i++) {
        for (size_t j = i + 1; j < prices.size(); j++) {
            int profit = prices[j] - prices[i];
            maxProfit = max(maxProfit, profit);
        }
    }
    return maxProfit;
}`,
        python: `def maxProfit(prices: list[int]) -> int:
    max_profit = 0
    n = len(prices)
    for i in range(n):
        for j in range(i + 1, n):
            profit = prices[j] - prices[i]
            if profit > max_profit:
                max_profit = profit
    return max_profit`,
        javascript: `var maxProfit = function(prices) {
    let maxProfitVal = 0;
    for (let i = 0; i < prices.length; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            maxProfitVal = Math.max(maxProfitVal, prices[j] - prices[i]);
        }
    }
    return maxProfitVal;
};`,
      },
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
      explanation: "With N = 10^5, N^2 = 10^10 operations, triggering Time Limit Exceeded (TLE).",
    },
    optimalSolution: {
      title: "Approach 2 — One Pass Running Minimum (Optimal)",
      intuition:
        "As we traverse the prices array, keep track of the minimum price observed so far (`minPrice`). If we decide to sell on day i, our profit would be `prices[i] - minPrice`. We update our maximum profit if this is higher, and update `minPrice` if today's price is a new low.",
      code: {
        java: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;

        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price; // New lowest buying point
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice; // New highest profit
            }
        }

        return maxProfit;
    }
}`,
        cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX;
        int maxProfit = 0;

        for (int price : prices) {
            minPrice = min(minPrice, price);
            maxProfit = max(maxProfit, price - minPrice);
        }

        return maxProfit;
    }
};`,
        python: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        min_price = float('inf')
        max_profit = 0

        for price in prices:
            if price < min_price:
                min_price = price
            elif price - min_price > max_profit:
                max_profit = price - min_price

        return max_profit`,
        javascript: `var maxProfit = function(prices) {
    let minPrice = Infinity;
    let maxProfitVal = 0;
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfitVal = Math.max(maxProfitVal, price - minPrice);
    }
    return maxProfitVal;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      whyOptimal:
        "We visit each price exactly once with constant extra memory. We cannot do faster than O(n) because any valid algorithm must inspect every price.",
    },
    pattern: "Running Minimum / Single Pass Greedy",
    complexitySummary: {
      time: "O(n)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "prices = [7, 1, 5, 3, 6, 4]",
      steps: [
        {
          stepNumber: 1,
          state: "price=7, minPrice=7, maxProfit=0",
          action: "7 is new minPrice.",
          result: "minPrice = 7, maxProfit = 0",
        },
        {
          stepNumber: 2,
          state: "price=1, minPrice=7, maxProfit=0",
          action: "1 < 7, so update minPrice to 1.",
          result: "minPrice = 1, maxProfit = 0",
        },
        {
          stepNumber: 3,
          state: "price=5, minPrice=1, maxProfit=0",
          action: "profit = 5 - 1 = 4. 4 > 0, so update maxProfit.",
          result: "minPrice = 1, maxProfit = 4",
        },
        {
          stepNumber: 4,
          state: "price=3, minPrice=1, maxProfit=4",
          action: "profit = 3 - 1 = 2 < 4. No update.",
          result: "minPrice = 1, maxProfit = 4",
        },
        {
          stepNumber: 5,
          state: "price=6, minPrice=1, maxProfit=4",
          action: "profit = 6 - 1 = 5 > 4. Update maxProfit.",
          result: "minPrice = 1, maxProfit = 5",
        },
        {
          stepNumber: 6,
          state: "price=4, minPrice=1, maxProfit=5",
          action: "profit = 4 - 1 = 3 < 5. No update.",
          result: "Final maxProfit = 5.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Selling before buying: finding global max and global min without checking indices",
        fix: "If prices = [7, 1, 5], global max is 7 and global min is 1, but 7 comes before 1!",
      },
      {
        mistake: "Returning negative profit when prices keep dropping",
        fix: "Initialize maxProfit to 0 so you return 0 if no profitable trade exists.",
      },
    ],
    variations: [
      "Best Time to Buy and Sell Stock II (multiple transactions allowed)",
      "Best Time to Buy and Sell Stock with Cooldown",
      "Best Time to Buy and Sell Stock with Transaction Fee",
    ],
    practice: [
      { title: "Best Time to Buy and Sell Stock II", difficulty: "Medium" },
      { title: "Maximum Subarray", difficulty: "Medium" },
    ],
    tags: ["Array", "Dynamic Programming", "Greedy"],
    companies: ["Amazon", "Microsoft", "Goldman Sachs", "TCS", "Infosys", "Wipro"],
  },
  {
    id: "maximum-subarray",
    slug: "maximum-subarray",
    title: "Maximum Subarray (Kadane's Algorithm)",
    topic: "Arrays",
    subtopic: "Dynamic Programming & Prefix Optimization",
    difficulty: "Medium",
    progressionLevel: "Level 4: Optimization",
    statement:
      "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    understandTheProblem:
      "A subarray is a contiguous part of an array. You need to find a consecutive sequence of numbers that, when added together, produces the largest possible total sum. Negative numbers make this challenging because they reduce your running total.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
    ],
    examples: [
      {
        input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        output: "6",
        explanation: "The subarray [4, -1, 2, 1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1.",
      },
      {
        input: "nums = [5, 4, -1, 7, 8]",
        output: "23",
        explanation: "The subarray [5, 4, -1, 7, 8] has the largest sum 23.",
      },
    ],
    hints: [
      "If your current running sum drops below zero, can it ever help any future subarray produce a larger sum?",
      "At each element, you have two choices: either extend the previous subarray sum, or start fresh with just the current element.",
    ],
    bruteForce: {
      title: "Approach 1 — Brute Force (All Subarrays O(n^3))",
      intuition:
        "Generate all possible subarrays starting at index i and ending at index j, then sum all elements between i and j using a third loop.",
      code: {
        java: `public int maxSubArray(int[] nums) {
    int max = Integer.MIN_VALUE;
    for (int i = 0; i < nums.length; i++) {
        for (int j = i; j < nums.length; j++) {
            int sum = 0;
            for (int k = i; k <= j; k++) {
                sum += nums[k];
            }
            max = Math.max(max, sum);
        }
    }
    return max;
}`,
        cpp: `int maxSubArray(vector<int>& nums) {
    int maxSum = INT_MIN;
    int n = nums.size();
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            int sum = 0;
            for (int k = i; k <= j; k++) sum += nums[k];
            maxSum = max(maxSum, sum);
        }
    }
    return maxSum;
}`,
        python: `def maxSubArray(nums: list[int]) -> int:
    max_sum = float('-inf')
    n = len(nums)
    for i in range(n):
        for j in range(i, n):
            sub_sum = sum(nums[i:j+1])
            max_sum = max(max_sum, sub_sum)
    return max_sum`,
        javascript: `var maxSubArray = function(nums) {
    let maxSum = -Infinity;
    for (let i = 0; i < nums.length; i++) {
        let sum = 0;
        for (let j = i; j < nums.length; j++) {
            sum += nums[j];
            maxSum = Math.max(maxSum, sum);
        }
    }
    return maxSum;
};`,
      },
      timeComplexity: "O(n^3)",
      spaceComplexity: "O(1)",
      explanation: "Three nested loops yield cubic time complexity, unusable for n > 500.",
    },
    betterSolution: {
      title: "Approach 2 — Cumulative Subarray Sum O(n^2)",
      intuition:
        "Avoid recalculating the sum from scratch. As j advances in the inner loop, simply add `nums[j]` to the running total.",
      code: {
        java: `public int maxSubArray(int[] nums) {
    int max = Integer.MIN_VALUE;
    for (int i = 0; i < nums.length; i++) {
        int currentSum = 0;
        for (int j = i; j < nums.length; j++) {
            currentSum += nums[j];
            max = Math.max(max, currentSum);
        }
    }
    return max;
}`,
        cpp: `int maxSubArray(vector<int>& nums) {
    int maxSum = INT_MIN;
    for (size_t i = 0; i < nums.size(); i++) {
        int currentSum = 0;
        for (size_t j = i; j < nums.size(); j++) {
            currentSum += nums[j];
            maxSum = max(maxSum, currentSum);
        }
    }
    return maxSum;
}`,
        python: `def maxSubArray(nums: list[int]) -> int:
    max_sum = float('-inf')
    for i in range(len(nums)):
        cur = 0
        for j in range(i, len(nums)):
            cur += nums[j]
            max_sum = max(max_sum, cur)
    return max_sum`,
        javascript: `var maxSubArray = function(nums) {
    const n = nums.length;
    const dp = new Array(n);
    dp[0] = nums[0];
    let maxSum = nums[0];
    for (let i = 1; i < n; i++) {
        dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
        maxSum = Math.max(maxSum, dp[i]);
    }
    return maxSum;
};`,
      },
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
      explanation: "Better than O(n^3), but still TLE for n = 10^5.",
    },
    optimalSolution: {
      title: "Approach 3 — Kadane's Algorithm (Optimal O(n))",
      intuition:
        "Kadane's algorithm makes a local decision at each element: `currentSum = max(nums[i], currentSum + nums[i])`. If `currentSum` before this element was negative, adding it to `nums[i]` would only drag down the sum, so it's always better to discard the negative prefix and start fresh at `nums[i]`. We update `maxSum` at each step.",
      code: {
        java: `class Solution {
    public int maxSubArray(int[] nums) {
        int currentSum = nums[0];
        int maxSum = nums[0];

        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }

        return maxSum;
    }
}`,
        cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int currentSum = nums[0];
        int maxSum = nums[0];

        for (size_t i = 1; i < nums.size(); i++) {
            currentSum = max(nums[i], currentSum + nums[i]);
            maxSum = max(maxSum, currentSum);
        }

        return maxSum;
    }
};`,
        python: `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        current_sum = nums[0]
        max_sum = nums[0]

        for num in nums[1:]:
            current_sum = max(num, current_sum + num)
            max_sum = max(max_sum, current_sum)

        return max_sum`,
        javascript: `var maxSubArray = function(nums) {
    let currentSum = nums[0];
    let maxSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      whyOptimal:
        "Iterates through the array exactly once, keeping only two scalar variables. This is the gold-standard algorithm for maximum subarray problems.",
    },
    pattern: "Kadane's Algorithm / Dynamic Programming",
    complexitySummary: {
      time: "O(n)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
      steps: [
        {
          stepNumber: 1,
          state: "init: currentSum = -2, maxSum = -2",
          action: "i=1, num=1: max(1, -2 + 1) = 1.",
          result: "currentSum = 1, maxSum = 1",
        },
        {
          stepNumber: 2,
          state: "i=2, num=-3",
          action: "max(-3, 1 + -3) = -2.",
          result: "currentSum = -2, maxSum = 1",
        },
        {
          stepNumber: 3,
          state: "i=3, num=4",
          action: "max(4, -2 + 4) = 4 (discard negative prefix!).",
          result: "currentSum = 4, maxSum = 4",
        },
        {
          stepNumber: 4,
          state: "i=4, num=-1",
          action: "max(-1, 4 + -1) = 3.",
          result: "currentSum = 3, maxSum = 4",
        },
        {
          stepNumber: 5,
          state: "i=5, num=2",
          action: "max(2, 3 + 2) = 5.",
          result: "currentSum = 5, maxSum = 5",
        },
        {
          stepNumber: 6,
          state: "i=6, num=1",
          action: "max(1, 5 + 1) = 6.",
          result: "currentSum = 6, maxSum = 6",
        },
        {
          stepNumber: 7,
          state: "i=7, num=-5",
          action: "max(-5, 6 + -5) = 1.",
          result: "currentSum = 1, maxSum = 6",
        },
        {
          stepNumber: 8,
          state: "i=8, num=4",
          action: "max(4, 1 + 4) = 5.",
          result: "currentSum = 5, maxSum = 6. Complete!",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Initializing maxSum to 0 when all array elements are negative (e.g. [-5, -2, -8])",
        fix: "If all elements are negative, max subarray is the least negative element (e.g. -2). Initializing to 0 gives the wrong answer 0! Always initialize to nums[0] or MIN_VALUE.",
      },
    ],
    variations: [
      "Maximum Product Subarray",
      "Maximum Sum Circular Subarray",
      "Print the actual subarray indices that yield the maximum sum",
    ],
    practice: [
      { title: "Maximum Product Subarray", difficulty: "Medium" },
      { title: "Maximum Sum Circular Subarray", difficulty: "Medium" },
    ],
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    companies: ["Google", "Amazon", "Microsoft", "Uber", "Flipkart"],
  },
  {
    id: "move-zeroes",
    slug: "move-zeroes",
    title: "Move Zeroes",
    topic: "Arrays",
    subtopic: "In-Place Two Pointers",
    difficulty: "Easy",
    progressionLevel: "Level 2: Basic Implementation",
    statement:
      "Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements. Note that you must do this in-place without making a copy of the array.",
    understandTheProblem:
      "You have an array with some zeros and some non-zero values. You must rearrange the array in place so that all non-zero numbers shift to the front in their original relative sequence, and all zeros gather at the back.",
    constraints: [
      "1 <= nums.length <= 10^4",
      "-2^31 <= nums[i] <= 2^31 - 1",
    ],
    examples: [
      {
        input: "nums = [0, 1, 0, 3, 12]",
        output: "[1, 3, 12, 0, 0]",
        explanation: "Non-zeros 1, 3, 12 keep relative order; both 0s are pushed to the end.",
      },
      {
        input: "nums = [0]",
        output: "[0]",
        explanation: "Single zero array remains unchanged.",
      },
    ],
    hints: [
      "Think of two pointers: one pointer points to where the next non-zero should be placed, while the second pointer scans for non-zero elements.",
      "Can you swap elements between the two pointers?",
    ],
    bruteForce: {
      title: "Approach 1 — Extra Array (O(n) space)",
      intuition:
        "Create a new array of the same size. Copy all non-zero numbers to the front, and the rest remain default zeros. Then copy back to the original array.",
      code: {
        java: `public void moveZeroes(int[] nums) {
    int[] temp = new int[nums.length];
    int idx = 0;
    for (int x : nums) {
        if (x != 0) temp[idx++] = x;
    }
    for (int i = 0; i < nums.length; i++) {
        nums[i] = temp[i];
    }
}`,
        cpp: `void moveZeroes(vector<int>& nums) {
    vector<int> temp(nums.size(), 0);
    int idx = 0;
    for (int x : nums) {
        if (x != 0) temp[idx++] = x;
    }
    nums = temp;
}`,
        python: `def moveZeroes(nums: list[int]) -> None:
    temp = [x for x in nums if x != 0]
    for i in range(len(temp)):
        nums[i] = temp[i]
    for i in range(len(temp), len(nums)):
        nums[i] = 0`,
        javascript: `var moveZeroes = function(nums) {
    const temp = [];
    for (const num of nums) {
        if (num !== 0) temp.push(num);
    }
    while (temp.length < nums.length) {
        temp.push(0);
    }
    for (let i = 0; i < nums.length; i++) {
        nums[i] = temp[i];
    }
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      explanation: "Violates the strict interview constraint: 'must do this in-place without making a copy'.",
    },
    optimalSolution: {
      title: "Approach 2 — Two Pointers In-Place Swap (Optimal)",
      intuition:
        "Maintain a slow pointer `insertPos` that tracks the position where the next non-zero element belongs. Traverse the array with a fast pointer `i`. Whenever `nums[i] != 0`, swap `nums[insertPos]` with `nums[i]` and increment `insertPos`. This naturally bubbles zeros to the right while keeping non-zeros in order.",
      code: {
        java: `class Solution {
    public void moveZeroes(int[] nums) {
        int insertPos = 0;

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                int temp = nums[insertPos];
                nums[insertPos] = nums[i];
                nums[i] = temp;
                insertPos++;
            }
        }
    }
}`,
        cpp: `class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int insertPos = 0;

        for (size_t i = 0; i < nums.size(); i++) {
            if (nums[i] != 0) {
                swap(nums[insertPos], nums[i]);
                insertPos++;
            }
        }
    }
};`,
        python: `class Solution:
    def moveZeroes(self, nums: list[int]) -> None:
        insert_pos = 0
        for i in range(len(nums)):
            if nums[i] != 0:
                nums[insert_pos], nums[i] = nums[i], nums[insert_pos]
                insert_pos += 1`,
        javascript: `var moveZeroes = function(nums) {
    let lastNonZero = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            [nums[lastNonZero], nums[i]] = [nums[i], nums[lastNonZero]];
            lastNonZero++;
        }
    }
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      whyOptimal:
        "Single pass over the array with zero extra memory allocation, modifying elements strictly in-place.",
    },
    pattern: "Two Pointers (Slow / Fast)",
    complexitySummary: {
      time: "O(n)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "nums = [0, 1, 0, 3, 12]",
      steps: [
        {
          stepNumber: 1,
          state: "i=0, num=0, insertPos=0",
          action: "num is 0, do nothing.",
          result: "nums = [0, 1, 0, 3, 12], insertPos = 0",
        },
        {
          stepNumber: 2,
          state: "i=1, num=1, insertPos=0",
          action: "num != 0. Swap nums[0] and nums[1]. insertPos++.",
          result: "nums = [1, 0, 0, 3, 12], insertPos = 1",
        },
        {
          stepNumber: 3,
          state: "i=2, num=0, insertPos=1",
          action: "num is 0, do nothing.",
          result: "nums = [1, 0, 0, 3, 12], insertPos = 1",
        },
        {
          stepNumber: 4,
          state: "i=3, num=3, insertPos=1",
          action: "num != 0. Swap nums[1] and nums[3]. insertPos++.",
          result: "nums = [1, 3, 0, 0, 12], insertPos = 2",
        },
        {
          stepNumber: 5,
          state: "i=4, num=12, insertPos=2",
          action: "num != 0. Swap nums[2] and nums[4]. insertPos++.",
          result: "nums = [1, 3, 12, 0, 0], insertPos = 3. Done!",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Deleting 0s with list.remove(0) in a loop in Python",
        why: "`remove()` is an O(n) operation inside an O(n) loop, turning your solution into an O(n^2) bottleneck.",
        fix: "Use the two-pointer in-place swap pattern.",
      },
    ],
    variations: [
      "Remove Element (remove all instances of a specific value in-place)",
      "Sort Colors (Dutch National Flag: 0s, 1s, and 2s)",
    ],
    practice: [
      { title: "Remove Element", difficulty: "Easy" },
      { title: "Sort Colors", difficulty: "Medium" },
    ],
    tags: ["Array", "Two Pointers"],
    companies: ["Meta", "Bloomberg", "Amazon", "Infosys", "Microsoft"],
  },
  {
    id: "contains-duplicate",
    slug: "contains-duplicate",
    title: "Contains Duplicate",
    topic: "Arrays",
    subtopic: "Hash Sets & Sorting",
    difficulty: "Easy",
    progressionLevel: "Level 1: Concept Understanding",
    statement:
      "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
    understandTheProblem:
      "Check whether there are any duplicate values in the array. If even a single number repeats, output true. If all numbers are unique, output false.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
    ],
    examples: [
      {
        input: "nums = [1, 2, 3, 1]",
        output: "true",
        explanation: "1 appears twice (at index 0 and index 3).",
      },
      {
        input: "nums = [1, 2, 3, 4]",
        output: "false",
        explanation: "All elements are distinct.",
      },
      {
        input: "nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]",
        output: "true",
        explanation: "Multiple elements appear repeatedly.",
      },
    ],
    hints: [
      "If you sort the array, where will identical elements end up? (Adjacent to each other).",
      "Can a Hash Set detect if you've already seen an element in O(1) time?",
    ],
    bruteForce: {
      title: "Approach 1 — Brute Force (Nested Loops)",
      intuition: "Compare each element i with every element j after it. If nums[i] == nums[j], return true.",
      code: {
        java: `public boolean containsDuplicate(int[] nums) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] == nums[j]) return true;
        }
    }
    return false;
}`,
        cpp: `bool containsDuplicate(vector<int>& nums) {
    for (size_t i = 0; i < nums.size(); i++) {
        for (size_t j = i + 1; j < nums.size(); j++) {
            if (nums[i] == nums[j]) return true;
        }
    }
    return false;
}`,
        python: `def containsDuplicate(nums: list[int]) -> bool:
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] == nums[j]:
                return True
    return False`,
        javascript: `var containsDuplicate = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] === nums[j]) return true;
        }
    }
    return false;
};`,
      },
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
      explanation: "Takes quadratic time, timing out for N = 10^5.",
    },
    betterSolution: {
      title: "Approach 2 — Sorting",
      intuition:
        "Sort the array. If any duplicates exist, they will be positioned right next to each other. Check if `nums[i] == nums[i-1]`.",
      code: {
        java: `public boolean containsDuplicate(int[] nums) {
    Arrays.sort(nums);
    for (int i = 1; i < nums.length; i++) {
        if (nums[i] == nums[i - 1]) return true;
    }
    return false;
}`,
        cpp: `bool containsDuplicate(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    for (size_t i = 1; i < nums.size(); i++) {
        if (nums[i] == nums[i - 1]) return true;
    }
    return false;
}`,
        python: `def containsDuplicate(nums: list[int]) -> bool:
    nums.sort()
    for i in range(1, len(nums)):
        if nums[i] == nums[i - 1]:
            return True
    return False`,
        javascript: `var containsDuplicate = function(nums) {
    nums.sort((a, b) => a - b);
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) return true;
    }
    return false;
};`,
      },
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1) to O(n) depending on sort implementation",
      explanation: "Better time than brute force, and uses minimal extra space if sorting in-place.",
    },
    optimalSolution: {
      title: "Approach 3 — Hash Set (Optimal O(n))",
      intuition:
        "Iterate through the array and attempt to insert each element into a Hash Set. If the element is already present in the set, a duplicate has been found! If the loop completes without finding any duplicate, return false.",
      code: {
        java: `import java.util.HashSet;
import java.util.Set;

class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        
        for (int num : nums) {
            if (seen.contains(num)) {
                return true;
            }
            seen.add(num);
        }
        
        return false;
    }
}`,
        cpp: `#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        
        for (int num : nums) {
            if (seen.count(num)) {
                return true;
            }
            seen.insert(num);
        }
        
        return false;
    }
};`,
        python: `class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        seen = set()
        for num in nums:
            if num in seen:
                return True
            seen.add(num)
        return False`,
        javascript: `var containsDuplicate = function(nums) {
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    return false;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      whyOptimal:
        "O(1) average lookup and insertion time in Hash Set gives linear overall time complexity. Early returns terminate as soon as the first duplicate is encountered.",
    },
    pattern: "Hash Set / Membership Testing",
    complexitySummary: {
      time: "O(n)",
      space: "O(n)",
    },
    dryRun: {
      sampleInput: "nums = [1, 2, 3, 1]",
      steps: [
        { stepNumber: 1, state: "num=1, seen={}", action: "1 not in seen. Add 1.", result: "seen = {1}" },
        { stepNumber: 2, state: "num=2, seen={1}", action: "2 not in seen. Add 2.", result: "seen = {1, 2}" },
        { stepNumber: 3, state: "num=3, seen={1, 2}", action: "3 not in seen. Add 3.", result: "seen = {1, 2, 3}" },
        { stepNumber: 4, state: "num=1, seen={1, 2, 3}", action: "1 IS in seen! Duplicate found.", result: "Return true immediately!" },
      ],
    },
    commonMistakes: [
      {
        mistake: "Assuming array values are small enough to use a boolean frequency array",
        why: "Constraints say -10^9 <= nums[i] <= 10^9. An array of size 10^9 would require gigabytes of memory and cause OutOfMemoryError.",
        fix: "Always use a Hash Set when value range is large.",
      },
    ],
    variations: [
      "Contains Duplicate II (duplicate within distance k)",
      "Contains Duplicate III (value difference within t and index difference within k)",
    ],
    practice: [
      { title: "Contains Duplicate II", difficulty: "Easy" },
      { title: "Valid Anagram", difficulty: "Easy" },
    ],
    tags: ["Array", "Hash Table", "Sorting"],
    companies: ["Apple", "Microsoft", "TCS", "Accenture", "Amazon"],
  },
  {
    id: "remove-duplicates-from-sorted-array",
    slug: "remove-duplicates-from-sorted-array",
    title: "Remove Duplicates from Sorted Array",
    topic: "Arrays",
    subtopic: "In-Place Two Pointers",
    difficulty: "Easy",
    progressionLevel: "Level 2: Basic Implementation",
    statement:
      "Given an integer array `nums` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in `nums`.",
    understandTheProblem:
      "The input array is already sorted. Because identical numbers sit next to each other, you need to overwrite the duplicate positions in-place with unique values, returning how many unique numbers exist.",
    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "-100 <= nums[i] <= 100",
      "nums is sorted in non-decreasing order.",
    ],
    examples: [
      {
        input: "nums = [1, 1, 2]",
        output: "2, nums = [1, 2, _]",
        explanation: "Function returns k = 2, with the first two elements of nums being 1 and 2 respectively.",
      },
      {
        input: "nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]",
        output: "5, nums = [0, 1, 2, 3, 4, _, _, _, _, _]",
        explanation: "Function returns k = 5, with the first five elements being 0, 1, 2, 3, and 4.",
      },
    ],
    hints: [
      "Since the array is sorted, duplicates are guaranteed to be contiguous.",
      "Use two pointers: `i` for placing the next unique element, and `j` for scanning through the array.",
    ],
    bruteForce: {
      title: "Approach 1 — Extra LinkedHashSet / Ordered Set",
      intuition: "Insert all elements into an ordered set to strip duplicates, then overwrite the original array.",
      code: {
        java: `public int removeDuplicates(int[] nums) {
    Set<Integer> set = new LinkedHashSet<>();
    for (int x : nums) set.add(x);
    int idx = 0;
    for (int x : set) nums[idx++] = x;
    return set.size();
}`,
        cpp: `int removeDuplicates(vector<int>& nums) {
    set<int> s(nums.begin(), nums.end());
    int idx = 0;
    for (int x : s) nums[idx++] = x;
    return s.size();
}`,
        python: `def removeDuplicates(nums: list[int]) -> int:
    unique = sorted(list(set(nums)))
    for i in range(len(unique)):
        nums[i] = unique[i]
    return len(unique)`,
        javascript: `var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;
    const unique = [];
    for (const num of nums) {
        if (unique.length === 0 || unique[unique.length - 1] !== num) {
            unique.push(num);
        }
    }
    for (let i = 0; i < unique.length; i++) {
        nums[i] = unique[i];
    }
    return unique.length;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      explanation: "Uses extra memory, violating the requirement of O(1) auxiliary space.",
    },
    optimalSolution: {
      title: "Approach 2 — Two Pointers In-Place (Optimal O(1) Space)",
      intuition:
        "Pointer `i` points to the last known unique element (initially at index 0). Fast pointer `j` scans from index 1 to the end. Whenever `nums[j] != nums[i]`, we have encountered a new unique value! Increment `i` and set `nums[i] = nums[j]`. At the end, `i + 1` is the total number of unique elements.",
      code: {
        java: `class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;

        int i = 0;
        for (int j = 1; j < nums.length; j++) {
            if (nums[j] != nums[i]) {
                i++;
                nums[i] = nums[j];
            }
        }

        return i + 1;
    }
}`,
        cpp: `class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;

        int i = 0;
        for (size_t j = 1; j < nums.size(); j++) {
            if (nums[j] != nums[i]) {
                i++;
                nums[i] = nums[j];
            }
        }

        return i + 1;
    }
};`,
        python: `class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
        if not nums:
            return 0

        i = 0
        for j in range(1, len(nums)):
            if nums[j] != nums[i]:
                i += 1
                nums[i] = nums[j]

        return i + 1`,
        javascript: `var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;
    let k = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            nums[k] = nums[i];
            k++;
        }
    }
    return k;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      whyOptimal:
        "Linear scan with two pointers and strictly constant auxiliary space.",
    },
    pattern: "Two Pointers (Slow / Fast)",
    complexitySummary: {
      time: "O(n)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "nums = [1, 1, 2]",
      steps: [
        {
          stepNumber: 1,
          state: "i=0, j=1, nums=[1, 1, 2]",
          action: "nums[1] (1) == nums[0] (1). Duplicate, advance j.",
          result: "i=0, j=2",
        },
        {
          stepNumber: 2,
          state: "i=0, j=2, nums=[1, 1, 2]",
          action: "nums[2] (2) != nums[0] (1). New unique! i++, nums[1] = nums[2].",
          result: "nums=[1, 2, 2], i=1",
        },
        {
          stepNumber: 3,
          state: "loop ends",
          action: "Return i + 1 = 1 + 1 = 2.",
          result: "Result: 2 unique elements.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Returning the length of the original array instead of i + 1",
        fix: "The problem asks for the count of unique elements, which is i + 1.",
      },
    ],
    variations: [
      "Remove Duplicates from Sorted Array II (at most two duplicates allowed)",
      "Remove Element",
    ],
    practice: [
      { title: "Remove Duplicates from Sorted Array II", difficulty: "Medium" },
      { title: "Move Zeroes", difficulty: "Easy" },
    ],
    tags: ["Array", "Two Pointers"],
    companies: ["Microsoft", "Meta", "Amazon", "Adobe"],
  },
  {
    id: "subarray-sum-equals-k",
    slug: "subarray-sum-equals-k",
    title: "Subarray Sum Equals K",
    topic: "Arrays",
    subtopic: "Prefix Sum & Hash Map",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`. A subarray is a contiguous non-empty sequence of elements within an array.",
    understandTheProblem:
      "Count how many contiguous slices of the array add up to exactly k. Note that numbers can be negative or zero, meaning sliding window will NOT work here because adding numbers doesn't always increase the sum!",
    constraints: [
      "1 <= nums.length <= 2 * 10^4",
      "-1000 <= nums[i] <= 1000",
      "-10^7 <= k <= 10^7",
    ],
    examples: [
      {
        input: "nums = [1, 1, 1], k = 2",
        output: "2",
        explanation: "Subarrays [1, 1] at indices [0, 1] and [1, 2] both sum to 2.",
      },
      {
        input: "nums = [1, 2, 3], k = 3",
        output: "2",
        explanation: "Subarrays [1, 2] and [3] both sum to 3.",
      },
    ],
    hints: [
      "If the prefix sum from index 0 to j is S_j, and prefix sum from index 0 to i is S_i, then the sum between i and j is S_j - S_i.",
      "We want S_j - S_i = k, which rearranges to: S_i = S_j - k! Can you store frequencies of prefix sums in a Hash Map?",
    ],
    bruteForce: {
      title: "Approach 1 — Brute Force (All Subarrays O(n^2))",
      intuition:
        "Check every starting index i and calculate the running sum up to index j. If the running sum equals k, increment counter.",
      code: {
        java: `public int subarraySum(int[] nums, int k) {
    int count = 0;
    for (int i = 0; i < nums.length; i++) {
        int sum = 0;
        for (int j = i; j < nums.length; j++) {
            sum += nums[j];
            if (sum == k) count++;
        }
    }
    return count;
}`,
        cpp: `int subarraySum(vector<int>& nums, int k) {
    int count = 0;
    for (size_t i = 0; i < nums.size(); i++) {
        int sum = 0;
        for (size_t j = i; j < nums.size(); j++) {
            sum += nums[j];
            if (sum == k) count++;
        }
    }
    return count;
}`,
        python: `def subarraySum(nums: list[int], k: int) -> int:
    count = 0
    for i in range(len(nums)):
        cur = 0
        for j in range(i, len(nums)):
            cur += nums[j]
            if cur == k:
                count += 1
    return count`,
        javascript: `var subarraySum = function(nums, k) {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        let sum = 0;
        for (let j = i; j < nums.length; j++) {
            sum += nums[j];
            if (sum === k) count++;
        }
    }
    return count;
};`,
      },
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
      explanation: "Evaluates all N*(N+1)/2 subarrays, taking ~2 * 10^8 operations for N = 20,000.",
    },
    optimalSolution: {
      title: "Approach 2 — Prefix Sum + Hash Map (Optimal O(n))",
      intuition:
        "Let `prefixSum` be the cumulative sum from index 0 to current index. A subarray ending at current index sums to `k` if there exists an earlier prefix sum equal to `prefixSum - k`. We store how many times each prefix sum has occurred in a Hash Map. Important: initialize map with `(0 -> 1)` to account for subarrays starting from index 0.",
      code: {
        java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int subarraySum(int[] nums, int k) {
        int count = 0;
        int currentPrefixSum = 0;
        Map<Integer, Integer> prefixCounts = new HashMap<>();
        
        prefixCounts.put(0, 1);

        for (int num : nums) {
            currentPrefixSum += num;
            int targetPrefix = currentPrefixSum - k;
            if (prefixCounts.containsKey(targetPrefix)) {
                count += prefixCounts.get(targetPrefix);
            }
            prefixCounts.put(currentPrefixSum, prefixCounts.getOrDefault(currentPrefixSum, 0) + 1);
        }

        return count;
    }
}`,
        cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int count = 0;
        int currentPrefixSum = 0;
        unordered_map<int, int> prefixCounts;
        
        prefixCounts[0] = 1;

        for (int num : nums) {
            currentPrefixSum += num;
            int target = currentPrefixSum - k;
            
            if (prefixCounts.find(target) != prefixCounts.end()) {
                count += prefixCounts[target];
            }
            
            prefixCounts[currentPrefixSum]++;
        }

        return count;
    }
};`,
        python: `class Solution:
    def subarraySum(self, nums: list[int], k: int) -> int:
        count = 0
        current_sum = 0
        prefix_counts = {0: 1}

        for num in nums:
            current_sum += num
            target = current_sum - k
            if target in prefix_counts:
                count += prefix_counts[target]
            prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1

        return count`,
        javascript: `var subarraySum = function(nums, k) {
    const map = new Map();
    map.set(0, 1);
    let prefixSum = 0;
    let count = 0;

    for (const num of nums) {
        prefixSum += num;
        if (map.has(prefixSum - k)) {
            count += map.get(prefixSum - k);
        }
        map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
    }

    return count;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      whyOptimal:
        "Single pass over the array with constant time map operations. Handles positive, negative, and zero values with equal ease.",
    },
    pattern: "Prefix Sum with Hash Map",
    complexitySummary: {
      time: "O(n)",
      space: "O(n)",
    },
    dryRun: {
      sampleInput: "nums = [1, -1, 1, 1, 1], k = 2",
      steps: [
        {
          stepNumber: 1,
          state: "init: map={0: 1}, count=0, sum=0",
          action: "num=1: sum=1. target = 1 - 2 = -1. Not in map.",
          result: "map={0: 1, 1: 1}, count=0",
        },
        {
          stepNumber: 2,
          state: "num=-1: sum=0",
          action: "target = 0 - 2 = -2. Not in map.",
          result: "map={0: 2, 1: 1}, count=0",
        },
        {
          stepNumber: 3,
          state: "num=1: sum=1",
          action: "target = 1 - 2 = -1. Not in map.",
          result: "map={0: 2, 1: 2}, count=0",
        },
        {
          stepNumber: 4,
          state: "num=1: sum=2",
          action: "target = 2 - 2 = 0. 0 is in map with count 2!",
          result: "count += 2 (subarrays [1, -1, 1, 1] and [1, 1]), map[2]=1",
        },
        {
          stepNumber: 5,
          state: "num=1: sum=3",
          action: "target = 3 - 2 = 1. 1 is in map with count 2!",
          result: "count += 2 (now count = 4). Done!",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Trying to use two-pointer sliding window on an array with negative numbers",
        why: "Sliding window requires monotonicity (expanding always increases sum, shrinking always decreases). With negative numbers, expanding can decrease the sum.",
        fix: "Always use Prefix Sum + Hash Map when numbers can be negative.",
      },
      {
        mistake: "Forgetting to initialize `prefixCounts.put(0, 1)`",
        why: "Without this base case, any subarray that sums to k starting directly from index 0 will fail to be counted!",
        fix: "Always record prefix sum 0 with count 1 before iterating.",
      },
    ],
    variations: [
      "Continuous Subarray Sum (multiple of k)",
      "Subarray Sums Divisible by K",
      "Contiguous Array (equal number of 0s and 1s)",
    ],
    practice: [
      { title: "Contiguous Array", difficulty: "Medium" },
      { title: "Subarray Sums Divisible by K", difficulty: "Medium" },
    ],
    tags: ["Array", "Hash Table", "Prefix Sum"],
    companies: ["Meta", "Google", "Amazon", "Microsoft"],
  },
  {
    id: "three-sum",
    slug: "three-sum",
    title: "3Sum",
    topic: "Arrays",
    subtopic: "Sorting & Two Pointers",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. Notice that the solution set must not contain duplicate triplets.",
    understandTheProblem:
      "Find every unique group of three numbers from the array that sum to zero. You must avoid returning duplicate triplet combinations even if identical values appear multiple times in nums.",
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5",
    ],
    examples: [
      {
        input: "nums = [-1, 0, 1, 2, -1, -4]",
        output: "[[-1, -1, 2], [-1, 0, 1]]",
        explanation: "Distinct triplets are [-1, 0, 1] and [-1, -1, 2].",
      },
      {
        input: "nums = [0, 1, 1]",
        output: "[]",
        explanation: "The only possible triplet does not sum up to 0.",
      },
      {
        input: "nums = [0, 0, 0]",
        output: "[[0, 0, 0]]",
        explanation: "The only possible triplet sums up to 0.",
      },
    ],
    hints: [
      "What if you sort the array first? How does sorting simplify duplicate detection and range searching?",
      "For each element nums[i], can you reduce the problem to Two Sum II (two pointers) on the subarray to the right?",
    ],
    bruteForce: {
      title: "Approach 1 — Brute Force (Three Nested Loops O(n^3))",
      intuition:
        "Check all combinations of three indices (i, j, k). If their sum is 0, sort the triplet and insert into a set to prevent duplicates.",
      code: {
        java: `public List<List<Integer>> threeSum(int[] nums) {
    Set<List<Integer>> set = new HashSet<>();
    int n = nums.length;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            for (int k = j + 1; k < n; k++) {
                if (nums[i] + nums[j] + nums[k] == 0) {
                    List<Integer> triplet = Arrays.asList(nums[i], nums[j], nums[k]);
                    Collections.sort(triplet);
                    set.add(triplet);
                }
            }
        }
    }
    return new ArrayList<>(set);
}`,
        cpp: `vector<vector<int>> threeSum(vector<int>& nums) {
    set<vector<int>> s;
    int n = nums.size();
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            for (int k = j + 1; k < n; k++) {
                if (nums[i] + nums[j] + nums[k] == 0) {
                    vector<int> t = {nums[i], nums[j], nums[k]};
                    sort(t.begin(), t.end());
                    s.insert(t);
                }
            }
        }
    }
    return vector<vector<int>>(s.begin(), s.end());
}`,
        python: `def threeSum(nums: list[int]) -> list[list[int]]:
    res = set()
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                if nums[i] + nums[j] + nums[k] == 0:
                    triplet = tuple(sorted([nums[i], nums[j], nums[k]]))
                    res.add(triplet)
    return [list(t) for t in res]`,
        javascript: `var threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        for (let j = i + 1; j < n; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            for (let k = j + 1; k < n; k++) {
                if (k > j + 1 && nums[k] === nums[k - 1]) continue;
                if (nums[i] + nums[j] + nums[k] === 0) {
                    result.push([nums[i], nums[j], nums[k]]);
                }
            }
        }
    }
    return result;
};`,
      },
      timeComplexity: "O(n^3)",
      spaceComplexity: "O(n) for the duplicate filter set",
      explanation: "For n = 3000, n^3 ~ 2.7 * 10^10 operations, guaranteeing TLE.",
    },
    optimalSolution: {
      title: "Approach 2 — Sorting + Two Pointers (Optimal O(n^2))",
      intuition:
        "Sort `nums`. Iterate index `i` from 0 to n-3. If `nums[i] > 0`, break because positive sorted numbers cannot sum to 0. Skip duplicate `nums[i]`. For each `i`, set `left = i + 1` and `right = n - 1`. If `nums[i] + nums[left] + nums[right] == 0`, record the triplet and advance pointers past duplicates. If sum < 0, advance `left++`. If sum > 0, decrement `right--`.",
      code: {
        java: `import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums);
        int n = nums.length;

        for (int i = 0; i < n - 2; i++) {
            if (nums[i] > 0) break;
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            int left = i + 1;
            int right = n - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        return result;
    }
}`,
        cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> result;
        sort(nums.begin(), nums.end());
        int n = nums.size();

        for (int i = 0; i < n - 2; i++) {
            if (nums[i] > 0) break;
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            int left = i + 1, right = n - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    result.push_back({nums[i], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return result;
    }
};`,
        python: `class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        nums.sort()
        res = []
        n = len(nums)

        for i in range(n - 2):
            if nums[i] > 0:
                break
            if i > 0 and nums[i] == nums[i - 1]:
                continue

            left, right = i + 1, n - 1
            while left < right:
                total = nums[i] + nums[left] + nums[right]
                if total == 0:
                    res.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    left += 1
                    right -= 1
                elif total < 0:
                    left += 1
                else:
                    right -= 1

        return res`,
        javascript: `var threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
};`,
      },
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1) auxiliary (excluding return list and sort stack)",
      whyOptimal:
        "Sorting takes O(n log n). The nested two-pointer scan takes O(n) per element, giving O(n^2) total time with zero hash table overhead.",
    },
    pattern: "Sorting + Two Pointers",
    complexitySummary: {
      time: "O(n^2)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "nums = [-1, 0, 1, 2, -1, -4] -> Sorted: [-4, -1, -1, 0, 1, 2]",
      steps: [
        {
          stepNumber: 1,
          state: "i=0 (num=-4), left=1 (-1), right=5 (2)",
          action: "sum = -4 + (-1) + 2 = -3 < 0. left++.",
          result: "No triplet found, left moves forward.",
        },
        {
          stepNumber: 2,
          state: "i=1 (num=-1), left=2 (-1), right=5 (2)",
          action: "sum = -1 + (-1) + 2 = 0. Found triplet [-1, -1, 2]! left++, right--.",
          result: "Added [-1, -1, 2]. left=3 (0), right=4 (1).",
        },
        {
          stepNumber: 3,
          state: "i=1 (num=-1), left=3 (0), right=4 (1)",
          action: "sum = -1 + 0 + 1 = 0. Found triplet [-1, 0, 1]! left++, right--.",
          result: "Added [-1, 0, 1]. left crosses right, proceed to next i.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Forgetting to skip duplicate elements for both i and inner pointers",
        fix: "Check `if (i > 0 && nums[i] == nums[i - 1]) continue;` and loop past duplicates after recording a match.",
      },
    ],
    variations: [
      "3Sum Closest (sum closest to target)",
      "4Sum",
      "3Sum Smaller",
    ],
    practice: [
      { title: "3Sum Closest", difficulty: "Medium" },
      { title: "4Sum", difficulty: "Medium" },
    ],
    tags: ["Array", "Two Pointers", "Sorting"],
    companies: ["Amazon", "Meta", "Microsoft", "Google", "Flipkart", "Uber"],
  },
  {
    id: "product-of-array-except-self",
    slug: "product-of-array-except-self",
    title: "Product of Array Except Self",
    topic: "Arrays",
    subtopic: "Prefix & Suffix Products",
    difficulty: "Medium",
    progressionLevel: "Level 4: Optimization",
    statement:
      "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in `O(n)` time and without using the division operation.",
    understandTheProblem:
      "For each position in the array, compute the product of all other numbers excluding the current one. The key challenge: You are strictly forbidden from calculating the total product and dividing by nums[i]!",
    constraints: [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
    ],
    examples: [
      {
        input: "nums = [1, 2, 3, 4]",
        output: "[24, 12, 8, 6]",
        explanation: "answer[0] = 2*3*4=24, answer[1] = 1*3*4=12, answer[2] = 1*2*4=8, answer[3] = 1*2*3=6.",
      },
      {
        input: "nums = [-1, 1, 0, -3, 3]",
        output: "[0, 0, 9, 0, 0]",
        explanation: "Any index other than 2 includes 0 in its product, yielding 0. At index 2, product is (-1)*1*(-3)*3 = 9.",
      },
    ],
    hints: [
      "For any index i, answer[i] = (product of elements before i) * (product of elements after i).",
      "Can you compute running prefix products in one pass, and running suffix products in a second reverse pass?",
    ],
    bruteForce: {
      title: "Approach 1 — Nested Loops O(n^2)",
      intuition:
        "For each element at index i, run a second loop multiplying every element at index j where j != i.",
      code: {
        java: `public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] ans = new int[n];
    for (int i = 0; i < n; i++) {
        int prod = 1;
        for (int j = 0; j < n; j++) {
            if (i != j) prod *= nums[j];
        }
        ans[i] = prod;
    }
    return ans;
}`,
        cpp: `vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> ans(n, 1);
    for (int i = 0; i < n; i++) {
        int prod = 1;
        for (int j = 0; j < n; j++) {
            if (i != j) prod *= nums[j];
        }
        ans[i] = prod;
    }
    return ans;
}`,
        python: `def productExceptSelf(nums: list[int]) -> list[int]:
    n = len(nums)
    ans = [1] * n
    for i in range(n):
        prod = 1
        for j in range(n):
            if i != j:
                prod *= nums[j]
        ans[i] = prod
    return ans`,
        javascript: `var productExceptSelf = function(nums) {
    const n = nums.length;
    const answer = new Array(n).fill(1);
    for (let i = 0; i < n; i++) {
        let prod = 1;
        for (let j = 0; j < n; j++) {
            if (i !== j) prod *= nums[j];
        }
        answer[i] = prod;
    }
    return answer;
};`,
      },
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1) auxiliary",
      explanation: "For n = 10^5, n^2 = 10^10 operations, exceeding typical 1-second execution limits.",
    },
    optimalSolution: {
      title: "Approach 2 — Prefix & Running Suffix Product (Optimal O(n), O(1) Extra Space)",
      intuition:
        "Initialize `ans[0] = 1`. In a forward pass, compute prefix products: `ans[i] = ans[i-1] * nums[i-1]`. Now `ans[i]` contains the product of everything to the left of `i`. In a backward pass, maintain a running `suffix = 1` variable. Multiply `ans[i] *= suffix`, then update `suffix *= nums[i]`. This yields the final product in O(1) auxiliary memory.",
      code: {
        java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] ans = new int[n];

        ans[0] = 1;
        for (int i = 1; i < n; i++) {
            ans[i] = ans[i - 1] * nums[i - 1];
        }

        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            ans[i] *= suffix;
            suffix *= nums[i];
        }

        return ans;
    }
}`,
        cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(n, 1);

        for (int i = 1; i < n; i++) {
            ans[i] = ans[i - 1] * nums[i - 1];
        }

        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            ans[i] *= suffix;
            suffix *= nums[i];
        }

        return ans;
    }
};`,
        python: `class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:
        n = len(nums)
        ans = [1] * n

        for i in range(1, n):
            ans[i] = ans[i - 1] * nums[i - 1]

        suffix = 1
        for i in range(n - 1, -1, -1):
            ans[i] *= suffix
            suffix *= nums[i]

        return ans`,
        javascript: `var productExceptSelf = function(nums) {
    const n = nums.length;
    const answer = new Array(n);

    answer[0] = 1;
    for (let i = 1; i < n; i++) {
        answer[i] = answer[i - 1] * nums[i - 1];
    }

    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        answer[i] *= suffix;
        suffix *= nums[i];
    }

    return answer;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(1) auxiliary (output array does not count toward space)",
      whyOptimal:
        "Two linear passes with no additional arrays, avoiding division entirely and handling zeros natively.",
    },
    pattern: "Prefix & Suffix Product Accumulation",
    complexitySummary: {
      time: "O(n)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "nums = [1, 2, 3, 4]",
      steps: [
        {
          stepNumber: 1,
          state: "Forward pass: ans[0]=1",
          action: "ans[1] = 1*1 = 1; ans[2] = 1*2 = 2; ans[3] = 2*3 = 6.",
          result: "ans after forward pass: [1, 1, 2, 6]",
        },
        {
          stepNumber: 2,
          state: "Backward pass init: suffix=1",
          action: "i=3: ans[3] = 6*1 = 6, suffix = 1*4 = 4.",
          result: "ans[3]=6, suffix=4",
        },
        {
          stepNumber: 3,
          state: "i=2: ans[2]=2, suffix=4",
          action: "ans[2] = 2*4 = 8, suffix = 4*3 = 12.",
          result: "ans[2]=8, suffix=12",
        },
        {
          stepNumber: 4,
          state: "i=1: ans[1]=1, suffix=12",
          action: "ans[1] = 1*12 = 12, suffix = 12*2 = 24.",
          result: "ans[1]=12, suffix=24",
        },
        {
          stepNumber: 5,
          state: "i=0: ans[0]=1, suffix=24",
          action: "ans[0] = 1*24 = 24. Final result: [24, 12, 8, 6].",
          result: "Done!",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Using division by zero when nums contains 0",
        why: "If nums = [1, 0], total product is 0. Dividing by 0 causes runtime ArithmeticException/ZeroDivisionError.",
        fix: "Never divide. Use prefix and suffix multiplication.",
      },
    ],
    variations: [
      "Trapping Rain Water (prefix max and suffix max)",
      "Maximum Product Subarray",
    ],
    practice: [
      { title: "Trapping Rain Water", difficulty: "Hard" },
      { title: "Maximum Product Subarray", difficulty: "Medium" },
    ],
    tags: ["Array", "Prefix Sum"],
    companies: ["Amazon", "Microsoft", "Apple", "Google", "Meta"],
  },
  {
    id: "longest-consecutive-sequence",
    slug: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    topic: "Arrays",
    subtopic: "Hash Set & Intelligent Sequences",
    difficulty: "Medium",
    progressionLevel: "Level 4: Optimization",
    statement:
      "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in `O(n)` time.",
    understandTheProblem:
      "Find the length of the longest streak of numbers that increment by 1 (e.g., [1, 2, 3, 4] length 4) present in the array. The elements do NOT need to appear contiguously in nums, but your algorithm must run in linear O(n) time.",
    constraints: [
      "0 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
    ],
    examples: [
      {
        input: "nums = [100, 4, 200, 1, 3, 2]",
        output: "4",
        explanation: "The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.",
      },
      {
        input: "nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]",
        output: "9",
        explanation: "The sequence [0, 1, 2, 3, 4, 5, 6, 7, 8] has length 9.",
      },
    ],
    hints: [
      "Sorting takes O(n log n), which violates the strict O(n) time constraint.",
      "How can you check if a number x is the START of a consecutive sequence? (Check if x - 1 does NOT exist in the set!).",
    ],
    bruteForce: {
      title: "Approach 1 — Sorting O(n log n)",
      intuition:
        "Sort `nums`. Iterate through the sorted numbers and maintain a running streak if `nums[i] == nums[i-1] + 1`.",
      code: {
        java: `public int longestConsecutive(int[] nums) {
    if (nums.length == 0) return 0;
    Arrays.sort(nums);
    int longest = 1, current = 1;
    for (int i = 1; i < nums.length; i++) {
        if (nums[i] != nums[i - 1]) {
            if (nums[i] == nums[i - 1] + 1) current++;
            else { longest = Math.max(longest, current); current = 1; }
        }
    }
    return Math.max(longest, current);
}`,
        cpp: `int longestConsecutive(vector<int>& nums) {
    if (nums.empty()) return 0;
    sort(nums.begin(), nums.end());
    int longest = 1, current = 1;
    for (size_t i = 1; i < nums.size(); i++) {
        if (nums[i] != nums[i - 1]) {
            if (nums[i] == nums[i - 1] + 1) current++;
            else { longest = max(longest, current); current = 1; }
        }
    }
    return max(longest, current);
}`,
        python: `def longestConsecutive(nums: list[int]) -> int:
    if not nums: return 0
    nums.sort()
    longest = current = 1
    for i in range(1, len(nums)):
        if nums[i] != nums[i - 1]:
            if nums[i] == nums[i - 1] + 1:
                current += 1
            else:
                longest = max(longest, current)
                current = 1
    return max(longest, current)`,
        javascript: `var longestConsecutive = function(nums) {
    if (nums.length === 0) return 0;
    nums.sort((a, b) => a - b);
    let longest = 1;
    let current = 1;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) continue;
        if (nums[i] === nums[i - 1] + 1) {
            current++;
        } else {
            longest = Math.max(longest, current);
            current = 1;
        }
    }

    return Math.max(longest, current);
};`,
      },
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1) to O(n) for sorting",
      explanation: "Violates the strict O(n) runtime interview constraint.",
    },
    optimalSolution: {
      title: "Approach 2 — Hash Set & Sequence Head Detection (Optimal O(n))",
      intuition:
        "Insert all numbers into a Hash Set for O(1) membership testing. Iterate through each number `x`. Only start counting a sequence if `x - 1` is NOT in the set (meaning `x` is the true start of a streak). From `x`, count `x + 1`, `x + 2`, etc. Because each number is only visited as part of a streak once, the overall time is strictly O(n).",
      code: {
        java: `import java.util.HashSet;
import java.util.Set;

class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> numSet = new HashSet<>();
        for (int num : nums) numSet.add(num);

        int longest = 0;

        for (int num : numSet) {
            if (!numSet.contains(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;

                while (numSet.contains(currentNum + 1)) {
                    currentNum++;
                    currentStreak++;
                }

                longest = Math.max(longest, currentStreak);
            }
        }

        return longest;
    }
}`,
        cpp: `#include <vector>
#include <unordered_set>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> numSet(nums.begin(), nums.end());
        int longest = 0;

        for (int num : numSet) {
            if (!numSet.count(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;

                while (numSet.count(currentNum + 1)) {
                    currentNum++;
                    currentStreak++;
                }

                longest = max(longest, currentStreak);
            }
        }

        return longest;
    }
};`,
        python: `class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        num_set = set(nums)
        longest = 0

        for num in num_set:
            if num - 1 not in num_set:
                curr = num
                streak = 1
                while curr + 1 in num_set:
                    curr += 1
                    streak += 1
                longest = max(longest, streak)

        return longest`,
        javascript: `var longestConsecutive = function(nums) {
    const numSet = new Set(nums);
    let longest = 0;

    for (const num of numSet) {
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }

            longest = Math.max(longest, currentStreak);
        }
    }

    return longest;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      whyOptimal:
        "Checking if num - 1 exists filters out middle and end elements of sequences. Each number is part of at most one forward while loop, bounding total set queries to 2n = O(n).",
    },
    pattern: "Hash Set / Sequence Head Detection",
    complexitySummary: {
      time: "O(n)",
      space: "O(n)",
    },
    dryRun: {
      sampleInput: "nums = [100, 4, 200, 1, 3, 2]",
      steps: [
        {
          stepNumber: 1,
          state: "numSet = {100, 4, 200, 1, 3, 2}",
          action: "num = 100: is 99 in set? No. Check 101: No. Streak = 1.",
          result: "longest = 1",
        },
        {
          stepNumber: 2,
          state: "num = 4: is 3 in set? Yes!",
          action: "Skip 4 because it is not a sequence head.",
          result: "longest = 1",
        },
        {
          stepNumber: 3,
          state: "num = 200: is 199 in set? No. Streak = 1.",
          action: "Check 201: No.",
          result: "longest = 1",
        },
        {
          stepNumber: 4,
          state: "num = 1: is 0 in set? No. 1 is a sequence head!",
          action: "Check 2 (yes), 3 (yes), 4 (yes), 5 (no). Streak = 4.",
          result: "longest = 4. Done!",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Checking forward without verifying `!numSet.contains(num - 1)`",
        why: "If you expand on every number without checking if it's the sequence head, on [1, 2, 3, 4] you do 4 + 3 + 2 + 1 queries, degrading performance to O(n^2).",
        fix: "Only initiate the while loop when `num - 1` is absent.",
      },
    ],
    variations: [
      "Binary Tree Longest Consecutive Sequence",
      "Find Largest Subarray with Consecutive Integers",
    ],
    practice: [
      { title: "Binary Tree Longest Consecutive Sequence", difficulty: "Medium" },
      { title: "Longest Increasing Subsequence", difficulty: "Medium" },
    ],
    tags: ["Array", "Hash Table", "Union Find"],
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Spotify"],
  },
];
