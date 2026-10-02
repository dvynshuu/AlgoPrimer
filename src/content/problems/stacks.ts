import { Problem } from "@/types/content";

export const stackProblems: Problem[] = [
  {
    id: "valid-parentheses",
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    topic: "Stacks",
    topicSlug: "stack",
    subtopic: "LIFO Matching",
    difficulty: "Easy",
    progressionLevel: "Level 1: Concept Understanding",
    statement:
      "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    understandTheProblem:
      "Brackets must match and must nest properly. The most recently opened bracket must be the very first one closed (Last In, First Out). A Stack naturally models this LIFO behavior.",
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'.",
    ],
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: "Matching single pair of parentheses.",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: "Three adjacent matched pairs.",
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation: "'(' is closed by ']', which is a mismatched bracket type.",
      },
      {
        input: 's = "([)]"',
        output: "false",
        explanation: "Brackets are interleaved incorrectly.",
      },
    ],
    hints: [
      "Whenever you see an opening bracket, push its expected closing counterpart onto a stack.",
      "Whenever you see a closing bracket, check if the stack is non-empty and the top equals the current closing bracket.",
      "At the end of the string, the stack must be completely empty.",
    ],
    bruteForce: {
      title: "Approach 1 — Repeated String Replacement",
      intuition:
        "Continuously replace occurrences of '()', '[]', and '{}' with empty strings until no more can be replaced. If the string becomes empty, it is valid.",
      code: {
        java: `class Solution {
    public boolean isValid(String s) {
        int prevLen = -1;
        while (s.length() != prevLen) {
            prevLen = s.length();
            s = s.replace("()", "").replace("[]", "").replace("{}", "");
        }
        return s.isEmpty();
    }
}`,
        cpp: `class Solution {
public:
    bool isValid(string s) {
        int prevLen = -1;
        while (s.size() != prevLen) {
            prevLen = s.size();
            size_t pos;
            if ((pos = s.find("()")) != string::npos) s.erase(pos, 2);
            else if ((pos = s.find("[]")) != string::npos) s.erase(pos, 2);
            else if ((pos = s.find("{}")) != string::npos) s.erase(pos, 2);
        }
        return s.empty();
    }
};`,
        python: `class Solution:
    def isValid(self, s: str) -> bool:
        prev_len = -1
        while len(s) != prev_len:
            prev_len = len(s)
            s = s.replace("()", "").replace("[]", "").replace("{}", "")
        return len(s) == 0`,
        javascript: `var isValid = function(s) {
    let prevLen = -1;
    while (s.length !== prevLen) {
        prevLen = s.length;
        s = s.replace("()", "").replace("[]", "").replace("{}", "");
    }
    return s.length === 0;
};`,
      },
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(n)",
      explanation:
        "Each replacement makes a full pass over the string and creates a new string copy. In the worst case like `((((....))))`, this takes O(n^2) time.",
    },
    optimalSolution: {
      title: "Approach 2 — LIFO Stack",
      intuition:
        "Traverse through `s`. When an opening bracket is met, push its matching closing bracket onto the stack. When a closing bracket is met, pop from the stack and verify that the popped character matches current character. If the stack is empty or doesn't match, return false. At the end, return `stack.isEmpty()`.",
      code: {
        java: `import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();

        for (char c : s.toCharArray()) {
            if (c == '(') {
                stack.push(')');
            } else if (c == '{') {
                stack.push('}');
            } else if (c == '[') {
                stack.push(']');
            } else {
                if (stack.isEmpty() || stack.pop() != c) {
                    return false;
                }
            }
        }

        return stack.isEmpty();
    }
}`,
        cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;

        for (char c : s) {
            if (c == '(') st.push(')');
            else if (c == '{') st.push('}');
            else if (c == '[') st.push(']');
            else {
                if (st.empty() || st.top() != c) return false;
                st.pop();
            }
        }

        return st.empty();
    }
};`,
        python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        matching = {')': '(', '}': '{', ']': '['}

        for char in s:
            if char in matching:
                if not stack or stack.pop() != matching[char]:
                    return False
            else:
                stack.append(char)

        return len(stack) == 0`,
        javascript: `var isValid = function(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };

    for (const char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        }
    }

    return stack.length === 0;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      whyOptimal:
        "Each character is pushed and popped at most once. Push and pop operations are strictly O(1), giving an overall O(n) runtime.",
    },
    pattern: "Stack / LIFO Matching",
    complexitySummary: {
      time: "O(n)",
      space: "O(n)",
    },
    dryRun: {
      sampleInput: 's = "{[]}"',
      steps: [
        {
          stepNumber: 1,
          state: "char='{', stack=[]",
          action: "Opening brace: push matching '}'",
          result: "stack=['}']",
        },
        {
          stepNumber: 2,
          state: "char='[', stack=['}']",
          action: "Opening bracket: push matching ']'",
          result: "stack=['}', ']']",
        },
        {
          stepNumber: 3,
          state: "char=']', stack=['}', ']']",
          action: "Closing bracket: pop top (']'). Does it match ']'? Yes.",
          result: "stack=['}']",
        },
        {
          stepNumber: 4,
          state: "char='}', stack=['}']",
          action: "Closing brace: pop top ('}'). Does it match '}'? Yes.",
          result: "stack=[]",
        },
        {
          stepNumber: 5,
          state: "String consumed, stack is empty",
          action: "return true",
          result: "true",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Calling pop() on an empty stack when string starts with a closing bracket",
        fix: "Always check `!stack.isEmpty()` before calling `pop()` or checking top element.",
      },
      {
        mistake: "Returning true after loop without checking stack.isEmpty()",
        fix: "If opening brackets remain (e.g. `s = '((('`), the stack is not empty and the string is invalid.",
      },
    ],
    variations: [
      "Generate Parentheses",
      "Longest Valid Parentheses",
      "Minimum Remove to Make Valid Parentheses",
    ],
    practice: [
      { title: "Generate Parentheses", difficulty: "Medium" },
      { title: "Minimum Remove to Make Valid Parentheses", difficulty: "Medium" },
    ],
    tags: ["String", "Stack"],
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Bloomberg"],
  },
  {
    id: "min-stack",
    slug: "min-stack",
    title: "Min Stack",
    topic: "Stacks",
    topicSlug: "stack",
    subtopic: "Auxiliary State Tracking / Stack Design",
    difficulty: "Medium",
    progressionLevel: "Level 2: Basic Implementation",
    statement:
      "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\nImplement the `MinStack` class:\n- `MinStack()` initializes the stack object.\n- `void push(int val)` pushes the element `val` onto the stack.\n- `void pop()` removes the element on the top of the stack.\n- `int top()` gets the top element of the stack.\n- `int getMin()` retrieves the minimum element in the stack.\nYou must implement a solution with `O(1)` time complexity for each function.",
    understandTheProblem:
      "Standard stacks do push, pop, and top in O(1). We must additionally make `getMin()` run in O(1) time rather than scanning through all stack elements.",
    constraints: [
      "-2^31 <= val <= 2^31 - 1",
      "Methods pop, top and getMin operations will always be called on non-empty stacks.",
      "At most 3 * 10^4 calls will be made to push, pop, top, and getMin.",
    ],
    examples: [
      {
        input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]',
        output: "[null,null,null,null,-3,null,0,-2]",
        explanation:
          "minStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2",
      },
    ],
    hints: [
      "Every state of the stack has a unique minimum. When a new element is pushed, the new minimum is min(val, currentMinimum).",
      "You can store each element along with the current minimum at that level as a pair (val, minAtThisState).",
      "Alternatively, keep two parallel stacks: one for values, and one for minimums.",
    ],
    bruteForce: {
      title: "Approach 1 — Linear Scan on getMin()",
      intuition:
        "Use a standard stack for push and pop. For getMin(), iterate through all elements in the stack and find the minimum.",
      code: {
        java: `import java.util.ArrayList;
