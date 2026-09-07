import React from "react";
import { HelpCircle, AlertTriangle, Compass, Lightbulb, Info } from "lucide-react";
import styles from "./Callout.module.css";

interface CalloutProps {
  type?: "why" | "mistake" | "placement" | "intuition" | "info";
  title?: string;
  children: React.ReactNode;
}

const icons = {
  why: HelpCircle,
  mistake: AlertTriangle,
  placement: Compass,
  intuition: Lightbulb,
  info: Info,
};

const defaultTitles = {
  why: "Why do we need this?",
  mistake: "Common Beginner Mistake",
  placement: "Placement & Interview Connection",
  intuition: "Mental Model & Intuition",
  info: "Technical Note",
};

export const Callout: React.FC<CalloutProps> = ({
  type = "info",
  title,
  children,
}) => {
  const IconComponent = icons[type];
  const displayTitle = title || defaultTitles[type];
  const typeClass = styles[type] || styles.info;

  return (
    <aside className={`${styles.callout} ${typeClass}`}>
      <div className={styles.header}>
        <IconComponent size={16} aria-hidden="true" />
        <span>{displayTitle}</span>
      </div>
      <div className={styles.content}>{children}</div>
    </aside>
  );
};
