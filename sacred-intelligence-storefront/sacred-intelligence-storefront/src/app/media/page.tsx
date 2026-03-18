import type { Metadata } from "next";
import MediaContent from "./MediaContent";

export const metadata: Metadata = {
  title: "Media Library",
  description:
    "The complete Sacred Intelligence media library — TEDx talks, Sacred Intelligence TV episodes, podcast appearances, radio shows, and interviews with Rev. Dr. Terrlyn L. Curry Avery.",
};

export default function MediaPage() {
  return <MediaContent />;
}
