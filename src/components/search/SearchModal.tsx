"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import styles from "./SearchModal.module.css";
import { searchContent } from "@/lib/search/searchIndex";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Ensure keyboard selection scrolls into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.children[selectedIndex] as HTMLElement | undefined;
      activeEl?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return searchContent(q);
  }, [query]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  // Handle keyboard navigation inside search modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      router.push(results[selectedIndex].url);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search curriculum"
      >
        <div className={styles.inputRow}>
          <SearchIcon size={18} className={styles.searchIcon} aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Search lessons, problems, patterns, topics (e.g. Two Pointers, BFS, Kadane)..."
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
            aria-autocomplete="list"
          />
          <kbd className={styles.kbd}>ESC</kbd>
        </div>

        <div ref={resultsContainerRef} className={styles.results} role="listbox">
          {query.trim().length === 0 ? (
            <div className={styles.empty}>
              Type keywords above to search all lessons, DSA roadmap topics, interview problems, and revision cards.
            </div>
          ) : results.length > 0 ? (
            results.map((item, index) => (
              <Link
                key={item.id}
                href={item.url}
                className={`${styles.item} ${index === selectedIndex ? styles.itemFocused : ""}`}
                onClick={onClose}
                role="option"
                aria-selected={index === selectedIndex}
              >
                <div className={styles.itemHeader}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemCategory}>{item.category}</span>
                </div>
                <div className={styles.itemContext}>{item.context}</div>
              </Link>
            ))
          ) : (
            <div className={styles.empty}>
              No matching lessons, problems, or revision items found for &quot;{query}&quot;.
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <span>Use &uarr; &darr; to navigate, Enter to open, Esc to close</span>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
};
