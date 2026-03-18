import type { ProductType } from "./types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

/** Merge Tailwind classes safely — handles conflicts and conditionals */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const PHYSICAL_TYPES: ProductType[] = ["book", "merchandise"];

export function isPhysicalProduct(type: ProductType): boolean {
  return PHYSICAL_TYPES.includes(type);
}

export function isDigitalProduct(type: ProductType): boolean {
  return !isPhysicalProduct(type);
}

export const typeLabels: Record<ProductType, string> = {
  book: "Book",
  album: "Album",
  document: "Document",
  merchandise: "Merchandise",
  workshop: "Workshop",
  video: "Video",
};

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
