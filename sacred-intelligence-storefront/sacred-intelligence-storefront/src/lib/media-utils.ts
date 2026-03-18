import { mediaItems, type MediaItem, type MediaCategory } from "@/data/media";

/** Get items by category */
export function getMediaByCategory(category: MediaCategory): MediaItem[] {
  return mediaItems.filter((item) => item.category === category);
}

/** Get free items only */
export function getFreeMedia(): MediaItem[] {
  return mediaItems.filter((item) => item.accessTier === "free");
}

/** Get premium items only */
export function getPremiumMedia(): MediaItem[] {
  return mediaItems.filter((item) => item.accessTier === "premium");
}

/** Get a single item by ID */
export function getMediaById(id: string): MediaItem | undefined {
  return mediaItems.find((item) => item.id === id);
}

/** Get related videos (same category, excluding current) */
export function getRelatedMedia(id: string, limit?: number): MediaItem[] {
  const current = getMediaById(id);
  if (!current) return [];
  const related = mediaItems.filter(
    (item) => item.category === current.category && item.id !== id
  );
  return limit ? related.slice(0, limit) : related;
}

/** Get "New Releases" — last items from each category */
export function getNewReleases(limit?: number): MediaItem[] {
  // Return the last few episodes from the biggest series
  const items = [...mediaItems].reverse();
  return (limit ? items.slice(0, limit) : items).slice(0, 8);
}

/** Get "Popular" — curated selection */
export function getPopularMedia(): MediaItem[] {
  // TEDx talk + first episodes of each series + selected highlights
  return mediaItems.filter(
    (item) =>
      item.id === "tedx-wounded" ||
      item.id === "sitv-ep10-maximizing-si" ||
      item.id === "dr-ep1" ||
      item.id === "dr-ep29" ||
      item.id === "sitv-ep12-suicide-awareness" ||
      item.id === "dr-ep17" ||
      item.id === "sdi-fear-freedom" ||
      item.id === "dr-ep41"
  );
}

/** Check if user can watch a video */
export function canWatch(item: MediaItem, isMember: boolean): boolean {
  return item.accessTier === "free" || isMember;
}

/** Get next episode in the same category */
export function getNextEpisode(currentId: string): MediaItem | undefined {
  const current = getMediaById(currentId);
  if (!current || !current.episode) return undefined;
  return mediaItems.find(
    (item) =>
      item.category === current.category &&
      item.episode === current.episode! + 1
  );
}

/** Count free vs premium items */
export function getMediaCounts(): {
  total: number;
  free: number;
  premium: number;
} {
  return {
    total: mediaItems.length,
    free: mediaItems.filter((i) => i.accessTier === "free").length,
    premium: mediaItems.filter((i) => i.accessTier === "premium").length,
  };
}
