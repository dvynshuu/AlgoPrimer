import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

interface BaseButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

type AsButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined;
  };

type AsLinkProps = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
  };

export type ButtonProps = AsButtonProps | AsLinkProps;

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = "secondary",
    size = "md",
    icon,
    children,
    className = "",
  } = props;

  const combinedClasses = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

  if (props.href !== undefined) {
    const { href, ...rest } = props;
    const linkProps = { ...rest };
    delete (linkProps as Record<string, unknown>).variant;
    delete (linkProps as Record<string, unknown>).size;
    delete (linkProps as Record<string, unknown>).icon;
    delete (linkProps as Record<string, unknown>).className;
    delete (linkProps as Record<string, unknown>).children;

    return (
      <Link href={href} className={combinedClasses} {...linkProps}>
        {icon}
        {children}
      </Link>
    );
  }

  const buttonProps = { ...props };
  delete (buttonProps as Record<string, unknown>).variant;
  delete (buttonProps as Record<string, unknown>).size;
  delete (buttonProps as Record<string, unknown>).icon;
  delete (buttonProps as Record<string, unknown>).className;
  delete (buttonProps as Record<string, unknown>).children;

  return (
    <button className={combinedClasses} {...buttonProps}>
      {icon}
      {children}
    </button>
  );
};
