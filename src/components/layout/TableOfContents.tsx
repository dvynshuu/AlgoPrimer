"use client";

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = items
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

      const triggerPosition = window.innerHeight * 0.35;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerPosition) {
          setActiveId(items[i].id);
          return;
        }
      }

      if (items.length > 0) {
        setActiveId(items[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 70;
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

  return (
    <nav className={styles.toc} aria-label="On this page">
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
