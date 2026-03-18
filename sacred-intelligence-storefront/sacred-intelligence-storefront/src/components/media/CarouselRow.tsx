"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { colors, animation } from "@/lib/design-system";
import VideoCard from "./VideoCard";
import type { MediaItem } from "@/data/media";

interface CarouselRowProps {
  title: string;
  items: MediaItem[];
  onVideoClick: (item: MediaItem) => void;
  seeAllHref?: string;
}

export default function CarouselRow({
  title,
  items,
  onVideoClick,
  seeAllHref,
}: CarouselRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [rowHovered, setRowHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollAmount = 320 * 3;

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    return () => el.removeEventListener("scroll", updateArrows);
  }, [updateArrows]);

  const scroll = useCallback(
    (dir: "left" | "right") => {
      scrollRef.current?.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    },
    [scrollAmount]
  );

  return (
    <motion.section
      className="relative mb-10"
      onMouseEnter={() => setRowHovered(true)}
      onMouseLeave={() => setRowHovered(false)}
      initial={animation.fadeIn.initial}
      whileInView={animation.fadeIn.animate}
      viewport={animation.viewport}
      transition={animation.fadeIn.transition}
    >
      {/* Row header */}
      <div
        style={{
          padding: "0 4%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <h2
          className="text-base sm:text-lg font-semibold"
          style={{ color: colors.text.heading, margin: 0 }}
        >
          {title}
        </h2>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="no-underline transition-colors"
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: colors.gold.primary,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.textDecoration = "underline")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.textDecoration = "none")
            }
          >
            See All &rsaquo;
          </Link>
        )}
      </div>

      {/* Scroll container */}
      <div style={{ position: "relative" }}>
        <div
          ref={scrollRef}
          className="hide-scrollbar"
          style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            paddingLeft: "4%",
            paddingRight: "4%",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {items.map((item) => (
            <div key={item.id} style={{ scrollSnapAlign: "start" }}>
              <VideoCard item={item} onClick={() => onVideoClick(item)} />
            </div>
          ))}
        </div>

        {/* Left arrow (desktop only) */}
        {rowHovered && canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll("left")}
            className="hidden sm:flex"
            style={{
              position: "absolute",
              left: 4,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(13, 11, 18, 0.8)",
              color: colors.text.heading,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Right arrow (desktop only) */}
        {rowHovered && canScrollRight && (
          <button
            type="button"
            onClick={() => scroll("right")}
            className="hidden sm:flex"
            style={{
              position: "absolute",
              right: 4,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(13, 11, 18, 0.8)",
              color: colors.text.heading,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.section>
  );
}
