import posthog from "posthog-js";

export function initPostHog(): void {
  if (typeof window !== "undefined") {
    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || process.env.NEXT_PUBLIC_POSTHOG_KEY;
    posthog.init(apiKey!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST!,
      capture_pageview: false, // manual pageview tracking
    });
  }
}

export { posthog };
