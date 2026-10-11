"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Copy, Check } from "lucide-react";
import styles from "./CodeBlock.module.css";
import { CodeByLanguage } from "@/types/content";

interface CodeBlockProps {
  code: CodeByLanguage | string;
  defaultLang?: "java" | "cpp" | "python" | "javascript";
  title?: string;
  singleLanguageLabel?: string;
}

const LANGUAGE_LABELS: Record<string, string> = {
  java: "Java",
  cpp: "C++",
  python: "Python",
  javascript: "JavaScript",
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  defaultLang = "java",
  title,
  singleLanguageLabel,
}) => {
  const isMulti = typeof code === "object" && code !== null;
  const [activeLang, setActiveLang] = useState<"java" | "cpp" | "python" | "javascript">(defaultLang);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const availableLangs = useMemo(() => {
    if (!isMulti) return [];
    const multiCode = code as CodeByLanguage;
    return (["java", "cpp", "python", "javascript"] as const).filter(
      (lang) => Boolean(multiCode[lang])
    );
  }, [isMulti, code]);

  const effectiveLang =
    isMulti && availableLangs.length > 0
      ? availableLangs.includes(activeLang)
        ? activeLang
        : availableLangs.includes(defaultLang)
        ? defaultLang
        : availableLangs[0]
      : activeLang;

  const currentCode = isMulti ? ((code as CodeByLanguage)[effectiveLang] || "") : (code as string);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard failures in restricted contexts
    }
  };

  const lines = useMemo(() => currentCode.trim().split("\n"), [currentCode]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          {isMulti ? (
            availableLangs.map((lang) => (
              <button
                key={lang}
                type="button"
                className={`${styles.tab} ${effectiveLang === lang ? styles.tabActive : ""}`}
                onClick={() => setActiveLang(lang)}
              >
                {LANGUAGE_LABELS[lang] || lang}
              </button>
            ))
          ) : (
            <span className={styles.tab}>
              {singleLanguageLabel || title || "Code"}
            </span>
          )}
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.copyBtn}
            onClick={handleCopy}
            title="Copy code"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check size={13} style={{ color: "var(--success)" }} />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className={styles.codeArea}>
        <div className={styles.lineNumbers} aria-hidden="true">
          {lines.map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <pre className={styles.codeContent}>
          <code>{currentCode.trim()}</code>
        </pre>
      </div>
    </div>
  );
};
