import { Lesson } from "@/types/content";

export const pythonOopLessons: Lesson[] = [
  {
    id: "python-args-kwargs",
    slug: "args-kwargs",
    title: "*args, **kwargs & Parameter Unpacking",
    track: "python",
    topicSlug: "oop",
    topicTitle: "Functions & Object-Oriented Programming",
    order: 13,
    estimatedMinutes: 20,
    oneSentence:
      "`*args` collects arbitrary positional arguments into a tuple, while `**kwargs` collects arbitrary keyword arguments into a dictionary.",
    whyDoWeNeedIt: {
      problem:
        "Writing flexible utility functions (e.g. decorators, logging wrappers, or API dispatchers) requires accepting any combination of parameters without knowing their names in advance.",
      realWorldAnalogy:
        "A shipping box that accepts loose items (`*args`) into one pouch and labeled parcels (`**kwargs`) into tagged compartments.",
    },
    visualIntuition: `Function Argument Gathering & Unpacking:
Gathering:
def func(*args, **kwargs):
func(1, 2, a=3, b=4)
  args   ---> (1, 2)         (Tuple of positional args)
  kwargs ---> {'a': 3, 'b': 4} (Dictionary of keyword args)

Unpacking:
data = [10, 20]
opts = {'sep': ' - ', 'end': '\\n'}
print(*data, **opts)  # Unpacks list into positional and dict into keyword args!`,
    syntax: {
      definition: "def func(*args, **kwargs):\n    pass",
      callUnpack: "func(*my_list, **my_dict)",
    },
    example: {
      title: "Variable arguments and building a flexible function timer wrapper",
      language: "python",
      code: `import time

# 1. Accepting variable positional and keyword arguments
def compute_sum(*args):
    # args is an immutable tuple of passed values
    return sum(args)

print("Sum 3 items:", compute_sum(10, 20, 30))
print("Sum 5 items:", compute_sum(1, 2, 3, 4, 5))

# 2. Timing wrapper forwarding arguments via *args and **kwargs
def time_execution(fn, *args, **kwargs):
    start = time.perf_counter()
    result = fn(*args, **kwargs) # Forwarding packed arguments
    duration = time.perf_counter() - start
    print(f"[{fn.__name__}] finished in {duration * 1000:.3f} ms")
    return result

def slow_power(base, exp):
    return base ** exp

ans = time_execution(slow_power, 2, 100000)
print(f"Calculated power length: {len(str(ans))} digits")`,
      explanation:
        "`*args` gathers non-keyword arguments into a tuple. `**kwargs` gathers named arguments into a dictionary. Passing `*args` and `**kwargs` to an inner function transparently forwards all arguments.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Positional Collection",
        description: "Python places excess positional arguments into a `tuple` assigned to the parameter prefixed with `*`.",
      },
      {
        step: 2,
        title: "Keyword Collection",
        description: "Python places excess keyword arguments into a `dict` assigned to the parameter prefixed with `**`.",
      },
      {
        step: 3,
        title: "Call-Site Unpacking",
        description: "At the call site, `*iterable` unpacks elements as positional arguments, and `**dict` unpacks key-value pairs as named arguments.",
      },
    ],
    commonMistakes: [
      {
        mistake: "def func(**kwargs, *args): // Wrong parameter ordering",
        why: "In Python parameter definitions, positional arguments and `*args` must always precede `**kwargs`.",
        correct: "def func(*args, **kwargs):",
      },
    ],
    complexity: {
      time: "O(K) where K is number of arguments gathered or unpacked",
      space: "O(K) memory for the tuple and dictionary",
      explanation: "Lightweight tuple/dict creation.",
    },
    tryItYourself: {
      prompt: "How can you enforce keyword-only arguments in a Python function?",
      hint: "Use a bare `*` in the parameter list.",
      solutionSnippet: `def create_user(name, *, is_admin=False):
    pass
# create_user("Aarav", True)  # TypeError!
# create_user("Aarav", is_admin=True)  # Valid!`,
    },
    placementConnection:
      "Understanding argument unpacking is vital for decorators, monkey patching, and design patterns frequently evaluated in Python-specific interviews.",
    quickRevision: [
      "`*args` gathers positional arguments into a tuple.",
      "`**kwargs` gathers keyword arguments into a dictionary.",
      "Parameter order: positional &rarr; `*args` &rarr; keyword-only &rarr; `**kwargs`.",
      "At call sites, `*` unpacks sequences and `**` unpacks dictionaries.",
    ],
  },
  {
    id: "python-lambdas",
    slug: "lambdas",
    title: "Lambdas, map(), filter() & Custom Sorting",
    track: "python",
    topicSlug: "oop",
    topicTitle: "Functions & Object-Oriented Programming",
    order: 14,
    estimatedMinutes: 25,
    oneSentence:
      "A lambda is an anonymous single-expression function primarily used as inline key callbacks in `sort()`, `sorted()`, `min()`, and `max()`.",
    whyDoWeNeedIt: {
      problem:
        "Writing a full multi-line `def` function just to extract the second element of a tuple for sorting adds unnecessary boilerplate to algorithmic code.",
      realWorldAnalogy:
        "A quick disposable sticky note calculation compared to drafting a formal laminated document.",
    },
    visualIntuition: `Python Lambda Syntax:
lambda arg1, arg2: expression (implicitly returned!)

Example:
sq = lambda x: x * x
# Exactly equivalent to:
def sq(x):
    return x * x

Sorting Multi-attribute Tuples:
students = [("Alice", 85), ("Bob", 92), ("Charlie", 85)]
# Sort primarily by score (descending), break ties by name (ascending):
students.sort(key=lambda s: (-s[1], s[0]))`,
    syntax: {
      basic: "f = lambda x: x * 2",
      sortingKey: "sorted(arr, key=lambda x: (x[0], -x[1]))",
    },
    example: {
      title: "Multi-key sorting and custom comparators with lambdas",
      language: "python",
      code: `intervals = [[1, 4], [2, 3], [1, 2], [5, 8]]

# Sort intervals by start ascending; break ties by end descending
intervals.sort(key=lambda x: (x[0], -x[1]))
print("Sorted intervals:", intervals)

students = [
    {"name": "Aarav", "cgpa": 9.2, "rank": 3},
    {"name": "Diya", "cgpa": 9.8, "rank": 1},
    {"name": "Rohan", "cgpa": 9.2, "rank": 2},
]

# Sort by CGPA descending, break ties by rank ascending
sorted_students = sorted(students, key=lambda s: (-s["cgpa"], s["rank"]))

for s in sorted_students:
    print(f"{s['name']} -> CGPA: {s['cgpa']}, Rank: {s['rank']}")`,
      explanation:
        "The lambda `key=lambda s: (-s['cgpa'], s['rank'])` returns a tuple. Python compares tuples lexicographically: first comparing the negative CGPA (effectively descending order), then tie-breaking with rank ascending.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Expression Constraint",
        description: "Python lambdas can only contain a single expression; statements like `return`, `pass`, or assignments are syntactically forbidden.",
      },
      {
        step: 2,
        title: "Lexical Closure",
        description: "Lambdas capture enclosing scope variables by reference at execution time, not definition time.",
      },
      {
        step: 3,
        title: "Key Function Caching",
        description: "In Timsort (`arr.sort(key=...)`), the key function is evaluated exactly once per element ($O(N)$ key evaluations), not per comparison.",
      },
    ],
    commonMistakes: [
      {
        mistake: "funcs = [lambda: i for i in range(3)]; [f() for f in funcs] // Expecting [0, 1, 2]",
        why: "Lambdas bind late to variable `i`. When called after the loop finishes, `i` is 2 for all of them, producing `[2, 2, 2]`.",
        correct: "funcs = [lambda i=i: i for i in range(3)] // Default arg forces early capture!",
      },
    ],
    complexity: {
      time: "O(1) invocation; O(N log N) overall sort with O(N) key calculations",
      space: "O(N) temporary keys cached during Timsort",
      explanation: "Timsort computes keys once in an auxiliary array before sorting.",
    },
    tryItYourself: {
      prompt: "How can you sort a list of strings by their length ascending, and then alphabetically descending?",
      hint: "Python strings cannot be negated with `-`. How do you reverse order for strings?",
      solutionSnippet: `words = ["apple", "bat", "cat", "banana"]
# Sort alphabetically descending first, then stably sort by length
words.sort(reverse=True)
words.sort(key=len)  # Timsort is stable!
# Or: from functools import cmp_to_key`,
    },
    placementConnection:
      "Sorting intervals (Merge Intervals, Non-overlapping Intervals) using `key=lambda x: x[0]` is a standard prerequisite in almost all interval-based interview problems.",
    quickRevision: [
      "Lambdas are single-expression anonymous functions.",
      "The `key` parameter in `sort()` and `sorted()` is evaluated only once per element.",
      "Tuple return values `key=lambda x: (x.a, -x.b)` enable clean multi-key sorting.",
      "Be cautious of late-binding loops with lambdas; use default argument capture `lambda x=x: x`.",
    ],
  },
  {
    id: "python-classes-objects",
    slug: "classes-objects",
    title: "Classes, Objects, self & Encapsulation",
    track: "python",
    topicSlug: "oop",
    topicTitle: "Functions & Object-Oriented Programming",
    order: 15,
    estimatedMinutes: 30,
    oneSentence:
      "A Python class defines an object blueprint where methods receive the invoking instance explicitly as `self`, and private attributes are encapsulated using double-underscore name mangling.",
    whyDoWeNeedIt: {
      problem:
        "Building complex systems (like custom Trie, Graph Node, or LRU Cache) without classes leads to tangled global dictionaries and fragile data states.",
      realWorldAnalogy:
        "A blueprint for a smartwatch: the blueprint defines functions like `measure_heartbeat()` and properties like `battery_level`; each physical watch maintains its own separate battery state.",
    },
    visualIntuition: `Class vs Instance Attributes in Memory:
class Employee:
    company = "Google"  # Class Attribute (Shared by ALL instances!)

    def __init__(self, name):
        self.name = name # Instance Attribute (Unique per object)

Heap Memory:
[ Employee Class Object ] ----> company = "Google"
        ^              ^
        |              |
[ e1: name="Aarav" ]  [ e2: name="Diya" ]
e1.company resolves to class object; e1.name is in e1's __dict__!`,
    syntax: {
      classDef: "class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None",
      privateAttr: "self.__secret = 42 # Name mangled to _ClassName__secret",
    },
    example: {
      title: "Building a singly linked list Node and encapsulating state",
      language: "python",
      code: `class BankAccount:
    # Class attribute (shared by all accounts)
    BANK_CODE = "HDFC001"

    def __init__(self, owner: str, initial_balance: float = 0.0):
        self.owner = owner
        # Double underscore invokes name-mangling (private attribute)
        self.__balance = max(0.0, initial_balance)

    def deposit(self, amount: float) -> None:
        if amount > 0:
            self.__balance += amount

    def withdraw(self, amount: float) -> bool:
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            return True
        return False

    def get_balance(self) -> float:
        return self.__balance

# Usage
acc = BankAccount("Aarav", 500.0)
acc.deposit(200.0)
acc.withdraw(100.0)
print(f"{acc.owner}'s Balance: USD {acc.get_balance()}")

# Direct access to private attribute fails
# print(acc.__balance) # AttributeError: 'BankAccount' object has no attribute '__balance'
# Python name-mangles it to _BankAccount__balance:
print("Mangled access (internal):", acc._BankAccount__balance)`,
      explanation:
        "`self` represents the specific instance invoking the method. Variables prefixed with `__` are name-mangled to `_ClassName__attribute` to prevent accidental external modification.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Object Allocation",
        description: "`__new__` allocates a raw instance; then `__init__` initializes its instance attributes.",
      },
      {
        step: 2,
        title: "Explicit self Injection",
        description: "When calling `acc.deposit(200)`, Python translates it into `BankAccount.deposit(acc, 200)`.",
      },
      {
        step: 3,
        title: "Attribute Resolution (__dict__)",
        description: "Python checks `instance.__dict__` first; if not found, it traverses `Class.__dict__`.",
      },
    ],
    commonMistakes: [
      {
        mistake: "class User: permissions = [] // Mutable class attribute",
        why: "`permissions` is shared across all instances! Appending to `u1.permissions` will alter permissions for `u2` as well.",
        correct: "def __init__(self): self.permissions = [] // Instance attribute",
      },
      {
        mistake: "def my_method(): pass // Missing self parameter in instance method",
        why: "When invoked on an object, Python automatically passes the instance as the first argument, causing `TypeError: my_method() takes 0 positional arguments but 1 was given`.",
        correct: "def my_method(self): pass",
      },
    ],
    complexity: {
      time: "O(1) attribute access via dictionary lookup",
      space: "O(1) per instance (stores __dict__)",
      explanation: "Attributes are stored inside a per-instance dictionary.",
    },
    tryItYourself: {
      prompt: "How can you reduce memory usage for lightweight classes with millions of instances in Python?",
      hint: "What class attribute eliminates the per-instance `__dict__`?",
      solutionSnippet: "Define `__slots__ = ('attr1', 'attr2')`. This replaces the dynamic per-instance dictionary with a fixed-size array of pointers, saving up to 40% memory.",
    },
    placementConnection:
      "Implementing custom data structures from scratch (LRU Cache, Trie, Linked List, Min Stack) in object-oriented Python is a staple of technical coding interviews.",
    quickRevision: [
      "`self` is explicitly passed as the first parameter to instance methods.",
      "Class attributes are shared across all instances; instance attributes are defined inside `__init__` on `self`.",
      "Prefixing with `__` triggers name mangling (`_ClassName__var`) for private encapsulation.",
      "Never put mutable default collections as class attributes.",
    ],
  },
  {
    id: "python-inheritance",
    slug: "inheritance",
    title: "Inheritance, super() & Method Resolution Order (MRO)",
    track: "python",
    topicSlug: "oop",
    topicTitle: "Functions & Object-Oriented Programming",
    order: 16,
    estimatedMinutes: 30,
    oneSentence:
      "Python supports single and multiple inheritance, resolving method calls deterministically using the C3 Linearization algorithm known as Method Resolution Order (MRO).",
    whyDoWeNeedIt: {
      problem:
        "In multiple inheritance (e.g. Diamond Inheritance), ambiguity arises regarding which parent class method should run. Python resolves this predictably via MRO.",
      realWorldAnalogy:
        "Corporate delegation: if both the design team lead and the engineering team lead report to the department head, the employee handbook defines an explicit chain of escalation for cross-cutting decisions.",
    },
    visualIntuition: `The Diamond Problem in Python (C3 Linearization):
         [ Object ]
             ^
             |
          [ A ]
         /     \\
       [ B ]   [ C ]
         \\     /
          [ D ]

Method Resolution Order for D:
D.__mro__ = (D, B, C, A, object)
super() inside B will call C, not A! Cooperative Multiple Inheritance!`,
    syntax: {
      inheritance: "class Derived(Base):\n    def __init__(self):\n        super().__init__()",
      checkMro: "print(Derived.__mro__)",
    },
    example: {
      title: "Inheritance, super(), and inspecting Method Resolution Order",
      language: "python",
      code: `class Shape:
    def __init__(self, color: str):
        self.color = color

    def area(self) -> float:
        raise NotImplementedError("Subclasses must implement area()")

class Rectangle(Shape):
    def __init__(self, color: str, width: float, height: float):
        # super() invokes Shape.__init__
        super().__init__(color)
        self.width = width
        self.height = height

    def area(self) -> float:
        return self.width * self.height

class Square(Rectangle):
    def __init__(self, color: str, side: float):
        super().__init__(color, side, side)

sq = Square("navy", 4.0)
print(f"Square Color: {sq.color}, Area: {sq.area()}")

# Inspecting the exact inheritance lookup hierarchy
print("Square MRO:", [cls.__name__ for cls in Square.__mro__])`,
      explanation:
        "`super().__init__(color)` cleanly initializes the base class attributes without hardcoding the base class name. `__mro__` shows the exact order in which methods are searched.",
    },
    howItWorks: [
      {
        step: 1,
        title: "C3 Linearization Calculation",
        description: "When a class is created, Python computes its MRO tuple using C3 linearization to guarantee monotonicity and local precedence.",
      },
      {
        step: 2,
        title: "Dynamic Next-Method Lookup",
        description: "`super()` does not simply call the parent class; it inspects the MRO tuple of the calling instance and invokes the NEXT class in line.",
      },
      {
        step: 3,
        title: "Cooperative Initialization",
        description: "In multiple inheritance, each class calls `super().__init__(*args, **kwargs)`, ensuring every ancestor class initializes exactly once.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Base.__init__(self) // Hardcoding base class calls instead of super()",
        why: "Breaks cooperative multiple inheritance and can cause the base constructor to execute multiple times in diamond hierarchies.",
        correct: "super().__init__()",
      },
    ],
    complexity: {
      time: "O(1) method resolution (MRO is precomputed at class creation time)",
      space: "O(K) where K is number of ancestor classes in MRO tuple",
      explanation: "Method lookup follows the precomputed linear tuple directly.",
    },
    tryItYourself: {
      prompt: "How can you check if an object `obj` is an instance of a class `A` or any of its subclasses?",
      hint: "Use a built-in type-checking function rather than `type(obj) == A`.",
      solutionSnippet: "isinstance(obj, A)  # Checks subclasses; type(obj) == A checks exact type only",
    },
    placementConnection:
      "Multiple inheritance and explaining how `super()` and `MRO` work are standard questions in senior Python software engineering interviews.",
    quickRevision: [
      "Use `super()` to delegate method calls to the next class in the MRO.",
      "Method Resolution Order (MRO) is computed using the C3 linearization algorithm.",
      "Access the MRO using `ClassName.__mro__` or `ClassName.mro()`.",
      "Use `isinstance(obj, BaseClass)` rather than `type(obj) == BaseClass`.",
    ],
  },
  {
    id: "python-dunder-methods",
    slug: "dunder-methods",
    title: "Dunder Methods & Operator Overloading",
    track: "python",
    topicSlug: "oop",
    topicTitle: "Functions & Object-Oriented Programming",
    order: 17,
    estimatedMinutes: 25,
    oneSentence:
      "Dunder (double-underscore) special methods allow custom classes to hook into Python's built-in operators, string representations, and container behaviors.",
    whyDoWeNeedIt: {
      problem:
        "Printing custom objects displays ugly strings like `<__main__.Node object at 0x7ffd5>`, and comparing objects defaults to checking memory addresses rather than values.",
      realWorldAnalogy:
        "Plugging a custom peripheral into a universal USB port: Python specifies the standard protocol (`__len__`, `__str__`, `__lt__`), and your class implements the pinout.",
    },
    visualIntuition: `Core Dunder Protocols:
Operator / Built-in   | Dunder Method Invoked
str(obj), print(obj)  | __str__(self)  (User-friendly string)
repr(obj)             | __repr__(self) (Developer debugging string)
len(obj)              | __len__(self)  (Returns integer >= 0)
a == b                | __eq__(self, other)
a < b (Used by sort!) | __lt__(self, other)
obj[key]              | __getitem__(self, key)`,
    syntax: {
      reprStr: "def __repr__(self): return f'Point({self.x}, {self.y})'",
      comparison: "def __lt__(self, other): return self.score < other.score",
    },
    example: {
      title: "Custom Point class with operator overloading and heapq support",
      language: "python",
      code: `class Point:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

    # Developer representation for debugging
    def __repr__(self) -> str:
        return f"Point({self.x}, {self.y})"

    # User-friendly string representation
    def __str__(self) -> str:
        return f"({self.x}, {self.y})"

    # Equality operator (p1 == p2)
    def __eq__(self, other) -> bool:
        if not isinstance(other, Point):
            return False
        return self.x == other.x and self.y == other.y

    # Less-than operator (p1 < p2) enables direct sorting and heapq support!
    def __lt__(self, other) -> bool:
        if self.x != other.x:
            return self.x < other.x
        return self.y < other.y

# Usage
p1 = Point(2, 5)
p2 = Point(1, 9)
p3 = Point(2, 3)

points = [p1, p2, p3]
points.sort() # Uses __lt__ automatically!
print("Sorted points:", points)
print("p1 == Point(2, 5):", p1 == Point(2, 5))`,
      explanation:
        "Implementing `__lt__` allows `points.sort()` and `heapq.heappush()` to work directly on `Point` objects without requiring custom key functions. `__repr__` ensures clean debugging output.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Protocol Hooking",
        description: "When Python evaluates `a < b`, it checks `a.__lt__(b)`. If not implemented, it attempts `b.__gt__(a)`.",
      },
      {
        step: 2,
        title: "Built-in Delegation",
        description: "`len(x)` calls `type(x).__len__(x)` directly in C speed, requiring the return value to be a non-negative integer.",
      },
      {
        step: 3,
        title: "Hashing Contract",
        description: "If a class defines `__eq__` without defining `__hash__`, Python automatically sets `__hash__ = None`, making instances unhashable for safety.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Implementing __eq__ without implementing __hash__ and trying to put objects into a set",
        why: "Overriding `__eq__` sets `__hash__ = None` to prevent hash mutation. Objects will raise `TypeError: unhashable type`.",
        correct: "Implement `def __hash__(self): return hash((self.x, self.y))` if immutable.",
      },
    ],
    complexity: {
      time: "O(1) dispatch per operator invocation",
      space: "O(1)",
      explanation: "Direct slot lookup in the class type dictionary.",
    },
    tryItYourself: {
      prompt: "What is the difference between `__str__` and `__repr__` in Python?",
      hint: "One is for end-users, the other is for developers/debugging.",
      solutionSnippet: "`__str__` provides a readable, user-friendly representation (`print(x)`). `__repr__` provides an unambiguous, detailed representation aimed at developers, often valid Python code to recreate the object.",
    },
    placementConnection:
      "Implementing `__lt__` on custom Node or Task classes to push them into a `heapq` priority queue without breaking tie comparisons is a classic placement pattern.",
    quickRevision: [
      "`__str__` is for end users; `__repr__` is for developers and debugging.",
      "`__lt__` enables `<` comparisons and allows objects to be sorted directly and stored in `heapq`.",
      "`__len__` enables `len(obj)` and influences boolean truthiness.",
      "`__getitem__` and `__setitem__` enable square bracket indexing `obj[key]`.",
    ],
  },
];
