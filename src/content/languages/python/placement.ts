import { Lesson } from "@/types/content";

export const pythonPlacementLessons: Lesson[] = [
  {
    id: "python-collections-module",
    slug: "collections-module",
    title: "collections: Counter, defaultdict & deque",
    track: "python",
    topicSlug: "placement",
    topicTitle: "Placement-Focused Python",
    order: 21,
    estimatedMinutes: 30,
    oneSentence:
      "The `collections` module provides high-performance container data types including `Counter` for multiset frequencies, `defaultdict` for missing key handling, and `deque` for O(1) double-ended queues.",
    whyDoWeNeedIt: {
      problem:
        "Writing boilerplate `if k not in d: d[k] = []` or using `list.pop(0)` causes slow execution and cluttered code in graph and BFS problems.",
      realWorldAnalogy:
        "Specialized tradesman tools: instead of using a standard kitchen knife for everything, you have an electric wire stripper (`Counter`), an auto-filling inventory bin (`defaultdict`), and a dual-end conveyor belt (`deque`).",
    },
    visualIntuition: `Collections Trio in Placement Rounds:
1. Counter:
   Counter("banana") --> {'a': 3, 'n': 2, 'b': 1}
   c.most_common(1)  --> [('a', 3)]

2. defaultdict(list):
   adj = defaultdict(list)
   adj[u].append(v)  # No KeyError! Automatically initializes [] if u is new!

3. deque (Double-Ended Queue):
   dq.append(x)      # O(1) Push Right
   dq.appendleft(x)  # O(1) Push Left
   dq.pop()          # O(1) Pop Right
   dq.popleft()      # O(1) Pop Left (Gold standard for BFS!)`,
    syntax: {
      counter: "from collections import Counter\nc = Counter(arr)\ntop2 = c.most_common(2)",
      defaultdict: "from collections import defaultdict\ngraph = defaultdict(list)",
      deque: "from collections import deque\nq = deque([start])\nq.popleft()",
    },
    example: {
      title: "Using Counter for anagrams, defaultdict for graph adjacency, and deque for BFS",
      language: "python",
      code: `from collections import Counter, defaultdict, deque

# 1. Counter: 1-line Anagram Check
def is_anagram(s: str, t: str) -> bool:
    return Counter(s) == Counter(t)

print("Is 'listen' anagram of 'silent'?", is_anagram("listen", "silent"))

# 2. defaultdict: Adjacency List for Directed Graph
edges = [("A", "B"), ("A", "C"), ("B", "D"), ("C", "D")]
graph = defaultdict(list)
for u, v in edges:
    graph[u].append(v)

print("Graph adjacency:", dict(graph))

# 3. deque: Breadth-First Search (BFS) Traversal
def bfs(start_node):
    visited = {start_node}
    queue = deque([start_node])
    order = []

    while queue:
        curr = queue.popleft() # O(1) pop from front!
        order.append(curr)

        for neighbor in graph[curr]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return order

print("BFS Order from A:", bfs("A"))`,
      explanation:
        "`Counter` counts frequencies in $O(N)$ time. `defaultdict(list)` creates an empty list automatically whenever an unseen key is accessed. `deque.popleft()` runs in $O(1)$ time, making it mandatory for BFS.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Counter Subclassing",
        description: "`Counter` inherits from `dict` and overrides `__missing__` to return 0 for non-existent keys.",
      },
      {
        step: 2,
        title: "Default Factory Invocation",
        description: "When a key is missing, `defaultdict` calls the callable `default_factory` provided at initialization (e.g. `list()`, `int()`, `set()`) and inserts the result.",
      },
      {
        step: 3,
        title: "Deque Doubly-Linked Block Architecture",
        description: "CPython's `deque` is implemented as a doubly-linked list of 64-element fixed-size memory blocks, avoiding memory shifts.",
      },
    ],
    commonMistakes: [
      {
        mistake: "from collections import deque; q = deque(); q.pop(0)",
        why: "`deque` has no `pop(0)`. The method to pop from the left in $O(1)$ is `popleft()`.",
        correct: "q.popleft()",
      },
      {
        mistake: "using defaultdict when checking if key exists: if d[k]: ...",
        why: "Referencing `d[k]` automatically creates and inserts `k` into the dictionary! Use `if k in d:` for non-mutating checks.",
        correct: "if k in d: ...",
      },
    ],
    complexity: {
      time: "Counter creation: O(N) | defaultdict access: O(1) | deque popleft/appendleft: O(1)",
      space: "O(N) elements stored",
      explanation: "Constant-time operations guaranteed at boundaries.",
    },
    tryItYourself: {
      prompt: "How can you use `collections.Counter` to find the character with the maximum frequency in a string `s` in one line?",
      hint: "Look at `c.most_common(1)`.",
      solutionSnippet: "Counter(s).most_common(1)[0][0]  # Returns (char, count)[0][0] -> char",
    },
    placementConnection:
      "`collections.defaultdict` and `collections.deque` are used in over 60% of all medium and hard Graph/Tree interview problems.",
    quickRevision: [
      "`Counter(iterable)` counts frequencies; non-existent keys return 0.",
      "`defaultdict(factory)` auto-initializes missing keys without `KeyError`.",
      "`deque` provides $O(1)$ `popleft()` and `appendleft()`; always use it for BFS.",
      "Never use `list.pop(0)` for queue operations.",
    ],
  },
  {
    id: "python-heapq",
    slug: "heapq",
    title: "heapq: Min-Heaps, Max-Heaps & Top-K Patterns",
    track: "python",
    topicSlug: "placement",
    topicTitle: "Placement-Focused Python",
    order: 22,
    estimatedMinutes: 30,
    oneSentence:
      "The `heapq` module provides binary min-heap algorithms directly over standard Python lists, offering O(1) access to the minimum element and O(log N) pushes and pops.",
    whyDoWeNeedIt: {
      problem:
        "Sorting an entire array of size $N$ repeatedly takes $O(N \log N)$. When processing streaming data or finding the Top $K$ elements, a heap solves the problem in $O(N \log K)$ time.",
      realWorldAnalogy:
        "A leader board that tracks only the Top 3 players in a tournament with 10,000 contestants: you only need to know who the 3rd place cutoff is, not the ranking of all 10,000 players.",
    },
    visualIntuition: `heapq Min-Heap Property:
heap[0] is ALWAYS the smallest element in O(1) time!

heap = [2, 5, 8, 12, 9] (Binary tree layout in array)
         [ 2 ]  <-- heap[0]
        /     \\
     [ 5 ]    [ 8 ]
     /   \\
  [ 12 ]  [ 9 ]

Creating Max-Heap in Python:
Multiply values by -1 when pushing!
-90 is smaller than -10 in min-heap, so 90 pops first!`,
    syntax: {
      minHeap: "import heapq\nheapq.heapify(arr) # O(N) in-place\nheapq.heappush(arr, val)\nmin_val = heapq.heappop(arr)",
      maxHeap: "heapq.heappush(max_h, -val)\nmax_val = -heapq.heappop(max_h)",
    },
    example: {
      title: "Min-heap, Max-heap simulation, and finding Kth largest element",
      language: "python",
      code: `import heapq

# 1. In-place O(N) heapify
nums = [9, 3, 1, 7, 5, 2]
heapq.heapify(nums)  # Mutates nums into a valid binary min-heap
print("Heapified:", nums)
print("Smallest element (O(1)):", nums[0])

# 2. Finding K-th Largest Element using size-K min-heap
def find_kth_largest(stream, k):
    min_heap = []
    for x in stream:
        heapq.heappush(min_heap, x)
        if len(min_heap) > k:
            heapq.heappop(min_heap) # Discard smallest among candidate top K
    return min_heap[0]

stream = [3, 2, 1, 5, 6, 4]
k = 2
print(f"{k}nd Largest:", find_kth_largest(stream, k))

# 3. Max-Heap Pattern using negative numbers
max_heap = []
for val in [10, 50, 20, 40]:
    heapq.heappush(max_heap, -val)

print("Popping largest elements in order:")
while max_heap:
    largest = -heapq.heappop(max_heap)
    print(largest, end=" ")
print()`,
      explanation:
        "`heapq.heapify(nums)` runs in $O(N)$ linear time. `min_heap[0]` inspects the smallest item in $O(1)$. To simulate a Max-Heap, store negated numbers `-val`.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Floyd's Linear Heapify",
        description: "`heapify()` applies down-heap sift-down operations starting from parent nodes ($\lfloor N/2 \\rfloor$) up to root in linear $O(N)$ time.",
      },
      {
        step: 2,
        title: "Logarithmic Push & Pop",
        description: "`heappush` appends to the list and sifts up in $O(\log N)$; `heappop` replaces root with the last element and sifts down.",
      },
      {
        step: 3,
        title: "Combined Push-Pop Optimization",
        description: "`heapq.heappushpop(h, x)` and `heapq.heapreplace(h, x)` perform both operations in a single pass without extra allocations.",
      },
    ],
    commonMistakes: [
      {
        mistake: "h = heapq.heapify(arr) // Expecting heapify to return a new heap",
        why: "`heapify()` mutates `arr` in-place and returns `None`!",
        correct: "heapq.heapify(arr); # arr is now a heap",
      },
      {
        mistake: "Pushing custom objects into heapq without __lt__",
        why: "When elements have matching priorities (like `(priority, task)`), Python attempts to compare the tasks directly. If `task` does not implement `__lt__`, it crashes with `TypeError`.",
        correct: "Push `(priority, count, task)` where `count` is a unique tie-breaker integer, or implement `__lt__` on the class.",
      },
    ],
    complexity: {
      time: "O(1) peek (heap[0]), O(log N) push/pop, O(N) heapify",
      space: "O(N) contiguous list memory",
      explanation: "Heap depth is log2(N), guaranteeing logarithmic mutation bounds.",
    },
    tryItYourself: {
      prompt: "What does `heapq.nlargest(k, iterable)` do, and when should you use it?",
      hint: "It finds the top K largest elements without manually managing a heap loop.",
      solutionSnippet: "It returns a list of the K largest elements. It is ideal for small values of K because it optimizes internally using a bounded min-heap in O(N log K) time.",
    },
    placementConnection:
      "Dijkstra's Algorithm, Merge K Sorted Lists, Top K Frequent Elements, and Meeting Rooms II all require `heapq` in Python.",
    quickRevision: [
      "Python `heapq` is strictly a Min-Heap; `heap[0]` is always the minimum.",
      "`heapq.heapify(list)` transforms an array into a heap in $O(N)$ in-place time.",
      "Simulate Max-Heaps by negating numbers: push `-x`, pop `-heappop()`.",
      "Use `heappushpop()` or `heapreplace()` for fast streaming window updates.",
    ],
  },
  {
    id: "python-bisect",
    slug: "bisect",
    title: "bisect: Binary Search on Sorted Sequences",
    track: "python",
    topicSlug: "placement",
    topicTitle: "Placement-Focused Python",
    order: 23,
    estimatedMinutes: 25,
    oneSentence:
      "The `bisect` module implements binary search algorithms to find insertion insertion points (`bisect_left`, `bisect_right`) and insert elements in sorted order in O(log N) time.",
    whyDoWeNeedIt: {
      problem:
        "Writing custom binary search loops often introduces off-by-one errors with `<=` vs `<` and `mid + 1` vs `mid`. The `bisect` module provides battle-tested, bug-free binary search primitives.",
      realWorldAnalogy:
        "Filing a new folder alphabetically into an existing physical file drawer: you locate the exact insertion slot in seconds without reading every folder.",
    },
    visualIntuition: `bisect_left vs bisect_right on Sorted Array:
arr = [ 10,  20,  20,  20,  30,  40 ]
Index:   0    1    2    3    4    5

Search target = 20:
bisect_left(arr, 20):  Returns Index 1 (First index where 20 can be placed without violating sorted order)
bisect_right(arr, 20): Returns Index 4 (First index strictly AFTER all existing 20s)

Occurrences of 20 = bisect_right - bisect_left = 4 - 1 = 3!`,
    syntax: {
      search: "import bisect\nidx_left = bisect.bisect_left(arr, target)\nidx_right = bisect.bisect_right(arr, target)",
      insert: "bisect.insort(arr, val) # Binary search + insertion",
    },
    example: {
      title: "Binary search, counting duplicate occurrences, and range queries with bisect",
      language: "python",
      code: `import bisect

sorted_scores = [35, 60, 75, 75, 75, 90, 98]

# 1. Finding lower and upper bounds
target = 75
low_idx = bisect.bisect_left(sorted_scores, target)
high_idx = bisect.bisect_right(sorted_scores, target)

print(f"Target {target}:")
print(f"First occurrence (bisect_left): index {low_idx}")
print(f"After last occurrence (bisect_right): index {high_idx}")
print(f"Total count of {target}: {high_idx - low_idx}")

# 2. Grade mapping using bisect
def grade(score, breakpoints=[60, 70, 80, 90], grades='FDCBA'):
    # bisect returns which bracket the score falls into
    idx = bisect.bisect_right(breakpoints, score)
    return grades[idx]

print("Grade for 85:", grade(85)) # B
print("Grade for 58:", grade(58)) # F

# 3. In Python 3.10+, bisect supports custom key extraction!
students = [("Aarav", 70), ("Diya", 85), ("Rohan", 95)]
pos = bisect.bisect_left(students, 85, key=lambda s: s[1])
print(f"Student with score >= 85 found at index {pos}: {students[pos]}")`,
      explanation:
        "`bisect_left` finds the first index $\ge$ target. `bisect_right` (alias `bisect`) finds the first index $>$ target. In Python 3.10+, `key=` allows binary searching on lists of tuples or objects without unzipping.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Bisection Halving",
        description: "Maintains `lo` and `hi` pointers; compares `mid = (lo + hi) // 2` with target, halving search space on each step.",
      },
      {
        step: 2,
        title: "Boundary Convergence",
        description: "Terminates when `lo == hi`, returning the exact insertion index.",
      },
      {
        step: 3,
        title: "Insort Shift Cost",
        description: "`bisect.insort(arr, x)` finds the index in $O(\log N)$, but list insertion shifts elements in $O(N)$ time.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using bisect on an unsorted list",
        why: "Binary search fundamentally relies on sorted order. Calling bisect on unsorted data produces meaningless indices without warning.",
        correct: "Ensure `arr.sort()` before calling bisect.",
      },
      {
        mistake: "Assuming bisect_left confirms element presence",
        why: "`bisect_left` returns the insertion index even if the element is absent.",
        correct: "if idx < len(arr) and arr[idx] == target: # Target exists!",
      },
    ],
    complexity: {
      time: "O(log N) for bisect_left / bisect_right; O(N) for insort (due to list shift)",
      space: "O(1) auxiliary space",
      explanation: "Pure logarithmic search.",
    },
    tryItYourself: {
      prompt: "How can you check if an exact integer `x` exists in a sorted list `nums` using `bisect_left`?",
      hint: "What conditions must the returned index satisfy?",
      solutionSnippet: `idx = bisect.bisect_left(nums, x)
exists = idx < len(nums) and nums[idx] == x`,
    },
    placementConnection:
      "Russian Doll Envelopes, Longest Increasing Subsequence ($O(N \log N)$ patience sorting), and capacity planning search problems rely directly on `bisect`.",
    quickRevision: [
      "Input lists MUST be sorted prior to using `bisect`.",
      "`bisect_left` returns the first position where `val >= target`.",
      "`bisect_right` returns the first position where `val > target`.",
      "Number of occurrences of `x` in a sorted array is `bisect_right(arr, x) - bisect_left(arr, x)`.",
    ],
  },
  {
    id: "python-recursion-memo",
    slug: "recursion-memo",
    title: "Recursion Limits & @functools.lru_cache",
    track: "python",
    topicSlug: "placement",
    topicTitle: "Placement-Focused Python",
    order: 24,
    estimatedMinutes: 30,
    oneSentence:
      "Python enforces a default recursion depth limit of 1000 to prevent C-stack overflows, and `@functools.lru_cache` transforms exponential recursive solutions into polynomial dynamic programming via automatic memoization.",
    whyDoWeNeedIt: {
      problem:
        "Deep tree/graph traversals ($N = 10^5$) crash with `RecursionError: maximum recursion depth exceeded`. In dynamic programming, unmemoized recursion recalculates identical subproblems exponentially ($O(2^N)$).",
      realWorldAnalogy:
        "A student solving math problems who keeps a cheat sheet of previous answers: instead of recalculating $Fibonacci(20)$ from scratch 10,000 times, they look up the memoized answer in a split second.",
    },
    visualIntuition: `Exponential Recursion Tree vs Memoization:
Unmemoized fib(5) (31 function calls - O(2^N)):
            fib(5)
           /      \\
       fib(4)      fib(3)
       /    \\      /    \\
    fib(3) fib(2) fib(2) fib(1) ...

With @lru_cache(None) (Only 5 calls - O(N)):
fib(1) -> computed & cached
fib(2) -> computed & cached
fib(3) -> computed & cached
fib(4) -> computed & cached
fib(5) -> returns in O(1) from cache!`,
    syntax: {
      recursionLimit: "import sys\nsys.setrecursionlimit(200000)",
      lruCache: "from functools import lru_cache\n@lru_cache(maxsize=None)\ndef dp(i, j): ...",
    },
    example: {
      title: "Increasing recursion limits and solving 0/1 Knapsack with @lru_cache",
      language: "python",
      code: `import sys
from functools import lru_cache

# 1. Increase recursion limit for deep recursion / tree DFS
sys.setrecursionlimit(200000)

# 2. 0/1 Knapsack Problem with automatic memoization
weights = [1, 3, 4, 5]
values = [1, 4, 5, 7]
capacity = 7

@lru_cache(maxsize=None) # Unbounded memoization cache
def knapsack(idx: int, rem_capacity: int) -> int:
    # Base cases
    if idx == len(weights) or rem_capacity == 0:
        return 0

    # Option 1: Skip current item
    max_val = knapsack(idx + 1, rem_capacity)

    # Option 2: Take current item (if capacity allows)
    if weights[idx] <= rem_capacity:
        take_val = values[idx] + knapsack(idx + 1, rem_capacity - weights[idx])
        max_val = max(max_val, take_val)

    return max_val

print("Maximum Knapsack Value:", knapsack(0, capacity))
print("Cache Information:", knapsack.cache_info())`,
      explanation:
        "`@lru_cache(maxsize=None)` intercepts function calls, hashes the arguments `(idx, rem_capacity)`, and returns the stored result on cache hits. `cache_info()` reveals hits and misses.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Call Interception",
        description: "The decorator wraps the function in a closure that hashes the argument tuple `args`.",
      },
      {
        step: 2,
        title: "Dictionary Cache Lookup",
        description: "If `args` is found in the internal hash table, the cached return value is returned immediately in $O(1)$ time.",
      },
      {
        step: 3,
        title: "Result Caching",
        description: "On cache miss, the actual function body runs, and the result is stored in the cache dictionary.",
      },
    ],
    commonMistakes: [
      {
        mistake: "@lru_cache on functions with mutable arguments like lists or sets",
        why: "Cache keys must be hashable. Passing a list raises `TypeError: unhashable type: 'list'`.",
        correct: "Convert lists to tuples before passing them into memoized functions: `tuple(arr)`.",
      },
      {
        mistake: "Forgetting sys.setrecursionlimit in deep DFS graph problems",
        why: "Python will crash with `RecursionError` if tree/graph depth exceeds 1000.",
        correct: "Call `sys.setrecursionlimit(200000)` at the beginning of your solution script.",
      },
    ],
    complexity: {
      time: "Reduces exponential O(2^N) recursion to polynomial O(N * M) states",
      space: "O(States) cache memory + O(Recursion Depth) stack memory",
      explanation: "Each distinct argument state is computed exactly once.",
    },
    tryItYourself: {
      prompt: "How can you clear the cache of an `@lru_cache` decorated function between test cases?",
      hint: "Look at the helper methods added to the decorated function.",
      solutionSnippet: "my_function.cache_clear()  # Resets the cache dictionary and statistics",
    },
    placementConnection:
      "Using `@lru_cache(None)` allows writing top-down Dynamic Programming in 10 lines of code during fast-paced interview rounds, saving 20 minutes compared to bottom-up table initialization.",
    quickRevision: [
      "Default recursion limit in Python is 1000; increase it via `sys.setrecursionlimit(200000)`.",
      "`@functools.lru_cache(maxsize=None)` provides instant top-down DP memoization.",
      "All arguments passed to an `@lru_cache` function must be hashable (immutable).",
      "Inspect performance with `func.cache_info()` and reset via `func.cache_clear()`.",
    ],
  },
  {
    id: "python-complexity-cheatsheet",
    slug: "complexity-cheatsheet",
    title: "Python Big-O Complexity Cheatsheet",
    track: "python",
    topicSlug: "placement",
    topicTitle: "Placement-Focused Python",
    order: 25,
    estimatedMinutes: 20,
    oneSentence:
      "Understanding the exact Big-O time and space costs of Python built-in operations prevents accidental quadratic slowdowns in coding assessments.",
    whyDoWeNeedIt: {
      problem:
        "Assuming `x in list` or `list.pop(0)` is $O(1)$ leads to disastrous $O(N^2)$ algorithm designs that fail online test cases with Time Limit Exceeded.",
      realWorldAnalogy:
        "Knowing the fuel efficiency of different transport vehicles: choosing an eighteen-wheeler truck for a single envelope delivery is wasteful and slow.",
    },
    visualIntuition: `Python Operations Big-O Cheat Sheet:
Operation                     | list      | deque     | set / dict
------------------------------+-----------+-----------+------------
Access by index (arr[i])      | O(1)      | O(N)      | N/A
Append to end                 | O(1) avg  | O(1)      | N/A
Pop from end                  | O(1)      | O(1)      | N/A
Insert/Pop at index 0 (Front) | O(N) SLOW | O(1) FAST | N/A
Membership check ('x in C')   | O(N) SLOW | O(N) SLOW | O(1) avg FAST
Sort                          | O(N log N)| N/A       | N/A`,
    syntax: {
      fastChecks: "# Fast O(1) membership:\nseen = set()\nif x in seen: ...",
      fastQueue: "# Fast O(1) front pop:\nq = deque()\nx = q.popleft()",
    },
    example: {
      title: "Measuring time disparity: list vs deque and list vs set",
      language: "python",
      code: `import time
from collections import deque

n = 50000

# 1. Pop from front: list vs deque
lst = list(range(n))
dq = deque(range(n))

# Measure list.pop(0) - O(N) each -> O(N^2) total
t0 = time.perf_counter()
for _ in range(1000):
    lst.pop(0)
t_list = time.perf_counter() - t0

# Measure deque.popleft() - O(1) each -> O(K) total
t0 = time.perf_counter()
for _ in range(1000):
    dq.popleft()
t_deque = time.perf_counter() - t0

print(f"list.pop(0) x 1000:   {t_list * 1000:.3f} ms")
print(f"deque.popleft() x 1000: {t_deque * 1000:.3f} ms")
print(f"Deque is {t_list / max(t_deque, 1e-9):.1f}x faster!\\n")

# 2. Membership check: list vs set
lookup_target = n - 1
large_list = list(range(n))
large_set = set(range(n))

t0 = time.perf_counter()
for _ in range(1000):
    _ = lookup_target in large_list  # O(N) linear scan
t_in_list = time.perf_counter() - t0

t0 = time.perf_counter()
for _ in range(1000):
    _ = lookup_target in large_set   # O(1) hash lookup
t_in_set = time.perf_counter() - t0

print(f"'in list' x 1000: {t_in_list * 1000:.3f} ms")
print(f"'in set' x 1000:  {t_in_set * 1000:.3f} ms")
print(f"Set lookup is {t_in_list / max(t_in_set, 1e-9):.1f}x faster!")`,
      explanation:
        "The benchmark demonstrates why choosing the correct container is critical: `deque.popleft()` and `set` membership checks are orders of magnitude faster than naive list operations.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Memory Block Shift Overhead",
        description: "Removing from the front of a list triggers a `memmove` C standard library call shifting all subsequent pointers.",
      },
      {
        step: 2,
        title: "Hash Lookup Invariants",
        description: "Sets and dictionaries jump straight to the calculated hash bucket index, bypassing sequential element comparison.",
      },
      {
        step: 3,
        title: "Timsort Adaptivity",
        description: "Python's `sorted()` operates in $O(N)$ when data is already partially sorted, and $O(N \log N)$ worst case.",
      },
    ],
    commonMistakes: [
      {
        mistake: "while len(lst) > 0: x = lst.pop(0) // Creating accidental O(N^2) loop",
        why: "Repeated `pop(0)` turns an $O(N)$ traversal into $O(N^2)$.",
        correct: "Use `collections.deque` and `popleft()`.",
      },
      {
        mistake: "if x in list_of_100k_items: // Repeated membership check in a loop",
        why: "Searching an element in a list requires scanning every item from index 0 to $N-1$ in $O(N)$ time.",
        correct: "Convert the collection to a `set` once, then check `x in my_set` in $O(1)$.",
      },
    ],
    complexity: {
      time: "Summary of Python complexity profiles",
      space: "Sets/Dicts use ~2-3x more memory than lists due to hash bucket tables",
      explanation: "Space-time tradeoff: hash tables sacrifice a modest amount of memory for instant constant-time lookups.",
    },
    tryItYourself: {
      prompt: "What is the time complexity of `len(my_list)` and `len(my_set)` in Python?",
      hint: "Does Python count the elements on every `len()` call, or read a stored field?",
      solutionSnippet: "Both are strictly O(1)! Python objects store their length in the `ob_size` field of the PyObject header, so `len()` is an instant attribute lookup.",
    },
    placementConnection:
      "Interviewers constantly ask candidates to justify their time and space complexity choices when using Python built-in operations.",
    quickRevision: [
      "`arr.append()` and `arr.pop()` are $O(1)$; `arr.insert(0, x)` and `arr.pop(0)` are $O(N)$.",
      "`x in my_set` is $O(1)$ average; `x in my_list` is $O(N)$.",
      "`len(container)` is always $O(1)$ for all built-in types.",
      "String concatenation with `+=` inside loops is $O(N^2)$; use `''.join()` for $O(N)$.",
    ],
  },
];
