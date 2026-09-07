import { Problem } from "@/types/content";

export const treeGraphProblems: Problem[] = [
  {
    id: "maximum-depth-of-binary-tree",
    slug: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    topic: "Trees",
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
];
