"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Check } from "lucide-react";
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
      <div className={`${spacing.section} ${spacing.pageX} ${spacing.maxWidth}`}>
        {/* Back link */}
        <motion.div {...animation.fadeIn} className="mb-8">
          <Link
            href="/shop"
            className={`inline-flex items-center gap-2 no-underline min-h-[48px] ${typography.bodySm} transition-colors hover:text-[var(--gold-primary)]`}
            style={{ color: colors.text.muted }}
          >
            <ArrowLeft size={16} />
            Back to Collection
          </Link>
        </motion.div>

        {/* Product layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <motion.div
            initial={animation.slideLeft.initial}
            animate={animation.slideLeft.animate}
            transition={animation.slideLeft.transition}
            className="relative w-full max-w-[480px] mx-auto overflow-hidden"
            style={{
              aspectRatio: product.product_type === "book" ? "2/3" : "1/1",
              borderRadius: radius.card,
              backgroundColor: colors.bg.secondary,
              boxShadow: shadows.product,
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
              className={`${typography.h2} ${spacing.headingMb}`}
              style={{ color: colors.text.heading }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span
                className={typography.price}
                style={{ color: colors.text.heading, fontSize: "1.5rem" }}
              >
                {formatPrice(product.price)}
              </span>
              {product.compare_price != null && (
                <span
                  className={`${typography.body} line-through opacity-50`}
                  style={{ color: colors.text.muted }}
                >
                  {formatPrice(product.compare_price)}
                </span>
              )}
            </div>

            <Divider />

            {/* Description */}
            <p
              className={`${typography.body} mt-6 ${spacing.bodyMb}`}
              style={{ color: colors.text.body, maxWidth: "50rem" }}
            >
              {product.description}
            </p>

            {/* Format badge */}
            <div
              className={`${typography.label} inline-flex items-center px-4 py-2 ${spacing.bodyMb}`}
              style={{
                borderRadius: radius.subtle,
                backgroundColor: overlays.goldSubtle,
                color: colors.gold.primary,
                fontSize: "0.8rem",
              }}
            >
              {isDigital ? "Digital Download" : "Physical Product"}
            </div>

            {/* Add to cart */}
            <div className="flex items-center gap-4">
              <span aria-live="polite" className="sr-only">
                {added ? `${product.name} added to cart` : ""}
              </span>
              <Button onClick={handleAddToCart}>
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
              <div className="mt-10">
                <Divider />
                <h2
                  className={`${typography.h4} mt-6 mb-3`}
                  style={{ color: colors.text.heading }}
                >
                  Preview
                </h2>
                <p
                  className={`${typography.body} italic`}
                  style={{ color: colors.text.body }}
                >
                  {product.preview_content}
                </p>
              </div>
            )}

            {/* Presenter */}
            {product.presenter_image && (
              <div className="mt-8 flex items-center gap-4">
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    border: `2px solid ${colors.gold.primary}`,
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
                    className={typography.label}
                    style={{ color: colors.text.gold, fontSize: "0.7rem", marginBottom: "0.15rem" }}
                  >
                    Presented by
                  </p>
                  <p
                    className={`${typography.bodySm} font-semibold`}
                    style={{ color: colors.text.heading }}
                  >
                    {product.presenter_name || product.presenter_image.alt}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
