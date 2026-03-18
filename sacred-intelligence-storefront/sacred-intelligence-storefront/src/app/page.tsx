import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Sacred Intelligence Collection",
  description:
    "Books, media, workshops, and digital resources by Rev. Dr. Terrlyn L. Curry Avery. Explore the Sacred Intelligence Collection.",
};

export default function Home() {
  return <HomeContent />;
}
