"use client";

import Link from "next/link";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useMembershipStore } from "@/store/useMembershipStore";
import { colors, gradients } from "@/lib/design-system";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CartDrawer from "@/components/cart/CartDrawer";
import { useHydrated } from "@/lib/useHydrated";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/media", label: "Media" },
  { href: "/workshops", label: "Workshops" },
  { href: "https://sacredintelligence.com/about", label: "About", external: true },
];

const GLASS_BORDER = "rgba(201, 168, 76, 0.12)";
const HEADER_BG = "rgba(13, 11, 18, 0.95)";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const hydrated = useHydrated();
  const rawTotalItems = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const rawIsMember = useMembershipStore((s) => s.isMember);

  // Use 0/false during SSR to match server HTML, real values after hydration
  const displayItems = hydrated ? rawTotalItems : 0;
  const displayIsMember = hydrated ? rawIsMember : false;

  return (
    <>
      <header
        role="banner"
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: HEADER_BG,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${GLASS_BORDER}`,
          height: "72px",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between h-full">
          {/* Mobile: Hamburger (left) */}
          <button
            type="button"
            aria-label="Open menu"
            className="lg:hidden flex items-center justify-center w-[48px] h-[48px] transition-colors"
            style={{ color: colors.text.heading }}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl font-bold no-underline lg:mr-12"
            style={{ color: colors.text.heading }}
          >
            Sacred Collection
          </Link>

          {/* Desktop Nav Links (center/right) */}
          <nav
            className="hidden lg:flex items-center gap-1 flex-1"
            aria-label="Primary"
          >
            {navLinks.map((link) => {
              const isExternal = "external" in link && link.external;
              const linkProps = {
                className:
                  "flex items-center justify-center min-w-[48px] min-h-[48px] px-4 no-underline text-base font-medium tracking-wide transition-colors duration-200",
                style: { color: colors.text.muted },
                onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) =>
                  (e.currentTarget.style.color = colors.gold.hover),
                onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) =>
                  (e.currentTarget.style.color = colors.text.muted),
              };

              if (isExternal) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...linkProps}
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link key={link.href} href={link.href} {...linkProps}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Icons */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Membership CTA / Badge */}
            {displayIsMember ? (
              <span
                className="flex items-center justify-center px-3 text-xs font-semibold uppercase tracking-widest"
                style={{
                  color: colors.gold.primary,
                  minHeight: "48px",
                }}
                aria-label="You are a member"
              >
                Member
              </span>
            ) : (
              <Link
                href="/membership"
                aria-label="Become a member"
                className="flex items-center justify-center px-4 text-xs font-semibold uppercase tracking-widest no-underline transition-shadow duration-200 mr-1"
                style={{
                  background: gradients.goldCta,
                  color: colors.purple.deep,
                  borderRadius: "9999px",
                  minHeight: "36px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = gradients.goldCtaHover;
                  e.currentTarget.style.boxShadow = `0 0 12px rgba(201, 168, 76, 0.3)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = gradients.goldCta;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Become a Member
              </Link>
            )}
            <Link
              href="/search"
              aria-label="Search"
              className="flex items-center justify-center w-[48px] h-[48px] no-underline transition-colors duration-200"
              style={{ color: colors.text.heading }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = colors.gold.hover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = colors.text.heading)
              }
            >
              <Search size={20} />
            </Link>
            <Link
              href="/account"
              aria-label="Account"
              className="flex items-center justify-center w-[48px] h-[48px] no-underline transition-colors duration-200"
              style={{ color: colors.text.heading }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = colors.gold.hover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = colors.text.heading)
              }
            >
              <User size={20} />
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping cart, ${displayItems} ${displayItems === 1 ? "item" : "items"}`}
              className="flex items-center justify-center w-[48px] h-[48px] relative transition-colors duration-200 cursor-pointer"
              style={{
                color: colors.text.heading,
                background: "transparent",
                border: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = colors.gold.hover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = colors.text.heading)
              }
            >
              <ShoppingBag size={20} />
              {displayItems > 0 && (
                <span
                  className="absolute top-2 right-1 text-[0.65rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: colors.gold.primary,
                    color: colors.purple.deep,
                  }}
                >
                  {displayItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: Cart (right) */}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Shopping cart, ${displayItems} ${displayItems === 1 ? "item" : "items"}`}
            className="lg:hidden flex items-center justify-center w-[48px] h-[48px] relative cursor-pointer"
            style={{
              color: colors.text.heading,
              background: "transparent",
              border: "none",
            }}
          >
            <ShoppingBag size={20} />
            {displayItems > 0 && (
              <span
                className="absolute top-2 right-1 text-[0.65rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: colors.gold.primary,
                  color: colors.purple.deep,
                }}
              >
                {displayItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] lg:hidden flex flex-col"
            style={{
              backgroundColor: "rgba(13, 11, 18, 0.97)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Close button */}
            <div className="flex items-center justify-end px-5 sm:px-8" style={{ height: "72px" }}>
              <button
                type="button"
                aria-label="Close menu"
                className="flex items-center justify-center w-[48px] h-[48px] transition-colors duration-200"
                style={{ color: colors.text.heading }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile nav links */}
            <nav
              className="flex flex-col px-8 sm:px-12 mt-8 gap-2 flex-1"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => {
                const isExternal = "external" in link && link.external;
                const mobileProps = {
                  className:
                    "flex items-center min-h-[48px] py-3 no-underline text-2xl font-serif font-semibold tracking-wide transition-colors duration-200",
                  style: { color: colors.text.heading },
                  onClick: () => setMobileMenuOpen(false),
                  onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) =>
                    (e.currentTarget.style.color = colors.gold.hover),
                  onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) =>
                    (e.currentTarget.style.color = colors.text.heading),
                };

                if (isExternal) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...mobileProps}
                    >
                      {link.label}
                    </a>
                  );
                }

                return (
                  <Link key={link.href} href={link.href} {...mobileProps}>
                    {link.label}
                  </Link>
                );
              })}

              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center min-h-[48px] py-3 no-underline text-2xl font-serif font-semibold tracking-wide transition-colors duration-200"
                style={{ color: colors.text.heading }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = colors.gold.hover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = colors.text.heading)
                }
              >
                Account
              </Link>

              {/* Gold CTA at bottom */}
              <div className="mt-auto mb-12">
                <Link
                  href="/workshops"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-block no-underline text-base font-semibold uppercase tracking-[0.15em] transition-colors duration-200"
                  style={{ color: colors.gold.primary }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = colors.gold.hover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = colors.gold.primary)
                  }
                >
                  Work With Dr. TLC
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