import java.util.List;

class MinStack {
    private List<Integer> list = new ArrayList<>();

    public void push(int val) {
        list.add(val);
    }

    public void pop() {
        list.remove(list.size() - 1);
    }

    public int top() {
        return list.get(list.size() - 1);
    }

    public int getMin() {
        int min = Integer.MAX_VALUE;
        for (int v : list) {
            min = Math.min(min, v);
        }
        return min;
    }
}`,
        cpp: `class MinStack {
    vector<int> data;
public:
    void push(int val) { data.push_back(val); }
    void pop() { data.pop_back(); }
    int top() { return data.back(); }
    int getMin() {
        return *min_element(data.begin(), data.end());
    }
};`,
        python: `class MinStack:
    def __init__(self):
        self.stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)

    def pop(self) -> None:
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return min(self.stack)`,
        javascript: `var MinStack = function() {
    this.stack = [];
};

MinStack.prototype.push = function(val) {
    this.stack.push(val);
};

MinStack.prototype.pop = function() {
    this.stack.pop();
};

MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function() {
    return Math.min(...this.stack);
};`,
      },
      timeComplexity: "getMin() is O(n), all others O(1)",
      spaceComplexity: "O(n)",
      explanation:
        "Linear scan for `getMin()` fails the requirement of O(1) constant time.",
    },
    optimalSolution: {
      title: "Approach 2 — Two Synchronized Stacks / State Pairs",
      intuition:
        "Maintain two stacks: `valStack` storing every element, and `minStack` storing the minimum element seen up to that depth. When pushing `val`, push `val` to `valStack` and push `min(val, minStack.peek())` to `minStack`. Popping pops from both simultaneously. `getMin()` simply inspects `minStack.peek()` in strictly O(1) time.",
      code: {
        java: `import java.util.ArrayDeque;
