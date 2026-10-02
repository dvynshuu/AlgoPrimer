import { Problem } from "@/types/content";

export const treeGraphProblems: Problem[] = [
  {
    id: "maximum-depth-of-binary-tree",
    slug: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    topic: "Trees",
    topicSlug: "trees",
    subtopic: "Depth-First Search (DFS) & Post-order Traversal",
    difficulty: "Easy",
    progressionLevel: "Level 1: Concept Understanding",
    statement:
      "Given the `root` of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    understandTheProblem:
      "The depth of an empty tree is 0. For any non-empty node, its max depth is 1 plus the maximum depth of its left and right subtrees.",
    constraints: [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-100 <= Node.val <= 100",
    ],
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "3",
        explanation: "Path: 3 -> 20 -> 15 (or 7) has length 3 nodes.",
      },
      {
        input: "root = [1,null,2]",
        output: "2",
        explanation: "Path: 1 -> 2 has length 2 nodes.",
      },
    ],
    hints: [
      "What is the base case? If root == null, depth is 0.",
      "For any node, its depth is `1 + max(depth(left), depth(right))`.",
      "Can also be solved iteratively using Breadth-First Search (level-order traversal).",
    ],
    bruteForce: {
      title: "Approach 1 — Level-Order Traversal (BFS)",
      intuition:
        "Traverse the tree level by level using a queue. Increment depth counter after exhausting each level until the queue is empty.",
      code: {
        java: `import java.util.LinkedList;
import java.util.Queue;

class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int depth = 0;

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            for (int i = 0; i < levelSize; i++) {
                TreeNode curr = queue.poll();
                if (curr.left != null) queue.offer(curr.left);
                if (curr.right != null) queue.offer(curr.right);
            }
            depth++;
        }

        return depth;
    }
}`,
        cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;

        queue<TreeNode*> q;
        q.push(root);
        int depth = 0;

        while (!q.empty()) {
            int levelSize = q.size();
            for (int i = 0; i < levelSize; i++) {
                TreeNode* curr = q.front();
                q.pop();
                if (curr->left) q.push(curr->left);
                if (curr->right) q.push(curr->right);
            }
            depth++;
        }

        return depth;
    }
};`,
        python: `from collections import deque

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0

        queue = deque([root])
        depth = 0

        while queue:
            level_size = len(queue)
            for _ in range(level_size):
                curr = queue.popleft()
                if curr.left:
                    queue.append(curr.left)
                if curr.right:
                    queue.append(curr.right)
            depth += 1

        return depth`,
        javascript: `var maxDepth = function(root) {
    if (!root) return 0;
    const queue = [root];
    let depth = 0;

    while (queue.length > 0) {
        const levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            const curr = queue.shift();
            if (curr.left) queue.push(curr.left);
            if (curr.right) queue.push(curr.right);
        }
        depth++;
    }

    return depth;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(w) where w is max width of tree (up to n/2)",
      explanation:
        "Visits each node once using an auxiliary queue.",
    },
    optimalSolution: {
      title: "Approach 2 — Recursive DFS (Post-order Traversal)",
      intuition:
        "If `root == null`, return 0. Otherwise recursively evaluate `maxDepth(root.left)` and `maxDepth(root.right)`. The depth of current node is `1 + Math.max(leftDepth, rightDepth)`.",
      code: {
        java: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int leftDepth = maxDepth(root.left);
        int rightDepth = maxDepth(root.right);

        return 1 + Math.max(leftDepth, rightDepth);
    }
}`,
        cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;

        int leftDepth = maxDepth(root->left);
        int rightDepth = maxDepth(root->right);

        return 1 + max(leftDepth, rightDepth);
    }
};`,
        python: `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0

        left_depth = self.maxDepth(root.left)
        right_depth = self.maxDepth(root.right)

        return 1 + max(left_depth, right_depth)`,
        javascript: `var maxDepth = function(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(h) where h is tree height (O(log n) balanced, O(n) skewed)",
      whyOptimal:
        "Visits every node exactly once with minimal recursion stack overhead. Extremely clean and idiomatic.",
    },
    pattern: "Tree DFS / Divide and Conquer",
    complexitySummary: {
      time: "O(n)",
      space: "O(h)",
    },
    dryRun: {
      sampleInput: "root = [3, 9, 20, null, null, 15, 7]",
      steps: [
        {
          stepNumber: 1,
          state: "Call maxDepth(3)",
          action: "Compute left subtree maxDepth(9) and right subtree maxDepth(20).",
          result: "Waiting for child calls.",
        },
        {
          stepNumber: 2,
          state: "maxDepth(9)",
          action: "Both children null -> 1 + max(0, 0) = 1.",
          result: "Returns 1.",
        },
        {
          stepNumber: 3,
          state: "maxDepth(20)",
          action: "Left child 15 returns 1, right child 7 returns 1 -> 1 + max(1, 1) = 2.",
          result: "Returns 2.",
        },
        {
          stepNumber: 4,
          state: "At root (3)",
          action: "1 + max(1, 2) = 3.",
          result: "Returns 3.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Missing base case check for null root",
        fix: "Check `if (root == null) return 0;` at the very beginning of the recursive function.",
      },
      {
        mistake: "Assuming tree is balanced when analyzing space complexity",
        fix: "In the worst case (a completely skewed tree like a linked list), call stack depth is O(n), not O(log n).",
      },
    ],
    variations: [
      "Minimum Depth of Binary Tree",
      "Diameter of Binary Tree",
      "Balanced Binary Tree",
    ],
    practice: [
      { title: "Diameter of Binary Tree", difficulty: "Easy" },
      { title: "Balanced Binary Tree", difficulty: "Easy" },
    ],
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    companies: ["Amazon", "Microsoft", "Google", "Apple", "TCS"],
  },
  {
    id: "invert-binary-tree",
    slug: "invert-binary-tree",
    title: "Invert Binary Tree",
    topic: "Trees",
    topicSlug: "trees",
    subtopic: "Tree Transformation / Pointer Swapping",
    difficulty: "Easy",
    progressionLevel: "Level 1: Concept Understanding",
    statement:
      "Given the `root` of a binary tree, invert the tree, and return its root. Inverting a binary tree means mirroring every node such that its left and right children are swapped.",
    understandTheProblem:
      "For every node in the tree, swap its left child with its right child, and recursively repeat this for all descendants.",
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100",
    ],
    examples: [
      {
        input: "root = [4,2,7,1,3,6,9]",
        output: "[4,7,2,9,6,3,1]",
        explanation: "Each left and right child pair is swapped.",
      },
      {
        input: "root = [2,1,3]",
        output: "[2,3,1]",
        explanation: "Left child 1 and right child 3 swap places.",
      },
      {
        input: "root = []",
        output: "[]",
        explanation: "Inverting an empty tree yields empty tree.",
      },
    ],
    hints: [
      "Base case: if the tree is empty (root == null), return null.",
      "Store root.left in a temporary variable, swap root.left with root.right.",
      "Recursively invert both subtrees.",
    ],
    bruteForce: {
      title: "Approach 1 — Iterative BFS with Queue",
      intuition:
        "Perform a level-order traversal with a queue. At each node popped from the queue, swap its left and right pointers, and push any non-null children into the queue.",
      code: {
        java: `import java.util.LinkedList;
import java.util.Queue;

