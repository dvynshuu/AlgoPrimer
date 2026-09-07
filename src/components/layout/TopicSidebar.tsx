"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import styles from "./TopicSidebar.module.css";
import { useProgress } from "@/lib/progress/ProgressContext";

export interface SidebarItem {
  id: string;
  title: string;
  href: string;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

interface TopicSidebarProps {
  sections: SidebarSection[];
}

export const TopicSidebar: React.FC<TopicSidebarProps> = ({ sections }) => {
  const pathname = usePathname();
  const { isLessonCompleted } = useProgress();

  return (
    <aside className={styles.sidebar} aria-label="Topic Navigation">
      {sections.map((sec, idx) => (
        <div key={idx}>
          <div className={styles.sectionTitle}>{sec.title}</div>
          <div>
            {sec.items.map((item) => {
              const isActive = pathname === item.href;
              const isCompleted = isLessonCompleted(item.id);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                >
                  <span className={styles.itemTitle}>
                    {isCompleted ? (
                      <CheckCircle2 size={13} className={styles.completedIcon} />
                    ) : (
                      <span className={styles.pendingDot} />
                    )}
                    <span className={styles.itemLabel} title={item.title}>
                      {item.title}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
};
