export default function Home() {
  return (
    <section
      style={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(1.5rem, 5vw, 4rem)",
        marginTop: "72px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-playfair), 'Playfair Display', serif",
          fontSize: "clamp(3rem, 5vw, 4.5rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
          marginBottom: "1.5rem",
        }}
      >
        Sacred Intelligence Collection
      </h1>
      <p
        style={{
          fontSize: "1.15rem",
          lineHeight: 1.7,
          color: "var(--text-body)",
          maxWidth: "36rem",
        }}
      >
        Books, guided meditations, and digital resources for your Sacred,
        Self-ish, and Shared journeys. Coming soon.
      </p>
    </section>
  );
}
