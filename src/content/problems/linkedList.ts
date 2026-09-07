import { Problem } from "@/types/content";

export const linkedListProblems: Problem[] = [
  {
    id: "reverse-linked-list",
    slug: "reverse-linked-list",
    title: "Reverse Linked List",
    topic: "Linked Lists",
    subtopic: "Pointer Manipulation",
    difficulty: "Easy",
    progressionLevel: "Level 1: Concept Understanding",
    statement:
      "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    understandTheProblem:
      "A singly linked list has nodes pointing forward: `A -> B -> C -> null`. Reversing it means every node must point backward: `null <- A <- B <- C`, and the new head returned should be `C`.",
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000",
    ],
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: "1->2->3->4->5 becomes 5->4->3->2->1.",
      },
      {
        input: "head = [1,2]",
        output: "[2,1]",
        explanation: "1->2 becomes 2->1.",
      },
      {
        input: "head = []",
        output: "[]",
        explanation: "Reversing an empty list returns null.",
      },
    ],
    hints: [
      "Keep track of three pointers at each step: `prev`, `curr`, and `nextTemp`.",
      "Before altering `curr.next`, save the rest of the list: `nextTemp = curr.next`.",
      "Point `curr.next` backward to `prev`: `curr.next = prev`.",
      "Advance: `prev = curr`, `curr = nextTemp`.",
    ],
    bruteForce: {
      title: "Approach 1 — Array / Stack Value Extraction",
      intuition:
        "Traverse the list, store all values in an array or stack, and then reassign values or create new nodes in reversed order.",
      code: {
        java: `import java.util.ArrayList;
import java.util.List;

class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null) return null;
        List<Integer> vals = new ArrayList<>();
        ListNode curr = head;
        while (curr != null) {
            vals.add(curr.val);
            curr = curr.next;
        }

        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        for (int i = vals.size() - 1; i >= 0; i--) {
            tail.next = new ListNode(vals.get(i));
            tail = tail.next;
        }
        return dummy.next;
    }
}`,
        cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if (!head) return nullptr;
        vector<int> vals;
        ListNode* curr = head;
        while (curr) {
            vals.push_back(curr->val);
            curr = curr->next;
        }

        ListNode dummy(0);
        ListNode* tail = &dummy;
        for (int i = vals.size() - 1; i >= 0; i--) {
            tail->next = new ListNode(vals[i]);
            tail = tail->next;
        }
        return dummy.next;
    }
};`,
        python: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head:
            return None
        vals = []
        curr = head
        while curr:
            vals.append(curr.val)
            curr = curr.next

        dummy = ListNode(0)
        tail = dummy
        for val in reversed(vals):
            tail.next = ListNode(val)
            tail = tail.next
        return dummy.next`,
        javascript: `var reverseList = function(head) {
    if (!head) return null;
    const vals = [];
    let curr = head;
    while (curr) {
        vals.push(curr.val);
        curr = curr.next;
    }

    const dummy = new ListNode(0);
    let tail = dummy;
    for (let i = vals.length - 1; i >= 0; i--) {
        tail.next = new ListNode(vals[i]);
        tail = tail.next;
    }
    return dummy.next;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      explanation:
        "Requires allocating an auxiliary list of size n and creating n new node objects.",
    },
    optimalSolution: {
      title: "Approach 2 — In-Place Iterative Three Pointers",
      intuition:
        "Iterate through the list while maintaining `prev = null` and `curr = head`. At each step, preserve `nextTemp = curr.next`, redirect `curr.next = prev`, and advance `prev = curr`, `curr = nextTemp`. When `curr` becomes null, `prev` points to the new head.",
      code: {
        java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }

        return prev;
    }
}`,
        cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;

        while (curr != nullptr) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }

        return prev;
    }
};`,
        python: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head

        while curr:
            next_temp = curr.next
            curr.next = prev
            prev = curr
            curr = next_temp

        return prev`,
        javascript: `var reverseList = function(head) {
    let prev = null;
    let curr = head;

    while (curr !== null) {
        const nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }

    return prev;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      whyOptimal:
        "Single pass over the n nodes. Each node pointer is modified in-place using O(1) extra variables.",
    },
    pattern: "In-Place Pointer Manipulation",
    complexitySummary: {
      time: "O(n)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "1 -> 2 -> 3 -> null",
      steps: [
        {
          stepNumber: 1,
          state: "prev=null, curr=1",
          action: "nextTemp=2. curr.next=null. prev=1, curr=2.",
          result: "1 points to null.",
        },
        {
          stepNumber: 2,
          state: "prev=1, curr=2",
          action: "nextTemp=3. curr.next=1. prev=2, curr=3.",
          result: "2 points to 1.",
        },
        {
          stepNumber: 3,
          state: "prev=2, curr=3",
          action: "nextTemp=null. curr.next=2. prev=3, curr=null.",
          result: "3 points to 2.",
        },
        {
          stepNumber: 4,
          state: "curr is null",
          action: "Loop terminates. Return prev (node 3).",
          result: "Result list: 3 -> 2 -> 1 -> null",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Overwriting curr.next before storing the remaining nodes",
        fix: "Always save `nextTemp = curr.next` before assigning `curr.next = prev` to avoid losing reference to the rest of the list.",
      },
      {
        mistake: "Returning curr instead of prev after the loop",
        fix: "When the loop terminates, `curr` is null, while `prev` is on the last processed node (the new head). Return `prev`.",
      },
    ],
    variations: [
      "Reverse Linked List II (reverse from position left to right)",
      "Reverse Nodes in k-Group",
      "Palindrome Linked List",
    ],
    practice: [
      { title: "Reverse Linked List II", difficulty: "Medium" },
      { title: "Palindrome Linked List", difficulty: "Easy" },
    ],
    tags: ["Linked List", "Recursion"],
    companies: ["Amazon", "Microsoft", "Apple", "Google", "Adobe"],
  },
  {
    id: "linked-list-cycle",
    slug: "linked-list-cycle",
    title: "Linked List Cycle",
    topic: "Linked Lists",
    subtopic: "Fast & Slow Pointers (Floyd's Tortoise and Hare)",
    difficulty: "Easy",
    progressionLevel: "Level 2: Basic Implementation",
    statement:
      "Given `head`, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Return `true` if there is a cycle in the linked list. Otherwise, return `false`.",
    understandTheProblem:
      "If a linked list loops back on itself anywhere, an infinite traversal loop exists. We must detect whether such a loop exists without modifying the list structure.",
    constraints: [
      "The number of the nodes in the list is in the range [0, 10^4].",
      "-10^5 <= Node.val <= 10^5",
    ],
    examples: [
      {
        input: "head = [3,2,0,-4], pos = 1 (tail connects to index 1)",
        output: "true",
        explanation: "There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).",
      },
      {
        input: "head = [1,2], pos = 0 (tail connects to index 0)",
        output: "true",
        explanation: "There is a cycle in the linked list, where the tail connects to the 0th node.",
      },
      {
        input: "head = [1], pos = -1",
        output: "false",
        explanation: "There is no cycle in the linked list.",
      },
    ],
    hints: [
      "Can two runners moving at different speeds on a circular track ever meet?",
      "If you advance a slow pointer by 1 step and a fast pointer by 2 steps, will fast eventually catch up to slow if a cycle exists?",
      "If there is no cycle, fast will simply hit null.",
    ],
    bruteForce: {
      title: "Approach 1 — Hash Set of Visited Nodes",
      intuition:
        "Traverse the list and insert every visited node reference into a Hash Set. If we ever encounter a node that is already in the set, a cycle exists.",
      code: {
        java: `import java.util.HashSet;
