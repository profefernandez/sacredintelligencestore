"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { colors, animation } from "@/lib/design-system";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  as?: "div" | "article" | "section";
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  as = "div",
  onClick,
}: GlassCardProps) {
  const MotionComponent = motion.create(as);

  return (
    <MotionComponent
      className={cn("relative overflow-hidden", glow && "glow-purple", className)}
      style={{
        background: colors.glass.bg,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${colors.glass.border}`,
        borderRadius: "12px",
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      initial={animation.fadeUp.initial}
      whileInView={animation.fadeUp.animate}
      viewport={animation.viewport}
      transition={animation.fadeUp.transition}
      whileHover={
        hover
          ? {
              background: colors.glass.bgHover,
              borderColor: colors.glass.borderHover,
              boxShadow: `0 16px 48px rgba(0, 0, 0, 0.5), 0 0 30px ${colors.glow.purple}`,
            }
          : undefined
      }
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </MotionComponent>
  );
}
