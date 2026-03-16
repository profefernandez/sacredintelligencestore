"use client";

import { colors } from "@/lib/design-system";
import { useTheme } from "@/components/layout/ThemeProvider";

interface GoldAccentProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function GoldAccent({ children, style }: GoldAccentProps) {
  const { theme } = useTheme();
  const color =
    theme === "dark" ? colors.dark.accentGold : colors.light.accentGoldText;

  return (
    <span
      style={{
        color,
        fontStyle: "italic",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
