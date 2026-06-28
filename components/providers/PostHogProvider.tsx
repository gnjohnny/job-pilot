"use client";

import { ReactNode } from "react";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { initPostHog, posthog } from "@/lib/posthog-client";

// Initialize PostHog client-side once
initPostHog();

type Props = {
  children: ReactNode;
};

export function PostHogProvider({ children }: Props) {
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
