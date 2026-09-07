import { Lesson } from "@/types/content";

export const pythonFoundationsLessons: Lesson[] = [
  {
    id: "python-syntax-io",
    slug: "syntax-io",
    title: "Python Syntax, Indentation & Fast I/O",
    track: "python",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 1,
    estimatedMinutes: 20,
    oneSentence:
      "Python enforces clean, block-structured code using strict indentation instead of curly braces, and competitive coding requires `sys.stdin.readline` to avoid input bottlenecks.",
    whyDoWeNeedIt: {
      problem:
        "Using built-in `input()` in a loop processing $10^5$ lines causes Time Limit Exceeded (TLE) because `input()` performs extra string stripping and EOF checks on every call.",
      realWorldAnalogy:
        "Indentation is like paragraphs in a book: without whitespace separation, sentences blur into an unreadable mess. `sys.stdin.readline` is an express freight elevator compared to the passenger elevator of `input()`.",
    },
    visualIntuition: `Indentation Hierarchy vs Curly Braces:
C++ / Java:
if (score > 90) {
    if (attendance > 85) {
        awardScholarship();
    }
}

Python (Whitespace is Syntax):
if score > 90:
····if attendance > 85:
········award_scholarship()
(Each level is strictly 4 spaces; mixing tabs and spaces causes IndentationError)`,
    syntax: {
      fastIO: "import sys\ninput = sys.stdin.readline\nn = int(input())",
      fString: "name = 'Aarav'\nage = 20\nprint(f'{name} is {age} years old')",
    },
    example: {
      title: "Fast I/O template and formatted f-strings in Python",
      language: "python",
      code: `import sys

# Fast I/O rebinding for placement assessments
input = sys.stdin.readline

def solve():
    # Reading an integer
    line = input()
    if not line:
        return
    n = int(line.strip())

    # Reading a space-separated array of integers
    arr = list(map(int, input().split()))

    # f-string formatting with expressions and precision specifiers
    total = sum(arr)
    avg = total / n if n > 0 else 0.0

    print(f"Total: {total}, Average: {avg:.2f}")

if __name__ == "__main__":
    solve()`,
      explanation:
        "Rebinding `input = sys.stdin.readline` speeds up I/O by up to 4x. f-strings (`f'{avg:.2f}'`) provide fast, readable string formatting evaluated at runtime.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Lexical Indentation Tokenizer",
        description: "The Python parser generates `INDENT` and `DEDENT` tokens when leading whitespace increases or decreases.",
      },
      {
        step: 2,
        title: "Standard Stream Buffering",
        description: "`sys.stdin.readline` reads a raw line directly from the C-level I/O buffer without stripping newline characters `\\n`.",
      },
      {
        step: 3,
        title: "f-String Bytecode Compilation",
        description: "f-strings compile into optimized `FORMAT_VALUE` and `BUILD_STRING` bytecode instructions, outperforming `%` and `.format()`.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Mixing tabs and spaces in Python indentation",
        why: "Python 3 disallows mixing tabs and spaces for indentation, raising `TabError: inconsistent use of tabs and spaces in indentation`.",
        correct: "Configure your editor to insert 4 spaces whenever the Tab key is pressed.",
      },
      {
        mistake: "n = int(sys.stdin.readline()) without handling empty EOF",
        why: "At the end of a file/input, `readline()` returns an empty string `''`, which causes `ValueError: invalid literal for int()`.",
        correct: "line = sys.stdin.readline().strip(); if line: n = int(line)",
      },
    ],
    complexity: {
      time: "O(1) per line read via sys.stdin.readline vs higher constant factor for input()",
      space: "O(L) where L is the length of the string read into memory",
      explanation: "Direct C stream buffer read.",
    },
    tryItYourself: {
      prompt: "How can you read all remaining lines from standard input into a list in a single Python statement?",
      hint: "Check methods on sys.stdin.",
      solutionSnippet: "import sys; lines = sys.stdin.read().splitlines()",
    },
    placementConnection:
      "Online coding platforms (HackerRank, CodeChef, LeetCode) evaluate Python code with large test suites ($10^5$ lines). Fast I/O prevents unforced TLEs.",
    quickRevision: [
      "Python uses 4 spaces for indentation to delineate blocks; never mix tabs and spaces.",
      "Use `input = sys.stdin.readline` for fast competitive programming I/O.",
      "f-strings (`f'{var}'`) are the fastest, most idiomatic string formatting mechanism in Python.",
      "Remember that `readline()` keeps the trailing `\\n`; use `.strip()` when needed.",
    ],
  },
  {
    id: "python-variables",
    slug: "variables",
    title: "Variables, Object References & id()",
    track: "python",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 2,
    estimatedMinutes: 20,
    oneSentence:
      "In Python, variables are not memory containers; they are name tags (references) bound to heap-allocated PyObject instances.",
    whyDoWeNeedIt: {
      problem:
        "Assuming Python variables act like C++ variables causes disastrous shared-reference bugs when assigning or copying mutable objects like lists and dictionaries.",
      realWorldAnalogy:
        "Sticky notes attached to physical objects. You can attach two sticky notes ('a' and 'b') to the exact same physical notebook; writing in the notebook affects both.",
    },
    visualIntuition: `Python Object Model:
Namespace (Variable Names)       Heap Memory (PyObject)
[ a ] ------------------------>  [ PyList: [10, 20, 30] ]
                                     ^
[ b = a ] ---------------------------+
(Both 'a' and 'b' point to the exact same list address in memory!
Mutating b.append(40) modifies the list that 'a' also sees!)`,
    syntax: {
      assignment: "x = 10\ny = 'placement'\na = [1, 2, 3]\nb = a.copy() # Independent copy!",
    },
    example: {
      title: "Variable aliasing, object identity with id(), and independent shallow copying",
      language: "python",
      code: `# 1. Immutable types (int, float, str, tuple)
x = 100
y = x
x = 200 # Rebinds x to a new integer object; y remains 100
print(f"x: {x}, y: {y}")

# 2. Mutable types (list, dict, set)
list1 = [1, 2, 3]
list2 = list1  # Creates an ALIAS (shared reference)
list2.append(4)
print(f"list1: {list1}") # [1, 2, 3, 4] -> mutated!
print(f"Same memory address? {id(list1) == id(list2)}") # True

# 3. Proper copying to avoid aliasing
list3 = list1.copy() # Shallow copy creates a distinct list object
list3.append(99)
print(f"list1: {list1}") # [1, 2, 3, 4] -> untouched
print(f"list3: {list3}") # [1, 2, 3, 4, 99]`,
      explanation:
        "`b = a` does not duplicate data; it copies the object pointer. Use `.copy()` or slicing `arr[:]` for independent lists.",
    },
    howItWorks: [
      {
        step: 1,
        title: "PyObject Allocation",
        description: "Everything in Python is an object stored on the heap with an `ob_refcnt` (reference count) and `ob_type` pointer.",
      },
      {
        step: 2,
        title: "Namespace Dictionary Binding",
        description: "Variable names are keys in a scope dictionary (`locals()` or `globals()`) pointing to heap objects.",
      },
      {
        step: 3,
        title: "Reference Counting & Garbage Collection",
        description: "When no variable names reference an object, its reference count reaches zero and its memory is immediately deallocated.",
      },
    ],
    commonMistakes: [
      {
        mistake: "matrix = [[0] * 3] * 3; matrix[0][0] = 7",
        why: "Multiplying a list containing a list creates 3 references to the EXACT SAME inner row list. Modifying row 0 updates all 3 rows!",
        correct: "matrix = [[0] * 3 for _ in range(3)]",
      },
      {
        mistake: "def append_to(val, lst=[]): lst.append(val)",
        why: "Default argument `[]` is created ONCE when the function is defined, causing state to persist across separate calls.",
        correct: "def append_to(val, lst=None): if lst is None: lst = []",
      },
    ],
    complexity: {
      time: "O(1) assignment and name resolution",
      space: "O(1) reference pointer (~8 bytes) + object overhead",
      explanation: "Variable binding is a hash table entry insertion.",
    },
    tryItYourself: {
      prompt: "What does `a = [1, 2]; b = a; a = a + [3]; print(b)` output?",
      hint: "Does `a = a + [3]` mutate `a` in-place, or create a brand-new list object?",
      solutionSnippet: "It prints `[1, 2]`. `a + [3]` creates a new list and rebinds `a`, leaving `b` pointing to the original list. If `a += [3]` had been used, it would mutate in place and modify `b`.",
    },
    placementConnection:
      "Questions testing mutable default arguments, 2D matrix initialization bugs, and shallow vs deep copies appear in nearly every Python technical interview.",
    quickRevision: [
      "Python variables are object references, not memory boxes.",
      "Immutable types: `int`, `float`, `str`, `tuple`, `frozenset`.",
      "Mutable types: `list`, `dict`, `set`.",
      "Never initialize 2D matrices with `[[0] * n] * m`; always use `[[0] * n for _ in range(m)]`.",
    ],
  },
  {
    id: "python-operators",
    slug: "operators",
    title: "Operators, Division Tricks & is vs ==",
    track: "python",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 3,
    estimatedMinutes: 20,
    oneSentence:
      "Python distinguishes between float division (`/`) and floor division (`//`), provides exponentiation (`**`), and uses `is` for identity and `==` for value equality.",
    whyDoWeNeedIt: {
      problem:
        "Using `/` when integer indices or counts are expected produces floating-point numbers (`float`), causing `TypeError: list indices must be integers or slices, not float`.",
      realWorldAnalogy:
        "`==` asks 'Do these two books have the same content?' `is` asks 'Are these two people pointing to the exact same physical copy of the book?'",
    },
    visualIntuition: `Identity ('is') vs Equality ('=='):
a = [1, 2, 3]
b = [1, 2, 3]

Value Check:    a == b  --> True  (Values are identical: [1, 2, 3])
Identity Check: a is b  --> False (Different heap allocations: id(a) != id(b))

Integer Division with Negatives (Floor Division):
7 // 2   =  3
-7 // 2  = -4  (Floors down towards negative infinity! In C++/Java it truncates to -3!)`,
    syntax: {
      arithmetic: "quotient = a // b\npower = a ** b\nmod = a % b",
      comparison: "is_same_obj = a is b\nis_equal_val = a == b",
    },
    example: {
      title: "Demonstrating division differences, power operator, and is vs ==",
      language: "python",
      code: `# 1. True division (float) vs Floor division (integer)
print(f"7 / 2 = {7 / 2}")    # 3.5 (float)
print(f"7 // 2 = {7 // 2}")  # 3 (int)

# Python floors towards -infinity for negative numbers
print(f"-7 // 2 = {-7 // 2}") # -4 (Careful! C++/Java would give -3)

# To get truncation towards zero like C++/Java:
truncated = int(-7 / 2)
print(f"Truncated towards zero: {truncated}") # -3

# 2. Exponentiation
print(f"2 ** 10 = {2 ** 10}") # 1024

# 3. 'is' vs '=='
x = [10, 20]
y = [10, 20]
print(f"x == y: {x == y}") # True (values match)
print(f"x is y: {x is y}") # False (different objects in heap)`,
      explanation:
        "`//` floors down to the nearest smaller integer. For negative numbers, `-7 // 2` evaluates to `-4`. To truncate toward zero as in C++ or Java, use `int(-7 / 2)`.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Dunder Method Delegation",
        description: "`a == b` delegates to `a.__eq__(b)`, whereas `a is b` compares `id(a) == id(b)` directly.",
      },
      {
        step: 2,
        title: "Integer Caching Internals",
        description: "CPython pre-allocates an array of small integer objects from `-5` to `256`. Thus, `x = 100; y = 100; x is y` is `True` due to internal caching.",
      },
      {
        step: 3,
        title: "Short-Circuit Logical Evaluation",
        description: "`a and b` returns `a` if `a` is falsy, else returns `b`. `a or b` returns `a` if `a` is truthy, else returns `b`.",
      },
    ],
    commonMistakes: [
      {
        mistake: "if status is 'ACTIVE': // Using 'is' for string comparison",
        why: "While string interning may make this work for small literals, dynamically constructed strings will fail identity checks.",
        correct: "if status == 'ACTIVE':",
      },
      {
        mistake: "mid = (low + high) / 2 // Using / for array index calculation",
        why: "`mid` becomes a `float`, raising `TypeError` when used as an index `arr[mid]`.",
        correct: "mid = (low + high) // 2",
      },
    ],
    complexity: {
      time: "O(1) for primitive arithmetic and is checks; O(N) for deep container == comparisons",
      space: "O(1)",
      explanation: "Identity check is a single machine pointer comparison.",
    },
    tryItYourself: {
      prompt: "What does `5 < 10 < 15 < 20` evaluate to in Python?",
      hint: "Python evaluates chained comparisons as `5 < 10 and 10 < 15 and 15 < 20`.",
      solutionSnippet: "It evaluates to `True`. Python chains comparison operators without needing multiple explicit `and` statements.",
    },
    placementConnection:
      "Binary search implementations in Python often fail if candidates write `mid = (l + r) / 2` instead of `//`. Interviewers also check if candidates know why `-7 // 2` is `-4`.",
    quickRevision: [
      "`/` always produces a `float`; `//` produces integer floor division.",
      "Negative floor division `-7 // 2` floors to `-4`; use `int(-7 / 2)` to truncate toward zero.",
      "`==` compares data values; `is` compares memory addresses.",
      "Always check `x is None` rather than `x == None`.",
    ],
  },
  {
    id: "python-conditions",
    slug: "conditions",
    title: "Conditionals, Falsy Values & Ternary Expressions",
    track: "python",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 4,
    estimatedMinutes: 20,
    oneSentence:
      "Python conditionals evaluate truth values cleanly using truthy/falsy semantics, chained comparisons, and concise inline ternary expressions.",
    whyDoWeNeedIt: {
      problem:
        "Writing verbose conditions like `if len(items) > 0` or `if node != None` clutters algorithmic thinking when empty collections inherently evaluate to False.",
      realWorldAnalogy:
        "Checking if an inbox has mail: you don't count whether mail count is $> 0$; if there is mail, it is actionable; if it's empty, you move on.",
    },
    visualIntuition: `Python Truthiness System:
Falsy Values (Evaluate to False):
- None
- False
- 0, 0.0, 0j
- Empty sequences: '', [], (), range(0)
- Empty collections: {}, set()

All other values evaluate to True!
e.g. [0] is True (non-empty list!), "False" is True (non-empty string!)`,
    syntax: {
      ifElse: "if condition:\n    # body\nelif other_condition:\n    # body\nelse:\n    # fallback",
      ternary: "val = x if condition else y",
    },
    example: {
      title: "Idiomatic Python conditions, ternary expressions, and chained checks",
      language: "python",
      code: `def process_batch(items):
    # Idiomatic check for non-empty container
    if items:
        print(f"Processing {len(items)} items")
    else:
        print("Batch is empty")

# Inline conditional expression (Ternary)
score = 88
grade = "Distinction" if score >= 85 else "Standard"
print(f"Grade: {grade}")

# Chained range comparison
temp = 25
if 18 <= temp <= 30:
    print("Comfortable room temperature")`,
      explanation:
        "`if items:` checks if the container is non-empty directly. `val_if_true if cond else val_if_false` is Python's concise ternary expression.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Dunder Method Resolution",
        description: "Python calls `__bool__()` on the object; if absent, it falls back to `__len__() != 0`.",
      },
      {
        step: 2,
        title: "Branch Execution",
        description: "Python evaluates clauses sequentially until the first truthy condition is encountered.",
      },
      {
        step: 3,
        title: "Short-Circuit Exit",
        description: "Subsequent `elif` and `else` branches are skipped immediately without evaluation.",
      },
    ],
    commonMistakes: [
      {
        mistake: "if a == 1 or 2: // Intended: if a == 1 or a == 2",
        why: "Parsed as `(a == 1) or (2)`. Since 2 is non-zero, it is always truthy, so the condition is ALWAYS True!",
        correct: "if a in (1, 2):  # Or if a == 1 or a == 2:",
      },
      {
        mistake: "if x is not None and len(x) > 0: // Verbose and redundant",
        why: "Empty list already evaluates to False in a boolean context.",
        correct: "if x: // Handles None, empty lists, and empty strings cleanly",
      },
    ],
    complexity: {
      time: "O(1) conditional evaluation",
      space: "O(1)",
      explanation: "Direct opcode evaluation (`POP_JUMP_IF_FALSE`).",
    },
    tryItYourself: {
      prompt: "What is the value of `x = [] or [10] or 0` in Python?",
      hint: "Remember that `or` returns the first truthy operand, or the last operand if all are falsy.",
      solutionSnippet: "The value is `[10]`. `[]` is falsy, so it checks `[10]`, which is truthy, and immediately returns it via short-circuiting.",
    },
    placementConnection:
      "Writing `if len(arr) == 0:` instead of `if not arr:` marks a candidate who does not understand Python idioms. Interviewers look for clean, pythonic conditionals.",
    quickRevision: [
      "Empty sequences (`[]`, `\"\"`, `()`) and zero are falsy; non-empty collections are truthy.",
      "Check `is None` instead of `== None`.",
      "Python supports chained comparisons like `0 <= i < n`.",
      "Ternary syntax: `true_val if condition else false_val`.",
    ],
  },
  {
    id: "python-loops",
    slug: "loops",
    title: "Loops, Iteration, enumerate & zip",
    track: "python",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 5,
    estimatedMinutes: 25,
    oneSentence:
      "Python loops iterate directly over elements using the iterator protocol, eliminating manual index counters through utilities like `enumerate` and `zip`.",
    whyDoWeNeedIt: {
      problem:
        "Writing index loops `for i in range(len(arr)): val = arr[i]` is clunky and causes frequent off-by-one index out-of-bounds crashes.",
      realWorldAnalogy:
        "An automated assembly line conveyor: parts arrive directly at your workstation one by one; you inspect each part without having to count which bin slot it came from.",
    },
    visualIntuition: `Python Iteration Tools:
1. enumerate(iterable):
   items = ['A', 'B', 'C']
   --> yields (0, 'A'), (1, 'B'), (2, 'C')

2. zip(list1, list2):
   names = ['Alice', 'Bob']
   roles = ['Dev',   'Lead']
   --> yields ('Alice', 'Dev'), ('Bob', 'Lead')

3. for-else construct:
   for x in items:
       if found: break
   else:
       # Executes ONLY if loop finished without hitting a 'break'!`,
    syntax: {
      enumerate: "for idx, val in enumerate(arr):\n    print(idx, val)",
      zip: "for a, b in zip(list1, list2):\n    print(a, b)",
      forElse: "for x in arr:\n    if x == target: break\nelse:\n    print('Not found')",
    },
    example: {
      title: "Clean loops with enumerate, zip, and the for-else search construct",
      language: "python",
      code: `fruits = ["apple", "banana", "cherry"]
prices = [1.20, 0.50, 2.50]

# 1. Enumerate: index and item simultaneously
for idx, fruit in enumerate(fruits, start=1):
    print(f"Fruit #{idx}: {fruit}")

# 2. Zip: Parallel iteration over multiple sequences
for fruit, price in zip(fruits, prices):
    print(f"{fruit}: USD {price:.2f}")

# 3. for-else search pattern
target = "mango"
for fruit in fruits:
    if fruit == target:
        print("Found target!")
        break
else:
    print(f"Target '{target}' was not found in fruits inventory.")`,
      explanation:
        "`enumerate` eliminates manual index incrementing. `zip` iterates multiple collections in lockstep. The `else` block on a `for` loop executes only if the loop completed naturally without hitting `break`.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Iterator Protocol Initiation",
        description: "Python calls `iter(collection)` to construct an iterator holding current traversal state.",
      },
      {
        step: 2,
        title: "Element Retrieval",
        description: "On each cycle, the `FOR_ITER` bytecode calls `next(iterator)` to fetch the next value.",
      },
      {
        step: 3,
        title: "Loop Termination",
        description: "Upon receiving a `StopIteration` signal, the loop terminates cleanly; if no `break` occurred, any `else` block runs.",
      },
    ],
    commonMistakes: [
      {
        mistake: "for i in range(len(arr)): val = arr[i] // Unpythonic indexing",
        why: "More verbose and slower than direct iteration.",
        correct: "for val in arr: # Or for i, val in enumerate(arr): if index needed",
      },
      {
        mistake: "for x in nums: if x < 0: nums.remove(x) // Modifying list while looping",
        why: "Removing elements shifts subsequent items leftward, causing the loop counter to skip elements.",
        correct: "nums = [x for x in nums if x >= 0]",
      },
    ],
    complexity: {
      time: "O(N) linear traversal",
      space: "O(1) memory (generators stream one element at a time)",
      explanation: "Iterators evaluate on-demand without copying sequences.",
    },
    tryItYourself: {
      prompt: "What does `zip` do when the two input lists have unequal lengths?",
      hint: "Does it truncate to the shortest, pad with None, or raise an error?",
      solutionSnippet: "`zip` stops at the length of the shortest input list by default. In Python 3.10+, you can pass `strict=True` to raise a ValueError on length mismatch, or use `itertools.zip_longest`.",
    },
    placementConnection:
      "The `for-else` construct is a frequent favorite in interview questions when searching without needing boolean flag variables (e.g. checking for prime numbers).",
    quickRevision: [
      "Use `enumerate(iterable, start=0)` when both index and element are required.",
      "Use `zip(a, b)` for parallel iteration across multiple lists.",
      "A `for-else` block runs if and only if the loop did not terminate via `break`.",
      "Never mutate a list while iterating over it.",
    ],
  },
  {
    id: "python-functions",
    slug: "functions",
    title: "Functions, Default Arguments & Variable Scope",
    track: "python",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 6,
    estimatedMinutes: 25,
    oneSentence:
      "Python functions are first-class objects defined with `def`, with variable scope resolved via the LEGB rule (Local, Enclosing, Global, Built-in).",
    whyDoWeNeedIt: {
      problem:
        "In recursive algorithms (like DFS) or nested helper functions, modifying an outer variable without understanding scope causes `UnboundLocalError`.",
      realWorldAnalogy:
        "Looking for keys: first check your pockets (Local), then your backpack (Enclosing), then your apartment (Global), and finally the building lost & found (Built-in).",
    },
    visualIntuition: `The LEGB Scope Lookup Rule:
[ Local (L) ]       -> Inside current function body
      | (not found?)
[ Enclosing (E) ]   -> Enclosing outer nested function (nonlocal)
      | (not found?)
[ Global (G) ]      -> Module-level variables (global)
      | (not found?)
[ Built-in (B) ]    -> Python built-in namespace (len, range, min, max)`,
    syntax: {
      defFunc: "def add(a: int, b: int) -> int:\n    return a + b",
      nonlocalScope: "nonlocal counter\ncounter += 1",
    },
    example: {
      title: "Nested functions, LEGB resolution, and the nonlocal keyword in DFS",
      language: "python",
      code: `def count_islands(grid):
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    island_count = 0  # Enclosing variable

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        # Mark as visited
        grid[r][c] = '0'
        # Traverse 4 directions
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                island_count += 1
                dfs(r, c)

    return island_count

# Grid with 2 distinct islands
matrix = [
    ['1', '1', '0'],
    ['1', '0', '0'],
    ['0', '0', '1']
]
print("Islands found:", count_islands(matrix))`,
      explanation:
        "The nested helper `dfs` reads `rows` and `cols` from the enclosing scope. If `dfs` needed to reassign `island_count`, it would require the `nonlocal` keyword.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Function Object Creation",
        description: "The `def` statement creates a `PyFunctionObject` and binds it to the function name in the local namespace.",
      },
      {
        step: 2,
        title: "Default Argument Evaluation",
        description: "Default arguments are evaluated once at definition time and stored in `func.__defaults__`.",
      },
      {
        step: 3,
        title: "Frame Creation",
        description: "Calling the function allocates a new execution frame on the Python call stack, creating a local variable dictionary.",
      },
    ],
    commonMistakes: [
      {
        mistake: "UnboundLocalError: local variable 'count' referenced before assignment",
        why: "Assigning to `count += 1` inside an inner function makes Python treat `count` as local, masking the outer variable before reading it.",
        correct: "Declare `nonlocal count` inside the inner function before mutating it.",
      },
      {
        mistake: "def log(msg, timestamp=time.time()): // Mutable or dynamic default arg",
        why: "`time.time()` executes only once when the module loads, so all calls share the same initial timestamp.",
        correct: "def log(msg, timestamp=None): if timestamp is None: timestamp = time.time()",
      },
    ],
    complexity: {
      time: "O(1) function call invocation overhead",
      space: "O(1) per call stack frame",
      explanation: "Standard frame allocation on the execution stack.",
    },
    tryItYourself: {
      prompt: "What is the difference between `global` and `nonlocal` keywords in Python?",
      hint: "Think about where the variable being modified lives (top-level module vs immediate enclosing function).",
      solutionSnippet: "`global` declares that a variable refers to the top-level module scope, while `nonlocal` binds to a variable in the nearest enclosing (outer nested) function scope.",
    },
    placementConnection:
      "Interviewers test whether candidates understand why `nonlocal` is necessary when implementing backtracking and nested DFS algorithms without passing mutable state containers.",
    quickRevision: [
      "LEGB rule dictates scope lookup: Local &rarr; Enclosing &rarr; Global &rarr; Built-in.",
      "Use `nonlocal` to reassign variables in outer nested functions.",
      "Use `global` to reassign module-level variables inside functions.",
      "Never use mutable default arguments (like `[]` or `{}`); use `None` as sentinel default.",
    ],
  },
];
