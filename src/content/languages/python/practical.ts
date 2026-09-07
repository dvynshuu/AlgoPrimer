import { Lesson } from "@/types/content";

export const pythonPracticalLessons: Lesson[] = [
  {
    id: "python-exceptions",
    slug: "exceptions",
    title: "Exception Handling: try, except, else & finally",
    track: "python",
    topicSlug: "practical",
    topicTitle: "Practical Python",
    order: 18,
    estimatedMinutes: 25,
    oneSentence:
      "Python handles errors gracefully using the `try-except-else-finally` construct, adhering to the EAFP philosophy: 'Easier to Ask for Forgiveness than Permission'.",
    whyDoWeNeedIt: {
      problem:
        "Programs encounter unexpected conditions at runtime (invalid input strings, missing dictionary keys, division by zero). Without exception handling, the process terminates with an unhandled traceback.",
      realWorldAnalogy:
        "An automobile airbag: you do not plan to crash, but if an impact occurs, the safety system triggers immediately to prevent catastrophic destruction.",
    },
    visualIntuition: `try-except-else-finally Flowchart:
[ try block ] ------------------------+
      | (No exception?)               | (Exception raised?)
      v                               v
[ else block ]                 [ except MatchingError ]
(Runs ONLY if no errors)       (Handles the specific error)
      |                               |
      +---------------+---------------+
                      |
                      v
              [ finally block ]
          (ALWAYS runs, no matter what!)`,
    syntax: {
      fullBlock: `try:
    # Risky code
except ValueError as e:
    # Handle error
else:
    # Runs if NO exception
finally:
    # Cleanup runs ALWAYS`,
    },
    example: {
      title: "Clean exception handling with specific error traps and custom exceptions",
      language: "python",
      code: `class InsufficientFundsError(Exception):
    """Custom exception raised when withdrawal exceeds account balance."""
    pass

def process_withdrawal(balance: float, amount: float) -> float:
    try:
        if amount <= 0:
            raise ValueError("Withdrawal amount must be strictly positive.")
        if amount > balance:
            raise InsufficientFundsError(f"Cannot withdraw USD {amount}; available balance is USD {balance}.")
        balance -= amount
    except ValueError as ve:
        print(f"[Validation Error] {ve}")
        return balance
    except InsufficientFundsError as ife:
        print(f"[Transaction Declined] {ife}")
        return balance
    else:
        print(f"[Success] Successfully withdrew USD {amount}. New balance: USD {balance}")
        return balance
    finally:
        print("[Audit] Transaction session closed.\\n")

# Tests
b = 100.0
b = process_withdrawal(b, 50.0)   # Success
b = process_withdrawal(b, 200.0)  # Insufficient funds
b = process_withdrawal(b, -10.0)  # Value error`,
      explanation:
        "Specific exceptions (`ValueError`, `InsufficientFundsError`) are caught cleanly. The `else` block runs only when no errors occurred, and the `finally` block executes unconditionally for cleanup.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Exception Raising",
        description: "The `raise` statement creates an exception instance and unwinds the call stack searching for matching `except` handlers.",
      },
      {
        step: 2,
        title: "Class Hierarchy Matching",
        description: "An `except E:` clause catches any exception that is an instance of `E` or any subclass of `E`.",
      },
      {
        step: 3,
        title: "Guaranteed finally Execution",
        description: "The `finally` block runs even if `return`, `break`, or a re-raised exception occurs in the preceding blocks.",
      },
    ],
    commonMistakes: [
      {
        mistake: "except: pass // Bare except catching all exceptions",
        why: "Catches `KeyboardInterrupt` and `SystemExit`, making it impossible to stop a script with Ctrl+C, and silences all bugs.",
        correct: "except Exception as e: // Or catch specific exceptions",
      },
      {
        mistake: "Putting code that could raise a different error inside the try block instead of else",
        why: "Catch clauses might catch errors unintended for that specific block.",
        correct: "Keep the try block as narrow as possible; put downstream success code in the `else:` block.",
      },
    ],
    complexity: {
      time: "Zero-cost exceptions when no exception is raised (Python 3.11+)",
      space: "O(D) where D is stack depth for the traceback object when an exception occurs",
      explanation: "Modern Python implements zero-cost exception tables that add zero overhead to successful execution.",
    },
    tryItYourself: {
      prompt: "What happens if both the `try` block and the `finally` block contain a `return` statement?",
      hint: "Which block executes last?",
      solutionSnippet: "The `finally` block's `return` statement will override and discard the `try` block's return value!",
    },
    placementConnection:
      "Understanding EAFP vs LBYL ('Look Before You Leap') and designing clean custom domain exceptions is tested in system implementation interviews.",
    quickRevision: [
      "Use `try-except-else-finally` for structured, robust error handling.",
      "The `else` block runs only when NO exceptions were raised in the `try` block.",
      "The `finally` block ALWAYS runs, making it ideal for releasing locks or closing files.",
      "Never write bare `except:`; catch specific exceptions like `ValueError` or `KeyError`.",
    ],
  },
  {
    id: "python-file-io",
    slug: "file-io",
    title: "Context Managers, with Statement & File I/O",
    track: "python",
    topicSlug: "practical",
    topicTitle: "Practical Python",
    order: 19,
    estimatedMinutes: 25,
    oneSentence:
      "The `with` statement utilizes the Context Manager protocol (`__enter__` and `__exit__`) to guarantee deterministic resource cleanup, such as closing file streams.",
    whyDoWeNeedIt: {
      problem:
        "Opening files with `f = open('file.txt')` requires manual `f.close()`. If an exception or early return occurs before closing, file descriptors leak and locks persist.",
      realWorldAnalogy:
        "A revolving door at a secure building: entering the building logs your badge (`__enter__`); exiting through the turnstile logs you out automatically (`__exit__`), ensuring no one gets trapped inside.",
    },
    visualIntuition: `Context Manager Protocol Lifecycle:
with open("data.txt", "w") as f:
     |
     v 1. Calls file.__enter__() -> returns stream object bound to 'f'
     |
  f.write("Placement Ready")
     |
     v 2. Block exits (normally OR via exception)
     |
  Calls file.__exit__(exc_type, exc_val, exc_tb) -> Closes file descriptor!

Guarantees file is closed even if f.write() crashes!`,
    syntax: {
      fileRead: "with open('input.txt', 'r') as f:\n    lines = f.readlines()",
      customContext: "class Timer:\n    def __enter__(self): ...\n    def __exit__(self, *args): ...",
    },
    example: {
      title: "Safe file reading/writing and creating a custom timing context manager",
      language: "python",
      code: `import time

# 1. Standard file operations using 'with'
data_to_write = ["apple\\n", "banana\\n", "cherry\\n"]

with open("fruits.txt", "w") as f:
    f.writelines(data_to_write)

with open("fruits.txt", "r") as f:
    for line_num, line in enumerate(f, start=1):
        print(f"Line {line_num}: {line.strip()}")

# 2. Creating a Custom Context Manager using class protocol
class BenchmarkTimer:
    def __init__(self, label: str):
        self.label = label

    def __enter__(self):
        self.start_time = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        elapsed = time.perf_counter() - self.start_time
        print(f"[{self.label}] Elapsed: {elapsed * 1000:.2f} ms")
        # Returning False allows any exception to propagate naturally
        return False

# Usage
with BenchmarkTimer("Sum Calculation"):
    total = sum(i * i for i in range(500000))
print("Computed sum successfully.")`,
      explanation:
        "The `with` statement ensures files are closed immediately upon block exit. Building a custom context manager requires implementing `__enter__` and `__exit__`.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Enter Invocation",
        description: "Python calls `__enter__()` on the context expression and binds the return value to the variable following `as`.",
      },
      {
        step: 2,
        title: "Protected Execution",
        description: "The inner code block is executed inside an implicit exception handling frame.",
      },
      {
        step: 3,
        title: "Exit Cleanup",
        description: "`__exit__(exc_type, exc_val, exc_tb)` is invoked. If an exception occurred and `__exit__` returns `True`, the exception is suppressed.",
      },
    ],
    commonMistakes: [
      {
        mistake: "lines = open('big_file.txt').readlines() // Reading entire massive file into memory",
        why: "Calling `readlines()` on a 5GB file loads the entire file into RAM, causing an Out of Memory (OOM) crash.",
        correct: "with open('big_file.txt') as f: for line in f: # Streams line-by-line in O(1) memory!",
      },
    ],
    complexity: {
      time: "O(1) enter/exit overhead",
      space: "O(1) memory when iterating line-by-line vs O(F) for readlines()",
      explanation: "Iterating directly over a file object `for line in f:` streams lines on demand.",
    },
    tryItYourself: {
      prompt: "How can you create a context manager in Python using a generator function instead of writing a class?",
      hint: "Check the `contextlib` standard library module.",
      solutionSnippet: `from contextlib import contextmanager
@contextmanager
def my_cm():
    print("Entering")
    try:
        yield
    finally:
        print("Exiting")`,
    },
    placementConnection:
      "Writing clean file parsers and designing custom context managers using `contextlib.contextmanager` demonstrates production-level Python capability.",
    quickRevision: [
      "Always use `with open(...)` to prevent file descriptor leaks.",
      "Iterating directly over `for line in f:` streams one line at a time in $O(1)$ memory.",
      "Custom context managers require `__enter__()` and `__exit__()` methods.",
      "If `__exit__()` returns `True`, it suppresses any exception that occurred inside the block.",
    ],
  },
  {
    id: "python-modules",
    slug: "modules",
    title: "Modules, __name__ & Standard Libraries",
    track: "python",
    topicSlug: "practical",
    topicTitle: "Practical Python",
    order: 20,
    estimatedMinutes: 20,
    oneSentence:
      "A Python module is any Python file whose code can be imported, and `if __name__ == '__main__':` ensures executable code runs only when invoked directly as a standalone script.",
    whyDoWeNeedIt: {
      problem:
        "Without `if __name__ == '__main__':`, test code and script logic placed at top-level executes unexpectedly whenever another file imports a function from the module.",
      realWorldAnalogy:
        "A car engine specification manual that includes a live ignition starter test on page 3: you want to read the instructions without accidentally starting the engine in your living room.",
    },
    visualIntuition: `Module Execution Mechanics:
When running: python solution.py
  Python sets: __name__ = "__main__"
  Result: 'if __name__ == "__main__":' branch EXECUTES!

When importing: import solution (from test.py)
  Python sets: __name__ = "solution"
  Result: 'if __name__ == "__main__":' branch IS SKIPPED!
  Only function/class definitions are loaded!`,
    syntax: {
      guard: "if __name__ == '__main__':\n    main()",
      copying: "import copy\ndeep = copy.deepcopy(nested_list)",
    },
    example: {
      title: "Using __name__ guards, math library, and deepcopy vs shallow copy",
      language: "python",
      code: `import copy
import math

def calculate_hypotenuse(a: float, b: float) -> float:
    # math.hypot avoids intermediate float overflow
    return math.hypot(a, b)

def demonstrate_copy():
    original = [[1, 2], [3, 4]]
    shallow = original.copy()
    deep = copy.deepcopy(original)

    # Mutating nested list
    original[0][0] = 99

    print("Original:", original)
    print("Shallow copy (nested mutated!):", shallow)
    print("Deep copy (completely independent!):", deep)

if __name__ == "__main__":
    print("Script running directly!")
    print("Hypotenuse (3, 4):", calculate_hypotenuse(3.0, 4.0))
    demonstrate_copy()`,
      explanation:
        "The guard `if __name__ == '__main__':` prevents `demonstrate_copy()` from executing if another module imports `calculate_hypotenuse`. `copy.deepcopy()` recursively duplicates all nested objects.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Module Loading & sys.modules Caching",
        description: "When imported, Python locates the `.py` file, compiles it to `.pyc` bytecode, executes top-level statements, and caches the module in `sys.modules`.",
      },
      {
        step: 2,
        title: "Namespace Scoping",
        description: "Module attributes are stored in a dedicated module dictionary (`module.__dict__`).",
      },
      {
        step: 3,
        title: "Duplication Safety in deepcopy",
        description: "`copy.deepcopy` maintains a memoization dictionary of visited object addresses to correctly handle circular references.",
      },
    ],
    commonMistakes: [
      {
        mistake: "from module import * // Wildcard imports",
        why: "Pollutes the current namespace, masks built-in names, and makes it impossible to know where functions originated.",
        correct: "import math # Or from math import sqrt, hypot",
      },
      {
        mistake: "Shallow copy when duplicating nested game boards or 2D DP grids",
        why: "`matrix.copy()` only duplicates the outer array; the inner rows remain aliased.",
        correct: "use copy.deepcopy(matrix) or [[x for x in row] for row in matrix]",
      },
    ],
    complexity: {
      time: "O(1) cached module imports; O(N) for deepcopy of N nested objects",
      space: "O(N) memory for deep copied objects",
      explanation: "Subsequent imports of the same module take O(1) from `sys.modules`.",
    },
    tryItYourself: {
      prompt: "What does `math.inf` represent in Python, and how is it useful in competitive coding?",
      hint: "How do you initialize minimum distance in Dijkstra or shortest path problems?",
      solutionSnippet: "`float('inf')` or `math.inf` represents positive infinity. Any finite number is strictly less than infinity: `x < math.inf` is always True.",
    },
    placementConnection:
      "Using `float('inf')` or `math.inf` for min-tracking variables, and using `copy.deepcopy` when backtracking on complex nested state, are fundamental in coding assessments.",
    quickRevision: [
      "`if __name__ == '__main__':` protects code from running upon import.",
      "Never use wildcard imports (`from x import *`).",
      "`math.inf` represents positive infinity; `math.gcd(a, b)` computes greatest common divisor.",
      "Use `copy.deepcopy()` when independent copies of nested lists or objects are required.",
    ],
  },
];
