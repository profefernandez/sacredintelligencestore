import Link from "next/link";
import { colors, typography } from "@/lib/design-system";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="px-5 sm:px-8 lg:px-10"
      style={{
        borderTop: `1px solid ${colors.border}`,
        backgroundColor: colors.bg.secondary,
      }}
    >
      <div className="max-w-7xl mx-auto py-12 flex flex-col items-center gap-6 text-center">
        {/* Back link */}
        <Link
          href="https://sacredintelligence.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`${typography.bodySm} no-underline font-medium tracking-wide`}
          style={{ color: colors.gold.primary }}
        >
          sacredintelligence.com
        </Link>

        {/* Social links placeholder */}
        <div
          className={`flex gap-6 ${typography.bodySm}`}
          style={{ color: colors.text.muted }}
        >
          <span>Instagram</span>
          <span>Facebook</span>
          <span>Twitter</span>
        </div>

        {/* Copyright */}
        <p
          className={typography.bodySm}
          style={{ color: colors.text.muted }}
        >
          &copy; {year} Sacred Intelligence Collection. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
