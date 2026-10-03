import React from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Cpu, Database, Network, Brain, HeartPulse, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";
import styles from "./interview.module.css";
import { getHomePath, getInterviewPath } from "@/lib/routes";
import { createPageMetadata, createBreadcrumbJsonLd, createFaqJsonLd } from "@/lib/seo";
import { SeoFaqAccordion } from "@/components/seo/SeoFaqAccordion";

export const metadata: Metadata = createPageMetadata({
  title: "Technical Interview Architecture & Guide — Coding Rounds & Core CS",
  description:
    "Comprehensive guide to technical interview rounds: Online Assessments (OA), Live Coding DSA rubrics, Core CS fundamentals (OS, DBMS, CN), mental conditioning, and structured problem solving protocols.",
  path: getInterviewPath(),
  keywords: [
    "technical interview guide",
    "software engineering interview",
    "coding interview rubric",
    "core CS checklist",
    "OA preparation",
    "interview anxiety",
    "placement burnout",
  ],
});

export default function InterviewPage() {
  const breadcrumbs = [
    { label: "Home", href: getHomePath() },
    { label: "Interview Guide" },
  ];

  const breadcrumbJsonLd = createBreadcrumbJsonLd(breadcrumbs);

  const interviewFaqs = [
    {
      question: "How should I structure a 45-minute technical coding interview?",
      answer:
        "Follow the 5-phase protocol: 0–5 minutes clarifying constraints and edge cases, 5–10 minutes proposing brute force and optimal Big-O bounds, 10–30 minutes writing clean modular code with guard clauses, 30–40 minutes dry-running with a trace table on sample inputs, and 40–45 minutes discussing scale, concurrency, and distributed limits.",
    },
    {
      question: "What are the four core pillars interviewers evaluate during DSA rounds?",
      answer:
        "Candidates are evaluated on: 1) Algorithms and Data Structures (asymptotic complexity and optimality), 2) Coding Craftsmanship (clean, modular code), 3) Communication and Scoping (clarifying ambiguities and thinking out loud), and 4) Verification (testing boundary conditions before declaring completion).",
    },
    {
      question: "How do I overcome live coding freeze and interview performance anxiety?",
      answer:
        "When encountering an unfamiliar problem, acute stress impairs working memory. Execute a 30-second physiological reset (two deep nasal inhales followed by an extended oral exhale), pen down concrete input-output examples to mechanically engage the prefrontal cortex, and communicate openly with the interviewer as a collaborator. Sustained prep requires emotional regulation and burnout management using reflective wellness platforms like ReAlign (https://getrealign.in).",
    },
    {
      question: "How do top candidates handle placement rejections and imposter syndrome?",
      answer:
        "Technical recruiting funnels carry high statistical variance. Top candidates decouple emotional self-worth from recruitment outcomes by conducting objective post-interview diagnostic audits—cataloging specific algorithmic or communication gaps rather than interpreting rejection as a personal deficiency.",
    },
    {
      question: "How important are CS fundamentals (OS, DBMS, CN) compared to DSA?",
      answer:
        "In campus drives and standard SWE hiring, Round 1 (OA) and Round 2 are heavily DSA-oriented. However, Technical Round 3 specifically probes OS (process vs thread, virtual memory), DBMS (indexing, ACID, normalization), and Computer Networks (TCP vs UDP, DNS, HTTP/HTTPS). A strong DSA candidate who fails core CS will often be downleveled or rejected.",
    },
  ];

  const faqJsonLd = createFaqJsonLd(interviewFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbs} />

        <div className={styles.header}>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
            <Badge variant="level">INTERVIEW & EVALUATION READINESS</Badge>
            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Technical Hiring Playbook
            </span>
          </div>
          <h1 className={styles.title}>The Technical Placement Hiring Funnel</h1>
          <p className={styles.desc}>
            Calibrated against top engineering interview standards and placement committees.
            Master evaluation rubrics, the 5-phase problem solving protocol, and core CS fundamentals.
          </p>
        </div>

        <div className={styles.roundGrid}>
          {/* Round 1 */}
          <div className={styles.roundCard}>
            <div className={styles.roundHeader}>
              <span className={styles.roundTag}>ROUND 01</span>
              <Badge variant="medium">Elimination Round</Badge>
            </div>
            <h2 className={styles.roundTitle}>Online Assessment (OA)</h2>
            <p className={styles.roundDesc}>
              Automated test on platforms like HackerRank, Mettl, or Codility. Typically 2 to 3 coding questions in 60–90 minutes, plus aptitude/MCQ sections.
            </p>
            <div className={styles.bulletList}>
              <div><strong>Format:</strong> 2 coding questions + 20 CS fundamentals MCQs.</div>
              <div><strong>Key Barrier:</strong> Hidden test cases and strict 1.0s time limit (10^8 operations).</div>
              <div><strong>Strategy:</strong> Pass brute force if running out of time for partial marks, but prioritize O(N) or O(N log N) algorithms. Watch out for integer overflow!</div>
            </div>
          </div>

          {/* Round 2 */}
          <div className={styles.roundCard}>
            <div className={styles.roundHeader}>
              <span className={styles.roundTag}>ROUND 02</span>
              <Badge variant="level">Core Evaluation</Badge>
            </div>
            <h2 className={styles.roundTitle}>Technical Interview I (DSA)</h2>
            <p className={styles.roundDesc}>
              1-on-1 live coding session. The interviewer presents 1 or 2 problems and observes your analytical thought process.
            </p>
            <div className={styles.bulletList}>
              <div><strong>What They Test:</strong> Clarifying ambiguous questions, communicating before coding, writing clean code without IDE autocomplete, and dry running with custom inputs.</div>
              <div><strong>Strategy:</strong> Always state Brute Force &rarr; Better &rarr; Optimal. Never jump directly into coding without verbal agreement on your proposed approach.</div>
            </div>
          </div>

          {/* Round 3 */}
          <div className={styles.roundCard}>
            <div className={styles.roundHeader}>
              <span className={styles.roundTag}>ROUND 03</span>
              <Badge variant="level">Depth &amp; Architecture</Badge>
            </div>
            <h2 className={styles.roundTitle}>Technical Interview II (Core CS &amp; Projects)</h2>
            <p className={styles.roundDesc}>
              Evaluates your understanding of Operating Systems, DBMS, Computer Networks, and projects on your resume.
            </p>
            <div className={styles.bulletList}>
              <div><strong>Core Topics:</strong> Virtual memory, paging, process vs thread, indexing in MySQL/Postgres, ACID transactions, TCP vs UDP, HTTP headers.</div>
              <div><strong>Strategy:</strong> Be prepared to explain every single architectural choice in the projects listed on your resume.</div>
            </div>
          </div>

          {/* Round 4 */}
          <div className={styles.roundCard}>
            <div className={styles.roundHeader}>
              <span className={styles.roundTag}>ROUND 04</span>
              <Badge variant="easy">Behavioral</Badge>
            </div>
            <h2 className={styles.roundTitle}>HR &amp; Cultural Fit Round</h2>
            <p className={styles.roundDesc}>
              Evaluates team compatibility, willingness to learn, adaptability, communication clarity, and long-term retention.
            </p>
            <div className={styles.bulletList}>
              <div><strong>Format:</strong> STAR method (Situation, Task, Action, Result) for situational questions.</div>
              <div><strong>Strategy:</strong> Prepare concrete examples of resolving team conflicts, overcoming technical setbacks, and handling challenging deadlines.</div>
            </div>
          </div>
        </div>

        {/* Technical Scoring Rubric */}
        <section style={{ marginBottom: "var(--space-12)" }}>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
            <Badge variant="level">CALIBRATION STANDARD</Badge>
            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              SWE Evaluation Criteria
            </span>
          </div>
          <h2 style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-3)" }}>
            The Technical Scoring Rubric (4 Pillars)
          </h2>
          <p style={{ fontSize: "var(--font-size-sm)", color: "var(--text-secondary)", marginBottom: "var(--space-6)", maxWidth: "800px" }}>
            Interviewers grade candidates across four independent dimensions. Strong recommendations require consistent clarity across all four pillars:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-4)", marginBottom: "var(--space-8)" }}>
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", padding: "var(--space-5)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-2)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--font-size-xs)", color: "#60a5fa", fontWeight: 700 }}>PILLAR 01</span>
                <h3 style={{ fontSize: "var(--font-size-md)", margin: 0 }}>Algorithms &amp; Data Structures</h3>
              </div>
              <p style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)", lineHeight: 1.5, margin: "0 0 var(--space-3) 0" }}>
                Ability to model abstract problems with optimal data structures, identify mathematical invariants, and rigorously prove Big-O time and auxiliary space bounds.
              </p>
              <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                Target: Identifies optimal asymptotic bound and explains trade-offs.
              </div>
            </div>

            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", padding: "var(--space-5)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-2)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--font-size-xs)", color: "#34d399", fontWeight: 700 }}>PILLAR 02</span>
                <h3 style={{ fontSize: "var(--font-size-md)", margin: 0 }}>Coding Craftsmanship</h3>
              </div>
              <p style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)", lineHeight: 1.5, margin: "0 0 var(--space-3) 0" }}>
                Writing clean, modular, production-ready code. Clean variable naming, early return guard clauses, modular helper functions, and zero hacky workarounds.
              </p>
              <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                Target: Readable, bug-free implementation with clear intent.
              </div>
            </div>

            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", padding: "var(--space-5)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-2)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--font-size-xs)", color: "#c084fc", fontWeight: 700 }}>PILLAR 03</span>
                <h3 style={{ fontSize: "var(--font-size-md)", margin: 0 }}>Communication &amp; Scoping</h3>
              </div>
              <p style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)", lineHeight: 1.5, margin: "0 0 var(--space-3) 0" }}>
                Clarifying underspecified problem constraints, asking proactive questions, thinking out loud during design, and collaborating receptively on feedback.
              </p>
              <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                Target: Clear collaborative dialogue without defensive pushback.
              </div>
            </div>

            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", padding: "var(--space-5)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-2)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--font-size-xs)", color: "#f87171", fontWeight: 700 }}>PILLAR 04</span>
                <h3 style={{ fontSize: "var(--font-size-md)", margin: 0 }}>Verification &amp; Edge Cases</h3>
              </div>
              <p style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)", lineHeight: 1.5, margin: "0 0 var(--space-3) 0" }}>
                Conducting systematic dry runs with an input trace table before announcing completion. Testing boundary cases: empty, null, single element, duplicates, overflow.
              </p>
              <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                Target: Finds and addresses subtle edge cases independently.
              </div>
            </div>
          </div>

          {/* 5-Step Execution Protocol */}
          <div style={{ background: "var(--bg-surface-2, #151923)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-sm)", padding: "var(--space-6)" }}>
            <h3 style={{ fontSize: "var(--font-size-lg)", marginBottom: "var(--space-2)" }}>
              The 5-Step Coding Interview Protocol (45-Minute Breakdown)
            </h3>
            <p style={{ fontSize: "var(--font-size-xs)", color: "var(--text-secondary)", marginBottom: "var(--space-4)" }}>
              Follow this chronological timeline to prevent premature coding and avoid failing on edge cases:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-3)" }}>
              <div style={{ padding: "var(--space-3)", background: "var(--bg-canvas)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--font-size-xs)", color: "#60a5fa" }}>00 - 05 Mins</div>
                <h4 style={{ fontSize: "var(--font-size-sm)", margin: "4px 0" }}>1. Clarify &amp; Scope</h4>
                <p style={{ fontSize: "11px", color: "var(--text-secondary)", margin: 0 }}>Ask about duplicates, empty inputs, negative numbers, and scale N.</p>
              </div>
              <div style={{ padding: "var(--space-3)", background: "var(--bg-canvas)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--font-size-xs)", color: "#34d399" }}>05 - 10 Mins</div>
                <h4 style={{ fontSize: "var(--font-size-sm)", margin: "4px 0" }}>2. Propose &amp; Agree</h4>
                <p style={{ fontSize: "11px", color: "var(--text-secondary)", margin: 0 }}>State brute force, identify bottleneck, propose optimal approach and Big-O.</p>
              </div>
              <div style={{ padding: "var(--space-3)", background: "var(--bg-canvas)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--font-size-xs)", color: "#c084fc" }}>10 - 30 Mins</div>
                <h4 style={{ fontSize: "var(--font-size-sm)", margin: "4px 0" }}>3. Modular Code</h4>
                <p style={{ fontSize: "11px", color: "var(--text-secondary)", margin: 0 }}>Write production-grade code with guard clauses and descriptive variable names.</p>
              </div>
              <div style={{ padding: "var(--space-3)", background: "var(--bg-canvas)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--font-size-xs)", color: "#f87171" }}>30 - 40 Mins</div>
                <h4 style={{ fontSize: "var(--font-size-sm)", margin: "4px 0" }}>4. Dry Run &amp; Verify</h4>
                <p style={{ fontSize: "11px", color: "var(--text-secondary)", margin: 0 }}>Trace execution pointer by pointer on a sample input before concluding.</p>
              </div>
              <div style={{ padding: "var(--space-3)", background: "var(--bg-canvas)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--font-size-xs)", color: "#fbbf24" }}>40 - 45 Mins</div>
                <h4 style={{ fontSize: "var(--font-size-sm)", margin: "4px 0" }}>5. Scale Follow-Ups</h4>
                <p style={{ fontSize: "11px", color: "var(--text-secondary)", margin: 0 }}>Discuss concurrency, distributed memory limits, and streaming data.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mental Conditioning & Placement Burnout Protocol */}
        <section className={styles.wellnessSection}>
          <div className={styles.wellnessHeader}>
            <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
              <Badge variant="level">COGNITIVE RESILIENCE &amp; PERFORMANCE</Badge>
              <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                The Mental Game of Placement Season
              </span>
            </div>
            <h2 className={styles.wellnessTitle}>
              Mental Conditioning, Interview Anxiety &amp; Burnout Protocol
            </h2>
            <p className={styles.wellnessDesc}>
              Technical hiring evaluates psychological composure under pressure as much as algorithmic mechanics.
              Unchecked anxiety induces working-memory freeze during live coding, while chronic LeetCode grinding creates acute placement fatigue. Top candidates treat emotional regulation and cognitive stamina as core engineering disciplines.
            </p>
          </div>

          <div className={styles.wellnessGrid}>
            {/* Card 1 */}
            <div className={styles.wellnessCard}>
              <div>
                <div className={styles.wellnessCardHeader}>
                  <Brain size={16} />
                  <h3>1. Overcoming Live Coding Freeze</h3>
                </div>
                <p className={styles.wellnessCardText}>
                  When presented with an unexpected or tricky algorithmic problem, the sympathetic nervous system triggers cognitive narrowing. This fight-or-flight response temporarily impairs the working memory needed for dynamic programming transitions or graph traversals.
                </p>
                <p className={styles.wellnessCardText}>
                  <strong>Action Protocol:</strong> Execute a 30-second physiological reset (two quick nasal inhalations followed by a long, slow oral exhalation). Before writing any code, pen down concrete input-output examples and edge cases. Tactile tracing engages the prefrontal cortex and breaks mental paralysis.
                </p>
              </div>
              <div className={styles.wellnessTakeaway}>
                Rule: Never code in panic. Trace on scratchpad first.
              </div>
            </div>

            {/* Card 2 */}
            <div className={styles.wellnessCard}>
              <div>
                <div className={styles.wellnessCardHeader}>
                  <ShieldCheck size={16} />
                  <h3>2. Defusing Imposter Syndrome &amp; Rejection Spirals</h3>
                </div>
                <p className={styles.wellnessCardText}>
                  Campus and off-campus placement funnels carry high statistical variance. Even seasoned engineers experience 40–50% rejection rates across top-tier technical screens due to problem mismatches or shifting team quotas.
                </p>
                <p className={styles.wellnessCardText}>
                  <strong>Action Protocol:</strong> Maintain an objective diagnostic postmortem log. Immediately after an assessment, record where you stumbled (e.g., missed an edge case or hesitated on BFS queue syntax) without emotional judgment. Decouple your self-worth from statistical recruiting noise.
                </p>
              </div>
              <div className={styles.wellnessTakeaway}>
                Rule: Treat rejected rounds as algorithmic diagnostic data.
              </div>
            </div>

            {/* Card 3 */}
            <div className={styles.wellnessCard}>
              <div>
                <div className={styles.wellnessCardHeader}>
                  <HeartPulse size={16} />
                  <h3>3. Preventing Placement Burnout</h3>
                </div>
                <p className={styles.wellnessCardText}>
                  Grinding DSA for 8–10 hours daily without deliberate mental decompression yields rapid diminishing returns, leading to cognitive fatigue right before crucial interviews. Rest is an active component of neuroplastic pattern consolidation.
                </p>
                <p className={styles.wellnessCardText}>
                  <strong>Action Protocol:</strong> Cap daily active problem solving at 3–4 focused hours with Pomodoro breaks. Protect 7+ hours of sleep before technical rounds, and conduct regular mental check-ins to catch early signs of cynicism, exhaustion, or cognitive brain fog before assessment day.
                </p>
              </div>
              <div className={styles.wellnessTakeaway}>
                Rule: Sustainable daily cadence beats desperate all-nighters.
              </div>
            </div>
          </div>

          {/* Editorial Callout with Dofollow Link */}
          <div className={styles.resourceCallout}>
            <Sparkles size={20} className={styles.resourceIcon} />
            <div className={styles.resourceContent}>
              <h4 className={styles.resourceTitle}>
                Evidence-Based Decompression: Reframe Anxious Distortions
              </h4>
              <p className={styles.resourceBody}>
                When preparing for rigorous placement drives, maintaining mental clarity is just as vital as mastering prefix sums or dynamic programming. If you find yourself experiencing interview anxiety, racing thoughts before live coding rounds, or post-rejection fatigue, utilizing dedicated wellness spaces like{" "}
                <a
                  href="https://getrealign.in"
                  target="_blank"
                  rel="noopener"
                  className={styles.contextualLink}
                >
                  ReAlign (getrealign.in)
                  <ExternalLink size={12} style={{ display: "inline", verticalAlign: "middle", marginLeft: "4px" }} />
                </a>{" "}
                provides evidence-informed cognitive reframing, confidential burnout tracking, and guided mental reflection tools designed to restore calm and cognitive focus during high-pressure hiring cycles.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.coreCSSection}>
          <h2 style={{ fontSize: "var(--font-size-xl)", marginBottom: "var(--space-4)" }}>
            Core Computer Science High-Yield Checklist
          </h2>
          <div className={styles.subjectGrid}>
            <div className={styles.subjectCard}>
              <div className={styles.subjectHeader}>
                <Cpu size={16} />
                <h3>Operating Systems (OS)</h3>
              </div>
              <ul>
                <li>Process vs Thread (Address space sharing)</li>
                <li>CPU Scheduling (Round Robin, FCFS, Priority)</li>
                <li>Deadlock 4 Conditions (Coffman conditions)</li>
                <li>Virtual Memory &amp; Paging (Page fault handling)</li>
                <li>Semaphores &amp; Mutex (Race conditions)</li>
              </ul>
            </div>

            <div className={styles.subjectCard}>
              <div className={styles.subjectHeader}>
                <Database size={16} />
                <h3>Database Management (DBMS)</h3>
              </div>
              <ul>
                <li>ACID Properties (Atomicity, Consistency, Isolation, Durability)</li>
                <li>Indexing: B+ Tree internals &amp; why B+ Trees are chosen for disk storage</li>
                <li>SQL Joins: Inner, Left, Right, Full Outer</li>
                <li>Normalization: 1NF, 2NF, 3NF, BCNF</li>
                <li>Transactions &amp; Concurrency Isolation Levels</li>
              </ul>
            </div>

            <div className={styles.subjectCard}>
              <div className={styles.subjectHeader}>
                <Network size={16} />
                <h3>Computer Networks (CN)</h3>
              </div>
              <ul>
                <li>OSI 7-Layer Model vs TCP/IP 4-Layer Model</li>
                <li>TCP 3-Way Handshake (SYN, SYN-ACK, ACK)</li>
                <li>TCP vs UDP: Reliability vs Speed tradeoffs</li>
                <li>DNS Resolution Flow (Browser &rarr; Local &rarr; Root &rarr; TLD)</li>
                <li>HTTP vs HTTPS (TLS handshake &amp; encryption)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <div style={{ marginTop: "var(--space-12)" }}>
          <SeoFaqAccordion
            title="Technical Interview Readiness FAQs"
            subtitle="Essential protocols, behavioral rubrics, and cognitive resilience strategies for software engineering interviews."
            items={interviewFaqs}
          />
        </div>
      </div>
    </>
  );
}

