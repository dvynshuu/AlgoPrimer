import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { ProgressProvider } from "@/lib/progress/ProgressContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  SITE_NAME,
  SITE_TAGLINE,
  DEFAULT_DESCRIPTION,
  SITE_URL,
} from "@/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "programming",
    "data structures",
    "algorithms",
    "coding interview",
    "DSA roadmap",
    "software engineer",
    "Java",
    "C++",
    "Python",
    "JavaScript",
    "problem solving",
    "algoprimer",
  ],
  authors: [{ name: `${SITE_NAME} Editorial Team` }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
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
