"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Play, X } from "lucide-react";
import { colors, gradients, animation } from "@/lib/design-system";
import {
  mediaItems,
  categoryLabels,
  type MediaCategory,
  type MediaItem,
} from "@/data/media";
import { useMembershipStore } from "@/store/useMembershipStore";
import MembershipModal from "@/components/media/MembershipModal";
import CarouselRow from "@/components/media/CarouselRow";
import VideoCard from "@/components/media/VideoCard";

/* ── Featured video ── */
const FEATURED_VIDEO = mediaItems.find((i) => i.id === "tedx-wounded")!;

/* ── Popular IDs ── */
const POPULAR_IDS = [
  "tedx-wounded",
  "sitv-ep10-maximizing-si",
  "dr-ep1",
  "dr-ep29",
  "sitv-ep12-suicide-awareness",
  "dr-ep17",
  "sdi-fear-freedom",
  "dr-ep41",
];

/* ── Category filter options ── */
const CATEGORY_FILTERS: { value: "all" | MediaCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "tv-show", label: "Sacred Intelligence TV" },
  { value: "dismantle-racism", label: "Dismantle Racism" },
  { value: "tedx", label: "TEDx" },
  { value: "inspiration", label: "Inspiration" },
  { value: "podcast", label: "Podcasts" },
  { value: "radio", label: "Radio" },
  { value: "interview", label: "Interviews" },
];

type FilterValue = "all" | MediaCategory;

