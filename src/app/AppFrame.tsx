"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { useAuth } from "@/lib/AuthContext";

interface AppFrameProps {
  children: React.ReactNode;
}

export function AppFrame({ children }: AppFrameProps) {
  const { user } = useAuth(); // or whatever your hook returns

  return user ? <DashboardShell>{children}</DashboardShell> : <>{children}</>;
}
