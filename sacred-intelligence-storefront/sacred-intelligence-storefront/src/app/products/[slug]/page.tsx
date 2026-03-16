import type { Metadata } from "next";
import { mockProducts } from "@/data/mock-products";
import { ProductContent } from "./ProductContent";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = mockProducts.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description.slice(0, 160),
  };
}

export function generateStaticParams() {
  return mockProducts
    .filter((p) => p.status === "published")
    .map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = mockProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductContent product={product} />;
}
