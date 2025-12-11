"use client";

import type { ReactNode } from "react";
import { PostHogProvider } from "posthog-js/react";
import { AuthProvider } from "@/lib/AuthContext";
import { ThemeProvider } from "@/lib/ThemeContext";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "";
  const posthogOptions = {
    api_host: "/ingest",
    ui_host: "https://eu.posthog.com",
    capture_pageview: false,
    capture_pageleave: false,
    person_profiles: "identified_only" as const,
    debug: process.env.NODE_ENV === "development",
  };

  return (
    <PostHogProvider apiKey={posthogKey} options={posthogOptions}>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </PostHogProvider>
  );
}
