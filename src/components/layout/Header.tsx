"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Menu, X, CheckCircle2 } from "lucide-react";
import styles from "./Header.module.css";
import { SearchModal } from "@/components/search/SearchModal";
import { useProgress } from "@/lib/progress/ProgressContext";
import {
  getHomePath,
  getLearnPath,
  getLanguagesPath,
  getDsaPath,
  getProblemsPath,
  getCompaniesPath,
  getSheetsPath,
  getRoadmapPath,
  getRevisionPath,
  getProfilePath,
} from "@/lib/routes";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { solvedProblems, completedLessons, isLoaded } = useProgress();

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "Learn", href: getLearnPath() },
    { label: "Languages", href: getLanguagesPath() },
    { label: "DSA", href: getDsaPath() },
    { label: "Problems", href: getProblemsPath() },
    { label: "Sheets", href: getSheetsPath() },
    { label: "Companies", href: getCompaniesPath() },
    { label: "Roadmap", href: getRoadmapPath() },
    { label: "Revision", href: getRevisionPath() },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.brandGroup}>
            <Link href={getHomePath()} className={styles.logo}>
              <Image
                src="/logo-mark.svg"
                alt="AlgoPrimer"
                width={22}
                height={22}
                className={styles.logoMark}
                priority
              />
              <span>Algo<span style={{ color: "var(--accent-hover)" }}>Primer</span></span>
            </Link>
          </div>

          <nav className={styles.nav} aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className={styles.rightGroup}>
            <button
              type="button"
              className={styles.searchBtn}
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search curriculum"
            >
              <Search size={14} />
              <span>Search</span>
              <kbd className={styles.kbd}>Ctrl K</kbd>
            </button>

            <Link href={getProfilePath()} className={styles.statsBtn} title="View your progress dashboard">
              <CheckCircle2 size={13} style={{ color: "var(--success)" }} />
              <span suppressHydrationWarning>{isLoaded ? solvedProblems.length + completedLessons.length : 0}</span>
            </Link>

            <button
              type="button"
              className={styles.mobileMenuBtn}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={getProfilePath()}
            className={styles.mobileLink}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard / Profile ({solvedProblems.length} solved)
          </Link>
        </div>
      )}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
