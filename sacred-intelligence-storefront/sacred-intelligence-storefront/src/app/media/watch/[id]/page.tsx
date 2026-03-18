import type { Metadata } from "next";
import WatchContent from "./WatchContent";
import { mediaItems } from "@/data/media";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = mediaItems.find((m) => m.id === id);
  return {
    title: item ? item.title : "Watch",
    description: item?.description || "Watch Sacred Intelligence content.",
  };
}

export default async function WatchPage({ params }: Props) {
  const { id } = await params;
  return <WatchContent videoId={id} />;
}