class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            TreeNode curr = queue.poll();

            TreeNode temp = curr.left;
            curr.left = curr.right;
            curr.right = temp;

            if (curr.left != null) queue.offer(curr.left);
            if (curr.right != null) queue.offer(curr.right);
        }

        return root;
    }
}`,
        cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;

        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            TreeNode* curr = q.front();
            q.pop();

            TreeNode* temp = curr->left;
            curr->left = curr->right;
            curr->right = temp;

            if (curr->left) q.push(curr->left);
            if (curr->right) q.push(curr->right);
        }

        return root;
    }
};`,
        python: `from collections import deque

class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None

        queue = deque([root])
        while queue:
            curr = queue.popleft()
            curr.left, curr.right = curr.right, curr.left

            if curr.left:
                queue.append(curr.left)
            if curr.right:
                queue.append(curr.right)

        return root`,
        javascript: `var invertTree = function(root) {
    if (!root) return null;
    const queue = [root];

    while (queue.length > 0) {
        const curr = queue.shift();
        const temp = curr.left;
        curr.left = curr.right;
        curr.right = temp;

        if (curr.left) queue.push(curr.left);
        if (curr.right) queue.push(curr.right);
    }

    return root;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(w) where w is max width of tree",
      explanation:
        "Visits each node once and swaps pointers via level-order queue.",
    },
    optimalSolution: {
      title: "Approach 2 — Recursive DFS (Pre-order / Post-order Swap)",
      intuition:
        "If `root == null`, return null. Recursively invert the left subtree and right subtree, then swap `root.left` and `root.right`. Return `root`.",
      code: {
        java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) {
            return null;
        }

        TreeNode temp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(temp);

        return root;
    }
}`,
        cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;

        TreeNode* temp = root->left;
        root->left = invertTree(root->right);
        root->right = invertTree(temp);

        return root;
    }
};`,
        python: `class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None

        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root`,
        javascript: `var invertTree = function(root) {
    if (!root) return null;

    const temp = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(temp);

    return root;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(h) call stack",
      whyOptimal:
        "Visits each node once in O(n) time. No auxiliary collections needed beyond recursion stack frames.",
    },
    pattern: "Recursive Tree Transformation",
    complexitySummary: {
      time: "O(n)",
      space: "O(h)",
    },
    dryRun: {
      sampleInput: "root = [2, 1, 3]",
      steps: [
        {
          stepNumber: 1,
          state: "invertTree(2)",
          action: "Hold temp = node(1). invertTree(3) -> returns node(3).",
          result: "root.left = node(3)",
        },
        {
          stepNumber: 2,
          state: "invert right subtree",
          action: "invertTree(temp) -> returns node(1).",
          result: "root.right = node(1)",
        },
        {
          stepNumber: 3,
          state: "Return node 2",
          action: "Tree is now [2, 3, 1].",
          result: "Done!",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Overwriting root.left before inverting root.right without saving a temporary pointer",
        fix: "Save `temp = root.left` before replacing `root.left = invertTree(root.right)`.",
      },
    ],
    variations: [
      "Symmetric Tree (check if tree is mirror of itself)",
      "Same Tree",
    ],
    practice: [
      { title: "Symmetric Tree", difficulty: "Easy" },
      { title: "Same Tree", difficulty: "Easy" },
    ],
    tags: ["Tree", "Depth-First Search", "Binary Tree"],
    companies: ["Google", "Amazon", "Meta", "Microsoft"],
  },
  {
    id: "lowest-common-ancestor-of-a-binary-tree",
    slug: "lowest-common-ancestor-of-a-binary-tree",
    title: "Lowest Common Ancestor of a Binary Tree",
    topic: "Trees",
    topicSlug: "trees",
    subtopic: "Bottom-Up Tree Recursion",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes `p` and `q`. The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself).",
    understandTheProblem:
      "Find the deepest node in the tree where one target node (`p` or `q`) lies in its left subtree and the other lies in its right subtree, or where the node itself is `p` (or `q`) and the other node is somewhere beneath it.",
    constraints: [
      "The number of nodes in the tree is in the range [2, 10^5].",
      "-10^9 <= Node.val <= 10^9",
      "All Node.val are unique.",
      "p != q",
      "p and q will exist in the tree.",
    ],
    examples: [
      {
        input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1",
        output: "3",
        explanation: "The LCA of nodes 5 and 1 is 3.",
      },
      {
        input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4",
        output: "5",
        explanation: "The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.",
      },
    ],
    hints: [
      "Think bottom-up using post-order recursion.",
      "If the current node is null, return null.",
      "If current node is either p or q, return current node up the call stack.",
      "If both left and right recursive calls return non-null, the current node is the LCA!",
    ],
    bruteForce: {
      title: "Approach 1 — Root-to-Node Paths Intersection",
      intuition:
        "Find the root-to-node path for node `p` and store it in list `pathP`. Find the root-to-node path for node `q` and store it in list `pathQ`. Traverse both paths in parallel from root until they diverge; the last common node is the LCA.",
      code: {
        java: `import java.util.ArrayList;
import java.util.List;

class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        List<TreeNode> pathP = new ArrayList<>();
        List<TreeNode> pathQ = new ArrayList<>();

        findPath(root, p, pathP);
        findPath(root, q, pathQ);

        TreeNode lca = null;
        int minLen = Math.min(pathP.size(), pathQ.size());
        for (int i = 0; i < minLen; i++) {
            if (pathP.get(i) == pathQ.get(i)) {
                lca = pathP.get(i);
            } else {
                break;
            }
        }
        return lca;
    }

    private boolean findPath(TreeNode root, TreeNode target, List<TreeNode> path) {
        if (root == null) return false;
        path.add(root);
        if (root == target) return true;
        if (findPath(root.left, target, path) || findPath(root.right, target, path)) {
            return true;
        }
        path.remove(path.size() - 1);
        return false;
    }
}`,
        cpp: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        vector<TreeNode*> pathP, pathQ;
        findPath(root, p, pathP);
        findPath(root, q, pathQ);

        TreeNode* lca = nullptr;
        int n = min(pathP.size(), pathQ.size());
        for (int i = 0; i < n; i++) {
            if (pathP[i] == pathQ[i]) lca = pathP[i];
            else break;
        }
        return lca;
    }

    bool findPath(TreeNode* root, TreeNode* target, vector<TreeNode*>& path) {
        if (!root) return false;
        path.push_back(root);
        if (root == target) return true;
        if (findPath(root->left, target, path) || findPath(root->right, target, path)) return true;
        path.pop_back();
        return false;
    }
};`,
        python: `class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        path_p, path_q = [], []

        def find_path(curr, target, path):
            if not curr:
                return False
            path.append(curr)
            if curr == target:
                return True
            if find_path(curr.left, target, path) or find_path(curr.right, target, path):
                return True
            path.pop()
            return False

        find_path(root, p, path_p)
        find_path(root, q, path_q)

        lca = None
        for u, v in zip(path_p, path_q):
            if u == v:
                lca = u
            else:
                break
        return lca`,
        javascript: `var lowestCommonAncestor = function(root, p, q) {
    const pathP = [];
    const pathQ = [];

    const findPath = (curr, target, path) => {
        if (!curr) return false;
        path.push(curr);
        if (curr === target) return true;
        if (findPath(curr.left, target, path) || findPath(curr.right, target, path)) {
            return true;
        }
        path.pop();
        return false;
    };

    findPath(root, p, pathP);
    findPath(root, q, pathQ);

    let lca = null;
    const minLen = Math.min(pathP.length, pathQ.length);
    for (let i = 0; i < minLen; i++) {
        if (pathP[i] === pathQ[i]) {
            lca = pathP[i];
        } else {
            break;
        }
    }
    return lca;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      explanation:
        "Requires tracking and storing explicit node paths in arrays.",
    },
    optimalSolution: {
      title: "Approach 2 — Bottom-Up Post-Order DFS",
      intuition:
        "Traverse tree recursively. If `root == null || root == p || root == q`, return `root`. Otherwise search left and right subtrees. If both return non-null, `root` is the common fork point (LCA). If only one returns non-null, bubble that non-null node upward.",
      code: {
        java: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) {
            return root;
        }

        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        if (left != null && right != null) {
            return root;
        }

        return left != null ? left : right;
    }
}`,
        cpp: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) {
            return root;
        }

        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);

        if (left && right) {
            return root;
        }

        return left ? left : right;
    }
};`,
        python: `class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if not root or root == p or root == q:
            return root

        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)

        if left and right:
            return root

        return left if left else right`,
        javascript: `var lowestCommonAncestor = function(root, p, q) {
    if (!root || root === p || root === q) {
        return root;
    }

    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    if (left !== null && right !== null) {
        return root;
    }

    return left !== null ? left : right;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      whyOptimal:
        "Performs a single bottom-up traversal in O(n) without allocating path arrays. Returns immediately when common ancestor branch point is identified.",
    },
    pattern: "Tree Post-Order DFS / Branch Convergence",
    complexitySummary: {
      time: "O(n)",
      space: "O(h)",
    },
    dryRun: {
      sampleInput: "root = [3, 5, 1], p = 5, q = 1",
      steps: [
        {
          stepNumber: 1,
          state: "At root (3)",
          action: "Search left on node 5.",
          result: "root == p (5) matches! Returns node 5.",
        },
        {
          stepNumber: 2,
          state: "At root (3)",
          action: "Search right on node 1.",
          result: "root == q (1) matches! Returns node 1.",
        },
        {
          stepNumber: 3,
          state: "Back at root (3)",
          action: "left is 5 (not null) and right is 1 (not null). Both non-null!",
          result: "Return root (3) as LCA.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Confusing LCA of General Binary Tree with LCA of Binary Search Tree",
        fix: "In a general binary tree, you cannot use node values to decide to go left or right. You must explore both branches.",
      },
      {
        mistake: "Forgetting that p or q can be the ancestor of the other",
        fix: "Returning `root == p || root == q` immediately handles the case where one node is ancestor of the other.",
      },
    ],
    variations: [
      "Lowest Common Ancestor of a Binary Search Tree",
      "Lowest Common Ancestor of Deepest Leaves",
    ],
    practice: [
      { title: "Lowest Common Ancestor of a Binary Search Tree", difficulty: "Medium" },
      { title: "Binary Tree Maximum Path Sum", difficulty: "Hard" },
    ],
    tags: ["Tree", "Depth-First Search", "Binary Tree"],
    companies: ["Amazon", "Meta", "Microsoft", "Google", "Bloomberg"],
  },
  {
    id: "number-of-islands",
    slug: "number-of-islands",
    title: "Number of Islands",
    topic: "Graphs",
    topicSlug: "graphs",
    subtopic: "Grid DFS / Connected Components",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    understandTheProblem:
      "We need to find the number of connected components of '1's where connectivity is 4-directional (up, down, left, right).",
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'.",
    ],
    examples: [
      {
        input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: "1",
        explanation: "All 1s connect into a single large island.",
      },
      {
        input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: "3",
        explanation: "Top-left cluster, middle single cell, and bottom-right cluster make 3 distinct islands.",
      },
    ],
    hints: [
      "Iterate through every cell (r, c) in the grid.",
      "If grid[r][c] == '1', you found a new island! Increment island count.",
      "Immediately trigger a DFS or BFS from (r, c) to 'sink' all connected land cells (change '1' to '0') so they aren't counted again.",
    ],
    bruteForce: {
      title: "Approach 1 — BFS with Visited Set",
      intuition:
        "Maintain an external `visited` boolean matrix. When an unvisited '1' is found, increment island counter and perform BFS using a queue to visit all connected cells.",
      code: {
        java: `import java.util.LinkedList;
