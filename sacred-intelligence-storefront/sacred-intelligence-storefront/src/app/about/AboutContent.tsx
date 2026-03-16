"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GoldAccent } from "@/components/ui/GoldAccent";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { colors, typography, spacing, animation } from "@/lib/design-system";

const pillars = [
  {
    name: "Sacred",
    description:
      "The Sacred pillar invites you to deepen your relationship with the Divine. It is the foundation of your intelligence — the part of you that knows beyond knowing, that connects you to something greater than yourself. Through Sacred practices, you access wisdom, peace, and purpose.",
  },
  {
    name: "Self-ish",
    description:
      "The Self-ish pillar is your invitation to reclaim your right to you. Self-ish is not selfish — it is the radical act of putting yourself first so you can show up fully for others. It is boundary-setting, self-love, and the courage to honor your own needs without apology.",
  },
  {
    name: "Shared",
    description:
      "The Shared pillar is where your inner work meets the world. It is the expression of your Sacred and Self-ish intelligence through community, relationships, and service. When you heal yourself, you create ripples of healing that touch everyone around you.",
  },
];

export function AboutContent() {
  return (
    <div style={{ marginTop: "72px" }}>
      {/* Hero */}
      <Section index={0}>
        <div className={`${spacing.maxWidthNarrow} text-center`}>
          <SectionLabel>About</SectionLabel>
          <h1
            className={`${typography.h1} ${spacing.headingMb}`}
            style={{ color: colors.text.heading }}
          >
            Sacred Intelligence
          </h1>
          <p
            className={`${typography.bodyLg} max-w-2xl mx-auto`}
            style={{ color: colors.text.body }}
          >
            A framework for wholeness created by Rev. Dr. Terrlyn L. Curry
            Avery — guiding you to live from a place of divine connection,
            radical self-love, and intentional community.
          </p>
        </div>
      </Section>

      {/* About Dr. TLC */}
      <Section index={1}>
        <div className={spacing.maxWidthNarrow}>
          <SectionLabel>The Visionary</SectionLabel>
          <h2
            className={`${typography.h2} ${spacing.headingMb}`}
            style={{ color: colors.text.heading }}
          >
            Rev. Dr. Terrlyn L. Curry Avery
          </h2>
          <p
            className={`${typography.body} mb-5`}
            style={{ color: colors.text.body }}
          >
            Known lovingly as <GoldAccent>Dr. TLC</GoldAccent>, Rev. Dr.
            Terrlyn L. Curry Avery is a licensed psychologist, ordained
            minister, author, and the creator of the Sacred Intelligence
            framework. Her life&apos;s work sits at the intersection of
            psychology, spirituality, and social justice.
          </p>
          <p
            className={`${typography.body} mb-5`}
            style={{ color: colors.text.body }}
          >
            Dr. TLC developed Sacred Intelligence as a response to the
            fragmentation she observed in how people approach healing — treating
            the mind, body, and spirit as separate entities rather than an
            integrated whole. Her framework brings these dimensions together
            through three accessible pillars that anyone can practice.
          </p>
          <p
            className={typography.body}
            style={{ color: colors.text.body }}
          >
            Through books, guided meditations, workshops, and digital
            resources, Dr. TLC makes Sacred Intelligence accessible to anyone
            seeking deeper connection with themselves, with the Divine, and with
            their communities.
          </p>
        </div>
      </Section>

      <Section index={2} compact>
        <Divider ornament="◆" />
      </Section>

      {/* Three Pillars */}
      <Section index={0}>
        <div className={spacing.maxWidthNarrow}>
          <div className="text-center mb-12">
            <SectionLabel>The Framework</SectionLabel>
            <h2
              className={typography.h2}
              style={{ color: colors.text.heading }}
            >
              Three Pillars of Intelligence
            </h2>
          </div>

          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.name}
              initial={animation.stagger.item.initial}
              whileInView={animation.stagger.item.animate}
              transition={{
                ...animation.stagger.item.transition,
                delay: i * 0.15,
              }}
              viewport={animation.viewport}
              style={{ marginBottom: i < pillars.length - 1 ? "2.5rem" : 0 }}
            >
              <h3
                className={`${typography.h3} mb-3`}
                style={{ color: colors.text.heading }}
              >
                <GoldAccent>{pillar.name}</GoldAccent>
              </h3>
              <p
                className={typography.body}
                style={{ color: colors.text.body }}
              >
                {pillar.description}
              </p>
              {i < pillars.length - 1 && <Divider />}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section index={1}>
        <motion.div
          {...animation.fadeUp}
          className={`${spacing.maxWidthNarrow} text-center`}
        >
          <SectionLabel>Begin Your Journey</SectionLabel>
          <h2
            className={`${typography.h2} ${spacing.headingMb}`}
            style={{ color: colors.text.heading }}
          >
            Explore the Collection
          </h2>
          <p
            className={`${typography.body} max-w-lg mx-auto ${spacing.bodyMb}`}
            style={{ color: colors.text.body }}
          >
            Books, guided meditations, workshops, and resources to support your
            Sacred, Self-ish, and Shared transformation.
          </p>
          <Button href="/shop">Browse the Sacred Shelf</Button>
        </motion.div>
      </Section>
    </div>
  );
}
