export function track(event: string) {
  if (typeof window === "undefined") return;
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, path: window.location.pathname }),
    keepalive: true,
  }).catch(() => {});
}

export function trackPageview() {
  track("pageview");
}
