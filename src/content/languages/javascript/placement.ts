import { Lesson } from "@/types/content";

export const javascriptPlacementLessons: Lesson[] = [
  {
    id: "js-arrays",
    slug: "arrays",
    title: "Array Methods: map, filter, reduce & Mutation Rules",
    track: "javascript",
    topicSlug: "placement",
    topicTitle: "Collections, Web APIs & Placement Patterns",
    order: 21,
    estimatedMinutes: 30,
    oneSentence:
      "JavaScript arrays provide declarative functional methods (`map`, `filter`, `reduce`, `flat`), with strict differentiation between mutating (`sort`, `splice`, `push`) and non-mutating (`toSorted`, `slice`, `concat`) methods.",
    whyDoWeNeedIt: {
      problem:
        "Accidentally mutating an array in-place with `arr.sort()` or `arr.reverse()` mutates state in React/Redux without creating a new reference, silently breaking UI re-renders.",
      realWorldAnalogy:
        "Editing a spreadsheet: non-mutating methods create a new tab with your filtered results; mutating methods scribble over and overwrite the original raw data on sheet 1.",
    },
    visualIntuition: `Mutating vs Non-Mutating Array Methods:
MUTATING (Alters original array in-place!):
- arr.sort()
- arr.reverse()
- arr.splice()
- arr.push() / arr.pop()
- arr.shift() / arr.unshift()

NON-MUTATING (Returns brand-new Array; Safe for React/Redux!):
- arr.map() / arr.filter()
- arr.slice()
- arr.concat()
- arr.flat() / arr.flatMap()
- ES2023 modern additions: arr.toSorted(), arr.toReversed(), arr.toSpliced()`,
    syntax: {
      reduce: "const total = arr.reduce((acc, curr, idx, src) => acc + curr, initialValue);",
      flat: "const flatArr = arr.flat(2); // Flattens 2 levels deep",
    },
    example: {
      title: "Building complex grouping and counting pipelines with Array.prototype.reduce",
      language: "javascript",
      code: `const students = [
    { name: "Aarav", branch: "CSE", cgpa: 9.4 },
    { name: "Diya", branch: "ECE", cgpa: 9.8 },
    { name: "Rohan", branch: "CSE", cgpa: 8.9 },
    { name: "Ananya", branch: "ME", cgpa: 9.1 },
    { name: "Vikram", branch: "ECE", cgpa: 9.2 }
];

// 1. Grouping items by property using reduce
const groupedByBranch = students.reduce((acc, student) => {
    const key = student.branch;
    if (!acc[key]) acc[key] = [];
    acc[key].push(student.name);
    return acc;
}, {});

console.log("Grouped by branch:", groupedByBranch);

// 2. Frequency counting
const branches = students.map(s => s.branch);
const branchCounts = branches.reduce((acc, b) => {
    acc[b] = (acc[b] || 0) + 1;
    return acc;
}, {});
console.log("Branch frequencies:", branchCounts);

// 3. Modern non-mutating sort (toSorted - ES2023)
const numbers = [40, 100, 1, 5, 25, 10];
// Legacy sort (MUTATES numbers!): numbers.sort((a, b) => a - b);
// Modern safe toSorted:
const sortedNumbers = numbers.toSorted ? numbers.toSorted((a, b) => a - b) : [...numbers].sort((a, b) => a - b);
console.log("Original untouched:", numbers);
console.log("Sorted copy:", sortedNumbers);`,
      explanation:
        "`reduce()` is the Swiss-Army knife of array transformations, capable of computing sums, histograms, grouping, and flattening. Using `toSorted()` or `[...arr].sort()` preserves original state.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Callback Invocation Loop",
        description: "Methods like `map` and `filter` iterate through index $0$ to $N-1$, skipping sparse unassigned holes in the array.",
      },
      {
        step: 2,
        title: "Accumulator Passing",
        description: "`reduce` passes the returned value of iteration $i$ as the `acc` argument to iteration $i+1$.",
      },
      {
        step: 3,
        title: "Timsort Implementation",
        description: "V8's `Array.prototype.sort` uses Timsort running in $O(N \log N)$ worst-case and $O(N)$ best-case.",
      },
    ],
    commonMistakes: [
      {
        mistake: "arr.sort() without comparator for numbers: [10, 5, 20].sort() // Gives [10, 20, 5]",
        why: "By default, `.sort()` converts all elements to strings and compares UTF-16 code units! '10' comes before '5'.",
        correct: "arr.sort((a, b) => a - b); // Always pass numeric comparator",
      },
      {
        mistake: "Forgetting initialValue in reduce: arr.reduce((acc, x) => acc + x.score)",
        why: "If `initialValue` is omitted, the first array element is used as `acc`. In an array of objects, `acc` starts as the object `{ score: 10 }`, adding integers to an object!",
        correct: "arr.reduce((acc, x) => acc + x.score, 0);",
      },
    ],
    complexity: {
      time: "O(N) for map/filter/reduce; O(N log N) for sort; O(1) for push/pop; O(N) for shift/unshift",
      space: "O(N) for non-mutating methods that return a new array",
      explanation: "Array transformations run in linear time.",
    },
    tryItYourself: {
      prompt: "Implement a polyfill for `Array.prototype.myReduce` from scratch.",
      hint: "Handle the optional initialValue argument correctly.",
      solutionSnippet: `Array.prototype.myReduce = function(callback, initialValue) {
    let acc = initialValue;
    let startIndex = 0;
    if (acc === undefined) {
        if (this.length === 0) throw new TypeError("Reduce of empty array with no initial value");
        acc = this[0];
        startIndex = 1;
    }
    for (let i = startIndex; i < this.length; i++) {
        if (i in this) acc = callback(acc, this[i], i, this);
    }
    return acc;
};`,
    },
    placementConnection:
      "Implementing polyfills for `Array.prototype.map`, `filter`, `reduce`, and `flat` are classic screening challenges at tech companies.",
    quickRevision: [
      "Always supply `(a, b) => a - b` to `arr.sort()` for numeric sorting.",
      "Always supply an explicit `initialValue` to `arr.reduce()`.",
      "`arr.push`/`pop` are $O(1)$; `arr.shift`/`unshift` are $O(N)$ because they re-index elements.",
      "Prefer non-mutating methods (`slice`, `[...arr].sort()`, `toSorted()`) for React/Redux workflows.",
    ],
  },
  {
    id: "js-map-set",
    slug: "map-set",
    title: "Map, Set, WeakMap & WeakSet",
    track: "javascript",
    topicSlug: "placement",
    topicTitle: "Collections, Web APIs & Placement Patterns",
    order: 22,
    estimatedMinutes: 25,
    oneSentence:
      "`Map` and `Set` provide keyed collections with O(1) lookups and arbitrary key types, while `WeakMap` and `WeakSet` hold weakly-referenced objects that do not prevent garbage collection.",
    whyDoWeNeedIt: {
      problem:
        "Using plain JavaScript objects as hash tables restricts keys to strings/symbols, has prototype pollution risks, and lacks a fast `.size` property.",
      realWorldAnalogy:
        "A regular locker (`Map`): you register a name and take a key; it stays locked forever until you clear it. A temporary hotel keycard (`WeakMap`): if the guest checks out and leaves the hotel (object garbage collected), the lock resets automatically without memory leaks.",
    },
    visualIntuition: `Map vs Plain Object & WeakMap Garbage Collection:
Feature         | Plain Object ({})   | Map (new Map())
----------------+--------------------+-----------------------------
Key Types       | Strings & Symbols  | ANY type (Objects, Functions, Primitives)
Key Order       | Complex (ES6 spec) | Strict insertion order guaranteed
Size Property   | Object.keys(o).len | map.size (O(1) direct property!)
Prototype Risk  | Has prototype keys | Clean hash map without pollution

WeakMap vs Map:
const wm = new WeakMap();
let user = { name: "Aarav" };
wm.set(user, "metadata");
user = null; // Garbage collector CAN RECYCLE user! WeakMap does NOT prevent GC!`,
    syntax: {
      map: "const m = new Map();\nm.set(key, value);\nconst val = m.get(key);\nm.has(key);\nm.delete(key);",
      set: "const s = new Set([1, 2, 2, 3]); // Size is 3 (Deduplicated!)",
      weakMap: "const wm = new WeakMap();\nwm.set(objKey, 'metadata');",
    },
    example: {
      title: "Using Map for non-string keys and WeakMap for private metadata without memory leaks",
      language: "javascript",
      code: `// 1. Map allowing Objects as Keys
const user1 = { id: 101, name: "Aarav" };
const user2 = { id: 102, name: "Diya" };

const visitCounts = new Map();
visitCounts.set(user1, 42);
visitCounts.set(user2, 88);

console.log("Visit count for user1:", visitCounts.get(user1)); // 42
console.log("Map size:", visitCounts.size); // 2

// 2. Set for fast O(1) deduplication and membership
const tagStream = ["react", "node", "react", "dsa", "node", "system-design"];
const uniqueTags = new Set(tagStream);
console.log("Unique tags count:", uniqueTags.size); // 4
console.log("Has 'dsa'?", uniqueTags.has("dsa")); // true (O(1) lookup!)

// 3. WeakMap preventing memory leaks for DOM or cache associations
const privateStorage = new WeakMap();

class SecureSession {
    constructor(secretToken) {
        // Storing secret linked to 'this' instance in WeakMap
        privateStorage.set(this, { token: secretToken, loginTime: Date.now() });
    }

    getToken() {
        return privateStorage.get(this)?.token;
    }
}

let session = new SecureSession("AUTH-XYZ-99");
console.log("Session token:", session.getToken());

// When session is dereferenced, its entry in privateStorage is automatically garbage collected!
session = null;`,
      explanation:
        "`Map` allows using objects (`user1`) directly as keys without stringification. `WeakMap` keys MUST be objects; when those objects lose all other references, the WeakMap entry is automatically freed by the garbage collector.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Deterministic Hash Table",
        description: "V8's `Map` uses a deterministic hash table preserving exact insertion order.",
      },
      {
        step: 2,
        title: "SameValueZero Equality",
        description: "`Map` and `Set` use the `SameValueZero` algorithm: `NaN` is treated as equal to `NaN`, and `+0` is equal to `-0`.",
      },
      {
        step: 3,
        title: "Ephemeron Tables (WeakMap)",
        description: "A `WeakMap` is implemented as an ephemeron table: the key is a weak reference, meaning it does not increase the object's reference counter.",
      },
    ],
    commonMistakes: [
      {
        mistake: "wm.set('stringKey', 'val') // Primitive key in WeakMap",
        why: "WeakMap and WeakSet keys MUST be objects (or non-registered Symbols). Primitives cannot be garbage collected, throwing `TypeError: Invalid value used as weak map key`.",
        correct: "Use standard Map for primitive keys.",
      },
      {
        mistake: "Trying to iterate over a WeakMap: for (const x of wm) // Or wm.size",
        why: "WeakMaps are non-enumerable because the garbage collector operates non-deterministically. WeakMap has no `.size` property and no iteration methods.",
        correct: "Use Map if iteration or size inspection is required.",
      },
    ],
    complexity: {
      time: "O(1) average for get, set, has, and delete in Map and Set",
      space: "O(N) memory for Map/Set; O(1) net memory leak liability for WeakMap",
      explanation: "Constant-time hash lookups.",
    },
    tryItYourself: {
      prompt: "How can you compute the intersection of two Sets in JavaScript in one line?",
      hint: "Convert one set to an array, filter, and construct a new Set.",
      solutionSnippet: "const intersection = new Set([...setA].filter(x => setB.has(x)));",
    },
    placementConnection:
      "LRU Cache implementations in JavaScript using `Map` (leveraging its insertion order and $O(1)$ operations) are frequent interview coding problems.",
    quickRevision: [
      "`Map` accepts any key type (including objects and functions) and maintains insertion order.",
      "`Set` stores unique values with average $O(1)$ `has`, `add`, and `delete`.",
      "`WeakMap`/`WeakSet` keys must be objects and do not prevent garbage collection.",
      "`WeakMap` cannot be iterated and has no `.size` property.",
    ],
  },
  {
    id: "js-modules",
    slug: "modules",
    title: "ES Modules (ESM) vs CommonJS (CJS)",
    track: "javascript",
    topicSlug: "placement",
    topicTitle: "Collections, Web APIs & Placement Patterns",
    order: 23,
    estimatedMinutes: 20,
    oneSentence:
      "ES Modules (`import`/`export`) are static, asynchronous, and analyzed at compile-time to enable tree-shaking, whereas CommonJS (`require`/`module.exports`) is dynamic and synchronous at runtime.",
    whyDoWeNeedIt: {
      problem:
        "Mixing ESM and CommonJS or misunderstanding static analysis leads to `ERR_REQUIRE_ESM` crashes in Node.js and bloated frontend bundle sizes because dead code cannot be tree-shaken.",
      realWorldAnalogy:
        "ESM is a formal cargo manifest submitted before the ship departs (customs knows every item in advance and strips unneeded weight); CommonJS is opening the shipping container on the dock and inspecting goods one by one at delivery time.",
    },
    visualIntuition: `ES Modules (ESM) vs CommonJS (CJS):
Feature          | ES Modules (ESM)                  | CommonJS (CJS)
-----------------+-----------------------------------+-----------------------------------
Syntax           | import / export                   | require() / module.exports
Loading Timing   | Static (parsed at compile time)   | Dynamic (executed synchronously)
Tree Shaking     | Yes! Dead code is pruned by Vite  | No! Dynamic require prevents it
Placement        | Top-level only (unless import())  | Anywhere inside if/loops
Top-Level Await  | Yes! (Supported natively)         | No! (Must wrap in async function)
Browser Support  | Native (<script type="module">)   | Requires bundler (Webpack/Rollup)`,
    syntax: {
      esm: "// utils.js: export const add = (a, b) => a + b;\n// main.js:  import { add } from './utils.js';",
      cjs: "// utils.js: module.exports = { add };\n// main.js:  const { add } = require('./utils');",
    },
    example: {
      title: "Named exports, default exports, dynamic imports, and top-level await in ESM",
      language: "javascript",
      code: `// --- mathUtils.js (ESM Module) ---
// Named exports (Tree-shakeable: bundler only bundles what is imported!)
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// Default export
export default function multiply(a, b) {
    return a * b;
}

// --- app.js (Consumer Module) ---
// Static imports:
import multiply, { add } from "./mathUtils.js";
console.log("Add:", add(5, 3));
console.log("Multiply:", multiply(4, 2));

// Dynamic Import (Code-Splitting for heavy dependencies):
async function loadHeavyAnalytics() {
    // Dynamically imports only when user triggers action
    const { startTracing } = await import("./analytics.js");
    startTracing();
}

// Top-Level Await in modern ESM (No wrapping async function required!):
// const config = await fetch('/api/config').then(r => r.json());`,
      explanation:
        "ESM imports must be placed at the top level because they are resolved before script evaluation begins. For conditional or on-demand loading, dynamic `import('./path.js')` returns a Promise.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Module Construction & Parsing",
        description: "The module loader parses the source file and builds a Module Record, identifying all imports and exports without running code.",
      },
      {
        step: 2,
        title: "Instantiation (Live Binding)",
        description: "Memory locations for exports are allocated and linked. In ESM, imported variables are live read-only references pointing to the exporter's state.",
      },
      {
        step: 3,
        title: "Evaluation Phase",
        description: "The runtime executes the module code to populate the memory locations.",
      },
    ],
    commonMistakes: [
      {
        mistake: "if (condition) { import { feature } from './feature.js'; } // Conditional static import",
        why: "Static `import` statements cannot be placed inside blocks or conditionals because ESM is parsed before runtime.",
        correct: "if (condition) { const { feature } = await import('./feature.js'); }",
      },
      {
        mistake: "Reassigning imported variables: import { count } from './counter.js'; count = 10;",
        why: "ESM imports are read-only live bindings. The importer cannot mutate the imported identifier binding.",
        correct: "Import a mutator function from the module: `setCount(10);`",
      },
    ],
    complexity: {
      time: "Static resolution enables $O(1)$ module lookups and compile-time dead-code elimination (Tree Shaking)",
      space: "Reduces client bundle size significantly by omitting unused export symbols",
      explanation: "Static AST analysis strips unreferenced exports.",
    },
    tryItYourself: {
      prompt: "What happens in CommonJS if module A requires module B, and module B requires module A (Circular Dependency)?",
      hint: "Does CommonJS crash, or return an incomplete object?",
      solutionSnippet: "In CommonJS, circular dependencies do not throw errors; instead, module B receives an unfinished (incomplete/empty) copy of `module.exports` from module A, which can cause runtime `undefined is not a function` errors.",
    },
    placementConnection:
      "Explaining tree-shaking, live bindings vs copy-by-value in CJS, and diagnosing circular module dependencies are core questions for full-stack and systems engineering roles.",
    quickRevision: [
      "ESM (`import`/`export`) is static and asynchronous; CommonJS (`require`/`module.exports`) is dynamic and synchronous.",
      "Tree-shaking is only possible with ESM due to static compile-time analysis.",
      "ESM imports are live read-only bindings to the exported state.",
      "Use dynamic `import()` for lazy loading and code splitting.",
    ],
  },
  {
    id: "js-debounce-throttle",
    slug: "debounce-throttle",
    title: "Debounce & Throttle: Rate-Limiting Event Handlers",
    track: "javascript",
    topicSlug: "placement",
    topicTitle: "Collections, Web APIs & Placement Patterns",
    order: 24,
    estimatedMinutes: 30,
    oneSentence:
      "Debounce delays function execution until a specified delay has elapsed since the last call, while Throttle guarantees execution at most once every specified time interval.",
    whyDoWeNeedIt: {
      problem:
        "High-frequency events like `window.onscroll`, `window.onresize`, or `input.onkeyup` can fire hundreds of times per second, choking the main thread and triggering expensive network API calls or DOM layout thrashing.",
      realWorldAnalogy:
        "Debounce is an elevator door: the timer resets every time someone walks in; the elevator only moves after no one has entered for 5 seconds. Throttle is a theme park turnstile: only one guest is admitted every 10 seconds, regardless of how many people are waiting.",
    },
    visualIntuition: `Debounce vs Throttle Timing Diagram:
Events Fired:  | | | | | |                 | | | |
               ------------------------------------
Debounce (Wait for silence):
Executed:                               X             X
(Runs only after a gap of silence!)

Throttle (Execute at fixed intervals):
Executed:      X          X          X     X          X
(Runs at most once every T milliseconds!)`,
    syntax: {
      debounce: "const debouncedSearch = debounce(fetchResults, 300);",
      throttle: "const throttledScroll = throttle(updateScrollProgress, 100);",
    },
    example: {
      title: "Hand-crafted production implementations of debounce and throttle",
      language: "javascript",
      code: `// 1. Debounce Implementation (Ideal for Search Input autocomplete)
function debounce(fn, delayMs) {
    let timerId = null;

    return function(...args) {
        // Clear any existing timer so we wait for silence
        if (timerId !== null) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            fn.apply(this, args);
            timerId = null;
        }, delayMs);
    };
}

// 2. Throttle Implementation (Ideal for Window Scroll / Resize)
function throttle(fn, intervalMs) {
    let lastExecutionTime = 0;

    return function(...args) {
        const now = Date.now();

        // Check if enough time has elapsed since last run
        if (now - lastExecutionTime >= intervalMs) {
            lastExecutionTime = now;
            fn.apply(this, args);
        }
    };
}

// Verification
const logSearch = query => console.log("API search dispatched for:", query);
const processSearch = debounce(logSearch, 100);

// Simulating rapid typing: "c", "ca", "cam", "campus"
processSearch("c");
processSearch("ca");
processSearch("cam");
processSearch("campus"); // Only THIS final call executes after 100ms silence!`,
      explanation:
        "`debounce` clears the active timer on every call, ensuring the function runs only after the user stops typing. `throttle` checks `Date.now()` against `lastExecutionTime`, ensuring steady paced execution.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Closure State Persistence",
        description: "Both utilities return a wrapper function closing over state variables (`timerId` or `lastExecutionTime`).",
      },
      {
        step: 2,
        title: "Timer Cancellation (Debounce)",
        description: "Whenever invoked before the timeout fires, `clearTimeout` cancels the previous task.",
      },
      {
        step: 3,
        title: "Context Preservation",
        description: "`fn.apply(this, args)` ensures original `this` context and event arguments are forwarded accurately.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Creating a new debounced function inside a React render body",
        why: "On every component re-render, a brand-new debounced wrapper is created with its own independent `timerId`, defeating debounce completely.",
        correct: "Wrap the debounced function in `useCallback` or `useMemo` in React.",
      },
      {
        mistake: "Forgetting fn.apply(this, args) causing loss of event object and this",
        why: "Event callbacks receive synthetic events (`e`) that must be passed through to the debounced function.",
        correct: "Always forward `this` and `args` using `.apply(this, args)`.",
      },
    ],
    complexity: {
      time: "O(1) execution check overhead",
      space: "O(1) closure memory for timer ID or timestamp",
      explanation: "Minimal timer setup and integer comparison.",
    },
    tryItYourself: {
      prompt: "How can you enhance `debounce` to support an `immediate` (leading-edge) execution option?",
      hint: "Execute immediately if no active timer exists, then start the cooldown timer.",
      solutionSnippet: `function debounceLeading(fn, delayMs, immediate = false) {
    let timerId = null;
    return function(...args) {
        const callNow = immediate && !timerId;
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            timerId = null;
            if (!immediate) fn.apply(this, args);
        }, delayMs);
        if (callNow) fn.apply(this, args);
    };
}`,
    },
    placementConnection:
      "Implementing `debounce` and `throttle` from scratch is one of the top 3 most common live frontend coding problems across all tech companies.",
    quickRevision: [
      "Debounce: executes only after a period of silence (e.g. search autocomplete).",
      "Throttle: executes at most once per fixed time interval (e.g. scroll listeners).",
      "Always preserve context and parameters using `fn.apply(this, args)`.",
      "In React, ensure debounced functions are memoized (`useCallback`) to avoid recreation on re-renders.",
    ],
  },
  {
    id: "js-placement-checklist",
    slug: "placement-checklist",
    title: "JavaScript Placement Cheatsheet & Output Tracing",
    track: "javascript",
    topicSlug: "placement",
    topicTitle: "Collections, Web APIs & Placement Patterns",
    order: 25,
    estimatedMinutes: 30,
    oneSentence:
      "A high-yield placement synthesis reviewing the top tricky JavaScript interview patterns, output prediction puzzles, coercion traps, and Big-O complexity bounds.",
    whyDoWeNeedIt: {
      problem:
        "Campus placement technical rounds test edge cases: tricky closures, event loop microtask vs macrotask ordering, object prototype lookups, and implicit type coercion.",
      realWorldAnalogy:
        "A pre-flight cockpit checklist: before taking off into the interview, you verify every switch and instrument so no unexpected turbulence catches you off guard.",
    },
    visualIntuition: `Top 5 Placement Tracing Traps:
1. typeof null === 'object' (Legacy 1995 engine artifact)
2. NaN === NaN is false (Use Number.isNaN(x))
3. 0.1 + 0.2 !== 0.3 (IEEE 754 floating point binary rounding: 0.30000000000000004)
4. Microtasks drain before Macrotasks (Promise.then > setTimeout)
5. 'this' in arrow function is LEXICAL (cannot be rebound with .bind)`,
    syntax: {
      floatingPrecision: "const areEqual = Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON;",
    },
    example: {
      title: "Five quintessential JavaScript placement interview output puzzles",
      language: "javascript",
      code: `// Puzzle 1: Floating Point Quirks
console.log("0.1 + 0.2 === 0.3:", 0.1 + 0.2 === 0.3); // false! (0.30000000000000004)
// Solution: Use Number.EPSILON
const isSafeEqual = Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON;
console.log("Safe equality:", isSafeEqual); // true

// Puzzle 2: Closure inside loop with var
const result = [];
for (var i = 0; i < 3; i++) {
    result.push(() => i);
}
console.log("Output with var:", result.map(f => f())); // [3, 3, 3]!

// Puzzle 3: Array length manipulation (Truncation)
const arr = [1, 2, 3, 4, 5];
arr.length = 2; // Mutates array length!
console.log("Truncated array:", arr); // [1, 2]

// Puzzle 4: Coercion in comparison
console.log("[] == ![]:", [] == ![]); // true!
// Step 1: ![] becomes false (arrays are truthy objects)
// Step 2: [] == false
// Step 3: [] becomes "", "" becomes 0, false becomes 0 -> 0 == 0 -> true!

// Puzzle 5: Object key stringification
const a = {}, b = { key: "b" }, c = { key: "c" };
a[b] = 123; // b coerces to "[object Object]"
a[c] = 456; // c coerces to "[object Object]" -> OVERWRITES previous key!
console.log("a[b]:", a[b]); // 456! (Both keys are '[object Object]')`,
      explanation:
        "These 5 puzzles test fundamental engine mechanics: IEEE 754 precision, function vs block scoping, mutable array length descriptors, multi-step loose coercion, and object key stringification.",
    },
    howItWorks: [
      {
        step: 1,
        title: "IEEE 754 Float Math",
        description: "Decimal numbers like 0.1 have repeating infinite binary fractions, resulting in fractional rounding errors.",
      },
      {
        step: 2,
        title: "Object Key Stringification",
        description: "When using plain objects as dictionaries, non-string keys are converted via `toString()`. All plain objects become `[object Object]`.",
      },
      {
        step: 3,
        title: "Garbage Collection & Finalization",
        description: "Engines use mark-and-sweep garbage collection starting from global roots to free unreachable objects.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Comparing floating point numbers directly: if (price === 0.3)",
        why: "Rounding errors cause direct equality checks to fail.",
        correct: "if (Math.abs(price - 0.3) < Number.EPSILON)",
      },
      {
        mistake: "Using objects as keys in plain objects: obj[item] = val",
        why: "All objects stringify to `[object Object]`, overwriting each other.",
        correct: "Use Map: const map = new Map(); map.set(item, val);",
      },
    ],
    complexity: {
      time: "Reference summary across common operations",
      space: "Reference summary across engine allocations",
      explanation: "Essential Big-O cheatsheet for interview quick reference.",
    },
    tryItYourself: {
      prompt: "What does `1 < 2 < 3` vs `3 > 2 > 1` evaluate to in JavaScript?",
      hint: "Remember that operators evaluate left-to-right, and booleans coerce to numbers.",
      solutionSnippet: "`1 < 2 < 3` evaluates as `(1 < 2) < 3` &rarr; `true < 3` &rarr; `1 < 3` &rarr; `true`. BUT `3 > 2 > 1` evaluates as `(3 > 2) > 1` &rarr; `true > 1` &rarr; `1 > 1` &rarr; `false`!",
    },
    placementConnection:
      "Output prediction questions testing operator precedence and coercion are guaranteed screening questions in technical aptitude and interview rounds.",
    quickRevision: [
      "Use `Number.EPSILON` when comparing floating point numbers.",
      "Use `Map` instead of plain `{}` when keys are objects to prevent `[object Object]` key collisions.",
      "Array `.length` is a writable property; reducing `.length` truncates elements in-place.",
      "`[] == ![]` is `true` due to explicit multi-step ToPrimitive and ToNumber coercion rules.",
    ],
  },
];
