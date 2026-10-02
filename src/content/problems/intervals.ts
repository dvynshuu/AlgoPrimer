import { Problem } from "@/types/content";

export const intervalProblems: Problem[] = [
  {
    id: "merge-intervals",
    slug: "merge-intervals",
    title: "Merge Intervals",
    topic: "Intervals",
    subtopic: "Sorting & Interval Union",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    understandTheProblem:
      "If interval A overlaps with interval B (i.e. start of B <= end of A), merge them into a single continuous interval [start of A, max(end of A, end of B)]. Return the consolidated list.",
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= start_i <= end_i <= 10^4",
    ],
    examples: [
      {
        input: "intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]",
        output: "[[1, 6], [8, 10], [15, 18]]",
        explanation: "Intervals [1, 3] and [2, 6] overlap, so they merge into [1, 6].",
      },
      {
        input: "intervals = [[1, 4], [4, 5]]",
        output: "[[1, 5]]",
        explanation: "Intervals [1, 4] and [4, 5] touch at boundary 4, so they merge into [1, 5].",
      },
    ],
    hints: [
      "If intervals were sorted by start time, overlapping intervals would always be adjacent in the array!",
      "Sort by start time. Keep track of current interval: if next interval's start <= current's end, merge by extending end = max(current.end, next.end).",
    ],
    bruteForce: {
      title: "Approach 1 — Graph Connected Components",
      intuition:
        "Model each interval as a graph node. Add an edge between any two overlapping intervals. Find connected components and find the min start and max end of each component.",
      code: {
        java: `public int[][] merge(int[][] intervals) {
    // Naive pairwise overlap checking
    List<int[]> res = new ArrayList<>();
    boolean[] merged = new boolean[intervals.length];

    for (int i = 0; i < intervals.length; i++) {
        if (merged[i]) continue;
        int s = intervals[i][0], e = intervals[i][1];
        boolean changed = true;
        while (changed) {
            changed = false;
            for (int j = 0; j < intervals.length; j++) {
                if (!merged[j] && j != i) {
                    if (Math.max(s, intervals[j][0]) <= Math.min(e, intervals[j][1])) {
                        s = Math.min(s, intervals[j][0]);
                        e = Math.max(e, intervals[j][1]);
                        merged[j] = true;
                        changed = true;
                    }
                }
            }
        }
        res.add(new int[]{s, e});
    }
    return res.toArray(new int[res.size()][]);
}`,
        cpp: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    int n = intervals.size();
    vector<bool> merged(n, false);
    vector<vector<int>> res;

    for (int i = 0; i < n; i++) {
        if (merged[i]) continue;
        int s = intervals[i][0], e = intervals[i][1];
        bool changed = true;
        while (changed) {
            changed = false;
            for (int j = 0; j < n; j++) {
                if (!merged[j] && j != i) {
                    if (max(s, intervals[j][0]) <= min(e, intervals[j][1])) {
                        s = min(s, intervals[j][0]);
                        e = max(e, intervals[j][1]);
                        merged[j] = true;
                        changed = true;
                    }
                }
            }
        }
        res.push_back({s, e});
    }
    return res;
}`,
        python: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    n = len(intervals)
    merged = [False] * n
    res = []
    for i in range(n):
        if merged[i]: continue
        s, e = intervals[i]
        changed = True
        while changed:
            changed = False
            for j in range(n):
                if not merged[j] and j != i:
                    if max(s, intervals[j][0]) <= min(e, intervals[j][1]):
                        s = min(s, intervals[j][0])
                        e = max(e, intervals[j][1])
                        merged[j] = True
                        changed = True
        res.append([s, e])
    return res`,
        javascript: `var merge = function(intervals) {
    const n = intervals.length;
    const merged = new Array(n).fill(false);
    const res = [];
    for (let i = 0; i < n; i++) {
        if (merged[i]) continue;
        let [s, e] = intervals[i];
        let changed = true;
        while (changed) {
            changed = false;
            for (let j = 0; j < n; j++) {
                if (!merged[j] && j !== i) {
                    if (Math.max(s, intervals[j][0]) <= Math.min(e, intervals[j][1])) {
                        s = Math.min(s, intervals[j][0]);
                        e = Math.max(e, intervals[j][1]);
                        merged[j] = true;
                        changed = true;
                    }
                }
            }
        }
        res.push([s, e]);
    }
    return res;
};`,
      },
      timeComplexity: "O(N^2)",
      spaceComplexity: "O(N)",
      explanation:
        "Without sorting, every interval must repeatedly scan all other intervals to find overlapping partners, taking quadratic time.",
    },
    optimalSolution: {
      title: "Approach 2 — Sort by Start Time & Single Pass Merge",
      intuition:
        "Sort intervals by start time `a[0] - b[0]`. Iterate linearly: if `current.start <= prev.end`, merge by updating `prev.end = max(prev.end, current.end)`. Otherwise, push `current` as a new non-overlapping interval.",
      code: {
        java: `public int[][] merge(int[][] intervals) {
    if (intervals.length <= 1) return intervals;

    // 1. Sort intervals by start time
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

    List<int[]> merged = new ArrayList<>();
    int[] current = intervals[0];
    merged.add(current);

    for (int i = 1; i < intervals.length; i++) {
        int[] next = intervals[i];
        if (next[0] <= current[1]) {
            // Overlapping intervals: extend end boundary
            current[1] = Math.max(current[1], next[1]);
        } else {
            // Disjoint interval: begin new active interval
            current = next;
            merged.add(current);
        }
    }
    return merged.toArray(new int[merged.size()][]);
}`,
        cpp: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};
    sort(intervals.begin(), intervals.end());

    vector<vector<int>> merged;
    merged.push_back(intervals[0]);

    for (size_t i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] <= merged.back()[1]) {
            merged.back()[1] = max(merged.back()[1], intervals[i][1]);
        } else {
            merged.push_back(intervals[i]);
        }
    }
    return merged;
}`,
        python: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for current in intervals[1:]:
        prev = merged[-1]
        if current[0] <= prev[1]:
            prev[1] = max(prev[1], current[1])
        else:
            merged.append(current)
    return merged`,
        javascript: `var merge = function(intervals) {
    if (intervals.length <= 1) return intervals;
    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        const prev = merged[merged.length - 1];
        const curr = intervals[i];
        if (curr[0] <= prev[1]) {
            prev[1] = Math.max(prev[1], curr[1]);
        } else {
            merged.push(curr);
        }
    }
    return merged;
};`,
      },
      timeComplexity: "O(N log N) dominated by sorting",
      spaceComplexity: "O(N) for output list and sorting stack",
      whyOptimal:
        "Sorting aligns overlapping intervals sequentially. A single linear scan then merges them in O(N) additional steps.",
    },
    pattern: "Intervals / Sorting",
    complexitySummary: {
      time: "O(N log N)",
      space: "O(N)",
    },
    dryRun: {
      sampleInput: "[[1, 3], [2, 6], [8, 10], [15, 18]]",
      steps: [
        { stepNumber: 1, state: "Init", action: "sort by start time; merged = [[1, 3]]", result: "curr = [1, 3]" },
        { stepNumber: 2, state: "next = [2, 6]", action: "2 <= 3 -> overlap! curr[1] = max(3, 6) = 6", result: "merged = [[1, 6]]" },
        { stepNumber: 3, state: "next = [8, 10]", action: "8 > 6 -> disjoint! append [8, 10]", result: "merged = [[1, 6], [8, 10]]" },
        { stepNumber: 4, state: "next = [15, 18]", action: "15 > 10 -> disjoint! append [15, 18]", result: "merged = [[1, 6], [8, 10], [15, 18]]" },
      ],
    },
    commonMistakes: [
      {
        mistake: "Assuming curr[1] = next[1] on overlap",
        why: "If `next` is completely nested inside `curr` (e.g. [1, 10] and [2, 5]), assigning `curr[1] = 5` erroneously shrinks the interval.",
        fix: "Always use `curr[1] = Math.max(curr[1], next[1])`.",
      },
    ],
    variations: [
      "Insert Interval",
      "Non-overlapping Intervals",
      "Meeting Rooms I & II",
    ],
    practice: [
      { title: "Insert Interval", difficulty: "Medium" },
      { title: "Non-overlapping Intervals", difficulty: "Medium" },
      { title: "Meeting Rooms II", difficulty: "Medium" },
    ],
    tags: ["Intervals", "Sorting", "Array"],
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Bloomberg", "Apple"],
  },
  {
    id: "insert-interval",
    slug: "insert-interval",
    title: "Insert Interval",
    topic: "Intervals",
    subtopic: "Partitioning & Merging",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [start_i, end_i]` sorted in ascending order by `start_i`. You are also given an interval `newInterval = [start, end]`. Insert `newInterval` into `intervals` such that `intervals` is still sorted and non-overlapping (merge if necessary).",
    understandTheProblem:
      "The input is already sorted and non-overlapping. Insert a new interval, merging it with any intervals it touches, in a single linear pass.",
    constraints: [
      "0 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= start_i <= end_i <= 10^5",
      "intervals is sorted by start_i in ascending order.",
    ],
    examples: [
      {
        input: "intervals = [[1, 3], [6, 9]], newInterval = [2, 5]",
        output: "[[1, 5], [6, 9]]",
        explanation: "[2, 5] overlaps with [1, 3], producing [1, 5].",
      },
      {
        input: "intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval = [4, 8]",
        output: "[[1, 2], [3, 10], [12, 16]]",
        explanation: "[4, 8] overlaps with [3, 5], [6, 7], and [8, 10], producing [3, 10].",
      },
    ],
    hints: [
      "Partition the intervals into three natural stages:",
      "1. Intervals completely before newInterval (end_i < newInterval.start).",
      "2. Intervals that overlap with newInterval (merge into newInterval).",
      "3. Intervals completely after newInterval (start_i > newInterval.end).",
    ],
    bruteForce: {
      title: "Approach 1 — Append & Full Merge Intervals",
      intuition:
        "Append newInterval to intervals array, sort by start time, and run standard Merge Intervals algorithm in O(N log N) time.",
      code: {
        java: `public int[][] insert(int[][] intervals, int[] newInterval) {
    int[][] all = new int[intervals.length + 1][2];
    System.arraycopy(intervals, 0, all, 0, intervals.length);
    all[intervals.length] = newInterval;
    Arrays.sort(all, (a, b) -> Integer.compare(a[0], b[0]));

    List<int[]> res = new ArrayList<>();
    int[] curr = all[0];
    res.add(curr);
    for (int i = 1; i < all.length; i++) {
        if (all[i][0] <= curr[1]) curr[1] = Math.max(curr[1], all[i][1]);
        else { curr = all[i]; res.add(curr); }
    }
    return res.toArray(new int[res.size()][]);
}`,
        cpp: `vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
    intervals.push_back(newInterval);
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> res;
    for (const auto& iv : intervals) {
        if (res.empty() || res.back()[1] < iv[0]) res.push_back(iv);
        else res.back()[1] = max(res.back()[1], iv[1]);
    }
    return res;
}`,
        python: `def insert(intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
    intervals.append(newInterval)
    intervals.sort()
    res = []
    for iv in intervals:
        if not res or res[-1][1] < iv[0]:
            res.append(iv)
        else:
            res[-1][1] = max(res[-1][1], iv[1])
    return res`,
        javascript: `var insert = function(intervals, newInterval) {
    intervals.push(newInterval);
    intervals.sort((a, b) => a[0] - b[0]);
    const res = [];
    for (const iv of intervals) {
        if (res.length === 0 || res[res.length - 1][1] < iv[0]) res.push(iv);
        else res[res.length - 1][1] = Math.max(res[res.length - 1][1], iv[1]);
    }
    return res;
};`,
      },
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      explanation:
        "Appending and re-sorting discards the existing sorted order of the input array.",
    },
    optimalSolution: {
      title: "Approach 2 — 3-Phase Linear Scan in O(N) Time",
      intuition:
        "Phase 1: Add all intervals ending before newInterval.start. Phase 2: Merge all overlapping intervals into newInterval by expanding start = min, end = max. Phase 3: Add newInterval and all remaining trailing intervals.",
      code: {
        java: `public int[][] insert(int[][] intervals, int[] newInterval) {
    List<int[]> result = new ArrayList<>();
    int i = 0, n = intervals.length;

    // Phase 1: Add intervals ending before newInterval starts
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.add(intervals[i++]);
    }

    // Phase 2: Merge overlapping intervals
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.add(newInterval);

    // Phase 3: Add remaining intervals
    while (i < n) {
        result.add(intervals[i++]);
    }

    return result.toArray(new int[result.size()][]);
}`,
        cpp: `vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
    vector<vector<int>> result;
    int i = 0, n = intervals.size();

    while (i < n && intervals[i][1] < newInterval[0]) {
        result.push_back(intervals[i++]);
    }

    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = min(newInterval[0], intervals[i][0]);
        newInterval[1] = max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push_back(newInterval);

    while (i < n) {
        result.push_back(intervals[i++]);
    }

    return result;
}`,
        python: `def insert(intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
    result = []
    i, n = 0, len(intervals)

    while i < n and intervals[i][1] < newInterval[0]:
        result.append(intervals[i])
        i += 1

    while i < n and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1
    result.append(newInterval)

    while i < n:
        result.append(intervals[i])
        i += 1

    return result`,
        javascript: `var insert = function(intervals, newInterval) {
    const result = [];
    let i = 0, n = intervals.length;

    while (i < n && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i++]);
    }

    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);

    while (i < n) {
        result.push(intervals[i++]);
    }

    return result;
};`,
      },
      timeComplexity: "O(N) single pass",
      spaceComplexity: "O(N) for output array",
      whyOptimal:
        "Exploits the pre-sorted input property to process every element exactly once without any sorting overhead.",
    },
    pattern: "Intervals / Single Pass",
    complexitySummary: {
      time: "O(N)",
      space: "O(N)",
    },
    dryRun: {
      sampleInput: "intervals = [[1, 3], [6, 9]], newInterval = [2, 5]",
      steps: [
        { stepNumber: 1, state: "Phase 1", action: "intervals[0][1]=3 not < 2", result: "Phase 1 loop exits" },
        { stepNumber: 2, state: "Phase 2 (Merge)", action: "intervals[0][0]=1 <= 5 -> new = [min(2,1), max(5,3)] = [1, 5]", result: "newInterval = [1, 5]" },
        { stepNumber: 3, state: "Phase 2 cont.", action: "intervals[1][0]=6 not <= 5", result: "add [1, 5] to result" },
        { stepNumber: 4, state: "Phase 3 (Trailing)", action: "add [6, 9] to result", result: "[[1, 5], [6, 9]]" },
      ],
    },
    commonMistakes: [
      {
        mistake: "Checking intervals[i][0] < newInterval[0] instead of intervals[i][1] < newInterval[0]",
        why: "An interval starts before newInterval but could still overlap with it if its end extends into newInterval.",
        fix: "Phase 1 requires `intervals[i][1] < newInterval[0]`.",
      },
    ],
    variations: [
      "Merge Intervals",
      "Meeting Rooms II",
    ],
    practice: [
      { title: "Merge Intervals", difficulty: "Medium" },
      { title: "Employee Free Time", difficulty: "Hard" },
    ],
    tags: ["Intervals", "Array", "Linear Scan"],
    companies: ["Google", "Meta", "Amazon", "LinkedIn", "Apple"],
  },
  {
    id: "non-overlapping-intervals",
    slug: "non-overlapping-intervals",
    title: "Non-overlapping Intervals",
    topic: "Intervals",
    subtopic: "Greedy Interval Scheduling",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Given an array of intervals where intervals[i] = [start_i, end_i], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping. Note that intervals touching only at a point (e.g., [1, 2] and [2, 3]) do not overlap.",
    understandTheProblem:
      "Removing the minimum number of intervals is equivalent to keeping the MAXIMUM number of non-overlapping intervals (the classic Interval Scheduling problem). By picking intervals that end as early as possible, we leave the maximum possible room for remaining intervals.",
    constraints: [
      "1 <= intervals.length <= 10^5",
      "intervals[i].length == 2",
      "-5 * 10^4 <= start_i < end_i <= 5 * 10^4",
    ],
    examples: [
      {
        input: "intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]",
        output: "1",
        explanation: "[1, 3] can be removed and the rest of the intervals are non-overlapping.",
      },
      {
        input: "intervals = [[1, 2], [1, 2], [1, 2]]",
        output: "2",
        explanation: "You need to remove two [1, 2] to make the rest of the intervals non-overlapping.",
      },
      {
        input: "intervals = [[1, 2], [2, 3]]",
        output: "0",
        explanation: "You do not need to remove any intervals since they are already non-overlapping.",
      },
    ],
    hints: [
      "Which interval is always safer to keep: the one that ends earlier or the one that ends later?",
      "The one that ends earlier frees up space for future intervals and minimizes future conflicts.",
      "Sort intervals by end time. If the current interval starts before the previous one ends, we must drop it (increment removals). Otherwise, update `lastEnd = current.end`.",
    ],
    bruteForce: {
      title: "Approach 1 — Recursive Subset Exploration",
      intuition:
        "Sort intervals by start time and use recursion to try including or excluding each interval, tracking valid compatibility.",
      code: {
        java: `import java.util.Arrays;

