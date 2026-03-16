"use client";

import { motion } from "framer-motion";
import { colors, animation } from "@/lib/design-system";

interface DividerProps {
  ornament?: React.ReactNode;
  className?: string;
}

export function Divider({ ornament, className = "" }: DividerProps) {
  const gold = colors.gold.primary;

  if (ornament) {
    return (
      <div
        className={`flex items-center gap-4 my-8 ${className}`}
      >
        <motion.hr
          {...animation.scaleLine}
          viewport={animation.viewport}
          className="flex-1 border-none h-px origin-left"
          style={{
            background: `linear-gradient(to right, transparent, ${gold})`,
          }}
        />
        <span style={{ color: gold, fontSize: "1.25rem", lineHeight: 1 }}>
          {ornament}
        </span>
        <motion.hr
          {...animation.scaleLine}
          viewport={animation.viewport}
          className="flex-1 border-none h-px origin-right"
          style={{
            background: `linear-gradient(to left, transparent, ${gold})`,
          }}
        />
      </div>
    );
  }

  return (
    <motion.hr
      {...animation.scaleLine}
      viewport={animation.viewport}
      className={`border-none h-px my-8 origin-left ${className}`}
      style={{
        background: `linear-gradient(to right, transparent, ${gold}, transparent)`,
      }}
    />
  );
}
