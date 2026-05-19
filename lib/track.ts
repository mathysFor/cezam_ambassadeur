type Details = Record<string, unknown>;

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let sid = sessionStorage.getItem("track_sid");
    if (!sid) {
      sid = crypto.randomUUID();
      sessionStorage.setItem("track_sid", sid);
    }
    return sid;
  } catch {
    return "";
  }
}

export function track(event: string, details?: Details): void {
  if (typeof window === "undefined") return;
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event,
      path: window.location.pathname,
      details: details ?? null,
      session_id: getSessionId(),
    }),
    keepalive: true,
  }).catch(() => {});
}

/** Fires only once per session per (event + details key). */
export function trackOnce(event: string, details?: Details): void {
  if (typeof window === "undefined") return;
  const key = `track_once::${event}::${JSON.stringify(details ?? {})}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    // sessionStorage disabled — fire anyway
  }
  track(event, details);
}

export function trackPageview(): void {
  track("pageview");
}
