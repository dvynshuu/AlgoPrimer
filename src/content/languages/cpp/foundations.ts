import { Lesson } from "@/types/content";

export const cppFoundationsLessons: Lesson[] = [
  {
    id: "cpp-intro-io",
    slug: "intro-io",
    title: "C++ Compilation Model & Fast I/O",
    track: "cpp",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 1,
    estimatedMinutes: 25,
    oneSentence:
      "C++ code compiles directly to native machine instructions through a 4-stage build pipeline, and competitive assessments require disabling stream synchronization for fast I/O.",
    whyDoWeNeedIt: {
      problem:
        "By default, `std::cin` and `std::cout` synchronize their internal buffers with C's `stdio` after every single read or write. For $N = 10^5$ inputs, this causes significant I/O latency that leads to Time Limit Exceeded (TLE).",
      realWorldAnalogy:
        "Driving a racecar with the handbrake half-pulled for backward safety compatibility. Disabling synchronization releases the handbrake so the car drives at full track speed.",
    },
    visualIntuition: `C++ 4-Stage Compilation Pipeline:
[ Source Code: main.cpp ]
           |
           v 1. Preprocessor (expands #include, #define)
[ Translation Unit: main.i ]
           |
           v 2. Compiler (translates C++ to Assembly)
[ Assembly Code: main.s ]
           |
           v 3. Assembler (converts Assembly to Machine Code)
[ Object File: main.o ]
           |
           v 4. Linker (merges object files and C++ Standard Libraries)
[ Native Executable: a.out / main.exe ]`,
    syntax: {
      fastIO: "ios_base::sync_with_stdio(false);\ncin.tie(NULL);",
    },
    example: {
      title: "Fast I/O template and why to avoid std::endl",
      language: "cpp",
      code: `#include <iostream>
using namespace std;

int main() {
    // Disable synchronization between C and C++ standard streams
    ios_base::sync_with_stdio(false);
    // Untie cin from cout so cin does not flush cout buffer before every read
    cin.tie(NULL);

    int n;
    if (cin >> n) {
        long long sum = 0;
        for (int i = 0; i < n; i++) {
            int val;
            cin >> val;
            sum += val;
        }
        // Use '\\n' instead of endl (endl forces an expensive buffer flush!)
        cout << "Sum: " << sum << '\\n';
    }
    return 0;
}`,
      explanation:
        "`std::endl` writes a newline AND forces an expensive OS buffer flush. Replacing `endl` with `\\n` is up to 10x faster.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Preprocessing",
        description: "Directives starting with `#` are processed (header files included, macros expanded).",
      },
      {
        step: 2,
        title: "Compilation to Native Code",
        description: "The compiler optimizes code and generates CPU-specific machine instructions.",
      },
      {
        step: 3,
        title: "Linking",
        description: "The linker connects function calls to standard library binaries (`libstdc++`).",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using std::endl inside a loop of size 10^5: cout << arr[i] << endl;",
        why: "`endl` flushes the OS output buffer on every single iteration, turning a fast buffered write into 100,000 slow system calls.",
        correct: "Always use cout << arr[i] << '\\n';",
      },
    ],
    tryItYourself: {
      prompt: "What does `cin.tie(NULL)` accomplish in competitive programming?",
      hint: "Does cin normally flush cout before asking for input?",
      solutionSnippet: "By default, `cin` is tied to `cout`, meaning it flushes `cout` before every read so prompts appear. `cin.tie(NULL)` unties them, allowing batched I/O.",
    },
    placementConnection:
      "Adding Fast I/O lines is mandatory for clearing C++ Online Assessments on Codeforces, LeetCode, and HackerRank.",
    quickRevision: [
      "4 compilation stages: Preprocessing, Compiling, Assembling, Linking.",
      "Add `ios_base::sync_with_stdio(false); cin.tie(NULL);` to `main()`.",
      "Use `\\n` instead of `endl` to prevent unnecessary buffer flushes.",
      "C++ compiles to native machine code with zero runtime virtual machine overhead.",
    ],
  },
  {
    id: "cpp-variables",
    slug: "variables",
    title: "Variables and Memory in C++",
    track: "cpp",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 2,
    estimatedMinutes: 20,
    oneSentence:
      "A variable in C++ represents a typed chunk of system memory with direct hardware-level access and no runtime overhead.",
    whyDoWeNeedIt: {
      problem:
        "In systems programming and competitive coding, we need deterministic control over byte sizes, stack allocations, and memory alignment without garbage collection pauses.",
      realWorldAnalogy:
        "A physical toolbox where each compartment is precision-machined for a specific tool: a 4-byte slot for standard integers, an 8-byte slot for high-precision floating numbers.",
    },
    visualIntuition: `C++ Memory Architecture:
Stack Frame (Fast, Automatic):
[ int age = 19 ] -> 4 bytes directly on CPU stack
[ double gpa = 9.1 ] -> 8 bytes IEEE 754 float
Heap / Free Store (Manual via new/delete):
[ int* ptr = new int(10) ] -> ptr holds 64-bit raw address to heap block`,
    syntax: {
      declaration: "int age = 19;\nconst double PI = 3.1415926535;",
    },
    example: {
      title: "Variable sizes and standard I/O in C++",
      language: "cpp",
      code: `#include <iostream>

int main() {
    int rollNumber = 42;
    double cgpa = 8.75;
    char grade = 'A';
    bool isShortlisted = true;

    std::cout << "Roll: " << rollNumber << "\\n";
    std::cout << "Size of int: " << sizeof(int) << " bytes\\n";
    std::cout << "Size of double: " << sizeof(double) << " bytes\\n";
    return 0;
}`,
      explanation:
        "C++ compiles directly to machine code. The `sizeof` operator reports the exact byte footprint on your target CPU architecture.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Stack Reservation",
        description: "The compiler offsets the CPU stack pointer (RSP) by the sum of sizes of local variables.",
      },
      {
        step: 2,
        title: "Direct Machine Assignment",
        description: "Values are moved directly into memory via MOV assembly instructions without intermediate interpreters.",
      },
      {
        step: 3,
        title: "Scope Exit",
        description: "When the enclosing curly brace ends, the stack pointer restores, instantly deallocating the memory.",
      },
    ],
    commonMistakes: [
      {
        mistake: "int uninit; std::cout << uninit;",
        why: "In C++, uninitialized local primitive variables contain indeterminate 'garbage memory' (whatever bits were previously left in that RAM location).",
        correct: "int uninit = 0; std::cout << uninit;",
      },
      {
        mistake: "int large = 2000000000; large = large * 2;",
        why: "Signed 32-bit integer overflow in C++ is undefined behavior (UB), not just a rollover.",
        correct: "long long large = 2000000000LL; large = large * 2;",
      },
    ],
    complexity: {
      time: "O(1) allocation and access",
      space: "Compile-time fixed byte allocation",
      explanation: "Direct CPU stack operations execute in single-digit clock cycles.",
    },
    tryItYourself: {
      prompt: "Find the memory address of an integer variable using the address-of operator (&).",
      hint: "Use std::cout << &variableName.",
      solutionSnippet: `int x = 100;
std::cout << "Memory address: " << &x << "\\n";`,
    },
    placementConnection:
      "Competitive programming and Online Assessments (OAs) in C++ require using `long long` whenever problem constraints mention sums exceeding 10^9 to prevent integer overflow WA (Wrong Answer).",
    quickRevision: [
      "Always initialize local variables to avoid undefined behavior from garbage bits.",
      "Use `sizeof()` to verify data type size on your system.",
      "Use `long long` for values up to 9 * 10^18.",
      "`const` protects values from accidental reassignment at compile time.",
    ],
  },
  {
    id: "cpp-operators",
    slug: "operators",
    title: "Operators, Bit Shifts & Precedence",
    track: "cpp",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 3,
    estimatedMinutes: 25,
    oneSentence:
      "C++ operators interact directly with hardware registers, and bitwise operations enable fast arithmetic and flag masking.",
    whyDoWeNeedIt: {
      problem:
        "High-performance operations like bitmask dynamic programming, subset generation, and parity testing require bit-level manipulation without arithmetic division overhead.",
      realWorldAnalogy:
        "Operating a mechanical gearbox directly vs through an automated electronic clutch.",
    },
    visualIntuition: `Bitwise XOR (^) as a Toggle:
Value:       1 0 1 0 (10)
Mask:        0 0 1 0 (2)
            --------
Result (^):  1 0 0 0 (8) -> Bit 1 was toggled off!
XOR again:   1 0 1 0 (10) -> Toggled back on! (Reversible!)`,
    syntax: {
      bitwise: "int a = 5, b = 3;\nint andVal = a & b;\nint orVal  = a | b;\nint xorVal = a ^ b;\nint lshift = a << 1;\nint rshift = a >> 1;",
    },
    example: {
      title: "Fast multiplication and division using bit shifts",
      language: "cpp",
      code: `#include <iostream>
using namespace std;

int main() {
    int n = 16;

    // Multiply by 2 using left shift
    cout << "16 * 2 = " << (n << 1) << "\\n"; // 32

    // Divide by 2 using right shift
    cout << "16 / 2 = " << (n >> 1) << "\\n"; // 8

    // Check if odd in 1 CPU cycle
    int val = 27;
    if (val & 1) {
        cout << val << " is odd!\\n";
    }
    return 0;
}`,
      explanation:
        "Bit shifting shifts binary representations left or right by K bits, corresponding to multiplication or division by $2^K$.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Register Execution",
        description: "Bitwise operators map directly to ALU instructions (`AND`, `OR`, `XOR`, `SHL`, `SHR`).",
      },
      {
        step: 2,
        title: "Unsigned vs Signed Shift",
        description: "Right-shifting signed negative numbers preserves the sign bit (arithmetic shift); right-shifting unsigned numbers fills with 0 (logical shift).",
      },
    ],
    commonMistakes: [
      {
        mistake: "1 << 35 on 32-bit integers",
        why: "Shifting by an amount greater than or equal to the bit width of the integer is undefined behavior.",
        correct: "1LL << 35 (use long long 1LL).",
      },
    ],
    tryItYourself: {
      prompt: "How can you count the number of set bits (1s) in an integer in C++ using a built-in function?",
      hint: "__builtin_popcount(n)",
      solutionSnippet: `int count = __builtin_popcount(n); // For 32-bit int
int countLL = __builtin_popcountll(n); // For 64-bit long long`,
    },
    placementConnection:
      "GCC builtins like `__builtin_popcount(n)` and `__builtin_clz(n)` are commonly used by top competitive programmers in C++.",
    quickRevision: [
      "`n << k` = $n \\times 2^k$.",
      "`n >> k` = $n / 2^k$.",
      "Use `1LL << k` when shifting into 64-bit bounds.",
      "`__builtin_popcount(n)` counts set bits in hardware.",
    ],
  },
  {
    id: "cpp-conditions",
    slug: "conditions",
    title: "Conditionals & Fast Logic in C++",
    track: "cpp",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 4,
    estimatedMinutes: 25,
    oneSentence:
      "Conditionals in C++ steer CPU execution flow based on zero vs non-zero integral conditions and boolean expressions.",
    whyDoWeNeedIt: {
      problem:
        "Algorithms must adapt dynamically to edge cases (e.g. empty lists, negative inputs, boundary conditions) before proceeding to heavier computations.",
      realWorldAnalogy:
        "A circuit breaker that instantly trips and disconnects power if electrical load exceeds safe amperage.",
    },
    visualIntuition: `Short-Circuit Evaluation:
Expression: (ptr != nullptr && ptr->val > 0)
Step 1: Check if ptr != nullptr.
  -> If false: Immediately abort evaluation!
  -> If true:  Proceed safely to dereference ptr->val.
Result: Eliminates segmentation faults and null dereferences.`,
    syntax: {
      ifElse: `if (condition) {
    // code
} else if (anotherCondition) {
    // code
} else {
    // fallback
}`,
    },
    example: {
      title: "Checking number properties with ternary and if-else",
      language: "cpp",
      code: `#include <iostream>

int main() {
    int marks = 85;

    if (marks >= 90) {
        std::cout << "Grade: S\\n";
    } else if (marks >= 80) {
        std::cout << "Grade: A\\n";
    } else {
        std::cout << "Grade: B\\n";
    }

    // Ternary operator for concise assignment
    std::string status = (marks >= 40) ? "Passed" : "Failed";
    std::cout << "Status: " << status << "\\n";
    return 0;
}`,
      explanation:
        "The ternary operator `condition ? expr1 : expr2` is an expression, allowing clean inline value assignments.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Integer Truthiness",
        description: "In C++, 0 evaluates to false; any non-zero value evaluates to true.",
      },
      {
        step: 2,
        title: "Branch Prediction",
        description: "The CPU pipeline predicts the likely branch path to keep instruction throughput high.",
      },
      {
        step: 3,
        title: "Short Circuiting",
        description: "`&&` halts on first false; `||` halts on first true.",
      },
    ],
    commonMistakes: [
      {
        mistake: "if (x = 0) { std::cout << \"Zero\"; }",
        why: "In C++, assignment '=' returns the assigned value. `x = 0` evaluates to 0 (false), so the branch never runs while silently mutating x!",
        correct: "if (x == 0) { std::cout << \"Zero\"; }",
      },
      {
        mistake: "if (0 < x < 10) { ... }",
        why: "Evaluates left to right as `(0 < x) < 10`. If `0 < x` is true (1), then `1 < 10` is true regardless of x!",
        correct: "if (x > 0 && x < 10) { ... }",
      },
    ],
    tryItYourself: {
      prompt: "Use a ternary operator to find the minimum of two integers 'a' and 'b'.",
      hint: "int minVal = (a < b) ? a : b;",
      solutionSnippet: `int a = 15, b = 27;
int minVal = (a < b) ? a : b;`,
    },
    placementConnection:
      "Branch-heavy code can cause CPU branch mispredictions. Placement interviewers value writing clean, minimal conditionals that check the most common or exit conditions first.",
    quickRevision: [
      "Any non-zero integer is treated as true in C++.",
      "Always use `==` for comparisons, never single `=`.",
      "Short-circuit evaluation is essential for safe pointer dereferencing.",
      "Switch statements compile into O(1) jump tables for integer/enum branches.",
    ],
  },
  {
    id: "cpp-loops",
    slug: "loops",
    title: "Loops and References in C++",
    track: "cpp",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 5,
    estimatedMinutes: 30,
    oneSentence:
      "Loops automate repetitive computational workflows, and C++ references (`&`) enable modifying collections during iteration without expensive copies.",
    whyDoWeNeedIt: {
      problem:
        "If you loop over a vector of 100,000 large objects by value `for (auto item : vec)`, C++ copies each object into temporary memory on every iteration, destroying performance.",
      realWorldAnalogy:
        "Passing a heavy book to someone: pass-by-value makes a photocopy of the entire 1000-page book; pass-by-reference gives them the page number directly.",
    },
    visualIntuition: `Pass by Value vs Pass by Reference:
By Value (Copies data):
Vector: [ Obj A, Obj B ] ----> loop temp: copy of Obj A (Heavy!)

By Reference (Alias &):
Vector: [ Obj A, Obj B ]
             ^
             |
        auto& item (Points directly to Obj A with ZERO copy!)`,
    syntax: {
      rangeBasedFor: "for (const auto& item : collection) { /* read-only */ }\nfor (auto& item : collection) { /* mutable */ }",
    },
    example: {
      title: "In-place modification with range-based for loops",
      language: "cpp",
      code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5};

    // Double each number in-place using reference &
    for (auto& n : nums) {
        n *= 2;
    }

    // Print using const reference to prevent accidental writes
    for (const auto& n : nums) {
        std::cout << n << " ";
    }
    std::cout << "\\n";
    return 0;
}`,
      explanation:
        "Using `auto&` binds directly to the memory address of the vector's element, doubling it in-place with zero memory allocation.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Iterator Binding",
        description: "A range-based loop expands under the hood to iterator pointers: `auto begin = v.begin(), end = v.end()`.",
      },
      {
        step: 2,
        title: "Reference Binding",
        description: "`auto&` binds an alias to `*begin`, avoiding any constructor or copy calls.",
      },
      {
        step: 3,
        title: "Increment",
        description: "The iterator pointer increments to the next memory address until reaching `end`.",
      },
    ],
    commonMistakes: [
      {
        mistake: "for (auto x : largeVector) { ... }",
        why: "Omitting `&` forces C++ to copy each element into `x`. If the vector holds strings or structs, this causes massive performance degradation.",
        correct: "for (const auto& x : largeVector) { ... }",
      },
      {
        mistake: "Modifying a vector's size (push_back/erase) inside a range-based loop",
        why: "Reallocating the vector invalidates all internal pointers/iterators, leading to undefined behavior and segmentation faults.",
        correct: "Use index-based traversal or standard library algorithms like `std::remove_if`.",
      },
    ],
    complexity: {
      time: "O(n) linear scan",
      space: "O(1) auxiliary space with reference &",
      explanation: "Iterating by reference avoids allocating memory for copies, keeping auxiliary space strictly constant.",
    },
    tryItYourself: {
      prompt: "Write a loop that squares all elements of a vector `nums = {2, 4, 6}` in place.",
      hint: "Use `for (int& x : nums) { x = x * x; }`.",
      solutionSnippet: `for (int& x : nums) {
    x = x * x;
}`,
    },
    placementConnection:
      "Pass-by-reference (`&`) is tested in every C++ technical interview. Failing to pass vectors by reference to helper functions (like DFS/BFS) creates accidental O(n^2) time complexity and MLE (Memory Limit Exceeded).",
    quickRevision: [
      "Always use `const auto&` for read-only iterations to avoid copying objects.",
      "Use `auto&` when you need to modify elements in place.",
      "Never add or remove elements from a vector while iterating over it.",
      "In standard functions, pass large collections as `const vector<int>& v`.",
    ],
  },
  {
    id: "cpp-functions",
    slug: "functions",
    title: "Functions, Inline Functions & Default Args",
    track: "cpp",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 6,
    estimatedMinutes: 25,
    oneSentence:
      "Functions modularize algorithms in C++, and 'inline' functions eliminate call stack jump overhead by substituting function body directly at call sites.",
    whyDoWeNeedIt: {
      problem:
        "Calling a tiny 1-line helper function $10^8$ times inside a tight loop creates function call overhead (pushing registers, jumping, restoring registers). `inline` eliminates that cost.",
      realWorldAnalogy:
        "A macro key on a keyboard. Instead of opening an app and clicking three menus, the key directly types the shortcut commands.",
    },
    visualIntuition: `Standard Function Call vs Inline Expansion:
