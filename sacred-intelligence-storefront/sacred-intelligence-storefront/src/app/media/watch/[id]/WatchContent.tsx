"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, Lock, ExternalLink, Play } from "lucide-react";
import { useMembershipStore } from "@/store/useMembershipStore";
import VideoCard from "@/components/media/VideoCard";
import {
  mediaItems,
  categoryLabels,
  type MediaItem,
} from "@/data/media";
import {
  colors,
  typography,
  spacing,
  gradients,
  shadows,
  radius,
} from "@/lib/design-system";

// ---------------------------------------------------------------------------
// Inline media utilities
// ---------------------------------------------------------------------------

function getMediaById(id: string): MediaItem | undefined {
  return mediaItems.find((m) => m.id === id);
}

function getRelatedMedia(id: string, limit = 12): MediaItem[] {
  const current = getMediaById(id);
  if (!current) return [];
  const sameCategory = mediaItems.filter(
    (m) => m.id !== id && m.category === current.category
  );
  const other = mediaItems.filter(
    (m) => m.id !== id && m.category !== current.category
  );
  return [...sameCategory, ...other].slice(0, limit);
}

function getNextEpisode(currentId: string): MediaItem | undefined {
  const current = getMediaById(currentId);
  if (!current || current.episode == null) return undefined;
  return mediaItems.find(
    (m) =>
      m.category === current.category &&
      m.episode != null &&
      m.episode === current.episode! + 1
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface WatchContentProps {
  videoId: string;
}

export default function WatchContent({ videoId }: WatchContentProps) {
  const router = useRouter();
  const { isMember, addToWatchHistory, toggleSavedVideo, isVideoSaved } =
    useMembershipStore();

  const item = useMemo(() => getMediaById(videoId), [videoId]);
  const nextEpisode = useMemo(() => getNextEpisode(videoId), [videoId]);
  const related = useMemo(() => getRelatedMedia(videoId, 12), [videoId]);
  const saved = isVideoSaved(videoId);
  const hasAccess = item
    ? item.accessTier === "free" || isMember
    : false;

  // Track watch history on mount
  useEffect(() => {
    addToWatchHistory(videoId);
  }, [videoId, addToWatchHistory]);

  // ------ Not found ------
  if (!item) {
    return (
      <main
        style={{
          background: colors.bg.primary,
          marginTop: "72px",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2
            className={typography.h4}
            style={{ color: colors.text.heading, marginBottom: 16 }}
          >
            Video Not Found
          </h2>
          <Link
            href="/media"
            style={{ color: colors.gold.primary }}
            aria-label="Back to Media Library"
          >
            Back to Library
          </Link>
        </div>
      </main>
    );
  }

  const isPremium = item.accessTier === "premium";

  // Build Up Next list: next episode first, then related (without duplicate)
  const upNextItems: MediaItem[] = [];
  if (nextEpisode) upNextItems.push(nextEpisode);
  for (const r of related) {
    if (upNextItems.length >= 12) break;
    if (r.id !== nextEpisode?.id) upNextItems.push(r);
  }

  return (
    <main
      style={{
        background: colors.bg.primary,
        marginTop: "72px",
        minHeight: "100vh",
      }}
    >
      {/* 1. Back Navigation */}
      <nav style={{ padding: "16px 4% 8px" }}>
        <Link
          href="/media"
          aria-label="Back to Media Library"
          className="text-sm"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: colors.text.muted,
            textDecoration: "none",
            minHeight: spacing.touchTarget,
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = colors.gold.primary)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = colors.text.muted)
          }
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Library
        </Link>
      </nav>

      {/* 2. Video Player — full width, no side padding */}
      <section aria-label="Video player">
        {!hasAccess && isPremium ? (
          <MembershipGate youtubeId={item.youtubeId} />
        ) : item.youtubeId ? (
          <div style={{ background: "#000", width: "100%" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%",
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>
          </div>
        ) : item.externalUrl ? (
          <ExternalLinkCard url={item.externalUrl} />
        ) : (
          <UnavailableCard />
        )}
      </section>

      {/* 3. Video Info */}
      <section style={{ padding: "24px 4%" }}>
        <div style={{ maxWidth: "56rem" }}>
          {/* Title */}
          <h1
            className="text-xl sm:text-2xl font-serif font-semibold"
            style={{ color: colors.text.heading, margin: 0 }}
          >
            {item.title}
          </h1>

          {/* Meta row: category pill + episode badge + date + save button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 12,
            }}
          >
            {/* Category pill */}
            <span
              className="text-xs"
              style={{
                padding: "4px 12px",
                borderRadius: radius.pill,
                border: `1px solid ${colors.gold.primary}`,
                color: colors.gold.primary,
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              {categoryLabels[item.category]}
            </span>

            {/* Episode badge */}
            {item.episode != null && (
              <span
                className="text-xs"
                style={{
                  color: colors.text.muted,
                  fontWeight: 600,
                }}
              >
                Episode {String(item.episode).padStart(2, "0")}
              </span>
            )}

            {/* Date */}
            {item.date && (
              <span
                className="text-xs"
                style={{ color: colors.text.muted }}
              >
                {item.date}
              </span>
            )}

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Save / Heart button */}
            <button
              onClick={() => toggleSavedVideo(videoId)}
              aria-label={saved ? "Remove from saved" : "Save video"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 8,
                minWidth: spacing.touchTarget,
                minHeight: spacing.touchTarget,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Heart
                size={24}
                fill={saved ? colors.gold.primary : "none"}
                color={saved ? colors.gold.primary : colors.text.muted}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Description */}
          <p
            className="text-sm"
            style={{
              color: colors.text.body,
              marginTop: 12,
              lineHeight: 1.6,
            }}
          >
            {item.description}
          </p>

          {/* Tags */}
          {item.tags.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 16,
              }}
            >
              {item.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/media?search=${encodeURIComponent(tag)}`}
                  aria-label={`Search media for ${tag}`}
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    borderRadius: radius.pill,
                    border: `1px solid ${colors.glass.border}`,
                    background: colors.glass.bg,
                    color: colors.text.muted,
                    fontSize: 12,
                    textDecoration: "none",
                    transition:
                      "color 0.2s ease, border-color 0.2s ease, background 0.2s ease",
                    minHeight: spacing.touchTarget,
                    lineHeight: "36px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.gold.primary;
                    e.currentTarget.style.borderColor =
                      colors.glass.borderHover;
                    e.currentTarget.style.background = colors.glass.bgHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.text.muted;
                    e.currentTarget.style.borderColor = colors.glass.border;
                    e.currentTarget.style.background = colors.glass.bg;
                  }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Up Next Section */}
      {upNextItems.length > 0 && (
        <section aria-label="Up Next" style={{ paddingBottom: 80 }}>
          <h2
            className="text-lg font-semibold"
            style={{
              color: colors.text.heading,
              padding: "0 4%",
              marginTop: 32,
              marginBottom: 12,
            }}
          >
            Up Next
          </h2>

          <div
            style={{
              padding: "0 4%",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 12,
            }}
          >
            {upNextItems.map((upItem) => (
              <VideoCard
                key={upItem.id}
                item={upItem}
                onClick={() => router.push(`/media/watch/${upItem.id}`)}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ExternalLinkCard({ url }: { url: string }) {
  return (
    <div
      style={{
        background: colors.bg.secondary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 24px",
        textAlign: "center",
        gap: 20,
      }}
    >
      <ExternalLink
        size={40}
        color={colors.text.muted}
        aria-hidden="true"
      />
      <p className="text-sm" style={{ color: colors.text.body }}>
        This content is hosted on an external platform.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Watch on external platform (opens in new tab)"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 32px",
          background: gradients.goldCta,
          color: colors.purple.deep,
          fontWeight: 700,
          fontSize: 14,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          borderRadius: radius.pill,
          textDecoration: "none",
          minHeight: spacing.touchTarget,
          transition: "box-shadow 0.2s ease, background 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = gradients.goldCtaHover;
          e.currentTarget.style.boxShadow = shadows.buttonHover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = gradients.goldCta;
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        Watch on External Platform
        <ExternalLink size={16} aria-hidden="true" />
      </a>
    </div>
  );
}

function UnavailableCard() {
  return (
    <div
      style={{
        background: colors.bg.secondary,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 24px",
        textAlign: "center",
        gap: 12,
      }}
    >
      <Play size={40} color={colors.text.muted} aria-hidden="true" />
      <p className="text-sm" style={{ color: colors.text.muted }}>
        Video unavailable
      </p>
    </div>
  );
}

function MembershipGate({ youtubeId }: { youtubeId?: string }) {
  const thumbUrl = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: colors.bg.secondary,
      }}
    >
      {/* Blurred thumbnail background */}
      {thumbUrl && (
        <img
          src={thumbUrl}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(20px) brightness(0.3)",
          }}
        />
      )}

      {/* Content overlay */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 16,
          padding: "24px",
          maxWidth: 440,
        }}
      >
        <Lock size={48} color={colors.gold.primary} aria-hidden="true" />

        <h3
          className="text-lg font-semibold"
          style={{ color: colors.text.heading, margin: 0 }}
        >
          This content is for members only
        </h3>

        <p
          className="text-sm"
          style={{ color: colors.text.muted, margin: 0 }}
        >
          Become a member to unlock premium videos and exclusive content.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginTop: 4,
          }}
        >
          {/* Gold CTA */}
          <Link
            href="/membership"
            aria-label="Become a Member"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 32px",
              background: gradients.goldCta,
              color: colors.purple.deep,
              fontWeight: 700,
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              borderRadius: radius.pill,
              textDecoration: "none",
              minHeight: spacing.touchTarget,
              transition: "box-shadow 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = gradients.goldCtaHover;
              e.currentTarget.style.boxShadow = shadows.buttonHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = gradients.goldCta;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Become a Member
          </Link>

          {/* Outline button */}
          <Link
            href="/membership"
            aria-label="Start Free Trial"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 32px",
              background: "transparent",
              color: colors.gold.primary,
              fontWeight: 700,
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              borderRadius: radius.pill,
              border: `1px solid ${colors.gold.primary}`,
              textDecoration: "none",
              minHeight: spacing.touchTarget,
              transition:
                "background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.gold.primary;
              e.currentTarget.style.color = colors.purple.deep;
              e.currentTarget.style.boxShadow = shadows.buttonHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = colors.gold.primary;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}
