"use client";

import { colors } from "@/lib/design-system";
import { useTheme } from "@/components/layout/ThemeProvider";

interface DividerProps {
  ornament?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Divider({ ornament, style }: DividerProps) {
  const { theme } = useTheme();
  const gold =
    theme === "dark"
      ? colors.dark.accentGold
      : colors.light.accentGoldDecorative;
  const transparent =
    theme === "dark" ? colors.dark.bgPrimary : colors.light.bgPrimary;

  if (ornament) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          margin: "2rem 0",
          ...style,
        }}
      >
        <hr
          style={{
            flex: 1,
            border: "none",
            height: "1px",
            background: `linear-gradient(to right, ${transparent}, ${gold})`,
          }}
        />
        <span style={{ color: gold, fontSize: "1.25rem", lineHeight: 1 }}>
          {ornament}
        </span>
        <hr
          style={{
            flex: 1,
            border: "none",
            height: "1px",
            background: `linear-gradient(to left, ${transparent}, ${gold})`,
          }}
        />
      </div>
    );
  }

  return (
    <hr
      style={{
        border: "none",
        height: "1px",
        margin: "2rem 0",
        background: `linear-gradient(to right, ${transparent}, ${gold}, ${transparent})`,
        ...style,
      }}
    />
  );
}
