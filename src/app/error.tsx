"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error cleanly
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "65vh",
        padding: "var(--space-8)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--font-size-xs)",
          color: "var(--error)",
          background: "var(--error-subtle)",
          padding: "0.2rem 0.6rem",
          borderRadius: "var(--radius-xs)",
          marginBottom: "var(--space-4)",
        }}
      >
        RUNTIME_EXCEPTION &bull; EXECUTION_HALTED
      </div>
      <h1 style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-2)" }}>
        An unexpected error occurred
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          maxWidth: "480px",
          lineHeight: 1.6,
          marginBottom: "var(--space-6)",
          fontSize: "var(--font-size-sm)",
        }}
      >
        {error.message || "A rendering or data error interrupted this view."}
      </p>
      <div style={{ display: "flex", gap: "var(--space-3)" }}>
        <Button variant="primary" onClick={() => reset()}>
          Try Again
        </Button>
        <Button href="/" variant="secondary">
          Return Home
        </Button>
      </div>
    </div>
  );
}
