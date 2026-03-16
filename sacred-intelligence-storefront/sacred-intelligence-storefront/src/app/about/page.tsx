import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Sacred Intelligence, the three pillars — Sacred, Self-ish, and Shared — and the work of Rev. Dr. Terrlyn L. Curry Avery.",
};

export default function AboutPage() {
  return <AboutContent />;
}
