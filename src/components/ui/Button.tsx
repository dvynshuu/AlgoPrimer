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

const CUSTOM_PROPS = new Set(["variant", "size", "icon", "children", "className", "href"]);

function omitCustomProps(props: Record<string, unknown>): Record<string, unknown> {
  const rest: Record<string, unknown> = {};
  for (const key of Object.keys(props)) {
    if (!CUSTOM_PROPS.has(key)) {
      rest[key] = props[key];
    }
  }
  return rest;
}

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
    const linkProps = omitCustomProps(props as unknown as Record<string, unknown>);
    return (
      <Link href={props.href} className={combinedClasses} {...linkProps}>
        {icon}
        {children}
      </Link>
    );
  }

  const buttonProps = omitCustomProps(props as unknown as Record<string, unknown>);
  return (
    <button className={combinedClasses} {...buttonProps}>
      {icon}
      {children}
    </button>
  );
};
