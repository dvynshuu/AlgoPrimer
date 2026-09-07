# Forge ⚒️

> **The open learning coding platform for everyone — from your first line of code to technical mastery.**

Forge is a free, open-access learning platform engineered from first principles: explain simply, build progressively, and empower anyone — whether a first-year student, self-taught programmer, or career switcher — to master computer science fundamentals, data structures, algorithms, and technical hiring standards.

[![GitHub repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/dvynshuu/Forge.git)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-Vitest%20Passed-success?logo=vitest)](https://vitest.dev/)
[![Open Access](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 🌟 Core Pillars

1. **Four Complete Language Tracks**:
   - **Java**: JVM internals, memory models, primitives vs wrappers, OOP, Collections Framework, garbage collection.
   - **C++**: Pointers, references, stack vs heap, STL containers, iterators, RAII, memory management.
   - **Python**: Dynamic typing, references, comprehensions, internal hashing, iteration protocols, big-O overheads.
   - **JavaScript**: V8 engine, Event Loop, Execution Context, Closures, Promises/Async-Await, Prototypes, ES6+ methods.

2. **20-Topic Pedagogical DSA Roadmap**:
   - Built to take any learner from basic arrays through graph algorithms, dynamic programming, and system design patterns.
   - Every topic breaks down the concept into *Why do we need it?*, *Visual intuition*, *How it works step-by-step*, *Common traps*, and *Practical applications*.

3. **Curated Problem Bank (33 High-Frequency Company Problems)**:
   - Covers 8 core categories: Arrays & Hashing, Two Pointers & Sliding Window, Strings, Linked Lists, Binary Search, Stacks & Queues, Trees & Graphs, and Dynamic Programming.
   - **Quad-lingual solutions**: Every single problem includes full, runnable implementations in **Java**, **C++**, **Python**, and **JavaScript** for both Brute Force and Optimal approaches.
   - Verified company tags (**Amazon**, **Microsoft**, **Google**, **Meta**, **TCS**, **Infosys**, **Goldman Sachs**, **Bloomberg**, **Apple**, **Adobe**, **Uber**, **Flipkart**).
   - Interactive company filter pills and visual step-by-step dry-run tables.

4. **Calm, High-Performance UX**:
   - Zero marketing fluff, zero paywalls, zero gamified distraction.
   - Pure CSS tokens, sleek dark mode with tailored visual hierarchy.
   - Global Cmd+K / Ctrl+K search index with real-time scoring.
   - LocalStorage progress sync with bookmarking and solve tracking.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16 (App Router, Turbopack)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS Modules (custom design tokens)
- **Validation**: [Zod](https://zod.dev/) for curriculum and problem schema verification
- **Testing**: [Vitest](https://vitest.dev/) with automated content integrity testing
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.x or 20.x+
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/dvynshuu/Forge.git
cd Forge

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

# Build production bundle (SSG / 158+ prerendered static pages)
npm run build
```

---

## 📂 Repository Structure

```
├── src/
│   ├── app/                    # Next.js App Router routes
│   │   ├── dsa/                # 20 DSA topic modules & dynamic lessons
│   │   ├── languages/          # Java, C++, Python, and JavaScript tracks
│   │   ├── problems/           # Curated Problem Bank & problem viewers
│   │   ├── revision/           # Rapid revision cheat sheet cards
│   │   ├── roadmap/            # Progressive curriculum timeline
│   │   ├── interview/          # OA rounds & technical interview guides
│   │   └── search/             # Global search modal and index
│   ├── components/             # Reusable UI, layout & content components
│   ├── content/                # Zod-validated curriculum & problem modules
│   │   ├── languages/          # Java, C++, Python, JavaScript lessons
│   │   ├── dsa/                # DSA roadmap and topic contents
│   │   └── problems/           # 33 curated company problems across 8 modules
│   ├── lib/                    # Progress tracking context & search engine
│   ├── styles/                 # Global CSS design tokens & utilities
│   └── types/                  # Zod schemas (ProblemSchema, LessonSchema)
├── tests/                      # Vitest test suites (content, search, progress)
└── package.json
```

---

## 📄 License

MIT © [Forge Community](https://github.com/dvynshuu/Forge.git)
