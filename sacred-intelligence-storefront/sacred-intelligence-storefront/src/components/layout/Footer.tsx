import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--border)",
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-body)",
        transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
      }}
    >
      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "3rem clamp(1.5rem, 5vw, 4rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          textAlign: "center",
        }}
      >
        {/* Back link */}
        <Link
          href="https://sacredintelligence.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--accent-gold-decorative)",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: 500,
            letterSpacing: "0.04em",
          }}
        >
          sacredintelligence.com
        </Link>

        {/* Social links placeholder */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            fontSize: "0.85rem",
            color: "var(--text-body)",
          }}
        >
          <span>Instagram</span>
          <span>Facebook</span>
          <span>Twitter</span>
        </div>

        {/* Copyright */}
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--text-body)",
            opacity: 0.7,
          }}
        >
          &copy; {year} Sacred Intelligence Collection. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
