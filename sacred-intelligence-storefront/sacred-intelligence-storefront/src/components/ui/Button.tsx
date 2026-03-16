"use client";

type Variant = "primary" | "secondary";

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
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

/**
 * Button component — renders as <a> when `href` is provided, <button> otherwise.
 * Primary uses `.btn-gold` (gold gradient). Secondary uses `.btn-outline` (gold border).
 */
export function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "", style, ...rest } = props;

  const baseClass = variant === "primary" ? "btn-gold" : "btn-outline";
  const classes = `${baseClass} ${className}`.trim();

  if (props.href !== undefined) {
    return (
      <a
        href={props.href}
        className={classes}
        style={style}
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
      className={classes}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
