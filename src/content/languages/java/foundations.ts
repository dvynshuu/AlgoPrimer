import { Lesson } from "@/types/content";

export const javaFoundationsLessons: Lesson[] = [
  {
    id: "java-jvm-architecture",
    slug: "jvm-architecture",
    title: "JVM, JDK, JRE & Bytecode Architecture",
    track: "java",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 1,
    estimatedMinutes: 25,
    oneSentence:
      "Java achieves platform independence by compiling source code into platform-neutral bytecode (.class) executed by the Java Virtual Machine (JVM).",
    whyDoWeNeedIt: {
      problem:
        "C and C++ compile directly to CPU-specific machine code (x86_64, ARM). An executable compiled on Windows cannot run on Linux or macOS without recompilation. Java introduced an intermediate layer so code compiles once and runs anywhere.",
      realWorldAnalogy:
        "A universal translator at the United Nations. Instead of translating French directly into 100 languages, you translate French into Esperanto (Bytecode), and each local delegate translates Esperanto into their native dialect (JVM on CPU).",
    },
    visualIntuition: `Compilation & Execution Pipeline:
[ Source Code: App.java ]
         |
         v (javac compiler)
[ Bytecode: App.class ]  <-- Neutral, Portable!
         |
         +-------------------+-------------------+
         |                   |                   |
         v                   v                   v
[ Windows JVM ]       [ Linux JVM ]       [ macOS JVM ]
(converts to Win x86) (converts to Linux) (converts to ARM)
         |                   |                   |
         v                   v                   v
    [ Hardware ]        [ Hardware ]        [ Hardware ]`,
    syntax: {
      compileAndRun: "javac App.java    # Compiles source into App.class (Bytecode)\njava App          # Launches JVM, verifies and executes bytecode",
    },
    example: {
      title: "Inspecting compiled Java bytecode with javap",
      language: "java",
      code: `// Terminal command to disassemble bytecode:
// javap -c App.class

Compiled from "App.java"
public class App {
  public static void main(java.lang.String[]);
    Code:
       0: getstatic     #2 // Field java/lang/System.out:Ljava/io/PrintStream;
       3: ldc           #3 // String Hello Placement!
       5: invokevirtual #4 // Method java/io/PrintStream.println:(Ljava/lang/String;)V
       8: return
}`,
      explanation:
        "Bytecode consists of compact 1-byte opcodes (like `getstatic`, `ldc`, `invokevirtual`). The JVM uses Just-In-Time (JIT) compilation to compile frequently executed 'hot' bytecode directly into machine code at runtime.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Class Loading",
        description: "The JVM ClassLoader loads `.class` files into the Metaspace/Method Area and validates security constraints.",
      },
      {
        step: 2,
        title: "Bytecode Verification",
        description: "Ensures code does not violate memory access rules, overflow operand stacks, or perform illegal pointer arithmetic.",
      },
      {
        step: 3,
        title: "Execution (Interpreter + JIT)",
        description: "Standard code is interpreted; hot loops and methods are compiled by the JIT (C1/C2 compilers) into native CPU instructions.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Confusing JDK and JRE: installing JRE and expecting `javac` to work",
        why: "JRE (Java Runtime Environment) only contains the JVM and core libraries for RUNNING code. JDK (Java Development Kit) contains the compiler `javac` and development tools.",
        correct: "Install the JDK (OpenJDK 17 or 21) for software development.",
      },
      {
        mistake: "Running: java App.class",
        why: "`java` takes the class name, not the file name. The JVM automatically appends `.class`.",
        correct: "Run: java App",
      },
    ],
    tryItYourself: {
      prompt: "What are the three main components of the JVM execution engine?",
      hint: "Interpreter, JIT Compiler, and Garbage Collector.",
      solutionSnippet: `1. Bytecode Interpreter (line-by-line execution)
2. JIT Compiler (HotSpot C1/C2 native machine code generation)
3. Garbage Collector (automatic heap deallocation)`,
    },
    placementConnection:
      "Interviewers frequently ask 'Why is Java platform independent but JVM platform dependent?' and 'Explain the role of JIT compilation.'",
    quickRevision: [
      "JDK = JRE + Development Tools (javac, javap, jdb).",
      "JRE = JVM + Standard Core Libraries.",
      "Java source is compiled to `.class` bytecode; the JVM interprets and JIT-compiles bytecode to machine code.",
      "Java is platform independent; the JVM itself is platform dependent.",
    ],
  },
  {
    id: "java-program-structure",
    slug: "program-structure",
    title: "Program Structure & Fast Console I/O",
    track: "java",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 2,
    estimatedMinutes: 25,
    oneSentence:
      "A Java program is a collection of classes where execution starts at `public static void main(String[] args)`, and competitive assessments require fast buffered I/O to avoid Time Limit Exceeded.",
    whyDoWeNeedIt: {
      problem:
        "`Scanner.nextInt()` parses numbers using regular expressions, which is extremely slow when reading 10^5 or 10^6 numbers in Online Assessments. You need `BufferedReader` and `StringTokenizer` for 5x faster I/O.",
      realWorldAnalogy:
        "Drinking water with a single straw (`Scanner`) vs using a wide-mouth funnel (`BufferedReader` buffer) that fills your cup all at once.",
    },
    visualIntuition: `Main Method Signature Breakdown:
public:      Accessible by JVM from outside the class package
static:      Can be called by JVM without instantiating an object of the class
void:        Returns no exit code (System.exit() handles process termination)
main:        Recognized entry point identifier
String[] args: Command-line arguments passed to the program`,
    syntax: {
      standardMain: "public class Main {\n    public static void main(String[] args) {\n        // Code starts here\n    }\n}",
      fastIO: "BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\nStringTokenizer st = new StringTokenizer(br.readLine());",
    },
    example: {
      title: "Fast I/O template for Online Assessments and campus coding rounds",
      language: "java",
      code: `import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class FastIOExample {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        System.out.println("Enter number of elements followed by the numbers:");
        String line = br.readLine();
        if (line == null) return;
        
        StringTokenizer st = new StringTokenizer(line);
        int n = Integer.parseInt(st.nextToken());
        
        long sum = 0;
        for (int i = 0; i < n; i++) {
            sum += Integer.parseInt(st.nextToken());
        }
        
        System.out.println("Sum = " + sum);
    }
}`,
      explanation:
        "BufferedReader reads an 8KB chunk of characters into memory in one disk/terminal read, and StringTokenizer splits the tokens without regular expression parsing.",
    },
    howItWorks: [
      {
        step: 1,
        title: "File Name Matching",
        description: "A public class `Main` MUST reside in a file named `Main.java`.",
      },
      {
        step: 2,
        title: "Entry Point Invocation",
        description: "The JVM searches for the exact signature `public static void main(String[] args)` and pushes the first frame onto the thread call stack.",
      },
      {
        step: 3,
        title: "Process Exit",
        description: "When `main` returns or non-daemon threads finish, the JVM terminates cleanly.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using Scanner in problems with N = 2 * 10^5 inputs",
        why: "Scanner overhead can take 0.8s just reading input, leaving only 0.2s for your algorithm and causing TLE.",
        correct: "Use BufferedReader and StringTokenizer for competitive assessment inputs.",
      },
      {
        mistake: "Class name does not match file name: public class Solution in Main.java",
        why: "Java compiler enforces that the top-level public class name must match the `.java` filename.",
        correct: "Ensure class Solution is saved in Solution.java or remove the public modifier.",
      },
    ],
    tryItYourself: {
      prompt: "Why must the main method in Java be declared static?",
      hint: "Consider whether the JVM creates an instance of your class before calling main.",
      solutionSnippet: `The JVM calls main() before any objects of the class are constructed.
If main were non-static, the JVM would not know how to construct the class (e.g., if there are no default constructors).
Static allows direct invocation: ClassName.main(args).`,
    },
    placementConnection:
      "Virtually all competitive coding rounds on platforms like HackerEarth or Mercer Mettl provide input via standard input. Using Fast I/O prevents failing hidden test cases due to I/O latency.",
    quickRevision: [
      "The public class name must match the filename.",
      "`public static void main(String[] args)` is the JVM entry point.",
      "Prefer `BufferedReader` + `StringTokenizer` over `Scanner` for large inputs ($N \\ge 10^5$).",
      "Command-line arguments are accessed through `args[0]`, `args[1]`.",
    ],
  },
  {
    id: "java-variables",
    slug: "variables",
    title: "Variables and Data Types",
    track: "java",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 3,
    estimatedMinutes: 20,
    oneSentence:
      "A variable is a named memory container that reserves a specific number of bytes to hold a typed value during program execution.",
    whyDoWeNeedIt: {
      problem:
        "Computers only process raw electrical charges in binary (0s and 1s). Without variables, you would have to remember hexadecimal physical memory addresses like 0x7FFE4B29 just to keep track of a student's marks or an array counter.",
      realWorldAnalogy:
        "Think of a labeled storage locker. The label is the variable name (e.g., 'studentAge'), the locker size is the data type (e.g., 4 bytes for an integer), and what you put inside is the value (e.g., 19).",
    },
    visualIntuition: `Stack Memory Layout:
+-------------------+-------------------+
| Variable Name     | Stored Value      |
+-------------------+-------------------+
| int studentAge    | [ 19 ] (4 bytes)  |
| double cgpa       | [ 8.92 ] (8 bytes)|
| char grade        | [ 'A' ] (2 bytes) |
| boolean isPassed  | [ true ] (1 bit)  |
+-------------------+-------------------+`,
    syntax: {
      declaration: "dataType variableName = initialValue;",
    },
    example: {
      title: "Declaring and printing primitives in Java",
      language: "java",
      code: `public class Main {
    public static void main(String[] args) {
        int rollNumber = 101;
        double cgpa = 8.85;
        char section = 'A';
        boolean isEligibleForPlacement = true;

        System.out.println("Roll Number: " + rollNumber);
        System.out.println("CGPA: " + cgpa);
        System.out.println("Eligible: " + isEligibleForPlacement);
    }
}`,
      explanation:
        "Java is statically typed: you must declare the type before using the variable, and the compiler ensures you cannot store an incompatible value (like text inside an integer).",
    },
    howItWorks: [
      {
        step: 1,
        title: "Type Definition",
        description: "The compiler reads 'int rollNumber' and requests 4 contiguous bytes in JVM stack memory.",
      },
      {
        step: 2,
        title: "Assignment",
        description: "The binary representation of 101 (00000000 00000000 00000000 01100101) is written directly into that stack memory cell.",
      },
      {
        step: 3,
        title: "Access",
        description: "Whenever 'rollNumber' is accessed, the CPU reads the 4 bytes at that memory offset in O(1) time.",
      },
    ],
    commonMistakes: [
      {
        mistake: "int count; System.out.println(count);",
        why: "In Java, local variables inside methods are NOT given default values. Reading uninitialized local variables throws a compile-time error.",
        correct: "int count = 0; System.out.println(count);",
      },
      {
        mistake: "int num = 3.14;",
        why: "Java prevents lossy conversion. A 64-bit double cannot be automatically placed into a 32-bit integer.",
        correct: "double num = 3.14; // or explicit cast: int num = (int) 3.14;",
      },
    ],
    complexity: {
      time: "O(1) allocation and access",
      space: "Fixed stack allocation depending on primitive (1 to 8 bytes)",
      explanation: "Primitive variables are allocated directly on the thread stack and take constant time to read or update.",
    },
    tryItYourself: {
      prompt: "Declare two integer variables 'a' = 10 and 'b' = 20. Swap their values without using a third variable.",
      hint: "Use addition and subtraction: a = a + b, b = a - b, a = a - b.",
      solutionSnippet: `int a = 10, b = 20;
a = a + b; // a = 30
b = a - b; // b = 10
a = a - b; // a = 20`,
    },
    placementConnection:
      "Interviewers test whether you know primitive size limits (e.g., integer overflow beyond 2^31 - 1, requiring 'long' in DSA problems like factorial or large sum calculations).",
    quickRevision: [
      "Java has 8 primitives: byte, short, int, long, float, double, char, boolean.",
      "Local variables must be explicitly initialized before reading.",
      "Primitives live on the stack; objects live on the heap.",
      "Watch out for integer overflow: 2*10^9 fits in 'int', but 10^10 requires 'long'.",
    ],
  },
  {
    id: "java-operators",
    slug: "operators",
    title: "Operators & Bitwise Tricks",
    track: "java",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 4,
    estimatedMinutes: 25,
    oneSentence:
      "Operators perform computations on operands, and bitwise operators manipulate individual bits directly for ultra-fast arithmetic and parity checks.",
    whyDoWeNeedIt: {
      problem:
        "Standard operations like checking if a number is even/odd (`n % 2 == 0`) or multiplying by 2 (`n * 2`) take more CPU clock cycles than direct bit-level masks (`(n & 1) == 0` or `n << 1`).",
      realWorldAnalogy:
        "Flipping a light switch directly vs calling the electrical company to toggle the circuit breaker.",
    },
    visualIntuition: `Bitwise AND (&) with 1:
Number 12 in binary:  0 0 0 0 1 1 0 0
Mask (1) in binary:   0 0 0 0 0 0 0 1
                     -----------------
Result of (12 & 1):   0 0 0 0 0 0 0 0  -> 0 (EVEN!)

Number 13 in binary:  0 0 0 0 1 1 0 1
Mask (1) in binary:   0 0 0 0 0 0 0 1
                     -----------------
Result of (13 & 1):   0 0 0 0 0 0 0 1  -> 1 (ODD!)`,
    syntax: {
      bitwise: "int andResult = a & b;\nint orResult  = a | b;\nint xorResult = a ^ b;\nint leftShift = a << 1; // multiply by 2\nint rightShift= a >> 1; // divide by 2",
    },
    example: {
      title: "Checking power of 2 using bitwise AND",
      language: "java",
      code: `public class BitwiseExample {
    // A power of 2 has exactly one '1' bit (e.g. 8 = 1000)
    // (n - 1) flips all bits after that '1' (e.g. 7 = 0111)
    // n & (n - 1) clears the lowest set bit!
    public static boolean isPowerOfTwo(int n) {
        if (n <= 0) return false;
        return (n & (n - 1)) == 0;
    }

    public static void main(String[] args) {
        System.out.println("Is 16 power of two? " + isPowerOfTwo(16)); // true
        System.out.println("Is 18 power of two? " + isPowerOfTwo(18)); // false
    }
}`,
      explanation:
        "`(n & (n - 1)) == 0` runs in 1 single CPU instruction ($O(1)$) compared to a loop dividing by 2 ($O(\\log N)$).",
    },
    howItWorks: [
      {
        step: 1,
        title: "Arithmetic Precedence",
        description: "Multiplication and division (`*`, `/`, `%`) execute before addition and subtraction (`+`, `-`).",
      },
      {
        step: 2,
        title: "Bitwise Precedence Trap",
        description: "Bitwise operators (`&`, `|`, `^`) have LOWER precedence than comparison operators (`==`). Always use parentheses: `(n & 1) == 0`!",
      },
      {
        step: 3,
        title: "Sign Bit Handling",
        description: "`>>` is signed shift (preserves sign bit); `>>>` is unsigned shift (fills zero at left).",
      },
    ],
    commonMistakes: [
      {
        mistake: "if (n & 1 == 0) { ... }",
        why: "'==' has higher precedence than '&'. This evaluates as 'n & (1 == 0)', causing a compile error because boolean cannot be bitwise ANDed with integer.",
        correct: "if ((n & 1) == 0) { ... }",
      },
      {
        mistake: "Confusing logical '&' with short-circuit '&&'",
        why: "'&' evaluates both sides unconditionally. '&&' skips the right side if the left is false.",
        correct: "Always use '&&' and '||' for boolean conditions.",
      },
    ],
    tryItYourself: {
      prompt: "Find the single non-repeating element in an array where every other element appears twice, using XOR (^).",
      hint: "Remember: x ^ x = 0 and x ^ 0 = x. XOR all elements together.",
      solutionSnippet: `int unique = 0;
for (int num : nums) {
    unique ^= num;
}
return unique;`,
    },
    placementConnection:
      "Bit manipulation is tested in top-tier placement rounds (Single Number, Number of 1 Bits, Subsets Generation).",
    quickRevision: [
      "`n & 1` checks odd/even in $O(1)$.",
      "`n & (n - 1)` removes the lowest set bit.",
      "`n << k` multiplies by $2^k$; `n >> k` divides by $2^k$.",
      "`x ^ x = 0` and `x ^ 0 = x` (XOR properties).",
    ],
  },
  {
    id: "java-conditions",
    slug: "conditions",
    title: "Conditionals & Decision Making",
    track: "java",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 5,
    estimatedMinutes: 25,
    oneSentence:
      "Conditionals allow a program to branch its execution path depending on whether a boolean expression evaluates to true or false.",
    whyDoWeNeedIt: {
      problem:
        "Real-world code is rarely linear. Without decision-making, code would execute every statement regardless of user input, leading to crashes like dividing by zero or granting unauthorized access.",
      realWorldAnalogy:
        "A train track switch. If the signal is green, the train continues on Track A; if red, it is diverted to Track B.",
    },
    visualIntuition: `Flow of if-else:
         [ Evaluate Condition ]
                /      \\
         true  /        \\  false
              v          v
       [ Execute Block ] [ Execute Else Block ]
              \\          /
               v        v
          [ Continue Execution ]`,
    syntax: {
      ifElse: `if (condition) {
    // executes if condition is true
} else if (otherCondition) {
    // executes if otherCondition is true
} else {
    // fallback
}`,
    },
    example: {
      title: "Placement eligibility validator",
      language: "java",
      code: `public class Main {
    public static void main(String[] args) {
        double cgpa = 7.8;
        int activeBacklogs = 0;

        if (cgpa >= 7.5 && activeBacklogs == 0) {
            System.out.println("Eligible for Tier 1 Companies");
        } else if (cgpa >= 6.0 && activeBacklogs <= 1) {
            System.out.println("Eligible for Mass Recruiters");
        } else {
            System.out.println("Focus on academics before applying");
        }
    }
}`,
      explanation:
        "Logical operators like && (AND) short-circuit: if 'cgpa >= 7.5' is false, Java skips evaluating 'activeBacklogs == 0' completely, saving CPU cycles.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Expression Evaluation",
        description: "The expression inside the parenthesis is evaluated down to a boolean true or false.",
      },
      {
        step: 2,
        title: "Conditional Jump",
        description: "The JVM issues a conditional branch instruction (ifeq / ifne in bytecode) to jump past the block if false.",
      },
      {
        step: 3,
        title: "Fall-through Avoidance",
        description: "Once any condition in an if/else-if chain succeeds, all subsequent else branches are bypassed.",
      },
    ],
    commonMistakes: [
      {
        mistake: "String s1 = \"test\"; String s2 = new String(\"test\"); if (s1 == s2) { ... }",
        why: "In Java, '==' compares memory addresses (object references), NOT contents. Since s1 and s2 point to different heap objects, s1 == s2 evaluates to false.",
        correct: "if (s1.equals(s2)) { ... }",
      },
      {
        mistake: "if (x = 5) { ... }",
        why: "'=' is an assignment, not a comparison. Unlike C/C++, Java compiler blocks this because an integer cannot be coerced to boolean.",
        correct: "if (x == 5) { ... }",
      },
    ],
    tryItYourself: {
      prompt: "Write a program that checks whether a given year is a leap year (divisible by 400, or divisible by 4 and not 100).",
      hint: "Use modulo operator % and boolean precedence: (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0).",
      solutionSnippet: `boolean isLeap = (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);`,
    },
    placementConnection:
      "Interviewers check if you properly order boundary checks to prevent NullPointerExceptions and ArrayIndexOutOfBoundsExceptions using short-circuit logic: 'if (arr != null && arr.length > 0)'.",
    quickRevision: [
      "Use '==' for primitives; always use '.equals()' for Objects/Strings.",
      "&& and || are short-circuiting: second operand isn't evaluated if first determines the result.",
      "Switch statements in modern Java support Strings, Enums, and pattern matching.",
    ],
  },
  {
    id: "java-loops",
    slug: "loops",
    title: "Loops and Iteration",
    track: "java",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 6,
    estimatedMinutes: 30,
    oneSentence:
      "Loops repeat a block of code systematically until a termination condition is reached, enabling algorithmic processing of large datasets.",
    whyDoWeNeedIt: {
      problem:
        "If you had to print 10,000 numbers without loops, your code would require 10,000 manual print statements, making maintenance impossible and dynamic inputs unusable.",
      realWorldAnalogy:
        "A runner doing laps around a 400m track. They check after each lap: 'Have I finished 10 laps?' If not, run another lap; otherwise, stop.",
    },
    visualIntuition: `For Loop Lifecycle:
      [ 1. Initialization: int i = 0 ]
                     |
                     v
             +-> [ 2. Check Condition: i < n ] --- false ---> [ Exit Loop ]
             |               | true
             |               v
             |       [ 3. Loop Body ]
             |               |
             +--- [ 4. Increment: i++ ]`,
    syntax: {
      forLoop: "for (int i = 0; i < n; i++) { /* statements */ }",
      whileLoop: "while (condition) { /* statements */ }",
      forEach: "for (int item : array) { /* statements */ }",
    },
    example: {
      title: "Sum of first N natural numbers",
      language: "java",
      code: `public class Main {
    public static void main(String[] args) {
        int n = 100;
        long sum = 0;

        for (int i = 1; i <= n; i++) {
            sum += i;
        }

        System.out.println("Sum of 1 to " + n + " is: " + sum);
    }
}`,
      explanation:
        "The loop counter 'i' starts at 1, increments by 1 after each cycle, and terminates as soon as 'i <= n' evaluates to false.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Initialization",
        description: "Executes once before the first iteration.",
      },
      {
        step: 2,
        title: "Condition Check",
        description: "Evaluated before every iteration. If true, body executes; if false, loop terminates.",
      },
      {
        step: 3,
        title: "Body Execution",
        description: "The enclosed statements run.",
      },
      {
        step: 4,
        title: "Update",
        description: "Executes after each iteration, updating the counter variable before re-checking condition.",
      },
    ],
    commonMistakes: [
      {
        mistake: "for (int i = 0; i <= arr.length; i++) { ... }",
        why: "An array of size N has indices from 0 to N-1. Accessing index N throws ArrayIndexOutOfBoundsException.",
        correct: "for (int i = 0; i < arr.length; i++) { ... }",
      },
      {
        mistake: "while (i < 10); { i++; }",
        why: "Placing a semicolon immediately after the while condition creates an empty infinite loop.",
        correct: "while (i < 10) { i++; }",
      },
    ],
    complexity: {
      time: "O(n) for a loop running n iterations",
      space: "O(1) auxiliary space",
      explanation: "Each iteration takes constant work, giving linear total time.",
    },
    tryItYourself: {
      prompt: "Write a loop that prints the reverse of a number (e.g. 1234 -> 4321) using % 10 and / 10.",
      hint: "Extract last digit using num % 10, then discard it using num = num / 10 until num becomes 0.",
      solutionSnippet: `int num = 1234, rev = 0;
while (num > 0) {
    rev = rev * 10 + (num % 10);
    num /= 10;
}`,
    },
    placementConnection:
      "Every single algorithmic pattern (sliding window, two pointers, binary search) relies on crystal-clear loop invariants and termination conditions. Getting boundary conditions right is the #1 interview skill.",
    quickRevision: [
      "Use 'for' when the number of iterations is known in advance.",
      "Use 'while' when the termination depends on an external condition (e.g., two pointers meeting).",
      "Watch out for Off-By-One errors at loop boundaries (< vs <=).",
      "Understand loop invariant: the condition that remains true before and after every iteration.",
    ],
  },
  {
    id: "java-methods",
    slug: "methods",
    title: "Methods, Call Stack & Pass-By-Value",
    track: "java",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 7,
    estimatedMinutes: 30,
    oneSentence:
      "Methods encapsulate modular reusable logic, push frames onto the thread call stack, and in Java are ALWAYS strictly pass-by-value.",
    whyDoWeNeedIt: {
      problem:
        "Duplicating algorithmic logic in 10 different places creates massive maintenance nightmares. Methods isolate logic, accept arguments, and return computed results.",
      realWorldAnalogy:
        "A microwave oven. You provide raw food (arguments) and press Start (invoke method). Inside, it heats the food and dings (returns result) without you needing to manually wire heating coils.",
    },
    visualIntuition: `Call Stack Execution Frame:
| [ calculateSum(a, b) Frame ] | <- Local vars: a=10, b=20, result=30
| [ main(args) Frame ]         | <- Local vars: args, x=10, y=20
+------------------------------+
Bottom of Thread Stack (LIFO: Last In, First Out)`,
    syntax: {
      definition: "public static returnType methodName(paramType param1, paramType param2) {\n    // body\n    return value;\n}",
    },
    example: {
      title: "Demonstrating Java's Pass-By-Value with Objects and Primitives",
      language: "java",
      code: `public class PassByValueDemo {
    public static void modifyPrimitive(int x) {
        x = 999; // Only modifies local copy on the stack
    }

    public static void modifyArray(int[] arr) {
        arr[0] = 999; // Mutates heap array via copy of memory reference!
    }

    public static void reassignArray(int[] arr) {
        arr = new int[]{100, 200}; // Reassigns local reference, original untouched!
    }

    public static void main(String[] args) {
        int val = 10;
        modifyPrimitive(val);
        System.out.println("val after modifyPrimitive: " + val); // 10!

        int[] nums = {1, 2, 3};
        modifyArray(nums);
        System.out.println("nums[0] after modifyArray: " + nums[0]); // 999!

        reassignArray(nums);
        System.out.println("nums[0] after reassignArray: " + nums[0]); // Still 999!
    }
}`,
      explanation:
        "Java NEVER passes objects by reference. It passes the value of the reference (the 64-bit memory address) by value. Modifying internal object state affects the heap object, but reassigning the parameter pointer does not affect the caller's variable.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Stack Frame Push",
        description: "Invoking a method creates an activation record on the call stack containing parameters and local variables.",
      },
      {
        step: 2,
        title: "Execution & Return",
        description: "Statements run. Upon encountering `return`, the result is placed in an evaluation register.",
      },
      {
        step: 3,
        title: "Stack Frame Pop",
        description: "The stack pointer restores, immediately reclaiming stack frame memory.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Believing Java has pass-by-reference like C++ (&)",
        why: "Java only has pass-by-value. You cannot swap two integers using a helper method `swap(a, b)`.",
        correct: "Return an array, a custom wrapper object, or swap in-place inside the caller.",
      },
      {
        mistake: "Calling a non-static method from static main without creating an instance",
        why: "Non-static methods require an active `this` object context.",
        correct: "Declare method as `static` or construct the class: `new Main().methodName()`.",
      },
    ],
    complexity: {
      time: "O(1) invocation overhead",
      space: "O(1) per call stack frame; O(depth) for recursive calls",
      explanation: "Exceeding call stack capacity (~10,000 frames) triggers StackOverflowError.",
    },
    tryItYourself: {
      prompt: "Can you swap two elements in an array using a helper method `swap(int[] arr, int i, int j)`?",
      hint: "Yes, because the method receives a copy of the array's memory address, enabling internal mutation.",
      solutionSnippet: `public static void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}`,
    },
    placementConnection:
      "'Is Java pass-by-value or pass-by-reference?' is asked in almost every Java technical interview. Answering 'Java is strictly pass-by-value' and explaining reference value copying marks high technical proficiency.",
    quickRevision: [
      "Java is ALWAYS strictly pass-by-value.",
      "For primitives: the variable's value is copied.",
      "For objects: the memory reference address is copied.",
      "Methods isolate scope and enforce modularity.",
    ],
  },
];
