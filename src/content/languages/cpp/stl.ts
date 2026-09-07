import { Lesson } from "@/types/content";

export const cppStlLessons: Lesson[] = [
  {
    id: "cpp-vector",
    slug: "vector",
    title: "std::vector: Dynamic Arrays & Memory Growth",
    track: "cpp",
    topicSlug: "stl",
    topicTitle: "Standard Template Library (STL)",
    order: 18,
    estimatedMinutes: 30,
    oneSentence:
      "`std::vector` is a contiguous dynamic array container that automatically doubles its heap capacity upon reaching saturation, providing amortized O(1) appends.",
    whyDoWeNeedIt: {
      problem:
        "C-style static arrays require sizing at compile-time and cannot grow when the data volume increases dynamically during program execution.",
      realWorldAnalogy:
        "A concert stadium section where staff proactively double the number of reserved rows whenever the existing section fills up.",
    },
    visualIntuition: `std::vector Internal Layout:
Stack Object (24 bytes on 64-bit):
[ _M_start ] ---------> Heap: [ 10 ][ 20 ][ 30 ][   ][   ][   ]
[ _M_finish ] --------------------------------> | (size = 3)
[ _M_end_of_storage ] -----------------------------------------> | (capacity = 6)

Growth Factor (Typically 2x in GCC/Clang, 1.5x in MSVC):
Size = 3, Cap = 4. Adding 2 elements:
1. Allocates new heap array of cap = 8
2. Moves existing 3 elements to new buffer
3. Deletes old buffer
4. Inserts new elements`,
    syntax: {
      initialization: "vector<int> v;\nvector<int> v(n, 0); // Size n initialized with 0\nvector<int> v = {1, 2, 3};",
      methods: "v.push_back(val);\nv.emplace_back(val);\nv.pop_back();\nv.reserve(1000);",
    },
    example: {
      title: "Vector operations, capacity management, and emplace_back",
      language: "cpp",
      code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> nums;
    // Reserve upfront to prevent repeated reallocation overhead
    nums.reserve(5);

    std::cout << "Initial size: " << nums.size() << ", capacity: " << nums.capacity() << "\\n";

    for (int i = 1; i <= 5; i++) {
        nums.push_back(i * 10);
    }

    std::cout << "Size: " << nums.size() << ", Capacity: " << nums.capacity() << "\\n";

    // Direct O(1) element access
    std::cout << "First: " << nums.front() << ", Last: " << nums.back() << "\\n";
    std::cout << "Element at index 2: " << nums[2] << "\\n";

    // Safe access with bounds checking
    try {
        std::cout << nums.at(10) << "\\n"; // Throws std::out_of_range
    } catch (const std::out_of_range& e) {
        std::cout << "Caught out_of_range exception safely!\\n";
    }

    return 0;
}`,
      explanation:
        "`reserve(n)` preallocates heap memory without changing `size()`. `nums[i]` does direct unchecked indexing, while `nums.at(i)` performs bounds checking and throws `std::out_of_range` on violation.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Capacity Saturation",
        description: "When `size == capacity` during `push_back`, the vector initiates reallocation.",
      },
      {
        step: 2,
        title: "Exponential Doubling",
        description: "It allocates a new heap array of size `2 * capacity`, moves existing elements, and frees the old heap buffer.",
      },
      {
        step: 3,
        title: "Amortized Analysis",
        description: "Although single reallocations take $O(N)$ copying time, spreading the cost across $N$ insertions yields an amortized $O(1)$ per append.",
      },
    ],
    commonMistakes: [
      {
        mistake: "vector<int> v; v[0] = 10; // Indexing an empty vector",
        why: "`[]` does not allocate space; it performs unchecked direct memory dereference causing Segmentation Fault.",
        correct: "v.push_back(10); // Or vector<int> v(1); v[0] = 10;",
      },
      {
        mistake: "Using insert(v.begin(), val) repeatedly in a loop",
        why: "Inserting at the beginning shifts all subsequent elements rightward, yielding quadratic $O(N^2)$ running time.",
        correct: "Use `std::deque` or insert at end and call `std::reverse`.",
      },
    ],
    complexity: {
      time: "O(1) amortized push_back, O(1) random access, O(N) insert/erase in middle",
      space: "O(N) contiguous memory",
      explanation: "Contiguous layout ensures cache locality and hardware prefetching efficiency.",
    },
    tryItYourself: {
      prompt: "What is the difference between `v.resize(10)` and `v.reserve(10)`?",
      hint: "One changes `size()` and inserts default elements; the other only changes `capacity()`.",
      solutionSnippet: "`resize(10)` changes the size to 10 and default-constructs elements. `reserve(10)` only pre-allocates memory capacity for 10 elements without creating any elements.",
    },
    placementConnection:
      "`std::vector` is the default container used in 95% of LeetCode and online assessment coding problems.",
    quickRevision: [
      "`std::vector` stores elements in contiguous heap memory with $O(1)$ random access.",
      "`push_back()` is amortized $O(1)$; use `reserve()` when the final size is known in advance.",
      "`nums[i]` is fast and unchecked; `nums.at(i)` validates bounds and throws exceptions on violation.",
      "Iterators are invalidated whenever a reallocation occurs.",
    ],
  },
  {
    id: "cpp-pairs-tuples",
    slug: "pairs-tuples",
    title: "std::pair, std::tuple & Structured Bindings",
    track: "cpp",
    topicSlug: "stl",
    topicTitle: "Standard Template Library (STL)",
    order: 19,
    estimatedMinutes: 20,
    oneSentence:
      "`std::pair` and `std::tuple` bundle heterogeneous values together into a single unit, and C++17 structured bindings allow unpacking them cleanly.",
    whyDoWeNeedIt: {
      problem:
        "Functions often need to return multiple values (e.g. minimum and maximum element, or graph edge weight and destination), but creating a dedicated `struct` for every small pair is verbose.",
      realWorldAnalogy:
        "A postal package containing two distinct items (a book and a pen): they travel together under one shipping label.",
    },
    visualIntuition: `std::pair and std::tuple:
pair<string, int> p = {"Alice", 95};
[ "Alice" (first) ][ 95 (second) ]

tuple<int, string, double> t = {101, "Bob", 8.9};
std::get<0>(t) -> 101
std::get<1>(t) -> "Bob"
std::get<2>(t) -> 8.9

Structured Bindings (C++17):
auto [roll, name, cgpa] = t; // Clean unpack!`,
    syntax: {
      pairUsage: "pair<int, int> p = {10, 20};\nint u = p.first, v = p.second;",
      structuredBinding: "auto [a, b] = p;",
    },
    example: {
      title: "Using pairs, tuples, tie, and C++17 structured bindings",
      language: "cpp",
      code: `#include <iostream>
#include <string>
#include <tuple>
#include <utility>
#include <vector>

std::tuple<int, int, double> getStats(const std::vector<int>& arr) {
    int minVal = arr[0], maxVal = arr[0], sum = 0;
    for (int x : arr) {
        if (x < minVal) minVal = x;
        if (x > maxVal) maxVal = x;
        sum += x;
    }
    double avg = static_cast<double>(sum) / arr.size();
    return {minVal, maxVal, avg};
}

int main() {
    // 1. std::pair
    std::pair<std::string, int> player = {"Virat", 18};
    std::cout << player.first << " wears #" << player.second << "\\n";

    // 2. Structured bindings with std::tuple (C++17)
    std::vector<int> scores = {80, 95, 70, 100, 85};
    auto [minScore, maxScore, avgScore] = getStats(scores);

    std::cout << "Min: " << minScore << ", Max: " << maxScore << ", Avg: " << avgScore << "\\n";

    return 0;
}`,
      explanation:
        "`std::pair` has members `.first` and `.second`. `std::tuple` holds arbitrary types. C++17 structured bindings `auto [a, b, c] = tuple;` unpacks elements directly without verbose `std::get<0>` calls.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Template Layout",
        description: "`std::pair<T1, T2>` stores `first` and `second` as adjacent members inside a templated struct.",
      },
      {
        step: 2,
        title: "Comparison Semantics",
        description: "Pairs are compared lexicographically: first comparing `.first`, and if equal, breaking ties by `.second`.",
      },
      {
        step: 3,
        title: "Structured Binding Unpacking",
        description: "The compiler introduces hidden alias references to each member variable in the tuple or pair.",
      },
    ],
    commonMistakes: [
      {
        mistake: "std::get<i>(t) where i is a variable",
        why: "`std::get<N>` requires `N` to be a compile-time constant integer.",
        correct: "Use constant index `std::get<0>(t)` or structured bindings `auto [a, b] = t`.",
      },
    ],
    complexity: {
      time: "O(1) creation and member access",
      space: "O(1) memory footprint",
      explanation: "Compiles down to standard struct field offset lookups.",
    },
    tryItYourself: {
      prompt: "How does `std::vector<std::pair<int, int>>` sort by default?",
      hint: "Does it sort by the first element or both?",
      solutionSnippet: "It sorts ascending by `.first`. If two elements have equal `.first`, it breaks ties by sorting ascending by `.second`.",
    },
    placementConnection:
      "Pairs are heavily used in graph algorithms (e.g. Dijkstra's priority queue holding `{distance, node}`) and coordinate geometry problems.",
    quickRevision: [
      "`std::pair` stores two values accessed via `.first` and `.second`.",
      "`std::tuple` stores any fixed number of heterogeneous values.",
      "C++17 structured bindings (`auto [x, y] = p;`) provide clean unpacking.",
      "Pairs sort lexicographically: first by `.first`, then by `.second`.",
    ],
  },
  {
    id: "cpp-stack-queue-deque",
    slug: "stack-queue-deque",
    title: "std::stack, std::queue & std::deque",
    track: "cpp",
    topicSlug: "stl",
    topicTitle: "Standard Template Library (STL)",
    order: 20,
    estimatedMinutes: 25,
    oneSentence:
      "`std::stack` provides LIFO access, `std::queue` provides FIFO access, and `std::deque` is a double-ended queue supporting O(1) push and pop from both ends.",
    whyDoWeNeedIt: {
      problem:
        "Algorithms like Tree/Graph BFS require strict First-In-First-Out (FIFO) processing, while parsing and DFS require Last-In-First-Out (LIFO) order.",
      realWorldAnalogy:
        "Stack: A stack of cafeteria plates (take from top, add to top). Queue: A ticket line (join at rear, served at front). Deque: A deck of cards where you can draw or insert from both the top and bottom.",
    },
    visualIntuition: `Container Adapter Mechanics:
Stack (LIFO):
Push/Pop only at Top:
  | [ 30 ] | <- top() / push() / pop()
  | [ 20 ] |
  | [ 10 ] |
  +--------+

Queue (FIFO):
Push at Back, Pop at Front:
In -> [ 30 ][ 20 ][ 10 ] -> Out (pop / front)

Deque (Double-Ended):
Front Push/Pop <---> [ C1 ][ C2 ][ C3 ] <---> Back Push/Pop`,
    syntax: {
      stack: "stack<int> s;\ns.push(10);\ns.pop();\nint t = s.top();",
      queue: "queue<int> q;\nq.push(10);\nq.pop();\nint f = q.front();",
      deque: "deque<int> dq;\ndq.push_front(1);\ndq.push_back(2);\ndq.pop_front();",
    },
    example: {
      title: "Demonstrating stack and queue operations",
      language: "cpp",
      code: `#include <iostream>
#include <queue>
#include <stack>

int main() {
    // 1. Stack: LIFO
    std::stack<int> st;
    st.push(10);
    st.push(20);
    st.push(30);

    std::cout << "Stack top: " << st.top() << "\\n"; // 30
    st.pop();
    std::cout << "After pop, stack top: " << st.top() << "\\n"; // 20

    // 2. Queue: FIFO
    std::queue<std::string> q;
    q.push("First");
    q.push("Second");
    q.push("Third");

    std::cout << "Queue front: " << q.front() << "\\n"; // First
    q.pop();
    std::cout << "After pop, queue front: " << q.front() << "\\n"; // Second

    return 0;
}`,
      explanation:
        "`st.top()` reads without removing; `st.pop()` returns `void` and removes the element. In `queue`, `front()` reads the oldest item and `back()` reads the newest.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Container Adapters",
        description: "`std::stack` and `std::queue` are not direct containers; they are adapters that wrap `std::deque` by default.",
      },
      {
        step: 2,
        title: "Underlying Deque Architecture",
        description: "`std::deque` allocates multiple fixed-size memory chunks connected via a central map of chunk pointers, avoiding full-array reallocations.",
      },
      {
        step: 3,
        title: "Pop Semantics",
        description: "Neither `stack::pop()` nor `queue::pop()` returns the removed value (to ensure exception safety). You must read `top()` or `front()` first.",
      },
    ],
    commonMistakes: [
      {
        mistake: "int val = st.pop(); // Assuming pop returns the removed value",
        why: "In C++ STL, `pop()` has a `void` return type for exception safety reasons.",
        correct: "int val = st.top(); st.pop();",
      },
      {
        mistake: "Calling top() or front() on an empty container",
        why: "Calling `top()` on an empty stack results in Undefined Behavior (usually a crash).",
        correct: "if (!st.empty()) { int x = st.top(); }",
      },
    ],
    complexity: {
      time: "O(1) push, pop, top, front, and empty checks",
      space: "O(N) elements stored",
      explanation: "Constant-time operations guaranteed at boundaries.",
    },
    tryItYourself: {
      prompt: "Why does `std::stack::pop()` return `void` instead of returning the popped element?",
      hint: "What happens if returning the object by value throws a copy-constructor exception after the element is already destroyed?",
      solutionSnippet: "It ensures exception safety: if returning by value failed due to an exception during copying, the popped element would be permanently lost.",
    },
    placementConnection:
      "Stack is the core structure for Monotonic Stack problems (Next Greater Element, Largest Rectangle in Histogram) and Queue is essential for BFS level-order traversals.",
    quickRevision: [
      "`std::stack` is LIFO (`push`, `pop`, `top`, `empty`).",
      "`std::queue` is FIFO (`push`, `pop`, `front`, `back`).",
      "Always check `!container.empty()` before calling `top()` or `front()`.",
      "`pop()` returns `void`; always inspect the value before popping.",
    ],
  },
  {
    id: "cpp-priority-queue",
    slug: "priority-queue",
    title: "std::priority_queue: Max-Heap & Min-Heap",
    track: "cpp",
    topicSlug: "stl",
    topicTitle: "Standard Template Library (STL)",
    order: 21,
    estimatedMinutes: 30,
    oneSentence:
      "`std::priority_queue` is a binary heap container adapter providing O(1) access to the highest-priority element and O(log N) insertion and deletion.",
    whyDoWeNeedIt: {
      problem:
        "Maintaining a completely sorted array after every insertion takes $O(N)$ time. A priority queue maintains only the extremum (max or min) at the root in $O(\log N)$ time.",
      realWorldAnalogy:
        "A hospital emergency triage room: patients are treated based on condition severity rather than their arrival order.",
    },
    visualIntuition: `Binary Heap Representation:
Max-Heap (Default in C++):
         [ 90 ]
        /      \\
     [ 70 ]    [ 80 ]
     /    \\
  [ 20 ]  [ 50 ]

Min-Heap (via std::greater<T>):
         [ 10 ]
        /      \\
     [ 30 ]    [ 20 ]

top() -> Always root element in O(1)
push() -> Adds at bottom, sifts up in O(log N)
pop()  -> Removes root, replaces with last, sifts down in O(log N)`,
    syntax: {
      maxHeap: "priority_queue<int> maxH;",
      minHeap: "priority_queue<int, vector<int>, greater<int>> minH;",
    },
    example: {
      title: "Max-heap, min-heap, and finding Kth Largest Element",
      language: "cpp",
      code: `#include <iostream>
#include <queue>
#include <vector>

int findKthLargest(const std::vector<int>& nums, int k) {
    // Min-heap maintaining the top K largest elements
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;

    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > static_cast<size_t>(k)) {
            minHeap.pop(); // Remove smallest among candidate K elements
        }
    }
    return minHeap.top();
}

int main() {
    // 1. Default Max-Heap
    std::priority_queue<int> maxH;
    maxH.push(10);
    maxH.push(30);
    maxH.push(20);

    std::cout << "Max-heap top: " << maxH.top() << "\\n"; // 30

    // 2. Kth Largest using Min-Heap
    std::vector<int> stream = {3, 2, 1, 5, 6, 4};
    int k = 2;
    std::cout << k << "nd largest element: " << findKthLargest(stream, k) << "\\n"; // 5

    return 0;
}`,
      explanation:
        "By default, `std::priority_queue<int>` produces a Max-Heap. Supplying `vector<int>` as the container and `greater<int>` as the comparator yields a Min-Heap. Maintaining a heap of size $K$ finds the $K$-th largest element in $O(N \log K)$ time.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Underlying Array Heapification",
        description: "The elements are stored contiguously in a `std::vector`, mapped as binary tree nodes: node $i$ has children at $2i+1$ and $2i+2$.",
      },
      {
        step: 2,
        title: "Up-Heap (Percolate Up)",
        description: "Upon `push()`, the new value is appended to the vector and swapped upward with parent nodes until the heap invariant is restored.",
      },
      {
        step: 3,
        title: "Down-Heap (Percolate Down)",
        description: "Upon `pop()`, the root is replaced with the back element, popped from the vector, and sifted down to its valid level.",
      },
    ],
    commonMistakes: [
      {
        mistake: "priority_queue<int, greater<int>> pq; // Missing container parameter",
        why: "To specify a custom comparator like `greater<int>`, you must also supply the underlying container type as the second template argument.",
        correct: "priority_queue<int, vector<int>, greater<int>> pq;",
      },
    ],
    complexity: {
      time: "O(1) top(), O(log N) push() and pop()",
      space: "O(N) contiguous heap memory",
      explanation: "Heap depth is bounded by log2(N), guaranteeing logarithmic insertion and deletion.",
    },
    tryItYourself: {
      prompt: "How can you build a heap from an unsorted vector in O(N) time instead of pushing one by one in O(N log N)?",
      hint: "Think about the priority_queue constructor that accepts iterators.",
      solutionSnippet: "`priority_queue<int> pq(v.begin(), v.end());` builds the heap using the linear-time Floyd's heapify algorithm in O(N) time.",
    },
    placementConnection:
      "Dijkstra's Shortest Path, Top K Frequent Elements, Merge K Sorted Lists, and Task Scheduler all fundamentally rely on `std::priority_queue`.",
    quickRevision: [
      "`std::priority_queue<T>` is a Max-Heap by default.",
      "Syntax for Min-Heap: `priority_queue<T, vector<T>, greater<T>>`.",
      "`top()` is $O(1)$; `push()` and `pop()` are $O(\log N)$.",
      "Constructing a priority queue directly from a vector runs in $O(N)$ time via bottom-up heapification.",
    ],
  },
  {
    id: "cpp-set-map",
    slug: "set-map",
    title: "Ordered vs Unordered Containers (Set & Map)",
    track: "cpp",
    topicSlug: "stl",
    topicTitle: "Standard Template Library (STL)",
    order: 22,
    estimatedMinutes: 30,
    oneSentence:
      "`std::map`/`std::set` are self-balancing Red-Black Trees guaranteeing O(log N) operations in sorted order, while `unordered_map`/`unordered_set` use hash tables for O(1) average operations.",
    whyDoWeNeedIt: {
      problem:
        "Searching for keys in an unsorted array requires an expensive $O(N)$ linear scan. We need fast key lookups, frequency counting, and ordered range queries.",
      realWorldAnalogy:
        "`std::map` is an alphabetically organized library card index (always sorted, binary search in $O(\log N)$). `std::unordered_map` is a locker room with numbered cubbies determined by a hash formula ($O(1)$ direct access).",
    },
    visualIntuition: `Ordered vs Unordered Internals:
std::map (Red-Black Tree):
         [ 20: "B" ]
        /           \\
   [ 10: "A" ]     [ 30: "C" ]
Guarantees sorted traversal: "A", "B", "C"
Lookup/Insert/Delete: O(log N) worst-case

std::unordered_map (Hash Table with Chaining):
Bucket [0] -> empty
Bucket [1] -> [ 10: "A" ] -> nullptr
Bucket [2] -> [ 20: "B" ] -> [ 30: "C" ]
Lookup/Insert/Delete: O(1) average (O(N) worst-case under hash collisions)`,
    syntax: {
      ordered: "map<string, int> m;\nm[\"apple\"] = 3;\nset<int> s = {3, 1, 4};",
      unordered: "unordered_map<string, int> um;\nunordered_set<int> us;",
    },
    example: {
      title: "Comparing std::map vs std::unordered_map operations",
      language: "cpp",
      code: `#include <iostream>
#include <map>
#include <string>
#include <unordered_map>

int main() {
    // 1. Unordered Map: Fast O(1) average lookups
    std::unordered_map<std::string, int> freq;
    std::string text = "apple banana apple orange banana apple";
    
    // Counting frequencies
    freq["apple"]++;
    freq["banana"]++;
    freq["apple"]++;

    std::cout << "Frequency of apple: " << freq["apple"] << "\\n";

    // Checking key existence without accidental insertion
    if (freq.find("orange") != freq.end()) {
        std::cout << "Found orange!\\n";
    } else {
        std::cout << "Orange not found in map\\n";
    }

    // 2. Ordered Map: Sorted by key automatically
    std::map<int, std::string> students;
    students[103] = "Charlie";
    students[101] = "Alice";
    students[102] = "Bob";

    std::cout << "\\nStudents in sorted roll order:\\n";
    for (const auto& [roll, name] : students) {
        std::cout << roll << " -> " << name << "\\n";
    }

    return 0;
}`,
      explanation:
        "`freq[\"apple\"]++` automatically default-constructs an entry with value 0 if the key is not present. Iterating through `std::map` always visits keys in strictly sorted order.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Tree Invariant (std::map)",
        description: "`std::map` maintains height balance via tree rotations, guaranteeing maximum height $\\le 2 \\log_2(N+1)$.",
      },
      {
        step: 2,
        title: "Hash Function (std::unordered_map)",
        description: "`unordered_map` computes `std::hash<Key>()`, maps the hash to a bucket via modulo bucket count, and resolves collisions using linked lists.",
      },
      {
        step: 3,
        title: "Subscript Operator Side Effect",
        description: "`m[key]` inserts a default-initialized value if `key` does not exist. Use `m.find(key)` or `m.count(key)` for read-only checks.",
      },
    ],
    commonMistakes: [
      {
        mistake: "if (m[key] == 0) // Testing for absence with [] operator",
        why: "`m[key]` secretly inserts `key` into the map with value 0, modifying the container size!",
        correct: "if (m.find(key) == m.end()) // Proper membership test",
      },
      {
        mistake: "Using unordered_map with pair<int, int> as key without custom hash",
        why: "C++ standard library does not provide a default `std::hash` specialization for `std::pair`. Code will fail to compile.",
        correct: "Use `std::map<pair<int, int>, int>` or write a custom hash functor.",
      },
    ],
    complexity: {
      time: "map: O(log N) all operations | unordered_map: O(1) avg, O(N) worst-case",
      space: "O(N) node pointers and buckets",
      explanation: "Tree nodes incur pointer overhead (parent, left, right, color bit).",
    },
    tryItYourself: {
      prompt: "When would you strictly prefer `std::map` over `std::unordered_map` in an interview?",
      hint: "Think about range queries or finding the closest element greater than or equal to a target.",
      solutionSnippet: "Use `std::map` when you need sorted keys, in-order traversal, or range queries using `.lower_bound()` and `.upper_bound()`.",
    },
    placementConnection:
      "Understanding the hash collision vulnerability in `unordered_map` (which malicious tests exploit in Codeforces) and knowing when to use `std::map` is a frequent interview differentiator.",
    quickRevision: [
      "`std::map` and `std::set` are Red-Black Trees with $O(\log N)$ guaranteed time.",
      "`unordered_map` and `unordered_set` use Hash Tables with $O(1)$ average time.",
      "`m[key]` inserts a default value if `key` is missing; use `m.find(key)` to check existence safely.",
      "`std::map` provides `.lower_bound()` and `.upper_bound()` member methods.",
    ],
  },
  {
    id: "cpp-algorithms",
    slug: "algorithms",
    title: "STL Algorithms: sort, binary_search & bounds",
    track: "cpp",
    topicSlug: "stl",
    topicTitle: "Standard Template Library (STL)",
    order: 23,
    estimatedMinutes: 30,
    oneSentence:
      "`<algorithm>` provides heavily-optimized generic routines including IntroSort (`std::sort`), logarithmic searches (`lower_bound`, `upper_bound`), and container mutations.",
    whyDoWeNeedIt: {
      problem:
        "Writing custom sorting or binary search routines from scratch takes time and frequently leads to subtle off-by-one errors and infinite loops.",
      realWorldAnalogy:
        "Using a high-performance industrial power saw instead of trying to carve every wooden plank by hand with a pocketknife.",
    },
    visualIntuition: `Binary Search Ranges:
Sorted Array: [ 10,  20,  20,  20,  30,  40 ]
                     ^              ^
                lower_bound(20)  upper_bound(20)
                (First >= 20)    (First > 20)

Count of occurrences of 20 = upper_bound - lower_bound = 4 - 1 = 3!`,
    syntax: {
      sort: "sort(v.begin(), v.end());\nsort(v.begin(), v.end(), greater<int>());",
      binarySearch: "bool found = binary_search(v.begin(), v.end(), target);\nauto it = lower_bound(v.begin(), v.end(), target);",
    },
    example: {
      title: "Sorting with custom lambdas and binary search bounds",
      language: "cpp",
      code: `#include <algorithm>
#include <iostream>
#include <vector>

struct Interval {
    int start, end;
};

int main() {
    // 1. std::sort with custom lambda comparator
    std::vector<Interval> intervals = {{1, 4}, {2, 3}, {1, 2}, {5, 8}};

    std::sort(intervals.begin(), intervals.end(), [](const Interval& a, const Interval& b) {
        if (a.start != b.start) return a.start < b.start;
        return a.end < b.end;
    });

    std::cout << "Sorted Intervals:\\n";
    for (const auto& in : intervals) {
        std::cout << "[" << in.start << ", " << in.end << "] ";
    }
    std::cout << "\\n\\n";

    // 2. lower_bound and upper_bound on sorted vector
    std::vector<int> nums = {10, 20, 20, 20, 30, 40};

    auto low = std::lower_bound(nums.begin(), nums.end(), 20);
    auto up = std::upper_bound(nums.begin(), nums.end(), 20);

    std::cout << "First element >= 20 at index: " << (low - nums.begin()) << "\\n"; // 1
    std::cout << "First element > 20 at index: " << (up - nums.begin()) << "\\n";  // 4
    std::cout << "Total occurrences of 20: " << (up - low) << "\\n";              // 3

    return 0;
}`,
      explanation:
        "`std::sort` uses IntroSort (hybrid of QuickSort, HeapSort, and InsertionSort) running in $O(N \log N)$ worst-case. `lower_bound` finds the first element $\\ge$ target; `upper_bound` finds the first element $>$ target.",
    },
    howItWorks: [
      {
        step: 1,
        title: "IntroSort Strategy",
        description: "Starts with QuickSort; if recursion depth exceeds $2 \\log N$, it switches to HeapSort to guarantee $O(N \\log N)$ worst-case; uses InsertionSort for small arrays ($N \\le 16$).",
      },
      {
        step: 2,
        title: "Strict Weak Ordering",
        description: "Comparators must return `true` if $a < b$, and `false` if $a == b$ or $a > b$. Returning `true` for equal values triggers segmentation faults in `std::sort`!",
      },
      {
        step: 3,
        title: "Binary Search Prerequisite",
        description: "`binary_search`, `lower_bound`, and `upper_bound` require the range to be sorted in advance. Calling them on unsorted ranges results in undefined logic.",
      },
    ],
    commonMistakes: [
      {
        mistake: "auto comp = [](int a, int b) { return a <= b; }; // Using <= in sort comparator",
        why: "C++ requires Strict Weak Ordering (`<`). Returning `true` for `a == b` violates the asymmetry requirement and leads to out-of-bounds crashes during partitioning.",
        correct: "return a < b; // Always strictly less than!",
      },
      {
        mistake: "lower_bound(set.begin(), set.end(), val) // Calling global algorithm on std::set",
        why: "Global `std::lower_bound` on bidirectional iterators takes $O(N)$ time. Always use the member function `set.lower_bound(val)` which runs in $O(\log N)$ time.",
        correct: "s.lower_bound(val);",
      },
    ],
    complexity: {
      time: "O(N log N) sort, O(log N) lower/upper bound, O(N) reverse/min_element",
      space: "O(log N) stack space for IntroSort recursion",
      explanation: "IntroSort bounds stack depth to avoid worst-case recursion limits.",
    },
    tryItYourself: {
      prompt: "What does `std::lower_bound` return if all elements in the vector are strictly smaller than the search target?",
      hint: "What iterator represents the past-the-end position?",
      solutionSnippet: "It returns `v.end()`. Always verify `it != v.end()` before dereferencing the returned iterator.",
    },
    placementConnection:
      "80% of greedy and binary search placement interview questions require using `std::sort`, custom lambda comparators, and `std::lower_bound`.",
    quickRevision: [
      "`std::sort` runs in $O(N \log N)$ worst-case using IntroSort.",
      "Comparators MUST follow Strict Weak Ordering (`<`), never `<=`. Always return `false` for equal elements.",
      "`lower_bound(x)` returns iterator to first element $\ge x$; `upper_bound(x)` returns first element $> x$.",
      "For `std::set` and `std::map`, always call their member methods (`s.lower_bound(x)`) for $O(\log N)$ performance.",
    ],
  },
];
