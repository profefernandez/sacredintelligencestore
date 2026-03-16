"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/layout/ThemeProvider";
import { getSectionBg, spacing, animation } from "@/lib/design-system";

interface SectionProps {
  children: React.ReactNode;
  index?: number;
  ariaLabelledBy?: string;
  id?: string;
  style?: React.CSSProperties;
}

export function Section({
  children,
  index = 0,
  ariaLabelledBy,
  id,
  style,
}: SectionProps) {
  const { theme } = useTheme();
  const bg = getSectionBg(index, theme);

  return (
    <motion.section
      id={id}
      aria-labelledby={ariaLabelledBy}
      initial={animation.fadeUp.initial}
      whileInView={animation.fadeUp.animate}
      transition={animation.fadeUp.transition}
      viewport={animation.viewport}
      style={{
        background: bg,
        paddingTop: spacing.section.paddingY,
        paddingBottom: spacing.section.paddingY,
        paddingLeft: spacing.section.paddingX,
        paddingRight: spacing.section.paddingX,
        ...style,
      }}
    >
      <div
        style={{
          maxWidth: spacing.maxContentWidth,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {children}
      </div>
    </motion.section>
  );
}
