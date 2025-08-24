import { describe, it, expect } from "vitest";
import { colSpanClass } from "./utils";

describe("colSpanClass", () => {
  it("devrait retourner la classe CSS appropriée pour chaque nombre de colonnes", () => {
    const testCases = [
      { cols: 12, expected: "md:col-span-12" },
      { cols: 9, expected: "md:col-span-9" },
      { cols: 8, expected: "md:col-span-8" },
      { cols: 6, expected: "md:col-span-6" },
      { cols: 4, expected: "md:col-span-4" },
      { cols: 3, expected: "md:col-span-3" },
      { cols: 2, expected: "md:col-span-2" },
    ];

    testCases.forEach(({ cols, expected }) => {
      expect(colSpanClass(cols)).toBe(expected);
    });
  });

  it("devrait retourner la classe par défaut quand cols est undefined", () => {
    expect(colSpanClass(undefined)).toBe("md:col-span-12");
  });

  it("devrait retourner la classe par défaut quand cols est null", () => {
    expect(colSpanClass()).toBe("md:col-span-12");
  });

  it("devrait retourner la classe par défaut pour des valeurs non mappées", () => {
    expect(colSpanClass(1)).toBe("md:col-span-12");
    expect(colSpanClass(5)).toBe("md:col-span-12");
    expect(colSpanClass(7)).toBe("md:col-span-12");
    expect(colSpanClass(10)).toBe("md:col-span-12");
    expect(colSpanClass(11)).toBe("md:col-span-12");
    expect(colSpanClass(13)).toBe("md:col-span-12");
  });

  it("devrait gérer les valeurs négatives", () => {
    expect(colSpanClass(-1)).toBe("md:col-span-12");
    expect(colSpanClass(-5)).toBe("md:col-span-12");
  });

  it("devrait gérer les valeurs décimales", () => {
    expect(colSpanClass(2.5)).toBe("md:col-span-12");
    expect(colSpanClass(6.7)).toBe("md:col-span-12");
  });

  it("devrait gérer les valeurs extrêmes", () => {
    expect(colSpanClass(0)).toBe("md:col-span-12");
    expect(colSpanClass(100)).toBe("md:col-span-12");
    expect(colSpanClass(-100)).toBe("md:col-span-12");
  });
});
