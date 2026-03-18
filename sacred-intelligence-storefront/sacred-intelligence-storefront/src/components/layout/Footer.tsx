import Link from "next/link";
import { colors, typography, spacing } from "@/lib/design-system";
import GoldVerticalLine from "@/components/ui/GoldVerticalLine";

const shopLinks = [
  { label: "Books", href: "/shop?category=book" },
  { label: "Digital Downloads", href: "/shop?category=document" },
  { label: "Merchandise", href: "/shop?category=merchandise" },
  { label: "Workshops", href: "/shop?category=workshop" },
];

const mediaLinks = [
  { label: "Sacred Intelligence TV", href: "/media#sacred-intelligence-tv" },
  { label: "Dismantle Racism", href: "/media#dismantle-racism" },
  { label: "TEDx", href: "/media#tedx" },
  { label: "Podcasts & Interviews", href: "/media#podcasts" },
];

const connectLinks = [
  { label: "About Dr. TLC", href: "/about" },
  { label: "Contact", href: "/about#contact" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sacredintelligence",
    external: true,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/sacredintelligence",
    external: true,
  },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className={`${typography.label} mb-5`}
      style={{ color: colors.gold.primary }}
    >
      {children}
    </h3>
  );
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const className = `${typography.bodySm} block py-2 min-h-[48px] flex items-center no-underline transition-colors duration-200`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={{ color: colors.text.muted }}
        onMouseEnter={undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      style={{ color: colors.text.muted }}
    >
      {children}
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className={`${spacing.pageX} mb-[72px] lg:mb-0`}
      style={{
        backgroundColor: colors.bg.secondary,
      }}
    >
      {/* Top gold line */}
      <div
        aria-hidden="true"
        style={{
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${colors.gold.primary}, transparent)`,
        }}
      />

      <div className="max-w-7xl mx-auto py-16 lg:py-20">
        {/* Column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-y-12 gap-x-8 lg:gap-x-0">
          {/* Column 1: Brand */}
          <div className="lg:pr-8">
            <p
              className="font-serif text-2xl font-bold mb-4"
              style={{ color: colors.text.heading }}
            >
              Sacred Collection
            </p>
            <p
              className={`${typography.bodySm} mb-5`}
              style={{ color: colors.text.muted }}
            >
              Books, media, workshops, and digital resources by Rev. Dr. Terrlyn
              L. Curry Avery.
            </p>
            <a
              href="https://sacredintelligence.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${typography.bodySm} no-underline font-medium transition-colors duration-200 inline-flex items-center min-h-[48px]`}
              style={{ color: colors.gold.primary }}
            >
              sacredintelligence.com
            </a>
          </div>

          {/* Separator 1 */}
          <GoldVerticalLine
            className="hidden lg:block mx-auto"
            opacity={0.4}
            glow={false}
          />

          {/* Column 2: Shop */}
          <nav aria-label="Shop links" className="lg:px-8">
            <FooterHeading>Shop</FooterHeading>
            <ul className="list-none p-0 m-0 space-y-0">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Separator 2 */}
          <GoldVerticalLine
            className="hidden lg:block mx-auto"
            opacity={0.4}
            glow={false}
          />

          {/* Column 3: Media */}
          <nav aria-label="Media links" className="lg:px-8">
            <FooterHeading>Media</FooterHeading>
            <ul className="list-none p-0 m-0 space-y-0">
              {mediaLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Separator 3 */}
          <GoldVerticalLine
            className="hidden lg:block mx-auto"
            opacity={0.4}
            glow={false}
          />

          {/* Column 4: Connect */}
          <nav aria-label="Connect links" className="lg:pl-8">
            <FooterHeading>Connect</FooterHeading>
            <ul className="list-none p-0 m-0 space-y-0">
              {connectLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} external={link.external}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom divider */}
        <div
          aria-hidden="true"
          className="mt-16 lg:mt-20 mb-8"
          style={{
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${colors.gold.primary}, transparent)`,
          }}
        />

        {/* Copyright */}
        <p
          className={`${typography.bodySm} text-center`}
          style={{ color: colors.text.muted }}
        >
          &copy; {year} Sacred Intelligence Collection. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
