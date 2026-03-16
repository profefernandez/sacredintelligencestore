"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
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
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const buttonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: spacing.touchTarget,
    height: spacing.touchTarget,
    border: `1px solid ${isDark ? colors.dark.border : colors.light.border}`,
    borderRadius: radius.sm,
    backgroundColor: "transparent",
    color: isDark ? colors.dark.textPrimary : colors.light.textPrimary,
    cursor: "pointer",
    transition: "border-color 0.2s",
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
      role="group"
      aria-label={`Quantity for ${productName}`}
    >
      <button
        onClick={() => onUpdate(quantity - 1)}
        aria-label={`Decrease quantity of ${productName}`}
        style={buttonStyle}
      >
        <Minus size={16} />
      </button>
      <span
        style={{
          minWidth: spacing.touchTarget,
          textAlign: "center",
          ...typography.body,
          fontWeight: 600,
          color: isDark ? colors.dark.textPrimary : colors.light.textPrimary,
        }}
        aria-live="polite"
      >
        {quantity}
      </span>
      <button
        onClick={() => onUpdate(quantity + 1)}
        aria-label={`Increase quantity of ${productName}`}
        style={buttonStyle}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

export function CartContent() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
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
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          {/* Back link */}
          <motion.div {...animation.fadeIn} style={{ marginBottom: "2rem" }}>
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
              }}
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </motion.div>

          <SectionLabel>Your Cart</SectionLabel>
          <h1
            style={{
              ...typography.h2,
              color: isDark
                ? colors.dark.textPrimary
                : colors.light.textPrimary,
              marginTop: "1rem",
              marginBottom: "2rem",
            }}
          >
            {isEmpty
              ? "Your cart is empty"
              : `${totalItems} ${totalItems === 1 ? "item" : "items"}`}
          </h1>

          {isEmpty ? (
            <motion.div
              {...animation.fadeUp}
              style={{
                textAlign: "center",
                padding: "3rem 0",
              }}
            >
              <ShoppingBag
                size={48}
                style={{
                  color: isDark
                    ? colors.dark.border
                    : colors.light.border,
                  margin: "0 auto 1.5rem",
                }}
              />
              <p
                style={{
                  ...typography.body,
                  color: isDark
                    ? colors.dark.textBody
                    : colors.light.textBody,
                  marginBottom: "2rem",
                }}
              >
                Discover the Sacred Intelligence Collection and add something
                meaningful to your cart.
              </p>
              <Button href="/shop">Browse the Collection</Button>
            </motion.div>
          ) : (
            <>
              {/* Cart items */}
              <div
                role="list"
                aria-label="Cart items"
              >
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
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        gap: "1.25rem",
                        alignItems: "center",
                        padding: "1.5rem 0",
                      }}
                    >
                      {/* Thumbnail */}
                      <Link
                        href={`/products/${item.product.slug}`}
                        style={{
                          position: "relative",
                          width: "80px",
                          height:
                            item.product.product_type === "book"
                              ? "120px"
                              : "80px",
                          borderRadius: radius.sm,
                          overflow: "hidden",
                          display: "block",
                          backgroundColor: isDark
                            ? colors.dark.bgSecondary
                            : colors.light.bgSecondary,
                        }}
                      >
                        <Image
                          src={
                            item.product.images[0]?.url ||
                            "/images/placeholder.jpg"
                          }
                          alt={
                            item.product.images[0]?.alt || item.product.name
                          }
                          fill
                          sizes="80px"
                          style={{ objectFit: "cover" }}
                        />
                      </Link>

                      {/* Info */}
                      <div>
                        <Link
                          href={`/products/${item.product.slug}`}
                          style={{
                            textDecoration: "none",
                            color: isDark
                              ? colors.dark.textPrimary
                              : colors.light.textPrimary,
                          }}
                        >
                          <h2
                            style={{
                              ...typography.h4,
                              fontSize: "1.05rem",
                              marginBottom: "0.25rem",
                            }}
                          >
                            {item.product.name}
                          </h2>
                        </Link>
                        <p
                          style={{
                            ...typography.label,
                            fontSize: "0.65rem",
                            color: isDark
                              ? colors.dark.accentGold
                              : colors.light.accentGoldText,
                            marginBottom: "0.75rem",
                          }}
                        >
                          {isDigitalProduct(item.product.product_type)
                            ? "Digital"
                            : "Physical"}{" "}
                          · {item.product.product_type}
                        </p>
                        <QuantityControl
                          quantity={item.quantity}
                          onUpdate={(q) =>
                            updateQuantity(item.product.id, q)
                          }
                          productName={item.product.name}
                        />
                      </div>

                      {/* Price + remove */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            ...typography.price,
                            color: isDark
                              ? colors.dark.textPrimary
                              : colors.light.textPrimary,
                          }}
                        >
                          {formatPrice(
                            item.product.price * item.quantity
                          )}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          aria-label={`Remove ${item.product.name} from cart`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: spacing.touchTarget,
                            height: spacing.touchTarget,
                            border: "none",
                            backgroundColor: "transparent",
                            color: isDark
                              ? colors.dark.textBody
                              : colors.light.textBody,
                            cursor: "pointer",
                            opacity: 0.6,
                            transition: "opacity 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.opacity =
                              "1")
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.opacity =
                              "0.6")
                          }
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
              <motion.div
                {...animation.fadeUp}
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    maxWidth: "20rem",
                  }}
                >
                  <span
                    style={{
                      ...typography.body,
                      fontWeight: 600,
                      color: isDark
                        ? colors.dark.textBody
                        : colors.light.textBody,
                    }}
                  >
                    Subtotal
                  </span>
                  <span
                    style={{
                      ...typography.price,
                      fontSize: "1.25rem",
                      color: isDark
                        ? colors.dark.textPrimary
                        : colors.light.textPrimary,
                    }}
                  >
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <p
                  style={{
                    ...typography.body,
                    fontSize: "0.85rem",
                    color: isDark
                      ? colors.dark.textBody
                      : colors.light.textBody,
                    opacity: 0.7,
                    textAlign: "right",
                    maxWidth: "20rem",
                  }}
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
