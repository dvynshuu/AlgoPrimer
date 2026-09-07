import { Lesson } from "@/types/content";

export const javaCollectionsLessons: Lesson[] = [
  {
    id: "java-arraylist",
    slug: "arraylist",
    title: "ArrayList: Dynamic Arrays & Amortized O(1)",
    track: "java",
    topicSlug: "collections",
    topicTitle: "Collections Framework",
    order: 1,
    estimatedMinutes: 30,
    oneSentence:
      "ArrayList is a resizable array implementation of the List interface that grows dynamically by 50% when capacity is reached, providing fast O(1) indexed access.",
    whyDoWeNeedIt: {
      problem:
        "Standard Java arrays `int[]` have fixed immutable sizes. In real-world data feeds, you rarely know ahead of time whether you will receive 10 items or 100,000 items. ArrayList handles automatic resizing.",
      realWorldAnalogy:
        "A concert stadium that automatically opens an adjacent expansion section whenever attendance hits capacity.",
    },
    visualIntuition: `ArrayList Dynamic Expansion (Growth Factor = 1.5x):
Capacity: 10
[ 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 ]  (Full!)
                    |
                    v Appending 11th item triggers resize!
New Capacity: 10 + (10 >> 1) = 15
[ 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |   |   |   |   ]
(Copies all 10 elements over into new heap array)`,
    syntax: {
      creation: "List<Integer> list = new ArrayList<>();\nList<String> preSized = new ArrayList<>(1000);",
      methods: "list.add(val);        // O(1) amortized\nlist.get(index);      // O(1)\nlist.set(index, val); // O(1)\nlist.remove(index);   // O(N) shift",
    },
    example: {
      title: "Core ArrayList operations and sorting",
      language: "java",
      code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ArrayListDemo {
    public static void main(String[] args) {
        List<Integer> scores = new ArrayList<>();
        scores.add(85);
        scores.add(92);
        scores.add(78);

        // Fast random access
        System.out.println("First score: " + scores.get(0)); // 85

        // In-place sorting
        Collections.sort(scores);
        System.out.println("Sorted: " + scores); // [78, 85, 92]

        // Iteration
        for (int s : scores) {
            System.out.println("Score: " + s);
        }
    }
}`,
      explanation:
        "Programming to the interface `List<Integer> list = new ArrayList<>()` allows changing the underlying list implementation without breaking callers.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Initial Capacity",
        description: "Default initial capacity is 10 (allocated lazily upon first `.add()`).",
      },
      {
        step: 2,
        title: "Expansion Formula",
        description: "`newCapacity = oldCapacity + (oldCapacity >> 1)` (grows by 50%).",
      },
      {
        step: 3,
        title: "Amortized O(1)",
        description: "Although expanding requires copying N items ($O(N)$), it happens so rarely that the average cost per append is constant $O(1)$.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Calling list.remove(int index) vs list.remove(Object o) with Integers",
        why: "In `list.remove(1)`, Java treats 1 as an index, NOT the integer value 1! To remove value 1, you must pass `Integer.valueOf(1)`.",
        correct: "list.remove(Integer.valueOf(targetVal));",
      },
      {
        mistake: "Removing elements with a standard for loop without decrementing index",
        why: "When an element is removed, subsequent items shift left. The loop index increments and skips the adjacent element!",
        correct: "Use an Iterator or iterate backward: for (int i = list.size() - 1; i >= 0; i--).",
      },
    ],
    complexity: {
      time: "get/set: O(1) | add(end): O(1) amortized | add(index): O(N) | remove: O(N)",
      space: "O(N) with up to 50% unused buffer capacity",
      explanation: "Shifting elements during arbitrary insertions/deletions makes middle modifications O(N).",
    },
    tryItYourself: {
      prompt: "How can you optimize an ArrayList if you already know it will hold 50,000 items?",
      hint: "Avoid the 50% growth cascade copies.",
      solutionSnippet: "Initialize with explicit capacity: List<Integer> list = new ArrayList<>(50000);",
    },
    placementConnection:
      "Interviewers test whether you know why ArrayList appends are O(1) amortized and how `remove(1)` behaves with integer lists.",
    quickRevision: [
      "Backed by an internal `Object[]` array.",
      "Grows by 50% (`old + old/2`) upon capacity overflow.",
      "Random access is O(1); removals and insertions at arbitrary indices are O(N).",
      "Not thread-safe.",
    ],
  },
  {
    id: "java-hashmap",
    slug: "hashmap",
    title: "HashMap Internals: Buckets, Collisions & Trees",
    track: "java",
    topicSlug: "collections",
    topicTitle: "Collections Framework",
    order: 2,
    estimatedMinutes: 35,
    oneSentence:
      "HashMap stores key-value pairs in an array of hash buckets, using hashCode() to calculate bucket indices and converting buckets into Red-Black Trees when collisions exceed 8.",
    whyDoWeNeedIt: {
      problem:
        "Searching for a value in an unsorted list takes $O(N)$ time. A HashMap allows instant $O(1)$ lookups, insertions, and deletions by calculating memory offsets mathematically from the key.",
      realWorldAnalogy:
        "A library with 16 color-coded shelves (buckets). Instead of searching every shelf, you calculate the author's initials, walk directly to Shelf #4, and look only at books on that single shelf.",
    },
    visualIntuition: `HashMap Bucket Structure:
Bucket Array (size 16):
[ 0 ] -> null
[ 1 ] -> [ Node: "apple"->10 ] -> [ Node: "banana"->20 ] (Linked List)
[ 2 ] -> null
...
[ 8 ] -> [ Red-Black Tree (TREEIFY_THRESHOLD = 8) ] (O(log K) search!)
...
Index Calculation: index = hashCode(key) & (capacity - 1)`,
    syntax: {
      usage: "Map<String, Integer> map = new HashMap<>();\nmap.put(\"apple\", 10);\nint val = map.getOrDefault(\"apple\", 0);\nmap.containsKey(\"apple\");",
    },
    example: {
      title: "Frequency counter pattern with HashMap",
      language: "java",
      code: `import java.util.HashMap;
import java.util.Map;

public class HashMapDemo {
    public static void main(String[] args) {
        String text = "placement preparation with campus prep";
        Map<Character, Integer> freq = new HashMap<>();

        for (char c : text.toCharArray()) {
            if (c == ' ') continue;
            // Idiomatic Java 8+ frequency count
            freq.put(c, freq.getOrDefault(c, 0) + 1);
        }

        // Iterating entries
        for (Map.Entry<Character, Integer> entry : freq.entrySet()) {
            System.out.println("Char '" + entry.getKey() + "' -> " + entry.getValue());
        }
    }
}`,
      explanation:
        "`freq.getOrDefault(c, 0)` returns the existing count or 0 if seen for the first time, avoiding multiple lookups.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Hash & Bucket Index",
        description: "The JVM calculates `key.hashCode()`, applies bit mixing, and computes `index = hash & (n - 1)`.",
      },
      {
        step: 2,
        title: "Collision Handling",
        description: "If two keys hash to the same bucket index, they are stored as nodes in a linked list. In Java 8+, if a bucket has $\\ge 8$ nodes and total table capacity $\\ge 64$, it converts into a Red-Black Tree ($O(\\log K)$ lookup).",
      },
      {
        step: 3,
        title: "Load Factor & Rehashing",
        description: "Default load factor is 0.75. When size exceeds `capacity * 0.75` (e.g. 12 items in size 16), capacity doubles to 32 and all keys are rehashed.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Overriding equals() without overriding hashCode() in custom key classes",
        why: "If two objects are equal according to `.equals()`, they MUST produce the exact same `hashCode()`. Breaking this contract causes `map.get(key)` to fail and return null!",
        correct: "Always override both equals() and hashCode() together.",
      },
      {
        mistake: "Using mutable objects as HashMap keys and mutating them",
        why: "Mutating the key changes its `hashCode()`, meaning `map.get(key)` will search the wrong bucket and fail to find the existing entry.",
        correct: "Use immutable keys (like String, Integer).",
      },
    ],
    complexity: {
      time: "get / put / containsKey: O(1) average | O(log N) worst-case with treeified collisions",
      space: "O(N) memory",
      explanation: "Constant time lookup makes HashMap the most critical data structure in technical interviews.",
    },
    tryItYourself: {
      prompt: "What happens when two different keys return the exact same hashCode in a Java HashMap?",
      hint: "It is called a hash collision.",
      solutionSnippet: "Both entries are stored in the same bucket index as a linked list (or Red-Black tree if >= 8). When retrieving, Java checks .equals() on each node in that bucket to find the exact match.",
    },
    placementConnection:
      "'How does HashMap work internally in Java 8?' and 'Explain the hashCode() and equals() contract' are asked in over 80% of Java technical rounds.",
    quickRevision: [
      "Default initial capacity: 16; default load factor: 0.75.",
      "Java 8 treeification: converts collision list to Red-Black Tree when bucket size reaches 8.",
      "Always override `equals()` and `hashCode()` together.",
      "Allows one `null` key and multiple `null` values.",
    ],
  },
  {
    id: "java-hashset",
    slug: "hashset",
    title: "HashSet: Uniqueness & Backing HashMap",
    track: "java",
    topicSlug: "collections",
    topicTitle: "Collections Framework",
    order: 3,
    estimatedMinutes: 20,
    oneSentence:
      "HashSet is an unordered Collection backed internally by a HashMap that guarantees all elements are unique and provides O(1) average lookup.",
    whyDoWeNeedIt: {
      problem:
        "Checking if an element exists in a list of size 100,000 using `list.contains()` requires scanning up to 100,000 items ($O(N)$). HashSet answers in 1 CPU operation ($O(1)$).",
      realWorldAnalogy:
        "A guest list at a VIP event. Security checks your name on an indexed sheet instantly; duplicates are refused entry.",
    },
    visualIntuition: `Internal Architecture of HashSet:
HashSet.add("apple")
        |
        v Invokes under the hood:
HashMap.put("apple", DUMMY_PRESENT_OBJECT)
(The element is stored as the KEY of an internal HashMap; the VALUE is a dummy constant!)`,
    syntax: {
      usage: "Set<Integer> set = new HashSet<>();\nset.add(10);\nset.contains(10); // O(1) check\nset.remove(10);",
    },
    example: {
      title: "Deduplicating elements and instant membership checking",
      language: "java",
      code: `import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class HashSetDemo {
    public static void main(String[] args) {
        List<Integer> nums = Arrays.asList(5, 2, 8, 5, 2, 9, 1);
        
        // Instant deduplication
        Set<Integer> unique = new HashSet<>(nums);
        System.out.println("Unique numbers: " + unique); // [1, 2, 5, 8, 9] (unordered)

        // Instant O(1) lookup
        if (unique.contains(8)) {
            System.out.println("8 is present!");
        }
    }
}`,
      explanation:
        "HashSet discards duplicate insertions automatically. If `set.add(x)` returns `false`, the element was already present.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Backing Map",
        description: "HashSet instantiates a `new HashMap<>()` in its constructor.",
      },
      {
        step: 2,
        title: "Dummy Value",
        description: "`add(e)` puts `e` as key and a static dummy `Object PRESENT = new Object()` as value.",
      },
      {
        step: 3,
        title: "No Order Guarantee",
        description: "Elements are distributed according to hash codes. If insertion order is needed, use `LinkedHashSet`.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Assuming HashSet preserves insertion or sorted order",
        why: "HashSet does not preserve order. If you need insertion order, use LinkedHashSet; if sorted, use TreeSet.",
        correct: "Use TreeSet for sorted order; LinkedHashSet for insertion order.",
      },
    ],
    tryItYourself: {
      prompt: "Given an array of integers, return true if any value appears at least twice.",
      hint: "If set.add(num) returns false, you found a duplicate!",
      solutionSnippet: `Set<Integer> seen = new HashSet<>();
for (int x : nums) {
    if (!seen.add(x)) return true;
}
return false;`,
    },
    placementConnection:
      "Understanding that HashSet is internally backed by a HashMap is a very common technical screening question.",
    quickRevision: [
      "HashSet is backed internally by a HashMap.",
      "Provides $O(1)$ average time for `add`, `remove`, and `contains`.",
      "Does not allow duplicates.",
      "Does not guarantee any ordering.",
    ],
  },
  {
    id: "java-stack-deque",
    slug: "stack-deque",
    title: "Stack, Queue & ArrayDeque",
    track: "java",
    topicSlug: "collections",
    topicTitle: "Collections Framework",
    order: 4,
    estimatedMinutes: 25,
    oneSentence:
      "Java recommends ArrayDeque over the legacy Stack class because ArrayDeque is faster, cache-friendly, and operates as both a LIFO stack and FIFO queue without synchronization overhead.",
    whyDoWeNeedIt: {
      problem:
        "The legacy `java.util.Stack` class extends `Vector`, which synchronizes every method call. This causes heavy lock contention in single-threaded algorithms.",
      realWorldAnalogy:
        "A cafeteria tray dispenser (LIFO stack: last tray placed on top is first taken) and a cafeteria line (FIFO queue: first in line gets served first). `ArrayDeque` can act as both.",
    },
    visualIntuition: `ArrayDeque Circular Buffer:
Head Pointer                       Tail Pointer
      v                                  v
[   | 10 | 20 | 30 | 40 |   |   |   |   |   ]
Can push/pop efficiently from BOTH ends in O(1)!`,
    syntax: {
      stack: "Deque<Integer> stack = new ArrayDeque<>();\nstack.push(val); // LIFO\nint top = stack.pop();\nint peek = stack.peek();",
      queue: "Queue<Integer> queue = new ArrayDeque<>();\nqueue.offer(val); // FIFO\nint front = queue.poll();",
    },
    example: {
      title: "Validating balanced parentheses with ArrayDeque",
      language: "java",
      code: `import java.util.ArrayDeque;
import java.util.Deque;

public class BracketMatcher {
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();

        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else {
                if (stack.isEmpty() || stack.pop() != c) {
                    return false;
                }
            }
        }

        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println("({[]}): " + isValid("({[]})")); // true
        System.out.println("([)]: " + isValid("([)]"));     // false
    }
}`,
      explanation:
        "`ArrayDeque` implements the `Deque` (Double Ended Queue) interface and outperforms `java.util.Stack` and `LinkedList`.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Circular Array Resizing",
        description: "`ArrayDeque` maintains head and tail pointers on an array that wraps around circularly.",
      },
      {
        step: 2,
        title: "Zero Pointer Hopping",
        description: "Unlike `LinkedList`, `ArrayDeque` does not allocate a node object for every push, saving memory and avoiding garbage collection overhead.",
      },
      {
        step: 3,
        title: "Null Disallowed",
        description: "`ArrayDeque` does NOT allow null elements.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using Stack<Integer> in competitive coding / LeetCode",
        why: "Stack inherits from Vector and synchronizes on every push/pop, adding unnecessary lock overhead.",
        correct: "Use Deque<Integer> stack = new ArrayDeque<>().",
      },
    ],
    tryItYourself: {
      prompt: "Why is ArrayDeque faster than LinkedList when used as a Queue in BFS?",
      hint: "Cache locality and memory allocation per element.",
      solutionSnippet: "LinkedList allocates a Node object for every element inserted, causing memory fragmentation and cache misses. ArrayDeque stores elements in contiguous memory chunks.",
    },
    placementConnection:
      "Using `ArrayDeque` instead of `Stack` signals deep Java knowledge to senior interviewers.",
    quickRevision: [
      "Prefer `ArrayDeque` over `java.util.Stack`.",
      "`push()` and `pop()` for Stack operations (LIFO).",
      "`offer()` and `poll()` for Queue operations (FIFO).",
      "`ArrayDeque` does not allow null elements.",
    ],
  },
  {
    id: "java-comparable-comparator",
    slug: "comparable-comparator",
    title: "Comparable vs Comparator: Custom Sorting",
    track: "java",
    topicSlug: "collections",
    topicTitle: "Collections Framework",
    order: 5,
    estimatedMinutes: 30,
    oneSentence:
      "Comparable defines the single natural ordering of a class through compareTo(), while Comparator provides flexible, multiple external sorting strategies through compare().",
    whyDoWeNeedIt: {
      problem:
        "Sorting integers is obvious (ascending numerical order). But how should Java sort a list of `Student` objects? By marks? By roll number? By name? We need explicit sorting strategies.",
      realWorldAnalogy:
        "Sorting clothes. Natural ordering: by size (S, M, L). Custom ordering for an event: by color, or by fabric type.",
    },
    visualIntuition: `Comparable vs Comparator:
[ Comparable<T> ]                 [ Comparator<T> ]
- Implemented INSIDE the class     - Standalone external strategy
- Single Natural Order:            - Multiple sorting orders:
  compareTo(T other)                 BySalary, ByName, ByAge
- Modifies original class          - Leaves original class untouched!`,
    syntax: {
      comparable: "public class Item implements Comparable<Item> {\n    public int compareTo(Item o) {\n        return this.price - o.price;\n    }\n}",
      comparator: "Comparator<Item> byName = (a, b) -> a.name.compareTo(b.name);\nlist.sort(byName);",
    },
    example: {
      title: "Sorting objects with modern Java Lambda Comparators",
      language: "java",
      code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Player {
    String name;
    int score;
    int age;

    public Player(String name, int score, int age) {
        this.name = name;
        this.score = score;
        this.age = age;
    }

    @Override
    public String toString() {
        return name + " (" + score + "pts, age " + age + ")";
    }
}

public class SortingDemo {
    public static void main(String[] args) {
        List<Player> players = new ArrayList<>();
        players.add(new Player("Rahul", 150, 22));
        players.add(new Player("Amit", 200, 25));
        players.add(new Player("Sneha", 150, 20));

        // Sort descending by score, then ascending by age
        players.sort(
            Comparator.comparingInt((Player p) -> p.score).reversed()
                      .thenComparingInt(p -> p.age)
        );

        System.out.println("Leaderboard: " + players);
    }
}`,
      explanation:
        "`Comparator.comparingInt(...).thenComparingInt(...)` provides readable, declarative multi-level sorting.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Return Contract",
        description: "Negative (< 0) means this < other. Zero (== 0) means equal. Positive (> 0) means this > other.",
      },
      {
        step: 2,
        title: "TimSort",
        description: "Java's `Collections.sort()` uses TimSort (hybrid Merge Sort + Insertion Sort), which is stable ($O(N \\log N)$).",
      },
    ],
    commonMistakes: [
      {
        mistake: "return a.score - b.score; when scores can be large or negative",
        why: "Integer subtraction can overflow! If `a = Integer.MIN_VALUE` and `b = 1`, `a - b` overflows to positive and breaks sorting!",
        correct: "Use Integer.compare(a.score, b.score);",
      },
    ],
    tryItYourself: {
      prompt: "How can you sort a list of strings by their length in ascending order?",
      hint: "list.sort(Comparator.comparingInt(String::length));",
      solutionSnippet: `strings.sort(Comparator.comparingInt(String::length));`,
    },
    placementConnection:
      "Sorting intervals in Greedy problems (Merge Intervals, Activity Selection) requires writing custom Comparators on 2D arrays: `(a, b) -> Integer.compare(a[0], b[0])`.",
    quickRevision: [
      "Comparable = 1 natural ordering (`compareTo()`).",
      "Comparator = Multiple custom sortings (`compare()`).",
      "Always use `Integer.compare(a, b)` instead of subtraction to avoid overflow.",
      "Java sorting is stable (preserves relative order of equals).",
    ],
  },
];
