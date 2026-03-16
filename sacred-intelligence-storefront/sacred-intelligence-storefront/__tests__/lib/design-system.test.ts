import { colors, typography, spacing, animation } from "@/lib/design-system";

describe("Design System", () => {
  describe("colors", () => {
    it("has light and dark mode palettes", () => {
      expect(colors.light).toBeDefined();
      expect(colors.dark).toBeDefined();
    });
    it("light mode has all required roles", () => {
      const roles = [
        "bgPrimary",
        "bgSecondary",
        "textPrimary",
        "textBody",
        "accentGoldText",
        "accentGoldDecorative",
        "ctaPrimaryBg",
        "ctaPrimaryText",
      ];
      roles.forEach((role) => {
        expect(colors.light[role as keyof typeof colors.light]).toBeDefined();
        expect(colors.light[role as keyof typeof colors.light]).toMatch(
          /^#[0-9a-fA-F]{6}$/
        );
      });
    });
    it("dark mode has all required roles", () => {
      const roles = [
        "bgPrimary",
        "bgSecondary",
        "bgTertiary",
        "textPrimary",
        "textBody",
        "accentGold",
        "purpleAccent",
        "ctaPrimaryBg",
        "ctaPrimaryText",
      ];
      roles.forEach((role) => {
        expect(colors.dark[role as keyof typeof colors.dark]).toBeDefined();
      });
    });
    it("gold decorative is NOT used for text in light mode", () => {
      expect(colors.light.accentGoldText).toBe("#614f1d");
      expect(colors.light.accentGoldDecorative).toBe("#c9a84c");
    });
  });
  describe("typography", () => {
    it("defines all required roles", () => {
      const roles = [
        "h1",
        "h2",
        "h3",
        "h4",
        "label",
        "body",
        "bodyLg",
        "price",
        "cta",
      ];
      roles.forEach((role) => {
        expect(typography[role as keyof typeof typography]).toBeDefined();
        expect(
          typography[role as keyof typeof typography].fontSize
        ).toBeDefined();
        expect(
          typography[role as keyof typeof typography].fontWeight
        ).toBeDefined();
      });
    });
    it("no font size below 0.875rem (14px)", () => {
      Object.values(typography).forEach((style) => {
        const fontSize = style.fontSize;
        let minSize: number;
        const clampMatch = fontSize.match(/^clamp\(([^,]+),/);
        if (clampMatch) {
          minSize = parseFloat(clampMatch[1]);
        } else {
          minSize = parseFloat(fontSize);
        }
        expect(minSize).toBeGreaterThanOrEqual(0.875);
      });
    });
  });
  describe("spacing", () => {
    it("defines section padding", () => {
      expect(spacing.section).toBeDefined();
    });
  });
  describe("animation", () => {
    it("defines fadeUp preset", () => {
      expect(animation.fadeUp).toBeDefined();
      expect(animation.fadeUp.initial).toBeDefined();
      expect(animation.fadeUp.animate).toBeDefined();
    });
  });
});
