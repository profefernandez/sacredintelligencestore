"use client";

import { useState } from "react";
import { Play, Lock, Heart } from "lucide-react";
import { colors } from "@/lib/design-system";
import { useMembershipStore } from "@/store/useMembershipStore";
import type { MediaItem } from "@/data/media";

interface VideoCardProps {
  item: MediaItem;
  onClick: () => void;
}

export default function VideoCard({ item, onClick }: VideoCardProps) {
  const [hovered, setHovered] = useState(false);
  const hasYouTube = !!item.youtubeId;
  const isPremium = item.accessTier === "premium";
  const isFree = !isPremium;

  const { savedVideos, toggleSavedVideo, isMember } = useMembershipStore();
  const isSaved = savedVideos.includes(item.id);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSavedVideo(item.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={item.title}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="video-card-wrapper"
      style={{
        width: 320,
        flexShrink: 0,
        cursor: "pointer",
        position: "relative",
        borderRadius: 6,
        overflow: "hidden",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        zIndex: hovered ? 10 : 1,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.6)"
          : "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      {/* 16:9 thumbnail area */}
      <div style={{ position: "relative", aspectRatio: "16/9" }}>
        {hasYouTube ? (
          <img
            src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`}
            alt=""
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              ...(isPremium && !isMember
                ? { filter: "blur(4px) brightness(0.5)" }
                : {}),
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: colors.bg.tertiary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Play size={32} style={{ color: colors.text.muted }} />
          </div>
        )}

        {/* Bottom gradient for title readability */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* Episode badge — top left */}
        {item.episode != null && (
          <span
            style={{
              position: "absolute",
              top: 6,
              left: 6,
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 6px",
              borderRadius: 4,
              background: "rgba(0,0,0,0.6)",
              color: colors.gold.primary,
              lineHeight: 1.4,
            }}
          >
            E{String(item.episode).padStart(2, "0")}
          </span>
        )}

        {/* Access badge — top right */}
        {isFree && (
          <span
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              padding: "2px 6px",
              borderRadius: 4,
              background: "rgba(74, 222, 128, 0.15)",
              color: colors.semantic.success,
              lineHeight: 1.4,
            }}
          >
            FREE
          </span>
        )}
        {isPremium && (
          <span
            aria-label="Members only"
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Lock size={12} style={{ color: "rgba(255,255,255,0.5)" }} />
          </span>
        )}

        {/* Title at bottom */}
        <p
          className="line-clamp-2"
          style={{
            position: "absolute",
            bottom: 8,
            left: 10,
            right: 10,
            margin: 0,
            fontSize: 14,
            fontWeight: 500,
            color: colors.text.heading,
            lineHeight: 1.3,
          }}
        >
          {item.title}
        </p>

        {/* Hover: play icon overlay */}
        {hovered && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Play
                size={18}
                fill={colors.bg.primary}
                style={{ color: colors.bg.primary, marginLeft: 2 }}
              />
            </div>
          </div>
        )}

        {/* Hover: save/heart button — bottom right */}
        {hovered && (
          <button
            type="button"
            onClick={handleSaveClick}
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
            aria-label={
              isSaved
                ? `Remove ${item.title} from saved`
                : `Save ${item.title}`
            }
            aria-pressed={isSaved}
          >
            <Heart
              size={16}
              fill={isSaved ? colors.gold.primary : "none"}
              style={{
                color: isSaved ? colors.gold.primary : colors.text.heading,
              }}
            />
          </button>
        )}
      </div>
    </div>
  );
}
