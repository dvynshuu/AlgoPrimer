import React from "react";
import styles from "./Badge.module.css";

interface BadgeProps {
  variant?: "default" | "easy" | "medium" | "hard" | "level" | "pattern";
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  children,
  className = "",
}) => {
  const variantClass = styles[variant] || "";
  return (
    <span className={`${styles.badge} ${variantClass} ${className}`}>
      {children}
    </span>
  );
};
