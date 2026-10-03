"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import styles from "./SeoFaqAccordion.module.css";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoFaqAccordionProps {
  title?: string;
  subtitle?: string;
  items: FaqItem[];
  defaultOpenIndex?: number;
}

export const SeoFaqAccordion: React.FC<SeoFaqAccordionProps> = ({
  title = "Frequently Asked Questions",
  subtitle = "High-yield answers calibrated for technical interviews and placement assessments.",
  items,
  defaultOpenIndex = 0,
}) => {
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    new Set(defaultOpenIndex >= 0 && defaultOpenIndex < items.length ? [defaultOpenIndex] : [])
  );

  const toggle = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  if (!items || items.length === 0) return null;

  return (
    <section className={styles.container} aria-label={title}>
      <div className={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "4px" }}>
          <HelpCircle size={18} color="var(--color-primary)" />
          <h2 className={styles.title}>{title}</h2>
        </div>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <div className={styles.faqList}>
        {items.map((item, index) => {
          const isOpen = openIndices.has(index);
          const questionId = `faq-q-${index}`;
          const answerId = `faq-a-${index}`;

          return (
            <div key={item.question} className={styles.item}>
              <button
                type="button"
                className={styles.trigger}
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={answerId}
                id={questionId}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={16}
                  className={`${styles.chevron} ${isOpen ? styles.chevronRotated : ""}`}
                />
              </button>

              {isOpen && (
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className={styles.answer}
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