import java.util.Set;

class Solution {
    public boolean hasCycle(ListNode head) {
        Set<ListNode> seen = new HashSet<>();
        ListNode curr = head;
        while (curr != null) {
            if (seen.contains(curr)) {
                return true;
            }
            seen.add(curr);
            curr = curr.next;
        }
        return false;
    }
}`,
        cpp: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        unordered_set<ListNode*> seen;
        ListNode* curr = head;
        while (curr != nullptr) {
            if (seen.count(curr)) {
                return true;
            }
            seen.insert(curr);
            curr = curr->next;
        }
        return false;
    }
};`,
        python: `class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        seen = set()
        curr = head
        while curr:
            if curr in seen:
                return True
            seen.add(curr)
            curr = curr.next
        return False`,
        javascript: `var hasCycle = function(head) {
    const seen = new Set();
    let curr = head;
    while (curr !== null) {
        if (seen.has(curr)) {
            return true;
        }
        seen.add(curr);
        curr = curr.next;
    }
    return false;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      explanation:
        "Tracks all n nodes in a hash set, using O(n) auxiliary heap memory.",
    },
    optimalSolution: {
      title: "Approach 2 — Floyd's Tortoise and Hare (Two Pointers)",
      intuition:
        "Initialize `slow = head` and `fast = head`. In each step, move `slow` by 1 node (`slow = slow.next`) and `fast` by 2 nodes (`fast = fast.next.next`). If the list is acyclic, `fast` or `fast.next` will reach `null`. If a cycle exists, `fast` enters the cycle and reduces the distance to `slow` by 1 node each step until `slow == fast`.",
      code: {
        java: `class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) {
            return false;
        }

        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                return true;
            }
        }

        return false;
    }
}`,
        cpp: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        if (!head || !head->next) return false;

        ListNode* slow = head;
        ListNode* fast = head;

        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;

            if (slow == fast) {
                return true;
            }
        }

        return false;
    }
};`,
        python: `class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        if not head or not head.next:
            return False

        slow = head
        fast = head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

            if slow == fast:
                return True

        return False`,
        javascript: `var hasCycle = function(head) {
    if (!head || !head.next) return false;

    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            return true;
        }
    }

    return false;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      whyOptimal:
        "Floyd's algorithm runs in O(n) time and uses only two pointer references without any extra heap allocation.",
    },
    pattern: "Fast & Slow Pointers (Floyd's Cycle Detection)",
    complexitySummary: {
      time: "O(n)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "head = 3 -> 2 -> 0 -> -4 -> (loops to 2)",
      steps: [
        {
          stepNumber: 1,
          state: "slow=head(3), fast=head(3)",
          action: "slow moves to 2. fast moves to 0 (2 steps). slow != fast.",
          result: "slow=2, fast=0",
        },
        {
          stepNumber: 2,
          state: "slow=2, fast=0",
          action: "slow moves to 0. fast moves to 2 (from 0 -> -4 -> 2). slow != fast.",
          result: "slow=0, fast=2",
        },
        {
          stepNumber: 3,
          state: "slow=0, fast=2",
          action: "slow moves to -4. fast moves to -4 (from 2 -> 0 -> -4). slow == fast!",
          result: "Pointers meet at node -4. Return true!",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Null pointer exception when checking fast.next.next without verifying fast.next",
        fix: "Loop condition must be `while (fast != null && fast.next != null)`.",
      },
      {
        mistake: "Comparing node values rather than node references (slow.val == fast.val)",
        fix: "Different nodes can store the same integer value. Always compare object identity `slow == fast`.",
      },
    ],
    variations: [
      "Linked List Cycle II (find the exact node where cycle begins)",
      "Find the Duplicate Number (array cycle detection)",
    ],
    practice: [
      { title: "Linked List Cycle II", difficulty: "Medium" },
      { title: "Find the Duplicate Number", difficulty: "Medium" },
    ],
    tags: ["Linked List", "Two Pointers"],
    companies: ["Amazon", "Microsoft", "TCS", "Infosys", "Bloomberg"],
  },
  {
    id: "merge-two-sorted-lists",
    slug: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    topic: "Linked Lists",
    subtopic: "Dummy Node & Pointer Splicing",
    difficulty: "Easy",
    progressionLevel: "Level 1: Concept Understanding",
    statement:
      "You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    understandTheProblem:
      "Given two already sorted lists, combine their nodes in ascending order without creating unnecessary new nodes, linking them together directly.",
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order.",
    ],
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation: "Merge the nodes in ascending sequence.",
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]",
        explanation: "Both lists empty results in empty list.",
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]",
        explanation: "Merging empty list with [0] yields [0].",
      },
    ],
    hints: [
      "Use a dummy head node to simplify edge cases with head pointer initialization.",
      "Compare the current nodes of both lists: attach the smaller node to the merged list's tail.",
      "Once one list is exhausted, attach the remainder of the other list directly in O(1).",
    ],
    bruteForce: {
      title: "Approach 1 — Extract All Values, Sort, and Rebuild",
      intuition:
        "Traverse both lists, dump all node values into an array, sort the array, and construct a brand new linked list.",
      code: {
        java: `import java.util.*;

