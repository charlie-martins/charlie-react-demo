"use client";

import { useEffect, useMemo } from "react";
import { usePostHog } from "posthog-js/react";
import { useAuth } from "./AuthContext";

type TaskSubmitPayload = {
  has_description: boolean;
  description_length: number;
  has_category: boolean;
  category?: string | null;
  has_due_date: boolean;
  due_date_offset_days?: number | null;
  title_length: number;
};

export function useAnalytics() {
  const posthog = usePostHog();
  const { user } = useAuth();

  // Identify authenticated users for better attribution
  useEffect(() => {
    if (!posthog) return;

    if (user) {
      posthog.identify(user.uid, {
        email: user.email,
        name: user.displayName,
      });
    } else {
      posthog.reset();
    }
  }, [posthog, user]);

  const api = useMemo(
    () => ({
      capture: (event: string, properties?: Record<string, unknown>) => {
        posthog?.capture(event, properties);
      },
      taskFormToggleAdvanced: (toState: "open" | "closed") => {
        posthog?.capture("task_form_toggle_advanced", { to_state: toState });
      },
      taskAddSubmit: (payload: TaskSubmitPayload) => {
        posthog?.capture("task_add_submit", payload);
      },
    }),
    [posthog],
  );

  return api;
}
