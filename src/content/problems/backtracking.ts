import { Problem } from "@/types/content";

export const backtrackingProblems: Problem[] = [
  {
    id: "subsets",
    slug: "subsets",
    title: "Subsets (The Power Set)",
    topic: "Backtracking",
    topicSlug: "backtracking",
    subtopic: "State Space Trees",
    difficulty: "Medium",
    progressionLevel: "Level 2: Basic Implementation",
    statement:
      "Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.",
    understandTheProblem:
      "A subset can contain any number of elements from 0 to N. An array of size N has exactly 2^N subsets. Generate all of them.",
    constraints: [
      "1 <= nums.length <= 10",
      "-10 <= nums[i] <= 10",
      "All the numbers of nums are unique.",
    ],
    examples: [
      {
        input: "nums = [1, 2, 3]",
        output: "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]",
        explanation: "All 2^3 = 8 subsets of [1, 2, 3].",
      },
      {
        input: "nums = [0]",
        output: "[[], [0]]",
        explanation: "All 2^1 = 2 subsets.",
      },
    ],
    hints: [
      "At each element nums[i], you have two binary choices: either include it in the current subset, or exclude it.",
      "Alternatively, use a loop from index `start` to N - 1: choose element, explore deeper, unchoose.",
      "Bitmasking: numbers from 0 to (2^N - 1) uniquely encode all subsets.",
    ],
    bruteForce: {
      title: "Approach 1 — Cascading Iteration",
      intuition:
        "Start with an empty subset `[[]]`. For each number `x` in nums, duplicate all existing subsets and append `x` to each clone.",
      code: {
        java: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    result.add(new ArrayList<>()); // Empty set

    for (int num : nums) {
        int n = result.size();
        for (int i = 0; i < n; i++) {
            List<Integer> subset = new ArrayList<>(result.get(i));
            subset.add(num);
            result.add(subset);
        }
    }
    return result;
}`,
        cpp: `vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result = {{}};
    for (int num : nums) {
        int n = result.size();
        for (int i = 0; i < n; i++) {
            vector<int> sub = result[i];
            sub.push_back(num);
            result.push_back(sub);
        }
    }
    return result;
}`,
        python: `def subsets(nums: list[int]) -> list[list[int]]:
    result = [[]]
    for num in nums:
        result += [curr + [num] for curr in result]
    return result`,
        javascript: `var subsets = function(nums) {
    const result = [[]];
    for (const num of nums) {
        const len = result.length;
        for (let i = 0; i < len; i++) {
            result.push([...result[i], num]);
        }
    }
    return result;
};`,
      },
      timeComplexity: "O(N * 2^N)",
      spaceComplexity: "O(N * 2^N) to store power set",
      explanation:
        "There are 2^N subsets, each requiring on average N/2 element copies, giving O(N * 2^N) time.",
    },
    optimalSolution: {
      title: "Approach 2 — Depth-First Backtracking (State Space Tree)",
      intuition:
        "Traverse the state space tree with recursion: `backtrack(start, currentList)`. At each call, snapshot `currentList` into `result`. Loop from `start` to N - 1: choose `nums[i]`, recurse with `i + 1`, and unchoose by removing the last element.",
      code: {
        java: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {
    result.add(new ArrayList<>(current)); // Deep-copy current state!

    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);                  // 1. Choose
        backtrack(nums, i + 1, current, result); // 2. Explore
        current.remove(current.size() - 1);    // 3. Unchoose (Backtrack)
    }
}`,
        cpp: `vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> current;
    backtrack(nums, 0, current, result);
    return result;
}

void backtrack(const vector<int>& nums, int start, vector<int>& current, vector<vector<int>>& result) {
    result.push_back(current);
    for (size_t i = start; i < nums.size(); i++) {
        current.push_back(nums[i]);
        backtrack(nums, i + 1, current, result);
        current.pop_back();
    }
}`,
        python: `def subsets(nums: list[int]) -> list[list[int]]:
    result = []
    def backtrack(start: int, current: list[int]):
        result.append(list(current)) # Snapshot
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()
    backtrack(0, [])
    return result`,
        javascript: `var subsets = function(nums) {
    const result = [];
    function backtrack(start, current) {
        result.push([...current]);
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }
    backtrack(0, []);
    return result;
};`,
      },
      timeComplexity: "O(N * 2^N)",
      spaceComplexity: "O(N) auxiliary call stack space (excluding output)",
      whyOptimal:
        "Generates each subset by building it incrementally with strictly O(N) memory overhead on the execution stack.",
    },
    pattern: "Backtracking / State Space Tree",
    complexitySummary: {
      time: "O(N * 2^N)",
      space: "O(N)",
    },
    dryRun: {
      sampleInput: "nums = [1, 2]",
      steps: [
        { stepNumber: 1, state: "start = 0, curr = []", action: "add [] to result", result: "result = [[]]" },
        { stepNumber: 2, state: "i = 0, pick 1", action: "curr = [1], recurse(start=1)", result: "result = [[], [1]]" },
        { stepNumber: 3, state: "i = 1, pick 2", action: "curr = [1, 2], recurse(start=2)", result: "result = [[], [1], [1, 2]]" },
        { stepNumber: 4, state: "start=2, loop ends", action: "backtrack: pop 2, pop 1", result: "curr = []" },
        { stepNumber: 5, state: "i = 1, pick 2", action: "curr = [2], recurse(start=2)", result: "result = [[], [1], [1, 2], [2]]" },
      ],
    },
    commonMistakes: [
      {
        mistake: "result.add(current) without creating a clone",
        why: "`current` is a mutable reference. When backtracking pops elements, every entry in `result` ends up pointing to the same empty list `[]`.",
        fix: "Always deep-copy: `result.add(new ArrayList<>(current))` or `result.push([...current])`.",
      },
    ],
    variations: [
      "Subsets II (Input contains duplicates - requires skipping adjacent duplicates)",
      "Combinations (Subsets of fixed size K)",
      "Permutations",
    ],
    practice: [
      { title: "Subsets II", difficulty: "Medium" },
      { title: "Combination Sum", difficulty: "Medium" },
      { title: "Permutations", difficulty: "Medium" },
    ],
    tags: ["Backtracking", "Recursion", "Bit Manipulation"],
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Bloomberg"],
  },
  {
    id: "combination-sum",
    slug: "combination-sum",
    title: "Combination Sum",
    topic: "Backtracking",
    topicSlug: "backtracking",
    subtopic: "Unbounded Search Tree",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`. You may return the combinations in any order. The same number may be chosen from `candidates` an unlimited number of times.",
    understandTheProblem:
      "Find all unique combinations of numbers that sum to target. Each number can be reused as many times as needed. Two combinations are unique if the frequency of at least one of the chosen numbers is different.",
    constraints: [
      "1 <= candidates.length <= 30",
      "2 <= candidates[i] <= 40",
      "All elements of candidates are distinct.",
      "1 <= target <= 40",
    ],
    examples: [
      {
        input: "candidates = [2, 3, 6, 7], target = 7",
        output: "[[2, 2, 3], [7]]",
        explanation: "2 + 2 + 3 = 7, and 7 = 7. These are the only two valid combinations.",
      },
      {
        input: "candidates = [2, 3, 5], target = 8",
        output: "[[2, 2, 2, 2], [2, 3, 3], [3, 5]]",
        explanation: "Three valid combinations sum to 8.",
      },
    ],
    hints: [
      "Sort candidates first! If candidate > remaining target, you can break the loop early (pruning).",
      "Because each candidate can be reused, the recursive call passes `i` instead of `i + 1`.",
    ],
    bruteForce: {
      title: "Approach 1 — Unbounded Recursion without Sorting",
      intuition:
        "Try every candidate repeatedly. Stop when target is 0 or negative.",
      code: {
        java: `public List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> res = new ArrayList<>();
    dfs(candidates, target, 0, new ArrayList<>(), res);
    return res;
}
void dfs(int[] c, int remain, int start, List<Integer> curr, List<List<Integer>> res) {
    if (remain < 0) return;
    if (remain == 0) { res.add(new ArrayList<>(curr)); return; }
    for (int i = start; i < c.length; i++) {
        curr.add(c[i]);
        dfs(c, remain - c[i], i, curr, res); // Reuse i
        curr.remove(curr.size() - 1);
    }
}`,
        cpp: `vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    vector<vector<int>> res;
    vector<int> curr;
    dfs(candidates, target, 0, curr, res);
    return res;
}
void dfs(vector<int>& c, int remain, int start, vector<int>& curr, vector<vector<int>>& res) {
    if (remain < 0) return;
    if (remain == 0) { res.push_back(curr); return; }
    for (size_t i = start; i < c.size(); i++) {
        curr.push_back(c[i]);
        dfs(c, remain - c[i], i, curr, res);
        curr.pop_back();
    }
}`,
        python: `def combinationSum(candidates: list[int], target: int) -> list[list[int]]:
    res = []
    def dfs(remain, start, curr):
        if remain < 0: return
        if remain == 0:
            res.append(list(curr))
            return
        for i in range(start, len(candidates)):
            curr.append(candidates[i])
            dfs(remain - candidates[i], i, curr)
            curr.pop()
    dfs(target, 0, [])
    return res`,
        javascript: `var combinationSum = function(candidates, target) {
    const res = [];
    function dfs(remain, start, curr) {
        if (remain < 0) return;
        if (remain === 0) { res.push([...curr]); return; }
        for (let i = start; i < candidates.length; i++) {
            curr.push(candidates[i]);
            dfs(remain - candidates[i], i, curr);
            curr.pop();
        }
    }
    dfs(target, 0, []);
    return res;
};`,
      },
      timeComplexity: "O(N^(T/M)) where T is target and M is min candidate",
      spaceComplexity: "O(T/M) stack space",
      explanation:
        "Without sorting, branches that exceed remaining target are still explored before terminating.",
    },
    optimalSolution: {
      title: "Approach 2 — Sorted Backtracking with Early Pruning",
      intuition:
        "Sort `candidates` ascending. In the loop, if `candidates[i] > remainingTarget`, immediately `break` because all subsequent candidates are even larger! This prunes thousands of redundant recursive branches.",
      code: {
        java: `public class CombinationSum {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(candidates); // Pruning prerequisite!
        backtrack(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] candidates, int remain, int start, List<Integer> current, List<List<Integer>> result) {
        if (remain == 0) {
            result.add(new ArrayList<>(current));
            return;
        }

        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] > remain) {
                break; // Early prune: subsequent candidates are strictly larger!
            }
            current.add(candidates[i]);
            backtrack(candidates, remain - candidates[i], i, current, result); // Reuse index i
            current.remove(current.size() - 1);
        }
    }
}`,
        cpp: `vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    sort(candidates.begin(), candidates.end());
    vector<vector<int>> result;
    vector<int> current;

    auto backtrack = [&](auto& self, int remain, size_t start) -> void {
        if (remain == 0) {
            result.push_back(current);
            return;
        }
        for (size_t i = start; i < candidates.size(); i++) {
            if (candidates[i] > remain) break; // Prune!
            current.push_back(candidates[i]);
            self(self, remain - candidates[i], i);
            current.pop_back();
        }
    };

    backtrack(backtrack, target, 0);
    return result;
}`,
        python: `def combinationSum(candidates: list[int], target: int) -> list[list[int]]:
    candidates.sort() # Pruning prerequisite
    result = []

    def backtrack(remain: int, start: int, current: list[int]):
        if remain == 0:
            result.append(list(current))
            return
        for i in range(start, len(candidates)):
            if candidates[i] > remain:
                break # Early pruning!
            current.append(candidates[i])
            backtrack(remain - candidates[i], i, current) # Reuse i
            current.pop()

    backtrack(target, 0, [])
    return result`,
        javascript: `var combinationSum = function(candidates, target) {
    candidates.sort((a, b) => a - b);
    const result = [];

    function backtrack(remain, start, current) {
        if (remain === 0) {
            result.push([...current]);
            return;
        }
        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > remain) break; // Prune!
            current.push(candidates[i]);
            backtrack(remain - candidates[i], i, current);
            current.pop();
        }
    }

    backtrack(target, 0, []);
    return result;
};`,
      },
      timeComplexity: "O(2^T) where T is target / min candidate (tightly pruned)",
      spaceComplexity: "O(target / min candidate) auxiliary call stack depth",
      whyOptimal:
        "Sorting transforms the loop from continuing through oversized values into an instantaneous `break`, cutting the state space tree dramatically.",
    },
    pattern: "Backtracking / Pruning",
    complexitySummary: {
      time: "O(N^(T/M)) (Pruned)",
      space: "O(T/M)",
    },
    dryRun: {
      sampleInput: "candidates = [2, 3, 6, 7], target = 7",
      steps: [
        { stepNumber: 1, state: "pick 2", action: "remain = 5, recurse(start=0)", result: "curr = [2]" },
        { stepNumber: 2, state: "pick 2", action: "remain = 3, recurse(start=0)", result: "curr = [2, 2]" },
        { stepNumber: 3, state: "pick 2", action: "remain = 1 < 2 -> break!", result: "backtrack to [2, 2]" },
        { stepNumber: 4, state: "pick 3", action: "remain = 0 -> MATCH! add [2, 2, 3]", result: "result = [[2, 2, 3]]" },
        { stepNumber: 5, state: "pick 7", action: "remain = 0 -> MATCH! add [7]", result: "result = [[2, 2, 3], [7]]" },
      ],
    },
    commonMistakes: [
      {
        mistake: "Passing start = 0 instead of start = i",
        why: "Resetting start to 0 generates permutations (e.g. both [2, 2, 3] and [3, 2, 2]) rather than unique combinations.",
        fix: "Pass `start = i` to explore only elements at or to the right of the current element.",
      },
    ],
    variations: [
      "Combination Sum II (Each number used at most once, with duplicate numbers in input)",
      "Combination Sum III (Choose K numbers that sum to N)",
    ],
    practice: [
      { title: "Combination Sum II", difficulty: "Medium" },
      { title: "Combination Sum III", difficulty: "Medium" },
    ],
    tags: ["Backtracking", "Array", "Pruning"],
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Airbnb"],
  },
  {
    id: "permutations",
    slug: "permutations",
    title: "Permutations",
    topic: "Backtracking",
    topicSlug: "backtracking",
    subtopic: "All Orderings / In-Place Swapping",
    difficulty: "Medium",
    progressionLevel: "Level 2: Basic Implementation",
    statement:
      "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
    understandTheProblem:
      "A permutation is an arrangement of all elements into a specific sequence. For an array of length N with distinct elements, there are exactly N! distinct permutations. We need to systematically generate all N! orderings.",
    constraints: [
      "1 <= nums.length <= 6",
      "-10 <= nums[i] <= 10",
      "All the integers of nums are unique.",
    ],
    examples: [
      {
        input: "nums = [1, 2, 3]",
        output: "[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]",
        explanation: "All 3! = 6 possible orderings of [1, 2, 3].",
      },
      {
        input: "nums = [0, 1]",
        output: "[[0, 1], [1, 0]]",
        explanation: "All 2! = 2 orderings.",
      },
      {
        input: "nums = [1]",
        output: "[[1]]",
        explanation: "Single element array has only 1 permutation.",
      },
    ],
    hints: [
      "Approach 1: Track which elements have been used using a boolean array `used[]`.",
      "Approach 2 (In-Place Swapping): At index `start`, swap `nums[start]` with `nums[i]` for every `i >= start`. Recurse on `start + 1`, then backtrack by swapping back.",
      "In-place swapping avoids the need for an auxiliary `used` array or dynamic list allocations.",
    ],
    bruteForce: {
      title: "Approach 1 — Backtracking with Used Array",
      intuition:
        "Build permutations element by element. At each step, iterate through all numbers in nums. If a number hasn't been used yet in the current path, mark it used, add it, recurse, and then unmark it.",
      code: {
        java: `import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        boolean[] used = new boolean[nums.length];
        backtrack(nums, used, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] nums, boolean[] used, List<Integer> current, List<List<Integer>> result) {
        if (current.size() == nums.length) {
            result.add(new ArrayList<>(current));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            current.add(nums[i]);
            backtrack(nums, used, current, result);
            current.remove(current.size() - 1);
            used[i] = false;
        }
    }
}`,
        cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> result;
        vector<int> current;
        vector<bool> used(nums.size(), false);
        backtrack(nums, used, current, result);
        return result;
    }

private:
    void backtrack(const vector<int>& nums, vector<bool>& used, vector<int>& current, vector<vector<int>>& result) {
        if (current.size() == nums.size()) {
            result.push_back(current);
            return;
        }
        for (size_t i = 0; i < nums.size(); i++) {
            if (used[i]) continue;
            used[i] = true;
            current.push_back(nums[i]);
            backtrack(nums, used, current, result);
            current.pop_back();
            used[i] = false;
        }
    }
};`,
        python: `class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []
        used = [False] * len(nums)

        def backtrack(curr):
            if len(curr) == len(nums):
                result.append(list(curr))
                return
            for i in range(len(nums)):
                if not used[i]:
                    used[i] = True
                    curr.append(nums[i])
                    backtrack(curr)
                    curr.pop()
                    used[i] = False

        backtrack([])
        return result`,
        javascript: `var permute = function(nums) {
    const result = [];
    const used = new Array(nums.length).fill(false);

    function backtrack(curr) {
        if (curr.length === nums.length) {
            result.push([...curr]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            curr.push(nums[i]);
            backtrack(curr);
            curr.pop();
            used[i] = false;
        }
    }

    backtrack([]);
    return result;
};`,
      },
      timeComplexity: "O(N * N!) — There are N! permutations and each takes O(N) work to copy to result.",
      spaceComplexity: "O(N) — Recursion stack depth and boolean used array.",
      explanation: "Iterates through all unused candidates at each tree level, allocating paths incrementally.",
    },
    optimalSolution: {
      title: "Approach 2 — In-Place Swapping Backtracking",
      intuition:
        "Instead of maintaining a separate list and visited array, divide `nums` into two parts: elements before index `start` are fixed, and elements from `start` onwards are candidates. Swap `nums[start]` with `nums[i]` for each `i >= start`, recurse on `start + 1`, and swap back to restore the original state.",
      code: {
        java: `import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, result);
        return result;
    }

    private void backtrack(int[] nums, int start, List<List<Integer>> result) {
        if (start == nums.length) {
            List<Integer> perm = new ArrayList<>();
            for (int x : nums) perm.add(x);
            result.add(perm);
            return;
        }
        for (int i = start; i < nums.length; i++) {
            swap(nums, start, i);
            backtrack(nums, start + 1, result);
            swap(nums, start, i); // Backtrack
        }
    }

    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}`,
        cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> result;
        backtrack(nums, 0, result);
        return result;
    }

private:
    void backtrack(vector<int>& nums, int start, vector<vector<int>>& result) {
        if (start == (int)nums.size()) {
            result.push_back(nums);
            return;
        }
        for (int i = start; i < (int)nums.size(); i++) {
            swap(nums[start], nums[i]);
            backtrack(nums, start + 1, result);
            swap(nums[start], nums[i]);
        }
    }
};`,
        python: `class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []

        def backtrack(start):
            if start == len(nums):
                result.append(list(nums))
                return
            for i in range(start, len(nums)):
                nums[start], nums[i] = nums[i], nums[start]
                backtrack(start + 1)
                nums[start], nums[i] = nums[i], nums[start]

        backtrack(0)
        return result`,
        javascript: `var permute = function(nums) {
    const result = [];

    function backtrack(start) {
        if (start === nums.length) {
            result.push([...nums]);
            return;
        }
        for (let i = start; i < nums.length; i++) {
            [nums[start], nums[i]] = [nums[i], nums[start]];
            backtrack(start + 1);
            [nums[start], nums[i]] = [nums[i], nums[start]];
        }
    }

    backtrack(0);
    return result;
};`,
      },
      timeComplexity: "O(N * N!) — Generates exactly N! permutations; copying array takes O(N).",
      spaceComplexity: "O(N) — Call stack depth bounded by N. Zero extra auxiliary space for tracking state.",
      explanation: "Permutes elements directly inside the input array via two-way swaps.",
      whyOptimal: "Minimal possible memory footprint and avoids auxiliary heap collections during recursion.",
    },
    pattern: "Backtracking / In-Place Swapping",
    complexitySummary: {
      time: "O(N * N!)",
      space: "O(N)",
    },
    dryRun: {
      sampleInput: "nums = [1, 2, 3]",
      steps: [
        {
          stepNumber: 1,
          state: "start = 0, i = 0 (swap 1 with 1)",
          action: "nums=[1, 2, 3], recurse start=1.",
          result: "First position fixed to 1.",
        },
        {
          stepNumber: 2,
          state: "start = 1, i = 1 (swap 2 with 2)",
          action: "nums=[1, 2, 3], recurse start=2 -> leaf -> records [1, 2, 3].",
          result: "First permutation saved.",
        },
        {
          stepNumber: 3,
          state: "start = 1, i = 2 (swap 2 with 3)",
          action: "nums=[1, 3, 2], recurse start=2 -> leaf -> records [1, 3, 2]. Swap back.",
          result: "Second permutation saved.",
        },
        {
          stepNumber: 4,
          state: "start = 0, i = 1 (swap 1 with 2)",
          action: "nums=[2, 1, 3], recurse start=1.",
          result: "Explores permutations beginning with 2.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Forgetting to swap back (undoing the move) upon return",
        fix: "Backtracking requires restoring the array to its previous configuration so subsequent branch choices operate on the correct state.",
      },
      {
        mistake: "Pushing a reference to `nums` instead of a shallow copy into `result`",
        fix: "Since `nums` is modified in-place, appending `nums` directly causes all results in the list to mirror the final state of the array. Always copy (`new ArrayList<>(current)` or `[...nums]`).",
      },
    ],
    variations: [
      "Permutations II (input contains duplicates)",
      "Next Permutation (lexicographical next order)",
      "Permutation Sequence (k-th permutation)",
    ],
    practice: [
      { title: "Permutations II", difficulty: "Medium" },
      { title: "Next Permutation", difficulty: "Medium" },
    ],
    tags: ["Array", "Backtracking"],
    companies: ["Google", "Meta", "Amazon", "Microsoft", "LinkedIn"],
  },
  {
    id: "word-search",
    slug: "word-search",
    title: "Word Search",
    topic: "Backtracking",
    topicSlug: "backtracking",
    subtopic: "2D Grid DFS with In-Place Visited State",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in the same path.",
    understandTheProblem:
      "We need to find whether a target string can be spelled out by walking step-by-step between horizontally or vertically adjacent grid cells without revisiting any cell in the current path. If any valid path spells out the word, return true; otherwise return false.",
    constraints: [
      "m == board.length",
      "n == board[i].length",
      "1 <= m, n <= 6",
      "1 <= word.length <= 15",
      "board and word consist of only lowercase and uppercase English letters.",
    ],
    examples: [
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        output: "true",
        explanation: 'Path: board[0][0] ("A") -> board[0][1] ("B") -> board[0][2] ("C") -> board[1][2] ("C") -> board[2][2] ("E") -> board[2][1] ("D").',
      },
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
        output: "true",
        explanation: 'Path: board[1][3] ("S") -> board[2][3] ("E") -> board[2][2] ("E").',
      },
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
        output: "false",
        explanation: "Cannot reuse the 'B' at board[0][1].",
      },
    ],
    hints: [
      "Scan every cell (r, c) on the board. If `board[r][c] == word[0]`, initiate DFS from that cell.",
      "Base cases for DFS: if `k == word.length()`, the whole word has been matched -> return true. If (r, c) is out of bounds or `board[r][c] != word[k]`, return false.",
      "To avoid allocating a separate boolean visited array, temporarily mask `board[r][c] = '#'`, recurse to 4 neighbors, and restore `board[r][c] = origChar` before returning.",
    ],
    bruteForce: {
      title: "Approach 1 — DFS with Boolean Visited Matrix",
      intuition:
        "Maintain an `m x n` boolean array `visited`. For each cell matching `word[0]`, run a 4-directional DFS marking visited cells.",
      code: {
        java: `class Solution {
    public boolean exist(char[][] board, String word) {
        int m = board.length, n = board[0].length;
        boolean[][] visited = new boolean[m][n];
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (dfs(board, word, r, c, 0, visited)) return true;
            }
        }
        return false;
    }

    private boolean dfs(char[][] board, String word, int r, int c, int k, boolean[][] visited) {
        if (k == word.length()) return true;
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return false;
        if (visited[r][c] || board[r][c] != word.charAt(k)) return false;

        visited[r][c] = true;
        boolean found = dfs(board, word, r + 1, c, k + 1, visited) ||
                        dfs(board, word, r - 1, c, k + 1, visited) ||
                        dfs(board, word, r, c + 1, k + 1, visited) ||
                        dfs(board, word, r, c - 1, k + 1, visited);
        visited[r][c] = false;
        return found;
    }
}`,
        cpp: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    boolean exist(vector<vector<char>>& board, string word) {
        int m = board.size(), n = board[0].size();
        vector<vector<bool>> visited(m, vector<bool>(n, false));
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (dfs(board, word, r, c, 0, visited)) return true;
            }
        }
        return false;
    }

private:
    bool dfs(const vector<vector<char>>& board, const string& word, int r, int c, int k, vector<vector<bool>>& visited) {
        if (k == (int)word.size()) return true;
        if (r < 0 || r >= (int)board.size() || c < 0 || c >= (int)board[0].size()) return false;
        if (visited[r][c] || board[r][c] != word[k]) return false;

        visited[r][c] = true;
        bool found = dfs(board, word, r + 1, c, k + 1, visited) ||
                     dfs(board, word, r - 1, c, k + 1, visited) ||
                     dfs(board, word, r, c + 1, k + 1, visited) ||
                     dfs(board, word, r, c - 1, k + 1, visited);
        visited[r][c] = false;
        return found;
    }
};`,
        python: `class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        m, n = len(board), len(board[0])
        visited = [[False] * n for _ in range(m)]

        def dfs(r, c, k):
            if k == len(word):
                return True
            if r < 0 or r >= m or c < 0 or c >= n:
                return False
            if visited[r][c] or board[r][c] != word[k]:
                return False

            visited[r][c] = True
            found = (dfs(r + 1, c, k + 1) or
                     dfs(r - 1, c, k + 1) or
                     dfs(r, c + 1, k + 1) or
                     dfs(r, c - 1, k + 1))
            visited[r][c] = False
            return found

        for r in range(m):
            for c in range(n):
                if dfs(r, c, 0):
                    return True
        return False`,
        javascript: `var exist = function(board, word) {
    const m = board.length, n = board[0].length;
    const visited = Array.from({ length: m }, () => new Array(n).fill(false));

    function dfs(r, c, k) {
        if (k === word.length) return true;
        if (r < 0 || r >= m || c < 0 || c >= n) return false;
        if (visited[r][c] || board[r][c] !== word[k]) return false;

        visited[r][c] = true;
        const found = dfs(r + 1, c, k + 1) ||
                      dfs(r - 1, c, k + 1) ||
                      dfs(r, c + 1, k + 1) ||
                      dfs(r, c - 1, k + 1);
        visited[r][c] = false;
        return found;
    }

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (dfs(r, c, 0)) return true;
        }
    }
    return false;
};`,
      },
      timeComplexity: "O(M * N * 3^L) where L is word length — At each step after the first, there are at most 3 branching directions.",
      spaceComplexity: "O(M * N + L) — M * N boolean visited matrix plus recursion stack.",
      explanation: "Explores paths using a dedicated visited tracking matrix.",
    },
    optimalSolution: {
      title: "Approach 2 — In-Place Character Masking Backtracking",
      intuition:
        "Eliminate the `visited` array completely. When a cell `board[r][c]` matches `word[k]`, temporarily overwrite it with a sentinel character `#`. Recursively search adjacent neighbors. Upon backtracking, restore `board[r][c] = word[k]`. This achieves O(1) auxiliary memory beyond the recursion stack.",
      code: {
        java: `class Solution {
    public boolean exist(char[][] board, String word) {
        int m = board.length, n = board[0].length;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == word.charAt(0) && dfs(board, word, r, c, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean dfs(char[][] board, String word, int r, int c, int k) {
        if (k == word.length()) return true;
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] != word.charAt(k)) {
            return false;
        }

        char original = board[r][c];
        board[r][c] = '#'; // In-place mask

        boolean found = dfs(board, word, r + 1, c, k + 1) ||
                        dfs(board, word, r - 1, c, k + 1) ||
                        dfs(board, word, r, c + 1, k + 1) ||
                        dfs(board, word, r, c - 1, k + 1);

        board[r][c] = original; // Backtrack restore
        return found;
    }
}`,
        cpp: `#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size(), n = board[0].size();
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == word[0] && dfs(board, word, r, c, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

private:
    bool dfs(vector<vector<char>>& board, const string& word, int r, int c, int k) {
        if (k == (int)word.size()) return true;
        if (r < 0 || r >= (int)board.size() || c < 0 || c >= (int)board[0].size() || board[r][c] != word[k]) {
            return false;
        }

        char original = board[r][c];
        board[r][c] = '#';

        bool found = dfs(board, word, r + 1, c, k + 1) ||
                     dfs(board, word, r - 1, c, k + 1) ||
                     dfs(board, word, r, c + 1, k + 1) ||
                     dfs(board, word, r, c - 1, k + 1);

        board[r][c] = original;
        return found;
    }
};`,
        python: `class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        m, n = len(board), len(board[0])

        def dfs(r, c, k):
            if k == len(word):
                return True
            if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != word[k]:
                return False

            original = board[r][c]
            board[r][c] = "#"

            found = (dfs(r + 1, c, k + 1) or
                     dfs(r - 1, c, k + 1) or
                     dfs(r, c + 1, k + 1) or
                     dfs(r, c - 1, k + 1))

            board[r][c] = original
            return found

        for r in range(m):
            for c in range(n):
                if board[r][c] == word[0] and dfs(r, c, 0):
                    return True
        return False`,
        javascript: `var exist = function(board, word) {
    const m = board.length, n = board[0].length;

    function dfs(r, c, k) {
        if (k === word.length) return true;
        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[k]) {
            return false;
        }

        const original = board[r][c];
        board[r][c] = "#";

        const found = dfs(r + 1, c, k + 1) ||
                      dfs(r - 1, c, k + 1) ||
                      dfs(r, c + 1, k + 1) ||
                      dfs(r, c - 1, k + 1);

        board[r][c] = original;
        return found;
    }

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (board[r][c] === word[0] && dfs(r, c, 0)) {
                return true;
            }
        }
    }
    return false;
};`,
      },
      timeComplexity: "O(M * N * 3^L) — M * N starting cells, each branching into at most 3 non-backwards directions for depth L.",
      spaceComplexity: "O(L) — Recursion stack depth bounded by string length L. Zero auxiliary matrix allocation.",
      explanation: "Temporarily alters character value to prevent cycle retracing, restoring original characters on unwinding.",
      whyOptimal: "Optimal space complexity O(L) without the memory overhead and allocation latency of a visited grid.",
    },
    pattern: "Backtracking / Grid DFS / In-Place State Masking",
    complexitySummary: {
      time: "O(M * N * 3^L)",
      space: "O(L)",
    },
    dryRun: {
      sampleInput: 'board = [["A","B"],["C","D"]], word = "ABDC"',
      steps: [
        {
          stepNumber: 1,
          state: "r=0, c=0 ('A')",
          action: "Matches word[0]='A'. Mask board[0][0]='#'. Recurse k=1.",
          result: "Exploring neighbors of 'A'.",
        },
        {
          stepNumber: 2,
          state: "r=0, c=1 ('B')",
          action: "Matches word[1]='B'. Mask board[0][1]='#'. Recurse k=2.",
          result: "Exploring neighbors of 'B'.",
        },
        {
          stepNumber: 3,
          state: "r=1, c=1 ('D')",
          action: "Matches word[2]='D'. Mask board[1][1]='#'. Recurse k=3.",
          result: "Exploring neighbors of 'D'.",
        },
        {
          stepNumber: 4,
          state: "r=1, c=0 ('C')",
          action: "Matches word[3]='C'. Mask board[1][0]='#'. Recurse k=4 == word.length.",
          result: "Base case reached! Returns true.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Allowing immediate backward step to reuse previous character",
        fix: "Mask the current cell before recursing so neighbor checks will see '#' and not branch back into the parent cell.",
      },
      {
        mistake: "Early return on true without restoring cell values",
        fix: "While returning true immediately skips restoration for that branch, always ensure failed branches restore original values for other starting searches.",
      },
    ],
    variations: [
      "Word Search II (Trie + 2D Grid Backtracking for multiple dictionary words)",
      "Number of Islands (BFS/DFS connected components)",
    ],
    practice: [
      { title: "Word Search II", difficulty: "Hard" },
      { title: "Surrounded Regions", difficulty: "Medium" },
    ],
    tags: ["Array", "String", "Backtracking", "Matrix"],
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Bloomberg"],
  },
];

