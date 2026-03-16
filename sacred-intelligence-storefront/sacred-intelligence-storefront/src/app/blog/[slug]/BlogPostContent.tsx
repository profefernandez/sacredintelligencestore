"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Divider } from "@/components/ui/Divider";
import { formatDate } from "@/lib/utils";
import { colors, typography, spacing, animation, radius } from "@/lib/design-system";
import type { BlogPost } from "@/lib/types";

export function BlogPostContent({ post }: { post: BlogPost }) {
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
        <div className={spacing.maxWidthNarrow}>
          {/* Back link */}
          <motion.div {...animation.fadeIn} className="mb-8">
            <Link
              href="/blog"
              className={`inline-flex items-center gap-2 no-underline min-h-[48px] ${typography.bodySm}`}
              style={{ color: colors.text.muted }}
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
              <div className="flex items-center gap-4 mb-4">
                <SectionLabel className="mb-0">{post.category}</SectionLabel>
                <time
                  dateTime={post.published_date}
                  className={typography.bodySm}
                  style={{ color: colors.text.muted }}
                >
                  {formatDate(post.published_date)}
                </time>
              </div>

              <h1
                className={`${typography.h1} ${spacing.headingMb}`}
                style={{ color: colors.text.heading, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                {post.title}
              </h1>

              <p
                className={`${typography.bodySm} ${spacing.bodyMb}`}
                style={{ color: colors.text.muted }}
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
                className="relative w-full mb-10 overflow-hidden"
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
                  priority
                />
              </motion.div>
            )}

            <Divider />

            {/* Body — styles defined in globals.css .blog-body */}
            <motion.div
              initial={animation.fadeUp.initial}
              animate={animation.fadeUp.animate}
              transition={{ ...animation.fadeUp.transition, delay: 0.3 }}
              dangerouslySetInnerHTML={{ __html: cleanBody }}
              className={`blog-body ${typography.body} mt-8`}
              style={{ color: colors.text.body }}
            />
          </article>
        </div>
      </Section>
    </div>
  );
}
