export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

type AnalyticsWindow = Window & {
  plausible?: (event: string, options?: { props?: AnalyticsProps }) => void;
  umami?: { track: (event: string, data?: AnalyticsProps) => void };
};

/** Fire-and-forget, cookieless analytics. No-ops when no provider is configured. */
export function track(event: string, props: AnalyticsProps = {}): void {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  try {
    w.plausible?.(event, { props });
    w.umami?.track(event, props);
    if (import.meta.env.DEV && !w.plausible && !w.umami) {
      console.debug(`[analytics] ${event}`, props);
    }
  } catch {
    // Analytics must never break the page.
  }
}
