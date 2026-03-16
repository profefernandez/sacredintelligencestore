import type { Metadata } from "next";
import { BlogContent } from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writings on Sacred Intelligence — exploring the Sacred, Self-ish, and Shared pillars, the B.R.E.A.T.H. methodology, and pathways to healing.",
};

export default function BlogPage() {
  return <BlogContent />;
}
