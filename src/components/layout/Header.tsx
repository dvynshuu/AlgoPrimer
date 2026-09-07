"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Terminal, CheckCircle2 } from "lucide-react";
import styles from "./Header.module.css";
import { SearchModal } from "@/components/search/SearchModal";
import { useProgress } from "@/lib/progress/ProgressContext";

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
    { label: "Learn", href: "/learn" },
    { label: "Languages", href: "/languages" },
    { label: "DSA", href: "/dsa" },
    { label: "Problems", href: "/problems" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Revision", href: "/revision" },
    { label: "Interview", href: "/interview" },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.brandGroup}>
            <Link href="/" className={styles.logo}>
              <Terminal size={18} className={styles.logoAccent} />
              <span>Forge</span>
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

            <Link href="/profile" className={styles.statsBtn} title="View your progress dashboard">
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
            href="/profile"
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
