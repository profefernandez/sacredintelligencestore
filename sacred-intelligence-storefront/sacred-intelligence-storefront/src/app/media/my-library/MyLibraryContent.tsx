"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  colors,
  typography,
  spacing,
  gradients,
  animation,
} from "@/lib/design-system";
import { mediaItems, type MediaItem } from "@/data/media";
import { useMembershipStore } from "@/store/useMembershipStore";
import MembershipModal from "@/components/media/MembershipModal";
import VideoCard from "@/components/media/VideoCard";

export default function MyLibraryContent() {
  const router = useRouter();
  const {
    isMember,
    savedVideos,
    watchHistory,
    clearHistory,
    getWatchProgress,
  } = useMembershipStore();

  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [membershipModalTitle, setMembershipModalTitle] = useState<string | undefined>();

  // ── Derived data ──
  const savedItems = useMemo(
    () =>
      savedVideos
        .map((id) => mediaItems.find((i) => i.id === id))
        .filter(Boolean) as MediaItem[],
    [savedVideos]
  );

  const continueWatchingItems = useMemo(() => {
    if (watchHistory.length === 0) return [];
    const inProgress = watchHistory.filter((e) => e.progress > 0 && e.progress < 100);
    const sorted = [...inProgress].sort((a, b) => b.timestamp - a.timestamp);
    return sorted
      .map((entry) => mediaItems.find((i) => i.id === entry.id))
      .filter(Boolean) as MediaItem[];
  }, [watchHistory]);

  const historyItems = useMemo(() => {
    if (watchHistory.length === 0) return [];
    const sorted = [...watchHistory].sort((a, b) => b.timestamp - a.timestamp);
    return sorted
      .map((entry) => mediaItems.find((i) => i.id === entry.id))
      .filter(Boolean) as MediaItem[];
  }, [watchHistory]);

  // ── Handlers ──
  const handleVideoClick = useCallback(
    (item: MediaItem) => {
      const isPremium = item.accessTier === "premium";
      if (!isPremium || isMember) {
        router.push(`/media/watch/${item.id}`);
      } else {
        setMembershipModalTitle(item.title);
        setMembershipModalOpen(true);
      }
    },
    [isMember, router]
  );

  return (
    <div
      style={{
        background: colors.bg.primary,
        minHeight: "100vh",
        marginTop: "72px",
      }}
    >
      {/* ── Header ── */}
      <section
        className="relative overflow-hidden pt-12 pb-10 sm:pb-14"
        style={{ background: colors.bg.primary }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: gradients.purpleSpotlight }}
          aria-hidden="true"
        />

        <div className={`relative ${spacing.maxWidth} ${spacing.pageX}`}>
          <motion.p
            className={typography.label}
            style={{ color: colors.gold.primary, marginBottom: 16 }}
            {...animation.fadeUp}
          >
            MY LIBRARY
          </motion.p>

          <motion.h1
            className={typography.h2}
            style={{ color: colors.text.heading, marginBottom: 16 }}
            initial={animation.fadeUp.initial}
            animate={animation.fadeUp.animate}
            transition={{ ...animation.fadeUp.transition, delay: 0.1 }}
          >
            Your Library
          </motion.h1>

          {!isMember && (
            <motion.div
              className="mt-4 rounded-lg p-6"
              style={{
                background: colors.glass.bg,
                border: `1px solid ${colors.glass.borderHover}`,
              }}
              initial={animation.fadeUp.initial}
              animate={animation.fadeUp.animate}
              transition={{ ...animation.fadeUp.transition, delay: 0.2 }}
            >
              <p
                className={typography.bodySm}
                style={{ color: colors.text.muted, marginBottom: 16 }}
              >
                Become a member to save videos and track your watch history.
              </p>
              <a
                href="/membership"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: gradients.goldCta,
                  color: colors.purple.deep,
                  minHeight: 48,
                }}
                aria-label="Become a Member"
              >
                Become a Member
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Continue Watching ── */}
      {continueWatchingItems.length > 0 && (
        <section className={`${spacing.maxWidth} ${spacing.pageX} pb-10`}>
          <motion.h2
            className={`${typography.h4} mb-6`}
            style={{ color: colors.text.heading }}
            {...animation.fadeUp}
          >
            Continue Watching
            <span
              className="ml-3 text-base font-normal"
              style={{ color: colors.text.muted }}
            >
              {continueWatchingItems.length}
            </span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {continueWatchingItems.map((item) => (
              <div key={item.id} className="relative">
                <VideoCard
                  item={item}
                  onClick={() => handleVideoClick(item)}
                />
                {/* Progress bar */}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    height: 3,
                    background: colors.bg.tertiary,
                    borderRadius: "0 0 8px 8px",
                    overflow: "hidden",
                  }}
                  aria-label={`${getWatchProgress(item.id)}% watched`}
                >
                  <div
                    style={{
                      width: `${getWatchProgress(item.id)}%`,
                      height: "100%",
                      background: colors.gold.primary,
                      borderRadius: "0 0 0 8px",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Saved Videos ── */}
      <section className={`${spacing.maxWidth} ${spacing.pageX} pb-10`}>
        <motion.h2
          className={`${typography.h4} mb-6`}
          style={{ color: colors.text.heading }}
          {...animation.fadeUp}
        >
          Saved Videos
          <span
            className="ml-3 text-base font-normal"
            style={{ color: colors.text.muted }}
          >
            {savedItems.length}
          </span>
        </motion.h2>

        {savedItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {savedItems.map((item) => (
              <VideoCard
                key={item.id}
                item={item}
                onClick={() => handleVideoClick(item)}
              />
            ))}
          </div>
        ) : (
          <motion.p
            className={typography.bodySm}
            style={{ color: colors.text.muted }}
            {...animation.fadeIn}
          >
            No saved videos yet. Browse the library and tap the heart icon to
            save.
          </motion.p>
        )}
      </section>

      {/* ── Watch History ── */}
      {historyItems.length > 0 && (
        <section className={`${spacing.maxWidth} ${spacing.pageX} pb-24`}>
          <div className="flex items-center justify-between mb-6">
            <motion.h2
              className={typography.h4}
              style={{ color: colors.text.heading }}
              {...animation.fadeUp}
            >
              Watch History
              <span
                className="ml-3 text-base font-normal"
                style={{ color: colors.text.muted }}
              >
                {historyItems.length}
              </span>
            </motion.h2>

            <button
              type="button"
              onClick={clearHistory}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: colors.text.muted,
                border: `1px solid ${colors.glass.border}`,
                background: "transparent",
                minHeight: 48,
              }}
              aria-label="Clear watch history"
            >
              <Trash2 size={16} />
              Clear History
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {historyItems.map((item) => (
              <VideoCard
                key={item.id}
                item={item}
                onClick={() => handleVideoClick(item)}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Membership Modal ── */}
      <MembershipModal
        isOpen={membershipModalOpen}
        onClose={() => setMembershipModalOpen(false)}
        videoTitle={membershipModalTitle}
      />
    </div>
  );
}
