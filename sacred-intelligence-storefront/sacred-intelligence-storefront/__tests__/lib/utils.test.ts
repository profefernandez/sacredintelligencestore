import { formatPrice, cn, isPhysicalProduct, isDigitalProduct } from "@/lib/utils";

describe("formatPrice", () => {
  it("formats whole numbers", () => {
    expect(formatPrice(2495)).toBe("$24.95");
  });
  it("formats with cents", () => {
    expect(formatPrice(999)).toBe("$9.99");
  });
  it("formats zero", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });
});

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });
  it("filters falsy values", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });
});

describe("isPhysicalProduct", () => {
  it("book is physical", () => {
    expect(isPhysicalProduct("book")).toBe(true);
  });
  it("merchandise is physical", () => {
    expect(isPhysicalProduct("merchandise")).toBe(true);
  });
  it("album is digital", () => {
    expect(isPhysicalProduct("album")).toBe(false);
  });
  it("video is digital", () => {
    expect(isPhysicalProduct("video")).toBe(false);
  });
});
