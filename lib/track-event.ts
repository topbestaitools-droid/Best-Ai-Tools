import { ANALYTICS_EVENTS } from "@/lib/analytics";

export async function trackEventServer(
  event: string,
  metadata?: Record<string, any>
) {
  try {
    const eventKey = event.toUpperCase().replace(/-/g, "_") as keyof typeof ANALYTICS_EVENTS;
    const eventConfig = ANALYTICS_EVENTS[eventKey];

    if (!eventConfig) {
      console.warn(`Unknown event: ${event}`);
      return;
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        ...eventConfig,
        ...metadata
      })
    });
  } catch (error) {
    console.error("Failed to track event:", error);
  }
}

export function trackEventClient(
  event: string,
  metadata?: Record<string, any>
) {
  if (typeof window === "undefined") return;

  try {
    const eventKey = event.toUpperCase().replace(/-/g, "_") as keyof typeof ANALYTICS_EVENTS;
    const eventConfig = ANALYTICS_EVENTS[eventKey];

    if (!eventConfig) {
      console.warn(`Unknown event: ${event}`);
      return;
    }

    // Send to analytics
    navigator.sendBeacon(
      `/api/analytics`,
      JSON.stringify({
        event,
        ...eventConfig,
        ...metadata,
        timestamp: new Date().toISOString()
      })
    );
  } catch (error) {
    console.error("Failed to track event:", error);
  }
}
