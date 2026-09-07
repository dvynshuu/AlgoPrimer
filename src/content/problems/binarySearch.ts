import { Problem } from "@/types/content";

export const binarySearchProblems: Problem[] = [
  {
    id: "binary-search",
    slug: "binary-search",
    title: "Binary Search",
    topic: "Binary Search",
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
];
