"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Divider } from "@/components/ui/Divider";
import { mockBlogPosts } from "@/data/mock-blog-posts";
import { formatDate } from "@/lib/utils";
import { colors, typography, spacing, animation, radius } from "@/lib/design-system";

export function BlogContent() {
  const published = mockBlogPosts.filter((p) => p.status === "published");

  return (
    <div style={{ marginTop: "72px" }}>
      {/* Hero */}
      <Section index={0}>
        <div className={`${spacing.maxWidthNarrow} text-center`}>
          <SectionLabel>Writings</SectionLabel>
          <h1
            className={`${typography.h1} ${spacing.headingMb}`}
            style={{ color: colors.text.heading }}
          >
            From the Desk of Dr. TLC
          </h1>
          <p
            className={`${typography.bodyLg} max-w-xl mx-auto`}
            style={{ color: colors.text.body }}
          >
            Reflections on healing, wholeness, and the Sacred Intelligence
            journey.
          </p>
        </div>
      </Section>

      {/* Posts */}
      <Section index={1}>
        <div className={spacing.maxWidthNarrow}>
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
                className="no-underline block"
                style={{ color: "inherit" }}
              >
                {post.cover_image && (
                  <div
                    className="relative w-full mb-6 overflow-hidden"
                    style={{
                      aspectRatio: "16/9",
                      borderRadius: radius.card,
                      backgroundColor: colors.bg.secondary,
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

                <div className="flex items-center gap-4 mb-3">
                  <span
                    className={typography.label}
                    style={{ color: colors.text.gold, fontSize: "0.7rem" }}
                  >
                    {post.category}
                  </span>
                  <time
                    dateTime={post.published_date}
                    className={typography.bodySm}
                    style={{ color: colors.text.muted }}
                  >
                    {formatDate(post.published_date)}
                  </time>
                </div>

                <h2
                  className={`${typography.h3} mb-3`}
                  style={{ color: colors.text.heading }}
                >
                  {post.title}
                </h2>

                <p
                  className={`${typography.body} mb-4`}
                  style={{ color: colors.text.body }}
                >
                  {post.excerpt}
                </p>

                <span
                  className={typography.label}
                  style={{ color: colors.text.gold, fontSize: "0.75rem" }}
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
