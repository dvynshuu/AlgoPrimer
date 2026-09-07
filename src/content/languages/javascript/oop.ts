import { Lesson } from "@/types/content";

export const javascriptOopLessons: Lesson[] = [
  {
    id: "js-objects",
    slug: "objects",
    title: "Objects, Property Descriptors & Immutability",
    track: "javascript",
    topicSlug: "oop",
    topicTitle: "Objects, Prototypes & Modern OOP",
    order: 11,
    estimatedMinutes: 25,
    oneSentence:
      "JavaScript objects are dynamic dictionary collections of keyed properties governed by property descriptors (`writable`, `enumerable`, `configurable`) and immutability levels.",
    whyDoWeNeedIt: {
      problem:
        "Standard object properties can be overwritten, deleted, or enumerated unintentionally. Understanding property descriptors allows library authors to lock properties and control enumeration.",
      realWorldAnalogy:
        "A bank vault safe deposit box with tiered security locks: you can choose if the box contents can be replaced (`writable`), listed in the public directory (`enumerable`), or closed and discarded (`configurable`).",
    },
    visualIntuition: `Object Immutability Levels:
Object.preventExtensions(obj):
  [ X ] Cannot add new properties
  [ V ] Can delete existing properties
  [ V ] Can modify existing properties

Object.seal(obj):
  [ X ] Cannot add new properties
  [ X ] Cannot delete properties (configurable: false)
  [ V ] Can modify existing properties (if writable: true)

Object.freeze(obj) (Highest Standard Protection):
  [ X ] Cannot add new properties
  [ X ] Cannot delete properties
  [ X ] Cannot modify properties (writable: false, configurable: false)
  * Note: Object.freeze is SHALLOW! Nested objects remain mutable!`,
    syntax: {
      defineProp: "Object.defineProperty(obj, 'key', {\n    value: 42,\n    writable: false,\n    enumerable: false,\n    configurable: false\n});",
      freeze: "Object.freeze(obj);\nObject.seal(obj);",
    },
    example: {
      title: "Custom property descriptors and deep freeze implementation",
      language: "javascript",
      code: `const config = {};

// 1. Defining property with strict descriptor attributes
Object.defineProperty(config, "API_KEY", {
    value: "SEC-994821",
    writable: false,      // Read-only! Cannot be modified
    enumerable: true,     // Visible in Object.keys() and JSON.stringify
    configurable: false   // Cannot be deleted or reconfigured
});

console.log("API_KEY:", config.API_KEY);
// config.API_KEY = "HACKED"; // Throws TypeError in strict mode or silently fails

// 2. Shallow vs Deep Freeze
const company = {
    name: "TechCorp",
    location: {
        city: "Bengaluru",
        pincode: 560001
    }
};

Object.freeze(company);
company.name = "NewCorp"; // Fails: company is frozen
company.location.city = "Mumbai"; // MUTATES! Nested objects are NOT frozen by default!
console.log("Location city mutated:", company.location.city);

// Deep Freeze Utility
function deepFreeze(obj) {
    Object.keys(obj).forEach(prop => {
        if (typeof obj[prop] === "object" && obj[prop] !== null) {
            deepFreeze(obj[prop]);
        }
    });
    return Object.freeze(obj);
}

deepFreeze(company);
// company.location.city = "Delhi"; // Now protected!`,
      explanation:
        "`Object.defineProperty` grants control over property behavior. `Object.freeze()` only operates shallowly; nested child objects must be recursively frozen to achieve full deep immutability.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Internal Slot Initialization",
        description: "Every property stores values along with hidden boolean flags: `[[Writable]]`, `[[Enumerable]]`, and `[[Configurable]]`.",
      },
      {
        step: 2,
        title: "Descriptor Enforcement",
        description: "When an assignment like `obj.key = newVal` occurs, the engine checks `[[Writable]]`. If false, it triggers an error in strict mode.",
      },
      {
        step: 3,
        title: "Enumeration Filtering",
        description: "`Object.keys()` and `for...in` filter properties where `[[Enumerable]]` is false.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Assuming const user = {} makes the user object immutable",
        why: "`const` only prevents rebinding the identifier `user`. All properties inside `user` remain completely mutable.",
        correct: "Use Object.freeze(user) for shallow immutability, or deepFreeze(user) for nested structures.",
      },
    ],
    complexity: {
      time: "O(1) property access and descriptor check",
      space: "O(1) metadata per property in V8 Shape/Map layout",
      explanation: "V8 uses Hidden Classes (Shapes) to optimize property lookups into fixed offset reads.",
    },
    tryItYourself: {
      prompt: "What is the difference between `Object.freeze()` and `Object.seal()` in JavaScript?",
      hint: "Can existing properties be modified in `Object.seal()`?",
      solutionSnippet: "In `Object.seal()`, existing properties can still be modified (as long as `writable: true`), but no new properties can be added and no properties can be deleted. In `Object.freeze()`, properties are additionally made read-only (`writable: false`), preventing any modifications.",
    },
    placementConnection:
      "Deep freeze implementations and explaining the difference between `Object.seal` and `Object.freeze` frequently appear in senior full-stack interview rounds.",
    quickRevision: [
      "Property descriptors have 4 attributes: `value`, `writable`, `enumerable`, and `configurable`.",
      "`Object.preventExtensions` &rarr; `Object.seal` &rarr; `Object.freeze` (least to most restrictive).",
      "`Object.freeze()` is strictly shallow; nested objects must be recursively frozen.",
      "`const` protects the variable binding; `Object.freeze()` protects the object properties.",
    ],
  },
  {
    id: "js-destructuring-spread",
    slug: "destructuring-spread",
    title: "Destructuring, Spread (...) & Rest Operators",
    track: "javascript",
    topicSlug: "oop",
    topicTitle: "Objects, Prototypes & Modern OOP",
    order: 12,
    estimatedMinutes: 25,
    oneSentence:
      "Destructuring unpacks values from arrays or properties from objects into distinct variables, while the spread operator expands iterables and rest gathers remaining elements.",
    whyDoWeNeedIt: {
      problem:
        "Extracting 5 properties from an API response object manually (`const a = res.data.a; const b = res.data.b;`) produces verbose, error-prone boilerplate.",
      realWorldAnalogy:
        "Unpacking a delivered lunchbox: instead of reaching into the bag to retrieve every sandwich, fork, and drink one by one with a separate trip, you dump the designated slots straight onto your desk tray.",
    },
    visualIntuition: `Destructuring & Spread Syntax:
Object Destructuring with Renaming & Fallbacks:
const { name, role: userRole = "Guest", address: { city } } = user;
  name       --> direct extract
  role       --> renamed to userRole with fallback "Guest"
  city       --> deep nested extraction!

Spread (...) vs Rest (...):
Spread: Unpacks elements into a new array/object
[ ...arr1, ...arr2 ]  --> Shallow merge!
{ ...defaults, ...overrides }

Rest: Gathers remaining elements into an array
const [ first, second, ...remaining ] = numbers;`,
    syntax: {
      objDestruct: "const { a, b: aliasB, c = 10 } = obj;",
      arrDestruct: "const [first, , third, ...rest] = array;",
      shallowMerge: "const merged = { ...obj1, ...obj2 };",
    },
    example: {
      title: "Demonstrating nested destructuring, defaults, and immutable shallow cloning",
      language: "javascript",
      code: `const studentProfile = {
    id: 101,
    personal: {
        fullName: "Aarav Sharma",
        contact: {
            email: "aarav@campusprep.com"
        }
    },
    scores: [95, 88, 92, 84, 90]
};

// 1. Nested destructuring with alias and defaults
const {
    id,
    personal: {
        fullName,
        contact: { email, phone = "Not Provided" }
    },
    scores: [bestScore, secondBest, ...otherScores]
} = studentProfile;

console.log("Full name:", fullName);
console.log("Contact phone (defaulted):", phone);
console.log("Top scores:", bestScore, secondBest);
console.log("Remaining scores array:", otherScores);

// 2. Swapping variables without temporary storage
let a = 1, b = 2;
[a, b] = [b, a];
console.log("Swapped: a =", a, ", b =", b);

// 3. Immutably updating state with Spread operator
const updatedProfile = {
    ...studentProfile,
    id: 102, // Overwrites id
    personal: {
        ...studentProfile.personal,
        fullName: "Aarav S." // Deeply preserves nested structure while updating name
    }
};

console.log("Original name:", studentProfile.personal.fullName);
console.log("Updated name:", updatedProfile.personal.fullName);`,
      explanation:
        "Destructuring allows extracting nested values in a single statement with fallback defaults (`phone = 'Not Provided'`). The spread operator `{ ...obj, prop: newVal }` enables clean immutable updates.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Pattern Matching",
        description: "The engine matches keys in the destructuring pattern against properties in the source object.",
      },
      {
        step: 2,
        title: "Default Assignment",
        description: "If a property is strictly `=== undefined`, the engine evaluates and assigns the specified fallback value.",
      },
      {
        step: 3,
        title: "Shallow Clone Semantics",
        description: "Spread `{ ...obj }` performs shallow property copying (using `Object.assign` semantics under the hood).",
      },
    ],
    commonMistakes: [
      {
        mistake: "const { city } = user.address; // When user.address is undefined",
        why: "Destructuring from `undefined` or `null` raises `TypeError: Cannot destructure property 'city' of undefined`.",
        correct: "const { city } = user?.address ?? {};",
      },
      {
        mistake: "const clone = { ...original }; clone.nested.val = 99; // Assuming spread deep-copies",
        why: "Spread only shallow-copies top-level properties. Nested objects still share the exact same memory references.",
        correct: "Use structuredClone(original) or deep spread for nested objects.",
      },
    ],
    complexity: {
      time: "O(K) where K is the number of properties extracted or spread",
      space: "O(K) new object/array allocation",
      explanation: "Shallow property assignment runs in linear time relative to property count.",
    },
    tryItYourself: {
      prompt: "How can you omit a specific property `secret` from an object `data` using destructuring and rest syntax?",
      hint: "Extract `secret`, and use `...rest` for the remaining properties.",
      solutionSnippet: `const { secret, ...publicData } = data;
// publicData contains all properties of data EXCEPT secret!`,
    },
    placementConnection:
      "Omitting properties with rest syntax and performing clean immutable state updates in React with spread operators are expected skills in frontend interviews.",
    quickRevision: [
      "Use destructuring with defaults: `const { role = 'User' } = data`.",
      "Destructuring from `null` or `undefined` throws a `TypeError`; always guard with `?? {}`.",
      "Spread `{ ...obj }` only creates a SHALLOW copy; nested references are shared.",
      "Use rest syntax `const { omitKey, ...cleanData } = obj` to filter keys cleanly.",
    ],
  },
  {
    id: "js-prototype-chain",
    slug: "prototype-chain",
    title: "Prototypes & Prototypal Inheritance",
    track: "javascript",
    topicSlug: "oop",
    topicTitle: "Objects, Prototypes & Modern OOP",
    order: 13,
    estimatedMinutes: 30,
    oneSentence:
      "JavaScript uses prototypal inheritance where every object has an internal `[[Prototype]]` link to another object, forming a delegation chain terminating at `Object.prototype` (and finally `null`).",
    whyDoWeNeedIt: {
      problem:
        "Attaching methods directly to every object instance in a constructor wastes megabytes of memory by duplicating identical function closures for every single created instance.",
      realWorldAnalogy:
        "A student handbook: instead of printing a full 400-page policy manual into every single student ID badge, each badge contains a pointer (prototype link) back to the central library copy.",
    },
    visualIntuition: `The Prototype Delegation Chain:
const arr = [1, 2, 3];

arr (Array instance)
  |
  +--> [[Prototype]] points to: Array.prototype
         (Contains: .push(), .pop(), .map(), .filter())
           |
           +--> [[Prototype]] points to: Object.prototype
                  (Contains: .hasOwnProperty(), .toString())
                    |
                    +--> [[Prototype]] points to: null (End of chain!)

When calling arr.toString():
1. Checks arr instance? (No)
2. Checks Array.prototype? (Found overridden toString! Executes it!)`,
    syntax: {
      prototypeMethod: "function Person(name) { this.name = name; }\nPerson.prototype.greet = function() { return 'Hi ' + this.name; };",
      objectCreate: "const child = Object.create(parentPrototype);",
    },
    example: {
      title: "Constructor functions, prototype method delegation, and hasOwnProperty checks",
      language: "javascript",
      code: `function Student(name, rollNo) {
    this.name = name;
    this.rollNo = rollNo;
}

// Attach shared method to prototype to share ONE single function in memory
Student.prototype.study = function(subject) {
    return this.name + " (Roll " + this.rollNo + ") is studying " + subject;
};

const s1 = new Student("Aarav", 101);
const s2 = new Student("Diya", 102);

console.log(s1.study("Data Structures"));
console.log(s2.study("Computer Networks"));

// Verification: Both instances share the EXACT same function reference!
console.log("Shared method?", s1.study === s2.study); // true (Zero memory duplication!)

// Checking instance properties vs prototype properties
console.log("s1 has own property 'name'?", s1.hasOwnProperty("name")); // true
console.log("s1 has own property 'study'?", s1.hasOwnProperty("study")); // false (Inherited via prototype!)

// Inspecting prototype chain
console.log("s1 prototype:", Object.getPrototypeOf(s1) === Student.prototype); // true
console.log("Student.prototype prototype:", Object.getPrototypeOf(Student.prototype) === Object.prototype); // true`,
      explanation:
        "Methods added to `Student.prototype` are shared by all instances through the `[[Prototype]]` delegation link. `s1.study === s2.study` is `true`, saving memory.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Object Instantiation with new",
        description: "When `new Constructor()` runs, it creates a blank object, sets its `[[Prototype]]` to `Constructor.prototype`, binds `this`, and executes the constructor.",
      },
      {
        step: 2,
        title: "Delegation Lookup (Property Traversal)",
        description: "When reading `obj.prop`, if `obj` lacks `prop`, the engine recursively queries `Object.getPrototypeOf(obj)` up to `null`.",
      },
      {
        step: 3,
        title: "Property Shadowing",
        description: "If an instance sets `s1.study = customFn`, the instance property masks (shadows) the prototype property without modifying other instances.",
      },
    ],
    commonMistakes: [
      {
        mistake: "s1.__proto__.custom = 'bad' // Mutating __proto__ directly in application code",
        why: "Mutating `__proto__` causes major V8 performance deoptimizations across all instances sharing that prototype. Use `Object.create()` or `class`.",
        correct: "Use modern class syntax or Object.create().",
      },
      {
        mistake: "Putting methods inside constructor: function User() { this.save = function() {} }",
        why: "Every `new User()` allocates a brand-new copy of the `save` function in memory. For 10,000 users, 10,000 function objects are allocated.",
        correct: "User.prototype.save = function() {}; // Shared across all instances",
      },
    ],
    complexity: {
      time: "O(D) lookup where D is depth of prototype chain (typically 1–3 hops; cached by V8 Shapes in O(1))",
      space: "O(1) memory per method shared on prototype vs O(N) memory if created in constructor",
      explanation: "Prototypal sharing provides massive memory savings for thousands of instances.",
    },
    tryItYourself: {
      prompt: "What is `Object.create(null)` used for in JavaScript?",
      hint: "What is the prototype of an object created with `Object.create(null)`?",
      solutionSnippet: "`Object.create(null)` creates a dictionary object with NO prototype (it does not inherit from `Object.prototype`). It has zero built-in methods (no `toString`, no `hasOwnProperty`), making it immune to prototype pollution attacks when storing arbitrary user keys.",
    },
    placementConnection:
      "Differentiating between `__proto__` and `prototype`, explaining how `new` works under the hood, and prototype pollution security are classic technical interview topics.",
    quickRevision: [
      "`prototype` is a property on functions; `__proto__` (or `[[Prototype]]`) is the internal link on instantiated objects.",
      "The prototype chain ends at `Object.prototype.[[Prototype]] === null`.",
      "Attaching methods to `Constructor.prototype` prevents memory duplication across instances.",
      "`s1.hasOwnProperty('key')` checks if a property belongs directly to the instance, not inherited.",
    ],
  },
  {
    id: "js-es6-classes",
    slug: "es6-classes",
    title: "ES6 Classes, Inheritance & #private Fields",
    track: "javascript",
    topicSlug: "oop",
    topicTitle: "Objects, Prototypes & Modern OOP",
    order: 14,
    estimatedMinutes: 25,
    oneSentence:
      "ES6 classes are syntactical sugar over prototypal inheritance supporting `extends`, `super()`, static members, and true hard privacy using hash `#privateFields`.",
    whyDoWeNeedIt: {
      problem:
        "Prototypal inheritance syntax (`Constructor.prototype.method = ...`) is verbose and confusing for developers coming from languages like Java or C++. ES6 classes provide a clean, standardized syntax.",
      realWorldAnalogy:
        "A modern automobile dashboard: beneath the sleek steering wheel and push-to-start button lies the exact same combustion engine and axle mechanisms, but the controls are standardized and ergonomic.",
    },
    visualIntuition: `ES6 Class Inheritance Architecture:
class Animal {
    constructor(name) { this.name = name; }
    speak() { ... }
}

class Dog extends Animal {
    #licenseId; // True Hard Private Field!
    constructor(name, id) {
        super(name); // MUST call super() before accessing 'this'!
        this.#licenseId = id;
    }
}

Prototype Wiring Under the Hood:
Dog.prototype.[[Prototype]] === Animal.prototype
Dog.[[Prototype]] === Animal (Inherits static methods too!)`,
    syntax: {
      classSyntax: "class Employee extends Person {\n    #salary; // Private field\n    constructor(name, sal) {\n        super(name);\n        this.#salary = sal;\n    }\n}",
    },
    example: {
      title: "Class inheritance, static methods, and true private encapsulation with #fields",
      language: "javascript",
      code: `class Vehicle {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    getDetails() {
        return this.make + " " + this.model;
    }

    // Static method: called on the class itself, not on instances
    static compareVehicles(v1, v2) {
        return v1.make === v2.make && v1.model === v2.model;
    }
}

class ElectricCar extends Vehicle {
    // True private field: cannot be accessed or modified outside this class!
    #batteryCapacity;

    constructor(make, model, batteryKWh) {
        super(make, model); // Invokes Vehicle constructor; mandatory!
        this.#batteryCapacity = batteryKWh;
    }

    getRange() {
        // Private field access is permitted inside the class body
        return this.#batteryCapacity * 5.5; // Approx km per kWh
    }

    getBatteryStatus() {
        return this.getDetails() + " has " + this.#batteryCapacity + " kWh battery";
    }
}

const tesla = new ElectricCar("Tesla", "Model 3", 75);
console.log(tesla.getBatteryStatus());
console.log("Estimated range:", tesla.getRange(), "km");

// Direct private field access fails at syntax parse time!
// console.log(tesla.#batteryCapacity); // SyntaxError: Private field '#batteryCapacity' must be declared in an enclosing class!`,
      explanation:
        "`#batteryCapacity` provides hard privacy enforced by the engine at runtime. `super()` must be called in derived constructors before accessing `this`. `static` methods are bound to the class constructor.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Class Definition Hoisting Guard",
        description: "Unlike function declarations, ES6 classes are in the Temporal Dead Zone (TDZ) and cannot be instantiated before their declaration.",
      },
      {
        step: 2,
        title: "Derived Constructor super() Rule",
        description: "Derived classes do not create their own `this` binding; calling `super()` initializes `this` via the parent constructor.",
      },
      {
        step: 3,
        title: "Private Field Key Resolution",
        description: "Private fields (`#field`) are stored in internal private brand slots on the instance, completely inaccessible via `Object.keys()` or bracket notation `obj['#field']`.",
      },
    ],
    commonMistakes: [
      {
        mistake: "constructor() { this.name = 'Dog'; super(); } // Accessing this before super()",
        why: "In derived class constructors, referencing `this` before calling `super()` throws `ReferenceError: Must call super constructor in derived class before accessing 'this'`.",
        correct: "constructor() { super(); this.name = 'Dog'; }",
      },
      {
        mistake: "Calling static methods from an instance: tesla.compareVehicles(...)",
        why: "Static methods reside on the constructor function (`Vehicle.compareVehicles`), not on `Vehicle.prototype`.",
        correct: "Vehicle.compareVehicles(tesla, otherCar);",
      },
    ],
    complexity: {
      time: "O(1) method execution via prototype delegation",
      space: "O(1) per instance (methods are shared on prototype)",
      explanation: "Identical performance to hand-written prototypal inheritance.",
    },
    tryItYourself: {
      prompt: "Can a child class access the private `#privateField` of its parent class in JavaScript?",
      hint: "Think about whether `#` privacy is protected or strictly private to the defining class.",
      solutionSnippet: "No! Private `#fields` in JavaScript are strictly private to the declaring class. Even subclasses (`extends`) cannot access `#fields` of the parent class, matching private field semantics in Java and C++.",
    },
    placementConnection:
      "Modern JavaScript interviews test ES6 classes, `#private` fields vs conventional `_` naming, and the internal mechanics of `super()` in derived classes.",
    quickRevision: [
      "ES6 classes are syntactic sugar over prototypes and are subject to the Temporal Dead Zone (not hoisted like functions).",
      "Always call `super()` first before accessing `this` in a derived constructor.",
      "Prefix attributes with `#` (e.g. `#secret`) for true hard private fields.",
      "Static methods are called on the class constructor (`MyClass.util()`), not on instances.",
    ],
  },
  {
    id: "js-json-serialization",
    slug: "json-serialization",
    title: "JSON, Deep Copying & structuredClone()",
    track: "javascript",
    topicSlug: "oop",
    topicTitle: "Objects, Prototypes & Modern OOP",
    order: 15,
    estimatedMinutes: 20,
    oneSentence:
      "While `JSON.parse(JSON.stringify(obj))` provides a quick hack for deep copying, it drops `undefined`, `functions`, and `Symbols`, whereas modern `structuredClone()` provides a native, robust deep clone algorithm.",
    whyDoWeNeedIt: {
      problem:
        "Using `JSON.stringify` to clone state containing `Date` objects converts them into plain strings, and passing circular object references crashes with `TypeError: Converting circular structure to JSON`.",
      realWorldAnalogy:
        "Photocopying vs 3D laser-scanning: a standard black-and-white photocopier (`JSON`) loses colors, textures, and dimensions; a modern 3D scanner (`structuredClone`) recreates the exact object with all its internal wiring and relationships.",
    },
    visualIntuition: `JSON Serialization Gotchas vs structuredClone:
Original Object:
{
  date: new Date(),
  func: () => {},
  missing: undefined,
  circular: (points back to self)
}

JSON.parse(JSON.stringify(obj)):
- date     --> Converts to plain string "2026-09-07T..." (Date methods lost!)
- func     --> Dropped completely!
- missing  --> Dropped completely!
- circular --> CRASHES with TypeError!

structuredClone(obj):
- date     --> Preserves true Date instance!
- circular --> Handles circular references seamlessly without crashing!`,
    syntax: {
      modernClone: "const deepCopy = structuredClone(originalObj);",
      jsonStringify: "const str = JSON.stringify(data, null, 2); // 2-space pretty printing\nconst parsed = JSON.parse(str);",
    },
    example: {
      title: "Comparing JSON serialization quirks against native structuredClone",
      language: "javascript",
      code: `const original = {
    title: "CampusPrep Guide",
    createdAt: new Date(),
    tags: new Set(["JS", "Interview"]),
    metadata: {
        views: 1200,
        author: undefined // Will be dropped by JSON!
    }
};

// 1. JSON Serialization (The Legacy Hack)
const jsonCloned = JSON.parse(JSON.stringify(original));
console.log("JSON cloned createdAt type:", typeof jsonCloned.createdAt); // string! (Lost Date object!)
console.log("JSON cloned 'author' exists?", "author" in jsonCloned.metadata); // false! (Dropped undefined!)
console.log("JSON cloned tags:", jsonCloned.tags); // {} (Lost Set type; converted to empty object!)

// 2. Modern Native structuredClone() (Supported in Node.js 17+ and all modern browsers)
const properClone = structuredClone(original);
console.log("structuredClone createdAt instanceof Date?", properClone.createdAt instanceof Date); // true!
console.log("structuredClone tags instanceof Set?", properClone.tags instanceof Set); // true!
console.log("structuredClone tags content:", Array.from(properClone.tags)); // ["JS", "Interview"]

// 3. Handling Circular References with structuredClone:
const nodeA = { name: "Node A" };
const nodeB = { name: "Node B" };
nodeA.neighbor = nodeB;
nodeB.neighbor = nodeA; // Circular reference!

// JSON.stringify(nodeA); // Throws TypeError: Converting circular structure to JSON!
const clonedGraph = structuredClone(nodeA);
console.log("Circular graph cloned successfully:", clonedGraph.neighbor.name); // "Node B"`,
      explanation:
        "`structuredClone()` is the modern standard for deep cloning in JavaScript. It correctly preserves native types like `Date`, `Set`, `Map`, `RegExp`, and seamlessly handles circular references.",
    },
    howItWorks: [
      {
        step: 1,
        title: "Structured Clone Algorithm",
        description: "The engine traverses the object graph, serializing memory buffers while maintaining an internal map of already visited references to handle cycles.",
      },
      {
        step: 2,
        title: "JSON Serialization Loss",
        description: "`JSON.stringify` complies with RFC 8259: values of `undefined`, `Function`, and `Symbol` are omitted (or converted to `null` inside arrays).",
      },
      {
        step: 3,
        title: "structuredClone Limitations",
        description: "`structuredClone` cannot clone functions or DOM nodes. Attempting to clone functions throws a `DataCloneError`.",
      },
    ],
    commonMistakes: [
      {
        mistake: "const clone = JSON.parse(JSON.stringify(state)) in Redux/React when state has Dates or Sets",
        why: "`Date` objects turn into strings and `Set`/`Map` turn into empty objects `{}`.",
        correct: "Use structuredClone(state) or a dedicated library like Immer.",
      },
    ],
    complexity: {
      time: "O(N) traversal of all nested properties and references",
      space: "O(N) auxiliary memory for the newly cloned heap objects",
      explanation: "Recursively duplicates every object node in the graph.",
    },
    tryItYourself: {
      prompt: "Can `structuredClone()` clone a JavaScript function?",
      hint: "What happens if an object contains a callback method?",
      solutionSnippet: "No! `structuredClone()` throws a `DataCloneError: could not clone function` because functions are bound to executable closures and cannot be safely cloned across threads or environments.",
    },
    placementConnection:
      "Explaining why `JSON.parse(JSON.stringify(obj))` is flawed and implementing deep copy functions handling circular references are standard interview challenges.",
    quickRevision: [
      "Always prefer native `structuredClone(obj)` over `JSON.parse(JSON.stringify(obj))` for deep copies.",
      "`JSON.stringify` drops `undefined`, `Symbol`, and `functions`, and converts `Date` to plain strings.",
      "`structuredClone()` supports circular references, `Date`, `Map`, `Set`, and `ArrayBuffer`.",
      "`structuredClone()` throws `DataCloneError` if an object contains functions or DOM nodes.",
    ],
  },
];
