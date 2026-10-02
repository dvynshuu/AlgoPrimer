"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { searchContent } from "@/lib/search/searchIndex";
import { getHomePath } from "@/lib/routes";
import { Search as SearchIcon } from "lucide-react";
import styles from "./SearchClient.module.css";

const CATEGORIES = ["All", "Language", "DSA Topic", "DSA Lesson", "Problem", "Revision", "Interview"];

export function SearchClient() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 120);
    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => {
    const q = debouncedQuery.trim();
    if (!q) return [];
    return searchContent(q, selectedCategory);
  }, [debouncedQuery, selectedCategory]);

  return (
    <div className={styles.container}>
      <Breadcrumbs items={[{ label: "Home", href: getHomePath() }, { label: "Search" }]} />

      <header className={styles.header}>
        <h1 className={styles.title}>Global Curriculum Search</h1>
        <p className={styles.desc}>
          Search across language foundations, DSA roadmap topics, 3-tier problem solutions, and revision cheat sheets.
        </p>

        <div className={styles.inputBox}>
          <SearchIcon size={18} className={styles.icon} aria-hidden="true" />
          <input
            type="text"
            className={styles.input}
            placeholder="Type a concept, algorithm, or problem name (e.g. HashMap, Kadane, Two Pointers)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            aria-label="Search curriculum"
          />
        </div>

        <div className={styles.catFilterRow} role="tablist" aria-label="Filter by category">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={selectedCategory === c}
              className={`${styles.catBtn} ${selectedCategory === c ? styles.catBtnActive : ""}`}
              onClick={() => setSelectedCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      <main className={styles.resultsList}>
        <div className={styles.countMeta}>
          {query.trim().length === 0
            ? "Enter keywords to begin search"
            : `Showing ${results.length} matching item${results.length === 1 ? "" : "s"}`}
        </div>

        {results.map((item) => (
          <Link key={item.id} href={item.url} className={styles.resultCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>{item.title}</span>
              <Badge variant="pattern">{item.category}</Badge>
            </div>
            <p className={styles.cardContext}>{item.context}</p>
          </Link>
        ))}

        {query.trim().length > 0 && results.length === 0 && (
          <div className={styles.empty}>
            No results found for &ldquo;{debouncedQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
          </div>
        )}
      </main>
    </div>
  );
}
