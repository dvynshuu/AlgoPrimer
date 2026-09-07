import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        color: "var(--text-muted)",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--font-size-sm)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        <span
          style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "var(--accent-primary)",
            animation: "pulse 1.2s ease-in-out infinite",
          }}
        />
        <span>Compiling curriculum content...</span>
      </div>
    </div>
  );
}
