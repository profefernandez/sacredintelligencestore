"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Divider } from "@/components/ui/Divider";
import { formatPrice, isDigitalProduct } from "@/lib/utils";
import { colors, typography, spacing, animation, radius } from "@/lib/design-system";

function QuantityControl({
  quantity,
  onUpdate,
  productName,
}: {
  quantity: number;
  onUpdate: (q: number) => void;
  productName: string;
}) {
  return (
    <div
      className="flex items-center gap-1"
      role="group"
      aria-label={`Quantity for ${productName}`}
    >
      <button
        onClick={() => onUpdate(quantity - 1)}
        aria-label={`Decrease quantity of ${productName}`}
        className="flex items-center justify-center w-[48px] h-[48px] bg-transparent cursor-pointer transition-colors"
        style={{
          border: `1px solid ${colors.border}`,
          borderRadius: radius.subtle,
          color: colors.text.heading,
        }}
      >
        <Minus size={16} />
      </button>
      <span
        className={`min-w-[48px] text-center font-semibold ${typography.body}`}
        style={{ color: colors.text.heading }}
        aria-live="polite"
      >
        {quantity}
      </span>
      <button
        onClick={() => onUpdate(quantity + 1)}
        aria-label={`Increase quantity of ${productName}`}
        className="flex items-center justify-center w-[48px] h-[48px] bg-transparent cursor-pointer transition-colors"
        style={{
          border: `1px solid ${colors.border}`,
          borderRadius: radius.subtle,
          color: colors.text.heading,
        }}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

export function CartContent() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalPrice = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );
  const totalItems = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const isEmpty = items.length === 0;

  return (
    <div style={{ marginTop: "72px" }}>
      <Section index={0}>
        <div className={spacing.maxWidthNarrow}>
          {/* Back link */}
          <motion.div {...animation.fadeIn} className="mb-8">
            <Link
              href="/shop"
              className={`inline-flex items-center gap-2 no-underline min-h-[48px] ${typography.bodySm}`}
              style={{ color: colors.text.muted }}
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </motion.div>

          <SectionLabel>Your Cart</SectionLabel>
          <h1
            className={`${typography.h2} ${spacing.bodyMb}`}
            style={{ color: colors.text.heading }}
          >
            {isEmpty
              ? "Your cart is empty"
              : `${totalItems} ${totalItems === 1 ? "item" : "items"}`}
          </h1>

          {isEmpty ? (
            <motion.div {...animation.fadeUp} className="text-center py-12">
              <ShoppingBag
                size={48}
                className="mx-auto mb-6"
                style={{ color: colors.border }}
              />
              <p
                className={`${typography.body} ${spacing.bodyMb}`}
                style={{ color: colors.text.body }}
              >
                Discover the Sacred Intelligence Collection and add something
                meaningful to your cart.
              </p>
              <Button href="/shop">Browse the Collection</Button>
            </motion.div>
          ) : (
            <>
              <div role="list" aria-label="Cart items">
                {items.map((item, i) => (
                  <motion.div
                    key={item.product.id}
                    role="listitem"
                    initial={animation.stagger.item.initial}
                    animate={animation.stagger.item.animate}
                    transition={{
                      ...animation.stagger.item.transition,
                      delay: i * 0.08,
                    }}
                  >
                    <div className="grid grid-cols-[auto_1fr_auto] gap-5 items-center py-6">
                      {/* Thumbnail */}
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="relative block overflow-hidden"
                        style={{
                          width: "80px",
                          height: item.product.product_type === "book" ? "120px" : "80px",
                          borderRadius: radius.subtle,
                          backgroundColor: colors.bg.secondary,
                        }}
                      >
                        <Image
                          src={item.product.images[0]?.url || "/images/placeholder.jpg"}
                          alt={item.product.images[0]?.alt || item.product.name}
                          fill
                          sizes="80px"
                          style={{ objectFit: "cover" }}
                        />
                      </Link>

                      {/* Info */}
                      <div>
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="no-underline"
                          style={{ color: colors.text.heading }}
                        >
                          <h2 className={`${typography.h4} mb-1`} style={{ fontSize: "1.05rem" }}>
                            {item.product.name}
                          </h2>
                        </Link>
                        <p
                          className={`${typography.label} mb-3`}
                          style={{ color: colors.text.gold, fontSize: "0.65rem" }}
                        >
                          {isDigitalProduct(item.product.product_type) ? "Digital" : "Physical"}{" "}
                          · {item.product.product_type}
                        </p>
                        <QuantityControl
                          quantity={item.quantity}
                          onUpdate={(q) => updateQuantity(item.product.id, q)}
                          productName={item.product.name}
                        />
                      </div>

                      {/* Price + remove */}
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={typography.price}
                          style={{ color: colors.text.heading }}
                        >
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          aria-label={`Remove ${item.product.name} from cart`}
                          className="flex items-center justify-center w-[48px] h-[48px] border-none bg-transparent cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                          style={{ color: colors.text.muted }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <Divider />
                  </motion.div>
                ))}
              </div>

              {/* Summary */}
              <motion.div {...animation.fadeUp} className="mt-8 flex flex-col items-end gap-4">
                <div className="flex justify-between w-full max-w-xs">
                  <span
                    className={`${typography.body} font-semibold`}
                    style={{ color: colors.text.muted }}
                  >
                    Subtotal
                  </span>
                  <span
                    className={typography.price}
                    style={{ color: colors.text.heading, fontSize: "1.25rem" }}
                  >
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <p
                  className={`${typography.bodySm} text-right max-w-xs`}
                  style={{ color: colors.text.muted }}
                >
                  Shipping and taxes calculated at checkout.
                </p>
                <Button
                  onClick={() => {
                    // Stripe checkout will be integrated in a future chunk
                  }}
                  style={{ minWidth: "20rem" }}
                >
                  Proceed to Checkout
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </Section>
    </div>
  );
}
