"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Video,
  BookOpen,
  Film,
  Monitor,
  Sparkles,
  Shield,
  ChevronDown,
  Check,
} from "lucide-react";
import {
  colors,
  typography,
  spacing,
  gradients,
  animation,
  shadows,
} from "@/lib/design-system";
import GlassCard from "@/components/ui/GlassCard";
import { useMembershipStore } from "@/store/useMembershipStore";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const sharedFeatures = [
  "Access to all 90+ videos",
  "Sacred Intelligence TV (20 episodes)",
  "Dismantle Racism series (46 episodes)",
  "New content as released",
  "Watch on any device",
];

const annualExtras = ["2 months free", "Priority access to new releases"];

const featureGrid = [
  {
    icon: Video,
    title: "90+ Videos",
    description: "Full library of expert-led video content at your fingertips",
  },
  {
    icon: BookOpen,
    title: "Expert-Led Content",
    description: "Created by Rev. Dr. Terrlyn L. Curry Avery",
  },
  {
    icon: Film,
    title: "Multiple Series",
    description: "Sacred Intelligence TV, Dismantle Racism, TEDx, and more",
  },
  {
    icon: Monitor,
    title: "Watch Anywhere",
    description: "Stream on any device, anytime",
  },
  {
    icon: Sparkles,
    title: "New Content",
    description: "Fresh content added regularly",
  },
  {
    icon: Shield,
    title: "Cancel Anytime",
    description: "No contracts, no commitments",
  },
];

