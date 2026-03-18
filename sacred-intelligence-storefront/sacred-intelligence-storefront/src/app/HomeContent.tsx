"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Music,
  FileText,
  Package,
  Video,
  Headphones,
} from "lucide-react";
import { colors, animation } from "@/lib/design-system";
import { formatPrice } from "@/lib/utils";
import { typeLabels } from "@/lib/utils";
import { mockProducts } from "@/data/mock-products";
import { useCartStore } from "@/store/useCartStore";
import type { Product, ProductType } from "@/lib/types";

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const typeIcons: Record<ProductType, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  book: BookOpen,
  album: Music,
  document: FileText,
  merchandise: Package,
  video: Video,
  workshop: Headphones,
};

const cardBgColors = [colors.bg.tertiary, colors.purple.dark, colors.bg.primary];

const featuredProducts = mockProducts.filter((p) => p.featured).slice(0, 3);

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function HomeContent() {
  const [addedId, setAddedId] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <main>
      {/* ================================================================== */}
      {/*  Section 1: Hero                                                    */}
      {/* ================================================================== */}
      <section
        aria-label="Hero"
        className="relative flex items-center justify-center py-12 sm:py-16"
        style={{
          backgroundColor: colors.bg.primary,
          marginTop: "72px",
          maxHeight: "40vh",
          background: `linear-gradient(170deg, ${colors.bg.primary} 0%, ${colors.bg.secondary} 100%)`,
        }}
      >
        <motion.div
          className="text-center px-5 sm:px-8 lg:px-10"
          initial={animation.fadeUp.initial}
          animate={animation.fadeUp.animate}
          transition={animation.fadeUp.transition}
        >
          <p
            className="text-xs uppercase tracking-[0.2em] font-semibold mb-3"
            style={{ color: colors.gold.primary }}
          >
            THE COLLECTION
          </p>

          <h1
            className="text-2xl sm:text-3xl font-serif font-bold"
            style={{ color: colors.text.heading }}
          >
            Sacred Intelligence Collection
          </h1>

          <p
            className="text-sm sm:text-base max-w-lg mx-auto mt-3"
            style={{ color: colors.text.body }}
          >
            Books, media, workshops &amp; digital resources by Rev. Dr. Terrlyn
            L. Curry Avery
          </p>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Link href="/shop" className="btn-gold">
              Shop Now
            </Link>
            <Link href="/media" className="btn-outline">
              Watch Free
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/*  Section 2: Featured Products                                       */}
      {/* ================================================================== */}
      <section
        aria-labelledby="featured-heading"
        className="py-10 sm:py-12"
        style={{ backgroundColor: colors.bg.secondary }}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
          <h2
            id="featured-heading"
            className="text-lg sm:text-xl font-serif font-semibold mb-6"
            style={{ color: colors.text.heading }}
          >
            Featured
          </h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={animation.viewport}
            variants={animation.stagger.container}
          >
            {featuredProducts.map((product, i) => {
              const Icon = typeIcons[product.product_type];
              const isBook = product.product_type === "book";
              const isAdded = addedId === product.id;

              return (
                <motion.div key={product.id} variants={animation.stagger.item}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="group block"
                  >
                    {/* Placeholder image */}
                    <div
                      className="relative w-full flex items-center justify-center"
                      style={{
                        aspectRatio: isBook ? "3/4" : "1/1",
                        borderRadius: "8px",
                        backgroundColor: cardBgColors[i % cardBgColors.length],
                      }}
                    >
                      <Icon
                        size={32}
                        style={{
                          color: colors.gold.primary,
                          opacity: 0.4,
                        }}
                      />
                    </div>

                    {/* Product info */}
                    <div className="mt-3">
                      <span
                        className="text-[10px] uppercase tracking-wider font-semibold"
                        style={{ color: colors.gold.primary }}
                      >
                        {typeLabels[product.product_type]}
                      </span>

                      <h3
                        className="text-sm font-semibold line-clamp-2 mt-1"
                        style={{ color: colors.text.heading }}
                      >
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="text-sm font-bold"
                          style={{ color: colors.text.heading }}
                        >
                          {formatPrice(product.price)}
                        </span>
                        {product.compare_price && (
                          <span
                            className="text-xs line-through"
                            style={{ color: colors.text.muted }}
                          >
                            {formatPrice(product.compare_price)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="w-full text-xs rounded py-2 mt-2 font-semibold transition-colors"
                        style={{
                          backgroundColor: isAdded
                            ? colors.semantic.success
                            : colors.gold.primary,
                          color: isAdded
                            ? colors.bg.primary
                            : colors.purple.deep,
                        }}
                      >
                        {isAdded ? "Added \u2713" : "Add to Cart"}
                      </button>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  Section 3: Membership CTA Banner                                   */}
      {/* ================================================================== */}
      <section
        aria-label="Membership"
        className="py-8 sm:py-10"
        style={{
          backgroundColor: colors.bg.tertiary,
          borderTop: "1px solid rgba(201, 168, 76, 0.15)",
        }}
      >
        <motion.div
          className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          initial={animation.fadeIn.initial}
          whileInView={animation.fadeIn.animate}
          viewport={animation.viewport}
          transition={animation.fadeIn.transition}
        >
          <div>
            <h2
              className="text-lg sm:text-xl font-serif font-semibold"
              style={{ color: colors.text.heading }}
            >
              Stream 90+ videos
            </h2>
            <p className="text-sm mt-1" style={{ color: colors.text.muted }}>
              $9.99/mo &middot; Cancel anytime
            </p>
          </div>

          <Link href="/membership" className="btn-gold shrink-0">
            Start Free Trial
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
