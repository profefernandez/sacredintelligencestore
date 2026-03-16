"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { mockProducts, mockCategories } from "@/data/mock-products";
import { formatPrice, typeLabels } from "@/lib/utils";
import { colors, typography, spacing, animation, radius, shadows, overlays } from "@/lib/design-system";
import type { Product } from "@/lib/types";

function ShelfItem({ product, index }: { product: Product; index: number }) {
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
        <div className="relative flex flex-col items-center pb-6">
          {/* Product Image */}
          <div
            className="relative w-full mb-5 overflow-hidden transition-transform duration-500 group-hover:-translate-y-1"
            style={{
              maxWidth: "220px",
              aspectRatio: product.product_type === "book" ? "2/3" : "1/1",
              borderRadius: radius.card,
              backgroundColor: colors.bg.secondary,
              boxShadow: shadows.shelf,
            }}
          >
            <Image
              src={product.images[0]?.url || "/images/placeholder.jpg"}
              alt={product.images[0]?.alt || product.name}
              fill
              sizes="220px"
              style={{ objectFit: "cover" }}
            />

            {product.pillar_tag !== "none" && (
              <div
                className="absolute top-2 right-2 w-2 h-2 rounded-full"
                style={{
                  backgroundColor: colors.pillar[product.pillar_tag] || "transparent",
                }}
                aria-hidden="true"
              />
            )}
          </div>

          {/* Type label */}
          <span
            className={`${typography.label} mb-2`}
            style={{ color: colors.text.gold, fontSize: "0.7rem", letterSpacing: "0.2em" }}
          >
            {typeLabels[product.product_type]}
          </span>

          {/* Product name */}
          <h3
            className={`${typography.h4} text-center mb-2`}
            style={{
              color: colors.text.heading,
              maxWidth: "220px",
              fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
            }}
          >
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span
              className={typography.price}
              style={{ color: colors.text.heading }}
            >
              {formatPrice(product.price)}
            </span>
            {product.compare_price != null && (
              <span
                className={`${typography.bodySm} line-through opacity-50`}
                style={{ color: colors.text.muted }}
              >
                {formatPrice(product.compare_price)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Shelf line */}
      <div
        className="h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.shelfLine}, transparent)`,
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

export function ShopContent() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const published = mockProducts.filter((p) => p.status === "published");
  const filtered =
    activeFilter === "all"
      ? published
      : published.filter((p) => p.category.slug === activeFilter);

  const filterOptions = [
    { slug: "all", name: "All" },
    ...mockCategories.filter((c) => c.status === "published"),
  ];

  return (
    <div style={{ marginTop: "72px" }}>
      {/* Hero */}
      <Section index={0}>
        <div className={`${spacing.maxWidthNarrow} text-center`}>
          <SectionLabel>The Collection</SectionLabel>
          <h1
            className={`${typography.h1} ${spacing.headingMb}`}
            style={{ color: colors.text.heading }}
          >
            Sacred Shelf
          </h1>
          <p
            className={`${typography.bodyLg} max-w-xl mx-auto`}
            style={{ color: colors.text.body }}
          >
            Curated works for your Sacred, Self-ish, and Shared journeys.
            Each piece chosen with intention.
          </p>
        </div>
      </Section>

      {/* Filters + Grid */}
      <Section index={1}>
        <nav
          aria-label="Filter products by category"
          className="flex justify-center gap-2 flex-wrap mb-12"
        >
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt.slug;
            return (
              <button
                key={opt.slug}
                onClick={() => setActiveFilter(opt.slug)}
                aria-pressed={isActive}
                className={`${typography.label} min-h-[48px] px-5 transition-all cursor-pointer`}
                style={{
                  fontSize: "0.75rem",
                  borderRadius: radius.card,
                  border: `1.5px solid ${isActive ? colors.gold.primary : colors.border}`,
                  backgroundColor: isActive ? overlays.goldSubtle : "transparent",
                  color: isActive ? colors.gold.primary : colors.text.muted,
                }}
              >
                {opt.name}
              </button>
            );
          })}
        </nav>

        <div
          className={spacing.maxWidth}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {filtered.map((product, i) => (
            <ShelfItem key={product.id} product={product} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p
            className={`${typography.body} text-center mt-12`}
            style={{ color: colors.text.muted }}
          >
            No products found in this category.
          </p>
        )}
      </Section>
    </div>
  );
}