const faqs = [
  {
    q: "What\u2019s included in the membership?",
    a: "Full access to our library of 90+ videos including Sacred Intelligence TV, the Dismantle Racism series, TEDx talks, podcast appearances, and more.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes! Start with a 7-day free trial. Cancel anytime during the trial and you won\u2019t be charged.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. Cancel your membership at any time with no penalties or hidden fees.",
  },
  {
    q: "What content is free?",
    a: "TEDx talks, select podcast appearances, and the first few episodes of our major series are free to watch without a membership.",
  },
  {
    q: "How do I watch?",
    a: "Stream directly in your browser on any device. No app required.",
  },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function MembershipContent() {
  const { setMember } = useMembershipStore();
  const [selectedPlan, setSelectedPlan] = useState<
    "monthly" | "annual" | null
  >(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChoosePlan = (plan: "monthly" | "annual") => {
    setMember(plan);
    setSelectedPlan(plan);
  };

  return (
    <main>
      {/* ---- Pricing Cards ---- */}
      <section
        id="pricing"
        style={{ backgroundColor: colors.bg.primary, marginTop: "72px", padding: "24px 5% 32px" }}
      >
        <h2
          className="text-xl sm:text-2xl font-serif font-semibold text-center mb-8"
          style={{ color: colors.text.heading }}
        >
          Choose Your Plan
        </h2>
        <div
          className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Monthly */}
          <GlassCard className="p-8 flex flex-col">
            <p
              className={`${typography.h4} ${spacing.headingMb}`}
              style={{ color: colors.text.heading }}
            >
              $9.99{" "}
              <span className="text-lg font-normal" style={{ color: colors.text.muted }}>
                / month
              </span>
            </p>
            <p className="mb-6 text-sm" style={{ color: colors.text.muted }}>
              Billed monthly
            </p>

            <ul className="space-y-3 mb-8 flex-1" role="list">
              {sharedFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-base"
                  style={{ color: colors.text.body }}
                >
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0"
                    style={{ color: colors.gold.primary }}
                    aria-hidden="true"
                  />
                  {f}
                </li>
              ))}
            </ul>

            {selectedPlan === "monthly" ? (
              <p
                className="text-center font-semibold py-3"
                style={{ color: colors.semantic.success }}
              >
                You are on the Monthly plan!
              </p>
            ) : (
              <button
                type="button"
                aria-label="Choose monthly plan"
                onClick={() => handleChoosePlan("monthly")}
                className="w-full font-semibold uppercase tracking-[0.15em] text-base transition-colors duration-200 cursor-pointer"
                style={{
                  minHeight: "48px",
                  border: `2px solid ${colors.gold.primary}`,
                  borderRadius: "9999px",
                  background: "transparent",
                  color: colors.gold.primary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.gold.primary;
                  e.currentTarget.style.color = colors.purple.deep;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = colors.gold.primary;
                }}
              >
                Choose Monthly
              </button>
            )}
          </GlassCard>

          {/* Annual (highlighted) */}
          <GlassCard
            className="p-8 flex flex-col relative"
            glow
          >
            {/* Best value badge */}
            <div
              className="absolute top-0 right-0 px-4 py-1 text-xs font-bold uppercase tracking-widest"
              style={{
                background: gradients.goldCta,
                color: colors.purple.deep,
                borderRadius: "0 12px 0 12px",
              }}
            >
              Best Value
            </div>

            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                border: `2px solid ${colors.gold.primary}`,
                borderRadius: "12px",
              }}
            />

            <p
              className={`${typography.h4} ${spacing.headingMb}`}
              style={{ color: colors.text.heading }}
            >
              $99{" "}
              <span className="text-lg font-normal" style={{ color: colors.text.muted }}>
                / year
              </span>
            </p>
            <p className="mb-6 text-sm" style={{ color: colors.gold.primary }}>
              Save $20 — billed annually
            </p>

            <ul className="space-y-3 mb-8 flex-1" role="list">
              {[...sharedFeatures, ...annualExtras].map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-base"
                  style={{ color: colors.text.body }}
                >
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0"
                    style={{ color: colors.gold.primary }}
                    aria-hidden="true"
                  />
                  {f}
                </li>
              ))}
            </ul>

            {selectedPlan === "annual" ? (
              <p
                className="text-center font-semibold py-3"
                style={{ color: colors.semantic.success }}
              >
                You are on the Annual plan!
              </p>
            ) : (
              <button
                type="button"
                aria-label="Choose annual plan"
                onClick={() => handleChoosePlan("annual")}
                className="w-full font-semibold uppercase tracking-[0.15em] text-base transition-shadow duration-200 cursor-pointer"
                style={{
                  minHeight: "48px",
                  border: "none",
                  borderRadius: "9999px",
                  background: gradients.goldCta,
                  color: colors.purple.deep,
                  boxShadow: shadows.buttonHover,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = gradients.goldCtaHover;
                  e.currentTarget.style.boxShadow = shadows.goldGlow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = gradients.goldCta;
                  e.currentTarget.style.boxShadow = shadows.buttonHover;
                }}
              >
                Choose Annual
              </button>
            )}
          </GlassCard>
        </div>
      </section>

      {/* ---- What's Included ---- */}
      <section
        style={{ backgroundColor: colors.bg.secondary, padding: "24px 5% 32px" }}
      >
        <h2
          className="text-lg font-semibold text-center mb-6"
          style={{ color: colors.text.heading }}
        >
          What&#39;s Included
        </h2>

        <div className="max-w-3xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-3">
          {featureGrid.map((feature) => {
            const Icon = feature.icon;
            return (
              <GlassCard key={feature.title} className="p-3" hover={false}>
                <Icon
                  size={20}
                  style={{ color: colors.gold.primary }}
                  aria-hidden="true"
                />
                <h3
                  className="mt-1.5 text-sm font-semibold"
                  style={{ color: colors.text.heading }}
                >
                  {feature.title}
                </h3>
                <p
                  className="mt-0.5 text-xs leading-relaxed"
                  style={{ color: colors.text.muted }}
                >
                  {feature.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section
        style={{ backgroundColor: colors.bg.primary }}
        className={`${spacing.section} ${spacing.pageX}`}
      >
        <div className={spacing.maxWidthNarrow}>
          <motion.h2
            className={`${typography.h3} ${spacing.headingMb} text-center`}
            style={{ color: colors.text.heading }}
            {...animation.fadeUp}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  {...animation.fadeUp}
                  transition={{
                    ...animation.fadeUp.transition,
                    delay: i * 0.05,
                  }}
                  style={{
                    border: `1px solid ${colors.glass.border}`,
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
                    style={{
                      background: colors.glass.bg,
                      color: colors.text.heading,
                      border: "none",
                      minHeight: "48px",
                    }}
                  >
                    <span className="font-semibold text-base">{faq.q}</span>
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      style={{
                        color: colors.gold.primary,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease",
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    style={{
                      maxHeight: isOpen ? "200px" : "0px",
                      opacity: isOpen ? 1 : 0,
                      overflow: "hidden",
                      transition:
                        "max-height 0.3s ease, opacity 0.25s ease, padding 0.3s ease",
                      padding: isOpen ? "0 20px 20px" : "0 20px 0",
                      background: colors.glass.bg,
                      color: colors.text.muted,
                    }}
                  >
                    <p className="text-base leading-relaxed">{faq.a}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
