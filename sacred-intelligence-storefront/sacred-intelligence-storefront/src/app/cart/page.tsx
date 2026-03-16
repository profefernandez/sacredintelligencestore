import type { Metadata } from "next";
import { CartContent } from "./CartContent";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your Sacred Intelligence Collection cart.",
};

export default function CartPage() {
  return <CartContent />;
}