class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        List<Integer> vals = new ArrayList<>();
        while (list1 != null) {
            vals.add(list1.val);
            list1 = list1.next;
        }
        while (list2 != null) {
            vals.add(list2.val);
            list2 = list2.next;
        }
        Collections.sort(vals);

        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for (int v : vals) {
            curr.next = new ListNode(v);
            curr = curr.next;
        }
        return dummy.next;
    }
}`,
        cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        vector<int> vals;
        while (list1) { vals.push_back(list1->val); list1 = list1->next; }
        while (list2) { vals.push_back(list2->val); list2 = list2->next; }
        sort(vals.begin(), vals.end());

        ListNode dummy(0);
        ListNode* curr = &dummy;
        for (int v : vals) {
            curr->next = new ListNode(v);
            curr = curr->next;
        }
        return dummy.next;
    }
};`,
        python: `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        vals = []
        while list1:
            vals.append(list1.val)
            list1 = list1.next
        while list2:
            vals.append(list2.val)
            list2 = list2.next
        vals.sort()

        dummy = ListNode(0)
        curr = dummy
        for v in vals:
            curr.next = ListNode(v)
            curr = curr.next
        return dummy.next`,
        javascript: `var mergeTwoLists = function(list1, list2) {
    const vals = [];
    while (list1) {
        vals.push(list1.val);
        list1 = list1.next;
    }
    while (list2) {
        vals.push(list2.val);
        list2 = list2.next;
    }
    vals.sort((a, b) => a - b);

    const dummy = new ListNode(0);
    let curr = dummy;
    for (const v of vals) {
        curr.next = new ListNode(v);
        curr = curr.next;
    }
    return dummy.next;
};`,
      },
      timeComplexity: "O((n + m) log(n + m))",
      spaceComplexity: "O(n + m)",
      explanation:
        "Fails to leverage the fact that input lists are already sorted.",
    },
    optimalSolution: {
      title: "Approach 2 — Iterative Merge with Dummy Head",
      intuition:
        "Create a sentinel `dummy` node. Maintain a `tail` pointer pointing to `dummy`. While both `list1` and `list2` are non-null, compare values: attach the smaller node to `tail.next` and advance that list's pointer and `tail`. After the loop, splice the remaining non-null list to `tail.next`. Return `dummy.next`.",
      code: {
        java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }

        if (list1 != null) {
            tail.next = list1;
        } else {
            tail.next = list2;
        }

        return dummy.next;
    }
}`,
        cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;

        while (list1 && list2) {
            if (list1->val <= list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }

        tail->next = list1 ? list1 : list2;
        return dummy.next;
    }
};`,
        python: `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        tail = dummy

        while list1 and list2:
            if list1.val <= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next

        tail.next = list1 if list1 else list2
        return dummy.next`,
        javascript: `var mergeTwoLists = function(list1, list2) {
    const dummy = new ListNode(0);
    let tail = dummy;

    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            tail.next = list1;
            list1 = list1.next;
        } else {
            tail.next = list2;
            list2 = list2.next;
        }
        tail = tail.next;
    }

    tail.next = list1 !== null ? list1 : list2;
    return dummy.next;
};`,
      },
      timeComplexity: "O(n + m)",
      spaceComplexity: "O(1)",
      whyOptimal:
        "Visits each node exactly once and rearranges pointers in-place with zero additional heap allocation.",
    },
    pattern: "Two Pointers / Sentinel (Dummy) Node",
    complexitySummary: {
      time: "O(n + m)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "list1 = 1 -> 4, list2 = 2 -> 3",
      steps: [
        {
          stepNumber: 1,
          state: "dummy -> null, tail=dummy, list1=1, list2=2",
          action: "1 <= 2. tail.next = 1. tail = 1. list1 = 4.",
          result: "dummy -> 1",
        },
        {
          stepNumber: 2,
          state: "tail=1, list1=4, list2=2",
          action: "4 > 2. tail.next = 2. tail = 2. list2 = 3.",
          result: "dummy -> 1 -> 2",
        },
        {
          stepNumber: 3,
          state: "tail=2, list1=4, list2=3",
          action: "4 > 3. tail.next = 3. tail = 3. list2 = null.",
          result: "dummy -> 1 -> 2 -> 3",
        },
        {
          stepNumber: 4,
          state: "list2 is null",
          action: "Splice remainder: tail.next = list1 (node 4).",
          result: "dummy -> 1 -> 2 -> 3 -> 4",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Iterating through the remainder of the non-empty list node by node",
        fix: "Since linked lists are spliced by pointer reference, you can directly attach `tail.next = list1` in O(1) time.",
      },
      {
        mistake: "Not using a dummy head, causing complex null-check conditionals for the first node",
        fix: "Always use a sentinel dummy node `new ListNode(0)` to make edge cases uniform.",
      },
    ],
    variations: [
      "Merge k Sorted Lists (Hard — solved using Min-Heap or Divide & Conquer)",
      "Sort List (Merge Sort on Linked List)",
    ],
    practice: [
      { title: "Merge k Sorted Lists", difficulty: "Hard" },
      { title: "Sort List", difficulty: "Medium" },
    ],
    tags: ["Linked List", "Recursion"],
    companies: ["Amazon", "Microsoft", "Apple", "Google", "Meta"],
  },
  {
    id: "remove-nth-node-from-end-of-list",
    slug: "remove-nth-node-from-end-of-list",
    title: "Remove Nth Node From End of List",
    topic: "Linked Lists",
    subtopic: "Fast & Slow Gap Pointer",
    difficulty: "Medium",
    progressionLevel: "Level 2: Basic Implementation",
    statement:
      "Given the `head` of a linked list, remove the `n-th` node from the end of the list and return its head.",
    understandTheProblem:
      "Count `n` positions backwards from the end of the list. Cut that node out of the chain by pointing its predecessor directly to its successor.",
    constraints: [
      "The number of nodes in the list is sz.",
      "1 <= sz <= 30",
      "0 <= Node.val <= 100",
      "1 <= n <= sz",
    ],
    examples: [
      {
        input: "head = [1,2,3,4,5], n = 2",
        output: "[1,2,3,5]",
        explanation: "The 2nd node from the end is 4. Removing it leaves 1->2->3->5.",
      },
      {
        input: "head = [1], n = 1",
        output: "[]",
        explanation: "Removing the only node leaves an empty list.",
      },
      {
        input: "head = [1,2], n = 1",
        output: "[1]",
        explanation: "Removing the 1st from the end (2) leaves [1].",
      },
    ],
    hints: [
      "Could you solve this in one pass using two pointers separated by a fixed distance of n?",
      "Move the fast pointer n steps ahead first.",
      "Then move both slow and fast together until fast reaches the last node. slow will be right before the node to delete!",
    ],
    bruteForce: {
      title: "Approach 1 — Two Pass (Length Calculation)",
      intuition:
        "First pass: count total length L. Second pass: traverse to position (L - n) and skip the target node.",
      code: {
        java: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;

        int length = 0;
        ListNode curr = head;
        while (curr != null) {
            length++;
            curr = curr.next;
        }

        int targetIndex = length - n;
        curr = dummy;
        for (int i = 0; i < targetIndex; i++) {
            curr = curr.next;
        }
        curr.next = curr.next.next;

        return dummy.next;
    }
}`,
        cpp: `class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0);
        dummy.next = head;

        int length = 0;
        ListNode* curr = head;
        while (curr) {
            length++;
            curr = curr->next;
        }

        int targetIndex = length - n;
        curr = &dummy;
        for (int i = 0; i < targetIndex; i++) {
            curr = curr->next;
        }
        curr->next = curr->next->next;

        return dummy.next;
    }
};`,
        python: `class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode(0)
        dummy.next = head

        length = 0
        curr = head
        while curr:
            length += 1
            curr = curr.next

        target = length - n
        curr = dummy
        for _ in range(target):
            curr = curr.next
        curr.next = curr.next.next

        return dummy.next`,
        javascript: `var removeNthFromEnd = function(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;

    let length = 0;
    let curr = head;
    while (curr) {
        length++;
        curr = curr.next;
    }

    const target = length - n;
    curr = dummy;
    for (let i = 0; i < target; i++) {
        curr = curr.next;
    }
    curr.next = curr.next.next;

    return dummy.next;
};`,
      },
      timeComplexity: "O(L) with two passes",
      spaceComplexity: "O(1)",
      explanation:
        "Requires two passes over the list: one to find length, one to delete.",
    },
    optimalSolution: {
      title: "Approach 2 — One Pass with Gap Pointers",
      intuition:
        "Use a dummy sentinel node pointing to head. Place `fast` and `slow` at dummy. Move `fast` ahead by `n + 1` steps. Now, the gap between `fast` and `slow` is `n + 1`. Move both pointers forward one node at a time until `fast` becomes `null`. At this point, `slow` is sitting immediately before the node to be removed. Set `slow.next = slow.next.next`.",
      code: {
        java: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;

        ListNode fast = dummy;
        ListNode slow = dummy;

        for (int i = 0; i <= n; i++) {
            fast = fast.next;
        }

        while (fast != null) {
            slow = slow.next;
            fast = fast.next;
        }

        slow.next = slow.next.next;
        return dummy.next;
    }
}`,
        cpp: `class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0);
        dummy.next = head;

        ListNode* fast = &dummy;
        ListNode* slow = &dummy;

        for (int i = 0; i <= n; i++) {
            fast = fast->next;
        }

        while (fast != nullptr) {
            slow = slow->next;
            fast = fast->next;
        }

        slow->next = slow->next->next;
        return dummy.next;
    }
};`,
        python: `class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode(0)
        dummy.next = head

        fast = dummy
        slow = dummy

        for _ in range(n + 1):
            fast = fast.next

        while fast:
            slow = slow.next
            fast = fast.next

        slow.next = slow.next.next
        return dummy.next`,
        javascript: `var removeNthFromEnd = function(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;

    let fast = dummy;
    let slow = dummy;

    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }

    while (fast !== null) {
        slow = slow.next;
        fast = fast.next;
    }

    slow.next = slow.next.next;
    return dummy.next;
};`,
      },
      timeComplexity: "O(L) in a single pass",
      spaceComplexity: "O(1)",
      whyOptimal:
        "Achieves exact single-pass traversal. Handles removing the head node seamlessly via the dummy sentinel node.",
    },
    pattern: "Two Pointers (Fixed Window / Gap)",
    complexitySummary: {
      time: "O(L)",
      space: "O(1)",
    },
    dryRun: {
      sampleInput: "head = [1, 2, 3, 4, 5], n = 2",
      steps: [
        {
          stepNumber: 1,
          state: "dummy -> 1 -> 2 -> 3 -> 4 -> 5, fast=dummy, slow=dummy",
          action: "Advance fast by n+1 = 3 steps: fast reaches node 3.",
          result: "fast=3, slow=dummy",
        },
        {
          stepNumber: 2,
          state: "Advance both pointers until fast is null",
          action: "Step 1: fast=4, slow=1. Step 2: fast=5, slow=2. Step 3: fast=null, slow=3.",
          result: "slow stops at node 3 (predecessor of 4).",
        },
        {
          stepNumber: 3,
          state: "slow=3, slow.next=4",
          action: "slow.next = slow.next.next (points 3 directly to 5).",
          result: "Node 4 is removed. Return dummy.next (1 -> 2 -> 3 -> 5).",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Failing when n equals the length of the list (removing the head)",
        fix: "Using a dummy node `dummy.next = head` eliminates special case checking when deleting the head node.",
      },
      {
        mistake: "Off-by-one error on the gap count",
        fix: "Advancing `fast` by `n + 1` steps places `slow` directly at the predecessor node when `fast` hits `null`.",
      },
    ],
    variations: [
      "Delete Node in a Linked List (given only pointer to that node)",
      "Swapping Nodes in a Linked List",
    ],
    practice: [
      { title: "Delete Node in a Linked List", difficulty: "Medium" },
      { title: "Swapping Nodes in a Linked List", difficulty: "Medium" },
    ],
    tags: ["Linked List", "Two Pointers"],
    companies: ["Amazon", "Meta", "Microsoft", "Google", "TCS"],
  },
];
