"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useCartStore } from "@/store/useCartStore";

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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "var(--bg-primary)",
        borderBottom: "1px solid var(--border)",
        transition: "background-color 0.3s, border-color 0.3s",
      }}
    >
      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Sacred Collection
        </Link>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "48px",
                minHeight: "48px",
                padding: "0 1rem",
                color: "var(--text-body)",
                textDecoration: "none",
                fontSize: "0.95rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                transition: "color 0.2s",
              }}
            >
              {link.label}
            </Link>
          ))}

          <ThemeToggle />

          {/* Cart */}
          <Link
            href="/cart"
            aria-label={`Shopping cart, ${totalItems} ${totalItems === 1 ? "item" : "items"}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              color: "var(--text-primary)",
              textDecoration: "none",
              position: "relative",
            }}
          >
            <ShoppingBag size={20} />
            <span
              style={{
                position: "absolute",
                top: "8px",
                right: "4px",
                backgroundColor: "var(--cta-primary-bg)",
                color: "var(--cta-primary-text)",
                fontSize: "0.65rem",
                fontWeight: 700,
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
