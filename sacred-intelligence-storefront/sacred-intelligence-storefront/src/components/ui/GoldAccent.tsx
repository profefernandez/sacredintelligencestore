"use client";

import { colors } from "@/lib/design-system";

interface GoldAccentProps {
  children: React.ReactNode;
  className?: string;
}

export function GoldAccent({ children, className = "" }: GoldAccentProps) {
  return (
    <span
      className={`font-serif italic ${className}`}
      style={{ color: colors.gold.primary }}
    >
      {children}
    </span>
  );
}
