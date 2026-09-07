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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.trim();
    return searchContent(q || "arrays");
  }, [query]);

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
    <div className={styles.backdrop} onClick={onClose}>
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
            placeholder="Search lessons, problems, patterns, topics (e.g. HashMap, Two Sum, DP)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <kbd className={styles.kbd}>ESC</kbd>
        </div>

        <div className={styles.results}>
          {results.length > 0 ? (
            results.map((item, index) => (
              <Link
                key={item.id}
                href={item.url}
                className={`${styles.item} ${index === selectedIndex ? styles.itemFocused : ""}`}
                onClick={onClose}
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
          <span>Use &uarr; &darr; to navigate, Enter to open</span>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
};
