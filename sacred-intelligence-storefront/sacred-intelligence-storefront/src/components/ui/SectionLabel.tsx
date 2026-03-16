"use client";

import { colors, typography } from "@/lib/design-system";
import { useTheme } from "@/components/layout/ThemeProvider";

interface SectionLabelProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function SectionLabel({ children, style }: SectionLabelProps) {
  const { theme } = useTheme();
  const color =
    theme === "dark" ? colors.dark.accentGold : colors.light.accentGoldText;

  return (
    <span
      style={{
        ...typography.label,
        color,
        display: "block",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
