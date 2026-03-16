"use client";

import { colors, focus } from "@/lib/design-system";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: "absolute",
        top: "-100%",
        left: "16px",
        zIndex: 9999,
        padding: "12px 24px",
        background: colors.light.ctaPrimaryBg,
        color: colors.light.ctaPrimaryText,
        fontWeight: 700,
        fontSize: "1rem",
        borderRadius: "0 0 8px 8px",
        textDecoration: "none",
        transition: "top 0.2s ease",
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = "0";
        e.currentTarget.style.outline = focus.outline;
        e.currentTarget.style.outlineOffset = focus.outlineOffset;
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = "-100%";
        e.currentTarget.style.outline = "none";
      }}
    >
      Skip to content
    </a>
  );
}
