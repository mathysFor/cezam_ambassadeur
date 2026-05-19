"use client";

import type { AnchorHTMLAttributes } from "react";
import { track } from "@/lib/track";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { event: string };

export function TrackedLink({
  event,
  onClick,
  children,
  ...rest
}: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
