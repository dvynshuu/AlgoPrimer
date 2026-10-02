import { Lesson } from "@/types/content";

export const linearStructuresLessons: Lesson[] = [
  {
    id: "dsa-hashing-lesson",
    slug: "hashing",
    title: "Hashing & Hash Tables: Collision Resolution, Load Factors & Internals",
    track: "dsa",
    topicSlug: "hashing",
    topicTitle: "Hashing & Hash Tables",
    order: 6,
    estimatedMinutes: 45,
    oneSentence:
      "A hash table maps arbitrary keys to bounded array indices via a deterministic hash function, enabling O(1) average-case insertion, deletion, and lookup when collisions are efficiently managed.",
    whyDoWeNeedIt: {
      problem:
        "Searching an unsorted array takes O(N) time; searching a sorted array takes O(log N) time. For systems serving millions of queries per second (e.g. Google's URL redirect service, DNS lookups, or user sessions), O(log N) is too slow. Hashing achieves O(1) instant constant-time retrieval by converting keys directly into memory addresses.",
      realWorldAnalogy:
        "A university mail room with 26 labeled mailboxes ('A' to 'Z'). Instead of searching through every student's letter one by one, the clerk looks at the first letter of the recipient's last name ('Smith' -> 'S') and immediately inspects only box 'S'.",
    },
    visualIntuition: `Hash Table Architecture & Collision Resolution:
-------------------------------------------------------------------------
Key ("apple")  --->  [ Hash Function: hashCode("apple") % TableSize ]  ---> Index 3

Table Array (Bucket Array):
Index 0: [ null ]
Index 1: [ null ]
Index 2: [ null ]
Index 3: [ "apple" : $1.20 ]  ---> [ "avocado" : $2.50 ]  (Separate Chaining via Linked List)
Index 4: [ null ]
Index 5: [ "banana" : $0.75 ]

Two Primary Collision Resolution Strategies:
1. Separate Chaining (Java HashMap):
   Each bucket contains a linked list (or balanced Red-Black tree when list length >= 8).
2. Open Addressing (Linear Probing / Robin Hood):
   If bucket 'i' is occupied, probe (i + 1), (i + 2)... in the array itself (Zero pointer chasing, peak CPU cache locality!).

Load Factor = Number of Items (N) / Total Buckets (M).
When Load Factor exceeds 0.75, table automatically doubles in size and re-hashes all keys!`,
    syntax: {
      hashTableOperations: `// Standard HashMap / HashSet Complexity:
// Operation         Average Case     Worst Case (All collisions)
// Insertion         O(1)             O(N) (or O(log N) with Red-Black tree)
// Lookup            O(1)             O(N)
// Deletion          O(1)             O(N)

// Frequency Map Idiom in Java:
Map<Integer, Integer> freq = new HashMap<>();
for (int num : nums) {
    freq.put(num, freq.getOrDefault(num, 0) + 1);
}`,
    },
    example: {
      title: "Subarray Sum Equals K using Prefix Sum & Hash Map",
      language: "java",
      code: `public class SubarraySumEqualsK {
    public static int subarraySum(int[] nums, int k) {
        // Map stores: prefixSum -> frequency of occurrence
        Map<Integer, Integer> prefixMap = new HashMap<>();
        // Base case: prefix sum of 0 has occurred 1 time (empty subarray)
        prefixMap.put(0, 1);

        int currentSum = 0;
        int count = 0;

        for (int num : nums) {
            currentSum += num;

            // If (currentSum - k) exists in map, a valid subarray ends here!
            if (prefixMap.containsKey(currentSum - k)) {
                count += prefixMap.get(currentSum - k);
            }

            prefixMap.put(currentSum, prefixMap.getOrDefault(currentSum, 0) + 1);
        }
        return count;
    }
}`,
      explanation:
        "Instead of checking all O(N^2) subarrays with nested loops, we exploit the algebraic relation: `sum[i..j] = prefixSum[j] - prefixSum[i - 1] = k  =>  prefixSum[i - 1] = prefixSum[j] - k`. By checking whether `prefixSum[j] - k` was previously seen in O(1) time via the HashMap, we solve the problem in a single O(N) pass.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Deterministic Hash Computation",
        description:
          "The key's 32-bit integer hash code is computed and mapped to a bucket index via bitwise masking `index = hash & (capacity - 1)` (which is equivalent to modulo when capacity is a power of 2).",
      },
      {
        step: 2,
        title: "Collision Handling (Chaining vs Open Addressing)",
        description:
          "If multiple keys map to the same index, separate chaining appends the node to a bucket chain. In Java 8+, if a single bucket chain exceeds 8 nodes, it converts into a Red-Black tree to guarantee O(log N) worst-case time.",
      },
      {
        step: 3,
        title: "Load Factor & Amortized Re-hashing",
        description:
          "When the load factor threshold is crossed (e.g. 75% full), the capacity doubles and all elements are re-distributed, maintaining strictly O(1) amortized lookup.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Forgetting the base case (0 -> 1) in prefix sum hash map problems",
        why: "If a subarray starting from index 0 itself sums to k, `currentSum - k == 0`. Without `prefixMap.put(0, 1)`, that subarray is missed.",
        correct:
          "Always initialize prefix sum maps with `prefixMap.put(0, 1)`.",
      },
      {
        mistake: "Mutating an object while using it as a HashMap key",
        why: "If a key's fields mutate, its hashCode changes, making it impossible to locate the bucket where it was originally stored, leaking memory.",
        correct: "Always use immutable types (String, Integer) as hash keys.",
      },
      {
        mistake: "Overlooking boxing/unboxing overhead in tight competitive loops",
        why: "`HashMap<Integer, Integer>` allocates 32 bytes per node on the 64-bit heap. Storing 10^6 primitives in a HashMap consumes ~32MB of RAM and incurs heavy CPU cache misses.",
        correct:
          "Use flat primitive arrays (`int[]`) or specialized primitive maps when key domains are bounded.",
      },
    ],
    complexity: {
      time: "Average: O(1) lookup, insert, delete | Worst: O(N) (all collide)",
      space: "O(N) auxiliary storage for table buckets and nodes",
      explanation:
        "Uniform distribution of hash functions guarantees O(1) average time per operation under constant load factor.",
    },
    tryItYourself: {
      prompt:
        "Given an array of strings, group the anagrams together using a hash map.",
      hint: "What invariant do all anagrams share? Either their sorted character string or a character frequency string (e.g. 'a2b1c0...') is identical. Use that invariant as the HashMap key!",
      solutionSnippet: `Map<String, List<String>> map = new HashMap<>();
for (String s : strs) {
    char[] chars = s.toCharArray();
    Arrays.sort(chars);
    String key = new String(chars);
    map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
}
return new ArrayList<>(map.values());`,
    },
    placementConnection:
      "Hashing is the foundation of high-frequency interview questions: Two Sum, Group Anagrams, Longest Consecutive Sequence, Subarray Sum Equals K, and LRU Cache. Google interviewers will specifically ask: 'How does your language handle hash collisions?' and 'What happens when two distinct keys yield the same hash?'",
    quickRevision: [
      "Hash tables achieve O(1) average time via deterministic hash functions.",
      "Separate Chaining uses linked lists/trees in buckets; Open Addressing probes adjacent slots.",
      "Load factor (N / Capacity) triggers table resizing (typically at 0.75) to prevent collision spikes.",
      "In Java 8+, long bucket chains (>= 8 nodes) convert to Red-Black trees for O(log N) worst-case protection.",
    ],
  },
  {
    id: "dsa-linked-list-lesson",
    slug: "linked-list",
    title: "Linked Lists: Sentinel Nodes, Reversal & Floyd's Cycle Detection",
    track: "dsa",
    topicSlug: "linked-list",
    topicTitle: "Linked Lists",
    order: 7,
    estimatedMinutes: 45,
    oneSentence:
      "A linked list is a sequence of discrete node structures linked by memory pointers, enabling O(1) pointer-based insertions and deletions at known locations without element shifting, at the cost of O(N) sequential traversal.",
    whyDoWeNeedIt: {
      problem:
        "Inserting an item at the beginning of an array of 1,000,000 elements requires shifting all 1,000,000 elements to the right in O(N) time. A linked list inserts at the head in O(1) instant time by simply updating two memory pointers, without allocating a contiguous block of RAM.",
      realWorldAnalogy:
        "A treasure hunt where each clue contains a slip of paper giving the GPS coordinates of the next clue. The clues do not need to be physically next to each other on the same table; you just follow the trail of references.",
    },
    visualIntuition: `Singly Linked List Memory Layout & In-Place Reversal:
-------------------------------------------------------------------------
Node structure: [ Data | Next Pointer ]

Original List:
[ 1 | * ] ---> [ 2 | * ] ---> [ 3 | * ] ---> NULL

In-Place Pointer Reversal Algorithm (3 Pointers: prev, curr, next):
State before loop: prev = NULL, curr = Head (1)

Step 1: Save next: next = curr.next (2)
        Reverse pointer: curr.next = prev (NULL)
        Advance prev: prev = curr (1)
        Advance curr: curr = next (2)

Result after complete traversal:
NULL <--- [ 1 | * ] <--- [ 2 | * ] <--- [ 3 | * ] (prev points to new Head!)

Floyd's Tortoise and Hare Mathematical Proof:
Fast moves 2 steps, Slow moves 1 step.
Relative speed = 2 - 1 = 1 step per iteration.
If a cycle of length C exists, the distance between them decreases by 1 every step,
guaranteeing they MUST collide in at most C iterations without infinite looping!`,
    syntax: {
      nodeDefinition: `// Standard Singly Linked List Node
public class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

// The Sentinel (Dummy) Node Technique:
// Eliminates edge cases when modifying the head node!
ListNode dummy = new ListNode(0);
dummy.next = head;
ListNode curr = dummy;`,
    },
    example: {
      title: "In-Place Linked List Reversal in O(N) Time and O(1) Space",
      language: "java",
      code: `public class LinkedListReversal {
    public static ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode nextTemp = curr.next; // Store next node
            curr.next = prev;              // Reverse directional pointer
            prev = curr;                   // Advance prev
            curr = nextTemp;               // Advance curr
        }
        return prev; // 'prev' is the new head of the reversed list
    }
}`,
      explanation:
        "Notice that we preserve `curr.next` in `nextTemp` before overwriting it. By iterating linearly through the list, every node's pointer is flipped backwards in strictly O(N) time and O(1) auxiliary memory.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Discontinuous Memory Allocation",
        description:
          "Nodes are allocated independently across heap memory. Traversing from node to node requires pointer dereferencing (`curr = curr.next`), which incurs CPU cache misses compared to flat arrays.",
      },
      {
        step: 2,
        title: "Sentinel (Dummy) Node Pattern",
        description:
          "Creating a `dummy` node whose `.next` points to `head` eliminates edge cases when inserting, deleting, or reordering the head node itself, eliminating null checks.",
      },
      {
        step: 3,
        title: "Floyd's Cycle Finding (Tortoise and Hare)",
        description:
          "Advance `slow` by 1 step and `fast` by 2 steps. If they ever become equal, a cycle exists. To find the cycle entrance, reset `slow` to `head` and advance both pointers 1 step at a time; their meeting point is the exact cycle origin.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Losing reference to the rest of the list: curr.next = prev before saving next",
        why: "Overwriting `curr.next` before caching it in a temporary variable orphans the remaining nodes in memory, causing NullPointerException or premature termination.",
        correct:
          "Always cache the forward pointer first: `ListNode next = curr.next; curr.next = prev;`",
      },
      {
        mistake: "Null pointer check order: while (fast.next != null && fast != null)",
        why: "If `fast` is null, evaluating `fast.next` throws a NullPointerException immediately.",
        correct: "Always check `while (fast != null && fast.next != null)`.",
      },
    ],
    complexity: {
      time: "Prepend/Insert after node: O(1) | Search/Access by index: O(N) | Reversal: O(N)",
      space: "O(1) auxiliary memory for pointer manipulation",
      explanation:
        "Linked lists trade off instant O(1) random access in exchange for O(1) insertion/deletion at known pointer locations.",
    },
    tryItYourself: {
      prompt:
        "Find the middle node of a singly linked list in a single pass. If there are two middle nodes, return the second middle node.",
      hint: "Use fast and slow pointers. When fast reaches the end (fast == null || fast.next == null), where will slow be located?",
      solutionSnippet: `ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
}
return slow;`,
    },
    placementConnection:
      "Linked lists are a staple of Google technical interviews: Reverse Nodes in k-Group, Merge k Sorted Lists, LRU Cache (Doubly Linked List + HashMap), Copy List with Random Pointer, and Linked List Cycle II. Interviewers look for flawless pointer mechanics without memory leaks.",
    quickRevision: [
      "Always use a Dummy Sentinel Node (`dummy.next = head`) to simplify edge cases at the head.",
      "In-Place Reversal requires 3 pointers: `prev`, `curr`, `nextTemp`.",
      "Floyd's Tortoise and Hare detects cycles in O(N) time and O(1) space with slow=1, fast=2.",
      "Linked list traversals incur more CPU cache misses than contiguous arrays due to non-contiguous heap pointers.",
    ],
  },
  {
    id: "dsa-stack-lesson",
    slug: "stack",
    title: "Stack Data Structure: LIFO Mechanics & The Monotonic Stack Pattern",
    track: "dsa",
    topicSlug: "stack",
    topicTitle: "Stack Data Structure",
    order: 8,
    estimatedMinutes: 45,
    oneSentence:
      "A stack is a Last-In, First-Out (LIFO) abstract data type that provides O(1) push and pop operations, powering memory call stacks, parenthesis matching, and monotonic range optimizations.",
    whyDoWeNeedIt: {
      problem:
        "Finding the 'Next Greater Element' for every element in an array naively requires looking ahead with nested loops, taking O(N^2) time. A Monotonic Stack maintains elements in strictly increasing or decreasing order, solving the Next Greater Element and Largest Rectangle in Histogram problems in a single linear O(N) pass.",
      realWorldAnalogy:
        "A spring-loaded plate dispenser in a cafeteria. You can only place a clean plate on the very top of the stack (push), and customers can only remove the top plate (pop). The plate placed last is the first one used.",
    },
    visualIntuition: `Monotonic Decreasing Stack for Next Greater Element:
-------------------------------------------------------------------------
Input Array: [ 2,   1,   2,   4,   3 ]
Index:         0    1    2    3    4

Processing Step-by-Step:
i = 0, val = 2: Stack is empty. Push index 0 (val 2). Stack: [ 2 ]
i = 1, val = 1: 1 < 2 (maintains decreasing invariant). Push index 1. Stack: [ 2, 1 ]
i = 2, val = 2:
   2 > top(1)! Element 2 is the NEXT GREATER ELEMENT for index 1!
   Pop index 1 -> NGE[1] = 2.
   Now top is 2. 2 is not > 2. Push index 2. Stack: [ 2, 2 ]
i = 3, val = 4:
   4 > top(2)! Pop index 2 -> NGE[2] = 4.
   4 > top(2)! Pop index 0 -> NGE[0] = 4.
   Stack is empty. Push index 3. Stack: [ 4 ]
i = 4, val = 3: 3 < 4. Push index 4. Stack: [ 4, 3 ]

Every element is pushed ONCE and popped at most ONCE!
Total operations = 2 * N  =>  Strictly O(N) runtime!`,
    syntax: {
      stackMethods: `// Java: Prefer ArrayDeque over legacy Stack (which has synchronized overhead)!
Deque<Integer> stack = new ArrayDeque<>();
stack.push(val);    // O(1) Push onto top
int top = stack.pop(); // O(1) Pop from top
int peek = stack.peek(); // O(1) Inspect top without removing
boolean empty = stack.isEmpty();`,
      monotonicTemplate: `// Monotonic Increasing Stack Template (Finds Next Smaller Element)
Deque<Integer> stack = new ArrayDeque<>();
for (int i = 0; i < n; i++) {
    while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) {
        int poppedIdx = stack.pop();
        // arr[i] is the next smaller element for poppedIdx!
    }
    stack.push(i);
}`,
    },
    example: {
      title: "Valid Parentheses Checker using a Stack",
      language: "java",
      code: `public class ValidParentheses {
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();

        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else {
                // If closing bracket matches nothing or mismatches top:
                if (stack.isEmpty() || stack.pop() != c) {
                    return false;
                }
            }
        }
        return stack.isEmpty(); // Must have closed all opened brackets!
    }
}`,
      explanation:
        "By pushing the EXPECTED closing character whenever an opening bracket is seen, matching becomes a single equality check `stack.pop() != c`. If the stack is empty when a closing character arrives, or non-empty at the end of the string, the parentheses are invalid.",
    },
    howItWorks: [
      {
        step: 1,
        title: "LIFO Ordering Guarantee",
        description:
          "Items are added and removed strictly from one end (the top). In memory, this matches CPU call stack frames where the currently executing function must return before its caller resumes.",
      },
      {
        step: 2,
        title: "Monotonic Invariant Maintenance",
        description:
          "In a monotonic stack, whenever a new element violates the sorted invariant, items are popped until the invariant is restored. The current element acts as the boundary trigger for all popped elements.",
      },
      {
        step: 3,
        title: "Amortized Linear Runtime",
        description:
          "Although there is a while loop inside a for loop, every array index is pushed to the stack exactly once and popped at most once. The total number of stack operations across all N iterations is <= 2N, guaranteeing O(N) runtime.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using java.util.Stack instead of ArrayDeque",
        why: "`java.util.Stack` inherits from `Vector`, meaning every method (`push`, `pop`) is synchronized with thread locks, adding unnecessary CPU locking overhead in single-threaded code.",
        correct: "Use `Deque<Integer> stack = new ArrayDeque<>();`.",
      },
      {
        mistake: "Calling pop() or peek() on an empty stack without isEmpty() check",
        why: "Calling `pop()` on an empty stack throws `NoSuchElementException` or `EmptyStackException`.",
        correct: "Always guard with `!stack.isEmpty()` before calling peek or pop.",
      },
      {
        mistake: "Pushing values instead of indices in Monotonic Stack",
        why: "Pushing raw values prevents you from computing distances (e.g. `i - stack.peek()`), which is required for width calculations in Largest Rectangle in Histogram or Daily Temperatures.",
        correct: "Push array indices to the stack rather than raw element values.",
      },
    ],
    complexity: {
      time: "Push, Pop, Peek: O(1) | Monotonic Stack Pass: O(N)",
      space: "O(N) auxiliary space in the worst case (e.g. strictly monotonic input)",
      explanation:
        "ArrayDeque resizes dynamically with amortized O(1) pushes, backed by a contiguous circular array buffer.",
    },
    tryItYourself: {
      prompt:
        "Given an array of daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the i-th day to get a warmer temperature.",
      hint: "Use a monotonic decreasing stack storing indices. When temperatures[i] > temperatures[stack.peek()], pop and record the day difference i - stack.pop().",
      solutionSnippet: `int[] ans = new int[temperatures.length];
Deque<Integer> stack = new ArrayDeque<>();
for (int i = 0; i < temperatures.length; i++) {
    while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
        int prevDay = stack.pop();
        ans[prevDay] = i - prevDay;
    }
    stack.push(i);
}
return ans;`,
    },
    placementConnection:
      "Monotonic Stack is an elite interview pattern heavily tested at Google: Daily Temperatures, Next Greater Element I & II, Largest Rectangle in Histogram, Maximal Rectangle, and Trapping Rain Water.",
    quickRevision: [
      "Stack enforces Last-In, First-Out (LIFO) with O(1) push, pop, and peek.",
      "Always use `ArrayDeque` in Java rather than the synchronized legacy `Stack` class.",
      "Monotonic Stacks solve 'Next Greater / Smaller Element' in strictly O(N) amortized time.",
      "Store indices rather than values in the stack to enable distance and width computations.",
    ],
  },
  {
    id: "dsa-queue-lesson",
    slug: "queue",
    title: "Queue & Deque: FIFO Processing, Circular Buffers & Monotonic Deques",
    track: "dsa",
    topicSlug: "queue",
    topicTitle: "Queue & Deque",
    order: 9,
    estimatedMinutes: 45,
    oneSentence:
      "A queue is a First-In, First-Out (FIFO) data structure that processes elements in order of arrival, enabling Breadth-First Search (BFS) graph traversals and sliding window extreme queries via double-ended queues (Deques).",
    whyDoWeNeedIt: {
      problem:
        "Finding the maximum value in every sliding window of size K naively takes O(N * K) time. When K = 50,000 and N = 100,000, naive comparison takes 5 * 10^9 operations and times out. A Monotonic Deque maintains candidate maximums in O(1) amortized time per step, dropping total time to O(N).",
      realWorldAnalogy:
        "A queue of passengers waiting at a boarding gate. The passenger who arrived first is inspected and boarded first (FIFO). A Deque is like a train car with doors on both ends: passengers can board or exit from either the front or the back.",
    },
    visualIntuition: `Circular Array Buffer & Monotonic Deque:
-------------------------------------------------------------------------
Circular Array Buffer of Capacity 5:
Head and Tail pointers wrap around using modulo arithmetic:
tail = (tail + 1) % Capacity
head = (head + 1) % Capacity

Monotonic Decreasing Deque for Sliding Window Maximum (K = 3):
Array: [ 1,   3,  -1,  -3,   5,   3,   6,   7 ]
Window 1: [ 1, 3, -1 ]
- Insert 1: Deque: [ 1 ]
- Insert 3: 3 > 1. 1 can NEVER be the max in any future window containing 3! Pop back 1.
  Deque: [ 3 ]
- Insert -1: -1 < 3. Push back. Deque: [ 3, -1 ]
Window 1 Max = deque.peekFirst() = 3!

Window 2 moves to [ 3, -1, -3 ]:
- Insert -3: Push back. Deque: [ 3, -1, -3 ]
Window 2 Max = 3!

Window 3 moves to [ -1, -3, 5 ]:
- Old element 3 leaves window: deque.pollFirst() if index matches!
- Insert 5: 5 > -3 (pop), 5 > -1 (pop). Deque: [ 5 ]
Window 3 Max = 5!

Maximum element is ALWAYS at peekFirst() in instantaneous O(1) time!`,
    syntax: {
      queueUsage: `// Standard FIFO Queue in Java:
Queue<Integer> queue = new ArrayDeque<>();
queue.offer(val);    // O(1) Enqueue at tail
int front = queue.poll(); // O(1) Dequeue from head
int peek = queue.peek();   // O(1) Inspect front element

// Double-Ended Queue (Deque):
Deque<Integer> deque = new ArrayDeque<>();
deque.addFirst(val);   // O(1) Insert at head
deque.addLast(val);    // O(1) Insert at tail
deque.removeFirst();   // O(1) Pop head
deque.removeLast();    // O(1) Pop tail`,
    },
    example: {
      title: "Sliding Window Maximum using a Monotonic Deque in O(N) Time",
      language: "java",
      code: `public class SlidingWindowMax {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] result = new int[n - k + 1];
        int ri = 0;

        // Deque stores INDICES, maintaining values in strictly decreasing order
        Deque<Integer> deque = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            // 1. Remove indices that are out of the current sliding window [i - k + 1 .. i]
            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }

            // 2. Remove smaller elements from the back (they will never be the maximum)
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }

            // 3. Add current element's index
            deque.offerLast(i);

            // 4. Record maximum once the first window of size k is formed
            if (i >= k - 1) {
                result[ri++] = nums[deque.peekFirst()];
            }
        }
        return result;
    }
}`,
      explanation:
        "The Monotonic Deque maintains indices in decreasing order of their corresponding values. `deque.peekFirst()` always holds the maximum of the current window. Each index enters and leaves the deque at most once, making the overall runtime strictly O(N) regardless of K.",
    },
    howItWorks: [
      {
        step: 1,
        title: "FIFO Invariant Enforcement",
        description:
          "Elements are inserted at the tail (`offer`) and removed from the head (`poll`), ensuring that older items are processed before newer items.",
      },
      {
        step: 2,
        title: "Circular Array Ring Buffer",
        description:
          "In high-performance ring buffers, fixed arrays use modulo pointers (`(head + 1) % size`) to eliminate memory reallocation and maintain O(1) enqueues and dequeues.",
      },
      {
        step: 3,
        title: "Level-Order BFS Traversal",
        description:
          "Queues form the backbone of Breadth-First Search (BFS) in trees and graphs, processing nodes level-by-level to guarantee the shortest path in unweighted graphs.",
      },
      {
        step: 4,
        title: "Monotonic Window Maintenance",
        description:
          "In sliding windows, smaller elements behind the current incoming value are evicted from the back of the Deque, because the newer, larger value will always outlast them.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using LinkedList instead of ArrayDeque for queues in Java",
        why: "`LinkedList` allocates a node object with two pointers (previous and next) for every single item, creating 24-32 bytes of heap overhead per element and poor cache locality.",
        correct: "Use `Queue<Integer> q = new ArrayDeque<>();`.",
      },
      {
        mistake: "Storing values instead of indices in Sliding Window Deque",
        why: "If you store raw values, you cannot determine if the maximum at `peekFirst()` has slid outside the window boundaries.",
        correct:
          "Store array indices in the deque so you can check `deque.peekFirst() < i - k + 1`.",
      },
    ],
    complexity: {
      time: "Enqueue / Dequeue: O(1) | Sliding Window Pass: O(N) amortized",
      space: "O(K) auxiliary space for sliding window deque",
      explanation:
        "Every element is pushed into the deque once and popped at most once, ensuring that the total work across all N iterations is strictly linear.",
    },
    tryItYourself: {
      prompt:
        "Design a First Unique Number stream reader that can return the first unique integer added so far in O(1) time.",
      hint: "Combine a FIFO Queue with a frequency HashMap (or count array). When checking the first unique number, poll elements from the front of the queue if their frequency count > 1.",
      solutionSnippet: `Queue<Integer> q = new ArrayDeque<>();
Map<Integer, Integer> count = new HashMap<>();

public void add(int value) {
    count.put(value, count.getOrDefault(value, 0) + 1);
    q.offer(value);
}

public int showFirstUnique() {
    while (!q.isEmpty() && count.get(q.peek()) > 1) {
        q.poll(); // Evict non-unique elements
    }
    return q.isEmpty() ? -1 : q.peek();
}`,
    },
    placementConnection:
      "Queues and Deques are evaluated in fundamental Google interview rounds: Sliding Window Maximum, Shortest Path in Binary Matrix (BFS), Rotten Oranges, Word Ladder, and Design Circular Queue.",
    quickRevision: [
      "Queue enforces First-In, First-Out (FIFO); Deque allows insertion/deletion at both ends in O(1).",
      "Always prefer `ArrayDeque` over `LinkedList` in Java for optimal memory footprint and cache locality.",
      "BFS uses a queue to guarantee shortest paths in unweighted graphs.",
      "Monotonic Deque solves Sliding Window Maximum in O(N) time by storing candidate indices in decreasing order.",
    ],
  },
];