export default function MediaContent() {
  const router = useRouter();
  const billboardRef = useRef<HTMLElement>(null);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [upsellDismissed, setUpsellDismissed] = useState(false);
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [membershipModalTitle, setMembershipModalTitle] = useState<
    string | undefined
  >();
  const [showAllRows, setShowAllRows] = useState(false);

  const { isMember, watchHistory, toggleSavedVideo, savedVideos } =
    useMembershipStore();

  /* ── IntersectionObserver for sticky bar ── */
  useEffect(() => {
    const billboard = billboardRef.current;
    if (!billboard) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(billboard);
    return () => observer.disconnect();
  }, []);

  /* ── Popular items ── */
  const popularItems = useMemo(
    () =>
      POPULAR_IDS.map((id) => mediaItems.find((i) => i.id === id)).filter(
        Boolean
      ) as MediaItem[],
    []
  );

  /* ── Continue Watching items ── */
  const continueWatchingItems = useMemo(() => {
    if (!isMember || watchHistory.length === 0) return [];
    const sorted = [...watchHistory].sort((a, b) => b.timestamp - a.timestamp);
    return sorted
      .map((entry) => mediaItems.find((i) => i.id === entry.id))
      .filter(Boolean) as MediaItem[];
  }, [isMember, watchHistory]);

  /* ── Filtering ── */
  const isFiltering = search.trim().length > 0 || activeFilter !== "all";

  const filteredItems = useMemo(() => {
    let items = mediaItems;

    if (activeFilter !== "all") {
      if (activeFilter === "podcast") {
        // Combine podcast, radio, interview when "Podcasts" selected
        items = items.filter(
          (i) =>
            i.category === "podcast" ||
            i.category === "radio" ||
            i.category === "interview"
        );
      } else {
        items = items.filter((i) => i.category === activeFilter);
      }
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return items;
  }, [search, activeFilter]);

  /* ── Handlers ── */
  const handleVideoClick = useCallback(
    (item: MediaItem) => {
      if (item.accessTier === "free" || isMember) {
        router.push(`/media/watch/${item.id}`);
      } else {
        setMembershipModalTitle(item.title);
        setMembershipModalOpen(true);
      }
    },
    [isMember, router]
  );

  const handlePlayFeatured = useCallback(() => {
    handleVideoClick(FEATURED_VIDEO);
  }, [handleVideoClick]);

  const isFeaturedSaved = savedVideos.includes("tedx-wounded");

  return (
    <div style={{ background: colors.bg.primary, minHeight: "100vh" }}>
      {/* ═══════════════════════════════════════════════════════
          Component 1: Featured Billboard
          ═══════════════════════════════════════════════════════ */}
      <section
        ref={billboardRef}
        style={{
          position: "relative",
          maxHeight: 500,
          minHeight: 300,
          height: "50vh",
          overflow: "hidden",
          marginTop: 72,
        }}
      >
        {/* Full-bleed cover image */}
        <img
          src="https://img.youtube.com/vi/v6Lrt1A9fLI/maxresdefault.jpg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Gradient overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, #0d0b12 0%, rgba(13,11,18,0.8) 30%, rgba(13,11,18,0.4) 60%, rgba(13,11,18,0.2) 100%)",
          }}
        />

        {/* Content overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            padding: "0 4% 2rem 4%",
          }}
        >
          {/* Category pill */}
          <span
            style={{
              display: "inline-block",
              fontSize: 12,
              padding: "3px 10px",
              borderRadius: 9999,
              border: `1px solid ${colors.gold.primary}`,
              color: colors.gold.primary,
              marginBottom: 10,
            }}
          >
            TEDx Talk
          </span>

          {/* Title */}
          <h1
            className="text-xl sm:text-2xl font-serif font-bold"
            style={{
              color: colors.text.heading,
              margin: "0 0 6px 0",
              lineHeight: 1.15,
            }}
          >
            Wounded by Religion: Healed by the Sacred
          </h1>

          {/* Description */}
          <p
            className="text-sm line-clamp-2"
            style={{
              color: colors.text.muted,
              margin: "0 0 16px 0",
              maxWidth: "32rem",
              lineHeight: 1.5,
            }}
          >
            {FEATURED_VIDEO.description}
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {/* Play button */}
            <button
              type="button"
              onClick={handlePlayFeatured}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: gradients.goldCta,
                color: colors.purple.deep,
                border: "none",
                borderRadius: 6,
                minHeight: 40,
                padding: "0 24px",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
              aria-label={`Play ${FEATURED_VIDEO.title}`}
            >
              <Play size={16} fill={colors.purple.deep} />
              Play
            </button>

            {/* + My List button */}
            <button
              type="button"
              onClick={() => toggleSavedVideo("tedx-wounded")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "transparent",
                color: colors.gold.primary,
                border: `1px solid ${colors.gold.primary}`,
                borderRadius: 6,
                minHeight: 40,
                padding: "0 16px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
              aria-label={
                isFeaturedSaved ? "Remove from My List" : "Add to My List"
              }
            >
              {isFeaturedSaved ? "- My List" : "+ My List"}
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Component 2: Upsell Strip (non-members only)
          ═══════════════════════════════════════════════════════ */}
      {!isMember && !upsellDismissed && (
        <div
          style={{
            height: 48,
            width: "100%",
            background: "rgba(201, 168, 76, 0.08)",
            borderBottom: "1px solid rgba(201, 168, 76, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 4%",
          }}
        >
          <span
            style={{ fontSize: 14, color: colors.gold.primary }}
          >
            Unlock 90+ videos — $9.99/mo
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a
              href="/membership"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: gradients.goldCta,
                color: colors.purple.deep,
                borderRadius: 9999,
                padding: "6px 16px",
                fontSize: 12,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Start Free Trial
            </a>
            <button
              type="button"
              onClick={() => setUpsellDismissed(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: colors.text.muted,
                padding: 4,
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          Component 4: Sticky Search Bar
          (only visible when scrolled past billboard)
          ═══════════════════════════════════════════════════════ */}
      {showStickyBar && (
        <div
          style={{
            position: "fixed",
            top: 72,
            left: 0,
            right: 0,
            zIndex: 40,
            height: 48,
            background: "rgba(13, 11, 18, 0.95)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(201, 168, 76, 0.1)",
            display: "flex",
            alignItems: "center",
            padding: "0 4%",
            gap: 12,
          }}
        >
          {/* Search input */}
          <div style={{ position: "relative", maxWidth: 240, flexShrink: 0 }}>
            <Search
              size={14}
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: colors.text.muted,
                pointerEvents: "none",
              }}
            />
            <input
              type="search"
              placeholder="Search videos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                paddingLeft: 30,
                paddingRight: 10,
                height: 32,
                borderRadius: 9999,
                border: "1px solid transparent",
                background: colors.bg.secondary,
                color: colors.text.heading,
                fontSize: 13,
                outline: "none",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = colors.gold.primary)
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "transparent")
              }
              aria-label="Search videos"
            />
          </div>

          {/* Category filter pills — horizontal scroll */}
          <div
            className="hide-scrollbar"
            style={{
              display: "flex",
              gap: 6,
              overflowX: "auto",
              scrollbarWidth: "none",
              flexGrow: 1,
            }}
          >
            {CATEGORY_FILTERS.map((cat) => {
              const active = activeFilter === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => {
                    setActiveFilter(cat.value);
                    if (cat.value !== "all") setSearch("");
                  }}
                  style={{
                    flexShrink: 0,
                    fontSize: 11,
                    borderRadius: 9999,
                    padding: "4px 12px",
                    border: active
                      ? "none"
                      : `1px solid ${colors.glass.border}`,
                    background: active ? colors.gold.primary : "transparent",
                    color: active ? colors.purple.deep : colors.text.muted,
                    cursor: "pointer",
                    fontWeight: active ? 700 : 500,
                    whiteSpace: "nowrap",
                  }}
                  aria-pressed={active}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          Component 3: Content Rows (or filtered grid)
          ═══════════════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 80, paddingTop: 8 }}>
        {isFiltering ? (
          /* ── Search/filter results: flat grid ── */
          <div style={{ padding: "0 4%" }}>
            {/* Result count */}
            <p
              style={{
                fontSize: 13,
                color: colors.text.muted,
                marginBottom: 16,
              }}
              aria-live="polite"
            >
              {filteredItems.length} result
              {filteredItems.length !== 1 ? "s" : ""}
            </p>

            {filteredItems.length === 0 ? (
              <p style={{ color: colors.text.muted, fontSize: 14 }}>
                No results found. Try a different search term or category.
              </p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gap: 16,
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(280px, 1fr))",
                }}
              >
                {filteredItems.map((item) => (
                  <VideoCard
                    key={item.id}
                    item={item}
                    onClick={() => handleVideoClick(item)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ── Netflix-style carousel rows ── */
          <>
            {/* 1. Continue Watching */}
            {continueWatchingItems.length > 0 && (
              <CarouselRow
                title="Continue Watching"
                items={continueWatchingItems}
                onVideoClick={handleVideoClick}
              />
            )}

            {/* 2. Popular */}
            <CarouselRow
              title="Popular"
              items={popularItems}
              onVideoClick={handleVideoClick}
            />

            {/* 3. Sacred Intelligence TV */}
            <CarouselRow
              title="Sacred Intelligence TV"
              items={mediaItems.filter((i) => i.category === "tv-show")}
              onVideoClick={handleVideoClick}
            />

            {/* Browse All Categories toggle */}
            <div className="mt-8 mb-12" style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => setShowAllRows((prev) => !prev)}
                style={{
                  border: `2px solid ${colors.gold.primary}`,
                  background: "transparent",
                  color: colors.gold.primary,
                  borderRadius: 9999,
                  padding: "12px 32px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {showAllRows ? "Show Less" : "Browse All Categories"}
              </button>
            </div>

            {showAllRows && (
              <>
                {/* 4. Dismantle Racism */}
                <CarouselRow
                  title="Dismantle Racism"
                  items={mediaItems.filter(
                    (i) => i.category === "dismantle-racism"
                  )}
                  onVideoClick={handleVideoClick}
                />

                {/* 5. TEDx */}
                <CarouselRow
                  title="TEDx"
                  items={mediaItems.filter((i) => i.category === "tedx")}
                  onVideoClick={handleVideoClick}
                />

                {/* 6. Sunday Dose of Inspiration */}
                <CarouselRow
                  title="Sunday Dose of Inspiration"
                  items={mediaItems.filter((i) => i.category === "inspiration")}
                  onVideoClick={handleVideoClick}
                />

                {/* 7. Podcasts & Interviews */}
                <CarouselRow
                  title="Podcasts & Interviews"
                  items={mediaItems.filter(
                    (i) =>
                      i.category === "podcast" ||
                      i.category === "radio" ||
                      i.category === "interview"
                  )}
                  onVideoClick={handleVideoClick}
                />
              </>
            )}
          </>
        )}
      </div>

      {/* ── Membership Modal ── */}
      <MembershipModal
        isOpen={membershipModalOpen}
        onClose={() => setMembershipModalOpen(false)}
        videoTitle={membershipModalTitle}
      />

      {/* Global scrollbar hide */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
