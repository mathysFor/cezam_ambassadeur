"use client";

import { useEffect } from "react";
import { trackPageview } from "@/lib/track";

export function TrackPageview() {
  useEffect(() => {
    trackPageview();
  }, []);
  return null;
}
