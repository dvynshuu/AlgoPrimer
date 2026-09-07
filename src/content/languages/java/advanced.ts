import { Lesson } from "@/types/content";

export const javaAdvancedLessons: Lesson[] = [
  {
    id: "java-generics",
    slug: "generics",
    title: "Generics, Type Erasure & Wildcards (PECS)",
    track: "java",
    topicSlug: "advanced",
    topicTitle: "Advanced Concepts",
    order: 1,
    estimatedMinutes: 30,
    oneSentence:
      "Generics provide compile-time type safety for classes and methods, eliminating manual casting while relying on Type Erasure for JVM backward compatibility.",
    whyDoWeNeedIt: {
      problem:
        "Before Java 5, collections held raw `Object` references. You had to manually cast: `String s = (String) list.get(0);`. If someone inserted an Integer, your program crashed at runtime with `ClassCastException`.",
      realWorldAnalogy:
        "Prescription medicine labels. Before generics, all pills were dumped into an unlabeled jar; you only discovered you took the wrong pill when you got sick (runtime crash). Generics print a clear label on the bottle.",
    },
    visualIntuition: `Type Erasure:
Code you write (Compile Time):
List<String> list = new ArrayList<>();
list.add("hello");
String s = list.get(0);

Bytecode generated (Runtime):
List list = new ArrayList();
list.add((Object)"hello");
String s = (String)list.get(0); // Compiler automatically adds safe cast!`,
    syntax: {
      genericClass: "public class Box<T> {\n    private T item;\n    public void set(T item) { this.item = item; }\n    public T get() { return this.item; }\n}",
      pecs: "// PECS: Producer Extends, Consumer Super\nvoid readFrom(List<? extends Number> src); // Read-only\nvoid writeTo(List<? super Integer> dest);  // Write-friendly",
    },
    example: {
      title: "Generic Box class and PECS wildcard principle",
      language: "java",
      code: `import java.util.ArrayList;
import java.util.List;

public class GenericsDemo {
    // Producer Extends: Only reads numbers from the list
    public static double sumOfList(List<? extends Number> list) {
        double s = 0.0;
        for (Number n : list) {
            s += n.doubleValue();
        }
        return s;
    }

    public static void main(String[] args) {
        List<Integer> integers = List.of(1, 2, 3, 4);
        List<Double> doubles = List.of(1.5, 2.5, 3.5);

        System.out.println("Integer sum: " + sumOfList(integers)); // 10.0
        System.out.println("Double sum: " + sumOfList(doubles));   // 7.5
    }
}`,
      explanation:
        "`List<? extends Number>` can read Integers, Doubles, or Longs safely because all elements are guaranteed to be at least a `Number`.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Compile-Time Check",
        description: "The compiler rejects incompatible types (e.g. adding an Integer to a `List<String>`).",
      },
      {
        step: 2,
        title: "Type Erasure",
        description: "All generic type parameters (`T`) are erased and replaced with their bounds (or `Object`) in bytecode to maintain compatibility with older JVMs.",
      },
      {
        step: 3,
        title: "PECS Rule",
        description: "Producer Extends (use `? extends T` when you only READ data); Consumer Super (use `? super T` when you only WRITE data).",
      },
    ],
    commonMistakes: [
      {
        mistake: "List<Object> list = new ArrayList<String>();",
        why: "In Java, generics are INVARIANT. A List of Strings is NOT a List of Objects, because if it were, you could add an Integer to it and violate type safety!",
        correct: "List<?> list = new ArrayList<String>(); // or List<String> list = new ArrayList<>();",
      },
    ],
    tryItYourself: {
      prompt: "Can you create an instance of a generic array like: T[] arr = new T[10]?",
      hint: "Does the JVM know what T is at runtime after type erasure?",
      solutionSnippet: "No! Due to Type Erasure, the JVM does not know what type T represents at runtime, so 'new T[10]' causes a compile-time error.",
    },
    placementConnection:
      "Understanding Type Erasure and the PECS principle (Producer Extends, Consumer Super) distinguishes junior candidates from experienced engineers.",
    quickRevision: [
      "Generics provide compile-time type safety.",
      "Type Erasure strips generic types at compile time.",
      "Generics are invariant (`List<String>` does NOT inherit from `List<Object>`).",
      "PECS: Producer Extends, Consumer Super.",
    ],
  },
  {
    id: "java-lambdas-streams",
    slug: "lambdas-streams",
    title: "Lambdas, Functional Interfaces & Streams",
    track: "java",
    topicSlug: "advanced",
    topicTitle: "Advanced Concepts",
    order: 2,
    estimatedMinutes: 30,
    oneSentence:
      "Lambdas provide concise anonymous function syntax for Single Abstract Method (SAM) interfaces, and the Stream API provides declarative, lazy pipeline processing of collections.",
    whyDoWeNeedIt: {
      problem:
        "Writing a full 6-line anonymous inner class just to pass a comparator or filter an array adds noise and boilerplate to algorithmic code.",
      realWorldAnalogy:
        "An oil refinery pipeline. Raw crude oil (data) flows through filters (filter), crack units (map), and is bottled (collect) in a continuous flowing pipeline.",
    },
    visualIntuition: `Stream Processing Pipeline (Lazy Evaluation):
Source: [ 1, 2, 3, 4, 5, 6 ]
           |
           v .filter(n -> n % 2 == 0)   [ Only allows 2, 4, 6 ]
           |
           v .map(n -> n * n)           [ Squares them: 4, 16, 36 ]
           |
           v .collect(toList())         [ Terminal Operation: Triggers Execution! ]
Result: [ 4, 16, 36 ]`,
    syntax: {
      lambda: "(param1, param2) -> { return expression; }",
      stream: "list.stream().filter(predicate).map(function).collect(Collectors.toList());",
    },
    example: {
      title: "Filtering, transforming, and reducing data using Streams",
      language: "java",
      code: `import java.util.List;
import java.util.stream.Collectors;

public class StreamsDemo {
    public static void main(String[] args) {
        List<String> names = List.of("Ananya", "Rohan", "Amit", "Alok", "Vikram");

        // Find uppercase names starting with 'A' sorted alphabetically
        List<String> result = names.stream()
            .filter(name -> name.startsWith("A"))
            .map(String::toUpperCase)
            .sorted()
            .collect(Collectors.toList());

        System.out.println("Result: " + result); // [ALOK, AMIT, ANANYA]
    }
}`,
      explanation:
        "Streams are lazy: intermediate operations (`filter`, `map`, `sorted`) do not execute until a terminal operation (`collect`, `count`, `forEach`) is invoked.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Functional Interface (SAM)",
        description: "An interface with exactly ONE abstract method (e.g. `Predicate<T>`, `Function<T, R>`, `Consumer<T>`).",
      },
      {
        step: 2,
        title: "Lazy Evaluation",
        description: "Stream elements pass through the pipeline one item at a time (pipelining) rather than creating intermediate collections.",
      },
      {
        step: 3,
        title: "Single Use",
        description: "A Stream cannot be reused once a terminal operation has been executed.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Trying to reuse a stream: Stream<T> s = ...; s.count(); s.forEach(...);",
        why: "Streams are one-way pipelines. Reusing a consumed stream throws IllegalStateException.",
        correct: "Create a new stream from the source collection.",
      },
    ],
    tryItYourself: {
      prompt: "Sum all numbers in a list using Stream reduce.",
      hint: "list.stream().reduce(0, Integer::sum);",
      solutionSnippet: `int sum = numbers.stream().reduce(0, Integer::sum);`,
    },
    placementConnection:
      "Modern technical assessments and product company interviews expect candidates to be fluent with Lambdas and Stream pipelines.",
    quickRevision: [
      "Lambdas implement Functional Interfaces (Single Abstract Method).",
      "Intermediate operations (`filter`, `map`) are lazy.",
      "Terminal operations (`collect`, `reduce`, `count`) trigger execution.",
      "Streams cannot be reused after termination.",
    ],
  },
  {
    id: "java-memory-gc",
    slug: "memory-gc",
    title: "JVM Memory Layout & Garbage Collection",
    track: "java",
    topicSlug: "advanced",
    topicTitle: "Advanced Concepts",
    order: 3,
    estimatedMinutes: 30,
    oneSentence:
      "JVM memory is divided into Stack (per-thread frames), Heap (shared objects), and Metaspace (class metadata), with the Garbage Collector automatically recycling unreachable heap objects.",
    whyDoWeNeedIt: {
      problem:
        "In C and C++, developers must manually `free()` or `delete` memory. Forgetting leads to memory leaks; freeing twice crashes the system. Java's Garbage Collector automates lifecycle management.",
      realWorldAnalogy:
        "Municipal recycling trucks. Instead of every household driving to the city dump to burn their trash, trucks cruise the neighborhood automatically collecting discarded items (unreachable objects).",
    },
    visualIntuition: `JVM Runtime Data Areas:
+-------------------------------------------------------------+
|                          JVM Heap                           |
|  +---------------------------+  +------------------------+  |
|  |     Young Generation      |  |     Old Generation     |  |
|  | [ Eden ] [ S0 ] [ S1 ]    |  | (Surviving long-lived  |  |
|  | (New objects created here)|  |  objects like singletons)  |
|  +---------------------------+  +------------------------+  |
+-------------------------------------------------------------+
| Stack (Thread 1) | Stack (Thread 2) | Metaspace (Class Bytecode)|
+-------------------------------------------------------------+`,
    syntax: {
      gcRequest: "System.gc(); // Suggests (does not guarantee) JVM to run GC",
    },
    example: {
      title: "How objects become eligible for Garbage Collection",
      language: "java",
      code: `public class GCDemo {
    public static void main(String[] args) {
        // Object A created on heap
        String s1 = new String("Resource A");
        
        // s1 re-assigned; original "Resource A" has NO incoming references!
        s1 = new String("Resource B");
        
        // "Resource A" is now unreachable and eligible for Garbage Collection!
        
        String s2 = new String("Resource C");
        s2 = null; // "Resource C" is also eligible for GC!
    }
}`,
      explanation:
        "An object is eligible for garbage collection as soon as it cannot be reached from any GC Root (threads, static variables, active stack frames).",
    },
    howItWorks: [
      {
        step: 1,
        title: "Eden Space Allocation",
        description: "New objects are allocated in the Eden space of the Young Generation.",
      },
      {
        step: 2,
        title: "Minor GC",
        description: "When Eden fills, Minor GC sweeps Eden. Surviving objects move to Survivor spaces (S0/S1).",
      },
      {
        step: 3,
        title: "Promotion to Old Gen",
        description: "Objects that survive multiple GC cycles (default threshold: 15) are promoted to the Old Generation.",
      },
      {
        step: 4,
        title: "Major / Full GC",
        description: "When Old Gen fills, a Major/Full GC runs to reclaim long-lived unused memory.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Assuming System.gc() immediately runs garbage collection",
        why: "`System.gc()` is merely a hint to the JVM. The JVM chooses when to run GC based on memory pressure.",
        correct: "Do not rely on explicit System.gc() calls in application code.",
      },
    ],
    tryItYourself: {
      prompt: "What is a Memory Leak in Java if Garbage Collection is automatic?",
      hint: "What happens if you add objects to an unused static List that is never cleared?",
      solutionSnippet: "A Java memory leak occurs when unused objects remain reachable through active references (e.g. uncleared static collections, open streams, unremoved listeners) so the GC cannot recycle them.",
    },
    placementConnection:
      "'Explain JVM Memory Architecture' and 'How does Garbage Collection work?' are standard senior interview topics.",
    quickRevision: [
      "Stack stores primitive local variables and object reference addresses.",
      "Heap stores all objects and arrays.",
      "Metaspace stores class metadata and static variables.",
      "Objects are GC-eligible when unreachable from any GC Root.",
    ],
  },
];
