import type { Metadata } from "next";
import { ShopContent } from "./ShopContent";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse the Sacred Intelligence Collection — books, guided meditations, workshops, and digital resources by Rev. Dr. Terrlyn L. Curry Avery.",
};

export default function ShopPage() {
  return <ShopContent />;
}
