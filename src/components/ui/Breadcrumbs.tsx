import React from "react";
import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumbs" className={styles.nav}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className={styles.item}>
            {item.href && !isLast ? (
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.current} aria-current={isLast ? "page" : undefined}>
                {item.label}
              </span>
            )}
            {!isLast && <span className={styles.separator}>/</span>}
          </span>
        );
      })}
    </nav>
  );
};
