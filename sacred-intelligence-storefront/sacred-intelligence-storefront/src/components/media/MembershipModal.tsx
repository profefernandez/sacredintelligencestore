"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X } from "lucide-react";
import { colors, gradients, shadows, animation } from "@/lib/design-system";

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle?: string;
}

export default function MembershipModal({
  isOpen,
  onClose,
  videoTitle,
}: MembershipModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70]"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Membership required"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={animation.scaleUp.transition}
            className="fixed inset-0 z-[71] flex items-center justify-center p-4"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="relative w-full max-w-lg text-center p-8 sm:p-10"
              style={{
                pointerEvents: "auto",
                background: colors.glass.bg,
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: `1px solid ${colors.glass.border}`,
                borderRadius: "16px",
                boxShadow: shadows.glassCardHover,
              }}
            >
              {/* Close button */}
              <button
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="absolute top-4 right-4 flex items-center justify-center w-[48px] h-[48px] transition-colors duration-200 cursor-pointer"
                style={{
                  color: colors.text.muted,
                  background: "transparent",
                  border: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = colors.text.heading)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = colors.text.muted)
                }
              >
                <X size={20} />
              </button>

              {/* Lock icon */}
              <div
                className="mx-auto mb-6 flex items-center justify-center w-16 h-16 rounded-full"
                style={{
                  background: `rgba(201, 168, 76, 0.1)`,
                  boxShadow: shadows.goldGlow,
                }}
                aria-hidden="true"
              >
                <Lock size={28} style={{ color: colors.gold.primary }} />
              </div>

              {/* Heading */}
              <h2
                className="font-serif text-2xl sm:text-3xl font-semibold mb-3"
                style={{ color: colors.text.heading }}
              >
                This Content is for Members
              </h2>

              {/* Subtext */}
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: colors.text.muted }}
              >
                {videoTitle
                  ? `\u201C${videoTitle}\u201D is available exclusively to Sacred Intelligence members.`
                  : "This video is available exclusively to Sacred Intelligence members."}
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/membership"
                  aria-label="Become a member for $9.99 per month"
                  className="inline-flex items-center justify-center no-underline font-semibold text-base px-6 transition-shadow duration-200"
                  style={{
                    background: gradients.goldCta,
                    color: colors.purple.deep,
                    borderRadius: "9999px",
                    minHeight: "48px",
                    boxShadow: shadows.buttonHover,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = gradients.goldCtaHover;
                    e.currentTarget.style.boxShadow = shadows.goldGlow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = gradients.goldCta;
                    e.currentTarget.style.boxShadow = shadows.buttonHover;
                  }}
                >
                  Become a Member — $9.99/mo
                </Link>

                <Link
                  href="/membership"
                  aria-label="Start free trial"
                  className="inline-flex items-center justify-center no-underline font-semibold text-base px-6 transition-colors duration-200"
                  style={{
                    border: `2px solid ${colors.gold.primary}`,
                    borderRadius: "9999px",
                    minHeight: "48px",
                    color: colors.gold.primary,
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = colors.gold.primary;
                    e.currentTarget.style.color = colors.purple.deep;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = colors.gold.primary;
                  }}
                >
                  Start Free Trial
                </Link>
              </div>

              {/* Sign in link */}
              <p className="mt-6 text-sm" style={{ color: colors.text.muted }}>
                Already a member?{" "}
                <Link
                  href="/account"
                  className="no-underline font-semibold transition-colors duration-200"
                  style={{ color: colors.gold.primary }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = colors.gold.hover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = colors.gold.primary)
                  }
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
