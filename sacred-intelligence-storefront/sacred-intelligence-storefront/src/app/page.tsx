import { colors, typography, spacing } from "@/lib/design-system";

export default function Home() {
  return (
    <section
      className={`${spacing.section} ${spacing.pageX} flex flex-col items-center justify-center text-center`}
      style={{
        minHeight: "calc(100vh - 72px)",
        marginTop: "72px",
        backgroundColor: colors.bg.primary,
      }}
    >
      <h1
        className={`${typography.h1} ${spacing.headingMb}`}
        style={{ color: colors.text.heading }}
      >
        Sacred Intelligence Collection
      </h1>
      <p
        className={`${typography.bodyLg} max-w-xl`}
        style={{ color: colors.text.body }}
      >
        Books, guided meditations, and digital resources for your Sacred,
        Self-ish, and Shared journeys. Coming soon.
      </p>
    </section>
  );
}
