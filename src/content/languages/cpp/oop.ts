import { Lesson } from "@/types/content";

export const cppOopLessons: Lesson[] = [
  {
    id: "cpp-classes-objects",
    slug: "classes-objects",
    title: "Classes, Objects & Member Functions",
    track: "cpp",
    topicSlug: "oop",
    topicTitle: "Object-Oriented Programming",
    order: 12,
    estimatedMinutes: 25,
    oneSentence:
      "A class is a user-defined blueprint defining data attributes and behavior methods, while an object is an instantiated block of memory adhering to that blueprint.",
    whyDoWeNeedIt: {
      problem:
        "Procedural programming separates data structures from the functions that manipulate them, leading to loose invariants where data can be put into invalid states across disparate functions.",
      realWorldAnalogy:
        "A class is the architectural schematic of an electric vehicle; an object is the physical car manufactured on the assembly line parked in your driveway.",
    },
    visualIntuition: `Class vs Object in Memory:
Class Definition (Compile-time type):
class BankAccount {
    int id;       // 4 bytes
    double bal;   // 8 bytes
}

Instantiation on Stack:
BankAccount acc1;
[ 0x3000: id = 101 ][ 0x3004: padding ][ 0x3008: bal = 5000.0 ]
Total memory = 16 bytes (aligned to 8 bytes)

'this' Pointer:
When calling acc1.deposit(100), the compiler passes &acc1 implicitly:
BankAccount::deposit(&acc1, 100);`,
    syntax: {
      declaration: "class MyClass {\nprivate:\n    int secret;\npublic:\n    void display();\n};",
    },
    example: {
      title: "Class definition with access specifiers and the 'this' pointer",
      language: "cpp",
      code: `#include <iostream>
#include <string>

class Student {
private:
    std::string name;
    int rollNo;
    double cgpa;

public:
    // Member function definition inside class
    void setData(std::string name, int rollNo, double cgpa) {
        // 'this' pointer resolves name shadowing
        this->name = name;
        this->rollNo = rollNo;
        this->cgpa = cgpa;
    }

    void display() const {
        std::cout << "Student: " << name << " | Roll: " << rollNo << " | CGPA: " << cgpa << "\\n";
    }
};

int main() {
    Student s1;
    s1.setData("Aarav", 101, 9.4);
    s1.display();

    return 0;
}`,
      explanation:
        "Data members in `private:` cannot be accessed directly from outside the class. The `this` pointer holds the address of the invoking object (`s1`).",
    },
    howItWorks: [
      {
        step: 1,
        title: "Memory Allocation",
        description: "Declaring `Student s1;` allocates contiguous stack space equal to the cumulative size of member variables (plus alignment padding).",
      },
      {
        step: 2,
        title: "Implicit 'this' Argument",
        description: "Member functions are compiled into global assembly routines with an implicit first parameter: `Student* const this`.",
      },
      {
        step: 3,
        title: "Access Specifier Enforcement",
        description: "Access rules (`private`, `public`, `protected`) are strictly verified by the compiler at compile time with zero runtime performance cost.",
      },
    ],
    commonMistakes: [
      {
        mistake: "class Node { int val; }; // default access is private in class",
        why: "Unlike `struct` (where default visibility is `public`), a C++ `class` defaults to `private`. Code outside cannot access `val`.",
        correct: "class Node { public: int val; }; // Or struct Node { int val; };",
      },
      {
        mistake: "class A { ... } // Missing semicolon at end of class declaration",
        why: "C++ requires a terminating semicolon after class closing braces `};`.",
        correct: "class A { ... };",
      },
    ],
    complexity: {
      time: "O(1) member access",
      space: "O(1) memory per object instance",
      explanation: "Accessing a member variable is an immediate offset calculation from `this`.",
    },
    tryItYourself: {
      prompt: "What is `sizeof` an empty class in C++ (e.g. `class Empty {};`)?",
      hint: "Every distinct object in C++ must have a unique memory address.",
      solutionSnippet: "`sizeof(Empty)` is 1 byte, so that distinct instances of an empty class occupy distinct memory addresses.",
    },
    placementConnection:
      "Understanding the exact difference between `struct` and `class` in C++ and how `this` pointer operates under the hood is a classic first-round screening question.",
    quickRevision: [
      "`class` members are `private` by default; `struct` members are `public` by default.",
      "The `this` pointer is a hidden pointer passed to all non-static member functions pointing to the calling object.",
      "C++ classes require a terminating semicolon `};` at the end of their declaration.",
      "Access specifiers have zero runtime overhead; they are enforced entirely at compile time.",
    ],
  },
  {
    id: "cpp-constructors-destructors",
    slug: "constructors-destructors",
    title: "Constructors, Destructors & RAII",
    track: "cpp",
    topicSlug: "oop",
    topicTitle: "Object-Oriented Programming",
    order: 13,
    estimatedMinutes: 30,
    oneSentence:
      "Constructors initialize object state upon creation, while destructors execute automatically upon scope exit, forming the foundation of RAII (Resource Acquisition Is Initialization).",
    whyDoWeNeedIt: {
      problem:
        "Manually opening files, allocating memory, and remembering to clean them up on every possible return path or exception is error-prone. Destructors automate resource cleanup deterministically.",
      realWorldAnalogy:
        "A hotel room keycard switch: inserting the card turns on the lights and air conditioner (constructor); removing the card when you walk out automatically turns everything off (destructor).",
    },
    visualIntuition: `RAII (Resource Acquisition Is Initialization) Lifecycle:
{
    SmartBuffer buf(1024); // Constructor runs -> Heap memory allocated
    
    // ... work with buf ...
    if (errorOccurs) return; // Destructor AUTOMATICALLY runs! Memory freed!
} // End of scope: Destructor AUTOMATICALLY runs! Memory freed!

No memory leaks, even if exceptions are thrown!`,
    syntax: {
      initializerList: "ClassName(int a, int b) : x(a), y(b) { /* body */ }",
      destructor: "~ClassName() { /* cleanup */ }",
    },
    example: {
      title: "Parameterized constructors, member initializer lists, and destructor cleanup",
      language: "cpp",
      code: `#include <iostream>

class DynamicArray {
private:
    int* data;
    int size;

public:
    // Member initializer list (faster and mandatory for const/references)
    DynamicArray(int sz) : size(sz), data(new int[sz]) {
        std::cout << "Allocated dynamic array of size " << size << "\\n";
        for (int i = 0; i < size; i++) data[i] = 0;
    }

    // Destructor: clean up heap resources
    ~DynamicArray() {
        delete[] data;
        std::cout << "Destructor called: heap memory freed successfully.\\n";
    }

    void set(int idx, int val) {
        if (idx >= 0 && idx < size) data[idx] = val;
    }
};

int main() {
    {
        DynamicArray arr(5);
        arr.set(0, 42);
        // Exiting block scope triggers destructor automatically
    }
    std::cout << "Scope exited.\\n";
    return 0;
}`,
      explanation:
        "The member initializer list `: size(sz), data(new int[sz])` initializes fields directly before constructor body execution. The destructor `~DynamicArray()` frees the heap memory automatically when `arr` goes out of scope.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Memory Allocation & Initializer List",
        description: "Memory for the object is reserved, and base classes/members are constructed in declaration order using the initializer list.",
      },
      {
        step: 2,
        title: "Constructor Body",
        description: "Statements inside `{}` are executed after all members are already initialized.",
      },
      {
        step: 3,
        title: "Deterministic Scope-Exit Destruction",
        description: "When the enclosing scope ends (or stack unwinds during an exception), destructors are invoked in reverse order of construction.",
      },
    ],
    commonMistakes: [
      {
        mistake: "MyClass(int val) { this->val = val; } // Assignment instead of initializer list",
        why: "In assignment inside constructor body, members are first default-constructed, then overwritten. Initializer lists construct members directly in a single step.",
        correct: "MyClass(int val) : val(val) {}",
      },
      {
        mistake: "Shallow copy with pointer members without defining a copy constructor",
        why: "Default copy constructor performs a shallow copy of the pointer address, causing both objects to delete the same memory on destruction (Double-Free Crash).",
        correct: "Implement the Rule of Three/Five: custom copy constructor, copy assignment operator, and destructor.",
      },
    ],
    complexity: {
      time: "O(1) constructor/destructor execution overhead",
      space: "O(1) auxiliary stack space",
      explanation: "Destructor invocation is injected directly by the compiler as an assembly epilogue.",
    },
    tryItYourself: {
      prompt: "Can a destructor be overloaded with different parameters in C++?",
      hint: "Does a destructor ever take arguments when invoked at scope exit?",
      solutionSnippet: "No. A destructor takes zero arguments and cannot be overloaded. There is only one destructor per class.",
    },
    placementConnection:
      "RAII and the 'Rule of Three / Rule of Five' are foundational C++ interview topics at companies like Bloomberg, Tower Research, and Morgan Stanley.",
    quickRevision: [
      "Member initializer lists construct members directly and are mandatory for `const` and reference members.",
      "Destructors begin with a tilde `~`, accept no parameters, and cannot be overloaded.",
      "RAII guarantees resource cleanup on scope exit, preventing leaks even during exceptions.",
      "If a class manages raw heap resources, follow the Rule of Three (Destructor, Copy Constructor, Copy Assignment).",
    ],
  },
  {
    id: "cpp-encapsulation",
    slug: "encapsulation",
    title: "Encapsulation, Invariants & Friend Functions",
    track: "cpp",
    topicSlug: "oop",
    topicTitle: "Object-Oriented Programming",
    order: 14,
    estimatedMinutes: 20,
    oneSentence:
      "Encapsulation bundles data with the methods that validate and operate on it, restricting direct external access to maintain strict business invariants.",
    whyDoWeNeedIt: {
      problem:
        "If class fields are public, any external code can assign invalid data (such as a negative account balance or an impossible month 13), corrupting system integrity.",
      realWorldAnalogy:
        "A bank ATM: you cannot reach into the safe drawer directly to grab notes; you must interact through the keypad interface which enforces PIN checks and withdrawal limits.",
    },
    visualIntuition: `Encapsulation Barrier:
+---------------------------------------------+
| Class Boundary                              |
|   Private Data:                             |
|     double balance; (Protected inside)      |
|                                             |
|   Public Interface:                         |
|     deposit(amt) -> validates amt > 0       |
|     withdraw(amt)-> validates amt <= bal    |
|     getBalance() -> read-only access        |
+---------------------------------------------+
        ^
        | Public methods safely guard private state
External Code`,
    syntax: {
      friendFunc: "class Box {\n    friend void inspect(const Box& b);\nprivate:\n    int secret;\n};",
    },
    example: {
      title: "Encapsulating state invariants and granting selective access via friend functions",
      language: "cpp",
      code: `#include <iostream>

class BankAccount {
private:
    double balance;

public:
    BankAccount(double initialBalance) {
        balance = (initialBalance >= 0.0) ? initialBalance : 0.0;
    }

    bool withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }

    double getBalance() const { return balance; }

    // Friend function: not a member, but given special access to private fields
    friend void auditAccount(const BankAccount& acc);
};

void auditAccount(const BankAccount& acc) {
    std::cout << "[AUDIT LOG] Internal raw balance: $" << acc.balance << "\\n";
}

int main() {
    BankAccount account(500.0);
    account.withdraw(150.0);
    std::cout << "Public balance: $" << account.getBalance() << "\\n";

    auditAccount(account);
    return 0;
}`,
      explanation:
        "`balance` is protected from direct external tampering. `withdraw` validates logic. `auditAccount` is declared as a `friend`, allowing it to inspect private variables without exposing them publicly.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Access Restriction",
        description: "The compiler rejects any syntax attempting to access `account.balance` from non-member, non-friend functions.",
      },
      {
        step: 2,
        title: "Invariant Preservation",
        description: "All state mutations pass through public member functions containing conditional checks and validation.",
      },
      {
        step: 3,
        title: "Friend Privilege Granting",
        description: "The `friend` declaration in the class body instructs the compiler's symbol table to allow that specific function access to private members.",
      },
    ],
    commonMistakes: [
      {
        mistake: "friendship is inherited or mutual",
        why: "Friendship in C++ is neither inherited nor transitive nor mutual. If Class A is a friend of Class B, Class B is NOT automatically a friend of Class A.",
        correct: "Grant explicit friend permissions in both directions if mutual access is required.",
      },
    ],
    complexity: {
      time: "O(1) getters/setters",
      space: "O(1)",
      explanation: "Getters and setters are typically inlined by the compiler, incurring zero function call overhead.",
    },
    tryItYourself: {
      prompt: "Can a friend function access private static members of a class?",
      hint: "Does friendship grant access to all private members, both static and non-static?",
      solutionSnippet: "Yes. A friend function has full access to all private and protected members of the granting class, including static members.",
    },
    placementConnection:
      "Interviewers often ask tricky conceptual questions about friend classes/functions and whether friendship breaks encapsulation.",
    quickRevision: [
      "Encapsulation hides internal representation to protect data integrity and invariants.",
      "Getters and setters should be marked `const` whenever they do not mutate state.",
      "`friend` functions have access to private and protected members of the class granting friendship.",
      "Friendship is NOT inherited, NOT transitive, and NOT symmetric.",
    ],
  },
  {
    id: "cpp-inheritance",
    slug: "inheritance",
    title: "Inheritance Modes & The Diamond Problem",
    track: "cpp",
    topicSlug: "oop",
    topicTitle: "Object-Oriented Programming",
    order: 15,
    estimatedMinutes: 30,
    oneSentence:
      "Inheritance allows a derived class to inherit attributes and methods from a base class, with access controlled by public, protected, and private derivation modes.",
    whyDoWeNeedIt: {
      problem:
        "Without inheritance, common code across related entities (e.g. Employee, Manager, Intern) must be copy-pasted, violating the DRY (Don't Repeat Yourself) principle.",
      realWorldAnalogy:
        "Biological genetics: children inherit core physical traits (eye color, blood type) from parents while developing their own specialized characteristics.",
    },
    visualIntuition: `Modes of Inheritance in C++:
Base Class Member:   | Public Derivation:  | Protected Derivation: | Private Derivation:
public:              | public              | protected             | private
protected:           | protected           | protected             | private
private:             | Not accessible      | Not accessible        | Not accessible

The Diamond Problem:
       [ Device ] (contains int id)
        /      \\
    [ Phone ]  [ Camera ] (each inherits Device)
        \\      /
     [ SmartPhone ] -> Contains TWO copies of Device::id!
Solution: Use 'virtual' inheritance: class Phone : virtual public Device`,
    syntax: {
      publicInheritance: "class Derived : public Base { /* ... */ };",
      virtualBase: "class B : virtual public A { /* ... */ };",
    },
    example: {
      title: "Inheritance and solving the Diamond Problem with virtual base classes",
      language: "cpp",
      code: `#include <iostream>

class PoweredDevice {
public:
    int powerWatts;
    PoweredDevice(int watts = 0) : powerWatts(watts) {
        std::cout << "PoweredDevice constructed with " << powerWatts << "W\\n";
    }
};

// Virtual inheritance ensures only ONE copy of PoweredDevice is created
class Scanner : virtual public PoweredDevice {
public:
    Scanner() : PoweredDevice(50) {}
};

class Printer : virtual public PoweredDevice {
public:
    Printer() : PoweredDevice(100) {}
};

// Copier inherits Scanner and Printer
class Copier : public Scanner, public Printer {
public:
    // Most derived class directly initializes virtual base class
    Copier() : PoweredDevice(150), Scanner(), Printer() {
        std::cout << "Copier constructed successfully.\\n";
    }
};

int main() {
    Copier c;
    std::cout << "Power Watts: " << c.powerWatts << "\\n"; // No ambiguity!
    return 0;
}`,
      explanation:
        "Using `virtual public PoweredDevice` instructs the compiler to share a single common base sub-object between `Scanner` and `Printer`, resolving the diamond ambiguity.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Base Construction Order",
        description: "Base class constructors are called first before derived class constructors execute.",
      },
      {
        step: 2,
        title: "Virtual Base Pointer (vbptr)",
        description: "Virtual inheritance inserts a virtual base pointer offset into the object layout to reference the shared base instance.",
      },
      {
        step: 3,
        title: "Derived Destruction Order",
        description: "Destructors execute in reverse order: derived destructor runs first, followed by base destructors.",
      },
    ],
    commonMistakes: [
      {
        mistake: "class Derived : Base // Omitted access specifier in class inheritance",
        why: "In a `class`, default inheritance is `private`! All public base members become private in `Derived`.",
        correct: "class Derived : public Base",
      },
      {
        mistake: "Non-virtual destructor in a polymorphic base class",
        why: "Deleting a derived object through a base pointer `Base* b = new Derived(); delete b;` without a virtual destructor causes undefined behavior and resource leaks.",
        correct: "virtual ~Base() = default;",
      },
    ],
    complexity: {
      time: "O(1) member access (slight pointer offset for virtual bases)",
      space: "Object size = sum of base + derived members (+ vbptr for virtual base)",
      explanation: "Memory layout is determined statically at compile time.",
    },
    tryItYourself: {
      prompt: "What is the order of constructor calls for `class C : public A, public B`?",
      hint: "Look at the order in which base classes are listed in the class header.",
      solutionSnippet: "Constructor A runs first, then B, and finally C. The order depends on the declaration order in the class header, not the order in the initializer list.",
    },
    placementConnection:
      "The Diamond Problem and virtual inheritance are guaranteed questions in C++ core competency assessments for top tier tech firms.",
    quickRevision: [
      "Public inheritance represents an 'is-a' relationship.",
      "Base class constructors run before derived constructors; destructors run in reverse order.",
      "The Diamond Problem is resolved using `virtual` base class inheritance.",
      "Always declare base class destructors as `virtual` when intending polymorphic destruction.",
    ],
  },
  {
    id: "cpp-polymorphism",
    slug: "polymorphism",
    title: "Polymorphism, Virtual Functions & vtable Internals",
    track: "cpp",
    topicSlug: "oop",
    topicTitle: "Object-Oriented Programming",
    order: 16,
    estimatedMinutes: 30,
    oneSentence:
      "Runtime polymorphism enables a base class pointer to invoke derived class member functions dynamically at runtime using virtual method tables (vtables).",
    whyDoWeNeedIt: {
      problem:
        "Without virtual functions, C++ uses static compile-time binding: calling a method through a `Base*` pointer will always execute `Base`'s implementation, even if the pointer holds a `Derived` object.",
      realWorldAnalogy:
        "A universal game controller button labeled 'Action': pressing it causes a Mario character to jump, a racing car to accelerate, or a warrior to swing a sword.",
    },
    visualIntuition: `vtable and vptr Architecture:
Object 'Shape' in Memory:
[ vptr (8 bytes) ] ---> vtable for Circle:
[ radius = 5.0   ]       [ &Circle::draw() ]
                         [ &Circle::area() ]

Execution of ptr->draw():
1. Read vptr from object memory offset 0
2. Lookup slot 0 in Circle's vtable (&Circle::draw)
3. Jump to machine instructions for Circle::draw()!`,
    syntax: {
      virtualKeyword: "virtual void draw();",
      overrideKeyword: "void draw() override;",
    },
    example: {
      title: "Runtime polymorphism using virtual functions and the override keyword",
      language: "cpp",
      code: `#include <iostream>
#include <vector>

class Animal {
public:
    // Virtual function enables dynamic dispatch
    virtual void speak() const {
        std::cout << "Some generic animal sound\\n";
    }

    // Always declare virtual destructor in polymorphic base classes!
    virtual ~Animal() = default;
};

class Dog : public Animal {
public:
    void speak() const override {
        std::cout << "Woof! Woof!\\n";
    }
};

class Cat : public Animal {
public:
    void speak() const override {
        std::cout << "Meow!\\n";
    }
};

int main() {
    // Polymorphic collection of base pointers
    std::vector<Animal*> animals;
    animals.push_back(new Dog());
    animals.push_back(new Cat());

    for (const Animal* a : animals) {
        a->speak(); // Dynamic dispatch routes to Dog or Cat!
    }

    for (Animal* a : animals) {
        delete a; // Calls derived destructors correctly because ~Animal() is virtual
    }

    return 0;
}`,
      explanation:
        "Marking `speak()` as `virtual` creates a `vtable` entry. The `override` keyword catches typos in method signatures at compile time.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Compiler vtable Generation",
        description: "For every class with virtual functions, the compiler creates an array of function pointers called the `vtable`.",
      },
      {
        step: 2,
        title: "vptr Injection",
        description: "Each object instance receives a hidden 8-byte pointer (`vptr`) pointing to its class's `vtable`.",
      },
      {
        step: 3,
        title: "Indirect Call at Runtime",
        description: "`ptr->speak()` dereferences the object's `vptr`, indexes into the `vtable`, and executes an indirect `CALL` instruction.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Forgetting virtual destructor in base class",
        why: "Deleting a derived object via `Base* ptr = new Derived(); delete ptr;` without a virtual destructor only calls `~Base()`, leaking derived class resources.",
        correct: "virtual ~Animal() = default;",
      },
      {
        mistake: "Calling virtual functions inside a constructor",
        why: "During base construction, derived parts are not yet initialized. The compiler binds virtual calls to the base implementation!",
        correct: "Avoid calling virtual methods inside constructors or destructors.",
      },
    ],
    complexity: {
      time: "O(1) with one extra pointer dereference compared to static call",
      space: "8 bytes per object for vptr + 1 vtable per class",
      explanation: "Dynamic dispatch requires one memory dereference to read the vtable pointer and one to jump to the function address.",
    },
    tryItYourself: {
      prompt: "What is `sizeof(Animal)` if it contains zero member variables but has one virtual function?",
      hint: "What hidden pointer does the compiler inject for virtual functions?",
      solutionSnippet: "`sizeof(Animal)` is 8 bytes on 64-bit systems because of the injected `vptr`.",
    },
    placementConnection:
      "Explain the internal mechanics of `vtable` and `vptr` is arguably the single most common C++ interview question at Tier-1 companies.",
    quickRevision: [
      "Use `virtual` in the base class to enable dynamic runtime polymorphism.",
      "The compiler creates a static `vtable` per class and injects an 8-byte `vptr` into each object instance.",
      "Always mark base class destructors `virtual` to prevent undefined behavior upon polymorphic deletion.",
      "Always use the `override` specifier on derived overrides to catch signature mismatches at compile time.",
    ],
  },
  {
    id: "cpp-abstract-classes",
    slug: "abstract-classes",
    title: "Pure Virtual Functions & Abstract Classes",
    track: "cpp",
    topicSlug: "oop",
    topicTitle: "Object-Oriented Programming",
    order: 17,
    estimatedMinutes: 25,
    oneSentence:
      "A class containing at least one pure virtual function (`= 0`) is an abstract class that cannot be instantiated and serves as a strict interface contract for derived classes.",
    whyDoWeNeedIt: {
      problem:
        "Some concepts (like `Shape` or `DatabaseConnection`) are too general to have a meaningful default implementation. We need a way to force every concrete subclass to supply its own implementation.",
      realWorldAnalogy:
        "A standardized power outlet specification: the standard cannot produce electricity on its own (abstract), but every appliance plug that fits must implement the exact prong dimensions.",
    },
    visualIntuition: `Abstract Base Class vs Concrete Subclass:
[ Abstract Class: Shape ]
  virtual double area() const = 0; // Pure virtual function!
  (Cannot do: Shape s; // COMPILE ERROR!)
        ^
        | inherits & must implement area()
[ Concrete Class: Circle ]
  double area() const override { return PI * r * r; }
  (Can do: Circle c(5); // Valid!)`,
    syntax: {
      pureVirtual: "virtual void execute() = 0;",
    },
    example: {
      title: "Defining an abstract base class interface and derived implementations",
      language: "cpp",
      code: `#include <iostream>

// Abstract Base Class (Interface)
class ISortAlgorithm {
public:
    virtual void sort(int arr[], int n) = 0; // Pure virtual function
    virtual ~ISortAlgorithm() = default;
};

class BubbleSort : public ISortAlgorithm {
public:
    void sort(int arr[], int n) override {
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    std::swap(arr[j], arr[j + 1]);
                }
            }
        }
        std::cout << "Sorted using Bubble Sort.\\n";
    }
};

int main() {
    // ISortAlgorithm algo; // COMPILE ERROR: cannot declare variable of abstract type
    ISortAlgorithm* sorter = new BubbleSort();
    int data[] = {5, 2, 8, 1};
    sorter->sort(data, 4);

    delete sorter;
    return 0;
}`,
      explanation:
        "`virtual void sort(...) = 0;` declares a pure virtual function. Any derived class that does not implement it remains abstract and cannot be instantiated.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Pure Virtual Flagging",
        description: "The compiler assigns a null or special `__cxa_pure_virtual` trap entry in the base class's vtable.",
      },
      {
        step: 2,
        title: "Instantiation Check",
        description: "The compiler forbids any stack or heap allocations of the abstract type.",
      },
      {
        step: 3,
        title: "Contract Enforcement",
        description: "Derived classes must provide definitions for all pure virtual functions to become concrete instantiable types.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Forgetting to implement all pure virtual functions in derived class",
        why: "Missing even one pure virtual function causes the derived class to remain abstract, preventing instantiation.",
        correct: "Ensure all `= 0` functions are overridden with concrete bodies.",
      },
    ],
    complexity: {
      time: "O(1) dynamic dispatch via vtable",
      space: "O(1) memory per derived instance",
      explanation: "Same vtable performance characteristics as standard virtual functions.",
    },
    tryItYourself: {
      prompt: "Can a pure virtual function have a function body definition in C++?",
      hint: "Can an abstract class provide default reusable behavior while still remaining abstract?",
      solutionSnippet: "Yes! In C++, you can provide a body for a pure virtual function outside the class definition (`void ISort::sort(...) { ... }`), but derived classes must still explicitly override it.",
    },
    placementConnection:
      "Design patterns (Factory Pattern, Strategy Pattern) taught in high-level system design rounds rely heavily on C++ abstract base classes.",
    quickRevision: [
      "A class with at least one pure virtual function (`= 0`) is an abstract class.",
      "Abstract classes cannot be instantiated directly.",
      "Derived classes must implement all pure virtual functions to become concrete classes.",
      "C++ does not have an explicit `interface` keyword; abstract classes with only pure virtual functions serve as interfaces.",
    ],
  },
];
