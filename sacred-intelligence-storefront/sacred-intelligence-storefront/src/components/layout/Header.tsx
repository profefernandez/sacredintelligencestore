"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { colors } from "@/lib/design-system";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Header() {
  const totalItems = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header
      role="banner"
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 transition-colors"
      style={{
        backgroundColor: colors.bg.primary,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-2xl font-bold no-underline"
          style={{ color: colors.text.heading }}
        >
          Sacred Collection
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-center min-w-[48px] min-h-[48px] px-4 no-underline text-base font-medium tracking-wide transition-colors hover:text-[var(--gold-primary)]"
              style={{ color: colors.text.muted }}
            >
              {link.label}
            </Link>
          ))}

          {/* Cart */}
          <Link
            href="/cart"
            aria-label={`Shopping cart, ${totalItems} ${totalItems === 1 ? "item" : "items"}`}
            className="flex items-center justify-center w-[48px] h-[48px] no-underline relative"
            style={{ color: colors.text.heading }}
          >
            <ShoppingBag size={20} />
            <span
              className="absolute top-2 right-1 text-[0.65rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center"
              style={{
                backgroundColor: colors.gold.primary,
                color: colors.purple.deep,
              }}
            >
              {totalItems}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
