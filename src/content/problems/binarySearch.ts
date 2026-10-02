import { Problem } from "@/types/content";

export const binarySearchProblems: Problem[] = [
  {
    id: "binary-search",
    slug: "binary-search",
    title: "Binary Search",
    topic: "Binary Search",
    topicSlug: "binary-search",
    subtopic: "Search Space Halving",
    difficulty: "Easy",
    progressionLevel: "Level 1: Concept Understanding",
    statement:
      "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`. You must write an algorithm with `O(log n)` runtime complexity.",
    understandTheProblem:
      "Because the array is already sorted, we do not need to scan elements one by one. By checking the midpoint, we can instantly eliminate half of the remaining elements at every step.",
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order.",
    ],
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4.",
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1.",
      },
    ],
    hints: [
      "Set two bounds: `low = 0` and `high = nums.length - 1`.",
      "Compute `mid = low + (high - low) / 2` to prevent 32-bit integer overflow.",
      "If `nums[mid] == target`, return `mid`. If `nums[mid] < target`, discard the left half (`low = mid + 1`). Otherwise discard right (`high = mid - 1`).",
    ],
    bruteForce: {
      title: "Approach 1 — Linear Search",
      intuition:
        "Scan the array from index 0 to n - 1. Return the index if found, else -1.",
      code: {
        java: `class Solution {
    public int search(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
}`,
        cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
};`,
        python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        for i, val in enumerate(nums):
            if val == target:
                return i
        return -1`,
        javascript: `var search = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) return i;
    }
    return -1;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      explanation:
        "Does not exploit the sorted nature of the array, requiring O(n) checks in the worst case.",
    },
    optimalSolution: {
      title: "Approach 2 — Iterative Binary Search",
      intuition:
        "Maintain interval `[low, high]`. In each step, examine the midpoint `mid`. Since the array is sorted, if `target` is greater than `nums[mid]`, it cannot possibly exist in `[low, mid]`, so advance `low = mid + 1`. Conversely, if `target < nums[mid]`, set `high = mid - 1`. The search space halves on every iteration.",
      code: {
        java: `class Solution {
    public int search(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }
}`,
        cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0;
        int high = nums.size() - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }
};`,
        python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        low = 0
        high = len(nums) - 1

        while low <= high:
            mid = low + (high - low) // 2

            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1

        return -1`,
        javascript: `var search = function(nums, target) {
    let low = 0;
    let high = nums.length - 1;

    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
};`,
      },
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      whyOptimal:
        "Each iteration halves the problem size: n -> n/2 -> n/4 -> ... -> 1. Total iterations = log2(n). This is the information-theoretic lower bound for comparison search.",
    },
    pattern: "Binary Search / Search Space Reduction",
    complexitySummary: {
      time: "O(log n)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "nums = [-1, 0, 3, 5, 9, 12], target = 9",
      steps: [
        {
          stepNumber: 1,
          state: "low=0, high=5",
          action: "mid = 0 + (5-0)/2 = 2. nums[2]=3. 3 < 9 -> low = 3.",
          result: "Search space is now [3, 5].",
        },
        {
          stepNumber: 2,
          state: "low=3, high=5",
          action: "mid = 3 + (5-3)/2 = 4. nums[4]=9. 9 == 9 -> target found!",
          result: "Return index 4.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Integer overflow bug using (low + high) / 2",
        fix: "In languages like Java and C++, use `low + (high - low) / 2` to avoid 32-bit signed overflow when `low + high > Integer.MAX_VALUE`.",
      },
      {
        mistake: "Infinite loop with while (low < high) vs while (low <= high)",
        fix: "When looking for a single exact element, use `low <= high` and update bounds by `mid + 1` and `mid - 1`.",
      },
    ],
    variations: [
      "Search Insert Position",
      "Find First and Last Position of Element in Sorted Array",
      "Search in Rotated Sorted Array",
    ],
    practice: [
      { title: "Search Insert Position", difficulty: "Easy" },
      { title: "Search in Rotated Sorted Array", difficulty: "Medium" },
    ],
    tags: ["Array", "Binary Search"],
    companies: ["Microsoft", "TCS", "Infosys", "Wipro", "Amazon"],
  },
  {
    id: "search-in-rotated-sorted-array",
    slug: "search-in-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    topic: "Binary Search",
    topicSlug: "binary-search",
    subtopic: "Modified Binary Search / Pivot Determination",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "There is an integer array `nums` sorted in ascending order (with distinct values). Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k` (`1 <= k < nums.length`). Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`. You must write an algorithm with `O(log n)` runtime complexity.",
    understandTheProblem:
      "An array like `[0,1,2,4,5,6,7]` is rotated into `[4,5,6,7,0,1,2]`. Although not fully sorted, if you split it anywhere, at least one of the two halves is GUARANTEED to be normally sorted.",
    constraints: [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "All values of nums are unique.",
      "nums is an ascending array that is possibly rotated.",
      "-10^4 <= target <= 10^4",
    ],
    examples: [
      {
        input: "nums = [4,5,6,7,0,1,2], target = 0",
        output: "4",
        explanation: "0 is at index 4.",
      },
      {
        input: "nums = [4,5,6,7,0,1,2], target = 3",
        output: "-1",
        explanation: "3 does not exist in nums.",
      },
      {
        input: "nums = [1], target = 0",
        output: "-1",
        explanation: "Target 0 is not in nums.",
      },
    ],
    hints: [
      "Notice that for any mid, either the left half nums[low...mid] is sorted OR the right half nums[mid...high] is sorted.",
      "Check if nums[low] <= nums[mid]. If true, left half is sorted. Check if target lies within [nums[low], nums[mid]].",
      "If false, the right half is sorted. Check if target lies within [nums[mid], nums[high]].",
      "Adjust low and high accordingly.",
    ],
    bruteForce: {
      title: "Approach 1 — Linear Scan",
      intuition:
        "Check every element one by one from left to right.",
      code: {
        java: `class Solution {
    public int search(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
}`,
        cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
};`,
        python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        for i, val in enumerate(nums):
            if val == target:
                return i
        return -1`,
        javascript: `var search = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) return i;
    }
    return -1;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      explanation:
        "O(n) does not meet the strict interview requirement of O(log n).",
    },
    optimalSolution: {
      title: "Approach 2 — Modified Binary Search with Sorted Half Identification",
      intuition:
        "Compute `mid`. If `nums[mid] == target`, return `mid`. Next determine which half is sorted:\n1. If `nums[low] <= nums[mid]`, the left half is monotonically increasing. If `nums[low] <= target < nums[mid]`, target must be in the left; search left (`high = mid - 1`). Otherwise, search right (`low = mid + 1`).\n2. Otherwise, the right half is monotonically increasing. If `nums[mid] < target <= nums[high]`, search right (`low = mid + 1`). Otherwise search left (`high = mid - 1`).",
      code: {
        java: `class Solution {
    public int search(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid;
            }

            // Check if left half is sorted
            if (nums[low] <= nums[mid]) {
                if (target >= nums[low] && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else { // Right half is sorted
                if (target > nums[mid] && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }

        return -1;
    }
}`,
        cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0;
        int high = nums.size() - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid;
            }

            // Left half is sorted
            if (nums[low] <= nums[mid]) {
                if (target >= nums[low] && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else { // Right half is sorted
                if (target > nums[mid] && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }

        return -1;
    }
};`,
        python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        low = 0
        high = len(nums) - 1

        while low <= high:
            mid = low + (high - low) // 2

            if nums[mid] == target:
                return mid

            # Left half is sorted
            if nums[low] <= nums[mid]:
                if nums[low] <= target < nums[mid]:
                    high = mid - 1
                else:
                    low = mid + 1
            else: # Right half is sorted
                if nums[mid] < target <= nums[high]:
                    low = mid + 1
                else:
                    high = mid - 1

        return -1`,
        javascript: `var search = function(nums, target) {
    let low = 0;
    let high = nums.length - 1;

    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        // Check if left half is sorted
        if (nums[low] <= nums[mid]) {
            if (target >= nums[low] && target < nums[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } else { // Right half is sorted
            if (target > nums[mid] && target <= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }

    return -1;
};`,
      },
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      whyOptimal:
        "Every iteration discards half of the candidate elements, preserving logarithmic efficiency without unwinding the array rotation.",
    },
    pattern: "Modified Binary Search (Sorted Half Criterion)",
    complexitySummary: {
      time: "O(log n)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "nums = [4, 5, 6, 7, 0, 1, 2], target = 0",
      steps: [
        {
          stepNumber: 1,
          state: "low=0 (4), high=6 (2)",
          action: "mid=3 (7). Left half [4, 7] sorted because 4 <= 7. Does target 0 lie in [4, 7)? No. -> low = mid + 1 = 4.",
          result: "Search space is [4, 6].",
        },
        {
          stepNumber: 2,
          state: "low=4 (0), high=6 (2)",
          action: "mid=5 (1). nums[mid]=1 != 0. Left half [0, 1] sorted (0 <= 1). Does target 0 lie in [0, 1)? Yes! (0 >= 0 and 0 < 1). -> high = mid - 1 = 4.",
          result: "Search space is [4, 4].",
        },
        {
          stepNumber: 3,
          state: "low=4, high=4",
          action: "mid=4. nums[4]=0 == target -> return 4!",
          result: "Found at index 4.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Checking nums[low] < nums[mid] instead of nums[low] <= nums[mid]",
        fix: "When low == mid (such as when 2 elements remain), nums[low] == nums[mid]. Use `<=`, otherwise the logic falls into the wrong branch.",
      },
      {
        mistake: "Strict inequality bounds when checking target interval",
        fix: "Target could equal the endpoint: use `target >= nums[low] && target < nums[mid]`.",
      },
    ],
    variations: [
      "Search in Rotated Sorted Array II (duplicates allowed — worst case O(n))",
      "Find Minimum in Rotated Sorted Array",
    ],
    practice: [
      { title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium" },
      { title: "Search in Rotated Sorted Array II", difficulty: "Medium" },
    ],
    tags: ["Array", "Binary Search"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Apple"],
  },
  {
    id: "find-minimum-in-rotated-sorted-array",
    slug: "find-minimum-in-rotated-sorted-array",
    title: "Find Minimum in Rotated Sorted Array",
    topic: "Binary Search",
    topicSlug: "binary-search",
    subtopic: "Boundary Condition Binary Search",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. Given the sorted rotated array `nums` of unique elements, return the minimum element of this array. You must write an algorithm that runs in `O(log n)` time.",
    understandTheProblem:
      "A sorted array was shifted cyclicly. The minimum element is the inflection point (pivot) where numbers drop from high to low. We need to locate this minimum in logarithmic time.",
    constraints: [
      "n == nums.length",
      "1 <= n <= 5000",
      "-5000 <= nums[i] <= 5000",
      "All the integers of nums are unique.",
      "nums is sorted and rotated between 1 and n times.",
    ],
    examples: [
      {
        input: "nums = [3,4,5,1,2]",
        output: "1",
        explanation: "The original array was [1,2,3,4,5] rotated 3 times.",
      },
      {
        input: "nums = [4,5,6,7,0,1,2]",
        output: "0",
        explanation: "The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.",
      },
      {
        input: "nums = [11,13,15,17]",
        output: "11",
        explanation: "The original array was rotated 4 times (identical to 0 rotations).",
      },
    ],
    hints: [
      "Compare `nums[mid]` with `nums[high]`.",
      "If `nums[mid] > nums[high]`, the inflection point (and thus minimum) MUST be strictly to the right of `mid` (`low = mid + 1`).",
      "If `nums[mid] <= nums[high]`, `nums[mid]` could be the minimum, or the minimum is to its left (`high = mid`).",
    ],
    bruteForce: {
      title: "Approach 1 — Linear Scan",
      intuition:
        "Traverse the array from index 0 to n - 1 and track the minimum element found.",
      code: {
        java: `class Solution {
    public int findMin(int[] nums) {
        int minVal = nums[0];
        for (int x : nums) {
            minVal = Math.min(minVal, x);
        }
        return minVal;
    }
}`,
        cpp: `class Solution {
public:
    int findMin(vector<int>& nums) {
        int minVal = nums[0];
        for (int x : nums) {
            minVal = min(minVal, x);
        }
        return minVal;
    }
};`,
        python: `class Solution:
    def findMin(self, nums: list[int]) -> int:
        return min(nums)`,
        javascript: `var findMin = function(nums) {
    let minVal = nums[0];
    for (let i = 1; i < nums.length; i++) {
        minVal = Math.min(minVal, nums[i]);
    }
    return minVal;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      explanation:
        "Inspects every element linearly. Fails the O(log n) requirement.",
    },
    optimalSolution: {
      title: "Approach 2 — Binary Search comparing with nums[high]",
      intuition:
        "We maintain `low` and `high`. If `nums[mid] > nums[high]`, then the right half contains the transition point where values wrap around, meaning the minimum is definitely in `[mid + 1, high]`. Thus `low = mid + 1`. Otherwise, the right side is sorted, so the minimum is at `mid` or somewhere to its left: `high = mid`. When `low == high`, we have converged on the minimum.",
      code: {
        java: `class Solution {
    public int findMin(int[] nums) {
        int low = 0;
        int high = nums.length - 1;

        while (low < high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] > nums[high]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return nums[low];
    }
}`,
        cpp: `class Solution {
public:
    int findMin(vector<int>& nums) {
        int low = 0;
        int high = nums.size() - 1;

        while (low < high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] > nums[high]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return nums[low];
    }
};`,
        python: `class Solution:
    def findMin(self, nums: list[int]) -> int:
        low = 0
        high = len(nums) - 1

        while low < high:
            mid = low + (high - low) // 2

            if nums[mid] > nums[high]:
                low = mid + 1
            else:
                high = mid

        return nums[low]`,
        javascript: `var findMin = function(nums) {
    let low = 0;
    let high = nums.length - 1;

    while (low < high) {
        const mid = Math.floor(low + (high - low) / 2);

        if (nums[mid] > nums[high]) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return nums[low];
};`,
      },
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      whyOptimal:
        "Search interval strictly shrinks by half in each iteration until low == high. Strictly logarithmic without auxiliary memory.",
    },
    pattern: "Binary Search / Inflection Point Detection",
    complexitySummary: {
      time: "O(log n)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "nums = [4, 5, 6, 7, 0, 1, 2]",
      steps: [
        {
          stepNumber: 1,
          state: "low=0 (4), high=6 (2)",
          action: "mid=3 (7). nums[3]=7 > nums[6]=2. Minimum is strictly to the right: low = 3 + 1 = 4.",
          result: "low=4, high=6",
        },
        {
          stepNumber: 2,
          state: "low=4 (0), high=6 (2)",
          action: "mid=5 (1). nums[5]=1 <= nums[6]=2. Minimum could be at mid or left: high = mid = 5.",
          result: "low=4, high=5",
        },
        {
          stepNumber: 3,
          state: "low=4 (0), high=5 (1)",
          action: "mid=4 (0). nums[4]=0 <= nums[5]=1. high = mid = 4.",
          result: "low=4, high=4. Loop ends!",
        },
        {
          stepNumber: 4,
          state: "low == high == 4",
          action: "Return nums[4] = 0.",
          result: "0",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Setting high = mid - 1 when nums[mid] <= nums[high]",
        fix: "`nums[mid]` itself might be the smallest element! If you set `high = mid - 1`, you will exclude the minimum. Always use `high = mid`.",
      },
      {
        mistake: "Comparing mid with nums[low] instead of nums[high]",
        fix: "Comparing with nums[low] requires special logic for unrotated arrays, whereas comparing with `nums[high]` uniformly handles both rotated and non-rotated cases.",
      },
    ],
    variations: [
      "Find Minimum in Rotated Sorted Array II (with duplicates)",
      "Find Peak Element",
    ],
    practice: [
      { title: "Find Minimum in Rotated Sorted Array II", difficulty: "Hard" },
      { title: "Find Peak Element", difficulty: "Medium" },
    ],
    tags: ["Array", "Binary Search"],
    companies: ["Microsoft", "Amazon", "Goldman Sachs", "Bloomberg"],
  },
  {
    id: "koko-eating-bananas",
    slug: "koko-eating-bananas",
    title: "Koko Eating Bananas",
    topic: "Binary Search",
    topicSlug: "binary-search",
    subtopic: "Search on Answer Space",
    difficulty: "Medium",
    progressionLevel: "Level 4: Optimization",
    statement:
      "Koko loves to eat bananas. There are `n` piles of bananas, the `i`th pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours. Koko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile of bananas and eats `k` bananas from that pile. If the pile has less than `k` bananas, she eats all of them instead and will not eat any more bananas during this hour. Return the minimum integer `k` such that she can eat all the bananas within `h` hours.",
    understandTheProblem:
      "Find the slowest speed k (bananas/hour) such that Koko can eat every pile within h hours. Since she spends at least 1 hour per pile (even if pile < k), h must be >= number of piles.",
    constraints: [
      "1 <= piles.length <= 10^4",
      "piles.length <= h <= 10^9",
      "1 <= piles[i] <= 10^9",
    ],
    examples: [
      {
        input: "piles = [3, 6, 7, 11], h = 8",
        output: "4",
        explanation: "At speed 4: ceil(3/4)=1, ceil(6/4)=2, ceil(7/4)=2, ceil(11/4)=3. Total hours = 1+2+2+3 = 8 <= 8. Optimal!",
      },
      {
        input: "piles = [30, 11, 23, 4, 20], h = 5",
        output: "30",
        explanation: "Since h == piles.length, she must eat each pile in 1 hour, so speed = max(piles) = 30.",
      },
    ],
    hints: [
      "What is the smallest conceivable eating speed? 1.",
      "What is the largest conceivable eating speed? The largest pile in the array (max(piles)).",
      "If speed X is feasible, any speed > X is also feasible! The decision function is monotonic: [F, F, ..., T, T]. Use Binary Search on the speed range [1, max(piles)]!",
    ],
    bruteForce: {
      title: "Approach 1 — Linear Speed Scan",
      intuition:
        "Test speeds 1, 2, 3... up to max(piles). The first speed that allows Koko to finish within h hours is the answer.",
      code: {
        java: `public int minEatingSpeed(int[] piles, int h) {
    int max = 0;
    for (int p : piles) max = Math.max(max, p);

    for (int speed = 1; speed <= max; speed++) {
        long totalHours = 0;
        for (int p : piles) {
            totalHours += (p + speed - 1) / speed; // ceil division
        }
        if (totalHours <= h) return speed;
    }
    return max;
}`,
        cpp: `int minEatingSpeed(vector<int>& piles, int h) {
    int maxVal = *max_element(piles.begin(), piles.end());
    for (int speed = 1; speed <= maxVal; speed++) {
        long long hours = 0;
        for (int p : piles) hours += (p + speed - 1) / speed;
        if (hours <= h) return speed;
    }
    return maxVal;
}`,
        python: `def minEatingSpeed(piles: list[int], h: int) -> int:
    max_val = max(piles)
    for speed in range(1, max_val + 1):
        hours = sum((p + speed - 1) // speed for p in piles)
        if hours <= h:
            return speed
    return max_val`,
        javascript: `var minEatingSpeed = function(piles, h) {
    let max = Math.max(...piles);
    for (let speed = 1; speed <= max; speed++) {
        let hours = 0;
        for (const p of piles) hours += Math.ceil(p / speed);
        if (hours <= h) return speed;
    }
    return max;
};`,
      },
      timeComplexity: "O(N * max(piles))",
      spaceComplexity: "O(1)",
      explanation:
        "When max(piles) = 10^9 and N = 10^4, naive linear testing requires 10^13 operations, which severely times out.",
    },
    optimalSolution: {
      title: "Approach 2 — Binary Search on Answer Space",
      intuition:
        "Binary search the speed range `[low = 1, high = max(piles)]`. For midpoint speed `mid`, calculate total hours. If `hours <= h`, speed `mid` works; record it and search for a slower speed by setting `high = mid - 1`. If `hours > h`, speed is too slow; set `low = mid + 1`.",
      code: {
        java: `public class KokoEating {
    public int minEatingSpeed(int[] piles, int h) {
        int low = 1, high = 0;
        for (int p : piles) high = Math.max(high, p);

        int bestSpeed = high;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (canFinish(piles, h, mid)) {
                bestSpeed = mid;
                high = mid - 1; // Try to find a slower speed
            } else {
                low = mid + 1;  // Speed is too slow, increase it
            }
        }
        return bestSpeed;
    }

    private boolean canFinish(int[] piles, int h, int speed) {
        long totalHours = 0;
        for (int p : piles) {
            // Integer ceiling arithmetic without floating point precision issues:
            totalHours += (p + speed - 1) / speed;
            if (totalHours > h) return false; // Early exit
        }
        return totalHours <= h;
    }
}`,
        cpp: `int minEatingSpeed(vector<int>& piles, int h) {
    int low = 1, high = *max_element(piles.begin(), piles.end());
    int bestSpeed = high;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        long long hours = 0;
        for (int p : piles) {
            hours += (p + mid - 1) / mid;
        }
        if (hours <= h) {
            bestSpeed = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return bestSpeed;
}`,
        python: `def minEatingSpeed(piles: list[int], h: int) -> int:
    low, high = 1, max(piles)
    best_speed = high

    while low <= high:
        mid = (low + high) // 2
        hours = sum((p + mid - 1) // mid for p in piles)
        if hours <= h:
            best_speed = mid
            high = mid - 1
        else:
            low = mid + 1

    return best_speed`,
        javascript: `var minEatingSpeed = function(piles, h) {
    let low = 1, high = Math.max(...piles);
    let bestSpeed = high;

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);
        let hours = 0;
        for (const p of piles) {
            hours += Math.ceil(p / mid);
        }
        if (hours <= h) {
            bestSpeed = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return bestSpeed;
};`,
      },
      timeComplexity: "O(N * log(max(piles)))",
      spaceComplexity: "O(1) auxiliary memory",
      whyOptimal:
        "log2(10^9) is only 30 iterations. 30 * 10^4 = 3 * 10^5 operations, executing in under 5 milliseconds.",
    },
    pattern: "Binary Search on Answer",
    complexitySummary: {
      time: "O(N * log(max(P)))",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "piles = [3, 6, 7, 11], h = 8",
      steps: [
        { stepNumber: 1, state: "low = 1, high = 11", action: "mid = 6. hours = 1+1+2+2 = 6 <= 8 (Valid!)", result: "best = 6, high = 5" },
        { stepNumber: 2, state: "low = 1, high = 5", action: "mid = 3. hours = 1+2+3+4 = 10 > 8 (Too slow!)", result: "low = 4" },
        { stepNumber: 3, state: "low = 4, high = 5", action: "mid = 4. hours = 1+2+2+3 = 8 <= 8 (Valid!)", result: "best = 4, high = 3" },
        { stepNumber: 4, state: "low = 4, high = 3", action: "low > high. Terminate.", result: "returns bestSpeed = 4" },
      ],
    },
    commonMistakes: [
      {
        mistake: "Using integer division without ceiling: p / speed",
        why: "If pile is 7 and speed is 4, 7 / 4 = 1 in integer division, but Koko actually requires 2 hours.",
        fix: "Use `(p + speed - 1) / speed` or `(long) Math.ceil((double) p / speed)`.",
      },
      {
        mistake: "32-bit integer overflow when accumulating totalHours",
        why: "Summing 10^4 piles with speed 1 can exceed 2^31 - 1 when piles[i] are large.",
        fix: "Use 64-bit `long` for `totalHours`.",
      },
    ],
    variations: [
      "Capacity to Ship Packages Within D Days",
      "Split Array Largest Sum",
      "Minimum Time to Repair Cars",
    ],
    practice: [
      { title: "Capacity to Ship Packages Within D Days", difficulty: "Medium" },
      { title: "Split Array Largest Sum", difficulty: "Hard" },
    ],
    tags: ["Array", "Binary Search", "Search on Answer"],
    companies: ["Google", "Amazon", "Meta", "Bloomberg", "Uber"],
  },
  {
    id: "search-a-2d-matrix",
    slug: "search-a-2d-matrix",
    title: "Search a 2D Matrix",
    topic: "Binary Search",
    topicSlug: "binary-search",
    subtopic: "Virtual 1D Flattening",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "You are given an `m x n` integer matrix `matrix` with the following two properties: Each row is sorted in non-decreasing order; the first integer of each row is greater than the last integer of the previous row. Given an integer `target`, return `true` if `target` is in `matrix` or `false` otherwise. You must write a solution in `O(log(m * n))` time complexity.",
    understandTheProblem:
      "The matrix rows are glued together into a continuous sorted list. Find if target exists in O(log(m * n)) time.",
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 100",
      "-10^4 <= matrix[i][j], target <= 10^4",
    ],
    examples: [
      {
        input: "matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target = 3",
        output: "true",
        explanation: "3 is found at row 0, column 1.",
      },
      {
        input: "matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target = 13",
        output: "false",
        explanation: "13 is not present in the matrix.",
      },
    ],
    hints: [
      "Because the last element of row i < first element of row i+1, the entire matrix can be treated as a single 1D sorted array of size M * N!",
      "How do you convert a 1D index `idx` to 2D coordinates `(row, col)`? `row = idx / n`, `col = idx % n`.",
    ],
    bruteForce: {
      title: "Approach 1 — Linear 2D Scan",
      intuition:
        "Inspect every cell in the matrix one by one with nested loops.",
      code: {
        java: `public boolean searchMatrix(int[][] matrix, int target) {
    for (int[] row : matrix) {
        for (int val : row) {
            if (val == target) return true;
        }
    }
    return false;
}`,
        cpp: `bool searchMatrix(vector<vector<int>>& matrix, int target) {
    for (const auto& row : matrix) {
        for (int val : row) {
            if (val == target) return true;
        }
    }
    return false;
}`,
        python: `def searchMatrix(matrix: list[list[int]], target: int) -> bool:
    return any(target in row for row in matrix)`,
        javascript: `var searchMatrix = function(matrix, target) {
    for (const row of matrix) {
        for (const val of row) {
            if (val === target) return true;
        }
    }
    return false;
};`,
      },
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(1)",
      explanation:
        "Scans all M * N cells, failing to exploit the sorted matrix properties.",
    },
    optimalSolution: {
      title: "Approach 2 — Virtual 1D Binary Search in O(log(m * n))",
      intuition:
        "Treat the matrix as a virtual 1D array of length `m * n` from index `0` to `m * n - 1`. Map `mid` to 2D coordinates: `row = mid / n`, `col = mid % n`. Perform canonical binary search.",
      code: {
        java: `public class Search2DMatrix {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return false;

        int m = matrix.length, n = matrix[0].length;
        int low = 0, high = m * n - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int midVal = matrix[mid / n][mid % n]; // 1D to 2D mapping!

            if (midVal == target) {
                return true;
            } else if (midVal < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return false;
    }
}`,
        cpp: `bool searchMatrix(vector<vector<int>>& matrix, int target) {
    int m = matrix.size(), n = matrix[0].size();
    int low = 0, high = m * n - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        int midVal = matrix[mid / n][mid % n];
        if (midVal == target) return true;
        else if (midVal < target) low = mid + 1;
        else high = mid - 1;
    }
    return false;
}`,
        python: `def searchMatrix(matrix: list[list[int]], target: int) -> bool:
    m, n = len(matrix), len(matrix[0])
    low, high = 0, m * n - 1

    while low <= high:
        mid = (low + high) // 2
        mid_val = matrix[mid // n][mid % n]
        if mid_val == target:
            return True
        elif mid_val < target:
            low = mid + 1
        else:
            high = mid - 1
    return False`,
        javascript: `var searchMatrix = function(matrix, target) {
    const m = matrix.length, n = matrix[0].length;
    let low = 0, high = m * n - 1;

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);
        const midVal = matrix[Math.floor(mid / n)][mid % n];
        if (midVal === target) return true;
        else if (midVal < target) low = mid + 1;
        else high = mid - 1;
    }
    return false;
};`,
      },
      timeComplexity: "O(log(m * n))",
      spaceComplexity: "O(1) auxiliary memory",
      whyOptimal:
        "Directly satisfies the problem requirement by executing standard binary search over the virtual flattened array.",
    },
    pattern: "Binary Search / 2D Matrix Mapping",
    complexitySummary: {
      time: "O(log(M * N))",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "matrix 3x4, target = 3",
      steps: [
        { stepNumber: 1, state: "low = 0, high = 11", action: "mid = 5 -> matrix[5/4][5%4] = matrix[1][1] = 11 > 3", result: "high = 4" },
        { stepNumber: 2, state: "low = 0, high = 4", action: "mid = 2 -> matrix[2/4][2%4] = matrix[0][2] = 5 > 3", result: "high = 1" },
        { stepNumber: 3, state: "low = 0, high = 1", action: "mid = 0 -> matrix[0][0] = 1 < 3", result: "low = 1" },
        { stepNumber: 4, state: "low = 1, high = 1", action: "mid = 1 -> matrix[0][1] = 3 == target", result: "returns true" },
      ],
    },
    commonMistakes: [
      {
        mistake: "Dividing by m instead of n in matrix[mid / n][mid % n]",
        why: "Rows have length n (number of columns), so dividing by n determines the row index.",
        fix: "Always divide and modulo by `n` (number of columns): `row = mid / n, col = mid % n`.",
      },
    ],
    variations: [
      "Search a 2D Matrix II (Rows and columns sorted independently - use Saddleback search in O(M + N))",
    ],
    practice: [
      { title: "Search a 2D Matrix II", difficulty: "Medium" },
    ],
    tags: ["Array", "Binary Search", "Matrix"],
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Bloomberg"],
  },
];
