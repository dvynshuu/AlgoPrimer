import React from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Cpu, Database, Network } from "lucide-react";
import styles from "./interview.module.css";

export const metadata = {
  title: "Placement Interview Architecture & Guide — CampusPrep",
  description: "Comprehensive guide to campus placement rounds: OA, Technical DSA, Core CS, and HR rounds.",
};

export default function InterviewPage() {
  return (
    <div className={styles.container}>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Interview Guide" }]} />

      <div className={styles.header}>
        <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
          <Badge variant="level">PLACEMENT READINESS</Badge>
          <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            Campus Hiring Playbook
          </span>
        </div>
        <h1 className={styles.title}>The Campus Placement Hiring Funnel</h1>
        <p className={styles.desc}>
          College campus placement drives follow a consistent 4-round pipeline. Understanding what interviewers
          look for in each round eliminates surprise and helps you target your preparation effectively.
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
            1-on-1 live coding session (Google Meet/Zoom or in-person). The interviewer gives 1 or 2 medium problems and observes your thinking process.
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
            <Badge variant="level">Depth & Architecture</Badge>
          </div>
          <h2 className={styles.roundTitle}>Technical Interview II (Core CS & Projects)</h2>
          <p className={styles.roundDesc}>
            Evaluates your understanding of Operating Systems, DBMS, Computer Networks, and projects on your resume.
          </p>
          <div className={styles.bulletList}>
            <div><strong>Core Topics:</strong> Virtual memory, paging, process vs thread, indexing in MySQL/Postgres, ACID transactions, TCP vs UDP, HTTP headers.</div>
            <div><strong>Strategy:</strong> Be prepared to explain every single line of code in the projects listed on your resume.</div>
          </div>
        </div>

        {/* Round 4 */}
        <div className={styles.roundCard}>
          <div className={styles.roundHeader}>
            <span className={styles.roundTag}>ROUND 04</span>
            <Badge variant="easy">Behavioral</Badge>
          </div>
          <h2 className={styles.roundTitle}>HR & Cultural Fit Round</h2>
          <p className={styles.roundDesc}>
            Evaluates team compatibility, willingness to learn, adaptability, communication clarity, and long-term retention.
          </p>
          <div className={styles.bulletList}>
            <div><strong>Format:</strong> STAR method (Situation, Task, Action, Result) for situational questions.</div>
            <div><strong>Strategy:</strong> Prepare concrete examples of resolving team conflicts, overcoming academic setbacks, and handling challenging deadlines.</div>
          </div>
        </div>
      </div>

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
              <li>Virtual Memory & Paging (Page fault handling)</li>
              <li>Semaphores & Mutex (Race conditions)</li>
            </ul>
          </div>

          <div className={styles.subjectCard}>
            <div className={styles.subjectHeader}>
              <Database size={16} />
              <h3>Database Management (DBMS)</h3>
            </div>
            <ul>
              <li>ACID Properties (Atomicity, Consistency, Isolation, Durability)</li>
              <li>Indexing: B+ Tree internals & why B+ Trees are chosen for disk storage</li>
              <li>SQL Joins: Inner, Left, Right, Full Outer</li>
              <li>Normalization: 1NF, 2NF, 3NF, BCNF</li>
              <li>Transactions & Concurrency Isolation Levels</li>
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
              <li>HTTP vs HTTPS (TLS handshake & encryption)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