import java.util.Deque;

class MinStack {
    private Deque<Integer> valStack;
    private Deque<Integer> minStack;

    public MinStack() {
        valStack = new ArrayDeque<>();
        minStack = new ArrayDeque<>();
    }

    public void push(int val) {
        valStack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        } else {
            minStack.push(minStack.peek());
        }
    }

    public void pop() {
        valStack.pop();
        minStack.pop();
    }

    public int top() {
        return valStack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}`,
        cpp: `class MinStack {
private:
    stack<int> valStack;
    stack<int> minStack;

public:
    MinStack() {}

    void push(int val) {
        valStack.push(val);
        if (minStack.empty() || val <= minStack.top()) {
            minStack.push(val);
        } else {
            minStack.push(minStack.top());
        }
    }

    void pop() {
        valStack.pop();
        minStack.pop();
    }

    int top() {
        return valStack.top();
    }

    int getMin() {
        return minStack.top();
    }
};`,
        python: `class MinStack:
    def __init__(self):
        self.val_stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.val_stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
        else:
            self.min_stack.append(self.min_stack[-1])

    def pop(self) -> None:
        self.val_stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.val_stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`,
        javascript: `var MinStack = function() {
    this.valStack = [];
    this.minStack = [];
};

MinStack.prototype.push = function(val) {
    this.valStack.push(val);
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
        this.minStack.push(val);
    } else {
        this.minStack.push(this.minStack[this.minStack.length - 1]);
    }
};

MinStack.prototype.pop = function() {
    this.valStack.pop();
    this.minStack.pop();
};

MinStack.prototype.top = function() {
    return this.valStack[this.valStack.length - 1];
};

