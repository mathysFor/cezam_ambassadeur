"use client";

import { useEffect } from "react";
import { trackOnce } from "@/lib/track";

export function SectionTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = document.querySelectorAll<HTMLElement>("[data-section]");
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const section = (entry.target as HTMLElement).dataset.section;
            if (section) {
              trackOnce("section_view", { section });
            }
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return null;
}
