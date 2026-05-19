"use client";

import type { AnchorHTMLAttributes } from "react";
import { track } from "@/lib/track";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  details?: Record<string, unknown>;
};

export function TrackedLink({
  event,
  details,
  onClick,
  children,
  ...rest
}: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event, details);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