MinStack.prototype.getMin = function() {
    return this.minStack[this.minStack.length - 1];
};`,
      },
      timeComplexity: "O(1) for all operations (push, pop, top, getMin)",
      spaceComplexity: "O(n)",
      whyOptimal:
        "Every operation executes in guaranteed constant time without loops. Space overhead is only a second stack matching depth n.",
    },
    pattern: "Data Structure Design / Auxiliary State Stack",
    complexitySummary: {
      time: "O(1) across all operations",
      space: "O(n)",
    },
    dryRun: {
      sampleInput: "push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()",
      steps: [
        {
          stepNumber: 1,
          state: "push(-2)",
          action: "valStack=[-2], minStack=[-2]",
          result: "min is -2",
        },
        {
          stepNumber: 2,
          state: "push(0)",
          action: "0 > -2. valStack=[-2, 0], minStack=[-2, -2]",
          result: "min is -2",
        },
        {
          stepNumber: 3,
          state: "push(-3)",
          action: "-3 <= -2. valStack=[-2, 0, -3], minStack=[-2, -2, -3]",
          result: "min is -3",
        },
        {
          stepNumber: 4,
          state: "getMin() -> returns -3; pop()",
          action: "valStack becomes [-2, 0], minStack becomes [-2, -2]",
          result: "top() returns 0; getMin() returns -2",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Using a single integer variable `min` instead of a stack of minimums",
        fix: "When the minimum element is popped, you have no way to restore the previous minimum without re-scanning.",
      },
      {
        mistake: "Forgetting to push duplicate minimums to minStack",
        fix: "Use `<=` when checking if new element should be pushed to minStack, or push minStack.peek() synchronously on every push.",
      },
    ],
    variations: [
      "Max Stack (Design a stack supporting getMax() and popMax())",
      "Implement Queue using Stacks",
    ],
    practice: [
      { title: "Implement Queue using Stacks", difficulty: "Easy" },
      { title: "Max Stack", difficulty: "Hard" },
    ],
    tags: ["Stack", "Design"],
    companies: ["Amazon", "Bloomberg", "Microsoft", "Goldman Sachs"],
  },
  {
    id: "daily-temperatures",
    slug: "daily-temperatures",
    title: "Daily Temperatures",
    topic: "Stacks",
    topicSlug: "stack",
    subtopic: "Monotonic Stack",
    difficulty: "Medium",
    progressionLevel: "Level 3: Pattern Recognition",
    statement:
      "Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i-th` day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.",
    understandTheProblem:
      "For each day `i`, find the closest future day `j > i` where `temperatures[j] > temperatures[i]`. The answer for day `i` is the index difference `j - i`.",
    constraints: [
      "1 <= temperatures.length <= 10^5",
      "30 <= temperatures[i] <= 100",
    ],
    examples: [
      {
        input: "temperatures = [73,74,75,71,69,72,76,73]",
        output: "[1,1,4,2,1,1,0,0]",
        explanation:
          "Day 0 (73) -> warmer next day (74), wait 1.\nDay 2 (75) -> warmer at day 6 (76), wait 4.\nDay 6 (76) -> no warmer future day, wait 0.",
      },
      {
        input: "temperatures = [30,40,50,60]",
        output: "[1,1,1,0]",
        explanation: "Each day is strictly warmer than the previous.",
      },
      {
        input: "temperatures = [30,60,90]",
        output: "[1,1,0]",
        explanation: "Wait 1 day for 30, wait 1 day for 60, 0 for 90.",
      },
    ],
    hints: [
      "Any time you need to find the 'next greater element' for every item in an array, think Monotonic Stack!",
      "Store indices in the stack in decreasing order of temperature.",
      "When the current temperature is warmer than the temperature at the stack top's index, we've found that top index's answer! Pop it and calculate the distance.",
    ],
    bruteForce: {
      title: "Approach 1 — Double Loop (Scan Right for Warmer Day)",
      intuition:
        "For every day `i`, scan forward `j = i + 1, ..., n - 1`. The first day with `temperatures[j] > temperatures[i]` gives `answer[i] = j - i`.",
      code: {
        java: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] answer = new int[n];
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (temperatures[j] > temperatures[i]) {
                    answer[i] = j - i;
                    break;
                }
            }
        }
        return answer;
    }
}`,
        cpp: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> answer(n, 0);
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (temperatures[j] > temperatures[i]) {
                    answer[i] = j - i;
                    break;
                }
            }
        }
        return answer;
    }
};`,
        python: `class Solution:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:
        n = len(temperatures)
        answer = [0] * n
        for i in range(n):
            for j in range(i + 1, n):
                if temperatures[j] > temperatures[i]:
                    answer[i] = j - i
                    break
        return answer`,
        javascript: `var dailyTemperatures = function(temperatures) {
    const n = temperatures.length;
    const answer = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (temperatures[j] > temperatures[i]) {
                answer[i] = j - i;
                break;
            }
        }
    }
    return answer;
};`,
      },
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1) excluding output array",
      explanation:
        "For strictly decreasing temperatures like `[100, 99, 98, ...]`, the nested loops do (n^2)/2 operations, causing TLE for n = 10^5.",
    },
    optimalSolution: {
      title: "Approach 2 — Monotonic Decreasing Stack of Indices",
      intuition:
        "Iterate through the days. Maintain a stack of indices whose next warmer day has not yet been found. The temperatures at these indices will always be in non-increasing order. When current day `i` is warmer than `temperatures[stack.peek()]`, pop that index `prevIndex` and record `answer[prevIndex] = i - prevIndex`. Continue popping while current is warmer. Then push `i`.",
      code: {
        java: `import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] answer = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevIndex = stack.pop();
                answer[prevIndex] = i - prevIndex;
            }
            stack.push(i);
        }

        return answer;
    }
}`,
        cpp: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> answer(n, 0);
        stack<int> st;

        for (int i = 0; i < n; i++) {
            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int prevIndex = st.top();
                st.pop();
                answer[prevIndex] = i - prevIndex;
            }
            st.push(i);
        }

        return answer;
    }
};`,
        python: `class Solution:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:
        n = len(temperatures)
        answer = [0] * n
        stack = [] # indices

        for i, temp in enumerate(temperatures):
            while stack and temp > temperatures[stack[-1]]:
                prev_index = stack.pop()
                answer[prev_index] = i - prev_index
            stack.append(i)

        return answer`,
        javascript: `var dailyTemperatures = function(temperatures) {
    const n = temperatures.length;
    const answer = new Array(n).fill(0);
    const stack = [];

    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevIndex = stack.pop();
            answer[prevIndex] = i - prevIndex;
        }
        stack.push(i);
    }

    return answer;
};`,
      },
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      whyOptimal:
        "Each index is pushed onto the stack exactly once and popped at most once. Amortized time is strictly O(n).",
    },
    pattern: "Monotonic Stack (Next Greater Element)",
    complexitySummary: {
      time: "O(n)",
      space: "O(n)",
    },
    dryRun: {
      sampleInput: "temperatures = [73, 74, 75, 71, 69, 72]",
      steps: [
        {
          stepNumber: 1,
          state: "i=0 (73), stack=[]",
          action: "Stack empty. Push index 0.",
          result: "stack=[0]",
        },
        {
          stepNumber: 2,
          state: "i=1 (74), stack=[0]",
          action: "74 > temperatures[0] (73). Pop 0: answer[0] = 1 - 0 = 1. Push index 1.",
          result: "answer[0]=1, stack=[1]",
        },
        {
          stepNumber: 3,
          state: "i=2 (75), stack=[1]",
          action: "75 > temperatures[1] (74). Pop 1: answer[1] = 2 - 1 = 1. Push index 2.",
          result: "answer[1]=1, stack=[2]",
        },
        {
          stepNumber: 4,
          state: "i=3 (71), stack=[2]",
          action: "71 not > 75. Push index 3.",
          result: "stack=[2, 3]",
        },
      ],
    },
    commonMistakes: [
      {
        mistake: "Pushing temperatures instead of indices onto the stack",
        fix: "Push the index `i`. From the index you can easily query both the temperature `temperatures[i]` and compute distance `i - prevIndex`.",
      },
      {
        mistake: "Using `>=` instead of `>` when resolving the next warmer day",
        fix: "The problem specifies a strictly warmer temperature. Equal temperatures do NOT qualify as warmer.",
      },
    ],
    variations: [
      "Next Greater Element I",
      "Next Greater Element II (circular array)",
      "Largest Rectangle in Histogram",
    ],
    practice: [
      { title: "Next Greater Element I", difficulty: "Easy" },
      { title: "Next Greater Element II", difficulty: "Medium" },
    ],
    tags: ["Array", "Stack", "Monotonic Stack"],
    companies: ["Amazon", "Meta", "Google", "Uber"],
  },
  {
    id: "sliding-window-maximum",
    slug: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    topic: "Stacks & Queues",
    topicSlug: "queue",
    subtopic: "Monotonic Decreasing Deque",
    difficulty: "Hard",
    progressionLevel: "Level 4: Optimization",
    statement:
      "You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.",
    understandTheProblem:
      "Find the maximum value in every window of size k as the window slides from index 0 to n - k across the array.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "1 <= k <= nums.length",
    ],
    examples: [
      {
        input: "nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3",
        output: "[3, 3, 5, 5, 6, 7]",
        explanation: "Window [1, 3, -1] -> 3; [3, -1, -3] -> 3; [-1, -3, 5] -> 5; [-3, 5, 3] -> 5; [5, 3, 6] -> 6; [3, 6, 7] -> 7.",
      },
      {
        input: "nums = [1], k = 1",
        output: "[1]",
        explanation: "Single window with value 1.",
      },
    ],
    hints: [
      "Brute force scans all K elements in every window: O(N * K). For N = 10^5, K = 5 * 10^4, this takes 5 * 10^9 operations and times out.",
      "If a new element arr[i] arrives and is GREATER than an older element arr[j] in the window, arr[j] can NEVER be the maximum again! Evict it from the back.",
      "A Monotonic Decreasing Deque keeps candidate indices in decreasing order of value. The front of the deque is always the maximum!",
    ],
    bruteForce: {
      title: "Approach 1 — Naive Scanning Each Window",
      intuition:
        "For each starting index i from 0 to n - k, iterate through i to i + k - 1 and find the maximum.",
      code: {
        java: `public int[] maxSlidingWindow(int[] nums, int k) {
    int n = nums.length;
    int[] res = new int[n - k + 1];
    for (int i = 0; i <= n - k; i++) {
        int max = nums[i];
        for (int j = i; j < i + k; j++) {
            max = Math.max(max, nums[j]);
        }
        res[i] = max;
    }
    return res;
}`,
        cpp: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    int n = nums.size();
    vector<int> res(n - k + 1);
    for (int i = 0; i <= n - k; i++) {
        int maxVal = nums[i];
        for (int j = i; j < i + k; j++) maxVal = max(maxVal, nums[j]);
        res[i] = maxVal;
    }
    return res;
}`,
        python: `def maxSlidingWindow(nums: list[int], k: int) -> list[int]:
    n = len(nums)
    return [max(nums[i:i + k]) for i in range(n - k + 1)]`,
        javascript: `var maxSlidingWindow = function(nums, k) {
    const n = nums.length;
    const res = [];
    for (let i = 0; i <= n - k; i++) {
        let max = nums[i];
        for (let j = i; j < i + k; j++) {
            max = Math.max(max, nums[j]);
        }
        res.push(max);
    }
    return res;
};`,
      },
      timeComplexity: "O(N * K)",
      spaceComplexity: "O(1) auxiliary",
      explanation:
        "Evaluates N - K + 1 windows of size K, leading to quadratic time when K is large.",
    },
    optimalSolution: {
      title: "Approach 2 — Monotonic Decreasing Deque in O(N) Time",
      intuition:
        "Maintain a Double-Ended Queue (Deque) of indices with values in strictly decreasing order. 1. Pop front if element is out of the active window (`deque.peekFirst() < i - k + 1`). 2. Pop back while incoming `nums[i] >= nums[deque.peekLast()]` (they will never be maximums). 3. Add `i` to back. 4. If `i >= k - 1`, record `nums[deque.peekFirst()]`.",
      code: {
        java: `public class SlidingWindowMax {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] result = new int[n - k + 1];
        int ri = 0;

        // Stores indices in decreasing order of corresponding values
        Deque<Integer> deque = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            // 1. Evict elements outside active window
            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }

            // 2. Evict smaller elements from the back
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }

            // 3. Push current element's index
            deque.offerLast(i);

            // 4. Record maximum once window is complete
            if (i >= k - 1) {
                result[ri++] = nums[deque.peekFirst()];
            }
        }
        return result;
    }
}`,
        cpp: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    int n = nums.size();
    vector<int> result;
    deque<int> dq;

    for (int i = 0; i < n; i++) {
        while (!dq.empty() && dq.front() < i - k + 1) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) result.push_back(nums[dq.front()]);
    }
    return result;
}`,
        python: `from collections import deque

