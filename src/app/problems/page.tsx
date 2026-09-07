"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useProgress } from "@/lib/progress/ProgressContext";
import { problems } from "@/content/problems";
import { Search, CheckCircle2, ArrowRight, Building2 } from "lucide-react";
import styles from "./problems.module.css";

const FEATURED_COMPANIES = [
  "All",
  "Amazon",
  "Microsoft",
  "Google",
  "Meta",
  "TCS",
  "Infosys",
  "Goldman Sachs",
  "Bloomberg",
  "Apple",
  "Adobe",
  "Uber",
  "Flipkart",
];

export default function ProblemsPage() {
  const { isProblemSolved } = useProgress();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedCompany, setSelectedCompany] = useState<string>("All");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [selectedPattern, setSelectedPattern] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const topics = useMemo(() => {
    const set = new Set(problems.map((p) => p.topic));
    return ["All", ...Array.from(set)];
  }, []);

  const patterns = useMemo(() => {
    const set = new Set(problems.map((p) => p.pattern));
    return ["All", ...Array.from(set)];
  }, []);

  const filteredProblems = useMemo(() => {
    return problems.filter((prob) => {
      if (selectedDifficulty !== "All" && prob.difficulty !== selectedDifficulty) {
        return false;
      }
      if (selectedCompany !== "All") {
        if (!prob.companies?.some((c) => c.toLowerCase() === selectedCompany.toLowerCase())) {
          return false;
        }
      }
      if (selectedTopic !== "All" && prob.topic !== selectedTopic) {
        return false;
      }
      if (selectedPattern !== "All" && prob.pattern !== selectedPattern) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prob.title.toLowerCase().includes(q);
        const matchesPattern = prob.pattern.toLowerCase().includes(q);
        const matchesTopic = prob.topic.toLowerCase().includes(q);
        const matchesSubtopic = prob.subtopic.toLowerCase().includes(q);
        const matchesCompany = prob.companies?.some((c) => c.toLowerCase().includes(q));
        if (!matchesTitle && !matchesPattern && !matchesTopic && !matchesSubtopic && !matchesCompany) {
          return false;
        }
      }
      return true;
    });
  }, [selectedDifficulty, selectedCompany, selectedTopic, selectedPattern, searchQuery]);

  const solvedCount = problems.filter((p) => isProblemSolved(p.id)).length;
  const percent = Math.round((solvedCount / problems.length) * 100);

  const getDiffBadge = (diff: string): "easy" | "medium" | "hard" => {
    if (diff === "Easy") return "easy";
    if (diff === "Medium") return "medium";
    return "hard";
  };

  return (
    <div className={styles.container}>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Problems" }]} />

      <div className={styles.header}>
        <div>
          <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBottom: "var(--space-2)" }}>
            <Badge variant="level">PEDAGOGICAL PROBLEM BANK</Badge>
            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              {problems.length} Curated Core Problems
            </span>
          </div>
          <h1 className={styles.title}>Practice Problems</h1>
          <p className={styles.desc}>
            Curated high-frequency interview problems asked by top tech firms (Amazon, Microsoft, Google, Meta, TCS, Infosys, Goldman Sachs).
            Every problem includes 3-tier solutions (Brute Force, Better, Optimal) in Java, C++, and Python, step-by-step dry runs, and complexity proofs.
          </p>
        </div>

        <div className={styles.progressCard}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-2)" }}>
            <span style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
              Core Progress
            </span>
            <span style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>
              {solvedCount} / {problems.length} Solved
            </span>
          </div>
          <ProgressBar value={percent} showPercent={false} />
        </div>
      </div>

      {/* Company Filter Bar */}
      <div style={{ marginBottom: "var(--space-4)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-2)" }}>
          <Building2 size={14} style={{ color: "var(--accent-primary)" }} />
          <span style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Target Company
          </span>
          {selectedCompany !== "All" && (
            <button
              onClick={() => setSelectedCompany("All")}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--accent-hover)",
                fontSize: "var(--font-size-xs)",
                fontFamily: "var(--font-mono)",
                cursor: "pointer",
                padding: 0,
                textDecoration: "underline",
              }}
            >
              (Clear filter)
            </button>
          )}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
          {FEATURED_COMPANIES.map((company) => {
            const isActive = selectedCompany === company;
            return (
              <button
                key={company}
                type="button"
                className={`${styles.companyPill} ${isActive ? styles.companyPillActive : ""}`}
                onClick={() => setSelectedCompany(company)}
              >
                {company}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.searchBox}>
          <Search size={14} style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search problems, companies, or patterns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Difficulty:</span>
          {["All", "Easy", "Medium", "Hard"].map((d) => (
            <button
              key={d}
              type="button"
              className={`${styles.filterBtn} ${selectedDifficulty === d ? styles.filterBtnActive : ""}`}
              onClick={() => setSelectedDifficulty(d)}
            >
              {d}
            </button>
          ))}
        </div>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Topic:</span>
          <select
            className={styles.select}
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Pattern:</span>
          <select
            className={styles.select}
            value={selectedPattern}
            onChange={(e) => setSelectedPattern(e.target.value)}
          >
            {patterns.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Problems Table / List */}
      <div className={styles.problemList}>
        {filteredProblems.map((prob) => {
          const isSolved = isProblemSolved(prob.id);

          return (
            <div key={prob.id} className={styles.problemRow}>
              <div className={styles.leftCol}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  {isSolved ? (
                    <CheckCircle2 size={16} style={{ color: "var(--success)" }} />
                  ) : (
                    <div className={styles.unsolvedCircle} />
                  )}
                  <Link href={`/problems/${prob.slug}`} className={styles.probLink}>
                    {prob.title}
                  </Link>
                </div>
                <div className={styles.subMeta}>
                  <span>{prob.topic} &bull; {prob.subtopic}</span>
                  <span>&bull;</span>
                  <span style={{ color: "var(--accent-hover)" }}>Pattern: {prob.pattern}</span>
                </div>

                {prob.companies && prob.companies.length > 0 && (
                  <div className={styles.companyTags}>
                    {prob.companies.slice(0, 4).map((c) => (
                      <span
                        key={c}
                        className={styles.companyTag}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCompany(c);
                        }}
                        title={`Filter by ${c}`}
                      >
                        {c}
                      </span>
                    ))}
                    {prob.companies.length > 4 && (
                      <span
                        className={styles.companyTag}
                        style={{ color: "var(--text-muted)" }}
                        title={prob.companies.slice(4).join(", ")}
                      >
                        +{prob.companies.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className={styles.rightCol}>
                <Badge variant={getDiffBadge(prob.difficulty)}>{prob.difficulty}</Badge>
                <span className={styles.progressionTag}>{prob.progressionLevel.split(":")[0]}</span>
                <Button href={`/problems/${prob.slug}`} variant="secondary" size="sm" icon={<ArrowRight size={13} />}>
                  Solve
                </Button>
              </div>
            </div>
          );
        })}

        {filteredProblems.length === 0 && (
          <div className={styles.emptyState}>
            No problems match your current filter selections.
          </div>
        )}
      </div>
    </div>
  );
}
