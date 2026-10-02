import React from "react";
import type { Metadata } from "next";
import { ProfileDashboardClient } from "@/components/profile/ProfileDashboardClient";
import { createPageMetadata } from "@/lib/seo";
import { getProfilePath } from "@/lib/routes";

export const metadata: Metadata = createPageMetadata({
  title: "My Dashboard & Learning Progress",
  description:
    "View your personalized coding interview preparation progress, completed lessons, solved problems, and revision targets.",
  path: getProfilePath(),
  noIndex: true,
});

export default function ProfilePage() {
  return <ProfileDashboardClient />;
}
