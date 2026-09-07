import { Lesson } from "@/types/content";

export const javascriptFoundationsLessons: Lesson[] = [
  {
    id: "js-intro-v8",
    slug: "intro-v8",
    title: "JavaScript Runtime, V8 Engine & JIT Compilation",
    track: "javascript",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 1,
    estimatedMinutes: 25,
    oneSentence:
      "JavaScript is a single-threaded, dynamically-typed language executed by engines like V8 using a combination of bytecode interpretation and Just-In-Time (JIT) machine code compilation.",
    whyDoWeNeedIt: {
      problem:
        "Beginners mistakenly believe JavaScript is purely interpreted or inherently slow. Understanding the V8 runtime explains how high-performance engines optimize hot functions, manage stack memory, and drive asynchronous I/O.",
      realWorldAnalogy:
        "A multilingual live translator: they translate incoming speech on the fly (interpreter), but if a specific technical passage repeats 50 times, they transcribe and memorize a permanent native script for that section (JIT optimization).",
    },
    visualIntuition: `V8 Engine Architecture & JavaScript Runtime:
[ JavaScript Source Code ]
           |
           v Parser (Abstract Syntax Tree - AST)
[ AST Representation ]
           |
           v Ignition (Bytecode Interpreter - Fast Startup)
[ Bytecode Streams ] <------------+
           |                      | Deoptimization (Bailout)
           v Profiler (Checks Hot Functions)
[ TurboFan (JIT Optimizing Compiler) ]
           |
           v
[ Highly Optimized Native Machine Code ] (Direct CPU execution)

Runtime Components:
- Call Stack: Single execution thread (LIFO)
- Memory Heap: Dynamic allocation for objects, closures, arrays
- Event Loop: Coordinates async callbacks from Web APIs / libuv`,
    syntax: {
      environmentCheck: "console.log(typeof window); // 'object' in browser\nconsole.log(typeof process); // 'object' in Node.js",
    },
    example: {
      title: "Demonstrating Call Stack execution and V8 hot function optimization",
      language: "javascript",
      code: `// Functions execute synchronously on the single Call Stack
function multiply(a, b) {
    return a * b;
}

function computeArea(width, height) {
    const area = multiply(width, height);
    return area;
}

// Monomorphic optimization: passing consistent types allows V8 to JIT-optimize
let total = 0;
for (let i = 0; i < 10000; i++) {
    total += computeArea(10, 20); // V8 optimizes this hot loop into native machine code
}

console.log("Calculated total:", total);
console.log("Memory heap usage:", typeof process !== "undefined" ? process.memoryUsage().heapUsed : "N/A in browser");`,
      explanation:
        "Calls to `computeArea` and `multiply` push stack frames onto the Call Stack. Because the argument types remain integers throughout the loop (monomorphic), TurboFan optimizes the bytecode directly to native instructions.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Parsing & AST Construction",
        description: "V8's parser transforms raw JavaScript source text into an Abstract Syntax Tree (AST) while verifying syntax validity.",
      },
      {
        step: 2,
        title: "Ignition Interpretation",
        description: "The Ignition interpreter translates the AST into bytecode and starts executing immediately to minimize page startup latency.",
      },
      {
        step: 3,
        title: "TurboFan JIT Optimization",
        description: "Hot functions identified by the profiler are compiled into native machine code by TurboFan based on observed type feedback.",
      },
      {
        step: 4,
        title: "Deoptimization Bailout",
        description: "If variable types change later (e.g. passing a string into an integer function), TurboFan deoptimizes and bails back to Ignition bytecode.",
      },
    ],
    commonMistakes: [
      {
        mistake: "function add(a, b) { return a + b; }; add(1, 2); add('1', '2'); // Polymorphic type mixing",
        why: "Frequently alternating argument types forces V8 to discard optimized machine code (Deoptimization), degrading performance by up to 10x in tight loops.",
        correct: "Keep function signatures monomorphic by passing consistent data types.",
      },
    ],
    complexity: {
      time: "O(1) stack frame push/pop; JIT achieves near C++ speeds for hot monomorphic code",
      space: "O(1) primitives on stack, O(N) objects dynamically managed in Heap",
      explanation: "Execution is single-threaded; async operations offload to Web APIs or libuv threads.",
    },
    tryItYourself: {
      prompt: "Is JavaScript inherently multithreaded when executing in Node.js or browser tabs?",
      hint: "Think about the execution Call Stack vs underlying libuv worker threads.",
      solutionSnippet: "The JavaScript execution thread is strictly single-threaded (one Call Stack). However, the host environment (browser Web APIs or Node.js libuv thread pool) executes network, timer, and disk I/O concurrently on background OS threads.",
    },
    placementConnection:
      "Explaining the V8 compilation pipeline (Ignition, TurboFan, Deoptimization) and how single-threaded JS handles concurrency is a standard screening question at Google, Uber, and Razorpay.",
    quickRevision: [
      "JavaScript is single-threaded: it has one Call Stack and one Memory Heap.",
      "V8 uses Ignition to interpret bytecode and TurboFan to JIT-compile hot functions into machine code.",
      "Keep functions monomorphic (consistent types) to prevent costly JIT deoptimizations.",
      "Asynchronous I/O is offloaded to host environments (Web APIs in browser, libuv in Node.js).",
    ],
  },
  {
    id: "js-variables",
    slug: "variables",
    title: "var vs let vs const & The Temporal Dead Zone (TDZ)",
    track: "javascript",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 2,
    estimatedMinutes: 25,
    oneSentence:
      "`var` is function-scoped and hoisted with `undefined`, whereas `let` and `const` are block-scoped and reside in the Temporal Dead Zone (TDZ) prior to their declaration line.",
    whyDoWeNeedIt: {
      problem:
        "Using legacy `var` leaks variables out of `if` blocks and `for` loops, and causes silent bugs where uninitialized variables yield `undefined` instead of throwing a helpful error.",
      realWorldAnalogy:
        "A construction safety perimeter: `var` lets you walk across wet cement before the warning sign is erected; `let` and `const` put up a hazard barricade (TDZ) that prevents entry until the cement is fully dry.",
    },
    visualIntuition: `Scoping & Hoisting Architecture:
1. var Hoisting (Function Scoped):
   console.log(a); // undefined (Declaration hoisted, initialized to undefined!)
   var a = 10;

2. let / const Hoisting & Temporal Dead Zone (TDZ):
   // --- Start of Scope ---
   // TDZ for 'b' begins here
   console.log(b); // ReferenceError: Cannot access 'b' before initialization!
   // TDZ continues...
   let b = 20;     // TDZ ends here!
   // --- b is now accessible ---`,
    syntax: {
      declarations: "let score = 100; // Mutable, block-scoped\nconst PI = 3.14159; // Immutable binding, block-scoped\nvar legacy = 'avoid'; // Function-scoped, hoisted",
    },
    example: {
      title: "Block scope, closure capture in for-loops, and object mutation under const",
      language: "javascript",
      code: `// 1. Loop variable capture (var vs let)
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var i:", i), 10); // Prints 3, 3, 3 (Shared function scope!)
}

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let j:", j), 10); // Prints 0, 1, 2 (Unique block scope per iteration!)
}

// 2. const prevents binding reassignment, NOT object mutation
const user = { name: "Aarav", role: "Student" };
user.role = "Software Engineer"; // VALID: Mutating object property is permitted!
console.log("Updated user:", user);

// user = { name: "Diya" }; // TypeError: Assignment to constant variable!

// To achieve true immutability:
Object.freeze(user);
// user.role = "Manager"; // Fails silently or throws in strict mode`,
      explanation:
        "`let` in a for-loop creates a distinct binding for each iteration, allowing closures to capture `j` correctly. `const` freezes the variable identifier binding, not the underlying heap object contents.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Creation Phase (Memory Allocation)",
        description: "During the execution context creation phase, `var` is hoisted and initialized to `undefined`. `let` and `const` are registered in scope but left uninitialized.",
      },
      {
        step: 2,
        title: "Temporal Dead Zone Window",
        description: "The period between entering the scope and reaching the `let`/`const` declaration line is the TDZ. Any access throws a `ReferenceError`.",
      },
      {
        step: 3,
        title: "Execution Phase (Binding)",
        description: "When execution reaches the declaration line, the variable is initialized with its assigned value or `undefined` (for bare `let x;`).",
      },
    ],
    commonMistakes: [
      {
        mistake: "console.log(x); let x = 5; // Accessing variable in TDZ",
        why: "Unlike `var` which yields `undefined`, accessing a `let` or `const` variable before its declaration throws `ReferenceError: Cannot access 'x' before initialization`.",
        correct: "let x = 5; console.log(x);",
      },
      {
        mistake: "const config = [1, 2]; config = [3, 4]; // Reassigning const binding",
        why: "`const` prohibits variable identifier rebinding.",
        correct: "const config = [1, 2]; config.push(3); // Mutate existing array or use let",
      },
    ],
    complexity: {
      time: "O(1) variable allocation and scope lookup",
      space: "O(1) memory per variable binding",
      explanation: "Block-scoped variables are reclaimed as soon as execution exits the enclosing block.",
    },
    tryItYourself: {
      prompt: "What is the output of `typeof unassignedVar` vs `typeof undeclaredVar` if `let unassignedVar;` is defined on line 5 but accessed on line 1?",
      hint: "Remember the TDZ vs undeclared variables.",
      solutionSnippet: "Line 1 `typeof unassignedVar` throws a `ReferenceError` because TDZ temporarily disables the safe behavior of `typeof`. For a completely undeclared variable that never exists, `typeof undeclaredVar` safely returns `'undefined'`.",
    },
    placementConnection:
      "Explaining the classic `for (var i = 0; i < 3; i++) setTimeout` interview puzzle and defining the Temporal Dead Zone (TDZ) are asked in over 70% of frontend/Node.js technical interviews.",
    quickRevision: [
      "Always use `const` by default; use `let` only when the variable must be reassigned; never use `var`.",
      "`let` and `const` are block-scoped; `var` is function-scoped.",
      "The Temporal Dead Zone (TDZ) prevents reading `let`/`const` before their declaration line.",
      "`const` prevents variable rebinding, but object properties can still be mutated unless protected by `Object.freeze()`.",
    ],
  },
  {
    id: "js-types-coercion",
    slug: "types-coercion",
    title: "Data Types, Type Coercion & Strict Equality",
    track: "javascript",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 3,
    estimatedMinutes: 30,
    oneSentence:
      "JavaScript has 7 primitive types and 1 reference type (Object), and understanding implicit type coercion (ToPrimitive, ToNumber) prevents subtle equality bugs.",
    whyDoWeNeedIt: {
      problem:
        "Using loose equality (`==`) triggers complex type coercion rules where `0 == ''`, `null == undefined`, and `[] == false` all evaluate to `true`, causing critical logic bugs in validation and financial calculations.",
      realWorldAnalogy:
        "An airport currency exchange: loose conversion (`==`) tries to guess conversion rates through multiple currencies and fees automatically; strict conversion (`===`) demands exact currency matching before accepting.",
    },
    visualIntuition: `JavaScript Type System:
Primitive Types (Stored directly by value, immutable):
- string, number (IEEE 754 float), bigint, boolean, undefined, symbol, null

Reference Types (Stored by reference on Heap, mutable):
- Object (including Array, Function, Date, RegExp, Map, Set)

Loose vs Strict Equality:
==  (Loose):  Performs implicit type coercion before comparison.
=== (Strict): Checks both type AND value without coercion.

Coercion Rules:
- Number + String  --> String concatenation: 5 + "5" = "55"
- Number - String  --> Numeric subtraction:   5 - "5" = 0
- Boolean in math  --> true = 1, false = 0:    true + 1 = 2`,
    syntax: {
      typeofChecks: "typeof 42;          // 'number'\ntypeof 'hello';     // 'string'\ntypeof true;        // 'boolean'\ntypeof undefined;   // 'undefined'\ntypeof null;        // 'object' (Historical JS bug!)\ntypeof Symbol();    // 'symbol'\ntypeof 10n;         // 'bigint'",
    },
    example: {
      title: "Demonstrating implicit type coercion and why strict equality is mandatory",
      language: "javascript",
      code: `// 1. Quirks of loose equality (==)
console.log("0 == '':", 0 == '');            // true (both coerce to 0)
console.log("0 == '0':", 0 == '0');          // true
console.log("false == '0':", false == '0');  // true
console.log("null == undefined:", null == undefined); // true (special rule)
console.log("[] == false:", [] == false);    // true ([] coerces to '', then 0)

// 2. Strict equality (===) - Predictable & Safe!
console.log("0 === '':", 0 === '');          // false (number !== string)
console.log("null === undefined:", null === undefined); // false

// 3. Mathematical coercion tricks
console.log("5 + '2':", 5 + '2');            // '52' (string concatenation)
console.log("5 - '2':", 5 - '2');            // 3 (numeric subtraction)
console.log("+'42':", +'42');                // 42 (unary plus converts to number)
console.log("Number('abc'):", Number('abc')); // NaN (Not a Number)

// Checking for NaN (NaN is the only value in JS not equal to itself!)
const badNum = NaN;
console.log("badNum === NaN:", badNum === NaN); // false!
console.log("Number.isNaN(badNum):", Number.isNaN(badNum)); // true`,
      explanation:
        "`==` coerces types according to the ECMAScript specification, producing counter-intuitive truths. `===` checks both type and value. `Number.isNaN()` must be used to test for `NaN` because `NaN === NaN` is `false`.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Primitive Value Copying",
        description: "Primitives (`number`, `string`, `boolean`) are copied by value onto the execution stack.",
      },
      {
        step: 2,
        title: "Reference Pointer Passing",
        description: "Objects and arrays are stored on the Heap; variable identifiers hold reference pointers to those heap blocks.",
      },
      {
        step: 3,
        title: "ToPrimitive Algorithm",
        description: "When an object is used in primitive operations (like `[] + {}`), JavaScript invokes `[Symbol.toPrimitive]()`, then `valueOf()`, and finally `toString()`.",
      },
    ],
    commonMistakes: [
      {
        mistake: "if (typeof val === 'null') // Expecting 'null'",
        why: "In JavaScript, `typeof null` returns `'object'`. This is a legacy bug in the original 1995 JS engine that cannot be fixed without breaking the web.",
        correct: "if (val === null) // Check with strict equality directly",
      },
      {
        mistake: "if (x == null) when checking strictly for null",
        why: "`x == null` is true for BOTH `null` and `undefined`. While sometimes used as a shortcut, it can cause accidental fallthroughs.",
        correct: "if (x === null || x === undefined)",
      },
    ],
    complexity: {
      time: "O(1) primitive comparisons; O(1) pointer comparison for objects (does not deep compare)",
      space: "O(1) memory",
      explanation: "`obj1 === obj2` only checks if both point to the same memory reference.",
    },
    tryItYourself: {
      prompt: "What does `[] + []` and `[] + {}` evaluate to in JavaScript, and why?",
      hint: "Remember the ToPrimitive conversion using `.toString()`.",
      solutionSnippet: "`[] + []` evaluates to `\"\"` (empty string) because both arrays convert via `.toString()` to `\"\"`. `[] + {}` evaluates to `\"[object Object]\"` because `{}` converts to `\"[object Object]\"`.",
    },
    placementConnection:
      "`typeof null`, `NaN === NaN`, loose vs strict equality (`==` vs `===`), and predicting output for tricky coercion questions are classic placement screening questions.",
    quickRevision: [
      "There are 7 primitive types: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, `null`.",
      "`typeof null` returns `'object'` due to a historical 1995 engine artifact.",
      "Always use `===` (strict equality) instead of `==` (loose equality) to prevent unintended type coercion.",
      "`NaN` is the only value in JavaScript that is not equal to itself; always use `Number.isNaN(val)`.",
    ],
  },
  {
    id: "js-operators-conditionals",
    slug: "operators-conditionals",
    title: "Operators, Short-Circuiting & Nullish Coalescing",
    track: "javascript",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 4,
    estimatedMinutes: 20,
    oneSentence:
      "Modern JavaScript provides expressive logic operators including short-circuiting (`&&`, `||`), nullish coalescing (`??`), and optional chaining (`?.`) to safely access deeply nested data.",
    whyDoWeNeedIt: {
      problem:
        "Accessing nested API responses like `user.profile.address.city` crashes with `TypeError: Cannot read properties of undefined` if any intermediate property is missing.",
      realWorldAnalogy:
        "A series of security checkpoints: if guard #1 stops you, you do not proceed to checkpoint #2; optional chaining (`?.`) allows a courier to safely check each door and stop if locked without triggering an alarm.",
    },
    visualIntuition: `Logical OR (||) vs Nullish Coalescing (??):
|| checks TRUTHINESS:
Falsy values: false, 0, "", null, undefined, NaN
count = 0;
count || 10  --> Evaluates to 10! (0 is falsy, overrides valid count 0!)

?? checks NULLISHNESS (Only null or undefined):
count = 0;
count ?? 10  --> Evaluates to 0! (0 is preserved! Only null/undefined fall back)

Optional Chaining (?.) Safe Navigation:
response?.data?.users?.[0]?.name
(Stops and returns undefined the moment any property in the chain is null/undefined)`,
    syntax: {
      nullish: "const port = process.env.PORT ?? 3000;",
      optionalChain: "const city = user?.address?.city;",
      shortCircuit: "isLoggedIn && renderDashboard();",
    },
    example: {
      title: "Using optional chaining, nullish coalescing, and short-circuiting",
      language: "javascript",
      code: `const apiResponse = {
    status: 200,
    data: {
        user: {
            name: "Aarav",
            preferences: {
                theme: "dark",
                notificationsCount: 0 // Valid zero count!
            }
        }
    }
};

// 1. Optional Chaining (?.) prevents runtime TypeError
const street = apiResponse?.data?.user?.address?.street;
console.log("Street (safe missing):", street); // undefined (No crash!)

// 2. The critical difference between || and ??
const rawCount = apiResponse.data.user.preferences.notificationsCount;

// BUG with ||: 0 is falsy, so it incorrectly falls back to 5!
const badCount = rawCount || 5;
console.log("Count with || (buggy):", badCount); // 5

// CORRECT with ??: 0 is not nullish, so 0 is preserved!
const goodCount = rawCount ?? 5;
console.log("Count with ?? (correct):", goodCount); // 0

// 3. Short-circuit execution guard
let executed = false;
apiResponse.status === 200 && (executed = true);
console.log("Execution status:", executed); // true`,
      explanation:
        "`?.` halts property evaluation immediately if the left operand is nullish, returning `undefined`. `??` only falls back if the left value is strictly `null` or `undefined`, preserving valid falsy values like `0` and `\"\"`.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Short-Circuit Evaluation",
        description: "In `A && B`, if `A` is falsy, evaluation terminates immediately and returns `A`. In `A || B`, if `A` is truthy, it terminates and returns `A`.",
      },
      {
        step: 2,
        title: "Nullish Operator Guard",
        description: "The `??` operator evaluates `(A !== null && A !== undefined) ? A : B`.",
      },
      {
        step: 3,
        title: "Optional Chaining Bailout",
        description: "`a?.b` checks if `a == null`. If so, it short-circuits the entire expression to `undefined` without reading property `b`.",
      },
    ],
    commonMistakes: [
      {
        mistake: "const timeout = config.timeout || 1000; // When timeout can be 0 ms",
        why: "`0` is falsy, so `0 || 1000` evaluates to `1000`, making it impossible to set a timeout of 0 milliseconds.",
        correct: "const timeout = config.timeout ?? 1000;",
      },
      {
        mistake: "user?.address.city // Missing ? before city",
        why: "If `address` is undefined, `?.` protects `address`, but accessing `.city` on undefined crashes.",
        correct: "user?.address?.city",
      },
    ],
    complexity: {
      time: "O(1) short-circuiting operation",
      space: "O(1)",
      explanation: "Evaluated in a single bytecode jump instruction (`JUMP_IF_FALSE`).",
    },
    tryItYourself: {
      prompt: "Can you combine `??` and `||` directly without parentheses (e.g. `a || b ?? c`)?",
      hint: "Does JavaScript allow mixing nullish coalescing with logical operators without grouping?",
      solutionSnippet: "No! JavaScript throws a SyntaxError: `Unexpected token '??'`. You must use explicit parentheses: `(a || b) ?? c` to prevent operator precedence ambiguity.",
    },
    placementConnection:
      "Modern full-stack technical rounds (React/Node.js) expect candidates to use `?.` and `??` fluently when handling API payloads and configuration objects.",
    quickRevision: [
      "Use `??` instead of `||` for default values when `0`, `false`, or `\"\"` are valid values.",
      "`?.` safely navigates nested objects, arrays `arr?.[0]`, and functions `fn?.()` without throwing `TypeError`.",
      "`&&` returns the first falsy operand or the last truthy operand.",
      "`||` returns the first truthy operand or the last falsy operand.",
    ],
  },
  {
    id: "js-loops-iteration",
    slug: "loops-iteration",
    title: "Loops & Iteration Protocols: for...of vs for...in",
    track: "javascript",
    topicSlug: "foundations",
    topicTitle: "Foundations",
    order: 5,
    estimatedMinutes: 25,
    oneSentence:
      "`for...of` iterates over iterable values (Arrays, Strings, Sets, Maps) using the `[Symbol.iterator]` protocol, while `for...in` enumerates an object's enumerable property keys including its prototype chain.",
    whyDoWeNeedIt: {
      problem:
        "Using `for...in` on an array iterates over array indices as strings (`'0'`, `'1'`) and inadvertently visits prototype properties added by third-party libraries, leading to critical loop errors.",
      realWorldAnalogy:
        "`for...of` is like opening passenger seats on a bus to greet the people inside (values); `for...in` is inspecting the maintenance checklist and chassis labels on the outside of the vehicle (keys & metadata).",
    },
    visualIntuition: `for...of vs for...in on Arrays:
const arr = ["A", "B", "C"];
arr.customProp = "metadata";

for (const val of arr)   --> Yields: "A", "B", "C"  (Iterates array VALUES via [Symbol.iterator])
for (const key in arr)   --> Yields: "0", "1", "2", "customProp" (Enumerates ALL enumerable KEYS as strings!)

Key Takeaway:
- Use for...of for Arrays, Sets, Maps, Strings (Collections)
- Use for...in for plain Object keys (or Object.keys() / Object.entries())`,
    syntax: {
      forOf: "for (const item of iterable) { /* use item */ }",
      forIn: "for (const key in obj) { /* use key */ }",
      destructuredForOf: "for (const [key, val] of map.entries()) { /* ... */ }",
    },
    example: {
      title: "Comparing for...of and for...in with objects and iterable collections",
      language: "javascript",
      code: `// 1. for...of with Array, Map, and Set
const fruits = ["apple", "banana", "cherry"];
for (const [idx, fruit] of fruits.entries()) {
    console.log("Index", idx, "->", fruit);
}

const userRoles = new Map([
    ["Aarav", "Admin"],
    ["Diya", "Editor"]
]);

for (const [user, role] of userRoles) {
    console.log(user, "has role:", role);
}

// 2. for...in with plain object (and why Object.entries is preferred)
const student = { name: "Rohan", branch: "CSE", year: 2 };

// Recommended modern way: Object.entries()
for (const [key, val] of Object.entries(student)) {
    console.log(key, ":", val);
}

// 3. Early loop exits: break and continue work in for...of (unlike forEach!)
for (const num of [10, 20, 30, 40, 50]) {
    if (num === 30) continue; // Skip 30
    if (num === 50) break;    // Terminate loop
    console.log("Processing num:", num);
}`,
      explanation:
        "`for...of` works with any object implementing `[Symbol.iterator]`. Unlike `Array.prototype.forEach()`, `for...of` supports `break`, `continue`, and works seamlessly with `await` in async loops.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Iterable Protocol Lookup",
        description: "When `for...of` starts, it calls `collection[Symbol.iterator]()` to obtain an iterator instance.",
      },
      {
        step: 2,
        title: "Next Element Extraction",
        description: "On each iteration, it calls `iterator.next()`, returning an object `{ value: any, done: boolean }`.",
      },
      {
        step: 3,
        title: "Loop Termination",
        description: "When `done` is `true`, the loop exits cleanly. If broken early, it calls `iterator.return?.()` for cleanup.",
      },
    ],
    commonMistakes: [
      {
        mistake: "for (const val of plainObject) // Trying to use for...of on a plain object",
        why: "Plain JavaScript objects do not implement `[Symbol.iterator]`. Throws `TypeError: plainObject is not iterable`.",
        correct: "for (const [k, v] of Object.entries(plainObject))",
      },
      {
        mistake: "arr.forEach(async (item) => { await process(item); }) // Expecting sequential async execution",
        why: "`forEach` does not await promises; it fires all iterations concurrently. Use `for...of` for sequential async execution.",
        correct: "for (const item of arr) { await process(item); }",
      },
    ],
    complexity: {
      time: "O(N) linear iteration",
      space: "O(1) memory (iterators yield one value at a time)",
      explanation: "Iterators evaluate items on-demand without copying the underlying collection.",
    },
    tryItYourself: {
      prompt: "How can you make a custom JavaScript object iterable with `for...of`?",
      hint: "What special well-known Symbol method must you define on the object?",
      solutionSnippet: `const range = {
    from: 1, to: 3,
    [Symbol.iterator]() {
        let current = this.from;
        const last = this.to;
        return {
            next() {
                return current <= last ? { value: current++, done: false } : { done: true };
            }
        };
    }
};
for (const n of range) console.log(n); // 1, 2, 3`,
    },
    placementConnection:
      "Explaining why `for...in` is dangerous for arrays and why `forEach` cannot be used with async/await or `break` are standard interview questions in technical rounds.",
    quickRevision: [
      "Use `for...of` for iterable collections (Arrays, Sets, Maps, Strings).",
      "Use `for...in` only for enumerating plain Object keys, or prefer `Object.keys()` / `Object.entries()`.",
      "`for...of` supports `break`, `continue`, and `await` (unlike `Array.prototype.forEach`).",
      "Objects become iterable by implementing the `[Symbol.iterator]` generator or method.",
    ],
  },
];
