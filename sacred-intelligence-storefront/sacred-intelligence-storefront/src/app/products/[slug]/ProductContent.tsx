"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Check } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Divider } from "@/components/ui/Divider";
import { formatPrice, isDigitalProduct, typeLabels } from "@/lib/utils";
import { colors, typography, spacing, animation, radius, shadows, overlays } from "@/lib/design-system";
import type { Product } from "@/lib/types";

const pillarDescriptions: Record<string, string> = {
  sacred: "Sacred Pillar",
  selfish: "Self-ish Pillar",
  shared: "Shared Pillar",
};

export function ProductContent({ product }: { product: Product }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isDigital = isDigitalProduct(product.product_type);

  return (
    <div style={{ marginTop: "72px" }}>
      <div
        style={{
          maxWidth: spacing.maxContentWidth,
          margin: "0 auto",
          padding: `${spacing.section.paddingY} ${spacing.section.paddingX}`,
        }}
      >
        {/* Back link */}
        <motion.div
          {...animation.fadeIn}
          style={{ marginBottom: "2rem" }}
        >
          <Link
            href="/shop"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: isDark ? colors.dark.textBody : colors.light.textBody,
              textDecoration: "none",
              fontSize: "0.95rem",
              minHeight: spacing.touchTarget,
              transition: "color 0.2s",
            }}
          >
            <ArrowLeft size={16} />
            Back to Collection
          </Link>
        </motion.div>

        {/* Product layout — image left, details right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="product-grid"
        >
          {/* Image */}
          <motion.div
            initial={animation.slideLeft.initial}
            animate={animation.slideLeft.animate}
            transition={animation.slideLeft.transition}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "480px",
              margin: "0 auto",
              aspectRatio:
                product.product_type === "book" ? "2/3" : "1/1",
              borderRadius: radius.lg,
              overflow: "hidden",
              backgroundColor: isDark
                ? colors.dark.bgSecondary
                : colors.light.bgSecondary,
              boxShadow: isDark
                ? shadows.dark.product
                : shadows.light.product,
            }}
          >
            <Image
              src={product.images[0]?.url || "/images/placeholder.jpg"}
              alt={product.images[0]?.alt || product.name}
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              style={{ objectFit: "cover" }}
              priority
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={animation.slideRight.initial}
            animate={animation.slideRight.animate}
            transition={animation.slideRight.transition}
          >
            <SectionLabel>
              {typeLabels[product.product_type]}
              {product.pillar_tag !== "none" &&
                ` · ${pillarDescriptions[product.pillar_tag]}`}
            </SectionLabel>

            <h1
              style={{
                ...typography.h2,
                color: isDark
                  ? colors.dark.textPrimary
                  : colors.light.textPrimary,
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  ...typography.price,
                  fontSize: "1.5rem",
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

            <Divider />

            {/* Description */}
            <p
              style={{
                ...typography.body,
                color: isDark ? colors.dark.textBody : colors.light.textBody,
                marginTop: "1.5rem",
                marginBottom: "2rem",
                maxWidth: spacing.maxTextWidth,
              }}
            >
              {product.description}
            </p>

            {/* Format badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.4rem 1rem",
                borderRadius: radius.sm,
                backgroundColor: isDark
                  ? overlays.dark.goldSubtle
                  : overlays.light.goldSubtle,
                color: isDark
                  ? colors.dark.accentGold
                  : colors.light.accentGoldText,
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                marginBottom: "2rem",
              }}
            >
              {isDigital ? "Digital Download" : "Physical Product"}
            </div>

            {/* Add to cart */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span aria-live="polite" className="sr-only">
                {added ? `${product.name} added to cart` : ""}
              </span>
              <Button
                onClick={handleAddToCart}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {added ? (
                  <>
                    <Check size={18} />
                    Added
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>

            {/* Preview content */}
            {product.preview_content && (
              <div style={{ marginTop: "2.5rem" }}>
                <Divider />
                <h2
                  style={{
                    ...typography.h4,
                    color: isDark
                      ? colors.dark.textPrimary
                      : colors.light.textPrimary,
                    marginTop: "1.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  Preview
                </h2>
                <p
                  style={{
                    ...typography.body,
                    color: isDark
                      ? colors.dark.textBody
                      : colors.light.textBody,
                    fontStyle: "italic",
                  }}
                >
                  {product.preview_content}
                </p>
              </div>
            )}

            {/* Presenter image for workshops */}
            {product.presenter_image && (
              <div
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    position: "relative",
                    border: `2px solid ${
                      isDark
                        ? colors.dark.accentGold
                        : colors.light.accentGoldDecorative
                    }`,
                  }}
                >
                  <Image
                    src={product.presenter_image.url}
                    alt={product.presenter_image.alt}
                    fill
                    sizes="56px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      ...typography.label,
                      fontSize: "0.7rem",
                      color: isDark
                        ? colors.dark.accentGold
                        : colors.light.accentGoldText,
                      marginBottom: "0.15rem",
                    }}
                  >
                    Presented by
                  </p>
                  <p
                    style={{
                      ...typography.body,
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: isDark
                        ? colors.dark.textPrimary
                        : colors.light.textPrimary,
                    }}
                  >
                    {product.presenter_name || product.presenter_image.alt}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Responsive grid override */}
      <style>{`
        @media (min-width: 768px) {
          .product-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
