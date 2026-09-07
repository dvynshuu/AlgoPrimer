import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  size = "md",
  href,
  icon,
  children,
  className = "",
  ...props
}) => {
  const combinedClasses = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {icon}
      {children}
    </button>
  );
};
