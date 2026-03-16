"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { mockProducts, mockCategories } from "@/data/mock-products";
import { formatPrice, typeLabels } from "@/lib/utils";
import { colors, typography, spacing, animation, radius, pillarColors, shadows, overlays } from "@/lib/design-system";
import type { Product } from "@/lib/types";

function ShelfItem({ product, index }: { product: Product; index: number }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={animation.stagger.item.initial}
      whileInView={animation.stagger.item.animate}
      transition={{ ...animation.stagger.item.transition, delay: index * 0.1 }}
      viewport={animation.viewport}
    >
      <Link
        href={`/products/${product.slug}`}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
        aria-label={`View ${product.name} — ${formatPrice(product.price)}`}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "1.5rem",
          }}
        >
          {/* Product Image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "220px",
              aspectRatio:
                product.product_type === "book" ? "2/3" : "1/1",
              borderRadius: radius.md,
              overflow: "hidden",
              backgroundColor: isDark
                ? colors.dark.bgSecondary
                : colors.light.bgSecondary,
              marginBottom: "1.25rem",
              boxShadow: isDark
                ? shadows.dark.shelf
                : shadows.light.shelf,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLElement).style.boxShadow = isDark
                ? shadows.dark.shelfHover
                : shadows.light.shelfHover;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = isDark
                ? shadows.dark.shelf
                : shadows.light.shelf;
            }}
          >
            <Image
              src={product.images[0]?.url || "/images/placeholder.jpg"}
              alt={product.images[0]?.alt || product.name}
              fill
              sizes="220px"
              style={{ objectFit: "cover" }}
            />

            {/* Pillar tag indicator */}
            {product.pillar_tag !== "none" && (
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor:
                    pillarColors[product.pillar_tag] || "transparent",
                }}
                aria-hidden="true"
              />
            )}
          </div>

          {/* Type label */}
          <span
            style={{
              ...typography.label,
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: isDark
                ? colors.dark.accentGold
                : colors.light.accentGoldText,
              marginBottom: "0.5rem",
            }}
          >
            {typeLabels[product.product_type]}
          </span>

          {/* Product name */}
          <h3
            style={{
              ...typography.h4,
              fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
              color: isDark
                ? colors.dark.textPrimary
                : colors.light.textPrimary,
              textAlign: "center",
              marginBottom: "0.5rem",
              maxWidth: "220px",
            }}
          >
            {product.name}
          </h3>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                ...typography.price,
                color: isDark
                  ? colors.dark.textPrimary
                  : colors.light.textPrimary,
              }}
            >
              {formatPrice(product.price)}
            </span>
            {product.compare_price && (
              <span
                style={{
                  ...typography.body,
                  fontSize: "0.9rem",
                  textDecoration: "line-through",
                  opacity: 0.5,
                  color: isDark
                    ? colors.dark.textBody
                    : colors.light.textBody,
                }}
              >
                {formatPrice(product.compare_price)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Shelf line beneath product */}
      <div
        style={{
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${
            isDark ? colors.dark.shelfLine : colors.light.shelfLine
          }, transparent)`,
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

export function ShopContent() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
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
        <div style={{ textAlign: "center", maxWidth: spacing.maxTextWidth, margin: "0 auto" }}>
          <SectionLabel>The Collection</SectionLabel>
          <h1
            style={{
              ...typography.h1,
              color: isDark ? colors.dark.textPrimary : colors.light.textPrimary,
              marginTop: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            Sacred Shelf
          </h1>
          <p
            style={{
              ...typography.bodyLg,
              color: isDark ? colors.dark.textBody : colors.light.textBody,
              maxWidth: "36rem",
              margin: "0 auto",
            }}
          >
            Curated works for your Sacred, Self-ish, and Shared journeys.
            Each piece chosen with intention.
          </p>
        </div>
      </Section>

      {/* Filters */}
      <Section index={1}>
        <nav
          aria-label="Filter products by category"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: spacing.touchGap,
            flexWrap: "wrap",
            marginBottom: "3rem",
          }}
        >
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt.slug;
            return (
              <button
                key={opt.slug}
                onClick={() => setActiveFilter(opt.slug)}
                aria-pressed={isActive}
                style={{
                  ...typography.label,
                  fontSize: "0.75rem",
                  minHeight: spacing.touchTarget,
                  padding: "0 1.25rem",
                  borderRadius: radius.md,
                  border: `1.5px solid ${
                    isActive
                      ? isDark
                        ? colors.dark.accentGold
                        : colors.light.accentGoldText
                      : isDark
                        ? colors.dark.border
                        : colors.light.border
                  }`,
                  backgroundColor: isActive
                    ? isDark
                      ? overlays.dark.goldSubtle
                      : overlays.light.goldSubtle
                    : "transparent",
                  color: isActive
                    ? isDark
                      ? colors.dark.accentGold
                      : colors.light.accentGoldText
                    : isDark
                      ? colors.dark.textBody
                      : colors.light.textBody,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {opt.name}
              </button>
            );
          })}
        </nav>

        {/* Sacred Shelf Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "2.5rem",
            maxWidth: spacing.maxContentWidth,
            margin: "0 auto",
          }}
        >
          {filtered.map((product, i) => (
            <ShelfItem key={product.id} product={product} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p
            style={{
              ...typography.body,
              textAlign: "center",
              color: isDark ? colors.dark.textBody : colors.light.textBody,
              marginTop: "3rem",
            }}
          >
            No products found in this category.
          </p>
        )}
      </Section>
    </div>
  );
}
