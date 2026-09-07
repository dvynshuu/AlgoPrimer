import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { ProgressProvider } from "@/lib/progress/ProgressContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Forge — Open Learning Coding Platform for Everyone",
  description:
    "A free, open learning platform engineered from first principles. Master programming fundamentals, deep computer science, data structures, algorithms, and technical interviews.",
  keywords: [
    "open learning",
    "coding platform",
    "learn programming",
    "computer science",
    "data structures",
    "algorithms",
    "Java",
    "C++",
    "Python",
    "JavaScript",
    "technical interview",
    "problem solving",
    "forge",
  ],
  authors: [{ name: "Forge Community" }],
  openGraph: {
    title: "Forge — Open Learning Coding Platform for Everyone",
    description: "From your first line of code to algorithmic mastery. Free, open, and built for everyone.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProgressProvider>
          <Header />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, width: "100%", maxWidth: "100vw", overflowX: "clip" }}>
            {children}
          </div>
          <Footer />
        </ProgressProvider>
      </body>
    </html>
  );
}
