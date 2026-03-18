"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Play, User, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { colors } from "@/lib/design-system";
import { useHydrated } from "@/lib/useHydrated";

const tabs = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop", href: "/shop", icon: ShoppingBag },
  { label: "Media", href: "/media", icon: Play },
  { label: "Account", href: "/account", icon: User },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function BottomNav() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const totalItems = useCartStore((state) => state.totalItems);
  const cartCount = hydrated ? totalItems() : 0;

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{
        height: 72,
        background: "rgba(13, 11, 18, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: `1px solid rgba(201, 168, 76, 0.12)`,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <ul className="flex items-center justify-around h-full px-1 m-0 list-none">
        {tabs.map(({ label, href, icon: Icon }) => {
          const active = isActive(pathname, href);
          const isCart = label === "Cart";

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className="flex flex-col items-center justify-center gap-1 no-underline"
                style={{
                  minWidth: 48,
                  minHeight: 48,
                  color: active ? colors.gold.primary : colors.text.muted,
                  transition: "color 0.2s ease",
                }}
              >
                {/* Active dot indicator */}
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    backgroundColor: active ? colors.gold.primary : "transparent",
                    marginBottom: 2,
                    transition: "background-color 0.2s ease",
                  }}
                  aria-hidden="true"
                />

                {/* Icon wrapper with optional cart badge */}
                <span className="relative inline-flex">
                  <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />

                  {isCart && cartCount > 0 && (
                    <span
                      aria-label={`${cartCount} item${cartCount !== 1 ? "s" : ""} in cart`}
                      className="absolute flex items-center justify-center"
                      style={{
                        top: -6,
                        right: -8,
                        minWidth: 16,
                        height: 16,
                        borderRadius: 8,
                        backgroundColor: colors.gold.primary,
                        color: colors.purple.deep,
                        fontSize: 10,
                        fontWeight: 700,
                        lineHeight: 1,
                        padding: "0 4px",
                      }}
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </span>

                {/* Label */}
                <span
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: active ? 600 : 400,
                    lineHeight: 1,
                  }}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
