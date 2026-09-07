import { Problem } from "@/types/content";

export const twoPointersSlidingWindowProblems: Problem[] = [
  {
    id: "container-with-most-water",
    slug: "container-with-most-water",
    title: "Container With Most Water",
    topic: "Two Pointers",
    subtopic: "Two Pointers Inward Scan",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i-th` line are `(i, 0)` and `(i, height[i])`. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store. Notice that you may not slant the container.",
    understandTheProblem:
      "Choose any two indices `i` and `j` (where `i < j`). The width of the container is `j - i`, and the height of the water level is limited by the shorter line, `min(height[i], height[j])`. The volume stored is `(j - i) * min(height[i], height[j])`. Maximize this volume across all pairs.",
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4",
    ],
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation:
          "The vertical lines are at indices 0 through 8. The max area is formed between index 1 (height 8) and index 8 (height 7): area = (8 - 1) * min(8, 7) = 7 * 7 = 49.",
      },
      {
        input: "height = [1,1]",
        output: "1",
        explanation: "Distance is 1, min height is 1, total area = 1 * 1 = 1.",
      },
    ],
    hints: [
      "Start with the widest possible container: left pointer at 0, right pointer at n - 1.",
      "If you move the pointer pointing to the taller wall inward, can the area ever increase? No, because width decreases and height is still bottlenecked by the shorter wall.",
      "Therefore, the only way to potentially find a larger area is to move the shorter wall inward!",
    ],
    bruteForce: {
      title: "Approach 1 — Check All Pairs (Nested Loops)",
      intuition:
        "Evaluate every possible pair of lines (i, j) with i < j, compute the water capacity, and keep track of the maximum.",
      code: {
        java: `class Solution {
    public int maxArea(int[] height) {
        int maxWater = 0;
        int n = height.length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int h = Math.min(height[i], height[j]);
                int w = j - i;
                maxWater = Math.max(maxWater, h * w);
            }
        }
        return maxWater;
    }
}`,
        cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        int maxWater = 0;
        int n = height.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int h = min(height[i], height[j]);
                int w = j - i;
                maxWater = max(maxWater, h * w);
            }
        }
        return maxWater;
    }
};`,
        python: `class Solution:
    def maxArea(self, height: list[int]) -> int:
        max_water = 0
        n = len(height)
        for i in range(n):
            for j in range(i + 1, n):
                h = min(height[i], height[j])
                w = j - i
                max_water = max(max_water, h * w)
        return max_water`,
        javascript: `var maxArea = function(height) {
    let maxWater = 0;
    const n = height.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const h = Math.min(height[i], height[j]);
            const w = j - i;
            maxWater = Math.max(maxWater, h * w);
        }
    }
    return maxWater;
};`,
      },
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
      explanation:
        "Examines all n*(n-1)/2 pairs. For n = 10^5, (10^5)^2 / 2 = 5 * 10^9 operations, which will result in a Time Limit Exceeded (TLE).",
    },
    optimalSolution: {
      title: "Approach 2 — Two Pointers Inward Greedy Shrink",
      intuition:
        "Place pointers at both boundaries (left = 0, right = n - 1). This maximizes width. The capacity is bounded by the shorter line. Moving the taller line inward only decreases width without any possibility of increasing height. Thus, we greedily advance the pointer at the shorter line to seek a taller barrier.",
      code: {
        java: `class Solution {
    public int maxArea(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int maxWater = 0;

        while (left < right) {
            int width = right - left;
            int h = Math.min(height[left], height[right]);
            maxWater = Math.max(maxWater, width * h);

            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxWater;
    }
}`,
        cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0;
        int right = height.size() - 1;
        int maxWater = 0;

        while (left < right) {
            int width = right - left;
            int h = min(height[left], height[right]);
            maxWater = max(maxWater, width * h);

            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxWater;
    }
};`,
        python: `class Solution:
    def maxArea(self, height: list[int]) -> int:
        left, right = 0, len(height) - 1
        max_water = 0

        while left < right:
            width = right - left
            h = min(height[left], height[right])
            max_water = max(max_water, width * h)

            if height[left] < height[right]:
                left += 1
            else:
                right -= 1

        return max_water`,
        javascript: `var maxArea = function(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        const width = right - left;
        const h = Math.min(height[left], height[right]);
        maxWater = Math.max(maxWater, width * h);

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      whyOptimal:
        "In every step of the loop, the distance between left and right decreases by 1. We inspect each element at most once in O(n) total time with zero additional allocated memory.",
    },
    pattern: "Two Pointers (Opposite Ends)",
    complexitySummary: {
      time: "O(n)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
      steps: [
        {
          stepNumber: 1,
          state: "left=0 (h=1), right=8 (h=7), maxWater=0",
          action: "width = 8-0=8, h=min(1,7)=1. area=8*1=8. height[0] < height[8] -> left++",
          result: "maxWater=8, left=1, right=8",
        },
        {
          stepNumber: 2,
          state: "left=1 (h=8), right=8 (h=7), maxWater=8",
          action: "width = 8-1=7, h=min(8,7)=7. area=7*7=49. height[8] <= height[1] -> right--",
          result: "maxWater=49, left=1, right=7",
        },
        {
          stepNumber: 3,
          state: "left=1 (h=8), right=7 (h=3), maxWater=49",
          action: "width = 7-1=6, h=min(8,3)=3. area=6*3=18. maxWater stays 49. height[7] < height[1] -> right--",
          result: "maxWater=49, left=1, right=6",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Moving the taller pointer instead of the shorter pointer",
        fix: "Always move the pointer corresponding to the shorter height, because only finding a taller boundary can offset the reduced width.",
      },
      {
        mistake: "Slanting the water container (using different heights for endpoints)",
        fix: "Water spills out at the lower height, so the height of water is strictly min(height[left], height[right]).",
      },
    ],
    variations: [
      "Trapping Rain Water (calculating trapped water between elevations)",
      "Largest Rectangle in Histogram (monotonic stack variation)",
    ],
    practice: [
      { title: "Trapping Rain Water", difficulty: "Hard" },
      { title: "Two Sum II - Input Array Is Sorted", difficulty: "Medium" },
    ],
    tags: ["Two Pointers", "Array", "Greedy"],
    companies: ["Amazon", "Google", "Meta", "Microsoft", "Adobe"],
  },
  {
    id: "trapping-rain-water",
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    topic: "Two Pointers",
    subtopic: "Prefix Maxima & Two Pointers",
    difficulty: "Hard",
    progressionLevel: "Level 4: Optimization",
    statement:
      "Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.",
    understandTheProblem:
      "At any index `i`, water can sit on top of bar `i` if there is a taller bar to its left AND a taller bar to its right. The water level at bar `i` is determined by `min(max_left_height, max_right_height) - height[i]`. If this difference is positive, that exact amount of water is trapped over bar `i`.",
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5",
    ],
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation:
          "The elevation map traps water at index 2 (1 unit), index 4 (1 unit), index 5 (2 units), index 6 (1 unit), index 9 (1 unit). Total = 6 units.",
      },
      {
        input: "height = [4,2,0,3,2,5]",
        output: "9",
        explanation:
          "Trapped water: index 1 (2 units), index 2 (4 units), index 3 (1 unit), index 4 (2 units). Total = 9 units.",
      },
    ],
    hints: [
      "For each bar i, what determines the water level above it? The maximum height to its left and maximum height to its right: min(leftMax, rightMax) - height[i].",
      "Can we precompute prefix maximums and suffix maximums in O(n) time and O(n) space?",
      "Can we further reduce auxiliary space to O(1) using two pointers moving inward from both ends?",
    ],
    bruteForce: {
      title: "Approach 1 — Dynamic Array Precomputation (Prefix & Suffix Max)",
      intuition:
        "Precalculate `leftMax[i]` (the highest bar from 0 to i) and `rightMax[i]` (the highest bar from i to n-1). Then iterate through each bar and add `min(leftMax[i], rightMax[i]) - height[i]`.",
      code: {
        java: `class Solution {
    public int trap(int[] height) {
        int n = height.length;
        if (n <= 2) return 0;

        int[] leftMax = new int[n];
        int[] rightMax = new int[n];

        leftMax[0] = height[0];
        for (int i = 1; i < n; i++) {
            leftMax[i] = Math.max(leftMax[i - 1], height[i]);
        }

        rightMax[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            rightMax[i] = Math.max(rightMax[i + 1], height[i]);
        }

        int totalWater = 0;
        for (int i = 0; i < n; i++) {
            totalWater += Math.min(leftMax[i], rightMax[i]) - height[i];
        }

        return totalWater;
    }
}`,
        cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        if (n <= 2) return 0;

        vector<int> leftMax(n), rightMax(n);

        leftMax[0] = height[0];
        for (int i = 1; i < n; i++) {
            leftMax[i] = max(leftMax[i - 1], height[i]);
        }

        rightMax[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            rightMax[i] = max(rightMax[i + 1], height[i]);
        }

        int totalWater = 0;
        for (int i = 0; i < n; i++) {
            totalWater += min(leftMax[i], rightMax[i]) - height[i];
        }

        return totalWater;
    }
};`,
        python: `class Solution:
    def trap(self, height: list[int]) -> int:
        n = len(height)
        if n <= 2:
            return 0

        left_max = [0] * n
        right_max = [0] * n

        left_max[0] = height[0]
        for i in range(1, n):
            left_max[i] = max(left_max[i - 1], height[i])

        right_max[n - 1] = height[n - 1]
        for i in range(n - 2, -1, -1):
            right_max[i] = max(right_max[i + 1], height[i])

        total_water = 0
        for i in range(n):
            total_water += min(left_max[i], right_max[i]) - height[i]

        return total_water`,
        javascript: `var trap = function(height) {
    const n = height.length;
    if (n <= 2) return 0;

    const leftMax = new Array(n).fill(0);
    const rightMax = new Array(n).fill(0);

    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    let totalWater = 0;
    for (let i = 0; i < n; i++) {
        totalWater += Math.min(leftMax[i], rightMax[i]) - height[i];
    }

    return totalWater;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      explanation:
        "Uses two auxiliary arrays of size n to store prefix and suffix maximums, requiring O(n) additional memory.",
    },
    optimalSolution: {
      title: "Approach 2 — Two Pointers O(1) Space",
      intuition:
        "Maintain `left` and `right` pointers with running `leftMax` and `rightMax`. If `height[left] <= height[right]`, we know that `leftMax < rightMax` (or at least `rightMax` is guaranteed to be >= `leftMax` due to the taller right wall). Thus, water trapped at `left` is solely bounded by `leftMax`. We process `left` and increment it. Otherwise, we process `right` and decrement it.",
      code: {
        java: `class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int totalWater = 0;

        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    totalWater += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    totalWater += rightMax - height[right];
                }
                right--;
            }
        }

        return totalWater;
    }
}`,
        cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int leftMax = 0, rightMax = 0;
        int totalWater = 0;

        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    totalWater += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    totalWater += rightMax - height[right];
                }
                right--;
            }
        }

        return totalWater;
    }
};`,
        python: `class Solution:
    def trap(self, height: list[int]) -> int:
        left, right = 0, len(height) - 1
        left_max, right_max = 0, 0
        total_water = 0

        while left < right:
            if height[left] <= height[right]:
                if height[left] >= left_max:
                    left_max = height[left]
                else:
                    total_water += left_max - height[left]
                left += 1
            else:
                if height[right] >= right_max:
                    right_max = height[right]
                else:
                    total_water += right_max - height[right]
                right -= 1

        return total_water`,
        javascript: `var trap = function(height) {
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let totalWater = 0;

    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                totalWater += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                totalWater += rightMax - height[right];
            }
            right--;
        }
    }

    return totalWater;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      whyOptimal:
        "Single pass through the array with pointers meeting in the middle. Space is strictly O(1) auxiliary variables.",
    },
    pattern: "Two Pointers / Running Extremum",
    complexitySummary: {
      time: "O(n)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "height = [4, 2, 0, 3, 2, 5]",
      steps: [
        {
          stepNumber: 1,
          state: "left=0 (h=4), right=5 (h=5), leftMax=0, rightMax=0, total=0",
          action: "height[0] <= height[5] (4 <= 5). height[0] > leftMax -> leftMax=4. left++",
          result: "left=1, leftMax=4",
        },
        {
          stepNumber: 2,
          state: "left=1 (h=2), right=5 (h=5), leftMax=4",
          action: "height[1] <= height[5] (2 <= 5). height[1] < leftMax -> total += 4 - 2 = 2. left++",
          result: "left=2, total=2",
        },
        {
          stepNumber: 3,
          state: "left=2 (h=0), right=5 (h=5), leftMax=4",
          action: "height[2] <= height[5] (0 <= 5). height[2] < leftMax -> total += 4 - 0 = 4 (now 6). left++",
          result: "left=3, total=6",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Computing water based on local neighbors rather than global left/right maxima",
        fix: "Water is retained by the highest boundary in that entire direction, not just the immediately adjacent bar.",
      },
      {
        mistake: "Negative water subtraction if a bar is higher than running max",
        fix: "Always update the running max first when a bar is greater than or equal to the running max.",
      },
    ],
    variations: [
      "Trapping Rain Water II (3D version using PriorityQueue/Min-Heap)",
      "Container With Most Water",
      "Largest Rectangle in Histogram",
    ],
    practice: [
      { title: "Container With Most Water", difficulty: "Medium" },
      { title: "Largest Rectangle in Histogram", difficulty: "Hard" },
    ],
    tags: ["Two Pointers", "Array", "Dynamic Programming", "Stack"],
    companies: ["Google", "Amazon", "Goldman Sachs", "Microsoft", "Bloomberg"],
  },
  {
    id: "longest-substring-without-repeating-characters",
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    topic: "Sliding Window",
    subtopic: "Variable-Size Sliding Window",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Given a string `s`, find the length of the longest substring without repeating characters.",
    understandTheProblem:
      "A substring is a contiguous sequence of characters. We need to find a contiguous window of characters where every character is unique, and return its maximum possible length.",
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3. Notice that "pwke" is a subsequence and not a substring.',
      },
    ],
    hints: [
      "Use a sliding window [left, right]. As right expands, record the last index each character was seen.",
      "If character s[right] was seen previously inside the current window (index >= left), jump left to that last index + 1.",
      "Track max length as max(maxLength, right - left + 1).",
    ],
    bruteForce: {
      title: "Approach 1 — Check All Substrings with a Set",
      intuition:
        "Generate every substring `s[i...j]` and check if all characters in it are unique using a hash set. Keep track of the longest valid one.",
      code: {
        java: `import java.util.HashSet;
import java.util.Set;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length();
        int maxLen = 0;
        for (int i = 0; i < n; i++) {
            Set<Character> seen = new HashSet<>();
            for (int j = i; j < n; j++) {
                if (seen.contains(s.charAt(j))) break;
                seen.add(s.charAt(j));
                maxLen = Math.max(maxLen, j - i + 1);
            }
        }
        return maxLen;
    }
}`,
        cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int n = s.size();
        int maxLen = 0;
        for (int i = 0; i < n; i++) {
            unordered_set<char> seen;
            for (int j = i; j < n; j++) {
                if (seen.count(s[j])) break;
                seen.insert(s[j]);
                maxLen = max(maxLen, j - i + 1);
            }
        }
        return maxLen;
    }
};`,
        python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        n = len(s)
        max_len = 0
        for i in range(n):
            seen = set()
            for j in range(i, n):
                if s[j] in seen:
                    break
                seen.add(s[j])
                max_len = max(max_len, j - i + 1)
        return max_len`,
        javascript: `var lengthOfLongestSubstring = function(s) {
    let maxLen = 0;
    const n = s.length;
    for (let i = 0; i < n; i++) {
        const seen = new Set();
        for (let j = i; j < n; j++) {
            if (seen.has(s[j])) break;
            seen.add(s[j]);
            maxLen = Math.max(maxLen, j - i + 1);
        }
    }
    return maxLen;
};`,
      },
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(min(n, m)) where m is charset size",
      explanation:
        "Generates O(n^2) substrings. For n = 50,000, 50,000^2 is 2.5 * 10^9 operations, which will TLE.",
    },
    optimalSolution: {
      title: "Approach 2 — Sliding Window with Last-Seen Index Map",
      intuition:
        "Maintain a window `[left, right]`. Store the most recent index where character `c` appeared in a map or array. When encountering `s[right]`, if it appeared at index `idx >= left`, update `left = idx + 1`. Calculate `maxLen = max(maxLen, right - left + 1)` and record current position of `s[right]`.",
      code: {
        java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> lastSeen = new HashMap<>();
        int maxLen = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastSeen.containsKey(c) && lastSeen.get(c) >= left) {
                left = lastSeen.get(c) + 1;
            }
            lastSeen.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}`,
        cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> lastSeen(128, -1);
        int maxLen = 0;
        int left = 0;

        for (int right = 0; right < s.size(); right++) {
            char c = s[right];
            if (lastSeen[c] >= left) {
                left = lastSeen[c] + 1;
            }
            lastSeen[c] = right;
            maxLen = max(maxLen, right - left + 1);
        }

        return maxLen;
    }
};`,
        python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last_seen = {}
        max_len = 0
        left = 0

        for right, char in enumerate(s):
            if char in last_seen and last_seen[char] >= left:
                left = last_seen[char] + 1
            last_seen[char] = right
            max_len = max(max_len, right - left + 1)

        return max_len`,
        javascript: `var lengthOfLongestSubstring = function(s) {
    const lastSeen = new Map();
    let maxLen = 0;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        if (lastSeen.has(char) && lastSeen.get(char) >= left) {
            left = lastSeen.get(char) + 1;
        }
        lastSeen.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(min(n, m)) where m is charset size",
      whyOptimal:
        "Every character is visited once by the right pointer. The left pointer only jumps forward, achieving strict O(n) linear time with bounded O(min(n, 128)) auxiliary memory.",
    },
    pattern: "Sliding Window (Dynamic / Variable Size)",
    complexitySummary: {
      time: "O(n)",
      space: "O(min(n, m))",
    },
    dryRun: {
      sampleInput: 's = "abcabcbb"',
      steps: [
        {
          stepNumber: 1,
          state: "right=0 ('a'), left=0, map={}",
          action: "'a' not in window. lastSeen['a']=0. window='a' (len 1)",
          result: "maxLen=1",
        },
        {
          stepNumber: 2,
          state: "right=1 ('b'), left=0, map={'a':0}",
          action: "'b' not in window. lastSeen['b']=1. window='ab' (len 2)",
          result: "maxLen=2",
        },
        {
          stepNumber: 3,
          state: "right=2 ('c'), left=0, map={'a':0, 'b':1}",
          action: "'c' not in window. lastSeen['c']=2. window='abc' (len 3)",
          result: "maxLen=3",
        },
        {
          stepNumber: 4,
          state: "right=3 ('a'), left=0, map={'a':0, 'b':1, 'c':2}",
          action: "'a' found at index 0 >= left(0). Jump left to 0 + 1 = 1. lastSeen['a']=3. window='bca' (len 3)",
          result: "maxLen=3, left=1",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Jumping left backward when a duplicate is found outside the current window",
        fix: "Only update left if lastSeen[char] >= left; otherwise ignore older occurrences outside the current window.",
      },
      {
        mistake: "Assuming the input only contains lowercase English letters",
        fix: "The problem statement specifies ASCII letters, numbers, spaces, and symbols. Use a 128-sized array or a HashMap.",
      },
    ],
    variations: [
      "Longest Substring with At Most K Distinct Characters",
      "Minimum Window Substring",
      "Permutation in String",
    ],
    practice: [
      { title: "Minimum Window Substring", difficulty: "Hard" },
      { title: "Longest Repeating Character Replacement", difficulty: "Medium" },
    ],
    tags: ["Sliding Window", "Hash Table", "String"],
    companies: ["Amazon", "Microsoft", "Meta", "Bloomberg", "TCS"],
  },
];
