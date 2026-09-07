"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { searchContent } from "@/lib/search/searchIndex";
import { Search as SearchIcon } from "lucide-react";
import styles from "./searchPage.module.css";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const results = useMemo(() => {
    const q = query.trim();
    return searchContent(q || "arrays");
  }, [query]);

  const categories = ["All", "Language", "DSA Topic", "DSA Lesson", "Problem", "Revision", "Interview"];

  const filtered = selectedCategory === "All"
    ? results
    : results.filter((r) => r.category === selectedCategory);

  return (
    <div className={styles.container}>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />

      <div className={styles.header}>
        <h1 className={styles.title}>Global Curriculum Search</h1>
        <p className={styles.desc}>
          Search across all language foundations, DSA roadmap topics, 3-tier problem solutions, and revision cards.
        </p>

        <div className={styles.inputBox}>
          <SearchIcon size={18} className={styles.icon} />
          <input
            type="text"
            className={styles.input}
            placeholder="Type a concept, algorithm, or problem name (e.g. HashMap, Kadane, Two Pointers)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div className={styles.catFilterRow}>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`${styles.catBtn} ${selectedCategory === c ? styles.catBtnActive : ""}`}
              onClick={() => setSelectedCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.resultsList}>
        <div style={{ fontSize: "var(--font-size-xs)", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: "var(--space-3)" }}>
          Showing {filtered.length} matching items
        </div>

        {filtered.map((item) => (
          <Link key={item.id} href={item.url} className={styles.resultCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>{item.title}</span>
              <Badge variant="pattern">{item.category}</Badge>
            </div>
            <p className={styles.cardContext}>{item.context}</p>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className={styles.empty}>
            No results found for &ldquo;{query}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
          </div>
        )}
      </div>
    </div>
  );
}
