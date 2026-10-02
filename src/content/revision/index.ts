import { RevisionCard } from "@/types/content";

export const revisionCards: RevisionCard[] = [
  {
    id: "rev-complexity",
    title: "Time & Space Complexity (Big-O)",
    topic: "Complexity",
    category: "DSA Fundamentals",
    rememberPoints: [
      "Big-O measures asymptotic scaling as N -> infinity, independent of CPU clock speed.",
      "10^8 operations per second is the hard threshold for 1-second execution in Online Assessments.",
      "When N = 10^5: O(N^2) = 10^10 operations (TLE!), requires O(N log N) or O(N).",
      "Auxiliary space measures extra memory allocated by the algorithm, excluding problem input storage.",
      "Master Theorem: T(N) = aT(N/b) + O(N^d) solves divide-and-conquer recurrences in seconds.",
    ],
    commonMistakes: [
      "Confusing consecutive loops (O(N) + O(N) = O(N)) with nested loops (O(N) * O(N) = O(N^2)).",
      "Ignoring recursive call stack depth in space complexity analysis.",
      "Assuming string slicing or array concatenation inside a loop is O(1) (it is O(K), causing accidental O(N^2)).",
    ],
    importantPatterns: [
      "Binary search cuts the domain in half -> O(log N).",
      "Divide and Conquer with merge step -> O(N log N).",
      "Hash table lookup / insertion -> O(1) average.",
      "Amortized dynamic array doubling -> O(1) amortized.",
    ],
    codeSnippet: `// 1-Second OA Time Limit Rule:
// N <= 10^4  : O(N^2) acceptable
// N <= 10^6  : O(N log N) or O(N) mandatory
// N >= 10^8  : O(log N) or O(1) mandatory`,
  },
  {
    id: "rev-arrays",
    title: "Arrays & Contiguous Memory",
    topic: "Arrays",
    category: "DSA Fundamentals",
    rememberPoints: [
      "Physical RAM layout is contiguous: Address(i) = BaseAddress + i * sizeof(type).",
      "Direct random access is instantaneous O(1); unsorted search is O(N).",
      "Hardware spatial locality streams 64-byte cache lines into L1 cache, making array loops vastly faster than pointer chasing.",
      "Insertions and deletions at arbitrary middle positions require O(N) element shifts.",
    ],
    commonMistakes: [
      "Off-by-one errors on boundaries (< vs <= arr.length).",
      "Shifting elements from left to right during insertion, which clobbers values.",
      "Assuming dynamic arrays (ArrayList/std::vector) never incur reallocation costs.",
    ],
    importantPatterns: [
      "Two Pointers (converging, fast/slow).",
      "Prefix Sum (range sum queries in O(1)).",
      "Sliding Window (fixed and variable size subarrays).",
      "Kadane's Algorithm (maximum contiguous subarray in O(N)).",
    ],
    codeSnippet: `// Two-Pointer in-place reversal
int l = 0, r = arr.length - 1;
while (l < r) {
    int tmp = arr[l]; arr[l] = arr[r]; arr[r] = tmp;
    l++; r--;
}`,
  },
  {
    id: "rev-two-pointers",
    title: "Two Pointers Technique",
    topic: "Two Pointers",
    category: "Problem Solving Patterns",
    rememberPoints: [
      "Reduces brute force O(N^2) pairs down to O(N) by exploiting sorted order or partitioning.",
      "Pointers only advance in one direction, ensuring total steps <= N.",
      "Strictly O(1) auxiliary space requirement.",
    ],
    commonMistakes: [
      "Applying opposing two pointers on unsorted data without verifying monotonicity.",
      "Using while (l <= r) when comparing distinct pairs (results in self-pairing).",
      "Missing duplicate skipping logic in problems like 3Sum.",
    ],
    importantPatterns: [
      "Opposing Pointers: Left from 0, Right from N-1 (Two Sum II, Container With Most Water).",
      "Slow/Fast Pointers: Cycle detection (Floyd's algorithm) or in-place deduplication.",
      "Sliding Window: Expanding right pointer and shrinking left pointer.",
    ],
    codeSnippet: `// Deduplicating sorted array in-place
int i = 0;
for (int j = 1; j < n; j++) {
    if (nums[j] != nums[i]) {
        nums[++i] = nums[j];
    }
}
return i + 1;`,
  },
  {
    id: "rev-sliding-window",
    title: "Sliding Window Framework",
    topic: "Sliding Window",
    category: "Problem Solving Patterns",
    rememberPoints: [
      "Converts nested O(N^2) subarray searches into a linear O(N) pass by reusing calculations from overlapping elements.",
      "Fixed Window: window size K is constant; slide right by adding arr[i] and removing arr[i - k].",
      "Variable Window: expand right pointer until constraint is violated; shrink left pointer until constraint is restored.",
      "Requires monotonicity: shrinking the window must move the condition toward validity.",
    ],
    commonMistakes: [
      "Using sliding window when elements can be negative (breaks monotonicity for sum problems; use Prefix Sum + HashMap instead!).",
      "Shrinking left pointer with `if` instead of `while` when multiple steps are needed to restore the constraint.",
    ],
    importantPatterns: [
      "Longest Substring Without Repeating Characters (Hash Set window).",
      "Minimum Window Substring (Character frequency map with matched count).",
      "Max Consecutive Ones III (At most K flips).",
    ],
    codeSnippet: `// Variable-size Sliding Window Template
int left = 0;
for (int right = 0; right < n; right++) {
    window.add(nums[right]);
    while (!isValid(window)) {
        window.remove(nums[left]);
        left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
}`,
  },
  {
    id: "rev-prefix-sum",
    title: "Prefix Sum & Hash Map Technique",
    topic: "Arrays",
    category: "Problem Solving Patterns",
    rememberPoints: [
      "PrefixSum[i] = nums[0] + nums[1] + ... + nums[i].",
      "Subarray sum between i and j is: PrefixSum[j] - PrefixSum[i - 1].",
      "To find subarray sum == k: PrefixSum[j] - PrefixSum[i] = k  =>  PrefixSum[i] = PrefixSum[j] - k.",
      "Must initialize frequency map with (0 -> 1) to count subarrays starting from index 0.",
    ],
    commonMistakes: [
      "Using sliding window when array contains negative numbers (breaks monotonicity).",
      "Forgetting the base case: prefix sum of 0 has occurred 1 time initially.",
    ],
    importantPatterns: [
      "Subarray Sum Equals K.",
      "Contiguous Array with equal 0s and 1s (replace 0 with -1 and find subarray sum 0).",
      "Range sum query in 1D arrays and 2D matrices in O(1) query time.",
    ],
    codeSnippet: `Map<Integer, Integer> map = new HashMap<>();
map.put(0, 1);
int sum = 0, count = 0;
for (int x : nums) {
    sum += x;
    count += map.getOrDefault(sum - k, 0);
    map.put(sum, map.getOrDefault(sum, 0) + 1);
}`,
  },
  {
    id: "rev-binary-search",
    title: "Binary Search & Search on Answer",
    topic: "Binary Search",
    category: "Algorithms",
    rememberPoints: [
      "Halves search space each step: O(log N) comparisons.",
      "Always compute midpoint safely: `mid = low + (high - low) / 2` to avoid 32-bit signed integer overflow.",
      "Binary Search on Answer applies whenever a decision function f(x) is monotonic: [F, F, ..., T, T].",
      "When target is absent, `low` points to the exact insertion index maintaining sorted order.",
    ],
    commonMistakes: [
      "Using `(low + high) / 2` which overflows to negative when low + high > 2^31 - 1.",
      "Infinite loop when updating boundaries without +1 or -1 in `while (low <= high)`.",
      "Setting search bounds too tight in Binary Search on Answer.",
    ],
    importantPatterns: [
      "Search in Rotated Sorted Array (at least one half is always normally sorted).",
      "Koko Eating Bananas / Capacity to Ship Packages (Search on Answer).",
      "Find Peak Element (Binary search on unsorted gradient).",
    ],
    codeSnippet: `int low = minAns, high = maxAns, best = high;
while (low <= high) {
    int mid = low + (high - low) / 2;
    if (canFulfill(mid)) {
        best = mid;
        high = mid - 1; // Minimize
    } else {
        low = mid + 1;
    }
}
return best;`,
  },
  {
    id: "rev-linked-lists",
    title: "Linked Lists & Floyd's Cycle Detection",
    topic: "Linked Lists",
    category: "Data Structures",
    rememberPoints: [
      "Provides O(1) insertion/deletion at known pointer locations; O(N) random access.",
      "Always use a Dummy Sentinel Node (`dummy.next = head`) to eliminate edge cases at the head.",
      "Floyd's Cycle Detection: Fast pointer moves 2 steps, Slow pointer moves 1 step; collision proves cycle.",
      "To find cycle entrance: after collision, reset slow to head; advance both 1 step until they meet.",
    ],
    commonMistakes: [
      "Overwriting `curr.next = prev` before storing `curr.next` in a temporary pointer.",
      "Evaluating `fast.next` before checking `fast != null`, causing NullPointerException.",
    ],
    importantPatterns: [
      "In-place Reversal (prev, curr, nextTemp).",
      "Merge Two Sorted Lists (dummy node + zipper merge).",
      "Reverse Nodes in k-Group.",
      "LRU Cache (Doubly Linked List + HashMap).",
    ],
    codeSnippet: `// In-Place Reversal
ListNode prev = null, curr = head;
while (curr != null) {
    ListNode next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
}
return prev;`,
  },
  {
    id: "rev-monotonic-stack",
    title: "Monotonic Stack Pattern",
    topic: "Stacks",
    category: "Problem Solving Patterns",
    rememberPoints: [
      "Maintains elements in strictly increasing or decreasing order to solve Next Greater / Smaller Element in O(N).",
      "Every element is pushed ONCE and popped at most ONCE, ensuring amortized linear O(N) time.",
      "Always store array INDICES in the stack (not raw values) to enable distance and width calculations.",
      "Prefer `ArrayDeque` in Java over legacy synchronized `Stack` class.",
    ],
    commonMistakes: [
      "Pushing values instead of indices, making it impossible to compute width `i - stack.peek() - 1`.",
      "Calling `pop()` or `peek()` without guarding with `!stack.isEmpty()`.",
    ],
    importantPatterns: [
      "Next Greater Element I & II (Circular array using 2N iterations).",
      "Daily Temperatures (Wait days = current index - popped index).",
      "Largest Rectangle in Histogram (Monotonic increasing stack).",
    ],
    codeSnippet: `Deque<Integer> stack = new ArrayDeque<>();
for (int i = 0; i < n; i++) {
    while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
        int popped = stack.pop();
        nge[popped] = arr[i];
    }
    stack.push(i);
}`,
  },
  {
    id: "rev-monotonic-queue",
    title: "Monotonic Deque & Circular Buffers",
    topic: "Queues",
    category: "Data Structures",
    rememberPoints: [
      "Queue enforces First-In, First-Out (FIFO); Deque allows O(1) push and pop at both ends.",
      "Monotonic Decreasing Deque maintains candidate maximums for Sliding Window Maximum in O(N) time.",
      "When a larger element arrives, pop all smaller elements from the back of the deque.",
      "Evict elements from the front when their index slides outside the window `[i - k + 1 .. i]`.",
    ],
    commonMistakes: [
      "Using `LinkedList` instead of `ArrayDeque` in Java (24 bytes extra memory per node).",
      "Failing to evict elements that have slid out of the active window from the front.",
    ],
    importantPatterns: [
      "Sliding Window Maximum.",
      "Shortest Subarray with Sum at Least K (Monotonic queue with prefix sums).",
      "Design Circular Queue (Modulo index arithmetic).",
    ],
    codeSnippet: `// Sliding Window Maximum
Deque<Integer> dq = new ArrayDeque<>();
for (int i = 0; i < n; i++) {
    if (!dq.isEmpty() && dq.peekFirst() < i - k + 1) dq.pollFirst();
    while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i]) dq.pollLast();
    dq.offerLast(i);
    if (i >= k - 1) result[ri++] = nums[dq.peekFirst()];
}`,
  },
  {
    id: "rev-hashing",
    title: "Hashing, Collisions & Load Factors",
    topic: "Hashing",
    category: "Data Structures",
    rememberPoints: [
      "Maps arbitrary keys to table indices via deterministic hash functions in O(1) average time.",
      "Separate Chaining: linked lists / Red-Black trees in buckets. Open Addressing: probing in flat array.",
      "Load factor threshold (typically 0.75) triggers array doubling and complete re-hashing.",
      "In Java 8+, long chains (>= 8 nodes) convert to Red-Black trees for O(log N) worst-case protection.",
    ],
    commonMistakes: [
      "Mutating an object while using it as a HashMap key (changes hash code, corrupting lookup).",
      "Using `HashMap<Character, Integer>` instead of `int[26]` for lowercase alphabet frequencies.",
      "Assuming HashMap iteration order is deterministic (use `LinkedHashMap` for insertion order).",
    ],
    importantPatterns: [
      "Group Anagrams (Sorted string or frequency string as map key).",
      "Longest Consecutive Sequence in O(N) using HashSet lookup.",
      "Subarray Sum Equals K (Prefix sum frequency map).",
    ],
    codeSnippet: `// Fixed-Alphabet Frequency Array: 10x faster than HashMap!
int[] freq = new int[26];
for (char c : s.toCharArray()) freq[c - 'a']++;`,
  },
  {
    id: "rev-binary-trees",
    title: "Binary Trees, Traversals & LCA",
    topic: "Trees",
    category: "Data Structures",
    rememberPoints: [
      "Traversals: Pre-Order (Root-L-R), In-Order (L-Root-R), Post-Order (L-R-Root), Level-Order (BFS).",
      "Always freeze `int levelSize = queue.size()` before processing a BFS level.",
      "Lowest Common Ancestor (LCA) is the unique divergence node where `left != null && right != null`.",
      "Diameter of a tree is the longest path between any two nodes; does not necessarily pass through the root.",
    ],
    commonMistakes: [
      "Assuming tree diameter always passes through the root.",
      "Evaluating `queue.size()` dynamically inside the BFS for loop.",
    ],
    importantPatterns: [
      "Binary Tree Maximum Path Sum (Post-order bottom-up aggregation).",
      "Serialize and Deserialize Binary Tree (Pre-order DFS with null markers).",
      "Lowest Common Ancestor of a Binary Tree.",
    ],
    codeSnippet: `// Lowest Common Ancestor (LCA)
public TreeNode lca(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode l = lca(root.left, p, q), r = lca(root.right, p, q);
    if (l != null && r != null) return root;
    return l != null ? l : r;
}`,
  },
  {
    id: "rev-bst",
    title: "Binary Search Trees (BST) Invariants",
    topic: "Trees",
    category: "Data Structures",
    rememberPoints: [
      "BST Invariant: all nodes in left subtree < root.val < all nodes in right subtree.",
      "In-Order Traversal of a BST produces a STRICTLY INCREASING sorted sequence.",
      "Validate BST using inherited range bounds `(min, max)` rather than checking only immediate children.",
      "In a BST, LCA is the first node where values `p` and `q` split across the current node.",
    ],
    commonMistakes: [
      "Checking only immediate children: `node.left.val < node.val && node.right.val > node.val` (fails on deep descendants).",
      "Using `Integer.MIN_VALUE` and `Integer.MAX_VALUE` as int bounds (fails when tree contains these exact values).",
    ],
    importantPatterns: [
      "Validate Binary Search Tree (pass `long min, long max`).",
      "Kth Smallest Element in a BST (in-order iterative traversal).",
      "Lowest Common Ancestor of a BST (O(H) search without extra memory).",
    ],
    codeSnippet: `// BST Validation with Long Bounds
boolean valid(TreeNode n, long min, long max) {
    if (n == null) return true;
    if (n.val <= min || n.val >= max) return false;
    return valid(n.left, min, n.val) && valid(n.right, n.val, max);
}`,
  },
  {
    id: "rev-heap",
    title: "Heap, Priority Queue & Two Heaps",
    topic: "Heaps",
    category: "Data Structures",
    rememberPoints: [
      "Array representation of complete binary tree: parent = (i - 1)/2, left = 2i + 1, right = 2i + 2.",
      "Building a heap in-place takes linear O(N) time via bottom-up sift-downs.",
      "To find K LARGEST elements, maintain a MIN-HEAP of size K in O(N log K) time.",
      "Two Heaps Pattern: Max-Heap for lower half, Min-Heap for upper half; gives running median in O(1).",
    ],
    commonMistakes: [
      "Using a Max-Heap for Top-K largest elements (wastes O(N) memory instead of O(K)).",
      "Mutating elements inside a PriorityQueue without re-inserting (corrupts heap ordering).",
    ],
    importantPatterns: [
      "Find Median from Data Stream (Two Heaps).",
      "Merge K Sorted Lists (Min-Heap of size K).",
      "Top K Frequent Elements.",
    ],
    codeSnippet: `// Top-K Largest: Use Min-Heap of size K
PriorityQueue<Integer> pq = new PriorityQueue<>();
for (int x : nums) {
    pq.offer(x);
    if (pq.size() > k) pq.poll();
}
return pq.peek();`,
  },
  {
    id: "rev-graphs",
    title: "Graph Traversals & Cycle Detection",
    topic: "Graphs",
    category: "Algorithms",
    rememberPoints: [
      "Represent graphs with Adjacency Lists: O(V + E) memory.",
      "BFS guarantees shortest path in unweighted graphs using a FIFO queue.",
      "Directed Cycle Detection requires 3 colors: White (unvisited), Gray (active on recursion stack), Black (finished).",
      "Undirected Cycle Detection: cycle exists if DFS reaches a visited neighbor that is NOT the parent.",
    ],
    commonMistakes: [
      "Traversing a graph without a `visited` array (causes infinite loops on cycles).",
      "Applying Dijkstra's algorithm to graphs with negative edge weights.",
    ],
    importantPatterns: [
      "Number of Islands (Grid BFS/DFS).",
      "Word Ladder (BFS level-by-level shortest transformation).",
      "Course Schedule I & II (Cycle detection in DAG).",
    ],
    codeSnippet: `// 3-Color Directed Cycle Detection
boolean dfs(int u, int[] color, List<List<Integer>> adj) {
    color[u] = 1; // Gray (active)
    for (int v : adj.get(u)) {
        if (color[v] == 1) return true; // Cycle detected!
        if (color[v] == 0 && dfs(v, color, adj)) return true;
    }
    color[u] = 2; // Black (done)
    return false;
}`,
  },
  {
    id: "rev-topological-sort",
    title: "Topological Sort & Dependency Resolution",
    topic: "Graphs",
    category: "Algorithms",
    rememberPoints: [
      "Topological sort linearizes vertices of a Directed Acyclic Graph (DAG) such that for every u -> v, u appears before v.",
      "Kahn's Algorithm: calculate in-degrees; push inDegree 0 nodes to queue; decrement neighbor in-degrees on poll.",
      "If processed vertex count < total vertices V, the graph contains a cycle!",
      "DFS Post-Order: push vertices to a stack on backtrack; reverse of finish times is the topological order.",
    ],
    commonMistakes: [
      "Attempting topological sort on an undirected or cyclic graph.",
      "Forgetting to verify if all courses/tasks were processed to detect cycles.",
    ],
    importantPatterns: [
      "Course Schedule I & II.",
      "Alien Dictionary (Deriving alphabet order from sorted words).",
      "Build system dependency graphs (Bazel, Make).",
    ],
    codeSnippet: `// Kahn's Algorithm
Queue<Integer> q = new ArrayDeque<>();
for (int i = 0; i < V; i++) if (inDegree[i] == 0) q.offer(i);
int count = 0;
while (!q.isEmpty()) {
    int u = q.poll(); count++;
    for (int v : adj.get(u)) if (--inDegree[v] == 0) q.offer(v);
}
return count == V; // true if no cycle`,
  },
  {
    id: "rev-dijkstra-dsu",
    title: "Dijkstra & Disjoint Set Union (DSU)",
    topic: "Graphs",
    category: "Algorithms",
    rememberPoints: [
      "Dijkstra's Algorithm finds single-source shortest paths with non-negative weights in O((V + E) log V).",
      "Disjoint Set Union (DSU) tracks connected components dynamically in O(α(N)) near-constant time.",
      "DSU requires two optimizations: Path Compression in `find()` and Union by Rank/Size in `union()`.",
      "Kruskal's Minimum Spanning Tree: sort edges by weight and merge components using DSU.",
    ],
    commonMistakes: [
      "Omitting path compression (`parent[i] = find(parent[i])`), causing DSU to degrade to O(N).",
      "Re-processing longer paths in Dijkstra without checking `if (dist > minDistance[u]) continue;`.",
    ],
    importantPatterns: [
      "Network Delay Time (Dijkstra with PriorityQueue).",
      "Redundant Connection (Cycle detection using DSU).",
      "Number of Connected Components in an Undirected Graph.",
    ],
    codeSnippet: `// Disjoint Set Union with Path Compression
int find(int i) {
    if (parent[i] == i) return i;
    return parent[i] = find(parent[i]); // Path compression!
}
boolean union(int i, int j) {
    int rootI = find(i), rootJ = find(j);
    if (rootI == rootJ) return false; // Cycle!
    parent[rootI] = rootJ;
    return true;
}`,
  },
  {
    id: "rev-dynamic-programming",
    title: "Dynamic Programming & Space Optimization",
    topic: "Dynamic Programming",
    category: "Algorithms",
    rememberPoints: [
      "DP applies when problems exhibit Overlapping Subproblems and Optimal Substructure.",
      "4-Step Framework: State Definition, Recurrence Relation, Base Cases, Iteration Order.",
      "In 0/1 Knapsack 1D space optimization, iterate capacity BACKWARDS from W down to weight.",
      "Longest Increasing Subsequence (LIS) can be solved in O(N log N) using patience sorting + binary search.",
    ],
    commonMistakes: [
      "Iterating forwards in 1D array for 0/1 Knapsack (accidentally reuses items, turning it into Unbounded Knapsack).",
      "Failing to memoize all state dimensions in top-down recursion.",
    ],
    importantPatterns: [
      "0/1 Knapsack & Unbounded Knapsack.",
      "Longest Common Subsequence & Edit Distance (2D grid DP).",
      "Coin Change (Minimum coins to make amount).",
    ],
    codeSnippet: `// 0/1 Knapsack 1D Space Optimization
int[] dp = new int[W + 1];
for (int i = 0; i < n; i++) {
    for (int w = W; w >= weights[i]; w--) {
        dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
    }
}`,
  },
  {
    id: "rev-bit-manipulation",
    title: "Bit Manipulation & Binary Arithmetic",
    topic: "Bit Manipulation",
    category: "DSA Fundamentals",
    rememberPoints: [
      "`n & (n - 1)` clears the lowest set bit in O(1) (Brian Kernighan's algorithm).",
      "`n & (-n)` isolates the lowest set bit using Two's Complement.",
      "XOR properties: `x ^ x = 0`, `x ^ 0 = x`, associative and commutative.",
      "Check power of two: `(n > 0) && ((n & (n - 1)) == 0)`.",
      "A 32-bit integer bitmask represents presence/absence of up to 32 items in O(1) space.",
    ],
    commonMistakes: [
      "Operator precedence: `==` has higher precedence than `&`! Write `if ((n & 1) == 0)`.",
      "32-bit integer overflow during left shifts: use `1L << 35` for shifts beyond 31 bits.",
    ],
    importantPatterns: [
      "Single Number I & II (XOR cancellation).",
      "Counting Bits (Kernighan's or DP: `dp[i] = dp[i >> 1] + (i & 1)`).",
      "Bitmask DP (Traveling Salesperson / Subsets).",
    ],
    codeSnippet: `// Kernighan's Count Set Bits
int count = 0;
while (n != 0) {
    n &= (n - 1); // Clears lowest set bit
    count++;
}`,
  },
  {
    id: "rev-google-interview-rubric",
    title: "Google SWE Interview Evaluation Rubric",
    topic: "Interview Strategy",
    category: "Placement Readiness",
    rememberPoints: [
      "Google evaluates 4 distinct dimensions: 1. Algorithms & Data Structures; 2. Coding Craft; 3. Communication & Clarification; 4. Systematic Verification.",
      "Never write code immediately: spend first 3-5 minutes clarifying edge cases, constraints, and scope.",
      "State Brute Force first, identify the computational bottleneck, then derive the optimal invariant.",
      "Dry run your code on a non-trivial example trace table BEFORE telling the interviewer you are done.",
      "Expect Google Scale Follow-Ups: 'What if data exceeds RAM (N = 10^12)?', 'What if streaming?'",
    ],
    commonMistakes: [
      "Jumping directly into coding without verbal alignment on proposed approach and Big-O bounds.",
      "Writing 'hacky' code with magic numbers or monolithic 80-line functions instead of modular helpers.",
      "Failing to test edge cases: empty input, single element, negative numbers, duplicates, integer overflow.",
    ],
    importantPatterns: [
      "Phase 1: Clarification & Edge Cases (5 mins).",
      "Phase 2: High-Level Approach & Complexity Alignment (5 mins).",
      "Phase 3: Clean Modular Coding (20 mins).",
      "Phase 4: Systematic Dry Run & Boundary Walkthrough (10 mins).",
      "Phase 5: Scale & Distributed Follow-Ups (5 mins).",
    ],
    codeSnippet: `// The 5-Step Interview Execution Protocol:
// 1. Clarify: Input scale N, duplicates, memory limits
// 2. Propose: State Big-O time and auxiliary space
// 3. Agree: Confirm interviewer approves approach
// 4. Implement: Clean, typed, modular code with guards
// 5. Verify: Step-by-step dry run on custom edge case`,
  },
];