class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        return helper(intervals, 0, -1);
    }

    private int helper(int[][] intervals, int idx, int prevIdx) {
        if (idx == intervals.length) return 0;
        int keep = Integer.MAX_VALUE;
        if (prevIdx == -1 || intervals[idx][0] >= intervals[prevIdx][1]) {
            keep = helper(intervals, idx + 1, idx);
        }
        int drop = 1 + helper(intervals, idx + 1, prevIdx);
        return Math.min(keep, drop);
    }
}`,
        cpp: `#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        return helper(intervals, 0, -1);
    }

private:
    int helper(const vector<vector<int>>& intervals, int idx, int prevIdx) {
        if (idx == (int)intervals.size()) return 0;
        int keep = INT_MAX;
        if (prevIdx == -1 || intervals[idx][0] >= intervals[prevIdx][1]) {
            keep = helper(intervals, idx + 1, idx);
        }
        int drop = 1 + helper(intervals, idx + 1, prevIdx);
        return min(keep, drop);
    }
};`,
        python: `class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: x[0])
        def helper(idx: int, prev_idx: int) -> int:
            if idx == len(intervals):
                return 0
            keep = float('inf')
            if prev_idx == -1 or intervals[idx][0] >= intervals[prev_idx][1]:
                keep = helper(idx + 1, idx)
            drop = 1 + helper(idx + 1, prev_idx)
            return min(keep, drop)
        return helper(0, -1)`,
        javascript: `var eraseOverlapIntervals = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    function helper(idx, prevIdx) {
        if (idx === intervals.length) return 0;
        let keep = Infinity;
        if (prevIdx === -1 || intervals[idx][0] >= intervals[prevIdx][1]) {
            keep = helper(idx + 1, idx);
        }
        const drop = 1 + helper(idx + 1, prevIdx);
        return Math.min(keep, drop);
    }
    return helper(0, -1);
};`,
      },
      timeComplexity: "O(2^N) — Exponential recursion tree evaluating keep/drop subsets.",
      spaceComplexity: "O(N) — Recursion stack depth.",
      explanation: "Explores all combinations of keeping vs dropping overlapping intervals.",
    },
    optimalSolution: {
      title: "Approach 2 — Greedy Interval Scheduling by End Time",
      intuition:
        "Sort intervals by their ending time in ascending order. Keep track of `prevEnd` (the end time of the last retained interval). Iterate through intervals: if `curr.start < prevEnd`, there is a collision and the current interval must be removed (`removals++`). Otherwise, there is no collision, so we keep it and update `prevEnd = curr.end`.",
      code: {
        java: `import java.util.Arrays;

