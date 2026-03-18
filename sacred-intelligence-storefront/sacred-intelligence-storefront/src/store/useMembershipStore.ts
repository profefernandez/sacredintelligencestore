import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WatchHistoryEntry {
  id: string;
  timestamp: number;
  progress: number;
}

interface MembershipState {
  isMember: boolean;
  memberSince: string | null;
  plan: "free" | "monthly" | "annual" | null;
  savedVideos: string[];
  watchHistory: WatchHistoryEntry[];

  // Actions
  setMember: (plan: "monthly" | "annual") => void;
  cancelMembership: () => void;
  toggleSavedVideo: (id: string) => void;
  isVideoSaved: (id: string) => boolean;
  addToWatchHistory: (id: string, progress?: number) => void;
  getWatchProgress: (id: string) => number;
  clearHistory: () => void;
}

export const useMembershipStore = create<MembershipState>()(
  persist(
    (set, get) => ({
      isMember: false,
      memberSince: null,
      plan: null,
      savedVideos: [],
      watchHistory: [],

      setMember: (plan) =>
        set({
          isMember: true,
          plan,
          memberSince: new Date().toISOString(),
        }),

      cancelMembership: () =>
        set({
          isMember: false,
          plan: null,
          memberSince: null,
        }),

      toggleSavedVideo: (id) =>
        set((state) => {
          const exists = state.savedVideos.includes(id);
          return {
            savedVideos: exists
              ? state.savedVideos.filter((vid) => vid !== id)
              : [...state.savedVideos, id],
          };
        }),

      isVideoSaved: (id) => get().savedVideos.includes(id),

      addToWatchHistory: (id, progress = 0) =>
        set((state) => {
          const existing = state.watchHistory.findIndex(
            (entry) => entry.id === id
          );
          const entry: WatchHistoryEntry = {
            id,
            timestamp: Date.now(),
            progress: Math.min(100, Math.max(0, progress)),
          };

          if (existing !== -1) {
            const updated = [...state.watchHistory];
            updated[existing] = entry;
            return { watchHistory: updated };
          }

          return { watchHistory: [...state.watchHistory, entry] };
        }),

      getWatchProgress: (id) => {
        const entry = get().watchHistory.find((e) => e.id === id);
        return entry ? entry.progress : 0;
      },

      clearHistory: () => set({ watchHistory: [] }),
    }),
    {
      name: "si-membership",
    }
  )
);
