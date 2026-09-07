import { Lesson } from "@/types/content";

export const cppCoreLessons: Lesson[] = [
  {
    id: "cpp-pointers",
    slug: "pointers",
    title: "Pointers, Addresses & Memory Architecture",
    track: "cpp",
    topicSlug: "core",
    topicTitle: "Core Memory & Pointers",
    order: 7,
    estimatedMinutes: 30,
    oneSentence:
      "A pointer is a variable that holds the numerical hexadecimal memory address of another variable rather than holding a direct data value.",
    whyDoWeNeedIt: {
      problem:
        "Without pointers, functions can only work on isolated copies of data. Pointers allow direct hardware manipulation, dynamic heap memory management, and zero-copy data passing.",
      realWorldAnalogy:
        "Instead of shipping an entire 500-page book to a colleague across the country, you text them the exact shelf coordinates (Row 4, Shelf B) in the central library.",
    },
    visualIntuition: `Pointer Memory Architecture:
Stack Memory:
Variable 'x':
Address: 0x7ffd5e00  |  Value: [ 42 ] (4-byte int)
        ^
        | (holds memory address of x)
Pointer 'ptr':
Address: 0x7ffd5e08  |  Value: [ 0x7ffd5e00 ] (8-byte pointer on 64-bit CPU)

Operations:
&x   -> Returns address: 0x7ffd5e00
ptr  -> Holds address:    0x7ffd5e00
*ptr -> Dereferences to: 42`,
    syntax: {
      declaration: "int* ptr = nullptr;\nint x = 10;\nptr = &x;\n*ptr = 20;",
    },
    example: {
      title: "Declaring, initializing, and dereferencing pointers",
      language: "cpp",
      code: `#include <iostream>

int main() {
    int value = 42;
    // Address-of operator (&) gets memory location
    int* ptr = &value;

    std::cout << "Value directly: " << value << "\\n";
    std::cout << "Address of value (&value): " << &value << "\\n";
    std::cout << "Pointer value (ptr): " << ptr << "\\n";
    std::cout << "Dereferenced (*ptr): " << *ptr << "\\n";

    // Modifying value through pointer dereference
    *ptr = 99;
    std::cout << "Updated value: " << value << "\\n";

    // Modern C++: Always initialize unassigned pointers with nullptr
    int* safePtr = nullptr;
    if (safePtr != nullptr) {
        std::cout << *safePtr << "\\n";
    } else {
        std::cout << "safePtr is null, cannot dereference safely!\\n";
    }

    return 0;
}`,
      explanation:
        "The `&` operator extracts the address of `value`. `int*` defines a pointer variable. Writing `*ptr = 99` alters the original memory cell where `value` resides.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Memory Address Extraction",
        description: "`&value` inspects the CPU stack frame and retrieves the 64-bit numerical byte offset.",
      },
      {
        step: 2,
        title: "Pointer Storage",
        description: "The pointer variable allocates 8 bytes (on 64-bit architectures) to store that numerical address.",
      },
      {
        step: 3,
        title: "Dereference Operation",
        description: "`*ptr` looks up the address stored in `ptr`, inspects the type `int`, and reads or writes 4 bytes at that target address.",
      },
    ],
    commonMistakes: [
      {
        mistake: "int* ptr;\n*ptr = 10; // Dereferencing uninitialized wild pointer",
        why: "Uninitialized pointers contain random garbage addresses. Writing to them corrupts memory and triggers a Segmentation Fault (SIGSEGV).",
        correct: "int* ptr = nullptr;\nint val = 0;\nptr = &val;\n*ptr = 10;",
      },
      {
        mistake: "int* p = NULL; // Legacy C style",
        why: "NULL is just integer 0, which can lead to ambiguity with function overloading. Modern C++ specifies nullptr.",
        correct: "int* p = nullptr;",
      },
    ],
    complexity: {
      time: "O(1)",
      space: "O(1) (8 bytes on 64-bit systems)",
      explanation: "Pointer lookups and dereferencing are single hardware instructions in assembly (MOV with memory operand).",
    },
    tryItYourself: {
      prompt: "What is the output of `int a = 5; int* p = &a; int** pp = &p; cout << **pp;`?",
      hint: "`pp` is a pointer to a pointer. Dereferencing once gets `p`, dereferencing twice gets `a`.",
      solutionSnippet: "The output is 5. `*pp` gives pointer `p`, and `**pp` gives the integer value `a`.",
    },
    placementConnection:
      "Pointer fundamentals, dereference mechanics, segmentation fault debugging, and `nullptr` vs `NULL` are standard interview questions in Amazon, Qualcomm, Cisco, and Microsoft technical rounds.",
    quickRevision: [
      "`&` gets the memory address of a variable; `*` dereferences an address to access its target value.",
      "On 64-bit architectures, all pointers are 8 bytes regardless of the underlying data type they point to.",
      "Always initialize pointers to `nullptr` instead of leaving them uninitialized as wild pointers.",
      "Dereferencing a null or invalid pointer causes a Segmentation Fault (crash).",
    ],
  },
  {
    id: "cpp-arrays-pointer-arithmetic",
    slug: "arrays-pointer-arithmetic",
    title: "Array Decay & Pointer Arithmetic",
    track: "cpp",
    topicSlug: "core",
    topicTitle: "Core Memory & Pointers",
    order: 8,
    estimatedMinutes: 25,
    oneSentence:
      "In C++, an array name decays to a pointer to its first element when passed into expressions, and pointer arithmetic steps forward or backward by the byte size of the pointed-to type.",
    whyDoWeNeedIt: {
      problem:
        "Computers lay out array elements in contiguous memory. To navigate elements efficiently without high-level loop counter overhead, low-level algorithms rely on pointer arithmetic.",
      realWorldAnalogy:
        "Houses on a street numbered by plot width: adding 1 to the plot address doesn't move you 1 millimeter; it advances you by the full width of an entire house plot.",
    },
    visualIntuition: `Array in Contiguous Memory:
int arr[4] = {10, 20, 30, 40}; (Each int is 4 bytes)

Addresses: 0x1000       0x1004       0x1008       0x100C
Values:   [  10  ]     [  20  ]     [  30  ]     [  40  ]
            ^            ^            ^            ^
          arr          arr+1        arr+2        arr+3
         *(arr)       *(arr+1)     *(arr+2)     *(arr+3)
         arr[0]        arr[1]       arr[2]       arr[3]

Key rule: arr[i] == *(arr + i) == *(i + arr) == i[arr]`,
    syntax: {
      pointerMath: "int* p = arr;\np++; // Advances by sizeof(*p) bytes\nint val = *(p + 2);",
    },
    example: {
      title: "Demonstrating pointer arithmetic and array decay",
      language: "cpp",
      code: `#include <iostream>

void printArray(const int* ptr, int size) {
    // Array decayed into pointer; sizeof(ptr) is 8 bytes, not array total size!
    for (int i = 0; i < size; i++) {
        std::cout << *(ptr + i) << " ";
    }
    std::cout << "\\n";
}

int main() {
    int numbers[] = {10, 20, 30, 40, 50};
    int* p = numbers; // Array decays to &numbers[0]

    std::cout << "Element 0 via *(p): " << *p << "\\n";
    std::cout << "Element 2 via *(p + 2): " << *(p + 2) << "\\n";

    // Advancing pointer
    p += 3;
    std::cout << "Element after p += 3: " << *p << "\\n"; // 40

    // Pointer subtraction gives distance in elements (ptrdiff_t)
    int* start = numbers;
    std::cout << "Elements between p and start: " << (p - start) << "\\n"; // 3

    printArray(numbers, 5);
    return 0;
}`,
      explanation:
        "`*(p + i)` computes the address `p + (i * sizeof(int))` and dereferences it. When an array is passed to a function, it decays to a raw pointer, losing its length metadata.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Array Decay",
        description: "When referenced as an rvalue, the array name `arr` converts automatically to `&arr[0]`.",
      },
      {
        step: 2,
        title: "Byte Scaling",
        description: "When you calculate `ptr + 1`, the compiler automatically multiplies the integer `1` by `sizeof(T)`.",
      },
      {
        step: 3,
        title: "Subscript Equivalence",
        description: "`arr[i]` is literally translated by the compiler as `*(arr + i)`. That is why `i[arr]` is syntactically valid in C++.",
      },
    ],
    commonMistakes: [
      {
        mistake: "void print(int arr[]) { int n = sizeof(arr) / sizeof(arr[0]); }",
        why: "In function parameter lists, `int arr[]` decays to `int* arr`. `sizeof(arr)` is 8 bytes (pointer size), resulting in incorrect length calculation.",
        correct: "void print(const int* arr, int n) // Pass size explicitly or use std::vector / std::array",
      },
    ],
    complexity: {
      time: "O(1) per pointer arithmetic jump",
      space: "O(1)",
      explanation: "Offset calculation is a single base-index-scale assembly addressing mode (e.g. `[rax + rcx * 4]`).",
    },
    tryItYourself: {
      prompt: "What does `cout << 2[\"campus\"];` print in C++?",
      hint: "Remember `a[b]` is equivalent to `*(a + b)`.",
      solutionSnippet: "It prints 'm'. `2[\"campus\"]` is `*(\"campus\" + 2)`, which evaluates to character index 2 ('m').",
    },
    placementConnection:
      "Interviewers frequently ask why `sizeof` inside a function returns 8 for an array parameter, testing your knowledge of array decay.",
    quickRevision: [
      "Arrays decay to a pointer to their first element (`&arr[0]`) when passed into functions.",
      "`arr[i]` is identical to `*(arr + i)` under the hood.",
      "Pointer arithmetic automatically scales by the byte size of the underlying data type.",
      "Subtracting two pointers yielding `ptrdiff_t` returns the count of elements between them.",
    ],
  },
  {
    id: "cpp-dynamic-memory",
    slug: "dynamic-memory",
    title: "Dynamic Memory: Heap, new, delete & Leaks",
    track: "cpp",
    topicSlug: "core",
    topicTitle: "Core Memory & Pointers",
    order: 9,
    estimatedMinutes: 30,
    oneSentence:
      "Dynamic memory allocation allocates heap memory at runtime using the `new` operator, requiring explicit deallocation using `delete` to prevent memory leaks.",
    whyDoWeNeedIt: {
      problem:
        "Stack memory is fixed in size (typically 1MB to 8MB) and stack frames are destroyed when functions exit. To create data whose size is known only at runtime or that must outlive a function, we must allocate from the heap.",
      realWorldAnalogy:
        "Stack memory is like your pocket: quick to reach, but strictly limited. Heap memory is like an off-site rental storage locker: as big as you need, but you must manually sign a lease (`new`) and cancel it (`delete`) or you get billed indefinitely.",
    },
    visualIntuition: `Stack vs Heap Memory:
[ High Memory ]
   | Stack (grows downwards)
   | [ Local function variables, return addresses ]
   |
   v
   ^
   | Heap (grows upwards)
   | [ Dynamically allocated objects via new ]
[ Low Memory ]

new int[5]: Allocates 20 bytes on Heap, returns pointer to first byte.
delete[] ptr: Frees the 20 bytes back to OS.
If delete is forgotten: Memory Leak!`,
    syntax: {
      single: "int* p = new int(42);\ndelete p;\np = nullptr;",
      array: "int* arr = new int[n];\ndelete[] arr;\narr = nullptr;",
    },
    example: {
      title: "Allocating and freeing single variables and dynamic arrays",
      language: "cpp",
      code: `#include <iostream>

int main() {
    // 1. Single heap variable
    int* ptr = new int(100);
    std::cout << "Heap value: " << *ptr << "\\n";
    delete ptr;       // Deallocate
    ptr = nullptr;    // Prevent dangling pointer

    // 2. Dynamic heap array
    int size = 5;
    int* arr = new int[size];

    for (int i = 0; i < size; i++) {
        arr[i] = (i + 1) * 10;
    }

    for (int i = 0; i < size; i++) {
        std::cout << arr[i] << " ";
    }
    std::cout << "\\n";

    // Crucial: Must use delete[] for arrays, not delete!
    delete[] arr;
    arr = nullptr;

    return 0;
}`,
      explanation:
        "`new` requests heap space and returns an address. `delete` releases single allocations; `delete[]` invokes destructors and releases array blocks. Setting the pointer to `nullptr` prevents dangling references.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Heap Allocation Request",
        description: "`new` invokes `malloc` internally to locate a free heap block of appropriate size and runs constructors.",
      },
      {
        step: 2,
        title: "Destruction & Freeing",
        description: "`delete` calls the destructor on the object and returns the memory block to the runtime memory manager.",
      },
      {
        step: 3,
        title: "Dangling Pointer Mitigation",
        description: "After `delete`, the pointer still holds the old address. Assigning `ptr = nullptr` ensures subsequent checks detect that the pointer is inactive.",
      },
    ],
    commonMistakes: [
      {
        mistake: "int* arr = new int[10];\ndelete arr; // Mismatched delete",
        why: "Calling `delete` on an array allocated with `new[]` causes Undefined Behavior. Only the first element might be destructed and memory book-keeping breaks.",
        correct: "delete[] arr;",
      },
      {
        mistake: "int* p = new int(5);\n// function ends without delete",
        why: "The stack pointer `p` is destroyed when the function returns, but the heap block remains allocated indefinitely (Memory Leak).",
        correct: "delete p;\np = nullptr;",
      },
    ],
    complexity: {
      time: "O(1) allocation/deallocation on average",
      space: "O(N) bytes allocated on the heap",
      explanation: "Heap allocation involves finding an available chunk in the allocator's free list.",
    },
    tryItYourself: {
      prompt: "What happens if you dereference a pointer after calling `delete ptr;` without setting `ptr = nullptr;`?",
      hint: "The memory has been returned to the OS, but the pointer still remembers the old address.",
      solutionSnippet: "This is a Dangling Pointer bug causing Undefined Behavior: it might read garbage, crash with SIGSEGV, or corrupt newly allocated data.",
    },
    placementConnection:
      "Interviews at systems companies (Qualcomm, Nvidia, Adobe) heavily test memory leaks, dangling pointers, and double-free vulnerabilities.",
    quickRevision: [
      "Use `new` for dynamic heap allocation and `delete` to free it.",
      "Always match `new[]` with `delete[]` for dynamic arrays.",
      "A memory leak occurs when heap memory is allocated but never freed.",
      "A dangling pointer points to memory that has already been freed; always set freed pointers to `nullptr`.",
    ],
  },
  {
    id: "cpp-strings",
    slug: "strings",
    title: "C-Strings (char[]) vs std::string",
    track: "cpp",
    topicSlug: "core",
    topicTitle: "Core Memory & Pointers",
    order: 10,
    estimatedMinutes: 25,
    oneSentence:
      "`std::string` is a safe, dynamically-resizing wrapper managing a heap buffer, whereas C-strings are raw null-terminated (`\\0`) character arrays prone to buffer overflows.",
    whyDoWeNeedIt: {
      problem:
        "C-style strings require manual memory management, explicit null terminators, and have fixed buffer capacities that easily cause security vulnerabilities like buffer overflows.",
      realWorldAnalogy:
        "A C-string is writing with a typewriter on a fixed index card; if your sentence is too long, you type off the card onto the table. `std::string` is a digital word processor document that expands dynamically as you write.",
    },
    visualIntuition: `C-Style String (char[]) vs std::string:
char cstr[] = "CAT";
Memory: [ 'C' ][ 'A' ][ 'T' ][ '\\0' ] -> Requires null terminator! Length: 3, Size: 4 bytes.

std::string str = "CAT";
Stack Object:
- Pointer to buffer: 0x5a10
- Size: 3
- Capacity: 15 (Small String Optimization SSO avoids heap for short strings!)`,
    syntax: {
      cppString: "std::string s = \"Hello\";\ns += \" World\";\nint len = s.length();",
      cString: "char cstr[10] = \"Hello\";\nstrlen(cstr);",
    },
    example: {
      title: "std::string operations, substrings, and conversion to C-string",
      language: "cpp",
      code: `#include <iostream>
#include <string>

int main() {
    std::string s = "PlacementPrep";

    // Length and indexing
    std::cout << "Length: " << s.length() << "\\n";
    std::cout << "First char: " << s.front() << ", Last char: " << s.back() << "\\n";

    // Substring: substr(start_index, count)
    std::string sub = s.substr(0, 9); // "Placement"
    std::cout << "Substr: " << sub << "\\n";

    // Appending
    s += " 2026";
    std::cout << "Concatenated: " << s << "\\n";

    // Conversion to const char* for legacy C APIs
    const char* raw = s.c_str();
    std::cout << "Raw C-String: " << raw << "\\n";

    // Finding substring
    size_t pos = s.find("Prep");
    if (pos != std::string::npos) {
        std::cout << "Found 'Prep' at index: " << pos << "\\n";
    }

    return 0;
}`,
      explanation:
        "`std::string` handles memory management automatically. `substr(pos, count)` extracts portions of text. When interacting with legacy C libraries, `s.c_str()` yields a null-terminated `const char*`.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Small String Optimization (SSO)",
        description: "For strings shorter than 15–22 characters (depending on compiler), `std::string` stores characters inline inside the stack object without heap allocation.",
      },
      {
        step: 2,
        title: "Dynamic Heap Growth",
        description: "When the string exceeds SSO capacity, it allocates a dynamic buffer on the heap and doubles capacity as needed.",
      },
      {
        step: 3,
        title: "Null-Termination Guarantee",
        description: "`std::string::c_str()` always provides a null-terminated pointer compatible with C functions.",
      },
    ],
    commonMistakes: [
      {
        mistake: "char str[5] = \"hello\"; // Buffer overflow",
        why: "\"hello\" requires 6 bytes: 5 for letters plus 1 for the null terminator '\\0'.",
        correct: "char str[6] = \"hello\"; // Or simply std::string str = \"hello\";",
      },
      {
        mistake: "if (s.substr(0, 3) == \"abc\") // Creating temporary strings in tight loops",
        why: "In performance-critical loops, `substr` creates a new heap copy. In C++17, use `std::string_view` for zero-copy views.",
        correct: "std::string_view sv(s); if (sv.substr(0, 3) == \"abc\")",
      },
    ],
    complexity: {
      time: "O(1) indexing, O(N) copy/concatenation",
      space: "O(N) characters stored in memory",
      explanation: "Access by index `s[i]` is direct pointer offset in O(1).",
    },
    tryItYourself: {
      prompt: "What does `std::string::npos` represent when calling `str.find()`?",
      hint: "What value does it return when the substring is not found?",
      solutionSnippet: "`std::string::npos` is a static constant equal to the maximum possible value of `size_t` (-1 unsigned), indicating 'not found'.",
    },
    placementConnection:
      "String manipulation (anagrams, palindromes, sliding window substrings) constitutes over 25% of coding rounds. Knowing `std::string` methods and `c_str()` is vital.",
    quickRevision: [
      "Always prefer `std::string` over C-style `char[]` in modern C++.",
      "C-strings must end with the null terminator character `\\0`.",
      "Small String Optimization (SSO) avoids heap allocations for short strings.",
      "Use `.c_str()` when you need to pass a `std::string` to an API expecting `const char*`.",
    ],
  },
  {
    id: "cpp-pass-semantics",
    slug: "pass-semantics",
    title: "Pass by Value, Reference & Pointer",
    track: "cpp",
    topicSlug: "core",
    topicTitle: "Core Memory & Pointers",
    order: 11,
    estimatedMinutes: 25,
    oneSentence:
      "Pass-by-value copies the argument data, pass-by-reference creates an alias to the original variable without copying, and pass-by-pointer passes the address of the variable.",
    whyDoWeNeedIt: {
      problem:
        "Passing large objects (like a vector with 100,000 elements) by value copies every single element, causing severe CPU slowdowns and memory thrashing.",
      realWorldAnalogy:
        "Pass-by-value is photocopying a 500-page report so your manager can read it. Pass-by-reference is inviting your manager to sit beside you and review the original binder.",
    },
    visualIntuition: `Function Call Memory Mechanics:
Original: int num = 10 (at 0x2000)

1. Pass by Value: void f(int x)
   New stack frame: [ x = 10 ] (at 0x2050 - distinct copy!)
   Changes to x do NOT affect num.

2. Pass by Reference: void f(int& x)
   New stack frame: [ x is alias for 0x2000 ]
   Changes to x DIRECTLY update num! (Zero copying)

3. Pass by Const Reference: void f(const LargeObject& obj)
   Zero copy + Read-only guarantee. The gold standard for competitive coding!`,
    syntax: {
      byValue: "void func(int x);",
      byRef: "void func(int& x);",
      byConstRef: "void func(const std::vector<int>& v);",
      byPointer: "void func(int* p);",
    },
    example: {
      title: "Comparing the three passing semantics in code",
      language: "cpp",
      code: `#include <iostream>
#include <vector>

// 1. Pass by value: copies data, original untouched
void modifyValue(int x) {
    x = 100;
}

// 2. Pass by reference: modifies original directly
void modifyRef(int& x) {
    x = 100;
}

// 3. Pass by const reference: zero-copy read-only
void inspectVector(const std::vector<int>& vec) {
    std::cout << "Vector size: " << vec.size() << "\\n";
    // vec.push_back(10); // COMPILE ERROR: vec is const!
}

int main() {
    int a = 10;
    modifyValue(a);
    std::cout << "After modifyValue: " << a << "\\n"; // 10

    modifyRef(a);
    std::cout << "After modifyRef: " << a << "\\n";   // 100

    std::vector<int> bigData(1000000, 7);
    inspectVector(bigData); // Fast O(1) pass without copying 1 million ints

    return 0;
}`,
      explanation:
        "`modifyValue` gets a local copy. `modifyRef` receives an alias directly bound to `a`. `inspectVector` passes `bigData` via `const&`, achieving maximum performance with immutability guarantees.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Call Stack Preparation",
        description: "For pass-by-value, the copy constructor duplicates the object onto the callee stack frame.",
      },
      {
        step: 2,
        title: "Reference Address Binding",
        description: "For pass-by-reference, the compiler passes the memory address under the hood, but provides convenient dot syntax.",
      },
      {
        step: 3,
        title: "Const Enforcement",
        description: "The compiler rejects any mutating method calls on `const&` parameters at compile time with zero runtime overhead.",
      },
    ],
    commonMistakes: [
      {
        mistake: "void solve(vector<int> adj[]) // Missing & in graph traversal",
        why: "Passing adjacency lists by value in DFS/BFS copies the entire graph on every recursive call, causing TLE or MLE.",
        correct: "void solve(const vector<vector<int>>& adj) // Or vector<int> adj[] with pointer/reference",
      },
      {
        mistake: "int& getNumber() { int x = 42; return x; }",
        why: "Returning a reference to a local stack variable returns a dangling reference because `x` is destroyed when the function returns.",
        correct: "int getNumber() { int x = 42; return x; } // Return by value",
      },
    ],
    complexity: {
      time: "O(1) for pass-by-reference/pointer vs O(N) for pass-by-value",
      space: "O(1) auxiliary stack memory for references",
      explanation: "Passing by reference only pushes a single 8-byte pointer to the stack.",
    },
    tryItYourself: {
      prompt: "Can a C++ reference be reseated to refer to a different variable after initialization?",
      hint: "Think about whether a reference is an alias or an independent pointer variable.",
      solutionSnippet: "No. Once a reference is bound to a variable, it can never be reseated to point to something else. Reassignment modifies the referred variable.",
    },
    placementConnection:
      "Forgetting `&` in recursive DFS/BFS functions is the #1 reason students get TLE in online assessment rounds at top tech firms.",
    quickRevision: [
      "Use pass-by-value only for small primitive types (`int`, `char`, `bool`, `double`).",
      "Use pass-by-const-reference (`const T&`) for read-only containers, strings, and structs.",
      "Use pass-by-reference (`T&`) when the function must mutate the caller's variable.",
      "Never return a reference or pointer to a local stack variable.",
    ],
  },
];