Standard Call:
Caller ----> Push parameters -> Call instruction -> Jump to 0x400 -> Execute -> Return -> Pop
(Adds CPU instruction overhead)

Inline Function:
Caller ----> [ Function Body Pasted Directly Into Caller Code ]
(Zero function call overhead!)`,
    syntax: {
      declaration: "inline int square(int x) { return x * x; }\nvoid process(int a, int b = 0); // default argument",
    },
    example: {
      title: "Inline utility function and default parameters",
      language: "cpp",
      code: `#include <iostream>
using namespace std;

// Inline function suggestion to the compiler
inline int fastMax(int a, int b) {
    return (a > b) ? a : b;
}

// Function with default parameter
void printProfile(string name, string college = "Campus Prep Academy") {
    cout << "Student: " << name << ", College: " << college << "\\n";
}

int main() {
    cout << "Max: " << fastMax(100, 250) << "\\n";
    printProfile("Aman"); // Uses default college
    printProfile("Sneha", "IIT Bombay"); // Overrides default
    return 0;
}`,
      explanation:
        "Default arguments must be specified from right to left in the parameter list.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Compiler Optimization",
        description: "`inline` is a hint. Modern compilers automatically inline small methods during `-O2` / `-O3` optimization.",
      },
      {
        step: 2,
        title: "Default Parameter Rule",
        description: "Default arguments can only be defined once (usually in header file prototype, not repeated in implementation).",
      },
    ],
    commonMistakes: [
      {
        mistake: "void func(int a = 10, int b); // Non-trailing default arg",
        why: "Parameters without defaults cannot follow parameters with defaults.",
        correct: "void func(int b, int a = 10);",
      },
    ],
    tryItYourself: {
      prompt: "Can a recursive function be effectively inlined?",
      hint: "Can the compiler paste infinite copies of a function into itself at compile time?",
      solutionSnippet: "No! Recursion depth is generally dynamic at runtime, so compilers ignore inline hints for recursive functions.",
    },
    placementConnection:
      "Understanding compiler inlining and the performance cost of function call overhead is evaluated in C++ systems engineering roles.",
    quickRevision: [
      "`inline` suggests replacing call with function body to eliminate jump overhead.",
      "Default arguments must appear on trailing parameters (right-most).",
      "Modern compilers inline small functions automatically during optimization.",
      "Function prototypes allow declaring functions before defining them.",
    ],
  },
];
