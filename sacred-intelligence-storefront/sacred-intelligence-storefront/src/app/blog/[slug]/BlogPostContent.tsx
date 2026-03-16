"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Divider } from "@/components/ui/Divider";
import { formatDate } from "@/lib/utils";
import { colors, typography, spacing, animation, radius } from "@/lib/design-system";
import type { BlogPost } from "@/lib/types";

export function BlogPostContent({ post }: { post: BlogPost }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Developer-approved use of dangerouslySetInnerHTML for CMS blog content.
  // All HTML is sanitized via sanitize-html before rendering.
  const cleanBody = sanitizeHtml(post.body, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h2", "h3", "img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height"],
    },
    allowedSchemes: ["https"],
  });

  return (
    <div style={{ marginTop: "72px" }}>
      <Section index={0}>
        <div style={{ maxWidth: spacing.maxTextWidth, margin: "0 auto" }}>
          {/* Back link */}
          <motion.div {...animation.fadeIn} style={{ marginBottom: "2rem" }}>
            <Link
              href="/blog"
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
              Back to Blog
            </Link>
          </motion.div>

          <article>
            {/* Header */}
            <motion.header
              initial={animation.fadeUp.initial}
              animate={animation.fadeUp.animate}
              transition={animation.fadeUp.transition}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <SectionLabel>{post.category}</SectionLabel>
                <span
                  style={{
                    ...typography.body,
                    fontSize: "0.85rem",
                    color: isDark
                      ? colors.dark.textBody
                      : colors.light.textBody,
                    opacity: 0.6,
                  }}
                >
                  {formatDate(post.published_date)}
                </span>
              </div>

              <h1
                style={{
                  ...typography.h1,
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  color: isDark
                    ? colors.dark.textPrimary
                    : colors.light.textPrimary,
                  marginBottom: "1rem",
                }}
              >
                {post.title}
              </h1>

              <p
                style={{
                  ...typography.body,
                  fontSize: "0.95rem",
                  color: isDark
                    ? colors.dark.textBody
                    : colors.light.textBody,
                  marginBottom: "2rem",
                }}
              >
                By {post.author}
              </p>
            </motion.header>

            {/* Cover image */}
            {post.cover_image && (
              <motion.div
                initial={animation.fadeIn.initial}
                animate={animation.fadeIn.animate}
                transition={{ ...animation.fadeIn.transition, delay: 0.2 }}
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/9",
                  borderRadius: radius.lg,
                  overflow: "hidden",
                  marginBottom: "2.5rem",
                  backgroundColor: isDark
                    ? colors.dark.bgSecondary
                    : colors.light.bgSecondary,
                }}
              >
                <Image
                  src={post.cover_image.url}
                  alt={post.cover_image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50rem"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </motion.div>
            )}

            <Divider />

            {/* Body */}
            <motion.div
              initial={animation.fadeUp.initial}
              animate={animation.fadeUp.animate}
              transition={{ ...animation.fadeUp.transition, delay: 0.3 }}
              dangerouslySetInnerHTML={{ __html: cleanBody }}
              style={{
                ...typography.body,
                color: isDark ? colors.dark.textBody : colors.light.textBody,
                marginTop: "2rem",
              }}
              className="blog-body"
            />
          </article>
        </div>
      </Section>

      {/* Blog body typography styles — uses CSS custom properties set by ThemeProvider */}
      <style>{`
        .blog-body h2 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: 600;
          line-height: 1.2;
          color: var(--text-primary);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .blog-body h3 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          font-weight: 600;
          line-height: 1.25;
          color: var(--text-primary);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .blog-body p {
          margin-bottom: 1.25rem;
        }
        .blog-body strong {
          color: var(--text-primary);
          font-weight: 600;
        }
        .blog-body em {
          color: var(--accent-gold-text);
        }
      `}</style>
    </div>
  );
}
