import type { Metadata } from "next";
import MyLibraryContent from "./MyLibraryContent";

export const metadata: Metadata = {
  title: "My Library",
  description: "Your saved videos, watch history, and continue watching.",
};

export default function MyLibraryPage() {
  return <MyLibraryContent />;
}