class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length <= 1) return 0;

        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));

        int removals = 0;
        int prevEnd = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < prevEnd) {
                removals++;
            } else {
                prevEnd = intervals[i][1];
            }
        }

        return removals;
    }
}`,
        cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        if (intervals.size() <= 1) return 0;

        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });

        int removals = 0;
        int prevEnd = intervals[0][1];

        for (size_t i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] < prevEnd) {
                removals++;
            } else {
                prevEnd = intervals[i][1];
            }
        }

        return removals;
    }
};`,
        python: `class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        if len(intervals) <= 1:
            return 0

        intervals.sort(key=lambda x: x[1])
        removals = 0
        prev_end = intervals[0][1]

        for i in range(1, len(intervals)):
            if intervals[i][0] < prev_end:
                removals += 1
            else:
                prev_end = intervals[i][1]

        return removals`,
        javascript: `var eraseOverlapIntervals = function(intervals) {
    if (intervals.length <= 1) return 0;

    intervals.sort((a, b) => a[1] - b[1]);

    let removals = 0;
    let prevEnd = intervals[0][1];

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < prevEnd) {
            removals++;
        } else {
            prevEnd = intervals[i][1];
        }
    }

    return removals;
};`,
      },
      timeComplexity: "O(N log N) — Sorting dominates runtime; linear scan takes O(N).",
      spaceComplexity: "O(1) auxiliary (or O(log N) sorting stack) — No additional data structures.",
      explanation: "Greedy choice of sorting by end time is mathematically proven to maximize compatible interval count.",
      whyOptimal: "Optimal O(N log N) bound governed by comparison-based sorting lower bound.",
    },
    pattern: "Greedy / Interval Scheduling",
    complexitySummary: {
      time: "O(N log N)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]",
      steps: [
        {
          stepNumber: 1,
          state: "Sorted by end time",
          action: "Sorted order: [[1, 2], [2, 3], [1, 3], [3, 4]]. prevEnd = 2.",
          result: "removals = 0",
        },
        {
          stepNumber: 2,
          state: "Inspect [2, 3]",
          action: "start 2 >= prevEnd 2 (no overlap). Update prevEnd = 3.",
          result: "removals = 0",
        },
        {
          stepNumber: 3,
          state: "Inspect [1, 3]",
          action: "start 1 < prevEnd 3 (collision). Drop [1, 3].",
          result: "removals = 1",
        },
        {
          stepNumber: 4,
          state: "Inspect [3, 4]",
          action: "start 3 >= prevEnd 3 (no overlap). Update prevEnd = 4.",
          result: "removals = 1. Finished.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Sorting by start time instead of end time",
        fix: "An interval starting early can be extremely long (e.g., [1, 100]), which would block many shorter valid intervals.",
      },
      {
        mistake: "Counting touch points as overlaps (e.g., [1, 2] and [2, 3])",
        fix: "The problem specifies that touching intervals do not overlap. Condition for conflict is strictly `start < prevEnd`.",
      },
    ],
    variations: [
      "Minimum Number of Arrows to Burst Balloons (identical greedy logic)",
      "Meeting Rooms",
    ],
    practice: [
      { title: "Minimum Number of Arrows to Burst Balloons", difficulty: "Medium" },
      { title: "Meeting Rooms", difficulty: "Easy" },
    ],
    tags: ["Array", "Dynamic Programming", "Greedy", "Sorting"],
    companies: ["Google", "Meta", "Amazon", "Microsoft"],
  },
  {
    id: "meeting-rooms-ii",
    slug: "meeting-rooms-ii",
    title: "Meeting Rooms II",
    topic: "Intervals",
    subtopic: "Min-Heap / Sweep-Line",
    difficulty: "Medium",
    progressionLevel: "Level 4: Optimization",
    statement:
      "Given an array of meeting time intervals intervals where intervals[i] = [start_i, end_i], return the minimum number of conference rooms required.",
    understandTheProblem:
      "Each meeting requires a conference room for the duration `[start, end)`. If two meetings overlap in time, they cannot share a room. The minimum number of rooms needed across the entire day is equal to the maximum number of concurrent meetings occurring at any single moment.",
    constraints: [
      "1 <= intervals.length <= 10^4",
      "0 <= start_i < end_i <= 10^6",
    ],
    examples: [
      {
        input: "intervals = [[0, 30], [5, 10], [15, 20]]",
        output: "2",
        explanation: "Meeting [0, 30] overlaps with [5, 10] from time 5 to 10 (2 rooms). When [15, 20] starts, [5, 10] has ended, so it can reuse room 2.",
      },
      {
        input: "intervals = [[7, 10], [2, 4]]",
        output: "1",
        explanation: "The two meetings do not overlap, so 1 conference room is sufficient.",
      },
    ],
    hints: [
      "Think of each meeting as two discrete events: a room allocation at `start`, and a room release at `end`.",
      "If you extract all start times and all end times separately into two sorted arrays, you can use two pointers to simulate the chronological passage of time.",
      "Alternatively, sort by start time and use a Min-Heap of end times to track which room becomes available first.",
    ],
    bruteForce: {
      title: "Approach 1 — Time Array / Pairwise Overlap Matrix",
      intuition:
        "For each meeting, count how many other meetings overlap with its start time. Return the maximum count found.",
      code: {
        java: `class Solution {
    public int minMeetingRooms(int[][] intervals) {
        int maxRooms = 0;
        for (int i = 0; i < intervals.length; i++) {
            int currentRooms = 0;
            int time = intervals[i][0];
            for (int j = 0; j < intervals.length; j++) {
                if (time >= intervals[j][0] && time < intervals[j][1]) {
                    currentRooms++;
                }
            }
            maxRooms = Math.max(maxRooms, currentRooms);
        }
        return maxRooms;
    }
}`,
        cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        int maxRooms = 0;
        for (int i = 0; i < (int)intervals.size(); i++) {
            int currentRooms = 0;
            int time = intervals[i][0];
            for (int j = 0; j < (int)intervals.size(); j++) {
                if (time >= intervals[j][0] && time < intervals[j][1]) {
                    currentRooms++;
                }
            }
            maxRooms = max(maxRooms, currentRooms);
        }
        return maxRooms;
    }
};`,
        python: `class Solution:
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        max_rooms = 0
        for i in range(len(intervals)):
            t = intervals[i][0]
            current = sum(1 for s, e in intervals if s <= t < e)
            max_rooms = max(max_rooms, current)
        return max_rooms`,
        javascript: `var minMeetingRooms = function(intervals) {
    let maxRooms = 0;
    for (let i = 0; i < intervals.length; i++) {
        const time = intervals[i][0];
        let current = 0;
        for (let j = 0; j < intervals.length; j++) {
            if (time >= intervals[j][0] && time < intervals[j][1]) {
                current++;
            }
        }
        maxRooms = Math.max(maxRooms, current);
    }
    return maxRooms;
};`,
      },
      timeComplexity: "O(N^2) — Double loop checking every meeting start time against all intervals.",
      spaceComplexity: "O(1) — Constant memory.",
      explanation: "Tests the concurrency level at each discrete start time using pairwise checks.",
    },
    optimalSolution: {
      title: "Approach 2 — Chronological Sweep-Line with Two Pointers",
      intuition:
        "Separate all start times and end times into two arrays and sort both independently. Maintain `activeRooms` and two pointers `startPtr` and `endPtr`. If `starts[startPtr] < ends[endPtr]`, a new meeting started before any existing meeting finished, so increment `activeRooms` and `startPtr++`. Otherwise, an ongoing meeting ended, so decrement `activeRooms` and `endPtr++`.",
      code: {
        java: `import java.util.Arrays;

class Solution {
    public int minMeetingRooms(int[][] intervals) {
        if (intervals == null || intervals.length == 0) return 0;

        int n = intervals.length;
        int[] starts = new int[n];
        int[] ends = new int[n];

        for (int i = 0; i < n; i++) {
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }

        Arrays.sort(starts);
        Arrays.sort(ends);

        int activeRooms = 0, maxRooms = 0;
        int s = 0, e = 0;

        while (s < n) {
            if (starts[s] < ends[e]) {
                activeRooms++;
                s++;
            } else {
                activeRooms--;
                e++;
            }
            maxRooms = Math.max(maxRooms, activeRooms);
        }

        return maxRooms;
    }
}`,
        cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        int n = intervals.size();
        vector<int> starts(n), ends(n);
        for (int i = 0; i < n; i++) {
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }

        sort(starts.begin(), starts.end());
        sort(ends.begin(), ends.end());

        int activeRooms = 0, maxRooms = 0;
        int s = 0, e = 0;

        while (s < n) {
            if (starts[s] < ends[e]) {
                activeRooms++;
                s++;
            } else {
                activeRooms--;
                e++;
            }
            maxRooms = max(maxRooms, activeRooms);
        }

        return maxRooms;
    }
};`,
        python: `class Solution:
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        if not intervals:
            return 0

        starts = sorted([i[0] for i in intervals])
        ends = sorted([i[1] for i in intervals])

        active_rooms, max_rooms = 0, 0
        s, e = 0, 0

        while s < len(intervals):
            if starts[s] < ends[e]:
                active_rooms += 1
                s += 1
            else:
                active_rooms -= 1
                e += 1
            max_rooms = max(max_rooms, active_rooms)

        return max_rooms`,
        javascript: `var minMeetingRooms = function(intervals) {
    if (!intervals.length) return 0;

    const n = intervals.length;
    const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
    const ends = intervals.map(i => i[1]).sort((a, b) => a - b);

    let activeRooms = 0, maxRooms = 0;
    let s = 0, e = 0;

    while (s < n) {
        if (starts[s] < ends[e]) {
            activeRooms++;
            s++;
        } else {
            activeRooms--;
            e++;
        }
        maxRooms = Math.max(maxRooms, activeRooms);
    }

    return maxRooms;
};`,
      },
      timeComplexity: "O(N log N) — Sorting the start and end arrays dominates; linear two-pointer pass takes O(N).",
      spaceComplexity: "O(N) — Arrays for separated start and end times.",
      explanation: "Processes temporal events in chronological order, seamlessly simulating meeting room allocation.",
      whyOptimal: "Optimal O(N log N) time complexity matching the information-theoretic sorting bound.",
    },
    pattern: "Two Pointers / Chronological Sweep-Line",
    complexitySummary: {
      time: "O(N log N)",
      space: "O(N)",
    },
    dryRun: {
      sampleInput: "intervals = [[0, 30], [5, 10], [15, 20]]",
      steps: [
        {
          stepNumber: 1,
          state: "starts = [0, 5, 15], ends = [10, 20, 30]",
          action: "starts[0]=0 < ends[0]=10. activeRooms = 1, s = 1.",
          result: "maxRooms = 1",
        },
        {
          stepNumber: 2,
          state: "s = 1 (5), e = 0 (10)",
          action: "starts[1]=5 < ends[0]=10. activeRooms = 2, s = 2.",
          result: "maxRooms = 2",
        },
        {
          stepNumber: 3,
          state: "s = 2 (15), e = 0 (10)",
          action: "starts[2]=15 >= ends[0]=10. Meeting finished! activeRooms = 1, e = 1.",
          result: "maxRooms = 2",
        },
        {
          stepNumber: 4,
          state: "s = 2 (15), e = 1 (20)",
          action: "starts[2]=15 < ends[1]=20. activeRooms = 2, s = 3.",
          result: "maxRooms = 2. End of starts reached.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Treating a meeting ending at time T and starting at time T as overlapping",
        fix: "When `starts[s] == ends[e]`, the previous meeting has finished and its room is available. Ensure `>=` triggers room release before allocation.",
      },
      {
        mistake: "Sorting pairs together instead of decoupling start and end points",
        fix: "Decoupling starts and ends into separate sorted arrays makes tracking concurrent events trivial in O(N) without a priority queue.",
      },
    ],
    variations: [
      "Car Pooling",
      "Corporate Flight Bookings",
      "My Calendar I, II, III",
    ],
    practice: [
      { title: "Car Pooling", difficulty: "Medium" },
      { title: "Meeting Rooms", difficulty: "Easy" },
    ],
    tags: ["Array", "Two Pointers", "Greedy", "Sorting", "Heap (Priority Queue)"],
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Bloomberg", "Uber"],
  },
];

