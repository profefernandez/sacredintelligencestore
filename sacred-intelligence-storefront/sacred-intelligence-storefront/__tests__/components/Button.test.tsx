import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders primary variant by default", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: "Click me" });
    expect(btn).toBeInTheDocument();
  });

  it("renders as link when href is provided", () => {
    render(<Button href="/shop">Shop</Button>);
    const link = screen.getByRole("link", { name: "Shop" });
    expect(link).toHaveAttribute("href", "/shop");
  });

  it("has minimum touch target size", () => {
    render(<Button>Tap me</Button>);
    const btn = screen.getByRole("button", { name: "Tap me" });
    expect(btn).toBeInTheDocument();
  });
});
