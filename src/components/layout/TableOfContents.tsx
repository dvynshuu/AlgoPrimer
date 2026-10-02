"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./TableOfContents.module.css";

export interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    // Use a record of visible entry ratios to reliably determine the most prominent heading
    const visibleHeadings = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleHeadings.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visibleHeadings.delete(entry.target.id);
          }
        });

        if (visibleHeadings.size > 0) {
          // Find the visible heading that is highest on screen
          let topId = "";
          let minTop = Infinity;

          visibleHeadings.forEach((top, id) => {
            if (top < minTop) {
              minTop = top;
              topId = id;
            }
          });

          if (topId) {
            setActiveId(topId);
          }
        }
      },
      {
        rootMargin: "-70px 0px -65% 0px",
        threshold: [0, 1.0],
      }
    );

    headingElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    // Preserve native browser behavior for new tabs, middle clicks, or modifier clicks
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      const headerOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveId(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <div className={styles.title}>On this page</div>
      <ul className={styles.list}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
                aria-current={isActive ? "location" : undefined}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
