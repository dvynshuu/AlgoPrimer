import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { getHomePath, getDsaPath } from "@/lib/routes";

export default function NotFound() {
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
          color: "var(--accent-primary)",
          background: "var(--accent-subtle)",
          padding: "0.2rem 0.6rem",
          borderRadius: "var(--radius-xs)",
          marginBottom: "var(--space-4)",
        }}
      >
        HTTP 404 &bull; NULL_POINTER_EXCEPTION
      </div>
      <h1 style={{ fontSize: "var(--font-size-3xl)", marginBottom: "var(--space-2)" }}>
        Page Does Not Exist
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          maxWidth: "480px",
          lineHeight: 1.6,
          marginBottom: "var(--space-6)",
        }}
      >
        The lesson, problem, or topic path you requested was not found in our curriculum index.
        It may be planned for an upcoming release or the URL may have a typo.
      </p>
      <div style={{ display: "flex", gap: "var(--space-3)" }}>
        <Button href={getHomePath()} variant="primary" icon={<ArrowLeft size={14} />}>
          Return Home
        </Button>
        <Button href={getDsaPath()} variant="secondary">
          Explore DSA Roadmap
        </Button>
      </div>
    </div>
  );
}
