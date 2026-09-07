"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import styles from "./CodeBlock.module.css";
import { CodeByLanguage } from "@/types/content";

interface CodeBlockProps {
  code: CodeByLanguage | string;
  defaultLang?: "java" | "cpp" | "python" | "javascript";
  title?: string;
  singleLanguageLabel?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  defaultLang = "java",
  title,
  singleLanguageLabel,
}) => {
  const isMulti = typeof code === "object" && code !== null;
  const [activeLang, setActiveLang] = useState<"java" | "cpp" | "python" | "javascript">(defaultLang);
  const [copied, setCopied] = useState(false);

  const currentCode = isMulti ? ((code as CodeByLanguage)[activeLang] || "") : (code as string);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const lines = currentCode.trim().split("\n");

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          {isMulti ? (
            <>
              <button
                type="button"
                className={`${styles.tab} ${activeLang === "java" ? styles.tabActive : ""}`}
                onClick={() => setActiveLang("java")}
              >
                Java
              </button>
              <button
                type="button"
                className={`${styles.tab} ${activeLang === "cpp" ? styles.tabActive : ""}`}
                onClick={() => setActiveLang("cpp")}
              >
                C++
              </button>
              <button
                type="button"
                className={`${styles.tab} ${activeLang === "python" ? styles.tabActive : ""}`}
                onClick={() => setActiveLang("python")}
              >
                Python
              </button>
              {Boolean((code as CodeByLanguage).javascript) && (
                <button
                  type="button"
                  className={`${styles.tab} ${activeLang === "javascript" ? styles.tabActive : ""}`}
                  onClick={() => setActiveLang("javascript")}
                >
                  JavaScript
                </button>
              )}
            </>
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