import java.util.Queue;

class Solution {
    public int numIslands(char[][] grid) {
        int m = grid.length, n = grid[0].length;
        boolean[][] visited = new boolean[m][n];
        int count = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == '1' && !visited[r][c]) {
                    count++;
                    Queue<int[]> q = new LinkedList<>();
                    q.offer(new int[]{r, c});
                    visited[r][c] = true;

                    while (!q.isEmpty()) {
                        int[] cell = q.poll();
                        for (int[] d : dirs) {
                            int nr = cell[0] + d[0], nc = cell[1] + d[1];
                            if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == '1' && !visited[nr][nc]) {
                                visited[nr][nc] = true;
                                q.offer(new int[]{nr, nc});
                            }
                        }
                    }
                }
            }
        }
        return count;
    }
}`,
        cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<bool>> visited(m, vector<bool>(n, false));
        int count = 0;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == '1' && !visited[r][c]) {
                    count++;
                    queue<pair<int,int>> q;
                    q.push({r, c});
                    visited[r][c] = true;

                    while (!q.empty()) {
                        auto [cr, cc] = q.front(); q.pop();
                        for (auto& d : dirs) {
                            int nr = cr + d[0], nc = cc + d[1];
                            if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == '1' && !visited[nr][nc]) {
                                visited[nr][nc] = true;
                                q.push({nr, nc});
                            }
                        }
                    }
                }
            }
        }
        return count;
    }
};`,
        python: `from collections import deque

class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        m, n = len(grid), len(grid[0])
        visited = set()
        count = 0

        for r in range(m):
            for c in range(n):
                if grid[r][c] == '1' and (r, c) not in visited:
                    count += 1
                    q = deque([(r, c)])
                    visited.add((r, c))

                    while q:
                        cr, cc = q.popleft()
                        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                            nr, nc = cr + dr, cc + dc
                            if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == '1' and (nr, nc) not in visited:
                                visited.add((nr, nc))
                                q.append((nr, nc))

        return count`,
        javascript: `var numIslands = function(grid) {
    if (!grid || grid.length === 0) return 0;
    const m = grid.length, n = grid[0].length;
    const visited = Array.from({ length: m }, () => new Array(n).fill(false));
    let count = 0;
    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === '1' && !visited[r][c]) {
                count++;
                const queue = [[r, c]];
                visited[r][c] = true;

                while (queue.length > 0) {
                    const [cr, cc] = queue.shift();
                    for (const [dr, dc] of dirs) {
                        const nr = cr + dr, nc = cc + dc;
                        if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === '1' && !visited[nr][nc]) {
                            visited[nr][nc] = true;
                            queue.push([nr, nc]);
                        }
                    }
                }
            }
        }
    }
    return count;
};`,
      },
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(m * n) for visited matrix",
      explanation:
        "Allocates auxiliary visited matrix and queue.",
    },
    optimalSolution: {
      title: "Approach 2 — In-Place Recursive DFS (Sink Island)",
      intuition:
        "Iterate through the grid. When `grid[r][c] == '1'`, increment island count and call `dfs(r, c)`. In the DFS, boundary check and verify `grid[r][c] == '1'`. Then mark `grid[r][c] = '0'` (sinking the island in-place to avoid auxiliary visited space) and recurse into all 4 neighbors.",
      code: {
        java: `class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;

        int m = grid.length;
        int n = grid[0].length;
        int count = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c, m, n);
                }
            }
        }

        return count;
    }

    private void dfs(char[][] grid, int r, int c, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') {
            return;
        }

        grid[r][c] = '0'; // Sink cell

        dfs(grid, r + 1, c, m, n);
        dfs(grid, r - 1, c, m, n);
        dfs(grid, r, c + 1, m, n);
        dfs(grid, r, c - 1, m, n);
    }
}`,
        cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        int m = grid.size(), n = grid[0].size();
        int count = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c, m, n);
                }
            }
        }
        return count;
    }

    void dfs(vector<vector<char>>& grid, int r, int c, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') {
            return;
        }

        grid[r][c] = '0';

        dfs(grid, r + 1, c, m, n);
        dfs(grid, r - 1, c, m, n);
        dfs(grid, r, c + 1, m, n);
        dfs(grid, r, c - 1, m, n);
    }
};`,
        python: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid:
            return 0

        m, n = len(grid), len(grid[0])
        count = 0

        def dfs(r: int, c: int):
            if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != '1':
                return

            grid[r][c] = '0' # Sink cell

            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        for r in range(m):
            for c in range(n):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)

        return count`,
        javascript: `var numIslands = function(grid) {
    if (!grid || grid.length === 0) return 0;
    const m = grid.length;
    const n = grid[0].length;
    let count = 0;

    const dfs = (r, c) => {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') {
            return;
        }

        grid[r][c] = '0'; // Sink cell

        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    };

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }

    return count;
};`,
      },
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(m * n) worst-case recursion stack (e.g. grid completely filled with land)",
      whyOptimal:
        "Visits each cell at most a constant number of times. Directly mutates input to eliminate all auxiliary visited collection allocations.",
    },
    pattern: "Grid Graph Traversal / Connected Components DFS",
    complexitySummary: {
      time: "O(m * n)",
      space: "O(m * n) recursion stack",
    },
    dryRun: {
      sampleInput: 'grid = [["1","1"],["0","1"]]',
      steps: [
        {
          stepNumber: 1,
          state: "r=0, c=0 is '1'",
          action: "count=1. Trigger dfs(0, 0). Sink grid[0][0]='0'.",
          result: "grid[0][0] is now '0'.",
        },
        {
          stepNumber: 2,
          state: "dfs explores neighbors",
          action: "Explores (0, 1): sinks to '0'. Explores (1, 1): sinks to '0'.",
          result: "Entire island sunk to '0'.",
        },
        {
          stepNumber: 3,
          state: "Outer loops continue",
          action: "No more '1's found.",
          result: "Return count = 1.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Checking diagonal neighbors when problem specifies horizontal and vertical only",
        fix: "Only explore 4 cardinal directions (up, down, left, right), not 8.",
      },
      {
        mistake: "Stack overflow on very large grids in Python without increasing recursion limit",
        fix: "Use iterative BFS or increase `sys.setrecursionlimit()` if grid dimensions exceed 1000.",
      },
    ],
    variations: [
      "Max Area of Island",
      "Surrounded Regions",
      "Rotting Oranges (BFS Multi-source)",
    ],
    practice: [
      { title: "Max Area of Island", difficulty: "Medium" },
      { title: "Rotting Oranges", difficulty: "Medium" },
    ],
    tags: ["Array", "Depth-First Search", "Breadth-First Search", "Union Find", "Matrix"],
    companies: ["Amazon", "Microsoft", "Google", "Meta", "Bloomberg"],
  },
  {
    id: "course-schedule",
    slug: "course-schedule",
    title: "Course Schedule (Topological Sort)",
    topic: "Graphs",
    topicSlug: "graphs",
    subtopic: "Directed Cycle Detection & DAG",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you must take course `b_i` first if you want to take course `a_i`. Return `true` if you can finish all courses. Otherwise, return `false`.",
    understandTheProblem:
      "Each pair [a, b] represents a directed edge b -> a (b is a prerequisite for a). If there is any circular dependency (e.g. course 0 requires 1, and course 1 requires 0), neither can ever be finished. Return true if there are NO cycles in the directed graph.",
    constraints: [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000",
      "prerequisites[i].length == 2",
      "0 <= a_i, b_i < numCourses",
      "All the pairs prerequisites[i] are unique.",
    ],
    examples: [
      {
        input: "numCourses = 2, prerequisites = [[1, 0]]",
        output: "true",
        explanation: "To take course 1 you should have finished course 0. This is linear and has no cycle.",
      },
      {
        input: "numCourses = 2, prerequisites = [[1, 0], [0, 1]]",
        output: "false",
        explanation: "Course 1 requires course 0, but course 0 requires course 1. Circular dependency means neither can be taken.",
      },
    ],
    hints: [
      "This problem is equivalent to finding if a directed graph contains a cycle.",
      "Kahn's algorithm: calculate in-degrees of all nodes. Courses with in-degree 0 have no prerequisites and can be taken immediately.",
      "Whenever a course is taken, reduce the in-degree of all courses that depend on it. If all courses are eventually taken, return true.",
    ],
    bruteForce: {
      title: "Approach 1 — Unoptimized DFS with Visited Array Reset",
      intuition:
        "For each course from 0 to N-1, run a DFS to check if any path can reach back to the starting course.",
      code: {
        java: `public boolean canFinish(int numCourses, int[][] prerequisites) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    for (int[] p : prerequisites) adj.get(p[1]).add(p[0]);

    for (int i = 0; i < numCourses; i++) {
        boolean[] visited = new boolean[numCourses];
        if (hasCycle(i, adj, visited)) return false;
    }
    return true;
}
private boolean hasCycle(int curr, List<List<Integer>> adj, boolean[] visited) {
    if (visited[curr]) return true;
    visited[curr] = true;
    for (int next : adj.get(curr)) {
        if (hasCycle(next, adj, visited)) return true;
    }
    visited[curr] = false;
    return false;
}`,
        cpp: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses);
    for (auto& p : prerequisites) adj[p[1]].push_back(p[0]);

    for (int i = 0; i < numCourses; i++) {
        vector<bool> visited(numCourses, false);
        if (hasCycle(i, adj, visited)) return false;
    }
    return true;
}
bool hasCycle(int curr, vector<vector<int>>& adj, vector<bool>& visited) {
    if (visited[curr]) return true;
    visited[curr] = true;
    for (int next : adj[curr]) {
        if (hasCycle(next, adj, visited)) return true;
    }
    visited[curr] = false;
    return false;
}`,
        python: `def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    adj = [[] for _ in range(numCourses)]
    for dest, src in prerequisites:
        adj[src].append(dest)

    def has_cycle(curr, visited):
        if visited[curr]: return True
        visited[curr] = True
        for nxt in adj[curr]:
            if has_cycle(nxt, visited): return True
        visited[curr] = False
        return False

    for i in range(numCourses):
        if has_cycle(i, [False] * numCourses):
            return False
    return True`,
        javascript: `var canFinish = function(numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }, () => []);
    for (const [dest, src] of prerequisites) adj[src].push(dest);

    function hasCycle(curr, visited) {
        if (visited[curr]) return true;
        visited[curr] = true;
        for (const nxt of adj[curr]) {
            if (hasCycle(nxt, visited)) return true;
        }
        visited[curr] = false;
        return false;
    }

    for (let i = 0; i < numCourses; i++) {
        if (hasCycle(i, new Array(numCourses).fill(false))) return false;
    }
    return true;
};`,
      },
      timeComplexity: "O(V * (V + E))",
      spaceComplexity: "O(V + E)",
      explanation:
        "Running DFS starting from every vertex redundantly recalculates paths across shared nodes.",
    },
    optimalSolution: {
      title: "Approach 2 — Kahn's Algorithm (BFS In-Degree Array)",
      intuition:
        "1. Compute in-degree (number of incoming prerequisites) for every course. 2. Enqueue all courses with in-degree 0 (no prerequisites). 3. Process the queue: dequeue course, increment count of finished courses, and decrement in-degree of all courses that depend on it. If a neighbor reaches in-degree 0, enqueue it. 4. Return true if finished count == numCourses.",
      code: {
        java: `public class CourseSchedule {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[numCourses];

        // Directed edge: prereq[1] -> prereq[0]
        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);
            inDegree[p[0]]++;
        }

        Queue<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) queue.offer(i);
        }

        int processed = 0;
        while (!queue.isEmpty()) {
            int curr = queue.poll();
            processed++;

            for (int neighbor : adj.get(curr)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        return processed == numCourses;
    }
}`,
        cpp: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses);
    vector<int> inDegree(numCourses, 0);

    for (auto& p : prerequisites) {
        adj[p[1]].push_back(p[0]);
        inDegree[p[0]]++;
    }

    queue<int> q;
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) q.push(i);
    }

    int processed = 0;
    while (!q.empty()) {
        int curr = q.front();
        q.pop();
        processed++;

        for (int neighbor : adj[curr]) {
            if (--inDegree[neighbor] == 0) {
                q.push(neighbor);
            }
        }
    }
    return processed == numCourses;
}`,
        python: `from collections import deque

def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    adj = [[] for _ in range(numCourses)]
    in_degree = [0] * numCourses

    for dest, src in prerequisites:
        adj[src].append(dest)
        in_degree[dest] += 1

    queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
    processed = 0

    while queue:
        curr = queue.popleft()
        processed += 1
        for neighbor in adj[curr]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return processed == numCourses`,
        javascript: `var canFinish = function(numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);

    for (const [dest, src] of prerequisites) {
        adj[src].push(dest);
        inDegree[dest]++;
    }

    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    let processed = 0;
    let head = 0;
    while (head < queue.length) {
        const curr = queue[head++];
        processed++;
        for (const neighbor of adj[curr]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    return processed === numCourses;
};`,
      },
      timeComplexity: "O(V + E) where V = numCourses, E = prerequisites.length",
      spaceComplexity: "O(V + E) for adjacency list and in-degree array",
      whyOptimal:
        "Every vertex and edge is processed exactly once, yielding optimal linear graph traversal.",
    },
    pattern: "Topological Sort / Kahn's Algorithm",
    complexitySummary: {
      time: "O(V + E)",
      space: "O(V + E)",
    },
    dryRun: {
      sampleInput: "numCourses = 2, prerequisites = [[1, 0]]",
      steps: [
        { stepNumber: 1, state: "Build Graph", action: "inDegree[0]=0, inDegree[1]=1", result: "queue = [0]" },
        { stepNumber: 2, state: "Poll 0", action: "processed=1, decrement neighbor 1: inDegree[1]=0", result: "queue = [1]" },
        { stepNumber: 3, state: "Poll 1", action: "processed=2, no outgoing edges", result: "queue = []" },
        { stepNumber: 4, state: "Verify", action: "processed (2) == numCourses (2)", result: "returns true" },
      ],
    },
    commonMistakes: [
      {
        mistake: "Reversing edge direction: treating [a, b] as a -> b instead of b -> a",
        why: "To take course a, b must be completed first, so the dependency edge flows from b to a.",
        fix: "`adj.get(p[1]).add(p[0])` and `inDegree[p[0]]++`.",
      },
    ],
    variations: [
      "Course Schedule II (Return the actual order of courses)",
      "Alien Dictionary (Derive topological character ordering)",
      "Minimum Height Trees",
    ],
    practice: [
      { title: "Course Schedule II", difficulty: "Medium" },
      { title: "Alien Dictionary", difficulty: "Hard" },
    ],
    tags: ["Graph", "Topological Sort", "BFS", "DFS", "DAG"],
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Uber", "Apple"],
  },
  {
    id: "validate-binary-search-tree",
    slug: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    topic: "Binary Trees",
    topicSlug: "bst",
    subtopic: "BST Invariant & Bounded Recursion",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: The left subtree of a node contains only nodes with keys strictly less than the node's key; the right subtree of a node contains only nodes with keys strictly greater than the node's key; both the left and right subtrees must also be binary search trees.",
    understandTheProblem:
      "Every node in a BST must satisfy the global property: all nodes in its left subtree are strictly smaller, and all nodes in its right subtree are strictly larger. Checking only immediate children is insufficient!",
    constraints: [
      "The number of nodes in the tree is in the range [1, 10^4].",
      "-2^31 <= Node.val <= 2^31 - 1",
    ],
    examples: [
      {
        input: "root = [2, 1, 3]",
        output: "true",
        explanation: "Left child 1 < 2, right child 3 > 2. Valid BST.",
      },
      {
        input: "root = [5, 1, 4, null, null, 3, 6]",
        output: "false",
        explanation: "The root node's value is 5 but its right child's value is 4, which is not > 5.",
      },
    ],
    hints: [
      "It is NOT enough that node.left.val < node.val and node.right.val > node.val.",
      "Pass inherited range boundaries `(min, max)` down through recursion.",
      "Alternatively: The in-order traversal of a valid BST must produce a strictly increasing sequence!",
    ],
    bruteForce: {
      title: "Approach 1 — In-Order Traversal into Array",
      intuition:
        "Perform in-order traversal (Left, Root, Right) to collect all values into an array. Verify that the array is strictly increasing.",
      code: {
        java: `public boolean isValidBST(TreeNode root) {
    List<Integer> list = new ArrayList<>();
    inorder(root, list);
    for (int i = 1; i < list.size(); i++) {
        if (list.get(i) <= list.get(i - 1)) return false;
    }
    return true;
}
void inorder(TreeNode node, List<Integer> list) {
    if (node == null) return;
    inorder(node.left, list);
    list.add(node.val);
    inorder(node.right, list);
}`,
        cpp: `bool isValidBST(TreeNode* root) {
    vector<int> list;
    inorder(root, list);
    for (size_t i = 1; i < list.size(); i++) {
        if (list[i] <= list[i - 1]) return false;
    }
    return true;
}
void inorder(TreeNode* node, vector<int>& list) {
    if (!node) return;
    inorder(node->left, list);
    list.push_back(node->val);
    inorder(node->right, list);
}`,
        python: `def isValidBST(root: TreeNode) -> bool:
    vals = []
    def inorder(node):
        if not node: return
        inorder(node.left)
        vals.append(node.val)
        inorder(node.right)
    inorder(root)
    return all(vals[i] > vals[i - 1] for i in range(1, len(vals)))`,
        javascript: `var isValidBST = function(root) {
    const list = [];
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        list.push(node.val);
        inorder(node.right);
    }
    inorder(root);
    for (let i = 1; i < list.length; i++) {
        if (list[i] <= list[i - 1]) return false;
    }
    return true;
};`,
      },
      timeComplexity: "O(N)",
      spaceComplexity: "O(N) to store values in array",
      explanation:
        "Stores the entire tree in an auxiliary list, using O(N) memory rather than checking boundaries during traversal.",
    },
    optimalSolution: {
      title: "Approach 2 — Recursive Range Bounding (min, max) in O(1) Space",
      intuition:
        "Each node inherits an allowed interval `(min, max)`. Root starts with `(-infinity, +infinity)`. For left child, range becomes `(min, root.val)`. For right child, range becomes `(root.val, max)`. If any node violates its interval, return false immediately.",
      code: {
        java: `public class ValidateBST {
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private boolean validate(TreeNode node, long min, long max) {
        if (node == null) return true;
        if (node.val <= min || node.val >= max) return false;
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }
}`,
        cpp: `bool isValidBST(TreeNode* root) {
    return validate(root, LONG_MIN, LONG_MAX);
}
bool validate(TreeNode* node, long minVal, long maxVal) {
    if (!node) return true;
    if (node->val <= minVal || node->val >= maxVal) return false;
    return validate(node->left, minVal, node->val) && validate(node->right, node->val, maxVal);
}`,
        python: `def isValidBST(root: TreeNode) -> bool:
    def validate(node, min_val, max_val):
        if not node: return True
        if node.val <= min_val or node.val >= max_val: return False
        return validate(node.left, min_val, node.val) and validate(node.right, node.val, max_val)
    return validate(root, float('-inf'), float('inf'))`,
        javascript: `var isValidBST = function(root) {
    function validate(node, min, max) {
        if (!node) return true;
        if (node.val <= min || node.val >= max) return false;
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }
    return validate(root, -Infinity, Infinity);
};`,
      },
      timeComplexity: "O(N) single pass",
      spaceComplexity: "O(H) auxiliary space on call stack (H = tree height)",
      whyOptimal:
        "Validates constraints in-place without allocating auxiliary lists, pruning immediately upon the first violation.",
    },
    pattern: "Binary Search Tree / Invariant Bounds",
    complexitySummary: {
      time: "O(N)",
      space: "O(H)",
    },
    dryRun: {
      sampleInput: "root = [5, 1, 4, null, null, 3, 6]",
      steps: [
        { stepNumber: 1, state: "node = 5", action: "validate(5, -inf, +inf): valid", result: "recurse left and right" },
        { stepNumber: 2, state: "left = 1", action: "validate(1, -inf, 5): valid", result: "left subtree valid" },
        { stepNumber: 3, state: "right = 4", action: "validate(4, 5, +inf): 4 <= 5 (VIOLATION!)", result: "returns false immediately" },
      ],
    },
    commonMistakes: [
      {
        mistake: "Using Integer.MIN_VALUE / Integer.MAX_VALUE as initial bounds",
        why: "If a tree node contains Integer.MIN_VALUE as its value, `node.val <= min` evaluates to true and incorrectly marks a valid tree as invalid.",
        fix: "Use `Long.MIN_VALUE` and `Long.MAX_VALUE` or `null` objects.",
      },
    ],
    variations: [
      "Kth Smallest Element in a BST",
      "Lowest Common Ancestor of a BST",
    ],
    practice: [
      { title: "Kth Smallest Element in a BST", difficulty: "Medium" },
      { title: "Lowest Common Ancestor of a Binary Search Tree", difficulty: "Medium" },
    ],
    tags: ["Tree", "Depth-First Search", "Binary Search Tree", "Binary Tree"],
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Bloomberg"],
  },
  {
    id: "binary-tree-maximum-path-sum",
    slug: "binary-tree-maximum-path-sum",
    title: "Binary Tree Maximum Path Sum",
    topic: "Trees & Graphs",
    topicSlug: "trees",
    subtopic: "Post-order DFS / Subtree Contribution",
    difficulty: "Hard",
    progressionLevel: "Level 4: Optimization",
    statement:
      "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root. The path sum of a path is the sum of the node's values in the path. Given the root of a binary tree, return the maximum path sum of any non-empty path.",
    understandTheProblem:
      "A valid path can turn at most once (at the highest ancestor in the path). At that turning node, the path sum is `node.val + max(0, leftGain) + max(0, rightGain)`. When returning a value to the parent node, however, the path cannot fork; it can only extend along the single best branch: `node.val + max(0, max(leftGain, rightGain))`.",
    constraints: [
      "The number of nodes in the tree is in the range [1, 3 * 10^4].",
      "-1000 <= Node.val <= 1000",
    ],
    examples: [
      {
        input: "root = [1, 2, 3]",
        output: "6",
        explanation: "The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.",
      },
      {
        input: "root = [-10, 9, 20, null, null, 15, 7]",
        output: "42",
        explanation: "The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.",
      },
    ],
    hints: [
      "Use post-order traversal: compute the maximum gain obtainable from the left and right subtrees before processing the current node.",
      "If a subtree's maximum path sum is negative, ignore it by clamping to 0 (`Math.max(0, gain)`).",
      "Update a global maximum variable with `node.val + leftGain + rightGain`.",
      "Return `node.val + max(leftGain, rightGain)` to the caller because a parent can only continue the path through one branch.",
    ],
    bruteForce: {
      title: "Approach 1 — All Pairs DFS Path Enumeration",
      intuition:
        "For every node, consider it as the peak/turning point. Run a DFS to find the maximum downward paths into the left and right subtrees.",
      code: {
        java: `class Solution {
    private int maxPath = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root) {
        traverse(root);
        return maxPath;
    }

    private void traverse(TreeNode node) {
        if (node == null) return;
        int left = Math.max(0, maxBranch(node.left));
        int right = Math.max(0, maxBranch(node.right));
        maxPath = Math.max(maxPath, node.val + left + right);
        traverse(node.left);
        traverse(node.right);
    }

    private int maxBranch(TreeNode node) {
        if (node == null) return 0;
        return node.val + Math.max(0, Math.max(maxBranch(node.left), maxBranch(node.right)));
    }
}`,
        cpp: `#include <algorithm>
#include <climits>
using namespace std;

class Solution {
    int maxPath = INT_MIN;
public:
    int maxPathSum(TreeNode* root) {
        traverse(root);
        return maxPath;
    }

private:
    void traverse(TreeNode* node) {
        if (!node) return;
        int left = max(0, maxBranch(node->left));
        int right = max(0, maxBranch(node->right));
        maxPath = max(maxPath, node->val + left + right);
        traverse(node->left);
        traverse(node->right);
    }

    int maxBranch(TreeNode* node) {
        if (!node) return 0;
        return node->val + max(0, max(maxBranch(node->left), maxBranch(node->right)));
    }
};`,
        python: `class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        self.max_path = float("-inf")

        def max_branch(node):
            if not node:
                return 0
            return node.val + max(0, max(max_branch(node.left), max_branch(node.right)))

        def traverse(node):
            if not node:
                return
            left = max(0, max_branch(node.left))
            right = max(0, max_branch(node.right))
            self.max_path = max(self.max_path, node.val + left + right)
            traverse(node.left)
            traverse(node.right)

        traverse(root)
        return self.max_path`,
        javascript: `var maxPathSum = function(root) {
    let maxPath = -Infinity;

    function maxBranch(node) {
        if (!node) return 0;
        return node.val + Math.max(0, Math.max(maxBranch(node.left), maxBranch(node.right)));
    }

    function traverse(node) {
        if (!node) return;
        const left = Math.max(0, maxBranch(node.left));
        const right = Math.max(0, maxBranch(node.right));
        maxPath = Math.max(maxPath, node.val + left + right);
        traverse(node.left);
        traverse(node.right);
    }

    traverse(root);
    return maxPath;
};`,
      },
      timeComplexity: "O(N^2) — For each of the N nodes, recomputes downward branch sums in O(N).",
      spaceComplexity: "O(H) — Recursion stack depth.",
      explanation: "Computes single branch sums redundantly for every node in the tree.",
    },
    optimalSolution: {
      title: "Approach 2 — Bottom-Up Post-Order DFS with Single-Pass Contribution",
      intuition:
        "In a single post-order traversal, each recursive call computes and returns the maximum single-path gain extending from the current node downwards (`node.val + max(leftGain, rightGain)`). Simultaneously, the maximum arch path through the current node (`node.val + leftGain + rightGain`) updates the global maximum.",
      code: {
        java: `class Solution {
    private int maxSum = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root) {
        maxGain(root);
        return maxSum;
    }

    private int maxGain(TreeNode node) {
        if (node == null) return 0;

        // Post-order: compute gains from subtrees, clamped to 0
        int leftGain = Math.max(0, maxGain(node.left));
        int rightGain = Math.max(0, maxGain(node.right));

        // The path turning at this node
        int currentPathSum = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, currentPathSum);

        // Return the single branch gain to the parent
        return node.val + Math.max(leftGain, rightGain);
    }
}`,
        cpp: `#include <algorithm>
#include <climits>
using namespace std;

class Solution {
    int maxSum = INT_MIN;
public:
    int maxPathSum(TreeNode* root) {
        maxGain(root);
        return maxSum;
    }

private:
    int maxGain(TreeNode* node) {
        if (!node) return 0;

        int leftGain = max(0, maxGain(node->left));
        int rightGain = max(0, maxGain(node->right));

        int currentPathSum = node->val + leftGain + rightGain;
        maxSum = max(maxSum, currentPathSum);

        return node->val + max(leftGain, rightGain);
    }
};`,
        python: `class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        max_sum = float("-inf")

        def max_gain(node: Optional[TreeNode]) -> int:
            nonlocal max_sum
            if not node:
                return 0

            left_gain = max(0, max_gain(node.left))
            right_gain = max(0, max_gain(node.right))

            current_path = node.val + left_gain + right_gain
            max_sum = max(max_sum, current_path)

            return node.val + max(left_gain, right_gain)

        max_gain(root)
        return max_sum`,
        javascript: `var maxPathSum = function(root) {
    let maxSum = -Infinity;

    function maxGain(node) {
        if (!node) return 0;

        const leftGain = Math.max(0, maxGain(node.left));
        const rightGain = Math.max(0, maxGain(node.right));

        const currentPath = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, currentPath);

        return node.val + Math.max(leftGain, rightGain);
    }

    maxGain(root);
    return maxSum;
};`,
      },
      timeComplexity: "O(N) — Every node visited exactly once in post-order.",
      spaceComplexity: "O(H) — Height of tree for call stack (O(log N) balanced, O(N) worst-case skew).",
      explanation: "Computes subtree gains bottom-up, simultaneously updating the overall maximum path turning at each node.",
      whyOptimal: "Strictly visits each node once and allocates no extra heap structures.",
    },
    pattern: "Binary Tree Post-Order DFS / Dynamic Programming on Trees",
    complexitySummary: {
      time: "O(N)",
      space: "O(H)",
    },
    dryRun: {
      sampleInput: "root = [-10, 9, 20, null, null, 15, 7]",
      steps: [
        {
          stepNumber: 1,
          state: "Leaf 9",
          action: "leftGain=0, rightGain=0. currentPath = 9 + 0 + 0 = 9. maxSum = 9. Return 9.",
          result: "node 9 gain = 9",
        },
        {
          stepNumber: 2,
          state: "Leaf 15 and Leaf 7",
          action: "gain(15) = 15, gain(7) = 7.",
          result: "Leaf gains computed.",
        },
        {
          stepNumber: 3,
          state: "Node 20",
          action: "leftGain=15, rightGain=7. currentPath = 20 + 15 + 7 = 42. maxSum = 42. Return 20 + max(15, 7) = 35.",
          result: "node 20 returns 35 to root.",
        },
        {
          stepNumber: 4,
          state: "Root -10",
          action: "leftGain=9, rightGain=35. currentPath = -10 + 9 + 35 = 34. 34 < 42.",
          result: "maxSum remains 42.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Returning the turning path sum (node.val + left + right) to the parent",
        fix: "A path cannot fork. When returning to the parent, you must return `node.val + max(left, right)`.",
      },
      {
        mistake: "Failing to clamp negative subtree gains to 0",
        fix: "If a subtree has a negative sum, including it makes the path strictly worse. Always use `Math.max(0, gain)`.",
      },
    ],
    variations: [
      "Diameter of Binary Tree (longest path in edges)",
      "Path Sum III (paths pointing strictly downwards)",
      "Binary Tree Longest Consecutive Sequence",
    ],
    practice: [
      { title: "Diameter of Binary Tree", difficulty: "Easy" },
      { title: "Path Sum III", difficulty: "Medium" },
    ],
    tags: ["Dynamic Programming", "Tree", "Depth-First Search", "Binary Tree"],
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Apple", "ByteDance"],
  },
  {
    id: "word-ladder",
    slug: "word-ladder",
    title: "Word Ladder",
    topic: "Trees & Graphs",
    topicSlug: "graphs",
    subtopic: "BFS Shortest Path in Unweighted Graph",
    difficulty: "Hard",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: 1. Every adjacent pair of words differs by a single letter; 2. Every si for 1 <= i <= k is in wordList (note that beginWord does not need to be in wordList); 3. sk == endWord. Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
    understandTheProblem:
      "We want to find the shortest transformation path between two words where each step changes exactly one letter, and all intermediate words exist in the dictionary. Because all edges have equal weight (cost = 1 word step), Breadth-First Search (BFS) guarantees finding the shortest sequence without exploring redundant deeper paths.",
    constraints: [
      "1 <= beginWord.length <= 10",
      "endWord.length == beginWord.length",
      "1 <= wordList.length <= 5000",
      "wordList[i].length == beginWord.length",
      "beginWord, endWord, and wordList[i] consist of lowercase English letters.",
      "beginWord != endWord",
      "All the words in wordList are unique.",
    ],
    examples: [
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: "5",
        explanation: 'One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog", which is 5 words long.',
      },
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
        output: "0",
        explanation: 'The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.',
      },
    ],
    hints: [
      "Shortest path in an unweighted graph is solved with BFS level-by-level traversal.",
      "If `endWord` is not in `wordList`, no transformation is possible; return 0 immediately.",
      "To find valid neighbors for word of length L, iterate through each of the L character positions and try substituting all 26 lowercase English letters. Check for presence in dictionary set in O(1) time.",
      "Remove words from the dictionary set upon enqueueing to avoid infinite cycles and duplicate exploration.",
    ],
    bruteForce: {
      title: "Approach 1 — Depth-First Search with Backtracking",
      intuition:
        "Explore all possible transformation paths using DFS, tracking visited words in a set and recording the minimum depth that reaches endWord.",
      code: {
        java: `import java.util.*;

class Solution {
    private int minLen = Integer.MAX_VALUE;

    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> dict = new HashSet<>(wordList);
        if (!dict.contains(endWord)) return 0;
        Set<String> visited = new HashSet<>();
        visited.add(beginWord);
        dfs(beginWord, endWord, dict, visited, 1);
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }

    private void dfs(String curr, String target, Set<String> dict, Set<String> visited, int depth) {
        if (curr.equals(target)) {
            minLen = Math.min(minLen, depth);
            return;
        }
        if (depth >= minLen) return;

        char[] chars = curr.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            char orig = chars[i];
            for (char c = 'a'; c <= 'z'; c++) {
                if (c == orig) continue;
                chars[i] = c;
                String next = new String(chars);
                if (dict.contains(next) && !visited.contains(next)) {
                    visited.add(next);
                    dfs(next, target, dict, visited, depth + 1);
                    visited.remove(next);
                }
            }
            chars[i] = orig;
        }
    }
}`,
        cpp: `#include <string>
#include <vector>
#include <unordered_set>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
    int minLen = INT_MAX;
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (!dict.count(endWord)) return 0;
        unordered_set<string> visited;
        visited.insert(beginWord);
        dfs(beginWord, endWord, dict, visited, 1);
        return minLen == INT_MAX ? 0 : minLen;
    }

private:
    void dfs(string curr, const string& target, unordered_set<string>& dict, unordered_set<string>& visited, int depth) {
        if (curr == target) {
            minLen = min(minLen, depth);
            return;
        }
        if (depth >= minLen) return;

        for (int i = 0; i < (int)curr.size(); i++) {
            char orig = curr[i];
            for (char c = 'a'; c <= 'z'; c++) {
                if (c == orig) continue;
                curr[i] = c;
                if (dict.count(curr) && !visited.count(curr)) {
                    visited.insert(curr);
                    dfs(curr, target, dict, visited, depth + 1);
                    visited.erase(curr);
                }
            }
            curr[i] = orig;
        }
    }
};`,
        python: `class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        words = set(wordList)
        if endWord not in words:
            return 0

        min_len = float("inf")
        visited = {beginWord}

        def dfs(curr, depth):
            nonlocal min_len
            if curr == endWord:
                min_len = min(min_len, depth)
                return
            if depth >= min_len:
                return

            for i in range(len(curr)):
                for c in "abcdefghijklmnopqrstuvwxyz":
                    nxt = curr[:i] + c + curr[i+1:]
                    if nxt in words and nxt not in visited:
                        visited.add(nxt)
                        dfs(nxt, depth + 1)
                        visited.remove(nxt)

        dfs(beginWord, 1)
        return min_len if min_len != float("inf") else 0`,
        javascript: `var ladderLength = function(beginWord, endWord, wordList) {
    const dict = new Set(wordList);
    if (!dict.has(endWord)) return 0;

    let minLen = Infinity;
    const visited = new Set([beginWord]);

    function dfs(curr, depth) {
        if (curr === endWord) {
            minLen = Math.min(minLen, depth);
            return;
        }
        if (depth >= minLen) return;

        const chars = curr.split("");
        for (let i = 0; i < chars.length; i++) {
            const orig = chars[i];
            for (let c = 97; c <= 122; c++) {
                const char = String.fromCharCode(c);
                if (char === orig) continue;
                chars[i] = char;
                const next = chars.join("");
                if (dict.has(next) && !visited.has(next)) {
                    visited.add(next);
                    dfs(next, depth + 1);
                    visited.delete(next);
                }
            }
            chars[i] = orig;
        }
    }

    dfs(beginWord, 1);
    return minLen === Infinity ? 0 : minLen;
};`,
      },
      timeComplexity: "O(26^L * N) — Exponential branch factor in worst case DFS.",
      spaceComplexity: "O(N) — Recursion stack depth.",
      explanation: "Traverses all valid transformation routes exhaustively before finding the minimum.",
    },
    optimalSolution: {
      title: "Approach 2 — Breadth-First Search (BFS) with Word Mutation",
      intuition:
        "Put `wordList` into a HashSet. Push `beginWord` into a queue. For each level, mutate each character of the dequeued word across all 26 letters. When a mutated word exists in `wordSet`, remove it from the set (marking visited) and enqueue it. The first time `endWord` is dequeued, the current BFS level is guaranteed to be the shortest path.",
      code: {
        java: `import java.util.*;

class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> dict = new HashSet<>(wordList);
        if (!dict.contains(endWord)) return 0;

        Queue<String> queue = new ArrayDeque<>();
        queue.offer(beginWord);
        dict.remove(beginWord);

        int level = 1;

        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int k = 0; k < size; k++) {
                String word = queue.poll();
                if (word.equals(endWord)) return level;

                char[] chars = word.toCharArray();
                for (int i = 0; i < chars.length; i++) {
                    char original = chars[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == original) continue;
                        chars[i] = c;
                        String nextWord = new String(chars);

                        if (dict.remove(nextWord)) {
                            queue.offer(nextWord);
                        }
                    }
                    chars[i] = original;
                }
            }
            level++;
        }

        return 0;
    }
}`,
        cpp: `#include <string>
#include <vector>
#include <queue>
#include <unordered_set>
using namespace std;

class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (!dict.count(endWord)) return 0;

        queue<string> q;
        q.push(beginWord);
        dict.erase(beginWord);

        int level = 1;

        while (!q.empty()) {
            int size = q.size();
            for (int k = 0; k < size; k++) {
                string word = q.front();
                q.pop();

                if (word == endWord) return level;

                for (int i = 0; i < (int)word.size(); i++) {
                    char orig = word[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == orig) continue;
                        word[i] = c;
                        if (dict.count(word)) {
                            dict.erase(word);
                            q.push(word);
                        }
                    }
                    word[i] = orig;
                }
            }
            level++;
        }

        return 0;
    }
};`,
        python: `from collections import deque

class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        words = set(wordList)
        if endWord not in words:
            return 0

        queue = deque([beginWord])
        if beginWord in words:
            words.remove(beginWord)

        level = 1

        while queue:
            for _ in range(len(queue)):
                word = queue.popleft()
                if word == endWord:
                    return level

                for i in range(len(word)):
                    for c in "abcdefghijklmnopqrstuvwxyz":
                        nxt = word[:i] + c + word[i+1:]
                        if nxt in words:
                            words.remove(nxt)
                            queue.append(nxt)
            level += 1

        return 0`,
        javascript: `var ladderLength = function(beginWord, endWord, wordList) {
    const dict = new Set(wordList);
    if (!dict.has(endWord)) return 0;

    const queue = [beginWord];
    dict.delete(beginWord);

    let level = 1;

    while (queue.length > 0) {
        const size = queue.length;
        for (let k = 0; k < size; k++) {
            const word = queue.shift();
            if (word === endWord) return level;

            const chars = word.split("");
            for (let i = 0; i < chars.length; i++) {
                const orig = chars[i];
                for (let c = 97; c <= 122; c++) {
                    const char = String.fromCharCode(c);
                    if (char === orig) continue;
                    chars[i] = char;
                    const next = chars.join("");
                    if (dict.has(next)) {
                        dict.delete(next);
                        queue.push(next);
                    }
                }
                chars[i] = orig;
            }
        }
        level++;
    }

    return 0;
};`,
      },
      timeComplexity: "O(M^2 * N) where M is word length and N is wordList size — Trying 26 mutations per character takes 26 * M * M (for string construction), done at most N times.",
      spaceComplexity: "O(M * N) — Storage for dictionary HashSet and BFS queue.",
      explanation: "Explores the graph layer by layer; the first arrival at endWord is mathematically guaranteed to be the shortest path.",
      whyOptimal: "Guarantees optimal shortest path identification without exploring branches deeper than the solution level.",
    },
    pattern: "Breadth-First Search / Shortest Path in Unweighted Graph",
    complexitySummary: {
      time: "O(M^2 * N)",
      space: "O(M * N)",
    },
    dryRun: {
      sampleInput: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
      steps: [
        {
          stepNumber: 1,
          state: "Level 1: queue=['hit']",
          action: "Mutate 'hit' -> finds 'hot' in dict. Enqueue 'hot', remove from dict.",
          result: "Level 1 finished.",
        },
        {
          stepNumber: 2,
          state: "Level 2: queue=['hot']",
          action: "Mutate 'hot' -> finds 'dot' and 'lot'. Enqueue both.",
          result: "queue=['dot', 'lot']",
        },
        {
          stepNumber: 3,
          state: "Level 3: queue=['dot', 'lot']",
          action: "'dot' produces 'dog', 'lot' produces 'log'. Enqueue both.",
          result: "queue=['dog', 'log']",
        },
        {
          stepNumber: 4,
          state: "Level 4: queue=['dog', 'log']",
          action: "'dog' produces 'cog'. Enqueue 'cog'.",
          result: "queue=['cog']",
        },
        {
          stepNumber: 5,
          state: "Level 5: word == 'cog'",
          action: "word.equals(endWord) matches!",
          result: "Returns 5.",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Checking all pairs in wordList (O(N^2 * M)) to build an adjacency list",
        fix: "When N is large (5000) and M is small (<= 10), checking 26 * M mutations against a HashSet is vastly faster than comparing all pairs of words.",
      },
      {
        mistake: "Forgetting to remove words from dict upon enqueueing",
        fix: "If you don't remove words when enqueued, other paths will re-enqueue them, leading to exponential queue growth and TLE.",
      },
    ],
    variations: [
      "Word Ladder II (output all shortest transformation sequences)",
      "Minimum Genetic Mutation",
      "Open the Lock",
    ],
    practice: [
      { title: "Word Ladder II", difficulty: "Hard" },
      { title: "Minimum Genetic Mutation", difficulty: "Medium" },
      { title: "Open the Lock", difficulty: "Medium" },
    ],
    tags: ["Hash Table", "String", "Breadth-First Search"],
    companies: ["Google", "Amazon", "Meta", "LinkedIn", "Microsoft", "Bloomberg"],
  },
];

