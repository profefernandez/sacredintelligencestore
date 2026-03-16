"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { spacing } from "@/lib/design-system";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      style={{
        minWidth: spacing.touchTarget,
        minHeight: spacing.touchTarget,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        borderRadius: "8px",
      }}
    >
      {theme === "light" ? (
        <Moon size={22} aria-hidden="true" />
      ) : (
        <Sun size={22} aria-hidden="true" />
      )}
    </button>
  );
}
