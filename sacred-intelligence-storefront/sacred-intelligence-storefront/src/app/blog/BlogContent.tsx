"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Divider } from "@/components/ui/Divider";
import { mockBlogPosts } from "@/data/mock-blog-posts";
import { formatDate } from "@/lib/utils";
import { colors, typography, spacing, animation, radius } from "@/lib/design-system";

export function BlogContent() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const published = mockBlogPosts.filter((p) => p.status === "published");

  return (
    <div style={{ marginTop: "72px" }}>
      {/* Hero */}
      <Section index={0}>
        <div
          style={{
            textAlign: "center",
            maxWidth: spacing.maxTextWidth,
            margin: "0 auto",
          }}
        >
          <SectionLabel>Writings</SectionLabel>
          <h1
            style={{
              ...typography.h1,
              color: isDark
                ? colors.dark.textPrimary
                : colors.light.textPrimary,
              marginTop: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            From the Desk of Dr. TLC
          </h1>
          <p
            style={{
              ...typography.bodyLg,
              color: isDark ? colors.dark.textBody : colors.light.textBody,
              maxWidth: "36rem",
              margin: "0 auto",
            }}
          >
            Reflections on healing, wholeness, and the Sacred Intelligence
            journey.
          </p>
        </div>
      </Section>

      {/* Posts */}
      <Section index={1}>
        <div style={{ maxWidth: spacing.maxTextWidth, margin: "0 auto" }}>
          {published.map((post, i) => (
            <motion.article
              key={post.id}
              initial={animation.stagger.item.initial}
              whileInView={animation.stagger.item.animate}
              transition={{
                ...animation.stagger.item.transition,
                delay: i * 0.12,
              }}
              viewport={animation.viewport}
            >
              <Link
                href={`/blog/${post.slug}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                {/* Cover image */}
                {post.cover_image && (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16/9",
                      borderRadius: radius.md,
                      overflow: "hidden",
                      marginBottom: "1.5rem",
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
                    />
                  </div>
                )}

                {/* Category + date */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      ...typography.label,
                      fontSize: "0.7rem",
                      color: isDark
                        ? colors.dark.accentGold
                        : colors.light.accentGoldText,
                    }}
                  >
                    {post.category}
                  </span>
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

                {/* Title */}
                <h2
                  style={{
                    ...typography.h3,
                    color: isDark
                      ? colors.dark.textPrimary
                      : colors.light.textPrimary,
                    marginBottom: "0.75rem",
                    transition: "color 0.2s",
                  }}
                >
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p
                  style={{
                    ...typography.body,
                    color: isDark
                      ? colors.dark.textBody
                      : colors.light.textBody,
                    marginBottom: "1rem",
                  }}
                >
                  {post.excerpt}
                </p>

                {/* Read more */}
                <span
                  style={{
                    ...typography.label,
                    fontSize: "0.75rem",
                    color: isDark
                      ? colors.dark.accentGold
                      : colors.light.accentGoldText,
                  }}
                >
                  Read More &rarr;
                </span>
              </Link>

              {i < published.length - 1 && <Divider />}
            </motion.article>
          ))}
        </div>
      </Section>
    </div>
  );
}
