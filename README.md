# AlgoPrimer ⚡

> **AlgoPrimer — Programming, DSA & Coding Interview Preparation**
>
> *Teach programming and problem solving from first principles, then progressively move users toward technical interview readiness.*

AlgoPrimer is a modern, developer-native educational platform built with Next.js 16 (App Router), TypeScript, and Vanilla CSS tokens. It provides deep computer science fundamentals, structured language curricula, a canonical 20-topic DSA roadmap, 65 curated company interview problems with 3-tier solutions, and rapid revision cards.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-Vitest%20Passed-success?logo=vitest)](https://vitest.dev/)
[![Open Access](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 🌟 Core Pillars

1. **Four Complete Language Tracks (108 Lessons)**:
   - **Java**: JVM internals, memory models, primitives vs wrappers, OOP, Collections Framework, garbage collection.
   - **C++**: Pointers, references, stack vs heap, STL containers, iterators, RAII, memory management.
   - **Python**: Dynamic typing, references, comprehensions, internal hashing, iteration protocols, big-O overheads.
   - **JavaScript**: V8 engine, Event Loop, Execution Context, Closures, Promises/Async-Await, Prototypes, ES6+ methods.

2. **20-Topic Canonical DSA Roadmap & Lessons**:
   - Structured canonical routing: `/dsa`, `/dsa/[topic]`, and `/dsa/[topic]/[lesson]`.
   - Complete pedagogical progression: Complexity analysis, linear structures, trees, graphs, heaps, greedy, dynamic programming, backtracking, bit manipulation, and advanced patterns.
   - Every topic breaks down the concept into *Why do we need it?*, *Visual intuition*, *How it works step-by-step*, *Common traps*, and *Practical applications*.

3. **Curated Problem Bank (65 High-Frequency Core Problems)**:
   - Covers 12 core categories: Arrays, Two Pointers & Sliding Window, Strings, Linked Lists, Binary Search, Stacks & Queues, Trees & Graphs, Heaps, Intervals, Backtracking, Dynamic Programming, and Bit Manipulation.
   - **Quad-lingual solutions**: Every problem includes full implementations in **Java**, **C++**, **Python**, and **JavaScript** across Brute Force, Better, and Optimal approaches.
   - Verified company tags (**Amazon**, **Microsoft**, **Google**, **Meta**, **TCS**, **Infosys**, **Goldman Sachs**, **Bloomberg**, **Apple**, **Adobe**, **Uber**, **Flipkart**).
   - Interactive company filter pills and visual step-by-step dry-run tables.

4. **Lightweight Client-Side Search Index**:
   - Precomputed lightweight singleton search index that excludes heavy solution bodies and code blocks.
   - Fast tokenized fuzzy matching with keyboard navigation (Ctrl+K, arrows, Enter, Esc).

5. **Calm, High-Performance UX**:
   - Server-first rendering model with small client islands for progress and interactivity.
   - Pure CSS tokens, sleek dark mode with tailored visual hierarchy.
   - LocalStorage progress sync with bookmarking, visit tracking, and validated schema migrations.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS Modules (custom design tokens)
- **Validation**: [Zod](https://zod.dev/) for curriculum, problem, and progress schema verification
- **Testing**: [Vitest](https://vitest.dev/) with automated content integrity and crawl assertions
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.x or 20.x+
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/dvynshuu/Forge.git algoprimer
cd algoprimer

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Quality Assurance & Verification
```bash
# Run unit tests and schema integrity assertions
npm test

# Run ESLint
npm run lint

# Build production bundle
npm run build
```

---

## 📂 Repository Structure

```
├── src/
│   ├── app/                    # Canonical App Router hierarchy
│   │   ├── dsa/                # DSA hub, [topic] hubs, and [topic]/[lesson] pages
│   │   ├── languages/          # Language hub and [lang]/[lesson] pages
│   │   ├── problems/           # Curated problem bank and [slug] solution viewer
│   │   ├── revision/           # Rapid revision cheat sheet cards
│   │   ├── roadmap/            # Progressive curriculum timeline
│   │   ├── interview/          # OA rounds & technical interview guides
│   │   ├── profile/            # Student progress dashboard (private)
│   │   ├── search/             # Global search page (noindex)
│   │   ├── robots.ts           # Crawl directives & canonical sitemap link
│   │   └── sitemap.ts          # Comprehensive canonical sitemap generator
│   ├── components/             # Reusable UI, layout & content components
│   ├── content/                # Zod-validated curriculum & problem modules
│   │   ├── languages/          # Java, C++, Python, JavaScript lessons (108 total)
│   │   ├── dsa/                # 20 DSA topics and 21 distinct lessons
│   │   └── problems/           # 65 curated company problems across 12 modules
│   ├── lib/                    # Routes manifest, SEO helpers, search engine, progress
│   ├── styles/                 # Global CSS design tokens & utilities
│   └── types/                  # Content types & Zod schemas
├── tests/                      # Automated Vitest suites (content, search, brand, routes, SEO)
└── package.json
```

---

## 📄 License

MIT © [AlgoPrimer](https://algoprimer.com)
