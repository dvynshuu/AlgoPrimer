import { Lesson } from "@/types/content";

export const javascriptAsyncLessons: Lesson[] = [
  {
    id: "js-event-loop",
    slug: "event-loop",
    title: "The Event Loop: Call Stack, Microtasks & Macrotasks",
    track: "javascript",
    topicSlug: "async",
    topicTitle: "Asynchronous JavaScript & Event Loop",
    order: 16,
    estimatedMinutes: 30,
    oneSentence:
      "The Event Loop coordinates JavaScript execution by continuously checking if the Call Stack is empty, draining all pending Microtasks (Promises) before picking the next Macrotask (setTimeout/I/O).",
    whyDoWeNeedIt: {
      problem:
        "Without an Event Loop, synchronous long-running operations would freeze the browser UI, making buttons unclickable and pages completely unresponsive.",
      realWorldAnalogy:
        "A doctor's emergency triage queue: the doctor (Call Stack) attends to the patient in the room; when finished, emergency urgent orders (Microtasks) MUST ALL be reviewed before calling in the next scheduled appointment from the waiting lobby (Macrotasks).",
    },
    visualIntuition: `The Event Loop Priority Architecture:
[ 1. Call Stack (Synchronous Code) ]
  Executes scripts until Call Stack is completely EMPTY!
           |
           v
[ 2. Microtask Queue (HIGHEST ASYNC PRIORITY!) ]
  - Promise callbacks (.then, .catch, .finally)
  - queueMicrotask()
  - process.nextTick() (Node.js highest tier)
  * MUST DRAIN COMPLETELY before moving to Macrotasks!
           |
           v
[ 3. Macrotask (Task) Queue (LOWER PRIORITY) ]
  - setTimeout, setInterval
  - setImmediate (Node.js)
  - I/O polling, DOM events
  * Picks ONE Macrotask, executes it, then checks Microtasks again!`,
    syntax: {
      queues: "setTimeout(() => { /* Macrotask */ }, 0);\nPromise.resolve().then(() => { /* Microtask */ });\nqueueMicrotask(() => { /* Microtask */ });",
    },
    example: {
      title: "The classic event loop execution order challenge",
      language: "javascript",
      code: `console.log("1: Synchronous start");

setTimeout(() => {
    console.log("2: Macrotask (setTimeout 0ms)");
}, 0);

Promise.resolve().then(() => {
    console.log("3: Microtask 1 (Promise.then)");
}).then(() => {
    console.log("4: Microtask 2 (Chained Promise)");
});

queueMicrotask(() => {
    console.log("5: Microtask 3 (queueMicrotask)");
});

console.log("6: Synchronous end");

// Predicted Output:
// 1: Synchronous start
// 6: Synchronous end
// 3: Microtask 1 (Promise.then)
// 5: Microtask 3 (queueMicrotask)
// 4: Microtask 2 (Chained Promise)
// 2: Macrotask (setTimeout 0ms)`,
      explanation:
        "Synchronous logs (1, 6) execute first. Before `setTimeout` (Macrotask) can run, the Event Loop drains ALL Microtasks (3, 5, 4). Only when the Microtask queue is completely empty does `setTimeout` (2) execute.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Call Stack Execution",
        description: "The engine runs all synchronous top-level code on the Call Stack.",
      },
      {
        step: 2,
        title: "Microtask Queue Drain",
        description: "Once the Call Stack empties, the Event Loop executes microtasks one by one. If a microtask schedules another microtask, it is executed in the SAME tick until the microtask queue is empty.",
      },
      {
        step: 3,
        title: "Render Phase (Browser)",
        description: "If needed, the browser updates UI rendering and layout calculations.",
      },
      {
        step: 4,
        title: "Macrotask Execution",
        description: "The Event Loop dequeues the oldest macrotask, pushes it to the Call Stack, and runs it to completion before checking microtasks again.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Assuming setTimeout(fn, 0) runs immediately after the current line",
        why: "`setTimeout(fn, 0)` is a macrotask; it will never execute before any pending synchronous code or microtasks (Promise callbacks).",
        correct: "Expect setTimeout to run after the current Call Stack and all microtasks complete.",
      },
      {
        mistake: "Infinite microtask loops: function loop() { Promise.resolve().then(loop); }",
        why: "Because microtasks drain completely before any macrotasks or UI rendering can occur, an infinite microtask loop starves the engine and completely freezes the browser.",
        correct: "Use `setTimeout` if work needs to yield control to the UI or macrotask queue.",
      },
    ],
    complexity: {
      time: "O(1) queue push/pop overhead",
      space: "O(K) queue nodes in memory for scheduled callbacks",
      explanation: "Constant-time FIFO queue operations.",
    },
    tryItYourself: {
      prompt: "What happens if a `Promise.then` callback returns another resolved Promise? Does the next chained `.then` run in the current microtask cycle?",
      hint: "Remember that resolving a Promise inside a microtask queues a new microtask.",
      solutionSnippet: "It enqueues a new microtask onto the existing microtask queue. Since the event loop does not move to macrotasks until the microtask queue is completely drained, the newly chained `.then` still executes before any `setTimeout` macrotask.",
    },
    placementConnection:
      "Predicting the exact console output of a snippet mixing `console.log`, `setTimeout`, `Promise.resolve().then`, and `async/await` is a universal interview question at Amazon, Microsoft, and Meta.",
    quickRevision: [
      "Synchronous code runs first on the Call Stack until empty.",
      "Microtasks (`Promise.then`, `queueMicrotask`) have strict priority over Macrotasks (`setTimeout`).",
      "The Event Loop drains the ENTIRE Microtask queue before picking the next Macrotask.",
      "`setTimeout(..., 0)` does not mean '0ms immediately'; it means 'execute after all current sync code and microtasks'.",
    ],
  },
  {
    id: "js-callbacks",
    slug: "callbacks",
    title: "Asynchronous Callbacks & Inversion of Control",
    track: "javascript",
    topicSlug: "async",
    topicTitle: "Asynchronous JavaScript & Event Loop",
    order: 17,
    estimatedMinutes: 20,
    oneSentence:
      "Callbacks are functions passed as arguments to asynchronous APIs to be invoked upon task completion, but deep nesting leads to 'Callback Hell' and fragile error handling.",
    whyDoWeNeedIt: {
      problem:
        "Inversion of Control: when you pass a callback to a third-party library, you trust that library to call your callback correctly, not call it twice, not forget to call it, and handle errors properly.",
      realWorldAnalogy:
        "Giving a contractor your credit card and house key: you hand over full control (Inversion of Control) and hope they execute work honestly without overcharging or disappearing.",
    },
    visualIntuition: `Callback Hell (Pyramid of Doom):
getUser(userId, function(err, user) {
    if (err) return handleError(err);
    getOrders(user.id, function(err, orders) {
        if (err) return handleError(err);
        getDetails(orders[0].id, function(err, details) {
            if (err) return handleError(err);
            processPayment(details, function(err, receipt) {
                // Nested 4 levels deep!
                // Hard to read, fragile error propagation!
            });
        });
    });
});`,
    syntax: {
      nodePattern: "fs.readFile('data.txt', 'utf8', (err, data) => {\n    if (err) return console.error(err);\n    console.log(data);\n});",
    },
    example: {
      title: "Error-first callback convention and Promisifying a callback API",
      language: "javascript",
      code: `// 1. Error-First Callback Pattern (Node.js standard convention)
function fetchUserRecord(id, callback) {
    setTimeout(() => {
        if (id <= 0) {
            callback(new Error("Invalid student ID"), null);
            return;
        }
        callback(null, { id, name: "Aarav", branch: "CSE" });
    }, 100);
}

fetchUserRecord(101, (err, user) => {
    if (err) {
        console.error("Error fetching user:", err.message);
        return;
    }
    console.log("User record received:", user);
});

// 2. Promisification: Wrapping a callback API into a modern Promise
function fetchUserPromise(id) {
    return new Promise((resolve, reject) => {
        fetchUserRecord(id, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

fetchUserPromise(102)
    .then(user => console.log("Promisified user:", user.name))
    .catch(err => console.error("Caught error:", err.message));`,
      explanation:
        "The error-first convention (`callback(err, result)`) was the historical standard in Node.js. Wrapping callback functions in `new Promise((resolve, reject) => ...)` transforms legacy APIs into modern thenable structures.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Registration in Host Environment",
        description: "The asynchronous function registers the timer or I/O request with the browser Web API or Node.js thread pool.",
      },
      {
        step: 2,
        title: "Event Loop Queue Insertion",
        description: "Upon operation completion, the host pushes the callback into the Macrotask Queue.",
      },
      {
        step: 3,
        title: "Execution & Error Guarding",
        description: "The callback checks the `err` argument first before operating on data payload.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Calling callback twice or forgetting return after error: if (err) callback(err); callback(null, data);",
        why: "Without `return`, both callbacks execute, causing duplicate logic runs and corrupted state.",
        correct: "if (err) return callback(err);",
      },
    ],
    complexity: {
      time: "O(1) callback registration",
      space: "O(D) closure stack depth in deeply nested pyramids",
      explanation: "Deep nesting retains outer scope variables across multiple frames.",
    },
    tryItYourself: {
      prompt: "Implement a utility `promisify(fn)` that converts any Node.js error-first callback function into a function returning a Promise.",
      hint: "Return a new function that returns a Promise and passes a custom `(err, data)` callback to `fn`.",
      solutionSnippet: `function promisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    };
}`,
    },
    placementConnection:
      "Writing a custom `promisify` utility from scratch and discussing Inversion of Control are standard JavaScript senior interview questions.",
    quickRevision: [
      "Callbacks pass a completion function to asynchronous operations.",
      "The error-first convention passes `(err, result)` as the standard callback signature.",
      "Callback Hell causes deeply nested pyramids of code and fragile error handling.",
      "Modern JavaScript solves callback issues using Promises and `async/await`.",
    ],
  },
  {
    id: "js-promises",
    slug: "promises",
    title: "Promises, Chaining & Lifecycle States",
    track: "javascript",
    topicSlug: "async",
    topicTitle: "Asynchronous JavaScript & Event Loop",
    order: 18,
    estimatedMinutes: 30,
    oneSentence:
      "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation, existing in one of three states: pending, fulfilled, or rejected.",
    whyDoWeNeedIt: {
      problem:
        "Callbacks suffer from Inversion of Control. Promises invert this back by returning a trustable token object that guarantees it will resolve only once, execute asynchronously, and catch unhandled exceptions.",
      realWorldAnalogy:
        "A restaurant buzzer pager: you order food at the counter and receive a vibrating buzzer (Promise). It sits silent while cooking (`pending`), buzzes green when food is ready (`fulfilled`), or buzzes red if an ingredient is sold out (`rejected`).",
    },
    visualIntuition: `Promise State Machine:
                  +---> fulfilled (resolve(value)) ---> .then(onFulfilled)
                  |
[ pending State ] +
                  |
                  +---> rejected (reject(error))   ---> .catch(onRejected)

Key Invariants:
- A Promise can transition from pending to fulfilled/rejected ONCE!
- Once settled, its state and value are immutable forever.
- .then() ALWAYS returns a BRAND-NEW Promise, enabling linear chaining!`,
    syntax: {
      creation: "const p = new Promise((resolve, reject) => {\n    if (success) resolve(data);\n    else reject(new Error('Failed'));\n});",
      chaining: "p.then(step1).then(step2).catch(handleErr).finally(cleanup);",
    },
    example: {
      title: "Promise creation, sequential linear chaining, and centralized error catching",
      language: "javascript",
      code: `function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId <= 0) {
                reject(new Error("Invalid student ID: " + userId));
            } else {
                resolve({ id: userId, username: "aarav_s" });
            }
        }, 50);
    });
}

function fetchUserCourses(user) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ ...user, enrolled: ["DSA", "Web Dev", "OS"] });
        }, 50);
    });
}

// Linear Promise Chaining (Replaces Callback Hell!)
fetchUserData(101)
    .then(user => {
        console.log("Step 1: User fetched ->", user.username);
        // Returning a Promise seamlessly chains to the next .then!
        return fetchUserCourses(user);
    })
    .then(userWithCourses => {
        console.log("Step 2: Courses fetched ->", userWithCourses.enrolled.join(", "));
        return userWithCourses.enrolled.length;
    })
    .then(courseCount => {
        console.log("Step 3: Total courses enrolled:", courseCount);
    })
    .catch(err => {
        // Single centralized catch block handles errors from ANY step above!
        console.error("Pipeline failed:", err.message);
    })
    .finally(() => {
        console.log("Pipeline finalized: Audit complete.");
    });`,
      explanation:
        "Every `.then()` returns a new Promise. Returning a value in a `.then()` automatically resolves the next Promise with that value; returning a Promise awaits that inner Promise before proceeding.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Executor Execution",
        description: "The executor function `(resolve, reject) => ...` executes synchronously immediately upon `new Promise(...)` instantiation.",
      },
      {
        step: 2,
        title: "Settlement & State Locking",
        description: "Calling `resolve(val)` or `reject(err)` transitions the state from `pending` to `fulfilled`/`rejected`. Subsequent calls to `resolve`/`reject` are silently ignored.",
      },
      {
        step: 3,
        title: "Microtask Queue Dispatch",
        description: "When settled, registered `.then()` and `.catch()` callbacks are pushed onto the Microtask Queue to be executed asynchronously.",
      },
    ],
    commonMistakes: [
      {
        mistake: "The 'Promise Hell' anti-pattern: nesting .then() inside .then()",
        why: "Nesting `.then()` calls inside each other recreates the exact pyramid shape of callback hell.",
        correct: "Return the inner promise from .then() and chain linearly at the top level.",
      },
      {
        mistake: "Forgetting to return a promise from inside a .then() handler",
        why: "Without `return nextPromise`, the subsequent `.then()` receives `undefined` immediately without waiting for `nextPromise`.",
        correct: "return nextPromise;",
      },
    ],
    complexity: {
      time: "O(1) creation and resolution dispatch",
      space: "O(1) promise object memory + registered microtask callbacks",
      explanation: "Lightweight object wrapper with microtask queue dispatch.",
    },
    tryItYourself: {
      prompt: "What does `Promise.resolve(42).then()` return if no callback function is passed to `.then()`?",
      hint: "What happens during Promise value-passing fallthrough?",
      solutionSnippet: "It returns a new Promise resolved with the exact same value (`42`). If a non-function is passed to `.then(null)`, the value falls through to the next `.then()` in the chain.",
    },
    placementConnection:
      "Writing a custom `Promise` polyfill (implementing `.then`, state transitions, and asynchronous microtask resolution) is a frequent question at Tier-1 companies.",
    quickRevision: [
      "A Promise has 3 states: `pending`, `fulfilled`, `rejected`.",
      "Once settled, a Promise's state and value are immutable.",
      "Every call to `.then()` returns a brand-new Promise, enabling linear chaining.",
      "A single `.catch()` at the end of a chain catches rejections from any preceding step.",
    ],
  },
  {
    id: "js-async-await",
    slug: "async-await",
    title: "async / await & Structured Error Handling",
    track: "javascript",
    topicSlug: "async",
    topicTitle: "Asynchronous JavaScript & Event Loop",
    order: 19,
    estimatedMinutes: 25,
    oneSentence:
      "`async`/`await` provides syntactic sugar on top of Promises and generators, allowing asynchronous code to be written and read like synchronous procedural code using standard `try...catch` blocks.",
    whyDoWeNeedIt: {
      problem:
        "Long chains of `.then()` callbacks make conditional logic, error handling, and variable scoping awkward across distinct steps.",
      realWorldAnalogy:
        "Reading a recipe: instead of instructions saying 'put cake in oven, and when the timer rings in step 4 go read paragraph 12 for the frosting', the recipe reads step 1, step 2, step 3 cleanly in order.",
    },
    visualIntuition: `async / await Mechanics:
async function loadData() {
    console.log("Start");
    const res = await fetch(url); // PAUSES execution of this function!
    console.log("End");           // Resumes when Promise resolves!
}

Under the Hood:
- 'async' wraps return value in Promise.resolve()
- 'await' pauses function execution and registers remaining body as Microtask
- Main Call Stack is FREED to run other events while waiting!`,
    syntax: {
      functionSyntax: "async function getData() {\n    try {\n        const res = await apiCall();\n        return res;\n    } catch (err) {\n        console.error(err);\n    }\n}",
      arrowSyntax: "const load = async () => { const data = await fetch(); };",
    },
    example: {
      title: "Sequential vs Concurrent execution and structured try/catch error handling",
      language: "javascript",
      code: `const mockApi = (data, delayMs, shouldFail = false) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) reject(new Error("API Error: " + data));
            else resolve(data);
        }, delayMs);
    });
};

// 1. Clean procedural reading with try...catch
async function runStudentPipeline(studentId) {
    try {
        console.log("Initiating pipeline...");
        const student = await mockApi({ id: studentId, name: "Aarav" }, 50);
        console.log("Student verified:", student.name);

        const rank = await mockApi("Rank: Top 5%", 50);
        console.log("Academic standing:", rank);

        return { student, rank, status: "Eligible for Placement" };
    } catch (error) {
        console.error("Pipeline encountered exception:", error.message);
        throw error; // Re-throw or handle gracefully
    } finally {
        console.log("Cleanup: Pipeline session closed.\\n");
    }
}

// 2. The Sequential vs Concurrent await Pitfall!
async function demoConcurrency() {
    // SLOW Sequential (Takes 50 + 50 = 100ms):
    const t0 = Date.now();
    const task1 = await mockApi("A", 50);
    const task2 = await mockApi("B", 50);
    console.log("Sequential done in:", Date.now() - t0, "ms");

    // FAST Concurrent (Takes max(50, 50) = 50ms):
    const t1 = Date.now();
    const promiseA = mockApi("A", 50);
    const promiseB = mockApi("B", 50);
    const [resA, resB] = await Promise.all([promiseA, promiseB]);
    console.log("Concurrent done in:", Date.now() - t1, "ms (Twice as fast!)");
}

runStudentPipeline(101).then(() => demoConcurrency());`,
      explanation:
        "`await` pauses function execution until the promise settles, without blocking the browser thread. Firing independent promises first and then `await Promise.all()` runs tasks concurrently rather than sequentially.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Implicit Promise Wrapping",
        description: "An `async` function always returns a Promise. If a non-promise value is returned, it is automatically wrapped in `Promise.resolve(val)`.",
      },
      {
        step: 2,
        title: "Generator State Suspension",
        description: "When the engine hits `await`, it suspends the async function's execution frame and yields control back to the event loop.",
      },
      {
        step: 3,
        title: "Microtask Resume",
        description: "When the awaited Promise resolves, the remainder of the async function is queued as a microtask and resumed on the Call Stack.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Sequential await in loops when operations are independent",
        why: "Calling `await` inside a standard for-loop forces each HTTP request to wait for the previous one, multiplying total latency by $N$.",
        correct: "Use `await Promise.all(items.map(fetchItem))` to run independent requests concurrently.",
      },
      {
        mistake: "Forgetting try/catch around await calls (Unhandled Promise Rejections)",
        why: "A rejected awaited promise throws an exception. If unhandled, it triggers an `UnhandledPromiseRejection` process warning or crash.",
        correct: "Always wrap await calls in try/catch or chain a `.catch()` on the caller.",
      },
    ],
    complexity: {
      time: "Sequential: sum of delays | Concurrent with Promise.all: max delay of batch",
      space: "O(1) stack memory per suspended async coroutine frame",
      explanation: "Coroutines yield without consuming Call Stack execution resources while paused.",
    },
    tryItYourself: {
      prompt: "What does an `async` function return if it does not contain a `return` statement?",
      hint: "Remember that all async functions return a Promise.",
      solutionSnippet: "It returns a Promise that resolves to `undefined`: `Promise.resolve(undefined)`.",
    },
    placementConnection:
      "Spotting unnecessary sequential `await` calls and converting them into concurrent `Promise.all` batches is tested in frontend performance optimization interviews.",
    quickRevision: [
      "`async` functions always return a Promise.",
      "`await` pauses only the enclosing async function, never the main thread.",
      "Use `try...catch...finally` for structured asynchronous error handling.",
      "Do not sequentially `await` independent promises; use `Promise.all` for concurrency.",
    ],
  },
  {
    id: "js-promise-combinators",
    slug: "promise-combinators",
    title: "Promise Combinators: all, allSettled, race & any",
    track: "javascript",
    topicSlug: "async",
    topicTitle: "Asynchronous JavaScript & Event Loop",
    order: 20,
    estimatedMinutes: 25,
    oneSentence:
      "JavaScript provides four static Promise combinators (`all`, `allSettled`, `race`, `any`) to coordinate concurrent asynchronous tasks under different success and failure strategies.",
    whyDoWeNeedIt: {
      problem:
        "Fetching data from 3 APIs: if one fails, do you abort all 3 (`Promise.all`), keep the 2 successful ones (`Promise.allSettled`), take whichever server responds fastest (`Promise.race`), or accept the first successful one (`Promise.any`)?",
      realWorldAnalogy:
        "Hiring contractors: `Promise.all` = all 4 builders must complete work or project fails; `Promise.allSettled` = wait for all 4 to finish and get an inspection report on who succeeded; `Promise.race` = fastest builder gets paid; `Promise.any` = accept the first successful design.",
    },
    visualIntuition: `Promise Combinators Comparison Matrix:
Method               | Resolves When:                       | Rejects When:
---------------------+--------------------------------------+-----------------------------------
Promise.all          | ALL promises fulfill                 | ANY promise rejects (Fail Fast!)
Promise.allSettled   | ALL promises settle (never rejects!) | Never rejects (Returns status array)
Promise.race         | FIRST promise settles (fastest!)     | FIRST promise settles (if it fails)
Promise.any          | FIRST promise fulfills               | ALL promises reject (AggregateError)`,
    syntax: {
      all: "const [a, b] = await Promise.all([p1, p2]);",
      allSettled: "const results = await Promise.allSettled([p1, p2]);",
      race: "const fastest = await Promise.race([p1, p2]);",
      any: "const firstOk = await Promise.any([p1, p2]);",
    },
    example: {
      title: "Demonstrating all, allSettled, race timeout pattern, and any",
      language: "javascript",
      code: `const fastSuccess = new Promise(res => setTimeout(() => res("Fast Server"), 100));
const slowSuccess = new Promise(res => setTimeout(() => res("Slow Server"), 300));
const failure = new Promise((_, rej) => setTimeout(() => rej(new Error("Database Down")), 150));

// 1. Promise.allSettled: Resilient batch loading (Never fails the whole batch!)
Promise.allSettled([fastSuccess, failure, slowSuccess])
    .then(results => {
        console.log("--- allSettled Results ---");
        results.forEach((r, idx) => {
            if (r.status === "fulfilled") {
                console.log("Task", idx, "succeeded:", r.value);
            } else {
                console.log("Task", idx, "failed:", r.reason.message);
            }
        });
    });

// 2. Promise.race for Network Timeout:
function timeout(ms) {
    return new Promise((_, rej) => setTimeout(() => rej(new Error("Request Timed Out")), ms));
}

// Races slowSuccess (300ms) against 200ms timeout
Promise.race([slowSuccess, timeout(200)])
    .then(res => console.log("Race result:", res))
    .catch(err => console.log("Race caught:", err.message)); // Request Timed Out!

// 3. Promise.any: First SUCCESSFUL response
Promise.any([failure, fastSuccess, slowSuccess])
    .then(firstSuccess => console.log("Promise.any first success:", firstSuccess)) // "Fast Server"
    .catch(err => console.error("All failed:", err.errors));`,
      explanation:
        "`Promise.allSettled` is ideal for dashboards where partial failures should still render successful widgets. `Promise.race` is the standard pattern for enforcing network request timeouts.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Counter & Accumulator Initialization",
        description: "The combinator creates an internal result array and counter tracking settled/fulfilled promises.",
      },
      {
        step: 2,
        title: "Short-Circuit Conditions",
        description: "`Promise.all` immediately rejects on the first rejection; `Promise.race` immediately resolves/rejects on the first settlement.",
      },
      {
        step: 3,
        title: "Aggregate Error Assembly",
        description: "If all promises reject in `Promise.any`, it constructs an `AggregateError` containing an `.errors` array.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Using Promise.all for independent analytics calls where 1 failure aborts all",
        why: "If one analytics endpoint 500s, `Promise.all` rejects immediately, dropping data from all other working endpoints.",
        correct: "Use Promise.allSettled for independent tasks.",
      },
    ],
    complexity: {
      time: "Concurrent execution; overall time is max(delays) for all/allSettled, or min(delays) for race/any",
      space: "O(K) results array where K is count of promises",
      explanation: "Executes all promises concurrently on the underlying host threads.",
    },
    tryItYourself: {
      prompt: "Implement a polyfill for `Promise.allSettled` using `Promise.all`.",
      hint: "Transform every promise so that whether it resolves or rejects, it always resolves with `{ status, value/reason }`.",
      solutionSnippet: `function myAllSettled(promises) {
    return Promise.all(
        promises.map(p =>
            Promise.resolve(p)
                .then(value => ({ status: "fulfilled", value }))
                .catch(reason => ({ status: "rejected", reason }))
        )
    );
}`,
    },
    placementConnection:
      "Writing polyfills for `Promise.all` and `Promise.allSettled` is one of the top 5 most frequently asked live coding problems at FAANG/Tier-1 frontend interviews.",
    quickRevision: [
      "`Promise.all`: Fails fast if any promise rejects; succeeds when all fulfill.",
      "`Promise.allSettled`: Waits for all promises to settle; never rejects.",
      "`Promise.race`: Settles as soon as the first promise settles (fastest fulfill or reject).",
      "`Promise.any`: Resolves as soon as the first promise fulfills; rejects with `AggregateError` only if all fail.",
    ],
  },
];
