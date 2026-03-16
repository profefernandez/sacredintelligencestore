"use client";

import { motion } from "framer-motion";
import { getSectionBg, spacing, animation } from "@/lib/design-system";

interface SectionProps {
  children: React.ReactNode;
  index?: number;
  compact?: boolean;
  ariaLabelledBy?: string;
  id?: string;
  className?: string;
}

export function Section({
  children,
  index = 0,
  compact = false,
  ariaLabelledBy,
  id,
  className = "",
}: SectionProps) {
  const bg = getSectionBg(index);
  const pad = compact ? spacing.sectionCompact : spacing.section;

  return (
    <motion.section
      id={id}
      aria-labelledby={ariaLabelledBy}
      initial={animation.fadeUp.initial}
      whileInView={animation.fadeUp.animate}
      transition={animation.fadeUp.transition}
      viewport={animation.viewport}
      className={`${pad} ${spacing.pageX} ${className}`}
      style={{ background: bg }}
    >
      <div className={spacing.maxWidth}>{children}</div>
    </motion.section>
  );
}
