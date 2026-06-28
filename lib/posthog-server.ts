import { PostHog } from "posthog-node";

export function createPostHogServer(): PostHog {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY || process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  return new PostHog(apiKey!, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST!,
    flushAt: 1, // send immediately
    flushInterval: 0, // no batching — Next.js functions are short-lived
  });
}
