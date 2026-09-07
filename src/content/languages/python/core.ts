import { Lesson } from "@/types/content";

export const pythonCoreLessons: Lesson[] = [
  {
    id: "python-strings",
    slug: "strings",
    title: "Strings, Immutability & Slicing",
    track: "python",
    topicSlug: "core",
    topicTitle: "Core Collections & Operations",
    order: 7,
    estimatedMinutes: 25,
    oneSentence:
      "Python strings are immutable sequences of Unicode characters supporting powerful slicing syntax `[start:stop:step]` and rich manipulation methods.",
    whyDoWeNeedIt: {
      problem:
        "Attempting to modify a character in-place via `s[0] = 'a'` fails with `TypeError`. Understanding string immutability prevents accidental quadratic time complexity when building strings.",
      realWorldAnalogy:
        "A printed engraved plaque: you cannot erase a single letter; to change the text, you must cast an entirely new metal plaque.",
    },
    visualIntuition: `String Slicing Mechanics [start:stop:step]:
s = "PLACEMENT"
Index:   0   1   2   3   4   5   6   7   8
Char:    P   L   A   C   E   M   E   N   T
Neg:    -9  -8  -7  -6  -5  -4  -3  -2  -1

Slices:
s[0:4]   --> "PLAC" (start=0, stop=4 exclusive)
s[4:]    --> "EMENT" (from 4 to end)
s[::-1]  --> "TNEMECALP" (Reverses string in O(N) time!)
s[::2]   --> "PAEET" (Every 2nd character)`,
    syntax: {
      slice: "rev = s[::-1]\nsub = s[1:5]",
      methods: "parts = s.split(',')\njoined = '-'.join(parts)\nclean = s.strip()",
    },
    example: {
      title: "Efficient string manipulation and avoiding quadratic string concatenation",
      language: "python",
      code: `text = "   Placement,Prep,2026   "

# 1. Stripping whitespace and splitting
cleaned = text.strip()
tokens = cleaned.split(",")
print("Tokens:", tokens)

# 2. String reversal via slicing
word = "racecar"
is_palindrome = word == word[::-1]
print(f"Is '{word}' a palindrome? {is_palindrome}")

# 3. Efficient string building using ''.join()
# BAD: s = "" ; for w in tokens: s += w (O(N^2) due to repeated allocations!)
# GOOD: ''.join() allocates memory ONCE in O(N) time
result = " -> ".join(tokens)
print("Joined:", result)`,
      explanation:
        "`s[::-1]` is the canonical Python idiom for reversing a string. `join()` pre-calculates the required buffer size and allocates memory once, running in $O(N)$ time.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Unicode Storage",
        description: "Python stores strings using compact representations (`PyASCIIObject` or 1, 2, or 4 bytes per character based on the maximum character ord).",
      },
      {
        step: 2,
        title: "Slice Index Clamping",
        description: "Slice indices are automatically clamped to string boundaries without throwing `IndexError`.",
      },
      {
        step: 3,
        title: "Single Memory Allocation in join",
        description: "`''.join(iterable)` counts total characters first, allocates one contiguous memory block, and copies elements in a tight C loop.",
      },
    ],
    commonMistakes: [
      {
        mistake: "s = \"hello\"; s[0] = \"H\" // Attempting in-place mutation",
        why: "Python strings are immutable. Direct item assignment raises `TypeError: 'str' object does not support item assignment`.",
        correct: "s = \"H\" + s[1:]",
      },
      {
        mistake: "for char in stream: output += char // In-loop string concatenation",
        why: "Creates a new string object on each iteration, causing $O(N^2)$ memory copying overhead.",
        correct: "chars = []; chars.append(char); output = ''.join(chars)",
      },
    ],
    complexity: {
      time: "O(K) where K is slice length; O(N) for join/split/strip",
      space: "O(K) new string allocation",
      explanation: "Slicing strings creates a new copy of the sliced substring.",
    },
    tryItYourself: {
      prompt: "How can you check if a string contains only numeric digits in Python without regex?",
      hint: "Look at built-in string predicate methods.",
      solutionSnippet: "s.isdigit() or s.isnumeric() returns True if all characters are digits.",
    },
    placementConnection:
      "String problems (valid anagram, longest common prefix, reverse words in string) appear in over 40% of tech screening rounds.",
    quickRevision: [
      "Strings are immutable; mutating a string creates a new string object.",
      "Syntax `s[::-1]` reverses a string in $O(N)$ time.",
      "Always use `''.join(list_of_strings)` instead of `+=` in loops to avoid $O(N^2)$ time.",
      "String slices do not raise `IndexError` even if indices exceed boundaries.",
    ],
  },
  {
    id: "python-lists",
    slug: "lists",
    title: "Lists: Dynamic Arrays, Operations & Complexities",
    track: "python",
    topicSlug: "core",
    topicTitle: "Core Collections & Operations",
    order: 8,
    estimatedMinutes: 30,
    oneSentence:
      "A Python list is a dynamic array of object pointers providing amortized O(1) appends, O(1) random access, and O(N) insertions or deletions at arbitrary positions.",
    whyDoWeNeedIt: {
      problem:
        "Using `list.pop(0)` or `list.insert(0, val)` to implement queues causes catastrophic $O(N)$ shifts on every operation, degrading algorithms from $O(N)$ to $O(N^2)$.",
      realWorldAnalogy:
        "A row of students seated on a bench: letting a student join at the end takes a second (O(1)); forcing someone into the very first seat makes all 50 students shift one seat to the right (O(N)).",
    },
    visualIntuition: `Python List Internal Architecture:
PyListObject on Heap:
[ ob_refcnt ][ ob_type ][ ob_size = 3 ][ allocated = 6 ]
[ ob_item ] -------------------------------------------------+
                                                             |
Contiguous Array of Pointers:                                v
[ 0x1000 ][ 0x2050 ][ 0x30A0 ][ NULL ][ NULL ][ NULL ]
    |         |         |
    v         v         v
 [ 10 ]    [ "hi" ]   [ 3.14 ]
(Lists store references to objects, not raw values directly!)`,
    syntax: {
      commonOps: "lst.append(x)     # O(1) amortized\nx = lst.pop()     # O(1) removes last\nlst.insert(i, x)  # O(N) shifts elements\nlst.extend(other) # O(K) appends iterable",
    },
    example: {
      title: "Demonstrating list methods, slicing, and in-place sorting vs sorted()",
      language: "python",
      code: `nums = [5, 2, 8, 1, 9]

# 1. Appending and extending
nums.append(10)          # [5, 2, 8, 1, 9, 10]
nums.extend([20, 30])    # [5, 2, 8, 1, 9, 10, 20, 30]

# 2. O(1) vs O(N) removals
last_elem = nums.pop()   # O(1): removes 30 from end
first_elem = nums.pop(0) # O(N): removes 5 and shifts all elements left!

print(f"nums: {nums}")
print(f"Popped last: {last_elem}, Popped first: {first_elem}")

# 3. In-place sort (mutates list) vs sorted() (returns new list)
nums.sort(reverse=True)  # In-place Timsort in O(N log N)
print(f"Sorted descending in-place: {nums}")

words = ["banana", "pie", "apple"]
new_sorted = sorted(words, key=len) # Sorted by length without mutating 'words'
print(f"Original words: {words}")
print(f"Sorted by len: {new_sorted}")`,
      explanation:
        "`nums.pop()` is $O(1)$ from the end, while `nums.pop(0)` is $O(N)$. `list.sort()` sorts in-place using Timsort ($O(N \log N)$), while `sorted()` returns a brand-new list.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Over-Allocation Growth Pattern",
        description: "CPython allocates extra slots (pattern: 0, 4, 8, 16, 25, 35, 46, 58...) to ensure amortized $O(1)$ appends.",
      },
      {
        step: 2,
        title: "Timsort Algorithm",
        description: "Python's sorting algorithm (Timsort) detects natural ascending/descending runs and merges them in $O(N \log N)$ worst-case and $O(N)$ best-case.",
      },
      {
        step: 3,
        title: "Memory Slicing",
        description: "`arr[start:stop]` creates a shallow copy containing newly duplicated object pointers.",
      },
    ],
    commonMistakes: [
      {
        mistake: "using list as a queue: q.pop(0)",
        why: "`pop(0)` shifts all remaining $N-1$ elements in memory, causing $O(N)$ time per pop and $O(N^2)$ overall queue processing.",
        correct: "from collections import deque; q = deque(); q.popleft() # O(1)!",
      },
      {
        mistake: "res = lst.sort() // expecting sorted list in res",
        why: "`lst.sort()` sorts in-place and returns `None`!",
        correct: "res = sorted(lst) # Or lst.sort(); res = lst",
      },
    ],
    complexity: {
      time: "O(1) append/pop at end/indexing, O(N) insert/pop(0)/remove/in check",
      space: "O(N) contiguous pointer buffer",
      explanation: "Checking `val in lst` requires an O(N) linear search. Use a `set` for O(1) lookups.",
    },
    tryItYourself: {
      prompt: "What is the time complexity of `lst1 + lst2` vs `lst1.extend(lst2)`?",
      hint: "One creates a brand new list; the other mutates lst1 in-place.",
      solutionSnippet: "`lst1 + lst2` is O(N + M) and allocates a new list of size N+M. `lst1.extend(lst2)` is O(M) and appends elements directly into lst1 without allocating a whole new list.",
    },
    placementConnection:
      "Interviewers scrutinize whether candidates mistakenly use `list.pop(0)` in BFS or sliding window algorithms. Always use `collections.deque`.",
    quickRevision: [
      "`list.append()` and `list.pop()` at the end are amortized $O(1)$.",
      "`list.pop(0)` and `list.insert(0, x)` are $O(N)$ — never use them in loops.",
      "`list.sort()` mutates in-place and returns `None`; `sorted()` returns a new list.",
      "`x in my_list` takes $O(N)$ time; use a `set` if fast membership lookup is needed.",
    ],
  },
  {
    id: "python-tuples",
    slug: "tuples",
    title: "Tuples, Immutability & Packing / Unpacking",
    track: "python",
    topicSlug: "core",
    topicTitle: "Core Collections & Operations",
    order: 9,
    estimatedMinutes: 20,
    oneSentence:
      "A tuple is an immutable ordered sequence of values that is hashable (if all its elements are hashable), making it suitable as dictionary keys and set members.",
    whyDoWeNeedIt: {
      problem:
        "Lists cannot be used as keys in a dictionary or elements in a set because they are mutable and unhashable. Tuples provide immutable grouping for composite keys (like 2D coordinates).",
      realWorldAnalogy:
        "A sealed time capsule: once packed and welded shut, its contents cannot be altered, added, or removed.",
    },
    visualIntuition: `Tuple Packing and Unpacking:
Packing:
coord = 10, 20  # Parentheses are optional! coord is (10, 20)

Unpacking:
x, y = coord    # x = 10, y = 20

Extended Unpacking (*rest):
first, *middle, last = [1, 2, 3, 4, 5]
first  --> 1
middle --> [2, 3, 4]
last   --> 5`,
    syntax: {
      declaration: "t = (1, 2, 3)\nsingle = (42,) # Note trailing comma!",
      dictKey: "visited = set()\nvisited.add((row, col)) # Hashable coordinate!",
    },
    example: {
      title: "Using tuples for multiple returns, dictionary keys, and star unpacking",
      language: "python",
      code: `# 1. Tuples as composite dictionary keys (e.g. Graph edge weights or 2D grid memo)
memo = {}
memo[(0, 1)] = "Path A"
memo[(1, 2)] = "Path B"
print("Memo at (0, 1):", memo[(0, 1)])

# 2. Returning multiple values cleanly
def min_max(nums):
    return min(nums), max(nums)  # Automatically packed into tuple

low, high = min_max([4, 1, 9, 7])
print(f"Low: {low}, High: {high}")

# 3. Single element tuple pitfall
not_a_tuple = (42)    # Just integer 42!
is_a_tuple = (42,)    # Valid single-element tuple
print(f"Type not_a_tuple: {type(not_a_tuple)}")
print(f"Type is_a_tuple: {type(is_a_tuple)}")

# 4. Extended unpacking
head, *body, tail = [10, 20, 30, 40, 50]
print(f"Head: {head}, Body: {body}, Tail: {tail}")`,
      explanation:
        "Parentheses do not make a tuple; the comma `,` makes a tuple. Because tuples are immutable, `(r, c)` tuples can be added to sets and used as dictionary keys in grid BFS/DFS problems.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Fixed Memory Allocation",
        description: "Because tuples cannot grow or shrink, Python allocates the exact size needed in a single memory block without excess buffer space.",
      },
      {
        step: 2,
        title: "Tuple Hash Computation",
        description: "Python computes the hash by combining the hash of each individual element. If any element is mutable (like a list), hash computation raises `TypeError`.",
      },
      {
        step: 3,
        title: "Small Tuple Caching",
        description: "CPython reuses deallocated small tuples (size $\\le 20$) in an internal free list to reduce `malloc` overhead.",
      },
    ],
    commonMistakes: [
      {
        mistake: "x = (\"single\") // Missing trailing comma",
        why: "Parentheses without a comma are treated as mathematical grouping, resulting in a string, not a tuple.",
        correct: "x = (\"single\",)",
      },
      {
        mistake: "bad_tuple = ([1, 2], 3); set().add(bad_tuple)",
        why: "A tuple containing mutable elements (like a list) is unhashable, raising `TypeError: unhashable type: 'list'`.",
        correct: "good_tuple = ((1, 2), 3); set().add(good_tuple)",
      },
    ],
    complexity: {
      time: "O(1) indexing and unpacking, O(K) hash calculation for K elements",
      space: "O(K) memory footprint (more lightweight than list)",
      explanation: "Tuples consume less memory than lists because they have no dynamic resize metadata.",
    },
    tryItYourself: {
      prompt: "Can you modify a list that is placed inside a tuple (e.g. `t = ([1, 2], 3); t[0].append(4)`)?",
      hint: "Does the tuple store the list object itself, or an object reference to the list?",
      solutionSnippet: "Yes! The tuple holds an immutable reference to the list, but the list itself remains mutable. `t[0].append(4)` successfully modifies the inner list.",
    },
    placementConnection:
      "Using `(r, c)` tuples to track visited coordinates in 2D Matrix traversal (Word Search, Number of Islands) is standard in FAANG interviews.",
    quickRevision: [
      "Tuples are immutable; once created, items cannot be added, replaced, or removed.",
      "A single element tuple requires a trailing comma: `(val,)`.",
      "Tuples of hashable items are hashable and can be used as dictionary keys or set members.",
      "Tuples consume less memory and are faster to allocate than lists.",
    ],
  },
  {
    id: "python-sets",
    slug: "sets",
    title: "Sets: Hash Sets, Uniqueness & Venn Operations",
    track: "python",
    topicSlug: "core",
    topicTitle: "Core Collections & Operations",
    order: 10,
    estimatedMinutes: 25,
    oneSentence:
      "A Python set is an unordered collection of unique, hashable elements backed by an open-addressing hash table providing average O(1) lookups, insertions, and deletions.",
    whyDoWeNeedIt: {
      problem:
        "Deduplicating elements or checking membership in a list takes $O(N)$ time. In a loop of size $N$, this leads to $O(N^2)$ algorithm failure. A set performs membership tests in $O(1)$ average time.",
      realWorldAnalogy:
        "A guest list at a VIP event: each name can only appear once, and the bouncer can look up a name almost instantly rather than scanning through an unorganized line of people.",
    },
    visualIntuition: `Set Math Operations (Venn Diagrams):
setA = {1, 2, 3, 4}
setB = {3, 4, 5, 6}

Union (setA | setB):               {1, 2, 3, 4, 5, 6}
Intersection (setA & setB):        {3, 4}
Difference (setA - setB):          {1, 2}
Symmetric Difference (setA ^ setB): {1, 2, 5, 6}`,
    syntax: {
      methods: "s = set() # Empty set! ({} creates empty dict)\ns.add(val)\ns.remove(val)  # Raises KeyError if missing\ns.discard(val) # Safe: No error if missing",
      operators: "union = a | b\ninter = a & b\ndiff = a - b",
    },
    example: {
      title: "Set deduplication, fast lookups, and set mathematical operations",
      language: "python",
      code: `nums = [1, 2, 2, 3, 4, 4, 4, 5]

# 1. Deduplicating a list in O(N) time
unique_nums = set(nums)
print("Unique set:", unique_nums)

# 2. Fast O(1) lookup
target = 3
if target in unique_nums:
    print(f"{target} exists in set!")

# 3. Safe deletion vs strict deletion
unique_nums.discard(99) # Safe: does nothing if 99 is not present
# unique_nums.remove(99) # Would raise KeyError!

# 4. Set theory operations
cs_students = {"Alice", "Bob", "Charlie", "David"}
math_students = {"Charlie", "David", "Emma", "Frank"}

# In both CS and Math (Intersection)
both = cs_students & math_students
print("Enrolled in both:", both)

# In CS but NOT Math (Difference)
only_cs = cs_students - math_students
print("Only CS:", only_cs)`,
      explanation:
        "`set()` deduplicates in linear time. `discard(x)` removes an element without raising `KeyError` if absent. Mathematical operators (`&`, `|`, `-`, `^`) compute Venn operations efficiently in C.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Hash Probing",
        description: "Sets use open-addressing with perturbation pseudo-random probing to locate or insert entries into a hash table array.",
      },
      {
        step: 2,
        title: "Equality Confirmation",
        description: "When hashes collide, Python checks `elem == target` to confirm an exact match before resolving.",
      },
      {
        step: 3,
        title: "Resizing",
        description: "When the table reaches a 2/3 load factor, it allocates a larger table (4x to 8x) and rehashes all active entries.",
      },
    ],
    commonMistakes: [
      {
        mistake: "empty_set = {} // Creates an empty dict, NOT a set!",
        why: "`{}` is reserved for empty dictionaries in Python.",
        correct: "empty_set = set()",
      },
      {
        mistake: "s.add([1, 2]) // Adding unhashable type",
        why: "Sets can only contain immutable/hashable items. Lists are mutable and cannot be hashed.",
        correct: "s.add((1, 2)) // Use tuple instead of list",
      },
    ],
    complexity: {
      time: "O(1) average add, remove, and in checks; O(N) worst-case under malicious collisions",
      space: "O(N) hash table memory",
      explanation: "Constant time lookup due to direct hash table indexing.",
    },
    tryItYourself: {
      prompt: "Given two arrays, find elements common to both in O(N + M) time using sets.",
      hint: "Convert one list to a set, then use a list comprehension or set intersection.",
      solutionSnippet: `arr1 = [1, 2, 2, 1]
arr2 = [2, 2]
common = list(set(arr1) & set(arr2)) # [2]`,
    },
    placementConnection:
      "Finding intersection of two arrays, Longest Consecutive Sequence ($O(N)$ with set), and Contains Duplicate are classic first-round screening problems.",
    quickRevision: [
      "Use `set()` to create an empty set (`{}` creates an empty dictionary).",
      "Lookups (`x in s`) and insertions (`s.add(x)`) run in $O(1)$ average time.",
      "Sets can only contain hashable (immutable) objects.",
      "Use `.discard()` instead of `.remove()` to avoid raising `KeyError` when an item might not exist.",
    ],
  },
  {
    id: "python-dictionaries",
    slug: "dictionaries",
    title: "Dictionaries: Hash Maps, Lookups & Ordering",
    track: "python",
    topicSlug: "core",
    topicTitle: "Core Collections & Operations",
    order: 11,
    estimatedMinutes: 30,
    oneSentence:
      "A Python dictionary is a compact, insertion-ordered hash map that maps unique hashable keys to arbitrary values with average O(1) time complexity.",
    whyDoWeNeedIt: {
      problem:
        "Looking up values associated with identifiers using parallel arrays requires an $O(N)$ scan. Dictionaries provide instant $O(1)$ associative lookups.",
      realWorldAnalogy:
        "A telephone directory: you don't read from page 1 to the end to find someone's number; you jump directly to their name.",
    },
    visualIntuition: `Compact Dictionary Memory Architecture (Python 3.6+):
Keys/Values Table:
Index | Hash     | Key      | Value
0     | 48923018 | "apple"  | 5
1     | 91283921 | "banana" | 8

Sparse Hash Index Array:
Indices: [ -1, 0, -1, 1, -1, -1 ]
Hashes index into Sparse Array, which points to dense Keys/Values Table!
Result: Preserves insertion order and reduces memory footprint by 30%!`,
    syntax: {
      creation: "d = {'a': 1, 'b': 2}\nd = dict(a=1, b=2)",
      safeLookup: "val = d.get('key', default_val)\nval = d.setdefault('key', [])",
    },
    example: {
      title: "Frequency counting, safe lookups with .get(), and dictionary iterations",
      language: "python",
      code: `words = ["apple", "banana", "apple", "cherry", "banana", "apple"]

# 1. Frequency counting using standard dictionary
freq = {}
for word in words:
    freq[word] = freq.get(word, 0) + 1

print("Word Frequencies:", freq)

# 2. Safe key lookup with default fallback
orange_count = freq.get("orange", 0)
print("Orange count (safe):", orange_count)

# 3. Iterating keys, values, and key-value items
for fruit, count in freq.items():
    print(f"{fruit} appeared {count} time(s)")

# 4. Grouping items using setdefault
students = [("A", "Math"), ("B", "Physics"), ("C", "Math")]
groups = {}
for student, subject in students:
    groups.setdefault(subject, []).append(student)

print("Grouped by subject:", groups)`,
      explanation:
        "`freq.get(k, 0)` returns 0 if `k` is absent, preventing `KeyError`. In Python 3.7+, dictionaries are guaranteed to maintain insertion order.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Key Hash Calculation",
        description: "Python runs `hash(key)` to compute a 64-bit integer hash.",
      },
      {
        step: 2,
        title: "Sparse Table Indexing",
        description: "The hash modulo table size determines the slot in the sparse index array, pointing to the dense entries table.",
      },
      {
        step: 3,
        title: "Collision Handling via Perturbation",
        description: "If a collision occurs, Python perturbs the probe sequence (`j = ((5*j) + 1 + perturb) >> 5`) until a match or free slot is found.",
      },
    ],
    commonMistakes: [
      {
        mistake: "if d[k]: ... // Direct access without checking key existence",
        why: "If `k` is not present in `d`, Python raises `KeyError`.",
        correct: "if k in d: ... # Or use d.get(k)",
      },
      {
        mistake: "d = {[1, 2]: 'val'} // Using mutable list as dict key",
        why: "Keys must be hashable. Lists are unhashable and raise `TypeError: unhashable type: 'list'`.",
        correct: "d = {(1, 2): 'val'} // Use immutable tuple",
      },
    ],
    complexity: {
      time: "O(1) average for get, insert, delete, and in checks; O(N) worst-case",
      space: "O(N) memory for sparse array and dense entries",
      explanation: "Compact hash table design achieves high cache locality.",
    },
    tryItYourself: {
      prompt: "How can you merge two dictionaries in Python 3.9+ using a single operator?",
      hint: "Python 3.9 introduced the pipe union operator for dicts.",
      solutionSnippet: "d1 = {'a': 1}; d2 = {'b': 2}; merged = d1 | d2  # {'a': 1, 'b': 2}",
    },
    placementConnection:
      "Two Sum ($O(N)$ with hash map), Group Anagrams, and Subarray Sum Equals K are mandatory placement interview problems that require mastering Python dictionaries.",
    quickRevision: [
      "Dictionaries map unique hashable keys to arbitrary values in $O(1)$ average time.",
      "Since Python 3.7, dictionaries are guaranteed to retain insertion order.",
      "Use `d.get(k, default)` to avoid `KeyError` when accessing missing keys.",
      "Keys must be immutable (e.g. `str`, `int`, `tuple`); values can be anything.",
    ],
  },
  {
    id: "python-comprehensions",
    slug: "comprehensions",
    title: "Comprehensions: List, Dict & Set Transformations",
    track: "python",
    topicSlug: "core",
    topicTitle: "Core Collections & Operations",
    order: 12,
    estimatedMinutes: 25,
    oneSentence:
      "Comprehensions provide a concise, declarative syntax for transforming and filtering iterables into new lists, dictionaries, or sets, executed at C-speed in CPython.",
    whyDoWeNeedIt: {
      problem:
        "Building collections using multi-line `for` loops and repeated `.append()` calls is visually cluttered and slower due to repeated bytecode attribute lookups.",
      realWorldAnalogy:
        "An automated sorting and packaging machine: instead of manually picking up each apple, inspecting it, and putting it in a box, you configure a single conveyor filter.",
    },
    visualIntuition: `Comprehension Anatomy:
[ expression for item in iterable if condition ]
       |            |                  |
   Transform     Loop Iteration     Filter (Optional)

Example:
squares = [x*x for x in range(6) if x % 2 == 0]
Result:   [0, 4, 16]`,
    syntax: {
      listComp: "[x * 2 for x in nums if x > 0]",
      dictComp: "{k: v for k, v in zip(keys, vals)}",
      setComp: "{x.lower() for x in words}",
    },
    example: {
      title: "List, Dict, and 2D Matrix comprehensions with filtering",
      language: "python",
      code: `nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 1. Filtered list comprehension
even_squares = [x**2 for x in nums if x % 2 == 0]
print("Even squares:", even_squares)

# 2. Dictionary comprehension: Word length lookup
words = ["apple", "banana", "fig", "cherry"]
word_lens = {w: len(w) for w in words if len(w) > 3}
print("Word lengths (>3):", word_lens)

# 3. Set comprehension: Unique first letters
names = ["Aarav", "Bob", "Ananya", "Charlie", "Bharat"]
first_letters = {name[0] for name in names}
print("First letters:", first_letters)

# 4. Safe 2D Matrix initialization (3 rows x 4 cols)
matrix = [[0 for _ in range(4)] for _ in range(3)]
matrix[0][0] = 99
print("Matrix row 0:", matrix[0])
print("Matrix row 1:", matrix[1]) # Untouched!`,
      explanation:
        "Comprehensions combine mapping and filtering into a readable single-line expression. The nested list comprehension `[[0 for _ in range(4)] for _ in range(3)]` creates independent rows.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Dedicated Code Object",
        description: "Python compiles comprehensions into optimized bytecode using `LIST_APPEND` or `MAP_ADD` instructions without pushing and popping full function frames.",
      },
      {
        step: 2,
        title: "Iterative Transformation",
        description: "Elements passing the `if` guard are fed directly to the transformation expression.",
      },
      {
        step: 3,
        title: "Fast Preallocation",
        description: "CPython allocates list storage efficiently, avoiding repeated Python-level method lookup overhead.",
      },
    ],
    commonMistakes: [
      {
        mistake: "matrix = [[0] * 4] * 3 // Creates duplicate row references",
        why: "All 3 rows reference the identical inner list object in memory.",
        correct: "matrix = [[0] * 4 for _ in range(3)]",
      },
      {
        mistake: "Over-nesting comprehensions into unreadable 4-line expressions",
        why: "Violates Python's readability philosophy ('Readability counts').",
        correct: "If a comprehension requires more than 2 loops or complex conditions, use a standard for-loop.",
      },
    ],
    complexity: {
      time: "O(N) single-pass iteration",
      space: "O(N) newly created collection",
      explanation: "Runs faster than an explicit `for` loop with `.append()` calls because bytecode avoids function lookups.",
    },
    tryItYourself: {
      prompt: "Flatten a 2D matrix `grid = [[1, 2], [3, 4], [5, 6]]` into a 1D list `[1, 2, 3, 4, 5, 6]` using a single list comprehension.",
      hint: "In nested comprehensions, the outer loop comes first: `[x for row in grid for x in row]`.",
      solutionSnippet: "flat = [x for row in grid for x in row]",
    },
    placementConnection:
      "Interviewers judge code cleanliness. Being able to write concise list and dictionary comprehensions distinguishes fluent Python candidates.",
    quickRevision: [
      "Syntax: `[transform for item in iterable if condition]`.",
      "Use dict comprehensions `{k: v for ...}` and set comprehensions `{x for ...}`.",
      "Always initialize 2D dynamic programming tables with `[[0] * cols for _ in range(rows)]`.",
      "Keep comprehensions simple; if logic exceeds two loops, prefer a standard `for` loop.",
    ],
  },
];
