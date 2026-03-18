import { cn } from "@/lib/utils";

interface GoldVerticalLineProps {
  height?: string;
  width?: string;
  glow?: boolean;
  className?: string;
  opacity?: number;
}

export default function GoldVerticalLine({
  height = "100%",
  width = "2px",
  glow = true,
  className,
  opacity = 1,
}: GoldVerticalLineProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("shrink-0", className)}
      style={{
        width,
        height,
        opacity,
        background:
          "linear-gradient(180deg, rgba(201, 168, 76, 0.1) 0%, #c9a84c 30%, #c9a84c 70%, rgba(201, 168, 76, 0.1) 100%)",
        boxShadow: glow ? "0 0 8px rgba(201, 168, 76, 0.3)" : undefined,
      }}
    />
  );
}
