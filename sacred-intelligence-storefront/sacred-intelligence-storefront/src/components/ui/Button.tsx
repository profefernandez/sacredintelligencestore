"use client";

import { colors, typography, spacing, radius, focus } from "@/lib/design-system";

type Variant = "primary" | "secondary" | "tertiary";

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: Variant;
  style?: React.CSSProperties;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  type?: undefined;
  disabled?: undefined;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

function getVariantStyles(
  variant: Variant,
  theme: "light" | "dark"
): React.CSSProperties {
  const palette = theme === "dark" ? colors.dark : colors.light;

  switch (variant) {
    case "primary":
      return {
        background: palette.ctaPrimaryBg,
        color: palette.ctaPrimaryText,
        border: "none",
        minHeight: spacing.touchTarget,
        paddingLeft: "2rem",
        paddingRight: "2rem",
        borderRadius: radius.md,
      };
    case "secondary":
      return {
        background: "transparent",
        color: palette.ctaSecondaryText,
        border: `2px solid ${palette.ctaSecondaryBorder}`,
        minHeight: spacing.touchTarget,
        paddingLeft: "2rem",
        paddingRight: "2rem",
        borderRadius: radius.md,
      };
    case "tertiary":
      return {
        background: "transparent",
        color: palette.ctaSecondaryText,
        border: "none",
        padding: "0.25rem 0",
        textDecoration: "none",
        minHeight: "auto",
      };
  }
}

/**
 * Button component — renders as <a> when `href` is provided, <button> otherwise.
 *
 * Uses CSS custom properties set by the theme so it can work with or without
 * ThemeProvider context. Falls back to reading data-theme attribute from <html>.
 */
export function Button(props: ButtonProps) {
  const { children, variant = "primary", style: customStyle, ...rest } = props;

  // Read theme from DOM attribute to avoid requiring ThemeProvider context
  const getTheme = (): "light" | "dark" => {
    if (typeof document !== "undefined") {
      return (
        (document.documentElement.getAttribute("data-theme") as
          | "light"
          | "dark") || "light"
      );
    }
    return "light";
  };

  const baseStyle: React.CSSProperties = {
    ...typography.cta,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "opacity 0.2s ease, transform 0.15s ease",
    ...getVariantStyles(variant, getTheme()),
    ...customStyle,
  };

  const handleFocus = (e: React.FocusEvent) => {
    const el = e.currentTarget as HTMLElement;
    el.style.outline = focus.outline;
    el.style.outlineOffset = focus.outlineOffset;
  };

  const handleBlur = (e: React.FocusEvent) => {
    const el = e.currentTarget as HTMLElement;
    el.style.outline = "none";
  };

  const handleHover = (e: React.MouseEvent, entering: boolean) => {
    const el = e.currentTarget as HTMLElement;
    if (variant === "tertiary") {
      el.style.textDecoration = entering ? "underline" : "none";
    } else {
      el.style.opacity = entering ? "0.9" : "1";
    }
  };

  if (props.href !== undefined) {
    return (
      <a
        href={props.href}
        style={baseStyle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
        onClick={props.onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }

  const { onClick, type = "button", disabled } = props as ButtonAsButton;

  return (
    <button
      type={type}
      disabled={disabled}
      style={{
        ...baseStyle,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={(e) => handleHover(e, true)}
      onMouseLeave={(e) => handleHover(e, false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
