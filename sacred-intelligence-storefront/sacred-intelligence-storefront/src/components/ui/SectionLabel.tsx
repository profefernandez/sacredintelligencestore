"use client";

import { colors, typography } from "@/lib/design-system";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`${typography.label} mb-4 block ${className}`}
      style={{ color: colors.text.gold }}
    >
      {children}
    </span>
  );
}
