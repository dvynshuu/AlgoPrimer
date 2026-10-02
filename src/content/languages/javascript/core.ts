import { Lesson } from "@/types/content";

export const javascriptCoreLessons: Lesson[] = [
  {
    id: "js-functions",
    slug: "functions",
    title: "Function Declarations, Expressions & Arrow Functions",
    track: "javascript",
    topicSlug: "core",
    topicTitle: "Functions, Scope & Closures",
    order: 6,
    estimatedMinutes: 25,
    oneSentence:
      "Function declarations are hoisted with their complete implementation, function expressions are bound to variables, and arrow functions provide concise syntax with lexical `this` binding.",
    whyDoWeNeedIt: {
      problem:
        "Using standard functions inside event handlers or timers loses the outer class/object context because `this` rebinds dynamically. Arrow functions eliminate this bug via lexical capture.",
      realWorldAnalogy:
        "A formal company seal (Function Declaration): registered in the town registry before the business opens; versus a temporary rubber stamp in someone's pocket (Arrow Function): carries the exact location of whoever is holding it.",
    },
    visualIntuition: `Function Types Comparison:
1. Declaration (Hoisted completely):
   greet(); // VALID!
   function greet() { return "Hello"; }

2. Expression (Variable hoisting rules apply):
   sayHi(); // TypeError: sayHi is not a function (if var) or ReferenceError (if const)
   const sayHi = function() { return "Hi"; };

3. Arrow Function (No own 'this', no 'arguments', cannot be 'new' constructor):
   const add = (a, b) => a + b; // Concise implicit return!`,
    syntax: {
      declaration: "function add(a, b) { return a + b; }",
      arrow: "const multiply = (a, b) => a * b;\nconst square = x => x * x;",
      restParams: "function sum(...numbers) { return numbers.reduce((a, b) => a + b, 0); }",
    },
    example: {
      title: "Comparing hoisting differences, rest parameters, and lexical arrow syntax",
      language: "javascript",
      code: `// 1. Function Declaration (Hoisted completely to top of scope)
console.log("Hoisted call:", calculateArea(4, 5)); // 20

function calculateArea(w, h) {
    return w * h;
}

// 2. Arrow function with concise implicit return
const numbers = [1, 2, 3, 4, 5];
const squares = numbers.map(x => x * x);
console.log("Squares:", squares);

// 3. Rest parameters (...args) vs legacy arguments object
function collectStats(label, ...scores) {
    // 'scores' is a true JavaScript Array!
    const total = scores.reduce((acc, curr) => acc + curr, 0);
    const avg = scores.length > 0 ? total / scores.length : 0;
    return { label, total, avg };
}

const stats = collectStats("Batch A", 85, 92, 78, 95);
console.log("Stats summary:", stats);

// 4. Default parameter evaluation at call time
function createUser(name, id = Math.random().toString(36).substring(7)) {
    return { name, id };
}
console.log("User:", createUser("Aarav"));`,
      explanation:
        "Declarations can be called before their definition line. Arrow functions provide clean implicit returns for one-liners. Rest parameters (`...scores`) provide a true `Array` instance rather than the legacy array-like `arguments` object.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Creation Phase Hoisting",
        description: "During the creation phase of the execution context, function declarations are stored in memory with their complete function bodies attached.",
      },
      {
        step: 2,
        title: "Arrow Function Construction Prohibition",
        description: "Arrow functions lack the internal `[[Construct]]` method and prototype property, so calling `new ArrowFn()` throws a `TypeError`.",
      },
      {
        step: 3,
        title: "Lexical Scope Inheritance",
        description: "Arrow functions do not define their own `this`, `arguments`, or `super`. They resolve them directly from the enclosing lexical scope.",
      },
    ],
    commonMistakes: [
      {
        mistake: "const fn = () => { key: 'value' }; // Intending to return an object",
        why: "The `{}` is parsed as a function body block, not an object literal! `fn()` returns `undefined`.",
        correct: "const fn = () => ({ key: 'value' }); // Wrap object literal in parentheses",
      },
      {
        mistake: "const Button = () => {}; new Button(); // Using arrow function as constructor",
        why: "Arrow functions do not have a prototype property and cannot be instantiated with `new`.",
        correct: "function Button() {} // Or use ES6 class",
      },
    ],
    complexity: {
      time: "O(1) function declaration and invocation overhead",
      space: "O(1) per function object created in heap",
      explanation: "Standard function object allocation in V8.",
    },
    tryItYourself: {
      prompt: "Can you access the `arguments` object inside an arrow function?",
      hint: "Where does an arrow function resolve free variables?",
      solutionSnippet: "No, arrow functions do not possess their own `arguments` object. Referencing `arguments` inside an arrow function reads the `arguments` object of the nearest regular outer enclosing function, or throws a ReferenceError if at top level.",
    },
    placementConnection:
      "Explaining why arrow functions cannot be used as object methods or constructors and how rest parameters differ from `arguments` are core screening questions.",
    quickRevision: [
      "Function declarations are hoisted with their bodies; function expressions follow variable hoisting rules.",
      "Arrow functions do not bind their own `this`, `arguments`, or `super`.",
      "Wrap returned object literals in parentheses in arrow one-liners: `() => ({ a: 1 })`.",
      "Always prefer rest parameters (`...args`) over the legacy `arguments` object.",
    ],
  },
  {
    id: "js-scope-chain",
    slug: "scope-chain",
    title: "Lexical Scope, Execution Context & The Call Stack",
    track: "javascript",
    topicSlug: "core",
    topicTitle: "Functions, Scope & Closures",
    order: 7,
    estimatedMinutes: 25,
    oneSentence:
      "JavaScript resolves identifiers lexically (based on where functions are physically written in code) by traversing up the Execution Context Scope Chain to the Global environment.",
    whyDoWeNeedIt: {
      problem:
        "Without understanding lexical scoping, developers make incorrect assumptions about which variable is read when multiple functions share identical variable names across nested scopes.",
      realWorldAnalogy:
        "A series of transparent nesting dolls: looking from inside the smallest doll, you can see outwards through every layer to the room; but someone standing in the room outside cannot see inside the inner dolls.",
    },
    visualIntuition: `Execution Context & Scope Chain Lookup:
[ Global Execution Context (GEC) ]
Variables: globalVar = "Earth"
      ^
      | outer scope reference
[ Function Execution Context: outer() ]
Variables: outerVar = "Country"
      ^
      | outer scope reference
[ Function Execution Context: inner() ]
Variables: innerVar = "City"

When inner() requests globalVar:
1. Checks Local inner() scope? (Not found)
2. Checks outer() scope? (Not found)
3. Checks Global scope? (FOUND: "Earth")
If not found at top level: ReferenceError!`,
    syntax: {
      lexicalDeclaration: "function outer() {\n    const a = 10;\n    function inner() {\n        return a * 2; // Reads 'a' from lexical parent!\n    }\n}",
    },
    example: {
      title: "Demonstrating the Execution Context Call Stack and Lexical Scope lookup",
      language: "javascript",
      code: `const platform = "AlgoPrimer";

function first() {
    const level = "Beginner";

    function second() {
        const topic = "Scope Chain";

        function third() {
            // Lexical lookup: 'topic' from second(), 'level' from first(), 'platform' from Global
            console.log("Current topic:", topic);
            console.log("Student level:", level);
            console.log("Platform name:", platform);
        }

        third();
    }

    second();
}

first();

// Lexical scoping is determined at WRITE TIME, not CALL TIME:
const x = "global x";
function printX() {
    console.log("x is:", x);
}

function testScope() {
    const x = "local x";
    printX(); // Prints "global x"! printX was defined in global scope!
}
testScope();`,
      explanation:
        "`printX` prints `'global x'` because JavaScript uses lexical (static) scoping, not dynamic scoping. The scope chain is fixed at definition time, regardless of where `printX` is called.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Execution Context Creation",
        description: "Whenever a function is invoked, the JavaScript engine pushes a new Execution Context onto the Call Stack, setting up the Variable Environment and Outer Lexical Environment Reference.",
      },
      {
        step: 2,
        title: "Scope Chain Resolution",
        description: "If an identifier cannot be found in the current environment record, the engine follows the outer reference pointer to the parent scope.",
      },
      {
        step: 3,
        title: "Call Stack Popping",
        description: "When the function returns, its execution context is popped off the Call Stack, returning control to the caller.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Assuming JavaScript uses dynamic scoping based on who called the function",
        why: "JavaScript is strictly lexically scoped. Where a function is declared determines its scope chain, NOT where it is called.",
        correct: "Pass arguments explicitly if a function needs caller context.",
      },
    ],
    complexity: {
      time: "O(D) lookup time where D is the depth of the nested lexical scope chain (typically 1–4 hops)",
      space: "O(D) Call Stack frames allocated in memory",
      explanation: "V8 optimizes identifier access into direct indexed slot offsets in bytecode.",
    },
    tryItYourself: {
      prompt: "What is the difference between Variable Shadowing and Illegal Shadowing in JavaScript?",
      hint: "Can a `var` shadow a `let` within the same block scope?",
      solutionSnippet: "Variable Shadowing occurs when an inner variable has the same name as an outer variable. Illegal Shadowing occurs if you attempt to shadow a `let` variable using `var` within the same or nested block: `let a = 10; { var a = 20; }` throws a SyntaxError because `var` attempts to hoist to function level, clashing with `let`.",
    },
    placementConnection:
      "Tracing Call Stack execution and predicting output with nested lexical scopes is a mandatory component of JavaScript placement coding evaluations.",
    quickRevision: [
      "JavaScript is lexically scoped: scope is determined by where functions are written in source code.",
      "The Scope Chain is traversed upward toward the Global scope; parent scopes cannot access inner variables.",
      "The Call Stack manages function execution contexts in LIFO order.",
      "Shadowing occurs when an inner variable masks an outer variable of the same identifier.",
    ],
  },
  {
    id: "js-closures",
    slug: "closures",
    title: "Closures & Data Privacy Patterns",
    track: "javascript",
    topicSlug: "core",
    topicTitle: "Functions, Scope & Closures",
    order: 8,
    estimatedMinutes: 30,
    oneSentence:
      "A closure is the combination of a function bundled together with references to its surrounding lexical environment, allowing the function to access outer variables even after the outer function has returned.",
    whyDoWeNeedIt: {
      problem:
        "Global variables can be mutated and corrupted by any script or library. Closures allow creating truly private state that cannot be modified directly from outside.",
      realWorldAnalogy:
        "A backpack packed before leaving home: even after you have left the house (outer function returned), you carry the contents of the backpack (closed-over variables) with you wherever you travel.",
    },
    visualIntuition: `Closure Memory Model:
function createCounter() {
    let count = 0; // Lives in Heap Closure Scope!
    return function() {
        return ++count;
    };
}

const counter1 = createCounter();
createCounter() Stack Frame is DESTROYED!
HOWEVER:
counter1 function object retains hidden [[Scopes]] pointer to:
[ Closure Scope (createCounter) ] ---> count = 0

Calling counter1():
1st call -> count = 1
2nd call -> count = 2
(Private, encapsulated state!)`,
    syntax: {
      closurePattern: "function makeAdder(x) {\n    return function(y) {\n        return x + y; // x is closed over!\n    };\n}",
    },
    example: {
      title: "Creating private state, bank account encapsulation, and factory functions",
      language: "javascript",
      code: `// 1. Encapsulating private state via closures
function createBankAccount(initialDeposit) {
    let balance = initialDeposit; // Private variable (cannot be accessed directly!)
    const transactions = [];

    return {
        deposit(amount) {
            if (amount > 0) {
                balance += amount;
                transactions.push({ type: "DEPOSIT", amount, date: new Date().toISOString() });
                console.log("Deposited:", amount);
            }
        },
        withdraw(amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                transactions.push({ type: "WITHDRAW", amount, date: new Date().toISOString() });
                return true;
            }
            console.log("Insufficient funds or invalid amount");
            return false;
        },
        getBalance() {
            return balance; // Controlled read access
        }
    };
}

const myAccount = createBankAccount(1000);
myAccount.deposit(500);
myAccount.withdraw(200);

console.log("Current balance:", myAccount.getBalance()); // 1300
console.log("Direct balance access:", myAccount.balance); // undefined! Cannot tamper directly!`,
      explanation:
        "`balance` is inaccessible from the outside because it is not an object property; it exists solely in the lexical closure environment retained by `deposit`, `withdraw`, and `getBalance`.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Lexical Environment Retention",
        description: "When an inner function references outer variables, V8 moves those variables from the stack frame into a heap-allocated `Context` closure object.",
      },
      {
        step: 2,
        title: "Stack Frame Teardown",
        description: "The outer function completes and its stack frame is popped off the Call Stack.",
      },
      {
        step: 3,
        title: "Persistent Reference Access",
        description: "The inner function retains an internal `[[Scopes]]` pointer to the heap closure context, keeping the variables alive as long as the inner function is reachable.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Accidental memory leaks by retaining large unused variables in closures",
        why: "If an inner function closes over a large array or DOM node that is never cleared, the garbage collector cannot free that memory.",
        correct: "Set unused closure variables or callback references to `null` when no longer needed.",
      },
      {
        mistake: "for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); }",
        why: "`var i` is a single shared variable across all iterations, so all closures log `3`.",
        correct: "Use `let i` which generates a new lexical binding per iteration.",
      },
    ],
    complexity: {
      time: "O(1) access to closed-over variables",
      space: "O(K) heap memory where K is the count of variables retained in the closure",
      explanation: "Closed-over variables reside in heap memory instead of ephemeral stack frames.",
    },
    tryItYourself: {
      prompt: "Implement a function `once(fn)` that ensures a given function `fn` can only ever run once, returning the first result on all subsequent calls.",
      hint: "Use a boolean flag and cached result variable inside a closure.",
      solutionSnippet: `function once(fn) {
    let executed = false;
    let result;
    return function(...args) {
        if (!executed) {
            result = fn.apply(this, args);
            executed = true;
        }
        return result;
    };
}
const init = once(() => console.log("Init called!"));
init(); // Logs "Init called!"
init(); // Does nothing!`,
    },
    placementConnection:
      "Closures are tested in 100% of JavaScript interviews: memoization functions, `once()`, debounce, and module patterns all fundamentally rely on closures.",
    quickRevision: [
      "A closure allows an inner function to remember and access variables from its parent scope after the parent has returned.",
      "V8 stores closed-over variables in Heap Contexts so they survive stack frame destruction.",
      "Closures enable data privacy and private state encapsulation without classes.",
      "Be mindful of memory leaks when retaining references to large objects inside long-lived closures.",
    ],
  },
  {
    id: "js-this-binding",
    slug: "this-binding",
    title: "The this Keyword: Implicit, Explicit & Arrow Binding",
    track: "javascript",
    topicSlug: "core",
    topicTitle: "Functions, Scope & Closures",
    order: 9,
    estimatedMinutes: 30,
    oneSentence:
      "In JavaScript, `this` is evaluated at runtime based on the invocation call-site according to four rules: Default, Implicit, Explicit (`call`/`apply`/`bind`), and Lexical (arrow functions).",
    whyDoWeNeedIt: {
      problem:
        "Passing an object method as an event callback or timer callback strips its context, causing `this` to point to `window` or `undefined` and resulting in broken state.",
      realWorldAnalogy:
        "The pronoun 'I' in human language: who 'I' refers to depends entirely on who is currently speaking, unless a lawyer writes an explicit contract specifying the speaker (`bind`).",
    },
    visualIntuition: `The 4 Rules of 'this' Binding (Precedence from Lowest to Highest):
1. Default Binding:       fn()           --> global window (or undefined in strict mode)
2. Implicit Binding:      obj.fn()       --> 'this' is 'obj'
3. Explicit Binding:      fn.call(ctx)   --> 'this' is forced to 'ctx'
                          fn.bind(ctx)   --> returns permanent wrapper bound to 'ctx'
4. new Binding:           new Fn()       --> 'this' is brand-new object instance

Special Case - Arrow Functions:
() => {} has NO 'this'. It inherits 'this' lexically from surrounding enclosing scope!`,
    syntax: {
      explicitBinding: "fn.call(context, arg1, arg2);\nfn.apply(context, [arg1, arg2]);\nconst boundFn = fn.bind(context);",
    },
    example: {
      title: "Demonstrating the 4 binding rules, losing this context, and fixing with bind and arrow functions",
      language: "javascript",
      code: `const developer = {
    name: "Aarav",
    languages: ["JS", "Python"],

    // Regular method: implicit binding when called as developer.showLanguages()
    showLanguages() {
        console.log("Developer name:", this.name);

        // Arrow function retains 'this' lexically from showLanguages!
        this.languages.forEach(lang => {
            console.log(this.name, "knows", lang); // 'this' correctly points to developer!
        });
    }
};

developer.showLanguages();

// Losing this context (Common Interview Trap):
const detachedFunc = developer.showLanguages;
// detachedFunc(); // In strict mode: TypeError: Cannot read properties of undefined (reading 'name')

// Fixing with explicit .bind():
const safeBoundFunc = developer.showLanguages.bind(developer);
safeBoundFunc(); // Works perfectly!

// call() vs apply()
function introduce(greeting, punctuation) {
    console.log(greeting + ", I am " + this.name + punctuation);
}
introduce.call(developer, "Hello", "!");        // Comma-separated args
introduce.apply(developer, ["Namaste", "."]);   // Array of args`,
      explanation:
        "`developer.showLanguages()` binds `this` to `developer`. Passing `developer.showLanguages` as a bare reference loses context. `.bind()` locks the context permanently, while arrow functions capture `this` lexically.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Call-Site Inspection",
        description: "The engine checks how the function is called: with `new`, with `.call`/`.apply`/`.bind`, as an object method `obj.method()`, or as a bare function.",
      },
      {
        step: 2,
        title: "Strict Mode Guard",
        description: "In strict mode (`'use strict'`), default binding yields `undefined` instead of polluting the global `window` object.",
      },
      {
        step: 3,
        title: "Lexical Arrow Bypass",
        description: "Arrow functions skip runtime `this` binding completely; the engine resolves `this` like a standard variable via the lexical scope chain.",
      },
    ],
    commonMistakes: [
      {
        mistake: "const obj = { count: 0, inc: () => { this.count++; } }; // Arrow function as object method",
        why: "Arrow functions do NOT bind to the object literal! `this` points to the outer enclosing scope (usually `window` or `module.exports`), leaving `obj.count` at 0.",
        correct: "const obj = { count: 0, inc() { this.count++; } };",
      },
      {
        mistake: "Re-binding an already bound function: const f2 = f1.bind(ctx1).bind(ctx2)",
        why: "A function created with `.bind()` is permanently locked to the first context. Subsequent `.bind()` calls have zero effect on `this`.",
        correct: "Bind once to the intended target context.",
      },
    ],
    complexity: {
      time: "O(1) runtime binding lookup",
      space: "O(1) memory (function wrapper for .bind())",
      explanation: "Single context pointer assignment during frame setup.",
    },
    tryItYourself: {
      prompt: "Implement a polyfill for `Function.prototype.myBind` using `apply` and closures.",
      hint: "Return a new function that invokes the original with the provided context and concatenated arguments.",
      solutionSnippet: `Function.prototype.myBind = function(context, ...bindArgs) {
    const fn = this;
    return function(...callArgs) {
        return fn.apply(context, [...bindArgs, ...callArgs]);
    };
};`,
    },
    placementConnection:
      "Writing a polyfill for `Function.prototype.bind` and diagnosing 'lost this' bugs in React component lifecycles or event handlers are top placement questions.",
    quickRevision: [
      "`this` is determined by HOW a function is called (call-site), not where it is defined.",
      "Order of precedence: `new` > `bind`/`call`/`apply` > implicit `obj.method()` > default `global`/`undefined`.",
      "Arrow functions do not have `this`; they inherit it lexically from the parent scope.",
      "Never use arrow functions for object methods that need to access sibling properties via `this`.",
    ],
  },
  {
    id: "js-higher-order-functions",
    slug: "higher-order-functions",
    title: "Higher-Order Functions, Currying & Composition",
    track: "javascript",
    topicSlug: "core",
    topicTitle: "Functions, Scope & Closures",
    order: 10,
    estimatedMinutes: 25,
    oneSentence:
      "A Higher-Order Function is a function that accepts one or more functions as arguments, returns a function, or both, enabling patterns like currying, composition, and declarative pipelines.",
    whyDoWeNeedIt: {
      problem:
        "Writing repetitive imperative loops for data transformation clutters logic and mixes business rules with traversal mechanics. Higher-order functions abstract iteration into reusable, pure primitives.",
      realWorldAnalogy:
        "An industrial pipe assembly: each segment is a modular transformation unit (filtering sediments, heating water, chlorinating); you compose the pipeline by snapping standard pipe segments together.",
    },
    visualIntuition: `Function Currying & Composition:
Standard Function:
add(1, 2, 3) -> 6

Curried Function (Takes one argument at a time):
curriedAdd(1)(2)(3)
curriedAdd(1)       --> returns fn(b)
curriedAdd(1)(2)    --> returns fn(c)
curriedAdd(1)(2)(3) --> 6

Function Composition (Pipe: Left to Right):
pipe(double, increment, square)(3)
1. double(3)    --> 6
2. increment(6) --> 7
3. square(7)    --> 49`,
    syntax: {
      curry: "const multiply = a => b => a * b;\nconst double = multiply(2);",
      pipe: "const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);",
    },
    example: {
      title: "Building custom higher-order functions, currying, and pipeline composition",
      language: "javascript",
      code: `// 1. Currying demonstration
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
}

function calculateDiscount(discountRate, taxRate, price) {
    const discounted = price - (price * discountRate);
    return discounted + (discounted * taxRate);
}

const curriedDiscount = curry(calculateDiscount);

// Reusable specialized functions through partial application:
const tenPercentDiscount = curriedDiscount(0.10);
const standardFestivePricing = tenPercentDiscount(0.18); // 10% discount + 18% GST

console.log("Final price item 1 ($100):", standardFestivePricing(100)); // 106.2
console.log("Final price item 2 ($500):", standardFestivePricing(500)); // 531

// 2. Function Composition (pipe)
const pipe = (...fns) => initialValue => fns.reduce((val, fn) => fn(val), initialValue);

const trim = str => str.trim();
const toLower = str => str.toLowerCase();
const wrapTag = str => "<p>" + str + "</p>";

const formatText = pipe(trim, toLower, wrapTag);
console.log("Formatted output:", formatText("   AlgoPrimer Educational Platform   "));`,
      explanation:
        "`curry()` transforms a function of $N$ arguments into a chain of $N$ single-argument functions. `pipe()` passes the output of each function as the input to the next, creating readable functional transformation pipelines.",
    },
    howItWorks: [
      {
        step: 1,
        title: "First-Class Citizen Evaluation",
        description: "In JavaScript, functions are instances of `Object` (`Function.prototype`). They can be assigned to variables, passed as arguments, and returned from functions.",
      },
      {
        step: 2,
        title: "Arity Verification",
        description: "`fn.length` reports the number of declared formal parameters. A curry utility checks if accumulated arguments match or exceed `fn.length`.",
      },
      {
        step: 3,
        title: "Reducer Pipeline",
        description: "`pipe` uses `Array.prototype.reduce` to fold a value across an array of functions in left-to-right order.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Impure higher-order functions mutating external state during transformations",
        why: "Mutating shared variables in map/filter callbacks breaks reusability and causes race conditions.",
        correct: "Ensure higher-order callback functions remain pure (deterministic with no side effects).",
      },
    ],
    complexity: {
      time: "O(K) where K is number of functions composed in pipeline",
      space: "O(K) closure frames holding partial arguments",
      explanation: "Each partially applied stage retains its parameters in a lightweight closure.",
    },
    tryItYourself: {
      prompt: "What is the difference between `pipe` (left-to-right) and `compose` (right-to-left) in functional programming?",
      hint: "Look at the order in which functions are evaluated.",
      solutionSnippet: "`pipe(f, g)(x)` evaluates `g(f(x))` (left-to-right, natural reading order). `compose(f, g)(x)` evaluates `f(g(x))` (right-to-left, matching standard mathematical composition $f \circ g$).",
    },
    placementConnection:
      "Writing a general `curry(fn)` utility and implementing `pipe` or `compose` are two of the most common live coding challenges in senior JavaScript and React interviews.",
    quickRevision: [
      "Higher-order functions accept functions as arguments, return functions, or both.",
      "Currying converts `f(a, b, c)` into `f(a)(b)(c)` using closures.",
      "`fn.length` returns the arity (number of expected arguments) of a function.",
      "Use `pipe(...fns)` to compose linear data processing pipelines without nested function parentheses.",
    ],
  },
];
