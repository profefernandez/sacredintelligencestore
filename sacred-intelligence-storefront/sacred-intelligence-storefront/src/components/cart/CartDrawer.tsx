"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { colors, typography, radius, gradients } from "@/lib/design-system";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const totalItems = useCartStore((s) => s.totalItems);

  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and keyboard handling
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      // Focus close button when drawer opens
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  const isEmpty = items.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70]"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-md flex flex-col"
            style={{
              background: colors.glass.bg,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderLeft: `2px solid ${colors.gold.primary}`,
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 shrink-0"
              style={{
                height: "72px",
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              <h2
                className="font-serif text-xl font-semibold"
                style={{ color: colors.text.heading }}
              >
                Your Cart
                {totalItems() > 0 && (
                  <span
                    className="ml-2 text-sm font-sans"
                    style={{ color: colors.text.muted }}
                  >
                    ({totalItems()} {totalItems() === 1 ? "item" : "items"})
                  </span>
                )}
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close cart"
                className="flex items-center justify-center w-[44px] h-[44px] transition-colors duration-200 cursor-pointer"
                style={{
                  color: colors.text.heading,
                  background: "transparent",
                  border: "none",
                  borderRadius: radius.card,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = colors.gold.hover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = colors.text.heading)
                }
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag
                    size={48}
                    style={{ color: colors.text.muted, opacity: 0.5 }}
                  />
                  <p
                    className="text-lg font-serif"
                    style={{ color: colors.text.muted }}
                  >
                    Your cart is empty
                  </p>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="no-underline font-semibold text-sm uppercase tracking-widest transition-colors duration-200"
                    style={{ color: colors.gold.primary }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = colors.gold.hover)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = colors.gold.primary)
                    }
                  >
                    Browse the Collection
                  </Link>
                </div>
              ) : (
                <ul className="list-none m-0 p-0">
                  {items.map((item, idx) => (
                    <li
                      key={item.product.id}
                      className="flex gap-4 py-4"
                      style={{
                        borderBottom:
                          idx < items.length - 1
                            ? `1px solid ${colors.border}`
                            : "none",
                      }}
                    >
                      {/* Product Image */}
                      <div
                        className="relative shrink-0 overflow-hidden"
                        style={{
                          width: "64px",
                          height: "64px",
                          borderRadius: radius.card,
                          backgroundColor: colors.bg.secondary,
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
                          sizes="64px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-serif text-sm font-semibold leading-tight mb-1 truncate"
                          style={{ color: colors.text.heading }}
                        >
                          {item.product.name}
                        </h3>
                        <p
                          className="text-sm font-semibold mb-2"
                          style={{ color: colors.text.gold }}
                        >
                          {formatPrice(item.product.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            aria-label={`Decrease quantity of ${item.product.name}`}
                            className="flex items-center justify-center transition-colors duration-200 cursor-pointer"
                            style={{
                              width: "44px",
                              height: "44px",
                              minWidth: "44px",
                              minHeight: "44px",
                              borderRadius: radius.card,
                              border: `1.5px solid ${colors.gold.primary}`,
                              background: "transparent",
                              color: colors.gold.primary,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "rgba(201, 168, 76, 0.1)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                            }}
                          >
                            <Minus size={14} />
                          </button>

                          <span
                            className="text-sm font-semibold min-w-[24px] text-center"
                            style={{ color: colors.text.heading }}
                            aria-label={`Quantity: ${item.quantity}`}
                          >
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            aria-label={`Increase quantity of ${item.product.name}`}
                            className="flex items-center justify-center transition-colors duration-200 cursor-pointer"
                            style={{
                              width: "44px",
                              height: "44px",
                              minWidth: "44px",
                              minHeight: "44px",
                              borderRadius: radius.card,
                              border: `1.5px solid ${colors.gold.primary}`,
                              background: "transparent",
                              color: colors.gold.primary,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "rgba(201, 168, 76, 0.1)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                            }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        aria-label={`Remove ${item.product.name} from cart`}
                        className="self-start flex items-center justify-center w-[44px] h-[44px] transition-colors duration-200 cursor-pointer shrink-0"
                        style={{
                          color: colors.text.muted,
                          background: "transparent",
                          border: "none",
                          borderRadius: radius.card,
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#ef4444")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = colors.text.muted)
                        }
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer — Subtotal + Checkout */}
            {!isEmpty && (
              <div
                className="shrink-0 px-6 py-5"
                style={{
                  borderTop: `1px solid ${colors.border}`,
                }}
              >
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-base font-semibold"
                    style={{ color: colors.text.muted }}
                  >
                    Subtotal
                  </span>
                  <span
                    className="text-xl font-bold"
                    style={{ color: colors.text.heading }}
                  >
                    {formatPrice(totalPrice())}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="no-underline w-full flex items-center justify-center gap-2 font-semibold text-sm uppercase tracking-widest transition-all duration-300"
                  style={{
                    minHeight: "48px",
                    borderRadius: radius.card,
                    background: gradients.goldCta,
                    color: colors.purple.deep,
                    display: "flex",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = gradients.goldCtaHover;
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(201, 168, 76, 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = gradients.goldCta;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <ShoppingBag size={18} />
                  Checkout
                </Link>

                {/* Continue Shopping */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full mt-3 text-center text-sm font-medium transition-colors duration-200 cursor-pointer"
                  style={{
                    color: colors.text.muted,
                    background: "transparent",
                    border: "none",
                    minHeight: "44px",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = colors.gold.hover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = colors.text.muted)
                  }
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
