import { Lesson } from "@/types/content";

export const treesAndGraphsLessons: Lesson[] = [
  {
    id: "dsa-recursion-lesson",
    slug: "call-stack-and-trees",
    title: "Recursion & Call Stack: Base Cases, Recursion Trees & Master Theorem",
    track: "dsa",
    topicSlug: "recursion",
    topicTitle: "Recursion & Call Stack",
    order: 10,
    estimatedMinutes: 45,
    oneSentence:
      "Recursion solves complex problems by breaking them down into smaller subproblems of identical structure, executing via stack frames on the CPU call stack until reaching an explicit base case.",
    whyDoWeNeedIt: {
      problem:
        "Hierarchical and non-linear data structures (binary trees, directories, JSON documents, graph components) cannot be cleanly traversed with a fixed count of flat loops. Recursion matches the inductive structure of these definitions, simplifying complex tree traversals into elegant 3-line functions.",
      realWorldAnalogy:
        "Russian Matryoshka nesting dolls. To find the secret token hidden in the innermost doll, you open a doll (recursive step) to find a smaller doll inside. You repeat until you reach the smallest solid doll that cannot be opened (the base case).",
    },
    visualIntuition: `CPU Call Stack Frame Mechanics:
-------------------------------------------------------------------------
Function Call: fib(3)

Step 1: fib(3) calls fib(2) and fib(1)
Stack Frame Growth (Going Down the Tree):
| fib(1) -> returns 1          |  <-- Top of Stack
| fib(2) -> waiting on fib(1)  |
| fib(3) -> waiting on fib(2)  |
| main()                       |
+------------------------------+

Stack Unwinding (Returning Results):
fib(1) returns 1  => Frame popped!
fib(2) computes 1 + 0 = 1 => Frame popped!
fib(3) receives fib(2)=1 and fib(1)=1 => returns 2!

Call Stack Overflow Hazard:
Default thread stack size is typically 1MB (holding ~10,000 to ~20,000 frames).
If recursion depth reaches N = 10^5 without a base case:
StackOverflowError crashes the process!`,
    syntax: {
      canonicalRecursionTemplate: `// Standard 3-Part Recursive Function Template
public ReturnType solve(State state) {
    // 1. Base Case: Terminate immediately without further recursion
    if (isTerminal(state)) {
        return baseValue;
    }

    // 2. Recursive Step: Divide problem into smaller subproblems
    ReturnType subResult1 = solve(smallerState1);
    ReturnType subResult2 = solve(smallerState2);

    // 3. Combine Step: Merge subproblem results
    return combine(subResult1, subResult2);
}`,
      masterTheorem: `// The Master Theorem for Divide-and-Conquer: T(N) = a * T(N/b) + O(N^d)
// Case 1: d < log_b(a)  =>  T(N) = O(N^(log_b(a)))  (Leaf-heavy, e.g. Strassen matrix)
// Case 2: d = log_b(a)  =>  T(N) = O(N^d * log N)   (Balanced, e.g. Merge Sort: a=2, b=2, d=1)
// Case 3: d > log_b(a)  =>  T(N) = O(N^d)           (Root-heavy, e.g. Binary Search: a=1, b=2, d=0)`,
    },
    example: {
      title: "Binary Tree Maximum Depth using Post-Order Recursion",
      language: "java",
      code: `public class TreeMaxDepth {
    public static int maxDepth(TreeNode root) {
        // Base case: An empty tree has depth 0
        if (root == null) {
            return 0;
        }

        // Recursive hypothesis: Compute depths of left and right subtrees
        int leftDepth = maxDepth(root.left);
        int rightDepth = maxDepth(root.right);

        // Combine: Height of current node is 1 + maximum of subtrees
        return 1 + Math.max(leftDepth, rightDepth);
    }
}`,
      explanation:
        "Notice the beauty of mathematical induction: We do not need to mentally trace through all 100 levels of the tree. We verify the base case (`root == null -> 0`) and assume our function correctly computes `maxDepth(root.left)` and `maxDepth(root.right)`. The current node's height is simply `1 + Math.max(left, right)`.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Define Invariant Base Case",
        description:
          "Identify the simplest input for which the answer is known without further computation (e.g. `n == 0`, `root == null`, `list.isEmpty()`).",
      },
      {
        step: 2,
        title: "Ensure Convergence Towards Base Case",
        description:
          "Every recursive call must pass parameters that are strictly closer to the base case (e.g. `n - 1`, `n / 2`, `root.left`). If parameters do not reduce the distance to the base case, infinite recursion occurs.",
      },
      {
        step: 3,
        title: "Analyze Auxiliary Space on Call Stack",
        description:
          "Space complexity is proportional to the maximum height of the recursion tree, not the total number of calls.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Missing or unreachable base case",
        why: "If the base case is omitted or parameters skip over it, stack frames accumulate until JVM memory is exhausted, throwing `StackOverflowError`.",
        correct:
          "Always write and verify your base case condition before writing the recursive body.",
      },
      {
        mistake: "Redundant recalculation of overlapping subproblems",
        why: "Computing naive `fib(n) = fib(n - 1) + fib(n - 2)` evaluates identical states repeatedly, creating an exponential O(2^N) recursion tree.",
        correct:
          "Use Memoization (caching results in an array or map) to collapse repeated calls into O(N).",
      },
    ],
    complexity: {
      time: "T(N) derived via Recurrence Tree or Master Theorem (e.g. O(N) for tree traversal)",
      space: "O(H) auxiliary space on call stack, where H is maximum tree/recursion depth",
      explanation:
        "For a balanced binary tree, H = log2(N), giving O(log N) auxiliary memory. For a skewed degenerate tree, H = N, giving O(N) auxiliary space.",
    },
    tryItYourself: {
      prompt:
        "Implement a recursive function to compute the power x^n in O(log n) time (Binary Exponentiation).",
      hint: "If n is even, x^n = (x^(n/2))^2. If n is odd, x^n = x * x^(n - 1). Handle negative n by computing 1 / x^(-n).",
      solutionSnippet: `public double myPow(double x, long n) {
    if (n < 0) return 1.0 / myPow(x, -n);
    if (n == 0) return 1.0;
    double half = myPow(x, n / 2);
    if (n % 2 == 0) return half * half;
    else return x * half * half;
}`,
    },
    placementConnection:
      "Recursion underpins trees, graphs, backtracking, and dynamic programming. Google interviewers will specifically ask: 'What happens to memory if the tree is completely skewed like a linked list?' and expect you to articulate stack frame growth and convert recursive code into an iterative loop with an explicit Stack if needed.",
    quickRevision: [
      "Every recursive call creates a new stack frame holding local variables and return address.",
      "Base cases stop recursion; failure to converge causes a StackOverflowError crash.",
      "Space complexity of recursion equals the maximum depth of the call stack tree.",
      "Use the Master Theorem to immediately solve divide-and-conquer recurrences.",
    ],
  },
  {
    id: "dsa-trees-lesson",
    slug: "traversals-and-lca",
    title: "Binary Trees: Traversals, Tree Properties & Lowest Common Ancestor (LCA)",
    track: "dsa",
    topicSlug: "trees",
    topicTitle: "Binary Trees",
    order: 12,
    estimatedMinutes: 50,
    oneSentence:
      "A binary tree is a hierarchical node structure where each node has at most two children (left and right), enabling recursive divide-and-conquer traversals and tree-based modeling.",
    whyDoWeNeedIt: {
      problem:
        "Linear data structures (arrays, linked lists) force a trade-off: arrays have fast search but slow insertion; linked lists have fast insertion but slow search. Hierarchical trees balance this trade-off, enabling logarithmic search, range queries, and hierarchical organization (DOM trees, AST parsers, database B-Trees).",
      realWorldAnalogy:
        "A corporate organization chart. The CEO is at the root; each vice president oversees departmental managers, who oversee engineers. Decisions propagate downwards hierarchically.",
    },
    visualIntuition: `Binary Tree Anatomy & Traversal Orders:
-------------------------------------------------------------------------
               [ 1 ]            <-- Root
              /     \\
           [ 2 ]   [ 3 ]        <-- Internal Nodes
          /     \\      \\
        [ 4 ]  [ 5 ]   [ 6 ]    <-- Leaf Nodes

Standard Depth-First Search (DFS) Traversals:
1. Pre-Order   (Root -> Left -> Right):  [ 1, 2, 4, 5, 3, 6 ]  (Used for tree serialization)
2. In-Order    (Left -> Root -> Right):  [ 4, 2, 5, 1, 3, 6 ]  (Sorted order in BST!)
3. Post-Order  (Left -> Right -> Root):  [ 4, 5, 2, 6, 3, 1 ]  (Bottom-up deletion / height)

Breadth-First Search (BFS) / Level-Order Traversal:
Level 0: [ 1 ]
Level 1: [ 2, 3 ]
Level 2: [ 4, 5, 6 ]
Output: [[1], [2, 3], [4, 5, 6]] (Queue-based FIFO traversal)`,
    syntax: {
      treeNodeDef: `// Standard Binary Tree Node
public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}`,
      bfsTemplate: `// Level-Order Traversal (BFS) Template
Queue<TreeNode> queue = new ArrayDeque<>();
if (root != null) queue.offer(root);

while (!queue.isEmpty()) {
    int levelSize = queue.size(); // Freeze size for current level
    List<Integer> currentLevel = new ArrayList<>();

    for (int i = 0; i < levelSize; i++) {
        TreeNode curr = queue.poll();
        currentLevel.add(curr.val);
        if (curr.left != null) queue.offer(curr.left);
        if (curr.right != null) queue.offer(curr.right);
    }
}`,
    },
    example: {
      title: "Lowest Common Ancestor (LCA) in a Binary Tree",
      language: "java",
      code: `public class LowestCommonAncestor {
    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Base case: If root is null, or matches either target node p or q
        if (root == null || root == p || root == q) {
            return root;
        }

        // Search for p and q in left and right subtrees
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        // If both subtrees return non-null, current node is the LCA split point!
        if (left != null && right != null) {
            return root;
        }

        // Otherwise return whichever subtree found one of the targets
        return (left != null) ? left : right;
    }
}`,
      explanation:
        "The LCA algorithm uses post-order traversal to bubble up references from the leaves. If node `p` is found in the left subtree and node `q` is found in the right subtree, the current node is the unique divergence node where their paths meet.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Tree Property Inductions",
        description:
          "Almost every tree property can be solved bottom-up using post-order recursion: compute `left` and `right` subproblem values, then aggregate at the current root.",
      },
      {
        step: 2,
        title: "Diameter vs Height Distinction",
        description:
          "Height is the longest path from node to a leaf. Diameter is the longest path between ANY two nodes in the tree, which may or may not pass through the root.",
      },
      {
        step: 3,
        title: "Iterative vs Recursive Traversal",
        description:
          "Recursive DFS uses the implicit call stack (O(H) space). Level-order BFS uses an explicit FIFO queue (O(W) space, where W is maximum tree width).",
      },
    ],
    commonMistakes: [
      {
        mistake: "Assuming tree diameter always passes through the root",
        why: "A tree can have a deeply unbalanced subtree whose internal path is longer than any path passing through the root.",
        correct:
          "Maintain a global maximum diameter variable updated at every node during bottom-up height computation.",
      },
      {
        mistake: "Forgetting queue.size() snapshot in BFS level-order traversal",
        why: "If you call `queue.size()` directly inside the for loop condition `for (int i = 0; i < queue.size(); i++)`, the loop boundary shifts as children are added, mixing levels together.",
        correct: "Snapshot the level size before the loop: `int size = queue.size();`.",
      },
    ],
    complexity: {
      time: "O(N) single pass visiting every node once",
      space: "O(H) call stack for DFS (O(log N) balanced, O(N) skewed) | O(W) queue for BFS",
      explanation:
        "Every node is inspected a constant number of times. Total operations = O(N).",
    },
    tryItYourself: {
      prompt:
        "Determine if a binary tree is height-balanced (a binary tree in which the left and right subtrees of every node differ in height by no more than 1).",
      hint: "Use bottom-up post-order DFS. Return -1 immediately if any subtree is unbalanced; otherwise return the actual height 1 + max(left, right).",
      solutionSnippet: `public boolean isBalanced(TreeNode root) {
    return checkHeight(root) != -1;
}

private int checkHeight(TreeNode node) {
    if (node == null) return 0;
    int left = checkHeight(node.left);
    if (left == -1) return -1;
    int right = checkHeight(node.right);
    if (right == -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return 1 + Math.max(left, right);
}`,
    },
    placementConnection:
      "Binary tree questions are asked in virtually every Google interview round: Binary Tree Maximum Path Sum, Serialize and Deserialize Binary Tree, Binary Tree Right Side View, Flatten Binary Tree to Linked List, and Construct Binary Tree from Preorder and Inorder Traversal.",
    quickRevision: [
      "Traversals: Pre-order (Root-L-R), In-order (L-Root-R), Post-order (L-R-Root), Level-order (BFS).",
      "Always freeze `int levelSize = queue.size()` before processing a BFS level.",
      "LCA splits when `left != null && right != null`.",
      "Post-order traversal allows bottom-up calculation of subtree height, diameter, and balance in O(N).",
    ],
  },
  {
    id: "dsa-bst-lesson",
    slug: "invariants-and-validation",
    title: "Binary Search Trees (BST): Invariants, Validations & In-Order Properties",
    track: "dsa",
    topicSlug: "bst",
    topicTitle: "Binary Search Trees (BST)",
    order: 13,
    estimatedMinutes: 45,
    oneSentence:
      "A Binary Search Tree (BST) enforces the binary search invariant: every node in the left subtree has a value strictly less than the root, and every node in the right subtree has a value strictly greater than the root.",
    whyDoWeNeedIt: {
      problem:
        "Standard binary trees require O(N) search because target values could be anywhere. By maintaining the BST invariant, search, insertion, and deletion operate in O(H) time (O(log N) for balanced trees), while naturally maintaining elements in dynamically sorted order.",
      realWorldAnalogy:
        "A phone directory split into alphabetical files. If looking for 'Miller', you immediately skip all names beginning with 'A' through 'L' and only search the right branch.",
    },
    visualIntuition: `Binary Search Tree (BST) Invariant & In-Order Traversal:
-------------------------------------------------------------------------
               [ 8 ]               Left Subtree < 8, Right Subtree > 8
              /     \\
           [ 3 ]   [ 10 ]          Left Subtree < 3, Right Subtree > 3
          /     \\      \\
        [ 1 ]  [ 6 ]   [ 14 ]      Left Subtree < 6, Right Subtree > 6

CRITICAL THEOREM:
The IN-ORDER traversal (Left -> Root -> Right) of any valid BST
produces a STRICTLY INCREASING SORTED SEQUENCE!
In-Order Traversal: [ 1, 3, 6, 8, 10, 14 ]

Validating BST Invariant Fallacy:
It is NOT sufficient that node.left.val < node.val!
EVERY node in the left subtree must be less than the root!
      [ 10 ]
     /
   [ 5 ]
     \\
     [ 12 ]  <-- 12 > 5 (valid local child), but 12 > 10 (INVALID BST!)
Therefore, validation requires passing bounded ranges: (minVal, maxVal)!`,
    syntax: {
      searchBST: `// O(H) Search in BST:
public TreeNode searchBST(TreeNode root, int val) {
    if (root == null || root.val == val) return root;
    if (val < root.val) return searchBST(root.left, val);
    else return searchBST(root.right, val);
}`,
      inorderSuccessor: `// In-Order Successor (Smallest node in the right subtree):
public TreeNode getMin(TreeNode node) {
    while (node.left != null) node = node.left;
    return node;
}`,
    },
    example: {
      title: "Validating a Binary Search Tree using Bounded Ranges",
      language: "java",
      code: `public class ValidateBST {
    public static boolean isValidBST(TreeNode root) {
        // Use Long bounds to prevent integer overflow with Integer.MIN/MAX_VALUE
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private static boolean validate(TreeNode node, long min, long max) {
        if (node == null) return true; // Empty tree is valid

        // Value must strictly respect inherited bounds
        if (node.val <= min || node.val >= max) {
            return false;
        }

        // Left child must be in (min, node.val)
        // Right child must be in (node.val, max)
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }
}`,
      explanation:
        "Every node inherits an allowed valid range `(min, max)`. When recursing left, the upper bound contracts to `node.val`. When recursing right, the lower bound expands to `node.val`. By checking against `long` bounds, we prevent bugs where node values equal `Integer.MIN_VALUE` or `Integer.MAX_VALUE`.",
    },
    howItWorks: [
      {
        step: 1,
        title: "BST Invariant Propagation",
        description:
          "The condition is recursive across the entire subtree: `all(leftSubtree) < root.val < all(rightSubtree)`.",
      },
      {
        step: 2,
        title: "In-Order Monotonicity Property",
        description:
          "Traversing an in-order BST visits nodes in strictly increasing order. If `current <= previous`, the tree is not a valid BST.",
      },
      {
        step: 3,
        title: "Deletion Mechanics (3 Cases)",
        description:
          "Deleting a node: (1) Leaf node: remove directly; (2) Single child: replace node with its child; (3) Two children: replace node's value with its In-Order Successor (smallest node in right subtree) and recursively delete the successor.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Checking only immediate children: node.left.val < node.val && node.right.val > node.val",
        why: "A right descendant of the left child could exceed the root value, violating the global BST invariant.",
        correct:
          "Pass bounded ranges `(min, max)` down through all recursive calls.",
      },
      {
        mistake: "Using Integer.MIN_VALUE and Integer.MAX_VALUE as int bounds",
        why: "If a valid tree contains a node with value `Integer.MAX_VALUE`, evaluating `node.val >= max` fails because the bound cannot exceed `Integer.MAX_VALUE`.",
        correct: "Use `Long.MIN_VALUE` and `Long.MAX_VALUE` or object wrappers (`Integer`).",
      },
    ],
    complexity: {
      time: "Balanced BST: O(log N) search/insert/delete | Degenerate BST: O(N)",
      space: "O(H) auxiliary call stack space",
      explanation:
        "Self-balancing trees (AVL trees, Red-Black trees) guarantee H = O(log N) by performing tree rotations upon insertion.",
    },
    tryItYourself: {
      prompt:
        "Find the K-th smallest element in a Binary Search Tree (1-indexed).",
      hint: "Remember that In-Order traversal visits BST nodes in sorted order. Perform an iterative in-order traversal using a stack, decrementing k on each node visited.",
      solutionSnippet: `Deque<TreeNode> stack = new ArrayDeque<>();
TreeNode curr = root;
while (curr != null || !stack.isEmpty()) {
    while (curr != null) {
        stack.push(curr);
        curr = curr.left;
    }
    curr = stack.pop();
    if (--k == 0) return curr.val;
    curr = curr.right;
}
return -1;`,
    },
    placementConnection:
      "BST questions asked at Google: Validate Binary Search Tree, Kth Smallest Element in a BST, Lowest Common Ancestor of a BST (solvable in O(H) without extra memory!), Convert Sorted Array to Balanced BST, and Inorder Successor in BST.",
    quickRevision: [
      "In-Order Traversal of a BST produces a strictly increasing sorted array.",
      "Validate BST using inherited range bounds `(min, max)` rather than local child checks.",
      "In a BST, Lowest Common Ancestor (LCA) is the first node where `p` and `q` diverge to left and right.",
      "Deletion with 2 children replaces the node with its in-order successor (min of right subtree).",
    ],
  },
  {
    id: "dsa-heap-lesson",
    slug: "complete-trees-and-heapify",
    title: "Heap & Priority Queue: Complete Binary Trees, Heapify & Top-K",
    track: "dsa",
    topicSlug: "heap",
    topicTitle: "Heap & Priority Queue",
    order: 14,
    estimatedMinutes: 50,
    oneSentence:
      "A binary heap is an array-backed complete binary tree that maintains the heap property (every parent is <= its children in a min-heap), providing O(1) minimum extraction and O(log N) insertion.",
    whyDoWeNeedIt: {
      problem:
        "Finding the K largest elements in an unsorted stream of 100 million numbers by sorting takes O(N log N) time and requires storing all 100M items in memory. A min-heap of size K processes elements in O(N log K) time using only K elements of memory (~K words of RAM), making it indispensable for streaming data systems.",
      realWorldAnalogy:
        "An emergency room triage desk. Patients are not treated purely by arrival order (FIFO); instead, the most critically ill patient (highest priority) is always admitted next. When a new critical patient arrives, they jump to the head of the queue.",
    },
    visualIntuition: `Complete Binary Tree Array Representation:
-------------------------------------------------------------------------
Tree Representation (Min-Heap):
               [ 2 ]               Index 0
              /     \\
           [ 5 ]   [ 3 ]           Indices 1, 2
          /     \\
        [ 9 ]  [ 7 ]               Indices 3, 4

Array Representation: [ 2, 5, 3, 9, 7 ]
Index:                  0  1  2  3  4

Mathematical Array Navigation Formulas (Zero-Based):
- Parent of node i:       parent = (i - 1) / 2
- Left child of node i:   left   = 2 * i + 1
- Right child of node i:  right  = 2 * i + 2

Notice: ZERO pointers needed! The entire tree lives in a single contiguous array,
yielding peak CPU cache locality!

Linear Time Heapify Proof (Why building a heap is O(N), NOT O(N log N)):
Most nodes sit near the bottom with small heights:
N/2 leaves have height 0 (0 swaps)
N/4 nodes have height 1 (1 swap)
N/8 nodes have height 2 (2 swaps)
Sum = N * sum(h / 2^h) for h=1 to inf = N * 2 = O(N) operations!`,
    syntax: {
      priorityQueueJava: `// Java: PriorityQueue is a Min-Heap by default:
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5); // O(log N) Insertion (Sift-Up)
int min = minHeap.poll(); // O(log N) Extract Min (Sift-Down)
int peek = minHeap.peek(); // O(1) Inspect Min without removing

// Max-Heap: Pass reverseOrder comparator:
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());`,
    },
    example: {
      title: "Top K Frequent Elements using a Bounded Min-Heap",
      language: "java",
      code: `public class TopKFrequent {
    public static int[] topKFrequent(int[] nums, int k) {
        // 1. Build frequency map
        Map<Integer, Integer> count = new HashMap<>();
        for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);

        // 2. Min-Heap ordered by frequency: smallest frequency at top
        PriorityQueue<Integer> heap = new PriorityQueue<>(
            (a, b) -> count.get(a) - count.get(b)
        );

        // 3. Maintain heap size <= k
        for (int n : count.keySet()) {
            heap.offer(n);
            if (heap.size() > k) {
                heap.poll(); // Evict element with the lowest frequency
            }
        }

        // 4. Extract top k elements
        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = heap.poll();
        }
        return result;
    }
}`,
      explanation:
        "By keeping a MIN-HEAP of size K, the element at `peek()` is always the least frequent candidate among the top K. Whenever the heap size exceeds K, `poll()` discards the weakest candidate, ensuring the heap holds only the true top K elements in O(N log K) time.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Complete Binary Tree Shape Invariant",
        description:
          "All levels of the tree are completely full, except possibly the last level, which is filled from left to right. This guarantees maximum height H = floor(log2(N)).",
      },
      {
        step: 2,
        title: "Sift-Up Invariant (Insertion)",
        description:
          "Append element at array end, then repeatedly swap with parent while `element < parent`. Takes at most O(log N) swaps.",
      },
      {
        step: 3,
        title: "Sift-Down Invariant (Extraction)",
        description:
          "Overwrite root with last array element, shrink array, and repeatedly swap with smaller child until heap property is restored. Takes at most O(log N) swaps.",
      },
      {
        step: 4,
        title: "Two Heaps Pattern (Continuous Median)",
        description:
          "Maintain a Max-Heap for the lower half of numbers and a Min-Heap for the upper half. The running median is available in O(1) from the heap tops.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using a Max-Heap for Top-K largest elements",
        why: "A Max-Heap of all N elements requires storing all N items (O(N) memory) and takes O(N + K log N) time. A Min-Heap of size K takes only O(K) memory and O(N log K) time.",
        correct:
          "Use a Min-Heap of size K to find K LARGEST elements; use a Max-Heap of size K to find K SMALLEST elements.",
      },
      {
        mistake: "Mutating elements inside a PriorityQueue without re-inserting",
        why: "If you modify an object's field while it resides in a `PriorityQueue`, the heap does not automatically re-order itself, corrupting the heap invariant.",
        correct:
          "Remove the object, modify it, and re-insert: `heap.remove(obj); obj.val = newVal; heap.offer(obj);`",
      },
    ],
    complexity: {
      time: "Peek: O(1) | Offer/Poll: O(log N) | Heapify (buildHeap): O(N)",
      space: "O(N) contiguous array memory",
      explanation:
        "Building a heap from an array in-place takes linear O(N) time via bottom-up sift-down.",
    },
    tryItYourself: {
      prompt:
        "Find the K-th largest element in an unsorted array.",
      hint: "Maintain a min-heap of size K. Iterate through nums: offer num, and if size > K, poll. The root of the min-heap will be the K-th largest element!",
      solutionSnippet: `PriorityQueue<Integer> minHeap = new PriorityQueue<>();
for (int num : nums) {
    minHeap.offer(num);
    if (minHeap.size() > k) {
        minHeap.poll();
    }
}
return minHeap.peek();`,
    },
    placementConnection:
      "Heaps are ubiquitous in Google technical interviews: Merge K Sorted Lists, Find Median from Data Stream (Two Heaps pattern), Top K Frequent Elements, Task Scheduler, and Kth Smallest Element in a Sorted Matrix.",
    quickRevision: [
      "Heap is an array-represented complete binary tree: parent = (i - 1)/2, left = 2i + 1, right = 2i + 2.",
      "Min-Heap stores smallest element at root; Max-Heap stores largest element at root.",
      "Building a heap in-place takes O(N) time via bottom-up sift-downs.",
      "Top-K largest elements problem is solved using a MIN-HEAP of capacity K in O(N log K) time.",
    ],
  },
  {
    id: "dsa-graphs-lesson",
    slug: "traversals-and-shortest-paths",
    title: "Graphs: Representations, BFS/DFS, Topological Sort & Dijkstra",
    track: "dsa",
    topicSlug: "graphs",
    topicTitle: "Graphs (BFS, DFS, Shortest Path)",
    order: 17,
    estimatedMinutes: 60,
    oneSentence:
      "A graph is a network of vertices connected by edges that models pairwise relationships, traversed via Breadth-First Search (shortest path in unweighted graphs), Depth-First Search (connectivity and cycle detection), and Dijkstra's algorithm (weighted shortest paths).",
    whyDoWeNeedIt: {
      problem:
        "Real-world systems are networks: social connections (Google+, LinkedIn), web pages linked by hyperlinks (PageRank), road maps (Google Maps), and build dependencies (Bazel, Make). Graph algorithms allow us to detect circular build dependencies, compute optimal driving routes, and find connected clusters.",
      realWorldAnalogy:
        "An airline flight map. Cities are vertices; direct flight routes are edges. To find the minimum number of flight transfers, use BFS; to detect if a round-trip ticket returns to the origin, use cycle detection; to find the cheapest route with ticket prices, use Dijkstra.",
    },
    visualIntuition: `Graph Representations & Traversal Algorithms:
-------------------------------------------------------------------------
Graph with 4 Vertices:
(0) ---- (1)
 |        |
(2) ---- (3)

Adjacency List (Space: O(V + E) - Optimal for sparse graphs):
Adj[0] = [ 1, 2 ]
Adj[1] = [ 0, 3 ]
Adj[2] = [ 0, 3 ]
Adj[3] = [ 1, 2 ]

Cycle Detection in Directed Graphs (3-Color State Array):
- WHITE (0) : Unvisited
- GRAY  (1) : Currently exploring in current recursion call stack (Active)
- BLACK (2) : Fully explored and backtrack complete
If DFS visits an edge leading to a GRAY vertex -> CYCLE CONFIRMED! (Back-edge!)

Dijkstra's Algorithm Invariant:
Greedy exploration using a Min-Heap storing (distance, vertex).
When vertex 'u' is popped with shortest distance dist[u],
its shortest path from the source is MATHEMATICALLY FINALIZED (non-negative weights)!`,
    syntax: {
      adjacencyListSetup: `// Building an Adjacency List for V vertices:
List<List<Integer>> adj = new ArrayList<>();
for (int i = 0; i < V; i++) adj.add(new ArrayList<>());
for (int[] edge : edges) {
    adj.get(edge[0]).add(edge[1]); // Directed: edge[0] -> edge[1]
    // If undirected: adj.get(edge[1]).add(edge[0]);
}`,
      topologicalKahn: `// Kahn's Algorithm for Topological Sort (In-Degree Array + Queue)
int[] inDegree = new int[V];
for (List<Integer> neighbors : adj) {
    for (int v : neighbors) inDegree[v]++;
}
Queue<Integer> q = new ArrayDeque<>();
for (int i = 0; i < V; i++) if (inDegree[i] == 0) q.offer(i);`,
    },
    example: {
      title: "Course Schedule Cycle Detection using Kahn's Algorithm (Topological Sort)",
      language: "java",
      code: `public class CourseSchedule {
    public static boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[numCourses];

        // Build directed graph: prereq[1] -> prereq[0]
        for (int[] pre : prerequisites) {
            adj.get(pre[1]).add(pre[0]);
            inDegree[pre[0]]++;
        }

        // Add all courses with 0 prerequisites to queue
        Queue<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) queue.offer(i);
        }

        int processedCourses = 0;
        while (!queue.isEmpty()) {
            int curr = queue.poll();
            processedCourses++;

            for (int neighbor : adj.get(curr)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        return processedCourses == numCourses; // If cycle exists, some courses remain unprocessed!
    }
}`,
      explanation:
        "Kahn's algorithm repeatedly removes vertices with an in-degree of 0 (courses with no prerequisites). When a vertex is removed, the in-degrees of its outgoing neighbors are decremented. If the graph contains a cycle (circular dependency), vertices in the cycle never reach in-degree 0, so `processedCourses < numCourses`.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Choose Graph Representation",
        description:
          "Use an Adjacency List `List<List<Integer>>` or `Map<Integer, List<Integer>>` to consume O(V + E) space. Only use an Adjacency Matrix `int[V][V]` when the graph is dense (E ~ V^2).",
      },
      {
        step: 2,
        title: "BFS for Shortest Paths in Unweighted Graphs",
        description:
          "BFS expands in concentric rings level-by-level using a FIFO queue. The first time BFS reaches a destination vertex, the distance is guaranteed minimal.",
      },
      {
        step: 3,
        title: "Dijkstra's Algorithm for Non-Negative Weighted Graphs",
        description:
          "Maintain a Min-Heap of `(dist, u)`. Relax edges `if (dist[u] + weight < dist[v])`, updating distances. Executes in O((V + E) log V) time.",
      },
      {
        step: 4,
        title: "Disjoint Set Union (DSU / Union-Find)",
        description:
          "Tracks connected components dynamically using Path Compression and Union by Rank, achieving near-constant O(α(N)) amortized operations.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using BFS/DFS without a visited set",
        why: "In graphs with cycles, failing to mark nodes as visited leads to an infinite loop and crash.",
        correct:
          "Always maintain a `boolean[] visited` array or `Set<Integer> visited`.",
      },
      {
        mistake: "Using Dijkstra's algorithm on graphs with negative edge weights",
        why: "Dijkstra assumes that adding an edge can never decrease total path cost. Negative weights violate this greedy invariant.",
        correct:
          "Use the Bellman-Ford algorithm or SPFA for graphs with negative weights.",
      },
      {
        mistake: "Confusing undirected cycle detection with directed cycle detection",
        why: "In an undirected graph, encountering the parent node is not a cycle. In a directed graph, cycle detection requires 3-color states (White, Gray, Black) or in-degree reduction.",
        correct:
          "Pass `parent` in undirected DFS; use 3 colors or Kahn's algorithm for directed graphs.",
      },
    ],
    complexity: {
      time: "BFS/DFS: O(V + E) | Dijkstra: O((V + E) log V) | DSU: O(α(V)) amortized",
      space: "O(V + E) adjacency list + O(V) visited array/queue",
      explanation:
        "Every vertex and every edge is traversed a constant number of times in standard linear graph algorithms.",
    },
    tryItYourself: {
      prompt:
        "Given an m x n 2D binary grid where '1' represents land and '0' represents water, return the number of islands (Number of Islands).",
      hint: "Iterate through each cell. When grid[r][c] == '1', trigger a DFS to sink all connected land cells by flipping them to '0', and increment your island count.",
      solutionSnippet: `int count = 0;
for (int r = 0; r < grid.length; r++) {
    for (int c = 0; c < grid[0].length; c++) {
        if (grid[r][c] == '1') {
            count++;
            dfsSink(grid, r, c);
        }
    }
}
return count;

void dfsSink(char[][] g, int r, int c) {
    if (r < 0 || r >= g.length || c < 0 || c >= g[0].length || g[r][c] != '1') return;
    g[r][c] = '0'; // Sink cell
    dfsSink(g, r + 1, c); dfsSink(g, r - 1, c);
    dfsSink(g, r, c + 1); dfsSink(g, r, c - 1);
}`,
    },
    placementConnection:
      "Graphs are the hallmark of Google technical interviews: Number of Islands, Course Schedule I & II, Word Ladder, Clone Graph, Network Delay Time (Dijkstra), Alien Dictionary (Topological Sort), and Reconstruct Itinerary (Eulerian Path).",
    quickRevision: [
      "Represent graphs with Adjacency Lists: O(V + E) space.",
      "BFS guarantees the shortest path in unweighted graphs.",
      "Kahn's Algorithm uses in-degree array to compute Topological Sort and detect cycles in DAGs.",
      "Dijkstra's Algorithm solves shortest paths with non-negative weights in O((V + E) log V) time using a Min-Heap.",
    ],
  },
];
