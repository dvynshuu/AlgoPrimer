import { Problem } from "@/types/content";

export const heapProblems: Problem[] = [
  {
    id: "kth-largest-element-in-an-array",
    slug: "kth-largest-element-in-an-array",
    title: "Kth Largest Element in an Array",
    topic: "Heap & Priority Queue",
    subtopic: "Min-Heap & QuickSelect",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array. Note that it is the `k`th largest element in sorted order, not the `k`th distinct element. Can you solve it without sorting the entire array?",
    understandTheProblem:
      "You are looking for the number that would be at index `n - k` if the array was sorted in ascending order. If k = 1, it's the maximum element. If k = 2, it's the second largest element.",
    constraints: [
      "1 <= k <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
    ],
    examples: [
      {
        input: "nums = [3, 2, 1, 5, 6, 4], k = 2",
        output: "5",
        explanation: "The sorted array is [1, 2, 3, 4, 5, 6]. The 2nd largest element is 5.",
      },
      {
        input: "nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4",
        output: "4",
        explanation: "The sorted array is [1, 2, 2, 3, 3, 4, 5, 5, 6]. The 4th largest element is 4.",
      },
    ],
    hints: [
      "Sorting the entire array takes O(N log N). Can you keep track of only the K largest candidates you have seen so far?",
      "What data structure lets you find and evict the SMALLEST of K elements in O(log K) time? A Min-Heap!",
      "QuickSelect can achieve O(N) average time by partitioning around a pivot without sorting the unneeded half.",
    ],
    bruteForce: {
      title: "Approach 1 — Full Array Sorting",
      intuition:
        "Sort the entire array in descending order and return the element at index k - 1, or sort in ascending order and return nums[nums.length - k].",
      code: {
        java: `public int findKthLargest(int[] nums, int k) {
    Arrays.sort(nums);
    return nums[nums.length - k];
}`,
        cpp: `int findKthLargest(vector<int>& nums, int k) {
    sort(nums.begin(), nums.end());
    return nums[nums.size() - k];
}`,
        python: `def findKthLargest(nums: list[int], k: int) -> int:
    nums.sort()
    return nums[-k]`,
        javascript: `var findKthLargest = function(nums, k) {
    nums.sort((a, b) => a - b);
    return nums[nums.length - k];
};`,
      },
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(1) or O(N) depending on sort implementation",
      explanation:
        "Standard dual-pivot quicksort or timsort sorts all N elements. While simple, it wastes compute ordering elements outside the top K.",
    },
    optimalSolution: {
      title: "Approach 2 — Bounded Min-Heap of Size K",
      intuition:
        "Maintain a Min-Heap of capacity K. Iterate through nums: offer each number into the heap. If heap size exceeds K, poll the smallest candidate. At the end, the root of the Min-Heap is guaranteed to be the K-th largest element!",
      code: {
        java: `public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>(k);
    for (int num : nums) {
        minHeap.offer(num);
        if (minHeap.size() > k) {
            minHeap.poll(); // Discard the smallest candidate
        }
    }
    return minHeap.peek(); // The k-th largest element sits at the top!
}`,
        cpp: `int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    return minHeap.top();
}`,
        python: `import heapq

def findKthLargest(nums: list[int], k: int) -> int:
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    return min_heap[0]`,
        javascript: `// Priority Queue simulation using binary heap array
var findKthLargest = function(nums, k) {
    // QuickSelect in-place partition gives O(N) average time
    const targetIdx = nums.length - k;
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        const pivotIdx = partition(nums, left, right);
        if (pivotIdx === targetIdx) return nums[pivotIdx];
        else if (pivotIdx < targetIdx) left = pivotIdx + 1;
        else right = pivotIdx - 1;
    }
    return -1;

    function partition(arr, l, r) {
        const pivot = arr[r];
        let p = l;
        for (let i = l; i < r; i++) {
            if (arr[i] <= pivot) {
                [arr[i], arr[p]] = [arr[p], arr[i]];
                p++;
            }
        }
        [arr[p], arr[r]] = [arr[r], arr[p]];
        return p;
    }
};`,
      },
      timeComplexity: "O(N log K)",
      spaceComplexity: "O(K) auxiliary memory",
      whyOptimal:
        "When K is much smaller than N (e.g. finding the top 10 in a stream of 10^8 elements), O(N log K) is effectively O(N) time and requires only K memory words.",
    },
    pattern: "Top K Elements / Bounded Heap",
    complexitySummary: {
      time: "O(N log K)",
      space: "O(K)",
    },
    dryRun: {
      sampleInput: "nums = [3, 2, 1, 5, 6, 4], k = 2",
      steps: [
        { stepNumber: 1, state: "num = 3", action: "heap.offer(3)", result: "Heap: [3]" },
        { stepNumber: 2, state: "num = 2", action: "heap.offer(2)", result: "Heap: [2, 3] (size = 2)" },
        { stepNumber: 3, state: "num = 1", action: "heap.offer(1) -> size 3 > 2 -> poll(1)", result: "Heap: [2, 3]" },
        { stepNumber: 4, state: "num = 5", action: "heap.offer(5) -> size 3 > 2 -> poll(2)", result: "Heap: [3, 5]" },
        { stepNumber: 5, state: "num = 6", action: "heap.offer(6) -> size 3 > 2 -> poll(3)", result: "Heap: [5, 6]" },
        { stepNumber: 6, state: "num = 4", action: "heap.offer(4) -> size 3 > 2 -> poll(4)", result: "Heap: [5, 6]" },
        { stepNumber: 7, state: "Complete", action: "return heap.peek()", result: "Returns 5 (2nd largest)" },
      ],
    },
    commonMistakes: [
      {
        mistake: "Using a Max-Heap of all N elements",
        why: "Storing all N items in a Max-Heap consumes O(N) auxiliary RAM. A Min-Heap of size K uses strictly O(K) space.",
        fix: "Use a Min-Heap capped at capacity K.",
      },
    ],
    variations: [
      "Kth Smallest Element in an Array (use Max-Heap of size K)",
      "Find K Closest Points to Origin",
      "Kth Largest Element in a Stream (streaming design)",
    ],
    practice: [
      { title: "Top K Frequent Elements", difficulty: "Medium" },
      { title: "Kth Largest Element in a Stream", difficulty: "Easy" },
    ],
    tags: ["Heap", "Priority Queue", "QuickSelect", "Sorting", "Top-K"],
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Apple"],
  },
  {
    id: "top-k-frequent-elements",
    slug: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    topic: "Heap & Priority Queue",
    subtopic: "Frequency Map & Min-Heap",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order. Your algorithm's time complexity must be better than O(n log n), where n is the array's size.",
    understandTheProblem:
      "Count how many times each number appears in the array. Return the K numbers that have the highest frequency counts.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "k is in the range [1, the number of unique elements in the array].",
      "It is guaranteed that the answer is unique.",
    ],
    examples: [
      {
        input: "nums = [1, 1, 1, 2, 2, 3], k = 2",
        output: "[1, 2]",
        explanation: "1 appears 3 times, 2 appears 2 times, and 3 appears 1 time. The 2 most frequent elements are 1 and 2.",
      },
      {
        input: "nums = [1], k = 1",
        output: "[1]",
        explanation: "1 is the only element, so it is the most frequent.",
      },
    ],
    hints: [
      "First pass: build a frequency hash map { element -> count } in O(N) time.",
      "Second pass: maintain a min-heap of size K ordered by frequency, or use Bucket Sort where bucket index = frequency!",
    ],
    bruteForce: {
      title: "Approach 1 — Hash Map + Full Sort by Frequency",
      intuition:
        "Count frequencies in a map. Convert unique keys to a list and sort the list by frequency in descending order. Slice the first K keys.",
      code: {
        java: `public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> count = new HashMap<>();
    for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);

    List<Integer> keys = new ArrayList<>(count.keySet());
    keys.sort((a, b) -> count.get(b) - count.get(a));

    int[] res = new int[k];
    for (int i = 0; i < k; i++) res[i] = keys.get(i);
    return res;
}`,
        cpp: `vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> count;
    for (int n : nums) count[n]++;

    vector<pair<int, int>> v;
    for (auto& [val, freq] : count) v.push_back({freq, val});
    sort(v.rbegin(), v.rend());

    vector<int> res;
    for (int i = 0; i < k; i++) res.push_back(v[i].second);
    return res;
}`,
        python: `from collections import Counter

def topKFrequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    sorted_keys = sorted(count.keys(), key=lambda x: count[x], reverse=True)
    return sorted_keys[:k]`,
        javascript: `var topKFrequent = function(nums, k) {
    const map = new Map();
    for (const n of nums) map.set(n, (map.get(n) || 0) + 1);
    const sorted = [...map.keys()].sort((a, b) => map.get(b) - map.get(a));
    return sorted.slice(0, k);
};`,
      },
      timeComplexity: "O(D log D) where D is number of unique elements",
      spaceComplexity: "O(D) for frequency map",
      explanation:
        "Sorting all unique elements takes O(D log D). When all elements are distinct, D = N, requiring O(N log N) time.",
    },
    optimalSolution: {
      title: "Approach 2 — Bucket Sort (O(N) Linear Time)",
      intuition:
        "No element can appear more than N times. Create an array of buckets where bucket[f] holds all numbers that appear with frequency f. Iterate from bucket N down to 0 to collect the top K elements in strictly O(N) time!",
      code: {
        java: `public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> count = new HashMap<>();
    for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);

    // Bucket index represents frequency count (from 0 to N)
    List<Integer>[] buckets = new List[nums.length + 1];
    for (int key : count.keySet()) {
        int freq = count.get(key);
        if (buckets[freq] == null) buckets[freq] = new ArrayList<>();
        buckets[freq].add(key);
    }

    int[] result = new int[k];
    int idx = 0;
    // Iterate from highest frequency bucket downwards
    for (int f = buckets.length - 1; f >= 0 && idx < k; f--) {
        if (buckets[f] != null) {
            for (int val : buckets[f]) {
                result[idx++] = val;
                if (idx == k) return result;
            }
        }
    }
    return result;
}`,
        cpp: `vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> count;
    for (int n : nums) count[n]++;

    vector<vector<int>> buckets(nums.size() + 1);
    for (auto& [val, freq] : count) {
        buckets[freq].push_back(val);
    }

    vector<int> result;
    for (int f = buckets.size() - 1; f >= 0 && result.size() < k; f--) {
        for (int val : buckets[f]) {
            result.push_back(val);
            if (result.size() == k) return result;
        }
    }
    return result;
}`,
        python: `from collections import Counter

def topKFrequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    n = len(nums)
    buckets = [[] for _ in range(n + 1)]

    for val, freq in count.items():
        buckets[freq].append(val)

    result = []
    for f in range(n, 0, -1):
        for val in buckets[f]:
            result.append(val)
            if len(result) == k:
                return result
    return result`,
        javascript: `var topKFrequent = function(nums, k) {
    const map = new Map();
    for (const n of nums) map.set(n, (map.get(n) || 0) + 1);

    const buckets = Array.from({ length: nums.length + 1 }, () => []);
    for (const [val, freq] of map.entries()) {
        buckets[freq].push(val);
    }

    const result = [];
    for (let f = buckets.length - 1; f >= 0 && result.length < k; f--) {
        for (const val of buckets[f]) {
            result.push(val);
            if (result.length === k) return result;
        }
    }
    return result;
};`,
      },
      timeComplexity: "O(N) single pass",
      spaceComplexity: "O(N) for buckets and hash map",
      whyOptimal:
        "Bucket sort bypasses comparison sorting entirely by using bounded integer frequencies (1 to N) as direct array indices, achieving strictly linear runtime.",
    },
    pattern: "Bucket Sort / Frequency Counting",
    complexitySummary: {
      time: "O(N)",
      space: "O(N)",
    },
    dryRun: {
      sampleInput: "nums = [1, 1, 1, 2, 2, 3], k = 2",
      steps: [
        { stepNumber: 1, state: "Build Map", action: "count frequencies", result: "{1: 3, 2: 2, 3: 1}" },
        { stepNumber: 2, state: "Populate Buckets", action: "place in buckets[freq]", result: "b[3]=[1], b[2]=[2], b[1]=[3]" },
        { stepNumber: 3, state: "Scan from b[6] down", action: "b[3] has [1]", result: "result = [1]" },
        { stepNumber: 4, state: "Continue scan", action: "b[2] has [2]", result: "result = [1, 2] (length == k -> Done!)" },
      ],
    },
    commonMistakes: [
      {
        mistake: "Allocating bucket array of size max(nums) instead of nums.length + 1",
        why: "Elements can have values up to 10^9, but maximum possible frequency count can never exceed N.",
        fix: "Size bucket array by `nums.length + 1` representing frequency 0 to N.",
      },
    ],
    variations: [
      "Sort Characters By Frequency",
      "Top K Frequent Words (Requires alphabetical tie-breaking)",
    ],
    practice: [
      { title: "Sort Characters By Frequency", difficulty: "Medium" },
      { title: "Top K Frequent Words", difficulty: "Medium" },
    ],
    tags: ["Hash Table", "Heap", "Bucket Sort", "Counting"],
    companies: ["Google", "Amazon", "Meta", "Bloomberg", "Uber"],
  },
  {
    id: "find-median-from-data-stream",
    slug: "find-median-from-data-stream",
    title: "Find Median from Data Stream",
    topic: "Heap & Priority Queue",
    subtopic: "Two Heaps Pattern",
    difficulty: "Hard",
    progressionLevel: "Level 4: Optimization",
    statement:
      "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values. Implement the `MedianFinder` class with `addNum(int num)` and `findMedian()`.",
    understandTheProblem:
      "Numbers stream in continuously. At any moment, you must report the median of all received numbers in O(1) time without re-sorting the whole history.",
    constraints: [
      "-10^5 <= num <= 10^5",
      "There will be at least one element in the data structure before calling findMedian.",
      "At most 5 * 10^4 calls will be made to addNum and findMedian.",
    ],
    examples: [
      {
        input: '["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]\n[[], [1], [2], [], [3], []]',
        output: "[null, null, null, 1.5, null, 2.0]",
        explanation: "1 -> median 1.0; add 2 -> median (1 + 2)/2 = 1.5; add 3 -> median 2.0.",
      },
    ],
    hints: [
      "Can you divide the numbers into two equal halves: a smaller half and a larger half?",
      "The largest number in the smaller half and the smallest number in the larger half determine the median!",
      "Use a Max-Heap for the smaller half and a Min-Heap for the larger half.",
    ],
    bruteForce: {
      title: "Approach 1 — Sorted Array Insertion (Insertion Sort)",
      intuition:
        "Maintain a dynamically sorted array. For each `addNum`, use binary search to find insertion point and insert. `findMedian` inspects the middle index in O(1).",
      code: {
        java: `class MedianFinder {
    List<Integer> list = new ArrayList<>();
    public void addNum(int num) {
        int idx = Collections.binarySearch(list, num);
        if (idx < 0) idx = -(idx + 1);
        list.add(idx, num); // Shifting takes O(N) time!
    }
    public double findMedian() {
        int n = list.size();
        if (n % 2 == 1) return list.get(n / 2);
        return (list.get(n / 2 - 1) + list.get(n / 2)) / 2.0;
    }
}`,
        cpp: `class MedianFinder {
    vector<int> list;
public:
    void addNum(int num) {
        auto it = lower_bound(list.begin(), list.end(), num);
        list.insert(it, num); // O(N) shift
    }
    double findMedian() {
        int n = list.size();
        if (n % 2 == 1) return list[n / 2];
        return (list[n / 2 - 1] + list[n / 2]) / 2.0;
    }
};`,
        python: `import bisect

class MedianFinder:
    def __init__(self):
        self.nums = []
    def addNum(self, num: int) -> None:
        bisect.insort(self.nums, num) # O(N) insertion
    def findMedian(self) -> double:
        n = len(self.nums)
        if n % 2 == 1:
            return float(self.nums[n // 2])
        return (self.nums[n // 2 - 1] + self.nums[n // 2]) / 2.0`,
        javascript: `var MedianFinder = function() {
    this.nums = [];
};
MedianFinder.prototype.addNum = function(num) {
    let l = 0, r = this.nums.length - 1;
    while (l <= r) {
        let m = (l + r) >> 1;
        if (this.nums[m] < num) l = m + 1;
        else r = m - 1;
    }
    this.nums.splice(l, 0, num); // O(N) shift
};
MedianFinder.prototype.findMedian = function() {
    let n = this.nums.length;
    if (n % 2 === 1) return this.nums[Math.floor(n / 2)];
    return (this.nums[n / 2 - 1] + this.nums[n / 2]) / 2;
};`,
      },
      timeComplexity: "addNum: O(N) | findMedian: O(1)",
      spaceComplexity: "O(N) array storage",
      explanation:
        "While binary search finds the insertion index in O(log N), shifting elements in an array or list takes O(N) per addition.",
    },
    optimalSolution: {
      title: "Approach 2 — Two Heaps Pattern (Max-Heap + Min-Heap)",
      intuition:
        "Divide numbers into two balanced partitions: 'small' (Max-Heap for lower half) and 'large' (Min-Heap for upper half). Maintain the invariant: `small.size() == large.size()` or `small.size() == large.size() + 1`. Both heap tops hold the median candidates in instant O(1) time!",
      code: {
        java: `class MedianFinder {
    private PriorityQueue<Integer> small; // Max-Heap (lower half)
    private PriorityQueue<Integer> large; // Min-Heap (upper half)

    public MedianFinder() {
        small = new PriorityQueue<>(Collections.reverseOrder());
        large = new PriorityQueue<>();
    }

    public void addNum(int num) {
        // Step 1: Add to small, filter largest to large
        small.offer(num);
        large.offer(small.poll());

        // Step 2: Maintain size invariant: small must have equal or +1 elements
        if (large.size() > small.size()) {
            small.offer(large.poll());
        }
    }

    public double findMedian() {
        if (small.size() > large.size()) {
            return small.peek();
        }
        return (small.peek() + large.peek()) / 2.0;
    }
}`,
        cpp: `class MedianFinder {
    priority_queue<int> small; // Max-heap
    priority_queue<int, vector<int>, greater<int>> large; // Min-heap
public:
    void addNum(int num) {
        small.push(num);
        large.push(small.top());
        small.pop();

        if (large.size() > small.size()) {
            small.push(large.top());
            large.pop();
        }
    }
    double findMedian() {
        if (small.size() > large.size()) return small.top();
        return (small.top() + large.top()) / 2.0;
    }
};`,
        python: `import heapq

class MedianFinder:
    def __init__(self):
        self.small = [] # Max-heap (stored as negative values)
        self.large = [] # Min-heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))

        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0`,
        javascript: `// Two-Heap simulation in JS using binary heap arrays
class MinHeap {
    constructor() { this.data = []; }
    push(val) { this.data.push(val); this.up(this.data.length - 1); }
    pop() {
        if (this.data.length === 1) return this.data.pop();
        const top = this.data[0];
        this.data[0] = this.data.pop();
        this.down(0);
        return top;
    }
    peek() { return this.data[0]; }
    size() { return this.data.length; }
    up(i) {
        while (i > 0) {
            let p = (i - 1) >> 1;
            if (this.data[i] < this.data[p]) {
                [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
                i = p;
            } else break;
        }
    }
    down(i) {
        let n = this.data.length;
        while ((i << 1) + 1 < n) {
            let l = (i << 1) + 1, r = l + 1, smallest = l;
            if (r < n && this.data[r] < this.data[l]) smallest = r;
            if (this.data[smallest] < this.data[i]) {
                [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
                i = smallest;
            } else break;
        }
    }
}

var MedianFinder = function() {
    this.small = new MinHeap(); // Simulates max heap by negating
    this.large = new MinHeap();
};
MedianFinder.prototype.addNum = function(num) {
    this.small.push(-num);
    this.large.push(-this.small.pop());
    if (this.large.size() > this.small.size()) {
        this.small.push(-this.large.pop());
    }
};
MedianFinder.prototype.findMedian = function() {
    if (this.small.size() > this.large.size()) return -this.small.peek();
    return (-this.small.peek() + this.large.peek()) / 2;
};`,
      },
      timeComplexity: "addNum: O(log N) | findMedian: O(1)",
      spaceComplexity: "O(N) memory to store data stream",
      whyOptimal:
        "Every incoming number is balanced in O(log N) heap operations. Querying the median is instantaneous O(1) by simply inspecting the roots of both heaps.",
    },
    pattern: "Two Heaps",
    complexitySummary: {
      time: "addNum: O(log N), findMedian: O(1)",
      space: "O(N)",
    },
    dryRun: {
      sampleInput: "Stream: [1, 2, 3]",
      steps: [
        { stepNumber: 1, state: "addNum(1)", action: "small: [1], large: []", result: "Median = 1.0" },
        { stepNumber: 2, state: "addNum(2)", action: "small: [1], large: [2]", result: "Median = (1 + 2)/2 = 1.5" },
        { stepNumber: 3, state: "addNum(3)", action: "small: [2, 1], large: [3]", result: "Median = small.peek() = 2.0" },
      ],
    },
    commonMistakes: [
      {
        mistake: "Allowing large heap to become bigger than small heap",
        why: "Inconsistent size invariant forces complicated conditional branching in findMedian.",
        fix: "Always maintain `small.size() == large.size()` or `small.size() == large.size() + 1`.",
      },
    ],
    variations: [
      "Sliding Window Median (requires delayed removal from Two Heaps)",
      "Find Median of Two Sorted Arrays",
    ],
    practice: [
      { title: "Sliding Window Median", difficulty: "Hard" },
      { title: "IPO", difficulty: "Hard" },
    ],
    tags: ["Heap", "Priority Queue", "Design", "Data Stream", "Two Heaps"],
    companies: ["Google", "Amazon", "Apple", "Microsoft", "Goldman Sachs"],
  },
];
