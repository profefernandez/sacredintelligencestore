"use client";

import { useState, useCallback, useMemo } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Music,
  FileText,
  Package,
  Video,
  Headphones,
  ShoppingBag,
  Check,
} from "lucide-react";
import { mockProducts, mockCategories } from "@/data/mock-products";
import { formatPrice } from "@/lib/utils";
import { colors, animation } from "@/lib/design-system";
import { useCartStore } from "@/store/useCartStore";
import type { Product, ProductType } from "@/lib/types";

const typeIcons = {
  book: BookOpen,
  album: Music,
  document: FileText,
  merchandise: Package,
  video: Video,
  workshop: Headphones,
} as const;

const placeholderBgs = [colors.bg.tertiary, colors.purple.dark, colors.bg.primary];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addItem(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    },
    [addItem, product]
  );

  const Icon = typeIcons[product.product_type as keyof typeof typeIcons] || Package;
  const bgColor = placeholderBgs[index % 3];
  const aspectRatio = product.product_type === "book" ? "2/3" : "3/4";

  return (
    <motion.div
      initial={animation.stagger.item.initial}
      whileInView={animation.stagger.item.animate}
      transition={{ ...animation.stagger.item.transition, delay: index * 0.1 }}
      viewport={animation.viewport}
    >
      <Link
        href={`/products/${product.slug}`}
        className="no-underline block group"
        aria-label={`View ${product.name} — ${formatPrice(product.price)}`}
      >
        <div
          style={{
            backgroundColor: colors.bg.secondary,
            border: "1px solid rgba(201, 168, 76, 0.08)",
            borderRadius: "10px",
            overflow: "hidden",
            paddingBottom: "16px",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.2)";
            e.currentTarget.style.boxShadow =
              "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(201, 168, 76, 0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(201, 168, 76, 0.08)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Placeholder image */}
          <div
            style={{
              aspectRatio,
              backgroundColor: bgColor,
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={36} style={{ color: colors.gold.primary, opacity: 0.3 }} />
          </div>

          {/* Card content */}
          <div style={{ padding: "12px 14px 0" }}>
            {/* Type label */}
            <span
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: colors.gold.primary,
              }}
            >
              {product.product_type}
            </span>

            {/* Product name */}
            <h3
              className="line-clamp-2"
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: colors.text.heading,
                marginTop: "4px",
                lineHeight: 1.35,
                fontFamily: "var(--font-serif)",
              }}
            >
              {product.name}
            </h3>

            {/* Price row */}
            <div style={{ marginTop: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: colors.text.heading,
                }}
              >
                {formatPrice(product.price)}
              </span>
              {product.compare_price != null && (
                <span
                  style={{
                    fontSize: "12px",
                    color: colors.text.muted,
                    textDecoration: "line-through",
                    opacity: 0.6,
                  }}
                >
                  {formatPrice(product.compare_price)}
                </span>
              )}
            </div>

            {/* Add to Cart button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-1.5 cursor-pointer"
              style={{
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                backgroundColor: added ? colors.semantic.success : colors.gold.primary,
                color: colors.bg.primary,
                borderRadius: "6px",
                border: "none",
                padding: "10px 0",
                marginTop: "12px",
                minHeight: "40px",
                transition: "background-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!added) {
                  e.currentTarget.style.backgroundColor = colors.gold.hover;
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(201, 168, 76, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!added) {
                  e.currentTarget.style.backgroundColor = colors.gold.primary;
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
              aria-label={`Add ${product.name} to cart`}
            >
              {added ? (
                <>
                  <Check size={14} strokeWidth={3} />
                  Added ✓
                </>
              ) : (
                <>
                  <ShoppingBag size={14} />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ShopContent() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const published = mockProducts.filter((p) => p.status === "published");

  const filtered = useMemo(() => {
    let items = activeFilter === "all"
      ? published
      : published.filter((p) => p.category.slug === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.product_type.toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeFilter, search, published]);

  const filterOptions = [
    { slug: "all", name: "All" },
    ...mockCategories.filter((c) => c.status === "published"),
  ];

  return (
    <div style={{ marginTop: "72px" }} className="pb-20">
      {/* Top bar — heading + search + filters */}
      <div style={{ padding: "20px 5% 12px" }}>
        {/* Row 1: heading + search */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
          <h1
            className="text-xl sm:text-2xl font-serif font-semibold shrink-0"
            style={{ color: colors.text.heading, margin: 0 }}
          >
            Shop
          </h1>

          {/* Search bar */}
          <div className="relative flex-1 max-w-xs">
            <Search
              size={16}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: colors.text.muted,
                pointerEvents: "none",
              }}
            />
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products"
              style={{
                width: "100%",
                padding: "8px 12px 8px 36px",
                fontSize: "13px",
                borderRadius: "9999px",
                border: `1px solid ${colors.text.muted}30`,
                backgroundColor: colors.bg.secondary,
                color: colors.text.body,
                outline: "none",
                minHeight: "36px",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = colors.gold.primary)
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = `${colors.text.muted}30`)
              }
            />
          </div>
        </div>

        {/* Row 2: filter pills */}
        <nav
          aria-label="Filter products by category"
          className="flex flex-wrap gap-2"
        >
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt.slug;
            return (
              <button
                key={opt.slug}
                onClick={() => setActiveFilter(opt.slug)}
                aria-pressed={isActive}
                className="cursor-pointer transition-colors"
                style={{
                  fontSize: "11px",
                  borderRadius: "9999px",
                  padding: "5px 12px",
                  minHeight: "32px",
                  border: isActive ? "none" : `1px solid ${colors.text.muted}40`,
                  backgroundColor: isActive ? colors.gold.primary : "transparent",
                  color: isActive ? colors.bg.primary : colors.text.muted,
                  fontWeight: 500,
                  lineHeight: 1,
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {opt.name}
              </button>
            );
          })}
        </nav>

        {/* Result count */}
        {(search || activeFilter !== "all") && (
          <p style={{ fontSize: "12px", color: colors.text.muted, marginTop: 8 }}>
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
            {search && ` for "${search}"`}
          </p>
        )}
      </div>

      {/* Product Grid — 4 columns, tighter cards */}
      <div
        style={{ padding: "0 5%" }}
        className="max-w-7xl mx-auto"
      >
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <p
            className="text-center py-20"
            style={{ color: colors.text.muted, fontSize: "14px" }}
          >
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
