import { Lesson } from "@/types/content";

export const cppAdvancedLessons: Lesson[] = [
  {
    id: "cpp-pointers-vs-references",
    slug: "pointers-vs-references",
    title: "Pointers vs References: A Systematic Comparison",
    track: "cpp",
    topicSlug: "advanced",
    topicTitle: "Advanced & Placement Concepts",
    order: 24,
    estimatedMinutes: 25,
    oneSentence:
      "A pointer is an independent variable storing a memory address that can be reassigned or null, whereas a reference is an immutable alias bound permanently to an existing variable upon initialization.",
    whyDoWeNeedIt: {
      problem:
        "Beginners often confuse when to use `*` vs `&`. Using pointers when references suffice introduces null-pointer bugs, while using references when pointers are required prevents reassignment or optional data representation.",
      realWorldAnalogy:
        "A pointer is a sticky note with a street address written on it: you can erase the address and write a new one, or leave it blank (null). A reference is a nickname: 'Bob' is permanently bound to Robert; you cannot reseat the nickname to refer to someone else tomorrow.",
    },
    visualIntuition: `Pointers vs References Memory Model:
1. Pointer (Independent Entity):
   int x = 10;
   int* ptr = &x;
   [ ptr at 0x4000 ] ----holds address----> [ x at 0x5000: 10 ]
   (ptr can be changed to point to y, or set to nullptr)

2. Reference (Pure Alias):
   int x = 10;
   int& ref = x;
   [ x / ref at 0x5000: 10 ] (No separate addressable storage required!)
   (&ref is identical to &x)`,
    syntax: {
      pointer: "int* p = &x;\np = &y;     // Valid: can be reseated\np = nullptr;// Valid: can be null",
      reference: "int& r = x;\nr = y;      // Assigns value of y into x! Cannot reseat alias.",
    },
    example: {
      title: "Comparing pointer reassignment vs reference value assignment",
      language: "cpp",
      code: `#include <iostream>

int main() {
    int a = 10;
    int b = 20;

    // 1. Pointer demonstration
    int* ptr = &a;
    std::cout << "ptr points to a: " << *ptr << "\\n";
    ptr = &b; // Reseating pointer to point to b
    std::cout << "ptr now points to b: " << *ptr << "\\n";

    // 2. Reference demonstration
    int& ref = a;
    std::cout << "ref alias for a: " << ref << "\\n";
    ref = b;  // DOES NOT reseat ref to b! Assigns b's value (20) into a!
    std::cout << "After ref = b: a is now " << a << ", ref is " << ref << "\\n";

    // Addresses
    std::cout << "Address of a: " << &a << ", Address of ref: " << &ref << "\\n"; // Identical!

    return 0;
}`,
      explanation:
        "`ptr = &b` changes which memory address the pointer stores. In contrast, `ref = b` copies the integer value from `b` into `a` because `ref` is permanently bound to `a`.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Symbol Table Aliasing",
        description: "References are often resolved purely in the compiler's symbol table with zero memory allocation when optimized.",
      },
      {
        step: 2,
        title: "Nullability Guarantee",
        description: "References cannot be null in well-formed C++; they must bind to an existing l-value immediately upon declaration.",
      },
      {
        step: 3,
        title: "Arithmetic Capabilities",
        description: "Pointers support pointer arithmetic (`ptr++`, `ptr + 4`), while references do not.",
      },
    ],
    commonMistakes: [
      {
        mistake: "int& r; // Uninitialized reference",
        why: "A reference cannot exist without being bound to an object at the moment of declaration.",
        correct: "int x = 5; int& r = x;",
      },
      {
        mistake: "int& r = *(new int(10)); // Creating reference to raw heap allocation",
        why: "Difficult to delete cleanly and obscures ownership.",
        correct: "Use smart pointers like `std::unique_ptr<int>`.",
      },
    ],
    complexity: {
      time: "O(1) access for both",
      space: "Pointers consume 8 bytes; references frequently consume 0 bytes after compiler inlining",
      explanation: "References eliminate pointer indirection overhead whenever the compiler can alias directly.",
    },
    tryItYourself: {
      prompt: "Can you create an array of references in C++ (e.g. `int& arr[5];`)?",
      hint: "Do references have an address of their own that can be indexed into an array layout?",
      solutionSnippet: "No! Array of references is illegal in C++ because references are not objects and do not have an address of their own. Use `std::vector<std::reference_wrapper<int>>` instead.",
    },
    placementConnection:
      "Interviewers test whether candidates realize that `ref = b` mutates the original variable rather than reseating the reference.",
    quickRevision: [
      "Pointers can be null and can be reseated; references cannot be null and cannot be reseated.",
      "References must be initialized immediately when declared.",
      "Syntax: pointers use `*` and `->`; references use standard direct `.` syntax.",
      "Prefer references for function parameters and operator overloading; use pointers when optional/null or dynamic linked structures are needed.",
    ],
  },
  {
    id: "cpp-const-correctness",
    slug: "const-correctness",
    title: "Const Correctness: Pointers, Methods & Immutability",
    track: "cpp",
    topicSlug: "advanced",
    topicTitle: "Advanced & Placement Concepts",
    order: 25,
    estimatedMinutes: 25,
    oneSentence:
      "Const correctness is the practice of using the `const` keyword to prevent inadvertent mutations, enforced strictly by the compiler at compile time.",
    whyDoWeNeedIt: {
      problem:
        "Accidental state modifications in large codebases create subtle runtime regressions that are notoriously difficult to track down.",
      realWorldAnalogy:
        "A laminated identification card: you can inspect the card as many times as you like, but you cannot write over the printed text without breaking the protective plastic.",
    },
    visualIntuition: `Reading Const Pointers (Read from Right to Left!):
1. const int* ptr;
   ptr is a pointer to [ const int ]
   -> You CANNOT change *ptr (data is read-only). You CAN change ptr (address).

2. int* const ptr;
   ptr is a [ const pointer ] to int
   -> You CAN change *ptr. You CANNOT change ptr (address is locked).

3. const int* const ptr;
   ptr is a [ const pointer ] to [ const int ]
   -> Completely locked. Neither address nor data can change.`,
    syntax: {
      pointerToConst: "const int* p = &x; // *p = 10 error",
      constPointer: "int* const p = &x; // p = &y error",
      constMethod: "int get() const { return val; }",
    },
    example: {
      title: "Const pointers and const member functions",
      language: "cpp",
      code: `#include <iostream>

class Counter {
private:
    int count;

public:
    Counter(int c) : count(c) {}

    // Const member function: promises NOT to modify any member variables
    int getCount() const {
        // count++; // COMPILE ERROR: cannot mutate in const method!
        return count;
    }

    void increment() {
        count++;
    }
};

void inspectCounter(const Counter& c) {
    // Only const member functions can be invoked on a const reference!
    std::cout << "Count is: " << c.getCount() << "\\n";
    // c.increment(); // COMPILE ERROR: increment() is non-const!
}

int main() {
    Counter myCounter(10);
    inspectCounter(myCounter);
    return 0;
}`,
      explanation:
        "The trailing `const` in `int getCount() const` guarantees the function is read-only. Passing objects by `const&` ensures they cannot be accidentally mutated inside functions.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Type Qualifier Checking",
        description: "The compiler adds a read-only qualifier to the type in its internal abstract syntax tree.",
      },
      {
        step: 2,
        title: "Implicit this Pointer Transformation",
        description: "In a const member function, `this` changes from `MyClass* const` to `const MyClass* const`.",
      },
      {
        step: 3,
        title: "Optimization Opportunities",
        description: "Const assertions allow compilers to place constants into read-only text sections and aggressively optimize register caching.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Calling non-const methods on const objects or references",
        why: "The compiler forbids invoking any method that does not carry the `const` promise on a const instance.",
        correct: "Mark all non-mutating member methods with `const`.",
      },
    ],
    complexity: {
      time: "O(1) with zero runtime overhead",
      space: "Zero runtime cost",
      explanation: "Const correctness is entirely evaluated and enforced at compile time.",
    },
    tryItYourself: {
      prompt: "What is the `mutable` keyword used for in C++?",
      hint: "Can a specific member variable ever be modified inside a `const` member function?",
      solutionSnippet: "The `mutable` keyword allows a member variable (such as a mutex, cache, or hit counter) to be modified even inside `const` member functions.",
    },
    placementConnection:
      "Const correctness is a litmus test used by senior interviewers to distinguish self-taught coders from production-ready systems engineers.",
    quickRevision: [
      "Read pointer declarations from right to left to decipher what is const.",
      "`const int*` = data is const; `int* const` = pointer address is const.",
      "Always mark member functions that do not modify state with `const`.",
      "Only `const` member functions can be called on `const` objects and `const` references.",
    ],
  },
  {
    id: "cpp-templates",
    slug: "templates",
    title: "Templates & Generic Programming",
    track: "cpp",
    topicSlug: "advanced",
    topicTitle: "Advanced & Placement Concepts",
    order: 26,
    estimatedMinutes: 30,
    oneSentence:
      "Templates enable generic programming by allowing functions and classes to operate on parameterized types without duplicating source code.",
    whyDoWeNeedIt: {
      problem:
        "Writing separate `findMax` or `Stack` implementations for `int`, `double`, and `string` leads to massive code duplication and maintenance headaches.",
      realWorldAnalogy:
        "A cookie cutter: the cutter shape is defined once (template), but you can stamp it into chocolate, gingerbread, or butter dough (types).",
    },
    visualIntuition: `Template Instantiation Model:
template <typename T>
T findMax(T a, T b) { return (a > b) ? a : b; }

Compile-Time Specialization:
findMax(3, 7)       ---> Compiler generates: int findMax(int, int)
findMax(2.5, 9.1)   ---> Compiler generates: double findMax(double, double)
findMax("a", "b")   ---> Compiler generates: string findMax(string, string)

Zero runtime performance penalty! Machine code is as fast as hand-written types.`,
    syntax: {
      funcTemplate: "template <typename T>\nT add(T a, T b) { return a + b; }",
      classTemplate: "template <typename T>\nclass Box { T val; };",
    },
    example: {
      title: "Function templates and a generic Stack class template",
      language: "cpp",
      code: `#include <iostream>
#include <vector>
#include <string>

// 1. Generic Function Template
template <typename T>
T getMax(T a, T b) {
    return (a > b) ? a : b;
}

// 2. Generic Class Template
template <typename T>
class CustomStack {
private:
    std::vector<T> items;

public:
    void push(const T& val) { items.push_back(val); }
    void pop() { items.pop_back(); }
    T top() const { return items.back(); }
    bool empty() const { return items.empty(); }
};

int main() {
    std::cout << "Max int: " << getMax(10, 20) << "\\n";
    std::cout << "Max double: " << getMax(3.14, 2.71) << "\\n";

    CustomStack<std::string> words;
    words.push("Placement");
    words.push("Ready");

    std::cout << "Stack top: " << words.top() << "\\n";
    return 0;
}`,
      explanation:
        "`template <typename T>` tells the compiler that `T` is a placeholder. When called with `int`, the compiler generates an integer version; when called with `string`, it generates a string version.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Template Parsing",
        description: "The compiler verifies the syntax of the generic template definition during Phase 1 lookup.",
      },
      {
        step: 2,
        title: "Monomorphization (Instantiation)",
        description: "When the compiler encounters a specific call (e.g. `getMax<int>`), it clones the template and substitutes `T` with `int`.",
      },
      {
        step: 3,
        title: "Native Code Generation",
        description: "The concrete types are compiled into native machine code, providing the same runtime speed as manually written code.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Placing template implementations inside a .cpp file instead of a header file",
        why: "Templates are instantiated at compile time. If the compiler cannot see the definition in the translation unit, linking fails with unresolved external symbols.",
        correct: "Define templates completely inside header files (.h or .hpp).",
      },
      {
        mistake: "getMax(5, 5.5) without explicit type specification",
        why: "Compiler fails type deduction because parameter 1 is `int` and parameter 2 is `double`.",
        correct: "getMax<double>(5, 5.5); // Explicit template argument",
      },
    ],
    complexity: {
      time: "O(1) runtime penalty (identical to hand-crafted code)",
      space: "Potential binary code bloat from multiple generated specializations",
      explanation: "Zero runtime cost; compile time and binary size increase slightly.",
    },
    tryItYourself: {
      prompt: "Can a template parameter be a non-type value, such as an integer size?",
      hint: "Think about `std::array<int, 5>`.",
      solutionSnippet: "Yes! Non-type template parameters (e.g. `template <typename T, int Size> class StaticBuffer`) allow passing compile-time integer constants.",
    },
    placementConnection:
      "All of STL (`vector`, `map`, `sort`) is built on templates. Knowing how templates instantiate is critical for systems programming rounds.",
    quickRevision: [
      "Templates enable generic, type-safe programming without runtime overhead.",
      "The compiler generates a separate concrete function/class for each distinct type used.",
      "Template definitions must reside in header files so the compiler can instantiate them during compilation.",
      "Templates support non-type parameters such as compile-time integers.",
    ],
  },
  {
    id: "cpp-lambdas",
    slug: "lambdas",
    title: "Lambdas & Functional Expressions",
    track: "cpp",
    topicSlug: "advanced",
    topicTitle: "Advanced & Placement Concepts",
    order: 27,
    estimatedMinutes: 25,
    oneSentence:
      "A lambda is an anonymous inline function object capable of capturing local variables from its enclosing scope by value or by reference.",
    whyDoWeNeedIt: {
      problem:
        "Writing a separate named function or functor struct for a one-line sorting comparator or condition predicate clutters the global namespace.",
      realWorldAnalogy:
        "A sticky note reminder jotted down for a single temporary errand rather than commissioning an official formal memo.",
    },
    visualIntuition: `Lambda Anatomy:
[ capture_clause ] ( parameters ) -> return_type { body }

Captures:
[]       -> Capture nothing from enclosing scope
[=]      -> Capture all local variables by VALUE (read-only copy)
[&]      -> Capture all local variables by REFERENCE (can mutate!)
[x, &y]  -> Capture x by value, y by reference`,
    syntax: {
      basic: "auto add = [](int a, int b) { return a + b; };",
      captureRef: "int factor = 2;\nauto mult = [&factor](int x) { return x * factor; };",
    },
    example: {
      title: "Using lambdas for custom sorting and count_if filtering",
      language: "cpp",
      code: `#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> nums = {4, 15, 8, 23, 42, 7, 16};

    int threshold = 15;
    // Capture threshold by value into lambda
    int countAbove = std::count_if(nums.begin(), nums.end(), [threshold](int x) {
        return x > threshold;
    });

    std::cout << "Numbers > " << threshold << ": " << countAbove << "\\n";

    // Sorting descending using inline lambda
    std::sort(nums.begin(), nums.end(), [](int a, int b) {
        return a > b;
    });

    std::cout << "Sorted descending: ";
    for (int n : nums) std::cout << n << " ";
    std::cout << "\\n";

    return 0;
}`,
      explanation:
        "The lambda `[threshold](int x) { return x > threshold; }` captures `threshold` and evaluates each element. `std::sort` takes a lambda comparator directly.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Closure Class Generation",
        description: "The compiler secretly creates a unique anonymous functor class with an `operator()` method.",
      },
      {
        step: 2,
        title: "Member Capture Storage",
        description: "Captured variables are stored as member variables inside the generated closure class.",
      },
      {
        step: 3,
        title: "Inlining",
        description: "Because the lambda type is known precisely at compile time, the compiler aggressively inlines the lambda body, matching or beating raw function pointers.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Capturing a local variable by reference in an asynchronous or returning lambda",
        why: "When the enclosing function exits, the stack variable is destroyed, creating a dangling reference when the lambda eventually runs.",
        correct: "Capture by value (`[=]` or `[var]`) if the lambda outlives the current stack frame.",
      },
    ],
    complexity: {
      time: "O(1) call overhead (typically inlined to zero cost)",
      space: "Size of captured variables stored in closure struct",
      explanation: "A lambda with an empty capture `[]` can decay to a standard C function pointer.",
    },
    tryItYourself: {
      prompt: "Can a lambda modify a variable captured by value (`[x]`)?",
      hint: "By default, `operator()` in a lambda is `const`.",
      solutionSnippet: "No, unless you add the `mutable` specifier: `[x]() mutable { x++; }`. However, this only modifies the internal closure copy, not the outer variable.",
    },
    placementConnection:
      "Writing clean lambdas for `std::sort` and graph BFS/DFS traversals demonstrates modern C++ fluency to interviewers.",
    quickRevision: [
      "Lambda syntax: `[capture](params) -> return_type { body }`.",
      "`[=]` captures everything in scope by value; `[&]` captures everything by reference.",
      "Lambdas with empty capture `[]` can decay to regular function pointers.",
      "Lambdas are compiled into anonymous functor structs and are typically completely inlined.",
    ],
  },
  {
    id: "cpp-move-semantics",
    slug: "move-semantics",
    title: "Move Semantics, R-Values & std::move",
    track: "cpp",
    topicSlug: "advanced",
    topicTitle: "Advanced & Placement Concepts",
    order: 28,
    estimatedMinutes: 30,
    oneSentence:
      "Move semantics eliminates costly deep copies by transferring ownership of internal resources from temporary r-value objects using r-value references (`&&`) and `std::move`.",
    whyDoWeNeedIt: {
      problem:
        "When returning a large vector or string from a function, older C++ was forced to perform deep copies of heap allocations, wasting CPU cycles and memory bandwidth.",
      realWorldAnalogy:
        "Moving house: Copy semantics means buying all brand-new furniture to put in the new home and destroying the old house. Move semantics means simply transferring the house keys to the new owner.",
    },
    visualIntuition: `Copy vs Move Semantics:
1. Copy Semantics (Expensive O(N)):
   Vector A: [ data* ] ---> [ 10, 20, 30 ... 1,000,000 ints on Heap ]
   Vector B = A;
   Vector B: [ data* ] ---> [ 10, 20, 30 ... (New heap copy made!) ]

2. Move Semantics (O(1) Pointer Swap):
   Vector A: [ data* ] ---> [ Heap Buffer ]
   Vector B = std::move(A);
   Vector B: [ data* ] ---> Points to SAME Heap Buffer!
   Vector A: [ data* = nullptr ] (A is left in valid empty state)`,
    syntax: {
      rvalueRef: "void process(std::string&& temp);",
      stdMove: "std::vector<int> b = std::move(a);",
    },
    example: {
      title: "Demonstrating move semantics and std::move efficiency",
      language: "cpp",
      code: `#include <iostream>
#include <string>
#include <utility>
#include <vector>

int main() {
    std::vector<std::string> list;

    std::string text = "A very large string that took substantial memory";
    std::cout << "Original text: " << text << "\\n";

    // std::move casts 'text' to an r-value reference (std::string&&)
    list.push_back(std::move(text));

    std::cout << "List contains: " << list[0] << "\\n";
    std::cout << "Original text after std::move (now empty): '" << text << "'\\n";

    return 0;
}`,
      explanation:
        "`std::move` does not actually move any data itself; it performs an unconditional cast of `text` to an r-value reference `std::string&&`, enabling `push_back` to steal its internal heap pointer in $O(1)$ time.",
    },
    howItWorks: [
      {
        step: 1,
        title: "L-values vs R-values",
        description: "An l-value has an identifiable memory location (can take its address `&`). An r-value is a temporary expression or literal that has no persistent identity.",
      },
      {
        step: 2,
        title: "std::move Cast",
        description: "`std::move(x)` unconditionally casts an l-value to an r-value reference `T&&`.",
      },
      {
        step: 3,
        title: "Move Constructor Steal",
        description: "The move constructor copies the raw pointer from the source object and sets the source's pointer to `nullptr` in $O(1)$ time.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using an object after calling std::move on it",
        why: "A moved-from object is in a valid but unspecified state. Accessing its contents leads to undefined behavior or empty data bugs.",
        correct: "Only call `std::move` on variables you will never read from again.",
      },
      {
        mistake: "Returning std::move(localVariable) from a function",
        why: "This pessimizes return value optimization (RVO/NRVO) by forcing a move instead of compiler copy elision.",
        correct: "Simply return `localVariable;` and let the compiler perform NRVO.",
      },
    ],
    complexity: {
      time: "O(1) pointer swap vs O(N) deep copy",
      space: "O(1) additional memory",
      explanation: "Moving transfers ownership of existing memory blocks without allocating new heap space.",
    },
    tryItYourself: {
      prompt: "Does `std::move` perform any runtime movement of bytes on its own?",
      hint: "What is `std::move` under the hood in the C++ standard library?",
      solutionSnippet: "No! `std::move` is purely a compile-time static cast: `static_cast<std::remove_reference_t<T>&&>(t)`. It generates zero assembly instructions.",
    },
    placementConnection:
      "Explaining l-values, r-values, and what `std::move` really does is a standard senior question at top quantitative trading firms and systems teams.",
    quickRevision: [
      "Move semantics replaces expensive $O(N)$ deep copies with $O(1)$ resource theft.",
      "An l-value has a name and address; an r-value is a temporary without a persistent address.",
      "`std::move(x)` is a compile-time cast to an r-value reference (`T&&`).",
      "Never use an object after calling `std::move` on it.",
    ],
  },
];