def maxSlidingWindow(nums: list[int], k: int) -> list[int]:
    dq = deque()
    result = []

    for i in range(len(nums)):
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])

    return result`,
        javascript: `var maxSlidingWindow = function(nums, k) {
    const deque = []; // Store indices
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        while (deque.length > 0 && deque[0] < i - k + 1) {
            deque.shift();
        }
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        deque.push(i);
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    return result;
};`,
      },
      timeComplexity: "O(N) single pass",
      spaceComplexity: "O(K) auxiliary memory for deque",
      whyOptimal:
        "Every index enters and exits the deque at most once, guaranteeing strictly linear 2N operations.",
    },
    pattern: "Monotonic Queue / Deque",
    complexitySummary: {
      time: "O(N)",
      space: "O(K)",
    },
    dryRun: {
      sampleInput: "nums = [1, 3, -1, -3, 5], k = 3",
      steps: [
        { stepNumber: 1, state: "i=0 (1)", action: "dq = [0]", result: "window not ready" },
        { stepNumber: 2, state: "i=1 (3)", action: "3 > 1 -> pop 0; dq = [1]", result: "window not ready" },
        { stepNumber: 3, state: "i=2 (-1)", action: "push 2; dq = [1, 2]", result: "window 1: nums[dq[0]] = 3" },
        { stepNumber: 4, state: "i=3 (-3)", action: "push 3; dq = [1, 2, 3]", result: "window 2: nums[dq[0]] = 3" },
        { stepNumber: 5, state: "i=4 (5)", action: "5 > -3,-1,3 -> pop all; dq = [4]", result: "window 3: nums[dq[0]] = 5" },
      ],
    },
    commonMistakes: [
      {
        mistake: "Storing values instead of indices in the deque",
        why: "Storing raw values prevents checking whether the front element has slid out of the active window.",
        fix: "Always store array indices in the deque.",
      },
    ],
    variations: [
      "Sliding Window Minimum",
      "Shortest Subarray with Sum at Least K",
    ],
    practice: [
      { title: "Shortest Subarray with Sum at Least K", difficulty: "Hard" },
      { title: "Constrained Subsequence Sum", difficulty: "Hard" },
    ],
    tags: ["Array", "Queue", "Sliding Window", "Monotonic Queue"],
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Citadel"],
  },
  {
    id: "largest-rectangle-in-histogram",
    slug: "largest-rectangle-in-histogram",
    title: "Largest Rectangle in Histogram",
    topic: "Stacks & Queues",
    topicSlug: "stack",
    subtopic: "Monotonic Increasing Stack",
    difficulty: "Hard",
    progressionLevel: "Level 4: Optimization",
    statement:
      "Given an array of integers `heights` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
    understandTheProblem:
      "A rectangle can span multiple contiguous bars. The height of the rectangle is constrained by the shortest bar in that range. Find the maximum area (height * width) across all possible contiguous spans.",
    constraints: [
      "1 <= heights.length <= 10^5",
      "0 <= heights[i] <= 10^4",
    ],
    examples: [
      {
        input: "heights = [2, 1, 5, 6, 2, 3]",
        output: "10",
        explanation: "The largest rectangle is formed by bars at index 2 and 3 (heights 5 and 6), with min height 5 and width 2: area = 5 * 2 = 10.",
      },
      {
        input: "heights = [2, 4]",
        output: "4",
        explanation: "The largest rectangle is height 4, width 1, area = 4.",
      },
    ],
    hints: [
      "For each bar i, what is the widest rectangle with height heights[i]? It extends to the left until the first smaller bar, and to the right until the first smaller bar!",
      "A Monotonic Increasing Stack efficiently identifies both the left and right smaller boundaries in a single pass.",
    ],
    bruteForce: {
      title: "Approach 1 — Expanding Left and Right for Every Bar",
      intuition:
        "For each bar i, expand a left pointer while heights[left] >= heights[i], and a right pointer while heights[right] >= heights[i]. Compute area = heights[i] * (right - left + 1).",
      code: {
        java: `public int largestRectangleArea(int[] heights) {
    int maxArea = 0, n = heights.length;
    for (int i = 0; i < n; i++) {
        int l = i, r = i;
        while (l >= 0 && heights[l] >= heights[i]) l--;
        while (r < n && heights[r] >= heights[i]) r++;
        maxArea = Math.max(maxArea, heights[i] * (r - l - 1));
    }
    return maxArea;
}`,
        cpp: `int largestRectangleArea(vector<int>& heights) {
    int maxArea = 0, n = heights.size();
    for (int i = 0; i < n; i++) {
        int l = i, r = i;
        while (l >= 0 && heights[l] >= heights[i]) l--;
        while (r < n && heights[r] >= heights[i]) r++;
        maxArea = max(maxArea, heights[i] * (r - l - 1));
    }
    return maxArea;
}`,
        python: `def largestRectangleArea(heights: list[int]) -> int:
    max_area = 0
    n = len(heights)
    for i in range(n):
        l, r = i, i
        while l >= 0 and heights[l] >= heights[i]: l -= 1
        while r < n and heights[r] >= heights[i]: r += 1
        max_area = max(max_area, heights[i] * (r - l - 1))
    return max_area`,
        javascript: `var largestRectangleArea = function(heights) {
    let maxArea = 0, n = heights.length;
    for (let i = 0; i < n; i++) {
        let l = i, r = i;
        while (l >= 0 && heights[l] >= heights[i]) l--;
        while (r < n && heights[r] >= heights[i]) r++;
        maxArea = Math.max(maxArea, heights[i] * (r - l - 1));
    }
    return maxArea;
};`,
      },
      timeComplexity: "O(N^2)",
      spaceComplexity: "O(1)",
      explanation:
        "Expanding left and right for every bar takes O(N) per bar, leading to O(N^2) total runtime.",
    },
    optimalSolution: {
      title: "Approach 2 — Monotonic Increasing Stack in O(N) Time",
      intuition:
        "Maintain a stack of indices with strictly increasing heights. When `heights[i] < heights[stack.peek()]`, the bar at `stack.pop()` has found its right boundary (`i`) and left boundary (`stack.peek()`). Its maximal rectangle area is `height * (i - stack.peek() - 1)`. Append a dummy height 0 at the end to flush all remaining bars.",
      code: {
        java: `public class LargestRectangleHistogram {
    public int largestRectangleArea(int[] heights) {
        Deque<Integer> stack = new ArrayDeque<>();
        int maxArea = 0, n = heights.length;

        for (int i = 0; i <= n; i++) {
            // Sentinel 0 height at index n forces stack flushing
            int currentHeight = (i == n) ? 0 : heights[i];

            while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
}`,
        cpp: `int largestRectangleArea(vector<int>& heights) {
    stack<int> s;
    int maxArea = 0, n = heights.size();

    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];
        while (!s.empty() && h < heights[s.top()]) {
            int height = heights[s.top()];
            s.pop();
            int width = s.empty() ? i : i - s.top() - 1;
            maxArea = max(maxArea, height * width);
        }
        s.push(i);
    }
    return maxArea;
}`,
        python: `def largestRectangleArea(heights: list[int]) -> int:
    stack = []
    max_area = 0
    heights.append(0) # Sentinel flush

    for i, h in enumerate(heights):
        while stack and h < heights[stack[-1]]:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)

    heights.pop() # Restore
    return max_area`,
        javascript: `var largestRectangleArea = function(heights) {
    const stack = [];
    let maxArea = 0;
    const n = heights.length;

    for (let i = 0; i <= n; i++) {
        const h = (i === n) ? 0 : heights[i];
        while (stack.length > 0 && h < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
};`,
      },
      timeComplexity: "O(N) single pass",
      spaceComplexity: "O(N) for monotonic stack",
      whyOptimal:
        "Every bar is pushed onto the stack once and popped once. Total operations <= 2N, achieving optimal linear time.",
    },
    pattern: "Monotonic Stack / Histogram",
    complexitySummary: {
      time: "O(N)",
      space: "O(N)",
    },
    dryRun: {
      sampleInput: "heights = [2, 1, 5, 6, 2, 3]",
      steps: [
        { stepNumber: 1, state: "i=0 (2)", action: "stack = [0]", result: "maxArea = 0" },
        { stepNumber: 2, state: "i=1 (1)", action: "1 < 2 -> pop 0: h=2, w=1 -> area=2. push 1", result: "stack = [1], maxArea = 2" },
        { stepNumber: 3, state: "i=2 (5), i=3 (6)", action: "push 2, push 3", result: "stack = [1, 2, 3]" },
        { stepNumber: 4, state: "i=4 (2)", action: "2 < 6 -> pop 3: h=6, w=1 -> area=6. 2 < 5 -> pop 2: h=5, w=2 -> area=10!", result: "maxArea = 10" },
      ],
    },
    commonMistakes: [
      {
        mistake: "Computing width as `i - poppedIndex` instead of `i - stack.peek() - 1`",
        why: "The popped bar could have extended further to the left across all bars taller than itself that were previously popped.",
        fix: "Width must be computed using the current top of stack: `stack.isEmpty() ? i : i - stack.peek() - 1`.",
      },
    ],
    variations: [
      "Maximal Rectangle in 2D Binary Matrix",
      "Trapping Rain Water",
    ],
    practice: [
      { title: "Maximal Rectangle", difficulty: "Hard" },
      { title: "Trapping Rain Water", difficulty: "Hard" },
    ],
    tags: ["Array", "Stack", "Monotonic Stack"],
    companies: ["Google", "Amazon", "Apple", "Meta", "Microsoft"],
  },
];
