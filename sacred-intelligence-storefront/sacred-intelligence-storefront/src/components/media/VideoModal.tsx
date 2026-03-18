"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { colors, typography, gradients } from "@/lib/design-system";
import type { MediaItem } from "@/data/media";

interface VideoModalProps {
  item: MediaItem | null;
  onClose: () => void;
  onTagClick?: (tag: string) => void;
}

export default function VideoModal({ item, onClose, onTagClick }: VideoModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"]), iframe'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!item) return;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [item, handleKeyDown]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const handleTagClick = useCallback(
    (tag: string) => {
      onClose();
      onTagClick?.(tag);
    },
    [onClose, onTagClick]
  );

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(0, 0, 0, 0.85)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          ref={dialogRef}
        >
          <motion.div
            className="relative w-full max-w-4xl overflow-y-auto"
            style={{
              maxHeight: "90vh",
              background: colors.glass.bg,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: `1px solid ${colors.glass.border}`,
              borderRadius: 12,
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-3 right-3 z-10 flex items-center justify-center rounded-full transition-colors"
              style={{
                width: 48,
                height: 48,
                background: "rgba(13, 11, 18, 0.7)",
                color: colors.text.heading,
              }}
              aria-label="Close dialog"
              type="button"
            >
              <X size={22} />
            </button>

            {/* Video embed or external link */}
            {item.youtubeId ? (
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ borderRadius: "12px 12px 0 0" }}
                />
              </div>
            ) : item.externalUrl ? (
              <div
                className="flex items-center justify-center"
                style={{
                  aspectRatio: "16/9",
                  background: colors.bg.tertiary,
                  borderRadius: "12px 12px 0 0",
                }}
              >
                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-colors"
                  style={{
                    background: gradients.goldCta,
                    color: colors.purple.deep,
                    minHeight: 48,
                  }}
                  aria-label={`Listen or watch ${item.title} externally`}
                >
                  <ExternalLink size={18} />
                  Listen / Watch Externally
                </a>
              </div>
            ) : null}

            {/* Info section */}
            <div className="p-5 sm:p-6">
              <h3
                className={typography.h4}
                style={{ color: colors.text.heading, marginBottom: 8 }}
              >
                {item.title}
              </h3>
              <p
                className={typography.bodySm}
                style={{ color: colors.text.muted, marginBottom: 16 }}
              >
                {item.description}
              </p>

              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagClick(tag)}
                      className="px-3 py-1 text-xs font-medium rounded-full transition-colors"
                      style={{
                        border: `1px solid ${colors.glass.border}`,
                        color: colors.text.muted,
                        background: "transparent",
                        minHeight: 32,
                      }}
                      aria-label={`Search for ${tag}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
