import { Lesson } from "@/types/content";

export const javaCoreLessons: Lesson[] = [
  {
    id: "java-arrays",
    slug: "arrays",
    title: "Arrays in Java",
    track: "java",
    topicSlug: "core",
    topicTitle: "Core",
    order: 1,
    estimatedMinutes: 35,
    oneSentence:
      "An array is a fixed-size, contiguous block of memory that stores elements of the same data type accessible via 0-based indexing.",
    whyDoWeNeedIt: {
      problem:
        "Storing 50 students' marks using individual variables (mark1, mark2, ... mark50) is impossible to loop over, sort, or search. We need a contiguous structure where element address can be mathematically calculated.",
      realWorldAnalogy:
        "A row of consecutive post office boxes. Box #0 is at the entrance. To reach Box #k, you take k steps forward from the entrance.",
    },
    visualIntuition: `Contiguous Memory Representation:
Base Address: 1000 (each int = 4 bytes)
Index:         0       1       2       3
Address:     1000    1004    1008    1012
Value:      [ 45 ]  [ 82 ]  [ 93 ]  [ 61 ]

Formula: Address(i) = BaseAddress + (i * elementSize)`,
    syntax: {
      declaration: "int[] nums = new int[5]; // size 5 with default values (0)\nint[] primes = {2, 3, 5, 7, 11};",
    },
    example: {
      title: "Finding the maximum element in an array",
      language: "java",
      code: `public class Main {
    public static void main(String[] args) {
        int[] scores = {45, 82, 93, 61, 74};
        int maxScore = scores[0]; // Assume first is max

        for (int i = 1; i < scores.length; i++) {
            if (scores[i] > maxScore) {
                maxScore = scores[i];
            }
        }

        System.out.println("Highest Score: " + maxScore);
    }
}`,
      explanation:
        "Because elements are stored contiguously, accessing scores[i] takes O(1) constant time regardless of whether the array has 5 elements or 5 million.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Heap Allocation",
        description: "'new int[5]' allocates 5 * 4 = 20 contiguous bytes on the JVM heap.",
      },
      {
        step: 2,
        title: "Reference on Stack",
        description: "The variable 'scores' on the stack holds the 64-bit memory address of the first array element.",
      },
      {
        step: 3,
        title: "Random Access",
        description: "scores[3] jumps directly to (Base + 3 * 4) bytes in O(1) time without reading items 0, 1, or 2.",
      },
    ],
    commonMistakes: [
      {
        mistake: "int[] a = {1, 2}; int[] b = a; b[0] = 99;",
        why: "'b = a' copies the reference (pointer), NOT the underlying array data. Mutating b also mutates a.",
        correct: "int[] b = a.clone(); // or Arrays.copyOf(a, a.length);",
      },
      {
        mistake: "Trying to resize an array: arr[10] = 5 on size 5 array",
        why: "Java arrays have fixed immutable capacity once allocated.",
        correct: "Use an ArrayList or allocate a new larger array and copy elements.",
      },
    ],
    complexity: {
      time: "Read/Write by Index: O(1) | Search unsorted: O(n) | Insertion/Deletion: O(n)",
      space: "O(n) where n is capacity",
      explanation: "Direct index arithmetic enables instant O(1) access, but resizing or shifting elements requires O(n) time.",
    },
    tryItYourself: {
      prompt: "Reverse an array in-place without creating a second array.",
      hint: "Use two pointers: left = 0, right = arr.length - 1, swap them and move inward.",
      solutionSnippet: `int left = 0, right = arr.length - 1;
while (left < right) {
    int temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
}`,
    },
    placementConnection:
      "Over 60% of all technical interview problems in campus placements are array or string problems. Mastering two pointers, sliding window, and prefix sums on arrays is essential for clearing technical rounds.",
    quickRevision: [
      "Arrays provide O(1) random access via memory address calculation.",
      "Length is a field (arr.length), not a method call like String (s.length()).",
      "In-place modifications avoid O(n) extra space, which interviewers always ask for.",
      "Cache locality: contiguous layout makes arrays much faster in practice than linked nodes.",
    ],
  },
  {
    id: "java-strings",
    slug: "strings",
    title: "Strings & String Constant Pool (SCP)",
    track: "java",
    topicSlug: "core",
    topicTitle: "Core",
    order: 2,
    estimatedMinutes: 30,
    oneSentence:
      "Strings in Java are immutable objects backed by byte/char arrays and cached in a special String Constant Pool inside the heap.",
    whyDoWeNeedIt: {
      problem:
        "Strings are widely used for security (passwords, database URLs, class loading). If strings were mutable, another thread could change a database connection string or file path after security checks have passed.",
      realWorldAnalogy:
        "A printed legal deed. Once signed and sealed, you cannot erase sentences; if you want alterations, you must print a brand new document.",
    },
    visualIntuition: `Heap vs String Constant Pool (SCP):
Stack                    Heap
[ s1 ] ----------------> [ "hello" in SCP (Address: 0x100) ]
                            ^
[ s2 ] ---------------------+ (Reuses exact same SCP instance!)

[ s3 ] --------> [ new String("hello") (Address: 0x500) in Heap ]
                        |
                        +---> points to "hello" in SCP
Result:
s1 == s2 is TRUE (same memory address in SCP)
s1 == s3 is FALSE (different heap addresses!)
s1.equals(s3) is TRUE (same characters)`,
    syntax: {
      literal: "String s1 = \"hello\"; // stored in SCP\nString s2 = new String(\"hello\"); // explicit heap object",
    },
    example: {
      title: "Comparing String references vs contents in Java",
      language: "java",
      code: `public class StringPoolDemo {
    public static void main(String[] args) {
        String a = "placement";
        String b = "placement";
        String c = new String("placement");

        System.out.println("a == b: " + (a == b));             // true (both in SCP)
        System.out.println("a == c: " + (a == c));             // false (different heap objects)
        System.out.println("a.equals(c): " + a.equals(c));     // true (character equality)

        // Manual interning pushes or retrieves reference from SCP
        String d = c.intern();
        System.out.println("a == d: " + (a == d));             // true!
    }
}`,
      explanation:
        "String literals are automatically deduplicated in the SCP. `new String()` forces a separate object in normal heap memory.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Literal Evaluation",
        description: "When JVM encounters \"placement\", it checks the SCP. If found, it returns the existing pointer.",
      },
      {
        step: 2,
        title: "Immutability Guarantee",
        description: "All methods like `s.toUpperCase()` or `s.replace()` allocate and return a BRAND NEW String object; the original string is untouched.",
      },
      {
        step: 3,
        title: "Hash Code Caching",
        description: "Because strings never change, their `hashCode()` is calculated once and cached, enabling fast HashMap key lookups.",
      },
    ],
    commonMistakes: [
      {
        mistake: "if (userInput == \"yes\") { ... }",
        why: "'==' checks reference equality. User input is allocated at runtime outside the SCP, so '==' evaluates to false even if the text matches.",
        correct: "if (\"yes\".equalsIgnoreCase(userInput)) { ... }",
      },
      {
        mistake: "String s = \"\"; for (int i = 0; i < n; i++) s += i;",
        why: "In every loop iteration, '+=' creates a new String and copies all previous characters. This takes O(N^2) time!",
        correct: "Use StringBuilder which appends in O(1) amortized time.",
      },
    ],
    complexity: {
      time: "Length: O(1) | CharAt: O(1) | Substring: O(K) | Concatenation (+): O(N + M)",
      space: "O(N) bytes stored in Heap/SCP",
      explanation: "Character access is constant time, but concatenation allocates new arrays.",
    },
    tryItYourself: {
      prompt: "Check if a string is a palindrome without calling any library reverse methods.",
      hint: "Compare charAt(left) and charAt(right) using two pointers.",
      solutionSnippet: `int l = 0, r = s.length() - 1;
while (l < r) {
    if (s.charAt(l) != s.charAt(r)) return false;
    l++; r--;
}
return true;`,
    },
    placementConnection:
      "Interviewers test whether you know why strings are immutable in Java (security, caching, thread-safety, String pool) and whether you accidentally write O(N^2) string building loops.",
    quickRevision: [
      "Strings are immutable in Java.",
      "String literals live in the String Constant Pool (SCP) inside the heap.",
      "Always compare string contents using `.equals()` or `.equalsIgnoreCase()`, never `==`.",
      "String `.hashCode()` is cached, making strings optimal HashMap keys.",
    ],
  },
  {
    id: "java-stringbuilder",
    slug: "stringbuilder",
    title: "StringBuilder vs StringBuffer vs String",
    track: "java",
    topicSlug: "core",
    topicTitle: "Core",
    order: 3,
    estimatedMinutes: 25,
    oneSentence:
      "StringBuilder provides a mutable, non-synchronized sequence of characters designed to avoid $O(N^2)$ memory reallocation when constructing strings dynamically.",
    whyDoWeNeedIt: {
      problem:
        "Concatenating strings inside a loop of size 100,000 using `s += c` allocates 100,000 temporary heap arrays and copies $1 + 2 + ... + 100,000 \\approx 5 \\times 10^9$ characters, crashing with Time Limit Exceeded or OutOfMemoryError.",
      realWorldAnalogy:
        "A whiteboard (`StringBuilder`) vs printing a new sheet of paper every time you write a word (`String`). You write on the whiteboard and erase/append freely without throwing away paper.",
    },
    visualIntuition: `String += in Loop (O(N^2) Disaster):
i=0: [ "a" ] (1 byte)
i=1: [ "a" ] + [ "b" ] -> allocates [ "ab" ] (2 bytes, copies "a")
i=2: [ "ab" ] + [ "c" ] -> allocates [ "abc" ] (3 bytes, copies "ab")
Total operations: 1 + 2 + 3 + ... + N = O(N^2)

StringBuilder.append() (O(N) Total):
Internal buffer with capacity 16:
[ a | b | c | d |   |   |   |   |   |   |   |   |   |   |   |   ]
Appends directly into adjacent buffer slot in O(1) amortized time!`,
    syntax: {
      usage: "StringBuilder sb = new StringBuilder();\nsb.append(\"data\");\nsb.reverse();\nString result = sb.toString();",
    },
    example: {
      title: "Efficient string construction using StringBuilder",
      language: "java",
      code: `public class StringBuilderDemo {
    public static String buildCSV(int[] nums) {
        // Pre-allocate estimated capacity to avoid internal reallocations
        StringBuilder sb = new StringBuilder(nums.length * 4);
        
        for (int i = 0; i < nums.length; i++) {
            sb.append(nums[i]);
            if (i < nums.length - 1) {
                sb.append(",");
            }
        }
        
        return sb.toString(); // Single O(N) allocation at the end!
    }

    public static void main(String[] args) {
        int[] data = {10, 20, 30, 40, 50};
        System.out.println(buildCSV(data)); // 10,20,30,40,50
    }
}`,
      explanation:
        "StringBuilder buffers characters in an internal `byte[]` array. It only reallocates when capacity is exceeded, achieving amortized O(1) append time.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Initial Capacity",
        description: "Default initial capacity is 16 characters (or specified in constructor).",
      },
      {
        step: 2,
        title: "Dynamic Expansion",
        description: "When buffer fills, capacity doubles: `(oldCapacity * 2) + 2`.",
      },
      {
        step: 3,
        title: "Thread Safety Tradeoff",
        description: "`StringBuilder` is not thread-safe (fast). `StringBuffer` has synchronized methods (thread-safe, but slower due to lock overhead).",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using StringBuffer in single-threaded algorithmic problems",
        why: "StringBuffer acquires and releases mutex locks on every call, adding unnecessary CPU overhead.",
        correct: "Use StringBuilder for algorithmic problem solving.",
      },
      {
        mistake: "Calling sb.toString() inside loop condition: while (sb.toString().length() < n)",
        why: "Calling `.toString()` copies the whole buffer into a new String on each iteration, re-introducing O(N^2) overhead.",
        correct: "Call sb.length() directly.",
      },
    ],
    complexity: {
      time: "Append: O(1) amortized | Reverse: O(N) | Delete: O(N) shift",
      space: "O(N) internal buffer",
      explanation: "Total time for N appends is strictly linear O(N) instead of O(N^2).",
    },
    tryItYourself: {
      prompt: "Reverse a string in one line using StringBuilder.",
      hint: "new StringBuilder(s).reverse().toString()",
      solutionSnippet: `String reversed = new StringBuilder(s).reverse().toString();`,
    },
    placementConnection:
      "String vs StringBuilder vs StringBuffer is one of the most common standard core Java interview questions.",
    quickRevision: [
      "String is immutable; StringBuilder & StringBuffer are mutable.",
      "StringBuilder is unsynchronized and faster; use it in DSA / competitive coding.",
      "StringBuffer is thread-safe via synchronized methods.",
      "Always use StringBuilder when building or appending strings inside loops.",
    ],
  },
  {
    id: "java-wrapper-math",
    slug: "wrapper-math",
    title: "Wrapper Classes & Math Utilities",
    track: "java",
    topicSlug: "core",
    topicTitle: "Core",
    order: 4,
    estimatedMinutes: 25,
    oneSentence:
      "Wrapper classes encapsulate primitive data types into heap-allocated objects, enabling primitives to be used in generic Collections like ArrayList<Integer>.",
    whyDoWeNeedIt: {
      problem:
        "Java Collections (like `ArrayList`, `HashMap`) can only store object references, not raw primitives (`ArrayList<int>` is invalid syntax). Wrapper classes bridge this gap.",
      realWorldAnalogy:
        "A gift box. A raw phone (primitive) cannot be stacked in an Amazon shipping crate designed for standardized cardboard boxes; you put the phone into a box (Wrapper Object).",
    },
    visualIntuition: `Autoboxing and Unboxing:
Primitive: int x = 42 (4 bytes on Stack)
         |
         v Autoboxing (Integer.valueOf(42))
Heap Object: [ Integer Object: value = 42 ] (16-24 bytes on Heap)
         |
         v Unboxing (.intValue())
Primitive: int y = 42 (Back to raw stack value)`,
    syntax: {
      autoboxing: "Integer boxed = 100;     // Autoboxing\nint unboxed = boxed;        // Unboxing",
      math: "Math.max(a, b);\nMath.min(a, b);\nMath.abs(n);\nMath.pow(base, exp);\nMath.sqrt(val);",
    },
    example: {
      title: "The Integer Cache Trap in Java",
      language: "java",
      code: `public class IntegerCacheDemo {
    public static void main(String[] args) {
        // Java caches Integer objects from -128 to +127 in memory!
        Integer a = 100;
        Integer b = 100;
        System.out.println("a == b (100): " + (a == b)); // TRUE! (Cached reference)

        Integer x = 200;
        Integer y = 200;
        System.out.println("x == y (200): " + (x == y)); // FALSE! (Separate heap objects)

        // The correct way: ALWAYS use .equals() for Wrapper comparisons
        System.out.println("x.equals(y): " + x.equals(y)); // TRUE!
    }
}`,
      explanation:
        "The JVM caches Integer objects in the range `[-128, 127]`. Values outside this range allocate distinct heap objects. Comparing wrappers with `==` causes subtle bugs.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Autoboxing",
        description: "Compiler inserts `Integer.valueOf(x)` automatically when assigning primitive to wrapper.",
      },
      {
        step: 2,
        title: "Unboxing",
        description: "Compiler inserts `.intValue()` when assigning wrapper to primitive. If wrapper is `null`, this throws `NullPointerException`!",
      },
      {
        step: 3,
        title: "Integer Cache",
        description: "Integer, Byte, Short, Character cache standard small values to reduce garbage collection pressure.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Integer val = null; int num = val;",
        why: "Unboxing invokes `val.intValue()`. Calling a method on `null` throws `NullPointerException`.",
        correct: "Always check for null before unboxing: int num = (val != null) ? val : 0;",
      },
      {
        mistake: "Comparing wrappers with == instead of .equals()",
        why: "`==` compares heap addresses. Works for -128 to 127 due to caching, but fails unpredictably for 128+.",
        correct: "Always use `.equals()` to compare wrapper class objects.",
      },
    ],
    tryItYourself: {
      prompt: "Find the maximum of three integers 'a', 'b', 'c' using Math.max in one line.",
      hint: "Math.max(a, Math.max(b, c))",
      solutionSnippet: `int maxOfThree = Math.max(a, Math.max(b, c));`,
    },
    placementConnection:
      "The Integer Cache (-128 to 127) question is an interview favorite designed to catch candidates who rely on `==` instead of `.equals()`.",
    quickRevision: [
      "Every primitive has a wrapper: `Integer`, `Double`, `Character`, `Boolean`, etc.",
      "Autoboxing and Unboxing are compiler conveniences.",
      "Integer cache covers `[-128, 127]`. Always use `.equals()` for wrappers.",
      "Unboxing a `null` wrapper throws `NullPointerException`.",
    ],
  },
  {
    id: "java-packages-access",
    slug: "packages-access",
    title: "Packages & Access Modifiers",
    track: "java",
    topicSlug: "core",
    topicTitle: "Core",
    order: 5,
    estimatedMinutes: 25,
    oneSentence:
      "Access modifiers define the scope and visibility of classes, constructors, methods, and fields across package boundaries.",
    whyDoWeNeedIt: {
      problem:
        "If all internal fields of a class were accessible everywhere, external code could corrupt critical invariants (e.g. setting an array's size to -5 or bypassing security authentication).",
      realWorldAnalogy:
        "A bank. The teller window is `public` (anyone can talk to it), the safe deposit area is `protected` (only authorized staff and account holders), and the master vault combination is `private` (only the branch manager knows).",
    },
    visualIntuition: `Access Modifier Visibility Matrix:
+-------------------+---------+---------+------------+-------+
| Location          | private | default | protected  | public|
+-------------------+---------+---------+------------+-------+
| Same Class        |   YES   |   YES   |    YES     |  YES  |
| Same Package      |   NO    |   YES   |    YES     |  YES  |
| Subclass (outside)|   NO    |   NO    |    YES     |  YES  |
| World (outside)   |   NO    |   NO    |    NO      |  YES  |
+-------------------+---------+---------+------------+-------+`,
    syntax: {
      modifiers: "private int secret;\nint packageDefault;\nprotected int inheritedData;\npublic int globalAccess;",
    },
    example: {
      title: "Encapsulating internal data with private modifiers",
      language: "java",
      code: `package com.campusprep.model;

public class BankAccount {
    // Private field: cannot be modified directly from outside
    private double balance;

    public BankAccount(double initialDeposit) {
        if (initialDeposit >= 0) {
            this.balance = initialDeposit;
        }
    }

    // Public method: controlled access with validation
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    public double getBalance() {
        return this.balance;
    }
}`,
      explanation:
        "By marking `balance` as private, outside code cannot corrupt the account balance with negative numbers.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Compile-Time Enforcement",
        description: "Access modifiers are verified strictly during compilation; violating visibility prevents bytecode generation.",
      },
      {
        step: 2,
        title: "Package Namespacing",
        description: "Packages prevent naming collisions (e.g. `java.util.Date` vs `java.sql.Date`).",
      },
      {
        step: 3,
        title: "Default (Package-Private)",
        description: "Omitting a modifier grants access only to classes residing in the exact same package folder.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Declaring top-level classes as private or protected",
        why: "A top-level class can only be `public` or `default` (package-private). Only inner nested classes can be `private` or `protected`.",
        correct: "Use public or package-private for top-level classes.",
      },
    ],
    tryItYourself: {
      prompt: "Can a subclass in a different package access a `protected` member of its superclass?",
      hint: "Check the visibility matrix for 'Subclass (outside)'.",
      solutionSnippet: `Yes! A protected member is inherited and accessible inside the subclass body across package boundaries.`,
    },
    placementConnection:
      "Interviewers test whether you know the difference between `default` (package-private) and `protected` (package-private + subclasses outside package).",
    quickRevision: [
      "`private`: Visible only within the declaring class.",
      "`default` (no keyword): Visible within the declaring package.",
      "`protected`: Visible within package AND subclasses outside package.",
      "`public`: Visible everywhere.",
    ],
  },
  {
    id: "java-exceptions",
    slug: "exceptions",
    title: "Exception Handling: Try, Catch & Throws",
    track: "java",
    topicSlug: "core",
    topicTitle: "Core",
    order: 6,
    estimatedMinutes: 30,
    oneSentence:
      "Exception handling separates error-handling logic from business logic, allowing robust recovery from runtime errors without crashing the process.",
    whyDoWeNeedIt: {
      problem:
        "Without exceptions, methods must return magic error codes (-1, null, false). Callers frequently forget to check return codes, leading to silent data corruption or sudden crashes.",
      realWorldAnalogy:
        "An airplane parachute. If the engine fails (runtime error), the emergency parachute system activates (catches exception), guiding the plane to a safe emergency landing rather than free-falling.",
    },
    visualIntuition: `Java Exception Hierarchy:
                 [ Throwable ]
                 /           \\
           [ Error ]      [ Exception ]
          (Fatal, OOM)    /           \\
             [ Checked Exceptions ]   [ RuntimeException (Unchecked) ]
             (IOException, SQLException) (NullPointer, ArrayIndexOutOfBounds)`,
    syntax: {
      tryCatch: `try {
    // risky code
} catch (SpecificException e) {
    // handle error
} finally {
    // always executes (cleanup resources)
}`,
    },
    example: {
      title: "Try-with-resources for automatic resource cleanup",
      language: "java",
      code: `import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ExceptionDemo {
    // Try-with-resources automatically closes resources implementing AutoCloseable
    public static void readFile(String path) {
        try (BufferedReader br = new BufferedReader(new FileReader(path))) {
            String line = br.readLine();
            System.out.println("First line: " + line);
        } catch (IOException e) {
            System.err.println("File read error: " + e.getMessage());
        } finally {
            System.out.println("Cleanup completed.");
        }
    }

    public static void main(String[] args) {
        readFile("non_existent_file.txt");
    }
}`,
      explanation:
        "Try-with-resources ensures the file handle is closed even if an exception occurs, preventing memory and OS resource leaks.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Exception Thrown",
        description: "When an anomaly occurs, JVM creates an Exception object and looks up the call stack for an active handler.",
      },
      {
        step: 2,
        title: "Stack Unwinding",
        description: "Frames pop from the call stack until a matching `catch` block is found.",
      },
      {
        step: 3,
        title: "Finally Execution",
        description: "The `finally` block ALWAYS executes, regardless of whether an exception occurred, was caught, or unhandled.",
      },
    ],
    commonMistakes: [
      {
        mistake: "catch (Exception e) {} // Empty catch block",
        why: "Swallowing exceptions silently hides critical bugs and makes debugging impossible in production.",
        correct: "Log the exception or rethrow it.",
      },
      {
        mistake: "Placing generic catch (Exception e) before catch (IOException e)",
        why: "Subclasses must be caught before superclasses. Catching Exception first makes subsequent catch blocks unreachable compile errors.",
        correct: "Order catch blocks from most specific to most general.",
      },
    ],
    tryItYourself: {
      prompt: "What is the key difference between Checked and Unchecked exceptions in Java?",
      hint: "Does the compiler force you to handle it with try-catch or throws?",
      solutionSnippet: `Checked Exceptions (subclasses of Exception excluding RuntimeException):
Compiler mandates handling with try-catch or declaring 'throws' (e.g. IOException).

Unchecked Exceptions (subclasses of RuntimeException):
Compiler does not mandate handling; indicates programming bugs (e.g. NullPointerException).`,
    },
    placementConnection:
      "'Checked vs Unchecked exceptions' and 'Does finally always execute?' are classic interview questions. (Finally executes unless System.exit() or JVM crash occurs).",
    quickRevision: [
      "Checked exceptions are verified at compile time; Unchecked exceptions occur at runtime.",
      "`try-with-resources` guarantees automatic closing of `AutoCloseable` streams.",
      "`finally` block executes even if `return` is encountered in `try` or `catch`.",
      "Never catch `Error` (e.g. `OutOfMemoryError`, `StackOverflowError`).",
    ],
  },
];
