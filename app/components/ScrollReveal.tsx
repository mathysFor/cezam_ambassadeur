"use client";

import { useEffect } from "react";

const SELECTORS = [
  ".section-tag",
  ".section-h",
  ".section-sub",
  ".sim-card",
  ".quote-inner",
  ".stats-inner > *",
  ".steps > *",
  ".perks-grid > *",
  ".ranks-flow > *",
  ".proof-grid > *",
  ".form-section > form",
  ".form-section > .form-sub",
  ".product-layout",
  ".product-pills > *",
].join(",");

export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const els = document.querySelectorAll<HTMLElement>(SELECTORS);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
