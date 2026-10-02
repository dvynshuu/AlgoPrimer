import React from "react";
import { SearchClient } from "@/components/search/SearchClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Search Curriculum",
  description: "Search across programming lessons, DSA roadmap topics, interview problems, and revision cards.",
  path: "/search",
  noIndex: true, // Application utility route: noindex, follow
});

export default function SearchPage() {
  return <SearchClient />;
}
