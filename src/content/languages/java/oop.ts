import { Lesson } from "@/types/content";

export const javaOopLessons: Lesson[] = [
  {
    id: "java-classes-objects",
    slug: "classes-objects",
    title: "Classes, Objects & Heap Instances",
    track: "java",
    topicSlug: "oop",
    topicTitle: "Object-Oriented Programming",
    order: 1,
    estimatedMinutes: 25,
    oneSentence:
      "A class is a user-defined blueprint that defines state (fields) and behavior (methods), while an object is a concrete instance allocated in JVM heap memory.",
    whyDoWeNeedIt: {
      problem:
        "Procedural code separates functions from data, leading to global state bugs. OOP bundles state and the methods that operate on that state together into a cohesive entity.",
      realWorldAnalogy:
        "An architectural blueprint of a house vs the physical house built on a plot of land. The blueprint (Class) occupies almost no space; the physical house (Object) occupies actual physical land (Heap RAM).",
    },
    visualIntuition: `Stack Pointer to Heap Object:
Stack Frame (Local Scope)             JVM Heap Memory
+-----------------------+             +----------------------------------+
| Student s1 (0x4A20)   | ----------> | Object Header (12 bytes)         |
+-----------------------+             | int rollNo = 101                 |
| Student s2 (0x8B10)   | --+         | String name -> "Aditi"           |
+-----------------------+   |         +----------------------------------+
                            |         +----------------------------------+
                            +-------> | Object Header (12 bytes)         |
                                      | int rollNo = 102                 |
                                      | String name -> "Rahul"           |
                                      +----------------------------------+`,
    syntax: {
      definition: "public class ClassName {\n    // Fields (state)\n    // Methods (behavior)\n}\n\nClassName obj = new ClassName();",
    },
    example: {
      title: "Defining a Class and instantiating multiple objects",
      language: "java",
      code: `public class Student {
    // Fields
    int id;
    String name;
    double marks;

    // Method
    public void displayProfile() {
        System.out.println("ID: " + id + ", Name: " + name + ", Marks: " + marks);
    }

    public static void main(String[] args) {
        // Allocating instances on the heap
        Student s1 = new Student();
        s1.id = 1;
        s1.name = "Ananya";
        s1.marks = 94.5;

        Student s2 = new Student();
        s2.id = 2;
        s2.name = "Vikram";
        s2.marks = 88.0;

        s1.displayProfile();
        s2.displayProfile();
    }
}`,
      explanation:
        "`new Student()` allocates memory on the heap and returns its reference address, which is stored in variable `s1` on the stack.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Memory Allocation",
        description: "`new` operator reserves space on the heap for the object header, primitive fields, and reference pointers.",
      },
      {
        step: 2,
        title: "Field Zero-Initialization",
        description: "Heap memory fields are zero-initialized by default (0 for int, null for references, false for boolean).",
      },
      {
        step: 3,
        title: "Constructor Invocation",
        description: "The class constructor runs to initialize field values.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Student s; s.displayProfile();",
        why: "Variable 's' is declared but never initialized with 'new Student()'. Calling methods on an uninitialized or null reference causes NullPointerException.",
        correct: "Student s = new Student();",
      },
    ],
    tryItYourself: {
      prompt: "What is stored in the variable 's1' on the stack: the object itself, or its memory reference?",
      hint: "Objects are always allocated on the heap.",
      solutionSnippet: "Only the 64-bit memory reference address pointing to the heap object is stored on the stack.",
    },
    placementConnection:
      "Interviewers test whether you know where objects live (Heap) vs where reference variables live (Stack).",
    quickRevision: [
      "Class = Blueprint; Object = Heap instance.",
      "Fields in heap objects receive default zero-values.",
      "Multiple reference variables can point to the same heap object.",
      "`new` allocates memory and calls the constructor.",
    ],
  },
  {
    id: "java-constructors",
    slug: "constructors",
    title: "Constructors & the 'this' Keyword",
    track: "java",
    topicSlug: "oop",
    topicTitle: "Object-Oriented Programming",
    order: 2,
    estimatedMinutes: 25,
    oneSentence:
      "A constructor is a special member method invoked automatically during object instantiation to establish valid initial state, and 'this' refers to the current object instance.",
    whyDoWeNeedIt: {
      problem:
        "Instantiating an object with 10 fields and manually assigning each one `obj.x = 1; obj.y = 2;` risks leaving the object in an invalid, half-initialized state.",
      realWorldAnalogy:
        "A factory assembly line. A car does not leave the factory without wheels and an engine installed; the constructor guarantees it is fully assembled before delivery.",
    },
    visualIntuition: `Constructor Chaining with this():
new Employee("Aman")
        |
        v
Employee(String name) -----> invokes this(name, 0.0, "Engineering")
                                    |
                                    v
                       Employee(name, salary, department)
                       (Initializes all fields in ONE central location!)`,
    syntax: {
      constructor: "public ClassName(parameters) {\n    this.field = param;\n}",
      chaining: "public ClassName() {\n    this(defaultValue); // Must be FIRST line!\n}",
    },
    example: {
      title: "Constructor overloading and chaining with this()",
      language: "java",
      code: `public class Employee {
    String name;
    double salary;

    // Parameterized constructor
    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    // Overloaded constructor chaining to the primary constructor
    public Employee(String name) {
        this(name, 50000.0); // Chains to Employee(String, double)
    }

    public void display() {
        System.out.println(this.name + " earns " + this.salary);
    }

    public static void main(String[] args) {
        Employee e1 = new Employee("Pooja", 85000.0);
        Employee e2 = new Employee("Karan"); // Uses default salary

        e1.display();
        e2.display();
    }
}`,
      explanation:
        "`this.name` disambiguates the instance field `name` from the constructor parameter `name`. `this(...)` allows one constructor to invoke another.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Default Constructor",
        description: "If you define NO constructors, the compiler supplies an invisible default no-arg constructor.",
      },
      {
        step: 2,
        title: "Disappearing Default",
        description: "As soon as you define ANY custom constructor, the compiler removes the free default constructor.",
      },
      {
        step: 3,
        title: "First Line Rule",
        description: "Calls to `this(...)` or `super(...)` MUST be the very first statement inside a constructor body.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Defining a parameterized constructor and then trying to call new Student() without a no-arg constructor",
        why: "Compiler default constructor is removed once you write any custom constructor.",
        correct: "Explicitly declare a no-arg constructor: public Student() {}",
      },
    ],
    tryItYourself: {
      prompt: "Can a constructor have a return type like 'void'?",
      hint: "What happens if you write: public void Student()?",
      solutionSnippet: "If you add a return type, Java treats it as a regular method, NOT a constructor!",
    },
    placementConnection:
      "Interviewers check if you know constructor chaining (`this()`, `super()`) and why constructors do not have return types.",
    quickRevision: [
      "Constructors share the exact name of the class and have NO return type.",
      "`this` refers to the current object instance.",
      "`this()` calls another constructor within the same class (must be first line).",
      "Compiler only supplies a default constructor if NO other constructors are written.",
    ],
  },
  {
    id: "java-static",
    slug: "static",
    title: "The 'static' Keyword: Memory & Scope",
    track: "java",
    topicSlug: "oop",
    topicTitle: "Object-Oriented Programming",
    order: 3,
    estimatedMinutes: 25,
    oneSentence:
      "The 'static' modifier binds a member to the class itself rather than individual heap instances, sharing a single copy across all objects in Metaspace.",
    whyDoWeNeedIt: {
      problem:
        "If 10,000 Student objects all belong to 'IIT Delhi', storing that same string inside every single object wastes 10,000 slots of memory. A `static` field shares one single variable.",
      realWorldAnalogy:
        "A classroom whiteboard. Individual students have their own notebooks (instance fields), but the whiteboard on the wall (static field) is shared by every student in the room.",
    },
    visualIntuition: `Metaspace (Shared Class Data) vs Heap Instances:
Metaspace (Class Area):
+------------------------------------+
| Student.class                      |
| static String college = "IIT Delhi"| <-- Single shared copy in memory!
| static int studentCounter = 2      |
+------------------------------------+

Heap Memory:
+------------------------+  +------------------------+
| Student Instance 1     |  | Student Instance 2     |
| id = 101, name = "A"   |  | id = 102, name = "B"   |
+------------------------+  +------------------------+`,
    syntax: {
      variables: "public static int counter = 0;\npublic static void utilityMethod() { ... }",
      block: "static {\n    // Executes once when class is loaded by ClassLoader\n}",
    },
    example: {
      title: "Shared instance counter and static utility methods",
      language: "java",
      code: `public class CounterDemo {
    // Shared class variable
    private static int totalStudents = 0;
    private String studentName;

    public CounterDemo(String name) {
        this.studentName = name;
        totalStudents++; // Increments the shared class counter
    }

    public static int getTotalStudents() {
        // Cannot access this.studentName here because no 'this' exists!
        return totalStudents;
    }

    public static void main(String[] args) {
        new CounterDemo("Aditi");
        new CounterDemo("Karan");
        new CounterDemo("Rohan");

        System.out.println("Total Registered: " + CounterDemo.getTotalStudents()); // 3
    }
}`,
      explanation:
        "Static methods can be invoked using the class name (`CounterDemo.getTotalStudents()`) without instantiating any object.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Class Loading Initialization",
        description: "Static fields are allocated and static blocks execute ONCE when the class is loaded into the JVM.",
      },
      {
        step: 2,
        title: "Shared Access",
        description: "All instances share the exact same memory address for static variables.",
      },
      {
        step: 3,
        title: "Non-Static Restriction",
        description: "Static methods cannot access instance variables or `this` because they execute without an object context.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Calling non-static method or field directly from a static method",
        why: "Non-static variables belong to an instance. A static method does not know WHICH instance you want to inspect.",
        correct: "Pass the object as a parameter or construct it: new MyClass().instanceMethod().",
      },
      {
        mistake: "Overusing static variables for state in concurrent applications",
        why: "Multiple threads mutating a shared static variable without synchronization cause race conditions.",
        correct: "Use synchronized blocks or AtomicInteger.",
      },
    ],
    tryItYourself: {
      prompt: "Can a static method be overridden in a subclass?",
      hint: "Can runtime polymorphism apply to methods bound at compile time?",
      solutionSnippet: "No! Static methods cannot be overridden. If a subclass declares a static method with the same signature, it is called 'Method Hiding', not overriding.",
    },
    placementConnection:
      "'Can we override static methods?' and 'Can static methods access non-static variables?' are top-3 standard Java interview questions.",
    quickRevision: [
      "`static` belongs to the class, not instances.",
      "Static variables are allocated once when class is loaded.",
      "Static methods cannot use `this` or access non-static members directly.",
      "Static methods undergo compile-time method hiding, NOT runtime overriding.",
    ],
  },
  {
    id: "java-encapsulation",
    slug: "encapsulation",
    title: "Encapsulation & Data Invariants",
    track: "java",
    topicSlug: "oop",
    topicTitle: "Object-Oriented Programming",
    order: 4,
    estimatedMinutes: 25,
    oneSentence:
      "Encapsulation bundles data with the methods that operate on it and restricts direct external access to enforce business invariants.",
    whyDoWeNeedIt: {
      problem:
        "If an external developer can directly write `bankAccount.balance = -10000;`, your system's integrity is destroyed. Encapsulation ensures mutations happen only through validated gateways.",
      realWorldAnalogy:
        "A capsule pill. The chemical medicine is sealed inside the gelatin casing so you swallow it as an intact unit without touching the raw chemicals.",
    },
    visualIntuition: `Encapsulation Firewall:
External World -------> [ Public Getters / Setters ] (Validates Rules)
                               |
                               v
                       [ Private Fields ] (Protected from direct tampering!)`,
    syntax: {
      pattern: "private int age;\n\npublic int getAge() { return this.age; }\npublic void setAge(int age) {\n    if (age > 0) this.age = age;\n}",
    },
    example: {
      title: "Enforcing age and salary constraints via encapsulation",
      language: "java",
      code: `public class Candidate {
    private String name;
    private int age;

    public Candidate(String name, int age) {
        this.name = name;
        setAge(age); // Enforces validation during construction!
    }

    public int getAge() {
        return this.age;
    }

    public void setAge(int age) {
        if (age >= 18 && age <= 65) {
            this.age = age;
        } else {
            throw new IllegalArgumentException("Age must be between 18 and 65 for placement eligibility.");
        }
    }
}`,
      explanation:
        "No outside code can set an invalid age like -5 or 250 because the private field is shielded behind `setAge()`.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Data Hiding",
        description: "Fields are marked `private`.",
      },
      {
        step: 2,
        title: "Controlled Access",
        description: "Public accessor (`get`) and mutator (`set`) methods validate inputs before modifying state.",
      },
      {
        step: 3,
        title: "Maintainability",
        description: "Internal implementation can change (e.g. storing birthdate instead of age) without breaking external callers.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Returning mutable references from getters: public int[] getMarks() { return this.marks; }",
        why: "The caller receives the direct heap address and can mutate the array elements from outside, breaking encapsulation!",
        correct: "Return a defensive copy: return this.marks.clone();",
      },
    ],
    tryItYourself: {
      prompt: "How can you create a completely immutable class in Java?",
      hint: "Make class final, fields private and final, no setters, and return defensive copies of mutable objects.",
      solutionSnippet: `1. Declare class as 'final' so it cannot be extended.
2. Make all fields 'private' and 'final'.
3. Do not provide any setter methods.
4. Perform defensive copying for mutable objects (like Date or arrays).`,
    },
    placementConnection:
      "Interviewers often ask how to create a custom immutable class in Java and identify encapsulation leaks with mutable objects.",
    quickRevision: [
      "Encapsulation = Data Hiding + Controlled Access.",
      "Mark fields `private`; provide `public` getters/setters.",
      "Always perform defensive copying when returning mutable objects (arrays, Date).",
      "Increases security, maintainability, and code flexibility.",
    ],
  },
  {
    id: "java-inheritance",
    slug: "inheritance",
    title: "Inheritance & the 'super' Keyword",
    track: "java",
    topicSlug: "oop",
    topicTitle: "Object-Oriented Programming",
    order: 5,
    estimatedMinutes: 30,
    oneSentence:
      "Inheritance allows a subclass to acquire fields and methods of a superclass using 'extends', fostering code reuse and forming an IS-A hierarchy.",
    whyDoWeNeedIt: {
      problem:
        "Creating `Manager`, `Engineer`, and `Director` classes with duplicate code for `name`, `id`, `login()`, and `logout()` wastes time and creates maintenance headaches. A shared `Employee` superclass eliminates duplication.",
      realWorldAnalogy:
        "Genetic inheritance. A child inherits biological traits (eyes, blood type) from parents, but also has unique personal traits.",
    },
    visualIntuition: `Inheritance Hierarchy (IS-A Relationship):
               [ Superclass: Vehicle ]
               (brand, speed, startEngine())
                     /        \\
                    /          \\
[ Subclass: Car ]             [ Subclass: Truck ]
(doorsCount, openTrunk())     (payloadCapacity, attachTrailer())`,
    syntax: {
      declaration: "public class SubClass extends SuperClass {\n    public SubClass() {\n        super(); // Calls superclass constructor\n    }\n}",
    },
    example: {
      title: "Extending a base class and invoking super()",
      language: "java",
      code: `class Vehicle {
    protected String brand;

    public Vehicle(String brand) {
        this.brand = brand;
    }

    public void start() {
        System.out.println(brand + " vehicle engine started.");
    }
}

class Car extends Vehicle {
    private int numDoors;

    public Car(String brand, int numDoors) {
        super(brand); // Invokes superclass constructor Vehicle(brand)
        this.numDoors = numDoors;
    }

    @Override
    public void start() {
        super.start(); // Calls base behavior
        System.out.println("Car ready with " + numDoors + " doors.");
    }

    public static void main(String[] args) {
        Car myCar = new Car("Honda", 4);
        myCar.start();
    }
}`,
      explanation:
        "`Car extends Vehicle` means a Car IS-A Vehicle. It reuses `brand` and can extend or override behavior.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Subclass Constructor Chain",
        description: "The first line of a subclass constructor automatically invokes `super()` if not explicitly specified.",
      },
      {
        step: 2,
        title: "Inherited Members",
        description: "Public and protected members are inherited. Private members are NOT directly accessible by subclass.",
      },
      {
        step: 3,
        title: "Single Inheritance",
        description: "Java does NOT support multiple class inheritance (a class cannot `extends A, B`) to prevent the Diamond Problem.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Superclass has no default constructor, and subclass does not call super(param)",
        why: "Compiler tries to insert an implicit `super()` with no args. If the superclass only has parameterized constructors, compilation fails.",
        correct: "Explicitly invoke `super(args)` on the first line of subclass constructor.",
      },
    ],
    tryItYourself: {
      prompt: "Why does Java disallow multiple inheritance for classes?",
      hint: "What happens if both parent classes define a method `void foo()`?",
      solutionSnippet: "The Diamond Problem: If Class D extends Class B and Class C (which both inherit from A and override foo()), Class D would not know which foo() implementation to execute.",
    },
    placementConnection:
      "Understanding the Diamond Problem and constructor execution order in inheritance is heavily tested.",
    quickRevision: [
      "Use `extends` for class inheritance; Java supports single class inheritance.",
      "`super()` invokes the parent constructor (must be first line).",
      "`super.methodName()` calls parent implementation.",
      "Private members are not directly accessible in subclasses.",
    ],
  },
  {
    id: "java-polymorphism",
    slug: "polymorphism",
    title: "Polymorphism: Overloading vs Overriding",
    track: "java",
    topicSlug: "oop",
    topicTitle: "Object-Oriented Programming",
    order: 6,
    estimatedMinutes: 30,
    oneSentence:
      "Polymorphism allows one interface or method call to behave differently at runtime depending on the underlying object type in the heap.",
    whyDoWeNeedIt: {
      problem:
        "If you have a collection of different shapes (`Circle`, `Square`, `Triangle`), you don't want giant switch statements: `if (s is Circle) drawCircle(); else if ...`. You just want to call `shape.draw()` and let each shape draw itself.",
      realWorldAnalogy:
        "The Power button on your remote. Pressing Power on a TV turns on the screen; pressing Power on an air conditioner turns on cooling. The action is the same ('Power'), but the response differs by device.",
    },
    visualIntuition: `Dynamic Method Dispatch (Runtime Polymorphism):
Reference Type: Shape s ----------> Heap Object: new Circle()
                                         |
s.draw() executes Circle's draw()!       v
                                    Circle vtable resolves draw() at runtime`,
    syntax: {
      overriding: "@Override\npublic void draw() { ... }",
      polymorphicRef: "SuperClass ref = new SubClass();",
    },
    example: {
      title: "Dynamic Method Dispatch in action",
      language: "java",
      code: `class Shape {
    public void draw() {
        System.out.println("Drawing a generic shape");
    }
}

class Circle extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a Circle with radius r");
    }
}

class Square extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a Square with side s");
    }
}

public class PolyDemo {
    public static void main(String[] args) {
        // Polymorphic reference: Parent type points to child heap instances
        Shape[] shapes = {new Circle(), new Square(), new Shape()};

        for (Shape s : shapes) {
            s.draw(); // Resolved dynamically at runtime!
        }
    }
}`,
      explanation:
        "Even though `s` is declared as `Shape`, the JVM inspects the heap object's virtual method table at runtime and invokes the overridden child method.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Compile-Time Polymorphism (Overloading)",
        description: "Same method name, different parameter lists in the same class. Resolved by the compiler.",
      },
      {
        step: 2,
        title: "Runtime Polymorphism (Overriding)",
        description: "Same method signature in child class. Resolved at runtime by the JVM using Dynamic Method Dispatch.",
      },
      {
        step: 3,
        title: "Reference vs Object Rule",
        description: "Reference type determines WHICH methods can be called (compile-time); Object type determines WHICH version executes (runtime).",
      },
    ],
    commonMistakes: [
      {
        mistake: "Overriding with weaker access privileges: parent has public void draw(), child has protected void draw()",
        why: "Java disallows reducing visibility in overridden methods (breaks Liskov Substitution Principle).",
        correct: "Maintain the same or broader visibility (e.g. public).",
      },
      {
        mistake: "Assuming fields are polymorphic: shape.area",
        why: "In Java, variable fields are NOT polymorphic. Variable resolution is determined at compile-time by the reference type.",
        correct: "Always use getter methods for polymorphic state access.",
      },
    ],
    tryItYourself: {
      prompt: "Can a private or final method be overridden in Java?",
      hint: "Can a subclass see private methods? Can final methods be modified?",
      solutionSnippet: "No. Private methods are not visible to subclasses, and final methods explicitly prevent overriding.",
    },
    placementConnection:
      "'Explain Compile-time vs Runtime polymorphism' and 'Can we override static methods / fields?' are universal placement interview questions.",
    quickRevision: [
      "Overloading = Compile-time (same method name, different parameter types/counts).",
      "Overriding = Runtime (same signature, `@Override` annotation).",
      "Dynamic Method Dispatch resolves overridden methods at runtime.",
      "Variables are NOT polymorphic; only methods are polymorphic.",
    ],
  },
  {
    id: "java-abstraction",
    slug: "abstraction",
    title: "Abstract Classes & Abstraction",
    track: "java",
    topicSlug: "oop",
    topicTitle: "Object-Oriented Programming",
    order: 7,
    estimatedMinutes: 25,
    oneSentence:
      "An abstract class is a restricted class that cannot be instantiated directly and serves as a partially-implemented foundation for concrete subclasses.",
    whyDoWeNeedIt: {
      problem:
        "A generic `Animal` has no concrete sound—asking `new Animal().makeSound()` makes no sense. But all animals have a name and sleep. An abstract class provides shared common code while forcing subclasses to implement specific details.",
      realWorldAnalogy:
        "A template contract for a job application. The legal boilerplate (common code) is filled out, but the candidate's name and signature (abstract methods) must be provided by the applicant.",
    },
    visualIntuition: `Abstract Class Structure:
[ Abstract Class: PaymentGateway ] (Cannot call: new PaymentGateway())
|-- Concrete Method: recordTransaction() { ... } (Shared by all!)
|-- Abstract Method: processPayment(double amount); (Must be implemented!)
       /                                \\
      v                                  v
[ PayPalGateway ]                 [ StripeGateway ]
(implements processPayment)       (implements processPayment)`,
    syntax: {
      declaration: "public abstract class Base {\n    abstract void mustImplement();\n    void concreteMethod() { ... }\n}",
    },
    example: {
      title: "Abstract class with shared state and mandatory abstract method",
      language: "java",
      code: `abstract class PaymentGateway {
    protected String merchantId;

    public PaymentGateway(String merchantId) {
        this.merchantId = merchantId;
    }

    // Concrete shared logic
    public void logTransaction(double amount) {
        System.out.println("Merchant " + merchantId + " logged: $" + amount);
    }

    // Abstract method: forces child classes to provide implementation
    public abstract boolean processPayment(double amount);
}

class UPIPayment extends PaymentGateway {
    public UPIPayment(String id) {
        super(id);
    }

    @Override
    public boolean processPayment(double amount) {
        System.out.println("Processing UPI payment of $" + amount);
        logTransaction(amount);
        return true;
    }

    public static void main(String[] args) {
        PaymentGateway gateway = new UPIPayment("MERCHANT_99");
        gateway.processPayment(250.0);
    }
}`,
      explanation:
        "You cannot do `new PaymentGateway(\"...\")` directly. Subclass `UPIPayment` implements the abstract contract.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Instantiation Guard",
        description: "The compiler blocks any direct instantiation of an abstract class.",
      },
      {
        step: 2,
        title: "Constructors Allowed",
        description: "Abstract classes CAN have constructors invoked by subclasses via `super()`.",
      },
      {
        step: 3,
        title: "Mandatory Implementation",
        description: "Any concrete subclass MUST implement all abstract methods or be declared abstract itself.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Declaring abstract methods as private or final",
        why: "Private or final methods cannot be overridden, which directly contradicts the purpose of an abstract method.",
        correct: "Use protected or public for abstract methods.",
      },
    ],
    tryItYourself: {
      prompt: "Can an abstract class have zero abstract methods?",
      hint: "Can you declare a class abstract just to prevent direct instantiation?",
      solutionSnippet: "Yes! An abstract class can have zero abstract methods. Marking it abstract simply prevents developers from creating direct instances.",
    },
    placementConnection:
      "Interviewers test whether you know that abstract classes can have constructors, state (fields), and concrete methods, unlike pure interfaces.",
    quickRevision: [
      "Abstract classes cannot be instantiated (`new` is blocked).",
      "They can contain both abstract and concrete methods.",
      "Subclasses must implement all inherited abstract methods.",
      "Abstract classes CAN have constructors and instance fields.",
    ],
  },
  {
    id: "java-interfaces",
    slug: "interfaces",
    title: "Interfaces & Modern Default Methods",
    track: "java",
    topicSlug: "oop",
    topicTitle: "Object-Oriented Programming",
    order: 8,
    estimatedMinutes: 30,
    oneSentence:
      "An interface is a pure contract that specifies what a class must do without defining how, enabling multiple inheritance of type in Java.",
    whyDoWeNeedIt: {
      problem:
        "Java prohibits multiple class inheritance (`class Dog extends Mammal, Pet` fails). Interfaces allow a class to commit to multiple contracts simultaneously (`class Dog extends Mammal implements Pet, Trainable`).",
      realWorldAnalogy:
        "A USB-C port specification. The standard specifies dimensions and voltage (Interface). Any manufacturer can build a charger or mouse that fits the port (Implementation).",
    },
    visualIntuition: `Multiple Interface Implementation:
              [ Interface: Printable ]     [ Interface: Serializable ]
                         \\                     /
                          \\                   /
                      [ Class: DocumentReport ]
                      (implements both contracts!)`,
    syntax: {
      interface: "public interface Sortable {\n    void sort();\n    default void log() { System.out.println(\"Sorted\"); }\n}",
      implements: "public class MyList implements Sortable, Cloneable { ... }",
    },
    example: {
      title: "Implementing multiple interfaces with modern default methods",
      language: "java",
      code: `interface Flyable {
    void fly();
    
    // Default method (Java 8+): allows adding methods to interfaces without breaking existing implementations
    default void printSpeed() {
        System.out.println("Cruising at standard air speed.");
    }
}

interface Swimmable {
    void swim();
}

// Class implementing multiple interfaces
class Duck implements Flyable, Swimmable {
    @Override
    public void fly() {
        System.out.println("Duck flying across lake.");
    }

    @Override
    public void swim() {
        System.out.println("Duck swimming on water.");
    }

    public static void main(String[] args) {
        Duck d = new Duck();
        d.fly();
        d.swim();
        d.printSpeed(); // Inherited default method!
    }
}`,
      explanation:
        "A class can implement as many interfaces as needed, unlocking loose coupling and high architectural modularity.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Implicit Modifiers",
        description: "All interface fields are implicitly `public static final` (constants). Methods are implicitly `public abstract`.",
      },
      {
        step: 2,
        title: "Default Methods (Java 8)",
        description: "The `default` keyword enables providing method bodies inside interfaces for backward compatibility.",
      },
      {
        step: 3,
        title: "Static Methods (Java 8)",
        description: "Interfaces can contain utility static methods called via `InterfaceName.method()`.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Implementing two interfaces that both define the exact same default method without resolving the conflict",
        why: "Creates a Diamond Problem in default methods. The compiler forces the implementing class to override and resolve it.",
        correct: "Override the conflicting method in the class and explicitly call: InterfaceA.super.method();",
      },
    ],
    tryItYourself: {
      prompt: "What are the 3 major differences between an Abstract Class and an Interface in modern Java?",
      hint: "Think about multiple inheritance, state/constructors, and access modifiers.",
      solutionSnippet: `1. Multiple: A class can implement multiple interfaces, but extend only one abstract class.
2. Constructors & State: Abstract classes can have instance variables and constructors; interfaces only have public static final constants.
3. Speed & Purpose: Abstract classes define 'IS-A' identities; interfaces define 'CAN-DO' capabilities.`,
    },
    placementConnection:
      "'Abstract Class vs Interface' is perhaps the #1 most asked OOP interview question in Indian campus placements.",
    quickRevision: [
      "A class can implement multiple interfaces.",
      "Fields are implicitly `public static final`.",
      "Java 8+ supports `default` and `static` methods in interfaces.",
      "Interfaces model capabilities (e.g. `Comparable`, `Runnable`, `Cloneable`).",
    ],
  },
];
